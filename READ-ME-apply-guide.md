# 세이브샵 — 통합 기록기(tracker.js) 연결 (적용 가이드)

작업일: 2026-11-10 · 기준 커밋: `c5d3359`

---

## 무엇이 바뀌나

**1. `public/js/tracker.js` 신규 추가**
첨부해주신 통합 기록기 v3를 그대로 넣고 두 곳만 바꿨습니다.

- `SITE = '세이브샵'`
- `page` 값에 `decodeURIComponent` 적용 → 대시보드에 `/강남역/포스기` 로 찍힙니다
  (적용 안 하면 `/%EA%B0%95%EB%82%A8%EC%97%AD/%ED%8F%AC%EC%8A%A4%EA%B8%B0`)
  ※ 다른 사이트에도 무해한 개선이니, 공용 tracker.js 원본에도 같이 반영하시는 걸 권합니다.

**2. Worker가 모든 HTML에 자동 주입**
`src/render.js` 에 HTMLRewriter를 붙여, `content-type` 이 `text/html` 인 응답의
`</body>` 바로 앞에 `<script src="/js/tracker.js" defer></script>` 를 끼워 넣습니다.
HTML이 아닌 응답(이미지·favicon·webmanifest·xml·js)은 건드리지 않습니다.

> ⚠️ **정적 HTML 파일에 같은 script 태그를 직접 넣지 마세요.** Worker가 자동으로 넣으므로 두 번 로드됩니다.

**3. `wrangler.jsonc` 에 `run_worker_first` 추가 — 이게 꼭 필요합니다**
Cloudflare 기본 동작은 "자산 우선"입니다. 요청에 맞는 정적 파일이 있으면 그걸 바로 서빙하고
**Worker 스크립트를 아예 호출하지 않습니다.** 그래서 설정을 안 바꾸면
지역 페이지 339개에만 tracker가 붙고 **정적 4페이지(홈·카드단말기·철거·스마트자판기)는 누락**됩니다.

실제로 로컬 Worker 런타임에서 양쪽을 비교해 확인했습니다.

| | 홈 | 카드단말기 | 철거 | 스마트자판기 | 지역페이지 |
|---|---|---|---|---|---|
| `run_worker_first` 없음 | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 | ✅ 1 |
| `run_worker_first` 있음 | ✅ 1 | ✅ 1 | ✅ 1 | ✅ 1 | ✅ 1 |

목록에는 HTML 경로만 넣었습니다. 이미지·파비콘·`/js/tracker.js` 는 목록에 없으므로
기존처럼 자산 우선으로 서빙되고 Worker를 호출하지 않습니다 → **요청 비용·지연 영향 없음.**

**4. 폼 제출 시 `폼제출` 이벤트 전송**
상담 폼 접수가 성공하면 `zenaTrack('폼제출')` 을 호출합니다(6곳 전부).
대시보드에서 **페이지열람 → 전화클릭 → 폼제출** 전환율을 한 화면에서 볼 수 있습니다.
기존 상담 시트·알림 메일 접수는 그대로 유지됩니다.

**5. 기존 8월 전화클릭 추적은 그대로 유지**
말씀대로 건드리지 않았습니다. 따라서 모바일에서 ☎ 를 누르면

- 구 앱스 스크립트 "전화클릭" 시트 → 1건
- 통합 대시보드 `전화클릭` → 1건

**같은 클릭이 두 곳에 각각 1건씩** 쌓입니다. 두 숫자를 합산하지 않도록만 주의하세요.
(참고: 구 비콘은 모바일 전용이라 PC 클릭은 통합 대시보드에만 남습니다.)

---

## 업로드 (10개 파일)

`saveshop-업로드` 폴더 안의 파일을 `isiren1019/saveshop` 레포 각 위치로 올립니다.

| 파일 | 올리는 위치 |
|---|---|
| `worker.js` | 레포 **루트** |
| `wrangler.jsonc` | 레포 **루트** |
| `src/render.js` | `src/` |
| `src/template.js` | `src/` |
| `src/template-demolition.js` | `src/` |
| `public/index.html` | `public/` |
| `public/card-terminal.html` | `public/` |
| `public/demolition.html` | `public/` |
| `public/vending.html` | `public/` |
| **`public/js/tracker.js`** | `public/js/` ← **새 폴더** |

`Add file` → `Upload files` → 드래그 → Commit.

> 💡 `public/js/` 폴더는 처음 생기는 폴더입니다. GitHub 웹에서 `public/` 로 들어간 뒤
> 업로드 화면에 `js` 폴더째로 드래그하면 경로가 그대로 만들어집니다.
> 또는 `Add file → Create new file` 에서 파일명에 `js/tracker.js` 로 입력해도 폴더가 생성됩니다.

**`worker.js` 와 `wrangler.jsonc` 둘 다 올려야 합니다.** `wrangler.jsonc` 가 빠지면 정적 4페이지에 tracker가 붙지 않습니다.

---

## 배포 후 확인 (2분)

1. `thesaveshop.com` 접속 → 페이지 소스 보기 → 맨 아래 `</body>` 바로 위에
   `<script src="/js/tracker.js" defer></script>` **한 줄만** 있는지 확인 (두 줄이면 중복)
2. `thesaveshop.com/js/tracker.js` 직접 열어서 `SITE = '세이브샵'` 확인
3. 정적 4페이지 + 지역 페이지 1곳(예: `/강남역/포스기`)을 각각 열고,
   통합 대시보드 시트에 `페이지열람` 5건이 `/`, `/card-terminal`, `/demolition`, `/vending`, `/강남역/포스기` 로 들어왔는지 확인
   → **한글이 디코딩돼서 보이는지** 같이 확인
4. 휴대폰에서 ☎ 클릭 → `전화클릭` 기록 확인
5. 테스트 문의 1건 접수 → `폼제출` 기록 + 기존 상담 시트·메일 확인
6. 반영이 안 보이면 Cloudflare 캐시 삭제(캐싱 → 구성 → 모두 제거)

---

## 검증 완료 내역

실제 Cloudflare Worker 런타임(`wrangler dev --local`, workerd)에 올려서 확인했습니다.

**주입 정확성**

- HTML 5종(`/`, `/card-terminal`, `/demolition`, `/vending`, 지역 동적페이지) — tracker 태그 **정확히 1개**, 위치는 `</body>` 바로 앞
- 태그를 제거하면 원본 HTML과 **바이트 단위로 완전 일치** → 다른 변형 없음
- 비HTML 7종(`/js/tracker.js`, `favicon.svg`, `favicon.ico`, `site.webmanifest`, `sitemap.xml`, `robots.txt`, `images/*.png`) — 주입 0건, content-type·크기 변화 없음
- `run_worker_first` 유무로 A/B 비교해 설정 필요성 입증(위 표)

**브라우저 동작 (Playwright, iPhone 13 / PC 1280)**

- `페이지열람`: 전 페이지 1건씩, `site:세이브샵`, 한글 경로 디코딩 확인 (`/강남역/포스기`)
- `신규`/`재방문` 판정, `모바일`/`PC` 기기 판정 정상
- utm 파라미터(`?utm_source=naver&utm_medium=cpc&utm_campaign=pos8`) 전달 확인
- Googlebot UA → `bot: true` 표시 확인
- `전화클릭`: 모바일에서 구 비콘 + 통합 tracker **각 1건**(의도대로 둘 다 유지), PC는 통합만
- `폼제출`: 홈 / 카드단말기 / 철거 / 스마트자판기 / 지역 템플릿 전부 1건씩 + 기존 접수 정상
- 연락처 자동 하이픈 기존 기능 무영향 (`01012345678`→`010-1234-5678`, `0212345678`→`02-1234-5678`)
- 콘솔 에러 0

**기존 기능 무영향**

- 빌드 정상(5,898줄 / 351.1KB), ESM 문법 검사 통과
- `sitemap.xml` 343개 URL 정상, `robots.txt` 정상
- 카드단말기 142 / 철거 125 / 포스기 72 렌더 정상
- `src/keywords.js`, `src/regions/*` 무변경

---

## 통합 대시보드 쪽(받는 앱스 스크립트)이 필요하면

이 작업은 **보내는 쪽**만 완료된 상태입니다. 받는 쪽 앱스 스크립트
(`AKfycbzgldxTSNY_...` 웹앱)는 제가 코드를 본 적이 없어서 손대지 않았습니다.

대시보드를 같이 만들거나 점검하려면 그 앱스 스크립트 코드를 붙여주세요. 특히 확인이 필요한 부분:

- `site` 컬럼으로 사이트별 분리가 되어 있는지 (여러 사이트가 한 시트에 쌓이는 구조인지)
- `event` 값 `페이지열람` / `전화클릭` / `카카오클릭` / `폼제출` 을 모두 받는지
- `visitor` + `visit_type` 으로 순방문자(UV)를 집계하는지
- `bot: true` 행을 집계에서 제외하는지 (제외 안 하면 크롤러 트래픽이 섞여 유입량이 부풀려집니다)
