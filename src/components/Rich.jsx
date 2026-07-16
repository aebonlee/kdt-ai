// 강의안 본문 강조 렌더러 — 중요 내용을 형광펜·굵은 글씨·밑줄로 표시한다.
// · 명시 마커: **굵게**, ==형광펜==, __밑줄__ (강의안 데이터에 직접 쓸 수 있음)
// · 자동 강조: "용어 — 설명" / "용어: 설명" 꼴의 머리말은 굵게, 필수·주의·금지 등 신호어는 형광펜
import { Fragment } from 'react'

const MARKER = /(\*\*[^*\n]+\*\*|==[^=\n]+==|__[^_\n]+__)/
const SIGNAL = /(반드시|필수|주의(?:하세요)?|금지|중요|핵심|권장|절대|예외 없이|틀리기 쉬운)/
// 머리말 판별 — 26자 이내, 한글·영문 포함, URL·시각 표기가 아닐 것
const HEAD = /^([^:—\n]{2,26}?)( — |: )(.+)$/

// 신호어 형광펜 — 일반 텍스트 조각에 적용
function signal(text, keyBase) {
  const segs = String(text).split(new RegExp(SIGNAL.source, 'g'))
  return segs.map((seg, j) => (j % 2 ? <mark key={`${keyBase}-s${j}`} className="hl">{seg}</mark> : seg))
}

// 한 줄 렌더 — 마커 우선, 없으면 머리말 굵게 + 신호어
function line(text, keyBase) {
  if (MARKER.test(text)) {
    const parts = String(text).split(new RegExp(MARKER.source, 'g'))
    return parts.map((p, i) => {
      if (/^\*\*[^*]+\*\*$/.test(p)) return <b key={`${keyBase}-${i}`} className="rich-b">{p.slice(2, -2)}</b>
      if (/^==[^=]+==$/.test(p)) return <mark key={`${keyBase}-${i}`} className="hl">{p.slice(2, -2)}</mark>
      if (/^__[^_]+__$/.test(p)) return <u key={`${keyBase}-${i}`} className="rich-u">{p.slice(2, -2)}</u>
      return <Fragment key={`${keyBase}-${i}`}>{signal(p, `${keyBase}-${i}`)}</Fragment>
    })
  }
  const m = text.match(HEAD)
  if (m && /[가-힣A-Za-z]/.test(m[1]) && !/https?:|www\./.test(m[1])) {
    return (
      <Fragment key={keyBase}>
        <b className="rich-b">{m[1]}</b>
        {m[2]}
        {signal(m[3], keyBase)}
      </Fragment>
    )
  }
  return signal(text, keyBase)
}

export default function Rich({ text }) {
  const lines = String(text ?? '').split('\n')
  if (lines.length === 1) return <>{line(lines[0], 'l0')}</>
  return lines.map((ln, i) => (
    <span key={i} style={{ display: 'block' }}>{line(ln, `l${i}`)}</span>
  ))
}
