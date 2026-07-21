import { useEffect, useState } from 'react'

// 라이트(기본) ↔ 다크(SKALA 딥 인디고) 토글. localStorage 에 유지.
export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark',
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    try {
      localStorage.setItem('kdt-theme', dark ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
  }, [dark])

  return (
    <button
      className="theme-toggle"
      onClick={() => setDark((v) => !v)}
      aria-label="테마 전환"
      title={dark ? '라이트 모드' : '다크 모드'}
    >
      {dark ? '☀️ 라이트' : '🌙 다크'}
    </button>
  )
}
