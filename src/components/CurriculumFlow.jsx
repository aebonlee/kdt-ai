// 전체 커리큘럼 흐름도 — 다크 IDE 배경에 맞춘 SVG(기존 흰색 PNG 대체).
// 정규교과(계단식 과목 + Mini-project) → 본 프로젝트, 하단 상시 트랙.
// 색: rest06 팔레트 — 과목=시안 계열, Mini=서피스, 상시 트랙=라임 그라데이션.
export default function CurriculumFlow() {
  // 계단식 과목 블록
  const courses = [
    { y: 96, x: 24, w: 360, t1: 'AI 서비스를 위한 SW 기초', t2: 'Full-stack Engineering' },
    { y: 168, x: 168, w: 360, t1: 'AI의 서비스화', t2: '데이터분석 및 MLOps' },
    { y: 240, x: 312, w: 360, t1: 'AI 서비스 배포 및 운영', t2: 'Cloud Native AI' },
    { y: 312, x: 432, w: 380, t1: 'AI 서비스의 고도화', t2: '생성형 AI 서비스 개발' },
  ]
  // Mini-project 블록
  const minis = [
    { y: 96, x: 404, w: 210, label: 'AI 웹 서비스 설계' },
    { y: 168, x: 548, w: 190, label: '데이터 분석' },
    { y: 312, x: 832, w: 200, label: 'AI 서비스 개발' },
  ]
  // 상시 하단 트랙
  const rail = [
    { icon: '⚑', label: '입과 오리엔테이션' },
    { icon: '💬', label: '재직자 특강 (월 1~2회)' },
    { icon: '🗨', label: '취업 컨설팅 (상시)' },
    { icon: '🎓', label: '최종평가 / 수료식' },
  ]
  return (
    <svg viewBox="0 0 1180 470" width="100%" role="img"
      aria-label="전체 교육과정 흐름도 — 정규교과에서 본 프로젝트까지"
      style={{ display: 'block' }}>
      <defs>
        <linearGradient id="cf-lime" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" /><stop offset="1" stopColor="#a3e635" />
        </linearGradient>
        <linearGradient id="cf-course" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#12263a" /><stop offset="1" stopColor="#0f1c2b" />
        </linearGradient>
      </defs>

      {/* 상단 단계 구분 화살표 — 다크 배경에서도 또렷하게(가이드 선 톤 ↑) */}
      <line x1="12" y1="44" x2="1000" y2="44" stroke="#5b6788" strokeWidth="1.6" markerEnd="url(#cf-arr)" />
      <line x1="1030" y1="44" x2="1168" y2="44" stroke="#5b6788" strokeWidth="1.6" markerEnd="url(#cf-arr)" />
      <defs>
        <marker id="cf-arr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="#5b6788" strokeWidth="1.4" />
        </marker>
      </defs>
      <text x="506" y="30" textAnchor="middle" fill="#22d3ee" fontSize="15" fontWeight="800" letterSpacing="1">정규교과</text>
      <text x="1099" y="30" textAnchor="middle" fill="#a3e635" fontSize="15" fontWeight="800" letterSpacing="1">본 프로젝트</text>
      {/* 정규교과 / 본 프로젝트 경계 — 점선을 밝혀 확실히 보이게 */}
      <line x1="1012" y1="16" x2="1012" y2="418" stroke="#63719a" strokeWidth="1.6" strokeDasharray="5 4" />

      {/* 계단식 과목 블록 — 테두리를 시안 계열로 살짝 밝혀 배경과 분리 */}
      {courses.map((c) => (
        <g key={c.t2}>
          <rect x={c.x} y={c.y} width={c.w} height="56" rx="10" fill="url(#cf-course)" stroke="#3a6b8c" strokeWidth="1.2" />
          <text x={c.x + c.w / 2} y={c.y + 23} textAnchor="middle" fill="#aab4cc" fontSize="12.5">{c.t1}</text>
          <text x={c.x + c.w / 2} y={c.y + 42} textAnchor="middle" fill="#f2f4fa" fontSize="14.5" fontWeight="800">{c.t2}</text>
        </g>
      ))}

      {/* Mini-project 블록 — 배경보다 밝은 면 + 시안 점선으로 또렷하게 */}
      {minis.map((m) => (
        <g key={m.label}>
          <rect x={m.x} y={m.y} width={m.w} height="56" rx="10" fill="#182230" stroke="#3f7d92" strokeWidth="1.4" strokeDasharray="6 4" />
          <rect x={m.x + m.w / 2 - 42} y={m.y + 9} width="84" height="18" rx="9" fill="#1f4a51" />
          <text x={m.x + m.w / 2} y={m.y + 22} textAnchor="middle" fill="#3ee0f5" fontSize="10.5" fontWeight="700">Mini-project</text>
          <text x={m.x + m.w / 2} y={m.y + 44} textAnchor="middle" fill="#dbe1ee" fontSize="13.5" fontWeight="700">{m.label}</text>
        </g>
      ))}

      {/* AI 프로젝트 방법론 + 본 프로젝트(팀 프로젝트) */}
      <g>
        <rect x="1040" y="240" width="128" height="56" rx="10" fill="url(#cf-course)" stroke="#2b4a5f" />
        <text x="1104" y="264" textAnchor="middle" fill="#e8eaf0" fontSize="13.5" fontWeight="800">AI 프로젝트</text>
        <text x="1104" y="282" textAnchor="middle" fill="#e8eaf0" fontSize="13.5" fontWeight="800">방법론</text>
      </g>
      <g>
        <rect x="1040" y="312" width="128" height="56" rx="10" fill="#1a2e1a" stroke="#3d5a1f" />
        <text x="1104" y="336" textAnchor="middle" fill="#a3e635" fontSize="13" fontWeight="800">생성형 AI 서비스</text>
        <text x="1104" y="354" textAnchor="middle" fill="#a3e635" fontSize="13" fontWeight="800">팀 프로젝트</text>
      </g>

      {/* 하단 상시 트랙 — 한 줄 바에 흐린 구분선이 아니라, 4칸을 개별 셀로 분리해
         네 항목이 또렷이 구분되게 한다(fillOpacity 로 배경만 옅게, 테두리·글자는 선명하게). */}
      {rail.map((r, i) => {
        const gap = 12
        const seg = (1156 - gap * 3) / 4
        const x = 12 + (seg + gap) * i
        return (
          <g key={r.label}>
            <rect x={x} y="392" width={seg} height="52" rx="10"
              fill="url(#cf-lime)" fillOpacity="0.16" stroke="#4f9c7e" strokeWidth="1.3" />
            <text x={x + seg / 2} y="423" textAnchor="middle" fill="#eef4ea" fontSize="13.5" fontWeight="700">{r.icon} {r.label}</text>
          </g>
        )
      })}
    </svg>
  )
}
