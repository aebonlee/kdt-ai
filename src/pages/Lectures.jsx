import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { sortedSessions, subjectById, dayOf, sessionByDate, referenceSubjects } from '../data/curriculum'
import { PERIOD_TIMES } from '../data/lectureperiods'
import { modeOf, periodTagsOf } from '../data/lecturemodes'
import Rich from '../components/Rich'
import CodeBlock from '../components/CodeBlock'
import Rating from '../components/Rating'
import ExamQuiz from '../components/ExamQuiz'
import { practiceGuides } from '../data/practiceGuides'
import EtcCourse from '../components/EtcCourse'
import { otherCourses } from '../data/othercontent'
import { etcMonthlyDigest, otherPeriods, EVENT_LABELS } from '../data/othersessions'

// 실라버스 방식 배지 색상 (이론/실습/종합실습)
const modeClass = (tag) =>
  tag === '종합실습' ? 'mode-full' : tag === '실습' ? 'mode-lab' : tag === '이론+실습' ? 'mode-mix' : 'mode-theory'

// 과목별 강의 데이터는 현재 과목만 동적 로드 → 초기 강의안 청크에서 미사용 과목 제외.
// (src/data/lectures/<subjectId>.js 는 prebuild/predev 코드모드가 생성)
const subjectModules = import.meta.glob('../data/lectures/*.js', { import: 'default' })

const regionClass = (r, k) => (r === '광주' ? 'gwangju' : r === '울산' ? 'ulsan' : k === '4층' ? 'pangyo3' : 'pangyo')
const monthLabel = (m) => `${Number(m.slice(5))}월`

// 참고용 키 파싱: "ref-<subjectId>-<day>"  (subjectId 에 하이픈 포함 가능)
function parseRef(param) {
  if (!param || !param.startsWith('ref-')) return null
  const m = param.slice(4).match(/^(.+)-(\d+)$/)
  if (!m) return null
  return { subjectId: m[1], day: Number(m[2]), isRef: true }
}

// 기타(타 강사) 과목 키 파싱: "etc-<courseId>"
function parseEtc(param) {
  if (!param || !param.startsWith('etc-')) return null
  return { courseId: param.slice(4) }
}

// 기타 셀의 표시 이름: 기타 과목 → 담당 과목(타 반 진행) → 특강/행사 순으로 해석
function etcName(c) {
  return otherCourses[c]?.name || subjectById(c)?.name || EVENT_LABELS[c] || c
}

export default function Lectures() {
  const { date } = useParams()
  const navigate = useNavigate()
  const all = sortedSessions()

  const etc = parseEtc(date)
  const ref = !etc ? parseRef(date) : null
  const session = !ref && !etc ? sessionByDate(date) : null
  // 날짜 미지정 진입 시: 오늘 강의일 → 없으면 다음 강의일 → 과정 종료 후엔 마지막 강의일 (시스템 날짜 기준 유동)
  const todayStr = new Date().toLocaleDateString('sv-SE')
  const defaultSession = sessionByDate(todayStr) || all.find((s) => s.date >= todayStr) || all[all.length - 1]
  const current = session || ref || defaultSession
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
  const mode = modeOf(current.subjectId, current.day)
  const periodTags = periodTagsOf(current.subjectId, current.day)

  // 현재 과목 강의 데이터를 동적 로드. 같은 과목 내 일차 전환은 재로드 없이 즉시,
  // 과목이 바뀔 때만 짧게 로드. stale 가드로 늦게 도착한 이전 과목 데이터의 덮어쓰기 방지.
  const [subjData, setSubjData] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)
  useEffect(() => {
    let cancelled = false
    const sid = current.subjectId
    setDataLoading(true)
    setSubjData(null) // 과목 전환 시 이전 과목 내용이 잠깐 비치지 않게 즉시 비움
    const loader = subjectModules[`../data/lectures/${sid}.js`]
    if (!loader) {
      setDataLoading(false)
      return
    }
    loader()
      .then((mod) => {
        if (!cancelled) {
          setSubjData(mod)
          setDataLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) setDataLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [current.subjectId])

  const dd = subjData ? subjData[`${current.subjectId}-${current.day}`] : null
  const plan = dd?.plan || null
  const codeExamples = dd?.examples || []
  const keyConcepts = dd?.concepts || []
  const detail = dd?.detail || null
  const deepTheory = dd?.theory || null
  const realCodes = dd?.realCodes || []
  const dayPeriods = dd?.periods || null

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
            <span style={{ display: 'block' }}>좌측에서 날짜를 선택하면 시간표와 실습을 볼 수 있습니다. (하단 "참고"는 참고자료 과목)</span>
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
                      className={`side-link${isActive ? ' active' : ''}${s.date === todayStr ? ' is-today' : ''}`}
                      onClick={() => navigate(`/lectures/${s.date}`)}
                      aria-current={isActive ? 'true' : undefined}
                      style={s.date === todayStr ? { background: 'rgba(212,160,23,0.18)', boxShadow: 'inset 4px 0 0 var(--gold)', fontWeight: 800 } : undefined}
                    >
                      {s.date.slice(5)} ({s.weekday}){s.date === todayStr ? ' · 오늘' : ''}
                      <span className="sl-sub">
                        {sj?.name} · {s.region} {s.klass}
                      </span>
                    </button>
                  )
                })}

            {/* 담당일정 외 강의내용 학습 자료 — 월별·과목별 */}
            <details className="etc-nav" open={!!etc}>
              <summary>📚 담당일정 외 강의내용 학습 자료</summary>
              <p className="etc-nav-note">담당 강의 전후로 각 분반에서 배우는 과목입니다. 과목을 누르면 학습내용을 볼 수 있습니다.</p>
              {etcMonthlyDigest().map((g) => (
                <div key={g.month}>
                  <div className="side-nav-title etc-month">{Number(g.month.slice(5))}월</div>
                  {g.items.map((it) => {
                    const isEtcCourse = !!otherCourses[it.c]
                    // 담당 과목의 타 반(타 강사) 진행 — 클릭하면 담당 강의안 첫날로 연결
                    const mySubjectDate = !isEtcCourse ? all.find((s) => s.subjectId === it.c)?.date : null
                    // 세션 없는 담당 과목(prompt·rag·spring-ai 등 참고자료)은 참고자료 강의안 1일차로 연결
                    const refSubject = !isEtcCourse && !mySubjectDate && subjectById(it.c)?.days?.length ? it.c : null
                    const clickable = isEtcCourse || !!mySubjectDate || !!refSubject
                    const range = it.from === it.to ? it.from.slice(5) : `${it.from.slice(5)}~${it.to.slice(8)}`
                    const active = etc?.courseId === it.c
                    return (
                      <button
                        key={`${g.month}-${it.c}`}
                        className={`side-link etc-link${active ? ' active' : ''}${clickable ? '' : ' etc-plain'}`}
                        onClick={() => {
                          if (isEtcCourse) navigate(`/lectures/etc-${it.c}`)
                          else if (mySubjectDate) navigate(`/lectures/${mySubjectDate}`)
                          else if (refSubject) navigate(`/lectures/ref-${refSubject}-1`)
                        }}
                        disabled={!clickable}
                      >
                        {etcName(it.c)}
                        {(mySubjectDate || refSubject) ? <span style={{ marginLeft: 4, color: 'var(--gold)', fontWeight: 800 }}>★</span> : null}
                        <span className="sl-sub">
                          {range} · {it.tracks.join(' · ')}{mySubjectDate ? ' · 담당 강의안 보기' : refSubject ? ' · 참고자료 강의안 보기' : ''}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ))}
              <div className="side-nav-title etc-month">11월 이후</div>
              {otherPeriods.map((p) => (
                <div key={p.range} className="etc-period">
                  <b>{p.label}</b>
                  <span>{p.range}</span>
                  <span>{p.note}</span>
                </div>
              ))}
              <p className="etc-nav-note">※ 실시간 배정표 기준 · 일정은 변동될 수 있습니다.</p>
            </details>
          </nav>

          {/* 본문 — 강의안 (기타 과목이면 학습내용 패널) */}
          {etc ? (
            <EtcCourse courseId={etc.courseId} />
          ) : (
          <div>
            <div className="detail-meta">
              <span className="chip chip-code">{subj?.code}</span>
              <span className="chip chip-cat">{subj?.category}</span>
              {isRef ? (
                <span className="chip chip-region gwangju">참고자료</span>
              ) : (
                <span className={`chip chip-region ${regionClass(current.region, current.klass)}`}>
                  {current.region} {current.klass}
                </span>
              )}
              <span className="chip chip-day">Day {current.day} / {subj?.days.length}</span>
              <Rating level={subj?.level} weight={subj?.weight} />
              {mode && <span className={`chip chip-mode ${modeClass(mode.tag)}`}>{mode.tag}</span>}
            </div>

            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--navy-800)', marginTop: 8 }}>
              {d?.title}
            </h2>
            <p style={{ color: 'var(--ink-soft)', marginTop: 4 }}>
              {subj?.name} ·{' '}
              {isRef
                ? '참고자료 강의안'
                : `${current.date} (${current.weekday}) · 09:00~18:00 (8H)`}
            </p>

            {/* 실라버스 기준 진행 방식 (이론/실습/종합실습) */}
            {mode && (
              <div className="mode-note" style={{ marginTop: 14 }}>
                <strong className={`mode-badge ${modeClass(mode.tag)}`}>{mode.tag}</strong>
                <span className="mode-ratio">{mode.ratio}</span>
                <span className="mode-desc">{mode.note}</span>
              </div>
            )}

            {/* 학습 목표 */}
            {d?.objectives?.length > 0 && (
              <div className="box box-tips" style={{ marginTop: 20 }}>
                <div className="box-h">🎯 학습 목표</div>
                <ul>
                  {d.objectives.map((o, i) => (
                    <li key={i}><Rich text={o} /></li>
                  ))}
                </ul>
              </div>
            )}

            {/* 과목 데이터 로딩 중(과목 전환 시 잠깐) */}
            {dataLoading && !dd && (
              <div style={{ marginTop: 20, padding: '48px 20px', textAlign: 'center', color: 'var(--ink-soft)' }}>
                강의안을 불러오는 중…
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
                      <dd style={{ whiteSpace: 'pre-line' }}><Rich text={c.desc} /></dd>
                    </dl>
                  ))}
                </div>
              </>
            )}

            {/* 개념 도해 (plan.figures — 수업 중 시각 자료) */}
            {plan?.figures?.length > 0 && (
              <>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>
                  📐 개념 도해
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 12 }}>
                  {plan.figures.map((f) => (
                    <figure key={f.src} className="card" style={{ margin: 0, padding: 16 }}>
                      <div className="box-h" style={{ marginBottom: 10 }}>{f.title}</div>
                      <img src={f.src} alt={f.title} style={{ width: '100%', maxWidth: 760, display: 'block', borderRadius: 10 }} />
                      {f.caption && (
                        <figcaption style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.7, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                          <Rich text={f.caption} />
                        </figcaption>
                      )}
                    </figure>
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
                      <p style={{ fontSize: 14, color: 'var(--navy-700)', lineHeight: 1.85, whiteSpace: 'pre-line' }}><Rich text={t.body} /></p>
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
                {/* 기본 2열(2×2). 내용이 긴 박스는 전체폭으로 늘려(3+1 / 1개) 가독성 확보 */}
                <div className="grid grid-2" style={{ marginTop: 12 }}>
                  {detail.topics.map((t, i) => {
                    const items = t.items || []
                    const isLong = items.length >= 6 || items.join('').length > 240
                    return (
                      <div key={i} className="card" style={isLong ? { gridColumn: '1 / -1' } : undefined}>
                        <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--gold)', marginBottom: 8 }}>{t.h}</h4>
                        <ul
                          style={
                            isLong
                              ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '6px 24px', margin: 0, padding: 0, listStyle: 'none' }
                              : { display: 'flex', flexDirection: 'column', gap: 6, margin: 0, padding: 0, listStyle: 'none' }
                          }
                        >
                          {items.map((it, k) => (
                            <li key={k} style={{ position: 'relative', paddingLeft: 16, fontSize: 13.5, color: 'var(--navy-700)' }}>
                              <span style={{ position: 'absolute', left: 2, top: 9, width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
                              <Rich text={it} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
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
                  const ptag = periodTags?.[ci]
                  return (
                    <div key={slot.label} className="plan-row">
                      <div className="plan-time">
                        {slot.label}
                        <span style={{ display: 'block', fontWeight: 500, color: 'var(--ink-soft)', fontSize: 12 }}>{slot.time}</span>
                      </div>
                      <div className="plan-topic plan-topic-row">
                        <span>{dayPeriods[ci]}</span>
                        {ptag && <span className={`period-tag ${modeClass(ptag)}`}>{ptag}</span>}
                      </div>
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
                      <li key={i}><Rich text={s} /></li>
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
                          <li key={k}><Rich text={s} /></li>
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
                      {ex.files?.length > 0 && (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '2px 0 8px' }}>
                          {ex.files.map((f2) => (
                            <a key={f2.href} href={f2.href} download className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: 12.5 }}>
                              ⬇ {f2.label}
                            </a>
                          ))}
                        </div>
                      )}
                      <CodeBlock code={ex.code} lang={ex.lang} />
                      {ex.note && (
                        <p style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                          💡 <Rich text={ex.note} />
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
                      {ex.files?.length > 0 && (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '2px 0 8px' }}>
                          {ex.files.map((f2) => (
                            <a key={f2.href} href={f2.href} download className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: 12.5 }}>
                              ⬇ {f2.label}
                            </a>
                          ))}
                        </div>
                      )}
                      <CodeBlock code={ex.code} lang={ex.lang} />
                      {ex.note && (
                        <p style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                          💡 <Rich text={ex.note} />
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
                      <li key={i}><Rich text={h} /></li>
                    ))}
                  </ol>
                </div>
              </>
            )}

            {/* 종합실습 안내(전임교수 배포본) — 마지막 날, 복습퀴즈 위에 노출 */}
            {!isRef && practiceGuides[current.subjectId] && current.day === (subj?.days?.length || 1) && (() => {
              const g = practiceGuides[current.subjectId]
              return (
                <div style={{ marginTop: 28 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '0 0 4px' }}>
                    🧪 {g.title}
                  </h3>
                  <div className="box box-practice" style={{ marginTop: 12 }}>
                    <p style={{ margin: '0 0 10px', color: 'var(--ink-soft)', fontSize: 13 }}>
                      <Rich text={g.intro} /> <span style={{ opacity: 0.7 }}>({g.source})</span>
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                      {g.files.map((f) => (
                        <a key={f.href} href={f.href} download className="btn btn-cta" style={{ fontSize: 13, padding: '8px 14px' }}>
                          ⬇ {f.label}
                        </a>
                      ))}
                    </div>
                    {g.groups.map((grp) => (
                      <div key={grp.h} style={{ marginTop: 12 }}>
                        <div className="box-h" style={{ marginBottom: 6 }}>{grp.h}</div>
                        {grp.note && <p style={{ margin: '0 0 6px', fontSize: 13.5, color: 'var(--navy-700)' }}><Rich text={grp.note} /></p>}
                        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 5 }}>
                          {grp.items.map((it, i) => (
                            <li key={i} style={{ fontSize: 13.5, color: 'var(--navy-700)', lineHeight: 1.6 }}><Rich text={it} /></li>
                          ))}
                        </ul>
                        {grp.after && <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}><Rich text={grp.after} /></p>}
                      </div>
                    ))}
                    <p style={{ margin: '14px 0 0', fontSize: 14, fontWeight: 800, color: 'var(--gold)' }}>{g.deadline}</p>
                    <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}><Rich text={g.submit} /></p>
                  </div>
                </div>
              )
            })()}

            {/* 종합실습 평가기준(첫날) · 복습 퀴즈(마지막날) */}
            {!isRef && (
              <ExamQuiz subjectId={current.subjectId} day={current.day} totalDays={subj?.days?.length || 1} />
            )}
          </div>
          )}
        </div>
      </section>
    </div>
  )
}
