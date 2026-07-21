import { course } from '../data/course'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-brand"><b>DreamIT</b> Biz</div>
        <h4>
          AI 실무 교육 · {course.instructor}
        </h4>
        <p>
          {course.subtitle} — {course.tagline}
        </p>
        <p>
          {course.overview.period} ({course.overview.range}) · {course.overview.time} ·{' '}
          {course.overview.format}
        </p>
        <p>
          담당 지역: {course.regions.map((r) => `${r.name} ${r.klass}`.trim()).join(' · ')} · 문의:{' '}
          {course.contact}
        </p>
        <div className="foot-bottom">
          <p className="fine">DreamIT Biz 학습지원 — AI 실무 교육 커리큘럼</p>
          <p className="credit">
            이 사이트는 Ph.D Aebon의 기획과 판단을 Claude Code가 구현하는 human-in-the-loop 협업으로 제작되었습니다.
          </p>
        </div>
      </div>
    </footer>
  )
}
