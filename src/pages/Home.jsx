import { Link } from 'react-router-dom'
import { course } from '../data/course'
import { sessionsBySubject } from '../data/curriculum'
import Sentences from '../components/Sentences'
import HeroVisual from '../components/HeroVisual'

const regionClass = (r) => (r === '광주' ? 'gwangju' : r === '울산' ? 'ulsan' : 'pangyo')

export default function Home() {
  const groups = sessionsBySubject()

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
              <Sentences text={`${course.instructor} 강사가 울산 · 판교(4·5층) · 광주 각 캠퍼스 교실로 찾아가 진행하는 담당 강의 일정입니다. 여러분은 소속 반 교실에서 그대로 수강하면 됩니다. 과목별·일자별 학습 목표와 내용을 확인하세요.`} />
            </p>
            <div className="hero-actions">
              <Link to="/lectures" className="btn btn-cta">
                학습강의안 보기 <span className="btn-arrow">→</span>
              </Link>
              <Link to="/subjects" className="btn btn-ghost">과목별 보기</Link>
            </div>
          </div>

          <aside className="hero-side">
            <HeroVisual />
          </aside>
        </div>
      </section>

      {/* 둘러보기 — 메뉴 바로가기 */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="grid grid-3">
            {[
              { to: '/about', t: 'About', d: '개발 취지 · 강사 소개' },
              { to: '/prep', t: '선수학습자료', d: '파이썬·Streamlit·Django·Supabase 등 기초' },
              { to: '/subjects', t: '과목별 안내', d: '담당 과목의 일자별 학습 내용' },
              { to: '/lectures', t: '강의안', d: '날짜별 8시간 강의안 · 시간표·실습' },
              { to: '/team', t: '팀 프로젝트', d: '팀 프로젝트 수행 전 과정 가이드' },
              { to: '/reference', t: '참고자료', d: '과목별 공식 문서·자료 모음' },
              { to: '/progress', t: '학습관리', d: '이해도 자가평가로 진도율 체크' },
            ].map((c) => (
              <Link key={c.t + c.to} to={c.to} className="card">
                <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--navy-800)' }}>{c.t}</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: 13.5, marginTop: 6 }}>{c.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SKALA 전체 커리큘럼 흐름도 */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Overview</span>
            <h2>SKALA 4기 전체 커리큘럼</h2>
            <p>
              <Sentences text={`SK AI Leader Academy 4기 과정 전체 흐름입니다. 본 사이트는 이 중 ${course.instructor} 강사 담당 과목을 다룹니다.`} />
            </p>
          </div>
          <div
            style={{
              background: '#fff',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius)',
              padding: 'var(--s-6)',
            }}
          >
            <img
              src="/curriculum_graph.png"
              alt="SKALA 4기 전체 커리큘럼 흐름도"
              width={2364}
              height={890}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
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
                      <span key={r} className={`chip chip-region ${regionClass(r)}`}>{r}</span>
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
