import { NavLink } from 'react-router-dom'

// 강사(최고 관리자) 전용 — 띠줄의 "관리" 버튼.
// 풍선 드롭다운이었으나, 관리자 대시보드에 들어가면 AdminShell 좌측 사이드바가
// 동일한 메뉴를 모두 제공하므로 중복이었다. 버튼을 누르면 대시보드로 바로 이동한다.
export default function AdminMenu() {
  return (
    <NavLink
      to="/admin/main"
      className={({ isActive }) => `topbar-admin${isActive ? ' active' : ''}`}
      title="관리자 대시보드"
    >
      🔒 관리
    </NavLink>
  )
}
