import { useParams, useNavigate } from 'react-router-dom'
import { sortedSessions, subjectById, dayOf, sessionByDate } from '../data/curriculum'
import { planFor } from '../data/lectureplans'
import { examplesFor } from '../data/lectureexamples'
import CodeBlock from '../components/CodeBlock'

const regionClass = (r) => (r === '광주' ? 'gwangju' : 'pangyo')
const monthLabel = (m) => `${Number(m.slice(5))}월`

export default function Lectures() {
  const { date } = useParams()
  const navigate = useNavigate()
  const all = sortedSessions()
  const current = sessionByDate(date) || all[0]

  // 월별 그룹
  const months = []
  for (const s of all) {
    const m = s.date.slice(0, 7)
    let g = months.find((x) => x.m === m)
    if (!g) {
      g = { m, items: [] }
      months.push(g)
    }
    g.items.push(s)
  }

  const subj = subjectById(current.subjectId)
  const d = dayOf(current)
  const plan = planFor(current.subjectId, current.day)
  const codeExamples = examplesFor(current.subjectId, current.day)

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Lecture Notes</span>
          <h1>강의안</h1>
          <p>
            <span style={{ display: 'block' }}>날짜별 8시간(09:00~18:00) 상세 강의안입니다.</span>
            <span style={{ display: 'block' }}>좌측에서 날짜를 선택하면 해당 일자의 시간표와 실습을 볼 수 있습니다.</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container layout-side">
          {/* 좌측 날짜 메뉴 */}
          <nav className="side-nav" aria-label="강의 날짜">
            {months.map((g) => (
              <div key={g.m}>
                <p className="side-nav-title">{monthLabel(g.m)}</p>
                {g.items.map((s) => {
                  const sj = subjectById(s.subjectId)
                  const isActive = s.date === current.date
                  return (
                    <button
                      key={s.date}
                      className={`side-link${isActive ? ' active' : ''}`}
                      onClick={() => navigate(`/lectures/${s.date}`)}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {s.date.slice(5)} ({s.weekday})
                      <span className="sl-sub">
                        {sj?.name} · {s.region}
                      </span>
                    </button>
                  )
                })}
              </div>
            ))}
          </nav>

          {/* 본문 — 강의안 */}
          <div>
            <div className="detail-meta">
              <span className="chip chip-code">{subj?.code}</span>
              <span className="chip chip-cat">{subj?.category}</span>
              <span className={`chip chip-region ${regionClass(current.region)}`}>
                {current.region} {current.klass}
              </span>
              <span className="chip chip-day">Day {current.day} / {subj?.days.length}</span>
            </div>

            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--navy-800)', marginTop: 8 }}>
              {d?.title}
            </h2>
            <p style={{ color: 'var(--ink-soft)', marginTop: 4 }}>
              {subj?.name} · {current.date} ({current.weekday}) · 09:00~18:00 (8H)
            </p>

            {/* 학습 목표 */}
            {d?.objectives?.length > 0 && (
              <div className="box box-tips" style={{ marginTop: 20 }}>
                <div className="box-h">🎯 학습 목표</div>
                <ul>
                  {d.objectives.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 8시간 시간표 */}
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>
              ⏱ 진행 시간표
            </h3>
            {plan ? (
              <div className="card" style={{ marginTop: 12 }}>
                {plan.schedule.map((row, i) => (
                  <div key={i} className="plan-row">
                    <div className="plan-time">{row.time}</div>
                    <div>
                      {row.lunch ? (
                        <div className="plan-lunch">{row.topic}</div>
                      ) : (
                        <>
                          <div className="plan-topic">{row.topic}</div>
                          {row.detail && <div className="plan-detail">{row.detail}</div>}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--ink-soft)', marginTop: 12 }}>강의안 준비 중입니다.</p>
            )}

            {/* 실습 */}
            {plan?.practice && (
              <>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>
                  🧪 실습
                </h3>
                <div className="box box-practice" style={{ marginTop: 12 }}>
                  <div className="box-h">{plan.practice.title}</div>
                  <ol>
                    {plan.practice.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                  <p style={{ marginTop: 12, fontSize: 14, color: 'var(--navy-700)' }}>
                    <strong style={{ color: 'var(--gold)' }}>📦 산출물 · </strong>
                    {plan.practice.deliverable}
                  </p>
                </div>
              </>
            )}

            {/* 실습 예제 (기술 코드) */}
            {codeExamples.length > 0 && (
              <>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>
                  💻 실습 예제
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 12 }}>
                  {codeExamples.map((ex, i) => (
                    <div key={i}>
                      <div className="box-h" style={{ marginBottom: 8 }}>
                        {ex.title}
                        <span style={{ fontWeight: 600, color: 'var(--ink-soft)', fontSize: 12 }}>({ex.lang})</span>
                      </div>
                      <CodeBlock code={ex.code} lang={ex.lang} />
                      {ex.note && (
                        <p style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                          💡 {ex.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
