import { prepTopics } from '../data/resources'

export default function Prep() {
  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Prerequisites</span>
          <h1>선수학습자료</h1>
          <p>
            <span style={{ display: 'block' }}>수업 전·후 스스로 다져두면 좋은 기초 자료입니다.</span>
            <span style={{ display: 'block' }}>각 주제의 핵심 항목과 공식 문서 링크를 함께 제공합니다.</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* 빠른 이동 */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
            {prepTopics.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="chip" style={{ textDecoration: 'none' }}>
                {t.name}
              </a>
            ))}
          </div>

          {prepTopics.map((t) => (
            <div key={t.id} id={t.id} className="subject" style={{ scrollMarginTop: 90 }}>
              <div className="subject-head">
                <h3>{t.name}</h3>
                <span className="chip chip-cat">{t.tag}</span>
              </div>
              <p className="subject-summary">{t.desc}</p>

              <div className="grid grid-2" style={{ marginTop: 16 }}>
                {t.sections.map((sec) => (
                  <div key={sec.h} className="card">
                    <h4 style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.04em', color: 'var(--gold)', marginBottom: 8 }}>
                      {sec.h}
                    </h4>
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

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                {t.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost"
                    style={{ fontSize: 13, padding: '9px 16px' }}
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
