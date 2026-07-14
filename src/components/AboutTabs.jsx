// About 하위 페이지 탭 — 개발 취지 / 사용방법 안내 / 강사 소개
import { Link } from 'react-router-dom'

const TABS = [
  { key: 'purpose', label: '개발 취지', to: '/about' },
  { key: 'guide', label: '사용방법 안내', to: '/about/guide' },
  { key: 'instructor', label: '강사 소개', to: '/about/instructor' },
]

export default function AboutTabs({ current }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
      {TABS.map((t) => {
        const active = current === t.key
        return (
          <Link
            key={t.key}
            to={t.to}
            className="btn"
            style={{
              padding: '7px 16px', fontSize: 13.5, fontWeight: 800, borderRadius: 999,
              background: active ? 'var(--gold)' : 'transparent',
              color: active ? '#fff' : 'var(--navy-700)',
              border: active ? '1px solid var(--gold)' : '1px solid var(--line-strong)',
            }}
          >
            {t.label}
          </Link>
        )
      })}
    </div>
  )
}
