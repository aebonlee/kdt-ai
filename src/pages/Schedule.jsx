import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sessionsByMonth, subjectById, dayOf, sortedSessions } from '../data/curriculum'
import { modeOf } from '../data/lecturemodes'
import Sentences from '../components/Sentences'

const regionClass = (r, k) => (r === '광주' ? 'gwangju' : r === '울산' ? 'ulsan' : k === '4층' ? 'pangyo3' : 'pangyo')
// 실라버스 방식 배지 색상 (이론/실습/종합실습)
const modeClass = (tag) =>
  tag === '종합실습' ? 'mode-full' : tag === '실습' ? 'mode-lab' : tag === '이론+실습' ? 'mode-mix' : 'mode-theory'
const monthLabel = (m) => `${m.slice(0, 4)}년 ${Number(m.slice(5))}월`

const FILTERS = ['전체', '판교', '광주', '울산']
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
// 달력: 2026년 7~10월 (month0: 6=7월 … 9=10월)
const CAL_MONTHS = [
  [2026, 6],
  [2026, 7],
  [2026, 8],
  [2026, 9],
]

// 한 달의 셀 배열 (앞쪽 빈칸 포함)
function buildCells(year, m0) {
  const firstDow = new Date(Date.UTC(year, m0, 1)).getUTCDay()
  const days = new Date(Date.UTC(year, m0 + 1, 0)).getUTCDate()
  const arr = []
  for (let i = 0; i < firstDow; i++) arr.push(null)
  for (let d = 1; d <= days; d++) {
    const ds = `${year}-${String(m0 + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    arr.push({ d, ds })
  }
  return arr
}

export default function Schedule() {
  const [region, setRegion] = useState('전체')
  const months = sessionsByMonth()
    .map(({ month, items }) => ({
      month,
      items: items.filter((s) => region === '전체' || s.region === region),
    }))
    .filter((g) => g.items.length > 0)

  // 날짜 → 세션 맵 (지역 필터 적용)
  const byDate = {}
  for (const s of sortedSessions()) {
    if (region === '전체' || s.region === region) byDate[s.date] = s
  }

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Schedule</span>
          <h1>전체 일정</h1>
          <p>
            <Sentences text="월별 타임라인입니다. 날짜를 클릭하면 일자별 상세로 이동합니다. (울산 · 판교 4·5층 · 광주 — 지역별 분반)" />
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* 지역(분반) 필터 */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setRegion(f)}
                className={`btn ${region === f ? 'btn-primary' : 'btn-ghost'}`}
              >
                {f !== '전체' && (
                  <span className={`region-dot ${regionClass(f)}`} />
                )}
                {f === '전체' ? '전체' : f === '판교' ? '판교 (4·5층)' : f === '광주' ? '광주 (1반)' : '울산'}
              </button>
            ))}
          </div>

          {/* 달력 (7~10월) */}
          {CAL_MONTHS.map(([y, m0]) => {
            const cells = buildCells(y, m0)
            return (
              <div key={`${y}-${m0}`} style={{ marginBottom: 32 }}>
                <span className="month-label">{y}년 {m0 + 1}월</span>
                <div className="cal">
                  {WEEKDAYS.map((w, i) => (
                    <div key={w} className={`cal-head${i === 0 ? ' sun' : i === 6 ? ' sat' : ''}`}>{w}</div>
                  ))}
                  {cells.map((cell, i) => {
                    if (!cell) return <div key={`e${i}`} className="cal-cell empty" />
                    const s = byDate[cell.ds]
                    const sun = i % 7 === 0
                    const subj = s && subjectById(s.subjectId)
                    const mode = s && modeOf(s.subjectId, s.day)
                    return (
                      <div key={cell.ds} className={`cal-cell${sun ? ' sun' : ''}`}>
                        <div className="cal-dnum">{cell.d}</div>
                        {s && (
                          <Link
                            to={`/day/${s.date}`}
                            className={`cal-ev ${regionClass(s.region, s.klass)}`}
                            title={`${subj?.name} · ${s.region} ${s.klass} · Day ${s.day}${mode ? ` · ${mode.tag}` : ''}`}
                          >
                            <span className="cal-ev-name">{subj?.name}</span>
                            {mode && <span className={`cal-mode ${modeClass(mode.tag)}`}>{mode.tag}</span>}
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* 타임라인 */}
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--navy-800)', margin: '8px 0 16px' }}>
            타임라인
          </h2>
          {months.map(({ month, items }) => (
            <div key={month} style={{ marginBottom: 40 }}>
              <span className="month-label">{monthLabel(month)}</span>
              <div className="grid grid-3">
                {items.map((s) => {
                  const subj = subjectById(s.subjectId)
                  const d = dayOf(s)
                  const mode = modeOf(s.subjectId, s.day)
                  return (
                    <Link key={s.date + s.klass} to={`/day/${s.date}`} className="card day-card">
                      <div className="meta">
                        <span className={`region-dot ${regionClass(s.region, s.klass)}`} />
                        <span className="chip chip-code" style={{ fontSize: 11 }}>{subj?.code}</span>
                        <span>{s.region} {s.klass}</span>
                        {mode && <span className={`chip chip-mode ${modeClass(mode.tag)}`} style={{ marginLeft: 'auto' }}>{mode.tag}</span>}
                      </div>
                      <span className="date">{s.date.slice(5)} ({s.weekday}) · Day {s.day}</span>
                      <span className="topic">{subj?.name}</span>
                      <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{d?.title}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
