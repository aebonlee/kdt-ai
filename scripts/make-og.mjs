// OG(Open Graph) 미리보기 이미지 생성 스크립트
// 다크 블루 기반 5색 팔레트(navy/ocean/azure/sky/amber)를 사용한다.
//
// 사용법:
//   npm i -D sharp        # 이미지 렌더링용 (임시 설치)
//   node scripts/make-og.mjs
//   → public/og.png (1200x630) 생성
//
// sharp 는 SVG 를 PNG 로 래스터화하는 용도로만 쓰며, 생성 후 제거해도 된다.
import sharp from 'sharp'
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = resolve(__dirname, '../public/og.png')

// SKALA 브랜드 팔레트 (공식 사이트 기준)
const C = {
  indigo: '#0E1152',
  dark: '#020408',
  accent: '#3F51FF',
  accent2: '#6C4DFF',
  light: '#ACBEFF',
}

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.indigo}"/>
      <stop offset="60%" stop-color="#111827"/>
      <stop offset="100%" stop-color="${C.dark}"/>
    </linearGradient>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${C.accent2}"/>
      <stop offset="100%" stop-color="${C.accent}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- 우상단 장식 원 -->
  <circle cx="1040" cy="120" r="220" fill="${C.accent}" opacity="0.18"/>
  <circle cx="1120" cy="60" r="120" fill="${C.accent2}" opacity="0.2"/>

  <!-- 좌측 액센트 바 -->
  <rect x="90" y="250" width="14" height="130" rx="7" fill="url(#acc)"/>

  <text x="120" y="250" font-family="Pretendard, sans-serif" font-size="34" font-weight="700" fill="${C.light}" letter-spacing="6">SK AI LEADER ACADEMY</text>
  <text x="118" y="360" font-family="Pretendard, sans-serif" font-size="150" font-weight="800" fill="#ffffff">SK<tspan fill="${C.accent}">ALA</tspan></text>
  <text x="120" y="450" font-family="Pretendard, sans-serif" font-size="52" font-weight="700" fill="#ffffff">4기 강의 커리큘럼</text>

  <text x="120" y="548" font-family="Pretendard, sans-serif" font-size="28" font-weight="500" fill="${C.light}">이애본 강사 · 2026.07 – 11 · 평일 09:00–18:00</text>
</svg>`

mkdirSync(resolve(__dirname, '../public'), { recursive: true })
const png = await sharp(Buffer.from(svg)).png().toBuffer()
writeFileSync(out, png)
console.log('✓ OG image written:', out)
