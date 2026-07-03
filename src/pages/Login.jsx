import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { user, signInWithGoogle, signInWithKakao, hasSupabase } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/dashboard')
  }, [user, navigate])

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 420 }}>
        <div className="detail-card" style={{ textAlign: 'center' }}>
          <img src="/brandLogo.png" alt="SKALA" width={228} height={56} style={{ height: 26, width: 'auto', marginBottom: 16 }} />
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy-800)' }}>로그인</h1>
          <p style={{ color: 'var(--ink-soft)', marginTop: 8, fontSize: 14 }}>
            게시판·대시보드 이용을 위해 로그인하세요.
          </p>

          {!hasSupabase && (
            <p style={{ marginTop: 16, fontSize: 13, color: 'var(--gwangju)' }}>
              ⚠️ Supabase 연결이 아직 설정되지 않았습니다. (관리자 설정 필요)
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
            <button
              onClick={signInWithGoogle}
              className="btn"
              style={{ background: '#fff', color: '#1f1f1f', border: '1px solid var(--line-strong)', justifyContent: 'center', padding: '13px' }}
            >
              <span style={{ fontWeight: 800, color: '#4285F4' }}>G</span> Google 계정으로 로그인
            </button>
            <button
              onClick={signInWithKakao}
              className="btn"
              style={{ background: '#FEE500', color: '#191600', border: 'none', justifyContent: 'center', padding: '13px', fontWeight: 700 }}
            >
              💬 카카오로 로그인
            </button>
          </div>

          <p style={{ marginTop: 20, fontSize: 12, color: 'var(--ink-soft)' }}>
            로그인 시 SKALA 4기 학습 안내 서비스 이용에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </section>
  )
}
