import { course } from '../data/course'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <img src="/brandLogo.png" alt="SKALA" style={{ height: 24, marginBottom: 12 }} />
        <h4>
          4기 · {course.instructor} 강사
        </h4>
        <p>
          {course.subtitle} — {course.tagline}
        </p>
        <p>
          {course.overview.period} ({course.overview.range}) · {course.overview.time} ·{' '}
          {course.overview.format}
        </p>
        <p>
          담당 분반: {course.regions.map((r) => `${r.name} ${r.klass}`).join(' · ')} · 문의:{' '}
          {course.contact}
        </p>
        <p className="fine">SKALA 4기 학습자용 커리큘럼 안내 페이지 · 강사 담당 일정 기준</p>
      </div>
    </footer>
  )
}
