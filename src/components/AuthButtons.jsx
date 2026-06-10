import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { isAdmin } from '../config/admin'

const nameOf = (user) =>
  user?.user_metadata?.name || user?.user_metadata?.full_name || user?.user_metadata?.nickname || user?.email || '사용자'

// 상단바 우측 로그인 상태 표시
export default function AuthButtons() {
  const { user, signOut } = useAuth()

  if (!user) {
    return (
      <Link to="/login" style={{ color: 'inherit' }}>
        로그인
      </Link>
    )
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span>
        {nameOf(user)}
        {isAdmin(user) ? ' (강사)' : ''}
      </span>
      <button
        onClick={signOut}
        style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, textDecoration: 'underline' }}
      >
        로그아웃
      </button>
    </span>
  )
}
