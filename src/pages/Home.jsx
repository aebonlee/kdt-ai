import { Link } from 'react-router-dom'
import { course } from '../data/course'
import { sessionsBySubject, totalSessions, totalSubjects, sortedSessions } from '../data/curriculum'

export default function Home() {
  const groups = sessionsBySubject()
  const all = sortedSessions()
  const first = all[0]?.date
  const last = all[all.length - 1]?.date

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">{course.subtitle} · {course.cohort}</span>
            <h1 className="hero-title">
              SKALA <span className="accent">4기</span><br />담당 강의 커리큘럼
            </h1>
            <p className="hero-lead">
              {course.instructor} 강사 담당 일정 기준입니다. 과목별·일자별 학습 목표와 내용을
              확인하세요. (판교 3·4반, 광주 1반 — 광주는 별도 분반)
            </p>
            <div className="hero-actions">
              <Link to="/schedule" className="btn btn-cta">
                전체 일정 보기 <span className="btn-arrow">→</span>
              </Link>
              <Link to="/subjects" className="btn btn-ghost">과목별 보기</Link>
            </div>
          </div>

          <aside className="hero-side">
            <div className="metric-stack">
              <div className="metric">
                <div className="metric-num">{totalSessions}<span className="unit">일</span></div>
                <div className="metric-label">담당 강의일</div>
              </div>
              <div className="metric">
                <div className="metric-num">{totalSubjects}<span className="unit">과목</span></div>
                <div className="metric-label">담당 과목</div>
              </div>
              <div className="metric">
                <div className="metric-num">2<span className="unit">지역</span></div>
                <div className="metric-label">판교 · 광주</div>
              </div>
              <div className="metric">
                <div className="metric-num" style={{ fontSize: 22 }}>{first?.slice(5)}</div>
                <div className="metric-label">첫 강의 ~ {last?.slice(5)}</div>
              </div>
            </div>
            <p className="hero-side-note">
              {course.overview.period} · {course.overview.time}<br />
              {course.overview.format}
            </p>
          </aside>
        </div>
      </section>

      {/* 과목 목록 */}
      <section className="section" style={{ background: 'var(--navy-50)' }}>
        <div className="container">
          <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span className="eyebrow">Curriculum</span>
              <h2>담당 과목</h2>
              <p>각 과목을 클릭하면 일자별 학습 내용을 볼 수 있습니다.</p>
            </div>
            <Link to="/subjects" className="section-link">전체 보기 →</Link>
          </div>

          <div className="grid grid-3">
            {groups.map(({ subject, items }) => {
              const regions = [...new Set(items.map((i) => i.region))]
              return (
                <Link key={subject.id} to="/subjects" className="card">
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span className="chip chip-code">{subject.code}</span>
                    <span className="chip chip-cat">{subject.category}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--navy-800)', lineHeight: 1.35 }}>
                    {subject.name}
                  </h3>
                  <p style={{ color: 'var(--ink-soft)', fontSize: 13.5, marginTop: 8 }}>{subject.summary}</p>
                  <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                    <span className="chip chip-day">{items.length}일</span>
                    {regions.map((r) => (
                      <span key={r} className={`chip chip-region ${r === '광주' ? 'gwangju' : 'pangyo'}`}>{r}</span>
                    ))}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
