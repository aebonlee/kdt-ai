// 담당일자별 실습교안 — 개강일(7/14)부터 일자별 타임라인.
// 이애본 실습교수 세션은 강조 카드(실전 기록: 반 맞춤 변경·평가·제출처),
// 그 외 날짜·트랙은 참고 행으로 전체 과정 흐름을 함께 보여준다 (2026-07-24 대표 확정 기획).
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { subjects, subjectById, sessions } from '../data/curriculum'
import { otherSessions, TRACKS, EVENT_LABELS } from '../data/othersessions'
import { otherCourses } from '../data/othercontent'
import { practiceLog } from '../data/practicelog'
import { exams } from '../data/exams'
import Rich from '../components/Rich'

const fmt = (d) => `${Number(d.slice(5, 7))}/${Number(d.slice(8, 10))}`
const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']
const weekdayOf = (d) => WEEKDAY[new Date(d + 'T00:00:00+09:00').getDay()]
const MONTHS = ['2026-07', '2026-08', '2026-09', '2026-10', '2026-11', '2026-12']
const MONTH_LABEL = { '2026-07': '7월', '2026-08': '8월', '2026-09': '9월', '2026-10': '10월', '2026-11': '11월', '2026-12': '12월' }

const nameOfCell = (c) => otherCourses[c]?.name || subjectById(c)?.name || EVENT_LABELS[c] || c

export default function Practice() {
  const todayStr = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10)
  const defaultMonth = MONTHS.includes(todayStr.slice(0, 7)) ? todayStr.slice(0, 7) : MONTHS[0]
  const [month, setMonth] = useState(defaultMonth)

  // 날짜 축: 담당 세션 + 배정표(othersessions) 합집합
  const rows = useMemo(() => {
    const mine = new Map()
    for (const s of sessions) mine.set(s.date, s)
    const others = new Map()
    for (const s of otherSessions) others.set(s.date, s)
    const dates = [...new Set([...mine.keys(), ...others.keys()])].sort()
    return dates.map((date) => ({ date, mine: mine.get(date) || null, other: others.get(date) || null }))
  }, [])

  const monthRows = rows.filter((r) => r.date.startsWith(month))
  const myCount = rows.filter((r) => r.mine).length
  const doneCount = rows.filter((r) => r.mine && r.date <= todayStr).length

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Practice Log</span>
          <h1>담당일자별 실습교안</h1>
          <p>
            <span style={{ display: 'block' }}>개강일(7/14)부터 일자별로 진행합니다. 이애본 실습교수 담당 세션은 카드로 강조되고, 그날 실제 수업에서 진행·변경·평가한 내용이 기록됩니다.</span>
            <span style={{ display: 'block' }}>담당 세션 {myCount}일 중 {doneCount}일 진행 · 교과목 이론은 상단 「교과목별 강의안」에서 학습하세요.</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* 월 탭 */}
          <div className="month-tabs" style={{ marginBottom: 20 }}>
            {MONTHS.map((m) => (
              <button key={m} className={`month-tab${month === m ? ' active' : ''}`} onClick={() => setMonth(m)}>
                {MONTH_LABEL[m]}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {monthRows.length === 0 && (
              <p style={{ color: 'var(--ink-soft)' }}>이 달에는 표시할 일정이 없습니다.</p>
            )}
            {monthRows.map(({ date, mine, other }) => {
              const isToday = date === todayStr
              const isPast = date < todayStr
              const log = practiceLog[date]
              const subj = mine ? subjectById(mine.subjectId) : null
              const ev = log?.evaluation ? exams[log.evaluation] : null

              if (mine) {
                // ── 담당 세션: 강조 카드 ──
                return (
                  <div key={date} className="card" style={{
                    padding: '18px 22px',
                    borderLeft: '4px solid var(--gold)',
                    background: isToday ? 'var(--navy-50)' : undefined,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: 15, color: 'var(--navy-800)' }}>{fmt(date)} ({weekdayOf(date)})</strong>
                      <span className="chip chip-region gwangju">{mine.region} {mine.klass}</span>
                      <span className="chip chip-code">이애본 실습교수</span>
                      {isToday && <span className="chip chip-day">오늘</span>}
                      {isPast && !isToday && <span className="chip" style={{ opacity: 0.7 }}>진행 완료</span>}
                      {!isPast && !isToday && <span className="chip" style={{ opacity: 0.7 }}>예정</span>}
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '10px 0 2px' }}>
                      {log?.title || `${subj?.name} · Day ${mine.day}`}
                    </h3>
                    {log?.professor && (
                      <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-soft)' }}>{log.professor}</p>
                    )}

                    {log?.custom?.length > 0 && (
                      <ul className="dot-list" style={{ margin: '10px 0 0' }}>
                        {log.custom.map((c, i) => (
                          <li key={i} style={{ fontSize: 13.5, color: 'var(--navy-700)' }}><Rich text={c} /></li>
                        ))}
                      </ul>
                    )}

                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 12, alignItems: 'center' }}>
                      {ev && (
                        <span style={{ fontSize: 12.5, color: 'var(--gold)', fontWeight: 700 }}>
                          📋 평가: {ev.criteria?.slice(0, 4).map((c) => `${c.item.replace(/^실습 ?/, '')} ${c.points || ''}`).join(' · ')}
                        </span>
                      )}
                      {log?.submission && log.submission !== '—' && (
                        <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>📎 제출: {log.submission}</span>
                      )}
                      <Link to={`/lectures/${date}`} className="btn btn-ghost" style={{ padding: '5px 12px', fontSize: 12 }}>
                        이날 강의안 →
                      </Link>
                    </div>
                  </div>
                )
              }

              // ── 담당 아님: 참고 행 (그날 각 트랙 과목) ──
              if (!other) return null
              const cells = TRACKS.map((t) => {
                const cell = other[t.key]
                return cell ? `${t.label} ${nameOfCell(cell.c)}` : null
              }).filter(Boolean)
              if (cells.length === 0) return null
              return (
                <div key={date} style={{
                  padding: '8px 22px', borderRadius: 10, border: '1px dashed var(--line)',
                  fontSize: 12.5, color: 'var(--ink-soft)', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'baseline',
                  background: isToday ? 'var(--navy-50)' : undefined,
                }}>
                  <strong style={{ color: 'var(--navy-600)', flex: '0 0 64px' }}>{fmt(date)} ({weekdayOf(date)})</strong>
                  <span style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>{cells.join(' · ')}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
