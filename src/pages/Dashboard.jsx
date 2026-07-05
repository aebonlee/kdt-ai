import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { isAdmin } from '../config/admin'
import { useProgress } from '../hooks/useProgress'
import { totalSessions, sortedSessions, subjectById, dayOf } from '../data/curriculum'
import { modeOf } from '../data/lecturemodes'
import { listPosts, syncProgress, listAllProgress } from '../data/db'

const fmt = (s) => new Date(s).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })
// 실라버스 방식 배지 색상 (이론/실습/종합실습)
const modeClass = (tag) =>
  tag === '종합실습' ? 'mode-full' : tag === '실습' ? 'mode-lab' : tag === '이론+실습' ? 'mode-mix' : 'mode-theory'
const regionClass = (r, k) => (r === '광주' ? 'gwangju' : r === '울산' ? 'ulsan' : k === '4층' ? 'pangyo3' : 'pangyo')

export default function Dashboard() {
  const { user } = useAuth()
  const admin = isAdmin(user)
  const done = useProgress()
  // 저장된 키가 아니라 실제 세션 기준 집계(stale 키로 100% 초과 방지)
  const allSessions = sortedSessions()
  const doneCount = allSessions.filter((s) => done[s.date]).length
  const pct = Math.round((doneCount / totalSessions) * 100)

  // 다가오는 수업 (오늘 이후 6일) — 과정 종료 후엔 마지막 수업들 표시
  const today = new Date().toLocaleDateString('sv-SE') // YYYY-MM-DD (로컬)
  const upcomingAll = allSessions.filter((s) => s.date >= today)
  const upcoming = (upcomingAll.length ? upcomingAll : allSessions.slice(-6)).slice(0, 6)

  const [notices, setNotices] = useState([])
  const [allProgress, setAllProgress] = useState(null)

  // 내 진도를 Supabase에 동기화 (자가평가 변경 시)
  useEffect(() => {
    if (user) syncProgress(user, Object.keys(done)).catch(() => {})
  }, [user, done])

  useEffect(() => {
    listPosts('notice').then((p) => setNotices(p.slice(0, 5))).catch(() => {})
    if (admin) listAllProgress().then(setAllProgress).catch(() => {})
  }, [admin])

  // 강사용 집계
  const learnerCount = allProgress?.length ?? 0
  const avgPct =
    allProgress && allProgress.length
      ? Math.round(
          allProgress.reduce((sum, r) => sum + (r.completed?.length ?? 0), 0) / allProgress.length / totalSessions * 100,
        )
      : 0

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Dashboard</span>
          <h1>대시보드</h1>
          <p>
            <span style={{ display: 'block' }}>내 학습 진도와 공지를 한눈에 확인하세요.</span>
            {admin && <span style={{ display: 'block' }}>강사 권한으로 전체 학습 현황도 함께 표시됩니다.</span>}
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
                {doneCount} / {totalSessions}일 이해 완료
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
              {upcoming.map((s) => {
                const subj = subjectById(s.subjectId)
                const d = dayOf(s)
                const mode = modeOf(s.subjectId, s.day)
                return (
                  <Link key={s.date + s.klass} to={`/day/${s.date}`} className="session-row">
                    <span style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      <span className="date">{s.date.slice(5)} ({s.weekday})</span>
                      <span className={`chip chip-region ${regionClass(s.region, s.klass)}`}>{s.region} {s.klass}</span>
                      {mode && <span className={`chip chip-mode ${modeClass(mode.tag)}`}>{mode.tag}</span>}
                      <span className="title">{subj?.name} · {d?.title}</span>
                    </span>
                    <span style={{ color: 'var(--ink-soft)', fontSize: 13, flex: '0 0 auto' }}>Day {s.day} →</span>
                  </Link>
                )
              })}
            </div>
            <Link to="/schedule" className="section-link" style={{ display: 'inline-block', marginTop: 12 }}>
              전체 일정으로 →
            </Link>
          </div>

          {/* 강사 관리 대시보드 */}
          {admin && (
            <>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--navy-800)', margin: '8px 0 16px' }}>
                강사 관리 대시보드
              </h2>
              <div className="grid grid-3" style={{ marginBottom: 20 }}>
                <div className="card">
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>학습자 수</p>
                  <div className="progress-num" style={{ marginTop: 6 }}>{learnerCount}<span style={{ fontSize: 18 }}>명</span></div>
                </div>
                <div className="card">
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>평균 진도율</p>
                  <div className="progress-num" style={{ marginTop: 6 }}><span className="pct">{avgPct}%</span></div>
                </div>
                <div className="card">
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>전체 강의일</p>
                  <div className="progress-num" style={{ marginTop: 6 }}>{totalSessions}<span style={{ fontSize: 18 }}>일</span></div>
                </div>
              </div>

              <div className="card">
                <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--navy-800)', marginBottom: 12 }}>학습자별 진도</p>
                {!allProgress ? (
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>불러오는 중… (skala_progress 테이블·RLS 설정 필요)</p>
                ) : allProgress.length === 0 ? (
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>아직 데이터가 없습니다.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {allProgress.map((r) => {
                      const p = Math.round(((r.completed?.length ?? 0) / totalSessions) * 100)
                      return (
                        <div key={r.user_id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ width: 140, fontSize: 13, color: 'var(--navy-700)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.user_name}</span>
                          <span className="progressbar" style={{ flex: 1 }}><span style={{ width: `${p}%` }} /></span>
                          <span style={{ width: 44, textAlign: 'right', fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>{p}%</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
