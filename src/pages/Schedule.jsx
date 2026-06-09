import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sessionsByMonth, subjectById, dayOf } from '../data/curriculum'

const regionClass = (r) => (r === '광주' ? 'gwangju' : 'pangyo')
const monthLabel = (m) => `${m.slice(0, 4)}년 ${Number(m.slice(5))}월`

const FILTERS = ['전체', '판교', '광주']

export default function Schedule() {
  const [region, setRegion] = useState('전체')
  const months = sessionsByMonth()
    .map(({ month, items }) => ({
      month,
      items: items.filter((s) => region === '전체' || s.region === region),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Schedule</span>
          <h1>전체 일정</h1>
          <p>월별 타임라인입니다. 날짜를 클릭하면 일자별 상세로 이동합니다. (광주는 별도 분반)</p>
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
                {f === '전체' ? '전체' : f === '판교' ? '판교 (3·4반)' : '광주 (1반)'}
              </button>
            ))}
          </div>

          {months.map(({ month, items }) => (
            <div key={month} style={{ marginBottom: 40 }}>
              <span className="month-label">{monthLabel(month)}</span>
              <div className="grid grid-3">
                {items.map((s) => {
                  const subj = subjectById(s.subjectId)
                  const d = dayOf(s)
                  return (
                    <Link key={s.date + s.klass} to={`/day/${s.date}`} className="card day-card">
                      <div className="meta">
                        <span className={`region-dot ${regionClass(s.region)}`} />
                        <span className="chip chip-code" style={{ fontSize: 11 }}>{subj?.code}</span>
                        <span>{s.region} {s.klass}</span>
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
