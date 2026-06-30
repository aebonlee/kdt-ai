// 날짜별 8시간(09:00~17:50) 강의안 — subjectId-day 키.
//   plan = { schedule: [{time, topic, detail|lunch}], practice: {title, steps[], deliverable} }
//   schedule 은 교시표(periods)와 동기화되어 자동 생성됨.

export const plans = {
  "git-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "OT · 과정 소개 · 아이스브레이킹"
      },
      {
        "time": "10:00–10:50",
        "topic": "팀빌딩: 팀 구성 · 역할 정하기"
      },
      {
        "time": "11:00–11:50",
        "topic": "팀 그라운드룰 · 협업 목표 설정"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "버전관리 개념 · Git 설치/설정"
      },
      {
        "time": "14:00–14:50",
        "topic": "Git 기본: add·commit·status·log"
      },
      {
        "time": "15:00–15:50",
        "topic": ".gitignore · diff · 커밋 되돌리기"
      },
      {
        "time": "16:00–16:50",
        "topic": "브랜치 · 머지 · 충돌 해결"
      },
      {
        "time": "17:00–17:50",
        "topic": "GitHub 원격: clone·push·pull · PR"
      }
    ],
    "practice": {
      "title": "팀 저장소에서 브랜치로 협업하고 Pull Request 보내기",
      "steps": [
        "팀장 한 명이 GitHub에서 New repository 버튼을 눌러 'team-git-practice' 저장소를 만들고(Add a README 체크), Settings > Collaborators에서 팀원 GitHub 아이디를 모두 초대한다",
        "각 팀원은 터미널에서 'git clone https://github.com/팀장아이디/team-git-practice.git' 을 실행해 내 PC로 저장소를 복제하고, 'cd team-git-practice' 로 폴더에 들어간다",
        "'git switch -c feature/내이름' 으로 내 작업용 브랜치를 새로 만든다 (예: feature/gildong). 화면에 'Switched to a new branch' 가 보이면 성공",
        "'members.md' 파일을 메모장이나 VS Code로 열어 본인 소개 한 줄(이름·역할·각오)을 추가하고 저장한다",
        "'git add members.md' 로 변경을 무대에 올리고, 'git commit -m \"add 홍길동 소개\"' 로 커밋한다. 커밋 메시지는 팀 컨벤션(동사 + 내용)을 따른다",
        "'git push -u origin feature/내이름' 으로 내 브랜치를 GitHub에 올린다. 화면에 PR 생성 링크가 출력된다",
        "GitHub 저장소 페이지로 가서 'Compare & pull request' 버튼을 눌러 PR을 만들고, 제목과 설명을 적은 뒤 'Create pull request' 를 클릭한다",
        "팀원끼리 서로의 PR에 들어가 Files changed 탭에서 변경 내용을 확인하고, 한 줄 이상 리뷰 코멘트를 남긴 뒤 Approve 한다",
        "리뷰가 끝나면 'Merge pull request' 버튼을 눌러 main 브랜치에 합친다. 모두 머지되면 본인 PC에서 'git switch main' 후 'git pull' 로 최신 main을 받아 members.md에 전원 소개가 모인 것을 확인한다",
        "기대 결과: main 브랜치의 members.md 파일에 팀원 전원의 소개가 충돌 없이 합쳐져 있고, GitHub의 Pull requests 탭에 머지된 PR이 인원수만큼 쌓여 있다"
      ],
      "deliverable": "팀원 전원 소개가 머지된 GitHub 저장소 링크와 머지 완료된 PR 목록 캡처"
    }
  },
  "transformer-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 언어모델이란? 다음 단어 맞히기 게임으로 이해하기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 토큰화(BPE)와 임베딩: 글자를 숫자 벡터로 바꾸기 (실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 RNN·LSTM의 순차 처리와 한계 체험하기 (실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 Attention의 직관: 문장에서 '어디를 볼까' 정하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 Self-Attention과 Query·Key·Value 손으로 따라가기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 Scaled Dot-Product Attention 넘파이로 직접 계산 (실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 Attention 가중치 시각화 실습 (메인 실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 결과 해석·발표와 1일차 정리"
      }
    ],
    "practice": {
      "title": "넘파이로 Self-Attention 계산하고 가중치 히트맵으로 보기",
      "steps": [
        "Colab 새 노트북을 열고 첫 셀에 import numpy as np, import matplotlib.pyplot as plt 를 입력해 실행한다",
        "문장 '나는 학교에 간다'를 토큰 3개로 보고, 각 토큰의 임베딩을 4차원 난수 배열 X(3행 4열)로 만든다 (np.random.seed(0) 로 결과 고정)",
        "가중치 행렬 Wq, Wk, Wv 를 각각 4행 4열 난수로 만들고 Q = X @ Wq, K = X @ Wk, V = X @ Wv 로 Q·K·V를 계산한다",
        "점수 scores = Q @ K.T 를 계산하고, K의 차원 d=4의 제곱근으로 나눠 scores = scores / np.sqrt(4) 로 스케일링한다",
        "softmax 함수를 정의해 각 행을 확률로 바꿔 weights(3행 3열)를 구한다 (각 행 합이 1이 되는지 weights.sum(axis=1) 로 확인)",
        "출력 output = weights @ V 를 계산하고 print(weights) 로 가중치 표를 화면에 찍는다",
        "plt.imshow(weights) 로 히트맵을 그리고 plt.colorbar() 와 축 라벨(토큰 이름)을 붙여 어떤 토큰이 어디에 집중하는지 본다",
        "기대 결과: 3x3 히트맵이 뜨고, 각 행의 색이 서로 다르며 한 행의 칸 합이 1.0으로 출력되면 성공이다"
      ],
      "deliverable": "Self-Attention 계산 노트북(.ipynb)과 가중치 히트맵 이미지 1장, 그리고 '어떤 토큰이 어디에 집중했는지' 두 문장 해석 메모"
    }
  },
  "transformer-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 1일차 복습과 Transformer 블록 전체 지도 그리기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 Multi-Head Attention: 여러 시선으로 보기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 Positional Encoding: 순서 정보 넣어주기 (실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 FFN·잔차연결·LayerNorm으로 블록 완성하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 Encoder-Decoder vs Decoder-only 구조 비교"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 대표 모델 BERT·GPT·T5 차이와 쓰임새"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 사전학습 모델로 추론·임베딩 뽑기 실습 (메인 실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 임베딩 유사도 비교·발표와 과정 마무리"
      }
    ],
    "practice": {
      "title": "Hugging Face 사전학습 모델로 문장 임베딩 뽑아 유사도 비교하기",
      "steps": [
        "Colab에서 !pip install -q transformers torch 를 실행해 라이브러리를 설치한다",
        "from transformers import AutoTokenizer, AutoModel 과 import torch 를 불러온다",
        "model_name = 'sentence-transformers/all-MiniLM-L6-v2' 로 토크나이저와 모델을 from_pretrained 로 불러온다 (처음엔 다운로드에 시간이 걸림)",
        "문장 3개를 리스트로 만든다: '강아지가 공원에서 뛴다', '개가 운동장에서 달린다', '주식 시장이 폭락했다'",
        "tokenizer(sentences, padding=True, return_tensors='pt') 로 토큰화하고 with torch.no_grad(): 안에서 model(**inputs) 로 출력을 얻는다",
        "출력의 last_hidden_state를 토큰 평균(mean pooling)해 문장별 임베딩 벡터를 만든다",
        "torch.nn.functional.cosine_similarity 로 문장1과 문장2, 문장1과 문장3의 유사도를 각각 계산해 print 한다",
        "기대 결과: 비슷한 뜻인 문장1·2의 유사도가 0.7 이상으로 높고, 관련 없는 문장1·3은 0.3 이하로 낮게 나오면 성공이다"
      ],
      "deliverable": "문장 임베딩·유사도 비교 노트북(.ipynb)과 유사도 수치 표, '왜 1·2가 가깝고 1·3이 먼지'를 설명한 세 문장 해석"
    }
  },
  "python-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 데이터 분석 환경 만들기: Colab/Jupyter 첫걸음과 셀 실행"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 변수·자료형·연산자와 문자열 다루기 실습"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 리스트·딕셔너리·튜플·집합으로 데이터 담기 실습"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 조건문·반복문으로 데이터 골라내기 실습"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 함수와 컴프리헨션으로 처리 로직 만들기 실습"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 NumPy 배열과 벡터 연산 기초 실습"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 미니 실습: 매출 데이터 전처리 스크립트 만들기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 코드 정리·발표·Q&A와 과제 안내"
      }
    ],
    "practice": {
      "title": "원시 매출 리스트를 깨끗한 분석용 데이터로 바꾸는 전처리 스크립트 만들기",
      "steps": [
        "Google Colab(colab.research.google.com)에 접속해 '새 노트' 버튼을 눌러 빈 노트북을 연다.",
        "첫 셀에 sales = [('사과', '1,200', 3), ('배', '', 2), ('사과', '1200', 1)] 처럼 가게 판매기록 리스트를 직접 입력한다.",
        "두 번째 셀에서 for 반복문으로 각 줄을 꺼내고, 가격 문자열의 쉼표를 price.replace(',', '') 로 제거한 뒤 int() 로 숫자로 바꾼다.",
        "가격이 빈 문자열('')이면 if 문으로 걸러내 0으로 채우거나 건너뛰도록 처리한다(결측치 처리 맛보기).",
        "상품명을 key, 매출 합계를 value 로 하는 딕셔너리 totals 를 만들어 같은 상품끼리 금액을 더한다.",
        "함수 def clean_sales(rows): 로 위 로직을 묶어 재사용 가능하게 만들고 return totals 로 결과를 돌려준다.",
        "print(clean_sales(sales)) 를 실행해 {'사과': 4800, '배': 0} 같은 정리된 딕셔너리가 출력되는지 화면으로 확인한다.",
        "마지막 셀에서 max(totals, key=totals.get) 로 가장 많이 팔린 상품을 찾아 '베스트셀러: 사과' 형태로 출력한다.",
        "메뉴의 '파일 > 다운로드 > .ipynb 다운로드'로 노트북을 저장한다."
      ],
      "deliverable": "결측치를 처리하고 상품별 매출 합계와 베스트셀러를 출력하는 clean_sales 함수가 담긴 Colab 노트북(.ipynb) 1개"
    }
  },
  "python-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 Pandas 시작: Series와 DataFrame 구조 이해 실습"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 CSV 데이터 적재와 인덱싱·선택 실습"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 결측치·이상치 처리로 데이터 정제 실습"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 필터링·정렬·조건 검색 실습"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 groupby로 그룹별 집계 실습"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 merge·pivot으로 데이터 합치고 재구조화 실습"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 matplotlib·seaborn 시각화 실습"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 미니 EDA 프로젝트 발표와 과제 안내"
      }
    ],
    "practice": {
      "title": "공개 타이타닉 데이터로 탐색적 데이터 분석(EDA) 리포트 만들기",
      "steps": [
        "Colab 새 노트에서 import pandas as pd 와 import seaborn as sns 를 입력해 도구를 불러온다.",
        "df = sns.load_dataset('titanic') 으로 인터넷 연결 없이 바로 쓸 수 있는 예제 데이터를 불러온다.",
        "df.head() 와 df.info() 를 실행해 어떤 열이 있고 결측치가 얼마나 있는지 화면으로 확인한다.",
        "df['age'].fillna(df['age'].median()) 로 나이의 빈 칸을 중앙값으로 채워 결측치를 처리한다.",
        "df[df['age'] >= 18] 처럼 조건으로 성인 승객만 골라내 필터링을 연습한다.",
        "df.groupby('sex')['survived'].mean() 으로 성별 생존율을 집계해 표로 출력한다.",
        "결과 표를 보고 '여성 생존율 약 0.74, 남성 약 0.19' 같은 숫자가 나오는지 확인한다.",
        "sns.barplot(data=df, x='pclass', y='survived') 로 객실 등급별 생존율 막대그래프를 그린다.",
        "마크다운 셀을 추가해 발견한 인사이트 3가지를 한국어 문장으로 적는다.",
        "'파일 > 다운로드 > .ipynb'로 분석 노트북을 저장한다."
      ],
      "deliverable": "결측치 처리·그룹 집계·시각화·인사이트 3줄이 포함된 타이타닉 EDA 노트북(.ipynb) 1개"
    }
  },
  "prompt-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 — LLM이 글을 만드는 원리와 프롬프트가 하는 일"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 — 프롬프트 4대 구성요소(역할·지시·예시·제약) 뜯어보기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 나쁜 프롬프트 → 좋은 프롬프트로 고쳐쓰기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 — Zero-shot · Few-shot · Chain-of-Thought 패턴"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 — System·User·Assistant 메시지 구조와 역할 분담"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 컨텍스트 윈도우·토큰 비용과 요약·압축 전략"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 업무 프롬프트 만들기 → 평가표로 채점 → 개선"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 환각(거짓말) 줄이기와 팀 발표·회고"
      }
    ],
    "practice": {
      "title": "내 업무용 프롬프트 만들고 평가·개선하기 (회의록 요약 봇)",
      "steps": [
        "Google Colab 새 노트를 열고 코드 셀에 `!pip install openai` 를 입력해 실행한다(설치 완료 메시지 확인).",
        "`import os` 와 `from openai import OpenAI` 를 입력하고, 강사가 나눠준 API 키를 `os.environ['OPENAI_API_KEY']='발급키'` 로 등록한다.",
        "역할·지시·예시·제약 4요소를 모두 담은 system 프롬프트 문자열을 작성한다(예: '너는 회의록 요약 전문가다. 결정사항/할일/담당자를 표로 정리하라').",
        "샘플 회의록 텍스트를 user 메시지에 넣고 `client.chat.completions.create(...)` 로 첫 응답(version 1)을 받아 화면에 출력한다.",
        "출력 결과를 평가표(정확성·형식준수·간결성 각 5점)로 직접 채점하고 부족한 항목을 메모한다.",
        "부족했던 점을 보완하도록 프롬프트에 '반드시 Markdown 표로', '추측 금지, 없으면 비워둠' 같은 제약을 추가해 version 2 를 만든다.",
        "같은 회의록으로 version 2 응답을 다시 받아 version 1 과 나란히 비교 출력한다(점수가 올랐는지 확인).",
        "최종 프롬프트와 두 버전의 결과·점수 변화를 노트 셀에 정리하고 노트북을 PDF로 내보낸다."
      ],
      "deliverable": "프롬프트 v1·v2 전문, 각 버전의 출력 결과와 평가 점수표, 개선 이유를 담은 Colab 노트북(PDF)"
    }
  },
  "vue-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 OT·Vue 소개와 화면이 그려지는 원리 맛보기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 개발환경 준비: Node·Vite로 첫 Vue 프로젝트 만들기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] SFC 구조 뜯어보기와 첫 화면 수정"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 반응형의 핵심: ref·reactive로 데이터가 화면을 바꾼다"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 템플릿 문법: 보간({{ }})과 디렉티브 v-bind·v-on"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 조건·반복: v-if·v-for로 화면 제어하기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 폼 입력과 v-model 양방향 바인딩"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] computed·watch로 반응형 UI 컴포넌트 완성"
      }
    ],
    "practice": {
      "title": "실시간 할 일(To-Do) 카운터 컴포넌트 만들기",
      "steps": [
        "터미널에서 npm create vite@latest todo-counter -- --template vue 명령으로 프로젝트를 생성한다",
        "cd todo-counter 후 npm install 을 실행해 의존성을 내려받고, npm run dev 로 개발 서버를 켠다(브라우저에 기본 Vue 화면이 뜨면 성공)",
        "src/App.vue 파일을 열어 기존 내용을 지우고 <script setup> 블록에 import { ref, computed } from 'vue' 를 작성한다",
        "const newTask = ref('') 와 const tasks = ref([]) 두 개의 반응형 변수를 만든다",
        "addTask 함수를 만들어 newTask.value 가 비어있지 않으면 tasks.value.push({ text: newTask.value, done: false }) 한 뒤 newTask.value = '' 로 입력칸을 비운다",
        "const doneCount = computed(() => tasks.value.filter(t => t.done).length) 으로 완료 개수를 자동 계산한다",
        "<template> 에 <input v-model=\"newTask\" @keyup.enter=\"addTask\"> 와 목록을 v-for 로 그리고, 각 항목에 <input type=\"checkbox\" v-model=\"item.done\"> 를 연결한다",
        "화면 상단에 <p>완료: {{ doneCount }} / 전체: {{ tasks.length }}</p> 를 추가한다",
        "브라우저에서 할 일을 입력하고 Enter를 누르면 목록에 추가되고, 체크하면 '완료' 숫자가 즉시 1씩 올라가는지 확인한다(새로고침 없이 바뀌면 반응형 성공)",
        "완성된 화면을 캡처하고 코드를 저장한다"
      ],
      "deliverable": "입력·추가·완료 카운트가 실시간 동작하는 App.vue 파일과 동작 화면 캡처"
    }
  },
  "vue-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 어제 복습과 컴포넌트로 화면을 쪼개는 이유"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 props: 부모가 자식에게 데이터 내려주기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 재사용 카드 컴포넌트 만들고 props 넘기기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 emit: 자식이 부모에게 사건 알리기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 슬롯(slot): 컴포넌트 안에 내용 끼워 넣기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 라이프사이클 훅과 Composition API(setup) 패턴"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 컴포저블(composable)로 로직 재사용하기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 목록·아이템 재사용 컴포넌트 통합 완성"
      }
    ],
    "practice": {
      "title": "별점 매기는 ProductCard 컴포넌트 세트 만들기",
      "steps": [
        "src/components 폴더에 ProductCard.vue 파일을 새로 만든다",
        "ProductCard.vue 의 <script setup> 에 const props = defineProps({ name: String, price: Number, rating: Number }) 를 작성한다",
        "별점을 표시하기 위해 const stars = computed(() => '★'.repeat(props.rating) + '☆'.repeat(5 - props.rating)) 를 만든다(computed import 필요)",
        "<template> 에 상품명·가격·stars 를 보여주고, <button @click=\"$emit('buy', props.name)\">담기</button> 를 추가한다",
        "script 상단에 defineEmits(['buy']) 를 선언해 buy 이벤트를 정의한다",
        "부모인 App.vue 에서 import ProductCard from './components/ProductCard.vue' 하고, const items = ref([...]) 에 상품 3개를 배열로 넣는다",
        "App.vue 의 <template> 에서 <ProductCard v-for=\"p in items\" :key=\"p.name\" :name=\"p.name\" :price=\"p.price\" :rating=\"p.rating\" @buy=\"onBuy\" /> 로 목록을 그린다",
        "onBuy 함수를 만들어 alert(`${상품명} 담김!`) 으로 부모가 자식의 클릭을 받아 처리한다",
        "브라우저에서 카드 3개가 각기 다른 별점으로 보이고, 담기 버튼을 누르면 부모에서 알림이 뜨는지 확인한다",
        "동작 화면을 캡처한다"
      ],
      "deliverable": "props로 데이터를 받고 emit으로 클릭을 전달하는 ProductCard.vue와 이를 사용하는 App.vue, 동작 캡처"
    }
  },
  "vue-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 SPA란 무엇인가와 페이지 이동의 원리"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 Vue Router 설치와 기본 라우트 설정"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 홈·소개·목록 3개 페이지 라우팅 만들기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 동적 파라미터와 중첩 라우트로 상세 페이지 연결"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 네비게이션 가드로 로그인 보호 페이지 만들기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 왜 전역 상태가 필요한가: Pinia 소개"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 Pinia 스토어: state·getters·actions"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 목록·상세 라우팅 + Pinia 전역 장바구니 완성"
      }
    ],
    "practice": {
      "title": "라우팅 + Pinia 장바구니가 있는 미니 쇼핑몰",
      "steps": [
        "npm install vue-router@4 pinia 명령으로 두 라이브러리를 설치한다",
        "src/router/index.js 를 만들어 createRouter·createWebHistory 로 / (홈), /products (목록), /products/:id (상세) 세 경로를 routes 배열에 등록한다",
        "src/main.js 에서 createPinia()와 router 를 app.use() 로 등록한다",
        "src/stores/cart.js 에 defineStore('cart', ...) 로 items 상태와 addItem 액션, totalCount getter 를 만든다",
        "ProductList.vue 에서 상품을 v-for 로 그리고 <router-link :to=\"`/products/${p.id}`\"> 로 상세 페이지 링크를 건다",
        "ProductDetail.vue 에서 useRoute() 로 route.params.id 를 읽어 해당 상품을 찾아 보여준다",
        "상세 페이지의 '장바구니 담기' 버튼에서 useCartStore().addItem(product) 를 호출한다",
        "App.vue 헤더에 <router-link to=\"/products\"> 와 장바구니 개수 {{ cart.totalCount }} 를 항상 보이게 둔다",
        "브라우저에서 목록 → 상세 이동, 담기 버튼 클릭 시 헤더의 장바구니 숫자가 페이지를 옮겨도 유지되는지 확인한다",
        "이동과 담기 동작 화면을 캡처한다"
      ],
      "deliverable": "라우터 설정·Pinia cart 스토어·목록/상세 페이지가 동작하고 장바구니 개수가 전역 유지되는 프로젝트와 캡처"
    }
  },
  "vue-4": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 비동기와 API 호출의 개념: 서버에서 데이터 받아오기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 fetch·axios로 데이터 가져오고 로딩·에러 처리"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 외부 API로 목록 불러와 화면에 그리기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 폼 처리와 입력 유효성 검사"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 환경변수와 API 베이스 주소 설정(.env)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 Vite 빌드와 정적 배포 원리"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 목록·상세·폼 미니 SPA 통합"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 빌드 후 정적 호스팅에 배포하고 점검"
      }
    ],
    "practice": {
      "title": "공개 API로 동작하는 미니 SPA 만들고 배포하기",
      "steps": [
        "npm install axios 로 HTTP 요청 도구를 설치한다",
        ".env 파일을 만들고 VITE_API_BASE=https://jsonplaceholder.typicode.com 을 적는다(VITE_ 접두사 필수)",
        "src/api/client.js 에서 axios.create({ baseURL: import.meta.env.VITE_API_BASE }) 로 공통 클라이언트를 만든다",
        "PostList.vue 에서 onMounted 시점에 api.get('/posts') 를 호출하고 loading·error·posts 세 가지 ref 로 상태를 관리한다",
        "불러오는 동안 <p v-if=\"loading\">불러오는 중...</p>, 실패 시 <p v-if=\"error\">오류 발생</p> 를 보여준다",
        "성공하면 posts 를 v-for 로 그리고 각 항목을 /posts/:id 상세로 router-link 연결한다",
        "NewPost.vue 폼을 만들어 제목이 비었으면 '제목을 입력하세요' 경고를 띄우는 유효성 검사를 넣는다",
        "터미널에서 npm run build 를 실행해 dist 폴더가 생성되는지 확인한다",
        "npm run preview 로 빌드 결과를 로컬에서 띄워 목록·상세·폼이 모두 동작하는지 점검한다",
        "dist 폴더를 정적 호스팅(예: GitHub Pages·Netlify)에 올리고, 공개 주소에서 새로고침해도 페이지가 뜨는지 확인한 뒤 캡처한다"
      ],
      "deliverable": "API 연동·로딩/에러 처리·폼 검증이 동작하는 미니 SPA 소스와 배포된 공개 URL, 동작 캡처"
    }
  },
  "webproject-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 OT와 미니 프로젝트 목표 잡기: 무엇을 만들까"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 사용자 시나리오 쓰기: 누가·왜·어떻게 쓰나"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 와이어프레임 그리기: 화면 흐름 종이 설계 실습"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 기능 명세서 작성: 화면별 할 일 목록 만들기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 데이터 모델 설계: 화면에 필요한 데이터 정리 실습"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 프론트/백 아키텍처와 API 목록 정하기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 기술 스택 선정과 Vite 프로젝트 생성 실습"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 역할 분담·일정표·GitHub 저장소 세팅"
      }
    ],
    "practice": {
      "title": "투두리스트(할 일 관리) 미니 서비스 기획서 + 프로젝트 뼈대 만들기",
      "steps": [
        "팀에서 만들 주제를 '할 일 관리 앱'으로 정하고, 한 줄 소개 문장을 적는다 (예: '학습 일정을 등록하고 완료 체크하는 앱').",
        "사용자 시나리오를 3개 적는다 (예: 사용자가 할 일을 추가한다 / 완료하면 체크한다 / 목록에서 삭제한다).",
        "종이나 Figma에 화면 3개(목록 화면, 추가 폼, 상세/수정)를 그려 와이어프레임을 만든다.",
        "각 화면이 보여줄 데이터를 표로 정리한다 (할 일: id, 제목, 완료여부, 마감일).",
        "터미널에서 npm create vite@latest my-todo -- --template vue 를 실행해 Vue 프로젝트를 생성한다.",
        "cd my-todo 후 npm install 을 실행하고, npm run dev 로 개발 서버를 켠다.",
        "브라우저에서 http://localhost:5173 을 열어 Vue 기본 화면이 뜨는지 확인한다 (기대 결과: Vite + Vue 로고 화면이 보임).",
        "src/App.vue 의 제목을 우리 프로젝트 이름으로 바꾸고 저장하면 화면이 자동으로 바뀌는지 확인한다.",
        "GitHub에 빈 저장소를 만들고 git init → git add . → git commit → git push 로 첫 코드를 올린다.",
        "팀원 역할(화면개발/데이터/배포)과 3일 일정표를 README.md에 적어 커밋한다."
      ],
      "deliverable": "기획서(한 줄 소개·시나리오·와이어프레임·데이터 표) + 실행되는 Vue 프로젝트 뼈대가 올라간 GitHub 저장소"
    }
  },
  "webproject-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 어제 설계 복습과 오늘 만들 화면 정하기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 컴포넌트 분리: 목록·아이템·폼으로 쪼개기 실습"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 반응형 상태(ref)와 목록 렌더링(v-for) 구현 실습"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 입력 폼과 v-model로 할 일 추가하기 실습"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 완료 체크·삭제 기능과 이벤트 처리 실습"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 가짜 API(json 또는 mock) 연동과 fetch 비동기 처리"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 로딩·에러 상태 표시와 폼 유효성 검사 실습"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 중간 점검·동료 피드백·커밋 정리"
      }
    ],
    "practice": {
      "title": "할 일 추가·완료·삭제가 동작하는 Vue 화면 구현하기",
      "steps": [
        "src 폴더에 components 폴더를 만들고 TodoForm.vue, TodoList.vue, TodoItem.vue 파일 3개를 생성한다.",
        "App.vue 에서 ref([]) 로 todos 라는 빈 목록 상태를 만든다.",
        "TodoForm.vue 에 input과 버튼을 만들고 v-model 로 입력값을 묶은 뒤, 추가 버튼을 누르면 emit('add', 제목) 으로 부모에 알린다.",
        "App.vue 에서 @add 이벤트를 받아 todos 배열에 { id, title, done:false } 객체를 push 한다.",
        "TodoList.vue 에서 v-for 로 todos 를 돌며 각 항목을 TodoItem.vue 로 보여준다.",
        "TodoItem.vue 에 체크박스를 두고 v-model 로 done 을 묶어 완료 표시(취소선)를 적용한다.",
        "각 항목에 삭제 버튼을 만들고 클릭하면 emit('remove', id) 로 부모에서 filter 로 제거한다.",
        "빈 제목으로 추가를 누르면 '제목을 입력하세요' 경고를 보여주는 유효성 검사를 넣는다.",
        "브라우저에서 할 일을 추가·체크·삭제 해보고 화면이 즉시 바뀌는지 확인한다 (기대 결과: 추가하면 목록에 나타나고, 체크하면 취소선, 삭제하면 사라짐).",
        "여기까지를 git add . && git commit -m 'feat: 할 일 CRUD 화면 구현' 으로 커밋한다."
      ],
      "deliverable": "추가·완료·삭제가 모두 동작하는 Vue 투두 화면 코드(컴포넌트 분리 포함)와 중간 커밋"
    }
  },
  "webproject-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 기능 통합 점검과 남은 버그 목록 정리"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 버그 수정과 코드 정리(리팩터링) 실습"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 환경변수·API 베이스 설정과 빌드 준비 실습"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 npm run build로 정적 빌드 만들기 실습"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 GitHub Pages(또는 Netlify) 배포 실습"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 배포 주소 확인·모바일 점검과 README 정리"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 발표 자료 준비와 시연 리허설"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 팀별 결과 발표와 회고(KPT)"
      }
    ],
    "practice": {
      "title": "완성한 투두 서비스를 빌드해서 인터넷에 배포하고 발표하기",
      "steps": [
        "전체 기능을 한 번씩 눌러보며 동작하지 않는 부분(버그)을 목록으로 적는다.",
        "찾은 버그를 고치고, 중복 코드를 함수로 묶어 정리한다.",
        "vite.config.js 에 배포 경로에 맞는 base 옵션(예: base: '/my-todo/')을 설정한다.",
        "터미널에서 npm run build 를 실행해 dist 폴더가 생기는지 확인한다.",
        "npm run preview 로 빌드 결과를 로컬에서 미리 확인한다 (기대 결과: 빌드된 화면이 정상 동작).",
        "GitHub Actions 또는 gh-pages 패키지로 dist 폴더를 GitHub Pages에 배포한다.",
        "배포된 https://아이디.github.io/my-todo/ 주소를 열어 실제로 동작하는지 확인한다.",
        "휴대폰으로도 같은 주소를 열어 모바일에서 깨지지 않는지 점검한다.",
        "README.md에 서비스 소개·실행 방법·배포 주소·팀원 역할을 정리해 커밋한다.",
        "3분 시연 시나리오(추가→완료→삭제→배포주소 보여주기)를 정해 발표를 리허설한다."
      ],
      "deliverable": "인터넷에서 접속 가능한 배포 주소 + 정리된 README + 3분 발표(시연 포함)"
    }
  },
  "spring-ai-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 오리엔테이션 · Spring AI가 무엇이고 왜 쓰는가"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 개발환경 준비 · 프로젝트 생성과 의존성 추가(실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 ChatClient / ChatModel 추상화 개념 잡기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] API 키 설정하고 첫 LLM 호출 성공시키기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 모델 프로바이더(OpenAI · Anthropic) 연동과 교체"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 PromptTemplate으로 동적 프롬프트 만들기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 채팅 응답 REST API 엔드투엔드 구현"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] Postman으로 테스트 · 정리 · 과제 안내"
      }
    ],
    "practice": {
      "title": "Spring Boot로 'AI 채팅 응답' REST API 만들기",
      "steps": [
        "start.spring.io 에서 Project=Gradle, Language=Java 17, Spring Boot 3.3 선택 후 Dependencies에 'Spring Web'과 'Spring AI OpenAI Starter'를 추가하고 GENERATE 버튼을 눌러 zip을 내려받는다",
        "내려받은 zip을 압축 해제하고 IntelliJ(또는 VS Code)에서 폴더를 열어 Gradle 동기화가 끝날 때까지 기다린다",
        "src/main/resources/application.properties 파일에 spring.ai.openai.api-key=${OPENAI_API_KEY} 한 줄을 적고, 터미널에서 export OPENAI_API_KEY=sk-... 로 발급받은 키를 환경변수로 등록한다",
        "src/main/java 아래에 ChatController.java 파일을 만들고 @RestController 와 @GetMapping(\"/chat\") 을 붙인 메서드를 작성한다",
        "생성자 주입으로 ChatClient.Builder 를 받아 this.chatClient = builder.build() 로 ChatClient 를 초기화한다",
        "메서드 안에서 chatClient.prompt().user(message).call().content() 를 호출해 LLM의 답변 문자열을 반환하도록 작성한다",
        "터미널에서 ./gradlew bootRun 을 실행해 'Started ... in N seconds' 로그가 뜨면 서버가 8080 포트로 떴는지 확인한다",
        "브라우저나 Postman에서 http://localhost:8080/chat?message=안녕 을 호출해 LLM이 생성한 한국어 답변이 화면에 표시되는지 확인한다(기대 결과: 자연스러운 인사 응답 문장 출력)"
      ],
      "deliverable": "GET /chat?message= 호출 시 LLM 답변을 반환하는 동작하는 Spring Boot 프로젝트와, Postman 호출 결과 캡처 1장"
    }
  },
  "spring-ai-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 RAG가 왜 필요한가 · 환각 문제 이해하기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 Embedding과 VectorStore 개념 잡기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 임베딩 모델로 문장을 벡터로 바꿔보기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 pgvector 설치와 VectorStore 연동(실습)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 문서 읽기 · 쪼개기(Document Reader · Splitter)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 문서를 벡터DB에 적재(인덱싱)하기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 Retrieval 결합 프롬프트(RAG) 구성 원리"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 사내 문서 QA API 완성 · 정리"
      }
    ],
    "practice": {
      "title": "사내 문서로 답하는 'RAG 질의응답 API' 만들기",
      "steps": [
        "터미널에서 docker run --name pg -e POSTGRES_PASSWORD=pass -p 5432:5432 -d pgvector/pgvector:pg16 을 실행해 pgvector가 내장된 PostgreSQL을 띄운다",
        "build.gradle에 'spring-ai-pgvector-store-spring-boot-starter' 의존성을 추가하고 Gradle을 동기화한다",
        "application.properties에 spring.datasource.url, username, password와 spring.ai.vectorstore.pgvector.initialize-schema=true 를 설정한다",
        "src/main/resources에 회사소개.txt 같은 샘플 문서를 넣고, TextReader로 읽은 뒤 TokenTextSplitter로 문단 단위로 쪼갠다",
        "쪼갠 문서 조각들을 vectorStore.add(documents) 로 호출해 벡터DB에 한 번 적재한다",
        "질문을 받는 @GetMapping(\"/ask\") 컨트롤러를 만들고, vectorStore.similaritySearch(question) 로 질문과 비슷한 문서 조각을 top 3개 찾는다",
        "찾은 문서 조각들을 하나의 문자열(context)로 합쳐 PromptTemplate의 빈칸에 끼워 넣고 LLM에 질문과 함께 보낸다",
        "Postman에서 /ask?question=회사 휴가 정책 알려줘 를 호출해, 샘플 문서 내용에 근거한 답변이 나오는지 확인한다(기대 결과: 문서에 적힌 사실만 인용한 답변 출력)"
      ],
      "deliverable": "샘플 문서를 적재하고 /ask로 질문하면 문서 근거 답변을 주는 RAG API 프로젝트와, 적재 전·후 답변 비교 캡처"
    }
  },
  "spring-ai-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 Function Calling이란 · LLM이 외부 기능을 부르는 원리"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] 날씨 조회 Tool 정의하고 LLM이 호출하게 하기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 구조화 출력(Structured Output)으로 자바 객체 받기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] 답변을 DTO 객체로 자동 매핑하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 스트리밍 응답으로 글자 흘려보내기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 예외·재시도 처리와 안정화 전략"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 AI 기능 서비스 통합과 보안 고려사항"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 도구 연동형 AI 기능 서비스 완성 · 발표"
      }
    ],
    "practice": {
      "title": "Tool(Function)을 연동한 'AI 비서 서비스' 만들기",
      "steps": [
        "@Description 어노테이션과 함께 입력·출력 record를 가진 WeatherTool 클래스를 만들어 '도시 이름을 받아 날씨를 돌려주는' Function을 정의한다",
        "WeatherTool 안에서는 실제 API 대신 Map에 미리 넣어둔 도시별 가짜 날씨 데이터를 반환하도록 구현한다(학습용)",
        "@Configuration 클래스에 @Bean으로 이 Function을 등록하고, 빈 이름을 'currentWeather'로 지정한다",
        "컨트롤러에서 chatClient.prompt().user(질문).tools(\"currentWeather\") 형태로 LLM이 필요할 때 이 도구를 부를 수 있게 연결한다",
        "Postman에서 /assistant?message=서울 날씨 어때? 를 호출하면 LLM이 currentWeather 도구를 자동 호출해 날씨를 받아 자연어로 답하는지 확인한다",
        "이번엔 .entity(WeatherReport.class) 를 붙여 LLM 답변을 문자열이 아닌 자바 객체(DTO)로 받아 JSON으로 응답하도록 바꾼다",
        "스트리밍 엔드포인트를 추가해 chatClient.prompt().user(...).stream().content() 로 답변이 글자 단위로 흘러나오는지 확인한다",
        "API 키 누락·외부 호출 실패 상황을 가정해 try-catch와 @Retryable로 감싸고, 실패 시 사용자에게 친절한 에러 메시지가 나오는지 확인한다(기대 결과: 서버가 죽지 않고 안내 메시지 응답)"
      ],
      "deliverable": "Tool 연동·구조화 출력·스트리밍·예외처리를 모두 갖춘 AI 비서 API 프로젝트와, 도구 호출 동작 시연 캡처"
    }
  },
  "sllm-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 sLLM이란? 대형 LLM과 비교로 이해하기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 오픈소스 모델 생태계 둘러보기 (Llama·Qwen·Gemma)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 내 PC에 Ollama 깔고 첫 모델 돌려보기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 양자화(quantization)와 경량화 쉽게 이해하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 4비트 양자화 모델로 메모리 절약 체험"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 로컬 서빙 도구 비교: Ollama vs vLLM vs HuggingFace"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 파이썬으로 로컬 모델에 API 요청 보내기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] PEFT·LoRA 개념 맛보기 + 미니 챗봇 만들기"
      }
    ],
    "practice": {
      "title": "내 노트북에서 소형 LLM 띄우고 한국어 챗봇 만들기",
      "steps": [
        "Ollama 공식 사이트(ollama.com)에서 운영체제에 맞는 설치 파일을 내려받아 설치한다",
        "터미널을 열고 'ollama --version' 을 입력해 설치가 끝났는지 확인한다 (버전 숫자가 보이면 성공)",
        "'ollama pull qwen2.5:0.5b' 를 실행해 0.5B 크기의 아주 작은 모델을 내려받는다 (다운로드 진행률 막대가 끝까지 차오른다)",
        "'ollama run qwen2.5:0.5b' 를 입력하고 '안녕? 너는 누구야?' 라고 물어 모델이 한국어로 답하는지 확인한다",
        "터미널에서 '/bye' 를 입력해 대화를 빠져나온 뒤, VS Code 등 편집기에서 새 파일 chat.py 를 만든다",
        "pip install requests 로 라이브러리를 설치하고, requests 로 'http://localhost:11434/api/generate' 에 질문을 보내는 코드를 작성한다",
        "python chat.py 를 실행해 터미널이 아닌 파이썬 코드로도 모델 답변(JSON 안의 response 값)이 출력되는지 확인한다",
        "프롬프트 앞에 '너는 친절한 한국어 비서야. 짧게 답해.' 같은 역할 지시문을 붙여 답변 말투가 바뀌는지 비교한다",
        "while 반복문으로 입력을 계속 받도록 고쳐 '종료' 라고 칠 때까지 대화가 이어지는 간단 챗봇을 완성한다",
        "완성된 chat.py 와 대화 캡처를 정리해 산출물로 저장한다"
      ],
      "deliverable": "Ollama로 띄운 sLLM에 파이썬으로 질문/응답하는 chat.py 스크립트와 한국어 대화 스크린샷"
    }
  },
  "sllm-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 파인튜닝이란? 왜 LoRA를 쓰나"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] 학습용 데이터셋(instruction 포맷) 만들기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 데이터 점검·전처리하고 형식 맞추기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 LoRA·QLoRA 학습 파이프라인 한눈에 보기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] LoRA 설정하고 sLLM 파인튜닝 돌리기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 학습 모니터링과 하이퍼파라미터 감 잡기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 학습한 모델로 추론·전후 비교 평가"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 어댑터 저장·병합하고 도메인 챗봇 마무리"
      }
    ],
    "practice": {
      "title": "내 데이터로 sLLM을 LoRA 파인튜닝해 말투·지식 바꾸기",
      "steps": [
        "Google Colab에 접속해 상단 메뉴 런타임 > 런타임 유형 변경에서 하드웨어 가속기를 T4 GPU로 설정한다",
        "첫 셀에 'pip install -q transformers datasets peft trl bitsandbytes accelerate' 를 입력해 라이브러리를 설치한다",
        "instruction/input/output 3개 열을 가진 20~30개짜리 JSONL 학습 데이터(예: 우리 회사 인사말투)를 만들어 업로드한다",
        "datasets로 JSONL을 불러와 '### 지시:\\n...\\n### 답변:\\n...' 형태의 한 문장으로 합치는 포맷 함수를 적용한다",
        "base 모델로 Qwen2.5-0.5B를 4비트로 불러오고(LoraConfig의 r=8, target_modules 지정) PEFT 모델을 만든다",
        "SFTTrainer에 모델·데이터·학습 인자(에폭 3, 배치 2)를 넣고 trainer.train() 을 실행한다 (loss 숫자가 점점 내려가는지 본다)",
        "학습이 끝나면 trainer.model.save_pretrained('my-lora') 로 LoRA 어댑터를 저장한다",
        "학습 전 base 모델과 학습 후 모델에 같은 질문을 던져 답변 말투/내용이 바뀌었는지 나란히 비교한다",
        "결과가 부족하면 데이터 개수를 늘리거나 에폭을 조정해 한 번 더 학습하고 차이를 확인한다",
        "최종 어댑터 폴더와 전후 비교 결과를 정리해 산출물로 제출한다"
      ],
      "deliverable": "직접 만든 instruction 데이터로 LoRA 파인튜닝한 어댑터 폴더(my-lora)와 학습 전/후 답변 비교 노트북(.ipynb)"
    }
  },
  "ml-dl-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 머신러닝이란? 학습 유형(지도·비지도·강화) 한눈에 보기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 회귀와 분류의 차이, 대표 알고리즘 지도 그리기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 실습 워밍업: Colab/Jupyter 켜고 데이터 불러오기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 데이터 분할(train/test)과 과적합·일반화 직관"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 실습: scikit-learn 으로 첫 분류 모델 학습하기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 평가지표(정확도·정밀도·재현율·F1·ROC) 읽는 법"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 실습: 혼동행렬과 분류 리포트로 모델 진단하기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 실습 정리·미니 챌린지와 Q&A"
      }
    ],
    "practice": {
      "title": "붓꽃(Iris) 데이터로 첫 분류 모델 만들고 평가하기",
      "steps": [
        "Colab 새 노트북을 열고 첫 셀에 'from sklearn.datasets import load_iris' 를 입력해 데이터셋을 불러온다",
        "'data = load_iris()' 실행 후 'data.data.shape' 를 출력해 (150, 4) 모양임을 눈으로 확인한다",
        "'from sklearn.model_selection import train_test_split' 으로 데이터를 train 70% / test 30% 로 나눈다(random_state=42 고정)",
        "'from sklearn.tree import DecisionTreeClassifier' 로 모델 객체를 만들고 'model.fit(X_train, y_train)' 으로 학습시킨다",
        "'pred = model.predict(X_test)' 로 예측하고 'pred[:10]' 을 출력해 예측 라벨을 확인한다",
        "'from sklearn.metrics import accuracy_score' 로 정확도를 계산해 0.9 이상이 나오는지 확인한다",
        "'from sklearn.metrics import classification_report' 로 정밀도·재현율·F1 표를 출력한다",
        "max_depth=1 로 모델을 다시 학습해 정확도가 떨어지는지(과소적합) 비교 관찰한다",
        "기대 결과: 기본 모델 정확도 약 0.93~1.0, classification_report 표와 클래스별 점수가 화면에 출력된다"
      ],
      "deliverable": "Iris 분류 노트북(.ipynb) — 학습 코드 + 정확도 출력 + classification_report 캡처"
    }
  },
  "ml-dl-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 신경망이란? 뇌의 뉴런에서 출발한 직관"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 퍼셉트론에서 다층 신경망(MLP)까지"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 실습: PyTorch 설치 확인과 텐서(Tensor) 다루기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 순전파·역전파와 활성화 함수 쉽게 이해하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 손실 함수와 옵티마이저(SGD/Adam)의 역할"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 실습: PyTorch 학습 루프 직접 짜보기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 실습: 손글씨 숫자(MNIST) 분류 신경망 학습"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 실습 결과 비교·디버깅·Q&A"
      }
    ],
    "practice": {
      "title": "PyTorch 로 손글씨 숫자(MNIST) 분류 신경망 학습하기",
      "steps": [
        "'import torch' 를 실행하고 'torch.__version__' 으로 설치를 확인한다",
        "torchvision 의 datasets.MNIST 로 학습/시험 데이터를 내려받고 transforms.ToTensor() 로 텐서 변환한다",
        "DataLoader 로 배치 크기 64, shuffle=True 설정해 데이터를 묶는다",
        "nn.Sequential 로 'Linear(784,128) → ReLU → Linear(128,10)' 구조의 모델을 만든다",
        "손실 함수는 nn.CrossEntropyLoss(), 옵티마이저는 optim.Adam(lr=0.001) 으로 정한다",
        "for 루프 3 에폭 동안 forward → loss 계산 → loss.backward() → optimizer.step() 순서로 학습한다",
        "각 에폭마다 평균 손실을 print 해서 숫자가 점점 줄어드는지 확인한다",
        "학습 후 시험 데이터로 정확도를 계산해 90% 이상 나오는지 확인한다",
        "기대 결과: 손실이 에폭마다 감소하고, 최종 테스트 정확도가 약 0.92~0.97 로 출력된다"
      ],
      "deliverable": "MNIST 신경망 학습 노트북 — 에폭별 손실 로그 + 최종 테스트 정확도"
    }
  },
  "ml-dl-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 어제 신경망 복습과 오늘의 큰 그림"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 CNN: 이미지를 보는 신경망의 직관"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 RNN/LSTM: 순서가 있는 데이터(시퀀스) 다루기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 Transformer 와 Attention 직관 맛보기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 과적합 방지: 드롭아웃·정규화·데이터 증강"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 실습: 드롭아웃·증강 넣어 모델 성능 개선하기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 실습: 전이학습(Transfer Learning)으로 빠르게 성능 올리기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 미니 과제 발표·전체 회고·Q&A"
      }
    ],
    "practice": {
      "title": "전이학습으로 이미지 분류 모델 빠르게 만들기 (CIFAR-10 일부)",
      "steps": [
        "torchvision.models 에서 'resnet18(weights=...)' 으로 사전학습 모델을 불러온다",
        "모델의 마지막 분류층(fc)을 우리 문제의 클래스 수에 맞게 nn.Linear 로 교체한다",
        "특징 추출 부분(backbone)의 파라미터는 requires_grad=False 로 얼려(freeze) 학습 대상에서 뺀다",
        "transforms 에 RandomHorizontalFlip 과 Normalize 를 넣어 데이터 증강을 적용한다",
        "CrossEntropyLoss 와 Adam(lr=0.001)을 설정하고 마지막 층만 학습한다",
        "2 에폭 학습하며 에폭별 손실과 정확도를 출력한다",
        "드롭아웃을 추가한 버전과 추가하지 않은 버전의 테스트 정확도를 비교한다",
        "기대 결과: 처음부터 학습할 때보다 훨씬 적은 에폭으로 높은 정확도(예: 0.7 이상)에 도달한다"
      ],
      "deliverable": "전이학습 노트북 — 사전학습 모델 교체 코드 + 드롭아웃 유무 정확도 비교표"
    }
  },
  "feature-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 피처 엔지니어링이 뭐길래: 모델 성능을 가르는 재료 손질"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 데이터 불러오기와 결측치·이상치 진단 (실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 스케일링·정규화로 숫자 줄세우기 (실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 범주형 인코딩: 글자를 숫자로 바꾸기 (실습)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 수치·날짜·텍스트 파생 피처 만들기 (실습)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 피처 선택과 차원 축소로 군더더기 덜어내기 (실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 메인 실습: 피처 엔지니어링 전후 성능 비교 (실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 결과 발표·회고와 실무 적용 팁"
      }
    ],
    "practice": {
      "title": "피처 엔지니어링 전과 후의 모델 성능 비교 (타이타닉 생존 예측)",
      "steps": [
        "Colab 노트북을 새로 열고 첫 셀에 import pandas as pd, seaborn as sns 를 입력해 라이브러리를 불러온다.",
        "df = sns.load_dataset('titanic') 로 타이타닉 데이터를 불러오고 df.head() 로 상위 5줄을 화면에서 확인한다.",
        "베이스라인용으로 숫자 컬럼만 골라 X0 = df[['pclass','age','fare','sibsp','parch']].fillna(0), y = df['survived'] 를 만든다.",
        "train_test_split(X0, y, test_size=0.2, random_state=42) 로 학습/평가 데이터를 8:2로 나눈다.",
        "RandomForestClassifier 를 fit 한 뒤 accuracy_score 를 출력해 '가공 전' 정확도(약 0.70 부근)를 기록한다.",
        "결측치 처리: age 는 중앙값으로, embarked 는 최빈값으로 채운다(fillna).",
        "범주형 인코딩: sex 와 embarked 를 pd.get_dummies 로 원-핫 인코딩해 숫자 컬럼으로 바꾼다.",
        "파생 피처 생성: family_size = sibsp + parch + 1 컬럼과 is_alone(family_size==1) 컬럼을 새로 만든다.",
        "가공한 전체 피처로 다시 train_test_split → RandomForest fit → accuracy 를 출력해 '가공 후' 정확도(약 0.80 부근)를 확인한다.",
        "두 정확도를 print 로 나란히 출력하고, 가공 후 점수가 올랐음을 화면에서 눈으로 비교한다."
      ],
      "deliverable": "가공 전/후 정확도가 함께 출력되고 family_size·is_alone 등 파생 피처가 포함된 Colab 노트북(.ipynb)"
    }
  },
  "modeldev-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 모델 개발이란 무엇인가 · 문제 유형(회귀/분류) 파악하기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 데이터 분할의 원리 · 학습/검증/테스트가 따로 있는 이유"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 데이터 불러와 train/test로 나눠보기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 교차검증(Cross Validation) 개념과 직관"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 사이킷런 Pipeline으로 전처리+학습 한 번에 묶기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 평가지표 설계 · 베이스라인(기준 모델) 세우기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 베이스라인 모델 학습 후 교차검증 점수 측정"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 결과 정리 · 모델 비교표 만들고 회고"
      }
    ],
    "practice": {
      "title": "사이킷런 Pipeline으로 베이스라인 분류 모델 만들고 교차검증으로 평가하기",
      "steps": [
        "Colab(또는 Jupyter)에서 새 노트북을 열고 첫 셀에 `import pandas as pd, numpy as np`를 입력해 실행한다.",
        "`from sklearn.datasets import load_breast_cancer` 로 유방암 데이터를 불러와 `data = load_breast_cancer(as_frame=True)` 로 받고, `df = data.frame` 으로 표를 만든다.",
        "`df.shape` 와 `df['target'].value_counts()` 를 실행해 행/열 개수와 정답(0/1) 분포를 눈으로 확인한다.",
        "`from sklearn.model_selection import train_test_split` 후 `X = data.data`, `y = data.target` 으로 나누고, `train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)` 로 학습용/테스트용을 8:2로 분리한다.",
        "`from sklearn.pipeline import Pipeline`, `from sklearn.preprocessing import StandardScaler`, `from sklearn.linear_model import LogisticRegression` 를 import 한 뒤 `Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression(max_iter=1000))])` 로 전처리+모델을 하나로 묶는다.",
        "`from sklearn.model_selection import cross_val_score` 로 `scores = cross_val_score(pipe, X_train, y_train, cv=5, scoring='accuracy')` 를 실행하고 `scores.mean()` 을 출력한다 (기대 결과: 0.95 안팎의 평균 정확도가 찍힌다).",
        "`pipe.fit(X_train, y_train)` 로 전체 학습데이터에 모델을 학습시킨다.",
        "`from sklearn.metrics import accuracy_score` 로 `accuracy_score(y_test, pipe.predict(X_test))` 를 출력해 한 번도 보지 않은 테스트 점수를 확인한다.",
        "교차검증 평균 점수와 테스트 점수를 표(딕셔너리)로 정리해 `pd.DataFrame` 으로 출력하고, 두 점수가 비슷한지(과적합 여부) 비교한다.",
        "노트북을 `modeldev_day1_baseline.ipynb` 로 저장한다."
      ],
      "deliverable": "베이스라인 모델의 교차검증 평균 정확도와 테스트 정확도가 한 표로 정리된 노트북(.ipynb)"
    }
  },
  "modeldev-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 어제 베이스라인 복습 · 오늘은 '점수 올리기'가 목표"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 하이퍼파라미터란 무엇인가 · Grid vs Random vs Bayesian"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] GridSearchCV로 최적 파라미터 자동 탐색"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 과적합 제어 · 정규화와 조기종료의 직관"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] RandomizedSearchCV로 빠르게 탐색하고 베이스라인과 비교"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 앙상블 · 배깅/부스팅/스태킹으로 점수 합치기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 랜덤포레스트·부스팅 적용하고 성능 비교표 만들기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 모델 경량화·추론속도 측정 · 최종 결과 발표"
      }
    ],
    "practice": {
      "title": "GridSearchCV로 하이퍼파라미터를 튜닝해 베이스라인보다 좋은 모델 만들기",
      "steps": [
        "어제 쓰던 데이터를 다시 불러와 `train_test_split(... stratify=y, random_state=42)` 로 동일하게 학습/테스트를 나눈다(공정 비교를 위해 random_state를 같게 둔다).",
        "`from sklearn.ensemble import RandomForestClassifier` 와 `from sklearn.model_selection import GridSearchCV` 를 import 한다.",
        "탐색할 후보를 `param_grid = {'n_estimators': [100, 300], 'max_depth': [None, 5, 10]}` 처럼 딕셔너리로 만든다.",
        "`grid = GridSearchCV(RandomForestClassifier(random_state=42), param_grid, cv=5, scoring='accuracy', n_jobs=-1)` 로 탐색기를 만든다(n_jobs=-1은 CPU를 모두 써 빠르게 돌린다).",
        "`grid.fit(X_train, y_train)` 을 실행하고 다 끝나면 `grid.best_params_` 와 `grid.best_score_` 를 출력한다 (기대 결과: 가장 좋은 조합과 교차검증 점수가 찍힌다).",
        "`best = grid.best_estimator_` 로 최적 모델을 꺼내 `accuracy_score(y_test, best.predict(X_test))` 로 테스트 점수를 확인한다.",
        "어제의 베이스라인 테스트 점수와 오늘의 튜닝 후 점수를 `pd.DataFrame` 표로 나란히 출력해 개선 폭을 본다.",
        "`from sklearn.metrics import classification_report` 로 `print(classification_report(y_test, best.predict(X_test)))` 를 실행해 정밀도·재현율·F1까지 확인한다.",
        "`import time` 으로 예측에 걸리는 시간을 `start=time.time(); best.predict(X_test); print(time.time()-start)` 로 측정해 추론 속도를 기록한다.",
        "최적 파라미터·점수·추론시간을 정리해 `modeldev_day2_tuning.ipynb` 로 저장한다."
      ],
      "deliverable": "베이스라인 대비 튜닝 후 성능 개선이 한 표로 비교되고, 최적 하이퍼파라미터와 추론시간이 기록된 노트북(.ipynb)"
    }
  },
  "rag-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 RAG가 왜 필요한가: LLM의 한계와 검색 증강"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 RAG 전체 파이프라인 한눈에 보기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 문서 로딩과 텍스트 추출 따라하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 청킹(Chunking) 전략: 문서를 잘게 나누는 법"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 임베딩으로 문장을 벡터로 바꾸기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 벡터 인덱싱과 유사도 검색의 원리"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 첫 RAG 인덱싱 파이프라인 완성하기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 색인 점검 · 미니 검색 테스트 · 회고"
      }
    ],
    "practice": {
      "title": "PDF 문서로 나만의 검색 인덱스 만들기",
      "steps": [
        "터미널에서 `pip install langchain-community chromadb sentence-transformers pypdf` 로 필요한 라이브러리를 설치한다.",
        "작업 폴더에 `docs` 디렉터리를 만들고 분석할 PDF 파일(예: 사내 매뉴얼) 1개를 넣는다.",
        "PyPDFLoader 로 PDF를 불러와 `len(pages)` 를 출력해 페이지 수가 0보다 큰지 확인한다.",
        "RecursiveCharacterTextSplitter 를 chunk_size=500, chunk_overlap=50 으로 설정해 문서를 조각(chunk)으로 나눈다.",
        "나눈 조각 개수를 `len(chunks)` 로 출력하고, `chunks[0].page_content` 로 첫 조각 내용을 눈으로 확인한다.",
        "HuggingFaceEmbeddings(모델: all-MiniLM-L6-v2)로 임베딩 함수를 만든다.",
        "Chroma.from_documents 로 조각들을 벡터DB에 저장하고 `persist_directory='./db'` 로 디스크에 보관한다.",
        "`db.similarity_search('환불 정책', k=3)` 처럼 질문을 던져 관련 조각 3개가 출력되는지 확인한다(기대 결과: 질문과 관련된 문단이 콘솔에 나옴).",
        "결과 조각의 출처(metadata의 page)를 함께 출력해 어느 페이지에서 왔는지 표시한다."
      ],
      "deliverable": "PDF 1개를 인덱싱한 Chroma DB 폴더(./db)와, 임의 질문 3개에 대한 검색 결과 캡처를 담은 노트북(.ipynb)"
    }
  },
  "rag-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 어제 복습: 인덱스에서 검색까지 흐름 잡기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 Retriever와 top-k: 몇 개를 가져올 것인가"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 기본 Retriever로 관련 문서 가져오기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 키워드+벡터 하이브리드 검색의 원리"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 재순위(Re-ranking)로 검색 품질 끌어올리기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 검색 결과를 프롬프트에 끼워 넣기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 출처 인용까지 되는 QA 체인 완성"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 질문 10개로 답변 품질 검증 · 회고"
      }
    ],
    "practice": {
      "title": "출처를 인용하는 문서 질의응답(QA) 챗봇 만들기",
      "steps": [
        "1일차에 만든 `./db` 벡터DB를 Chroma(persist_directory='./db', embedding_function=embed) 로 다시 불러온다.",
        "`retriever = db.as_retriever(search_kwargs={'k': 4})` 로 검색기를 만들고, 테스트 질문 1개로 4개 조각이 오는지 확인한다.",
        "검색된 조각들의 page_content 를 줄바꿈으로 이어 붙여 `context` 문자열을 만든다.",
        "프롬프트 템플릿을 작성한다: '아래 context만 근거로 답하고, 없으면 모른다고 말하라' 는 지시와 {context}, {question} 자리를 넣는다.",
        "ChatOpenAI(또는 사내 LLM) 를 불러와 프롬프트에 context와 question을 채워 호출한다.",
        "LLM 답변과 함께, 사용된 조각의 출처(metadata page)를 '근거: p.3, p.7' 형태로 함께 출력한다.",
        "context에 없는 엉뚱한 질문(예: '내일 주가 알려줘')을 던져 '모른다'고 답하는지 확인한다(기대 결과: 지어내지 않고 모른다고 응답).",
        "전체 과정을 ask(question) 함수로 묶어, 질문만 넣으면 답변+출처가 나오도록 만든다."
      ],
      "deliverable": "질문을 입력하면 근거 출처와 함께 답하는 ask() 함수 코드와, 질문 10개에 대한 답변·출처를 정리한 노트북"
    }
  },
  "rag-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 좋은 RAG란 무엇인가: 평가의 필요성"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 RAGAS 핵심 지표: 충실도·관련성 이해"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] RAGAS로 내 RAG 점수 매겨보기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 청킹·임베딩·top-k 파라미터 튜닝 전략"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 파라미터 바꿔 점수 비교 실험"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 메타데이터 필터링과 멀티 문서 검색"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 비용·지연·캐싱 최적화로 실서비스 준비"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 개선 전후 비교 발표 · 과정 회고"
      }
    ],
    "practice": {
      "title": "RAGAS로 내 RAG를 평가하고 개선하기",
      "steps": [
        "`pip install ragas datasets` 로 평가 도구를 설치한다.",
        "테스트용 질문 5개와 각 질문의 모범답안(ground truth)을 직접 작성해 리스트로 준비한다.",
        "각 질문을 2일차 ask() 함수에 넣어 답변과 검색된 context(조각 리스트)를 함께 수집한다.",
        "question, answer, contexts, ground_truth 4개 컬럼을 가진 Dataset 객체를 만든다.",
        "ragas.evaluate 에 faithfulness(충실도)와 answer_relevancy(관련성) 지표를 지정해 실행한다.",
        "출력된 점수표를 확인한다(기대 결과: 각 지표가 0~1 사이 숫자로 나옴).",
        "점수가 낮은 질문을 골라 원인을 추정한다: 검색이 잘못됐는지(context에 답이 없음) vs 생성이 잘못됐는지(context엔 있는데 답이 틀림).",
        "원인에 맞춰 chunk_size 또는 top-k 를 한 가지 바꿔 다시 평가하고, 점수가 올랐는지 비교한다."
      ],
      "deliverable": "개선 전/후 RAGAS 점수표와, 어떤 파라미터를 왜 바꿨고 점수가 어떻게 변했는지 정리한 1페이지 개선 리포트"
    }
  },
  "langchain-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 오리엔테이션: 생성형 AI 서비스와 LangChain은 왜 필요한가"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 개발환경 셋업과 첫 LLM 호출 (실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 프롬프트 템플릿과 출력 파서 이해"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 LCEL 파이프 연산자로 체인 조립하기 (실습)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 모델·프롬프트·파서 3단 체인 직접 만들기 (실습)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 구조화 출력(JSON)과 출력 파서 실전 (실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 메인 실습: 한 줄 요약+키워드 추출 체인 완성 (실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 코드 리뷰·트러블슈팅·Q&A"
      }
    ],
    "practice": {
      "title": "LCEL로 '제품 리뷰 → 한 줄 요약 + 감정 + 키워드' 분석 체인 만들기",
      "steps": [
        "터미널에서 `python -m venv venv` 실행 후 `source venv/bin/activate`(윈도우는 venv\\Scripts\\activate)로 가상환경을 켠다.",
        "`pip install langchain langchain-openai python-dotenv` 로 필요한 패키지를 설치한다.",
        "프로젝트 폴더에 `.env` 파일을 만들고 `OPENAI_API_KEY=sk-...` 한 줄을 적어 저장한다(키는 발급받은 값).",
        "`day1.py` 파일을 만들고 맨 위에 `from dotenv import load_dotenv` 와 `load_dotenv()` 를 적어 키를 불러온다.",
        "`ChatPromptTemplate.from_template(...)` 로 '아래 리뷰를 분석해줘' 형식의 프롬프트를 만들고, 출력 형식을 JSON으로 지정한다.",
        "`prompt | model | JsonOutputParser()` 처럼 파이프(|)로 세 조각을 이어 체인을 만든다.",
        "`chain.invoke({\"review\": \"배송도 빠르고 품질도 좋아요\"})` 를 호출해 결과를 받는다.",
        "터미널에 `{'summary': '...', 'sentiment': '긍정', 'keywords': [...]}` 형태의 딕셔너리가 출력되는지 화면으로 확인한다.",
        "리뷰 문장을 부정 문장으로 바꿔 다시 실행해 감정이 '부정'으로 바뀌는지 비교한다."
      ],
      "deliverable": "리뷰 문장을 입력하면 요약·감정·키워드 JSON을 돌려주는 day1.py 파일과 실행 결과 캡처"
    }
  },
  "langchain-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 어제 복습과 오늘 목표: 기억하고 검색하는 챗봇"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 대화 메모리(Memory) 개념과 적용 (실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 도구(Tool)와 외부 기능 연결 이해 (실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 문서를 잘게 쪼개고 임베딩·벡터DB에 넣기 (실습)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 Retriever로 관련 문서 찾아오기 (실습)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 검색 결과를 프롬프트에 합치는 RAG 체인 (실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 메인 실습: 내 문서로 답하는 QA 챗봇 완성 (실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 결과 공유·디버깅·Q&A"
      }
    ],
    "practice": {
      "title": "내 PDF/텍스트 문서로 답하는 '문서 QA 챗봇' 만들기",
      "steps": [
        "`pip install langchain-community faiss-cpu` 로 문서 처리와 벡터 검색용 패키지를 추가 설치한다.",
        "질문에 쓸 자료(예: 회사 소개 텍스트)를 `data.txt` 파일로 저장한다.",
        "`TextLoader('data.txt').load()` 로 문서를 불러온다.",
        "`RecursiveCharacterTextSplitter(chunk_size=300)` 로 문서를 300자 단위 조각으로 자른다.",
        "`OpenAIEmbeddings()` 와 `FAISS.from_documents(...)` 로 조각들을 숫자 벡터로 바꿔 벡터DB에 저장한다.",
        "`db.as_retriever()` 로 질문과 비슷한 조각을 찾아오는 검색기를 만든다.",
        "검색된 조각(context)과 질문(question)을 함께 넣는 프롬프트를 만들고 `retriever | prompt | model | parser` 형태로 RAG 체인을 구성한다.",
        "`chain.invoke('환불 정책이 뭐야?')` 를 호출해 문서에 근거한 답이 나오는지 화면으로 확인한다.",
        "문서에 없는 내용을 질문해 '문서에 정보가 없다'고 답하는지 비교 확인한다."
      ],
      "deliverable": "data.txt를 근거로 질문에 답하는 qa_bot.py와, 정상 질문/없는 정보 질문 2가지 실행 결과 캡처"
    }
  },
  "langchain-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 복습과 오늘 목표: 멈춰 보이지 않게, 그리고 배포까지"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 스트리밍 응답과 콜백 이해 (실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 LangSmith로 체인 안을 들여다보기(관측) (실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 비용·캐싱·에러 처리 전략 (실습)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 FastAPI로 체인을 API로 감싸기 (실습)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 간단 웹 UI 붙이기와 스트리밍 연결 (실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 메인 실습: 미니 생성형 AI 서비스 배포 (실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 발표·회고·전체 과정 마무리 Q&A"
      }
    ],
    "practice": {
      "title": "스트리밍·캐싱·에러처리를 갖춘 '미니 생성형 AI 챗 API' 만들고 띄우기",
      "steps": [
        "`pip install fastapi uvicorn` 로 웹 서버 패키지를 설치한다.",
        "어제 만든 체인을 가져오는 `service.py` 파일을 만든다.",
        "`set_llm_cache(InMemoryCache())` 한 줄을 추가해 같은 질문은 캐시로 빠르게 답하게 한다.",
        "`@app.get('/chat')` 엔드포인트를 만들고 안에서 `chain.invoke(q)` 를 호출해 답을 반환한다.",
        "try/except로 감싸 오류가 나도 서버가 죽지 않고 에러 메시지를 돌려주게 한다.",
        "스트리밍용 `/stream` 엔드포인트를 추가해 `chain.stream(q)` 결과를 조각조각 흘려보낸다.",
        "터미널에서 `uvicorn service:app --reload` 로 서버를 켠다.",
        "브라우저에서 `http://127.0.0.1:8000/chat?q=안녕` 에 접속해 답이 화면에 뜨는지 확인한다.",
        "같은 질문을 두 번 보내 두 번째가 캐시로 더 빠른지(응답 시간) 비교한다.",
        "`/docs` 자동 문서 페이지에 접속해 API가 등록된 것을 확인한다."
      ],
      "deliverable": "스트리밍·캐싱·에러처리가 적용된 service.py와, /chat 정상 응답 및 /docs 화면 캡처"
    }
  },
  "serving-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 — 모델 서빙이란? 학습과 서빙의 차이 이해하기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 — 서빙 패턴 비교: 온라인 vs 배치 vs 스트림"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 저장된 모델 불러와 predict 해보기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] FastAPI로 첫 추론 API 띄우기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 입력 검증·전처리·후처리 붙이기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] BentoML로 모델 패키징하기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 모델 버전 관리와 헬스체크 엔드포인트"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 추론 REST API 완성 + 정리/회고"
      }
    ],
    "practice": {
      "title": "학습된 모델을 FastAPI 추론 REST API로 서빙하기",
      "steps": [
        "터미널에서 'python -m venv venv' 후 'source venv/bin/activate'로 가상환경을 켜고, 'pip install fastapi uvicorn scikit-learn joblib' 로 필요한 패키지를 설치한다.",
        "train.py 를 만들어 scikit-learn의 붓꽃(iris) 데이터로 간단한 분류 모델을 학습하고 'joblib.dump(model, \"model.joblib\")' 로 파일에 저장한다.",
        "'python train.py' 를 실행해 같은 폴더에 model.joblib 파일이 생겼는지 'ls' 로 확인한다(파일이 보이면 성공).",
        "app.py 를 만들어 FastAPI 앱을 선언하고, 시작 시 joblib.load 로 model.joblib 을 메모리에 한 번만 올린다.",
        "Pydantic의 BaseModel 로 입력 스키마(꽃잎·꽃받침 길이 4개 숫자)를 정의해 잘못된 입력을 자동으로 걸러지게 한다.",
        "'/predict' POST 엔드포인트를 만들어 입력을 model.predict 에 넣고 예측 클래스 이름을 JSON으로 반환하도록 작성한다.",
        "'/health' GET 엔드포인트를 추가해 서버가 살아있으면 {\"status\":\"ok\"} 를 돌려주게 한다(모니터링 장비가 확인하는 용도).",
        "'uvicorn app:app --reload' 로 서버를 띄우고 브라우저에서 http://127.0.0.1:8000/docs 의 자동 문서가 뜨는지 확인한다.",
        "/docs 화면의 'Try it out'에서 예시 숫자를 넣고 Execute 를 눌러 응답에 {\"prediction\":\"setosa\"} 같은 결과가 200 OK 로 오는지 확인한다(이 출력이 보이면 서빙 성공).",
        "curl 명령으로도 같은 요청을 보내 동일한 결과가 오는지 교차 확인하고, README에 실행 방법을 한 줄 적는다."
      ],
      "deliverable": "model.joblib + app.py로 동작하는 /predict·/health 추론 API와 실행 방법 README"
    }
  },
  "serving-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 — 내 서버를 어디서나 똑같이: 컨테이너 개념"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] 추론 API용 Dockerfile 작성하기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 이미지 빌드하고 컨테이너로 실행하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 — 트래픽이 몰릴 때: 오토스케일링 개념"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 관측성 3종(메트릭·로그·트레이스) 붙이기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] Prometheus로 추론 지표 수집하기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 데이터·모델 드리프트 감지 맛보기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 컨테이너 서빙 + 모니터링 통합 + 회고"
      }
    ],
    "practice": {
      "title": "추론 API를 Docker로 컨테이너화하고 메트릭 모니터링 붙이기",
      "steps": [
        "1일차 app.py가 있는 폴더에서 'pip freeze > requirements.txt' 로 의존성 목록 파일을 만든다.",
        "같은 폴더에 Dockerfile을 만들고 베이스 이미지(python:3.11-slim), 작업폴더, 의존성 설치, 앱 복사, 실행 명령을 차례로 적는다.",
        "'docker build -t iris-serving:1.0 .' 로 이미지를 빌드하고, 'docker images' 로 iris-serving 이미지가 목록에 보이는지 확인한다.",
        "'docker run -p 8000:8000 iris-serving:1.0' 로 컨테이너를 띄우고 호스트의 8000 포트가 컨테이너로 연결되게 한다.",
        "브라우저에서 http://127.0.0.1:8000/docs 가 컨테이너 안에서 동작하는지 확인한다(내 PC에 파이썬이 없어도 떠야 정상).",
        "prometheus-fastapi-instrumentator 를 requirements에 추가하고 app.py에 두 줄로 /metrics 엔드포인트를 노출한다.",
        "이미지를 다시 빌드·실행한 뒤 http://127.0.0.1:8000/metrics 에 요청 수·지연시간 지표가 텍스트로 나오는지 확인한다.",
        "docker-compose.yml로 추론 API와 Prometheus 컨테이너를 함께 띄우고, Prometheus가 /metrics를 15초마다 수집하도록 설정한다.",
        "'docker compose up' 후 Prometheus UI(9090 포트)에서 'http_requests_total' 을 조회해 그래프에 값이 쌓이는지 확인한다(값이 보이면 모니터링 성공).",
        "/predict를 여러 번 호출한 뒤 Prometheus에서 요청 수가 증가하는 것을 보고 캡처해 둔다."
      ],
      "deliverable": "Dockerfile + docker-compose.yml로 동작하는 컨테이너 서빙과 Prometheus 메트릭 수집 화면 캡처"
    }
  },
  "serving-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 — MLOps란? 학습부터 배포까지 자동화하는 이유"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] MLflow로 실험 기록·비교하기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 모델 레지스트리에 모델 등록·승격하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 — CI/CD 개념: 코드 올리면 자동 배포"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] GitHub Actions로 빌드·테스트 자동화"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 컨테이너 빌드·배포까지 파이프라인 잇기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 — AIOps: 이상탐지와 자동 대응"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 학습→배포 미니 파이프라인 완성 + 종합 회고"
      }
    ],
    "practice": {
      "title": "MLflow 실험 추적 + GitHub Actions로 학습→배포 자동화 파이프라인 구성",
      "steps": [
        "'pip install mlflow scikit-learn' 후 train.py에 mlflow.start_run 블록을 넣어 파라미터·정확도·모델을 기록하도록 수정한다.",
        "'python train.py' 를 두 번(파라미터를 바꿔) 실행하고, 'mlflow ui' 를 띄워 http://127.0.0.1:5000 에서 두 실험이 표로 비교되는지 확인한다.",
        "MLflow UI에서 정확도가 더 높은 실험을 골라 'Register Model' 로 모델 레지스트리에 iris_model 이름으로 등록한다.",
        "등록한 모델을 Staging→Production 단계로 승격(promote)해 어떤 버전이 운영용인지 명확히 한다.",
        "프로젝트를 GitHub 저장소로 만들고 'git init → add → commit → push' 로 코드를 올린다.",
        "'.github/workflows/ci.yml' 을 만들어 push 시 의존성 설치 → 테스트 실행 → Docker 이미지 빌드가 자동 수행되게 작성한다.",
        "간단한 test_app.py(예: /health 가 ok 를 반환하는지)를 만들어 파이프라인이 테스트를 실제로 돌리게 한다.",
        "코드를 push 한 뒤 GitHub 저장소의 Actions 탭에서 워크플로가 자동 실행되고 모든 단계가 초록 체크로 통과하는지 확인한다(초록 체크면 성공).",
        "일부러 테스트가 실패하도록 코드를 고쳐 push 하고, Actions가 빨간 X로 배포를 막는지 확인해 안전망을 체감한다.",
        "전체 흐름(데이터→학습→실험기록→모델등록→CI/CD→배포)을 한 장 다이어그램으로 그려 README에 첨부한다."
      ],
      "deliverable": "MLflow 실험 기록·등록 모델 + GitHub Actions가 통과한 CI/CD 워크플로와 전체 파이프라인 다이어그램"
    }
  },
  "agent-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 AI 에이전트란 무엇인가 (챗봇과의 차이)"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 ReAct 패턴: 생각하고 행동하기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] LangGraph 설치와 첫 그래프 그리기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 State·Node·Edge 개념 완전 정복"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] LLM 노드로 응답 만들기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 도구(Tool) 정의와 호출 연결"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 조건부 분기로 도구 쓰는 에이전트"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 단일 에이전트 완성 + 실행 결과 확인"
      }
    ],
    "practice": {
      "title": "검색 도구를 쓰는 단일 ReAct 에이전트 만들기",
      "steps": [
        "터미널에서 `pip install langgraph langchain-openai` 를 실행해 라이브러리를 설치한다",
        "`export OPENAI_API_KEY=발급받은키` 로 API 키를 환경변수에 등록한다 (윈도우는 set 사용)",
        "agent.py 파일을 만들고 TypedDict 로 messages 필드를 가진 State 클래스를 정의한다",
        "@tool 데코레이터로 `get_weather(city)` 라는 간단한 도구 함수를 만들고, 도시 이름을 받아 가짜 날씨 문자열을 돌려주게 한다",
        "ChatOpenAI 모델에 `.bind_tools([get_weather])` 를 붙여 모델이 도구를 부를 수 있게 연결한다",
        "StateGraph 에 'agent'(LLM 호출) 노드와 ToolNode 를 add_node 로 추가한다",
        "add_conditional_edges 로 'LLM이 도구를 부르면 tools 노드로, 아니면 끝(END)' 분기를 건다",
        "graph.compile() 로 실행 가능한 앱을 만들고 `app.invoke({'messages':[('user','서울 날씨 알려줘')]})` 로 호출한다",
        "출력 메시지를 print 해서 '도구 호출 → 날씨 결과 → 최종 답변' 흐름이 화면에 찍히는지 확인한다",
        "질문을 '안녕'으로 바꿔 실행하고, 이번엔 도구를 부르지 않고 바로 답하는지 비교한다"
      ],
      "deliverable": "날씨 도구를 호출해 사용자 질문에 답하는 agent.py 와 실행 로그 캡처"
    }
  },
  "agent-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 어제 복습: 단일 에이전트 흐름 되짚기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 멀티 에이전트가 필요한 순간 (역할 분담)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] Supervisor가 일을 나눠주는 구조 만들기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 서브그래프와 메모리로 대화 기억하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 체크포인터로 이어지는 대화 구현"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 Human-in-the-loop: 사람이 끼어드는 승인 흐름"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 위험한 행동 전 사람 승인 받기(interrupt)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 멀티 에이전트 워크플로 완성 + 에러 복구"
      }
    ],
    "practice": {
      "title": "Supervisor가 연구원·작성자에게 일을 분배하는 멀티 에이전트",
      "steps": [
        "어제 환경을 그대로 쓰되 `pip install langgraph` 가 최신인지 `pip install -U langgraph` 로 갱신한다",
        "multi_agent.py 를 만들고 messages 와 next(다음 담당자) 필드를 가진 State 를 정의한다",
        "researcher 노드(자료를 모으는 역할)와 writer 노드(글로 정리하는 역할) 함수를 각각 만든다",
        "supervisor 노드를 만들어, LLM에게 '다음에 researcher / writer / FINISH 중 누구에게 보낼지' 한 단어로 답하게 시킨다",
        "supervisor 의 응답을 보고 분기하도록 add_conditional_edges 로 researcher·writer·END 경로를 연결한다",
        "researcher 와 writer 가 일을 마치면 다시 supervisor 로 돌아오게 add_edge 로 연결한다",
        "MemorySaver 체크포인터를 compile(checkpointer=...) 에 넣어 대화를 기억하게 한다",
        "`config={'configurable':{'thread_id':'1'}}` 를 주고 '인공지능 역사 짧게 정리해줘'로 invoke 한다",
        "출력에서 supervisor→researcher→supervisor→writer→FINISH 순으로 일이 넘어갔는지 메시지 로그로 확인한다",
        "같은 thread_id로 '방금 내용 더 짧게'를 다시 보내, 이전 대화를 기억하고 이어가는지 확인한다"
      ],
      "deliverable": "Supervisor 분배 + 메모리가 동작하는 multi_agent.py 와 두 번 이어진 대화 로그"
    }
  },
  "vectordb-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 OT · 벡터(임베딩)란 무엇인가: 의미를 숫자로 바꾸기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 벡터 유사도 직관: 코사인 유사도와 내적 손으로 계산하기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] OpenAI/HuggingFace 임베딩 만들고 비교하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 인덱싱 알고리즘 이해: 완전탐색 vs HNSW · IVF"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] FAISS로 첫 벡터 검색 엔진 만들기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] Chroma로 영구 저장형 Vector DB 구축"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 메타데이터 필터링 + 하이브리드 검색"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [미니 실습·정리] 문서 임베딩→검색 엔드투엔드 완성 · Q&A"
      }
    ],
    "practice": {
      "title": "내 문서를 검색하는 Vector DB 만들기 (FAISS + 임베딩 엔드투엔드)",
      "steps": [
        "터미널에서 `pip install sentence-transformers faiss-cpu numpy` 를 실행해 필요한 라이브러리를 설치한다 (설치 완료 메시지 확인).",
        "새 파일 `vector_search.py` 를 만들고, 검색 대상이 될 문장 5~6개를 파이썬 리스트 `docs` 에 직접 적는다 (예: 카페, 날씨, 프로그래밍 관련 문장 섞어서).",
        "`from sentence_transformers import SentenceTransformer` 로 모델을 불러오고 `model = SentenceTransformer('all-MiniLM-L6-v2')` 로 임베딩 모델을 준비한다.",
        "`embeddings = model.encode(docs)` 를 실행하고 `print(embeddings.shape)` 로 출력해 (문장 수, 384) 형태의 숫자 배열이 나오는지 확인한다.",
        "`import faiss` 후 `index = faiss.IndexFlatIP(384)` 로 인덱스를 만들고, `faiss.normalize_L2(embeddings)` 로 정규화한 뒤 `index.add(embeddings)` 로 문서 벡터를 색인에 넣는다.",
        "질문 문장 `query = '커피 마시기 좋은 곳'` 을 같은 모델로 `model.encode([query])` 해서 벡터로 바꾸고 정규화한다.",
        "`scores, ids = index.search(query_vec, 3)` 로 가장 비슷한 문서 3개의 점수와 위치를 받아온다.",
        "`for i in ids[0]: print(docs[i])` 로 결과를 출력하고, 질문과 의미가 가까운 문장이 위에 나오는지 화면에서 직접 확인한다 (기대 결과: 카페 관련 문장이 1순위).",
        "질문을 `'파이썬 코딩 공부'` 로 바꿔 다시 실행하고, 이번엔 프로그래밍 문장이 1순위로 바뀌는지 비교한다.",
        "전체 코드를 저장하고 `python vector_search.py` 로 처음부터 끝까지 한 번에 동작하는지 최종 확인한다."
      ],
      "deliverable": "질문을 입력하면 의미가 가까운 문서 Top-3 를 점수와 함께 출력하는 vector_search.py 와, 두 가지 질문에 대한 검색 결과 캡처"
    }
  },
  "capstone-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 캡스톤 오리엔테이션과 문제 정의: 무엇을 풀 것인가"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 사용자 시나리오와 요구사항 정의 워크숍"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 페르소나·유저스토리·성공기준 작성"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 에이전트+RAG+도구 아키텍처 패턴 이해"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 데이터·모델·인터페이스 계획 세우기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 아키텍처 다이어그램과 데이터 플로우 그리기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 개발환경 셋업과 LLM/RAG 골격 코드 검증"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 팀 계획서 작성과 1일차 발표·피드백"
      }
    ],
    "practice": {
      "title": "캡스톤 기획서와 동작하는 아키텍처 골격 만들기",
      "steps": [
        "팀별로 '누구의 어떤 문제를 풀지' 한 문장으로 적고, 화이트보드(또는 노션 문서)에 페르소나 1명과 핵심 유저스토리 3개를 적는다",
        "성공 기준을 측정 가능한 형태로 적는다(예: '질문 10개 중 8개를 출처와 함께 정확히 답한다')",
        "아키텍처를 사각형과 화살표로 그린다: 사용자 → 에이전트(두뇌) → 도구(검색·계산·API) / RAG(문서 지식) → 답변",
        "터미널에서 'python -m venv venv' 후 'source venv/bin/activate'로 가상환경을 만들고 활성화한다",
        "'pip install langchain langchain-openai langgraph chromadb python-dotenv'로 라이브러리를 설치한다",
        "프로젝트 폴더에 .env 파일을 만들고 'OPENAI_API_KEY=발급받은키' 한 줄을 저장한다",
        "아래 realCode의 골격 코드를 main.py로 저장하고 'python main.py'를 실행해 '안녕하세요'에 LLM이 답하는지 확인한다",
        "화면에 모델 응답 텍스트가 한 줄 출력되면 성공이다(에러가 나면 키와 설치를 다시 점검)",
        "기획서(문제·페르소나·성공기준·아키텍처 그림)를 노션 한 페이지로 정리하고 팀 깃허브 저장소 README에 링크한다",
        "1일차 산출물을 5분 발표하고 강사·동료 피드백을 메모로 남긴다"
      ],
      "deliverable": "기획서(문제정의·페르소나·성공기준·아키텍처 다이어그램) 1페이지 + 'python main.py'로 LLM 응답이 출력되는 골격 코드 저장소"
    }
  },
  "capstone-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 어제 설계 복습과 오늘 구현 목표 쪼개기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 RAG 만들기 1: 문서 적재와 청킹·임베딩"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 내 문서로 벡터 DB 인덱싱하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 도구(Tool) 정의와 에이전트 ReAct 패턴"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 검색 도구를 가진 LangGraph 에이전트 만들기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 프론트/백 통합: 간단한 질의응답 UI 붙이기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 에이전트+RAG 엔드투엔드 연결과 테스트"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 중간 점검·버그 수정·피드백 반영"
      }
    ],
    "practice": {
      "title": "내 문서로 답하는 에이전트(RAG+도구) 완성하기",
      "steps": [
        "팀 주제와 관련된 텍스트 문서(회사 규정, 제품 설명 등) docs.txt를 프로젝트 폴더에 준비한다",
        "'pip install langchain-chroma langgraph'로 벡터 DB와 그래프 라이브러리를 설치한다",
        "아래 realCode의 RAG 인덱싱 코드를 실행해 문서를 잘게 쪼개고 임베딩해 Chroma에 저장한다",
        "검색 함수에 '환불 규정 알려줘' 같은 질문을 넣어 관련 문장 조각이 출력되는지 확인한다",
        "@tool로 search_docs 검색 도구를 정의하고, create_react_agent로 도구를 쓰는 에이전트를 만든다",
        "에이전트에 질문을 던지고, 콘솔에 '도구 호출 → 검색 결과 → 최종 답변' 흐름이 찍히는지 본다",
        "최종 답변이 문서 근거를 반영하면 성공이다(엉뚱하면 청킹 크기나 top_k를 조정)",
        "간단한 입력창(터미널 input 또는 Streamlit)을 붙여 사람이 질문을 타이핑하면 답이 나오게 한다",
        "팀원이 준비한 테스트 질문 5개를 넣어 정답률을 표로 기록한다",
        "버그와 미흡한 점을 이슈로 적고 우선순위를 정해 수정한다"
      ],
      "deliverable": "내 문서를 근거로 답하는 에이전트 실행 코드 + 테스트 질문 5개의 응답·정답 여부 기록표"
    }
  },
  "capstone-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 통합 점검: 전체 흐름 다시 돌려보기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 에러 처리·재시도 등 안정화 기법"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 예외 처리와 출처 표시 추가하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 성능·한계 점검과 개선 우선순위 정하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 데모 환경 정리와 발표 자료 만들기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 리허설과 시연 시나리오 점검"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 팀별 결과 발표와 상호 피드백"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 회고: 잘된 점·아쉬운 점·다음 단계 정리"
      }
    ],
    "practice": {
      "title": "안정화·시연·발표까지 캡스톤 마무리",
      "steps": [
        "어제 만든 에이전트를 처음부터 끝까지 한 번 실행해 깨지는 부분이 없는지 확인한다",
        "검색 결과가 없을 때 '관련 문서를 찾지 못했습니다'라고 답하도록 예외 처리를 추가한다",
        "답변 끝에 사용한 문서 출처(파일명·조각 일부)를 함께 보여주도록 코드를 수정한다",
        "아래 realCode처럼 try/except와 출처 표시를 적용하고 다시 테스트한다",
        "테스트 질문 10개로 정답률을 측정하고 1일차 성공 기준과 비교한다",
        "데모 시나리오(어떤 질문을 어떤 순서로 보여줄지)를 3~4개로 정리한다",
        "발표 슬라이드를 5장으로 만든다: 문제→아키텍처→데모→성과(정답률)→한계와 다음 단계",
        "팀에서 한 번 리허설하며 시간을 재고 막히는 부분을 고친다",
        "실제 발표에서 라이브 데모로 질문을 입력해 답이 나오는 장면을 보여준다",
        "회고 템플릿에 잘된 점·아쉬운 점·다음에 할 일을 각각 2개씩 적어 제출한다"
      ],
      "deliverable": "안정화된 최종 코드 + 정답률 측정표 + 발표 슬라이드 5장 + 팀 회고 문서"
    }
  },
  "miniproject-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 오리엔테이션: 미니 프로젝트 목표와 평가 기준"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 주제 브레인스토밍과 사용자 시나리오 작성"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 요구사항 정의서·기능 명세 작성하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 서비스 아키텍처와 데이터 플로우 설계"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 아키텍처 다이어그램 그리기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 기술 스택 선정(LLM·RAG·Agent·UI)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 프로젝트 폴더·가상환경·깃 저장소 세팅"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 작업 분담·일정 수립과 1일차 회고"
      }
    ],
    "practice": {
      "title": "AI 서비스 기획서와 프로젝트 뼈대 만들기",
      "steps": [
        "팀이 만들 AI 서비스 주제를 한 문장으로 정한다 (예: '사내 규정 문서를 검색해 답해주는 챗봇')",
        "터미널에서 'mkdir ai-mini && cd ai-mini' 로 프로젝트 폴더를 만든다",
        "'python -m venv venv' 후 'source venv/bin/activate'(윈도우는 venv\\Scripts\\activate)로 가상환경을 켠다",
        "'pip install langchain langchain-openai chromadb streamlit python-dotenv' 로 필수 패키지를 설치한다",
        "프로젝트 루트에 '.env' 파일을 만들고 'OPENAI_API_KEY=sk-...' 한 줄을 적는다",
        "메모장으로 'plan.md' 를 만들어 목표·사용자·핵심기능 3가지·데이터 출처를 적는다",
        "'git init && git add . && git commit -m \"init: 프로젝트 기획\"' 로 첫 커밋을 남긴다",
        "'python -c \"import langchain, chromadb, streamlit; print(\\\"ok\\\")\"' 를 실행해 화면에 'ok' 가 찍히는지 확인한다 (기대 결과: 에러 없이 ok 출력)"
      ],
      "deliverable": "기획서(plan.md)와 가상환경·패키지가 준비된 깃 저장소 1개"
    }
  },
  "miniproject-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 어제 설계 리뷰와 오늘 구현 목표 확정"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 문서 적재·청킹·임베딩 인덱싱"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 내 문서로 Vector DB 만들기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 RAG 검색·응답 체인 구현"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 질문하면 문서 근거로 답하는 챗봇"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 Agent로 도구(검색·계산) 붙이기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] Streamlit 화면에 챗봇 연결"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 예외 처리·안정화와 중간 시연"
      }
    ],
    "practice": {
      "title": "문서 기반 RAG 챗봇을 화면까지 연결하기",
      "steps": [
        "data 폴더에 답변 근거가 될 텍스트 파일(예: faq.txt)을 1개 이상 넣는다",
        "'ingest.py' 를 만들어 문서를 읽고 작은 조각(청크)으로 나눈 뒤 임베딩해 chroma_db 에 저장하는 코드를 작성한다",
        "'python ingest.py' 를 실행하면 'N개 청크 저장 완료' 가 출력되는지 확인한다",
        "'rag.py' 를 만들어 질문을 받으면 chroma_db 에서 관련 청크를 찾아 LLM에게 같이 주는 함수를 작성한다",
        "터미널에서 'python rag.py' 로 샘플 질문을 넣어 문서 내용 기반 답이 나오는지 본다",
        "'app.py' 에 Streamlit 입력창과 답변 영역을 만들고 rag 함수를 연결한다",
        "'streamlit run app.py' 를 실행하면 브라우저에 챗봇 화면이 뜬다 (기대 결과: 질문 입력 후 문서 근거 답변 표시)",
        "엉뚱한 질문(자료에 없는 내용)을 넣어 '자료에서 찾지 못했다'고 답하도록 예외 메시지를 확인한다",
        "잘 동작하면 'git commit -m \"feat: RAG 챗봇 구현\"' 으로 저장한다"
      ],
      "deliverable": "브라우저에서 동작하는 문서 기반 RAG 챗봇 (ingest.py·rag.py·app.py)"
    }
  },
  "miniproject-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 어제 구현 점검과 오늘 배포 목표"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 기능 테스트와 버그 수정 방법"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 시나리오별 테스트·버그 잡기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 requirements·secrets 등 배포 준비"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] Streamlit 클라우드에 배포하기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 발표 자료·시연 시나리오 만들기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 리허설과 최종 점검"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 팀별 발표·상호 피드백·회고"
      }
    ],
    "practice": {
      "title": "테스트·배포 후 발표까지 마무리하기",
      "steps": [
        "테스트할 질문 목록(정상·예외·애매한 질문) 5개를 표로 만든다",
        "각 질문을 챗봇에 넣어 답변이 기대와 맞는지 표에 OK/수정 으로 기록한다",
        "'수정' 항목의 원인을 찾아 코드를 고치고 다시 테스트한다",
        "'pip freeze > requirements.txt' 로 배포에 필요한 패키지 목록을 최신화한다",
        "코드를 GitHub 새 저장소에 'git push' 한다 (.env 는 올리지 않는다)",
        "share.streamlit.io 에 로그인해 저장소를 연결하고 Secrets 에 OPENAI_API_KEY 를 등록한다",
        "Deploy 버튼을 눌러 잠시 기다리면 공개 URL이 생긴다 (기대 결과: 브라우저에서 누구나 접속해 챗봇 사용)",
        "공개 URL을 휴대폰으로 열어 외부에서도 동작하는지 확인한다",
        "발표용 슬라이드에 문제정의·아키텍처·시연·한계·개선점을 5장으로 정리한다"
      ],
      "deliverable": "공개 URL로 접속 가능한 배포된 AI 서비스 + 발표 슬라이드 5장"
    }
  }
}

export const planFor = (subjectId, day) => plans[`${subjectId}-${day}`] || null
