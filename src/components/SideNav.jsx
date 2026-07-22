import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

// 왼쪽 세로 2차 메뉴 — 데스크톱(≥1200px)에서 스크롤해도 항상 보이는 보조 내비.
// 상단 메뉴(Header)는 그대로 두고, 하단으로 스크롤할 때 메뉴 접근이 어려운 문제를 보완한다.
// 모바일에서는 숨기고 Header 햄버거를 사용한다(중복 방지).
// 관리자·로그인 화면은 자체 좌측 메뉴(AdminShell)가 있어 여기서는 숨긴다.
const NAV = [
  { to: '/', label: '홈', icon: '🏠', end: true },
  { to: '/about', label: 'About', icon: 'ℹ️' },
  { to: '/prep', label: '선수학습자료', icon: '📚' },
  { to: '/lectures', label: '학습강의안', icon: '📖' },
  { to: '/textbook', label: '실습교안', icon: '🧪' },
  { to: '/team', label: '팀 프로젝트', icon: '👥' },
  { to: '/reference', label: '참고자료', icon: '🔗' },
  { to: '/board', label: '게시판', icon: '💬' },
  { to: '/recommend', label: '학습추천사이트', icon: '⭐' },
]

// 자체 좌측 메뉴가 있거나 세로 메뉴가 어울리지 않는 경로
const HIDE_EXACT = ['/login', '/tracks', '/progress', '/schedule', '/subjects']
const isHidden = (p) => p.startsWith('/admin') || HIDE_EXACT.includes(p)

export default function SideNav() {
  const { pathname } = useLocation()
  const hidden = isHidden(pathname)

  // 레일이 보일 때만 본문을 오른쪽으로 민다(body 클래스로 CSS 제어).
  useEffect(() => {
    document.body.classList.toggle('has-sidenav', !hidden)
    return () => document.body.classList.remove('has-sidenav')
  }, [hidden])

  if (hidden) return null

  return (
    <aside className="sidenav" aria-label="바로가기 메뉴">
      <span className="sidenav-title">바로가기</span>
      <nav className="sidenav-list">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) => `sidenav-link${isActive ? ' active' : ''}`}
          >
            <span className="sidenav-ico" aria-hidden="true">{n.icon}</span>
            <span>{n.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
