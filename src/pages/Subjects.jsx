import { Link } from 'react-router-dom'
import { sessionsBySubject, dayOf, referenceSubjects } from '../data/curriculum'
import { modeOf } from '../data/lecturemodes'
import { otherCourses } from '../data/othercontent'
import { etcMonthlyDigest, otherPeriods } from '../data/othersessions'
import Sentences from '../components/Sentences'
import { myPairings } from '../data/adminschedule'

// 강의일자 -> 반·강의실 (반별 시간표 판독본). curriculum 세션에는 호수가 없어 날짜로 잇는다.
const ROOM_BY_DATE = new Map(myPairings.map((p) => [p.date, { cls: p.cls, room: p.room }]))

const regionClass = (r, k) => (r === '광주' ? 'gwangju' : r === '울산' ? 'ulsan' : k === '4층' ? 'pangyo3' : 'pangyo')
// 실라버스 방식 배지 색상 (이론/실습/종합실습)
const modeClass = (tag) =>
  tag === '종합실습' ? 'mode-full' : tag === '실습' ? 'mode-lab' : tag === '이론+실습' ? 'mode-mix' : 'mode-theory'

export default function Subjects() {
  const groups = sessionsBySubject()

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">By Subject</span>
          <h1>과목별 보기</h1>
          <p>
            <Sentences text="담당 과목(모듈)별로 일자별 수업 내용을 확인합니다. 지역(분반)은 색상으로 구분 표시됩니다." />
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
                  const mode = modeOf(s.subjectId, s.day)
                  return (
                    <Link key={s.date} to={`/day/${s.date}`} className="session-row">
                      <span style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <span className="date">{s.date.slice(5)} ({s.weekday})</span>
                        <span className={`chip chip-region ${regionClass(s.region, s.klass)}`}>
                          {s.region} {s.klass}
                          {ROOM_BY_DATE.get(s.date) && ` ${ROOM_BY_DATE.get(s.date).cls}`}
                        </span>
                        {ROOM_BY_DATE.get(s.date) && (
                          <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-soft)' }}>
                            {ROOM_BY_DATE.get(s.date).room}
                          </span>
                        )}
                        {mode && <span className={`chip chip-mode ${modeClass(mode.tag)}`}>{mode.tag}</span>}
                        <span className="title">{d?.title}</span>
                      </span>
                      <span style={{ color: 'var(--ink-soft)', fontSize: 13 }}>Day {s.day} →</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}

          {/* 참고자료 과목 */}
          {referenceSubjects.length > 0 && (
            <>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '32px 0 4px' }}>
                참고자료
              </h2>
              <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: '0 0 12px' }}>
                과정 이해를 돕는 참고용 강의안입니다.
              </p>
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
                    {subject.days.map((dd, i) => {
                      const mode = modeOf(subject.id, i + 1)
                      return (
                      <Link key={i} to={`/lectures/ref-${subject.id}-${i + 1}`} className="session-row">
                        <span style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                          <span className="chip chip-day">Day {i + 1}</span>
                          {mode && <span className={`chip chip-mode ${modeClass(mode.tag)}`}>{mode.tag}</span>}
                          <span className="title">{dd.title}</span>
                        </span>
                        <span style={{ color: 'var(--ink-soft)', fontSize: 13 }}>강의안 →</span>
                      </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* 담당일정 외 강의내용 학습 자료 — 월별 */}
          <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '32px 0 4px' }}>
            담당일정 외 강의내용 학습 자료
          </h2>
          <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: '0 0 12px' }}>
            담당 강의 전후로 각 분반에서 별도 강사가 진행하는 과목입니다. 과목을 누르면 학습내용과 분반별 진행 시기를 볼 수 있습니다.
          </p>
          {etcMonthlyDigest().map((g) => (
            <div key={g.month} style={{ marginBottom: 18 }}>
              <span className="month-label">{Number(g.month.slice(5))}월</span>
              <div className="grid grid-2" style={{ marginTop: 10 }}>
                {g.items.filter((it) => otherCourses[it.c]).map((it) => {
                  const c = otherCourses[it.c]
                  const range = it.from === it.to ? it.from.slice(5) : `${it.from.slice(5)} ~ ${it.to.slice(5)}`
                  return (
                    <Link key={`${g.month}-${it.c}`} to={`/lectures/etc-${it.c}`} className="card etc-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                        <h3 style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--navy-800)', margin: 0 }}>{c.name}</h3>
                        <span className="chip chip-day">{range}</span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: 0 }}>
                        {it.tracks.join(' · ')}{it.by.length ? ` · ${it.by.join('·')} 강사` : ''}
                      </p>
                      <span style={{ display: 'block', marginTop: 8, color: 'var(--gold)', fontSize: 13, fontWeight: 700 }}>학습내용 보기 →</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
          <div style={{ marginBottom: 18 }}>
            <span className="month-label">11월 이후</span>
            <div className="grid grid-2" style={{ marginTop: 10 }}>
              {otherPeriods.map((p) => (
                <div key={p.range} className="card">
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy-800)', margin: '0 0 6px' }}>{p.label}</h3>
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: 0 }}>{p.range}</p>
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: '4px 0 0' }}>{p.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
