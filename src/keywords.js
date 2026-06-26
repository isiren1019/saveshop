// ===== 키워드 데이터 + 크로스셀 + FAQ 스타일 =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 키워드 추가 시 이 파일의 KEYWORDS에 항목을 더하면 됩니다.

const KEYWORDS = {
  "카드단말기": {
    // 1) 브라우저 탭 + 구글 검색결과 제목
    title: "{{REGION}} 카드단말기 설치 | 세이브샵 - 설치비 0원, 전담 매니저",

    // 2) 구글 검색결과 한 줄 설명
    description:
      "{{REGION}} 카드단말기 설치, 전화 한 통이면 끝. 유선·무선·블루투스 단말기부터 카드 가맹 심사·교육·A/S까지 1:1 전담 매니저가 책임집니다. 설치비·관리비·위약금 0원. 무료 상담 010-4668-4942.",

    // 3) 히어로 대제목 (지역명은 {{REGION}}으로 자동 치환)
    heroTitle: "{{REGION}} 카드단말기",

    // 3-1) 빵부스러기 표시 라벨
    crumb: "카드단말기",

    // 4) 강조 제품 — PRODUCTS 섹션에서 맨 위로 올릴 제품 키
    //    (유선/무선/블루투스 단말기를 최상단 강조)
    highlight: "card-terminal",

    // 5) 키워드 전용 본문 — PRODUCTS 섹션 앞으로 이동, 내용 보강
    intro: {
      label: "CARD TERMINAL",
      heading: "카드단말기, 매장에 최적화 된 제품으로",
      // 본문 3문단 — 문단별 변형 풀(pool). render에서 지역 슬러그를 시드로 각 풀에서 1개씩 골라 조합.
      // 같은 지역은 항상 같은 조합(고정), 지역마다 다른 조합. {{REGION}}은 지역명으로 치환됨.
      bodyPool: [
        // 1번 문단 — 장비 추천 / 상담 유도형
        [
          "카운터가 고정된 매장이고 메뉴가 많지 않거나 단순 카드 결제가 필요하신 사장님께는 유선 단말기를 추천드립니다. 이 밖에도 업종과 매장 동선을 알려주시면 매장에 가장 잘 맞는 단말기를 상담해 드립니다.",
          "결제만 빠르고 안정적으로 진행되길 희망하는 매장이라면 유선 단말기로 충분합니다. 다만 매장마다 동선과 손님 응대 방식이 달라, 업종을 알려주시면 가장 적합한 단말기를 함께 골라드립니다.",
          "고정된 카운터에서 결제가 주로 이뤄지는 매장이라면 유선 단말기가 가장 무난한 선택입니다. 매장 형태와 업종만 말씀해 주시면 그에 맞춰 단말기를 추천해 드립니다.",
          "단순 카드 결제 위주의 매장에는 안정적인 유선 단말기를 먼저 권해드립니다. 업종에 따라 포장·배달 비중이나 홀 운영 방식까지 알려주시면 매장에 최적화된 구성을 제안드립니다.",
          "메뉴 구성이 단순하고 결제 동선이 고정된 매장이라면 유선 단말기로 깔끔하게 시작하실 수 있습니다. 업종과 운영 방식을 알려주시면 맞춤 상담을 도와드립니다.",
          "카운터 결제가 중심인 매장에는 유선 단말기를 기본으로 추천드립니다. 매장 규모와 업종을 알려주시면 불필요한 장비 없이 꼭 필요한 구성만 안내해 드립니다.",
        ],
        // 2번 문단 — 장비 조합 트렌드형
        [
          "최근에는 포장 주문이 늘면서 키오스크와 더불어 홀이 있는 음식점에서는 테이블오더를 카드단말기와 함께 도입하는 매장이 많습니다. {{REGION}}에서도 매장 형태에 맞춰 결제 장비를 한 번에 구성해 드립니다.",
          "요즘은 포장·비대면 주문 증가로 키오스크 비중이 늘고 있으며, 좌석이 많은 매장은 테이블오더를 단말기와 함께 갖추는 곳이 늘고 있습니다. {{REGION}} 매장 환경에 맞춰 필요한 장비를 한 번에 세팅해 드립니다.",
          "포장 손님이 많은 매장은 키오스크, 홀 회전이 빠른 매장은 테이블오더를 카드단말기와 묶어 도입하는 추세입니다. {{REGION}}에서도 매장에 맞는 조합으로 한 번에 구성해 드립니다.",
          "무인 주문 수요가 커지면서 키오스크와 테이블오더를 카드단말기와 함께 들이는 매장이 부쩍 늘었습니다. {{REGION}} 매장 형태를 보고 가장 효율적인 장비 구성을 제안드립니다.",
          "인건비 부담과 포장 주문 증가로, 키오스크·테이블오더를 결제 장비와 함께 도입하는 매장이 많아지고 있습니다. {{REGION}}에서도 매장 상황에 맞춰 한 번에 준비해 드립니다.",
          "카드단말기 하나로 끝내는 매장도 있지만, 요즘은 고객 편의를 위한 키오스크나 직원 동선 효율을 위해 테이블오더를 함께 두는 곳이 많습니다. {{REGION}} 매장 규모와 동선에 맞춰 필요한 장비만 골라 구성해 드립니다.",
        ],
        // 3번 문단 — 비용·서비스 보장형
        [
          "설치비·관리비·위약금은 모두 0원입니다. 카드사 가맹 심사부터 단말기 설치, 사용법 교육과 A/S까지 전담 매니저가 꼼꼼하게 챙겨드립니다.",
          "설치비도, 관리비도, 위약금도 없습니다. 가맹 심사와 설치, 사용 교육, 사후 A/S까지 전담 매니저가 처음부터 끝까지 책임지고 도와드립니다.",
          "숨은 비용 없이 설치비·관리비·위약금 0원으로 진행됩니다. 카드사 심사부터 설치, 교육, A/S까지 담당 매니저가 한 번에 처리해 드립니다.",
          "설치비·관리비·위약금이 들지 않습니다. 가맹 접수부터 설치와 사용법 안내, 이후 A/S까지 전담 매니저가 직접 챙겨 불편함이 없도록 해드립니다.",
          "비용 부담 없이 설치비·관리비·위약금 모두 0원입니다. 까다로운 가맹 심사와 설치, 교육, 사후 관리까지 전담 매니저가 도맡아 진행해 드립니다.",
          "설치비·관리비·위약금 0원으로, 추가 비용 걱정이 없습니다. 심사·설치·교육·A/S 전 과정을 전담 매니저가 책임지고 안내해 드립니다.",
        ],
      ],
      // 업종별 추천 매트릭스 (기본 5줄 — 모든 지역 공통, 지역별 강조는 regions.js)
      matrix: [
        {
          biz: "카페",
          gear: "포스기 · 키오스크",
          why: "메뉴 관리와 빠른 결제. 포장 고객을 위한 키오스크.",
        },
        {
          biz: "음식점 · 고깃집",
          gear: "포스기 · 테이블오더",
          why: "테이블에서 주문·결제, 홀 동선 단축.",
        },
        {
          biz: "분식 · 패스트푸드",
          gear: "포스기 · 키오스크",
          why: "대기 줄·포장 주문 무인으로 해결. 배달 위한 무선 단말기 추가.",
        },
        {
          biz: "학원 · 소형 매장",
          gear: "유선 단말기",
          why: "카운터 고정, 단순·안정적인 결제.",
        },
        {
          biz: "1인 · 팝업 매장",
          gear: "블루투스 단말기",
          why: "초소형, 스마트폰 연결해서 어디서든 결제.",
        },
      ],
      // 세이브샵에서 진행하면 좋은 점 (WHY 카드 형태)
      benefitsHead: {
        label: "WHY SAVESHOP",
        title: "신속 · 정직 · 정확<br><span class=\"hl\">믿을 수 있는 업체.</span>",
        desc: "투명하고 신뢰받는 제품으로 사장님의 힘이 되어 드리겠습니다.",
      },
      benefits: [
        {
          icon: "check",
          title: "설치비·관리비·위약금 0원",
          desc: "숨은 비용 없이 투명하게. 일시불 / 36개월 2가지 방법으로 정확한 금액을 안내드립니다.",
        },
        {
          icon: "star",
          title: "1:1 전담 매니저 시스템",
          desc: "매장 담당 1:1 전담 매니저 배정. 설치부터 교육, 사후 관리까지 확실하게 책임집니다.",
        },
        {
          icon: "calendar",
          title: "전자계약서 · A/S 1년 보장",
          desc: "전자계약서 작성 후 자동 발송으로 분실 걱정 없이. 매장 홍보 및 A/S 1년 보장.",
        },
      ],
    },

    // 6) 키워드 전용 FAQ — 후기 섹션 앞에 들어갈 자주 묻는 질문
    faq: [
      {
        q: "카드단말기 설치까지 얼마나 걸리나요?",
        a: "카드사 가맹 서류 접수로부터 심사가 진행되며, 최소 3일~5일내 설치 가능합니다. {{REGION}} 담당 매니저가 방문 설치 해드리고 있습니다.",
      },
      {
        q: "카드단말기 설치 시 다른 장비도 함께 설치 가능한가요?",
        a: "가능합니다. 매장 규모 및 업종에 따라 카드단말기, 키오스크, 테이블오더 한번에 설치 가능합니다.",
      },
      {
        q: "정말 설치비가 0원인가요?",
        a: "네. 설치비 0원입니다. 기기 비용은 일시불 혹은 36개월 할부로 납부하며, 납부 후 사장님 소유가 됩니다. 별도의 관리비도 없습니다.",
      },
      {
        q: "{{REGION}} 카드단말기 설치 후 사후 관리는 어떻게 진행되나요?",
        a: "설치한 매니저가 지속적으로 관리합니다. 결제기 장애 발생 시 빠른 응대가 가능합니다.",
      },
    ],
  },
};

// ===== CTA 하단 추천 배너 (모든 키워드 페이지 공통) =====
// live:true 인 것만 화면에 나옴. 새 카테고리가 생기면 live를 true로 바꾸면 자동 노출.
// {{REGION}} 은 지역명으로 자동 치환. link 안의 {{REGION}}도 치환됨.
// type: "scroll"=같은 페이지 내 이동(#products), "page"=다른 페이지로 이동
const CROSS_SELL = {
  heading: "{{REGION}}에서 이런 것도 가능해요",
  items: [
    {
      title: "포스기",
      desc: "주문·결제·매출 관리를 한 번에",
      icon: "desktop",
      link: "#products",
      type: "scroll",
      live: true,
    },
    {
      title: "키오스크",
      desc: "포장·대기 주문 무인 처리",
      icon: "kiosk",
      link: "#products",
      type: "scroll",
      live: true,
    },
    {
      title: "철거 · 원상복구",
      desc: "폐업·이전 매장 정리",
      icon: "tools",
      link: "/demolition",
      type: "page",
      live: true,
    },
    {
      title: "인터넷 · 가전",
      desc: "인터넷·가전 렌탈",
      icon: "wifi",
      link: "#",
      type: "page",
      live: false, // 준비중 — 페이지 생기면 true
    },
    {
      title: "스마트 자판기",
      desc: "무인 자판기 설치",
      icon: "vending",
      link: "#",
      type: "page",
      live: false, // 준비중
    },
  ],
};


// --- 페이지 생성 로직 ---
// render.js — Workers가 할 페이지 생성 로직을 Node로 미리 검증
// 사용법: node render.js 송도 카드단말기  →  out/송도-카드단말기.html 생성

// 데이터 불러오기 (regions.js / keywords.js는 

const FAQ_CSS = `
<style>
.faq-list .faq-item{border-bottom:1px solid #e5e7eb;padding:1.3em 0}
.faq-list .faq-item:first-child{border-top:1px solid #e5e7eb}
.faq-list .faq-q{font-weight:600;font-size:1.05rem;color:#111;margin-bottom:.5em;display:flex;gap:.5em}
.faq-list .faq-q::before{content:"Q.";color:var(--neon,#16c172);font-weight:700}
.faq-list .faq-a{font-size:.98rem;line-height:1.8;color:#555;padding-left:1.6em}
.region-context p{word-break:keep-all}
/* 업종별 추천 매트릭스 */
.matrix-wrap{overflow-x:auto}
.biz-matrix{width:100%;border-collapse:collapse;min-width:560px}
.biz-matrix th{background:#111;color:#fff;font-weight:600;font-size:.92rem;padding:14px 18px;text-align:left}
.biz-matrix th:first-child{border-radius:12px 0 0 0}
.biz-matrix th:last-child{border-radius:0 12px 0 0}
.biz-matrix td{padding:15px 18px;border-bottom:1px solid #eee;font-size:.96rem;color:#333;vertical-align:top}
.biz-matrix tbody tr:nth-child(even){background:#fafafa}
.biz-matrix tr.hot{background:#eafff5 !important}
.biz-matrix .biz{font-weight:700;color:#111;white-space:nowrap}
.biz-matrix .hot-tag{display:inline-block;margin-left:.5em;background:#16c172;color:#fff;font-size:.72rem;font-weight:600;padding:2px 8px;border-radius:20px;vertical-align:middle}
.biz-matrix .rec{color:#0c8a55;font-weight:600;white-space:nowrap}
.biz-matrix .why{color:#777;font-size:.9rem;word-break:keep-all}
.matrix-note{margin-top:1.3em;text-align:center;font-size:.95rem;color:#555;line-height:1.7;word-break:keep-all}
/* 세이브샵 장점 — WHY 카드 (템플릿의 .why-grid/.whyc 스타일 재사용) */
.why-block{margin-top:3.5em}
.why-block .sec-head{margin-bottom:2em}
/* CTA 하단 추천 배너 */
.xs-banner{background:#0a0c10;padding:3em 0}
.xs-banner .wrap{max-width:900px;margin:0 auto;padding:0 20px}
.xs-head{text-align:center;margin-bottom:1.6em}
.xs-label{font-size:.8rem;letter-spacing:.14em;color:#16c172;font-weight:600;margin-bottom:.5em}
.xs-title{font-size:1.35rem;color:#fff;font-weight:700}
.xs-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}
.xs-card{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:18px 20px;text-decoration:none;transition:border-color .2s,background .2s}
.xs-card:hover{background:rgba(22,193,114,.08);border-color:rgba(22,193,114,.4)}
.xs-ic{flex:none;width:44px;height:44px;border-radius:11px;background:rgba(22,193,114,.15);display:flex;align-items:center;justify-content:center;color:#16c172}
.xs-ic svg{width:22px;height:22px}
.xs-txt{display:flex;flex-direction:column;min-width:0}
.xs-t{color:#fff;font-size:1rem;font-weight:600}
.xs-d{color:#b6bcc6;font-size:.85rem}
.xs-arr{margin-left:auto;color:#6b7280;font-size:1.4rem;line-height:1}
@media(max-width:640px){.xs-grid{grid-template-columns:1fr}}
</style>`;


module.exports = { KEYWORDS, CROSS_SELL, FAQ_CSS };
