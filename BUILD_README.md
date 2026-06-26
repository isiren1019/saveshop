# 세이브샵 빌드 구조 안내 (빌드 분리 이후)

worker.js가 너무 커져서, 데이터를 시·도별 파일로 쪼개고 빌드로 합치는 구조로 바꿨습니다.
**worker.js는 이제 자동 생성 파일입니다. 직접 수정하지 마세요.**

## 폴더 구조

```
/ (루트)
├─ worker.js            ← 빌드 산출물 (자동 생성, 직접 수정 ❌) — Cloudflare가 이걸 배포
├─ build-worker.js      ← 빌드 스크립트
├─ build.sh             ← 원클릭 빌드 (build-worker.js + 문법검사)
├─ wrangler.jsonc       ← 그대로
├─ public/              ← 정적 파일·이미지 (index.html, card-terminal.html 등)
└─ src/                 ← ★ 여기를 수정합니다
   ├─ template.js        ← 페이지 HTML 템플릿 (디자인 수정 시)
   ├─ keywords.js        ← 키워드 데이터 (키워드 추가 시) + 크로스셀 + FAQ 스타일
   ├─ render.js          ← 렌더링·라우팅 로직 (거의 손댈 일 없음)
   └─ regions/           ← 시·도별 지역 데이터
      ├─ seoul.js  gyeonggi.js  incheon.js  busan.js  daegu.js  gwangju.js
      ├─ daejeon.js  ulsan.js  sejong.js  chungbuk.js  chungnam.js  gangwon.js
      └─ gyeongbuk.js  gyeongnam.js  jeonbuk.js  jeonnam.js  jeju.js
```

## 작업 워크플로 (★ 가장 중요)

### 지역(상권) 추가/수정
1. `src/regions/{시·도}.js` 열어서 항목 추가 (예: 경남 → `gyeongnam.js`)
2. `index.html`(= public/index.html)의 `SIDO` 배열에서 해당 시·도에 상권명 추가
   - ※ 이건 빌드 분리 전과 똑같습니다. REGIONS와 SIDO는 항상 짝을 맞춰야 합니다.
3. **빌드 실행:** `node build-worker.js`  (또는 `./build.sh`)
4. GitHub Desktop으로 **수정한 src 파일 + worker.js + index.html** 커밋·푸시

### 키워드 추가 (포스기·키오스크 등)
1. `src/keywords.js`의 `KEYWORDS`에 항목 추가 (bodyPool 포함)
2. **빌드 실행:** `node build-worker.js`
3. worker.js + keywords.js 커밋·푸시

### 디자인/템플릿 수정
1. `src/template.js` 수정
2. 빌드 실행 → worker.js + template.js 커밋·푸시

## ⚠️ 잊지 말 것
- **데이터를 고친 뒤 `node build-worker.js`를 꼭 실행**해야 worker.js에 반영됩니다.
  빌드를 안 하면 src만 바뀌고 실제 사이트(worker.js)는 그대로입니다.
- worker.js는 손으로 고치지 마세요. 다음 빌드 때 덮어써집니다.

## 빌드가 하는 일
`build-worker.js`는 `src/` 안의 조각들을 읽어서 순서대로 이어 붙여 루트 `worker.js` 하나를 만듭니다.
시·도 파일들은 `REGIONS_SEOUL`, `REGIONS_GYEONGGI` … 처럼 따로 선언된 뒤
`const REGIONS = Object.assign({}, ...)`로 하나로 병합됩니다.
빌드 순서는 서울 → 경기 → … → 제주 (index.html SIDO 순서와 동일).
