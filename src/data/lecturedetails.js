// 날짜별 강의안 심화 — subjectId-day 키.
//   topics: [{ h, items[] }] · labs: [{ title, steps[] }] · homework: [string]

export const details = {
  "git-1": {
    "topics": [
      {
        "h": "오전 · 팀빌딩으로 협업 기반 다지기",
        "items": [
          "OT: 과정 목표·일정·평가 방식 공유와 강사/동료 자기소개",
          "아이스브레이킹: 공통점 찾기·MBTI 라운드 등 가벼운 활동으로 긴장 풀기",
          "팀 구성: 4~5인 팀 편성과 팀명·슬로건으로 팀 정체성 만들기",
          "역할 정하기: 팀장·기록·발표·Git 관리자 등 역할 분담",
          "그라운드룰: 연락 응답 시간·회의 규칙·갈등 해결 방식 합의",
          "협업 목표와 커밋 컨벤션(예: feat/fix/docs) 약속 정하기"
        ]
      },
      {
        "h": "오후 · Git 핵심 명령 한 바퀴",
        "items": [
          "설치/설정: git --version, git config(이름·이메일)",
          "시작: git init(새로 만들기) / git clone(가져오기)",
          "기본 흐름: git add → git commit, git status, git log",
          "변경 확인: git diff, .gitignore 로 추적 제외",
          "되돌리기: git restore, git reset --soft, git revert 차이",
          "역사 보기: git log --oneline --graph 로 흐름 읽기"
        ]
      },
      {
        "h": "협업 · 브랜치와 GitHub 원격 워크플로",
        "items": [
          "브랜치: git switch -c 로 작업 가지 만들기",
          "합치기: git merge 와 충돌(conflict) 표시 읽는 법",
          "원격 연결: git remote add origin, git push/pull",
          "Pull Request: 변경 제안과 코드리뷰·승인 흐름",
          "동기화: 작업 전 git pull 로 최신화하는 습관",
          "협업 규칙: main 보호·작은 단위 커밋·명확한 메시지"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 내 첫 저장소 만들고 3번 커밋해 역사 만들기",
        "steps": [
          "빈 폴더를 만들고 그 안에서 `git init` 을 실행한다.",
          "`hello.txt` 파일을 만들어 '첫 줄' 이라고 적고 `git add hello.txt` → `git commit -m \"first\"` 로 1번째 커밋을 만든다.",
          "hello.txt 에 '둘째 줄' 을 추가하고 다시 add → commit 으로 2번째 커밋을 만든다.",
          "한 번 더 내용을 고치고 3번째 커밋을 만든 뒤 `git log --oneline` 을 실행한다.",
          "커밋 3개가 위에서부터 최신순으로 나열되는지 눈으로 확인한다. (각 줄 앞 7자리 영문/숫자가 커밋 번호다)"
        ]
      },
      {
        "title": "Lab 2. .gitignore 로 추적 안 할 파일 걸러내기",
        "steps": [
          "저장소 안에 `secret.txt` 와 `log.tmp` 두 파일을 만든다.",
          "`.gitignore` 파일을 만들고 그 안에 `*.tmp` 와 `secret.txt` 두 줄을 적는다.",
          "`git status` 를 실행해 secret.txt 와 log.tmp 가 더 이상 'Untracked' 목록에 안 보이는지 확인한다.",
          "`.gitignore` 자체는 `git add .gitignore` → commit 으로 저장한다.",
          "왜 비밀번호·임시파일을 추적에서 빼야 하는지 팀원과 한 문장으로 정리해 본다."
        ]
      },
      {
        "title": "Lab 3. 브랜치에서 작업하고 main 으로 머지하기",
        "steps": [
          "`git switch -c feature/title` 로 새 브랜치를 만들며 이동한다.",
          "README.md 의 제목을 바꾸고 add → commit 한다.",
          "`git switch main` 으로 본류로 돌아온 뒤 `git merge feature/title` 을 실행한다.",
          "충돌 메시지 없이 'Fast-forward' 또는 머지 완료가 뜨는지 확인한다.",
          "`git log --oneline --graph` 로 브랜치가 main 에 합쳐진 모습을 확인한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 팀 저장소에 본인 이름의 브랜치로 자기소개 파일(introduce_이름.md)을 추가하고 Pull Request 를 열어 팀원 1명의 리뷰 승인을 받아 머지하기.",
      "오늘 쓴 Git 명령 8개 이상을 '명령 — 한 줄 뜻 — 내가 직접 친 예시' 형태의 나만의 치트시트(cheatsheet.md)로 정리해 저장소에 커밋하기."
    ]
  },
  "transformer-1": {
    "topics": [
      {
        "h": "LLM의 입력 처리 흐름",
        "items": [
          "원문 텍스트",
          "토큰화(BPE)",
          "정수 ID 변환",
          "임베딩 벡터로 변환",
          "모델 입력"
        ]
      },
      {
        "h": "Attention의 3요소",
        "items": [
          "Query: 무엇을 찾는가(질문)",
          "Key: 후보의 이름표(색인)",
          "Value: 실제 가져올 내용",
          "Score: Q·K의 닮은 정도",
          "Softmax: 합이 1인 집중 비율"
        ]
      },
      {
        "h": "RNN/LSTM의 한계 vs Attention의 장점",
        "items": [
          "순차 처리라 병렬화가 어려움",
          "긴 문장의 장기 의존성 약함",
          "Attention은 모든 단어를 동시에 봄",
          "먼 단어 관계도 직접 연결"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. Colab에서 토크나이저 체험하기",
        "steps": [
          "Colab 새 노트를 만들고 첫 셀에 '!pip install transformers' 를 입력해 실행한다.",
          "'from transformers import AutoTokenizer' 로 토크나이저를 불러온다.",
          "tok = AutoTokenizer.from_pretrained('bert-base-uncased') 로 모델 토크나이저를 준비한다.",
          "내가 좋아하는 한 문장을 정해 tok.tokenize(문장) 결과를 print 로 확인한다.",
          "긴 단어(예: 'unbelievable')가 여러 조각으로 쪼개지는지 눈으로 관찰하고 메모한다."
        ]
      },
      {
        "title": "Lab2. softmax로 집중 비율 만들기",
        "steps": [
          "새 셀에 'import torch' 를 입력한다.",
          "scores = torch.tensor([3.0, 1.0, 0.5]) 처럼 점수 3개를 만든다.",
          "torch.softmax(scores, dim=0) 을 print 로 출력해 합이 1인지 확인한다.",
          "점수 중 하나를 아주 크게(예: 10.0) 바꿔 다시 실행하고, 그 단어의 비율이 1에 가까워지는지 관찰한다.",
          "관찰 내용을 '점수가 클수록 집중이 쏠린다' 한 줄로 정리한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 Self-Attention 코드에서 입력 문장을 'I love my cute cat'(단어 5개)으로 바꿔 5x5 Attention 히트맵을 만들고, 어떤 단어쌍의 가중치가 높은지 3줄로 설명해 제출한다.",
      "RNN/LSTM과 Transformer의 차이를 '병렬 처리'와 '장기 의존성' 두 키워드로 비교해 5문장 이내로 정리한다."
    ]
  },
  "transformer-2": {
    "topics": [
      {
        "h": "Transformer 블록의 구성요소",
        "items": [
          "Multi-Head Attention",
          "Positional Encoding",
          "Feed-Forward Network",
          "잔차연결(Residual)",
          "Layer Normalization"
        ]
      },
      {
        "h": "구조별 대표 모델과 용도",
        "items": [
          "Encoder형 BERT: 분류·검색·이해",
          "Decoder형 GPT: 생성·대화",
          "Encoder-Decoder형 T5: 번역·요약",
          "용도에 맞게 골라 쓰기"
        ]
      },
      {
        "h": "LLM 학습 2단계와 스케일링",
        "items": [
          "사전학습: 방대한 글로 기초 실력",
          "파인튜닝: 특정 업무로 다듬기",
          "스케일링 법칙: 크게 키울수록 좋아짐",
          "비용·데이터 한계 고려"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 사전학습 모델 불러와 빈칸 채우기(BERT)",
        "steps": [
          "Colab 새 셀에 '!pip install transformers' 를 실행한다.",
          "'from transformers import pipeline' 을 입력한다.",
          "fill = pipeline('fill-mask', model='bert-base-uncased') 로 빈칸 채우기 모델을 준비한다.",
          "fill('The capital of France is [MASK].') 를 실행해 모델이 채운 후보 단어들을 본다.",
          "가장 점수 높은 후보가 'paris' 인지 확인하고, 다른 문장으로도 바꿔 실험한다."
        ]
      },
      {
        "title": "Lab2. 임베딩 거리로 비슷한 문장 찾기",
        "steps": [
          "오늘 메인 실습의 임베딩 코드를 새 노트에 복사해 실행한다.",
          "sents 리스트에 내 관심 주제 문장 4개를 넣는다(2개는 비슷, 2개는 다르게).",
          "모든 문장쌍에 대해 torch.cosine_similarity 로 유사도를 계산한다.",
          "유사도 점수가 가장 높은 문장쌍을 print 로 찾아낸다.",
          "그 쌍이 실제로 의미가 비슷한지 사람 눈으로 확인하고 한 줄 메모한다."
        ]
      }
    ],
    "homework": [
      "BERT(Encoder)·GPT(Decoder)·T5(Encoder-Decoder)를 각각 '어떤 업무에 쓰면 좋은지' 실제 예시 1개씩과 함께 표로 정리해 제출한다.",
      "오늘 만든 문장 임베딩 코드로 내 업무에서 자주 쓰는 문장 5개의 유사도 표(5x5)를 만들고, 가장 비슷한 쌍과 가장 다른 쌍을 찾아 3줄로 설명한다."
    ]
  },
  "python-1": {
    "topics": [
      {
        "h": "기본 문법 기초",
        "items": [
          "변수와 대입(=)",
          "정수·실수·문자열·불(bool)",
          "산술·비교·논리 연산자",
          "문자열 슬라이싱과 메서드(split, strip, replace)"
        ]
      },
      {
        "h": "자료구조 다루기",
        "items": [
          "리스트 인덱싱·슬라이싱·append",
          "딕셔너리 키-값 조회·추가",
          "튜플의 불변성",
          "집합(set)으로 중복 제거"
        ]
      },
      {
        "h": "흐름 제어와 재사용",
        "items": [
          "if·elif·else 조건 분기",
          "for·while 반복",
          "함수 정의(def)와 return",
          "리스트 컴프리헨션"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. Colab 환경 셋업하고 첫 코드 실행",
        "steps": [
          "브라우저에서 colab.research.google.com 에 접속해 구글 계정으로 로그인한다.",
          "'새 노트' 버튼을 눌러 빈 노트북을 연다.",
          "첫 셀에 print(\"안녕 데이터 분석\") 을 입력한다.",
          "Shift+Enter 를 눌러 셀을 실행하고, 아래에 안녕 데이터 분석 이 출력되는지 확인한다.",
          "새 셀에 1 + 2 * 3 을 입력해 실행하고 결과가 7 인지 확인한다(계산기처럼 동작)."
        ]
      },
      {
        "title": "Lab 2. 리스트와 반복문으로 합계·평균 구하기",
        "steps": [
          "scores = [80, 95, 70, 88, 100] 리스트를 만든다.",
          "total = 0 으로 합계를 담을 변수를 0 으로 초기화한다.",
          "for s in scores: 반복문 안에서 total = total + s 로 점수를 누적한다.",
          "average = total / len(scores) 로 평균을 계산한다(len 은 개수).",
          "print(total, average) 를 실행해 433 86.6 이 나오는지 확인한다."
        ]
      },
      {
        "title": "Lab 3. 함수로 묶어 재사용하기",
        "steps": [
          "def stats(numbers): 형태로 함수를 정의하기 시작한다.",
          "함수 안에서 return sum(numbers), max(numbers), min(numbers) 로 세 값을 한꺼번에 돌려준다.",
          "함수 밖에서 a, b, c = stats([3, 9, 1]) 처럼 호출해 결과를 세 변수에 나눠 받는다.",
          "print(a, b, c) 로 13 9 1 이 나오는지 확인한다.",
          "다른 리스트로 한 번 더 호출해 같은 함수가 재사용되는지 확인한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 주문 전처리 스크립트에 최저가·최고가 출력을 추가하고, 음수·None 외에 100만원 초과도 이상치로 걸러내도록 조건을 보강해 제출한다.",
      "본인이 자주 쓰는 데이터(예: 한 주 지출 내역) 10개를 리스트로 만들고, 반복문과 함수로 합계·평균·최댓값을 출력하는 노트북을 작성한다."
    ]
  },
  "python-2": {
    "topics": [
      {
        "h": "Pandas 기본",
        "items": [
          "Series·DataFrame 구조",
          "CSV/엑셀 적재(read_csv)",
          "head·tail·info·describe 로 훑어보기",
          "loc·iloc 인덱싱과 열 선택"
        ]
      },
      {
        "h": "정제와 집계",
        "items": [
          "결측치 처리(dropna·fillna)",
          "이상치 필터링과 조건 선택",
          "정렬(sort_values)",
          "groupby 그룹 집계와 파생 열"
        ]
      },
      {
        "h": "재구조화와 시각화",
        "items": [
          "merge 로 표 합치기",
          "pivot_table 재구조화",
          "matplotlib 기본 그래프",
          "seaborn 막대·산점도·히트맵"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. CSV 불러와 첫 탐색하기",
        "steps": [
          "import pandas as pd 를 실행한다.",
          "df = pd.read_csv('파일경로.csv') 로 데이터를 불러온다(Colab 은 좌측 폴더에 파일을 업로드).",
          "df.head() 로 위쪽 5줄을, df.tail() 로 아래 5줄을 확인한다.",
          "df.info() 로 열 이름·자료형·결측 여부를 살펴본다.",
          "df.describe() 로 숫자 열의 평균·최소·최대를 한눈에 확인한다."
        ]
      },
      {
        "title": "Lab 2. 결측치 처리하고 필터링하기",
        "steps": [
          "df.isna().sum() 으로 열별 빈칸 개수를 확인한다.",
          "df['나이'].fillna(df['나이'].mean()) 로 나이 빈칸을 평균으로 채운다.",
          "df = df.dropna() 로 남은 빈칸 행을 제거한다.",
          "adults = df[df['나이'] >= 20] 으로 성인만 골라 낸다.",
          "print(len(df), len(adults)) 로 정제 전후 개수를 비교한다."
        ]
      },
      {
        "title": "Lab 3. groupby 집계 결과를 그래프로 그리기",
        "steps": [
          "import seaborn as sns 와 import matplotlib.pyplot as plt 를 실행한다.",
          "result = df.groupby('지역')['매출'].sum() 으로 지역별 매출 합계를 구한다.",
          "print(result) 로 숫자 결과를 먼저 확인한다.",
          "sns.barplot(data=df, x='지역', y='매출') 로 막대그래프를 그린다.",
          "plt.title('region sales') 로 제목을 달고 plt.show() 로 그림을 출력한다."
        ]
      }
    ],
    "homework": [
      "오늘 사용한 tips 데이터로 성별(sex)·흡연여부(smoker)별 평균 팁 비율을 groupby 로 구하고, seaborn 막대그래프로 그려 결론을 한 문장으로 정리해 제출한다.",
      "관심 분야의 공개 CSV 데이터를 하나 골라 적재→결측치 처리→groupby 집계→그래프 1개→결론 한 문장으로 이어지는 EDA 노트북을 작성한다."
    ]
  },
  "prompt-1": {
    "topics": [
      {
        "h": "프롬프트 구성요소",
        "items": [
          "역할(role): 모델에게 직업·캐릭터를 부여해 말투와 관점을 고정",
          "지시(instruction): 무엇을 해야 하는지 동사로 명확히",
          "예시(example): 원하는 입력→출력 형식을 시범으로 제공",
          "제약(constraint): 길이·형식·금지사항 등 지켜야 할 규칙"
        ]
      },
      {
        "h": "대표 프롬프팅 기법",
        "items": [
          "Zero-shot: 예시 없이 지시만으로 시키기",
          "Few-shot: 정답 예시 몇 개로 형식·기준 학습시키기",
          "Chain-of-Thought: 풀이 과정을 적게 해 정답률 높이기",
          "역할 부여: '너는 전문가다'로 답의 깊이·말투 조정"
        ]
      },
      {
        "h": "컨텍스트 엔지니어링",
        "items": [
          "컨텍스트 윈도우 한도와 토큰 비용 이해",
          "긴 문서 요약·압축으로 핵심만 넣기",
          "System/User/Assistant 역할별 메시지 분리",
          "환각 줄이기: 근거 제시 요구·모르면 모른다고 답하게 하기"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 나쁜 프롬프트 → 좋은 프롬프트로 고치기",
        "steps": [
          "1) '회의록 정리해줘'라는 막연한 프롬프트로 결과를 받아 본다.",
          "2) 결과가 왜 애매한지(형식·길이·빠진 정보) 적어 본다.",
          "3) 역할('너는 비서다')·지시('핵심 결정사항만 불릿으로')·제약('5줄 이내')을 추가한다.",
          "4) 고친 프롬프트로 다시 실행해 결과를 비교한다.",
          "5) 개선 전후를 나란히 캡처해 무엇이 좋아졌는지 한 줄로 정리한다."
        ]
      },
      {
        "title": "Lab2. Few-shot 예시 개수에 따른 변화 관찰",
        "steps": [
          "1) 감정 분류(긍정/부정) 작업을 예시 0개(Zero-shot)로 먼저 시켜 본다.",
          "2) 정답 예시 2개를 넣어 다시 시켜 본다.",
          "3) 예시를 4개로 늘려 한 번 더 시켜 본다.",
          "4) 예시 수가 늘수록 답 형식이 일정해지는지 표로 기록한다.",
          "5) '예시가 많을수록 토큰도 늘어 비용이 오른다'는 점을 함께 적는다."
        ]
      }
    ],
    "homework": [
      "본인 업무에서 자주 하는 반복 작업 1가지를 골라, 역할·지시·예시·제약 4요소를 모두 갖춘 프롬프트로 만들고 개선 전후 결과를 비교해 제출한다.",
      "같은 질문을 temperature 0과 1로 각각 3번씩 실행해, 답이 얼마나 달라지는지 관찰한 메모를 제출한다."
    ]
  },
  "vue-1": {
    "topics": [
      {
        "h": "개발 환경 준비물",
        "items": [
          "Node.js LTS 설치",
          "VS Code 편집기 + Volar 확장",
          "Vite로 프로젝트 생성",
          "npm run dev 로 개발 서버 실행"
        ]
      },
      {
        "h": "반응형의 두 도구",
        "items": [
          "ref: 숫자·문자 등 값 하나",
          "reactive: 객체·여러 값 묶음",
          ".value 접근 규칙",
          "템플릿에서는 .value 생략"
        ]
      },
      {
        "h": "기본 디렉티브",
        "items": [
          "v-bind(:속성) 값 묶기",
          "v-on(@이벤트) 동작 연결",
          "v-model 양방향 바인딩",
          "v-if / v-for 조건·반복"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 첫 프로젝트 띄우기",
        "steps": [
          "`npm create vite@latest hello-vue -- --template vue` 입력",
          "`cd hello-vue` 후 `npm install` 실행",
          "`npm run dev` 실행 후 브라우저에서 기본 화면 확인",
          "src/App.vue 의 <h1> 글자를 '내 첫 Vue!'로 바꿔 저장하고 화면이 바뀌는지 확인"
        ]
      },
      {
        "title": "Lab 2. v-for로 목록 출력",
        "steps": [
          "<script setup>에 `const fruits = ref(['사과','바나나','포도'])` 작성",
          "<template>에 `<ul>` 안에서 `<li v-for=\"f in fruits\" :key=\"f\">{{ f }}</li>` 작성",
          "화면에 과일 3개가 목록으로 나오는지 확인",
          "fruits 배열에 '딸기'를 추가하면 목록이 자동으로 늘어나는지 확인"
        ]
      }
    ],
    "homework": [
      "오늘 만든 카운터에 '-1' 버튼과 '0으로 초기화' 버튼을 추가하고, count가 음수가 되지 않도록 막아 본다.",
      "좋아하는 음식 5개를 ref 배열로 만들어 v-for로 화면에 번호와 함께 출력해 본다."
    ]
  },
  "vue-2": {
    "topics": [
      {
        "h": "컴포넌트 통신 3종",
        "items": [
          "props로 아래로 전달",
          "emit으로 위로 신호",
          "slot으로 내용 끼우기",
          "단방향 데이터 흐름 원칙"
        ]
      },
      {
        "h": "라이프사이클",
        "items": [
          "onBeforeMount",
          "onMounted(화면 등장)",
          "onUpdated",
          "onUnmounted(화면 제거)"
        ]
      },
      {
        "h": "로직 재사용",
        "items": [
          "setup 함수 구조",
          "컴포저블 use~ 함수",
          "ref/computed 반환",
          "여러 컴포넌트 공유"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. props로 인사 카드 만들기",
        "steps": [
          "components/HelloCard.vue 생성 후 `defineProps(['name'])` 작성",
          "템플릿에 `<p>{{ name }}님 환영합니다</p>` 작성",
          "App.vue에서 `<HelloCard name=\"철수\" />` 처럼 이름을 내려준다",
          "이름을 '영희'로 바꿔 화면이 바뀌는지 확인"
        ]
      },
      {
        "title": "Lab 2. 컴포저블로 카운터 로직 빼기",
        "steps": [
          "src/composables/useCounter.js 생성",
          "그 안에 `import { ref } from 'vue'` 후 count와 increase를 반환하는 useCounter 함수 작성",
          "App.vue에서 `const { count, increase } = useCounter()` 로 가져와 사용",
          "버튼을 눌러 count가 올라가는지 확인하고, 다른 컴포넌트에서도 재사용해 본다"
        ]
      }
    ],
    "homework": [
      "TodoItem에 '수정' 버튼을 추가해, 클릭하면 입력칸으로 바뀌어 글자를 고칠 수 있게 만들어 본다.",
      "useCounter 컴포저블에 reset 기능을 추가하고, 두 개의 독립된 카운터를 한 화면에 띄워 본다."
    ]
  },
  "vue-3": {
    "topics": [
      {
        "h": "Vue Router 핵심",
        "items": [
          "createRouter/createWebHistory",
          "routes 경로 표",
          "router-link 이동",
          "router-view 렌더 자리",
          "동적 :id 파라미터"
        ]
      },
      {
        "h": "라우트 제어",
        "items": [
          "중첩 라우트(children)",
          "이름 있는 라우트(name)",
          "네비게이션 가드(beforeEach)",
          "프로그래밍 방식 이동 router.push"
        ]
      },
      {
        "h": "Pinia 구성",
        "items": [
          "state(값)",
          "getters(파생값)",
          "actions(변경 함수)",
          "여러 컴포넌트 공유"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 페이지 2개 연결",
        "steps": [
          "`npm install vue-router` 설치",
          "router/index.js에 '/'와 '/about' 경로 등록",
          "main.js에 `app.use(router)` 추가",
          "App.vue에 router-link 2개와 router-view 1개를 넣고 이동되는지 확인"
        ]
      },
      {
        "title": "Lab 2. 카운터 전역 스토어",
        "steps": [
          "`npm install pinia` 설치 후 main.js에 `app.use(createPinia())` 추가",
          "stores/counter.js에 state count와 action increase 정의",
          "두 개의 서로 다른 컴포넌트에서 같은 스토어를 import",
          "한 컴포넌트에서 increase하면 다른 컴포넌트의 숫자도 같이 오르는지 확인"
        ]
      }
    ],
    "homework": [
      "상품 목록에 검색창을 추가하고, 입력한 글자가 포함된 상품만 필터링해 보여 준다.",
      "장바구니 스토어에 removeItem(삭제)과 totalPrice(합계) getter를 추가하고 장바구니 페이지를 만들어 본다."
    ]
  },
  "vue-4": {
    "topics": [
      {
        "h": "비동기 데이터 처리",
        "items": [
          "async/await 기본",
          "axios get/post",
          "try/catch 에러 처리",
          "로딩·빈 상태 UI"
        ]
      },
      {
        "h": "폼과 검증",
        "items": [
          "v-model 입력 바인딩",
          "필수값 검사",
          "이메일 형식 검사",
          "제출 후 입력칸 초기화"
        ]
      },
      {
        "h": "빌드·배포",
        "items": [
          "환경변수 .env 관리",
          "npm run build",
          "dist 정적 결과물",
          "Netlify/GitHub Pages 배포"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 무료 API에서 목록 불러오기",
        "steps": [
          "`npm install axios` 설치",
          "컴포넌트에 `const posts = ref([])` 선언",
          "onMounted에서 axios.get으로 jsonplaceholder /posts 호출 후 posts에 저장",
          "v-for로 글 제목 10개만 화면에 출력되는지 확인"
        ]
      },
      {
        "title": "Lab 2. 빌드하고 미리보기",
        "steps": [
          "터미널에서 `npm run build` 실행",
          "생성된 dist 폴더 안에 index.html과 assets가 있는지 확인",
          "`npm run preview` 실행 후 안내된 주소 접속",
          "개발 서버 없이도 화면이 정상 동작하는지 확인"
        ]
      }
    ],
    "homework": [
      "사용자 목록에 '삭제' 버튼을 추가해 axios.delete로 서버에 삭제 요청을 보내고 화면에서도 제거해 본다.",
      "오늘 만든 미니 SPA를 GitHub Pages 또는 Netlify에 실제로 배포하고, 공개 주소를 동료와 공유해 본다."
    ]
  },
  "webproject-1": {
    "topics": [
      {
        "h": "기획 단계 산출물",
        "items": [
          "한 문장 주제 정의",
          "사용자 시나리오 3개",
          "기능 명세서(필수/선택)",
          "와이어프레임 3화면"
        ]
      },
      {
        "h": "설계 단계 산출물",
        "items": [
          "화면 흐름도",
          "데이터 모델(필드 정의)",
          "프론트/백 아키텍처 그림",
          "API 목록 초안"
        ]
      },
      {
        "h": "협업 준비",
        "items": [
          "기술 스택 합의",
          "Git 저장소 초기화",
          "작업 분담표",
          "일정(마일스톤) 표"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. Vue 프로젝트 처음부터 만들어 실행하기",
        "steps": [
          "터미널을 열고 작업할 폴더로 이동한다.",
          "'npm create vite@latest my-web -- --template vue' 를 입력하고 엔터를 누른다.",
          "'cd my-web' 으로 만들어진 폴더 안으로 들어간다.",
          "'npm install' 로 필요한 패키지를 모두 내려받는다(잠시 기다림).",
          "'npm run dev' 를 실행하고 출력된 주소(http://localhost:5173)를 브라우저에 입력한다.",
          "Vue 시작 화면이 보이면 성공이다(보이지 않으면 터미널의 빨간 에러 메시지를 읽는다)."
        ]
      },
      {
        "title": "Lab 2. 목업 데이터 만들고 README에 기획 정리하기",
        "steps": [
          "프로젝트 안에 data 폴더를 만들고 그 안에 mock.json 파일을 새로 만든다.",
          "위 realCode의 가짜 데이터 예시를 참고해 우리 주제에 맞는 항목 3개를 적는다.",
          "README.md 를 열어 주제 한 문장, 기능 목록, 담당자, 일정을 적는다.",
          "'git add .' 와 'git commit -m \"기획·설계 초안\"' 으로 첫 커밋을 남긴다."
        ]
      }
    ],
    "homework": [
      "우리 팀 주제의 데이터 모델을 표로 정리하고(필드 이름·자료형·예시값) mock.json 으로 옮겨 적어 오기.",
      "와이어프레임 3화면을 깔끔히 다시 그려 사진을 찍어 README에 첨부하기."
    ]
  },
  "webproject-2": {
    "topics": [
      {
        "h": "화면 구현",
        "items": [
          "컴포넌트 분리(카드·폼)",
          "v-for 목록 렌더링",
          "props/emit 통신",
          "조건부 렌더 v-if"
        ]
      },
      {
        "h": "이동과 데이터",
        "items": [
          "Vue Router 설치·등록",
          "동적 라우트(/item/:id)",
          "Pinia 스토어 구성",
          "화면-스토어 연동"
        ]
      },
      {
        "h": "폼과 안정성",
        "items": [
          "v-model 입력 바인딩",
          "유효성 검사",
          "예외 처리(빈값·에러)",
          "fetch 비동기 로딩"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 라우터로 목록↔상세 화면 이동 붙이기",
        "steps": [
          "'npm install vue-router' 로 라우터를 설치한다.",
          "src/router/index.js 를 만들고 '/'(목록)와 '/item/:id'(상세) 두 경로를 등록한다.",
          "main.js 에서 app.use(router) 로 라우터를 앱에 연결한다.",
          "App.vue 에 <router-view /> 를 넣어 현재 경로의 화면이 표시되게 한다.",
          "목록 카드에 router-link 를 걸어 클릭하면 상세 주소로 이동하는지 확인한다."
        ]
      },
      {
        "title": "Lab 2. 새 글 추가 폼 만들고 목록에 반영하기",
        "steps": [
          "input과 textarea, 제출 버튼으로 된 폼 컴포넌트를 만든다.",
          "ref로 title·memo 변수를 만들고 v-model로 입력칸과 연결한다.",
          "제출 함수에서 빈칸 검사 후 store의 add()를 호출한다.",
          "추가 직후 입력칸을 빈 문자열로 비우고, 목록 맨 위에 새 카드가 뜨는지 확인한다."
        ]
      }
    ],
    "homework": [
      "상세 화면(/item/:id)에서 라우트 파라미터 id로 스토어에서 해당 항목을 찾아 내용을 모두 표시하기.",
      "글 삭제 버튼을 만들어 스토어에 remove(id) 액션을 추가하고 목록에서 사라지게 만들기."
    ]
  },
  "webproject-3": {
    "topics": [
      {
        "h": "통합과 테스트",
        "items": [
          "브랜치 병합·충돌 해결",
          "전체 흐름 통합 테스트",
          "버그 목록·우선순위",
          "수정 후 재검증"
        ]
      },
      {
        "h": "빌드와 배포",
        "items": [
          "환경변수 분리(.env)",
          "vite base 설정",
          "npm run build/preview",
          "GitHub Pages 배포"
        ]
      },
      {
        "h": "발표와 회고",
        "items": [
          "시연 시나리오 준비",
          "발표 자료 구성",
          "성과·한계 정리",
          "팀 회고와 개선점"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 빌드하고 미리보기로 확인하기",
        "steps": [
          "vite.config.js 를 열어 base 값을 '/저장소이름/' 으로 적는다.",
          "'npm run build' 를 실행해 dist 폴더가 생기는지 확인한다.",
          "'npm run preview' 를 실행하고 안내된 주소로 접속한다.",
          "미리보기 화면에서 흰 화면 없이 모든 기능이 동작하는지 클릭해 확인한다."
        ]
      },
      {
        "title": "Lab 2. GitHub Pages로 인터넷에 배포하기",
        "steps": [
          "'npm install -D gh-pages' 로 배포 도구를 설치한다.",
          "package.json 의 scripts 에 \"deploy\": \"gh-pages -d dist\" 를 추가한다.",
          "'npm run build' 후 'npm run deploy' 를 실행한다.",
          "잠시 뒤 'https://<아이디>.github.io/저장소이름/' 에 접속해 동작을 확인한다."
        ]
      }
    ],
    "homework": [
      "배포한 사이트의 URL을 README 맨 위에 적고, 주요 화면 스크린샷 3장을 첨부하기.",
      "회고 문서를 작성해 '잘된 점·아쉬운 점·다음에 개선할 점'을 각각 2가지 이상 적기."
    ]
  },
  "spring-ai-1": {
    "topics": [
      {
        "h": "Spring AI 시작에 필요한 것",
        "items": [
          "Spring Boot 3.x + Java 17 이상",
          "Spring AI BOM과 모델 스타터(spring-ai-starter-model-openai 등)",
          "발급받은 API 키와 환경변수 등록",
          "application.yml의 model·temperature 설정"
        ]
      },
      {
        "h": "ChatClient 핵심 메서드",
        "items": [
          "prompt(): 요청 시작",
          "system(): AI 역할·규칙 지정",
          "user(): 사용자 입력 전달",
          "call().content(): 호출과 텍스트 추출",
          "call().chatResponse(): 토큰 사용량 등 메타데이터 포함 응답"
        ]
      },
      {
        "h": "운영 시 주의점",
        "items": [
          "키는 절대 코드·깃에 노출 금지",
          "모델별 요금·토큰 한도 확인",
          "타임아웃·재시도 설정",
          "프로바이더 교체는 의존성+설정만 변경"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 5분 만에 첫 호출 성공하기",
        "steps": [
          "start.spring.io에서 OpenAI + Spring Web 의존성으로 프로젝트를 생성한다.",
          "터미널에서 export OPENAI_API_KEY=발급키 를 입력해 키를 등록한다.",
          "application.yml에 api-key: ${OPENAI_API_KEY} 와 model: gpt-4o-mini 를 적는다.",
          "DemoApplication의 main 옆에 CommandLineRunner 빈을 추가해 chatClient.prompt().user(\"안녕\").call().content()를 출력한다.",
          "./gradlew bootRun 실행 후 콘솔에 AI 답변이 찍히면 성공이다."
        ]
      },
      {
        "title": "Lab 2. system 지시로 말투 바꾸기",
        "steps": [
          "Lab 1의 호출에 .system(\"모든 답을 한 문장으로 짧게 해줘\")를 추가한다.",
          "같은 질문 '스프링이 뭐야?'를 보내 답이 짧아졌는지 확인한다.",
          "system 문구를 '초등학생도 알게 비유로 설명해줘'로 바꿔 다시 실행한다.",
          "두 답변을 나란히 적어 system 지시가 출력에 주는 영향을 정리한다."
        ]
      }
    ],
    "homework": [
      "/chat 엔드포인트에 ?style=formal|casual 파라미터를 추가하고, 값에 따라 system 지시를 바꿔 말투가 달라지게 구현해 제출하라.",
      "OpenAI와 Anthropic 두 프로바이더를 각각 application.yml 설정으로 전환해 동일 질문을 보내고, 응답 길이·말투 차이를 표로 정리해 제출하라."
    ]
  },
  "spring-ai-2": {
    "topics": [
      {
        "h": "RAG 파이프라인 단계",
        "items": [
          "문서 로딩(Reader)",
          "청킹(TokenTextSplitter)",
          "임베딩(EmbeddingModel)",
          "색인(VectorStore.add)",
          "검색(similaritySearch)",
          "프롬프트 결합·생성"
        ]
      },
      {
        "h": "VectorStore 선택지",
        "items": [
          "pgvector(PostgreSQL 확장, 운영 친숙)",
          "Chroma(가볍게 로컬 실험)",
          "Redis/Milvus 등 대규모",
          "초기엔 SimpleVectorStore(메모리)로 빠른 테스트"
        ]
      },
      {
        "h": "검색 품질을 좌우하는 요소",
        "items": [
          "청크 크기와 겹침(overlap)",
          "top-k 개수",
          "임베딩 모델 성능",
          "메타데이터 필터링",
          "원문 정제(불필요 잡음 제거)"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. pgvector 띄우고 연결 확인",
        "steps": [
          "docker run으로 pgvector/pgvector:pg16 컨테이너를 5432 포트로 실행한다.",
          "application.yml에 datasource url(jdbc:postgresql://localhost:5432/postgres)과 계정을 적는다.",
          "spring.ai.vectorstore.pgvector.initialize-schema: true 를 추가한다.",
          "앱을 실행해 시작 로그에 에러 없이 스키마가 생성되면 연결 성공이다."
        ]
      },
      {
        "title": "Lab 2. 텍스트 1개 색인하고 검색",
        "steps": [
          "resources에 faq.txt를 만들어 환불·배송 관련 문장 5줄을 적는다.",
          "CommandLineRunner에서 파일을 읽어 ingest(text)를 호출해 색인한다.",
          "vectorStore.similaritySearch(SearchRequest.query(\"환불\").withTopK(1))로 검색한다.",
          "검색된 조각이 환불 관련 문장인지 콘솔로 확인한다."
        ]
      },
      {
        "title": "Lab 3. 없는 정보 처리 확인",
        "steps": [
          "/ask?q= 로 문서에 없는 질문을 보낸다.",
          "system 지시 덕분에 '모른다'고 답하는지 확인한다.",
          "지시 문구를 빼고 다시 호출해 환각이 생기는지 비교한다.",
          "두 결과 차이를 정리해 system 지시의 중요성을 메모한다."
        ]
      }
    ],
    "homework": [
      "여러 파일(.txt 3개 이상)을 색인하고, 답변에 어떤 파일의 어느 조각을 참고했는지 출처(파일명)를 함께 표시하도록 개선해 제출하라.",
      "청크 크기를 작게/크게 두 가지로 바꿔 같은 질문을 검색하고, 검색 정확도가 어떻게 달라지는지 비교 메모를 작성하라."
    ]
  },
  "spring-ai-3": {
    "topics": [
      {
        "h": "Function Calling 설계",
        "items": [
          "@Tool + 명확한 description",
          "인자·반환 타입은 단순하게",
          "부작용 있는 도구는 신중히",
          "여러 도구 등록과 자동 선택",
          "도구 실행 로그로 동작 추적"
        ]
      },
      {
        "h": "구조화 출력 활용",
        "items": [
          "record/클래스로 출력 스키마 정의",
          "call().entity(타입)로 매핑",
          "리스트·중첩 객체도 가능",
          "검증 실패 시 재요청 전략"
        ]
      },
      {
        "h": "운영·보안 고려사항",
        "items": [
          "프롬프트 인젝션 방어(도구 권한 최소화)",
          "타임아웃·재시도·서킷브레이커",
          "키·민감정보 마스킹",
          "비용·토큰 모니터링",
          "사용자 입력 검증"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 첫 도구 연결하기",
        "steps": [
          "@Tool description이 달린 getTime() 메서드(현재 시각 문자열 반환)를 만든다.",
          "chatClient.prompt().user(\"지금 몇 시야?\").tools(new MyTools()).call().content()로 호출한다.",
          "LLM이 getTime을 호출해 실제 시각으로 답하는지 확인한다.",
          "도구를 등록하지 않고 같은 질문을 보내 답이 어떻게 달라지는지 비교한다."
        ]
      },
      {
        "title": "Lab 2. record로 구조화 받기",
        "steps": [
          "record Profile(String name, int age)를 정의한다.",
          "user(\"홍길동, 30세 프로필 만들어줘\") 후 .entity(Profile.class)로 받는다.",
          "받은 객체의 name(), age()를 출력해 값이 들어왔는지 확인한다.",
          "필드를 하나 더(city) 추가하고 질문도 바꿔 매핑이 되는지 본다."
        ]
      },
      {
        "title": "Lab 3. 예외에 강하게 만들기",
        "steps": [
          "도구 메서드에서 일부러 예외를 던지게 한 뒤 호출해 본다.",
          "컨트롤러를 try-catch로 감싸 사용자에게 친절한 메시지를 반환한다.",
          "application.yml에 재시도 옵션을 켜고 일시 오류 시 재시도되는지 로그로 확인한다.",
          "정상·예외 두 경우의 응답을 비교 메모한다."
        ]
      }
    ],
    "homework": [
      "도구 2개 이상(예: 환율 조회, 시간 조회)을 등록하고, 질문에 따라 LLM이 적절한 도구를 골라 호출하는지 확인한 결과를 정리해 제출하라.",
      "Day2의 RAG와 Day3의 도구 호출을 한 서비스에 합쳐, 문서 검색이 필요하면 검색하고 실시간 데이터가 필요하면 도구를 부르는 통합 엔드포인트를 설계 다이어그램과 함께 제출하라."
    ]
  },
  "sllm-1": {
    "topics": [
      {
        "h": "sLLM을 고를 때 보는 것",
        "items": [
          "파라미터 크기(0.5B·1.5B·7B)",
          "지원 언어(한국어 품질)",
          "라이선스(상업적 사용 가능 여부)",
          "Instruct(대화용) vs Base(원형) 구분"
        ]
      },
      {
        "h": "로컬 실행 도구 3가지",
        "items": [
          "Ollama: 가장 쉬운 한 줄 실행",
          "vLLM: 빠른 대량 서빙에 강함",
          "Transformers: 세밀한 제어와 학습에 적합"
        ]
      },
      {
        "h": "경량화 키워드",
        "items": [
          "양자화(4bit·8bit)",
          "GGUF 포맷",
          "KV 캐시",
          "메모리(VRAM) 요구량 가늠하기"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. Ollama로 첫 로컬 모델 실행",
        "steps": [
          "ollama.com에서 설치 파일을 받아 설치한다.",
          "터미널에 'ollama pull gemma2:2b' 를 입력해 모델을 받는다.",
          "'ollama run gemma2:2b' 를 실행한다.",
          "'대한민국 수도는?' 이라고 물어 답을 확인한다.",
          "/bye 를 입력해 대화를 종료한다."
        ]
      },
      {
        "title": "Lab 2. 두 모델 비교 체험",
        "steps": [
          "'ollama pull qwen2.5:0.5b' 와 'ollama pull qwen2.5:1.5b' 를 각각 받는다.",
          "같은 질문 '재귀함수를 쉽게 설명해줘'를 두 모델에 던진다.",
          "각 답변의 길이와 정확도를 표로 정리한다.",
          "응답 체감 속도를 빠름/보통/느림으로 메모한다.",
          "어떤 업무에 어떤 크기가 맞을지 한 줄 결론을 적는다."
        ]
      }
    ],
    "homework": [
      "내 노트북 사양(메모리·GPU 유무)을 적고, 무리 없이 돌릴 수 있는 sLLM 크기를 한 가지 정해 그 이유를 3줄로 써 온다.",
      "실습으로 만든 FastAPI 챗봇에 /health 엔드포인트(서버 상태 'ok' 반환)를 추가하고 코드를 캡처해 제출한다."
    ]
  },
  "sllm-2": {
    "topics": [
      {
        "h": "좋은 데이터셋의 조건",
        "items": [
          "지시와 답이 명확히 1:1로 짝지음",
          "답변 톤·형식이 일관됨",
          "오타·중복 제거",
          "다양한 질문 유형 포함"
        ]
      },
      {
        "h": "핵심 하이퍼파라미터",
        "items": [
          "epoch(반복 횟수)",
          "learning_rate(학습 보폭)",
          "LoRA r(어댑터 크기)",
          "batch_size(한 번에 묶는 양)"
        ]
      },
      {
        "h": "파인튜닝 후 할 일",
        "items": [
          "보류 질문으로 평가",
          "과적합 여부 확인",
          "어댑터 저장·버전 관리",
          "서빙 연결(Ollama/서버)"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 나만의 instruction 데이터 10개 만들기",
        "steps": [
          "메모장으로 data.jsonl 파일을 연다.",
          "한 줄에 {\"instruction\": \"질문\", \"output\": \"답\"} 형식으로 작성한다.",
          "우리 도메인(예: 사내 규정)에 맞는 질문-답 10쌍을 채운다.",
          "줄마다 콤마 없이 한 줄에 하나씩만 둔다(JSON Lines 규칙).",
          "examples의 검증 코드를 실행해 '형식 OK'가 뜨는지 확인한다."
        ]
      },
      {
        "title": "Lab 2. 학습 전/후 답변 비교하기",
        "steps": [
          "원본 모델에 '우리 회사 환불 규정?'을 물어 답을 기록한다.",
          "train.py로 짧게(epoch 1) 학습을 돌린다.",
          "어댑터를 얹은 모델에 같은 질문을 다시 던진다.",
          "두 답변을 표로 나란히 붙여 차이를 표시한다.",
          "달라진 점(톤·정확도)을 한 줄 결론으로 적는다."
        ]
      }
    ],
    "homework": [
      "내 업무 도메인에서 instruction-output 쌍 30개 이상을 모아 data.jsonl로 만들어 제출한다(주제 한 줄 설명 포함).",
      "epoch를 1·3·5로 바꿔 학습한 뒤 같은 질문에 대한 답변 품질 변화를 표로 정리해 온다."
    ]
  },
  "ml-dl-1": {
    "topics": [
      {
        "h": "학습 유형",
        "items": [
          "지도학습(정답 있음)",
          "비지도학습(정답 없음·군집화)",
          "강화학습(보상으로 학습)",
          "각 유형의 대표 활용 사례"
        ]
      },
      {
        "h": "대표 알고리즘",
        "items": [
          "선형회귀·로지스틱회귀",
          "결정트리·랜덤포레스트",
          "KNN(최근접 이웃)",
          "SVM(서포트 벡터 머신)"
        ]
      },
      {
        "h": "성능 평가",
        "items": [
          "정확도(Accuracy)",
          "정밀도·재현율·F1",
          "ROC 곡선과 AUC",
          "혼동행렬 읽는 법"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 · 내 손으로 데이터 나눠보기",
        "steps": [
          "Colab 새 노트를 열고 `from sklearn.datasets import load_iris` 와 `from sklearn.model_selection import train_test_split` 를 실행한다.",
          "`iris = load_iris()` 로 데이터를 불러온다.",
          "`X_tr, X_te, y_tr, y_te = train_test_split(iris.data, iris.target, test_size=0.3, random_state=0)` 으로 7:3 으로 나눈다.",
          "`print(len(X_tr), len(X_te))` 를 실행해 105 와 45 가 나오는지 확인한다(기대 결과: 105 45)."
        ]
      },
      {
        "title": "Lab 2 · 정밀도와 재현율 직접 비교",
        "steps": [
          "위에서 만든 결정트리 모델로 `pred = model.predict(X_te)` 를 실행한다.",
          "`from sklearn.metrics import precision_score, recall_score` 를 가져온다.",
          "`print(precision_score(y_te, pred, average='macro'))` 와 `print(recall_score(y_te, pred, average='macro'))` 를 실행한다.",
          "두 숫자가 비슷한지 보고, 차이가 크면 어떤 품종에서 차이가 났는지 혼동행렬로 확인한다."
        ]
      }
    ],
    "homework": [
      "scikit-learn 의 `load_wine()` 와인 데이터로 결정트리와 KNN 분류 모델을 각각 학습시키고, 정확도와 classification_report 를 비교해 어느 모델이 더 나은지 한 단락으로 정리해 제출한다.",
      "과적합을 일부러 만들어보자: DecisionTreeClassifier 의 max_depth 를 1, 3, None 으로 바꿔가며 학습용 정확도와 평가용 정확도를 표로 정리하고, 차이가 가장 큰 경우를 찾아 그 이유를 한 줄로 적는다."
    ]
  },
  "ml-dl-2": {
    "topics": [
      {
        "h": "신경망 구조",
        "items": [
          "퍼셉트론(단일 뉴런)",
          "다층 신경망(MLP)",
          "은닉층과 출력층",
          "가중치와 편향(bias)"
        ]
      },
      {
        "h": "학습 메커니즘",
        "items": [
          "순전파(forward)",
          "역전파(backward)",
          "경사하강법(Gradient Descent)",
          "에폭과 배치(batch)"
        ]
      },
      {
        "h": "핵심 부품",
        "items": [
          "활성화 함수(ReLU·Sigmoid·Softmax)",
          "손실 함수(CrossEntropy·MSE)",
          "옵티마이저(SGD·Adam)",
          "학습률(learning rate)"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 · 가장 작은 신경망 만들기",
        "steps": [
          "Colab 에서 `import torch; import torch.nn as nn` 을 실행한다.",
          "`layer = nn.Linear(3, 1)` 로 입력 3개를 받아 1개를 내는 층을 만든다.",
          "`x = torch.tensor([[1.0, 2.0, 3.0]])` 로 입력 한 줄을 만든다.",
          "`print(layer(x))` 를 실행해 숫자 하나가 출력되면, 신경망 한 층이 동작한 것이다(값은 무작위 초기화라 매번 다름)."
        ]
      },
      {
        "title": "Lab 2 · 손실이 줄어드는지 눈으로 보기",
        "steps": [
          "본문 실습 코드의 학습 루프 앞에 `losses = []` 를 만들고, 루프 안에서 `losses.append(loss.item())` 를 추가한다.",
          "`import matplotlib.pyplot as plt` 를 실행한다.",
          "학습이 끝난 뒤 `plt.plot(losses); plt.xlabel('epoch'); plt.ylabel('loss'); plt.show()` 를 실행한다.",
          "그래프가 왼쪽 위에서 오른쪽 아래로 내려가면 학습이 잘 된 것이다."
        ]
      }
    ],
    "homework": [
      "본문 신경망의 은닉층 크기를 32 에서 64, 128 로 늘려가며 평가 정확도가 어떻게 바뀌는지 표로 정리하고, 무조건 크다고 좋아지는지 한 줄로 결론을 적는다.",
      "옵티마이저를 Adam 대신 `torch.optim.SGD(model.parameters(), lr=0.01)` 로 바꿔 같은 100 에폭을 학습시키고, 손실이 줄어드는 속도를 Adam 과 비교해 짧게 정리한다."
    ]
  },
  "ml-dl-3": {
    "topics": [
      {
        "h": "대표 아키텍처",
        "items": [
          "CNN(이미지·합성곱·풀링)",
          "RNN/LSTM(순서·기억)",
          "Transformer·Attention",
          "데이터 종류별 선택 기준"
        ]
      },
      {
        "h": "과적합 방지",
        "items": [
          "드롭아웃(Dropout)",
          "정규화(L2·BatchNorm)",
          "데이터 증강(Augmentation)",
          "조기종료(Early Stopping)"
        ]
      },
      {
        "h": "성능 끌어올리기",
        "items": [
          "하이퍼파라미터 튜닝",
          "학습률 조정",
          "전이학습(Transfer Learning)",
          "사전학습 모델 활용"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 · 과적합 직접 목격하기",
        "steps": [
          "본문 CNN 코드에서 드롭아웃 줄(`self.drop` 적용)을 주석 처리해 끈다.",
          "학습 루프 안에서 매 에폭 학습 정확도와 평가 정확도를 함께 출력하도록 두 줄을 추가한다.",
          "에폭이 늘수록 학습 정확도는 1.0 에 가까워지는데 평가 정확도는 더 안 오르거나 떨어지는 구간을 찾는다.",
          "그 차이가 벌어지는 지점이 바로 과적합이 시작되는 순간임을 메모한다."
        ]
      },
      {
        "title": "Lab 2 · 드롭아웃으로 과적합 줄이기",
        "steps": [
          "Lab 1 에서 끈 드롭아웃 적용 줄을 다시 살리고 비율을 `nn.Dropout(0.3)` 으로 둔다.",
          "같은 에폭 수로 다시 학습시킨다.",
          "학습 정확도와 평가 정확도의 차이가 Lab 1 보다 줄었는지 비교한다.",
          "드롭아웃 비율을 0.5 로 올려 한 번 더 돌려보고, 너무 높이면 학습 정확도까지 낮아지는지 확인한다."
        ]
      }
    ],
    "homework": [
      "본문 CNN 에 합성곱 층을 하나 더 추가(예: Conv2d(8, 16, 3, padding=1) + ReLU + MaxPool)해 깊게 만든 뒤, 평가 정확도가 올라가는지 표로 비교하고 깊게 쌓는 것의 장단점을 한 단락으로 정리한다.",
      "전이학습 개념을 글로 정리한다: 사전학습 모델을 가져와 마지막 층만 새로 학습시키는 방식이 적은 데이터에서 왜 유리한지, 일상 비유를 들어 5문장 이내로 설명해 제출한다."
    ]
  },
  "feature-1": {
    "topics": [
      {
        "h": "데이터 정제(Cleaning)",
        "items": [
          "결측치 처리: 삭제 vs 평균·중앙값·최빈값 채우기",
          "이상치 탐지: IQR 규칙·박스플롯·z-score",
          "중복 행 제거와 자료형(타입) 교정"
        ]
      },
      {
        "h": "피처 변환(Transform)",
        "items": [
          "스케일링: StandardScaler(표준화)·MinMaxScaler(0~1)",
          "로그 변환으로 한쪽으로 쏠린 분포 펴기",
          "범주 인코딩: 원-핫·라벨·타깃 인코딩 선택 기준"
        ]
      },
      {
        "h": "피처 생성·선택",
        "items": [
          "수치 조합·구간화(binning), 날짜·텍스트 파생 피처",
          "상관관계·피처 중요도로 불필요한 피처 제거",
          "PCA 등 차원 축소로 피처 수 줄이기"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 결측치·이상치 진단하고 채우기",
        "steps": [
          "샘플 데이터를 `pd.read_csv` 로 불러온다.",
          "`df.info()` 와 `df.isnull().sum()` 으로 빈 값 위치를 파악한다.",
          "숫자 칸은 `df['col'].fillna(df['col'].median())` 로 채운다.",
          "`df['col'].quantile([0.25,0.75])` 로 IQR 을 구해 이상치 경계를 계산한다.",
          "경계 밖 값을 `clip` 으로 잘라내고 `describe()` 로 결과를 확인한다."
        ]
      },
      {
        "title": "Lab 2. 스케일링과 인코딩 적용",
        "steps": [
          "`from sklearn.preprocessing import StandardScaler` 를 가져온다.",
          "숫자 칸에 `StandardScaler().fit_transform(...)` 을 적용해 표준화한다.",
          "글자 칸은 `pd.get_dummies(...)` 로 원-핫 인코딩한다.",
          "가공 전후 `df.head()` 를 출력해 값이 바뀐 것을 비교한다.",
          "가공된 표를 새 변수에 저장해 다음 모델 학습에 쓴다."
        ]
      },
      {
        "title": "Lab 3. 피처 중요도로 선택하기",
        "steps": [
          "`from sklearn.ensemble import RandomForestClassifier` 를 가져온다.",
          "모델을 `fit(X, y)` 로 학습한다.",
          "`model.feature_importances_` 로 각 피처의 중요도를 확인한다.",
          "중요도를 내림차순 정렬해 상위 피처만 골라낸다.",
          "선택한 피처로만 다시 학습해 점수가 유지·향상되는지 비교한다."
        ]
      }
    ],
    "homework": [
      "타이타닉 외 다른 데이터셋(예: 집값 데이터)을 골라 결측치 처리·인코딩·파생 피처 1개 이상을 적용하고, 피처 가공 전후 정확도(또는 오차)를 비교한 노트북을 제출한다.",
      "내가 만든 파생 피처 2개에 대해 \"왜 이 피처가 도움이 될 것이라 생각했는지\"를 3줄로 설명해 마크다운 셀에 적는다."
    ]
  },
  "modeldev-1": {
    "topics": [
      {
        "h": "데이터 나누기 원칙",
        "items": [
          "학습/검증/테스트의 역할 구분",
          "테스트 데이터는 끝까지 비공개",
          "stratify 로 정답 비율 유지",
          "random_state 로 재현성 확보"
        ]
      },
      {
        "h": "교차검증의 종류",
        "items": [
          "K-Fold(데이터를 K조각으로)",
          "StratifiedKFold(분류에서 비율 유지)",
          "cv 값이 클수록 정확하지만 오래 걸림",
          "평균과 표준편차로 안정성 보기"
        ]
      },
      {
        "h": "베이스라인과 지표",
        "items": [
          "DummyClassifier/회귀 평균으로 기준점",
          "분류: 정확도·정밀도·재현율·F1",
          "회귀: MAE·RMSE·R^2",
          "데이터 불균형 시 정확도 함정 주의"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 내 손으로 데이터 나눠 보기",
        "steps": [
          "새 노트북에서 load_iris 로 데이터를 불러온다.",
          "train_test_split 으로 test_size=0.3 으로 나눠 본다.",
          "len() 으로 학습/테스트 개수를 출력해 105와 45가 나오는지 확인한다.",
          "stratify=y 를 뺐을 때와 넣었을 때 테스트 정답 비율(numpy.bincount)을 비교한다."
        ]
      },
      {
        "title": "Lab2. 베이스라인과 내 모델 비교",
        "steps": [
          "DummyClassifier(찍기)의 점수를 먼저 구한다.",
          "LogisticRegression 으로 같은 데이터를 학습·평가한다.",
          "두 점수를 나란히 print 로 출력한다.",
          "내 모델이 찍기보다 얼마나 더 나은지 한 줄로 적는다."
        ]
      },
      {
        "title": "Lab3. 교차검증 점수 읽기",
        "steps": [
          "cross_val_score 로 cv=5 점수 배열을 구한다.",
          "scores.mean() 과 scores.std() 를 출력한다.",
          "표준편차가 크면 무슨 뜻인지(점수가 들쭉날쭉) 메모한다.",
          "cv=10 으로 바꿔 평균이 비슷한지 확인한다."
        ]
      }
    ],
    "homework": [
      "사이킷런의 와인(load_wine) 데이터로 오늘 배운 흐름(분할→파이프라인→테스트 점수→5겹 교차검증)을 그대로 반복해, 베이스라인 정확도와 교차검증 평균을 출력한 노트북을 제출한다.",
      "'테스트 점수 하나만 믿으면 안 되는 이유'를 교차검증과 연결해 3~4문장으로 정리해 마크다운 셀에 적는다."
    ]
  },
  "modeldev-2": {
    "topics": [
      {
        "h": "탐색 전략 고르기",
        "items": [
          "Grid: 적은 후보·확실함",
          "Random: 많은 후보·빠르게 훑기",
          "Bayesian: 결과 보고 똑똑하게 다음 후보",
          "랜덤→그리드 2단계로 다듬기"
        ]
      },
      {
        "h": "과적합 제어 도구",
        "items": [
          "정규화(L1/L2)로 복잡도 벌점",
          "조기종료로 학습 멈추기",
          "트리 깊이·잎 샘플 수 제한",
          "데이터 늘리기·교차검증으로 점검"
        ]
      },
      {
        "h": "앙상블 3종과 경량화",
        "items": [
          "배깅(RandomForest): 평균으로 안정",
          "부스팅(GBM): 실수 보완으로 정확",
          "스태킹: 모델 위에 메타모델",
          "경량화: 추론 속도·모델 크기 줄이기"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. GridSearch 손잡이 바꿔 보기",
        "steps": [
          "param_grid 에서 max_depth 후보를 [2, 3, 4, None] 으로 둔다.",
          "grid.fit 후 best_params_ 를 출력한다.",
          "n_estimators 후보를 [100, 300, 500] 으로 늘려 다시 돌린다.",
          "걸린 시간과 best_score_ 변화를 메모한다."
        ]
      },
      {
        "title": "Lab2. 조기종료 효과 확인",
        "steps": [
          "early_stopping=True 로 학습하고 n_iter_ 를 출력한다.",
          "early_stopping=False 로 바꿔 다시 학습한다.",
          "두 경우의 테스트 점수와 학습 시간을 비교한다.",
          "어느 쪽이 과적합·시간 면에서 유리했는지 한 줄로 정리한다."
        ]
      },
      {
        "title": "Lab3. 베이스라인 vs 튜닝 vs 앙상블 한 표로",
        "steps": [
          "Day1 베이스라인 점수를 변수에 적어 둔다.",
          "GridSearch 최적 모델 점수를 구한다.",
          "VotingClassifier 앙상블 점수를 구한다.",
          "세 점수를 print 로 나란히 출력해 가장 좋은 것을 고른다."
        ]
      }
    ],
    "homework": [
      "load_breast_cancer 데이터로 RandomForest 에 대해 GridSearchCV(또는 RandomizedSearchCV)를 적용하고, 베이스라인 대비 테스트 점수가 얼마나 올랐는지 비교표를 만든 노트북을 제출한다.",
      "'그리드 서치 / 랜덤 서치 / 조기종료'를 각각 한 문장으로 쉬운 비유와 함께 정리해 마크다운으로 제출한다."
    ]
  },
  "rag-1": {
    "topics": [
      {
        "h": "RAG가 해결하는 LLM의 약점",
        "items": [
          "학습 시점 이후의 최신 정보를 모르는 문제",
          "회사 내부 문서 등 비공개 자료를 모르는 문제",
          "모르는 것을 지어내는 환각 문제",
          "답의 출처를 제시하지 못하는 신뢰성 문제"
        ]
      },
      {
        "h": "청킹 전략을 정하는 기준",
        "items": [
          "chunk_size: 너무 크면 검색이 뭉뚱그려지고 너무 작으면 문맥이 끊긴다",
          "chunk_overlap: 조각 경계에서 문맥이 잘리지 않게 겹치는 양",
          "문서 종류별 분할 기준(문단·문장·마크다운 헤더 등)",
          "표·코드처럼 잘리면 안 되는 구조의 보존"
        ]
      },
      {
        "h": "임베딩과 벡터 검색의 구성요소",
        "items": [
          "임베딩 모델 선택(차원 수·다국어 지원·비용)",
          "유사도 척도: 코사인 유사도와 내적",
          "벡터 인덱스 저장소(Chroma·FAISS·pgvector)",
          "검색 개수 k 와 결과 품질의 관계"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 — 처음부터 개발환경 만들기",
        "steps": [
          "터미널에서 작업 폴더로 이동한 뒤 'python -m venv venv' 로 가상환경을 만든다.",
          "'source venv/bin/activate' (윈도우는 venv\\Scripts\\activate)로 가상환경을 켠다.",
          "'pip install langchain langchain-community langchain-openai chromadb pypdf numpy' 로 라이브러리를 설치한다.",
          "'python -c \"import langchain; print(langchain.__version__)\"' 를 실행해 버전이 출력되면 설치 성공이다."
        ]
      },
      {
        "title": "Lab 2 — 청킹 파라미터 바꿔 비교하기",
        "steps": [
          "예제2 코드를 파일로 저장한다.",
          "chunk_size 를 100에서 300으로 바꿔 실행하고 조각 수가 줄어드는지 확인한다.",
          "chunk_overlap 을 0으로 바꿔 실행하고 조각 경계의 문맥이 어떻게 끊기는지 첫 두 조각을 비교한다.",
          "어떤 설정이 우리 문서에 적당한지 한 줄 메모로 남긴다."
        ]
      }
    ],
    "homework": [
      "자신이 자주 보는 PDF 1개를 골라 오늘 만든 indexing.py 로 인덱싱하고, 질문 3개를 던져 검색 결과를 캡처해 제출한다.",
      "chunk_size 를 300/500/800 세 가지로 바꿔 같은 질문을 검색했을 때 결과가 어떻게 달라지는지 2~3문장으로 정리한다."
    ]
  },
  "rag-2": {
    "topics": [
      {
        "h": "Retriever 튜닝 포인트",
        "items": [
          "top-k: 가져올 조각 수(3~5에서 시작)",
          "search_type: similarity 와 mmr(다양성 확보)의 차이",
          "score_threshold: 일정 점수 미만은 버리기",
          "메타데이터 필터로 특정 문서만 검색하기"
        ]
      },
      {
        "h": "검색 품질을 높이는 기법",
        "items": [
          "하이브리드 검색(BM25 + 벡터)",
          "재순위 모델(Cross-Encoder, Cohere Rerank)",
          "질문 재작성(query rewriting)",
          "다중 질의(multi-query)로 검색 범위 넓히기"
        ]
      },
      {
        "h": "답변 생성 프롬프트 설계",
        "items": [
          "컨텍스트만 근거로 답하라는 제약",
          "근거 없으면 '모른다'고 답하게 하는 안전장치",
          "출처(파일·페이지) 함께 표기하기",
          "답변 형식·길이·말투 지정"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 — 리트리버 동작 눈으로 확인하기",
        "steps": [
          "예제1 코드를 파일로 저장하고 실행한다.",
          "k 값을 3에서 1로 바꿔 실행하고 가져온 조각 수가 1개로 주는지 확인한다.",
          "질문을 우리 문서와 무관한 내용(예: '날씨 어때')으로 바꿔 보고 어떤 조각이 오는지 관찰한다.",
          "관찰 결과를 한 줄로 메모한다."
        ]
      },
      {
        "title": "Lab 2 — '모른다'고 답하게 만들기",
        "steps": [
          "실전 코드의 QA 체인을 실행한다.",
          "문서에 분명히 있는 질문을 던져 정상 답변과 출처가 나오는지 확인한다.",
          "문서에 없는 질문을 던져 '모른다'고 답하는지 확인한다.",
          "만약 지어낸 답이 나오면 프롬프트의 '근거 없으면 모른다' 문장을 더 강하게 고쳐 다시 시험한다."
        ]
      }
    ],
    "homework": [
      "어제 인덱싱한 자신의 문서로 QA 체인을 만들어, 정상 질문 2개와 문서에 없는 질문 1개를 던진 결과를 캡처해 제출한다.",
      "k 값을 2와 6으로 바꿔 같은 질문을 했을 때 답변 품질이 어떻게 달라지는지 2~3문장으로 정리한다."
    ]
  },
  "rag-3": {
    "topics": [
      {
        "h": "RAG 평가 지표",
        "items": [
          "충실도(faithfulness): 답이 근거에 충실한가",
          "답변 관련성(answer relevancy): 질문에 잘 맞는가",
          "문맥 정밀도/재현율(context precision/recall): 검색이 좋은가",
          "정답셋(ground truth) 만들기와 평가셋 규모"
        ]
      },
      {
        "h": "성능을 올리는 튜닝 손잡이",
        "items": [
          "청킹: chunk_size·overlap·분할 기준",
          "임베딩 모델 교체(차원·다국어·비용)",
          "검색: k·하이브리드·재순위",
          "한 번에 하나씩만 바꿔 비교하기"
        ]
      },
      {
        "h": "운영(비용·지연·안정성)",
        "items": [
          "캐싱으로 반복 질문 비용 절감",
          "메타데이터 필터로 검색 범위 축소",
          "토큰 비용과 응답 지연의 trade-off",
          "멀티 문서·접근 권한·갱신 주기 관리"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 — 작은 평가셋으로 채점해 보기",
        "steps": [
          "내 문서에서 답이 분명한 질문 3개와 정답을 손으로 적는다.",
          "실전 평가 스크립트의 questions·ground_truths 를 내 것으로 바꾼다.",
          "evaluate 를 실행해 faithfulness 와 answer_relevancy 점수를 확인한다.",
          "두 점수를 '기준선'으로 메모해 둔다."
        ]
      },
      {
        "title": "Lab 2 — 한 손잡이만 바꿔 비교하기",
        "steps": [
          "k 값만 4에서 6으로 바꿔 체인을 다시 만든다(다른 설정은 그대로).",
          "같은 평가셋으로 evaluate 를 다시 실행한다.",
          "점수가 올랐는지 내렸는지 기준선과 비교한다.",
          "결과를 '한 줄 실험 노트'로 남긴다(예: k 6으로 충실도 +0.05, 응답은 느려짐)."
        ]
      }
    ],
    "homework": [
      "자신의 RAG에 질문 5개짜리 평가셋을 만들어 RAGAS 점수를 측정하고, 파라미터 하나를 바꿔 튜닝 전후 점수를 표로 정리해 제출한다.",
      "3일간 만든 RAG 파이프라인(인덱싱→QA→평가)을 한 장으로 요약하고, 실무에 적용한다면 어떤 문서와 어떤 비용/속도 제약이 있을지 3문장으로 정리한다."
    ]
  },
  "langchain-1": {
    "topics": [
      {
        "h": "LangChain 생태계 한눈에",
        "items": [
          "langchain-core: 모델·프롬프트·파서 같은 핵심 인터페이스",
          "langchain-openai 등 파트너 패키지: 실제 모델 제공사 연결",
          "LCEL: 부품을 파이프로 잇는 표현 언어",
          "LangSmith: 실행 과정을 들여다보는 관측 도구(이후 일차에서 학습)"
        ]
      },
      {
        "h": "Runnable 3대 실행 방식",
        "items": [
          "invoke: 입력 하나를 넣어 결과 하나를 받기",
          "stream: 글자가 흐르듯 실시간으로 받기",
          "batch: 여러 입력을 한꺼번에 처리하기",
          "ainvoke/astream: 비동기(async) 버전"
        ]
      },
      {
        "h": "출력 파서 종류",
        "items": [
          "StrOutputParser: 순수 문자열로",
          "CommaSeparatedListOutputParser: 쉼표 목록을 리스트로",
          "JsonOutputParser: JSON 구조로",
          "PydanticOutputParser: 정해진 데이터 클래스로 검증까지"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 — 가상환경부터 첫 호출까지",
        "steps": [
          "터미널을 열고 'python -m venv venv' 입력 후 가상환경 활성화한다.",
          "'pip install langchain langchain-openai python-dotenv' 로 패키지를 설치한다.",
          "'.env' 파일에 OPENAI_API_KEY 를 적어 저장한다.",
          "예제1 코드를 그대로 입력해 'python app.py' 로 실행한다.",
          "화면에 모델 답이 한 문장 출력되면 성공이다."
        ]
      },
      {
        "title": "Lab 2 — 프롬프트 빈칸 바꿔 보기",
        "steps": [
          "예제2 체인 코드를 복사해 새 파일에 붙여 넣는다.",
          "프롬프트 문구의 '초등학생' 을 '대학생' 으로 바꿔 본다.",
          "invoke의 topic 값을 '블록체인' 으로 바꿔 실행한다.",
          "설명의 난이도와 내용이 어떻게 달라지는지 비교해 기록한다.",
          "temperature=0 과 temperature=1 일 때 답이 얼마나 달라지는지 확인한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 '요약+키워드' 체인에 '감정(긍정/부정/중립) 판별' 체인을 하나 더 추가해, 한 입력에 대해 요약·키워드·감정 세 가지를 함께 출력하도록 확장하기",
      "StrOutputParser 대신 CommaSeparatedListOutputParser를 적용해 키워드가 파이썬 리스트로 출력되게 바꾸고, 결과 타입을 print(type(...))로 확인하기"
    ]
  },
  "langchain-2": {
    "topics": [
      {
        "h": "RAG 파이프라인 단계",
        "items": [
          "Load: 문서 불러오기(TextLoader, PyPDFLoader 등)",
          "Split: 적당한 크기로 청킹",
          "Embed & Store: 임베딩 후 벡터DB 저장",
          "Retrieve & Generate: 검색 결과를 프롬프트에 넣어 답 생성"
        ]
      },
      {
        "h": "메모리 다루는 방법",
        "items": [
          "메시지 리스트 직접 관리(가장 기본)",
          "RunnableWithMessageHistory로 세션별 자동 관리",
          "대화가 길면 요약 메모리로 압축",
          "세션 ID로 사용자별 기록 분리"
        ]
      },
      {
        "h": "검색 품질을 높이는 팁",
        "items": [
          "chunk_size·overlap 조절로 문맥 보존",
          "k값(가져올 조각 수) 튜닝",
          "메타데이터 필터로 범위 좁히기",
          "키워드+벡터 하이브리드 검색"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 — 내 문서로 작은 벡터DB 만들기",
        "steps": [
          "docs.txt에 회사·동아리 소개 글 10문장 정도를 적어 저장한다.",
          "TextLoader로 불러오고 RecursiveCharacterTextSplitter로 자른다.",
          "OpenAIEmbeddings + Chroma로 벡터DB를 만든다.",
          "retriever.invoke('가장 궁금한 한 가지') 로 검색되는 조각을 출력해 본다.",
          "검색된 조각이 질문과 관련 있는지 눈으로 확인한다."
        ]
      },
      {
        "title": "Lab 2 — RAG 체인으로 질문하기",
        "steps": [
          "실전 코드의 rag_chain을 그대로 작성한다.",
          "문서 안에 있는 사실을 묻고 답이 맞는지 확인한다.",
          "문서에 전혀 없는 내용을 물어 '모른다'고 답하는지 본다.",
          "프롬프트에서 '모르면 모른다고 해' 문장을 지웠을 때 답이 어떻게 달라지는지 비교한다.",
          "k값을 1과 5로 바꿔 답 품질 차이를 기록한다."
        ]
      }
    ],
    "homework": [
      "TextLoader 대신 PyPDFLoader로 실제 PDF 한 개를 불러와 같은 RAG 챗봇을 동작시키고, 답과 함께 근거가 된 문서 조각도 출력하도록 만들기",
      "오늘 만든 RAG 체인에 1교시에서 배운 대화 메모리를 결합해, '아까 답을 더 짧게 줄여줘' 같은 후속 질문도 처리되는지 실험하기"
    ]
  },
  "langchain-3": {
    "topics": [
      {
        "h": "서비스화 체크리스트",
        "items": [
          "스트리밍으로 체감 속도 개선",
          "캐싱으로 중복 호출 비용 절감",
          "재시도·폴백으로 장애 대응",
          "API 키·시크릿은 환경변수로 분리"
        ]
      },
      {
        "h": "관측과 디버깅(LangSmith)",
        "items": [
          "LANGCHAIN_TRACING_V2 환경변수로 추적 켜기",
          "단계별 입출력·지연·토큰 확인",
          "프롬프트 버전 비교(A/B)",
          "오류 발생 지점 빠르게 찾기"
        ]
      },
      {
        "h": "배포 옵션",
        "items": [
          "FastAPI + uvicorn 로컬 서버",
          "Docker 컨테이너로 패키징",
          "LangServe로 체인을 바로 API화",
          "클라우드(Cloud Run 등) 배포"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 — 스트리밍 체험",
        "steps": [
          "예제1 스트리밍 코드를 작성해 실행한다.",
          "topic을 '우주'로 바꿔 글자가 흘러나오는지 본다.",
          "stream을 invoke로 바꿔 실행해 출력 방식이 어떻게 달라지는지 비교한다.",
          "체감 대기 시간 차이를 한 줄로 기록한다."
        ]
      },
      {
        "title": "Lab 2 — FastAPI로 API 만들기",
        "steps": [
          "'pip install fastapi uvicorn' 로 설치한다.",
          "실전 코드의 main.py를 작성한다.",
          "'uvicorn main:app --reload' 로 서버를 띄운다.",
          "브라우저에서 http://127.0.0.1:8000/docs 를 연다.",
          "/summarize에 글을 넣어 요약 결과가 JSON으로 오는지 확인한다."
        ]
      },
      {
        "title": "Lab 3 — 캐싱 효과 측정",
        "steps": [
          "set_llm_cache(InMemoryCache())를 코드에 추가한다.",
          "같은 text로 /summarize를 두 번 호출한다.",
          "time 모듈로 각 호출 시간을 측정한다.",
          "두 번째 호출이 더 빠른지(캐시 적중) 확인해 기록한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 FastAPI 서비스에 Day2의 RAG 체인을 연결해 '/ask' 엔드포인트를 추가하고, 문서 기반 질문에 답하는 미니 생성형 AI 서비스로 완성하기",
      "LangSmith 계정을 만들어 추적을 켠 뒤, 체인 한 번을 실행하고 대시보드에서 단계별 입출력·토큰 수를 캡처해 정리하기"
    ]
  },
  "serving-1": {
    "topics": [
      {
        "h": "서빙 패턴 한눈에",
        "items": [
          "온라인 서빙(즉시 1건 응답)",
          "배치 서빙(모아서 대량 처리)",
          "스트림 서빙(흐르는 데이터 실시간 처리)",
          "요청량·지연 허용치로 방식 선택"
        ]
      },
      {
        "h": "추론 API 구성요소",
        "items": [
          "엔드포인트(URL) 정의",
          "입력 스키마와 자동 검증",
          "전처리→예측→후처리 흐름",
          "헬스체크(/health) 엔드포인트",
          "응답에 모델 버전 포함"
        ]
      },
      {
        "h": "모델 패키징·버전관리",
        "items": [
          "joblib/pickle 직렬화",
          "모델 파일과 라벨/전처리기 함께 저장",
          "BentoML 로 서비스 묶기",
          "버전 태그(v1.0.0)와 변경 이력 관리"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 내 첫 추론 함수 만들기",
        "steps": [
          "주피터에서 scikit-learn 붓꽃 데이터를 불러와 분류 모델을 학습한다.",
          "학습된 모델을 `joblib.dump` 로 model.joblib 파일에 저장한다.",
          "새 셀에서 `joblib.load` 로 모델을 다시 불러온다.",
          "측정값 4개를 리스트로 만들어 `model.predict` 에 넣고 결과를 출력한다.",
          "출력된 숫자를 품종 이름으로 바꿔 print 로 확인한다(예: 0 → setosa)."
        ]
      },
      {
        "title": "Lab 2. FastAPI 로 API 감싸기",
        "steps": [
          "`pip install fastapi uvicorn` 로 도구를 설치한다.",
          "app.py 에 FastAPI 앱과 Pydantic 입력 스키마를 작성한다.",
          "`/predict` POST 함수에서 모델을 불러 예측 결과를 반환하게 만든다.",
          "터미널에서 `uvicorn app:app --reload` 로 서버를 켠다.",
          "브라우저 `/docs` 에서 'Try it out' 으로 직접 호출해 응답을 확인한다."
        ]
      },
      {
        "title": "Lab 3. 잘못된 입력 막아 보기",
        "steps": [
          "숫자가 와야 할 자리에 문자열을 넣은 JSON 을 만든다.",
          "curl 또는 /docs 로 그 잘못된 입력을 전송한다.",
          "응답 코드가 422(검증 실패)로 오는지 확인한다.",
          "에러 메시지에서 어떤 필드가 문제인지 읽어 본다.",
          "올바른 입력으로 다시 보내 200 응답을 받아 비교한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 추론 API 에 `/model-info` GET 엔드포인트를 추가해 모델 버전·학습 데이터 이름·생성일을 JSON 으로 돌려주도록 확장하라.",
      "온라인 서빙과 배치 서빙이 각각 더 적합한 실제 서비스 사례를 2개씩 찾아, 응답 속도와 처리량 관점에서 왜 그 방식이 맞는지 3~4문장으로 정리하라."
    ]
  },
  "serving-2": {
    "topics": [
      {
        "h": "Docker 핵심",
        "items": [
          "이미지 vs 컨테이너 차이",
          "Dockerfile 작성 순서",
          "레이어 캐시로 빌드 가속",
          "포트 매핑(-p)과 볼륨(-v)",
          "docker compose 로 다중 컨테이너"
        ]
      },
      {
        "h": "확장과 부하 대응",
        "items": [
          "수평 확장(scale out)",
          "오토스케일링 기준(CPU·요청량)",
          "로드밸런싱으로 트래픽 분배",
          "헬스체크로 비정상 인스턴스 교체"
        ]
      },
      {
        "h": "관측성·드리프트",
        "items": [
          "메트릭(요청 수·지연·에러율)",
          "로그 수집과 검색",
          "분산 트레이싱",
          "데이터/모델 드리프트 감시",
          "이상 시 알림(alert)"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 추론 API 이미지로 굽기",
        "steps": [
          "app.py·model.joblib 이 있는 폴더에 requirements.txt 를 만든다.",
          "Dockerfile 을 베이스→작업폴더→설치→복사→실행 순서로 작성한다.",
          "`docker build -t iris-api:v1 .` 로 이미지를 만든다.",
          "`docker images` 로 만들어진 이미지를 목록에서 확인한다.",
          "`docker run -d -p 8000:8000 iris-api:v1` 로 실행하고 /health 를 호출해 본다."
        ]
      },
      {
        "title": "Lab 2. compose 로 모니터링까지 한 번에",
        "steps": [
          "app.py 에 prometheus-client 로 지표와 /metrics 를 추가한다.",
          "prometheus.yml 에 api:8000 을 수집 대상으로 적는다.",
          "docker-compose.yml 에 api·prometheus 두 서비스를 정의한다.",
          "`docker compose up --build` 로 두 컨테이너를 함께 띄운다.",
          "localhost:9090 에서 predict_requests_total 을 조회한다."
        ]
      },
      {
        "title": "Lab 3. 간단 드리프트 감시 만들기",
        "steps": [
          "학습 데이터의 각 입력 평균값을 기준값으로 저장한다.",
          "최근 들어온 입력들의 평균을 계산하는 함수를 만든다.",
          "기준값과 최근 평균의 차이가 임계치를 넘는지 비교한다.",
          "임계치를 넘으면 콘솔에 '드리프트 의심' 경고를 출력한다.",
          "일부러 다른 분포의 입력을 보내 경고가 뜨는지 확인한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 Dockerfile 의 이미지 용량을 `docker images` 로 확인하고, 베이스 이미지를 slim 으로 바꾸거나 불필요한 파일을 빼서 용량을 줄인 뒤 전후 크기를 비교해 정리하라.",
      "메트릭·로그·트레이싱 각각이 '문제를 발견·진단'하는 데 어떻게 다르게 쓰이는지, 응답이 갑자기 느려진 상황을 가정해 셋을 어떤 순서로 보는지 5문장 이내로 설명하라."
    ]
  },
  "serving-3": {
    "topics": [
      {
        "h": "MLOps 파이프라인",
        "items": [
          "데이터→학습→평가→배포 흐름",
          "실험 추적(MLflow)",
          "재현성(seed·환경 고정)",
          "파이프라인 자동화의 가치"
        ]
      },
      {
        "h": "모델 레지스트리·재현성",
        "items": [
          "모델 버전 관리",
          "Staging vs Production 단계",
          "스테이지 승격·롤백",
          "메타데이터(지표·데이터셋) 보관"
        ]
      },
      {
        "h": "CI/CD·AIOps",
        "items": [
          "push 트리거 자동 검사",
          "테스트 게이트로 배포 차단",
          "자동 배포(CD)",
          "AIOps 이상탐지·자동 알림·자동 대응"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. MLflow 로 실험 비교하기",
        "steps": [
          "`pip install mlflow` 후 `mlflow ui` 를 실행해 5000포트를 연다.",
          "train.py 에 start_run·log_param·log_metric 을 추가한다.",
          "n_estimators 값을 바꿔 가며 3번 실행한다.",
          "MLflow UI 의 Experiments 에서 세 run 의 accuracy 를 표로 본다.",
          "정확도가 가장 높은 run 을 찾아 설정값을 적어 둔다."
        ]
      },
      {
        "title": "Lab 2. 모델 등록과 승격",
        "steps": [
          "best run 의 모델을 log_model 로 'iris-clf' 이름으로 등록한다.",
          "MLflow UI 의 Models 탭에서 등록된 버전을 확인한다.",
          "해당 버전을 'Staging' 단계로 바꾼다.",
          "간단한 검증을 통과했다고 보고 'Production' 으로 승격한다.",
          "이전 버전으로 되돌리는(롤백) 메뉴 위치도 찾아 확인한다."
        ]
      },
      {
        "title": "Lab 3. GitHub Actions 자동화",
        "steps": [
          "프로젝트를 GitHub 저장소에 올린다.",
          ".github/workflows/mlops.yml 워크플로 파일을 작성한다.",
          "체크아웃→파이썬→설치→학습→pytest 단계를 적는다.",
          "코드를 push 하고 Actions 탭에서 실행을 지켜본다.",
          "일부러 테스트를 깨뜨려 빨간 X 가 배포를 막는지 확인한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 MLflow 실험에 학습 데이터 버전·학습 소요 시간·혼동행렬 이미지를 추가로 기록(log_artifact)하고, 어떤 정보가 재현성에 도움이 되는지 3~4문장으로 정리하라.",
      "AIOps 관점에서 '응답 지연 급증' 또는 '예측 분포 이상' 중 하나를 골라, 어떤 지표로 탐지하고 어떤 자동 대응(스케일 아웃·롤백·알림 등)을 연결할지 시나리오를 6~8문장으로 설계하라."
    ]
  },
  "agent-1": {
    "topics": [
      {
        "h": "에이전트의 4가지 구성요소",
        "items": [
          "두뇌(LLM): 무엇을 할지 판단하고 글을 만드는 핵심",
          "도구(Tools): 검색·계산·API 등 실제 일을 처리하는 손발",
          "기억(State/Memory): 지금까지의 대화와 중간 결과를 담는 메모장",
          "흐름 제어(Graph): 생각과 행동을 언제 반복하고 끝낼지 정하는 설계도"
        ]
      },
      {
        "h": "LangGraph 핵심 용어",
        "items": [
          "StateGraph: 상태를 들고 도는 그래프의 뼈대",
          "add_node / add_edge: 노드(작업)와 연결선을 추가하는 함수",
          "add_conditional_edges: 상태를 보고 다음 갈 곳을 정하는 갈림길",
          "START / END: 그래프의 시작점과 종료점 표시",
          "compile(): 그래프를 실제 실행 가능한 앱으로 굳히는 단계"
        ]
      },
      {
        "h": "처음 만들 때 자주 하는 실수",
        "items": [
          "bind_tools 를 빼먹어 LLM이 도구를 못 부르는 경우",
          "tools 노드에서 model 로 되돌아가는 엣지를 안 그려 루프가 끊기는 경우",
          "종료 조건(END)을 안 만들어 무한 반복에 빠지는 경우",
          "API 키를 코드에 그대로 적어 노출되는 경우(환경변수로 빼야 함)"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 도구 없이 한 노드짜리 그래프 돌려보기",
        "steps": [
          "StateGraph(State) 로 빈 그래프를 만든다.",
          "메시지를 그대로 모델에 넘기는 call_model 노드 하나만 add_node 한다.",
          "START → model, model → END 로 두 엣지만 연결한다.",
          "compile() 후 '자기소개 해줘' 를 invoke 해서 답이 한 번에 나오는지 확인한다(도구 없는 기본 흐름 체감)."
        ]
      },
      {
        "title": "Lab 2. 도구를 한 개 붙여 분기 만들기",
        "steps": [
          "multiply 함수에 @tool 을 붙여 도구로 등록한다.",
          "llm.bind_tools([multiply]) 로 모델에 도구를 연결한다.",
          "ToolNode([multiply]) 를 tools 노드로 추가하고 should_continue 분기를 연결한다.",
          "'12 곱하기 9는?' 으로 실행해 model→tools→model 순서로 로그가 찍히는지 확인한다(기대 결과: 108)."
        ]
      }
    ],
    "homework": [
      "오늘 만든 에이전트에 'add(덧셈)' 도구를 하나 더 추가하고, '(3 더하기 4) 곱하기 5는?' 같은 두 단계 질문이 도구를 두 번 부르며 풀리는지 로그로 확인해 제출한다.",
      "내가 자주 쓰는 업무(예: 환율 조회, 사내 위키 검색)를 에이전트로 만든다면 어떤 도구가 필요할지 3가지를 적고, 각 도구의 입력·출력을 한 줄씩 설계해 본다."
    ]
  },
  "agent-2": {
    "topics": [
      {
        "h": "멀티 에이전트 설계 패턴",
        "items": [
          "슈퍼바이저-작업자: 감독 한 명이 전문 작업자들을 지휘(가장 보편적)",
          "파이프라인: 조사→작성→검수처럼 정해진 순서로 줄 세우기",
          "서브그래프: 작은 그래프를 부품처럼 큰 그래프에 끼워 재사용",
          "공용 메모리: 작업자들이 같은 State 메모장을 공유해 결과 전달"
        ]
      },
      {
        "h": "Human-in-the-loop 활용 지점",
        "items": [
          "메일 전송·결제·삭제 등 되돌리기 어려운 행동 직전 승인",
          "에이전트가 만든 초안을 사람이 수정 후 이어가기",
          "민감한 데이터 접근 전 권한 확인",
          "여러 후보 중 사람이 하나를 골라 진행시키기"
        ]
      },
      {
        "h": "안정적 운영을 위한 장치",
        "items": [
          "재시도(retry): 도구 호출이 일시적으로 실패하면 자동 재시도",
          "에러 처리: try-except로 실패를 잡아 흐름이 멈추지 않게",
          "관측(observability): LangSmith 등으로 각 노드 입출력을 추적",
          "무한 루프 방지: 반복 횟수 상한(recursion_limit) 설정"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 작업자 한 명 더 추가하기",
        "steps": [
          "기존 그래프에 reviewer(검수) 노드 함수를 하나 더 만든다.",
          "supervisor 프롬프트의 선택지에 reviewer 를 추가한다.",
          "add_node 로 reviewer 를 등록하고 reviewer→supervisor 엣지를 연결한다.",
          "'요약 후 맞춤법까지 검수해줘' 로 실행해 writer 다음에 reviewer 가 호출되는지 확인한다."
        ]
      },
      {
        "title": "Lab 2. 승인 후 내용을 수정해서 이어가기",
        "steps": [
          "writer 전에서 멈춘 뒤 app.get_state(config) 로 현재 메시지를 확인한다.",
          "app.update_state(config, {\"messages\": [(\"user\", \"3줄 말고 5줄로 해줘\")]}) 로 지시를 바꾼다.",
          "app.invoke(None, config) 로 이어서 실행한다.",
          "최종 출력이 5줄 요약으로 바뀌었는지 확인한다(사람이 흐름에 개입해 결과를 바꾼 사례)."
        ]
      }
    ],
    "homework": [
      "오늘 만든 멀티 에이전트에 '번역' 작업자를 추가해, 최종 요약을 영어로도 만들어 달라고 하면 supervisor 가 researcher→writer→translator 순으로 지휘하는지 로그로 확인해 제출한다.",
      "내 업무 중 '사람 승인이 꼭 필요한 자동화'를 한 가지 정하고, 어느 노드 앞에 interrupt 를 걸지와 승인 화면에 무엇을 보여줄지 3~4문장으로 설계해 본다."
    ]
  },
  "vectordb-1": {
    "topics": [
      {
        "h": "임베딩과 유사도의 기초",
        "items": [
          "텍스트를 벡터로 바꾸는 임베딩 모델의 역할",
          "벡터 차원(예: 384, 768)의 의미와 모델별 차이",
          "코사인 유사도와 내적(dot product)의 관계",
          "벡터 길이 정규화(normalize)가 필요한 이유"
        ]
      },
      {
        "h": "인덱싱 알고리즘",
        "items": [
          "완전탐색(Flat)의 정확성과 느린 속도",
          "HNSW: 그래프 기반 탐색의 직관",
          "IVF: 클러스터로 나눠 검색 범위 줄이기",
          "정확도와 속도의 트레이드오프(recall vs latency)"
        ]
      },
      {
        "h": "대표 Vector DB와 실전 검색 기능",
        "items": [
          "임베디드형 FAISS·Chroma vs 서버/클라우드형 Pinecone·pgvector",
          "기존 PostgreSQL에 벡터를 더하는 pgvector",
          "메타데이터 필터링으로 검색 범위 좁히기",
          "키워드(BM25)+벡터를 합치는 하이브리드 검색"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 — 임베딩 첫걸음: 문장을 벡터로 바꿔 길이 확인하기",
        "steps": [
          "`pip install sentence-transformers` 로 라이브러리를 설치한다.",
          "파이썬 파일에서 `SentenceTransformer('all-MiniLM-L6-v2')` 모델을 불러온다.",
          "좋아하는 문장 1개를 `model.encode('문장')` 으로 벡터로 바꾼다.",
          "`print(len(벡터))` 로 벡터 길이가 384인지 확인한다 (기대 결과: 384).",
          "문장을 2개로 늘려 `encode([문장1, 문장2])` 의 결과 모양(shape)이 (2, 384)인지 확인한다."
        ]
      },
      {
        "title": "Lab 2 — FAISS Flat vs HNSW 검색 속도 비교",
        "steps": [
          "`pip install faiss-cpu numpy` 로 설치한다.",
          "`np.random.rand(10000, 384).astype('float32')` 로 가짜 벡터 1만 개를 만든다.",
          "`faiss.IndexFlatIP(384)` 와 `faiss.IndexHNSWFlat(384, 32)` 두 인덱스를 각각 만들어 `add` 한다.",
          "질문 벡터 1개로 두 인덱스에서 각각 `search(q, 5)` 를 실행한다.",
          "`import time` 으로 검색 전후 시간을 재서 두 방식의 속도 차이를 출력하고, 결과 순위가 비슷한지 비교한다."
        ]
      },
      {
        "title": "Lab 3 — Chroma에 메타데이터 달고 조건 검색하기",
        "steps": [
          "`pip install chromadb` 로 설치하고 `chromadb.Client()` 로 DB를 만든다.",
          "`create_collection('news')` 컬렉션을 만든다.",
          "문서 4개를 `metadatas=[{'cat':'pet'}, {'cat':'pet'}, {'cat':'econ'}, {'cat':'econ'}]` 와 함께 `add` 한다.",
          "`query(query_texts=['동물'], where={'cat':'pet'}, n_results=2)` 로 pet 카테고리 안에서만 검색한다.",
          "필터를 뺐을 때와 결과가 어떻게 달라지는지 두 경우를 출력해 비교한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 search.py를 발전시켜, 본인 관심 분야 문장 10개 이상을 넣고 질문 3개에 대한 검색 결과를 표로 정리해 제출한다 (질문 / 1위 문서 / 유사도).",
      "pgvector·Chroma·FAISS·Pinecone 중 2개를 골라 '저장 위치(메모리/파일/서버)·설치 난이도·메타데이터 필터 지원' 3가지 기준으로 비교하는 5줄 요약을 작성한다."
    ]
  },
  "capstone-1": {
    "topics": [
      {
        "h": "캡스톤 1일차에 반드시 정할 것",
        "items": [
          "해결할 문제 한 줄(누가·무엇을·왜)",
          "핵심 기능 1개(MVP) — 욕심내지 않기",
          "사용자 시나리오 3개",
          "사용할 기술 스택(LLM·RAG·도구) 목록"
        ]
      },
      {
        "h": "아키텍처 다이어그램에 들어갈 박스",
        "items": [
          "사용자 입력(질문)",
          "에이전트 두뇌(LLM, 다음 행동 결정)",
          "지식 저장소(RAG·Vector DB)",
          "외부 도구/API(검색·계산·조회)",
          "최종 응답(출처 포함)"
        ]
      },
      {
        "h": "협업·일정 관리 기본",
        "items": [
          "역할 분담(프론트·에이전트·데이터·발표)",
          "깃 저장소 생성과 브랜치 규칙",
          ".env 키는 절대 깃에 올리지 않기",
          "3일 타임라인(설계→구현→발표) 합의"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 가상환경 만들고 라이브러리 설치하기",
        "steps": [
          "프로젝트 폴더를 만든다: 'mkdir my-agent' 입력 후 'cd my-agent' 로 들어간다.",
          "가상환경 생성: 'python -m venv venv' 를 입력한다(폴더에 venv 가 생긴다).",
          "가상환경 활성화: 맥/리눅스는 'source venv/bin/activate', 윈도우는 'venv\\Scripts\\activate' 입력. 줄 앞에 (venv) 가 보이면 성공.",
          "라이브러리 설치: 'pip install langgraph langchain langchain-anthropic python-dotenv' 입력.",
          "설치 확인: 'pip list' 를 입력해 목록에 langgraph 가 보이는지 확인한다."
        ]
      },
      {
        "title": "Lab 2. .env 키 등록하고 첫 실행하기",
        "steps": [
          "폴더에 '.env' 라는 이름의 파일을 새로 만든다(점으로 시작하는 것에 주의).",
          "그 안에 'ANTHROPIC_API_KEY=sk-ant-여기에_키' 한 줄을 적고 저장한다.",
          "'.gitignore' 파일을 만들고 그 안에 '.env' 와 'venv/' 두 줄을 적어 비밀 파일이 깃에 안 올라가게 한다.",
          "위 realCode의 app.py 를 폴더에 저장한다.",
          "'python app.py' 를 실행해 인사 문구와 자기소개 답변이 나오는지 확인한다."
        ]
      }
    ],
    "homework": [
      "우리 팀 설계서를 한 장으로 깔끔히 정리해 깃 저장소 README.md 에 올리기(문제정의·시나리오·아키텍처 그림 링크 포함).",
      "내일 구현할 핵심 기능 1개를 정하고, 그 기능에 필요한 도구·데이터가 무엇인지 메모로 적어오기."
    ]
  },
  "capstone-2": {
    "topics": [
      {
        "h": "에이전트 구현 핵심 4단계",
        "items": [
          "상태(State) 정의 — 무엇을 기억할까",
          "도구(Tool) 작성 — 어떤 일을 시킬까",
          "노드 연결 — 생각·도구·검색 칸 잇기",
          "조건 분기 — 언제 도구를 쓸까"
        ]
      },
      {
        "h": "RAG 검색 노드 붙이기 순서",
        "items": [
          "문서를 잘게 자르기(청킹)",
          "임베딩으로 벡터화해 Vector DB에 저장",
          "질문과 비슷한 문서 top-k 검색",
          "찾은 내용을 프롬프트에 넣어 답하기",
          "답변에 출처(문서명) 함께 표시"
        ]
      },
      {
        "h": "흔한 에러와 점검 포인트",
        "items": [
          "API 키 미설정 → .env 확인",
          "도구가 안 불림 → bind_tools 했는지 확인",
          "무한 루프 → tools→agent 엣지·종료 조건 점검",
          "한글 깨짐 → 파일 인코딩 utf-8 확인"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. State와 첫 노드 만들어 실행하기",
        "steps": [
          "agent.py 를 만들고 realCode의 State 클래스 부분까지 붙여넣는다.",
          "agent_node 함수를 추가하고, 도구 없이 'graph.add_edge(START, agent)'와 'graph.add_edge(agent, END)'만 연결해 본다.",
          "app.invoke 로 '안녕'을 넣어 모델이 인사로 답하는지 확인한다.",
          "잘 되면 도구와 조건 분기를 추가해 realCode 완성본으로 발전시킨다."
        ]
      },
      {
        "title": "Lab 2. 도구 호출이 실제로 일어나는지 추적하기",
        "steps": [
          "app.invoke 의 결과에서 result['messages'] 전체를 print 로 출력한다.",
          "메시지 목록 중간에 'tool_calls' 가 들어간 메시지가 있는지 찾는다(도구가 불린 증거).",
          "tool 메시지에 환율 도구의 반환값이 담겼는지 확인한다.",
          "마지막 메시지가 사람이 읽기 좋은 최종 문장인지 확인한다."
        ]
      }
    ],
    "homework": [
      "우리 서비스에 꼭 필요한 도구 1개를 실제 동작하도록 완성하기(가짜 데이터를 진짜 API나 DB 조회로 교체).",
      "오늘 만든 agent.py 를 깃에 커밋·푸시하고, 실행 화면을 캡처해 팀 노션에 기록하기."
    ]
  },
  "capstone-3": {
    "topics": [
      {
        "h": "발표 슬라이드 5장 구성",
        "items": [
          "1장 문제 정의와 왜 필요한지",
          "2장 아키텍처 다이어그램",
          "3장 핵심 기능 라이브 데모",
          "4장 성능·비용·한계",
          "5장 배운 점과 다음 개선 방향"
        ]
      },
      {
        "h": "배포 전 최종 점검 리스트",
        "items": [
          "시나리오 3개 모두 정상 동작",
          "빈 입력·오류 입력 예외 처리 확인",
          ".env 키가 깃에 안 올라갔는지 확인",
          "백업 데모 영상 준비"
        ]
      },
      {
        "h": "KPT 회고 항목",
        "items": [
          "Keep: 잘 되어 계속할 점",
          "Problem: 아쉬웠던 문제점",
          "Try: 다음에 시도할 개선안"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. Streamlit 데모 띄우기",
        "steps": [
          "'pip install streamlit' 으로 라이브러리를 설치한다.",
          "realCode의 app_web.py 를 폴더에 저장한다.",
          "'streamlit run app_web.py' 를 실행하면 브라우저가 자동으로 열린다.",
          "입력창에 시나리오 질문을 넣어 말풍선으로 답이 나오는지 확인한다."
        ]
      },
      {
        "title": "Lab 2. 발표 리허설하기",
        "steps": [
          "발표 순서를 정한다(누가 문제정의, 누가 데모, 누가 마무리).",
          "타이머를 켜고 7분 안에 끝나는지 한 번 실제로 말해 본다.",
          "데모 질문을 미리 2~3번 돌려 확실히 되는 질문만 고른다.",
          "정상 동작 화면을 영상으로 녹화해 백업으로 둔다."
        ]
      }
    ],
    "homework": [
      "최종 발표 슬라이드와 배포 링크(또는 실행 방법)를 팀 깃 저장소 README.md 에 정리해 제출하기.",
      "KPT 회고를 바탕으로 '이 서비스를 한 단계 더 발전시킨다면 무엇을 할지' 개선안 3가지를 적어 제출하기."
    ]
  },
  "miniproject-1": {
    "topics": [
      {
        "h": "기획 단계에서 반드시 정할 것",
        "items": [
          "해결할 문제 한 문장",
          "핵심 사용자와 사용 시나리오",
          "MVP 기능 1~2개 선정",
          "성공 기준(무엇이 되면 완성인가)"
        ]
      },
      {
        "h": "설계 산출물",
        "items": [
          "아키텍처 흐름도(입력→검색→생성→출력)",
          "데이터 플로우(어떤 데이터가 어디로)",
          "API/함수 인터페이스 초안",
          "파일·모듈 구조"
        ]
      },
      {
        "h": "환경 셋업 체크리스트",
        "items": [
          "가상환경(venv) 생성·활성화",
          "필수 라이브러리 설치",
          ".env 키 등록과 .gitignore 처리",
          "smoke_test 통과 확인"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 가상환경부터 첫 LLM 응답까지",
        "steps": [
          "터미널에서 'python -m venv .venv' 입력 후 엔터",
          "'source .venv/bin/activate' (윈도우: .venv\\Scripts\\activate) 로 가상환경 활성화. 프롬프트 앞에 (.venv)가 보이면 성공",
          "'pip install openai python-dotenv' 로 라이브러리 설치",
          ".env 파일을 만들고 'OPENAI_API_KEY=강사가준키' 한 줄 저장",
          "config.py와 smoke_test.py를 위 realCode대로 작성",
          "'python smoke_test.py' 실행 후 '모델 응답:' 줄이 한국어로 출력되는지 확인"
        ]
      },
      {
        "title": "Lab 2. 기획서 한 장 완성하기",
        "steps": [
          "README.md 파일을 새로 만든다",
          "맨 위에 '# 프로젝트 이름'과 '## 해결할 문제(한 문장)'를 적는다",
          "'## 사용자 시나리오'에 누가-입력-기대결과를 3줄로 적는다",
          "'## 아키텍처'에 입력→검색→생성→출력 흐름을 글이나 화살표로 적는다",
          "'## 역할 분담' 표를 만들어 팀원과 담당을 적는다",
          "'git add . && git commit -m \"기획 및 환경 셋업\"' 으로 첫 커밋을 남긴다"
        ]
      }
    ],
    "homework": [
      "내일 구현할 RAG에 쓸 문서(사내 규정·FAQ·매뉴얼 등) 3~5개를 텍스트 파일로 모아 data/ 폴더에 담아 오기",
      "기획서(README.md)를 팀원과 검토해 MVP 기능 1개를 최종 확정하고 한 줄로 요약해 오기"
    ]
  },
  "miniproject-2": {
    "topics": [
      {
        "h": "RAG 파이프라인 구현 순서",
        "items": [
          "문서 로딩(파일 읽기)",
          "청킹(조각내기)",
          "임베딩·색인(벡터화)",
          "질문 검색(top-k)",
          "근거 결합 프롬프트로 생성"
        ]
      },
      {
        "h": "통합 시 자주 막히는 지점",
        "items": [
          "응답 객체에서 텍스트 꺼내는 경로",
          "한글 파일 인코딩(utf-8)",
          "빈 입력·검색 결과 0건 처리",
          "API 요금·호출 횟수 관리"
        ]
      },
      {
        "h": "안정화(예외 처리) 포인트",
        "items": [
          "빈 질문 막기",
          "키 오류시 친절한 메시지",
          "검색 결과 없을 때 안내",
          "try-except로 네트워크 오류 잡기"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 내 문서로 RAG 검색 돌려보기",
        "steps": [
          "data/ 폴더에 policy.txt를 만들고 어제 모은 문서 내용을 붙여 넣는다",
          "rag.py를 위 realCode대로 작성한다",
          "파이썬 인터프리터에서 'from rag import *' 후 'idx = build_index(chunk_text(open(\"data/policy.txt\",encoding=\"utf-8\").read()))' 실행",
          "'search(\"환불 어떻게 해?\", idx)' 를 실행해 관련 조각이 나오는지 확인",
          "엉뚱한 질문도 넣어보고 검색 결과가 달라지는지 비교한다"
        ]
      },
      {
        "title": "Lab 2. 전체 앱 연결하고 시연하기",
        "steps": [
          "app.py를 위 realCode대로 작성한다",
          "'python app.py' 를 실행한다",
          "어제 정한 시나리오 질문을 입력한다",
          "답변과 [근거] 블록이 함께 출력되는지 확인한다",
          "빈 줄을 입력해 안내 메시지가 나오는지(죽지 않는지) 확인한다",
          "'q'를 입력해 정상 종료되는지 확인하고 커밋한다"
        ]
      }
    ],
    "homework": [
      "오늘 만든 RAG 앱에서 잘 못 답하는 질문 3개를 찾아, 원인(청킹 크기·검색 개수 등)을 한 줄씩 메모해 오기",
      "내일 발표용 데모 질문 3개를 정하고, 각 질문의 기대 답변을 미리 적어 오기"
    ]
  },
  "miniproject-3": {
    "topics": [
      {
        "h": "배포 전 점검 리스트",
        "items": [
          "핵심 기능 테스트 통과",
          "requirements.txt 최신화",
          ".env가 깃에 올라가지 않았는지 확인",
          "README에 실행 방법 명시"
        ]
      },
      {
        "h": "Docker 기본 명령",
        "items": [
          "docker build -t 이름 . (이미지 만들기)",
          "docker run --env-file .env -it 이름 (실행)",
          "docker ps (켜진 컨테이너 보기)",
          "docker logs 컨테이너ID (로그 확인)"
        ]
      },
      {
        "h": "발표 구성(5분)",
        "items": [
          "해결한 문제 한 문장",
          "아키텍처와 핵심 기술 설명",
          "실시간 시연(질문→답변)",
          "어려웠던 점과 배운 점·회고"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 테스트로 버그 잡기",
        "steps": [
          "test_app.py를 위 realCode대로 작성한다",
          "'pip install pytest' 후 'pytest -q' 를 실행한다",
          "실패하는 테스트가 있으면 빨간 메시지를 읽고 app.py를 고친다",
          "어제 메모한 '잘 못 답하는 질문'으로 top_k나 chunk size를 조정한다",
          "다시 'pytest -q' 를 돌려 전부 통과(초록)되는지 확인한다"
        ]
      },
      {
        "title": "Lab 2. Docker로 포장해 실행하기",
        "steps": [
          "'pip freeze > requirements.txt' 로 의존성 목록을 만든다",
          "Dockerfile을 위 realCode대로 작성한다",
          "'docker build -t ai-mini .' 로 이미지를 빌드한다(처음엔 다운로드로 시간이 걸린다)",
          "'docker run --env-file .env -it ai-mini' 로 컨테이너를 실행한다",
          "컨테이너 안에서 질문을 입력해 같은 답이 나오는지 확인한다",
          "확인되면 'git add . && git commit -m \"테스트·도커 배포\"' 로 커밋한다"
        ]
      },
      {
        "title": "Lab 3. 발표 리허설과 회고",
        "steps": [
          "데모 질문 3개와 기대 답변을 README에 적는다",
          "문제→해결→시연→배운 점 순서로 5분 발표를 한 번 연습한다",
          "KPT(Keep·Problem·Try)로 회고를 작성해 README 맨 아래 추가한다",
          "최종 커밋과 함께 원격 저장소에 push 한다"
        ]
      }
    ],
    "homework": [
      "프로젝트 README를 최종본으로 다듬어(주제·실행법·아키텍처·회고 포함) 팀 저장소에 push 하기",
      "이번 미니 프로젝트에서 더 발전시키고 싶은 기능 1개를 골라, 어떤 기술(재순위·메모리·웹UI 등)로 확장할지 3줄로 적어 제출하기"
    ]
  }
}

export const detailsFor = (subjectId, day) => details[`${subjectId}-${day}`] || null
