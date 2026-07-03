import { NavLink, Link } from 'react-router-dom'
import { course } from '../data/course'
import ThemeToggle from './ThemeToggle'
import AuthButtons from './AuthButtons'
import { useAuth } from '../contexts/AuthContext'
import { isAdmin } from '../config/admin'
import AdminMenu from './AdminMenu'

const nav = [
  { to: '/', label: 'About', end: true },
  { to: '/schedule', label: '수업일정표' },
  { to: '/prep', label: '선수학습자료' },
  { to: '/subjects', label: '과목별 안내' },
  { to: '/lectures', label: '강의안' },
  { to: '/team', label: '팀 프로젝트' },
  { to: '/reference', label: '참고자료' },
  { to: '/progress', label: '학습관리' },
  { to: '/board', label: '게시판' },
  { href: 'https://padlet.com/aebon/skala4', label: '학습자료실', external: true },
  { to: '/dashboard', label: '대시보드' },
]

export default function Header() {
  const { user } = useAuth()
  const admin = isAdmin(user)

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span className="topbar-tag">
            {course.subtitle} · {course.cohort}
          </span>
          <span className="topbar-right">
            {/* 강사(최고 관리자) 로그인 시에만 띠줄에 관리 풍선메뉴 노출 */}
            {admin && <AdminMenu />}
            <AuthButtons />
            <ThemeToggle />
          </span>
        </div>
      </div>

      <header className="navbar">
        <div className="container nav-wrapper">
          <Link to="/" className="brand">
            <span className="brand-logo">
              <img src="/brandLogo.png" alt="SKALA" />
            </span>
            <span className="brand-sep" />
            <span className="brand-sub">{course.cohort} · {course.instructor} 강사</span>
          </Link>

          <nav className="nav-menu">
            {nav.map((n) =>
              n.external ? (
                <a key={n.href} href={n.href} target="_blank" rel="noreferrer" className="nav-link">
                  {n.label} ↗
                </a>
              ) : (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  {n.label}
                </NavLink>
              ),
            )}
          </nav>
        </div>
      </header>
    </>
  )
}
