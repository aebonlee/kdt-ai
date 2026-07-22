// 코드 블록 — 줄번호 + 경량 구문 강조(함수/변수/키워드/문자열/숫자/주석) + 복사 버튼.
// 외부 하이라이터 없이 라인 단위로 토큰화한다(번들 경량 유지).
// 문자열은 한 줄 기준으로만 처리(대부분 예제가 한 줄 문자열이라 충분).
import { useState, useMemo, memo } from 'react'

// 언어별 라인 주석 토큰
const LINE_TOKEN = {
  python: '#', bash: '#', sh: '#', yaml: '#', yml: '#', docker: '#', dockerfile: '#',
  javascript: '//', js: '//', ts: '//', java: '//', c: '//', cpp: '//', sql: '--',
}

// 키워드(파이썬 + JS/TS 합집합 — 예제 대부분이 이 둘)
const KEYWORDS = new Set([
  // python
  'import', 'from', 'as', 'def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while',
  'break', 'continue', 'in', 'not', 'and', 'or', 'is', 'None', 'True', 'False', 'with',
  'try', 'except', 'finally', 'raise', 'lambda', 'yield', 'global', 'nonlocal', 'pass',
  'assert', 'del', 'async', 'await',
  // js/ts
  'const', 'let', 'var', 'function', 'export', 'default', 'new', 'this', 'typeof',
  'instanceof', 'of', 'catch', 'throw', 'switch', 'case', 'null', 'undefined', 'true',
  'false', 'void', 'delete', 'extends', 'super', 'static',
])

const isIdStart = (ch) => /[A-Za-z_$]/.test(ch)
const isId = (ch) => /[A-Za-z0-9_$]/.test(ch)

// 코드 조각(주석 제외)을 토큰 배열로 스캔
function scanCode(text) {
  const out = []
  let i = 0
  const n = text.length
  const push = (t, cls) => { if (t) out.push(cls ? { t, cls } : { t }) }
  while (i < n) {
    const ch = text[i]
    // 문자열 ' " `
    if (ch === '"' || ch === "'" || ch === '`') {
      let j = i + 1
      while (j < n && text[j] !== ch) { if (text[j] === '\\') j++; j++ }
      push(text.slice(i, Math.min(j + 1, n)), 'str')
      i = j + 1
      continue
    }
    // 숫자
    if (ch >= '0' && ch <= '9') {
      let j = i + 1
      while (j < n && /[0-9._a-fA-FxX]/.test(text[j])) j++
      push(text.slice(i, j), 'num')
      i = j
      continue
    }
    // 식별자 → 키워드 / 함수 / 변수
    if (isIdStart(ch)) {
      let j = i + 1
      while (j < n && isId(text[j])) j++
      const word = text.slice(i, j)
      let k = j
      while (k < n && (text[k] === ' ' || text[k] === '\t')) k++
      let cls = 'var'
      if (KEYWORDS.has(word)) cls = 'kw'
      else if (text[k] === '(') cls = 'fn'
      push(word, cls)
      i = j
      continue
    }
    // 그 외(공백·연산자·구두점) 묶음
    let j = i + 1
    while (j < n) {
      const c = text[j]
      if (c === '"' || c === "'" || c === '`' || isIdStart(c) || (c >= '0' && c <= '9')) break
      j++
    }
    push(text.slice(i, j))
    i = j
  }
  return out
}

// 한 줄 → 토큰 배열(주석 분리 후 코드부 스캔)
function tokenizeLine(line, lang) {
  // HTML/Vue/XML 블록 주석
  if (lang === 'html' || lang === 'vue' || lang === 'xml') {
    const a = line.indexOf('<!--')
    if (a !== -1) return [...scanCode(line.slice(0, a)), { t: line.slice(a), cls: 'cmt' }]
    return scanCode(line)
  }
  const tok = LINE_TOKEN[lang]
  if (tok) {
    for (let i = 0; i < line.length; i++) {
      if (line.startsWith(tok, i)) {
        const before = i === 0 ? '' : line[i - 1]
        // URL의 '//'(앞이 ':') 등 오탐 방지 — 줄머리/공백 뒤일 때만 주석
        if (i === 0 || before === ' ' || before === '\t') {
          return [...scanCode(line.slice(0, i)), { t: line.slice(i), cls: 'cmt' }]
        }
      }
    }
  }
  return scanCode(line)
}

const CLS_NAME = { kw: 'tok-kw', fn: 'tok-fn', var: 'tok-var', str: 'tok-str', num: 'tok-num', cmt: 'cmt' }

function CodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false)
  // 라인 분할 + 토큰화 캐시 — 본문 무관 재렌더 시 재계산 방지
  const lines = useMemo(
    () => String(code).split('\n').map((ln) => tokenizeLine(ln, lang)),
    [code, lang],
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(String(code))
    } catch {
      const ta = document.createElement('textarea')
      ta.value = String(code)
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="codewrap">
      <button className="code-copy" onClick={copy} aria-label="코드 복사">
        {copied ? '✓ 복사됨' : '📋 복사'}
      </button>
      <pre className="codeblock">
        <code>
          {lines.map((toks, i) => (
            <span className="cline" key={i}>
              <span className="ln" aria-hidden="true">{i + 1}</span>
              <span className="lc">
                {toks.map((s, j) =>
                  s.cls ? (
                    <span key={j} className={CLS_NAME[s.cls]}>{s.t}</span>
                  ) : (
                    <span key={j}>{s.t}</span>
                  ),
                )}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

export default memo(CodeBlock)
