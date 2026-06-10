import { useEffect, useState, useRef } from 'react'
import { teamSections } from '../data/teamproject'
import CodeBlock from '../components/CodeBlock'

export default function TeamProject() {
  const [active, setActive] = useState(teamSections[0].id)
  const observer = useRef(null)

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -65% 0px', threshold: 0 },
    )
    teamSections.forEach((t) => {
      const el = document.getElementById(t.id)
      if (el) observer.current.observe(el)
    })
    return () => observer.current?.disconnect()
  }, [])

  const go = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
  }

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Team Project</span>
          <h1>팀 프로젝트</h1>
          <p>
            <span style={{ display: 'block' }}>팀 프로젝트 수행 전 과정을 단계별로 안내합니다.</span>
            <span style={{ display: 'block' }}>좌측 메뉴에서 단계를 선택해 핵심·팁·체크리스트를 확인하세요.</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container layout-side">
          {/* 좌측 메뉴 */}
          <nav className="side-nav" aria-label="팀 프로젝트 단계">
            <p className="side-nav-title">진행 단계</p>
            {teamSections.map((t, i) => (
              <button
                key={t.id}
                className={`side-link${active === t.id ? ' active' : ''}`}
                onClick={() => go(t.id)}
                aria-current={active === t.id ? 'true' : undefined}
              >
                {String(i + 1).padStart(2, '0')}. {t.name}
              </button>
            ))}
          </nav>

          {/* 본문 */}
          <div>
            {teamSections.map((t, i) => (
              <article key={t.id} id={t.id} className="subject" style={{ scrollMarginTop: 84 }}>
                <div className="subject-head">
                  <span className="chip chip-code">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{t.name}</h3>
                </div>
                <p className="subject-summary">{t.desc}</p>

                {/* 핵심 블록 */}
                <div className="grid grid-2" style={{ marginTop: 16 }}>
                  {t.blocks.map((b) => (
                    <div key={b.h} className="card">
                      <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--gold)', marginBottom: 8 }}>{b.h}</h4>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {b.items.map((it, k) => (
                          <li key={k} style={{ position: 'relative', paddingLeft: 16, fontSize: 14, color: 'var(--navy-700)' }}>
                            <span style={{ position: 'absolute', left: 2, top: 9, width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* 템플릿/코드 */}
                {t.snippet && (
                  <div style={{ marginTop: 16 }}>
                    <CodeBlock code={t.snippet.code} lang={t.snippet.lang} />
                  </div>
                )}

                {/* 팁 + 체크리스트 */}
                <div className="grid grid-2" style={{ marginTop: 16 }}>
                  <div className="box box-tips">
                    <div className="box-h">💡 팁</div>
                    <ul>
                      {t.tips.map((p, k) => (
                        <li key={k}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  {t.checklist && (
                    <div className="box box-practice">
                      <div className="box-h">✅ 체크리스트</div>
                      <ul>
                        {t.checklist.map((p, k) => (
                          <li key={k}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
