import { Link } from 'react-router-dom'
import { course } from '../data/course'

// 푸터 — 3단 그리드(브랜드·문의 / 과정 정보 / 바로가기) + 하단 크레딧 줄 (2026-07-24 배치 개편)
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="foot-brand"><b>DreamIT</b> Biz</div>
            <h4>AI 실무 교육 · {course.instructor}</h4>
            <p>{course.subtitle} — {course.tagline}</p>
            <p>문의: {course.contact}</p>
          </div>

          <div>
            <div className="foot-h">과정 정보</div>
            <p>{course.overview.period} ({course.overview.range})</p>
            <p>{course.overview.time} · {course.overview.format}</p>
            <p>담당 지역: {course.regions.map((r) => `${r.name} ${r.klass}`.trim()).join(' · ')}</p>
          </div>

          <div>
            <div className="foot-h">바로가기</div>
            <ul className="foot-links">
              <li><Link to="/textbook">교과목별 강의안</Link></li>
              <li><Link to="/practice">담당일자별 실습교안</Link></li>
              <li><Link to="/team">팀 프로젝트</Link></li>
              <li><Link to="/prep">선수학습자료</Link></li>
              <li><Link to="/reference">참고자료</Link></li>
            </ul>
          </div>
        </div>

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
