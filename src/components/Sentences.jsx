// 문장 단위 줄바꿈 헬퍼.
// 마침표(.) 뒤에 공백이 오는 지점을 "문장 끝"으로 보고 줄바꿈한다.
// → Vue.js, 2026.07.14, 09:00, data.dreamitbiz.com 등은 분리되지 않음.
export function splitSentences(text) {
  return String(text)
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export default function Sentences({ text, children }) {
  const lines = splitSentences(text ?? children ?? '')
  return lines.map((line, i) => (
    <span key={i} style={{ display: 'block' }}>
      {line}
    </span>
  ))
}
