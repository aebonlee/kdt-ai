import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { sortedSessions, subjectById, dayOf, sessionByDate, referenceSubjects } from '../data/curriculum'
import { planFor } from '../data/lectureplans'
import { examplesFor } from '../data/lectureexamples'
import { conceptsFor } from '../data/lectureconcepts'
import { detailsFor } from '../data/lecturedetails'
import { theoryFor } from '../data/lecturetheory'
import { realCodeExtraFor } from '../data/lecturetheory2'
import { periodsFor, PERIOD_TIMES } from '../data/lectureperiods'
import CodeBlock from '../components/CodeBlock'

const regionClass = (r, k) => (r === '광주' ? 'gwangju' : r === '울산' ? 'ulsan' : k === '4층' ? 'pangyo3' : 'pangyo')
const monthLabel = (m) => `${Number(m.slice(5))}월`

// 참고용 키 파싱: "ref-<subjectId>-<day>"  (subjectId 에 하이픈 포함 가능)
function parseRef(param) {
  if (!param || !param.startsWith('ref-')) return null
  const m = param.slice(4).match(/^(.+)-(\d+)$/)
  if (!m) return null
  return { subjectId: m[1], day: Number(m[2]), isRef: true }
}

export default function Lectures() {
  const { date } = useParams()
  const navigate = useNavigate()
  const all = sortedSessions()

  const ref = parseRef(date)
  const session = !ref ? sessionByDate(date) : null
  const current = session || ref || all[0]
  const isRef = !!current.isRef
  const activeKey = isRef ? `ref-${current.subjectId}-${current.day}` : current.date

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
  const keyConcepts = conceptsFor(current.subjectId, current.day)
  const detail = detailsFor(current.subjectId, current.day)
  const deepTheory = theoryFor(current.subjectId, current.day)
  const realCodes = [
    ...(deepTheory?.realCode || []),
    ...realCodeExtraFor(current.subjectId, current.day),
  ]
  const dayPeriods = periodsFor(current.subjectId, current.day)

  // 탭 구성: 월별 그룹, 단 한 월에 지역이 여럿이면 지역별로 분리 (예: 10월 판교 / 10월 광주)
  const tabs = []
  for (const g of months) {
    const regions = [...new Set(g.items.map((s) => s.region))]
    if (regions.length <= 1) {
      tabs.push({ key: g.m, label: monthLabel(g.m), items: g.items })
    } else {
      for (const r of regions) {
        tabs.push({ key: `${g.m}|${r}`, label: `${monthLabel(g.m)} ${r}`, items: g.items.filter((s) => s.region === r) })
      }
    }
  }
  // 참고 탭을 10월 앞에 삽입 (7·8·9월 → 참고 → 10월 판교 → 10월 광주)
  if (referenceSubjects.length > 0) {
    const octIdx = tabs.findIndex((t) => t.key.startsWith('2026-10'))
    const refTab = { key: 'ref', label: '참고' }
    if (octIdx === -1) tabs.push(refTab)
    else tabs.splice(octIdx, 0, refTab)
  }
  const tabKeyFor = (s) => {
    const m = s.date.slice(0, 7)
    const g = months.find((x) => x.m === m)
    const regions = [...new Set(g.items.map((x) => x.region))]
    return regions.length <= 1 ? m : `${m}|${s.region}`
  }

  // 현재 항목의 탭을 기본 선택, 항목 변경 시 동기화
  const [tab, setTab] = useState(isRef ? 'ref' : tabKeyFor(current))
  useEffect(() => {
    setTab(isRef ? 'ref' : tabKeyFor(current))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey, isRef])
  const tabItems = tab === 'ref' ? [] : tabs.find((t) => t.key === tab)?.items || []

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Lecture Notes</span>
          <h1>강의안</h1>
          <p>
            <span style={{ display: 'block' }}>날짜별 8시간(09:00~18:00) 상세 강의안입니다.</span>
            <span style={{ display: 'block' }}>좌측에서 날짜를 선택하면 시간표와 실습을 볼 수 있습니다. (하단 "참고"는 미배정 과목)</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container layout-side">
          {/* 좌측 메뉴 — 월 탭 + 선택 월 목록 */}
          <nav className="side-nav" aria-label="강의 날짜">
            <div className="month-tabs">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  className={`month-tab${tab === t.key ? ' active' : ''}`}
                  onClick={() => setTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === 'ref'
              ? referenceSubjects.flatMap((rs) =>
                  rs.days.map((dd, i) => {
                    const key = `ref-${rs.id}-${i + 1}`
                    const isActive = key === activeKey
                    return (
                      <button
                        key={key}
                        className={`side-link${isActive ? ' active' : ''}`}
                        onClick={() => navigate(`/lectures/${key}`)}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        {rs.name} · Day {i + 1}
                        <span className="sl-sub">참고 자료</span>
                      </button>
                    )
                  }),
                )
              : tabItems.map((s) => {
                  const sj = subjectById(s.subjectId)
                  const isActive = !isRef && s.date === activeKey
                  return (
                    <button
                      key={s.date}
                      className={`side-link${isActive ? ' active' : ''}`}
                      onClick={() => navigate(`/lectures/${s.date}`)}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {s.date.slice(5)} ({s.weekday})
                      <span className="sl-sub">
                        {sj?.name} · {s.region} {s.klass}
                      </span>
                    </button>
                  )
                })}
          </nav>

          {/* 본문 — 강의안 */}
          <div>
            <div className="detail-meta">
              <span className="chip chip-code">{subj?.code}</span>
              <span className="chip chip-cat">{subj?.category}</span>
              {isRef ? (
                <span className="chip chip-region gwangju">참고 · 미배정</span>
              ) : (
                <span className={`chip chip-region ${regionClass(current.region, current.klass)}`}>
                  {current.region} {current.klass}
                </span>
              )}
              <span className="chip chip-day">Day {current.day} / {subj?.days.length}</span>
            </div>

            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--navy-800)', marginTop: 8 }}>
              {d?.title}
            </h2>
            <p style={{ color: 'var(--ink-soft)', marginTop: 4 }}>
              {subj?.name} ·{' '}
              {isRef
                ? '참고 강의안 (현재 강의 미배정)'
                : `${current.date} (${current.weekday}) · 09:00~18:00 (8H)`}
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

            {/* 핵심 개념 (이론) */}
            {keyConcepts.length > 0 && (
              <>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>
                  📚 핵심 개념
                </h3>
                <div className="grid grid-2" style={{ marginTop: 12 }}>
                  {keyConcepts.map((c, i) => (
                    <dl key={i} className="concept">
                      <dt>{c.term}</dt>
                      <dd>{c.desc}</dd>
                    </dl>
                  ))}
                </div>
              </>
            )}

            {/* 심화 이론 */}
            {deepTheory?.theory?.length > 0 && (
              <>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>
                  📘 심화 이론
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12 }}>
                  {deepTheory.theory.map((t, i) => (
                    <div key={i} className="card">
                      <h4 style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy-800)', marginBottom: 6 }}>{t.h}</h4>
                      <p style={{ fontSize: 14, color: 'var(--navy-700)', lineHeight: 1.85 }}>{t.body}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 상세 학습 내용 */}
            {detail?.topics?.length > 0 && (
              <>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>
                  📖 상세 학습 내용
                </h3>
                <div className="grid grid-3" style={{ marginTop: 12 }}>
                  {detail.topics.map((t, i) => (
                    <div key={i} className="card">
                      <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--gold)', marginBottom: 8 }}>{t.h}</h4>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {t.items.map((it, k) => (
                          <li key={k} style={{ position: 'relative', paddingLeft: 16, fontSize: 13.5, color: 'var(--navy-700)' }}>
                            <span style={{ position: 'absolute', left: 2, top: 9, width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 진행 시간표 (교시) */}
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>
              ⏱ 진행 시간표 <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)' }}>(09:00~17:50 · 교시당 50분)</span>
            </h3>
            {dayPeriods ? (
              <div className="card" style={{ marginTop: 12 }}>
                {PERIOD_TIMES.map((slot, j) => {
                  if (slot.lunch) {
                    return (
                      <div key="lunch" className="plan-row">
                        <div className="plan-time">{slot.time}</div>
                        <div className="plan-lunch">점심 휴식</div>
                      </div>
                    )
                  }
                  const ci = j < 3 ? j : j - 1 // 점심 슬롯 건너뛰고 내용 매핑
                  return (
                    <div key={slot.label} className="plan-row">
                      <div className="plan-time">
                        {slot.label}
                        <span style={{ display: 'block', fontWeight: 500, color: 'var(--ink-soft)', fontSize: 12 }}>{slot.time}</span>
                      </div>
                      <div className="plan-topic">{dayPeriods[ci]}</div>
                    </div>
                  )
                })}
              </div>
            ) : plan ? (
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

            {/* 추가 실습 (Lab) */}
            {detail?.labs?.length > 0 && (
              <>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>
                  🔬 추가 실습 (Lab)
                </h3>
                <div className="grid grid-2" style={{ marginTop: 12 }}>
                  {detail.labs.map((lab, i) => (
                    <div key={i} className="box box-tips">
                      <div className="box-h">{lab.title}</div>
                      <ol>
                        {lab.steps.map((s, k) => (
                          <li key={k}>{s}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
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

            {/* 실전 소스 (긴 코드) */}
            {realCodes.length > 0 && (
              <>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>
                  🛠 실전 소스
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 12 }}>
                  {realCodes.map((ex, i) => (
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

            {/* 과제 */}
            {detail?.homework?.length > 0 && (
              <>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>
                  📝 과제
                </h3>
                <div className="box box-practice" style={{ marginTop: 12 }}>
                  <ol>
                    {detail.homework.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ol>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
