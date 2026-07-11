#!/usr/bin/env bash
# SKALA 강의안 교재 HTML → PDF (Chrome 헤드리스)
set -e
DIR="$(cd "$(dirname "$0")/.." && pwd)"
HTML="$DIR/dist-textbook/textbook.html"
PDF="$DIR/dist-textbook/SKALA_4기_실습교재_이애본.pdf"

CHROME="$HOME/.cache/puppeteer/chrome/mac-148.0.7778.167/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
[ -x "$CHROME" ] || CHROME="$(ls -d "$HOME"/.cache/puppeteer/chrome/*/chrome-mac*/Google\ Chrome\ for\ Testing.app/Contents/MacOS/Google\ Chrome\ for\ Testing 2>/dev/null | head -1)"

node "$DIR/scripts/build-textbook.mjs"

"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PDF" "file://$HTML" 2>/dev/null

echo "PDF 생성: $PDF"
ls -lh "$PDF" | awk '{print $5, $9}'
