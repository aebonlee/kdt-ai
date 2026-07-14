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

      {/* 개발 취지 */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Purpose</span>
            <h2>개발 취지</h2>
            <p>이 사이트를 만든 이유 — 수업이 끝나도 학습이 이어지도록.</p>
          </div>
          <div className="grid grid-3">
            {[
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
            ].map((c) => (
              <div key={c.t} className="card">
                <div style={{ fontSize: 26 }}>{c.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--navy-800)', marginTop: 8 }}>{c.t}</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: 13.5, marginTop: 6, lineHeight: 1.7 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 강사 소개 */}
      <section className="section" style={{ background: 'var(--navy-50)', paddingTop: 48 }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Instructor</span>
            <h2>강사 소개</h2>
            <p>기업 AI 교육 전문 강사 프로필</p>
          </div>
          <div className="grid grid-2" style={{ alignItems: 'stretch' }}>
            <div className="card">
              <h3 style={{ fontSize: 20, fontWeight: 900, color: 'var(--navy-800)' }}>
                이애본 <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink-soft)' }}>Ph.D Aebon Lee · 드림아이티비즈 대표</span>
              </h3>
              <p style={{ color: 'var(--ink-soft)', fontSize: 13.5, marginTop: 10, lineHeight: 1.8 }}>
                생성형 인공지능 교육과 에듀테크 플랫폼 개발을 전문으로 하는 강사입니다.
                120여 개의 교육 사이트를 직접 설계·개발·운영하고 있으며, 대학교(경기대·한신대·한국기술교육대·전남대·서울대·한국외대 등)와
                기업·공공기관에서 AI 활용 교육을 진행하고 있습니다.
              </p>
              <ul className="dot-list" style={{ marginTop: 12, fontSize: 13.5 }}>
                <li>정보관리박사(Ph.D) — 컴퓨터 · 직업학 · 정보관리</li>
                <li>드림아이티비즈(DreamIT Biz) 대표 — 에듀테크 전문 기업</li>
                <li>한신대학교 AI·SW대학 겸임교수 · 한국기술교육대학교 외래교수</li>
                <li>경기대학교 겸임교수(2018~2023) — 소프트웨어 기초·파이썬</li>
                <li>2001~ 기업 AI 교육 전문 강사 — 고용노동부 직업능력개발훈련교사(인공지능·프로그래밍 개발·UI/UX 외)</li>
              </ul>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy-700)' }}>전문 분야</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                {['생성형 AI 교육', '프롬프트 엔지니어링', '에듀테크 플랫폼 개발', 'IT · 디지털 전환(DX)', '대학 SW·AI 교육', 'IT · 경영 도서 출판'].map((t) => (
                  <span key={t} style={{ padding: '6px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 700, background: 'var(--navy-100)', color: 'var(--navy-700)' }}>{t}</span>
                ))}
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 18 }}>
                <div style={{ padding: '16px 18px', borderRadius: 12, background: 'var(--navy-100)' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)', letterSpacing: 0.5 }}>TEACHING PHILOSOPHY</div>
                  <p style={{ marginTop: 6, fontWeight: 800, color: 'var(--navy-800)', fontSize: 15 }}>
                    "AI는 도구이고, 진짜 혁신은 사람이 만듭니다."
                  </p>
                  <p style={{ marginTop: 6, fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                    교육의 핵심은 기술을 '아는 것'이 아니라 '할 수 있는 것'으로 만드는 데 있습니다.
                    이론 30% · 실습 70% 구성으로, 교육 후에도 이 플랫폼에서 학습이 이어집니다.
                  </p>
                </div>
              </div>
            </div>
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
