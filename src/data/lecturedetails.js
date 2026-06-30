// 날짜별 강의안 심화 — subjectId-day 키.
//   topics: [{ h, items[] }] · labs: [{ title, steps[] }] · homework: [string]

export const details = {
  "git-1": {
    "topics": [
      {
        "h": "팀빌딩과 협업 기반",
        "items": [
          "자기소개·아이스브레이킹으로 심리적 안전감 만들기",
          "팀명·역할(팀장·기록·발표·일정) 정하기",
          "그라운드룰과 협업 목표 합의",
          "커밋 메시지 컨벤션(예: feat/fix/docs) 정하기"
        ]
      },
      {
        "h": "Git 핵심 동작",
        "items": [
          "3단계 영역(작업폴더·스테이징·저장소)",
          "add → commit 기본 흐름",
          "status·log·diff로 상태 확인",
          ".gitignore로 불필요 파일 제외",
          "amend·reset으로 되돌리기"
        ]
      },
      {
        "h": "브랜치와 원격 협업",
        "items": [
          "브랜치 생성·전환(switch)",
          "merge와 충돌(conflict) 해결",
          "clone·push·pull 원격 동기화",
          "Pull Request와 코드 리뷰",
          "main 보호와 브랜치 전략"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 내 PC에서 첫 저장소 만들기",
        "steps": [
          "터미널을 열고 'git config --global user.name' 과 'user.email' 로 본인 정보를 등록한다",
          "'mkdir git-lab1' 과 'cd git-lab1' 으로 작업 폴더를 만들어 들어간다",
          "'git init' 을 실행해 '.git' 폴더가 생겼는지 'ls -a' 로 확인한다",
          "메모장으로 hello.txt를 만들어 아무 문장이나 적고 저장한다",
          "'git status' 를 실행해 hello.txt가 빨간 글씨(미추적)로 보이는지 확인한다",
          "'git add hello.txt' → 'git commit -m \"first commit\"' 을 차례로 실행한다",
          "'git log --oneline' 으로 방금 만든 커밋이 목록에 보이면 성공이다"
        ]
      },
      {
        "title": "Lab 2. 브랜치 만들고 충돌 일부러 내보고 해결하기",
        "steps": [
          "Lab1 폴더에서 'git switch -c feature/test' 로 새 브랜치를 만든다",
          "hello.txt의 첫 줄을 'A입니다' 로 고치고 add·commit 한다",
          "'git switch main' 으로 돌아와 같은 첫 줄을 'B입니다' 로 고치고 add·commit 한다",
          "'git merge feature/test' 를 실행하면 충돌(CONFLICT) 메시지가 나타난다",
          "hello.txt를 열어 <<<<<<< 와 >>>>>>> 사이에서 남길 내용을 고르고 표시 기호를 모두 지운다",
          "'git add hello.txt' → 'git commit' 으로 충돌을 해결하고, 'git log --oneline --graph' 로 합쳐진 모양을 확인한다"
        ]
      },
      {
        "title": "Lab 3. GitHub에 올리고 받아오기",
        "steps": [
          "GitHub 로그인 후 New repository로 빈 저장소(README 없이)를 만든다",
          "안내에 나온 'git remote add origin 주소' 명령을 내 폴더에서 실행한다",
          "'git push -u origin main' 으로 커밋을 GitHub에 올리고 새로고침해 파일이 보이는지 확인한다",
          "GitHub 웹에서 README.md를 직접 한 줄 수정하고 Commit한다",
          "내 PC에서 'git pull' 을 실행해 웹에서 한 수정이 내려받아지는지 확인한다"
        ]
      }
    ],
    "homework": [
      "오늘 만든 팀 저장소에 본인 브랜치를 하나 더 만들어 좋아하는 명령어 3개를 정리한 cheatsheet.md를 추가하고 PR을 보내, 팀원 1명 이상에게 리뷰를 받아 머지하기",
      "git add, git commit, git switch, git merge, git push, git pull 6개 명령어의 역할을 각각 한 줄로 본인 말로 설명해 메모로 제출하기"
    ]
  },
  "transformer-1": {
    "topics": [
      {
        "h": "입력 처리 파이프라인",
        "items": [
          "텍스트 → 토큰화(BPE)",
          "토큰 → 정수 ID",
          "ID → 임베딩 벡터",
          "벡터 공간에서의 의미 거리"
        ]
      },
      {
        "h": "기존 시퀀스 모델의 한계",
        "items": [
          "RNN의 순차 처리",
          "장기 의존성(앞부분 망각) 문제",
          "병렬화가 어려워 느린 학습",
          "기울기 소실 현상"
        ]
      },
      {
        "h": "Attention 핵심 계산",
        "items": [
          "Query·Key·Value의 역할",
          "내적으로 관련도 점수 구하기",
          "sqrt(d) 스케일링의 이유",
          "softmax로 가중치 정규화"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 토큰화부터 임베딩까지 손으로 따라하기",
        "steps": [
          "transformers 설치 후 AutoTokenizer 불러오기",
          "내가 좋아하는 한 문장을 tokenize 해서 조각 확인",
          "input_ids를 출력해 정수로 바뀌는 과정 보기",
          "토큰 개수를 세고 왜 단어 수와 다른지 한 줄로 적기"
        ]
      },
      {
        "title": "Lab2. softmax 가중치 직접 만들기",
        "steps": [
          "넘파이로 임의 점수 5개 배열 만들기",
          "softmax 함수 정의하고 적용하기",
          "결과 합이 1인지 확인하기",
          "점수 하나를 키우면 확률이 어떻게 변하는지 관찰해 메모하기"
        ]
      }
    ],
    "homework": [
      "오늘 만든 Self-Attention 노트북에서 토큰을 4개(예: '나는 매일 학교에 간다')로 늘려 히트맵을 다시 그리고, 가장 강하게 연결된 토큰 쌍을 두 줄로 설명해 제출",
      "RNN과 Attention의 차이를 '회의록 읽기' 비유로 5문장 이내 정리해 제출"
    ]
  },
  "transformer-2": {
    "topics": [
      {
        "h": "Transformer 블록 구성요소",
        "items": [
          "Multi-Head Attention",
          "Positional Encoding",
          "Feed-Forward Network",
          "잔차연결(Residual)과 LayerNorm"
        ]
      },
      {
        "h": "구조와 대표 모델",
        "items": [
          "Encoder-only: BERT(이해·분류)",
          "Decoder-only: GPT(생성·대화)",
          "Encoder-Decoder: T5(번역·요약)",
          "구조 선택 기준"
        ]
      },
      {
        "h": "사전학습과 스케일링",
        "items": [
          "사전학습 목표(다음 토큰·마스크 예측)",
          "파인튜닝으로 업무 특화",
          "스케일링 법칙(크기↑ 성능↑)",
          "전이학습의 이점"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. pipeline으로 3가지 모델 맛보기",
        "steps": [
          "transformers 설치 후 pipeline 불러오기",
          "text-generation(gpt2)으로 문장 이어쓰기",
          "fill-mask(bert)로 빈칸 채우기",
          "두 모델의 출력 방식 차이를 두 줄로 적기"
        ]
      },
      {
        "title": "Lab2. Positional Encoding 직접 그려보기",
        "steps": [
          "realCode의 positional_encoding 함수 실행",
          "seq_len을 10과 50으로 바꿔 그림 비교",
          "차원 d_model을 16/64로 바꿔 무늬 변화 관찰",
          "'순서 정보가 왜 필요한가'를 한 문장으로 정리"
        ]
      },
      {
        "title": "Lab3. 내 문장 임베딩 유사도 측정",
        "steps": [
          "MiniLM 모델로 비슷한 문장 2개·다른 문장 1개 준비",
          "각 문장 임베딩 추출",
          "코사인 유사도로 짝지어 비교",
          "결과가 직관과 맞는지 확인하고 메모"
        ]
      }
    ],
    "homework": [
      "메인 실습 노트북에 내가 직접 고른 한국어 문장 5개를 넣어 임베딩 유사도 행렬(5x5)을 만들고, 가장 비슷한 두 문장과 가장 다른 두 문장을 찾아 제출",
      "BERT·GPT·T5를 각각 '어떤 업무에 쓰면 좋은지' 실무 예시 하나씩 들어 표로 정리해 제출"
    ]
  },
  "python-1": {
    "topics": [
      {
        "h": "Python 기본 문법",
        "items": [
          "변수와 동적 타이핑",
          "정수·실수·문자열·불리언 자료형",
          "산술·비교·논리 연산자",
          "문자열 슬라이싱과 메서드"
        ]
      },
      {
        "h": "자료구조와 제어",
        "items": [
          "리스트·튜플·딕셔너리·집합",
          "if/elif/else 조건 분기",
          "for/while 반복",
          "리스트·딕셔너리 컴프리헨션"
        ]
      },
      {
        "h": "함수와 NumPy 기초",
        "items": [
          "def로 함수 정의와 return",
          "인자·기본값·반환값",
          "NumPy 배열 생성과 인덱싱",
          "벡터 연산과 브로드캐스팅"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. Colab 노트북 첫 실행",
        "steps": [
          "colab.research.google.com 에 접속해 구글 계정으로 로그인한다.",
          "'새 노트' 버튼으로 빈 노트북을 만든다.",
          "첫 셀에 print('Hello, Python!') 을 입력하고 Shift+Enter 로 실행한다.",
          "출력 줄에 Hello, Python! 이 보이면 환경 준비 완료다."
        ]
      },
      {
        "title": "Lab2. 자료구조로 학생 점수 다루기",
        "steps": [
          "scores = {'국어': 90, '수학': 80, '영어': 70} 딕셔너리를 만든다.",
          "for 과목, 점수 in scores.items(): 로 한 과목씩 꺼내 출력한다.",
          "sum(scores.values()) / len(scores) 로 평균을 계산한다.",
          "평균이 80 이상이면 '합격', 아니면 '재시험'을 if 문으로 출력한다."
        ]
      },
      {
        "title": "Lab3. 함수로 묶어 재사용하기",
        "steps": [
          "def average(d): 형태로 딕셔너리를 받는 함수를 만든다.",
          "함수 안에서 평균을 계산해 return 으로 돌려준다.",
          "다른 점수 딕셔너리를 새로 만들어 average() 에 넣어 본다.",
          "두 결과가 모두 잘 나오면 재사용 가능한 함수 완성이다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 clean_sales 함수에 '수량이 0이면 건너뛰기' 기능을 추가하고, 결과를 주석으로 설명해 노트북으로 제출하기.",
      "좋아하는 과일 5종의 이름·단가·수량을 직접 딕셔너리/리스트로 만들어 총매출과 평균 단가를 출력하는 코드 작성하기."
    ]
  },
  "python-2": {
    "topics": [
      {
        "h": "Pandas 데이터 적재와 선택",
        "items": [
          "Series·DataFrame 구조",
          "read_csv로 파일 적재",
          "loc·iloc 인덱싱",
          "열 선택과 조건 필터링"
        ]
      },
      {
        "h": "데이터 정제와 변형",
        "items": [
          "fillna·dropna 결측치 처리",
          "이상치 탐지와 제거",
          "sort_values 정렬",
          "groupby·merge·pivot 집계와 재구조화"
        ]
      },
      {
        "h": "시각화와 EDA",
        "items": [
          "matplotlib 기본 플롯",
          "seaborn 통계 그래프",
          "분포·상관 시각화",
          "인사이트 도출과 정리"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. CSV 없이 예제 데이터 불러오기",
        "steps": [
          "셀에 import seaborn as sns 를 입력해 실행한다.",
          "df = sns.load_dataset('tips') 로 식당 팁 데이터를 불러온다.",
          "df.head() 로 앞 5줄을, df.shape 으로 행·열 개수를 확인한다.",
          "df.describe() 로 숫자 열의 평균·최댓값 같은 요약 통계를 살펴본다."
        ]
      },
      {
        "title": "Lab2. 결측치 처리와 집계",
        "steps": [
          "df.isnull().sum() 으로 어떤 열에 빈 칸이 몇 개인지 센다.",
          "빈 칸이 있는 열을 df['열'].fillna(0) 으로 채운다.",
          "df.groupby('day')['total_bill'].mean() 으로 요일별 평균 계산서를 구한다.",
          "결과 표를 보고 어느 요일 매출이 가장 높은지 확인한다."
        ]
      },
      {
        "title": "Lab3. 한 장의 그래프로 인사이트 보기",
        "steps": [
          "import seaborn as sns, matplotlib.pyplot as plt 를 불러온다.",
          "sns.boxplot(data=df, x='day', y='total_bill') 로 요일별 분포를 그린다.",
          "plt.title('요일별 계산서 분포') 로 제목을 단다.",
          "plt.show() 로 그래프를 띄우고 어느 요일이 편차가 큰지 관찰한다."
        ]
      }
    ],
    "homework": [
      "seaborn의 tips 데이터로 '성별·흡연 여부에 따른 평균 팁 비율'을 groupby로 집계하고 막대그래프로 그려 노트북 제출하기.",
      "오늘 배운 결측치 처리 3가지 방법(중앙값/평균/0 채우기)을 비교하고 어떤 상황에 무엇이 적절한지 마크다운으로 3줄 정리하기."
    ]
  },
  "prompt-1": {
    "topics": [
      {
        "h": "프롬프트 패턴 한눈에",
        "items": [
          "Zero-shot: 예시 없이 바로 지시하기",
          "Few-shot: 견본 1~5개를 보여 주고 따라 하게 하기",
          "Chain-of-Thought: 단계별 풀이를 유도해 정확도 높이기",
          "Role prompting: 전문가 역할을 부여해 답의 깊이 조절",
          "출력 형식 지정: JSON·표·번호목록 등으로 결과 고정"
        ]
      },
      {
        "h": "메시지 3종 역할 분담",
        "items": [
          "System: 변하지 않는 규칙·역할·말투를 정하는 칸",
          "User: 그때그때의 질문과 자료를 넣는 칸",
          "Assistant: AI의 답(이전 대화 맥락으로 재활용)",
          "대화 이력을 messages 리스트에 쌓아 문맥 유지"
        ]
      },
      {
        "h": "컨텍스트·비용 최적화",
        "items": [
          "긴 문서는 핵심만 요약해 넣기(컨텍스트 압축)",
          "중요한 지시는 맨 앞·맨 뒤에 배치하기",
          "예시 개수를 줄여 토큰 절약하기",
          "temperature를 낮춰 일관·사실적 답 유도",
          "환각 방지: '모르면 모른다고 답하라' 제약 걸기"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 — 막연한 프롬프트를 4요소로 고치기",
        "steps": [
          "Colab에서 '이 글 정리해줘' 같은 한 줄 프롬프트로 임의의 뉴스 기사를 요약해 결과를 본다.",
          "결과가 왜 아쉬운지(형식 제각각·너무 길다 등) 한 줄로 적는다.",
          "역할('너는 기자다'), 지시('3문장 요약'), 예시(요약 견본 1개), 제약('존댓말·100자 이내')을 차례로 추가한다.",
          "고친 프롬프트로 다시 요약해 처음 결과와 비교하고 무엇이 좋아졌는지 적는다."
        ]
      },
      {
        "title": "Lab 2 — Few-shot으로 분류기 만들기",
        "steps": [
          "고객 문의 5개를 준비하고 '문의 -> 분류(환불/배송/기타)' 예시 2개를 프롬프트에 적는다.",
          "나머지 3개 문의를 이어 붙이고 빈칸으로 둔 뒤 API를 호출한다.",
          "AI가 예시 형식대로 한 단어 분류를 내는지 확인한다.",
          "예시를 0개로 줄였을 때(Zero-shot)와 결과 일관성을 비교한다."
        ]
      },
      {
        "title": "Lab 3 — 환각 잡아내기",
        "steps": [
          "회사 소개 같은 짧은 사실 자료를 user 칸에 넣고 '자료에 있는 내용만으로 답하라'는 제약을 단다.",
          "자료에 없는 질문(예: '대표 전화번호는?')을 던져 본다.",
          "제약이 없을 때 vs 있을 때 AI가 지어내는지 '모른다'고 하는지 비교한다.",
          "가장 환각을 잘 막은 프롬프트 문장을 팀 노트에 기록한다."
        ]
      }
    ],
    "homework": [
      "본인 실제 업무(보고서 초안·이메일 회신·코드 주석 등) 하나를 골라, 4요소를 갖춘 프롬프트 v1을 만들고 평가표로 채점한 뒤 개선한 v2까지 한 노트북에 정리해 제출한다.",
      "같은 작업을 Zero-shot·Few-shot·Chain-of-Thought 세 방식으로 각각 시도해 결과 품질과 토큰 수를 비교하고, 어떤 패턴이 왜 좋았는지 3줄 소감을 적는다."
    ]
  },
  "vue-1": {
    "topics": [
      {
        "h": "프로젝트 시작 도구",
        "items": [
          "Node.js와 npm의 역할",
          "Vite로 프로젝트 생성",
          "npm run dev / build 명령",
          "폴더 구조(src·public·index.html)"
        ]
      },
      {
        "h": "템플릿 문법 기본",
        "items": [
          "보간 {{ }}",
          "v-bind(속성 연결, : 단축)",
          "v-on(이벤트, @ 단축)",
          "v-if·v-else·v-show 차이",
          "v-for와 key"
        ]
      },
      {
        "h": "반응형 상태",
        "items": [
          "ref와 .value",
          "reactive 객체",
          "computed 파생값",
          "watch 변화 감지",
          "v-model 양방향 바인딩"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 첫 Vue 프로젝트 띄우기",
        "steps": [
          "터미널을 열고 작업 폴더로 이동한다",
          "npm create vite@latest my-first-vue -- --template vue 를 입력한다",
          "cd my-first-vue 후 npm install 을 실행한다",
          "npm run dev 를 실행하고 표시된 http://localhost:5173 주소를 브라우저로 연다",
          "기본 화면이 뜨면 성공이며, 터미널은 Ctrl+C로 끌 수 있다"
        ]
      },
      {
        "title": "Lab 2. 인사말을 실시간으로 바꾸기",
        "steps": [
          "src/App.vue 의 <script setup> 에 const name = ref('') 를 추가한다(ref import 필요)",
          "<template> 에 <input v-model=\"name\"> 를 넣는다",
          "그 아래 <p>안녕하세요, {{ name }}님!</p> 를 추가한다",
          "브라우저에서 이름을 타이핑하면 문장이 글자마다 즉시 바뀌는지 확인한다",
          "빈 칸일 때 기본 인사가 나오도록 {{ name || '손님' }} 으로 바꿔본다"
        ]
      }
    ],
    "homework": [
      "오늘 만든 To-Do 카운터에 '완료한 항목 삭제' 버튼을 추가해 동작 화면을 캡처해 제출한다",
      "ref와 reactive의 차이를 본인 말로 3문장 이내로 정리해 제출한다"
    ]
  },
  "vue-2": {
    "topics": [
      {
        "h": "컴포넌트 통신",
        "items": [
          "defineProps로 받기",
          "defineEmits로 신호 보내기",
          "단방향 데이터 흐름",
          "props 타입·기본값 지정"
        ]
      },
      {
        "h": "콘텐츠 분배",
        "items": [
          "기본 슬롯",
          "이름 있는 슬롯(named slot)",
          "슬롯 기본값",
          "부모-자식 역할 나누기"
        ]
      },
      {
        "h": "로직 구성과 재사용",
        "items": [
          "setup 블록",
          "라이프사이클 훅(onMounted·onUnmounted)",
          "컴포저블 useXxx 패턴",
          "watch·computed 심화"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 알림 배지 컴포넌트 만들기",
        "steps": [
          "components 폴더에 Badge.vue 를 만든다",
          "defineProps({ count: Number }) 로 숫자를 받는다",
          "<template> 에 <span class=\"badge\">{{ count }}</span> 를 작성한다",
          "count가 0이면 v-if=\"count > 0\" 으로 배지를 숨긴다",
          "부모에서 <Badge :count=\"3\" /> 로 사용해 숫자 3이 보이는지 확인한다"
        ]
      },
      {
        "title": "Lab 2. 자식 버튼이 부모에게 신호 보내기",
        "steps": [
          "LikeButton.vue 를 만들고 defineEmits(['liked']) 를 선언한다",
          "<button @click=\"$emit('liked')\">좋아요</button> 를 작성한다",
          "부모 App.vue 에서 const likes = ref(0) 을 만든다",
          "<LikeButton @liked=\"likes++\" /> 로 연결한다",
          "자식 버튼을 누를 때마다 부모의 likes 숫자가 오르는지 확인한다"
        ]
      }
    ],
    "homework": [
      "ProductCard에 '품절' 상태(soldOut props)를 추가해 품절이면 담기 버튼을 비활성화하고 캡처해 제출한다",
      "props와 emit이 각각 어떤 방향으로 흐르는지 그림 또는 글로 설명해 제출한다"
    ]
  },
  "vue-3": {
    "topics": [
      {
        "h": "Vue Router",
        "items": [
          "createRouter·createWebHistory",
          "router-link와 router-view",
          "동적 파라미터 :id",
          "중첩 라우트(children)",
          "네비게이션 가드 beforeEach"
        ]
      },
      {
        "h": "Pinia 스토어",
        "items": [
          "defineStore",
          "state 정의",
          "getters 계산값",
          "actions로 변경",
          "컴포넌트에서 store 사용"
        ]
      },
      {
        "h": "상태 공유 패턴",
        "items": [
          "전역 vs 지역 상태 구분",
          "props 대신 store 쓰는 경우",
          "스토어 모듈 분리",
          "라우트와 스토어 연동"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 두 페이지 왕복 라우팅",
        "steps": [
          "npm install vue-router@4 로 설치한다",
          "router/index.js 에 / 와 /about 두 경로를 등록한다",
          "main.js 에서 app.use(router) 를 추가한다",
          "App.vue 에 router-link 2개와 router-view 1개를 넣는다",
          "버튼을 눌러 두 페이지가 깜빡임 없이 전환되는지 확인한다"
        ]
      },
      {
        "title": "Lab 2. Pinia 카운터 스토어 공유",
        "steps": [
          "npm install pinia 후 main.js 에 app.use(createPinia()) 를 추가한다",
          "stores/counter.js 에 state: () => ({ n: 0 }) 와 increase 액션을 만든다",
          "A 컴포넌트에서 const c = useCounterStore(); 버튼으로 c.increase() 한다",
          "B 컴포넌트에서 같은 스토어의 c.n 을 화면에 표시한다",
          "A에서 올린 숫자가 B에서도 똑같이 보이는지 확인한다"
        ]
      }
    ],
    "homework": [
      "장바구니에 removeItem을 연결해 담은 상품을 삭제하고, 총 가격(totalPrice)이 함께 줄어드는 화면을 캡처해 제출한다",
      "SPA가 전통적 웹사이트와 어떻게 다른지 3문장으로 정리해 제출한다"
    ]
  },
  "vue-4": {
    "topics": [
      {
        "h": "API 연동",
        "items": [
          "fetch와 axios 차이",
          "GET·POST 요청",
          "async/await",
          "로딩·에러·성공 상태 관리",
          "axios 공통 클라이언트"
        ]
      },
      {
        "h": "폼과 설정",
        "items": [
          "v-model 폼 처리",
          "유효성 검사",
          ".env 환경변수",
          "VITE_ 접두사 규칙",
          "API 베이스 주소 분리"
        ]
      },
      {
        "h": "빌드와 배포",
        "items": [
          "npm run build와 dist",
          "npm run preview 점검",
          "정적 호스팅(GitHub Pages·Netlify)",
          "SPA 새로고침 404 대응",
          "base 경로 설정"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 공개 API에서 사용자 목록 불러오기",
        "steps": [
          "npm install axios 로 설치한다",
          "컴포넌트에 const users = ref([]) 를 만든다",
          "onMounted에서 axios.get('https://jsonplaceholder.typicode.com/users') 를 호출한다",
          "응답의 res.data 를 users.value 에 담는다",
          "v-for로 사용자 이름 목록이 화면에 뜨는지 확인한다"
        ]
      },
      {
        "title": "Lab 2. 빌드하고 미리보기로 점검하기",
        "steps": [
          "터미널에서 npm run build 를 실행한다",
          "프로젝트에 dist 폴더가 생겼는지 확인한다",
          "npm run preview 를 실행한다",
          "표시된 주소를 브라우저로 열어 실제 배포본처럼 동작하는지 본다",
          "목록·폼이 정상 동작하면 dist 폴더를 호스팅에 올릴 준비가 끝난 것이다"
        ]
      }
    ],
    "homework": [
      "미니 SPA를 GitHub Pages 또는 Netlify에 실제 배포하고 공개 URL과 동작 화면을 제출한다",
      "로딩·에러·성공 3가지 상태를 화면에서 각각 어떻게 보여줬는지 캡처와 함께 1문단으로 정리해 제출한다"
    ]
  },
  "webproject-1": {
    "topics": [
      {
        "h": "기획 산출물",
        "items": [
          "한 줄 서비스 소개",
          "사용자 시나리오 3개",
          "와이어프레임(화면 3개)",
          "기능 명세 목록"
        ]
      },
      {
        "h": "설계 산출물",
        "items": [
          "데이터 모델 표",
          "API 목록(경로·메서드)",
          "프론트/백 구조도",
          "기술 스택 선택 이유"
        ]
      },
      {
        "h": "팀 세팅",
        "items": [
          "역할 분담",
          "3일 일정표",
          "GitHub 저장소",
          "커밋 규칙 합의"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 내 손으로 와이어프레임 만들기",
        "steps": [
          "A4 종이 한 장에 네모를 3개 그린다(목록/추가폼/상세).",
          "각 네모 안에 들어갈 버튼과 글자를 글씨로 적는다.",
          "화살표로 '추가 버튼을 누르면 추가폼으로 간다' 같은 이동 흐름을 그린다.",
          "사진으로 찍어 팀 저장소의 docs 폴더에 올린다."
        ]
      },
      {
        "title": "Lab2. Vue 프로젝트 첫 실행",
        "steps": [
          "터미널을 열고 작업 폴더로 이동한다.",
          "npm create vite@latest my-todo -- --template vue 를 실행한다.",
          "cd my-todo && npm install 로 라이브러리를 설치한다.",
          "npm run dev 후 브라우저에서 화면이 뜨는지 확인한다.",
          "src/App.vue 의 제목 글자를 바꿔 화면이 즉시 변하는 것을 확인한다."
        ]
      }
    ],
    "homework": [
      "우리 팀 서비스의 사용자 시나리오를 5개로 늘려 정리해오기",
      "와이어프레임을 Figma 또는 종이로 완성해 저장소에 업로드하기"
    ]
  },
  "webproject-2": {
    "topics": [
      {
        "h": "컴포넌트 구성",
        "items": [
          "TodoForm(입력)",
          "TodoList(목록)",
          "TodoItem(항목)",
          "props·emit 연결"
        ]
      },
      {
        "h": "핵심 기능",
        "items": [
          "추가(push)",
          "완료 체크(v-model done)",
          "삭제(filter)",
          "남은 개수 표시"
        ]
      },
      {
        "h": "데이터 연동",
        "items": [
          "fetch 비동기 호출",
          "로딩 표시",
          "에러 처리",
          "폼 유효성 검사"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 입력 폼으로 할 일 추가하기",
        "steps": [
          "App.vue 에 input과 button을 추가한다.",
          "input에 v-model=\"text\" 를 붙여 입력값을 상태와 묶는다.",
          "button에 @click=\"addTodo\" 를 붙인다.",
          "addTodo 함수에서 todos.value.push 로 항목을 넣는다.",
          "추가 후 입력창이 비워지는지 확인한다."
        ]
      },
      {
        "title": "Lab2. 완료 체크와 취소선 적용",
        "steps": [
          "각 항목에 type=checkbox 입력을 둔다.",
          "v-model=\"t.done\" 으로 완료 여부를 묶는다.",
          ":style 로 done이 true면 취소선을 적용한다.",
          "체크했을 때 글자에 줄이 그어지는지 확인한다."
        ]
      },
      {
        "title": "Lab3. 가짜 API에서 초기 목록 불러오기",
        "steps": [
          "onMounted 안에서 fetch로 데이터를 요청한다.",
          "받은 데이터를 todos.value 에 넣는다.",
          "로딩 중에는 '불러오는 중...' 글자를 보여준다.",
          "화면 진입 시 목록이 자동으로 채워지는지 확인한다."
        ]
      }
    ],
    "homework": [
      "할 일에 '마감일' 입력칸을 추가하고 화면에 함께 표시해오기",
      "완료된 할 일만 보여주는 필터 버튼을 만들어보기"
    ]
  },
  "webproject-3": {
    "topics": [
      {
        "h": "마무리 작업",
        "items": [
          "통합 테스트",
          "버그 수정",
          "코드 정리(리팩터링)",
          "README 작성"
        ]
      },
      {
        "h": "빌드·배포",
        "items": [
          "base 경로 설정",
          "npm run build",
          "GitHub Pages 배포",
          "배포 주소·모바일 확인"
        ]
      },
      {
        "h": "발표·회고",
        "items": [
          "3분 시연 시나리오",
          "발표 자료",
          "KPT 회고",
          "개선점 정리"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 빌드해서 dist 만들기",
        "steps": [
          "터미널에서 npm run build 를 실행한다.",
          "프로젝트 폴더에 dist 폴더가 생겼는지 확인한다.",
          "npm run preview 로 빌드 결과를 미리 본다.",
          "기능이 개발 때와 똑같이 동작하는지 확인한다."
        ]
      },
      {
        "title": "Lab2. GitHub Pages에 배포하기",
        "steps": [
          "vite.config.js 에 base를 저장소 이름에 맞게 설정한다.",
          ".github/workflows/deploy.yml 파일을 추가한다.",
          "git push 로 main 브랜치에 올린다.",
          "저장소 Settings > Pages에서 배포 상태와 주소를 확인한다.",
          "배포 주소를 열어 실제 동작을 확인한다."
        ]
      }
    ],
    "homework": [
      "배포 주소를 README 상단에 넣고, 친구에게 보내 직접 써보게 한 뒤 피드백 한 가지 받아오기",
      "KPT 회고를 팀별로 작성해 다음 프로젝트 개선점 3가지 정리하기"
    ]
  },
  "spring-ai-1": {
    "topics": [
      {
        "h": "Spring AI 시작하기",
        "items": [
          "Spring Initializr로 프로젝트 생성",
          "Spring AI BOM과 Starter 의존성",
          "application.properties 환경설정",
          "API 키 발급과 환경변수 관리"
        ]
      },
      {
        "h": "핵심 추상화",
        "items": [
          "ChatModel vs ChatClient 차이",
          "메서드 체이닝(prompt·user·call·content)",
          "System / User 메시지 역할",
          "defaultSystem으로 페르소나 지정"
        ]
      },
      {
        "h": "프로바이더 연동",
        "items": [
          "OpenAI Starter 연동",
          "Anthropic으로 모델 교체",
          "모델 옵션(model·temperature) 설정",
          "응답 받아 REST로 노출"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 프로젝트 만들고 서버 띄우기",
        "steps": [
          "start.spring.io 접속 → Gradle·Java 17 선택",
          "Dependencies에 Spring Web, OpenAI 추가 후 GENERATE",
          "IDE로 열고 Gradle 동기화 대기",
          "./gradlew bootRun 실행 → 8080 포트 기동 확인",
          "브라우저에서 localhost:8080 접속해 에러 페이지(정상 기동)인지 확인"
        ]
      },
      {
        "title": "Lab 2. 모델 프로바이더 바꿔보기",
        "steps": [
          "build.gradle에서 openai 스타터를 anthropic 스타터로 교체",
          "application.properties에 spring.ai.anthropic.api-key 추가",
          "model 옵션을 claude 계열로 변경",
          "기존 ChatController 코드를 그대로 두고 다시 실행",
          "/chat 호출 결과가 여전히 정상인지 확인하고 '코드를 안 바꿔도 된다'는 점 체감"
        ]
      }
    ],
    "homework": [
      "/chat 엔드포인트에 system 메시지를 'IT 면접관'으로 바꿔, 사용자가 보낸 직무에 맞는 면접 질문 3개를 돌려주도록 수정해 제출하기",
      "OpenAI와 Anthropic 두 프로바이더로 같은 질문을 던져 답변 차이를 표로 비교 정리하기"
    ]
  },
  "spring-ai-2": {
    "topics": [
      {
        "h": "RAG 기초",
        "items": [
          "LLM 한계와 환각 문제",
          "RAG 전체 파이프라인 흐름",
          "오픈북 비유로 이해하기",
          "근거 기반 답변의 가치"
        ]
      },
      {
        "h": "임베딩과 벡터스토어",
        "items": [
          "EmbeddingModel로 벡터화",
          "pgvector 도커로 띄우기",
          "VectorStore 자동 설정",
          "similaritySearch와 topK"
        ]
      },
      {
        "h": "문서 처리 파이프라인",
        "items": [
          "TextReader로 문서 읽기",
          "TokenTextSplitter로 청킹",
          "vectorStore.add로 적재",
          "Retrieval 결합 프롬프트 구성"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. pgvector 띄우고 연결하기",
        "steps": [
          "docker run으로 pgvector 컨테이너 실행",
          "build.gradle에 pgvector starter 추가",
          "application.properties에 datasource·initialize-schema 설정",
          "앱 실행 후 vector_store 테이블이 생성됐는지 DB에서 확인",
          "에러 없이 기동되면 연결 성공"
        ]
      },
      {
        "title": "Lab 2. 적재 전·후 답변 비교",
        "steps": [
          "문서를 적재하지 않은 상태로 /ask 호출 → '모른다' 또는 엉뚱한 답 확인",
          "샘플 문서를 적재하는 코드 1회 실행",
          "같은 질문으로 /ask 다시 호출",
          "이번엔 문서 근거 답변이 나오는지 비교",
          "두 결과를 캡처해 차이 기록"
        ]
      }
    ],
    "homework": [
      "자신이 만든 README나 자기소개 문서를 적재해 '나에 대한 질문'에 답하는 개인 RAG 챗봇으로 바꿔 제출하기",
      "TokenTextSplitter의 청크 크기를 크게/작게 바꿔가며 답변 품질이 어떻게 달라지는지 2가지 이상 비교하기"
    ]
  },
  "spring-ai-3": {
    "topics": [
      {
        "h": "Function Calling",
        "items": [
          "Tool(Function) 정의와 record 입출력",
          "@Description으로 용도 설명",
          "@Bean 등록과 .tools() 연결",
          "LLM의 자동 호출 판단 흐름"
        ]
      },
      {
        "h": "구조화 출력과 스트리밍",
        "items": [
          ".entity로 DTO 매핑",
          "JSON 응답으로 노출",
          "stream()과 Flux",
          "타이핑 효과 UX"
        ]
      },
      {
        "h": "안정화와 서비스 통합",
        "items": [
          "try-catch 예외 처리",
          "@Retryable 재시도",
          "API 키·비용·보안 고려",
          "실서비스 통합 체크리스트"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 도구를 부르게 만들기",
        "steps": [
          "ToolConfig에 currentWeather Function 작성",
          "@Bean과 @Description 추가",
          "컨트롤러에서 .tools(\"currentWeather\") 연결",
          "/assistant?message=부산 날씨 호출",
          "로그에서 도구가 실제 호출됐는지 확인"
        ]
      },
      {
        "title": "Lab 2. 객체로 받아 JSON 응답하기",
        "steps": [
          "응답용 record(WeatherReport) 정의",
          "컨트롤러 반환을 .entity(WeatherReport.class)로 변경",
          "메서드 반환 타입을 record로 바꿔 JSON 자동 직렬화",
          "/assistant 호출 결과가 JSON 형태인지 확인",
          "필드 값이 올바르게 채워졌는지 점검"
        ]
      },
      {
        "title": "Lab 3. 실패에도 안 죽는 서비스",
        "steps": [
          "외부 호출부를 try-catch로 감싸기",
          "실패 시 사용자용 안내 메시지 반환",
          "@Retryable로 자동 재시도 1~2회 설정",
          "일부러 잘못된 키로 실행해 동작 확인",
          "서버가 멈추지 않고 메시지를 주는지 검증"
        ]
      }
    ],
    "homework": [
      "currentWeather 외에 '환율 조회' 또는 '간단 계산기' Tool을 하나 더 만들어 LLM이 상황에 맞게 골라 쓰게 하고 시연 캡처 제출하기",
      "3일간 만든 채팅·RAG·Tool 기능을 하나의 프로젝트로 합쳐 '문서도 알고 도구도 쓰는 AI 비서' 형태로 정리하고 README에 사용법 작성하기"
    ]
  },
  "sllm-1": {
    "topics": [
      {
        "h": "대표 오픈소스 sLLM 가족",
        "items": [
          "Meta Llama 3.x (1B·3B·8B)",
          "Alibaba Qwen2.5 (0.5B~7B, 한국어 양호)",
          "Google Gemma 2 (2B·9B)",
          "Microsoft Phi-3 mini (3.8B)"
        ]
      },
      {
        "h": "로컬 서빙 도구별 특징",
        "items": [
          "Ollama: 설치·사용이 가장 쉬움(초보 추천)",
          "vLLM: 빠른 대량 추론, 서버 운영용",
          "HuggingFace transformers: 코드로 세밀 제어",
          "llama.cpp/GGUF: CPU·저사양에서도 구동"
        ]
      },
      {
        "h": "양자화 단계 한눈에",
        "items": [
          "FP16/BF16: 원본에 가까운 고정밀",
          "INT8: 절반 수준 경량화",
          "Q4 (4비트): 가장 흔한 경량 옵션",
          "정밀도↓ → 용량·메모리↓, 성능 약간↓"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. Ollama로 모델 3종 비교 체험",
        "steps": [
          "ollama pull qwen2.5:0.5b 와 ollama pull gemma2:2b 두 모델을 내려받는다",
          "같은 질문 '대한민국의 수도는?' 을 두 모델에 각각 물어 답을 비교한다",
          "ollama list 로 두 모델의 용량(GB)을 확인해 크기 차이를 기록한다",
          "작은 모델과 큰 모델의 답변 품질·속도 차이를 한 줄 메모로 정리한다"
        ]
      },
      {
        "title": "Lab2. 양자화 모델 메모리 사용량 확인",
        "steps": [
          "ollama run qwen2.5:0.5b 로 모델을 실행한 상태로 둔다",
          "작업관리자(Windows) 또는 활성 상태 보기(Mac)를 열어 메모리 사용량을 살펴본다",
          "질문을 한 번 던지고 메모리가 얼마나 올라가는지 관찰한다",
          "같은 모델의 더 큰 버전과 비교해 양자화가 왜 필요한지 한 줄로 적는다"
        ]
      }
    ],
    "homework": [
      "Ollama로 한국어가 잘 되는 sLLM 1개를 골라, 같은 질문 3개에 대한 답변을 표로 정리하고 어떤 점이 부족한지 한 단락으로 적어 제출",
      "내가 만들 도메인 특화 챗봇(예: 사내 규정 안내, 메뉴 추천)의 주제를 정하고, 왜 대형 LLM 대신 sLLM이 적합한지 3줄로 설명해 제출"
    ]
  },
  "sllm-2": {
    "topics": [
      {
        "h": "좋은 학습 데이터의 조건",
        "items": [
          "지시-답변 형식이 일관됨",
          "말투·길이가 통일됨",
          "오타·중복·모순 없음",
          "다양한 질문 유형 포함"
        ]
      },
      {
        "h": "핵심 하이퍼파라미터",
        "items": [
          "r(랭크): 보조 행렬 크기, 보통 8~16",
          "learning_rate: 2e-4 부근에서 시작",
          "epoch: 3 안팎(많으면 과적합)",
          "batch_size: GPU 메모리에 맞춰 2~4"
        ]
      },
      {
        "h": "파인튜닝 결과 점검 포인트",
        "items": [
          "학습 전후 같은 질문 비교",
          "원하던 말투·지식 반영 여부",
          "엉뚱한 답(환각) 늘지 않았나",
          "처음 보는 질문에도 잘 답하나"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 나만의 instruction 데이터 30개 만들기",
        "steps": [
          "특화하고 싶은 주제(예: 카페 메뉴 안내)를 하나 정한다",
          "표 형식으로 '질문'과 '모범 답변' 30줄을 작성한다",
          "앞 예제 코드를 활용해 train.jsonl 파일로 저장한다",
          "json.loads로 한 줄을 다시 읽어 형식이 깨지지 않았는지 확인한다"
        ]
      },
      {
        "title": "Lab2. 학습 전후 답변 비교 평가",
        "steps": [
          "파인튜닝 전 base 모델에 테스트 질문 5개를 던져 답을 기록한다",
          "파인튜닝 후 모델에 같은 질문 5개를 던져 답을 기록한다",
          "두 답변을 나란히 표로 정리해 무엇이 좋아졌는지 표시한다",
          "기대만큼 안 바뀐 항목은 데이터/에폭을 어떻게 고칠지 메모한다"
        ]
      }
    ],
    "homework": [
      "내가 만든 instruction 데이터로 LoRA 파인튜닝을 끝까지 수행하고, 학습 전/후 답변 비교 표와 짧은 회고(무엇이 좋아졌고 무엇이 아쉬운지)를 제출",
      "데이터 개수(예: 10개 vs 40개) 또는 에폭(1 vs 3)을 바꿔 두 번 학습한 뒤 결과 차이를 관찰하고 한 단락으로 정리해 제출"
    ]
  },
  "ml-dl-1": {
    "topics": [
      {
        "h": "학습의 종류",
        "items": [
          "지도학습(분류·회귀)",
          "비지도학습(군집·차원축소)",
          "강화학습(보상 기반)",
          "준지도·자기지도 학습 맛보기"
        ]
      },
      {
        "h": "대표 분류 알고리즘",
        "items": [
          "로지스틱 회귀",
          "결정트리",
          "랜덤포레스트",
          "k-최근접이웃(KNN)",
          "서포트벡터머신(SVM)"
        ]
      },
      {
        "h": "모델 평가 도구",
        "items": [
          "정확도(accuracy)",
          "정밀도·재현율·F1",
          "혼동행렬(confusion matrix)",
          "ROC 곡선과 AUC"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 와인 데이터로 분류 모델 바꿔보기",
        "steps": [
          "'from sklearn.datasets import load_wine' 으로 와인 데이터를 불러온다",
          "train_test_split 으로 8:2 분할한다",
          "LogisticRegression 으로 학습하고 정확도를 출력한다",
          "모델을 RandomForestClassifier 로 바꿔 다시 학습한다",
          "두 모델의 정확도를 비교하고 어느 쪽이 좋은지 한 줄로 적는다"
        ]
      },
      {
        "title": "Lab 2. 과적합을 눈으로 확인하기",
        "steps": [
          "DecisionTreeClassifier 를 max_depth=None 으로 학습한다",
          "train 정확도와 test 정확도를 각각 출력한다",
          "max_depth 를 1,3,5,10 으로 바꿔가며 두 정확도를 표로 모은다",
          "train은 높은데 test가 낮아지는 구간을 찾아 과적합 지점을 표시한다"
        ]
      }
    ],
    "homework": [
      "scikit-learn 의 load_breast_cancer 데이터로 분류 모델을 만들고, 정확도와 classification_report 를 캡처해 제출한다.",
      "정밀도와 재현율을 일상 비유(스팸 메일 분류 등)로 3문장 이내로 설명해 제출한다."
    ]
  },
  "ml-dl-2": {
    "topics": [
      {
        "h": "신경망 구성요소",
        "items": [
          "입력층·은닉층·출력층",
          "가중치와 편향(bias)",
          "활성화 함수(ReLU/Sigmoid/Softmax)",
          "층(layer) 쌓기"
        ]
      },
      {
        "h": "학습의 3요소",
        "items": [
          "손실 함수(CrossEntropy/MSE)",
          "옵티마이저(SGD/Adam)",
          "학습률(learning rate)",
          "에폭과 배치"
        ]
      },
      {
        "h": "PyTorch 핵심 객체",
        "items": [
          "Tensor 와 autograd",
          "nn.Module / nn.Sequential",
          "DataLoader 와 Dataset",
          "loss.backward() 와 optimizer.step()"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 학습률을 바꿔 손실 곡선 비교하기",
        "steps": [
          "MNIST 학습 코드에서 lr 을 0.01 로 바꿔 3 에폭 학습한다",
          "에폭별 평균 손실을 리스트에 저장한다",
          "lr 을 0.0001 로 바꿔 같은 방식으로 손실을 저장한다",
          "두 손실 리스트를 matplotlib 으로 함께 그린다",
          "학습률이 너무 크거나 작을 때 손실이 어떻게 달라지는지 한 줄로 적는다"
        ]
      },
      {
        "title": "Lab 2. 은닉층을 늘려 성능 비교하기",
        "steps": [
          "은닉층이 1개(128)인 모델의 테스트 정확도를 기록한다",
          "은닉층을 2개(128→64)로 늘린 모델을 만든다",
          "동일 조건으로 학습 후 테스트 정확도를 기록한다",
          "두 모델의 정확도와 학습 시간을 표로 비교한다"
        ]
      }
    ],
    "homework": [
      "MNIST 모델의 에폭 수를 3에서 5로 늘려 테스트 정확도가 어떻게 변하는지 기록하고 제출한다.",
      "순전파와 역전파의 차이를 야구·축구 등 일상 비유로 4문장 이내로 설명해 제출한다."
    ]
  },
  "ml-dl-3": {
    "topics": [
      {
        "h": "대표 딥러닝 아키텍처",
        "items": [
          "CNN(이미지 인식)",
          "RNN/LSTM(시퀀스·시계열)",
          "Transformer(언어·범용)",
          "용도별 선택 기준"
        ]
      },
      {
        "h": "과적합 방지 기법",
        "items": [
          "드롭아웃(Dropout)",
          "L2 정규화(weight decay)",
          "데이터 증강",
          "조기종료(Early Stopping)"
        ]
      },
      {
        "h": "성능을 끌어올리는 방법",
        "items": [
          "하이퍼파라미터 튜닝(학습률·배치)",
          "전이학습(Transfer Learning)",
          "학습률 스케줄링",
          "앙상블 맛보기"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 드롭아웃 유무로 과적합 비교하기",
        "steps": [
          "은닉층 신경망을 드롭아웃 없이 학습해 train/test 정확도를 기록한다",
          "같은 모델에 nn.Dropout(0.3) 을 추가한다",
          "동일 조건으로 다시 학습해 train/test 정확도를 기록한다",
          "드롭아웃이 train과 test 정확도 격차를 줄였는지 표로 비교한다",
          "결과를 한 줄로 해석해 적는다"
        ]
      },
      {
        "title": "Lab 2. 전이학습으로 빠르게 성능 올리기",
        "steps": [
          "models.resnet18 을 사전학습 가중치로 불러온다",
          "backbone 파라미터를 모두 freeze 한다",
          "마지막 fc 층을 우리 클래스 수에 맞게 교체한다",
          "마지막 층만 1~2 에폭 학습한다",
          "처음부터 학습한 모델과 정확도·소요시간을 비교한다"
        ]
      }
    ],
    "homework": [
      "CNN, RNN, Transformer 가 각각 어떤 데이터(이미지·시퀀스·언어)에 잘 맞는지 표로 정리해 제출한다.",
      "전이학습이 '왜' 적은 데이터로도 잘 되는지 일상 비유를 들어 4문장 이내로 설명해 제출한다."
    ]
  },
  "feature-1": {
    "topics": [
      {
        "h": "데이터 정제 단계",
        "items": [
          "결측치 처리: 삭제 vs 평균/중앙값/최빈값 대체",
          "이상치(outlier) 탐지: IQR·박스플롯 기준",
          "중복 행 제거와 자료형(dtype) 정리"
        ]
      },
      {
        "h": "피처 변환 기법",
        "items": [
          "스케일링: StandardScaler·MinMaxScaler",
          "범주형 인코딩: 원-핫·라벨·타깃 인코딩",
          "로그 변환·구간화(binning)로 분포 다듬기"
        ]
      },
      {
        "h": "피처 생성과 선택",
        "items": [
          "수치 조합·날짜에서 요일/월 추출·텍스트 길이 등 파생",
          "피처 중요도(feature_importances_)·상관계수 확인",
          "차원 축소(PCA)로 피처 수 줄이기"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 결측치와 이상치 진단하기",
        "steps": [
          "seaborn 의 titanic 데이터를 불러와 df.info() 로 각 컬럼의 결측 개수를 확인한다.",
          "df.isna().sum() 으로 어떤 컬럼에 빈 값이 많은지 표로 본다.",
          "df['fare'] 의 박스플롯을 sns.boxplot 으로 그려 이상치 점들을 눈으로 확인한다.",
          "age 컬럼의 결측을 중앙값으로 채우고 다시 isna().sum() 으로 0이 됐는지 검증한다."
        ]
      },
      {
        "title": "Lab 2. 파생 피처 만들고 중요도 보기",
        "steps": [
          "sibsp 와 parch 를 더해 family_size 컬럼을 새로 만든다.",
          "family_size 가 1이면 is_alone=1 인 컬럼을 추가한다.",
          "RandomForestClassifier 를 학습한 뒤 feature_importances_ 를 출력한다.",
          "어떤 파생 피처가 상위에 오는지 막대그래프로 그려 확인한다."
        ]
      }
    ],
    "homework": [
      "타이타닉 외 다른 데이터셋(예: seaborn 의 tips)에서 결측치 처리와 원-핫 인코딩을 적용하고, 파생 피처 1개를 직접 만들어 가공 전후 성능을 비교한 노트북을 제출한다.",
      "내가 만든 파생 피처가 왜 모델 성능에 도움이 되는지(어떤 패턴을 잡아주는지)를 3문장으로 설명하는 메모를 작성한다."
    ]
  },
  "modeldev-1": {
    "topics": [
      {
        "h": "문제 유형 파악",
        "items": [
          "숫자를 맞히면 회귀(집값 예측 등)",
          "범주를 맞히면 분류(합격/불합격 등)",
          "정답 라벨 유무로 지도/비지도 구분"
        ]
      },
      {
        "h": "데이터 분할 전략",
        "items": [
          "train_test_split의 test_size",
          "정답 비율 유지 stratify",
          "재현을 위한 random_state 고정",
          "KFold·StratifiedKFold"
        ]
      },
      {
        "h": "베이스라인 설계",
        "items": [
          "가장 단순한 모델 선택",
          "적절한 평가지표 고르기",
          "기준 점수 기록",
          "이후 개선과 비교"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 데이터 나눠보기 첫걸음",
        "steps": [
          "load_iris로 데이터를 불러온다.",
          "train_test_split으로 test_size=0.3을 줘 7:3으로 나눈다.",
          "X_tr.shape와 X_te.shape를 출력해 나뉜 개수를 확인한다.",
          "test_size를 0.2로 바꿔 개수가 어떻게 변하는지 비교한다."
        ]
      },
      {
        "title": "Lab2. 베이스라인 점수 만들기",
        "steps": [
          "LogisticRegression을 import 한다.",
          "cross_val_score로 cv=5 교차검증을 돌린다.",
          "scores.mean()으로 평균 정확도를 구한다.",
          "이 평균을 '베이스라인 점수'로 메모해 둔다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 베이스라인 노트북에 DecisionTreeClassifier 모델을 하나 더 추가해, 같은 교차검증으로 점수를 비교하고 어느 쪽이 높은지 한 줄 소감을 적어 제출한다.",
      "train_test_split의 test_size를 0.1, 0.2, 0.3으로 바꿔가며 테스트 정확도가 어떻게 변하는지 표로 정리한다."
    ]
  },
  "modeldev-2": {
    "topics": [
      {
        "h": "탐색 방법 비교",
        "items": [
          "Grid: 전부 시험(느리지만 빠짐없음)",
          "Random: 무작위 일부(빠름)",
          "Bayesian: 똑똑하게 다음 후보 선택",
          "탐색 범위 설계 요령"
        ]
      },
      {
        "h": "과적합 제어",
        "items": [
          "정규화(L1/L2) 강도 조절",
          "조기종료(early stopping)",
          "트리 깊이·잎 개수 제한",
          "교차검증으로 일반화 확인"
        ]
      },
      {
        "h": "앙상블 기법",
        "items": [
          "배깅(랜덤포레스트)",
          "부스팅(XGBoost/LightGBM)",
          "스태킹(여러 모델 쌓기)",
          "단일 모델과 점수 비교"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 깊이 다이얼 돌려보기",
        "steps": [
          "DecisionTreeClassifier를 import 한다.",
          "GridSearchCV에 max_depth 후보 [2,3,4,5]를 준다.",
          "fit 후 best_params_를 출력한다.",
          "깊이를 너무 키우면 과적합되는지 점수를 비교한다."
        ]
      },
      {
        "title": "Lab2. 앙상블로 점수 올리기",
        "steps": [
          "RandomForestClassifier를 import 한다.",
          "베이스라인(로지스틱)과 같은 데이터로 학습한다.",
          "두 모델의 테스트 정확도를 출력해 비교한다.",
          "어느 쪽이 높은지, 왜 그런지 한 줄 적는다."
        ]
      },
      {
        "title": "Lab3. 추론 속도 재보기",
        "steps": [
          "import time으로 시간을 잰다.",
          "predict 앞뒤로 time.time()을 찍어 차이를 구한다.",
          "n_estimators를 100에서 300으로 늘려 속도 변화를 본다.",
          "정확도와 속도의 트레이드오프를 메모한다."
        ]
      }
    ],
    "homework": [
      "오늘 튜닝한 랜덤포레스트에 GridSearch 후보를 한 종류 더 추가(예: min_samples_leaf)해 점수가 더 오르는지 실험하고, 베이스라인-Day1튜닝-오늘 결과를 한 표로 정리해 제출한다.",
      "배깅 모델(랜덤포레스트)과 부스팅 모델(GradientBoostingClassifier)을 같은 데이터에 적용해 정확도와 추론시간을 비교하고 어떤 상황에 무엇을 쓸지 두세 줄로 정리한다."
    ]
  },
  "rag-1": {
    "topics": [
      {
        "h": "RAG의 필요성",
        "items": [
          "LLM의 지식 컷오프와 환각 문제",
          "사내·도메인 문서 활용 필요",
          "출처 제시와 신뢰성 확보",
          "재학습 없이 지식 갱신"
        ]
      },
      {
        "h": "인덱싱 4단계",
        "items": [
          "문서 로딩(PDF·웹·DB)",
          "청킹 전략과 overlap",
          "임베딩 모델 선택",
          "벡터DB 저장과 영속화"
        ]
      },
      {
        "h": "벡터 검색 기초",
        "items": [
          "벡터 공간과 의미",
          "코사인 vs 내적 유사도",
          "top-k 개념",
          "메타데이터 동반 저장"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 개발 환경 만들고 첫 임베딩 찍어보기",
        "steps": [
          "가상환경을 만든다: `python -m venv .venv` 후 활성화한다.",
          "`pip install sentence-transformers` 로 라이브러리를 설치한다.",
          "파이썬을 실행해 모델을 불러오고 `model.encode('안녕하세요')` 를 출력한다.",
          "출력된 벡터의 길이가 384인지 확인한다."
        ]
      },
      {
        "title": "Lab2. 텍스트 파일을 조각으로 나눠보기",
        "steps": [
          "메모장으로 5문단 정도의 sample.txt 를 만든다.",
          "RecursiveCharacterTextSplitter 를 chunk_size=200 으로 설정한다.",
          "`split_text(open('sample.txt').read())` 로 조각 리스트를 만든다.",
          "조각 개수와 각 조각의 첫 20글자를 출력해 어떻게 잘렸는지 관찰한다."
        ]
      }
    ],
    "homework": [
      "본인 업무와 관련된 PDF 또는 텍스트 문서 2~3개를 인덱싱하고, 질문 5개를 던져 검색 결과를 표로 정리해 제출한다.",
      "chunk_size 를 300/800 두 가지로 바꿔 인덱싱한 뒤 같은 질문의 검색 결과가 어떻게 달라지는지 2~3문장으로 비교한다."
    ]
  },
  "rag-2": {
    "topics": [
      {
        "h": "Retriever 구성",
        "items": [
          "as_retriever와 search_kwargs",
          "top-k 튜닝",
          "유사도 임계값(score threshold)",
          "MMR로 중복 제거"
        ]
      },
      {
        "h": "검색 품질 향상",
        "items": [
          "BM25 키워드 검색",
          "벡터+키워드 하이브리드",
          "Cross-Encoder 재순위",
          "쿼리 재작성(query rewrite)"
        ]
      },
      {
        "h": "생성과 신뢰성",
        "items": [
          "컨텍스트 결합 프롬프트",
          "모를 때 모른다고 답하기",
          "출처·페이지 인용",
          "temperature와 일관성"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. Retriever 단독으로 돌려보기",
        "steps": [
          "저장해 둔 ./db 를 Chroma 로 다시 불러온다.",
          "`db.as_retriever(search_kwargs={'k':3})` 로 검색기를 만든다.",
          "`retriever.invoke('내가 궁금한 질문')` 을 실행한다.",
          "돌아온 조각들의 page_content 와 metadata 를 출력해 확인한다."
        ]
      },
      {
        "title": "Lab2. 프롬프트에 컨텍스트 끼워 넣기",
        "steps": [
          "검색된 조각 3개를 '\\n---\\n' 로 이어 붙여 context 문자열을 만든다.",
          "'context만 보고 답하라'는 지시 문장을 앞에 붙인다.",
          "context와 question을 합쳐 LLM 에 보낸다.",
          "답변이 context 범위 안에서 나오는지, 밖이면 '모른다'고 하는지 확인한다."
        ]
      },
      {
        "title": "Lab3. 하이브리드 검색 맛보기",
        "steps": [
          "`pip install rank_bm25` 로 BM25 라이브러리를 설치한다.",
          "조각 텍스트 리스트로 BM25Retriever 를 만든다.",
          "같은 질문을 벡터 검색과 BM25 각각에 던진다.",
          "두 결과를 나란히 출력해 어떤 게 더 정확한지 비교한다."
        ]
      }
    ],
    "homework": [
      "ask() 함수에 출처 인용을 추가한 버전으로 질문 10개를 돌리고, 답이 맞은 것/틀린 것/모른다고 한 것을 분류해 제출한다.",
      "같은 질문 3개에 대해 top-k 를 2와 6으로 바꿔 답변 품질이 어떻게 달라지는지 비교 메모를 작성한다."
    ]
  },
  "rag-3": {
    "topics": [
      {
        "h": "RAG 평가",
        "items": [
          "RAGAS 충실도·관련성",
          "context recall·precision",
          "정답지(ground truth) 작성",
          "검색 문제 vs 생성 문제 구분"
        ]
      },
      {
        "h": "고도화 튜닝",
        "items": [
          "청킹 크기·overlap 실험",
          "임베딩 모델 교체",
          "top-k와 재순위 조정",
          "멀티 문서·메타데이터 필터링"
        ]
      },
      {
        "h": "실서비스 최적화",
        "items": [
          "응답 지연 줄이기",
          "LLM 호출 비용 절감",
          "질문·임베딩 캐싱",
          "모니터링과 로깅"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 평가용 질문 세트 만들기",
        "steps": [
          "인덱싱한 문서를 읽고 답이 분명한 질문 5개를 뽑는다.",
          "각 질문의 모범 답안(ground truth)을 한 줄씩 작성한다.",
          "질문과 정답을 딕셔너리(또는 표)로 정리한다.",
          "정답이 문서 안에 실제로 있는지 다시 확인한다."
        ]
      },
      {
        "title": "Lab2. RAGAS 점수 내보기",
        "steps": [
          "`pip install ragas datasets` 로 설치한다.",
          "질문을 ask 함수에 넣어 답변과 contexts 를 모은다.",
          "Dataset 을 만들고 faithfulness, answer_relevancy 로 evaluate 한다.",
          "출력된 점수를 보고 가장 낮은 질문을 표시한다."
        ]
      },
      {
        "title": "Lab3. 파라미터 하나 바꿔 비교하기",
        "steps": [
          "현재 chunk_size 또는 top-k 값을 기록해 둔다.",
          "값을 한 가지만 바꿔 다시 인덱싱/검색한다.",
          "같은 질문 세트로 RAGAS 점수를 다시 낸다.",
          "변경 전후 점수를 나란히 적어 개선 여부를 판단한다."
        ]
      }
    ],
    "homework": [
      "내 RAG에 대해 질문 10개로 RAGAS 평가를 수행하고, 가장 점수가 낮은 질문 2개의 원인(검색/생성)을 분석해 개선안을 제출한다.",
      "청킹 크기·top-k·임베딩 모델 중 하나를 바꿔 개선 전후 RAGAS 점수를 비교하는 1페이지 실험 리포트를 작성한다."
    ]
  },
  "langchain-1": {
    "topics": [
      {
        "h": "LangChain 핵심 부품",
        "items": [
          "모델(ChatModel)",
          "프롬프트 템플릿",
          "출력 파서",
          "체인(Runnable)"
        ]
      },
      {
        "h": "LCEL 기본기",
        "items": [
          "파이프(|) 연산자",
          "invoke / batch / stream",
          "딕셔너리 입력 전달",
          "부품 단위 테스트"
        ]
      },
      {
        "h": "환경설정 기본",
        "items": [
          "가상환경(venv)",
          "패키지 설치(pip)",
          ".env와 API 키 관리",
          "키를 코드에 직접 적지 않기"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 개발환경 만들기",
        "steps": [
          "작업 폴더를 하나 만들고 그 안에서 터미널을 연다.",
          "`python -m venv venv` 로 가상환경을 만들고 활성화한다.",
          "`pip install langchain langchain-openai python-dotenv` 를 실행한다.",
          "`.env` 파일에 `OPENAI_API_KEY=...` 를 적어 저장한다.",
          "`python -c \"import langchain; print(langchain.__version__)\"` 로 설치를 확인한다."
        ]
      },
      {
        "title": "Lab 2. 첫 체인 만들기",
        "steps": [
          "`hello.py` 를 만들고 load_dotenv()로 키를 불러온다.",
          "ChatPromptTemplate으로 '{name}에게 인사말 만들어줘' 프롬프트를 만든다.",
          "`prompt | model | StrOutputParser()` 로 체인을 잇는다.",
          "`chain.invoke({\"name\": \"홍길동\"})` 결과를 print로 확인한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 리뷰 분석 체인에 'category(제품 분류)' 키를 추가로 뽑도록 프롬프트를 수정하고 결과를 캡처해 제출하기.",
      "temperature 값을 0과 1로 바꿔 같은 질문을 3번씩 실행하고, 답이 얼마나 달라지는지 한 줄 소감과 함께 정리하기."
    ]
  },
  "langchain-2": {
    "topics": [
      {
        "h": "대화 기억",
        "items": [
          "메시지 기록 저장",
          "맥락 이어가기",
          "기록 길이 관리",
          "이어지는 질문 처리"
        ]
      },
      {
        "h": "RAG 파이프라인",
        "items": [
          "문서 로드",
          "청킹(분할)",
          "임베딩과 벡터DB(FAISS)",
          "Retriever 검색"
        ]
      },
      {
        "h": "도구 연동",
        "items": [
          "@tool로 함수 등록",
          "도구 설명 작성",
          "AI가 도구 선택",
          "결과를 답변에 반영"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 벡터DB에 문서 넣기",
        "steps": [
          "data.txt에 5~10문장짜리 짧은 안내문을 직접 작성한다.",
          "TextLoader로 불러와 RecursiveCharacterTextSplitter로 자른다.",
          "OpenAIEmbeddings + FAISS.from_documents로 벡터DB를 만든다.",
          "`db.similarity_search('질문', k=2)` 로 비슷한 조각 2개가 나오는지 확인한다."
        ]
      },
      {
        "title": "Lab 2. RAG 체인 연결",
        "steps": [
          "retriever를 만들고 context/question 프롬프트를 작성한다.",
          "RunnablePassthrough로 질문을 그대로 흘려보내는 체인을 잇는다.",
          "문서 안 내용을 질문해 정답이 나오는지 확인한다.",
          "문서에 없는 내용을 질문해 '정보가 없다'고 답하는지 확인한다."
        ]
      },
      {
        "title": "Lab 3. 간단 도구 붙이기",
        "steps": [
          "@tool 데코레이터로 두 수를 더하는 add(a,b) 함수를 만든다.",
          "도구 설명(docstring)을 한 줄 적는다.",
          "모델에 bind_tools로 도구를 연결한다.",
          "'3 더하기 5는?' 질문에 도구 호출이 일어나는지 확인한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 QA 챗봇의 chunk_size를 200과 800으로 바꿔가며 같은 질문을 해보고, 답 품질 차이를 3줄로 정리해 제출하기.",
      "회사/학교 안내문을 data.txt로 넣고 실제로 자주 묻는 질문 3개에 답하게 한 뒤 결과를 캡처하기."
    ]
  },
  "langchain-3": {
    "topics": [
      {
        "h": "응답 경험 개선",
        "items": [
          "stream으로 조각 전송",
          "콜백으로 진행 로깅",
          "체감 대기시간 줄이기",
          "UI에 타이핑 효과"
        ]
      },
      {
        "h": "운영·비용 관리",
        "items": [
          "LLM 캐싱",
          "토큰·비용 모니터링",
          "에러 처리와 재시도",
          "LangSmith 관측"
        ]
      },
      {
        "h": "서비스 배포",
        "items": [
          "FastAPI 엔드포인트",
          "uvicorn 실행",
          "/docs 자동 문서",
          "환경변수로 키 분리"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 스트리밍 체험",
        "steps": [
          "model.stream()으로 긴 답을 요청한다.",
          "for문으로 chunk.content를 end=''로 이어 출력한다.",
          "invoke와 비교해 화면에 글자가 차오르는 차이를 관찰한다."
        ]
      },
      {
        "title": "Lab 2. 캐싱 적용",
        "steps": [
          "set_llm_cache(InMemoryCache())를 코드 위쪽에 추가한다.",
          "같은 질문을 time으로 시간을 재며 두 번 호출한다.",
          "두 번째 응답이 더 빠른지 출력으로 확인한다."
        ]
      },
      {
        "title": "Lab 3. API로 띄우기",
        "steps": [
          "service.py에 FastAPI app과 /chat 엔드포인트를 만든다.",
          "try/except로 에러 처리를 넣는다.",
          "`uvicorn service:app --reload` 로 서버를 켠다.",
          "브라우저 /docs에서 직접 호출해 응답을 확인한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 /chat API에 '대화 기록'을 받아 이어지는 질문에도 답하도록 확장하고, 두 번 주고받는 대화 예시를 캡처해 제출하기.",
      "3일간 만든 체인(요약·문서QA·서비스) 중 하나를 골라 README에 실행법을 정리하고, 발표용 1분 시연 시나리오를 작성하기."
    ]
  },
  "serving-1": {
    "topics": [
      {
        "h": "서빙 패턴",
        "items": [
          "온라인(실시간 단건) 서빙",
          "배치(모아서 일괄) 서빙",
          "스트림(흐르는 데이터) 서빙",
          "각 패턴이 어울리는 업무 예시"
        ]
      },
      {
        "h": "추론 API 구성요소",
        "items": [
          "모델 로딩(시작 시 1회)",
          "입력 검증(Pydantic)",
          "전처리·후처리",
          "예측 엔드포인트",
          "헬스체크 엔드포인트"
        ]
      },
      {
        "h": "모델 패키징·버전",
        "items": [
          "joblib/pickle 직렬화",
          "BentoML 모델 저장소",
          "모델 버전 태깅(:latest)",
          "재현 가능한 의존성 고정"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 — 5분 만에 FastAPI 띄우기",
        "steps": [
          "'pip install fastapi uvicorn' 를 실행한다.",
          "app.py에 한 줄 함수 '/health'만 가진 최소 앱을 작성한다.",
          "'uvicorn app:app --reload' 로 실행한다.",
          "브라우저에서 /docs 가 열리고 /health 가 ok 를 주는지 확인한다."
        ]
      },
      {
        "title": "Lab 2 — 잘못된 입력 막아보기",
        "steps": [
          "Pydantic 입력 모델에 숫자 필드 4개를 정의한다.",
          "/docs 에서 일부러 숫자 대신 글자를 넣어 본다.",
          "422 오류와 친절한 메시지가 자동으로 오는 것을 확인한다.",
          "올바른 값으로 다시 보내 200 응답을 받는다."
        ]
      },
      {
        "title": "Lab 3 — 모델 버전 바꿔치기",
        "steps": [
          "train.py 파라미터를 바꿔 두 번째 model_v2.joblib 을 만든다.",
          "app.py의 로드 파일명을 v2로 바꾼다.",
          "서버를 재시작하고 같은 입력의 응답이 달라지는지 비교한다.",
          "버전 정보를 응답에 함께 담아보며 추적 가능성을 체감한다."
        ]
      }
    ],
    "homework": [
      "본인이 만든 /predict API에 입력값 범위 검증(예: 음수 거부)을 추가하고 잘못된 요청 시 메시지를 캡처해 제출한다.",
      "온라인·배치·스트림 서빙 패턴을 각각 실제 업무 사례 1개씩으로 정리해 표로 제출한다."
    ]
  },
  "serving-2": {
    "topics": [
      {
        "h": "컨테이너화",
        "items": [
          "베이스 이미지 선택(slim)",
          "레이어 캐시로 빌드 단축",
          "포트 매핑(-p)",
          "이미지 태깅·레지스트리 푸시"
        ]
      },
      {
        "h": "확장·부하 대응",
        "items": [
          "수평 확장(컨테이너 복제)",
          "오토스케일링 기준(CPU·요청수)",
          "로드 밸런싱",
          "헬스체크 기반 무중단 배포"
        ]
      },
      {
        "h": "관측성·드리프트",
        "items": [
          "메트릭(Prometheus)",
          "로그 수집·검색",
          "분산 트레이싱",
          "데이터/모델 드리프트 감시"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 — 첫 컨테이너 실행",
        "steps": [
          "Dockerfile을 작성한다.",
          "'docker build -t myapi .' 로 빌드한다.",
          "'docker run -p 8000:8000 myapi' 로 실행한다.",
          "/docs 가 컨테이너에서 뜨는지 확인한다."
        ]
      },
      {
        "title": "Lab 2 — 메트릭 눈으로 보기",
        "steps": [
          "Instrumentator 두 줄을 추가하고 재빌드한다.",
          "/predict 를 10번 호출한다.",
          "/metrics 에서 http_requests_total 숫자가 오르는지 확인한다.",
          "Prometheus UI에서 같은 지표를 그래프로 본다."
        ]
      }
    ],
    "homework": [
      "본인 추론 API 이미지를 빌드해 'docker run' 으로 정상 동작 캡처를 제출하고, 이미지 용량을 줄일 방법 1가지를 적는다.",
      "데이터 드리프트가 의심될 때 운영자가 취할 대응 절차를 3단계로 정리해 제출한다."
    ]
  },
  "serving-3": {
    "topics": [
      {
        "h": "실험 관리·재현성",
        "items": [
          "MLflow Tracking",
          "파라미터·메트릭·아티팩트 기록",
          "코드·데이터·환경 버전 고정",
          "실험 비교·선택"
        ]
      },
      {
        "h": "모델 레지스트리·CI/CD",
        "items": [
          "모델 등록·버전·단계(Staging/Production)",
          "GitHub Actions 워크플로",
          "자동 테스트(pytest)",
          "컨테이너 빌드·배포 자동화"
        ]
      },
      {
        "h": "AIOps 운영 자동화",
        "items": [
          "지표 기반 이상탐지",
          "임계치 알림(Alerting)",
          "자동 롤백·자동 복구",
          "재학습 트리거 연계"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 — MLflow로 두 실험 비교",
        "steps": [
          "train.py를 n_estimators 값만 바꿔 두 번 실행한다.",
          "'mlflow ui' 를 띄운다.",
          "두 실험의 accuracy를 표에서 비교한다.",
          "더 높은 모델을 Register 한다."
        ]
      },
      {
        "title": "Lab 2 — Actions 자동 실행 보기",
        "steps": [
          "ci.yml을 저장소에 추가한다.",
          "코드를 push 한다.",
          "Actions 탭에서 워크플로가 도는지 본다.",
          "모든 단계가 초록 체크인지 확인한다."
        ]
      },
      {
        "title": "Lab 3 — 실패가 배포를 막는지 확인",
        "steps": [
          "test_app.py의 기대값을 일부러 틀리게 바꾼다.",
          "push 한다.",
          "Actions가 빨간 X로 멈추는지 본다.",
          "원복 후 다시 초록으로 돌아오는지 확인한다."
        ]
      }
    ],
    "homework": [
      "본인 프로젝트에 MLflow 실험 기록을 붙여 최소 3개 실험을 남기고, 가장 좋은 모델을 레지스트리에 등록한 화면을 제출한다.",
      "학습→배포 전체 파이프라인을 한 장 다이어그램으로 그리고, 각 단계에서 자동화로 줄어든 수작업을 한 줄씩 설명해 제출한다."
    ]
  },
  "agent-1": {
    "topics": [
      {
        "h": "에이전트 핵심 개념",
        "items": [
          "에이전트 vs 챗봇",
          "자율 추론과 반복 루프",
          "ReAct(생각+행동) 패턴",
          "도구 사용의 필요성"
        ]
      },
      {
        "h": "LangGraph 구성요소",
        "items": [
          "State(상태/메모장)",
          "Node(노드/작업칸)",
          "Edge·조건부 Edge(분기)",
          "START와 END",
          "compile과 invoke"
        ]
      },
      {
        "h": "도구 연동",
        "items": [
          "@tool 데코레이터",
          "bind_tools 로 모델에 연결",
          "ToolNode 실행",
          "tools_condition 자동 분기"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 개발환경 준비와 키 설정",
        "steps": [
          "가상환경 생성: `python -m venv venv` 후 활성화한다",
          "`pip install langgraph langchain-openai langchain-core` 설치한다",
          "OpenAI 사이트에서 API 키를 발급받는다",
          "`export OPENAI_API_KEY=...` 로 환경변수를 등록한다",
          "파이썬에서 `from langgraph.graph import StateGraph` 가 에러 없이 import 되는지 확인한다"
        ]
      },
      {
        "title": "Lab2. State 흐름 따라가 보기",
        "steps": [
          "text 필드를 가진 State 를 TypedDict 로 정의한다",
          "글자를 대문자로 바꾸는 노드 upper 를 만든다",
          "느낌표를 붙이는 노드 bang 을 만든다",
          "START→upper→bang→END 로 두 노드를 직선 연결한다",
          "invoke 결과를 출력해 상태가 노드를 거치며 바뀌는 과정을 눈으로 확인한다"
        ]
      }
    ],
    "homework": [
      "오늘 만든 날씨 에이전트에 `get_time(city)` 도구를 하나 더 추가하고, '서울 시간 알려줘' 질문에 시간 도구만 호출되는지 확인해 로그를 제출하라.",
      "ReAct 패턴이 무엇인지, 챗봇과 에이전트의 차이를 일상 비유를 들어 5문장으로 정리해 제출하라."
    ]
  },
  "agent-2": {
    "topics": [
      {
        "h": "멀티 에이전트 설계",
        "items": [
          "역할 분담(연구원/작가/검토자)",
          "Supervisor 오케스트레이션",
          "에이전트 간 메시지 전달",
          "서브그래프 조합"
        ]
      },
      {
        "h": "상태 영속성",
        "items": [
          "MemorySaver 체크포인터",
          "thread_id 와 대화방",
          "이어지는 멀티턴 대화",
          "상태 스냅샷 조회"
        ]
      },
      {
        "h": "안전·운영",
        "items": [
          "Human-in-the-loop 승인",
          "interrupt 중단점",
          "에러 복구와 재시도",
          "실행 흐름 관측(로그)"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 두 역할 에이전트 연결",
        "steps": [
          "researcher, writer 두 노드를 함수로 만든다",
          "START→researcher→writer→END 로 순서대로 연결한다",
          "'커피의 효능 정리해줘'로 invoke 한다",
          "researcher가 모은 내용을 writer가 다듬어 최종 출력하는지 확인한다",
          "두 노드의 system 프롬프트를 바꿔 결과 차이를 비교한다"
        ]
      },
      {
        "title": "Lab2. 승인 흐름 붙이기",
        "steps": [
          "위 예제의 interrupt_before 코드를 복사한다",
          "do 노드를 '주문확정' 같은 위험 행동으로 바꾼다",
          "첫 invoke 후 '승인 대기' 메시지에서 멈추는지 확인한다",
          "app.invoke(None, cfg) 로 재개해 행동이 실행되는지 본다",
          "재개 전에 상태를 출력해 멈춘 지점 정보를 확인한다"
        ]
      },
      {
        "title": "Lab3. 메모리로 멀티턴 만들기",
        "steps": [
          "메모리 예제에 thread_id 를 '나만의ID'로 바꾼다",
          "첫 메시지로 좋아하는 색을 알려준다",
          "두 번째 메시지로 '내가 좋아하는 색은?'을 묻는다",
          "기억해서 답하는지 확인한다",
          "thread_id 를 다른 값으로 바꾸면 기억을 못 하는지 비교한다"
        ]
      }
    ],
    "homework": [
      "오늘 만든 Supervisor 에이전트에 'reviewer(검토자)' 역할을 추가하고, writer 다음에 reviewer가 한 번 검토하도록 흐름을 확장해 로그와 함께 제출하라.",
      "Human-in-the-loop가 실제 업무(예: 자동 메일발송, 결제)에서 왜 필요한지 본인 업무 상황 예시 1개를 들어 5문장으로 정리해 제출하라."
    ]
  },
  "vectordb-1": {
    "topics": [
      {
        "h": "임베딩과 유사도",
        "items": [
          "임베딩 모델의 역할",
          "차원(dimension)의 의미",
          "코사인 유사도 vs 내적",
          "정규화(normalize)가 필요한 이유"
        ]
      },
      {
        "h": "인덱싱과 Vector DB 종류",
        "items": [
          "완전탐색(Flat)의 한계",
          "HNSW 그래프 탐색",
          "IVF 클러스터 기반 탐색",
          "pgvector · Chroma · FAISS · Pinecone 비교"
        ]
      },
      {
        "h": "실전 검색 품질 높이기",
        "items": [
          "메타데이터 필터링",
          "키워드+벡터 하이브리드 검색",
          "Top-k 값 정하기",
          "RAG와의 연결 지점"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. FAISS로 가장 비슷한 문장 찾기",
        "steps": [
          "`pip install faiss-cpu sentence-transformers` 로 라이브러리를 설치한다.",
          "문장 4개를 리스트로 만들고 임베딩 모델로 벡터로 바꾼다.",
          "`faiss.IndexFlatIP` 인덱스를 만들고 `normalize_L2` 후 벡터를 추가한다.",
          "질문 한 개를 임베딩해 `index.search(q, 2)` 로 가까운 문장 2개를 출력한다.",
          "결과 순서가 의미상 자연스러운지 눈으로 확인한다."
        ]
      },
      {
        "title": "Lab 2. 메타데이터로 검색 범위 좁히기 (Chroma)",
        "steps": [
          "Chroma 컬렉션을 만들고 문서마다 `{\"category\": \"...\"}` 꼬리표를 붙여 저장한다.",
          "필터 없이 먼저 검색해 전체 결과를 확인한다.",
          "`collection.query(..., where={\"category\": \"환불\"})` 처럼 필터를 걸어 다시 검색한다.",
          "필터 전후 결과 개수와 내용이 어떻게 달라지는지 비교해 캡처한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 FAISS 또는 Chroma 검색기에 내가 직접 고른 문서 10개 이상을 넣고, 서로 다른 질문 3개로 검색해 결과가 맞는지 표로 정리해 제출하기.",
      "pgvector · Chroma · FAISS · Pinecone 중 두 개를 골라 저장 방식·속도·비용·사용 편의성을 3줄씩 비교한 짧은 메모 작성하기."
    ]
  },
  "capstone-1": {
    "topics": [
      {
        "h": "문제 정의 묶음",
        "items": [
          "한 문장 문제 선언",
          "페르소나 1명 정의",
          "유저스토리 3개",
          "측정 가능한 성공 기준"
        ]
      },
      {
        "h": "아키텍처 설계 묶음",
        "items": [
          "에이전트 두뇌 박스",
          "RAG 자료실 박스",
          "도구(검색·API) 박스",
          "데이터 플로우 화살표"
        ]
      },
      {
        "h": "팀 운영 묶음",
        "items": [
          "역할 분담(기획·구현·발표)",
          "깃허브 저장소 개설",
          "노션 기획 문서",
          "일정과 마일스톤"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 가상환경부터 첫 LLM 응답까지",
        "steps": [
          "프로젝트 폴더를 만들고 그 안에서 'python -m venv venv'를 실행한다",
          "'source venv/bin/activate'(윈도우는 venv\\\\Scripts\\\\activate)로 가상환경을 켠다",
          "'pip install langchain langchain-openai python-dotenv'를 설치한다",
          ".env 파일에 OPENAI_API_KEY 한 줄을 넣는다",
          "realCode를 main.py로 저장하고 'python main.py'로 응답 한 줄을 확인한다"
        ]
      },
      {
        "title": "Lab2. 아키텍처 그림을 코드 주석으로 옮기기",
        "steps": [
          "종이에 사용자→에이전트→(RAG/도구)→답변 흐름을 그린다",
          "main.py 맨 위에 '# 1) 입력 2) 검색 3) 판단 4) 출력' 처럼 단계 주석을 적는다",
          "각 단계 아래에 앞으로 채울 함수 이름(def retrieve, def decide)을 빈 껍데기로 적어둔다",
          "팀원과 그림과 주석이 일치하는지 맞춰본다"
        ]
      }
    ],
    "homework": [
      "우리 팀 캡스톤의 문제정의·페르소나·성공기준·아키텍처 그림을 노션 1페이지로 완성해 제출",
      "골격 코드(main.py)가 LLM 응답을 출력하는 화면을 캡처해 저장소에 올리기"
    ]
  },
  "capstone-2": {
    "topics": [
      {
        "h": "RAG 파이프라인 묶음",
        "items": [
          "문서 로딩",
          "청킹(조각 크기·overlap)",
          "임베딩",
          "벡터 DB 인덱싱",
          "유사도 검색"
        ]
      },
      {
        "h": "에이전트 구성 묶음",
        "items": [
          "@tool 도구 정의",
          "도구 설명 작성",
          "create_react_agent",
          "도구 호출 로그 확인"
        ]
      },
      {
        "h": "통합·점검 묶음",
        "items": [
          "입력 UI 연결",
          "엔드투엔드 실행",
          "테스트 질문 5개",
          "정답률 기록과 수정"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 내 문서로 벡터 DB 만들기",
        "steps": [
          "팀 주제와 관련된 문장 30줄 이상을 docs.txt로 저장한다",
          "RecursiveCharacterTextSplitter로 chunk_size=300으로 쪼갠다",
          "Chroma.from_texts로 임베딩해 저장한다",
          "similarity_search로 질문을 넣어 관련 조각이 나오는지 확인한다",
          "조각이 너무 길거나 짧으면 chunk_size를 200~500 사이로 조정한다"
        ]
      },
      {
        "title": "Lab2. 검색 도구를 에이전트에 연결",
        "steps": [
          "@tool로 search_docs 함수를 정의하고 설명 문장을 꼭 적는다",
          "create_react_agent(llm, tools=[search_docs])로 에이전트를 만든다",
          "agent.invoke로 질문을 보내고 최종 답변을 출력한다",
          "result의 중간 메시지를 출력해 도구가 실제로 호출됐는지 확인한다"
        ]
      },
      {
        "title": "Lab3. 테스트로 품질 기록",
        "steps": [
          "예상 질문 5개와 기대 답을 표로 적는다",
          "각 질문을 에이전트에 넣고 실제 답을 표에 채운다",
          "맞음/틀림을 O/X로 표시해 정답률을 계산한다",
          "틀린 질문은 원인(검색 누락/엉뚱한 답)을 한 줄로 메모한다"
        ]
      }
    ],
    "homework": [
      "에이전트+RAG가 테스트 질문 5개 중 몇 개를 맞혔는지 기록표를 제출",
      "가장 많이 틀린 질문 1개를 골라 청킹·top_k를 바꿔 개선해 보고 결과 비교"
    ]
  },
  "capstone-3": {
    "topics": [
      {
        "h": "안정화 묶음",
        "items": [
          "검색 결과 없음 처리",
          "try/except 오류 방어",
          "재시도 로직",
          "출처 표시 추가"
        ]
      },
      {
        "h": "평가 묶음",
        "items": [
          "테스트 질문 10개",
          "정답률 계산",
          "성공 기준과 비교",
          "한계 정리"
        ]
      },
      {
        "h": "발표 묶음",
        "items": [
          "데모 시나리오 3~4개",
          "슬라이드 5장",
          "리허설·시간 측정",
          "회고 작성"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 우아한 실패 만들기",
        "steps": [
          "검색 결과가 비었을 때 안내 메시지를 반환하도록 조건문을 넣는다",
          "전체 응답 함수를 try/except로 감싼다",
          "일부러 이상한 질문이나 빈 입력을 넣어 멈추지 않는지 확인한다",
          "답변 끝에 출처 조각을 붙여 출력한다"
        ]
      },
      {
        "title": "Lab2. 데모 리허설",
        "steps": [
          "보여줄 질문 3~4개를 순서대로 정한다",
          "팀에서 발표자를 정하고 한 번 처음부터 끝까지 연습한다",
          "걸린 시간을 재고 막히는 부분을 메모해 고친다",
          "라이브 데모 중 에러 대비 백업 캡처를 준비한다"
        ]
      },
      {
        "title": "Lab3. 회고 작성",
        "steps": [
          "잘된 점 2가지를 적는다",
          "아쉬운 점 2가지를 적는다",
          "다음에 개선할 일 2가지를 적는다",
          "팀원 모두의 한 줄 소감을 모아 문서로 정리한다"
        ]
      }
    ],
    "homework": [
      "최종 코드·정답률표·발표 슬라이드·회고 문서를 저장소에 모아 제출",
      "캡스톤을 한 단계 더 발전시킬 다음 기능 아이디어 1개를 README에 추가"
    ]
  },
  "miniproject-1": {
    "topics": [
      {
        "h": "기획 단계 체크리스트",
        "items": [
          "해결할 문제 한 문장",
          "타깃 사용자 정의",
          "핵심 기능 2~3개",
          "성공 기준(무엇이 되면 완성)"
        ]
      },
      {
        "h": "설계 산출물",
        "items": [
          "화면 흐름(와이어프레임)",
          "아키텍처 다이어그램",
          "데이터 플로우 화살표",
          "기술 스택 표"
        ]
      },
      {
        "h": "프로젝트 초기 세팅",
        "items": [
          "가상환경 venv",
          "패키지 설치",
          ".env 비밀키 관리",
          "깃 저장소·.gitignore"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 가상환경과 패키지 세팅하기",
        "steps": [
          "터미널을 열고 프로젝트 폴더로 이동한다",
          "'python -m venv venv' 명령으로 가상환경을 만든다",
          "'source venv/bin/activate' 로 활성화하면 프롬프트 앞에 (venv) 가 보인다",
          "'pip install langchain streamlit chromadb python-dotenv' 를 실행한다",
          "'pip freeze > requirements.txt' 로 설치 목록을 파일로 저장한다"
        ]
      },
      {
        "title": "Lab2. .gitignore 로 비밀 파일 보호하기",
        "steps": [
          "프로젝트 루트에 '.gitignore' 파일을 만든다",
          "그 안에 '.env' 와 'venv/' 와 'chroma_db/' 세 줄을 적는다",
          "'git status' 를 실행해 .env 가 목록에 안 보이는지 확인한다",
          "'git add . && git commit -m \"chore: gitignore 설정\"' 로 커밋한다"
        ]
      }
    ],
    "homework": [
      "우리 팀 서비스의 기획서(plan.md)를 완성하고 핵심 기능 3개에 우선순위를 매겨오기",
      "사용할 자료(문서·웹페이지 등) 3개 이상을 모아 data 폴더에 정리해오기"
    ]
  },
  "miniproject-2": {
    "topics": [
      {
        "h": "인덱싱 파이프라인",
        "items": [
          "문서 로딩",
          "청킹(크기·겹침)",
          "임베딩 생성",
          "Vector DB 저장"
        ]
      },
      {
        "h": "RAG 응답 단계",
        "items": [
          "유사도 검색(top-k)",
          "컨텍스트 결합 프롬프트",
          "LLM 호출",
          "출처·근거 표시"
        ]
      },
      {
        "h": "안정화 포인트",
        "items": [
          "자료 없음 처리",
          "빈 입력 방어",
          "API 오류 재시도",
          "로딩 표시(spinner)"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 내 문서로 인덱싱하기",
        "steps": [
          "data/faq.txt 에 질문·답변 형식 텍스트를 10줄 이상 넣는다",
          "ingest.py 의 파일 경로가 내 파일과 같은지 확인한다",
          "'python ingest.py' 를 실행한다",
          "'N개 청크 저장 완료' 메시지와 chroma_db 폴더가 생겼는지 확인한다"
        ]
      },
      {
        "title": "Lab2. 챗봇 화면 띄우기",
        "steps": [
          "app.py 를 작성한다(예제 코드 참고)",
          "터미널에서 'streamlit run app.py' 를 실행한다",
          "자동으로 열린 브라우저에서 질문을 입력해본다",
          "문서에 있는 내용과 없는 내용을 각각 물어 답변 차이를 확인한다"
        ]
      }
    ],
    "homework": [
      "우리 팀 실제 자료로 인덱싱을 다시 하고, 잘 안 맞는 질문 3개를 찾아 청크 크기를 조절해보기",
      "출처(어느 문서에서 찾았는지)를 답변 아래 함께 표시하도록 화면을 개선해오기"
    ]
  },
  "miniproject-3": {
    "topics": [
      {
        "h": "테스트 항목",
        "items": [
          "정상 질문",
          "자료 없는 질문",
          "빈 입력·특수문자",
          "긴 입력·연속 질문"
        ]
      },
      {
        "h": "배포 준비물",
        "items": [
          "requirements.txt",
          "GitHub 저장소(.env 제외)",
          "Secrets에 API키",
          "README 사용법"
        ]
      },
      {
        "h": "발표 구성",
        "items": [
          "문제 정의·타깃",
          "아키텍처 한 장",
          "라이브 시연",
          "한계와 개선점"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 자동 테스트 돌리기",
        "steps": [
          "test_rag.py 를 작성하고 우리 자료에 맞는 질문으로 바꾼다",
          "'python test_rag.py' 를 실행한다",
          "'결과: n/m 통과' 를 확인한다",
          "실패한 항목의 원인을 찾아 고치고 다시 실행한다"
        ]
      },
      {
        "title": "Lab2. Streamlit Cloud에 배포하기",
        "steps": [
          "GitHub에 새 저장소를 만들고 'git push' 한다(.env 제외 확인)",
          "share.streamlit.io 에 GitHub 계정으로 로그인한다",
          "New app 에서 저장소·브랜치·app.py 를 선택한다",
          "Advanced settings의 Secrets 에 OPENAI_API_KEY 를 넣고 Deploy 를 누른다",
          "생성된 공개 URL을 휴대폰으로 열어 동작을 확인한다"
        ]
      },
      {
        "title": "Lab3. 발표 리허설",
        "steps": [
          "슬라이드 5장(문제·아키텍처·시연·한계·개선)을 만든다",
          "공개 URL로 실제 시연 흐름을 한 번 연습한다",
          "발표 시간을 재서 5분 안에 끝나는지 확인한다",
          "예상 질문 3개와 답을 미리 준비한다"
        ]
      }
    ],
    "homework": [
      "배포한 공개 URL과 GitHub 저장소 링크, 발표 슬라이드를 제출하기",
      "회고록에 잘된 점·아쉬운 점·다음에 더 해보고 싶은 기능 각 2가지를 적어 제출하기"
    ]
  }
}

export const detailsFor = (subjectId, day) => details[`${subjectId}-${day}`] || null
