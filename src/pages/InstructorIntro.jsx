// 강사 소개 — hufs.dreamitbiz.com InstructorIntro 내역 기반 (About 2페이지 중 하나)
import { Link } from 'react-router-dom'
import AboutTabs from '../components/AboutTabs'


const KEY_INFO = [
  ['직위', '드림아이티비즈 대표'],
  ['학위', '정보관리박사 (Ph.D)'],
  ['전공', '컴퓨터 / 직업학 / 정보관리'],
  ['교육 사이트', '120여 개 직접 개발·운영'],
  ['교육 대상', '대학 · 기업 · 공공기관'],
]

const EXPERTISE = [
  { area: '생성형 AI 교육', detail: 'ChatGPT, Gemini, Claude, Copilot 등 AI 도구 활용 교육' },
  { area: '프롬프트 엔지니어링', detail: 'SCORE 프레임워크, Chain-of-Thought, Few-shot 등 고급 기법' },
  { area: '에듀테크 플랫폼', detail: 'React + Supabase 기반 교육 사이트 설계·개발·운영' },
  { area: 'IT · 디지털 전환', detail: '기업 DX 컨설팅, 웹 시스템 구축, 데이터 분석' },
  { area: '대학 교육', detail: 'AI·SW개론, 컴퓨팅 사고 등 대학 교과목 강의' },
  { area: '출판 · 콘텐츠', detail: 'AI·IT·경영 분야 전문 도서 기획·출판' },
]

const CAREER = [
  { period: '현재', role: '드림아이티비즈(DreamIT Biz) 대표', detail: '에듀테크 전문 기업 경영, 120여 개 교육 사이트 운영' },
  { period: '현재', role: '한신대학교 AI·SW대학 겸임교수', detail: 'AI·SW개론, 공학설계입문, 자바프로그래밍, 웹프로그래밍 담당' },
  { period: '현재', role: '한국기술교육대학교 외래교수', detail: '"컴퓨팅 사고" 교과목 담당' },
  { period: '2018~2023', role: '경기대학교 겸임교수', detail: '소프트웨어 기초 및 파이썬 프로그래밍, Warm-Up 과정 담당' },
  { period: '2001~', role: '기업 AI 교육 전문 강사', detail: '고용노동부 직업능력개발훈련교사 — 정보통신분야 인공지능, 프로그래밍 개발, UI/UX디자인 외 다수' },
]

export default function InstructorIntro() {
  return (
    <div>
      <section className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Instructor</span>
          <h1>강사 소개</h1>
          <p>기업 AI 교육 전문 강사 프로필</p>
          <AboutTabs current="instructor" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* 프로필 헤더 + KEY INFO */}
          <div className="card">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ flex: '1 1 380px' }}>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: 'var(--navy-800)' }}>
                  이애본 <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-soft)' }}>Ph.D Aebon Lee</span>
                </h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 10, lineHeight: 1.8 }}>
                  생성형 인공지능 교육과 에듀테크 플랫폼 개발을 전문으로 하는 강사입니다.
                  120여 개의 교육 사이트를 직접 설계·개발·운영하고 있으며,
                  대학교(경기대·한신대·한국기술교육대·전남대·서울대·한국외대 등)와 기업·공공기관에서 AI 활용 교육을 진행하고 있습니다.
                </p>
              </div>
              <div style={{ flex: '1 1 320px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {KEY_INFO.map(([k, v]) => (
                  <div key={k} style={{ padding: '9px 12px', background: 'var(--navy-50)', borderRadius: 8, fontSize: 12.5 }}>
                    <span style={{ color: 'var(--ink-soft)', fontWeight: 600 }}>{k}</span>
                    <div style={{ color: 'var(--navy-800)', fontWeight: 800, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 전문 분야 */}
          <h3 style={{ fontSize: 17, fontWeight: 900, color: 'var(--navy-800)', margin: '26px 0 12px' }}>전문 분야</h3>
          <div className="grid grid-3">
            {EXPERTISE.map((e) => (
              <div key={e.area} className="card" style={{ padding: '16px 18px' }}>
                <div style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--navy-800)' }}>{e.area}</div>
                <p style={{ color: 'var(--ink-soft)', fontSize: 13, marginTop: 5, lineHeight: 1.6 }}>{e.detail}</p>
              </div>
            ))}
          </div>

          {/* 주요 경력 */}
          <h3 style={{ fontSize: 17, fontWeight: 900, color: 'var(--navy-800)', margin: '26px 0 12px' }}>주요 경력</h3>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {CAREER.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'baseline',
                  padding: '14px 18px', borderBottom: i < CAREER.length - 1 ? '1px solid var(--line)' : 'none',
                }}
              >
                <span style={{ flex: '0 0 92px', fontSize: 12.5, fontWeight: 800, color: 'var(--gold)' }}>{c.period}</span>
                <span style={{ flex: '1 1 220px', fontSize: 14.5, fontWeight: 800, color: 'var(--navy-800)' }}>{c.role}</span>
                <span style={{ flex: '2 1 320px', fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{c.detail}</span>
              </div>
            ))}
          </div>

          {/* Teaching Philosophy */}
          <div className="card" style={{ marginTop: 26, background: 'var(--ink-surface)', color: '#fff' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)', letterSpacing: 1 }}>TEACHING PHILOSOPHY</div>
            <p style={{ marginTop: 8, fontWeight: 900, fontSize: 19 }}>"AI는 도구이고, 진짜 혁신은 사람이 만듭니다."</p>
            <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.8, color: 'rgba(255,255,255,0.85)' }}>
              교육의 핵심은 기술을 '아는 것'이 아니라 '할 수 있는 것'으로 만드는 데 있습니다.
              이론 30% · 실습 70% 구성으로 교육 현장에서 바로 적용할 수 있는 실무 역량을 키우는 것을 목표로 하며,
              교육이 끝난 뒤에도 이 플랫폼에서 학습이 계속 이어지도록 함께 운영합니다.
            </p>
          </div>

          <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to="/about" className="btn btn-ghost">← 개발 취지</Link>
            <Link to="/lectures" className="btn btn-cta">학습강의안 보기 →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
