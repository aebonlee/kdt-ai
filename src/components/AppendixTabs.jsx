import { NavLink } from 'react-router-dom'

// 부록 하위 메뉴 — 용어사전 / 기획안 도해 가이드 (상단 탭)
const TABS = [
  { to: '/appendix', label: '📖 용어사전', end: true },
  { to: '/appendix/diagrams', label: '📐 기획안 도해 가이드' },
]

export default function AppendixTabs() {
  return (
    <div className="month-tabs" style={{ marginBottom: 20 }}>
      {TABS.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) => `month-tab${isActive ? ' active' : ''}`}
        >
          {t.label}
        </NavLink>
      ))}
    </div>
  )
}
