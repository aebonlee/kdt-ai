const e={"webproject-1":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 OT · 과정 소개 · 웹서비스 개념 + 제출 산출물 목록 · 평가 기준 공유"},{time:"10:00–10:50",topic:"2교시 주제 선정 워크숍·사용자 시나리오 함께 써보기(실습)"},{time:"11:00–11:50",topic:"3교시 와이어프레임으로 화면 흐름 그리기(실습)"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 기능 명세서 작성과 우선순위 정하기"},{time:"14:00–14:50",topic:"5교시 프론트/백엔드 아키텍처와 데이터 모델 설계(실습)"},{time:"15:00–15:50",topic:"6교시 화면-데이터 연결 JSON 목업 만들기(실습)"},{time:"16:00–16:50",topic:"7교시 기술 스택 선정과 프로젝트 폴더 초기화(실습)"},{time:"17:00–17:50",topic:"8교시 작업 분담·일정표 작성과 1일차 회고"}],practice:{title:"내 미니 웹 서비스 기획서 + 화면 설계 + 프로젝트 뼈대 만들기",steps:["팀에서 만들 서비스 주제를 한 문장으로 정한다(예: '동네 맛집을 기록하는 메모 앱').","서비스에 넣을 AI 기능 1개를 정하고 '입력 → 출력 → 화면 표시 위치'를 한 문장으로 적는다(예: '메모를 입력하면 한 줄 요약을 만들어 카드 아래에 보여준다').","제출 산출물 체크리스트와 평가 기준을 팀 README 상단에 붙여, 무엇을 언제까지 내야 하는지 팀 전체가 같은 기준을 공유한다.","사용자 시나리오를 '누가 / 언제 / 무엇을 하고 싶다' 형식으로 3개 적는다.","종이나 Figma에 메인 화면, 목록 화면, 상세/입력 화면 3개의 와이어프레임을 그린다.","기능 명세서를 표로 만들고 각 기능에 '필수/선택' 우선순위를 표시한다.","화면에 보여줄 데이터를 JSON 한 덩어리(목업)로 작성해 data/mock.json 으로 저장한다.","터미널에서 'npm create vite@latest my-web -- --template vue' 를 실행해 Vue 프로젝트를 만든다.","'cd my-web' 후 'npm install' 로 패키지를 설치하고 'npm run dev' 로 서버를 켠다.","브라우저에서 http://localhost:5173 에 접속해 Vite 기본 화면이 뜨는지 확인한다(기대 결과: Vue 로고가 보이는 시작 페이지).","README.md 에 주제·기능 목록·담당자·일정을 적어 커밋한다."],deliverable:"기획서(주제·AI 기능 정의 한 문장·시나리오·기능명세)+와이어프레임 3장+mock.json+실행되는 Vue 프로젝트 초기 저장소"}},examples:[{title:"기능 명세를 코드로 표현하기 — 우선순위 배열",lang:"javascript",code:`// features 는 우리 서비스가 가질 기능의 목록이다
const features = [
  { name: '목록 보기', priority: '필수' },   // 데이터를 화면에 쭉 보여주는 핵심 기능
  { name: '글 추가',   priority: '필수' },   // 새 항목을 입력하는 기능
  { name: '검색',     priority: '선택' }    // 시간이 남으면 추가할 기능
]
// filter 로 '필수' 기능만 골라낸다(우선 개발할 목록)
const must = features.filter(f => f.priority === '필수')
// map 으로 이름만 뽑아 배열로 만든다
console.log(must.map(f => f.name)) // 결과: ['목록 보기', '글 추가']`,note:"기능에 우선순위를 붙이면 '무엇부터 만들지' 코드 수준에서 바로 정렬할 수 있다."},{title:"사용자 시나리오를 구조화해 정리하기",lang:"javascript",code:`// 시나리오를 '누가/언제/무엇' 형식 객체로 정리하면 빠진 부분이 보인다
const scenarios = [
  { who: '직장인', when: '점심시간', want: '근처 맛집을 빠르게 찾고 싶다' },
  { who: '학생',   when: '주말',    want: '가본 곳을 기록해 두고 싶다' }
]
// forEach 로 한 줄씩 사람이 읽기 좋은 문장으로 출력한다
scenarios.forEach(s => {
  // 템플릿 문자열(백틱)로 변수들을 한 문장에 끼워 넣는다
  console.log(\`\${s.who}는 \${s.when}에 \${s.want}\`)
})
// 결과:
// 직장인는 점심시간에 근처 맛집을 빠르게 찾고 싶다
// 학생는 주말에 가본 곳을 기록해 두고 싶다`,note:"시나리오를 객체로 만들면 화면·기능을 빠뜨리지 않고 도출하기 쉽다."},{title:"화면 흐름을 라우트 설계로 옮기기",lang:"javascript",code:`// 와이어프레임의 화면 = 라우트 1개. 먼저 표로 합의하면 구현이 빨라진다
const routes = [
  { path: '/',        name: 'home',   view: '검색 입력' },
  { path: '/result',  name: 'result', view: 'AI 결과 목록' },
  { path: '/item/:id', name: 'detail', view: '상세 + 피드백' },
  { path: '/:pathMatch(.*)*', name: '404', view: '없는 페이지' },
]
// 이 표가 정해지면 화면 담당·API 담당이 각자 병렬로 작업 가능`,note:'화면 흐름(와이어프레임)을 라우트 테이블로 바꾸면 "무엇을 만들지"가 명확해진다. 404 라우트도 처음부터 설계에 포함.'},{title:'AI 기능 1개를 "입력·출력 계약"으로 명세',lang:"text",code:`# 넣을 AI 기능: 리뷰 한줄요약 (요약/추천/분류/생성 중 '요약' 선택)
기능명   : summarizeReview
입력     : { text: string }            # 사용자 리뷰 원문
출력     : { summary: string }         # 한 줄 요약(40자 이내)
프롬프트 : "다음 리뷰를 40자 이내 한 문장으로 요약: {text}"
실패대응 : 요약 실패 시 원문 앞 40자 그대로 노출
비용가드 : 200자 미만이면 API 호출 없이 원문 반환`,note:"AI 기능도 API처럼 입력·출력·실패대응을 먼저 계약으로 못박는다. 프롬프트를 명세에 넣어 두면 구현·평가가 쉬워진다."},{title:"액터별 기능 정의 — 누가 무엇을 쓰는지 표로",lang:"javascript",code:`// 액터(사용자 유형)별로 '누가 어떤 기능을 쓰는지' 정리한다
const actors = [
  { role: '일반 사용자', features: ['회원가입', '글 목록 보기', '글 작성'] },
  { role: '관리자',     features: ['신고 글 삭제', '회원 관리'] },
  { role: '외부 시스템', features: ['날씨 API 조회'] },
]

// 각 액터가 가진 기능 수로 역할 범위를 가늠한다
actors.forEach((a) => {
  console.log(a.role + ': ' + a.features.length + '개 기능')
})
// 결과: 일반 사용자: 3개 / 관리자: 2개 / 외부 시스템: 1개

// 특정 기능을 누가 쓰는지 거꾸로 찾는다(요구사항 누락 점검)
const who = actors.filter((a) => a.features.includes('글 작성')).map((a) => a.role)
console.log('글 작성 가능 액터:', who)   // 결과: ['일반 사용자']`,note:"정의서의 핵심은 액터(일반 사용자·관리자·외부 시스템)를 식별하고 각자의 기능을 나누는 것이다. 뒤에 그릴 UI 화면과 API 는 모두 이 액터별 기능 목록에서 파생된다."},{title:"UI 흐름도의 밑그림 — 화면 목록·구성요소·이동경로",lang:"javascript",code:`// 화면 목록과 각 화면의 구성요소·이동 경로를 구조화한다
const screens = [
  { name: '로그인', elements: ['이메일 입력', '비밀번호 입력', '로그인 버튼'], next: '목록' },
  { name: '목록',   elements: ['검색창', '글 카드 목록', '글쓰기 버튼'],        next: '상세' },
  { name: '상세',   elements: ['제목', '본문', '뒤로가기'],                     next: '목록' },
]

// 화면 흐름을 한 줄로 이어 전체 사용자 동선을 확인한다
console.log(screens.map((s) => s.name).join(' -> '))
// 결과: 로그인 -> 목록 -> 상세

// 각 화면에 버튼·입력 같은 구성요소가 비었는지 점검(와이어프레임 누락 방지)
screens.forEach((s) => {
  if (s.elements.length === 0) console.log(s.name, '화면 구성요소 누락!')
})`,note:"화면 목록·구성요소(버튼/입력/데이터)·이동경로를 먼저 구조화하면 와이어프레임과 API 도출이 쉬워진다. 완성한 UI 흐름도는 반드시 정의서 PDF 안에 화면 캡처로 넣어야 감점을 피한다."}],concepts:[{term:"미니 프로젝트(mini-project)",desc:"작은 규모로 기획부터 배포까지 전체 과정을 한 번 경험해 보는 짧은 실전 프로젝트다."},{term:"요구사항(requirement)",desc:"이 서비스가 '무엇을 할 수 있어야 하는가'를 글로 적어둔 약속 목록이다."},{term:"사용자 시나리오(user scenario)",desc:"실제 사용자가 우리 서비스를 쓰는 상황을 짧은 이야기처럼 적은 것이다."},{term:"와이어프레임(wireframe)",desc:"색·디자인 없이 화면에 무엇이 어디에 들어갈지 선으로만 그린 밑그림이다."},{term:"데이터 모델(data model)",desc:"우리 서비스가 다룰 정보(예: 글 제목·내용·작성자)를 어떤 형태로 저장할지 정한 구조다."},{term:"아키텍처(architecture)",desc:"프론트엔드·백엔드·데이터베이스가 어떻게 연결되어 일하는지 그린 전체 구조도다."},{term:"기술 스택(tech stack)",desc:"이 프로젝트에서 쓰기로 정한 도구와 언어의 묶음이다(예: Vue+Vite)."}],detail:{topics:[{h:"기획 단계 산출물",items:["한 문장 주제 정의","사용자 시나리오 3개","기능 명세서(필수/선택)","와이어프레임 3화면"]},{h:"설계 단계 산출물",items:["화면 흐름도","데이터 모델(필드 정의)","프론트/백 아키텍처 그림","API 목록 초안"]},{h:"협업 준비",items:["기술 스택 합의","Git 저장소 초기화","작업 분담표","일정(마일스톤) 표"]},{h:"제출 산출물 & 평가 기준(첫날 공유)",items:["제출물: ① 기획서(주제·시나리오·기능명세) ② 화면 설계(와이어프레임) ③ 동작하는 코드 저장소 ④ 배포 URL ⑤ 발표 자료·회고","평가: 완성도(기능이 실제로 도는가)","평가: AI 기능의 적절성(서비스에 AI가 자연스럽게 쓰였는가)","평가: 설계 충실도(기획과 결과가 일치하는가)·협업/커밋 이력·발표 전달력","첫날부터 '무엇을 내야 하고 어떻게 채점되는지'를 알고 역산해 작업하기"]}],labs:[{title:"Lab 1. Vue 프로젝트 처음부터 만들어 실행하기",steps:["터미널을 열고 작업할 폴더로 이동한다.","'npm create vite@latest my-web -- --template vue' 를 입력하고 엔터를 누른다.","'cd my-web' 으로 만들어진 폴더 안으로 들어간다.","'npm install' 로 필요한 패키지를 모두 내려받는다(잠시 기다림).","'npm run dev' 를 실행하고 출력된 주소(http://localhost:5173)를 브라우저에 입력한다.","Vue 시작 화면이 보이면 성공이다(보이지 않으면 터미널의 빨간 에러 메시지를 읽는다)."]},{title:"Lab 2. 목업 데이터 만들고 README에 기획 정리하기",steps:["프로젝트 안에 data 폴더를 만들고 그 안에 mock.json 파일을 새로 만든다.","위 realCode의 가짜 데이터 예시를 참고해 우리 주제에 맞는 항목 3개를 적는다.","README.md 를 열어 주제 한 문장, 기능 목록, 담당자, 일정을 적는다.",`'git add .' 와 'git commit -m "기획·설계 초안"' 으로 첫 커밋을 남긴다.`]},{title:"Lab 3. 주제→시나리오→기능명세→와이어프레임 설계 워크숍 (2·3·4교시 통합 실습)",steps:["팀이 만들 서비스를 한 문장으로 확정한다('___를 위한 ___ 앱, AI로 ___를 해준다' 빈칸 채우기).","사용자 시나리오를 '누가 / 언제 / 무엇을 하고 싶다' 형식으로 3개, 포스트잇에 적어 붙인다.","시나리오에서 나온 기능들을 MoSCoW 4칸(Must/Should/Could/Won't)에 나눠 붙이고, Must는 3개 이하로 줄인다(AI 기능 1개를 반드시 Must에 포함).","Must 기능만으로 화면 3장(메인·목록·상세 또는 입력)을 종이에 와이어프레임으로 그린다(색·디자인 없이 상자와 글자만).","각 화면에 '여기서 어디로 이동하는가'를 화살표로 이어 화면 흐름도를 완성한다.","완성한 4칸판·와이어프레임 사진을 찍어 README에 붙이고 커밋한다."]},{title:"Lab 4. 데이터 모델과 아키텍처 한 장 그리기 (5교시 실습)",steps:["와이어프레임 화면에 보이는 정보를 모두 적어 필드 목록을 뽑는다(예: 이름·별점·태그·메모).","각 필드의 이름(영문)·자료형·예시값을 표로 정리한다(예: id: number: 1 / name: string: '행복 김밥' / rating: number: 4.5).","이 표를 그대로 data/mock.json 한 덩어리로 옮겨 적는다(항목 3개 이상, 여기서 정한 키 이름이 나중에 DB 컬럼이 됨을 강조).","종이에 '브라우저 화면 → LLM API → 데이터 저장소'를 상자와 화살표로 그린다.","우리 AI 기능의 데이터 흐름(입력→요청→응답→표시)을 화살표 위에 한국어 문장으로 적어 아키텍처 그림을 완성하고 사진을 README에 첨부한다."]}],homework:["우리 팀 주제의 데이터 모델을 표로 정리하고(필드 이름·자료형·예시값) mock.json 으로 옮겨 적어 오기.","와이어프레임 3화면을 깔끔히 다시 그려 사진을 찍어 README에 첨부하기."]},theory:{theory:[{h:"우리 서비스에 AI를 어떻게 한 스푼 넣을까",body:`이 미니 프로젝트의 핵심은 '평범한 화면'에 AI 기능을 딱 하나 얹어 보는 것이다.
거창할 필요 없이 서비스 성격에 맞는 AI 기능 하나를 고른다. 메모 앱이면 '메모를 한 줄로 요약', 맛집 앱이면 '취향 태그로 추천 문구 생성', 게시판이면 '글을 카테고리로 자동 분류' 같은 식이다.
이때 AI는 직접 만드는 게 아니라 이미 있는 LLM API(예: OpenAI·Anthropic)에 '이런 걸 해줘'라고 요청하고 그 결과를 화면에 보여주는 방식이다.

기획 단계에서 'AI에게 무엇을 입력하고(입력) 어떤 결과를 받아(출력) 어디에 보여줄지'를 한 문장으로 미리 정해 두면 구현이 한결 쉬워진다.
욕심내 여러 기능을 넣지 말고, 서비스를 가장 돋보이게 하는 한 개만 확실히 완성하는 것이 미니 프로젝트의 정석이다.`},{h:"왜 코드부터 짜지 않고 기획부터 할까?",body:`집을 지을 때 설계도 없이 벽돌부터 쌓으면 나중에 다 부수고 다시 지어야 한다.
웹 서비스도 똑같아서 무엇을 만들지 정하지 않고 코드부터 짜면 방향이 자꾸 바뀐다.
기획은 '무엇을 왜 만드는가'를 먼저 글과 그림으로 정리하는 단계다.
이 단계에서 종이에 한 번 그려보면 코드로 고치는 것보다 훨씬 싸고 빠르게 실수를 잡는다.

특히 미니 프로젝트는 시간이 짧기 때문에 기획에서 '꼭 필요한 기능'만 골라내는 일이 가장 중요하다.
욕심내서 기능을 많이 넣으면 시간 안에 하나도 못 끝내기 쉽다.`},{h:"와이어프레임과 데이터 모델은 한 쌍이다",body:`와이어프레임은 화면에 '무엇이 보이는가'를 그린 밑그림이다.
예를 들어 맛집 목록 화면에는 가게 이름, 별점, 사진이 보여야 한다.
그러면 자연스럽게 데이터 모델에는 name, rating, image 같은 항목이 필요하다는 걸 알 수 있다.
즉 화면을 먼저 그리면 어떤 데이터가 필요한지가 거꾸로 보인다.

그래서 화면(와이어프레임)과 데이터(모델)를 나란히 놓고 설계하면 빠진 정보를 빨리 발견할 수 있다.
이 둘을 따로 만들면 나중에 화면은 있는데 데이터가 없는 일이 생긴다.`},{h:"3일이 하나의 사이클 — 오늘·내일·모레 지도를 먼저 펼치기",body:`OT에서 가장 먼저 할 일은 코드가 아니라 '우리가 사흘 동안 무엇을 향해 가는가'를 한 장의 지도로 보여주는 것이다. 1일차는 기획·설계(무엇을 왜 만들지 종이에 확정), 2일차는 구현(화면·데이터·AI 기능을 코드로), 3일차는 통합·배포·발표(합치고 인터넷에 올리고 3분간 시연)다. 이 흐름을 먼저 보여주면 학습자가 '지금 하는 기획이 왜 필요한지'를 안다.
[핵심 포인트] ① 결승선(3일차의 배포 URL과 발표)을 먼저 못박고 거꾸로 계획한다. ② 하루 8교시를 '오전엔 생각(기획·설계), 오후엔 손(코드)' 리듬으로 쓴다. ③ 미니 프로젝트의 성공 기준은 '크고 화려함'이 아니라 '작아도 끝까지 도는 것'이다.
[왜 중요한가] 짧은 프로젝트에서 가장 흔한 실패는 방향을 잃고 2일차에 기획을 다시 갈아엎는 것이다. 첫 시간에 전체 지도를 공유하면 팀 전체가 같은 결승선을 바라보게 된다. 강사는 화이트보드에 3칸(기획→구현→배포)을 그리고 각 칸에 오늘·내일·모레를 적으며 시작하면 좋다.`},{h:"기능은 다 만들 수 없다 — MoSCoW로 잘라내기",body:`아이디어 회의를 하면 기능이 스무 개씩 쏟아진다. 그러나 하루 반 만에 실제로 코딩할 수 있는 건 3~4개뿐이다. 그래서 필요한 것이 우선순위 도구 MoSCoW다. 모든 기능을 네 칸에 나눠 붙인다 — Must(없으면 서비스가 성립 안 됨), Should(있으면 좋지만 없어도 됨), Could(시간이 남으면), Won't(이번엔 안 함).
[규칙] Must는 3개를 넘기지 않는다. 예를 들어 맛집 메모 앱이라면 Must=[목록 보기, 글 추가, AI 한 줄 요약], Should=[검색, 별점 정렬], Could=[사진 업로드], Won't=[로그인·회원가입]처럼 나눈다.
[핵심 포인트] ① AI 기능 1개는 반드시 Must에 둔다 — 이 과목의 정체성이다. ② 'Won't'을 적는 것이 진짜 실력이다. 안 할 것을 정해야 할 것에 집중한다. ③ Must끼리도 순서를 매겨 '가장 먼저 도는 화면'을 정한다.
[왜 중요한가] 우선순위 없이 시작하면 화면 색·폰트 꾸미기에 하루를 쓰고 정작 핵심 기능은 못 만든 채 발표를 맞는다. 강사는 팀별로 포스트잇 4칸판을 만들게 하고 Must 3개 초과 팀은 강제로 줄이게 한다.`},{h:"프론트·백·DB가 손잡는 그림 한 장 그리기",body:`아키텍처는 거창한 말이 아니라 '누가 무엇을 하고, 데이터가 어디로 흐르는가'를 상자와 화살표로 그린 그림이다. 우리 미니 프로젝트의 기본형은 세 덩어리다 — ① 브라우저(사용자가 보는 Vue 화면), ② LLM API(요약·추천을 대신 해주는 남의 서버), ③ 데이터 저장소(지금은 mock.json, 나중엔 실제 DB).
화살표로 그리면 이렇게 된다: 사용자가 글을 쓴다 → 화면이 그 글을 LLM API에 보낸다 → 요약을 받아 화면에 표시하고 저장한다.
[핵심 포인트] ① 지금 단계에선 '진짜 백엔드 서버'를 직접 만들지 않아도 된다. 화면 + 남의 AI API + 목업 데이터면 미니 프로젝트로 충분하다. ② 데이터가 흐르는 방향(입력→요청→응답→표시)을 화살표마다 말로 설명할 수 있어야 코드에서 막히지 않는다. ③ 이 그림에 등장하는 상자가 곧 2일차에 만들 파일·컴포넌트가 된다.
[왜 중요한가] 이 한 장이 2일차 구현 순서표가 된다. 화살표를 말로 못 그리면 코드도 못 짠다. 강사는 학습자에게 자기 서비스의 데이터 흐름을 화살표 위에 한국어 문장으로 적게 시킨다.`},{h:"기술 스택은 '익숙함'과 '요구'의 저울",body:`기술 스택은 이 프로젝트에서 쓸 도구 묶음이다. 초보 팀이 스택을 고를 때 기준은 '세상에서 가장 좋은 것'이 아니라 '3일 안에 우리가 다룰 수 있는 것'이다. 우리 과정의 기본 스택은 Vue 3 + Vite(빠른 개발서버·빌드) + Vue Router(화면 이동) + Pinia(데이터 창고) + 남의 LLM API(AI 기능) + GitHub Pages(무료 배포)다.
[핵심 포인트] ① 새 도구를 프로젝트 도중에 처음 배우는 것은 도박이다 — 이미 배운 것으로 간다. ② 배포처(GitHub Pages)를 처음부터 정해두면 base 경로 같은 함정을 미리 대비할 수 있다. ③ 정한 스택을 README에 적어두면 팀원 누구나 같은 환경을 재현한다.
[왜 중요한가] 스택이 팀원마다 제각각이면 3일차 통합에서 '내 컴퓨터에선 되는데'가 폭발한다. 강사는 '왜 이 도구를 골랐는가'를 한 줄씩 이유와 함께 README에 적게 한다 — 선택에 근거가 생긴다.`},{h:"누가 무엇을 언제까지 — 작업 분담과 마일스톤",body:`1일차 마지막 시간엔 코드가 아니라 '팀 운영'을 설계한다. 두 가지를 정한다 — 작업 분담(누가 어느 화면·기능을 맡는가)과 일정(마일스톤: 언제까지 무엇이 끝나야 하는가). 분담은 화면 단위로 자르는 것이 충돌이 가장 적다(예: A=목록·상세 화면, B=입력폼·AI 연동, C=배포·발표자료).
일정은 3일차 발표에서 거꾸로 계산한다 — 3일차 오전엔 배포가 끝나야 하니, 2일차 저녁엔 기능이 다 돌아야 하고, 그러려면 2일차 오전엔 화면 뼈대가 서 있어야 한다.
[핵심 포인트] ① 여러 명이 겹쳐 만지는 파일(App.vue·store·router)은 한 사람이 먼저 뼈대를 만들어 공유한 뒤 나눈다. ② 매일 아침 10분 '어제 한 것·오늘 할 것·막힌 것'을 나누는 스탠드업을 정한다. ③ 커밋을 자주 남겨 3일차 통합 부담을 미리 줄인다.
[왜 중요한가] 미니 프로젝트 실패의 절반은 기술이 아니라 '누가 무엇을 하는지 몰라서' 생긴다. 강사는 1일차 종료 전 팀별로 '분담표 + 3일 마일스톤 표'를 README에 커밋했는지 확인한다.`}]},realCodes:[{title:"화면에 채울 목업 데이터(mock.json) — 가짜 데이터로 설계 검증하기",lang:"javascript",code:`// mock.json 은 실제 서버 없이도 화면을 그려보기 위한 '가짜 데이터'다
// 아직 백엔드가 없으니 이 데이터를 가지고 화면이 잘 나오는지 먼저 확인한다
[
  {
    "id": 1,                       // 각 항목을 구분하는 고유 번호(겹치면 안 됨)
    "name": "행복 김밥",            // 가게 이름 → 목록 화면 제목으로 사용
    "rating": 4.5,                 // 별점(0~5) → 별 아이콘 개수 계산에 사용
    "tags": ["분식", "가성비"],    // 분류 태그 → 필터 버튼 만들 때 사용
    "memo": "점심에 줄 서는 집"     // 한 줄 메모 → 상세 화면 본문
  },
  {
    "id": 2,                       // 두 번째 항목의 고유 번호
    "name": "미소 카페",            // 두 번째 가게 이름
    "rating": 4.0,                 // 두 번째 가게 별점
    "tags": ["카페", "디저트"],    // 두 번째 가게 태그
    "memo": "조용해서 작업하기 좋음" // 두 번째 가게 메모
  }
]
// 이 파일을 화면 컴포넌트에서 불러오면(import) 진짜 서버처럼 흉내 낼 수 있다`,note:`서버를 만들기 전 단계라 가짜 데이터로 화면을 먼저 검증한다.
여기서 정한 키 이름(id·name·rating)이 나중에 데이터베이스 컬럼 이름이 된다.`}],periods:["1교시 OT·미니프로젝트 목표와 한 사이클(기획→배포) 흐름 잡기","2교시 주제 선정 워크숍·사용자 시나리오 함께 써보기(실습)","3교시 와이어프레임으로 화면 흐름 그리기(실습)","4교시 기능 명세서 작성과 우선순위 정하기","5교시 프론트/백엔드 아키텍처와 데이터 모델 설계(실습)","6교시 화면-데이터 연결 JSON 목업 만들기(실습)","7교시 기술 스택 선정과 프로젝트 폴더 초기화(실습)","8교시 작업 분담·일정표 작성과 1일차 회고"]},"webproject-2":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 1일차 설계 리뷰와 오늘 구현 목표 정하기"},{time:"10:00–10:50",topic:"2교시 컴포넌트로 화면 쪼개기와 목록 화면 만들기(실습)"},{time:"11:00–11:50",topic:"3교시 라우터로 목록↔상세 화면 이동 붙이기(실습)"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 상태 관리로 데이터 한곳에 모으기(실습)"},{time:"14:00–14:50",topic:"5교시 입력 폼 만들고 새 글 추가 기능 구현(실습)"},{time:"15:00–15:50",topic:"6교시 폼 유효성 검사와 예외 처리 넣기(실습)"},{time:"16:00–16:50",topic:"7교시 API 연동(fetch)으로 가짜 서버에서 데이터 받아오기(실습)"},{time:"17:00–17:50",topic:"8교시 중간 점검·코드 리뷰와 내일 통합 준비"}],practice:{title:"목록·상세·입력 폼이 동작하는 핵심 화면 구현하기",steps:["src/components 폴더에 ItemCard.vue 파일을 만들어 항목 하나를 보여주는 부품을 만든다.","App.vue 또는 ListView.vue 에서 mock.json 을 import 해 v-for 로 ItemCard 를 반복 출력한다.","'npm install vue-router' 로 라우터를 설치하고 router/index.js 에 목록·상세 두 경로를 등록한다.","목록의 각 카드를 클릭하면 router-link 로 상세 화면(/item/:id)으로 이동하게 만든다.","'npm install pinia' 로 상태 저장소를 설치하고 store에 items 배열을 옮겨 화면들이 같이 쓰게 한다.","새 글 입력 폼(input·textarea)을 만들고 제출 버튼을 누르면 store의 items에 추가되게 한다.","제목이 비어 있으면 '제목을 입력하세요' 경고를 띄우는 유효성 검사를 넣는다.","브라우저에서 글을 추가해 목록에 바로 나타나는지 확인한다(기대 결과: 새 카드가 목록 맨 위에 추가됨).","서비스에 넣기로 한 AI 기능 1개를, LLM API에 요청을 보내고 받은 결과를 화면에 표시하는 형태로 구현한다(예: 메모 저장 시 한 줄 요약을 함께 보여주기).",`동작이 확인되면 'git commit -m "핵심 화면 구현"' 으로 저장한다.`],deliverable:"목록→상세 이동·새 글 추가·유효성 검사와 AI 기능 1개가 실제로 동작하는 Vue 앱(중간 빌드)"}},examples:[{title:"입력칸과 변수를 연결하는 v-model",lang:"vue",code:`<script setup>
import { ref } from 'vue' // 반응형 변수를 만드는 ref 가져오기
const title = ref('') // 입력값을 담을 빈 변수(처음엔 빈 문자열)
<\/script>

<template>
  <!-- v-model 로 input 의 글자와 title 변수가 자동으로 같아진다 -->
  <input v-model="title" placeholder="제목 입력" />
  <!-- 입력하는 즉시 아래에 똑같이 표시된다 -->
  <p>미리보기: {{ title }}</p>
</template>`,note:"v-model 하나면 입력칸과 변수가 양쪽으로 자동 동기화된다."},{title:"제출 전에 빈칸을 막는 유효성 검사",lang:"javascript",code:`// 사용자가 제출 버튼을 눌렀을 때 실행되는 함수
function submit(title) {
  // trim 으로 앞뒤 공백을 지운 뒤 빈 문자열인지 검사한다
  if (title.trim() === '') {
    // 비어 있으면 경고를 띄우고 false 를 돌려 제출을 막는다
    alert('제목을 입력하세요')
    return false
  }
  // 통과하면 true 를 돌려 저장을 진행한다
  return true
}
console.log(submit('   ')) // 결과: 경고창 후 false
console.log(submit('맛집')) // 결과: true`,note:"저장하기 전에 빈 입력을 걸러내면 깨진 데이터가 쌓이는 걸 막는다."},{title:"라우터 설정과 목록↔상세 이동 (router/index.js + router-link)",lang:"javascript",code:`// src/router/index.js : 주소와 화면을 짝지어 등록하는 표
import { createRouter, createWebHashHistory } from 'vue-router'
import ListView from '../views/ListView.vue'   // 목록 화면
import DetailView from '../views/DetailView.vue' // 상세 화면

const routes = [
  { path: '/', component: ListView },              // 주소가 '/' 이면 목록
  { path: '/item/:id', component: DetailView },    // '/item/3' 이면 3번 글 상세
]

export const router = createRouter({
  // GitHub Pages 정적 배포에서 새로고침 404를 피하려면 hash 방식이 안전하다
  history: createWebHashHistory(),
  routes,
})

// --- main.js 에서 앱에 연결 ---
// import { router } from './router'
// createApp(App).use(router).mount('#app')

// --- 목록 카드에서 상세로 이동 (ListView.vue template) ---
// <router-link :to="\`/item/\${item.id}\`">{{ item.name }}</router-link>

// --- 상세 화면에서 :id 값 꺼내 쓰기 (DetailView.vue) ---
// import { useRoute } from 'vue-router'
// const route = useRoute()
// const id = Number(route.params.id) // 주소의 :id 를 숫자로 변환해 사용`,note:"createWebHashHistory는 GitHub Pages 같은 정적 호스팅에서 상세 주소를 직접 열거나 새로고침해도 404가 나지 않게 해주는 안전한 선택이다. :id 같은 동적 파라미터는 useRoute().params 로 꺼낸다."},{title:"AI 한 줄 요약 연동 — 로딩·에러 상태까지 (Vue 3 + fetch)",lang:"vue",code:`<script setup>
import { ref } from 'vue'

const memo = ref('')       // ① 입력: 사용자가 쓴 메모
const summary = ref('')    // ③ 표시: 요약 결과
const loading = ref(false) // 요청 중 여부
const error = ref('')      // 실패 메시지

// .env 에 VITE_OPENAI_API_KEY=sk-... 를 넣고 .gitignore 로 깃 업로드를 막는다
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY

async function summarize() {
  loading.value = true   // 요청 시작 → 버튼 잠그고 '요약 중...' 표시
  error.value = ''
  try {
    // ② 요청: LLM 채팅 API 에 '한 줄 요약' 프롬프트를 POST 한다
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: \`Bearer \${API_KEY}\`, // 키를 헤더에 실어 인증
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // 가볍고 저렴한 모델(클로드라면 Anthropic 엔드포인트로 교체)
        messages: [
          { role: 'system', content: '너는 한국어 요약가야. 한 문장으로만 답해.' },
          { role: 'user', content: \`다음 메모를 한 줄로 요약해줘: \${memo.value}\` },
        ],
      }),
    })
    if (!res.ok) throw new Error(\`요청 실패 (\${res.status})\`) // 4xx/5xx 방어
    const data = await res.json()
    summary.value = data.choices[0].message.content // 요약 문장만 추출
  } catch (e) {
    error.value = '요약을 못 받아왔어요. 잠시 후 다시 시도해 주세요.'
    console.error(e)
  } finally {
    loading.value = false // 성공/실패와 무관하게 로딩 해제
  }
}
<\/script>

<template>
  <textarea v-model="memo" placeholder="메모를 입력하세요" />
  <button @click="summarize" :disabled="loading">
    {{ loading ? '요약 중...' : 'AI 한 줄 요약' }}
  </button>
  <p v-if="error" style="color:red">{{ error }}</p>
  <p v-if="summary">요약: {{ summary }}</p>
</template>`,note:"입력(memo)→요청(fetch)→표시(summary)의 3단계가 그대로 드러난다. loading·error 두 상태를 함께 다뤄야 시연 중 화면이 멈춘 것처럼 보이지 않는다. 키를 화면에서 직접 쓰는 방식은 학습용이며, 상용에서는 백엔드 프록시로 키를 숨겨야 한다."},{title:"🚀 따라하기 프로젝트 — index.html 하나로 만드는 AI 한 줄 요약 서비스",lang:"html",code:`<!-- STEP 1) 이 파일 하나(index.html)만 만들면 되는 최소 AI 웹서비스다 -->
<!-- 브라우저에서 열고 리뷰를 붙여넣으면 한 줄 요약이 나온다 -->
<!doctype html>
<meta charset="utf-8">
<textarea id="src" rows="4" placeholder="리뷰를 붙여넣으세요"></textarea>
<button id="go">한 줄 요약</button>
<p id="out"></p>

<script>
// STEP 2) 요약 요청 함수 — LLM 채팅 API에 POST 한다
async function summarize(text) {
  // 키는 코드에 직접 쓰지 말고 실제로는 서버(프록시)를 거쳐 부른다(여기선 학습용)
  const res = await fetch('https://api.example-llm.com/v1/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: '다음 리뷰를 40자 이내 한 문장으로 요약: ' + text }]
    })
  })
  const data = await res.json()           // 응답을 JSON으로 변환
  return data.choices[0].message.content  // 요약 문장만 꺼낸다
}

// STEP 3) 버튼을 누르면 요약을 호출하고 화면에 표시한다
document.getElementById('go').onclick = async function () {
  const text = document.getElementById('src').value.trim()
  const out = document.getElementById('out')
  if (text.length < 10) { out.textContent = '리뷰를 조금 더 길게 입력하세요'; return } // 비용가드
  out.textContent = '요약 중…'
  try {
    out.textContent = await summarize(text)   // 성공 → 요약 표시
  } catch (e) {
    out.textContent = text.slice(0, 40)       // 실패대응 → 원문 앞 40자
  }
}
<\/script>`,note:'index.html 하나로 동작하는 최소 AI 웹서비스. STEP 1→3 순서대로 따라 만들면 "입력→AI 호출→표시" 한 사이클이 완성된다. 실서비스는 키를 서버 프록시로 숨긴다.'},{title:"데이터 모델(ERD)을 코드로 — DBML 로 엔터티·관계 정의",lang:"text",code:`// {반_이름_프로젝트명}-DB.dbml : 데이터 모델을 코드로 표현한다
// dbdiagram.io 에 붙여넣으면 관계도(ERD)가 자동으로 그려진다

Table users {                        // 회원 엔터티
  id integer [pk, increment]         // PK: 자동 증가 기본키
  email varchar [unique, not null]   // 로그인 이메일(중복 불가)
  nickname varchar [not null]        // 표시 이름
  created_at timestamp               // 가입 시각
}

Table posts {                        // 글 엔터티
  id integer [pk, increment]         // PK
  user_id integer [not null]         // FK: 작성자(users.id 를 가리킴)
  title varchar [not null]           // 제목
  content text                       // 본문
  created_at timestamp
}

// 관계: 회원 1명이 글 여러 개를 쓴다(1:N)
Ref: posts.user_id > users.id`,note:"ERD 평가의 핵심은 PK/FK 명시와 1:N·M:N 관계 정의다. UI 에서 화면에 뿌리는 모든 데이터 필드가 여기 엔터티에 존재해야 하며, 이 DBML 을 dbdiagram.io 에 넣으면 다이어그램이 자동 생성된다."},{title:"API 명세를 OpenAPI(OAS) YAML 로 — Method·Body·에러코드",lang:"yaml",code:`# {반_이름_프로젝트명}-API.yml : 화면이 호출하는 API를 OpenAPI로 명세
openapi: 3.0.0
info:
  title: 글 서비스 API           # 서비스 이름
paths:
  /posts:                        # '글' 자원(주소는 동사 없이 명사만)
    get:                         # 목록 조회 (GET = Read)
      parameters:
        - name: q                # 검색어를 query 로 받음
          in: query
          schema: { type: string }
      responses:
        '200': { description: 조회 성공 }
    post:                        # 새 글 등록 (POST = Create)
      requestBody:               # 클라이언트가 보낼 body 정의
        content:
          application/json:
            schema: { $ref: '#/components/schemas/PostInput' }  # 공통 스키마 재사용
      responses:
        '201': { description: 생성됨 }
        '400': { description: 입력값 오류 }        # 에러 코드 명시
components:
  schemas:
    PostInput:                   # 여러 API가 함께 쓰는 공통 입력 스키마
      type: object
      properties:
        title: { type: string }   # 제목
        content: { type: string } # 본문`,note:"평가 포인트는 적절한 HTTP Method, Path/Query/Body 명확화, 에러코드(400/401/404) 정의, $ref 로 공통 스키마 재사용이다. 요청/응답 필드는 앞서 만든 DBML(ERD)과 반드시 일치해야 한다."},{title:"실전 스키마 분석 — 평가 기록 테이블과 RLS(행 수준 보안)",lang:"sql",code:`-- 이 학습 사이트가 실제로 쓰는 '교과목 평가 기록' 테이블 설계다
create table if not exists skala_evaluations (      -- if not exists: 여러 번 실행해도 안전(멱등)
  id           uuid primary key default gen_random_uuid(),  -- 행마다 자동 고유 ID
  subject_id   text not null,                      -- 어떤 과목의 평가인지
  student_name text not null,                      -- 학생 성명(필수)
  student_no   text default '',                    -- 고유번호(없으면 빈 문자열)
  track        text,                               -- 캠퍼스(gj·us·p4·p5)
  class_no     int,                                -- 반 번호
  scores       jsonb not null default '{}'::jsonb, -- 항목별 점수를 JSON으로 유연하게 저장
  note_basis   text default '',                    -- 점수 판단 근거
  updated_at   timestamptz not null default now()  -- 수정 시각 자동 기록
);

-- RLS(Row Level Security): '행 단위'로 접근을 통제하는 스위치를 켠다
alter table skala_evaluations enable row level security;

-- 정책을 갈아끼울 때는 drop 후 create — 재실행해도 42710(중복) 에러가 안 난다
drop policy if exists "evaluations_admin_all" on skala_evaluations;
create policy "evaluations_admin_all" on skala_evaluations
  for all                                          -- select/insert/update/delete 전부
  using (skala_is_admin())                         -- 읽을 때: 관리자만
  with check (skala_is_admin());                   -- 쓸 때도: 관리자만`,note:"성적처럼 민감한 데이터는 서버(RLS)가 지켜야 한다 — 프런트에서 화면만 가리는 것은 보안이 아니다. jsonb 컬럼은 평가 항목이 과목마다 달라도 테이블 구조를 바꾸지 않게 해 주는 실전 요령이다."},{title:"React에서 Supabase CRUD — 조회 필터와 업서트 패턴",lang:"javascript",code:`// 이 사이트의 평가 화면이 실제로 쓰는 데이터 연동 패턴(요약본)
import { supabase } from '../lib/supabase'          // 프로젝트 공용 클라이언트 1개만 만든다

// 1) 조회 — 과목+분반으로 좁혀서 필요한 행만 가져온다
async function loadEvaluations(subjectId, track, classNo) {
  const { data, error } = await supabase
    .from('skala_evaluations')                      // 테이블 선택
    .select('*')                                    // 전체 컬럼
    .eq('subject_id', subjectId)                    // WHERE subject_id = ...
    .eq('track', track)                             // 분반 스코프까지 걸어야 화면이 섞이지 않는다
    .eq('class_no', classNo)
    .order('created_at')                            // 입력 순 정렬
  if (error) throw error                            // 에러는 삼키지 말고 화면에 알린다
  return data
}

// 2) 저장 — upsert: id가 있으면 UPDATE, 없으면 INSERT를 한 번에
async function saveEvaluations(rows) {
  const { data, error } = await supabase
    .from('skala_evaluations')
    .upsert(rows)                                   // 여러 행을 한 번에 저장(왕복 1회)
    .select()                                       // 저장 결과(새 id 포함)를 돌려받는다
  return { data, error }
}`,note:"화면 상태에는 '저장 전 변경(dirty)' 표시를 두고, 저장 성공 후에만 지우는 것이 실무 패턴이다. RLS가 켜져 있으면 이 코드가 관리자 계정이 아닐 때 자동으로 거부된다 — 프런트 코드는 같아도 서버가 판단한다."},{title:"브라우저에서 CSV 내보내기 — BOM·Blob·다운로드 링크",lang:"javascript",code:`// 서버 없이 브라우저만으로 엑셀 호환 CSV를 만들어 내려받게 하는 패턴
function exportCsv(rows) {
  // 1) 셀 이스케이프: 따옴표로 감싸고, 내부 따옴표는 두 번 쓴다(CSV 규칙)
  const esc = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"'

  // 2) 헤더 + 데이터 행을 CRLF로 연결한다(엑셀 줄바꿈 규칙)
  const head = ['고유번호', '성명', '점수', '판단근거'].map(esc).join(',')
  const lines = rows.map((r) =>
    [esc(r.no), esc(r.name), esc(r.total), esc(r.basis)].join(','))
  const body = [head, ...lines].join('\\r\\n')

  // 3) 맨 앞의 BOM(\\uFEFF)이 핵심 — 없으면 엑셀에서 한글이 깨진다
  const csv = '\\uFEFF' + body

  // 4) Blob으로 가짜 파일을 만들고, 보이지 않는 링크를 눌러 다운로드시킨다
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  a.download = '평가결과.csv'                        // 저장될 파일명
  a.click()
  URL.revokeObjectURL(a.href)                       // 메모리 정리(누수 방지)
}`,note:"한글 CSV가 엑셀에서 깨지는 원인의 9할은 BOM 누락이다. 이 사이트의 평가 CSV 내보내기가 정확히 이 패턴으로 동작한다 — 만든 기능의 소스를 다시 읽는 것이 가장 좋은 실습이다."}],concepts:[{term:"컴포넌트(component)",desc:"버튼·카드처럼 화면을 이루는 작은 부품으로, 한 번 만들면 여러 곳에서 재사용한다."},{term:"props",desc:"부모 컴포넌트가 자식 부품에게 데이터를 건네주는 통로다(택배 상자에 내용물을 담아 보내는 것과 비슷)."},{term:"이벤트(emit)",desc:"자식 부품이 부모에게 '버튼 눌렸어요' 같은 소식을 거꾸로 알리는 신호다."},{term:"라우터(router)",desc:"주소(URL)에 따라 어떤 화면을 보여줄지 정해주는 길 안내자다."},{term:"상태 관리(state management)",desc:"여러 화면이 함께 쓰는 데이터를 한 창고에 모아두고 같이 꺼내 쓰는 방식이다."},{term:"양방향 바인딩(v-model)",desc:"입력칸에 친 글자와 코드 속 변수를 자동으로 똑같이 맞춰주는 연결이다."},{term:"유효성 검사(validation)",desc:"사용자가 잘못 입력했는지(빈칸·형식 오류) 미리 확인해 막아주는 점검이다."},{term:"AI 기능(AI feature)",desc:"서비스 안에서 AI가 대신 해주는 작업 하나(요약·추천·분류·생성 등)로, 우리가 알고리즘을 짜는 게 아니라 AI에게 시켜서 결과만 받아 쓴다."},{term:"LLM API 연동",desc:"우리 코드가 대형 언어모델 서버에 '이 문장을 요약해줘' 같은 요청을 보내고 답을 받아 화면에 표시하는 연결이다. 주소·키는 .env에 숨겨두고 fetch로 호출한다."}],detail:{topics:[{h:"화면 구현",items:["컴포넌트 분리(카드·폼)","v-for 목록 렌더링","props/emit 통신","조건부 렌더 v-if"]},{h:"이동과 데이터",items:["Vue Router 설치·등록","동적 라우트(/item/:id)","Pinia 스토어 구성","화면-스토어 연동"]},{h:"폼과 안정성",items:["v-model 입력 바인딩","유효성 검사","예외 처리(빈값·에러)","fetch 비동기 로딩"]}],labs:[{title:"Lab 1. 라우터로 목록↔상세 화면 이동 붙이기",steps:["'npm install vue-router' 로 라우터를 설치한다.","src/router/index.js 를 만들고 '/'(목록)와 '/item/:id'(상세) 두 경로를 등록한다.","main.js 에서 app.use(router) 로 라우터를 앱에 연결한다.","App.vue 에 <router-view /> 를 넣어 현재 경로의 화면이 표시되게 한다.","목록 카드에 router-link 를 걸어 클릭하면 상세 주소로 이동하는지 확인한다."]},{title:"Lab 2. 새 글 추가 폼 만들고 목록에 반영하기",steps:["input과 textarea, 제출 버튼으로 된 폼 컴포넌트를 만든다.","ref로 title·memo 변수를 만들고 v-model로 입력칸과 연결한다.","제출 함수에서 빈칸 검사 후 store의 add()를 호출한다.","추가 직후 입력칸을 빈 문자열로 비우고, 목록 맨 위에 새 카드가 뜨는지 확인한다."]},{title:"Lab 3. AI 요약 기능을 화면에 붙이기 (7교시 실습)",steps:["프로젝트 루트에 .env 파일을 만들어 VITE_OPENAI_API_KEY=sk-... 를 적고, .gitignore에 .env가 포함돼 있는지 확인한다(키가 깃에 올라가면 즉시 폐기해야 함).","요약을 담당할 컴포넌트에 summary·loading·error 세 개의 반응형 변수(ref)를 만든다.","'AI 요약' 버튼을 누르면 loading을 true로 바꾸고, fetch로 LLM API에 메모와 프롬프트를 POST한다.","응답 JSON에서 요약 문장만 꺼내 summary에 담고 카드 아래에 표시한다.","실패 시 catch에서 error에 안내 문구를 담아 빨간 글씨로 보여주고, finally에서 loading을 false로 되돌린다.","브라우저에서 메모를 입력해 요약이 뜨는지, 요청 중 버튼이 잠기는지, 일부러 키를 틀리게 넣어 에러 문구가 뜨는지까지 확인하고 커밋한다."]}],homework:["상세 화면(/item/:id)에서 라우트 파라미터 id로 스토어에서 해당 항목을 찾아 내용을 모두 표시하기.","글 삭제 버튼을 만들어 스토어에 remove(id) 액션을 추가하고 목록에서 사라지게 만들기."]},theory:{theory:[{h:"화면을 통째로 만들지 말고 부품으로 쪼개라",body:`레고를 생각하면 쉽다.
작은 블록(부품)을 여러 개 만들어 끼워 맞추면 큰 모형이 된다.
웹 화면도 카드 하나, 버튼 하나를 컴포넌트라는 부품으로 만들고 그것을 모아 큰 화면을 짠다.
이렇게 하면 같은 카드를 100번 그려야 할 때 부품 하나만 만들고 100번 반복해서 쓰면 된다.

부품끼리는 props로 데이터를 내려주고 emit으로 소식을 올려보낸다.
이 '내려주기·올려보내기' 규칙만 지키면 화면이 아무리 커져도 관리가 쉬워진다.`},{h:"데이터는 창고(스토어)에 모아두면 편하다",body:`목록 화면과 상세 화면이 각자 데이터를 따로 들고 있으면, 한 곳에서 글을 추가해도 다른 곳은 모른다.
그래서 데이터를 Pinia라는 공용 창고에 한 번만 보관한다.
모든 화면은 이 창고에서 데이터를 꺼내 쓰고, 바뀌면 자동으로 같이 갱신된다.
냉장고 하나를 온 가족이 함께 쓰는 것과 같다.

이렇게 데이터를 한곳에 모으면 '왜 이 화면만 안 바뀌지?' 하는 흔한 버그가 크게 줄어든다.`},{h:"라우터 — 주소(URL)가 어떤 화면을 보여줄지 정한다",body:`지금까지 화면은 하나였다. 그런데 '목록'과 '상세'처럼 화면이 여러 개가 되면 무엇을 기준으로 화면을 바꿀까? 답은 주소(URL)다. 라우터는 '/'이면 목록을, '/item/3'이면 3번 글 상세를 보여주도록 주소와 화면을 짝지어 주는 길 안내자다.
[핵심 포인트] ① 경로를 router/index.js에 표로 등록한다 — { path:'/', component: ListView }, { path:'/item/:id', component: DetailView }. ② :id처럼 콜론이 붙은 부분은 '바뀌는 값'으로, 상세 화면에서 useRoute().params.id로 꺼내 쓴다. ③ 화면 이동은 <a> 태그 대신 <router-link>나 router.push()를 쓴다 — 새로고침 없이 즉시 전환되어 데이터가 날아가지 않는다.
[왜 중요한가] 라우터가 있어야 브라우저의 뒤로가기와 주소 공유가 정상 작동하는 '진짜 웹앱'이 된다. 강사는 목록 카드를 클릭하면 주소창의 URL이 /item/3으로 바뀌는 장면을 직접 보여주며 '주소가 곧 화면'임을 각인시킨다.`},{h:"기다림을 다루기 — 로딩과 에러 상태",body:`화면에서 남의 서버(AI API·목 서버)에 데이터를 요청하면 답이 즉시 오지 않는다. 짧으면 0.5초, 길면 몇 초가 걸리고 때로는 실패한다. 이 '기다리는 동안'과 '실패했을 때'를 화면에서 다루지 않으면 사용자는 멈춘 줄 알고 버튼을 마구 누른다. 그래서 상태를 세 가지로 나눈다 — loading(요청 중), success(데이터 도착), error(실패).
[핵심 포인트] ① loading이 true면 '불러오는 중...'이나 스피너를 보여주고 버튼을 잠근다(중복 요청 방지). ② try/catch로 실패를 잡아 error 메시지를 화면에 띄운다. ③ 성공하든 실패하든 finally에서 loading을 다시 false로 되돌린다 — 안 그러면 영원히 '불러오는 중'에 갇힌다.
[왜 중요한가] AI API는 특히 응답이 느리고 가끔 실패한다. 로딩·에러 처리가 없으면 시연 도중 화면이 멈춘 것처럼 보여 발표를 망친다. 이 세 상태는 다음 교시의 LLM 연동에 그대로 얹어 쓴다.`},{h:"AI 기능을 화면에 붙이는 3단계 — 입력·요청·표시 (오늘의 핵심)",body:`오늘의 하이라이트다. 'AI 기능'이라고 해서 인공지능을 직접 만드는 게 아니다. 이미 똑똑한 LLM(예: OpenAI, Anthropic 클로드)에게 '이 일을 해줘'라고 부탁하고 결과만 화면에 붙이는 것이다. 어떤 AI 기능이든 언제나 똑같은 3단계다.
① 입력 모으기: 사용자가 쓴 메모·글을 변수에 담는다.
② 요청 보내기: fetch로 LLM API에 프롬프트('다음 메모를 한 줄로 요약해줘: ...')와 함께 POST한다.
③ 응답 표시: 돌아온 답(JSON)에서 텍스트만 꺼내 반응형 변수(ref)에 넣어 화면에 그린다.
[핵심 포인트] ① API 키는 절대 코드에 직접 쓰지 않고 .env(VITE_ 접두사)에 숨기고 .gitignore로 깃 업로드를 막는다. ② 실제 상용 서비스라면 키 노출을 막으려 백엔드(프록시)를 거치지만, 미니 프로젝트에선 개인 키로 화면에서 직접 호출해 개념부터 익힌다(이 한계를 발표에서 언급하면 좋다). ③ 요청 중엔 로딩 표시, 실패엔 에러 표시(직전 교시 내용)를 반드시 함께 붙인다.
[왜 중요한가] 이 3단계가 'AI 웹 서비스'의 심장이다. 평범한 CRUD 앱에 이 한 조각을 붙이는 순간 비로소 우리 과목의 서비스가 된다. 요약·추천·분류·생성 — 무엇을 시키든 코드 골격은 이 3단계로 동일하다.`},{h:"코드 리뷰는 흠집내기가 아니라 지도 함께 그리기",body:`2일차 마지막엔 팀이 서로의 코드를 함께 본다. 리뷰의 목적은 '누가 못 짰나' 찾기가 아니라 '내일 합칠 때 어디가 부딪칠까'를 미리 아는 것이다. 딱 세 가지만 본다 — ① 파일·컴포넌트 이름과 폴더 구조가 팀 약속대로인가, ② 겹치는 파일(App.vue·store·router)을 서로 다르게 고치지 않았나, ③ 콘솔에 빨간 에러가 남아 있지 않은가.
[핵심 포인트] ① 리뷰는 화면 공유로 한 명당 5분씩 '내가 만든 것 시연 → 막힌 것 질문' 순서로 진행한다. ② 그 자리서 발견한 문제는 즉석에서 고치지 말고 '내일 통합 버그 목록'에 적어둔다(오늘 손대면 남의 코드가 또 깨진다). ③ 오늘 각자 커밋·푸시를 반드시 끝내 내일 아침 바로 합칠 수 있게 한다.
[왜 중요한가] 3일차 통합에서 터지는 충돌의 대부분은 2일차에 5분만 맞춰봤으면 피할 수 있던 것이다. 강사는 종료 전 '전원 커밋·푸시 완료'와 '통합 버그 목록 초안'을 확인한다.`}]},realCodes:[{title:"항목 카드 부품 + 목록에서 반복 출력하기(엔드투엔드)",lang:"vue",code:`<!-- ItemCard.vue : 항목 하나를 보여주는 재사용 부품 -->
<script setup>
// defineProps 로 부모가 내려주는 데이터(item)를 받는다
const props = defineProps({
  item: Object // item 객체에는 name, rating, memo 가 들어 있다
})
// defineEmits 로 '카드가 클릭됐다'는 신호를 부모에게 보낼 수 있게 준비한다
const emit = defineEmits(['select'])
<\/script>

<template>
  <!-- 카드 전체를 클릭하면 select 신호와 함께 이 item 의 id 를 부모로 보낸다 -->
  <div class="card" @click="emit('select', item.id)">
    <!-- {{ }} 안의 값은 데이터를 화면에 그대로 출력한다 -->
    <h3>{{ item.name }}</h3>            <!-- 가게 이름 표시 -->
    <p>별점: {{ item.rating }}</p>      <!-- 별점 표시 -->
    <p>{{ item.memo }}</p>              <!-- 한 줄 메모 표시 -->
  </div>
</template>`,note:`props로 데이터를 받고 emit으로 클릭 소식을 부모에게 올려보내는 가장 기본 패턴이다.
이 부품 하나를 목록에서 v-for로 반복하면 카드 수십 개를 손쉽게 그릴 수 있다.`},{title:"Pinia 스토어로 데이터 모으고 새 글 추가하기",lang:"javascript",code:`// stores/items.js : 모든 화면이 함께 쓰는 데이터 창고
import { defineStore } from 'pinia' // 스토어를 만드는 함수 가져오기
import mock from '../data/mock.json' // 1일차에 만든 가짜 데이터 가져오기

// 'items' 라는 이름의 창고를 정의한다
export const useItemStore = defineStore('items', {
  // state: 창고에 보관하는 실제 데이터
  state: () => ({
    list: mock // 처음엔 목업 데이터로 채워둔다
  }),
  // actions: 데이터를 바꾸는 함수 모음
  actions: {
    // 새 글을 목록 맨 앞에 추가하는 함수
    add(newItem) {
      // 새 id 는 현재 개수+1 로 간단히 만든다
      newItem.id = this.list.length + 1
      // unshift 는 배열 맨 앞에 끼워 넣는다(최신 글이 위로)
      this.list.unshift(newItem)
    }
  }
})
// 화면에서 useItemStore() 를 부르면 어디서든 같은 list 를 쓰게 된다`,note:`데이터와 '데이터를 바꾸는 방법(add)'을 한곳에 모아두는 구조다.
어느 화면에서 add를 불러도 모든 화면의 목록이 동시에 갱신된다.`}],periods:["1교시 1일차 설계 리뷰와 오늘 구현 목표 정하기","2교시 컴포넌트로 화면 쪼개기와 목록 화면 만들기(실습)","3교시 라우터로 목록↔상세 화면 이동 붙이기(실습)","4교시 상태 관리로 데이터 한곳에 모으기(실습)","5교시 입력 폼 만들고 새 글 추가 기능 구현(실습)","6교시 폼 유효성 검사와 예외 처리 넣기(실습)","7교시 LLM API 연동 — 입력을 보내고 요약/추천 결과를 화면에 표시(실습)","8교시 중간 점검·코드 리뷰와 내일 통합 준비"]},"webproject-3":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 어제까지 만든 기능 통합 점검과 버그 목록 만들기"},{time:"10:00–10:50",topic:"2교시 발견한 버그 함께 고치기(실습)"},{time:"11:00–11:50",topic:"3교시 전체 흐름 통합 테스트하기(실습)"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 환경변수·API 주소 정리와 빌드 준비(실습)"},{time:"14:00–14:50",topic:"5교시 프로덕션 빌드와 정적 배포(GitHub Pages)(실습)"},{time:"15:00–15:50",topic:"6교시 배포 주소 확인·점검과 발표 자료 만들기(실습)"},{time:"16:00–16:50",topic:"7교시 팀별 시연 발표"},{time:"17:00–17:50",topic:"8교시 회고(잘된 점·아쉬운 점·개선점)와 과정 마무리"}],practice:{title:"기능 통합 → 빌드 → 실제 인터넷에 배포하고 발표하기",steps:["팀원들의 작업을 하나의 main 브랜치로 합치고(merge) 충돌이 나면 함께 해결한다.","목록→상세→글 추가→삭제까지 전체 흐름을 직접 클릭하며 통합 테스트하고 버그를 적는다.","발견한 버그를 우선순위대로 고치고 다시 테스트한다.","API 주소처럼 바뀌는 값은 .env 파일에 VITE_API_URL 로 옮겨 코드에서 분리한다.","vite.config.js 의 base 를 '/저장소이름/' 으로 맞춘다(GitHub Pages 경로 문제 예방).","'npm run build' 로 dist 폴더를 만들고 'npm run preview' 로 빌드 결과를 미리 확인한다.","gh-pages 패키지나 GitHub Actions 로 dist 를 배포하고 배포 주소에 접속한다.","배포된 사이트에서 모든 기능이 동작하는지 확인한다(기대 결과: 인터넷 주소로 접속해 글 추가까지 정상 동작).","발표 자료(주제·시연·회고)를 만들고 3분 시연 발표를 진행한다."],deliverable:"인터넷에 배포된 동작하는 웹 서비스 URL + 발표 자료 + 회고 문서"}},examples:[{title:"코드에서 환경변수 읽어 API 주소 쓰기",lang:"javascript",code:`// import.meta.env 로 .env 에 적은 값을 읽는다(VITE_ 접두사 필수)
const API = import.meta.env.VITE_API_URL
// 읽어온 주소로 데이터를 요청한다(주소를 코드에 직접 박지 않아 유지보수가 쉽다)
fetch(\`\${API}/items\`)
  .then(res => res.json()) // 응답을 JSON 으로 변환
  .then(data => console.log('받은 개수:', data.length)) // 결과: 받은 개수: 2
  .catch(err => console.error('요청 실패:', err)) // 에러가 나면 콘솔에 표시`,note:"주소를 .env로 빼면 개발용·배포용 주소를 코드 수정 없이 바꿀 수 있다."},{title:"배포 후 동작 점검 체크리스트(코드로 표현)",lang:"javascript",code:`// 배포된 사이트에서 직접 눌러보며 확인할 항목들
const checklist = [
  '메인 화면이 흰 화면 없이 뜬다',   // base 설정 점검
  '목록이 정상 표시된다',            // 데이터 로딩 점검
  '새 글을 추가할 수 있다',          // 쓰기 기능 점검
  '상세 화면으로 이동된다'           // 라우팅 점검
]
// 하나씩 통과 여부를 출력한다(실제로는 손으로 눌러 확인)
checklist.forEach((item, i) => console.log(\`\${i + 1}. \${item}\`))
// 결과: 1. 메인 화면이 흰 화면 없이 뜬다 ... 4. 상세 화면으로 이동된다`,note:"배포 후에는 반드시 실제 주소에서 핵심 기능을 하나씩 다시 눌러 확인한다."},{title:"AI API로 메모 한 줄 요약 받아 화면에 표시하기",lang:"javascript",code:`// .env 의 키를 코드에 직접 쓰지 않고 import.meta.env 로 읽는다(VITE_ 접두사 필수)
const API_KEY = import.meta.env.VITE_LLM_API_KEY
let ref = ''  // 요약 결과를 담을 변수(Vue라면 ref('')로 반응형 처리)

async function summarize(memo) {
  // LLM 채팅 엔드포인트에 '한 줄 요약' 요청을 POST 한다
  const res = await fetch('https://api.example-llm.com/v1/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${API_KEY}\`,  // 키를 헤더에 실어 인증
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: \`다음 메모를 한 줄로 요약해줘: \${memo}\` }],
    }),
  })
  const data = await res.json()               // 응답을 JSON 으로 변환
  ref = data.choices[0].message.content       // 요약 문장만 꺼내 변수에 담는다
  console.log('요약:', ref)                    // 화면에서는 이 값을 그대로 표시한다
}

summarize('오늘 회의에서 배포 일정을 다음 주로 미루기로 했다')`,note:"API 키는 절대 코드에 직접 쓰지 말고 .env에 두며, 실제 서비스에서는 키 노출을 막기 위해 백엔드(프록시)를 거치는 것이 안전하다."},{title:"환경변수 분리 + Vite base 설정(배포 404 예방)",lang:"javascript",code:`// vite.config.js — 배포 위치에 따라 자산 경로(base)를 맞춘다
export default defineConfig({
  // 커스텀 도메인/루트 배포면 '/', 저장소 하위 경로면 '/repo-name/'
  base: process.env.DEPLOY_BASE || '/',
  plugins: [vue()],
})

// .env.production — 운영 키/주소(코드에 하드코딩 금지, VITE_ 접두사 필수)
// VITE_API_BASE=https://api.myservice.com
// 코드에서는 import.meta.env.VITE_API_BASE 로 읽는다`,note:"base가 배포 경로와 다르면 자산이 404난다(흔한 배포 실패). 운영 주소·키는 .env.production으로 분리한다."},{title:"배포 전 스모크 체크리스트",lang:"bash",code:`# 로컬에서 "운영 빌드"를 그대로 띄워 최종 확인한다
npm run build        # dist/ 생성 (타입/문법 오류 여기서 걸러짐)
npm run preview      # 운영 빌드를 로컬에서 서빙 → 실제와 동일 환경

# 체크: (1) 새로고침해도 라우트 유지되나  (2) API가 운영 주소로 붙나
#       (3) 콘솔 에러 없나           (4) 모바일 폭에서 안 깨지나
# 통과하면 정적 호스팅(GitHub Pages/Netlify)에 dist/ 업로드`,note:"dev에서 되던 게 배포에서 깨지는 대부분은 build/preview로 미리 잡힌다. 발표 전 반드시 운영 빌드로 리허설."},{title:"프로젝트 정의서 목차 점검 — 6개 장이 다 채워졌나",lang:"javascript",code:`// 발표 PDF(정의서)의 목차를 구조로 정리해 빠진 장을 점검한다
const doc = [
  { section: '서비스 개요', items: ['이름', '목적/배경', '핵심 가치', '주요 기능'] },
  { section: '액터 정의', items: ['일반 사용자', '관리자', '외부 시스템'] },
  { section: 'UI 흐름(와이어프레임)', items: ['로그인', '메인', '상세'] }, // PDF에 화면 캡처 필수
  { section: '데이터 모델(ERD)', items: ['엔터티', 'PK/FK', '관계(1:N)'] },
  { section: 'API 명세(OAS)', items: ['요청', '응답', '예외처리'] },
  { section: '고려사항', items: ['설계 고민', '다음 단계 개발 시 고려점'] },
]

// 각 장에 내용이 채워졌는지(빈 목차가 없는지) 확인
doc.forEach((d) => {
  const ok = d.items.length > 0 ? 'OK' : '비어 있음!'
  console.log(d.section + ': ' + ok)
})
// UI 흐름도는 반드시 PDF 안에 이미지로 넣는다(가장 자주 빠뜨리는 항목)`,note:"정의서는 개요→액터→UI흐름→ERD→API→고려사항 6개 장이 서로 이어지도록 작성한다. 특히 UI 흐름도(와이어프레임) 캡처가 PDF 안에 없으면 감점되니 마지막에 반드시 확인한다."},{title:"발표 전 자가점검 — 산출물 3종과 UI·ERD·API 일관성",lang:"javascript",code:`// 발표 전 자가점검: 산출물·납기·'일관성'을 코드로 훑는다
const submit = {
  pdf: true,   // {반_이름_프로젝트명}-개요.pdf (UI 흐름도 포함)
  dbml: true,  // {반_이름_프로젝트명}-DB.dbml
  yml: true,   // {반_이름_프로젝트명}-API.yml
}

// 1) 3종 산출물이 모두 준비됐는지(하나라도 없으면 감점)
const missing = Object.entries(submit).filter(([, v]) => !v).map(([k]) => k)
console.log(missing.length ? '누락: ' + missing : '산출물 3종 완비')

// 2) 가장 자주 깎이는 '일관성' 3가지를 직접 확인한다
const consistency = [
  'UI에서 쓰는 모든 데이터 필드가 ERD(DB)에 있는가',   // UI <-> ERD
  '화면마다 필요한 API가 모두 정의됐는가',              // UI <-> API
  'API의 요청/응답이 ERD 구조와 일치하는가',           // API <-> ERD
]
consistency.forEach((c, i) => console.log((i + 1) + '. ' + c))
// 세 축(UI·데이터·API)이 어긋나면 기능이 문제해결과 연결되지 않아 감점`,note:"세부 평가의 핵심은 UI↔ERD↔API 세 축의 일관성이다. 화면에 쓰는 데이터가 ERD 에 있고, 그 데이터를 나르는 API 가 정의돼 있어야 한다. 납기(3일차 오후 마감) 미준수는 0점이므로 시간 엄수가 최우선이다."}],concepts:[{term:"통합(integration)",desc:"팀원들이 따로 만든 코드 조각을 하나로 합쳐 함께 동작하게 맞추는 일이다."},{term:"통합 테스트(integration test)",desc:"기능들이 따로가 아니라 이어 붙였을 때도 잘 도는지 처음부터 끝까지 눌러보는 점검이다."},{term:"빌드(build)",desc:"개발용 코드를 브라우저가 빠르게 읽을 수 있는 작은 파일 묶음(dist)으로 압축·변환하는 과정이다."},{term:"환경변수(environment variable)",desc:"API 주소처럼 상황마다 바뀌는 값을 코드 밖 .env 파일에 따로 적어두는 방법이다."},{term:"정적 배포(static deploy)",desc:"서버 없이 HTML·JS 파일만 인터넷 공간에 올려 누구나 접속하게 만드는 방식이다."},{term:"GitHub Pages",desc:"GitHub 저장소의 결과물을 무료로 인터넷 주소로 공개해 주는 서비스다."},{term:"회고(retrospective)",desc:"프로젝트가 끝난 뒤 무엇이 좋았고 무엇을 고칠지 팀이 함께 돌아보는 시간이다."}],detail:{topics:[{h:"통합과 테스트",items:["브랜치 병합·충돌 해결","전체 흐름 통합 테스트","버그 목록·우선순위","수정 후 재검증"]},{h:"빌드와 배포",items:["환경변수 분리(.env)","vite base 설정","npm run build/preview","GitHub Pages 배포"]},{h:"발표와 회고",items:["시연 시나리오 준비","발표 자료 구성","성과·한계 정리","팀 회고와 개선점","3분 시연 시나리오 대본(어떤 순서로 무엇을 눌러 보일지)","AI 기능이 실제로 도는 장면을 반드시 시연에 포함","평가 기준(완성도·AI 적절성·설계 충실도·발표)에 맞춰 발표 구성"]}],labs:[{title:"Lab 1. 빌드하고 미리보기로 확인하기",steps:["vite.config.js 를 열어 base 값을 '/저장소이름/' 으로 적는다.","'npm run build' 를 실행해 dist 폴더가 생기는지 확인한다.","'npm run preview' 를 실행하고 안내된 주소로 접속한다.","미리보기 화면에서 흰 화면 없이 모든 기능이 동작하는지 클릭해 확인한다."]},{title:"Lab 2. GitHub Pages로 인터넷에 배포하기",steps:["'npm install -D gh-pages' 로 배포 도구를 설치한다.",'package.json 의 scripts 에 "deploy": "gh-pages -d dist" 를 추가한다.',"'npm run build' 후 'npm run deploy' 를 실행한다.","잠시 뒤 'https://<아이디>.github.io/저장소이름/' 에 접속해 동작을 확인한다."]},{title:"Lab 3. 통합 테스트 시나리오 돌리고 버그 목록 만들기 (1·3교시 실습)",steps:["팀원들의 작업을 하나의 main 브랜치로 합치고(merge), 충돌이 나면 함께 해결한 뒤 npm run dev로 앱을 켠다.","'실사용자 시나리오' 순서(메인 접속→목록 보기→상세 이동→새 글 추가→AI 기능 실행→삭제)를 한 명이 천천히 클릭한다.","각 단계마다 기대한 대로 동작하는지, 콘솔에 빨간 에러가 없는지 확인한다.","어긋나는 지점을 '버그 목록' 표에 [증상 / 재현 순서 / 심각도(높음·낮음)] 형식으로 적는다.","심각도 높음(앱이 멈춤·핵심 기능이 안 됨)부터 고칠 순서를 매긴다."]},{title:"Lab 4. 버그 재현→수정→재검증 사이클 돌리기 (2교시 실습)",steps:["버그 목록에서 심각도 높은 항목 하나를 고른다.","재현 순서대로 눌러 버그를 눈앞에서 다시 만들어낸다(재현이 안 되면 조건을 더 좁힌다).","콘솔의 에러 메시지와 줄 번호를 읽고, 의심 구간에 console.log를 찍어 값이 어디서 이상해지는지 원인을 좁힌다.","원인 한 곳만 고쳐 저장한 뒤, 같은 순서로 다시 눌러 해결됐는지 확인한다.","주변 기능(목록·추가·AI 요약)도 다시 눌러 새 버그가 생기지 않았는지 재검증하고, 버그 목록에 해결 표시를 한 뒤 커밋한다."]}],homework:["배포한 사이트의 URL을 README 맨 위에 적고, 주요 화면 스크린샷 3장을 첨부하기.","회고 문서를 작성해 '잘된 점·아쉬운 점·다음에 개선할 점'을 각각 2가지 이상 적기."]},theory:{theory:[{h:"따로 만든 코드를 합칠 때가 진짜 시작이다",body:`각자 방에서 가구를 만들면 멋지지만, 한 집에 모아놓으면 문이 안 맞거나 색이 따로 노는 경우가 많다.
코드도 똑같아서 합치는(통합) 순간 처음 보는 충돌과 버그가 쏟아진다.
그래서 통합 테스트로 목록부터 글 추가·삭제까지 실제 사용자처럼 끝까지 눌러봐야 한다.
이때 발견되는 버그는 부끄러운 게 아니라 배포 전에 잡아서 다행인 것이다.

버그를 발견하면 바로 고치지 말고 먼저 목록으로 적은 뒤 우선순위를 정해 고치는 게 효율적이다.
급한 불(앱이 멈추는 오류)부터 끄고, 사소한 것(글자 색)은 나중에 고친다.`},{h:"배포는 '내 컴퓨터에서만 되는 앱'을 세상에 내보내는 일",body:`개발 중에는 npm run dev 로 내 컴퓨터에서만 앱이 돌아간다.
이걸 친구나 심사위원이 보려면 인터넷 주소가 필요하고, 그 과정이 배포다.
먼저 npm run build 로 코드를 작고 빠른 dist 파일로 압축한 뒤, 그 파일을 GitHub Pages 같은 곳에 올린다.
그런데 GitHub Pages는 주소에 저장소 이름이 붙기 때문에, vite.config.js의 base 값을 맞춰주지 않으면 화면이 하얗게 나오는 흔한 실수가 생긴다.

배포가 끝나면 반드시 그 인터넷 주소로 직접 들어가 모든 기능을 다시 눌러봐야 한다.
'내 컴퓨터에서는 됐는데'는 배포에서 가장 많이 듣는 변명이기 때문이다.`},{h:"버그는 '재현→좁히기→고치기→재검증' 순서로 잡는다",body:`코드를 통합하면 버그가 쏟아진다. 당황하지 않는 비결은 순서를 지키는 것이다.
① 재현: 어떤 순서로 눌렀을 때 문제가 나는지 똑같이 다시 만들어낸다. 재현되지 않는 버그는 고칠 수 없다.
② 좁히기: 콘솔의 빨간 에러 메시지와 줄 번호를 끝까지 읽고, console.log를 데이터 흐름 중간중간 찍어 어디서 값이 이상해지는지 범위를 좁힌다.
③ 고치기: 원인이 확인된 '한 곳'만 고친다. 여러 군데를 동시에 고치면 무엇이 효과였는지 알 수 없다.
④ 재검증: 고친 뒤 그 기능만이 아니라 주변 기능도 다시 눌러 새 버그가 생기지 않았는지 확인한다.
[핵심 포인트] ① 에러 메시지는 겁내지 말고 끝까지 읽는다 — 대부분 답이 그 문장 안에 있다. ② 'undefined is not ...' 류는 십중팔구 데이터가 아직 안 온 것(로딩 타이밍이나 경로·키 이름 문제)이다. ③ 한 번에 하나씩 고치고 커밋하면 잘못돼도 되돌리기 쉽다.
[왜 중요한가] 무작정 코드를 바꾸며 헤매면 멀쩡하던 것까지 깨진다. 순서를 지키는 것이 결국 시간을 아낀다. 강사는 실제 버그 하나를 화면에서 이 4단계로 함께 잡아 보이며 시범을 든다.`},{h:"발표는 '되는 것'을 3분에 보여주는 일",body:`3분 발표에서 심사위원이 보고 싶은 것은 화려한 슬라이드가 아니라 '진짜 도는 화면'이다. 구성은 단순하게 짠다 — ① 처음 30초: 무슨 문제를 푸는 서비스인지 한 문장으로. ② 가운데 2분: 실제 배포된 주소에서 라이브 시연(목록→글 추가→AI 기능이 도는 장면을 반드시 포함). ③ 마지막 30초: 아쉬운 점과 다음 계획.
[핵심 포인트] ① 시연은 대본을 미리 짠다 — '어떤 순서로 무엇을 클릭할지'를 손에 익혀 둔다. ② 라이브 데모가 불안하면 짧은 화면 녹화(GIF)를 백업으로 준비해 네트워크가 끊겨도 시연이 이어지게 한다. ③ AI 기능이 실제로 도는 순간이 이 과목의 핵심이니 반드시 눈으로 보여준다.
[왜 중요한가] '만들었다'는 말보다 '이렇게 돕니다'를 보여주는 30초가 훨씬 설득력 있다. 강사는 발표 전 각 팀에 '시연 대본 3줄'과 '백업 GIF'를 준비했는지 점검한다.`},{h:"KPT 회고 — 다음 프로젝트에게 주는 선물",body:`마지막 시간은 코드가 아니라 '배움'을 정리한다. 가장 쉬운 회고 틀이 KPT다 — Keep(계속할 잘된 것), Problem(아쉬웠던 것·막혔던 것), Try(다음엔 이렇게 해보자). 각자 포스트잇에 적어 붙이고 팀이 함께 소리 내어 읽는다.
[핵심 포인트] ① 사람이 아니라 '방식'을 이야기한다 — 'A가 못했다'가 아니라 '분담이 늦어 통합이 마지막에 몰렸다'처럼 상황을 짚는다. ② Try는 구체적이고 실천 가능하게 적는다 — '앞으로 잘하자'가 아니라 '다음엔 매일 저녁 커밋·오전에 통합'처럼. ③ 회고 결과를 문서로 남겨 README에 붙인다.
[왜 중요한가] 미니 프로젝트의 진짜 산출물은 앱이 아니라 '다음에 더 잘하는 법'이다. 회고 없이 끝내면 같은 실수를 다음 프로젝트에서 그대로 반복한다. 강사는 KPT 3칸을 칠판에 그리고 팀별로 최소 각 2개씩 채우게 한 뒤 과정을 마무리한다.`}]},realCodes:[{title:"환경변수 분리 + 배포 경로 설정 + 빌드 스크립트(엔드투엔드)",lang:"bash",code:`# 1) .env 파일 만들기 : 바뀌는 값(API 주소)을 코드에서 분리한다
# VITE_ 로 시작해야 Vue 코드 안에서 읽을 수 있다
echo 'VITE_API_URL=https://api.example.com' > .env

# 2) vite.config.js 의 base 를 저장소 이름으로 맞춘다(아래는 예시 내용)
#    base 가 틀리면 배포 후 화면이 하얗게(흰 화면) 나온다
#    export default defineConfig({ base: '/my-web/', plugins: [vue()] })

# 3) 배포용 도구 설치(정적 결과물을 gh-pages 브랜치로 올려준다)
npm install -D gh-pages

# 4) 프로덕션 빌드 : 개발 코드를 dist 폴더로 압축·변환한다
npm run build

# 5) 빌드 결과를 배포 전에 미리 확인한다(실제 배포와 가장 비슷한 환경)
npm run preview

# 6) dist 폴더를 GitHub Pages(gh-pages 브랜치)로 올린다
npx gh-pages -d dist

# 결과: 잠시 후 https://<아이디>.github.io/my-web/ 주소로 접속 가능
# 접속해서 글 추가·삭제까지 모두 동작하면 배포 성공이다`,note:`환경변수 분리·base 설정·빌드·배포까지 한 흐름으로 보여준다.
base 값을 저장소 이름과 똑같이 맞추는 것이 흰 화면 오류를 막는 핵심이다.`}],periods:["1교시 어제까지 만든 기능 통합 점검과 버그 목록 만들기","2교시 발견한 버그 함께 고치기(실습)","3교시 전체 흐름 통합 테스트하기(실습)","4교시 환경변수·API 주소 정리와 빌드 준비(실습)","5교시 프로덕션 빌드와 정적 배포(GitHub Pages)(실습)","6교시 배포 주소 확인·점검과 발표 자료 만들기(실습)","7교시 팀별 시연 발표","8교시 회고(잘된 점·아쉬운 점·개선점)와 과정 마무리"]}};export{e as default};
