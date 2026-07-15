// 관리자 공통 셸 — 좌측 세로 메뉴 + 넓은 콘텐츠(최대 1600px).
// 라우트 레벨에서 관리자 페이지를 감싼다: <AdminShell><AdminDashboard/></AdminShell>
import { NavLink, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { evalUnits } from '../data/evalunits'
import { exams } from '../data/exams'

const ITEMS = [
  { to: '/admin/main', label: '관리자 대시보드', icon: '🏠', end: true },
  { to: '/admin/evaluate', label: '교과목 평가', icon: '📝' },
  { to: '/admin/schedule', label: '페어링 시간표', icon: '🗓️' },
  { to: '/admin', label: '자료실', icon: '📂', end: true },
  { to: '/schedule', label: '수업일정표', icon: '📅' },
  { to: '/subjects', label: '과목별 안내', icon: '📘' },
  { to: '/admin/students', label: '학생 명단', icon: '👥' },
  { to: '/admin/teams', label: '팀별 명단', icon: '🧩' },
]

export default function AdminShell({ children }) {
  const { user } = useAuth()
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const onEvaluate = pathname.startsWith('/admin/evaluate')
  const unitsWithExam = evalUnits.filter((u) => exams[u.subjectId])
  const activeUnit = params.get('unit') || (onEvaluate ? unitsWithExam[0]?.key : null)
  return (
    <div className="admin-shell">
      <aside className="admin-shell-side" aria-label="관리자 메뉴">
        <div className="admin-shell-badge">🔒 관리자</div>
        <div className="admin-shell-user" title={user?.email}>{user?.email}</div>
        <nav className="admin-shell-nav">
          {ITEMS.map((it) => (
            <div key={it.to}>
              <NavLink
                to={it.to}
                end={it.end}
                className={({ isActive }) => `admin-shell-link${isActive ? ' active' : ''}`}
              >
                <span className="asl-ico">{it.icon}</span>
                <span>{it.label}</span>
              </NavLink>
              {/* 교과목 평가 — 평가 단위(과목×분반) 하위 메뉴 */}
              {it.to === '/admin/evaluate' && onEvaluate && (
                <div className="admin-shell-sub">
                  {unitsWithExam.map((u) => (
                    <NavLink
                      key={u.key}
                      to={`/admin/evaluate?unit=${encodeURIComponent(u.key)}`}
                      className={`admin-shell-sublink${activeUnit === u.key ? ' active' : ''}`}
                    >
                      <span className="assl-name">{u.subjectName}</span>
                      <span className="assl-meta">{u.campus} {u.cls} · {u.dateLabel}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
      <div className="admin-shell-main">{children}</div>
    </div>
  )
}
