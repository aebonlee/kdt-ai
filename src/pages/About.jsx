// About — 개발 취지 페이지 (강사 소개는 /about/instructor 별도 페이지)
import { Link } from 'react-router-dom'

const PURPOSE = [
  {
    icon: '🎯',
    t: '담당 강의를 한 곳에',
    d: 'SKALA 4기 담당 과목의 일자별 강의안·실습·복습 퀴즈·종합실습 평가기준을 단일 플랫폼에 담아, 수업 전 예습부터 수업 후 복습까지 한 흐름으로 잇습니다.',
  },
  {
    icon: '🌱',
    t: '왕초보도 따라오는 실습 중심',
    d: 'SK 공식 교재를 근거로 우리말로 풀어 쓴 실습 예제에 전 코드 라인 한글 주석을 달았습니다. 처음 배우는 사람도 줄 단위로 따라올 수 있게 만드는 것이 원칙입니다.',
  },
  {
    icon: '🔗',
    t: '과정 전체가 이어지게',
    d: '담당 일정 외 과목도 참고자료·핵심개념·평가기준까지 정리해, 분반별로 다른 순서로 배워도 과정 전체의 흐름을 놓치지 않도록 돕습니다.',
  },
]

const PLATFORM = [
  { num: '01', title: '학습강의안', desc: '날짜별 8시간 강의안 · 시간표 · 실습', link: '/lectures' },
  { num: '02', title: '실습교안', desc: '웹 · PDF 실습 교재 (인쇄 지원)', link: '/practice-textbook.html', external: true },
  { num: '03', title: '과목별 안내', desc: '담당 과목의 일자별 학습 내용', link: '/subjects' },
  { num: '04', title: '선수학습자료', desc: '파이썬 · Git · SQL 등 기초 19주제', link: '/prep' },
  { num: '05', title: '팀 프로젝트', desc: '팀 프로젝트 수행 전 과정 가이드', link: '/team' },
  { num: '06', title: '학습관리', desc: '이해도 자가평가로 진도율 체크', link: '/progress' },
]

export default function About() {
  return (
    <div>
      <section className="page-header-ed">
        <div className="container">
          <span className="eyebrow">About</span>
          <h1>개발 취지</h1>
          <p>수업이 끝나도 학습이 이어지도록 — 이 학습 플랫폼을 만든 이유입니다.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* 개발 취지 3원칙 */}
          <div className="grid grid-3">
            {PURPOSE.map((c) => (
              <div key={c.t} className="card">
                <div style={{ fontSize: 26 }}>{c.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--navy-800)', marginTop: 8 }}>{c.t}</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: 13.5, marginTop: 6, lineHeight: 1.7 }}>{c.d}</p>
              </div>
            ))}
          </div>

          {/* 플랫폼 구성 */}
          <h3 style={{ fontSize: 17, fontWeight: 900, color: 'var(--navy-800)', margin: '30px 0 12px' }}>플랫폼 구성</h3>
          <div className="grid grid-3">
            {PLATFORM.map((p) =>
              p.external ? (
                <a key={p.num} href={p.link} target="_blank" rel="noreferrer" className="card">
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)' }}>{p.num}</div>
                  <h3 style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--navy-800)', marginTop: 6 }}>{p.title} ↗</h3>
                  <p style={{ color: 'var(--ink-soft)', fontSize: 13, marginTop: 5 }}>{p.desc}</p>
                </a>
              ) : (
                <Link key={p.num} to={p.link} className="card">
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)' }}>{p.num}</div>
                  <h3 style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--navy-800)', marginTop: 6 }}>{p.title}</h3>
                  <p style={{ color: 'var(--ink-soft)', fontSize: 13, marginTop: 5 }}>{p.desc}</p>
                </Link>
              ),
            )}
          </div>

          {/* 강사 소개 링크 카드 */}
          <div style={{ marginTop: 30 }}>
            <Link
              to="/about/instructor"
              className="card"
              style={{ display: 'block', background: 'var(--ink-surface)', color: '#fff' }}
            >
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)', letterSpacing: 1 }}>INSTRUCTOR</div>
              <h3 style={{ fontSize: 19, fontWeight: 900, marginTop: 8 }}>강사 소개 — 이애본 Ph.D</h3>
              <p style={{ fontSize: 13.5, marginTop: 6, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
                드림아이티비즈 대표 · 기업 AI 교육 전문 강사 · 120여 개 교육 사이트 개발·운영
              </p>
              <div style={{ marginTop: 12, fontSize: 13.5, fontWeight: 800, color: 'var(--gold)' }}>자세히 보기 →</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
