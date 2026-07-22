// 🧩 실습교수 보충자료 — origin:'practice' 카드를 과목/과정 말미에 따로 묶어 조판한다.
// 실습교수(반별 투입 강사)가 배포한 자료를 주강사 교안과 분리 표기하기 위함.
// scripts/build-textbook.mjs 의 renderPracticeSupplement 와 동일 구성(제목·출처 한 줄·개념·따라하기 실습).
// 실습교안(Textbook·EtcCourse)에서만 쓰고 학습강의안(/lectures)에서는 쓰지 않는다 —
// 실습교안이 강의안 대비 갖는 '추가 요소'다.
import Rich from './Rich'
import CodeBlock from './CodeBlock'

export default function PracticeSupplement({ concepts = [], examples = [] }) {
  if (!concepts.length && !examples.length) return null
  // source 는 대표가 인용 관계를 되짚기 위한 관리자용 메타정보(§Dev_md 53). 소절 머리에 한 줄로만 노출.
  const sources = [...new Set([...concepts, ...examples].map((x) => x.source).filter(Boolean))]

  return (
    <div style={{ marginTop: 28 }}>
      <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '0 0 4px', paddingTop: 14, borderTop: '1px solid var(--line)' }}>
        🧩 실습교수 보충자료
      </h3>
      {sources.length > 0 && (
        <p style={{ margin: '2px 0 14px', fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.6, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
          출처 — {sources.join(' / ')}
        </p>
      )}

      {concepts.length > 0 && (
        <div className="grid grid-2" style={{ marginTop: 4, marginBottom: examples.length ? 18 : 0 }}>
          {concepts.map((k, i) => (
            <dl key={i} className="concept">
              <dt>{k.term}</dt>
              <dd style={{ whiteSpace: 'pre-line' }}><Rich text={k.desc} /></dd>
            </dl>
          ))}
        </div>
      )}

      {examples.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {examples.map((ex, i) => (
            <div key={i}>
              <div className="box-h" style={{ marginBottom: 8 }}>
                {ex.title} <span style={{ fontWeight: 600, color: 'var(--ink-soft)', fontSize: 12 }}>({ex.lang})</span>
              </div>
              {ex.files?.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '2px 0 8px' }}>
                  {ex.files.map((f2) => (
                    <a key={f2.href} href={f2.href} download className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: 12.5 }}>⬇ {f2.label}</a>
                  ))}
                </div>
              )}
              <CodeBlock code={ex.code} lang={ex.lang} />
              {ex.note && (
                <p style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>💡 <Rich text={ex.note} /></p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
