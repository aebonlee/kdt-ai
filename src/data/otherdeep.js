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
