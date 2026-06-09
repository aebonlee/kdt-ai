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

// 5색 팔레트
const C = {
  navy: '#0A1F44',
  ocean: '#14346E',
  azure: '#2563EB',
  sky: '#38BDF8',
  amber: '#FBBF24',
}

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.navy}"/>
      <stop offset="60%" stop-color="${C.ocean}"/>
      <stop offset="100%" stop-color="#0d2752"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- 우상단 장식 원 -->
  <circle cx="1040" cy="120" r="220" fill="${C.azure}" opacity="0.18"/>
  <circle cx="1120" cy="60" r="120" fill="${C.sky}" opacity="0.18"/>

  <!-- 좌측 5색 액센트 바 -->
  <rect x="90" y="250" width="14" height="130" rx="7" fill="${C.amber}"/>

  <text x="120" y="250" font-family="Pretendard, sans-serif" font-size="34" font-weight="700" fill="${C.sky}" letter-spacing="6">SK AI LEADER ACADEMY</text>
  <text x="118" y="360" font-family="Pretendard, sans-serif" font-size="150" font-weight="800" fill="#ffffff">SKALA</text>
  <text x="120" y="450" font-family="Pretendard, sans-serif" font-size="56" font-weight="700" fill="#ffffff">4기 교육 커리큘럼</text>

  <!-- 하단 5색 점 -->
  <g>
    <circle cx="130" cy="540" r="13" fill="${C.navy}" stroke="#ffffff" stroke-opacity="0.3"/>
    <circle cx="170" cy="540" r="13" fill="${C.ocean}"/>
    <circle cx="210" cy="540" r="13" fill="${C.azure}"/>
    <circle cx="250" cy="540" r="13" fill="${C.sky}"/>
    <circle cx="290" cy="540" r="13" fill="${C.amber}"/>
  </g>
  <text x="330" y="548" font-family="Pretendard, sans-serif" font-size="30" font-weight="500" fill="#cbd5e1">2026.07 – 2026.12 · 평일 09:00–18:00</text>
</svg>`

mkdirSync(resolve(__dirname, '../public'), { recursive: true })
const png = await sharp(Buffer.from(svg)).png().toBuffer()
writeFileSync(out, png)
console.log('✓ OG image written:', out)
