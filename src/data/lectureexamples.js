// 강의안 날짜별 "실습 예제" — subjectId-day 키. { title, lang, code, note }

export const examples = {
  "git-1": [
    {
      "title": "변경 내용을 커밋 전에 미리 확인하기",
      "lang": "bash",
      "code": "# 파일을 수정한 뒤\necho \"새 줄 추가\" >> README.md\n\n# 무엇이 바뀌었는지 보기 (+ 는 추가, - 는 삭제)\ngit diff\n\n# 상태도 함께 확인\ngit status",
      "note": "git diff로 커밋 전에 내가 정확히 무엇을 바꿨는지 항상 확인하는 습관이 실수를 줄인다."
    },
    {
      "title": ".gitignore로 올리면 안 되는 파일 제외하기",
      "lang": "bash",
      "code": "# .gitignore 파일을 만들고 무시할 패턴을 적는다\necho \"node_modules/\" > .gitignore   # 라이브러리 폴더 제외\necho \".env\" >> .gitignore           # 비밀키 파일 제외\necho \"*.log\" >> .gitignore          # 모든 로그 파일 제외\n\ngit add .gitignore\ngit commit -m \"chore: gitignore 추가\"",
      "note": "비밀번호·용량 큰 폴더는 .gitignore에 넣어 GitHub에 올라가지 않게 막는다."
    },
    {
      "title": "방금 한 커밋을 되돌리기",
      "lang": "bash",
      "code": "# 커밋은 유지하고 직전 커밋 메시지만 고치고 싶을 때\ngit commit --amend -m \"고친 메시지\"\n\n# 마지막 커밋을 취소하되 작업 내용은 남기고 싶을 때\ngit reset --soft HEAD~1   # 변경은 스테이징에 그대로 남음",
      "note": "reset --soft는 커밋만 취소하고 파일 변경은 보존하므로 가장 안전하게 되돌리는 방법이다."
    }
  ],
  "transformer-1": [
    {
      "title": "softmax로 점수를 확률로 바꾸기",
      "lang": "python",
      "code": "import numpy as np\nscores = np.array([2.0, 1.0, 0.1])  # 세 단어의 관련도 점수\ne = np.exp(scores - scores.max())   # 안정적으로 지수화\nprob = e / e.sum()\nprint(np.round(prob, 3))  # 합이 1인 확률\nprint(\"합:\", prob.sum())",
      "note": "점수가 클수록 확률이 커지지만 전부 더하면 항상 1이 된다."
    },
    {
      "title": "Hugging Face 토크나이저로 토큰화 보기",
      "lang": "python",
      "code": "# pip install transformers 필요\nfrom transformers import AutoTokenizer\ntok = AutoTokenizer.from_pretrained(\"bert-base-uncased\")\ntext = \"unbelievable transformers\"\nids = tok(text)[\"input_ids\"]\nprint(\"토큰 조각:\", tok.tokenize(text))  # 단어가 조각으로 쪼개짐\nprint(\"토큰 ID:\", ids)",
      "note": "'unbelievable'처럼 긴 단어가 여러 조각으로 나뉘는 BPE 방식을 눈으로 확인할 수 있다."
    }
  ],
  "transformer-2": [
    {
      "title": "BERT로 빈칸 채우기(fill-mask)",
      "lang": "python",
      "code": "from transformers import pipeline\nfill = pipeline(\"fill-mask\", model=\"bert-base-uncased\")\nfor r in fill(\"Paris is the [MASK] of France.\")[:3]:\n    print(r[\"token_str\"], round(r[\"score\"], 3))",
      "note": "Encoder 모델 BERT는 양쪽 문맥을 보고 빈칸에 들어갈 단어 후보를 확률과 함께 내놓는다."
    },
    {
      "title": "코사인 유사도로 두 문장 비교",
      "lang": "python",
      "code": "import torch\nimport torch.nn.functional as F\na = torch.tensor([[1.0, 0.5, 0.2]])\nb = torch.tensor([[0.9, 0.4, 0.3]])\nc = torch.tensor([[-0.8, 0.1, 0.9]])\nprint(\"a-b 유사도:\", round(F.cosine_similarity(a, b).item(), 3))\nprint(\"a-c 유사도:\", round(F.cosine_similarity(a, c).item(), 3))",
      "note": "방향이 비슷한 벡터일수록 1에 가깝고, 다를수록 0이나 음수에 가까워진다."
    }
  ],
  "python-1": [
    {
      "title": "변수와 f-string 출력",
      "lang": "python",
      "code": "name = '김철수'\nage = 25\n# f-string: 중괄호 안에 변수를 넣으면 값이 끌어온다\nprint(f'{name}님은 {age}세입니다.')",
      "note": "f-string은 문자열 안에 변수 값을 끼워 넣는 가장 편한 방법입니다."
    },
    {
      "title": "리스트 컴프리헨션",
      "lang": "python",
      "code": "nums = [1, 2, 3, 4, 5]\n# 각 숫자를 제곱해 새 리스트로 만든다\nsquares = [n * n for n in nums]\nprint(squares)  # [1, 4, 9, 16, 25]",
      "note": "반복문 한 줄로 새 리스트를 만드는 Python다운 표현법입니다."
    },
    {
      "title": "NumPy 벡터 연산",
      "lang": "python",
      "code": "import numpy as np\nprices = np.array([1200, 0, 3000])\nqty = np.array([3, 2, 2])\n# 반복문 없이 배열 전체를 한 번에 곱한다\nprint(prices * qty)  # [3600    0 6000]",
      "note": "NumPy는 배열끼리 한 번에 계산해 속도가 빠르고 코드가 짧아집니다."
    }
  ],
  "python-2": [
    {
      "title": "DataFrame 만들고 살펴보기",
      "lang": "python",
      "code": "import pandas as pd\ndf = pd.DataFrame({\n    '이름': ['강', '이', '박'],\n    '점수': [90, 75, 88],\n})\nprint(df.head())  # 앞에서 5줄 미리보기",
      "note": "딕셔너리를 넣으면 바로 표 형태의 DataFrame이 만들어집니다."
    },
    {
      "title": "조건 필터링",
      "lang": "python",
      "code": "import pandas as pd\ndf = pd.DataFrame({'이름': ['강', '이'], '점수': [90, 60]})\n# 점수 80점 이상인 행만 골라낸다\nprint(df[df['점수'] >= 80])",
      "note": "대괄호 안에 조건을 넣어 원하는 행만 추려낼 수 있습니다."
    },
    {
      "title": "groupby 집계",
      "lang": "python",
      "code": "import pandas as pd\ndf = pd.DataFrame({\n    '팀': ['A', 'B', 'A'],\n    '매출': [100, 200, 150],\n})\n# 팀별로 매출 합계를 구한다\nprint(df.groupby('팀')['매출'].sum())",
      "note": "groupby로 같은 팀끼리 묶어 합계를 한 번에 계산합니다."
    }
  ],
  "prompt-1": [
    {
      "title": "역할만 바꿔도 답투가 달라진다",
      "lang": "python",
      "code": "from openai import OpenAI\nclient = OpenAI()\n\nfor role in [\"친절한 유치원 선생님\", \"엄격한 대학교수\"]:\n    msg = [\n        {\"role\": \"system\", \"content\": f\"너는 {role}다.\"},\n        {\"role\": \"user\", \"content\": \"중력이 뭐야?\"},\n    ]\n    r = client.chat.completions.create(model=\"gpt-4o-mini\", messages=msg)\n    print(f\"[{role}]\", r.choices[0].message.content[:80])  # 앞 80자만",
      "note": "system의 역할 한 줄만 바꿔도 설명 난이도와 말투가 달라진다 — 역할 지정의 힘을 보여 준다."
    },
    {
      "title": "Few-shot: 예시 2개로 형식 고정하기",
      "lang": "python",
      "code": "from openai import OpenAI\nclient = OpenAI()\n\nprompt = \"\"\"감정을 한 단어로 분류해줘.\n입력: 오늘 합격했어! -> 기쁨\n입력: 지갑을 잃어버렸다 -> 슬픔\n입력: 길이 막혀 지각했다 ->\"\"\"\n\nr = client.chat.completions.create(\n    model=\"gpt-4o-mini\",\n    messages=[{\"role\": \"user\", \"content\": prompt}],\n)\nprint(r.choices[0].message.content)  # 예시처럼 한 단어로 답함",
      "note": "원하는 답 형식의 예시를 몇 개 보여 주면(Few-shot) 설명 없이도 같은 형식으로 답한다."
    },
    {
      "title": "토큰 개수 세어 비용 가늠하기",
      "lang": "python",
      "code": "# pip install tiktoken\nimport tiktoken\n\nenc = tiktoken.encoding_for_model(\"gpt-4o-mini\")\ntext = \"안녕하세요, 프롬프트 엔지니어링을 배웁니다.\"\ntokens = enc.encode(text)\n\nprint(\"토큰 개수:\", len(tokens))  # 글이 몇 토큰인지\nprint(\"앞 3토큰 ID:\", tokens[:3])",
      "note": "API 비용은 토큰 수로 매겨지므로, 보내기 전에 길이를 재 보면 비용과 컨텍스트 한계를 미리 관리할 수 있다."
    }
  ],
  "vue-1": [
    {
      "title": "버튼을 누르면 1씩 오르는 카운터",
      "lang": "vue",
      "code": "<script setup>\nimport { ref } from 'vue'\nconst count = ref(0)            // 0을 담은 반응형 상자\n</script>\n\n<template>\n  <!-- v-on(@)으로 클릭 시 count 증가 -->\n  <button @click=\"count++\">눌러봐: {{ count }}</button>\n</template>",
      "note": "@click 은 v-on:click 의 줄임말이며, count가 바뀌면 버튼 글자도 자동으로 바뀝니다."
    },
    {
      "title": "리스트를 v-for로 화면에 그리기",
      "lang": "vue",
      "code": "<script setup>\nimport { ref } from 'vue'\nconst fruits = ref(['사과', '바나나', '포도'])\n</script>\n\n<template>\n  <ul>\n    <!-- 배열을 돌면서 li를 자동 생성, key는 고유 식별자 -->\n    <li v-for=\"(f, i) in fruits\" :key=\"i\">{{ i + 1 }}. {{ f }}</li>\n  </ul>\n</template>",
      "note": "v-for 에는 항상 :key 를 붙여야 Vue가 항목을 효율적으로 추적합니다."
    }
  ],
  "vue-2": [
    {
      "title": "props로 인사말 받기",
      "lang": "vue",
      "code": "<script setup>\n// 부모가 내려준 name을 받아 사용\ndefineProps({ name: String })\n</script>\n\n<template>\n  <p>환영합니다, {{ name }}님!</p>\n</template>",
      "note": "부모는 <Hello :name=\"'철수'\" /> 처럼 :name 으로 값을 내려줍니다."
    },
    {
      "title": "slot으로 내용 끼워 넣기",
      "lang": "vue",
      "code": "<!-- Card.vue -->\n<template>\n  <div class=\"card\">\n    <slot>기본 내용</slot>  <!-- 부모가 넣은 내용이 여기 들어감 -->\n  </div>\n</template>\n\n<!-- 사용: <Card>안녕하세요</Card> 라고 쓰면 '안녕하세요'가 표시됨 -->",
      "note": "slot은 컴포넌트 안에 부모가 자유롭게 내용을 채워 넣는 빈자리입니다."
    }
  ],
  "vue-3": [
    {
      "title": "router-link로 페이지 이동 버튼 만들기",
      "lang": "vue",
      "code": "<template>\n  <nav>\n    <!-- a 태그 대신 router-link로 SPA 방식 이동 -->\n    <router-link to=\"/\">홈</router-link>\n    <router-link to=\"/products\">상품목록</router-link>\n  </nav>\n  <router-view />  <!-- 현재 주소에 맞는 페이지가 여기 표시됨 -->\n</template>",
      "note": "router-link는 깜빡임 없이 이동하고, router-view는 그 페이지가 그려지는 자리입니다."
    },
    {
      "title": "상세 페이지에서 주소의 id 읽기",
      "lang": "vue",
      "code": "<script setup>\nimport { useRoute } from 'vue-router'\nconst route = useRoute()\n// 주소가 /products/7 이면 id는 '7'\nconst id = route.params.id\n</script>\n\n<template>\n  <p>현재 보고 있는 상품 번호: {{ id }}</p>\n</template>",
      "note": "useRoute()로 현재 주소 정보를 꺼내며, params.id 로 동적 부분 값을 얻습니다."
    }
  ],
  "vue-4": [
    {
      "title": "환경변수로 API 주소 읽기",
      "lang": "javascript",
      "code": "// .env 파일: VITE_API_BASE=https://api.example.com\n\n// 코드에서 꺼내 쓰기 (VITE_ 접두사만 노출됨)\nconst base = import.meta.env.VITE_API_BASE\nconsole.log(base)   // https://api.example.com\n\nfetch(`${base}/users`)   // 환경마다 주소를 바꿔 끼울 수 있음\n  .then(res => res.json())\n  .then(data => console.log(data))",
      "note": "주소를 코드에 직접 박지 않고 .env에 두면 개발·운영 환경을 쉽게 전환합니다."
    },
    {
      "title": "async/await로 데이터 받아오기",
      "lang": "javascript",
      "code": "async function getUser(id) {\n  // await는 응답이 올 때까지 기다림\n  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)\n  const user = await res.json()    // 응답을 객체로 변환\n  return user.name\n}\n\ngetUser(1).then(name => console.log('이름:', name))",
      "note": "await는 비동기 결과를 마치 순서대로 받는 것처럼 읽기 쉽게 만들어 줍니다."
    }
  ],
  "webproject-1": [
    {
      "title": "객체 배열에서 원하는 항목 찾기",
      "lang": "javascript",
      "code": "const todos = [\n  { id: 1, title: '장보기' },\n  { id: 2, title: '운동하기' }\n]\n// id가 2인 할 일을 찾는다 (find: 조건에 처음 맞는 하나를 반환)\nconst found = todos.find(t => t.id === 2)\nconsole.log(found.title) // 운동하기",
      "note": "find는 '여러 개 중 딱 하나'를 찾을 때 쓴다."
    },
    {
      "title": "Vite로 Vue 프로젝트 만들기 명령어",
      "lang": "bash",
      "code": "# Vue 템플릿으로 새 프로젝트 생성\nnpm create vite@latest my-todo -- --template vue\n# 폴더 이동 후 의존성 설치\ncd my-todo && npm install\n# 개발 서버 실행 (브라우저에서 localhost:5173 접속)\nnpm run dev",
      "note": "이 세 줄이면 누구나 Vue 개발 환경을 5분 안에 만들 수 있다."
    }
  ],
  "webproject-2": [
    {
      "title": "v-for로 목록 그리기",
      "lang": "vue",
      "code": "<script setup>\nimport { ref } from 'vue'\nconst fruits = ref(['사과', '바나나', '포도'])\n</script>\n<template>\n  <!-- 배열 개수만큼 li를 반복 생성, key는 구분용 고유값 -->\n  <li v-for=\"(f, i) in fruits\" :key=\"i\">{{ f }}</li>\n</template>",
      "note": ":key는 Vue가 항목을 구분하는 이름표라서 꼭 넣는다."
    },
    {
      "title": "fetch로 가짜 API 데이터 불러오기",
      "lang": "javascript",
      "code": "// 공개 테스트 API에서 할 일 데이터를 가져온다\nasync function loadTodos() {\n  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')\n  const data = await res.json()  // JSON 문자열을 객체로 변환\n  console.log(data) // [{userId, id, title, completed}, ...]\n}\nloadTodos()",
      "note": "await는 데이터가 도착할 때까지 기다리라는 뜻이다."
    }
  ],
  "webproject-3": [
    {
      "title": "Vite 배포 경로(base) 설정",
      "lang": "javascript",
      "code": "// vite.config.js\nimport { defineConfig } from 'vite'\nimport vue from '@vitejs/plugin-vue'\n\nexport default defineConfig({\n  plugins: [vue()],\n  // 저장소 이름이 my-todo면 base를 이렇게 맞춘다\n  base: '/my-todo/'\n})",
      "note": "이 한 줄로 배포 후 빈 화면(자산 404) 문제를 예방한다."
    },
    {
      "title": "빌드와 미리보기 명령어",
      "lang": "bash",
      "code": "# 배포용 파일을 dist 폴더에 생성\nnpm run build\n# 빌드 결과를 로컬에서 미리 확인\nnpm run preview\n# 브라우저에서 안내된 주소(예: localhost:4173) 접속",
      "note": "배포 전 preview로 한 번 확인하면 실수를 크게 줄인다."
    }
  ],
  "spring-ai-1": [
    {
      "title": "application.properties 최소 설정",
      "lang": "bash",
      "code": "# OpenAI API 키와 사용할 모델, 창의성(temperature) 지정\nspring.ai.openai.api-key=${OPENAI_API_KEY}\nspring.ai.openai.chat.options.model=gpt-4o-mini\nspring.ai.openai.chat.options.temperature=0.7",
      "note": "키는 코드에 직접 쓰지 말고 환경변수(${...})로 빼는 것이 안전하다."
    },
    {
      "title": "한 줄로 LLM에게 질문하기",
      "lang": "java",
      "code": "String answer = chatClient.prompt()\n        .user(\"스프링부트를 한 문장으로 설명해줘\")\n        .call()\n        .content();\nSystem.out.println(answer); // 콘솔에 답변 출력",
      "note": "prompt → user → call → content 4단계만 기억하면 어떤 질문도 보낼 수 있다."
    }
  ],
  "spring-ai-2": [
    {
      "title": "문서를 쪼개서 벡터DB에 적재",
      "lang": "java",
      "code": "var reader = new TextReader(\"classpath:회사소개.txt\");\nList<Document> docs = reader.get();            // 문서 읽기\nvar splitter = new TokenTextSplitter();        // 길이 기준 분할기\nList<Document> chunks = splitter.apply(docs);  // 문단 단위로 쪼개기\nvectorStore.add(chunks);                       // 임베딩 후 저장",
      "note": "읽기→쪼개기→적재 3단계면 어떤 문서든 검색 대상이 된다."
    },
    {
      "title": "비슷한 문서 top-k 검색",
      "lang": "java",
      "code": "List<Document> results = vectorStore.similaritySearch(\n        SearchRequest.query(\"환불 정책\").withTopK(3));\nresults.forEach(d -> System.out.println(d.getText()));",
      "note": "withTopK(3)으로 가장 비슷한 문서 3개만 가져온다."
    }
  ],
  "spring-ai-3": [
    {
      "title": "답변을 자바 객체로 받기(구조화 출력)",
      "lang": "java",
      "code": "record Movie(String title, int year, String genre) {}\n\nMovie m = chatClient.prompt()\n        .user(\"인셉션 영화 정보를 알려줘\")\n        .call()\n        .entity(Movie.class); // 문자열 대신 객체로 변환\nSystem.out.println(m.title() + \" / \" + m.year());",
      "note": ".entity(Movie.class) 한 줄로 LLM 답이 곧바로 자바 객체가 된다."
    },
    {
      "title": "스트리밍으로 답변 흘려받기",
      "lang": "java",
      "code": "Flux<String> stream = chatClient.prompt()\n        .user(\"스프링을 시처럼 소개해줘\")\n        .stream()\n        .content();\nstream.subscribe(token -> System.out.print(token)); // 글자 단위 출력",
      "note": "call() 대신 stream()을 쓰면 답변이 타이핑되듯 조금씩 도착한다."
    }
  ],
  "sllm-1": [
    {
      "title": "터미널 없이 코드로 모델에게 한 번 물어보기",
      "lang": "python",
      "code": "import requests\n\n# 로컬 Ollama에 단발성 질문 보내기\nr = requests.post(\n    \"http://localhost:11434/api/generate\",\n    json={\"model\": \"qwen2.5:0.5b\", \"prompt\": \"파이썬을 한 문장으로 설명해줘\", \"stream\": False},\n)\nprint(r.json()[\"response\"])  # 모델이 만든 한 문장 답변 출력",
      "note": "stream=False로 두면 답변이 한꺼번에 와서 처음 배우기에 다루기 쉽습니다."
    },
    {
      "title": "HuggingFace로 작은 모델 직접 불러와 추론하기",
      "lang": "python",
      "code": "from transformers import pipeline  # 간편 추론 도구\n\n# 아주 작은 생성 모델을 내려받아 파이프라인 구성\ngen = pipeline(\"text-generation\", model=\"sshleifer/tiny-gpt2\")\n\nout = gen(\"Hello, AI is\", max_new_tokens=10)  # 뒤에 10개 토큰 생성\nprint(out[0][\"generated_text\"])  # 이어 붙여진 문장 출력",
      "note": "pipeline 한 줄이면 모델 다운로드부터 추론까지 알아서 처리해 줍니다."
    }
  ],
  "sllm-2": [
    {
      "title": "instruction 학습 데이터 한 줄(JSONL) 만들어 보기",
      "lang": "python",
      "code": "import json\n\nsamples = [\n    {\"instruction\": \"환불 가능한 기간을 알려줘\", \"output\": \"구매일로부터 7일 이내 환불 가능합니다.\"},\n    {\"instruction\": \"배송은 얼마나 걸려?\", \"output\": \"보통 2~3일 안에 받아보실 수 있습니다.\"},\n]\nwith open(\"train.jsonl\", \"w\", encoding=\"utf-8\") as f:\n    for s in samples:\n        f.write(json.dumps(s, ensure_ascii=False) + \"\\n\")  # 한 줄에 한 예시\nprint(\"train.jsonl 저장 완료\")",
      "note": "한 줄에 하나의 지시-답변 짝을 적는 JSONL이 파인튜닝의 표준 입력 형식입니다."
    },
    {
      "title": "학습할 파라미터가 얼마나 적은지 직접 확인",
      "lang": "python",
      "code": "from peft import LoraConfig, get_peft_model\nfrom transformers import AutoModelForCausalLM\n\nmodel = AutoModelForCausalLM.from_pretrained(\"Qwen/Qwen2.5-0.5B\")\nlora = LoraConfig(r=8, target_modules=[\"q_proj\", \"v_proj\"], task_type=\"CAUSAL_LM\")\nmodel = get_peft_model(model, lora)\n\n# 실제 학습되는 파라미터 비율 출력\nmodel.print_trainable_parameters()  # trainable%가 1% 미만으로 나옴",
      "note": "print_trainable_parameters로 '전체의 1%도 안 되는 부분만 학습'한다는 LoRA의 핵심을 눈으로 봅니다."
    }
  ],
  "ml-dl-1": [
    {
      "title": "데이터 한눈에 보기",
      "lang": "python",
      "code": "from sklearn.datasets import load_iris\nimport pandas as pd\n\niris = load_iris()\ndf = pd.DataFrame(iris.data, columns=iris.feature_names)\ndf['target'] = iris.target\nprint(df.head())          # 앞 5줄 미리보기\nprint(df['target'].value_counts())  # 품종별 개수",
      "note": "모델을 만들기 전, 데이터가 어떻게 생겼는지 표로 먼저 확인하는 습관이 중요하다."
    },
    {
      "title": "정확도만 믿으면 안 되는 이유",
      "lang": "python",
      "code": "from sklearn.metrics import precision_score, recall_score, f1_score\n\ny_true = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0]  # 진짜 정답\ny_pred = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]  # 모델 예측\nprint('정밀도:', precision_score(y_true, y_pred))\nprint('재현율:', recall_score(y_true, y_pred))\nprint('F1:', f1_score(y_true, y_pred))",
      "note": "정답이 한쪽으로 치우치면 정확도는 높아도 재현율이 낮을 수 있어, 여러 지표를 같이 봐야 한다."
    }
  ],
  "ml-dl-2": [
    {
      "title": "텐서 기본 연산",
      "lang": "python",
      "code": "import torch\n\na = torch.tensor([[1., 2.], [3., 4.]])\nb = torch.ones(2, 2)\nprint(a + b)          # 원소별 덧셈\nprint(a @ b)          # 행렬 곱\nprint(a.mean())       # 전체 평균",
      "note": "텐서는 넘파이 배열과 비슷하지만, 자동 미분과 GPU 연산을 지원하는 점이 다르다."
    },
    {
      "title": "활성화 함수 ReLU 의 효과",
      "lang": "python",
      "code": "import torch\nfrom torch import nn\n\nx = torch.tensor([-2.0, -0.5, 0.0, 1.5, 3.0])\nrelu = nn.ReLU()\nprint(relu(x))   # 음수는 0으로, 양수는 그대로",
      "note": "ReLU 는 음수를 0으로 잘라내, 신경망이 비선형(곡선) 패턴을 배우도록 돕는다."
    }
  ],
  "ml-dl-3": [
    {
      "title": "드롭아웃 동작 확인",
      "lang": "python",
      "code": "import torch\nfrom torch import nn\n\ndrop = nn.Dropout(0.5)\nx = torch.ones(1, 8)\ndrop.train()             # 학습 모드: 일부를 0으로\nprint(drop(x))\ndrop.eval()              # 평가 모드: 전부 통과\nprint(drop(x))",
      "note": "드롭아웃은 학습할 때만 뉴런을 끄고, 평가할 때는 모두 켜서 안정적으로 예측한다."
    },
    {
      "title": "이미지 데이터 증강 미리보기",
      "lang": "python",
      "code": "from torchvision import transforms\nfrom PIL import Image\n\naug = transforms.Compose([\n    transforms.RandomRotation(20),       # 최대 20도 회전\n    transforms.RandomHorizontalFlip()])  # 좌우 뒤집기\nimg = Image.new('RGB', (64, 64), 'white')\nprint(type(aug(img)))                    # 변환 적용된 이미지",
      "note": "같은 사진을 조금씩 바꿔 학습하면, 모델이 더 다양한 상황에 강해진다."
    }
  ],
  "feature-1": [
    {
      "title": "결측치를 중앙값으로 채우기",
      "lang": "python",
      "code": "import pandas as pd\ndf = pd.DataFrame({'age': [20, None, 35, None, 50]})\nprint('채우기 전 결측 개수:', df['age'].isna().sum())\ndf['age'] = df['age'].fillna(df['age'].median())  # 중앙값(35)으로 채움\nprint(df['age'].tolist())",
      "note": "평균 대신 중앙값을 쓰면 극단값(이상치)에 덜 흔들린다."
    },
    {
      "title": "범주형을 원-핫 인코딩",
      "lang": "python",
      "code": "import pandas as pd\ndf = pd.DataFrame({'city': ['서울', '부산', '서울', '대구']})\nencoded = pd.get_dummies(df['city'])  # 도시마다 0/1 컬럼 생성\nprint(encoded)",
      "note": "도시 간 크기 비교 오해 없이 글자를 숫자로 안전하게 바꾼다."
    },
    {
      "title": "MinMax 스케일링으로 0~1 맞추기",
      "lang": "python",
      "code": "from sklearn.preprocessing import MinMaxScaler\nimport numpy as np\nx = np.array([[10], [50], [80]])\nscaled = MinMaxScaler().fit_transform(x)  # 최소=0, 최대=1\nprint(scaled.ravel())",
      "note": "단위가 다른 피처들을 같은 0~1 범위로 줄세워 모델이 공평하게 보게 한다."
    }
  ],
  "modeldev-1": [
    {
      "title": "데이터를 8:2로 나누고 모양 확인",
      "lang": "python",
      "code": "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\n\nX, y = load_iris(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(\n    X, y, test_size=0.2, random_state=0)\nprint('학습:', X_tr.shape, '테스트:', X_te.shape)",
      "note": "random_state를 고정하면 매번 같은 방식으로 나뉘어 결과를 재현할 수 있습니다."
    },
    {
      "title": "교차검증 5번 점수 한 줄로 보기",
      "lang": "python",
      "code": "from sklearn.datasets import load_iris\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.model_selection import cross_val_score\n\nX, y = load_iris(return_X_y=True)\nscores = cross_val_score(DecisionTreeClassifier(), X, y, cv=5)\nprint(scores)            # 5개의 점수\nprint(scores.mean())     # 평균 점수",
      "note": "한 번의 점수가 아니라 5번 평균을 보면 모델 실력을 더 정직하게 알 수 있습니다."
    }
  ],
  "modeldev-2": [
    {
      "title": "GridSearch로 최적값 찾기",
      "lang": "python",
      "code": "from sklearn.datasets import load_iris\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.model_selection import GridSearchCV\n\nX, y = load_iris(return_X_y=True)\ngrid = GridSearchCV(DecisionTreeClassifier(),\n                    {'max_depth': [2, 3, 4, 5]}, cv=5)\ngrid.fit(X, y)\nprint(grid.best_params_, round(grid.best_score_, 3))",
      "note": "후보 깊이 중 교차검증 점수가 가장 높은 값을 자동으로 골라줍니다."
    },
    {
      "title": "RandomizedSearch로 빠르게 탐색",
      "lang": "python",
      "code": "from sklearn.datasets import load_iris\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import RandomizedSearchCV\n\nX, y = load_iris(return_X_y=True)\nrs = RandomizedSearchCV(\n    RandomForestClassifier(random_state=0),\n    {'n_estimators': [50, 100, 200], 'max_depth': [3, 5, 7]},\n    n_iter=4, cv=5, random_state=0)\nrs.fit(X, y)\nprint(rs.best_params_)",
      "note": "모든 조합을 다 보지 않고 무작위 4번만 시험해 시간을 아낍니다."
    }
  ],
  "rag-1": [
    {
      "title": "문장 하나를 벡터로 바꿔보기",
      "lang": "python",
      "code": "from sentence_transformers import SentenceTransformer\nmodel = SentenceTransformer(\"all-MiniLM-L6-v2\")\nvec = model.encode(\"오늘 날씨가 좋다\")\nprint(\"벡터 길이:\", len(vec))   # 384\nprint(vec[:5])                 # 앞 5개 숫자 미리보기",
      "note": "임베딩은 결국 문장을 고정 길이의 숫자 목록으로 바꾸는 일임을 눈으로 확인하는 예제입니다."
    },
    {
      "title": "두 문장이 얼마나 비슷한지 재보기",
      "lang": "python",
      "code": "from sentence_transformers import SentenceTransformer, util\nm = SentenceTransformer(\"all-MiniLM-L6-v2\")\na = m.encode(\"환불은 어떻게 하나요\", convert_to_tensor=True)\nb = m.encode(\"반품 절차를 알려주세요\", convert_to_tensor=True)\nc = m.encode(\"점심 메뉴 추천해줘\", convert_to_tensor=True)\nprint(\"환불-반품:\", util.cos_sim(a, b).item())  # 높게\nprint(\"환불-점심:\", util.cos_sim(a, c).item())  # 낮게",
      "note": "의미가 가까운 문장일수록 코사인 유사도 숫자가 1에 가깝게 나온다는 핵심 포인트를 보여줍니다."
    }
  ],
  "rag-2": [
    {
      "title": "top-k 값을 바꿔 가며 검색해보기",
      "lang": "python",
      "code": "for k in [2, 4, 6]:\n    docs = db.similarity_search(\"배송 기간\", k=k)\n    print(f\"k={k} -> 가져온 조각 수: {len(docs)}\")\n    print(\"  첫 조각:\", docs[0].page_content[:40])",
      "note": "k가 클수록 더 많은 근거를 가져오지만 관련 없는 내용도 섞일 수 있다는 점을 직접 비교합니다."
    },
    {
      "title": "Cross-Encoder로 재순위 점수 매기기",
      "lang": "python",
      "code": "from sentence_transformers import CrossEncoder\nce = CrossEncoder(\"cross-encoder/ms-marco-MiniLM-L-6-v2\")\nq = \"환불 정책\"\ncands = [\"환불은 7일 이내 가능합니다\",\n         \"오늘 점심은 김치찌개입니다\",\n         \"반품 시 환불 절차 안내\"]\nscores = ce.predict([(q, c) for c in cands])\nfor c, s in sorted(zip(cands, scores), key=lambda x:-x[1]):\n    print(round(float(s),2), c)",
      "note": "질문과 후보를 한 쌍씩 정밀 비교해 진짜 관련 있는 문장이 위로 올라오는 재순위 효과를 확인합니다."
    }
  ],
  "rag-3": [
    {
      "title": "메타데이터로 검색 범위 좁히기",
      "lang": "python",
      "code": "# dept(부서) 꼬리표가 'CS'인 문서에서만 검색\ndocs = db.similarity_search(\n    \"환불 정책\", k=3,\n    filter={\"dept\": \"CS\"})\nfor d in docs:\n    print(d.metadata.get(\"dept\"), d.page_content[:30])",
      "note": "메타데이터 필터를 쓰면 엉뚱한 부서 문서를 빼고 관련 범위에서만 찾아 정확도가 올라갑니다."
    },
    {
      "title": "같은 질문은 캐싱으로 즉시 응답",
      "lang": "python",
      "code": "cache = {}\ndef ask_cached(q):\n    if q in cache:              # 이미 답한 질문이면\n        return cache[q]         # 저장된 답을 바로 반환\n    ans = ask(q)               # 처음이면 RAG 실행\n    cache[q] = ans             # 답을 저장해 둠\n    return ans\n\nprint(ask_cached(\"환불 기한?\"))  # 처음: 느림\nprint(ask_cached(\"환불 기한?\"))  # 두번째: 즉시",
      "note": "간단한 딕셔너리 캐시만으로도 반복 질문의 응답 속도와 LLM 비용을 크게 줄일 수 있습니다."
    }
  ],
  "langchain-1": [
    {
      "title": "가장 단순한 한 번 호출",
      "lang": "python",
      "code": "from dotenv import load_dotenv\nfrom langchain_openai import ChatOpenAI\n\nload_dotenv()\nmodel = ChatOpenAI(model=\"gpt-4o-mini\")\n\n# invoke로 한 번 물어보고 답의 본문(content)만 출력\nanswer = model.invoke(\"한국의 수도는 어디야? 한 단어로 답해줘\")\nprint(answer.content)  # 서울",
      "note": "model.invoke()는 질문 하나를 보내고 답 객체를 받는 가장 기본 동작입니다."
    },
    {
      "title": "프롬프트 템플릿에 값 끼워 넣기",
      "lang": "python",
      "code": "from langchain_core.prompts import ChatPromptTemplate\n\ntpl = ChatPromptTemplate.from_template(\"{topic}에 대해 초등학생도 알게 한 문장으로 설명해줘\")\n\n# format_messages로 빈칸이 채워진 실제 메시지를 미리 확인\nmsgs = tpl.format_messages(topic=\"블랙홀\")\nprint(msgs[0].content)  # 블랙홀에 대해 초등학생도 알게 한 문장으로 설명해줘",
      "note": "템플릿은 {빈칸} 부분만 바꿔가며 같은 양식을 재사용하게 해줍니다."
    }
  ],
  "langchain-2": [
    {
      "title": "대화 메모리로 맥락 이어가기",
      "lang": "python",
      "code": "from langchain_core.chat_history import InMemoryChatMessageHistory\n\nhistory = InMemoryChatMessageHistory()\nhistory.add_user_message(\"내 이름은 민수야\")\nhistory.add_ai_message(\"반가워요 민수님\")\nhistory.add_user_message(\"내 이름이 뭐라고?\")\n\n# 저장된 대화 기록을 한꺼번에 확인\nfor m in history.messages:\n    print(m.type, ':', m.content)",
      "note": "대화 기록을 객체에 쌓아두면 다음 답변에 이전 맥락을 함께 넘길 수 있습니다."
    },
    {
      "title": "문서 조각 잘라보기",
      "lang": "python",
      "code": "from langchain_text_splitters import RecursiveCharacterTextSplitter\n\ntext = \"라면 끓이는 법. 물을 끓인다. 면과 스프를 넣는다. 4분 기다린다. 맛있게 먹는다.\"\nsplitter = RecursiveCharacterTextSplitter(chunk_size=15, chunk_overlap=0)\nfor i, c in enumerate(splitter.split_text(text)):\n    print(i, c)  # 문서가 어떻게 조각나는지 눈으로 확인",
      "note": "chunk_size를 바꾸며 조각 크기가 검색 품질에 어떻게 영향을 주는지 감을 잡습니다."
    }
  ],
  "langchain-3": [
    {
      "title": "스트리밍으로 한 조각씩 받기",
      "lang": "python",
      "code": "from dotenv import load_dotenv\nfrom langchain_openai import ChatOpenAI\n\nload_dotenv()\nmodel = ChatOpenAI(model=\"gpt-4o-mini\")\n\n# stream은 답을 조각(chunk)으로 나눠 보내준다\nfor chunk in model.stream(\"가을에 대한 짧은 시 한 편 써줘\"):\n    print(chunk.content, end=\"\", flush=True)  # 이어붙여 출력",
      "note": "invoke 대신 stream을 쓰면 글자가 생기는 대로 즉시 화면에 보여줄 수 있습니다."
    },
    {
      "title": "캐싱으로 같은 질문 빨리 답하기",
      "lang": "python",
      "code": "import time\nfrom dotenv import load_dotenv\nfrom langchain_openai import ChatOpenAI\nfrom langchain_core.globals import set_llm_cache\nfrom langchain_community.cache import InMemoryCache\n\nload_dotenv()\nset_llm_cache(InMemoryCache())\nm = ChatOpenAI(model=\"gpt-4o-mini\")\n\nt = time.time(); m.invoke(\"1+1?\"); print(\"처음:\", round(time.time()-t, 2), \"초\")\nt = time.time(); m.invoke(\"1+1?\"); print(\"두번째:\", round(time.time()-t, 2), \"초\")  # 훨씬 빠름",
      "note": "두 번째 호출은 AI를 부르지 않고 캐시에서 꺼내므로 응답이 즉시 돌아옵니다."
    }
  ],
  "serving-1": [
    {
      "title": "학습 모델 저장하기 (train.py)",
      "lang": "python",
      "code": "from sklearn.datasets import load_iris\nfrom sklearn.ensemble import RandomForestClassifier\nimport joblib\n\nX, y = load_iris(return_X_y=True)\nmodel = RandomForestClassifier().fit(X, y)  # 간단히 학습\njoblib.dump(model, \"model.joblib\")          # 파일로 굳혀 저장\nprint(\"saved: model.joblib\")",
      "note": "서빙의 출발점은 학습된 모델을 파일로 저장하는 것이며, joblib이 표준이다."
    },
    {
      "title": "curl로 API 호출해보기",
      "lang": "bash",
      "code": "curl -X POST http://127.0.0.1:8000/predict \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"sepal_length\":5.1,\"sepal_width\":3.5,\"petal_length\":1.4,\"petal_width\":0.2}'\n# 기대 응답: {\"prediction\":\"setosa\"}",
      "note": "터미널에서 curl 한 줄로 서버가 정상 응답하는지 바로 확인할 수 있다."
    },
    {
      "title": "저장한 모델 다시 불러 예측",
      "lang": "python",
      "code": "import joblib\nmodel = joblib.load(\"model.joblib\")   # 저장했던 모델 복원\nprint(model.predict([[5.1, 3.5, 1.4, 0.2]]))  # [0] → setosa",
      "note": "파일로 저장한 모델은 어떤 프로그램에서든 load 한 줄로 그대로 되살아난다."
    }
  ],
  "serving-2": [
    {
      "title": "FastAPI에 /metrics 두 줄로 추가",
      "lang": "python",
      "code": "from prometheus_fastapi_instrumentator import Instrumentator\n# app = FastAPI(...) 선언 뒤에 아래 한 줄이면 /metrics 자동 생성\nInstrumentator().instrument(app).expose(app)\n# 이제 http://localhost:8000/metrics 에서 요청수·지연 지표가 노출됨",
      "note": "라이브러리 한 줄로 표준 Prometheus 메트릭 엔드포인트가 만들어진다."
    },
    {
      "title": "Prometheus 수집 설정 (prometheus.yml)",
      "lang": "bash",
      "code": "global:\n  scrape_interval: 15s          # 15초마다 지표를 긁어옴\nscrape_configs:\n  - job_name: \"iris-api\"\n    static_configs:\n      - targets: [\"api:8000\"]    # compose 안의 api 컨테이너를 가리킴",
      "note": "Prometheus는 이 설정대로 추론 API의 /metrics를 주기적으로 수집한다."
    },
    {
      "title": "간단한 데이터 드리프트 신호 확인",
      "lang": "python",
      "code": "import numpy as np\ntrain_mean = 3.05            # 학습 때 어떤 피처의 평균(예시)\nrecent = np.array([3.9, 4.1, 3.8, 4.0])  # 최근 들어온 값들\nif abs(recent.mean() - train_mean) > 0.5:  # 기준 이상 벗어나면\n    print(\"drift 의심! 재학습 검토 필요\")   # 알림 트리거",
      "note": "최근 입력 평균이 학습 때와 크게 벌어지면 드리프트 경보를 울리는 가장 단순한 형태다."
    }
  ],
  "serving-3": [
    {
      "title": "헬스체크 자동 테스트 (test_app.py)",
      "lang": "python",
      "code": "from fastapi.testclient import TestClient\nfrom app import app\n\nclient = TestClient(app)\n\ndef test_health():\n    r = client.get(\"/health\")\n    assert r.status_code == 200          # 200이어야 통과\n    assert r.json() == {\"status\": \"ok\"}  # 내용까지 확인",
      "note": "이 테스트가 CI에서 통과해야 배포가 진행되어 깨진 서버가 나가는 걸 막는다."
    },
    {
      "title": "레지스트리 운영 모델 불러 쓰기",
      "lang": "python",
      "code": "import mlflow.pyfunc\n# Production 단계로 승격한 모델을 이름으로 바로 로드\nmodel = mlflow.pyfunc.load_model(\"models:/iris_model/Production\")\nprint(model.predict([[5.1, 3.5, 1.4, 0.2]]))",
      "note": "서빙 코드는 파일 경로 대신 '운영(Production) 단계 모델'을 이름으로 불러 항상 최신 합격 모델을 쓴다."
    }
  ],
  "agent-1": [
    {
      "title": "가장 작은 LangGraph: 인사 노드 하나",
      "lang": "python",
      "code": "from typing import TypedDict\nfrom langgraph.graph import StateGraph, START, END\n\nclass State(TypedDict):\n    text: str\n\ndef hello(state: State):\n    # 상태의 text 앞에 인사말을 붙여 돌려준다\n    return {\"text\": \"안녕하세요, \" + state[\"text\"]}\n\ng = StateGraph(State)\ng.add_node(\"hello\", hello)\ng.add_edge(START, \"hello\")\ng.add_edge(\"hello\", END)\napp = g.compile()\n\nprint(app.invoke({\"text\": \"홍길동님\"}))  # {'text': '안녕하세요, 홍길동님'}",
      "note": "노드 하나도 그래프다 — State를 받아 일부를 고쳐 돌려주는 함수가 노드의 본질."
    },
    {
      "title": "@tool 데코레이터로 도구 만들기",
      "lang": "python",
      "code": "from langchain_core.tools import tool\n\n@tool\ndef add(a: int, b: int) -> int:\n    \"\"\"두 정수를 더한다.\"\"\"\n    return a + b\n\n# 도구의 이름·설명·입력 형식을 LLM이 읽을 수 있게 자동 추출\nprint(add.name)         # add\nprint(add.description)  # 두 정수를 더한다.\nprint(add.invoke({\"a\": 3, \"b\": 5}))  # 8",
      "note": "함수 위에 @tool만 붙이면 docstring이 곧 LLM에게 주는 사용설명서가 된다."
    }
  ],
  "agent-2": [
    {
      "title": "메모리로 이름 기억하기",
      "lang": "python",
      "code": "from typing import Annotated, TypedDict\nfrom langgraph.graph import StateGraph, START, END\nfrom langgraph.graph.message import add_messages\nfrom langgraph.checkpoint.memory import MemorySaver\nfrom langchain_openai import ChatOpenAI\n\nllm = ChatOpenAI(model=\"gpt-4o-mini\")\nclass S(TypedDict):\n    messages: Annotated[list, add_messages]\n\ndef chat(s: S):\n    return {\"messages\": [llm.invoke(s[\"messages\"])]}\n\ng = StateGraph(S); g.add_node(\"chat\", chat)\ng.add_edge(START, \"chat\"); g.add_edge(\"chat\", END)\napp = g.compile(checkpointer=MemorySaver())\ncfg = {\"configurable\": {\"thread_id\": \"u1\"}}\napp.invoke({\"messages\": [(\"user\", \"내 이름은 보검\")]}, cfg)\nr = app.invoke({\"messages\": [(\"user\", \"내 이름 뭐였지?\")]}, cfg)\nprint(r[\"messages\"][-1].content)  # '보검'을 기억해 답한다",
      "note": "같은 thread_id를 쓰면 두 번째 요청에서 앞 대화를 기억한다."
    },
    {
      "title": "interrupt로 사람 승인 받기",
      "lang": "python",
      "code": "from typing import TypedDict\nfrom langgraph.graph import StateGraph, START, END\nfrom langgraph.checkpoint.memory import MemorySaver\n\nclass S(TypedDict):\n    action: str\n\ndef do_action(s: S):\n    return {\"action\": s[\"action\"] + \" 실행됨\"}\n\ng = StateGraph(S); g.add_node(\"do\", do_action)\ng.add_edge(START, \"do\"); g.add_edge(\"do\", END)\n# do 노드 직전에서 멈춰 사람을 기다린다\napp = g.compile(checkpointer=MemorySaver(), interrupt_before=[\"do\"])\ncfg = {\"configurable\": {\"thread_id\": \"1\"}}\napp.invoke({\"action\": \"메일발송\"}, cfg)\nprint(\"여기서 멈춤 - 승인 대기\")\nprint(app.invoke(None, cfg))  # None을 넣으면 멈춘 지점부터 재개",
      "note": "interrupt_before로 위험한 노드 앞에서 멈추고, 재호출하면 그 지점부터 이어 실행한다."
    }
  ],
  "vectordb-1": [
    {
      "title": "코사인 유사도 직접 계산해 보기",
      "lang": "python",
      "code": "import numpy as np\n\n# 세 개의 간단한 벡터 (의미가 비슷할수록 방향이 비슷)\na = np.array([1.0, 0.2, 0.0])\nb = np.array([0.9, 0.1, 0.1])  # a와 비슷\nc = np.array([0.0, 0.1, 1.0])  # a와 다름\n\ndef cosine(x, y):\n    return np.dot(x, y) / (np.linalg.norm(x) * np.linalg.norm(y))\n\nprint(\"a-b 유사도:\", round(cosine(a, b), 3))  # 1에 가까움\nprint(\"a-c 유사도:\", round(cosine(a, c), 3))  # 0에 가까움",
      "note": "방향이 비슷하면 1, 무관하면 0에 가까워진다는 것을 숫자로 직접 확인하는 것이 포인트다."
    },
    {
      "title": "문장 임베딩 만들어 모양 확인하기",
      "lang": "python",
      "code": "from sentence_transformers import SentenceTransformer\n\nmodel = SentenceTransformer(\"all-MiniLM-L6-v2\")\nsentences = [\"오늘 날씨가 좋다\", \"바깥 기온이 따뜻하다\"]\n\nvecs = model.encode(sentences)\nprint(vecs.shape)        # (2, 384) -> 문장 2개, 각 384차원\nprint(vecs[0][:5])       # 첫 문장 벡터의 앞 5개 숫자 미리보기",
      "note": "한 문장이 384개의 숫자로 바뀌며, 이 숫자 묶음이 곧 문장의 '의미 좌표'가 된다."
    }
  ],
  "capstone-1": [
    {
      "title": "요구사항을 코드 데이터로 적어두기",
      "lang": "python",
      "code": "# 기획 내용을 딕셔너리로 정리하면 나중에 README 생성에도 쓸 수 있다\nproject = {\n    \"problem\": \"사내 규정을 매번 사람에게 물어봐서 시간이 낭비된다\",\n    \"persona\": \"입사 3개월 차 신입사원 김민지\",\n    \"success\": \"질문 10개 중 8개를 출처와 함께 정확히 답한다\",\n}\nfor key, value in project.items():\n    print(f\"{key}: {value}\")  # 기획 핵심을 보기 좋게 출력",
      "note": "기획을 글로만 두지 말고 데이터로 적어두면 팀원 모두가 같은 목표를 공유합니다."
    },
    {
      "title": "환경변수가 잘 들어왔는지 점검",
      "lang": "python",
      "code": "import os\nfrom dotenv import load_dotenv\n\nload_dotenv()\nkey = os.getenv(\"OPENAI_API_KEY\")\n# 키 전체를 출력하면 위험하므로 앞 4글자만 보여 확인한다\nprint(\"키 설정됨\" if key else \"키 없음\", key[:4] + \"...\" if key else \"\")",
      "note": "키를 화면에 통째로 찍지 않고 앞부분만 확인하는 것이 보안의 기본입니다."
    }
  ],
  "capstone-2": [
    {
      "title": "벡터 검색만 따로 확인해 보기",
      "lang": "python",
      "code": "# 위에서 만든 vectordb가 있다고 가정\nhits = vectordb.similarity_search(\"배송은 며칠 걸려?\", k=2)\nfor i, doc in enumerate(hits, 1):\n    print(f\"[{i}] {doc.page_content[:60]}...\")  # 찾아온 조각 앞부분만 확인",
      "note": "에이전트를 붙이기 전에 검색이 제대로 되는지 먼저 확인하면 문제를 빨리 찾습니다."
    },
    {
      "title": "터미널 입력창으로 대화 붙이기",
      "lang": "python",
      "code": "# agent 가 준비된 상태에서 실행\nwhile True:\n    q = input(\"질문(끝내려면 q): \")\n    if q.strip().lower() == \"q\":\n        break\n    out = agent.invoke({\"messages\": [(\"user\", q)]})\n    print(\"답변:\", out[\"messages\"][-1].content)",
      "note": "input 한 줄만 붙여도 사람이 직접 질문하는 간단한 데모가 됩니다."
    }
  ],
  "capstone-3": [
    {
      "title": "정답률 자동 계산",
      "lang": "python",
      "code": "# 테스트 결과를 O/X 로 적어두면 정답률이 바로 나온다\nresults = [\"O\", \"O\", \"X\", \"O\", \"O\", \"O\", \"X\", \"O\", \"O\", \"O\"]\ncorrect = results.count(\"O\")\nprint(f\"정답률: {correct}/{len(results)} = {correct/len(results)*100:.0f}%\")",
      "note": "성과를 숫자로 보여주면 발표 설득력이 크게 올라갑니다."
    },
    {
      "title": "발표 슬라이드 뼈대 출력",
      "lang": "python",
      "code": "slides = [\n    \"1. 문제: 신입이 규정을 매번 물어봐 시간 낭비\",\n    \"2. 해결: 에이전트+RAG 문서 QA\",\n    \"3. 데모: 라이브 질문 시연\",\n    \"4. 성과: 정답률 80%\",\n    \"5. 한계와 다음 단계\",\n]\nfor s in slides:\n    print(s)  # 발표 구성을 한눈에 점검",
      "note": "5장 구성을 미리 글로 정리하면 슬라이드 만들기가 훨씬 빨라집니다."
    }
  ],
  "miniproject-1": [
    {
      "title": "API 키가 잘 들어왔는지 확인하기",
      "lang": "python",
      "code": "from dotenv import load_dotenv\nimport os\n\nload_dotenv()  # .env 읽기\nkey = os.getenv(\"OPENAI_API_KEY\")\n# 키 전체를 출력하면 위험하니 앞 7글자만 보여준다\nprint(\"키 확인:\", key[:7] + \"...\" if key else \"없음\")",
      "note": "비밀 키는 항상 일부만 출력해 노출 사고를 막습니다."
    },
    {
      "title": "기능 목록을 코드로 정리해 우선순위 보기",
      "lang": "python",
      "code": "features = [\n    {\"name\": \"문서 검색 답변\", \"priority\": 1},\n    {\"name\": \"대화 기억\", \"priority\": 2},\n    {\"name\": \"출처 표시\", \"priority\": 2},\n    {\"name\": \"음성 입력\", \"priority\": 3},\n]\n# 우선순위 숫자가 낮을수록 먼저 만든다\nfor f in sorted(features, key=lambda x: x[\"priority\"]):\n    print(f\"P{f['priority']} - {f['name']}\")",
      "note": "기능에 우선순위를 매기면 시간이 부족할 때 무엇을 버릴지 쉽게 정합니다."
    }
  ],
  "miniproject-2": [
    {
      "title": "Streamlit로 챗봇 화면 만들기",
      "lang": "python",
      "code": "import streamlit as st\nfrom rag import ask\n\nst.title(\"문서 Q&A 챗봇\")\nq = st.text_input(\"질문을 입력하세요\")\nif st.button(\"질문하기\") and q:\n    with st.spinner(\"답변 생성 중...\"):\n        st.write(ask(q))  # rag.py의 함수 재사용",
      "note": "이미 만든 ask 함수를 가져다 쓰니 화면 코드는 몇 줄이면 충분합니다."
    },
    {
      "title": "검색 결과 미리 확인하기",
      "lang": "python",
      "code": "from rag import db\n\n# 어떤 조각이 검색되는지 눈으로 확인\nfor d in db.similarity_search(\"배송 기간\", k=2):\n    print(\"-\", d.page_content[:50])",
      "note": "답이 이상할 때는 먼저 '검색이 제대로 되는지'부터 확인합니다."
    }
  ],
  "miniproject-3": [
    {
      "title": "빈 입력과 오류를 막는 방어 코드",
      "lang": "python",
      "code": "import streamlit as st\nfrom rag import ask\n\nq = st.text_input(\"질문\")\nif st.button(\"질문하기\"):\n    if not q.strip():\n        st.warning(\"질문을 입력해 주세요\")  # 빈칸 방어\n    else:\n        try:\n            st.write(ask(q))\n        except Exception as e:\n            st.error(f\"오류가 발생했어요: {e}\")  # API 오류 방어",
      "note": "빈 입력과 예외를 막아두면 발표 중 화면이 멈추지 않습니다."
    },
    {
      "title": "배포에 필요한 패키지 목록 만들기",
      "lang": "bash",
      "code": "# 현재 가상환경에 설치된 패키지를 파일로 저장\npip freeze > requirements.txt\n# 내용 확인\ncat requirements.txt",
      "note": "이 파일이 있어야 배포 서버가 같은 라이브러리를 설치합니다."
    }
  ]
}

import { examplesExtra } from './lectureexamples2'

export const examplesFor = (subjectId, day) => {
  const key = `${subjectId}-${day}`
  return [...(examples[key] || []), ...(examplesExtra[key] || [])]
}
