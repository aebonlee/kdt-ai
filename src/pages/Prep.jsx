import { useEffect, useState, useRef } from 'react'
import { prepTopics } from '../data/resources'
import CodeBlock from '../components/CodeBlock'

// 카테고리 표시 순서 (학습 흐름)
const CAT_ORDER = ['필수', '프론트', '백엔드', '데이터', 'AI 데모', '배포', 'BaaS', '실습환경', 'AI 기초']
const categories = CAT_ORDER.filter((c) => prepTopics.some((t) => t.tag === c))

export default function Prep() {
  const [cat, setCat] = useState(categories[0])
  const topics = prepTopics.filter((t) => t.tag === cat)
  const [active, setActive] = useState(topics[0]?.id)
  const observer = useRef(null)

  // 카테고리 변경 시: 첫 주제로 활성화 + 상단 스크롤
  useEffect(() => {
    setActive(topics[0]?.id)
    window.scrollTo({ top: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat])

  // 스크롤 스파이 — 현재 카테고리의 주제들만 관찰
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
    topics.forEach((t) => {
      const el = document.getElementById(t.id)
      if (el) observer.current.observe(el)
    })
    return () => observer.current?.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat])

  const go = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
  }

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Prerequisites</span>
          <h1>선수학습자료</h1>
          <p>
            <span style={{ display: 'block' }}>수업 전·후 스스로 다져두면 좋은 기초 자료입니다.</span>
            <span style={{ display: 'block' }}>상단 분류를 선택하면 해당 주제만 모아 보여줍니다.</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* 상단 카테고리 탭 */}
          <div className="month-tabs" style={{ marginBottom: 24 }}>
            {categories.map((c) => (
              <button
                key={c}
                className={`month-tab${cat === c ? ' active' : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
                <span style={{ marginLeft: 6, opacity: 0.7, fontWeight: 600 }}>
                  {prepTopics.filter((t) => t.tag === c).length}
                </span>
              </button>
            ))}
          </div>

          <div className="layout-side">
            {/* 좌측: 해당 카테고리의 주제 목록 */}
            <nav className="side-nav" aria-label="주제">
              <p className="side-nav-title">{cat}</p>
              {topics.map((t) => (
                <button
                  key={t.id}
                  className={`side-link${active === t.id ? ' active' : ''}`}
                  onClick={() => go(t.id)}
                  aria-current={active === t.id ? 'true' : undefined}
                >
                  {t.name}
                </button>
              ))}
            </nav>

            {/* 본문 */}
            <div>
              {topics.map((t) => (
                <article key={t.id} id={t.id} className="subject" style={{ scrollMarginTop: 84 }}>
                  <div className="subject-head">
                    <h3>{t.name}</h3>
                    <span className="chip chip-cat">{t.tag}</span>
                  </div>
                  <p className="subject-summary">{t.desc}</p>

                  {/* 핵심 개념 */}
                  <div className="grid grid-2" style={{ marginTop: 16 }}>
                    {t.sections.map((sec) => (
                      <div key={sec.h} className="card">
                        <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--gold)', marginBottom: 8 }}>{sec.h}</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {sec.items.map((it, i) => (
                            <li key={i} style={{ position: 'relative', paddingLeft: 16, fontSize: 14, color: 'var(--navy-700)' }}>
                              <span style={{ position: 'absolute', left: 2, top: 9, width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* 실습 + 팁 */}
                  <div className="grid grid-2" style={{ marginTop: 16 }}>
                    <div className="box box-practice">
                      <div className="box-h">🧪 실습 과제</div>
                      <ol>
                        {t.practice.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ol>
                    </div>
                    <div className="box box-tips">
                      <div className="box-h">💡 팁</div>
                      <ul>
                        {t.tips.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 코드 예시 */}
                  {t.snippet && (
                    <div style={{ marginTop: 16 }}>
                      <div className="box-h" style={{ marginBottom: 8 }}>
                        ⌨️ 코드 예시 <span style={{ fontWeight: 600, color: 'var(--ink-soft)', fontSize: 12 }}>({t.snippet.lang})</span>
                      </div>
                      <CodeBlock code={t.snippet.code} lang={t.snippet.lang} />
                    </div>
                  )}

                  {/* 링크 */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                    {t.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: 13, padding: '9px 16px' }}>
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
