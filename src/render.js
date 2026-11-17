// ===== 렌더링 + 라우팅 로직 =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 빌드 시 TEMPLATE/REGIONS/KEYWORDS/CROSS_SELL/FAQ_CSS는 같은 스코프에 주입됩니다.

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function render(regionName, keywordName) {
  const region = REGIONS[regionName];
  const kw = KEYWORDS[keywordName];
  if (!region) throw new Error("지역 없음: " + regionName);
  if (!kw) throw new Error("키워드 없음: " + keywordName);

  // === 철거 전용 렌더 (다크테마 별도 템플릿) ===
  // 카드단말기와 디자인이 완전히 달라 별도 템플릿을 통째로 사용.
  // 치환 지점: {{DEMO_LEAD}}(지역 특성 서두), {{REGION}}(지역명).
  if (keywordName === "철거") {
    const lead = region.demolition || "";
    let dhtml = TEMPLATE_DEMOLITION
      .split("{{DEMO_LEAD}}").join(lead)
      .split("{{REGION}}").join(regionName);
    return dhtml;
  }

  let html = TEMPLATE;

  // 지역 페이지는 URL이 /광교/카드단말기 처럼 한 단계 더 들어가 있어서
  // 상대경로(images/...)가 /광교/images/... 로 잘못 해석됨 → 절대경로(/images/)로 변환.
  // src="images/  와 JS 내부 "images/  (큰따옴표) 둘 다 처리. 이미 /images/ 인 건 건드리지 않음.
  html = html
    .replace(/src="images\//g, 'src="/images/')
    .replace(/(['"])images\/(products|reviews)\//g, '$1/images/$2/');

  // 키워드 본문 문단 → <p> 묶음
  // bodyPool(문단별 변형 풀)이 있으면 지역 슬러그를 시드로 각 풀에서 1개씩 골라 조합.
  // 같은 지역은 항상 같은 조합(고정), 지역마다 다른 조합 → 획일감 제거 + SEO 중복 회피.
  // bodyPool이 없는 키워드는 기존 body 배열을 그대로 사용(하위호환).
  function seedFromSlug(s) {
    let h = 0;
    const str = String(s || "");
    for (let i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }
    return h;
  }
  let bodyParts;
  if (Array.isArray(kw.intro.bodyPool) && kw.intro.bodyPool.length) {
    const seed = seedFromSlug(region.slug);
    bodyParts = kw.intro.bodyPool.map((pool, idx) => {
      if (!Array.isArray(pool) || pool.length === 0) return "";
      // 문단마다 시드를 서로 다른 상수로 재해싱 → 문단끼리 독립적으로 분산(조합 다양성 확보)
      const mixed = (seed ^ ((idx + 1) * 0x9e3779b1)) >>> 0;
      const pick = mixed % pool.length;
      return pool[pick];
    }).filter(Boolean);
  } else {
    bodyParts = kw.intro.body || [];
  }
  const kwBody = bodyParts
    .map((p) => `<p style="font-size:1.02rem;line-height:1.9;color:#333;margin-bottom:1.2em">${p}</p>`)
    .join("\n");

  // 업종별 추천 매트릭스 → 표 (지역 강조 업종을 맨 위로 정렬)
  let typesHtml = "";
  if (kw.intro.matrix && kw.intro.matrix.length) {
    const emphasis = region.emphasis || [];
    // 키워드가 extraRows 합치기를 허용할 때만 지역 전용 줄 추가 (철거 등은 차단)
    const allowExtra = kw.intro.allowExtraRows !== false;
    const baseRows = allowExtra
      ? [...kw.intro.matrix, ...(region.extraRows || [])]
      : [...kw.intro.matrix];
    // 강조 업종을 앞으로 정렬 (extraRows 미사용 시 강조 정렬도 생략 가능)
    const rows = allowExtra ? baseRows.sort((a, b) => {
      const ai = emphasis.indexOf(a.biz);
      const bi = emphasis.indexOf(b.biz);
      const aw = ai === -1 ? 999 : ai;
      const bw = bi === -1 ? 999 : bi;
      return aw - bw;
    }) : baseRows;
    const trs = rows
      .map((r) => {
        const hot = allowExtra && emphasis.includes(r.biz);
        return `<tr${hot ? ' class="hot"' : ""}><td class="biz">${r.biz}</td><td class="rec">${r.gear}</td><td class="why">${r.why}</td></tr>`;
      })
      .join("\n");
    const mh = kw.intro.matrixHead || { c1: "업종", c2: "추천 장비", c3: "이유" };
    const note = kw.intro.matrixNote
      ? kw.intro.matrixNote.replace(/{{REGION}}/g, regionName)
      : `※ 그 외 업종도 매장 환경에 맞춰 최적의 장비를 추천해 드립니다. ${regionName} 담당 매니저와 상담으로 확인하세요.`;
    typesHtml = `
    <div class="matrix-wrap rv" style="margin:2.6em 0 0">
      <table class="biz-matrix">
        <thead><tr><th>${mh.c1}</th><th>${mh.c2}</th><th>${mh.c3}</th></tr></thead>
        <tbody>${trs}</tbody>
      </table>
      <p class="matrix-note">${note}</p>
    </div>`;
  }

  // 세이브샵 진행 시 장점 → WHY 카드 (화이트, 아이콘+제목+설명)
  let benefitsHtml = "";
  if (kw.intro.benefits && kw.intro.benefits.length) {
    const ICO = {
      check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
      star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z"/></svg>',
      calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>',
    };
    const cards = kw.intro.benefits
      .map((b) => {
        const ic = ICO[b.icon] || ICO.check;
        const desc = (b.desc || "").replace(/{{REGION}}/g, regionName);
        return `<div class="whyc rv"><div class="wi">${ic}</div><h4>${b.title}</h4><p>${desc}</p></div>`;
      })
      .join("\n");
    const head = kw.intro.benefitsHead || {};
    benefitsHtml = `
    <div class="why-block rv">
      <div class="sec-head">
        ${head.label ? `<div class="sec-label">${head.label}</div>` : ""}
        ${head.title ? `<h2 class="sec-title">${head.title}</h2>` : ""}
        ${head.desc ? `<p class="sec-desc">${head.desc}</p>` : ""}
      </div>
      <div class="why-grid">${cards}</div>
    </div>`;
  }

  // FAQ → 항목들
  const faqItems = kw.faq
    .map(
      (f) =>
        `<div class="faq-item"><div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`
    )
    .join("\n");

  // CTA 하단 추천 배너 (live:true 인 것만)
  const ICONS = {
    desktop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/></svg>',
    tools: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l6-6"/><path d="M14 7l3-3 4 4-3 3"/><path d="M14 7l-9 9 3 3 9-9"/><path d="M14 7l3 3"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12a10 10 0 0114 0"/><path d="M8.5 15.5a5 5 0 017 0"/><line x1="12" y1="19" x2="12" y2="19"/></svg>',
    vending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1.5"/><line x1="9" y1="6" x2="9" y2="10"/><line x1="15" y1="6" x2="15" y2="10"/><line x1="12" y1="15" x2="15" y2="15"/></svg>',
    kiosk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="1.5"/><rect x="9" y="5" width="6" height="7" rx="1"/><line x1="10" y1="17" x2="14" y2="17"/></svg>',
  };
  let crossSellHtml = "";
  const liveItems = (CROSS_SELL.items || []).filter(
    (i) => i.live && i.title.replace(/\s|·/g, "").indexOf(keywordName.replace(/\s|·/g, "")) === -1
  );
  if (liveItems.length) {
    const cards = liveItems
      .map((it) => {
        // 링크가 {{REGION}}/{키워드} 형태인데 해당 키워드에 allowRegions가 있고
        // 현재 지역이 미포함이면(철거의 강원·제주, 포스기의 미오픈 지역 등)
        // fallbackLink로 폴백. 링크의 키워드명을 추출해 KEYWORDS에서 조회.
        let linkTpl = it.link || "#";
        if (it.fallbackLink) {
          const m = linkTpl.match(/{{REGION}}\/(.+)$/);
          if (m) {
            const linkedKw = KEYWORDS[m[1]];
            const allow = linkedKw && linkedKw.allowRegions;
            if (allow && allow.indexOf(regionName) === -1) {
              linkTpl = it.fallbackLink;
            }
          }
        }
        const href = linkTpl.replace(/{{REGION}}/g, regionName);
        const ic = ICONS[it.icon] || ICONS.desktop;
        return `<a class="xs-card" href="${href}">
        <span class="xs-ic">${ic}</span>
        <span class="xs-txt"><span class="xs-t">${it.title}</span><span class="xs-d">${it.desc}</span></span>
        <span class="xs-arr">›</span>
      </a>`;
      })
      .join("\n");
    crossSellHtml = `
    <section class="xs-banner">
      <div class="wrap">
        <div class="xs-head">
          <div class="xs-label">MORE SERVICES</div>
          <div class="xs-title">${CROSS_SELL.heading.replace(/{{REGION}}/g, regionName)}</div>
        </div>
        <div class="xs-grid">${cards}</div>
      </div>
    </section>`;
  }

  // 히어로 제목 — 지역명을 .reg + data-region 으로 감싸 폼 출처 기록 유지
  const heroRaw = (kw.heroTitle || "{{REGION}} 카드단말기").replace(
    /{{REGION}}/g,
    `<span class="reg" data-region>${regionName}</span>`
  );

  // 첫 문단(REGION_CONTEXT) 소스: 키워드가 contextField를 지정하면 그 지역 필드 사용
  // (철거 → region.demolition). 없거나 비면 기존 region.context로 폴백.
  const ctxField = kw.intro.contextField;
  const introContext =
    (ctxField && region[ctxField]) ? region[ctxField] : region.context;

  // 하이어로 칩: 키워드가 heroTags를 지정하면 그걸로, 없으면 카드단말기 기본 4종
  const defaultTags = ["설치비 0원", "1:1 전담 매니저", "A/S 1년 보장", "전자계약서"];
  const heroTags = (kw.heroTags || defaultTags)
    .map((t) => `<span><b>✓</b> ${t}</span>`)
    .join("\n      ");

  // 치환 맵
  const map = {
    "{{REGION}}": regionName,
    "{{HERO_TITLE}}": heroRaw,
    "{{HERO_TAGS}}": heroTags,
    "{{KW_CRUMB}}": kw.crumb || "카드단말기",
    "{{KW_LABEL}}": kw.intro.label,
    "{{KW_HEADING}}": kw.intro.heading,
    "{{REGION_CONTEXT}}": introContext,
    "{{KW_BODY}}": kwBody,
    "{{KW_TYPES}}": typesHtml,
    "{{KW_BENEFITS}}": benefitsHtml,
    "{{FAQ_ITEMS}}": faqItems,
    "{{CROSS_SELL}}": crossSellHtml,
  };

  // 제목/설명은 키워드 데이터 우선 적용
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${kw.title.replace(/{{REGION}}/g, regionName)}</title>`
  );
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${kw.description.replace(/{{REGION}}/g, regionName)}">`
  );

  // 지역 페이지에서는 REVIEWS 섹션 제거 (지역마다 동일 이미지 = 중복 콘텐츠)
  html = html.replace(
    /<!--{{REVIEWS_START}}-->[\s\S]*?<!--{{REVIEWS_END}}-->/,
    ""
  );

  // 키워드별 섹션 노출 제어 (B안). sections에 false면 마커 구간 통째로 제거.
  // 기본값: 지정 없으면 모두 노출(카드단말기 하위호환).
  const sections = kw.sections || {};
  if (sections.products === false) {
    html = html.replace(/<!--{{PRODUCTS_START}}-->[\s\S]*?<!--{{PRODUCTS_END}}-->/, "");
  }
  if (sections.cardflow === false) {
    html = html.replace(/<!--{{CARDFLOW_START}}-->[\s\S]*?<!--{{CARDFLOW_END}}-->/, "");
  }

  // 나머지 placeholder 치환 (지역 들어간 FAQ 답변도 처리)
  for (const [k, v] of Object.entries(map)) {
    html = html.split(k).join(v.replace ? v.replace(/{{REGION}}/g, regionName) : v);
  }

  // FAQ CSS 주입 (</head> 앞)
  html = html.replace("</head>", FAQ_CSS + "\n</head>");

  return html;
}



// --- 상담 접수 API (스팸 방지) ---
// 브라우저 → 이 Worker → Apps Script. 아래 세 검사를 모두 통과해야 저장한다.
//   ① Cloudflare Turnstile 토큰 검증 (env.TURNSTILE_SECRET)
//   ② 페이지 열고 10초 안에 들어온 제출은 무시
//   ③ 숨은 입력칸(hp_field)에 값이 있으면 무시
// 걸러진 제출은 상담 시트·메일에 넣지 않지만 "차단로그" 시트에는 남기고,
// 화면에는 정상 접수와 똑같이 보이도록 200 OK 만 돌려준다.
//
// 필요한 환경변수 (Cloudflare 대시보드 → Workers → saveshop → Settings → Variables)
//   TURNSTILE_SECRET : Turnstile 비밀 키            (Secret)
//   SHEET_ENDPOINT   : Apps Script 웹앱 /exec 주소  (Secret 권장)
//   SHEET_KEY        : Apps Script와 맞춘 공유키    (Secret)
const MIN_FILL_MS = 10000;

// Turnstile 스크립트(api.js) 자체가 안 뜬 경우(토큰 없음)를 어떻게 다룰지.
//   true  = 저장하지 않는다 (기본, 요청대로). 광고차단기·사내망·일부 보안프로그램 때문에
//           api.js 가 차단된 "진짜 손님"의 문의도 사라진다. 단 "차단로그" 시트에
//           reason=no-token 으로 이름·연락처가 남으므로 전화로 회수할 수 있다.
//   false = 지연(10초)·하니포트는 통과했고 토큰만 없는 경우에는 저장하되,
//           관심품목 앞에 "[미검증]" 을 붙여 구분할 수 있게 한다.
const BLOCK_WHEN_NO_TOKEN = true;

function apiJson(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "cache-control": "no-store",
    },
  });
}

async function verifyTurnstile(token, ip, env) {
  const secret = env.TURNSTILE_SECRET || "";
  if (!secret) return { ok: false, why: "secret-missing" };
  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  if (ip) form.set("remoteip", ip);
  try {
    form.set("idempotency_key", crypto.randomUUID());
  } catch (e) {}
  try {
    const r = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: form.toString(),
      }
    );
    const j = await r.json();
    if (j && j.success) return { ok: true };
    return { ok: false, why: ((j && j["error-codes"]) || []).join(",") || "failed" };
  } catch (e) {
    return { ok: false, why: "verify-error" };
  }
}

// Apps Script 로 전달. 공유키를 함께 보내므로, 키 없는 직접 POST는 Apps Script가 거부한다.
async function toSheet(env, payload) {
  const endpoint = env.SHEET_ENDPOINT || "";
  if (!endpoint) return null;
  return fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "text/plain;charset=utf-8" },
    body: JSON.stringify(Object.assign({ key: env.SHEET_KEY || "" }, payload)),
  });
}

function cut(v, n) {
  return String(v == null ? "" : v).slice(0, n);
}

async function handleInquiry(request, env) {
  let d;
  try {
    d = await request.json();
  } catch (e) {
    return apiJson({ ok: true });
  }
  const ip = request.headers.get("cf-connecting-ip") || "";

  let blocked = "";
  let unverified = false;
  // ③ 하니포트
  if (cut(d.hp_field, 200).trim() !== "") blocked = "honeypot";
  // ② 작성 시간
  if (!blocked) {
    const el = Number(d.elapsed);
    if (!isFinite(el) || el < MIN_FILL_MS) blocked = "too-fast";
  }
  // ① Turnstile
  if (!blocked) {
    const tok = cut(d.ts, 4096);
    if (!tok) {
      if (BLOCK_WHEN_NO_TOKEN) blocked = "no-token";
      else unverified = true;
    } else {
      const v = await verifyTurnstile(tok, ip, env);
      if (!v.ok) blocked = "turnstile:" + v.why;
    }
  }
  // 필수값
  if (!blocked && (!cut(d.name, 100).trim() || !cut(d.phone, 50).trim())) {
    blocked = "empty";
  }

  if (blocked) {
    try {
      await toSheet(env, {
        type: "blocked",
        reason: blocked,
        name: cut(d.name, 50),
        phone: cut(d.phone, 30),
        items: cut(d.items, 200),
        page: cut(d.page, 200),
        ref: cut(d.ref, 300),
        ip: ip,
        ua: cut(request.headers.get("user-agent"), 200),
        time: cut(d.time, 60) || new Date().toISOString(),
      });
    } catch (e) {}
    // 화면에는 정상 접수처럼 보이게 한다
    return apiJson({ ok: true });
  }

  let res = null;
  try {
    res = await toSheet(env, {
      name: cut(d.name, 100),
      phone: cut(d.phone, 50),
      address: cut(d.address, 300),
      items: (unverified ? "[미검증] " : "") + cut(d.items, 500),
      time: cut(d.time, 60) || new Date().toISOString(),
      page: cut(d.page, 200),
      ref: cut(d.ref, 300),
    });
  } catch (e) {
    res = null;
  }
  // 실제 저장 실패는 숨기지 않는다 (페이지가 전화 안내를 띄움)
  if (!res || !res.ok) return apiJson({ ok: false }, 502);
  return apiJson({ ok: true });
}

// 전화클릭 기록 — 공유키를 붙이기 위해 Worker를 경유시킨다 (검증 대상 아님)
async function handleCall(request, env) {
  let d;
  try {
    d = await request.json();
  } catch (e) {
    return apiJson({ ok: true });
  }
  try {
    await toSheet(env, {
      type: "call",
      page: cut(d.page, 200),
      spot: cut(d.spot, 40),
      ref: cut(d.ref, 300),
      time: cut(d.time, 60) || new Date().toISOString(),
    });
  } catch (e) {}
  return apiJson({ ok: true });
}

// --- 통합 기록기(tracker.js) 자동 삽입 ---
// content-type이 text/html인 응답에만 HTMLRewriter로 </body> 바로 앞에 한 줄 끼워 넣는다.
// HTML이 아닌 응답(이미지·favicon·webmanifest·js·xml 등)은 손대지 않는다.
// ※ 정적 HTML 파일에 같은 태그를 직접 넣으면 두 번 로드되므로 넣지 말 것.
const TRACKER_TAG = '<script src="/js/tracker.js" defer></script>';

class TrackerInjector {
  element(element) {
    // body 요소의 끝(= </body> 바로 앞)에 삽입
    element.append(TRACKER_TAG, { html: true });
  }
}

function withTracker(response) {
  const ct = (response.headers.get("content-type") || "").toLowerCase();
  if (!ct.includes("text/html")) return response; // HTML이 아니면 그대로 통과
  if (!response.body) return response; // 204/304 등 본문 없는 응답은 그대로
  return new HTMLRewriter().on("body", new TrackerInjector()).transform(response);
}

// --- Cloudflare Worker 진입점 ---
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = decodeURIComponent(url.pathname);

    // robots.txt — 크롤러 허용 + 사이트맵 위치 안내
    if (pathname === "/robots.txt") {
      const body = [
        "User-agent: *",
        "Allow: /",
        "",
        "Sitemap: https://thesaveshop.com/sitemap.xml",
      ].join("\n");
      return new Response(body, {
        headers: { "content-type": "text/plain;charset=UTF-8" },
      });
    }

    // sitemap.xml — 정적 페이지 + 지역×키워드 동적 페이지 자동 생성
    if (pathname === "/sitemap.xml") {
      const base = "https://thesaveshop.com";
      const today = new Date().toISOString().slice(0, 10);
      const urls = [];

      // 정적 페이지
      // ※ 실제 접속 주소(확장자 없는 형태)로 넣는다. /card-terminal.html 처럼 .html을
      //   넣으면 /card-terminal 로 리디렉션되어, 구글이 "리디렉션 페이지"로 표시함.
      const staticPaths = ["/", "/card-terminal", "/demolition", "/vending"];
      for (const p of staticPaths) {
        urls.push({ loc: base + p, priority: p === "/" ? "1.0" : "0.8" });
      }

      // 지역 × 키워드 동적 페이지
      for (const region of Object.keys(REGIONS)) {
        for (const keyword of Object.keys(KEYWORDS)) {
          // allowRegions가 있는 키워드(철거)는 허용 지역만 사이트맵에 포함
          const allow = KEYWORDS[keyword].allowRegions;
          if (allow && !allow.includes(region)) continue;
          const loc =
            base + "/" + encodeURIComponent(region) + "/" + encodeURIComponent(keyword);
          urls.push({ loc, priority: "0.7" });
        }
      }

      const body =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        urls
          .map(
            (u) =>
              "  <url>\n" +
              "    <loc>" + u.loc + "</loc>\n" +
              "    <lastmod>" + today + "</lastmod>\n" +
              "    <changefreq>weekly</changefreq>\n" +
              "    <priority>" + u.priority + "</priority>\n" +
              "  </url>"
          )
          .join("\n") +
        "\n</urlset>";

      return new Response(body, {
        headers: { "content-type": "application/xml;charset=UTF-8" },
      });
    }

    // 상담 접수 / 전화클릭 기록 — 스팸 방지 검증 후 Apps Script로 전달
    if (pathname === "/api/inquiry" || pathname === "/api/call") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }
      return pathname === "/api/inquiry"
        ? handleInquiry(request, env)
        : handleCall(request, env);
    }

    // 한글 URL 디코딩 (/광교/카드단말기)
    const parts = pathname.split("/").filter(Boolean);

    // 지역/키워드 2단 경로만 동적 생성 대상
    if (parts.length === 2) {
      const [region, keyword] = parts;
      if (REGIONS[region] && KEYWORDS[keyword]) {
        // 키워드에 allowRegions(허용 지역 목록)가 있으면, 그 목록에 없는 지역은 생성 안 함.
        // (예: 철거는 경기 등 지정 지역만. 강원·제주는 목록에 없어 제외됨)
        const allow = KEYWORDS[keyword].allowRegions;
        if (allow && !allow.includes(region)) {
          // 정적 처리(404 또는 /demolition 등)로 넘김
          return withTracker(await env.ASSETS.fetch(request));
        }
        const html = render(region, keyword);
        return withTracker(
          new Response(html, {
            headers: { "content-type": "text/html;charset=UTF-8" },
          })
        );
      }
    }

    // 그 외 모든 요청은 기존 정적 파일로 넘김 (HTML이면 tracker 자동 삽입)
    return withTracker(await env.ASSETS.fetch(request));
  },
};
