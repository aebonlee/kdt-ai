// 날짜별 8시간(09:00~17:50) 강의안 — subjectId-day 키.
//   plan = { schedule: [{time, topic, detail|lunch}], practice: {title, steps[], deliverable} }
//   schedule 은 교시표(periods)와 동기화되어 자동 생성됨.

export const plans = {
  "git-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "OT · 프로그래밍 개요: 프로그래밍 이해 · Frontend vs Backend · IT 용어"
      },
      {
        "time": "10:00–10:50",
        "topic": "개발환경 구축: VS Code 설치 · Workspace 만들기 · Git 설치/설정"
      },
      {
        "time": "11:00–11:50",
        "topic": "Git 기초 개념 + VS Code Source Control로 첫 커밋"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "Git 기초 명령어: init·add·commit·status·log·diff"
      },
      {
        "time": "14:00–14:50",
        "topic": ".gitignore · 되돌리기(restore/reset/revert)"
      },
      {
        "time": "15:00–15:50",
        "topic": "Remote Repository 이해 + GitHub 설정 · SSH 키 생성/등록"
      },
      {
        "time": "16:00–16:50",
        "topic": "원격 사용법: clone·push·pull · Sync Changes"
      },
      {
        "time": "17:00–17:50",
        "topic": "(심화) 브랜치 · 머지 · 충돌 · PR 협업 실습"
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
        "(대안) SSH 방식: `ssh-keygen -t ed25519` 로 키를 만들고 공개키(.pub)를 GitHub 의 Settings → SSH Keys 에 등록한 뒤, `git remote set-url origin git@github.com:계정/저장소.git` 처럼 원격 주소를 SSH 형식으로 바꿔 비밀번호 입력 없이 push 되는지 확인한다.",
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
        "topic": "[강의] LLM이 뭐길래? '다음 단어 맞히기' 게임으로 시작하기"
      },
      {
        "time": "10:00–10:50",
        "topic": "[강의] 토큰화(BPE)와 임베딩 — 글자를 숫자 벡터로 바꾸기"
      },
      {
        "time": "11:00–11:50",
        "topic": "[실습] 토크나이저로 문장 쪼개고 임베딩 벡터 직접 꺼내보기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "[강의] RNN·LSTM의 한계 — 한 줄로 서서 차례차례 읽기의 답답함"
      },
      {
        "time": "14:00–14:50",
        "topic": "[강의] Attention의 직관 — 중요한 문장에 형광펜 치기"
      },
      {
        "time": "15:00–15:50",
        "topic": "[강의] Self-Attention과 Query·Key·Value 삼총사"
      },
      {
        "time": "16:00–16:50",
        "topic": "[실습] Scaled Dot-Product Attention 손으로·NumPy로 계산하기"
      },
      {
        "time": "17:00–17:50",
        "topic": "[실습] Attention 가중치 히트맵으로 시각화하기"
      }
    ],
    "practice": {
      "title": "Self-Attention을 NumPy로 한 줄씩 만들고 가중치를 시각화하기",
      "steps": [
        "Colab 새 노트북을 열고 첫 셀에 `import numpy as np` 와 `import matplotlib.pyplot as plt` 를 입력해 실행한다.",
        "예문 '나는 학교에 갔다' 를 3개 토큰으로 보고, 각 토큰의 임베딩을 4차원 난수 행렬 X(3x4)로 만든다(np.random.seed(0)로 고정).",
        "가중치 행렬 Wq, Wk, Wv 를 각각 4x4 난수로 만들고 Q=X@Wq, K=X@Wk, V=X@Wv 를 계산한다.",
        "점수 행렬 scores = Q@K.T 를 구하고 sqrt(차원수=4)로 나눠 스케일링한다.",
        "softmax 함수를 직접 정의해 scores 의 각 행을 확률(합=1)로 바꿔 attention 가중치 A 를 만든다.",
        "print(A.sum(axis=1)) 로 각 행의 합이 1.0 인지 확인한다(기대 결과: [1. 1. 1.]).",
        "출력 output = A@V 를 계산하고 shape 이 (3,4)인지 print(output.shape)로 확인한다(기대 결과: (3, 4)).",
        "plt.imshow(A) 와 plt.colorbar() 로 가중치 히트맵을 그리고, 어떤 토큰이 어떤 토큰을 많이 보는지 눈으로 확인한다.",
        "토큰 라벨(나는/학교에/갔다)을 x·y축에 붙여 그림을 캡처한다."
      ],
      "deliverable": "Self-Attention 계산 노트북(.ipynb)과 attention 가중치 히트맵 이미지 1장"
    }
  },
  "transformer-2": {
    "schedule": [
      { "time": "09:00–09:50", "topic": "[강의] Multi-Head Attention — 여러 명이 각자 관점으로 읽기" },
      { "time": "10:00–10:50", "topic": "[강의] Positional Encoding·FFN·잔차연결(Residual)·LayerNorm 조립" },
      { "time": "11:00–11:50", "topic": "[강의] Encoder vs Decoder, 그리고 BERT·GPT·T5" },
      { "time": "12:00–13:00", "topic": "점심 휴식", "lunch": true },
      { "time": "13:00–13:50", "topic": "[실습] 사전학습 BERT로 문장 임베딩 뽑아 유사도 비교하기" },
      { "time": "14:00–14:50", "topic": "[강의] Transformer 이후 혁신 ① Scaling Law · In-Context Learning" },
      { "time": "15:00–15:50", "topic": "[강의] Transformer 이후 혁신 ② RLHF · MoE(Mixture of Experts)" },
      { "time": "16:00–16:50", "topic": "[강의] LLM 생태계: Open-Weight vs Closed, 벤치마크·Leaderboard" },
      { "time": "17:00–17:50", "topic": "[실습] GPT-2로 문장 생성하고 다음 토큰 확률 들여다보기" }
    ],
    "practice": {
      "title": "Lab 0. 손으로 만드는 bigram 언어모델 → 사전학습 GPT-2로 텍스트 생성·'다음 토큰 확률' 확인하기",
      "steps": [
        "[Lab 0] 짧은 예문(예: i love ai i love code i love you)을 단어 리스트로 만든다.",
        "[Lab 0] 연속한 (앞단어, 뒷단어) 쌍을 세어 bigram 카운트 표를 만든다.",
        "[Lab 0] 각 행을 합이 1이 되도록 나눠 다음-단어 확률표를 만든다(이 표 자체가 언어모델).",
        "[Lab 0] 'i' 다음 단어 확률을 출력해 love가 가장 높게 나오는지 확인한다.",
        "[Lab 0] 이 확률표로 다음 단어를 샘플링해 문장을 이어 생성해 본다.",
        "[Lab 0] 한계를 관찰한다: 바로 앞 한 단어만 보므로 긴 문맥을 못 살린다 — '그래서 Transformer가 필요하다'로 오후 GPT-2 실습에 연결한다.",
        "Colab에서 `pip install transformers torch` 로 라이브러리를 설치한다.",
        "import torch 와 from transformers import GPT2LMHeadModel, GPT2Tokenizer 로 torch·GPT-2 모델·토크나이저를 불러온다(torch는 뒤 확률 계산에 필요).",
        "model = GPT2LMHeadModel.from_pretrained('gpt2') 와 tokenizer = GPT2Tokenizer.from_pretrained('gpt2') 를 실행한다.",
        "프롬프트 'The future of AI is' 를 tokenizer로 인코딩해 input_ids 텐서를 만든다.",
        "model.generate(input_ids, max_length=20, pad_token_id=tokenizer.eos_token_id) 로 문장을 이어 생성하고 decode 해 출력한다(pad_token_id를 넣으면 pad 경고가 안 뜬다 · 기대 결과: 영어 문장이 자연스럽게 이어짐).",
        "다음 토큰 확률을 보려고 logits = model(input_ids).logits 의 마지막 위치(logits[0, -1])를 꺼내 probs = torch.softmax(그 값, dim=-1) 로 확률로 바꾼다.",
        "torch.topk(probs, 5) 로 가장 확률 높은 다음 토큰 5개와 확률을 출력한다.",
        "tokenizer.decode 로 그 5개 토큰을 사람이 읽는 단어로 바꿔 무엇을 예측했는지 확인한다.",
        "프롬프트를 'The future of AI is' 와 'I love' 두 가지로 바꿔, 예측 단어가 어떻게 달라지는지 비교 캡처한다.",
        "[제출물] 위 실습을 바탕으로 1~2페이지 '개발해석 보고서'를 작성한다 — ① 구현한 미니 언어모델(bigram→GPT-2) 구조, ② 이해한 Transformer 핵심 개념(토큰화·임베딩·Attention·다음 토큰 예측)을 자기 말로, ③ 생성 문장 예시와 모델의 한계를 실습 결과와 연결한 해석, ④ 실제 LLM과 미니모델의 차이·배운 점·개선 방향(성찰). 노트북(.ipynb)은 보조 자료로 함께 내면 좋다(선택)."
      ],
      "deliverable": "1~2페이지 개발해석 보고서(구현 모델 구조 + Transformer 핵심 개념 이해 + 결과 해석 + 성찰·개선방향)가 주 산출물. GPT-2 생성 결과·top-5 확률 노트북(.ipynb)은 선택(Optional). ※ 평가기준: 이해역량 55(구조이해 30·학습생성 25) + 해석역량 45(결과해석 25·성찰 20)"
    }
  },
  "transformer2-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "[강의] Software 1.0→3.0 — LLM, 언어가 인터페이스가 되다"
      },
      {
        "time": "10:00–10:50",
        "topic": "[강의] 토큰화와 임베딩 — 벡터 공간과 거리(맨해튼·유클리드)·유사도"
      },
      {
        "time": "11:00–11:50",
        "topic": "[강의] RNN·LSTM의 한계 — 순차 처리와 장기 의존성"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "[강의] Self-Attention과 Query·Key·Value, softmax로 확률 만들기"
      },
      {
        "time": "14:00–14:50",
        "topic": "[실습] 실습1-1 — PyTorch LSTM(CharLSTM)으로 한국어 문장 생성"
      },
      {
        "time": "15:00–15:50",
        "topic": "[실습] 실습1-1 — 장기 의존성 한계 관찰·생성 결과 캡처"
      },
      {
        "time": "16:00–16:50",
        "topic": "[실습] 실습1-2 — 사전학습 GPT-2로 같은 과제 재생성"
      },
      {
        "time": "17:00–17:50",
        "topic": "[실습] 실습1 마무리 — LSTM vs Transformer 비교 리포트 작성"
      }
    ],
    "practice": {
      "title": "실습1. 딥러닝(LSTM) vs Transformer 문장 생성 비교 — 개인 (practice_1-1, practice_1-2)",
      "steps": [
        "제공된 code.zip을 풀고 VS Code에서 실습 폴더를 연 뒤 `python3 -m venv .venv && source .venv/bin/activate` 로 가상환경을 만들고 `python -m pip install -r requirements-llm.txt` 로 torch·numpy 등 실습 패키지를 설치한다.",
        "[실습1-1 · practice_1-1.ipynb] 한국어 말뭉치를 문자 단위로 토큰화하고 정수 인덱스로 인코딩한 뒤, nn.Embedding → nn.LSTM(hidden_size=50, num_layers=2) → nn.Linear(hidden_size, vocab_size) 구조(CharLSTM)로 '다음 문자 예측' 언어모델을 구성한다.",
        "CrossEntropyLoss + Adam으로 학습 루프를 돌려 loss가 감소하는지 확인하고, 시작 토큰을 넣어 은닉상태(hidden state)를 순차 전달하며 문장을 자기회귀(autoregressive)로 생성한다.",
        "[한계 관찰] 문장이 길어질수록 앞부분 맥락(주어·인물관계)이 희석되는 장기 의존성(long-term dependency) 한계를, 긴 생성 예시로 직접 캡처한다 — 순차 처리라 병렬화가 어렵고 느리다는 점도 확인 → 'Transformer가 필요한 이유'로 연결한다.",
        "[실습1-2 · practice_1-2.ipynb] 같은 '다음 토큰 예측' 과제를 Transformer 계열 사전학습 모델로 다시 푼다 — transformers 라이브러리에서 GPT2Tokenizer·GPT2LMHeadModel을 from_pretrained('gpt2')로 불러와 문장을 생성한다(직접 구현이 아니라 사전학습 모델 활용).",
        "generate()에 attention_mask와 pad_token_id(eos 대체)를 지정해 실행하고, 내부적으로는 Self-Attention(Q·K·V, scaled dot-product QKᵀ/√d_k)·causal mask로 모든 위치를 한 번에 참조하며 다음 토큰을 예측한다는 점을 오전 강의(15~16교시) 내용과 연결한다.",
        "[비교 관찰] '직접 학습한 소형 LSTM' vs '사전학습된 대형 Transformer(GPT-2)'의 생성 결과를 나란히 캡처해 자연스러움·문맥 유지 차이를 비교하고, temperature·top_k 등 생성 파라미터 변화와 N²(문장 길이 제곱) 연산량·컨텍스트 윈도우 한계도 함께 짚는다.",
        "[제출물] LSTM·Transformer 생성 코드·결과와, 두 모델의 한계·개선점을 비교한 리포트를 작성한다."
      ],
      "deliverable": "LSTM 기반 생성 코드·결과 / Transformer 기반 생성 코드·결과 / 두 모델의 한계·개선점 비교 리포트. ※ 평가: 실습1 100점 = 1-1 LSTM(RNN) 문장생성 정상동작 40 + 1-2 Transformer 대체 문장생성 정상동작 60 (정상 동작 여부 중심)"
    },
    "figures": [
      {
        "origin": "practice",
        "src": "/images/manhattan-distance.svg",
        "title": "맨해튼 거리 vs 유클리드 거리",
        "caption": "격자 도시에서 가로·세로로만 이동한 거리의 합(L1, 노랑 실선)과 직선 거리(L2, 파랑 점선). 임베딩 벡터의 '가까움'을 재는 거리 척도의 출발점이다."
      },
      {
        "origin": "practice",
        "src": "/images/softmax.svg",
        "title": "소프트맥스 — 점수를 확률로",
        "caption": "출력층의 제각각인 점수(logits)를 0~1 확률로 정규화해 총합을 1로 만든다. 다음 토큰 확률 분포와 Self-Attention 가중치, 오늘 수업 두 곳 모두에 등장한다."
      }
    ]
  },
  "transformer2-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "[강의] 복습: LSTM→Transformer, LLM 추론(Inference) 파이프라인"
      },
      {
        "time": "10:00–10:50",
        "topic": "[강의] LLM을 API 레벨에서 쓰기 — 토큰=비용(usage)·CoT·SC·ReAct 복습"
      },
      {
        "time": "11:00–11:50",
        "topic": "[강의+실습] CrewAI 개념(Agent·Task·Crew) + 실습2 착수(팀 편성·.env)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "[실습] 실습2 ① Agent 정의 — Writer·Editor role·goal·backstory"
      },
      {
        "time": "14:00–14:50",
        "topic": "[실습] 실습2 ② Task·Crew 구성·kickoff 실행, usage로 비용 비교"
      },
      {
        "time": "15:00–15:50",
        "topic": "[실습] 실습2 ③ 가상데이터로 Biz 가치·서비스 시나리오 기획"
      },
      {
        "time": "16:00–16:50",
        "topic": "[실습] 실습2 ④ 팀 코드·발표자료(최소 3p) 마무리·리허설"
      },
      {
        "time": "17:00–17:50",
        "topic": "[발표] 팀별 발표·평가 — Biz가치 40 · 기술이해도 30 · 수업충실도 30"
      }
    ],
    "practice": {
      "title": "실습2. CrewAI로 Transformer 기반 LLM을 API 레벨에서 활용하는 에이전트 구현 — 팀 (practice_2.CrewAI_Agent_System)",
      "steps": [
        "`python -m pip install -r requirements-llm.txt` 로 crewai·openai 등을 설치하고, code/.env에 반별 OPENAI_API_KEY를 등록한다(키는 GitHub·공개 채널에 절대 공유 금지).",
        "[practice_2.CrewAI_Agent_System.ipynb] LLM API 호출이 내부적으로 토큰화 → 임베딩 → Self-Attention 연산 → 다음 토큰 예측(자기회귀)으로 이뤄지는 추론(Inference) 파이프라인을 응용 레벨에서 체감한다.",
        "Agent를 역할별로 정의한다 — 예: Writer(초안 생성)·Editor(교정·검수). 각 Agent에 role·goal·backstory와 사용할 LLM(gpt-4o 등)·temperature를 지정한다.",
        "Task를 정의해 Agent에 배정한다(예: Plan → Write → Edit). Task 설명에는 CoT(단계별 사고)·ReAct(Thought→Action→Observation) 스타일 지시를 반영해 안정적으로 동작하게 한다.",
        "Crew(agents, tasks, process=sequential)를 구성하고 crew.kickoff()로 실행한다. 응답의 usage(token 사용량)로 동일 의미라도 한국어가 영어보다 토큰을 더 소모(=비용·지연 증가)함을 확인한다.",
        "다단계 에이전트는 매 호출마다 추론 파이프라인 전체를 반복하므로 속도·비용이 누적됨을 관찰하고, 프롬프트 길이·호출 횟수·max_tokens를 줄이는 최적화를 적용한다(반별 API 크레딧 절약).",
        "제공된 가상 데이터(고객상담이력·B2B계약서·거래데이터셋·사내정책FAQ)로 이해관계자를 추정하고 Biz 가치가 있는 AI 서비스 시나리오를 기획한다.",
        "[제출물] 팀 단위 에이전트 구현 코드와, 서비스 시나리오 기획서를 발표자료(최소 3페이지)로 정리한다."
      ],
      "deliverable": "팀 단위 에이전트 구현 코드(.ipynb) + 서비스 시나리오 기획 발표자료(최소 3페이지, Biz가치·기술이해·수업충실 어필). ※ 평가: 실습2 100점 = Biz가치 40 + 기술이해도 30 + 수업충실도 30 · 평가결과에 개인별 점수·판단근거·보완사항 필수 · 팀 편성=좌석표 기준(6인석 → 3+3, 4인석 → 4인)"
    }
  },
  "python-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 개발환경과 실행 구조 (Homebrew · Python 3.11 · venv · AST→PVM)"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] venv 생성 · pip · requirements.txt · VS Code 설정"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 자료구조 시간복잡도 · 컴프리헨션 · 제너레이터"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] dataclass · TypedDict 로 데이터 모델링"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 함수 · 파일 · 예외 (functools · Parquet · pathlib)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 타입 힌트 · Pydantic · mypy"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 코드 품질과 테스트: Ruff · pytest · 디버거"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [메인 실습] 비동기 · 병렬 (asyncio · httpx · 멀티프로세싱)"
      }
    ],
    "practice": {
      "title": "공공 API 데이터를 비동기로 수집→검증→저장하는 재현 가능한 파이프라인 만들기",
      "steps": [
        "터미널에서 `python -m venv .venv` 로 가상환경을 만들고 활성화한 뒤, `pip install httpx pydantic pyarrow pandas pytest ruff` 를 설치하고 `pip freeze > requirements.txt` 로 버전을 고정한다.",
        "무료 공공 API(예: 공공데이터포털·오픈 API) 하나를 정하고, `httpx.AsyncClient` 로 여러 페이지를 `asyncio.gather` 로 동시에 받아 오는 비동기 수집 함수를 작성한다.",
        "받아 온 각 레코드를 Pydantic 모델(BaseModel)로 정의해 필수 필드·타입을 검증하고, 형식이 어긋나는 레코드는 걸러 내거나 오류를 남긴다.",
        "검증을 통과한 레코드를 pandas DataFrame 으로 모아 `to_parquet` 로 Parquet 파일에 저장한다(같은 데이터를 CSV 대신 Parquet 로 저장하는 이유를 한 줄 메모).",
        "핵심 함수(수집·검증·저장)에 대해 pytest 테스트를 최소 2개 작성해 `pytest` 로 모두 통과하는지 확인한다.",
        "`ruff check .` 로 코드 스타일·오류를 검사하고 지적된 부분을 고쳐 통과시킨다.",
        "전체 실행 스크립트(`main.py`)를 한 번 돌려 '수집 → 검증 → Parquet 저장'이 끊김 없이 완료되는지 확인한다.",
        "`git init` 후 requirements.txt 를 포함해 커밋하고, 다른 사람이 clone 해 `pip install -r requirements.txt` 만으로 똑같이 재현되는지 점검한다."
      ],
      "deliverable": "재현 가능한(requirements.txt 포함) Git 저장소와 공공 API 수집·Pydantic 검증·Parquet 저장 스크립트, pytest 통과 로그"
    }
  },
  "python-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 Pandas 2.x 실전 · Copy-on-Write 이해"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] groupby · pivot_table · merge"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 Polars Lazy API · Pandas 성능 비교"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] DuckDB로 Parquet에 SQL 질의하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 시각화(Plotly · Altair) · Streamlit 소개"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 기초 통계 · 가설 검정"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 sklearn Pipeline · joblib · 분석 자동화(schedule · Jinja2)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [메인 실습] 공개 데이터 EDA→시각화+통계→Pipeline 모델→GitHub"
      }
    ],
    "practice": {
      "title": "공개 데이터로 EDA→시각화+통계→Pipeline 모델까지 만들어 GitHub에 올리기",
      "steps": [
        "가상환경에 `pip install polars pandas pyarrow plotly scipy scikit-learn joblib` 를 설치하고, 공개 데이터셋(예: seaborn 'tips'나 공공데이터 CSV) 하나를 정한다.",
        "Polars(또는 Pandas)로 데이터를 불러와 결측치·타입을 정리하고, groupby/pivot 으로 핵심 지표를 요약하는 EDA 를 수행한다(같은 집계를 Polars Lazy 로도 해 보며 속도를 비교).",
        "Plotly(또는 Altair)로 분포·관계를 보여 주는 그래프를 2개 이상 그려, 데이터에서 눈에 띄는 패턴을 캡처한다.",
        "두 그룹의 평균 차이를 검증하는 가설 검정을 수행한다: `scipy.stats.ttest_ind` 로 t-test 를 돌리고 p-value 로 결론(유의미/아님)을 적는다.",
        "예측 목표를 하나 정하고, `make_pipeline(StandardScaler(), 모델)` 형태의 sklearn Pipeline 으로 학습·평가한 뒤 `joblib.dump` 로 모델을 파일로 저장한다.",
        "프로젝트를 data/ · notebooks/ · src/ 처럼 폴더 구조로 정리하고 README 에 분석 요약을 적는다.",
        "`git init` 후 전체를 커밋하고 GitHub 저장소에 push 해, 링크로 결과가 재현·확인되는지 점검한다."
      ],
      "deliverable": "Polars/Pandas EDA + Plotly 시각화 + t-test + Pipeline 모델(joblib 저장)을 담고 폴더 구조로 정리해 GitHub에 올린 프로젝트"
    }
  },
  "prompt-1": {
    "schedule": [
      { "time": "09:00–09:50", "topic": "1교시 (이론) LLM은 어떻게 답을 만들까 - 다음 단어 예측과 프롬프트의 역할" },
      { "time": "10:00–10:50", "topic": "2교시 (이론) Prompt Design Framework: 역할·지시·예시·제약 뜯어보기" },
      { "time": "11:00–11:50", "topic": "3교시 실습: 나쁜 프롬프트를 좋은 프롬프트로 바꿔보기" },
      { "time": "12:00–13:00", "topic": "점심 휴식", "lunch": true },
      { "time": "13:00–13:50", "topic": "4교시 (이론) 주요 기법: Zero-shot / Few-shot / Chain-of-Thought" },
      { "time": "14:00–14:50", "topic": "5교시 (이론) System·User·Assistant 메시지 설계와 역할 분리" },
      { "time": "15:00–15:50", "topic": "6교시 실습: 시장조사 프롬프트에 Few-shot·형식지정 적용하기" },
      { "time": "16:00–16:50", "topic": "7교시 (이론) 컨텍스트 윈도우·토큰 비용과 Context Engineering(맥락 설계)" },
      { "time": "17:00–17:50", "topic": "8교시 실습: 리서치 결과 기반 의사결정 프롬프트 체이닝 + 개선" }
    ],
    "practice": {
      "title": "신제품 시장조사 → 전략 도출 → 의사결정을 돕는 리서치 프롬프트 완성하기",
      "steps": [
        "1단계: 조사할 제품·시장 주제를 한 문장으로 정한다(예: '20대를 겨냥한 친환경 텀블러 시장').",
        "2단계: 역할('너는 시장조사 애널리스트다')·지시('경쟁사 3곳, 타깃 고객, 강점·약점을 표로 정리해줘')·제약('추측한 내용은 「추정」이라고 표시하고, 맨 끝에 5줄 이내 요약을 붙일 것')을 갖춘 프롬프트를 작성해 실행한다.",
        "3단계: 나온 결과에서 빠진 항목(가격대·시장 리스크·규제 등)을 찾아, 지시에 그 항목을 추가해 프롬프트를 보강하고 다시 실행한다.",
        "4단계: 조사 결과를 근거로 '시장 진입 / 보류'를 추천하고 그 이유 3가지를 뽑게 하는 후속 프롬프트를 만들어, 앞 결과를 입력으로 이어 붙인다(프롬프트 체이닝).",
        "5단계: Few-shot 예시(좋은 조사표 1개)와 출력 형식 지정(표·머리말·요약 위치)을 더해, 결과 형식이 일정하게 나오도록 다듬는다.",
        "6단계: 개선 전 프롬프트의 결과와 개선 후 결과를 나란히 캡처해, 무엇이 좋아졌는지(누락 항목 채움·형식 일관·근거 표시) 한눈에 비교한다.",
        "7단계: 완성 프롬프트가 '시장조사 표 → 전략 요약 → 진입/보류 추천'까지 한 번에 이어지는지 다른 주제로 한 번 더 실행해 재현되는지 확인한다."
      ],
      "deliverable": "'시장조사 표 + 전략 요약 + 의사결정 추천'을 산출하는 완성 프롬프트(체이닝 포함)와 개선 전후 비교 캡처 1장"
    }
  },
  "vue-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 Vue 소개와 왜 프레임워크가 필요한가 (개념)"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 Vite로 첫 Vue 프로젝트 만들기 (실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 SFC 구조와 첫 컴포넌트 화면에 띄우기 (실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 반응형 상태 ref와 reactive 이해 (실습)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 템플릿 문법과 디렉티브 v-if·v-for·v-bind (실습)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 이벤트 v-on과 폼 바인딩 v-model (실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 computed와 watch로 파생 상태 다루기 (실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 미니 실습: 반응형 카운터·할 일 목록 UI (실습)"
      }
    ],
    "practice": {
      "title": "반응형 할 일(To-Do) 목록 UI 만들기",
      "steps": [
        "터미널에서 'npm create vite@latest my-vue -- --template vue' 명령으로 Vue 프로젝트 뼈대를 생성한다",
        "'cd my-vue' 후 'npm install' 로 의존성을 내려받고 'npm run dev' 로 개발 서버를 켜서 브라우저 http://localhost:5173 화면을 확인한다",
        "src/App.vue 파일을 열고 기존 내용을 지운 뒤 <script setup>·<template>·<style> 세 칸으로 된 빈 SFC 골격을 만든다",
        "<script setup> 안에서 'import { ref } from \"vue\"' 를 적고, 할 일 배열 todos = ref([]) 와 입력값 text = ref('') 를 선언한다",
        "addTodo 함수를 만들어 입력값이 비어있지 않으면 todos 배열에 {id, title, done:false} 객체를 push 하고 text 를 다시 빈 문자열로 비운다",
        "<template> 에 <input v-model=\"text\"> 와 <button @click=\"addTodo\"> 를 배치하고, <ul> 안에서 v-for 로 todos 를 돌며 <li> 로 출력한다",
        "각 <li> 의 체크박스에 v-model=\"todo.done\" 을 연결하고, 완료된 항목은 :class 로 취소선 스타일이 붙도록 한다",
        "computed 로 '남은 할 일 개수' remaining 을 만들어 화면 상단에 {{ remaining }} 로 표시한다",
        "브라우저에서 할 일을 입력→추가→체크해 보며 화면이 즉시 바뀌는지(반응형) 눈으로 확인한다",
        "완성 화면을 캡처하고 App.vue 전체 코드를 저장한다"
      ],
      "deliverable": "할 일을 추가·완료 체크·남은 개수 표시가 동작하는 App.vue 파일과 실행 화면 캡처"
    }
  },
  "vue-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 컴포넌트로 화면 쪼개기 (개념·실습)"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 props 로 부모→자식 데이터 내려주기 (실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 emit 으로 자식→부모 이벤트 올려보내기 (실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 slot 으로 내용 끼워넣기 (실습)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 라이프사이클 훅과 onMounted (실습)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 Composition API와 setup 패턴 (실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 컴포저블(useXxx)로 로직 재사용 (실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 미니 실습: 목록·아이템 컴포넌트 분리 (실습)"
      }
    ],
    "practice": {
      "title": "목록(List)·아이템(Item) 컴포넌트로 분리한 회원 카드",
      "steps": [
        "src/components 폴더를 만들고 그 안에 UserItem.vue 파일을 새로 생성한다",
        "UserItem.vue 에서 defineProps 로 user 객체를 props 로 받도록 선언하고, <template> 에 이름·이메일을 표시한다",
        "UserItem 에 '삭제' 버튼을 두고 defineEmits 로 'remove' 이벤트를 정의해 클릭 시 user.id 를 부모로 올려보낸다",
        "App.vue 에서 users = ref([...]) 배열을 만들고 <UserItem> 을 import 한다",
        "App.vue 의 <template> 에서 v-for 로 users 를 돌며 <UserItem :user=\"u\" @remove=\"removeUser\"> 를 렌더링한다",
        "removeUser(id) 함수를 만들어 해당 id 를 가진 회원을 users 배열에서 filter 로 제거한다",
        "브라우저에서 삭제 버튼을 눌렀을 때 해당 카드만 사라지는지 확인한다(자식→부모 통신 검증)",
        "slot 을 활용해 UserItem 카드 하단에 부모가 원하는 내용을 끼워넣을 수 있게 <slot> 을 추가한다",
        "완성된 두 파일의 코드와 동작 화면을 캡처해 저장한다"
      ],
      "deliverable": "props·emit·slot 을 모두 사용한 UserItem.vue 와 App.vue, 삭제 동작 화면 캡처"
    }
  },
  "vue-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 SPA와 라우팅 개념 이해 (개념)"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 Vue Router 설치와 기본 라우트 (실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 router-link·router-view로 페이지 이동 (실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 동적 파라미터와 중첩 라우트 (실습)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 네비게이션 가드로 접근 제어 (실습)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 Pinia 설치와 스토어 만들기 (실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 state·getters·actions 다루기 (실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 미니 실습: 목록·상세 라우팅 + 전역 장바구니 (실습)"
      }
    ],
    "practice": {
      "title": "상품 목록·상세 라우팅 + Pinia 전역 장바구니",
      "steps": [
        "'npm install vue-router@4 pinia' 로 라우터와 상태관리 라이브러리를 설치한다",
        "src/router/index.js 를 만들어 '/'(목록)와 '/product/:id'(상세) 두 라우트를 정의한다",
        "main.js 에서 app.use(router) 와 app.use(createPinia()) 를 등록한다",
        "App.vue 에 <router-view /> 를 두어 현재 라우트에 맞는 페이지가 표시되도록 한다",
        "ProductList.vue 에서 상품들을 v-for 로 출력하고 <router-link :to=\"'/product/'+p.id\"> 로 상세로 이동하게 한다",
        "ProductDetail.vue 에서 useRoute().params.id 로 어떤 상품인지 읽어 화면에 표시한다",
        "stores/cart.js 에 defineStore 로 장바구니 스토어를 만들고 items 상태와 add 액션을 정의한다",
        "상세 페이지의 '담기' 버튼이 cart 스토어의 add 를 호출하게 하고, 헤더에 담긴 개수를 표시한다",
        "목록→상세 이동, 담기, 헤더 개수 증가가 새로고침 없이 동작하는지 브라우저에서 확인한다"
      ],
      "deliverable": "라우터 설정·두 페이지·Pinia 장바구니 스토어가 연동되어 동작하는 미니 앱과 화면 캡처"
    }
  },
  "vue-4": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 비동기와 API 통신 개념 (개념)"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 fetch·axios로 데이터 불러오기 (실습)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 로딩·에러 상태 처리 패턴 (실습)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 UI Library — Element Plus로 컴포넌트·폼·테이블 붙이기 (실습)"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 Modern JS(ES6+): 구조분해·전개·고차함수 (실습)"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 ESLint·Prettier로 코드 품질 검사 설정 (실습)"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 Vite 빌드와 정적 배포 (실습)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 최종 실습: SPA 완성·배포·점검 (실습)"
      }
    ],
    "practice": {
      "title": "공개 API로 게시글을 불러오는 미니 SPA 완성·배포",
      "steps": [
        "'npm install axios' 로 HTTP 통신 라이브러리를 설치한다",
        "프로젝트 루트에 .env 파일을 만들어 VITE_API_BASE=https://jsonplaceholder.typicode.com 를 적는다",
        "src/api.js 에서 axios.create 로 baseURL 을 import.meta.env.VITE_API_BASE 로 설정한 인스턴스를 만든다",
        "PostList.vue 의 onMounted 에서 api.get('/posts') 를 호출해 게시글 목록을 불러오고, 불러오는 동안 loading 을 true 로 둔다",
        "통신 성공 시 데이터를 posts 에 담고, 실패 시 error 메시지를 화면에 표시한다(try/catch)",
        "v-if 로 loading·error·정상 상태에 따라 다른 화면을 보여준다",
        "글 작성 폼을 만들어 제목이 비어 있으면 '제목을 입력하세요' 경고를 띄우는 유효성 검사를 넣는다",
        "목록·폼 UI를 Element Plus 컴포넌트(el-table·el-form 등)로 교체하고, 구조분해·전개 같은 ES6+ 문법으로 코드를 정리한 뒤 `npx eslint .` 로 검사해 지적사항을 고친다",
        "'npm run build' 로 dist 폴더를 생성하고 'npm run preview' 로 빌드 결과를 확인한다",
        "dist 폴더를 정적 호스팅(GitHub Pages 등)에 올려 실제 주소에서 동작을 확인한다",
        "최종 동작 화면(목록·로딩·에러·폼)과 배포 주소를 캡처해 제출한다"
      ],
      "deliverable": "API 연동·로딩/에러 처리·폼 검증이 동작하는 미니 SPA와 배포된 URL, 화면 캡처"
    }
  },
  "webproject-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 OT · 과정 소개 · 웹서비스 개념 + 제출 산출물 목록 · 평가 기준 공유"
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
        "서비스에 넣을 AI 기능 1개를 정하고 '입력 → 출력 → 화면 표시 위치'를 한 문장으로 적는다(예: '메모를 입력하면 한 줄 요약을 만들어 카드 아래에 보여준다').",
        "제출 산출물 체크리스트와 평가 기준을 팀 README 상단에 붙여, 무엇을 언제까지 내야 하는지 팀 전체가 같은 기준을 공유한다.",
        "사용자 시나리오를 '누가 / 언제 / 무엇을 하고 싶다' 형식으로 3개 적는다.",
        "종이나 Figma에 메인 화면, 목록 화면, 상세/입력 화면 3개의 와이어프레임을 그린다.",
        "기능 명세서를 표로 만들고 각 기능에 '필수/선택' 우선순위를 표시한다.",
        "화면에 보여줄 데이터를 JSON 한 덩어리(목업)로 작성해 data/mock.json 으로 저장한다.",
        "터미널에서 'npm create vite@latest my-web -- --template vue' 를 실행해 Vue 프로젝트를 만든다.",
        "'cd my-web' 후 'npm install' 로 패키지를 설치하고 'npm run dev' 로 서버를 켠다.",
        "브라우저에서 http://localhost:5173 에 접속해 Vite 기본 화면이 뜨는지 확인한다(기대 결과: Vue 로고가 보이는 시작 페이지).",
        "README.md 에 주제·기능 목록·담당자·일정을 적어 커밋한다."
      ],
      "deliverable": "기획서(주제·AI 기능 정의 한 문장·시나리오·기능명세)+와이어프레임 3장+mock.json+실행되는 Vue 프로젝트 초기 저장소"
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
        "서비스에 넣기로 한 AI 기능 1개를, LLM API에 요청을 보내고 받은 결과를 화면에 표시하는 형태로 구현한다(예: 메모 저장 시 한 줄 요약을 함께 보여주기).",
        "동작이 확인되면 'git commit -m \"핵심 화면 구현\"' 으로 저장한다."
      ],
      "deliverable": "목록→상세 이동·새 글 추가·유효성 검사와 AI 기능 1개가 실제로 동작하는 Vue 앱(중간 빌드)"
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
        "topic": "1교시 Spring AI란? — 자바 백엔드와 LLM을 잇는 다리"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 [실습] 개발환경 준비 — JDK·Spring Boot·의존성 추가"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] ChatClient/ChatModel 추상화 첫 호출"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] application.yml로 모델 프로바이더(OpenAI·Anthropic) 설정"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 PromptTemplate과 구조화된 메시지(System/User) 설계"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] 채팅 응답 REST API 만들기 — Controller·Service"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습·메인] 채팅 API 엔드투엔드 완성"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 응답 확인·트러블슈팅·정리"
      }
    ],
    "practice": {
      "title": "채팅 응답 REST API 구현 (브라우저에서 질문하면 LLM이 답하는 API)",
      "steps": [
        "start.spring.io에 접속해 Project=Gradle, Language=Java, Spring Boot 3.x를 고르고 Dependencies에 'Spring Web'과 'Anthropic'(또는 OpenAI)을 추가해 프로젝트 zip을 내려받는다.",
        "내려받은 zip을 풀고 IntelliJ로 폴더를 열어 Gradle 동기화가 끝날 때까지 기다린다(오른쪽 아래 진행바가 사라지면 완료).",
        "터미널에서 'export ANTHROPIC_API_KEY=발급받은키' 를 입력해 API 키를 환경변수로 등록한다(코드에 키를 직접 적지 않기 위함).",
        "src/main/resources/application.yml 파일을 만들고 spring.ai.anthropic.api-key 등 모델 설정을 적는다.",
        "com.example.springai.chat 패키지를 만들고 ChatController.java 를 작성해 GET /api/chat 엔드포인트를 만든다.",
        "터미널에서 './gradlew bootRun' 을 실행해 서버를 8080 포트로 띄운다(콘솔에 'Started ...Application' 이 보이면 성공).",
        "브라우저 주소창에 'http://localhost:8080/api/chat?message=스프링을 한 문장으로 소개해줘' 를 입력해 호출한다.",
        "기대 결과: 화면에 LLM이 생성한 한국어 답변 문장이 그대로 출력된다.",
        "답변이 깨지지 않는지 확인하고 message 값을 바꿔가며 2~3번 더 테스트한다."
      ],
      "deliverable": "GET /api/chat?message=... 호출 시 LLM 답변을 반환하는 동작하는 Spring Boot 프로젝트(스크린샷 포함)"
    }
  },
  "spring-ai-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 RAG가 필요한 이유 — LLM이 '모르는 것'을 문서로 채우기"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 임베딩(Embedding)이란 — 문장을 숫자 벡터로 바꾸기"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] VectorStore와 pgvector 연동·설정"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] 문서 읽기·쪼개기 — DocumentReader/TextSplitter"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 [실습] 문서를 벡터로 저장하기 — VectorStore 적재"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 검색 결합 프롬프트(RAG) 구성 원리"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습·메인] 사내 문서 QA API 만들기"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 [실습] 질의 테스트·정확도 점검·정리"
      }
    ],
    "practice": {
      "title": "사내 문서 QA API (문서를 읽고 질문하면 근거 기반으로 답하는 API)",
      "steps": [
        "docker로 pgvector(벡터 저장이 가능한 PostgreSQL)를 띄운다: 'docker run -d --name pgvector -e POSTGRES_PASSWORD=pass -p 5432:5432 pgvector/pgvector:pg16'.",
        "build.gradle에 'spring-ai-starter-vector-store-pgvector'와 임베딩 모델 의존성을 추가하고 Gradle을 동기화한다.",
        "application.yml에 datasource(DB 접속 정보)와 spring.ai 임베딩 모델 설정을 적는다.",
        "src/main/resources/docs 폴더에 사내 규정 텍스트 파일(employee_guide.txt)을 하나 넣는다.",
        "IngestionService(또는 QnaService.ingest)를 만들어 TextReader로 문서를 읽고 TokenTextSplitter로 쪼갠 뒤 vectorStore.add()로 저장한다.",
        "애플리케이션을 한 번 실행해 문서가 DB에 벡터로 적재되는지 확인한다(콘솔 로그로 적재 개수 출력).",
        "QnaService.ask를 만들어 질문을 임베딩→유사 문단 검색→프롬프트 결합→LLM 호출 순서로 처리한다.",
        "GET /api/qa?question=연차는 며칠인가요 를 호출한다.",
        "기대 결과: 문서 내용에 근거한 답변이 반환된다.",
        "문서에 없는 질문을 던져 '문서에서 찾을 수 없음'에 가까운 답이 나오는지(환각이 줄었는지) 확인한다."
      ],
      "deliverable": "문서를 벡터로 적재하고 GET /api/qa?question=... 로 근거 기반 답변을 주는 RAG API 프로젝트"
    }
  },
  "spring-ai-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "1교시 MCP(Model Context Protocol) 개념 — 왜 필요한가"
      },
      {
        "time": "10:00–10:50",
        "topic": "2교시 MCP Protocol 구조 (STDIO vs Streamable HTTP)"
      },
      {
        "time": "11:00–11:50",
        "topic": "3교시 [실습] 자바 MCP Server 만들기 (@Tool로 도구 노출)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "4교시 [실습] MCP Client 연결 · 도구 호출 확인"
      },
      {
        "time": "14:00–14:50",
        "topic": "5교시 AI Agent 개념 · Single vs Multi Agent"
      },
      {
        "time": "15:00–15:50",
        "topic": "6교시 [실습] MCP 도구를 쓰는 Single Agent 구성"
      },
      {
        "time": "16:00–16:50",
        "topic": "7교시 [실습·메인] MCP 서버 기반 AI Agent 완성 (목표를 주면 스스로 도구 호출)"
      },
      {
        "time": "17:00–17:50",
        "topic": "8교시 시연 · Quiz · 회고"
      }
    ],
    "practice": {
      "title": "MCP 서버 기반 AI Agent 개발 — 직접 만든 자바 MCP Server의 도구를 에이전트가 자율 호출해 과제 수행",
      "steps": [
        "Spring Boot 프로젝트에 MCP Server 스타터 의존성을 추가하고, com.example.mcp 패키지에 도구를 노출할 서비스 클래스를 만든다.",
        "예: searchProduct(String keyword) 또는 getWeather(String city) 메서드에 @Tool 애너테이션과 description(LLM이 언제 쓸지 알 수 있는 설명)을 붙여 MCP 도구로 노출한다.",
        "MCP Server를 STDIO 또는 Streamable HTTP 방식으로 띄우고, MCP Client(또는 Inspector)로 연결해 노출된 도구 목록이 보이고 직접 호출하면 결과가 오는지 확인한다.",
        "AI Agent 쪽에서 ChatClient에 이 MCP 도구들을 연결해, 사용자가 목표(예: '이 조건에 맞는 상품을 찾아 요약해줘')를 주면 에이전트가 필요한 도구를 스스로 골라 호출하도록 구성한다.",
        "Single Agent가 한 번의 목표에 대해 '판단 → 도구 호출 → 결과 반영 → 답변'까지 한 흐름으로 처리하는지 실행해 확인한다.",
        "도구가 필요 없는 질문(예: '안녕')에는 도구를 부르지 않고 바로 답하는지 비교해, 에이전트가 상황에 맞게 도구 사용을 결정하는지 검증한다.",
        "예외·타임아웃을 대비해 도구 호출을 try-catch로 감싸 실패 시에도 서비스가 멈추지 않고 안내 메시지를 반환하게 한다.",
        "최종 시연 시나리오(목표 → 에이전트의 도구 호출 → 완성된 답)를 정하고 스크린샷으로 남긴다."
      ],
      "deliverable": "직접 만든 자바 MCP Server + 그 서버의 도구를 자율 호출해 과제를 수행하는 AI Agent 애플리케이션(시연 스크린샷 포함)"
    }
  },
  "sllm-1": {
    "schedule": [
      { "time": "09:00–09:50", "topic": "1교시 — sLLM이 뭐길래? LLM 서빙 파이프라인과 작은 LLM의 정체" },
      { "time": "10:00–10:50", "topic": "2교시 — MLM vs CLM 구조 비교, LLM vs sLLM(토크나이저·임베딩·경량화)" },
      { "time": "11:00–11:50", "topic": "3교시 [실습] Hugging Face 모델 카드 읽고 첫 추론 돌려보기" },
      { "time": "12:00–13:00", "topic": "점심 휴식", "lunch": true },
      { "time": "13:00–13:50", "topic": "4교시 — 양자화(quantization)와 On-Device 추론" },
      { "time": "14:00–14:50", "topic": "5교시 [실습] Ollama로 로컬에서 모델 채팅 띄우기" },
      { "time": "15:00–15:50", "topic": "6교시 — sLLM Use Case 시나리오: DBMS·영업비밀·개인정보 등 보안 민감 영역" },
      { "time": "16:00–16:50", "topic": "7교시 — PEFT·LoRA 맛보기: 통째로 안 바꾸고 살짝만 고치는 학습" },
      { "time": "17:00–17:50", "topic": "8교시 [실습] 로컬 모델을 API로 호출하는 미니 챗봇 완성·점검" }
    ],
    "practice": {
      "title": "내 컴퓨터에 작은 LLM 올려서 채팅 API 만들기 (Ollama + Python)",
      "steps": [
        "터미널을 열고 'ollama --version' 을 입력해 Ollama가 설치되어 있는지 확인한다(없으면 ollama.com에서 설치).",
        "'ollama pull qwen2.5:0.5b' 명령으로 0.5B 크기의 아주 작은 모델을 내려받는다(용량이 작아 노트북에서도 돈다).",
        "'ollama run qwen2.5:0.5b' 를 실행하고 '안녕? 너 누구야?' 라고 입력해 모델이 한국어로 답하는지 본다.",
        "새 터미널에서 'pip install requests' 로 HTTP 요청 라이브러리를 설치한다.",
        "VS Code에서 chat.py 파일을 만들고, localhost:11434/api/chat 으로 요청을 보내는 코드를 작성한다(아래 realCode 참고).",
        "코드에 system 메시지로 '너는 친절한 한국어 비서야' 라는 역할을 넣어 모델의 말투를 고정한다.",
        "'python chat.py' 로 실행하고 '파이썬으로 1부터 10까지 더하는 법 알려줘' 라고 물어본다.",
        "기대 결과: 터미널에 모델이 생성한 한국어 답변과 짧은 파이썬 코드가 출력된다.",
        "temperature 값을 0.2와 1.0으로 각각 바꿔 실행해 답변의 일관성·창의성 차이를 비교한다.",
        "마지막으로 대화 내용을 result.txt 파일로 저장하는 코드를 추가해 결과를 남긴다."
      ],
      "deliverable": "로컬 sLLM과 대화한 chat.py 소스 + 실행 화면 캡처 + 저장된 result.txt"
    }
  },
  "sllm-2": {
    "schedule": [
      { "time": "09:00–09:50", "topic": "1교시 — sLLM·PEFT 최신 동향: 온디바이스 붐 · 증류로 똑똑해진 소형모델 · QLoRA 이후 신기법(학계/업계/현장)" },
      { "time": "10:00–10:50", "topic": "2교시 — 파인튜닝이 뭐고 언제 쓰나? PEFT가 필요한 이유 + 변형 비교(LoRA·QLoRA vs Adapter vs Prefix/Prompt tuning)" },
      { "time": "11:00–11:50", "topic": "3교시 — 목적별 PEFT 선택 가이드(도메인 지식·극소 파라미터·추론 강화)" },
      { "time": "12:00–13:00", "topic": "점심 휴식", "lunch": true },
      { "time": "13:00–13:50", "topic": "4교시 [실습] instruction 데이터 JSONL 가공 + LoRA 학습 코드 작성" },
      { "time": "14:00–14:50", "topic": "5교시 [실습] LoRA 첫 학습 돌리고 loss 곡선 보기" },
      { "time": "15:00–15:50", "topic": "6교시 — sLLM 서비스 파이프라인: 임베딩 연결·Vector DB 선정·설계" },
      { "time": "16:00–16:50", "topic": "7교시 [실습] sLLM + Vector DB(RAG) 연동해 보기" },
      { "time": "17:00–17:50", "topic": "8교시 [실습] 학습한 LoRA 합쳐 추론·서빙 배포·마무리" }
    ],
    "practice": {
      "title": "내 말투·도메인으로 sLLM 파인튜닝하기 (QLoRA, Colab)",
      "steps": [
        "Google Colab에서 새 노트북을 만들고 메뉴 '런타임 > 런타임 유형 변경'에서 GPU(T4)를 선택한다.",
        "첫 셀에 '!pip install transformers peft datasets bitsandbytes accelerate trl' 를 입력해 라이브러리를 설치한다.",
        "지시-출력 쌍 10~20개를 직접 만들어 data.jsonl 파일로 저장한다(예: 사내 용어를 설명하게 가르치기).",
        "datasets.load_dataset 으로 data.jsonl 을 불러와 학습 형식(프롬프트 템플릿)으로 변환한다.",
        "4비트 양자화 설정(BitsAndBytesConfig)으로 베이스 모델을 메모리 적게 불러온다.",
        "LoraConfig 로 r=8, target_modules 를 지정해 LoRA 어댑터를 모델에 붙인다.",
        "SFTTrainer 에 모델·데이터·학습설정을 넣고 trainer.train() 으로 학습을 시작한다.",
        "기대 결과: 셀 출력에 step마다 loss 값이 점점 줄어드는 로그가 나타난다.",
        "학습이 끝나면 같은 질문을 '학습 전 모델'과 '학습 후 모델'에 각각 물어 답변 변화를 비교한다.",
        "model.save_pretrained('my-lora') 로 학습된 LoRA 어댑터(수십 MB)만 저장해 결과로 제출한다."
      ],
      "deliverable": "data.jsonl 학습셋 + 학습 노트북(.ipynb) + 학습 전후 답변 비교표 + 저장된 LoRA 어댑터 폴더"
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
      "title": "한 데이터셋으로 ML 베이스라인 → 딥러닝 → 성능 비교 → 규제로 개선까지 (종합 실습)",
      "steps": [
        "Colab 새 노트에서 하나의 데이터셋을 정한다: `from sklearn.datasets import load_digits` 의 8x8 손글씨(또는 원하면 이미지 데이터셋)를 불러오고 train_test_split 으로 학습/평가를 나눈다.",
        "① 머신러닝 베이스라인: `from sklearn.ensemble import RandomForestClassifier`(또는 GradientBoosting)로 모델을 학습시키고 평가 정확도를 출력해 '기준점'으로 삼는다.",
        "② 딥러닝 모델: 같은 데이터를 텐서로 바꿔 PyTorch MLP(`nn.Sequential(nn.Linear(...), nn.ReLU(), nn.Linear(...))`) 또는 CNN(`nn.Conv2d → ReLU → MaxPool2d → Linear`)을 만들고 학습 루프(forward→loss→backward→step)를 돌린다.",
        "③ 두 접근 비교: 머신러닝 베이스라인 정확도와 딥러닝 정확도를 나란히 출력해 어느 쪽이 이 데이터에서 더 나은지 확인한다.",
        "④ 성능 개선 ①: 딥러닝 모델에 `nn.Dropout(0.3)` 과 가중치 감쇠(weight_decay) 같은 규제를 넣고, 학습-평가 정확도 차이(과적합)가 줄어드는지 확인한다.",
        "④ 성능 개선 ②: 하이퍼파라미터(학습률·은닉 차원·에폭 수) 중 하나씩만 바꿔 재학습하며 평가 정확도가 어떻게 달라지는지 기록한다.",
        "⑤ 결과 정리: 'ML 베이스라인 / DL 기본 / DL 개선' 세 값을 한 표로 만들고, 개선 전후 정확도 변화를 숫자로 보여준다.",
        "무엇이 성능을 가장 많이 끌어올렸는지(규제인지, 하이퍼파라미터인지, 모델 종류인지)를 한 단락 회고로 적어 마무리한다."
      ],
      "deliverable": "ML과 DL 두 모델의 성능 비교표 + 개선 전후 정확도 변화 + 무엇이 성능을 끌어올렸는지 한 단락 회고가 담긴 Colab 노트 1개"
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
        "topic": "8교시 MLOps 모델 운영: 성능 모니터링 · 재학습과 Drift 대응"
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
        "마지막으로 '어떤 파라미터를 키웠더니 왜 좋아졌는지' 한 줄 해석을 마크다운 셀에 남겨 산출물로 제출한다.",
        "(운영 보조 실습) 학습에 쓴 데이터와, 값의 범위를 일부러 바꾼 '신규 데이터'를 각각 만들어 두 경우의 예측 정확도를 재고, 데이터 분포가 바뀌면(드리프트) 성능이 얼마나 떨어지는지 비교한다.",
        "정확도가 어느 선 아래로 떨어지면 재학습이 필요하다는 '재학습 판단 기준'을 한 줄로 적어 둔다."
      ],
      "deliverable": "튜닝 비교 노트북(.ipynb) — param_grid, GridSearchCV 코드, best_params_/best_score_, 베이스라인 대비 테스트 점수 비교표(또는 두 줄 출력)와 드리프트·재학습 판단 기준 메모가 포함되어야 함"
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
        "'pip install langchain langchain-chroma langchain-community langchain-openai chromadb pypdf' 를 실행해 필요한 라이브러리를 한 번에 설치한다.",
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
      { "time": "09:00–09:50", "topic": "1교시 어제 인덱스 복습과 Retriever의 역할, top-k·재순위 개요" },
      { "time": "10:00–10:50", "topic": "2교시 하이브리드 검색(키워드 BM25 + 벡터)과 재순위(Re-ranking)" },
      { "time": "11:00–11:50", "topic": "3교시 [실습] 하이브리드 + Reranker로 검색 품질 높이기" },
      { "time": "12:00–13:00", "topic": "점심 휴식", "lunch": true },
      { "time": "13:00–13:50", "topic": "4교시 고급 리트리버: ParentDocumentRetriever·MultiQueryRetriever" },
      { "time": "14:00–14:50", "topic": "5교시 고급 리트리버: EnsembleRetriever·LongContextReorder" },
      { "time": "15:00–15:50", "topic": "6교시 SemanticChunker와 청킹 전략 심화" },
      { "time": "16:00–16:50", "topic": "7교시 [실습] 고급 리트리버로 질의응답(QA) 체인 완성" },
      { "time": "17:00–17:50", "topic": "8교시 [실습] 출처 인용 RAG 챗봇으로 마무리" }
    ],
    "practice": {
      "title": "고급 리트리버(하이브리드+재순위)로 검색 품질을 높인 출처 인용 QA 체인 구축",
      "steps": [
        "1일차에 만든 'chroma_db' 폴더를 그대로 불러와 Chroma 객체로 다시 연다.",
        "기본 리트리버(k=4)로 '연차 휴가는 며칠인가요?' 를 검색해 가져온 조각의 출처를 출력해 본다(기준선).",
        "BM25Retriever(키워드)와 벡터 리트리버를 EnsembleRetriever로 묶어(가중치 0.5:0.5) 하이브리드 검색을 만든다.",
        "(선택) CrossEncoder 또는 Cohere Rerank로 후보를 재순위해 상위 몇 개만 남긴다.",
        "MultiQueryRetriever로 같은 질문을 여러 표현으로 바꿔 검색되는 문서가 늘어나는지 비교한다.",
        "ChatPromptTemplate로 '아래 컨텍스트만 근거로 답하고 모르면 모른다'는 프롬프트를 만든다.",
        "리트리버 | 프롬프트 | 모델을 LCEL 파이프(|)로 연결해 체인을 만들고 질문해 답과 출처를 함께 출력한다.",
        "문서에 없는 질문(예: '대표이사 생일은?')을 던져 '모른다'고 답하는지 확인한다.",
        "기본 리트리버와 고급(하이브리드+재순위) 리트리버의 답 품질을 눈으로 비교해 한 줄로 메모한다.",
        "코드를 'qa_chain.py' 로 저장한다."
      ],
      "deliverable": "qa_chain.py(하이브리드+재순위) + 기본 vs 고급 리트리버 답변 비교 메모 + 출처 표기 캡처"
    }
  },
  "rag-3": {
    "schedule": [
      { "time": "09:00–09:50", "topic": "1교시 RAG 확장 4단계: Naive → Advanced → Modular → Agentic" },
      { "time": "10:00–10:50", "topic": "2교시 Agentic RAG 개념: 검색·판단을 에이전트 루프로" },
      { "time": "11:00–11:50", "topic": "3교시 LangGraph 기본 구조(Messages·State·Graph) 빠르게" },
      { "time": "12:00–13:00", "topic": "점심 휴식", "lunch": true },
      { "time": "13:00–13:50", "topic": "4교시 [실습] LangGraph로 Agentic RAG 뼈대 만들기" },
      { "time": "14:00–14:50", "topic": "5교시 RAG 평가: RAGAS(충실도·답변 관련성·문맥 정밀도)" },
      { "time": "15:00–15:50", "topic": "6교시 [실습] 평가셋으로 RAG 점수 매기고 개선하기" },
      { "time": "16:00–16:50", "topic": "7교시 비용·지연(latency)·캐싱 최적화" },
      { "time": "17:00–17:50", "topic": "8교시 [실습] Agentic RAG 파이프라인 통합·마무리" }
    ],
    "practice": {
      "title": "LangGraph로 Agentic RAG를 만들고 RAGAS로 채점·튜닝하기",
      "steps": [
        "'pip install langgraph ragas datasets' 로 라이브러리를 설치한다.",
        "State에 messages·question·context 를 담고, retrieve(검색)·grade(근거 충분?)·rewrite(질문 재작성)·generate(생성) 노드를 만든다.",
        "조건 분기: grade가 '부족'이면 rewrite→retrieve로 되돌아가고, '충분'이면 generate로 간다(최대 반복 3회로 제한).",
        "문서에 답이 분명한 질문을 넣어, 한 번 검색으로 바로 생성까지 가는지 확인한다.",
        "일부러 애매하게 물어(예: 줄임말·오타), rewrite→재검색 루프가 도는지, 최대 3회에서 멈추는지 관찰한다.",
        "내 문서에서 답이 분명한 질문 5개와 정답(ground truth)을 만든다.",
        "각 질문의 답변·컨텍스트를 모아 RAGAS로 faithfulness·answer_relevancy·context_precision 을 측정한다(기준선).",
        "k(4→6)나 청킹(500→800) 중 하나만 바꿔 다시 측정하고 점수를 비교한다.",
        "캐싱을 켜고 같은 질문을 두 번 던져 두 번째가 빠른지 시간을 잰다.",
        "최종 설정을 'config 메모'로 남기고 비용·속도 trade-off를 한 줄로 정리한다.",
        "[조별 캡스톤 안내] 이 과목은 Day2 후반부터 Day3까지 개인 실습이 아니라 조별 캡스톤으로 이어진다 — 위 개인 homework는 팀 산출물을 위한 연습으로 연결된다.",
        "(1) 설계 산출물: 조별로 도메인·문서·질문셋을 정하고, 어떤 로더·청킹·리트리버·평가지표를 왜 골랐는지 담은 RAG 파이프라인 설계 문서를 먼저 제출한다.",
        "(2) 개발 산출물: 설계대로 구현해 동작하는 Agentic RAG 와 RAGAS 평가 결과를 개발 산출물로 제출한다.",
        "(3) 발표·마무리: 조별로 발표하고 서로 Feedback 을 주고받은 뒤, Wrap-up 과 QUIZ 로 과정을 마무리한다."
      ],
      "deliverable": "Agentic RAG 그래프(재검색 루프) + 평가셋(질문5+정답) + 튜닝 전후 RAGAS 점수표 + config 메모, 그리고 조별 캡스톤 산출물(설계 문서 → 개발 결과 → 발표·피드백)"
    }
  },
  "langchain-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "오리엔테이션: LangChain이 왜 필요한가 (LLM 앱의 고민거리)"
      },
      {
        "time": "10:00–10:50",
        "topic": "[실습] 개발환경 셋업 - 파이썬 가상환경·LangChain·API 키 연결"
      },
      {
        "time": "11:00–11:50",
        "topic": "[실습] 첫 LLM 호출 - 모델·프롬프트·출력 파서 따로 써보기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "LCEL과 Runnable 인터페이스: 파이프(|) 조립과 invoke/stream/batch"
      },
      {
        "time": "14:00–14:50",
        "topic": "[실습] LCEL로 첫 체인 만들기 (프롬프트 | 모델 | 파서)"
      },
      {
        "time": "15:00–15:50",
        "topic": "출력 파서 깊이보기: 문자열·JSON·구조화 출력"
      },
      {
        "time": "16:00–16:50",
        "topic": "[실습] 번역기·요약기 체인 만들고 입력 바꿔보기"
      },
      {
        "time": "17:00–17:50",
        "topic": "마무리: 오늘 배운 부품으로 미니 체인 정리 + Q&A"
      }
    ],
    "practice": {
      "title": "나만의 '한 줄 요약 봇' 체인 만들기 (프롬프트 | 모델 | 파서)",
      "steps": [
        "터미널을 열고 'python -m venv venv' 명령으로 가상환경을 만든 뒤 'source venv/bin/activate'(윈도우는 venv\\Scripts\\activate)로 활성화한다.",
        "'pip install langchain langchain-anthropic' 명령으로 LangChain 본체와 모델 연동 패키지를 설치한다.",
        "발급받은 API 키를 터미널에서 'export ANTHROPIC_API_KEY=sk-...' 로 환경변수에 등록한다(윈도우는 set 사용).",
        "summarizer.py 파일을 만들고 ChatPromptTemplate.from_template 로 '{text}를 한 문장으로 요약해줘' 형태의 프롬프트를 작성한다.",
        "ChatAnthropic(model=...) 로 모델 객체를 만들고, StrOutputParser() 로 출력 파서를 만든다.",
        "프롬프트 | 모델 | 파서 를 파이프(|)로 이어 chain 변수에 담는다.",
        "chain.invoke({'text': '오늘 회의에서 우리는 신제품 출시 일정을 9월로 확정했다'}) 를 호출한다.",
        "터미널에 'python summarizer.py'를 실행해 한 문장 요약이 출력되는지 확인한다(기대 결과: '신제품 출시를 9월로 확정했다' 같은 한 줄).",
        "입력 text를 다른 문장으로 바꿔 다시 실행하며, 코드를 고치지 않아도 결과가 달라지는지 확인한다.",
        "마지막으로 프롬프트 문구를 '세 줄로 요약'으로 바꿔 같은 체인이 다르게 동작함을 관찰한다."
      ],
      "deliverable": "입력 문장을 받아 한 문장으로 요약해 출력하는 summarizer.py 파일과 실행 결과 스크린샷"
    }
  },
  "langchain-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "복습: 어제의 체인에 '기억'과 '도구'를 더하면? (오늘의 그림)"
      },
      {
        "time": "10:00–10:50",
        "topic": "[실습] 대화 메모리 - 앞말을 기억하는 챗봇 만들기"
      },
      {
        "time": "11:00–11:50",
        "topic": "도구(Tool) 개념: LLM이 계산기·검색을 직접 쓰게 하기"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "[실습] bind_tools로 Tool 연결 + RunnableParallel/Lambda 복합 체인"
      },
      {
        "time": "14:00–14:50",
        "topic": "문서 QA 큰그림: 임베딩·벡터스토어·리트리버"
      },
      {
        "time": "15:00–15:50",
        "topic": "[실습] PDF/텍스트 읽어 벡터스토어에 넣기"
      },
      {
        "time": "16:00–16:50",
        "topic": "[실습] 리트리버 결합 문서 QA 체인 완성"
      },
      {
        "time": "17:00–17:50",
        "topic": "마무리: 메모리+도구+문서QA를 합친 챗봇 정리 + Q&A"
      }
    ],
    "practice": {
      "title": "내 문서로 답하는 'QA 챗봇' 만들기 (적재 → 검색 → 답변)",
      "steps": [
        "'pip install langchain-community langchain-chroma langchain-anthropic chromadb' 로 필요한 패키지를 설치한다.",
        "회사 소개나 매뉴얼 같은 텍스트를 docs.txt 파일로 준비해 같은 폴더에 둔다.",
        "TextLoader('docs.txt').load() 로 문서를 읽어 메모리로 불러온다.",
        "RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50) 로 문서를 작은 조각으로 자른다.",
        "Chroma.from_documents(조각들, 임베딩) 로 조각들을 벡터스토어에 저장(색인)한다.",
        "vectorstore.as_retriever() 로 질문과 비슷한 조각을 찾아 주는 리트리버를 만든다.",
        "프롬프트에 '{context}만 근거로 {question}에 답해' 식으로 검색 결과 자리를 넣고 체인을 조립한다.",
        "chain.invoke('환불 규정이 어떻게 되나요?') 를 실행한다.",
        "터미널에서 문서 안 내용에 근거한 답이 나오는지, 문서에 없는 질문엔 '모른다'고 하는지 확인한다(기대 결과: 문서 기반 답변).",
        "질문을 2~3개 더 바꿔 던지며, 답이 문서 내용과 일치하는지 검증한다."
      ],
      "deliverable": "docs.txt를 근거로 질문에 답하는 qa_bot.py와, 서로 다른 질문 3개에 대한 실행 결과 캡처"
    }
  },
  "langchain-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "복습: 동작하는 챗봇을 '서비스'로 만들려면 무엇이 더 필요한가"
      },
      {
        "time": "10:00–10:50",
        "topic": "[실습] 스트리밍 응답 - 글자가 흐르듯 나오게 하기"
      },
      {
        "time": "11:00–11:50",
        "topic": "LangChain vs LangGraph 경계와 Runnable 통일성"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "[실습] LangSmith로 체인 추적·디버깅하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "비용·캐싱·에러 처리: 실서비스에서 꼭 챙길 것들"
      },
      {
        "time": "15:00–15:50",
        "topic": "[실습] 캐싱·재시도·예외 처리 붙이기"
      },
      {
        "time": "16:00–16:50",
        "topic": "[실습] FastAPI로 챗봇을 웹 API로 배포하기"
      },
      {
        "time": "17:00–17:50",
        "topic": "마무리: 3일간 부품을 합친 미니 생성형 AI 서비스 + 발표"
      }
    ],
    "practice": {
      "title": "스트리밍 + 캐싱 + 예외처리를 갖춘 챗봇을 FastAPI 웹 서비스로 배포",
      "steps": [
        "'pip install fastapi uvicorn langchain-anthropic' 로 웹 서버와 모델 패키지를 설치한다.",
        "app.py를 만들고 FastAPI() 인스턴스와 ChatAnthropic 모델, 프롬프트|모델 체인을 준비한다.",
        "set_llm_cache(InMemoryCache())로 같은 질문은 다시 모델을 부르지 않게 캐싱을 켠다.",
        "@app.post('/chat') 경로를 만들고, 요청 본문에서 질문(message)을 꺼낸다.",
        "try/except로 모델 호출을 감싸 오류가 나면 친절한 에러 메시지를 돌려주게 한다.",
        "StreamingResponse와 chain.stream을 이용해 답을 글자 단위로 흘려보내는 /stream 경로를 추가한다.",
        "'uvicorn app:app --reload' 명령으로 서버를 실행한다.",
        "브라우저에서 http://localhost:8000/docs 를 열어 /chat에 질문을 넣고 Execute로 답을 받는다(기대 결과: JSON 답변).",
        "같은 질문을 두 번 보내, 두 번째가 캐시 덕분에 즉시 응답하는지 응답 시간을 비교한다.",
        "/stream 경로를 호출해 답이 한꺼번에가 아니라 조금씩 흘러나오는지 확인한다."
      ],
      "deliverable": "스트리밍·캐싱·예외처리가 들어간 app.py와, /docs에서 호출한 결과 및 두 번째 호출이 빨라진 응답 시간 캡처"
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
      { "time": "09:00–09:50", "topic": "1교시 AI 에이전트란 - 챗봇과의 차이, Agent Protocol 개요" },
      { "time": "10:00–10:50", "topic": "2교시 ReAct 패턴 - 생각하고(Reason) 행동하기(Act)" },
      { "time": "11:00–11:50", "topic": "3교시 Agentic Workflow 설계: Goal · Plan · Execute · Reflect" },
      { "time": "12:00–13:00", "topic": "점심 휴식", "lunch": true },
      { "time": "13:00–13:50", "topic": "4교시 [실습] 환경 셋업 + LangGraph 핵심(그래프·노드·State)" },
      { "time": "14:00–14:50", "topic": "5교시 [실습] State와 노드로 단순 그래프 만들기" },
      { "time": "15:00–15:50", "topic": "6교시 도구(Tool) 정의와 LLM이 도구를 부르게 하기" },
      { "time": "16:00–16:50", "topic": "7교시 Agentic RAG Workflow(검색·판단 루프) 개념과 조건 분기" },
      { "time": "17:00–17:50", "topic": "8교시 [실습] 단일 에이전트 완성 + 실행 결과 점검" }
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
      { "time": "09:00–09:50", "topic": "1교시 단일 에이전트의 한계와 멀티 에이전트의 필요성" },
      { "time": "10:00–10:50", "topic": "2교시 멀티 에이전트 패턴: Supervisor · Middleware" },
      { "time": "11:00–11:50", "topic": "3교시 [실습] Supervisor로 전문가 에이전트 라우팅" },
      { "time": "12:00–13:00", "topic": "점심 휴식", "lunch": true },
      { "time": "13:00–13:50", "topic": "4교시 Harness Engineering과 Parallel Execution(Fan-out)" },
      { "time": "14:00–14:50", "topic": "5교시 [실습] Fan-out으로 여러 작업 동시 실행하기" },
      { "time": "15:00–15:50", "topic": "6교시 Human-in-the-loop - interrupt로 사람 승인 받기" },
      { "time": "16:00–16:50", "topic": "7교시 에러 복구·재시도·관측(로깅/추적) 다루기" },
      { "time": "17:00–17:50", "topic": "8교시 [실습] 멀티 에이전트 워크플로 완성 + 회고"
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
      { "time": "09:00–09:50", "topic": "1교시 — 오리엔테이션: 벡터 검색이 왜 필요한가, RAG 한계 진단" },
      { "time": "10:00–10:50", "topic": "2교시 — 임베딩과 벡터 공간, 코사인/내적 유사도, 인덱싱(HNSW·IVF)" },
      { "time": "11:00–11:50", "topic": "3교시 [실습] 임베딩·유사도 계산 + FAISS Flat vs HNSW 속도 비교" },
      { "time": "12:00–13:00", "topic": "점심 휴식", "lunch": true },
      { "time": "13:00–13:50", "topic": "4교시 — 대표 Vector DB 비교: FAISS·Chroma·pgvector·Qdrant·Pinecone" },
      { "time": "14:00–14:50", "topic": "5교시 [실습] FAISS→Qdrant로 문서 임베딩·저장·검색 옮기기" },
      { "time": "15:00–15:50", "topic": "6교시 — Chunking Engineering과 하이브리드 검색, Re-ranking" },
      { "time": "16:00–16:50", "topic": "7교시 [실습] Hybrid + Reranking으로 검색 정확도 높이기" },
      { "time": "17:00–17:50", "topic": "8교시 — Agentic RAG와 Production Architecture, 최신 동향(MEMO)" }
    ],
    "practice": {
      "title": "문서 검색기 만들기 — 임베딩·저장·검색 + FAISS→Qdrant 이전 + Re-ranking",
      "steps": [
        "`pip install sentence-transformers faiss-cpu qdrant-client` 로 설치한다.",
        "검색 대상 문장 6~8개를 리스트로 준비하고, `SentenceTransformer('all-MiniLM-L6-v2')` 로 임베딩한다(벡터 길이 384 확인).",
        "먼저 FAISS(`IndexFlatIP`)에 벡터를 넣고 질문 하나로 top-3 검색이 되는지 확인한다.",
        "같은 데이터를 Qdrant(로컬 `QdrantClient(':memory:')`)의 컬렉션에 upsert 하고, 동일 질문으로 검색해 FAISS와 결과가 같은지 비교한다.",
        "질문과 주제가 같은 문장이 상위에 오는지 눈으로 확인한다(기대 결과: 같은 주제 문장이 top에 노출).",
        "키워드(BM25)와 벡터 결과를 합치는 하이브리드 검색을 구성한다.",
        "가져온 후보에 Cross-Encoder Re-ranking을 적용해, 재순위 전/후 상위 3개가 어떻게 달라지는지 출력해 비교한다.",
        "각 문서에 주제 태그(metadata)를 달고 필터 검색으로 특정 주제 안에서만 검색되는지 확인한다.",
        "질문을 2~3개 바꿔가며 재순위가 정말 더 나은 순서를 만드는지 한 줄로 메모한다.",
        "완성 코드를 저장하고 FAISS/Qdrant/재순위 결과 캡처를 산출물로 남긴다."
      ],
      "deliverable": "검색기 소스 + FAISS↔Qdrant 결과 비교 + 재순위 전/후 상위3 비교 캡처 + '재순위 효과' 1줄 회고"
    }
  },
  "capstone-1": {
    "schedule": [
      { "time": "09:00–09:50", "topic": "1교시 OT: 캡스톤 목표와 Backend·VectorDB·Agent(MCP)·Frontend 전체 그림" },
      { "time": "10:00–10:50", "topic": "2교시 MCP(Model Context Protocol) 개요와 MCP Server 구성요소" },
      { "time": "11:00–11:50", "topic": "3교시 MCP 설계: Tool·Resource·Prompt 분리 의사결정" },
      { "time": "12:00–13:00", "topic": "점심 휴식", "lunch": true },
      { "time": "13:00–13:50", "topic": "4교시 [실습] MCP Server 구현하고 MCP Inspector로 점검" },
      { "time": "14:00–14:50", "topic": "5교시 통합 아키텍처: 시스템 경계(Backend·VectorDB·Agent·Frontend) 설계" },
      { "time": "15:00–15:50", "topic": "6교시 [실습] FastAPI에 RAG + Agent + MCP Client 통합" },
      { "time": "16:00–16:50", "topic": "7교시 [실습] Thread(대화 세션) 관리 붙이기" },
      { "time": "17:00–17:50", "topic": "8교시 통합 스모크 테스트와 중간 점검" }
    ],
    "practice": {
      "title": "MCP Server를 만들고 FastAPI 백엔드에 통합해 동작하는 /chat 엔드포인트 완성하기",
      "steps": [
        "팀 서비스를 정하고, 필요한 기능을 Tool(실행)·Resource(읽기)·Prompt(템플릿) 3가지로 분류한 표를 만든다.",
        "가상환경을 만들고(activate) 'pip install \"mcp[cli]\" fastapi uvicorn langchain-mcp-adapters langgraph langchain-anthropic python-dotenv' 로 설치한다.",
        "'.env' 에 'ANTHROPIC_API_KEY=발급받은_키' 를 적고 .gitignore에 .env·venv/ 를 추가한다.",
        "아래 realCode의 'server.py' 를 붙여넣어 @mcp.tool() 로 도구 1개(search_docs 등)를 정의한다.",
        "'mcp dev server.py' 를 실행하면 MCP Inspector 웹이 열린다. Tools 탭에서 도구가 보이고 직접 호출해 결과가 나오는지 확인한다.",
        "아래 realCode의 'main.py' 를 붙여넣어 FastAPI /chat 에 MCP Client + 에이전트를 통합한다.",
        "'uvicorn main:app --reload' 실행 후 'http://localhost:8000/docs' 에서 /chat 에 질문을 넣어 본다.",
        "(기대 결과) 질문을 넣으면 에이전트가 MCP 도구를 거쳐 답을 만들어 돌려주면 성공.",
        "팀 아키텍처 그림(4박스: Backend·VectorDB·Agent·Frontend)과 Tool·Resource·Prompt 분류표를 한 장으로 정리한다.",
        "코드를 깃에 커밋·푸시한다('feat: MCP 서버 + FastAPI 통합')."
      ],
      "deliverable": "MCP Server(server.py, Inspector 확인) + 통합 백엔드(main.py, /chat 동작) + Tool·Resource·Prompt 분류표와 아키텍처 그림"
    }
  },
  "capstone-2": {
    "schedule": [
      { "time": "09:00–09:50", "topic": "1교시 스트리밍의 3가지 차원(모델·서버·클라이언트) 이해" },
      { "time": "10:00–10:50", "topic": "2교시 Backend: SSE(Server-Sent Events) 스트리밍 엔드포인트 설계" },
      { "time": "11:00–11:50", "topic": "3교시 [실습] FastAPI SSE 엔드포인트 구현" },
      { "time": "12:00–13:00", "topic": "점심 휴식", "lunch": true },
      { "time": "13:00–13:50", "topic": "4교시 Frontend: Vue.js/Next.js + Vercel AI SDK 연동" },
      { "time": "14:00–14:50", "topic": "5교시 [실습] 프론트에서 토큰 스트리밍 렌더링" },
      { "time": "15:00–15:50", "topic": "6교시 [실습] Multi-Agent Streaming(에이전트별 진행 스트림)" },
      { "time": "16:00–16:50", "topic": "7교시 Observability & Eval: 추적·로그·응답 품질 평가" },
      { "time": "17:00–17:50", "topic": "8교시 [실습] LangSmith/로깅으로 실행 추적 붙이기" }
    ],
    "practice": {
      "title": "응답을 SSE 스트리밍으로 바꾸고 LangSmith로 실행을 추적하기",
      "steps": [
        "어제 만든 main.py 에 아래 realCode의 SSE 스트리밍 엔드포인트(/stream)를 추가한다.",
        "LLM 호출을 'llm.astream(...)' 으로 바꾸고, 토큰을 'data: ...\\n\\n' 형식으로 yield 한다.",
        "'uvicorn main:app --reload' 실행 후 터미널에서 'curl -N \"http://localhost:8000/stream?q=안녕\"' 을 입력한다.",
        "(기대 결과) 답이 한꺼번에가 아니라 글자 단위로 조금씩 흘러나오면 스트리밍 성공.",
        "프론트(Vue/Next)에서 Vercel AI SDK의 useChat 로 /stream 을 연결해 화면에 타이핑되듯 렌더한다(간단히는 EventSource 로도 가능).",
        "여러 에이전트를 쓰면 각 에이전트의 진행 상황에 태그를 붙여 따로 표시(Multi-Agent Streaming)한다.",
        "'.env' 에 'LANGCHAIN_TRACING_V2=true' 와 'LANGCHAIN_API_KEY' 를 추가해 LangSmith 추적을 켠다.",
        "서비스를 한 번 실행한 뒤 smith.langchain.com 에서 trace(단계별 흐름)를 연다.",
        "가장 오래 걸린 단계(Latency)와 토큰을 많이 쓴 단계(Cost)를 찾아 캡처한다.",
        "코드를 깃에 커밋·푸시한다('feat: SSE 스트리밍 + LangSmith 추적')."
      ],
      "deliverable": "스트리밍 응답(/stream, curl 확인) + 프론트 실시간 렌더 화면 + LangSmith trace 캡처(느린/비싼 단계 표시)"
    }
  },
  "capstone-3": {
    "schedule": [
      { "time": "09:00–09:50", "topic": "1교시 Error Handling과 재시도 전략 설계" },
      { "time": "10:00–10:50", "topic": "2교시 [실습] 예외·타임아웃·재시도 처리 붙이기" },
      { "time": "11:00–11:50", "topic": "3교시 Cost & Latency 관리(토큰·모델·캐싱)" },
      { "time": "12:00–13:00", "topic": "점심 휴식", "lunch": true },
      { "time": "13:00–13:50", "topic": "4교시 Stateless Session 전환(수평 확장 대비)" },
      { "time": "14:00–14:50", "topic": "5교시 Query Routing과 Conditional Routing" },
      { "time": "15:00–15:50", "topic": "6교시 [실습] Validator Agent 출력 검증 + Dynamic Planning" },
      { "time": "16:00–16:50", "topic": "7교시 팀별 최종 통합·발표·라이브 데모" },
      { "time": "17:00–17:50", "topic": "8교시 상호 피드백·회고(KPT) · Wrap-up QUIZ" }
    ],
    "practice": {
      "title": "오류 처리·재시도·검증을 붙여 안정화하고, 최종 통합·발표하기",
      "steps": [
        "'pip install tenacity' 로 재시도 라이브러리를 설치한다.",
        "아래 realCode의 safe.py(재시도·타임아웃 + Validator Agent)를 붙여넣고, 메인 호출을 safe_answer 로 교체한다.",
        "일부러 잘못된 키나 주소로 실패시켜, 1→2→4초 재시도 후에도 안 되면 친절한 대체 응답이 나오는지 확인한다.",
        "근거 없는 답을 일부러 만들어 넣어, Validator가 걸러내고 재생성하는지 확인한다.",
        "질문을 유형(요약·검색·계산)으로 분류하는 라우터 노드를 만들고, 유형에 따라 서로 다른 도구·프롬프트로 분기(Conditional Edge)한 뒤, 각 경로가 실제로 다르게 처리되는지 로그로 확인한다.",
        "한 번 호출의 토큰·응답시간을 측정해 'Cost·Latency' 표를 만들고, 작은 모델·캐싱으로 줄일 지점을 찾는다.",
        "발표 슬라이드 5장을 만든다: (1)문제정의 (2)아키텍처(MCP 포함) (3)라이브 데모 (4)운영(비용·지연·관측) (5)개선방향.",
        "라이브 데모 실패에 대비해 정상 동작 화면을 미리 녹화한다(백업 영상).",
        "(기대 결과) 발표 중 질문을 넣으면 출처와 함께 답이 나오고, 오류를 내도 서비스가 멈추지 않음을 시연한다.",
        "팀별 발표 + 질의응답 후 KPT 회고(Keep·Problem·Try)를 작성한다."
      ],
      "deliverable": "안정화된 서비스(재시도·타임아웃·Validator) + 발표 슬라이드 5장 + Cost·Latency 표 + KPT 회고"
    }
  },
  "miniproject-1": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "[self-study] 전 과정 Wrap-up ① Prompt–Context–Harness Engineering 복습"
      },
      {
        "time": "10:00–10:50",
        "topic": "[self-study] 전 과정 Wrap-up ② RAG Pipeline & Evaluation 복습"
      },
      {
        "time": "11:00–11:50",
        "topic": "[self-study] 전 과정 Wrap-up ③ Supervisor Agent · 멀티에이전트 복습"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "[실습] 개발환경 짧게 확인(venv·API 키·smoke test는 선행 완료 가정)"
      },
      {
        "time": "14:00–14:50",
        "topic": "[실습] Agentic RAG로 검색 오류 원인 찾기"
      },
      {
        "time": "15:00–15:50",
        "topic": "[실습] 검색 성능 확보: 청킹·리트리버·재검색 루프 개선"
      },
      {
        "time": "16:00–16:50",
        "topic": "[실습] RAG 정량 평가(정확도·충실도·관련성) 측정"
      },
      {
        "time": "17:00–17:50",
        "topic": "[실습] 개선 전/후 평가표 작성·제출"
      }
    ],
    "practice": {
      "title": "Agentic RAG로 검색 성능 올리고 점수로 증명하기",
      "steps": [
        "선행 과정에서 만든 개발환경(venv·API 키·smoke test)이 그대로 도는지 짧게 확인한다 — 새로 셋업하지 말고 기존 프로젝트를 재사용한다.",
        "선행에서 구축한 RAG 파이프라인에 검색 품질이 나쁜 질문 5개를 던져, 엉뚱한 문단을 가져오는 '검색 오류' 사례를 먼저 수집한다.",
        "오류 원인을 진단한다 — 청킹이 너무 크거나 작지 않은지, top-k가 부족한지, 질문 표현과 문서 표현이 어긋나는지 항목별로 적는다.",
        "Agentic RAG 구조로 바꾼다: 검색 결과가 부실하면 질문을 다시 쓰고(rewrite) 재검색하는 루프를 넣되 최대 반복 횟수를 정해 무한루프를 막는다.",
        "개선안(청킹 크기·top-k·하이브리드 검색 중 하나)을 실제로 적용해 같은 질문 5개를 다시 검색한다.",
        "RAGAS 같은 지표로 정확도·충실도(faithfulness)·관련성(answer relevancy)을 개선 전/후 각각 측정한다.",
        "두 결과를 한 표에 나란히 정리해 어떤 조치가 점수를 얼마나 올렸는지 숫자로 보여준다.",
        "가장 효과가 컸던 조치와 그 이유를 한 단락으로 회고해 산출물에 덧붙인다."
      ],
      "deliverable": "개선 전/후 검색 성능 정량 평가표(정확도·충실도·관련성)와, 무엇이 점수를 끌어올렸는지 한 단락 회고"
    }
  },
  "miniproject-2": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "미니프로젝트 안내: 목표 · 산출물 · 평가 기준 공유"
      },
      {
        "time": "10:00–10:50",
        "topic": "[설계] 주제 정하고 사용자 시나리오 한 문장으로 좁히기"
      },
      {
        "time": "11:00–11:50",
        "topic": "[설계] 워커 에이전트 역할 나누기(3개 이내)"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "[설계] Supervisor 라우팅 규칙 · 종료 조건 정하기"
      },
      {
        "time": "14:00–14:50",
        "topic": "[설계] 공유 상태(State) 스키마 정의"
      },
      {
        "time": "15:00–15:50",
        "topic": "[설계] 협업 흐름도(Multi-Agent Workflow) 그리기"
      },
      {
        "time": "16:00–16:50",
        "topic": "[실습] 개발 착수: 뼈대 코드에 노드·엣지 배치"
      },
      {
        "time": "17:00–17:50",
        "topic": "[실습] 설계 리뷰와 팀 상호 피드백"
      }
    ],
    "practice": {
      "title": "주제 정하고 Supervisor 멀티에이전트 설계하기",
      "steps": [
        "우리 팀이 만들 서비스 주제를 한 문장으로 적는다. 예: '사용자가 준 자료를 조사·요약·검수해 보고서 초안을 만들어 주는 서비스'",
        "그 주제를 처리하는 데 꼭 필요한 워커(worker) 에이전트 역할을 3개 이내로 나눈다(예: 조사자·작성자·검수자) — 역할이 겹치지 않게 한 줄씩 정의한다.",
        "Supervisor(감독) 에이전트의 라우팅 규칙을 적는다: 지금 상태가 어떠할 때 어느 워커에게 일을 넘길지 조건을 표로 정리한다.",
        "언제 작업을 끝낼지 종료 조건(FINISH)을 명확히 정한다 — 예: 검수자가 '통과'를 반환하면 종료.",
        "에이전트들이 함께 쓰는 공유 상태(State) 스키마를 정의한다: messages, next(다음 에이전트), 중간 산출물 필드 등을 이름·타입과 함께 적는다.",
        "전체 협업 흐름을 흐름도로 그린다: Supervisor를 가운데 두고 워커들과의 왕복, 조건 분기, 종료 지점을 화살표로 표현한다.",
        "흐름도대로 LangGraph 뼈대 코드에 노드(각 에이전트)와 조건 엣지를 배치해 설계가 코드로 옮겨지는지 확인한다(구현 완성은 다음 날).",
        "설계 산출물을 팀끼리 리뷰하며 라우팅이 막히는 지점(무한루프·미종료)이 없는지 점검하고 보완한다."
      ],
      "deliverable": "Multi-Agent 설계 산출물 문서 — 에이전트 역할, Supervisor 라우팅 규칙·종료 조건, 공유 상태 스키마, 협업 흐름도"
    }
  },
  "miniproject-3": {
    "schedule": [
      {
        "time": "09:00–09:50",
        "topic": "오늘 목표 공유: 설계대로 구현해 AI 서비스로 완성하기"
      },
      {
        "time": "10:00–10:50",
        "topic": "[실습] 워커 에이전트 구현 ① 조사·검색 담당"
      },
      {
        "time": "11:00–11:50",
        "topic": "[실습] 워커 에이전트 구현 ② 작성·검수 담당"
      },
      {
        "time": "12:00–13:00",
        "topic": "점심 휴식",
        "lunch": true
      },
      {
        "time": "13:00–13:50",
        "topic": "[실습] Supervisor 라우팅·종료 조건 연결"
      },
      {
        "time": "14:00–14:50",
        "topic": "[실습] 전체 멀티에이전트 파이프라인 통합·안정화"
      },
      {
        "time": "15:00–15:50",
        "topic": "[실습] 통합 시연 준비와 데모 시나리오 작성 (Docker 배포는 선택 심화)"
      },
      {
        "time": "16:00–16:50",
        "topic": "팀별 통합 시연 발표"
      },
      {
        "time": "17:00–17:50",
        "topic": "Course Wrap-up & QUIZ · 회고"
      }
    ],
    "practice": {
      "title": "설계한 Supervisor 멀티에이전트를 구현해 AI 서비스로 완성",
      "steps": [
        "전날 만든 설계 문서(역할·라우팅·상태·흐름도)를 펼쳐 두고, 오늘 구현할 노드 순서를 체크리스트로 정리한다.",
        "워커 에이전트를 하나씩 함수로 구현한다: 조사·검색 담당 노드가 도구를 호출해 자료를 모으는지 단독으로 먼저 확인한다.",
        "작성·검수 담당 노드를 구현해, 조사 결과를 받아 초안을 쓰고 스스로 검수하는지 확인한다.",
        "Supervisor 노드에 설계한 라우팅 규칙과 종료 조건(FINISH)을 연결하고, 조건 엣지로 워커 사이를 오가게 한다.",
        "전체 그래프를 invoke 해 '입력 → Supervisor 분기 → 워커 협업 → 종료' 흐름이 한 번에 도는지 통합 실행한다.",
        "빈 입력·도구 실패·무한루프 같은 예외 상황을 넣어, 서비스가 멈추지 않고 안내하거나 최대 반복에서 멈추는지 안정화한다.",
        "데모 시나리오(질문 3개 → 기대 동작)를 적고 통합 시연을 리허설한다. (원하는 팀은 Docker로 포장해 배포까지 선택 심화로 진행)",
        "팀별로 '문제 → 멀티에이전트 설계 → 시연 → 배운 점' 순서로 발표하고, 과정 전체를 돌아보는 회고를 남긴다."
      ],
      "deliverable": "멀티에이전트가 협업해 답하는 동작 서비스 + 데모(시연) + 과정 회고"
    }
  }
}

export const planFor = (subjectId, day) => plans[`${subjectId}-${day}`] || null
