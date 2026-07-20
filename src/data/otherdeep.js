// 담당일정 외 과목 심화(핵심개념+따라하기 실습) — 3·4기 상세 교재 근거, 우리말 재서술(전 라인 한글 주석).
// scripts/merge-otherdeep.mjs 가 scratchpad/etc_enrich/enrich_*.mjs 를 병합 생성.
export const otherDeep = {
  "htmlcss": {
    "concepts": [
      {
        "term": "Block vs Inline 요소",
        "desc": "Block 요소(div, p, h1 등)는 한 줄을 통째로 차지하고 새 줄에서 시작하지만, Inline 요소(span, a, img 등)는 글자처럼 흐름 속에 끼어들어 폭·높이 지정이 무시된다. div는 구획을 나누는 대표 Block 컨테이너, span은 텍스트 일부를 감싸는 대표 Inline 컨테이너다."
      },
      {
        "term": "CSS Box Model",
        "desc": "모든 HTML 요소는 안쪽부터 Content(실제 내용) → Padding(내용과 테두리 사이 여백) → Border(테두리) → Margin(다른 요소와의 간격) 네 겹의 상자로 감싸져 있다. 브라우저 개발자도구의 Elements > Computed 탭에서 이 상자를 눈으로 확인하며 여백 문제를 잡는다."
      },
      {
        "term": "Specificity(명시도)",
        "desc": "같은 요소에 여러 CSS 규칙이 겹칠 때 어떤 스타일이 이기는지 정하는 점수 체계로, 인라인 스타일 > id 선택자 > 클래스 선택자 > 태그 선택자 순으로 강하다. 높은 자릿수가 무조건 승리해서 클래스 1개가 태그 15개보다 세고, !important 남용은 디버깅을 어렵게 하므로 피한다."
      },
      {
        "term": "Flexbox",
        "desc": "부모에 display: flex 한 줄만 주면 자식들이 가로(row) 또는 세로(column)로 유연하게 정렬되는 레이아웃 방식이다. justify-content로 주축 정렬, align-items로 교차축 정렬을 조절하며, 보통 페이지 전체 뼈대는 Grid, 내부 요소 정렬은 Flexbox를 쓴다."
      },
      {
        "term": "DOM(Document Object Model)",
        "desc": "브라우저가 HTML 문서를 트리 구조의 객체로 바꿔 놓은 것으로, JavaScript가 document.getElementById() 같은 메서드로 요소를 찾아 내용·구조·스타일을 실시간으로 바꿀 수 있게 해 준다. 화면이 동적으로 변하는 모든 웹 앱의 출발점이다."
      },
      {
        "term": "이벤트 리스너와 비동기(async/await)",
        "desc": "클릭·입력 같은 사용자 행동은 addEventListener()로 감지하는 방식이 권장되며, HTML 속성(onclick)이나 DOM 프로퍼티 방식보다 여러 핸들러 등록과 유지보수에 유리하다. 서버 통신처럼 오래 걸리는 일은 fetch()와 async/await로 기다리는 동안 다른 작업을 막지 않게 처리한다."
      },
      {
        "term": "시맨틱 태그(Semantic Elements)",
        "desc": "div와 span은 아무 의미 없는 상자지만, header·nav·main·section·article·aside·footer는 태그 이름 자체가 그 영역의 역할을 설명하는 시맨틱 태그다. 코드 구조가 한눈에 읽히고(가독성), 스크린 리더 같은 보조 기술이 화면 구조를 정확히 파악하며(접근성), 검색 엔진이 핵심 콘텐츠를 효율적으로 찾는다(SEO). 이미지·도표에는 figure와 figcaption을 짝지어 설명을 붙인다."
      },
      {
        "term": "CSS Position 5가지와 z-index",
        "desc": "position은 요소의 배치 유형을 정한다 — static(기본값, top·left 무시), relative(원래 자리 기준으로 이동하되 원래 공간은 유지), absolute(문서 흐름에서 빠져 가장 가까운 position 지정 조상 기준으로 배치), fixed(뷰포트 기준이라 스크롤해도 고정), sticky(스크롤에 따라 relative와 fixed 사이를 전환 — 상단 고정 헤더의 단골). 요소가 겹칠 때 위아래 순서는 z-index 숫자가 큰 쪽이 위로 온다."
      },
      {
        "term": "CSS Grid — 2차원 레이아웃",
        "desc": "Flexbox가 한 방향(1차원)만 다룬다면 Grid는 행과 열을 동시에 다루는 2차원 레이아웃이다. 부모에 display: grid를 선언하고 grid-template-columns/rows로 트랙을 나누며, 배치 기준은 칸(셀)의 개수가 아니라 칸을 나누는 선(Grid Line)의 번호다. 실무 관례는 페이지 전체 뼈대는 Grid, 내부 요소 정렬은 Flexbox로 나눠 쓰는 것이다."
      },
      {
        "term": "Transition과 @keyframes 애니메이션",
        "desc": "transition은 속성값이 바뀔 때 그 변화를 지정한 시간 동안 부드럽게 이어 주는 기능으로, property·duration·timing-function·delay 네 속성을 transition: width 2s linear 1s처럼 한 줄 축약형으로 쓴다. 보통 :hover와 짝지어 마우스를 올리면 서서히 커지는 효과를 만든다. 더 복잡한 다단계 움직임은 @keyframes로 장면(0%, 50%, 100%)을 정의하고 animation-name·duration·iteration-count 속성으로 재생한다."
      },
      {
        "term": "반응형 웹 — Viewport 메타태그와 미디어 쿼리",
        "desc": "반응형 웹은 하나의 HTML 소스로 PC·태블릿·스마트폰 화면 크기에 맞춰 레이아웃이 자동으로 바뀌게 하는 방식으로, 핵심 기술은 Viewport 메타태그·미디어 쿼리·유연한 레이아웃(Grid·Flex) 셋이다. head 안에 meta name=viewport, content=width=device-width, initial-scale=1.0을 넣지 않으면 반응형이 아예 동작하지 않는다. 레이아웃이 바뀌는 기준점을 브레이크포인트라 하며 교재는 767px 이하 모바일, 768~1023px 태블릿, 1024px 이상 데스크톱 구간을 예시로 든다."
      },
      {
        "term": "var·let·const와 스코프",
        "desc": "let과 const는 ES6에서 도입된 선언 방식으로 중괄호 블록 안에서만 살아 있는 블록 스코프를 가지며, 같은 스코프에서 재선언할 수 없다. const는 재할당까지 금지라 기본은 const로 선언하고 값이 바뀌는 변수만 let을 쓴다. var는 함수 스코프에 호이스팅 시 초기화까지 되어 선언 전에 접근해도 오류가 안 나는 함정이 있어 현대 JavaScript에서는 권장하지 않는다."
      },
      {
        "term": "브라우저 렌더링 4단계",
        "desc": "브라우저는 서버에서 받은 HTML을 네 단계로 화면에 그린다 — ① 파싱: HTML을 읽어 DOM 트리를, CSS를 읽어 CSSOM을 만든다 ② 렌더 트리: DOM과 CSSOM을 합쳐 실제로 화면에 그릴 요소만 추린다 ③ 레이아웃: 각 요소의 위치와 크기(박스)를 계산한다 ④ 페인트: 색·글자·테두리 같은 픽셀을 실제로 칠한다. HTML을 쓴 순서와 구조가 그대로 화면 구조가 되고, script 태그는 파싱을 멈춰 세우므로 보통 body 닫는 태그 직전에 두거나 defer를 붙인다. 2일 과정에서 배우는 HTML(구조)·CSS(표현)·JS(동작)는 이 렌더링 과정에 그대로 대응한다."
      },
      {
        "term": "URL의 6가지 구성 요소",
        "desc": "URL은 웹 자원의 위치를 가리키는 주소이며 스킴·호스트·포트·경로·쿼리·프래그먼트로 나뉜다. 스킴은 사용할 프로토콜(http, https, file), 호스트는 서버의 도메인 이름 또는 IP, 포트는 서버 포트 번호(http는 80, https는 443이 기본이라 보통 생략), 경로는 서버 안에서 자원이 놓인 위치, 쿼리는 물음표 뒤에 key=value 형태로 붙는 추가 정보, 프래그먼트는 샵 기호 뒤에 붙어 문서 안의 특정 위치를 가리킨다. 도메인 이름은 DNS를 거쳐 실제 IP 주소로 바뀐 뒤 접속이 이뤄진다."
      },
      {
        "term": "Promise 3상태와 async/await",
        "desc": "Promise는 비동기 작업이 성공하거나 실패할 때 결과를 알려주겠다고 약속하는 객체로, 대기(Pending)·이행(Fulfilled)·거부(Rejected) 세 상태를 가진다. async를 함수 앞에 붙이면 그 함수는 항상 Promise를 반환하고, await는 async 함수 안에서만 쓰여 Promise가 처리될 때까지 잠시 멈춘다. 실패는 try/catch로 잡아 화면에 대체 문구를 띄운다. 함정 하나 — fetch는 404 응답도 통신 자체는 성공으로 보기 때문에 반드시 response.ok로 HTTP 상태를 따로 확인해야 한다."
      },
      {
        "term": "이벤트 버블링·캡처링과 이벤트 위임",
        "desc": "버블링은 이벤트가 자식에서 부모 방향으로 퍼지는 기본 동작이고, 캡처링은 반대로 부모에서 자식 방향이며 addEventListener의 세 번째 인자를 true로 주면 쓴다. 이 성질을 이용해 자식마다 리스너를 다는 대신 부모에 리스너 하나만 걸고 event.target으로 대상을 판별하는 방식이 이벤트 위임이다. event.target.closest('.item')은 자신을 포함해 가장 가까운 조상 중 일치하는 요소를, event.target.matches('.btn')은 그 요소가 선택자와 맞는지를 알려 준다. 목록 항목이 100개여도 리스너는 목록 하나면 충분하고, 렌더링으로 새로 만들어진 요소도 다시 등록할 필요 없이 그대로 동작한다."
      },
      {
        "term": "localStorage와 상태 기반 렌더링",
        "desc": "localStorage는 브라우저에 데이터를 영구 저장하는 빌트인 객체로 setItem(key, value)·getItem(key)·removeItem(key)·clear()를 쓴다. 문자열만 저장되므로 객체나 배열은 JSON.stringify로 넣고 JSON.parse로 꺼낸다. 여기서 더 중요한 원칙은 상태 기반 렌더링이다 — 화면은 항상 상태(예: goals 배열)를 그린 결과여야 하며, DOM을 직접 고쳐서 화면만 바꾸면 상태와 화면이 어긋난다. 상태를 바꾼 직후 save()와 render()를 호출하는 순서를 습관으로 굳히면 새로고침 시 목록이 사라지는 사고가 사라진다."
      }
    ],
    "examples": [
      {
        "title": "회원가입 폼 — Form 요소와 Input 타입",
        "lang": "html",
        "code": "<!-- form: 사용자 입력을 모아 서버로 보내는 컨테이너 -->\n<form action=\"/signup\" method=\"post\">\n  <!-- label의 for와 input의 id를 맞추면 라벨 클릭 시 입력칸에 포커스 -->\n  <label for=\"userId\">아이디</label>\n  <!-- required: 비우면 제출 불가, placeholder: 흐린 안내 문구 -->\n  <input type=\"text\" id=\"userId\" name=\"userId\" placeholder=\"영문 4자 이상\" required>\n\n  <!-- type=\"password\": 입력 글자를 점으로 가려 준다 -->\n  <label for=\"pw\">비밀번호</label>\n  <input type=\"password\" id=\"pw\" name=\"pw\" required>\n\n  <!-- type=\"email\": 브라우저가 이메일 형식을 자동 검사 -->\n  <label for=\"email\">이메일</label>\n  <input type=\"email\" id=\"email\" name=\"email\">\n\n  <!-- select: 여러 항목 중 하나를 고르는 드롭다운 -->\n  <label for=\"emailDomain\">도메인</label>\n  <select id=\"emailDomain\" name=\"emailDomain\">\n    <option value=\"gmail.com\">gmail.com</option>\n    <option value=\"naver.com\">naver.com</option>\n  </select>\n\n  <!-- radio: name이 같은 것끼리 한 개만 선택된다 -->\n  <input type=\"radio\" id=\"male\" name=\"gender\" value=\"m\"> <label for=\"male\">남</label>\n  <input type=\"radio\" id=\"female\" name=\"gender\" value=\"f\"> <label for=\"female\">여</label>\n\n  <!-- type=\"submit\": 누르면 form의 action 주소로 데이터 전송 -->\n  <button type=\"submit\">가입하기</button>\n</form>",
        "note": "교재 3장 Form 단원의 회원가입 화면 실습을 압축한 코드로, name 속성이 서버로 전송되는 데이터의 key가 된다. Vue에서는 이 입력들을 v-model로 데이터에 바로 묶고 @submit.prevent로 새로고침 없이 처리하게 되므로, 여기서 input 타입과 name·required의 역할을 확실히 잡아 두면 폼 컴포넌트 작성이 쉬워진다."
      },
      {
        "title": "카드 정렬 — Box Model + Specificity + Flexbox",
        "lang": "css",
        "code": "/* 태그 선택자(점수 1): 모든 div 카드의 기본 상자 설정 */\ndiv.card {\n  width: 200px;              /* 콘텐츠 영역 너비 (padding·border는 별도) */\n  padding: 16px;             /* 내용과 테두리 사이 안쪽 여백 */\n  border: 2px solid navy;    /* 두께·스타일·색을 한 줄로 쓰는 축약형 */\n  margin: 10px;              /* 카드와 카드 사이 바깥 간격 */\n}\n\n/* 클래스 선택자(점수 10): 위 태그 규칙보다 명시도가 높아 색이 이긴다 */\n.highlight {\n  border-color: crimson;     /* 강조 카드만 테두리를 붉게 덮어쓴다 */\n  background: #fff0f0;       /* 배경도 살짝 붉은 톤으로 변경 */\n}\n\n/* id 선택자(점수 100): 클래스보다도 강해 이 카드 하나만 확실히 승리 */\n#best {\n  border-width: 4px;         /* 최고 카드만 테두리를 더 두껍게 */\n}\n\n/* 부모에 flex를 주면 자식 카드들이 가로로 유연하게 배치된다 */\n.card-list {\n  display: flex;             /* 이 한 줄이 Flexbox 시작점 */\n  flex-wrap: wrap;           /* 폭이 모자라면 다음 줄로 자동 줄바꿈 */\n  justify-content: center;   /* 주축(가로) 방향 가운데 정렬 */\n  align-items: stretch;      /* 교차축(세로)으로 카드 높이를 맞춤 */\n  gap: 12px;                 /* 카드 사이 간격을 margin 없이 지정 */\n}",
        "note": "교재 5~6장의 Box Model·Specificity·Flexbox 데모를 하나의 카드 목록으로 합친 예제로, 태그(1점)·클래스(10점)·id(100점) 점수 경쟁을 직접 확인할 수 있다. Vue의 scoped style도 결국 이 명시도 규칙 위에서 동작하고, 컴포넌트 카드 목록 레이아웃은 거의 항상 display: flex로 시작하므로 여기서 감을 잡아 두면 그대로 통한다."
      },
      {
        "title": "실시간 날씨 — DOM·이벤트·fetch 비동기",
        "lang": "javascript",
        "code": "// HTML의 <select id=\"city\">와 <div id=\"weather-box\">를 DOM에서 찾아온다\nconst citySelect = document.getElementById(\"city\");\nconst box = document.getElementById(\"weather-box\");\n\n// 도시 이름 → 위도/경도 좌표를 담은 JavaScript 객체\nconst cities = {\n  seoul: { name: \"서울\", lat: 37.57, lon: 126.98 },\n  busan: { name: \"부산\", lat: 35.18, lon: 129.08 },\n};\n\n// async 함수: 안에서 await로 서버 응답을 기다릴 수 있다\nasync function showWeather(key) {\n  const c = cities[key];                       // 선택된 도시 정보 꺼내기\n  box.innerHTML = \"로딩 중...\";                 // 기다리는 동안 안내 문구 표시\n  // 백틱 대신 문자열 연결(+)로 Open-Meteo 요청 주소를 조립\n  const url = \"https://api.open-meteo.com/v1/forecast?latitude=\" + c.lat +\n    \"&longitude=\" + c.lon + \"&current=temperature_2m,relative_humidity_2m\";\n  const response = await fetch(url);           // 서버 응답이 올 때까지 대기\n  const data = await response.json();          // JSON 본문을 객체로 변환\n  // DOM 조작(innerHTML)으로 진짜 온도·습도를 화면에 그린다\n  box.innerHTML = c.name + \" 현재 기온 \" + data.current.temperature_2m +\n    \"도, 습도 \" + data.current.relative_humidity_2m + \"%\";\n}\n\n// 권장 방식인 addEventListener로 change 이벤트를 등록\ncitySelect.addEventListener(\"change\", function () {\n  showWeather(citySelect.value);               // 바뀐 도시로 날씨 갱신\n});\n\nshowWeather(\"seoul\");                          // 첫 화면은 서울 날씨로 시작",
        "note": "교재 8장 마지막 [과제] 실시간 날씨를 한 파일로 축약한 코드로, select의 change 이벤트 → fetch/await → innerHTML 갱신이라는 교재의 3단계 흐름을 그대로 따른다. Vue에서는 이 패턴이 @change 핸들러와 반응형 데이터로 바뀌지만, 내부에서 하는 일(이벤트 감지·비동기 요청·화면 갱신)은 완전히 동일하다. 교재는 이후 이 파일을 weatherAPI.js와 realtimeInfo.js 모듈로 분리하는데, 그 감각이 Vue 컴포넌트 분리로 이어진다."
      },
      {
        "title": "시맨틱 태그로 페이지 뼈대 잡기",
        "lang": "html",
        "code": "<!-- 의미 없는 div 대신, 이름이 곧 역할인 시맨틱 태그로 구조를 잡는다 -->\n<header>\n  <!-- header: 로고·제목이 들어가는 머리 영역 -->\n  <h1>SKALA 기술 블로그</h1>\n  <!-- nav: 다른 페이지로 이동하는 링크 모음 영역 -->\n  <nav>\n    <a href=\"/\">홈</a> <a href=\"/posts\">글 목록</a>\n  </nav>\n</header>\n<!-- main: 이 문서의 핵심 콘텐츠, 페이지에 하나만 둔다 -->\n<main>\n  <!-- section: 논리적으로 관련 있는 내용의 묶음 -->\n  <section>\n    <h2>최신 글</h2>\n    <!-- article: 떼어 놓아도 독립적으로 성립하는 콘텐츠 단위 -->\n    <article>\n      <h3>CSS Grid 입문</h3>\n      <p>행과 열을 함께 다루는 2차원 레이아웃을 배워 보자.</p>\n      <!-- figure + figcaption: 이미지와 그 설명을 한 묶음으로 -->\n      <figure>\n        <img src=\"grid.png\" alt=\"그리드 예시 그림\">\n        <figcaption>그림 1. 3x2 그리드 레이아웃</figcaption>\n      </figure>\n    </article>\n  </section>\n  <!-- aside: 본문과 직접 관련이 약한 곁가지 영역(광고·추천 글) -->\n  <aside>추천 글: Flexbox 복습하기</aside>\n</main>\n<!-- footer: 저작권·연락처가 들어가는 꼬리 영역 -->\n<footer>ⓒ 2026 SKALA</footer>",
        "note": "교재 4장 HTML 심화의 시맨틱 레이아웃 태그 표를 한 페이지 뼈대로 조립한 예제다. 태그 이름만 봐도 어디가 머리·본문·곁가지·꼬리인지 드러나므로 가독성·접근성·SEO 세 마리 토끼를 잡는다. Vue 컴포넌트를 만들 때도 최상위 구조를 이 시맨틱 태그로 잡는 습관이 그대로 이어진다."
      },
      {
        "title": "Grid + 미디어 쿼리 — 화면 크기별로 변하는 카드 갤러리",
        "lang": "css",
        "code": "/* 상단 헤더: sticky는 스크롤 위치에 따라 relative와 fixed를 오간다 */\n.site-header {\n  position: sticky;                    /* 조건부 고정 배치 */\n  top: 0;                              /* 화면 맨 위에 붙는 기준점 */\n  z-index: 10;                         /* 겹칠 때 카드보다 위에 오도록 */\n}\n/* 카드 갤러리: Grid는 행과 열을 함께 다루는 2차원 레이아웃 */\n.gallery {\n  display: grid;                       /* 이 한 줄이 Grid의 시작 선언 */\n  grid-template-columns: 1fr 1fr 1fr;  /* 남은 공간을 1:1:1로 나눈 3열 */\n  gap: 16px;                           /* 셀과 셀 사이 간격 */\n}\n/* 대표 카드는 그리드 '라인 번호'로 넓게 배치한다 */\n.gallery .hero {\n  grid-column: 1 / 3;                  /* 1번 선에서 3번 선까지 = 두 칸 차지 */\n}\n\n/* 브레이크포인트 1: 767px 이하(모바일)는 1열로 */\n@media (max-width: 767px) {\n  .gallery {\n    grid-template-columns: 1fr;        /* 좁은 화면에선 세로 한 줄 */\n  }\n}\n\n/* 브레이크포인트 2: 768~1023px(태블릿)는 2열로 */\n@media (min-width: 768px) and (max-width: 1023px) {\n  .gallery {\n    grid-template-columns: 1fr 1fr;    /* 중간 화면은 2열 */\n  }\n}",
        "note": "교재 6장 CSS 심화의 Grid와 반응형 웹(미디어 쿼리 브레이크포인트) 단원을 하나로 합친 예제다. 이 CSS가 동작하려면 HTML head에 viewport 메타태그(width=device-width, initial-scale=1.0)가 반드시 있어야 한다는 것이 교재의 강조점. 그리드는 셀 개수가 아니라 선(Grid Line) 번호로 구역을 잡는다는 점을 hero 카드에서 확인하자."
      },
      {
        "title": "let·const와 배열 메서드(forEach·map·filter)로 점수 가공",
        "lang": "javascript",
        "code": "// const: 재할당 금지 — 값이 안 바뀌는 변수는 무조건 const로 선언\nconst scores = [72, 95, 60, 88, 41];\n// let: 값이 바뀌는 변수만 let (var는 함수 스코프 함정 때문에 비권장)\nlet total = 0;\n\n// forEach: 모든 요소를 순회하며 함수를 실행한다 (반환값 없음)\nscores.forEach(function (s) {\n  total = total + s;                    // 점수를 하나씩 합계에 누적\n});\nconsole.log(\"평균: \" + total / scores.length);  // 문자열은 + 로 연결\n\n// map: 모든 요소를 규칙대로 가공한 '새 배열'을 반환한다\nconst boosted = scores.map(function (s) {\n  return s + 5;                         // 전원 5점 가산점\n});\n\n// filter: 조건을 통과한 요소만 골라 '새 배열'로 반환한다\nconst passed = boosted.filter(function (s) {\n  return s >= 70;                       // 70점 이상만 합격\n});\nconsole.log(passed);                    // [77, 100, 93] 처럼 출력\n\n// 화살표 함수로 쓰면 같은 일을 한 줄로 줄일 수 있다\nconst evens = scores.filter(s => s % 2 === 0);  // 짝수 점수만 추출\n\n{\n  let inner = \"블록 안\";               // let은 이 중괄호 안에서만 존재\n}\n// console.log(inner);  // 오류! 블록 밖 접근 불가 — 이것이 블록 스코프",
        "note": "교재 7장 JavaScript 기초의 변수 선언(let·const·스코프)과 배열 반복 메서드 단원을 한 흐름으로 묶었다. forEach는 반환값이 없고 map·filter는 원본을 건드리지 않고 새 배열을 만든다는 차이가 핵심 — 이 세 메서드는 Vue에서 목록 렌더링용 데이터를 다듬을 때 매일 쓰게 된다."
      },
      {
        "title": "종합실습(중고차 목록 관리) — 수업 중 정오표·평가 안내 (7/16 강사 공지)",
        "lang": "text",
        "code": "[종합실습 과제] 제공된 index.html · style.css · app.js의 미구현 부분을 채워\n중고차 목록 관리 화면을 완성한다.\n\n[배점] HTML 20점 · CSS 20점 · JavaScript 60점\n· HTML: 입력 폼, 검색 영역, 목록 영역 구성\n· CSS: 2열 레이아웃, 차량 카드, 반응형 구성\n· JS: 차량 등록, 입력값 검증, 수정, 수정 취소, 삭제, 검색, 판매 상태 필터\n· 색상·간격·크기는 예시 화면과 완전히 같지 않아도 됨 — 기능 동작이 기준\n· 브라우저 저장(localStorage)은 사용하지 않음 — 새로고침 시 예시 데이터로 복귀\n\n[수업 중 정오표 — 권기창 교수 공지 3건]\n1. 문제 7페이지 요구사항 7번: alert 창 → confirm 창으로 해결할 것\n2. app.js의 const maxYear = new Date().getFullYear() + 1\n   → + 1 을 제거하고 new Date().getFullYear() 로 수정\n3. 11페이지 \"이미지 준비중\"은 무시하고 구현\n\n[제출 형식] SKALA번호_반_이름_HTML.zip (예: 123_3반_홍길동_HTML.zip)",
        "note": "판교 1~5반 종합실습에서 실시간으로 공지된 정오표와 평가 기준을 모았다. 특히 maxYear의 +1 제거는 미래 연식 차량 입력 검증이 틀어지는 원인이었고, alert→confirm은 사용자의 확인/취소 선택이 필요한 삭제 흐름 때문이다 — 요구사항의 '의도'를 읽는 연습이기도 하다."
      },
      {
        "title": "Emmet 단축 입력 5규칙 — 실습교수 치트시트 (김영희 교수)",
        "lang": "text",
        "code": "VS Code에서 HTML 뼈대를 몇 글자로 만들어 내는 Emmet 핵심 5가지.\n\n1. !  →  Tab : HTML 기본 뼈대 (압도적 1위)\n   <!DOCTYPE html>부터 <body>까지 한 번에. lang=\"en\"은 ko로 바꿀 것.\n\n2. .클래스명 : class 있는 div\n   .card → <div class=\"card\"></div>\n   .card>img+h1+p → 카드 구조 한 번에 (#todoList처럼 #은 id)\n\n3. ul>li*4 : 자식(>)과 반복(*)\n   메뉴·목록·TodoList 등 반복 구조 필수기. ul.menu>li*4>a 로 확장 가능.\n\n4. + 와 {텍스트} : 형제 나열과 내용 채우기\n   h1{오늘 할 일}+input+button{추가}\n   → <h1>오늘 할 일</h1><input type=\"text\"><button>추가</button>\n\n5. $ : 자동 번호 매기기\n   ul>li{항목 $}*3 → 항목 1 / 항목 2 / 항목 3\n   갤러리 카드 여러 장은 section>div.photo-card$*4 식으로 응용.\n\n[종합 예시 — 한 줄이 교재 예제 6의 HTML 전체]\ndiv.todo-app>h1{📝 오늘 할 일}+div.input-row>input+button{추가}^ul#todoList>li{할 일 $}*3\n(^ 는 한 단계 위로 올라가기)",
        "note": "판교 4반 김영희 실습교수가 수업 중 정리해 공유한 치트시트다. JSFiddle/CodePen이 숨겨주던 HTML 뼈대를 VS Code에서 직접 만들 때 Emmet이 그 다리 역할을 한다. 다섯 규칙만 손에 붙으면 마크업 작성 속도가 몇 배로 빨라진다."
      },
      {
        "title": "웹 학습 참고 링크 모음 — 실습교수·수강생 공유 (7/15~16)",
        "lang": "text",
        "code": "[실습교수 공유]\n· 모던 자바스크립트 Deep Dive 소스: https://poiemaweb.com/\n  (김영희·김범준 교수 추천 — JS 개념을 깊게 파고들 때 표준 레퍼런스)\n· JavaScript Numbers: https://www.w3schools.com/js/js_numbers.asp (권기창 교수)\n· HTML Color Codes: https://htmlcolorcodes.com/ (권기창 교수 — CSS 색상 고를 때)\n· M1-02 HTML 실습 1 TodoList 만들기(노션): 권기창 교수 실습 문서\n· HTML+Tailwind CSS 정리(노션): 김범준 교수\n· Emmet 정리(노션): 김영희·김범준 교수\n\n[수강생 공유 — 판교 3반 정민교]\n· CodePen: https://codepen.io/\n  \"다른 사람들이 만든 컴포넌트를 뜯어보면서 공부할 수 있고, 웹에서 바로\n  코딩해볼 수 있어 리버스 엔지니어링하며 익히기 좋다\"\n\n[다음 과목 예고 — 판교 4반 김영희 교수]\n· 다음 주 월·화 이은호 교수 강의 — 공유된 교재가 수업 자료이며 Quiz는 교재 오픈북",
        "note": "여러 반 채널에 흩어져 있던 링크를 한 카드로 모았다. poiemaweb은 JS를 제대로 파려는 사람에게 한국어 자료 중 가장 깊이 있는 레퍼런스이고, CodePen 공유는 수강생이 직접 올린 팁이라 더 값지다 — 다른 사람 코드를 뜯어보는 것이 웹 학습의 지름길이라는 건 현업에서도 통하는 방법이다."
      },
      {
        "title": "종합실습 시작 파일 해부 — TODO 24개 지도 (exam_htmlcssjs.zip)",
        "lang": "text",
        "code": "배포된 시작 파일 3개(index.html 82줄 · style.css 198줄 · app.js 197줄)에는\n'수강생 구현 #N' TODO가 총 24개 들어 있다. 골격은 이미 제공된다.\n\n[HTML — 10개] 페이지 헤더 / 제조사 목록 / 모델명 / 연식 / 주행거리 / 가격 /\n연료 목록 / 판매 상태 목록 / 등록·취소 버튼 / 차량 검색·필터 목록\n\n[CSS — 7개] 입력·목록 영역 2열 배치 / form-row / form-row label /\nbutton-area / search-area / car-list / car-card\n\n[JS — 8개] ① 차량 등록·수정(submit) ② 카드 안 수정·삭제 버튼 처리\n③ 검색어 입력 시 목록 재출력 ④ 판매 상태 변경 시 목록 재출력\n⑤ 수정 취소 ⑥ 입력 검증 후 차량 객체 반환 ⑦ 차량 정보 수정 설정 ⑧ 차량 삭제\n\n[이미 제공되는 골격 — 먼저 읽을 것]\nconst cars = [...]        // 예시 데이터 배열\nlet editingId = null      // 수정 모드 상태\nfunction renderCars()     // 목록 그리기 (완성돼 있음)\nfunction getFilteredCars()// 검색·필터 적용 (완성돼 있음)\nfunction createCarCard()  // 카드 DOM 생성 (완성돼 있음)\n\n[공략 순서 추천] 제공된 renderCars→getFilteredCars→createCarCard를 먼저 읽고,\nHTML 폼(#1~10) → CSS 배치(#1~7) → JS는 데이터 흐름 순서(⑥검증→①등록→②버튼→\n⑦수정→⑤취소→⑧삭제→③④검색·필터)로 채우면 자연스럽다.",
        "note": "시작 zip을 직접 열어 TODO를 전수 조사한 지도다. 백지에서 짜는 시험이 아니라 '제공된 골격을 읽고 빈칸을 채우는' 시험이므로, 완성된 render 함수들이 어떤 데이터 구조(cars 배열·editingId)를 기대하는지 먼저 파악하는 것이 최고의 공략법이다. 정오표(alert→confirm, maxYear +1 제거)와 함께 보자."
      },
      {
        "title": "CSS 수업 예제 3종 — 종합 레이아웃·Flex 비교·Transition (김영희 교수 배포)",
        "lang": "css",
        "code": "/* 수업 중 배포된 예제 파일 3개의 핵심만 발췌 (skala-4 폴더 보관)\n   ① css_complete_example.html — 레이아웃 종합(flex·grid·position 5개 섹션)\n   ② css_flex_exe1.html — Flex Box 속성 비교 실험\n   ③ Trsnsition.html — 2D/3D 전환·애니메이션 4종 비교 */\n\n/* ③에서 — hover 전환(transition)과 자동 반복(animation)의 차이 */\n.t2d { transition: transform 0.35s; }             /* 마우스 올릴 때만 */\n.t2d:hover { transform: translateY(-8px) scale(1.07); }\n\n.t3d { transition: transform 0.5s; transform-style: preserve-3d; }\n.t3d:hover { transform: rotateY(28deg) rotateX(12deg); }  /* 3D는 perspective 필요 */\n\n.a2d { animation: move2d 1.4s ease-in-out infinite alternate; } /* 항상 반복 */\n@keyframes move2d {\n  from { transform: translateX(0) rotate(0deg); }\n  to   { transform: translateX(16px) rotate(8deg); }\n}\n\n/* 부모에 perspective를 줘야 자식의 3D 회전이 원근감 있게 보인다 */\n.wrap { display: flex; gap: 14px; flex-wrap: wrap; perspective: 600px; }",
        "note": "판교 4반 수업에서 배포된 실습 파일 3종이다. ①은 flex-container/grid-container/position(sticky·absolute)·반응형 카드까지 한 파일에 담은 종합 레퍼런스, ②는 justify-content 등 Flex 속성을 값만 바꿔 비교하는 실험 파일, ③은 transition(이벤트 기반)과 animation(자동 반복)의 차이를 2D/3D로 보여준다. 종합실습의 car-card·2열 배치 CSS를 채울 때 ①을 옆에 두면 된다."
      },
      {
        "title": "스터디 플래너 ① 목표 추가 — submit 검증과 상태 갱신",
        "lang": "javascript",
        "code": "// 폼의 submit 이벤트를 받아 새 목표를 배열에 추가한다\nform.addEventListener(\"submit\", (event) => {\n  // 폼 기본 동작(페이지 새로고침)을 막는다 — 안 막으면 화면이 깜빡인다\n  event.preventDefault();\n  // 입력값 앞뒤 공백을 제거해 공백만 입력한 경우를 걸러낸다\n  const title = input.value.trim();\n  if (title === \"\") {\n    // 에러 문구를 보이게 하고 입력칸으로 커서를 되돌린 뒤 여기서 중단\n    errorEl.hidden = false;\n    input.focus();\n    return;\n  }\n  // 정상 입력이면 에러 문구를 숨긴다\n  errorEl.hidden = true;\n  // 상태 배열에 목표 객체를 추가 — id는 현재 시각(ms)으로 고유값을 만든다\n  goals.push({\n    id: Date.now(),\n    title: title,\n    category: category.value,\n    done: false,\n  });\n  // 입력칸을 비우고, 저장한 뒤, 화면을 다시 그린다 (이 3단 순서가 핵심)\n  input.value = \"\";\n  save();\n  render();\n});",
        "note": "2일 완성 교재의 플래너 실습 4단계다. preventDefault·trim 검증·상태 추가·save+render라는 네 동작이 한 핸들러에 모여 있어, 이후 모든 기능(토글·삭제·필터)이 같은 패턴을 반복한다. id에 Date.now()를 쓰는 이유는 삭제·토글 시 배열에서 대상을 찾을 고유 키가 필요하기 때문이다."
      },
      {
        "title": "스터디 플래너 ② 이벤트 위임으로 토글·삭제·필터 한 번에",
        "lang": "javascript",
        "code": "// 목록 전체에 리스너를 딱 하나만 건다 — 항목이 몇 개든 이것으로 충분\nlistEl.addEventListener(\"click\", (event) => {\n  // 클릭 지점에서 가장 가까운 항목(li.item)을 거슬러 찾는다\n  const li = event.target.closest(\".item\");\n  // 목록 여백을 클릭한 경우엔 li가 없으므로 무시한다\n  if (!li) return;\n  // data-id 속성에 저장해 둔 목표 id를 숫자로 변환\n  const id = Number(li.dataset.id);\n\n  // 눌린 대상이 체크박스면 완료 상태를 토글한다\n  if (event.target.matches(\".item-check\")) {\n    const goal = goals.find((g) => g.id === id);\n    goal.done = event.target.checked;\n    save();\n    render();\n  }\n\n  // 눌린 대상이 삭제 버튼이면 해당 id만 빼고 새 배열을 만든다\n  if (event.target.matches(\".item-del\")) {\n    goals = goals.filter((g) => g.id !== id);\n    save();\n    render();\n  }\n});\n\n// 필터 탭도 똑같은 위임 패턴 — 탭 묶음에 리스너 하나\ntabsEl.addEventListener(\"click\", (event) => {\n  const tab = event.target.closest(\".tab\");\n  if (!tab) return;\n  // 상태 변수만 바꾸고 화면 갱신은 render에 맡긴다\n  filter = tab.dataset.filter; // \"all\" 또는 \"active\" 또는 \"done\"\n  // 눌린 탭에만 활성 클래스를 남긴다\n  document.querySelectorAll(\".tab\").forEach((t) => {\n    t.classList.toggle(\"is-active\", t === tab);\n  });\n  render();\n});\n\n// 현재 필터에 맞는 목표만 걸러 돌려주는 함수\nfunction visible() {\n  if (filter === \"active\") return goals.filter((g) => !g.done);\n  if (filter === \"done\") return goals.filter((g) => g.done);\n  return goals;\n}",
        "note": "항목마다 리스너를 달면 나중에 추가한 항목만 클릭이 안 되는 전형적인 버그가 난다 — 렌더링으로 DOM이 새로 만들어지기 때문이다. 부모 한 곳에 위임하면 재등록이 필요 없다. closest는 '어느 항목인가', matches는 '무슨 버튼을 눌렀나'를 나눠 판별하는 역할 분담으로 외워 두면 편하다."
      },
      {
        "title": "스터디 플래너 ③ 상태를 화면으로 — render와 XSS 방어",
        "lang": "javascript",
        "code": "// 화면 그리기는 오직 이 함수 하나에서만 한다 (상태 기반 렌더링)\nfunction render() {\n  // 현재 필터를 통과한 목표만 가져온다\n  const items = visible();\n  // 목록을 비우고 처음부터 다시 그린다\n  listEl.innerHTML = \"\";\n  items.forEach((goal) => {\n    const li = document.createElement(\"li\");\n    // 완료 여부에 따라 취소선 클래스를 붙인다\n    li.className = goal.done ? \"item is-done\" : \"item\";\n    // 이벤트 위임에서 쓸 id를 data 속성에 심어 둔다\n    li.dataset.id = goal.id;\n    // 사용자 입력은 escapeHtml을 거쳐서 넣는다 — 그대로 innerHTML에 넣으면 위험\n    li.innerHTML =\n      \"<span class=\\\"item-text\\\">\" + escapeHtml(goal.title) + \"</span>\" +\n      \"<span class=\\\"badge\\\">\" + goal.category + \"</span>\";\n    listEl.appendChild(li);\n  });\n  // 목록이 비었을 때만 안내 문구를 보여 준다\n  emptyEl.hidden = items.length > 0;\n  // 진행률 표시 갱신\n  updateProgress();\n}\n\n// 사용자 입력에 섞인 특수문자를 안전한 표기로 바꾼다\nfunction escapeHtml(text) {\n  // 빈 요소를 하나 만들어 텍스트로만 넣으면\n  const div = document.createElement(\"div\");\n  // 브라우저가 태그로 해석하지 않고 문자 그대로 보관해 준다\n  div.textContent = text;\n  // 안전하게 변환된 문자열을 다시 꺼내 쓴다\n  return div.innerHTML;\n}",
        "note": "화면은 언제나 상태(goals)를 그린 결과여야 한다는 원칙이 이 함수에 담겨 있다. 사용자가 입력한 글자를 innerHTML에 그대로 넣으면 script 태그가 실행되는 XSS 취약점이 생기므로, textContent를 쓰거나 escapeHtml을 반드시 거쳐야 한다 — 최종 과제 평가에도 명시된 항목이다."
      },
      {
        "title": "스터디 플래너 ④ fetch·async/await·localStorage",
        "lang": "javascript",
        "code": "// 오늘의 팁을 JSON 파일에서 비동기로 불러온다\nasync function loadTip() {\n  const tipEl = document.getElementById(\"tip\");\n  try {\n    // await는 응답이 올 때까지 이 줄에서 잠시 멈춘다\n    const response = await fetch(\"data/tips.json\");\n    // 404도 fetch는 성공으로 보기 때문에 상태를 직접 확인해야 한다\n    if (!response.ok) throw new Error(\"HTTP \" + response.status);\n    // 응답 본문을 JSON 객체로 변환 (이것도 비동기라 await)\n    const tips = await response.json();\n    // 오늘 날짜를 팁 개수로 나눈 나머지 → 날마다 다른 팁이 나온다\n    const today = new Date().getDate() % tips.length;\n    tipEl.textContent = tips[today];\n  } catch (error) {\n    // 실패해도 화면이 비지 않도록 대체 문구를 보여 준다\n    tipEl.textContent = \"팁을 불러오지 못했습니다.\";\n    console.error(error);\n  }\n}\n\n// 저장 키는 한 곳에 상수로 모아 오타를 막는다\nconst STORAGE_KEY = \"skala-planner\";\n// 시작할 때 저장된 목록을 먼저 읽어 상태를 채운다\nlet goals = load();\nlet filter = \"all\";\n\nfunction load() {\n  // localStorage에는 문자열만 들어가므로 꺼낼 때 JSON.parse로 되돌린다\n  const saved = localStorage.getItem(STORAGE_KEY);\n  return saved ? JSON.parse(saved) : [];\n}\n\nfunction save() {\n  // 배열을 문자열로 바꿔서 저장 — 이 호출을 빠뜨리면 새로고침 시 목록이 사라진다\n  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));\n}",
        "note": "fetch의 response.ok 확인과 try/catch 대체 문구는 실무에서 그대로 쓰이는 최소 방어 코드다. localStorage는 문자열 전용이라는 점, 그리고 상태를 바꾼 직후 save를 부르는 습관 두 가지만 지키면 저장 관련 사고는 거의 나지 않는다."
      },
      {
        "title": "최종 제출 과제 — 스터디 플래너 확장(F5~F7) 힌트",
        "lang": "javascript",
        "code": "// [출발점] 기능을 붙이기 전에 goal 객체의 필드부터 늘리는 것이 순서다\ngoals.push({\n  id: Date.now(),\n  title: title,\n  category: category.value,\n  due: dueInput.value, // F5: input type=\"date\"가 주는 \"2026-07-31\" 형식 문자열\n  done: false,\n});\n\n// [F6] 검색 — 기존 visible() 결과에 조건을 하나 더 얹는다\nconst keyword = searchInput.value.trim();\n// includes로 제목에 검색어가 들어있는 목표만 남긴다\nlist = list.filter((g) => g.title.includes(keyword));\n\n// [F7] 분류별 남은 개수 — reduce로 집계한다\n// 완료되지 않은 목표만 골라, 카테고리를 key로 개수를 누적\nconst rest = goals.filter((g) => !g.done).reduce((acc, g) => {\n  acc[g.category] = (acc[g.category] || 0) + 1;\n  return acc;\n}, {});\n// 결과 예시: { HTML: 2, CSS: 1, JS: 3 }\n\n// [F5 지난 목표 강조] 오늘보다 마감일이 이르면 상태 클래스를 붙인다\nconst today = new Date().toISOString().slice(0, 10); // \"2026-07-20\"\nli.classList.toggle(\"is-overdue\", Boolean(goal.due) && goal.due < today && !goal.done);",
        "note": "과제는 2일간 만든 플래너를 출발점으로 삼되 새 문법을 배울 필요는 없다 — 폼, Flexbox/Grid, 미디어 쿼리, 배열 메서드, 이벤트 위임, localStorage만으로 충분히 해결된다. 막히면 F5는 2·3장(폼 태그·classList), F6은 7·8장(filter·includes·input 이벤트), F7은 7장(reduce)으로 돌아가 그 코드를 먼저 다시 실행해 보는 것이 가장 빠른 길이다."
      },
      {
        "title": "최종 제출 과제 — 요구사항·제출 규격·루브릭·자주 하는 실수",
        "lang": "text",
        "code": "[시나리오] 수업에서 만든 스터디 플래너에 운영진 요청을 반영한다\n- 목표에 마감일이 있으면 좋겠다\n- 목표가 쌓이면 검색이 필요하다\n- 분류별로 몇 개 남았는지 요약을 보여 달라\n- 휴대폰에서도 볼 수 있어야 한다\n\n[필수 기능] F1~F4는 수업에서 만든 것, F5~F7이 새로 추가할 부분\nF1 목표 추가 — 빈 값·공백만 입력은 거부하고 에러 메시지 표시\nF2 완료 토글·삭제 — 이벤트 위임으로 리스너는 목록에 하나만\nF3 필터·진행률 — 전체 / 진행중 / 완료, 완료 비율 표시\nF4 localStorage 저장 — 새로고침해도 목록이 유지될 것\nF5 마감일 입력 — input type=\"date\" 추가, 지난 목표는 시각적으로 강조\nF6 검색 — 입력한 글자가 포함된 목표만 실시간으로 걸러 보이기\nF7 분류별 요약 — HTML / CSS / JS 각각 남은 개수를 집계해 표시\n\n[화면·품질 요구]\n구조: 시맨틱 태그로 구성(header/main/section/footer), 모든 입력에 label 연결(for+id 또는 aria-label)\n스타일: 색·간격은 :root의 CSS 변수로 정의해 재사용, 클래스명은 하이픈 규칙(goal-item, btn-primary)\n레이아웃: Flexbox 또는 Grid로 배치 — 요소를 띄우는 편법 금지\n반응형: 375px에서 가로 스크롤이 없고 조작 가능할 것\n동작: 콘솔에 빨간 오류가 없을 것\n보안: 사용자 입력을 innerHTML에 그대로 넣지 말 것 — textContent 또는 escapeHtml\n\n[제출물] 폴더 이름은 \"이름_스터디플래너\" 형식 (예: 홍길동_스터디플래너)\n홍길동_스터디플래너/\n  index.html          구조\n  css/style.css       스타일(CSS 변수·레이아웃·반응형)\n  js/app.js           동작(이벤트·렌더링·저장)\n  data/tips.json      오늘의 팁 데이터\n  README.md           ① 구현 기능 목록 ② 실행 방법 ③ 어려웠던 점과 해결 ④ 미완성 항목\nzip으로 압축해 제출하며 node_modules 같은 불필요한 폴더는 넣지 않는다.\n\n[평가 루브릭] 완벽한 디자인보다 요구 기능의 완성이 우선\n기능 완성도 40 — F1~F7이 실제로 동작하는가 (F5~F7에 가중치)\nHTML 구조   15 — 시맨틱 태그·label 연결·유효한 마크업\nCSS 품질    15 — CSS 변수 활용·Flex/Grid 레이아웃·일관된 클래스명\n반응형      10 — 375px에서 가로 스크롤 없이 사용 가능\nJS 품질     15 — 이벤트 위임·상태 기반 렌더링·콘솔 오류 없음\nREADME       5 — 구현 기능·실행 방법·어려웠던 점이 적혀 있는가\n※ 배점은 과정 운영에 따라 조정될 수 있으니 각 반 실습교수님 안내를 우선한다.\n\n[자주 하는 실수 5가지]\n1. 요소가 null이라 오류 → script가 DOM보다 먼저 실행됨. body 끝에 두거나 defer\n2. 새로고침하면 목록이 사라짐 → save() 호출 누락. 상태를 바꾼 직후 반드시 저장\n3. 추가 버튼을 누르면 화면이 깜빡임 → submit 기본 동작. event.preventDefault()\n4. 새로 추가한 항목만 클릭이 안 됨 → 요소마다 리스너를 달았기 때문. 이벤트 위임으로\n5. 모바일에서 가로 스크롤 발생 → 고정 px 폭 사용·min-width 누락. min-width: 0 확인\n제출 전 개발자도구 콘솔을 열고 빨간 오류가 없는지 반드시 확인할 것.",
        "note": "2일 완성 교재(260717)의 최종 과제 장을 요구사항·제출 규격·루브릭·실수 목록으로 정리했다. 배점이 기능 완성도 40점에 몰려 있으므로 디자인을 다듬기 전에 F5~F7을 먼저 동작시키는 순서가 유리하고, 반응형 375px과 콘솔 무오류는 확인만 하면 확보되는 25점이라 마지막에 반드시 점검할 항목이다."
      }
    ]
  },
  "smartdata": {
    "concepts": [
      {
        "term": "정규화(1NF~3NF)와 이상현상",
        "desc": "정규화는 데이터 중복을 최소화해 이상(Anomaly) 현상을 막는 설계 원칙이다. 비정규화 테이블에서는 일부만 저장하려 해도 불필요한 데이터까지 저장되는 삽입 이상, 행 하나를 지우면 다른 중요한 정보까지 사라지는 삭제 이상, 중복된 값 중 일부만 고쳐 불일치가 생기는 갱신 이상이 발생한다.\n1NF(원자값) → 2NF(부분종속 제거) → 3NF(이행종속 제거) 순으로 진행하며 보통 3NF나 BCNF까지 적용한다. 다만 과도한 정규화는 JOIN 비용을 키우므로, 성능이 중요한 지점에서는 의도적으로 중복을 허용하는 반정규화(Denormalization) 전략을 함께 검토한다."
      },
      {
        "term": "PK·FK와 참조 무결성, 교차 테이블",
        "desc": "기본키(PK)는 행을 유일하게 식별하는 기준이고, 외래키(FK)는 다른 테이블의 PK를 참조해 테이블 사이의 관계를 DB가 직접 보증하게 만드는 장치다. FK가 걸려 있으면 존재하지 않는 학과 id를 가진 학생을 넣을 수 없다 — 이것이 참조 무결성이다.\n학생과 과목처럼 N:M 관계는 두 테이블로 직접 표현할 수 없어서, 수강신청(enrollments) 같은 교차 테이블을 사이에 두고 (student_id, course_id) 복합 PK로 풀어낸다. 교재 종합실습의 학사 도메인 설계가 정확히 이 패턴이다."
      },
      {
        "term": "B-Tree 인덱스와 인덱스 무력화 안티패턴",
        "desc": "인덱스는 책의 찾아보기처럼 WHERE·JOIN·ORDER BY에 자주 쓰는 컬럼의 값과 위치를 정렬해 둔 자료구조로, 전체 스캔 대신 필요한 행으로 바로 접근하게 해 준다. 대신 쓰기 때마다 인덱스도 갱신해야 하므로 무분별하게 만들면 INSERT·UPDATE가 느려진다.\n인덱스가 있어도 못 쓰는 대표 안티패턴이 있다 — 조건 컬럼에 함수 적용, 컬럼과 값의 타입 불일치(암묵적 형변환), 앞에 %가 붙은 LIKE 검색, 그리고 N+1 쿼리·NOT IN의 NULL 함정·대용량 OFFSET 페이징이다. 교재는 이를 8가지 안티패턴으로 정리해 암기시킨다."
      },
      {
        "term": "EXPLAIN 실행계획 — 튜닝은 Before/After 비교",
        "desc": "EXPLAIN은 DB가 쿼리를 어떤 순서·방식으로 실행할지 보여 주는 명령이고, EXPLAIN ANALYZE는 실제로 실행해 소요 시간까지 측정한다. 전체 테이블을 훑는 Seq Scan(Full Scan)인지 인덱스를 타는 Index Scan인지, JOIN이 Nested Loop·Hash·Merge 중 어떤 알고리즘으로 처리되는지를 여기서 확인한다.\n튜닝의 기본 절차는 느린 쿼리 식별(Slow Query Log) → 실행계획 확인 → 인덱스 추가나 쿼리 재작성 → 같은 쿼리의 실행계획을 다시 떠서 Before/After를 비교하는 것이다. 감이 아니라 실행계획이라는 증거로 판단하는 습관이 핵심이다."
      },
      {
        "term": "트랜잭션 ACID와 WAL — 로그가 먼저다",
        "desc": "트랜잭션은 여러 SQL을 하나의 작업 단위로 묶어, 전부 성공(COMMIT)하거나 전부 취소(ROLLBACK)되게 보장한다. 그 성질이 ACID — 원자성(전부 아니면 전무), 일관성(규칙 위반 상태 금지), 격리성(동시 실행 간섭 차단), 지속성(확정된 결과는 장애에도 보존)이다.\n지속성을 구현하는 핵심 기술이 WAL(Write-Ahead Logging)이다. 데이터 파일보다 변경 로그를 먼저 디스크에 기록하기 때문에, 장애가 나도 로그를 순서대로 재실행(Redo)하고 미확정 트랜잭션은 되돌려(Undo) 복구할 수 있다. COMMIT 시점에 WAL을 fsync하는 것이 \"로그가 먼저\"라는 원칙의 실체다."
      },
      {
        "term": "MVCC·격리 수준과 Lock, Deadlock",
        "desc": "MVCC(다중 버전 동시성 제어)는 데이터를 고치는 대신 새 버전을 만들어, 읽는 쪽은 자기 시점의 스냅샷을 보고 쓰는 쪽은 새 버전을 쓰게 해 읽기와 쓰기가 서로를 막지 않게 한다. PostgreSQL과 MySQL InnoDB가 모두 이 방식이며, 트랜잭션이 서로를 어디까지 볼 수 있는지는 READ COMMITTED 같은 격리 수준으로 조절한다.\n그래도 같은 행을 동시에 고치려면 락이 필요하다. SELECT ... FOR UPDATE로 행을 잠그고, 기다리지 않으려면 NOWAIT, 잠긴 행을 건너뛰려면 SKIP LOCKED를 쓴다. 두 트랜잭션이 서로가 잡은 락을 기다리며 멈추는 것이 데드락이며, 테이블 접근 순서를 통일하는 것이 기본 예방책이다."
      },
      {
        "term": "ERD 까마귀발 표기와 개념→논리→물리 3단계 설계",
        "desc": "ERD는 엔티티·속성·관계를 한 장의 그림으로 표현하는 설계 언어다. 실무 표준인 IE(까마귀발) 표기에서 |는 하나, 세 갈래 까마귀발은 여럿, ○는 없거나 하나를 뜻하고, 관계선도 두 종류다 — FK가 자식의 PK 일부가 되는 식별 관계(실선, 부모 없이 존재 불가한 약한 엔티티)와 FK가 일반 컬럼인 비식별 관계(점선).\n설계는 3단계로 내려간다. 개념적 모델링은 요구사항 문장에서 엔티티(명사)와 관계를 추출해 이해관계자와 소통하는 단계, 논리적 모델링은 테이블 매핑·PK/FK 설정·정규화를 적용하는 단계(여기까지 DBMS 독립적), 물리적 모델링은 특정 DBMS에 맞춰 타입·인덱스·파티셔닝을 정하는 단계다. 금액은 부동소수점 오류를 피해 NUMERIC(10,2), 글로벌 서비스 시간은 TIMESTAMPTZ를 쓰는 결정이 물리 설계의 예다."
      },
      {
        "term": "NULL의 3값 논리 — 참·거짓, 그리고 UNKNOWN",
        "desc": "SQL의 조건 판정은 참/거짓 2값이 아니라 UNKNOWN이 추가된 3값 논리다. NULL은 '값이 없음/모름'이라 NULL이 낀 비교는 참도 거짓도 아닌 UNKNOWN이 되고, WHERE는 TRUE인 행만 통과시키므로 해당 행은 결과에서 조용히 사라진다. \"데이터가 분명히 있는데 안 나와요\"라는 신고의 상당수가 이 문제이며, memo = NULL은 항상 0건 — NULL은 반드시 IS NULL / IS NOT NULL로 찾는다.\n집계에서도 NULL은 특별 취급이다. COUNT(*)만 NULL 포함 전체 행을 세고, COUNT(컬럼)·SUM·AVG는 NULL을 제외한다 — 특히 AVG는 NULL을 0으로 쳐 주지 않으므로 의도와 다른 평균이 나올 수 있다. 표시용 기본값은 COALESCE(첫 번째 비-NULL 값), 0 나눗셈 방지는 NULLIF(b, 0)가 표준 패턴이다."
      },
      {
        "term": "서브쿼리 4유형 — 스칼라·인라인뷰·WHERE·상관",
        "desc": "서브쿼리는 놓이는 위치에 따라 성격이 갈린다. SELECT 절의 스칼라 서브쿼리는 단일 값 하나를 반환하지만 행마다 실행돼 성능 주의 대상이고, FROM 절의 인라인 뷰는 서브쿼리 결과를 임시 테이블처럼 쓰는 방식으로 페이지네이션에 자주 쓰인다. WHERE 절 서브쿼리는 비교 조건으로 쓰이며, 바깥 쿼리의 컬럼을 참조하는 상관 서브쿼리는 행마다 다시 실행되므로 JOIN이나 CTE로 대체를 검토한다.\n다중 행 비교 연산자도 구분해 두자 — IN은 목록 포함 여부, EXISTS는 행이 존재하는지만 확인해(SELECT 1) 대용량에서 IN보다 빠르고 NULL에도 안전하다. ANY는 '하나라도 만족'(>ANY는 최솟값 초과와 동일), ALL은 '전부 만족'(>ALL은 최댓값 초과와 동일)이다. 합집합 UNION(중복 제거)·UNION ALL(중복 허용, 더 빠름), 교집합 INTERSECT, 차집합 EXCEPT까지가 이 단원의 도구 상자다."
      },
      {
        "term": "CTE(WITH)와 재귀 CTE — 쿼리를 이름 붙인 단계로 나눈다",
        "desc": "CTE는 WITH 절로 중간 결과에 이름을 붙여 두고 본 쿼리에서 테이블처럼 쓰는 문법이다. 복잡한 서브쿼리 중첩을 '1단계: 학과별 평균 → 2단계: 평균보다 높은 학생' 같은 읽히는 파이프라인으로 분해할 수 있어 가독성과 재사용성이 좋아진다. 교재의 기준은 명확하다 — 서브쿼리가 복잡해지면 CTE로 분해하라.\nWITH RECURSIVE는 CTE만의 강력한 기능으로, 기저 단계(최상위 행)와 재귀 단계(직전 결과에 JOIN해 한 층 아래를 추가)를 UNION ALL로 이어 조직도·카테고리 트리·경로 탐색 같은 계층 데이터를 한 번에 펼친다. 재귀 단계에는 depth 제한 조건을 반드시 넣어 무한 재귀를 방지하는 것이 철칙이다."
      },
      {
        "term": "View와 Materialized View — 저장된 쿼리 vs 저장된 결과",
        "desc": "일반 View는 '저장된 SELECT문'이라 조회할 때마다 원본을 다시 읽어 항상 최신 데이터를 보여준다. 용도는 세 가지 — 민감 컬럼을 숨기는 권한 제어, 복잡한 JOIN·집계 쿼리의 재사용, 그리고 원본 테이블 구조가 바뀌어도 응용에는 같은 모양을 보여주는 인터페이스 안정화(논리적 독립성)다.\nMaterialized View는 쿼리 '결과'를 디스크에 저장해 조회가 빠르고 인덱스도 걸 수 있지만, 자동 갱신이 없어 REFRESH MATERIALIZED VIEW를 스케줄러로 돌려야 한다(CONCURRENTLY 옵션이면 잠금 없이 갱신). 대용량 집계 화면은 매번 GROUP BY를 도는 대신 MV나 통계 테이블에 미리 계산해 두는 것이 교재가 권하는 성능 전략이다."
      },
      {
        "term": "DB 보안 5층 — 인증·인가·바인딩·암호화·감사",
        "desc": "DB 보안은 다섯 층으로 정리된다. 인증(누가 접속했나), 인가(무엇을 할 수 있나), 입력 검증(악성 입력 차단), 암호화(전송 TLS·저장 TDE·민감 컬럼 암호화), 감사(누가 언제 무슨 쿼리를 실행했나). 인가의 원칙은 최소 권한 — 권한을 역할(ROLE)로 묶어 GRANT하고 사용자에게는 역할만 부여하며, 애플리케이션 계정에 관리자 권한을 주는 것이 교재가 꼽는 대표적 실수다.\nSQL Injection의 원인은 단 하나, 사용자 입력을 SQL 문자열에 직접 이어붙이는 것이다. 방어도 한 줄 — 항상 파라미터 바인딩(Prepared Statement)을 쓰고, 바인딩이 불가능한 ORDER BY 컬럼명 같은 곳은 화이트리스트로 검증한다. 여기에 Row-Level Security를 켜면 같은 테이블에서 사용자별로 볼 수 있는 행 자체를 제한할 수 있어 멀티테넌시 구현의 기본기가 된다."
      },
      {
        "term": "OLTP vs OLAP — 쓰기 중심과 읽기 중심은 설계가 다르다",
        "desc": "OLTP(운영계)는 주문·결제처럼 짧은 트랜잭션이 초당 수천 건 쏟아지는 쓰기 중심 부하라 정규화(3NF)를 유지해 갱신 이상을 막고, OLAP(분석계)은 수억 행을 훑는 집계 읽기 중심이라 JOIN을 줄이는 반정규화와 컬럼 기반 저장(Columnstore)이 유리하다. 인덱스 전략도 부하 성격에 따라 달라지므로, 운영 DB에서 무거운 분석 쿼리를 직접 돌리는 대신 데이터 웨어하우스로 분리하는 것이 정석이다.\n동시성 제어 방식 선택도 같은 논리다 — 충돌이 드문 읽기 위주 작업은 버전 컬럼으로 커밋 시점에 충돌만 감지하는 낙관적 Lock, 은행 이체·좌석 예매처럼 충돌이 잦은 쓰기 집약 작업은 SELECT ... FOR UPDATE로 미리 잠그는 비관적 Lock이 적합하다. 클라우드 관리형 DB는 백업·복구·확장을 대신해 주지만, OLTP/OLAP 구분과 권한 설계는 여전히 사용자의 몫이다."
      },
      {
        "term": "SQLD 시험 구조와 준비 전략",
        "desc": "SQLD(SQL 개발자)는 60문항을 90분 안에 풀어 100점 만점에 70점 이상이면 합격하는 자격시험이다. 출제 비중은 데이터 모델링 20%, SQL 기본과 활용 40%, SQL 고급 기능과 성능 40%로 나뉘어, 앞의 모델링보다 실제 쿼리 작성·튜닝 쪽 배점이 압도적으로 크다. 자주 틀리는 지점은 세 가지로 압축된다 — COUNT(*)와 COUNT(컬럼)의 차이(후자는 NULL을 세지 않는다), SELECT에 쓴 컬럼을 GROUP BY에 넣지 않아 생기는 오류, 그리고 NULL이 섞인 연산 결과가 통째로 NULL이 되는 문제다. 실습 환경을 PostgreSQL로 잡아 두면 문제를 눈으로 읽는 대신 직접 돌려 확인할 수 있어 이 세 함정이 몸에 남는다."
      },
      {
        "term": "PostgreSQL의 고유 기능 — 표준 SQL에서 한 걸음 더",
        "desc": "같은 SQL이라도 PostgreSQL에서만 편해지는 기능들이 있다. SERIAL은 자동 증가 정수 컬럼을 한 단어로 만들어 주고, JSONB는 JSON을 파싱된 이진 형태로 저장해 내부 키까지 인덱싱·검색할 수 있게 한다. ARRAY 타입은 한 칸에 여러 값을 담고 UNNEST로 다시 행으로 펼치며, LATERAL JOIN은 오른쪽 서브쿼리가 왼쪽 행의 값을 참조할 수 있게 해 행마다 다른 조건의 조회를 가능하게 한다. MATERIALIZED VIEW는 뷰의 결과를 실제로 저장해 두어 무거운 집계를 즉시 읽게 해 준다(대신 REFRESH가 필요하다). 인덱스도 B-Tree 하나가 아니라 용도별로 나뉘어 — 일반 비교는 B-Tree, JSONB·배열·전문검색은 GIN, 기하·범위 데이터는 GiST, 아주 큰 시계열 테이블에는 블록 요약만 저장해 가벼운 BRIN을 쓴다."
      },
      {
        "term": "SELECT 논리적 처리 순서 — 쓰는 순서와 실행 순서는 다르다 (최진철 교수 교재)",
        "desc": "우리가 SQL을 쓸 때는 SELECT를 맨 앞에 적지만, DBMS가 실제로 처리하는 순서는 FROM으로 대상 테이블을 잡고, WHERE로 행을 거르고, GROUP BY로 묶고, HAVING으로 그룹을 거른 뒤, 그제서야 SELECT로 열과 별칭을 만들고, ORDER BY로 정렬하고, LIMIT으로 개수를 자릅니다.\n즉 작성 순서 1번인 SELECT가 실행 순서로는 5번째입니다.\n이 순서를 모르면 왜 별칭이 WHERE에서 안 먹히는지 설명할 수 없습니다. SELECT에서 만든 별칭은 실행 5단계에 태어나는데 WHERE는 2단계라 그 이름이 아직 존재하지 않기 때문입니다.\n반대로 ORDER BY는 6단계라 별칭을 그대로 쓸 수 있습니다.\n교재는 이를 한국어 어순에 빗대 \"어디서 - 거르고 - 고른다\"로 기억하라고 안내합니다."
      },
      {
        "term": "파일시스템의 한계와 DBMS 3대 기능 — DB를 왜 쓰는가 (최진철 교수 교재)",
        "desc": "데이터를 그냥 파일로 저장하던 시절에는 네 가지 문제가 반복됐습니다.\n첫째 데이터 구조가 프로그램에 종속돼 구조를 바꾸면 코드를 같이 고쳐야 했고, 둘째 파일마다 같은 값이 중복 저장돼 서로 값이 어긋났고, 셋째 값이 규칙에 맞는지를 애플리케이션이 매번 직접 검사해야 했고, 넷째 여러 사람이 동시에 고칠 때 통제가 어렵고 장애가 나면 수동 복구뿐이었습니다.\nDBMS는 이 넷을 각각 논리·물리 데이터 독립성, 통합 관리를 통한 중복 최소화, 제약조건 기반 무결성 보장, 트랜잭션과 로그 기반 자동 복구로 해결합니다.\n뒤에서 배우는 정규화·제약조건·트랜잭션·WAL은 전부 이 네 가지 한계에 대한 답이라는 관점으로 묶어 보면 전체 흐름이 하나로 연결됩니다."
      },
      {
        "term": "DBMS 방언 차이 — 같은 일을 제품마다 다르게 쓴다 (최진철 교수 교재)",
        "desc": "표준 SQL이 있어도 제품마다 표기가 갈리는 지점이 있어서, 실무에서 코드를 옮길 때 이 부분이 먼저 깨집니다.\n행 제한은 PostgreSQL과 MySQL이 LIMIT, Oracle은 ROWNUM 또는 FETCH FIRST, SQL Server는 TOP을 씁니다.\n문자열 연결은 PostgreSQL과 Oracle이 두 개의 세로줄 연산자, MySQL은 CONCAT 함수, SQL Server는 더하기 기호입니다. 자동 증가 키는 SERIAL 또는 IDENTITY, AUTO_INCREMENT, SEQUENCE로 갈립니다.\nLIKE의 대소문자 처리도 PostgreSQL과 Oracle은 항상 구분하는 반면 MySQL과 SQL Server는 콜레이션 설정을 따라가서 기본값이 무시 쪽입니다.\nDDL의 되돌리기도 다릅니다. PostgreSQL은 DROP이나 TRUNCATE를 트랜잭션 안에서 되돌릴 수 있지만 Oracle과 MySQL은 실행 즉시 자동 커밋돼 복구가 안 되므로, 실무는 못 되돌린다고 가정하고 다루는 편이 안전합니다."
      }
    ],
    "examples": [
      {
        "title": "JOIN + GROUP BY/HAVING — 학과별 수강 성적 집계",
        "lang": "sql",
        "code": "-- 학과별 수강 성적 집계: 테이블 3개를 JOIN한 뒤 그룹화한다\nSELECT m.name AS major_name,                 -- 그룹 키: 학과 이름\n       COUNT(DISTINCT s.id) AS student_cnt,  -- 학과별 학생 수(중복 제거)\n       ROUND(AVG(e.score), 1) AS avg_score,  -- 학과별 평균 성적(소수 1자리)\n       MAX(e.score) AS best_score            -- 학과별 최고 성적\nFROM students s                              -- 기준 테이블: 학생\nJOIN majors m ON m.id = s.major_id           -- 학과 정보 붙이기(INNER JOIN)\nJOIN enrollments e ON e.student_id = s.id    -- 수강 내역 붙이기(교차 테이블)\nWHERE e.score IS NOT NULL                    -- 집계 전 행 필터는 WHERE\nGROUP BY m.name                              -- SELECT에는 그룹 키·집계함수만 허용\nHAVING COUNT(*) >= 3                         -- 집계 후 그룹 필터는 HAVING\nORDER BY avg_score DESC;                     -- 평균 성적 높은 학과부터\n\n-- 미수강 학생 찾기: LEFT JOIN은 짝이 없어도 왼쪽 행을 유지한다\nSELECT s.id, s.name                          -- 학생 번호와 이름\nFROM students s                              -- 왼쪽(기준) 테이블\nLEFT JOIN enrollments e                      -- 수강 내역이 없으면 NULL로 채워짐\n       ON e.student_id = s.id                -- 조인 조건\nWHERE e.student_id IS NULL;                  -- NULL만 남기면 미수강자 목록",
        "note": "교재 종합실습 2의 핵심 패턴이다. WHERE는 집계 전 행을 거르고 HAVING은 집계 후 그룹을 거른다는 구분, 그리고 INNER JOIN(교집합)과 LEFT JOIN(왼쪽 유지)의 차이가 SQL 중급의 절반이다. FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY 순서로 처리된다는 점도 기억해 두자."
      },
      {
        "title": "Window Function — 지역별 매출 순위와 전월 대비 증감",
        "lang": "sql",
        "code": "-- 윈도우 함수: GROUP BY와 달리 행을 유지한 채 옆에 분석값을 붙인다\nSELECT region, sales_month, revenue,         -- 원본 행은 그대로 유지\n       ROW_NUMBER() OVER w AS row_num,       -- 동점 무관 고유 번호: 1,2,3,4\n       RANK()       OVER w AS rank_r,        -- 동점 같은 순위, 다음 건너뜀: 1,2,2,4\n       DENSE_RANK() OVER w AS dense_r,       -- 동점 같은 순위, 건너뜀 없음: 1,2,2,3\n       NTILE(4)     OVER w AS tier           -- 매출을 4개 등급 구간으로 분할\nFROM sales                                   -- 매출 테이블\nWINDOW w AS (PARTITION BY region             -- 분석 단위: 지역별로 창을 나누고\n             ORDER BY revenue DESC);         -- 창 안에서 매출 내림차순 정렬\n\n-- LAG: 한 행 이전(전월) 값을 현재 행 옆으로 끌어온다\nSELECT region, sales_month, revenue,         -- 지역·월·당월 매출\n       LAG(revenue, 1) OVER (                -- 1행 이전 값 참조\n         PARTITION BY region                 -- 지역별로 창 구분\n         ORDER BY sales_month                -- 월 순서대로 정렬\n       ) AS prev_rev,                        -- 전월 매출 컬럼\n       revenue - LAG(revenue, 1) OVER (      -- 당월 - 전월 = 증감액\n         PARTITION BY region                 -- 같은 창 정의를 반복 사용\n         ORDER BY sales_month                -- 시간 순 정렬이 핵심\n       ) AS diff                             -- 증감액 컬럼\nFROM sales;                                  -- 행이 줄지 않아 상세+분석을 동시에 본다",
        "note": "교재 15장(분석 함수)의 두 축이다. PARTITION BY는 GROUP BY처럼 단위를 나누지만 행을 합치지 않고 유지한다는 점이 결정적 차이. ROW_NUMBER/RANK/DENSE_RANK의 동점 처리 차이는 면접 단골이고, LAG/LEAD는 전월 대비·전일 대비 분석의 표준 도구다."
      },
      {
        "title": "인덱스 설계·EXPLAIN 튜닝과 트랜잭션 계좌이체",
        "lang": "sql",
        "code": "-- 1) 튜닝 전: 인덱스가 없어 전체 테이블을 훑는다(Seq Scan)\nEXPLAIN ANALYZE                              -- 실행계획 + 실제 수행 시간 측정\nSELECT id, order_date, amount FROM orders    -- 조회 대상\nWHERE customer_id = 42;                      -- 고객 1명 조회인데 Full Scan 발생\n\n-- 2) WHERE 조건 컬럼에 B-Tree 인덱스 생성\nCREATE INDEX idx_orders_customer             -- 인덱스 이름\nON orders (customer_id, order_date);         -- 함께 쓰는 컬럼은 복합 인덱스로\n\n-- 3) 튜닝 후: 같은 쿼리를 다시 떠서 Index Scan으로 바뀌었는지 확인\nEXPLAIN ANALYZE                              -- Before/After 비교가 튜닝의 기본\nSELECT id, order_date, amount FROM orders WHERE customer_id = 42; -- 동일 쿼리\n\n-- 인덱스를 무력화하는 안티패턴 교정\n-- 나쁨: WHERE user_id = '12345'   (타입 불일치 → 형변환 → Full Scan)\n-- 좋음: WHERE user_id = 12345     (컬럼 타입과 값 타입을 일치)\n-- 나쁨: WHERE name LIKE '%길동%'  (앞 와일드카드는 B-Tree 사용 불가)\n-- 좋음: WHERE name LIKE '홍%'     (접두어 검색은 인덱스 사용 가능)\n\n-- 4) 트랜잭션: 이체는 두 UPDATE가 전부 되거나 전부 취소돼야 한다(원자성)\nBEGIN;                                       -- 트랜잭션 시작(없으면 자동 커밋)\nSELECT balance FROM account                  -- 이체 전 잔액 확인\nWHERE id = 'A' FOR UPDATE;                   -- 행 잠금: 동시 수정 차단\nUPDATE account SET balance = balance - 10000 WHERE id = 'A'; -- 출금\nUPDATE account SET balance = balance + 10000 WHERE id = 'B'; -- 입금\nCOMMIT;                                      -- 확정: WAL 로그를 먼저 쓴 뒤 반영\n-- 중간에 오류가 나면 ROLLBACK; 으로 전체를 취소해 일관성을 지킨다",
        "note": "교재 17~21장을 하나의 흐름으로 압축했다. 인덱스는 만들고 끝이 아니라 EXPLAIN ANALYZE로 실제 효과를 검증해야 하고, 타입 불일치·LIKE 앞 % 같은 안티패턴은 인덱스가 있어도 무력화시킨다. 이체 트랜잭션의 FOR UPDATE는 두 세션이 같은 계좌를 동시에 고치는 사고를 막는 실무 필수 장치다."
      },
      {
        "title": "CASE·COALESCE·NULLIF — 요금 등급 분류와 결측 안전 처리",
        "lang": "sql",
        "code": "-- 1) CASE: 월요금 구간별 등급 (위에서부터 평가, 첫 참에서 멈춤)\nSELECT name,                                  -- 가입자 이름\n       monthly_fee,                           -- 월요금\n       CASE                                   -- SQL 안의 if-else\n         WHEN monthly_fee >= 80000 THEN '프리미엄'  -- 8만원 이상\n         WHEN monthly_fee >= 50000 THEN '스탠다드'  -- 5만~8만 미만\n         ELSE '라이트'                        -- 나머지 (ELSE 없으면 NULL)\n       END AS grade                           -- 등급이라는 새 컬럼으로 표시\nFROM subscription;                            -- 통신 가입 테이블\n\n-- 2) NULL 안전 장치: 표시는 COALESCE, 0 나눗셈은 NULLIF\nSELECT name,                                  -- 가입자 이름\n       COALESCE(memo, '메모없음') AS memo_show,      -- NULL이면 기본값으로 표시\n       used_mb / NULLIF(quota_mb, 0) AS usage_ratio  -- 0이면 NULL로 바꿔 에러 대신 NULL 반환\nFROM subscription                             -- 같은 테이블에서\nWHERE memo IS NULL;                           -- NULL 찾기는 = NULL(항상 0건)이 아니라 IS NULL\n\n-- 3) 집계와 NULL: COUNT(*)만 NULL을 센다\nSELECT COUNT(*) AS all_rows,                  -- 전체 행 수 (NULL 포함)\n       COUNT(monthly_fee) AS fee_rows,        -- 값이 있는 행만\n       AVG(monthly_fee) AS avg_fee            -- NULL 제외 평균 (0으로 안 쳐 준다!)\nFROM subscription;                            -- 두 COUNT의 차이 = NULL 개수",
        "note": "최진철 교재 Day1 4교시(단일 테이블 조회)의 통신 도메인 실습 패턴이다. CASE가 첫 참에서 멈춘다는 평가 순서, = NULL이 3값 논리 때문에 항상 0건이라는 함정, COUNT(*)와 COUNT(컬럼)의 차이가 핵심 세 가지다. 백정열 교재도 COALESCE는 SQL 표준, NVL(Oracle)·ISNULL(SQL Server)은 방언이라고 정리한다."
      },
      {
        "title": "서브쿼리 실전 — 평균보다 비싼 가입, EXISTS, 집합 연산",
        "lang": "sql",
        "code": "-- 1) WHERE 절 스칼라 서브쿼리: 전체 평균 요금보다 비싼 가입 찾기\nSELECT name, monthly_fee                      -- 이름과 월요금\nFROM subscription                             -- 가입 테이블\nWHERE monthly_fee > (SELECT AVG(monthly_fee)  -- 서브쿼리가 평균 하나(단일 값)를 반환\n                     FROM subscription);      -- 그 값과 바깥 행을 비교\n\n-- 2) EXISTS: 가입 이력이 하나라도 있는 고객 (행 존재만 확인해 빠르다)\nSELECT c.name                                 -- 고객 이름\nFROM customer c                               -- 고객 테이블\nWHERE EXISTS (SELECT 1                        -- 값은 안 쓰므로 1이면 충분\n              FROM subscription s             -- 가입 테이블에서\n              WHERE s.cust_id = c.cust_id);   -- 바깥 행을 참조 = 상관 서브쿼리\n\n-- 3) 인라인 뷰: FROM 절의 서브쿼리를 임시 테이블처럼 사용\nSELECT p.plan_name, t.avg_fee                 -- 요금제 이름과 평균 요금\nFROM (SELECT plan_id,                         -- 요금제 id별로\n             AVG(monthly_fee) AS avg_fee      -- 평균 요금을 먼저 계산해 두고\n      FROM subscription GROUP BY plan_id) t   -- 별칭 t 필수 (임시 테이블 이름)\nJOIN plan p ON p.plan_id = t.plan_id;         -- 요금제 정보를 붙인다\n\n-- 4) 집합 연산: 2025년과 2026년 모두 가입 이력이 있는 고객\nSELECT cust_id FROM subscription WHERE start_year = 2025  -- 2025년 가입 고객 집합\nINTERSECT                                     -- 교집합 (UNION 합집합, EXCEPT 차집합)\nSELECT cust_id FROM subscription WHERE start_year = 2026; -- 2026년 집합과 겹치는 부분만",
        "note": "백정열 교재 13장(서브쿼리 & 집합 연산자)의 유형 분류를 통신 도메인으로 재구성했다. 스칼라·인라인뷰·상관 서브쿼리의 위치별 구분과, EXISTS가 SELECT 1로 행 존재만 확인해 대용량에서 IN보다 유리하다는 선택 기준이 요점이다. UNION ALL이 UNION보다 빠른 이유(중복 제거 정렬 생략)도 함께 기억해 두자."
      },
      {
        "title": "CTE와 재귀 CTE — 단계별 분해와 조직도 계층 탐색",
        "lang": "sql",
        "code": "-- 1) CTE: 복잡한 쿼리를 이름 붙인 단계로 분해한다\nWITH plan_avg AS (                            -- 1단계: 요금제별 평균 요금 계산\n  SELECT plan_id,                             -- 요금제 id\n         AVG(monthly_fee) AS avg_fee          -- 요금제 안의 평균 요금\n  FROM subscription                           -- 가입 테이블에서\n  GROUP BY plan_id                            -- 요금제 단위로 집계\n)\nSELECT s.name, s.monthly_fee, a.avg_fee       -- 2단계: 원본 행과 평균을 나란히\nFROM subscription s                           -- 가입 테이블\nJOIN plan_avg a ON a.plan_id = s.plan_id      -- CTE를 일반 테이블처럼 JOIN\nWHERE s.monthly_fee > a.avg_fee;              -- 자기 요금제 평균보다 비싼 가입만\n\n-- 2) 재귀 CTE: 자기참조 테이블(조직도)을 위에서 아래로 전부 펼친다\nWITH RECURSIVE org AS (\n  SELECT id, emp_name, manager_id,            -- 직원 기본 정보\n         1 AS depth                           -- 기저 단계: 깊이 1\n  FROM employees                              -- 직원 테이블에서\n  WHERE manager_id IS NULL                    -- 상사가 없는 최상위부터 시작\n  UNION ALL                                   -- 기저 + 재귀 결과를 이어붙인다\n  SELECT e.id, e.emp_name, e.manager_id,      -- 한 단계 아래 직원\n         o.depth + 1                          -- 깊이를 1 늘린다\n  FROM employees e                            -- 직원 테이블과\n  JOIN org o ON o.id = e.manager_id           -- 직전 단계 결과를 연결\n  WHERE o.depth < 10                          -- 무한 재귀 방지 (반드시 필요!)\n)\nSELECT depth, emp_name FROM org ORDER BY depth;  -- 계층 순서대로 출력",
        "note": "백정열 교재 14장의 두 축이다. CTE는 '요금제 평균 만들기 → 평균과 비교하기'처럼 사고 순서 그대로 쿼리를 쓰게 해 주고, 재귀 CTE는 조직도·카테고리 트리 같은 계층 데이터를 기저+재귀 UNION ALL 패턴으로 푼다. depth 제한이 없으면 데이터 오류(순환 참조) 시 무한 루프가 되므로 교재도 '항상 필요'라고 강조한다."
      },
      {
        "title": "VIEW로 가리고 GRANT로 잠그기 — 읽기 전용 계정과 행 단위 보안",
        "lang": "sql",
        "code": "-- 1) 민감 컬럼을 뺀 뷰: 보여줄 것만 골라 담는다\nCREATE OR REPLACE VIEW v_customer_public AS   -- 뷰 = 저장된 SELECT문\nSELECT cust_id, name, join_date               -- 전화번호·식별번호 컬럼은 제외\nFROM customer;                                -- 원본 테이블은 그대로 둔다\n\n-- 2) 읽기 전용 역할(ROLE)을 만들고 필요한 권한만 부여 (최소 권한 원칙)\nCREATE ROLE app_reader NOLOGIN;               -- 로그인 불가 — 권한 묶음 용도\nGRANT SELECT ON v_customer_public TO app_reader;  -- 이 뷰의 SELECT만 허용\n\n-- 3) 실제 접속 계정을 만들어 역할을 상속\nCREATE ROLE app_user LOGIN PASSWORD 'secret'; -- 로그인 가능한 사용자 계정\nGRANT app_reader TO app_user;                 -- 역할 부여: 뷰 조회만 가능해진다\n\n-- app_user로 접속해 보면?\n-- SELECT * FROM v_customer_public;   → 성공 (허용된 뷰)\n-- SELECT * FROM customer;            → 권한 오류 (원본 접근 차단)\n-- DELETE FROM v_customer_public;     → 권한 오류 (SELECT만 허용)\n\n-- 4) 행 단위 보안(RLS): 같은 테이블에서 자기 데이터만 보이게\nALTER TABLE orders ENABLE ROW LEVEL SECURITY; -- 테이블에 RLS 켜기\nCREATE POLICY my_orders ON orders             -- 정책 이름 지정\n  FOR SELECT                                  -- 조회에 적용\n  USING (customer_id =                        -- 행의 고객 id가\n         current_setting('app.customer_id')::int);  -- 세션에 설정된 내 id와 같을 때만 보임",
        "note": "백정열 교재 14장(View의 권한 제어 용도)과 30장(사용자·역할·권한, RLS)을 하나의 시나리오로 연결했다. 권한은 사용자에게 직접 주지 않고 역할로 묶어 부여하는 것, 애플리케이션 계정에 관리자 권한을 주지 않는 것이 최소 권한 원칙의 실천이다. RLS는 멀티테넌시(한 테이블에 여러 고객 데이터)에서 행 자체를 격리하는 마지막 방어선이다."
      },
      {
        "title": "PostgreSQL 실습 10단계 — 정규화부터 인덱스 튜닝까지 (SQLD 대비)",
        "lang": "sql",
        "code": "-- 1) 정규화(1NF): 한 칸에 여러 전화번호를 넣지 말고 테이블을 분리한다\nCREATE TABLE employee (\n  emp_id   SERIAL PRIMARY KEY,          -- 자동 증가 정수 (PostgreSQL 고유)\n  emp_name VARCHAR(50) NOT NULL,\n  dept     VARCHAR(50)\n);\n\nCREATE TABLE employee_phone (\n  phone_id     SERIAL PRIMARY KEY,\n  emp_id       INT REFERENCES employee(emp_id),  -- 외래키로 사원과 연결\n  phone_number VARCHAR(20)\n);\n\n-- 2) 조회: ILIKE는 대소문자를 구분하지 않는 LIKE (PostgreSQL 고유)\nSELECT * FROM employee WHERE emp_name ILIKE '%kim%';\n\n-- 3) JOIN: 분리한 두 테이블을 다시 합쳐 본다\nSELECT e.emp_name, p.phone_number\nFROM employee e\nJOIN employee_phone p ON e.emp_id = p.emp_id;\n\n-- 4) GROUP BY: 부서별 인원수. SELECT에 쓴 dept는 반드시 GROUP BY에도 있어야 한다\nSELECT dept, COUNT(*) AS headcount\nFROM employee\nGROUP BY dept\nHAVING COUNT(*) >= 2;                   -- 집계 결과에 대한 조건은 HAVING\n\n-- 5) 서브쿼리: 전화번호를 하나도 등록하지 않은 사원 찾기\nSELECT emp_name FROM employee e\nWHERE NOT EXISTS (\n  SELECT 1 FROM employee_phone p WHERE p.emp_id = e.emp_id\n);\n\n-- 6) CTE(WITH): 쿼리를 이름 붙인 단계로 나눠 읽기 쉽게 만든다\nWITH dept_count AS (\n  SELECT dept, COUNT(*) AS cnt FROM employee GROUP BY dept\n)\nSELECT * FROM dept_count WHERE cnt > 1;\n\n-- 7) 윈도우 함수: 사원별로 전화번호에 순번을 매긴다\n--    PARTITION BY로 사원마다 번호를 1부터 새로 시작한다\nSELECT emp_id, phone_number,\n       ROW_NUMBER() OVER (PARTITION BY emp_id ORDER BY phone_id) AS seq\nFROM employee_phone;\n\n-- 8) CHECK 제약: 정규표현식으로 전화번호 형식을 DB가 직접 검사하게 한다\nALTER TABLE employee_phone\n  ADD CONSTRAINT chk_phone CHECK (phone_number ~ '^010-[0-9]{4}-[0-9]{4}$');\n\n-- 9) 트랜잭션: 잘못 지웠을 때 되돌릴 수 있다\nBEGIN;\nDELETE FROM employee WHERE dept = 'temp';\nROLLBACK;                               -- 취소. 확정하려면 COMMIT\n\n-- 10) 인덱스와 실행계획: 만들기 전후를 반드시 비교한다\nCREATE INDEX idx_employee_dept ON employee(dept);\nEXPLAIN ANALYZE SELECT * FROM employee WHERE dept = 'AI';\n-- Seq Scan(전체 훑기)이 Index Scan으로 바뀌고 실행 시간이 줄었는지 확인",
        "note": "SQLD 학습자료의 실습 흐름을 PostgreSQL 문법으로 재구성했다. 1NF 분리에서 시작해 조회·조인·집계·서브쿼리·CTE·윈도우 함수로 올라간 뒤 제약·트랜잭션·인덱스로 마무리하는 순서라, 각 단계가 앞 단계의 결과물 위에서 돌아가 개념이 끊기지 않는다. 특히 10단계의 EXPLAIN ANALYZE Before/After 비교는 튜닝을 감이 아니라 측정으로 하는 습관의 출발점이다."
      },
      {
        "title": "실습 환경 트러블슈팅 — PostgreSQL 비밀번호와 DBeaver 설정 (7/20)",
        "lang": "text",
        "code": "[0] 설치 여부 먼저 확인 — 파이썬 1일차 환경구성 스크립트로 PostgreSQL 17이 이미 깔렸을 수 있다\n  터미널에서:  postgres -V\n  버전이 나오면 다시 설치할 필요 없다.\n\n[1] postgres 계정 비밀번호가 없어 접속이 안 될 때\n  터미널에서 psql에 먼저 붙는다\n    psql postgres\n  프롬프트가 바뀌면 비밀번호를 지정한다\n    ALTER USER postgres PASSWORD 'your_password';\n  빠져나온다\n    \\q\n  이제 DBeaver 연결 설정에 사용자 postgres / 비밀번호 your_password 를 입력하면 붙는다.\n\n[2] DBeaver에 내가 만든 데이터베이스가 안 보일 때 (가장 많이 막히는 지점)\n  증상: CREATE DATABASE telecom; 으로 만들었는데 목록에 postgres만 보인다\n  원인: DBeaver 기본 설정이 접속한 DB 하나만 표시하도록 되어 있다\n  해결: 연결 우클릭 → Edit Connection → PostgreSQL 탭 → \"Show all databases\" 체크 → 저장 후 재연결\n\n[3] DBeaver를 한글 화면으로 쓰고 싶을 때\n  DBeaver Community → Preferences → User Interface → Language → Korean 선택\n\n[4] 수업 운영 (울산캠퍼스 기준)\n  · 교재: tinyurl.com/sk-database → \"수강생 배포용 교재 모음\" (3일 과정 내내 사용)\n  · 1일차 테스트: QUIZ + 코드분석, 17:45~18:00 진행\n    - 링크는 17:40~17:45 사이에 채널 공유\n    - 접속 시 gmail 계정 정보 입력 필수\n  · Day1 퀴즈 제출 마감 18:00 — 시간 초과 시 대폭 감점, 제출 후 수정 불가",
        "note": "스마트 데이터베이스 첫날 실습에서 실제로 나온 막힘 지점과 해결책을 모았다. DBeaver의 \"Show all databases\"는 특히 원인을 짐작하기 어려운 항목이라 — 쿼리는 성공했는데 화면에만 안 보이니 DB 생성이 실패한 줄 오해하기 쉽다 — 만든 DB가 안 보이면 무조건 이 설정부터 확인하는 것이 빠르다."
      },
      {
        "title": "처리 순서 체감 — 별칭은 WHERE에서 왜 안 되고 ORDER BY에서는 되는가 (최진철 교수 교재)",
        "lang": "sql",
        "code": "-- 실패하는 쿼리: SELECT에서 만든 별칭을 WHERE에서 바로 쓴다\n-- WHERE는 실행 2단계, 별칭은 실행 5단계에 생기므로 이름이 아직 없다\nSELECT plan_name, monthly_fee * 12 AS yearly_fee\nFROM plan\nWHERE yearly_fee > 600000;   -- 오류: column yearly_fee does not exist\n\n-- 해결 1: WHERE에는 별칭이 아니라 계산식을 그대로 다시 적는다\nSELECT plan_name, monthly_fee * 12 AS yearly_fee\nFROM plan\nWHERE monthly_fee * 12 > 600000\nORDER BY yearly_fee DESC;    -- ORDER BY는 실행 6단계라 별칭 사용 가능\n\n-- 해결 2: 인라인 뷰로 별칭을 먼저 확정한 뒤 바깥에서 거른다\nSELECT plan_name, yearly_fee\nFROM (\n  SELECT plan_name, monthly_fee * 12 AS yearly_fee\n  FROM plan\n) AS t                       -- 안쪽이 먼저 끝나 별칭이 실체가 된다\nWHERE yearly_fee > 600000\nORDER BY yearly_fee DESC\nLIMIT 5;                     -- LIMIT은 실행 7단계, 정렬 뒤에 잘린다\n\n-- 그룹 필터도 같은 원리: WHERE는 행을, HAVING은 묶인 그룹을 거른다\nSELECT data_gb, count(*) AS cnt, avg(monthly_fee) AS avg_fee\nFROM plan\nWHERE monthly_fee > 0        -- 2단계: 묶기 전에 행을 먼저 거른다\nGROUP BY data_gb             -- 3단계: 데이터 용량별로 묶는다\nHAVING count(*) >= 2         -- 4단계: 묶은 결과를 거른다\nORDER BY avg_fee DESC;       -- 6단계: 마지막에 정렬한다",
        "note": "별칭 오류는 초급자가 가장 자주 만나는 에러인데, 원인이 문법이 아니라 처리 순서라는 점이 핵심입니다.\n해결 1은 짧지만 계산식이 중복되고, 해결 2는 길지만 식이 한 곳에만 있어 유지보수가 낫습니다.\nWHERE와 HAVING을 헷갈릴 때도 같은 순서표를 떠올리면 바로 정리됩니다."
      },
      {
        "title": "제약조건으로 잘못된 값을 입구에서 막기 — CHECK·DEFAULT·UNIQUE (최진철 교수 교재)",
        "lang": "sql",
        "code": "-- 시드 데이터를 보호하려고 연습용 테이블은 별도 스키마에 만든다\nCREATE SCHEMA IF NOT EXISTS lab;\n\n-- 요금제 연습 테이블: 타입 + 제약을 함께 정의해 품질을 입구에서 보장\nCREATE TABLE lab.plan_practice (\n  plan_id     integer PRIMARY KEY,              -- 중복 금지 + 빈값 금지\n  plan_name   varchar(40) NOT NULL UNIQUE,      -- 빈값 금지 + 중복 금지\n  monthly_fee integer NOT NULL\n                CHECK (monthly_fee >= 0),       -- 음수 요금 자체를 차단\n  data_gb     integer NOT NULL DEFAULT 0\n                CHECK (data_gb >= -1),          -- -1은 무제한 약속값\n  status      varchar(10) NOT NULL DEFAULT :active_default\n                CHECK (status IN (:s1, :s2, :s3)),  -- 허용값만 통과\n  created_at  timestamp NOT NULL DEFAULT now()  -- 누락 시 현재시각 자동\n);\n\n-- 정상 입력: DEFAULT가 status와 created_at을 알아서 채운다\nINSERT INTO lab.plan_practice (plan_id, plan_name, monthly_fee, data_gb)\nVALUES (1, :name_a, 39000, 10);\n\n-- 위반 관찰 1: 음수 요금 -> CHECK 제약 위반으로 거부된다\nINSERT INTO lab.plan_practice (plan_id, plan_name, monthly_fee)\nVALUES (2, :name_b, -1000);\n\n-- 위반 관찰 2: 요금제명 중복 -> UNIQUE 제약 위반으로 거부된다\nINSERT INTO lab.plan_practice (plan_id, plan_name, monthly_fee)\nVALUES (3, :name_a, 55000);\n\n-- 실제로 무엇이 막았는지 제약 목록으로 확인한다 (contype: p키 u유일 c검사)\nSELECT conname, contype FROM pg_constraint WHERE conrelid = 'lab.plan_practice'::regclass;",
        "note": "PK는 중복과 빈값을 둘 다 막고, UNIQUE는 중복만, NOT NULL은 빈값만 막는다는 역할 분담을 먼저 잡아야 합니다.\nCHECK는 잘못된 값을 막고 DEFAULT는 누락을 합리적 기본값으로 채우는 짝이라, 둘을 함께 쓰면 입력 시점부터 품질이 확보됩니다.\n문자열 리터럴은 실습 시 콜론 자리표시자 대신 작은따옴표로 직접 넣어 실행하세요."
      },
      {
        "title": "울산 분반 운영 차이 — 배포 자료 대조 메모 (최진철 교수 교재)",
        "lang": "text",
        "code": "[대조 결과 요약]\n통합본 성격의 강의 덱과 울산 배포용 5종을 맞대어 본 결과,\n커리큘럼 자체의 차이는 발견되지 않았습니다. 다만 문서 계층이 다릅니다.\n\n1) 커리큘럼 - 동일\n   3일 과정, 2026-07-20(월) ~ 07-22(수)\n   Day1 설계의 기초 / Day2 관계형 데이터 탐험 / Day3 성능의 예술\n   각 Day 4교시 편성(Day3는 3교시 + 마무리) + 종합 실습\n   교재는 T1 핵심 / T2 심화 / T3 확장 / T4 실습 네 트랙\n   T2 심화와 T3 확장은 3일차 과정 종료 시에 배포\n\n2) 실습 데이터 - 동일\n   통신(telecom) 도메인 단일, seed 스크립트 4개\n   00_schema.sql   테이블 4종 생성\n   01_seed_core.sql 고객 500 / 가입 800 / 사용로그 약 9만\n   03_account.sql   계좌 4행, Day2 트랜잭션 동시성 전용\n   02_seed_bulk.sql 사용로그 약 300만, Day3 당일에만 적재\n   적재 순서 원칙: 00 -> 01 (Day1), +03 (Day2), +02 (Day3)\n   대용량을 미리 넣으면 Day1~2 조회가 느려지므로 순서 준수\n   조회/적재/ERD는 public, DDL/DML 연습은 lab 스키마로 분리\n\n3) 문서 계층 - 여기서 차이가 난다\n   통합본 덱은 T1 본문(강의 이론)만 담고 있고,\n   종합실습 과제/평가/제출 규정에 대한 언급이 전혀 없습니다.\n   반면 울산 배포용에는 운영 문서가 별도로 붙어 있습니다.\n   - 02 과정안내: 3일 일정표, 사전 준비물, 트랙 연계표\n   - 04 종합실습가이드: 과제 전문, 평가 배점, 제출 규정\n   - 05 실습데이터가이드: 5단계 적재 절차와 트러블슈팅 10종\n   또한 통합본 용어집에는 강사 전용 자료에만 나오는 약어가\n   포함돼 있어, 통합본은 강사 마스터 계열,\n   울산 5종은 수강생 배포본 계열로 보입니다.\n\n4) 평가 체계 - 울산 배포본에서만 확인됨\n   총 200점 = 개인 100 + 조별 100\n   A 퀴즈와 코드분석 60점: Day별 20점, 매일 17:45~18:00 15분\n                          회당 퀴즈 15 + 코드해석 5\n   B 개인 과제 40점: 정규화 워크시트 20 + 단일 테이블 조회 20\n   C 조별 과제 100점: 실무 SQL 6문항 60 + 종합 튜닝 40\n                      Day2 4문항 + Day3 2문항, 팀 공통 100%\n   루브릭 4축: 정확성 / 효율성 / 가독성 / 증빙\n\n5) 제출 규정\n   제출처: 반별 담당 교수님 Slack DM\n   형식: 작성 도구는 자유, 최종 산출물은 PDF로 변환\n   파일명 개인: [반][번호][이름][DAYn][과제명].pdf\n   파일명 조별: [반][x조][DAYn][과제명].pdf\n   마감: Day1~3 종합실습 모두 Day3 종료일까지, 이후는 평가 제외\n   감점: 쿼리 없이 결과만 제출, 불필요 컬럼 과다, 문항 누락\n   Day3는 EXPLAIN before/after 캡처가 없으면 개선 증명 불가로 감점\n\n[운영 시 주의]\n실습 도구는 DBeaver로 통일합니다.\npgAdmin이 PostgreSQL 설치 시 함께 깔리지만 본 과정에서는 쓰지 않습니다.\nPostgreSQL 버전은 17로 고정합니다.\n포트는 5432가 기본이나 설치 값에 따라 5433이 될 수 있어,\n접속이 거부되면 설치 때 지정한 포트를 먼저 확인해야 합니다.",
        "note": "분반별로 배우는 내용이 달라지는 것이 아니라, 배포되는 문서의 층위가 다릅니다.\n수강생 질문이 과제 배점이나 제출 형식으로 들어오면 이론 덱이 아니라 종합실습 가이드 쪽을 근거로 답해야 합니다.\n제출 마감이 Day별이 아니라 3일차 종료일 일괄이라는 점은 특히 오해가 잦으니 초반에 짚어 주는 편이 좋습니다."
      }
    ]
  },
  "stats": {
    "concepts": [
      {
        "term": "모집단과 표본 — 기술통계에서 추론통계로",
        "desc": "모집단(Population)은 알고 싶은 대상 전체, 표본(Sample)은 그중 실제로 관측한 일부다. 전체를 다 조사할 수 없으니 표본의 평균·분산 같은 통계량으로 모집단의 모수를 추정하는 것이 추론통계이고, 그 전에 표본 자체를 요약·시각화해 특징을 파악하는 것이 기술통계다.\n교재는 순서를 강조한다 — 추정과 검정에 들어가기 전에 반드시 탐색적 데이터 분석(EDA)을 먼저 하라. 데이터의 생김새(분포·결측·이상치)를 모른 채 만든 분석 모형과 결과는 신뢰하기 어렵기 때문이다."
      },
      {
        "term": "평균 vs 중앙값, 그리고 퍼짐(분산·표준편차·IQR)",
        "desc": "평균은 모든 값을 반영하지만 이상치(Outlier)에 민감하고, 중앙값은 크기 순으로 가운데 값이라 이상치에 강건(Robust)하다. 교재 예시처럼 {1,2,2,3,4,7,15}에 79 하나만 추가돼도 평균은 4.9에서 14.1로 튀지만 중앙값은 3에서 3.5로 거의 움직이지 않는다.\n중심만으로는 부족하고 퍼짐을 함께 봐야 한다. 분산·표준편차는 평균에서 떨어진 정도를, 사분위수와 IQR(Q3-Q1)은 가운데 50%가 퍼진 폭을 나타내며, Q3 + 1.5×IQR을 넘는 값을 이상치 후보로 잡는 것이 박스플롯의 기준이다. 분포의 비대칭은 왜도, 뾰족함은 첨도로 측정한다."
      },
      {
        "term": "정규분포와 표준화(Z변환)",
        "desc": "정규분포 N(μ, σ²)은 평균을 중심으로 좌우대칭인 종 모양 분포로, 평균=중앙값=최빈값이 일치하고 곡선 아래 전체 면적이 1(확률)이다. 평균에서 표준편차 1배 안에 약 68%, 2배 안에 약 95%의 데이터가 들어온다는 성질 덕분에 \"이 값이 얼마나 드문 값인가\"를 확률로 말할 수 있다.\n단위가 다른 변수끼리 비교하려면 평균 0, 표준편차 1로 맞추는 Z변환(표준화)을 쓴다. 표준화는 집단 간 비교뿐 아니라 분석 모형을 만들 때 변수 간 스케일 차이의 효과를 제거하는 전처리로도 필수다."
      },
      {
        "term": "가설검정과 p-value — 표본으로 하는 통계적 의사결정",
        "desc": "가설검정은 \"차이가 없다·효과가 없다\"는 귀무가설(H0)을 세워 놓고, 표본 데이터가 그 가정과 얼마나 어긋나는지를 확률로 재는 절차다. p-value는 귀무가설이 맞다고 가정할 때 지금 관측된 정도의 차이가 우연히 나올 확률이며, 유의수준(보통 0.05)보다 작으면 귀무가설을 기각하고 대립가설을 채택한다.\n교재의 회귀분석 해석이 좋은 예다 — 쿠폰배포매수의 p값이 0.05보다 작아 \"영향을 주지 않는다\"는 귀무가설을 기각(유의)하고, 판매가격은 p값 0.81로 귀무가설을 채택해 변수에서 제거한다. p-value는 효과의 크기가 아니라 우연 가능성의 척도라는 점을 혼동하지 말자."
      },
      {
        "term": "상관은 인과를 함축하지 않는다",
        "desc": "상관계수는 두 연속형 변수의 선형 관계 강도를 -1(완전한 음의 관계)부터 +1(완전한 양의 관계) 사이 하나의 수로 요약하며, 공분산을 두 변수의 표준편차로 나눠 표준화한 값이다. 0이면 선형 관계가 없다는 뜻일 뿐, 곡선 관계는 잡아내지 못하므로 반드시 산점도를 함께 봐야 한다.\n교재가 원문 그대로 강조하는 문장 — Correlation doesn't imply Causation. X와 Y의 상관이 높다고 X가 Y의 원인인 것은 아니다. 제3의 변수가 둘 다에 영향을 줬을 수도, 우연의 일치일 수도 있다. 상관분석은 예측·분류 모형에 넣을 유의미한 변수를 고르는 탐색 도구로 쓰고, 인과 주장은 별도의 근거가 필요하다."
      },
      {
        "term": "회귀분석 — 기본 가정과 결과 해석 3단계",
        "desc": "상관분석이 관계를 하나의 값으로 요약한다면, 회귀분석은 관계를 y = a·x + b라는 수식으로 표현해 예측과 요인 해석까지 가능하게 한다. 전제는 독립변수와 종속변수의 관계가 직선(선형성)이라는 것 — 산점도로 먼저 확인하고, 만족하지 않으면 로그변환을 하거나 그 변수를 제거한다. 독립변수끼리 상관이 높으면(다중공선성) 중복 변수를 미리 걸러낸다.\n결과 해석은 3단계다. ① 적합성: 결정계수(Adj. R²)가 0.735라면 모형이 종속변수 변동의 73.5%를 설명한다. ② 모형 유의성: F검정의 p가 0.05 미만이면 회귀모형 자체가 유의하다. ③ 계수 유의성: 각 계수의 p값을 보고 유의하지 않은 변수는 제거한 뒤 회귀식을 다시 만든다."
      },
      {
        "term": "개념적 정의와 조작적 정의 — 분석은 측정 가능한 문장에서 출발",
        "desc": "개념적 정의는 알고 싶은 것을 추상적으로 서술한 문장이고(\"정상 범위를 벗어날수록 설비가 멈출 가능성이 높다\"), 조작적 정의는 그것을 실제로 측정·관찰할 수 있는 형태로 바꾼 것이다. 교재의 공정 센서 사례가 전형이다 — 정상 기간의 평균과 표준편차로 z값을 구해 '정상 범위 이탈 지수(0~4점 척도)'로 변환하는 순간, 막연한 가설이 계산 가능한 변수가 된다.\n조작적 정의가 서야 그다음 작업인 변수 정의, 분석 단위 설정(개인·가구·상품·기간 등), 척도화가 진행된다. 같은 전력 데이터라도 발전 계획에는 1시간 평균을, 실시간 수요 대응에는 순시 데이터를 쓰듯, 분석 단위는 비즈니스 목적이 결정한다."
      },
      {
        "term": "분석 방법론 6단계 — 비즈니스 이해에서 시스템 적용까지",
        "desc": "교재는 분석 프로젝트를 비즈니스 이해 → 가설 수립(데이터 이해) → 데이터 준비 → 분석 모델 정의 → 모델 평가 → 시스템 적용의 6단계로 체계화한다. 각 단계는 절차·방법·도구·산출물(데이터 정의서, 분석 결과서, 모델 평가서 등)로 정리되며, 분석 기법 선택이나 코딩은 이 흐름의 일부일 뿐이다.\n단계별 핵심 질문도 정해져 있다 — 데이터 준비에서는 이상치·결측치 처리와 파생변수 로직을, 모델 정의에서는 EDA로 확인한 분포·관계를 근거로 알고리즘 선정을, 모델 평가에서는 비즈니스 관점의 평가와 배포 후 모니터링(성능 저하·데이터 변화 감지) 계획까지 묻는다. 모델을 만들고 끝이 아니라 운영까지가 방법론의 범위다."
      },
      {
        "term": "척도의 4수준 — 명목·순서·구간·비율",
        "desc": "같은 숫자라도 측정 수준이 다르면 할 수 있는 연산이 다르다. 명목척도는 구분만 하는 기호(등번호, 성별=1/2), 순서척도는 순서까지 있는 값(1등·2등·3등, 등급), 구간척도는 간격이 산술적 의미를 갖지만 0이 '없음'이 아닌 값(온도 0도, 서기 0년), 비율척도는 절대영점이 있어 비율 비교까지 가능한 값(몸무게 0kg, 소요시간 0초)이다. 합격=1/불합격=0처럼 두 상태만 구분하면 이진척도다.\n척도는 분석 기법 선택의 열쇠다 — 독립·종속변수가 각각 범주형인지 연속형인지에 따라 교차분석, 판별분석, 상관분석, 회귀분석으로 갈라진다. 평균을 낼 수 있는 척도인지부터 확인하는 습관이 잘못된 통계량 계산을 막아 준다."
      },
      {
        "term": "변수의 유형 — 독립·종속·매개·통제, 그리고 파생변수",
        "desc": "원인이 되는 독립변수(X, Feature)와 결과가 되는 종속변수(Y, Target) 외에도 두 유형이 더 있다. 매개변수는 독립변수가 종속변수에 영향을 주는 경로의 중간에 끼는 변수(스마트폰 사용 시간 → 수면시간 → 학업성적)이고, 통제변수는 보려는 효과를 정확히 재기 위해 고정하는 변수(운동 시간과 체중 감소를 볼 때 식이조절 여부)다.\n파생변수는 원천 데이터를 조작적 정의에 따라 조합해 새로 만든 변수다 — 거래 데이터에서 '매출액 합계'를 만들거나, '구매 2건 이상이고 합계 500원 이상이면 A등급' 같은 규칙으로 '고객등급'을 만드는 식이다. 비즈니스 로직이 들어가므로 생성 규칙을 주석·문서로 남기는 것이 필수이고, 업무 담당자와의 협의가 품질을 좌우한다."
      },
      {
        "term": "결측치·이상치 처리 — 지우기 전에 비즈니스 관점부터",
        "desc": "결측치(NA) 처리는 크게 두 갈래다 — 분석에서 제외하거나, 0·평균·이동평균 같은 대표값·트렌드값으로 대체한다. 교재가 강조하는 순서는 기술이 아니라 판단이다: 제외해도 되는지 비즈니스 관점에서 반드시 검토하고, 어떤 항목을 어떻게 처리했는지 반드시 공유·기록하라. 어떤 방법을 써도 정보 손실과 왜곡 가능성은 남기 때문이다.\n이상치도 박스플롯 기준(IQR 1.5배)을 벗어났다고 기계적으로 지우면 안 된다. 분석 목적에 필요한 데이터인지 먼저 판단해야 하며, 이상거래 탐지(Fraud Detection) 같은 주제에서는 이상치가 삭제 대상이 아니라 바로 분석 대상이다. 이 경우 정상/비정상의 정의와 이상치 구분용 파생변수 설계가 먼저다."
      },
      {
        "term": "데이터 변환 — Min-Max 정규화·로그변환·더미변수",
        "desc": "Z변환 외에도 자주 쓰는 변환이 세 가지 있다. Min-Max 정규화는 (관측값-최소)/(최대-최소)로 모든 값을 0~1 구간에 넣어 스케일 차이를 제거한다. 로그·제곱근 변환은 소득이나 SNS 연결 수처럼 오른쪽 꼬리가 긴 분포를 대칭에 가깝게 펴서, 정규분포를 가정하는 기법(회귀분석, t-검정, ANOVA 등)을 쓸 수 있게 해 준다.\n연속형을 구간으로 자르는 이산형화(체중 49kg → '하' 그룹)와, 범주형을 0/1 컬럼으로 펴는 이항변수화(더미변수)도 변환의 일종이다. 이산형화는 구간 경계의 근거(분포, 변곡점)를 남겨야 하고, 더미변수는 범주 수보다 1개 적게 만들어야 한다 — 요일 7개면 더미 6개, 전부 만들면 완전한 중복이 생기는 Dummy Trap에 빠진다."
      },
      {
        "term": "로지스틱 회귀 — 확률로 답하는 회귀",
        "desc": "시험 점수로 합격 '가능성'을 선형회귀로 예측하면 10점에서 -20%, 110점에서 120% 같은 불가능한 값이 나온다. 로지스틱 회귀는 S자 모양의 시그모이드 곡선으로 출력을 0~1 사이에 가둬, 결과를 확률로 해석할 수 있게 만든 회귀다. 종속변수가 연속형이면 선형회귀, 합격/불합격·정상/이상거래처럼 범주형(명목형)이면 로지스틱 회귀 — 이것이 두 기법을 가르는 기준이다.\n종속변수 값이 2개면 이항 로지스틱(대출 가능/불가), 3개 이상이면 다항 로지스틱(승인/거절/보류)으로 나뉜다. 교재의 예시처럼 개인 신용도와 사용금액으로 이상거래 여부를 예측하는 문제가 전형적인 활용이며, 담당 과목의 분류(Classification) 모델로 이어지는 다리 역할을 한다."
      },
      {
        "term": "정규성 검정과 등분산 검정은 다르다",
        "desc": "두 개념이 자주 뒤섞이는데 목적이 다르다. 정규성 검정은 데이터가 정규분포를 따르는지 보는 것이고, 등분산 검정(레빈 검정, Levene)은 비교하려는 두 집단의 퍼짐 정도(분산)가 비슷한지를 보는 것이다. 등분산 검정을 먼저 하는 이유는 그 결과에 따라 t-검정의 방식을 고르기 위해서다 — p값이 0.05 이상이면 등분산이 성립한다고 보고 일반 t-검정을, 0.05 미만이면 등분산이 깨진 것으로 보고 웰치(Welch) t-검정(equal_var=False)을 쓴다. 수업 실습에서 레빈 검정만 수행한 것은 검정 방식을 고르기 위한 절차였고 정규성 검정은 생략한 것이다."
      },
      {
        "term": "회귀 summary 판독과 평가지표 고르기",
        "desc": "OLS 결과표는 위에서부터 이렇게 읽는다 — R-squared는 모델이 데이터를 설명하는 비율, Adj. R-squared는 독립변수가 2개 이상일 때 변수 개수를 감안해 보정한 값이라 변수를 여럿 쓸 때는 이쪽을 본다. const의 coef는 모든 독립변수가 0일 때의 기준값이고, 각 변수의 coef는 다른 변수를 고정했을 때 그 변수 1단위 변화가 예측값에 주는 영향이다. P>|t|는 그 변수가 의미 있는지를 알려 주며 0.05 미만인 변수만 남기고 나머지는 빼고 다시 돌린다. 예측 성능 지표는 용도가 갈린다 — R2는 예측용으로 쓸 거면 0.8 이상을 권하고, MSE는 오차를 제곱해 단위가 원래 값과 달라지므로 보고서에 쓰지 않고 최적값을 찾는 계산 과정에만 쓴다. 보고용으로는 단위가 그대로 유지되는 MAE를 권하며, RMSE는 큰 오차에 더 민감해 이상치가 있을 때 MAE와 눈에 띄게 다른 값이 나온다 — 두 값의 차이 자체가 이상치 존재의 신호다."
      },
      {
        "term": "Baseline과 개선율 — 모델이 \"잘한 것\"의 기준선",
        "desc": "R2가 0.88이라는 숫자 하나만으로는 모델이 쓸모 있는지 알 수 없다. 그래서 아무 것도 학습하지 않은 가장 단순한 예측기(Baseline)를 먼저 만들어 놓고 그보다 얼마나 나아졌는지를 본다. 회귀에서 흔한 Baseline은 \"무조건 학습 데이터의 평균값으로 예측한다\"이다. 여기에 MAPE(평균 절대 백분율 오차 — 오차를 실제값으로 나눠 퍼센트로 본 뒤 평균낸 값)를 재고, 개선율은 (Baseline 오차 - 모델 오차) / Baseline 오차로 계산한다. 중고차 가격 예측 실습의 참고 기준값은 Baseline MAPE 약 338%, 모델 MAPE 약 67%, 개선율 약 80%였다 — Baseline MAPE가 세 자리로 큰 이유는 값이 싼 차에서 오차 비율이 폭발하기 때문이며, 이것이 바로 평균 예측의 한계를 보여 준다. 보고서에는 반드시 Baseline과 모델을 나란히 적어야 \"그래서 얼마나 좋아졌는가\"에 답할 수 있다."
      },
      {
        "term": "로그 변환과 스케일링의 규율 — fit은 train에만, 예측값은 되돌린다",
        "desc": "가격처럼 오른쪽 꼬리가 긴(왜도가 큰) 종속변수는 그대로 회귀하면 비싼 차 몇 대에 모델이 끌려간다. 이때 np.log1p로 로그 세상으로 옮겨 학습하면 분포가 대칭에 가까워져 성능이 크게 오른다. 다만 예측 결과는 로그 세상의 값이므로 짝인 np.expm1로 반드시 원래 단위로 되돌린 뒤에 평가해야 한다 — 이 역변환을 빠뜨리면 오차가 터무니없이 작게 나와 스스로를 속이게 된다. 스케일링에도 규율이 있다. 스케일러는 학습 데이터로만 fit_transform하고 테스트 데이터에는 transform만 적용한다. 테스트 데이터로도 fit하면 평가에 쓸 정보가 학습 과정에 새어 들어가는 데이터 누수가 되어 실제보다 좋은 성능이 찍힌다. 마지막으로 역변환한 예측값에 음수가 섞일 수 있는데, 가격은 음수가 될 수 없으므로 0으로 보정한 뒤 지표를 계산한다."
      },
      {
        "term": "비용함수(Cost/MSE)는 왜 U자 곡선이 되는가 (판교 7반 김일한 교수 자료)",
        "desc": "회귀에서 기울기 w를 하나 정하면 예측값이 정해지고, 실제값과의 차이(오차)도 정해집니다. 이 오차를 제곱해서 평균낸 값이 비용(cost)이고 흔히 MSE라고 부릅니다. 제곱하는 이유는 오차가 위로 나든 아래로 나든 똑같이 벌점을 주기 위해서이고, 덤으로 크게 틀린 예측에 더 큰 벌점이 붙습니다. w를 아주 작은 값부터 큰 값까지 조금씩 바꿔가며 cost를 찍어보면 그릇을 엎어놓은 듯한 U자 곡선이 나타나는데, 이 그릇의 가장 밑바닥에 해당하는 w가 바로 우리가 찾는 최적의 기울기입니다. 회귀 학습이란 결국 이 U자 골짜기의 바닥을 찾아가는 일입니다."
      },
      {
        "term": "경사하강법 — 미분한 기울기와 학습률로 w와 b를 조금씩 고치기 (판교 7반 김일한 교수 자료)",
        "desc": "비용 곡선의 바닥을 한 번에 찾는 대신, 아무 데서나 출발해 한 걸음씩 내려가는 방법이 경사하강법입니다. 지금 서 있는 자리에서 곡선의 접선 기울기(미분값)를 구하면 어느 쪽이 오르막인지 알 수 있고, 그 반대 방향으로 가면 내리막입니다. 갱신 규칙은 간단히 말해 새로운 w는 지금의 w에서 학습률 곱하기 기울기를 빼는 것이며, 절편 b도 같은 방식으로 함께 고칩니다. 학습률은 한 걸음의 보폭인데, 너무 크면 골짜기를 뛰어넘어 발산하고 너무 작으면 도착하기 전에 반복이 끝나버립니다. 바닥에 가까울수록 기울기가 0에 가까워져 걸음폭이 저절로 줄어드는 것이 이 방법의 묘미입니다."
      },
      {
        "term": "공분산과 상관계수 — 최소제곱 회귀계수 공식의 뿌리 (판교 7반 김일한 교수 자료)",
        "desc": "공분산은 두 변수가 각자의 평균에서 얼마나 벗어났는지(편차)를 서로 곱해서 평균낸 값입니다. 두 변수가 함께 커지고 함께 작아지면 곱이 양수로 쌓여 공분산이 양수가 되고, 반대로 움직이면 음수가 되며, 방향이 뒤죽박죽이면 양수와 음수가 상쇄되어 0에 가까워집니다. 다만 공분산은 단위에 휘둘려서 kg으로 재느냐 g으로 재느냐에 따라 값이 통째로 달라지므로, 각 변수의 표준편차로 나누어 -1에서 1 사이로 표준화한 것이 상관계수입니다. 중요한 점은 단순선형회귀의 기울기 추정식이 정확히 x와 y의 편차곱 합을 x의 편차제곱 합으로 나눈 형태, 즉 공분산을 x의 분산으로 나눈 값이라는 것입니다. 상관을 이해하면 회귀계수가 어디서 튀어나온 숫자인지 저절로 풀립니다."
      },
      {
        "term": "다중선형회귀에서 변수를 늘리기 전에 점검할 것들 — 다중공선성과 VIF (판교 7반 김일한 교수 자료)",
        "desc": "독립변수를 여러 개 넣으면 설명력은 올라가는 것처럼 보이지만, 변수끼리 서로 너무 닮아 있으면 문제가 생깁니다. 예를 들어 키(cm)와 키(inch)를 함께 넣으면 두 변수 중 누가 얼마나 기여했는지 모델이 판단할 수 없어 회귀계수가 크게 흔들리고 부호까지 뒤집히기도 하는데, 이를 다중공선성이라 합니다. 진단은 상관계수 히트맵으로 눈으로 보고, 숫자로는 VIF(분산팽창계수)를 계산해 보통 10을 넘으면 위험 신호로 봅니다. 조치는 겹치는 변수 중 하나를 빼거나 두 변수를 합쳐 새 지표를 만드는 것입니다. 이 밖에도 잔차의 독립성(더빈-왓슨), 등분산성, 잔차 정규성, 영향점(쿡의 거리)까지 함께 살펴야 안심하고 계수를 해석할 수 있습니다."
      }
    ],
    "examples": [
      {
        "title": "기술통계 — 평균 vs 중앙값, IQR 이상치, 분포 모양",
        "lang": "python",
        "code": "import pandas as pd                           # 표 데이터 처리 라이브러리\n\n# 교재 예시: 극단값 하나가 평균을 얼마나 흔드는지 확인\nx = pd.Series([1, 2, 2, 3, 4, 7, 15])         # 원래 데이터\ny = pd.Series([1, 2, 2, 3, 4, 7, 15, 79])     # 이상치 79가 추가된 데이터\nprint(x.mean(), x.median())                   # 평균 4.86 / 중앙값 3\nprint(y.mean(), y.median())                   # 평균 14.13으로 급등 / 중앙값 3.5는 안정\n# 평균은 이상치에 민감, 중앙값은 강건(Robust) — 항상 둘을 함께 본다\n\n# 퍼짐: 표준편차와 사분위수·IQR\nprint(y.std())                                # 표준편차: 평균에서 떨어진 평균적 거리\nq1, q3 = y.quantile(0.25), y.quantile(0.75)   # 1사분위수(Q1), 3사분위수(Q3)\niqr = q3 - q1                                 # IQR: 가운데 50%가 퍼진 폭\nupper = q3 + 1.5 * iqr                        # 박스플롯의 이상치 상한 기준선\nprint(y[y > upper])                           # 기준 밖 값(79)을 이상치 후보로 탐지\n\n# 분포 모양: 왜도(비대칭)와 첨도(뾰족함)\nprint(y.skew(), y.kurt())                     # 왜도 0이면 좌우대칭, 양수면 오른쪽 긴 꼬리",
        "note": "교재 3-(3) Statistics의 예시 숫자를 그대로 썼다. 이상치 하나로 평균이 3배 가까이 튀는 것을 눈으로 확인하는 것이 포인트 — 그래서 EDA에서는 mean과 median을 나란히 놓고, IQR 기준으로 이상치를 먼저 점검한 뒤에야 모형으로 넘어간다."
      },
      {
        "title": "가설검정의 직관 — 두 집단 평균 비교(t-검정)와 p-value",
        "lang": "python",
        "code": "from scipy import stats                       # 통계 검정 함수 모음\nimport numpy as np                            # 수치 계산\n\n# 질문: 쿠폰을 배포한 매장의 하루 구매고객수가 정말 더 많은가?\ncoupon = np.array([315, 302, 328, 341, 310, 335, 322])     # 쿠폰 배포 매장 표본\nno_coupon = np.array([288, 295, 279, 301, 284, 292, 287])  # 미배포 매장 표본\n\n# 귀무가설 H0: 두 집단의 평균 구매고객수는 같다 (쿠폰 효과 없음)\n# 대립가설 H1: 두 집단의 평균이 다르다 (쿠폰 효과 있음)\nt_stat, p_value = stats.ttest_ind(coupon, no_coupon)  # 독립 2표본 t-검정\nprint(t_stat, p_value)                        # 검정통계량과 p-value 출력\n\n# p-value: H0가 맞다고 가정할 때 이 정도 차이가 우연히 나올 확률\nif p_value < 0.05:                            # 유의수준 5%와 비교\n    print('귀무가설 기각: 쿠폰 효과가 통계적으로 유의하다')   # 차이를 인정\nelse:                                         # p-value가 0.05 이상이면\n    print('귀무가설 채택: 차이가 우연일 가능성을 배제 못 한다') # 효과 단정 금지\n\n# 주의: 표본으로 모집단을 판단하는 것이므로 표본이 작으면 결론의 힘도 약하다",
        "note": "교재의 \"표본 데이터를 활용한 통계적 의사결정\"을 코드로 옮겼다. 핵심 어휘는 넷 — 귀무가설(차이 없다), 대립가설(차이 있다), 유의수준(0.05), p-value(우연 확률). p가 작으면 기각, 크면 채택이라는 판정 규칙은 뒤의 회귀계수 유의성 검증에서 그대로 재사용된다."
      },
      {
        "title": "선형회귀 적합과 해석 — 쿠폰·가격이 구매고객수에 주는 영향",
        "lang": "python",
        "code": "import pandas as pd                           # 데이터프레임\nimport statsmodels.api as sm                  # 회귀분석 라이브러리\n\n# 교재 사례: 쿠폰배포매수(x1)·판매가격(x2) 중 무엇이 구매고객수(y)를 움직이나?\ndf = pd.DataFrame({                           # 매장별 마케팅 실적 데이터\n    'coupon': [500, 700, 900, 1100, 1300, 1500, 1700],    # 쿠폰 배포 매수(장)\n    'price':  [3000, 2800, 3200, 2900, 3100, 2700, 3000], # 판매 가격(원)\n    'buyers': [330, 355, 372, 400, 419, 442, 460],        # 구매 고객 수(명)\n})                                            # 실습에서는 CSV를 읽어 사용\nX = sm.add_constant(df[['coupon', 'price']])  # 절편(상수항)을 명시적으로 추가\nmodel = sm.OLS(df['buyers'], X).fit()         # 최소제곱법(OLS)으로 회귀식 적합\nprint(model.summary())                        # 계수·p값·결정계수 결과표 출력\n\n# 해석 3단계 (교재의 순서 그대로)\n# 1) 적합성: Adj. R-squared 0.735라면 모형이 변동의 73.5%를 설명\n# 2) 모형 유의성: F검정 p < 0.05 → 회귀모형 자체가 유의\n# 3) 계수 유의성: coupon p < 0.05 → 유의 / price p = 0.81 → 유의하지 않음\n\nX2 = sm.add_constant(df[['coupon']])          # 유의하지 않은 판매가격을 제거하고\nmodel2 = sm.OLS(df['buyers'], X2).fit()       # 회귀식을 다시 적합한다\nprint(model2.params)                          # 예: buyers = 0.108 x coupon + 282.9\n# 해석: 쿠폰을 1장 더 배포하면 구매고객이 약 0.1명 늘어난다는 뜻",
        "note": "교재 3-(6) 회귀분석의 마케팅 사례를 파이썬으로 재현했다. 결정계수로 설명력을, F검정으로 모형 전체를, 계수별 p값으로 개별 변수를 검증하는 3단계가 해석의 정석이며, 유의하지 않은 변수(판매가격 p=0.81)는 빼고 다시 적합하는 것까지가 한 사이클이다. 이 감각은 담당 과목의 피처 선택·모델 평가로 그대로 이어진다."
      },
      {
        "title": "정규분포로 상위 몇 %인지 계산하기 — 표준화 Z의 활용",
        "lang": "python",
        "code": "from scipy import stats                       # 정규분포 확률 계산 함수 모음\n\n# 문제: 평균 600점, 표준편차 150점인 시험에서 800점은 상위 몇 %인가?\nmu = 600                                      # 전체 평균\nsigma = 150                                   # 표준편차(1걸음의 크기)\nscore = 800                                   # 내 점수\n\nz = (score - mu) / sigma                      # 표준화: 평균에서 몇 걸음 떨어졌나\nprint(round(z, 2))                            # 1.33 (표준편차 1.33배 위)\n\nbelow = stats.norm.cdf(z)                     # z 이하일 확률(누적분포) = 0.9082\nabove = 1 - below                             # 나보다 높은 비율 = 상위 비율\nprint(round(above * 100, 2))                  # 9.18 → 상위 약 9.2% 수준\n\n# 정규분포의 기본 감각: 1시그마 안에 약 68%, 2시그마 안에 약 95%\np1 = stats.norm.cdf(1) - stats.norm.cdf(-1)   # 평균 좌우 1시그마 구간 확률\np2 = stats.norm.cdf(2) - stats.norm.cdf(-2)   # 평균 좌우 2시그마 구간 확률\nprint(round(p1, 4), round(p2, 4))             # 0.6827 0.9545\n\n# 응용: N(30, 4의 제곱)에서 값이 22~42 사이일 확률은?\np = stats.norm.cdf(42, 30, 4) - stats.norm.cdf(22, 30, 4)  # 구간 확률 = 큰쪽 누적 - 작은쪽 누적\nprint(round(p, 4))                            # 0.9759 (z=2 구간 0.4772 + z=3 구간 0.4987)",
        "note": "교재 확률분포 단원의 연습문제 두 개(TOEIC 800점 상위 %, N(30,4^2) 구간 확률)를 코드로 재현했다. 표준정규분포표를 손으로 찾는 대신 stats.norm.cdf 하나면 되지만, 원리는 같다 — 표준편차를 '걸음 수'로 삼아 내 값이 분포 어디쯤인지 확률로 말하는 것. 이 감각이 뒤의 이상 탐지(정상 범위 이탈 지수)로 그대로 이어진다."
      },
      {
        "title": "데이터 변환 3종 비교 — Z변환·Min-Max·로그변환",
        "lang": "python",
        "code": "import numpy as np                            # 수치 계산 라이브러리\n\n# 질문: A집단(평균 10, 표준편차 3)의 19점과 B집단(평균 2, 표준편차 1)의 3점, 누가 더 대단한가?\nza = (19 - 10) / 3                            # A집단 Z점수 = 3.0 (평균에서 3시그마 위)\nzb = (3 - 2) / 1                              # B집단 Z점수 = 1.0 (1시그마 위)\nprint(za, zb)                                 # 단위·분포가 달라도 Z로 바꾸면 비교 가능\n\n# Min-Max 정규화: 모든 값을 0~1 구간으로 변환\ny1 = (45 - 10) / (50 - 10)                    # min 10, max 50인 집단의 45 → 0.875\ny2 = (200 - 100) / (1000 - 100)               # min 100, max 1000인 집단의 200 → 0.111\nprint(y1, round(y2, 3))                       # 스케일이 달라도 같은 0~1 잣대로 비교\n\n# 로그변환: 오른쪽 꼬리가 긴 분포를 대칭에 가깝게 편다\nx = np.array([10, 100, 1000])                 # 10배씩 벌어진 치우친 값들\nprint(np.log10(x))                            # [1. 2. 3.] — 간격이 고르게 펴짐\nprint(np.sqrt(x).round(1))                    # [3.2 10. 31.6] — 제곱근 변환도 대안\n\n# 선택 기준 정리\n# 집단 간 비교, 모형 입력의 스케일 통일 → Z변환\n# 0~1 고정 범위가 필요할 때(신경망 입력 등) → Min-Max\n# 소득처럼 오른쪽으로 치우친 분포 교정 → 로그/제곱근 변환",
        "note": "교재 데이터 변환 단원의 숫자를 그대로 썼다(A집단 19점의 z=3, Min-Max 0.875와 0.111, 로그변환 10/100/1000 → 1/2/3). 변환의 공통 목적은 하나 — 단위와 분포가 다른 데이터를 같은 잣대에 올려 비교·학습 가능하게 만드는 것이다. 특히 로그변환은 정규분포 가정을 쓰는 회귀·t-검정 전에 자주 필요하다."
      },
      {
        "title": "결측치·이상치 전처리 — 평균 대체, 이동평균 대체, IQR 필터",
        "lang": "python",
        "code": "import pandas as pd                           # 표 데이터 처리\nimport numpy as np                            # NaN(결측) 표현용\n\n# 일별 판매량 7일치에 결측 2건이 섞여 있다고 가정\ns = pd.Series([120, 130, np.nan, 128, 140, np.nan, 300],          # 판매량 데이터\n              index=pd.date_range('2026-07-01', periods=7))        # 날짜 인덱스\nprint(s.isna().sum())                         # 결측 개수 확인: 2건\n\ndropped = s.dropna()                          # 방법 1: 분석 제외 — 빼도 되는지 비즈니스 검토 먼저\nfill_mean = s.fillna(s.mean())                # 방법 2: 대표값(평균)으로 대체\nfill_ma = s.fillna(s.rolling(3, min_periods=1).mean())  # 방법 3: 이동평균 — 시계열 흐름을 반영한 대체\nprint(fill_ma.round(1))                       # 대체 결과 확인\n\n# 이상치: IQR 기준으로 '후보'를 찾고, 삭제는 비즈니스 판단 후에\nq1, q3 = s.quantile(0.25), s.quantile(0.75)   # 1사분위수, 3사분위수\niqr = q3 - q1                                 # 가운데 50%가 퍼진 폭\noutlier = s[(s < q1 - 1.5 * iqr) | (s > q3 + 1.5 * iqr)]  # 상하한 기준 밖 값\nprint(outlier)                                # 300이 후보 — 프로모션 날 매출이면 지우면 안 된다\n\n# 마지막 규칙: 무엇을 왜 어떻게 처리했는지 반드시 기록·공유한다\n# (어떤 방법을 써도 정보 손실과 왜곡 가능성은 남기 때문)",
        "note": "교재 Preprocessing 단원의 두 원칙을 코드로 옮겼다 — 결측치는 '제외 vs 대체(0·평균·이동평균)' 중 비즈니스 검토를 거쳐 고르고, 이상치는 IQR로 탐지하되 삭제 여부는 분석 목적으로 판단한다. 이상거래 탐지 주제라면 이상치가 오히려 분석 대상이라는 점, 처리 내역을 문서로 남기라는 당부까지가 교재의 핵심이다."
      },
      {
        "title": "로지스틱 회귀 — 시험 점수로 합격 확률 예측하기",
        "lang": "python",
        "code": "import numpy as np                            # 수치 계산\nfrom sklearn.linear_model import LogisticRegression  # 로지스틱 회귀 모델\n\n# 학습 데이터: 시험 점수(x)와 합격 여부(y: 1=합격, 0=불합격)\nx = np.array([[35], [42], [50], [55], [62], [70], [78], [85], [90]])  # 점수 9명\ny = np.array([0, 0, 0, 0, 1, 1, 1, 1, 1])     # 60점 근처에서 합격이 갈린다\n\nmodel = LogisticRegression()                  # S자(시그모이드) 곡선을 적합하는 모델\nmodel.fit(x, y)                               # 학습: 점수와 합격의 경계를 찾는다\n\nnew = np.array([[10], [58], [65], [110]])     # 새로 예측할 점수 4명\nprob = model.predict_proba(new)[:, 1]         # 합격(클래스 1)일 확률만 추출\nprint(prob.round(3))                          # 항상 0~1 사이 확률로만 나온다\n\n# 만약 선형회귀로 풀었다면?\n# 10점 → 합격 가능성 -20%, 110점 → 120% 같은 불가능한 값이 나온다\n# 로지스틱 회귀는 시그모이드로 출력을 0~1에 가두므로\n# '합격 가능성 몇 %'라는 현실적인 답을 준다\n\npred = model.predict(new)                     # 확률 0.5를 기준으로 0/1 분류\nprint(pred)                                   # [0 0 1 1] — 58점 불합격, 65점 합격 예측",
        "note": "교재 로지스틱 회귀 단원의 도입 예제(시험 점수로 대학 합격 예측, 선형회귀의 -20%·120% 문제)를 sklearn으로 구현했다. 핵심은 종속변수가 범주형일 때는 값이 아니라 확률을 예측한다는 관점 전환이고, 값이 2개면 이항·3개 이상이면 다항 로지스틱으로 확장된다. 신용도·사용금액으로 이상거래를 가르는 교재의 실무 예시도 구조가 같다."
      },
      {
        "title": "기초통계 수업 자료 안내 — 교재 2종과 오픈북 Quiz (7/16 배포)",
        "lang": "text",
        "code": "[배포된 교재 2종 — 판교 3·4·6~10반 채널 공유]\n· 데이터 분석 개요 및 기초통계 _ Day1 _ 박병선w.pdf (5.7MB)\n· 데이터 분석 개요 및 기초통계 _ 이은호.pdf (7.8MB)\n  → 다음 주 월·화 이은호 교수 강의의 수업 자료가 이은호판이다 (김영희 교수 안내)\n\n[Quiz 안내] 이 과목 Quiz는 교재 내에서 오픈북으로 진행될 예정 —\n교재를 미리 훑어 어디에 무엇이 있는지 '목차 감각'을 만들어 두면 유리하다.\n\n[함께 배포된 참고] SKALA_맥북 네트워크 연결.pdf (김범준 교수, 실습 환경 문제 시)",
        "note": "판교 캠퍼스 채널들에 배포된 기초통계 수업 자료 현황이다. 같은 과목이라도 캠퍼스·반에 따라 박병선w판과 이은호판이 함께 쓰이니 자기 반 공지의 교재를 기준으로 보되, 두 판 모두 skala-4 자료 폴더와 드라이브 교재 폴더에 보관되어 있다."
      },
      {
        "title": "회귀분석 실습 전 과정 — 적재부터 EDA·가설검정·OLS까지 (판교 8반 시퀀스)",
        "lang": "python",
        "code": "# 1) 필요한 라이브러리를 한 번에 불러온다\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nimport statsmodels.api as sm       # OLS 회귀와 결과표(summary)를 제공\nfrom scipy import stats            # 등분산 검정, t-검정\n\n# 2) 구글 드라이브를 연결하고 데이터를 읽는다 (Colab 기준)\nfrom google.colab import drive\ndrive.mount(\"/content/drive\")\ndf = pd.read_csv(\"/content/drive/MyDrive/data/insurance.csv\")\n\n# 3) 구조부터 파악한다 — 행·열 개수, 자료형, 결측치 순서로\nprint(df.shape)          # (행, 열)\ndf.info()                # 컬럼별 자료형과 non-null 개수\nprint(df.isna().sum())   # 컬럼별 결측치 개수\n\n# 4) IQR 방식으로 이상치를 찾는다\ndef detect_outliers_iqr(data, column):\n    # 1사분위(25%)와 3사분위(75%)를 구한다\n    q1 = data[column].quantile(0.25)\n    q3 = data[column].quantile(0.75)\n    iqr = q3 - q1                  # 사분위 범위\n    lower = q1 - 1.5 * iqr         # 이 아래면 이상치 후보\n    upper = q3 + 1.5 * iqr         # 이 위면 이상치 후보\n    # 범위를 벗어난 행만 골라 돌려준다\n    return data[(data[column] < lower) | (data[column] > upper)]\n\nfor col in [\"age\", \"bmi\", \"children\", \"expenses\"]:\n    print(col, len(detect_outliers_iqr(df, col)), \"건\")\n\n# 5) EDA — 분포는 히스토그램, 이상치는 박스플롯을 나란히 본다\nfig, axes = plt.subplots(1, 2, figsize=(12, 4))\nsns.histplot(df[\"expenses\"], kde=True, ax=axes[0])   # 분포 모양\nsns.boxplot(x=df[\"expenses\"], ax=axes[1])            # 이상치 위치\nplt.show()\n# 범주형은 개수를 세어 불균형 여부를 확인한다\nsns.countplot(x=\"smoker\", data=df)\nplt.show()\n\n# 6) 가설검정 — 흡연 여부에 따라 의료비 평균이 다른가\n#    귀무가설: 두 집단의 평균은 같다 / 대립가설: 다르다\nsmoker = df[df[\"smoker\"] == \"yes\"][\"expenses\"]\nnonsmoker = df[df[\"smoker\"] == \"no\"][\"expenses\"]\n# 먼저 등분산인지 확인한다 (레빈 검정)\nlev = stats.levene(smoker, nonsmoker)\nprint(\"levene p =\", lev.pvalue)\n# p가 0.05 미만이면 등분산이 아니므로 웰치 t-검정을 쓴다\nequal_var = lev.pvalue >= 0.05\nprint(stats.ttest_ind(smoker, nonsmoker, equal_var=equal_var))\n\n# 7) 범주형을 숫자로 바꾼다 — drop_first로 기준 범주 하나를 뺀다(더미 함정 회피)\ndf_encoded = pd.get_dummies(\n    df, columns=[\"sex\", \"smoker\", \"region\"], drop_first=True\n).astype(float)\n\n# 8) 상관관계 히트맵으로 어떤 변수가 타깃과 관련 있는지 훑는다\ncorr_matrix = df_encoded.corr()\nsns.heatmap(corr_matrix, annot=True, fmt=\".2f\", cmap=\"coolwarm\")\nplt.show()\n\n# 9) OLS 회귀 — statsmodels는 상수항을 직접 넣어 줘야 한다\ny = df_encoded[\"expenses\"]\nX = df_encoded.drop(columns=[\"expenses\"])\nX_with_constant = sm.add_constant(X)\nmodel = sm.OLS(y, X_with_constant).fit()\nprint(model.summary())\n\n# 10) P>|t|가 0.05를 넘는 변수(예: sex_male, region_northwest)를 빼고 다시 적합한다\nX2 = X.drop(columns=[\"sex_male\", \"region_northwest\"])\nmodel2 = sm.OLS(y, sm.add_constant(X2)).fit()\nprint(model2.summary())",
        "note": "판교 8반 회귀분석 실습에서 순서대로 진행된 흐름을 하나로 이어 붙였다. 핵심은 순서 그 자체다 — 구조 파악 → 결측·이상치 → 시각적 EDA → 가설검정 → 인코딩 → 상관 확인 → 회귀 → 변수 정리 재적합. 이 순서를 건너뛰고 바로 모델부터 돌리면 왜 그런 계수가 나왔는지 설명할 근거가 없어져 보고서를 쓸 수 없다. 사용 데이터는 insurance.csv이며, 다중공선성 예시가 필요하면 day.csv의 temp와 atemp(상관 0.99)를 함께 보면 좋다."
      },
      {
        "title": "Colab 준비 — 한글 폰트 즉시 적용과 드라이브 마운트",
        "lang": "python",
        "code": "# [Colab] 그래프의 한글이 네모(두부)로 깨지는 문제를 런타임 재시작 없이 해결한다\n# 1) 나눔 폰트를 설치한다 (-qq는 설치 로그를 줄여 준다)\n!apt-get -qq install -y fonts-nanum\n\nimport matplotlib.pyplot as plt\nimport matplotlib.font_manager as fm\n\n# 2) 방금 설치한 폰트 파일을 matplotlib 폰트 목록에 직접 등록한다\n#    이 한 줄 덕분에 런타임을 다시 시작하지 않아도 바로 인식된다\nfm.fontManager.addfont(\"/usr/share/fonts/truetype/nanum/NanumGothic.ttf\")\n\n# 3) 기본 글꼴을 나눔고딕으로 지정한다\nplt.rc(\"font\", family=\"NanumGothic\")\n\n# 4) 한글 폰트를 쓰면 음수 기호가 깨지므로 유니코드 마이너스를 끈다\nplt.rcParams[\"axes.unicode_minus\"] = False\n\n# 확인 — 제목에 한글이 제대로 나오면 성공\nplt.title(\"한글 제목 표시 확인 -1.5\")\nplt.plot([0, 1], [0, -1.5])\nplt.show()\n\n# [로컬 환경] Colab이 아니라 내 컴퓨터에서 돌린다면 OS별로 폰트 이름이 다르다\n# 윈도우:  plt.rc(\"font\", family=\"Malgun Gothic\")\n# 맥:      plt.rc(\"font\", family=\"AppleGothic\")\n\n# [드라이브 연결] 실습 데이터를 구글 드라이브에 두고 읽는 방식\nfrom google.colab import drive\n# 실행하면 권한 승인 창이 뜨고, 승인하면 /content/drive 아래에 내 드라이브가 붙는다\ndrive.mount(\"/content/drive\")\n\nimport pandas as pd\n# MyDrive 아래 경로를 그대로 쓰면 된다 (폴더·파일명에 공백이 있으면 따옴표 안에 그대로)\ndf = pd.read_csv(\"/content/drive/MyDrive/data/insurance.csv\")\nprint(df.head())",
        "note": "기초통계 실습에서 가장 많이 막히는 두 지점이 한글 깨짐과 데이터 경로다. 폰트는 addfont로 직접 등록하면 런타임 재시작이 필요 없어 수업 흐름이 끊기지 않고, unicode_minus를 끄지 않으면 음수 축 라벨만 따로 깨져 원인을 찾기 어려워진다. 드라이브를 마운트해 두면 세션이 끊겨도 파일을 다시 업로드할 필요가 없다."
      },
      {
        "title": "기초통계 종합실습 — 과제 구성과 제출 규격 (7/20 안내)",
        "lang": "text",
        "code": "[종합실습 과제 — LinearRegression Base code를 출발점으로]\n  Task 1. Baseline Model의 회귀분석 결과를 해석한다\n  Task 2. Baseline 모델을 개선한다\n  Task 3. 통계적으로 유의하지 않은 변수를 제거하고 다시 평가한다\n\n[채점 관점 — 반드시 기억할 것]\n  \"정답 자체보다 왜 그렇게 판단했는지의 과정을 중심으로 정리한다\"\n  · 즉 R2가 몇이라는 숫자보다, 어떤 근거로 변수를 뺐고 그 결과 무엇이 좋아졌는지의 서술이 점수를 만든다\n  · 수행보고서 양식은 자유\n\n[제출 파일명 규칙]\n  · 수행보고서: 기초통계_6반_홍길동\n  · 코드(선택): 실습_LinearRegression_홍길동.ipynb\n  · 반에 따라 다른 규칙이 안내되기도 한다 —\n    예) 고유번호_반_이름_데이터 분석개요 및 기초통계.zip (익일 오후 quiz 제출 시 함께)\n  · 최종 파일명·마감은 각 반 실습교수님 안내를 우선한다\n\n[보고서에 넣으면 좋은 문장 뼈대]\n  1. 데이터 개요: 행 N개·열 M개, 결측치 처리 방식, 이상치 판단 기준(IQR)\n  2. 탐색 결과: 타깃과 상관이 높았던 변수와 그 이유(도메인 해석 한 줄)\n  3. Baseline 결과: Adj. R-squared 값과 유의하지 않았던 변수 목록(P>|t| 기준)\n  4. 개선 과정: 무엇을 왜 바꿨는가 (변수 제거 · 인코딩 변경 · 이상치 처리)\n  5. 개선 결과: 지표 Before/After 비교 — 보고용은 MAE, 이상치 영향 확인은 RMSE 병기\n  6. 한계와 다음 단계: 설명하지 못한 부분과 추가로 모으고 싶은 변수",
        "note": "과제의 배점 무게가 \"판단 과정\"에 실려 있다는 점이 이 안내의 핵심이다. 지표를 올리는 것보다 왜 그 변수를 뺐는지(P>|t| 근거), 왜 그 지표를 골랐는지(MAE는 보고용·MSE는 계산용)를 문장으로 남기는 쪽이 점수와 실무 역량 둘 다에 유리하다. Before/After를 표로 나란히 놓는 것만으로도 개선 과정이 한눈에 전달된다."
      },
      {
        "title": "종합실습(중고차 가격 예측) 풀이 접근법 — 데이터 검증과 파생변수",
        "lang": "python",
        "code": "# [접근법] 정답 코드를 베끼기 전에 \"왜 이 순서인가\"를 잡고 가는 것이 핵심이다.\n# 데이터: 중고차 거래 301행 x 9컬럼\n#   Car_Name / Year / Selling_Price(타깃) / Present_Price / Kms_Driven\n#   Fuel_Type / Seller_Type / Transmission / Owner\n\nimport pandas as pd\nimport numpy as np\nfrom datetime import datetime\n\n# 1) 먼저 \"내가 기대한 데이터가 맞는지\" 확인하고 시작한다\n#    필수 컬럼이 없거나 비어 있으면 뒤 작업이 전부 헛수고가 되므로 여기서 끊는다\nREQUIRED = [\"Car_Name\", \"Year\", \"Selling_Price\", \"Present_Price\",\n            \"Kms_Driven\", \"Fuel_Type\", \"Seller_Type\", \"Transmission\", \"Owner\"]\nmissing = sorted(set(REQUIRED) - set(df.columns))\nif missing:\n    raise ValueError(\"필수 컬럼이 없습니다: \" + str(missing))\n\n# 2) 품질 표를 한 번에 만들어 자료형·결측·고유값을 같이 본다\n#    세 가지를 따로 출력하면 비교가 안 되지만, 한 표로 묶으면 이상한 컬럼이 바로 눈에 띈다\nquality = pd.DataFrame({\n    \"자료형\": df.dtypes.astype(str),\n    \"결측치 수\": df.isna().sum(),\n    \"고유값 수\": df.nunique(dropna=False),\n})\nprint(quality)\n\n# 3) 왜도(skew)로 분포가 얼마나 치우쳤는지 숫자로 확인한다\n#    양수가 클수록 오른쪽 꼬리가 길다 = 로그 변환을 검토할 신호\nprint(df[[\"Selling_Price\", \"Present_Price\", \"Kms_Driven\"]].skew())\n\n# 4) [가장 중요한 판단] 연식(Year)을 그대로 쓰지 않고 나이로 바꾼다\n#    2015라는 숫자 자체는 의미가 없고, \"몇 년 된 차인가\"가 가격을 설명한다\ncurrent_year = datetime.now().year   # 기준 연도를 고정값으로 박지 않는다\ndf[\"Car_Age\"] = current_year - df[\"Year\"] + 1\n\n# 5) 단위를 줄이고(43000 -> 43.0), 연간 주행거리라는 새 관점을 만든다\ndf[\"Kms_Driven\"] = df[\"Kms_Driven\"] / 1000\ndf[\"Kms_Per_Year\"] = df[\"Kms_Driven\"] / df[\"Car_Age\"]\n\n# 6) 파생변수를 만들었으면 곧바로 정합성을 확인한다\n#    나눗셈을 했으니 0으로 나눠 무한대가 생기지 않았는지 반드시 본다\nif (df[\"Car_Age\"] <= 0).any():\n    raise ValueError(\"Car_Age에 0 이하 값이 있습니다.\")\nif not np.isfinite(df[\"Kms_Per_Year\"]).all():\n    raise ValueError(\"Kms_Per_Year에 무한대 값이 있습니다.\")\n\n# 7) 모델에 넣지 않을 컬럼을 정리한다\n#    Car_Name은 고유값이 너무 많은 이름표라 학습에 방해가 되고,\n#    Year는 Car_Age로 이미 표현했으므로 중복이다\nmodel_df = df.drop(columns=[\"Car_Name\", \"Year\"]).copy()",
        "note": "이 실습에서 점수가 갈리는 지점은 모델이 아니라 파생변수다. Year를 그대로 넣으면 회귀계수가 \"2015년마다 얼마\"라는 해석 불가능한 값이 되지만, Car_Age로 바꾸면 \"1년 늙을 때마다 얼마 떨어진다\"는 문장이 바로 나온다. 파생변수를 만든 직후 무한대·음수를 검사하는 습관도 함께 가져가자 — 나눗셈으로 만든 변수는 조용히 망가지고 한참 뒤 모델 학습에서야 터진다."
      },
      {
        "title": "종합실습 — Baseline부터 로그 회귀·역변환·개선율까지의 흐름",
        "lang": "python",
        "code": "import numpy as np\nimport statsmodels.api as sm\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import MinMaxScaler\nfrom sklearn.metrics import mean_absolute_percentage_error\n\n# 1) 범주형을 더미로 바꾼다 — drop_first로 기준 범주 하나를 빼 더미 함정을 피한다\nmodel_df = pd.get_dummies(model_df,\n    columns=[\"Fuel_Type\", \"Seller_Type\", \"Transmission\"],\n    drop_first=True, dtype=int)\n# 전처리가 끝났으면 문자열 컬럼과 결측이 남지 않았는지 확인하고 넘어간다\nassert model_df.isna().sum().sum() == 0, \"결측치가 남아 있습니다\"\nassert not model_df.select_dtypes(include=\"object\").columns.tolist()\n\n# 2) 입력과 타깃을 나누고 학습·평가용으로 쪼갠다\nX = model_df.drop(columns=[\"Selling_Price\"])\ny = model_df[\"Selling_Price\"]\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.3, random_state=42, shuffle=True)\n\n# 3) [기준선] 아무 것도 학습하지 않고 \"무조건 평균\"으로 예측해 본다\n#    이 점수를 이기지 못하면 모델을 만든 의미가 없다\nbaseline_value = y_train.mean()\nbaseline_pred = np.repeat(baseline_value, len(y_test))\nbaseline_mape = mean_absolute_percentage_error(y_test, baseline_pred)\nprint(\"Baseline MAPE(%):\", round(baseline_mape * 100, 2))\n\n# 4) 수치형만 골라 스케일링한다 — 더미 컬럼(0/1)은 건드릴 필요가 없다\nnumeric_cols = [\"Present_Price\", \"Kms_Driven\", \"Owner\", \"Car_Age\", \"Kms_Per_Year\"]\nX_train_scaled, X_test_scaled = X_train.copy(), X_test.copy()\nscaler = MinMaxScaler()\n# 학습 데이터로만 fit — 여기서 테스트를 섞으면 데이터 누수다\nX_train_scaled[numeric_cols] = scaler.fit_transform(X_train[numeric_cols])\n# 테스트에는 transform만 적용 (학습에서 배운 최소·최대를 그대로 쓴다)\nX_test_scaled[numeric_cols] = scaler.transform(X_test[numeric_cols])\n\n# 5) 상수항을 붙이고, 타깃은 로그 세상으로 옮겨 학습한다\nX_train_const = sm.add_constant(X_train_scaled)\nX_test_const = sm.add_constant(X_test_scaled, has_constant=\"add\")\nmodel = sm.OLS(np.log1p(y_train), X_train_const).fit()\nprint(model.summary())\n\n# 6) 예측한 뒤 반드시 원래 단위로 되돌린다 (log1p의 짝은 expm1)\nlog_pred = model.predict(X_test_const)\ntest_pred = np.expm1(log_pred)\n\n# 7) 가격은 음수가 될 수 없으므로 0으로 보정한 뒤 평가한다\ntest_pred = pd.Series(np.where(test_pred < 0, 0, test_pred), index=y_test.index)\n\n# 8) 같은 잣대(MAPE)로 재고 개선율을 계산한다\nmodel_mape = mean_absolute_percentage_error(y_test, test_pred)\nimprovement = (baseline_mape - model_mape) / baseline_mape\nprint(\"Model MAPE(%):\", round(model_mape * 100, 2))\nprint(\"개선율(%):\", round(improvement * 100, 2))\n\n# 9) 유의한 변수만 추려 보고서에 쓴다 (p < 0.05)\np_values = model.pvalues.drop(\"const\", errors=\"ignore\")\nprint(p_values[p_values < 0.05].sort_values())",
        "note": "자주 나오는 사고 세 가지가 이 흐름에 다 들어 있다 — ① 테스트 데이터로도 스케일러를 fit해 버리는 데이터 누수, ② expm1 역변환을 빼먹고 로그 값 그대로 평가해 오차가 비현실적으로 작게 나오는 것, ③ 음수 예측을 그대로 두어 MAPE가 왜곡되는 것. 로그 변환을 켜고 끄며 MAPE를 비교해 보면 왜도가 큰 타깃에서 변환이 얼마나 효과적인지 몸으로 느낄 수 있다."
      },
      {
        "title": "결측치 처리 4가지 — 무엇을 언제 고르는가 (선행 교안 보완)",
        "lang": "python",
        "code": "import pandas as pd\n\n# 먼저 어디에 얼마나 비어 있는지 센다 — 처리 방법은 이 표를 보고 정한다\nprint(df.isnull().sum())\n\n# ① 삭제 — 결측이 있는 행을 통째로 버린다\n#    쓸 때: 결측이 아주 적고 데이터가 충분히 많을 때\n#    주의: 결측이 특정 집단에 몰려 있으면 그 집단이 통째로 사라져 분석이 편향된다\ndf_dropped = df.dropna()\n\n# ② 평균으로 대체 — 숫자 컬럼의 빈 칸을 그 컬럼 평균으로 채운다\n#    쓸 때: 분포가 좌우 대칭에 가깝고 이상치가 별로 없을 때\ndf[\"국어\"] = df[\"국어\"].fillna(df[\"국어\"].mean())\n\n# ③ 중앙값으로 대체 — 평균 대신 가운데 값으로 채운다\n#    쓸 때: 이상치가 있어 평균이 끌려갈 때 (연봉·집값처럼 한쪽 꼬리가 긴 데이터)\n#    중앙값은 극단값에 흔들리지 않는다는 점이 핵심 이유다\ndf[\"국어\"] = df[\"국어\"].fillna(df[\"국어\"].median())\n\n# ④ 최빈값으로 대체 — 가장 자주 나온 값으로 채운다 (범주형 컬럼용)\n#    mode()는 결과가 여러 개일 수 있어 Series로 돌아오므로 [0]으로 첫 값을 꺼낸다\ndf[\"지역\"] = df[\"지역\"].fillna(df[\"지역\"].mode()[0])\n\n# 이름처럼 대표값이라는 개념 자체가 없는 컬럼은 채우지 말고 표시만 남긴다\ndf[\"학생\"] = df[\"학생\"].fillna(\"Unknown\")\n\n# 처리 후에는 반드시 다시 세어 0이 되었는지 확인한다\nprint(df.isnull().sum())",
        "note": "결측치를 어떻게 채우느냐보다 왜 그 방법을 골랐느냐가 보고서에서 평가받는 지점이다. 숫자는 분포가 대칭이면 평균, 이상치가 있으면 중앙값, 범주형은 최빈값이 기본 선택이고, 이름처럼 대표값이 성립하지 않는 컬럼은 억지로 채우지 말고 Unknown 같은 표시를 남기는 편이 정직하다. 채우기 전후로 isnull().sum()을 두 번 찍는 습관이 실수를 막아 준다."
      },
      {
        "title": "제출 전 자가 검증 체크리스트 — 채점 전에 내가 먼저 잡는다",
        "lang": "text",
        "code": "[왜 자가 검증인가]\n  실습 가이드는 마지막에 assert(단언문) 묶음으로 결과를 스스로 점검하게 되어 있다.\n  코드가 오류 없이 끝났다는 것과 결과가 맞다는 것은 전혀 다른 말이기 때문이다.\n  아래 항목을 하나씩 통과시켜 놓으면 제출 후에 발견되는 사고가 거의 사라진다.\n\n[데이터 단계]\n  □ 원본 행 수가 예상과 같은가 (중고차 데이터 기준 301행)\n  □ 원본 컬럼이 9개 전부 있는가 · 필수 컬럼 누락은 없는가\n  □ 원본에 결측치가 없는가 (있다면 어떻게 처리했는지 보고서에 적었는가)\n\n[전처리 단계]\n  □ 파생변수(Car_Age · Kms_Per_Year)에 무한대나 음수가 없는가\n  □ 인코딩 후 문자열(object) 컬럼이 하나도 남지 않았는가\n  □ 전처리 후 결측치가 0인가\n\n[분할·학습 단계]\n  □ Train 행 수 + Test 행 수가 원본 행 수와 같은가 (210 + 91 = 301)\n  □ 스케일러를 학습 데이터로만 fit했는가 (테스트는 transform만)\n  □ random_state를 고정해 다시 돌려도 같은 결과가 나오는가\n\n[평가 단계]\n  □ 예측값을 원래 단위로 되돌렸는가 (log1p로 학습했다면 expm1)\n  □ 예측값이 모두 0 이상인가 (가격에 음수가 있으면 안 된다)\n  □ 모델 MAPE가 Baseline MAPE보다 낮은가 ← 이게 아니면 모델이 실패한 것\n  □ 유의 변수(p < 0.05)가 1개 이상인가\n\n[참고 기준값 — 버전에 따라 미세한 차이는 정상]\n  Baseline MAPE 약 338% / Model MAPE 약 67% / 개선율 약 80% / R-squared 약 0.88\n  내 결과가 이와 크게 다르면 전처리나 역변환 어딘가를 놓친 것이니 되짚어 볼 것.\n\n[산출물]\n  · 결과 엑셀은 시트를 나눠 저장한다 — 요약 / 유의변수 / 상관 Top2 / 회귀계수 전체 / 예측결과 / 전처리데이터\n  · 파일명에 본인 이름을 넣는다 (예: 종합실습_결과물_기초통계_홍길동.xlsx)\n  · CSV로 저장할 때 한글이 깨지면 encoding=\"utf-8-sig\"를 쓴다\n  · openpyxl이 없다는 오류가 나면 %pip install openpyxl 후 다시 실행한다\n  · 최종 파일명·제출처는 각 반 실습교수님 안내를 우선한다",
        "note": "실습 가이드가 제공하는 자가 검증 항목을 학습자가 스스로 점검할 수 있는 체크리스트로 바꾼 것이다. 특히 \"모델 MAPE가 Baseline보다 낮은가\"는 통과 못 하면 나머지가 다 맞아도 분석이 실패한 것이라 가장 먼저 확인해야 하고, \"예측값이 모두 0 이상인가\"는 역변환·보정을 빠뜨렸을 때만 걸리므로 두 실수를 한 번에 잡아 준다."
      },
      {
        "title": "비용함수 곡선 그려보기 — w를 바꿔가며 cost의 U자 확인 (판교 7반 김일한 교수 자료)",
        "lang": "python",
        "code": "import numpy as np\nimport matplotlib.pyplot as plt\n\n# 아주 단순한 데이터: y가 x와 똑같으므로 정답 기울기는 1이다\nx_data = np.array([1, 2, 3])\ny_data = np.array([1, 2, 3])\n\n# 기울기 w를 넣으면 그 w의 비용(MSE)을 돌려주는 함수\ndef mse(x, y, w):\n    hx = w * x                      # 예측값: 기울기 w를 곱한 값\n    return np.sum((hx - y) ** 2) / len(x)   # 오차를 제곱해서 평균낸다\n\n# w를 -3부터 5까지 50개로 촘촘히 나누어 비용을 계산한다\nw_list = np.linspace(-3, 5, 50)\ncost_list = [mse(x_data, y_data, w) for w in w_list]\n\n# 몇 개만 숫자로 확인해 본다\nfor w in [-1, 0, 1, 2, 3]:\n    print(\"w =\", w, \"일 때 cost =\", round(mse(x_data, y_data, w), 3))\n\n# 곡선을 그리면 w=1 지점이 바닥인 U자 모양이 나온다\nplt.plot(w_list, cost_list, \"ro\")\nplt.xlabel(\"w\")                     # 가로축은 기울기 후보\nplt.ylabel(\"cost\")                  # 세로축은 그 기울기의 오차 크기\nplt.show()",
        "note": "비용함수를 공식으로만 보면 막막하지만, w를 바꿔가며 점을 찍어보면 골짜기가 눈에 바로 보입니다. w가 1일 때 cost가 정확히 0이 되는 것을 확인하면 학습의 목표가 무엇인지 한 번에 이해됩니다."
      },
      {
        "title": "경사하강법 직접 구현 — w와 b를 반복해서 갱신하기 (판교 7반 김일한 교수 자료)",
        "lang": "python",
        "code": "import numpy as np\n\n# 공부시간 x와 점수 y, 실제 관계는 y = 2x + 1 이다\nx = np.array([1, 2, 3, 4, 5])\ny = np.array([3, 5, 7, 9, 11])\n\nw = 10.0            # 기울기 초기값: 일부러 엉뚱한 값에서 출발\nb = 10.0            # 절편 초기값\nlearning_rate = 0.01   # 한 걸음의 보폭(학습률)\nn = len(x)\n\nfor epoch in range(2000):\n    hx = w * x + b                          # 현재 w, b로 예측\n    cost = np.sum((hx - y) ** 2) / n        # 오차를 제곱해서 평균낸 비용\n    grad_w = np.sum((hx - y) * 2 * x) / n   # w 방향의 접선 기울기\n    grad_b = np.sum((hx - y) * 2) / n       # b 방향의 접선 기울기\n    w = w - learning_rate * grad_w          # 오르막 반대로 한 걸음\n    b = b - learning_rate * grad_b          # 절편도 같은 방식으로 이동\n    if epoch % 400 == 0:                    # 400번마다 진행 상황 출력\n        print(epoch, \"cost:\", round(cost, 4), \"w:\", round(w, 4), \"b:\", round(b, 4))\n\nprint(\"최종 w =\", round(w, 3), \" 최종 b =\", round(b, 3))\nprint(\"공부시간 7시간 예측 점수 =\", round(w * 7 + b, 2))",
        "note": "sklearn이나 statsmodels가 내부에서 하는 일을 열 줄 남짓으로 직접 재현한 코드입니다. cost가 줄어들면서 w가 2, b가 1에 수렴하는 과정을 보면 학습이 마법이 아님을 알 수 있고, 학습률을 0.1로 키우면 발산하는 것도 직접 실험해 볼 수 있습니다."
      },
      {
        "title": "최소제곱 공식으로 회귀계수 손계산 — 공분산·상관계수와 이어보기 (판교 7반 김일한 교수 자료)",
        "lang": "python",
        "code": "import numpy as np\n\nX = np.array([1, 2, 3, 4, 5])          # 공부시간\nY = np.array([50, 55, 65, 70, 80])     # 시험점수\n\nX_bar = np.mean(X)                     # X의 평균\nY_bar = np.mean(Y)                     # Y의 평균\n\ndev_x = X - X_bar                      # X의 편차: 평균에서 얼마나 벗어났나\ndev_y = Y - Y_bar                      # Y의 편차\n\nSxx = np.sum(dev_x ** 2)               # X 편차의 제곱합 (분산의 재료)\nSxy = np.sum(dev_x * dev_y)            # 편차끼리의 곱의 합 (공분산의 재료)\n\nbeta1 = Sxy / Sxx                      # 기울기 = 공분산 나누기 X의 분산\nbeta0 = Y_bar - beta1 * X_bar          # 절편 = Y평균 빼기 기울기 곱하기 X평균\n\nprint(\"기울기 beta1 =\", round(beta1, 3))\nprint(\"절편   beta0 =\", round(beta0, 3))\n\ncov = np.mean(dev_x * dev_y)                       # 공분산: 편차곱의 평균\ncorr = cov / (np.std(X) * np.std(Y))               # 상관계수: 표준편차로 나눠 표준화\nprint(\"공분산 =\", round(cov, 3), \" 상관계수 =\", round(corr, 3))\n\nY_hat = beta0 + beta1 * X                          # 직접 구한 식으로 예측\nfor a, b, p in zip(X, Y, Y_hat):\n    print(\"X =\", a, \" 실제 =\", b, \" 예측 =\", round(p, 2))",
        "note": "OLS가 돌려주는 coef 값이 사실은 편차곱의 합을 편차제곱의 합으로 나눈 나눗셈 한 번이라는 사실을 눈으로 확인하는 실습입니다. 같은 재료(편차의 곱)에서 공분산과 상관계수도 함께 나오므로, 상관과 회귀가 한 뿌리임을 체감할 수 있습니다."
      },
      {
        "title": "다중공선성 진단 — VIF로 겹치는 변수 찾아내기 (판교 7반 김일한 교수 자료)",
        "lang": "python",
        "code": "import numpy as np\nimport pandas as pd\nimport statsmodels.api as sm\nfrom statsmodels.stats.outliers_influence import variance_inflation_factor\n\nnp.random.seed(0)\nn = 100\n\nX1 = np.random.normal(50, 10, n)                       # 기본 변수\nX2 = X1 * 0.9 + np.random.normal(0, 2, n)              # X1과 거의 같은 변수(일부러 겹치게)\nX3 = np.random.normal(100, 20, n)                      # X1과 무관한 독립적 변수\ny = 3 * X1 + 2 * X3 + np.random.normal(0, 15, n)       # 정답에는 X2가 들어있지 않다\n\ndf = pd.DataFrame({\"X1\": X1, \"X2\": X2, \"X3\": X3})\nprint(\"상관계수 행렬\")\nprint(df.corr().round(3))                              # X1과 X2의 상관이 1에 가깝게 나온다\n\n# VIF 계산: 값이 10을 넘으면 다중공선성 위험 신호로 본다\nvif = pd.DataFrame()\nvif[\"변수\"] = df.columns\nvif[\"VIF\"] = [variance_inflation_factor(df.values, i) for i in range(df.shape[1])]\nprint(vif)\n\n# 겹치는 X2를 그대로 넣고 회귀하면 계수가 불안정해진다\nmodel_all = sm.OLS(y, sm.add_constant(df)).fit()\nprint(\"X2 포함 계수:\", model_all.params.round(3).to_dict())\n\n# X2를 빼고 다시 적합하면 원래 정답인 3과 2에 가깝게 복원된다\nmodel_drop = sm.OLS(y, sm.add_constant(df[[\"X1\", \"X3\"]])).fit()\nprint(\"X2 제외 계수:\", model_drop.params.round(3).to_dict())",
        "note": "정답을 알고 있는 가짜 데이터를 만들어 다중공선성의 해악을 직접 눈으로 보는 실습입니다. 겹치는 변수를 넣었을 때 계수가 엉뚱하게 흔들리다가 제거하면 참값으로 돌아오는 것을 확인하면, 변수는 많이 넣을수록 좋다는 오해가 깔끔하게 정리됩니다."
      }
    ]
  },
  "java": {
    "concepts": [
      {
        "term": "JVM과 바이트코드 — Write Once, Run Anywhere",
        "desc": ".java 소스는 컴파일러(javac)를 거쳐 .class 바이트코드가 되고, 클래스 로더가 이를 JVM에 올리면 JVM이 바이트코드를 그 OS의 기계어로 바꿔 실행한다. 바이트코드는 어떤 OS의 JVM에서도 똑같이 돌기 때문에 플랫폼 독립성이 생긴다. 메모리도 역할이 나뉜다 — 기본형 값과 메서드 호출 정보는 스택에, new로 만든 객체와 참조형은 힙에 저장되며 힙의 객체는 GC(가비지 컬렉터)의 수거 대상이다."
      },
      {
        "term": "생성자 주입이 필드 주입(@Autowired)을 이기는 4가지 이유",
        "desc": "① 불변성 — 생성자 주입만 final 선언이 가능해 주입 후 바꿀 수 없다. ② 테스트 — Spring 없이 new PostService(mockRepo)로 바로 만들 수 있다. ③ 순환 의존 — 필드 주입은 서버를 띄운 뒤에야 터지지만 생성자 주입은 컴파일 시점에 걸린다. ④ 가독성 — 생성자 파라미터만 봐도 의존성이 다 보인다. 실무에서는 Lombok의 @RequiredArgsConstructor가 final 필드용 생성자를 자동 생성해 가장 간결한 생성자 주입이 된다."
      },
      {
        "term": "단방향 의존 규칙 — Controller → Service → Repository",
        "desc": "계층을 나누는 핵심 이유는 변경의 영향 범위 최소화다. DB가 바뀌면 Repository만, HTTP 스펙이 바뀌면 Controller만 고친다. 의존 방향은 Controller → Service → Repository 한 방향만 허용하고, 역방향과 계층 건너뛰기는 금지다. 흔한 실수는 Controller에 Repository를 직접 주입해 Service를 우회하는 것 — 비즈니스 로직이 여러 Controller에 중복되기 시작한다. 각 계층이 몰라도 되는 것도 분명하다: Controller는 DB 구조를, Service는 HTTP 메서드와 URL을, Repository는 비즈니스 규칙을 몰라도 된다."
      },
      {
        "term": "Entity vs DTO — Entity를 그대로 반환하면 안 되는 3가지",
        "desc": "Entity는 JPA가 관리하는 영속 객체(DB 테이블 매핑)이고 DTO는 계층 간 전달용 비영속 객체 — 역할이 다르다. Entity를 Controller에서 그대로 JSON으로 내보내면 ① 테이블 컬럼명·관계가 API 응답에 노출돼 DB 변경이 곧 API 스펙 변경이 되고, ② User의 password·salt 같은 민감 정보가 응답에 실릴 수 있으며, ③ Post→User→Post 양방향 참조가 직렬화 무한 루프(StackOverflow)를 일으킨다. 변환은 Service에서, PostResponse.from(post) 같은 정적 팩토리 패턴으로 노출할 필드만 골라 담는 것이 권장이다."
      },
      {
        "term": "@Transactional과 변경 감지(dirty checking)",
        "desc": "@Transactional은 여러 Repository 호출을 하나의 트랜잭션으로 묶어 성공 시 전체 COMMIT, 실패 시 전체 ROLLBACK을 보장한다(부분 성공 없음). 트랜잭션 범위 안에서 findById()로 가져온 Entity는 영속 상태라, 필드만 바꿔도 커밋 시점에 자동으로 UPDATE가 나간다 — update() 메서드에 save()가 없어도 되는 이유다. 조회 메서드에는 readOnly=true를 붙여 변경 감지를 꺼서 SELECT 성능을 올리고 쓰기 실수도 막는다. 트랜잭션 경계 = 비즈니스 단위이므로 Controller가 아닌 Service에 붙인다."
      },
      {
        "term": "REST 상태코드를 ResponseEntity로 직접 말하기",
        "desc": "그냥 객체를 반환하면 늘 200 OK지만, ResponseEntity를 쓰면 의미가 정확한 상태코드를 고를 수 있다. 생성 성공은 201 Created(+ 생성된 id 포함), 삭제 성공은 본문 없는 204 No Content가 REST 표준이고, 잘못된 입력은 400 Bad Request, 인증 실패는 401 Unauthorized, ID 중복 같은 충돌은 409 Conflict로 알린다. 참고로 @RestController의 반환 객체가 JSON이 되는 것은 spring-boot-starter-web에 포함된 Jackson이 자동 직렬화해 주기 때문이다."
      },
      {
        "term": "== vs equals() — 주소 비교와 내용 비교",
        "desc": "==는 두 변수가 같은 객체(메모리 주소)를 가리키는지 보고, equals()는 담긴 내용이 같은지 본다. 그래서 문자열 비교, 특히 비밀번호 검증은 반드시 equals()를 써야 하며 ==를 쓰면 내용이 같아도 false가 나올 수 있다. 다만 equals()로 평문 비밀번호를 비교하는 것 자체가 타이밍 공격에 취약하다는 것이 Day1의 결론이고, 그래서 Day2에서 BCrypt.checkpw()로 발전시킨다."
      },
      {
        "term": "BCrypt — Salt와 Work Factor가 있는 단방향 해시",
        "desc": "BCrypt는 복호화가 불가능한 단방향 해시로 비밀번호를 저장하는 실무 표준이다. SHA-256과 달리 Salt가 자동 포함되어 같은 비밀번호도 매번 다른 해시가 나와 레인보우 테이블 공격을 막고, Work Factor로 해시 속도를 일부러 느리게 만들어(10이면 2의 10제곱 = 1024회 반복) 무차별 대입을 방어한다. 해시 문자열 $2a$10$... 안에 버전·Work Factor·Salt·해시값이 모두 들어 있어 검증은 checkpw() 한 번이면 된다."
      },
      {
        "term": "JWT — Header.Payload.Signature 토큰 인증",
        "desc": "JWT는 Header.Payload.Signature 세 파트를 Base64로 이어 붙인 토큰으로, Payload에 사용자 id 같은 정보와 만료 시간(exp)을 담고 Signature 서명으로 위변조를 막는다. 세션 방식은 서버가 로그인 상태를 기억해야 해서 서버 부하와 수평 확장 문제가 생기지만, JWT는 서버에 상태가 없어(Stateless) MSA·분산 환경에 적합하다. 로그인 흐름은 입력 비밀번호를 checkpw()로 검증하고 통과하면 JWT를 발급해 반환하는 것이다."
      },
      {
        "term": "SOLID 5원칙 — 인증 서버로 배우는 객체지향 설계",
        "desc": "SRP(단일 책임)는 main() 하나가 입력·암호화·토큰·검증을 다 하던 코드를 User·PasswordEncoder·TokenProvider·AuthService로 나누는 것이고, OCP(개방-폐쇄)는 카카오 로그인을 추가할 때 기존 코드를 고치지 않고 구현체만 새로 만드는 것이다. LSP는 자식 클래스가 부모 자리를 완전히 대체할 수 있어야 한다는 것, ISP는 큰 인터페이스 하나보다 작은 인터페이스 여럿이 낫다는 것이다. DIP(의존 역전)는 구현체가 아닌 인터페이스 타입으로 선언하라는 원칙으로, Spring의 DI가 바로 이 원칙의 실천이다."
      },
      {
        "term": "인증 vs 인가, Spring Security 필터 체인",
        "desc": "인증(Authentication)은 당신이 누구인지 확인하는 것(JWT 토큰 검증), 인가(Authorization)는 무엇을 할 수 있는지 결정하는 것(게시글 수정은 작성자만, 관리자 API는 ADMIN만)이다. Spring Security는 필터 체인이 Controller 앞에서 모든 요청을 가로채 JWT를 검증하고, 실패하면 Controller에 들어가 보지도 못하고 401이 자동 반환된다. 커스텀 필터는 요청당 정확히 1회 실행이 보장되는 OncePerRequestFilter를 상속해 만들고, 검증된 사용자 정보는 SecurityContext에 저장한다."
      },
      {
        "term": "Spring Profile 환경 분리와 JAR 배포",
        "desc": "application-dev.yml(H2 인메모리, SQL 로그 출력)과 application-prod.yml(MariaDB, 테이블 유지)로 설정을 나누면 실행 시 --spring.profiles.active 옵션만 바꿔 개발·운영 환경을 오간다. H2에서 MariaDB로 DB를 교체해도 JPA가 추상화해 주므로 Controller·Service·Repository 코드는 한 줄도 안 바뀐다. ./gradlew build로 JAR 하나로 패키징하면 내장 톰캣 덕분에 java -jar만으로 단독 실행된다 — bootRun은 개발용, java -jar는 배포·운영용이다."
      }
    ],
    "examples": [
      {
        "title": "JPA Entity + record DTO + 정적 팩토리 변환 — 게시글 도메인 3종 세트",
        "lang": "java",
        "code": "// Post.java — JPA가 관리하는 영속 객체 (DB의 posts 테이블과 1:1 매핑)\n@Entity @Table(name = \"posts\")           // 이 클래스를 테이블로 매핑한다는 선언\n@Getter @Builder @NoArgsConstructor @AllArgsConstructor  // 반복 코드는 Lombok에 위임\npublic class Post {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)  // PK는 DB가 자동 증가로 발급\n    private Long id;                     // 기본형 long이 아닌 래퍼 Long — null을 표현할 수 있다\n    @Column(nullable = false)            // DDL 생성 시 NOT NULL 제약이 추가됨\n    private String title;                // 제목 컬럼\n    @Column(columnDefinition = \"TEXT\")   // 긴 본문은 TEXT 타입으로 지정\n    private String content;              // 내용 컬럼\n    private Long authorId;               // 작성자 id — 수정 권한 확인의 기준\n}\n\n// PostRequest.java — 입력 DTO: record 한 줄로 불변 객체 완성 (Java 16+)\n// getter, equals, hashCode, toString이 전부 자동 생성된다\npublic record PostRequest(String title, String content, Long authorId) {}\n\n// PostResponse.java — 출력 DTO: Entity를 바깥에 그대로 내보내지 않기 위한 방어막\npublic record PostResponse(Long id, String title) {\n    public static PostResponse from(Post post) {   // 정적 팩토리 변환 패턴 (Day2의 User.of()와 동일)\n        return new PostResponse(post.getId(), post.getTitle());  // 노출할 필드만 골라 담는다\n    }\n}",
        "note": "교재 Day4의 게시글 실습 구조다. Entity·입력 DTO·출력 DTO를 셋으로 분리하는 것이 핵심 — Entity를 그대로 반환하면 DB 구조 노출·민감 정보 유출·순환 참조 세 가지 문제가 생긴다. DTO는 record로 정의하면 한 줄로 끝난다."
      },
      {
        "title": "@Service + @Transactional CRUD — save() 없이 UPDATE되는 변경 감지 체험",
        "lang": "java",
        "code": "// PostService.java — 비즈니스 로직 전담 계층: HTTP를 몰라도 된다\n@Service                                  // Bean 등록 + 비즈니스 역할을 이름으로 명시\n@RequiredArgsConstructor                  // final 필드용 생성자 자동 생성 → 생성자 주입 완성\npublic class PostService {\n    private final PostRepository repo;    // Repository에만 의존 (계층 건너뛰기 금지)\n\n    @Transactional                        // 쓰기 작업 — 중간 실패 시 전체 롤백(원자성)\n    public PostResponse create(PostRequest req) {\n        Post saved = repo.save(Post.builder()          // 빌더로 Entity를 조립해 저장\n                .title(req.title()).content(req.content())\n                .authorId(req.authorId()).build());\n        return PostResponse.from(saved);  // Entity → DTO 변환은 Service의 책임\n    }\n\n    @Transactional(readOnly = true)       // 읽기 전용 — 변경 감지를 꺼서 조회 성능 향상\n    public PostResponse getById(Long id) {\n        return PostResponse.from(repo.findById(id)     // findById는 Optional 반환\n                .orElseThrow(() -> new RuntimeException(\"게시글 없음\")));  // 없으면 404감 예외\n    }\n\n    @Transactional                        // 변경 감지(dirty checking)가 일하는 구간\n    public PostResponse update(Long id, PostRequest req) {\n        Post post = repo.findById(id)     // 영속 상태의 Entity를 꺼내온다\n                .orElseThrow(() -> new RuntimeException(\"게시글 없음\"));\n        post.change(req.title(), req.content());       // 필드만 바꿨는데\n        return PostResponse.from(post);   // save() 호출 없이 커밋 시점에 자동 UPDATE 발생\n    }\n}",
        "note": "교재의 PostService 전체 CRUD 코드 흐름이다. update()에 save()가 없는 것이 포인트 — @Transactional 안에서 findById()로 가져온 Entity는 영속 상태라 필드 변경만으로 커밋 시 UPDATE가 나간다. 서버 실행 후 H2 콘솔(localhost:8080/h2-console)에서 SELECT로 직접 확인해 보자."
      },
      {
        "title": "인터페이스 + 커스텀 예외 — HashMap을 JPA로 갈아끼워도 호출 코드 0줄 수정",
        "lang": "java",
        "code": "// AuthService.java — 인터페이스는 계약: 구현이 바뀌어도 호출자는 그대로\npublic interface AuthService {\n    void register(String id, String pw);  // 무엇을 하는지만 선언, 어떻게는 구현체 몫\n    String login(String id, String pw);   // 성공 시 토큰 문자열 반환\n}\n\n// AuthException.java — RuntimeException을 상속한 커스텀 예외의 뿌리\nclass AuthException extends RuntimeException {\n    public AuthException(String msg) { super(msg); }  // 메시지를 부모 생성자에 전달\n}\nclass DuplicateIdException extends AuthException {    // 상황별로 세분화한 자식 예외\n    public DuplicateIdException() { super(\"이미 존재하는 ID\"); }\n}\n\n// MemoryAuthService.java — Day2 구현체: HashMap 메모리 저장\npublic class MemoryAuthService implements AuthService {\n    private final Map<String, String> store = new HashMap<>();  // id → BCrypt 해시\n    public void register(String id, String pw) {\n        if (store.containsKey(id)) throw new DuplicateIdException();  // 중복은 예외로 거절\n        store.put(id, BCrypt.hashpw(pw, BCrypt.gensalt()));  // 평문 대신 해시를 저장\n    }\n    public String login(String id, String pw) {\n        if (!store.containsKey(id)) throw new AuthException(\"없는 ID\");   // 존재 확인\n        if (!BCrypt.checkpw(pw, store.get(id))) throw new AuthException(\"비밀번호 불일치\");\n        return Jwt.issue(id);             // 검증 통과 시 JWT 발급\n    }\n}\n// Day4 — 저장소를 JpaAuthService로 교체해도, AuthService 타입으로 선언한\n// 호출 코드는 한 줄도 바뀌지 않는다. 다형성의 실전 가치가 여기서 드러난다.",
        "note": "교재가 Day2→Day4 내내 반복 강조하는 설계다. HashMap(오늘) ↔ JPA(Day4) 교체가 가능한 이유는 호출부가 구현체가 아닌 AuthService 인터페이스 타입으로 선언됐기 때문(DIP). 커스텀 예외는 RuntimeException 상속으로 만들고, if-return 대신 예외로 흐름을 끊어 오류 처리를 한곳에 모은다."
      },
      {
        "title": "PasswordEncoder + TokenProvider — 순수 Java로 BCrypt·JWT 구현",
        "lang": "java",
        "code": "// PasswordEncoder.java — 비밀번호 암호화·검증만 책임지는 클래스(SRP)\npublic class PasswordEncoder {\n    // 평문을 BCrypt 해시로 변환한다 (복호화 불가능한 단방향)\n    public String encode(String raw) {\n        // gensalt(12): Work Factor 12 — 기본 10보다 반복이 많아 더 안전\n        return BCrypt.hashpw(raw, BCrypt.gensalt(12));\n    }\n    // 입력 평문과 저장된 해시를 비교한다 — equals() 비교 금지\n    public boolean matches(String raw, String hash) {\n        // Salt가 해시 문자열 안에 있어 checkpw가 알아서 꺼내 검증한다\n        return BCrypt.checkpw(raw, hash);\n    }\n}\n\n// TokenProvider.java — 로그인 성공자에게 JWT를 발급하는 클래스\npublic class TokenProvider {\n    // 서명용 비밀키 — 32자 이상이어야 HMAC 서명이 가능하다\n    private final String SECRET = \"day2-secret-must-be-at-least-32-chars\";\n    // 토큰 유효 시간 30분(밀리초 단위)\n    private final long EXP = 1800000L;\n    // 사용자 id를 담은 토큰을 발급한다\n    public String generate(String userId) {\n        return Jwts.builder()                    // 빌더 패턴으로 토큰 조립 시작\n                .setSubject(userId)              // Payload에 사용자 식별자 저장\n                .setExpiration(new Date(System.currentTimeMillis() + EXP)) // 만료 시각(exp)\n                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()))  // 서명 — 위변조 방지\n                .compact();                      // Header.Payload.Signature 문자열 완성\n    }\n}",
        "note": "교재 Day2 인증 서버 실습의 두 핵심 클래스다. Day1의 평문 저장 + equals() 비교가 왜 위험한지 체감한 뒤, 저장은 hashpw()·검증은 checkpw()·인증 유지 상태는 JWT로 바꾸는 것이 Day2의 전부다. 실무에서는 Spring Security가 제공하는 BCryptPasswordEncoder를 쓰지만 원리는 이 코드와 동일하다."
      },
      {
        "title": "SecurityConfig + JwtAuthFilter — 모든 요청을 지키는 문지기 세우기",
        "lang": "java",
        "code": "// SecurityConfig.java — 전체 인증 정책을 한곳에서 선언한다\n@Configuration @EnableWebSecurity @RequiredArgsConstructor\npublic class SecurityConfig {\n    private final JwtAuthFilter jwtAuthFilter;   // 아래에서 만드는 JWT 검증 필터\n\n    @Bean  // 필터 체인 규칙을 Bean으로 등록\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        return http\n            // REST API는 JWT가 보호를 맡으므로 CSRF 방어는 끈다\n            .csrf(csrf -> csrf.disable())\n            // 세션을 아예 만들지 않는다 — 요청마다 JWT로 인증(Stateless)\n            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                // 로그인·회원가입은 토큰이 없어도 접근 허용\n                .requestMatchers(\"/api/auth/**\").permitAll()\n                // 그 외 모든 요청은 유효한 JWT 필수\n                .anyRequest().authenticated())\n            // 기본 인증 필터보다 앞에 내 JWT 필터를 배치한다\n            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)\n            .build();                            // 설정 완성\n    }\n}\n\n// JwtAuthFilter.java — 요청당 정확히 1회 실행되는 커스텀 필터\npublic class JwtAuthFilter extends OncePerRequestFilter {\n    // 처리 순서: ① Authorization 헤더에서 \"Bearer \" 뒤 토큰 추출\n    // ② TokenProvider.validate()로 만료·서명 검증\n    // ③ Payload의 subject(userId)를 꺼내 SecurityContext에 인증 정보 등록\n    // 검증 실패 시 예외 발생 → 401 자동 반환, Controller에는 진입조차 못 한다\n}",
        "note": "교재 Day5의 SecurityConfig 전체 코드와 JWT 필터 처리 흐름 5단계를 압축했다. Day4까지는 JWT 없이도 /api/posts에 접근됐지만, 이 필터를 씌우면 토큰 없이는 401 자동 차단 — 인증 로직을 Controller마다 쓰지 않고 한곳에서 관리하는 것이 Spring Security의 가치다. Controller에서는 @AuthenticationPrincipal로 인증된 사용자 id를 꺼내 쓴다."
      },
      {
        "title": "JAR 빌드와 프로파일 배포 — 개발 서버에서 운영 서버로",
        "lang": "bash",
        "code": "# 1) 전체 빌드: 테스트 실행 후 실행 가능한 JAR 하나로 패키징\n./gradlew clean build\n# 2) 산출물 확인: build/libs 폴더에 JAR가 생겼는지 본다\nls build/libs/\n# 3) 개발 프로파일로 실행: H2 인메모리 DB + SQL 로그 출력(dev)\njava -jar build/libs/app-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev\n# 4) 운영 프로파일로 실행: MariaDB 접속 + 테이블 유지(prod)\n#    DB가 바뀌어도 소스코드는 한 줄도 안 바뀐다 (JPA 추상화)\njava -jar build/libs/app-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod\n# 5) 보안 검증: 토큰 없이 보호된 API 접근 → 401이 나와야 정상\ncurl -i http://localhost:8080/api/posts\n# 6) 로그인으로 받은 JWT를 헤더에 실으면 → 200 성공\ncurl -i -H \"Authorization: Bearer eyJhbG...\" http://localhost:8080/api/posts\n# 참고: 개발 중에는 ./gradlew bootRun (코드 수정 즉시 반영)\n# 배포·운영은 java -jar (내장 톰캣 포함, 의존성 없는 단독 실행)",
        "note": "교재 Day5 종합 실습의 빌드-배포-검증 흐름 그대로다. Spring Boot는 내장 톰캣을 JAR 안에 품고 있어 서버 설치 없이 java -jar 한 줄로 서비스가 뜬다는 것이 핵심. 401(토큰 없음)과 200(토큰 있음)을 직접 확인하는 것까지가 5일 과정의 완성 조건이다."
      }
    ]
  },
  "agile": {
    "concepts": [
      {
        "term": "스크럼 4이벤트와 타임박스 — 시간을 지키는 것이 규칙의 전부",
        "desc": "2주 Sprint 기준으로 Sprint Planning 2시간(목표 합의·Backlog 선택·Task 분할), Daily Scrum 15분(어제 한 일·오늘 할 일·장애물), Sprint Review 1시간(동작하는 결과물 데모·피드백), Retrospective 45분(Keep/Problem/Try 회고)이 권장 타임박스다. 핵심은 이 시간을 지키는 것 — 논의가 길어지면 별도 회의로 분리한다. Daily Scrum에서 장애물은 발견만 하고, 실제 해결 논의는 종료 후 필요한 사람끼리 따로 한다."
      },
      {
        "term": "Product Backlog · Sprint Backlog · Increment — 3대 산출물의 관계",
        "desc": "Product Backlog는 제품에 필요한 모든 항목을 PO가 우선순위대로 관리하는 전체 목록이고, Sprint Backlog는 그중 이번 Sprint에서 완료하기로 팀이 선택한 항목 + 이를 구현하기 위한 Task들이다. Increment는 Sprint 종료 시점까지 완료된 동작하는 결과물의 합. 흐름으로 보면 Epic → User Story(Product Backlog) → Sprint에 들어온 Story가 Task로 쪼개져 Sprint Backlog가 되고, 완료된 것들이 쌓여 Increment가 된다."
      },
      {
        "term": "INVEST 원칙과 백로그 그루밍 — 다 쓰지 말고, 꺼낼 것만 다듬는다",
        "desc": "좋은 User Story는 Independent(독립 개발 가능)·Negotiable(세부는 협의 가능)·Valuable(사용자 가치 명확)·Estimable(추정 가능)·Small·Testable을 충족해야 한다. 단 처음부터 전부 상세히 쓰지 않는다 — 백로그 초기 등록 때는 제목+한 줄 가치의 Epic 수준으로 두고, Sprint 진입 후보가 됐을 때 그루밍(정리·구체화·우선순위화)에서 인수기준까지 상세화한다. 우선순위 재정렬 → 상위 항목 상세화 → INVEST 체크 → Story Point 추정 순서다."
      },
      {
        "term": "MoSCoW 우선순위와 Story Point — 무엇부터, 얼마나 큰가",
        "desc": "우선순위는 고객 관점에서 Must(반드시)/Should(가능하면)/Could(여유 있으면)/Will not(이번엔 안 함)로 태깅한다(MoSCoW). 규모는 Story Point로 추정하되 절대 시간이 아닌 상대적 난이도를 피보나치 수열(1,2,3,5,8)로 매기며, Planning Poker로 팀원이 동시에 카드를 내 편차가 크면 이유를 토론한다. 추정의 진짜 목적은 정확한 숫자가 아니라 규모에 대한 팀의 공통 이해다."
      },
      {
        "term": "모놀리식 vs MSA — 배포 단위와 분리 기준",
        "desc": "모놀리식은 전체가 하나의 배포 단위라 작은 수정에도 전체를 다시 배포하지만, MSA는 서비스마다 독립 배포·독립 확장이 가능하고 기술 스택도 서비스별로 자유롭다. 대신 서비스 간 통신·장애 전파·운영 복잡도가 비용으로 따라온다. 서비스를 나누는 기준은 도메인 경계(Bounded Context)·데이터 소유권·변경 빈도 — 그리고 Day1에서 쓴 User Story가 어느 컴포넌트(인증서버/Eureka/Gateway/Kafka)로 매핑되는지가 분해의 출발점이 된다."
      },
      {
        "term": "동기(REST) vs 비동기(Kafka) — 통신 방식 선택 기준",
        "desc": "즉시 응답이 필요한 요청-응답 관계면 REST 동기 호출을, 서비스 간 느슨한 결합과 이벤트 전파가 목적이면 Kafka 비동기를 쓴다. Kafka는 Producer가 Topic에 이벤트를 발행하면 Consumer들이 구독해 가져가는 구조라, 발행자는 누가 받는지 몰라도 된다 — 주문 상태 변경 이벤트를 알림·통계 서비스가 각자 구독하는 식이다. 모의 프로젝트에서는 로그인 검증(즉시 응답 필요)은 REST, 상태 변경 전파는 Kafka로 나눠 체험한다."
      },
      {
        "term": "스크럼 3역할 — PO·SM·Dev의 책임 분담",
        "desc": "Product Owner는 제품 백로그를 소유하고 우선순위와 ROI를 책임지는 사람, Scrum Master는 프로세스를 촉진하고 장애물을 제거하며 팀을 보호하고 타임박스를 관리하는 사람, Development Team은 기능을 설계·구현·테스트해 Increment를 완성하는 사람들이다. PO가 다른 업무와 겸직하면 의사결정이 지연되는 병목이 생기므로 전담 배치가 원칙이다. 모의 프로젝트에서는 역할을 고정하지 말고 다음 Sprint에서 다른 역할을 경험해 보는 것을 권장한다."
      },
      {
        "term": "Definition of Done vs 인수 기준(Acceptance Criteria)",
        "desc": "Definition of Done(완료의 정의)은 Increment가 완료로 인정받기 위한 팀 공통 기준으로, 실습이든 실무든 Sprint 시작 전에 팀이 합의해야 한다. 인수 기준은 개별 User Story 하나가 끝났는지 검증하는 조건 명세로 Given-When-Then 형태로 적는다. 같은 '로그인 스토리'라도 DoD가 얼마나 구체적이냐에 따라 Task 분할 결과가 완전히 달라진다는 것을 교재는 웹 에디터 예시로 보여 준다."
      },
      {
        "term": "Agile 도입 5단계와 실패 패턴",
        "desc": "도입 순서는 현황 진단 → 파일럿팀 선정(자발적 1~2개 소규모 팀) → Sprint 0 준비(백로그 초안·DoD 합의·역할 지정) → 첫 Sprint 실행(1~2주, Retro로 즉시 보정) → 확산·정착이며, 처음부터 전사 적용을 시도하지 않는 것이 핵심 원칙이다. 대표 실패 패턴은 Sprint라는 이름만 쓰는 무늬만 Agile, PO 겸직 병목, 회고 없는 반복, Waterfall식 문서화 병행, Sprint Board 없는 진행상황 미가시화 — 각각 목적에 맞는 이벤트 운영, PO 전담, Retro 액션의 다음 Sprint 반영, 대화·시각화 중심 전환, Board·Burndown 매일 갱신으로 대응한다."
      },
      {
        "term": "Release Planning — 백로그에서 출시 로드맵으로",
        "desc": "릴리즈 계획은 백로그 우선순위에 기반해 제품 출시 계획과 Sprint 일정을 세우는 활동으로, 비즈니스 우선순위 정의 → Release별 Epic 배치(Roadmap) → Sprint 일정 수립 순서로 진행한다. 우선순위는 고객 관점의 MoSCoW 기법이나 사용자 행동 순서·빈도를 따지는 User 행동 기법으로 정하고, Sprint 주기는 2~4주 사이에서 전체 기간과 출시 계획을 고려해 결정한다. 화물 운송 서비스라면 차주 등록 기능을 1차 오픈에, 화주 주문·예약을 2차 오픈에 배치하는 식이다."
      },
      {
        "term": "SOLID 리팩토링으로 모놀리스를 MSA로 쪼개기",
        "desc": "LoginService 클래스 하나가 입력 검증·비밀번호 확인·세션 생성·로그 기록을 모두 담당하면 인증 로직만 떼어 다른 서비스로 옮길 수 없다. SRP로 CredentialValidator·SessionManager·AuthLogger로 책임을 나누고, OCP로 인증 방식(비밀번호/OAuth) 추가 시 기존 코드 수정 없이 확장하며, DIP로 UserRepository 인터페이스에 의존하게 바꾼다. 이렇게 분리된 컴포넌트가 각각 인증서버 내부 로직·OAuth 모듈·Kafka 이벤트 발행으로 이관된다 — 이 매핑표가 그대로 Sprint 1의 Product Backlog가 된다."
      },
      {
        "term": "Circuit Breaker와 Anti-corruption Layer",
        "desc": "MSA는 서비스 간 통신이 많아져 한 서비스의 장애가 연쇄적으로 번질 수 있는데, Circuit Breaker는 오류가 반복되는 서비스로 가는 호출을 차단(사용 불가 전환)해 장애 전파를 막고 fallback 함수로 대체 응답을 주며 대시보드로 상태를 모니터링한다. Anti-corruption Layer는 서비스끼리 데이터 모델을 공유하지 않고 API 결과만 받아 자기 서비스 쪽에서 가공하는 방식이다. 서비스별 중복 코드·중복 데이터가 생기는 것을 감수하는 대신, 각 서비스가 서로 영향 없이 독립적으로 개발할 수 있게 된다."
      }
    ],
    "examples": [
      {
        "title": "모호한 한 줄을 Sprint에 넣을 수 있는 User Story로 — Before/After + Task 분할",
        "lang": "text",
        "code": "[Before] 모호한 백로그 항목\n  \"로그인 기능 개발\"\n  → 누가 쓰는지, 왜 필요한지, 언제 끝났다고 볼지 몰라 팀마다 다르게 해석한다\n\n[After] INVEST를 적용한 User Story                       [우선순위: Must]\n  As a 회원, I want 이메일/비밀번호로 로그인하고 싶다,\n  So that 내 계정에 안전하게 접근할 수 있다\n\n  인수 기준(Acceptance Criteria) — Day2 구현의 테스트 기준이 된다\n   1. 올바른 이메일/비밀번호 입력 시 메인 화면으로 이동한다\n   2. 잘못된 정보 입력 시 오류 메시지를 표시한다\n   3. 5회 연속 실패 시 계정이 일시 잠긴다\n\n[Task 분할 + Story Point] — Sprint Backlog로 들어가는 단위\n  User Story           Task                              Point\n  로그인 API 구현       인증서버 엔드포인트 개발             3\n                       JWT 토큰 발급 로직 구현              2\n                       단위 테스트 작성                     1\n  Kafka 메시지 발행     주문 상태 변경 Producer 구현          3\n                       Topic / Consumer 그룹 설정           2\n\n  * Point는 시간이 아니라 상대적 난이도(피보나치 1,2,3,5,8)\n  * Planning Poker로 팀이 함께 추정 — 편차가 크면 이유부터 토론",
        "note": "교재의 Before/After 예시와 Task 분할표를 합친 흐름이다. 팀 실습 순서는 Epic 브레인스토밍 → As a / I want / So that으로 분해 → MoSCoW 태깅 → 상위 10개만 INVEST 체크·인수기준 작성 → Planning Poker 추정. 인수기준이 상세할수록 Day2 MSA 구현이 매끄러워진다."
      },
      {
        "title": "MSA 모의 프로젝트 — 요청 흐름 4단계와 Sprint Board·Daily Scrum 운영",
        "lang": "text",
        "code": "[요청 흐름] Client가 보낸 요청 하나가 지나가는 길\n  1. Client ---> API Gateway        : 모든 요청의 단일 진입점\n  2. Gateway ---> Eureka 조회        : 대상 서비스의 위치를 찾아 라우팅\n  3. 인증 필요 시 ---> 인증서버(Auth)  : JWT 토큰 검증\n  4. 비즈니스 서비스 처리 후 ---> Kafka : 상태 변경 이벤트 발행,\n                                       다른 서비스들이 비동기로 구독\n\n[컴포넌트 x 통신 방식]\n  인증서버 Auth : 로그인 처리, JWT 발급·검증        - REST 동기\n  Eureka        : 서비스 등록·위치 탐색(Discovery)   - 등록/조회\n  API Gateway   : 진입점, 라우팅·인증 필터           - REST 동기\n  Kafka         : 이벤트 기반 서비스 간 통신          - Producer/Consumer, Topic\n\n[Sprint Board] 팀 진행 상황을 매일 가시화\n  To Do              In Progress        Done\n  Kafka Topic 설정    로그인 API 구현     Gateway 라우팅 설정\n  단위 테스트 작성    JWT 토큰 로직\n\n[Daily Scrum 한마디 — 15분, 보드 앞에서]\n  \"어제 Gateway 라우팅 설정을 완료해서 Done으로 옮겼습니다.\n   오늘은 로그인 API 구현을 시작하는데, JWT 라이브러리 버전\n   확인이 필요해서 In Progress에 유지하겠습니다.\"\n  * 장애물은 여기서 발견만, 해결 논의는 스크럼 종료 후 별도로",
        "note": "교재 Day2 모의 프로젝트의 아키텍처와 운영 시나리오다. Day1에서 작성한 User Story가 그대로 컴포넌트에 매핑된다 — \"로그인하고 싶다\"는 인증서버, \"다른 서비스를 찾고 싶다\"는 Eureka, \"주문 상태를 실시간으로 알고 싶다\"는 Kafka 구현으로 이어진다. 계획(Story)과 실행(보드)이 한 몸이 되는 것이 이 과목의 핵심 체험이다."
      },
      {
        "title": "우리 팀 Agile 전환 체크리스트 — Sprint 0 전후로 점검",
        "lang": "text",
        "code": "[Sprint 0 이전 — 시작할 준비가 됐는가]\n  [ ] PO / SM / Dev 역할을 명확히 확정했는가?\n  [ ] Definition of Done 초안을 팀과 합의했는가?\n  [ ] Product Backlog에 최소 10~15개 항목을 확보했는가?\n\n[Sprint 0 — 첫 Sprint를 설계했는가]\n  [ ] Sprint 목표(Goal)를 한 문장으로 정의했는가?\n  [ ] Sprint Backlog를 Task 단위로 구성했는가?\n  [ ] Sprint Board(물리 또는 디지털)를 셋업했는가?\n\n[첫 Sprint 종료 후 — 개선 고리가 돌아가는가]\n  [ ] Retrospective를 진행하고 액션 아이템을 도출했는가?\n  [ ] Velocity(팀 처리량) 기록을 시작했는가?\n  [ ] 도출된 개선사항을 다음 Sprint 계획에 반영했는가?\n\n[함께 보는 실패 패턴 -> 대응]\n  무늬만 Agile(이름만 Sprint)  -> 이벤트를 형식이 아닌 목적대로 운영\n  PO 겸직 병목                 -> PO 전담 배치 또는 권한 팀 위임\n  회고 없는 반복               -> Retro 액션을 다음 Sprint에 반드시 반영\n  과도한 문서화 병행           -> 꼭 필요한 산출물만, 대화·시각화 중심\n  진행상황 미가시화            -> Board·Burndown Chart로 매일 가시화",
        "note": "교재 Day 1의 'Agile 전환 체크리스트'와 '흔한 문제 상황과 대응' 표를 한 장으로 합쳤다. 처음부터 전사 적용하지 않고 파일럿 팀에서 검증 후 확산한다는 5단계 로드맵의 실행 도구이며, 팀 프로젝트 시작 전에 이 체크리스트를 그대로 돌려 보면 Sprint 0에서 무엇이 빠졌는지 바로 드러난다."
      },
      {
        "title": "수강신청 MSA — Sprint 1~3 실행과 Review·갭 분석·KPT",
        "lang": "text",
        "code": "[Sprint별 목표와 대표 Task (Story Point)]\n  Sprint 1  인증서버(OAuth) 구축\n    기존 로그인 로직 분석(3) / SOLID 리팩토링(5)\n    Spring Boot 이관(3) / OAuth 서버 설정(5) / Gateway 라우팅(3)\n  Sprint 2  Eureka 서비스 디스커버리 연동\n    Eureka Server 구축(3) / 각 서비스 Client 등록(3)\n    서비스명 기반 동적 라우팅(3) / 서비스 간 REST 호출(5)\n  Sprint 3  Kafka 이벤트 연동\n    course-applied Topic 생성(2) / Producer 구현(3)\n    알림 서비스 Consumer 구현(3) / End-to-End 통합 테스트(3)\n\n[Sprint Review — 계획 대비 실행 갭 분석]\n  계획 항목            실행 결과    차이 원인\n  인증/로그인 API      완료         SOLID 리팩토링에 예상보다 시간 소요\n  Eureka 연동          완료         계획대로 진행\n  Kafka 발행/구독      부분 완료    장애 대응 로직은 다음 Sprint로 이월\n\n[Retrospective — Keep / Problem / Try]\n  Keep    : Sprint로 나누니 Kafka 같은 낯선 기술도 부담 없이 접근\n  Problem : Story Point 추정이 실제 난이도보다 낮게 잡혔다\n  Try     : 낯선 기술은 Spike(사전 조사) Task를 별도 배정,\n            난이도 높은 Task는 Point를 보수적으로 추정",
        "note": "교재 Day 2의 Sprint 1~3 Planning 표, 갭 분석 프레임워크, Retrospective 대본을 하나의 실행 기록으로 재구성했다. Review는 무엇을 완성했는지 보여주는 자리라 미완성 Task도 솔직히 공유하고 다음 계획에 반영하는 것이 규칙. 계획보다 오래 걸린 원인이 추정 오류인지 기술 난이도인지 구분하는 질문이 갭 분석의 핵심이다."
      },
      {
        "title": "온라인 교육 플랫폼 — 요구사항에서 서비스 경계 도출까지",
        "lang": "text",
        "code": "[Step 1. 요구사항 분석 — 주체별 기능 나열]\n  수강생 : 회원가입, 로그인, 강의 검색, 수강신청, 결제, 추천 강의 조회\n  강사   : 회원가입, 로그인, 강의 등록\n  시스템 : 결제 완료 후 수강 활성화, 수강 완료 후 추천 갱신\n\n[Step 2. 도메인 분리 — 기능을 묶어 서비스 경계 도출]\n  서비스               스택         포트   묶인 기능              핵심 데이터\n  User Service         Spring Boot  8081   가입·로그인·JWT 인증   users\n  Course Service       Spring Boot  8082   강의 등록·목록·검색    courses\n  Enrollment Service   Spring Boot  8083   수강신청·상태 관리     enrollments\n  Payment Service      Spring Boot  8084   결제 처리·내역         payments\n  Recommend Service    FastAPI      8085   수강 이력 기반 추천    (조회 전용)\n\n[Step 3~4. 인프라·통신 설계 판단 기준]\n  즉시 응답이 필요한 요청-응답    -> REST 동기 (예: 로그인, 강의 검색)\n  상태 변경을 여럿에게 전파       -> Kafka 비동기 (예: 결제 완료 이벤트)\n  장애 전파 차단                  -> Circuit Breaker + fallback\n  모델 공유 금지                  -> API 결과만 받아 자기 쪽에서 가공(ACL)",
        "note": "교재 Day 3(MSA를 이용한 웹 서비스 구축)의 Step 1~4를 압축한 설계 캔버스다. 서비스마다 스택과 포트가 달라도 되는 것(Recommend만 FastAPI)이 MSA의 기술 스택 자유이고, 기능을 묶는 기준은 도메인 경계와 데이터 소유권이다. 팀 프로젝트에서 어떤 기능을 몇 개의 서비스로 나눌지 정할 때 이 표 형식을 그대로 재사용하면 된다."
      }
    ]
  },
  "container": {
    "concepts": [
      {
        "term": "Namespace(네임스페이스)",
        "desc": "같은 컴퓨터 위에서 돌더라도 컨테이너마다 프로세스·네트워크가 서로 안 보이게 칸막이를 쳐 주는 리눅스 기술이다. 독서실 칸막이처럼 시야를 막아 각 컨테이너가 독립된 것처럼 보이게 하며, docker exec 로 컨테이너 안에서 프로세스 목록을 보면 자기 것만 보이는 이유가 바로 이것이다."
      },
      {
        "term": "cgroups",
        "desc": "컨테이너마다 CPU·메모리를 얼마나 쓸 수 있는지 상한선을 두는 리눅스 기술이다. 정해진 용돈만 쓰게 하듯 자원 사용량을 제한해 한 컨테이너가 자원을 독차지하지 못하게 막는다. Namespace 가 시야를 나눈다면 cgroups 는 사용량을 나눈다고 기억하면 된다."
      },
      {
        "term": "이미지 레이어와 빌드 캐시",
        "desc": "Dockerfile 의 한 줄 한 줄이 케이크처럼 층(레이어)으로 쌓여 이미지가 되고, 코드가 바뀌면 바뀐 층부터만 다시 만든다. 그래서 잘 안 바뀌는 의존성 설치는 앞쪽에, 자주 바뀌는 소스 복사는 뒤쪽에 배치하면 이전 층이 캐시로 재사용되어 빌드가 훨씬 빨라진다."
      },
      {
        "term": "볼륨(Volume)",
        "desc": "컨테이너 바깥에 마련된 데이터 창고다. 컨테이너를 지우면 안의 데이터도 함께 사라지지만, 볼륨에 담아 둔 데이터는 컨테이너가 삭제돼도 그대로 남는다. DB 컨테이너처럼 데이터를 지켜야 하는 경우 -v 옵션이나 compose 의 volumes 항목으로 반드시 연결해 둔다."
      },
      {
        "term": "브리지 네트워크와 이름 통신",
        "desc": "Docker 가 컨테이너들을 위해 자동으로 깔아 주는 가상 도로망(bridge network)으로, 같은 네트워크 위의 컨테이너끼리는 IP 대신 컨테이너 이름을 주소처럼 써서 통신한다. compose 를 쓰면 이 네트워크가 자동으로 만들어지므로 DB_HOST=db 처럼 서비스 이름만 적어도 연결된다."
      },
      {
        "term": "프로그램·프로세스, 이미지·컨테이너 — 같은 관계",
        "desc": "프로그램은 디스크에 가만히 저장된 코드(악보), 프로세스는 CPU와 메모리를 쓰며 실제로 실행 중인 상태(연주)다. 이미지와 컨테이너가 정확히 같은 관계다 — 이미지는 실행되기 전의 저장된 설계도(붕어빵 틀), 컨테이너는 그 이미지로 실제 실행되고 있는 것(붕어빵). 틀 하나로 붕어빵을 여러 개 굽듯, 이미지 하나로 컨테이너를 여러 개 띄울 수 있다."
      },
      {
        "term": "Bare-metal → VM → Container 진화",
        "desc": "Bare-metal은 물리 서버에 프로그램을 직접 설치하는 방식이라 앱끼리 라이브러리가 충돌하고 서버 한 대가 죽으면 전부 멈춘다. VM은 Hypervisor 위에 Guest OS를 통째로 얹어 완전히 격리하지만, 원룸마다 부엌·화장실을 새로 짓는 것처럼 무겁고 느리다. 컨테이너는 OS 커널을 공유하면서 앱 실행에 필요한 코드·라이브러리·설정만 포장한다 — 가상 컴퓨터가 아니라 살짝 눈가림된 프로세스라서 VM보다 훨씬 가볍고 순식간에 뜬다."
      },
      {
        "term": "포트 매핑(-p 호스트포트:컨테이너포트)",
        "desc": "포트는 한 컴퓨터 안에서 여러 프로그램을 구분하는 번호로, 아파트의 호수(101호, 102호)와 같다. docker run의 -p 6000:5000은 내 컴퓨터 6000번 문을 컨테이너의 5000번 문과 연결하라는 뜻이라, 브라우저에서는 localhost:6000으로 접속해야 열린다. Dockerfile의 EXPOSE는 실제 연결이 아니라 이 컨테이너가 몇 번 문으로 손님을 받는지 적어 둔 안내문이다."
      },
      {
        "term": "Bind Mount vs Named Volume",
        "desc": "둘 다 컨테이너 바깥에 데이터를 두는 방법이지만 성격이 다르다. Bind Mount는 내 컴퓨터의 특정 폴더를 컨테이너에 그대로 연결하는 방식이라 코드를 수정하면 즉시 반영되어 개발할 때 편리하다. Named Volume은 Docker가 알아서 관리하는 창고라 DB처럼 계속 남아야 할 데이터에 적합하고, 어느 컴퓨터로 옮겨도 잘 동작한다."
      },
      {
        "term": "리눅스 터미널·권한·쉘 스크립트",
        "desc": "리눅스는 Windows의 C드라이브 대신 뿌리(/) 하나에서 시작하는 나무 구조로 파일을 정리하고, 터미널에서 pwd(현재 위치)·ls(목록)·cd(이동)·mkdir·touch·cp·mv·rm으로 다룬다. 모든 파일에는 읽기(r)·쓰기(w)·실행(x) 세 권한이 소유자·그룹·기타 세 그룹별로 걸려 있고, 스크립트를 실행하려면 chmod +x로 실행 권한을 줘야 한다. 명령어를 순서대로 적어 한 번에 실행하는 파일이 쉘 스크립트(.sh)이며 변수·조건문·반복문 세 가지만 알면 충분하다."
      }
    ],
    "examples": [
      {
        "title": "레이어 캐시를 살리는 순서로 WAS Dockerfile 쓰기",
        "lang": "dockerfile",
        "code": "# 파이썬 실행 환경이 담긴 공식 이미지에서 출발한다 (첫 번째 레이어)\nFROM python:3.11-slim\n# 컨테이너 안 작업 폴더를 /app 으로 정한다\nWORKDIR /app\n# 자주 바뀌지 않는 의존성 목록만 먼저 복사한다 (캐시 활용 포인트)\nCOPY requirements.txt .\n# 의존성 설치 결과가 하나의 층(레이어)으로 저장된다\nRUN pip install --no-cache-dir -r requirements.txt\n# 자주 바뀌는 소스 코드는 마지막에 복사한다\n# 코드만 고치면 위의 설치 레이어는 캐시로 재사용되어 빌드가 빨라진다\nCOPY . .\n# 이 컨테이너가 5000번 포트를 사용한다고 알린다\nEXPOSE 5000\n# 컨테이너가 시작될 때 서버를 자동으로 실행한다\nCMD [\"python\", \"app.py\"]"
      },
      {
        "title": "이미지 레이어 확인하고 레지스트리에 올리기 (tag → push → pull)",
        "lang": "bash",
        "code": "# 빌드한 이미지가 몇 개의 층으로 쌓였는지 눈으로 확인한다\ndocker history my-was:1.0          # Dockerfile 한 줄이 한 층씩 기록되어 있다\n# Docker Hub 계정으로 로그인한다 (창고 문 열기)\ndocker login                       # 로그인 없이는 push 가 거부된다\n# 창고 주소가 담긴 이름표를 붙인다 (myid 는 본인 계정으로 변경)\ndocker tag my-was:1.0 myid/my-was:1.0\n# 같은 이미지에 태그가 두 개 붙었는지 확인한다\ndocker images                      # 태그는 어느 창고 어느 칸에 둘지 정하는 이름표\n# 창고(레지스트리)에 이미지를 올린다\ndocker push myid/my-was:1.0        # 레이어 단위로 업로드된다\n# 다른 컴퓨터에서는 같은 이미지를 내려받아 그대로 실행할 수 있다\ndocker pull myid/my-was:1.0        # login, tag, push, pull 순서를 기억하자"
      },
      {
        "title": "Web·WAS·DB 3계층 게시판을 compose 파일 하나로 띄우기",
        "lang": "yaml",
        "code": "services:                          # 함께 띄울 컨테이너(서비스) 목록\n  web:                             # 1층: 사용자가 보는 화면(웹 서버)\n    build: ./web                   # web 폴더의 Dockerfile 로 이미지를 만든다\n    ports:                         # 포트 연결 설정\n      - \"8080:80\"                  # 내 컴퓨터 8080 을 컨테이너 80에 연결\n    depends_on: [was]              # was 가 먼저 켜진 뒤에 시작한다\n  was:                             # 2층: 요청을 처리하는 서버(WAS)\n    build: ./was                   # was 폴더의 Dockerfile 로 빌드\n    environment:                   # 환경 변수로 설정을 주입한다\n      - DB_HOST=db                 # db 는 아래 서비스 이름과 정확히 같아야 한다\n    depends_on: [db]               # db 가 먼저 켜진 뒤에 시작한다\n  db:                              # 3층: 데이터를 저장하는 DB\n    image: postgres:17             # 공식 postgres 이미지를 그대로 사용\n    environment:                   # DB 초기 설정값\n      - POSTGRES_PASSWORD=1234     # 접속 비밀번호\n      - POSTGRES_DB=board          # 게시판용 데이터베이스 이름\n    volumes:                       # 데이터를 지킬 볼륨 연결\n      - board-data:/var/lib/postgresql/data   # postgres 의 데이터 저장 경로\nvolumes:                           # 볼륨은 최상위에서 한 번 더 선언해야 한다\n  board-data:                      # down 후 다시 up 해도 데이터가 남는 창고"
      },
      {
        "title": "터미널 첫걸음 — 실습 폴더 만들기와 쉘 스크립트",
        "lang": "bash",
        "code": "# 지금 내가 어느 폴더에 있는지 확인한다 (print working directory)\npwd\n# 실습용 폴더를 새로 만든다\nmkdir workspace\n# 만든 폴더 안으로 이동한다 (change directory)\ncd workspace\n# 내용이 빈 파일을 만든다\ntouch app.py\n# 숨김 파일까지 자세히 나열해 결과를 확인한다\nls -al\n# 배포 스크립트 파일을 만든다고 하자 — 아래 세 줄이 스크립트의 전부다\ncat deploy.sh\n#   #!/bin/bash                        <- 이 파일을 bash로 실행하라는 선언\n#   APP_NAME=\"my-app\"                  <- 변수: 자주 바뀌는 값에 이름표 붙이기\n#   echo \"안녕하세요, $APP_NAME 입니다\"  <- 변수 값을 넣어 출력\n# 스크립트에 '실행' 권한이라는 열쇠를 추가한다\nchmod +x deploy.sh\n# 이제 직접 실행할 수 있다\n./deploy.sh\n# 로그 파일의 마지막 20줄만 본다 (최근 상황 확인)\ntail -n 20 app.log\n# 로그에서 ERROR 글자가 있는 줄만 골라낸다\ncat app.log | grep ERROR",
        "note": "교재 1장 Linux OS 기초의 실습(나만의 폴더 만들기)과 쉘 스크립트 단원을 이어 붙였다. rm은 휴지통 없이 즉시 삭제되니 실행 전 꼭 확인하고, 조건문의 대괄호 [ ] 양옆 띄어쓰기가 가장 흔한 실수라는 것이 교재의 팁. 컨테이너와의 대화는 전부 이 터미널 위에서 이루어지므로 여기서 손을 풀어 두자."
      },
      {
        "title": "컨테이너의 정체 확인 — 프로세스·포트·볼륨 3연속 실험",
        "lang": "bash",
        "code": "# nginx 컨테이너를 백그라운드(-d)로 하나 띄운다\ndocker run -d --name demo nginx\n# [실험1] 호스트에서 프로세스 목록을 보면 nginx가 그대로 보인다\nps -ef | grep nginx\n# 컨테이너 안에서 보면 자기 혼자만 있는 것처럼 보인다 (Namespace 눈가림)\ndocker exec demo ps -ef\n# 결론: 컨테이너 = 가상 컴퓨터가 아니라 격리된 '프로세스'\n\n# [실험2] 포트 매핑의 앞 숫자만 내가 접속할 문 번호다\ndocker run -d -p 6000:5000 my-app:1.0\n# localhost:6000 은 열리고, localhost:5000 은 안 열린다\ncurl http://localhost:6000\n\n# [실험3] 볼륨: 컨테이너가 사라져도 데이터가 남는 바깥 창고\ndocker volume create my-data\n# 만들어진 볼륨 목록을 확인한다\ndocker volume ls\n# 볼륨을 /data 경로에 연결해 컨테이너를 실행한다\ndocker run -d -v my-data:/data alpine sleep 1000\n# 볼륨의 실제 저장 위치 등 상세 정보를 확인한다\ndocker volume inspect my-data",
        "note": "교재 7장(컨테이너 구조)의 '컨테이너도 결국 프로세스' 실습과 3장(네트워크·스토리지)의 포트 바꿔 실행하기·볼륨 만들기 실습을 하나로 묶었다. 호스트의 ps에는 보이는데 컨테이너 안에서는 자기만 보이는 것이 Namespace의 눈가림이고, 이 가벼움이 VM과의 결정적 차이다."
      },
      {
        "title": "Compose 없이 3-tier 게시판 손으로 연결하기 (Day 1 방식)",
        "lang": "bash",
        "code": "# 세 컨테이너가 이름으로 대화할 전용 도로망(네트워크)을 먼저 깐다\ndocker network create board-net\n# [1층 DB] 공식 postgres 이미지를 네트워크에 붙여 실행한다\ndocker run --name board-db --network board-net \\\n  -e POSTGRES_PASSWORD=1234 -e POSTGRES_DB=board -d postgres:17\n# [2층 WAS] 서버용 Dockerfile로 이미지를 빌드한다\ndocker build -t board-was:1.0 ./was\n# WAS 실행: DB 주소는 IP가 아니라 컨테이너 '이름'(board-db)을 그대로 쓴다\ndocker run --name board-was --network board-net \\\n  -e DB_HOST=board-db -p 5000:5000 -d board-was:1.0\n# [3층 Web] 화면용 nginx 이미지를 빌드한다\ndocker build -t board-web:1.0 ./web\n# Web 실행: 내 컴퓨터 8080 문을 컨테이너 80 문에 연결한다\ndocker run --name board-web -p 8080:80 -d board-web:1.0\n# 세 컨테이너가 모두 Up 상태인지 확인한다\ndocker ps\n# 브라우저에서 localhost:8080 접속 → 글쓰기 → DB 저장까지 확인\n# 문제가 있으면 WAS의 DB 연결 로그부터 본다\ndocker logs board-was",
        "note": "교재 5장 종합 실습 1의 Step 1~6을 명령어 흐름으로 압축했다. DB_HOST=board-db처럼 컨테이너 이름을 주소로 쓸 수 있는 것이 같은 네트워크의 힘이며, run을 세 번 치는 이 번거로움이 Day 2에서 docker-compose.yml 파일 하나 + up 한 줄로 바뀐다. 기존 실습예제의 compose 3계층 예제와 비교하며 보면 Compose의 고마움이 확실해진다."
      }
    ]
  },
  "k8s": {
    "concepts": [
      {
        "term": "Manifest(매니페스트)",
        "desc": "쿠버네티스에게 무엇을 어떻게 띄워 달라고 적어 내는 요청 명세서로, 보통 YAML 로 작성한다. kubectl 로 전달하면 etcd 라는 내부 저장소에 보관되고, 이후에는 쿠버네티스가 이 문서를 기준으로 알아서 상태를 유지한다. apiVersion·kind·metadata·spec 네 부분이 뼈대다."
      },
      {
        "term": "선언적(Declarative) 운영",
        "desc": "어떻게 하라를 하나하나 지시하는 명령형과 달리, 이렇게 되어 있어야 한다는 결과만 선언하는 방식이다. 명세서를 제출한 뒤에는 컨트롤러가 계속 지켜보며 어긋난 부분을 스스로 맞추기 때문에, 운영자가 옆에 붙어 지시하고 조율할 필요가 없어진다."
      },
      {
        "term": "SPEC 과 STATUS",
        "desc": "SPEC 은 사용자가 이렇게 되기를 원한다고 선언한 목표 상태(Desired State)이고, STATUS 는 쿠버네티스가 관찰해 기록한 현재 상태(Current State)다. 둘이 어긋나면 쿠버네티스가 스스로 움직여 맞추며, kubectl get -o yaml 로 status 필드를 열어 보면 현재 상태를 확인할 수 있다."
      },
      {
        "term": "Control Plane 컴포넌트의 역할 분담",
        "desc": "API Server 는 모든 요청을 받는 접수 창구, etcd 는 명세서를 보관하는 장부, Scheduler 는 파드가 실행될 노드를 고르는 자리 배정 담당, Controller 는 선언된 상태와 어긋나면 복구하는 감독, 각 노드의 kubelet 은 실제로 컨테이너를 실행하는 일꾼, kube-proxy 는 네트워크를 이어 주는 배선 담당이다."
      },
      {
        "term": "livenessProbe vs readinessProbe",
        "desc": "liveness 는 앱이 살아 있는지 검사해 실패가 반복되면 컨테이너를 재시작하고, readiness 는 손님 받을 준비가 됐는지 검사해 실패하면 재시작 대신 Service 의 연결 명단(Endpoints)에서 빼 트래픽만 차단한다. 준비 상태가 돌아오면 명단에 다시 올라가므로, 일시적 과부하와 진짜 장애를 구분해 대응할 수 있다."
      }
    ],
    "examples": [
      {
        "title": "Deployment 매니페스트로 파드 3개를 선언하기",
        "lang": "yaml",
        "code": "apiVersion: apps/v1                # Deployment 가 속한 API 그룹과 버전\nkind: Deployment                   # 리소스 종류: 파드 개수를 지켜 주는 배포 관리자\nmetadata:                          # 이 리소스의 이름표 영역\n  name: nginx-deployment           # 클러스터 안에서 부를 이름\nspec:                              # 원하는 상태(desired state)를 적는 곳\n  replicas: 3                      # 파드가 항상 3개 있어야 한다는 선언\n  selector:                        # 어떤 파드가 내 관리 대상인지 고르는 기준\n    matchLabels:                   # 라벨이 일치하는 파드를 관리한다\n      app: nginx                   # app=nginx 라벨을 가진 파드가 대상\n  template:                        # 새로 만들 파드의 설계도\n    metadata:                      # 파드에 붙일 이름표\n      labels:                      # selector 와 반드시 짝이 맞아야 한다\n        app: nginx                 # 이 라벨 덕분에 관리 대상으로 인식된다\n    spec:                          # 파드 내용물 정의\n      containers:                  # 파드 안에서 돌릴 컨테이너 목록\n        - name: nginx              # 컨테이너 이름\n          image: nginx:1.21.6      # 실행할 컨테이너 이미지와 버전\n          ports:                   # 컨테이너가 여는 포트\n            - containerPort: 80    # 80번 포트로 요청을 받는다"
      },
      {
        "title": "liveness·readiness 프로브로 파드 라이프사이클 관리하기",
        "lang": "yaml",
        "code": "spec:                                      # 파드 설계도의 내용물 부분\n  containers:                              # 컨테이너 목록\n    - name: my-spring-app                  # 스프링부트 앱 컨테이너\n      image: myid/my-api-server:1.0.0      # 배포할 내 애플리케이션 이미지\n      ports:                               # 앱이 여는 포트\n        - containerPort: 8080              # 서비스 요청을 받는 포트\n      livenessProbe:                       # 살아 있는지 검사(실패 시 재시작)\n        httpGet:                           # HTTP 로 상태를 물어본다\n          path: /actuator/health/liveness  # 스프링 액추에이터의 생존 확인 주소\n          port: 8081                       # 관리용 포트\n        initialDelaySeconds: 5             # 시작 5초 뒤부터 검사 시작\n        periodSeconds: 10                  # 10초마다 검사\n        failureThreshold: 3                # 3번 연속 실패하면 컨테이너 재시작\n      readinessProbe:                      # 손님 받을 준비 검사(실패 시 트래픽 제외)\n        httpGet:                           # HTTP 로 상태를 물어본다\n          path: /actuator/health/readiness # 준비 상태 확인 주소\n          port: 8081                       # 관리용 포트\n        initialDelaySeconds: 5             # 시작 5초 뒤부터 검사 시작\n        periodSeconds: 10                  # 10초마다 검사\n        failureThreshold: 3                # 3번 실패하면 Endpoints 명단에서 빠진다"
      },
      {
        "title": "롤링 업데이트로 무중단 배포하고 문제 시 롤백하기",
        "lang": "bash",
        "code": "# 매니페스트를 클러스터에 적용한다 (선언한 대로 맞춰 달라는 요청)\nkubectl apply -f deploy.yaml\n# 파드 3개가 모두 Running 인지 확인한다\nkubectl get pods -l app=nginx\n# 이미지 버전을 바꿔 롤링 업데이트를 시작한다 (파드가 하나씩 교체되어 무중단)\nkubectl set image deployment/nginx-deployment nginx=nginx:1.25\n# 교체가 끝날 때까지 진행 상황을 지켜본다\nkubectl rollout status deployment/nginx-deployment\n# 지금까지의 배포 이력을 확인한다\nkubectl rollout history deployment/nginx-deployment\n# 새 버전에 문제가 있으면 직전 버전으로 즉시 되돌린다\nkubectl rollout undo deployment/nginx-deployment\n# 되돌린 뒤 파드 상태를 다시 확인한다\nkubectl get pods -l app=nginx"
      }
    ]
  },
  "k8s-adv": {
    "concepts": [
      {
        "term": "ServiceAccount 중심 계정 관리",
        "desc": "쿠버네티스는 사람 계정(User·Group)을 직접 관리하지 않아 외부 인증 연동이 필요하고, 실제 운영에서는 ArgoCD·Jenkins 같은 자동화 도구가 파드로 돌면서 API 를 호출한다. 그래서 시스템 계정인 ServiceAccount 를 중심으로 권한을 관리하며, 파드를 만들면 default ServiceAccount 가 자동으로 연결되고 토큰이 파드 안에 마운트된다."
      },
      {
        "term": "Role·RoleBinding 의 구조",
        "desc": "권한은 계정에 직접 주지 않고 역할(Role)에 담아 바인딩으로 연결한다. Role 은 어떤 리소스(resources)에 어떤 동작(verbs)을 허용할지 apiGroups 와 함께 적은 권한 묶음이고, RoleBinding 이 그 역할을 ServiceAccount 같은 주체(subject)에 묶어 준다. 네임스페이스를 넘는 전역 권한은 ClusterRole·ClusterRoleBinding 을 쓴다."
      },
      {
        "term": "HPA 의 스케일링 계산 공식",
        "desc": "원하는 파드 수는 ceil(현재 파드 수 x 현재 지표값 / 목표 지표값)로 계산된다. 예를 들어 목표 CPU 250m 인데 실제 평균이 400m 이면 파드 4개가 7개로 늘어난다. 기본 동작은 늘릴 때는 대기 없이 빠르게, 줄일 때는 5분 안정화 창을 두고 보수적으로 움직여 출렁임을 막는다."
      },
      {
        "term": "QoS 클래스와 축출 순서",
        "desc": "requests 와 limits 를 어떻게 적었느냐에 따라 파드는 Guaranteed(둘이 같음)·Burstable(일부만 지정)·BestEffort(둘 다 없음) 등급을 받는다. 노드 자원이 부족해지면 BestEffort 부터 먼저 쫓겨나므로, 중요한 서비스일수록 requests 와 limits 를 명확히 적어 등급을 높여 두어야 한다."
      },
      {
        "term": "Ingress Canary 의 3가지 라우팅 방식",
        "desc": "Ingress Controller 의 canary 어노테이션으로 신버전에 트래픽 일부만 흘려보낼 수 있다. weight 는 정한 비율만큼 무작위로, header 는 특정 HTTP 헤더를 단 요청만, cookie 는 특정 쿠키를 가진 사용자만 신버전으로 보낸다. 내부 테스터에게만 먼저 열어 검증한 뒤 비율을 늘려 가는 안전한 배포가 가능해진다."
      }
    ],
    "examples": [
      {
        "title": "ServiceAccount 에 조회 전용 권한 묶기 (Role + RoleBinding)",
        "lang": "yaml",
        "code": "apiVersion: v1                            # 코어 API 그룹\nkind: ServiceAccount                      # 파드나 도구가 쓰는 시스템 계정\nmetadata:                                 # 계정 정보\n  name: app-reader                        # 계정 이름\n  namespace: team-a                       # 이 네임스페이스 안에서만 존재\n---                                       # 다음 리소스와의 구분선\napiVersion: rbac.authorization.k8s.io/v1  # RBAC 전용 API 그룹\nkind: Role                                # 네임스페이스 안에서만 통하는 권한 묶음\nmetadata:                                 # 역할 정보\n  name: pod-reader                        # 역할 이름\n  namespace: team-a                       # 권한이 적용될 범위\nrules:                                    # 허용할 동작 목록\n  - apiGroups: [\"\"]                       # 빈 문자열은 코어 리소스(파드 등)를 뜻함\n    resources: [\"pods\", \"configmaps\"]     # 파드와 컨피그맵만 대상\n    verbs: [\"get\", \"list\", \"watch\"]       # 조회만 가능, 생성·수정·삭제는 불가\n---                                       # 다음 리소스와의 구분선\napiVersion: rbac.authorization.k8s.io/v1  # RBAC 전용 API 그룹\nkind: RoleBinding                         # 역할과 계정을 연결하는 끈\nmetadata:                                 # 바인딩 정보\n  name: read-pods-binding                 # 바인딩 이름\n  namespace: team-a                       # 같은 네임스페이스 안에서 연결\nsubjects:                                 # 권한을 받을 대상 목록\n  - kind: ServiceAccount                  # 대상 종류는 서비스 계정\n    name: app-reader                      # 위에서 만든 계정\n    namespace: team-a                     # 계정이 있는 네임스페이스\nroleRef:                                  # 어떤 역할을 부여할지 지정\n  apiGroup: rbac.authorization.k8s.io     # 역할이 속한 API 그룹\n  kind: Role                              # 네임스페이스 범위 권한\n  name: pod-reader                        # 위에서 만든 조회 전용 역할"
      },
      {
        "title": "HPA 로 CPU 사용률 기준 자동 확장 규칙 선언하기",
        "lang": "yaml",
        "code": "apiVersion: autoscaling/v2            # HPA 는 autoscaling API 그룹 v2 를 사용\nkind: HorizontalPodAutoscaler         # 파드 수를 자동으로 늘리고 줄이는 리소스\nmetadata:                             # 리소스 정보\n  name: my-api-hpa                    # HPA 이름\nspec:                                 # 스케일링 규칙 선언\n  scaleTargetRef:                     # 어떤 워크로드를 조절할지 지정\n    apiVersion: apps/v1               # 대상의 API 그룹\n    kind: Deployment                  # Deployment 의 replicas 를 대신 조절한다\n    name: my-api-server               # 대상 Deployment 이름\n  minReplicas: 2                      # 아무리 한가해도 최소 2개는 유지\n  maxReplicas: 10                     # 아무리 바빠도 최대 10개까지만\n  metrics:                            # 판단 기준이 되는 지표\n    - type: Resource                  # CPU·메모리 같은 기본 자원 지표\n      resource:                       # 자원 지표 상세\n        name: cpu                     # CPU 사용률 기준\n        target:                       # 목표값 정의\n          type: Utilization           # 요청량(requests) 대비 사용률 방식\n          averageUtilization: 50      # 평균 50 퍼센트를 넘으면 파드를 늘린다\n  behavior:                           # 늘리고 줄이는 속도 조절\n    scaleUp:                          # 늘릴 때의 규칙\n      stabilizationWindowSeconds: 0   # 대기 없이 즉시 증설\n    scaleDown:                        # 줄일 때의 규칙\n      stabilizationWindowSeconds: 300 # 5분 지켜본 뒤 보수적으로 감축"
      }
    ]
  },
  "devops": {
    "concepts": [
      {
        "term": "클라우드 네이티브 5대 핵심 요소",
        "desc": "애플리케이션을 클라우드에 가장 알맞게 설계·개발·운영하는 접근으로, 컨테이너화·동적 오케스트레이션·마이크로서비스·DevOps(CI/CD)·관측성(로그·지표·추적)의 다섯 기둥으로 이뤄진다. Cloud 트랙에서 배우는 Docker·쿠버네티스·CI/CD 도구가 각각 이 기둥을 하나씩 담당한다."
      },
      {
        "term": "지속적 통합·전달·배포의 구분",
        "desc": "CI 는 코드 변경을 자주 합치면서 자동 빌드·테스트로 문제를 조기에 잡는 것이고, 지속적 전달(Continuous Delivery)은 언제든 배포 가능한 상태로 준비하되 마지막 배포 승인은 사람이 하는 것, 지속적 배포(Continuous Deployment)는 그 승인까지 자동화해 통과한 코드가 바로 운영에 나가는 것이다."
      },
      {
        "term": "GitHub Actions 의 구성 요소",
        "desc": ".github/workflows 폴더의 YAML 파일이 Workflow 이고, 그 안의 Job 은 Step 들로 이뤄진다. push·pull_request·schedule 같은 Event 가 방아쇠가 되고, actions/checkout 처럼 재사용 가능한 부품이 Action, 실제로 Job 을 실행하는 서버가 Runner 다. Job 은 기본적으로 병렬 실행되며 needs 로 앞뒤 순서를 만든다."
      },
      {
        "term": "GitOps 와 ArgoCD",
        "desc": "Git 저장소를 단일 진실 원천(Single Source of Truth)으로 삼아, 클러스터의 실제 상태가 Git 에 선언된 매니페스트와 같아지도록 ArgoCD 가 자동으로 동기화하는 배포 방식이다. 배포 이력이 곧 Git 커밋 이력이 되므로, 문제가 생기면 커밋을 되돌리는 것만으로 배포도 되돌아간다."
      },
      {
        "term": "Kaniko 와 Tekton",
        "desc": "Kaniko 는 도커 데몬 없이 컨테이너 안에서 Dockerfile 을 읽어 이미지를 빌드하는 도구라, 권한이 제한된 쿠버네티스 클러스터 안에서도 안전하게 빌드할 수 있다. Tekton 은 파이프라인 자체를 Task·Pipeline 같은 쿠버네티스 리소스로 정의해 실행하는 K8s 네이티브 CI/CD 프레임워크로, 두 도구를 조합하면 빌드부터 배포까지 전부 클러스터 안에서 돌아간다."
      }
    ],
    "examples": [
      {
        "title": "테스트 → 빌드 → 배포로 이어지는 GitHub Actions 파이프라인 (needs 활용)",
        "lang": "yaml",
        "code": "name: ci-cd                             # 워크플로 이름\non:                                     # 언제 실행할지(이벤트) 정의\n  push:                                 # 푸시가 일어나면 실행\n    branches: [main]                    # main 브랜치에 푸시될 때만\n  pull_request:                         # PR 이 열리거나 갱신될 때도 실행\n    branches: [main]                    # main 을 향한 PR 만\n  workflow_dispatch:                    # 버튼으로 수동 실행도 허용\njobs:                                   # 실행할 작업(Job) 묶음\n  test:                                 # 1단계 Job: 테스트\n    runs-on: ubuntu-latest              # 깃허브가 제공하는 우분투 러너에서 실행\n    steps:                              # 세부 단계(Step) 목록\n      - uses: actions/checkout@v4       # 저장소 코드를 러너로 내려받는다\n      - run: npm ci                     # 잠금 파일 그대로 의존성 설치\n      - run: npm test                   # 자동 테스트 실행(실패하면 여기서 중단)\n  build:                                # 2단계 Job: 빌드\n    runs-on: ubuntu-latest              # 별도의 새 러너에서 실행\n    needs: test                         # test 가 성공해야만 시작된다\n    steps:                              # 빌드 단계 목록\n      - uses: actions/checkout@v4       # 러너가 다르므로 코드를 다시 내려받는다\n      - run: npm run build              # 배포용 산출물 생성\n  deploy:                               # 3단계 Job: 배포\n    runs-on: ubuntu-latest              # 배포용 러너\n    needs: build                        # 빌드까지 성공해야 실행\n    if: github.ref == 'refs/heads/main' # PR 은 제외, main 푸시일 때만 배포\n    steps:                              # 배포 단계 목록\n      - run: echo deploy                # 실제로는 배포 스크립트가 들어갈 자리"
      },
      {
        "title": "ArgoCD 설치하고 GitOps 동기화 준비하기",
        "lang": "bash",
        "code": "# ArgoCD 전용 네임스페이스를 만든다\nkubectl create ns argocd\n# 공식 설치 매니페스트를 적용해 ArgoCD 를 설치한다\nkubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml\n# 설치된 파드들이 모두 Running 인지 확인한다\nkubectl get pods -n argocd\n# 로컬 8080 포트를 ArgoCD 서버에 연결한다 (브라우저 접속용)\nkubectl port-forward svc/argocd-server -n argocd 8080:443\n# CLI 도구를 설치한다 (macOS 기준)\nbrew install argocd\n# 관리자 초기 비밀번호를 확인한다\nargocd admin initial-password -n argocd\n# 확인한 비밀번호로 로그인한다\nargocd login localhost:8080\n# 초기 비밀번호는 반드시 새 비밀번호로 바꾼다\nargocd account update-password\n# 이후 Git 저장소를 등록하면 선언된 상태 그대로 클러스터가 자동 동기화된다\nkubectl get all -n argocd    # GitOps 를 움직이는 구성 요소 전체 확인"
      }
    ]
  },
  "method": {
    "concepts": [
      {
        "term": "AI 프로젝트의 5대 본질과 PM 대응",
        "desc": "일반 SW와 달리 AI 프로젝트는 데이터 중심성(코드보다 데이터 품질이 성패를 좌우), 불확실성(성능이 항상 개선된다는 보장이 없음), 반복성(학습→검증→피드백→재학습 순환), 융합성(IT·비즈니스·현장 협업 필수), 운영 지속성(개발보다 MLOps 비중이 큼)이라는 다섯 특성을 갖는다.\n대응으로는 데이터 수집·전처리를 별도 WBS 트랙으로 운영하고, 성능 KPI를 단일값이 아닌 구간(예: 정확도 85~92%)으로 잡으며, 착수 시점에 MLOps 전환 계획까지 함께 수립한다."
      },
      {
        "term": "발주사 vs 수행사 갈등의 구조적 예방",
        "desc": "발주사는 \"왜 약속한 성능이 안 나오나, 왜 일정이 유동적인가\"를 묻고, 수행사는 \"제공 데이터 품질이 나빠 못 쓴다, 현재 자원으로는 목표가 기술적으로 불가능하다\"고 맞선다. 이 갈등은 착수·계약 단계에서 구조적으로 막는 것이 최선이다.\n핵심 장치는 성능 KPI를 최소~목표~이상 3단계 밴드로 정의, 데이터 품질 기준서(DQA)를 계약서에 첨부, 변경관리위원회(CCB)와 JIRA 기반 공식 변경 프로세스 운영, PoC와 운영 단계의 전환 기준 명문화, MLOps 전환 비용·책임 범위 명시다."
      },
      {
        "term": "PMBOK 7판 전환과 Hybrid PM",
        "desc": "PMBOK은 6판의 프로세스 중심(49개 프로세스 순차 수행)에서 7판의 원칙 중심(12개 원칙, 테일러링 강조)으로 패러다임이 바뀌었다. 초기 계획 완성·변경 최소화가 아니라 점진적 정교화와 고객 피드백 기반 조정이 기본이다.\nHybrid PM은 고정 영역(데이터 수집 계약, 인프라·예산 확정, 보안·컴플라이언스, 최종 납품 기준)은 Waterfall로, 가변 영역(모델 학습·검증 스프린트, 피처 엔지니어링 실험, MLOps 파이프라인 최적화)은 Agile로 운영하는 이중 트랙 전략이다. 경영진 후원 없이는 전환 실패율이 80%를 넘는다."
      },
      {
        "term": "Agentic AI 개발 방법론과 아키텍처 패턴",
        "desc": "2026년은 Multi-Agent System의 실제 배포 원년으로, Anthropic MCP와 Google A2A 같은 표준 통신 체계가 자리 잡았다. 다만 Gartner는 실질 역량 없이 용어만 쓰는 Agent Washing과 40% 이상 프로젝트 취소 가능성을 경고한다.\n표준 아키텍처 패턴은 추론+행동을 반복하는 ReAct, 오케스트레이터가 전문 에이전트를 조율하는 Multi-Agent 오케스트레이션, 외부 도구·DB·API를 표준 연결하는 MCP 기반 통합, 고위험 결정에 인간 승인 단계를 삽입하는 Human-in-the-Loop, 검색 증강과 에이전트를 결합한 RAG+Agent 융합이다."
      },
      {
        "term": "AI 특화 요구사항·WBS·테스트 전략",
        "desc": "AI 요구사항은 기능 + 데이터 + 성능 + 운영 + 윤리/규제 5가지 유형으로 분리 정의하고, 추적 매트릭스에 데이터·모델 요구사항 항목을 추가한다. Agentic AI라면 에이전트 접근 범위, 자율성 수준, 오류 처리 정책, 감사 추적, 환각 허용 수준을 반드시 명시한다.\nWBS는 데이터 트랙 + 모델 트랙 + 서비스 트랙 + PM 트랙 4트랙 병렬 구조로 짠다. 테스트는 정해진 입출력이 아닌 확률적 출력을 다루므로 편향·드리프트·환각을 추가 검증하고, 테스트를 먼저 설계한 뒤 AI가 구현을 생성하되 개발자가 반드시 검토하는 AI-Driven TDD를 적용한다."
      }
    ],
    "examples": [
      {
        "title": "AI 프로젝트 착수 전 필수 확인 체크리스트",
        "lang": "text",
        "code": "[ AI 프로젝트 킥오프 게이트 체크리스트 ]\n\n1. 비즈니스 KPI를 측정 가능한 형태로 정의했는가?\n   - 나쁜 예: \"정확도 향상\"  ->  좋은 예: \"F1 Score 0.85 이상\"\n2. 성능 KPI를 최소~목표~이상 3단계 밴드로 설정했는가?\n3. 데이터 품질 기준서(DQA)를 계약서에 첨부했는가?\n4. PoC와 운영 단계를 분리하고 전환 기준을 명문화했는가?\n5. 변경관리위원회(CCB) 운영 규정을 착수 시 합의했는가?\n6. MLOps 전환 비용과 운영 책임 범위를 계획에 포함했는가?\n7. 경영진 후원(Executive Sponsor)을 확보했는가?\n8. AI 윤리/규제(EU AI Act 등) 요건을 요구사항에 반영했는가?\n9. Agentic AI라면 자율성 수준과 Human-in-the-Loop 위치를 정했는가?\n10. 운영 단계 모델 드리프트 모니터링과 재학습 트리거를 설계했는가?",
        "note": "교재의 \"AI 프로젝트 성공 요인 체크리스트\"를 킥오프 게이트로 재구성했다. 항목을 팀 프로젝트 계획서 앞머리에 그대로 넣으면 착수 단계에서 갈등 요인을 미리 걸러낼 수 있다."
      },
      {
        "title": "AI 프로젝트 문제정의 캔버스",
        "lang": "text",
        "code": "[ AI 프로젝트 문제정의 캔버스 ]\n\n(1) 비즈니스 문제   : 어떤 의사결정/업무를 개선하려는가?\n(2) AI 과제 유형    : 분류 / 회귀 / 생성 / 추천 / 에이전트 등\n(3) 성공 지표(KPI)  : 지표명 + 목표 밴드(최소~목표~이상)\n(4) 데이터 가용성   : 보유 데이터 / 필요 데이터 / 품질 리스크\n(5) 요구사항 5유형  : 기능 | 데이터 | 성능 | 운영 | 윤리/규제\n(6) WBS 4트랙       : 데이터 | 모델 | 서비스 | PM\n(7) 불확실성/가정   : 검증이 필요한 핵심 가설은?\n(8) PoC->운영 기준  : 어떤 조건을 넘겨야 운영 전환인가?\n(9) 리스크/거버넌스 : 편향/드리프트/환각 대응, 승인 게이트\n\n작성자: ____   승인자(PM): ____   버전: 0.1",
        "note": "교재의 요구사항 5유형 분리, WBS 4트랙, PoC->운영 전환 기준, 산출물 버전 관리(0.1 시작)를 한 장 캔버스로 묶었다. 기능과 데이터·성능 요구사항을 반드시 분리해 적는 것이 일반 SW 프로젝트와의 결정적 차이다."
      }
    ]
  },
  "datamini": {
    "concepts": [
      {
        "term": "미니프로젝트 전체 흐름(2일 16시간, 실습 90%)",
        "desc": "Day 1은 DS 과정 정리(DS 목표·분석 방법론·통계·ML/DL)와 프로젝트 가이드로 시작해, EDA와 피처 엔지니어링을 거쳐 모델 전략 수립 보고서를 작성·제출하는 데까지 이어진다.\nDay 2는 세운 전략에 따라 모델을 개발·최적화하고, 목표 성능과 비교한 뒤 Git 링크를 제출하며, 마지막 Wrap-up과 퀴즈로 마무리한다. 이론 10%, 실습 90% 구성이라 배운 흐름을 실전으로 완주하는 자리다."
      },
      {
        "term": "실습 과제 데이터: 분자 독성 예측",
        "desc": "학습용 train.csv(약 51.2MB, 8,349건)로 모델을 만들고, 문제용 predict_input.csv(약 5.7MB, 927건)의 독성 여부를 예측한다. predict_input.csv는 train.csv와 구조가 같지만 정답 라벨만 없다.\n각 분자는 SMILES 코드로 표현되고 MolWt(분자량), clogp(지용성), sa_score(합성 접근성), qed(약물성 지표), label(독성 여부) 같은 속성을 갖는다. 라벨은 이진값(1 = 독성 없음/Positive, 0 = 독성 있음/Negative)으로 정의된다."
      },
      {
        "term": "분자 지문(Fingerprint) 기반 피처 엔지니어링",
        "desc": "SMILES 문자열만으로는 모델 입력이 되지 않으므로, 분자를 고정 길이 비트/카운트 벡터로 바꾸는 분자 지문을 만든다. 교재는 대표적으로 세 가지를 든다.\n확장 연결성 지문(ECFP)은 원자 주변 환경을 반경 단위로 인코딩하고, 기능성 클래스 지문(FCFP)은 원자를 기능기 관점으로 일반화하며, 패턴 지문(Pattern Fingerprint)은 부분 구조 패턴의 존재 여부를 표현한다. MolWt·clogp·qed 같은 물리화학 기술자와 함께 쓰면 입력 표현이 풍부해진다."
      },
      {
        "term": "분류 모델 평가 지표",
        "desc": "이진 분류 성능은 여러 지표를 함께 본다. Accuracy는 전체 중 맞게 예측한 비율, Precision은 Positive로 예측한 것 중 실제 Positive 비율, Recall(민감도)은 실제 Positive 중 Positive로 맞힌 비율, Specificity는 실제 Negative를 Negative로 맞힌 비율이다.\nPrecision과 Recall은 서로 상충(trade-off)하므로 이 둘을 통합한 F1 Score를 함께 쓰고, 임계값 변화에 따른 성능은 ROC 곡선과 Precision-Recall Plot으로 확인한다. 독성 데이터처럼 클래스가 치우칠 때는 Accuracy만 보지 말고 F1과 PR 곡선을 중심으로 판단한다."
      },
      {
        "term": "모델 전략 수립과 하이퍼파라미터 최적화",
        "desc": "바로 모델을 돌리기 전에, 도메인과 데이터 EDA 결과를 근거로 어떤 피처·모델·검증 방식을 쓸지 정리한 모델 전략 수립 보고서를 먼저 작성·제출한다. 이것이 Day 1의 핵심 산출물이다.\nDay 2에는 전략에 따라 베이스라인 모델을 만들고 하이퍼파라미터를 최적화해 성능을 끌어올린 뒤, 사전에 정한 목표 성능과 비교한다. 전략 없이 파라미터만 바꾸는 것이 아니라, 세운 가설을 성능으로 검증하는 순서가 중요하다."
      }
    ],
    "examples": [
      {
        "title": "EDA에서 베이스라인 모델까지 골격",
        "lang": "python",
        "code": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import f1_score, classification_report\n\n# 1) 학습 데이터 적재 (분자 독성 예측 과제)\ndf = pd.read_csv(\"train.csv\")\n\n# 2) 간단 EDA: 형태/결측/라벨 분포 확인\nprint(\"행/열:\", df.shape)\nprint(\"결측 합계:\\n\", df.isna().sum())\nprint(\"라벨 분포:\\n\", df[\"label\"].value_counts())  # 1=독성無, 0=독성有\n\n# 3) 입력 피처(X)와 정답(y) 분리 - SMILES 문자열은 제외\nfeature_cols = [\"MolWt\", \"clogp\", \"sa_score\", \"qed\"]\nX = df[feature_cols].fillna(0)   # 결측은 0으로 임시 대체\ny = df[\"label\"]\n\n# 4) 학습/검증 분할 (라벨 비율 유지: stratify)\nX_tr, X_va, y_tr, y_va = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\n\n# 5) 베이스라인 모델 학습 및 F1 평가\nmodel = RandomForestClassifier(n_estimators=200, random_state=42)\nmodel.fit(X_tr, y_tr)\npred = model.predict(X_va)\nprint(\"검증 F1:\", round(f1_score(y_va, pred), 4))\nprint(classification_report(y_va, pred))",
        "note": "적재 -> EDA(형태·결측·라벨 분포) -> 피처/정답 분리 -> stratify 분할 -> 베이스라인 학습 -> F1 평가로 이어지는 최소 골격이다. 여기서 라벨이 치우쳐 있으면 Accuracy 대신 F1과 PR 곡선을 기준으로 개선하고, SMILES를 ECFP 등 분자 지문으로 바꿔 피처를 늘리는 것이 다음 단계다."
      },
      {
        "title": "제출물·평가 체크리스트",
        "lang": "text",
        "code": "[ 미니프로젝트 제출물 체크리스트 ]\n\n(Day 1) 모델 전략 수립 보고서\n  [ ] 도메인/데이터 EDA 요약(형태·결측·라벨 분포)\n  [ ] 피처 엔지니어링 계획(분자 지문 ECFP/FCFP/Pattern + 물리화학 기술자)\n  [ ] 모델 후보와 검증 전략(분할/교차검증) 명시\n  [ ] 목표 성능 지표와 목표치 선언(예: F1 0.85 이상)\n\n(Day 2) 모델 개발/평가 산출물\n  [ ] predict_input.csv(927건)로 예측 수행\n  [ ] predict_output_작성자.csv 제출(SMILES + 예측 label)\n  [ ] 하이퍼파라미터 최적화 내역 기록\n  [ ] 목표 성능 대비 실제 성능 비교표\n  [ ] 소스코드 Git Link 제출\n\n[ 평가 관점 ]  Accuracy / Precision / Recall / Specificity / F1 / ROC / PR",
        "note": "교재의 산출물 안내(모델 전략 보고서 제출, predict_output_작성자.csv 제출, Git Link 제출)와 분류 평가 지표를 한 장으로 정리했다. 제출용 답안 파일에는 SMILES 코드와 예측 label만 담고, 파일명에 작성자를 넣는 규칙을 지킨다."
      }
    ]
  }
}
