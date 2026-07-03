// 강의안 날짜별 "실습 예제" — subjectId-day 키. { title, lang, code, note }

export const examples = {
  "git-1": [
    {
      "title": "지금 내 저장소 상태를 한눈에 보기",
      "lang": "bash",
      "code": "git status            # 현재 변경/스테이지 상태를 알려주는 안내판\n# 예상 출력:\n#   On branch main\n#   Changes not staged for commit:\n#     modified:   README.md   ← 고쳤지만 아직 add 안 한 파일\ngit add README.md     # README.md 를 다음 커밋 대상으로 담기\ngit status            # 다시 보면 'Changes to be committed' 로 옮겨가 있음",
      "note": "막힐 때마다 `git status` 를 치는 습관이 왕초보 탈출의 지름길이다."
    },
    {
      "title": "마지막 저장 이후 무엇이 바뀌었는지 보기(diff)",
      "lang": "bash",
      "code": "echo \"한 줄 추가\" >> README.md   # README.md 맨 끝에 새 줄 덧붙이기(>> 는 추가)\ngit diff                        # 직전 저장 대비 바뀐 부분을 +/- 로 보여줌\n# 예상 출력:\n#   +한 줄 추가     ← + 는 새로 추가된 줄을 의미",
      "note": "커밋하기 전에 `git diff` 로 '내가 뭘 바꿨는지' 확인하면 실수를 크게 줄인다."
    },
    {
      "title": "방금 커밋을 취소하고 변경은 그대로 두기(reset --soft)",
      "lang": "bash",
      "code": "git reset --soft HEAD~1   # 가장 최근 커밋 1개를 취소(HEAD~1 = 한 칸 전)\n# --soft 라서 파일 내용과 스테이지는 그대로 남는다(되돌리기 안전)\ngit status                # 방금 커밋했던 변경이 다시 '커밋 대기' 상태로 보임",
      "note": "커밋 메시지를 잘못 썼거나 한 커밋에 너무 많이 담았을 때 가장 자주 쓰는 안전한 되돌리기다."
    }
  ],
  "transformer-1": [
    {
      "title": "토크나이저로 문장을 토큰으로 쪼개기",
      "lang": "python",
      "code": "from transformers import AutoTokenizer            # 허깅페이스 토크나이저 불러오기\n\ntok = AutoTokenizer.from_pretrained(\"bert-base-uncased\")  # 사전학습 BERT 토크나이저 로드\nsentence = \"Transformers are amazing!\"             # 쪼갤 예문\nids = tok(sentence)[\"input_ids\"]                   # 문장을 토큰 ID 리스트로 변환\nprint(tok.convert_ids_to_tokens(ids))              # 결과: ['[CLS]', 'transformers', 'are', 'amazing', '!', '[SEP]']",
      "note": "한 단어가 여러 부분단어로 쪼개질 수 있고, 문장 앞뒤에 [CLS]·[SEP] 특수 토큰이 붙는 것을 확인한다."
    },
    {
      "title": "softmax로 '집중 비율' 만들어 보기",
      "lang": "python",
      "code": "import numpy as np                                # 수치 계산 라이브러리\n\nscores = np.array([2.0, 1.0, 0.1])                 # 세 토큰에 대한 원점수(아무 값)\nexp = np.exp(scores - scores.max())                # 최댓값 빼고 지수화(오버플로 방지)\nweights = exp / exp.sum()                           # 합이 1이 되도록 정규화\nprint(np.round(weights, 3))                         # 결과: [0.659 0.242 0.099]\nprint(\"합:\", weights.sum())                         # 결과: 합: 1.0",
      "note": "점수가 가장 큰 항목이 가장 큰 비율을 가져가고, 전체 합은 항상 1이 된다."
    }
  ],
  "transformer-2": [
    {
      "title": "BERT(빈칸 채우기)로 [MASK] 예측하기",
      "lang": "python",
      "code": "from transformers import pipeline                  # 간편 추론 파이프라인 불러오기\n\nfill = pipeline(\"fill-mask\", model=\"bert-base-uncased\")  # 빈칸 채우기 파이프라인 생성\nresult = fill(\"Paris is the [MASK] of France.\")     # [MASK] 자리에 올 단어 예측\nprint(result[0][\"token_str\"], round(result[0][\"score\"], 3))  # 결과: capital 0.9 근처",
      "note": "BERT는 양방향으로 문맥을 읽어 빈칸에 가장 어울리는 단어를 높은 확률로 채운다."
    },
    {
      "title": "GPT-2(이어 쓰기)로 문장 생성하기",
      "lang": "python",
      "code": "from transformers import pipeline                  # 추론 파이프라인 불러오기\n\ngen = pipeline(\"text-generation\", model=\"gpt2\")     # 텍스트 생성 파이프라인 생성\nout = gen(\"The future of AI is\", max_length=20, num_return_sequences=1)  # 문장 이어쓰기\nprint(out[0][\"generated_text\"])                     # 결과: 입력에 이어 자연스러운 영어 문장 출력",
      "note": "GPT-2는 왼쪽부터 다음 토큰을 차례로 예측하며 문장을 만들어내는 Decoder-only 모델이다."
    }
  ],
  "python-1": [
    {
      "title": "변수와 f-string으로 결과 예쁘게 출력",
      "lang": "python",
      "code": "name = '김데이터'        # 글자(문자열)를 담은 변수\nscore = 92               # 정수를 담은 변수\n# f-string: 문자열 안에 {변수}를 넣으면 그 값으로 바뀐다\nprint(f'{name}님의 점수는 {score}점입니다')  # 결과: 김데이터님의 점수는 92점입니다",
      "note": "f-string 은 문장 사이에 값을 끼워 넣는 가장 쉬운 출력 방법이다."
    },
    {
      "title": "딕셔너리로 이름→값 빠르게 찾기",
      "lang": "python",
      "code": "prices = {'사과': 1000, '바나나': 1500}  # '품목 이름'을 키로, 가격을 값으로 저장\nprint(prices['바나나'])                    # 키로 값을 즉시 조회 → 결과: 1500\nprices['포도'] = 3000                       # 새 항목을 추가한다\nprint(len(prices))                          # 항목 개수 → 결과: 3",
      "note": "딕셔너리는 이름표(키)만 알면 값을 바로 꺼낼 수 있어 검색이 매우 빠르다."
    },
    {
      "title": "컴프리헨션으로 한 줄 필터링",
      "lang": "python",
      "code": "nums = [3, -2, 7, 0, 5]                  # 양수만 골라낼 원본 데이터\n# [표현식 for 변수 in 리스트 if 조건] 형태로 한 줄에 반복+조건 처리\npositives = [n for n in nums if n > 0]   # 0보다 큰 값만 남긴다\nprint(positives)                          # 결과: [3, 7, 5]",
      "note": "컴프리헨션은 for 문과 if 문을 한 줄로 압축해 정제 코드를 짧게 만든다."
    }
  ],
  "python-2": [
    {
      "title": "DataFrame 만들고 열 선택하기",
      "lang": "python",
      "code": "import pandas as pd  # Pandas 불러오기\n# 딕셔너리로 표를 만든다(키=열 이름, 값=열 데이터)\ndf = pd.DataFrame({'이름': ['A', 'B', 'C'], '점수': [90, 70, 85]})\nprint(df['점수'].mean())  # '점수' 열의 평균 → 결과: 81.666...",
      "note": "딕셔너리 하나만 있으면 바로 표(DataFrame)를 만들 수 있다."
    },
    {
      "title": "조건으로 행 필터링하기",
      "lang": "python",
      "code": "import pandas as pd\ndf = pd.DataFrame({'이름': ['A', 'B', 'C'], '점수': [90, 70, 85]})\n# 대괄호 안에 조건을 넣으면 참인 행만 남는다\nhigh = df[df['점수'] >= 80]  # 80점 이상만 선택\nprint(len(high))             # 선택된 행 개수 → 결과: 2",
      "note": "df[조건] 형태가 Pandas 에서 데이터를 골라내는 가장 기본적인 방법이다."
    },
    {
      "title": "groupby로 그룹별 평균 내기",
      "lang": "python",
      "code": "import pandas as pd\ndf = pd.DataFrame({'반': ['1', '1', '2'], '점수': [90, 80, 70]})\n# '반'으로 묶어 각 반의 평균 점수를 구한다\nprint(df.groupby('반')['점수'].mean())  # 결과: 1반 85.0, 2반 70.0",
      "note": "groupby 는 같은 항목끼리 모아 통계 내기의 핵심 도구다."
    }
  ],
  "prompt-1": [
    {
      "title": "토큰 개수 세어 보기 (비용·길이 감 잡기)",
      "lang": "python",
      "code": "# 토큰을 세 주는 tiktoken 라이브러리를 불러온다\nimport tiktoken\n\n# gpt-4o 계열이 쓰는 토큰 변환기(인코더)를 가져온다\nenc = tiktoken.get_encoding(\"o200k_base\")\n\n# 길이를 재 볼 예시 문장\ntext = \"프롬프트 엔지니어링은 정말 재미있다\"\n\n# 문장을 토큰 숫자 목록으로 바꾼다 (모델이 보는 형태)\ntokens = enc.encode(text)\n\n# 토큰이 몇 개인지 출력한다\nprint(\"토큰 개수:\", len(tokens))   # 결과 예: 토큰 개수: 9\n",
      "note": "글자 수가 아니라 '토큰 수'가 비용·길이의 기준임을 직접 눈으로 확인하는 예제다."
    },
    {
      "title": "Chain-of-Thought 한 줄로 정답률 높이기",
      "lang": "python",
      "code": "# OpenAI 클래스를 불러온다\nfrom openai import OpenAI\n\n# 클라이언트 생성 (키는 본인 것으로 교체)\nclient = OpenAI(api_key=\"sk-본인키\")\n\n# 풀기 어려운 계산 문제 + '차근차근 생각하라'는 CoT 유도 문구\nq = \"사과 3개에 600원이면 사과 7개는 얼마? 단계별로 차근차근 계산해줘.\"\n\n# 모델에 질문을 보낸다\nres = client.chat.completions.create(\n    model=\"gpt-4o-mini\",                 # 사용할 모델\n    messages=[{\"role\": \"user\", \"content\": q}],  # 사용자 질문 한 개\n)\n\n# 모델의 답(풀이 과정 + 정답)을 출력한다\nprint(res.choices[0].message.content)    # 결과 예: 사과 1개=200원 ... 따라서 1400원\n",
      "note": "'단계별로 차근차근'이라는 한 문장만 추가해도 복잡한 문제의 정답률이 눈에 띄게 오른다."
    }
  ],
  "vue-1": [
    {
      "title": "ref 로 만든 반응형 카운터",
      "lang": "vue",
      "code": "<script setup>\n// 반응형 값을 만드는 ref 함수를 가져온다\nimport { ref } from 'vue'\n// 숫자 0 을 반응형으로 감싼 카운터 상태를 만든다\nconst count = ref(0)\n// 버튼을 누르면 카운터를 1 증가시키는 함수(자바스크립트에서는 .value 필요)\nfunction plus() { count.value++ }\n</script>\n\n<template>\n  <!-- 현재 카운트를 화면에 출력한다(템플릿에서는 .value 없이 바로 사용) -->\n  <p>현재 값: {{ count }}</p>\n  <!-- 버튼 클릭 시 plus 실행, 누를 때마다 위 숫자가 1씩 증가 -->\n  <button @click=\"plus\">+1</button>\n</template>",
      "note": "버튼을 누르면 count.value 만 바꿔도 화면 숫자가 자동으로 올라간다."
    },
    {
      "title": "v-if 와 v-for 디렉티브",
      "lang": "vue",
      "code": "<script setup>\n// 반응형 배열을 만들기 위해 ref 를 가져온다\nimport { ref } from 'vue'\n// 과일 이름 3개를 담은 반응형 배열\nconst fruits = ref(['사과', '바나나', '포도'])\n</script>\n\n<template>\n  <!-- 배열이 비어 있지 않을 때만(v-if 조건 참) 목록을 보여준다 -->\n  <ul v-if=\"fruits.length > 0\">\n    <!-- v-for 로 과일을 하나씩 꺼내 li 로 출력, key 로 인덱스 i 사용 -->\n    <li v-for=\"(f, i) in fruits\" :key=\"i\">{{ i + 1 }}. {{ f }}</li>\n  </ul>\n  <!-- 위 조건이 거짓이면(배열이 비면) 이 문구를 대신 보여준다 -->\n  <p v-else>과일이 없습니다.</p>\n</template>",
      "note": "v-for 는 반복 출력을, v-if/v-else 는 조건에 따른 화면 분기를 담당한다."
    }
  ],
  "vue-2": [
    {
      "title": "props 로 값 내려주기",
      "lang": "vue",
      "code": "<script setup>\n// 부모에게서 메시지 문자열을 props 로 받는다\ndefineProps({ message: String })\n</script>\n\n<template>\n  <!-- 받은 message 를 그대로 화면에 출력한다 -->\n  <p>부모가 보낸 말: {{ message }}</p>\n</template>",
      "note": "자식은 props 로 받은 값을 읽어 화면에 보여주기만 한다."
    },
    {
      "title": "onMounted 라이프사이클 훅",
      "lang": "vue",
      "code": "<script setup>\n// 컴포넌트가 화면에 나타날 때 실행되는 훅을 가져온다\nimport { onMounted, ref } from 'vue'\n// 표시할 메시지 상태\nconst msg = ref('로딩 중...')\n// 컴포넌트가 화면에 붙은 직후 한 번 실행된다(보통 데이터 불러오기에 사용)\nonMounted(() => {\n  msg.value = '화면이 준비되었습니다!' // 마운트 후 메시지를 바꾼다\n})\n</script>\n\n<template>\n  <!-- 처음엔 '로딩 중', 마운트 후엔 준비 완료 문구가 보인다 -->\n  <p>{{ msg }}</p>\n</template>",
      "note": "onMounted 안은 화면이 그려진 직후 딱 한 번 실행된다."
    }
  ],
  "vue-3": [
    {
      "title": "router-link 로 페이지 이동",
      "lang": "vue",
      "code": "<template>\n  <!-- 클릭하면 새로고침 없이 '/' 화면으로 이동 -->\n  <router-link to=\"/\">홈</router-link>\n  <!-- 클릭하면 1번 상품 상세로 이동 -->\n  <router-link to=\"/product/1\">1번 상품</router-link>\n  <!-- 현재 주소에 맞는 컴포넌트가 이 자리에 그려진다 -->\n  <router-view />\n</template>",
      "note": "router-link 는 이동 버튼, router-view 는 화면이 그려지는 자리다."
    },
    {
      "title": "Pinia 스토어 값 사용하기",
      "lang": "vue",
      "code": "<script setup>\n// 장바구니 스토어를 가져온다\nimport { useCartStore } from '../stores/cart'\n// 스토어 인스턴스를 얻는다(전역 데이터 접근)\nconst cart = useCartStore()\n</script>\n\n<template>\n  <!-- 스토어의 count 게터로 담긴 개수를 헤더에 표시 -->\n  <header>장바구니: {{ cart.count }}개</header>\n</template>",
      "note": "어느 컴포넌트에서든 useCartStore 로 같은 데이터를 바로 읽을 수 있다."
    }
  ],
  "vue-4": [
    {
      "title": "async/await 로 데이터 불러오기",
      "lang": "javascript",
      "code": "// HTTP 요청 라이브러리를 가져온다\nimport axios from 'axios'\n\n// 사용자 정보를 비동기로 불러오는 함수\nasync function getUser() {\n  // 1번 사용자 정보를 요청하고 응답을 기다린다\n  const res = await axios.get('https://jsonplaceholder.typicode.com/users/1')\n  // 받은 데이터에서 이름을 출력한다(예: Leanne Graham)\n  console.log(res.data.name)\n}\n\n// 함수를 실행해 결과를 확인한다\ngetUser()",
      "note": "await 는 응답이 올 때까지 기다린 뒤 다음 줄로 넘어간다."
    },
    {
      "title": "폼 유효성 검사",
      "lang": "vue",
      "code": "<script setup>\n// 반응형 상태를 위해 ref 를 가져온다\nimport { ref } from 'vue'\n// 입력값과 경고 메시지 상태\nconst title = ref('')\nconst warn = ref('')\n\n// 제출 시 제목이 비었는지 검사하는 함수\nfunction submit() {\n  // 공백 제거 후 비어 있으면 경고를 띄우고 중단\n  if (title.value.trim() === '') { warn.value = '제목을 입력하세요'; return }\n  // 통과하면 경고를 지운다(실제로는 서버 전송)\n  warn.value = ''\n}\n</script>\n\n<template>\n  <!-- 제목 입력창을 title 과 양방향 연결 -->\n  <input v-model=\"title\" placeholder=\"제목\" />\n  <!-- 제출 버튼: 클릭 시 submit 실행 -->\n  <button @click=\"submit\">등록</button>\n  <!-- 경고가 있을 때만 빨간 문구 표시 -->\n  <p v-if=\"warn\" style=\"color:red\">{{ warn }}</p>\n</template>",
      "note": "입력값을 검사해 비어 있으면 서버 전송 전에 막아 준다."
    }
  ],
  "webproject-1": [
    {
      "title": "기능 명세를 코드로 표현하기 — 우선순위 배열",
      "lang": "javascript",
      "code": "// features 는 우리 서비스가 가질 기능의 목록이다\nconst features = [\n  { name: '목록 보기', priority: '필수' },   // 데이터를 화면에 쭉 보여주는 핵심 기능\n  { name: '글 추가',   priority: '필수' },   // 새 항목을 입력하는 기능\n  { name: '검색',     priority: '선택' }    // 시간이 남으면 추가할 기능\n]\n// filter 로 '필수' 기능만 골라낸다(우선 개발할 목록)\nconst must = features.filter(f => f.priority === '필수')\n// map 으로 이름만 뽑아 배열로 만든다\nconsole.log(must.map(f => f.name)) // 결과: ['목록 보기', '글 추가']",
      "note": "기능에 우선순위를 붙이면 '무엇부터 만들지' 코드 수준에서 바로 정렬할 수 있다."
    },
    {
      "title": "사용자 시나리오를 구조화해 정리하기",
      "lang": "javascript",
      "code": "// 시나리오를 '누가/언제/무엇' 형식 객체로 정리하면 빠진 부분이 보인다\nconst scenarios = [\n  { who: '직장인', when: '점심시간', want: '근처 맛집을 빠르게 찾고 싶다' },\n  { who: '학생',   when: '주말',    want: '가본 곳을 기록해 두고 싶다' }\n]\n// forEach 로 한 줄씩 사람이 읽기 좋은 문장으로 출력한다\nscenarios.forEach(s => {\n  // 템플릿 문자열(백틱)로 변수들을 한 문장에 끼워 넣는다\n  console.log(`${s.who}는 ${s.when}에 ${s.want}`)\n})\n// 결과:\n// 직장인는 점심시간에 근처 맛집을 빠르게 찾고 싶다\n// 학생는 주말에 가본 곳을 기록해 두고 싶다",
      "note": "시나리오를 객체로 만들면 화면·기능을 빠뜨리지 않고 도출하기 쉽다."
    }
  ],
  "webproject-2": [
    {
      "title": "입력칸과 변수를 연결하는 v-model",
      "lang": "vue",
      "code": "<script setup>\nimport { ref } from 'vue' // 반응형 변수를 만드는 ref 가져오기\nconst title = ref('') // 입력값을 담을 빈 변수(처음엔 빈 문자열)\n</script>\n\n<template>\n  <!-- v-model 로 input 의 글자와 title 변수가 자동으로 같아진다 -->\n  <input v-model=\"title\" placeholder=\"제목 입력\" />\n  <!-- 입력하는 즉시 아래에 똑같이 표시된다 -->\n  <p>미리보기: {{ title }}</p>\n</template>",
      "note": "v-model 하나면 입력칸과 변수가 양쪽으로 자동 동기화된다."
    },
    {
      "title": "제출 전에 빈칸을 막는 유효성 검사",
      "lang": "javascript",
      "code": "// 사용자가 제출 버튼을 눌렀을 때 실행되는 함수\nfunction submit(title) {\n  // trim 으로 앞뒤 공백을 지운 뒤 빈 문자열인지 검사한다\n  if (title.trim() === '') {\n    // 비어 있으면 경고를 띄우고 false 를 돌려 제출을 막는다\n    alert('제목을 입력하세요')\n    return false\n  }\n  // 통과하면 true 를 돌려 저장을 진행한다\n  return true\n}\nconsole.log(submit('   ')) // 결과: 경고창 후 false\nconsole.log(submit('맛집')) // 결과: true",
      "note": "저장하기 전에 빈 입력을 걸러내면 깨진 데이터가 쌓이는 걸 막는다."
    }
  ],
  "webproject-3": [
    {
      "title": "코드에서 환경변수 읽어 API 주소 쓰기",
      "lang": "javascript",
      "code": "// import.meta.env 로 .env 에 적은 값을 읽는다(VITE_ 접두사 필수)\nconst API = import.meta.env.VITE_API_URL\n// 읽어온 주소로 데이터를 요청한다(주소를 코드에 직접 박지 않아 유지보수가 쉽다)\nfetch(`${API}/items`)\n  .then(res => res.json()) // 응답을 JSON 으로 변환\n  .then(data => console.log('받은 개수:', data.length)) // 결과: 받은 개수: 2\n  .catch(err => console.error('요청 실패:', err)) // 에러가 나면 콘솔에 표시",
      "note": "주소를 .env로 빼면 개발용·배포용 주소를 코드 수정 없이 바꿀 수 있다."
    },
    {
      "title": "배포 후 동작 점검 체크리스트(코드로 표현)",
      "lang": "javascript",
      "code": "// 배포된 사이트에서 직접 눌러보며 확인할 항목들\nconst checklist = [\n  '메인 화면이 흰 화면 없이 뜬다',   // base 설정 점검\n  '목록이 정상 표시된다',            // 데이터 로딩 점검\n  '새 글을 추가할 수 있다',          // 쓰기 기능 점검\n  '상세 화면으로 이동된다'           // 라우팅 점검\n]\n// 하나씩 통과 여부를 출력한다(실제로는 손으로 눌러 확인)\nchecklist.forEach((item, i) => console.log(`${i + 1}. ${item}`))\n// 결과: 1. 메인 화면이 흰 화면 없이 뜬다 ... 4. 상세 화면으로 이동된다",
      "note": "배포 후에는 반드시 실제 주소에서 핵심 기능을 하나씩 다시 눌러 확인한다."
    }
  ],
  "spring-ai-1": [
    {
      "title": "application.yml — Anthropic(클로드) 프로바이더 설정",
      "lang": "yaml",
      "code": "# Spring 관련 설정의 최상위 키\nspring:\n  ai:\n    # Anthropic(클로드) 공급사 설정 묶음\n    anthropic:\n      # 클로드 API 키를 환경변수에서 읽어 온다(코드에 키를 노출하지 않기 위함)\n      api-key: ${ANTHROPIC_API_KEY}\n      # 채팅 모델의 세부 옵션 묶음\n      chat:\n        options:\n          # 사용할 모델 식별자(클로드 계열 모델 이름)\n          model: claude-sonnet-4-20250514\n          # 창의성 정도: 0에 가까우면 일관적, 1에 가까우면 다양\n          temperature: 0.7",
      "note": "키를 코드가 아닌 환경변수(${...})로 읽어 보안을 지키는 것이 핵심 포인트다."
    },
    {
      "title": "System 메시지로 역할 지정하기",
      "lang": "java",
      "code": "// 빌더에서 system 메시지로 AI의 역할을 먼저 정한다\nString answer = chatClient.prompt()        // 프롬프트 작성 시작\n        .system(\"너는 친절한 자바 강사야. 쉬운 말로 답해.\")  // AI의 역할·말투를 지정\n        .user(\"제네릭이 뭐야?\")                 // 사용자의 실제 질문\n        .call()                                // LLM 호출\n        .content();                            // 답변 텍스트만 추출\n// 화면/로그에 답변을 출력한다 (결과: 초보자 눈높이의 제네릭 설명 문장)\nSystem.out.println(answer);",
      "note": "system()으로 역할과 말투를 먼저 정하면 답변 톤이 일관되게 유지된다."
    }
  ],
  "spring-ai-2": [
    {
      "title": "build.gradle — pgvector VectorStore 의존성",
      "lang": "bash",
      "code": "# build.gradle 의 dependencies 블록에 아래 줄들을 추가한다\ndependencies {\n  # pgvector 기반 VectorStore 자동설정을 가져온다\n  implementation 'org.springframework.ai:spring-ai-starter-vector-store-pgvector'\n  # 문장을 벡터로 바꿔 줄 임베딩 모델(여기서는 OpenAI 임베딩) 스타터\n  implementation 'org.springframework.ai:spring-ai-starter-model-openai'\n}",
      "note": "VectorStore 스타터와 임베딩 모델 스타터를 함께 넣어야 적재·검색이 동작한다."
    },
    {
      "title": "pgvector 컨테이너 띄우기",
      "lang": "bash",
      "code": "# pgvector가 미리 깔린 PostgreSQL 이미지를 백그라운드로 실행한다\ndocker run -d \\\n  --name pgvector \\\n  -e POSTGRES_PASSWORD=pass \\\n  -p 5432:5432 \\\n  pgvector/pgvector:pg16\n# 위 옵션: --name 컨테이너 이름, -e 비밀번호, -p 포트연결(내PC:컨테이너)\n# 결과: docker ps 로 보면 pgvector 컨테이너가 Up 상태로 보인다",
      "note": "별도 설치 없이 한 줄로 벡터 검색용 DB를 띄울 수 있다."
    }
  ],
  "spring-ai-3": [
    {
      "title": "구조화 출력 — 답을 record 리스트로 받기",
      "lang": "java",
      "code": "// 영화 추천 한 건을 담을 데이터 그릇(record)\npublic record Movie(String title, int year) {}\n\n// LLM에게 영화 3편을 Movie 리스트 모양으로 답하라고 요청한다\nList<Movie> movies = chatClient.prompt()      // 프롬프트 작성 시작\n        .user(\"가벼운 코미디 영화 3편 추천해줘\")   // 사용자 질문\n        .call()                                // LLM 호출\n        .entity(new ParameterizedTypeReference<List<Movie>>() {}); // List<Movie>로 변환\n// 결과를 반복하며 출력한다 (결과 예: 제목 (연도) 형태로 3줄)\nmovies.forEach(m -> System.out.println(m.title() + \" (\" + m.year() + \")\"));",
      "note": "복잡한 제네릭 타입은 ParameterizedTypeReference로 알려 줘야 List<Movie>로 정확히 매핑된다."
    },
    {
      "title": "스트리밍 응답 콘솔로 확인",
      "lang": "java",
      "code": "// 스트리밍으로 텍스트 조각(Flux)을 받는다\nFlux<String> flux = chatClient.prompt()       // 프롬프트 작성 시작\n        .user(\"스프링 AI를 5문장으로 설명해줘\")    // 사용자 질문\n        .stream()                              // 조각 단위 응답 모드\n        .content();                            // 텍스트 조각 스트림 추출\n// 조각이 도착할 때마다 줄바꿈 없이 이어서 출력한다(타자 치듯 보임)\nflux.doOnNext(System.out::print)               // 각 조각을 즉시 출력\n    .blockLast();                              // 마지막 조각까지 기다림(예제용)",
      "note": "blockLast()는 예제에서 끝까지 기다리려고 쓴 것이고, 실제 웹에서는 Flux를 그대로 반환한다."
    }
  ],
  "sllm-1": [
    {
      "title": "Hugging Face로 작은 모델 받아 한 줄 생성하기",
      "lang": "python",
      "code": "from transformers import pipeline   # 복잡한 단계를 한 번에 묶어주는 편의 도구\n\n# 'text-generation' 작업과 쓸 모델 이름만 주면 알아서 내려받아 준비한다\ngen = pipeline(\"text-generation\", model=\"Qwen/Qwen2.5-0.5B\")\n\nresult = gen(\"인공지능을 한 문장으로 설명하면\", max_new_tokens=30)  # 최대 30토큰까지 이어 쓰게 함\nprint(result[0][\"generated_text\"])   # 결과: 입력 문장 + 모델이 이어 쓴 설명이 출력됨",
      "note": "pipeline 한 줄이면 모델 다운로드부터 추론까지 자동으로 처리된다."
    },
    {
      "title": "모델 용량 가늠하기 — 파라미터 수로 메모리 추정",
      "lang": "python",
      "code": "params_billion = 7      # 모델 크기(예: 7B = 70억 파라미터)\nbits = 4                # 양자화 비트 수(4비트로 압축했다고 가정)\n\n# 대략적인 용량(GB) = 파라미터 수(10억) x 비트 / 8(=1바이트)\napprox_gb = params_billion * bits / 8   # 7 * 4 / 8 = 3.5\nprint(f\"필요 메모리 약 {approx_gb} GB\")   # 결과: 필요 메모리 약 3.5 GB",
      "note": "4비트 양자화를 쓰면 7B 모델도 약 3.5GB라 일반 노트북 메모리에 들어간다."
    }
  ],
  "sllm-2": [
    {
      "title": "instruction 학습 데이터 한 줄 만들기 (JSONL)",
      "lang": "python",
      "code": "import json   # 파이썬 딕셔너리를 JSON 문자열로 바꾸기 위해 사용\n\n# 모델에게 줄 '모범답안 카드' 한 장(지시 + 모범 출력)\nsample = {\n    \"text\": \"### 지시:\\nDreamIT의 약자를 풀어줘\\n### 응답:\\nDream + IT, 꿈을 IT로 이룬다는 뜻입니다.\"\n}\n\n# JSONL은 한 줄에 하나의 JSON, 여러 줄을 모아 학습셋이 된다\nwith open(\"data.jsonl\", \"a\", encoding=\"utf-8\") as f:  # 이어쓰기(a) 모드로 열기\n    f.write(json.dumps(sample, ensure_ascii=False) + \"\\n\")  # 카드 한 장을 파일에 추가\nprint(\"한 줄 추가 완료\")   # 결과: 한 줄 추가 완료",
      "note": "이런 카드를 10~20장 모으면 작은 도메인 파인튜닝 학습셋이 된다."
    },
    {
      "title": "학습한 LoRA 어댑터로 추론하기",
      "lang": "python",
      "code": "from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저\nfrom peft import PeftModel   # 저장한 LoRA 어댑터를 본체에 다시 끼우는 도구\n\nbase = \"Qwen/Qwen2.5-0.5B\"           # 학습에 썼던 베이스 모델\ntok = AutoTokenizer.from_pretrained(base)        # 토크나이저 불러오기\nmodel = AutoModelForCausalLM.from_pretrained(base)  # 베이스 모델 불러오기\nmodel = PeftModel.from_pretrained(model, \"my-lora\")  # 저장해 둔 LoRA 어댑터 결합\n\nprompt = \"### 지시:\\nDreamIT의 약자를 풀어줘\\n### 응답:\\n\"  # 학습 때와 같은 형식으로 질문\nids = tok(prompt, return_tensors=\"pt\").input_ids   # 문장을 토큰 숫자로 변환\nout = model.generate(ids, max_new_tokens=40)       # 최대 40토큰 답 생성\nprint(tok.decode(out[0], skip_special_tokens=True))  # 결과: 학습한 말투로 답이 출력됨",
      "note": "본체 + LoRA 어댑터를 합쳐 불러오면 파인튜닝된 모델로 추론할 수 있다."
    }
  ],
  "ml-dl-1": [
    {
      "title": "데이터 모양 확인하기",
      "lang": "python",
      "code": "from sklearn.datasets import load_iris  # 붓꽃 데이터 로더\niris = load_iris()                       # 데이터 불러오기\nprint(iris.data.shape)   # 결과: (150, 4)  150송이, 특징 4개\nprint(iris.target_names) # 결과: ['setosa' 'versicolor' 'virginica']",
      "note": "모델을 만들기 전에 데이터가 몇 행 몇 열인지, 정답 종류가 무엇인지 먼저 확인하는 습관이 중요하다."
    },
    {
      "title": "정확도 한 줄로 구하기",
      "lang": "python",
      "code": "from sklearn.metrics import accuracy_score  # 정확도 계산 함수\ny_true = [0, 1, 1, 0]   # 실제 정답\ny_pred = [0, 1, 0, 0]   # 모델 예측 (3번째만 틀림)\nprint(accuracy_score(y_true, y_pred))  # 결과: 0.75  (4개 중 3개 맞음)",
      "note": "정확도는 '전체 중 맞힌 비율'이라 직관적이지만, 정답이 한쪽으로 치우치면 정밀도·재현율도 함께 봐야 한다."
    }
  ],
  "ml-dl-2": [
    {
      "title": "텐서 만들고 계산하기",
      "lang": "python",
      "code": "import torch                       # 파이토치 불러오기\na = torch.tensor([1.0, 2.0, 3.0])  # 1차원 텐서(벡터) 생성\nb = a * 2                          # 모든 원소에 2를 곱함\nprint(b)        # 결과: tensor([2., 4., 6.])\nprint(b.sum())  # 결과: tensor(12.)  모든 원소의 합",
      "note": "텐서는 넘파이 배열과 거의 똑같이 쓰지만, GPU 연산과 자동 미분을 지원한다는 점이 다르다."
    },
    {
      "title": "ReLU 활성화 함수 체험",
      "lang": "python",
      "code": "import torch\nimport torch.nn as nn          # 신경망 모듈\nrelu = nn.ReLU()               # 음수는 0, 양수는 그대로\nx = torch.tensor([-2.0, -0.5, 0.0, 1.5])  # 음수와 양수 섞인 입력\nprint(relu(x))  # 결과: tensor([0., 0., 0., 1.5])  음수가 모두 0이 됨",
      "note": "ReLU 는 음수 신호를 잘라내 신경망에 비선형성을 더해, 직선으로 못 푸는 문제도 풀게 해준다."
    }
  ],
  "ml-dl-3": [
    {
      "title": "합성곱 한 번 해보기",
      "lang": "python",
      "code": "import torch\nimport torch.nn as nn\nconv = nn.Conv2d(1, 1, 3)              # 입력채널1, 출력1, 3x3 필터\nimg = torch.ones(1, 1, 5, 5)          # 5x5 흰 이미지(모두 1)\nout = conv(img)                       # 합성곱 적용\nprint(out.shape)  # 결과: torch.Size([1, 1, 3, 3])  3x3으로 줄어듦",
      "note": "3x3 필터로 5x5 이미지를 훑으면 가장자리가 잘려 3x3 특징 지도가 나온다(padding 으로 크기 유지 가능)."
    },
    {
      "title": "드롭아웃 켜고 끄기",
      "lang": "python",
      "code": "import torch\nimport torch.nn as nn\ndrop = nn.Dropout(0.5)        # 절반을 0으로 끔\nx = torch.ones(1, 6)         # 모두 1인 입력\ndrop.train()                 # 학습 모드: 드롭아웃 작동\nprint(drop(x))               # 결과: 일부가 0, 나머지는 2.0으로 증폭(매번 다름)",
      "note": "학습 모드에서는 일부 뉴런을 끄지만, 평가 모드(drop.eval())에서는 모두 살려 안정적으로 예측한다."
    }
  ],
  "feature-1": [
    {
      "title": "결측치를 중앙값으로 채우기",
      "lang": "python",
      "code": "import pandas as pd  # 데이터 표를 다루는 라이브러리\nimport numpy as np   # 빈 값(NaN) 표현에 사용\n\n# 나이 일부가 비어 있는 작은 표 만들기\ndf = pd.DataFrame({'age': [20, np.nan, 35, np.nan, 50]})\n\n# 중앙값(가운데 값)을 구해 빈 칸을 채움 (평균보다 이상치에 강함)\ndf['age'] = df['age'].fillna(df['age'].median())\n\nprint(df['age'].tolist())  # 결과: [20.0, 35.0, 35.0, 35.0, 50.0]",
      "note": "median(중앙값)은 튀는 값에 덜 흔들려 결측치 채우기에 안전하다."
    },
    {
      "title": "범주형을 원-핫 인코딩으로 바꾸기",
      "lang": "python",
      "code": "import pandas as pd  # 데이터 처리 라이브러리\n\n# 색깔이라는 글자 범주가 든 표\ndf = pd.DataFrame({'color': ['red', 'blue', 'red', 'green']})\n\n# get_dummies: 각 색깔마다 0/1 칸을 자동 생성\nonehot = pd.get_dummies(df['color'])\n\nprint(onehot.columns.tolist())  # 결과: ['blue', 'green', 'red']\nprint(onehot.iloc[0].tolist())  # 첫 행(red): [0, 0, 1]",
      "note": "순서 없는 범주는 원-핫으로 바꿔야 모델이 크기 오해를 하지 않는다."
    },
    {
      "title": "날짜에서 파생 피처 뽑기",
      "lang": "python",
      "code": "import pandas as pd  # 날짜 처리에도 pandas 사용\n\n# 문자열 날짜를 진짜 날짜형으로 변환\ns = pd.to_datetime(['2026-06-30', '2026-12-25'])\n\n# 날짜에서 '월'과 '요일' 같은 숨은 정보 추출\nmonth = s.month        # 월 숫자\nweekday = s.dayofweek  # 0=월요일 ... 6=일요일\n\nprint(month.tolist())    # 결과: [6, 12]\nprint(weekday.tolist())  # 결과: [1, 4]  (화요일, 금요일)",
      "note": "원본 날짜보다 월·요일 같은 파생 피처가 패턴을 더 잘 드러낸다."
    }
  ],
  "modeldev-1": [
    {
      "title": "데이터 한 줄로 나누기 (train_test_split)",
      "lang": "python",
      "note": "stratify 를 넣으면 정답 비율이 한쪽으로 쏠리지 않는다.",
      "code": "from sklearn.model_selection import train_test_split  # 분할 도구 불러오기\nfrom sklearn.datasets import load_iris                # 연습용 데이터\n\nX = load_iris().data   # 설명 데이터(꽃 크기)\ny = load_iris().target # 정답(품종 번호)\n\n# 학습 80% / 테스트 20% 로 나눈다 (정답 비율 유지 + 재현 가능하게 고정)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=0)\nprint(len(X_tr), len(X_te))  # 결과: 120 30  → 학습 120개, 테스트 30개"
    },
    {
      "title": "가장 단순한 기준점: 무조건 다수 클래스를 찍는 DummyClassifier",
      "lang": "python",
      "note": "이 점수보다 못하면 우리 모델은 '찍기'만도 못한 것이다.",
      "code": "from sklearn.dummy import DummyClassifier  # 일부러 단순하게 '찍는' 기준 모델\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\n\nX, y = load_iris(return_X_y=True)  # X, y 를 한 번에 받기\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=0)  # 기본 75:25 분할\n\n# strategy='most_frequent': 가장 많이 나온 정답만 계속 찍는 전략\ndummy = DummyClassifier(strategy='most_frequent')\ndummy.fit(X_tr, y_tr)                 # '찍기' 기준을 학습(사실상 다수 클래스 기억)\nprint('찍기 정확도:', round(dummy.score(X_te, y_te), 3))  # 결과 예: 찍기 정확도: 0.342"
    }
  ],
  "modeldev-2": [
    {
      "title": "랜덤 서치로 빠르게 좋은 설정 찾기",
      "lang": "python",
      "note": "n_iter 만큼만 무작위로 시험하므로 넓은 범위를 빠르게 훑는다.",
      "code": "from sklearn.datasets import load_iris\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import RandomizedSearchCV  # 무작위 탐색 도구\n\nX, y = load_iris(return_X_y=True)\nparam = {'n_estimators': [50, 100, 200, 300], 'max_depth': [2, 3, 4, 5, None]}  # 후보 범위\n\n# n_iter=8: 모든 조합이 아니라 무작위 8개 조합만 시험(빠름)\nsearch = RandomizedSearchCV(RandomForestClassifier(random_state=0), param,\n                            n_iter=8, cv=5, random_state=0)\nsearch.fit(X, y)\nprint('최적 점수:', round(search.best_score_, 3))  # 결과 예: 최적 점수: 0.967"
    },
    {
      "title": "여러 모델을 모으는 투표(VotingClassifier)",
      "lang": "python",
      "note": "성격이 다른 모델을 모으면 한쪽의 실수를 다른 쪽이 메워 준다.",
      "code": "from sklearn.datasets import load_iris\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.ensemble import VotingClassifier  # 여러 모델의 다수결 투표\nfrom sklearn.model_selection import cross_val_score\n\nX, y = load_iris(return_X_y=True)\n# 서로 다른 두 모델을 후보로 등록\nvote = VotingClassifier([\n    ('lr', LogisticRegression(max_iter=1000)),  # 모델1: 로지스틱 회귀\n    ('dt', DecisionTreeClassifier(max_depth=3)),# 모델2: 얕은 결정트리\n], voting='hard')  # 'hard': 다수결로 최종 결정\n\nscore = cross_val_score(vote, X, y, cv=5).mean()  # 5겹 교차검증 평균\nprint('앙상블 평균 점수:', round(score, 3))         # 결과 예: 앙상블 평균 점수: 0.96"
    }
  ],
  "rag-1": [
    {
      "title": "임베딩으로 문장의 의미 비슷함을 숫자로 재 보기",
      "lang": "python",
      "code": "from langchain_openai import OpenAIEmbeddings  # 임베딩 모델 불러오기\nfrom numpy import dot  # 두 벡터의 내적을 구하는 함수\nfrom numpy.linalg import norm  # 벡터의 길이(크기)를 구하는 함수\n\nemb = OpenAIEmbeddings(model=\"text-embedding-3-small\")  # 임베딩 모델 준비\nv1 = emb.embed_query(\"강아지가 공원을 뛴다\")  # 첫 문장을 벡터로 변환\nv2 = emb.embed_query(\"개가 공원에서 달린다\")  # 의미가 비슷한 문장을 벡터로 변환\nv3 = emb.embed_query(\"오늘 주식 시장이 폭락했다\")  # 의미가 전혀 다른 문장을 벡터로 변환\n\ndef cos(a, b):  # 코사인 유사도를 계산하는 함수 정의\n    return dot(a, b) / (norm(a) * norm(b))  # 내적을 각 벡터 길이의 곱으로 나눈다\n\nprint(round(cos(v1, v2), 3))  # 결과: 0.8 부근(비슷한 문장이라 높음)\nprint(round(cos(v1, v3), 3))  # 결과: 0.1 부근(다른 주제라 낮음)",
      "note": "의미가 비슷한 문장은 유사도가 높고 다른 주제는 낮게 나오는 것을 눈으로 확인하는 게 핵심이다."
    },
    {
      "title": "긴 글을 조각으로 잘라 개수와 모양 확인하기",
      "lang": "python",
      "code": "from langchain.text_splitter import RecursiveCharacterTextSplitter  # 분할기 불러오기\n\ntext = \"RAG는 검색과 생성을 합친 방법이다. \" * 20  # 같은 문장을 20번 이어 붙여 긴 글을 만든다\nsplitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=20)  # 100자씩, 20자 겹치게\nchunks = splitter.split_text(text)  # 긴 글을 조각 리스트로 자른다\n\nprint(f\"조각 수: {len(chunks)}\")  # 결과: 조각 수: 8 (글 길이에 따라 달라짐)\nprint(chunks[0])  # 결과: 첫 조각 내용이 100자 안쪽으로 출력됨",
      "note": "chunk_size 와 chunk_overlap 숫자를 바꾸면 조각 수가 달라지는 것을 체감하는 예제다."
    }
  ],
  "rag-2": [
    {
      "title": "리트리버로 관련 조각만 빠르게 가져오기",
      "lang": "python",
      "code": "from langchain_community.vectorstores import Chroma  # 벡터 DB 불러오기\nfrom langchain_openai import OpenAIEmbeddings  # 임베딩 모델\n\nembeddings = OpenAIEmbeddings(model=\"text-embedding-3-small\")  # 색인 때와 같은 모델\nvectordb = Chroma(persist_directory=\"chroma_db\", embedding_function=embeddings)  # 저장 폴더 로드\nretriever = vectordb.as_retriever(search_kwargs={\"k\": 3})  # 상위 3개만 가져오는 리트리버\n\ndocs = retriever.invoke(\"환불은 며칠 안에 가능한가요?\")  # 질문을 넣어 관련 조각을 가져온다\nprint(f\"가져온 조각 수: {len(docs)}\")  # 결과: 가져온 조각 수: 3\nprint(docs[0].page_content[:60])  # 결과: 첫 조각의 앞 60자가 출력됨",
      "note": "k 값을 바꾸면 가져오는 조각 수가 그대로 바뀌는 것을 확인한다."
    },
    {
      "title": "키워드(BM25)와 벡터를 합친 하이브리드 검색",
      "lang": "python",
      "code": "from langchain_community.retrievers import BM25Retriever  # 키워드 기반 검색기\nfrom langchain.retrievers import EnsembleRetriever  # 여러 검색기를 합치는 도구\nfrom langchain_core.documents import Document  # 문서 조각 객체\n\ndocs = [Document(page_content=t) for t in [  # 간단한 예시 문서 3개를 만든다\n    \"환불은 구매 후 7일 이내 가능합니다\",\n    \"배송은 보통 2~3일 걸립니다\",\n    \"회원 등급은 구매액에 따라 정해집니다\",\n]]\nbm25 = BM25Retriever.from_documents(docs)  # 단어가 겹치는지로 찾는 키워드 검색기 생성\nbm25.k = 2  # 상위 2개만 반환하도록 설정\n# 실제로는 벡터 리트리버와 EnsembleRetriever([bm25, vector], weights=[0.5,0.5])로 합친다\nprint(bm25.invoke(\"환불\")[0].page_content)  # 결과: 환불은 구매 후 7일 이내 가능합니다",
      "note": "키워드 검색은 정확한 단어 일치에 강해 벡터 검색의 약점을 보완한다."
    }
  ],
  "rag-3": [
    {
      "title": "같은 질문 두 번으로 캐싱 효과 체감하기",
      "lang": "python",
      "code": "import time  # 시간을 재는 표준 라이브러리\nfrom langchain_openai import ChatOpenAI  # 대화형 LLM\nfrom langchain_core.caches import InMemoryCache  # 메모리에 결과를 저장하는 캐시\nfrom langchain_core.globals import set_llm_cache  # 전역 캐시를 설정하는 함수\n\nset_llm_cache(InMemoryCache())  # LLM 호출 결과를 메모리에 캐싱하도록 켠다\nllm = ChatOpenAI(model=\"gpt-4o-mini\")  # 사용할 모델 준비\n\nt1 = time.time()  # 첫 호출 시작 시각 기록\nllm.invoke(\"RAG를 한 문장으로 설명해줘\")  # 처음에는 실제로 API를 호출해 느리다\nprint(f\"1차: {time.time()-t1:.2f}초\")  # 결과: 1차: 1.20초 (예시)\n\nt2 = time.time()  # 두 번째 호출 시작 시각 기록\nllm.invoke(\"RAG를 한 문장으로 설명해줘\")  # 같은 질문은 캐시에서 바로 가져와 빠르다\nprint(f\"2차: {time.time()-t2:.2f}초\")  # 결과: 2차: 0.00초 (캐시 적중)",
      "note": "같은 입력은 캐시에서 즉시 반환되어 비용과 시간을 크게 줄여 준다."
    },
    {
      "title": "메타데이터 필터로 특정 문서만 검색하기",
      "lang": "python",
      "code": "from langchain_community.vectorstores import Chroma  # 벡터 DB\nfrom langchain_openai import OpenAIEmbeddings  # 임베딩 모델\n\nembeddings = OpenAIEmbeddings(model=\"text-embedding-3-small\")  # 색인 때와 같은 모델\nvectordb = Chroma(persist_directory=\"chroma_db\", embedding_function=embeddings)  # 인덱스 로드\n\n# filter 에 조건을 주면 꼬리표가 맞는 조각만 검색 대상으로 삼는다\nresults = vectordb.similarity_search(\n    \"휴가 규정\",                    # 검색할 질문\n    k=3,                            # 상위 3개\n    filter={\"source\": \"docs/company_policy.pdf\"}  # 이 파일에서 온 조각만 검색\n)\nprint(len(results))  # 결과: 3 (해당 문서 안에서만 찾음)",
      "note": "여러 문서가 섞여 있을 때 원하는 문서로 검색 범위를 좁혀 정확도와 속도를 높인다."
    }
  ],
  "langchain-1": [
    {
      "title": "모델 한 번 호출해 보기 (가장 단순한 형태)",
      "lang": "python",
      "code": "# Anthropic 채팅 모델 연동 클래스를 가져온다\nfrom langchain_anthropic import ChatAnthropic\n# 모델 객체를 만든다(어떤 모델을 쓸지 이름으로 지정)\nmodel = ChatAnthropic(model=\"claude-sonnet-4-5\")\n# invoke에 질문 문자열을 넣어 모델을 한 번 실행한다\nanswer = model.invoke(\"LangChain을 한 문장으로 설명해줘\")\n# 모델 답 객체의 content에 실제 답 글자가 들어 있으므로 그것을 출력한다\nprint(answer.content)  # 결과 예: 'LangChain은 LLM 앱을 부품처럼 조립하게 돕는 도구다.'",
      "note": "체인을 만들기 전에 모델만 단독으로 불러 보는 가장 기초 예제다."
    },
    {
      "title": "프롬프트 양식에 값 끼워 넣어 확인하기",
      "lang": "python",
      "code": "# 프롬프트 양식을 만드는 도구를 가져온다\nfrom langchain_core.prompts import ChatPromptTemplate\n# {언어} 자리를 가진 번역 지시 프롬프트를 만든다\nprompt = ChatPromptTemplate.from_template(\"'{word}'를 {언어}로 번역해줘\")\n# 빈칸에 실제 값을 채워 완성된 프롬프트가 어떻게 보이는지 만들어 본다\nfilled = prompt.invoke({\"word\": \"사과\", \"언어\": \"영어\"})\n# 완성된 메시지 내용을 출력해 양식이 잘 채워졌는지 눈으로 확인한다\nprint(filled.messages[0].content)  # 결과: \"'사과'를 영어로 번역해줘\"",
      "note": "모델에 보내기 전, 프롬프트가 어떻게 채워지는지 직접 눈으로 보는 점이 핵심이다."
    },
    {
      "title": "JSON으로 구조화 출력 받기",
      "lang": "python",
      "code": "# JSON 형태로 결과를 파싱해 주는 출력 파서를 가져온다\nfrom langchain_core.output_parsers import JsonOutputParser\n# 프롬프트 양식 도구를 가져온다\nfrom langchain_core.prompts import ChatPromptTemplate\n# 모델 연동 클래스를 가져온다\nfrom langchain_anthropic import ChatAnthropic\n# 이름과 나이를 JSON으로 뽑아 달라고 지시하는 프롬프트를 만든다\nprompt = ChatPromptTemplate.from_template(\n    \"문장에서 이름과 나이를 JSON으로 뽑아줘: {sentence}\")  # 빈칸 sentence에 문장이 들어간다\n# 프롬프트 | 모델 | JSON파서 순으로 체인을 조립한다\nchain = prompt | ChatAnthropic(model=\"claude-sonnet-4-5\") | JsonOutputParser()\n# 체인을 실행하면 문자열이 아니라 파이썬 딕셔너리로 결과가 나온다\nout = chain.invoke({\"sentence\": \"홍길동은 30살이다\"})\n# 딕셔너리이므로 키로 값을 바로 꺼낼 수 있다\nprint(out)  # 결과 예: {'이름': '홍길동', '나이': 30}",
      "note": "StrOutputParser 대신 JsonOutputParser를 쓰면 결과를 바로 코드에서 다룰 수 있다."
    }
  ],
  "langchain-2": [
    {
      "title": "대화 메모리로 앞말 기억하기",
      "lang": "python",
      "code": "# 대화 기록을 자동으로 끼워 주는 래퍼를 가져온다\nfrom langchain_core.runnables.history import RunnableWithMessageHistory\n# 대화를 메모리에 보관하는 저장소를 가져온다\nfrom langchain_community.chat_message_histories import ChatMessageHistory\n# 모델을 가져온다\nfrom langchain_anthropic import ChatAnthropic\n# 세션별 대화 기록을 담아 둘 딕셔너리를 만든다\nstore = {}\n# 세션 id로 그 사람의 대화 기록을 돌려주는 함수를 정의한다\ndef get_history(session_id):\n    if session_id not in store:           # 처음 보는 세션이면\n        store[session_id] = ChatMessageHistory()  # 새 기록 객체를 만들어 둔다\n    return store[session_id]              # 해당 세션의 기록을 돌려준다\n# 모델에 '기록을 자동으로 함께 보내기' 기능을 입힌다\nchat = RunnableWithMessageHistory(ChatAnthropic(model=\"claude-sonnet-4-5\"), get_history)\n# 같은 session_id로 첫 마디를 보낸다(이름을 알려 준다)\ncfg = {\"configurable\": {\"session_id\": \"u1\"}}  # 누구의 대화인지 식별\nchat.invoke(\"내 이름은 길동이야\", config=cfg)   # 모델이 기록에 저장\n# 같은 세션으로 다시 물으면 앞말을 기억해 답한다\nprint(chat.invoke(\"내 이름이 뭐였지?\", config=cfg).content)  # 결과: '길동입니다.'",
      "note": "session_id를 같게 유지하면 모델이 직전 대화를 이어받아 맥락을 기억한다."
    },
    {
      "title": "나만의 도구(Tool) 만들어 모델에 연결",
      "lang": "python",
      "code": "# 함수를 도구로 등록해 주는 데코레이터를 가져온다\nfrom langchain_core.tools import tool\n# 모델을 가져온다\nfrom langchain_anthropic import ChatAnthropic\n# @tool을 붙여 일반 함수를 모델이 쓸 수 있는 도구로 만든다\n@tool\ndef add(a: int, b: int) -> int:\n    \"\"\"두 정수를 더한다\"\"\"  # 설명: 모델이 이 글을 보고 언제 쓸지 판단한다\n    return a + b           # 실제 덧셈 결과를 돌려준다\n# 모델에 도구 목록을 묶어(bind) 도구를 쓸 수 있게 한다\nmodel = ChatAnthropic(model=\"claude-sonnet-4-5\").bind_tools([add])\n# 계산이 필요한 질문을 던진다\nres = model.invoke(\"12345 더하기 6789는?\")\n# 모델이 직접 계산하지 않고 add 도구를 쓰겠다고 요청한 내역을 출력한다\nprint(res.tool_calls)  # 결과 예: [{'name':'add','args':{'a':12345,'b':6789}}]",
      "note": "모델은 답을 지어내는 대신 add 도구를 호출하겠다고 알려 주어 정확한 계산이 가능해진다."
    }
  ],
  "langchain-3": [
    {
      "title": "체인 결과를 스트리밍으로 받아 출력",
      "lang": "python",
      "code": "# 프롬프트·모델·파서를 가져온다\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import StrOutputParser\nfrom langchain_anthropic import ChatAnthropic\n# 짧은 글짓기를 시키는 프롬프트를 만든다\nprompt = ChatPromptTemplate.from_template(\"{topic}에 대한 짧은 시를 써줘\")\n# 프롬프트→모델→파서로 체인을 조립한다\nchain = prompt | ChatAnthropic(model=\"claude-sonnet-4-5\") | StrOutputParser()\n# invoke 대신 stream을 쓰면 답이 조각으로 나뉘어 들어온다\nfor chunk in chain.stream({\"topic\": \"봄비\"}):  # 조각을 순서대로 하나씩 받는다\n    print(chunk, end=\"\", flush=True)            # 줄바꿈 없이 즉시 화면에 이어 출력\n# 결과: 시가 한 글자씩 또르르 흘러나오며 출력된다",
      "note": "invoke를 stream으로 바꾸기만 하면 같은 체인이 글자를 흘려보내는 스트리밍이 된다."
    },
    {
      "title": "캐싱으로 같은 질문 빠르게 답하기",
      "lang": "python",
      "code": "# 시간 측정을 위해 time 모듈을 가져온다\nimport time\n# 캐시 설정 함수와 메모리 캐시를 가져온다\nfrom langchain_core.globals import set_llm_cache\nfrom langchain_community.cache import InMemoryCache\n# 모델을 가져온다\nfrom langchain_anthropic import ChatAnthropic\n# 메모리 캐시를 켠다(같은 입력은 저장된 답을 재사용)\nset_llm_cache(InMemoryCache())\n# 모델 객체를 만든다\nmodel = ChatAnthropic(model=\"claude-sonnet-4-5\")\n# 첫 호출 시각을 기록하고 모델을 부른다(실제로 모델이 일한다)\nt1 = time.time(); model.invoke(\"하늘은 왜 파랄까?\")\n# 첫 호출에 걸린 시간을 출력한다(예: 1.8초)\nprint(\"1차:\", round(time.time() - t1, 2), \"초\")\n# 같은 질문을 다시 부른다(이번엔 캐시에서 즉시 가져온다)\nt2 = time.time(); model.invoke(\"하늘은 왜 파랄까?\")\n# 두 번째는 거의 0초임을 출력해 캐시 효과를 확인한다\nprint(\"2차:\", round(time.time() - t2, 2), \"초\")  # 결과 예: 2차: 0.0 초",
      "note": "두 번째 호출이 사실상 0초인 것은 모델을 다시 부르지 않고 캐시에서 답을 꺼냈기 때문이다."
    }
  ],
  "serving-1": [
    {
      "title": "joblib 으로 모델 저장하고 다시 불러오기",
      "lang": "python",
      "code": "import joblib                                    # 파일 저장/로드 도구 가져오기\nfrom sklearn.linear_model import LogisticRegression  # 간단한 분류 모델\n\nclf = LogisticRegression()                    # 모델 객체 생성\nclf.fit([[0],[1],[2],[3]], [0,0,1,1])         # 작은 데이터로 학습(0,1 / 2,3 → 클래스 0,1)\n\njoblib.dump(clf, 'clf.joblib')               # 학습된 모델을 파일로 저장\nloaded = joblib.load('clf.joblib')           # 파일에서 모델을 다시 불러오기\nprint(loaded.predict([[2.5]]))               # 결과: [1] (2.5는 클래스 1로 예측)\n",
      "note": "학습과 서빙은 보통 다른 시점·다른 컴퓨터에서 일어나므로 모델을 파일로 주고받는 것이 기본이다."
    },
    {
      "title": "curl 로 추론 API 호출해 보기",
      "lang": "bash",
      "code": "# 실행 중인 FastAPI 서버에 JSON 입력을 POST로 보낸다\ncurl -X POST http://127.0.0.1:8000/predict \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"sepal_length\":5.1,\"sepal_width\":3.5,\"petal_length\":1.4,\"petal_width\":0.2}'\n# 결과 예시: {\"prediction\":\"setosa\",\"model_version\":\"v1.0.0\"}\n",
      "note": "-H 는 보내는 데이터가 JSON 이라는 표시이고, -d 는 실제 입력 본문이다."
    }
  ],
  "serving-2": [
    {
      "title": "이미지 빌드하고 컨테이너 실행하기",
      "lang": "bash",
      "code": "# 현재 폴더(.)의 Dockerfile 로 이미지를 만들고 이름표(tag)를 붙인다\ndocker build -t iris-api:v1 .\n# 만든 이미지를 백그라운드(-d)로 실행하고 포트를 연결한다\ndocker run -d -p 8000:8000 --name iris iris-api:v1\n# 지금 실행 중인 컨테이너 목록을 확인한다\ndocker ps                # 결과: iris 컨테이너가 8000포트로 Up 상태\n",
      "note": "-d 는 백그라운드 실행, -p 호스트:컨테이너 는 포트를 바깥과 연결한다는 뜻이다."
    },
    {
      "title": "컨테이너 로그 보고 정리하기",
      "lang": "bash",
      "code": "# iris 컨테이너가 출력한 로그를 실시간으로 따라 본다\ndocker logs -f iris      # 요청이 들어올 때마다 접근 로그가 흐름\n# 다 봤으면 Ctrl+C 로 빠져나온 뒤 컨테이너를 멈추고 삭제한다\ndocker stop iris         # 컨테이너 정지\ndocker rm iris           # 정지된 컨테이너 삭제(정리)\n",
      "note": "문제가 생기면 가장 먼저 `docker logs` 로 컨테이너가 남긴 기록을 확인한다."
    }
  ],
  "serving-3": [
    {
      "title": "MLflow 로 파라미터·지표 한 건 기록하기",
      "lang": "python",
      "code": "import mlflow                          # 실험 추적 도구\n\nwith mlflow.start_run():            # 실행 하나 시작\n    mlflow.log_param('lr', 0.01)    # 학습률 설정값 기록\n    mlflow.log_metric('acc', 0.95)  # 정확도 결과 기록\n    print('기록 완료')              # 결과: MLflow UI 에 run 1개가 쌓임\n",
      "note": "log_param 은 '내가 정한 설정', log_metric 은 '나온 결과'를 적는다고 구분하면 쉽다."
    },
    {
      "title": "pytest 로 모델 정확도 기준 검증하기",
      "lang": "python",
      "code": "import joblib                          # 모델 로드\nfrom sklearn.datasets import load_iris   # 검증 데이터\nfrom sklearn.metrics import accuracy_score  # 정확도 계산\n\ndef test_accuracy_threshold():      # 이름이 test_ 로 시작하면 pytest 가 자동 실행\n    model = joblib.load('model.joblib')  # 학습된 모델 불러오기\n    X, y = load_iris(return_X_y=True)    # 검증용 입력·정답\n    acc = accuracy_score(y, model.predict(X))  # 전체 정확도 계산\n    assert acc > 0.9                 # 0.9 미만이면 테스트 실패(배포 차단)\n",
      "note": "assert 가 거짓이면 테스트가 실패하고 CI 가 빨간불이 되어 나쁜 모델 배포를 막는다."
    }
  ],
  "agent-1": [
    {
      "title": "@tool 로 함수를 도구로 등록하기",
      "lang": "python",
      "code": "from langchain_core.tools import tool  # 함수를 도구로 바꿔 주는 데코레이터\n\n@tool  # 이 한 줄이 아래 함수를 에이전트용 도구로 만든다\ndef get_weather(city: str) -> str:\n    \"\"\"도시 이름을 받아 그 도시의 날씨를 알려준다.\"\"\"  # LLM은 이 설명을 보고 언제 쓸지 정한다\n    return f\"{city}의 날씨는 맑음, 24도\"  # 실제로는 날씨 API를 부르겠지만 여기선 예시 값\n\nprint(get_weather.name)         # 결과: get_weather (도구 이름)\nprint(get_weather.description)  # 결과: 도시 이름을 받아 그 도시의 날씨를 알려준다.\nprint(get_weather.invoke({\"city\": \"서울\"}))  # 결과: 서울의 날씨는 맑음, 24도",
      "note": "함수 위에 @tool 만 붙이면 이름·설명·입력형식이 자동으로 잡혀 에이전트가 바로 쓸 수 있다."
    },
    {
      "title": "add_messages 로 메시지가 쌓이는지 확인",
      "lang": "python",
      "code": "from langgraph.graph.message import add_messages  # 메시지를 이어붙여 주는 함수\nfrom langchain_core.messages import HumanMessage, AIMessage  # 사람/AI 메시지 형식\n\nold = [HumanMessage(content=\"안녕\")]  # 기존 메모장에 있던 사람 메시지\nnew = [AIMessage(content=\"안녕하세요!\")]  # 새로 추가할 AI 메시지\n\n# add_messages는 old를 지우지 않고 new를 뒤에 붙여 하나의 리스트로 합친다\nmerged = add_messages(old, new)\nprint(len(merged))          # 결과: 2 (덮어쓰지 않고 합쳐졌다)\nprint(merged[0].content)    # 결과: 안녕\nprint(merged[1].content)    # 결과: 안녕하세요!",
      "note": "State의 messages가 매번 초기화되지 않고 대화가 누적되는 비결이 바로 이 add_messages다."
    }
  ],
  "agent-2": [
    {
      "title": "interrupt 지점에서 멈췄는지 확인하기",
      "lang": "python",
      "code": "config = {\"configurable\": {\"thread_id\": \"t1\"}}  # 대화 한 건을 구분하는 식별자\napp.invoke({\"messages\": [(\"user\", \"보고서 작성\")], \"next\": \"\"}, config)  # 실행하면 writer 전에 멈춤\n\nstate = app.get_state(config)  # 멈춘 순간의 현재 상태를 꺼낸다\nprint(state.next)  # 결과: ('writer',)  -> 다음에 실행될 노드가 writer 임을 보여줌\n# next가 비어 있지 않다는 것은 '아직 안 끝나고 사람을 기다리는 중'이라는 신호다\nprint(\"승인 대기 중\" if state.next else \"이미 종료됨\")  # 결과: 승인 대기 중",
      "note": "get_state로 멈춘 위치를 확인할 수 있어, 사람이 무엇을 승인하는지 보고 결정할 수 있다."
    },
    {
      "title": "감독의 라우팅 분기 함수만 따로 테스트",
      "lang": "python",
      "code": "from langgraph.graph import END  # 종료 표시\n\ndef route(state):\n    if state[\"next\"] == \"FINISH\":  # 감독이 끝내라고 정했으면\n        return END                  # 종료로 보냄\n    return state[\"next\"]            # 아니면 작업자 이름 그대로 반환\n\nprint(route({\"next\": \"researcher\"}))  # 결과: researcher\nprint(route({\"next\": \"writer\"}))      # 결과: writer\nprint(route({\"next\": \"FINISH\"}) == END)  # 결과: True (종료로 연결됨)",
      "note": "분기 로직을 그래프와 떼어 따로 검증하면, 라우팅 버그를 빠르게 잡을 수 있다."
    }
  ],
  "vectordb-1": [
    {
      "title": "코사인 유사도를 손으로 계산해 보기",
      "lang": "python",
      "code": "import numpy as np  # 벡터 계산용 라이브러리\n\n# 세 개의 짧은 벡터를 직접 정의한다 (실제 임베딩 대신 이해용 예시)\na = np.array([1.0, 0.0, 1.0])  # 기준 문장 벡터\nb = np.array([0.9, 0.1, 1.0])  # a와 방향이 비슷한 벡터\nc = np.array([0.0, 1.0, 0.0])  # a와 방향이 다른 벡터\n\n# 코사인 유사도 = 내적 / (각 벡터 길이의 곱)\ndef cosine(x, y):\n    return np.dot(x, y) / (np.linalg.norm(x) * np.linalg.norm(y))\n\nprint(round(cosine(a, b), 3))  # 결과: 0.995  (매우 비슷)\nprint(round(cosine(a, c), 3))  # 결과: 0.0    (관련 없음)",
      "note": "값이 1에 가까울수록 비슷하고 0에 가까울수록 무관하다는 직관을 숫자로 확인한다."
    },
    {
      "title": "문장 2개의 의미 유사도 비교",
      "lang": "python",
      "code": "from sentence_transformers import SentenceTransformer, util  # 모델과 유사도 도구\n\nmodel = SentenceTransformer(\"all-MiniLM-L6-v2\")  # 임베딩 모델 로드\n\n# 글자는 다르지만 뜻이 비슷한 문장 / 전혀 다른 문장을 준비\ns1 = \"강아지를 산책시켰다\"\ns2 = \"반려견과 함께 걸었다\"   # s1과 의미가 비슷\ns3 = \"환율이 크게 올랐다\"     # s1과 무관\n\nv = model.encode([s1, s2, s3])  # 세 문장을 한 번에 벡터로 변환\n\n# cos_sim: 두 벡터의 코사인 유사도를 계산해 준다\nprint(round(util.cos_sim(v[0], v[1]).item(), 3))  # 결과: 0.7 안팎 (비슷)\nprint(round(util.cos_sim(v[0], v[2]).item(), 3))  # 결과: 0.1 안팎 (무관)",
      "note": "단어가 달라도 의미가 가까우면 점수가 높게 나오는 것이 시맨틱 검색의 핵심이다."
    }
  ],
  "capstone-1": [
    {
      "title": "우리 서비스 기능을 Tool·Resource·Prompt로 분류하기",
      "lang": "python",
      "code": "# MCP 서버에 무엇을 넣을지, 기능을 3종류로 나눠 적어둔다\ncatalog = {\n    'Tool': ['문서 검색(search_docs)', '매출 조회(get_sales)'],      # 실행·부작용 있는 기능\n    'Resource': ['팀 설정(config://team)', '규정 원문(doc://policy)'],  # 읽기 전용 자료\n    'Prompt': ['요약 요청 템플릿', '분류 요청 템플릿'],                 # 재사용 지시 템플릿\n}\n\nfor kind, items in catalog.items():  # 종류별로 꺼내\n    print(f'[{kind}] ' + ', '.join(items))  # 결과: 3줄로 분류표가 출력됨\n",
      "note": "부작용(쓰기·과금·외부호출)이 있으면 Tool, 단순 조회면 Resource로 나누는 것이 기준입니다."
    },
    {
      "title": "MCP 라이브러리가 잘 깔렸는지 점검",
      "lang": "python",
      "code": "import mcp  # MCP 파이썬 SDK\nfrom mcp.server.fastmcp import FastMCP  # 서버 헬퍼가 import 되는지 확인\n\nprint('mcp import 성공!')  # 결과: 이 줄이 보이면 설치 정상\nprint('FastMCP 준비 완료:', FastMCP.__name__)  # 결과: FastMCP 준비 완료: FastMCP\n",
      "note": "import 에러가 나면 'pip install \"mcp[cli]\"' 를 다시 실행하거나 가상환경이 켜졌는지 확인하세요."
    }
  ],
  "capstone-2": [
    {
      "title": "토큰이 하나씩 흘러나오는 걸 눈으로 보기",
      "lang": "python",
      "code": "from langchain_anthropic import ChatAnthropic  # Claude 연결\n\nllm = ChatAnthropic(model='claude-sonnet-4-5')\n\n# stream 은 답을 한꺼번에가 아니라 조각(청크)으로 나눠 준다\nfor chunk in llm.stream('가을에 대한 짧은 시를 써줘'):  # 조각을 하나씩 꺼내\n    print(chunk.content, end='', flush=True)  # end='' 로 줄바꿈 없이 이어붙여 출력\n# 결과: 글자가 타이핑되듯 조금씩 화면에 나타남\n",
      "note": "이 '조각을 흘려보내는' 동작이 스트리밍의 핵심이며, 서버는 이 조각을 SSE로 클라이언트에 전달합니다."
    },
    {
      "title": "SSE 전송 형식 만들어 보기",
      "lang": "python",
      "code": "# SSE는 각 조각을 'data: 내용' 뒤에 빈 줄을 붙여 보낸다\ndef to_sse(text):  # 한 조각을 SSE 한 덩어리로 감싸는 함수\n    return f'data: {text}\\n\\n'  # 끝의 빈 줄(\\n\\n)이 '한 이벤트 끝' 표시\n\nfor piece in ['안', '녕', '하세요']:  # 조각들을 하나씩\n    print(repr(to_sse(piece)))  # 결과: \"data: 안\\n\\n\" 처럼 SSE 형식 확인\n",
      "note": "FastAPI StreamingResponse가 이 형식을 그대로 흘려보내면 브라우저·클라이언트가 SSE로 받아들입니다."
    }
  ],
  "capstone-3": [
    {
      "title": "실패하면 자동으로 다시 시도하기(재시도)",
      "lang": "python",
      "code": "from tenacity import retry, wait_exponential, stop_after_attempt  # 재시도 도구\n\ncount = {'n': 0}  # 몇 번 시도했는지 세는 상자\n\n@retry(wait=wait_exponential(multiplier=1, max=8), stop=stop_after_attempt(3))\ndef flaky():  # 두 번 실패하고 세 번째에 성공하는 함수(흉내)\n    count['n'] += 1\n    print(f\"{count['n']}번째 시도\")  # 결과: 1번째..2번째..3번째 시도 출력\n    if count['n'] < 3:\n        raise ValueError('일시적 오류')  # 실패를 흉내\n    return '성공!'\n\nprint(flaky())  # 결과: 3번째에서 '성공!' 출력\n",
      "note": "wait_exponential 은 1→2→4초로 점점 더 기다렸다 재시도해 서버 부담을 줄입니다."
    },
    {
      "title": "무한 대기 막기(타임아웃)",
      "lang": "python",
      "code": "import asyncio  # 비동기·타임아웃 도구\n\nasync def slow():  # 5초나 걸리는 느린 작업 흉내\n    await asyncio.sleep(5)\n    return '완료'\n\nasync def main():\n    try:\n        result = await asyncio.wait_for(slow(), timeout=2)  # 2초 안에 안 끝나면 끊음\n        print(result)\n    except asyncio.TimeoutError:  # 시간 초과 시\n        print('시간 초과! 대체 응답을 보냅니다.')  # 결과: 이 줄이 출력됨\n\nasyncio.run(main())\n",
      "note": "타임아웃이 없으면 느린 API 하나가 서비스 전체를 멈추게 할 수 있습니다."
    }
  ],
  "miniproject-1": [
    {
      "title": "리스트로 역할 분담표 만들고 출력하기",
      "lang": "python",
      "code": "# 팀원 이름과 맡은 역할을 짝지어 딕셔너리 리스트로 만든다\nroles = [\n    {\"name\": \"민수\", \"part\": \"RAG 검색\"},   # 한 사람당 한 칸\n    {\"name\": \"지영\", \"part\": \"LLM 응답\"},\n    {\"name\": \"현우\", \"part\": \"화면(UI)\"},\n]\n\n# 리스트를 하나씩 돌면서 보기 좋게 출력한다\nfor r in roles:                     # r 에는 딕셔너리 하나가 차례로 들어온다\n    print(f\"{r['name']} → {r['part']} 담당\")  # f-string 으로 값 끼워 넣기\n# 결과:\n# 민수 → RAG 검색 담당\n# 지영 → LLM 응답 담당\n# 현우 → 화면(UI) 담당",
      "note": "기획 단계의 역할 분담도 코드로 정리해 두면 팀 모두가 같은 그림을 본다."
    },
    {
      "title": "MVP 기능 우선순위 정렬하기",
      "lang": "python",
      "code": "# (기능 이름, 중요도) 튜플 리스트. 중요도는 숫자가 클수록 먼저 만든다\nfeatures = [(\"문서 검색\", 5), (\"예쁜 화면\", 2), (\"질문 답변\", 5), (\"로그인\", 1)]\n\n# sorted 로 중요도(두 번째 값) 기준 내림차순 정렬한다\n# key=lambda x: x[1] 은 '튜플의 1번 칸(중요도)으로 비교하라'는 뜻\nordered = sorted(features, key=lambda x: x[1], reverse=True)\n\n# 우선순위 순서대로 번호를 붙여 출력한다\nfor i, (name, score) in enumerate(ordered, start=1):  # enumerate: 번호 자동 부여\n    print(f\"{i}순위: {name} (중요도 {score})\")\n# 결과:\n# 1순위: 문서 검색 (중요도 5)\n# 2순위: 질문 답변 (중요도 5)\n# 3순위: 예쁜 화면 (중요도 2)\n# 4순위: 로그인 (중요도 1)",
      "note": "무엇부터 만들지 숫자로 정렬해 두면 시간이 부족할 때 무엇을 포기할지 바로 알 수 있다."
    }
  ],
  "miniproject-2": [
    {
      "title": "코사인 유사도 직접 계산해 보기",
      "lang": "python",
      "code": "import numpy as np  # 벡터 계산용\n\n# 의미를 흉내 낸 작은 벡터 3개(실제론 수백 차원이지만 원리는 같다)\nq = np.array([1.0, 0.0])      # 질문 벡터\na = np.array([0.9, 0.1])      # 비슷한 문서\nb = np.array([0.0, 1.0])      # 다른 문서\n\n# 코사인 유사도 함수: 내적을 두 크기의 곱으로 나눈다\ndef cos(x, y):\n    return np.dot(x, y) / (np.linalg.norm(x) * np.linalg.norm(y))\n\nprint(\"질문 vs a:\", round(cos(q, a), 2))  # 결과: 질문 vs a: 0.99 (매우 비슷)\nprint(\"질문 vs b:\", round(cos(q, b), 2))  # 결과: 질문 vs b: 0.0 (전혀 다름)",
      "note": "유사도가 1에 가까울수록 의미가 가깝다는 것을 숫자로 직접 확인할 수 있다."
    },
    {
      "title": "if 분기로 만드는 아주 작은 에이전트(계산 도구)",
      "lang": "python",
      "code": "# 계산을 대신 해주는 도구 함수(LLM의 약점인 정확한 산수를 보완)\ndef calculator(expr):\n    return eval(expr)  # 문자열 수식을 실제로 계산(연습용, 실무에선 안전검사 필요)\n\n# 질문을 보고 도구를 쓸지 LLM에 맡길지 정하는 미니 에이전트\ndef mini_agent(question):\n    if \"계산\" in question:                 # 질문에 '계산'이 들어 있으면\n        nums = question.replace(\"계산\", \"\")  # '계산' 글자를 빼고 수식만 남김\n        return f\"계산기 결과: {calculator(nums)}\"  # 도구 호출\n    return \"이 질문은 LLM이 답할게요.\"        # 아니면 LLM에게 넘긴다는 안내\n\nprint(mini_agent(\"계산 12*3\"))   # 결과: 계산기 결과: 36\nprint(mini_agent(\"오늘 날씨는?\"))  # 결과: 이 질문은 LLM이 답할게요.",
      "note": "거창한 프레임워크 없이도 '도구를 골라 쓰는' 에이전트의 핵심 아이디어를 if 한 줄로 체험할 수 있다."
    }
  ],
  "miniproject-3": [
    {
      "title": "assert로 직접 만드는 미니 테스트",
      "lang": "python",
      "code": "# 검사할 대상 함수: 숫자 두 개를 더한다\ndef add(a, b):\n    return a + b\n\n# assert: 뒤 조건이 참이면 조용히 통과, 거짓이면 오류를 내며 멈춘다\nassert add(2, 3) == 5     # 2+3 은 5 가 맞는지 확인(통과)\nassert add(-1, 1) == 0    # 음수 경우도 확인(통과)\n\nprint(\"add 함수 테스트 통과\")  # 결과: add 함수 테스트 통과",
      "note": "assert 한 줄이면 '기대값과 같은지' 자동 검사가 되어, 테스트의 기본 원리를 바로 이해할 수 있다."
    },
    {
      "title": "회고 항목을 표로 정리해 출력하기",
      "lang": "python",
      "code": "# KPT 회고: Keep(유지)·Problem(문제)·Try(시도) 세 칸으로 정리한다\nretro = {\n    \"Keep\": \"매일 커밋해 진행상황을 공유한 점\",  # 잘된 것\n    \"Problem\": \"청킹 크기를 너무 크게 잡아 검색이 부정확했던 점\",  # 아쉬운 것\n    \"Try\": \"다음엔 chunk 크기를 200으로 줄여 실험해 보기\",  # 다음 행동\n}\n\n# 딕셔너리를 키-값 쌍으로 돌며 보기 좋게 출력한다\nfor key, value in retro.items():   # items() 는 (키, 값) 쌍을 차례로 준다\n    print(f\"[{key}] {value}\")\n# 결과:\n# [Keep] 매일 커밋해 진행상황을 공유한 점\n# [Problem] 청킹 크기를 너무 크게 잡아 검색이 부정확했던 점\n# [Try] 다음엔 chunk 크기를 200으로 줄여 실험해 보기",
      "note": "KPT(Keep·Problem·Try) 틀로 적으면 막연한 소감이 아니라 다음에 할 구체적 행동이 남는다."
    }
  ]
}

import { examplesExtra } from './lectureexamples2'

export const examplesFor = (subjectId, day) => {
  const key = `${subjectId}-${day}`
  return [...(examples[key] || []), ...(examplesExtra[key] || [])]
}
