// 관리자 공통 탭바 — 모든 관리자 화면 상단에서 원클릭 이동 (풍선 메뉴와 동일 구성)
import { NavLink } from 'react-router-dom'

const ITEMS = [
  { to: '/admin/main', label: '🏠 대시보드', end: true },
  { to: '/admin/evaluate', label: '📝 교과목 평가' },
  { to: '/admin/schedule', label: '🗓️ 페어링 시간표' },
  { to: '/admin', label: '📂 자료실', end: true },
  { to: '/schedule', label: '📅 수업일정표' },
  { to: '/subjects', label: '📘 과목별 안내' },
  { to: '/dashboard', label: '👥 학생 명단' },
  { to: '/admin/teams', label: '🧩 팀별 명단' },
]

export default function AdminNav() {
  return (
    <nav
      aria-label="관리자 메뉴"
      style={{
        display: 'flex', gap: 4, marginTop: 14, paddingBottom: 2,
        overflowX: 'auto', borderBottom: '2px solid var(--line)',
      }}
    >
      {ITEMS.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          end={it.end}
          style={({ isActive }) => ({
            padding: '9px 14px', fontSize: 13, fontWeight: 800, whiteSpace: 'nowrap',
            color: isActive ? 'var(--gold)' : 'var(--navy-600)',
            borderBottom: isActive ? '2px solid var(--gold)' : '2px solid transparent',
            marginBottom: -2,
          })}
        >
          {it.label}
        </NavLink>
      ))}
    </nav>
  )
}
