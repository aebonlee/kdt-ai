const e={"vue-1":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 Vue 소개와 왜 프레임워크가 필요한가 (개념)"},{time:"10:00–10:50",topic:"2교시 Vite로 첫 Vue 프로젝트 만들기 (실습)"},{time:"11:00–11:50",topic:"3교시 SFC 구조와 첫 컴포넌트 화면에 띄우기 (실습)"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 반응형 상태 ref와 reactive 이해 (실습)"},{time:"14:00–14:50",topic:"5교시 템플릿 문법과 디렉티브 v-if·v-for·v-bind (실습)"},{time:"15:00–15:50",topic:"6교시 이벤트 v-on과 폼 바인딩 v-model (실습)"},{time:"16:00–16:50",topic:"7교시 computed와 watch로 파생 상태 다루기 (실습)"},{time:"17:00–17:50",topic:"8교시 미니 실습: 반응형 카운터·할 일 목록 UI (실습)"}],practice:{title:"반응형 할 일(To-Do) 목록 UI 만들기",steps:["터미널에서 'npm create vite@latest my-vue -- --template vue' 명령으로 Vue 프로젝트 뼈대를 생성한다","'cd my-vue' 후 'npm install' 로 의존성을 내려받고 'npm run dev' 로 개발 서버를 켜서 브라우저 http://localhost:5173 화면을 확인한다","src/App.vue 파일을 열고 기존 내용을 지운 뒤 <script setup>·<template>·<style> 세 칸으로 된 빈 SFC 골격을 만든다",`<script setup> 안에서 'import { ref } from "vue"' 를 적고, 할 일 배열 todos = ref([]) 와 입력값 text = ref('') 를 선언한다`,"addTodo 함수를 만들어 입력값이 비어있지 않으면 todos 배열에 {id, title, done:false} 객체를 push 하고 text 를 다시 빈 문자열로 비운다",'<template> 에 <input v-model="text"> 와 <button @click="addTodo"> 를 배치하고, <ul> 안에서 v-for 로 todos 를 돌며 <li> 로 출력한다','각 <li> 의 체크박스에 v-model="todo.done" 을 연결하고, 완료된 항목은 :class 로 취소선 스타일이 붙도록 한다',"computed 로 '남은 할 일 개수' remaining 을 만들어 화면 상단에 {{ remaining }} 로 표시한다","브라우저에서 할 일을 입력→추가→체크해 보며 화면이 즉시 바뀌는지(반응형) 눈으로 확인한다","완성 화면을 캡처하고 App.vue 전체 코드를 저장한다"],deliverable:"할 일을 추가·완료 체크·남은 개수 표시가 동작하는 App.vue 파일과 실행 화면 캡처"}},examples:[{title:"ref 로 만든 반응형 카운터",lang:"vue",code:`<script setup>
// 반응형 값을 만드는 ref 함수를 가져온다
import { ref } from 'vue'
// 숫자 0 을 반응형으로 감싼 카운터 상태를 만든다
const count = ref(0)
// 버튼을 누르면 카운터를 1 증가시키는 함수(자바스크립트에서는 .value 필요)
function plus() { count.value++ }
<\/script>

<template>
  <!-- 현재 카운트를 화면에 출력한다(템플릿에서는 .value 없이 바로 사용) -->
  <p>현재 값: {{ count }}</p>
  <!-- 버튼 클릭 시 plus 실행, 누를 때마다 위 숫자가 1씩 증가 -->
  <button @click="plus">+1</button>
</template>`,note:"버튼을 누르면 count.value 만 바꿔도 화면 숫자가 자동으로 올라간다."},{title:"v-if 와 v-for 디렉티브",lang:"vue",code:`<script setup>
// 반응형 배열을 만들기 위해 ref 를 가져온다
import { ref } from 'vue'
// 과일 이름 3개를 담은 반응형 배열
const fruits = ref(['사과', '바나나', '포도'])
<\/script>

<template>
  <!-- 배열이 비어 있지 않을 때만(v-if 조건 참) 목록을 보여준다 -->
  <ul v-if="fruits.length > 0">
    <!-- v-for 로 과일을 하나씩 꺼내 li 로 출력, key 로 인덱스 i 사용 -->
    <li v-for="(f, i) in fruits" :key="i">{{ i + 1 }}. {{ f }}</li>
  </ul>
  <!-- 위 조건이 거짓이면(배열이 비면) 이 문구를 대신 보여준다 -->
  <p v-else>과일이 없습니다.</p>
</template>`,note:"v-for 는 반복 출력을, v-if/v-else 는 조건에 따른 화면 분기를 담당한다."},{title:"이벤트 v-on과 v-model로 만드는 실시간 입력 거울",lang:"vue",code:`<script setup>
// 반응형 값을 만드는 ref 함수를 가져온다
import { ref } from 'vue'
// 입력창과 연결할 이름 상태(처음엔 빈 문자열)
const name = ref('')
// 인사 횟수를 세는 상태(버튼 클릭마다 1씩 증가)
const count = ref(0)
// 버튼을 눌렀을 때 실행: 인사 횟수를 1 올린다
function greet() {
  count.value++ // 자바스크립트에서는 .value 로 값에 접근
}
<\/script>

<template>
  <!-- v-model 로 입력창과 name 을 양방향 연결(타이핑하면 아래 문구가 즉시 바뀜) -->
  <input v-model="name" placeholder="이름을 입력하세요" />
  <!-- name 이 비어 있지 않을 때만 인사 문구를 보여준다 -->
  <p v-if="name">안녕하세요, {{ name }}님!</p>
  <!-- 비어 있으면 안내 문구를 대신 보여준다 -->
  <p v-else>이름을 입력해 주세요.</p>
  <!-- @click 으로 버튼 클릭에 greet 함수를 연결 -->
  <button @click="greet">인사하기</button>
  <!-- 클릭할 때마다 늘어나는 인사 횟수를 표시 -->
  <p>지금까지 {{ count }}번 인사했어요.</p>
</template>`,note:"v-model 은 입력→데이터를 자동으로 채우는 양방향 연결이고, @click(v-on)은 사용자 사건에 함수를 거는 단방향 연결이다. 타이핑이 곧바로 화면에 비치는 '거울 효과'와 클릭이 상태를 바꾸는 흐름을 한 화면에서 함께 체감하게 하는 데모다."},{title:"watch 로 부수효과 처리 + 디바운스",lang:"javascript",code:`import { ref, watch } from 'vue'

const keyword = ref('')
let timer
// keyword가 바뀔 때마다 실행되지만, 300ms 디바운스로 API 호출을 줄인다
watch(keyword, (val) => {
  clearTimeout(timer)              // 이전 예약 취소
  timer = setTimeout(() => {
    fetchSuggestions(val)          // 실제 네트워크 호출
  }, 300)                          // 입력이 멈춘 뒤에만 호출
})`,note:"computed(파생 값) vs watch(부수효과)의 차이를 이해한다. 검색 입력은 디바운스로 호출 폭주를 막는다."},{title:"v-bind 클래스 바인딩 — 상태에 따라 스타일 켜고 끄기",lang:"vue",code:`<script setup>
// 반응형 값을 만드는 ref 를 가져온다
import { ref } from 'vue'
// 활성화 여부(참이면 active 클래스가 붙음)
const isActive = ref(true)
// 에러 여부(참이면 빨간 경고 스타일)
const hasError = ref(false)
<\/script>

<template>
  <!-- 객체 구문: 값이 true 인 클래스만 실제로 적용된다 -->
  <p :class="{ active: isActive, danger: hasError }">상태에 따라 색이 바뀝니다</p>
  <!-- 배열 구문: 기본 클래스 + 삼항으로 상황별 클래스를 함께 건다 -->
  <p :class="['box', isActive ? 'on' : 'off']">항상 box, 그리고 on/off 토글</p>
  <!-- 버튼으로 상태를 뒤집어 실시간 변화를 확인 -->
  <button @click="isActive = !isActive">active 토글</button>
  <button @click="hasError = !hasError">error 토글</button>
</template>

<style scoped>
.active { color: blue; font-weight: bold; } /* active 붙으면 파란색 */
.danger { background: #ffd6d6; }            /* danger 붙으면 빨간 배경 */
.box { padding: 8px; }
</style>`,note:":class 객체 구문은 조건이 true 인 클래스만 붙이고, 배열 구문은 기본 클래스와 조건부 클래스를 함께 건다. CSS 를 직접 토글하지 않고 데이터로 스타일을 제어하는 것이 핵심이다."},{title:"폼 요소마다 다른 v-model — 체크박스·라디오·셀렉트",lang:"vue",code:`<script setup>
import { ref } from 'vue'                 // 반응형 변수 도구
const agree = ref(false)                  // 단일 체크박스 → true/false
const fruits = ref([])                    // 여러 체크박스 → 고른 value 가 배열로 쌓임
const gender = ref('')                    // 라디오 → 고른 값 하나
const city = ref('seoul')                 // 셀렉트 → 선택한 option 값
<\/script>

<template>
  <!-- 단일 체크박스: 담기는 값은 true/false -->
  <label><input type="checkbox" v-model="agree" /> 약관 동의</label>

  <!-- 같은 배열에 묶인 체크박스: 체크한 value 들이 배열에 모인다 -->
  <label><input type="checkbox" value="사과" v-model="fruits" /> 사과</label>
  <label><input type="checkbox" value="바나나" v-model="fruits" /> 바나나</label>

  <!-- 라디오: 같은 v-model 을 공유하면 하나만 선택된다 -->
  <label><input type="radio" value="남" v-model="gender" /> 남</label>
  <label><input type="radio" value="여" v-model="gender" /> 여</label>

  <!-- 셀렉트: 고른 option 의 value 가 city 에 들어간다 -->
  <select v-model="city">
    <option value="seoul">서울</option>
    <option value="busan">부산</option>
  </select>

  <!-- 선택 결과를 실시간 확인 -->
  <p>동의:{{ agree }} / 과일:{{ fruits }} / 성별:{{ gender }} / 도시:{{ city }}</p>
</template>`,note:"같은 v-model 이라도 요소에 따라 담기는 값이 다르다 — 단일 체크박스는 불리언, 여러 체크박스는 배열, 라디오·셀렉트는 고른 값 하나다."},{title:"이벤트 수식어 — .prevent 로 기본동작 막고 .stop 으로 전파 막기",lang:"vue",code:`<script setup>
import { ref } from 'vue'
const log = ref('아직 클릭 전')                      // 무슨 일이 일어났는지 기록
function goLink() { log.value = '페이지 이동을 막고 함수만 실행됨' }
function outer() { log.value = '바깥 상자 클릭' }
function inner() { log.value = '안쪽 버튼만 클릭(바깥으로 안 번짐)' }
<\/script>

<template>
  <!-- .prevent : a 태그의 기본 페이지 이동을 취소하고 함수만 실행 -->
  <a href="https://naver.com" @click.prevent="goLink">이동 대신 함수 실행</a>

  <!-- 바깥 div 클릭 시 outer 실행 -->
  <div @click="outer" style="padding:20px; background:#eee">
    바깥 영역
    <!-- .stop : 클릭이 바깥 div 까지 번지는 것(버블링)을 차단 -->
    <button @click.stop="inner">나만 반응하는 버튼</button>
  </div>

  <p>{{ log }}</p>
</template>`,note:".prevent 는 링크·폼 제출 같은 브라우저 기본동작을 막고, .stop 은 안쪽 클릭이 바깥 요소까지 전파되는 것을 막는다. 수식어를 붙이면 함수 안에서 preventDefault·stopPropagation 을 직접 부를 필요가 없다."},{title:"reactive() 로 객체 상태 묶어 관리하기 — 재할당 금지 주의",lang:"vue",code:`<script setup>
// 객체·배열을 통째로 반응형으로 만드는 reactive 를 가져온다
import { reactive } from 'vue'
// 이름과 나이를 한 덩어리로 묶은 반응형 객체(스크립트에서 .value 불필요)
const user = reactive({ name: '이순신', age: 30 })
// 버튼 클릭 시 나이만 1 올리는 함수
function birthday() {
  user.age++   // 알맹이 속성만 바꾸면 화면이 자동으로 갱신된다
}
// (주의) user = { name: '홍길동', age: 0 } 처럼 통째로 재할당하면
// 반응형 연결이 끊어져 화면이 더 이상 갱신되지 않는다!
<\/script>

<template>
  <!-- reactive 객체는 템플릿에서도 점 표기로 바로 읽는다 -->
  <p>이름: {{ user.name }} / 나이: {{ user.age }}세</p>
  <!-- 클릭할 때마다 나이가 한 살씩 늘어난다 -->
  <button @click="birthday">나이 한 살 추가</button>
</template>`,note:"ref 는 어떤 값이든 감싸고 .value 로 접근하지만, reactive 는 객체 전용이고 .value 없이 쓴다. 대신 새 객체로 통째 재할당하면 반응성이 끊기는 약점이 있어, 현업에서는 객체도 그냥 ref 로 통일하는 추세가 강하다."},{title:"v-if vs v-show — 없애서 숨기기 vs 가려서 숨기기",lang:"vue",code:`<script setup>
import { ref } from 'vue'   // 반응형 값 도구
const open = ref(true)      // 열림/닫힘 상태(두 상자가 공유)
<\/script>

<template>
  <!-- 클릭할 때마다 참/거짓이 뒤집힌다 -->
  <button @click="open = !open">토글 (현재: {{ open }})</button>

  <!-- v-if: 거짓이면 태그 자체를 DOM 에서 없애 버린다(개발자도구에서 사라짐) -->
  <p v-if="open">v-if 상자 — 조건이 거짓이면 아예 존재하지 않음</p>

  <!-- v-show: 태그는 그대로 두고 CSS display:none 으로 눈에만 숨긴다 -->
  <p v-show="open">v-show 상자 — 숨겨져도 DOM 에는 남아 있음</p>
</template>`,note:"v-if 는 처음에 거짓이면 아예 그리지 않아 초기 비용이 낮지만, 바뀔 때마다 태그를 부수고 다시 지어 전환 비용이 크다. 그래서 모달·탭처럼 전환이 잦은 곳은 v-show, 로그인 후 화면처럼 전환이 드문 곳은 v-if 를 쓴다. v-show 는 v-else 조합이 안 된다는 점도 기억하자."},{title:"toRefs — reactive 객체를 구조분해해도 반응성 지키기",lang:"vue",code:`<script setup>
// reactive 객체와, 속성을 반응형 그대로 꺼내는 toRefs 를 가져온다
import { reactive, toRefs } from 'vue'
// 도시와 기온을 묶은 반응형 객체
const state = reactive({ city: '수원', temp: 24 })
// (X) const { city, temp } = state → 일반 값 복사라 반응성이 끊긴다
// (O) toRefs 로 감싸면 모든 속성이 반응형 ref 로 추출된다
const { city, temp } = toRefs(state)
// 꺼낸 뒤에는 ref 이므로 스크립트에서 .value 로 다룬다
function warmer() { temp.value++ }   // 원본 state.temp 도 함께 바뀐다
<\/script>

<template>
  <!-- 추출한 ref 를 바꿔도 원본 객체와 같은 값이 유지된다 -->
  <p>{{ city }} 기온: {{ temp }}도 (원본 확인: {{ state.temp }}도)</p>
  <button @click="warmer">기온 +1</button>
</template>`,note:"reactive 객체를 그냥 구조분해하면 반응형 연결이 끊어지는 것이 대표적인 초보 실수다. toRefs 는 모든 속성을, toRef 는 속성 1개만 반응형 ref 로 추출해 이 문제를 해결한다."},{title:"watch 로 reactive 객체 감시 — 통째 감시 vs 특정 속성 조준",lang:"vue",code:`<script setup>
import { reactive, ref, watch } from 'vue'
// 상품 정보를 묶은 reactive 객체
const state = reactive({ name: '노트북', price: 1000 })
const log = ref('아직 변동 없음')   // 감시 결과를 보여줄 문구

// 방법1) 객체를 통째로 감시: 내부 어떤 속성이 바뀌어도 실행되지만
// 새값과 옛값이 같은 객체를 가리켜 '진짜 이전 값'을 알 수 없다
watch(state, () => { console.log('내부 어딘가가 바뀜(이전 값 추적 불가)') })

// 방법2) () => state.price 처럼 화살표 함수로 특정 속성만 조준하면
// 이전 값이 제대로 보존되어 변화 폭까지 계산할 수 있다
watch(() => state.price, (newP, oldP) => {
  log.value = oldP + '원 → ' + newP + '원 (' + (newP - oldP) + '원 변동)'
})
<\/script>

<template>
  <p>{{ state.name }}: {{ state.price }}원</p>
  <!-- 버튼을 누르면 두 감시자가 모두 반응한다 -->
  <button @click="state.price += 500">가격 +500</button>
  <p>{{ log }}</p>
</template>`,note:"reactive 객체는 변수명을 그대로 넣으면 자동으로 깊은 감시가 되지만 이전 값을 못 쓴다. 객체 안의 특정 속성 변화를 낚아채고 싶으면 반드시 화살표 함수(getter) 형태로 조준해야 옛값·새값 비교가 가능하다."}],concepts:[{term:"Vue",desc:"화면(UI)을 손쉽게 만들도록 도와주는 자바스크립트 프레임워크로, 데이터가 바뀌면 화면을 자동으로 다시 그려준다."},{term:"Vite",desc:"Vue 프로젝트를 빠르게 시작하고 개발 서버를 띄워주는 빌드 도구로, 저장하면 화면이 즉시 갱신된다."},{term:"SFC(단일 파일 컴포넌트)",desc:"확장자가 .vue 인 파일 하나에 화면(template)·로직(script)·꾸밈(style)을 함께 담는 Vue의 기본 단위다."},{term:"반응형(reactivity)",desc:"데이터(상태)가 바뀌면 그 데이터를 쓰는 화면이 저절로 따라 바뀌는 Vue의 핵심 동작이다."},{term:"ref",desc:"숫자·문자열 같은 값 하나를 반응형으로 감싸는 함수로, 자바스크립트에서 값을 쓸 때는 .value 를 붙인다."},{term:"디렉티브",desc:"v- 로 시작하는 HTML 특수 속성으로, v-if·v-for·v-bind 처럼 태그에 동작을 붙여준다."},{term:"computed(계산된 속성)",desc:"다른 반응형 값에서 자동 계산되는 값으로, 원본이 바뀔 때만 다시 계산되어 효율적이다."},{term:"watch(감시자)",desc:"특정 반응형 값이 바뀌는 순간을 지켜보다가, 바뀔 때마다 실행할 동작(부수효과)을 걸어두는 함수다. computed가 새 값을 계산해 돌려주는 것이라면, watch는 값이 바뀌면 API를 부르거나 로그를 남기는 등 결과값이 아닌 행동이 필요할 때 쓴다."},{term:"세임네임 단축(same-name shorthand)",desc:`Vue 3.4부터 도입된 문법으로, 연결할 변수명과 HTML 속성명이 일치하면 <img :src>처럼 ="src" 부분을 생략할 수 있고 Vue가 같은 이름의 변수를 자동 매핑한다.
변수명을 id·src·href처럼 HTML 표준 속성명과 맞춰 두면 코딩이 빨라진다. (교재 p.61)`},{term:"이벤트 수식어(event modifier)",desc:`이벤트 리스너의 기본 동작을 제어하는 특수 접미어다.
.prevent(폼 새로고침 방지)·.stop(버블링 차단)·.once(1회만)·.self 외에 .enter 같은 키보드 수식어, .ctrl·.exact 시스템 수식어, .right 마우스 수식어까지 있다. (교재 pp.79-82)`},{term:"스캐폴딩(scaffolding)",desc:`npm create vue@latest 실행 시 폴더 구조·빌드 설정·필수 라이브러리 연동을 자동 생성해 주는 초기 뼈대 구축이다.
생성 과정에서 Router·Pinia·ESLint·Prettier 탑재 여부를 질문으로 선택한다. (교재 p.25)`}],detail:{topics:[{h:"Vue 프로젝트 시작",items:["npm create vite 로 프로젝트 생성","npm run dev 로 개발 서버 실행","src/App.vue 진입점 이해","main.js 가 앱을 화면에 붙이는 과정"]},{h:"반응형 상태",items:["ref 로 단일 값 감싸기","reactive 로 객체 감싸기","자바스크립트에선 .value, 템플릿에선 그대로","상태가 바뀌면 화면 자동 갱신"]},{h:"템플릿 문법",items:["{{ }} 보간으로 값 출력","v-bind(:)로 속성 연결","v-on(@)으로 이벤트 연결","v-model 로 폼 양방향 바인딩"]},{h:"개발환경과 Vue Devtools",items:["Node.js/WSL 위에서 Vite 개발 서버 구동","브라우저 Vue Devtools 확장 설치","Devtools의 Components 탭에서 각 컴포넌트의 ref/props 실시간 값 관찰","상태를 바꿨을 때 트리에서 값이 갱신되는지 눈으로 확인"]}],labs:[{title:"Lab 1. 첫 Vue 프로젝트 띄우기",steps:["터미널을 열고 'npm create vite@latest hello -- --template vue' 를 입력한다","'cd hello && npm install && npm run dev' 를 차례로 실행한다","브라우저에서 http://localhost:5173 에 접속해 기본 화면을 확인한다","src/App.vue 의 <template> 안 글자를 바꿔 저장하고 화면이 즉시 바뀌는지 본다"]},{title:"Lab 2. 반응형 이름 인사 만들기",steps:[`App.vue 의 <script setup> 에 'import { ref } from "vue"' 를 적는다`,"const name = ref('') 로 이름 상태를 만든다",'<template> 에 <input v-model="name"> 를 두고 그 아래 <p>안녕하세요, {{ name }}님</p> 을 적는다',"입력창에 글자를 칠 때마다 인사 문구가 실시간으로 바뀌는지 확인한다"]},{title:"Lab 3. Vue Devtools로 반응형 상태 들여다보기",steps:["브라우저에 Vue Devtools 확장을 설치한다","개발 서버를 띄우고 Devtools의 Components 탭을 연다","입력창에 글자를 칠 때마다 todos/text 상태가 트리에서 바뀌는 것을 관찰한다"]}],homework:["오늘 만든 할 일 목록에 '완료된 항목 모두 삭제' 버튼을 추가하고, 클릭 시 done 이 true 인 항목만 배열에서 제거되도록 구현해 캡처를 제출한다","computed 를 하나 더 만들어 '전체 개수 / 완료 개수' 를 화면에 함께 표시한다","교재 2장 과제(p.91) — 날씨 제어판 UI·카드 모형: v-for 카드(:key 필수) + v-if 온도 라벨 + :value/@input 검색 + @click.stop 상세보기"]},theory:{theory:[{h:"computed vs watch, 언제 무엇을 쓰나",body:`computed는 '다른 값들로부터 자동으로 만들어지는 새 값'에 씁니다.
예를 들어 장바구니 합계처럼, 원본이 바뀌면 알아서 다시 계산되어 화면에 그대로 보여줄 값에 적합합니다.
watch는 '값이 바뀌었을 때 무언가를 실행'해야 할 때 씁니다. 검색어가 바뀌면 서버에 재검색을 요청하거나, 입력을 로컬스토리지에 저장하는 일이 그렇습니다.

판단 기준은 한 줄로 정리됩니다 — 새 값이 필요하면 computed, 바뀔 때 할 일이 필요하면 watch.`},{h:"왜 Vue 같은 프레임워크를 쓰나요?",body:`옛날 방식에서는 화면의 글자 하나를 바꾸려면 document.getElementById 로 요소를 찾아 직접 글자를 갈아끼워야 했습니다.
데이터가 많아지면 '어디를 바꿔야 하는지' 챙기는 일이 금세 복잡해집니다.

Vue는 이 일을 대신 해 줍니다.
우리는 그냥 '데이터'만 바꾸면, Vue가 그 데이터를 쓰는 화면 부분을 알아서 다시 그려 줍니다.
마치 엑셀에서 셀 값을 바꾸면 그 셀을 참조하는 합계가 자동으로 바뀌는 것과 같습니다.
그래서 개발자는 '화면 조작'이 아니라 '데이터와 규칙'에만 집중할 수 있습니다.`},{h:"반응형 상태: ref 와 reactive",body:`Vue에서 화면과 연결되는 데이터를 '상태(state)'라고 부릅니다.
상태를 반응형으로 만들려면 값을 ref 나 reactive 로 감싸야 합니다.

ref 는 숫자·문자열·불리언 같은 '하나짜리 값'을 감쌀 때 씁니다.
감싸고 나면 자바스크립트 코드에서는 .value 로 접근하지만, 템플릿(화면) 안에서는 .value 없이 바로 씁니다.
reactive 는 여러 값을 담은 '객체'를 통째로 감쌀 때 쓰며 .value 가 필요 없습니다.
초보자는 우선 'ref 만 쓴다'고 외워도 충분합니다.
교재 결론(p.97): reactive는 객체를 통째로 교체하거나 구조분해하면 반응성이 끊기는 약점이 있어, 현업에서는 객체·배열도 안전하게 ref()로 통일해 쓰는 추세가 강하다.`},{h:"2교시 — Vite로 시작하는 이유와 개발환경 한 장 정리",body:`강의 흐름: 먼저 '왜 손으로 index.html·script 태그를 만들지 않고 Vite를 쓰나'를 묻습니다. 옛날에는 자바스크립트 파일을 여러 개 만들고 순서대로 script 태그로 끼워 넣어야 했고, 라이브러리 하나 추가할 때마다 CDN 주소를 붙였습니다. Vite는 이 모든 잡일을 대신 해 주는 '개발 도구 세트'입니다.

핵심 포인트 세 가지로 설명합니다. 첫째, 스캐폴딩 — 'npm create vite'를 한 번 치면 표준 폴더 구조(src, public, index.html, vite.config.js)가 자동으로 만들어져 어느 회사 프로젝트를 열어도 구조가 같습니다. 둘째, 개발 서버(npm run dev) — 코드를 저장하는 순간 브라우저가 새로고침 없이 바뀐 부분만 갈아끼웁니다. 이것을 HMR(Hot Module Replacement)이라 부르고, 입력하던 값이 그대로 남아 있어 개발이 빨라집니다. 셋째, 빌드(npm run build) — 배포할 때는 이 도구가 코드를 압축해 dist 폴더를 만들어 줍니다.

왜 중요한가: 프론트엔드 개발의 8할은 '저장→화면 확인'의 반복입니다. HMR이 이 순환을 1초 이내로 줄여 주므로, 학습자가 직접 HMR을 체감해 보는 것이 이 교시의 목표입니다. WSL/Node.js 위에서 Vite가 도는 구조(Node.js=자바스크립트 실행 엔진, Vite=그 위의 개발 도구)를 그림 한 장으로 정리해 주면 됩니다.`},{h:"3교시 — SFC(단일 파일 컴포넌트) 한 파일에 화면·로직·꾸밈",body:`강의 흐름: .vue 파일 하나를 열어 보여 주면서 시작합니다. 이 파일은 세 칸으로 나뉩니다. template(화면에 보이는 HTML), script setup(동작을 정하는 자바스크립트), style(꾸밈 CSS). 예전에는 화면은 .html, 로직은 .js, 꾸밈은 .css로 파일이 흩어져 있어서 버튼 하나를 고치려면 세 파일을 오가야 했습니다. SFC는 '한 기능=한 파일'로 묶어 관련된 것을 한눈에 봅니다.

핵심 포인트: template 안에는 반드시 화면 요소를 적고, {{ }} 이중 중괄호로 script의 값을 꽂아 넣습니다. script setup은 Vue 3의 최신 표준 문법으로, 별도 return 없이 선언한 변수·함수가 template에서 바로 쓰입니다. style에 scoped를 붙이면 그 꾸밈이 이 컴포넌트 안에만 적용됩니다. main.js가 App.vue를 읽어 index.html의 #app 자리에 붙이는 것이 앱이 뜨는 원리라는 점도 짚어 줍니다.

왜 중요한가: 앞으로 만드는 모든 화면이 결국 이 .vue 파일들의 조합입니다. '한 파일 안 세 칸의 역할'을 손에 익히면 어떤 컴포넌트를 열어도 어디를 봐야 하는지 바로 압니다. 기본으로 생성된 App.vue를 지우고 빈 SFC에 h1 하나를 직접 적어 화면에 띄우는 것을 함께 해 봅니다.`},{h:"5교시 — 템플릿 디렉티브 v-if·v-for·v-bind로 화면을 데이터에 연결",body:`강의 흐름: 앞에서 만든 반응형 상태를 '화면에 어떻게 반영하나'가 이 교시의 주제입니다. 디렉티브는 v-로 시작하는 특수 속성으로, HTML 태그에 '동작'을 붙이는 리모컨이라고 설명합니다. 세 가지만 확실히 잡습니다.

핵심 포인트: v-if는 조건이 참일 때만 그 요소를 화면에 그립니다(거짓이면 아예 없어짐). v-else와 짝지어 '데이터가 있으면 목록, 없으면 안내 문구'처럼 분기합니다. v-for는 배열을 하나씩 꺼내 같은 모양의 요소를 반복해 찍어 냅니다. 이때 :key에 항목마다 다른 고유값(보통 id)을 주어야 Vue가 어떤 항목이 바뀌었는지 정확히 추적한다는 점을 꼭 강조합니다(key를 인덱스로 대충 주면 목록 편집 시 버그가 납니다). v-bind는 콜론(:) 한 글자로 줄여 쓰며, :src·:class처럼 HTML 속성값을 데이터와 연결합니다. :class에 객체({ done: todo.done })를 주면 조건에 따라 클래스가 붙었다 떨어졌다 합니다.

왜 중요한가: '데이터 → 화면'의 세 가지 기본기(조건·반복·속성연결)로 실무 화면의 대부분을 만듭니다. 과일 배열을 v-for로 찍고, 비었을 때 v-if로 안내 문구를 띄우는 것을 라이브 코딩으로 보여 줍니다.`},{h:"6교시 — 이벤트 v-on(@)과 폼 양방향 바인딩 v-model",body:`강의 흐름: 5교시가 '데이터를 화면에 보여주기'였다면, 이 교시는 반대로 '사용자 입력을 데이터로 받아오기'입니다. 두 개의 디렉티브로 완성됩니다.

핵심 포인트: v-on은 골뱅이(@)로 줄여 쓰며 클릭·엔터 같은 사용자 사건에 함수를 연결합니다. @click='addTodo'는 '클릭하면 addTodo를 실행하라'는 뜻이고, @keyup.enter처럼 점(.)으로 키를 특정할 수 있습니다(수식어라고 부름). v-model은 입력창과 상태를 '양방향'으로 묶습니다. 즉 사용자가 타이핑하면 상태가 바뀌고, 코드가 상태를 바꾸면 입력창 글자도 바뀝니다. 이 양방향이 v-bind(한 방향, 데이터→화면)와의 결정적 차이라는 점을 대비해서 설명합니다. 체크박스에 v-model을 걸면 true/false가, select에 걸면 선택값이 자동으로 상태에 담깁니다.

왜 중요한가: 회원가입·검색·할 일 추가 등 모든 입력 화면의 뼈대가 v-model 하나입니다. 입력창에 v-model='name'을 걸고 바로 아래 {{ name }}을 두어, 타이핑이 즉시 반영되는 '거울 효과'를 눈으로 확인시키는 것이 이 교시의 핵심 실습입니다. 8교시 미니 실습(카운터·할 일 목록)은 오늘 배운 ref+디렉티브+이벤트+v-model을 한 화면에 모으는 종합 연습이라는 점을 예고하며 마무리합니다.`},{h:"MVVM 아키텍처 — 화면과 데이터 사이의 중개자 (교재 pp.6-9)",body:`Vue.js는 MVVM(Model-View-ViewModel) 아키텍처 패턴을 따른다. Model은 컴포넌트 내부의 순수한 데이터와 비즈니스 로직(ref·reactive 변수), View는 사용자에게 실제로 보이는 DOM과 template 영역, ViewModel은 둘 사이를 잇는 중재자로 Vue 프레임워크 자체가 이 역할을 한다.
식당에 비유하면 주방(Model)과 손님 테이블(View) 사이를 오가는 종업원(ViewModel)과 같다 — 주방 음식이 바뀌면 테이블에 새로 내오고, 손님 주문이 바뀌면 주방에 전달한다.
Vue는 DOM Listeners와 Data Bindings 메커니즘으로 이 중개를 자동화하며, 그 대표 장치가 v-model의 양방향 데이터 바인딩이다.
덕분에 UI를 그리는 부분과 데이터 처리 로직이 완전히 분리된다.`},{h:"Virtual DOM — 진짜 DOM이 느린 이유와 두 가지 최적화 (교재 p.8)",body:`브라우저의 Real DOM 조작은 느리다 — JavaScript로 실제 DOM을 수정하면 브라우저는 Layout(Reflow)과 화면을 다시 색칠하는 Paint(Repaint)를 매번 거친다.
교재의 예처럼 3,000개 노드 중 단 1개만 수정해도 3,000개를 새로 그리면 엄청난 연산 부하가 생긴다.
Virtual DOM은 이 비용을 줄이려고 메모리 위에 만든 가짜 DOM으로, 학급 게시판을 통째로 새로 만드는 대신 바뀐 종이 한 장만 떼어 붙이는 것과 같다.
공간적 최적화(바뀐 노드만 Layout·Paint)와 시간적 최적화(한 이벤트 안에 여러 번 데이터가 바뀌어도 끝난 시점에 단 한 번만 실제 DOM 반영), 두 방향으로 렌더링 성능을 끌어올린다.`},{h:"v-html과 XSS — 편리한 만큼 위험한 디렉티브 (교재 pp.51-53)",body:`v-html은 변수에 담긴 문자열을 실제 HTML 요소로 해석해 화면에 주입하는 디렉티브로, 내부적으로 element.innerHTML과 동일하게 동작한다.
문제는 XSS(Cross-Site Scripting) 공격 노출이다 — 해커가 게시판 댓글에 악성 자바스크립트를 심어두면, 다른 사용자가 그 글을 읽을 때 그 사용자의 브라우저에서 해커의 코드가 실행되어 쿠키·세션 토큰을 탈취당한다.
대문에 아무나 붙여 놓은 쪽지를 명령서로 믿고 그대로 실행하는 집과 같다.
교재는 img 태그의 onerror 속성에 이동 코드를 심으면 다른 사이트로 강제 이동되는 실험으로 이 위험을 직접 보여주며, 디렉티브 총람표에도 v-html에 "보안사고(XSS) 유의"를 명시한다.
사용자 입력을 v-html로 그대로 출력하는 일은 피해야 한다.`}]},realCodes:[{title:"App.vue — 반응형 할 일 목록 전체",lang:"vue",code:`<script setup>
// vue 라이브러리에서 반응형 함수 ref 와 계산 속성 computed 를 가져온다(화면과 데이터를 연결하기 위함)
import { ref, computed } from 'vue'

// 할 일 객체들을 담을 배열을 반응형으로 만든다(배열이 바뀌면 화면도 자동 갱신)
const todos = ref([])
// 입력창에 적은 글자를 담을 반응형 문자열(처음엔 빈 문자열)
const text = ref('')
// 새 할 일의 고유 번호를 만들기 위한 카운터(1부터 시작)
let nextId = 1

// 버튼을 눌렀을 때 실행될 함수: 새 할 일을 목록에 추가한다
function addTodo() {
  // 입력값 앞뒤 공백을 제거했을 때 비어 있으면 아무것도 하지 않고 함수를 끝낸다
  if (text.value.trim() === '') return
  // todos 배열 끝에 새 할 일 객체를 추가한다(id·제목·완료여부)
  todos.value.push({ id: nextId++, title: text.value, done: false })
  // 다음 입력을 위해 입력창 값을 다시 비운다
  text.value = ''
}

// 아직 완료되지 않은 할 일의 개수를 자동 계산한다(todos 가 바뀔 때만 다시 계산)
const remaining = computed(() => todos.value.filter(t => !t.done).length)
<\/script>

<template>
  <!-- 화면 제목과 남은 할 일 개수를 보여준다(remaining 값이 바뀌면 숫자도 자동 변경) -->
  <h2>할 일 목록 (남은 일: {{ remaining }}개)</h2>
  <!-- 입력창: v-model 로 text 상태와 양방향 연결, 엔터를 누르면 addTodo 실행 -->
  <input v-model="text" @keyup.enter="addTodo" placeholder="할 일을 입력하세요" />
  <!-- 추가 버튼: 클릭하면 addTodo 함수를 호출한다 -->
  <button @click="addTodo">추가</button>
  <!-- 할 일들을 세로 목록으로 표시한다 -->
  <ul>
    <!-- v-for 로 todos 배열을 하나씩 꺼내 li 를 만든다, key 에는 고유 id 를 준다 -->
    <li v-for="todo in todos" :key="todo.id">
      <!-- 체크박스: v-model 로 해당 할 일의 done(완료여부)과 양방향 연결 -->
      <input type="checkbox" v-model="todo.done" />
      <!-- 완료되면 done 클래스가 붙어 취소선이 그려진다, 제목을 출력 -->
      <span :class="{ done: todo.done }">{{ todo.title }}</span>
    </li>
  </ul>
</template>

<style>
/* done 클래스가 붙은 글자에 취소선과 회색을 적용한다(완료 표시) */
.done { text-decoration: line-through; color: gray; }
</style>`,note:`ref 로 만든 상태를 v-model·v-for·computed 로 연결한 완결형 예제다.
입력→추가→체크가 모두 데이터만 바꾸면 화면이 자동으로 따라 바뀐다.`},{title:"검색어를 감시해 재검색하는 watch 예제",lang:"vue",code:`<script setup>
// ref로 검색어 상태를, watch로 그 변화를 감시한다
import { ref, watch } from 'vue'

// 입력창과 연결될 검색어 상태(처음엔 빈 문자열)
const keyword = ref('')
// 검색 결과를 담을 반응형 배열
const results = ref([])

// keyword가 바뀔 때마다 실행: 새 값(newVal)을 받아 서버에 재검색을 요청한다
watch(keyword, async (newVal) => {
  if (!newVal.trim()) { results.value = []; return } // 빈 검색어면 결과를 비우고 종료
  const res = await fetch('/api/search?q=' + newVal)  // 실제로는 검색 API를 호출
  results.value = await res.json()                    // 받은 결과로 화면을 갱신
})
<\/script>

<template>
  <!-- v-model로 입력창과 keyword를 양방향 연결 -->
  <input v-model='keyword' placeholder='검색어를 입력하세요' />
  <!-- 검색 결과를 목록으로 표시 -->
  <ul><li v-for='r in results' :key='r.id'>{{ r.title }}</li></ul>
</template>`,note:`computed는 값 계산에, watch는 값이 바뀔 때의 '부수 효과'에 쓴다.
검색어가 바뀔 때 서버를 다시 부르는 것처럼 무언가를 실행해야 하는 일은 watch로 처리한다.`}],periods:["1교시 Vue 소개와 왜 프레임워크가 필요한가 (개념)","2교시 Vite로 첫 Vue 프로젝트 만들기 (실습)","3교시 SFC 구조와 첫 컴포넌트 화면에 띄우기 (실습)","4교시 반응형 상태 ref와 reactive 이해 (실습)","5교시 템플릿 문법과 디렉티브 v-if·v-for·v-bind (실습)","6교시 이벤트 v-on과 폼 바인딩 v-model (실습)","7교시 computed와 watch로 파생 상태 다루기 (실습)","8교시 미니 실습: 반응형 카운터·할 일 목록 UI (실습)"]},"vue-2":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 컴포넌트로 화면 쪼개기 (개념·실습)"},{time:"10:00–10:50",topic:"2교시 props 로 부모→자식 데이터 내려주기 (실습)"},{time:"11:00–11:50",topic:"3교시 emit 으로 자식→부모 이벤트 올려보내기 (실습)"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 slot 으로 내용 끼워넣기 (실습)"},{time:"14:00–14:50",topic:"5교시 라이프사이클 훅과 onMounted (실습)"},{time:"15:00–15:50",topic:"6교시 Composition API와 setup 패턴 (실습)"},{time:"16:00–16:50",topic:"7교시 컴포저블(useXxx)로 로직 재사용 (실습)"},{time:"17:00–17:50",topic:"8교시 미니 실습: 목록·아이템 컴포넌트 분리 (실습)"}],practice:{title:"목록(List)·아이템(Item) 컴포넌트로 분리한 회원 카드",steps:["src/components 폴더를 만들고 그 안에 UserItem.vue 파일을 새로 생성한다","UserItem.vue 에서 defineProps 로 user 객체를 props 로 받도록 선언하고, <template> 에 이름·이메일을 표시한다","UserItem 에 '삭제' 버튼을 두고 defineEmits 로 'remove' 이벤트를 정의해 클릭 시 user.id 를 부모로 올려보낸다","App.vue 에서 users = ref([...]) 배열을 만들고 <UserItem> 을 import 한다",'App.vue 의 <template> 에서 v-for 로 users 를 돌며 <UserItem :user="u" @remove="removeUser"> 를 렌더링한다',"removeUser(id) 함수를 만들어 해당 id 를 가진 회원을 users 배열에서 filter 로 제거한다","브라우저에서 삭제 버튼을 눌렀을 때 해당 카드만 사라지는지 확인한다(자식→부모 통신 검증)","slot 을 활용해 UserItem 카드 하단에 부모가 원하는 내용을 끼워넣을 수 있게 <slot> 을 추가한다","완성된 두 파일의 코드와 동작 화면을 캡처해 저장한다"],deliverable:"props·emit·slot 을 모두 사용한 UserItem.vue 와 App.vue, 삭제 동작 화면 캡처"}},examples:[{title:"props 로 값 내려주기",lang:"vue",code:`<script setup>
// 부모에게서 메시지 문자열을 props 로 받는다
defineProps({ message: String })
<\/script>

<template>
  <!-- 받은 message 를 그대로 화면에 출력한다 -->
  <p>부모가 보낸 말: {{ message }}</p>
</template>`,note:"자식은 props 로 받은 값을 읽어 화면에 보여주기만 한다."},{title:"onMounted 라이프사이클 훅",lang:"vue",code:`<script setup>
// 컴포넌트가 화면에 나타날 때 실행되는 훅을 가져온다
import { onMounted, ref } from 'vue'
// 표시할 메시지 상태
const msg = ref('로딩 중...')
// 컴포넌트가 화면에 붙은 직후 한 번 실행된다(보통 데이터 불러오기에 사용)
onMounted(() => {
  msg.value = '화면이 준비되었습니다!' // 마운트 후 메시지를 바꾼다
})
<\/script>

<template>
  <!-- 처음엔 '로딩 중', 마운트 후엔 준비 완료 문구가 보인다 -->
  <p>{{ msg }}</p>
</template>`,note:"onMounted 안은 화면이 그려진 직후 딱 한 번 실행된다."},{title:"useCounter 컴포저블로 로직 빼내 재사용하기",lang:"vue",code:`<!-- ===== composables/useCounter.js (별도 파일) =====
import { ref } from 'vue'                 // 반응형 값을 만드는 ref 를 가져온다
// use 로 시작하는 컴포저블 함수: 초깃값을 받아 카운터 로직을 돌려준다
export function useCounter(start = 0) {
  const count = ref(start)                // 이 함수만의 독립된 카운터 상태
  const inc = () => { count.value++ }     // 1 올리는 함수
  const dec = () => { count.value-- }     // 1 내리는 함수
  const reset = () => { count.value = start } // 처음 값으로 되돌리는 함수
  return { count, inc, dec, reset }       // 상태와 함수들을 묶어 반환
}
===== 아래는 이 컴포저블을 쓰는 컴포넌트 ===== -->
<script setup>
// 방금 만든 컴포저블을 가져온다
import { useCounter } from '../composables/useCounter'
// 좋아요 카운터와 조회수 카운터를 각각 독립적으로 만든다(서로 값이 섞이지 않음)
const { count: likes, inc: like } = useCounter(0)
const { count: views, inc: view } = useCounter(100)
<\/script>

<template>
  <!-- 같은 로직을 두 곳에서 재사용하지만 값은 각자 따로 관리된다 -->
  <button @click="like">좋아요 {{ likes }}</button>
  <button @click="view">조회 {{ views }}</button>
</template>`,note:"반복되던 '카운터 상태+증감 함수'를 useCounter 한 곳에 모아 두면, 컴포넌트는 그것을 꺼내 쓰기만 한다. useCounter()를 호출할 때마다 독립된 count 가 생기므로 좋아요와 조회수가 서로 간섭하지 않는다 — 로직은 공유하되 값은 분리되는 컴포저블의 핵심을 보여주는 데모다."},{title:"props로 내려주고 emit으로 올려받는 부모-자식 통신",lang:"html",code:`<!-- 자식: TodoItem.vue — props로 받고, 삭제는 이벤트로 부모에 알린다 -->
<script setup>
defineProps({ text: String })              // 부모 → 자식 (데이터 하향)
const emit = defineEmits(['remove'])       // 자식 → 부모 (이벤트 상향)
<\/script>
<template>
  <li>
    {{ text }}
    <button @click="emit('remove')">삭제</button>
  </li>
</template>

<!-- 부모: 목록을 소유하고, 자식이 올린 remove 이벤트로 상태를 바꾼다 -->
<!-- <TodoItem :text="t" @remove="list.splice(i,1)" /> -->`,note:'데이터는 props로 아래로, 변경 요청은 emit으로 위로 — "단방향 데이터 흐름"이 Vue 컴포넌트 설계의 기본 원칙.'},{title:"재사용 로직을 Composable(useXxx)로 분리",lang:"javascript",code:`// composables/useCounter.js — 로직만 떼어내 여러 컴포넌트에서 재사용
import { ref, computed } from 'vue'

export function useCounter(start = 0) {
  const count = ref(start)
  const isEven = computed(() => count.value % 2 === 0)   // 파생 상태
  const inc = () => count.value++
  const reset = () => (count.value = start)
  return { count, isEven, inc, reset }   // 필요한 것만 노출
}

// 사용: const { count, isEven, inc } = useCounter(10)
// Composition API의 진짜 장점 = 상태+로직을 함수로 묶어 재사용`,note:"Mixin의 이름 충돌 문제를 Composable이 해결한다. setup 안에서 여러 useXxx를 조합해 관심사별로 로직을 나눈다."},{title:"defineEmits 로 자식이 부모에게 값 올려주기 (Event Up)",lang:"vue",code:`<!-- ===== 자식: CityButton.vue ===== -->
<script setup>
// 부모에게 올려보낼 이벤트 이름을 등록한다
const emit = defineEmits(['select-city'])
// 부모가 내려준 도시 이름을 props 로 받는다(Props Down)
const props = defineProps({ name: String })
// 클릭하면 등록한 이벤트를 발사하며 도시 이름을 실어 보낸다
function pick() {
  emit('select-city', props.name)   // (이벤트명, 함께 보낼 데이터)
}
<\/script>
<template>
  <!-- 클릭 → pick 실행 → 부모로 이벤트가 올라간다 -->
  <button @click="pick">{{ name }}</button>
</template>

<!-- ===== 부모: App.vue ===== -->
<script setup>
import { ref } from 'vue'
import CityButton from './CityButton.vue'
const selected = ref('아직 없음')            // 자식이 올려준 값을 담을 상태
// 자식이 보낸 도시 이름을 받아 상태에 저장
function onSelect(city) { selected.value = city }
<\/script>
<template>
  <!-- @select-city 로 자식 이벤트를 수신(실려온 값이 인자로 들어옴) -->
  <CityButton name="서울" @select-city="onSelect" />
  <CityButton name="부산" @select-city="onSelect" />
  <p>선택한 도시: {{ selected }}</p>
</template>`,note:"부모→자식은 props(내려주기), 자식→부모는 emit(올려주기)로 통신한다. 자식은 props 를 직접 못 바꾸므로, 바꾸고 싶으면 이벤트로 부모에게 요청한다 — 이것이 단방향 데이터 흐름의 핵심이다."},{title:"computed 로 계산값 만들기 — method 와 달리 캐싱된다",lang:"vue",code:`<script setup>
import { ref, computed } from 'vue'
const price = ref(10000)               // 단가
const qty = ref(1)                     // 수량
// computed: 의존하는 값(price·qty)이 바뀔 때만 다시 계산, 아니면 캐시 결과 재사용
const total = computed(() => {
  console.log('계산 실행!')             // 값이 바뀔 때만 콘솔에 찍힘(캐싱 확인)
  return price.value * qty.value + '원' // 합계 문자열을 돌려준다
})
<\/script>

<template>
  <!-- total 을 두 번 써도 계산은 한 번만(캐싱) -->
  <p>합계: {{ total }}</p>
  <p>다시 표시: {{ total }}</p>
  <!-- 수량을 바꾸면 total 이 자동으로 다시 계산된다 -->
  <button @click="qty++">수량 +1 (현재 {{ qty }})</button>
</template>`,note:"computed 는 결과를 기억(캐싱)했다가 의존값이 바뀔 때만 다시 계산한다. 화면에서 여러 번 써도 연산은 한 번뿐이라, 매번 실행되는 일반 함수보다 효율적이다."},{title:"watch 로 값 변화를 감시해 후속 동작 실행하기",lang:"vue",code:`<script setup>
import { ref, watch } from 'vue'
const keyword = ref('')                 // 검색어 입력값
const status = ref('입력을 기다리는 중') // 안내 문구
// watch: keyword 가 바뀔 때마다 (새값, 옛값)을 받아 후속 로직 실행
watch(keyword, (newVal, oldVal) => {
  console.log(oldVal, '->', newVal)     // 어떻게 바뀌었는지 로그
  // 두 글자 이상일 때만 검색 준비(실무에선 여기서 API 를 호출)
  status.value = newVal.length >= 2 ? '검색 준비 완료' : '두 글자 이상 입력'
})
<\/script>

<template>
  <!-- 타이핑할 때마다 watch 가 반응해 status 를 갱신 -->
  <input v-model="keyword" placeholder="검색어 입력" />
  <p>{{ status }}</p>
</template>`,note:'computed 가 "값을 계산"한다면 watch 는 "값이 바뀐 순간 부수효과(API 호출·로그·검증)"를 실행한다. 새값·옛값을 둘 다 받아 변화를 비교할 수 있다.'},{title:"슬롯(slot) — 데이터가 아니라 마크업 조각을 주입하기",lang:"vue",code:`<!-- ===== 자식: PanelCard.vue — 레이아웃 틀만 제공한다 ===== -->
<template>
  <div class="card">
    <header>
      <!-- 이름 있는 슬롯: 부모가 #header 로 보낸 조각이 여기 꽂힌다 -->
      <slot name="header"></slot>
    </header>
    <main>
      <!-- 이름 없는 기본 슬롯: 나머지 내용이 이 자리에 들어온다 -->
      <slot>부모가 아무것도 안 주면 보이는 기본 문구</slot>
    </main>
  </div>
</template>

<!-- ===== 부모: 틀 안에 채울 내용을 자유롭게 주입한다 ===== -->
<template>
  <PanelCard>
    <!-- template v-slot:header(축약형 #header)로 꽂을 위치를 지정 -->
    <template #header>
      <h2>오늘의 날씨</h2>
    </template>
    <!-- 이름을 안 붙인 나머지는 기본 슬롯으로 들어간다 -->
    <p>맑음, 기온 24도</p>
  </PanelCard>
</template>`,note:"props 가 부모의 데이터를 주입한다면, 슬롯은 HTML 마크업·레이아웃 조각 자체를 주입한다. 자식의 slot 태그 안에 미리 적어 둔 내용은 부모가 아무것도 안 넘겼을 때 나오는 대체(기본) 콘텐츠다."},{title:"스코프드 슬롯 — 자식의 데이터를 부모가 받아서 그리기",lang:"vue",code:`<!-- ===== 자식: ServerStatus.vue — 데이터는 자식이 소유한다 ===== -->
<script setup>
import { ref } from 'vue'
const message = ref('서버 상태 정상')   // 자식 내부 데이터 1
const userCount = ref(150)              // 자식 내부 데이터 2
<\/script>
<template>
  <!-- slot 태그의 속성 바인딩(:이름="변수")으로 데이터를 부모로 올려 보낸다 -->
  <slot :text="message" :count="userCount"></slot>
</template>

<!-- ===== 부모: 자식이 보낸 값을 받아 원하는 모양으로 배치한다 ===== -->
<template>
  <!-- v-slot="변수주머니이름" 으로 자식이 보낸 값들을 한 묶음으로 수신 -->
  <ServerStatus v-slot="slotBag">
    <!-- 주머니에서 text 와 count 를 꺼내 부모 마음대로 그린다 -->
    <p>알림 메시지: {{ slotBag.text }}</p>
    <p>접속자 수: {{ slotBag.count }}명</p>
  </ServerStatus>
</template>`,note:"일반 슬롯이 부모→자식으로 마크업을 내려보낸다면, 스코프드 슬롯은 반대로 자식의 로컬 데이터를 부모가 받아 화면을 설계한다. 데이터는 자식이 관리하되 보여 주는 모양은 부모가 결정하는 역할 분담 패턴이다."},{title:"provide / inject — 중간 계층 건너뛰고 깊은 자식에 값 전달",lang:"vue",code:`<!-- ===== 조상: App.vue — 값을 아래로 공급(provide)한다 ===== -->
<script setup>
import { ref, provide } from 'vue'
// 테마 색을 반응형으로 만들고
const themeColor = ref('dark')
// 'globalTheme' 이라는 키 이름으로 모든 후손에게 공급한다
provide('globalTheme', themeColor)
<\/script>

<!-- ===== 깊은 자식: 중간 부모를 몇 단계 건너뛰어도 바로 받는다 ===== -->
<script setup>
import { inject } from 'vue'
// 조상이 provide 한 키 이름을 지정해 직접 주입받는다
const theme = inject('globalTheme')
<\/script>
<template>
  <!-- 조상의 값이 바뀌면 이 문구도 함께 갱신된다(반응형 유지) -->
  <p>현재 테마: {{ theme }}</p>
  <!-- 주입받은 ref 라서 여기서 바꾸면 조상 값도 함께 바뀐다 -->
  <button @click="theme = theme === 'dark' ? 'light' : 'dark'">테마 전환</button>
</template>`,note:"props 를 층층이 릴레이로 내려보내는 번거로움 없이, 조상이 선언한 반응형 상태를 깊은 자식이 키 이름 하나로 바로 받는다. 다만 전역 상태는 Pinia 가 표준이라 provide/inject 의 실무 사용 빈도는 높지 않다는 점도 알아 두자."},{title:"라이프사이클 훅 총정리 — onUnmounted 로 타이머 청소하기",lang:"vue",code:`<script setup>
// 부착·갱신·소멸 시점에 실행되는 훅들을 가져온다
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'
const count = ref(0)   // 1초마다 자동으로 올라갈 숫자
let timerId = null     // 타이머 번호(나중에 끌 때 필요)

// [1. 생성] script setup 본문 자체가 생성 단계 — 아직 화면(DOM)에는 접근 불가
console.log('컴포넌트가 메모리에 생성됨')
// [2. 부착] 화면에 붙은 직후 — API 호출·타이머 시작의 최적 타이밍
onMounted(() => {
  timerId = setInterval(() => { count.value++ }, 1000)   // 1초마다 +1
})
// [3. 갱신] 데이터가 바뀌어 화면을 다시 그린 직후마다 실행
onUpdated(() => { console.log('화면 다시 그림, 현재 ' + count.value) })
// [4. 소멸] v-if 등으로 컴포넌트가 사라질 때 — 타이머를 꼭 꺼서 메모리 누수 방지
onUnmounted(() => { clearInterval(timerId) })
<\/script>

<template>
  <p>자동 카운트: {{ count }}</p>
</template>`,note:"컴포넌트는 생성 → 부착 → 갱신 → 소멸의 생명주기를 돈다. onMounted 에서 켠 setInterval 을 onUnmounted 에서 안 꺼 주면 컴포넌트가 화면에서 사라져도 타이머가 백그라운드에서 영원히 돌며 메모리가 새는 대표적인 버그가 된다."}],concepts:[{term:"컴포넌트",desc:"화면을 기능 단위로 쪼갠 재사용 가능한 조각으로, 레고 블록처럼 조합해 큰 화면을 만든다."},{term:"props",desc:"부모 컴포넌트가 자식에게 값을 '내려주는' 통로로, 자식은 받은 props 를 읽기만 한다."},{term:"emit",desc:"자식 컴포넌트가 부모에게 '무슨 일이 일어났다'고 신호를 '올려보내는' 방법이다."},{term:"slot",desc:"컴포넌트 안에 비워둔 자리로, 부모가 원하는 내용을 그 자리에 끼워넣을 수 있다."},{term:"라이프사이클 훅",desc:"컴포넌트가 화면에 나타나거나 사라질 때 자동 실행되는 함수로, onMounted 가 대표적이다."},{term:"Composition API",desc:"관련 있는 상태와 로직을 setup 안에 함께 모아 작성하는 방식으로, 코드 재사용이 쉽다."},{term:"컴포저블(composable)",desc:"use 로 시작하는 함수에 반응형 로직을 담아 여러 컴포넌트에서 재사용하는 패턴이다."},{term:"Provide / Inject",desc:"부모가 provide('키', 값)로 데이터를 창고에 넣어두면, 아래로 몇 단계 떨어진 자손 컴포넌트든 inject('키')로 곧바로 꺼내 쓸 수 있는 통로다. props를 중간 컴포넌트마다 릴레이로 넘기는 'props 내리막길' 문제를 피할 때 쓰며, 한 컴포넌트 트리 안에서만 통하고 앱 전체 공유는 Pinia가 담당한다."},{term:"watchEffect(자동 감시자)",desc:`감시 대상을 명시하지 않아도 함수 안에서 접근한 반응형 데이터를 자동 추적해 값이 바뀔 때마다 재실행되는 함수다.
컴포넌트가 처음 태어날 때도 최초 1회 즉시 실행되며, 이전 값(oldValue)은 제공하지 않는다. (교재 pp.115-116)`},{term:"페이로드(payload)",desc:`자식이 emit() 두 번째 인자부터 실어 부모의 콜백 함수로 넘기는 데이터다.
emit('select-city', name)처럼 이벤트 이름 뒤에 붙여 전달한다. (교재 p.139)`},{term:"프롭스 드릴링(Props Drilling)",desc:`계층이 깊을 때 중간 컴포넌트들이 자기는 쓰지도 않는 데이터를 오직 아래로 전달하기 위해 Props를 받아 토스하기를 반복하는 현상이다.
Provide/Inject가 이를 해결하지만, 전역 상태 관리(Pinia)가 있어 사용 빈도는 높지 않다. (교재 p.144)`}],detail:{topics:[{h:"부모-자식 통신",items:["defineProps 로 값 받기","defineEmits 로 이벤트 올리기","데이터는 아래로, 사건은 위로","단방향 데이터 흐름의 장점"]},{h:"slot 과 확장",items:["기본 slot 으로 내용 끼우기","이름 있는 slot(named slot)","컴포넌트 재사용성 높이기"]},{h:"Composition API",items:["script setup 문법","라이프사이클 훅(onMounted 등)","컴포저블 useXxx 로 로직 분리","여러 컴포넌트에서 재사용"]},{h:"Provide & Inject",items:["부모에서 provide(키, 값)로 데이터 제공","자손 어디서나 inject(키)로 주입받기","props 릴레이(중간 전달) 없이 깊은 자식에 전달","트리 범위 공유는 Provide/Inject, 앱 전역 공유는 Pinia"]}],labs:[{title:"Lab 1. props 로 인사 카드 만들기",steps:["components/Greeting.vue 를 만들고 defineProps({ name: String }) 를 선언한다","<template> 에 <p>안녕하세요, {{ name }}님!</p> 를 적는다",'App.vue 에서 Greeting 을 import 하고 <Greeting name="홍길동" /> 로 사용한다',"이름을 바꿔 여러 개의 Greeting 을 띄워본다"]},{title:"Lab 2. emit 으로 카운터 올려보내기",steps:["자식 컴포넌트에 버튼을 두고 defineEmits(['inc']) 를 선언한다","버튼 클릭 시 emit('inc') 를 호출한다",'부모에서 @inc="count++" 로 받아 숫자를 올린다',"버튼을 누를 때마다 부모의 숫자가 증가하는지 확인한다"]},{title:"Lab 3. 테마 값 provide/inject로 내려주기",steps:["App.vue에서 provide로 색 테마를 제공한다","2단계 아래 버튼 컴포넌트에서 inject로 테마를 받는다","받은 테마 값을 버튼 배경색에 적용해 깊은 자식까지 전달됨을 확인한다"]},{title:"Lab 4. 라이프사이클과 컴포저블 묶어 연습하기",steps:["composables/useClock.js 를 만들고, ref 로 현재 시각 문자열 상태 now 를 선언한다","useClock 안에서 onMounted 로 setInterval 을 걸어 1초마다 now 를 new Date().toLocaleTimeString() 으로 갱신한다","useClock 안에서 onUnmounted 로 clearInterval 을 호출해 타이머를 정리한 뒤 { now } 를 반환한다","컴포넌트에서 const { now } = useClock() 로 꺼내 <p>{{ now }}</p> 로 화면에 실시간 시계를 표시한다","시계 컴포넌트를 v-if 로 켰다 껐다 하며, 껐을 때 onUnmounted 가 불려 타이머가 멈추는지 콘솔 로그로 확인한다"]}],homework:["오늘의 회원 목록에 '회원 추가' 폼을 만들어 새 회원을 users 배열에 추가하고, 추가/삭제가 모두 동작하는 화면을 캡처해 제출한다","useCounter 라는 컴포저블 함수를 만들어 count 와 inc 를 반환하고, 두 개 이상의 컴포넌트에서 재사용해 본다","교재 3장 과제(p.119) — 날씨 대시보드 동적 기능: 반응형 상태·computed 검색 필터·watch/watchEffect 로그","교재 4장 과제(p.151) — 컴포넌트 구조화: WeatherParent/SearchBar/WeatherCard/BaseDashboardCard(slot) 4분리"]},theory:{theory:[{h:"props 릴레이가 힘들 때: Provide & Inject",body:`props는 부모에서 자식으로 한 칸씩만 내려갑니다.
할아버지 컴포넌트가 손자에게 값을 주려면 중간의 아버지 컴포넌트가 필요도 없는 props를 받아 그대로 다시 내려보내야 하는데, 이런 릴레이가 길어지면 코드가 지저분해집니다.
Provide/Inject는 부모가 provide('theme', 'dark')처럼 값을 한 번 넣어 두면, 그 아래 어떤 깊이의 자손이든 inject('theme')로 바로 받는 지름길입니다.

테마나 로그인 사용자 정보처럼 '트리 전체가 공유하는 설정값'에 적합합니다.
다만 멀리 떨어진 형제끼리 앱 전역으로 공유해야 한다면 Provide/Inject보다 Pinia가 더 맞습니다.`},{h:"컴포넌트 통신: props 는 내려주고 emit 은 올려보낸다",body:`큰 화면을 작은 컴포넌트로 쪼개면, 이 조각들끼리 데이터를 주고받아야 합니다.
Vue의 규칙은 단순합니다.

부모는 자식에게 props 로 값을 '내려'줍니다(예: 회원 정보).
자식은 그 값을 마음대로 바꾸지 않고 화면에 보여주기만 합니다.
반대로 자식에게 무슨 일이 생기면(예: 삭제 버튼 클릭) emit 으로 부모에게 신호를 '올려'보냅니다.
그러면 실제 데이터 변경은 데이터의 주인인 부모가 합니다.
이렇게 '데이터는 위에서 아래로, 사건은 아래에서 위로' 흐르게 하면 누가 데이터를 바꾸는지 명확해져 버그가 줄어듭니다.`},{h:"Composition API가 왜 편한가요?",body:`예전 방식(Options API)에서는 data·methods·computed 칸이 따로 나뉘어 있었습니다.
기능 하나를 이해하려면 여러 칸을 왔다 갔다 봐야 했습니다.

Composition API는 '하나의 기능에 관한 상태와 함수'를 한곳(setup)에 모아 적습니다.
예를 들어 '검색' 기능에 필요한 상태·함수를 한 덩어리로 둘 수 있습니다.
더 나아가 이 덩어리를 useSearch 같은 함수로 빼내면 여러 컴포넌트에서 똑같이 가져다 쓸 수 있습니다.
마치 요리 레시피를 한 장에 정리해 두고 필요할 때마다 꺼내 쓰는 것과 같습니다.`},{h:"1교시 — 큰 화면을 컴포넌트로 쪼개는 이유와 기준",body:`강의 흐름: 어제 만든 할 일 목록을 App.vue 한 파일에 다 몰아넣으면 어떻게 될지 상상시킵니다. 헤더·목록·아이템·입력폼이 뒤섞여 300줄이 넘어가면 어디가 무엇인지 찾기 어렵습니다. 컴포넌트는 이 화면을 '기능 단위 레고 블록'으로 나누는 것입니다.

핵심 포인트: 나누는 기준은 두 가지입니다. 첫째 '반복되는가' — 회원 카드처럼 같은 모양이 여러 번 나오면 카드 하나를 컴포넌트로 만들어 v-for로 찍습니다. 둘째 '독립적인가' — 헤더·사이드바처럼 역할이 뚜렷이 구분되면 파일을 나눕니다. 컴포넌트로 나누면 (1) 같은 조각을 여러 곳에서 재사용하고, (2) 한 파일이 짧아 이해가 쉽고, (3) 팀원이 파일별로 나눠 작업할 수 있습니다. 자식 컴포넌트를 components 폴더에 .vue로 만들고, 부모에서 import 한 뒤 template에 <ChildName /> 태그로 끼우는 3단계를 실제로 보여 줍니다.

왜 중요한가: 오늘 배울 props·emit·slot은 모두 '쪼갠 조각들이 서로 대화하는 방법'입니다. 먼저 왜 쪼개는지, 어디서 쪼갤지를 몸으로 이해해야 이후 통신이 자연스럽게 이어집니다. 어제의 App.vue에서 할 일 한 줄(li)을 TodoItem.vue로 떼어내는 실습으로 문을 엽니다.`},{h:"4교시 — slot으로 컴포넌트에 '빈자리'를 만들어 재사용성 높이기",body:`강의 흐름: props가 '데이터'를 넘기는 통로라면, slot은 'HTML 덩어리'를 통째로 끼워 넣는 창구라고 대비해서 시작합니다. 예를 들어 카드·모달·버튼처럼 '테두리와 배치는 똑같은데 안쪽 내용만 매번 다른' 컴포넌트를 생각하게 합니다.

핵심 포인트: 자식 컴포넌트 template에 <slot></slot>을 적어 두면, 그 자리는 '부모가 채워 넣을 빈 공간'이 됩니다. 부모가 <MyCard>안녕하세요</MyCard>처럼 태그 사이에 내용을 적으면 그 내용이 slot 자리에 들어갑니다. 자리가 여러 개 필요하면 이름 있는 슬롯(named slot)을 씁니다 — 자식에 <slot name='header'/>·<slot name='footer'/>를 두고, 부모는 <template #header>로 각 자리를 지정합니다. slot 안에 기본값을 적어 두면 부모가 아무것도 안 넣었을 때 그 기본값이 보입니다.

왜 중요한가: slot이 있으면 카드 컴포넌트 하나로 '상품 카드·회원 카드·공지 카드'를 다 만들 수 있어 중복 코드가 사라집니다. Element Plus 같은 UI 라이브러리의 다이얼로그·테이블이 전부 slot으로 내용을 받는다는 점을 미리 알려 주면 4일차와 연결됩니다. 테두리만 있는 Panel.vue를 만들고, 그 안에 서로 다른 내용을 두 번 끼워 넣어 재사용을 눈으로 보여 줍니다.`},{h:"5교시 — 컴포넌트의 일생: 라이프사이클 훅과 onMounted",body:`강의 흐름: 컴포넌트도 사람처럼 '태어나고(화면에 나타남)·살다가·사라진다(화면에서 제거됨)'는 비유로 시작합니다. 이 각 시점에 자동으로 불리는 함수가 라이프사이클 훅입니다. 우리가 일일이 '지금 화면에 붙었나?'를 검사할 필요 없이, Vue가 알아서 그 순간에 우리 코드를 실행해 줍니다.

핵심 포인트: 가장 많이 쓰는 훅은 onMounted로, 컴포넌트가 화면에 완전히 그려진 직후 딱 한 번 실행됩니다. 그래서 '서버에서 초기 데이터 불러오기', '차트 라이브러리 초기화', '입력창에 자동 포커스 주기'를 여기에 둡니다. 서버 요청을 setup 최상단이 아니라 onMounted에 두는 이유는 '화면 뼈대를 먼저 그려 사용자에게 로딩 화면을 보여준 뒤 데이터를 채우기' 위함이라고 설명합니다. 반대편에는 onUnmounted가 있어 컴포넌트가 사라질 때 타이머 정리·이벤트 해제 같은 뒷정리를 합니다. onMounted는 import { onMounted } from 'vue' 로 가져와 콜백 함수를 넘기는 형태입니다.

왜 중요한가: 4일차에서 배울 API 데이터 로딩이 대부분 onMounted 안에서 일어납니다. '언제 데이터를 불러와야 하나'의 답이 바로 이 훅입니다. onMounted 안에서 setInterval로 1초마다 숫자를 올리다가, onUnmounted에서 clearInterval로 정리하는 예제를 보여 주면 두 훅의 짝을 확실히 각인시킬 수 있습니다.`},{h:"7교시 — 컴포저블(useXxx)로 로직을 함수로 빼내 재사용하기",body:`강의 흐름: 오전에 배운 Composition API의 진짜 위력이 여기서 나옵니다. setup 안에 모아 둔 '상태+함수 덩어리'를 별도 파일의 함수로 빼내면, 여러 컴포넌트가 그 함수를 불러다 똑같이 씁니다. 이 함수를 컴포저블이라 부르고, 관례상 이름을 use로 시작합니다(useCounter, useSearch처럼).

핵심 포인트: 컴포저블은 그냥 '반응형 상태를 만들어 돌려주는 보통 함수'입니다. composables/useCounter.js 안에서 ref로 count를 만들고 inc 함수를 만든 뒤 { count, inc }로 반환하면 끝입니다. 컴포넌트에서는 const { count, inc } = useCounter()로 꺼내 씁니다. 중요한 점은 컴포넌트마다 useCounter()를 호출하면 각자 독립된 count를 갖는다는 것(전역 공유가 아님)입니다. 전역 하나를 공유하려면 Pinia를, 로직만 재사용하려면 컴포저블을 쓴다는 경계선을 그어 줍니다. 이미 만들어진 컴포저블 모음집 VueUse(useMouse, useLocalStorage 등)를 소개하면 '바퀴를 다시 만들 필요 없다'는 감을 줍니다.

왜 중요한가: 같은 로직을 복사-붙여넣기로 여러 컴포넌트에 흩뿌리면 나중에 한 곳만 고쳐도 나머지가 깨집니다. 컴포저블로 한 번 만들어 여러 곳에서 부르면 '한 곳만 고치면 전부 반영'됩니다. 어제 만든 입력 로직을 useInput 컴포저블로 빼내 두 개의 다른 컴포넌트에서 재사용해 보이는 것으로 마무리하고, 8교시 미니 실습(목록·아이템 분리)으로 자연스럽게 넘어갑니다.`},{h:"컴포넌트 등록 2가지 — 지역 등록과 전역 등록 (교재 pp.123-124)",body:`자식 컴포넌트 등록 방법은 두 가지다.
지역(Local) 등록은 부모가 직접 import해서 template에서 내장 태그처럼 쓰는 방식으로 PascalCase·kebab-case 모두 허용된다.
전역(Global) 등록은 main.js에서 app.component('BaseButton', BaseButton)처럼 등록해 앱 어디서나 별도 절차 없이 쓰는 방식이며, 체이닝으로 이어 등록할 수도 있다.
학교에 비유하면 지역 등록은 우리 반 사물함의 준비물, 전역 등록은 교무실에 비치한 전교생 공용 준비물이다.
BaseButton·BaseInput처럼 어디서나 반복되는 기초 부품이 전역 등록의 대상이다.`},{h:"컴파일러 매크로 — defineProps·defineEmits가 import 없이 되는 이유 (교재 pp.130-139)",body:`defineProps()·defineEmits()·defineExpose()는 컴파일러 매크로(Compiler Macro)다 — 런타임이 아니라 빌드 시점에 Vue 컴파일러가 코드를 변환하는 특수 예약어라서 import 없이 script setup 안에서 즉시 호출할 수 있다.
props 정의에는 간단한 배열 표기법과 강력한 객체 표기법이 있는데, 객체 표기법은 type·required·default에 커스텀 validator까지 붙여 부모가 넘긴 데이터를 검문한다.
택배에 비유하면 배열 표기는 무엇이든 받는 문 앞 상자, 객체 표기는 크기·무게·내용물까지 검사하는 무인 택배함이다.
함정 하나 — Array·Object 타입의 default는 반드시 함수 형태(() => [])로 적어야 한다.
그리고 props는 읽기 전용(ReadOnly)이라 자식이 직접 고치면 에러가 나며, 바꾸려면 emit으로 부모에게 요청해야 한다.`},{h:"camelCase와 kebab-case — 컴포넌트 명명 규칙의 이유 (교재 pp.41·135·141)",body:`컴포넌트의 데이터는 camelCase로, 컴포넌트 태그의 속성은 kebab-case로 쓴다.
이유는 HTML 표준이 대소문자를 구분하지 못하고 전부 소문자로 인식하기 때문이다.
Vue 엔진이 JavaScript의 camelCase(cityName)를 HTML의 kebab-case(:city-name)로 자동 매핑해 주므로, 부모 템플릿에서는 :city-name으로 넘기고 자식의 defineProps 선언은 cityName으로 받으면 된다.
이벤트 타입명도 관례상 kebab-case(@select-city)로 적고, 컴포넌트 파일명은 두 단어 이상의 PascalCase를 권장한다.
나라마다 언어가 달라도 통역사가 자동 번역해 주듯, 각 영역의 표기 규칙만 지키면 연결은 Vue가 알아서 한다.`}]},realCodes:[{title:"UserItem.vue — props·emit·slot 을 쓰는 자식 컴포넌트",lang:"vue",code:`<script setup>
// 부모에게서 받을 데이터(props)의 이름과 타입을 선언한다
const props = defineProps({
  user: { type: Object, required: true } // user 객체는 반드시 받아야 한다
})
// 부모에게 올려보낼 수 있는 이벤트 이름들을 선언한다
const emit = defineEmits(['remove'])

// 삭제 버튼을 눌렀을 때 실행, 부모에게 remove 이벤트와 함께 회원 id 를 전달한다
function onRemove() {
  emit('remove', props.user.id) // 'remove' 신호 + 삭제할 회원의 id 를 올려보냄
}
<\/script>

<template>
  <!-- 회원 카드 한 장을 감싸는 영역 -->
  <div class="card">
    <!-- 부모가 내려준 이름을 출력 -->
    <strong>{{ user.name }}</strong>
    <!-- 부모가 내려준 이메일을 출력 -->
    <span>{{ user.email }}</span>
    <!-- 클릭하면 onRemove 실행 → 부모에게 삭제 신호 전달 -->
    <button @click="onRemove">삭제</button>
    <!-- 부모가 카드 안에 끼워넣고 싶은 추가 내용이 들어올 자리 -->
    <slot></slot>
  </div>
</template>

<style>
/* 카드에 테두리·여백을 줘 한 장처럼 보이게 한다 */
.card { border: 1px solid #ddd; padding: 8px; margin: 4px; }
</style>`,note:"defineProps 로 값을 받고 defineEmits 로 사건을 올려보내며 slot 으로 확장 지점을 연 자식 컴포넌트다."},{title:"App.vue — 부모가 목록을 관리하고 삭제를 처리",lang:"vue",code:`<script setup>
// 반응형 배열을 위해 ref 를 가져온다
import { ref } from 'vue'
// 방금 만든 자식 컴포넌트를 가져온다
import UserItem from './components/UserItem.vue'

// 회원 목록을 반응형 배열로 만든다(데이터의 주인은 이 부모다)
const users = ref([
  { id: 1, name: '김철수', email: 'kim@test.com' },
  { id: 2, name: '이영희', email: 'lee@test.com' }
])

// 자식이 올려보낸 remove 이벤트를 처리: 해당 id 만 빼고 새 배열로 교체
function removeUser(id) {
  users.value = users.value.filter(u => u.id !== id) // id 가 다른 회원만 남긴다
}
<\/script>

<template>
  <h2>회원 목록</h2>
  <!-- v-for 로 회원마다 UserItem 을 만든다, key 는 고유 id -->
  <UserItem
    v-for="u in users"
    :key="u.id"
    :user="u"
    @remove="removeUser"
  >
    <!-- slot 자리에 끼워넣는 내용: 회원 등급 안내 -->
    <em>일반 회원</em>
  </UserItem>
</template>`,note:"부모는 users 배열을 props 로 내려주고, 자식의 remove 이벤트를 받아 실제 삭제를 수행한다."},{title:"App.vue → Profile.vue: provide/inject로 사용자 정보 전달",lang:"vue",code:`<!-- ===== App.vue : 최상위에서 사용자 정보를 provide 한다 ===== -->
<script setup>
import { provide, ref } from 'vue'
import Profile from './components/Profile.vue'

// 로그인한 사용자 정보(실무에선 서버에서 받아옴)
const currentUser = ref({ name: '홍길동', role: '관리자' })
// 'user'라는 이름으로 트리 전체에 값을 내려놓는다(한 번만)
provide('user', currentUser)
<\/script>

<template>
  <!-- 중간에 아무리 많은 컴포넌트가 끼어 있어도 props를 넘길 필요가 없다 -->
  <Profile />
</template>

<!-- ===== components/Profile.vue : 깊숙한 자식이 inject로 바로 받는다 ===== -->
<script setup>
import { inject } from 'vue'
// App.vue가 provide한 'user'를 중간 단계를 건너뛰고 바로 주입받는다
const user = inject('user')
<\/script>

<template>
  <!-- 주입받은 사용자 이름을 표시 -->
  <p>안녕하세요, {{ user.name }}님 ({{ user.role }})</p>
</template>`,note:`provide는 부모가 한 번 값을 넣고, inject는 자손이 깊이에 상관없이 바로 꺼내 쓴다.
중간 컴포넌트를 거치는 props 릴레이가 사라지는 것이 핵심이다.`}],periods:["1교시 컴포넌트로 화면 쪼개기 (개념·실습)","2교시 props 로 부모→자식 데이터 내려주기 (실습)","3교시 emit 으로 자식→부모 이벤트 올려보내기 (실습)","4교시 slot 으로 내용 끼워넣기 (실습)","5교시 라이프사이클 훅과 onMounted (실습)","6교시 Composition API와 setup 패턴 (실습)","7교시 컴포저블(useXxx)로 로직 재사용 (실습)","8교시 미니 실습: 목록·아이템 컴포넌트 분리 (실습)"]},"vue-3":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 SPA와 라우팅 개념 이해 (개념)"},{time:"10:00–10:50",topic:"2교시 Vue Router 설치와 기본 라우트 (실습)"},{time:"11:00–11:50",topic:"3교시 router-link·router-view로 페이지 이동 (실습)"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 동적 파라미터와 중첩 라우트 (실습)"},{time:"14:00–14:50",topic:"5교시 네비게이션 가드로 접근 제어 (실습)"},{time:"15:00–15:50",topic:"6교시 Pinia 설치와 스토어 만들기 (실습)"},{time:"16:00–16:50",topic:"7교시 state·getters·actions 다루기 (실습)"},{time:"17:00–17:50",topic:"8교시 미니 실습: 목록·상세 라우팅 + 전역 장바구니 (실습)"}],practice:{title:"상품 목록·상세 라우팅 + Pinia 전역 장바구니",steps:["'npm install vue-router@4 pinia' 로 라우터와 상태관리 라이브러리를 설치한다","src/router/index.js 를 만들어 '/'(목록)와 '/product/:id'(상세) 두 라우트를 정의한다","main.js 에서 app.use(router) 와 app.use(createPinia()) 를 등록한다","App.vue 에 <router-view /> 를 두어 현재 라우트에 맞는 페이지가 표시되도록 한다",`ProductList.vue 에서 상품들을 v-for 로 출력하고 <router-link :to="'/product/'+p.id"> 로 상세로 이동하게 한다`,"ProductDetail.vue 에서 useRoute().params.id 로 어떤 상품인지 읽어 화면에 표시한다","stores/cart.js 에 defineStore 로 장바구니 스토어를 만들고 items 상태와 add 액션을 정의한다","상세 페이지의 '담기' 버튼이 cart 스토어의 add 를 호출하게 하고, 헤더에 담긴 개수를 표시한다","목록→상세 이동, 담기, 헤더 개수 증가가 새로고침 없이 동작하는지 브라우저에서 확인한다"],deliverable:"라우터 설정·두 페이지·Pinia 장바구니 스토어가 연동되어 동작하는 미니 앱과 화면 캡처"}},examples:[{title:"router-link 로 페이지 이동",lang:"vue",code:`<template>
  <!-- 클릭하면 새로고침 없이 '/' 화면으로 이동 -->
  <router-link to="/">홈</router-link>
  <!-- 클릭하면 1번 상품 상세로 이동 -->
  <router-link to="/product/1">1번 상품</router-link>
  <!-- 현재 주소에 맞는 컴포넌트가 이 자리에 그려진다 -->
  <router-view />
</template>`,note:"router-link 는 이동 버튼, router-view 는 화면이 그려지는 자리다."},{title:"Pinia 스토어 값 사용하기",lang:"vue",code:`<script setup>
// 장바구니 스토어를 가져온다
import { useCartStore } from '../stores/cart'
// 스토어 인스턴스를 얻는다(전역 데이터 접근)
const cart = useCartStore()
<\/script>

<template>
  <!-- 스토어의 count 게터로 담긴 개수를 헤더에 표시 -->
  <header>장바구니: {{ cart.count }}개</header>
</template>`,note:"어느 컴포넌트에서든 useCartStore 로 같은 데이터를 바로 읽을 수 있다."},{title:"Pinia 스토어 정의하기 (stores/cart.js)",lang:"javascript",code:`// src/stores/cart.js - 장바구니 전역 상태를 한 곳에서 관리한다
import { defineStore } from 'pinia'

// useCartStore: 어느 컴포넌트에서든 불러 쓰는 전역 스토어
export const useCartStore = defineStore('cart', {
  // state: 보관할 데이터(함수로 초기값을 돌려준다)
  state: () => ({
    items: [],  // 담은 상품 목록 [{ id, name, price }]
  }),
  // getters: state 를 가공해 읽는 계산값(원본이 바뀌면 자동 갱신)
  getters: {
    count: (state) => state.items.length,                          // 담은 개수
    total: (state) => state.items.reduce((s, i) => s + i.price, 0), // 합계 금액
  },
  // actions: state 를 바꾸는 함수(메서드)
  actions: {
    add(product) { this.items.push(product) },                       // 상품 담기
    remove(id) { this.items = this.items.filter(i => i.id !== id) },  // 상품 빼기
  },
})`,note:"state(데이터)·getters(계산값)·actions(변경함수) 세 칸만 채우면 앱 어디서든 공유하는 전역 스토어가 완성된다."},{title:"Router 가드로 로그인 안 한 사용자 막기 (beforeEach)",lang:"javascript",code:`// src/router/index.js - 라우터에 문지기를 달아 접근을 통제한다
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MyPage from '../views/MyPage.vue'
import Login from '../views/Login.vue'

const routes = [
  { path: '/', component: Home },
  // meta.requiresAuth 로 '로그인 필요' 표시를 붙여 둔다
  { path: '/mypage', component: MyPage, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
]

const router = createRouter({ history: createWebHashHistory(), routes })

// beforeEach: 모든 이동 직전에 실행되는 전역 가드(문지기)
router.beforeEach((to) => {
  const isLoggedIn = !!localStorage.getItem('token')  // 로그인 여부(예시)
  // 보호 페이지인데 로그인 안 했으면 로그인 화면으로 돌려보낸다
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { path: '/login' }  // 이 객체를 return 하면 그 주소로 리다이렉트된다
  }
  // 아무것도 return 하지 않으면(또는 true) 원래 가려던 곳으로 통과한다
})

export default router`,note:"beforeEach 가드는 화면이 그려지기 전에 로그인·권한을 검사해 보호가 필요한 페이지를 지켜 준다."},{title:"동적 경로 파라미터 받기 — /weather/:cityId + useRoute",lang:"vue",code:`<!-- 라우터 등록(src/router/index.js):
     { path: '/weather/:cityId', component: WeatherDetail }
     → 주소의 :cityId 자리에 도시 코드가 들어온다(예: /weather/seoul) -->
<script setup>
// 현재 활성 경로 정보를 읽는 useRoute 를 가져온다
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
const route = useRoute()                       // 현재 route 객체 획득
const cityId = route.params.cityId             // 주소의 :cityId 값을 꺼낸다
const temp = ref(null)                          // 기온을 담을 상태

// 화면이 뜨면 해당 도시 데이터를 불러온다(여기선 예시로 하드코딩)
onMounted(() => {
  const db = { seoul: 25, busan: 27 }          // 도시별 기온(예시)
  temp.value = db[cityId] ?? '정보 없음'         // 없으면 기본 문구
})
<\/script>

<template>
  <!-- 주소로 넘어온 도시 코드를 그대로 화면에 표시 -->
  <h2>도시: {{ cityId }}</h2>
  <p>현재 기온: {{ temp }}도</p>
</template>`,note:"URL 의 일부가 바뀌는 상세 페이지는 :cityId 처럼 동적 구간으로 등록하고, 컴포넌트에서 useRoute().params 로 그 값을 꺼낸다. 하나의 컴포넌트가 여러 도시를 재사용해 처리할 수 있다."},{title:"코드로 페이지 이동하기 — useRouter.push 와 query",lang:"vue",code:`<script setup>
// 코드로 페이지를 이동시키는 useRouter 를 가져온다
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()             // 라우터 조작 객체
const keyword = ref('')                // 검색어

// 검색 버튼 클릭 → 결과 화면으로 이동하며 검색어를 query 로 실어 보낸다
function search() {
  router.push({ path: '/result', query: { q: keyword.value } })
  // 이동 주소 예: /result?q=날씨  (도착 화면에서 route.query.q 로 꺼냄)
}
// 브라우저 뒤로가기와 동일하게 한 단계 뒤로
function goBack() { router.back() }
<\/script>

<template>
  <input v-model="keyword" placeholder="검색어" />
  <!-- router-link(선언형)와 달리, 조건 검사 뒤 코드로 이동할 때 쓴다 -->
  <button @click="search">검색 결과로 이동</button>
  <button @click="goBack">뒤로</button>
</template>`,note:'router-link 가 "클릭하면 바로 가는 링크"라면, router.push 는 "로그인·유효성 검사를 통과했을 때만 이동" 같은 조건부 이동에 쓰는 명령형 방식이다. query 로 검색어 같은 부가 정보를 함께 넘긴다.'},{title:"storeToRefs — Pinia 값을 꺼내도 반응성이 안 끊기게",lang:"vue",code:`<script setup>
// 전역 스토어와, 반응성을 지켜 꺼내는 storeToRefs 를 가져온다
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
// (X) const { count } = cart  → 반응성이 끊겨 값이 바뀌어도 화면이 안 변함
// (O) state·getters 는 storeToRefs 로 감싸야 반응형 연결이 유지된다
const { count, total } = storeToRefs(cart)
// 함수(actions)는 반응형 대상이 아니므로 그냥 구조분해해도 된다
const { add } = cart
<\/script>

<template>
  <!-- 스토어 값이 바뀌면 이 숫자들도 자동 갱신된다 -->
  <p>담긴 개수: {{ count }} / 합계: {{ total }}원</p>
  <!-- 버튼으로 담으면 위 숫자가 즉시 반응 -->
  <button @click="add({ id: 1, name: '사과', price: 3000 })">사과 담기</button>
</template>`,note:"스토어에서 state·getters 를 그냥 구조분해하면 반응성이 끊긴다. storeToRefs 로 감싸야 값이 바뀔 때 화면이 따라 갱신된다. 반면 actions(함수)는 반응형 대상이 아니라 그대로 꺼내 써도 된다."},{title:"라우트 지연 로딩(Lazy Loading)과 redirect 설정",lang:"javascript",code:`// src/router/index.js — 필요한 순간에만 코드를 내려받는 지연 로딩
import { createRouter, createWebHistory } from 'vue-router'
// 정적 import: 앱 시작과 동시에 메모리에 올라간다(첫 화면용에 적합)
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  // 동적 import: 이 주소에 실제로 들어갈 때에야 파일을 내려받는다
  // → 첫 로딩이 가벼워져 페이지가 많은 앱의 필수 최적화 기법
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
  // redirect: 옛 주소로 들어오면 새 주소로 자동으로 돌려보낸다
  { path: '/home', redirect: '/' },
]

// createWebHistory: 슬래시(/) 기반의 일반 주소 형태로 URL 을 관리한다
const router = createRouter({ history: createWebHistory(), routes })
export default router`,note:"component 에 컴포넌트를 바로 적으면 정적 로드, () => import(...) 함수로 적으면 방문 시점에 내려받는 지연 로드가 된다. 빌드하면 지연 로드 컴포넌트는 별도 js 파일로 쪼개져, 사용자가 첫 화면을 훨씬 빨리 만나게 된다."},{title:"push vs replace vs go — 이동 기록을 남길까 말까",lang:"vue",code:`<script setup>
// 코드로 페이지를 조종하는 useRouter 를 가져온다
import { useRouter } from 'vue-router'
const router = useRouter()

// push: 방문 기록(History)을 남기며 이동 → 뒤로가기로 돌아올 수 있다
function goDetail() { router.push('/weather/seoul') }

// replace: 기록을 남기지 않고 현재 페이지를 교체
// → 인증 만료 후 로그인 화면처럼 '뒤로가기로 못 돌아가야 하는' 이동에 쓴다
function forceLogin() { router.replace('/login') }

// go(-1): 브라우저 뒤로가기 버튼과 똑같이 한 단계 이전으로 이동
function goBack() { router.go(-1) }
<\/script>

<template>
  <button @click="goDetail">상세로 이동 (push)</button>
  <button @click="forceLogin">강제 교체 (replace)</button>
  <button @click="goBack">이전 화면으로 (go)</button>
</template>`,note:"push 와 replace 의 차이는 오직 '뒤로가기 기록을 남기느냐'다. 로그인 만료로 튕겨낸 화면에 뒤로가기로 다시 돌아오면 곤란하므로 이런 강제 이동에는 replace 를 쓰고, go(-1)/back() 은 브라우저 뒤로가기를 코드로 대신하는 명령이다."},{title:"Pinia Setup 스토어 — ref·computed 문법 그대로 스토어 만들기",lang:"javascript",code:`// src/stores/counter.js — 컴포넌트에서 쓰던 문법을 그대로 쓰는 Setup 방식
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 스토어 변수 이름은 use + 파일명 + Store 규칙으로 짓는다
export const useCounterStore = defineStore('counter', () => {
  // ref 로 선언하면 그대로 state(전역 공유 데이터)가 된다
  const count = ref(0)
  // computed 로 선언하면 getters(읽기 전용 계산값)가 된다
  const doubleCount = computed(() => count.value * 2)
  // 일반 함수로 선언하면 actions(상태 변경·비동기 통신 담당)가 된다
  function increment() { count.value++ }
  // return 으로 내보낸 것만 외부 컴포넌트가 쓸 수 있다(외부 개방 API)
  return { count, doubleCount, increment }
})

// 사용하는 쪽: const store = useCounterStore()
// {{ store.count }} / {{ store.doubleCount }} / @click="store.increment"`,note:"state/getters/actions 세 칸을 채우는 Options 방식과 결과는 같지만, Setup 방식은 컴포넌트에서 익힌 ref·computed·함수 문법을 그대로 재사용한다. ref=state, computed=getters, function=actions 로 일대일 매핑된다는 것이 핵심이다."},{title:"전역 설정 스토어 활용 — 온도 단위(℃/℉) 앱 전체 전환",lang:"vue",code:`<script setup>
// 단위 설정 스토어: state(unit), getters(unitSymbol), actions(toggleUnit)
import { computed } from 'vue'
import { useConfigStore } from '../stores/configStore'
const configStore = useConfigStore()
// 부모가 내려준 도시 데이터(원본 기온은 항상 섭씨 숫자)
const props = defineProps({ cityItem: Object })

// 화면 표시용 기온: 전역 단위 설정에 따라 실시간으로 변환된다
const displayTemp = computed(() => {
  const raw = props.cityItem.temp             // 원본 섭씨 값
  if (configStore.unit === 'fahrenheit') {
    return Math.round((raw * 9) / 5 + 32)     // 화씨 변환 공식
  }
  return raw                                   // 섭씨면 그대로 반환
})
<\/script>

<template>
  <!-- 변환된 기온 + 스토어 getter 가 주는 단위 기호(℃/℉) -->
  <p>{{ cityItem.name }}: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
  <!-- 어느 컴포넌트에서 눌러도 앱 전체의 표시 단위가 한꺼번에 바뀐다 -->
  <button @click="configStore.toggleUnit">단위 전환</button>
</template>`,note:"원본 데이터(섭씨)는 그대로 두고, 전역 스토어의 설정값 + computed 조합으로 '보여 주는 값'만 변환하는 것이 포인트다. 스토어 값이 바뀌면 이 computed 를 쓰는 모든 화면이 동시에 갱신되어, 설정 하나로 앱 전체가 일사불란하게 움직인다."}],concepts:[{term:"SPA(단일 페이지 앱)",desc:"페이지를 새로 불러오지 않고 자바스크립트로 화면만 바꿔 빠르게 이동하는 웹 앱 방식이다."},{term:"라우팅",desc:"주소(URL)에 따라 어떤 화면(컴포넌트)을 보여줄지 정하는 규칙이다."},{term:"router-link",desc:"페이지를 새로고침 없이 이동시키는 Vue 전용 링크 태그로, 화면에서는 <a> 처럼 보인다."},{term:"동적 파라미터",desc:"/product/:id 처럼 주소 일부를 변수로 받아 같은 화면에 다른 데이터를 띄우는 방법이다."},{term:"네비게이션 가드",desc:"페이지 이동 직전에 실행되어 로그인 여부 등을 검사해 이동을 막거나 허용하는 장치다."},{term:"Pinia",desc:"여러 컴포넌트가 함께 쓰는 데이터를 한곳에 모아 관리하는 Vue 공식 전역 상태 보관소다."},{term:"스토어(store)",desc:"Pinia에서 상태(state)·계산값(getters)·변경함수(actions)를 담는 데이터 창고다."},{term:"지연 로딩(lazy loading)",desc:`라우트의 component를 동적 import로 지정해 해당 컴포넌트가 필요한 순간에 로드하는 방식이다.
정적 import는 앱 시작 시점에 전부 메모리에 올린다 — 교재 라우터 과제의 첫 요구사항이기도 하다. (교재 pp.154·164)`},{term:"뷰엑스(Vuex)",desc:`Vue 2 시절의 상태관리 라이브러리로 Pinia의 전신이다.
Pinia는 Vue 3의 상태(state) 관리 라이브러리이며, 상태란 애플리케이션 렌더링에 영향을 줄 수 있는 값을 뜻한다. (교재 p.166)`}],detail:{topics:[{h:"Vue Router",items:["createRouter 로 라우트 정의","router-link·router-view","동적 파라미터 :id","중첩 라우트와 네비게이션 가드"]},{h:"Pinia 스토어",items:["defineStore 로 스토어 생성","state·getters·actions 3요소","여러 컴포넌트에서 공유","전역 데이터 추적의 용이함"]},{h:"SPA 흐름",items:["첫 로드 후 화면만 교체","주소와 화면의 매핑","props vs 전역 상태 선택 기준"]}],labs:[{title:"Lab 1. 두 페이지 라우팅 만들기",steps:["'npm install vue-router@4' 로 라우터를 설치한다","router/index.js 에 '/'(Home)와 '/about'(About) 라우트를 정의한다","main.js 에서 app.use(router) 를 등록한다","App.vue 상단에 router-link 두 개와 router-view 를 두고 이동을 확인한다"]},{title:"Lab 2. Pinia 카운터 스토어",steps:["'npm install pinia' 후 main.js 에서 app.use(createPinia()) 를 등록한다","stores/counter.js 에 defineStore 로 count 상태와 inc 액션을 만든다","두 개의 서로 다른 컴포넌트에서 같은 스토어를 import 한다","한쪽에서 inc 를 호출했을 때 다른 쪽 숫자도 함께 늘어나는지 확인한다"]},{title:"Lab 3. 동적 파라미터로 목록→상세 왕복 만들기",steps:["라우트에 { path: '/product/:id', component: ProductDetail } 를 추가한다",`ProductList.vue 에서 v-for 로 상품을 찍고 각 항목을 <router-link :to="'/product/' + p.id"> 로 감싼다`,"ProductDetail.vue 에서 const route = useRoute() 후 route.params.id 로 번호를 읽어 화면에 표시한다","watch(() => route.params.id, 불러오기함수) 를 걸어, 상세에서 다른 상품으로 바로 이동해도 데이터가 갱신되는지 확인한다",'상세 화면에 <router-link to="/">목록으로</router-link> 를 두어 왕복 이동이 새로고침 없이 되는지 본다']},{title:"Lab 4. 네비게이션 가드로 로그인 검문 붙이기",steps:["보호할 라우트에 meta: { requiresAuth: true } 를 달고, /login 라우트를 하나 만든다","로그인 상태를 흉내 낼 isLoggedIn 값(간단히 localStorage 또는 Pinia 스토어)을 둔다","router.beforeEach((to) => { ... }) 를 등록해 to.meta.requiresAuth 이면서 로그인 안 됐으면 return '/login' 을 반환한다","로그아웃 상태에서 주소창에 보호 경로를 직접 입력해 /login 으로 튕겨 나가는지 확인한다","isLoggedIn 을 true 로 바꾼 뒤 같은 경로로 정상 진입되는지 확인한다"]}],homework:["상품 목록·상세·장바구니에 '담은 상품 비우기' 액션을 추가하고, 헤더 개수가 0으로 돌아가는 동작을 캡처해 제출한다","네비게이션 가드(beforeEach)를 추가해 '/admin' 으로 갈 때 로그인 안 했으면 '/' 로 돌려보내도록 구현한다","교재 5장 과제(p.164) — 라우터 대시보드: 지연 로딩 + 네비게이션 바 + Home/Detail(router.push)/About 뷰","교재 6장 과제(p.172) — configStore: unit state·unitSymbol getter·toggleUnit action + UnitToggler 배치"]},theory:{theory:[{h:"SPA와 라우팅: 새로고침 없이 페이지를 바꾼다",body:`보통 웹사이트는 링크를 누르면 서버에서 새 HTML을 통째로 받아와 화면이 깜빡입니다.
SPA는 첫 화면만 한 번 받아오고, 그 뒤로는 자바스크립트가 필요한 부분만 바꿉니다.
그래서 페이지 전환이 매끄럽고 빠릅니다.

Vue Router는 '주소가 바뀌면 어떤 컴포넌트를 보여줄지' 정해 주는 안내원입니다.
'/' 주소에는 목록 화면을, '/product/3' 에는 3번 상품 상세 화면을 연결하는 식입니다.
사용자는 주소가 바뀌는 것처럼 보이지만 실제로는 서버를 다시 부르지 않고 화면만 갈아끼웁니다.`},{h:"전역 상태 관리: 왜 Pinia가 필요한가",body:`장바구니 개수처럼 여러 화면이 '같은 데이터'를 봐야 할 때가 있습니다.
이걸 props·emit 으로 컴포넌트마다 일일이 전달하면 금세 복잡해집니다.
특히 멀리 떨어진 컴포넌트끼리는 전달이 무척 번거롭습니다.

Pinia는 이런 공용 데이터를 '한 창고'에 모아 둡니다.
어느 컴포넌트든 그 창고에 직접 접근해 값을 읽거나 바꿀 수 있습니다.
마치 집안 어디서나 꺼내 쓰는 공용 냉장고와 같습니다.
그래서 데이터가 흩어지지 않고 한곳에서 관리되어 추적이 쉬워집니다.`},{h:"4교시 — 동적 파라미터와 중첩 라우트",body:`강의 흐름: 상품이 100개면 라우트를 100개 만들 수 없습니다. '/product/1'·'/product/2'는 모양이 같고 번호만 다르므로, 번호 자리를 변수로 비워 두는 것이 동적 파라미터입니다.

핵심 포인트: 라우트 정의에서 path를 '/product/:id'로 적으면 :id 부분이 변수 자리가 됩니다. 실제 주소 '/product/7'로 들어오면 컴포넌트 안에서 useRoute().params.id 로 '7'을 꺼내 그 상품 데이터를 불러옵니다. 주의할 점 하나 — 같은 상세 화면에서 '/product/7'에서 '/product/8'로 이동하면 컴포넌트가 재사용되어 onMounted가 다시 불리지 않습니다. 그래서 params.id 변화를 watch로 감시해 데이터를 다시 불러와야 한다는 실전 함정을 짚어 줍니다. 중첩 라우트는 '레이아웃 안에 화면이 들어가는' 구조입니다. 예를 들어 /mypage 안에 /mypage/orders·/mypage/profile 이 탭처럼 바뀌는 경우, 부모 라우트에 children 배열을 두고 부모 컴포넌트 안에 <router-view />를 한 번 더 놓으면 그 자리에 자식 화면이 그려집니다.

왜 중요한가: 목록→상세로 넘어가는 거의 모든 앱이 동적 파라미터를 씁니다. 중첩 라우트는 공통 헤더·사이드바를 유지한 채 본문만 바꾸는 대시보드형 화면의 표준 패턴입니다. 목록의 상품을 클릭해 :id 상세로 들어갔다가 목록으로 돌아오는 왕복을 라이브로 보여 줍니다.`},{h:"5교시 — 네비게이션 가드로 접근 권한 제어하기",body:`강의 흐름: '로그인하지 않은 사람이 주소창에 /admin을 직접 치면 어떻게 막을까?'라는 현실 문제로 시작합니다. 화면마다 검사 코드를 넣으면 지저분하니, 라우터가 '페이지를 이동하기 직전에' 한 번 검문하도록 하는 것이 네비게이션 가드입니다.

핵심 포인트: 가장 많이 쓰는 것은 전역 가드 router.beforeEach 입니다. 이 함수는 이동이 일어나기 직전에 자동 실행되며, 인자로 to(가려는 곳)와 from(떠나온 곳)을 받습니다. 안에서 로그인 여부를 검사해, 통과면 그냥 return true(또는 아무 반환 없이 통과), 막아야 하면 return '/login' 처럼 다른 경로를 반환해 강제로 돌려보냅니다. '보호가 필요한 라우트'는 meta: { requiresAuth: true } 를 라우트 정의에 달아 두고, 가드에서 to.meta.requiresAuth 로 검사하는 것이 깔끔한 관례입니다. 특정 페이지 하나에만 걸고 싶으면 그 라우트에 beforeEnter 를, 컴포넌트를 떠날 때 저장 안 한 입력을 경고하려면 onBeforeRouteLeave 를 쓴다는 것도 한 줄씩 소개합니다.

왜 중요한가: 접근 권한 제어는 실무 SPA의 필수 요소이고, 실라버스의 '사용자 접근 권한에 따른 라우팅 제어' 목표와 정확히 맞닿습니다. 로그인 상태를 흉내 낸 변수 하나(isLoggedIn)를 두고, 그 값에 따라 /admin 접근이 막히거나 열리는 것을 함께 실습합니다.`},{h:"7교시 — Pinia 3요소: state·getters·actions 확실히 나누기",body:`강의 흐름: 6교시에서 스토어를 만들었으니, 이제 스토어 안 세 칸의 역할을 명확히 구분합니다. 컴포넌트의 ref(상태)·computed(계산값)·함수(동작)가 그대로 스토어의 state·getters·actions로 대응된다고 연결해 주면 이해가 빠릅니다.

핵심 포인트: state는 스토어가 보관하는 원본 데이터로, 반드시 함수 형태 state: () => ({ items: [] }) 로 적습니다(각 사용에 독립된 초기값을 주기 위함). getters는 state로부터 자동 계산되는 값으로 computed와 같은 역할입니다 — 장바구니 총액·담긴 개수처럼 '원본이 바뀌면 알아서 다시 계산'됩니다. actions는 state를 바꾸는 유일한 통로로, 여기서 this.items 처럼 this로 자기 상태에 접근합니다. 비동기(서버 요청)도 actions 안에서 async/await로 처리합니다. '상태는 actions를 통해서만 바꾼다'는 원칙을 지키면 데이터가 어디서 왜 바뀌는지 추적이 쉬워진다는 점을 강조합니다. 컴포넌트에서 스토어 값을 구조분해하면 반응성이 끊기므로 storeToRefs 를 써서 꺼내야 한다는 실전 주의점도 한 줄 덧붙입니다.

왜 중요한가: 이 세 칸의 구분이 흐릿하면 스토어가 금세 엉킵니다. state=보관, getters=계산, actions=변경이라는 세 문장을 각인시키는 것이 목표입니다. 장바구니 스토어에 담기(add)·비우기(clear) actions와 총액(totalPrice) getter를 추가해, 컴포넌트에서 호출할 때 헤더의 개수·총액이 동시에 갱신되는 것을 보여 주고 8교시 미니 실습으로 넘어갑니다.`},{h:"Programmatic Navigation — 코드로 페이지를 이동시키는 법 (교재 pp.160-161)",body:`RouterLink 태그 없이 JavaScript 내부에서 페이지를 전환하는 방법으로, 로그인 성공 후 메인 이동 같은 상황에 쓴다.
useRouter()로 라우터 인스턴스를 확보한 뒤 router.push('/about')로 이동하고, name·params·query를 객체로 묶어 정밀 이동도 가능하다.
router.replace()는 push와 똑같이 새 경로로 가지만 History를 남기지 않아 뒤로가기를 눌러도 교체 전 경로로 돌아가지 않는다.
내비게이션에 비유하면 push는 경유지를 기록하며 가는 길 안내, replace는 기록을 지우고 갈아타는 이동이다.
그 밖에 router.go(-1)·back()·forward()로 브라우저 방문 기록을 앞뒤로 오갈 수 있다.`},{h:"Query String 라우팅 — 주소창에 검색 조건을 싣는다 (교재 p.159)",body:`URL 주소창 뒤 물음표(?)에 key=value 쌍으로 붙는 Query String(/weather?search=수원&page=2)을 Vue Router와 동기화하는 기법이다.
동적 파라미터와 달리 라우터 설정 파일에 변수 처리를 명시하지 않아도 자유롭게 확장할 수 있다.
컴포넌트 내부에서는 useRoute()로 route 객체를 받아 route.query.search로 값을 읽는다.
교재 예제는 onMounted 시점에 주소창에 search 값이 있으면 그 값으로 내부 검색어 상태를 복원한다 — 책갈피처럼 주소만 복사해 보내도 받은 사람이 같은 검색 결과 화면을 그대로 펼쳐본다.
검색어·페이지 번호처럼 새로고침해도 유지되어야 할 화면 조건을 담기에 적합하다.`},{h:"storeToRefs — Pinia에서 가장 자주 밟는 함정 (교재 p.171)",body:`Pinia 스토어에서 const { count } = counterStore처럼 구조분해할당을 하면 Vue 3 반응형 시스템(Proxy 연결)이 단절되어 화면이 갱신되지 않는다.
데이터 속성(state·getters)은 반드시 Pinia 내장 함수 storeToRefs로 감싸 꺼내야 반응형 연결이 보존되며, 함수인 actions만 일반 구조분해를 해도 된다.
콘센트에 비유하면 state를 그냥 꺼내는 것은 전선을 잘라 전등만 떼어오는 것이라 불이 안 들어오고, storeToRefs는 연장 코드를 꽂아 옮기는 것이라 전기(반응성)가 계속 흐른다.
교재가 "Frequent Mistakes"라는 제목으로 한 페이지를 통째로 할애한 실수 1순위 항목이다.`}]},realCodes:[{title:"router/index.js + stores/cart.js — 라우터와 전역 스토어",lang:"javascript",code:`// ----- router/index.js : 주소와 화면을 연결하는 라우터 -----
// 라우터를 만드는 함수와 history 모드 함수를 가져온다
import { createRouter, createWebHistory } from 'vue-router'
// 라우트에 연결할 두 페이지 컴포넌트를 가져온다
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'

// 주소(path)와 보여줄 컴포넌트를 짝지은 라우트 표를 만든다
const routes = [
  { path: '/', component: ProductList },              // 기본 주소는 상품 목록
  { path: '/product/:id', component: ProductDetail }  // :id 는 상품 번호 자리(동적 파라미터)
]

// 라우터 객체를 생성한다(history 모드 + 위에서 만든 라우트 표 사용)
const router = createRouter({
  history: createWebHistory(), // 주소창을 깔끔하게(# 없이) 쓰는 모드
  routes                       // 위에서 정의한 라우트 표 연결
})

// 만든 라우터를 다른 파일(main.js)에서 쓰도록 내보낸다
export default router

// ----- stores/cart.js : 장바구니 전역 스토어 -----
// 스토어를 정의하는 함수를 가져온다
import { defineStore } from 'pinia'

// 'cart' 라는 이름의 스토어를 정의한다(전역 어디서나 useCartStore 로 사용)
export const useCartStore = defineStore('cart', {
  // 보관할 상태: 담긴 상품 배열
  state: () => ({ items: [] }),
  // 자동 계산값: 담긴 상품 개수
  getters: {
    count: (state) => state.items.length // items 길이가 곧 담긴 개수
  },
  // 상태를 바꾸는 함수들
  actions: {
    add(product) {            // 상품을 장바구니에 담는다
      this.items.push(product) // items 배열 끝에 상품 추가
    }
  }
})`,note:"라우터는 주소→화면 연결을, Pinia 스토어는 어디서나 쓰는 장바구니 데이터를 담당한다."},{title:"ProductDetail.vue — 파라미터 읽기와 스토어 사용",lang:"vue",code:`<script setup>
// 현재 라우트 정보를 읽는 함수를 가져온다(주소의 :id 를 알기 위함)
import { useRoute } from 'vue-router'
// 방금 만든 장바구니 스토어를 가져온다
import { useCartStore } from '../stores/cart'

// 현재 라우트 객체를 얻는다
const route = useRoute()
// 장바구니 스토어 인스턴스를 얻는다
const cart = useCartStore()

// 주소의 :id 값을 읽어 상품 번호로 사용한다
const id = route.params.id
// 예시 상품 객체를 만든다(실무에선 서버에서 불러옴)
const product = { id, name: id + '번 상품', price: 1000 }

// 담기 버튼을 눌렀을 때 스토어의 add 액션을 호출한다
function addToCart() {
  cart.add(product) // 전역 장바구니에 이 상품을 담는다
}
<\/script>

<template>
  <!-- 어떤 상품인지 제목으로 보여준다 -->
  <h2>{{ product.name }}</h2>
  <!-- 가격을 표시한다 -->
  <p>가격: {{ product.price }}원</p>
  <!-- 클릭하면 addToCart 실행 → 전역 장바구니에 담김 -->
  <button @click="addToCart">장바구니 담기</button>
  <!-- 스토어의 count 게터로 현재 담긴 개수를 실시간 표시 -->
  <p>현재 담긴 개수: {{ cart.count }}</p>
  <!-- 목록으로 돌아가는 라우터 링크(새로고침 없이 이동) -->
  <router-link to="/">목록으로</router-link>
</template>`,note:"useRoute 로 주소의 id 를 읽고, 전역 cart 스토어에 담아 어느 화면에서나 개수를 공유한다."}],periods:["1교시 SPA와 라우팅 개념 이해 (개념)","2교시 Vue Router 설치와 기본 라우트 (실습)","3교시 router-link·router-view로 페이지 이동 (실습)","4교시 동적 파라미터와 중첩 라우트 (실습)","5교시 네비게이션 가드로 접근 제어 (실습)","6교시 Pinia 설치와 스토어 만들기 (실습)","7교시 state·getters·actions 다루기 (실습)","8교시 미니 실습: 목록·상세 라우팅 + 전역 장바구니 (실습)"]},"vue-4":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 비동기와 API 통신 개념 (개념)"},{time:"10:00–10:50",topic:"2교시 fetch·axios로 데이터 불러오기 (실습)"},{time:"11:00–11:50",topic:"3교시 로딩·에러 상태 처리 패턴 (실습)"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 UI Library — Element Plus로 컴포넌트·폼·테이블 붙이기 (실습)"},{time:"14:00–14:50",topic:"5교시 Modern JS(ES6+): 구조분해·전개·고차함수 (실습)"},{time:"15:00–15:50",topic:"6교시 ESLint·Prettier로 코드 품질 검사 설정 (실습)"},{time:"16:00–16:50",topic:"7교시 Vite 빌드와 정적 배포 (실습)"},{time:"17:00–17:50",topic:"8교시 최종 실습: SPA 완성·배포·점검 (실습)"}],practice:{title:"공개 API로 게시글을 불러오는 미니 SPA 완성·배포",steps:["'npm install axios' 로 HTTP 통신 라이브러리를 설치한다","프로젝트 루트에 .env 파일을 만들어 VITE_API_BASE=https://jsonplaceholder.typicode.com 를 적는다","src/api.js 에서 axios.create 로 baseURL 을 import.meta.env.VITE_API_BASE 로 설정한 인스턴스를 만든다","PostList.vue 의 onMounted 에서 api.get('/posts') 를 호출해 게시글 목록을 불러오고, 불러오는 동안 loading 을 true 로 둔다","통신 성공 시 데이터를 posts 에 담고, 실패 시 error 메시지를 화면에 표시한다(try/catch)","v-if 로 loading·error·정상 상태에 따라 다른 화면을 보여준다","글 작성 폼을 만들어 제목이 비어 있으면 '제목을 입력하세요' 경고를 띄우는 유효성 검사를 넣는다","목록·폼 UI를 Element Plus 컴포넌트(el-table·el-form 등)로 교체하고, 구조분해·전개 같은 ES6+ 문법으로 코드를 정리한 뒤 `npx eslint .` 로 검사해 지적사항을 고친다","'npm run build' 로 dist 폴더를 생성하고 'npm run preview' 로 빌드 결과를 확인한다","dist 폴더를 정적 호스팅(GitHub Pages 등)에 올려 실제 주소에서 동작을 확인한다","최종 동작 화면(목록·로딩·에러·폼)과 배포 주소를 캡처해 제출한다"],deliverable:"API 연동·로딩/에러 처리·폼 검증이 동작하는 미니 SPA와 배포된 URL, 화면 캡처"}},examples:[{title:"async/await 로 데이터 불러오기",lang:"javascript",code:`// HTTP 요청 라이브러리를 가져온다
import axios from 'axios'

// 사용자 정보를 비동기로 불러오는 함수
async function getUser() {
  // 1번 사용자 정보를 요청하고 응답을 기다린다
  const res = await axios.get('https://jsonplaceholder.typicode.com/users/1')
  // 받은 데이터에서 이름을 출력한다(예: Leanne Graham)
  console.log(res.data.name)
}

// 함수를 실행해 결과를 확인한다
getUser()`,note:"await 는 응답이 올 때까지 기다린 뒤 다음 줄로 넘어간다."},{title:"폼 유효성 검사",lang:"vue",code:`<script setup>
// 반응형 상태를 위해 ref 를 가져온다
import { ref } from 'vue'
// 입력값과 경고 메시지 상태
const title = ref('')
const warn = ref('')

// 제출 시 제목이 비었는지 검사하는 함수
function submit() {
  // 공백 제거 후 비어 있으면 경고를 띄우고 중단
  if (title.value.trim() === '') { warn.value = '제목을 입력하세요'; return }
  // 통과하면 경고를 지운다(실제로는 서버 전송)
  warn.value = ''
}
<\/script>

<template>
  <!-- 제목 입력창을 title 과 양방향 연결 -->
  <input v-model="title" placeholder="제목" />
  <!-- 제출 버튼: 클릭 시 submit 실행 -->
  <button @click="submit">등록</button>
  <!-- 경고가 있을 때만 빨간 문구 표시 -->
  <p v-if="warn" style="color:red">{{ warn }}</p>
</template>`,note:"입력값을 검사해 비어 있으면 서버 전송 전에 막아 준다."},{title:"Element Plus로 폼과 테이블을 빠르게 만들기",lang:"vue",code:`<script setup>
// 반응형 상태를 위해 ref 를 가져온다
import { ref } from 'vue'
// 알림 메시지 컴포넌트를 가져온다(Element Plus 제공)
import { ElMessage } from 'element-plus'

// 입력 폼과 양방향 연결할 상태(이름·이메일)
const form = ref({ name: '', email: '' })
// 등록된 사람들을 담을 테이블 데이터
const rows = ref([])

// 등록 버튼을 눌렀을 때 실행
function add() {
  // 이름이 비어 있으면 경고 알림을 띄우고 중단(Element Plus 알림)
  if (!form.value.name) { ElMessage.warning('이름을 입력하세요'); return }
  // 입력값을 테이블 배열에 추가(전개로 새 객체를 복사해 넣음)
  rows.value.push({ ...form.value })
  // 성공 알림을 띄운다
  ElMessage.success('등록되었습니다')
  // 다음 입력을 위해 폼을 비운다
  form.value = { name: '', email: '' }
}
<\/script>

<template>
  <!-- el-form: 미리 만들어진 폼 컨테이너 -->
  <el-form :inline="true">
    <!-- el-input: 검증된 입력창, v-model 로 상태와 연결 -->
    <el-input v-model="form.name" placeholder="이름" />
    <el-input v-model="form.email" placeholder="이메일" />
    <!-- el-button: type 으로 색을 지정, 클릭 시 add 실행 -->
    <el-button type="primary" @click="add">등록</el-button>
  </el-form>

  <!-- el-table: :data 에 배열만 넘기면 표가 자동 완성된다 -->
  <el-table :data="rows">
    <!-- 각 열은 el-table-column, prop 으로 어떤 필드를 보여줄지 지정 -->
    <el-table-column prop="name" label="이름" />
    <el-table-column prop="email" label="이메일" />
  </el-table>
</template>`,note:"main.js 에서 app.use(ElementPlus) 를 등록해 두면 el- 컴포넌트를 바로 쓸 수 있다. 직접 CSS 로 폼·표·알림을 만들 필요 없이 검증된 부품을 조합해 몇 분 만에 실무형 화면을 완성하는 것을 보여주는 데모다. el-input 도 결국 v-model 로 연결되어, 우리가 배운 데이터 바인딩 위에서 돈다는 점이 핵심이다."},{title:"Vue 코드에서 자주 쓰는 ES6+ 문법 한눈에",lang:"javascript",code:`// 서버에서 받아왔다고 가정한 사용자 데이터(일부 필드는 없을 수도 있음)
const user = { name: '김철수', email: 'kim@test.com', address: { city: '서울' } }
const users = [user, { name: '이영희', email: 'lee@test.com' }]

// (1) 구조분해 할당: 객체에서 필요한 값만 한 번에 꺼낸다
const { name, email } = user
console.log(name, email) // 김철수 kim@test.com

// (2) 전개 연산자: 기존 객체를 복사하며 일부만 바꿔 새 객체를 만든다(원본은 그대로)
const updated = { ...user, name: '홍길동' }
console.log(updated.name) // 홍길동

// (3) 화살표 함수 + 배열 고차함수 map: 목록을 가공한다(v-for 에 넘길 데이터 만들 때 사용)
const names = users.map(u => u.name)
console.log(names) // ['김철수', '이영희']

// (4) filter: 조건에 맞는 것만 골라 새 배열로
const kims = users.filter(u => u.name.startsWith('김'))
console.log(kims.length) // 1

// (5) 옵셔널 체이닝 + 널 병합: 중간 값이 없어도 에러 없이 안전하게 접근하고 기본값을 준다
const city = user?.address?.city ?? '도시 미상'
console.log(city) // 서울 (address 가 없었다면 '도시 미상')

// (6) 템플릿 리터럴: 백틱으로 변수를 문자열에 끼워 넣는다
console.log(\`\${name}님, 환영합니다\`) // 김철수님, 환영합니다`,note:"옛날 문법으로 길게 쓰던 것을 ES6+ 는 짧고 안전하게 표현한다. 특히 옵셔널 체이닝(?.)과 널 병합(??)은 API 응답처럼 값이 있을 수도 없을 수도 있는 데이터를 다룰 때 화면이 깨지는 것을 막아 주는 필수 문법이다. 이 여섯 가지가 Vue 컴포넌트 곳곳에 반복해서 등장한다."},{title:"비동기 로딩 상태 패턴",lang:"html",code:`<script setup>
import { ref, onMounted } from 'vue'
const items = ref([])
const loading = ref(true)   // 로딩 상태
const error = ref(null)     // 에러 상태

onMounted(async () => {     // 컴포넌트 마운트 시 1회 호출
  try {
    const res = await fetch('/api/items')
    if (!res.ok) throw new Error('요청 실패')
    items.value = await res.json()
  } catch (e) {
    error.value = e.message  // 사용자에게 보여줄 메시지
  } finally {
    loading.value = false    // 성공/실패 무관하게 로딩 종료
  }
})
<\/script>
<template>
  <p v-if="loading">불러오는 중…</p>
  <p v-else-if="error">{{ error }}</p>
  <ul v-else><li v-for="i in items" :key="i.id">{{ i.name }}</li></ul>
</template>`,note:"loading/error/data 3-상태를 분리해 UI를 안정적으로 만든다. finally 로 로딩 해제를 보장."},{title:"axios.create 로 공통 통신 인스턴스 + 인터셉터 만들기",lang:"javascript",code:`// src/api/http.js : 프로젝트 공통 통신 인스턴스를 한 번 만들어 재사용한다
import axios from 'axios'

// 공통 분모(주소·타임아웃)를 미리 박아 커스텀 인스턴스를 뽑아낸다
const http = axios.create({
  baseURL: 'https://api.example.com', // 매번 긴 주소를 안 써도 됨
  timeout: 5000,                      // 5초 넘으면 실패 처리
})

// 요청 인터셉터: 모든 요청이 나가기 직전 가로채 토큰을 헤더에 자동으로 붙인다
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')      // 저장된 로그인 토큰
  if (token) config.headers.Authorization = 'Bearer ' + token
  return config                                      // config 를 돌려줘야 요청이 진행됨
})

// 응답 인터셉터: 성공은 data 만 통과, 실패는 공통으로 로그를 남긴다
http.interceptors.response.use(
  (res) => res.data,                                 // 응답에서 실제 데이터만 반환
  (err) => { console.error('API 오류:', err.message); return Promise.reject(err) },
)

export default http   // 이제 어디서든 import 해 http.get('/users') 로 쓴다`,note:"axios.create 로 baseURL·타임아웃을 한 번만 정하고, 인터셉터로 토큰 첨부와 에러 처리를 모든 요청에 공통 적용한다. 컴포넌트마다 반복하던 설정이 사라진다."},{title:"HTTP Method 로 CRUD 4종 실습 (GET·POST·PUT·DELETE)",lang:"javascript",code:`// 앞서 만든 공통 인스턴스를 가져와 CRUD 를 실습한다(async 함수 안에서 실행)
import http from './api/http'

// (Read)   GET: 목록을 읽어온다(서버 데이터는 바꾸지 않음)
const list = await http.get('/cities')

// (Create) POST: 새 자원을 등록한다(두 번째 인자가 보낼 body)
await http.post('/cities', { name: '대전', temp: 24 })

// (Update-전체) PUT: 기존 자원을 통째로 갈아 끼운다
await http.put('/cities/1', { name: '서울', temp: 26 })

// (Update-부분) PATCH: 특정 필드만 정밀 수정한다
await http.patch('/cities/1', { temp: 27 })

// (Delete) DELETE: 특정 자원을 삭제한다
await http.delete('/cities/1')`,note:"HTTP Method 가 곧 데이터베이스 CRUD 다 — GET=조회, POST=생성, PUT/PATCH=수정, DELETE=삭제. REST 에서 주소(URI)는 /cities 처럼 명사로만 쓰고 행위는 Method 로 표현한다."},{title:"Vite 빌드와 배포 — dist 생성과 base 경로 맞추기",lang:"javascript",code:`// vite.config.js : 빌드·배포 환경 설정 파일
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // base: 배포 경로의 기준점.
  //  - 루트/커스텀 도메인이면 '/'
  //  - GitHub Pages 하위경로(아이디.github.io/레포명/)면 '/레포명/'
  // 이 값이 안 맞으면 빌드 후 JS·CSS 자산이 404 나며 흰 화면이 뜬다
  base: '/skala-vue/',
})

// --- 터미널 흐름 ---
// npm run dev     : 개발 서버(localhost:5173), 저장 즉시 반영(HMR)
// npm run build   : dist 폴더로 압축·최적화된 정적 파일 생성(실제 올릴 결과물)
// npm run preview : 빌드 결과를 실제처럼 미리보기`,note:"npm run build 는 소스를 압축·최적화해 dist 폴더를 만든다. GitHub Pages 하위경로에 올릴 때 base 를 레포명으로 맞추지 않으면 자산 경로가 어긋나 화면이 하얗게 뜨는 대표적 실수가 난다."},{title:"환경변수(.env)와 import.meta.env — 서버 주소를 코드 밖으로",lang:"vue",code:`<script setup>
// Vite 는 프로젝트 루트의 .env 파일들을 자동으로 읽어 들인다
//   .env.staging    → VITE_API_URL=https://api-stage.example.com
//   .env.production → VITE_API_URL=https://api-prod.example.com
// 규칙: VITE_ 로 시작하는 변수만 화면 코드로 노출된다(보안 장치)

// import.meta.env 로 현재 빌드 모드에 주입된 값을 읽는다
const apiUrl = import.meta.env.VITE_API_URL
console.log('현재 주입된 API 서버 주소:', apiUrl)
<\/script>

<template>
  <!-- staging 으로 빌드하면 stage 주소, production 이면 prod 주소가 보인다 -->
  <p>연동 API 서버: {{ apiUrl }}</p>
</template>

<!-- package.json 스크립트에 --mode 를 붙여 환경을 골라 빌드한다
  "build:staging":    "vite build --mode staging"
  "build:production": "vite build --mode production"
소스 수정 없이 명령어만 바꿔 검증 서버와 실서버 주소를 스위칭한다 -->`,note:"API 키·서버 주소 같은 설정값을 소스에 하드코딩하면 Git 에 노출되고, 서버가 바뀔 때마다 코드를 고쳐야 한다. .env 파일로 격리하면 빌드 명령의 --mode 옵션만으로 검증/상용 환경을 오갈 수 있고, VITE_ 접두사 규칙이 민감 변수의 실수 노출을 막아 준다."},{title:"ESLint 커스텀 규칙 — == 금지하고 === 강제하기",lang:"javascript",code:`// eslint.config.js — 프로젝트 전체에 적용할 나만의 검사 규칙 추가
// (배열에서 아래에 둘수록 앞서 로드된 기본 규칙을 덮어쓴다)
export default [
  // ...js 추천 규칙, Vue 필수 규칙 등 기본 세트가 먼저 오고
  {
    name: 'app/custom-rules',   // 규칙 묶음의 식별자 이름(선택)
    rules: {
      'eqeqeq': ['error', 'always'],   // == 금지, === 강제(암묵적 형변환 버그 차단)
      'no-unused-vars': 'warn',        // 선언만 하고 안 쓴 변수는 경고 처리
      'no-console': 'off',             // 학습 편의를 위해 console.log 허용
      'vue/multi-word-component-names': 'off',  // 한 단어 컴포넌트명 허용
    },
  },
]

// 동작 확인 3단계:
// 1) 코드에 if (userAge == 20) 처럼 느슨한 비교를 일부러 넣고 저장
// 2) 에디터에 빨간 물결과 "Expected '===' and instead saw '=='" 툴팁 확인
// 3) 터미널에서 npm run lint 로 프로젝트 전체를 일괄 점검`,note:"ESLint 는 코드를 실행하지 않고도 오타·미사용 변수·위험한 패턴을 잡아 주는 정적 분석 도구다. 자바스크립트는 문법 오류가 있어도 배포가 되어 버리는 인터프리터 언어라, CI 에 lint 를 걸어 결함 코드가 상용에 나가는 것을 자동 차단하는 것이 실무 표준이다."},{title:"ElMessageBox 확인 팝업과 el-progress 게이지 바",lang:"vue",code:`<script setup>
import { ref } from 'vue'
// 확인 팝업과 토스트 알림(Element Plus 가 JS 호출형으로 제공)
import { ElMessage, ElMessageBox } from 'element-plus'
const progress = ref(0)   // 게이지 진행률(0~100)

// 구식 confirm() 을 대체하는 세련된 최종 확인 팝업
function confirmDelete() {
  ElMessageBox.confirm('파일을 영구 삭제할까요?', '최종 확인', { type: 'warning' })
    .then(() => ElMessage.success('삭제되었습니다'))   // 확인을 누르면 실행
    .catch(() => ElMessage.info('취소되었습니다'))     // 취소를 누르면 실행
}
// 다운로드 시뮬레이션: 0.4초마다 게이지를 20씩 채운다
function startDownload() {
  progress.value = 0
  const timer = setInterval(() => {
    progress.value += 20
    if (progress.value >= 100) { clearInterval(timer); ElMessage.success('완료!') }
  }, 400)
}
<\/script>

<template>
  <el-button type="danger" @click="confirmDelete">파일 삭제</el-button>
  <el-button @click="startDownload">다운로드 시작</el-button>
  <!-- 진행률 숫자만 넘기면 애니메이션 게이지 바가 자동으로 그려진다 -->
  <el-progress :percentage="progress" />
</template>`,note:"브라우저 기본 confirm() 은 못생기고 커스텀이 안 되지만, ElMessageBox.confirm 은 Promise 를 돌려줘 확인은 then, 취소는 catch 로 갈라 처리한다. el-progress 는 percentage 값 하나로 진행률 UI 를 완성하는, 삭제 확인·다운로드 표시 같은 실무 단골 패턴이다."},{title:"Promise .then 체이닝 vs async/await — 콘솔 순서로 보는 차이",lang:"javascript",code:`// 같은 통신을 두 가지 문법으로 — 콘솔에 찍히는 번호 순서에 주목!
import axios from 'axios'
const URL = 'https://jsonplaceholder.typicode.com/posts/1'

// 방법1) .then 체이닝: 요청만 걸어두고 다음 줄로 먼저 내려간다
function withThen() {
  console.log('1. 통신 시작')
  axios.get(URL)
    .then((res) => console.log('3. 데이터 도착:', res.data.title))  // 성공 시
    .catch((err) => console.error('에러 발생:', err))              // 실패 시
  console.log('2. 요청 직후 라인')   // 데이터보다 이 줄이 먼저 찍힌다!
}

// 방법2) async/await: 응답이 올 때까지 기다렸다가 다음 줄로 — 위에서 아래로 읽힌다
async function withAwait() {
  console.log('1. 통신 시작')
  try {
    const res = await axios.get(URL)              // 도착할 때까지 대기
    console.log('2. 데이터 도착:', res.data.title)
  } catch (err) {
    console.error('에러 발생:', err)               // 실패는 정석 try/catch 로
  }
  console.log('3. 통신이 다 끝난 후 라인')          // 1→2→3 순서대로 찍힌다
}`,note:".then 방식은 요청을 걸어 두고 아래 코드가 먼저 실행되어 로그가 1→2→3 순서로 어긋나 보이지만, await 는 응답을 기다렸다가 진행해 위에서 아래로 정직하게 읽힌다. 그래서 가독성과 유지보수 면에서 async/await + try/catch 가 실무 표준이 되었다."}],concepts:[{term:"비동기(async)",desc:"결과를 기다리는 동안 멈추지 않고 다른 일을 하다가 끝나면 받아오는 처리 방식이다."},{term:"API",desc:"다른 서버에 데이터를 요청하고 받아오는 약속된 창구로, 주소로 요청하면 데이터를 돌려준다."},{term:"axios",desc:"API 요청을 간편하게 보내고 응답을 받는 인기 자바스크립트 라이브러리다."},{term:"async/await",desc:"비동기 코드를 위에서 아래로 읽기 쉽게 쓰게 해 주는 문법으로, await 는 결과를 기다린다."},{term:"로딩·에러 상태",desc:"데이터를 불러오는 중·실패·성공을 구분해 사용자에게 알맞은 화면을 보여주는 처리다."},{term:"환경변수",desc:"API 주소·키처럼 환경마다 다른 값을 코드 밖 .env 파일에 분리해 두는 설정값이다."},{term:"빌드·배포",desc:"개발용 코드를 브라우저용 정적 파일로 압축(빌드)해 서버에 올려 공개(배포)하는 과정이다."},{term:"옵셔널 체이닝(optional chaining, ?.)",desc:`점(.) 왼쪽이 null·undefined면 하위 속성으로 진입하지 않고 에러 없이 undefined를 반환하는 ES11(2020) 문법이다.
깊은 객체 참조 시 프로그램이 뻗지 않게 보호한다 — 교재가 "실무 빈도 극상"으로 표기한 항목. (교재 pp.219·222)`},{term:"널 병합 연산자(nullish coalescing, ??)",desc:`좌항이 null 또는 undefined일 때만 우항의 기본값을 반환하는 ES11 연산자다.
과거의 논리합(||)은 숫자 0이나 빈 문자열 같은 Falsy 값까지 기본값으로 덮어버리는 버그를 유발했다. (교재 p.223)`},{term:"트리 셰이킹(tree-shaking)",desc:"npm run build 시 Rollup 엔진이 프로젝트 소스를 전부 뒤진 뒤 쓰이지 않는 코드를 털어내고 압축된 정적 파일(dist)을 만드는 최적화 과정이다. (교재 p.31)"}],detail:{topics:[{h:"API 통신",items:["fetch vs axios","async/await 문법","GET·POST 요청","응답 데이터 화면에 반영"]},{h:"상태·검증",items:["loading·error·success 3상태","try/catch/finally","폼 유효성 검사","사용자 피드백 표시"]},{h:"빌드·배포",items:[".env 환경변수와 VITE_ 접두사","npm run build 로 dist 생성","npm run preview 확인","정적 호스팅 배포","ESLint: 문법 오류·안티패턴을 자동 검출해 실수 예방","Prettier: 저장 시 코드 서식(들여쓰기·따옴표)을 자동 정리해 팀 스타일 통일","npm run lint로 검사, 에디터 저장 시 자동 포맷 설정","vite.config.js에서 별칭(@ → src)·server 포트·base 경로 설정","import.meta.env.VITE_ 접두사 환경변수의 빌드 시 주입 원리"]},{h:"UI 라이브러리 Element Plus",items:["npm install element-plus로 설치, main.js에서 app.use(ElementPlus) 등록","el-button·el-input·el-table 등 미리 만들어진 공통 컴포넌트 사용","직접 CSS를 짜지 않고 검증된 UI로 화면 생산성 향상","아이콘·폼·다이얼로그 같은 실무 빈발 컴포넌트"]},{h:"Modern JavaScript(ES6+) 핵심 문법",items:["구조분해 할당: const {name, email} = user / const [first] = arr","전개·나머지: {...obj}, [...arr], function(...args)","화살표 함수와 짧은 반환","템플릿 리터럴 백틱 문자열","import/export 모듈 시스템","옵셔널 체이닝 user?.address?.city 와 null 병합 ??","배열 고차함수 map·filter·reduce·find"]}],labs:[{title:"Lab 1. 공개 API 목록 불러오기",steps:["'npm install axios' 로 axios 를 설치한다","onMounted 안에서 axios.get('https://jsonplaceholder.typicode.com/posts') 를 호출한다","응답 res.data 를 ref 배열에 담는다","v-for 로 제목 목록을 화면에 출력한다"]},{title:"Lab 2. 빌드하고 미리보기",steps:["터미널에서 'npm run build' 를 실행한다","생성된 dist 폴더 안 파일들을 확인한다","'npm run preview' 로 빌드 결과를 로컬에서 열어본다","개발 모드와 빌드 결과가 동일하게 보이는지 확인한다"]},{title:"Lab 3. Element Plus로 폼·테이블 5분 만에 만들기",steps:["npm install element-plus로 설치하고 main.js에서 app.use(ElementPlus)를 등록한다","el-form에 el-input 두 개와 el-button을 배치한다","입력 결과를 el-table로 표시해 화면이 빠르게 완성되는지 확인한다"]},{title:"Lab 4. Vue 코드에 자주 쓰는 ES6+ 연습",steps:["props를 구조분해 할당으로 받아 쓴다","배열을 map으로 돌려 목록을 렌더링한다","옵셔널 체이닝(user?.address?.city)으로 안전하게 값에 접근한다"]},{title:"Lab 5. ESLint·Prettier 붙이고 저장 시 자동 정리 확인",steps:["ESLint·Prettier를 설치하고 설정 파일을 추가한다","일부러 들여쓰기·따옴표를 흩뜨린 코드를 작성한다","파일을 저장했을 때 서식이 자동으로 정리되는지 확인한다","npm run lint로 남은 경고를 확인하고 고친다"]}],homework:["미니 SPA에 '글 상세' 라우트를 추가해 목록의 제목을 클릭하면 해당 글 본문을 API로 불러와 보여주도록 완성하고 배포 주소를 제출한다","로딩 중에는 스피너(회전 아이콘)나 '잠시만 기다려 주세요' 화면을 추가해 사용자 경험을 개선한다","교재 7장 과제(p.187) — Axios 설치 + OpenWeatherMap API Key 발급·실데이터 연동","교재 10장 실습(pp.246-249) — ESLint eqeqeq 검출·Prettier 포맷·.env.staging 분리·dist 해시 분석"]},theory:{theory:[{h:"비동기 통신: 기다리되 멈추지 않는다",body:`API로 데이터를 받아오는 데는 약간의 시간이 걸립니다.
이때 화면이 멈춰 있으면 사용자는 답답함을 느낍니다.
그래서 자바스크립트는 '비동기'로 처리합니다.
요청을 보내 두고 화면은 계속 움직이다가, 데이터가 도착하면 그때 화면을 채웁니다.

코드에서는 async/await 문법으로 이를 표현합니다.
await 를 붙이면 '결과가 올 때까지 이 줄에서 기다렸다가 다음으로 넘어가라'는 뜻입니다.
마치 식당에서 주문 번호표를 받고 자리에 앉아 다른 일을 하다가, 번호가 불리면 음식을 받으러 가는 것과 같습니다.`},{h:"로딩·에러 처리와 배포까지",body:`실무 화면은 세 가지 상태를 모두 챙겨야 합니다.
불러오는 중(로딩), 실패(에러), 성공(데이터 표시)입니다.
로딩 중에는 '잠시만요'를, 실패하면 '문제가 생겼어요'를 보여줘야 사용자가 당황하지 않습니다.
이를 try/catch 와 v-if 로 구분해 처리합니다.

완성된 앱은 마지막에 'npm run build' 로 압축해 dist 폴더를 만듭니다.
이 폴더를 GitHub Pages 같은 정적 호스팅에 올리면 누구나 접속할 수 있는 진짜 웹사이트가 됩니다.
이렇게 기획-구현-배포의 한 사이클을 완주하는 것이 이 과정의 목표입니다.`},{h:"4교시 — 폼 입력과 유효성 검사(왜 화면에서 먼저 막나)",body:`강의 흐름: 사용자가 빈 제목이나 잘못된 이메일을 그대로 서버에 보내면 낭비이고 에러의 원인이 됩니다. 그래서 '서버에 보내기 전에 화면에서 먼저 검사'하는 것이 폼 유효성 검사입니다. 어제 배운 v-model로 입력값을 상태에 담아 두었으니, 그 상태를 제출 직전에 점검하는 흐름입니다.

핵심 포인트: 검사는 크게 두 시점입니다. 제출 시 검사 — submit 함수 첫머리에서 title.value.trim()이 비었는지, 이메일에 @가 있는지 등을 if로 확인하고, 어긋나면 경고 메시지 상태를 채운 뒤 return으로 전송을 막습니다. 실시간 검사 — watch나 computed로 입력이 바뀔 때마다 에러 메시지를 갱신해 사용자가 타이핑하는 동안 바로 피드백을 줍니다. 화면에서는 v-if로 '에러가 있을 때만' 빨간 문구를 보여 주고, 에러가 있으면 제출 버튼을 :disabled로 비활성화하는 패턴을 함께 익힙니다. 다만 '화면 검사는 편의일 뿐, 진짜 보안 검사는 서버에서 또 한다'는 원칙을 반드시 강조합니다(화면 검사는 사용자가 우회할 수 있음).

왜 중요한가: 모든 가입·글쓰기·결제 폼에 유효성 검사가 들어갑니다. '어긋나면 막고 알려 준다'는 흐름을 몸에 익히는 것이 목표입니다. 제목 필수·이메일 형식 두 규칙을 건 폼을 만들어, 조건을 어길 때 버튼이 비활성화되고 안내가 뜨는 것을 실습합니다.`},{h:"5교시 — 환경변수와 API 베이스 주소 분리(.env)",body:`강의 흐름: 개발할 때는 API 주소가 localhost:3000 이지만, 배포하면 진짜 서버 주소로 바뀝니다. 이 주소를 코드 여기저기에 직접 박아 두면 환경이 바뀔 때마다 코드를 뒤져 고쳐야 합니다. 환경변수는 이렇게 '환경마다 달라지는 값'을 코드 밖 .env 파일로 빼내는 것입니다.

핵심 포인트: Vite에서는 프로젝트 루트에 .env 파일을 만들고, 반드시 VITE_ 접두사를 붙여 VITE_API_BASE=https://api.example.com 처럼 적습니다(접두사가 없으면 브라우저 코드에서 안 보임 — 실수 방지 장치). 코드에서는 import.meta.env.VITE_API_BASE 로 읽습니다. 이 값은 빌드하는 순간 코드 안에 문자열로 박혀 들어간다(런타임에 파일을 읽는 게 아님)는 원리를 설명합니다. .env.development·.env.production 처럼 환경별 파일을 나눌 수 있고, .env는 비밀 값을 담으므로 .gitignore에 넣어 깃에 올리지 않는다는 실무 규칙을 강조합니다. axios.create({ baseURL: import.meta.env.VITE_API_BASE }) 로 공통 인스턴스를 한 번 만들어 두면, 요청마다 긴 주소를 반복하지 않고 경로만 적으면 된다는 이점을 보여 줍니다.

왜 중요한가: 실라버스의 '.env 환경 분리' 목표에 직결되고, 6교시 미니 SPA·7교시 배포로 그대로 이어집니다. API 주소를 .env로 빼서 개발/배포 주소를 한 줄 바꾸는 것만으로 전환되는 구조를 만들어 보이는 것이 핵심 실습입니다.`},{h:"UI 라이브러리 Element Plus로 화면 생산성 높이기 (교재 8장)",body:`강의 흐름: 버튼·입력창·테이블·다이얼로그를 매번 CSS로 직접 예쁘게 만들려면 시간이 많이 듭니다. UI 라이브러리는 '검증된 공통 컴포넌트 모음'으로, 가져다 쓰기만 하면 일관된 디자인이 완성됩니다. Vue 생태계에서 널리 쓰는 Element Plus를 예로 듭니다.

핵심 포인트: 설치는 npm install element-plus 이고, main.js에서 import ElementPlus 후 app.use(ElementPlus) 한 번이면 전역 등록이 끝나 어느 컴포넌트에서든 el- 컴포넌트를 씁니다. el-button·el-input·el-table·el-form·el-dialog 처럼 el- 접두사가 붙은 태그가 미리 만들어진 부품입니다. 각 부품은 props로 동작을 조절하고(type='primary'로 색, :data로 테이블 데이터), 어제 배운 slot으로 내부 내용을 채웁니다 — 즉 UI 라이브러리도 결국 우리가 배운 props/slot 위에서 돈다는 점을 연결해 줍니다. 아이콘·다이얼로그·메시지 알림(ElMessage) 같은 실무 빈발 기능이 이미 들어 있어 화면을 몇 배 빠르게 만듭니다.

왜 중요한가: 실라버스의 'UI 라이브러리 이식·공통 컴포넌트 규격 활용으로 생산성 향상' 목표가 이것입니다. 직접 CSS로 만든 폼과, el-form으로 5분 만에 만든 폼을 나란히 보여 주며 생산성 차이를 체감시킵니다. el-form에 el-input 두 개와 el-button을 배치하고, 입력 결과를 el-table로 뿌리는 미니 예제로 이어집니다.`},{h:"Modern JavaScript(ES6+) 핵심 문법 — Vue 코드가 이렇게 짧은 이유 (교재 9장)",body:`강의 흐름: 지금까지 본 Vue 예제에 이미 화살표 함수·구조분해·전개 연산자가 잔뜩 들어 있었습니다. 이 교시는 '왜 그렇게 썼는지'를 되짚어 최신 자바스크립트 문법을 정리하는 시간입니다. 문법 자체가 목적이 아니라, Vue 코드를 읽고 짧게 쓰기 위한 도구로 접근합니다.

핵심 포인트: (1) 구조분해 할당 — const { name, email } = user 로 객체에서 필요한 값만 한 번에 꺼내고, props나 컴포저블 반환값을 받을 때 매일 씁니다. (2) 전개/나머지 — [...arr, 새값] 으로 배열을 복제하며 추가하고(반응형 배열을 통째로 교체할 때 유용), {...obj, done: true} 로 객체 일부만 바꿔 새 객체를 만듭니다. (3) 화살표 함수 — const inc = () => count.value++ 처럼 짧게 쓰며 콜백에 주로 씁니다. (4) 템플릿 리터럴 — 백틱으로 \`\${name}님 환영\` 처럼 변수를 문자열에 끼워 넣습니다. (5) 옵셔널 체이닝·널 병합 — user?.address?.city 로 중간이 없어도 에러 없이 안전하게 접근하고, val ?? '기본값' 으로 없을 때만 기본값을 씁니다(API 응답 다룰 때 필수). (6) 배열 고차함수 map·filter·find — v-for에 넘길 목록을 가공하는 핵심 도구입니다. (7) import/export 모듈로 파일을 나눠 쓰는 것도 짚습니다.

왜 중요한가: 실라버스의 'ES6+ 고급 명세 마스터로 최적화된 프론트엔드 코딩 역량'에 해당합니다. 같은 로직을 옛날 문법과 ES6+로 나란히 써 비교하면 왜 현대 코드가 짧고 안전한지 한눈에 보입니다. props 구조분해·map 렌더링·옵셔널 체이닝 세 가지를 실제 Vue 컴포넌트에 적용해 보는 것으로 마무리합니다.`},{h:"ESLint·Prettier로 코드 품질 지키기 (교재 10장 Vite 빌드 및 실무 배포)",body:`강의 흐름: 팀으로 개발하면 사람마다 들여쓰기·따옴표·세미콜론 습관이 달라 코드가 뒤죽박죽이 되고, 사소한 실수(선언만 하고 안 쓴 변수, 오타 난 함수명)가 버그로 이어집니다. 이 두 도구가 그 문제를 자동으로 잡아 줍니다. 역할이 다르므로 짝으로 씁니다.

핵심 포인트: ESLint는 '문법 오류와 안티패턴을 검사하는 감시자'입니다 — 쓰지 않는 변수, 정의 안 된 이름, 위험한 패턴을 빨간 줄로 알려 줍니다. Vue 전용 규칙(eslint-plugin-vue)이 있어 template의 실수까지 잡습니다. Prettier는 '서식을 자동으로 정리하는 미용사'입니다 — 들여쓰기·따옴표·줄바꿈을 정해진 스타일로 통일해 줍니다. 둘의 경계는 'ESLint=코드가 옳은가(버그), Prettier=코드가 예쁜가(서식)'로 기억합니다. 에디터에 '저장 시 자동 포맷'을 켜 두면 저장할 때마다 Prettier가 서식을 정리하고, 터미널에서 npm run lint 로 ESLint 경고를 한꺼번에 확인합니다. Vite로 프로젝트를 만들 때 이 설정을 함께 넣어 두면 팀 전체가 같은 규칙으로 일합니다.

왜 중요한가: 실라버스의 'ESLint·Prettier를 통한 코드 품질 관리' 목표이자, 배포 전 마지막 점검 단계입니다. 일부러 들여쓰기를 흩뜨리고 안 쓰는 변수를 넣은 코드를 저장했을 때 Prettier가 정리하고 ESLint가 경고하는 장면을 직접 보여 주면 두 도구의 차이가 명확해집니다. 이 정리가 끝난 깨끗한 코드를 npm run build로 압축해 dist를 만드는 7·8교시로 이어집니다.`},{h:"Fetch API vs Axios — 왜 실무는 Axios를 쓰나 (교재 p.181)",body:`브라우저 기본 내장인 Fetch API는 설치가 필요 없지만 JSON을 res.json()으로 수동 파싱해야 하고, 에러 핸들링도 수동이며, BaseURL 설정과 인터셉터를 지원하지 않는다.
Axios는 설치가 필요한 대신 JSON 자동 변환·에러 자동 처리에 axios.create로 BaseURL·timeout·headers를 묶은 커스텀 인스턴스를 만들 수 있다.
특히 요청/응답 인터셉터로 요청 직전 로그인 토큰을 자동 탑승시키거나 에러를 공통 팝업으로 가로챌 수 있어 실무 선호도가 매우 높다.
라면에 비유하면 Fetch는 냄비부터 챙겨야 하는 생라면, Axios는 물만 부으면 되는 컵라면이다.
4xx·5xx 에러나 네트워크 오프라인 시 자동으로 catch로 튕겨 들어오는 것도 Axios의 장점이다.`},{h:"ECMAScript의 역사와 Babel·Polyfill — 최신 문법을 마음껏 쓰는 이유 (교재 pp.207-208)",body:`JavaScript는 1995년 Netscape에서 태어났고, 브라우저마다 다르게 동작하는 혼란을 막기 위해 1997년 ECMA 국제 표준기구가 표준 규격 ECMAScript(ES)를 정의했다.
2015년 ES6에서 언어를 혁신적으로 개편했고 이후 매년 소규모 문법이 발표되는데, 이를 통칭해 Modern JavaScript라 부른다.
ES6~ES11 규격(let/const·Arrow Function·Promise·async/await·Optional Chaining)은 현재 브라우저에서 100% 네이티브 지원된다.
브라우저가 모르는 최신 문법은 Babel이 배포 직전에 구형 브라우저용 ES5로 번역하고, 엔진에 없는 객체·메서드는 Polyfill이 JavaScript로 직접 구현해 임시 제공한다 — 최신 유행어를 옛말로 통역하고(Babel) 없는 단어에 뜻풀이를 붙이는(Polyfill) 통역사다.
우리가 쓰는 Vite에 이 변환 엔진이 내장돼 있어 호환성 걱정 없이 최신 문법으로 코딩하면 된다.`},{h:"dist 폴더와 해시 파일명 — 빌드 산출물 읽는 법 (교재 pp.244-245)",body:`npm run build를 실행하면 Vite가 Rollup 번들러를 기동해 프로젝트 루트에 dist(Distribution) 배포 전용 폴더를 만든다.
그 안에는 .vue 파일이나 개발용 모듈이 없고, 브라우저가 해석할 수 있는 순수 html·js·css만 남는다.
파일명 뒤에 붙는 고유 문자열은 파일 내용의 Hash 값으로, 내용이 수정되면 해시도 바뀐다 — 브라우저가 과거의 구형 코드를 캐싱해 화면 갱신이 안 되는 버그를 막는 웹 배포 표준이다.
우유갑의 유통기한처럼 내용물이 바뀌면 라벨도 함께 바뀌어 브라우저가 새 파일인지 즉시 구분한다.
이 dist 폴더를 정적 웹 호스팅 서버(S3·Nginx·Netlify 등)에 그대로 업로드하면 배포가 완결된다.`}]},realCodes:[{title:"api.js + PostList.vue — API 연동 미니 SPA",lang:"vue",code:`<!-- ===== src/api.js (별도 파일) =====
import axios from 'axios'                              // HTTP 통신 라이브러리 가져오기
export const api = axios.create({                      // 공통 설정을 가진 요청 인스턴스 생성
  baseURL: import.meta.env.VITE_API_BASE,              // .env 의 API 기본 주소를 읽어 적용
  timeout: 5000                                        // 5초 안에 응답 없으면 실패 처리
})
===== 아래는 PostList.vue ===== -->
<script setup>
// 화면에 나타날 때 실행되는 훅과 반응형 함수들을 가져온다
import { onMounted, ref } from 'vue'
// 위에서 만든 api 인스턴스를 가져온다
import { api } from '../api'

// 게시글 목록을 담을 반응형 배열
const posts = ref([])
// 불러오는 중인지 표시(처음엔 true)
const loading = ref(true)
// 에러 메시지를 담을 상태(없으면 빈 문자열)
const error = ref('')

// 게시글을 서버에서 비동기로 불러오는 함수
async function load() {
  try {
    loading.value = true                 // 불러오기 시작 → 로딩 켜기
    const res = await api.get('/posts')  // /posts 에 GET 요청, 응답이 올 때까지 기다림
    posts.value = res.data.slice(0, 5)   // 받은 데이터 중 앞 5개만 저장
  } catch (e) {
    error.value = '데이터를 불러오지 못했습니다.' // 실패하면 에러 메시지 설정
  } finally {
    loading.value = false                // 성공이든 실패든 로딩 끄기
  }
}

// 컴포넌트가 화면에 붙은 직후 한 번 데이터를 불러온다
onMounted(load)
<\/script>

<template>
  <!-- 로딩 중이면 안내 문구를 보여준다 -->
  <p v-if="loading">불러오는 중...</p>
  <!-- 에러가 있으면 에러 문구를 빨갛게 보여준다 -->
  <p v-else-if="error" style="color:red">{{ error }}</p>
  <!-- 정상일 때 게시글 목록을 출력한다 -->
  <ul v-else>
    <!-- v-for 로 게시글을 하나씩 꺼내 제목을 표시, key 는 고유 id -->
    <li v-for="p in posts" :key="p.id">{{ p.title }}</li>
  </ul>
</template>`,note:`axios 로 API를 부르고 loading·error·정상 세 상태를 v-if 로 나눠 처리하는 실전 패턴이다.
try/catch/finally 로 실패해도 화면이 멈추지 않는다.`}],periods:["1교시 비동기와 API 통신 개념 (개념)","2교시 fetch·axios로 데이터 불러오기 (실습)","3교시 로딩·에러 상태 처리 패턴 (실습)","4교시 폼 입력과 유효성 검사 (실습)","5교시 환경변수와 API 베이스 설정 (실습)","6교시 미니 SPA 통합: 목록·상세·폼 (실습)","7교시 Vite 빌드와 정적 배포 (실습)","8교시 최종 실습: SPA 완성·배포·점검 (실습)"]}};export{e as default};
