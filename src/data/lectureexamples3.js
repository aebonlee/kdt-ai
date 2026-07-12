// 자료 그라운딩 실습예제 — SKALA 4기 교육생 교재·종합실습 가이드·3기 교재에 근거해
// 실제 실습/코드를 우리말로 재서술(왕초보·전 라인 한글 주석). 코드 주석은 사이트에서 녹색으로 표기됨.
// scripts/merge-additions.mjs 가 자동 병합 생성 (subjectId-day 키 → examplesFor 에 합쳐짐).
export const examplesExtra3 = {
  "git-1": [
    {
      "title": "강사 제공 — 맥북 개발환경 일괄 설치 스크립트 사용법과 핵심 구조",
      "lang": "bash",
      "code": "# SKALA 첫날 배포되는 skala-config-setup.sh — 한 번 실행으로 과정 전체 환경을 구성한다\nchmod +x skala-config-setup.sh    # 실행 권한 부여(최초 1회)\n./skala-config-setup.sh           # 실행 — 관리자 비밀번호 1회 입력(입력해도 화면엔 안 보임, 정상)\n\n# ── 스크립트가 설치해 주는 것들 ─────────────────────────\n# Homebrew(맥 패키지 관리자) → 이후 모든 설치의 토대\n# git · wget · curl · tree · jq   ← 오늘(Git 수업)부터 바로 사용\n# Java(temurin 21)               ← Spring AI 과목 대비\n# Python 3.11                    ← 데이터분석·LLM 과목 대비\n# Node + yarn/pnpm/typescript    ← Vue.js 과목 대비\n# PostgreSQL 17 · Docker Desktop ← DB·서빙 과목 대비\n# VS Code + 확장 · iTerm2 · awscli · kubectl\n\n# ── 왕초보를 배려한 설계 3가지(스크립트를 읽어보면 보인다) ──\n# 1) 실패해도 멈추지 않는다: 실패 항목은 모아뒀다가 마지막에 한꺼번에 보고\n# 2) 여러 번 실행해도 안전(idempotent): 이미 설치된 항목은 알아서 건너뜀\n# 3) 마무리 안내까지 출력: 예) \"Docker Desktop은 한 번 실행해야 docker 명령이 동작\"\n\n# 설치가 끝나면 아래로 확인한다(버전이 나오면 성공)\ngit --version && node --version && python3.11 --version",
      "note": "개발환경은 손으로 하나씩 깔면 사람마다 상태가 달라져 수업 내내 발목을 잡는다. 일괄 스크립트는 \"누가 실행해도 같은 환경\"을 보장하며, 실패 항목만 마지막 보고에서 확인해 개별 해결하면 된다. 스크립트 자체도 bash 학습 자료다 — try 함수(실패 기록 후 계속)와 중복 실행 안전 처리 패턴을 눈여겨보자."
    },
    {
      "title": "IT 용어 한 장 — 화면 기획 용어(웹 프로젝트 전 과정에서 쓰임)",
      "lang": "text",
      "code": "# 화면을 만들 때 팀이 공통으로 쓰는 용어 — 순서대로 구체화된다\nWireframe   : 화면의 뼈대만 그린 설계도 (색·폰트·이미지 없이 배치만)\nMockup      : 와이어프레임에 실제 디자인(색·글꼴·아이콘)을 입힌 정적 시안\nPrototype   : 클릭하면 화면이 넘어가는 '동작하는' 시제품 (흐름 검증용)\nPersona     : 우리 서비스를 쓸 가상의 대표 사용자 모델\n\nUI  : 사용자가 보는 인터페이스 그 자체 (버튼·레이아웃·색·글꼴)\nUX  : 사용하며 느끼는 경험의 총합 (UI보다 큰 개념)\n\nGNB : Global Navigation Bar — 전체 서비스 공통 상단 메뉴\nLNB : Local Navigation Bar — 특정 영역 안의 세부 메뉴\nInformation Architecture : 메뉴·페이지·콘텐츠의 전체 구조 설계\nDesign System : 일관된 UI를 위한 설계 체계(색·컴포넌트 규칙)\n\n# 기억법: 뼈대(Wireframe) → 옷(Mockup) → 움직임(Prototype) 순서로 구체화",
      "note": "이 용어들은 웹 서비스 mini-Project(설계·와이어프레임)와 캡스톤 발표에서 그대로 쓰인다. 특히 Wireframe→Mockup→Prototype의 구체화 단계와 GNB/LNB는 기획 회의에서 매일 나오는 말이므로 첫날에 정리해 두면 팀 소통이 빨라진다."
    },
    {
      "title": "맨 처음 한 번만 하는 Git 사용자 설정 (config)",
      "lang": "bash",
      "code": "# 1) 커밋에 남길 내 이름을 전역(--global)으로 등록한다(모든 저장소 공통)\ngit config --global user.name \"홍길동\"\n# 2) 이메일은 GitHub 계정 이메일과 똑같이 맞춘다(잔디·작성자 매칭)\ngit config --global user.email \"me@team.com\"\n# 3) 새 저장소의 기본 브랜치 이름을 master 대신 main 으로 지정\ngit config --global init.defaultBranch main\n# 4) 커밋 메시지 편집기로 VS Code 사용(--wait: 창 닫을 때까지 기다림)\ngit config --global core.editor \"code --wait\"\n# 5) 지금까지 설정한 값 전체를 확인\ngit config --list\n# 6) 값 하나만 콕 집어 확인\ngit config user.name       # 출력: 홍길동",
      "note": "이 설정은 컴퓨터마다 딱 한 번만 하면 이후 모든 저장소에 자동 적용된다. user.email 을 GitHub 이메일과 맞춰야 커밋 작성자가 내 계정으로 인식된다."
    },
    {
      "title": "init → 브랜치 → merge → 충돌 해결까지 한 흐름으로",
      "lang": "bash",
      "code": "# (준비) 새 폴더를 Git 저장소로 초기화(.git 숨김폴더가 생김)\ngit init                              # 현재 폴더를 로컬 저장소로 만듦\necho \"메인 제목\" > index.html          # 첫 파일 작성\ngit add index.html                    # 스테이지에 담고\ngit commit -m \"init: 첫 페이지\"        # main 브랜치에 첫 커밋\n\n# 1) 기능 작업용 브랜치를 만들고 그 자리로 이동(-c = 생성+전환 한 번에)\ngit switch -c feature-login           # feature-login 으로 갈라져 나옴\necho \"로그인 제목\" > index.html         # 같은 줄을 다르게 수정\ngit commit -am \"feat: 로그인 제목\"      # 브랜치에 커밋\n\n# 2) main 으로 돌아와 같은 줄을 또 다르게 수정(충돌 유발)\ngit switch main                       # 기준 브랜치로 복귀\necho \"홈 제목\" > index.html\ngit commit -am \"feat: 홈 제목\"\n\n# 3) feature 를 main 으로 합치기 → 같은 줄이라 충돌 발생\ngit merge feature-login               # CONFLICT (content): index.html\n# 파일을 열면 <<<<<<< HEAD / ======= / >>>>>>> feature-login 표식이 보임\n# 표식 3줄을 지우고 최종 내용을 손으로 정한 뒤 저장한다\n\n# 4) 해결했음을 알리고 병합 커밋을 완성한다\ngit add index.html                    # 해결된 파일을 다시 스테이지에\ngit commit -m \"merge: 제목 충돌 해결\"  # 병합 마무리",
      "note": "두 브랜치가 같은 줄을 다르게 고치면 Git이 자동 병합을 멈추고 충돌 표식을 넣는다. 표식을 지우고 add·commit 을 다시 해야 병합이 끝난다 — 협업에서 반드시 겪는 과정이다."
    },
    {
      "title": "Git이 무시할 파일 목록 .gitignore 만들기",
      "lang": "bash",
      "code": "# 아래 내용을 프로젝트 루트에 '.gitignore' 파일로 저장한다\n\n# node_modules : npm install 로 언제든 다시 받는 외부 라이브러리 → 올리지 않음\nnode_modules\n# dist         : 빌드 결과물(npm run build 산출물) → 소스만 관리하면 됨\ndist\n# .env         : API 키·비밀번호가 든 파일 → 절대 업로드 금지(보안)\n.env\n*.local\n# .DS_Store    : macOS 가 자동으로 만드는 잡파일\n.DS_Store\n# 편집기 개인 설정은 무시하되, 공유용 확장 목록만 예외로 남긴다\n.vscode/*\n!.vscode/extensions.json",
      "note": "비밀키·빌드결과·라이브러리 폴더는 커밋하지 않는 것이 원칙이다. 단, 이미 커밋된 파일은 .gitignore 만으로 빠지지 않으니 git rm --cached <파일> 로 추적을 먼저 끊어야 한다."
    },
    {
      "title": "커밋 전 실수 구조대 — stash 임시보관과 --amend 고쳐쓰기",
      "lang": "bash",
      "code": "# 상황 1: 커밋을 안 했는데 다른 브랜치로 가야 할 때 — stash(임시 서랍)\ngit stash                          # 작업 중 변경을 임시 서랍에 넣고 폴더를 깨끗하게\ngit stash list                     # 서랍 목록 확인 (stash@{0} 이 방금 넣은 것)\ngit switch main                    # 이제 변경 없이 자유롭게 브랜치 이동 가능\ngit switch feature-greeting        # 원래 작업하던 브랜치로 복귀\ngit stash pop                      # 서랍에서 꺼내 이어서 작업 (목록에서도 제거)\n\n# 상황 2: 방금 커밋 메시지에 오타 — amend(마지막 커밋 고쳐쓰기)\ngit commit -m \"로긴 버튼 색상 변경\"              # 앗, '로긴' 오타!\ngit commit --amend -m \"로그인 버튼 색상 변경\"    # 마지막 커밋을 새 메시지로 교체\ngit log --oneline -1               # 메시지가 바뀌었는지 확인\n\n# 상황 3: add 를 빠뜨리고 커밋했을 때 — 파일까지 함께 amend\necho \"빠뜨린 내용\" >> hello.txt     # 커밋에 안 들어간 수정이 남아 있다\ngit add hello.txt                  # 빠뜨린 파일을 스테이징하고\ngit commit --amend --no-edit       # 메시지는 그대로, 파일만 마지막 커밋에 합치기\n\n# 주의: --amend 는 이미 push 한 커밋에는 금지 (기록이 바뀌어 팀원과 어긋난다)",
      "note": "김성영 실습교수의 Git 종합실습 가이드 중 \"자주 하는 실수 & 해결법\" 코너를 손으로 따라 하는 실습으로 옮겼다. 커밋 안 하고 브랜치를 옮기려다 막히거나, 메시지 오타·add 누락을 발견하는 왕초보의 3대 사고를 stash 와 --amend 두 도구로 수습하는 법을 익힌다. push 이후에는 amend 를 쓰면 안 된다는 안전수칙까지가 한 세트다."
    },
    {
      "title": "완성 프로젝트를 새 브랜치로 GitHub에 올리기 + push 오류 처방전",
      "lang": "bash",
      "code": "# 완성한 프로젝트 폴더를 통째로 '새 브랜치'에 담아 원격에 올리는 8단계\ncd ~/Desktop/my-project            # 1) 프로젝트 폴더로 이동\ngit status                         # 2) 상태 확인 (\"not a git repository\" 면 git init 먼저)\ngit switch -c html_js_css          # 3) 새 브랜치 생성과 동시에 이동 (-c = create)\ngit add .                          # 4) 프로젝트 전체를 스테이징\ngit commit -m \"Complete HTML JS CSS project\"   # 5) 커밋 생성\ngit remote -v                      # 6) 원격 연결 확인 (아무것도 안 나오면 아래로)\ngit remote add origin https://github.com/내계정/data.git   # 7) 원격 최초 연결\n\n# \"remote origin already exists\" 오류가 나면 add 대신 주소만 교체\ngit remote set-url origin https://github.com/내계정/data.git\n\ngit push -u origin html_js_css     # 8) 새 브랜치를 원격에 업로드 (-u: 다음부턴 git push 만)\n# 성공 메시지: * [new branch] html_js_css -> html_js_css\n\n# 자주 만나는 push 오류 처방전\n# \"Authentication failed\"        → 비밀번호 대신 Personal Access Token(PAT) 입력\n# \"failed to push some refs\"     → git pull --rebase origin html_js_css 후 다시 push\n# \"src refspec ... not match\"    → 커밋이 아직 없다는 뜻, add · commit 먼저\n# GitHub 웹에서 브랜치 메뉴 → html_js_css 선택 → 파일이 보이면 최종 성공",
      "note": "김성영 실습교수 가이드의 \"종합실습 2 — 완성 프로젝트를 새 브랜치로 GitHub에 올리기\" 8단계 시나리오를 재구성했다. main 이 아닌 작업 브랜치를 push -u 로 올리는 흐름과, 초보가 반드시 한 번은 만나는 push 오류 4종의 원인별 해결 명령을 처방전 형식으로 붙였다. 오류 메시지를 보고 겁먹지 않고 대응하는 것이 이 실습의 진짜 목표다."
    }
  ],
  "vue-1": [
    {
      "title": "v-bind 클래스 바인딩 — 상태에 따라 스타일 켜고 끄기",
      "lang": "vue",
      "code": "<script setup>\n// 반응형 값을 만드는 ref 를 가져온다\nimport { ref } from 'vue'\n// 활성화 여부(참이면 active 클래스가 붙음)\nconst isActive = ref(true)\n// 에러 여부(참이면 빨간 경고 스타일)\nconst hasError = ref(false)\n</script>\n\n<template>\n  <!-- 객체 구문: 값이 true 인 클래스만 실제로 적용된다 -->\n  <p :class=\"{ active: isActive, danger: hasError }\">상태에 따라 색이 바뀝니다</p>\n  <!-- 배열 구문: 기본 클래스 + 삼항으로 상황별 클래스를 함께 건다 -->\n  <p :class=\"['box', isActive ? 'on' : 'off']\">항상 box, 그리고 on/off 토글</p>\n  <!-- 버튼으로 상태를 뒤집어 실시간 변화를 확인 -->\n  <button @click=\"isActive = !isActive\">active 토글</button>\n  <button @click=\"hasError = !hasError\">error 토글</button>\n</template>\n\n<style scoped>\n.active { color: blue; font-weight: bold; } /* active 붙으면 파란색 */\n.danger { background: #ffd6d6; }            /* danger 붙으면 빨간 배경 */\n.box { padding: 8px; }\n</style>",
      "note": ":class 객체 구문은 조건이 true 인 클래스만 붙이고, 배열 구문은 기본 클래스와 조건부 클래스를 함께 건다. CSS 를 직접 토글하지 않고 데이터로 스타일을 제어하는 것이 핵심이다."
    },
    {
      "title": "폼 요소마다 다른 v-model — 체크박스·라디오·셀렉트",
      "lang": "vue",
      "code": "<script setup>\nimport { ref } from 'vue'                 // 반응형 변수 도구\nconst agree = ref(false)                  // 단일 체크박스 → true/false\nconst fruits = ref([])                    // 여러 체크박스 → 고른 value 가 배열로 쌓임\nconst gender = ref('')                    // 라디오 → 고른 값 하나\nconst city = ref('seoul')                 // 셀렉트 → 선택한 option 값\n</script>\n\n<template>\n  <!-- 단일 체크박스: 담기는 값은 true/false -->\n  <label><input type=\"checkbox\" v-model=\"agree\" /> 약관 동의</label>\n\n  <!-- 같은 배열에 묶인 체크박스: 체크한 value 들이 배열에 모인다 -->\n  <label><input type=\"checkbox\" value=\"사과\" v-model=\"fruits\" /> 사과</label>\n  <label><input type=\"checkbox\" value=\"바나나\" v-model=\"fruits\" /> 바나나</label>\n\n  <!-- 라디오: 같은 v-model 을 공유하면 하나만 선택된다 -->\n  <label><input type=\"radio\" value=\"남\" v-model=\"gender\" /> 남</label>\n  <label><input type=\"radio\" value=\"여\" v-model=\"gender\" /> 여</label>\n\n  <!-- 셀렉트: 고른 option 의 value 가 city 에 들어간다 -->\n  <select v-model=\"city\">\n    <option value=\"seoul\">서울</option>\n    <option value=\"busan\">부산</option>\n  </select>\n\n  <!-- 선택 결과를 실시간 확인 -->\n  <p>동의:{{ agree }} / 과일:{{ fruits }} / 성별:{{ gender }} / 도시:{{ city }}</p>\n</template>",
      "note": "같은 v-model 이라도 요소에 따라 담기는 값이 다르다 — 단일 체크박스는 불리언, 여러 체크박스는 배열, 라디오·셀렉트는 고른 값 하나다."
    },
    {
      "title": "이벤트 수식어 — .prevent 로 기본동작 막고 .stop 으로 전파 막기",
      "lang": "vue",
      "code": "<script setup>\nimport { ref } from 'vue'\nconst log = ref('아직 클릭 전')                      // 무슨 일이 일어났는지 기록\nfunction goLink() { log.value = '페이지 이동을 막고 함수만 실행됨' }\nfunction outer() { log.value = '바깥 상자 클릭' }\nfunction inner() { log.value = '안쪽 버튼만 클릭(바깥으로 안 번짐)' }\n</script>\n\n<template>\n  <!-- .prevent : a 태그의 기본 페이지 이동을 취소하고 함수만 실행 -->\n  <a href=\"https://naver.com\" @click.prevent=\"goLink\">이동 대신 함수 실행</a>\n\n  <!-- 바깥 div 클릭 시 outer 실행 -->\n  <div @click=\"outer\" style=\"padding:20px; background:#eee\">\n    바깥 영역\n    <!-- .stop : 클릭이 바깥 div 까지 번지는 것(버블링)을 차단 -->\n    <button @click.stop=\"inner\">나만 반응하는 버튼</button>\n  </div>\n\n  <p>{{ log }}</p>\n</template>",
      "note": ".prevent 는 링크·폼 제출 같은 브라우저 기본동작을 막고, .stop 은 안쪽 클릭이 바깥 요소까지 전파되는 것을 막는다. 수식어를 붙이면 함수 안에서 preventDefault·stopPropagation 을 직접 부를 필요가 없다."
    }
  ],
  "vue-2": [
    {
      "title": "defineEmits 로 자식이 부모에게 값 올려주기 (Event Up)",
      "lang": "vue",
      "code": "<!-- ===== 자식: CityButton.vue ===== -->\n<script setup>\n// 부모에게 올려보낼 이벤트 이름을 등록한다\nconst emit = defineEmits(['select-city'])\n// 부모가 내려준 도시 이름을 props 로 받는다(Props Down)\nconst props = defineProps({ name: String })\n// 클릭하면 등록한 이벤트를 발사하며 도시 이름을 실어 보낸다\nfunction pick() {\n  emit('select-city', props.name)   // (이벤트명, 함께 보낼 데이터)\n}\n</script>\n<template>\n  <!-- 클릭 → pick 실행 → 부모로 이벤트가 올라간다 -->\n  <button @click=\"pick\">{{ name }}</button>\n</template>\n\n<!-- ===== 부모: App.vue ===== -->\n<script setup>\nimport { ref } from 'vue'\nimport CityButton from './CityButton.vue'\nconst selected = ref('아직 없음')            // 자식이 올려준 값을 담을 상태\n// 자식이 보낸 도시 이름을 받아 상태에 저장\nfunction onSelect(city) { selected.value = city }\n</script>\n<template>\n  <!-- @select-city 로 자식 이벤트를 수신(실려온 값이 인자로 들어옴) -->\n  <CityButton name=\"서울\" @select-city=\"onSelect\" />\n  <CityButton name=\"부산\" @select-city=\"onSelect\" />\n  <p>선택한 도시: {{ selected }}</p>\n</template>",
      "note": "부모→자식은 props(내려주기), 자식→부모는 emit(올려주기)로 통신한다. 자식은 props 를 직접 못 바꾸므로, 바꾸고 싶으면 이벤트로 부모에게 요청한다 — 이것이 단방향 데이터 흐름의 핵심이다."
    },
    {
      "title": "computed 로 계산값 만들기 — method 와 달리 캐싱된다",
      "lang": "vue",
      "code": "<script setup>\nimport { ref, computed } from 'vue'\nconst price = ref(10000)               // 단가\nconst qty = ref(1)                     // 수량\n// computed: 의존하는 값(price·qty)이 바뀔 때만 다시 계산, 아니면 캐시 결과 재사용\nconst total = computed(() => {\n  console.log('계산 실행!')             // 값이 바뀔 때만 콘솔에 찍힘(캐싱 확인)\n  return price.value * qty.value + '원' // 합계 문자열을 돌려준다\n})\n</script>\n\n<template>\n  <!-- total 을 두 번 써도 계산은 한 번만(캐싱) -->\n  <p>합계: {{ total }}</p>\n  <p>다시 표시: {{ total }}</p>\n  <!-- 수량을 바꾸면 total 이 자동으로 다시 계산된다 -->\n  <button @click=\"qty++\">수량 +1 (현재 {{ qty }})</button>\n</template>",
      "note": "computed 는 결과를 기억(캐싱)했다가 의존값이 바뀔 때만 다시 계산한다. 화면에서 여러 번 써도 연산은 한 번뿐이라, 매번 실행되는 일반 함수보다 효율적이다."
    },
    {
      "title": "watch 로 값 변화를 감시해 후속 동작 실행하기",
      "lang": "vue",
      "code": "<script setup>\nimport { ref, watch } from 'vue'\nconst keyword = ref('')                 // 검색어 입력값\nconst status = ref('입력을 기다리는 중') // 안내 문구\n// watch: keyword 가 바뀔 때마다 (새값, 옛값)을 받아 후속 로직 실행\nwatch(keyword, (newVal, oldVal) => {\n  console.log(oldVal, '->', newVal)     // 어떻게 바뀌었는지 로그\n  // 두 글자 이상일 때만 검색 준비(실무에선 여기서 API 를 호출)\n  status.value = newVal.length >= 2 ? '검색 준비 완료' : '두 글자 이상 입력'\n})\n</script>\n\n<template>\n  <!-- 타이핑할 때마다 watch 가 반응해 status 를 갱신 -->\n  <input v-model=\"keyword\" placeholder=\"검색어 입력\" />\n  <p>{{ status }}</p>\n</template>",
      "note": "computed 가 \"값을 계산\"한다면 watch 는 \"값이 바뀐 순간 부수효과(API 호출·로그·검증)\"를 실행한다. 새값·옛값을 둘 다 받아 변화를 비교할 수 있다."
    }
  ],
  "vue-3": [
    {
      "title": "동적 경로 파라미터 받기 — /weather/:cityId + useRoute",
      "lang": "vue",
      "code": "<!-- 라우터 등록(src/router/index.js):\n     { path: '/weather/:cityId', component: WeatherDetail }\n     → 주소의 :cityId 자리에 도시 코드가 들어온다(예: /weather/seoul) -->\n<script setup>\n// 현재 활성 경로 정보를 읽는 useRoute 를 가져온다\nimport { useRoute } from 'vue-router'\nimport { ref, onMounted } from 'vue'\nconst route = useRoute()                       // 현재 route 객체 획득\nconst cityId = route.params.cityId             // 주소의 :cityId 값을 꺼낸다\nconst temp = ref(null)                          // 기온을 담을 상태\n\n// 화면이 뜨면 해당 도시 데이터를 불러온다(여기선 예시로 하드코딩)\nonMounted(() => {\n  const db = { seoul: 25, busan: 27 }          // 도시별 기온(예시)\n  temp.value = db[cityId] ?? '정보 없음'         // 없으면 기본 문구\n})\n</script>\n\n<template>\n  <!-- 주소로 넘어온 도시 코드를 그대로 화면에 표시 -->\n  <h2>도시: {{ cityId }}</h2>\n  <p>현재 기온: {{ temp }}도</p>\n</template>",
      "note": "URL 의 일부가 바뀌는 상세 페이지는 :cityId 처럼 동적 구간으로 등록하고, 컴포넌트에서 useRoute().params 로 그 값을 꺼낸다. 하나의 컴포넌트가 여러 도시를 재사용해 처리할 수 있다."
    },
    {
      "title": "코드로 페이지 이동하기 — useRouter.push 와 query",
      "lang": "vue",
      "code": "<script setup>\n// 코드로 페이지를 이동시키는 useRouter 를 가져온다\nimport { useRouter } from 'vue-router'\nimport { ref } from 'vue'\nconst router = useRouter()             // 라우터 조작 객체\nconst keyword = ref('')                // 검색어\n\n// 검색 버튼 클릭 → 결과 화면으로 이동하며 검색어를 query 로 실어 보낸다\nfunction search() {\n  router.push({ path: '/result', query: { q: keyword.value } })\n  // 이동 주소 예: /result?q=날씨  (도착 화면에서 route.query.q 로 꺼냄)\n}\n// 브라우저 뒤로가기와 동일하게 한 단계 뒤로\nfunction goBack() { router.back() }\n</script>\n\n<template>\n  <input v-model=\"keyword\" placeholder=\"검색어\" />\n  <!-- router-link(선언형)와 달리, 조건 검사 뒤 코드로 이동할 때 쓴다 -->\n  <button @click=\"search\">검색 결과로 이동</button>\n  <button @click=\"goBack\">뒤로</button>\n</template>",
      "note": "router-link 가 \"클릭하면 바로 가는 링크\"라면, router.push 는 \"로그인·유효성 검사를 통과했을 때만 이동\" 같은 조건부 이동에 쓰는 명령형 방식이다. query 로 검색어 같은 부가 정보를 함께 넘긴다."
    },
    {
      "title": "storeToRefs — Pinia 값을 꺼내도 반응성이 안 끊기게",
      "lang": "vue",
      "code": "<script setup>\n// 전역 스토어와, 반응성을 지켜 꺼내는 storeToRefs 를 가져온다\nimport { storeToRefs } from 'pinia'\nimport { useCartStore } from '../stores/cart'\n\nconst cart = useCartStore()\n// (X) const { count } = cart  → 반응성이 끊겨 값이 바뀌어도 화면이 안 변함\n// (O) state·getters 는 storeToRefs 로 감싸야 반응형 연결이 유지된다\nconst { count, total } = storeToRefs(cart)\n// 함수(actions)는 반응형 대상이 아니므로 그냥 구조분해해도 된다\nconst { add } = cart\n</script>\n\n<template>\n  <!-- 스토어 값이 바뀌면 이 숫자들도 자동 갱신된다 -->\n  <p>담긴 개수: {{ count }} / 합계: {{ total }}원</p>\n  <!-- 버튼으로 담으면 위 숫자가 즉시 반응 -->\n  <button @click=\"add({ id: 1, name: '사과', price: 3000 })\">사과 담기</button>\n</template>",
      "note": "스토어에서 state·getters 를 그냥 구조분해하면 반응성이 끊긴다. storeToRefs 로 감싸야 값이 바뀔 때 화면이 따라 갱신된다. 반면 actions(함수)는 반응형 대상이 아니라 그대로 꺼내 써도 된다."
    }
  ],
  "vue-4": [
    {
      "title": "axios.create 로 공통 통신 인스턴스 + 인터셉터 만들기",
      "lang": "javascript",
      "code": "// src/api/http.js : 프로젝트 공통 통신 인스턴스를 한 번 만들어 재사용한다\nimport axios from 'axios'\n\n// 공통 분모(주소·타임아웃)를 미리 박아 커스텀 인스턴스를 뽑아낸다\nconst http = axios.create({\n  baseURL: 'https://api.example.com', // 매번 긴 주소를 안 써도 됨\n  timeout: 5000,                      // 5초 넘으면 실패 처리\n})\n\n// 요청 인터셉터: 모든 요청이 나가기 직전 가로채 토큰을 헤더에 자동으로 붙인다\nhttp.interceptors.request.use((config) => {\n  const token = localStorage.getItem('token')      // 저장된 로그인 토큰\n  if (token) config.headers.Authorization = 'Bearer ' + token\n  return config                                      // config 를 돌려줘야 요청이 진행됨\n})\n\n// 응답 인터셉터: 성공은 data 만 통과, 실패는 공통으로 로그를 남긴다\nhttp.interceptors.response.use(\n  (res) => res.data,                                 // 응답에서 실제 데이터만 반환\n  (err) => { console.error('API 오류:', err.message); return Promise.reject(err) },\n)\n\nexport default http   // 이제 어디서든 import 해 http.get('/users') 로 쓴다",
      "note": "axios.create 로 baseURL·타임아웃을 한 번만 정하고, 인터셉터로 토큰 첨부와 에러 처리를 모든 요청에 공통 적용한다. 컴포넌트마다 반복하던 설정이 사라진다."
    },
    {
      "title": "HTTP Method 로 CRUD 4종 실습 (GET·POST·PUT·DELETE)",
      "lang": "javascript",
      "code": "// 앞서 만든 공통 인스턴스를 가져와 CRUD 를 실습한다(async 함수 안에서 실행)\nimport http from './api/http'\n\n// (Read)   GET: 목록을 읽어온다(서버 데이터는 바꾸지 않음)\nconst list = await http.get('/cities')\n\n// (Create) POST: 새 자원을 등록한다(두 번째 인자가 보낼 body)\nawait http.post('/cities', { name: '대전', temp: 24 })\n\n// (Update-전체) PUT: 기존 자원을 통째로 갈아 끼운다\nawait http.put('/cities/1', { name: '서울', temp: 26 })\n\n// (Update-부분) PATCH: 특정 필드만 정밀 수정한다\nawait http.patch('/cities/1', { temp: 27 })\n\n// (Delete) DELETE: 특정 자원을 삭제한다\nawait http.delete('/cities/1')",
      "note": "HTTP Method 가 곧 데이터베이스 CRUD 다 — GET=조회, POST=생성, PUT/PATCH=수정, DELETE=삭제. REST 에서 주소(URI)는 /cities 처럼 명사로만 쓰고 행위는 Method 로 표현한다."
    },
    {
      "title": "Vite 빌드와 배포 — dist 생성과 base 경로 맞추기",
      "lang": "javascript",
      "code": "// vite.config.js : 빌드·배포 환경 설정 파일\nimport { defineConfig } from 'vite'\nimport vue from '@vitejs/plugin-vue'\n\nexport default defineConfig({\n  plugins: [vue()],\n  // base: 배포 경로의 기준점.\n  //  - 루트/커스텀 도메인이면 '/'\n  //  - GitHub Pages 하위경로(아이디.github.io/레포명/)면 '/레포명/'\n  // 이 값이 안 맞으면 빌드 후 JS·CSS 자산이 404 나며 흰 화면이 뜬다\n  base: '/skala-vue/',\n})\n\n// --- 터미널 흐름 ---\n// npm run dev     : 개발 서버(localhost:5173), 저장 즉시 반영(HMR)\n// npm run build   : dist 폴더로 압축·최적화된 정적 파일 생성(실제 올릴 결과물)\n// npm run preview : 빌드 결과를 실제처럼 미리보기",
      "note": "npm run build 는 소스를 압축·최적화해 dist 폴더를 만든다. GitHub Pages 하위경로에 올릴 때 base 를 레포명으로 맞추지 않으면 자산 경로가 어긋나 화면이 하얗게 뜨는 대표적 실수가 난다."
    }
  ],
  "webproject-1": [
    {
      "title": "액터별 기능 정의 — 누가 무엇을 쓰는지 표로",
      "lang": "javascript",
      "code": "// 액터(사용자 유형)별로 '누가 어떤 기능을 쓰는지' 정리한다\nconst actors = [\n  { role: '일반 사용자', features: ['회원가입', '글 목록 보기', '글 작성'] },\n  { role: '관리자',     features: ['신고 글 삭제', '회원 관리'] },\n  { role: '외부 시스템', features: ['날씨 API 조회'] },\n]\n\n// 각 액터가 가진 기능 수로 역할 범위를 가늠한다\nactors.forEach((a) => {\n  console.log(a.role + ': ' + a.features.length + '개 기능')\n})\n// 결과: 일반 사용자: 3개 / 관리자: 2개 / 외부 시스템: 1개\n\n// 특정 기능을 누가 쓰는지 거꾸로 찾는다(요구사항 누락 점검)\nconst who = actors.filter((a) => a.features.includes('글 작성')).map((a) => a.role)\nconsole.log('글 작성 가능 액터:', who)   // 결과: ['일반 사용자']",
      "note": "정의서의 핵심은 액터(일반 사용자·관리자·외부 시스템)를 식별하고 각자의 기능을 나누는 것이다. 뒤에 그릴 UI 화면과 API 는 모두 이 액터별 기능 목록에서 파생된다."
    },
    {
      "title": "UI 흐름도의 밑그림 — 화면 목록·구성요소·이동경로",
      "lang": "javascript",
      "code": "// 화면 목록과 각 화면의 구성요소·이동 경로를 구조화한다\nconst screens = [\n  { name: '로그인', elements: ['이메일 입력', '비밀번호 입력', '로그인 버튼'], next: '목록' },\n  { name: '목록',   elements: ['검색창', '글 카드 목록', '글쓰기 버튼'],        next: '상세' },\n  { name: '상세',   elements: ['제목', '본문', '뒤로가기'],                     next: '목록' },\n]\n\n// 화면 흐름을 한 줄로 이어 전체 사용자 동선을 확인한다\nconsole.log(screens.map((s) => s.name).join(' -> '))\n// 결과: 로그인 -> 목록 -> 상세\n\n// 각 화면에 버튼·입력 같은 구성요소가 비었는지 점검(와이어프레임 누락 방지)\nscreens.forEach((s) => {\n  if (s.elements.length === 0) console.log(s.name, '화면 구성요소 누락!')\n})",
      "note": "화면 목록·구성요소(버튼/입력/데이터)·이동경로를 먼저 구조화하면 와이어프레임과 API 도출이 쉬워진다. 완성한 UI 흐름도는 반드시 정의서 PDF 안에 화면 캡처로 넣어야 감점을 피한다."
    }
  ],
  "webproject-2": [
    {
      "title": "데이터 모델(ERD)을 코드로 — DBML 로 엔터티·관계 정의",
      "lang": "text",
      "code": "// {반_이름_프로젝트명}-DB.dbml : 데이터 모델을 코드로 표현한다\n// dbdiagram.io 에 붙여넣으면 관계도(ERD)가 자동으로 그려진다\n\nTable users {                        // 회원 엔터티\n  id integer [pk, increment]         // PK: 자동 증가 기본키\n  email varchar [unique, not null]   // 로그인 이메일(중복 불가)\n  nickname varchar [not null]        // 표시 이름\n  created_at timestamp               // 가입 시각\n}\n\nTable posts {                        // 글 엔터티\n  id integer [pk, increment]         // PK\n  user_id integer [not null]         // FK: 작성자(users.id 를 가리킴)\n  title varchar [not null]           // 제목\n  content text                       // 본문\n  created_at timestamp\n}\n\n// 관계: 회원 1명이 글 여러 개를 쓴다(1:N)\nRef: posts.user_id > users.id",
      "note": "ERD 평가의 핵심은 PK/FK 명시와 1:N·M:N 관계 정의다. UI 에서 화면에 뿌리는 모든 데이터 필드가 여기 엔터티에 존재해야 하며, 이 DBML 을 dbdiagram.io 에 넣으면 다이어그램이 자동 생성된다."
    },
    {
      "title": "API 명세를 OpenAPI(OAS) YAML 로 — Method·Body·에러코드",
      "lang": "yaml",
      "code": "# {반_이름_프로젝트명}-API.yml : 화면이 호출하는 API를 OpenAPI로 명세\nopenapi: 3.0.0\ninfo:\n  title: 글 서비스 API           # 서비스 이름\npaths:\n  /posts:                        # '글' 자원(주소는 동사 없이 명사만)\n    get:                         # 목록 조회 (GET = Read)\n      parameters:\n        - name: q                # 검색어를 query 로 받음\n          in: query\n          schema: { type: string }\n      responses:\n        '200': { description: 조회 성공 }\n    post:                        # 새 글 등록 (POST = Create)\n      requestBody:               # 클라이언트가 보낼 body 정의\n        content:\n          application/json:\n            schema: { $ref: '#/components/schemas/PostInput' }  # 공통 스키마 재사용\n      responses:\n        '201': { description: 생성됨 }\n        '400': { description: 입력값 오류 }        # 에러 코드 명시\ncomponents:\n  schemas:\n    PostInput:                   # 여러 API가 함께 쓰는 공통 입력 스키마\n      type: object\n      properties:\n        title: { type: string }   # 제목\n        content: { type: string } # 본문",
      "note": "평가 포인트는 적절한 HTTP Method, Path/Query/Body 명확화, 에러코드(400/401/404) 정의, $ref 로 공통 스키마 재사용이다. 요청/응답 필드는 앞서 만든 DBML(ERD)과 반드시 일치해야 한다."
    }
  ],
  "webproject-3": [
    {
      "title": "프로젝트 정의서 목차 점검 — 6개 장이 다 채워졌나",
      "lang": "javascript",
      "code": "// 발표 PDF(정의서)의 목차를 구조로 정리해 빠진 장을 점검한다\nconst doc = [\n  { section: '서비스 개요', items: ['이름', '목적/배경', '핵심 가치', '주요 기능'] },\n  { section: '액터 정의', items: ['일반 사용자', '관리자', '외부 시스템'] },\n  { section: 'UI 흐름(와이어프레임)', items: ['로그인', '메인', '상세'] }, // PDF에 화면 캡처 필수\n  { section: '데이터 모델(ERD)', items: ['엔터티', 'PK/FK', '관계(1:N)'] },\n  { section: 'API 명세(OAS)', items: ['요청', '응답', '예외처리'] },\n  { section: '고려사항', items: ['설계 고민', '다음 단계 개발 시 고려점'] },\n]\n\n// 각 장에 내용이 채워졌는지(빈 목차가 없는지) 확인\ndoc.forEach((d) => {\n  const ok = d.items.length > 0 ? 'OK' : '비어 있음!'\n  console.log(d.section + ': ' + ok)\n})\n// UI 흐름도는 반드시 PDF 안에 이미지로 넣는다(가장 자주 빠뜨리는 항목)",
      "note": "정의서는 개요→액터→UI흐름→ERD→API→고려사항 6개 장이 서로 이어지도록 작성한다. 특히 UI 흐름도(와이어프레임) 캡처가 PDF 안에 없으면 감점되니 마지막에 반드시 확인한다."
    },
    {
      "title": "발표 전 자가점검 — 산출물 3종과 UI·ERD·API 일관성",
      "lang": "javascript",
      "code": "// 발표 전 자가점검: 산출물·납기·'일관성'을 코드로 훑는다\nconst submit = {\n  pdf: true,   // {반_이름_프로젝트명}-개요.pdf (UI 흐름도 포함)\n  dbml: true,  // {반_이름_프로젝트명}-DB.dbml\n  yml: true,   // {반_이름_프로젝트명}-API.yml\n}\n\n// 1) 3종 산출물이 모두 준비됐는지(하나라도 없으면 감점)\nconst missing = Object.entries(submit).filter(([, v]) => !v).map(([k]) => k)\nconsole.log(missing.length ? '누락: ' + missing : '산출물 3종 완비')\n\n// 2) 가장 자주 깎이는 '일관성' 3가지를 직접 확인한다\nconst consistency = [\n  'UI에서 쓰는 모든 데이터 필드가 ERD(DB)에 있는가',   // UI <-> ERD\n  '화면마다 필요한 API가 모두 정의됐는가',              // UI <-> API\n  'API의 요청/응답이 ERD 구조와 일치하는가',           // API <-> ERD\n]\nconsistency.forEach((c, i) => console.log((i + 1) + '. ' + c))\n// 세 축(UI·데이터·API)이 어긋나면 기능이 문제해결과 연결되지 않아 감점",
      "note": "세부 평가의 핵심은 UI↔ERD↔API 세 축의 일관성이다. 화면에 쓰는 데이터가 ERD 에 있고, 그 데이터를 나르는 API 가 정의돼 있어야 한다. 납기(3일차 오후 마감) 미준수는 0점이므로 시간 엄수가 최우선이다."
    }
  ],
  "python-1": [
    {
      "title": "Parquet으로 저장하고 필요한 열만 골라 읽기 (예외처리 포함)",
      "lang": "python",
      "code": "import pandas as pd                    # 표(DataFrame) 처리 라이브러리\n\n# 도시별 날씨 수집이 끝났다고 가정한 표\ndf = pd.DataFrame({\n    \"도시\": [\"서울\", \"도쿄\", \"뉴욕\", \"런던\"],            # 도시 이름\n    \"기온\": [25.7, 28.1, 23.0, 24.3],                  # 현재 기온(도)\n    \"현지시각\": [\"16:46\", \"16:46\", \"03:46\", \"08:46\"],   # 각 도시의 현지 시각\n})\n\ndf.to_parquet(\"weather.parquet\")       # parquet(열 단위 압축 형식) 파일로 저장\n\ntry:                                   # 파일이 없을 수도 있으니 예외 대비\n    slim = pd.read_parquet(\"weather.parquet\", columns=[\"도시\", \"기온\"])  # 필요한 열만 읽기\n    print(slim)                        # 현지시각 없이 도시·기온 2개 열만 나온다\nexcept FileNotFoundError:              # 파일이 없으면 이 블록으로\n    print(\"weather.parquet 이 없습니다. 저장 단계를 먼저 실행하세요.\")\n\n# CSV 는 행 단위, parquet 은 열 단위 저장 — 그래서 '필요한 열만' 골라 읽을 수 있다\n# 데이터가 커질수록 읽기 속도와 파일 용량 모두 parquet 이 유리하다",
      "note": "윤선영 실습교수의 데이터분석 Python 종합실습1 3~4번(Weather 객체를 csv·parquet 으로 저장하고 도시·기온만 읽어오기, 파일 없으면 예외처리)을 왕초보용으로 줄였다. CSV 와 달리 parquet 은 columns 인자로 필요한 열만 읽을 수 있다는 점과 FileNotFoundError 대비가 핵심이다."
    },
    {
      "title": "수집→검증→저장을 한 스크립트로 — 미니 데이터 파이프라인",
      "lang": "python",
      "code": "import httpx                              # HTTP 요청 라이브러리\nimport pandas as pd                       # 표 처리\nfrom pydantic import BaseModel, ValidationError   # 데이터 검증 도구\n\nclass Product(BaseModel):                 # 상품 1건이 갖춰야 할 형태 선언\n    id: int                               # 상품 번호는 정수\n    title: str                            # 상품명은 문자열\n    price: float                          # 가격은 실수\n\nrows = []                                 # 검증을 통과한 데이터만 담을 목록\nfor i in range(1, 4):                     # 상품 1~3번을 차례로 수집\n    r = httpx.get(f\"https://fakestoreapi.com/products/{i}\", timeout=10)  # API 호출\n    try:                                  # 받은 데이터가 형태에 맞는지 검사\n        p = Product(**r.json())           # JSON 을 스키마에 통과시켜 검증\n        rows.append({\"번호\": p.id, \"제품명\": p.title, \"가격\": p.price})   # 통과분만 적재\n    except ValidationError:               # 형태가 어긋난 데이터는\n        print(i, \"번 상품 검증 실패 — 건너뜀\")   # 프로그램을 멈추지 말고 기록만 남긴다\n\ndf = pd.DataFrame(rows)                   # 검증 통과분으로 표 생성\ndf.to_csv(\"products.csv\", index=False)    # 사람이 열어 보기 좋은 CSV 로 저장\ndf.to_parquet(\"products.parquet\")         # 분석용으로 빠른 parquet 으로도 저장\nprint(\"수집→검증→저장 완료:\", len(df), \"건\")   # 파이프라인 결과 한 줄 요약",
      "note": "윤선영 실습교수 가이드의 평가 과제(fakestoreapi 데이터 수집 → Pydantic 스키마 검증+예외처리 → CSV·Parquet 저장을 하나의 자동화 스크립트로, 배점 40점)를 축소 재현했다. 지금까지 따로 배운 httpx·Pydantic·파일 저장을 처음으로 한 흐름에 이어 붙이는 것이 포인트다. 불량 데이터 1건 때문에 전체가 죽지 않도록 건너뛰고 기록하는 습관도 함께 익힌다."
    },
    {
      "title": "실습1: 매출 레코드 집계 — Counter·defaultdict·컴프리헨션 (Practice 1)",
      "lang": "python",
      "code": "# 실습1(Practice 1): 매출 레코드를 자료구조로 집계하기\nfrom collections import Counter, defaultdict  # 빈도 집계·그룹핑 전용 자료구조\n\n# Python_Practice1_Data.json 을 흉내 낸 Sales 레코드(행: 날짜·지역·금액·품목)\nsales = [\n    {'date': '2026-01', 'region': '서울', 'amount': 1500, 'category': '가전'},\n    {'date': '2026-01', 'region': '부산', 'amount': 800,  'category': '의류'},\n    {'date': '2026-02', 'region': '서울', 'amount': 1200, 'category': '가전'},\n    {'date': '2026-02', 'region': '서울', 'amount': 300,  'category': '식품'},\n    {'date': '2026-02', 'region': '부산', 'amount': 2000, 'category': '가전'},\n]\n\n# 1) amount >= 1000 인 거래만 남긴다(리스트 컴프리헨션 = 필터+수집 한 줄)\nbig = [r for r in sales if r['amount'] >= 1000]\n\n# 2) Counter 로 '지역별 거래 건수'를 센다(직접 루프 대신 - 감점 회피)\nregion_count = Counter(r['region'] for r in big)\nprint('지역별 건수:', region_count.most_common())  # 많은 순으로 정렬 보장\n\n# 3) defaultdict 로 '카테고리별 금액 리스트'를 모은다(키 없으면 빈 리스트 자동 생성)\nby_cat = defaultdict(list)\nfor r in big:\n    by_cat[r['category']].append(r['amount'])\n\n# 4) 딕셔너리 컴프리헨션으로 '지역별 총매출' dict 를 만든다\nregion_total = {reg: sum(r['amount'] for r in big if r['region'] == reg)\n                for reg in region_count}\nprint('지역별 총매출:', region_total)   # {'서울': 2700, '부산': 2000}\n\n# 5) 금액 상위 3건을 내림차순 정렬(정렬 기준 key=금액, reverse)\ntop3 = sorted(big, key=lambda r: r['amount'], reverse=True)[:3]\nassert region_total['서울'] == 2700  # 체크포인트: 값이 맞는지 assert 로 자가검증",
      "note": "Practice 1의 정석 흐름: for 루프 대신 컴프리헨션, 직접 카운팅 대신 Counter, if-키확인 대신 defaultdict를 쓰는 것이 채점 감점 회피 포인트다. assert로 집계 결과를 스스로 검증한다."
    },
    {
      "title": "실습1: 리스트 vs 제너레이터 메모리 비교 (Practice 1 체크포인트)",
      "lang": "python",
      "code": "# 실습1: 같은 결과, 다른 메모리 — 제너레이터가 왜 대용량에 강한가\nimport sys  # 객체가 차지하는 바이트를 재는 표준 모듈\n\n# 1) 리스트: 1000만 개 제곱값을 '한꺼번에' 메모리에 올린다\nsquares_list = [x * x for x in range(10_000_000)]\n\n# 2) 제너레이터: 같은 계산을 '필요할 때 하나씩' 만든다(괄호가 () 이면 제너레이터)\nsquares_gen = (x * x for x in range(10_000_000))\n\n# 3) 두 객체의 메모리 크기를 비교한다\nprint('리스트   :', sys.getsizeof(squares_list), 'bytes')  # 수천만 bytes\nprint('제너레이터:', sys.getsizeof(squares_gen), 'bytes')   # 100 bytes 대\n\n# 4) 체크포인트: 제너레이터가 리스트보다 훨씬 작아야 한다\nassert sys.getsizeof(squares_gen) < sys.getsizeof(squares_list)\n\n# 5) 단, 제너레이터는 '한 번만' 흐른다 — 합을 구하면 소진된다\ntotal = sum(squares_gen)  # 하나씩 꺼내 더함(전부 메모리에 올리지 않음)\nprint('합계:', total, '/ 다시 세면:', sum(squares_gen))  # 두 번째는 0(이미 소진)",
      "note": "Checkpoint는 sys.getsizeof(generator) < list 확인을 요구한다. 이때 제너레이터를 list()로 바꿔 비교하면 메모리 차이가 사라져 감점되므로, 변환하지 말고 그대로 크기를 재는 것이 핵심이다."
    },
    {
      "title": "실행 구조 눈으로 보기 — dis로 바이트코드 확인 (1장)",
      "lang": "python",
      "code": "# 소스 -> AST -> 바이트코드 -> PVM: 파이썬이 코드를 실행하는 진짜 순서\nimport dis  # 함수가 어떤 바이트코드로 컴파일되는지 보여주는 표준 모듈\n\n# 아주 단순한 덧셈 함수 하나를 정의한다\ndef add(x, y):\n    return x + y  # 이 한 줄이 실제로 어떤 명령들로 쪼개지는지 확인\n\n# dis 로 내부 바이트코드 명령을 출력한다\ndis.dis(add)\n# 출력(요지):\n#   LOAD_FAST   x    <- 지역변수 x 를 스택에 올림\n#   LOAD_FAST   y    <- 지역변수 y 를 스택에 올림\n#   BINARY_OP   +    <- 스택 위 두 값을 더함\n#   RETURN_VALUE     <- 결과를 반환\n\n# CPython 은 소스를 기계어가 아니라 '바이트코드'로 바꿔 PVM 이 한 줄씩 실행한다.\n# 이 구조를 알면 __pycache__(.pyc)가 왜 생기는지, 그리고 컴프리헨션이\n# for 루프보다 빠른 이유(생성되는 바이트코드 수가 더 적음)를 납득할 수 있다.",
      "note": "교재 1장의 dis·LOAD_FAST·BINARY_OP·RETURN_VALUE 설명을 그대로 실습으로. \"왜 컴프리헨션이 빠른가\"를 느낌이 아니라 바이트코드 개수로 이해하게 하는 개념 데모다."
    }
  ],
  "python-2": [
    {
      "title": "업종별 매출 합계 상위 뽑고 막대그래프를 파일로 저장하기",
      "lang": "python",
      "code": "import pandas as pd                       # 표 처리\nimport matplotlib.pyplot as plt          # 그래프 그리기\n\n# 서울시 상권 추정매출을 흉내 낸 작은 표 (실전은 공공데이터 CSV 사용)\ndf = pd.DataFrame({\n    \"서비스_업종\": [\"한식\", \"카페\", \"한식\", \"편의점\", \"카페\", \"미용실\"],\n    \"당월_매출\": [820, 310, 640, 450, 280, 190],       # 단위: 만원\n    \"연령대_10\": [20, 60, 15, 90, 70, 10],             # 10대 매출\n    \"연령대_20\": [180, 140, 150, 160, 120, 60],        # 20대 매출\n    \"연령대_30\": [260, 80, 210, 120, 70, 80],          # 30대 매출\n})\n\n# 업종별로 묶어 합계 → 내림차순 정렬 → 상위 3개만 (실전은 상위 10개)\ntop = df.groupby(\"서비스_업종\")[\"당월_매출\"].sum().sort_values(ascending=False).head(3)\nprint(top)                                # 한식 1460, 카페 590, 편의점 450 순서\n\n# 연령대 3개 열의 열별 합계로 막대그래프를 그려 '파일로' 저장\nages = df[[\"연령대_10\", \"연령대_20\", \"연령대_30\"]].sum()   # 열마다 합계 1개씩\nages.plot(kind=\"bar\", title=\"age sales\")   # 합계 3개를 막대그래프로\nplt.tight_layout()                        # 글자가 잘리지 않게 여백 자동 조정\nplt.savefig(\"age_sales.png\")              # 화면 표시 대신 PNG 파일로 저장\nprint(\"age_sales.png 저장 완료\")           # 보고서에 바로 붙일 이미지 완성",
      "note": "윤선영 실습교수의 종합실습2 3~4번(서비스 업종별 당월 매출 합계를 내림차순 상위 10개로 뽑고, 연령대 3개 칼럼 합계로 bar 그래프를 그려 파일 저장)을 축소한 것이다. groupby 뒤에 sort_values 와 head 를 이어 붙여 상위 N 개를 뽑는 체인과, plt.show 대신 savefig 로 결과를 이미지 파일로 남기는 습관이 핵심이다."
    },
    {
      "title": "ColumnTransformer — 숫자 열과 글자 열을 각각 다르게 전처리해 결합",
      "lang": "python",
      "code": "import pandas as pd                                    # 표 처리\nfrom sklearn.pipeline import Pipeline                  # 처리 단계 묶기\nfrom sklearn.compose import ColumnTransformer          # 열 종류별로 다른 처리 적용\nfrom sklearn.impute import SimpleImputer               # 결측치(빈칸) 채우기\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder  # 표준화·원핫\nfrom sklearn.linear_model import LinearRegression      # 회귀 모델\n\n# 수치형 열 전용: 빈칸은 중앙값으로 채우고 → 크기를 표준화\nnum_pipe = Pipeline([(\"결측\", SimpleImputer(strategy=\"median\")),\n                     (\"스케일\", StandardScaler())])\n# 범주형 열 전용: 빈칸은 \"missing\" 글자로 채우고 → 원핫인코딩(0/1 표로 변환)\ncat_pipe = Pipeline([(\"결측\", SimpleImputer(strategy=\"constant\", fill_value=\"missing\")),\n                     (\"원핫\", OneHotEncoder(handle_unknown=\"ignore\"))])\n\n# 두 파이프라인을 '열 이름 기준'으로 하나로 결합\npre = ColumnTransformer([\n    (\"수치\", num_pipe, [\"연령대_10\", \"연령대_20\", \"연령대_30\"]),   # 숫자 열 3개는 이쪽\n    (\"범주\", cat_pipe, [\"상권_구분\"]),                             # 글자 열 1개는 저쪽\n])\n\nmodel = Pipeline([(\"전처리\", pre), (\"회귀\", LinearRegression())])   # 전처리+모델 완성\nX = pd.DataFrame({\"연령대_10\": [20, None, 15], \"연령대_20\": [180, 140, 150],\n                  \"연령대_30\": [260, 80, None], \"상권_구분\": [\"골목\", None, \"발달\"]})\ny = [820, 310, 640]                                    # 정답: 당월 매출(만원)\nmodel.fit(X, y)                                        # 빈칸이 있어도 그대로 학습된다\nprint(\"예측:\", model.predict(X).round(1))               # 학습 데이터로 예측 확인",
      "note": "윤선영 실습교수의 종합실습2 5~6번(수치형 파이프라인 + 범주형 파이프라인을 하나로 결합해 최종 모델 파이프라인 완성, 연령대 매출로 당월 매출 예측)을 재구성했다. 기존 예제의 Pipeline 이 한 종류 전처리만 다뤘다면, 여기서는 ColumnTransformer 로 숫자 열과 글자 열에 서로 다른 전처리를 동시에 적용하는 실무 표준 패턴을 배운다. 결측치가 섞인 원본을 손대지 않고 fit 한 번으로 끝나는 것이 매력이다."
    },
    {
      "title": "실습3: IQR 이상치 제거 후 named aggregation 집계 (Practice 3)",
      "lang": "python",
      "code": "# 실습3(Practice 3): sales_100k.csv 흐름 — EDA -> IQR 이상치 제거 -> 집계\nimport pandas as pd  # 표 데이터 처리\n\n# 실제 실습은 10만 행 CSV. 여기선 작은 표로 흐름만 재현(999999 는 이상치)\ndf = pd.DataFrame({\n    'region':   ['서울', '서울', '부산', '부산', '서울', '부산'],\n    'category': ['가전', '식품', '가전', '식품', '가전', '식품'],\n    'amount':   [1200, 300, 2000, 500, 999999, 700],\n})\nprint(df.info())          # 컬럼·타입·결측치 한눈에(EDA 첫걸음)\nprint(df.isnull().sum())  # 컬럼별 결측치 개수\n\n# 1) IQR(사분위 범위)로 정상 범위를 계산한다\nQ1 = df['amount'].quantile(0.25)  # 하위 25% 값\nQ3 = df['amount'].quantile(0.75)  # 상위 25% 값\nIQR = Q3 - Q1                      # 사분위 범위\nlow, high = Q1 - 1.5 * IQR, Q3 + 1.5 * IQR  # 정상으로 볼 하한·상한\n\nbefore = len(df)                            # 제거 전 행수\nclean = df[df['amount'].between(low, high)]  # 정상 범위 안만 남김\nprint('제거 전:', before, '-> 제거 후:', len(clean))  # 이상치 빠짐 확인\n\n# 2) named aggregation: 결과 컬럼명을 직접 지정해 지역·품목별 집계\nresult = (clean.groupby(['region', 'category'])\n          .agg(total=('amount', 'sum'),   # 총매출\n               mean=('amount', 'mean'),   # 평균\n               cnt=('amount', 'count'))   # 건수\n          .sort_values('total', ascending=False))  # 총매출 내림차순\nprint(result)",
      "note": "Checkpoint 그대로: between(Q1-1.5*IQR, Q3+1.5*IQR)로 IQR 범위를 잡고 제거 전·후 행수를 출력, groupby는 total=(\"amount\",\"sum\") 형태의 named aggregation으로 컬럼명을 지정해야 감점(-20)을 피한다."
    },
    {
      "title": "실습3: DuckDB로 DataFrame에 바로 SQL 집계 (Practice 3)",
      "lang": "python",
      "code": "# 실습3(Practice 3): 같은 집계를 SQL 로 — Pandas/Polars/DuckDB 3종 비교의 한 축\nimport duckdb   # pip install duckdb, CSV/DataFrame 에 직접 SQL 을 실행\nimport pandas as pd\n\ndf = pd.DataFrame({\n    'region':   ['서울', '서울', '부산', '부산'],\n    'category': ['가전', '식품', '가전', '식품'],\n    'amount':   [1200, 300, 2000, 500],\n})\n\n# 파이썬 변수 df 를 그대로 테이블처럼 쓴다(별도 적재 없이 FROM df)\nsql = '''\n    SELECT region, category,\n           SUM(amount) AS total,   -- 총매출\n           COUNT(*)    AS cnt       -- 건수\n    FROM df\n    GROUP BY region, category\n    ORDER BY total DESC             -- 총매출 내림차순\n'''\nresult = duckdb.query(sql).to_df()  # 결과를 다시 DataFrame 으로 받는다\nprint(result)\n\n# Practice 3 핵심: 같은 집계를 Pandas groupby / Polars Lazy / DuckDB SQL 로 짜고\n# timeit 으로 '동일 반복 횟수'를 맞춰 실행 시간을 공정 비교하는 것.",
      "note": "DuckDB는 커리큘럼(Polars+DuckDB) 필수인데 사이트에 예제가 없었다. timeit 비교 시 세 도구의 number(반복 횟수)를 통일하지 않으면 공정 비교가 아니라 감점 대상이라는 점을 note로 강조한다."
    },
    {
      "title": "실습4: 카이제곱 검정 — 두 범주형 변수의 독립성 (Practice 4)",
      "lang": "python",
      "code": "# 실습4(Practice 4): 지역과 결제수단이 서로 관련 있는가(범주형 vs 범주형)\nimport pandas as pd\nfrom scipy.stats import chi2_contingency  # 카이제곱 독립성 검정 함수\n\ndf = pd.DataFrame({\n    'region': ['서울', '서울', '부산', '부산', '서울', '부산', '서울', '부산'],\n    'pay':    ['카드', '현금', '카드', '카드', '현금', '현금', '카드', '현금'],\n})\n\n# 1) 두 범주형 변수로 분할표(교차표)를 만든다\ntable = pd.crosstab(df['region'], df['pay'])\nprint(table)\n\n# 2) 카이제곱 검정: 지역과 결제수단이 독립인지 검정\nchi2, p, dof, expected = chi2_contingency(table)\nprint('카이제곱:', round(chi2, 3), 'p-value:', round(p, 3))\n\n# 3) 해석은 반드시 코드/주석으로 남긴다(수치만 출력하면 감점)\nif p < 0.05:\n    print('=> p<0.05: 지역과 결제수단은 독립이 아니다(관련 있음)')\nelse:\n    print('=> p>=0.05: 독립이 아니라고 볼 근거가 부족하다')",
      "note": "Practice 4는 t-test 외에 chi2_contingency로 범주형 독립성까지 요구한다. Checkpoint가 \"p<0.05 유의미 여부 판단을 코드/주석으로 남기지 않으면 -20\"이라, 판정 분기를 반드시 넣는 습관을 보여준다."
    }
  ],
  "prompt-1": [
    {
      "title": "자료를 주고 \"없으면 확인 필요\" — 지어내기(할루시네이션) 차단 실험",
      "lang": "python",
      "code": "from openai import OpenAI                     # OpenAI 클라이언트\nclient = OpenAI(api_key=\"sk-본인키\")           # 키는 본인 것으로 교체\n\n# 자료 없이 물으면 모델이 그럴듯하게 '지어낼' 위험이 있다\nbad = \"우리 회사 AI 특강 신청 방법을 안내문으로 써 줘.\"\n\n# 자료를 주고 '자료에 없으면 확인 필요라고 써라' 규칙을 걸면 지어내기가 차단된다\ngood = (\n    \"아래 자료만 사용해서 AI 특강 안내문을 작성해 줘.\\n\"\n    \"자료에 없는 내용은 지어내지 말고 '확인 필요'라고 표시해 줘.\\n\"\n    \"[자료 시작]\\n\"\n    \"행사명: 생성형 AI 특강 / 일시: 7월 15일 14시\\n\"\n    \"장소: 판교 캠퍼스 4층 / 신청: 사내 포털, 7월 10일 마감\\n\"\n    \"[자료 끝]\\n\"\n    \"출력 형식: 1.제목 2.핵심 안내 3.신청 방법 4.확인 필요 사항\"\n)\n\nfor q in [bad, good]:                          # 두 프롬프트를 같은 모델에 보내 비교\n    res = client.chat.completions.create(\n        model=\"gpt-4o-mini\",                   # 사용할 모델\n        messages=[{\"role\": \"user\", \"content\": q}],   # 사용자 질문 1개\n    )\n    print(res.choices[0].message.content[:300])      # 답변 앞부분만 출력\n    print(\"-\" * 40)                            # 두 답변 사이 구분선\n\n# 자료 없는 쪽은 장소·시간을 창작하고, 자료 있는 쪽은 사실과 '확인 필요'를 구분한다",
      "note": "임성열 실습교수의 Prompt 설계와 Context Engineering 실습지 중 \"기법 4. Context 제공 — 자료에 근거해 답하게 하기\"를 코드 실험으로 옮겼다. 같은 요청이라도 [자료 시작]~[자료 끝] 블록과 \"없으면 확인 필요\" 규칙을 넣으면 모델의 창작이 차단되는 것을 눈으로 비교하는 것이 목적이다. RAG 로 가기 전 가장 손쉬운 할루시네이션 제어법이다."
    },
    {
      "title": "ReAct — 확인할 것 정리→검색→관찰→계산 순서로 움직이게 하기",
      "lang": "text",
      "code": "ReAct = Reason(추리) + Act(행동).\n답을 바로 말하게 하지 않고 \"무엇을 확인할지 → 확인 → 관찰 → 계산 → 최종 답\"\n순서로 움직이게 하는 프롬프트 패턴이다. (웹 검색이 되는 AI 도구에서 실행)\n\n[ReAct 프롬프트 — 그대로 붙여 쓰기]\n다음 순서로 답해 줘.\n주제:\n올해 대한민국 최저시급을 기준으로 주 40시간 근무 시 월급을 계산해야 한다.\n답변 순서:\n1. 확인할 정보: 무엇을 알아야 하는지 정리\n2. 검색 또는 확인: 올해 최저시급 정보를 확인\n3. 관찰: 확인한 정보와 출처 정리\n4. 계산: 주 40시간 기준 월급 계산 과정 제시\n5. 최종 답: 한 줄로 정리\n출처가 없거나 확실하지 않은 정보는 '확인 필요'라고 표시해 줘.\n\n[검색 기능이 없는 도구를 쓸 때]\n실제 검색 대신 \"어떤 정보를 어떤 출처(예: 고용노동부 최저임금 고시)에서\n찾아야 하는지\"를 설계하게 해도 같은 훈련 효과가 있다.\n\n[관찰 포인트]\n- 답만 요구할 때와 달리, 어떤 근거로 계산했는지가 단계별로 드러난다\n- 최신 정보가 필요한 질문에서 모델이 기억에 의존해 틀리는 것을 막아 준다",
      "note": "임성열 실습교수 실습지의 \"선택 기법. ReAct — 확인할 정보와 검색 결과를 연결해 답하기\"를 옮긴 것이다. 최저시급처럼 시점에 따라 바뀌는 정보는 모델의 기억이 아니라 확인·관찰 단계를 거쳐 답하게 해야 안전하다는 것이 원 실습의 의도다. 검색 기능이 없는 환경을 위한 대안 설계까지 포함했다."
    },
    {
      "title": "맨몸 질문→3대 한계 진단→5요소 재설계 — 프롬프트 개선 사이클",
      "lang": "text",
      "code": "프롬프트는 한 번에 완성하지 않는다. 일부러 대충 물어 보고(Baseline),\n답의 문제를 진단한 뒤, 요소를 갖춰 다시 쓰는 3단계 사이클을 돈다.\n\n[1단계 Baseline] 가이드 없이 떠오르는 대로 묻고, 답을 그대로 저장해 둔다\nK-뷰티 역직구(해외 직접판매) 시장에 대해 알려줘.\n\n[2단계 진단] 초기 답변을 3가지 관점으로 비판적으로 검증한다\n- 할루시네이션: 출처 불명의 통계·낡은 트렌드가 섞여 있는가?\n- 구조화 부족: 보고서 격식 없이 줄글만 나열되어 읽기 어려운가?\n- 모호성: \"리스크 관리를 잘해야 한다\"류의 뻔한 원론뿐인가?\n\n[3단계 재설계] 5가지 요소를 명확히 분리해 프롬프트를 다시 쓴다\nRole(역할): 10년차 글로벌 커머스 시장 전략 컨설턴트\nObjective(목적): 경영진 보고용 역직구 시장 분석 + 3대 리스크 대응 전략\nContext(맥락): 한국 기업의 동남아·북미 진출 시 물류/결제/규제 상황\nConstraints(제약): 확인 안 된 수치 창작 금지, 비즈니스 톤 유지\nFormat(형식): 대주제-소주제-불릿 구조, 핵심 지표는 표로 출력\n\n[4단계 비교 기록] 초기 답변과 개선 답변을 나란히 놓고\n무엇이 좋아졌는지(구조·근거·구체성) 한 줄씩 기록하면 실습 완성",
      "note": "윤재성 실습교수의 Prompt 설계 종합실습(크로스보더 이커머스 보고서 시나리오)의 1~4단계 진행 방식을 일반화했다. 일부러 Baseline 부터 시작해 할루시네이션·구조화 부족·모호성 3대 한계를 진단하고, Role~Format 5요소로 재설계해 전후를 비교하는 것이 원 실습의 핵심 의도다. 기존 RICE 예제가 요소를 쌓는 법이라면, 이 실습은 나쁜 답을 진단해 고치는 순환 과정을 익힌다."
    },
    {
      "title": "RICE 요소를 하나씩 쌓아 프롬프트 키우기 (v0→v5 실습)",
      "lang": "text",
      "code": "# 실습: 맨몸 프롬프트(v0)에서 시작해 RICE 요소를 한 번에 하나씩 누적한다\n# 시나리오: 오트밀 브랜드의 첫 오프라인 매장을 A/B/C 상권 중 한 곳에 낸다\n\n# [v0] 아무 요소도 없는 기본 프롬프트 — 답이 두루뭉술하고 근거가 없다\n우리 매장 어디에 내는 게 좋을까?\n\n# [v1] + R(Role): 역할을 주면 답의 관점이 전문가로 바뀐다\n너는 리테일 입지 분석 컨설턴트다.\n우리 매장 어디에 내는 게 좋을까?\n\n# [v2] + I(Instruction): 하나의 명확한 지시 + 수치/개수를 못박는다\n너는 리테일 입지 분석 컨설턴트다.\n후보지 A/B/C 중 1곳을 골라 근거 3가지로 정리해.\n\n# [v3] + C(Context): 판단 근거가 될 사실(팩트시트)을 넣는다\n[브랜드] 국산 귀리 100% 무설탕 오트밀 · 객단가 목표 9,000원 · 초기 자금 한정\n[후보지] A 대학가(유동 2.5만·경쟁 12곳) / B 오피스(유동 1.8만·경쟁 7곳) / C 신도시(유동 0.9만·경쟁 3곳)\n\n# [v4] + E(Examples): 원하는 결론 리포트 예시 1개로 톤과 형식을 고정한다\n(예) \"결론: B 추천 / 근거: 아침·점심 수요 강함, 경쟁 보통, 임대료 적정 / 리스크: 주말 한산\"\n\n# [v5] + Format: 출력 구조를 지정한다\n아래 형식으로만 답하라 -> 결론 / 근거 3가지 / 리스크 / 권고\n\n# 관찰 포인트: v0 응답과 v5 응답을 나란히 놓고, 응답을 가장 크게 바꾼 요소 2개를 찾는다",
      "note": "한 번에 완성하지 말고 R→I→C→E→Format 순으로 하나씩 붙이며 매번 다시 생성해 본다. \"어느 곳을 골랐나\"가 아니라 \"요소를 어떻게 누적해 근거 기반 답으로 바뀌었나\"가 핵심이다."
    },
    {
      "title": "Prompt Chaining — 근거 추출→답변 생성 2단계로 나누기",
      "lang": "python",
      "code": "from openai import OpenAI                       # OpenAI 라이브러리 불러오기\nclient = OpenAI(api_key=\"sk-본인키\")             # 클라이언트 생성 (키는 본인 것으로 교체)\n\n# 답을 찾을 원본 문서와 사용자 질문 (실제로는 긴 사내 규정 문서)\ndocument = \"연차 휴가는 입사 1년 후 15일 부여된다. 병가는 연 5일까지 유급이다.\"  # 원본 문서\nquestion = \"연차는 며칠 부여되나요?\"             # 사용자 질문\n\n# 체인 A: 문서에서 질문과 관련된 문장(인용문)만 그대로 뽑아내라고 지시\nprompt_a = f\"\"\"너는 문서 분석가다. 아래 문서에서 질문에 답할 수 있는 문장만 그대로 뽑아라.\n관련 문장이 없으면 '관련 없음'이라고만 답하라.\n문서: {document}\n질문: {question}\"\"\"                            # 역할·지시·문서·질문을 하나로 조립\n\nres_a = client.chat.completions.create(        # A단계 API 호출\n    model=\"gpt-4o-mini\",                       # 사용할 모델\n    messages=[{\"role\": \"user\", \"content\": prompt_a}],  # 사용자 메시지 1개\n)\nquotes = res_a.choices[0].message.content      # A의 출력 = 추출된 인용문(다음 단계 입력이 됨)\n\n# 체인 B: A가 뽑은 인용문에만 근거해 답하라고 지시(엉뚱한 상상=환각 억제)\nprompt_b = f\"\"\"아래 인용문에만 근거해 질문에 한 문장으로 답하라.\n인용문: {quotes}\n질문: {question}\"\"\"                            # A의 결과를 B의 입력으로 연결\n\nres_b = client.chat.completions.create(        # B단계 API 호출\n    model=\"gpt-4o-mini\",                       # 동일 모델\n    messages=[{\"role\": \"user\", \"content\": prompt_b}],  # 사용자 메시지 1개\n)\nprint(\"추출된 근거:\", quotes)                   # 중간 결과(A) 확인\nprint(\"최종 답변:\", res_b.choices[0].message.content)  # 최종 답(B) 출력",
      "note": "복잡한 지시를 한 프롬프트에 몰아넣지 않고 \"찾기(A)→답하기(B)\"로 쪼갠다. A의 출력이 B의 입력이 되며, B가 인용문에만 근거하게 해 환각을 줄인다. 이 구조를 확장하면 조건 분기·도구 호출이 붙는 에이전트가 된다."
    },
    {
      "title": "LLM-as-a-Judge로 결과물 4기준 채점하기",
      "lang": "python",
      "code": "from openai import OpenAI                       # OpenAI 라이브러리 불러오기\nimport json                                     # 채점 결과(JSON)를 파싱하기 위해\nclient = OpenAI(api_key=\"sk-본인키\")             # 클라이언트 생성 (키는 본인 것으로 교체)\n\n# 평가 대상: 어떤 프롬프트가 만들어 낸 광고 문구 결과\nprompt_text = \"Z세대를 겨냥한 에너지 음료 광고 문구 3개를 15자 이내로 만들어줘\"  # 원본 프롬프트\noutput_text = \"힘이 나는 음료 / 너의 하루 충전 / 지치지 마, 파워업\"           # LLM이 낸 결과\n\n# 심사위원 프롬프트: 4개 기준으로 0~5점 채점하고 JSON으로만 답하게 한다\njudge = (                                       # 채점 프롬프트 조립 시작\n    '너는 공정한 프롬프트 결과 평가자다.\\n'      # 심사위원 역할 부여\n    '결과를 목표부합·정확성·창의성·표현력 4개 기준으로 0~5점 채점하라.\\n'  # 평가 루브릭 4항목\n    '반드시 JSON으로만 답하라. 예: {\"창의성\": 2, \"총평\": \"문구가 평범함\"}\\n'  # 출력 형식 고정\n    '원본 프롬프트: ' + prompt_text + '\\n'       # 채점 맥락1: 원본 프롬프트\n    '생성 결과: ' + output_text                   # 채점 맥락2: LLM 결과\n)                                               # 조립 끝\n\nres = client.chat.completions.create(           # 채점 API 호출\n    model=\"gpt-4o-mini\",                        # 사용할 모델\n    messages=[{\"role\": \"user\", \"content\": judge}],  # 심사 프롬프트 전달\n    temperature=0,                              # 채점은 일관성이 중요 → 0으로 고정\n)\nscore = json.loads(res.choices[0].message.content)  # JSON 답변을 파이썬 딕셔너리로 변환\nprint(\"창의성 점수:\", score[\"창의성\"])            # 예: 2 (문구가 평범하면 낮게 나온다)\nprint(\"총평:\", score[\"총평\"])                     # 왜 그 점수인지 한 줄 근거",
      "note": "사람 평가는 정확하지만 느리고 비싸다. 성능 좋은 모델을 심사위원으로 세우면 결과 품질을 빠르게 점수화할 수 있다. temperature=0으로 채점을 일관되게 하고, \"역할 지시·스타일 요구가 없어 창의성이 낮다\"처럼 구조 결함까지 근거로 받아 프롬프트를 고친다."
    },
    {
      "title": "System Prompt 템플릿에 Placeholder 채워 재사용하기",
      "lang": "python",
      "code": "from openai import OpenAI                       # OpenAI 라이브러리 불러오기\nclient = OpenAI(api_key=\"sk-본인키\")             # 클라이언트 생성 (키는 본인 것으로 교체)\n\n# System Prompt 템플릿: {역할}·{분야}·{말투}를 나중에 채울 빈자리(Placeholder)로 둔다\nsystem_tpl = \"너는 {domain} 전문 {role}다. 답변은 항상 {tone} 말투로 한다.\"  # 재사용 가능한 틀\n\n# 상황이 바뀌어도 값만 갈아끼우면 같은 구조를 그대로 재활용할 수 있다\nsystem_msg = system_tpl.format(                # 빈자리에 실제 값을 채운다\n    role=\"상담사\",                              # {role} 자리 → 상담사\n    domain=\"반려동물 건강\",                     # {domain} 자리 → 반려동물 건강\n    tone=\"친근하고 쉬운\",                        # {tone} 자리 → 친근하고 쉬운\n)\nprint(\"완성된 시스템 프롬프트:\", system_msg)      # 채워진 결과를 눈으로 확인\n\n# 완성된 System(역할·규칙)과 User(질문)를 분리해 전달한다\nres = client.chat.completions.create(          # API 호출\n    model=\"gpt-4o-mini\",                       # 사용할 모델\n    messages=[\n        {\"role\": \"system\", \"content\": system_msg},           # 모델의 역할·말투 규칙\n        {\"role\": \"user\", \"content\": \"강아지가 사료를 안 먹어요\"},  # 사용자 질문\n    ],\n)\nprint(\"답변:\", res.choices[0].message.content)  # 템플릿이 정한 역할·말투대로 답한다",
      "note": "System Prompt는 모델의 역할·동작 방식을, User Prompt는 이번 요청을 담당한다. 역할/분야/말투를 Placeholder로 비운 템플릿을 만들어 두면, 값만 바꿔 상담사·마케터·개발자용 봇을 같은 코드로 찍어낼 수 있다."
    },
    {
      "title": "프롬프트 해부학 — 4요소로 나눠 쓰면 답이 또렷해진다",
      "lang": "text",
      "code": "# 좋은 프롬프트 = Instruction + Context + Input + Output 4요소\n# 같은 요청도 4요소로 쪼개 쓰면 답이 산만해지지 않는다\n\n# [나쁜 예] 문법은 맞지만 모호함 — 무엇을·어떤 기준으로·어떤 형식으로가 빠졌다\n구름의 색이 변하는 이유를 설명해줘.\n\n# [좋은 예] 4요소로 분해해 명확하게 지시한다\nInstruction: 구름 색이 달라지는 이유를 설명하라.       # 무엇을 할지(구체적 동사)\nContext: 빛의 산란·파장·태양 위치를 고려해 서술하라.    # 판단에 필요한 배경·조건\nInput: 해 뜰 무렵 붉게 보이는 구름이 왜 생기나요?        # 이번에 처리할 구체적 대상\nOutput: {reason}: {한 문장의 과학적 설명}               # 답을 담을 형식(빈칸 채우기 틀)\n\n# 감정 분류에 그대로 적용한 틀 — Output 형식을 고정하면 채점·자동화가 쉬워진다\nInstruction: 다음 리뷰의 감정을 판단하라(긍정/중립/부정 중 하나).\nContext: 감정 표현이 애매하면 중립으로 분류한다.\nInput: 그 분식집 김밥은 그저 그랬어.\nOutput: {sentiment}: 부정\n\n# 핵심: Output을 {sentiment} 같은 틀로 못박으면 결과가 제각각이지 않다",
      "note": "Instruction만 있으면 모델이 과도하게 추론해 에세이처럼 흩어진다. Context(조건)·Input(대상)·Output(형식)을 함께 주면 답이 목적에 맞게 좁혀진다. 특히 Output 형식을 {sentiment} 같은 빈칸 틀로 고정하는 것이 결과 품질과 자동 처리의 핵심이다."
    }
  ],
  "transformer-1": [
    {
      "title": "Multi-Head Attention — 차원을 나눠 여러 관점으로 보고 다시 합치기",
      "lang": "python",
      "code": "import numpy as np                       # 수치 계산 라이브러리\nnp.random.seed(0)                          # 결과 고정용 시드\n\n# 토큰 3개, 모델 차원 8이라고 가정(임베딩은 학습되지만 여기선 흉내)\nX = np.random.randn(3, 8)                  # (토큰 수, 모델 차원)\nnum_heads = 2                              # 헤드 2개로 나눈다\nhead_dim = 8 // num_heads                  # 각 헤드가 맡는 차원 = 4\n\ndef softmax(s):                            # 행 합이 1이 되도록 정규화\n    e = np.exp(s - s.max(axis=-1, keepdims=True))  # 오버플로 방지\n    return e / e.sum(axis=-1, keepdims=True)\n\noutputs = []                               # 각 헤드 결과를 모을 리스트\nfor h in range(num_heads):                 # 헤드마다 서로 다른 관점으로 계산\n    part = X[:, h*head_dim:(h+1)*head_dim] # 차원을 헤드별로 4개씩 자른다\n    scores = part @ part.T / np.sqrt(head_dim)  # 스케일드 닷-프로덕트 점수\n    weights = softmax(scores)              # 어텐션 가중치(합=1)\n    outputs.append(weights @ part)         # 가중합 = 이 헤드의 결과\nmulti_head = np.concatenate(outputs, axis=-1)   # 여러 헤드를 다시 이어 붙임(concat)\nprint(\"헤드별 결과를 합친 모양:\", multi_head.shape)  # 결과: (3, 8)",
      "note": "멀티헤드 어텐션은 차원을 여러 헤드로 나눠 각기 다른 관점의 관계를 병렬로 계산한 뒤 다시 이어 붙인다. 한 번의 어텐션보다 다양한 상호작용을 잡아낸다."
    },
    {
      "title": "RNN(순차) vs Transformer(병렬) — 왜 어텐션이 빠른가",
      "lang": "python",
      "code": "import numpy as np                       # 수치 계산\n\ntokens = [\"나는\", \"밥을\", \"먹었다\"]         # 토큰 3개\nx = np.array([1.0, 2.0, 3.0])              # 각 토큰의 아주 단순한 값(임베딩 대신)\n\n# 1) RNN 방식: 앞에서 뒤로 '순차'로만 진행(이어달리기)\nhidden = 0.0                               # 이전 정보를 담는 은닉 상태\nfor i, t in enumerate(tokens):             # 반드시 앞 토큰부터 하나씩\n    hidden = hidden * 0.5 + x[i]           # 앞 결과가 있어야 다음 계산 가능\n    print(f\"RNN {t}: 이전을 받아 처리 -> {hidden:.1f}\")  # 중간이 끊기면 흐름 깨짐\n\n# 2) Transformer 방식: 모든 토큰을 '동시에' 서로 참조(병렬)\nscores = np.outer(x, x)                    # 모든 토큰 쌍의 관련도를 한 번에\nweights = scores / scores.sum(axis=1, keepdims=True)  # 행별로 참고 비율화\ncontext = weights @ x                       # 각 토큰이 전체를 동시에 반영\nprint(\"Transformer: 한 번에 전체 참조 ->\", context.round(1))  # 순서 대기 없음",
      "note": "RNN은 앞 토큰 결과가 있어야 다음을 계산해 순차적(병렬화 어려움)이지만, 어텐션은 모든 토큰을 동시에 참조해 병렬 학습이 가능하다. 이 차이가 Transformer 속도의 핵심이다."
    }
  ],
  "transformer-2": [
    {
      "title": "Masked(인과) Self-Attention — 미래 토큰을 가리는 이유",
      "lang": "python",
      "code": "import numpy as np                       # 수치 계산\n\n# 디코더(GPT 계열)는 '미래 토큰'을 미리 보면 안 된다 -> 마스크로 가린다\ntokens = [\"나는\", \"밥을\", \"먹었다\"]         # 토큰 3개\nnp.random.seed(0)                          # 재현용 시드\nX = np.random.randn(3, 4)                  # 각 토큰 임베딩(차원 4)\n\nscores = X @ X.T / np.sqrt(4)              # 토큰끼리의 관련도 점수\nmask = np.triu(np.ones((3, 3)), k=1)       # 위쪽 삼각형(미래 위치)만 1\nscores = np.where(mask == 1, -np.inf, scores)  # 미래 자리는 -무한대로 막는다\n\ndef softmax(s):                            # 행 합이 1이 되게(-inf는 0이 됨)\n    e = np.exp(s - s.max(axis=-1, keepdims=True))\n    return e / e.sum(axis=-1, keepdims=True)\n\nweights = softmax(scores)                  # 마스킹된 어텐션 가중치\nfor i, t in enumerate(tokens):             # 각 토큰이 참고한 비율 확인\n    print(t, \"가 참고:\", weights[i].round(2))  # 뒤 토큰 비율은 항상 0",
      "note": "마스크드 셀프 어텐션은 현재 위치보다 뒤에 올 토큰을 가려, 아직 생성되지 않은 미래 단어를 참고하지 못하게 한다. GPT 같은 CLM이 왼->오 순서로 문장을 만드는 이유다."
    },
    {
      "title": "최종 출력 단계 — logits를 확률로 바꿔 다음 토큰 고르기",
      "lang": "python",
      "code": "from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저\nimport torch                               # 텐서 계산\n\nname = \"gpt2\"                              # 작은 CLM 모델\ntok = AutoTokenizer.from_pretrained(name)  # 토크나이저 로드\nmodel = AutoModelForCausalLM.from_pretrained(name)  # 모델 로드\nmodel.eval()                               # 추론 모드\n\nprompt = \"The capital of France is\"        # 다음 단어를 예측할 문장\nids = tok(prompt, return_tensors=\"pt\").input_ids  # 문장을 토큰 ID로\n\nwith torch.no_grad():                      # 기울기 계산 끔(추론)\n    logits = model(ids).logits             # 각 위치의 단어사전 크기 점수(Linear 출력)\nlast = logits[0, -1]                       # 마지막 위치의 다음-토큰 점수만 사용\nprobs = torch.softmax(last, dim=-1)        # 소프트맥스로 확률 분포 변환\ntop = torch.topk(probs, 5)                 # 확률 상위 5개 후보\n\nfor score, idx in zip(top.values, top.indices):  # 후보를 확률과 함께\n    print(tok.decode(idx), round(score.item(), 3))  # 단어와 확률 출력\n# 가장 확률 높은 토큰을 고르면(greedy) 그것이 생성되는 다음 단어",
      "note": "Transformer 마지막 단계는 결과 벡터를 Linear로 단어사전 크기만큼 펼치고(logits), Softmax로 확률을 만든 뒤 가장 높은 단어를 고른다. 생성이 곧 \"다음 토큰 확률 뽑기\"임을 눈으로 확인한다."
    }
  ],
  "sllm-1": [
    {
      "title": "KV 캐시 켜고 끄고 — 추론 속도 차이 직접 재보기",
      "lang": "python",
      "code": "from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저\nimport torch, time                         # 텐서와 시간 측정\n\nname = \"Qwen/Qwen2.5-0.5B\"                 # 가벼운 소형 모델\ntok = AutoTokenizer.from_pretrained(name)  # 토크나이저 로드\nmodel = AutoModelForCausalLM.from_pretrained(name)  # 모델 로드\nmodel.eval()                               # 추론 모드\n\nprompt = \"인공지능의 미래를 설명하면\"        # 생성 시작 문장\nids = tok(prompt, return_tensors=\"pt\").input_ids  # 토큰 ID로 변환\n\ndef run(use_cache):                        # KV 캐시 사용 여부에 따라 시간 측정\n    t = time.time()                        # 시작 시각\n    with torch.no_grad():                  # 추론\n        model.generate(ids, max_new_tokens=40, do_sample=False,\n                       use_cache=use_cache) # 캐시 on/off만 다르게\n    return round(time.time() - t, 2)       # 걸린 시간(초)\n\nprint(\"KV캐시 끔:\", run(False), \"초\")       # 매 토큰마다 과거를 다시 계산 -> 느림\nprint(\"KV캐시 켬:\", run(True), \"초\")        # 과거 Key/Value 재사용 -> 빠름",
      "note": "Transformer는 토큰을 만들 때마다 이전 토큰들의 Key/Value가 필요하다. KV 캐시는 이를 저장해 재사용함으로써 반복 계산을 없애 추론 속도를 끌어올린다."
    },
    {
      "title": "FAISS로 사내 문서 벡터 인덱스 만들고 검색하기 (RAG 검색부)",
      "lang": "python",
      "code": "from sentence_transformers import SentenceTransformer  # 문장을 벡터로 바꾸는 임베딩 모델\nimport faiss                               # 벡터 유사도 검색 라이브러리(메타 제작)\n\n# 검색 대상 사내 문서 조각들(실제로는 파일을 청크로 나눠 넣는다)\nchunks = [\n    \"연차 휴가는 입사 1년 후 15일이 부여된다.\",   # 문서1\n    \"재택근무는 팀장 승인 시 주 2회까지 가능하다.\", # 문서2\n    \"복지포인트는 매년 1월 1일에 지급된다.\",       # 문서3\n]\nembedder = SentenceTransformer(\"paraphrase-multilingual-MiniLM-L12-v2\")  # 다국어 임베딩\nvecs = embedder.encode(chunks, normalize_embeddings=True)  # 문서들을 벡터로(정규화)\n\nindex = faiss.IndexFlatIP(vecs.shape[1])   # 내적(=코사인) 기준 벡터 인덱스 생성\nindex.add(vecs)                            # 문서 벡터들을 인덱스에 저장\n\nquestion = \"재택근무 며칠까지 돼?\"           # 사용자 질문\nq_vec = embedder.encode([question], normalize_embeddings=True)  # 질문도 같은 방식으로 벡터화\nscores, ids = index.search(q_vec, k=1)     # 가장 가까운 문서 1개 검색\nprint(\"가장 관련 있는 문서:\", chunks[ids[0][0]])  # 결과: 재택근무 문서",
      "note": "FAISS는 문서 벡터를 인덱스에 담아 질문 벡터와 가장 가까운 조각을 빠르게 찾아 준다. 이렇게 찾은 근거를 sLLM 프롬프트에 붙이면 사내 문서 기반 RAG가 된다."
    }
  ],
  "sllm-2": [
    {
      "title": "QLoRA — 4bit로 올린 모델에 LoRA 붙여 저비용 파인튜닝",
      "lang": "python",
      "code": "import torch                             # 텐서 계산\nfrom transformers import (AutoTokenizer, AutoModelForCausalLM,\n                          BitsAndBytesConfig)  # 모델·양자화 설정\nfrom peft import (LoraConfig, get_peft_model, TaskType,\n                  prepare_model_for_kbit_training)  # PEFT 도구\n\nname = \"Qwen/Qwen2.5-1.5B-Instruct\"        # 베이스 sLLM\ntok = AutoTokenizer.from_pretrained(name)  # 토크나이저\ntok.pad_token = tok.eos_token              # 패딩 토큰 지정\n\n# 1) 4bit 양자화 설정으로 모델을 가볍게 올린다(메모리 약 1/4)\nbnb = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type=\"nf4\",\n                         bnb_4bit_compute_dtype=torch.float16)\nmodel = AutoModelForCausalLM.from_pretrained(name, quantization_config=bnb,\n                                             device_map=\"auto\")  # 4bit 로딩\nmodel = prepare_model_for_kbit_training(model)  # 양자화 모델을 학습 가능 상태로 준비\n\n# 2) LoRA 어댑터를 어텐션 투영층에만 붙인다(전체가 아닌 일부만 학습)\nlora = LoraConfig(task_type=TaskType.CAUSAL_LM, r=16, lora_alpha=32,\n                  target_modules=[\"q_proj\", \"k_proj\", \"v_proj\", \"o_proj\"])\nmodel = get_peft_model(model, lora)        # 모델에 LoRA 결합\nmodel.print_trainable_parameters()         # 학습 파라미터 비율 출력(보통 1% 미만)\n# 이후 Trainer로 소량 FAQ 데이터를 학습하면 저비용 도메인 튜닝 완성",
      "note": "QLoRA는 4bit 양자화(메모리 절감)와 LoRA(일부만 학습)를 결합해 큰 모델도 적은 자원으로 파인튜닝한다. prepare_model_for_kbit_training이 양자화 모델을 학습 가능하게 만드는 열쇠다."
    },
    {
      "title": "Prompt Tuning — 가중치는 그대로, 입력 앞 \"가상 토큰\"만 학습",
      "lang": "python",
      "code": "from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저\nfrom peft import (PromptTuningConfig, PromptTuningInit,\n                  get_peft_model, TaskType)  # 프롬프트 튜닝 도구\n\nname = \"Qwen/Qwen2.5-0.5B\"                 # 베이스 sLLM\ntok = AutoTokenizer.from_pretrained(name)  # 토크나이저\nbase = AutoModelForCausalLM.from_pretrained(name)  # 베이스 모델\n\n# 학습 대상은 오직 입력 앞에 붙는 가상 토큰의 임베딩뿐이다\ncfg = PromptTuningConfig(\n    task_type=TaskType.CAUSAL_LM,          # 생성형(CLM) 과제\n    prompt_tuning_init=PromptTuningInit.TEXT,  # 문장으로 초기화\n    num_virtual_tokens=20,                 # 학습되는 가상 토큰 수(매우 적음)\n    prompt_tuning_init_text=\"다음 사내 문서를 바탕으로 정확히 답하라:\",  # 초기 지시문\n    tokenizer_name_or_path=name,           # 초기 문구를 토큰화할 토크나이저\n)\nmodel = get_peft_model(base, cfg)          # 베이스 모델 앞에 가상 프롬프트를 붙인다\nmodel.print_trainable_parameters()         # 학습 파라미터가 극소량임을 확인",
      "note": "프롬프트 튜닝은 모델 내부 가중치 전체가 아니라 입력 앞에 붙는 작은 프롬프트 임베딩만 학습한다. 저장·연산 자원이 극도로 제한된 On-Device 환경에 적합하다."
    },
    {
      "title": "맥락 압축 — 긴 문서를 핵심만 줄여 넣고 답하기",
      "lang": "python",
      "code": "from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저\nimport torch                               # 텐서 계산\n\nname = \"Qwen/Qwen2.5-1.5B-Instruct\"        # sLLM\ntok = AutoTokenizer.from_pretrained(name)  # 토크나이저\nmodel = AutoModelForCausalLM.from_pretrained(name)  # 모델\nmodel.eval()                               # 추론 모드\n\ndef generate(prompt, n=200):               # 프롬프트를 넣어 텍스트를 생성\n    ids = tok(prompt, return_tensors=\"pt\").input_ids  # 토큰화\n    with torch.no_grad():                  # 추론\n        out = model.generate(ids, max_new_tokens=n, do_sample=False)  # 생성\n    return tok.decode(out[0], skip_special_tokens=True)  # 문자열로 복원\n\nlong_doc = \"연차는 입사 1년 후 15일 부여. 반차는 오전·오후로 신청 가능. (이하 긴 규정 원문)\"  # 긴 문서\n# 1) 먼저 문서를 질문 답변에 쓸 '핵심 맥락'으로 압축한다\ncompressed = generate(\"다음 문서를 핵심 규칙만 남겨 압축하라:\\n\" + long_doc, n=150)\n# 2) 압축된 맥락만 근거로 질문에 답한다(토큰 절약 + 잡음 감소)\nanswer = generate(\"아래 맥락만 근거로 답하라.\\n[맥락]\\n\" + compressed + \"\\n[질문]\\n연차는 며칠?\")\nprint(answer)                              # 압축 맥락에 근거한 답 출력",
      "note": "검색된 문서를 통째로 넣으면 토큰이 낭비되고 잡음이 섞인다. 먼저 핵심만 압축한 뒤 그 맥락으로 답하면 제한된 컨텍스트를 효율적으로 쓰면서 정확도를 지킬 수 있다."
    }
  ],
  "langchain-1": [
    {
      "title": "LCEL batch — 여러 입력을 한 번에 처리",
      "lang": "python",
      "code": "from langchain_core.prompts import ChatPromptTemplate  # 프롬프트 양식 도구\nfrom langchain_core.output_parsers import StrOutputParser  # 답에서 글자만 추출\nfrom langchain_anthropic import ChatAnthropic  # 클로드 모델 연동\n\nprompt = ChatPromptTemplate.from_template(\"다음 문장을 영어로 번역해줘: {text}\")  # 빈칸 text\nchain = prompt | ChatAnthropic(model=\"claude-opus-4-8\") | StrOutputParser()  # 프롬프트->모델->파서\n\n# 여러 입력을 리스트로 준비한다(각 딕셔너리가 한 번의 실행)\ninputs = [\n    {\"text\": \"안녕하세요\"},              # 첫 번째 문장\n    {\"text\": \"오늘 날씨가 좋네요\"},       # 두 번째 문장\n    {\"text\": \"저는 AI를 공부합니다\"},     # 세 번째 문장\n]\n# invoke는 1건씩, batch는 여러 건을 한 번에 처리한다(내부적으로 병렬)\nresults = chain.batch(inputs)              # 세 문장을 한꺼번에 번역\nfor r in results:                          # 결과 리스트를 하나씩 꺼내\n    print(r)                               # 번역문 출력",
      "note": "batch를 쓰면 여러 입력을 한 번에 처리해 반복 invoke보다 빠르다. 대량 문서 번역·요약처럼 입력이 많을 때 효과가 크다."
    },
    {
      "title": "RunnableLambda / RunnablePassthrough — 사용자 함수를 체인 부품으로",
      "lang": "python",
      "code": "from langchain_core.runnables import RunnableLambda, RunnablePassthrough  # 사용자 함수·통과 러너블\nfrom langchain_core.prompts import ChatPromptTemplate  # 프롬프트 양식\nfrom langchain_core.output_parsers import StrOutputParser  # 문자열 파서\nfrom langchain_anthropic import ChatAnthropic  # 클로드 모델\n\n# 1) 평범한 파이썬 함수를 러너블로 감싸면 체인 부품이 된다\nto_upper = RunnableLambda(lambda x: x.upper())  # 입력 문자열을 대문자로\nprint(to_upper.invoke(\"langchain\"))        # 결과: LANGCHAIN\n\n# 2) RunnablePassthrough: 받은 입력을 그대로 다음 단계로 흘려보낸다\nprompt = ChatPromptTemplate.from_template(\"{text}를 한 문장으로 요약해줘\")  # 빈칸 text\nchain = ({\"text\": RunnablePassthrough()}   # 들어온 문자열을 text 자리에 그대로 꽂는다\n         | prompt\n         | ChatAnthropic(model=\"claude-opus-4-8\")\n         | StrOutputParser())\n# 딕셔너리로 감싸지 않아도 문자열 입력이 text로 전달된다\nprint(chain.invoke(\"랭체인은 LLM 앱을 부품처럼 조립하게 돕는 프레임워크다.\"))  # 요약 출력",
      "note": "RunnableLambda로 임의의 함수를(전처리·후처리) 체인에 끼워 넣고, RunnablePassthrough로 입력을 원하는 키에 그대로 전달한다. 체인 사이사이에 내 로직을 자연스럽게 삽입하는 도구다."
    },
    {
      "title": "비동기 ainvoke — 여러 호출을 동시에 띄워 시간 아끼기",
      "lang": "python",
      "code": "import asyncio                            # 비동기 실행 관리 표준 라이브러리\nfrom langchain_core.prompts import ChatPromptTemplate  # 프롬프트 양식\nfrom langchain_core.output_parsers import StrOutputParser  # 문자열 파서\nfrom langchain_anthropic import ChatAnthropic  # 클로드 모델\n\nprompt = ChatPromptTemplate.from_template(\"한 문장으로 답해줘: {q}\")  # 빈칸 q\nchain = prompt | ChatAnthropic(model=\"claude-opus-4-8\") | StrOutputParser()  # 체인 조립\n\nasync def main():                          # 비동기 함수 정의\n    questions = [\"하늘은 왜 파랄까?\", \"무지개는 왜 생길까?\", \"바다는 왜 짤까?\"]  # 질문 3개\n    # ainvoke는 비동기 호출, gather로 3개를 동시에 띄운다(순차 대기 없음)\n    answers = await asyncio.gather(*[chain.ainvoke({\"q\": q}) for q in questions])\n    for q, a in zip(questions, answers):   # 질문과 답을 짝지어\n        print(q, \"->\", a)                  # 함께 출력\n\nasyncio.run(main())                        # 비동기 함수 실행",
      "note": "순차 invoke면 대기 시간이 합산되지만, ainvoke+gather는 여러 호출을 겹쳐 전체 시간을 크게 줄인다. 네트워크 호출처럼 기다림이 많은 작업에 특히 효과적이다."
    }
  ],
  "langchain-2": [
    {
      "title": "@chain 데코레이터 — 여러 체인을 하나의 흐름으로 잇기",
      "lang": "python",
      "code": "from langchain_core.runnables import chain  # 함수를 체인(러너블)으로 바꾸는 데코레이터\nfrom langchain_core.prompts import ChatPromptTemplate  # 프롬프트 양식\nfrom langchain_core.output_parsers import StrOutputParser  # 문자열 파서\nfrom langchain_anthropic import ChatAnthropic  # 클로드 모델\n\nmodel = ChatAnthropic(model=\"claude-opus-4-8\")  # 공용 모델 객체\n# 1단계 체인: 주제를 한 문장으로 설명\nexplain = ChatPromptTemplate.from_template(\"{topic}를 한 문장으로 설명해줘\") | model | StrOutputParser()\n# 2단계 체인: 설명을 인스타 게시글로 변환\nto_post = ChatPromptTemplate.from_template(\"다음 설명을 이모지 넣은 인스타 게시글로: {text}\") | model | StrOutputParser()\n\n# @chain을 붙이면 평범한 함수가 하나의 러너블이 된다\n@chain\ndef explain_then_post(topic):              # 두 단계를 순서대로 잇는 사용자 정의 흐름\n    step1 = explain.invoke({\"topic\": topic})   # 먼저 설명을 만들고\n    return to_post.invoke({\"text\": step1})     # 그 결과를 다음 체인 입력으로 넘긴다\n\nprint(explain_then_post.invoke(\"양자역학\"))  # 설명->게시글 두 단계가 한 번에 실행됨",
      "note": "@chain 데코레이터로 여러 체인 호출을 하나의 흐름으로 묶으면, 앞 체인 결과를 뒤 체인 입력으로 자연스럽게 연결할 수 있다. 파이프(|)로 표현하기 복잡한 다단계 로직에 유용하다."
    },
    {
      "title": "FewShotPromptTemplate — 예시 몇 개로 답변 형식 고정",
      "lang": "python",
      "code": "from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate  # 퓨샷·기본 양식\n\n# 1) 모델에게 보여줄 정답 예시 몇 개를 준비한다\nexamples = [\n    {\"q\": \"행복\", \"a\": \"행복 -> 기쁨, 만족, 웃음\"},   # 예시1: 단어->키워드 3개\n    {\"q\": \"슬픔\", \"a\": \"슬픔 -> 눈물, 우울, 상실\"},   # 예시2: 같은 형식\n]\n# 2) 예시 하나를 어떻게 보여줄지 양식을 정한다\nexample_prompt = PromptTemplate(\n    input_variables=[\"q\", \"a\"],            # 예시가 가진 변수\n    template=\"Q: {q}\\nA: {a}\",            # 한 예시의 표시 형태\n)\n# 3) 예시들 + 사용자 질문 자리를 합쳐 퓨샷 프롬프트를 만든다\nfew_shot = FewShotPromptTemplate(\n    examples=examples,                     # 위에서 만든 예시 목록\n    example_prompt=example_prompt,         # 예시 표시 양식\n    suffix=\"Q: {word}\\nA:\",              # 마지막에 붙는 사용자 입력 자리\n    input_variables=[\"word\"],              # 사용자가 채울 변수\n)\n# 완성된 프롬프트를 눈으로 확인한다(예시 2개 + 새 질문)\nprint(few_shot.format(word=\"분노\"))         # 모델은 같은 형식으로 답하게 유도된다",
      "note": "원하는 답변 형식을 말로 길게 설명하는 대신 예시 몇 개를 보여주면, 모델이 그 형식을 그대로 따라 한다. 프롬프트로 표현하기 어려운 출력 스타일을 잡을 때 강력하다."
    },
    {
      "title": "Partial Prompt — 공통 변수는 미리 채워 재사용",
      "lang": "python",
      "code": "from langchain_core.prompts import PromptTemplate  # 기본 프롬프트 양식\n\n# 빈칸 두 개(task, text)를 가진 원본 양식을 만든다\ntemplate = PromptTemplate(\n    input_variables=[\"task\", \"text\"],      # 채워야 할 변수 두 개\n    template=\"너는 도우미다.\\n작업: {task}\\n입력: {text}\\n답변:\",  # 지시 양식\n)\n# partial: 변수 일부(task)를 미리 고정해 둔다\ntranslate = template.partial(task=\"다음 문장을 영어로 번역\")  # task가 이미 채워진 양식\nsummarize = template.partial(task=\"다음 문장을 한 줄로 요약\")  # 같은 양식에 다른 작업 고정\n\n# 이제 남은 변수(text)만 채우면 바로 완성된 프롬프트가 된다\nprint(translate.format(text=\"오늘 회의는 3시입니다.\"))  # 번역용 프롬프트 완성\nprint(summarize.format(text=\"오늘 회의는 3시입니다.\"))  # 요약용 프롬프트 완성",
      "note": "partial로 공통 부분(역할·작업)을 미리 채워 두면, 매번 바뀌는 값만 넣어 같은 양식을 여러 용도로 재사용할 수 있다."
    }
  ],
  "langchain-3": [
    {
      "title": "LangGraph 첫걸음 — State·Node·Edge로 그래프 만들기",
      "lang": "python",
      "code": "from typing import TypedDict            # 상태의 모양을 정의하는 타입\nfrom langgraph.graph import StateGraph, END  # 그래프 뼈대와 종료 표시\n\n# 1) State: 그래프 전체가 공유하는 데이터 상자(질문과 답을 담는다)\nclass GraphState(TypedDict):\n    query: str                             # 사용자 질문\n    answer: str                            # 만들어질 답\n\n# 2) Node: 한 단계 작업을 하는 함수(상태를 받아 일부를 채워 돌려준다)\ndef process(state: GraphState):\n    q = state[\"query\"]                     # 상태에서 질문을 꺼내\n    return {\"answer\": f\"'{q}'에 대한 답입니다.\"}  # answer 필드를 채워 반환\n\n# 3) 그래프를 조립한다\nbuilder = StateGraph(GraphState)           # 상태 형태로 그래프 생성\nbuilder.add_node(\"process\", process)       # process 노드 등록\nbuilder.set_entry_point(\"process\")         # 시작점 지정\nbuilder.add_edge(\"process\", END)           # process 후 종료로 연결\napp = builder.compile()                    # 실행 가능한 앱으로 컴파일\n\n# 4) 실행: 초기 상태를 넣으면 노드를 거쳐 최종 상태가 나온다\nprint(app.invoke({\"query\": \"LangGraph가 뭐야?\"})[\"answer\"])  # 답 출력",
      "note": "LangChain 체인이 직선 흐름이라면, LangGraph는 State(상태)를 Node들이 이어받아 갱신하는 구조다. 이 상태 공유가 이후 분기·반복의 토대가 된다."
    },
    {
      "title": "조건 분기(Conditional Edge) — 질문 유형별로 노드 라우팅",
      "lang": "python",
      "code": "from typing import TypedDict            # 상태 타입\nfrom langgraph.graph import StateGraph, END  # 그래프 뼈대\n\nclass GraphState(TypedDict):               # 공유 상태\n    query: str                             # 질문\n    intent: str                            # 분류 결과\n    answer: str                            # 최종 답\n\ndef router(state: GraphState):             # 질문을 보고 갈 길을 정하는 노드\n    q = state[\"query\"]                     # 질문을 꺼내\n    return {\"intent\": \"policy\" if \"정책\" in q else \"general\"}  # 키워드로 분류\n\ndef policy_node(state):                    # 정책 담당 노드\n    return {\"answer\": \"정책 관련 답변입니다.\"}\ndef general_node(state):                   # 일반 담당 노드\n    return {\"answer\": \"일반 답변입니다.\"}\n\nbuilder = StateGraph(GraphState)           # 그래프 생성\nbuilder.add_node(\"router\", router)         # 분류 노드\nbuilder.add_node(\"policy\", policy_node)    # 정책 노드\nbuilder.add_node(\"general\", general_node)  # 일반 노드\nbuilder.set_entry_point(\"router\")          # 분류부터 시작\n# intent 값에 따라 다음 노드를 고른다(조건 분기의 핵심)\nbuilder.add_conditional_edges(\"router\", lambda s: s[\"intent\"],\n    {\"policy\": \"policy\", \"general\": \"general\"})\nbuilder.add_edge(\"policy\", END)            # 정책 노드 후 종료\nbuilder.add_edge(\"general\", END)           # 일반 노드 후 종료\napp = builder.compile()                    # 컴파일\n\nprint(app.invoke({\"query\": \"회사 정책 알려줘\"})[\"answer\"])  # 정책 노드로 라우팅됨",
      "note": "add_conditional_edges가 상태 값에 따라 다른 노드로 흐름을 가른다. 질문 유형별(RAG/DB/일반 상담)로 처리를 나누는 라우팅이 LangGraph의 대표 패턴이다."
    },
    {
      "title": "LangChain 체인 vs LangGraph — 언제 무엇을 쓰나",
      "lang": "text",
      "code": "# 같은 일도 흐름의 복잡도에 따라 도구를 다르게 고른다\n[LangChain 체인만으로 충분]\n  - 단계가 단순하고 거의 직선(순차) 흐름이다\n  - 분기·반복·상태 공유가 거의 없다\n  - 예: 프롬프트 -> 모델 -> 파서 로 끝나는 요약기·번역기\n[LangGraph가 필요]\n  - 질문 유형에 따라 경로가 갈린다(라우팅이 많다)\n  - 검색->생성->근거부족시 재검색 같은 반복 루프가 있다\n  - 도구를 여러 번 호출하거나 에이전트끼리 협업한다\n  - 중간 상태를 저장했다가 중단/재개해야 한다\n# 정리: '직선이면 체인, 갈래·되돌이가 있으면 그래프'",
      "note": "LangGraph가 항상 정답은 아니다. 단순 직선 흐름은 체인이 더 간단하고, 분기·재시도·상태관리가 필요할 때 그래프의 이점이 커진다."
    }
  ],
  "ml-dl-2": [
    {
      "title": "합성곱(Conv2d) 한 번 직접 통과시켜 피처맵 뽑기",
      "lang": "python",
      "code": "# 덱의 \"필터가 이미지 위를 stride만큼 미끄러지며 특징을 뽑는다\"를 코드로 체감\nimport torch                                  # 파이토치 본체. 텐서(다차원 배열) 연산을 담당한다.\nimport torch.nn as nn                         # 신경망 층(레이어)들이 모여 있는 모듈. Conv2d도 여기 있다.\n\n# 입력 이미지 한 장을 흉내낸다. 모양은 (배치=1, 채널=1, 높이=5, 너비=5) 이다.\n# CNN은 항상 (N, C, H, W) 4차원을 먹는다. 흑백이라 채널은 1개, 크기는 5x5로 작게 잡았다.\nx = torch.tensor([[1,2,3,0,1],\n                  [0,1,2,3,0],\n                  [3,0,1,2,3],\n                  [2,3,0,1,2],\n                  [1,2,3,0,1]], dtype=torch.float32).reshape(1, 1, 5, 5)\n\n# 합성곱 층 하나를 정의한다. 입력채널1 -> 출력채널1(필터 1장), 커널(돋보기) 크기 3x3.\n# padding=0, stride=1 이면 5x5가 3x3으로 줄어든다. 이 \"크기 줄어듦\"이 덱에서 말한 output size 변형이다.\nconv = nn.Conv2d(in_channels=1, out_channels=1, kernel_size=3, stride=1, padding=0)\n\n# 필터 가중치를 직접 지정해 결과를 눈으로 검산할 수 있게 만든다(보통은 학습으로 정해진다).\n# 이 3x3 필터가 이미지의 각 위치와 곱-합(합성곱)되어 그 자리의 특징값 하나를 만든다.\nconv.weight.data = torch.ones(1, 1, 3, 3)     # 모든 칸이 1인 필터 = 3x3 영역의 '합'을 구하는 필터\nconv.bias.data = torch.zeros(1)               # 편향은 0으로 둬서 순수 합성곱 결과만 관찰한다.\n\nfeature_map = conv(x)                          # 필터를 이미지 위로 미끄러뜨리며 전체를 훑는다.\nprint('입력 크기 :', tuple(x.shape))           # (1, 1, 5, 5)\nprint('출력 크기 :', tuple(feature_map.shape)) # (1, 1, 3, 3) — 5x5가 3x3 피처맵으로 압축됐다.\nprint('피처맵:')                                # 각 값은 그 위치 3x3 영역의 합이다(필터가 전부 1이므로).\nprint(feature_map[0, 0])\n# 핵심: 원본은 그대로 두고, 필터와의 연산 결과인 '특징(feature map)'만 새로 만들어낸다.",
      "note": "덱의 Convolution Layer를 한 줄씩 실행해 본다. (N,C,H,W) 4차원 규칙과, padding 없이 3x3 필터를 통과하면 5x5가 3x3으로 줄어드는 output size 변형을 눈으로 확인시킨다. 필터를 전부 1로 고정해 결과를 손으로 검산할 수 있게 한 점이 왕초보용 포인트다."
    },
    {
      "title": "Padding과 MaxPooling으로 크기 보정하고 대표값 추리기",
      "lang": "python",
      "code": "# 덱 순서 그대로: padding으로 크기를 지키고 -> pooling으로 중요한 값만 남긴다\nimport torch                                  # 텐서 연산 라이브러리.\nimport torch.nn as nn                         # 층 정의 모듈.\n\nx = torch.arange(1, 17, dtype=torch.float32).reshape(1, 1, 4, 4)  # 1~16을 4x4 이미지로 만든다.\nprint('원본 4x4:'); print(x[0, 0])            # 실습 데이터가 어떻게 생겼는지 먼저 확인한다.\n\n# padding=1 이면 바깥 테두리에 0을 한 겹 둘러 6x6이 된다. 그 뒤 3x3 필터를 통과하면 다시 4x4로 나온다.\n# 덱에서 말한 \"합성곱 후 줄어드는 크기를 0으로 채워 보정\"이 바로 이 padding의 역할이다.\nconv = nn.Conv2d(1, 1, kernel_size=3, stride=1, padding=1)\nsame = conv(x)                                 # padding 덕분에 입력과 출력의 H,W가 같게 유지된다.\nprint('padding=1 통과 후 크기:', tuple(same.shape))  # (1, 1, 4, 4) — 크기가 안 줄었다.\n\n# MaxPooling: 2x2 창 안에서 '가장 큰 값' 하나만 남기고 나머지는 버린다. 학습 파라미터가 없다.\n# 사진을 절반 크기로 줄이되 가장 두드러진 특징(최댓값)만 보존해, 계산량을 줄이고 위치 변화에 강해진다.\npool = nn.MaxPool2d(kernel_size=2, stride=2)\npooled = pool(x)                               # 4x4 -> 2x2 로 절반씩 축소된다.\nprint('MaxPool 결과(2x2):'); print(pooled[0, 0])  # 각 2x2 블록의 최댓값(6,8,14,16)만 남는다.\n# 정리: Conv로 특징을 뽑고(Padding으로 크기 관리), Pooling으로 핵심만 추려 다음 층으로 넘긴다.",
      "note": "Padding(크기 보정)과 MaxPooling(대표값 추출, 학습 파라미터 없음)을 한 흐름에 보여준다. padding=1 + 3x3 필터가 입력 크기를 그대로 유지한다는 실무 공식과, MaxPool이 왜 계산량을 줄이고 위치 변화에 강해지는지를 실제 숫자로 확인시킨다."
    },
    {
      "title": "작은 CNN 분류기 통째로 — Conv→Pool→Flatten→FC→Softmax",
      "lang": "python",
      "code": "# 덱 요약 \"특징 뽑고(Conv) 추리고(Pool) 펼쳐서(Flatten) 분류(FC+Softmax)\"를 한 모델로\nimport torch                                  # 텐서/자동미분 라이브러리.\nimport torch.nn as nn                         # 신경망 층 모음.\n\n# MNIST 손글씨 숫자 한 장을 흉내낸 입력: (배치8, 채널1, 28x28). 정답은 0~9 중 하나(10분류)다.\nx = torch.randn(8, 1, 28, 28)                 # 실제로는 이미지지만 여기선 난수로 형태만 맞춘다.\n\nclass SmallCNN(nn.Module):                     # 파이토치 모델은 nn.Module을 상속해 만든다.\n    def __init__(self):\n        super().__init__()                     # 부모 초기화는 반드시 먼저 호출해야 층 등록이 된다.\n        # 특징 추출부: Conv로 특징맵을 만들고 ReLU로 비선형성을 준 뒤 Pool로 절반 크기로 줄인다.\n        self.conv1 = nn.Conv2d(1, 16, 3, padding=1)   # 1채널 -> 16장의 특징맵, 크기는 padding으로 28 유지.\n        self.conv2 = nn.Conv2d(16, 32, 3, padding=1)  # 16 -> 32장. 깊어질수록 필터(특징) 수를 늘리는 관례.\n        self.pool = nn.MaxPool2d(2, 2)                # 2x2 풀링. 통과할 때마다 H,W가 절반이 된다.\n        self.relu = nn.ReLU()                         # 음수는 0으로 잘라 중요한 신호만 통과시킨다.\n        # 분류부: 펼친 특징 벡터를 받아 10개 클래스 점수로 바꾸는 완전연결층(FC).\n        # 28 -> pool 두 번 -> 7 이므로, 32채널 x 7 x 7 = 1568 개의 값이 펼쳐진다.\n        self.fc = nn.Linear(32 * 7 * 7, 10)\n\n    def forward(self, x):\n        x = self.pool(self.relu(self.conv1(x)))  # conv1 -> ReLU -> pool. 28x28 특징맵이 14x14로 준다.\n        x = self.pool(self.relu(self.conv2(x)))  # conv2 -> ReLU -> pool. 14x14가 다시 7x7로 준다.\n        x = x.flatten(1)                          # 배치는 두고 나머지를 1줄로 펼친다 -> 분류기가 먹을 수 있는 벡터.\n        return self.fc(x)                         # 10개 클래스별 '점수(logit)'를 낸다.\n\nmodel = SmallCNN()                             # 모델 생성.\nlogits = model(x)                              # 순전파: 이미지 8장을 한 번에 통과시킨다.\nprobs = torch.softmax(logits, dim=1)           # 점수를 확률(합=1)로 바꾼다. 덱의 Softmax가 이 역할이다.\nprint('출력 점수 크기:', tuple(logits.shape))   # (8, 10) — 이미지 8장 x 클래스 10개.\nprint('첫 장의 예측 숫자:', probs[0].argmax().item())  # 가장 확률이 큰 위치 = 모델이 고른 숫자.\n# 파라미터 없는 Pool과 달리 Conv/FC의 가중치는 학습으로 정해진다 -> 앞 차시의 학습 루프를 그대로 붙이면 된다.",
      "note": "덱의 CNN 전체 파이프라인(Conv+ReLU → Pool 반복 → Flatten → FC → Softmax)을 하나의 nn.Module로 조립한다. 28→14→7로 풀링마다 크기가 절반이 되는 계산을 주석으로 따라가 FC 입력 차원 32*7*7이 어디서 나오는지 스스로 유도하게 만든 것이 학습 포인트다."
    },
    {
      "title": "RNN 기초 — 시퀀스를 한 스텝씩 기억하며 처리하기",
      "lang": "python",
      "code": "# 덱의 \"이전 시점 정보를 Hidden State에 저장해 다음을 예측\"을 nn.RNN으로 확인\nimport torch                                  # 텐서 라이브러리.\nimport torch.nn as nn                         # RNN 층이 들어 있는 모듈.\n\n# 시퀀스 데이터: (배치=2, 시간길이=5, 입력특징=3). 예로 5일간 매일 3개 센서값을 읽었다고 보면 된다.\n# RNN은 이 시간 축(길이 5)을 한 스텝씩 순서대로 훑으며, 순서와 관계 정보를 기억한다.\nx = torch.randn(2, 5, 3)\n\n# input_size=3(매 시점 입력 3차원), hidden_size=8(기억 상태 8차원). batch_first=True로 (N,T,F) 순서를 쓴다.\n# 같은 Cell을 시간 축을 따라 펼쳐 쓰는 구조라, 가중치는 모든 시점이 '공유'한다(덱의 핵심 포인트).\nrnn = nn.RNN(input_size=3, hidden_size=8, batch_first=True)\n\noutput, h_n = rnn(x)                           # 시퀀스를 통과시킨다. 내부적으로 t=0..4를 순서대로 계산한다.\n# output: 매 시점의 Hidden State를 다 모은 것 (N, T, hidden). 시점별 출력이 필요할 때 쓴다.\nprint('전체 시점 출력 크기:', tuple(output.shape))  # (2, 5, 8)\n# h_n: 마지막 시점의 Hidden State만 뽑은 것 (층수, N, hidden). \"요약 하나\"가 필요한 분류 등에 쓴다.\nprint('마지막 은닉상태 크기:', tuple(h_n.shape))     # (1, 2, 8)\n\n# output의 맨 끝 시점과 h_n이 같은 값인지 확인 -> \"마지막 Hidden State = 시퀀스의 요약\"임을 체감한다.\nprint('마지막 시점 == h_n ?', torch.allclose(output[:, -1, :], h_n[0]))  # True\n# 이 요약 벡터에 Linear를 붙이면 감성분류, 다음 값 예측 같은 다양한 과제로 확장된다.",
      "note": "덱의 RNN 구조(같은 Cell을 시간 축으로 펼치고 가중치를 공유하며 Hidden State로 과거를 기억)를 nn.RNN 한 줄로 실행한다. output(모든 시점)과 h_n(마지막 요약)의 차이, 그리고 \"마지막 시점 출력 = 시퀀스 요약\"이라는 점을 allclose로 직접 검증하게 한 것이 왕초보 이해의 핵심이다."
    },
    {
      "title": "역전파의 핵심 — autograd가 기울기를 자동 계산",
      "lang": "python",
      "code": "# 신경망이 스스로 배우는 원리: 미분을 autograd 가 대신 해 준다\nimport torch\n\n# requires_grad=True: 이 값에 대한 미분을 추적하라고 표시\nx = torch.tensor(3.0, requires_grad=True)\n\n# 아주 단순한 함수 y = x^2 + 2x 를 정의\ny = x ** 2 + 2 * x\n\n# backward(): y 를 x 로 미분한 값을 자동 계산해 x.grad 에 담는다\ny.backward()\n\n# 손으로 풀면 dy/dx = 2x + 2, x=3 이면 8 — 같은 값이 나온다\nprint('x.grad =', x.grad)  # 결과: tensor(8.)\n\n# 신경망 학습 = '손실을 가중치로 미분'해 그 기울기 반대 방향으로 조금씩 이동.\n# 그 미분을 사람이 아니라 autograd 가 대신하는 것이 딥러닝 프레임워크의 힘.",
      "note": "커리큘럼의 순전파·역전파를 수식이 아니라 손으로 검산 가능한 예로 체감. dy/dx=2x+2를 직접 계산해 x.grad와 맞춰 보게 하면 \"역전파=자동 미분\"이 왕초보에게도 명확해진다."
    },
    {
      "title": "학습 루프의 표준 4박자 — forward→loss→backward→step",
      "lang": "python",
      "code": "# 모든 신경망 학습이 반복하는 4단계 (PyTorch 표준 골격)\nimport torch\nimport torch.nn as nn\n\n# 단순 회귀: y = 2x 를 배우게 한다\nX = torch.tensor([[1.0], [2.0], [3.0], [4.0]])  # 입력\ny = torch.tensor([[2.0], [4.0], [6.0], [8.0]])  # 정답(2배)\n\nmodel = nn.Linear(1, 1)                     # 입력1 -> 출력1 (기울기·절편을 학습)\nloss_fn = nn.MSELoss()                      # 회귀용 손실: 오차 제곱의 평균\noptimizer = torch.optim.SGD(model.parameters(), lr=0.01)  # 경사하강, 학습률 0.01\n\nfor epoch in range(200):        # 같은 데이터를 200번 반복 학습\n    pred = model(X)             # 1) 순전파: 현재 가중치로 예측\n    loss = loss_fn(pred, y)     # 2) 손실: 정답과 얼마나 다른가\n    optimizer.zero_grad()       # 3) 이전 기울기 초기화(안 하면 누적됨)\n    loss.backward()             #    역전파: 기울기 계산\n    optimizer.step()            # 4) 갱신: 기울기 반대로 가중치 이동\n\nprint('학습된 기울기:', round(model.weight.item(), 3))  # 2.0 에 가까워짐\nprint('마지막 손실:', round(loss.item(), 5))            # 0 에 수렴",
      "note": "커리큘럼의 손실함수·옵티마이저(SGD)·학습률·학습 루프를 한 화면에. zero_grad를 빠뜨리면 기울기가 누적돼 학습이 망가진다는 흔한 실수까지 주석으로 짚는, ml-dl-2의 핵심 골격 예제."
    },
    {
      "title": "학습 안정화 — 배치 정규화(BatchNorm)",
      "lang": "python",
      "code": "# 층에 들어오는 값의 분포를 고르게 맞춰 학습을 안정시키기\nimport torch\nimport torch.nn as nn\n\n# 흔한 패턴: Linear -> BatchNorm -> ReLU 순서로 쌓는다\nnet = nn.Sequential(\n    nn.Linear(4, 8),      # 입력 4 -> 은닉 8\n    nn.BatchNorm1d(8),    # 8개 출력을 배치 단위로 평균0·분산1 정규화\n    nn.ReLU(),            # 비선형\n    nn.Linear(8, 3),      # 은닉 8 -> 출력 3(클래스)\n)\n\nx = torch.randn(16, 4)   # 배치 16개, 각 4차원 입력\nout = net(x)             # 통과\nprint('출력 shape:', out.shape)  # torch.Size([16, 3])\n\n# BatchNorm 은 학습 중 각 층 입력 분포가 흔들리는 것을 잡아 줘,\n# 더 큰 학습률을 써도 안정적으로 수렴하도록 돕는다(속도·안정성 향상).",
      "note": "커리큘럼에 \"배치 정규화와 학습 안정화\"가 명시되나 예제가 없었다. Linear→BatchNorm→ReLU 배치 순서라는 실무 관례를 코드로 보여준다."
    }
  ],
  "ml-dl-3": [
    {
      "title": "LSTM으로 사인파 다음 값 예측 (게이트로 긴 기억 유지)",
      "lang": "python",
      "code": "# 덱의 \"RNN은 짧은 기억, LSTM은 Cell State+Gate로 긴 기억\"을 실제 학습으로 확인\nimport torch                                  # 텐서/자동미분.\nimport torch.nn as nn                         # LSTM 층 포함 모듈.\n\n# 규칙이 뚜렷한 사인파를 만든다. 앞 20개를 보고 '바로 다음 값'을 맞히는 시계열 예측 문제로 만든다.\nseries = torch.sin(torch.linspace(0, 30, 300))  # 300개 점으로 된 매끈한 파형.\nseq_len = 20                                     # 한 번에 들여다볼 과거 구간의 길이(윈도우).\n# 슬라이딩 윈도우: [i:i+20]을 입력으로, [i+20]을 정답으로 하는 (입력,정답) 쌍을 잔뜩 만든다.\nX = torch.stack([series[i:i+seq_len] for i in range(len(series)-seq_len)]).unsqueeze(-1)\ny = series[seq_len:].unsqueeze(-1)               # 각 윈도우 바로 다음의 실제 값(정답).\n\nclass LSTMReg(nn.Module):                        # 시계열 회귀용 LSTM 모델.\n    def __init__(self):\n        super().__init__()\n        # LSTM: 입력 1차원, 은닉 32차원. Cell State(장기기억)와 3개 Gate로 오래된 정보도 선택적으로 보존한다.\n        self.lstm = nn.LSTM(input_size=1, hidden_size=32, batch_first=True)\n        self.fc = nn.Linear(32, 1)                # 마지막 은닉상태 -> 다음 값(숫자 1개)로 변환.\n    def forward(self, x):\n        out, (h_n, c_n) = self.lstm(x)            # LSTM은 Hidden State와 Cell State 두 개를 함께 넘긴다.\n        return self.fc(out[:, -1, :])             # 마지막 시점의 요약만 뽑아 다음 값을 예측한다.\n\nmodel = LSTMReg()                                # 모델 생성.\nopt = torch.optim.Adam(model.parameters(), lr=0.01)  # 적응형 옵티마이저 Adam.\nloss_fn = nn.MSELoss()                           # 숫자 예측이므로 오차 제곱 평균(회귀 손실).\n\nfor epoch in range(150):                         # 같은 데이터를 150번 반복 학습.\n    pred = model(X)                              # 순전파: 모든 윈도우의 다음 값을 예측.\n    loss = loss_fn(pred, y)                      # 정답과의 오차.\n    opt.zero_grad(); loss.backward(); opt.step() # 기울기 초기화 -> 역전파 -> 가중치 갱신.\n\nprint('최종 손실:', round(loss.item(), 5))        # 0에 가까워지면 파형 규칙을 학습한 것.\nprint('예측 예시:', round(model(X[:1]).item(), 3), '/ 실제:', round(y[0].item(), 3))\n# 시계열은 텍스트와 달리 Softmax 없이 예측값을 그대로 출력한다(덱의 \"시계열은 Softmax 불필요\").",
      "note": "종합실습답게 데이터 생성(슬라이딩 윈도우)→모델→학습 루프를 한 흐름에 담았다. LSTM이 Hidden State와 Cell State 두 상태를 함께 반환한다는 구조적 차이와, 덱이 강조한 \"시계열 회귀는 Softmax 없이 예측값을 그대로 내보낸다\"는 점을 회귀 손실(MSELoss)로 연결해 보여준다."
    },
    {
      "title": "AutoEncoder — 압축(Encoder)했다 복원(Decoder)하며 특징 학습",
      "lang": "python",
      "code": "# 덱의 \"입력 -> 압축(Encoder) -> Latent -> 복원(Decoder) -> 출력, 입출력이 같아지게 학습\"\nimport torch                                  # 텐서/자동미분.\nimport torch.nn as nn                         # 층 모음.\n\n# 28x28 흑백 이미지를 784개 숫자로 펼친 것을 흉내낸다. 정답 라벨이 없다 -> 비지도(스스로) 학습이다.\nx = torch.rand(64, 784)                        # 배치 64장, 각 784차원(0~1 픽셀값).\n\nclass AutoEncoder(nn.Module):                  # 인코더-디코더가 대칭을 이루는 구조.\n    def __init__(self):\n        super().__init__()\n        # Encoder: 784 -> 128 -> 32 로 차원을 점점 줄인다. 가장 좁은 32차원이 Latent(병목)=핵심 특징이다.\n        self.encoder = nn.Sequential(\n            nn.Linear(784, 128), nn.ReLU(),     # 1차 압축. ReLU로 비선형 특징을 잡는다.\n            nn.Linear(128, 32),  nn.ReLU(),     # 2차 압축. 여기 32개 숫자에 이미지의 요점이 담기게 된다.\n        )\n        # Decoder: 32 -> 128 -> 784 로 다시 늘려 원본 크기로 복원한다(Encoder를 거울처럼 뒤집은 형태).\n        self.decoder = nn.Sequential(\n            nn.Linear(32, 128),  nn.ReLU(),     # 압축된 특징을 다시 펼치기 시작.\n            nn.Linear(128, 784), nn.Sigmoid(),  # 마지막은 Sigmoid로 0~1 픽셀 범위에 맞춘다.\n        )\n    def forward(self, x):\n        z = self.encoder(x)                     # 입력을 32차원 Latent 벡터로 압축.\n        return self.decoder(z), z               # 복원 이미지와 Latent를 함께 돌려준다.\n\nmodel = AutoEncoder()                           # 모델 생성.\nopt = torch.optim.Adam(model.parameters(), lr=1e-3)  # Adam 옵티마이저.\nloss_fn = nn.MSELoss()                          # 복원 오차: '입력과 출력이 얼마나 다른가'가 곧 손실이다.\n\nfor epoch in range(50):                         # 반복 학습.\n    recon, z = model(x)                         # 순전파: 압축 후 복원.\n    loss = loss_fn(recon, x)                    # 정답이 따로 없다! 정답이 곧 '입력 자기 자신'이다.\n    opt.zero_grad(); loss.backward(); opt.step() # 기울기 초기화 -> 역전파 -> 갱신.\n\nprint('복원 손실:', round(loss.item(), 5))       # 작아질수록 784 -> 32로 줄였다 복원해도 원본과 비슷하다는 뜻.\nprint('Latent(압축) 크기:', tuple(z.shape))      # (64, 32) — 784차원이 32차원으로 압축됐다.\n# 핵심: 좁은 병목을 통과시키면 '중요한 특징만' 남는다. 이 Latent를 분류기에 넣으면 특징 추출기로도 쓴다.",
      "note": "덱의 AutoEncoder 구조(대칭 Encoder-Decoder, 좁은 Latent 병목)를 그대로 구현한다. 라벨 없이 \"정답이 곧 입력 자기 자신\"이라 손실이 복원 오차가 된다는 비지도 학습의 핵심을 코드로 못박고, 784→32 압축을 눈으로 확인시켜 차원 축소·특징 추출 도구로서의 의미까지 짚는다."
    },
    {
      "title": "Denoising AutoEncoder — 노이즈 섞인 입력을 깨끗하게 복원",
      "lang": "python",
      "code": "# 덱 확장표의 \"일부러 입력에 노이즈를 넣고, 깨끗한 원본으로 복원 -> 강인한 특징 학습\"\nimport torch                                  # 텐서/자동미분.\nimport torch.nn as nn                         # 층 모음.\n\nclean = torch.rand(64, 784)                    # 원본(깨끗한) 이미지 64장. 이것이 복원의 '정답'이다.\n# 입력에 가우시안 노이즈를 더해 일부러 지저분하게 만든다. clamp로 0~1 픽셀 범위를 벗어나지 않게 자른다.\n# 손상된 것을 보고 원본을 맞히도록 학습하면, 모델은 잡음이 아닌 '본질적 특징'에 집중하게 된다.\nnoisy = (clean + 0.3 * torch.randn_like(clean)).clamp(0, 1)\n\nmodel = nn.Sequential(                          # 간단히 Sequential로 인코더-디코더를 이어 붙인다.\n    nn.Linear(784, 128), nn.ReLU(),             # Encoder 1: 784 -> 128 압축.\n    nn.Linear(128, 32),  nn.ReLU(),             # Encoder 2: 128 -> 32 (Latent 병목).\n    nn.Linear(32, 128),  nn.ReLU(),             # Decoder 1: 32 -> 128 확장.\n    nn.Linear(128, 784), nn.Sigmoid(),          # Decoder 2: 128 -> 784, Sigmoid로 0~1 픽셀 복원.\n)\nopt = torch.optim.Adam(model.parameters(), lr=1e-3)  # Adam 옵티마이저.\nloss_fn = nn.MSELoss()                          # 복원 오차.\n\nfor epoch in range(60):                         # 반복 학습.\n    recon = model(noisy)                        # 입력은 '노이즈 낀' 이미지.\n    loss = loss_fn(recon, clean)                # 정답은 '깨끗한 원본' — 여기서 잡음 제거를 배운다.\n    opt.zero_grad(); loss.backward(); opt.step() # 기울기 초기화 -> 역전파 -> 갱신.\n\n# 학습 후, 노이즈 입력을 얼마나 원본에 가깝게 되돌리는지 오차로 비교한다.\nbefore = loss_fn(noisy, clean).item()           # 복원 전: 노이즈 이미지와 원본의 차이(크다).\nafter = loss_fn(model(noisy), clean).item()     # 복원 후: 모델이 되돌린 이미지와 원본의 차이(작아짐).\nprint('노이즈 제거 전 오차:', round(before, 4))\nprint('노이즈 제거 후 오차:', round(after, 4))   # after < before 이면 잡음을 걷어내는 데 성공한 것.\n# 입력을 손상시켜도 본질을 뽑아내도록 훈련하므로, 일반 AE보다 견고한(robust) 특징을 배운다.",
      "note": "덱 확장표의 Denoising AE를 구현한다. \"입력=노이즈, 정답=원본\"이라는 학습 설정만 바꾸면 잡음 제거 모델이 된다는 점을 보여주고, 복원 전/후 오차를 직접 비교해 효과를 수치로 증명한다. 손상된 입력에서 본질을 뽑게 하면 더 강인한 특징이 학습된다는 종합실습 수준의 통찰을 전한다."
    },
    {
      "title": "종합실습: 같은 데이터에 ML 베이스라인 vs DL 비교",
      "lang": "python",
      "code": "# 하나의 데이터셋을 ML(sklearn)과 DL(PyTorch) 양쪽으로 풀어 비교\nfrom sklearn.datasets import load_wine\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.ensemble import RandomForestClassifier\nimport torch, torch.nn as nn\n\nX, y = load_wine(return_X_y=True)  # 와인 13개 특징 -> 3개 품종 분류\nXtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=0)\nsc = StandardScaler().fit(Xtr)               # 스케일러는 학습셋에만 fit(누수 방지)\nXtr, Xte = sc.transform(Xtr), sc.transform(Xte)\n\n# 1) ML 베이스라인: 손 안 대고 바로 강력한 랜덤포레스트\nrf = RandomForestClassifier(random_state=0).fit(Xtr, ytr)\nprint('ML(RandomForest) 정확도:', round(rf.score(Xte, yte), 3))\n\n# 2) DL: 작은 MLP 신경망으로 같은 문제 풀기\nnet = nn.Sequential(nn.Linear(13, 16), nn.ReLU(), nn.Linear(16, 3))\nopt = torch.optim.Adam(net.parameters(), lr=0.01)  # Adam 옵티마이저\nxb, yb = torch.tensor(Xtr, dtype=torch.float32), torch.tensor(ytr)\nfor _ in range(300):                            # 학습 루프\n    loss = nn.CrossEntropyLoss()(net(xb), yb)   # 분류용 손실\n    opt.zero_grad(); loss.backward(); opt.step()\n\npred = net(torch.tensor(Xte, dtype=torch.float32)).argmax(1)  # 가장 큰 점수=예측\nacc = (pred == torch.tensor(yte)).float().mean().item()\nprint('DL(MLP) 정확도:', round(acc, 3))\n# 표 형태 소규모 데이터는 ML 이 종종 더 강하다 — DL 이 항상 답은 아님을 확인.",
      "note": "종합실습 목표(동일 데이터에 ML→DL 통합, 베이스라인부터 비교) 그대로. 스케일러 누수 방지·CrossEntropyLoss·Adam까지 앞 차시 내용을 한 흐름에 모으고, \"정형 소규모 데이터에선 ML이 더 나을 수 있다\"는 현실적 교훈을 준다."
    },
    {
      "title": "성능 개선의 출발 — 과적합인지 train vs 검증으로 진단",
      "lang": "python",
      "code": "# 성능이 안 나올 때 먼저 볼 것: 외웠는가(과적합)? 학습/검증 점수 차이로 진단\nfrom sklearn.datasets import load_wine\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\n\nX, y = load_wine(return_X_y=True)\nXtr, Xval, ytr, yval = train_test_split(X, y, test_size=0.3, random_state=0)\n\n# 트리 깊이를 키워가며 학습/검증 정확도를 함께 본다\nfor depth in [1, 3, 5, None]:  # None = 제한 없이 끝까지(가장 복잡)\n    m = DecisionTreeClassifier(max_depth=depth, random_state=0).fit(Xtr, ytr)\n    tr = m.score(Xtr, ytr)     # 학습 데이터 점수\n    val = m.score(Xval, yval)  # 처음 보는 검증 점수\n    print('depth=', depth, '| train=', round(tr, 3), 'val=', round(val, 3))\n\n# train 은 1.0 인데 val 이 뚝 떨어지면 '과적합' — 데이터를 외워버린 것.\n# 이때 max_depth 제한·드롭아웃·정규화·데이터 추가로 격차를 줄이는 것이 개선 단계.",
      "note": "종합실습의 \"성능 개선(정규화·드롭아웃·튜닝)\" 앞단계인 진단을 다룬다. 통계교재의 과적합·일반화 개념을 train/val 격차로 눈에 보이게 만들어, 무엇을 개선해야 하는지 근거를 먼저 잡게 한다."
    }
  ],
  "modeldev-1": [
    {
      "title": "학습·검증·테스트 3분할 (train_test_split 두 번)",
      "lang": "python",
      "code": "from sklearn.datasets import load_iris                # 연습용 데이터\nfrom sklearn.model_selection import train_test_split  # 분할 도구\n\nX, y = load_iris(return_X_y=True)  # 설명변수 X, 정답 y 를 한 번에 받기\n\n# 1차: 전체를 학습용(60%) vs 임시(40%)로 나눈다 (정답 비율 유지)\nX_tr, X_tmp, y_tr, y_tmp = train_test_split(X, y, test_size=0.4, stratify=y, random_state=0)\n\n# 2차: 임시(40%)를 다시 검증(20%) vs 테스트(20%)로 절반씩 나눈다\nX_val, X_te, y_val, y_te = train_test_split(X_tmp, y_tmp, test_size=0.5, stratify=y_tmp, random_state=0)\n\n# 학습=모델 훈련용, 검증=하이퍼파라미터 고르는 용, 테스트=마지막 성능 확인용\nprint(len(X_tr), len(X_val), len(X_te))  # 결과: 90 30 30 (60:20:20 분할)",
      "note": "검증셋은 하이퍼파라미터를 고르는 데만 쓰고, 테스트셋은 맨 마지막 한 번만 열어 봐야 진짜 일반화 성능이다."
    },
    {
      "title": "층화 K겹 교차검증으로 일반화 성능 재기 (StratifiedKFold)",
      "lang": "python",
      "code": "from sklearn.datasets import load_breast_cancer         # 이진 분류 데이터\nfrom sklearn.model_selection import StratifiedKFold, cross_val_score  # 층화 K겹 교차검증\nfrom sklearn.linear_model import LogisticRegression     # 분류 모델\n\nX, y = load_breast_cancer(return_X_y=True)  # 입력 X, 정답 y\n\n# StratifiedKFold: 각 겹(fold)마다 정답 비율을 똑같이 유지하며 5조각으로 나눈다\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)\nmodel = LogisticRegression(max_iter=5000)   # 반복 횟수를 넉넉히 줘서 수렴시킨다\n\n# 5번 학습/검증을 돌려 매번 점수를 받는다 (한 번 분할의 운에 흔들리지 않게)\nscores = cross_val_score(model, X, y, cv=cv)\nprint('겹별 점수:', scores.round(3))          # 결과 예: [0.965 0.947 0.956 0.974 0.956]\nprint('평균/표준편차:', round(scores.mean(), 3), '/', round(scores.std(), 3))  # 일반화 성능 요약",
      "note": "한 번 나눈 점수는 운에 좌우되므로 여러 겹의 평균과 표준편차로 봐야 믿을 수 있다. 겹마다 정답 비율을 지키는 것이 StratifiedKFold의 핵심이다."
    },
    {
      "title": "불균형 데이터: 소수 클래스 오버샘플링 (resample)",
      "lang": "python",
      "code": "import numpy as np                                  # 배열 처리\nfrom sklearn.utils import resample                  # 표본을 다시 뽑는 도구\nfrom collections import Counter                     # 개수 세기\n\n# 정답이 0:90개, 1:10개로 심하게 치우친 상황을 흉내 낸다\nX = np.arange(100).reshape(-1, 1)                   # 특징 1개짜리 예시 데이터\ny = np.array([0] * 90 + [1] * 10)                   # 소수 클래스(1)가 10개뿐\n\n# 소수 클래스(1)만 골라낸다\nX_min, y_min = X[y == 1], y[y == 1]\n# 다수 클래스 개수(90)만큼 복원추출로 뻥튀기한다 (오버샘플링)\nX_up, y_up = resample(X_min, y_min, replace=True, n_samples=90, random_state=0)\n\n# 다수 클래스 + 늘린 소수 클래스를 다시 합친다\nX_bal = np.vstack([X[y == 0], X_up])                # 특징 합치기\ny_bal = np.concatenate([y[y == 0], y_up])           # 정답 합치기\nprint('전:', Counter(y), ' 후:', Counter(y_bal))    # 결과: 전 {0:90,1:10} 후 {0:90,1:90}",
      "note": "소수 클래스를 복원추출로 늘리면 모델이 소수 클래스를 무시하지 않는다. 단, 검증·테스트셋은 오버샘플링하지 말고 학습셋에만 적용해야 성능이 부풀지 않는다."
    }
  ],
  "modeldev-2": [
    {
      "title": "GridSearchCV로 모든 조합을 촘촘히 탐색",
      "lang": "python",
      "code": "from sklearn.datasets import load_iris                 # 연습용 데이터\nfrom sklearn.svm import SVC                             # 서포트 벡터 분류기\nfrom sklearn.model_selection import GridSearchCV        # 격자(모든 조합) 탐색\n\nX, y = load_iris(return_X_y=True)  # 입력 X, 정답 y\n\n# 후보 값들을 격자로 준다 -> C 3개 x gamma 3개 = 9개 조합을 전부 시험한다\ngrid = {'C': [0.1, 1, 10], 'gamma': [0.01, 0.1, 1]}\n\n# 각 조합마다 5겹 교차검증 -> 총 9x5=45번 학습해 가장 좋은 조합을 고른다\nsearch = GridSearchCV(SVC(), grid, cv=5)\nsearch.fit(X, y)\n\nprint('최적 조합:', search.best_params_)          # 결과 예: {'C': 1, 'gamma': 0.1}\nprint('최적 점수:', round(search.best_score_, 3))  # 결과 예: 0.98",
      "note": "Grid는 후보를 빠짐없이 훑어 확실하지만 조합이 늘면 급격히 느려진다. 후보가 많으면 RandomizedSearch(무작위)나 Bayesian(Optuna)으로 넘어간다."
    },
    {
      "title": "Optuna로 베이지안 최적화 — 이전 결과를 기억하며 탐색",
      "lang": "python",
      "code": "# 설치: pip install optuna scikit-learn\nimport optuna                                          # 베이지안 최적화 도구\nfrom sklearn.datasets import load_breast_cancer        # 이진 분류 데이터\nfrom sklearn.ensemble import RandomForestClassifier    # 랜덤포레스트\nfrom sklearn.model_selection import cross_val_score    # 교차검증 점수\n\nX, y = load_breast_cancer(return_X_y=True)  # 입력 X, 정답 y\n\n# Optuna가 매 시도마다 부를 함수 - trial이 다음에 시험할 값을 제안한다\ndef objective(trial):\n    # 정해진 범위 안에서 다음에 시험할 값을 베이지안 방식으로 제안받는다\n    n = trial.suggest_int('n_estimators', 50, 300)         # 트리 개수 후보 범위\n    depth = trial.suggest_int('max_depth', 2, 16)          # 트리 깊이 후보 범위\n    model = RandomForestClassifier(n_estimators=n, max_depth=depth, random_state=0)\n    return cross_val_score(model, X, y, cv=5).mean()       # 5겹 평균 점수 반환(클수록 좋음)\n\n# 점수를 최대화하는 방향으로 30번만 똑똑하게 탐색한다\nstudy = optuna.create_study(direction='maximize')\nstudy.optimize(objective, n_trials=30)\nprint('최적 값:', study.best_params, '점수:', round(study.best_value, 3))",
      "note": "Grid/Random은 이전 결과를 무시하고 뽑지만, Bayesian(Optuna)은 지금까지 점수가 좋았던 구간을 기억해 다음 후보를 더 똑똑하게 고른다. 그래서 적은 시도로도 좋은 값을 찾는다."
    },
    {
      "title": "회귀 오차지표 MAPE의 비대칭 함정과 sMAPE 보정",
      "lang": "python",
      "code": "import numpy as np                                    # 배열 계산\n\n# 실제값(A)과 예측값(F)을 두 쌍으로 준비한다\nA = np.array([1.0, 100.0])    # 실제값: 아주 작은 값 1, 큰 값 100\nF = np.array([2.0, 101.0])    # 예측값: 둘 다 실제보다 1 큼(오차 크기는 똑같이 1)\n\n# MAPE = |A-F|/|A| 의 평균 x100(%) - 분모가 실제값이라 작은 값에서 오차가 폭발한다\nmape = np.mean(np.abs(A - F) / np.abs(A)) * 100\n# sMAPE = |A-F| / ((|A|+|F|)/2) 의 평균 x100(%) - 분모를 실제/예측 평균으로 바꿔 완화\nsmape = np.mean(np.abs(A - F) / ((np.abs(A) + np.abs(F)) / 2)) * 100\n\nprint('한 건씩 MAPE:', (np.abs(A - F) / A * 100).round(2))  # 결과: [100.   1.] 오차는 같은데 100% vs 1%\nprint('MAPE 평균 :', round(mape, 2))                        # 결과: 50.5 (작은 값 하나에 휘둘림)\nprint('sMAPE 평균:', round(smape, 2))                       # 결과: 33.83 (덜 치우침)",
      "note": "오차 크기가 똑같이 1이어도 실제값이 작으면 MAPE가 100%로 튄다(비대칭 함정). 분모를 실제/예측 평균으로 바꾼 sMAPE가 이 쏠림을 완화한다. 값의 크기 차이가 큰 수요예측 문제에서 지표 선택이 중요하다."
    }
  ],
  "serving-1": [
    {
      "title": "APIRouter로 라우터를 분리하고 include_router로 합치기",
      "lang": "python",
      "code": "# api/routers/task.py - 할 일(Task) 관련 엔드포인트만 모아 둔 라우터 파일\nfrom fastapi import APIRouter          # 여러 경로를 묶어 관리하는 미니 라우터\n\nrouter = APIRouter()                   # 이 파일 전용 라우터 객체를 만든다\n\n@router.get('/tasks')                  # GET /tasks - 목록 조회 경로 동작 함수\nasync def list_tasks():                # async: 대기 시간에 다른 요청도 처리\n    return [{'id': 1, 'title': '첫 번째 할 일'}]  # 지금은 더미 데이터를 반환\n\n@router.post('/tasks')                 # POST /tasks - 새 할 일 생성\nasync def create_task():\n    return {'id': 2, 'title': '새 할 일'}\n\n# ---- api/main.py - 앱 본체에서 위 라우터를 불러와 합친다 ----\nfrom fastapi import FastAPI\nfrom api.routers import task           # 방금 만든 task 라우터 모듈 가져오기\n\napp = FastAPI()                        # FastAPI 앱 본체\napp.include_router(task.router)        # task 라우터의 모든 경로를 앱에 등록한다",
      "note": "엔드포인트가 늘면 main.py가 비대해지므로 리소스별로 파일을 나눠 APIRouter로 만들고 include_router로 합친다. Swagger UI(/docs)에 등록된 경로가 그대로 나타난다."
    },
    {
      "title": "Pydantic 스키마로 요청·응답 타입 정의 (BaseModel 상속)",
      "lang": "python",
      "code": "from fastapi import APIRouter\nfrom pydantic import BaseModel, Field  # 데이터 검증용 기본 클래스와 필드 설정\n\nrouter = APIRouter()\n\n# 공통 필드(title)를 담는 부모 스키마 - 중복 없이 물려주기 위함\nclass TaskBase(BaseModel):\n    title: str | None = Field(None, example='세탁물 찾아오기')  # 제목: 문자열 또는 None\n\nclass TaskCreate(TaskBase):            # 생성 요청용 - id 없이 title만 받는다\n    pass\n\nclass TaskCreateResponse(TaskCreate):  # 생성 응답용 - 서버가 매긴 id를 덧붙인다\n    id: int\n\n# response_model을 지정하면 반환값이 이 스키마에 맞는지 자동 검증/직렬화된다\n@router.post('/tasks', response_model=TaskCreateResponse)\nasync def create_task(body: TaskCreate):   # 요청 본문이 TaskCreate 형식이 아니면 자동 422\n    # 받은 title에 id=1을 붙여 응답 스키마로 돌려준다\n    return TaskCreateResponse(id=1, **body.dict())  # **로 title을 그대로 펼쳐 넣는다",
      "note": "BaseModel을 상속해 요청(TaskCreate)/응답(TaskCreateResponse) 타입을 나누면 잘못된 입력은 FastAPI가 자동으로 422로 막고 응답도 스키마대로 검증된다. TaskBase로 공통 필드(title)를 한 번만 정의해 재사용한다."
    }
  ],
  "serving-2": [
    {
      "title": "docker-compose.yaml로 API + DB 한 번에 띄우기",
      "lang": "yaml",
      "code": "# docker-compose.yaml - FastAPI 앱과 MySQL DB를 한 번에 띄운다\nservices:\n  demo-app:                       # (1) 우리 API 서비스\n    build: .                      # 현재 폴더의 Dockerfile로 이미지를 빌드\n    volumes:\n      - .:/src                    # 호스트 코드를 컨테이너에 연결(저장하면 바로 반영)\n    working_dir: /src             # 컨테이너 안 작업 폴더\n    ports:\n      - \"8001:8001\"               # 호스트 8001 -> 컨테이너 8001 포트 연결\n    environment:\n      WATCHFILES_FORCE_POLLING: \"true\"  # OS 상관없이 코드 변경 감지(핫 리로드)용\n  db:                             # (2) 데이터베이스 서비스\n    image: mysql:8.0              # MySQL 8.0 공식 이미지(실습은 오픈소스 MariaDB 권장)\n    platform: linux/x86_64        # 애플 실리콘(M1/M2) 맥에서 필요\n    environment:\n      MYSQL_ALLOW_EMPTY_PASSWORD: \"yes\"  # 실습용: 루트 비번 없이 생성\n      MYSQL_DATABASE: demo        # demo 데이터베이스를 초기 생성\n      TZ: Asia/Seoul              # 시간대를 한국으로\n    ports:\n      - \"33306:3306\"              # 호스트 33306 -> 컨테이너 3306",
      "note": "docker compose up 한 번이면 API와 DB가 동시에 뜬다. volumes로 코드를 연결하고 WATCHFILES_FORCE_POLLING을 켜면 파일 저장 시 컨테이너가 바로 반영한다. 포트는 \"호스트:컨테이너\" 순서다."
    },
    {
      "title": "실행 중인 컨테이너 안에서 명령 실행하기 (docker compose exec)",
      "lang": "bash",
      "code": "# 1) 앱과 DB 컨테이너를 빌드하며 동시에 띄운다 (백그라운드 -d)\ndocker compose up -d --build\n\n# 2) 새 패키지를 추가할 땐 실행 중인 app 컨테이너 안에서 poetry로 설치한다\ndocker compose exec demo-app poetry add sqlalchemy pymysql\n\n# 3) db 컨테이너 안으로 들어가 demo 데이터베이스에 접속해 테이블을 확인한다\ndocker compose exec db mysql demo -e \"SHOW TABLES;\"\n\n# 4) 의존성이 바뀌면 캐시를 무시하고 이미지를 다시 빌드한다\ndocker compose build --no-cache      # pyproject.toml 변경을 확실히 반영",
      "note": "exec는 이미 떠 있는 컨테이너 안에서 명령을 실행한다. 패키지 추가는 컨테이너 안 poetry로 해야 pyproject.toml/poetry.lock에 잠기고, 의존성이 바뀌면 --no-cache로 재빌드해야 반영된다."
    }
  ],
  "serving-3": [
    {
      "title": "Depends(get_db)로 DB 세션 주입하고 404 처리하기",
      "lang": "python",
      "code": "from fastapi import FastAPI, Depends, HTTPException  # DI(Depends)와 예외 응답 도구\nfrom sqlalchemy.orm import Session                   # DB 세션 타입\n\napp = FastAPI()\n\n# 요청마다 DB 세션을 열고, 끝나면 반드시 닫아 주는 의존성 함수\ndef get_db():\n    db = SessionLocal()      # 세션 하나 생성(SessionLocal은 sessionmaker로 미리 정의)\n    try:\n        yield db             # 이 세션을 경로 함수에 주입해서 쓰게 한다\n    finally:\n        db.close()           # 요청 처리가 끝나면 세션을 닫는다(자원 누수 방지)\n\n@app.put('/tasks/{task_id}')\n# Depends(get_db)가 세션을 자동으로 만들어 db 인자에 넣어 준다(의존성 주입)\nasync def update_task(task_id: int, db: Session = Depends(get_db)):\n    task = db.get(Task, task_id)   # id로 할 일 하나를 조회(Task는 ORM 모델)\n    if task is None:               # 없는 id면\n        raise HTTPException(status_code=404, detail='Task not found')  # 404로 없음을 알림\n    task.title = '수정된 제목'      # 존재하면 내용을 수정\n    db.commit()                    # 변경을 DB에 반영\n    return {'id': task_id, 'title': task.title}",
      "note": "Depends(get_db)로 세션을 주입하면 비즈니스 로직과 DB가 느슨하게 묶여 테스트 때 다른 DB로 갈아끼우기 쉽다. 없는 리소스는 HTTPException(404)로 분명히 알려야 클라이언트가 정상/오류를 구분한다."
    },
    {
      "title": "dependency_overrides로 DB를 갈아끼워 단위 테스트하기",
      "lang": "python",
      "code": "# 설치: pip install fastapi httpx pytest\nfrom fastapi.testclient import TestClient  # 서버를 실제로 안 띄우고 호출하는 테스트 도구\nfrom main import app, get_db               # 앞에서 만든 앱과 실제 DB 의존성\n\n# 테스트용 가짜 DB 세션 - 진짜 DB 대신 이걸 쓰게 만든다\ndef fake_get_db():\n    yield {'fake': True}                   # 실제 연결 없이 가짜 세션을 넘겨 준다\n\n# dependency_overrides로 get_db를 통째로 가짜 버전으로 교체(프로덕션 코드는 그대로)\napp.dependency_overrides[get_db] = fake_get_db\nclient = TestClient(app)                   # 앱을 감싼 테스트 클라이언트\n\ndef test_health():                         # test_로 시작하면 pytest가 자동 실행\n    res = client.get('/health')            # 실제 네트워크 없이 앱 함수를 직접 호출\n    assert res.status_code == 200          # 200이 아니면 테스트 실패\n    assert res.json() == {'status': 'ok'}  # 응답 본문까지 정확히 확인",
      "note": "DI(Depends) 덕분에 dependency_overrides 한 줄로 실제 DB를 가짜로 교체할 수 있어, DB 없이도 API 로직을 재현 가능하게 테스트한다. TestClient는 서버를 띄우지 않고 앱을 직접 호출해 CI에서 빠르게 돌아간다."
    }
  ],
  "feature-1": [
    {
      "title": "치우친 분포는 로그변환 — 왜도(skew)로 확인하기",
      "lang": "python",
      "code": "# 오른쪽으로 치우친(right-skewed) 피처를 대칭에 가깝게 만들기\nimport numpy as np\nimport pandas as pd\n\n# 소득처럼 소수의 큰 값이 꼬리를 만드는 데이터(50000 이 꼬리)\nincome = pd.Series([2000, 2200, 2500, 2600, 3000, 3200, 50000])\n\n# 1) 왜도(skewness)로 치우친 정도를 숫자로 본다(0=대칭, 양수=오른쪽 꼬리)\nprint('변환 전 왜도:', round(income.skew(), 2))  # 큰 양수 -> 강하게 치우침\n\n# 2) 로그변환: log1p(=log(1+x))로 큰 값을 압축해 꼬리를 줄인다\nlog_income = np.log1p(income)\n\n# 3) 변환 후 왜도가 0 쪽으로 줄었는지 확인한다\nprint('변환 후 왜도:', round(log_income.skew(), 2))  # 0 에 가까워짐",
      "note": "교재의 로그/제곱근 변환: 회귀·t검정·ANOVA는 정규분포 가정을 두므로, 소득·조회수처럼 한쪽으로 치우친(멱함수형) 피처는 로그변환으로 대칭에 가깝게 만든 뒤 모델에 넣는다. skew()로 전후를 수치로 확인하는 습관이 핵심."
    },
    {
      "title": "규칙 기반 파생변수 만들기 — 고객등급(조작적 정의)",
      "lang": "python",
      "code": "# 원천 데이터에 없던 새 항목을 비즈니스 규칙으로 정의하기\nimport pandas as pd\n\n# 트랜잭션 원천 데이터: 고객별 구매 건수와 합계\ndf = pd.DataFrame({\n    'customer': ['이OO', '홍OO', '김OO'],\n    'buy_cnt':  [1, 2, 3],        # 구매 건수\n    'total':    [200, 600, 400],  # 구매 합계(원)\n})\n\n# 규칙: 구매건수 >= 2 이고 합계 >= 500 이면 'A등급', 아니면 'B등급'\n# (교재의 파생변수 예시 — 조작적 정의를 Rule 로 코드화)\ndf['grade'] = df.apply(\n    lambda r: 'A' if (r['buy_cnt'] >= 2 and r['total'] >= 500) else 'B',\n    axis=1,  # 행 단위로 규칙 적용\n)\nprint(df[['customer', 'buy_cnt', 'total', 'grade']])\n\n# 파생변수는 비즈니스 로직이 들어가므로 '어떤 근거로 만들었는지' 주석이 필수.\n# 이렇게 만든 등급은 이후 원-핫/순서형 인코딩해 모델 피처로 쓴다.",
      "note": "교재의 파생변수 절(1차 데이터가 있는 경우: 매출액 합계, 없는 경우: 고객등급 A/B)을 그대로 실습화. 조작적 정의를 Rule로 옮기고 주석으로 근거를 남기는 것이 실무 파생변수의 핵심이라는 메시지."
    },
    {
      "title": "상관계수로 피처 선택 — 타깃 관계와 다중공선성 함께 보기",
      "lang": "python",
      "code": "# 상관계수(=표준화된 공분산, -1~1)로 어떤 피처를 남길지 판단\nimport pandas as pd\n\ndf = pd.DataFrame({\n    'area':  [10, 20, 30, 40, 50],  # 면적\n    'rooms': [1, 2, 3, 4, 5],       # 방 개수(면적과 거의 같이 커짐)\n    'age':   [20, 15, 10, 5, 1],    # 건물 연식\n    'price': [1, 2, 3, 4, 5],       # 타깃: 가격\n})\n\n# 1) 상관계수 행렬(0이면 선형관계 없음, 공분산을 각 표준편차로 나눈 표준화값)\ncorr = df.corr(numeric_only=True)\nprint(corr.round(2))\n\n# 2) 타깃(price)과 상관이 큰 피처를 확인(예측에 도움될 후보)\nprint('타깃 상관:', corr['price'].drop('price').round(2).to_dict())\n\n# 3) 피처끼리 상관이 너무 높으면(예: area-rooms) 중복 -> 하나만 남긴다\n#    회귀분석 전 독립변수 간 상관성이 높으면 다중공선성 문제가 생긴다\nprint('면적-방수 상관:', round(corr['area']['rooms'], 2), '=> 0.9 이상이면 제거 검토')",
      "note": "교재의 상관계수 절(표준화된 공분산, \"회귀 전 독립변수 간 상관 높으면 중복 제거\")을 피처 선택으로 연결. 상관은 선형관계만 보므로 산점도 병행이 필요하다는 교재 주의사항도 함께 가르칠 수 있는 예제."
    }
  ],
  "ml-dl-1": [
    {
      "title": "분류 평가: 정확도만으로 부족 — 정밀도·재현율·F1",
      "lang": "python",
      "code": "# 정확도 하나로는 못 보는 것을 classification_report 로 한 번에\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report\n\n# 유방암 데이터(양성/악성 2분류)\nX, y = load_breast_cancer(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)\n\nmodel = RandomForestClassifier(random_state=0).fit(X_tr, y_tr)  # 학습\npred = model.predict(X_te)                                      # 예측\n\n# precision·recall·f1 을 클래스별로 한 번에 출력\nprint(classification_report(y_te, pred, target_names=['악성', '양성']))\n# 정밀도: 양성이라 예측한 것 중 진짜 양성 비율\n# 재현율: 진짜 양성 중 양성이라 맞힌 비율(놓치면 안 되는 진단에서 특히 중요)\n# 정확도만 높고 재현율이 낮으면 '실제 환자를 놓치는' 모델이라 쓰기 어렵다.",
      "note": "통계교재 모델평가 FAQ \"정확도는 높은데 재현율이 낮으면 활용 가능한가?\"를 실습으로. 정답이 한쪽으로 치우친 문제에서 정확도가 왜 함정인지, 재현율이 왜 병 진단에서 결정적인지 체감시킨다."
    },
    {
      "title": "회귀 문제 평가 — R²와 RMSE (분류가 아닌 숫자 예측)",
      "lang": "python",
      "code": "# 집값처럼 '숫자'를 예측하는 회귀: 정확도 대신 R2·RMSE 로 평가\nfrom sklearn.datasets import fetch_california_housing\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import r2_score, mean_squared_error\nimport numpy as np\n\n# 캘리포니아 주택 데이터(집값을 숫자로 예측 -> 회귀)\nX, y = fetch_california_housing(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)\n\nreg = LinearRegression().fit(X_tr, y_tr)  # 최소제곱으로 직선(면) 적합\npred = reg.predict(X_te)                  # 테스트 집값 예측\n\n# R2(결정계수): 1에 가까울수록 잘 설명 / RMSE: 예측 오차 크기(작을수록 좋음)\nprint('R2  :', round(r2_score(y_te, pred), 3))\nprint('RMSE:', round(np.sqrt(mean_squared_error(y_te, pred)), 3))\n# 분류의 '정확도' 자리를, 회귀에서는 R2·RMSE 가 대신한다.",
      "note": "커리큘럼의 \"회귀와 분류\"에서 사이트엔 분류 예제만 있었다. 통계교재의 회귀분석·결정계수·RMSE 개념을 sklearn으로 연결해, 문제 유형에 따라 평가지표가 달라진다는 핵심을 보여준다."
    },
    {
      "title": "ROC-AUC — 임계값에 상관없는 분류 성능 보기",
      "lang": "python",
      "code": "# 예측 '확률'의 품질을 ROC 곡선과 AUC 로 평가\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score, roc_curve\nimport matplotlib.pyplot as plt\n\nX, y = load_breast_cancer(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)\n\nmodel = LogisticRegression(max_iter=5000).fit(X_tr, y_tr)\nproba = model.predict_proba(X_te)[:, 1]  # 양성일 '확률'(0/1 아닌 확신 정도)\n\n# AUC: ROC 곡선 아래 면적, 0.5=찍기 / 1.0=완벽\nprint('ROC-AUC:', round(roc_auc_score(y_te, proba), 3))\n\nfpr, tpr, _ = roc_curve(y_te, proba)  # 임계값을 옮겨가며 거짓양성·참양성 비율\nplt.plot(fpr, tpr)                     # 모델의 ROC 곡선\nplt.plot([0, 1], [0, 1], '--')         # 대각선 = 무작위 기준선\nplt.xlabel('FPR'); plt.ylabel('TPR'); plt.title('ROC 곡선'); plt.show()",
      "note": "커리큘럼 평가지표에 ROC가 명시되나 사이트에 없었다. predict_proba로 나온 확률에 임계값을 바꿔가며 그리는 곡선이라, 정확도·재현율과 달리 임계값에 독립적인 성능을 본다는 점을 그림으로 이해시킨다."
    }
  ],
  "vectordb-1": [
    {
      "title": "FAISS 기본 - IndexFlatIP로 코사인 유사도 검색(정규화=내적)",
      "lang": "python",
      "code": "# pip install faiss-cpu numpy 를 먼저 설치한다\nimport numpy as np                                  # 벡터 계산용\nimport faiss                                        # 페이스북 벡터 검색 라이브러리\n\nN, d = 5000, 768                                    # 문서 5000개, 임베딩 차원 768\ndata = np.random.randn(N, d).astype('float32')      # 임베딩이라고 가정한 난수 벡터\ndata /= np.linalg.norm(data, axis=1, keepdims=True) # L2 정규화: 정규화하면 내적=코사인유사도\n\nindex = faiss.IndexFlatIP(d)                         # IP=내적 기준 완전탐색(Flat) 인덱스\nindex.add(data)                                      # 모든 벡터를 인덱스에 그대로 저장\n\nquery = data[0:1]                                    # 0번 문서를 질의 벡터로 사용(자기 자신이 1등이어야 정상)\nscores, ids = index.search(query, 5)                 # 가장 비슷한 상위 5개 검색\nprint('Top-5 문서 번호:', ids[0])                    # 결과: [0 ...] 0번이 맨 앞에 나온다\nprint('Top-5 유사도:', scores[0].round(3))           # 코사인 유사도 값(1에 가까울수록 유사)",
      "note": "Flat 인덱스는 모든 벡터와 전부 비교해 항상 정확하지만 데이터가 커지면 느리다. 정규화 후 내적을 쓰면 코사인 유사도가 되어 계산이 간단해진다."
    },
    {
      "title": "FAISS IVF-Flat - 동네(클러스터)로 나눠 빠르게 검색(nlist·nprobe)",
      "lang": "python",
      "code": "import numpy as np\nimport faiss\n\nN, d = 100000, 128                                   # 10만 개 벡터로 속도 차이를 체감\ndata = np.random.random((N, d)).astype('float32')    # 예시 데이터\ndata /= np.linalg.norm(data, axis=1, keepdims=True)  # 코사인용 정규화\n\nnlist = 100                                          # 전체 공간을 100개 '동네(클러스터)'로 나눈다\nquantizer = faiss.IndexFlatIP(d)                     # 동네 중심을 찾는 기준 인덱스\nindex = faiss.IndexIVFFlat(quantizer, d, nlist, faiss.METRIC_INNER_PRODUCT)\n\nindex.train(data)                                    # K-means로 100개 동네 중심을 학습\nindex.add(data)                                      # 각 벡터를 가까운 동네에 배치\n\nindex.nprobe = 5                                     # 검색 시 가까운 5개 동네만 열어본다(전체의 5%)\nquery = data[0:1]                                    # 질의 벡터\nscores, ids = index.search(query, 5)                 # 선택된 동네 안에서만 Top-5 계산\nprint('Top-5:', ids[0])                              # nprobe를 1->10으로 키우면 정확도 상승 속도 하락\nprint('전체 대비 탐색 비율: 약', index.nprobe / nlist * 100, '%')",
      "note": "IVF는 전체를 nlist개 동네로 나누고 nprobe개만 뒤져서 Flat보다 10~50배 빠르다. nprobe가 곧 정확도-속도 손잡이다."
    },
    {
      "title": "Qdrant 실무 - 컬렉션 생성·Upsert 후 메타데이터 필터 검색",
      "lang": "python",
      "code": "# 터미널에서 먼저 실행: docker run -p 6333:6333 qdrant/qdrant\n# pip install qdrant-client\nfrom qdrant_client import QdrantClient\nfrom qdrant_client.models import Distance, VectorParams, PointStruct, Filter, FieldCondition, Range\n\nclient = QdrantClient(host='localhost', port=6333)   # 로컬 Qdrant 서버에 연결\nclient.recreate_collection(                           # 'rag_docs' 컬렉션(=테이블) 생성\n    collection_name='rag_docs',\n    vectors_config=VectorParams(size=4, distance=Distance.COSINE),  # 4차원·코사인 거리\n)\n\npoints = [                                            # Point = ID + 벡터 + payload(메타데이터)\n    PointStruct(id=1, vector=[0.1, 0.2, 0.1, 0.9], payload={'page': 3, 'category': '재무'}),\n    PointStruct(id=2, vector=[0.9, 0.1, 0.2, 0.1], payload={'page': 8, 'category': '법무'}),\n]\nclient.upsert(collection_name='rag_docs', points=points)  # 벡터+메타데이터를 함께 저장(Upsert)\n\nhits = client.search(                                 # 5페이지 이후 문서에서만 유사도 검색\n    collection_name='rag_docs',\n    query_vector=[0.1, 0.2, 0.1, 0.8],\n    query_filter=Filter(must=[FieldCondition(key='page', range=Range(gte=5))]),  # page>=5 필터\n    limit=3,\n)\nprint('필터 통과 결과:', [(h.id, h.payload) for h in hits])  # page 8짜리(id=2)만 남는다",
      "note": "FAISS와 달리 Qdrant는 벡터에 payload(메타데이터)를 붙여 저장하고 \"재무팀 5페이지 이후\"처럼 조건 필터 검색이 가능하다. 그래서 실무 프로덕션에서 선호된다."
    }
  ],
  "rag-1": [
    {
      "title": "PDF 로딩 → 청킹 → 메타데이터 태깅(전처리 한 흐름)",
      "lang": "python",
      "code": "# pip install pymupdf langchain-community langchain-text-splitters\nfrom langchain_community.document_loaders import PyMuPDFLoader        # 빠른 PDF 텍스트 추출기\nfrom langchain_text_splitters import RecursiveCharacterTextSplitter   # 계층적 분할기\n\ndocs = PyMuPDFLoader('data/ai_semiconductor.pdf').load()  # PDF를 페이지 단위 문서로 로드\nprint('페이지 수:', len(docs))                            # 각 문서에 page 번호가 메타데이터로 들어있다\n\nsplitter = RecursiveCharacterTextSplitter(                # 문단->줄->문장->단어 순으로 자른다\n    chunk_size=500,                                       # 실무 기본값 300~500 토큰\n    chunk_overlap=50,                                     # 10% 겹침으로 문맥 단절 방지\n    separators=['\\n\\n', '\\n', '. ', ' '],              # 의미 경계 우선순위\n)\nchunks = splitter.split_documents(docs)                   # 페이지들을 작은 청크로 분할\n\nfor c in chunks[:2]:                                      # 앞 청크 2개에 검색용 메타데이터를 덧붙인다\n    c.metadata.update({'category': '반도체', 'language': 'ko'})  # 필터 검색에 쓸 태그\n    print('page', c.metadata.get('page'), '| 글자수', len(c.page_content))\nprint('총 청크 수:', len(chunks))                         # 100페이지 PDF가 수백 개 청크로 쪼개진다",
      "note": "RAG 전처리의 뼈대다. PyMuPDF로 텍스트를 뽑고, Recursive 분할기로 의미 경계를 지키며 자르고, category·page 같은 메타데이터를 심어야 나중에 필터 검색이 된다."
    },
    {
      "title": "Parent-Child 검색 - 작게 찾고 크게 전달(실무 최우선)",
      "lang": "python",
      "code": "# 검색 정밀도(작은 Child)와 문맥 풍부함(큰 Parent)을 동시에 얻는 전략\nfrom langchain.retrievers import ParentDocumentRetriever\nfrom langchain_text_splitters import RecursiveCharacterTextSplitter\nfrom langchain_community.vectorstores import Chroma\nfrom langchain_openai import OpenAIEmbeddings\nfrom langchain.storage import InMemoryStore\n\nparent_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)  # 큰 단위(맥락 보존, LLM에 전달용)\nchild_splitter = RecursiveCharacterTextSplitter(chunk_size=200)    # 작은 단위(정밀 검색·임베딩용)\n\nvectorstore = Chroma(embedding_function=OpenAIEmbeddings())        # Child 벡터를 저장할 곳\ndocstore = InMemoryStore()                                         # 원본 Parent 문서를 보관할 곳\n\nretriever = ParentDocumentRetriever(                               # 두 저장소를 묶는 검색기\n    vectorstore=vectorstore,      # 검색은 작은 Child 벡터로\n    docstore=docstore,            # 반환은 Child가 속한 큰 Parent로\n    child_splitter=child_splitter,\n    parent_splitter=parent_splitter,\n)\nretriever.add_documents(docs)                                     # 문서를 넣으면 Parent/Child가 자동 생성\nfound = retriever.invoke('HBM 메모리 대역폭은?')                    # 작은 청크로 정확히 매칭한 뒤\nprint('반환된 문맥 길이:', len(found[0].page_content))             # 큰 Parent 청크를 통째로 돌려준다",
      "note": "Child(200토큰)로 정밀하게 위치를 찾고, 그 청크가 속한 Parent(1000토큰)를 LLM에 넘긴다. 검색 정밀도와 답변 문맥을 동시에 잡는 실무 표준 전략이다."
    }
  ],
  "rag-2": [
    {
      "title": "BM25 키워드 검색 - Dense가 놓치는 에러코드를 잡는다(bm25s)",
      "lang": "python",
      "code": "# pip install bm25s\n# 'PostgreSQL 42P01' 같은 정확한 키워드는 의미검색(Dense)이 자주 실패한다\nimport bm25s\n\ncorpus = [                                            # 검색 대상 문서들\n    'PostgreSQL 17.2 릴리즈 노트와 신규 기능',\n    '데이터베이스 기초 개념 가이드',\n    '오류 코드 42P01 테이블 없음 해결 방법',\n]\ntokens = bm25s.tokenize(corpus)                       # 문서를 단어 단위로 쪼갠다(토큰화)\nretriever = bm25s.BM25()                              # BM25 인덱스 객체 생성\nretriever.index(tokens)                               # 통계(단어 빈도·희소성) 기반 색인 구축(학습 불필요)\n\nquery = bm25s.tokenize('42P01 오류')                   # 질의도 같은 방식으로 토큰화\nresults, scores = retriever.retrieve(query, k=2)      # 키워드가 일치하는 상위 2개 문서\nfor i in range(results.shape[1]):                     # 결과를 순서대로 출력\n    idx = results[0, i]                               # 문서 번호\n    print(round(float(scores[0, i]), 2), corpus[idx]) # 42P01 문서가 1위로 나온다",
      "note": "BM25는 40년 검증된 키워드 검색으로 학습이 필요 없다. 희귀한 단어(42P01)가 문서에 많이 나올수록 점수가 높아, Dense가 놓치는 버전번호·에러코드·고유명사를 정확히 잡는다."
    },
    {
      "title": "RRF로 Dense와 BM25 두 순위를 안전하게 합치기(k=60)",
      "lang": "python",
      "code": "# 두 검색기의 점수는 스케일이 달라 그냥 더하면 안 된다 -> 순위(rank)만으로 합친다\ndef rrf_fusion(dense_ids, bm25_ids, k=60, top_n=5):   # k=60은 검증된 표준 상수\n    scores = {}                                       # 문서번호 -> 합산 점수\n    for rank, doc_id in enumerate(dense_ids):         # Dense 결과를 1위부터 순회\n        scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank + 1)  # 순위가 앞설수록 큰 점수\n    for rank, doc_id in enumerate(bm25_ids):          # BM25 결과도 같은 방식으로 더한다\n        scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank + 1)\n    ranked = sorted(scores.items(), key=lambda x: x[1], reverse=True)  # 합산 점수 내림차순\n    return ranked[:top_n]                             # 최종 Top-N 반환\n\ndense = [10, 3, 7, 1, 5]                              # Dense(의미) 검색의 상위 문서 순서(예시)\nbm25 = [7, 10, 2, 3, 9]                               # BM25(키워드) 검색의 상위 문서 순서(예시)\nfinal = rrf_fusion(dense, bm25)                       # 두 순위를 RRF로 융합\nprint('Hybrid 최종 순위:', final)                      # 양쪽에서 모두 상위였던 7·10번이 앞으로 온다",
      "note": "RRF(Reciprocal Rank Fusion)는 점수가 아니라 순위만 사용해 두 검색기를 합친다. 스케일이 달라도 안전하며 k=60은 거의 바꿀 필요가 없는 표준값이다."
    },
    {
      "title": "BGE-Reranker로 최종 재정렬 - 느리지만 정밀한 Cross-Encoder",
      "lang": "python",
      "code": "# pip install FlagEmbedding\n# Hybrid로 Top-50을 빠르게 추린 뒤, 질문+문서를 함께 넣어 정밀 채점한다\nfrom FlagEmbedding import FlagReranker\n\nreranker = FlagReranker('BAAI/bge-reranker-v2-m3', use_fp16=True)  # 다국어(한국어) 리랭커, CPU도 동작\n\nquery = 'HNSW 인덱스와 IVF의 메모리 사용 차이'          # 사용자 질문\ncandidates = [                                        # Hybrid 검색이 넘겨준 후보 문서들\n    'FAISS 라이브러리 소개',\n    'HNSW 구조와 메모리 사용량 설명',\n    'IVF 클러스터 기반 검색 원리',\n]\npairs = [[query, doc] for doc in candidates]          # (질문, 문서) 쌍으로 묶는다\nscores = reranker.compute_score(pairs, normalize=True)  # 0~1 관련도 점수로 정밀 채점\n\nranked = sorted(zip(scores, candidates), reverse=True)  # 점수 높은 순으로 재정렬\nfor score, doc in ranked:                             # 관련 있는 문서가 위로 올라온다\n    print(round(score, 3), doc)                       # HNSW·IVF 문서가 상위, 무관한 소개글이 하위",
      "note": "Bi-Encoder(벡터검색)는 빠르지만 질문-문서 상호작용을 못 본다. Cross-Encoder인 BGE-Reranker는 둘을 함께 입력해 정밀하게 채점한다. 느려서 전체 DB엔 못 쓰고 Top-50에만 적용한다."
    }
  ],
  "rag-3": [
    {
      "title": "검색기 평가 - Hit Rate@K와 MRR 직접 계산",
      "lang": "python",
      "code": "# 검색이 정답 문서를 '몇 개 안에' 그리고 '몇 번째로' 찾는지를 수치로 본다\ndef evaluate(results, answers, k=3):                  # results: 질문별 검색된 문서ID 리스트\n    hit, rr_sum = 0, 0.0                              # 적중 횟수, 역순위 합\n    for docs, truth in zip(results, answers):         # 질문마다 (검색결과, 정답ID) 비교\n        topk = docs[:k]                               # 상위 K개만 평가 대상\n        if truth in topk:                             # 정답이 상위 K 안에 있으면\n            hit += 1                                  # Hit Rate 카운트 증가\n            rank = topk.index(truth) + 1              # 정답이 몇 번째인지(1부터)\n            rr_sum += 1 / rank                        # 역순위(1위=1.0, 2위=0.5, 3위=0.33)\n    return hit / len(answers), rr_sum / len(answers)  # (Hit Rate@K, MRR)\n\nresults = [[42, 7, 3], [1, 88, 5], [9, 2, 60], [11, 4, 8]]  # 4개 질문의 검색 결과(예시)\nanswers = [42, 88, 60, 99]                            # 각 질문의 정답 문서ID(마지막은 못 찾음)\nhr, mrr = evaluate(results, answers, k=3)             # 지표 계산\nprint('Hit Rate@3:', round(hr, 3))                    # 0.75 (4개 중 3개 적중)\nprint('MRR:', round(mrr, 3))                          # 0.458 (정답이 앞 순위일수록 높다)",
      "note": "Hit Rate@K는 \"정답이 상위 K개 안에 있나\"만 보고, MRR은 \"몇 번째에 있나\"까지 반영한다. 같은 Hit Rate라도 MRR이 높으면 더 좋은 검색기다."
    },
    {
      "title": "생성 답변 평가 - LLM-as-a-Judge(정확성·충실성 채점)",
      "lang": "python",
      "code": "# 생성된 답변이 문맥에 충실한지 다른 LLM에게 심사를 맡긴다\nfrom openai import OpenAI\nclient = OpenAI(api_key='sk-본인키')\n\nJUDGE = '''당신은 RAG 답변 평가자입니다. 아래 기준으로 1~5점 채점하세요.\n- 정확성(Correctness): 문맥과 사실이 일치하는가\n- 충실성(Faithfulness): 문맥에 없는 내용을 지어내지 않았는가(환각 감점)\n반드시 \"정확성:N 충실성:N 이유:...\" 형식으로만 답하세요.'''\n\nquestion = 'HBM이란 무엇인가?'                          # 사용자 질문\ncontext = 'HBM은 여러 D램을 수직으로 쌓은 고대역폭 메모리다.'  # 검색된 근거 문맥\nanswer = 'HBM은 D램을 쌓아 대역폭을 높인 메모리이며 2010년 삼성이 최초 개발했다.'  # 평가 대상 답변\n\nres = client.chat.completions.create(                 # 심사 LLM 호출\n    model='gpt-4o-mini',\n    messages=[\n        {'role': 'system', 'content': JUDGE},         # 평가자 역할과 기준 부여\n        {'role': 'user', 'content': f'질문:{question}\\n문맥:{context}\\n답변:{answer}'},\n    ],\n    temperature=0,                                    # 일관된 채점을 위해 0 고정\n)\nprint(res.choices[0].message.content)                 # 뒷부분 '삼성 최초 개발'은 문맥에 없어 충실성 감점",
      "note": "정답 라벨을 일일이 만들기 어려운 생성 품질은 LLM-as-a-Judge로 평가한다. 정확성·충실성처럼 판정 가능한 기준을 명시하고 형식을 고정해야 채점이 일관된다."
    }
  ],
  "agent-1": [
    {
      "title": "LangGraph State 정의 - add_messages 리듀서로 대화 누적",
      "lang": "python",
      "code": "# pip install langgraph\n# State는 노드끼리 주고받는 '공용 기억 저장소'다\nfrom typing import Annotated, TypedDict\nfrom langgraph.graph.message import add_messages\n\nclass GraphState(TypedDict):                          # 그래프 전체가 공유하는 상태 스키마\n    question: str                                     # 사용자 질문(덮어쓰기 필드)\n    context: str                                      # 검색된 문서(덮어쓰기 필드)\n    answer: str                                       # 생성된 답변(덮어쓰기 필드)\n    messages: Annotated[list, add_messages]           # 대화 메시지(누적 필드: 리듀서가 append)\n\n# 일반 필드는 새 값으로 '덮어쓰기'되지만\n# add_messages가 붙은 messages는 기존 리스트에 '누적'된다\ns = {'question': 'HBM이란?', 'context': '', 'answer': '', 'messages': []}\ns = {**s, 'messages': add_messages(s['messages'], [{'role': 'user', 'content': '안녕'}])}\ns = {**s, 'messages': add_messages(s['messages'], [{'role': 'assistant', 'content': '반가워요'}])}\nprint('누적된 메시지 수:', len(s['messages']))         # 2 (덮어쓰지 않고 쌓인다)",
      "note": "State의 일반 필드는 노드를 지날 때 덮어쓰기되지만, add_messages 리듀서를 붙인 필드는 자동으로 누적된다. 이 덕분에 대화 맥락이 흐름 전체에 유지된다."
    },
    {
      "title": "Node 함수 - State를 받아 State를 돌려주는 작업 단위",
      "lang": "python",
      "code": "# 노드는 하나의 함수다: 현재 State를 입력받아, 바꿀 부분만 State로 반환한다\nfrom typing import TypedDict\n\nclass GraphState(TypedDict):                          # 앞에서 정의한 상태 재사용\n    question: str\n    context: str\n    answer: str\n\ndef retrieve_node(state: GraphState) -> GraphState:   # 노드1: 문서 검색\n    q = state['question']                             # State에서 질문을 읽고\n    docs = f'[{q}] 관련 검색 문맥...'                   # 실제로는 벡터DB 검색(여기선 개념만)\n    return {'context': docs}                          # context 키만 갱신해 반환\n\ndef generate_node(state: GraphState) -> GraphState:   # 노드2: 답변 생성\n    ctx = state['context']                            # 앞 노드가 채운 context를 읽고\n    ans = f'문맥 기반 답변(근거: {ctx})'               # 실제로는 LLM 호출\n    return {'answer': ans}                            # answer 키만 갱신해 반환\n\n# 두 노드를 순서대로 실행하면 State가 점진적으로 채워진다\nst = {'question': 'HBM이란?', 'context': '', 'answer': ''}\nst = {**st, **retrieve_node(st)}                      # 검색 노드 실행 -> context 채움\nst = {**st, **generate_node(st)}                      # 생성 노드 실행 -> answer 채움\nprint(st['answer'])                                   # 검색->생성이 State로 연결된 것을 확인",
      "note": "노드는 State 전체가 아니라 자신이 읽고 쓸 키만 다뤄야 한다(State Ownership). 반환은 반드시 State여야 다음 노드가 이어받는다. 로직이 복잡하면 노드를 쪼개 디버깅을 쉽게 한다."
    },
    {
      "title": "LangChain 1.0 create_agent - @tool로 ReAct 에이전트 만들기",
      "lang": "python",
      "code": "# pip install langchain langchain-openai\n# LangChain 1.0은 create_agent 하나로 프롬프트+모델+도구를 묶는다(scratchpad 자동 관리)\nfrom langchain.agents import create_agent\nfrom langchain_core.tools import tool\nfrom langchain_openai import ChatOpenAI\n\n@tool\ndef get_stock_price(ticker: str) -> str:              # @tool 데코레이터로 함수를 도구로 변환\n    \"Return today's closing price for a stock ticker.\"  # docstring은 LLM이 읽는 사용설명(영어 권장)\n    prices = {'000660': '18만원', '005930': '7만원'}   # 실제로는 외부 API 호출\n    return prices.get(ticker, '정보 없음')             # 티커에 맞는 종가 반환\n\nagent = create_agent(                                 # 에이전트 정의\n    model=ChatOpenAI(model='gpt-4o-mini'),            # 두뇌 역할 LLM\n    tools=[get_stock_price],                          # 손발 역할 도구 목록\n    system_prompt='너는 도구를 활용해 답하는 금융 비서다.',  # 역할 지시\n)\nresult = agent.invoke({'messages': [                   # 메시지 중심 구조로 실행\n    {'role': 'user', 'content': 'SK하이닉스(000660) 종가 알려줘'},\n]})\nprint(result['messages'][-1].content)                 # LLM이 스스로 도구를 호출(ReAct)해 답한다",
      "note": "ReAct는 생각(Thought)->도구 호출(Action)->관찰(Observation)을 반복한다. create_agent가 이 루프와 scratchpad를 자동 관리해, @tool로 만든 도구만 넘기면 에이전트가 알아서 호출한다."
    }
  ],
  "agent-2": [
    {
      "title": "Agentic RAG - 문서 품질을 채점하고 나쁘면 질의 재작성",
      "lang": "python",
      "code": "# 단순 RAG는 첫 검색이 나쁘면 그대로 틀린다. Agentic RAG는 스스로 평가하고 다시 찾는다\nfrom langgraph.graph import StateGraph, START, END\nfrom typing import TypedDict\n\nclass RAGState(TypedDict):                            # 그래프 공유 상태\n    question: str                                     # (재작성될 수 있는) 질문\n    docs: str                                         # 검색 결과\n    grade: str                                        # 'GOOD' 또는 'BAD'\n    tries: int                                        # 재시도 횟수(무한루프 방지용)\n\ndef retrieve(state):                                  # 노드: 검색\n    return {'docs': f\"[{state['question']}] 검색 결과\"}  # 실제로는 벡터DB 검색\n\ndef grade(state):                                     # 노드: 검색 품질 자가 채점\n    ok = '결과' in state['docs'] and state['tries'] < 2   # 실제로는 LLM이 관련성 판정\n    return {'grade': 'GOOD' if ok else 'BAD'}\n\ndef rewrite(state):                                   # 노드: 질의 재작성 후 재검색 유도\n    return {'question': state['question'] + ' (구체화)', 'tries': state['tries'] + 1}\n\ndef route(state):                                     # 조건부 분기: 채점 결과로 경로 결정\n    return END if state['grade'] == 'GOOD' else 'rewrite'  # 좋으면 종료, 나쁘면 재작성\n\ng = StateGraph(RAGState)                              # 그래프 생성\nfor name, fn in [('retrieve', retrieve), ('grade', grade), ('rewrite', rewrite)]:\n    g.add_node(name, fn)                              # 노드 3개 등록\ng.add_edge(START, 'retrieve')                         # 시작 -> 검색\ng.add_edge('retrieve', 'grade')                       # 검색 -> 채점\ng.add_conditional_edges('grade', route, {'rewrite': 'rewrite', END: END})  # 채점 -> 분기\ng.add_edge('rewrite', 'retrieve')                     # 재작성 -> 다시 검색(루프)\napp = g.compile()                                     # 실행 가능한 앱으로 컴파일\nprint(app.invoke({'question': 'HBM', 'docs': '', 'grade': '', 'tries': 0})['grade'])",
      "note": "검색->채점->(나쁘면)재작성->재검색 루프가 Agentic RAG의 핵심이다. tries로 최대 재시도를 제한해 무한루프를 막는다. 조건부 엣지가 \"검색이 나쁠 때 스스로 회복\"하게 만든다."
    },
    {
      "title": "Reflection 패턴 - 초안 생성 후 스스로 비평하고 개선",
      "lang": "python",
      "code": "# 에이전트가 자기 답을 되돌아보고(Reflect) 더 나은 답을 만드는 품질 통제 루프\nfrom openai import OpenAI\nclient = OpenAI(api_key='sk-본인키')\n\ndef generate(task, feedback=''):                      # 생성 단계: 초안 또는 개선안 작성\n    prompt = f'과제: {task}'                           # 기본 지시\n    if feedback:                                      # 피드백이 있으면 반영하도록 덧붙인다\n        prompt += f'\\n아래 지적을 반영해 다시 써라:\\n{feedback}'\n    r = client.chat.completions.create(model='gpt-4o-mini',\n        messages=[{'role': 'user', 'content': prompt}])\n    return r.choices[0].message.content\n\ndef reflect(draft):                                   # 비평 단계: 초안의 약점을 지적\n    r = client.chat.completions.create(model='gpt-4o-mini',\n        messages=[{'role': 'user', 'content': f'다음 글의 부족한 점만 짚어라:\\n{draft}'}])\n    return r.choices[0].message.content\n\ntask = '벡터DB를 3문장으로 설명'                        # 수행할 과제\ndraft = generate(task)                                # 1) 초안 생성\nfor i in range(2):                                    # 2) 비평->개선을 최대 2회 반복\n    critique = reflect(draft)                         # 자기 비평\n    draft = generate(task, feedback=critique)         # 비평을 반영해 다시 생성\nprint('최종본:', draft)                                # 루프를 거치며 품질이 올라간다",
      "note": "Reflection은 Generate와 Reflect 두 LLM 호출을 번갈아 돌려 답을 개선한다. Andrew Ng 실험처럼 반복 워크플로를 감싸면 같은 모델도 성능이 크게 오른다. 반복 상한을 둬 비용·무한루프를 통제한다."
    }
  ]
}
