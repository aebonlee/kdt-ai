// OG(Open Graph) 미리보기 이미지 생성 — DreamIT Biz 다크 IDE 컨셉(rest06)
//
// 사용법:
//   npm i -D sharp        # 임시 설치
//   node scripts/make-og.mjs
//   → public/og.png (1200x630)
//
// 카카오 공유 디버거: https://developers.kakao.com/tool/debugger/sharing
import sharp from 'sharp'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = resolve(__dirname, '../public/og.png')

// rest06 다크 팔레트
const C = {
  bg: '#0a0b10', panel: '#12141c', surface: '#0c0e15',
  cyan: '#22d3ee', lime: '#a3e635', text: '#e8eaf0', muted: '#9aa4bd',
  line: '#222634', purple: '#c678dd', green: '#98c379',
}

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${C.cyan}"/><stop offset="1" stop-color="${C.lime}"/>
    </linearGradient>
    <radialGradient id="glow1" cx="82%" cy="14%" r="55%">
      <stop offset="0" stop-color="${C.cyan}" stop-opacity="0.16"/><stop offset="1" stop-color="${C.cyan}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="6%" cy="96%" r="50%">
      <stop offset="0" stop-color="${C.lime}" stop-opacity="0.12"/><stop offset="1" stop-color="${C.lime}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="630" fill="${C.bg}"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <!-- 격자 도트 -->
  ${Array.from({ length: 13 }, (_, r) => Array.from({ length: 25 }, (_, c) =>
    `<circle cx="${40 + c * 48}" cy="${40 + r * 48}" r="1.3" fill="${C.line}"/>`).join('')).join('')}

  <!-- 브랜드 로고 -->
  <text x="80" y="132" font-family="Space Grotesk, Pretendard, sans-serif" font-size="34" font-weight="900" fill="${C.text}">DreamIT<tspan fill="${C.muted}" font-weight="700"> Biz</tspan></text>
  <rect x="80" y="150" width="46" height="4" rx="2" fill="url(#grad)"/>

  <!-- 코드 프롬프트 -->
  <text x="80" y="232" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="600" fill="${C.cyan}">$ dreamitbiz --learn ai</text>

  <!-- 메인 타이틀 -->
  <text x="78" y="330" font-family="Pretendard, sans-serif" font-size="82" font-weight="800" fill="${C.text}" letter-spacing="-2">AI 실무를</text>
  <text x="78" y="430" font-family="Pretendard, sans-serif" font-size="82" font-weight="800" fill="url(#grad)" letter-spacing="-2">코드로 배우다</text>

  <!-- 서브 -->
  <text x="80" y="500" font-family="Pretendard, sans-serif" font-size="26" font-weight="500" fill="${C.muted}">강의안 · 실습교안 · 팀 프로젝트 · 평가까지 한곳에서</text>

  <!-- 하단 도메인 -->
  <rect x="80" y="546" width="360" height="40" rx="8" fill="${C.panel}" stroke="${C.line}"/>
  <circle cx="102" cy="566" r="4" fill="${C.cyan}"/>
  <text x="118" y="573" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="600" fill="${C.text}">kdt-ai.dreamitbiz.com</text>

  <!-- 우측 터미널 창 모티프 -->
  <g transform="translate(760,180)">
    <rect x="0" y="0" width="380" height="270" rx="14" fill="${C.surface}" stroke="${C.line}" stroke-width="1.5"/>
    <rect x="0" y="0" width="380" height="40" rx="14" fill="${C.panel}"/>
    <rect x="0" y="26" width="380" height="14" fill="${C.panel}"/>
    <circle cx="24" cy="20" r="6" fill="#ff5f57"/><circle cx="46" cy="20" r="6" fill="#febc2e"/><circle cx="68" cy="20" r="6" fill="#28c840"/>
    <text x="24" y="86" font-family="'JetBrains Mono', monospace" font-size="17" fill="${C.green}"># AI 실무 커리큘럼</text>
    <text x="24" y="118" font-family="'JetBrains Mono', monospace" font-size="17" fill="${C.text}">from dreamit <tspan fill="${C.purple}">import</tspan> learn</text>
    <text x="24" y="150" font-family="'JetBrains Mono', monospace" font-size="17" fill="${C.text}">learn.<tspan fill="${C.cyan}">start</tspan>(</text>
    <text x="48" y="178" font-family="'JetBrains Mono', monospace" font-size="16" fill="${C.lime}">"fullstack",</text>
    <text x="48" y="202" font-family="'JetBrains Mono', monospace" font-size="16" fill="${C.lime}">"data", "genai"</text>
    <text x="24" y="226" font-family="'JetBrains Mono', monospace" font-size="17" fill="${C.text}">)<tspan fill="${C.muted}">  # 현장에서 바로</tspan></text>
  </g>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(out)
console.log('✓ OG 이미지 생성:', out, '(1200x630)')
