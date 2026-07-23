import { useEffect, useRef, useState } from 'react'

// 액센트 팔레트 — 다크모드 토글 옆에서 사이트 포인트 컬러(--a1/--a2)를 교체한다.
// data-accent 속성 + localStorage('kdt-accent') 유지, index.html 부트 스크립트가 새로고침 시 복원.
// 컬러 정의는 index.css의 [data-accent=…] 블록이 정본 — 여기 dot 색은 스와치 표시용.
export const ACCENTS = [
  { key: 'cyan',    label: '시안',     dot: '#22d3ee' },
  { key: 'amber',   label: '골드',     dot: '#fbbf24' },
  { key: 'violet',  label: '바이올렛', dot: '#a78bfa' },
  { key: 'emerald', label: '그린',     dot: '#34d399' },
  { key: 'rose',    label: '로즈',     dot: '#fb7185' },
]

export default function AccentPalette() {
  const [accent, setAccent] = useState(
    () => document.documentElement.getAttribute('data-accent') || 'cyan',
  )
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent)
    try {
      localStorage.setItem('kdt-accent', accent)
    } catch {
      /* ignore */
    }
  }, [accent])

  // 바깥 클릭 시 닫기
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  return (
    <span className="accent-palette" ref={boxRef}>
      <button
        className="theme-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="포인트 컬러 팔레트"
        aria-expanded={open}
        title="포인트 컬러"
      >
        🎨 팔레트
      </button>
      {open && (
        <span className="ap-pop" role="listbox" aria-label="포인트 컬러 선택">
          {ACCENTS.map((a) => (
            <button
              key={a.key}
              role="option"
              aria-selected={accent === a.key}
              className={`ap-dot${accent === a.key ? ' active' : ''}`}
              style={{ '--ap-c': a.dot }}
              title={a.label}
              onClick={() => {
                setAccent(a.key)
                setOpen(false)
              }}
            >
              <span className="ap-name">{a.label}</span>
            </button>
          ))}
        </span>
      )}
    </span>
  )
}
