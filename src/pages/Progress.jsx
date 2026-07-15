// 학습관리 — 소속 분반의 수강 일정 기준 자가평가 체크리스트.
// · 학생(소속 분반 등록): 우리 반이 실제 수강하는 날짜별 리스트(담당+타 강사 과목)로 체크
// · 미등록·교수자·관리자: 기존 담당 과목별 보기
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { sessionsBySubject, dayOf, totalSessions, sortedSessions, subjectById } from '../data/curriculum'
import { otherSessions, EVENT_LABELS } from '../data/othersessions'
import { otherCourses } from '../data/othercontent'
import { useProgress, setDone, resetProgress } from '../hooks/useProgress'
import { useProfile, isProfileComplete } from '../hooks/useProfile'
import { classLabel, trackOfSession } from '../data/classes'
import { openClassOnboarding } from '../components/ClassOnboarding'
import { trackSchedule } from '../data/trackschedule'

const regionClass = (r, k) => (r === '광주' ? 'gwangju' : r === '울산' ? 'ulsan' : k === '4층' ? 'pangyo3' : 'pangyo')

// 학생용 — 분반 수강 리스트 체크
function TrackProgress({ profile }) {
  const done = useProgress()
  const schedule = useMemo(() => trackSchedule(profile.track), [profile.track])
  const checkable = schedule.filter((it) => !it.event)
  const doneCount = checkable.filter((it) => done[it.date]).length
  const pct = checkable.length ? Math.round((doneCount / checkable.length) * 100) : 0

  // 월별 그룹
  const months = []
  for (const it of schedule) {
    const m = it.date.slice(0, 7)
    let g = months.find((x) => x.m === m)
    if (!g) { g = { m, items: [] }; months.push(g) }
    g.items.push(it)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="card" style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span className="chip chip-code">{classLabel(profile.track, profile.class_no)}</span>
                <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>우리 반 수강 일정 기준</span>
                <button onClick={openClassOnboarding} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--gold)', fontWeight: 700, textDecoration: 'underline' }}>
                  소속 변경
                </button>
              </div>
              <div className="progress-num" style={{ marginTop: 8 }}>
                <span className="pct">{pct}%</span>
              </div>
              <div style={{ color: 'var(--ink-soft)', marginTop: 6 }}>
                {doneCount} / {checkable.length}일 이해 완료
              </div>
            </div>
            <button className="btn btn-ghost" onClick={() => { if (confirm('학습 진도 기록을 모두 초기화할까요?')) resetProgress() }}>
              진도 초기화
            </button>
          </div>
          <div className="progressbar" style={{ marginTop: 16 }}>
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>

        {months.map((g) => {
          const mCheckable = g.items.filter((it) => !it.event)
          const mDone = mCheckable.filter((it) => done[it.date]).length
          return (
            <div key={g.m} className="subject">
              <div className="subject-head">
                <h3>{Number(g.m.slice(5))}월</h3>
                <span className="chip chip-day">{mDone} / {mCheckable.length}일</span>
              </div>
              <div className="grid grid-2" style={{ marginTop: 12 }}>
                {g.items.map((it) => {
                  const isDone = !!done[it.date]
                  return (
                    <button
                      key={it.date}
                      className={`check${isDone ? ' done' : ''}`}
                      onClick={() => !it.event && setDone(it.date, !isDone)}
                      aria-pressed={isDone}
                      style={it.event ? { opacity: 0.65, cursor: 'default' } : undefined}
                    >
                      <span className="box">{it.event ? '·' : isDone ? '✓' : ''}</span>
                      <span style={{ flex: 1 }}>
                        <span className="ctitle" style={!it.mine && !it.event ? { color: 'var(--etc-green)' } : undefined}>
                          {it.name}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2, flexWrap: 'wrap' }}>
                          <span className="cdate">{it.date.slice(5)}{it.weekday ? ` (${it.weekday})` : ''}</span>
                          <span style={{ fontSize: 11.5, color: it.mine ? 'var(--gold)' : 'var(--ink-soft)', fontWeight: 700 }}>
                            {it.mine ? '이애본 강사' : it.by ? `${it.by} 강사` : '특강 · 행사'}
                          </span>
                        </span>
                      </span>
                      {it.link && (
                        <Link to={it.link} onClick={(e) => e.stopPropagation()} style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700, flex: '0 0 auto' }}>
                          학습 →
                        </Link>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// 기존 담당 과목별 보기 (미등록·교수자·관리자용)
function SubjectProgress() {
  const done = useProgress()
  const groups = sessionsBySubject()
  const doneCount = sortedSessions().filter((s) => done[s.date]).length
  const pct = Math.round((doneCount / totalSessions) * 100)

  return (
    <section className="section">
      <div className="container">
        <div className="card" style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div className="progress-num"><span className="pct">{pct}%</span></div>
              <div style={{ color: 'var(--ink-soft)', marginTop: 6 }}>{doneCount} / {totalSessions}일 이해 완료</div>
            </div>
            <button className="btn btn-ghost" onClick={() => { if (confirm('학습 진도 기록을 모두 초기화할까요?')) resetProgress() }}>
              진도 초기화
            </button>
          </div>
          <div className="progressbar" style={{ marginTop: 16 }}>
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>

        {groups.map(({ subject, items }) => {
          const subDone = items.filter((s) => done[s.date]).length
          const subPct = Math.round((subDone / items.length) * 100)
          return (
            <div key={subject.id} className="subject">
              <div className="subject-head">
                <span className="chip chip-code">{subject.code}</span>
                <h3>{subject.name}</h3>
                <span className="chip chip-day">{subDone} / {items.length}일 · {subPct}%</span>
              </div>
              <div className="progressbar" style={{ margin: '10px 0 16px' }}>
                <span style={{ width: `${subPct}%` }} />
              </div>
              <div className="grid grid-2">
                {items.map((s) => {
                  const d = dayOf(s)
                  const isDone = !!done[s.date]
                  return (
                    <button key={s.date} className={`check${isDone ? ' done' : ''}`} onClick={() => setDone(s.date, !isDone)} aria-pressed={isDone}>
                      <span className="box">{isDone ? '✓' : ''}</span>
                      <span style={{ flex: 1 }}>
                        <span className="ctitle">{d?.title}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                          <span className="cdate">{s.date.slice(5)} ({s.weekday})</span>
                          <span className={`chip chip-region ${regionClass(s.region, s.klass)}`} style={{ fontSize: 11 }}>
                            {s.region} {s.klass}
                          </span>
                        </span>
                      </span>
                      <Link to={`/day/${s.date}`} onClick={(e) => e.stopPropagation()} style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700, flex: '0 0 auto' }}>
                        상세 →
                      </Link>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default function Progress() {
  const { user } = useAuth()
  const { status, profile } = useProfile()
  const studentView = user && status === 'ready' && isProfileComplete(profile) && profile.role === 'student'

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Learning Progress</span>
          <h1>학습관리</h1>
          <p>
            {studentView ? (
              <>
                <span style={{ display: 'block' }}>소속 분반({classLabel(profile.track, profile.class_no)})이 수강하는 일정 기준의 체크리스트입니다.</span>
                <span style={{ display: 'block' }}>수업 내용을 이해했으면 체크하세요. 체크한 만큼 진도율이 올라갑니다.</span>
              </>
            ) : (
              <>
                <span style={{ display: 'block' }}>수업 내용을 이해했으면 체크하세요.</span>
                <span style={{ display: 'block' }}>출결과 무관한 학습 이해도 자가평가이며, 체크한 만큼 진도율이 올라갑니다.</span>
                {user && status === 'ready' && (
                  <span style={{ display: 'block' }}>
                    소속 분반을 등록하면 우리 반 수강 일정 기준으로 볼 수 있습니다.{' '}
                    <button onClick={openClassOnboarding} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gold)', fontWeight: 800, textDecoration: 'underline', fontSize: 'inherit', fontFamily: 'inherit' }}>
                      소속 등록하기
                    </button>
                  </span>
                )}
              </>
            )}
          </p>
        </div>
      </div>
      {studentView ? <TrackProgress profile={profile} /> : <SubjectProgress />}
    </div>
  )
}
