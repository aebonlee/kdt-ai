import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { isAdmin } from '../config/admin'
import { useProgress } from '../hooks/useProgress'
import { totalSessions, sortedSessions, subjectById, dayOf } from '../data/curriculum'
import { modeOf } from '../data/lecturemodes'
import { listPosts, syncProgress } from '../data/db'
import { useProfile, isProfileComplete } from '../hooks/useProfile'
import { classLabel } from '../data/classes'
import { trackSchedule } from '../data/trackschedule'
import { openClassOnboarding } from '../components/ClassOnboarding'

const fmt = (s) => new Date(s).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })
// 실라버스 방식 배지 색상 (이론/실습/종합실습)
const modeClass = (tag) =>
  tag === '종합실습' ? 'mode-full' : tag === '실습' ? 'mode-lab' : tag === '이론+실습' ? 'mode-mix' : 'mode-theory'
const regionClass = (r, k) => (r === '광주' ? 'gwangju' : r === '울산' ? 'ulsan' : k === '4층' ? 'pangyo3' : 'pangyo')

export default function Dashboard() {
  const { user } = useAuth()
  const admin = isAdmin(user)
  const done = useProgress()
  const { status, profile } = useProfile()
  const student = status === 'ready' && isProfileComplete(profile) && profile.role === 'student'

  // 개별 진행 기준: 소속 분반이 있으면 "우리 반 수강 일정", 없으면 담당 세션 전체
  const schedule = student ? trackSchedule(profile.track).filter((it) => !it.event) : null
  const allSessions = sortedSessions()
  const totalDays = schedule ? schedule.length : totalSessions
  const doneCount = schedule
    ? schedule.filter((it) => done[it.date]).length
    : allSessions.filter((s) => done[s.date]).length
  const pct = totalDays ? Math.round((doneCount / totalDays) * 100) : 0

  // 다가오는 수업 — 분반 기준(있으면), 오늘 이후 6개
  const today = new Date().toLocaleDateString('sv-SE') // YYYY-MM-DD (로컬)
  const upSource = schedule || allSessions.map((s) => ({ date: s.date, session: s }))
  const upcomingAll = upSource.filter((x) => x.date >= today)
  const upcoming = (upcomingAll.length ? upcomingAll : upSource.slice(-6)).slice(0, 6)

  const [notices, setNotices] = useState([])

  // 내 진도를 Supabase에 동기화 (자가평가 변경 시)
  useEffect(() => {
    if (user) syncProgress(user, Object.keys(done)).catch(() => {})
  }, [user, done])

  useEffect(() => {
    listPosts('notice').then((p) => setNotices(p.slice(0, 5))).catch(() => {})
  }, [])

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Dashboard</span>
          <h1>대시보드</h1>
          <p>
            <span style={{ display: 'block' }}>내 학습 진도와 공지를 한눈에 확인하세요.</span>
            {student ? (
              <span style={{ display: 'block' }}>
                소속 <b>{classLabel(profile.track, profile.class_no)}</b>의 수강 일정 기준으로 개별 진행률을 계산합니다.
              </span>
            ) : (
              <span style={{ display: 'block' }}>
                소속 분반을 등록하면 우리 반 일정 기준으로 진행률이 계산됩니다.{' '}
                <button onClick={openClassOnboarding} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gold)', fontWeight: 800, textDecoration: 'underline', fontSize: 'inherit', fontFamily: 'inherit' }}>
                  소속 등록
                </button>
              </span>
            )}
            {admin && <span style={{ display: 'block' }}>관리 기능은 상단 관리 메뉴의 <Link to="/admin/main" style={{ color: 'var(--gold)', fontWeight: 800 }}>관리자 대시보드</Link>에서 확인하세요.</span>}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* 내 진도 */}
          <div className="grid grid-3" style={{ marginBottom: 28 }}>
            <div className="card">
              <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>내 진도율</p>
              <div className="progress-num" style={{ marginTop: 6 }}>
                <span className="pct">{pct}%</span>
              </div>
              <div className="progressbar" style={{ marginTop: 12 }}>
                <span style={{ width: `${pct}%` }} />
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 8 }}>
                {doneCount} / {totalDays}일 이해 완료{student ? ` · ${classLabel(profile.track, profile.class_no)} 일정 기준` : ''}
              </p>
              <Link to="/progress" className="section-link" style={{ display: 'inline-block', marginTop: 10 }}>
                학습관리로 →
              </Link>
            </div>

            <div className="card" style={{ gridColumn: 'span 2' }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--navy-800)', marginBottom: 10 }}>📢 공지사항</p>
              {notices.length === 0 ? (
                <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>등록된 공지가 없습니다.</p>
              ) : (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {notices.map((n) => (
                    <li key={n.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                      <Link to={`/board/${n.id}`} style={{ color: 'var(--navy-700)', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {n.title}
                      </Link>
                      <span style={{ fontSize: 12, color: 'var(--ink-soft)', flex: '0 0 auto' }}>{fmt(n.created_at)}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Link to="/board" className="section-link" style={{ display: 'inline-block', marginTop: 12 }}>
                게시판으로 →
              </Link>
            </div>
          </div>

          {/* 다가오는 수업 (방식 배지 포함) */}
          <div className="card" style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--navy-800)', marginBottom: 12 }}>
              🗓 {upcomingAll.length ? '다가오는 수업' : '최근 수업'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {upcoming.map((it) => {
                if (it.session) {
                  const s2 = it.session
                  const subj = subjectById(s2.subjectId)
                  const d = dayOf(s2)
                  const mode = modeOf(s2.subjectId, s2.day)
                  return (
                    <Link key={s2.date + s2.klass} to={`/day/${s2.date}`} className="session-row">
                      <span style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <span className="date">{s2.date.slice(5)} ({s2.weekday})</span>
                        <span className={`chip chip-region ${regionClass(s2.region, s2.klass)}`}>{s2.region} {s2.klass}</span>
                        {mode && <span className={`chip chip-mode ${modeClass(mode.tag)}`}>{mode.tag}</span>}
                        <span className="title">{subj?.name} · {d?.title}</span>
                      </span>
                      <span style={{ color: 'var(--ink-soft)', fontSize: 13, flex: '0 0 auto' }}>Day {s2.day} →</span>
                    </Link>
                  )
                }
                // 분반 일정 항목(담당 + 타 강사)
                return (
                  <Link key={it.date} to={it.link || '/lectures'} className="session-row">
                    <span style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      <span className="date">{it.date.slice(5)}{it.weekday ? ` (${it.weekday})` : ''}</span>
                      <span className="title" style={!it.mine ? { color: 'var(--etc-green)' } : undefined}>{it.name}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: it.mine ? 'var(--gold)' : 'var(--ink-soft)' }}>
                        {it.mine ? '이애본 강사' : it.by ? `${it.by} 강사` : ''}
                      </span>
                    </span>
                    <span style={{ color: 'var(--ink-soft)', fontSize: 13, flex: '0 0 auto' }}>학습 →</span>
                  </Link>
                )
              })}
            </div>
            <Link to="/lectures" className="section-link" style={{ display: 'inline-block', marginTop: 12 }}>
              강의안으로 →
            </Link>
          </div>

        </div>
      </section>
    </div>
  )
}
