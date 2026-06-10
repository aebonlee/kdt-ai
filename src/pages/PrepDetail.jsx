import { useParams, useNavigate, Link } from 'react-router-dom'
import { prepTopics, prepById } from '../data/resources'
import { deepFor } from '../data/prepdeep'
import CodeBlock from '../components/CodeBlock'

function Bullets({ items }) {
  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((it, i) => (
        <li key={i} style={{ position: 'relative', paddingLeft: 16, fontSize: 14, color: 'var(--navy-700)' }}>
          <span style={{ position: 'absolute', left: 2, top: 9, width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
          {it}
        </li>
      ))}
    </ul>
  )
}

export default function PrepDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const t = prepById(id)
  const d = deepFor(id)

  if (!t) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p>주제를 찾을 수 없습니다.</p>
          <Link to="/prep" className="back-link">← 선수학습자료</Link>
        </div>
      </section>
    )
  }

  const idx = prepTopics.findIndex((x) => x.id === id)
  const prev = idx > 0 ? prepTopics[idx - 1] : null
  const next = idx < prepTopics.length - 1 ? prepTopics[idx + 1] : null

  // 좌측 네비는 "현재 분류"의 주제만 (본문보다 길어지지 않게)
  const siblings = prepTopics.filter((x) => x.tag === t.tag)

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Prerequisites · {t.tag}</span>
          <h1>{t.name}</h1>
          <p>{t.desc}</p>
        </div>
      </div>

      <section className="section">
        <div className="container layout-side">
          {/* 좌측: 현재 분류의 주제만 */}
          <nav className="side-nav" aria-label="선수학습 주제">
            <p className="side-nav-title">{t.tag}</p>
            {siblings.map((x) => (
              <button
                key={x.id}
                className={`side-link${x.id === id ? ' active' : ''}`}
                onClick={() => navigate(`/prep/${x.id}`)}
                aria-current={x.id === id ? 'true' : undefined}
              >
                {x.name}
              </button>
            ))}
            <Link to="/prep" className="side-link" style={{ marginTop: 8, color: 'var(--gold)', fontWeight: 700 }}>
              ← 전체 분류 보기
            </Link>
          </nav>

          {/* 본문 */}
          <div>
            <Link to="/prep" className="back-link">← 선수학습자료</Link>

            {/* 전문 개요 */}
            {d?.overview && (
              <div className="box box-tips" style={{ marginBottom: 8 }}>
                <p style={{ fontSize: 14.5, color: 'var(--navy-700)', lineHeight: 1.85 }}>{d.overview}</p>
              </div>
            )}

            {/* 핵심 개념 */}
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>핵심 개념</h3>
            <div className="grid grid-2" style={{ marginTop: 12 }}>
              {t.sections.map((sec) => (
                <div key={sec.h} className="card">
                  <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--gold)', marginBottom: 8 }}>{sec.h}</h4>
                  <Bullets items={sec.items} />
                </div>
              ))}
            </div>

            {/* 심화 세부 항목 */}
            {d?.advanced?.length > 0 && (
              <>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>심화 세부 항목</h3>
                <div className="grid grid-2" style={{ marginTop: 12 }}>
                  {d.advanced.map((sec) => (
                    <div key={sec.h} className="card">
                      <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--azure)', marginBottom: 8 }}>{sec.h}</h4>
                      <Bullets items={sec.items} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 실습 + 팁 */}
            <div className="grid grid-2" style={{ marginTop: 16 }}>
              <div className="box box-practice">
                <div className="box-h">🧪 실습 과제</div>
                <ol>{t.practice.map((p, i) => <li key={i}>{p}</li>)}</ol>
              </div>
              <div className="box box-tips">
                <div className="box-h">💡 팁</div>
                <ul>{t.tips.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
            </div>

            {/* 코드 예시 (기본 + 심화) */}
            {(t.snippet || d?.examples?.length > 0) && (
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>💻 코드 예시</h3>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 12 }}>
              {t.snippet && (
                <div>
                  <div className="box-h" style={{ marginBottom: 8 }}>
                    기본 <span style={{ fontWeight: 600, color: 'var(--ink-soft)', fontSize: 12 }}>({t.snippet.lang})</span>
                  </div>
                  <CodeBlock code={t.snippet.code} lang={t.snippet.lang} />
                </div>
              )}
              {(d?.examples || []).map((ex, i) => (
                <div key={i}>
                  <div className="box-h" style={{ marginBottom: 8 }}>
                    {ex.title} <span style={{ fontWeight: 600, color: 'var(--ink-soft)', fontSize: 12 }}>({ex.lang})</span>
                  </div>
                  <CodeBlock code={ex.code} lang={ex.lang} />
                  {ex.note && (
                    <p style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.7 }}>💡 {ex.note}</p>
                  )}
                </div>
              ))}
            </div>

            {/* 자주 하는 실수 + 체크리스트 */}
            <div className="grid grid-2" style={{ marginTop: 16 }}>
              {d?.pitfalls?.length > 0 && (
                <div className="box box-tips">
                  <div className="box-h">⚠️ 자주 하는 실수</div>
                  <ul>{d.pitfalls.map((p, i) => <li key={i}>{p}</li>)}</ul>
                </div>
              )}
              {d?.checklist?.length > 0 && (
                <div className="box box-practice">
                  <div className="box-h">✅ 체크리스트</div>
                  <ul>{d.checklist.map((p, i) => <li key={i}>{p}</li>)}</ul>
                </div>
              )}
            </div>

            {/* 공식 링크 */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
              {t.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: 13, padding: '9px 16px' }}>
                  {l.label} ↗
                </a>
              ))}
            </div>

            {/* 이전/다음 */}
            <div className="detail-nav" style={{ marginTop: 28 }}>
              {prev ? (
                <Link to={`/prep/${prev.id}`}>
                  <div className="lbl">← 이전</div>
                  <div className="nm">{prev.name}</div>
                </Link>
              ) : <span style={{ flex: 1 }} />}
              {next ? (
                <Link to={`/prep/${next.id}`} style={{ textAlign: 'right' }}>
                  <div className="lbl">다음 →</div>
                  <div className="nm">{next.name}</div>
                </Link>
              ) : <span style={{ flex: 1 }} />}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
