import { useState, useEffect } from 'react'
import { subjects, subjectById } from '../data/curriculum'
import { modeOf, periodTagsOf } from '../data/lecturemodes'
import Rich from '../components/Rich'
import CodeBlock from '../components/CodeBlock'
import Rating from '../components/Rating'
import ExamQuiz from '../components/ExamQuiz'
import EtcCourse from '../components/EtcCourse'
import { otherCourses } from '../data/othercontent'
import { subjectCatalog } from '../data/subjectcatalog'

// 실습교안 — 네이티브 React 렌더(과거 practice-textbook.html iframe 임베드를 대체).
// 과목별 데이터를 선택 시에만 동적 로드해 가볍고, 앱 테마(라이트/다크)·좌측 메뉴를 공유한다.
// PDF용 practice-textbook.html 생성(build-textbook.mjs)은 그대로 유지된다.

const modeClass = (tag) =>
  tag === '종합실습' ? 'mode-full' : tag === '실습' ? 'mode-lab' : tag === '이론+실습' ? 'mode-mix' : 'mode-theory'

const subjectModules = import.meta.glob('../data/lectures/*.js', { import: 'default' })
const mainSubjects = subjects.filter((s) => !s.reference)
// 실습교수(반별 투입 강사) 작성분 판정 — origin:'practice' (§Dev_md 53). 본문에서 빼 과목 말미로 묶는다.
const notPractice = (x) => x?.origin !== 'practice'
const etcEntries = Object.entries(otherCourses).map(([id, c]) => ({ id, ...c }))
const H3 = { fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }

// 실라버스 학습 흐름의 할당 시간 — "09:00–09:50" 형태 시간 범위를 분 단위로 환산(시각 자체는 싣지 않음)
const durationOf = (time) => {
  const m = /(\d{1,2}):(\d{2})\s*[–~-]\s*(\d{1,2}):(\d{2})/.exec(time || '')
  if (!m) return '50분'
  const mins = (+m[3] * 60 + +m[4]) - (+m[1] * 60 + +m[2])
  if (mins <= 0) return '50분'
  return mins % 60 === 0 ? `${mins / 60}시간` : mins > 60 ? `${Math.floor(mins / 60)}시간 ${mins % 60}분` : `${mins}분`
}

// 한 일차의 강의안 본문 — 학습강의안(/lectures)과 동일 구성(날짜/지역 헤더만 제외).
function DayBlock({ subj, day, dd }) {
  const totalDays = subj.days.length
  const d = subj.days[day - 1]
  const mode = modeOf(subj.id, day)
  const periodTags = periodTagsOf(subj.id, day)
  const plan = dd?.plan || null
  // 실습교수 작성분(origin:'practice')은 본문 실습예제에서 빼고 과목 말미 보충자료로 모은다.
  const codeExamples = (dd?.examples || []).filter(notPractice)
  const keyConcepts = (dd?.concepts || []).filter(notPractice)
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

      {(plan?.figures || []).filter(notPractice).length > 0 && (
        <>
          <h3 style={H3}>📐 개념 도해</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 12 }}>
            {plan.figures.filter(notPractice).map((f) => (
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

      {/* 교과목별 강의안은 시각·교시 없이 실라버스 학습 흐름만 싣는다 —
          교시별 진행 시간표(당일 운영)는 담당일자별 실습교안(실습강의안) 소관. */}
      <h3 style={H3}>📋 실라버스 학습 흐름 <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)' }}>(진행 순서 · 할당 시간 · 이론/실습 방식)</span></h3>
      {dayPeriods ? (
        <div className="card" style={{ marginTop: 12 }}>
          {dayPeriods.map((topic, ci) => {
            const ptag = periodTags?.[ci]
            return (
              <div key={ci} className="plan-row">
                <div className="plan-time">{ci + 1}<span style={{ display: 'block', fontWeight: 500, color: 'var(--ink-soft)', fontSize: 12 }}>50분</span></div>
                <div className="plan-topic plan-topic-row">
                  <span>{topic}</span>
                  {ptag && <span className={`period-tag ${modeClass(ptag)}`}>{ptag}</span>}
                </div>
              </div>
            )
          })}
        </div>
      ) : plan ? (
        <div className="card" style={{ marginTop: 12 }}>
          {plan.schedule.filter((row) => !row.lunch).map((row, i) => (
            <div key={i} className="plan-row">
              <div className="plan-time">{i + 1}<span style={{ display: 'block', fontWeight: 500, color: 'var(--ink-soft)', fontSize: 12 }}>{durationOf(row.time)}</span></div>
              <div><div className="plan-topic">{row.topic}</div>{row.detail && <div className="plan-detail">{row.detail}</div>}</div>
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


      <ExamQuiz subjectId={subj.id} day={day} totalDays={totalDays} showExam={false} />
    </div>
  )
}

export default function Textbook() {
  const [catIdx, setCatIdx] = useState(0)
  const [verIdx, setVerIdx] = useState(0)
  const [mod, setMod] = useState(null)
  const [loading, setLoading] = useState(true)

  const cat = subjectCatalog[catIdx]
  const ver = cat.versions[Math.min(verIdx, cat.versions.length - 1)]
  const isEtc = ver.type === 'etc'
  const subj = !isEtc ? subjectById(ver.id) : null

  useEffect(() => {
    if (isEtc) { setMod(null); setLoading(false); return }
    let cancelled = false
    setLoading(true); setMod(null)
    const loader = subjectModules[`../data/lectures/${ver.id}.js`]
    if (!loader) { setLoading(false); return }
    loader().then((m) => { if (!cancelled) { setMod(m); setLoading(false) } }).catch(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [ver.id, isEtc])

  const pickSubject = (i) => { setCatIdx(i); setVerIdx(0) }

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
            <span style={{ display: 'block' }}>전 {subjectCatalog.length}개 교과목을 과정 진행 순서대로 나열했습니다 — 담당·타 강사 구분 없이 과목별로 학습합니다.</span>
            <span style={{ display: 'block' }}>전임교수별로 내용이 갈리는 과목은 A안·B안으로 병기됩니다. 교안·교재 기반 학습 내용만 담으며, 실습 안내·평가·당일 기록은 「담당일자별 실습교안」에 있습니다.</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container layout-side">
          <nav className="side-nav" aria-label="교과목">
            {subjectCatalog.map((c, i) => (
              <button
                key={c.title}
                className={`side-link${catIdx === i ? ' active' : ''}`}
                onClick={() => pickSubject(i)}
              >
                {i + 1}. {c.title}
                <span className="sl-sub">
                  {c.versions.map((v) => v.plan.replace('안', '') + (v.professor ? `(${v.professor})` : '')).join('·')}
                </span>
              </button>
            ))}
          </nav>

          <div>
            {/* A안/B안 선택 — 버전이 2개 이상일 때만 */}
            {cat.versions.length > 1 && (
              <div className="month-tabs" style={{ marginBottom: 16 }}>
                {cat.versions.map((v, i) => (
                  <button
                    key={v.id}
                    className={`month-tab${verIdx === i ? ' active' : ''}`}
                    onClick={() => setVerIdx(i)}
                  >
                    {v.plan}{v.professor ? ` · ${v.professor}` : ''}
                  </button>
                ))}
              </div>
            )}

            {isEtc ? (
              <EtcCourse courseId={ver.id} />
            ) : subj ? (
              <>
                <div className="detail-meta">
                  <span className="chip chip-code">{subj.code}</span>
                  <span className="chip chip-cat">{subj.category}</span>
                  {ver.professor && <span className="chip chip-day">{ver.plan} · {ver.professor}</span>}
                  <Rating level={subj.level} weight={subj.weight} />
                </div>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--navy-800)', marginTop: 8 }}>{cat.title}</h2>
                <p style={{ color: 'var(--ink-soft)', marginTop: 4 }}>{subj.category} · {subj.days.length}일차 강의안</p>

                {loading ? (
                  <div style={{ marginTop: 20, padding: '48px 20px', textAlign: 'center', color: 'var(--ink-soft)' }}>강의안을 불러오는 중…</div>
                ) : (
                  <div style={{ marginTop: 20 }}>
                    {subj.days.map((_, i) => (
                      <DayBlock key={i} subj={subj} day={i + 1} dd={mod?.[`${subj.id}-${i + 1}`]} />
                    ))}
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
