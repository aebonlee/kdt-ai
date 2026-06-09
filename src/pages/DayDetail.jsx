import { useParams, Link } from 'react-router-dom'
import { sessionByDate, subjectById, dayOf, sortedSessions } from '../data/curriculum'

const regionClass = (r) => (r === '광주' ? 'gwangju' : 'pangyo')

function Block({ title, items }) {
  if (!items || items.length === 0) return null
  return (
    <div className="detail-block">
      <h4>{title}</h4>
      <ul>
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  )
}

export default function DayDetail() {
  const { date } = useParams()
  const session = sessionByDate(date)

  if (!session) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 600 }}>{date} 일자의 등록된 강의가 없습니다.</p>
          <Link to="/schedule" className="back-link" style={{ marginTop: 16 }}>← 전체 일정으로</Link>
        </div>
      </section>
    )
  }

  const subj = subjectById(session.subjectId)
  const d = dayOf(session)
  const all = sortedSessions()
  const idx = all.findIndex((s) => s.date === date)
  const prev = idx > 0 ? all[idx - 1] : null
  const next = idx < all.length - 1 ? all[idx + 1] : null

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 820 }}>
        <Link to="/schedule" className="back-link">← 전체 일정</Link>

        <div className="detail-card">
          <div className="detail-meta">
            <span className="chip chip-code">{subj?.code}</span>
            <span className="chip chip-cat">{subj?.category}</span>
            <span className={`chip chip-region ${regionClass(session.region)}`}>
              {session.region} {session.klass}
            </span>
            <span className="chip chip-day">Day {session.day} / {subj?.days.length}</span>
          </div>

          <h1>{d?.title}</h1>
          <p className="detail-sub">
            {subj?.name} · {session.date} ({session.weekday})
          </p>

          <Block title="학습 목표" items={d?.objectives} />
          <Block title="학습 내용" items={d?.contents} />
        </div>

        <div className="detail-nav">
          {prev ? (
            <Link to={`/day/${prev.date}`}>
              <div className="lbl">← 이전 ({prev.date.slice(5)})</div>
              <div className="nm">{subjectById(prev.subjectId)?.name}</div>
            </Link>
          ) : (
            <span style={{ flex: 1 }} />
          )}
          {next ? (
            <Link to={`/day/${next.date}`} style={{ textAlign: 'right' }}>
              <div className="lbl">다음 ({next.date.slice(5)}) →</div>
              <div className="nm">{subjectById(next.subjectId)?.name}</div>
            </Link>
          ) : (
            <span style={{ flex: 1 }} />
          )}
        </div>
      </div>
    </section>
  )
}
