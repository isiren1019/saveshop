#!/usr/bin/env bash
# 세이브샵 worker.js 빌드 (원클릭)
# 사용법:  ./build.sh   또는   bash build.sh
set -e
echo "▶ worker.js 빌드 중..."
node build-worker.js
echo "▶ 문법 검사 중..."
node --check worker.js
echo "✅ 빌드 + 문법 검사 완료. 이제 worker.js 와 수정한 src 파일을 커밋하세요."
