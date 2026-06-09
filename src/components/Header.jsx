import { NavLink, Link } from 'react-router-dom'
import { course } from '../data/course'
import ThemeToggle from './ThemeToggle'

const nav = [
  { to: '/', label: '홈', end: true },
  { to: '/subjects', label: '과목별' },
  { to: '/schedule', label: '일정' },
]

export default function Header() {
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span className="topbar-tag">
            {course.subtitle} · {course.cohort}
          </span>
          <span className="topbar-right">
            <span>{course.overview.range}</span>
            <span>판교 · 광주</span>
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
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}
