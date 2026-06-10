import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { isAdmin } from '../config/admin'
import { useProgress } from '../hooks/useProgress'
import { totalSessions } from '../data/curriculum'
import { listPosts, syncProgress, listAllProgress } from '../data/db'

const fmt = (s) => new Date(s).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })

export default function Dashboard() {
  const { user } = useAuth()
  const admin = isAdmin(user)
  const done = useProgress()
  const doneCount = Object.keys(done).length
  const pct = Math.round((doneCount / totalSessions) * 100)

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
