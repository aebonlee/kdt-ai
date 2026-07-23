import { glossary, glossaryIntro } from '../data/glossary'

export default function Appendix() {
  const total = glossary.reduce((n, g) => n + g.terms.length, 0)
  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Appendix</span>
          <h1>부록 · 용어사전</h1>
          <p>
            <span style={{ display: 'block' }}>{glossaryIntro}</span>
            <span style={{ display: 'block' }}>총 {glossary.length}개 분류 · {total}개 용어 (한글표기(영문) + 정의)</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {glossary.map((group) => (
            <div key={group.h} style={{ marginBottom: 'var(--s-8, 32px)' }}>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: 'var(--navy-800)',
                  margin: '0 0 12px',
                  paddingBottom: 8,
                  borderBottom: '2px solid var(--line)',
                }}
              >
                {group.h}
              </h2>
              <div style={{ display: 'grid', gap: 12 }}>
                {group.terms.map((t) => (
                  <div
                    key={t.en}
                    className="card"
                    style={{ padding: 'var(--s-5, 16px)' }}
                  >
                    <div style={{ fontWeight: 800, color: 'var(--navy-800)', marginBottom: 4 }}>
                      {t.ko}
                      <span style={{ fontWeight: 600, color: 'var(--navy-500, #64748b)', marginLeft: 8, fontSize: 14 }}>
                        ({t.en})
                      </span>
                    </div>
                    <div style={{ color: 'var(--ink-600, #475569)', lineHeight: 1.6 }}>{t.def}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
