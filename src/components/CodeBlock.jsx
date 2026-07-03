// 코드 블록 — 주석을 녹색으로 표기 + 복사 버튼.
// 언어별 라인 주석 토큰을 감지해 주석 부분만 .cmt(녹색)로 감싼다.
// URL의 '//'(앞이 ':') 같은 오탐을 피하려고 토큰 앞이 공백/줄머리일 때만 주석으로 본다.
import { useState, useMemo, memo } from 'react'

const LINE_TOKEN = {
  python: '#',
  bash: '#',
  sh: '#',
  yaml: '#',
  yml: '#',
  docker: '#',
  dockerfile: '#',
  javascript: '//',
  js: '//',
  ts: '//',
  java: '//',
  c: '//',
  cpp: '//',
  sql: '--',
}

function segments(line, lang) {
  // HTML/Vue 블록 주석 <!-- ... -->
  if (lang === 'html' || lang === 'vue' || lang === 'xml') {
    const a = line.indexOf('<!--')
    if (a !== -1) return [{ t: line.slice(0, a) }, { t: line.slice(a), c: true }]
    return [{ t: line }]
  }
  const tok = LINE_TOKEN[lang]
  if (!tok) return [{ t: line }]
  for (let i = 0; i < line.length; i++) {
    if (line.startsWith(tok, i)) {
      const before = i === 0 ? '' : line[i - 1]
      if (i === 0 || before === ' ' || before === '\t') {
        return [{ t: line.slice(0, i) }, { t: line.slice(i), c: true }]
      }
    }
  }
  return [{ t: line }]
}

function CodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false)
  // 라인 분할 + 주석 토큰화를 캐시 — 월탭 전환 등 본문 무관 재렌더 시 재계산 방지
  const tokenized = useMemo(
    () => String(code).split('\n').map((ln) => segments(ln, lang)),
    [code, lang],
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(String(code))
    } catch {
      // 폴백: 임시 textarea
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
          {tokenized.map((segs, i) => (
            <span key={i}>
              {segs.map((s, j) =>
                s.c ? (
                  <span key={j} className="cmt">
                    {s.t}
                  </span>
                ) : (
                  <span key={j}>{s.t}</span>
                ),
              )}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

export default memo(CodeBlock)
