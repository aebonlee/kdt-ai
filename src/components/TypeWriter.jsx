import { useEffect, useState } from 'react'

// 히어로 핵심 키워드 타이핑 효과 — 디자인 원본(rest06)의 로테이터를
// IDE 톤에 맞게 글자 단위 타이핑/삭제로 재구현. 커서 바는 CSS(tw-caret)가 깜빡인다.
// prefers-reduced-motion이면 애니메이션 없이 첫 단어를 그대로 보여준다(§ 화면 정지 사고 예방).
const TYPE_MS = 85 // 한 글자 입력 간격
const ERASE_MS = 42 // 한 글자 삭제 간격
const HOLD_MS = 2100 // 단어 완성 후 대기
const GAP_MS = 380 // 삭제 완료 후 다음 단어까지 대기

export default function TypeWriter({ words }) {
  const [reduced] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  )
  const [wi, setWi] = useState(0) // 단어 인덱스
  const [len, setLen] = useState(0) // 표시 글자 수
  const [erasing, setErasing] = useState(false)

  useEffect(() => {
    if (reduced) return undefined
    const word = words[wi]
    let t
    if (!erasing) {
      if (len < word.length) t = setTimeout(() => setLen(len + 1), TYPE_MS)
      else t = setTimeout(() => setErasing(true), HOLD_MS)
    } else if (len > 0) {
      t = setTimeout(() => setLen(len - 1), ERASE_MS)
    } else {
      t = setTimeout(() => {
        setErasing(false)
        setWi((wi + 1) % words.length)
      }, GAP_MS)
    }
    return () => clearTimeout(t)
  }, [reduced, words, wi, len, erasing])

  const text = reduced ? words[0] : words[wi].slice(0, len)
  return (
    <span className="tw-wrap">
      <span className="tw-text">{text || ' '}</span>
      {!reduced && <span className="tw-caret" aria-hidden="true" />}
    </span>
  )
}
