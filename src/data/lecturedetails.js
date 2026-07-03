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
        "h": "입력을 숫자로 바꾸는 단계",
        "items": [
          "토큰화(BPE/WordPiece)와 어휘집(vocabulary)",
          "토큰 ID와 특수 토큰([CLS]/[SEP])",
          "임베딩 벡터와 의미 공간",
          "벡터 유사도(가까운 단어=비슷한 뜻)"
        ]
      },
      {
        "h": "기존 시퀀스 모델의 한계",
        "items": [
          "RNN의 순차 처리와 느린 학습",
          "장기 의존성(앞 내용을 잊어버림) 문제",
          "기울기 소실(gradient vanishing)",
          "병렬화가 어려운 구조적 한계"
        ]
      },
      {
        "h": "Attention의 구성 요소",
        "items": [
          "Query·Key·Value의 역할 구분",
          "내적(dot-product)으로 유사도 측정",
          "스케일링(sqrt(d_k))의 이유",
          "softmax 가중치와 가중합(weighted sum)"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 토크나이저와 임베딩 직접 만져보기",
        "steps": [
          "`pip install transformers torch` 로 라이브러리를 설치한다.",
          "AutoTokenizer로 'bert-base-uncased'를 불러온다.",
          "좋아하는 영어 문장 하나를 토큰화해 input_ids를 출력한다.",
          "convert_ids_to_tokens로 ID가 어떤 토큰인지 확인한다.",
          "AutoModel로 같은 모델을 불러와 문장의 last_hidden_state.shape를 출력하고 (1, 토큰수, 768)인지 확인한다."
        ]
      },
      {
        "title": "Lab 2. softmax로 집중도 바꿔보기",
        "steps": [
          "NumPy로 점수 배열 [2.0, 1.0, 0.1]을 만든다.",
          "softmax를 적용해 가중치를 출력한다.",
          "점수를 [5.0, 1.0, 0.1]로 키워 다시 계산하고, 1등에 더 쏠리는지 비교한다.",
          "모든 점수를 똑같이 [1,1,1]로 두면 가중치가 균등(1/3)해지는지 확인한다."
        ]
      },
      {
        "title": "Lab 3. Attention 가중치 시각화",
        "steps": [
          "메인 실습의 attention 행렬을 가져온다.",
          "plt.imshow(attention)로 히트맵을 그린다.",
          "plt.xticks/plt.yticks로 토큰 이름을 축에 붙인다.",
          "어떤 토큰이 자기 자신을 많이 보는지, 어떤 토큰을 많이 보는지 한 줄로 해석을 적는다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 NumPy Self-Attention 코드에서 토큰을 4개(예: '나는 오늘 학교에 갔다')로 늘려 attention 행렬이 (4,4)가 되는지 확인하고 히트맵을 캡처해 제출한다.",
      "'언어모델은 다음 토큰을 맞히는 모델이다'를 비유 하나를 넣어 5문장으로 설명하는 짧은 글을 작성한다."
    ]
  },
  "transformer-2": {
    "topics": [
      {
        "h": "Transformer 블록의 구성 요소",
        "items": [
          "Multi-Head Attention과 표현 부공간",
          "Positional Encoding(사인·코사인)",
          "Feed-Forward Network(FFN)",
          "잔차연결과 Layer Normalization"
        ]
      },
      {
        "h": "대표 모델과 구조 차이",
        "items": [
          "Encoder-only: BERT(이해·분류)",
          "Decoder-only: GPT(생성)",
          "Encoder-Decoder: T5(번역·요약)",
          "양방향 vs 단방향(왼쪽→오른쪽) 읽기"
        ]
      },
      {
        "h": "사전학습과 활용",
        "items": [
          "사전학습(pre-training)의 목표",
          "파인튜닝과 전이학습",
          "스케일링 법칙(데이터·모델·연산)",
          "추론·임베딩 추출 활용"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. Positional Encoding 그려보기",
        "steps": [
          "realCode의 positional_encoding 함수를 그대로 입력한다.",
          "seq_len=50, d_model=64로 PE를 만든다.",
          "plt.imshow로 히트맵을 그려 줄무늬 패턴을 확인한다.",
          "d_model을 16으로 줄여 다시 그려 무늬가 어떻게 단순해지는지 비교한다."
        ]
      },
      {
        "title": "Lab 2. BERT로 빈칸 채우기",
        "steps": [
          "pipeline('fill-mask', model='bert-base-uncased')를 만든다.",
          "'The capital of Korea is [MASK].' 를 입력해 예측 단어를 본다.",
          "result 상위 5개 후보와 점수를 출력한다.",
          "[MASK] 위치를 바꾼 다른 문장으로도 시험해 본다."
        ]
      },
      {
        "title": "Lab 3. GPT-2로 이어 쓰기 비교",
        "steps": [
          "pipeline('text-generation', model='gpt2')를 만든다.",
          "프롬프트 'Once upon a time'으로 문장을 생성한다.",
          "max_length를 30, 50으로 바꿔 생성 길이 차이를 본다.",
          "같은 프롬프트를 두 번 실행해 결과가 달라지는지(샘플링) 확인한다."
        ]
      }
    ],
    "homework": [
      "GPT-2 실습에서 서로 다른 프롬프트 3개를 넣어 'top-5 다음 토큰'을 각각 표로 정리하고, 프롬프트에 따라 예측이 어떻게 달라지는지 3문장으로 해석해 제출한다.",
      "BERT(Encoder)와 GPT(Decoder)의 차이를 '이해 vs 생성' 관점에서 비유 하나를 넣어 한 문단으로 정리한다."
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
        "h": "Vue 프로젝트 시작",
        "items": [
          "npm create vite 로 프로젝트 생성",
          "npm run dev 로 개발 서버 실행",
          "src/App.vue 진입점 이해",
          "main.js 가 앱을 화면에 붙이는 과정"
        ]
      },
      {
        "h": "반응형 상태",
        "items": [
          "ref 로 단일 값 감싸기",
          "reactive 로 객체 감싸기",
          "자바스크립트에선 .value, 템플릿에선 그대로",
          "상태가 바뀌면 화면 자동 갱신"
        ]
      },
      {
        "h": "템플릿 문법",
        "items": [
          "{{ }} 보간으로 값 출력",
          "v-bind(:)로 속성 연결",
          "v-on(@)으로 이벤트 연결",
          "v-model 로 폼 양방향 바인딩"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 첫 Vue 프로젝트 띄우기",
        "steps": [
          "터미널을 열고 'npm create vite@latest hello -- --template vue' 를 입력한다",
          "'cd hello && npm install && npm run dev' 를 차례로 실행한다",
          "브라우저에서 http://localhost:5173 에 접속해 기본 화면을 확인한다",
          "src/App.vue 의 <template> 안 글자를 바꿔 저장하고 화면이 즉시 바뀌는지 본다"
        ]
      },
      {
        "title": "Lab 2. 반응형 이름 인사 만들기",
        "steps": [
          "App.vue 의 <script setup> 에 'import { ref } from \"vue\"' 를 적는다",
          "const name = ref('') 로 이름 상태를 만든다",
          "<template> 에 <input v-model=\"name\"> 를 두고 그 아래 <p>안녕하세요, {{ name }}님</p> 을 적는다",
          "입력창에 글자를 칠 때마다 인사 문구가 실시간으로 바뀌는지 확인한다"
        ]
      }
    ],
    "homework": [
      "오늘 만든 할 일 목록에 '완료된 항목 모두 삭제' 버튼을 추가하고, 클릭 시 done 이 true 인 항목만 배열에서 제거되도록 구현해 캡처를 제출한다",
      "computed 를 하나 더 만들어 '전체 개수 / 완료 개수' 를 화면에 함께 표시한다"
    ]
  },
  "vue-2": {
    "topics": [
      {
        "h": "부모-자식 통신",
        "items": [
          "defineProps 로 값 받기",
          "defineEmits 로 이벤트 올리기",
          "데이터는 아래로, 사건은 위로",
          "단방향 데이터 흐름의 장점"
        ]
      },
      {
        "h": "slot 과 확장",
        "items": [
          "기본 slot 으로 내용 끼우기",
          "이름 있는 slot(named slot)",
          "컴포넌트 재사용성 높이기"
        ]
      },
      {
        "h": "Composition API",
        "items": [
          "script setup 문법",
          "라이프사이클 훅(onMounted 등)",
          "컴포저블 useXxx 로 로직 분리",
          "여러 컴포넌트에서 재사용"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. props 로 인사 카드 만들기",
        "steps": [
          "components/Greeting.vue 를 만들고 defineProps({ name: String }) 를 선언한다",
          "<template> 에 <p>안녕하세요, {{ name }}님!</p> 를 적는다",
          "App.vue 에서 Greeting 을 import 하고 <Greeting name=\"홍길동\" /> 로 사용한다",
          "이름을 바꿔 여러 개의 Greeting 을 띄워본다"
        ]
      },
      {
        "title": "Lab 2. emit 으로 카운터 올려보내기",
        "steps": [
          "자식 컴포넌트에 버튼을 두고 defineEmits(['inc']) 를 선언한다",
          "버튼 클릭 시 emit('inc') 를 호출한다",
          "부모에서 @inc=\"count++\" 로 받아 숫자를 올린다",
          "버튼을 누를 때마다 부모의 숫자가 증가하는지 확인한다"
        ]
      }
    ],
    "homework": [
      "오늘의 회원 목록에 '회원 추가' 폼을 만들어 새 회원을 users 배열에 추가하고, 추가/삭제가 모두 동작하는 화면을 캡처해 제출한다",
      "useCounter 라는 컴포저블 함수를 만들어 count 와 inc 를 반환하고, 두 개 이상의 컴포넌트에서 재사용해 본다"
    ]
  },
  "vue-3": {
    "topics": [
      {
        "h": "Vue Router",
        "items": [
          "createRouter 로 라우트 정의",
          "router-link·router-view",
          "동적 파라미터 :id",
          "중첩 라우트와 네비게이션 가드"
        ]
      },
      {
        "h": "Pinia 스토어",
        "items": [
          "defineStore 로 스토어 생성",
          "state·getters·actions 3요소",
          "여러 컴포넌트에서 공유",
          "전역 데이터 추적의 용이함"
        ]
      },
      {
        "h": "SPA 흐름",
        "items": [
          "첫 로드 후 화면만 교체",
          "주소와 화면의 매핑",
          "props vs 전역 상태 선택 기준"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 두 페이지 라우팅 만들기",
        "steps": [
          "'npm install vue-router@4' 로 라우터를 설치한다",
          "router/index.js 에 '/'(Home)와 '/about'(About) 라우트를 정의한다",
          "main.js 에서 app.use(router) 를 등록한다",
          "App.vue 상단에 router-link 두 개와 router-view 를 두고 이동을 확인한다"
        ]
      },
      {
        "title": "Lab 2. Pinia 카운터 스토어",
        "steps": [
          "'npm install pinia' 후 main.js 에서 app.use(createPinia()) 를 등록한다",
          "stores/counter.js 에 defineStore 로 count 상태와 inc 액션을 만든다",
          "두 개의 서로 다른 컴포넌트에서 같은 스토어를 import 한다",
          "한쪽에서 inc 를 호출했을 때 다른 쪽 숫자도 함께 늘어나는지 확인한다"
        ]
      }
    ],
    "homework": [
      "상품 목록·상세·장바구니에 '담은 상품 비우기' 액션을 추가하고, 헤더 개수가 0으로 돌아가는 동작을 캡처해 제출한다",
      "네비게이션 가드(beforeEach)를 추가해 '/admin' 으로 갈 때 로그인 안 했으면 '/' 로 돌려보내도록 구현한다"
    ]
  },
  "vue-4": {
    "topics": [
      {
        "h": "API 통신",
        "items": [
          "fetch vs axios",
          "async/await 문법",
          "GET·POST 요청",
          "응답 데이터 화면에 반영"
        ]
      },
      {
        "h": "상태·검증",
        "items": [
          "loading·error·success 3상태",
          "try/catch/finally",
          "폼 유효성 검사",
          "사용자 피드백 표시"
        ]
      },
      {
        "h": "빌드·배포",
        "items": [
          ".env 환경변수와 VITE_ 접두사",
          "npm run build 로 dist 생성",
          "npm run preview 확인",
          "정적 호스팅 배포"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 공개 API 목록 불러오기",
        "steps": [
          "'npm install axios' 로 axios 를 설치한다",
          "onMounted 안에서 axios.get('https://jsonplaceholder.typicode.com/posts') 를 호출한다",
          "응답 res.data 를 ref 배열에 담는다",
          "v-for 로 제목 목록을 화면에 출력한다"
        ]
      },
      {
        "title": "Lab 2. 빌드하고 미리보기",
        "steps": [
          "터미널에서 'npm run build' 를 실행한다",
          "생성된 dist 폴더 안 파일들을 확인한다",
          "'npm run preview' 로 빌드 결과를 로컬에서 열어본다",
          "개발 모드와 빌드 결과가 동일하게 보이는지 확인한다"
        ]
      }
    ],
    "homework": [
      "미니 SPA에 '글 상세' 라우트를 추가해 목록의 제목을 클릭하면 해당 글 본문을 API로 불러와 보여주도록 완성하고 배포 주소를 제출한다",
      "로딩 중에는 스피너(회전 아이콘)나 '잠시만 기다려 주세요' 화면을 추가해 사용자 경험을 개선한다"
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
        "h": "Spring AI 시작에 필요한 준비물",
        "items": [
          "JDK 17 이상 설치 확인",
          "Spring Boot 3.x 프로젝트 생성(start.spring.io)",
          "Spring Web + 모델 프로바이더(Anthropic/OpenAI) 의존성",
          "API 키를 환경변수로 등록"
        ]
      },
      {
        "h": "ChatClient 사용 4단계",
        "items": [
          "prompt() — 주문서 펼치기",
          "user()/system() — 메시지 채우기",
          "call() — 요청 전송",
          "content() — 답변 본문 추출"
        ]
      },
      {
        "h": "프로바이더 교체 시 바꾸는 것",
        "items": [
          "build.gradle 의존성",
          "application.yml 설정 키",
          "API 키 환경변수",
          "자바 코드는 대부분 그대로"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 첫 채팅 API 띄우기",
        "steps": [
          "start.spring.io에서 Spring Web + Anthropic을 추가해 프로젝트를 생성한다.",
          "application.yml에 api-key와 model을 적는다.",
          "ChatController를 만들어 GET /api/chat을 구현한다.",
          "./gradlew bootRun으로 서버를 띄운다.",
          "브라우저에서 ?message= 로 질문하고 답이 오는지 확인한다."
        ]
      },
      {
        "title": "Lab2. 말투 바꿔 보기(System 메시지)",
        "steps": [
          "프롬프트에 .system(\"너는 해적처럼 말한다\")를 추가한다.",
          "같은 질문을 다시 호출한다.",
          "답변 말투가 바뀌는지 비교한다.",
          "temperature 값을 0.1과 0.9로 바꿔 결과 다양성을 비교한다."
        ]
      }
    ],
    "homework": [
      "/api/chat 에 system 파라미터를 추가로 받아, 호출할 때마다 AI의 역할(예: 통역사·요약가)을 바꿀 수 있게 개선하라.",
      "OpenAI 의존성·설정으로 프로바이더를 교체해 동일 API가 그대로 동작하는지 확인하고, 바꾼 부분을 3줄로 정리하라."
    ]
  },
  "spring-ai-2": {
    "topics": [
      {
        "h": "RAG 준비 단계 구성요소",
        "items": [
          "DocumentReader(파일 읽기)",
          "TextSplitter(조각 내기)",
          "EmbeddingModel(벡터화)",
          "VectorStore.add(저장)"
        ]
      },
      {
        "h": "RAG 질문 단계 구성요소",
        "items": [
          "질문 임베딩",
          "similaritySearch(top-k)",
          "근거 결합 프롬프트",
          "LLM 생성 + 출처 제시"
        ]
      },
      {
        "h": "검색 품질에 영향을 주는 손잡이",
        "items": [
          "청크 크기·겹침",
          "top-k 개수",
          "임베딩 모델 종류",
          "메타데이터 필터"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 문서 한 개 적재하기",
        "steps": [
          "resources/docs에 회사소개.txt를 넣는다.",
          "TextReader로 읽고 TokenTextSplitter로 자른다.",
          "vectorStore.add(chunks)로 저장한다.",
          "콘솔에 찍힌 조각 개수를 확인한다."
        ]
      },
      {
        "title": "Lab2. 유사 검색 결과 들여다보기",
        "steps": [
          "similaritySearch에 질문을 넣어 top-k 결과를 받는다.",
          "각 결과의 getText()를 출력한다.",
          "topK 값을 2와 6으로 바꿔 검색 결과 차이를 비교한다.",
          "질문 단어를 동의어로 바꿔도 같은 문단이 잡히는지 확인한다."
        ]
      }
    ],
    "homework": [
      "QnA 응답에 '참고한 문단의 출처(파일명·일부 텍스트)'를 함께 반환하도록 ask()를 개선하라.",
      "청크 크기(TokenTextSplitter 설정)를 작게/크게 두 가지로 바꿔 같은 질문의 답 품질을 비교하고 3줄로 정리하라."
    ]
  },
  "spring-ai-3": {
    "topics": [
      {
        "h": "Function Calling 동작 순서",
        "items": [
          "LLM이 도구 필요 판단",
          "함수명·인자 요청 생성",
          "Spring AI가 자바 메서드 실행",
          "결과를 LLM에 되돌려 최종 답 생성"
        ]
      },
      {
        "h": "출력 받는 세 가지 방식",
        "items": [
          ".content() — 문자열",
          ".entity(클래스) — 자바 객체",
          ".stream().content() — 실시간 조각"
        ]
      },
      {
        "h": "서비스 통합 체크리스트",
        "items": [
          "타임아웃·재시도",
          "예외→친화 메시지",
          "API 키·비밀 분리",
          "토큰 비용·프롬프트 길이 관리"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. 첫 도구 붙이기",
        "steps": [
          "getWeather(String city)에 @Tool과 description을 붙인다.",
          "컨트롤러에서 .tools(this)로 도구를 등록한다.",
          "'부산 날씨 알려줘'로 호출해 함수가 불리는지 확인한다.",
          "'안녕'으로 호출해 도구가 안 불리는 경우도 확인한다."
        ]
      },
      {
        "title": "Lab2. 객체로 답받기(구조화 출력)",
        "steps": [
          "WeatherReport record를 만든다.",
          ".entity(WeatherReport.class)로 답을 받는다.",
          "report.temperature() 값을 콘솔에 출력한다.",
          "JSON 응답으로 도시·기온·하늘 상태가 분리돼 오는지 확인한다."
        ]
      },
      {
        "title": "Lab3. 스트리밍 체험",
        "steps": [
          "/api/stream 엔드포인트를 추가한다.",
          ".stream().content()로 Flux를 반환한다.",
          "브라우저로 호출해 글자가 실시간으로 나오는지 본다."
        ]
      }
    ],
    "homework": [
      "getWeather 외에 '현재 시간 조회' 도구를 하나 더 추가하고, '지금 몇 시이고 서울 날씨는?' 질문에 두 도구가 함께 호출되는지 확인하라.",
      "외부 호출 실패를 흉내 내(예: 일부러 예외 throw) try-catch·재시도가 동작하는지 점검하고, 사용자에게 보이는 메시지를 캡처해 제출하라."
    ]
  },
  "sllm-1": {
    "topics": [
      {
        "h": "대표 오픈소스 sLLM 한눈에",
        "items": [
          "Meta Llama 3.x (1B·3B·8B): 폭넓게 쓰이는 표준격",
          "Alibaba Qwen2.5 (0.5B~7B): 다국어·한국어에 강함",
          "Google Gemma 2 (2B·9B): 가볍고 안정적",
          "Microsoft Phi-3 (mini): 작아도 추론력 좋음",
          "모델 카드에서 라이선스·언어·용도 꼭 확인하기"
        ]
      },
      {
        "h": "로컬 서빙 도구 비교",
        "items": [
          "Ollama: 설치 한 번이면 끝, 가장 쉬움(입문 추천)",
          "vLLM: 빠른 동시 처리, 서버용 고성능 서빙",
          "Hugging Face Transformers: 코드로 세밀하게 제어",
          "GGUF·llama.cpp: CPU만으로도 돌리는 양자화 포맷",
          "용도: 빠른 체험=Ollama, 운영=vLLM"
        ]
      },
      {
        "h": "양자화 방식 맛보기",
        "items": [
          "FP16/BF16: 절반 정밀도, 품질 거의 그대로",
          "INT8: 8비트, 용량 절반·속도 향상",
          "INT4(Q4): 4비트, 용량 1/4·노트북용 대세",
          "GPTQ·AWQ·GGUF: 대표 양자화 포맷 이름",
          "트레이드오프: 비트 낮을수록 가볍지만 품질 손실"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 — Ollama로 첫 모델 띄우기",
        "steps": [
          "ollama.com에서 Ollama를 설치한다.",
          "터미널에 'ollama pull gemma2:2b' 를 입력해 모델을 받는다.",
          "'ollama list' 로 받은 모델 목록을 확인한다.",
          "'ollama run gemma2:2b' 후 '한국의 수도는?' 이라고 물어본다.",
          "/bye 를 입력해 대화를 종료한다."
        ]
      },
      {
        "title": "Lab 2 — Transformers로 모델 정보 들여다보기",
        "steps": [
          "'pip install transformers torch' 로 라이브러리를 설치한다.",
          "파이썬에서 AutoModelForCausalLM 으로 'Qwen/Qwen2.5-0.5B' 를 불러온다.",
          "model.num_parameters() 를 출력해 파라미터 개수를 확인한다.",
          "숫자가 약 5억(0.5B)인지 눈으로 확인한다.",
          "메모리가 부족하면 더 작은 모델로 바꿔 다시 시도한다."
        ]
      }
    ],
    "homework": [
      "Ollama로 서로 다른 모델 2개(예: qwen2.5:0.5b, gemma2:2b)에 같은 질문 5개를 던지고, 답변 품질·속도를 표로 비교 정리하기.",
      "내 노트북 사양(RAM·GPU 유무)을 적고, 양자화 용량 공식으로 돌릴 수 있는 최대 모델 크기를 추정해 한 문단으로 설명하기."
    ]
  },
  "sllm-2": {
    "topics": [
      {
        "h": "좋은 학습 데이터의 조건",
        "items": [
          "지시-출력이 명확하고 일관된 형식일 것",
          "다양한 표현·상황을 골고루 담을 것",
          "정답(출력)의 품질이 높아야 모델이 잘 배움",
          "양보다 질: 잘 만든 50개가 엉성한 500개보다 나음",
          "민감정보·저작권 데이터는 제외하기"
        ]
      },
      {
        "h": "핵심 하이퍼파라미터",
        "items": [
          "learning_rate: 학습 속도, LoRA는 1e-4~3e-4 흔함",
          "epoch: 반복 횟수, 너무 크면 과적합",
          "r(rank): LoRA 보조 행렬 크기(8·16·32)",
          "batch_size: 한 번에 보는 데이터 수(메모리에 맞춰)",
          "target_modules: 어떤 층에 LoRA를 붙일지"
        ]
      },
      {
        "h": "평가와 검증 방법",
        "items": [
          "loss 곡선이 안정적으로 내려가는지 보기",
          "학습 전·후 같은 질문으로 답변 비교",
          "학습에 안 쓴 테스트 질문으로 일반화 확인",
          "과적합 징후: 학습셋만 잘하고 새 질문은 못함",
          "사람이 직접 읽어보는 정성 평가 병행"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 — 내 학습셋 5장 만들기",
        "steps": [
          "우리 팀·도메인에서 자주 묻는 질문 5개를 고른다.",
          "각 질문의 모범답안을 직접 작성한다.",
          "examples의 JSONL 코드로 'text' 형식 카드 5장을 만든다.",
          "data.jsonl 파일을 열어 5줄이 잘 들어갔는지 확인한다.",
          "오타·형식 불일치가 없는지 한 줄씩 점검한다."
        ]
      },
      {
        "title": "Lab 2 — 학습 전후 답변 비교",
        "steps": [
          "학습 전 베이스 모델에 테스트 질문 3개를 던져 답을 메모한다.",
          "train_lora.py 로 3에폭 학습을 돌린다.",
          "학습 후 어댑터를 끼운 모델에 같은 질문 3개를 던진다.",
          "전·후 답변을 나란히 표로 정리한다.",
          "어떤 점이 의도대로 바뀌었는지 한 줄 코멘트를 단다."
        ]
      },
      {
        "title": "Lab 3 — 어댑터 저장·재사용",
        "steps": [
          "model.save_pretrained('my-lora') 로 어댑터를 저장한다.",
          "my-lora 폴더 용량이 수십 MB인지 확인한다.",
          "런타임을 새로 시작한다(메모리 비우기).",
          "PeftModel로 베이스+my-lora를 다시 불러온다.",
          "질문을 던져 학습 결과가 그대로 재현되는지 확인한다."
        ]
      }
    ],
    "homework": [
      "내 도메인 학습셋을 20장으로 늘려 다시 파인튜닝하고, 데이터를 5장·20장으로 늘렸을 때 답변 품질이 어떻게 달라졌는지 비교 보고서를 한 페이지로 작성하기.",
      "learning_rate 또는 epoch 중 하나를 두 가지 값으로 바꿔 학습해 loss 곡선과 답변 품질 차이를 캡처와 함께 정리하기."
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
        "h": "고급 리트리버 5종",
        "items": [
          "ParentDocumentRetriever: 작은 조각으로 검색, 넓은 원문 반환",
          "MultiQueryRetriever: 질문을 여러 표현으로 바꿔 검색",
          "EnsembleRetriever: 키워드·벡터 결과를 가중 합산",
          "LongContextReorder: 중요 문서를 앞뒤로 재배치",
          "SemanticChunker: 의미가 바뀌는 지점에서 청킹"
        ]
      },
      {
        "h": "검색 품질을 높이는 기법",
        "items": [
          "하이브리드 검색(BM25 + 벡터)",
          "재순위(Re-ranking): Cross-Encoder · Cohere Rerank",
          "top-k·score_threshold 튜닝, mmr로 다양성 확보",
          "질문 재작성(query rewriting)"
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
        "h": "RAG 확장 4단계",
        "items": [
          "Naive: 검색 → 붙여넣기 → 생성(가장 단순)",
          "Advanced: 재순위·질문 재작성으로 검색 개선",
          "Modular: 검색·라우팅·생성을 부품으로 조립",
          "Agentic: 결과가 부족하면 스스로 재검색·재작성"
        ]
      },
      {
        "h": "Agentic RAG를 LangGraph로",
        "items": [
          "State(Messages)에 질문·검색결과·판단을 담기",
          "노드: 검색 → 충분한지 판단 → (부족) 질문 재작성·재검색",
          "조건 분기: 근거가 충분하면 생성, 아니면 검색 루프",
          "종료 조건과 무한 루프 방지(최대 반복 수)"
        ]
      },
      {
        "h": "평가(RAGAS)와 운영",
        "items": [
          "충실도·답변 관련성·문맥 정밀도로 채점",
          "청킹·임베딩·k·재순위를 한 번에 하나씩 튜닝",
          "캐싱으로 반복 질문 비용·지연 절감",
          "토큰 비용과 응답 지연의 trade-off 관리"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1 — LangGraph로 Agentic RAG 뼈대 만들기",
        "steps": [
          "실전 코드의 Agentic RAG 그래프를 파일로 저장한다.",
          "'검색 → 판단(충분?) → 생성' 3노드와 '부족하면 재검색' 분기를 확인한다.",
          "문서에 답이 있는 질문을 넣어 한 번 검색으로 답하는지 확인한다.",
          "일부러 애매한 질문을 넣어, 재검색 루프가 도는지(그리고 최대 횟수에서 멈추는지) 관찰한다."
        ]
      },
      {
        "title": "Lab 2 — RAGAS로 채점하고 한 손잡이만 바꿔 비교",
        "steps": [
          "내 문서에서 답이 분명한 질문 3개와 정답을 적는다.",
          "평가 스크립트의 questions·ground_truths 를 내 것으로 바꿔 faithfulness·answer_relevancy 를 측정한다(기준선).",
          "k 값만 4→6으로 바꿔 다시 측정하고 기준선과 비교한다.",
          "결과를 '한 줄 실험 노트'로 남긴다(예: k 6으로 충실도 +0.05, 응답은 느려짐)."
        ]
      }
    ],
    "homework": [
      "Agentic RAG(재검색 루프 포함)를 완성해, 한 번에 답하는 질문과 재검색이 필요한 질문 각각의 실행 로그를 캡처해 제출한다.",
      "질문 5개짜리 평가셋으로 RAGAS 점수를 재고, 파라미터 하나(k·청킹·재순위)를 바꿔 튜닝 전후 점수를 표로 정리해 제출한다."
    ]
  },
  "langchain-1": {
    "topics": [
      {
        "h": "LangChain 생태계 한눈에 보기",
        "items": [
          "langchain-core(부품 인터페이스)와 langchain(체인 모음)의 역할 구분",
          "langchain-anthropic·langchain-openai 같은 모델별 연동 패키지",
          "프롬프트·모델·파서·리트리버·메모리 등 핵심 부품 카테고리",
          "LangSmith(관측), LangServe(배포) 등 주변 도구의 존재 알기"
        ]
      },
      {
        "h": "LCEL이 주는 이점",
        "items": [
          "파이프(|)로 가독성 좋게 흐름을 표현",
          "invoke/batch/stream을 같은 체인으로 그대로 지원",
          "부품 교체(모델·파서 바꾸기)가 쉬움",
          "비동기·병렬 실행을 자동으로 지원"
        ]
      },
      {
        "h": "출력 파서의 종류",
        "items": [
          "StrOutputParser: 글자만 깔끔히 추출",
          "JsonOutputParser: JSON을 딕셔너리로 변환",
          "PydanticOutputParser: 정해진 데이터 모양으로 강제",
          "파서가 형식 지시문을 프롬프트에 자동으로 끼워 주는 원리"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 개발환경부터 첫 호출까지",
        "steps": [
          "VS Code나 터미널을 연다.",
          "'python -m venv venv'로 가상환경을 만들고 활성화한다.",
          "'pip install langchain langchain-anthropic'를 실행한다.",
          "API 키를 환경변수 ANTHROPIC_API_KEY에 등록한다.",
          "hello.py를 만들어 model.invoke('안녕')의 결과를 출력한다.",
          "'python hello.py'로 실행해 답이 나오면 환경 준비 완료다."
        ]
      },
      {
        "title": "Lab 2. 파이프(|)로 첫 체인 조립",
        "steps": [
          "ChatPromptTemplate.from_template로 '{text}를 한 줄 요약' 프롬프트를 만든다.",
          "ChatAnthropic 모델과 StrOutputParser를 각각 변수로 만든다.",
          "'prompt | model | parser'로 chain을 만든다.",
          "chain.invoke({'text': '아무 문장'})을 실행한다.",
          "결과가 한 줄 요약으로 나오는지 확인한다.",
          "parser만 JsonOutputParser로 바꿔 결과 형태가 어떻게 달라지는지 비교한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 요약 체인을 복사해, 프롬프트만 바꿔 '이메일 정중하게 다듬기' 체인으로 변형하고 입력 3개로 결과를 캡처해 제출한다.",
      "StrOutputParser와 JsonOutputParser를 각각 쓴 체인 두 개를 만들어, 같은 입력에서 결과 타입(문자열 vs 딕셔너리)이 어떻게 다른지 한 단락으로 정리해 제출한다."
    ]
  },
  "langchain-2": {
    "topics": [
      {
        "h": "메모리의 종류와 선택",
        "items": [
          "전체 대화를 그대로 쌓는 버퍼 메모리",
          "오래된 대화는 요약해 압축하는 요약 메모리",
          "토큰 한도를 넘지 않게 최근 N개만 유지하는 윈도우 방식",
          "세션 id로 사용자별 대화를 분리해 보관하는 패턴"
        ]
      },
      {
        "h": "도구(Tool) 활용 패턴",
        "items": [
          "@tool 데코레이터로 함수→도구 만들기",
          "독스트링(설명)이 모델의 도구 선택 근거가 됨",
          "bind_tools로 모델에 도구 묶기",
          "계산·검색·DB조회·API호출 등 도구의 대표 용도"
        ]
      },
      {
        "h": "RAG 문서 QA 파이프라인",
        "items": [
          "로더로 문서 읽기 → 스플리터로 청킹",
          "임베딩 모델로 벡터화 → 벡터스토어에 색인",
          "리트리버로 top-k 검색 → 프롬프트에 근거 주입",
          "'근거에 없으면 모른다'로 환각 줄이기"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 기억하는 챗봇 만들기",
        "steps": [
          "RunnableWithMessageHistory와 ChatMessageHistory를 임포트한다.",
          "session_id로 기록을 돌려주는 get_history 함수를 만든다.",
          "모델에 이 기능을 입혀 chat 객체를 만든다.",
          "같은 session_id로 '내 취미는 등산이야'를 보낸다.",
          "이어서 '내 취미가 뭐였지?'를 물어 기억하는지 확인한다.",
          "session_id를 다른 값으로 바꾸면 기억이 사라지는지 비교한다."
        ]
      },
      {
        "title": "Lab 2. 내 문서로 QA 체인 만들기",
        "steps": [
          "docs.txt에 회사 규정 같은 글 10줄 이상을 적는다.",
          "TextLoader로 읽고 RecursiveCharacterTextSplitter로 자른다.",
          "임베딩 모델로 Chroma 벡터스토어에 색인한다.",
          "as_retriever로 리트리버를 만든다.",
          "근거만 보고 답하라는 프롬프트로 체인을 조립한다.",
          "문서 안 질문과 문서 밖 질문을 각각 던져 답을 비교한다."
        ]
      }
    ],
    "homework": [
      "Lab 2의 QA 챗봇에 메모리(Lab 1)를 결합해, '아까 물어본 거 다시 설명해줘' 같은 후속 질문에도 답하는 버전을 만들고 대화 로그를 제출한다.",
      "@tool로 '오늘 날짜를 돌려주는 도구'를 직접 만들어 모델에 연결하고, 모델이 그 도구를 호출하는 tool_calls 출력을 캡처해 제출한다."
    ]
  },
  "langchain-3": {
    "topics": [
      {
        "h": "스트리밍과 콜백",
        "items": [
          "invoke vs stream의 차이(완성형 vs 조각형)",
          "콜백으로 토큰 단위·단계별 이벤트 받기",
          "웹에서 StreamingResponse로 사용자에게 흘려보내기",
          "스트리밍이 어울리는 화면(채팅 UI) 설계"
        ]
      },
      {
        "h": "관측·디버깅(LangSmith)",
        "items": [
          "환경변수로 LangSmith 추적 켜기",
          "체인 실행 트레이스(입력·출력·시간) 보기",
          "어느 단계가 느리고 비싼지 병목 찾기",
          "프롬프트 버전 비교·평가"
        ]
      },
      {
        "h": "실서비스 안정화",
        "items": [
          "캐싱으로 비용·지연 절감",
          "with_retry로 일시 오류 자동 재시도",
          "try/except와 폴백 메시지로 장애 격리",
          "FastAPI로 API화하고 환경변수로 키 관리"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 스트리밍 체험하기",
        "steps": [
          "프롬프트|모델|파서로 시 쓰기 체인을 만든다.",
          "먼저 chain.invoke로 한 번에 결과를 받아 본다.",
          "이번엔 chain.stream으로 바꿔 for문으로 조각을 받는다.",
          "print(chunk, end='')로 이어서 출력한다.",
          "글자가 흘러나오는 느낌의 차이를 invoke와 비교한다.",
          "topic을 바꿔 다시 스트리밍해 본다."
        ]
      },
      {
        "title": "Lab 2. FastAPI로 챗봇 배포하기",
        "steps": [
          "app.py에 FastAPI 앱과 체인을 만든다.",
          "@app.post('/chat')로 질문을 받아 답을 돌려주는 함수를 만든다.",
          "try/except로 오류를 감싸 친절한 메시지를 준비한다.",
          "set_llm_cache(InMemoryCache())로 캐시를 켠다.",
          "'uvicorn app:app --reload'로 서버를 띄운다.",
          "/docs에서 질문을 넣어 답을 받고, 같은 질문 두 번으로 캐시 효과를 확인한다."
        ]
      }
    ],
    "homework": [
      "3일간 배운 메모리·문서QA·스트리밍·캐싱·예외처리를 합쳐, /chat과 /stream을 모두 가진 '내 문서 기반 챗봇 API' 한 개를 완성해 코드와 /docs 실행 화면을 제출한다.",
      "LangSmith 추적을 켠 뒤 체인을 3회 실행하고, 각 실행의 소요 시간·토큰 사용량을 표로 정리해 어디가 가장 비싼 단계였는지 한 단락으로 분석해 제출한다."
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
        "h": "MCP를 왜 쓰나 — 통합의 뼈대",
        "items": [
          "도구·자료·프롬프트를 표준 규격으로 노출 → 어떤 클라이언트든 동일하게 연결",
          "'USB-C처럼' 한 번 만들면 여러 서비스가 재사용",
          "Backend·VectorDB·Agent·Frontend의 경계를 명확히 분리",
          "팀별로 MCP 서버를 나눠 병렬 개발 가능"
        ]
      },
      {
        "h": "MCP 설계: Tool·Resource·Prompt 분리",
        "items": [
          "Tool = 실행 기능(검색·계산·DB 조회 등 부작용 있는 동작)",
          "Resource = 읽기 전용 자료(문서·레코드·설정)",
          "Prompt = 재사용 지시 템플릿(정형화된 요청)",
          "판단 기준: 권한·부작용 있으면 Tool, 단순 조회면 Resource"
        ]
      },
      {
        "h": "통합 백엔드(FastAPI) 구성",
        "items": [
          "FastAPI에 RAG 검색 + Agent 실행 + MCP Client 연결",
          "Thread(세션) 관리로 사용자별 대화 분리",
          "/chat 엔드포인트 하나로 요청 받기",
          "MCP Inspector로 서버 점검 후 통합"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. MCP Server 만들고 Inspector로 점검",
        "steps": [
          "설치: 'pip install \"mcp[cli]\"' 를 입력한다.",
          "server.py 를 만들고 realCode의 MCP Server 예제를 붙여넣는다(@mcp.tool() 로 도구 1개 정의).",
          "'mcp dev server.py' 를 실행하면 MCP Inspector 웹 화면이 열린다.",
          "Inspector에서 Tools 목록에 내 도구가 보이는지 확인하고, 직접 호출해 결과가 나오는지 테스트한다."
        ]
      },
      {
        "title": "Lab 2. FastAPI에 MCP Client·RAG 붙이기",
        "steps": [
          "'pip install fastapi uvicorn' 로 설치한다.",
          "main.py 에 realCode의 /chat 엔드포인트를 붙여넣는다(MCP Client로 server.py 도구 목록 로드).",
          "'uvicorn main:app --reload' 를 실행한다.",
          "브라우저에서 'http://localhost:8000/docs' 를 열어 /chat 에 질문을 넣고 응답을 확인한다."
        ]
      }
    ],
    "homework": [
      "우리 서비스에 필요한 기능을 Tool·Resource·Prompt로 분류한 표를 만들어 README.md 에 올리기.",
      "MCP Server에 도구 2개를 정의하고 MCP Inspector로 동작을 확인한 화면을 캡처해 제출하기."
    ]
  },
  "capstone-2": {
    "topics": [
      {
        "h": "스트리밍의 3가지 차원",
        "items": [
          "모델: LLM이 토큰을 하나씩 생성하며 흘려보냄(stream=True)",
          "서버: FastAPI가 그 토큰을 SSE로 클라이언트에 전달",
          "클라이언트: 프론트가 받은 조각을 화면에 이어붙임",
          "효과: 첫 글자까지의 체감 대기(TTFT) 감소 → 이탈 줄어듦"
        ]
      },
      {
        "h": "Backend SSE 엔드포인트",
        "items": [
          "FastAPI StreamingResponse로 media_type='text/event-stream' 반환",
          "LLM 스트림을 'async for' 로 받아 청크마다 yield",
          "각 청크를 'data: {...}\\n\\n' 형식으로 전송",
          "연결 종료·중간 에러 처리(끊김 감지)"
        ]
      },
      {
        "h": "Frontend·Multi-Agent·Observability",
        "items": [
          "Vercel AI SDK useChat 로 스트리밍 수신·렌더",
          "Multi-Agent면 에이전트별 이벤트 태그로 구분해 표시",
          "LangSmith로 각 단계(검색·생성·도구) 추적",
          "Eval로 응답의 정확도·근거 품질 점검"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. FastAPI SSE 스트리밍 엔드포인트",
        "steps": [
          "realCode의 SSE 스트리밍 예제를 main.py 에 붙여넣는다(StreamingResponse 사용).",
          "LLM 호출을 stream=True 로 바꾸고, 제너레이터로 청크를 yield 한다.",
          "'uvicorn main:app --reload' 실행 후 터미널에서 'curl -N http://localhost:8000/stream?q=안녕' 을 입력한다.",
          "-N 옵션 덕분에 답이 한꺼번에가 아니라 조금씩 흘러나오는지 확인한다."
        ]
      },
      {
        "title": "Lab 2. LangSmith로 실행 추적 붙이기",
        "steps": [
          ".env 에 'LANGCHAIN_TRACING_V2=true' 와 'LANGCHAIN_API_KEY=...' 를 추가한다.",
          "기존 체인/에이전트를 그대로 한 번 실행한다.",
          "smith.langchain.com 대시보드에서 방금 실행의 trace(단계별 흐름)를 연다.",
          "가장 오래 걸린 단계와 토큰을 가장 많이 쓴 단계를 찾아 메모한다."
        ]
      }
    ],
    "homework": [
      "우리 서비스의 응답을 스트리밍으로 바꾸고, 프론트에서 실시간으로 표시되는 화면을 영상으로 캡처해 제출하기.",
      "LangSmith trace에서 가장 느린 단계·토큰이 많은 단계를 찾아 개선 아이디어 2가지를 적어 제출하기."
    ]
  },
  "capstone-3": {
    "topics": [
      {
        "h": "안정성: 오류·재시도·타임아웃",
        "items": [
          "try/except로 실패를 감싸 서비스가 멈추지 않게",
          "지수 백오프 재시도(1→2→4초)로 일시적 오류 흡수",
          "타임아웃을 걸어 무한 대기 방지",
          "실패 시 사용자에게 친절한 대체 응답 제공"
        ]
      },
      {
        "h": "비용·지연·세션",
        "items": [
          "작은 모델·캐싱으로 Cost 절감",
          "불필요한 재검색 줄여 Latency 개선",
          "Stateless로 만들어 세션을 외부(DB·Redis)에 저장",
          "→ 어느 서버든 처리 가능 → 수평 확장 쉬움"
        ]
      },
      {
        "h": "에이전트 확장: 라우팅·검증·동적계획",
        "items": [
          "Query Routing으로 질문 종류별 경로 분기",
          "Validator Agent로 출력의 형식·근거 검증",
          "Conditional Routing으로 조건에 따라 흐름 전환",
          "Dynamic Planning으로 중간 결과 보고 계획 재수립"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 1. 재시도·타임아웃 붙이기",
        "steps": [
          "'pip install tenacity' 로 설치한다.",
          "LLM/도구 호출 함수 위에 '@retry(wait=wait_exponential(...), stop=stop_after_attempt(3))' 를 붙인다.",
          "호출을 'asyncio.wait_for(coro, timeout=20)' 로 감싸 20초 넘으면 끊기게 한다.",
          "일부러 잘못된 키·주소로 실패시켜, 재시도 로그가 찍히고 최종적으로 대체 응답이 나오는지 확인한다."
        ]
      },
      {
        "title": "Lab 2. Validator Agent 추가하기",
        "steps": [
          "출력 검증용 프롬프트를 작성한다(예: '답변에 근거 출처가 있는가? JSON 형식이 맞는가?').",
          "메인 에이전트 뒤에 검증 노드를 두고, 실패면 재생성하도록 분기(Conditional Edge)한다.",
          "일부러 근거 없는 답을 만들어 넣어 검증에서 걸러지는지 테스트한다.",
          "통과/실패 로그를 남겨 검증이 실제로 동작함을 확인한다."
        ]
      }
    ],
    "homework": [
      "우리 서비스에 오류 처리·재시도·타임아웃을 적용하고, 일부러 오류를 냈을 때도 멈추지 않음을 시연 영상으로 제출하기.",
      "최종 발표(5장): 문제정의 · 아키텍처(MCP 포함) · 라이브 데모 · 운영(비용/지연/관측) · 개선방향 을 정리해 제출하기."
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
