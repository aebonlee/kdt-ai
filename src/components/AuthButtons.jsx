import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { isAdmin } from '../config/admin'
import { useProfile } from '../hooks/useProfile'
import { classLabel } from '../data/classes'

const nameOf = (user) =>
  user?.user_metadata?.name || user?.user_metadata?.full_name || user?.user_metadata?.nickname || user?.email || '사용자'

// 상단바 우측 로그인 상태 표시
export default function AuthButtons() {
  const { user, signOut } = useAuth()
  const { profile } = useProfile()
  // 소속 표기 — 학생: "판교 5층 7반" / 교수자: "담당 N개반"
  const belong = profile
    ? profile.role === 'instructor'
      ? (profile.teach_classes || []).length
        ? `담당 ${profile.teach_classes.length}개반`
        : ''
      : classLabel(profile.track, profile.class_no)
    : ''

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
      {belong && (
        <span style={{ padding: '2px 9px', borderRadius: 999, background: 'rgba(255,255,255,0.16)', fontSize: 11.5, fontWeight: 700, whiteSpace: 'nowrap' }}>
          {belong}
        </span>
      )}
      <button
        onClick={signOut}
        style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, textDecoration: 'underline' }}
      >
        로그아웃
      </button>
    </span>
  )
}
