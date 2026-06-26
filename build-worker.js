// ===== 세이브샵 worker.js 빌드 스크립트 =====
// 사용법:  node build-worker.js
// src/ 안의 조각 파일들을 읽어 루트 worker.js 하나로 합칩니다.
// 데이터 수정 후 반드시 이 스크립트를 실행한 뒤 worker.js를 커밋하세요.

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const REGIONS_DIR = path.join(SRC, 'regions');

// 시·도 빌드 순서 (index.html SIDO 배열 순서와 맞춤)
const REGION_ORDER = [
  'seoul', 'gyeonggi', 'incheon', 'busan', 'daegu', 'gwangju', 'daejeon',
  'ulsan', 'sejong', 'chungbuk', 'chungnam', 'gangwon', 'gyeongbuk',
  'gyeongnam', 'jeonbuk', 'jeonnam', 'jeju'
];

// 조각 파일에서 'const ... = ' 부터 'module.exports' 직전까지의 본문만 뽑아낸다.
// (require/module.exports 군더더기를 제거하고 순수 선언부만 연결)
function extractBody(filePath) {
  let txt = fs.readFileSync(filePath, 'utf8');
  // module.exports = {...}; 줄 제거
  txt = txt.replace(/\n*module\.exports\s*=\s*\{[^}]*\};\s*$/m, '\n');
  return txt.trimEnd();
}

// 1) 헤더
let out = '';
out += '// ===== 세이브샵 지역 페이지 동적 생성 Worker =====\n';
out += '// 자동 생성된 파일 (build-worker.js로 빌드). 직접 수정하지 말 것.\n';
out += '// 데이터 수정은 src/ 안의 파일에서 하고, "node build-worker.js"로 다시 빌드하세요.\n\n';

// 2) 템플릿
out += '// --- 템플릿 ---\n';
out += extractBody(path.join(SRC, 'template.js')) + '\n\n';

// 3) 지역 데이터 (시·도별 파일을 순서대로 연결 후 REGIONS로 병합)
out += '// --- 지역 데이터 (시·도별, src/regions/) ---\n';
const regionVarNames = [];
for (const name of REGION_ORDER) {
  const fp = path.join(REGIONS_DIR, name + '.js');
  if (!fs.existsSync(fp)) { console.error('❌ 누락된 지역 파일:', fp); process.exit(1); }
  out += extractBody(fp) + '\n\n';
  regionVarNames.push('REGIONS_' + name.toUpperCase());
}
// 시·도 상수들을 하나의 REGIONS로 병합
out += 'const REGIONS = Object.assign({},\n  ' + regionVarNames.join(',\n  ') + '\n);\n\n';

// 4) 키워드 데이터 (+ CROSS_SELL + FAQ_CSS)
out += '// --- 키워드 데이터 ---\n';
out += extractBody(path.join(SRC, 'keywords.js')) + '\n\n';

// 5) 렌더 + 라우팅
out += '// --- 렌더링 + 라우팅 ---\n';
out += extractBody(path.join(SRC, 'render.js')) + '\n';

fs.writeFileSync(path.join(__dirname, 'worker.js'), out);

// 빌드 후 자가 검증: 문법 체크용으로 줄 수/크기 출력
const lines = out.split('\n').length;
const kb = (Buffer.byteLength(out, 'utf8') / 1024).toFixed(1);
console.log('✅ worker.js 빌드 완료:', lines + '줄,', kb + 'KB');
console.log('   시·도', regionVarNames.length + '개 병합 →', 'REGIONS');
