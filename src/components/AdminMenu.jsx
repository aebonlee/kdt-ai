import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 강사(최고 관리자) 전용 풍선 메뉴 — 띠줄에서 관리 화면으로 바로가기.
const ITEMS = [
  { icon: '🏠', label: '관리자 대시보드', desc: '분반 현황 · 평가 진행 · 교수자', to: '/admin/main' },
  { icon: '👥', label: '학생 명단', desc: '분반·진도·소속 확인', to: '/admin/students' },
  { icon: '🧩', label: '팀별 명단', desc: '프로젝트 팀 편성', to: '/admin/teams' },
  { icon: '📂', label: '자료실', desc: '강의자료(구글드라이브)', to: '/admin' },
  { icon: '📅', label: '수업일정표', desc: '월별 타임라인 · 분반별', to: '/schedule' },
  { icon: '📘', label: '과목별 안내', desc: '담당 과목 일자별 학습 내용', to: '/subjects' },
  { icon: '🗓️', label: '페어링 시간표', desc: '내 강의일 · 주강사 짝', to: '/admin/schedule' },
  { icon: '📝', label: '교과목 평가', desc: '종합실습 평가 입력 · CSV', to: '/admin/evaluate' },
]

export default function AdminMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  // 바깥 클릭 · ESC 로 닫기
  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (to) => { setOpen(false); navigate(to) }

  return (
    <span className="admin-menu" ref={ref}>
      <button
        type="button"
        className="topbar-admin"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        🔒 관리 <span className="admin-caret">▾</span>
      </button>

      {open && (
        <div className="admin-pop" role="menu">
          <div className="admin-pop-arrow" />
          <p className="admin-pop-title">강사 관리 메뉴</p>
          {ITEMS.map((it) => (
            <button key={it.to} type="button" role="menuitem" className="admin-pop-item" onClick={() => go(it.to)}>
              <span className="admin-pop-ico">{it.icon}</span>
              <span>
                <span className="admin-pop-label">{it.label}</span>
                <span className="admin-pop-desc">{it.desc}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </span>
  )
}
