import { Link } from 'react-router-dom'
import { course } from '../data/course'
import Sentences from '../components/Sentences'
import HeroVisual from '../components/HeroVisual'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">{course.subtitle} · {course.cohort}</span>
            <h1 className="hero-title">
              SKALA <span className="accent">4기</span>
            </h1>
            {/* SK 핵심가치 응원 메시지(대표 확정 문안) — 키워드 강조 + 해설, 모바일은 자동 줄바꿈 */}
            <div className="hero-values">
              {[
                { k: '패기', d: '우리는 스스로 도전하고 두려움 없이 실행한다.', c: '#7C8CFF' },
                { k: '실력 · 전문성', d: '우리는 AI로 기술에 신뢰를 더한다.', c: '#4DD8C7' },
                { k: '소통 · 협력', d: '소통은 신뢰를 만들고, 협력이 성과를 만든다.', c: '#FFB65C' },
                { k: '자발적 · 의욕적 SUPEX 추구', d: '우리는 최고를 상상하고 AI와 함께 혁신한다.', c: '#B78CFF' },
              ].map((v, i) => (
                <div key={v.k} className="hero-value" style={{ '--hv-accent': v.c, animationDelay: `${0.15 + i * 0.13}s` }}>
                  <span className="hv-key"><span className="hv-dot" />{v.k}</span>
                  <span className="hv-desc">{v.d}</span>
                </div>
              ))}
            </div>
            <div className="hero-actions">
              <Link to="/lectures" className="btn btn-cta">
                학습강의안 보기 <span className="btn-arrow">→</span>
              </Link>
              <Link to="/textbook" className="btn btn-ghost">실습교안 보기</Link>
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
              { to: '/lectures', t: '강의안', d: '날짜별 8시간 강의안 · 시간표·실습' },
              { to: '/team', t: '팀 프로젝트', d: '팀 프로젝트 수행 전 과정 가이드' },
              { to: '/reference', t: '참고자료', d: '과목별 공식 문서·자료 모음' },
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

    </div>
  )
}
