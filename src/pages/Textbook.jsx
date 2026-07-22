// 실습교안 — 로그인 후 열람(정적 practice-textbook.html 을 전체 화면으로 임베드).
// 메뉴는 이 라우트를 거쳐 로그인 게이트를 통과한다.
// 캐시버스터 v: 실습교안(정적 HTML)이 바뀌면 이 값을 올려 iframe이 예전 캐시본을
//   붙들지 않게 한다. (2026-07-22: 좌측 네비 JS 수정 반영)
const TEXTBOOK_V = '20260722-2'

export default function Textbook() {
  return (
    <iframe
      title="SKALA 4기 실습교안"
      src={`/practice-textbook.html?v=${TEXTBOOK_V}`}
      style={{ display: 'block', width: '100%', height: 'calc(100vh - 110px)', border: 0 }}
    />
  )
}
