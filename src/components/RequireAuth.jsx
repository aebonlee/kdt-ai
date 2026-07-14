import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// 로그인 필요 페이지(게시판·대시보드) 가드
export default function RequireAuth({ children }) {
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
            이 페이지는 로그인 후 이용할 수 있습니다. (선수학습자료는 로그인 없이 볼 수 있어요)
          </p>
          <Link to="/login" className="btn btn-cta" style={{ marginTop: 20 }}>
            로그인 하러 가기 →
          </Link>
        </div>
      </section>
    )
  }

  return children
}
