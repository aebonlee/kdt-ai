import { useState, useEffect } from 'react'
import { subjects, subjectById } from '../data/curriculum'
import { PERIOD_TIMES } from '../data/lectureperiods'
import { modeOf, periodTagsOf } from '../data/lecturemodes'
import Rich from '../components/Rich'
import CodeBlock from '../components/CodeBlock'
import Rating from '../components/Rating'
import ExamQuiz from '../components/ExamQuiz'
import { practiceGuides } from '../data/practiceGuides'
import EtcCourse from '../components/EtcCourse'
import PracticeSupplement from '../components/PracticeSupplement'
import { otherCourses } from '../data/othercontent'

// 실습교안 — 네이티브 React 렌더(과거 practice-textbook.html iframe 임베드를 대체).
// 과목별 데이터를 선택 시에만 동적 로드해 가볍고, 앱 테마(라이트/다크)·좌측 메뉴를 공유한다.
// PDF용 practice-textbook.html 생성(build-textbook.mjs)은 그대로 유지된다.

const modeClass = (tag) =>
  tag === '종합실습' ? 'mode-full' : tag === '실습' ? 'mode-lab' : tag === '이론+실습' ? 'mode-mix' : 'mode-theory'

const subjectModules = import.meta.glob('../data/lectures/*.js', { import: 'default' })
const mainSubjects = subjects.filter((s) => !s.reference)
// 실습교수(반별 투입 강사) 작성분 판정 — origin:'practice' (§Dev_md 53). 본문에서 빼 과목 말미로 묶는다.
const isPractice = (x) => x?.origin === 'practice'
const notPractice = (x) => !isPractice(x)
const etcEntries = Object.entries(otherCourses).map(([id, c]) => ({ id, ...c }))
const H3 = { fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }

// 한 일차의 강의안 본문 — 학습강의안(/lectures)과 동일 구성(날짜/지역 헤더만 제외).
function DayBlock({ subj, day, dd }) {
  const totalDays = subj.days.length
  const d = subj.days[day - 1]
  const mode = modeOf(subj.id, day)
  const periodTags = periodTagsOf(subj.id, day)
  const plan = dd?.plan || null
  // 실습교수 작성분(origin:'practice')은 본문 실습예제에서 빼고 과목 말미 보충자료로 모은다.
  const codeExamples = (dd?.examples || []).filter(notPractice)
  const keyConcepts = dd?.concepts || []
  const detail = dd?.detail || null
  const deepTheory = dd?.theory || null
  const realCodes = dd?.realCodes || []
  const dayPeriods = dd?.periods || null

  return (
    <div style={{ paddingTop: 8, marginTop: day > 1 ? 40 : 0, borderTop: day > 1 ? '2px solid var(--line)' : 'none' }}>
      <div className="detail-meta">
        <span className="chip chip-day">Day {day} / {totalDays}</span>
        {mode && <span className={`chip chip-mode ${modeClass(mode.tag)}`}>{mode.tag}</span>}
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--navy-800)', marginTop: 8 }}>{d?.title}</h2>

      {mode && (
        <div className="mode-note" style={{ marginTop: 14 }}>
          <strong className={`mode-badge ${modeClass(mode.tag)}`}>{mode.tag}</strong>
          <span className="mode-ratio">{mode.ratio}</span>
          <span className="mode-desc">{mode.note}</span>
        </div>
      )}

      {d?.objectives?.length > 0 && (
        <div className="box box-tips" style={{ marginTop: 20 }}>
          <div className="box-h">🎯 학습 목표</div>
          <ul>{d.objectives.map((o, i) => <li key={i}><Rich text={o} /></li>)}</ul>
        </div>
      )}

      {keyConcepts.length > 0 && (
        <>
          <h3 style={H3}>📚 핵심 개념</h3>
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

      {plan?.figures?.length > 0 && (
        <>
          <h3 style={H3}>📐 개념 도해</h3>
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

      {deepTheory?.theory?.length > 0 && (
        <>
          <h3 style={H3}>📘 심화 이론</h3>
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

      {detail?.topics?.length > 0 && (
        <>
          <h3 style={H3}>📖 상세 학습 내용</h3>
          <div className="grid grid-2" style={{ marginTop: 12 }}>
            {detail.topics.map((t, i) => {
              const items = t.items || []
              const isLong = items.length >= 6 || items.join('').length > 240
              return (
                <div key={i} className="card" style={isLong ? { gridColumn: '1 / -1' } : undefined}>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--gold)', marginBottom: 8 }}>{t.h}</h4>
                  <ul style={isLong
                    ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '6px 24px', margin: 0, padding: 0, listStyle: 'none' }
                    : { display: 'flex', flexDirection: 'column', gap: 6, margin: 0, padding: 0, listStyle: 'none' }}>
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

      <h3 style={H3}>⏱ 진행 시간표 <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)' }}>(09:00~17:50 · 교시당 50분)</span></h3>
      {dayPeriods ? (
        <div className="card" style={{ marginTop: 12 }}>
          {PERIOD_TIMES.map((slot, j) => {
            if (slot.lunch) return (
              <div key="lunch" className="plan-row"><div className="plan-time">{slot.time}</div><div className="plan-lunch">점심 휴식</div></div>
            )
            const ci = j < 3 ? j : j - 1
            const ptag = periodTags?.[ci]
            return (
              <div key={slot.label} className="plan-row">
                <div className="plan-time">{slot.label}<span style={{ display: 'block', fontWeight: 500, color: 'var(--ink-soft)', fontSize: 12 }}>{slot.time}</span></div>
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
              <div>{row.lunch ? <div className="plan-lunch">{row.topic}</div> : <><div className="plan-topic">{row.topic}</div>{row.detail && <div className="plan-detail">{row.detail}</div>}</>}</div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--ink-soft)', marginTop: 12 }}>강의안 준비 중입니다.</p>
      )}

      {plan?.practice && (
        <>
          <h3 style={H3}>🧪 실습</h3>
          <div className="box box-practice" style={{ marginTop: 12 }}>
            <div className="box-h">{plan.practice.title}</div>
            <ol>{plan.practice.steps.map((s, i) => <li key={i}><Rich text={s} /></li>)}</ol>
            <p style={{ marginTop: 12, fontSize: 14, color: 'var(--navy-700)' }}>
              <strong style={{ color: 'var(--gold)' }}>📦 산출물 · </strong>{plan.practice.deliverable}
            </p>
          </div>
        </>
      )}

      {detail?.labs?.length > 0 && (
        <>
          <h3 style={H3}>🔬 추가 실습 (Lab)</h3>
          <div className="grid grid-2" style={{ marginTop: 12 }}>
            {detail.labs.map((lab, i) => (
              <div key={i} className="box box-tips">
                <div className="box-h">{lab.title}</div>
                <ol>{lab.steps.map((s, k) => <li key={k}><Rich text={s} /></li>)}</ol>
              </div>
            ))}
          </div>
        </>
      )}

      {[['💻 실습 예제', codeExamples], ['🛠 실전 소스', realCodes]].map(([label, list]) =>
        list.length > 0 ? (
          <div key={label}>
            <h3 style={H3}>{label}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 12 }}>
              {list.map((ex, i) => (
                <div key={i}>
                  <div className="box-h" style={{ marginBottom: 8 }}>{ex.title}<span style={{ fontWeight: 600, color: 'var(--ink-soft)', fontSize: 12 }}>({ex.lang})</span></div>
                  {ex.files?.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '2px 0 8px' }}>
                      {ex.files.map((f2) => (
                        <a key={f2.href} href={f2.href} download className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: 12.5 }}>⬇ {f2.label}</a>
                      ))}
                    </div>
                  )}
                  <CodeBlock code={ex.code} lang={ex.lang} />
                  {ex.note && <p style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>💡 <Rich text={ex.note} /></p>}
                </div>
              ))}
            </div>
          </div>
        ) : null,
      )}

      {detail?.homework?.length > 0 && (
        <>
          <h3 style={H3}>📝 과제</h3>
          <div className="box box-practice" style={{ marginTop: 12 }}>
            <ol>{detail.homework.map((h, i) => <li key={i}><Rich text={h} /></li>)}</ol>
          </div>
        </>
      )}

      {practiceGuides[subj.id] && day === totalDays && (() => {
        const g = practiceGuides[subj.id]
        return (
          <div style={{ marginTop: 28 }}>
            <h3 style={{ ...H3, margin: '0 0 4px' }}>🧪 {g.title}</h3>
            <div className="box box-practice" style={{ marginTop: 12 }}>
              <p style={{ margin: '0 0 10px', color: 'var(--ink-soft)', fontSize: 13 }}><Rich text={g.intro} /> <span style={{ opacity: 0.7 }}>({g.source})</span></p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                {g.files.map((f) => <a key={f.href} href={f.href} download className="btn btn-cta" style={{ fontSize: 13, padding: '8px 14px' }}>⬇ {f.label}</a>)}
              </div>
              {g.groups.map((grp) => (
                <div key={grp.h} style={{ marginTop: 12 }}>
                  <div className="box-h" style={{ marginBottom: 6 }}>{grp.h}</div>
                  {grp.note && <p style={{ margin: '0 0 6px', fontSize: 13.5, color: 'var(--navy-700)' }}><Rich text={grp.note} /></p>}
                  <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {grp.items.map((it, i) => <li key={i} style={{ fontSize: 13.5, color: 'var(--navy-700)', lineHeight: 1.6 }}><Rich text={it} /></li>)}
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

      <ExamQuiz subjectId={subj.id} day={day} totalDays={totalDays} />
    </div>
  )
}

export default function Textbook() {
  const [tab, setTab] = useState('mine')
  const [activeId, setActiveId] = useState(mainSubjects[0].id)
  const [mod, setMod] = useState(null)
  const [loading, setLoading] = useState(true)
  const isEtc = tab === 'etc'

  useEffect(() => {
    if (isEtc) { setMod(null); setLoading(false); return }
    let cancelled = false
    setLoading(true); setMod(null)
    const loader = subjectModules[`../data/lectures/${activeId}.js`]
    if (!loader) { setLoading(false); return }
    loader().then((m) => { if (!cancelled) { setMod(m); setLoading(false) } }).catch(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [activeId, isEtc])

  const subj = !isEtc ? subjectById(activeId) : null
  const pickTab = (t) => { setTab(t); setActiveId(t === 'etc' ? etcEntries[0].id : mainSubjects[0].id) }

  return (
    <div className="textbook-page">
      <div className="page-header-ed">
        <div className="container" style={{ position: 'relative' }}>
          <div className="tb-print-box" style={{ position: 'absolute', top: 0, right: 'var(--s-5)', textAlign: 'right', maxWidth: 260 }}>
            <button
              type="button"
              className="btn btn-primary tb-print-btn"
              onClick={() => window.print()}
              title="현재 과목을 인쇄 / PDF로 저장"
              style={{ fontSize: 13, padding: '9px 18px' }}
            >
              🖨 인쇄 · PDF 저장
            </button>
            <p className="tb-print-hint" style={{ margin: '7px 0 0', fontSize: 12, fontWeight: 700, color: 'var(--navy-700)', lineHeight: 1.5, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
              💡 인쇄 미리보기에서 &ldquo;배경 그래픽&rdquo; 옵션을 켜면<br />코드·배지 색이 함께 나옵니다
            </p>
          </div>
          <span className="eyebrow">Subjects</span>
          <h1>교과목별 강의안</h1>
          <p>
            <span style={{ display: 'block' }}>교과목별로 정리된 강의안입니다 — 일차별 학습목표·핵심개념·교재 기반 심화 이론·예제·평가기준·복습퀴즈를 담습니다.</span>
            <span style={{ display: 'block' }}>좌측에서 과목을 선택하세요. 수업일별 실전 기록은 「담당일자별 실습교안」에서 확인합니다. (인쇄 버튼으로 PDF 저장)</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container layout-side">
          <nav className="side-nav" aria-label="과목">
            <div className="month-tabs">
              <button className={`month-tab${tab === 'mine' ? ' active' : ''}`} onClick={() => pickTab('mine')}>담당 강의</button>
              <button className={`month-tab${tab === 'etc' ? ' active' : ''}`} onClick={() => pickTab('etc')}>담당일정 외</button>
            </div>
            {(isEtc ? etcEntries : mainSubjects).map((s) => (
              <button
                key={s.id}
                className={`side-link${activeId === s.id ? ' active' : ''}`}
                onClick={() => setActiveId(s.id)}
              >
                {s.name}
                <span className="sl-sub">{isEtc ? `${s.category} · ${s.hours}시간 · 타 강사` : `${s.code} · ${s.days.length}일차`}</span>
              </button>
            ))}
          </nav>

          <div>
            {isEtc ? (
              <EtcCourse courseId={activeId} />
            ) : subj ? (
              <>
                <div className="detail-meta">
                  <span className="chip chip-code">{subj.code}</span>
                  <span className="chip chip-cat">{subj.category}</span>
                  <Rating level={subj.level} weight={subj.weight} />
                </div>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--navy-800)', marginTop: 8 }}>{subj.name}</h2>
                <p style={{ color: 'var(--ink-soft)', marginTop: 4 }}>{subj.category} · {subj.days.length}일차 강의안</p>

                {loading ? (
                  <div style={{ marginTop: 20, padding: '48px 20px', textAlign: 'center', color: 'var(--ink-soft)' }}>강의안을 불러오는 중…</div>
                ) : (
                  <div style={{ marginTop: 20 }}>
                    {subj.days.map((_, i) => (
                      <DayBlock key={i} subj={subj} day={i + 1} dd={mod?.[`${subj.id}-${i + 1}`]} />
                    ))}
                    {/* 과목 말미 — 전 일차에 흩어진 실습교수 작성분(origin:'practice')을 한곳에 모은다 */}
                    <PracticeSupplement
                      examples={subj.days.flatMap((_, i) => (mod?.[`${subj.id}-${i + 1}`]?.examples || []).filter(isPractice))}
                    />
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
