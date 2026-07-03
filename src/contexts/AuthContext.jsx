import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, hasSupabase } from '../lib/supabase'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!hasSupabase) {
      setLoading(false)
      return
    }
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session))
      .catch(() => setSession(null)) // 토큰 손상·갱신 실패로 reject돼도 로딩을 풀어 보호 페이지가 스피너에 갇히지 않게
      .finally(() => setLoading(false))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  const signIn = async (provider) => {
    if (!hasSupabase) {
      alert('Supabase 연결 설정이 필요합니다. (관리자에게 문의)')
      return
    }
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider, // 'google' | 'kakao'
        options: { redirectTo: window.location.origin + import.meta.env.BASE_URL },
      })
      if (error) alert('로그인에 실패했습니다: ' + error.message)
    } catch (e) {
      alert('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  const signOut = async () => {
    if (hasSupabase) await supabase.auth.signOut()
  }

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    hasSupabase,
    signInWithGoogle: () => signIn('google'),
    signInWithKakao: () => signIn('kakao'),
    signOut,
  }

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)
