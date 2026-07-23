// 홈 히어로 우측 비주얼 — SKALA 브랜드(딥 인디고·#3F51FF) AI 학습 오브젝트.
// 중앙 코어(SKALA 칩) 주위를 과정 4트랙 노드가 궤도 회전하고,
// 마우스 움직임에 레이어별 패럴랙스(JS)로 반응한다. prefers-reduced-motion 존중.
import { useEffect, useRef } from 'react'

const TRACKS = [
  { label: 'Full-stack', angle: 0, r: 150, color: '#7C8CFF' },
  { label: '데이터 · AIOps', angle: 90, r: 150, color: '#4DD8C7' },
  { label: 'Cloud', angle: 180, r: 150, color: '#FFB65C' },
  { label: '생성형 AI', angle: 270, r: 150, color: '#B78CFF' },
]

// 외곽 행성 3개 — 팔레트 액센트(--a1/--a2)를 따라 함께 색이 바뀐다.
const PLANETS = [
  { label: 'AI', x: 52, y: 58, r: 17, ring: -16, color: 'var(--a1)', delay: 0 },
  { label: 'AX', x: 428, y: 246, r: 14, ring: 14, color: 'var(--a2)', delay: 1.4 },
  { label: 'Dev', x: 64, y: 352, r: 12, ring: -22, color: 'color-mix(in srgb, var(--a1) 50%, var(--a2))', delay: 2.6 },
]

const pos = (angle, r, cx = 230, cy = 210) => ({
  x: cx + r * Math.cos((angle * Math.PI) / 180),
  y: cy + r * Math.sin((angle * Math.PI) / 180),
})

export default function HeroVisual() {
  const wrapRef = useRef(null)

  // 마우스 패럴랙스 — 레이어(data-depth)별로 다른 깊이감
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const layers = wrap.querySelectorAll('[data-depth]')
    let raf = 0
    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect()
      const dx = (e.clientX - rect.left) / rect.width - 0.5
      const dy = (e.clientY - rect.top) / rect.height - 0.5
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        layers.forEach((el) => {
          const d = Number(el.dataset.depth)
          el.style.transform = `translate(${dx * d}px, ${dy * d}px)`
        })
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      layers.forEach((el) => { el.style.transform = 'translate(0px, 0px)' })
    }
    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={wrapRef} className="hero-visual" aria-hidden="true">
      <svg viewBox="0 0 460 420" width="100%" role="img" aria-label="DreamIT Biz AI 학습 여정 일러스트">
        <defs>
          {/* 팔레트 연동 — 액센트 토큰(--a1/--a2)을 그라디언트에 직접 사용 */}
          <linearGradient id="hvCore" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--a1)' }} />
            <stop offset="1" style={{ stopColor: 'color-mix(in srgb, var(--a1) 42%, #131a3a)' }} />
          </linearGradient>
          <radialGradient id="hvGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" style={{ stopColor: 'var(--a1)' }} stopOpacity="0.4" />
            <stop offset="1" style={{ stopColor: 'var(--a1)' }} stopOpacity="0" />
          </radialGradient>
          <filter id="hvSoft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* 배경 글로우 + 별 입자 (가장 얕은 레이어) */}
        <g data-depth="6" style={{ transition: 'transform .25s ease-out' }}>
          <circle cx="230" cy="210" r="190" fill="url(#hvGlow)" />
          {[[60, 70], [400, 90], [55, 330], [415, 320], [230, 28], [120, 388], [352, 385]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3 : 2} opacity="0.7" className="hv-twinkle" style={{ fill: 'color-mix(in srgb, var(--a1) 55%, #fff)', animationDelay: `${i * 0.55}s` }} />
          ))}
        </g>

        {/* 외곽 행성 AI · AX · Dev — 궤도 밖에서 둥둥 떠다니는 위성 행성 (팔레트 연동) */}
        <g data-depth="8" style={{ transition: 'transform .25s ease-out' }}>
          {PLANETS.map((p) => (
            <g key={p.label} className="hv-planet" style={{ animationDelay: `${p.delay}s` }}>
              {/* 은은한 글로우 */}
              <circle cx={p.x} cy={p.y} r={p.r + 9} style={{ fill: p.color }} opacity="0.12" />
              {/* 행성 본체 + 하이라이트 */}
              <circle cx={p.x} cy={p.y} r={p.r} style={{ fill: p.color }} opacity="0.9" />
              <circle cx={p.x - p.r * 0.32} cy={p.y - p.r * 0.34} r={p.r * 0.4} fill="#fff" opacity="0.28" />
              {/* 토성형 고리 */}
              <ellipse
                cx={p.x} cy={p.y} rx={p.r + 10} ry={p.r * 0.34}
                fill="none" style={{ stroke: p.color }} strokeOpacity="0.65" strokeWidth="1.6"
                transform={`rotate(${p.ring} ${p.x} ${p.y})`}
              />
              {/* 라벨 */}
              <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={p.r * 0.62} fontWeight="900" fill="#0a0b10" letterSpacing="0.5">{p.label}</text>
            </g>
          ))}
        </g>

        {/* 궤도 링 */}
        <g data-depth="10" style={{ transition: 'transform .25s ease-out' }}>
          <ellipse cx="230" cy="210" rx="150" ry="150" fill="none" stroke="#ACBEFF" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="3 6" className="hv-spin-slow" />
          <ellipse cx="230" cy="210" rx="103" ry="103" fill="none" stroke="#ACBEFF" strokeOpacity="0.25" strokeWidth="1" className="hv-spin-rev" />
        </g>

        {/* 연결선 (코어 → 트랙 노드) */}
        <g data-depth="14" style={{ transition: 'transform .25s ease-out' }}>
          {TRACKS.map((t) => {
            const p = pos(t.angle, t.r)
            return (
              <line key={t.label} x1="230" y1="210" x2={p.x} y2={p.y} stroke={t.color} strokeOpacity="0.5" strokeWidth="1.4" strokeDasharray="4 7" className="hv-flow" />
            )
          })}
        </g>

        {/* 트랙 노드 4개 — 궤도 위 배치, 개별 펄스 */}
        <g data-depth="18" style={{ transition: 'transform .25s ease-out' }} className="hv-orbit">
          {TRACKS.map((t, i) => {
            const p = pos(t.angle, t.r)
            const w = t.label.length > 6 ? 108 : 88
            return (
              <g key={t.label} className="hv-float" style={{ animationDelay: `${i * 0.8}s` }}>
                <circle cx={p.x} cy={p.y} r="17" fill={t.color} opacity="0.18" className="hv-pulse" style={{ animationDelay: `${i * 0.6}s` }} />
                <circle cx={p.x} cy={p.y} r="8" fill={t.color} />
                <circle cx={p.x} cy={p.y} r="8" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1" />
                <rect x={p.x - w / 2} y={p.y + 15} rx="9" ry="9" width={w} height="22" fill="#141A5E" stroke={t.color} strokeOpacity="0.55" strokeWidth="1" />
                <text x={p.x} y={p.y + 30} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#DDE3FF">{t.label}</text>
              </g>
            )
          })}
        </g>

        {/* 중앙 코어 — SKALA 칩 */}
        <g data-depth="24" style={{ transition: 'transform .25s ease-out' }} className="hv-float">
          <circle cx="230" cy="210" r="62" fill="url(#hvCore)" opacity="0.35" filter="url(#hvSoft)" />
          <g className="hv-breathe">
            {/* 칩 몸통 */}
            <rect x="184" y="168" width="92" height="84" rx="18" fill="url(#hvCore)" />
            <rect x="184" y="168" width="92" height="84" rx="18" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
            {/* 칩 핀 */}
            {[196, 216, 236, 256].map((x) => (
              <g key={x}>
                <rect x={x} y="156" width="8" height="10" rx="3" style={{ fill: 'var(--a2)' }} opacity="0.85" />
                <rect x={x} y="254" width="8" height="10" rx="3" style={{ fill: 'var(--a2)' }} opacity="0.85" />
              </g>
            ))}
            {/* 뉴런 회로 */}
            <circle cx="230" cy="210" r="6.5" fill="#fff" />
            {[[206, 192], [254, 192], [206, 230], [254, 230]].map(([x, y], i) => (
              <g key={i}>
                <line x1="230" y1="210" x2={x} y2={y} stroke="#fff" strokeOpacity="0.75" strokeWidth="1.6" />
                <circle cx={x} cy={y} r="4" fill="#ACBEFF" className="hv-twinkle" style={{ animationDelay: `${i * 0.4}s` }} />
              </g>
            ))}
            <text x="230" y="286" textAnchor="middle" fontSize="15" fontWeight="900" fill="#DDE3FF" letterSpacing="2">DreamIT</text>
          </g>
        </g>
      </svg>

      {/* 컴포넌트 전용 키프레임 — 모션 최소화 설정이면 전부 정지 */}
      <style>{`
        .hero-visual { position: relative; max-width: 460px; margin: 0 auto; }
        .hero-visual svg { display: block; overflow: visible; }
        .hv-float { animation: hvFloat 5.5s ease-in-out infinite; }
        .hv-planet { animation: hvPlanet 7s ease-in-out infinite; }
        @keyframes hvPlanet { 0%, 100% { translate: 0 0; } 33% { translate: 4px -10px; } 66% { translate: -3px 5px; } }
        .hv-breathe { animation: hvBreathe 4s ease-in-out infinite; transform-origin: 230px 210px; }
        .hv-pulse { animation: hvPulse 2.8s ease-out infinite; transform-origin: center; transform-box: fill-box; }
        .hv-twinkle { animation: hvTwinkle 2.4s ease-in-out infinite; }
        .hv-flow { animation: hvFlow 1.6s linear infinite; }
        .hv-spin-slow { animation: hvSpin 60s linear infinite; transform-origin: 230px 210px; }
        .hv-spin-rev { animation: hvSpin 45s linear infinite reverse; transform-origin: 230px 210px; }
        @keyframes hvFloat { 0%, 100% { translate: 0 0; } 50% { translate: 0 -9px; } }
        @keyframes hvBreathe { 0%, 100% { scale: 1; } 50% { scale: 1.035; } }
        @keyframes hvPulse { 0% { scale: 0.55; opacity: .5; } 70% { scale: 1.7; opacity: 0; } 100% { scale: 1.7; opacity: 0; } }
        @keyframes hvTwinkle { 0%, 100% { opacity: .25; } 50% { opacity: .95; } }
        @keyframes hvFlow { to { stroke-dashoffset: -22; } }
        @keyframes hvSpin { to { rotate: 360deg; } }
        @media (prefers-reduced-motion: reduce) {
          .hv-float, .hv-planet, .hv-breathe, .hv-pulse, .hv-twinkle, .hv-flow, .hv-spin-slow, .hv-spin-rev { animation: none; }
        }
      `}</style>
    </div>
  )
}
