// ===== 세이브샵 지역 페이지 동적 생성 Worker =====
// 자동 생성된 파일 (build-worker.js로 빌드). 직접 수정하지 말 것.

// --- 템플릿 ---
const TEMPLATE = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
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

</script>
</body>
</html>
`;

// --- 지역 데이터 ---
// 지역 데이터 — 시·신도시 단위
// 각 지역: 표시이름(한글) + 슬러그 + 시도 + 상권특성(context) + 강조업종(emphasis) + 철거수요(demolition) + 인근(nearby)
// context/emphasis는 실제 상권 검색 기반 초안 — 지니가 현장 감각으로 다듬을 것.

const REGIONS = {
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
      "신축 상가와 대형 복합몰이 많아 입·퇴점 회전이 잦고, 인테리어 교체·원상복구 수요가 함께 발생하는 지역입니다.",
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
      "대학가·학원가 특성상 점포 교체가 잦아 폐업·이전에 따른 철거와 원상복구 수요가 많은 지역입니다.",
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
      "조성 초기 상권의 노후 점포 교체와 대형 상업시설 리모델링이 이어지며 철거·원상복구 수요가 발생하는 지역입니다.",
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
      "신축 상가 입점이 계속되는 지역으로, 신규 인테리어 시공과 기존 점포 원상복구가 함께 발생합니다.",
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
      "조성 30년이 넘은 1기 신도시로 노후 점포 리모델링과 업종 교체가 잦아 철거·원상복구 수요가 꾸준한 지역입니다.",
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
      "오피스 상권 특성상 임차 매장 교체가 잦아 입·퇴점에 따른 철거와 원상복구 수요가 발생하는 지역입니다.",
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
      "대형 스트리트 상권의 점포 교체가 잦고 노후 상가 리모델링이 이어지며 철거·원상복구 수요가 꾸준한 지역입니다.",
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
      "학원가·먹자골목 특성상 점포 교체가 잦아 폐업·이전에 따른 철거와 원상복구 수요가 많은 지역입니다.",
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
      "백화점·상업시설이 밀집한 도심 상권으로 점포 교체와 인테리어 리모델링에 따른 철거·원상복구 수요가 발생합니다.",
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
      "신축 상가 입점이 계속되는 신도시로, 신규 인테리어 시공과 기존 점포 원상복구가 함께 발생합니다.",
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
      "신축 상가 입점이 이어지는 신도시로, 신규 인테리어 시공과 기존 점포 원상복구가 함께 발생합니다.",
    nearby: ["별내", "도농", "구리"],
  },

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
      "임대료가 높고 점포 회전이 빠른 상권으로, 입·퇴점에 따른 철거와 원상복구 수요가 꾸준히 발생합니다.",
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
      "트렌드에 따라 점포 교체가 빠른 상권으로, 인테리어 시공과 원상복구 수요가 꾸준한 지역입니다.",
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
      "팝업·신규 매장 입점이 잦은 상권으로, 단기 인테리어 시공과 원상복구 수요가 활발한 지역입니다.",
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
      "대학가 먹자상권 특성상 점포 교체가 잦아 폐업·이전에 따른 철거와 원상복구 수요가 많은 지역입니다.",
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
      "상업시설과 주거가 밀집한 상권으로, 점포 교체와 인테리어 리모델링에 따른 철거·원상복구 수요가 발생합니다.",
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
      "대학가 상권 특성상 점포 교체가 잦아 폐업·이전에 따른 철거와 원상복구 수요가 많은 지역입니다.",
    nearby: ["이대", "홍대", "아현"],
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
      "노후 상가와 전통시장 점포 교체가 이어지는 상권으로, 리모델링과 원상복구 수요가 꾸준한 지역입니다.",
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
      "역세권 점포 교체와 상가 리모델링에 따른 철거·원상복구 수요가 발생하는 지역입니다.",
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
      "신축 상가 입점이 계속되는 신도시로, 신규 인테리어 시공과 기존 점포 원상복구가 함께 발생합니다.",
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
      "신축 상가 입점이 계속되는 신도시로, 신규 인테리어 시공과 기존 점포 원상복구가 함께 발생합니다.",
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
      "신축 상가 입점이 계속되는 신도시로, 신규 인테리어 시공과 기존 점포 원상복구가 함께 발생합니다.",
    nearby: ["평택역", "송탄", "안중"],
  },

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
      "점포 교체가 빠른 번화가로, 입·퇴점에 따른 철거와 원상복구 수요가 꾸준히 발생합니다.",
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
      "신규 상가 입점과 점포 교체가 이어지는 신도시로, 인테리어 시공과 원상복구 수요가 발생하는 지역입니다.",
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
      "점포 교체가 빠른 번화가로, 입·퇴점에 따른 철거와 원상복구 수요가 꾸준히 발생합니다.",
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
      "신축 상가 입점이 계속되는 신도시로, 신규 인테리어 시공과 기존 점포 원상복구가 함께 발생합니다.",
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
      "입주 초기 신도시로 신규 인테리어 시공 수요가 크고, 점포 교체에 따른 원상복구도 함께 발생합니다.",
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
      "신축 상가 입점이 계속되는 신도시로, 신규 인테리어 시공과 기존 점포 원상복구가 함께 발생합니다.",
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
      "신규 상가 입점과 점포 교체가 이어지는 상권으로, 인테리어 시공과 원상복구 수요가 발생하는 지역입니다.",
    nearby: ["소래", "논현", "서창"],
  },
};




// --- 키워드 데이터 ---
// 키워드별 데이터 — 방향 2 (키워드마다 제목·강조·본문·FAQ가 다름)
// {{REGION}} 자리는 Workers가 지역명으로 치환. 여기 데이터에는 지역을 넣지 않음.
// 우선 "카드단말기" 1개만 채운 초안. 확인 후 나머지 5개를 같은 틀로 채움.

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
      body: [
        "카운터가 고정 된 매장이고, 메뉴가 많지 않거나 단순 카드 결제가 필요하신 사장님들께 유선 단말기를 추천합니다. 이 밖에도 업종과 동선을 안내주시면 매장 최적화 단말기 추천 상담 드립니다.",
        "최근에는 포장 주문이 늘면서 키오스크를, 홀이 있는 음식점에서는 테이블오더를 카드단말기와 함께 도입하는 매장이 많습니다. {{REGION}}에서도 매장 형태에 맞춰 결제 장비를 한 번에 구성해 드립니다.",
        "설치비·관리비·위약금은 0원입니다. 카드사 가맹 심사, 단말기 설치, 사용법 교육 및 A/S까지 전담 매니저가 꼼꼼하게 상담 드리고 있습니다.",
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

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function render(regionName, keywordName) {
  const region = REGIONS[regionName];
  const kw = KEYWORDS[keywordName];
  if (!region) throw new Error("지역 없음: " + regionName);
  if (!kw) throw new Error("키워드 없음: " + keywordName);

  let html = TEMPLATE;

  // 지역 페이지는 URL이 /광교/카드단말기 처럼 한 단계 더 들어가 있어서
  // 상대경로(images/...)가 /광교/images/... 로 잘못 해석됨 → 절대경로(/images/)로 변환.
  // src="images/  와 JS 내부 "images/  (큰따옴표) 둘 다 처리. 이미 /images/ 인 건 건드리지 않음.
  html = html
    .replace(/src="images\//g, 'src="/images/')
    .replace(/(['"])images\/(products|reviews)\//g, '$1/images/$2/');

  // 키워드 본문 문단 → <p> 묶음
  const kwBody = kw.intro.body
    .map((p) => `<p style="font-size:1.02rem;line-height:1.9;color:#333;margin-bottom:1.2em">${p}</p>`)
    .join("\n");

  // 업종별 추천 매트릭스 → 표 (지역 강조 업종을 맨 위로 정렬)
  let typesHtml = "";
  if (kw.intro.matrix && kw.intro.matrix.length) {
    const emphasis = region.emphasis || [];
    // 기본 매트릭스 + 지역 전용 추가 줄(extraRows) 합치기
    const baseRows = [...kw.intro.matrix, ...(region.extraRows || [])];
    // 강조 업종을 앞으로 정렬
    const rows = baseRows.sort((a, b) => {
      const ai = emphasis.indexOf(a.biz);
      const bi = emphasis.indexOf(b.biz);
      const aw = ai === -1 ? 999 : ai;
      const bw = bi === -1 ? 999 : bi;
      return aw - bw;
    });
    const trs = rows
      .map((r) => {
        const hot = emphasis.includes(r.biz);
        return `<tr${hot ? ' class="hot"' : ""}><td class="biz">${r.biz}</td><td class="rec">${r.gear}</td><td class="why">${r.why}</td></tr>`;
      })
      .join("\n");
    typesHtml = `
    <div class="matrix-wrap rv" style="margin:2.6em 0 0">
      <table class="biz-matrix">
        <thead><tr><th>업종</th><th>추천 장비</th><th>이유</th></tr></thead>
        <tbody>${trs}</tbody>
      </table>
      <p class="matrix-note">※ 그 외 업종도 매장 환경에 맞춰 최적의 장비를 추천해 드립니다. ${regionName} 담당 매니저와 상담으로 확인하세요.</p>
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
  const liveItems = (CROSS_SELL.items || []).filter((i) => i.live);
  if (liveItems.length) {
    const cards = liveItems
      .map((it) => {
        const href = (it.link || "#").replace(/{{REGION}}/g, regionName);
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

  // 치환 맵
  const map = {
    "{{REGION}}": regionName,
    "{{HERO_TITLE}}": heroRaw,
    "{{KW_CRUMB}}": kw.crumb || "카드단말기",
    "{{KW_LABEL}}": kw.intro.label,
    "{{KW_HEADING}}": kw.intro.heading,
    "{{REGION_CONTEXT}}": region.context,
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
      const staticPaths = ["/", "/card-terminal.html", "/demolition.html"];
      for (const p of staticPaths) {
        urls.push({ loc: base + p, priority: p === "/" ? "1.0" : "0.8" });
      }

      // 지역 × 키워드 동적 페이지
      for (const region of Object.keys(REGIONS)) {
        for (const keyword of Object.keys(KEYWORDS)) {
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
