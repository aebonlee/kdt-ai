import { useParams, Link } from 'react-router-dom'
import { sessionByDate, subjectById, dayOf, sortedSessions } from '../data/curriculum'
import { modeOf, periodTagsOf } from '../data/lecturemodes'
import { PERIOD_TIMES, periods } from '../data/lectureperiods'
import { useProgress, setDone } from '../hooks/useProgress'

// 실라버스 방식 배지 색상 (이론/실습/종합실습)
const modeClass = (tag) =>
  tag === '종합실습' ? 'mode-full' : tag === '실습' ? 'mode-lab' : tag === '이론+실습' ? 'mode-mix' : 'mode-theory'

const regionClass = (r, k) => (r === '광주' ? 'gwangju' : r === '울산' ? 'ulsan' : k === '4층' ? 'pangyo3' : 'pangyo')

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
  // 훅은 조기 return 이전에 무조건 호출해야 한다(Rules of Hooks).
  // react-router v6는 :date 파라미터만 바뀔 때 컴포넌트를 재마운트하지 않으므로,
  // 조건부로 useProgress를 부르면 유효↔무효 날짜 전환 시 훅 개수가 달라져 크래시한다.
  const done = useProgress()
  const isDone = !!done[date]
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
  const mode = modeOf(session.subjectId, session.day)
  const planKey = `${session.subjectId}-${session.day}`
  const dayPeriods = periods[planKey] || null
  const periodTags = periodTagsOf(session.subjectId, session.day)
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
            <span className={`chip chip-region ${regionClass(session.region, session.klass)}`}>
              {session.region} {session.klass}
            </span>
            <span className="chip chip-day">Day {session.day} / {subj?.days.length}</span>
            {mode && <span className={`chip chip-mode ${modeClass(mode.tag)}`}>{mode.tag}</span>}
          </div>

          <h1>{d?.title}</h1>
          <p className="detail-sub">
            {subj?.name} · {session.date} ({session.weekday})
          </p>

          {mode && (
            <div className="mode-note">
              <strong className={`mode-badge ${modeClass(mode.tag)}`}>{mode.tag}</strong>
              <span className="mode-ratio">{mode.ratio}</span>
              <span className="mode-desc">{mode.note}</span>
            </div>
          )}

          <Block title="학습 목표" items={d?.objectives} />
          <Block title="학습 내용" items={d?.contents} />

          {/* 진행 시간표 (교시별 방식 배지) */}
          {dayPeriods && (
            <div className="detail-block">
              <h4>진행 시간표 <span style={{ fontWeight: 500, color: 'var(--ink-soft)', fontSize: 13 }}>(09:00~17:50 · 교시당 50분)</span></h4>
              <div className="card" style={{ marginTop: 8 }}>
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
            </div>
          )}

          {/* 자가평가 (학습관리 진도율과 연동) */}
          <div className="detail-block" style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--s-5)' }}>
            <button
              className={`check${isDone ? ' done' : ''}`}
              onClick={() => setDone(date, !isDone)}
              aria-pressed={isDone}
              style={{ maxWidth: 360 }}
            >
              <span className="box">{isDone ? '✓' : ''}</span>
              <span className="ctitle">{isDone ? '이해 완료 — 진도에 반영됨' : '이 수업 내용을 이해했어요'}</span>
            </button>
          </div>
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
