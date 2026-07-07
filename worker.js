// ===== 세이브샵 지역 페이지 동적 생성 Worker =====
// 자동 생성된 파일 (build-worker.js로 빌드). 직접 수정하지 말 것.
// 데이터 수정은 src/ 안의 파일에서 하고, "node build-worker.js"로 다시 빌드하세요.

// --- 템플릿 ---
// ===== 세이브샵 페이지 HTML 템플릿 =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.

const TEMPLATE = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="naver-site-verification" content="c1e0b5fd77819b9ba3c7284bd3ddd5ddb069c5cd" />
<title>{{REGION}} 카드단말기·포스기 설치 | 세이브샵 - 설치비 0원, 전담 매니저</title>
<meta name="description" content="{{REGION}} 카드단말기·포스기·유무선단말기·키오스크·테이블오더·토스프론트까지. 설치비·관리비·위약금 0원, 1:1 전담 매니저가 설치부터 카드 가맹 심사·교육·A/S까지 책임집니다. 무료 상담 010-4668-4942.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans+KR:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Favicon -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png">
<link rel="apple-touch-icon" href="/images/favicon-180.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#16c172">

<!-- Open Graph (카톡·페북·검색 공유 썸네일) -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="세이브샵 SAVESHOP">
<meta property="og:locale" content="ko_KR">
<meta property="og:title" content="{{REGION}} 카드단말기·포스기 설치 | 세이브샵">
<meta property="og:description" content="{{REGION}} 카드단말기·포스기·키오스크·테이블오더 설치비 0원. 전화 한 통이면 끝. 1:1 전담 매니저가 설치부터 A/S까지. 상담 010-4668-4942.">
<meta property="og:image" content="https://thesaveshop.com/images/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://thesaveshop.com/{{REGION}}/{{KW_CRUMB}}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{REGION}} 카드단말기·포스기 설치 | 세이브샵">
<meta name="twitter:description" content="{{REGION}} 결제장비 설치비 0원. 전화 한 통이면 끝. 상담 010-4668-4942.">
<meta name="twitter:image" content="https://thesaveshop.com/images/og-image.png">
<style>
  :root{
    --bg:#ffffff;
    --bg-2:#f6f8fa;
    --bg-3:#eef1f5;
    --ink:#0c0e14;
    --ink-2:#2a2e3a;
    --muted:#5b6275;
    --muted-2:#9aa1b2;
    --line:rgba(12,14,20,.10);
    --line-2:rgba(12,14,20,.16);
    --neon:#16c172;
    --neon-bright:#39ff9e;
    --neon-dim:#0fa862;
    --neon-soft:rgba(22,193,114,.12);
    --cyan:#0bb6d6;
    --d-bg:#06070a;
    --d-bg-2:#0c0e14;
    --d-bg-3:#121521;
    --d-ink:#f4f6fb;
    --d-muted:#8b92a8;
    --d-muted-2:#5b6178;
    --d-line:rgba(255,255,255,.09);
    --d-line-2:rgba(57,255,158,.25);
    --display:'Space Grotesk',sans-serif;
    --body:'IBM Plex Sans KR',sans-serif;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{
    font-family:var(--body);background:var(--bg);color:var(--ink);
    -webkit-font-smoothing:antialiased;overflow-x:hidden;line-height:1.7;
    word-break:keep-all;overflow-wrap:break-word;
  }
  a{color:inherit;text-decoration:none}
  /* 콘텐츠 보호: 이미지 드래그/저장 불편화. 폼 입력란은 선택 허용 */
  img{-webkit-user-drag:none;user-drag:none;-webkit-user-select:none;user-select:none;pointer-events:none}
  body{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}
  input,textarea,select,[contenteditable="true"]{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}
  ::selection{background:var(--neon);color:#fff}
  .wrap{max-width:1100px;margin:0 auto;padding:0 24px}

  /* ===== TOPBAR (메인과 동일) ===== */
  .topbar{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;
    padding:14px 28px;background:rgba(255,255,255,.85);backdrop-filter:saturate(180%) blur(14px);border-bottom:1px solid var(--line);transition:all .3s}
  /* 히어로(다크) 위에 있을 때(최상단)는 투명 다크 + 밝은 메뉴 (index와 동일) */
  .topbar.on-hero{background:linear-gradient(180deg,rgba(6,7,10,.85),transparent);border-bottom-color:transparent}
  .topbar.on-hero .logo{color:var(--d-ink)}
  .topbar.on-hero .logo small{color:var(--d-muted)}
  .topbar.on-hero .top-menu a{color:var(--d-muted)}
  .topbar.on-hero .top-menu a.active{color:var(--neon-bright)}
  .topbar.on-hero .top-menu a:hover{color:var(--neon-bright)}
  .topbar.on-hero .top-menu a::after{background:var(--neon-bright)}
  .topbar.on-hero .soon{color:var(--d-muted);background:rgba(255,255,255,.08);border-color:var(--d-line)}
  .topbar.on-hero .menu-toggle span{background:var(--d-ink)}
  .topbar.on-hero .top-phone{color:var(--neon-bright)}
  .logo{display:flex;align-items:center;gap:9px;font-family:var(--display);font-weight:700;font-size:20px;letter-spacing:-.01em;color:var(--ink);white-space:nowrap;flex-shrink:0;transition:color .3s}
  .logo .mark{width:30px;height:30px;border-radius:9px;background:var(--neon);color:#fff;display:grid;place-items:center;font-weight:700;font-size:16px}
  .logo small{font-family:var(--body);font-weight:400;font-size:10px;color:var(--muted);letter-spacing:.12em;margin-left:1px}
  .top-menu{display:flex;align-items:center;gap:26px;font-family:var(--body);font-weight:500;font-size:14.5px}
  .top-menu a{color:var(--ink-2);transition:color .15s;position:relative;padding:4px 0}
  .top-menu a::after{content:"";position:absolute;left:0;bottom:-2px;width:0;height:2px;background:var(--neon);transition:width .2s}
  .top-menu a:hover{color:var(--neon-dim)}
  .top-menu a:hover::after{width:100%}
  .top-menu a.active{color:var(--neon-dim);font-weight:600}
  .top-menu a.active::after{width:100%}
  .soon{display:inline-block;margin-left:5px;font-size:9.5px;font-weight:600;color:var(--muted-2);background:var(--bg-3);border:1px solid var(--line);padding:1px 5px;border-radius:5px;vertical-align:middle;transform:translateY(-1px)}
  .top-cta{display:flex;align-items:center;gap:14px}
  .top-phone{font-family:var(--display);font-weight:600;font-size:15px;color:var(--neon-dim);display:flex;align-items:center;gap:7px}
  .top-btn{font-family:var(--body);font-weight:600;font-size:13.5px;padding:9px 16px;border-radius:100px;background:var(--neon);color:#fff;transition:all .15s}
  .top-btn:hover{transform:translateY(-1px);box-shadow:0 8px 20px -8px var(--neon)}
  .top-call-icon{display:none;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:var(--neon);color:#fff;font-size:17px;flex-shrink:0}
  .menu-cta{display:none}
  .menu-toggle{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:6px}
  .menu-toggle span{width:22px;height:2px;background:var(--ink);border-radius:2px;transition:transform .3s,opacity .3s}
  .menu-toggle.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  .menu-toggle.open span:nth-child(2){opacity:0}
  .menu-toggle.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}

  /* ===== HERO (다크) ===== */
  .hero{background:var(--d-bg);color:var(--d-ink);position:relative;overflow:hidden;padding:140px 24px 80px}
  .hero::before{content:"";position:absolute;inset:0;z-index:0;
    background-image:linear-gradient(var(--d-line) 1px,transparent 1px),linear-gradient(90deg,var(--d-line) 1px,transparent 1px);
    background-size:60px 60px;-webkit-mask-image:radial-gradient(ellipse 70% 70% at 60% 40%,#000,transparent 80%);mask-image:radial-gradient(ellipse 70% 70% at 60% 40%,#000,transparent 80%);opacity:.6}
  .hero .glow{position:absolute;border-radius:50%;filter:blur(90px);z-index:0}
  .hero .g1{width:460px;height:460px;background:var(--neon-bright);top:-150px;right:-110px;opacity:.16}
  .hero .g2{width:400px;height:400px;background:var(--cyan);bottom:-160px;left:-110px;opacity:.12}
  .hero-inner{max-width:1100px;margin:0 auto;position:relative;z-index:2}
  .breadcrumb{font-family:var(--display);font-size:13px;letter-spacing:.04em;color:var(--d-muted);margin-bottom:22px}
  .breadcrumb a{color:var(--d-muted)}
  .breadcrumb a:hover{color:var(--neon-bright)}
  .breadcrumb .sep{margin:0 8px;opacity:.5}
  .breadcrumb .cur{color:var(--neon-bright)}
  .hero-kicker{display:inline-flex;align-items:center;gap:9px;font-family:var(--display);font-weight:500;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--neon-bright);border:1px solid var(--d-line-2);background:rgba(57,255,158,.1);padding:8px 16px;border-radius:100px;margin-bottom:28px}
  .hero-kicker .live{width:7px;height:7px;border-radius:50%;background:var(--neon-bright);box-shadow:0 0 0 0 var(--neon-bright);animation:ping 1.8s ease-out infinite}
  .hero h1{font-family:var(--display);font-weight:700;font-size:clamp(36px,6vw,68px);line-height:1.02;letter-spacing:-.03em;margin-bottom:24px}
  .hero h1 .reg{color:var(--region-color,var(--neon-bright));text-shadow:0 0 30px rgba(57,255,158,.5)}
  .hero-sub{font-size:clamp(15px,2vw,18px);color:var(--d-muted);max-width:600px;margin-bottom:34px}
  .hero-sub b{color:var(--d-ink);font-weight:600}
  .hero-cta{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:40px}
  .btn-neon{font-family:var(--display);font-weight:600;font-size:16px;padding:15px 28px;border-radius:100px;background:var(--neon-bright);color:#000;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:9px;transition:all .18s}
  .btn-neon:hover{transform:translateY(-2px);box-shadow:0 12px 36px -10px var(--neon-bright)}
  .btn-line{font-family:var(--display);font-weight:600;font-size:16px;padding:15px 28px;border-radius:100px;background:transparent;color:var(--d-ink);border:1px solid var(--d-line-2);cursor:pointer;transition:all .18s}
  .btn-line:hover{border-color:var(--neon-bright);color:var(--neon-bright)}
  .hero-tags{display:flex;gap:10px;flex-wrap:wrap}
  .hero-tags span{font-size:13px;color:var(--d-muted);border:1px solid var(--d-line);border-radius:100px;padding:6px 14px}
  .hero-tags b{color:var(--neon-bright);font-weight:600}

  /* ===== SECTION SHELL ===== */
  section.blk{padding:80px 0}
  #products{background:var(--bg-2)}
  #process{background:var(--bg)}
  #screening{background:var(--bg-2)}
  #why{background:var(--bg)}
  .sec-head{max-width:680px;margin-bottom:46px}
  .sec-head.center{margin-left:auto;margin-right:auto;text-align:center}
  .sec-label{font-family:var(--display);font-weight:500;font-size:12.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--neon-dim);margin-bottom:14px}
  .sec-title{font-family:var(--display);font-weight:700;font-size:clamp(27px,4vw,42px);line-height:1.08;letter-spacing:-.025em;color:var(--ink)}
  .sec-title .hl{color:var(--neon-dim)}
  .sec-desc{font-size:16px;color:var(--muted);margin-top:14px}

  /* ===== PRODUCT BLOCKS ===== */
  .prod-list{display:flex;flex-direction:column;gap:18px}
  .prodrow{display:grid;grid-template-columns:200px 1fr;gap:0;border:1px solid var(--line);border-radius:18px;overflow:hidden;background:var(--bg);transition:all .2s}
  .prodrow:hover{box-shadow:0 20px 44px -28px rgba(22,193,114,.35);border-color:var(--neon-soft)}
  .prodrow .left{background:linear-gradient(160deg,var(--d-bg-2),var(--d-bg));color:#fff;padding:28px 24px;display:flex;flex-direction:column;justify-content:center;position:relative}
  .prodrow .left::before{content:"";position:absolute;top:0;left:0;bottom:0;width:3px;background:var(--neon-bright)}
  .prodrow .left .pnum{font-family:var(--display);font-size:12px;color:var(--neon-bright);font-weight:600;letter-spacing:.1em;margin-bottom:10px}
  .prodrow .left .pname{font-family:var(--display);font-weight:700;font-size:22px;letter-spacing:-.02em;line-height:1.15}
  .prodrow .left .picon{margin-bottom:14px;color:var(--neon-bright)}
  .prodrow .left .picon svg{width:30px;height:30px}
  .prodrow .right{padding:26px 28px}
  /* 제품 이미지 */
  .pimg{width:100%;aspect-ratio:4/3;border-radius:12px;overflow:hidden;background:var(--bg-3);margin-bottom:18px;position:relative;border:1px solid var(--line)}
  .pimg img{width:100%;height:100%;object-fit:cover;display:block}
  .pimg .ph-fallback{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--muted-2);font-size:13px}
  .pimg .ph-fallback svg{width:34px;height:34px;opacity:.5}
  .prodrow .rcols{display:grid;grid-template-columns:300px 1fr;gap:24px;align-items:start}
  .prodrow .rcols .pimg{margin-bottom:0}
  .prodrow .ptop{font-size:15px;color:var(--ink-2);font-weight:500;margin-bottom:16px;line-height:1.6}
  .variant-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .variant{background:var(--bg-2);border:1px solid var(--line);border-radius:12px;padding:16px 18px}
  .variant .vimg{width:100%;aspect-ratio:4/3;border-radius:10px;overflow:hidden;background:var(--bg-3);border:1px solid var(--line);position:relative;margin-bottom:14px}
  .variant .vimg img{width:100%;height:100%;object-fit:cover;display:block}
  .variant .vimg .ph-fallback{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;height:100%;color:var(--muted-2);font-size:13px}
  .variant .vimg .ph-fallback svg{width:34px;height:34px;opacity:.5}
  .variant h5{font-family:var(--display);font-weight:600;font-size:15px;color:var(--ink);margin-bottom:10px;display:flex;align-items:center;gap:7px}
  .variant h5::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--neon);flex-shrink:0}
  .variant ul{list-style:none;display:flex;flex-direction:column;gap:6px}
  .variant li{font-size:13px;color:var(--muted);padding-left:14px;position:relative;line-height:1.55}
  .variant li::before{content:"·";position:absolute;left:3px;color:var(--neon)}
  .single-feats{list-style:none;display:flex;flex-direction:column;gap:7px}
  .single-feats li{font-size:14px;color:var(--muted);padding-left:18px;position:relative}
  .single-feats li::before{content:"";position:absolute;left:2px;top:9px;width:6px;height:6px;border-radius:50%;background:var(--neon)}
  .pnote{margin-top:14px;font-size:12.5px;color:var(--muted-2);background:var(--bg-2);border-radius:8px;padding:9px 12px;border-left:3px solid var(--neon-soft)}

  /* ===== PROCESS / SCREENING (numbered steps) ===== */
  .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .stepc{border:1px solid var(--line);border-radius:16px;padding:28px 24px;background:var(--bg);position:relative;transition:all .2s}
  #screening .stepc{background:var(--bg)}
  .stepc:hover{border-color:var(--neon-soft);box-shadow:0 16px 36px -26px rgba(22,193,114,.35)}
  .stepc .snum{font-family:var(--display);font-weight:700;font-size:14px;color:#fff;background:var(--neon);width:30px;height:30px;border-radius:9px;display:grid;place-items:center;margin-bottom:18px}
  .stepc h4{font-family:var(--display);font-weight:600;font-size:18px;color:var(--ink);margin-bottom:10px;letter-spacing:-.01em}
  .stepc p{font-size:14px;color:var(--muted);line-height:1.6}
  .stepc .tag{display:inline-block;margin-top:12px;font-size:11.5px;font-weight:600;color:var(--neon-dim);background:var(--neon-soft);padding:3px 10px;border-radius:100px}

  /* ===== WHY ===== */
  .why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .whyc{border:1px solid var(--line);border-radius:16px;padding:28px 24px;background:var(--bg-2);transition:all .2s}
  .whyc:hover{border-color:var(--neon);background:var(--bg);box-shadow:0 16px 36px -26px rgba(22,193,114,.4)}
  .whyc .wi{color:var(--neon);margin-bottom:14px}
  .whyc .wi svg{width:28px;height:28px}
  .whyc h4{font-family:var(--display);font-weight:600;font-size:17px;color:var(--ink);margin-bottom:8px}
  .whyc p{font-size:13.5px;color:var(--muted);line-height:1.6}

  /* ===== REVIEWS SLIDER ===== */
  #reviews{background:var(--bg-2)}
  .rev-slider{position:relative;margin-top:10px}
  .rev-track{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding:4px 2px 14px;-webkit-overflow-scrolling:touch}
  .rev-track::-webkit-scrollbar{height:6px}
  .rev-track::-webkit-scrollbar-thumb{background:var(--line-2);border-radius:10px}
  .rev-card{flex:0 0 auto;width:340px;scroll-snap-align:start}
  .rev-card .rimg{width:100%;aspect-ratio:4/3;border-radius:14px;overflow:hidden;background:var(--bg-3);border:1px solid var(--line);position:relative}
  .rev-card .rimg img{width:100%;height:100%;object-fit:cover;display:block}
  .rev-card .cap{font-size:13px;color:var(--muted);margin-top:10px;padding-left:2px}
  .rev-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;height:100%;color:var(--muted-2);font-size:13px}
  .rev-empty svg{width:34px;height:34px;opacity:.5}
  .rev-nav{display:flex;gap:8px;justify-content:flex-end;margin-top:6px}
  .rev-nav button{width:42px;height:42px;border-radius:50%;border:1px solid var(--line-2);background:var(--bg);color:var(--ink);cursor:pointer;font-size:18px;display:grid;place-items:center;transition:all .15s}
  .rev-nav button:hover{border-color:var(--neon);color:var(--neon-dim);background:var(--neon-soft)}
  .rev-placeholder{border:1.5px dashed var(--line-2);border-radius:14px;padding:40px 20px;text-align:center;color:var(--muted-2);font-size:14px;line-height:1.7}

  /* ===== CONTACT (메인과 동일 톤) ===== */
  #contact{background:var(--bg-2);border-top:1px solid var(--line)}
  .ct-grid{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center}
  .ct-left h2{font-family:var(--display);font-weight:700;font-size:clamp(28px,4vw,46px);line-height:1.05;letter-spacing:-.03em;margin-bottom:18px;color:var(--ink)}
  .ct-left .hl{color:var(--neon-dim)}
  .ct-left p{font-size:16px;color:var(--muted);max-width:400px;margin-bottom:30px}
  .ct-methods{display:flex;flex-direction:column;gap:12px}
  .ctm{display:flex;align-items:center;gap:15px;padding:17px 20px;border:1px solid var(--line);border-radius:14px;background:var(--bg);transition:all .18s;cursor:pointer}
  .ctm:hover{border-color:var(--neon);transform:translateX(4px)}
  .ctm .ci{width:44px;height:44px;border-radius:12px;background:var(--neon);color:#fff;display:grid;place-items:center;font-size:20px;flex-shrink:0}
  .ctm .cl{font-size:12px;color:var(--muted)}
  .ctm .cv{font-family:var(--display);font-weight:600;font-size:18px;color:var(--ink)}
  .formbox{border:1px solid var(--line);border-radius:22px;padding:34px;background:var(--bg);position:relative;overflow:hidden;box-shadow:0 30px 60px -40px rgba(12,14,20,.3)}
  .formbox::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--neon),var(--cyan))}
  .formbox h3{font-family:var(--display);font-weight:600;font-size:21px;margin-bottom:5px;color:var(--ink)}
  .formbox .fs{font-size:13px;color:var(--muted);margin-bottom:24px}
  .fld{margin-bottom:17px}
  .fld label{display:block;font-size:13px;font-weight:500;color:var(--ink);margin-bottom:8px}
  .fld input{width:100%;font-family:var(--body);font-size:15px;color:var(--ink);padding:14px 16px;border:1px solid var(--line-2);border-radius:12px;background:var(--bg);transition:all .15s}
  .fld input::placeholder{color:var(--muted-2)}
  .fld input:focus{outline:none;border-color:var(--neon);box-shadow:0 0 0 3px var(--neon-soft)}
  .nchips{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}
  .nchip{font-size:11.5px;font-weight:500;cursor:pointer;padding:11px 4px;border-radius:10px;border:1px solid var(--line-2);background:var(--bg);color:var(--muted);transition:all .15s;user-select:none;text-align:center;white-space:nowrap}
  .nchip:hover{border-color:var(--neon);color:var(--ink)}
  .nchip.on{background:var(--neon);color:#fff;border-color:var(--neon);font-weight:600}
  .nsubmit{width:100%;font-family:var(--display);font-weight:600;font-size:16px;padding:17px;border:none;border-radius:13px;background:var(--neon);color:#fff;cursor:pointer;margin-top:8px;transition:all .15s}
  .nsubmit:hover{box-shadow:0 14px 34px -12px var(--neon);transform:translateY(-1px)}
  .fnote{font-size:11.5px;color:var(--muted-2);text-align:center;margin-top:13px}

  /* ===== FOOTER ===== */
  .one-foot{background:var(--ink);color:var(--muted-2);text-align:center;padding:22px 24px;font-size:12.5px;line-height:1.6}
  .one-foot b{color:var(--neon-bright);font-weight:600}
  .one-foot a{color:var(--muted-2)}

  /* ===== MOBILE BAR ===== */
  .mbar{display:none;position:fixed;left:0;right:0;bottom:0;z-index:200;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);border-top:1px solid var(--line);padding:9px 12px;gap:8px}
  .mbar a{flex:1;text-align:center;font-family:var(--display);font-weight:600;font-size:14px;padding:13px 0;border-radius:12px}
  .mb1{background:var(--neon);color:#fff}
  .mb3{background:var(--bg-3);color:var(--ink);border:1px solid var(--line)}

  .rv{opacity:0;transform:translateY(26px);transition:opacity .6s ease,transform .6s ease}
  .rv.in{opacity:1;transform:none}

  @keyframes ping{0%{box-shadow:0 0 0 0 rgba(57,255,158,.6)}70%{box-shadow:0 0 0 9px rgba(57,255,158,0)}100%{box-shadow:0 0 0 0 rgba(57,255,158,0)}}

  @media(max-width:920px){
    .topbar{padding:14px 18px}
    .top-phone,.top-btn{display:none}
    .top-call-icon{display:flex}
    .menu-toggle{display:flex}
    .top-menu{position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;background:var(--bg);border-bottom:1px solid var(--line);box-shadow:0 14px 30px -20px rgba(0,0,0,.3);max-height:0;overflow:hidden;transition:max-height .3s ease}
    .top-menu.open{max-height:400px}
    .top-menu a{padding:15px 22px;border-bottom:1px solid var(--line);font-size:15.5px}
    .top-menu .menu-cta{display:block;background:var(--neon);color:#fff;font-weight:600;text-align:center;border-bottom:none}
    .prodrow{grid-template-columns:1fr}
    .prodrow .left{flex-direction:row;align-items:center;gap:14px;padding:18px 22px}
    .prodrow .left::before{width:100%;height:3px;top:0;bottom:auto}
    .prodrow .left .picon{margin-bottom:0}
    .prodrow .left .pnum{margin-bottom:4px}
    .prodrow .rcols{grid-template-columns:1fr;gap:18px}
    .steps{grid-template-columns:1fr}
    .why-grid{grid-template-columns:1fr}
    .ct-grid{grid-template-columns:1fr;gap:34px}
  }
  @media(max-width:600px){
    section.blk{padding:56px 0}
    .hero{padding:104px 18px 64px}
    .variant-grid{grid-template-columns:1fr}
    .nchips{grid-template-columns:repeat(2,1fr)}
    .mbar{display:flex}
    body{padding-bottom:62px}
  }
</style>
</head>
<body>

<!-- TOPBAR -->
<div class="topbar">
  <a href="/" class="logo"><span class="mark">S</span>세이브샵<small>SAVESHOP</small></a>
  <nav class="top-menu" id="topMenu">
    <a href="/card-terminal" class="active">카드단말기</a>
    <a href="javascript:void(0)" onclick="comingSoon('인터넷·가전')">인터넷·가전<span class="soon">준비중</span></a>
    <a href="javascript:void(0)" onclick="comingSoon('스마트자판기')">스마트자판기<span class="soon">준비중</span></a>
    <a href="/demolition">철거·원상복구</a>
    <a href="#contact" class="menu-cta">무료 상담 신청</a>
  </nav>
  <div class="top-cta">
    <a href="tel:010-4668-4942" class="top-phone">☎ 010-4668-4942</a>
    <a href="#contact" class="top-btn">무료 상담</a>
    <a href="tel:010-4668-4942" class="top-call-icon" aria-label="전화 걸기">☎</a>
    <button class="menu-toggle" id="menuToggle" aria-label="메뉴 열기"><span></span><span></span><span></span></button>
  </div>
</div>

<!-- HERO -->
<header class="hero">
  <div class="glow g1"></div><div class="glow g2"></div>
  <div class="hero-inner">
    <nav class="breadcrumb"><a href="/">홈</a><span class="sep">›</span><span class="cur">{{KW_CRUMB}}</span></nav>
    <span class="hero-kicker"><span class="live"></span>설치비·관리비·위약금 0원</span>
    <h1>{{HERO_TITLE}}<br>전화 한 통이면 끝.</h1>
    <p class="hero-sub"><b><span style="white-space:nowrap">유·무선 단말기부터 포스기,</span> <span style="white-space:nowrap">키오스크, 테이블오더, 토스프론트까지.</span></b> <span style="white-space:nowrap">매장 결제에 필요한 모든 장비를</span> <span style="white-space:nowrap">1:1 전담 매니저가</span> <span style="white-space:nowrap">설치부터 카드 가맹 심사,</span> <span style="white-space:nowrap">교육, A/S까지 책임집니다.</span></p>
    <div class="hero-cta">
      <a href="tel:010-4668-4942" class="btn-neon">☎ 010-4668-4942</a>
      <a href="#contact" class="btn-line">간편 상담 신청 →</a>
    </div>
    <div class="hero-tags">
      <span><b>✓</b> 설치비 0원</span>
      <span><b>✓</b> 1:1 전담 매니저</span>
      <span><b>✓</b> A/S 1년 보장</span>
      <span><b>✓</b> 전자계약서</span>
    </div>
  </div>
</header>

<!-- REGION CONTEXT + KEYWORD INTRO (PRODUCTS 앞) -->
<section class="blk" id="region-intro" style="background:#fff">
  <div class="wrap">
    <div class="sec-head rv">
      <div class="sec-label">{{KW_LABEL}}</div>
      <h2 class="sec-title">{{KW_HEADING}}</h2>
    </div>
    <div class="region-context rv">
      <p style="font-size:1.05rem;line-height:1.9;color:#333;margin-bottom:1.4em">{{REGION_CONTEXT}}</p>
      {{KW_BODY}}
    </div>
    {{KW_TYPES}}
    {{KW_BENEFITS}}
  </div>
</section>

<!-- PRODUCTS -->
<section class="blk" id="products">
  <div class="wrap">
    <div class="sec-head rv">
      <div class="sec-label">PRODUCTS</div>
      <h2 class="sec-title">매장 결제 장비,<br><span class="hl">필요한 건 다 있습니다.</span></h2>
      <p class="sec-desc"><span style="white-space:nowrap">업종과 매장 환경에 맞는</span> <span style="white-space:nowrap">최적의 장비를 추천해드립니다.</span><br><span style="white-space:nowrap">전화 한 통화로 신청하세요.</span></p>
    </div>

    <div class="prod-list">

      <!-- 포스기 -->
      <div class="prodrow rv">
        <div class="left">
          <span class="picon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="11" rx="1.5"/><line x1="3" y1="19" x2="21" y2="19"/><line x1="8" y1="15" x2="8" y2="19"/><line x1="16" y1="15" x2="16" y2="19"/></svg></span>
          <span class="pnum">POS</span>
          <span class="pname">포스기</span>
        </div>
        <div class="right">
          <div class="rcols">
            <div class="pimg">
              <img src="images/products/product-pos.jpg" alt="포스기 제품 사진" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
              <div class="ph-fallback" style="display:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>이미지 준비중</div>
            </div>
            <div>
              <p class="ptop">내구성과 편리함을 겸비한 포스기 세트 — 포스기 + 금전함 + 3인치 단말기 + 용지 구성으로, 주문·결제·매출 관리를 한 번에.</p>
              <ul class="single-feats">
                <li>배달(배민·쿠팡이츠·요기요) / 음악 등 프로그램 설치 가능</li>
                <li>선불제 / 후불제 프로그램 세팅 가능, 주문서 출력 지원</li>
                <li>매장별 전산(ASP)으로 일·주·월 단위, 상품별·수단별 매출 확인</li>
                <li>3인치 단말기 — 영수증 출력 및 비상시 결제용</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 유선 단말기 -->
      <div class="prodrow rv">
        <div class="left">
          <span class="picon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/></svg></span>
          <span class="pnum">WIRED</span>
          <span class="pname">유선<br>단말기</span>
        </div>
        <div class="right">
          <p class="ptop">작지만 성능은 큰 유선단말기. 인터넷선(LAN) 또는 유선 전화선으로 연결, IC/MS 카드결제·삼성페이 등 모든 결제 OK.</p>
          <div class="variant-grid">
            <div class="variant">
              <div class="vimg">
                <img src="images/products/product-wired-3.jpg" alt="3인치 유선단말기 제품 사진" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <div class="ph-fallback" style="display:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>이미지 준비중</div>
              </div>
              <h5>3인치 유선단말기</h5>
              <ul>
                <li>일반 PC(데스크탑/노트북) 및 금전함 연동 가능</li>
                <li>영수증 오토 컷팅 / 신속 출력</li>
                <li>서명패드 패키지</li>
              </ul>
            </div>
            <div class="variant">
              <div class="vimg">
                <img src="images/products/product-wired-2.jpg" alt="2인치 유선단말기 제품 사진" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <div class="ph-fallback" style="display:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>이미지 준비중</div>
              </div>
              <h5>2인치 유선단말기</h5>
              <ul>
                <li>단말기 + 서명패드 일체형</li>
                <li>소형 유선 단말기로 신속 영수증 출력</li>
                <li>세련된 디자인으로 공간 활용도 최상</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 무선 단말기 -->
      <div class="prodrow rv">
        <div class="left">
          <span class="picon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="9" y1="6" x2="15" y2="6"/><circle cx="12" cy="17" r="1.4"/></svg></span>
          <span class="pnum">WIRELESS</span>
          <span class="pname">무선<br>단말기</span>
        </div>
        <div class="right">
          <p class="ptop">이동에 최적화된 무선 단말기. 배달·외부결제·매장 내 비상용까지, 어디서든 신속·정확하게 결제 가능합니다.</p>
          <div class="variant-grid">
            <div class="variant">
              <div class="vimg">
                <img src="images/products/product-wireless.jpg" alt="무선단말기 제품 사진" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <div class="ph-fallback" style="display:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>이미지 준비중</div>
              </div>
              <h5>무선단말기</h5>
              <ul>
                <li>초경량·초슬림, 결제 후 영수증 출력</li>
                <li>통신약정(1년)으로 어디서든 결제 가능</li>
                <li>휴대폰 보조 배터리 충전 가능</li>
              </ul>
            </div>
            <div class="variant">
              <div class="vimg">
                <img src="images/products/product-bluetooth.jpg" alt="블루투스 단말기 제품 사진" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <div class="ph-fallback" style="display:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>이미지 준비중</div>
              </div>
              <h5>블루투스 단말기</h5>
              <ul>
                <li>초경량·스마트폰(iOS·안드로이드) 연결</li>
                <li>결제 후 전표 이미지 문자·카톡·이메일 발송</li>
                <li>완충 후 800회 결제 가능</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 토스 프론트 -->
      <div class="prodrow rv">
        <div class="left">
          <span class="picon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="15" y2="10"/><circle cx="12" cy="16.5" r="1.4"/></svg></span>
          <span class="pnum">TOSS</span>
          <span class="pname">토스<br>프론트</span>
        </div>
        <div class="right">
          <div class="rcols">
            <div class="pimg">
              <img src="images/products/product-toss.jpg" alt="토스프론트 제품 사진" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
              <div class="ph-fallback" style="display:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>이미지 준비중</div>
            </div>
            <div>
              <p class="ptop">요즘 대세! 토스프론트 — 포스기·유선단말기 전용 멀티패드. 카드·삼성/애플페이·토스페이 얼굴결제·QR 간편결제까지 한 화면에서.</p>
              <ul class="single-feats">
                <li>카드, 삼성·애플페이, QR 간편결제(토스·카카오·네이버·제로페이 등) 지원</li>
                <li>토스페이 얼굴 결제 — 토스포인트 사용 가능</li>
              </ul>
              <div class="pnote">※ 토스프론트는 포스기/카드단말기와 함께 설치되는 멀티패드로, 단독으로는 진행하지 않습니다.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 키오스크 -->
      <div class="prodrow rv">
        <div class="left">
          <span class="picon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="16" rx="1.5"/><line x1="9" y1="14" x2="15" y2="14"/><line x1="10" y1="22" x2="14" y2="22"/><line x1="12" y1="18" x2="12" y2="22"/></svg></span>
          <span class="pnum">KIOSK</span>
          <span class="pname">키오스크</span>
        </div>
        <div class="right">
          <p class="ptop">주문부터 결제까지! 키오스크(무인결제기) — 슬림한 디자인에 단품부터 세트 구성까지. 인건비 절감·주문 실수 방지·매장 회전율 상승.</p>
          <div class="variant-grid">
            <div class="variant">
              <div class="vimg">
                <img src="images/products/product-kiosk-15.jpg" alt="15인치 키오스크 제품 사진" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <div class="ph-fallback" style="display:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>이미지 준비중</div>
              </div>
              <h5>15인치 키오스크</h5>
              <ul>
                <li>15인치 키오스크 + 3인치 단말기</li>
                <li>포스기 세트 옵션별 상이</li>
              </ul>
            </div>
            <div class="variant">
              <div class="vimg">
                <img src="images/products/product-kiosk-21.jpg" alt="21인치 키오스크 제품 사진" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <div class="ph-fallback" style="display:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>이미지 준비중</div>
              </div>
              <h5>21인치 / 21인치 스탠드형</h5>
              <ul>
                <li>21인치 키오스크 — 3인치 or 포스기 세트 옵션</li>
                <li>21인치 스탠드형 — 3인치 or 포스기 세트 옵션</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 테이블오더 -->
      <div class="prodrow rv">
        <div class="left">
          <span class="picon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></span>
          <span class="pnum">ORDER</span>
          <span class="pname">테이블<br>오더</span>
        </div>
        <div class="right">
          <div class="rcols">
            <div class="pimg">
              <img src="images/products/product-order.jpg" alt="테이블오더 제품 사진" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
              <div class="ph-fallback" style="display:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>이미지 준비중</div>
            </div>
            <div>
              <p class="ptop">선불제 / 후불제 테이블오더 — 주문결제·직원호출·커스터마이징·다국어 지원. 음식점·브런치카페·주점·호프집·고깃집에 추천!</p>
              <ul class="single-feats">
                <li>운영 효율 극대화, 비용 절감 효과</li>
                <li>매장 회전율 증가 및 주문 누락 0%</li>
                <li>한국어·영어·일본어·중국어 다국어 지원</li>
                <li>선불제 / 후불제 방식 모두 세팅 가능</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- PROCESS -->
<section class="blk" id="process">
  <div class="wrap">
    <div class="sec-head rv">
      <div class="sec-label">HOW IT WORKS</div>
      <h2 class="sec-title">신청부터 설치까지,<br><span class="hl">전담 매니저가 끝까지.</span></h2>
      <p class="sec-desc"><span style="white-space:nowrap">복잡한 절차 없이,</span> <span style="white-space:nowrap">전화 한 통이면</span> <span style="white-space:nowrap">담당 매니저가</span> <span style="white-space:nowrap">처음부터 끝까지 안내합니다.</span></p>
    </div>
    <div class="steps">
      <div class="stepc rv">
        <div class="snum">1</div>
        <h4>담당자 연락 → 서류 안내</h4>
        <p>카드사 가맹 심사 등록에 필요한 서류를 담당 매니저가 안내드립니다.</p>
        <span class="tag">상담 후 바로</span>
      </div>
      <div class="stepc rv">
        <div class="snum">2</div>
        <h4>카드사 가맹 심사 · 장비 테스트</h4>
        <p>카드 가맹 심사는 평일 기준 3~4일 소요. 그동안 담당자가 설치 장비를 테스트·준비합니다.</p>
        <span class="tag">평일 3~4일</span>
      </div>
      <div class="stepc rv">
        <div class="snum">3</div>
        <h4>장비 설치 · 사용법 교육</h4>
        <p>담당자가 매장에 방문해 계약서 작성 후 설치하고, 테스트 완료 후 사용법까지 안내드립니다.</p>
        <span class="tag">방문 설치</span>
      </div>
    </div>
  </div>
</section>

<!-- CARD SCREENING -->
<section class="blk" id="screening">
  <div class="wrap">
    <div class="sec-head rv">
      <div class="sec-label">CARD SCREENING</div>
      <h2 class="sec-title">카드 가맹 심사</h2>
      <p class="sec-desc"><span style="white-space:nowrap">매장 결제 이용을 위해</span> <span style="white-space:nowrap">카드사 가맹 신청 후</span> <span style="white-space:nowrap">승인되어야 정상 결제가 가능합니다.</span> <span style="white-space:nowrap">필요 서류 안내부터</span> <span style="white-space:nowrap">가맹점 등록까지</span> <span style="white-space:nowrap">정확하게 도와드립니다.</span></p>
    </div>
    <div class="steps">
      <div class="stepc rv">
        <div class="snum">1</div>
        <h4>카드 가맹 서류 접수</h4>
        <p>카드 가맹 심사에 필요한 서류를 국내 9개 카드사에 접수합니다.</p>
      </div>
      <div class="stepc rv">
        <div class="snum">2</div>
        <h4>카드사 심사</h4>
        <p>카드사에 제출한 서류를 토대로 카드사 심사가 진행됩니다.</p>
      </div>
      <div class="stepc rv">
        <div class="snum">3</div>
        <h4>카드 가맹 완료</h4>
        <p>심사 완료 후 가맹번호가 발급되어 결제를 시작할 수 있습니다.</p>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="blk" id="faq" style="background:#fff">
  <div class="wrap">
    <div class="sec-head rv">
      <div class="sec-label">FAQ</div>
      <h2 class="sec-title">자주 묻는 질문</h2>
    </div>
    <div class="faq-list" style="max-width:760px">
      {{FAQ_ITEMS}}
    </div>
  </div>
</section>

<!-- REVIEWS --><!--{{REVIEWS_START}}-->
<section class="blk" id="reviews">
  <div class="wrap">
    <div class="sec-head rv">
      <div class="sec-label">REVIEWS</div>
      <h2 class="sec-title">실제 설치 현장,<br><span class="hl">직접 확인하세요.</span></h2>
      <p class="sec-desc"><span style="white-space:nowrap">세이브샵이 전국 매장에 설치한</span> <span style="white-space:nowrap">실제 현장 사진입니다.</span> <span style="white-space:nowrap">옆으로 넘겨 확인해 보세요.</span></p>
    </div>
    <div class="rev-slider rv">
      <div class="rev-track" id="revTrack">
        <!-- 자동 생성 영역 -->
      </div>
      <div class="rev-placeholder" id="revPlaceholder" style="display:none">
        설치 후기 사진을 준비 중입니다.<br>곧 실제 설치 현장 사진으로 채워집니다.
      </div>
      <div class="rev-nav" id="revNav" style="display:none">
        <button onclick="revScroll(-1)" aria-label="이전">‹</button>
        <button onclick="revScroll(1)" aria-label="다음">›</button>
      </div>
    </div>
  </div>
</section>
<!--{{REVIEWS_END}}-->

<!-- CONTACT -->
<section class="blk" id="contact">
  <div class="wrap ct-grid">
    <div class="ct-left rv">
      <div class="sec-label">GET STARTED</div>
      <h2><span data-region>{{REGION}}</span> 어디든<br><span class="hl">전화 한 통이면 끝.</span></h2>
      <p>이름과 연락처만 남겨주시면, 순차적으로 연락 드리겠습니다. 어떤 장비가 맞을지 몰라도 편하게 문의 주세요.</p>
      <div class="ct-methods">
        <a href="tel:010-4668-4942" class="ctm">
          <span class="ci">☎</span>
          <span><span class="cl">전화 상담</span><br><span class="cv">010-4668-4942</span></span>
        </a>
        <a href="javascript:void(0)" onclick="smsContact()" class="ctm">
          <span class="ci">✉</span>
          <span><span class="cl">문자 상담 (24시간 접수)</span><br><span class="cv">문자로 문의하기</span></span>
        </a>
      </div>
    </div>
    <div class="formbox rv">
      <h3>간편 상담 신청</h3>
      <p class="fs">문의 주시면 확인 후 순차적으로 연락 드리겠습니다.</p>
      <div class="fld"><label for="name">성함</label><input id="name" type="text" placeholder="예: 김사장"></div>
      <div class="fld"><label for="phone">연락처</label><input id="phone" type="tel" placeholder="010-0000-0000"></div>
      <div class="fld">
        <label>관심 품목 <span style="font-weight:400;color:var(--muted-2)">(복수 선택)</span></label>
        <div class="nchips" id="chips">
          <span class="nchip" onclick="toggleChip(this)">포스기</span>
          <span class="nchip" onclick="toggleChip(this)">유선단말기</span>
          <span class="nchip" onclick="toggleChip(this)">무선단말기</span>
          <span class="nchip" onclick="toggleChip(this)">토스프론트</span>
          <span class="nchip" onclick="toggleChip(this)">키오스크</span>
          <span class="nchip" onclick="toggleChip(this)">테이블오더</span>
          <span class="nchip" onclick="toggleChip(this)">상담희망</span>
        </div>
      </div>
      <button class="nsubmit" onclick="submitForm()">상담 신청하기</button>
      <p class="fnote">상담 신청 시 개인정보 수집·이용에 동의하는 것으로 간주됩니다. 입력하신 정보는 상담 목적으로만 사용됩니다.</p>
    </div>
  </div>
</section>

{{CROSS_SELL}}

<footer class="one-foot">
  © 2026 <b>세이브샵 (SAVESHOP)</b> · thesaveshop.com · 상담 <a href="tel:010-4668-4942">010-4668-4942</a>
</footer>

<div class="mbar">
  <a href="tel:010-4668-4942" class="mb1">☎ 전화 상담</a>
  <a href="#contact" class="mb3">상담 신청</a>
</div>

<script>
  var SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbw0pYJJJY2GpA0b4fm2a7efyv04YDctXjuOIoQ_t_WLTlNwYPLESd7PIvOZVSCkrNVq/exec";

  // 햄버거
  var menuToggle=document.getElementById('menuToggle');
  var topMenu=document.getElementById('topMenu');
  if(menuToggle){
    menuToggle.addEventListener('click',function(){topMenu.classList.toggle('open');menuToggle.classList.toggle('open');});
    topMenu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){topMenu.classList.remove('open');menuToggle.classList.remove('open');});});
  }

  function comingSoon(name){alert(name+' 페이지는 현재 준비 중입니다.\\n빠르게 찾아뵙겠습니다. 문의는 전화 또는 상담 신청을 이용해 주세요.');}
  function toggleChip(el){el.classList.toggle('on');}

  // 상단바: 다크 히어로 위에 있을 때 투명+밝은 메뉴 (index와 동일)
  (function(){
    var topbar=document.querySelector('.topbar');
    var hero=document.querySelector('.hero');
    if(!topbar||!hero) return;
    function updateBar(){
      var rect=hero.getBoundingClientRect();
      var barH=topbar.offsetHeight||60;
      // 헤더 중앙선이 아직 히어로(다크) 영역 안에 있으면 on-hero
      var onHero = rect.bottom > barH;
      topbar.classList.toggle('on-hero', onHero);
    }
    updateBar();
    window.addEventListener('scroll', updateBar, {passive:true});
    window.addEventListener('resize', updateBar);
  })();

  function smsContact(){
    var phone='010-4668-4942';
    var isMobile=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    if(isMobile){window.location.href='sms:'+phone;}
    else{
      if(navigator.clipboard){navigator.clipboard.writeText(phone).then(function(){alert('PC에서는 문자 앱 연결이 어려워요.\\n\\n전화번호 '+phone+' 가 복사되었습니다.\\n휴대폰으로 문자를 보내시거나, 간편 상담 폼을 이용해 주세요.');document.getElementById('contact').scrollIntoView({behavior:'smooth'});});}
      else{alert('PC에서는 문자 앱 연결이 어려워요.\\n\\n문자: '+phone);document.getElementById('contact').scrollIntoView({behavior:'smooth'});}
    }
  }

  function submitForm(){
    var name=document.getElementById('name').value.trim();
    var phone=document.getElementById('phone').value.trim();
    if(!name||!phone){alert('성함과 연락처를 입력해 주세요.');return;}
    var items=[];
    document.querySelectorAll('#chips .nchip.on').forEach(function(c){items.push(c.textContent.trim());});
    var btn=document.querySelector('.nsubmit');
    var region=(document.querySelector('[data-region]')||{}).textContent||'';
    if(region.indexOf('{{')!==-1||region==='전국') region='';
    if(!SHEET_ENDPOINT){alert(name+'님, 상담 신청이 접수되었습니다.\\n순차적으로 연락드리겠습니다.');return;}
    btn.disabled=true; var orig=btn.textContent; btn.textContent='접수 중...';
    var data={name:name,phone:phone,items:'[카드단말기'+(region?'/'+region:'')+'] '+items.join(', '),time:new Date().toLocaleString('ko-KR')};
    fetch(SHEET_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(data)})
      .then(function(){alert(name+'님, 상담 신청이 접수되었습니다.\\n순차적으로 연락드리겠습니다. 감사합니다.');document.getElementById('name').value='';document.getElementById('phone').value='';document.querySelectorAll('#chips .nchip.on').forEach(function(c){c.classList.remove('on');});})
      .catch(function(){alert('일시적인 오류로 접수에 실패했습니다.\\n전화(010-4668-4942)로 문의해 주세요.');})
      .finally(function(){btn.disabled=false;btn.textContent=orig;});
  }

  // ===== 설치 후기 사진 자동 로딩 =====
  // images/reviews/review1.jpg 부터 순서대로 존재하는 만큼 자동으로 불러옵니다.
  (function loadReviews(){
    var track=document.getElementById('revTrack');
    var nav=document.getElementById('revNav');
    var placeholder=document.getElementById('revPlaceholder');
    if(!track||!nav||!placeholder) return; // REVIEWS 섹션이 없는 페이지(지역 페이지)면 종료
    var MAX=40; // 최대 확인 장수
    var found=0, pending=0, done=false;
    function finalize(){
      if(done)return;
      if(found>0){ nav.style.display='flex'; placeholder.style.display='none'; }
      else{ placeholder.style.display='block'; }
      done=true;
    }
    function tryLoad(i){
      if(i>MAX){finalize();return;}
      var img=new Image();
      img.onload=function(){
        var card=document.createElement('div');
        card.className='rev-card';
        var box=document.createElement('div');
        box.className='rimg';
        var el=document.createElement('img');
        el.src='images/reviews/review'+i+'.jpg';
        el.alt='세이브샵 설치 현장 '+i;
        el.loading='lazy';
        box.appendChild(el);
        card.appendChild(box);
        track.appendChild(card);
        found++;
        tryLoad(i+1); // 다음 사진 확인
      };
      img.onerror=function(){ finalize(); }; // 없으면 거기서 멈춤
      img.src='images/reviews/review'+i+'.jpg';
    }
    tryLoad(1);
  })();

  function revScroll(dir){
    var track=document.getElementById('revTrack');
    if(!track) return;
    track.scrollBy({left:dir*360,behavior:'smooth'});
  }

  // 스크롤 리빌
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});

  // 콘텐츠 보호(우클릭·드래그선택·복사 방지). 폼 입력란은 예외.
  (function(){
    function isEditable(t){
      if(!t) return false;
      var tag=(t.tagName||'').toUpperCase();
      return tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT'||(t.isContentEditable===true);
    }
    document.addEventListener('contextmenu',function(e){ if(!isEditable(e.target)) e.preventDefault(); });
    document.addEventListener('selectstart',function(e){ if(!isEditable(e.target)) e.preventDefault(); });
    document.addEventListener('dragstart',function(e){ if(!isEditable(e.target)) e.preventDefault(); });
    document.addEventListener('copy',function(e){ if(!isEditable(e.target)) e.preventDefault(); });
  })();

</script>
</body>
</html>
`;

// --- 지역 데이터 ---
// 지역 데이터 — 시·신도시 단위
// 각 지역: 표시이름(한글) + 슬러그 + 시도 + 상권특성(context) + 강조업종(emphasis) + 철거수요(demolition) + 인근(nearby)
// context/emphasis는 실제 상권 검색 기반 초안 — 지니가 현장 감각으로 다듬을 것.

// --- 철거 전용 템플릿 (다크테마) ---
// ===== 세이브샵 철거·원상복구 전용 HTML 템플릿 (다크테마) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 카드단말기와 완전히 다른 디자인이라 별도 템플릿으로 관리합니다.
// 치환 지점: {{REGION}}(지역명), {{DEMO_LEAD}}(지역 특성 서두 = region.demolition)
// render.js가 키워드="철거"일 때 이 템플릿을 사용합니다.

const TEMPLATE_DEMOLITION = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{REGION}} 철거·원상복구 | 세이브샵 - 무료 방문견적, 철거 지원금 대행</title>
<meta name="description" content="상가 철거·매장 원상복구 전문. 폐업 점포 철거 지원금(평당 20만원·최대 400만원, 서울 추가 300만원) 신청부터 100% 무료 방문견적, 전국 최저가, 현장 AS 1년 보장까지. 무료 상담 010-4668-4942.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans+KR:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<!-- Favicon -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png">
<link rel="apple-touch-icon" href="/images/favicon-180.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#16c172">
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="세이브샵 SAVESHOP">
<meta property="og:locale" content="ko_KR">
<meta property="og:title" content="상가 철거·매장 원상복구 | 세이브샵 - 무료 견적, 철거 지원금 최대 400만원">
<meta property="og:description" content="상가 철거·매장 원상복구 전문. 폐업 점포 철거 지원금 신청부터 100% 무료 방문견적, 전국 최저가, 현장 AS 1년 보장까지. 상담 010-4668-4942.">
<meta property="og:image" content="https://thesaveshop.com/images/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://thesaveshop.com/demolition.html">
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="상가 철거·매장 원상복구 | 세이브샵 - 무료 견적, 철거 지원금 최대 400만원">
<meta name="twitter:description" content="상가 철거·원상복구, 무료 견적·지원금 신청까지. 상담 010-4668-4942.">
<meta name="twitter:image" content="https://thesaveshop.com/images/og-image.png">
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<style>
  :root{
    --bg:#ffffff;
    --bg-2:#f6f8fa;
    --bg-3:#eef1f5;
    --ink:#0c0e14;
    --ink-2:#2a2e3a;
    --muted:#5b6275;
    --muted-2:#9aa1b2;
    --line:rgba(12,14,20,.10);
    --line-2:rgba(12,14,20,.16);
    --neon:#16c172;
    --neon-bright:#39ff9e;
    --neon-dim:#0fa862;
    --neon-soft:rgba(22,193,114,.12);
    --cyan:#0bb6d6;
    --d-bg:#06070a;
    --d-bg-2:#0c0e14;
    --d-bg-3:#121521;
    --d-ink:#f4f6fb;
    --d-muted:#8b92a8;
    --d-muted-2:#5b6178;
    --d-line:rgba(255,255,255,.09);
    --d-line-2:rgba(57,255,158,.25);
    --display:'Space Grotesk',sans-serif;
    --body:'IBM Plex Sans KR',sans-serif;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{
    font-family:var(--body);background:var(--bg);color:var(--ink);
    -webkit-font-smoothing:antialiased;overflow-x:hidden;line-height:1.7;
    word-break:keep-all;overflow-wrap:break-word;
  }
  a{color:inherit;text-decoration:none}
  /* 콘텐츠 보호: 이미지 드래그/저장 불편화. 폼 입력란은 선택 허용 */
  img{-webkit-user-drag:none;user-drag:none;-webkit-user-select:none;user-select:none;pointer-events:none}
  body{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}
  input,textarea,select,[contenteditable="true"]{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}
  ::selection{background:var(--neon);color:#fff}
  .wrap{max-width:1100px;margin:0 auto;padding:0 24px}

  /* ===== TOPBAR (메인과 동일) ===== */
  .topbar{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;
    padding:14px 28px;background:rgba(255,255,255,.85);backdrop-filter:saturate(180%) blur(14px);border-bottom:1px solid var(--line);transition:all .3s}
  .topbar.on-hero{background:linear-gradient(180deg,rgba(6,7,10,.85),transparent);border-bottom-color:transparent}
  .topbar.on-hero .logo{color:var(--d-ink)}
  .topbar.on-hero .logo small{color:var(--d-muted)}
  .topbar.on-hero .top-menu a{color:var(--d-muted)}
  .topbar.on-hero .top-menu a.active{color:var(--neon-bright)}
  .topbar.on-hero .top-menu a:hover{color:var(--neon-bright)}
  .topbar.on-hero .top-menu a::after{background:var(--neon-bright)}
  .topbar.on-hero .soon{color:var(--d-muted);background:rgba(255,255,255,.08);border-color:var(--d-line)}
  .topbar.on-hero .menu-toggle span{background:var(--d-ink)}
  .topbar.on-hero .top-phone{color:var(--neon-bright)}
  .logo{display:flex;align-items:center;gap:9px;font-family:var(--display);font-weight:700;font-size:20px;letter-spacing:-.01em;color:var(--ink);white-space:nowrap;flex-shrink:0;transition:color .3s}
  .logo .mark{width:30px;height:30px;border-radius:9px;background:var(--neon);color:#fff;display:grid;place-items:center;font-weight:700;font-size:16px}
  .logo small{font-family:var(--body);font-weight:400;font-size:10px;color:var(--muted);letter-spacing:.12em;margin-left:1px}
  .top-menu{display:flex;align-items:center;gap:26px;font-family:var(--body);font-weight:500;font-size:14.5px}
  .top-menu a{color:var(--ink-2);transition:color .15s;position:relative;padding:4px 0}
  .top-menu a::after{content:"";position:absolute;left:0;bottom:-2px;width:0;height:2px;background:var(--neon);transition:width .2s}
  .top-menu a:hover{color:var(--neon-dim)}
  .top-menu a:hover::after{width:100%}
  .top-menu a.active{color:var(--neon-dim);font-weight:600}
  .top-menu a.active::after{width:100%}
  .soon{display:inline-block;margin-left:5px;font-size:9.5px;font-weight:600;color:var(--muted-2);background:var(--bg-3);border:1px solid var(--line);padding:1px 5px;border-radius:5px;vertical-align:middle;transform:translateY(-1px)}
  .top-cta{display:flex;align-items:center;gap:14px}
  .top-phone{font-family:var(--display);font-weight:600;font-size:15px;color:var(--neon-dim);display:flex;align-items:center;gap:7px}
  .top-btn{font-family:var(--body);font-weight:600;font-size:13.5px;padding:9px 16px;border-radius:100px;background:var(--neon);color:#fff;transition:all .15s}
  .top-btn:hover{transform:translateY(-1px);box-shadow:0 8px 20px -8px var(--neon)}
  .top-call-icon{display:none;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:var(--neon);color:#fff;font-size:17px;flex-shrink:0}
  .menu-cta{display:none}
  .menu-toggle{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:6px}
  .menu-toggle span{width:22px;height:2px;background:var(--ink);border-radius:2px;transition:transform .3s,opacity .3s}
  .menu-toggle.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  .menu-toggle.open span:nth-child(2){opacity:0}
  .menu-toggle.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}

  /* ===== HERO (다크) ===== */
  .hero{background:var(--d-bg);color:var(--d-ink);position:relative;overflow:hidden;padding:140px 24px 80px}
  .hero::before{content:"";position:absolute;inset:0;z-index:0;
    background-image:linear-gradient(var(--d-line) 1px,transparent 1px),linear-gradient(90deg,var(--d-line) 1px,transparent 1px);
    background-size:60px 60px;-webkit-mask-image:radial-gradient(ellipse 70% 70% at 60% 40%,#000,transparent 80%);mask-image:radial-gradient(ellipse 70% 70% at 60% 40%,#000,transparent 80%);opacity:.6}
  .hero .glow{position:absolute;border-radius:50%;filter:blur(90px);z-index:0}
  .hero .g1{width:460px;height:460px;background:var(--neon-bright);top:-150px;right:-110px;opacity:.16}
  .hero .g2{width:400px;height:400px;background:var(--cyan);bottom:-160px;left:-110px;opacity:.12}
  .hero-inner{max-width:1100px;margin:0 auto;position:relative;z-index:2}
  .breadcrumb{font-family:var(--display);font-size:13px;letter-spacing:.04em;color:var(--d-muted);margin-bottom:22px}
  .breadcrumb a{color:var(--d-muted)}
  .breadcrumb a:hover{color:var(--neon-bright)}
  .breadcrumb .sep{margin:0 8px;opacity:.5}
  .breadcrumb .cur{color:var(--neon-bright)}
  .hero-kicker{display:inline-flex;align-items:center;gap:9px;font-family:var(--display);font-weight:500;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--neon-bright);border:1px solid var(--d-line-2);background:rgba(57,255,158,.1);padding:8px 16px;border-radius:100px;margin-bottom:28px}
  .hero-kicker .live{width:7px;height:7px;border-radius:50%;background:var(--neon-bright);box-shadow:0 0 0 0 var(--neon-bright);animation:ping 1.8s ease-out infinite}
  .hero h1{font-family:var(--display);font-weight:700;font-size:clamp(36px,6vw,68px);line-height:1.02;letter-spacing:-.03em;margin-bottom:24px}
  .hero h1 .reg{color:var(--region-color,var(--neon-bright));text-shadow:0 0 30px rgba(57,255,158,.5)}
  .hero-sub{font-size:clamp(15px,2vw,18px);color:var(--d-muted);max-width:600px;margin-bottom:34px}
  .hero-sub b{color:var(--d-ink);font-weight:600}
  .hero-cta{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:40px}
  .btn-neon{font-family:var(--display);font-weight:600;font-size:16px;padding:15px 28px;border-radius:100px;background:var(--neon-bright);color:#000;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:9px;transition:all .18s}
  .btn-neon:hover{transform:translateY(-2px);box-shadow:0 12px 36px -10px var(--neon-bright)}
  .btn-line{font-family:var(--display);font-weight:600;font-size:16px;padding:15px 28px;border-radius:100px;background:transparent;color:var(--d-ink);border:1px solid var(--d-line-2);cursor:pointer;transition:all .18s}
  .btn-line:hover{border-color:var(--neon-bright);color:var(--neon-bright)}
  .hero-tags{display:flex;gap:10px;flex-wrap:wrap}
  .hero-tags span{font-size:13px;color:var(--d-muted);border:1px solid var(--d-line);border-radius:100px;padding:6px 14px}
  .hero-tags b{color:var(--neon-bright);font-weight:600}

  /* ===== SECTION SHELL ===== */
  section.blk{padding:80px 0}
  #intro{background:var(--bg)}
  #subsidy{background:var(--bg-2)}
  #why{background:var(--bg)}
  #process{background:var(--bg-2)}
  #cases{background:var(--bg)}
  .sec-head{max-width:680px;margin-bottom:46px}
  .sec-head.center{margin-left:auto;margin-right:auto;text-align:center}
  .sec-label{font-family:var(--display);font-weight:500;font-size:12.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--neon-dim);margin-bottom:14px}
  .sec-title{font-family:var(--display);font-weight:700;font-size:clamp(27px,4vw,42px);line-height:1.08;letter-spacing:-.025em;color:var(--ink)}
  .sec-title .hl{color:var(--neon-dim)}
  .sec-desc{font-size:16px;color:var(--muted);margin-top:14px}

  /* ===== INTRO (폐업 원상복구 소개) ===== */
  .intro-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
  .intro-imgs{display:grid;grid-template-columns:1fr 1fr;gap:12px;position:relative}
  .intro-imgs .pimg{aspect-ratio:3/4}
  .intro-imgs .arrow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:3;
    width:40px;height:40px;border-radius:50%;background:var(--neon);color:#fff;display:grid;place-items:center;
    font-size:20px;box-shadow:0 6px 18px -6px rgba(0,0,0,.4)}
  .intro-copy .badge{display:inline-block;font-family:var(--display);font-size:12.5px;font-weight:600;letter-spacing:.06em;
    color:var(--neon-dim);background:var(--neon-soft);padding:5px 14px;border-radius:100px;margin-bottom:16px}
  .intro-copy h3{font-family:var(--display);font-weight:700;font-size:clamp(22px,3vw,30px);line-height:1.25;letter-spacing:-.02em;color:var(--ink);margin-bottom:16px}
  .intro-copy p{font-size:15.5px;color:var(--muted);line-height:1.75;margin-bottom:14px}
  .intro-copy p .hl{color:var(--ink);font-weight:600}
  .intro-copy .legal{font-size:13.5px;color:var(--muted);background:var(--bg-2);border-left:3px solid var(--neon);border-radius:8px;padding:14px 16px;margin-top:18px;line-height:1.7}
  .intro-copy .legal b{color:var(--neon-dim)}
  /* 공용 이미지 박스 */
  .pimg{width:100%;aspect-ratio:4/3;border-radius:12px;overflow:hidden;background:var(--bg-3);position:relative;border:1px solid var(--line)}
  .pimg img{width:100%;height:100%;object-fit:cover;display:block}
  .pimg .ph-fallback{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--muted-2);font-size:12.5px;text-align:center;padding:10px}
  .pimg .ph-fallback svg{width:30px;height:30px;opacity:.5}

  /* ===== SUBSIDY (철거 지원금 강조) ===== */
  .subsidy-card{max-width:760px;margin:0 auto;background:linear-gradient(160deg,var(--d-bg-2),var(--d-bg));color:#fff;
    border-radius:24px;padding:48px 40px;text-align:center;position:relative;overflow:hidden;border:1px solid var(--d-line-2)}
  .subsidy-card::before{content:"";position:absolute;inset:0;z-index:0;opacity:.5;
    background-image:linear-gradient(var(--d-line) 1px,transparent 1px),linear-gradient(90deg,var(--d-line) 1px,transparent 1px);background-size:46px 46px;
    -webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 30%,#000,transparent 85%);mask-image:radial-gradient(ellipse 80% 80% at 50% 30%,#000,transparent 85%)}
  .subsidy-card>*{position:relative;z-index:2}
  .subsidy-card .stag{display:inline-block;font-family:var(--display);font-size:12.5px;font-weight:600;letter-spacing:.1em;
    color:var(--neon-bright);border:1px solid var(--d-line-2);background:rgba(57,255,158,.1);padding:6px 16px;border-radius:100px;margin-bottom:22px}
  .subsidy-card h3{font-family:var(--display);font-weight:700;font-size:clamp(26px,4vw,40px);letter-spacing:-.02em;line-height:1.1;margin-bottom:8px}
  .subsidy-card h3 .up{color:var(--neon-bright);text-shadow:0 0 26px rgba(57,255,158,.45)}
  .subsidy-card .ssub{font-size:14.5px;color:var(--d-muted);margin-bottom:30px}
  .subsidy-figures{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:26px}
  .sfig{background:rgba(255,255,255,.04);border:1px solid var(--d-line);border-radius:16px;padding:24px 18px}
  .sfig .from{font-size:14px;color:var(--d-muted);text-decoration:line-through;text-decoration-color:var(--d-muted-2);margin-bottom:6px}
  .sfig .to{font-family:var(--display);font-weight:700;font-size:clamp(24px,3.4vw,34px);color:var(--neon-bright);line-height:1.05;letter-spacing:-.01em}
  .sfig .lbl{font-size:13px;color:var(--d-muted);margin-top:8px}
  .subsidy-card .snote{font-size:13.5px;color:var(--d-muted);margin-top:4px}
  .subsidy-card .snote b{color:#fff;font-weight:600}
  .subsidy-cta{margin-top:30px}
  .subsidy-cta a{font-family:var(--display);font-weight:700;font-size:clamp(18px,2.4vw,24px);color:#000;background:var(--neon-bright);
    display:inline-flex;align-items:center;gap:10px;padding:14px 30px;border-radius:100px;transition:all .18s}
  .subsidy-cta a:hover{transform:translateY(-2px);box-shadow:0 14px 36px -10px var(--neon-bright)}
  .subsidy-cta .cap{display:block;font-size:12.5px;color:var(--d-muted);margin-top:12px}

  /* ===== WHY (3 strengths) ===== */
  .why-lead{text-align:center;max-width:620px;margin:0 auto 40px;font-size:16px;color:var(--muted)}
  .why-lead b{color:var(--neon-dim);font-weight:600}
  .why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .whyc{border:1px solid var(--line);border-radius:16px;padding:28px 24px;background:var(--bg-2);transition:all .2s;text-align:center}
  .whyc:hover{border-color:var(--neon);background:var(--bg);box-shadow:0 16px 36px -26px rgba(22,193,114,.4)}
  .whyc .wi{color:var(--neon);margin-bottom:14px;display:flex;justify-content:center}
  .whyc .wi svg{width:30px;height:30px}
  .whyc h4{font-family:var(--display);font-weight:600;font-size:17px;color:var(--ink);margin-bottom:8px}
  .whyc p{font-size:13.5px;color:var(--muted);line-height:1.6}
  .whyc p b{color:var(--ink);font-weight:600}

  /* ===== PROCESS (진행 절차 7 steps) ===== */
  .proc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .procc{border:1px solid var(--line);border-radius:16px;padding:24px 20px;background:var(--bg);position:relative;transition:all .2s}
  .procc:hover{border-color:var(--neon-soft);box-shadow:0 16px 36px -26px rgba(22,193,114,.35)}
  .procc .pnum{font-family:var(--display);font-weight:700;font-size:13px;color:#fff;background:var(--neon);width:28px;height:28px;border-radius:8px;display:grid;place-items:center;margin-bottom:16px}
  .procc h4{font-family:var(--display);font-weight:600;font-size:16px;color:var(--ink);margin-bottom:10px;letter-spacing:-.01em}
  .procc ul{list-style:none;display:flex;flex-direction:column;gap:6px}
  .procc li{font-size:12.5px;color:var(--muted);padding-left:13px;position:relative;line-height:1.5}
  .procc li::before{content:"";position:absolute;left:2px;top:8px;width:4px;height:4px;border-radius:50%;background:var(--neon);flex-shrink:0}
  .procc.final{background:linear-gradient(160deg,var(--neon-soft),var(--bg));border-color:var(--neon-soft)}

  /* ===== CASES SLIDER (시공 전·후) ===== */
  .case-slider{position:relative;margin-top:10px}
  .case-track{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding:4px 2px 14px;-webkit-overflow-scrolling:touch}
  .case-track::-webkit-scrollbar{height:6px}
  .case-track::-webkit-scrollbar-thumb{background:var(--line-2);border-radius:10px}
  .case-card{flex:0 0 auto;width:420px;scroll-snap-align:start}
  /* 단일(합본) 사진 카드 — 합본 사진은 비율이 제각각이라 원본 비율 그대로 표시(잘림 없음) */
  .case-single{width:480px}
  .case-single .pimg{aspect-ratio:auto;background:transparent;border:none}
  .case-single .pimg img{height:auto;object-fit:contain}
  .case-ba{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center}
  .case-ba .pimg{aspect-ratio:4/3}
  .case-ba .ba-arrow{color:var(--neon);font-size:22px;font-weight:700;display:grid;place-items:center}
  .case-card .cap{font-size:13px;color:var(--muted);margin-top:10px;padding-left:2px}
  .case-card .cap b{color:var(--ink);font-weight:600}
  .case-nav{display:flex;gap:8px;justify-content:flex-end;margin-top:6px}
  .case-nav button{width:42px;height:42px;border-radius:50%;border:1px solid var(--line-2);background:var(--bg);color:var(--ink);cursor:pointer;font-size:18px;display:grid;place-items:center;transition:all .15s}
  .case-nav button:hover{border-color:var(--neon);color:var(--neon-dim);background:var(--neon-soft)}
  .case-placeholder{border:1.5px dashed var(--line-2);border-radius:14px;padding:40px 20px;text-align:center;color:var(--muted-2);font-size:14px;line-height:1.7}

  /* ===== CONTACT (메인과 동일 톤) ===== */
  #contact{background:var(--bg-2);border-top:1px solid var(--line)}
  .ct-grid{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center}
  .ct-left h2{font-family:var(--display);font-weight:700;font-size:clamp(28px,4vw,46px);line-height:1.05;letter-spacing:-.03em;margin-bottom:18px;color:var(--ink)}
  .ct-left .hl{color:var(--neon-dim)}
  .ct-left p{font-size:16px;color:var(--muted);max-width:400px;margin-bottom:30px}
  .ct-methods{display:flex;flex-direction:column;gap:12px}
  .ctm{display:flex;align-items:center;gap:15px;padding:17px 20px;border:1px solid var(--line);border-radius:14px;background:var(--bg);transition:all .18s;cursor:pointer}
  .ctm:hover{border-color:var(--neon);transform:translateX(4px)}
  .ctm .ci{width:44px;height:44px;border-radius:12px;background:var(--neon);color:#fff;display:grid;place-items:center;font-size:20px;flex-shrink:0}
  .ctm .cl{font-size:12px;color:var(--muted)}
  .ctm .cv{font-family:var(--display);font-weight:600;font-size:18px;color:var(--ink)}
  .formbox{border:1px solid var(--line);border-radius:22px;padding:34px;background:var(--bg);position:relative;overflow:hidden;box-shadow:0 30px 60px -40px rgba(12,14,20,.3)}
  .formbox::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--neon),var(--cyan))}
  .formbox h3{font-family:var(--display);font-weight:600;font-size:21px;margin-bottom:5px;color:var(--ink)}
  .formbox .fs{font-size:13px;color:var(--muted);margin-bottom:24px}
  .fld{margin-bottom:17px}
  .fld label{display:block;font-size:13px;font-weight:500;color:var(--ink);margin-bottom:8px}
  .fld input{width:100%;font-family:var(--body);font-size:15px;color:var(--ink);padding:14px 16px;border:1px solid var(--line-2);border-radius:12px;background:var(--bg);transition:all .15s}
  .fld input::placeholder{color:var(--muted-2)}
  .fld input:focus{outline:none;border-color:var(--neon);box-shadow:0 0 0 3px var(--neon-soft)}
  .nchips{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
  .nchip{font-size:11.5px;font-weight:500;cursor:pointer;padding:11px 4px;border-radius:10px;border:1px solid var(--line-2);background:var(--bg);color:var(--muted);transition:all .15s;user-select:none;text-align:center;white-space:nowrap}
  .nchip:hover{border-color:var(--neon);color:var(--ink)}
  .nchip.on{background:var(--neon);color:#fff;border-color:var(--neon);font-weight:600}
  .nsubmit{width:100%;font-family:var(--display);font-weight:600;font-size:16px;padding:17px;border:none;border-radius:13px;background:var(--neon);color:#fff;cursor:pointer;margin-top:8px;transition:all .15s}
  .addr-row{display:flex;gap:7px}
  .addr-row input{flex:1;cursor:pointer;background:var(--bg)}
  .addr-btn{flex-shrink:0;font-family:var(--body);font-weight:600;font-size:13.5px;padding:0 18px;border-radius:12px;border:1px solid var(--neon);background:var(--neon-soft);color:var(--neon-dim);cursor:pointer;white-space:nowrap;transition:all .15s}
  .addr-btn:hover{background:var(--neon);color:#fff}
  .nsubmit:hover{box-shadow:0 14px 34px -12px var(--neon);transform:translateY(-1px)}
  .fnote{font-size:11.5px;color:var(--muted-2);text-align:center;margin-top:13px}

  /* ===== FOOTER ===== */
  .one-foot{background:var(--ink);color:var(--muted-2);text-align:center;padding:22px 24px;font-size:12.5px;line-height:1.6}
  .one-foot b{color:var(--neon-bright);font-weight:600}
  .one-foot a{color:var(--muted-2)}

  /* ===== MOBILE BAR ===== */
  .mbar{display:none;position:fixed;left:0;right:0;bottom:0;z-index:200;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);border-top:1px solid var(--line);padding:9px 12px;gap:8px}
  .mbar a{flex:1;text-align:center;font-family:var(--display);font-weight:600;font-size:14px;padding:13px 0;border-radius:12px}
  .mb1{background:var(--neon);color:#fff}
  .mb3{background:var(--bg-3);color:var(--ink);border:1px solid var(--line)}

  .rv{opacity:0;transform:translateY(26px);transition:opacity .6s ease,transform .6s ease}
  .rv.in{opacity:1;transform:none}

  @keyframes ping{0%{box-shadow:0 0 0 0 rgba(57,255,158,.6)}70%{box-shadow:0 0 0 9px rgba(57,255,158,0)}100%{box-shadow:0 0 0 0 rgba(57,255,158,0)}}

  @media(max-width:920px){
    .topbar{padding:14px 18px}
    .top-phone,.top-btn{display:none}
    .top-call-icon{display:flex}
    .menu-toggle{display:flex}
    .top-menu{position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;background:var(--bg);border-bottom:1px solid var(--line);box-shadow:0 14px 30px -20px rgba(0,0,0,.3);max-height:0;overflow:hidden;transition:max-height .3s ease}
    .top-menu.open{max-height:400px}
    .top-menu a{padding:15px 22px;border-bottom:1px solid var(--line);font-size:15.5px}
    .top-menu .menu-cta{display:block;background:var(--neon);color:#fff;font-weight:600;text-align:center;border-bottom:none}
    .intro-grid{grid-template-columns:1fr;gap:30px}
    .why-grid{grid-template-columns:1fr}
    .proc-grid{grid-template-columns:repeat(2,1fr)}
    .ct-grid{grid-template-columns:1fr;gap:34px}
    .case-card{width:340px}
  }
  @media(max-width:600px){
    section.blk{padding:56px 0}
    .hero{padding:104px 18px 64px}
    .subsidy-card{padding:36px 22px}
    .subsidy-figures{grid-template-columns:1fr}
    .proc-grid{grid-template-columns:1fr}
    .nchips{grid-template-columns:repeat(2,1fr)}
    /* 사례 카드: 화면 폭에 맞춰 거의 꽉 차게 (양옆 여백만) */
    .case-card{width:calc(100vw - 64px);max-width:360px}
    /* 단일(합본) 사진 카드도 화면 폭에 맞춤 (인라인 폭 제거됨) */
    .case-single{width:calc(100vw - 36px);max-width:420px}
    /* 전·후 비교를 좌우 → 위아래로 쌓기 (작은 화면에서 사진 비율 보존) */
    .case-ba{grid-template-columns:1fr;gap:6px}
    .case-ba .ba-arrow{transform:rotate(90deg);font-size:26px;margin:-2px 0}
    .mbar{display:flex}
    body{padding-bottom:62px}
  }

/* === 신규: DEMOLITION 지역특성 + 철거유형표 + FAQ === */
#demolition{background:var(--bg)}
/* 카드단말기 region-context와 동일: 왼쪽 정렬·풀폭 (가운데 정렬 안 함) */
.demo-context p{font-size:1.05rem;line-height:1.9;color:var(--ink-2);margin:0 0 1.4em;word-break:keep-all}
.demo-context .demo-lead{font-size:1.08rem;font-weight:500;color:var(--ink);padding-left:16px;border-left:3px solid var(--neon);margin-bottom:1.5em}
.matrix-wrap{margin-top:2.6em;overflow-x:auto}
.biz-matrix{width:100%;border-collapse:collapse;min-width:560px;font-family:var(--body)}
.biz-matrix thead th{background:#111;color:#fff;font-weight:600;font-size:.92rem;padding:14px 18px;text-align:left}
.biz-matrix thead th:first-child{border-radius:12px 0 0 0}
.biz-matrix thead th:last-child{border-radius:0 12px 0 0}
.biz-matrix td{padding:15px 18px;border-bottom:1px solid #eee;font-size:.96rem;color:#333;vertical-align:top}
.biz-matrix tbody tr:nth-child(even){background:#fafafa}
.biz-matrix td.biz{font-weight:700;color:#111;white-space:nowrap}
.biz-matrix td.rec{color:#0c8a55;font-weight:600;white-space:nowrap}
.biz-matrix td.why{color:#777;font-size:.9rem}
.matrix-note{text-align:center;font-size:.95rem;color:#555;margin-top:1.3em;line-height:1.7;word-break:keep-all}
/* FAQ */
#faq{background:var(--bg-2)}
.faq-list{max-width:780px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
.faq-item{background:var(--bg);border:1px solid var(--line);border-radius:14px;overflow:hidden}
.faq-q{width:100%;background:none;border:none;cursor:pointer;padding:20px 22px;display:flex;justify-content:space-between;align-items:center;gap:14px;font-family:var(--body);font-size:1rem;font-weight:600;color:var(--ink);text-align:left}
.faq-ic{flex:0 0 auto;font-size:1.4rem;color:var(--neon-dim);transition:transform .25s;line-height:1}
.faq-item.open .faq-ic{transform:rotate(45deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .3s ease}
.faq-a p{padding:0 22px 20px;margin:0;font-size:.96rem;line-height:1.85;color:var(--muted);word-break:keep-all}
@media(max-width:560px){.biz-matrix{font-size:.86rem}.biz-matrix td,.biz-matrix th{padding:12px 12px}}

</style>
</head>
<body>

<!-- TOPBAR -->
<div class="topbar">
  <a href="/" class="logo"><span class="mark">S</span>세이브샵<small>SAVESHOP</small></a>
  <nav class="top-menu" id="topMenu">
    <a href="/card-terminal">카드단말기</a>
    <a href="javascript:void(0)" onclick="comingSoon('인터넷·가전')">인터넷·가전<span class="soon">준비중</span></a>
    <a href="javascript:void(0)" onclick="comingSoon('스마트자판기')">스마트자판기<span class="soon">준비중</span></a>
    <a href="/demolition" class="active">철거·원상복구</a>
    <a href="#contact" class="menu-cta">무료 상담 신청</a>
  </nav>
  <div class="top-cta">
    <a href="tel:010-4668-4942" class="top-phone">☎ 010-4668-4942</a>
    <a href="#contact" class="top-btn">무료 상담</a>
    <a href="tel:010-4668-4942" class="top-call-icon" aria-label="전화 걸기">☎</a>
    <button class="menu-toggle" id="menuToggle" aria-label="메뉴 열기"><span></span><span></span><span></span></button>
  </div>
</div>

<!-- HERO -->
<header class="hero">
  <div class="glow g1"></div><div class="glow g2"></div>
  <div class="hero-inner">
    <nav class="breadcrumb"><a href="/">홈</a><span class="sep">›</span><span class="cur">철거·원상복구</span></nav>
    <span class="hero-kicker"><span class="live"></span>최저가 · 무료견적 · 지원금 신청</span>
    <h1><span class="reg" data-region>{{REGION}} 상가 철거</span> · 원상복구<br>전화 한 통으로 끝.</h1>
    <p class="hero-sub"><b><span style="white-space:nowrap">{{REGION}} 폐업 · 이전 시 철거부터</span> <span style="white-space:nowrap">원상복구 · 폐기물 처리까지.</span></b><br><span style="white-space:nowrap">무료 방문 견적부터 철거 지원금 신청까지,</span> <span style="white-space:nowrap">처음부터 깔끔하게 마무리해 드립니다.</span></p>
    <div class="hero-cta">
      <a href="tel:010-4668-4942" class="btn-neon">☎ 010-4668-4942</a>
      <a href="#contact" class="btn-line">무료 견적 신청 →</a>
    </div>
    <div class="hero-tags">
      <span><b>✓</b> 100% 무료 방문 견적</span>
      <span><b>✓</b> 전국 최저가</span>
      <span><b>✓</b> 철거 지원금 대행 신청</span>
      <span><b>✓</b> 현장 AS 1년 보장</span>
    </div>
  </div>
</header>

<!-- INTRO: 폐업 원상복구 소개 -->
<!-- DEMOLITION: 지역 특성 + 철거 유형 -->
<section class="blk" id="demolition">
  <div class="wrap">
    <div class="sec-head rv">
      <div class="sec-label">DEMOLITION</div>
      <h2 class="sec-title">{{REGION}} 점포 철거·원상복구,<br><span class="hl">현장에 맞게 정확하게.</span></h2>
    </div>
    <div class="demo-context rv">
      <p class="demo-lead">{{DEMO_LEAD}}</p>
      <p>음식점 주방 철거인지, 사무실 원상복구인지, 간판·전기만 정리하면 되는지에 따라 작업 범위와 비용이 크게 달라집니다. 업종과 평수, 현재 상태를 알려주시면 {{REGION}} 현장에 맞는 방식을 상담해 드립니다.</p>
      <p>최근에는 임대차 계약상 원상복구 범위를 두고 임대인과 의견이 갈리는 경우가 많아, 철거 전에 복구 범위를 명확히 확인하는 사장님이 늘고 있습니다. {{REGION}}에서도 현장 확인 후 범위를 분명히 정리해 진행합니다.</p>
    </div>
    <div class="matrix-wrap rv">
      <table class="biz-matrix">
        <thead><tr><th>철거 유형</th><th>작업 범위</th><th>주요 내용</th></tr></thead>
        <tbody>
          <tr><td class="biz">음식점·주방 철거</td><td class="rec">주방설비·덕트·바닥</td><td class="why">그리스트랩·배관 정리, 유증기 덕트 해체.</td></tr>
          <tr><td class="biz">카페·인테리어 철거</td><td class="rec">목공·조명·바닥재</td><td class="why">매립 배선 정리, 바닥 원상복구.</td></tr>
          <tr><td class="biz">사무실 원상복구</td><td class="rec">파티션·바닥·도장</td><td class="why">임대차 계약상 원상복구 범위 시공.</td></tr>
          <tr><td class="biz">간판·전기 철거</td><td class="rec">외부 간판·전기설비</td><td class="why">옥외광고물 철거, 전기 안전 마감.</td></tr>
          <tr><td class="biz">폐업 점포 정리</td><td class="rec">집기·폐기물 일괄</td><td class="why">잔존물·폐기물 처리 포함.</td></tr>
        </tbody>
      </table>
      <p class="matrix-note">※ 그 외 현장도 상황에 맞춰 안내해 드립니다. {{REGION}} 담당자와 상담으로 확인하세요.</p>
    </div>
  </div>
</section>

<section class="blk" id="intro">
  <div class="wrap">
    <div class="sec-head rv">
      <div class="sec-label">RESTORATION</div>
      <h2 class="sec-title">폐업 매장,<br><span class="hl">철거부터 원상복구까지.</span></h2>
      <p class="sec-desc"><span style="white-space:nowrap">임대 계약이 종료되면</span> <span style="white-space:nowrap">임차인은 매장을 반드시 원상복구해야 합니다.</span> <span style="white-space:nowrap">세이브샵이 깔끔하게 책임집니다.</span></p>
    </div>
    <div class="intro-grid rv">
      <div class="intro-imgs">
        <div class="pimg">
          <img src="/images/demolition/intro-before.jpg" alt="원상복구 전 매장" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="ph-fallback" style="display:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>철거 전<br>이미지 준비중</div>
        </div>
        <div class="pimg">
          <img src="/images/demolition/intro-after.jpg" alt="원상복구 후 매장" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="ph-fallback" style="display:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>원상복구 후<br>이미지 준비중</div>
        </div>
        <div class="arrow">›</div>
      </div>
      <div class="intro-copy">
        <span class="badge">소상공인 폐업지원 패키지</span>
        <h3>철거 비용, 정부 지원금으로<br>부담을 줄이세요.</h3>
        <p>세이브샵 폐업 원상복구는 소상공인의 철거 공사를 정부지원금 중 하나인 <span class="hl">폐업 점포 철거 지원금</span>으로 진행해 드립니다.</p>
        <p>철거부터 원상복구까지. 복잡한 절차에 대한 걱정을 덜어드리도록 세이브샵에서 진행을 도와드립니다.</p>
        <div class="legal">
          타인의 건물·구조물을 임대해 사용하다 <b>임대가 종료될 시</b>, 임차인은 임차 목적물을 반드시 <b>원상복구</b>해야 합니다. 처음처럼 깨끗한 마무리, 세이브샵이 도와드립니다.
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SUBSIDY: 상향된 철거 지원금 -->
<section class="blk" id="subsidy">
  <div class="wrap">
    <div class="sec-head center rv">
      <div class="sec-label">SUBSIDY</div>
      <h2 class="sec-title">상향된 <span class="hl">철거 지원금</span></h2>
      <p class="sec-desc"><span style="white-space:nowrap">2025년 1월부터 시행된</span> <span style="white-space:nowrap">폐업 점포 철거 지원금,</span> <span style="white-space:nowrap">지원 한도가 크게 올랐습니다.</span></p>
    </div>
    <div class="subsidy-card rv">
      <h3>철거 지원금 <span class="up">최대 400만원</span></h3>
      <p class="ssub">평당 지원 단가가 상향되어 더 많은 비용을 지원받을 수 있습니다.</p>
      <div class="subsidy-figures">
        <div class="sfig">
          <div class="from">기존 기준</div>
          <div class="to">평당 20만원</div>
          <div class="lbl">→ 최대 400만원</div>
        </div>
        <div class="sfig">
          <div class="from">서울 지역</div>
          <div class="to">추가 300만원</div>
          <div class="lbl">서울 지역 한정 추가 지원</div>
        </div>
      </div>
      <p class="snote"><b>대상 여부·지원 한도</b>는 매장 위치와 면적에 따라 달라집니다. 전화 주시면 무료로 확인해 드립니다.</p>
      <div class="subsidy-cta">
        <a href="tel:010-4668-4942">☎ 철거 문의 010-4668-4942</a>
        <span class="cap">※ 지원금은 정부 정책에 따라 변동될 수 있으며, 정확한 내용은 상담 시 안내드립니다.</span>
      </div>
    </div>
  </div>
</section>

<!-- WHY -->
<section class="blk" id="why">
  <div class="wrap">
    <div class="sec-head center rv">
      <div class="sec-label">WHY SAVESHOP</div>
      <h2 class="sec-title"><span style="white-space:nowrap">빠르고 · 정확하고 · 깔끔하게,</span><br><span class="hl" style="white-space:nowrap">믿을 수 있는 원상복구.</span></h2>
    </div>
    <p class="why-lead rv">오랜 경험과 노하우로 <b>처음처럼 깨끗한 원상복구</b>를 약속합니다.</p>
    <div class="why-grid">
      <div class="whyc rv">
        <div class="wi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>
        <h4>100% 무료 방문 견적</h4>
        <p><span style="white-space:nowrap">현장을 직접 방문해</span> <span style="white-space:nowrap"><b>무료</b>로 정확하게 견적을 산출합니다.</span></p>
      </div>
      <div class="whyc rv">
        <div class="wi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg></div>
        <h4>전국 최저가</h4>
        <p><span style="white-space:nowrap">초기 견적 이후 <b>비용 인상 없이</b>,</span> <span style="white-space:nowrap">전국 최저가로 진행합니다.</span></p>
      </div>
      <div class="whyc rv">
        <div class="wi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></div>
        <h4>모든 현장 AS 1년 보장</h4>
        <p><span style="white-space:nowrap">시공 후에도 <b>1년간 현장 AS</b>를</span> <span style="white-space:nowrap">책임지고 보장합니다.</span></p>
      </div>
    </div>
  </div>
</section>

<!-- PROCESS: 진행 절차 -->
<section class="blk" id="process">
  <div class="wrap">
    <div class="sec-head center rv">
      <div class="sec-label">HOW IT WORKS</div>
      <h2 class="sec-title">상담부터 공사 완료까지,<br><span class="hl">진행 절차.</span></h2>
      <p class="sec-desc"><span style="white-space:nowrap">현장 답사부터 신고·협의,</span> <span style="white-space:nowrap">안전한 해체 작업과 폐기물 처리까지</span> <span style="white-space:nowrap">체계적으로 진행합니다.</span></p>
    </div>
    <div class="proc-grid">
      <div class="procc rv">
        <div class="pnum">1</div>
        <h4>전국 무료 상담</h4>
        <ul><li>고객 상황에 맞는 무료 상담</li><li>희망 리턴 패키지 안내</li></ul>
      </div>
      <div class="procc rv">
        <div class="pnum">2</div>
        <h4>현장 답사</h4>
        <ul><li>현장 주변 높이·설비 위치 파악</li><li>주변 여건에 따른 작업 시간·교통 흐름 파악</li></ul>
      </div>
      <div class="procc rv">
        <div class="pnum">3</div>
        <h4>신고 및 협의</h4>
        <ul><li>관할구청 단전·단수 신고</li><li>분진방지 살수용 1선 유지</li><li>멸실신고·폐기물 발생 신고</li><li>인근 주민 협의</li></ul>
      </div>
      <div class="procc rv">
        <div class="pnum">4</div>
        <h4>가설 작업</h4>
        <ul><li>건물 주변 분진·낙석 방지 방진막·방음판 설치</li></ul>
      </div>
      <div class="procc rv">
        <div class="pnum">5</div>
        <h4>계획 수립</h4>
        <ul><li>해체물 종류·규모에 맞는 공법·공정표 작성</li><li>소음·분진·진동·안전 대책 수립</li></ul>
      </div>
      <div class="procc rv">
        <div class="pnum">6</div>
        <h4>해체 작업</h4>
        <ul><li>내부·외부 철거</li><li>전기·용접·가스·목공 등 부분 철거</li><li>폐기물 분리·철거재 처리 운반</li><li>비산분진용 살수 직행</li></ul>
      </div>
      <div class="procc rv final">
        <div class="pnum">7</div>
        <h4>공사 완료 · 검토</h4>
        <ul><li>철거 폐기물 반출</li><li>혼합·건설 폐기물 분리</li><li>건축물대장 말소 신고</li></ul>
      </div>
      <div class="procc rv" style="display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;background:linear-gradient(160deg,var(--d-bg-2),var(--d-bg));border:none">
        <div style="font-family:var(--display);font-weight:700;font-size:18px;color:var(--neon-bright);line-height:1.3;margin-bottom:10px">처음처럼<br>깔끔하게.</div>
        <a href="tel:010-4668-4942" style="font-family:var(--display);font-weight:600;font-size:14px;color:#000;background:var(--neon-bright);padding:9px 16px;border-radius:100px">☎ 견적 문의</a>
      </div>
    </div>
  </div>
</section>

<!-- CASES: 시공 전·후 사례 -->


<!-- CONTACT -->
<!-- FAQ -->
<section class="blk" id="faq">
  <div class="wrap">
    <div class="sec-head center rv">
      <div class="sec-label">FAQ</div>
      <h2 class="sec-title">자주 묻는 <span class="hl">질문.</span></h2>
    </div>
    <div class="faq-list">
      <div class="faq-item rv">
        <button class="faq-q" onclick="toggleFaq(this)"><span>철거 비용은 어떻게 정해지나요?</span><span class="faq-ic">+</span></button>
        <div class="faq-a"><p>업종·평수·철거 범위·폐기물 양에 따라 달라집니다. {{REGION}} 현장을 직접 확인한 뒤 무료로 정찰 견적을 안내드립니다.</p></div>
      </div>
      <div class="faq-item rv">
        <button class="faq-q" onclick="toggleFaq(this)"><span>철거 작업은 얼마나 걸리나요?</span><span class="faq-ic">+</span></button>
        <div class="faq-a"><p>일반 점포 기준 하루~이틀 내 마무리되는 경우가 많습니다. 규모와 범위에 따라 현장 확인 후 정확한 일정을 안내드립니다.</p></div>
      </div>
      <div class="faq-item rv">
        <button class="faq-q" onclick="toggleFaq(this)"><span>폐기물 처리도 포함되나요?</span><span class="faq-ic">+</span></button>
        <div class="faq-a"><p>네. 철거 후 발생하는 폐기물 처리와 현장 정리까지 견적에 포함해 진행합니다.</p></div>
      </div>
      <div class="faq-item rv">
        <button class="faq-q" onclick="toggleFaq(this)"><span>임대차 원상복구는 어디까지 해야 하나요?</span><span class="faq-ic">+</span></button>
        <div class="faq-a"><p>계약서상 원상복구 범위에 따라 다릅니다. 현장과 계약 내용을 함께 확인해 적정 범위를 짚어드리고, 과한 작업 없이 진행합니다.</p></div>
      </div>
      <div class="faq-item rv">
        <button class="faq-q" onclick="toggleFaq(this)"><span>철거 지원금은 누구나 받을 수 있나요?</span><span class="faq-ic">+</span></button>
        <div class="faq-a"><p>폐업 점포 철거 지원금은 매장 위치·면적 등 조건에 따라 대상 여부가 달라집니다. 전화 주시면 무료로 대상 여부를 확인하고 신청까지 대행해 드립니다.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="blk" id="contact">
  <div class="wrap ct-grid">
    <div class="ct-left rv">
      <div class="sec-label">GET STARTED</div>
      <h2><span data-region>{{REGION}}</span> 어디든<br><span class="hl">전화 한 통이면 끝.</span></h2>
      <p>이름과 연락처만 남겨주시면, 순차적으로 연락 드리겠습니다. 철거 지원금 대상 여부도 함께 확인해 드립니다.</p>
      <div class="ct-methods">
        <a href="tel:010-4668-4942" class="ctm">
          <span class="ci">☎</span>
          <span><span class="cl">전화 상담</span><br><span class="cv">010-4668-4942</span></span>
        </a>
        <a href="javascript:void(0)" onclick="smsContact()" class="ctm">
          <span class="ci">✉</span>
          <span><span class="cl">문자 상담 (24시간 접수)</span><br><span class="cv">문자로 문의하기</span></span>
        </a>
      </div>
    </div>
    <div class="formbox rv">
      <h3>무료 견적 신청</h3>
      <p class="fs">문의 주시면 확인 후 순차적으로 연락 드리겠습니다.</p>
      <div class="fld"><label for="name">성함</label><input id="name" type="text" placeholder="예: 김사장"></div>
      <div class="fld"><label for="phone">연락처</label><input id="phone" type="tel" placeholder="010-0000-0000"></div>
      <div class="fld">
        <label>관심 항목 <span style="font-weight:400;color:var(--muted-2)">(복수 선택)</span></label>
        <div class="nchips" id="chips">
          <span class="nchip" onclick="toggleChip(this)">철거</span>
          <span class="nchip" onclick="toggleChip(this)">원상복구</span>
          <span class="nchip" onclick="toggleChip(this)">부분 철거</span>
        </div>
      </div>
      <div class="fld">
        <label for="addrBase">현장 주소 <span style="font-weight:400;color:var(--muted-2)">(상세주소로 기재 부탁 드립니다.)</span></label>
        <div class="addr-row">
          <input id="addrBase" type="text" placeholder="주소 검색 버튼을 눌러주세요" readonly onclick="openPostcode()">
          <button type="button" class="addr-btn" onclick="openPostcode()">주소 검색</button>
        </div>
        <input id="addrDetail" type="text" placeholder="상세주소 (층/호수 등) — 예: 3층 전체" style="margin-top:7px">
      </div>
      <button class="nsubmit" onclick="submitForm()">무료 견적 신청하기</button>
      <p class="fnote">상담 신청 시 개인정보 수집·이용에 동의하는 것으로 간주됩니다. 입력하신 정보는 상담 목적으로만 사용됩니다.</p>
    </div>
  </div>
</section>

<footer class="one-foot">
  © 2026 <b>세이브샵 (SAVESHOP)</b> · thesaveshop.com · 상담 <a href="tel:010-4668-4942">010-4668-4942</a>
</footer>

<div class="mbar">
  <a href="tel:010-4668-4942" class="mb1">☎ 전화 상담</a>
  <a href="#contact" class="mb3">무료 견적</a>
</div>

<script>
  var SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbw0pYJJJY2GpA0b4fm2a7efyv04YDctXjuOIoQ_t_WLTlNwYPLESd7PIvOZVSCkrNVq/exec";

  // 햄버거
  var menuToggle=document.getElementById('menuToggle');
  var topMenu=document.getElementById('topMenu');
  if(menuToggle){
    menuToggle.addEventListener('click',function(){topMenu.classList.toggle('open');menuToggle.classList.toggle('open');});
    topMenu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){topMenu.classList.remove('open');menuToggle.classList.remove('open');});});
  }

  function comingSoon(name){alert(name+' 페이지는 현재 준비 중입니다.\\n빠르게 찾아뵙겠습니다. 문의는 전화 또는 상담 신청을 이용해 주세요.');}
  function toggleChip(el){el.classList.toggle('on');}

  // 상단바: 다크 히어로 위에 있을 때 투명+밝은 메뉴 (card-terminal과 동일)
  (function(){
    var topbar=document.querySelector('.topbar');
    var hero=document.querySelector('.hero');
    if(!topbar||!hero) return;
    function updateBar(){
      var rect=hero.getBoundingClientRect();
      var barH=topbar.offsetHeight||60;
      var onHero = rect.bottom > barH;
      topbar.classList.toggle('on-hero', onHero);
    }
    updateBar();
    window.addEventListener('scroll', updateBar, {passive:true});
    window.addEventListener('resize', updateBar);
  })();

  function smsContact(){
    var phone='010-4668-4942';
    var isMobile=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    if(isMobile){window.location.href='sms:'+phone;}
    else{
      if(navigator.clipboard){navigator.clipboard.writeText(phone).then(function(){alert('PC에서는 문자 앱 연결이 어려워요.\\n\\n전화번호 '+phone+' 가 복사되었습니다.\\n휴대폰으로 문자를 보내시거나, 간편 상담 폼을 이용해 주세요.');document.getElementById('contact').scrollIntoView({behavior:'smooth'});});}
      else{alert('PC에서는 문자 앱 연결이 어려워요.\\n\\n문자: '+phone);document.getElementById('contact').scrollIntoView({behavior:'smooth'});}
    }
  }

  // ===== 카카오(Daum) 우편번호 검색 =====
  function openPostcode(){
    new daum.Postcode({
      oncomplete:function(data){
        // 도로명 주소 우선, 없으면 지번 주소
        var base = data.roadAddress || data.jibunAddress;
        document.getElementById('addrBase').value = base;
        // 상세주소 칸으로 포커스 이동
        document.getElementById('addrDetail').focus();
      }
    }).open();
  }

  function submitForm(){
    var name=document.getElementById('name').value.trim();
    var phone=document.getElementById('phone').value.trim();
    var addrBase=document.getElementById('addrBase').value.trim();
    var addrDetail=document.getElementById('addrDetail').value.trim();
    var addr=(addrBase+' '+addrDetail).trim();
    if(!name||!phone){alert('성함과 연락처를 입력해 주세요.');return;}
    var items=[];
    document.querySelectorAll('#chips .nchip.on').forEach(function(c){items.push(c.textContent.trim());});
    var btn=document.querySelector('.nsubmit');
    var region=(document.querySelector('[data-region]')||{}).textContent||'';
    if(!SHEET_ENDPOINT){alert(name+'님, 상담 신청이 접수되었습니다.\\n순차적으로 연락드리겠습니다.');return;}
    btn.disabled=true; var orig=btn.textContent; btn.textContent='접수 중...';
    var data={name:name,phone:phone,address:addr,items:'[철거·원상복구] '+items.join(', '),time:new Date().toLocaleString('ko-KR')};
    fetch(SHEET_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(data)})
      .then(function(){alert(name+'님, 무료 견적 신청이 접수되었습니다.\\n순차적으로 연락드리겠습니다. 감사합니다.');document.getElementById('name').value='';document.getElementById('phone').value='';document.getElementById('addrBase').value='';document.getElementById('addrDetail').value='';document.querySelectorAll('#chips .nchip.on').forEach(function(c){c.classList.remove('on');});})
      .catch(function(){alert('일시적인 오류로 접수에 실패했습니다.\\n전화(010-4668-4942)로 문의해 주세요.');})
      .finally(function(){btn.disabled=false;btn.textContent=orig;});
  }


  // 스크롤 리빌
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});

</script>
<script>
  // 콘텐츠 보호(우클릭·드래그선택·복사 방지). 폼 입력란은 예외.
  (function(){
    function isEditable(t){
      if(!t) return false;
      var tag=(t.tagName||'').toUpperCase();
      return tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT'||(t.isContentEditable===true);
    }
    document.addEventListener('contextmenu',function(e){ if(!isEditable(e.target)) e.preventDefault(); });
    document.addEventListener('selectstart',function(e){ if(!isEditable(e.target)) e.preventDefault(); });
    document.addEventListener('dragstart',function(e){ if(!isEditable(e.target)) e.preventDefault(); });
    document.addEventListener('copy',function(e){ if(!isEditable(e.target)) e.preventDefault(); });
  })();

function toggleFaq(btn){
  var item = btn.closest('.faq-item');
  var open = item.classList.contains('open');
  if(open){ item.classList.remove('open'); item.querySelector('.faq-a').style.maxHeight='0'; }
  else{ item.classList.add('open'); var a=item.querySelector('.faq-a'); a.style.maxHeight=a.scrollHeight+'px'; }
}

</script>
</body>
</html>
`;

// --- 지역 데이터 (시·도별, src/regions/) ---
// ===== 서울 지역 데이터 (6곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 서울 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(서울)도 함께 수정하세요.

const REGIONS_SEOUL = {
  "강남역": {
    slug: "gangnam",
    sido: "서울 강남구",
    context:
      "강남역 일대는 전국에서 손꼽히는 유동 인구를 가진 최대급 번화가입니다. 직장인·유흥·뷰티·의료 수요가 밀집해 음식점·카페·뷰티 매장이 촘촘하고, 높은 임대료와 빠른 점포 회전으로 신규 개업과 업종 교체가 끊이지 않는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "네일 · 미용실 등 뷰티"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "직장인 회식·저녁 상권. 테이블 주문과 정산을 빠르게.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "강남역 일대는 전국에서 손꼽히는 유동 인구를 가진 최대급 번화가로, 직장인·뷰티·의료 수요가 밀집해 음식점·카페·뷰티 매장이 촘촘하게 들어서 있습니다. 높은 임대료와 빠른 점포 회전으로 신규 개업과 업종 교체가 끊이지 않아, 입·퇴점에 따른 철거와 원상복구 수요가 꾸준히 발생하는 지역입니다.",
    nearby: ["역삼", "신논현", "교대"],
  },
  "홍대": {
    slug: "hongdae",
    sido: "서울 마포구",
    context:
      "홍대는 젊은 층이 모이는 카페·주점·소형 매장 밀집 상권입니다. 야간 유동 인구가 많고 개성 있는 음식점·바·편집숍이 빠르게 생기고 바뀌어, 결제·주문 장비 수요가 활발하고 점포 교체가 잦은 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "야간 주점 상권. 테이블 주문과 빠른 정산.",
      },
      {
        biz: "베이커리 · 디저트",
        gear: "포스기 · 키오스크",
        why: "디저트 카페 수요. 주문·정산을 빠르게.",
      },
    ],
    demolition:
      "홍대는 젊은 층이 모이는 카페·호프·소형 매장 밀집 상권으로, 야간 유동 인구가 많고 개성 있는 음식점·편집숍이 빠르게 생기고 바뀝니다. 트렌드에 따라 점포 교체가 빠른 만큼, 인테리어 철거와 폐업·원상복구 수요가 꾸준히 이어지는 지역입니다.",
    nearby: ["합정", "연남", "상수"],
  },
  "성수": {
    slug: "seongsu",
    sido: "서울 성동구",
    context:
      "성수는 카페·팝업스토어·F&B가 밀집한 서울의 대표 핫플레이스입니다. 브랜드 팝업과 감성 카페·레스토랑이 빠르게 들어서고 바뀌어, 결제·주문 장비와 단기 운영 수요가 활발한 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "베이커리 · 디저트",
        gear: "포스기 · 키오스크",
        why: "감성 카페·디저트 수요. 주문·정산을 빠르게.",
      },
      {
        biz: "브런치 · 레스토랑",
        gear: "포스기 · 테이블오더",
        why: "감성 외식 수요. 테이블 주문과 정산을 한 번에.",
      },
    ],
    demolition:
      "성수는 카페·팝업스토어·F&B가 밀집한 서울의 대표 핫플레이스로, 브랜드 팝업과 감성 카페·레스토랑이 빠르게 들어서고 바뀝니다. 팝업·신규 매장 입점이 잦은 특성상 단기 인테리어 시공과 철거·원상복구 수요가 활발하게 발생하는 지역입니다.",
    nearby: ["서울숲", "뚝섬", "건대"],
  },
  "건대": {
    slug: "konkuk",
    sido: "서울 광진구",
    context:
      "건대 입구는 대학가와 먹자골목·주점이 결합된 대형 번화가입니다. 학생·직장인 야간 수요가 많아 음식점·호프·분식이 밀집하고, 소형 매장의 개업과 교체가 활발한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "대학가 야간 주점 상권. 테이블 주문과 빠른 정산.",
      },
      {
        biz: "스터디카페 · 독서실",
        gear: "키오스크 · 무인 결제",
        why: "대학가 무인 운영 수요. 좌석 결제·정산을 자동으로.",
      },
    ],
    demolition:
      "건대 입구는 대학가와 먹자골목이 결합된 대형 번화가로, 학생·직장인 야간 수요가 많아 음식점·호프·요리주점·분식이 밀집해 있습니다. 소형 매장의 개업과 교체가 활발한 만큼, 폐업·이전에 따른 철거와 원상복구 수요가 많은 지역입니다.",
    nearby: ["성수", "구의", "어린이대공원"],
  },
  "잠실": {
    slug: "jamsil",
    sido: "서울 송파구",
    context:
      "잠실은 롯데월드몰·백화점과 대단지 주거가 결합된 대형 상권입니다. 쇼핑·외식 수요가 두텁고 가족 단위 이용이 많아 음식점·카페·뷰티 매장의 결제·주문 장비 수요가 안정적인 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "네일 · 미용실 등 뷰티"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "외식·모임 상권. 테이블 주문과 정산을 한 번에.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "잠실은 롯데월드몰·백화점과 대단지 주거가 결합된 대형 상권으로, 쇼핑·외식 수요가 두텁고 가족 단위 이용이 많은 지역입니다. 상업시설과 주거가 밀집한 만큼 점포 교체와 인테리어 리모델링에 따른 철거·원상복구 수요가 꾸준히 발생하는 상권입니다.",
    nearby: ["석촌", "잠실새내", "방이"],
  },
  "신촌": {
    slug: "sinchon",
    sido: "서울 서대문구",
    context:
      "신촌은 대학가를 배경으로 음식점·카페·주점이 밀집한 전통 번화가입니다. 학생 수요가 두텁고 합리적 가격대의 외식 매장이 많아, 결제·주문 장비 수요가 꾸준하고 소형 매장 교체가 활발한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "대학가 야간 상권. 테이블 주문과 빠른 정산.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "신촌은 대학가를 배경으로 음식점·카페·호프가 밀집한 전통 번화가로, 학생 수요가 두텁고 합리적 가격대의 외식 매장이 많은 지역입니다. 대학가 상권 특성상 소형 매장 교체가 잦아, 폐업·이전에 따른 철거와 원상복구 수요가 많은 지역입니다.",
    nearby: ["이대", "홍대", "아현"],
  },
};

// ===== 경기 지역 데이터 (16곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 경기 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(경기)도 함께 수정하세요.

const REGIONS_GYEONGGI = {
  "광교": {
    slug: "gwanggyo",
    sido: "경기 수원시",
    context:
      "광교는 경기도청·법조타운·갤러리아 백화점과 롯데몰이 모인 수원의 신흥 중심 상권입니다. 광교카페거리와 호수공원 일대를 따라 감성 카페·브런치·고급 음식점이 밀집해 있고, 신축 상가 입점이 이어지며 신규 개업 매장의 단말기·포스 설치 수요가 꾸준합니다.",
    emphasis: ["브런치 매장", "카페", "음식점 · 고깃집"],
    // 이 지역에만 추가되는 업종 줄
    extraRows: [
      {
        biz: "브런치 매장",
        gear: "포스기 · 테이블오더",
        why: "광교 호수공원 주변 브런치 수요. 식사 주문·정산을 한 번에.",
      },
    ],
    demolition:
      "광교는 경기도청·법조타운과 갤러리아 백화점·롯데몰이 자리한 수원의 신흥 중심 상권으로, 광교카페거리와 호수공원 일대를 따라 카페·브런치·음식점이 빽빽하게 들어서 있습니다. 신축 상가 입점과 대형 복합몰을 중심으로 점포 회전이 빨라, 인테리어 교체와 폐업·이전에 따른 철거·원상복구 수요가 꾸준히 함께 발생하는 지역입니다.",
    nearby: ["영통", "수원역", "광교중앙역"],
  },
  "영통": {
    slug: "yeongtong",
    sido: "경기 수원시",
    context:
      "영통은 아주대학교 대학가와 삼성전자 직원 수요를 바탕으로 가성비 음식점·카페가 활발한 상권입니다. 수원에서 손꼽히는 대형 학원가가 있고, 신동 카페거리 등 젊은 층이 모이는 골목 상권이 꾸준히 형성되고 있습니다.",
    emphasis: ["음식점 · 고깃집", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "대학가·직장인 회식 수요. 테이블 주문·정산을 빠르게.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "영통은 아주대학교 대학가와 삼성전자 직원 수요를 배경으로 음식점·카페와 대형 학원가가 밀집한 상권입니다. 신동 카페거리를 비롯한 골목 상권에서 젊은 층을 겨냥한 점포가 자주 바뀌어, 폐업·이전에 따른 철거와 원상복구 수요가 활발하게 이어지는 지역입니다.",
    nearby: ["광교", "망포", "영통구청"],
  },
  "동탄1": {
    slug: "dongtan1",
    sido: "경기 화성시",
    context:
      "동탄1신도시는 메타폴리스 남광장·북광장과 나루 상권을 중심으로 학원가와 식당가가 발달한 지역입니다. 가족 단위 거주 인구가 많아 생활밀착형 매장과 학원·음식점 수요가 꾸준합니다.",
    emphasis: ["학원 · 소형 매장", "음식점 · 고깃집"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "저녁 회식·모임 수요. 테이블 주문과 정산을 한 번에.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "동탄1신도시는 메타폴리스 남광장·북광장과 나루 상권을 중심으로 학원가와 식당가가 발달한 지역입니다. 조성 시기가 오래된 상권을 중심으로 노후 점포 교체와 대형 상업시설 리모델링이 이어지며, 철거·원상복구 수요가 꾸준히 발생합니다.",
    nearby: ["동탄2", "병점", "영통"],
  },
  "동탄2": {
    slug: "dongtan2",
    sido: "경기 화성시",
    context:
      "동탄2신도시는 동탄역 롯데백화점과 호수공원·카페거리를 중심으로 빠르게 확장 중인 신도시 상권입니다. 영유아·어린이 비율이 높은 젊은 맞벌이 가구가 많아 카페·가족 단위 음식점과 신규 개업 수요가 두드러집니다.",
    emphasis: ["카페", "음식점 · 고깃집"],
    extraRows: [
      {
        biz: "배달 전문점",
        gear: "무선 단말기 · 포스기",
        why: "아파트 밀집·맞벌이 가구 배달 수요. 이동 결제와 주문 관리.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "동탄2신도시는 동탄역 롯데백화점과 호수공원·카페거리를 축으로 빠르게 확장 중인 신도시 상권입니다. 신축 상가 입점이 계속되는 만큼 신규 인테리어 시공과 기존 점포의 원상복구가 함께 발생해, 철거·원상복구 수요가 꾸준한 지역입니다.",
    nearby: ["동탄1", "동탄역", "오산"],
  },
  "분당": {
    slug: "bundang",
    sido: "경기 성남시",
    context:
      "분당은 정자동 카페거리와 서현·수내 먹자골목을 중심으로 1기 신도시 가운데 손꼽히는 소비력을 가진 상권입니다. 안정적인 거주 인구와 직장인 수요가 더해져 카페·음식점·뷰티 매장이 촘촘하게 형성되어 있고, 점포 회전과 신규 개업이 꾸준한 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "네일 · 미용실 등 뷰티"],
    extraRows: [
      {
        biz: "베이커리 · 디저트",
        gear: "포스기 · 키오스크",
        why: "정자동 카페거리 디저트 수요. 주문·정산을 빠르게.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "분당은 정자동 카페거리와 서현·수내 먹자골목을 중심으로 1기 신도시 가운데 손꼽히는 소비력을 가진 상권입니다. 조성 30년이 넘어 노후 점포 리모델링과 업종 교체가 잦은 만큼, 인테리어 철거와 임대차 원상복구 수요가 꾸준히 이어지는 지역입니다.",
    nearby: ["판교", "광교", "수내역"],
  },
  "판교": {
    slug: "pangyo",
    sido: "경기 성남시",
    context:
      "판교는 테크노밸리 IT 기업과 직장인 수요를 바탕으로 점심·저녁 외식과 카페 이용이 활발한 상권입니다. 현대백화점 판교점과 오피스 밀집 지역을 중심으로 객단가 높은 음식점·카페가 자리 잡고 있어 결제·주문 장비 수요가 안정적입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "직장인 회식·모임 수요. 테이블 주문·정산을 빠르게.",
      },
      {
        biz: "샐러드 · 건강식",
        gear: "포스기 · 키오스크",
        why: "오피스 점심 수요. 빠른 주문과 회전 관리.",
      },
    ],
    demolition:
      "판교는 테크노밸리 IT 기업과 현대백화점 판교점을 배경으로 객단가 높은 음식점·카페가 자리 잡은 오피스 상권입니다. 오피스 상권 특성상 임차 매장의 입·퇴점이 잦아, 폐업·이전에 따른 철거와 원상복구 수요가 꾸준히 발생하는 지역입니다.",
    nearby: ["분당", "광교", "정자역"],
  },
  "일산": {
    slug: "ilsan",
    sido: "경기 고양시",
    context:
      "일산은 라페스타·웨스턴돔 등 대형 스트리트 상권과 호수공원 일대를 중심으로 외식·쇼핑 수요가 모이는 1기 신도시 상권입니다. 학원가와 주거 밀집 지역이 함께 형성되어 음식점·카페·소형 매장의 결제 장비 수요가 꾸준합니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "라페스타·웨스턴돔 저녁 상권. 테이블 주문과 정산을 한 번에.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "일산은 라페스타·웨스턴돔 등 대형 스트리트 상권과 호수공원 일대를 중심으로 외식·쇼핑 수요가 모이는 1기 신도시 상권입니다. 대형 상권의 점포 교체가 잦고 노후 상가 리모델링이 이어지며, 철거·원상복구 수요가 꾸준한 지역입니다.",
    nearby: ["대화역", "주엽", "화정"],
  },
  "평촌": {
    slug: "pyeongchon",
    sido: "경기 안양시",
    context:
      "평촌은 전국에서 손꼽히는 대형 학원가와 범계 로데오·먹자골목을 중심으로 유동 인구가 많은 상권입니다. 학생·학부모 수요와 직장인 외식 수요가 겹쳐 음식점·분식·카페가 밀집해 있고, 소형 매장의 개업과 교체가 활발합니다.",
    emphasis: ["학원 · 소형 매장", "음식점 · 고깃집", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "범계 로데오 저녁 상권. 테이블 주문과 정산을 빠르게.",
      },
      {
        biz: "스터디카페 · 독서실",
        gear: "키오스크 · 무인 결제",
        why: "학원가 무인 운영 수요. 좌석 결제·정산을 자동으로.",
      },
    ],
    demolition:
      "평촌은 전국에서 손꼽히는 대형 학원가와 범계 로데오·먹자골목을 중심으로 유동 인구가 많은 상권입니다. 학생·직장인 수요가 겹쳐 음식점·분식·카페의 개업과 교체가 활발한 만큼, 폐업·이전에 따른 철거와 원상복구 수요가 많은 지역입니다.",
    nearby: ["범계역", "인덕원", "산본"],
  },
  "중동": {
    slug: "jungdong",
    sido: "경기 부천시",
    context:
      "부천 중동은 신중동역 일대와 현대백화점·롯데백화점이 모인 부천의 핵심 상권입니다. 밀집한 주거 인구와 쇼핑 수요를 바탕으로 음식점·카페·뷰티 매장이 활발하게 형성되어 결제·주문 장비 수요가 꾸준합니다.",
    emphasis: ["음식점 · 고깃집", "카페", "네일 · 미용실 등 뷰티"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "중동 먹자상권 저녁 수요. 테이블 주문·정산을 한 번에.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "부천 중동은 신중동역 일대와 현대백화점·롯데백화점이 모인 부천의 핵심 상권입니다. 백화점·상업시설이 밀집한 도심 특성상 점포 교체와 인테리어 리모델링이 잦아, 철거·원상복구 수요가 꾸준히 발생하는 지역입니다.",
    nearby: ["상동", "부천역", "송내"],
  },
  "별내": {
    slug: "byeollae",
    sido: "경기 남양주시",
    context:
      "별내신도시는 별내역과 이마트를 중심으로 조성된 주거 밀집형 신도시 상권입니다. 젊은 가족 단위 거주 인구가 많아 생활밀착형 음식점·카페·학원 수요가 꾸준하고, 신규 상가 입점에 따른 개업 수요가 이어지는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "배달 전문점",
        gear: "무선 단말기 · 포스기",
        why: "아파트 밀집·맞벌이 가구 배달 수요. 이동 결제와 주문 관리.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "별내신도시는 별내역과 이마트를 중심으로 조성된 주거 밀집형 신도시 상권입니다. 신규 상가 입점이 이어지는 만큼 새 매장의 인테리어 시공과 기존 점포의 원상복구가 함께 발생해, 철거·원상복구 수요가 꾸준한 지역입니다.",
    nearby: ["다산", "별내역", "퇴계원"],
  },
  "다산": {
    slug: "dasan",
    sido: "경기 남양주시",
    context:
      "다산신도시는 다산진건·지금지구를 중심으로 빠르게 확장된 신도시 상권입니다. 영유아·어린이 비율이 높은 젊은 맞벌이 가구가 많아 카페·가족 단위 음식점과 학원 수요가 두드러지고, 신규 개업이 활발한 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "배달 전문점",
        gear: "무선 단말기 · 포스기",
        why: "아파트 밀집·맞벌이 가구 배달 수요. 이동 결제와 주문 관리.",
      },
      {
        biz: "베이커리 · 디저트",
        gear: "포스기 · 키오스크",
        why: "가족 단위 디저트 수요. 주문·정산을 빠르게.",
      },
    ],
    demolition:
      "다산신도시는 다산진건·지금지구를 중심으로 빠르게 확장된 신도시 상권입니다. 카페·가족 단위 음식점과 학원의 신규 개업이 활발한 만큼, 새 점포 인테리어 시공과 기존 매장 원상복구가 함께 발생하는 지역입니다.",
    nearby: ["별내", "도농", "구리"],
  },
  "광명": {
    slug: "gwangmyeong",
    sido: "경기 광명시",
    context:
      "광명사거리 일대는 전통시장과 먹자골목이 결합된 광명의 대표 번화가입니다. 서울과 인접한 고밀도 주거를 배경으로 음식점·분식·소형 매장이 촘촘하게 형성되어, 결제·주문 장비 수요가 꾸준한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "먹자골목 저녁 상권. 테이블 주문과 정산을 빠르게.",
      },
      {
        biz: "전통시장 점포",
        gear: "무선 단말기 · 유선 단말기",
        why: "시장 상인 결제 수요. 자리에서 간편하게 카드 결제.",
      },
    ],
    demolition:
      "광명사거리 일대는 전통시장과 먹자골목이 결합된 광명의 대표 번화가입니다. 서울과 인접한 고밀도 주거를 배경으로 노후 상가와 시장 점포의 교체가 이어져, 인테리어 리모델링과 원상복구 수요가 꾸준한 지역입니다.",
    nearby: ["철산", "구로", "개봉"],
  },
  "철산": {
    slug: "cheolsan",
    sido: "경기 광명시",
    context:
      "철산은 철산역과 광명시청을 중심으로 형성된 역세권 상권입니다. 관공서·오피스와 대단지 주거가 더해져 음식점·카페·뷰티 매장이 안정적으로 형성되어, 결제·주문 장비 수요가 꾸준한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "네일 · 미용실 등 뷰티"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "오피스·주거 배후 저녁 상권. 테이블 주문과 정산을 한 번에.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "철산은 철산역과 광명시청을 중심으로 형성된 역세권 상권으로, 관공서·오피스와 대단지 주거가 어우러진 지역입니다. 역세권 점포 교체와 상가 리모델링이 이어지며, 철거·원상복구 수요가 꾸준히 발생합니다.",
    nearby: ["광명", "가산디지털단지", "독산"],
  },
  "운정": {
    slug: "unjeong",
    sido: "경기 파주시",
    context:
      "운정신도시는 운정역과 중심상업지구를 축으로 빠르게 확장된 신도시 상권입니다. 젊은 가족 단위 거주 인구가 많아 카페·가족 단위 음식점·학원 수요가 두드러지고, 신규 상가 입점에 따른 개업이 활발한 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "배달 전문점",
        gear: "무선 단말기 · 포스기",
        why: "아파트 밀집·맞벌이 가구 배달 수요. 이동 결제와 주문 관리.",
      },
      {
        biz: "베이커리 · 디저트",
        gear: "포스기 · 키오스크",
        why: "가족 단위 디저트 수요. 주문·정산을 빠르게.",
      },
    ],
    demolition:
      "운정신도시는 운정역과 중심상업지구를 축으로 빠르게 확장된 신도시 상권입니다. 신규 상가 입점에 따른 개업이 활발한 만큼, 새 매장의 인테리어 시공과 기존 점포의 원상복구가 함께 발생하는 지역입니다.",
    nearby: ["야당", "교하", "일산"],
  },
  "김포한강": {
    slug: "gimpo-hangang",
    sido: "경기 김포시",
    context:
      "김포 한강신도시는 구래·장기지구를 중심으로 조성된 주거 밀집형 신도시 상권입니다. 젊은 가족 단위 거주 인구가 많아 생활밀착형 음식점·카페·학원 수요가 꾸준하고, 신규 상가 입점이 이어지는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "배달 전문점",
        gear: "무선 단말기 · 포스기",
        why: "아파트 밀집·맞벌이 가구 배달 수요. 이동 결제와 주문 관리.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "김포 한강신도시는 구래·장기지구를 중심으로 조성된 주거 밀집형 신도시 상권입니다. 생활밀착형 음식점·카페·학원이 이어지고 신규 상가 입점이 계속되며, 새 점포 인테리어와 기존 매장 원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["구래", "장기", "운양"],
  },
  "평택고덕": {
    slug: "godeok-pt",
    sido: "경기 평택시",
    context:
      "평택 고덕신도시는 삼성전자 평택캠퍼스 배후로 빠르게 성장한 신도시 상권입니다. 젊은 직장인·가족 단위 유입이 많아 음식점·카페·생활밀착형 매장 수요가 늘고 있으며, 신규 상가 개업이 활발한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "직장인 회식·모임 수요. 테이블 주문과 정산을 빠르게.",
      },
      {
        biz: "배달 전문점",
        gear: "무선 단말기 · 포스기",
        why: "아파트 밀집·1인 가구 배달 수요. 이동 결제와 주문 관리.",
      },
    ],
    demolition:
      "평택 고덕신도시는 삼성전자 평택캠퍼스 배후로 빠르게 성장한 신도시 상권입니다. 젊은 직장인·가족 단위 유입과 함께 상가 개업이 활발한 만큼, 새 매장의 인테리어 시공과 기존 점포의 원상복구가 함께 발생하는 지역입니다.",
    nearby: ["평택역", "송탄", "안중"],
  },
};

// ===== 인천 지역 데이터 (7곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 인천 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(인천)도 함께 수정하세요.

const REGIONS_INCHEON = {
  "부평": {
    slug: "bupyeong",
    sido: "인천 부평구",
    context:
      "부평은 부평역 지하상가와 먹자골목을 중심으로 형성된 인천 최대급 번화가입니다. 유동 인구가 많고 음식점·주점·소형 매장이 촘촘하게 밀집해, 결제·주문 장비 수요가 활발하고 점포 교체가 잦은 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "먹자골목 야간 상권. 테이블 주문과 정산을 빠르게.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "부평은 부평역 지하상가와 먹자골목을 중심으로 형성된 인천 최대급 번화가로, 유동 인구가 많고 음식점·호프·소형 매장이 촘촘하게 밀집해 있습니다. 점포 교체가 빠른 번화가 특성상 입·퇴점에 따른 철거와 원상복구 수요가 꾸준히 발생하는 지역입니다.",
    nearby: ["부개", "송내", "동암"],
  },
  "송도": {
    slug: "songdo",
    sido: "인천 연수구",
    context:
      "송도국제도시는 오피스·국제업무지구와 대단지 주거가 결합된 신도시 상권입니다. 직장인·가족 단위 수요가 두터워 카페·음식점·외식 매장이 안정적으로 형성되어, 결제·주문 장비 수요가 꾸준한 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "네일 · 미용실 등 뷰티"],
    extraRows: [
      {
        biz: "브런치 · 레스토랑",
        gear: "포스기 · 테이블오더",
        why: "오피스·가족 외식 수요. 테이블 주문과 정산을 한 번에.",
      },
      {
        biz: "베이커리 · 디저트",
        gear: "포스기 · 키오스크",
        why: "카페 밀집 상권. 주문·정산을 빠르게.",
      },
    ],
    demolition:
      "송도국제도시는 오피스·국제업무지구와 대단지 주거가 결합된 신도시 상권으로, 직장인·가족 단위 수요가 두터워 카페·음식점·외식 매장이 안정적으로 형성돼 있습니다. 신규 상가 입점과 점포 교체가 이어지면서 인테리어 시공과 원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["연수", "청학", "인천대입구"],
  },
  "구월동": {
    slug: "guwol",
    sido: "인천 남동구",
    context:
      "구월동은 인천시청과 로데오거리를 중심으로 형성된 인천 대표 번화가입니다. 쇼핑·외식·유흥 수요가 밀집해 음식점·카페·뷰티 매장이 촘촘하고, 점포 회전과 신규 개업이 활발한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "네일 · 미용실 등 뷰티"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "로데오 저녁 상권. 테이블 주문과 정산을 빠르게.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "구월동은 인천시청과 로데오거리를 중심으로 형성된 인천 대표 번화가로, 쇼핑·외식 수요가 밀집해 음식점·카페·호프·뷰티 매장이 촘촘하게 들어서 있습니다. 점포 회전과 신규 개업이 활발한 만큼, 입·퇴점에 따른 철거와 원상복구 수요가 꾸준히 발생하는 지역입니다.",
    nearby: ["인천터미널", "간석", "만수"],
  },
  "청라": {
    slug: "cheongna",
    sido: "인천 서구",
    context:
      "청라국제도시는 대단지 주거와 중심상업지구를 축으로 조성된 신도시 상권입니다. 젊은 가족 단위 거주 인구가 많아 카페·가족 단위 음식점·학원 수요가 두드러지고, 신규 상가 입점이 이어지는 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "배달 전문점",
        gear: "무선 단말기 · 포스기",
        why: "아파트 밀집·맞벌이 가구 배달 수요. 이동 결제와 주문 관리.",
      },
      {
        biz: "베이커리 · 디저트",
        gear: "포스기 · 키오스크",
        why: "가족 단위 디저트 수요. 주문·정산을 빠르게.",
      },
    ],
    demolition:
      "청라국제도시는 대단지 주거와 중심상업지구를 축으로 조성된 신도시 상권으로, 젊은 가족 단위 거주 인구가 많아 카페·가족 단위 음식점·학원이 밀집해 있습니다. 신규 상가 입점이 이어지면서 새 매장의 인테리어 시공과 기존 점포의 원상복구가 함께 발생하는 지역입니다.",
    nearby: ["가정", "검암", "검단"],
  },
  "검단": {
    slug: "geomdan",
    sido: "인천 서구",
    context:
      "검단신도시는 빠르게 입주가 진행 중인 인천 서북부의 대규모 신도시 상권입니다. 젊은 가족 단위 거주 인구가 많아 생활밀착형 음식점·카페·학원 수요가 늘고 있으며, 신규 상가 개업이 매우 활발한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "배달 전문점",
        gear: "무선 단말기 · 포스기",
        why: "신규 입주·맞벌이 가구 배달 수요. 이동 결제와 주문 관리.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "유선 단말기 · 포스기",
        why: "예약·시술 중심 매장. 카운터 고정 결제와 고객 관리.",
      },
    ],
    demolition:
      "검단신도시는 빠르게 입주가 진행 중인 인천 서북부의 대규모 신도시 상권으로, 젊은 가족 단위 거주 인구가 많아 생활밀착형 음식점·카페·학원이 늘고 있습니다. 입주 초기 신도시 특성상 신규 인테리어 시공 수요가 크고, 점포 교체에 따른 철거·원상복구도 함께 발생하는 지역입니다.",
    nearby: ["청라", "검암", "김포한강"],
  },
  "영종도": {
    slug: "yeongjong",
    sido: "인천 중구",
    context:
      "영종도는 인천국제공항과 영종하늘도시를 배경으로 성장한 지역 상권입니다. 신도시 주거 수요와 공항·관광 배후 수요가 더해져 음식점·카페·생활밀착형 매장이 늘고 있으며, 신규 상가 개업이 활발한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "배달 전문점",
        gear: "무선 단말기 · 포스기",
        why: "하늘도시 아파트 배달 수요. 이동 결제와 주문 관리.",
      },
      {
        biz: "베이커리 · 디저트",
        gear: "포스기 · 키오스크",
        why: "가족 단위·관광 수요. 주문·정산을 빠르게.",
      },
    ],
    demolition:
      "영종도는 인천국제공항과 영종하늘도시를 배경으로 성장한 지역 상권으로, 신도시 주거 수요와 공항·관광 배후 수요가 더해져 음식점·카페·생활밀착형 매장이 늘고 있습니다. 신규 상가 개업이 활발한 만큼 새 매장의 인테리어 시공과 기존 점포의 원상복구가 함께 발생하는 지역입니다.",
    nearby: ["운서", "공항신도시", "청라"],
  },
  "인천논현": {
    slug: "nonhyeon-ic",
    sido: "인천 남동구",
    context:
      "인천 논현지구는 소래포구와 에코메트로 단지를 중심으로 형성된 주거 밀집형 상권입니다. 젊은 가족 단위 거주 인구가 많아 생활밀착형 음식점·카페·학원 수요가 꾸준하고, 소래포구 관광 배후 수요도 더해지는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "배달 전문점",
        gear: "무선 단말기 · 포스기",
        why: "아파트 밀집·맞벌이 가구 배달 수요. 이동 결제와 주문 관리.",
      },
      {
        biz: "수산물 · 횟집",
        gear: "포스기 · 무선 단말기",
        why: "소래포구 인근 수요. 자리에서 빠른 주문·결제.",
      },
    ],
    demolition:
      "인천 논현지구는 소래포구와 에코메트로 단지를 중심으로 형성된 주거 밀집형 상권으로, 젊은 가족 단위 거주 인구가 많아 생활밀착형 음식점·카페·학원 수요가 꾸준합니다. 소래포구 관광 배후 수요와 함께 신규 상가 입점과 점포 교체가 이어져, 인테리어 시공과 원상복구 수요가 발생하는 지역입니다.",
    nearby: ["소래", "논현", "서창"],
  },
};

// ===== 부산 지역 데이터 (8곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 부산 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(부산)도 함께 수정하세요.

const REGIONS_BUSAN = {
  "서면": {
    slug: "seomyeon",
    sido: "부산 부산진구",
    context:
      "서면은 부산 최대의 도심 상권으로, 롯데백화점·서면 메디컬스트리트와 먹자골목·전포카페거리가 맞물려 유동인구가 끊이지 않는 지역입니다. 음식점·호프·뷰티·소형 매장이 밀집해 신규 개업과 점포 교체가 잦고, 카드단말기·포스 설치 수요가 부산에서 가장 높은 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 무선 단말기",
        why: "서면 먹자골목 야간 상권. 테이블 회전과 빠른 결제가 핵심.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "카드단말기 · 포스기",
        why: "메디컬·뷰티 거리 밀집. 예약·정산 관리와 간편 결제.",
      },
    ],
    demolition:
      "서면은 롯데백화점·서면 메디컬스트리트와 먹자골목·전포카페거리가 맞물린 부산 최대의 도심 상권으로, 유동인구가 끊이지 않는 지역입니다. 음식점·호프·뷰티·소형 매장이 밀집해 신규 개업과 점포 교체가 잦은 만큼, 인테리어 철거와 폐업·원상복구 수요가 부산에서 가장 활발하게 발생하는 상권입니다.",
    nearby: ["전포", "부산진구청", "범내골"],
  },
  "해운대": {
    slug: "haeundae",
    sido: "부산 해운대구",
    context:
      "해운대는 해변 관광과 마린시티·달맞이길 배후 수요가 어우러진 부산 대표 상권입니다. 해수욕장 일대 음식점·카페·횟집과 호텔 배후 상권이 활발하고, 성수기·비수기 회전이 뚜렷해 결제장비와 주문 관리 수요가 큰 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "횟집 · 해산물",
        gear: "포스기 · 무선 단말기",
        why: "해변 인근 수산물 수요. 자리에서 바로 주문·결제.",
      },
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "해변 야간 관광 상권. 다인 테이블 주문과 정산을 한 번에.",
      },
    ],
    demolition:
      "해운대는 해수욕장 관광과 마린시티·달맞이길 배후 수요가 어우러진 부산 대표 상권으로, 해변 일대 음식점·카페·횟집과 호텔 배후 상권이 활발합니다. 성수기·비수기 회전이 뚜렷해 시즌에 따른 점포 교체가 잦아, 인테리어 철거와 원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["센텀시티", "마린시티", "송정"],
  },
  "남포동": {
    slug: "nampo",
    sido: "부산 중구",
    context:
      "남포동은 자갈치시장·국제시장·BIFF광장을 끼고 형성된 부산의 전통 도심 상권입니다. 노포 음식점과 분식·먹거리 점포가 밀집하고 관광 유동인구가 많아, 오래된 점포의 단말기 교체와 신규 개업 설치 수요가 공존하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "전통시장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "자갈치·국제시장 노포. 간편 설치와 안정적인 결제.",
      },
      {
        biz: "디저트 · 노점형 매장",
        gear: "무선 단말기 · 카드단말기",
        why: "BIFF광장 먹거리 수요. 좁은 공간·이동 결제에 적합.",
      },
    ],
    demolition:
      "남포동은 자갈치시장·국제시장·BIFF광장을 끼고 형성된 부산의 전통 도심 상권으로, 노포 음식점과 분식·먹거리 점포가 밀집하고 관광 유동인구가 많은 지역입니다. 오래된 상가가 많은 구도심 특성상 노후 점포 리모델링과 인테리어 철거·원상복구 수요가 꾸준히 이어지는 상권입니다.",
    nearby: ["자갈치", "광복로", "부산역"],
  },
  "광안리": {
    slug: "gwangalli",
    sido: "부산 수영구",
    context:
      "광안리는 광안대교 야경을 배경으로 한 해변 카페·호프 상권으로, 저녁부터 밤까지 유동인구가 몰리는 야간 중심 상권입니다. 감성 카페와 요리주점·바가 밀집해 신규 개업이 활발하고, 테이블오더·포스 등 주문 관리 장비 수요가 꾸준한 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "광안리 해변 야간 상권. 다인 테이블 주문·정산이 잦음.",
      },
      {
        biz: "오션뷰 카페 · 바",
        gear: "포스기 · 카드단말기",
        why: "해변 감성 매장 밀집. 회전 관리와 간편 결제.",
      },
    ],
    demolition:
      "광안리는 광안대교 야경을 배경으로 한 해변 카페·호프 상권으로, 저녁부터 밤까지 유동인구가 몰리는 야간 중심 지역입니다. 감성 카페와 요리주점·바가 콘셉트를 바꿔가며 빠르게 교체되는 만큼, 인테리어 철거와 원상복구 수요가 잦은 상권입니다.",
    nearby: ["수영", "민락", "남천동"],
  },
  "전포": {
    slug: "jeonpo",
    sido: "부산 부산진구",
    context:
      "전포카페거리는 공구상가가 카페·디저트·소품숍 거리로 탈바꿈한 부산의 대표 감성 상권입니다. 개성 있는 소형 매장과 카페가 밀집해 신규 창업이 활발하고, 1인·소규모 매장에 맞는 간편 결제장비 수요가 높은 지역입니다.",
    emphasis: ["카페", "1인 · 팝업 매장", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "디저트 · 베이커리",
        gear: "포스기 · 카드단말기",
        why: "전포카페거리 디저트 수요. 메뉴 관리와 간편 결제.",
      },
      {
        biz: "소품 · 편집숍",
        gear: "포스기 · 카드단말기",
        why: "감성 소형 매장 밀집. 재고·판매 관리와 결제를 한 번에.",
      },
    ],
    demolition:
      "전포카페거리는 공구상가가 카페·디저트·소품숍 거리로 탈바꿈한 부산의 대표 감성 상권으로, 개성 있는 소형 매장과 카페가 밀집해 있습니다. 콘셉트 매장의 창업과 교체가 활발한 만큼, 소규모 인테리어 철거와 원상복구 수요가 꾸준한 지역입니다.",
    nearby: ["서면", "부산진시장", "범전동"],
  },
  "부산대": {
    slug: "pnu",
    sido: "부산 금정구",
    context:
      "부산대 앞은 대학가 특유의 분식·저가 음식점과 카페·소형 매장이 밀집한 상권입니다. 학생·청년 유동인구가 많아 객단가는 낮지만 회전이 빠르고, 신규 개업과 업종 교체가 활발해 간편 결제장비와 키오스크 수요가 높은 지역입니다.",
    emphasis: ["분식 · 패스트푸드", "카페", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "저가 음식 · 분식 프랜차이즈",
        gear: "키오스크 · 포스기",
        why: "대학가 빠른 회전. 무인 주문으로 인건비 절감.",
      },
      {
        biz: "스터디카페 · 무인 매장",
        gear: "키오스크 · 카드단말기",
        why: "청년 수요 무인 운영. 입실·결제 자동화.",
      },
    ],
    demolition:
      "부산대 앞은 금정구 장전동을 중심으로 분식·저가 음식점과 카페·소형 매장이 밀집한 대학가 상권으로, 학생·청년 유동인구가 많은 지역입니다. 회전이 빠르고 업종 교체가 활발한 대학가 특성상, 점포 리모델링과 폐업·원상복구 수요가 꾸준히 이어지는 상권입니다.",
    nearby: ["장전", "구서동", "온천장"],
  },
  "부산역": {
    slug: "busan-station",
    sido: "부산 동구",
    context:
      "부산역 일대는 KTX 유동인구와 초량 먹자골목·차이나타운이 어우러진 상권으로, 북항재개발에 따라 신규 상가가 계속 공급되는 지역입니다. 음식점·노포와 숙박 배후 수요가 탄탄해, 신규 개업 설치와 노후 점포 단말기 교체 수요가 함께 발생합니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "숙박 · 게스트하우스",
        gear: "카드단말기 · 포스기",
        why: "역세권 숙박 배후 수요. 체크인·결제 관리에 적합.",
      },
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 무선 단말기",
        why: "초량 먹자골목 야간 상권. 테이블 회전과 빠른 결제.",
      },
    ],
    demolition:
      "부산역 일대는 KTX 유동인구와 초량 먹자골목·차이나타운이 어우러진 상권으로, 북항재개발에 따라 신규 상가가 계속 공급되는 지역입니다. 신규 상가 입점과 노후 상가 정비가 동시에 진행되면서, 인테리어 시공과 철거·원상복구 수요가 함께 발생하는 상권입니다.",
    nearby: ["초량", "남포동", "부산진역"],
  },
  "명지": {
    slug: "myeongji",
    sido: "부산 강서구",
    context:
      "명지국제신도시는 부산에서 가장 빠르게 성장하는 신도시 상권으로, 신축 상가 입점이 활발하고 젊은 가족 단위 거주 인구가 밀집한 지역입니다. 음식점·카페·학원 등 생활밀착형 신규 개업이 이어져, 단말기·포스 첫 설치 수요가 특히 큰 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "브런치 · 패밀리 레스토랑",
        gear: "포스기 · 테이블오더",
        why: "신도시 가족 단위 수요. 식사 주문·정산을 한 번에.",
      },
      {
        biz: "키즈카페 · 교육 매장",
        gear: "카드단말기 · 포스기",
        why: "젊은 가족 밀집. 정기 결제·정산 관리에 적합.",
      },
    ],
    demolition:
      "명지국제신도시는 부산에서 가장 빠르게 성장하는 신도시 상권으로, 신축 상가 입점이 활발하고 젊은 가족 단위 거주 인구가 밀집한 지역입니다. 음식점·카페·학원 등 생활밀착형 개업이 이어지면서, 새 매장의 인테리어 시공과 기존 점포의 원상복구가 함께 발생하는 지역입니다.",
    nearby: ["명지오션시티", "녹산", "신호"],
  },
};

// ===== 대구 지역 데이터 (8곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 대구 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(대구)도 함께 수정하세요.

const REGIONS_DAEGU = {
  "동성로": {
    slug: "dongseongno",
    sido: "대구 중구",
    context:
      "동성로는 대구 최대의 도심 번화가로, 패션 거리·먹자골목·유흥 상권이 한데 모여 유동인구가 끊이지 않는 지역입니다. 음식점·호프·뷰티·소형 매장이 밀집해 신규 개업과 점포 교체가 잦고, 카드단말기·포스 설치 수요가 대구에서 가장 높은 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 무선 단말기",
        why: "동성로 먹자골목 야간 상권. 테이블 회전과 빠른 결제가 핵심.",
      },
      {
        biz: "패션 · 편집숍",
        gear: "포스기 · 카드단말기",
        why: "패션 거리 밀집. 재고·판매 관리와 간편 결제.",
      },
    ],
    demolition:
      "동성로는 패션 거리·먹자골목과 번화가가 한데 모인 대구 최대의 도심 상권으로, 유동인구가 끊이지 않는 지역입니다. 음식점·호프·요리주점·뷰티·소형 매장이 밀집해 신규 개업과 점포 교체가 잦은 만큼, 인테리어 철거와 폐업·원상복구 수요가 대구에서 가장 활발하게 발생하는 상권입니다.",
    nearby: ["대구역", "반월당", "삼덕동"],
  },
  "수성못": {
    slug: "suseong-lake",
    sido: "대구 수성구",
    context:
      "수성못은 호수를 따라 카페·레스토랑·요리주점이 늘어선 대구의 대표 야간 감성 상권입니다. 저녁부터 밤까지 유동인구가 몰리고 분위기 있는 매장이 밀집해, 테이블오더·포스 등 주문 관리 장비 수요가 꾸준한 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "수성못 야간 상권. 다인 테이블 주문·정산이 잦음.",
      },
      {
        biz: "레이크뷰 카페 · 바",
        gear: "포스기 · 카드단말기",
        why: "호수 전망 감성 매장 밀집. 회전 관리와 간편 결제.",
      },
    ],
    demolition:
      "수성못은 호수를 따라 카페·레스토랑·요리주점이 늘어선 대구의 대표 야간 감성 상권으로, 저녁부터 밤까지 유동인구가 몰리는 지역입니다. 분위기 있는 매장이 콘셉트를 바꿔가며 빠르게 교체되는 특성상, 인테리어 철거와 원상복구 수요가 잦은 상권입니다.",
    nearby: ["들안길", "범어동", "황금동"],
  },
  "들안길": {
    slug: "deuran",
    sido: "대구 수성구",
    context:
      "들안길은 대구를 대표하는 먹자거리로, 고깃집·한정식·대형 음식점이 줄지어 들어선 외식 특화 상권입니다. 가족 단위·회식 수요가 많아 객단가가 높고, 다인 테이블 운영에 맞는 포스·주문 관리 장비 수요가 큰 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "한정식 · 대형 음식점",
        gear: "포스기 · 테이블오더",
        why: "들안길 회식 수요. 다인 테이블 주문·정산을 한 번에.",
      },
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 무선 단말기",
        why: "외식거리 야간 수요. 테이블 회전과 빠른 결제.",
      },
    ],
    demolition:
      "들안길은 고깃집·한정식·대형 음식점이 줄지어 들어선 대구를 대표하는 외식 특화 먹자거리로, 가족 단위·회식 수요가 많은 지역입니다. 규모가 큰 외식 매장의 업종 교체와 리모델링이 이어지는 만큼, 주방·홀 철거와 원상복구 수요가 꾸준히 발생하는 상권입니다.",
    nearby: ["수성못", "상동", "두산동"],
  },
  "칠곡": {
    slug: "chilgok",
    sido: "대구 북구",
    context:
      "칠곡지구는 대규모 아파트 단지를 배후로 둔 대구 북부의 신흥 주거상권입니다. 음식점·카페·학원 등 생활밀착형 매장의 신규 개업이 활발해, 단말기·포스 첫 설치 수요가 특히 큰 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "배달 · 포장 전문점",
        gear: "포스기 · 카드단말기",
        why: "주거단지 배달 수요. 주문 통합 관리와 간편 결제.",
      },
      {
        biz: "키즈카페 · 교육 매장",
        gear: "카드단말기 · 포스기",
        why: "가족 단위 거주 밀집. 정기 결제·정산 관리에 적합.",
      },
    ],
    demolition:
      "칠곡지구는 대규모 아파트 단지를 배후로 둔 대구 북부의 신흥 주거상권으로, 생활밀착형 음식점·카페·학원이 밀집한 지역입니다. 가족 단위 소비가 탄탄한 주거상권 특성상 점포 교체가 꾸준히 이어져, 인테리어 시공과 철거·원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["태전동", "구암동", "동천동"],
  },
  "경북대": {
    slug: "knu",
    sido: "대구 북구",
    context:
      "경북대 앞은 대학가 특유의 분식·저가 음식점과 카페·소형 매장이 밀집한 상권입니다. 학생·청년 유동인구가 많아 객단가는 낮지만 회전이 빠르고, 신규 개업과 업종 교체가 활발해 간편 결제장비와 키오스크 수요가 높은 지역입니다.",
    emphasis: ["분식 · 패스트푸드", "카페", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "저가 음식 · 분식 프랜차이즈",
        gear: "키오스크 · 포스기",
        why: "대학가 빠른 회전. 무인 주문으로 인건비 절감.",
      },
      {
        biz: "스터디카페 · 무인 매장",
        gear: "키오스크 · 카드단말기",
        why: "청년 수요 무인 운영. 입실·결제 자동화.",
      },
    ],
    demolition:
      "경북대 앞은 북구 산격동을 중심으로 분식·저가 음식점과 카페·소형 매장이 밀집한 대학가 상권으로, 학생·청년 유동인구가 많은 지역입니다. 회전이 빠르고 업종 교체가 활발한 대학가 특성상, 점포 리모델링과 폐업·원상복구 수요가 꾸준히 이어지는 상권입니다.",
    nearby: ["복현동", "산격동", "대현동"],
  },
  "동대구역": {
    slug: "dongdaegu",
    sido: "대구 동구",
    context:
      "동대구역 일대는 KTX·복합환승센터와 신세계백화점이 어우러진 대구 동부의 핵심 역세권입니다. 유동인구가 많고 주변 신규 상가가 이어져, 신규 개업 설치와 노후 점포 단말기 교체 수요가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "숙박 · 게스트하우스",
        gear: "카드단말기 · 포스기",
        why: "역세권 숙박 배후 수요. 체크인·결제 관리에 적합.",
      },
      {
        biz: "테이크아웃 · 간편식",
        gear: "키오스크 · 무선 단말기",
        why: "환승 유동인구 대상. 빠른 무인 주문·결제.",
      },
    ],
    demolition:
      "동대구역 일대는 KTX·복합환승센터와 신세계백화점이 어우러진 대구 동부의 핵심 역세권으로, 유동인구가 많고 주변 신규 상가와 오피스가 이어지는 지역입니다. 상가 점포 교체와 함께 업무시설 이전에 따른 사무실 원상복구 수요도 더해져, 인테리어 철거와 원상복구 수요가 꾸준히 발생하는 상권입니다.",
    nearby: ["신천동", "효목동", "이시아폴리스"],
  },
  "앞산": {
    slug: "apsan",
    sido: "대구 남구",
    context:
      "앞산카페거리는 앞산 자락을 배경으로 감성 카페·디저트·소품숍이 모인 대구의 대표 카페 상권입니다. 개성 있는 소형 매장이 밀집해 신규 창업이 활발하고, 1인·소규모 매장에 맞는 간편 결제장비 수요가 높은 지역입니다.",
    emphasis: ["카페", "1인 · 팝업 매장", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "디저트 · 베이커리",
        gear: "포스기 · 카드단말기",
        why: "앞산카페거리 디저트 수요. 메뉴 관리와 간편 결제.",
      },
      {
        biz: "브런치 · 단독 카페",
        gear: "포스기 · 카드단말기",
        why: "감성 카페 밀집. 회전 관리와 간편 결제를 한 번에.",
      },
    ],
    demolition:
      "앞산카페거리는 앞산 자락을 배경으로 감성 카페·디저트·소품숍이 모인 대구의 대표 카페 상권으로, 개성 있는 소형 매장이 밀집해 있습니다. 콘셉트 매장의 창업과 교체가 활발한 만큼, 소규모 인테리어 철거와 원상복구 수요가 꾸준한 지역입니다.",
    nearby: ["대명동", "봉덕동", "안지랑"],
  },
  "율하지구": {
    slug: "yulha",
    sido: "대구 동구",
    context:
      "율하지구는 율하 카페거리와 대형 유통시설을 배후로 둔 대구 동부의 신흥 주거상권입니다. 젊은 가족 단위 거주 인구가 밀집해 음식점·카페·학원 등 생활밀착형 신규 개업이 이어져, 단말기·포스 첫 설치 수요가 큰 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "브런치 · 패밀리 레스토랑",
        gear: "포스기 · 테이블오더",
        why: "신도시 가족 단위 수요. 식사 주문·정산을 한 번에.",
      },
      {
        biz: "키즈카페 · 교육 매장",
        gear: "카드단말기 · 포스기",
        why: "젊은 가족 밀집. 정기 결제·정산 관리에 적합.",
      },
    ],
    demolition:
      "율하지구는 율하 카페거리와 대형 유통시설을 배후로 둔 대구 동부의 신흥 주거상권으로, 젊은 가족 단위 거주 인구가 밀집한 지역입니다. 음식점·카페·학원 등 생활밀착형 개업이 이어지면서, 새 매장의 인테리어 시공과 기존 점포의 원상복구가 함께 발생하는 지역입니다.",
    nearby: ["신서혁신도시", "안심", "각산"],
  },
};

// ===== 광주 지역 데이터 (8곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 광주 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(광주)도 함께 수정하세요.

const REGIONS_GWANGJU = {
  "충장로": {
    slug: "chungjangno",
    sido: "광주 동구",
    context:
      "충장로는 광주 최대의 전통 번화가로, 패션 거리·먹자골목·유흥 상권이 한데 모여 유동인구가 끊이지 않는 지역입니다. 음식점·호프·뷰티·소형 매장이 밀집해 신규 개업과 점포 교체가 잦고, 카드단말기·포스 설치 수요가 광주에서 가장 높은 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 무선 단말기",
        why: "충장로 먹자골목 야간 상권. 테이블 회전과 빠른 결제가 핵심.",
      },
      {
        biz: "패션 · 편집숍",
        gear: "포스기 · 카드단말기",
        why: "패션 거리 밀집. 재고·판매 관리와 간편 결제.",
      },
    ],
    demolition:
      "충장로는 패션 거리·먹자골목과 번화가가 한데 모인 광주 최대의 전통 번화가로, 유동인구가 끊이지 않는 지역입니다. 음식점·호프·요리주점·뷰티·소형 매장이 밀집해 신규 개업과 점포 교체가 잦은 만큼, 인테리어 철거와 폐업·원상복구 수요가 광주에서 가장 활발하게 발생하는 상권입니다.",
    nearby: ["금남로", "동명동", "예술의거리"],
  },
  "상무지구": {
    slug: "sangmu",
    sido: "광주 서구",
    context:
      "상무지구는 오피스·관공서가 밀집한 광주 서부의 중심 업무지구로, 직장인 회식 수요와 야간 유흥 상권이 함께 발달한 지역입니다. 음식점·요리주점·바가 밀집해 점포 회전이 활발하고, 포스·주문 관리 장비 수요가 큰 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "상무지구 회식·야간 수요. 다인 테이블 주문·정산이 잦음.",
      },
      {
        biz: "오피스 상권 음식점",
        gear: "포스기 · 무선 단말기",
        why: "직장인 점심 회전. 빠른 주문·결제 처리.",
      },
    ],
    demolition:
      "상무지구는 오피스·관공서가 밀집한 광주 서부의 중심 업무지구로, 직장인 회식 수요와 함께 음식점·요리주점·바가 발달한 지역입니다. 외식 점포의 잦은 교체와 함께 업무시설 이전·폐업에 따른 사무실 원상복구 수요가 뚜렷해, 상가와 사무실 양쪽의 인테리어 철거·원상복구가 함께 발생하는 상권입니다.",
    nearby: ["치평동", "화정동", "농성동"],
  },
  "첨단지구": {
    slug: "cheomdan",
    sido: "광주 광산구",
    context:
      "첨단지구는 첨단과학산업단지를 배후로 둔 광주 북부의 신흥 주거상권입니다. 연구·산단 근로자와 아파트 단지 거주 인구가 어우러져, 음식점·카페·학원 등 생활밀착형 매장의 신규 개업이 활발한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "배달 · 포장 전문점",
        gear: "포스기 · 카드단말기",
        why: "산단·주거 배달 수요. 주문 통합 관리와 간편 결제.",
      },
      {
        biz: "키즈카페 · 교육 매장",
        gear: "카드단말기 · 포스기",
        why: "가족 단위 거주 밀집. 정기 결제·정산 관리에 적합.",
      },
    ],
    demolition:
      "첨단지구는 첨단과학산업단지를 배후로 둔 광주 북부의 신흥 주거상권으로, 연구·산단 근로자와 아파트 단지 거주 인구가 어우러진 지역입니다. 생활밀착형 음식점·카페·학원의 개업과 점포 교체가 이어지면서, 인테리어 시공과 철거·원상복구 수요가 함께 발생하는 상권입니다.",
    nearby: ["수완지구", "월계동", "쌍암동"],
  },
  "수완지구": {
    slug: "suwan",
    sido: "광주 광산구",
    context:
      "수완지구는 대규모 택지개발로 조성된 광주 최대급 신도시 상권으로, 젊은 가족 단위 거주 인구가 밀집한 지역입니다. 음식점·카페·학원 등 생활밀착형 신규 개업이 이어져, 단말기·포스 첫 설치 수요가 특히 큰 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "브런치 · 패밀리 레스토랑",
        gear: "포스기 · 테이블오더",
        why: "신도시 가족 단위 수요. 식사 주문·정산을 한 번에.",
      },
      {
        biz: "디저트 · 베이커리",
        gear: "포스기 · 카드단말기",
        why: "신도시 카페 수요. 메뉴 관리와 간편 결제.",
      },
    ],
    demolition:
      "수완지구는 대규모 택지개발로 조성된 광주 최대급 신도시 상권으로, 젊은 가족 단위 거주 인구가 밀집한 지역입니다. 음식점·카페·학원 등 생활밀착형 개업이 이어지면서, 새 매장의 인테리어 시공과 기존 점포의 원상복구가 함께 발생하는 지역입니다.",
    nearby: ["첨단지구", "신가동", "운남동"],
  },
  "전남대": {
    slug: "jnu",
    sido: "광주 북구",
    context:
      "전남대 앞은 대학가 특유의 분식·저가 음식점과 카페·소형 매장이 밀집한 상권입니다. 학생·청년 유동인구가 많아 객단가는 낮지만 회전이 빠르고, 신규 개업과 업종 교체가 활발해 간편 결제장비와 키오스크 수요가 높은 지역입니다.",
    emphasis: ["분식 · 패스트푸드", "카페", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "저가 음식 · 분식 프랜차이즈",
        gear: "키오스크 · 포스기",
        why: "대학가 빠른 회전. 무인 주문으로 인건비 절감.",
      },
      {
        biz: "스터디카페 · 무인 매장",
        gear: "키오스크 · 카드단말기",
        why: "청년 수요 무인 운영. 입실·결제 자동화.",
      },
    ],
    demolition:
      "전남대 앞은 북구 용봉동을 중심으로 분식·저가 음식점과 카페·소형 매장이 밀집한 대학가 상권으로, 학생·청년 유동인구가 많은 지역입니다. 회전이 빠르고 업종 교체가 활발한 대학가 특성상, 점포 리모델링과 폐업·원상복구 수요가 꾸준히 이어지는 상권입니다.",
    nearby: ["용봉동", "신안동", "중흥동"],
  },
  "봉선동": {
    slug: "bongseon",
    sido: "광주 남구",
    context:
      "봉선동은 '광주의 대치동'으로 불리는 학원가이자 고급 주거상권으로, 학원·카페·음식점이 밀집한 지역입니다. 교육 수요를 중심으로 가족 단위 소비가 탄탄해, 학원·소형 매장과 카페의 결제·정산 장비 수요가 큰 상권입니다.",
    emphasis: ["학원 · 소형 매장", "카페", "음식점 · 고깃집"],
    extraRows: [
      {
        biz: "스터디카페 · 독서실",
        gear: "키오스크 · 카드단말기",
        why: "학원가 무인 운영. 입실·정기 결제 자동화.",
      },
      {
        biz: "디저트 · 베이커리",
        gear: "포스기 · 카드단말기",
        why: "학원가 가족 수요. 메뉴 관리와 간편 결제.",
      },
    ],
    demolition:
      "봉선동은 '광주의 대치동'으로 불리는 학원가이자 고급 주거상권으로, 학원·카페·음식점이 밀집한 지역입니다. 교육 수요를 중심으로 가족 단위 소비가 탄탄해 학원·점포 교체가 꾸준히 이어지는 만큼, 인테리어 시공과 철거·원상복구 수요가 함께 발생하는 상권입니다.",
    nearby: ["주월동", "진월동", "방림동"],
  },
  "동명동": {
    slug: "dongmyeong",
    sido: "광주 동구",
    context:
      "동명동은 옛 주택가가 감성 카페·디저트·소품숍 거리로 탈바꿈한 광주의 대표 카페 상권으로, '광주의 연남동'으로 불립니다. 개성 있는 소형 매장이 밀집해 신규 창업이 활발하고, 1인·소규모 매장에 맞는 간편 결제장비 수요가 높은 지역입니다.",
    emphasis: ["카페", "1인 · 팝업 매장", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "디저트 · 베이커리",
        gear: "포스기 · 카드단말기",
        why: "동명동 카페거리 디저트 수요. 메뉴 관리와 간편 결제.",
      },
      {
        biz: "소품 · 편집숍",
        gear: "포스기 · 카드단말기",
        why: "감성 소형 매장 밀집. 재고·판매 관리와 결제를 한 번에.",
      },
    ],
    demolition:
      "동명동은 옛 주택가가 감성 카페·디저트·소품숍 거리로 탈바꿈한 광주의 대표 카페 상권으로, '광주의 연남동'으로 불립니다. 개성 있는 소형 매장의 창업과 콘셉트 교체가 활발한 만큼, 소규모 인테리어 철거와 원상복구 수요가 꾸준한 지역입니다.",
    nearby: ["충장로", "계림동", "지산동"],
  },
  "하남지구": {
    slug: "hanam-gj",
    sido: "광주 광산구",
    context:
      "하남지구는 하남산업단지를 배후로 두고 대규모 아파트 단지가 들어선 광주 서부의 신흥 주거상권입니다. 산단 근로자와 거주 인구가 어우러져 음식점·카페·생활밀착 매장의 신규 개업과 점포 회전이 활발한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "배달 · 포장 전문점",
        gear: "포스기 · 카드단말기",
        why: "산단·주거 배달 수요. 주문 통합 관리와 간편 결제.",
      },
      {
        biz: "기사식당 · 백반",
        gear: "포스기 · 무선 단말기",
        why: "산단 근로자 식사 수요. 빠른 주문·결제 처리.",
      },
    ],
    demolition:
      "하남지구는 하남산업단지를 배후로 두고 대규모 아파트 단지가 들어선 광주 서부의 신흥 주거상권으로, 산단 근로자와 거주 인구가 어우러진 지역입니다. 음식점·카페·생활밀착 매장의 개업과 점포 회전이 활발한 만큼, 인테리어 시공과 철거·원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["수완지구", "장덕동", "흑석동"],
  },
};

// ===== 대전 지역 데이터 (8곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 대전 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(대전)도 함께 수정하세요.

const REGIONS_DAEJEON = {
  "둔산동": {
    slug: "dunsan",
    sido: "대전 서구",
    context:
      "둔산동은 시청·법원·오피스가 밀집한 대전 최대의 중심 상권으로, 직장인 회식 수요와 음식·유흥 상권이 함께 발달한 지역입니다. 음식점·호프·뷰티·소형 매장이 밀집해 점포 회전이 빠르고, 카드단말기·포스 설치 수요가 대전에서 가장 높은 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 무선 단말기",
        why: "둔산동 회식·야간 상권. 테이블 회전과 빠른 결제가 핵심.",
      },
      {
        biz: "오피스 상권 음식점",
        gear: "포스기 · 무선 단말기",
        why: "직장인 점심 회전. 빠른 주문·결제 처리.",
      },
    ],
    demolition:
      "둔산동은 시청·법원·정부대전청사와 오피스가 밀집한 대전 최대의 중심 상권으로, 직장인 회식 수요와 함께 음식점·호프·요리주점이 발달한 지역입니다. 업종 교체가 잦은 외식 점포의 인테리어 철거뿐 아니라, 오피스가 밀집한 만큼 사무실 이전·폐업에 따른 원상복구 수요도 꾸준한 상권으로, 대전에서 철거·원상복구 문의가 가장 활발한 지역입니다.",
    nearby: ["갈마동", "탄방동", "만년동"],
  },
  "은행동": {
    slug: "eunhaeng",
    sido: "대전 중구",
    context:
      "은행동은 으능정이 문화의거리를 중심으로 형성된 대전의 전통 번화가로, 패션·먹자골목·소형 매장이 밀집한 지역입니다. 청년·가족 유동인구가 많고 점포 교체가 잦아, 신규 개업 설치와 노후 점포 단말기 교체 수요가 함께 발생하는 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 무선 단말기",
        why: "으능정이 야간 상권. 테이블 회전과 빠른 결제.",
      },
      {
        biz: "패션 · 편집숍",
        gear: "포스기 · 카드단말기",
        why: "번화가 패션 매장 밀집. 재고·판매 관리와 간편 결제.",
      },
    ],
    demolition:
      "은행동은 으능정이 문화의거리를 중심으로 형성된 대전의 전통 번화가로, 패션·먹자골목·소형 매장이 밀집한 지역입니다. 청년·가족 유동인구가 많고 점포 교체가 잦은 데다 오래된 상가가 많아, 노후 점포 리모델링과 인테리어 철거·원상복구 수요가 꾸준히 이어지는 상권입니다.",
    nearby: ["대흥동", "선화동", "중앙로"],
  },
  "봉명동": {
    slug: "bongmyeong",
    sido: "대전 유성구",
    context:
      "봉명동은 유성 일대를 대표하는 유흥·먹자 상권으로, 호프·요리주점·음식점이 밀집해 저녁부터 밤까지 유동인구가 몰리는 야간 중심 지역입니다. 다인 테이블 운영과 빠른 정산이 중요해, 포스·테이블오더 등 주문 관리 장비 수요가 큰 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "봉명동 야간 상권. 다인 테이블 주문·정산이 잦음.",
      },
      {
        biz: "노래·유흥 부대시설",
        gear: "포스기 · 카드단말기",
        why: "야간 상권 부대업종. 심야 결제·정산 관리.",
      },
    ],
    demolition:
      "봉명동은 유성 일대를 대표하는 먹자 상권으로, 호프·요리주점·음식점이 밀집해 저녁부터 밤까지 유동인구가 몰리는 야간 중심 지역입니다. 콘셉트를 바꿔가며 점포가 빠르게 교체되는 특성상, 인테리어 철거와 원상복구 수요가 잦은 상권입니다.",
    nearby: ["궁동", "어은동", "구암동"],
  },
  "궁동": {
    slug: "gungdong",
    sido: "대전 유성구",
    context:
      "궁동은 충남대 앞 대학가로, 분식·저가 음식점과 카페·소형 매장이 밀집한 상권입니다. 학생·청년 유동인구가 많아 객단가는 낮지만 회전이 빠르고, 신규 개업과 업종 교체가 활발해 간편 결제장비와 키오스크 수요가 높은 지역입니다.",
    emphasis: ["분식 · 패스트푸드", "카페", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "저가 음식 · 분식 프랜차이즈",
        gear: "키오스크 · 포스기",
        why: "대학가 빠른 회전. 무인 주문으로 인건비 절감.",
      },
      {
        biz: "스터디카페 · 무인 매장",
        gear: "키오스크 · 카드단말기",
        why: "청년 수요 무인 운영. 입실·결제 자동화.",
      },
    ],
    demolition:
      "궁동은 충남대 앞을 중심으로 분식·저가 음식점과 카페·소형 매장이 밀집한 대학가 상권으로, 학생·청년 유동인구가 많은 지역입니다. 회전이 빠르고 업종 교체가 활발한 대학가 특성상, 점포 리모델링과 폐업·원상복구 수요가 꾸준히 이어지는 상권입니다.",
    nearby: ["봉명동", "어은동", "충남대"],
  },
  "도안신도시": {
    slug: "doan",
    sido: "대전 서구",
    context:
      "도안신도시는 대규모 택지개발로 조성된 대전 서남부의 신도시 상권으로, 젊은 가족 단위 거주 인구가 밀집한 지역입니다. 음식점·카페·학원 등 생활밀착형 신규 개업이 이어져, 단말기·포스 첫 설치 수요가 특히 큰 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "브런치 · 패밀리 레스토랑",
        gear: "포스기 · 테이블오더",
        why: "신도시 가족 단위 수요. 식사 주문·정산을 한 번에.",
      },
      {
        biz: "키즈카페 · 교육 매장",
        gear: "카드단말기 · 포스기",
        why: "젊은 가족 밀집. 정기 결제·정산 관리에 적합.",
      },
    ],
    demolition:
      "도안신도시는 대규모 택지개발로 조성된 대전 서남부의 신도시 상권으로, 젊은 가족 단위 거주 인구가 밀집한 지역입니다. 음식점·카페·학원 등 생활밀착형 개업이 이어지면서, 새 매장의 인테리어 시공과 기존 점포의 원상복구가 함께 발생하는 지역입니다.",
    nearby: ["관저동", "가수원동", "월평동"],
  },
  "관저동": {
    slug: "gwanjeo",
    sido: "대전 서구",
    context:
      "관저동은 대규모 아파트 단지를 배후로 둔 대전 서남부의 주거상권으로, 학원·음식점·카페가 밀집한 지역입니다. 가족 단위 생활 소비가 탄탄해, 학원·소형 매장과 생활밀착 매장의 결제·정산 장비 수요가 큰 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "스터디카페 · 독서실",
        gear: "키오스크 · 카드단말기",
        why: "주거단지 학원 수요. 입실·정기 결제 자동화.",
      },
      {
        biz: "배달 · 포장 전문점",
        gear: "포스기 · 카드단말기",
        why: "대단지 배달 수요. 주문 통합 관리와 간편 결제.",
      },
    ],
    demolition:
      "관저동은 대규모 아파트 단지를 배후로 둔 대전 서남부의 주거상권으로, 학원·음식점·카페가 밀집한 지역입니다. 가족 단위 생활 소비가 탄탄한 주거상권 특성상 점포 교체가 꾸준히 이어져, 인테리어 시공과 철거·원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["도안신도시", "가수원동", "원내동"],
  },
  "노은지구": {
    slug: "noeun",
    sido: "대전 유성구",
    context:
      "노은지구는 노은농수산물도매시장을 배후로 둔 대전 북서부의 신흥 주거상권으로, 대단지 아파트와 생활밀착 매장이 어우러진 지역입니다. 음식점·카페·소매 매장의 신규 개업과 점포 회전이 활발해, 단말기·포스 설치 수요가 꾸준한 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "청과·식자재 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "농수산시장 배후 수요. 간편 설치와 안정적인 결제.",
      },
      {
        biz: "배달 · 포장 전문점",
        gear: "포스기 · 카드단말기",
        why: "주거단지 배달 수요. 주문 통합 관리와 간편 결제.",
      },
    ],
    demolition:
      "노은지구는 노은농수산물도매시장을 배후로 둔 대전 북서부의 신흥 주거상권으로, 대단지 아파트와 생활밀착 매장이 어우러진 지역입니다. 음식점·카페·소매 매장의 개업과 점포 회전이 활발한 만큼, 인테리어 시공과 원상복구 수요가 함께 발생하는 상권입니다.",
    nearby: ["지족동", "반석동", "죽동"],
  },
  "테크노밸리": {
    slug: "technovalley",
    sido: "대전 유성구",
    context:
      "테크노밸리(관평동)는 대덕테크노밸리를 중심으로 IT·기업 입주와 아파트 단지가 함께 성장한 대전 북부의 신흥 상권입니다. 직장인 점심·회식 수요와 신도시형 주거 수요가 겹쳐, 음식점·카페·생활밀착 매장의 신규 개업과 점포 회전이 활발한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "오피스 상권 음식점",
        gear: "포스기 · 무선 단말기",
        why: "기업 입주 점심 회전. 빠른 주문·결제 처리.",
      },
      {
        biz: "브런치 · 패밀리 레스토랑",
        gear: "포스기 · 테이블오더",
        why: "신도시 가족 단위 수요. 식사 주문·정산을 한 번에.",
      },
    ],
    demolition:
      "테크노밸리(관평동)는 대덕테크노밸리를 중심으로 IT·기업 입주와 아파트 단지가 함께 성장한 대전 북부의 신흥 상권입니다. 직장인 수요를 낀 음식점·카페의 점포 교체와 함께, 기업·오피스 입주가 많은 지역 특성상 사무실 이전·원상복구 철거 수요가 뚜렷한 만큼, 상가와 사무실 양쪽의 인테리어 시공·원상복구가 함께 발생하는 지역입니다.",
    nearby: ["관평동", "송강동", "신성동"],
  },
};

// ===== 울산 지역 데이터 (8곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 울산 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(울산)도 함께 수정하세요.

const REGIONS_ULSAN = {
  "삼산동": {
    slug: "samsan",
    sido: "울산 남구",
    context:
      "삼산동은 롯데·현대백화점과 대형 상가가 모인 울산 최대의 중심 상권으로, 쇼핑·음식·유흥이 집약된 지역입니다. 음식점·카페·뷰티·소형 매장이 밀집해 점포 회전이 빠르고, 카드단말기·포스 설치 수요가 울산에서 가장 높은 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "패션 · 편집숍",
        gear: "포스기 · 카드단말기",
        why: "백화점·쇼핑 상권 밀집. 재고·판매 관리와 간편 결제.",
      },
      {
        biz: "네일 · 미용실 등 뷰티",
        gear: "카드단말기 · 포스기",
        why: "중심 상권 뷰티 수요. 예약·정산 관리와 간편 결제.",
      },
    ],
    demolition:
      "삼산동은 롯데·현대백화점과 대형 상가가 모인 울산 최대의 중심 상권으로, 쇼핑과 외식이 집약된 지역입니다. 음식점·카페·호프·뷰티·소형 매장이 밀집해 점포 회전이 빠른 만큼, 인테리어 철거와 폐업·원상복구 수요가 울산에서 가장 활발하게 발생하는 상권입니다.",
    nearby: ["달동", "신정동", "공업탑"],
  },
  "성남동": {
    slug: "seongnam",
    sido: "울산 중구",
    context:
      "성남동은 울산 원도심의 전통 번화가로, 패션 거리·먹자골목·소형 매장이 밀집한 지역입니다. 청년·가족 유동인구가 많고 점포 교체가 잦아, 신규 개업 설치와 노후 점포 단말기 교체 수요가 함께 발생하는 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 무선 단말기",
        why: "원도심 야간 상권. 테이블 회전과 빠른 결제.",
      },
      {
        biz: "패션 · 편집숍",
        gear: "포스기 · 카드단말기",
        why: "번화가 패션 매장 밀집. 재고·판매 관리와 간편 결제.",
      },
    ],
    demolition:
      "성남동은 패션 거리·먹자골목·소형 매장이 밀집한 울산 원도심의 전통 번화가로, 청년·가족 유동인구가 많은 지역입니다. 오래된 상가가 많은 원도심 특성상 노후 점포 리모델링과 인테리어 철거·원상복구 수요가 꾸준히 이어지는 상권입니다.",
    nearby: ["옥교동", "중앙동", "태화동"],
  },
  "무거동": {
    slug: "mugeo",
    sido: "울산 남구",
    context:
      "무거동은 울산대 앞 대학가로, 분식·저가 음식점과 카페·소형 매장이 밀집한 상권입니다. 학생·청년 유동인구가 많아 객단가는 낮지만 회전이 빠르고, 신규 개업과 업종 교체가 활발해 간편 결제장비와 키오스크 수요가 높은 지역입니다.",
    emphasis: ["분식 · 패스트푸드", "카페", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "저가 음식 · 분식 프랜차이즈",
        gear: "키오스크 · 포스기",
        why: "대학가 빠른 회전. 무인 주문으로 인건비 절감.",
      },
      {
        biz: "스터디카페 · 무인 매장",
        gear: "키오스크 · 카드단말기",
        why: "청년 수요 무인 운영. 입실·결제 자동화.",
      },
    ],
    demolition:
      "무거동은 울산대 앞을 중심으로 분식·저가 음식점과 카페·소형 매장이 밀집한 대학가 상권으로, 학생·청년 유동인구가 많은 지역입니다. 회전이 빠르고 업종 교체가 활발한 대학가 특성상, 점포 리모델링과 폐업·원상복구 수요가 꾸준히 이어지는 상권입니다.",
    nearby: ["옥동", "삼호동", "울산대"],
  },
  "달동": {
    slug: "dal-dong",
    sido: "울산 남구",
    context:
      "달동은 삼산동에 인접한 먹자·야간 상권으로, 호프·요리주점·음식점이 밀집해 저녁부터 밤까지 유동인구가 몰리는 지역입니다. 다인 테이블 운영과 빠른 정산이 중요해, 포스·테이블오더 등 주문 관리 장비 수요가 큰 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "달동 먹자·야간 상권. 다인 테이블 주문·정산이 잦음.",
      },
      {
        biz: "심야 영업 매장",
        gear: "포스기 · 카드단말기",
        why: "야간 상권 심야 수요. 마감·정산 관리에 적합.",
      },
    ],
    demolition:
      "달동은 삼산동에 인접한 먹자·야간 상권으로, 호프·요리주점·음식점이 밀집해 저녁부터 밤까지 유동인구가 몰리는 지역입니다. 콘셉트를 바꿔가며 점포가 빠르게 교체되는 특성상, 인테리어 철거와 원상복구 수요가 잦은 상권입니다.",
    nearby: ["삼산동", "신정동", "야음동"],
  },
  "전하동": {
    slug: "jeonha",
    sido: "울산 동구",
    context:
      "전하동은 현대중공업을 배후로 둔 울산 동구의 대표 상권으로, 조선소 근로자 대상 음식점·회식 수요가 탄탄한 산업도시형 지역입니다. 직장인 식사·회식 회전이 활발해, 포스·무선 단말기 등 빠른 주문·결제 장비 수요가 큰 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "기사식당 · 백반",
        gear: "포스기 · 무선 단말기",
        why: "조선소 근로자 식사 수요. 빠른 주문·결제 처리.",
      },
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "근로자 회식 수요. 다인 테이블 주문·정산을 한 번에.",
      },
    ],
    demolition:
      "전하동은 현대중공업을 배후로 둔 울산 동구의 대표 상권으로, 조선소 근로자 대상 음식점·회식 수요가 탄탄한 산업도시형 지역입니다. 조선업 경기 변동에 따라 점포 교체와 업종 전환이 이어지는 만큼, 인테리어 철거와 원상복구 수요가 꾸준히 발생하는 상권입니다.",
    nearby: ["일산동", "방어진", "남목"],
  },
  "옥동": {
    slug: "ok-dong",
    sido: "울산 남구",
    context:
      "옥동은 법조타운과 학원가가 어우러진 울산 남부의 주거상권으로, 카페·학원·음식점이 밀집한 지역입니다. 교육 수요와 가족 단위 소비가 탄탄해, 학원·소형 매장과 카페의 결제·정산 장비 수요가 큰 상권입니다.",
    emphasis: ["학원 · 소형 매장", "카페", "음식점 · 고깃집"],
    extraRows: [
      {
        biz: "스터디카페 · 독서실",
        gear: "키오스크 · 카드단말기",
        why: "학원가 무인 운영. 입실·정기 결제 자동화.",
      },
      {
        biz: "디저트 · 베이커리",
        gear: "포스기 · 카드단말기",
        why: "학원가 가족 수요. 메뉴 관리와 간편 결제.",
      },
    ],
    demolition:
      "옥동은 법조타운과 학원가가 어우러진 울산 남부의 주거상권으로, 카페·학원·음식점이 밀집한 지역입니다. 교육 수요와 가족 단위 소비가 탄탄해 학원·점포 교체가 꾸준히 이어지는 만큼, 인테리어 시공과 철거·원상복구 수요가 함께 발생하는 상권입니다.",
    nearby: ["무거동", "신정동", "야음동"],
  },
  "천상지구": {
    slug: "cheonsang",
    sido: "울산 울주군",
    context:
      "천상지구는 울주군 서남부에 조성된 신흥 주거 신도시 상권으로, 대단지 아파트와 젊은 가족 단위 거주 인구가 밀집한 지역입니다. 음식점·카페·학원 등 생활밀착형 신규 개업이 이어져, 단말기·포스 첫 설치 수요가 특히 큰 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "브런치 · 패밀리 레스토랑",
        gear: "포스기 · 테이블오더",
        why: "신도시 가족 단위 수요. 식사 주문·정산을 한 번에.",
      },
      {
        biz: "키즈카페 · 교육 매장",
        gear: "카드단말기 · 포스기",
        why: "젊은 가족 밀집. 정기 결제·정산 관리에 적합.",
      },
    ],
    demolition:
      "천상지구는 울주군 서남부에 조성된 신흥 주거 신도시 상권으로, 대단지 아파트와 젊은 가족 단위 거주 인구가 밀집한 지역입니다. 음식점·카페·학원 등 생활밀착형 개업이 이어지면서, 새 매장의 인테리어 시공과 기존 점포의 원상복구가 함께 발생하는 지역입니다.",
    nearby: ["범서", "굴화", "다운동"],
  },
  "송정지구": {
    slug: "songjeong-us",
    sido: "울산 북구",
    context:
      "송정지구는 울산 북구 동북부에 조성된 신흥 택지 신도시로, 아파트 입주가 활발해 신규 개업과 점포 회전이 빠른 지역입니다. 음식점·카페·생활밀착 매장이 계속 들어서며, 단말기·포스 첫 설치 수요가 큰 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "배달 · 포장 전문점",
        gear: "포스기 · 카드단말기",
        why: "신도시 배달 수요. 주문 통합 관리와 간편 결제.",
      },
      {
        biz: "브런치 · 패밀리 레스토랑",
        gear: "포스기 · 테이블오더",
        why: "신도시 가족 단위 수요. 식사 주문·정산을 한 번에.",
      },
    ],
    demolition:
      "송정지구는 울산 북구 동북부에 조성된 신흥 택지 신도시로, 아파트 입주가 활발해 신규 개업과 점포 회전이 빠른 지역입니다. 생활밀착형 음식점·카페 매장이 계속 들어서면서, 새 매장의 인테리어 시공과 기존 점포의 원상복구가 함께 발생하는 지역입니다.",
    nearby: ["호계", "매곡", "농소"],
  },
};

// ===== 세종 지역 데이터 (6곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 세종 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(세종)도 함께 수정하세요.

const REGIONS_SEJONG = {
  "나성동": {
    slug: "naseong",
    sido: "세종 2생활권",
    context:
      "나성동은 어반아트리움을 중심으로 음식점·카페·오피스가 밀집한 세종 최대의 중심 상권입니다. 행정중심복합도시의 핵심 생활권으로 유동인구가 많고 신규 상가 입점이 이어져, 카드단말기·포스 설치 수요가 세종에서 가장 높은 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 무선 단말기",
        why: "나성동 중심 상권 야간 수요. 테이블 회전과 빠른 결제.",
      },
      {
        biz: "오피스 상권 음식점",
        gear: "포스기 · 무선 단말기",
        why: "정부청사 직장인 점심 회전. 빠른 주문·결제 처리.",
      },
    ],
    demolition:
      "나성동은 어반아트리움을 중심으로 음식점·카페·오피스가 밀집한 세종 최대의 중심 상권으로, 행정중심복합도시의 핵심 생활권입니다. 신규 상가 입점과 점포 교체가 활발한 데다 오피스 이전 수요도 더해져, 상가 인테리어 철거와 사무실 원상복구가 함께 발생하는 지역입니다.",
    nearby: ["새롬동", "어진동", "다정동"],
  },
  "보람동": {
    slug: "boram",
    sido: "세종 3생활권",
    context:
      "보람동은 세종시청과 세종고속시외버스터미널을 배후로 둔 행정·교통 중심 생활권으로, 음식점·카페·생활밀착 매장이 밀집한 지역입니다. 행정 수요와 거주 인구가 어우러져 점포 회전이 꾸준해, 포스·결제 장비 수요가 큰 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "오피스 상권 음식점",
        gear: "포스기 · 무선 단말기",
        why: "시청·터미널 배후 점심 회전. 빠른 주문·결제 처리.",
      },
      {
        biz: "배달 · 포장 전문점",
        gear: "포스기 · 카드단말기",
        why: "생활권 배달 수요. 주문 통합 관리와 간편 결제.",
      },
    ],
    demolition:
      "보람동은 세종시청과 세종고속시외버스터미널을 배후로 둔 행정·교통 중심 생활권으로, 음식점·카페·생활밀착 매장이 밀집한 지역입니다. 행정 수요와 거주 인구가 어우러져 점포 교체가 꾸준히 이어지는 만큼, 인테리어 시공과 철거·원상복구 수요가 함께 발생하는 상권입니다.",
    nearby: ["대평동", "소담동", "반곡동"],
  },
  "도담동": {
    slug: "dodam",
    sido: "세종 1생활권",
    context:
      "도담동은 세종 초기 입주가 시작된 1생활권의 중심으로, 음식점·카페·학원이 일찍 자리 잡아 성숙한 생활상권을 이룬 지역입니다. 안정적인 거주 인구를 바탕으로 점포 교체와 신규 개업이 꾸준해, 단말기·포스 설치 수요가 탄탄한 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "디저트 · 베이커리",
        gear: "포스기 · 카드단말기",
        why: "성숙 생활권 카페 수요. 메뉴 관리와 간편 결제.",
      },
      {
        biz: "키즈카페 · 교육 매장",
        gear: "카드단말기 · 포스기",
        why: "가족 단위 거주 밀집. 정기 결제·정산 관리에 적합.",
      },
    ],
    demolition:
      "도담동은 세종 초기 입주가 시작된 1생활권의 중심으로, 음식점·카페·학원이 일찍 자리 잡아 성숙한 생활상권을 이룬 지역입니다. 안정적인 거주 인구를 바탕으로 점포 교체와 업종 전환이 꾸준한 만큼, 인테리어 철거와 원상복구 수요가 이어지는 상권입니다.",
    nearby: ["아름동", "종촌동", "어진동"],
  },
  "아름동": {
    slug: "areum",
    sido: "세종 1생활권",
    context:
      "아름동은 대단지 아파트를 배후로 둔 1생활권의 주거상권으로, 학원·카페·생활밀착 매장이 밀집한 지역입니다. 가족 단위 교육 수요가 탄탄해, 학원·소형 매장과 카페의 결제·정산 장비 수요가 큰 상권입니다.",
    emphasis: ["학원 · 소형 매장", "카페", "음식점 · 고깃집"],
    extraRows: [
      {
        biz: "스터디카페 · 독서실",
        gear: "키오스크 · 카드단말기",
        why: "주거단지 학원 수요. 입실·정기 결제 자동화.",
      },
      {
        biz: "키즈카페 · 교육 매장",
        gear: "카드단말기 · 포스기",
        why: "가족 단위 거주 밀집. 정기 결제·정산 관리에 적합.",
      },
    ],
    demolition:
      "아름동은 대단지 아파트를 배후로 둔 1생활권의 주거상권으로, 학원·카페·생활밀착 매장이 밀집한 지역입니다. 가족 단위 교육 수요가 탄탄해 학원·점포 교체가 꾸준히 이어지는 만큼, 인테리어 시공과 철거·원상복구 수요가 함께 발생하는 상권입니다.",
    nearby: ["도담동", "종촌동", "고운동"],
  },
  "새롬동": {
    slug: "saerom",
    sido: "세종 2생활권",
    context:
      "새롬동은 대단지 아파트와 근린상가가 어우러진 2생활권의 주거상권으로, 음식점·카페와 배달 수요가 활발한 지역입니다. 거주 인구가 많아 생활밀착 매장의 신규 개업과 점포 회전이 꾸준해, 단말기·포스 설치 수요가 큰 상권입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "배달 · 포장 전문점",
        gear: "포스기 · 카드단말기",
        why: "대단지 배달 수요. 주문 통합 관리와 간편 결제.",
      },
      {
        biz: "브런치 · 패밀리 레스토랑",
        gear: "포스기 · 테이블오더",
        why: "가족 단위 거주 수요. 식사 주문·정산을 한 번에.",
      },
    ],
    demolition:
      "새롬동은 대단지 아파트와 근린상가가 어우러진 2생활권의 주거상권으로, 음식점·카페와 배달 수요가 활발한 지역입니다. 거주 인구가 많아 생활밀착 매장의 개업과 점포 회전이 꾸준한 만큼, 인테리어 시공과 철거·원상복구 수요가 함께 발생하는 상권입니다.",
    nearby: ["나성동", "다정동", "한솔동"],
  },
  "조치원": {
    slug: "jochiwon",
    sido: "세종 조치원읍",
    context:
      "조치원은 옛 연기군의 중심지로, 재래시장과 전통 상권이 살아 있는 세종의 구도심입니다. 홍익대 세종캠퍼스 인근 대학 수요와 오래된 점포가 공존해, 신규 개업 설치와 노후 점포 단말기 교체 수요가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "전통시장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "조치원 재래시장 노포. 간편 설치와 안정적인 결제.",
      },
      {
        biz: "저가 음식 · 분식 프랜차이즈",
        gear: "키오스크 · 포스기",
        why: "대학 인근 빠른 회전. 무인 주문으로 인건비 절감.",
      },
    ],
    demolition:
      "조치원은 옛 연기군의 중심지로, 재래시장과 전통 상권이 살아 있는 세종의 구도심입니다. 홍익대 세종캠퍼스 인근 대학 수요와 오래된 점포가 공존하는 만큼, 노후 점포 리모델링과 인테리어 철거·원상복구 수요가 꾸준히 이어지는 지역입니다.",
    nearby: ["고운동", "종촌동", "전의"],
  },
};

// ===== 충북 지역 데이터 (10곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 충북 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(충북)도 함께 수정하세요.

const REGIONS_CHUNGBUK = {
  "성안길": {
    slug: "seongan",
    sido: "충북 청주시",
    context:
      "성안길은 청주 상당구의 대표 번화가이자 '청주 시내'로 통하는 구도심 핵심 상권입니다. SPA·패션 브랜드 가두점과 서문시장·먹자골목이 맞붙어 외식·소매·뷰티 업종이 밀집해 있고, 신도시 상권 성장 속에서도 유동인구가 두터운 전통 중심지입니다. 노포 점포 교체와 신규 브랜드 입점이 함께 일어나 업종별 단말기 수요가 꾸준한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "패션 · 뷰티 로드숍",
        gear: "포스기 · 카드단말기",
        why: "가두 패션 상권. 재고·매출 관리에 유리.",
      },
      {
        biz: "전통시장 · 먹자골 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "서문시장 노포. 간편 설치와 안정 결제.",
      },
    ],
    demolition:
      "성안길은 청주 상당구의 대표 번화가이자 '청주 시내'로 통하는 구도심 핵심 상권으로, 서문시장과 먹자골목을 낀 SPA·패션 가두점과 외식·뷰티 점포가 빽빽하게 들어서 있습니다. 오래된 노포의 업종 교체와 신규 브랜드 입점이 함께 일어나, 인테리어 철거와 폐업·원상복구 수요가 꾸준히 발생하는 지역입니다.",
    nearby: ["서문시장", "상당로", "북문로"],
  },
  "지웰시티": {
    slug: "gwell",
    sido: "충북 청주시",
    context:
      "지웰시티는 청주 흥덕구 복대동의 신도심 핵심 상권으로, 현대백화점 충청점과 지웰시티몰·롯데아울렛이 결합한 충북 최대 복합상권입니다. 고층 주상복합 대단지를 배후에 두고 프랜차이즈 외식·카페·학원이 밀집해, 신규 개업과 매장 확장에 따른 단말기 설치 수요가 활발한 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "복합몰 · 백화점 입점 매장",
        gear: "포스기 · 테이블오더",
        why: "대형 상권 회전 빠름. 좌석·주문 관리에 유리.",
      },
      {
        biz: "주상복합 단지 상가",
        gear: "카드단말기 · 키오스크",
        why: "배후 대단지 수요. 무인 주문으로 효율화.",
      },
    ],
    demolition:
      "지웰시티는 청주 흥덕구 복대동의 신도심 핵심 상권으로, 현대백화점 충청점과 지웰시티몰·롯데아울렛이 결합한 충북 최대 복합상권입니다. 고층 주상복합 대단지를 배후에 두고 프랜차이즈 외식·카페·학원의 개업과 리뉴얼이 활발해, 신규 인테리어 시공과 기존 점포의 원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["복대동", "가경동", "강서동"],
  },
  "청주대": {
    slug: "cju",
    sido: "충북 청주시",
    context:
      "청주대 일대는 서원구 사창동을 중심으로 한 대학가 상권으로, 청주대·충북대 학생 수요가 받치는 청주의 대표 젊은 상권입니다. 저가 음식점·분식·카페·술집이 밀집하고 1인 매장과 소형 점포 회전이 빨라, 개업·폐업 주기에 맞춘 단말기 설치·교체 수요가 활발한 지역입니다.",
    emphasis: ["분식 · 패스트푸드", "음식점 · 고깃집", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "대학가 술집 · 호프",
        gear: "포스기 · 테이블오더",
        why: "심야 회전 빠름. 주문·정산 자동화에 유리.",
      },
      {
        biz: "분식 · 배달 전문점",
        gear: "키오스크 · 무선 단말기",
        why: "학생 점심 집중. 빠른 주문·결제 대응.",
      },
    ],
    demolition:
      "청주대 일대는 서원구 사창동을 중심으로 청주대·충북대 학생 수요가 받치는 청주의 대표 대학가 상권입니다. 음식점·분식·카페와 1인·소형 점포가 학기 주기에 맞춰 빠르게 바뀌어, 폐업·이전에 따른 철거와 원상복구 수요가 활발하게 이어지는 지역입니다.",
    nearby: ["사창동", "충북대", "개신동"],
  },
  "오송": {
    slug: "osong",
    sido: "충북 청주시",
    context:
      "오송은 KTX 오송역과 오송생명과학단지를 낀 역세권·산업단지 배후 상권입니다. 식약처·바이오 기업 종사자와 출장·환승 수요가 결합해 음식점·카페·생활 밀착 업종이 성장하고 있고, 신도시 아파트 입주가 이어지며 신규 개업 단말기 설치 수요가 두터운 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "역세권 · 출장 수요 식당",
        gear: "포스기 · 카드단말기",
        why: "오송역 환승 회전. 빠른 결제·정산에 유리.",
      },
      {
        biz: "산업단지 인근 매장",
        gear: "키오스크 · 무선 단말기",
        why: "근로자 점심 집중. 무인 주문으로 효율화.",
      },
    ],
    demolition:
      "오송은 KTX 오송역과 오송생명과학단지를 낀 역세권·산업단지 배후 상권으로, 식약처·바이오 기업 종사자와 신도시 아파트 입주 수요가 받치는 지역입니다. 단지 입주와 상가 입점이 이어지면서 새 매장의 인테리어 시공과 기존 점포의 원상복구가 함께 발생하는 상권입니다.",
    nearby: ["오송역", "오송생명과학단지", "강외면"],
  },
  "오창": {
    slug: "ochang",
    sido: "충북 청주시",
    context:
      "오창은 오창과학산업단지와 청주테크노폴리스를 배후로 둔 청원구 신도시 상권입니다. 제조·연구 단지 종사자와 대단지 아파트 주민이 받치는 생활 밀착형 상권으로, 음식점·카페·학원이 빠르게 들어서며 신규 개업과 점포 확장에 따른 단말기 수요가 활발한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "신도시 단지 상가",
        gear: "포스기 · 테이블오더",
        why: "배후 대단지 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "산단 인근 식당",
        gear: "키오스크 · 무선 단말기",
        why: "근로자 점심 회전. 무인 주문으로 효율화.",
      },
    ],
    demolition:
      "오창은 오창과학산업단지와 청주테크노폴리스를 배후로 둔 청원구 신도시 상권으로, 제조·연구 단지 종사자와 대단지 아파트 주민이 받치는 생활 밀착형 지역입니다. 음식점·카페·학원이 빠르게 들어서고 점포 확장이 이어지며, 신규 인테리어와 원상복구 수요가 함께 발생하는 상권입니다.",
    nearby: ["오창과학산단", "테크노폴리스", "각리"],
  },
  "충주": {
    slug: "chungju",
    sido: "충북 충주시",
    context:
      "충주는 성서동 구도심 젊음의 거리와 호암·연수동 신상권이 함께 형성된 충북 2위 도시입니다. 전통 상권은 도시재생으로 청년몰·외식 업종이 활기를 띠고, 연수·호암지구로 신흥 상권이 이동하며 프랜차이즈와 신규 점포가 늘고 있어 매장 형태에 맞춘 단말기 상담이 유효한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "신상권 카페 · 음식점",
        gear: "포스기 · 테이블오더",
        why: "연수·호암 신흥 상권. 좌석 회전 관리에 유리.",
      },
      {
        biz: "구도심 노포 · 청년몰",
        gear: "카드단말기 · 무선 단말기",
        why: "성서동 전통 상권. 간편 설치와 안정 결제.",
      },
    ],
    demolition:
      "충주는 성서동 구도심 젊음의 거리와 호암·연수동 신상권이 함께 형성된 충북 2위 도시입니다. 도시재생으로 구도심 청년몰·외식 업종이 바뀌고 연수·호암지구로 신흥 상권이 이동하면서, 점포 교체에 따른 철거와 원상복구 수요가 꾸준히 이어지는 지역입니다.",
    nearby: ["성서동", "연수동", "호암지구"],
  },
  "제천": {
    slug: "jecheon",
    sido: "충북 제천시",
    context:
      "제천은 중앙시장과 역전·중앙로 일대를 중심으로 한 충북 북부의 거점 상권입니다. 한방·약초 산업과 청풍호·의림지 관광 수요가 결합해 외식·시장 점포가 두텁고, 구도심 생활 상권과 신규 외곽 단지가 공존해 노후 점포 단말기 교체와 신규 개업 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "전통시장 · 약초시장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "중앙시장 노포. 간편 설치와 안정 결제.",
      },
      {
        biz: "관광지 인근 음식점",
        gear: "포스기 · 키오스크",
        why: "청풍호·의림지 시즌 수요. 빠른 주문·결제.",
      },
    ],
    demolition:
      "제천은 중앙시장과 역전·중앙로 일대를 중심으로 한 충북 북부의 거점 상권으로, 한방·약초 산업과 청풍호·의림지 관광 수요가 결합된 지역입니다. 오래된 상가가 많은 구도심 특성상 노후 점포 리모델링과 인테리어 철거·원상복구 수요가 꾸준히 발생하는 상권입니다.",
    nearby: ["중앙시장", "역전", "의림지"],
  },
  "충북혁신도시": {
    slug: "cb-innocity",
    sido: "충북 진천·음성",
    context:
      "충북혁신도시는 진천 덕산읍과 음성 맹동면 경계에 조성된 공공기관·산업단지 배후 신도시입니다. 11개 공공기관 종사자와 인근 산단 근로자, 신규 대단지 입주민이 받치는 젊은 상권으로, 음식점·카페·학원이 빠르게 들어서며 신규 개업 단말기 설치 수요가 가파르게 늘고 있는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "신도시 단지 상가",
        gear: "포스기 · 테이블오더",
        why: "대단지 입주 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "산단 · 공공기관 인근 식당",
        gear: "키오스크 · 무선 단말기",
        why: "직장인 점심 집중. 무인 주문으로 효율화.",
      },
    ],
    demolition:
      "충북혁신도시는 진천 덕산읍과 음성 맹동면 경계에 조성된 공공기관·산업단지 배후 신도시로, 11개 공공기관 종사자와 신규 대단지 입주민이 받치는 젊은 상권입니다. 음식점·카페·학원이 빠르게 들어서면서 새 매장의 인테리어 시공과 기존 점포의 원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["덕산읍", "맹동면", "혁신도시터미널"],
  },
  "진천": {
    slug: "jincheon",
    sido: "충북 진천군",
    context:
      "진천은 진천읍 읍내를 중심으로 한 군 단위 생활 상권으로, 전통시장과 도심 점포가 어우러진 충북 중부의 거점입니다. 인근 혁신도시·산업단지 성장에 힘입어 외식·생활 밀착 업종이 늘고 있고, 읍내 구도심 점포 교체와 신규 개업이 함께 일어나 단말기 설치·교체 수요가 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "읍내 전통시장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "구도심 노포. 간편 설치와 안정 결제.",
      },
      {
        biz: "산단 배후 식당",
        gear: "포스기 · 키오스크",
        why: "근로자 점심 회전. 빠른 주문·결제 대응.",
      },
    ],
    demolition:
      "진천은 진천읍 읍내를 중심으로 한 군 단위 생활 상권으로, 전통시장과 도심 점포가 어우러진 충북 중부의 거점입니다. 인근 혁신도시·산업단지 성장과 함께 읍내 구도심 점포 교체와 신규 개업이 이어져, 철거와 원상복구 수요가 발생하는 지역입니다.",
    nearby: ["진천읍", "읍내리", "성석동"],
  },
  "옥천": {
    slug: "okcheon",
    sido: "충북 옥천군",
    context:
      "옥천은 경부선 옥천역과 읍내 중심로를 낀 군 단위 생활 상권으로, 대전 생활권과 맞닿은 충북 남부의 관문입니다. 전통시장과 읍내 도심 점포가 생활 수요를 받치고, 관광·향수 콘텐츠와 결합한 외식 업종이 더해져 노후 점포 단말기 교체와 신규 개업 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "읍내 전통시장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "구도심 노포. 간편 설치와 안정 결제.",
      },
      {
        biz: "역세권 · 생활 밀착 매장",
        gear: "포스기 · 카드단말기",
        why: "옥천역 생활 상권. 결제·매출 관리에 유리.",
      },
    ],
    demolition:
      "옥천은 경부선 옥천역과 읍내 중심로를 낀 군 단위 생활 상권으로, 대전 생활권과 맞닿은 충북 남부의 관문입니다. 전통시장과 읍내 도심 점포를 중심으로 노후 상가 정비와 점포 교체가 이어져, 인테리어 철거와 원상복구 수요가 발생하는 지역입니다.",
    nearby: ["옥천읍", "옥천역", "금구리"],
  },
};

// ===== 충남 지역 데이터 (8곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 충남 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(충남)도 함께 수정하세요.

const REGIONS_CHUNGNAM = {
  "천안 서북구": {
    slug: "cheonan-seobuk",
    sido: "충남 천안시",
    context:
      "천안 서북구는 불당동 갤러리아 센터시티를 중심으로 한 신도심 상권과 대학생 수요가 몰리는 두정동 먹자골목이 공존하는 천안 최대 소비권입니다. 카페·브런치·학원이 밀집한 불당지구와 술집·먹거리 중심의 두정동이 갈려 있어, 신규 개업 설치와 업종별 맞춤 단말기 수요가 꾸준히 발생합니다.",
    emphasis: ["카페", "학원 · 소형 매장", "음식점 · 고깃집"],
    extraRows: [
      {
        biz: "브런치 · 디저트 카페",
        gear: "포스기 · 테이블오더",
        why: "불당지구 신상권. 좌석 회전과 메뉴 관리에 유리.",
      },
      {
        biz: "대학가 주점 · 호프",
        gear: "카드단말기 · 무선 단말기",
        why: "두정동 야간 상권. 테이블 결제와 빠른 마감.",
      },
    ],
    demolition:
      "천안 서북구는 불당동 갤러리아 센터시티를 중심으로 한 신도심 상권과 대학생 수요가 몰리는 두정동 먹자골목이 공존하는 천안 최대 소비권입니다. 카페·브런치·학원이 밀집한 불당지구와 먹거리 중심의 두정동에서 점포 교체가 잦아, 신규 인테리어 시공과 노후 상가 원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["불당동", "두정동", "천안 동남구"],
  },
  "천안 동남구": {
    slug: "cheonan-dongnam",
    sido: "충남 천안시",
    context:
      "천안 동남구는 천안종합버스터미널과 신세계백화점을 끼고 형성된 신부동(야우리) 일대가 충남 최대급 유동인구를 자랑하는 핵심 번화가입니다. 먹자·유흥·심야 영업 매장이 밀집해 늦은 시간까지 결제가 이어지는 만큼, 빠르고 안정적인 단말기와 무인 주문 장비 수요가 높은 상권입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "카드단말기 · 무선 단말기",
        why: "신부동 야간 상권. 테이블 이동 결제에 최적.",
      },
      {
        biz: "터미널 인근 판매점",
        gear: "키오스크 · 포스기",
        why: "유동인구 많은 입지. 무인 주문으로 응대 부담 완화.",
      },
    ],
    demolition:
      "천안 동남구는 천안종합버스터미널과 신세계백화점을 낀 신부동(야우리) 일대가 충남 최대급 유동인구를 자랑하는 핵심 번화가입니다. 오래된 번화가로 음식점·호프·요리주점 점포의 교체가 잦아, 인테리어 철거와 폐업·원상복구 문의가 끊이지 않는 상권입니다.",
    nearby: ["신부동", "천안역", "천안 서북구"],
  },
  "아산": {
    slug: "asan",
    sido: "충남 아산시",
    context:
      "아산은 온양온천역 구도심 상권부터 술집·맛집이 몰린 신용화동 핫플레이스, 천안아산역과 대단지 아파트를 낀 배방읍, 삼성디스플레이 배후로 성장 중인 탕정 한들물빛도시까지 권역별로 상권이 다양하게 발달한 도시입니다. 신도시 신규 개업과 구도심 점포 교체 수요가 함께 발생해, 매장 형태에 맞춘 단말기 상담이 특히 유효한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "역세권 · 신도시 매장",
        gear: "포스기 · 테이블오더",
        why: "배방·탕정 신규 상권. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "온천 · 관광 인근 음식점",
        gear: "카드단말기 · 무선 단말기",
        why: "온양 구도심 노포. 간편 설치와 안정 결제.",
      },
    ],
    demolition:
      "아산은 온양온천역 구도심부터 신용화동 핫플레이스, 천안아산역·대단지 아파트를 낀 배방읍, 삼성디스플레이 배후로 성장 중인 탕정 한들물빛도시까지 권역별로 상권이 다양하게 발달한 도시입니다. 신도시 신규 개업과 구도심 점포 교체가 함께 일어나, 신규 인테리어와 노후 점포 원상복구 수요가 꾸준한 지역입니다.",
    nearby: ["신용화동", "배방읍", "탕정"],
  },
  "당진": {
    slug: "dangjin",
    sido: "충남 당진시",
    context:
      "당진은 읍내동 중앙로 로데오상권을 중심으로 CGV·먹자거리·학원가가 모인 도심 상권과 산업단지 배후 주거지가 함께 성장하는 도시입니다. 석문·송산 등 산업단지 종사자 수요가 두터워 외식·생활 밀착 업종이 활발하고, 신규 개업과 점포 확장에 따른 단말기 설치 수요가 이어집니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "로데오상권 매장",
        gear: "포스기 · 카드단말기",
        why: "읍내동 중심 상권. 결제·매출 관리에 유리.",
      },
      {
        biz: "산업단지 인근 식당",
        gear: "키오스크 · 무선 단말기",
        why: "근로자 점심 회전 빠름. 무인 주문으로 효율화.",
      },
    ],
    demolition:
      "당진은 읍내동 중앙로 로데오상권을 중심으로 CGV·먹자거리·학원가가 모인 도심 상권과 석문·송산 산업단지 배후 주거지가 함께 성장하는 도시입니다. 산업단지 종사자 수요를 배경으로 점포 교체와 신규 상가 입점이 이어져, 인테리어 철거와 원상복구 수요가 발생하는 지역입니다.",
    nearby: ["읍내동", "우두동", "송악읍"],
  },
  "서산": {
    slug: "seosan",
    sido: "충남 서산시",
    context:
      "서산은 예천2지구 호수공원 일대가 신흥 중심 상권으로 떠오르며, 기존 터미널·먹자골 상권을 넘어서는 유동인구를 보이고 있습니다. 상가와 학원가가 빠르게 들어서는 신도심과 전통 중심 상권이 공존해, 신규 개업 설치와 업종별 단말기 수요가 함께 발생하는 지역입니다.",
    emphasis: ["카페", "학원 · 소형 매장", "음식점 · 고깃집"],
    extraRows: [
      {
        biz: "호수공원 신상권 매장",
        gear: "포스기 · 테이블오더",
        why: "예천2지구 신흥 상권. 좌석 회전 관리에 유리.",
      },
      {
        biz: "터미널 인근 노포",
        gear: "카드단말기 · 무선 단말기",
        why: "구도심 전통 상권. 간편 설치와 안정 결제.",
      },
    ],
    demolition:
      "서산은 예천2지구 호수공원 일대가 신흥 중심 상권으로 떠오르며 기존 터미널·먹자골 상권을 넘어서는 유동인구를 보이는 도시입니다. 상가와 학원가가 빠르게 들어서는 신도심과 전통 중심 상권이 공존해, 신규 인테리어 시공과 구도심 점포 원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["호수공원", "동부시장", "예천동"],
  },
  "논산": {
    slug: "nonsan",
    sido: "충남 논산시",
    context:
      "논산은 화지중앙시장과 시외버스터미널을 낀 화지동 일대가 시의 중심 상권으로, 전통시장과 도심 점포가 어우러진 충남 남부의 거점입니다. 군 관련 수요와 지역 주민 생활 상권이 결합해, 신규 개업 설치와 노후 점포 단말기 교체가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "전통시장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "화지중앙시장 노포. 간편 설치와 안정 결제.",
      },
      {
        biz: "면회 · 외식 음식점",
        gear: "포스기 · 키오스크",
        why: "주말 면회 수요 회전. 빠른 주문·결제에 유리.",
      },
    ],
    demolition:
      "논산은 화지중앙시장과 시외버스터미널을 낀 화지동 일대가 시의 중심 상권으로, 전통시장과 도심 점포가 어우러진 충남 남부의 거점입니다. 오래된 상가가 많은 구도심 특성상 노후 점포 리모델링과 인테리어 철거·원상복구 수요가 꾸준히 발생하는 지역입니다.",
    nearby: ["화지동", "취암동", "강경"],
  },
  "태안": {
    slug: "taean",
    sido: "충남 태안군",
    context:
      "태안은 태안읍 중심 생활 상권과 안면도·만리포 등 해안 관광지 상권이 결합된 군 단위 지역입니다. 성수기 관광객이 몰리는 펜션·카페·해산물 음식점과 읍내 생활 밀착 업종이 함께 자리해, 계절 수요에 대응하는 단말기와 무인 주문 장비 수요가 있는 상권입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "해안 관광지 카페 · 펜션",
        gear: "포스기 · 무선 단말기",
        why: "안면도·만리포 성수기 회전. 야외 결제에 유리.",
      },
      {
        biz: "해산물 음식점",
        gear: "카드단말기 · 키오스크",
        why: "관광 성수기 집중 수요. 빠른 주문·결제 대응.",
      },
    ],
    demolition:
      "태안은 태안읍 중심 생활 상권과 안면도·만리포 등 해안 관광지 상권이 결합된 군 단위 지역입니다. 성수기 관광객이 몰리는 펜션·카페·해산물 음식점의 시즌 점포 교체와 상가 리모델링이 잦아, 철거와 원상복구 수요가 발생하는 상권입니다.",
    nearby: ["태안읍", "안면도", "만리포"],
  },
  "공주": {
    slug: "gongju",
    sido: "충남 공주시",
    context:
      "공주는 신관동 터미널·아파트 배후의 신도심 상권과 공주대 인근 산성동 구도심 상권이 공존하는 충남 중부 도시입니다. 백제 유적 관광 수요와 대학가 소비, 지역 주민 생활 상권이 어우러져, 신규 개업 설치와 업종별 단말기 수요가 함께 발생하는 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "신도심 카페 · 음식점",
        gear: "포스기 · 테이블오더",
        why: "신관동 신상권. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "대학가 · 관광지 매장",
        gear: "카드단말기 · 키오스크",
        why: "산성동 일대 회전 빠름. 무인 주문으로 효율화.",
      },
    ],
    demolition:
      "공주는 신관동 터미널·아파트 배후의 신도심 상권과 공주대 인근 산성동 구도심 상권이 공존하는 충남 중부 도시입니다. 백제 유적 관광 수요와 대학가 소비, 지역 주민 생활 상권이 어우러져 점포 교체가 이어지며, 인테리어 철거와 원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["신관동", "산성동", "공주대"],
  },
};

// ===== 강원 지역 데이터 (10곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 강원 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(강원)도 함께 수정하세요.

const REGIONS_GANGWON = {
  "춘천": {
    slug: "chuncheon",
    sido: "강원 춘천시",
    context:
      "춘천은 강원특별자치도청 소재지로, 명동·조양동 원도심 번화가와 닭갈비골목을 중심으로 한 대표 상권에 더해 퇴계동·석사동 신흥 주거상권이 함께 성장하는 도시입니다. 호반 관광과 대학·군 수요가 두텁고, 신규 택지 개발로 프랜차이즈·외식 점포가 늘어 매장 형태에 맞춘 단말기 설치 수요가 꾸준한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "닭갈비 · 막국수 전문점",
        gear: "포스기 · 테이블오더",
        why: "춘천 대표 외식. 좌석 회전·주문 관리에 유리.",
      },
      {
        biz: "호반 관광지 카페 · 매장",
        gear: "키오스크 · 무선 단말기",
        why: "관광 유동 집중. 빠른 주문·결제 대응.",
      },
    ],
    demolition:
      "원도심 점포 교체와 신상권 입점이 함께 일어나, 철거·원상복구 수요가 이어지는 상권입니다.",
    nearby: ["명동", "퇴계동", "석사동"],
  },
  "원주": {
    slug: "wonju",
    sido: "강원 원주시",
    context:
      "원주는 강원 최대 도시로, 시청·법원이 이전한 무실동 신도심을 1급지로 단계동 야간 상권, 중앙시장 구도심, 혁신·기업도시가 어우러진 분산형 상권 구조를 가집니다. 인구가 꾸준히 늘며 직주근접 프랜차이즈와 신규 점포가 활발히 들어서, 상권별 특성에 맞춘 단말기 상담이 유효한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "신도심 직주근접 매장",
        gear: "포스기 · 테이블오더",
        why: "무실동 점심 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "혁신·기업도시 상가",
        gear: "키오스크 · 무선 단말기",
        why: "직장인 집중. 무인 주문으로 효율화.",
      },
    ],
    demolition:
      "택지 개발과 상가 입점이 이어져, 신규 인테리어와 원상복구 수요가 함께 발생하는 상권입니다.",
    nearby: ["무실동", "단계동", "중앙시장"],
  },
  "강릉": {
    slug: "gangneung",
    sido: "강원 강릉시",
    context:
      "강릉은 영동권 최대 도시이자 동해안 대표 관광지로, 빠르게 성장하는 교동 신흥 번화가와 중앙시장·월화거리 관광 상권이 양대 축을 이룹니다. 커피거리·해변 카페와 수산물 시장이 사철 관광 수요를 받치고, 택지·대학가 점포가 늘어 신규 개업 단말기 설치 수요가 두터운 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "해변 · 관광지 카페",
        gear: "포스기 · 키오스크",
        why: "관광 시즌 집중. 빠른 주문·결제에 유리.",
      },
      {
        biz: "수산물 · 횟집 매장",
        gear: "카드단말기 · 무선 단말기",
        why: "시장·항구 점포. 간편 설치와 안정 결제.",
      },
    ],
    demolition:
      "관광 상권 리뉴얼과 점포 교체가 잦아, 인테리어 철거와 원상복구 수요가 꾸준한 상권입니다.",
    nearby: ["교동", "중앙시장", "안목해변"],
  },
  "동해": {
    slug: "donghae",
    sido: "강원 동해시",
    context:
      "동해는 천곡동 중심상권을 축으로 묵호항·북평 일대가 어우러진 영동 남부의 항만·관광 도시입니다. 수산물과 해변 관광 수요에 더해 도심 생활 상권이 받치고 있어, 횟집·시장 점포의 단말기 교체와 신규 외식·카페 개업 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "항구 · 수산물 매장",
        gear: "카드단말기 · 무선 단말기",
        why: "묵호항 점포. 간편 설치와 안정 결제.",
      },
      {
        biz: "해변 관광지 음식점",
        gear: "포스기 · 키오스크",
        why: "관광 시즌 수요. 빠른 주문·결제 대응.",
      },
    ],
    demolition:
      "항만·관광 상권 정비와 점포 교체가 이어져, 철거·원상복구 수요가 발생하는 상권입니다.",
    nearby: ["천곡동", "묵호항", "북평"],
  },
  "태백": {
    slug: "taebaek",
    sido: "강원 태백시",
    context:
      "태백은 황지동 중심상권을 축으로 한 고원 도시로, 폐광 이후 관광·휴양 도시로 전환해 온 영동 내륙의 거점입니다. 황지연못·고원 관광과 겨울 레저 수요에 더해 도심 생활 상권이 받치고 있어, 노후 점포 단말기 교체와 관광지 신규 개업 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "고원 관광지 음식점",
        gear: "포스기 · 키오스크",
        why: "관광·축제 시즌 집중. 빠른 주문·결제.",
      },
      {
        biz: "도심 생활 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "구도심 노포. 간편 설치와 안정 결제.",
      },
    ],
    demolition:
      "구도심 점포 교체와 관광지 상가 정비가 이어져, 철거·원상복구 수요가 발생하는 상권입니다.",
    nearby: ["황지동", "황지연못", "철암"],
  },
  "속초": {
    slug: "sokcho",
    sido: "강원 속초시",
    context:
      "속초는 영북권 유일의 시로, 중앙동·중앙시장을 중심으로 시내와 항포구가 맞붙은 동해안 대표 관광 도시입니다. 아바이순대·닭강정·수산물 등 향토 먹거리와 설악산·해변 관광이 사철 유동을 만들어, 시장·횟집 점포의 단말기 교체와 관광 상권 신규 개업 설치 수요가 두터운 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "관광시장 · 먹거리 점포",
        gear: "카드단말기 · 키오스크",
        why: "관광객 회전 빠름. 빠른 주문·결제에 유리.",
      },
      {
        biz: "수산물 · 횟집 매장",
        gear: "포스기 · 무선 단말기",
        why: "항구 점포. 간편 설치와 안정 결제.",
      },
    ],
    demolition:
      "관광 상권 리뉴얼과 점포 교체가 잦아, 인테리어 철거와 원상복구 수요가 꾸준한 상권입니다.",
    nearby: ["중앙동", "중앙시장", "대포항"],
  },
  "삼척": {
    slug: "samcheok",
    sido: "강원 삼척시",
    context:
      "삼척은 중앙로 구도심을 축으로 정라항·해변 관광이 어우러진 영동 남부의 해양 관광 도시입니다. 수산물과 해안 관광 수요에 더해 도심 생활 상권이 받치고 있어, 시장·횟집 점포의 단말기 교체와 관광지 신규 외식·카페 개업 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "항구 · 수산물 매장",
        gear: "카드단말기 · 무선 단말기",
        why: "정라항 점포. 간편 설치와 안정 결제.",
      },
      {
        biz: "해변 관광지 음식점",
        gear: "포스기 · 키오스크",
        why: "관광 시즌 수요. 빠른 주문·결제 대응.",
      },
    ],
    demolition:
      "구도심 점포 교체와 관광 상권 정비가 이어져, 철거·원상복구 수요가 발생하는 상권입니다.",
    nearby: ["중앙로", "정라항", "삼척해변"],
  },
  "평창": {
    slug: "pyeongchang",
    sido: "강원 평창군",
    context:
      "평창은 대관령·횡계 일대 스키 리조트와 봉평 메밀 관광을 양대 축으로 한 고원 관광 군입니다. 동계올림픽 개최지로 알펜시아·용평 등 리조트 배후 상권과 메밀·한우 향토 음식점이 시즌마다 관광객을 불러모아, 관광지 음식점·카페의 단말기 설치와 시즌 매장 결제 수요가 두드러지는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "리조트 · 스키장 인근 매장",
        gear: "포스기 · 키오스크",
        why: "겨울 시즌 집중. 빠른 주문·결제에 유리.",
      },
      {
        biz: "향토 음식점 · 축제 매장",
        gear: "카드단말기 · 무선 단말기",
        why: "메밀·한우 관광 수요. 간편 설치와 결제.",
      },
    ],
    demolition:
      "리조트·관광지 상가 리뉴얼과 시즌 매장 교체가 이어져, 철거·원상복구 수요가 발생하는 상권입니다.",
    nearby: ["대관령", "횡계", "봉평"],
  },
  "정선": {
    slug: "jeongseon",
    sido: "강원 정선군",
    context:
      "정선은 정선읍 아리랑시장과 5일장을 중심으로 하이원리조트 관광이 어우러진 산간 관광 군입니다. 관광열차·5일장이 사철 외지 관광객을 불러모으고, 곤드레밥·콧등치기국수 등 향토 먹거리와 리조트 배후 상권이 더해져, 시장·관광지 점포의 단말기 설치와 시즌 결제 수요가 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "전통시장 · 5일장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "관광시장 노점. 간편 설치와 안정 결제.",
      },
      {
        biz: "리조트 · 관광지 음식점",
        gear: "포스기 · 키오스크",
        why: "관광 시즌 집중. 빠른 주문·결제 대응.",
      },
    ],
    demolition:
      "관광시장 정비와 리조트 상가 교체가 이어져, 철거·원상복구 수요가 발생하는 상권입니다.",
    nearby: ["정선읍", "아리랑시장", "하이원"],
  },
  "홍천": {
    slug: "hongcheon",
    sido: "강원 홍천군",
    context:
      "홍천은 홍천읍 읍내를 중심으로 한 강원 영서 내륙의 거점으로, 전국에서 가장 넓은 면적을 가진 군입니다. 전통시장과 읍내 도심 점포가 생활 수요를 받치고, 인삼·한우 등 향토 산업과 비발디파크 관광이 더해져, 구도심 점포 단말기 교체와 신규 개업 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "읍내 전통시장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "구도심 노포. 간편 설치와 안정 결제.",
      },
      {
        biz: "향토 음식점 · 관광지 매장",
        gear: "포스기 · 키오스크",
        why: "한우·관광 수요. 빠른 주문·결제 대응.",
      },
    ],
    demolition:
      "읍내 구도심 점포 교체와 관광지 상가 정비가 함께 진행돼, 철거·원상복구 수요가 발생하는 상권입니다.",
    nearby: ["홍천읍", "홍천중앙시장", "비발디파크"],
  },
};

// ===== 경북 지역 데이터 (10곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 경북 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(경북)도 함께 수정하세요.

const REGIONS_GYEONGBUK = {
  "포항": {
    slug: "pohang",
    sido: "경북 포항시",
    context:
      "포항은 경북 최대 도시로, 철강산업을 기반으로 시청 이전 이후 폭발적으로 성장한 이동 신상권이 최대 구매력 중심을 이룹니다. 상대동·쌍용사거리 번화가와 중앙상가 구도심이 함께 존재하고, 영일대해변·죽도시장 관광 수요가 더해져 신규 개업 단말기 설치와 노포 교체가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "신상권 직주근접 매장",
        gear: "포스기 · 테이블오더",
        why: "이동 점심 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "해변 · 수산시장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "관광·죽도시장 수요. 간편 설치와 결제.",
      },
    ],
    demolition:
      "포항은 철강산업을 기반으로 성장한 경북 최대 도시로, 이동·상대동·쌍용사거리 신상권과 중앙상가 구도심이 함께 존재하는 지역입니다. 영일대해변·죽도시장 관광 수요까지 더해져 구도심 노포 교체와 신상권 점포 입점이 활발한 만큼, 인테리어 철거와 원상복구 수요가 꾸준히 발생하는 상권입니다.",
    nearby: ["이동", "상대동", "죽도시장"],
  },
  "구미": {
    slug: "gumi",
    sido: "경북 구미시",
    context:
      "구미는 국가산업단지를 기반으로 한 경북 대표 산업도시로, 원평동 구미역 구도심 번화가와 낙동강 동쪽 인동 신시가지가 양대 상권을 이룹니다. 공단 근로자와 대단지 아파트 주민이 받치는 생활 밀착 상권이 두텁고, 신시가지 개발로 신규 외식·카페 점포가 늘어 단말기 설치 수요가 활발한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "산업단지 인근 식당",
        gear: "키오스크 · 무선 단말기",
        why: "공단 근로자 점심 집중. 빠른 주문·결제.",
      },
      {
        biz: "신시가지 단지 상가",
        gear: "포스기 · 테이블오더",
        why: "인동 배후 수요. 좌석·메뉴 관리에 유리.",
      },
    ],
    demolition:
      "구미는 국가산업단지를 기반으로 한 경북 대표 산업도시로, 원평동 구미역 구도심과 낙동강 동쪽 인동 신시가지가 양대 상권을 이룹니다. 공단 근로자와 대단지 주민이 받치는 생활 상권에서 산업 경기에 따라 점포 교체가 이어져, 인테리어 철거와 원상복구 수요가 꾸준한 지역입니다.",
    nearby: ["원평동", "인동", "구미역"],
  },
  "경주": {
    slug: "gyeongju",
    sido: "경북 경주시",
    context:
      "경주는 천년 고도이자 세계적인 관광도시로, 황리단길을 중심으로 한 젊은 감성 상권이 카페·소품·기념품 점포로 빠르게 확장되고 있습니다. 대릉원·동궁과월지 등 유적 관광과 보문단지 수요가 사철 유동을 만들어, 관광지 카페·음식점의 신규 개업 단말기 설치 수요가 두드러지는 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "황리단길 카페 · 소품숍",
        gear: "포스기 · 키오스크",
        why: "관광객 회전 빠름. 빠른 주문·결제에 유리.",
      },
      {
        biz: "기념품 · 관광지 매장",
        gear: "카드단말기 · 무선 단말기",
        why: "유적지 인근 점포. 간편 설치와 결제.",
      },
    ],
    demolition:
      "경주는 천년 고도이자 세계적인 관광도시로, 황리단길을 중심으로 카페·소품·기념품 점포가 빠르게 확장되는 감성 상권입니다. 대릉원·보문단지 관광이 사철 유동을 만드는 만큼 관광지 카페·음식점의 콘셉트 교체가 잦아, 인테리어 철거와 원상복구 수요가 꾸준히 발생하는 지역입니다.",
    nearby: ["황리단길", "대릉원", "보문단지"],
  },
  "안동": {
    slug: "andong",
    sido: "경북 안동시",
    context:
      "안동은 경상북도청 소재지이자 유교 문화의 본향으로, 시내 다음 번화가로 성장한 옥동 신시가지와 구시장 찜닭골목이 대표 상권을 이룹니다. 도청 이전과 신도시 개발로 행정·생활 수요가 늘고, 하회마을·안동찜닭 관광이 더해져 신규 개업 설치와 노포 단말기 교체가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "신시가지 상가 · 학원",
        gear: "포스기 · 테이블오더",
        why: "옥동 생활 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "전통시장 · 찜닭골목",
        gear: "카드단말기 · 무선 단말기",
        why: "구시장 노포·관광. 간편 설치와 결제.",
      },
    ],
    demolition:
      "안동은 경상북도청 소재지이자 유교 문화의 본향으로, 도청 이전으로 성장한 옥동 신시가지와 구시장 찜닭골목이 대표 상권을 이룹니다. 행정·생활 수요와 하회마을·안동찜닭 관광이 더해져 구도심 노포 교체와 신시가지 입점이 함께 일어나, 인테리어 철거와 원상복구 수요가 이어지는 지역입니다.",
    nearby: ["옥동", "구시장", "도청신도시"],
  },
  "김천": {
    slug: "gimcheon",
    sido: "경북 김천시",
    context:
      "김천은 경부선·KTX가 지나는 교통 요지로, 율곡동 경북드림밸리 혁신도시가 한국도로공사 등 공기업 이전으로 새로운 중심상권으로 떠오르고 있습니다. 신음동 이마트 일대 제2상권과 함께 신도시 대단지 입주가 이어져, 신규 개업 단말기 설치 수요가 가파르게 늘고 있는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "혁신도시 단지 상가",
        gear: "포스기 · 테이블오더",
        why: "공기업 이전 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "산단 · 역세권 식당",
        gear: "키오스크 · 무선 단말기",
        why: "근로자·환승 수요. 빠른 주문·결제 대응.",
      },
    ],
    demolition:
      "김천은 경부선·KTX가 지나는 교통 요지로, 율곡동 경북드림밸리 혁신도시가 공기업 이전으로 새로운 중심상권으로 떠오르는 지역입니다. 신음동 이마트 일대 제2상권과 함께 대단지 입주가 이어지면서, 새 매장의 인테리어 시공과 기존 점포의 원상복구가 함께 발생하는 상권입니다.",
    nearby: ["율곡동", "신음동", "김천구미역"],
  },
  "경산": {
    slug: "gyeongsan",
    sido: "경북 경산시",
    context:
      "경산은 영남대·대구대 등 대학이 밀집한 대구 생활권 도시로, 대학가와 신도시 택지가 어우러진 젊은 상권을 가집니다. 학생 수요가 받치는 저가 음식점·카페·술집이 두텁고, 대구 인접 베드타운으로 인구가 늘며 신규 외식·소형 점포 개업에 따른 단말기 설치 수요가 활발한 지역입니다.",
    emphasis: ["분식 · 패스트푸드", "음식점 · 고깃집", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "대학가 술집 · 호프",
        gear: "포스기 · 테이블오더",
        why: "심야 회전 빠름. 주문·정산 자동화에 유리.",
      },
      {
        biz: "택지 단지 상가",
        gear: "키오스크 · 무선 단말기",
        why: "베드타운 수요. 무인 주문으로 효율화.",
      },
    ],
    demolition:
      "경산은 영남대·대구대 등 대학이 밀집한 대구 생활권 도시로, 대학가와 신도시 택지가 어우러진 젊은 상권을 가집니다. 학생 수요가 받치는 저가 음식점·카페·호프의 교체가 잦고 베드타운 개발로 신규 점포도 늘어, 인테리어 철거와 원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["영남대", "중앙동", "정평"],
  },
  "영주": {
    slug: "yeongju",
    sido: "경북 영주시",
    context:
      "영주는 중앙선·영동선이 만나는 경북 북부의 교통 거점으로, 번영로 구도심과 영주역 일대를 중심으로 생활 상권이 형성돼 있습니다. 전통시장과 도심 점포가 생활 수요를 받치고, 부석사·무섬마을 관광과 풍기 인삼 산업이 더해져 노후 점포 단말기 교체와 신규 개업 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "구도심 전통시장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "번영로 노포. 간편 설치와 안정 결제.",
      },
      {
        biz: "역세권 · 관광지 매장",
        gear: "포스기 · 키오스크",
        why: "영주역·부석사 수요. 빠른 주문·결제.",
      },
    ],
    demolition:
      "영주는 중앙선·영동선이 만나는 경북 북부의 교통 거점으로, 번영로 구도심과 영주역 일대를 중심으로 생활 상권이 형성돼 있습니다. 전통시장과 도심 점포가 생활 수요를 받치는 구도심 특성상, 노후 점포 리모델링과 인테리어 철거·원상복구 수요가 꾸준히 이어지는 지역입니다.",
    nearby: ["번영로", "영주역", "풍기"],
  },
  "영천": {
    slug: "yeongcheon",
    sido: "경북 영천시",
    context:
      "영천은 대구와 포항을 잇는 길목에 자리한 경북 동남부 거점으로, 영천공설시장과 도심 중심상권을 축으로 생활 수요가 형성돼 있습니다. 과수·한약 산업과 보현산 관광에 더해 도심 점포가 받치고 있어, 전통시장 노포의 단말기 교체와 신규 외식·생활 점포 개업 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "공설시장 · 5일장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "전통시장 노포. 간편 설치와 안정 결제.",
      },
      {
        biz: "도심 생활 밀착 매장",
        gear: "포스기 · 카드단말기",
        why: "중심상권 수요. 결제·매출 관리에 유리.",
      },
    ],
    demolition:
      "영천은 대구와 포항을 잇는 길목에 자리한 경북 동남부 거점으로, 영천공설시장과 도심 중심상권을 축으로 생활 수요가 형성돼 있습니다. 전통시장 노포와 도심 점포가 어우러진 구도심 특성상, 노후 상가 정비와 인테리어 철거·원상복구 수요가 꾸준히 발생하는 지역입니다.",
    nearby: ["영천공설시장", "중앙동", "완산동"],
  },
  "상주": {
    slug: "sangju",
    sido: "경북 상주시",
    context:
      "상주는 낙동강 유역의 농업 거점 도시로, 상주중앙시장과 도심 중심상권을 축으로 생활 수요가 형성돼 있습니다. 곶감·쌀 등 농산물 산업과 자전거 도시 관광에 더해 도심 점포가 받치고 있어, 전통시장 노포의 단말기 교체와 신규 외식·생활 점포 개업 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "중앙시장 · 농산물 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "전통시장 노포. 간편 설치와 안정 결제.",
      },
      {
        biz: "도심 생활 밀착 매장",
        gear: "포스기 · 카드단말기",
        why: "중심상권 수요. 결제·매출 관리에 유리.",
      },
    ],
    demolition:
      "상주는 낙동강 유역의 농업 거점 도시로, 상주중앙시장과 도심 중심상권을 축으로 생활 수요가 형성돼 있습니다. 전통시장 노포와 도심 점포가 생활 수요를 받치는 구도심 특성상, 노후 상가 정비와 인테리어 철거·원상복구 수요가 꾸준히 이어지는 지역입니다.",
    nearby: ["상주중앙시장", "무양동", "상주역"],
  },
  "문경": {
    slug: "mungyeong",
    sido: "경북 문경시",
    context:
      "문경은 점촌 구도심을 중심상권으로 문경새재·문경온천 관광이 어우러진 경북 북서부의 거점입니다. 점촌 도심 점포가 생활 수요를 받치고, 새재·철로자전거·약돌한우 등 관광 콘텐츠가 더해져, 구도심 노포의 단말기 교체와 관광지 신규 외식·카페 개업 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "점촌 구도심 시장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "구도심 노포. 간편 설치와 안정 결제.",
      },
      {
        biz: "관광지 음식점 · 카페",
        gear: "포스기 · 키오스크",
        why: "새재·온천 관광 수요. 빠른 주문·결제.",
      },
    ],
    demolition:
      "문경은 점촌 구도심을 중심상권으로 문경새재·문경온천 관광이 어우러진 경북 북서부의 거점입니다. 점촌 도심 점포가 생활 수요를 받치고 관광 콘텐츠가 더해지는 만큼, 구도심 노후 점포 리모델링과 관광지 점포 교체에 따른 철거·원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["점촌", "문경새재", "문경온천"],
  },
};

// ===== 경남 지역 데이터 (8곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 경남 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(경남)도 함께 수정하세요.

const REGIONS_GYEONGNAM = {
  "상남동": {
    slug: "sangnam",
    sido: "경남 창원시 성산구",
    context:
      "상남동은 창원 최대 번화가로, 분수광장을 중심으로 음식점·주점·학원이 빽빽하게 들어선 경남 대표 중심상권입니다. 창원시청·도청과 대형 아파트 단지가 배후 수요를 받치고, 직장인 회식과 학원가 학부모 수요가 사철 유동을 만들어, 외식·유흥 점포의 신규 개업 단말기 설치와 회전 빠른 매장의 결제 수요가 두드러지는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "학원 · 소형 매장", "카페"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "심야 회식 수요. 좌석·주문 관리에 유리.",
      },
      {
        biz: "학원가 상가 매장",
        gear: "카드단말기 · 키오스크",
        why: "학부모·학생 결제. 빠른 회전과 간편 결제.",
      },
    ],
    demolition:
      "상남동은 분수광장을 중심으로 음식점·호프·요리주점·학원이 빽빽하게 들어선 창원 최대 번화가로, 경남을 대표하는 중심상권입니다. 창원시청·도청과 대형 아파트 단지가 배후 수요를 받치고 점포 회전이 빠른 만큼, 인테리어 철거와 폐업·원상복구 수요가 꾸준히 발생하는 지역입니다.",
    nearby: ["창원시청", "분수광장", "용호동"],
  },
  "마산": {
    slug: "masan",
    sido: "경남 창원시 마산합포구",
    context:
      "마산은 창동·오동동 구도심과 마산어시장을 끼고 형성된 전통 상권으로, 통합 창원의 옛 중심지답게 노포와 횟집·아구찜 골목이 깊게 자리 잡고 있습니다. 어시장 수산물 유통과 창동예술촌 관광이 더해져, 오래된 점포의 단말기 교체 수요와 골목 상권 정비에 따른 신규 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "어시장 · 수산물 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "시장 노포. 간편 설치와 안정 결제.",
      },
      {
        biz: "횟집 · 아구찜 노포",
        gear: "포스기 · 무선 단말기",
        why: "좌석·주문 관리. 매장·홀 결제에 유리.",
      },
    ],
    demolition:
      "마산은 창동·오동동 구도심과 마산어시장을 끼고 형성된 전통 상권으로, 통합 창원의 옛 중심지답게 노포와 횟집·아구찜 골목이 깊게 자리 잡은 지역입니다. 어시장 유통과 창동예술촌 관광이 더해진 구도심 특성상, 노후 점포 교체와 골목 상권 정비에 따른 철거·원상복구 수요가 이어지는 상권입니다.",
    nearby: ["창동", "오동동", "마산어시장"],
  },
  "진해": {
    slug: "jinhae",
    sido: "경남 창원시 진해구",
    context:
      "진해는 군항제 벚꽃축제로 전국에 알려진 관광·군항 도시로, 중원로터리 구도심과 경화역·여좌천 벚꽃 명소가 사철 관광 유동을 만듭니다. 신항만 배후 주거단지가 베드타운 생활 수요를 받치고, 축제 시즌 집중되는 관광객 결제와 평시 주거 상권 수요가 어우러져 단말기 설치·교체가 함께 발생하는 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "축제 거리 카페 · 노점",
        gear: "무선 단말기 · 키오스크",
        why: "벚꽃 시즌 집중. 이동·간편 결제에 유리.",
      },
      {
        biz: "주거단지 생활 점포",
        gear: "카드단말기 · 포스기",
        why: "베드타운 단골 수요. 안정 설치와 결제.",
      },
    ],
    demolition:
      "진해는 군항제 벚꽃축제로 알려진 관광·군항 도시로, 중원로터리 구도심과 경화역·여좌천 벚꽃 명소가 사철 관광 유동을 만드는 지역입니다. 신항만 배후 주거단지가 생활 수요를 받치는 가운데, 관광 상권과 신규 주거단지 점포 교체가 맞물려 인테리어 철거와 원상복구 수요가 이어지는 상권입니다.",
    nearby: ["중원로터리", "경화역", "여좌천"],
  },
  "김해": {
    slug: "gimhae",
    sido: "경남 김해시",
    context:
      "김해는 부산·창원에 인접한 경남 동부의 거점도시로, 내외동 구도심 번화가와 장유 신도시가 양대 상권을 이룹니다. 대규모 산업단지와 외국인 노동자 상권, 김해공항 배후 수요가 받쳐주는 생활 밀착형 상권이 두텁고, 장유 신도시 개발로 신규 외식·카페 점포가 늘어 단말기 설치 수요가 활발한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "장유 신도시 단지 상가",
        gear: "포스기 · 테이블오더",
        why: "신도시 배후 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "산업단지 인근 식당",
        gear: "키오스크 · 무선 단말기",
        why: "근로자 점심 집중. 빠른 주문·결제.",
      },
    ],
    demolition:
      "김해는 부산·창원에 인접한 경남 동부의 거점도시로, 내외동 구도심 번화가와 장유 신도시가 양대 상권을 이룹니다. 대규모 산업단지와 김해공항 배후 수요가 받치는 생활 상권에서 구도심 점포 교체와 신도시 입점이 함께 일어나, 인테리어 철거와 원상복구 수요가 이어지는 지역입니다.",
    nearby: ["내외동", "장유", "김해공항"],
  },
  "양산": {
    slug: "yangsan",
    sido: "경남 양산시",
    context:
      "양산은 부산 도시철도가 연결되는 부산 생활권 베드타운으로, 물금 신도시와 중앙동 구도심이 양대 상권을 이룹니다. 신도시 대단지 아파트의 젊은 가구 수요가 빠르게 늘고 부산대 양산캠퍼스·병원 배후가 더해져, 신규 외식·카페·생활 점포의 단말기 설치 수요가 활발하게 발생하는 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "물금 신도시 단지 상가",
        gear: "포스기 · 테이블오더",
        why: "신도시 배후 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "역세권 생활 점포",
        gear: "카드단말기 · 키오스크",
        why: "출퇴근 유동. 빠른 회전과 간편 결제.",
      },
    ],
    demolition:
      "양산은 부산 도시철도가 연결되는 부산 생활권 베드타운으로, 물금 신도시와 중앙동 구도심이 양대 상권을 이룹니다. 신도시 대단지의 젊은 가구 수요가 빠르게 늘고 부산대 양산캠퍼스·병원 배후가 더해져, 신도시 신규 점포 시공과 구도심 점포 원상복구가 함께 발생하는 지역입니다.",
    nearby: ["물금", "중앙동", "양산역"],
  },
  "진주": {
    slug: "jinju",
    sido: "경남 진주시",
    context:
      "진주는 경남 서부의 교육·행정 거점으로, 중앙시장·대안동 구도심 번화가와 충무공동 혁신도시가 양대 상권을 이룹니다. 경상국립대 대학가와 이전 공공기관 종사자 수요가 받쳐주고, 진주성·남강유등축제 관광이 더해져, 구도심 노포의 단말기 교체와 혁신도시 신규 개업 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "혁신도시 단지 상가",
        gear: "포스기 · 테이블오더",
        why: "공공기관 배후 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "중앙시장 · 구도심 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "전통시장 노포. 간편 설치와 안정 결제.",
      },
    ],
    demolition:
      "진주는 경남 서부의 교육·행정 거점으로, 중앙시장·대안동 구도심 번화가와 충무공동 혁신도시가 양대 상권을 이룹니다. 경상국립대 대학가와 이전 공공기관 종사자 수요가 받치는 가운데, 구도심 노포 교체와 혁신도시 신규 개업이 함께 일어나 인테리어 철거와 원상복구 수요가 이어지는 지역입니다.",
    nearby: ["중앙시장", "충무공동", "경상국립대"],
  },
  "거제": {
    slug: "geoje",
    sido: "경남 거제시",
    context:
      "거제는 조선업을 기반으로 성장한 항만 산업도시로, 고현동 중심상권과 옥포 조선소 배후 상권이 양대 축을 이룹니다. 대형 조선소 근로자 수요가 외식·생활 상권을 받치고, 외도·바람의언덕 등 관광 수요가 더해져, 산업 경기에 따라 점포 교체와 신규 개업이 활발하게 오가는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "조선소 인근 식당",
        gear: "키오스크 · 무선 단말기",
        why: "근로자 점심 집중. 빠른 주문·결제.",
      },
      {
        biz: "관광지 카페 · 횟집",
        gear: "포스기 · 무선 단말기",
        why: "해안 관광 수요. 좌석·홀 결제에 유리.",
      },
    ],
    demolition:
      "거제는 조선업을 기반으로 성장한 항만 산업도시로, 고현동 중심상권과 옥포 조선소 배후 상권이 양대 축을 이룹니다. 대형 조선소 근로자 수요가 외식·생활 상권을 받치는 만큼 산업 경기에 따라 점포 교체와 업종 전환이 잦아, 인테리어 철거와 원상복구 수요가 이어지는 지역입니다.",
    nearby: ["고현동", "옥포", "장승포"],
  },
  "통영": {
    slug: "tongyeong",
    sido: "경남 통영시",
    context:
      "통영은 한려해상의 관문이자 대표 관광도시로, 중앙시장·강구안 일대가 항구 관광 중심상권을 이룹니다. 동피랑 벽화마을과 케이블카·유람선 관광이 사철 유동을 만들고, 충무김밥·꿀빵 등 먹거리 상권이 두터워, 관광지 음식점·카페의 신규 개업 단말기 설치와 시장 노포 교체가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "강구안 · 중앙시장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "항구 관광 노포. 간편 설치와 결제.",
      },
      {
        biz: "관광지 먹거리 매장",
        gear: "키오스크 · 포스기",
        why: "관광객 회전 빠름. 빠른 주문·결제.",
      },
    ],
    demolition:
      "통영은 한려해상의 관문이자 대표 관광도시로, 중앙시장·강구안 일대가 항구 관광 중심상권을 이룹니다. 동피랑 벽화마을과 케이블카·유람선 관광이 사철 유동을 만들고 먹거리 상권이 두터운 만큼, 관광지 음식점·카페의 콘셉트 교체와 시장 노포 정비에 따른 철거·원상복구 수요가 꾸준한 지역입니다.",
    nearby: ["중앙시장", "강구안", "동피랑"],
  },
};

// ===== 전북 지역 데이터 (8곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 전북 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(전북)도 함께 수정하세요.

const REGIONS_JEONBUK = {
  "객사": {
    slug: "gaeksa",
    sido: "전북 전주시 완산구",
    context:
      "객사는 전주 최대 번화가로, 객사길·영화의거리를 중심으로 음식점·주점·학원이 빽빽하게 들어선 전북 대표 중심상권입니다. 전주 구도심의 오랜 먹자골목과 젊은층이 모이는 영화거리가 어우러져, 외식·유흥 점포의 신규 개업 단말기 설치와 회전 빠른 매장의 결제 수요가 함께 두드러지는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "심야 회식 수요. 좌석·주문 관리에 유리.",
      },
      {
        biz: "영화거리 먹자골목 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "유동 많은 번화가. 간편 설치와 빠른 결제.",
      },
    ],
    demolition:
      "객사는 객사길·영화의거리를 중심으로 음식점·호프·요리주점·학원이 빽빽하게 들어선 전주 최대 번화가로, 전북을 대표하는 중심상권입니다. 구도심 먹자골목과 젊은층이 모이는 영화거리가 어우러져 점포 회전이 빠른 만큼, 인테리어 철거와 폐업·원상복구 수요가 꾸준히 발생하는 지역입니다.",
    nearby: ["객사길", "영화의거리", "고사동"],
  },
  "신시가지": {
    slug: "sinsigaji-jj",
    sido: "전북 전주시 완산구",
    context:
      "신시가지는 전북특별자치도청과 법조타운을 배후로 둔 전주 서부의 신도심 상권으로, 오피스 직장인과 인근 대단지 아파트 수요가 받쳐줍니다. 깔끔한 거리에 카페·브런치·다이닝 점포가 밀집해, 점심·저녁 직장인 수요와 주거 배후가 어우러진 신규 개업 단말기 설치가 활발한 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "오피스가 다이닝 · 브런치",
        gear: "포스기 · 테이블오더",
        why: "직장인 점심·저녁 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "도청 · 법조타운 상가",
        gear: "카드단말기 · 키오스크",
        why: "오피스 배후 수요. 빠른 회전과 간편 결제.",
      },
    ],
    demolition:
      "신시가지는 전북특별자치도청과 법조타운을 배후로 둔 전주 서부의 신도심 상권으로, 오피스 직장인과 인근 대단지 아파트 수요가 받쳐주는 지역입니다. 카페·브런치·다이닝 점포의 잦은 교체와 함께 업무시설 이전에 따른 사무실 원상복구 수요도 더해져, 상가와 사무실 양쪽의 철거·원상복구가 함께 발생하는 상권입니다.",
    nearby: ["전북도청", "법조타운", "서부신시가지"],
  },
  "한옥마을": {
    slug: "hanok",
    sido: "전북 전주시 완산구",
    context:
      "한옥마을은 연간 수백만 관광객이 찾는 전국구 관광지로, 풍남동·교동 일대 한옥 거리에 기념품·먹거리·게스트하우스 점포가 빽빽하게 들어서 있습니다. 비빔밥·길거리 먹거리와 한복 대여 등 관광 콘텐츠가 사철 유동을 만들어, 관광지 점포의 신규 개업 단말기 설치와 회전 빠른 결제 수요가 두드러지는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "기념품 · 한복 대여점",
        gear: "카드단말기 · 무선 단말기",
        why: "관광객 결제. 간편 설치와 안정 결제.",
      },
      {
        biz: "길거리 먹거리 · 노점",
        gear: "키오스크 · 무선 단말기",
        why: "관광객 회전 빠름. 이동·간편 결제에 유리.",
      },
    ],
    demolition:
      "한옥마을은 연간 수백만 관광객이 찾는 전국구 관광지로, 풍남동·교동 일대 한옥 거리에 기념품·먹거리·게스트하우스 점포가 빽빽하게 들어서 있습니다. 관광 콘텐츠에 따라 점포가 빠르게 교체되는 관광 상권 특성상, 인테리어 철거와 원상복구 수요가 꾸준히 발생하는 지역입니다.",
    nearby: ["풍남동", "교동", "전동성당"],
  },
  "익산": {
    slug: "iksan",
    sido: "전북 익산시",
    context:
      "익산은 호남선·전라선이 교차하는 KTX 익산역을 끼고 성장한 전북 서부의 교통 거점도시로, 영등동 신도심 번화가와 익산역 구도심이 양대 상권을 이룹니다. 원광대 대학가와 대단지 아파트 생활 수요가 받쳐주고, 신도심 외식·카페 점포가 늘어 단말기 설치 수요가 활발한 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "영등동 신도심 상가",
        gear: "포스기 · 테이블오더",
        why: "신도심 배후 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "역세권 · 대학가 점포",
        gear: "카드단말기 · 키오스크",
        why: "유동·청년 수요. 빠른 회전과 간편 결제.",
      },
    ],
    demolition:
      "익산은 호남선·전라선이 교차하는 KTX 익산역을 끼고 성장한 전북 서부의 교통 거점도시로, 영등동 신도심 번화가와 익산역 구도심이 양대 상권을 이룹니다. 원광대 대학가와 대단지 생활 수요가 받치는 가운데 구도심 점포 교체와 신도심 입점이 함께 일어나, 인테리어 철거와 원상복구 수요가 이어지는 지역입니다.",
    nearby: ["영등동", "익산역", "원광대"],
  },
  "군산": {
    slug: "gunsan",
    sido: "전북 군산시",
    context:
      "군산은 근대문화유산과 항구를 품은 전북 서해안의 거점도시로, 수송동 신상권과 근대역사거리·구도심이 양대 축을 이룹니다. 새만금 개발 배후와 대단지 아파트 생활 수요가 받쳐주고, 근대문화 관광과 짬뽕거리 등 먹거리 상권이 더해져, 신도심 신규 개업과 구도심 노포 교체가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "수송동 신상권 상가",
        gear: "포스기 · 테이블오더",
        why: "신도심 배후 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "근대거리 관광 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "관광·먹거리 수요. 간편 설치와 결제.",
      },
    ],
    demolition:
      "군산은 근대문화유산과 항구를 품은 전북 서해안의 거점도시로, 수송동 신상권과 근대역사거리·구도심이 양대 축을 이룹니다. 새만금 개발 배후와 근대문화 관광·짬뽕거리 먹거리 상권이 더해져 신도심 신규 개업과 구도심 노포 교체가 함께 일어나, 인테리어 철거와 원상복구 수요가 이어지는 지역입니다.",
    nearby: ["수송동", "근대역사거리", "째보선창"],
  },
  "정읍": {
    slug: "jeongeup",
    sido: "전북 정읍시",
    context:
      "정읍은 정읍역 구도심을 중심상권으로 내장산 단풍 관광이 어우러진 전북 남부의 거점입니다. 시청·터미널 주변 생활 상권이 일상 수요를 받치고, 내장산 시즌 관광과 5일장이 더해져, 구도심 노포의 단말기 교체와 관광지 음식점·카페 신규 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "분식 · 패스트푸드", "카페"],
    extraRows: [
      {
        biz: "정읍역 · 터미널 상가",
        gear: "카드단말기 · 무선 단말기",
        why: "구도심 생활 수요. 간편 설치와 안정 결제.",
      },
      {
        biz: "내장산 관광 음식점",
        gear: "포스기 · 키오스크",
        why: "단풍 시즌 집중. 빠른 주문·결제.",
      },
    ],
    demolition:
      "정읍은 정읍역 구도심을 중심상권으로 내장산 단풍 관광이 어우러진 전북 남부의 거점입니다. 시청·터미널 주변 생활 상권과 내장산 시즌 관광·5일장이 더해지는 만큼, 구도심 노후 점포 리모델링과 관광지 점포 교체에 따른 철거·원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["정읍역", "내장산", "시외버스터미널"],
  },
  "남원": {
    slug: "namwon",
    sido: "전북 남원시",
    context:
      "남원은 광한루원과 춘향테마로 알려진 전북 동부의 관광 거점으로, 남원역·시청 주변 구도심이 생활 중심상권을 이룹니다. 광한루·춘향제 관광과 지리산 관문 수요가 사철 유동을 만들어, 구도심 노포의 단말기 교체와 관광지 음식점·카페의 신규 개업 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "광한루 관광 음식점 · 카페",
        gear: "포스기 · 키오스크",
        why: "관광 시즌 집중. 빠른 주문·결제.",
      },
      {
        biz: "구도심 시장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "전통 노포. 간편 설치와 안정 결제.",
      },
    ],
    demolition:
      "남원은 광한루원과 춘향테마로 알려진 전북 동부의 관광 거점으로, 남원역·시청 주변 구도심이 생활 중심상권을 이룹니다. 광한루·춘향제 관광과 지리산 관문 수요가 사철 유동을 만드는 만큼, 구도심 노후 점포 리모델링과 관광지 점포 교체에 따른 철거·원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["광한루원", "남원역", "춘향테마파크"],
  },
  "완주": {
    slug: "wanju",
    sido: "전북 완주군",
    context:
      "완주는 이서면 일대에 조성된 전북혁신도시를 품은 전주 인접 거점으로, 농협중앙회·지방행정연수원 등 이전 공공기관 종사자가 신도심 상권의 핵심 수요를 이룹니다. 대단지 아파트와 산업단지 배후가 받쳐주고, 신도심 개발로 외식·카페 점포가 빠르게 늘어 신규 개업 단말기 설치 수요가 활발한 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "혁신도시 단지 상가",
        gear: "포스기 · 테이블오더",
        why: "공공기관 배후 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "산업단지 인근 식당",
        gear: "키오스크 · 무선 단말기",
        why: "근로자 점심 집중. 빠른 주문·결제.",
      },
    ],
    demolition:
      "완주는 이서면 일대에 조성된 전북혁신도시를 품은 전주 인접 거점으로, 농협중앙회 등 이전 공공기관 종사자가 신도심 상권의 핵심 수요를 이룹니다. 대단지 아파트와 산업단지 배후가 받치는 가운데 신도심 개발로 점포가 빠르게 늘어, 새 매장의 인테리어 시공과 기존 점포의 원상복구가 함께 발생하는 지역입니다.",
    nearby: ["전북혁신도시", "이서면", "봉동읍"],
  },
};

// ===== 전남 지역 데이터 (6곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 전남 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(전남)도 함께 수정하세요.

const REGIONS_JEONNAM = {
  "순천": {
    slug: "suncheon",
    sido: "전남 순천시",
    context:
      "순천은 여수·광양을 아우르는 여순광권의 거주 중심지로, 연향동·조례동 번화가와 신대지구 신도심이 양대 상권을 이룹니다. 횡단보도 하나로 나뉜 연향·조례 일대 호프·요리주점 골목이 젊은층 야간 수요를 받치고, 신대지구 대단지 입주로 외식·카페 신규 개업이 빠르게 늘며, 순천만국가정원 관광까지 더해져 단말기 설치와 노포 교체가 활발하게 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "연향·조례 야간 회식 수요. 좌석·주문 관리에 유리.",
      },
      {
        biz: "신대지구 단지 상가",
        gear: "카드단말기 · 키오스크",
        why: "신도심 배후 수요. 빠른 회전과 간편 결제.",
      },
    ],
    demolition:
      "순천은 여수·광양을 아우르는 여순광권의 거주 중심지로, 연향동·조례동 번화가와 신대지구 신도심이 양대 상권을 이룹니다. 연향·조례 일대 호프·요리주점 골목과 신대지구 대단지 입주, 순천만국가정원 관광이 어우러져 구도심 점포 교체와 신도심 입점이 함께 일어나, 인테리어 철거와 원상복구 수요가 이어지는 지역입니다.",
    nearby: ["연향동", "조례동", "신대지구"],
  },
  "여수": {
    slug: "yeosu",
    sido: "전남 여수시",
    context:
      "여수는 여수국가산업단지와 관광산업을 양대 축으로 한 전남 최대 경제 도시로, 여천 학동 신도심 번화가와 엑스포·돌산 관광 상권이 함께 발달해 있습니다. 산단 근로자와 여천 신도심 생활 수요가 두텁고, 엑스포·돌산 일대 해산물 횟집과 관광 카페가 사철 유동을 만들어, 신규 개업 단말기 설치와 회전 빠른 결제 수요가 두드러지는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "관광지 횟집 · 해산물 식당",
        gear: "포스기 · 무선 단말기",
        why: "엑스포·돌산 관광 수요. 좌석·홀 결제에 유리.",
      },
      {
        biz: "산단 인근 식당 · 카페",
        gear: "키오스크 · 무선 단말기",
        why: "근로자 점심 집중. 빠른 주문·결제.",
      },
    ],
    demolition:
      "여수는 여수국가산업단지와 관광산업을 양대 축으로 한 전남 최대 경제 도시로, 여천 학동 신도심 번화가와 엑스포·돌산 관광 상권이 함께 발달한 지역입니다. 산단 근로자와 신도심 생활 수요, 돌산 일대 해산물 횟집·관광 카페가 어우러져 점포 교체가 잦은 만큼, 인테리어 철거와 원상복구 수요가 이어지는 상권입니다.",
    nearby: ["학동", "엑스포", "돌산"],
  },
  "목포": {
    slug: "mokpo",
    sido: "전남 목포시",
    context:
      "목포는 서남권의 관문 도시로, 하당 평화광장 신도심 번화가가 최대 상권을 이루고 목포역 일대 원도심과 근대문화·해상케이블카 관광이 함께 존재합니다. 하당 대단지 생활 수요가 외식·카페 상권을 받치고, 원도심 시장과 관광 먹거리 점포가 더해져, 신도심 신규 개업 단말기 설치와 구도심 노포 교체가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "평화광장 번화가 점포",
        gear: "포스기 · 테이블오더",
        why: "신도심 최대 번화가. 좌석·주문 관리에 유리.",
      },
      {
        biz: "원도심 시장 · 관광 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "전통시장·관광 노포. 간편 설치와 결제.",
      },
    ],
    demolition:
      "목포는 서남권의 관문 도시로, 하당 평화광장 신도심 번화가가 최대 상권을 이루고 목포역 일대 원도심과 근대문화·해상케이블카 관광이 함께 존재합니다. 하당 생활 수요와 원도심 시장·관광 먹거리 점포가 어우러진 가운데, 원도심 공동화와 신도심 입점이 맞물려 인테리어 철거와 원상복구 수요가 이어지는 지역입니다.",
    nearby: ["하당", "평화광장", "목포역"],
  },
  "광양": {
    slug: "gwangyang",
    sido: "전남 광양시",
    context:
      "광양은 광양제철소와 광양항을 기반으로 성장한 산업도시로, 중마동 신상권이 중심 번화가를 이루고 광양읍 구도심이 함께 존재합니다. 제철·항만 근로자와 대단지 아파트 생활 수요가 두텁게 받쳐주고, 중마동 개발로 외식·카페 점포가 늘어, 신규 개업 단말기 설치와 구도심 노포 교체가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "중마동 신상권 상가",
        gear: "포스기 · 테이블오더",
        why: "신도심 배후 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "제철 · 항만 인근 식당",
        gear: "키오스크 · 무선 단말기",
        why: "근로자 점심 집중. 빠른 주문·결제.",
      },
    ],
    demolition:
      "광양은 광양제철소와 광양항을 기반으로 성장한 산업도시로, 중마동 신상권이 중심 번화가를 이루고 광양읍 구도심이 함께 존재합니다. 제철·항만 근로자와 대단지 생활 수요가 두텁게 받치는 만큼 산업 경기에 따라 점포 교체가 이어져, 인테리어 철거와 원상복구 수요가 함께 발생하는 지역입니다.",
    nearby: ["중마동", "광양읍", "광양항"],
  },
  "나주": {
    slug: "naju",
    sido: "전남 나주시",
    context:
      "나주는 빛가람혁신도시를 품은 전남 서부의 거점으로, 공공기관이 밀집한 빛가람동 신도심 상권과 나주 원도심·전통시장이 함께 존재합니다. 이전 공공기관 종사자의 평일 점심·저녁 수요가 신도심 상권을 받치고, 원도심 시장과 나주읍성 일대 생활 상권이 더해져, 혁신도시 신규 개업 단말기 설치와 원도심 노포 교체가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "혁신도시 공공기관 상가",
        gear: "포스기 · 키오스크",
        why: "평일 점심 집중. 빠른 주문·결제에 유리.",
      },
      {
        biz: "원도심 시장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "전통시장 노포. 간편 설치와 안정 결제.",
      },
    ],
    demolition:
      "나주는 빛가람혁신도시를 품은 전남 서부의 거점으로, 공공기관이 밀집한 빛가람동 신도심 상권과 나주 원도심·전통시장이 함께 존재합니다. 이전 공공기관 종사자 수요가 신도심 상권을 받치는 가운데 업무시설 이전에 따른 사무실 원상복구와 원도심 노포 교체가 더해져, 상가와 사무실 양쪽의 철거·원상복구가 함께 발생하는 지역입니다.",
    nearby: ["빛가람동", "혁신도시", "나주읍성"],
  },
  "무안": {
    slug: "muan",
    sido: "전남 무안군",
    context:
      "무안은 전남도청이 자리한 남악신도시를 품은 행정 거점으로, 도청·법원·교육청이 밀집한 남악·오룡지구 신도심 상권과 무안읍 구도심이 함께 존재합니다. 도청 공무원과 대단지 아파트 생활 수요가 신도심 상권을 받치고, 목포 생활권과 맞닿아 외식·카페 신규 개업이 활발하며, 무안공항 배후까지 더해져 단말기 설치 수요가 꾸준한 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "남악 행정타운 상가",
        gear: "포스기 · 테이블오더",
        why: "도청 배후 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "신도시 단지 카페 · 학원가",
        gear: "카드단말기 · 키오스크",
        why: "젊은 가구 수요. 빠른 회전과 간편 결제.",
      },
    ],
    demolition:
      "무안은 전남도청이 자리한 남악신도시를 품은 행정 거점으로, 도청·법원·교육청이 밀집한 남악·오룡지구 신도심 상권과 무안읍 구도심이 함께 존재합니다. 도청 공무원과 대단지 생활 수요가 신도심 상권을 받치는 만큼 업무시설 이전에 따른 사무실 원상복구와 상가 점포 교체가 함께 일어나, 철거·원상복구 수요가 이어지는 지역입니다.",
    nearby: ["남악신도시", "오룡지구", "무안읍"],
  },
};

// ===== 제주 지역 데이터 (7곳) =====
// build-worker.js가 이 파일을 읽어 worker.js로 합칩니다.
// 제주 상권 추가 시 이 파일에 항목을 더하고, index.html의 SIDO(제주)도 함께 수정하세요.

const REGIONS_JEJU = {
  "제주": {
    slug: "jeju",
    sido: "제주특별자치도 제주시",
    context:
      "제주는 제주시청 대학로 먹자골목을 중심으로 형성된 제주 최대 번화가로, 제주대 학생과 도심 직장인 수요가 받쳐주는 유동 중심 상권입니다. 카페·음식점·주점이 빽빽하게 들어선 대학로 일대와 칠성로 구도심이 함께 존재해, 외식 점포의 신규 개업 단말기 설치와 노포 교체가 활발하게 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "대학로 호프 · 요리주점",
        gear: "포스기 · 테이블오더",
        why: "대학가 야간 수요. 좌석·주문 관리에 유리.",
      },
      {
        biz: "칠성로 구도심 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "구도심 노포. 간편 설치와 안정 결제.",
      },
    ],
    demolition:
      "구도심 점포 교체와 번화가 회전이 빨라, 철거·원상복구 수요가 꾸준한 상권입니다.",
    nearby: ["제주시청", "대학로", "칠성로"],
  },
  "노형동": {
    slug: "nohyeong",
    sido: "제주특별자치도 제주시",
    context:
      "노형동은 제주시 서부의 신시가지로, 대단지 아파트와 오피스가 밀집한 제주 핵심 신상권입니다. 신제주 생활권의 젊은 가구와 직장인 수요가 두텁고, 드림타워 복합리조트 일대까지 더해져, 외식·카페 신규 개업 단말기 설치와 회전 빠른 매장의 결제 수요가 두드러지는 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "학원 · 소형 매장"],
    extraRows: [
      {
        biz: "신시가지 단지 상가",
        gear: "포스기 · 테이블오더",
        why: "신도심 배후 수요. 좌석·메뉴 관리에 유리.",
      },
      {
        biz: "오피스가 카페 · 학원가",
        gear: "카드단말기 · 키오스크",
        why: "직장인·학부모 수요. 빠른 회전과 간편 결제.",
      },
    ],
    demolition:
      "신시가지 점포 입점과 업종 교체가 이어져, 철거·원상복구 수요가 발생하는 상권입니다.",
    nearby: ["신제주", "드림타워", "한라병원"],
  },
  "연동": {
    slug: "yeondong-jj",
    sido: "제주특별자치도 제주시",
    context:
      "연동은 누웨마루거리와 면세점을 끼고 형성된 제주 대표 관광·쇼핑 번화가로, 내국인·외국인 관광객이 사철 몰리는 상권입니다. 면세 쇼핑과 호텔이 밀집해 외식·카페·뷰티 점포 수요가 두텁고, 관광객 회전이 빨라, 신규 개업 단말기 설치와 간편 결제 수요가 두드러지는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "누웨마루 관광 상가",
        gear: "카드단말기 · 무선 단말기",
        why: "관광객 회전 빠름. 간편 설치와 결제.",
      },
      {
        biz: "면세 · 호텔 인근 점포",
        gear: "포스기 · 키오스크",
        why: "쇼핑·관광 수요. 빠른 주문·결제에 유리.",
      },
    ],
    demolition:
      "관광 상권 회전이 빨라 인테리어 철거와 원상복구 수요가 꾸준한 상권입니다.",
    nearby: ["누웨마루거리", "신라면세점", "제원사거리"],
  },
  "애월": {
    slug: "aewol",
    sido: "제주특별자치도 제주시",
    context:
      "애월은 해안도로를 따라 카페거리가 전국구로 알려진 제주 서부의 관광 거점으로, 오션뷰 카페와 베이커리·브런치 점포가 밀집해 있습니다. 한담해변·곽지해변 일대 관광 유동이 사철 이어지고 신규 카페 개업이 활발해, 관광지 점포의 단말기 설치와 회전 빠른 결제 수요가 두드러지는 지역입니다.",
    emphasis: ["카페", "음식점 · 고깃집", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "해안 오션뷰 카페 · 베이커리",
        gear: "포스기 · 키오스크",
        why: "관광객 회전 빠름. 빠른 주문·결제에 유리.",
      },
      {
        biz: "관광지 음식점 · 횟집",
        gear: "카드단말기 · 무선 단말기",
        why: "해안 관광 수요. 간편 설치와 결제.",
      },
    ],
    demolition:
      "관광 카페 상권 확장과 콘셉트 교체가 잦아, 철거·원상복구 수요가 꾸준한 상권입니다.",
    nearby: ["한담해변", "곽지해변", "애월읍"],
  },
  "서귀포": {
    slug: "seogwipo",
    sido: "제주특별자치도 서귀포시",
    context:
      "서귀포는 매일올레시장과 중앙로터리를 중심으로 형성된 서귀포시 생활 상권으로, 시내 주민과 올레길·이중섭거리 관광 수요가 함께 받쳐줍니다. 전통시장과 구도심 점포가 두텁고 관광 먹거리 상권이 더해져, 노포의 단말기 교체와 관광지 음식점·카페의 신규 개업 설치가 함께 발생하는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "올레시장 · 전통시장 점포",
        gear: "카드단말기 · 무선 단말기",
        why: "시장 노포. 간편 설치와 안정 결제.",
      },
      {
        biz: "이중섭거리 관광 카페",
        gear: "포스기 · 키오스크",
        why: "관광 유동 수요. 빠른 주문·결제.",
      },
    ],
    demolition:
      "구도심 점포 교체와 관광 상권 정비가 이어져, 철거·원상복구 수요가 발생하는 상권입니다.",
    nearby: ["매일올레시장", "중앙로터리", "이중섭거리"],
  },
  "중문": {
    slug: "jungmun",
    sido: "제주특별자치도 서귀포시",
    context:
      "중문은 중문관광단지를 중심으로 호텔·리조트가 밀집한 제주 대표 관광 상권으로, 내국인·외국인 관광객과 마이스 수요가 사철 이어집니다. 단지 내외 음식점·카페와 관광객 대상 점포가 두텁고, 회전 빠른 관광 결제 수요가 커, 신규 개업 단말기 설치와 간편 결제 장비 수요가 두드러지는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "분식 · 패스트푸드"],
    extraRows: [
      {
        biz: "관광단지 음식점 · 카페",
        gear: "포스기 · 무선 단말기",
        why: "리조트 관광 수요. 좌석·홀 결제에 유리.",
      },
      {
        biz: "호텔 인근 관광 점포",
        gear: "카드단말기 · 키오스크",
        why: "관광객 회전 빠름. 빠른 주문·결제.",
      },
    ],
    demolition:
      "관광단지 점포 교체와 콘셉트 정비가 이어져, 철거·원상복구 수요가 발생하는 상권입니다.",
    nearby: ["중문관광단지", "여미지식물원", "색달해변"],
  },
  "성산": {
    slug: "seongsan",
    sido: "제주특별자치도 서귀포시",
    context:
      "성산은 성산일출봉과 우도행 선착장을 낀 제주 동부의 관광 관문으로, 일출봉·섭지코지 관광객이 사철 몰리는 상권입니다. 해산물 식당과 관광 카페·기념품 점포가 밀집해, 관광지 점포의 신규 개업 단말기 설치와 회전 빠른 결제 수요가 두드러지는 지역입니다.",
    emphasis: ["음식점 · 고깃집", "카페", "1인 · 팝업 매장"],
    extraRows: [
      {
        biz: "일출봉 관광 해산물 식당",
        gear: "포스기 · 무선 단말기",
        why: "관광 식당 수요. 좌석·홀 결제에 유리.",
      },
      {
        biz: "선착장 기념품 · 카페",
        gear: "카드단말기 · 키오스크",
        why: "우도행 관광객 회전. 간편·빠른 결제.",
      },
    ],
    demolition:
      "동부 관광 상권 확장과 점포 교체가 잦아, 철거·원상복구 수요가 꾸준한 상권입니다.",
    nearby: ["성산일출봉", "섭지코지", "우도선착장"],
  },
};

const REGIONS = Object.assign({},
  REGIONS_SEOUL,
  REGIONS_GYEONGGI,
  REGIONS_INCHEON,
  REGIONS_BUSAN,
  REGIONS_DAEGU,
  REGIONS_GWANGJU,
  REGIONS_DAEJEON,
  REGIONS_ULSAN,
  REGIONS_SEJONG,
  REGIONS_CHUNGBUK,
  REGIONS_CHUNGNAM,
  REGIONS_GANGWON,
  REGIONS_GYEONGBUK,
  REGIONS_GYEONGNAM,
  REGIONS_JEONBUK,
  REGIONS_JEONNAM,
  REGIONS_JEJU
);

// --- 키워드 데이터 ---
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

  "철거": {
    // === 철거 페이지를 켤 지역 화이트리스트 ===
    // 여기에 지역명이 있는 지역만 /{지역}/철거 페이지가 생성됩니다.
    // 새 시·도 서두 보강이 끝나면 그 지역명들을 아래 배열에 추가하세요.
    // (강원·제주는 철거 미진행 → 영구히 목록에서 제외)
    allowRegions: [
      // 서울 (6)
      "강남역", "홍대", "성수", "건대", "잠실", "신촌",
      // 인천 (7)
      "부평", "송도", "구월동", "청라", "검단", "영종도", "인천논현",
      // 경기 (16)
      "광교", "영통", "동탄1", "동탄2", "분당", "판교", "일산", "평촌",
      "중동", "별내", "다산", "광명", "철산", "운정", "김포한강", "평택고덕",
      // 충북 (10)
      "성안길", "지웰시티", "청주대", "오송", "오창", "충주", "제천",
      "충북혁신도시", "진천", "옥천",
      // 충남 (8)
      "천안 서북구", "천안 동남구", "아산", "당진", "서산", "논산", "태안", "공주",
      // 부산 (8)
      "서면", "해운대", "남포동", "광안리", "전포", "부산대", "부산역", "명지",
      // 대구 (8)
      "동성로", "수성못", "들안길", "칠곡", "경북대", "동대구역", "앞산", "율하지구",
      // 광주 (8)
      "충장로", "상무지구", "첨단지구", "수완지구", "전남대", "봉선동", "동명동", "하남지구",
      // 대전 (8)
      "둔산동", "은행동", "봉명동", "궁동", "도안신도시", "관저동", "노은지구", "테크노밸리",
      // 울산 (8)
      "삼산동", "성남동", "무거동", "달동", "전하동", "옥동", "천상지구", "송정지구",
      // 세종 (6)
      "나성동", "보람동", "도담동", "아름동", "새롬동", "조치원",
      // 경북 (10)
      "포항", "구미", "경주", "안동", "김천", "경산", "영주", "영천", "상주", "문경",
      // 경남 (8)
      "상남동", "마산", "진해", "김해", "양산", "진주", "거제", "통영",
      // 전북 (8)
      "객사", "신시가지", "한옥마을", "익산", "군산", "정읍", "남원", "완주",
      // 전남 (6)
      "순천", "여수", "목포", "광양", "나주", "무안",
    ],
    title: "{{REGION}} 철거·원상복구 | 세이브샵 - 무료 현장견적, 폐기물 처리까지",
    description:
      "{{REGION}} 상가·점포 철거와 원상복구, 전화 한 통이면 끝. 음식점·카페 인테리어 철거부터 사무실 원상복구, 간판·전기 철거, 폐업 점포 정리까지. 무료 현장견적·폐기물 처리 포함. 상담 010-4668-4942.",
    heroTitle: "{{REGION}} 철거·원상복구",
    crumb: "철거·원상복구",
    highlight: null,
    // 하이어로 칩 — 철거용
    heroTags: ["무료 현장견적", "폐기물 처리 포함", "원상복구 범위 시공", "당일 상담"],
    // 키워드별 섹션 노출 제어 (B안)
    sections: { products: false, cardflow: false },
    intro: {
      label: "DEMOLITION",
      heading: "점포 철거·원상복구,<br>현장에 맞게 정확하게",
      // 첫 문단을 지역의 demolition 필드에서 가져옴
      contextField: "demolition",
      // 매트릭스 헤더/안내문 철거용으로 교체 + 지역 extraRows 차단
      allowExtraRows: false,
      matrixHead: { c1: "철거 유형", c2: "작업 범위", c3: "주요 내용" },
      matrixNote:
        "※ 그 외 현장도 상황에 맞춰 안내해 드립니다. {{REGION}} 담당자와 상담으로 확인하세요.",
      bodyPool: [
        [
          "음식점 주방 철거인지, 사무실 원상복구인지, 간판·전기만 정리하면 되는지에 따라 작업 범위와 비용이 크게 달라집니다. 업종과 평수, 현재 상태를 알려주시면 현장에 맞는 방식을 상담해 드립니다.",
          "같은 점포 철거라도 주방 설비가 있는 음식점과 인테리어 위주의 카페는 작업이 전혀 다릅니다. 매장 형태와 평수를 알려주시면 꼭 필요한 범위만 정확하게 안내해 드립니다.",
          "철거는 현장마다 조건이 달라 일률적인 견적이 어렵습니다. 업종·평수·바닥과 천장 상태를 알려주시면 불필요한 작업 없이 필요한 범위만 제안해 드립니다.",
        ],
        [
          "최근에는 임대차 계약상 원상복구 범위를 두고 임대인과 의견이 갈리는 경우가 많아, 철거 전에 복구 범위를 명확히 확인하는 사장님이 늘고 있습니다. {{REGION}}에서도 현장 확인 후 범위를 분명히 정리해 진행합니다.",
          "폐업·이전이 결정되면 원상복구를 어디까지 해야 하는지가 가장 큰 고민입니다. {{REGION}} 현장을 직접 확인해 계약 조건에 맞는 범위를 짚어드리고, 과한 작업으로 비용이 새지 않도록 안내합니다.",
          "원상복구는 범위를 잘못 잡으면 비용이 크게 늘기도, 임대인과 분쟁이 생기기도 합니다. {{REGION}}에서도 현장과 계약 내용을 함께 확인해 적정 범위를 잡아드립니다.",
        ],
        [
          "현장 견적은 무료로 진행하며, 철거 후 발생하는 폐기물 처리까지 포함해 정찰 견적으로 안내드립니다. 추가 비용 걱정 없이 한 번에 마무리하실 수 있습니다.",
          "출장·현장 견적 비용은 받지 않습니다. 폐기물 처리와 정리까지 포함한 명확한 견적으로, 진행 중 금액이 늘어나는 일이 없도록 책임지고 안내드립니다.",
          "무료 현장 견적에 폐기물 처리까지 포함해 진행합니다. 별도 업체를 따로 부를 필요 없이, 철거부터 정리·마감까지 한 번에 끝내드립니다.",
        ],
      ],
      matrix: [
        { biz: "음식점·주방 철거", gear: "주방설비·덕트·바닥", why: "그리스트랩·배관 정리, 유증기 덕트 해체." },
        { biz: "카페·인테리어 철거", gear: "목공·조명·바닥재", why: "매립 배선 정리, 바닥 원상복구." },
        { biz: "사무실 원상복구", gear: "파티션·바닥·도장", why: "임대차 계약상 원상복구 범위 시공." },
        { biz: "간판·전기 철거", gear: "외부 간판·전기설비", why: "옥외광고물 철거, 전기 안전 마감." },
        { biz: "폐업 점포 정리", gear: "집기·폐기물 일괄", why: "잔존물·폐기물 처리 포함." },
      ],
      benefitsHead: {
        label: "WHY SAVESHOP",
        title: "신속 · 정직 · 정확<br><span class=\"hl\">믿을 수 있는 시공.</span>",
        desc: "현장에 맞는 정확한 견적과 책임 시공으로 사장님의 마무리를 돕겠습니다.",
      },
      benefits: [
        { icon: "check", title: "무료 현장 견적", desc: "출장비·견적비 0원. 현장을 직접 확인하고 정확한 범위와 금액을 안내드립니다." },
        { icon: "star", title: "폐기물 처리까지 한 번에", desc: "철거 후 폐기물 처리와 정리까지 포함. 별도 업체를 따로 부를 필요가 없습니다." },
        { icon: "calendar", title: "원상복구 범위 책임 시공", desc: "임대차 계약 조건에 맞춰 원상복구 범위를 잡고, 책임지고 마감해 드립니다." },
      ],
    },
    faq: [
      { q: "철거 비용은 어떻게 정해지나요?", a: "업종·평수·철거 범위·폐기물 양에 따라 달라집니다. {{REGION}} 현장을 직접 확인한 뒤 무료로 정찰 견적을 안내드립니다." },
      { q: "철거 작업은 얼마나 걸리나요?", a: "일반 점포 기준 하루~이틀 내 마무리되는 경우가 많습니다. 규모와 범위에 따라 현장 확인 후 정확한 일정을 안내드립니다." },
      { q: "폐기물 처리도 포함되나요?", a: "네. 철거 후 발생하는 폐기물 처리와 현장 정리까지 견적에 포함해 진행합니다." },
      { q: "임대차 원상복구는 어디까지 해야 하나요?", a: "계약서상 원상복구 범위에 따라 다릅니다. 현장과 계약 내용을 함께 확인해 적정 범위를 짚어드리고, 과한 작업 없이 진행합니다." },
      { q: "영업 중에 부분 철거도 가능한가요?", a: "가능합니다. 일부 구역만 철거하거나 야간·휴무일에 맞춰 진행하는 등 매장 상황에 맞춰 조율해 드립니다." },
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
      link: "/{{REGION}}/철거",
      // 철거 페이지가 없는 지역(강원·제주)은 render.js에서 /demolition으로 폴백
      fallbackLink: "/demolition",
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

// --- 렌더링 + 라우팅 ---
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
    const demoAllow = (KEYWORDS["철거"] && KEYWORDS["철거"].allowRegions) || [];
    const cards = liveItems
      .map((it) => {
        // 링크가 {{REGION}}/철거를 가리키는데 해당 지역에 철거 페이지가 없으면
        // (강원·제주 등 allowRegions 미포함) fallbackLink(/demolition)로 폴백
        let linkTpl = it.link || "#";
        if (
          it.fallbackLink &&
          /{{REGION}}\/철거/.test(linkTpl) &&
          demoAllow.indexOf(regionName) === -1
        ) {
          linkTpl = it.fallbackLink;
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
      const staticPaths = ["/", "/card-terminal", "/demolition"];
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
          return env.ASSETS.fetch(request); // 정적 처리(404 또는 /demolition 등)로 넘김
        }
        const html = render(region, keyword);
        return new Response(html, {
          headers: { "content-type": "text/html;charset=UTF-8" },
        });
      }
    }

    // 그 외 모든 요청은 기존 정적 파일로 넘김
    return env.ASSETS.fetch(request);
  },
};
