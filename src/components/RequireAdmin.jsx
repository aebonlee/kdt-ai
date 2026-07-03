import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { isAdmin } from '../config/admin'

// 관리자(강사) 전용 페이지 가드 — 로그인 + ADMIN_EMAILS 일치 필요.
// ⚠️ 이 게이트는 화면 접근만 막습니다. 강의자료 파일 자체는 구글드라이브
//    (비공개)에 있어 구글 권한이 없으면 preview/다운로드가 열리지 않습니다.
export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center', color: 'var(--ink-soft)' }}>
          불러오는 중…
        </div>
      </section>
    )
  }

  if (!user) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: 460 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy-800)' }}>로그인이 필요합니다</h2>
          <p style={{ color: 'var(--ink-soft)', marginTop: 8 }}>
            관리자 자료실은 강사 계정 로그인 후 이용할 수 있습니다.
          </p>
          <Link to="/login" className="btn btn-cta" style={{ marginTop: 20 }}>
            로그인 하러 가기 →
          </Link>
        </div>
      </section>
    )
  }

  if (!isAdmin(user)) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: 460 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy-800)' }}>접근 권한이 없습니다</h2>
          <p style={{ color: 'var(--ink-soft)', marginTop: 8 }}>
            이 페이지는 강사(관리자) 전용입니다.
            <br />
            현재 로그인: <b>{user.email}</b>
          </p>
          <Link to="/" className="btn btn-outline" style={{ marginTop: 20 }}>
            홈으로 →
          </Link>
        </div>
      </section>
    )
  }

  return children
}
