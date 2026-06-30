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
      "title": "토큰화: 문장을 토큰으로 쪼개기",
      "lang": "python",
      "code": "from transformers import AutoTokenizer            # 허깅페이스의 토크나이저 불러오기\n\ntok = AutoTokenizer.from_pretrained(\"bert-base-uncased\")  # BERT용 토크나이저 다운로드\ntext = \"Transformers are amazing!\"                # 쪼갤 예시 문장\n\ntokens = tok.tokenize(text)                       # 문장을 토큰(단어 조각) 리스트로 변환\nids = tok.convert_tokens_to_ids(tokens)           # 각 토큰을 숫자 ID로 변환\n\nprint(tokens)   # 결과: ['transformers', 'are', 'amazing', '!']\nprint(ids)      # 결과: 각 토큰에 대응하는 정수 ID 리스트",
      "note": "글자가 아니라 '토큰' 단위로 잘리고, 각 토큰이 고유 숫자 ID로 바뀌는 것을 눈으로 확인하는 예제다."
    },
    {
      "title": "Softmax로 점수를 확률(집중 비율)로 바꾸기",
      "lang": "python",
      "code": "import torch                                  # 텐서 계산 도구\n\nscores = torch.tensor([2.0, 1.0, 0.1])        # 단어 3개에 대한 관련도 점수(예시)\nweights = torch.softmax(scores, dim=0)        # 합이 1인 확률로 변환\n\nprint(weights.round(decimals=2))  # 결과: tensor([0.66, 0.24, 0.10]) 처럼 합=1\nprint(weights.sum())              # 결과: tensor(1.0000)",
      "note": "점수가 클수록 더 큰 비율을 갖고, 전체 합은 항상 1이 된다는 Attention의 핵심을 보여준다."
    }
  ],
  "transformer-2": [
    {
      "title": "Positional Encoding 값 만들어 보기",
      "lang": "python",
      "code": "import torch                                  # 텐서 계산 도구\nimport math                                   # sin/cos 함수 사용\n\npos, d_model = 4, 6                            # 자리 4개, 임베딩 차원 6\npe = torch.zeros(pos, d_model)                # 위치표를 담을 빈 표(4x6)\n\nfor p in range(pos):                          # 각 자리(0~3)마다\n    for i in range(0, d_model, 2):            # 짝수 차원마다 sin, 홀수엔 cos\n        denom = 10000 ** (i / d_model)        # 차원이 클수록 천천히 변하는 주기\n        pe[p, i] = math.sin(p / denom)        # 짝수 위치: sin 값\n        pe[p, i + 1] = math.cos(p / denom)    # 홀수 위치: cos 값\n\nprint(pe.round(decimals=2))   # 결과: 자리마다 다른 6개 숫자(위치 지문)가 찍힌 4x6 표",
      "note": "자리마다 sin·cos로 서로 다른 '위치 지문'이 만들어져, 모델이 단어 순서를 구분할 수 있게 된다."
    },
    {
      "title": "GPT 계열 모델로 다음 문장 생성해 보기",
      "lang": "python",
      "code": "from transformers import pipeline             # 복잡한 과정을 한 줄로 묶어주는 도구\n\ngen = pipeline(\"text-generation\", model=\"distilgpt2\")  # 가벼운 GPT 모델 준비\n\nresult = gen(\"Artificial intelligence will\",   # 시작 문장(프롬프트)\n             max_new_tokens=20)                 # 새로 생성할 토큰 수 제한\n\nprint(result[0][\"generated_text\"])  # 결과: 시작 문장에 이어 자연스러운 영어 문장이 생성됨",
      "note": "GPT(Decoder-only)는 앞 문장을 보고 다음 단어를 이어 쓰며 글을 생성한다는 것을 직접 확인하는 예제다."
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
      "title": "ref로 숫자 1개 반응형으로 만들기",
      "lang": "javascript",
      "code": "// Vue에서 반응형 도구 ref를 가져온다\nimport { ref } from 'vue'\n\n// 반응형 숫자 변수 만들기(상자에 0을 담는다)\nconst age = ref(0)\n\n// 값을 바꿀 때는 .value 로 접근한다\nage.value = 25\n\n// 현재 값 확인(콘솔 출력)\nconsole.log(age.value) // 결과: 25",
      "note": "ref는 값을 '상자'에 넣는 것이라 JS 코드에서는 .value로 꺼내고 넣는다."
    },
    {
      "title": "reactive로 객체 묶음 반응형으로 만들기",
      "lang": "javascript",
      "code": "// 객체용 반응형 도구 reactive를 가져온다\nimport { reactive } from 'vue'\n\n// 여러 값을 한 묶음(객체)으로 반응형 만들기\nconst user = reactive({ name: '홍길동', age: 20 })\n\n// reactive 객체는 .value 없이 바로 속성에 접근한다\nuser.age = 21\n\n// 변경된 값 확인\nconsole.log(user.name, user.age) // 결과: 홍길동 21",
      "note": "값 하나면 ref, 여러 값을 묶으면 reactive를 쓰면 편하다."
    }
  ],
  "vue-2": [
    {
      "title": "defineProps로 데이터 받기",
      "lang": "vue",
      "code": "<script setup>\n// 부모가 내려준 title과 count를 받는다\nconst props = defineProps(['title', 'count'])\n</script>\n\n<template>\n  <!-- 받은 props를 화면에 그대로 출력 -->\n  <h3>{{ props.title }} ({{ props.count }})</h3>\n</template>",
      "note": "props로 받은 값은 자식 화면에서 읽기 전용으로 사용한다."
    },
    {
      "title": "onMounted 라이프사이클 훅",
      "lang": "vue",
      "code": "<script setup>\n// 컴포넌트가 화면에 나타날 때 실행되는 훅을 가져온다\nimport { onMounted } from 'vue'\n\n// 컴포넌트가 화면에 붙는 순간 자동 실행된다\nonMounted(() => {\n  console.log('화면에 나타났어요!') // 결과: 콘솔에 메시지 출력\n})\n</script>",
      "note": "onMounted는 데이터 불러오기(API 호출) 시작점으로 자주 쓰인다."
    }
  ],
  "vue-3": [
    {
      "title": "router-link로 페이지 이동",
      "lang": "vue",
      "code": "<template>\n  <!-- to에 적은 주소로 이동하는 링크(새로고침 없음) -->\n  <router-link to=\"/\">홈</router-link>\n  <router-link to=\"/about\">소개</router-link>\n  <!-- 위 링크가 가리키는 화면이 여기에 그려진다 -->\n  <router-view />\n</template>",
      "note": "router-link는 a 태그처럼 보이지만 새로고침 없이 화면만 바꾼다."
    },
    {
      "title": "Pinia 스토어 값 사용하기",
      "lang": "vue",
      "code": "<script setup>\n// 전역 장바구니 스토어를 가져온다\nimport { useCartStore } from '../stores/cart'\n\n// 스토어 인스턴스 생성\nconst cart = useCartStore()\n</script>\n\n<template>\n  <!-- 전역 상태(담긴 개수)를 헤더 어디서든 표시 -->\n  <span>장바구니: {{ cart.count }}개</span>\n</template>",
      "note": "스토어 값은 화면이 달라도 항상 같은 최신 값을 보여준다."
    }
  ],
  "vue-4": [
    {
      "title": "axios로 데이터 한 번 불러오기",
      "lang": "javascript",
      "code": "// HTTP 요청 도구 axios를 가져온다\nimport axios from 'axios'\n\n// 비동기 함수: 서버에서 글 목록을 받아온다\nasync function getPosts() {\n  const res = await axios.get('https://jsonplaceholder.typicode.com/posts') // 응답 대기\n  console.log(res.data.length) // 결과: 100 (받아온 글 개수)\n}\n\n// 함수 실행\ngetPosts()",
      "note": "await는 '응답이 올 때까지 기다렸다가 다음 줄로' 라는 뜻이다."
    },
    {
      "title": "환경변수(.env) 값 읽기",
      "lang": "javascript",
      "code": "// .env 파일 예시: VITE_API_URL=https://api.example.com\n\n// Vite에서는 import.meta.env로 환경변수를 읽는다(VITE_ 로 시작해야 함)\nconst apiUrl = import.meta.env.VITE_API_URL\n\n// 읽어온 주소 확인\nconsole.log(apiUrl) // 결과: https://api.example.com",
      "note": "비밀 값이나 환경마다 다른 주소는 코드가 아니라 .env에 둔다."
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
      "title": "application.yml 기본 설정",
      "lang": "yaml",
      "code": "spring:\n  ai:\n    openai:\n      api-key: ${OPENAI_API_KEY}   # 환경변수에서 비밀키를 읽어옴(코드에 직접 X)\n      chat:\n        options:\n          model: gpt-4o-mini        # 사용할 모델 이름(가볍고 저렴한 모델로 시작)\n          temperature: 0.7          # 답변의 창의성(0=딱딱·일관, 1에 가까울수록 자유로움)",
      "note": "키는 환경변수로 분리하고 모델·온도는 설정에서 바꾼다."
    },
    {
      "title": "프롬프트에 시스템 지시 더하기",
      "lang": "java",
      "code": "String answer = chatClient.prompt()       // 대화 시작\n        .system(\"너는 친절한 한국어 비서야\")  // AI의 역할·말투를 고정하는 지시\n        .user(\"점심 메뉴 3개 추천해줘\")        // 실제 사용자 질문\n        .call()                            // 모델로 전송\n        .content();                        // 텍스트 답만 추출\nSystem.out.println(answer);                // 결과: \"1. 비빔밥 ...\" 형태의 추천 목록 출력",
      "note": "system()으로 역할을 주면 답변 톤이 일관되게 유지된다."
    }
  ],
  "spring-ai-2": [
    {
      "title": "문장을 임베딩 벡터로 변환",
      "lang": "java",
      "code": "float[] vector = embeddingModel.embed(\"강아지가 귀엽다\"); // 문장을 숫자 좌표로 변환\nSystem.out.println(vector.length); // 결과: 1536 (모델이 쓰는 차원 수만큼의 숫자 개수)",
      "note": "임베딩 결과는 의미를 담은 고정 길이 숫자 배열이다."
    },
    {
      "title": "VectorStore 유사도 검색",
      "lang": "java",
      "code": "List<Document> hits = vectorStore.similaritySearch(   // 비슷한 문서 찾기\n        SearchRequest.query(\"환불 규정\").withTopK(2));   // 가장 가까운 2개\nhits.forEach(d -> System.out.println(d.getContent())); // 결과: 환불 관련 문단 2개 출력",
      "note": "키워드가 정확히 같지 않아도 의미가 가까우면 검색된다."
    }
  ],
  "spring-ai-3": [
    {
      "title": "답변을 객체로 받기",
      "lang": "java",
      "code": "record Movie(String title, int year) {}            // 받고 싶은 데이터 모양\nMovie m = chatClient.prompt()\n        .user(\"기생충 영화 정보를 알려줘\")            // 질문\n        .call()\n        .entity(Movie.class);                       // 문장이 아닌 Movie 객체로 변환\nSystem.out.println(m.title() + \"/\" + m.year());     // 결과: 기생충/2019",
      "note": "entity()를 쓰면 문자열 파싱 없이 바로 객체 필드를 쓴다."
    },
    {
      "title": "스트리밍으로 답 받기",
      "lang": "java",
      "code": "chatClient.prompt()\n        .user(\"스프링을 3문장으로 설명해줘\")          // 질문\n        .stream()                                   // 한 번에 안 받고 조각으로 받음\n        .content()                                  // 글자 조각들의 흐름(Flux)\n        .subscribe(chunk -> System.out.print(chunk)); // 도착하는 대로 즉시 출력",
      "note": "stream()은 긴 답을 타자치듯 실시간으로 보여줄 때 쓴다."
    }
  ],
  "sllm-1": [
    {
      "title": "Transformers로 소형 모델 불러와 한 문장 생성하기",
      "lang": "python",
      "code": "# Hugging Face Transformers로 sLLM을 직접 불러와 추론하는 가장 단순한 예제\nfrom transformers import pipeline             # 모델 로드+추론을 한 줄로 묶어 주는 도우미\n\npipe = pipeline(                             # 텍스트 생성 파이프라인을 생성\n    task=\"text-generation\",                 # 할 일: 다음 단어를 이어 쓰는 '텍스트 생성'\n    model=\"Qwen/Qwen2.5-0.5B-Instruct\",     # 사용할 0.5B 소형 모델 이름\n)\nprompt = \"인공지능을 한 문장으로 설명하면\"      # 모델에게 줄 시작 문장(프롬프트)\nout = pipe(prompt, max_new_tokens=40)        # 최대 40개 토큰까지 새로 생성하도록 호출\nprint(out[0][\"generated_text\"])             # 결과: 프롬프트 뒤에 모델이 이어 쓴 문장이 출력됨\n",
      "note": "max_new_tokens 값을 키우면 더 긴 답이 나온다."
    },
    {
      "title": "양자화로 메모리를 줄여 모델 올리기",
      "lang": "python",
      "code": "# 4비트 양자화로 모델을 가볍게 메모리에 올리는 예제(GPU 환경 기준)\nimport torch                                 # 딥러닝 텐서 연산 라이브러리\nfrom transformers import AutoModelForCausalLM, BitsAndBytesConfig  # 모델과 양자화 설정 도구\n\nqcfg = BitsAndBytesConfig(                   # 양자화(압축) 옵션을 모아 두는 설정 객체\n    load_in_4bit=True,                       # 가중치를 4비트로 압축해 메모리를 1/4 수준으로 절감\n    bnb_4bit_compute_dtype=torch.float16,    # 실제 계산은 16비트로 해 속도와 정확도의 균형을 맞춤\n)\nmodel = AutoModelForCausalLM.from_pretrained(  # 모델을 다운로드하며 메모리에 적재\n    \"Qwen/Qwen2.5-1.5B-Instruct\",           # 적재할 모델 이름\n    quantization_config=qcfg,                # 위에서 만든 4비트 양자화 설정을 적용\n    device_map=\"auto\",                      # 사용 가능한 GPU/CPU에 자동으로 배치\n)\nprint(model.get_memory_footprint() / 1e9, \"GB\")  # 결과: 모델이 차지하는 메모리를 GB 단위로 출력\n",
      "note": "load_in_4bit=True 한 줄로 용량이 크게 줄어든다."
    }
  ],
  "sllm-2": [
    {
      "title": "instruction 데이터셋을 읽고 개수·형식 점검하기",
      "lang": "python",
      "code": "# data.jsonl이 제대로 만들어졌는지 빠르게 검증하는 예제\nfrom datasets import load_dataset                 # 데이터셋 로딩 도구\n\nds = load_dataset(\"json\", data_files=\"data.jsonl\", split=\"train\")  # 내 데이터 파일을 읽어옴\nprint(\"샘플 개수:\", len(ds))                   # 결과: 작성한 학습 예시의 총 개수가 출력됨\nprint(\"첫 샘플:\", ds[0])                        # 결과: 첫 줄의 instruction/output 한 쌍이 출력됨\n\nassert \"instruction\" in ds[0] and \"output\" in ds[0]  # 두 필드가 모두 있는지 자동 점검\nprint(\"형식 OK\")                                # 통과하면 형식이 올바르다는 뜻\n",
      "note": "학습 전에 데이터 형식을 먼저 검증하면 오류를 미리 막는다."
    },
    {
      "title": "학습한 LoRA 어댑터를 얹어 추론하기",
      "lang": "python",
      "code": "# 베이스 모델 위에 학습된 어댑터를 끼워 답변을 받아 보는 예제\nfrom transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저 로드 도구\nfrom peft import PeftModel                        # 어댑터를 모델에 결합해 주는 도구\n\nbase = AutoModelForCausalLM.from_pretrained(\"Qwen/Qwen2.5-0.5B-Instruct\")  # 원본 베이스 모델 로드\nmodel = PeftModel.from_pretrained(base, \"./lora-out\")  # 학습한 LoRA 어댑터를 베이스에 얹음\ntok = AutoTokenizer.from_pretrained(\"Qwen/Qwen2.5-0.5B-Instruct\")  # 같은 토크나이저 로드\n\nids = tok(\"### 질문:\\n환불 규정 알려줘\\n### 답변:\\n\", return_tensors=\"pt\")  # 질문을 토큰으로 변환\nout = model.generate(**ids, max_new_tokens=60)   # 최대 60토큰까지 답변을 생성\nprint(tok.decode(out[0]))                        # 결과: 학습한 도메인 말투가 반영된 답변이 출력됨\n",
      "note": "어댑터만 바꿔 끼우면 같은 베이스로 여러 도메인 모델을 만들 수 있다."
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
      "title": "가장 짧은 LangChain: 모델 하나만 직접 불러 답 받기",
      "lang": "python",
      "code": "# .env의 API 키를 불러오는 도구\nfrom dotenv import load_dotenv\n# OpenAI 채팅 모델 클래스\nfrom langchain_openai import ChatOpenAI\n\n# 환경변수(API 키) 로드\nload_dotenv()\n\n# 모델 객체 생성(가장 기본 설정)\nllm = ChatOpenAI(model=\"gpt-4o-mini\")\n\n# 모델에 질문을 직접 보내고 답(메시지 객체)을 받는다\nanswer = llm.invoke(\"LangChain을 한 문장으로 설명해줘\")\n\n# 답 객체에서 본문 텍스트만 꺼내 출력 (예상: 한 문장 설명)\nprint(answer.content)",
      "note": "체인 없이 모델만 invoke해도 동작한다.\ncontent 속성에 실제 답 텍스트가 들어 있다."
    },
    {
      "title": "프롬프트 + 모델 + 파서를 파이프로 잇는 기본 체인",
      "lang": "python",
      "code": "# 필요한 부품들을 가져오기\nfrom dotenv import load_dotenv\nfrom langchain_openai import ChatOpenAI\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import StrOutputParser\n\n# API 키 로드\nload_dotenv()\n\n# 모델 준비\nllm = ChatOpenAI(model=\"gpt-4o-mini\")\n# {topic} 빈칸이 있는 프롬프트 양식\nprompt = ChatPromptTemplate.from_template(\"{topic}에 대해 초등학생도 알게 한 문장으로 설명해줘\")\n# 프롬프트 → 모델 → 문자열 파서로 체인 조립\nchain = prompt | llm | StrOutputParser()\n\n# topic 빈칸에 '인공지능'을 넣어 실행\nprint(chain.invoke({\"topic\": \"인공지능\"}))  # 예상: 인공지능을 쉽게 설명한 한 문장",
      "note": "StrOutputParser를 붙이면 메시지 객체가 아니라 바로 쓸 수 있는 문자열이 나온다."
    }
  ],
  "langchain-2": [
    {
      "title": "대화 기억하기: 메시지 리스트로 멀티턴 만들기",
      "lang": "python",
      "code": "from dotenv import load_dotenv\nfrom langchain_openai import ChatOpenAI\n# 역할별 메시지(시스템/사람/AI) 클래스\nfrom langchain_core.messages import SystemMessage, HumanMessage, AIMessage\n\nload_dotenv()  # API 키 로드\nllm = ChatOpenAI(model=\"gpt-4o-mini\")  # 모델 준비\n\n# 지금까지의 대화 기록을 담는 리스트(=메모리 역할)\nhistory = [SystemMessage(\"너는 친절한 비서야\")]\n# 첫 질문을 기록에 추가\nhistory.append(HumanMessage(\"내 이름은 민수야\"))\n# 전체 기록을 넘겨 답을 받음\nreply = llm.invoke(history)\n# AI 답도 기록에 추가해야 다음 턴에서 기억함\nhistory.append(AIMessage(reply.content))\n# 이름을 다시 물어 기억하는지 확인\nhistory.append(HumanMessage(\"내 이름이 뭐라고 했지?\"))\n# 예상: '민수'라고 대답함\nprint(llm.invoke(history).content)",
      "note": "AI의 답까지 history에 다시 넣어야 다음 질문에서 앞 대화를 기억한다."
    },
    {
      "title": "도구(Tool) 정의하고 LLM이 호출하게 하기",
      "lang": "python",
      "code": "from dotenv import load_dotenv\nfrom langchain_openai import ChatOpenAI\n# 함수를 도구로 등록해 주는 데코레이터\nfrom langchain_core.tools import tool\n\nload_dotenv()  # API 키 로드\n\n# @tool 데코레이터로 일반 함수를 LLM이 부를 수 있는 도구로 만든다\n@tool\ndef multiply(a: int, b: int) -> int:\n    \"\"\"두 정수 a와 b를 곱한다.\"\"\"  # 설명: LLM이 언제 쓸지 판단하는 근거\n    return a * b  # 실제 계산 수행\n\n# 모델에 사용할 수 있는 도구 목록을 묶어 준다\nllm = ChatOpenAI(model=\"gpt-4o-mini\").bind_tools([multiply])\n# 곱셈이 필요한 질문을 던진다\nres = llm.invoke(\"345 곱하기 678은?\")\n# 예상: 모델이 multiply 도구를 호출하겠다는 요청을 담아 응답\nprint(res.tool_calls)",
      "note": "bind_tools로 도구를 알려 주면 LLM이 직접 계산하지 않고 multiply 호출을 제안한다."
    }
  ],
  "langchain-3": [
    {
      "title": "스트리밍: 답을 글자 단위로 받아 출력하기",
      "lang": "python",
      "code": "from dotenv import load_dotenv\nfrom langchain_openai import ChatOpenAI\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import StrOutputParser\n\nload_dotenv()  # API 키 로드\nllm = ChatOpenAI(model=\"gpt-4o-mini\")  # 모델 준비\nprompt = ChatPromptTemplate.from_template(\"{topic}에 대한 짧은 시를 써줘\")  # 프롬프트\nchain = prompt | llm | StrOutputParser()  # 체인 조립\n\n# invoke 대신 stream을 쓰면 조각(chunk)들이 순서대로 들어온다\nfor chunk in chain.stream({\"topic\": \"바다\"}):\n    # end=\"\" 로 줄바꿈 없이 이어 붙여 타이핑되는 효과\n    print(chunk, end=\"\", flush=True)  # 예상: 시가 한 글자씩 흘러나옴",
      "note": "stream은 chunk를 하나씩 돌려준다.\nflush=True로 즉시 화면에 반영한다."
    },
    {
      "title": "폴백(fallback): 주 모델 실패 시 보조 모델로 자동 전환",
      "lang": "python",
      "code": "from dotenv import load_dotenv\nfrom langchain_openai import ChatOpenAI\n\nload_dotenv()  # API 키 로드\n\n# 보조(백업) 모델: 주 모델이 실패하면 대신 답한다\nbackup = ChatOpenAI(model=\"gpt-4o-mini\")\n# 주 모델에 with_fallbacks로 백업을 연결\nprimary = ChatOpenAI(model=\"gpt-4o\").with_fallbacks([backup])\n\n# 주 모델이 정상이면 주 모델이, 실패하면 backup이 응답\nres = primary.invoke(\"한 문장 명언 하나 알려줘\")\n# 예상: 어느 한 모델이 만든 명언 출력\nprint(res.content)",
      "note": "with_fallbacks로 백업 모델을 걸어 두면 한쪽이 죽어도 서비스가 멈추지 않는다."
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
      "title": "사용자 시나리오를 코드로 정리해두기",
      "lang": "python",
      "code": "# 우리가 만들 에이전트가 처리할 장면을 리스트(목록)로 적어둔다\nscenarios = [  # 대괄호 [] 는 여러 항목을 담는 목록을 뜻함\n    {'상황': '규정이 궁금한 신입사원', '질문': '연차는 며칠인가요?', '기대행동': '규정 문서 검색 후 출처와 함께 답변'},\n    {'상황': '보고서를 쓰는 직원', '질문': '작년 매출 요약해줘', '기대행동': '데이터 조회 도구 호출 후 요약'},\n    {'상황': '외부 정보가 필요한 직원', '질문': '오늘 환율 알려줘', '기대행동': '환율 API 도구 호출'},\n]\n\nfor s in scenarios:  # 목록의 항목을 하나씩 꺼내 s 에 담아 반복\n    print(f\"[{s['상황']}] {s['질문']} -> {s['기대행동']}\")  # 결과: 시나리오 3줄이 보기 좋게 출력됨\n",
      "note": "기획을 머릿속이 아니라 코드/데이터로 적어두면 구현할 때 '무엇을 만들지' 흔들리지 않습니다."
    },
    {
      "title": "필요한 라이브러리가 잘 깔렸는지 한 번에 점검",
      "lang": "python",
      "code": "# 설치가 끝났는지 import 로 확인한다. 에러가 안 나면 정상 설치된 것\nimport langgraph  # 에이전트의 흐름(그래프)을 만드는 핵심 라이브러리\nimport langchain  # LLM 앱을 조립하는 도구 모음\nimport langchain_anthropic  # Claude 연결용 패키지\n\nprint('langgraph 버전:', langgraph.__version__)  # 결과: 예) 0.2.x 같은 버전 숫자 출력\nprint('모든 라이브러리 import 성공!')  # 결과: 이 줄이 보이면 환경 준비 완료\n",
      "note": "import 에서 빨간 에러가 나면 pip install 을 다시 하거나 가상환경이 켜져 있는지 확인하세요."
    }
  ],
  "capstone-2": [
    {
      "title": "나만의 도구 함수 만들어 보기",
      "lang": "python",
      "code": "from langchain_core.tools import tool  # 함수를 도구로 만드는 스티커 불러오기\n\n@tool  # 아래 함수를 에이전트 도구로 등록\ndef add(a: int, b: int) -> int:  # 두 정수를 받아 더하는 도구\n    \"\"\"두 숫자를 더한 값을 반환한다.\"\"\"  # 모델이 보고 용도를 이해하는 설명\n    return a + b  # 덧셈 결과 반환\n\nprint(add.name)  # 결과: add (도구 이름)\nprint(add.invoke({'a': 3, 'b': 5}))  # 결과: 8 (도구를 직접 실행해 본 값)\n",
      "note": "도구의 설명문(\"\"\"...\"\"\")이 곧 모델에게 주는 사용설명서이므로, 짧고 명확하게 적는 것이 중요합니다."
    },
    {
      "title": "그래프가 어떻게 생겼는지 그림으로 확인하기",
      "lang": "python",
      "code": "# agent.py 에서 만든 app(컴파일된 그래프)을 가져와 구조를 텍스트로 출력\nfrom agent import app  # 같은 폴더의 agent.py 에서 완성된 그래프를 불러옴\n\n# get_graph() 는 그래프 구조를, draw_ascii() 는 그것을 글자 그림으로 보여줌\nprint(app.get_graph().draw_ascii())  # 결과: START→agent→(분기)→tools/END 형태의 글자 도식 출력\n",
      "note": "내가 만든 에이전트의 흐름이 머릿속 설계와 같은지 눈으로 확인하는 좋은 습관입니다."
    }
  ],
  "capstone-3": [
    {
      "title": "응답 시간(성능) 측정해 보기",
      "lang": "python",
      "code": "import time  # 시간을 재는 표준 라이브러리\nfrom agent import app  # 완성된 에이전트 그래프 불러오기\n\nstart = time.time()  # 측정 시작 시각 기록(현재 시간을 초로 저장)\nresult = app.invoke({'messages': [('user', '1달러 환율 알려줘')]})  # 에이전트 한 번 실행\nelapsed = time.time() - start  # 끝난 시각에서 시작 시각을 빼 걸린 시간 계산\n\nprint('답변:', result['messages'][-1].content)  # 결과: 환율 답변 문장 출력\nprint(f'걸린 시간: {elapsed:.2f}초')  # 결과: 예) 걸린 시간: 1.83초\n",
      "note": "발표용 '성능 표'에 넣을 응답 시간을 이렇게 직접 재서 근거 있는 숫자로 제시하세요."
    },
    {
      "title": "빈 입력 같은 예외 상황 막아 두기",
      "lang": "python",
      "code": "def safe_ask(question):  # 안전하게 질문을 처리하는 함수\n    if not question or question.strip() == '':  # 입력이 없거나 공백뿐이면\n        return '질문을 입력해 주세요.'  # 모델을 부르지 않고 바로 안내\n    return f'정상 질문 처리: {question}'  # 정상이면 처리 진행(여기선 예시 문구)\n\nprint(safe_ask(''))  # 결과: 질문을 입력해 주세요.\nprint(safe_ask('환율 알려줘'))  # 결과: 정상 질문 처리: 환율 알려줘\n",
      "note": "엉뚱한 입력을 미리 걸러 두면 데모 도중 갑작스러운 에러를 크게 줄일 수 있습니다."
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
