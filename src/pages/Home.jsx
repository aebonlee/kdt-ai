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
              <Sentences text={`${course.instructor} 강사 담당 일정 기준입니다. 과목별·일자별 학습 목표와 내용을 확인하세요. (울산 · 판교 4·5층 · 광주 — 지역별 분반 진행)`} />
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

      {/* SKALA 학습 플랫폼 특징 — 핵심 수치 하이라이트 */}
      <section className="section">
        <div className="container">
          <div
            style={{
              borderRadius: 'var(--radius)', padding: 'clamp(24px, 4vw, 44px)', color: '#fff',
              background:
                'radial-gradient(700px 360px at 90% 0%, rgba(108,77,255,0.4), transparent 60%), var(--skala-indigo)',
            }}
          >
            <span className="eyebrow" style={{ color: '#ACBEFF' }}>Why this platform</span>
            <h2 style={{ fontSize: 26, fontWeight: 900, marginTop: 6 }}>
              하루 8시간 수업을 그대로 담은 학습 플랫폼
            </h2>
            <p style={{ marginTop: 8, fontSize: 14, color: 'rgba(221,227,255,0.8)', lineHeight: 1.7 }}>
              강의안·실습·퀴즈·평가기준까지 — SK 공식 교재에 근거해 우리말로 다시 쓴 콘텐츠로,
              수업 전 예습부터 수료 후 복습까지 이어집니다.
            </p>
            <div
              style={{
                marginTop: 24, display: 'grid', gap: 14,
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              }}
            >
              {[
                ['18과목', '담당 강의 커리큘럼'],
                ['48일', '일자별 8시간 강의안'],
                ['380+', '전 라인 한글 주석 실습예제'],
                ['148문항', '과목별 복습 퀴즈'],
                ['18과목', '종합실습 평가기준(참고 포함)'],
                ['웹 + PDF', '실습교안 2종 제공'],
              ].map(([num, label]) => (
                <div key={label} style={{ borderLeft: '2px solid rgba(172,190,255,0.4)', paddingLeft: 14 }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: '#fff' }}>{num}</div>
                  <div style={{ marginTop: 4, fontSize: 12.5, color: 'rgba(221,227,255,0.75)', lineHeight: 1.5 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKALA 전체 커리큘럼 흐름도 */}
      <section className="section" style={{ paddingTop: 0 }}>
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
