// 관리자 공통 셸 — 좌측 세로 메뉴 + 넓은 콘텐츠(최대 1600px).
// 라우트 레벨에서 관리자 페이지를 감싼다: <AdminShell><AdminDashboard/></AdminShell>
import { useEffect, useState } from 'react'
import { NavLink, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { evalUnits } from '../data/evalunits'
import { exams } from '../data/exams'

// 관리자 메뉴 — 세 카테고리로 나눈다(2026-07-21 대표 정리).
//   공통     : 4기 전체에 해당하는 정보. 분반·과정 구조와 수령 자료
//   담당강사 : 대표 본인의 강의·평가·명부 등 담당 업무
//   기타     : 사용 빈도가 낮고 애초 목적에 맞게 개발되지 않은 화면. 지우지 않고 접어 둔다
const GROUPS = [
  {
    id: 'common',
    label: '공통 메뉴',
    items: [
      { to: '/admin/main', label: '관리자 대시보드', icon: '🏠', end: true },
      { to: '/schedule', label: '수업일정표', icon: '📅' },
      { to: '/tracks', label: '과정별 안내', icon: '🧭' },
      { to: '/subjects', label: '과목별 안내', icon: '📘' },
      { to: '/admin', label: '자료실', icon: '📂', end: true },
    ],
  },
  {
    id: 'mine',
    label: '담당강사 메뉴',
    items: [
      { to: '/admin/schedule', label: '페어링 시간표', icon: '🗓️' },
      { to: '/admin/evaluate', label: '교과목 평가', icon: '📝' },
      { to: '/admin/roster', label: '가입명부', icon: '📋' },
    ],
  },
  {
    id: 'etc',
    label: '기타 메뉴',
    collapsible: true,   // 기본 접힘
    items: [
      // 학생 명단 : 가입명부 '분반별 학생명단' 탭과 역할이 겹침
      { to: '/admin/students', label: '학생 명단', icon: '👥' },
      // 팀별 명단 : teams.js 정적 편성 기반이고 현재 데이터가 비어 있음
      { to: '/admin/teams', label: '팀별 명단', icon: '🧩' },
      // 학습관리 : 학생 자가평가 진도. 학습자에게 의미가 없어 공개 메뉴에서 내림
      { to: '/progress', label: '학습관리', icon: '🗂️' },
    ],
  },
]

const ETC_ITEMS = GROUPS.find((g) => g.id === 'etc').items

export default function AdminShell({ children }) {
  const { user } = useAuth()
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const onEvaluate = pathname.startsWith('/admin/evaluate')
  const unitsWithExam = evalUnits.filter((u) => exams[u.subjectId])
  const activeUnit = params.get('unit') || (onEvaluate ? unitsWithExam[0]?.key : null)
  // 하위 메뉴 접기/펼치기 — 평가 화면 진입 시 자동 펼침, 클릭으로 토글
  const [subOpen, setSubOpen] = useState(onEvaluate)
  // 기타 그룹 — 기본 접힘, 해당 화면에 있으면 자동 펼침
  const onEtc = ETC_ITEMS.some((i) => pathname === i.to || pathname.startsWith(i.to + '/'))
  const [etcOpen, setEtcOpen] = useState(onEtc)
  useEffect(() => { if (onEtc) setEtcOpen(true) }, [onEtc])
  useEffect(() => { if (onEvaluate) setSubOpen(true) }, [onEvaluate])
  return (
    <div className="admin-shell">
      <aside className="admin-shell-side" aria-label="관리자 메뉴">
        <div className="admin-shell-badge">🔒 관리자</div>
        <div className="admin-shell-user" title={user?.email}>{user?.email}</div>
        <nav className="admin-shell-nav">
          {GROUPS.map((g, gi) => {
            const open = !g.collapsible || etcOpen
            return (
              <div key={g.id}>
                {gi > 0 && <div style={{ margin: '14px 0 6px', borderTop: '1px solid var(--line)' }} />}

                {g.collapsible ? (
                  <button
                    type="button"
                    onClick={() => setEtcOpen((v) => !v)}
                    aria-expanded={etcOpen}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '6px 10px', fontSize: 11.5, fontWeight: 800,
                      color: 'var(--ink-soft)', letterSpacing: '.03em',
                    }}
                  >
                    <span style={{ flex: 1, textAlign: 'left' }}>{g.label}</span>
                    <span style={{ fontSize: 11, transform: etcOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>▾</span>
                  </button>
                ) : (
                  <p style={{ margin: '0 0 4px', padding: '6px 10px', fontSize: 11.5, fontWeight: 800, color: 'var(--ink-soft)', letterSpacing: '.03em' }}>
                    {g.label}
                  </p>
                )}

                {open && g.items.map((it) => (
                  <div key={it.to}>
                    <NavLink
                      to={it.to}
                      end={it.end}
                      className={({ isActive }) => `admin-shell-link${isActive ? ' active' : ''}`}
                      style={g.collapsible ? { opacity: 0.85 } : undefined}
                    >
                      <span className="asl-ico">{it.icon}</span>
                      <span style={{ flex: 1 }}>{it.label}</span>
                      {it.to === '/admin/evaluate' && (
                        <button
                          type="button"
                          aria-label={subOpen ? '하위 메뉴 접기' : '하위 메뉴 펼치기'}
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSubOpen((v) => !v) }}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px',
                            color: 'inherit', fontSize: 11, transform: subOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s',
                          }}
                        >▾</button>
                      )}
                    </NavLink>

                    {/* 교과목 평가 — 평가 단위(과목×분반) 하위 메뉴 */}
                    {it.to === '/admin/evaluate' && subOpen && (
                      <div className="admin-shell-sub">
                        {unitsWithExam.map((u) => (
                          <NavLink
                            key={u.key}
                            to={`/admin/evaluate?unit=${encodeURIComponent(u.key)}`}
                            className={`admin-shell-sublink${activeUnit === u.key ? ' active' : ''}`}
                          >
                            <span className="assl-name">{u.subjectName}</span>
                            <span className="assl-meta">{u.campus} {u.cls} · {u.dateLabel}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          })}
        </nav>
      </aside>
      <div className="admin-shell-main">{children}</div>
    </div>
  )
}
