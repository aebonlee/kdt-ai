// 강사 소개 — hufs.dreamitbiz.com InstructorIntro 내역 기반 (About 2페이지 중 하나)
import { Link } from 'react-router-dom'
import AboutTabs from '../components/AboutTabs'
import Sentences from '../components/Sentences'


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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <img
                  src="/aebon.jpeg"
                  alt="이애본 박사"
                  width={160}
                  height={160}
                  style={{
                    width: 160, height: 160, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top',
                    border: '3px solid var(--bg-white)', boxShadow: '0 8px 24px rgba(15,27,51,0.18)',
                  }}
                />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 19, fontWeight: 900, color: 'var(--navy-800)' }}>이애본</div>
                  <div style={{ fontSize: 12.5, color: 'var(--gold)', fontWeight: 700, marginTop: 2 }}>Ph.D Aebon Lee</div>
                </div>
              </div>
              <div style={{ flex: '1 1 340px' }}>
                <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 4, lineHeight: 1.9 }}>
                  <Sentences text={'생성형 인공지능 교육과 에듀테크 플랫폼 개발을 전문으로 하는 강사입니다. 120여 개의 교육 사이트를 직접 설계·개발·운영하고 있습니다. 대학교(경기대·한신대·한국기술교육대·전남대·서울대·한국외대 등)와 기업·공공기관에서 AI 활용 교육을 진행하고 있습니다.'} />
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

          {/* Teaching Philosophy — 우측 장식(따옴표 + 궤도 노드, 히어로 비주얼과 같은 모티프) */}
          <div className="card" style={{ marginTop: 26, background: 'var(--ink-surface)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <svg
              aria-hidden="true"
              viewBox="0 0 260 220"
              style={{ position: 'absolute', right: -10, top: '50%', transform: 'translateY(-50%)', height: '135%', opacity: 0.9, pointerEvents: 'none' }}
            >
              <defs>
                <linearGradient id="tpG" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#6C4DFF" />
                  <stop offset="1" stopColor="#3F51FF" />
                </linearGradient>
                <radialGradient id="tpGlow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="#3F51FF" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#3F51FF" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="170" cy="110" r="100" fill="url(#tpGlow)" />
              <circle cx="170" cy="110" r="72" fill="none" stroke="#ACBEFF" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="3 6" />
              <circle cx="170" cy="110" r="46" fill="none" stroke="#ACBEFF" strokeOpacity="0.18" strokeWidth="1" />
              {/* 큰 따옴표 */}
              <text x="120" y="150" fontSize="120" fontWeight="900" fill="url(#tpG)" opacity="0.55" fontFamily="Georgia, serif">”</text>
              {/* 궤도 노드 */}
              <circle cx="170" cy="38" r="5" fill="#B78CFF" />
              <circle cx="242" cy="110" r="4" fill="#4DD8C7" />
              <circle cx="170" cy="182" r="4.5" fill="#FFB65C" />
              <circle cx="98" cy="110" r="3.5" fill="#7C8CFF" />
              <line x1="170" y1="43" x2="170" y2="64" stroke="#ACBEFF" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 4" />
              <line x1="238" y1="110" x2="216" y2="110" stroke="#ACBEFF" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 4" />
            </svg>
            <div style={{ position: 'relative', maxWidth: '78%' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)', letterSpacing: 1 }}>TEACHING PHILOSOPHY</div>
            <p style={{ marginTop: 8, fontWeight: 900, fontSize: 19 }}>"AI는 도구이고, 진짜 혁신은 사람이 만듭니다."</p>
            <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.9, color: 'rgba(255,255,255,0.85)' }}>
              <Sentences text={"교육의 핵심은 기술을 '아는 것'이 아니라 '할 수 있는 것'으로 만드는 데 있습니다. 이론 30% · 실습 70% 구성으로 교육 현장에서 바로 적용할 수 있는 실무 역량을 키웁니다. 교육이 끝난 뒤에도 이 플랫폼에서 학습이 계속 이어지도록 함께 운영합니다."} />
            </p>
            </div>
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
