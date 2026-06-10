// 코드 블록 — 주석을 녹색으로 표기.
// 언어별 라인 주석 토큰을 감지해 주석 부분만 .cmt(녹색)로 감싼다.
// URL의 '//'(앞이 ':') 같은 오탐을 피하려고 토큰 앞이 공백/줄머리일 때만 주석으로 본다.

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

export default function CodeBlock({ code, lang }) {
  const lines = String(code).split('\n')
  return (
    <pre className="codeblock">
      <code>
        {lines.map((ln, i) => (
          <span key={i}>
            {segments(ln, lang).map((s, j) =>
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
  )
}
