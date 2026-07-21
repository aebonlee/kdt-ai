import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { course } from '../data/course'
import ThemeToggle from './ThemeToggle'
import AuthButtons from './AuthButtons'
import { useAuth } from '../contexts/AuthContext'
import { canAccessAdmin } from '../config/admin'
import { useProfile } from '../hooks/useProfile'
import AdminMenu from './AdminMenu'

const nav = [
  { to: '/about', label: 'About' },
  { to: '/prep', label: '선수학습자료' },
  { to: '/lectures', label: '학습강의안' },
  { to: '/textbook', label: '실습교안' },
  { to: '/team', label: '팀 프로젝트' },
  { to: '/reference', label: '참고자료' },
  { to: '/board', label: '게시판' },
  { to: '/recommend', label: '학습추천사이트' },
]

export default function Header() {
  const { user } = useAuth()
  const { profile } = useProfile()
  const admin = canAccessAdmin(user, profile)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // 라우트가 바뀌면 모바일 메뉴를 닫는다
  useEffect(() => setOpen(false), [pathname])

  // 메뉴가 열려 있을 때 뒤 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

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
              <img src="/kv_brandLogo.png" alt="SKALA" width={228} height={56} />
            </span>
            <span className="brand-sep" />
            <span className="brand-sub">{course.cohort} · {course.instructor} 강사</span>
          </Link>

          {/* 모바일 햄버거 토글 */}
          <button
            type="button"
            className={`nav-toggle${open ? ' is-open' : ''}`}
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>

          <nav id="primary-nav" className={`nav-menu${open ? ' is-open' : ''}`}>
            {nav.map((n) =>
              n.external ? (
                <a
                  key={n.href}
                  href={n.href}
                  target="_blank"
                  rel="noreferrer"
                  className="nav-link"
                  onClick={() => setOpen(false)}
                >
                  {n.label} ↗
                </a>
              ) : (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </NavLink>
              ),
            )}
          </nav>

          {/* 열린 메뉴 밖을 누르면 닫히는 오버레이 (모바일 전용) */}
          {open && <button className="nav-overlay" aria-hidden="true" tabIndex={-1} onClick={() => setOpen(false)} />}
        </div>
      </header>
    </>
  )
}
