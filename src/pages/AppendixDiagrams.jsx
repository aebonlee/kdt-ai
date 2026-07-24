// 부록 · 기획안 도해 가이드 — 파이프라인·아키텍처·순서도·와이어프레임 상세 레퍼런스.
// 7/24 실습강의안 부록의 상설 확장판. AppendixTabs로 용어사전과 하위 전환.
import AppendixTabs from '../components/AppendixTabs'
import Rich from '../components/Rich'
import { diagramGuide as G } from '../data/diagramguide'

const H3 = { fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '32px 0 10px' }

export default function AppendixDiagrams() {
  return (
    <div>
      <div className="page-header-ed">
        <div className="container" style={{ position: 'relative' }}>
          <div className="tb-print-box" style={{ position: 'absolute', top: 0, right: 'var(--s-5)' }}>
            <button type="button" className="btn btn-primary tb-print-btn" onClick={() => window.print()} style={{ fontSize: 13, padding: '9px 18px' }}>
              🖨 인쇄 · PDF 저장
            </button>
          </div>
          <span className="eyebrow">Appendix</span>
          <h1>부록 · 기획안 도해 가이드</h1>
          <p style={{ whiteSpace: 'pre-line', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>{G.intro}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <AppendixTabs />

          {/* 무엇을 그릴지 고르기 */}
          <h3 style={{ ...H3, marginTop: 0 }}>어떤 그림을 그릴까 — 질문으로 고르기</h3>
          <div className="grid grid-2" style={{ marginTop: 4 }}>
            {G.chooser.map((c) => (
              <div key={c.a} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--navy-800)' }}>“{c.q}”</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--gold)' }}>→ {c.a}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6, wordBreak: 'keep-all' }}>{c.when}</div>
              </div>
            ))}
          </div>

          {/* 도해 4종 상세 */}
          {G.diagrams.map((d) => (
            <div key={d.key} id={`dg-${d.key}`} style={{ marginTop: 40, paddingTop: 20, borderTop: '2px solid var(--line)', scrollMarginTop: 84 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy-800)', margin: '0 0 2px' }}>{d.title}</h2>
              <p style={{ margin: '0 0 14px', fontSize: 14, color: 'var(--gold)', fontWeight: 700 }}>{d.oneLine}</p>

              <figure style={{ margin: '0 0 16px' }}>
                <img src={d.figure} alt={d.title} style={{ width: '100%', maxWidth: 900, display: 'block', borderRadius: 10 }} />
              </figure>

              <div className="grid grid-2">
                <div className="card">
                  <div className="box-h" style={{ marginBottom: 8 }}>기호 규칙</div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
                    <tbody>
                      {d.symbols.map(([sym, mean]) => (
                        <tr key={sym} style={{ borderBottom: '1px solid var(--line)' }}>
                          <td style={{ padding: '6px 10px 6px 0', fontWeight: 800, color: 'var(--navy-800)', whiteSpace: 'nowrap', verticalAlign: 'top' }}>{sym}</td>
                          <td style={{ padding: '6px 0', color: 'var(--navy-700)', lineHeight: 1.55 }}>{mean}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="card">
                  <div className="box-h" style={{ marginBottom: 8 }}>그리는 규칙</div>
                  <ul className="dot-list" style={{ margin: 0 }}>
                    {d.rules.map((r, i) => (
                      <li key={i} style={{ fontSize: 13.5, color: 'var(--navy-700)', lineHeight: 1.7 }}><Rich text={r} /></li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="box box-tips" style={{ marginTop: 14 }}>
                <div className="box-h">언제 쓰나</div>
                <p style={{ margin: 0, fontSize: 13.5, color: 'var(--navy-700)', lineHeight: 1.7 }}>{d.when}</p>
              </div>
              <div className="box box-practice" style={{ marginTop: 12 }}>
                <div className="box-h">오늘 과제 적용 예</div>
                <p style={{ margin: 0, fontSize: 13.5, color: 'var(--navy-700)', lineHeight: 1.7 }}><Rich text={d.example} /></p>
              </div>
              <div style={{ marginTop: 12 }}>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--rose, #fb7185)' }}>흔한 실수 — </span>
                <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{d.mistakes.join(' · ')}</span>
              </div>
            </div>
          ))}

          {/* 도구 */}
          <h3 style={H3}>그리는 도구 — 편한 것부터</h3>
          <div className="grid grid-2" style={{ marginTop: 4 }}>
            {G.tools.map(([name, desc]) => (
              <div key={name} className="card">
                <div style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--gold)', marginBottom: 4 }}>{name}</div>
                <div style={{ fontSize: 13.5, color: 'var(--navy-700)', lineHeight: 1.65, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>{desc}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: 14 }}>
            <div className="box-h" style={{ marginBottom: 8 }}>Mermaid 예시 — 이 코드를 그대로 붙이면 위 순서도가 그려집니다</div>
            <pre style={{ margin: 0, padding: '14px 16px', background: 'var(--navy-50)', borderRadius: 8, overflowX: 'auto', fontSize: 12.5, lineHeight: 1.6, color: 'var(--navy-800)' }}><code>{G.mermaidExample}</code></pre>
          </div>

          {/* 공통 규칙 */}
          <h3 style={H3}>공통 규칙 5 — 어떤 그림이든 이것만</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {G.commonRules.map(([k, v], i) => (
              <div key={i} className="card" style={{ display: 'flex', gap: 12, alignItems: 'baseline', padding: '12px 16px' }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--gold)', whiteSpace: 'nowrap' }}>{i + 1}. {k}</span>
                <span style={{ fontSize: 13.5, color: 'var(--navy-700)', lineHeight: 1.6, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* 발표 배치 */}
          <h3 style={H3}>발표자료 3페이지에 이렇게 배치</h3>
          <div className="grid grid-3" style={{ marginTop: 4 }}>
            {G.placement.map(([page, what]) => (
              <div key={page} className="card">
                <div style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--navy-800)', marginBottom: 4 }}>{page}</div>
                <div style={{ fontSize: 13, color: 'var(--navy-700)', lineHeight: 1.6, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>{what}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
