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
    <section className="section login-section">
      <div className="container login-wrap">
        <div className="login-card">
          <span className="login-logo">
            <img src="/brandLogo.png" alt="SKALA" width={228} height={56} />
          </span>
          <h1 className="login-title">로그인</h1>
          <p className="login-sub">게시판·대시보드 이용을 위해 로그인하세요.</p>

          {!hasSupabase && (
            <p className="login-warn">⚠️ Supabase 연결이 아직 설정되지 않았습니다. (관리자 설정 필요)</p>
          )}

          <div className="login-btns">
            <button type="button" onClick={signInWithGoogle} className="login-btn login-google">
              <span className="g-mark" aria-hidden="true">G</span> Google 계정으로 로그인
            </button>
            <button type="button" onClick={signInWithKakao} className="login-btn login-kakao">
              <span aria-hidden="true">💬</span> 카카오로 로그인
            </button>
          </div>

          <p className="login-consent">
            로그인 시 SKALA 4기 학습 안내 서비스 이용에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </section>
  )
}
