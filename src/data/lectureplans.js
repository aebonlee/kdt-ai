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
      "title": "팀 저장소 만들고 브랜치로 협업해서 충돌까지 해결하기",
      "steps": [
        "터미널을 열고 `git --version` 을 입력해 Git 이 설치돼 있는지 확인한다. (예: git version 2.43.0 처럼 버전이 보이면 성공)",
        "`git config --global user.name \"홍길동\"` 와 `git config --global user.email \"me@example.com\"` 으로 커밋에 찍힐 내 이름과 이메일을 등록한다.",
        "작업할 폴더를 만들고 그 안에서 `git init` 을 실행해 빈 저장소를 만든다. (.git 폴더가 생기고 `git status` 가 동작하면 성공)",
        "`README.md` 파일을 만들어 팀 이름을 한 줄 적고, `git add README.md` → `git commit -m \"docs: 팀 소개 추가\"` 로 첫 커밋을 만든다.",
        "GitHub 에서 팀 저장소(Repository)를 하나 새로 만들고, `git remote add origin <저장소주소>` → `git branch -M main` → `git push -u origin main` 으로 내 컴퓨터의 커밋을 인터넷(GitHub)으로 올린다.",
        "팀원 각자 `git switch -c feature/내이름` 으로 본인 작업용 브랜치(가지)를 만들고, 같은 파일의 같은 줄을 일부러 서로 다르게 고친 뒤 각자 커밋한다.",
        "한 사람의 브랜치를 main 에 먼저 머지(합치기)하고, 다른 사람이 main 을 자기 브랜치로 `git merge main` 하면 충돌(conflict) 메시지가 나오는 것을 확인한다.",
        "충돌난 파일을 열어 `<<<<<<<`, `=======`, `>>>>>>>` 표시 구간을 보고 최종 내용을 직접 정리한 뒤 표시줄을 지우고, `git add` → `git commit` 으로 충돌을 마무리한다.",
        "GitHub 에서 Pull Request(PR)를 열고 팀원에게 코드리뷰(승인)를 받은 뒤 Merge 버튼으로 합친다.",
        "마지막으로 `git pull` 을 실행해 합쳐진 최신 main 을 모두의 컴퓨터로 내려받고, `git log --oneline --graph` 로 합쳐진 역사가 한눈에 보이는지 확인한다."
      ],
      "deliverable": "팀원 모두의 커밋과 최소 1건의 머지된 Pull Request 가 남아 있는 GitHub 팀 저장소 링크, 그리고 `git log --oneline --graph` 결과 캡처"
    }
  },
  "transformer-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 OT·언어모델이란? 다음 단어 맞히기 게임"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 토큰화(BPE)와 임베딩 직접 돌려보기 [실습]"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 RNN·LSTM의 한계 체험: 왜 순서대로만 읽으면 느릴까"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 Attention의 직관: '어디에 집중할까' 손계산 [실습]"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 Self-Attention과 Query·Key·Value 이해"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 Scaled Dot-Product Attention 코드로 구현 [실습]"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 메인 실습: Attention 가중치 계산·히트맵 시각화 [실습]"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 결과 해석·발표·정리 Q&A"
      }
    ],
    "practice": {
      "title": "문장 하나로 Attention 가중치 계산하고 히트맵으로 시각화하기",
      "steps": [
        "Google Colab(colab.research.google.com)에 접속해 '새 노트'를 만들고, 첫 셀에 '!pip install torch matplotlib' 를 입력해 실행(▶ 버튼)한다.",
        "두 번째 셀에 'import torch' 와 'import matplotlib.pyplot as plt' 를 적어 도구를 불러온다.",
        "예시 문장 'I love cats' 의 단어 3개를 각각 4차원 숫자 벡터로 직접 만들어 torch.tensor 로 X 라는 변수에 담는다(모양: 3x4).",
        "Q, K, V 를 만들기 위한 가중치 행렬 Wq, Wk, Wv 를 torch.randn(4,4) 로 무작위 생성하고, X 와 곱해 Q=X@Wq, K=X@Wk, V=X@Wv 를 계산한다.",
        "점수(score) = Q @ K.transpose(0,1) 를 계산하고, 차원 크기 4의 제곱근으로 나눠 scaled score 를 만든다.",
        "torch.softmax(scaled, dim=-1) 로 Attention 가중치(합이 1인 확률)를 구해 attn 변수에 담고 print 로 출력해 값이 0~1 사이인지 확인한다.",
        "plt.imshow(attn.detach().numpy()) 와 plt.colorbar() 로 히트맵을 그리고, x·y축에 단어 라벨을 붙여 어떤 단어가 어디에 집중했는지 색으로 확인한다.",
        "결과 화면(3x3 색깔 격자)을 캡처하고, '어느 단어가 어느 단어를 가장 많이 참고했는지' 한 줄 해석을 적는다."
      ],
      "deliverable": "Attention 가중치 히트맵 이미지 1장 + 해석 3줄이 담긴 Colab 노트(.ipynb) 링크"
    }
  },
  "transformer-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 복습·Multi-Head Attention: 여러 시선으로 보기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 Positional Encoding으로 순서 정보 넣기 [실습]"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 FFN·잔차연결(Residual)·LayerNorm 한 블록 조립"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 Encoder-Decoder vs Decoder-only 구조 비교"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 대표 모델 BERT·GPT·T5의 쓰임새 정리"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 사전학습 모델로 추론 돌려보기 [실습]"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 메인 실습: 사전학습 모델로 임베딩 추출·문장 유사도 비교 [실습]"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 결과 공유·스케일링 법칙 토의·마무리"
      }
    ],
    "practice": {
      "title": "사전학습 모델로 문장 임베딩을 뽑아 문장끼리 유사도 비교하기",
      "steps": [
        "Colab 새 노트 첫 셀에 '!pip install transformers torch' 를 입력해 실행한다.",
        "두 번째 셀에서 'from transformers import AutoTokenizer, AutoModel' 과 'import torch' 로 도구를 불러온다.",
        "tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/all-MiniLM-L6-v2') 와 model = AutoModel.from_pretrained(같은 이름) 으로 사전학습 모델을 내려받는다.",
        "비교할 문장 3개를 리스트 sents = ['강아지가 공을 문다', '개가 공놀이를 한다', '주식 시장이 폭락했다'] 로 만든다.",
        "tokenizer(sents, padding=True, return_tensors='pt') 로 토큰화하고, with torch.no_grad(): out = model(**enc) 로 모델에 통과시킨다.",
        "out.last_hidden_state 를 토큰 길이 방향으로 평균(mean pooling)내 문장 1개당 벡터 하나를 만든다.",
        "torch.cosine_similarity 로 문장1-문장2, 문장1-문장3 의 유사도를 각각 계산해 print 한다.",
        "비슷한 뜻의 두 문장(1·2)이 다른 뜻 문장(3)보다 유사도가 높게 나오는지 결과 숫자로 확인하고 한 줄 해석을 적는다."
      ],
      "deliverable": "세 문장의 유사도 점수 출력 화면 캡처 + '의미가 비슷할수록 점수가 높다'를 확인한 해석 3줄이 담긴 Colab 노트"
    }
  },
  "python-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 데이터 분석과 Python 시작하기 · 환경 둘러보기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] Jupyter/Colab 셋업과 첫 코드 실행"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 변수·자료형·연산자와 문자열 다루기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] 리스트·딕셔너리·튜플·집합 자료구조"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 조건문·반복문으로 데이터 흐름 제어"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 함수와 컴프리헨션으로 코드 정리"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 NumPy 배열과 벡터 연산 기초"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [메인 실습] 데이터 전처리 스크립트 만들기"
      }
    ],
    "practice": {
      "title": "고객 주문 데이터 전처리 스크립트 만들기",
      "steps": [
        "Colab 노트북을 새로 열고 셀에 'import numpy as np' 를 입력한 뒤 Shift+Enter 로 실행해 오류 없이 넘어가는지 확인한다.",
        "orders 라는 리스트 변수에 주문 금액 7개를 직접 입력한다(예: [12000, 0, 35000, -1, 8000, None, 21000]) — 0·음수·None 은 일부러 넣은 '지저분한 값'이다.",
        "for 반복문과 if 조건문으로 orders 를 하나씩 검사해, None 이거나 0 이하인 값은 건너뛰고 정상 금액만 clean 리스트에 append 한다.",
        "clean 리스트를 np.array 로 바꿔 prices 변수에 담고, prices.sum() · prices.mean() · prices.max() 를 각각 print 한다.",
        "각 주문에 10% 부가세를 더한 배열을 'prices * 1.1' 한 줄로 계산해 with_tax 변수에 담는다(반복문 없이 한 번에).",
        "딕셔너리 summary 를 만들어 {'건수': len(prices), '합계': int(prices.sum()), '평균': round(float(prices.mean()))} 형태로 저장한다.",
        "print(summary) 를 실행해 화면에 건수 5, 합계 76000, 평균 15200 같은 결과가 나오는지 확인한다(기대 결과).",
        "마지막으로 clean 결과를 컴프리헨션 한 줄 '[p for p in orders if p and p > 0]' 로도 똑같이 만들어 두 방식의 결과가 같은지 비교한다."
      ],
      "deliverable": "지저분한 주문 리스트를 정제해 건수·합계·평균을 출력하는 .ipynb 노트북 파일"
    }
  },
  "python-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 Pandas 시작 · Series와 DataFrame 구조 이해"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] CSV 데이터 적재와 인덱싱·선택"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 결측치·이상치 처리와 데이터 정제"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] 필터링·정렬·groupby 집계"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 merge·pivot으로 데이터 재구조화"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] matplotlib·seaborn 시각화 기초"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 탐색적 데이터 분석(EDA) 흐름 익히기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [메인 실습] 실데이터 EDA 미니 리포트 완성"
      }
    ],
    "practice": {
      "title": "공공 판매 데이터로 탐색적 분석(EDA) 리포트 만들기",
      "steps": [
        "Colab 새 셀에 'import pandas as pd' 와 'import seaborn as sns' 를 입력해 실행한다.",
        "sns.load_dataset('tips') 로 식당 팁 데이터를 불러와 df 변수에 담는다(인터넷 없이 바로 쓰는 연습용 데이터).",
        "df.head() 를 실행해 표의 위쪽 5줄을 눈으로 확인하고, df.shape 로 행·열 개수를 파악한다(기대 결과: (244, 7)).",
        "df.isna().sum() 으로 열별 결측치 개수를 확인하고, 결측이 있으면 df = df.dropna() 로 제거한다.",
        "df[df['total_bill'] > 30] 로 결제액 30 초과 주문만 필터링해 high 변수에 담고 len(high) 를 출력한다.",
        "df.groupby('day')['tip'].mean() 으로 요일별 평균 팁을 계산해 출력한다(어느 요일이 팁이 후한지 확인).",
        "sns.barplot(data=df, x='day', y='tip') 로 요일별 평균 팁 막대그래프를 그린다.",
        "df.groupby('day')['tip'].mean() 결과를 표로 정리하고, df.to_csv('eda_result.csv') 로 저장한다.",
        "마지막 셀에 가장 팁이 후한 요일은 무슨 요일 처럼 분석 결론을 한 문장 주석으로 적어 리포트를 마무리한다."
      ],
      "deliverable": "결측치 처리·집계·그래프·결론이 담긴 EDA 노트북(.ipynb)과 집계 결과 CSV"
    }
  },
  "prompt-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 LLM은 어떻게 답을 만들까 - 다음 단어 예측과 프롬프트의 역할"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 프롬프트 4대 구성요소(역할·지시·예시·제약) 뜯어보기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 실습: 나쁜 프롬프트를 좋은 프롬프트로 바꿔보기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 Zero-shot / Few-shot / Chain-of-Thought 프롬프팅 기법"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 System·User·Assistant 메시지 설계와 역할 분리"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 실습: Few-shot + CoT로 업무 분류기 만들기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 컨텍스트 윈도우·토큰 비용과 컨텍스트 압축·요약 전략"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 실습: 업무 프롬프트 작성 → 평가 → 개선 사이클 돌리기"
      }
    ],
    "practice": {
      "title": "고객 문의 메일을 자동 분류·요약하는 업무 프롬프트 완성하기",
      "steps": [
        "1단계: 무료로 쓸 수 있는 LLM 환경(예: Google Colab 새 노트북)을 열고, 코드 셀에 '!pip install openai' 를 입력해 실행한다. (설치 완료 메시지가 보이면 성공)",
        "2단계: 화면 상단에서 받은 API 키를 코드의 api_key 자리에 붙여넣고, client 객체를 만드는 셀을 실행한다. (에러가 없으면 연결 준비 완료)",
        "3단계: 분류할 고객 문의 메일 예시 문장 3개를 파이썬 리스트 emails 에 넣는다. (배송/환불/단순질문이 섞이게 작성)",
        "4단계: 역할(role)·지시(instruction)·제약(constraint)을 담은 system 메시지 문자열을 만든다. '너는 CS 분류 담당자다. 카테고리는 배송/환불/기타 중 하나만 고른다' 처럼 적는다.",
        "5단계: Few-shot 예시 2개(입력 메일 → 정답 카테고리)를 프롬프트에 추가해, 모델이 답 형식을 흉내 내도록 만든다.",
        "6단계: 반복문으로 emails 를 하나씩 모델에 보내고, 돌아온 카테고리와 한 줄 요약을 출력한다. (화면에 '배송 / 요약: ...' 형태로 3줄이 찍히면 성공)",
        "7단계: 결과가 틀린 메일이 있으면, system 메시지의 제약을 더 구체적으로 고치거나 예시를 1개 더 추가해 다시 실행한다. (개선 전후 정확도를 눈으로 비교)",
        "8단계: 완성된 프롬프트와 출력 결과를 캡처해, '개선 전 → 개선 후'가 드러나도록 정리한다."
      ],
      "deliverable": "고객 문의 3건을 배송/환불/기타로 분류하고 한 줄 요약까지 출력하는 완성 프롬프트 코드 + 개선 전후 비교 캡처 1장"
    }
  },
  "vue-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 Vue란 무엇인가 · 프론트엔드 프레임워크의 필요성(이론+감잡기)"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] Node.js·Vite 설치하고 첫 Vue 프로젝트 만들기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 SFC(.vue 파일) 구조 해부 · template/script/style 한 줄씩 보기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] ref/reactive로 반응형 상태 만들고 화면에 출력하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 템플릿 디렉티브 v-bind·v-on·v-model 개념과 동작 원리"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] v-if·v-for로 조건·반복 렌더링 직접 만들기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 computed·watch로 파생 상태와 변화 감지 다루기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습·미니프로젝트] 실시간 반응형 카운터+할 일 입력 UI 완성"
      }
    ],
    "practice": {
      "title": "나의 첫 Vue 반응형 카운터 & 인사말 카드 만들기",
      "steps": [
        "터미널을 열고 `npm create vite@latest my-first-vue -- --template vue` 를 입력해 Vue 프로젝트 뼈대를 생성한다.",
        "`cd my-first-vue` 로 폴더에 들어간 뒤 `npm install` 로 필요한 라이브러리를 모두 내려받는다.",
        "`npm run dev` 를 실행하고 브라우저에서 http://localhost:5173 을 열어 기본 화면(Vite+Vue 로고)이 뜨는지 확인한다.",
        "src/App.vue 파일을 열고 기존 내용을 모두 지운 뒤, <script setup> 안에 `const count = ref(0)` 으로 반응형 숫자 변수를 만든다.",
        "<template> 안에 `<button @click=\"count++\">눌린 횟수: {{ count }}</button>` 를 작성해 버튼을 누르면 숫자가 올라가게 한다.",
        "이름 입력칸을 추가한다: `const name = ref('')` 선언 후 `<input v-model=\"name\">` 와 `<p>안녕하세요, {{ name }}님!</p>` 를 넣는다.",
        "저장(Ctrl+S)하면 새로고침 없이 화면이 바로 바뀌는 것(HMR, 핫 리로드)을 눈으로 확인한다.",
        "버튼을 3번 누르면 화면에 '눌린 횟수: 3' 이 표시되고, 입력칸에 글자를 치면 인사말이 실시간으로 따라 바뀌는 결과를 확인한다.",
        "computed 를 추가해 `const doubled = computed(() => count.value * 2)` 로 2배 값을 만들고 화면에 함께 표시한다.",
        "마지막으로 화면을 캡처하고, App.vue 파일을 저장한 상태로 마무리한다."
      ],
      "deliverable": "버튼 클릭 시 숫자가 증가하고 입력값이 실시간 반영되는 App.vue 파일 1개와 동작 화면 캡처"
    }
  },
  "vue-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 컴포넌트로 화면 쪼개기 · 부모-자식 관계 이해(이론)"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] 자식 컴포넌트 만들고 props로 데이터 내려주기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 emit으로 자식 → 부모에게 이벤트 올려보내기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] 부모-자식 양방향 통신 To-Do 아이템 만들기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 슬롯(slot)으로 재사용 가능한 레이아웃 컴포넌트 설계"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 라이프사이클 훅(onMounted 등) 직접 찍어보기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 Composition API와 컴포저블(composable)로 로직 재사용"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습·미니프로젝트] 재사용 목록+아이템 컴포넌트 구조 완성"
      }
    ],
    "practice": {
      "title": "부모-자식이 대화하는 할 일 목록(To-Do) 컴포넌트 만들기",
      "steps": [
        "src/components 폴더를 만들고 그 안에 TodoItem.vue 파일을 새로 생성한다.",
        "TodoItem.vue 의 <script setup>에 `const props = defineProps(['text','done'])` 를 적어 부모가 내려줄 데이터 통로를 연다.",
        "같은 곳에 `const emit = defineEmits(['toggle','remove'])` 를 적어 부모에게 보낼 신호 통로를 연다.",
        "TodoItem 템플릿에 체크박스와 삭제 버튼을 만들고, 각각 `@change=\"emit('toggle')\"`, `@click=\"emit('remove')\"` 로 신호를 보내게 한다.",
        "App.vue 에서 `import TodoItem from './components/TodoItem.vue'` 로 자식을 불러온다.",
        "App.vue 에 `const todos = ref([{text:'우유 사기',done:false}])` 목록을 만들고, v-for로 TodoItem을 반복 렌더링하며 :text·:done 으로 데이터를 내려준다.",
        "TodoItem에서 올라온 toggle/remove 신호를 받아 App.vue에서 해당 항목의 done을 뒤집거나 배열에서 제거하는 함수를 연결한다.",
        "입력칸과 '추가' 버튼을 만들어 새 할 일을 todos 배열에 추가한다.",
        "체크하면 글자에 줄이 그어지고, 삭제 버튼을 누르면 목록에서 사라지는 결과를 화면에서 확인한다.",
        "완성된 컴포넌트 2개(App.vue, TodoItem.vue)를 저장하고 동작 화면을 캡처한다."
      ],
      "deliverable": "props/emit으로 통신하는 App.vue + TodoItem.vue 두 컴포넌트와 추가·체크·삭제가 동작하는 화면 캡처"
    }
  },
  "vue-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 SPA(싱글페이지앱)와 라우팅 개념 · 새로고침 없는 화면 전환(이론)"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] Vue Router 설치하고 페이지 2개 연결하기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 동적 라우트·중첩 라우트·router-link/router-view 이해"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] 목록 → 상세 페이지 이동(파라미터 전달) 만들기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 네비게이션 가드로 로그인 안 한 사용자 막기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 전역 상태관리가 필요한 이유 · Pinia 개념(이론)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] Pinia 스토어로 장바구니 상태 만들기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습·미니프로젝트] 목록·상세 라우팅 + 전역 장바구니 완성"
      }
    ],
    "practice": {
      "title": "상품 목록 → 상세 페이지 이동 + 전역 장바구니(Pinia) 만들기",
      "steps": [
        "`npm install vue-router pinia` 를 입력해 라우터와 상태관리 라이브러리를 설치한다.",
        "src/router/index.js 를 만들고 createRouter·createWebHistory로 '/'(목록)와 '/product/:id'(상세) 두 경로를 등록한다.",
        "src/main.js 에서 `app.use(router)` 와 `app.use(createPinia())` 를 추가해 앱 전체에 연결한다.",
        "App.vue에 `<router-view />` 를 넣어 현재 경로에 맞는 페이지가 표시될 자리를 만든다.",
        "ProductList.vue에서 상품들을 v-for로 그리고, 각 상품을 `<router-link :to=\"'/product/' + p.id\">` 로 감싸 상세로 이동하게 한다.",
        "ProductDetail.vue에서 `useRoute()` 로 주소의 id를 읽어 해당 상품 정보를 화면에 표시한다.",
        "src/stores/cart.js 에 defineStore로 items 상태와 addItem 액션을 만들어 전역 장바구니를 정의한다.",
        "상세 페이지의 '담기' 버튼에 cart.addItem(상품)을 연결하고, 헤더에 장바구니 개수를 표시한다.",
        "상품을 클릭해 상세로 이동하고 '담기'를 누르면, 페이지를 옮겨도 헤더의 장바구니 숫자가 유지되는 결과를 확인한다.",
        "전체 파일(router, stores, 페이지 컴포넌트)을 저장하고 이동·담기 동작을 캡처한다."
      ],
      "deliverable": "라우팅으로 목록↔상세가 전환되고 Pinia로 장바구니 개수가 전역 유지되는 앱과 동작 캡처"
    }
  },
  "vue-4": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 서버와 대화하기 · 비동기·API·JSON 개념(이론)"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] fetch/axios로 외부 API 데이터 불러오기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 로딩·에러·빈 상태 처리로 안정적인 화면 만들기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] 폼 입력 + 유효성 검사로 데이터 보내기(POST)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 환경변수(.env)와 API 베이스 주소 분리 관리"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 Vite 빌드 원리와 정적 배포 개념(이론)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] npm run build 후 결과물 확인 · 미리보기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습·미니프로젝트] 목록·상세·폼 미니 SPA 완성하고 배포"
      }
    ],
    "practice": {
      "title": "외부 API로 사용자 목록을 불러와 보여주고 폼으로 추가한 뒤 배포하기",
      "steps": [
        "`npm install axios` 로 HTTP 요청 라이브러리를 설치한다.",
        "프로젝트 최상위에 .env 파일을 만들고 `VITE_API_URL=https://jsonplaceholder.typicode.com` 을 적어 API 주소를 분리한다.",
        "UserList.vue의 <script setup>에서 onMounted 시점에 axios.get으로 /users 데이터를 불러오고 users 배열에 담는다.",
        "불러오는 동안 loading=true로 '불러오는 중...'을, 실패하면 error 메시지를 보여주도록 분기 처리한다.",
        "v-for로 받아온 사용자 이름과 이메일을 카드 형태로 화면에 출력한다.",
        "입력 폼(이름·이메일)을 만들고, 빈 칸이거나 이메일에 @가 없으면 경고를 띄우는 유효성 검사를 넣는다.",
        "'추가' 버튼을 누르면 axios.post로 서버에 보내고, 성공하면 화면 목록 맨 위에 새 사용자를 추가한다.",
        "터미널에서 `npm run build` 를 실행해 dist 폴더(배포용 결과물)가 생기는지 확인한다.",
        "`npm run preview` 로 빌드 결과를 미리 띄워 실제 배포 화면처럼 동작하는지 확인한다.",
        "dist 폴더를 정적 호스팅(예: Netlify drop 또는 GitHub Pages)에 올리고, 공개 주소에서 목록과 폼이 동작하는 결과를 확인한다."
      ],
      "deliverable": "API로 목록을 불러오고 폼으로 추가되며 빌드·배포까지 끝난 미니 SPA의 공개 URL과 화면 캡처"
    }
  },
  "webproject-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 OT·미니프로젝트 목표와 한 사이클(기획→배포) 흐름 잡기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 주제 선정 워크숍·사용자 시나리오 함께 써보기(실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 와이어프레임으로 화면 흐름 그리기(실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 기능 명세서 작성과 우선순위 정하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 프론트/백엔드 아키텍처와 데이터 모델 설계(실습)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 화면-데이터 연결 JSON 목업 만들기(실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 기술 스택 선정과 프로젝트 폴더 초기화(실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 작업 분담·일정표 작성과 1일차 회고"
      }
    ],
    "practice": {
      "title": "내 미니 웹 서비스 기획서 + 화면 설계 + 프로젝트 뼈대 만들기",
      "steps": [
        "팀에서 만들 서비스 주제를 한 문장으로 정한다(예: '동네 맛집을 기록하는 메모 앱').",
        "사용자 시나리오를 '누가 / 언제 / 무엇을 하고 싶다' 형식으로 3개 적는다.",
        "종이나 Figma에 메인 화면, 목록 화면, 상세/입력 화면 3개의 와이어프레임을 그린다.",
        "기능 명세서를 표로 만들고 각 기능에 '필수/선택' 우선순위를 표시한다.",
        "화면에 보여줄 데이터를 JSON 한 덩어리(목업)로 작성해 data/mock.json 으로 저장한다.",
        "터미널에서 'npm create vite@latest my-web -- --template vue' 를 실행해 Vue 프로젝트를 만든다.",
        "'cd my-web' 후 'npm install' 로 패키지를 설치하고 'npm run dev' 로 서버를 켠다.",
        "브라우저에서 http://localhost:5173 에 접속해 Vite 기본 화면이 뜨는지 확인한다(기대 결과: Vue 로고가 보이는 시작 페이지).",
        "README.md 에 주제·기능 목록·담당자·일정을 적어 커밋한다."
      ],
      "deliverable": "기획서(주제·시나리오·기능명세)+와이어프레임 3장+mock.json+실행되는 Vue 프로젝트 초기 저장소"
    }
  },
  "webproject-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 1일차 설계 리뷰와 오늘 구현 목표 정하기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 컴포넌트로 화면 쪼개기와 목록 화면 만들기(실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 라우터로 목록↔상세 화면 이동 붙이기(실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 상태 관리로 데이터 한곳에 모으기(실습)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 입력 폼 만들고 새 글 추가 기능 구현(실습)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 폼 유효성 검사와 예외 처리 넣기(실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 API 연동(fetch)으로 가짜 서버에서 데이터 받아오기(실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 중간 점검·코드 리뷰와 내일 통합 준비"
      }
    ],
    "practice": {
      "title": "목록·상세·입력 폼이 동작하는 핵심 화면 구현하기",
      "steps": [
        "src/components 폴더에 ItemCard.vue 파일을 만들어 항목 하나를 보여주는 부품을 만든다.",
        "App.vue 또는 ListView.vue 에서 mock.json 을 import 해 v-for 로 ItemCard 를 반복 출력한다.",
        "'npm install vue-router' 로 라우터를 설치하고 router/index.js 에 목록·상세 두 경로를 등록한다.",
        "목록의 각 카드를 클릭하면 router-link 로 상세 화면(/item/:id)으로 이동하게 만든다.",
        "'npm install pinia' 로 상태 저장소를 설치하고 store에 items 배열을 옮겨 화면들이 같이 쓰게 한다.",
        "새 글 입력 폼(input·textarea)을 만들고 제출 버튼을 누르면 store의 items에 추가되게 한다.",
        "제목이 비어 있으면 '제목을 입력하세요' 경고를 띄우는 유효성 검사를 넣는다.",
        "브라우저에서 글을 추가해 목록에 바로 나타나는지 확인한다(기대 결과: 새 카드가 목록 맨 위에 추가됨).",
        "동작이 확인되면 'git commit -m \"핵심 화면 구현\"' 으로 저장한다."
      ],
      "deliverable": "목록→상세 이동·새 글 추가·유효성 검사가 동작하는 Vue 앱(중간 빌드)"
    }
  },
  "webproject-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 어제까지 만든 기능 통합 점검과 버그 목록 만들기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 발견한 버그 함께 고치기(실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 전체 흐름 통합 테스트하기(실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 환경변수·API 주소 정리와 빌드 준비(실습)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 프로덕션 빌드와 정적 배포(GitHub Pages)(실습)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 배포 주소 확인·점검과 발표 자료 만들기(실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 팀별 시연 발표"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 회고(잘된 점·아쉬운 점·개선점)와 과정 마무리"
      }
    ],
    "practice": {
      "title": "기능 통합 → 빌드 → 실제 인터넷에 배포하고 발표하기",
      "steps": [
        "팀원들의 작업을 하나의 main 브랜치로 합치고(merge) 충돌이 나면 함께 해결한다.",
        "목록→상세→글 추가→삭제까지 전체 흐름을 직접 클릭하며 통합 테스트하고 버그를 적는다.",
        "발견한 버그를 우선순위대로 고치고 다시 테스트한다.",
        "API 주소처럼 바뀌는 값은 .env 파일에 VITE_API_URL 로 옮겨 코드에서 분리한다.",
        "vite.config.js 의 base 를 '/저장소이름/' 으로 맞춘다(GitHub Pages 경로 문제 예방).",
        "'npm run build' 로 dist 폴더를 만들고 'npm run preview' 로 빌드 결과를 미리 확인한다.",
        "gh-pages 패키지나 GitHub Actions 로 dist 를 배포하고 배포 주소에 접속한다.",
        "배포된 사이트에서 모든 기능이 동작하는지 확인한다(기대 결과: 인터넷 주소로 접속해 글 추가까지 정상 동작).",
        "발표 자료(주제·시연·회고)를 만들고 3분 시연 발표를 진행한다."
      ],
      "deliverable": "인터넷에 배포된 동작하는 웹 서비스 URL + 발표 자료 + 회고 문서"
    }
  },
  "spring-ai-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 Spring AI란? 자바로 LLM을 다룬다는 것"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 프로젝트 생성과 의존성(Spring AI BOM) 추가"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] application.yml 설정·API 키 연결·헬스체크"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 ChatClient / ChatModel 추상화 이해"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 첫 채팅 호출 만들고 콘솔에서 응답 받기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 PromptTemplate과 System/User 메시지 설계"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 채팅 응답 REST API(/chat) 구현·테스트"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 멀티 프로바이더(OpenAI·Anthropic) 전환과 정리"
      }
    ],
    "practice": {
      "title": "Spring Boot에 LLM 붙여 채팅 REST API 만들기",
      "steps": [
        "https://start.spring.io 에 접속해 Project=Gradle, Language=Java, Spring Boot 3.3+, Java 17을 선택한다.",
        "Dependencies 검색창에 'OpenAI'를 입력해 'OpenAI'(Spring AI) 스타터와 'Spring Web'을 추가하고 GENERATE 버튼으로 zip을 받아 IDE로 연다.",
        "프로젝트 루트에서 환경변수로 키를 등록한다: 터미널에 export OPENAI_API_KEY=sk-... 를 입력한다(키는 OpenAI 콘솔에서 발급).",
        "src/main/resources/application.yml 을 열어 spring.ai.openai.api-key를 ${OPENAI_API_KEY}로, model을 gpt-4o-mini로 설정한다.",
        "com.example.demo 패키지에 ChatController 클래스를 만들고 생성자에서 ChatClient.Builder를 주입받아 chatClient 필드를 만든다.",
        "@GetMapping(\"/chat\") 메서드를 추가해 @RequestParam String message를 받아 chatClient.prompt().user(message).call().content() 로 답을 돌려준다.",
        "터미널에서 ./gradlew bootRun 을 실행해 애플리케이션을 8080 포트로 띄운다.",
        "브라우저나 curl로 http://localhost:8080/chat?message=안녕 을 호출한다.",
        "기대 결과: 화면에 '안녕하세요! 무엇을 도와드릴까요?' 같은 LLM의 한국어 답변 문자열이 그대로 출력된다.",
        "application.yml의 model을 다른 값으로 바꿔 재실행하며 응답 차이를 비교하고 기록한다."
      ],
      "deliverable": "GET /chat?message=... 호출 시 LLM 답변을 반환하는 Spring Boot 프로젝트(소스+application.yml)와, 두 모델 응답을 비교한 1쪽 메모"
    }
  },
  "spring-ai-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 RAG란 무엇인가: LLM의 '모르는 것'을 채워주기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 Embedding(임베딩)과 벡터 공간의 직관"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] EmbeddingModel로 문장 벡터 뽑아보기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 VectorStore와 pgvector 연동·문서 적재"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 문서 청킹·임베딩·색인 파이프라인"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 Retrieval과 RAG 프롬프트 결합 원리"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 사내 문서 QA REST API 만들기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 출처 표시·한계와 품질 점검"
      }
    ],
    "practice": {
      "title": "사내 문서로 답하는 RAG 질의응답 API 구축",
      "steps": [
        "docker로 pgvector를 띄운다: docker run -d --name pg -e POSTGRES_PASSWORD=pass -p 5432:5432 pgvector/pgvector:pg16 을 실행한다.",
        "프로젝트에 Spring AI 'OpenAI', 'PGvector Vector Store', 'JDBC', 'Spring Web' 의존성을 추가한다.",
        "application.yml에 datasource(url/username/password)와 spring.ai.vectorstore.pgvector.initialize-schema=true 를 설정한다.",
        "src/main/resources에 회사소개.txt 같은 텍스트 문서 2~3개를 넣는다.",
        "IngestService를 만들어 TextReader로 문서를 읽고 TokenTextSplitter로 잘게 나눈 뒤 vectorStore.add(documents)로 색인한다.",
        "앱 시작 시 CommandLineRunner로 ingest를 1회 실행해 DB에 벡터가 저장되게 한다.",
        "QaController에 /ask 엔드포인트를 만들어 질문을 임베딩→유사 문서 검색→프롬프트에 끼워 LLM 호출하도록 구현한다.",
        "./gradlew bootRun 으로 실행한 뒤 curl 'http://localhost:8080/ask?q=회사 설립연도가 언제야' 를 호출한다.",
        "기대 결과: 문서에 적힌 실제 설립연도를 근거로 한 답변과, 참고한 문서 조각이 함께 출력된다.",
        "문서에 없는 질문(예: 오늘 날씨)을 보내 '문서에서 찾을 수 없습니다' 류로 답하는지 확인한다."
      ],
      "deliverable": "pgvector에 사내 문서를 색인하고 /ask로 근거 기반 답을 주는 RAG API 프로젝트와, 정상·없는질문 각 1건의 응답 캡처"
    }
  },
  "spring-ai-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 Function Calling(도구 호출)이란 무엇인가"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 Spring AI에서 Tool(@Tool) 정의하기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 날씨 조회 도구를 LLM에 연결"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 구조화 출력(Structured Output)으로 객체 받기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 답변을 자바 record로 매핑하기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 스트리밍 응답과 예외·재시도 처리"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 도구+구조화 출력 결합 서비스 만들기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 서비스 통합·보안·정리"
      }
    ],
    "practice": {
      "title": "도구를 호출하고 결과를 객체로 받는 AI 기능 서비스",
      "steps": [
        "WeatherTools 클래스를 만들고 getWeather(String city) 메서드에 @Tool 어노테이션과 한국어 description을 단다.",
        "메서드 내부는 실제 API 대신 도시별 더미 온도를 반환하도록 간단히 구현한다(예: 서울 24도).",
        "ChatController에서 chatClient.prompt().tools(new WeatherTools())로 도구를 등록한다.",
        "사용자 질문 '서울 날씨 알려줘'를 user()에 넣고 call().content()로 호출한다.",
        "LLM이 스스로 getWeather(\"서울\")를 호출하고 그 결과를 문장에 녹여 답하는지 콘솔 로그로 확인한다.",
        "다음으로 record WeatherReport(String city, int celsius, String summary)를 정의한다.",
        "call().entity(WeatherReport.class)를 사용해 답변을 문자열이 아닌 자바 객체로 받는다.",
        "./gradlew bootRun 실행 후 /weather?city=서울 을 호출한다.",
        "기대 결과: {\"city\":\"서울\",\"celsius\":24,\"summary\":\"맑음\"} 형태의 JSON이 구조화되어 반환된다.",
        "존재하지 않는 도시를 넣어 예외가 나면 try-catch로 잡아 친절한 메시지를 돌려주도록 보강한다."
      ],
      "deliverable": "@Tool로 날씨를 조회하고 결과를 record로 구조화해 반환하는 /weather API 프로젝트와, 정상·예외 응답 캡처"
    }
  },
  "sllm-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 sLLM이란? 대형 LLM과 무엇이 다른가"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 오픈소스 모델 생태계(Llama·Qwen·Gemma) 둘러보기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] Hugging Face에서 소형 모델 불러와 추론하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 양자화(quantization)와 경량화의 원리"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] Ollama 설치하고 로컬에서 모델 돌리기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 서빙 방식 비교: Ollama vs vLLM vs Transformers"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 PEFT·LoRA 개념 첫걸음"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 로컬 sLLM으로 미니 챗봇 API 만들기"
      }
    ],
    "practice": {
      "title": "내 노트북에서 도는 sLLM 챗봇 만들기 (Ollama + FastAPI)",
      "steps": [
        "터미널을 열고 'pip install fastapi uvicorn requests' 를 실행해 필요한 라이브러리를 설치한다(설치 완료 메시지가 보이면 성공).",
        "Ollama 공식 사이트(ollama.com)에서 설치 파일을 받아 설치한 뒤, 터미널에서 'ollama --version' 으로 버전이 출력되는지 확인한다.",
        "터미널에 'ollama pull qwen2.5:0.5b' 를 입력해 0.5B(5억 파라미터) 소형 모델을 내려받는다(다운로드 진행바가 끝나면 완료).",
        "'ollama run qwen2.5:0.5b' 로 모델을 띄우고 '안녕'이라고 입력해 한국어 응답이 나오는지 눈으로 확인한다.",
        "프로젝트 폴더에 app.py 파일을 만들고, 아래 realCode의 FastAPI 서버 코드를 그대로 붙여넣는다.",
        "터미널에서 'uvicorn app:app --reload --port 8000' 을 실행해 서버를 띄운다(Uvicorn running on http://127.0.0.1:8000 메시지 확인).",
        "브라우저에서 'http://127.0.0.1:8000/docs' 에 접속해 자동 생성된 Swagger 문서를 열고 /chat 엔드포인트를 펼친다.",
        "'Try it out' 을 누르고 message 칸에 '파이썬으로 1부터 10까지 더하는 코드 알려줘'를 넣어 Execute 한다.",
        "응답 JSON의 reply 필드에 모델이 만든 답변이 들어오는지 확인한다(기대 결과: sum 또는 for문 코드가 텍스트로 반환).",
        "마지막으로 응답 시간(latency_ms)을 보고, 모델 크기를 1.5b로 바꿔 받아 같은 질문을 던져 속도·품질 차이를 비교 메모한다."
      ],
      "deliverable": "로컬에서 동작하는 sLLM 챗봇 서버(app.py)와, 0.5b/1.5b 두 모델의 응답 속도·품질을 비교한 한 페이지 메모"
    }
  },
  "sllm-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 파인튜닝이란? 사전학습 모델을 내 데이터로 길들이기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 instruction 데이터셋 설계와 포맷"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 학습용 데이터셋 만들고 검증하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 LoRA·QLoRA 원리와 차이"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] LoRA 학습 파이프라인 구성하기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 학습 모니터링과 하이퍼파라미터 튜닝"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 파인튜닝 모델 평가·추론 검증"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 도메인 특화 sLLM 완성·저장·배포"
      }
    ],
    "practice": {
      "title": "QLoRA로 내 도메인 말투를 배우는 sLLM 파인튜닝하기",
      "steps": [
        "터미널에서 'pip install transformers datasets peft trl bitsandbytes accelerate' 로 학습에 필요한 라이브러리를 모두 설치한다.",
        "프로젝트 폴더에 data.jsonl 파일을 만들고, 한 줄에 하나씩 {\"instruction\": \"...\", \"output\": \"...\"} 형식의 예시 30개 이상을 작성한다.",
        "examples의 데이터 로딩 코드를 실행해 데이터셋이 정상적으로 읽히는지(개수가 출력되는지) 확인한다.",
        "realCode의 train.py 학습 스크립트를 폴더에 저장한다.",
        "터미널에서 'python train.py' 를 실행해 학습을 시작한다(loss 값이 한 줄씩 출력되며 점점 줄어드는지 본다).",
        "학습이 끝나면 './lora-out' 폴더에 adapter 파일들이 생성되었는지 확인한다(어댑터 용량이 수십 MB로 작은지 체크).",
        "추론 코드로 학습한 어댑터를 원본 모델에 얹어, 학습에 쓴 말투/지식이 반영된 답이 나오는지 테스트한다.",
        "학습 전 원본 모델과 학습 후 모델에 같은 질문을 던져 답변 차이를 나란히 비교한다(기대 결과: 학습 후 답이 내 도메인 톤에 가까워짐).",
        "마지막으로 모델을 GGUF나 어댑터 형태로 저장해, Day1에서 만든 챗봇 서버에 연결할 수 있도록 경로를 정리한다."
      ],
      "deliverable": "직접 만든 instruction 데이터셋(data.jsonl), 학습된 LoRA 어댑터(lora-out 폴더), 학습 전/후 답변을 비교한 검증 리포트"
    }
  },
  "ml-dl-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 · 머신러닝이 뭐길래? 학습 유형(지도·비지도·강화) 한눈에"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 · 회귀 vs 분류 · 대표 알고리즘 지도 그리기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] Colab 켜고 붓꽃 데이터 불러와 살펴보기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 · 데이터 분할·과적합·일반화: 왜 시험은 따로 봐야 할까"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] train_test_split 으로 학습/평가 데이터 나누기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 · 평가지표(정확도·정밀도·재현율·F1·ROC) 쉽게 이해하기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] scikit-learn 분류 모델 학습하고 점수 매기기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 모델 바꿔가며 성능 비교 · 혼동행렬 해석"
      }
    ],
    "practice": {
      "title": "scikit-learn 으로 붓꽃(Iris) 품종 분류 모델 만들기",
      "steps": [
        "Google Colab(colab.research.google.com)에 접속해 '새 노트'를 만들고, 첫 셀에 `import sklearn` 을 입력한 뒤 Shift+Enter 로 실행해 오류가 없으면 환경이 준비된 것이다.",
        "`from sklearn.datasets import load_iris` 로 붓꽃 데이터를 불러오는 함수를 가져오고, `iris = load_iris()` 로 데이터를 변수에 담는다.",
        "`import pandas as pd` 후 `df = pd.DataFrame(iris.data, columns=iris.feature_names)` 로 표 형태로 바꾸고, `df['target'] = iris.target` 으로 정답(품종) 열을 붙인 뒤 `df.head()` 를 실행하면 위 5줄 표가 보인다.",
        "`from sklearn.model_selection import train_test_split` 을 가져와 `X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.2, random_state=42)` 로 학습용 80%·평가용 20% 로 나눈다.",
        "`from sklearn.tree import DecisionTreeClassifier` 를 가져와 `model = DecisionTreeClassifier(random_state=42)` 로 모델 객체를 만들고, `model.fit(X_train, y_train)` 으로 학습시킨다(공부시키기).",
        "`pred = model.predict(X_test)` 로 평가용 데이터의 품종을 예측하게 하고, `from sklearn.metrics import accuracy_score` 후 `print(accuracy_score(y_test, pred))` 를 실행하면 0.9~1.0 사이 정확도 숫자가 출력된다(기대 결과: 약 1.0).",
        "`from sklearn.metrics import classification_report` 후 `print(classification_report(y_test, pred))` 로 품종별 정밀도·재현율·F1 점수표를 확인한다.",
        "모델을 `from sklearn.neighbors import KNeighborsClassifier` 의 `KNeighborsClassifier()` 로 바꿔 같은 과정을 반복해 두 모델의 정확도를 비교한다.",
        "`from sklearn.metrics import confusion_matrix` 후 `print(confusion_matrix(y_test, pred))` 로 어떤 품종을 어떤 품종으로 헷갈렸는지(혼동행렬) 확인하고 한 줄로 해석을 적는다."
      ],
      "deliverable": "두 모델(결정트리·KNN)의 정확도·classification_report·혼동행렬을 모두 실행한 Colab 노트(.ipynb) 1개와, 어느 모델이 더 좋았는지 한 줄 결론"
    }
  },
  "ml-dl-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 · 신경망이란? 뇌의 뉴런에서 빌려온 아이디어"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 · 퍼셉트론과 다층 신경망(MLP) 구조 그려보기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] PyTorch 설치 확인 · 텐서(Tensor) 다뤄보기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 · 순전파·역전파: 모델이 틀리고 고치는 과정"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 · 활성화 함수와 손실 함수 · 옵티마이저(SGD/Adam)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] nn.Module 로 신경망 한 개 쌓아보기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 학습 루프(forward→loss→backward→step) 돌리기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 학습 곡선 그려 손실이 줄어드는지 확인"
      }
    ],
    "practice": {
      "title": "PyTorch 로 손글씨 숫자(Digits) 분류 신경망 학습하기",
      "steps": [
        "Colab 새 노트에서 `import torch` 와 `import torch.nn as nn` 을 실행하고, `print(torch.__version__)` 로 버전이 출력되면 PyTorch 가 준비된 것이다.",
        "`from sklearn.datasets import load_digits` 로 8x8 손글씨 숫자 데이터를 불러오고, `d = load_digits()` 로 담은 뒤 `print(d.data.shape)` 로 (1797, 64) 가 나오는지 확인한다.",
        "`from sklearn.model_selection import train_test_split` 후 학습/평가로 나누고, `X_train = torch.tensor(X_train, dtype=torch.float32)` 처럼 입력은 float, 정답은 `torch.long` 텐서로 변환한다.",
        "`model = nn.Sequential(nn.Linear(64, 32), nn.ReLU(), nn.Linear(32, 10))` 로 입력 64 → 은닉 32 → 출력 10(숫자 0~9) 신경망을 만든다.",
        "`loss_fn = nn.CrossEntropyLoss()` 로 분류용 손실 함수를, `optimizer = torch.optim.Adam(model.parameters(), lr=0.01)` 로 옵티마이저를 준비한다.",
        "`for epoch in range(100):` 반복 안에서 `optimizer.zero_grad()` → `out = model(X_train)` → `loss = loss_fn(out, y_train)` → `loss.backward()` → `optimizer.step()` 순서로 학습 루프를 작성한다.",
        "10 에폭마다 `print(epoch, loss.item())` 를 출력해 손실(loss) 숫자가 점점 줄어드는지 확인한다(기대 결과: 처음 2.x 에서 0.1 이하로 감소).",
        "학습이 끝나면 `with torch.no_grad():` 안에서 `pred = model(X_test).argmax(dim=1)` 로 예측하고, `(pred == y_test).float().mean()` 으로 평가 정확도를 계산해 출력한다.",
        "에폭별 loss 를 리스트에 모아 `import matplotlib.pyplot as plt; plt.plot(losses)` 로 학습 곡선을 그려 우하향하는지 눈으로 확인한다."
      ],
      "deliverable": "손실이 우하향하는 학습 곡선 그래프와 평가 정확도(대략 0.95 이상)가 출력된 Colab 노트 1개"
    }
  },
  "ml-dl-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 · 데이터 종류에 맞는 아키텍처: CNN·RNN·Transformer 지도"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 · CNN 직관: 이미지에서 '특징'을 훑어 찾기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] CNN 으로 손글씨 이미지 분류 맛보기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 · RNN/LSTM 과 Transformer·Attention 직관"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 · 과적합과의 싸움: 드롭아웃·정규화·데이터 증강"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 드롭아웃 넣고 빼며 과적합 비교"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 · 하이퍼파라미터 튜닝과 전이학습(Transfer Learning)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 사전학습 개념 정리 + 미니 개선 과제"
      }
    ],
    "practice": {
      "title": "PyTorch CNN 으로 손글씨 이미지 분류 + 드롭아웃으로 과적합 잡기",
      "steps": [
        "Colab 새 노트에서 `import torch`, `import torch.nn as nn` 을 실행한다.",
        "`from sklearn.datasets import load_digits` 로 8x8 손글씨를 불러오고, 입력을 이미지 형태로 만들기 위해 `X = torch.tensor(d.data, dtype=torch.float32).reshape(-1, 1, 8, 8)` 로 (개수, 채널 1, 8, 8) 모양으로 바꾼다.",
        "`class CNN(nn.Module):` 를 정의해 `nn.Conv2d(1, 8, 3, padding=1)`(특징 추출) → `ReLU` → `nn.MaxPool2d(2)`(크기 절반) → `Dropout` → `nn.Linear` 순서로 층을 쌓는다.",
        "학습/평가 데이터를 train_test_split 으로 나누고 정답을 `torch.long` 텐서로 만든다.",
        "`loss_fn = nn.CrossEntropyLoss()`, `opt = torch.optim.Adam(model.parameters(), lr=0.01)` 를 준비하고 60 에폭 학습 루프를 돌린다.",
        "매 에폭마다 학습 정확도와 평가 정확도를 함께 출력해, 두 값의 차이가 벌어지면 과적합이 시작된 것이다(기대 결과: 드롭아웃 없으면 차이가 크게 벌어짐).",
        "모델 정의의 드롭아웃을 `nn.Dropout(0.3)` 으로 살려 다시 학습시키고, 학습-평가 정확도 차이가 줄어드는지 비교한다.",
        "두 경우(드롭아웃 없음 vs 있음)의 평가 정확도를 표로 정리하고, 드롭아웃이 과적합을 어떻게 줄였는지 한 줄로 적는다."
      ],
      "deliverable": "드롭아웃 적용 전후의 학습/평가 정확도 비교표가 들어간 Colab 노트 1개와, 과적합이 줄어든 이유 한 줄 설명"
    }
  },
  "feature-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 피처 엔지니어링이란? 모델 성능을 좌우하는 \"재료 손질\""
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 데이터 둘러보기: 결측치·이상치 진단 실습"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 스케일링·정규화로 숫자 크기 맞추기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 범주형 인코딩: 원-핫·라벨·타깃 인코딩"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 수치·날짜·텍스트 파생 피처 만들기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 피처 선택과 차원 축소(중요도·상관·PCA)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 피처 엔지니어링 전후 성능 비교"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 정리·코드 리뷰·미니 회고"
      }
    ],
    "practice": {
      "title": "타이타닉 데이터로 피처 엔지니어링 전/후 모델 성능 비교하기",
      "steps": [
        "Colab(또는 Jupyter)을 새 노트북으로 열고 첫 셀에 `import pandas as pd, numpy as np` 를 입력해 실행한다.",
        "`df = pd.read_csv('https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv')` 로 데이터를 불러오고 `df.head()` 로 표가 보이는지 확인한다(맨 위 5줄이 출력되면 성공).",
        "`df.isnull().sum()` 을 실행해 어떤 열에 빈 값이 몇 개인지 센다(Age·Cabin 등에 결측치 숫자가 나온다).",
        "`df['Age'] = df['Age'].fillna(df['Age'].median())` 로 나이 빈 값을 중앙값으로 채운다.",
        "성별을 숫자로 바꾸기 위해 `df['Sex'] = df['Sex'].map({'male':0,'female':1})` 를 실행한다.",
        "승선항 Embarked 를 원-핫 인코딩한다: `df = pd.get_dummies(df, columns=['Embarked'], drop_first=True)`.",
        "새 파생 피처를 만든다: `df['FamilySize'] = df['SibSp'] + df['Parch'] + 1` (동승 가족 수).",
        "기본 피처(Pclass·Sex·Age)만 쓴 모델과, 가공 피처를 추가한 모델을 각각 LogisticRegression 으로 학습해 `accuracy_score` 를 출력한다.",
        "두 정확도를 화면에 나란히 출력해 \"가공 후 점수가 더 높음\"을 눈으로 확인한다(예: 0.78 → 0.82).",
        "마지막으로 `df.to_csv('titanic_features.csv', index=False)` 로 가공된 데이터를 저장한다."
      ],
      "deliverable": "피처 가공 전/후 정확도를 비교 출력한 노트북(.ipynb)과 가공 데이터 titanic_features.csv"
    }
  },
  "modeldev-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 오리엔테이션 - 모델 개발이란 무엇인가(전체 흐름 한눈에)"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 문제 유형별 모델 선택 기준(분류·회귀 고르기)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 데이터 불러오고 학습·검증·테스트로 나누기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 교차검증으로 일반화 성능 정직하게 평가하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 전처리→학습→평가 파이프라인 만들기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 평가지표 설계와 베이스라인(기준점) 세우기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 베이스라인 모델 학습·평가"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 교차검증 점수 비교 & 오늘 내용 정리"
      }
    ],
    "practice": {
      "title": "붓꽃(Iris) 데이터로 '베이스라인 분류 모델' 만들고 교차검증으로 평가하기",
      "steps": [
        "Jupyter(또는 Colab) 새 노트북을 열고 첫 셀에 'import sklearn; print(sklearn.__version__)' 를 입력해 라이브러리가 설치돼 있는지 확인한다(버전 숫자가 출력되면 정상).",
        "from sklearn.datasets import load_iris 로 붓꽃 데이터를 불러오고, X(꽃잎·꽃받침 크기), y(품종 번호)로 나눠 X.shape 를 출력해 (150, 4) 가 나오는지 확인한다.",
        "from sklearn.model_selection import train_test_split 로 데이터를 학습용 80%·테스트용 20% 로 나눈다. 이때 stratify=y 옵션을 넣어 품종 비율이 한쪽에 쏠리지 않게 한다.",
        "from sklearn.pipeline import make_pipeline 와 StandardScaler, LogisticRegression 을 묶어 '전처리+모델' 파이프라인을 한 줄로 만든다.",
        "model.fit(X_train, y_train) 으로 학습시키고, model.score(X_test, y_test) 로 테스트 정확도를 출력한다(0.9 이상이면 잘 된 것).",
        "from sklearn.model_selection import cross_val_score 로 5겹 교차검증을 돌려 5개의 점수 배열과 그 평균(.mean())을 출력한다.",
        "테스트 정확도 1개와 교차검증 평균 점수를 비교하며 '왜 교차검증이 더 믿을 만한지' 한 줄 메모를 노트북 마크다운 셀에 적는다.",
        "마지막으로 print 로 '베이스라인 정확도: 0.9xx' 형태의 최종 결과 한 줄을 출력해 산출물로 남긴다."
      ],
      "deliverable": "붓꽃 베이스라인 모델 노트북(.ipynb) — 데이터 분할 코드, 파이프라인, 테스트 점수와 5겹 교차검증 평균 점수가 모두 출력되어 있어야 함"
    }
  },
  "modeldev-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 복습 - 하이퍼파라미터란 무엇인가(모델의 '설정 손잡이')"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 탐색 방법 비교: Grid · Random · Bayesian"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] GridSearchCV 로 자동 튜닝하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 과적합 다시 보기 - 정규화와 조기종료(early stopping)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 조기종료로 과적합 막기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 앙상블 - 배깅 · 부스팅 · 스태킹의 직관"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 앙상블(RandomForest·GradientBoosting)로 성능 끌어올리기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 모델 경량화·추론 속도 비교 & 튜닝 전후 성능 정리"
      }
    ],
    "practice": {
      "title": "GridSearchCV 로 하이퍼파라미터를 자동 튜닝하고, 베이스라인 대비 성능을 비교하기",
      "steps": [
        "Day1에서 만든 베이스라인 점수를 노트북 맨 위에 다시 적어 두고(예: 0.958), 오늘의 목표 점수로 삼는다.",
        "from sklearn.ensemble import RandomForestClassifier 로 모델을 준비하고, 손볼 손잡이(파라미터) 후보를 param_grid 딕셔너리로 정의한다(n_estimators, max_depth 등).",
        "from sklearn.model_selection import GridSearchCV 로 모델·param_grid·cv=5 를 묶어 grid 객체를 만든다.",
        "grid.fit(X_train, y_train) 을 실행하면 모든 조합을 교차검증으로 자동 시험한다(완료까지 몇 초~몇십 초 기다린다).",
        "grid.best_params_ 와 grid.best_score_ 를 출력해 '가장 좋았던 설정'과 '그때의 교차검증 점수'를 확인한다.",
        "grid.best_estimator_ 로 최적 모델을 꺼내 테스트 데이터에서 최종 점수를 측정한다.",
        "베이스라인 점수와 튜닝 후 점수를 print 로 나란히 출력해 얼마나 올랐는지 비교한다.",
        "마지막으로 '어떤 파라미터를 키웠더니 왜 좋아졌는지' 한 줄 해석을 마크다운 셀에 남겨 산출물로 제출한다."
      ],
      "deliverable": "튜닝 비교 노트북(.ipynb) — param_grid, GridSearchCV 코드, best_params_/best_score_, 베이스라인 대비 테스트 점수 비교표(또는 두 줄 출력)가 포함되어야 함"
    }
  },
  "rag-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 RAG가 왜 필요한가: LLM의 한계와 검색 증강의 직관"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 RAG 전체 파이프라인 한눈에 보기(적재→청킹→임베딩→색인→검색→생성)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 개발환경 셋업과 첫 문서 로딩"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 청킹(chunking) 전략: 문서를 어떻게 잘라야 하나"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 청킹 파라미터 바꿔가며 비교하기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 임베딩(embedding)과 벡터 공간의 이해"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 벡터 색인과 유사도 검색 기초"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 문서 인덱싱 파이프라인 완성하기"
      }
    ],
    "practice": {
      "title": "내 PDF 문서를 검색 가능한 벡터 인덱스로 만드는 파이프라인 구축",
      "steps": [
        "터미널을 열고 'python -m venv venv' 명령으로 가상환경을 만든 뒤 'source venv/bin/activate'(윈도우는 venv\\Scripts\\activate)로 활성화한다.",
        "'pip install langchain langchain-community langchain-openai chromadb pypdf' 를 실행해 필요한 라이브러리를 한 번에 설치한다.",
        "작업 폴더에 'docs' 폴더를 만들고, 검색 대상이 될 PDF 파일 1개(예: 회사 규정집)를 그 안에 복사한다.",
        "환경변수에 OpenAI API 키를 넣는다: 터미널에서 'export OPENAI_API_KEY=sk-...' (윈도우는 set 사용).",
        "PyPDFLoader 로 PDF를 불러와 전체 페이지 수를 print 로 확인한다(기대 결과: 예 '총 12페이지 로드').",
        "RecursiveCharacterTextSplitter 로 chunk_size=500, chunk_overlap=50 으로 잘라 조각 개수를 출력한다(기대 결과: 예 '조각 37개 생성').",
        "OpenAIEmbeddings 와 Chroma 를 이용해 조각들을 벡터로 바꿔 'chroma_db' 폴더에 저장(persist)한다.",
        "저장된 인덱스에 'similarity_search(\"환불 규정은?\", k=3)' 질의를 던져 가장 가까운 3개 조각의 앞 80자를 출력한다.",
        "출력된 3개 조각이 질문과 관련 있는 내용인지 눈으로 확인하고, 관련 없으면 chunk_size 를 800으로 바꿔 다시 인덱싱해 비교한다.",
        "최종 인덱싱 코드를 'indexing.py' 파일로 저장하고, 다시 실행해도 같은 결과가 나오는지 확인한다."
      ],
      "deliverable": "내 PDF로 만든 chroma_db 폴더 + indexing.py 스크립트 + 검색 결과 3개를 캡처한 화면"
    }
  },
  "rag-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 어제 만든 인덱스 복습과 검색(Retriever)의 역할"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 Retriever 구성과 top-k 검색 튜닝"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] Retriever 로 관련 문서 가져오기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 하이브리드 검색: 키워드(BM25)와 벡터의 결합"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 재순위(re-ranking)로 검색 품질 높이기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 컨텍스트 결합 프롬프트 설계와 출처 인용"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 질의응답(QA) 체인 완성하기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 출처를 제시하는 RAG 챗봇으로 마무리"
      }
    ],
    "practice": {
      "title": "검색→재순위→생성을 잇는 출처 인용 QA 체인 구축",
      "steps": [
        "1일차에 만든 'chroma_db' 폴더를 그대로 불러와 Chroma 객체로 다시 연다.",
        "'vectordb.as_retriever(search_kwargs={\"k\": 4})' 로 가장 비슷한 4개를 가져오는 리트리버를 만든다.",
        "리트리버에 'invoke(\"연차 휴가는 며칠인가요?\")' 를 호출해 가져온 4개 조각의 출처 페이지를 출력한다.",
        "ChatPromptTemplate 로 '아래 컨텍스트만 근거로 답하고 모르면 모른다고 답하라'는 지시가 담긴 프롬프트를 만든다.",
        "ChatOpenAI(model=\"gpt-4o-mini\") 모델과 프롬프트, 리트리버를 LCEL 파이프(|)로 연결해 체인을 만든다.",
        "체인에 'invoke(\"연차 휴가는 며칠인가요?\")' 를 호출해 답변 문장을 출력한다(기대 결과: 문서 근거에 기반한 답).",
        "답변 아래에 참고한 조각의 출처(파일명·페이지)를 함께 출력하도록 코드를 보강한다.",
        "문서에 없는 질문(예: '대표이사 생일은?')을 던져 '모른다'고 답하는지 확인한다.",
        "확인된 코드를 'qa_chain.py' 로 저장하고, 질문을 입력받아 답하는 while 반복 루프를 추가한다.",
        "터미널에서 질문을 두세 번 입력해 매번 출처와 함께 답이 나오는지 최종 점검한다."
      ],
      "deliverable": "qa_chain.py + 정상 질문/문서에 없는 질문 각각의 답변 화면 캡처(출처 표기 포함)"
    }
  },
  "rag-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 RAG는 어떻게 평가하나: 좋은 답의 기준"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 RAGAS 지표 이해(충실도·답변 관련성·문맥 정밀도)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 작은 평가셋으로 RAG 점수 매기기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 청킹·임베딩·검색 파라미터 튜닝 전략"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 파라미터 바꿔 점수 비교하기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 멀티 문서·메타데이터 필터링과 운영 고려사항"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 비용·지연(latency)·캐싱 최적화"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 캐싱 적용과 3일 통합 RAG 마무리"
      }
    ],
    "practice": {
      "title": "RAGAS로 내 RAG를 채점하고 파라미터를 튜닝해 점수 올리기",
      "steps": [
        "'pip install ragas datasets' 로 평가 라이브러리를 설치한다.",
        "내 문서에서 답을 알 수 있는 질문 5개와 각 정답(ground truth)을 손으로 만들어 리스트로 준비한다.",
        "2일차 QA 체인을 함수로 감싸 각 질문에 대한 '답변'과 '가져온 컨텍스트'를 함께 수집한다.",
        "수집한 질문·답변·컨텍스트·정답을 datasets 형식으로 묶어 평가용 데이터셋을 만든다.",
        "ragas 의 faithfulness(충실도)와 answer_relevancy(답변 관련성) 지표로 evaluate 를 실행한다.",
        "출력된 점수표를 확인한다(기대 결과: 예 'faithfulness 0.82, answer_relevancy 0.79').",
        "chunk_size 를 500에서 800으로, k 를 4에서 6으로 바꿔 인덱스와 체인을 다시 만든다.",
        "같은 평가셋으로 다시 evaluate 를 실행해 점수가 올랐는지 비교한다.",
        "더 나은 설정을 'config 메모'로 기록하고, 비용·속도 관점에서 trade-off 한 줄을 남긴다.",
        "최종 설정으로 만든 RAG에 캐싱을 켜고, 같은 질문을 두 번 던져 두 번째가 빠른지 시간을 측정한다."
      ],
      "deliverable": "평가셋(질문5+정답) + 튜닝 전후 RAGAS 점수표 캡처 + 최종 설정 메모(파라미터·비용/속도 코멘트)"
    }
  },
  "langchain-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 — LangChain이 왜 필요한가: LLM 앱의 고민과 LangChain 생태계 지도"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 — 개발환경 셋업: 파이썬 가상환경 · API 키 · 첫 LLM 호출 (실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 — 3대 부품 익히기: 모델(Model) · 프롬프트(Prompt) · 출력 파서(Output Parser) (실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 — LCEL 입문: 파이프(|)로 부품을 잇는 '체인'의 원리"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 — LCEL 실전: 프롬프트→모델→파서 체인 만들고 실행하기 (실습)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 — 출력 파서 심화: 문자열·리스트·JSON(구조화) 출력 받기 (실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 — 변수 주입과 RunnablePassthrough로 입력 가공하기 (실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 — 미니 도전: '요약 + 키워드 추출' 멀티 체인 만들기 + 회고 (실습)"
      }
    ],
    "practice": {
      "title": "나만의 첫 LangChain 체인: 입력 글을 받아 한 줄 요약과 키워드를 뽑는 LCEL 파이프라인",
      "steps": [
        "터미널에서 'python -m venv venv' 를 입력해 가상환경을 만들고, macOS는 'source venv/bin/activate' 로 활성화한다 (프롬프트 앞에 (venv) 가 보이면 성공).",
        "'pip install langchain langchain-openai python-dotenv' 명령으로 필요한 패키지를 설치한다.",
        "프로젝트 폴더에 '.env' 파일을 만들고 첫 줄에 'OPENAI_API_KEY=sk-...' 형태로 본인 키를 적어 저장한다.",
        "'app.py' 파일을 만들고, dotenv로 키를 불러온 뒤 ChatOpenAI 모델 객체를 생성하는 코드를 작성한다.",
        "ChatPromptTemplate.from_template 로 '다음 글을 한 문장으로 요약해줘: {text}' 라는 프롬프트 틀을 만든다.",
        "프롬프트 | 모델 | StrOutputParser() 를 파이프(|)로 이어 chain 변수에 담는다.",
        "chain.invoke({'text': '아무 뉴스 기사 한 단락'}) 을 호출하고 print 로 결과를 출력한다 (기대 결과: 한 문장 요약이 화면에 출력됨).",
        "키워드 추출용 두 번째 프롬프트와 체인을 추가로 만들어 같은 입력에 대해 키워드 3개를 뽑게 한다.",
        "두 결과(요약·키워드)를 딕셔너리로 묶어 함께 출력하도록 코드를 수정한다 (기대 결과: {'summary': ..., 'keywords': ...} 형태 출력).",
        "'python app.py' 로 전체 실행해 요약과 키워드가 정상 출력되는지 확인하고, 입력 글을 바꿔 가며 결과를 비교한다."
      ],
      "deliverable": "입력 글을 받아 한 줄 요약과 키워드 3개를 함께 출력하는 app.py 파일과 실행 결과 캡처"
    }
  },
  "langchain-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 — 챗봇은 왜 앞 대화를 기억할까: 대화 메모리(Memory)의 필요성"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 — 메시지 히스토리로 멀티턴 대화 만들기 (실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 — 도구(Tool)란 무엇인가: LLM에 계산기·검색 같은 손발 달기 (실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 — RAG 맛보기: 내 문서를 잘라(청킹) 임베딩하고 벡터로 저장하기 (실습)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 — Retriever로 질문과 비슷한 문서 조각 찾아오기 (실습)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 — 검색 결과를 프롬프트에 끼워 답하게 하는 문서 QA 체인 (실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 — 조건에 따라 길을 나누는 라우팅(Routing) 체인 (실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 — 종합 실습: 문서 QA 챗봇 완성 + 회고 (실습)"
      }
    ],
    "practice": {
      "title": "내 PDF/텍스트 문서에 질문하면 근거와 함께 답하는 '문서 QA 챗봇' 만들기",
      "steps": [
        "'pip install langchain-community langchain-chroma' 로 문서 처리·벡터 저장에 필요한 패키지를 추가 설치한다.",
        "질문 대상이 될 텍스트 파일(예: 회사 소개 docs.txt)을 프로젝트 폴더에 준비한다.",
        "TextLoader로 문서를 불러오고, RecursiveCharacterTextSplitter로 500자 단위 조각으로 자른다.",
        "OpenAIEmbeddings로 각 조각을 벡터(숫자 묶음)로 바꾸고 Chroma 벡터DB에 저장한다.",
        "vectorstore.as_retriever() 로 '질문과 비슷한 조각을 찾아오는' retriever를 만든다.",
        "'아래 문맥만 근거로 답하라' 는 프롬프트에 {context}와 {question} 빈칸을 둔다.",
        "retriever→프롬프트→모델→파서를 LCEL로 이어 RAG 체인을 완성한다.",
        "chain.invoke('회사 설립 연도는?') 처럼 질문을 넣고 답을 출력한다 (기대 결과: 문서 근거에 기반한 답 출력).",
        "문서에 없는 내용을 물어 '모른다'고 답하는지 확인해 환각(없는 사실 지어내기)을 점검한다.",
        "검색된 문서 조각도 함께 출력하도록 코드를 고쳐 답의 근거를 눈으로 확인한다."
      ],
      "deliverable": "텍스트 문서 기반으로 질문에 근거와 함께 답하는 RAG 챗봇 스크립트와 3개 질문 실행 결과"
    }
  },
  "langchain-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 — 왜 답이 한꺼번에 다 나오면 답답할까: 스트리밍(Streaming)의 가치"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 — 체인 응답을 글자 단위로 흘려보내기 (실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 — 콜백(Callback)으로 토큰·비용·이벤트 들여다보기 (실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 — LangSmith로 체인 실행을 추적·디버깅하기 (실습)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 — 캐싱(Caching)으로 중복 호출 비용 줄이기 (실습)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 — 에러 처리: 재시도·폴백(fallback)으로 안 죽는 체인 만들기 (실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 — FastAPI로 LLM 체인을 웹 API로 감싸 배포 준비하기 (실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 — 미니 생성형 AI 서비스 완성 + 회고·발표 (실습)"
      }
    ],
    "practice": {
      "title": "스트리밍·캐싱·에러처리를 갖춘 LLM 체인을 FastAPI 웹 서비스로 배포하기",
      "steps": [
        "'pip install fastapi uvicorn' 로 웹 서버 패키지를 설치한다.",
        "Day1의 요약 체인을 가져와 별도 chain.py로 분리하고 import 할 수 있게 한다.",
        "set_llm_cache로 인메모리 캐시를 켜서 같은 입력의 반복 호출을 빠르게 만든다.",
        "체인에 .with_retry()를 붙여 일시적 오류 시 자동 재시도되게 한다.",
        "main.py에 FastAPI 앱을 만들고 POST /summarize 엔드포인트를 정의한다.",
        "요청 본문(JSON)의 text를 받아 chain.invoke로 처리해 결과를 반환한다.",
        "StreamingResponse로 답을 글자 단위로 흘려보내는 /stream 엔드포인트도 추가한다.",
        "'uvicorn main:app --reload' 로 서버를 띄운다 (기대 결과: http://127.0.0.1:8000 에서 동작).",
        "브라우저에서 /docs 자동 문서를 열어 /summarize를 직접 호출해 본다.",
        "같은 입력을 두 번 호출해 캐시 덕분에 두 번째가 더 빠른지 시간을 비교한다."
      ],
      "deliverable": "스트리밍·캐싱·재시도가 적용된 chain.py와 FastAPI main.py, /docs에서 호출한 결과 캡처"
    }
  },
  "serving-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 OT·모델 서빙이 왜 필요한가 (학습된 모델을 서비스로)"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 서빙 패턴 비교: 온라인·배치·스트림"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 모델 저장·로드와 추론 함수 만들기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 FastAPI 기초: 엔드포인트·요청/응답 모델"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] FastAPI 추론 API 만들고 호출하기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 입력 검증·전처리·후처리와 에러 처리"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 BentoML로 모델 패키징과 버전 관리"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 추론 REST API 완성·테스트·정리"
      }
    ],
    "practice": {
      "title": "학습된 머신러닝 모델을 FastAPI 추론 REST API로 서빙하기",
      "steps": [
        "터미널에서 가상환경을 만들고(`python -m venv .venv` 후 활성화) `pip install fastapi uvicorn scikit-learn joblib` 로 필요한 패키지를 설치한다.",
        "`train.py` 를 작성해 scikit-learn 의 붓꽃(iris) 데이터로 분류 모델을 학습하고 `joblib.dump(model, 'model.joblib')` 로 파일에 저장한다(실행하면 같은 폴더에 model.joblib 생성).",
        "`app.py` 를 만들고 FastAPI 앱과 Pydantic 입력 스키마(꽃받침·꽃잎 4개 수치)를 정의한다.",
        "앱이 시작될 때 `joblib.load('model.joblib')` 로 모델을 한 번만 메모리에 올리고, `/predict` POST 엔드포인트에서 입력을 받아 예측을 반환하게 작성한다.",
        "터미널에서 `uvicorn app:app --reload --port 8000` 명령으로 서버를 켠다(콘솔에 'Uvicorn running on http://127.0.0.1:8000' 이 보이면 성공).",
        "브라우저로 `http://127.0.0.1:8000/docs` 에 접속해 자동 생성된 Swagger 문서에서 `/predict` 를 'Try it out' 으로 직접 호출한다.",
        "터미널에서 `curl` 로 JSON 을 POST 해 `{\"prediction\":\"setosa\"}` 형태의 응답이 오는지 확인한다(기대 결과: HTTP 200 과 예측 라벨).",
        "잘못된 입력(숫자 대신 문자)을 보내 422 검증 에러가 자동으로 나는지 확인하고, 모델 버전 정보를 응답에 함께 담아 마무리한다."
      ],
      "deliverable": "model.joblib + train.py + app.py 로 구성된, /predict 호출 시 예측 라벨과 모델 버전을 돌려주는 실행 가능한 FastAPI 추론 서비스"
    }
  },
  "serving-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 컨테이너가 왜 필요한가: '내 컴에선 됐는데' 문제 해결"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 Docker 핵심 개념: 이미지·컨테이너·레지스트리"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 추론 API 를 Dockerfile 로 이미지화·실행"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 확장(Scaling)과 오토스케일링·부하 대응 개념"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] docker compose 로 여러 컨테이너 띄우기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 관측성(Observability): 메트릭·로그·트레이싱"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] Prometheus 지표 노출과 모니터링 확인"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 데이터·모델 드리프트 모니터링과 알림"
      }
    ],
    "practice": {
      "title": "FastAPI 추론 서비스를 Docker 로 컨테이너화하고 Prometheus 지표로 모니터링하기",
      "steps": [
        "1일차에 만든 app.py 와 model.joblib 이 있는 폴더에 `requirements.txt` 를 만들어 fastapi·uvicorn·scikit-learn·joblib·prometheus-client 를 적는다.",
        "같은 폴더에 `Dockerfile` 을 작성한다(베이스 이미지 지정→작업폴더 설정→의존성 설치→소스 복사→실행 명령 순서).",
        "터미널에서 `docker build -t iris-api:v1 .` 로 이미지를 만든다(마지막 줄에 'Successfully tagged iris-api:v1' 이 보이면 성공).",
        "`docker run -d -p 8000:8000 --name iris iris-api:v1` 로 컨테이너를 띄우고 `docker ps` 로 실행 중인지 확인한다.",
        "`curl http://localhost:8000/health` 로 컨테이너 안의 API 가 응답하는지 확인한다(기대 결과: {\"status\":\"ok\"}).",
        "app.py 에 prometheus-client 로 요청 수·지연시간 지표를 추가하고 `/metrics` 엔드포인트를 노출한다.",
        "`docker-compose.yml` 을 작성해 추론 API 와 Prometheus 두 컨테이너를 함께 `docker compose up` 으로 띄운다.",
        "브라우저로 Prometheus(`http://localhost:9090`)에 접속해 `predict_requests_total` 지표를 그래프로 조회한다(요청을 몇 번 보내면 숫자가 올라가는지 확인)."
      ],
      "deliverable": "Dockerfile·docker-compose.yml·requirements.txt 가 포함된, 컨테이너로 실행되며 /metrics 로 요청 수·지연 지표를 노출하고 Prometheus 가 수집하는 추론 서비스"
    }
  },
  "serving-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 MLOps 가 풀려는 문제와 전체 그림"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 실험 관리와 재현성: MLflow 로 추적하기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] MLflow 로 학습 파라미터·지표 기록"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 모델 레지스트리와 스테이지 승격"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 모델 등록·버전·Staging→Production"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 CI/CD 로 학습·배포 자동화하기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] GitHub Actions 로 자동 빌드·배포 파이프라인"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 AIOps: 이상탐지·자동 대응과 과정 마무리"
      }
    ],
    "practice": {
      "title": "MLflow 실험 추적 + 모델 레지스트리 + GitHub Actions CI/CD 로 자동 배포 파이프라인 만들기",
      "steps": [
        "`pip install mlflow scikit-learn` 후 터미널에서 `mlflow ui` 를 실행하고 브라우저로 `http://127.0.0.1:5000` 에 접속해 실험 관리 화면을 연다.",
        "`train.py` 에 `mlflow.start_run()` 블록을 넣어 하이퍼파라미터(n_estimators)와 정확도(accuracy)를 `log_param`·`log_metric` 으로 기록한다.",
        "`train.py` 를 n_estimators 값을 바꿔 가며 여러 번 실행하고, MLflow UI 에서 실행(run)들의 정확도를 표로 비교한다.",
        "가장 정확도가 높은 실행의 모델을 `mlflow.sklearn.log_model` 로 저장하고 레지스트리에 'iris-clf' 이름으로 등록한다.",
        "MLflow UI 의 Models 탭에서 등록된 모델 버전을 'Staging' 으로, 검증 후 'Production' 으로 승격(promote)한다.",
        "프로젝트를 GitHub 저장소로 올리고 `.github/workflows/mlops.yml` 워크플로 파일을 작성한다(체크아웃→파이썬 설치→의존성→학습→테스트 순서).",
        "코드를 push 해서 GitHub Actions 탭에서 워크플로가 자동 실행되고 초록색 체크가 뜨는지 확인한다(기대 결과: 모든 단계 통과).",
        "테스트가 실패하도록 일부러 코드를 깨뜨려 push 한 뒤, Actions 가 빨간 X 로 배포를 막아 주는지 확인하고 다시 고쳐 통과시킨다."
      ],
      "deliverable": "MLflow 로 실험이 추적·비교되고 best 모델이 레지스트리에 등록·승격되며, GitHub Actions 가 push 마다 학습·테스트를 자동 수행하는 end-to-end MLOps 파이프라인"
    }
  },
  "agent-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 AI 에이전트란 무엇인가 - 챗봇과 에이전트의 차이"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 ReAct 패턴 - 생각하고(Reason) 행동하기(Act)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 환경 셋업과 첫 LLM 호출 따라하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 LangGraph 핵심 개념 - 그래프·노드·엣지·State"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] State와 노드로 가장 단순한 그래프 만들기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 도구(Tool) 정의와 LLM이 도구를 부르게 하기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 조건부 분기로 도구 호출 루프 만들기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 단일 에이전트 완성 + 실행 결과 점검"
      }
    ],
    "practice": {
      "title": "검색 도구를 쓰는 단일 ReAct 에이전트 직접 만들기",
      "steps": [
        "터미널을 열고 `python -m venv venv` 로 가상환경을 만든 뒤 `source venv/bin/activate`(윈도우는 venv\\Scripts\\activate) 로 활성화한다.",
        "`pip install langgraph langchain langchain-anthropic` 명령으로 필요한 라이브러리를 설치한다(설치 끝에 'Successfully installed' 가 보이면 성공).",
        "발급받은 API 키를 `export ANTHROPIC_API_KEY=\"sk-...\"` 로 환경변수에 넣는다(키를 코드에 직접 쓰지 않기 위해서다).",
        "`agent.py` 파일을 만들고, State(대화 상태)를 messages 리스트 하나로 정의한다.",
        "두 자리 곱셈을 해주는 `multiply` 함수에 @tool 데코레이터를 붙여 '도구'로 등록한다.",
        "LLM 노드와 도구 실행 노드(ToolNode)를 만들고, add_node 로 그래프에 두 노드를 추가한다.",
        "add_conditional_edges 로 'LLM이 도구를 부르면 도구 노드로, 아니면 END로' 가는 분기를 연결한다.",
        "`graph.invoke({\"messages\": [(\"user\", \"23 곱하기 17은?\")]})` 로 에이전트를 실행한다.",
        "출력 메시지를 확인하여 에이전트가 multiply 도구를 호출하고 최종 답 391을 내놓는지 점검한다(기대 결과: 마지막 메시지에 '391').",
        "질문을 '오늘 기분이 어때?' 같은 도구가 필요 없는 문장으로 바꿔 실행해, 이번엔 도구를 안 부르고 바로 답하는지 비교한다."
      ],
      "deliverable": "도구 호출 분기가 동작하는 agent.py 파일과, 두 종류 질문(계산형/일상형)의 실행 로그 캡처"
    }
  },
  "agent-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 단일 에이전트의 한계와 멀티 에이전트의 필요성"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 멀티 에이전트 구조 - 슈퍼바이저와 작업자 패턴"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 두 전문가 에이전트를 라우터로 나눠 호출하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 서브그래프와 메모리로 역할 조립하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 Human-in-the-loop - 사람이 승인해야 진행하는 흐름"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] interrupt 로 사람 승인 받고 이어가기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 에러 복구·재시도·관측(로깅/추적) 다루기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 멀티 에이전트 워크플로 완성 + 회고"
      }
    ],
    "practice": {
      "title": "조사 담당 + 작성 담당으로 협업하는 멀티 에이전트 워크플로 만들기",
      "steps": [
        "1일차 가상환경을 다시 활성화하고 `pip install langgraph langchain langchain-anthropic` 가 되어 있는지 확인한다.",
        "`multiagent.py` 파일을 만들고, 공용 State에 messages 와 'next'(다음에 일할 에이전트 이름) 두 칸을 둔다.",
        "검색 도구를 쓰는 researcher(조사) 노드와, 글을 다듬는 writer(작성) 노드를 각각 함수로 만든다.",
        "supervisor(감독) 노드를 만들어, 현재 상황을 보고 'researcher / writer / FINISH' 중 누구에게 일을 넘길지 정하게 한다.",
        "add_conditional_edges 로 supervisor 의 결정에 따라 알맞은 작업자 노드로 가도록 연결하고, 작업자는 끝나면 다시 supervisor 로 돌아오게 한다.",
        "writer 노드 앞에 interrupt_before 를 걸어, 글을 쓰기 직전 사람이 한 번 확인(승인)하도록 멈추는 지점을 만든다.",
        "`app.invoke({\"messages\": [(\"user\", \"전기차 시장 동향을 조사해서 3줄 요약해줘\")]}, config)` 로 실행한다.",
        "승인 대기에서 멈추면, 상태를 확인하고 `app.invoke(None, config)` 로 사람이 '진행'을 눌러 이어가게 한다.",
        "최종 출력에서 조사 결과를 바탕으로 writer 가 3줄 요약을 만들었는지 확인한다(기대 결과: 사람 승인 후 요약문 출력).",
        "질문을 바꿔(예: 도구가 필요 없는 인사) supervisor 가 바로 FINISH 로 보내는지 비교 관찰한다."
      ],
      "deliverable": "supervisor가 작업자를 라우팅하고 writer 전에 사람 승인이 끼어드는 multiagent.py 와, 승인 전/후 실행 로그 캡처"
    }
  },
  "vectordb-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 — 오리엔테이션: 벡터 검색이 왜 필요한가 (검색의 진화)"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 — 임베딩과 벡터 공간, 코사인/내적 유사도 개념"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 문장을 임베딩 벡터로 바꿔보고 유사도 직접 계산"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 — 인덱싱 알고리즘: 완전탐색의 한계와 HNSW·IVF 직관"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] FAISS로 Flat vs HNSW 인덱스 만들어 속도 비교"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 — 대표 Vector DB 비교: pgvector·Chroma·FAISS·Pinecone"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] Chroma로 문서 임베딩·저장·검색 미니 파이프라인"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 메타데이터 필터링 + 키워드/벡터 하이브리드 검색"
      }
    ],
    "practice": {
      "title": "나만의 문서 검색기 만들기 — Chroma로 임베딩·저장·질문 검색까지",
      "steps": [
        "터미널에서 `pip install chromadb sentence-transformers` 를 실행해 필요한 라이브러리를 설치한다 (설치 로그 마지막에 Successfully installed 가 보이면 성공).",
        "작업 폴더에 `search.py` 파일을 새로 만들고, 검색 대상이 될 문장 5~6개를 파이썬 리스트 `docs` 로 직접 입력한다 (예: 강아지·고양이·날씨·주식 같은 서로 다른 주제 문장).",
        "`SentenceTransformer('all-MiniLM-L6-v2')` 모델을 불러와 `model.encode(docs)` 로 각 문장을 숫자 벡터로 바꾼다 (벡터 1개의 길이가 384인지 `shape` 로 확인).",
        "`chromadb.Client()` 로 메모리 DB를 만들고 `create_collection('my_docs')` 로 문서를 담을 컬렉션(서랍장)을 생성한다.",
        "`collection.add(documents=docs, embeddings=벡터, ids=...)` 로 문장 원문·벡터·고유번호를 함께 저장한다 (id는 'd0','d1'처럼 문자열로).",
        "질문 문장 하나(예: '반려동물 키우기')를 같은 모델로 임베딩한 뒤 `collection.query(query_embeddings=..., n_results=2)` 로 가장 비슷한 문서 2개를 찾는다.",
        "터미널에 검색 결과 문서와 거리(distance)를 `print` 로 출력하고, 질문과 주제가 같은 문장이 가장 위에 오는지 눈으로 확인한다 (기대 결과: 강아지·고양이 문장이 상위에 노출).",
        "이번엔 각 문서에 `metadatas=[{'topic':'pet'} ...]` 로 주제 태그를 달아 다시 저장하고, `where={'topic':'pet'}` 조건을 걸어 특정 주제 안에서만 검색되는지 확인한다.",
        "질문을 2~3개 바꿔가며 검색해 보고, 결과가 기대와 다르면 어떤 문장 때문에 헷갈리는지 한 줄로 메모한다.",
        "완성된 `search.py` 를 저장하고, 실행 화면(질문→상위 문서 출력) 캡처를 산출물로 남긴다."
      ],
      "deliverable": "search.py 소스 파일 1개 + 질문 2개에 대한 검색 결과 출력 캡처(스크린샷 또는 콘솔 텍스트), 그리고 '잘된 검색 / 헷갈린 검색' 1줄 회고"
    }
  },
  "capstone-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 OT: 캡스톤 목표와 평가 기준 이해하기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] 문제 정의와 사용자 시나리오 작성하기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 에이전트 + RAG + 도구(Tool) 아키텍처 개념 잡기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] 시스템 아키텍처 다이어그램 그리기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 데이터·모델·인터페이스 계획 세우기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 개발 환경 셋업과 스켈레톤 코드 만들기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 팀별 기획·설계서 완성하기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 팀별 계획 발표와 상호 피드백"
      }
    ],
    "practice": {
      "title": "우리 팀 AI 에이전트 서비스 기획서 + 아키텍처 설계 + 실행되는 스켈레톤 만들기",
      "steps": [
        "팀에서 해결할 문제 한 줄을 정한다. 예: '사내 규정 문서를 대신 찾아 답해주는 에이전트'처럼 '누가, 무엇을, 왜'가 들어가게 적는다.",
        "구글 문서나 노션에 '사용자 시나리오'를 3개 적는다. 각 시나리오는 (상황 → 사용자가 입력하는 질문 → 에이전트가 해주길 바라는 행동) 순서로 쓴다.",
        "종이나 화이트보드, 또는 draw.io(diagrams.net) 사이트에 접속해 박스 4개(사용자 → 에이전트 두뇌(LLM) → 도구/검색(RAG) → 외부 API)를 그리고 화살표로 데이터가 흐르는 방향을 잇는다.",
        "터미널을 열고 'python -m venv venv' 를 입력해 가상환경을 만든 뒤 'source venv/bin/activate'(윈도우는 venv\\Scripts\\activate)로 활성화한다.",
        "'pip install langgraph langchain langchain-anthropic langchain-community python-dotenv' 명령으로 필요한 라이브러리를 한 번에 설치한다.",
        "프로젝트 폴더에 '.env' 파일을 만들고 'ANTHROPIC_API_KEY=발급받은_키' 한 줄을 적어 저장한다. 이 파일은 비밀번호와 같으니 깃에 올리지 않도록 .gitignore에 추가한다.",
        "아래 realCode의 'app.py' 스켈레톤을 그대로 붙여넣고 'python app.py'를 실행한다.",
        "화면에 '에이전트 준비 완료! 무엇을 도와드릴까요?' 가 출력되면 환경 구성 성공이다. (기대 결과) 에러 없이 인사 문구가 뜨면 1일차 목표 달성.",
        "팀 설계서(문제정의 + 시나리오 3개 + 아키텍처 그림 + 사용할 기술스택 목록)를 한 장으로 정리한다.",
        "팀별로 3분씩 발표하고, 다른 팀에게 '이 부분은 어떻게 구현할 거냐'는 질문을 최소 1개씩 받아 답한다."
      ],
      "deliverable": "한 장짜리 팀 설계서(문제정의·사용자 시나리오 3개·아키텍처 다이어그램·기술스택) + 실행되는 app.py 스켈레톤(인사 문구 출력 확인)"
    }
  },
  "capstone-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 LangGraph의 상태(State)·노드·엣지 빠르게 복습"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] State 정의하고 첫 노드 만들기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 에이전트가 쓸 도구(Tool) 함수 작성하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] RAG 검색 노드 연결하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 그래프 조립과 조건 분기(도구 쓸지 말지) 만들기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 외부 API 도구 연동하기"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습] 간단한 프론트(웹/CLI)와 백엔드 연결하기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 중간 점검과 함께 디버깅하기"
      }
    ],
    "practice": {
      "title": "LangGraph로 '검색하고 도구도 쓰는' 동작하는 에이전트 완성하기",
      "steps": [
        "어제 만든 app.py 옆에 'agent.py' 파일을 새로 만든다.",
        "아래 realCode의 'State 정의'를 붙여넣어 에이전트가 기억할 정보(대화 메시지)를 담을 그릇을 만든다.",
        "에이전트가 사용할 도구 함수(예: 환율 조회, 문서 검색)를 @tool 데코레이터로 1~2개 작성한다.",
        "ChatAnthropic 모델에 '.bind_tools(도구목록)' 를 붙여 모델이 도구를 쓸 수 있게 연결한다.",
        "StateGraph 에 'agent(생각하는 노드)' 와 'tools(도구 실행 노드)' 를 add_node 로 추가한다.",
        "add_conditional_edges 로 '도구가 필요하면 tools로, 아니면 끝(END)으로' 가는 분기를 연결한다.",
        "graph.compile() 로 그래프를 완성하고, 'app.invoke(질문)' 로 실제 질문을 던져본다.",
        "터미널에서 'python agent.py' 실행 후 '오늘 1달러는 몇 원이야?' 라고 물어 도구가 호출되는지 확인한다.",
        "(기대 결과) 에이전트가 환율 도구를 호출하고, 그 결과를 문장으로 풀어 '오늘 1달러는 약 OOOO원입니다' 형태로 답하면 성공.",
        "잘 되면 코드를 깃에 커밋하고 'feat: 도구 사용 에이전트 구현' 메시지로 푸시한다."
      ],
      "deliverable": "질문에 따라 스스로 도구를 호출하고 답하는 agent.py(실행 로그 캡처 포함) + 깃 커밋"
    }
  },
  "capstone-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 통합 테스트 계획 세우기(무엇을·어떻게 검증할까)"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] 엔드투엔드 시나리오 테스트 돌리기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 발견한 버그 수정과 안정화"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] 성능·비용·한계 점검하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 배포와 시연 환경 구성하기"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 발표자료와 라이브 데모 준비"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 팀별 결과 발표와 데모 시연"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 상호 피드백과 회고(KPT)"
      }
    ],
    "practice": {
      "title": "에이전트 서비스 통합·테스트·배포 후 라이브 데모로 발표하기",
      "steps": [
        "어제까지 만든 agent.py 를 Streamlit 웹앱(app_web.py)으로 감싸 누구나 브라우저에서 쓸 수 있게 만든다.",
        "아래 realCode의 Streamlit 코드를 붙여넣고 'streamlit run app_web.py' 를 실행한다.",
        "브라우저가 자동으로 열리면 입력창에 시나리오 3개 질문을 차례로 넣어 모두 정상 동작하는지 확인한다.",
        "일부러 이상한 질문(빈 입력, 엉뚱한 요청)을 넣어 에러 없이 안내 메시지가 나오는지 확인한다(예외 처리 점검).",
        "한 번 호출에 토큰이 얼마나 드는지, 응답까지 몇 초 걸리는지 측정해 '성능·비용' 표를 만든다.",
        "발표 슬라이드를 5장으로 만든다: (1)문제정의 (2)아키텍처 그림 (3)핵심 기능 데모 (4)성능·한계 (5)배운 점.",
        "라이브 데모가 실패할 때를 대비해 정상 동작 화면을 미리 녹화해 둔다(백업 영상).",
        "(기대 결과) 발표 중 입력창에 질문을 넣으면 출처와 함께 답이 나오는 장면을 청중 앞에서 시연한다.",
        "팀별 7분 발표 + 3분 질의응답을 진행한다.",
        "발표 후 KPT 회고(Keep 좋았던 점·Problem 아쉬운 점·Try 다음에 시도할 것)를 팀별로 작성한다."
      ],
      "deliverable": "배포된 웹 데모(Streamlit) + 발표 슬라이드 5장 + 성능·한계 표 + KPT 회고 문서"
    }
  },
  "miniproject-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "OT · 미니프로젝트 개요와 평가 기준 안내"
      },
      {
        "time": "10:00–10:50",
        "topic": "주제 선정과 사용자 시나리오 정의"
      },
      {
        "time": "11:00–11:50",
        "topic": "[실습] 요구사항 명세서 한 장으로 정리하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "AI 서비스 아키텍처 설계 (LLM · RAG · Agent)"
      },
      {
        "time": "14:00–14:50",
        "topic": "데이터 플로우와 API 인터페이스 설계"
      },
      {
        "time": "15:00–15:50",
        "topic": "[실습] 기술 스택 선정과 개발 환경 셋업"
      },
      {
        "time": "16:00–16:50",
        "topic": "[실습] 프로젝트 폴더 구조 만들고 .env로 키 연결하기"
      },
      {
        "time": "17:00–17:50",
        "topic": "작업 분담 · 일정 수립과 Day1 회고"
      }
    ],
    "practice": {
      "title": "AI 서비스 기획서 + 동작하는 프로젝트 뼈대 만들기",
      "steps": [
        "팀별로 '해결하고 싶은 문제'를 한 문장으로 적는다. 예: '사내 규정 문서를 질문하면 근거와 함께 답해주는 챗봇'",
        "노션이나 종이에 사용자 시나리오를 3단계로 적는다 — 누가(사용자) → 무엇을 입력 → 어떤 결과를 기대",
        "터미널을 열고 'mkdir ai-mini && cd ai-mini' 로 프로젝트 폴더를 만든다",
        "'python -m venv .venv' 로 가상환경을 만들고 'source .venv/bin/activate'(윈도우는 .venv\\Scripts\\activate)로 켠다",
        "'pip install openai python-dotenv' 로 필수 라이브러리를 설치한다",
        "프로젝트 폴더에 .env 파일을 만들고 'OPENAI_API_KEY=sk-...' 한 줄을 적어 저장한다(키는 강사 제공)",
        "config.py를 만들어 .env의 키를 불러오는 코드를 작성한다(아래 realCode 참고)",
        "smoke_test.py를 만들어 LLM에게 '안녕'을 보내고 답이 오는지 확인한다",
        "'python smoke_test.py' 를 실행해 터미널에 모델의 한국어 인사 응답이 출력되면 환경 셋업 성공이다",
        "README.md에 주제·아키텍처 그림(글로 묘사)·역할 분담표를 적고 git으로 첫 커밋을 남긴다"
      ],
      "deliverable": "기획서(주제·시나리오·아키텍처·역할분담)와, LLM 호출이 성공하는 프로젝트 뼈대(폴더구조 + .env + smoke_test 통과 로그)"
    }
  },
  "miniproject-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "어제 설계 점검과 오늘 구현 목표 확정"
      },
      {
        "time": "10:00–10:50",
        "topic": "[실습] LLM 호출 모듈(llm.py) 구현"
      },
      {
        "time": "11:00–11:50",
        "topic": "[실습] RAG ① 문서 적재 · 청킹 · 임베딩 · 색인"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "[실습] RAG ② Retriever로 관련 문서 검색하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "[실습] Agent와 도구(Tool) 연동으로 기능 확장"
      },
      {
        "time": "15:00–15:50",
        "topic": "[실습] 전체 파이프라인 통합(입력→검색→생성→출력)"
      },
      {
        "time": "16:00–16:50",
        "topic": "[실습] 예외 처리와 안정화(빈 입력·키 오류 대응)"
      },
      {
        "time": "17:00–17:50",
        "topic": "중간 시연과 팀 상호 피드백"
      }
    ],
    "practice": {
      "title": "LLM + RAG를 묶은 '문서 기반 질의응답' 핵심 기능 완성",
      "steps": [
        "어제 모은 문서를 data/ 폴더에 둔 뒤, 'pip install scikit-learn numpy' 로 검색에 쓸 라이브러리를 추가 설치한다",
        "rag.py를 만들어 문서를 일정 길이로 자르는 청킹(chunking) 함수를 작성한다(아래 realCode 참고)",
        "각 조각을 임베딩(숫자 벡터)으로 바꾸고 리스트에 저장하는 색인 함수를 작성한다",
        "사용자 질문이 들어오면 가장 비슷한 조각 top-k를 찾아 돌려주는 search 함수를 작성한다",
        "llm.py에 검색된 조각을 프롬프트에 끼워 LLM에게 답을 시키는 함수를 작성한다",
        "app.py에서 '질문 입력 → search → LLM 답변 → 출력' 흐름을 한 줄기로 연결한다",
        "'python app.py' 를 실행하고 어제 정한 시나리오 질문을 입력해 본다",
        "답변과 함께 '근거 문서 조각'이 같이 출력되는지 확인한다(출처가 보이면 RAG 성공)",
        "빈 질문이나 관련 문서가 없을 때 프로그램이 죽지 않고 안내 메시지를 내도록 예외 처리를 추가한다",
        "동작하는 화면을 캡처하고 'git commit -m \"RAG 질의응답 구현\"' 으로 저장한다"
      ],
      "deliverable": "질문을 입력하면 우리 문서를 검색해 근거와 함께 답하는, 실행되는 RAG 챗봇 코드와 시연 캡처"
    }
  },
  "miniproject-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "오늘 목표 공유와 테스트 전략 안내"
      },
      {
        "time": "10:00–10:50",
        "topic": "[실습] 기능 테스트와 버그 수정"
      },
      {
        "time": "11:00–11:50",
        "topic": "[실습] requirements.txt 정리와 Dockerfile 작성"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "[실습] 컨테이너 빌드·실행으로 배포 환경 만들기"
      },
      {
        "time": "14:00–14:50",
        "topic": "[실습] 데모 시나리오 작성과 발표 리허설"
      },
      {
        "time": "15:00–15:50",
        "topic": "팀별 결과 발표 (시연 + 설명)"
      },
      {
        "time": "16:00–16:50",
        "topic": "상호 피드백과 코드 리뷰"
      },
      {
        "time": "17:00–17:50",
        "topic": "회고와 개선점 정리 · 수료"
      }
    ],
    "practice": {
      "title": "테스트로 버그를 잡고 Docker로 배포한 뒤 발표까지",
      "steps": [
        "어제 메모한 '잘 못 답하는 질문'을 다시 넣어 보며 문제를 재현한다",
        "청킹 크기(size)나 검색 개수(top_k) 값을 바꿔가며 답변이 좋아지는지 비교한다",
        "테스트 코드(test_app.py)를 만들어 핵심 함수가 기대대로 동작하는지 자동으로 확인한다",
        "'pip freeze > requirements.txt' 로 설치된 라이브러리 목록을 파일로 고정한다",
        "Dockerfile을 작성해 우리 앱을 어디서나 똑같이 실행할 수 있게 포장한다(아래 realCode 참고)",
        "'docker build -t ai-mini .' 로 이미지를 만들고 'docker run --env-file .env ai-mini' 로 실행해 본다",
        "컨테이너 안에서도 동일하게 질문·답변이 되는지 확인한다",
        "발표용 데모 시나리오(질문 3개 → 기대 답변)를 적고 한 번 리허설한다",
        "팀별로 화면을 공유하며 '문제→해결방법→시연→배운 점' 순서로 5분 발표한다",
        "다른 팀 발표에 피드백을 남기고, 우리 팀 개선점을 README에 정리해 마지막 커밋을 남긴다"
      ],
      "deliverable": "테스트를 통과하고 Docker로 실행되는 AI 서비스, 발표 자료(데모 시나리오), 회고가 담긴 최종 README와 커밋 이력"
    }
  }
}

export const planFor = (subjectId, day) => plans[`${subjectId}-${day}`] || null
