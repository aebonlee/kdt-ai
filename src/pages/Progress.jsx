import { Link } from 'react-router-dom'
import { sessionsBySubject, dayOf, totalSessions } from '../data/curriculum'
import { useProgress, setDone, resetProgress } from '../hooks/useProgress'

const regionClass = (r, k) => (r === '광주' ? 'gwangju' : k === '3반' ? 'pangyo3' : 'pangyo')

export default function Progress() {
  const done = useProgress()
  const groups = sessionsBySubject()
  const doneCount = Object.keys(done).length
  const pct = Math.round((doneCount / totalSessions) * 100)

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Learning Progress</span>
          <h1>학습관리</h1>
          <p>
            <span style={{ display: 'block' }}>수업 내용을 이해했으면 체크하세요.</span>
            <span style={{ display: 'block' }}>출결과 무관한 학습 이해도 자가평가이며, 체크한 만큼 진도율이 올라갑니다.</span>
            <span style={{ display: 'block' }}>기록은 이 브라우저에 저장됩니다.</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* 전체 진도 요약 */}
          <div className="card" style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <div className="progress-num">
                  <span className="pct">{pct}%</span>
                </div>
                <div style={{ color: 'var(--ink-soft)', marginTop: 6 }}>
                  {doneCount} / {totalSessions}일 이해 완료
                </div>
              </div>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  if (confirm('학습 진도 기록을 모두 초기화할까요?')) resetProgress()
                }}
              >
                진도 초기화
              </button>
            </div>
            <div className="progressbar" style={{ marginTop: 16 }}>
              <span style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* 과목별 자가평가 */}
          {groups.map(({ subject, items }) => {
            const subDone = items.filter((s) => done[s.date]).length
            const subPct = Math.round((subDone / items.length) * 100)
            return (
              <div key={subject.id} className="subject">
                <div className="subject-head">
                  <span className="chip chip-code">{subject.code}</span>
                  <h3>{subject.name}</h3>
                  <span className="chip chip-day">
                    {subDone} / {items.length}일 · {subPct}%
                  </span>
                </div>
                <div className="progressbar" style={{ margin: '10px 0 16px' }}>
                  <span style={{ width: `${subPct}%` }} />
                </div>

                <div className="grid grid-2">
                  {items.map((s) => {
                    const d = dayOf(s)
                    const isDone = !!done[s.date]
                    return (
                      <button
                        key={s.date}
                        className={`check${isDone ? ' done' : ''}`}
                        onClick={() => setDone(s.date, !isDone)}
                        aria-pressed={isDone}
                      >
                        <span className="box">{isDone ? '✓' : ''}</span>
                        <span style={{ flex: 1 }}>
                          <span className="ctitle">{d?.title}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                            <span className="cdate">{s.date.slice(5)} ({s.weekday})</span>
                            <span className={`chip chip-region ${regionClass(s.region, s.klass)}`} style={{ fontSize: 11 }}>
                              {s.region} {s.klass}
                            </span>
                          </span>
                        </span>
                        <Link
                          to={`/day/${s.date}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700, flex: '0 0 auto' }}
                        >
                          상세 →
                        </Link>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
