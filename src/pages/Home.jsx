import { Link } from 'react-router-dom'
import { course } from '../data/course'
import Sentences from '../components/Sentences'
import HeroVisual from '../components/HeroVisual'
import TypeWriter from '../components/TypeWriter'
import CurriculumFlow from '../components/CurriculumFlow'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            {/* DreamIT Biz 다크 IDE 히어로 — 텍스트 타이틀 + 코드 프롬프트 톤 */}
            <p className="hero-mono">$ dreamitbiz --learn ai</p>
            <h1 className="hero-title">
              <span className="ht-line">AI 실무를</span>
              {/* 핵심 키워드 타이핑 로테이터 — 디자인 원본(rest06) 이식 */}
              <span className="ht-line">
                <TypeWriter words={['코드로 배우다', '실습으로 익히다', '프로젝트로 완성하다', '피드백으로 성장하다']} />
              </span>
            </h1>
            <p className="hero-lead">
              DreamIT Biz 학습지원 — 강의안·실습교안부터 팀 프로젝트까지,
              현장에서 바로 쓰는 AI 실무 커리큘럼을 한곳에서.
            </p>
            {/* 학습 트랙 요약 — 라인형 */}
            <div className="hero-values">
              {[
                { k: '강의안', d: '날짜별 8시간 자립 강의 블록', c: 'var(--a1)' },
                { k: '실습교안', d: '복사–붙여넣기로 바로 도는 실습', c: 'var(--a2)' },
                { k: '팀 프로젝트', d: '수행 전 과정 가이드', c: '#c678dd' },
                { k: '평가·피드백', d: '과목별 기준으로 성장 점검', c: '#61afef' },
              ].map((v, i) => (
                <div key={v.k} className="hero-value" style={{ '--hv-accent': v.c, animationDelay: `${0.15 + i * 0.13}s` }}>
                  <span className="hv-key"><span className="hv-dot" />{v.k}</span>
                  <span className="hv-desc">{v.d}</span>
                </div>
              ))}
            </div>
            <div className="hero-actions">
              <Link to="/textbook" className="btn btn-cta">
                교과목별 강의안 <span className="btn-arrow">→</span>
              </Link>
              <Link to="/practice" className="btn btn-ghost">담당일자별 실습교안</Link>
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

      {/* 전체 커리큘럼 흐름도 — 다크 배경에 맞춘 SVG */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Overview</span>
            <h2>전체 커리큘럼</h2>
            <p>
              <Sentences text={`AI 실무 전 과정의 흐름입니다. 본 사이트는 이 중 ${course.instructor} 강사 담당 과목을 다룹니다.`} />
            </p>
          </div>
          <div className="card" style={{ padding: 'var(--s-6)', overflowX: 'auto' }}>
            <CurriculumFlow />
          </div>
        </div>
      </section>

    </div>
  )
}
