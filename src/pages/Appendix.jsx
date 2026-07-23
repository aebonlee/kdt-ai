import { useMemo, useState } from 'react'
import { glossary, glossaryIntro } from '../data/glossary'

// 한글 초성 추출 (ㄲ→ㄱ 등 된소리는 기본 자음으로 묶음)
const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
const CHO_BASE = { 'ㄲ': 'ㄱ', 'ㄸ': 'ㄷ', 'ㅃ': 'ㅂ', 'ㅆ': 'ㅅ', 'ㅉ': 'ㅈ' }
const KO_ORDER = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function getInitial(s) {
  const str = (s || '').trim()
  if (!str) return '#'
  const c = str.charCodeAt(0)
  if (c >= 0xac00 && c <= 0xd7a3) {
    const ch = CHO[Math.floor((c - 0xac00) / 588)]
    return CHO_BASE[ch] || ch
  }
  const u = str[0].toUpperCase()
  if (u >= 'A' && u <= 'Z') return u
  return '#'
}

export default function Appendix() {
  const [query, setQuery] = useState('')
  const [initial, setInitial] = useState(null)
  const [onlyImp, setOnlyImp] = useState(false)

  // 전체 용어 평탄화 + 이중 인덱스 계산 — "한글(영문)" 용어는 한글 초성과 영문 알파벳 양쪽에서 잡힌다
  const allTerms = useMemo(
    () =>
      glossary.flatMap((g) =>
        g.terms.map((t) => {
          const inis = new Set([getInitial(t.ko), getInitial(t.en)])
          // ko 표기 안의 괄호 영문(예: "맨해튼 거리(Manhattan Distance)")도 알파벳 인덱스로 인지
          const paren = (t.ko || '').match(/\(([A-Za-z])/)
          if (paren) inis.add(paren[1].toUpperCase())
          inis.delete('#')
          return { ...t, group: g.h, ini: getInitial(t.ko), inis: [...inis] }
        })
      ),
    []
  )
  const total = allTerms.length
  const impCount = allTerms.filter((t) => t.imp).length
  const presentInitials = useMemo(() => new Set(allTerms.flatMap((t) => t.inis)), [allTerms])

  const q = query.trim().toLowerCase()
  const filtering = q !== '' || initial !== null || onlyImp
  const matched = allTerms.filter((t) => {
    if (onlyImp && !t.imp) return false
    if (initial && !t.inis.includes(initial)) return false
    if (q && !(`${t.ko} ${t.en} ${t.def}`.toLowerCase().includes(q))) return false
    return true
  })

  const clearAll = () => {
    setQuery('')
    setInitial('')
    setInitial(null)
    setOnlyImp(false)
  }
  const jumpCategory = (h) => {
    clearAll()
    setTimeout(() => {
      const el = document.getElementById(`cat-${h}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 40)
  }

  const chip = (active) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 30,
    height: 30,
    padding: '0 6px',
    borderRadius: 8,
    border: '1px solid var(--line)',
    background: active ? 'var(--gold)' : 'var(--surface, #fff)',
    color: active ? '#1a1206' : 'var(--navy-700)',
    fontWeight: 700,
    fontSize: 13,
    cursor: 'pointer',
  })
  const chipDim = { ...chip(false), opacity: 0.32, cursor: 'default', pointerEvents: 'none' }

  const impBadge = (
    <span
      style={{
        marginLeft: 8,
        padding: '2px 8px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 800,
        background: 'var(--gold)',
        color: '#1a1206',
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
      }}
    >
      ★ 필수
    </span>
  )

  const TermCard = ({ t }) => (
    <div className="card" style={{ padding: 'var(--s-5, 16px)', borderLeft: t.imp ? '4px solid var(--gold)' : undefined }}>
      <div style={{ fontWeight: 800, color: 'var(--navy-800)', marginBottom: 4 }}>
        {t.ko}
        <span style={{ fontWeight: 600, color: 'var(--navy-500, #64748b)', marginLeft: 8, fontSize: 14 }}>
          ({t.en})
        </span>
        {t.imp && impBadge}
      </div>
      <div style={{ color: 'var(--ink-600, #475569)', lineHeight: 1.6 }}>{t.def}</div>
    </div>
  )

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Appendix</span>
          <h1>부록 · 용어사전</h1>
          <p>
            <span style={{ display: 'block' }}>{glossaryIntro}</span>
            <span style={{ display: 'block' }}>
              총 {glossary.length}개 분류 · {total}개 용어 · <b style={{ color: 'var(--gold)' }}>★ 필수 {impCount}개</b> (한글표기(영문) + 정의)
            </span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="appendix-layout">
            {/* 좌측 인덱스 */}
            <aside className="appendix-side">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="용어 검색 (한글·영문)"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--line)',
                  marginBottom: 12,
                  fontSize: 14,
                }}
              />

              <button
                type="button"
                onClick={() => { setInitial(null); setQuery(''); setOnlyImp((v) => !v) }}
                style={{
                  ...chip(onlyImp),
                  width: '100%',
                  height: 38,
                  marginBottom: 14,
                  fontSize: 14,
                }}
              >
                ★ 꼭 알아야 하는 것만 보기 ({impCount})
              </button>

              <div style={{ fontWeight: 800, fontSize: 12, color: 'var(--navy-500)', margin: '0 0 6px' }}>분류</div>
              <div style={{ display: 'grid', gap: 4, marginBottom: 16 }}>
                {glossary.map((g) => (
                  <button
                    key={g.h}
                    type="button"
                    onClick={() => jumpCategory(g.h)}
                    style={{
                      textAlign: 'left',
                      padding: '6px 8px',
                      borderRadius: 6,
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--navy-700)',
                      fontSize: 13.5,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {g.h}
                    <span style={{ color: 'var(--navy-400, #94a3b8)', marginLeft: 6, fontWeight: 500 }}>
                      {g.terms.length}
                    </span>
                  </button>
                ))}
              </div>

              <div style={{ fontWeight: 800, fontSize: 12, color: 'var(--navy-500)', margin: '0 0 6px' }}>ㄱ~ㅎ</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                {KO_ORDER.map((k) =>
                  presentInitials.has(k) ? (
                    <button key={k} type="button" style={chip(initial === k)} onClick={() => { setOnlyImp(false); setQuery(''); setInitial(initial === k ? null : k) }}>
                      {k}
                    </button>
                  ) : (
                    <span key={k} style={chipDim}>{k}</span>
                  )
                )}
              </div>

              <div style={{ fontWeight: 800, fontSize: 12, color: 'var(--navy-500)', margin: '0 0 6px' }}>A~Z</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {ALPHA.filter((a) => presentInitials.has(a)).map((a) => (
                  <button key={a} type="button" style={chip(initial === a)} onClick={() => { setOnlyImp(false); setQuery(''); setInitial(initial === a ? null : a) }}>
                    {a}
                  </button>
                ))}
              </div>
            </aside>

            {/* 본문 */}
            <div className="appendix-main">
              {filtering ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ fontWeight: 700, color: 'var(--navy-700)' }}>
                      {onlyImp ? '★ 필수 용어' : initial ? `초성 · ${initial}` : `검색 · "${query}"`}
                      <span style={{ color: 'var(--navy-400)', fontWeight: 500, marginLeft: 8 }}>{matched.length}개</span>
                    </div>
                    <button type="button" onClick={clearAll} style={chip(false)}>전체 보기</button>
                  </div>
                  {matched.length === 0 ? (
                    <div className="card" style={{ padding: 20, color: 'var(--navy-500)' }}>일치하는 용어가 없습니다.</div>
                  ) : (
                    <div style={{ display: 'grid', gap: 12 }}>
                      {matched.map((t) => <TermCard key={t.en} t={t} />)}
                    </div>
                  )}
                </>
              ) : (
                glossary.map((group) => (
                  <div key={group.h} id={`cat-${group.h}`} style={{ marginBottom: 'var(--s-8, 32px)', scrollMarginTop: 84 }}>
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
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy-400)', marginLeft: 8 }}>
                        {group.terms.length}개 · 필수 {group.terms.filter((t) => t.imp).length}
                      </span>
                    </h2>
                    <div style={{ display: 'grid', gap: 12 }}>
                      {group.terms.map((t) => <TermCard key={t.en} t={t} />)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
