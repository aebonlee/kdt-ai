// 실습교안 — 로그인 후 열람(정적 practice-textbook.html 을 전체 화면으로 임베드).
// 메뉴는 이 라우트를 거쳐 로그인 게이트를 통과한다.
export default function Textbook() {
  return (
    <iframe
      title="SKALA 4기 실습교안"
      src="/practice-textbook.html"
      style={{ display: 'block', width: '100%', height: 'calc(100vh - 110px)', border: 0 }}
    />
  )
}
