import { Link } from 'react-router-dom'
import { sessionsBySubject, dayOf, referenceSubjects } from '../data/curriculum'
import Sentences from '../components/Sentences'

const regionClass = (r, k) => (r === '광주' ? 'gwangju' : k === '3반' ? 'pangyo3' : 'pangyo')

export default function Subjects() {
  const groups = sessionsBySubject()

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">By Subject</span>
          <h1>과목별 보기</h1>
          <p>
            <Sentences text="담당 과목(모듈)별로 일자별 수업 내용을 확인합니다. 광주는 별도 분반으로 구분 표시됩니다." />
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {groups.map(({ subject, items }) => (
            <div key={subject.id} className="subject">
              <div className="subject-head">
                <span className="chip chip-code">{subject.code}</span>
                <h3>{subject.name}</h3>
                <span className="chip chip-cat">{subject.category}</span>
                <span className="chip chip-day">{items.length}일</span>
              </div>
              <p className="subject-summary">{subject.summary}</p>

              <div style={{ marginTop: 12 }}>
                {items.map((s) => {
                  const d = dayOf(s)
                  return (
                    <Link key={s.date} to={`/day/${s.date}`} className="session-row">
                      <span style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <span className="date">{s.date.slice(5)} ({s.weekday})</span>
                        <span className={`chip chip-region ${regionClass(s.region, s.klass)}`}>
                          {s.region} {s.klass}
                        </span>
                        <span className="title">{d?.title}</span>
                      </span>
                      <span style={{ color: 'var(--ink-soft)', fontSize: 13 }}>Day {s.day} →</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}

          {/* 참고 (미배정) 과목 */}
          {referenceSubjects.length > 0 && (
            <>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '32px 0 12px' }}>
                참고 (미배정)
              </h2>
              {referenceSubjects.map((subject) => (
                <div key={subject.id} className="subject" style={{ borderLeftColor: 'var(--gwangju)' }}>
                  <div className="subject-head">
                    <span className="chip chip-code">{subject.code}</span>
                    <h3>{subject.name}</h3>
                    <span className="chip chip-cat">{subject.category}</span>
                    <span className="chip chip-region gwangju">참고</span>
                  </div>
                  <p className="subject-summary">{subject.summary}</p>

                  <div style={{ marginTop: 12 }}>
                    {subject.days.map((dd, i) => (
                      <Link key={i} to={`/lectures/ref-${subject.id}-${i + 1}`} className="session-row">
                        <span style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                          <span className="chip chip-day">Day {i + 1}</span>
                          <span className="title">{dd.title}</span>
                        </span>
                        <span style={{ color: 'var(--ink-soft)', fontSize: 13 }}>강의안 →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
