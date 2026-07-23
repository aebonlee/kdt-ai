// 날짜별 강의안 심화 — subjectId-day 키.
//   topics: [{ h, items[] }] · labs: [{ title, steps[] }] · homework: [string]

export const details = {
  "git-1": {
    "topics": [
      {
        "h": "오전 · 프로그래밍 개요와 개발환경 구축",
        "items": [
          "프로그래밍이란: 코드→실행 과정 한눈에 이해",
          "Frontend vs Backend와 API로 주고받는 관계",
          "기초 IT 용어: 서버·클라이언트·API·라이브러리·프레임워크",
          "VS Code 설치·한국어/필수 확장·Workspace(작업폴더) 열기",
          "Git 설치 확인(git --version)과 이름·이메일 설정"
        ]
      },
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
          "협업 규칙: main 보호·작은 단위 커밋·명확한 메시지",
          "SSH 키 관리: ssh-keygen으로 키 생성 → 공개키를 GitHub에 등록 → ssh -T로 연결 확인",
          "VS Code Source Control 패널로 stage·commit·Sync Changes 하기(터미널 없이)"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 0. VS Code로 Workspace 만들고 소스 제어 패널로 첫 커밋하기",
        "steps": [
          "폴더를 VS Code로 열어 Workspace로 삼는다.",
          "파일을 하나 새로 만들어 내용을 적고 저장한다.",
          "왼쪽 소스 제어(가지 아이콘) 패널에서 + 로 변경을 stage 한다.",
          "커밋 메시지를 입력하고 체크(commit) 버튼을 눌러 터미널 없이 첫 커밋을 만든다.",
          "커밋 이력이 소스 제어 패널에 남는지 확인한다."
        ]
      },
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
      },
      {
        "title": "Lab 4. 잘못한 작업 되돌리기 — restore·reset·revert 직접 비교",
        "steps": [
          "note.txt 를 만들고 '1번 줄' 을 적어 add → commit 으로 기준 커밋을 만든다.",
          "note.txt 를 엉뚱한 내용으로 덮어쓴 뒤 `git diff` 로 무엇이 바뀌었는지(+/-) 확인하고, `git restore note.txt` 로 편집을 취소해 원래대로 돌아오는지 본다.",
          "note.txt 에 '2번 줄' 을 추가해 커밋한 뒤, 메시지가 마음에 안 든다고 가정하고 `git reset --soft HEAD~1` 로 커밋만 무른다. 파일 내용은 그대로 남고 스테이지에 다시 올라와 있는지 `git status` 로 확인한 뒤, 메시지를 고쳐 다시 커밋한다.",
          "`git log --oneline` 으로 취소하고 싶은 과거 커밋의 7자리 번호를 확인하고, `git revert 그번호` 를 실행해 '되돌리는 새 커밋' 이 하나 더 쌓이는지 본다.",
          "reset 은 역사를 지우고 revert 는 역사를 남긴다는 차이를, '이미 GitHub에 올린 커밋이라면 왜 revert 를 써야 하는지' 한 문장으로 팀원과 정리한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 팀 저장소에 본인 이름의 브랜치로 자기소개 파일(introduce_이름.md)을 추가하고 Pull Request 를 열어 팀원 1명의 리뷰 승인을 받아 머지하기.",
      "오늘 쓴 Git 명령 8개 이상을 '명령 — 한 줄 뜻 — 내가 직접 친 예시' 형태의 나만의 치트시트(cheatsheet.md)로 정리해 저장소에 커밋하기."
    ]
  },
  // ── 2반(판교 4층·임성열) — 별개 커리큘럼 ──
  "transformer2-1": {
    "topics": [
      { "h": "언어모델과 벡터 공간", "items": [
        "다음 토큰 예측 — 언어모델은 '다음에 올 말'의 확률 분포를 만든다",
        "토큰화·임베딩 — 글자를 숫자 벡터로, 의미가 비슷하면 벡터도 가깝게",
        "벡터 거리 — 맨해튼(L1)·유클리드(L2)·코사인 유사도로 '가까움'을 잰다",
        "softmax — 제각각인 점수를 합=1인 확률로 정규화"
      ] },
      { "h": "LSTM에서 Transformer로", "items": [
        "LSTM — 한 줄로 서서 차례차례 읽기, 고정 크기 기억(hidden)에 문맥 압축",
        "장기 의존성 한계 — 문장이 길어지면 앞 문맥이 흐려진다",
        "Self-Attention — 모든 위치를 한 번에 참조, Q·K·V와 scaled dot-product",
        "병렬화 — 순차 처리(LSTM)와 달리 한꺼번에 계산해 학습이 빠르다"
      ] }
    ],
    "labs": [
      { "title": "Lab. 거리 척도 3종 비교 — 어떤 '가까움'이 맞을까", "steps": [
        "넘파이로 2차원 점 A(1,1)·B(5,4)의 맨해튼·유클리드 거리를 계산한다(7 vs 5).",
        "같은 두 벡터의 코사인 유사도를 계산하고, 벡터 길이를 2배로 늘려도 코사인 값은 그대로임을 확인한다.",
        "고차원 임베딩 비교에 코사인이 널리 쓰이는 이유(방향=의미, 길이는 빈도 영향)를 한 줄로 정리한다."
      ] },
      { "title": "Lab. 생성 파라미터 실험 — temperature·top_k", "steps": [
        "practice_1-2의 generate()에서 temperature를 0.3 / 0.8 / 1.5로 바꿔 같은 프롬프트로 3회 생성한다.",
        "top_k를 5 / 50으로 바꿔 문장의 다양성과 안정성이 어떻게 달라지는지 캡처한다.",
        "softmax 확률 분포가 temperature에 따라 '뾰족해지고 평평해지는' 원리와 연결해 설명한다."
      ] }
    ],
    "homework": [
      "개인 보고서(1페이지): LSTM vs GPT-2 생성 비교 + 차이의 이유(장기 의존성·Self-Attention) — 오늘 오후 6시(퇴근 전) 슬랙 2반 제출",
      "practice_0(CoT·SC·ReAct)을 실행해 프롬프트 기법별 응답 차이를 캡처해 보고서에 포함"
    ]
  },
  "transformer2-2": {
    "topics": [
      { "h": "LLM을 API 레벨에서 쓰기", "items": [
        "추론(Inference) 파이프라인 — 토큰화→임베딩→Self-Attention→자기회귀 생성",
        "토큰 = 비용 — usage로 사용량을 읽고, 한국어가 영어보다 토큰을 더 쓴다",
        "컨텍스트 윈도우 — 한 번에 넣을 수 있는 문맥의 한계",
        "프롬프트 기법 — CoT·Self-Consistency·ReAct를 Task 설명에 반영"
      ] },
      { "h": "CrewAI 에이전트 협업", "items": [
        "Agent — role·goal·backstory가 곧 시스템 프롬프트",
        "Task — 할 일 정의와 expected_output, Agent에 배정",
        "Crew — process=sequential로 Task를 순차 실행(kickoff)",
        "다단계 호출 — 매 호출마다 파이프라인 전체가 반복돼 비용이 누적된다"
      ] }
    ],
    "labs": [
      { "title": "Lab. 역할을 바꾸면 결과가 바뀔까", "steps": [
        "practice_2의 Writer backstory를 '초등학생도 이해할 쉬운 글을 쓰는 작가'로 바꿔 재실행한다.",
        "Editor의 goal에 '과장 표현 삭제'를 추가해 최종 원고가 어떻게 달라지는지 비교한다.",
        "role·goal·backstory 변경이 곧 프롬프트 변경임을 팀 시나리오 설계에 활용한다."
      ] },
      { "title": "Lab. 호출 비용 다이어트", "steps": [
        "crew.usage_metrics로 현재 파이프라인의 총 토큰을 기록한다.",
        "Task 설명에서 불필요한 긴 지시문을 줄이고, 같은 내용 재호출을 제거한 뒤 다시 실행한다.",
        "절감 전/후 토큰 수를 비교해 발표 자료의 '비용 구조' 근거로 쓴다."
      ] }
    ],
    "homework": [
      "팀 과제: 에이전트 구현 코드 + 서비스 시나리오 발표자료(최소 3p) — 7.24(금) 오후 4시까지 슬랙 2반 제출, 이후 발표",
      "발표 준비: Biz가치 40 · 기술이해도 30 · 수업충실도 30 배점에 맞춰 3페이지 구성 점검"
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
          "추론·임베딩 추출 활용"
        ]
      },
      {
        "h": "Transformer 이후 혁신과 LLM 생태계",
        "items": [
          "Scaling Law: 크게 키우면 성능이 예측 가능하게↑",
          "In-Context Learning: 예시만 보여주면 그 자리에서 학습",
          "RLHF: 사람 선호를 학습해 도움·안전하게 정렬",
          "MoE: 전문가 일부만 골라 써 효율↑",
          "생태계: Open-Weight vs Closed, 벤치마크·Leaderboard",
          "주요 플레이어 — Closed(API 전용): OpenAI GPT·Anthropic Claude·Google Gemini(최고 성능·안전장치, 가중치 비공개)",
          "주요 플레이어 — Open-Weight(가중치 공개): Meta Llama·Alibaba Qwen·Mistral·DeepSeek(직접 파인튜닝·온프레미스 배포 가능)",
          "고르는 기준: 성능·비용·데이터 보안(사내 데이터를 외부 API에 보낼 수 있나)·커스터마이징 필요성",
          "대표 벤치마크 — MMLU(지식·추론)·GSM8K(수학)·HumanEval(코드)·HellaSwag(상식)",
          "리더보드 — HuggingFace Open LLM Leaderboard(공개 모델 자동 채점)·LMSYS Chatbot Arena(사람 블라인드 비교 Elo)",
          "주의: 벤치마크 점수가 높아도 내 업무에선 다를 수 있으니 내 데이터·과제로 직접 평가(오프라인 테스트)하는 습관이 중요"
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
        "h": "실행 구조·개발 환경",
        "items": [
          "Homebrew·Python 3.11·VS Code로 개발 환경 갖추기",
          "venv로 가상환경 만들고 pip로 패키지 관리",
          "소스→AST→바이트코드→PVM 실행 과정 이해"
        ]
      },
      {
        "h": "자료구조·컴프리헨션",
        "items": [
          "list/dict/set/tuple의 특징과 시간복잡도",
          "리스트·딕셔너리 컴프리헨션",
          "제너레이터로 메모리 아끼기",
          "dataclass·TypedDict로 구조 표현"
        ]
      },
      {
        "h": "함수·파일·예외",
        "items": [
          "functools(partial·reduce) 활용",
          "CSV·JSON·Parquet 읽고 쓰기",
          "pathlib로 경로 다루기",
          "예외 처리(try/except)로 안전하게"
        ]
      },
      {
        "h": "타입·검증",
        "items": [
          "타입 힌트로 의도 드러내기",
          "Pydantic v2(BaseModel·Field·model_dump/validate)",
          "mypy로 타입 검사"
        ]
      },
      {
        "h": "코드 품질·테스트",
        "items": [
          "Ruff로 린트·포맷 자동화",
          "pytest로 테스트 작성",
          "requirements.txt로 의존성 고정",
          "VS Code 디버거로 단계 실행"
        ]
      },
      {
        "h": "비동기·병렬",
        "items": [
          "asyncio(async/await)로 비동기 처리",
          "httpx로 비동기 HTTP 호출",
          "멀티프로세싱으로 CPU 병렬 처리",
          "timeit·cProfile로 성능 측정"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. venv 만들고 개발환경 검증",
        "steps": [
          "터미널에서 'python3.11 -m venv .venv' 로 가상환경을 만든다.",
          "'source .venv/bin/activate' 로 가상환경을 활성화한다.",
          "'pip install httpx pydantic ruff pytest' 로 필요한 패키지를 설치한다.",
          "'pip freeze > requirements.txt' 로 환경을 기록한다.",
          "VS Code에서 인터프리터를 .venv로 지정한다."
        ]
      },
      {
        "title": "Lab2. 컴프리헨션·제너레이터·dataclass로 데이터 모델링",
        "steps": [
          "주문 리스트를 컴프리헨션으로 정제한다.",
          "@dataclass로 Order(상품·수량·금액)를 정의해 표현한다.",
          "제너레이터로 대용량 로그를 한 줄씩 읽어 합계를 구한다.",
          "리스트 방식과 제너레이터 방식의 메모리 차이를 체감한다."
        ]
      },
      {
        "title": "Lab3. Pydantic 검증 + pytest + Ruff",
        "steps": [
          "BaseModel로 주문 스키마를 정의해 잘못된 데이터가 걸러지는지 확인한다.",
          "핵심 함수에 pytest 테스트를 작성한다.",
          "'ruff check .' 와 'ruff format .' 으로 코드를 정리한다."
        ]
      }
    ],
    "homework": [
      "공공 데이터포털 등 무료 JSON API에서 asyncio·httpx로 데이터를 비동기 수집하고, Pydantic으로 스키마를 검증한 뒤 Parquet로 저장하는 스크립트를 작성해 제출한다.",
      "위 스크립트의 수집·변환 함수에 pytest 테스트를 최소 2개 붙이고, ruff로 정리한 뒤 requirements.txt와 함께 Git으로 커밋해 재현 가능한 형태로 만든다."
    ]
  },
  "python-2": {
    "topics": [
      {
        "h": "Pandas 2.x",
        "items": [
          "로딩·탐색·선택·정렬",
          "결측치·이상치 다루기",
          "groupby·pivot_table·merge",
          "Copy-on-Write 이해"
        ]
      },
      {
        "h": "Polars+DuckDB",
        "items": [
          "Lazy API(scan_csv·filter·group_by·collect)",
          "Pandas와 성능 비교",
          "DuckDB SQL로 분석",
          "데이터 크기별 처리 전략 선택"
        ]
      },
      {
        "h": "시각화",
        "items": [
          "Matplotlib 기본 그래프",
          "Plotly Express 인터랙티브 차트",
          "Altair 선언형 시각화",
          "Streamlit으로 공유"
        ]
      },
      {
        "h": "통계·ML",
        "items": [
          "기술통계·상관계수",
          "t-test·카이제곱 검정",
          "sklearn Pipeline 구성",
          "joblib으로 모델 저장"
        ]
      },
      {
        "h": "자동화",
        "items": [
          "schedule·cron으로 반복 실행",
          "Jinja2로 리포트 생성",
          "LLM API 개요",
          "파이프라인 설계"
        ]
      },
      {
        "h": "구조화·공유",
        "items": [
          "Jupyter vs .py 선택",
          "프로젝트 폴더 표준",
          "모듈화로 재사용",
          "GitHub로 공유"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab1. Polars Lazy로 대용량 CSV 빠르게 집계",
        "steps": [
          "pl.scan_csv로 대용량 파일을 lazy로 연다.",
          "filter·group_by·agg로 처리 계획을 쌓는다.",
          "collect()로 실제 실행한다.",
          "같은 작업을 Pandas로도 해 timeit으로 속도를 비교한다."
        ]
      },
      {
        "title": "Lab2. DuckDB로 Parquet에 SQL 분석",
        "steps": [
          "duckdb.sql(\"SELECT day, AVG(tip) FROM 'tips.parquet' GROUP BY day\") 처럼 파일에 직접 SQL을 실행한다.",
          "결과를 DataFrame으로 받아 확인한다.",
          "Pandas로 같은 집계를 했을 때와 코드 길이를 비교한다."
        ]
      },
      {
        "title": "Lab3. Plotly EDA + 기초 통계 + Pipeline",
        "steps": [
          "Plotly Express로 산점도·막대 인터랙티브 차트를 그린다.",
          "두 그룹 평균 차이를 t-test로 검정한다.",
          "sklearn Pipeline(전처리+모델)을 구성한다.",
          "joblib으로 파이프라인을 저장한다."
        ]
      },
      {
        "title": "Lab. groupby·pivot_table·merge 로 표 요약·결합 (2교시 실습)",
        "steps": [
          "seaborn 의 tips 데이터를 불러온다: import seaborn as sns; df = sns.load_dataset('tips').",
          "groupby: df.groupby('day')['tip'].mean() 으로 요일별 평균 팁을 구한다.",
          "pivot_table: df.pivot_table(index='day', columns='smoker', values='tip', aggfunc='mean') 로 요일×흡연여부 교차표를 만든다.",
          "merge: 요일별 평균을 담은 작은 표를 df 에 pd.merge(df, 평균표, on='day') 로 붙여 각 행에 '그 요일 평균'을 결합한다.",
          "각 행의 tip 이 그 요일 평균보다 큰지 비교하는 파생 열을 만들어 결과를 확인한다."
        ]
      }
    ],
    "homework": [
      "공개 데이터셋 하나를 골라 Polars(또는 Pandas)로 EDA→Plotly 시각화 2개→관심 있는 두 집단 평균 차이를 t-test로 검정하고 결론을 한 문장으로 정리해 노트북으로 제출한다.",
      "전처리+모델을 sklearn Pipeline으로 묶어 joblib으로 저장하고, 분석 프로젝트를 data/·src/·notebooks/ 폴더 구조로 정리해 README와 함께 GitHub에 공유한다."
    ]
  },
  "prompt-1": {
    "topics": [
      {
        "h": "생성형 AI 이해(트렌드·비즈니스)",
        "items": [
          "AI의 진화: 규칙기반 → 머신러닝 → 딥러닝 → 생성형 AI",
          "최신 트렌드: 파운데이션 모델·멀티모달·에이전트로의 확장",
          "비즈니스 활용: 마케팅 카피·문서 요약·코드 생성·시장조사/전략 초안",
          "LLM의 한계: 확률적 생성이라 사실을 지어내는 할루시네이션 발생 → 근거 요구·사람 검증 필요"
        ]
      },
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
      },
      {
        "h": "Prompt를 넘어서: Context → Agent·Harness",
        "items": [
          "Prompt의 한계: 문장만으로는 최신·사내 정보를 못 넣음",
          "Context Engineering: 무엇을·얼마나·어떤 순서로 맥락에 넣을까",
          "AI Agent: 모델이 도구를 골라 스스로 실행",
          "Harness Engineering: 도구·검색·오류처리 등 주변 장치 설계"
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
      },
      {
        "title": "Lab3. 할루시네이션 확인하기",
        "steps": [
          "모델에게 실존하지 않을 법한 통계·논문을 물어 답을 받아 본다.",
          "그 답의 근거(출처)를 요구해 답이 어떻게 달라지는지 관찰한다.",
          "왜 지어내는지를 확률적 생성 관점에서 한 줄로 정리한다."
        ]
      },
      {
        "title": "Lab. System 메시지만 바꿔 챗봇 성격 갈아끼우기 (역할 분리 체감)",
        "steps": [
          "1) system 없이 user에만 '고객 문의에 답해줘'를 넣고 같은 문의('환불 언제 되나요?')에 답하게 해 기본 톤을 본다.",
          "2) system에 '너는 근엄한 법률 상담사다. 반말 금지, 3문장 이내'를 넣고 똑같은 user 문의를 던진다.",
          "3) 이번엔 system만 '너는 발랄한 20대 친구다. 이모지를 섞어 답해라'로 바꾸고 같은 문의를 던진다.",
          "4) user 문장은 하나도 안 바꿨는데 system만으로 말투·형식·길이가 통째로 달라지는지 세 결과를 나란히 놓고 비교한다.",
          "5) '규칙·성격은 System, 처리할 내용은 User'라는 역할 분리 원칙을 한 줄로 정리해 적는다."
        ]
      }
    ],
    "homework": [
      "본인 업무에서 자주 하는 반복 작업 1가지를 골라, 역할·지시·예시·제약 4요소를 모두 갖춘 프롬프트로 만들고 개선 전후 결과를 비교해 제출한다.",
      "같은 질문을 temperature 0과 1로 각각 3번씩 실행해, 답이 얼마나 달라지는지 관찰한 메모를 제출한다.",
      "본인 업무나 관심 분야에서 시장조사가 필요한 주제 1개를 골라, 역할·지시·예시·제약을 갖춘 리서치 프롬프트로 조사 결과를 뽑고, 그 결과를 근거로 한 의사결정 추천까지 이어지는 2단계 프롬프트를 만들어 제출한다."
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
      },
      {
        "h": "개발환경과 Vue Devtools",
        "items": [
          "Node.js/WSL 위에서 Vite 개발 서버 구동",
          "브라우저 Vue Devtools 확장 설치",
          "Devtools의 Components 탭에서 각 컴포넌트의 ref/props 실시간 값 관찰",
          "상태를 바꿨을 때 트리에서 값이 갱신되는지 눈으로 확인"
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
      },
      {
        "title": "Lab 3. Vue Devtools로 반응형 상태 들여다보기",
        "steps": [
          "브라우저에 Vue Devtools 확장을 설치한다",
          "개발 서버를 띄우고 Devtools의 Components 탭을 연다",
          "입력창에 글자를 칠 때마다 todos/text 상태가 트리에서 바뀌는 것을 관찰한다"
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
      },
      {
        "h": "Provide & Inject",
        "items": [
          "부모에서 provide(키, 값)로 데이터 제공",
          "자손 어디서나 inject(키)로 주입받기",
          "props 릴레이(중간 전달) 없이 깊은 자식에 전달",
          "트리 범위 공유는 Provide/Inject, 앱 전역 공유는 Pinia"
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
      },
      {
        "title": "Lab 3. 테마 값 provide/inject로 내려주기",
        "steps": [
          "App.vue에서 provide로 색 테마를 제공한다",
          "2단계 아래 버튼 컴포넌트에서 inject로 테마를 받는다",
          "받은 테마 값을 버튼 배경색에 적용해 깊은 자식까지 전달됨을 확인한다"
        ]
      },
      {
        "title": "Lab 4. 라이프사이클과 컴포저블 묶어 연습하기",
        "steps": [
          "composables/useClock.js 를 만들고, ref 로 현재 시각 문자열 상태 now 를 선언한다",
          "useClock 안에서 onMounted 로 setInterval 을 걸어 1초마다 now 를 new Date().toLocaleTimeString() 으로 갱신한다",
          "useClock 안에서 onUnmounted 로 clearInterval 을 호출해 타이머를 정리한 뒤 { now } 를 반환한다",
          "컴포넌트에서 const { now } = useClock() 로 꺼내 <p>{{ now }}</p> 로 화면에 실시간 시계를 표시한다",
          "시계 컴포넌트를 v-if 로 켰다 껐다 하며, 껐을 때 onUnmounted 가 불려 타이머가 멈추는지 콘솔 로그로 확인한다"
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
      },
      {
        "title": "Lab 3. 동적 파라미터로 목록→상세 왕복 만들기",
        "steps": [
          "라우트에 { path: '/product/:id', component: ProductDetail } 를 추가한다",
          "ProductList.vue 에서 v-for 로 상품을 찍고 각 항목을 <router-link :to=\"'/product/' + p.id\"> 로 감싼다",
          "ProductDetail.vue 에서 const route = useRoute() 후 route.params.id 로 번호를 읽어 화면에 표시한다",
          "watch(() => route.params.id, 불러오기함수) 를 걸어, 상세에서 다른 상품으로 바로 이동해도 데이터가 갱신되는지 확인한다",
          "상세 화면에 <router-link to=\"/\">목록으로</router-link> 를 두어 왕복 이동이 새로고침 없이 되는지 본다"
        ]
      },
      {
        "title": "Lab 4. 네비게이션 가드로 로그인 검문 붙이기",
        "steps": [
          "보호할 라우트에 meta: { requiresAuth: true } 를 달고, /login 라우트를 하나 만든다",
          "로그인 상태를 흉내 낼 isLoggedIn 값(간단히 localStorage 또는 Pinia 스토어)을 둔다",
          "router.beforeEach((to) => { ... }) 를 등록해 to.meta.requiresAuth 이면서 로그인 안 됐으면 return '/login' 을 반환한다",
          "로그아웃 상태에서 주소창에 보호 경로를 직접 입력해 /login 으로 튕겨 나가는지 확인한다",
          "isLoggedIn 을 true 로 바꾼 뒤 같은 경로로 정상 진입되는지 확인한다"
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
          "정적 호스팅 배포",
          "ESLint: 문법 오류·안티패턴을 자동 검출해 실수 예방",
          "Prettier: 저장 시 코드 서식(들여쓰기·따옴표)을 자동 정리해 팀 스타일 통일",
          "npm run lint로 검사, 에디터 저장 시 자동 포맷 설정",
          "vite.config.js에서 별칭(@ → src)·server 포트·base 경로 설정",
          "import.meta.env.VITE_ 접두사 환경변수의 빌드 시 주입 원리"
        ]
      },
      {
        "h": "UI 라이브러리 Element Plus",
        "items": [
          "npm install element-plus로 설치, main.js에서 app.use(ElementPlus) 등록",
          "el-button·el-input·el-table 등 미리 만들어진 공통 컴포넌트 사용",
          "직접 CSS를 짜지 않고 검증된 UI로 화면 생산성 향상",
          "아이콘·폼·다이얼로그 같은 실무 빈발 컴포넌트"
        ]
      },
      {
        "h": "Modern JavaScript(ES6+) 핵심 문법",
        "items": [
          "구조분해 할당: const {name, email} = user / const [first] = arr",
          "전개·나머지: {...obj}, [...arr], function(...args)",
          "화살표 함수와 짧은 반환",
          "템플릿 리터럴 백틱 문자열",
          "import/export 모듈 시스템",
          "옵셔널 체이닝 user?.address?.city 와 null 병합 ??",
          "배열 고차함수 map·filter·reduce·find"
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
      },
      {
        "title": "Lab 3. Element Plus로 폼·테이블 5분 만에 만들기",
        "steps": [
          "npm install element-plus로 설치하고 main.js에서 app.use(ElementPlus)를 등록한다",
          "el-form에 el-input 두 개와 el-button을 배치한다",
          "입력 결과를 el-table로 표시해 화면이 빠르게 완성되는지 확인한다"
        ]
      },
      {
        "title": "Lab 4. Vue 코드에 자주 쓰는 ES6+ 연습",
        "steps": [
          "props를 구조분해 할당으로 받아 쓴다",
          "배열을 map으로 돌려 목록을 렌더링한다",
          "옵셔널 체이닝(user?.address?.city)으로 안전하게 값에 접근한다"
        ]
      },
      {
        "title": "Lab 5. ESLint·Prettier 붙이고 저장 시 자동 정리 확인",
        "steps": [
          "ESLint·Prettier를 설치하고 설정 파일을 추가한다",
          "일부러 들여쓰기·따옴표를 흩뜨린 코드를 작성한다",
          "파일을 저장했을 때 서식이 자동으로 정리되는지 확인한다",
          "npm run lint로 남은 경고를 확인하고 고친다"
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
      },
      {
        "h": "제출 산출물 & 평가 기준(첫날 공유)",
        "items": [
          "제출물: ① 기획서(주제·시나리오·기능명세) ② 화면 설계(와이어프레임) ③ 동작하는 코드 저장소 ④ 배포 URL ⑤ 발표 자료·회고",
          "평가: 완성도(기능이 실제로 도는가)",
          "평가: AI 기능의 적절성(서비스에 AI가 자연스럽게 쓰였는가)",
          "평가: 설계 충실도(기획과 결과가 일치하는가)·협업/커밋 이력·발표 전달력",
          "첫날부터 '무엇을 내야 하고 어떻게 채점되는지'를 알고 역산해 작업하기"
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
      },
      {
        "title": "Lab 3. 주제→시나리오→기능명세→와이어프레임 설계 워크숍 (2·3·4교시 통합 실습)",
        "steps": [
          "팀이 만들 서비스를 한 문장으로 확정한다('___를 위한 ___ 앱, AI로 ___를 해준다' 빈칸 채우기).",
          "사용자 시나리오를 '누가 / 언제 / 무엇을 하고 싶다' 형식으로 3개, 포스트잇에 적어 붙인다.",
          "시나리오에서 나온 기능들을 MoSCoW 4칸(Must/Should/Could/Won't)에 나눠 붙이고, Must는 3개 이하로 줄인다(AI 기능 1개를 반드시 Must에 포함).",
          "Must 기능만으로 화면 3장(메인·목록·상세 또는 입력)을 종이에 와이어프레임으로 그린다(색·디자인 없이 상자와 글자만).",
          "각 화면에 '여기서 어디로 이동하는가'를 화살표로 이어 화면 흐름도를 완성한다.",
          "완성한 4칸판·와이어프레임 사진을 찍어 README에 붙이고 커밋한다."
        ]
      },
      {
        "title": "Lab 4. 데이터 모델과 아키텍처 한 장 그리기 (5교시 실습)",
        "steps": [
          "와이어프레임 화면에 보이는 정보를 모두 적어 필드 목록을 뽑는다(예: 이름·별점·태그·메모).",
          "각 필드의 이름(영문)·자료형·예시값을 표로 정리한다(예: id: number: 1 / name: string: '행복 김밥' / rating: number: 4.5).",
          "이 표를 그대로 data/mock.json 한 덩어리로 옮겨 적는다(항목 3개 이상, 여기서 정한 키 이름이 나중에 DB 컬럼이 됨을 강조).",
          "종이에 '브라우저 화면 → LLM API → 데이터 저장소'를 상자와 화살표로 그린다.",
          "우리 AI 기능의 데이터 흐름(입력→요청→응답→표시)을 화살표 위에 한국어 문장으로 적어 아키텍처 그림을 완성하고 사진을 README에 첨부한다."
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
      },
      {
        "title": "Lab 3. AI 요약 기능을 화면에 붙이기 (7교시 실습)",
        "steps": [
          "프로젝트 루트에 .env 파일을 만들어 VITE_OPENAI_API_KEY=sk-... 를 적고, .gitignore에 .env가 포함돼 있는지 확인한다(키가 깃에 올라가면 즉시 폐기해야 함).",
          "요약을 담당할 컴포넌트에 summary·loading·error 세 개의 반응형 변수(ref)를 만든다.",
          "'AI 요약' 버튼을 누르면 loading을 true로 바꾸고, fetch로 LLM API에 메모와 프롬프트를 POST한다.",
          "응답 JSON에서 요약 문장만 꺼내 summary에 담고 카드 아래에 표시한다.",
          "실패 시 catch에서 error에 안내 문구를 담아 빨간 글씨로 보여주고, finally에서 loading을 false로 되돌린다.",
          "브라우저에서 메모를 입력해 요약이 뜨는지, 요청 중 버튼이 잠기는지, 일부러 키를 틀리게 넣어 에러 문구가 뜨는지까지 확인하고 커밋한다."
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
          "팀 회고와 개선점",
          "3분 시연 시나리오 대본(어떤 순서로 무엇을 눌러 보일지)",
          "AI 기능이 실제로 도는 장면을 반드시 시연에 포함",
          "평가 기준(완성도·AI 적절성·설계 충실도·발표)에 맞춰 발표 구성"
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
      },
      {
        "title": "Lab 3. 통합 테스트 시나리오 돌리고 버그 목록 만들기 (1·3교시 실습)",
        "steps": [
          "팀원들의 작업을 하나의 main 브랜치로 합치고(merge), 충돌이 나면 함께 해결한 뒤 npm run dev로 앱을 켠다.",
          "'실사용자 시나리오' 순서(메인 접속→목록 보기→상세 이동→새 글 추가→AI 기능 실행→삭제)를 한 명이 천천히 클릭한다.",
          "각 단계마다 기대한 대로 동작하는지, 콘솔에 빨간 에러가 없는지 확인한다.",
          "어긋나는 지점을 '버그 목록' 표에 [증상 / 재현 순서 / 심각도(높음·낮음)] 형식으로 적는다.",
          "심각도 높음(앱이 멈춤·핵심 기능이 안 됨)부터 고칠 순서를 매긴다."
        ]
      },
      {
        "title": "Lab 4. 버그 재현→수정→재검증 사이클 돌리기 (2교시 실습)",
        "steps": [
          "버그 목록에서 심각도 높은 항목 하나를 고른다.",
          "재현 순서대로 눌러 버그를 눈앞에서 다시 만들어낸다(재현이 안 되면 조건을 더 좁힌다).",
          "콘솔의 에러 메시지와 줄 번호를 읽고, 의심 구간에 console.log를 찍어 값이 어디서 이상해지는지 원인을 좁힌다.",
          "원인 한 곳만 고쳐 저장한 뒤, 같은 순서로 다시 눌러 해결됐는지 확인한다.",
          "주변 기능(목록·추가·AI 요약)도 다시 눌러 새 버그가 생기지 않았는지 재검증하고, 버그 목록에 해결 표시를 한 뒤 커밋한다."
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
          "API 키를 환경변수로 등록",
          "API Key 관리: 환경변수·외부 설정으로 분리하고 키를 코드·깃에 커밋 금지",
          "팀 공유 시 .env·비밀저장소 사용"
        ]
      },
      {
        "h": "기초 개념 정리(LLM·Token·모델 종류)",
        "items": [
          "LLM=다음 단어를 확률로 예측하는 모델",
          "Token=모델이 글을 쪼개 세는 단위(대략 한글 1~2자/영어 3~4자), 입력+출력 토큰이 곧 비용",
          "Chat Model=대화형 응답 모델 / Embedding Model=문장을 벡터로 바꾸는 모델(RAG에서 사용)",
          "Spring AI가 이 둘을 각각 ChatModel·EmbeddingModel 추상화로 제공"
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
      },
      {
        "title": "Lab3. PromptTemplate으로 다국어 번역기 만들기",
        "steps": [
          "'{언어}로 번역해 줘: {문장}' 양식의 PromptTemplate을 만든다.",
          "GET /api/translate?lang=&text= 로 두 값을 받아 render(Map.of(...))로 프롬프트를 완성한다.",
          "lang을 영어·일본어·프랑스어로 바꿔 호출해 결과를 비교한다.",
          "system 메시지('결과만 답해')를 잠깐 지우고 호출해, 설명이 덧붙는 등 답이 지저분해지는 것을 관찰한다.",
          "문자열 이어붙이기(user(\"...\"+text)) 방식과 비교해 어느 쪽이 실수가 적은지 팀과 한 줄로 정리한다."
        ]
      },
      {
        "title": "Lab4. 자주 나는 오류 잡고 마무리 점검",
        "steps": [
          "일부러 api-key 환경변수를 지우고 실행해 401 인증 오류 메시지를 눈으로 확인한다(원인: 키 누락/오타).",
          "application.yml의 model 이름을 존재하지 않는 값으로 바꿔 모델 오류를 재현하고, 로그의 어느 줄에 단서가 있는지 찾는다.",
          "응답이 느릴 때를 대비해 spring.ai...chat.options에 타임아웃 관련 옵션을 넣고 동작을 확인한다.",
          "오늘 만든 /api/chat, system 파라미터 버전, PromptTemplate 번역기를 한 번씩 호출해 최종 정상 동작을 확인한다.",
          "막혔던 지점과 해결법을 '증상 → 원인 → 해결' 3줄로 팀 위키에 남긴다."
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
        "title": "Lab0. pgvector 띄우고 연결 확인하기",
        "steps": [
          "docker run 으로 pgvector/pgvector:pg16 컨테이너를 띄우고 docker ps 로 Up 상태를 확인한다.",
          "application.yml에 datasource(url·username·password)와 spring.ai.vectorstore.pgvector.initialize-schema=true 를 적는다.",
          "앱을 실행하면 vector_store 테이블이 자동 생성되는지 psql(또는 DBeaver)로 확인한다.",
          "SELECT count(*) FROM vector_store; 로 지금은 0건임을 확인해 둔다(뒤 Lab1 적재 후 다시 세어 비교하기 위함).",
          "컨테이너를 껐다 켰을 때 데이터가 사라지는지 관찰하고, 영속 볼륨(-v)이 왜 필요한지 한 줄로 정리한다."
        ]
      },
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
      },
      {
        "title": "Lab3. 대화 기억하는 챗봇 만들기(ChatMemory)",
        "steps": [
          "ChatMemory 빈(InMemoryChatMemory)을 등록한다.",
          "ChatClient에 MessageChatMemoryAdvisor를 defaultAdvisors로 붙인다.",
          "요청마다 conversationId(대화방 번호)를 넘긴다.",
          "'내 이름은 민수야'라고 보낸 뒤 다음 요청에서 '내 이름 뭐였지?'로 물어 기억하는지 확인한다.",
          "conversationId를 바꿔 호출하면 기억이 초기화되는지 비교한다."
        ]
      }
    ],
    "homework": [
      "QnA 응답에 '참고한 문단의 출처(파일명·일부 텍스트)'를 함께 반환하도록 ask()를 개선하라.",
      "청크 크기(TokenTextSplitter 설정)를 작게/크게 두 가지로 바꿔 같은 질문의 답 품질을 비교하고 3줄로 정리하라.",
      "QuestionAnswerAdvisor(Prebuilt)로 Day2 RAG를 Advisor 방식으로 리팩터링해 코드가 얼마나 짧아지는지 3줄로 정리하라."
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
      },
      {
        "title": "Lab4. 외부 MCP 서버 도구 붙이기",
        "steps": [
          "오늘 만든 MCP Server 프로젝트를 ./gradlew build 로 jar로 만든다.",
          "클라이언트 앱에 spring-ai-starter-mcp-client 의존성을 추가한다.",
          "application.yml의 spring.ai.mcp.client.stdio.connections 에 서버 jar 실행 명령(command: java, args: -jar ...)을 등록한다.",
          "ChatClient.Builder에 자동 주입된 ToolCallbackProvider(mcpTools)를 defaultToolCallbacks로 붙인다.",
          "'3번 사원 정보 알려줘'로 호출해 서버의 findEmployee 도구가 실행되는지 양쪽 로그로 확인한다.",
          "MCP 서버를 끄고 다시 호출해, 도구를 못 쓸 때 LLM이 어떻게 답하는지 관찰한다."
        ]
      },
      {
        "title": "Lab5. 도구 두 개를 스스로 쓰는 에이전트 만들기",
        "steps": [
          "getWeather, getAttractions 두 @Tool을 한 컨트롤러에 만든다.",
          "defaultSystem으로 '목표를 이루려 도구를 스스로 골라 호출하라'는 지시를 준다.",
          "'맑으면 야외, 비 오면 실내로 부산 반나절 코스 짜줘'로 호출한다.",
          "로그에서 날씨 조회 → 명소 조회 순으로 도구가 연쇄 호출되는지 확인한다.",
          "system에 '도구는 최대 2번만 호출' 같은 제약을 넣어 행동이 어떻게 달라지는지 비교한다.",
          "도구 없이 같은 질문을 던진 경우와 답의 구체성을 비교해 팀과 한 줄로 정리한다."
        ]
      },
      {
        "title": "Lab6. MCP·에이전트 통합 시연과 마무리 점검",
        "steps": [
          "원격 MCP 서버 도구(findEmployee)와 로컬 @Tool(getWeather 등)을 한 에이전트에 함께 등록한다.",
          "두 도구가 모두 필요한 질문(예: '3번 사원이 근무하는 도시 날씨 알려줘')을 던진다.",
          "도구 호출 순서와 최종 답을 화면/로그로 캡처한다.",
          "일부러 MCP 서버를 꺼서 연결 실패를 만들고, try-catch로 사용자 친화 메시지로 바꾼다.",
          "3일간 배운 흐름(ChatClient → PromptTemplate → RAG → Tool → MCP → Agent)을 한 장 그림으로 정리한다.",
          "팀 앞에서 30초로 시연하고, 우리가 코드로 짜지 않았는데 자동으로 일어난 일이 무엇인지 한 줄로 설명한다."
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
      },
      {
        "h": "MLM vs CLM와 sLLM Use Case",
        "items": [
          "MLM(BERT식): 빈칸 맞히기, 이해·분류에 강함",
          "CLM(GPT식): 다음 단어 예측, 생성에 강함(sLLM 주류)",
          "Use Case: DBMS·영업비밀·개인정보 등 외부 반출 금지 업무",
          "로컬 sLLM이면 데이터가 내부에 머물러 보안에 유리"
        ]
      },
      {
        "h": "LLM이 답을 만들기까지 — 공통 4단계",
        "items": [
          "① 토크나이저: 문장을 모델이 아는 숫자 조각(토큰)으로 쪼갬",
          "② 임베딩: 각 토큰을 의미를 담은 벡터로 바꿈",
          "③ 전처리: 프롬프트 템플릿(chat template)으로 질문을 정해진 대화 양식으로 감쌈",
          "④ 후처리: 생성된 토큰을 다시 글자로 되돌리고 stop token에서 끊어 필요한 부분만 남김",
          "sLLM도 이 4단계는 똑같고, 다만 모델 본체가 경량화·양자화되어 있고 PEFT로 갈아 끼우기 쉽다는 점이 다름"
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
      },
      {
        "title": "Lab 3 — Hugging Face 모델 카드 제대로 읽기",
        "steps": [
          "huggingface.co 에서 'Qwen/Qwen2.5-0.5B-Instruct' 페이지를 연다.",
          "상단 요약에서 파라미터 규모(0.5B)와 지원 언어(한국어 포함 여부)를 확인한다.",
          "'License' 항목을 찾아 상업적 사용이 가능한 라이선스인지 확인한다(회사 도입 시 필수 체크).",
          "'Intended use'/'Limitations' 부분을 읽고 이 모델이 무엇에 강하고 무엇에 약한지 두 줄로 메모한다.",
          "모델 이름 뒤 '-Instruct' 유무의 차이(대화용으로 다듬어졌는지)를 옆 사람과 설명해 본다.",
          "같은 방식으로 'google/gemma-2-2b-it' 카드도 열어 라이선스·언어·크기를 표로 비교한다."
        ]
      },
      {
        "title": "Lab 4 — 우리 팀 sLLM Use Case 도출 워크숍",
        "steps": [
          "우리 회사·부서에서 '외부로 데이터를 보내면 안 되는' 업무를 3개 적어 본다(예: 계약서 요약, 상담로그 분류, 사내 DB 질의).",
          "각 업무에 대해 '작업 난이도(상/중/하)'와 '데이터 민감도(상/중/하)'를 표로 매긴다.",
          "두 값을 놓고 sLLM이 맞는지(민감도 높음+난이도 중하), 큰 API가 맞는지 판정한다.",
          "sLLM으로 정한 업무 하나를 골라 입력(무엇을 넣고)·출력(무엇을 받는지)을 한 문장씩 정의한다.",
          "그 업무를 오늘 배운 로컬 서빙으로 구현한다면 어떤 순서일지 3단계로 스케치한다.",
          "팀별로 1분씩 발표하고, 강사와 함께 '가장 현실적인 첫 과제'를 하나 정한다."
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
      },
      {
        "h": "PEFT 변형 비교와 sLLM 서비스",
        "items": [
          "LoRA/QLoRA: 도메인 지식 주입에 두루 강함(대세)",
          "Adapter: 여러 작업을 부품처럼 갈아 끼울 때",
          "Prefix/Prompt Tuning: 극소 자원·초경량이 필요할 때",
          "선택 가이드: 목적(지식·자원·전환)에 맞게 고르기",
          "서비스화: 파인튜닝 sLLM + 임베딩 + Vector DB(RAG) 연결"
        ]
      },
      {
        "h": "목적별 PEFT 시나리오 3종 — 무엇이 달라지나",
        "items": [
          "① 도메인 지식/말투 주입 → LoRA·QLoRA, 지시-출력 쌍 수십~수백 장, r=8~16, 에폭 3 안팎(가장 흔한 기본값)",
          "② 극소 자원·초경량 배포 → Prefix/Prompt Tuning, 본체는 그대로 두고 가상 토큰만 학습",
          "③ 여러 작업 전환 → Adapter, 작업별 부품을 끼웠다 뺐다 하며 한 본체로 다역",
          "④ 추론 능력 강화 → 사고과정이 담긴 데이터로 LoRA 학습하거나 큰 모델 답을 증류",
          "핵심 차이: 목적이 바뀌면 데이터 형태·붙이는 위치·학습 강도가 함께 바뀜 — 기법만 고르는 게 아니라 데이터부터 다르게 준비"
        ]
      },
      {
        "h": "서빙 기본 성능 튜닝 — 배포 전 체크리스트",
        "items": [
          "샘플링: temperature 낮추면(0~0.3) 일관, 높이면 다양 — 업무용은 낮게",
          "길이 제한: max_new_tokens로 답 길이·응답시간 통제",
          "스트리밍: 한 글자씩 흘려보내면 체감 속도가 빨라짐",
          "양자화 추론: 4비트로 올리면 메모리↓ 속도↑, 품질은 소폭↓",
          "동시 처리: 트래픽이 많으면 vLLM 같은 서버로 배치 처리, KV 캐시로 반복 연산 절약",
          "어댑터 병합: 배포 시 LoRA를 본체에 합치면(merge) 로딩·추론이 단순해짐"
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
      },
      {
        "title": "Lab 4 — 사내 문서 3개로 미니 RAG 붙이기",
        "steps": [
          "우리 팀 규정·매뉴얼에서 한두 문장짜리 사실 문장 3~5개를 골라 docs 리스트로 적는다.",
          "'pip install sentence-transformers numpy' 로 임베딩 라이브러리를 설치한다.",
          "examples의 rag.py 코드를 그대로 만들고 docs만 우리 문장으로 교체한다.",
          "Ollama가 켜져 있는지(ollama run qwen2.5:0.5b) 확인한다.",
          "우리 문서로만 답할 수 있는 질문을 던져 모델이 올바른 근거를 인용하는지 확인한다.",
          "일부러 문서에 없는 질문을 던져 '근거에 없다'고 답하는지, 아니면 지어내는지(환각) 관찰하고 한 줄 코멘트를 단다.",
          "top_k를 1에서 2로 늘려 답변이 어떻게 달라지는지 비교한다."
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
          "트리 기반: 결정트리(Decision Tree)",
          "앙상블: 랜덤포레스트·Gradient Boosting/XGBoost",
          "정규화·커널 기반: Lasso/Ridge, SVM 커널",
          "선형/로지스틱 회귀·KNN(최근접 이웃)"
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
      },
      {
        "title": "Lab 3 · 모델 세 개 대결 + 혼동행렬로 오답 분석",
        "steps": [
          "`from sklearn.tree import DecisionTreeClassifier`, `from sklearn.ensemble import RandomForestClassifier`, `from sklearn.neighbors import KNeighborsClassifier` 를 모두 불러온다.",
          "앞에서 나눠 둔 X_tr, y_tr 로 세 모델을 각각 `.fit()` 한 뒤, `for name, m in [('트리',tree),('랜덤포레스트',rf),('KNN',knn)]:` 반복문으로 `m.score(X_te, y_te)` 를 출력해 정확도를 나란히 비교한다.",
          "가장 점수가 낮게 나온 모델을 골라 `confusion_matrix(y_te, m.predict(X_te))` 를 찍어, 어느 품종을 어느 품종으로 헷갈렸는지 대각선 밖의 칸을 찾는다.",
          "`classification_report` 로 그 모델의 품종별 정밀도·재현율을 확인하고, '어느 품종의 재현율이 가장 낮은가, 그 이유가 무엇일지'를 한 줄로 메모한다.",
          "(마무리 토의) 세 모델 중 무엇을 실제 서비스에 쓸지, 정확도 말고 어떤 근거로 골랐는지 팀별로 한 문장씩 발표한다."
        ]
      }
    ],
    "homework": [
      "scikit-learn 의 `load_wine()` 와인 데이터로 결정트리와 KNN 분류 모델을 각각 학습시키고, 정확도와 classification_report 를 비교해 어느 모델이 더 나은지 한 단락으로 정리해 제출한다.",
      "과적합을 일부러 만들어보자: DecisionTreeClassifier 의 max_depth 를 1, 3, None 으로 바꿔가며 학습용 정확도와 평가용 정확도를 표로 정리하고, 차이가 가장 큰 경우를 찾아 그 이유를 한 줄로 적는다.",
      "load_breast_cancer 데이터로 결정트리·랜덤포레스트·GradientBoosting 세 모델의 평가 정확도를 비교하고, 앙상블이 단일 트리보다 나은지 한 단락으로 정리한다."
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
          "학습률(learning rate)과 학습률 스케줄",
          "배치 정규화(Batch Normalization)"
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
      },
      {
        "title": "Lab 0 · 텐서와 자동미분 손으로 만져보기",
        "steps": [
          "`import torch` 후 `t = torch.tensor([[1.,2.,3.],[4.,5.,6.]])` 로 2x3 텐서를 만들고 `t.shape`, `t.dtype` 을 출력해 모양과 자료형을 확인한다.",
          "`t * 2`, `t + 10`, `t.sum()`, `t.mean(dim=0)` 을 차례로 실행하며 넘파이처럼 원소별 연산과 축(dim) 기준 집계가 되는 것을 눈으로 본다.",
          "`x = torch.tensor(2.0, requires_grad=True)` 로 '미분을 추적하는' 텐서를 만들고, `y = x**2 + 3*x` 를 계산한 뒤 `y.backward()` 를 부른다.",
          "`print(x.grad)` 를 실행해 7.0 이 나오는지 확인한다(2x+3 에 x=2 를 넣은 값). 이 자동미분이 뒤에 나올 역전파의 정체임을 메모한다."
        ]
      },
      {
        "title": "Lab 3 · 학습 루프를 한 줄씩 뜯어 돌리기",
        "steps": [
          "본문 손글씨 실습의 학습 루프에서 `opt.zero_grad()`, `out = model(X_tr)`, `loss = loss_fn(out, y_tr)`, `loss.backward()`, `opt.step()` 다섯 줄이 각각 '초기화→순전파→채점→역전파→이동'의 어느 단계인지 주석으로 적는다.",
          "루프 안에 `if epoch % 10 == 0: print(epoch, round(loss.item(),4))` 를 넣어 10 에폭마다 손실이 줄어드는 흐름을 출력한다.",
          "일부러 `opt.zero_grad()` 줄을 주석 처리하고 다시 돌려, 손실이 이상하게 요동치거나 학습이 망가지는 것을 확인한 뒤 다시 살린다(기울기 초기화의 중요성 체감).",
          "학습률을 0.01 → 0.5 로 키워 손실이 발산(NaN/폭증)하는지, 0.0001 로 줄여 거의 안 줄어드는지 각각 관찰하고 '적당한 보폭'의 감을 한 줄로 정리한다."
        ]
      }
    ],
    "homework": [
      "본문 신경망의 은닉층 크기를 32 에서 64, 128 로 늘려가며 평가 정확도가 어떻게 바뀌는지 표로 정리하고, 무조건 크다고 좋아지는지 한 줄로 결론을 적는다.",
      "옵티마이저를 Adam 대신 `torch.optim.SGD(model.parameters(), lr=0.01)` 로 바꿔 같은 100 에폭을 학습시키고, 손실이 줄어드는 속도를 Adam 과 비교해 짧게 정리한다.",
      "nn.Linear 층 사이에 nn.BatchNorm1d 를 넣은 모델과 넣지 않은 모델을 같은 학습률로 학습시켜, 손실이 줄어드는 속도와 최종 정확도를 표로 비교한다."
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
      },
      {
        "title": "Lab 0 · CNN 한 층이 이미지를 어떻게 바꾸는지 들여다보기",
        "steps": [
          "본문 손글씨(load_digits) 데이터에서 이미지 한 장을 골라 `plt.imshow(X[0].reshape(8,8), cmap='gray')` 로 원본을 눈으로 본다.",
          "`conv = nn.Conv2d(1, 4, 3, padding=1)` 로 필터 4개짜리 합성곱 층을 만들고, 이미지 한 장을 `(1,1,8,8)` 모양으로 넣어 `out = conv(img)` 를 실행한다.",
          "`out.shape` 을 출력해 채널이 4개(필터 4개)로 늘고 가로세로는 padding 덕에 8x8 로 유지됨을 확인한다.",
          "`for i in range(4): plt.subplot(1,4,i+1); plt.imshow(out[0,i].detach(), cmap='gray')` 로 필터 4개가 만든 서로 다른 특징 지도를 나란히 띄워, 필터마다 강조하는 부분이 다름을 관찰한다.",
          "이어서 `nn.MaxPool2d(2)` 를 통과시키면 크기가 4x4 로 절반이 되는 것을 확인하고 '특징은 남기고 크기는 줄인다'를 메모한다."
        ]
      },
      {
        "title": "Lab 3 · 미니 개선 챌린지 — 내 손으로 정확도 올리기",
        "steps": [
          "본문 CNN 의 현재 평가 정확도를 기준선(baseline)으로 기록한다.",
          "아래 카드 중 두 가지 이상을 골라 하나씩만 바꿔가며(한 번에 하나!) 평가 정확도가 오르는지 표로 기록한다: (a) 합성곱 필터 수 8→16 늘리기, (b) 드롭아웃 비율 0.3↔0.5 조절, (c) 학습률 0.01↔0.005, (d) 에폭 늘리되 학습/평가 정확도 격차를 함께 관찰(조기종료 감각), (e) 합성곱 층 하나 더 쌓기.",
          "각 변경이 '왜' 효과가 있었는지/없었는지를 7교시에서 배운 하이퍼파라미터·과적합 관점으로 한 줄씩 설명한다.",
          "가장 좋았던 조합을 최종 모델로 정하고, 기준선 대비 몇 %p 올랐는지와 '다음에 데이터가 100장뿐이라면 전이학습을 어떻게 쓸지'를 3문장으로 정리해 발표한다."
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
      },
      {
        "h": "전처리 고급 기법",
        "items": [
          "고급 결측 대치: 중앙값·최빈값 대신 KNNImputer(비슷한 행 참고)·IterativeImputer(다른 열로 예측해 채우기)",
          "분포 정규화: 로그·Box-Cox·Yeo-Johnson(PowerTransformer)로 치우친 분포를 종 모양에 가깝게 펴기",
          "이상치 처리: 삭제 대신 윈저라이징(경계값으로 눌러 담기)·RobustScaler(중앙값·IQR 기준 스케일링)",
          "고카디널리티 범주: 원-핫 대신 빈도·타깃 인코딩 + 누수 방지용 스무딩"
        ]
      }
    ],
    "labs": [
      {
        "title": "Lab 0. EDA로 데이터와 친해지기",
        "steps": [
          "df.info()·df.describe()로 변수 유형과 요약통계를 확인한다.",
          "df.hist(bins=30)로 숫자 열 분포를 그려 쏠림·이상치를 눈으로 본다.",
          "df.corr(numeric_only=True)를 seaborn.heatmap으로 그려 서로 강하게 상관된 중복 후보 열을 찾는다.",
          "df.groupby('타깃')[피처].mean()으로 타깃 그룹별 피처 평균을 비교해 어떤 피처가 답과 관련 있어 보이는지 가설을 세운다.",
          "이 가설을 다음 Lab의 파생 피처·선택 근거로 메모한다."
        ]
      },
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
      },
      {
        "title": "Lab 4. 날짜·수치·텍스트에서 파생 피처 만들기",
        "steps": [
          "날짜 열을 pd.to_datetime 으로 변환한 뒤 .dt.month·.dt.dayofweek 로 월·요일을 뽑는다.",
          "요일이 5 이상이면 1이 되는 '주말가입' 파생 피처를 (조건 >= 5).astype(int) 로 만든다.",
          "두 수치 열을 나눠 '방문당 구매액' 같은 비율 피처를 만들어 소비 밀도를 표현한다.",
          "pd.cut(연속값, bins=..., labels=['소액','중간','고액']) 으로 금액을 구간 범주로 묶는다.",
          "텍스트 열에서 .str.len()·.str.split().str.len() 으로 글자수·단어수를, .str.contains('키워드').astype(int) 로 키워드 포함 여부를 만든다.",
          "만든 파생 피처마다 '왜 도움이 될지'를 한 줄씩 메모하고 df.head() 로 결과를 확인한다."
        ]
      },
      {
        "title": "Lab 5. 피처 엔지니어링 전·후 성능 비교하기",
        "steps": [
          "원본 숫자 피처만으로 X_before 를 구성하고, RandomForestClassifier 를 cross_val_score(cv=5) 로 평가해 평균 점수를 기록한다.",
          "Lab 4 에서 만든 파생 피처와 성별 인코딩을 더해 X_after 를 만든다.",
          "모델과 교차검증 설정을 똑같이 두고 X_after 의 평균 점수를 구한다(모델이 아니라 피처만 바뀌었음을 확실히 한다).",
          "두 평균 점수를 함께 출력하고 향상폭(after - before)을 계산해 얼마나 올랐는지 확인한다.",
          "모델을 한 번 fit 한 뒤 feature_importances_ 로 어떤 피처가 기여했는지 상위 순으로 확인한다.",
          "'가장 크게 기여한 파생 피처 1개가 왜 도움이 되었는지'를 한 줄로 해석해 노트북에 적는다."
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
      },
      {
        "h": "성능 평가 지표 고르기",
        "items": [
          "분류는 혼동 행렬에서 시작한다",
          "헛알람 줄이기=정밀도, 놓침 줄이기=재현율",
          "F1=둘의 균형, ROC-AUC=임계값 무관 종합 성능",
          "회귀=MAE(직관)·RMSE(큰 오차 벌점)·R²(설명력)",
          "불균형 데이터에서 정확도 함정 주의"
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
      },
      {
        "title": "Lab4. 혼동 행렬과 지표 직접 계산하기",
        "steps": [
          "모델 예측을 confusion_matrix로 출력한다.",
          "TP/FP/FN/TN을 손으로 지목해 본다.",
          "classification_report로 precision·recall·f1을 확인한다.",
          "roc_auc_score를 출력하고 0.5(찍기)와 비교한다."
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
      },
      {
        "title": "Lab4. 배깅·부스팅·스태킹 성능 겨루기",
        "steps": [
          "load_breast_cancer 로 데이터를 불러온다.",
          "RandomForestClassifier(배깅)와 GradientBoostingClassifier(부스팅)의 cross_val_score(cv=5) 평균을 각각 구해 출력한다.",
          "StackingClassifier 로 두 모델을 묶고(final_estimator=LogisticRegression) 같은 방식으로 점수를 구한다.",
          "세 점수를 나란히 print 하고, 이 데이터에서는 배깅·부스팅·스태킹 중 무엇이 가장 좋았는지 한 줄로 정리한다.",
          "(여유가 되면) RandomForest 의 n_estimators 를 100→300 으로 바꿔 점수와 학습 시간이 어떻게 달라지는지 메모한다."
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
          "'pip install langchain langchain-chroma langchain-community langchain-openai chromadb pypdf numpy' 로 라이브러리를 설치한다.",
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
      },
      {
        "title": "Lab 1-B — 첫 PDF를 실제로 로딩해 보기 (3교시 후반)",
        "steps": [
          "작업 폴더에 'docs' 폴더를 만들고 검색 대상 PDF 1개(예: 회사 규정집, 논문)를 그 안에 복사한다.",
          "터미널에서 'export OPENAI_API_KEY=sk-...'(윈도우는 set)로 API 키를 환경변수에 넣는다.",
          "PyPDFLoader('docs/파일명.pdf')로 로더를 만들고 .load()로 페이지 리스트를 받는다.",
          "'print(len(pages))'로 전체 페이지 수를, 'print(pages[0].page_content[:200])'로 첫 페이지 앞부분을 출력해 실제 텍스트가 잘 읽혔는지 눈으로 확인한다.",
          "pages[0].metadata를 출력해 source(파일명)와 page(쪽번호)가 자동으로 붙어 있는지 확인한다 — 이 메타데이터가 나중에 출처 인용의 재료가 된다."
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
          "Modular: 검색·생성을 고정 순서가 아닌 '갈아 끼우는 부품'으로 다룸",
          "Modular 모듈 예 — 라우팅(질문 종류별 인덱스/도구 분기)·검색 융합(키워드·벡터·질문변형 결과를 RRF로 재정렬)·메모리/재작성(검색 앞단에 이전 대화·질문 재작성 삽입)",
          "Advanced가 '검색을 잘하게'라면 Modular는 '흐름 자체를 조립·교체 가능하게', 여기에 스스로 판단·반복이 더해지면 Agentic",
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
      },
      {
        "h": "조별 산출물 체크리스트",
        "items": [
          "설계: 대상 문서/도메인, 청킹 전략과 근거, 리트리버 조합, 평가셋(질문+정답), 목표 지표 기준선",
          "개발: 동작하는 RAG(가능하면 재검색 루프 포함), RAGAS 3지표 측정값, 튜닝 전/후 비교 1건",
          "개발: 실패 사례 1건과 개선 시도 기록",
          "발표: 무엇을 왜 그렇게 정했고 지표가 어떻게 움직였는지 3분 요약"
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
      },
      {
        "h": "Runnable 인터페이스가 핵심이다",
        "items": [
          "모든 부품(프롬프트·모델·파서·리트리버)이 Runnable",
          "공통 메서드: invoke(한 번)·stream(조각)·batch(여러 개)",
          "그래서 | 로 아무 부품이나 끼워 넣을 수 있음",
          "LangGraph의 Node도 Runnable을 감싼 것 → 시그니처 동일"
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
      },
      {
        "h": "복합 체인과 대화 메모리",
        "items": [
          "RunnableParallel: 여러 작업을 병렬로 동시에",
          "RunnableLambda: 체인 중간에 커스텀 함수 삽입",
          "RunnableBranch: 조건에 따라 다른 체인으로 분기(if-else), 분기·조건 처리의 핵심",
          "RunnableWithMessageHistory: 세션별 대화 히스토리 유지",
          "bind_tools 결과를 이 부품들과 조합해 복합 체인 구성",
          "이 분기를 LCEL(RunnableBranch)로만 표현하면 조건이 많아질수록 읽기 어려워지고, 이 한계가 Day3에서 LangGraph가 필요한 이유로 이어진다"
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
      },
      {
        "title": "Lab 3. 댓글 한 방에 분석하고 부정 댓글만 따로 처리하기",
        "steps": [
          "댓글 문장 하나를 입력으로 두고 요약·감정·키워드 3개 체인을 RunnableParallel로 동시에 실행한다.",
          "세 결과를 {요약, 감정, 키워드} JSON으로 합친다.",
          "RunnableBranch로 감정이 negative일 때만 '사과+담당자 이관' 답변을, 그 외엔 '감사 답변'을 생성한다.",
          "긍정 댓글 1개·부정 댓글 1개를 넣어 분기가 실제로 갈리는지 확인한다."
        ]
      },
      {
        "title": "Lab. bind_tools로 모델에 계산기 손발 달기",
        "steps": [
          "langchain_core.tools의 @tool 데코레이터로 multiply(a: int, b: int) 함수를 만들고, 독스트링에 '두 정수를 곱한다'라고 또렷이 적는다(이 설명이 모델의 선택 근거가 된다).",
          "ChatAnthropic(model='claude-opus-4-8').bind_tools([multiply]) 로 모델에 도구를 묶는다.",
          "model.invoke('1234 곱하기 5678은 얼마야?') 를 실행하고 결과의 .tool_calls 를 출력한다.",
          "모델이 직접 답을 지어내지 않고 {'name':'multiply','args':{'a':1234,'b':5678}} 형태의 '주문서'만 돌려주는지 확인한다.",
          "그 주문서의 args를 꺼내 실제 multiply(**args)를 파이썬으로 호출해 정답 7006652를 구한다(판단은 모델, 실행은 나).",
          "마지막으로 '안녕, 반가워' 같은 인사말을 보내면 tool_calls가 비어 있는지 비교해, 모델이 '필요할 때만' 도구를 부른다는 것을 눈으로 확인한다."
        ]
      }
    ],
    "homework": [
      "Lab 2의 QA 챗봇에 메모리(Lab 1)를 결합해, '아까 물어본 거 다시 설명해줘' 같은 후속 질문에도 답하는 버전을 만들고 대화 로그를 제출한다.",
      "@tool로 '오늘 날짜를 돌려주는 도구'를 직접 만들어 모델에 연결하고, 모델이 그 도구를 호출하는 tool_calls 출력을 캡처해 제출한다.",
      "실제 리뷰 5개를 넣어 감정별로 다른 답변이 나오는 로그를 캡처해 제출한다."
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
      },
      {
        "h": "LangChain vs LangGraph, 언제 무엇을?",
        "items": [
          "LangChain = 연결(Chain): 직선 흐름·간단한 조합에 적합",
          "LangGraph = 상태·흐름 제어(Graph): 반복·분기·루프에 적합",
          "Runnable 통일성: Node가 Runnable을 감싸 invoke/stream 동일",
          "판단: 분기·재시도·루프가 필요하면 그래프가 더 적합"
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
      },
      {
        "title": "Lab. LangSmith로 체인 속 들여다보기",
        "steps": [
          "smith.langchain.com에 가입해 API 키를 발급받는다.",
          "터미널에 환경변수 세 줄을 등록한다: export LANGCHAIN_TRACING_V2=true / export LANGCHAIN_API_KEY=... / export LANGCHAIN_PROJECT=skala-langchain.",
          "코드는 한 줄도 고치지 않고, 1일차에 만든 요약·번역 체인을 서로 다른 입력으로 3번 invoke한다(환경변수만으로 추적이 자동으로 켜진다).",
          "LangSmith 대시보드의 skala-langchain 프로젝트에 실행 기록(트레이스)이 쌓이는지 확인한다.",
          "트레이스 하나를 열어 '프롬프트에 실제로 들어간 입력 → 모델이 준 답 → 각 단계 소요 시간 → 사용한 토큰 수'가 단계별로 보이는지 확인한다.",
          "세 번 실행 중 가장 오래 걸린 단계와 토큰을 가장 많이 쓴 단계를 찾아 한 줄로 적는다(어디를 최적화해야 할지 근거가 된다)."
        ]
      },
      {
        "title": "Lab. 캐싱·재시도·예외처리 붙여 서비스처럼 만들기",
        "steps": [
          "set_llm_cache(InMemoryCache())로 캐시를 켠다.",
          "똑같은 질문을 두 번 invoke하고 time으로 1차·2차 응답 시간을 재, 2차가 사실상 0초(캐시에서 꺼냄)인지 확인한다.",
          "모델에 .with_retry(stop_after_attempt=3)를 붙여 일시적 오류에 자동 재시도가 되게 만든다.",
          "체인 호출을 try/except로 감싸, 실패하면 '잠시 후 다시 시도해 주세요'를 돌려주게 한다.",
          "일부러 잘못된 API 키(예: 끝 글자 하나 바꾸기)로 실행해, 프로그램이 빨간 에러로 죽는 대신 친절한 대체 메시지가 나오는지 확인한다.",
          "다시 올바른 키로 되돌려 정상 동작을 확인하고, '캐싱=비용/속도, 재시도+예외=안정성'이라는 역할 구분을 한 줄로 정리한다."
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
      },
      {
        "h": "비동기·로딩 전략",
        "items": [
          "동기 vs 비동기 엔드포인트(async def/await)",
          "동시 요청 처리로 throughput 개선",
          "요청 배치(batching)와 지연-처리량 트레이드오프",
          "Eager 로딩(기동 시 적재) vs Lazy 로딩(첫 요청 시 적재)",
          "서빙 아키텍처 패턴: REST vs gRPC, 동기 vs 비동기"
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
      },
      {
        "title": "Lab 4. 동기·비동기·로딩 전략 비교하기",
        "steps": [
          "/predict_sync(동기)와 /predict_async(async def) 두 엔드포인트를 같은 모델로 만든다.",
          "간단한 부하 스크립트로 동시에 여러 요청을 보내 각 버전의 초당 처리 건수를 비교한다.",
          "모델 로딩을 Eager(앱 시작 시 load)로 한 버전과 Lazy(첫 요청 때 load)로 한 버전을 만든다.",
          "서버 기동 직후 첫 요청의 응답 시간을 두 버전에서 재어 차이를 기록한다.",
          "어떤 서비스에 어떤 조합이 맞는지 한 줄로 결론을 적는다."
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
          "일부러 다른 분포의 입력을 보내 경고가 뜨는지 확인한다.",
          "경고가 발생하면 콘솔뿐 아니라 파일·로그에 '드리프트 알림' 레코드(시각·어떤 피처가·기준 대비 얼마나 벗어났는지)를 남긴다.",
          "알림이 일정 횟수 이상 쌓이면 '재학습 필요' 플래그를 세우고, 재학습 스크립트를 호출하는 트리거 함수를 연결한다.",
          "정상 분포로 기준 통계를 산출한 뒤 일부러 다른 분포를 주입해 이상탐지→알림→재학습 트리거가 순서대로 동작하는지 로그로 확인한다(Day3 AIOps 자동 대응의 축소판)."
        ]
      },
      {
        "title": "Lab 4. model_version 파라미터로 버전별 모델 서빙 + 미니 레지스트리",
        "steps": [
          "서로 다른 설정으로 학습한 모델 두 개를 model_v1.joblib, model_v2.joblib로 저장한다.",
          "각 모델의 메타데이터(버전·학습일시·정확도·학습데이터 이름)를 registry.json(또는 SQLite)에 기록해 미니 레지스트리를 만든다.",
          "/predict에 model_version 쿼리 파라미터를 추가한다(예: /predict?model_version=v2).",
          "파라미터 값에 따라 registry에서 해당 버전의 파일 경로를 찾아 그 모델을 로딩·예측하도록 라우팅한다.",
          "v1과 v2를 번갈아 호출해 다른 모델이 응답하는지, 응답에 어떤 버전이 답했는지 함께 반환되는지 확인한다.",
          "응답이 이상하면 파라미터 하나만 바꿔 v1으로 되돌리는(롤백) 것을 체감한다(MLflow 레지스트리의 축소판)."
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
        "h": "LangChain과 LangGraph의 역할 구분",
        "items": [
          "LangChain: LLM 호출·도구 정의(@tool)·출력 파싱 등 낱개 기능 제공",
          "LangGraph: 상태(State)를 들고 노드 사이를 도는 그래프로 반복·분기·기억을 제어",
          "단순 1회 응답이면 LangChain만으로 충분, 도구를 여러 번 부르고 조건에 따라 갈라지면 LangGraph가 필요",
          "실무 에이전트는 LangChain 부품 + LangGraph 흐름을 함께 사용"
        ]
      },
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
      },
      {
        "h": "Agentic Workflow와 Agent Protocol",
        "items": [
          "Goal: 무엇을 달성할지 목표를 명확히",
          "Plan → Execute: 단계를 계획하고 도구로 실행",
          "Reflect: 결과를 스스로 점검해 다시 계획(자기 교정)",
          "Agentic RAG Workflow: 근거 부족하면 재검색하는 루프",
          "Agent Protocol: 표준 규약으로 에이전트를 갈아 끼우기"
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
          "Supervisor(슈퍼바이저): 감독 한 명이 전문 작업자를 지휘(가장 보편적)",
          "Middleware: 실행 전후 공통 처리(로깅·검증·가공)를 끼우는 중간 계층",
          "서브그래프: 작은 그래프를 부품처럼 큰 그래프에 끼워 재사용",
          "공용 메모리: 작업자들이 같은 State 메모장을 공유해 결과 전달"
        ]
      },
      {
        "h": "Harness Engineering과 병렬 실행(Fan-out)",
        "items": [
          "Harness: LLM 바깥의 도구·오류처리·관측 등 주변 장치 설계",
          "Parallel Execution(Fan-out): 독립 작업을 동시에 펼쳐 실행",
          "결과 취합(gather): 병렬 결과를 모아 다음 단계로",
          "언제 병렬? 서로 의존하지 않는 조사·검색·요약 작업"
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
      },
      {
        "title": "Lab 3. Fan-out으로 소주제 3개를 동시에 조사하기",
        "steps": [
          "multiagent.py 옆에 fanout.py 파일을 새로 만들고, langgraph.types에서 Send를, typing에서 Annotated를, 표준 라이브러리 operator를 import 한다.",
          "상태 State에 subtopics(조사할 소주제 리스트)와 results를 두되, results는 Annotated[list, operator.add]로 선언해 병렬 결과가 '합쳐지도록' 만든다(덮어쓰기 방지).",
          "소주제 하나를 받아 조사 결과 문자열을 리스트로 반환하는 research_one 노드와, 결과 개수를 출력하는 gather 노드를 만든다.",
          "fan_out 함수에서 소주제마다 Send(\"research_one\", {\"topic\": t})를 리스트로 반환해, START에서 add_conditional_edges(START, fan_out, [\"research_one\"])로 여러 갈래를 동시에 펼친다.",
          "research_one→gather, gather→END 엣지를 연결하고 compile 한 뒤, subtopics=[\"배터리\",\"충전인프라\",\"정책보조금\"]으로 실행해 results에 3개가 모두 모이는지 확인한다(기대: '모인 결과 수: 3').",
          "research_one 안에 import time; time.sleep(2)를 넣고, 순차 실행이라면 6초가 걸릴 일이 병렬이라 2초 안팎에 끝나는지 체감해 본다(Fan-out의 이득 확인)."
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
          "벡터 길이 정규화(normalize)가 필요한 이유",
          "임베딩 모델은 성능이 고정된 게 아니라 골라 쓰는 부품 — 같은 문서라도 모델을 바꾸면 검색 결과가 달라짐",
          "MTEB 리더보드로 후보 모델을 좁히고, 실제 우리 질문 20~30개로 직접 top-k 정확도를 재보는 게 정답에 가장 가까움",
          "차원이 클수록 표현력은 좋지만 저장·검색 비용이 커짐 — 검색 품질과 인프라 비용의 균형",
          "도메인 특화가 안 맞으면 (1) 더 나은 모델 교체 (2) 도메인 데이터로 임베딩 파인튜닝 (3) 하이브리드+재순위 순으로 접근",
          "한국어 서비스는 다국어/한국어 임베딩 모델을 기본으로 검토"
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
          "임베디드형 FAISS·Chroma vs 서버형 Qdrant·pgvector·Pinecone",
          "FAISS로 시작해 Qdrant(서버형)로 옮기는 경로",
          "메타데이터 필터링으로 검색 범위 좁히기",
          "키워드(BM25)+벡터를 합치는 하이브리드 검색"
        ]
      },
      {
        "h": "재순위·Agentic RAG·Production",
        "items": [
          "Re-ranking(Cross-Encoder)으로 검색 정확도 향상",
          "Chunking Engineering: 검색 품질을 좌우하는 청킹 설계",
          "Agentic RAG: 부족하면 스스로 재검색하는 검색",
          "Production Architecture와 최신 동향(MEMO: Memory as a Model)"
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
      },
      {
        "title": "Lab 4 — FAISS에서 Qdrant로 옮겨 같은 결과 확인하기 (5교시)",
        "steps": [
          "`pip install qdrant-client` 로 설치한다.",
          "오전에 만든 문장 6~8개와 그 임베딩(384차원)을 그대로 재사용한다.",
          "`QdrantClient(':memory:')` 로 로컬 Qdrant를 띄우고 `create_collection('docs', VectorParams(size=384, distance=Distance.COSINE))` 으로 컬렉션을 만든다.",
          "각 문장을 `PointStruct(id, vector, payload={'text': 원문})` 로 `upsert` 한다.",
          "같은 질문으로 `query_points(..., limit=3)` 검색해, FAISS 때와 상위 3개 문서가 같은지 표로 비교한다(기대: 거의 동일).",
          "payload에 주제 태그(예: `{'cat': 'pet'}`)를 넣고 필터 검색(`query_filter`)으로 특정 주제 안에서만 검색되는지 확인한다."
        ]
      },
      {
        "title": "Lab 5 — 하이브리드 + 재순위로 상위 문서 바로잡기 (7교시)",
        "steps": [
          "`pip install rank-bm25` 로 BM25 라이브러리를 설치한다.",
          "고유명사·숫자가 섞인 문장 6~8개를 준비한다(예: 모델명 'GPT-4o', 환불 규정 '7일' 등).",
          "BM25로 키워드 순위를, 임베딩 코사인으로 벡터 순위를 각각 구한다.",
          "두 순위를 RRF(`1/(k+순위)`, k=60)로 합쳐 하이브리드 순위를 만든다.",
          "`CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')` 로 하이브리드 상위 후보를 재채점해 재순위한다.",
          "'벡터만' vs '하이브리드' vs '하이브리드+재순위' 세 경우의 top-3를 나란히 출력해, 어느 방법이 정답 문서를 가장 위로 올렸는지 한 줄로 메모한다."
        ]
      }
    ],
    "homework": [
      "오늘 만든 검색 코드를 FAISS에서 Qdrant로 옮기고, 같은 질문에 대한 검색 결과가 동일한지 표로 정리해 제출한다.",
      "하이브리드 검색 결과에 Re-ranking을 적용해, 재순위 전/후 상위 3개 문서가 어떻게 달라지는지 비교해 3문장으로 정리한다."
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
      },
      {
        "title": "Lab 3. Thread(세션) 기억 확인",
        "steps": [
          "main.py의 에이전트에 MemorySaver 체크포인터를 붙인다.",
          "/chat 호출 시 thread_id='alice'로 '내 이름은 앨리스야'를 보낸다.",
          "같은 thread_id='alice'로 '내 이름이 뭐였지?'를 물어 '앨리스'라고 답하는지 확인한다.",
          "thread_id='bob'으로 같은 질문을 던져 이름을 모른다고 답하는지 확인해 세션이 실제로 분리됨을 검증한다."
        ]
      },
      {
        "title": "Lab 0. 아키텍처 경계 그리기 워크숍(5교시)",
        "steps": [
          "화이트보드나 종이에 네 박스를 그린다: Frontend · FastAPI(Backend) · VectorDB(RAG) · AI Agent(+MCP 서버).",
          "박스 사이에 화살표를 그리고 '무엇이 오가는지'를 적는다(예: Frontend→FastAPI = 질문 텍스트+thread_id, Agent→MCP = 도구 호출, RAG→Agent = 검색된 근거 조각).",
          "각 박스에 담당 팀원 이름을 적어 병렬 개발이 가능하도록 소유권을 나눈다.",
          "박스 사이 '계약'을 한 줄씩 정한다(예: /chat 은 {question, thread_id}를 받아 {answer}를 돌려준다). 이 계약만 지키면 안쪽 구현은 각자 자유롭게 진행한다.",
          "그림을 사진으로 찍어 팀 README.md 에 붙인다 — 이후 3일간 이 그림이 기준선이 된다."
        ]
      },
      {
        "title": "Lab 4. 통합 스모크 테스트 체크리스트로 Day1 마감(8교시)",
        "steps": [
          "server.py(MCP)와 main.py(FastAPI)를 각각 실행해 둘 다 에러 없이 뜨는지 확인한다.",
          "curl -X POST http://localhost:8000/chat -H 'Content-Type: application/json' -d '{\"question\":\"우리 문서에서 환불 규정 알려줘\",\"thread_id\":\"smoke\"}' 로 200 응답과 answer 필드가 오는지 본다.",
          "로그에서 실제로 MCP 도구(search_docs 등)가 호출됐는지 확인한다 — 도구를 안 거치고 모델이 지어냈다면 통합이 덜 된 것이다.",
          "같은 thread_id='smoke'로 후속 질문을 던져 앞 대화 맥락이 이어지는지 확인한다.",
          "일부러 빈 question이나 이상한 값을 보내 서버가 500으로 죽지 않고 방어하는지 본다(안 되면 오늘 표시만 해 두고 Day3에서 보강).",
          "5개 항목의 통과/실패를 표로 남겨 팀 채널에 공유한다. 실패한 경계가 내일 아침 첫 수정 대상이다."
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
      },
      {
        "title": "Lab 3. 프론트에서 토큰이 흐르게 렌더링하기(5교시)",
        "steps": [
          "Next.js 앱을 준비하고 'npm install ai' 로 Vercel AI SDK를 설치한다.",
          "app/api/chat/route.ts 에 realCode의 프록시 라우트를 붙여넣어 FastAPI의 /stream 을 연결한다.",
          "Chat.tsx 컴포넌트에 useChat 예제를 붙여 messages를 화면에 렌더한다.",
          "'npm run dev' 후 질문을 보내, 답이 한꺼번에 뜨지 않고 글자가 타이핑되듯 흘러나오는지 확인한다.",
          "네트워크 탭에서 응답 Content-Type이 text/event-stream 이고 조각이 나눠 도착하는지 확인한다. 한꺼번에 오면 어딘가에서 버퍼링되는 것이니 no-cache·프록시 설정을 점검한다."
        ]
      },
      {
        "title": "Lab 4. Multi-Agent 진행을 에이전트별로 나눠 스트리밍(6교시)",
        "steps": [
          "realCode의 multi_stream 예제를 참고해 '검색요원→작성요원' 두 단계를 event 태그로 구분해 흘려보내는 /multi 엔드포인트를 만든다.",
          "각 조각을 'event: {에이전트이름}\\ndata: {내용}\\n\\n' 형식으로 보내 발신자를 태깅한다.",
          "프론트에서는 브라우저 EventSource로 /multi 를 구독하고, event 이름별로 다른 말풍선(다른 색·다른 열)에 조각을 이어붙인다.",
          "질문을 던져 '검색요원'의 진행과 '작성요원'의 진행이 각각 별도 영역에서 동시에 흐르는지 확인한다.",
          "작성요원이 검색요원의 결과를 기다려야 한다면, 검색요원 스트림이 끝나는 신호(예: event: 검색요원 data: [DONE])를 프론트가 받고 작성요원 영역을 활성화하도록 순서를 표시한다."
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
          "Dynamic Planning: ReAct(그때그때 한 걸음씩 판단) vs Plan-and-Execute(먼저 전체 계획을 세우고 실행하며 필요 시 재계획)",
          "LangGraph에선 계획→실행→재계획 노드를 Conditional Edge로 이어, 남은 계획이 있으면 실행 노드로·없으면 종료로 분기(Conditional Routing과 Dynamic Planning이 한 그래프에서 맞물림)"
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
      },
      {
        "title": "Lab 3. 세션을 Redis로 옮겨 Stateless로 만들기(4교시)",
        "steps": [
          "로컬에 Redis를 띄운다: 'docker run -p 6379:6379 redis' (또는 이미 있는 Redis 사용).",
          "'pip install langgraph-checkpoint-redis' 로 Redis 체크포인터를 설치한다.",
          "Day1의 MemorySaver를 realCode의 RedisSaver로 교체한다(연결 문자열 redis://localhost:6379).",
          "thread_id='user-1'로 이름을 알려 준 뒤, 파이썬 프로세스를 완전히 껐다 다시 켠다.",
          "다시 thread_id='user-1'로 '내 이름이 뭐였지?'를 물어, 재시작 후에도 Redis에서 대화가 복원돼 이름을 기억하는지 확인한다 — 이것이 수평 확장의 전제다."
        ]
      },
      {
        "title": "Lab 4. Query Routing 붙여 질문 종류별로 경로 나누기(5교시)",
        "steps": [
          "realCode의 router.py 를 만들어 질문을 [검색·계산·잡담]으로 분류하는 classify 함수를 확인한다.",
          "각 종류를 실제 경로에 연결한다: 검색→RAG 파이프라인, 계산→계산 도구, 잡담→일반 LLM 응답.",
          "세 종류의 질문을 각각 던져 서로 다른 경로로 가는지, 로그로 분기를 확인한다.",
          "분류가 틀리기 쉬운 경계 질문(예: '매출 자료 찾아서 증감률 계산해줘')을 넣어 보고, 이런 복합 질문은 어떻게 처리할지(둘 다 태우기·재분류) 팀에서 토론한다.",
          "여유가 되면 LangGraph의 Conditional Edge로 옮겨, classify 결과에 따라 노드가 분기하도록 그래프로 만든다."
        ]
      },
      {
        "title": "Lab 5. 발표 준비 · KPT 회고 · Wrap-up 퀴즈(7~8교시)",
        "steps": [
          "발표 5장(문제정의·아키텍처·라이브데모·운영·개선방향)을 팀당 한 벌 만든다.",
          "라이브 데모를 최소 1회 리허설하고, 네트워크가 끊길 때를 대비해 화면 녹화본을 백업해 둔다.",
          "데모 시나리오를 둘 준비한다: ①정상 흐름 1개 ②일부러 오류를 내고 대체 응답이 나오는 견고함 시연 1개.",
          "발표 후 KPT 포스트잇을 각자 세 칸(Keep·Problem·Try) 작성해 붙이고, 팀이 상위 3개를 골라 공유한다.",
          "Wrap-up 퀴즈 6문항(MCP Tool/Resource 구분, SSE 방향, MemorySaver vs RedisSaver, Validator 역할, 지수 백오프 이점, 라우팅이 줄이는 것)을 서로 물어 맞혀 본다.",
          "마지막으로 'Day1 조립 → Day2 품질 → Day3 운영'의 3일 흐름을 한 줄로 정리해 개인 회고 노트에 남긴다."
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
      },
      {
        "title": "Lab 3. 프로젝트 뼈대 만들기 — 폴더 구조와 .env·.gitignore 연결 (7교시 실습)",
        "steps": [
          "프로젝트 루트에서 'mkdir -p src data' 로 폴더를 만든다(코드는 src, 문서는 data에 둔다)",
          "config.py를 src에 두고, 프로젝트 루트에 .env 파일을 만들어 'OPENAI_API_KEY=강사가준키' 한 줄을 저장한다",
          ".gitignore 파일을 만들어 첫 줄에 '.env', 둘째 줄에 '.venv/' 를 적는다(키와 가상환경을 깃 추적에서 제외)",
          "'git status' 를 실행해 .env가 목록에 보이지 않는지 확인한다(보이면 .gitignore의 위치·철자를 점검)",
          "data/ 안에 어제 모은 문서를 policy.txt로 저장해 둔다(내일 RAG의 재료)",
          "최종 구조를 'ls -R' 또는 'tree -L 2' 로 확인하고, 그 결과를 README의 '## 폴더 구조'에 붙여 넣고 커밋한다"
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
      },
      {
        "h": "Multi-Agent 설계 산출물 항목",
        "items": [
          "에이전트 목록과 각 역할",
          "Supervisor 라우팅 규칙",
          "공유 상태(State) 스키마",
          "종료 조건",
          "전체 협업 흐름도",
          "미니프로젝트 주제와의 연결"
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
      },
      {
        "title": "Lab 3. Multi-Agent 설계 문서 만들기",
        "steps": [
          "미니프로젝트 주제를 확정한다",
          "필요한 워커(작업자)와 각자의 역할을 나눈다",
          "Supervisor 프롬프트 초안을 작성한다(워커 카탈로그+종료 조건 포함)",
          "위 내용을 설계 문서로 정리해 제출한다"
        ]
      }
    ],
    "homework": [
      "오늘 만든 RAG 앱에서 잘 못 답하는 질문 3개를 찾아, 원인(청킹 크기·검색 개수 등)을 한 줄씩 메모해 오기",
      "내일 발표용 데모 질문 3개를 정하고, 각 질문의 기대 답변을 미리 적어 오기",
      "Day3에 구현할 워커별 입력/출력 인터페이스를 표로 정의해 오기"
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
      },
      {
        "h": "전 과정 Wrap-up 체크리스트",
        "items": [
          "Prompt 설계: 역할·지시·예시·제약으로 원하는 출력을 유도했는가",
          "Context/RAG: 근거 문서를 검색해 넣고 출처를 제시했는가",
          "Harness: 도구·오류처리·관측 등 주변 장치를 갖췄는가",
          "Supervisor Agent: 작업자들을 지휘하고 종료 조건을 두었는가"
        ]
      },
      {
        "h": "Agentic RAG 개선 포인트",
        "items": [
          "질의 재작성으로 검색이 잘 되게 다듬기",
          "검색 결과 grading으로 쓸만한 근거만 남기기",
          "근거가 부족하면 재검색 루프 돌리기",
          "끝내 근거가 없으면 '모른다'로 안전하게 처리"
        ]
      },
      {
        "h": "RAG 정량 평가 항목",
        "items": [
          "검색 정확도: 관련 문서를 제대로 찾아왔는가",
          "근거 충실도: 답이 근거에 실제로 기반했는가",
          "답변 관련성: 질문에 맞는 답을 했는가",
          "샘플 QA셋 5~10개를 만들어 점수를 표로 집계"
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
      },
      {
        "title": "Lab 4. naive RAG 개선하고 점수로 비교하기",
        "steps": [
          "naive RAG로 답하게 한 뒤 틀리거나 근거가 약한 실패 사례를 찾는다",
          "검색 결과 grading과 재검색 루프를 붙여 Agentic하게 개선한다",
          "샘플 QA셋 5~10개로 개선 전/후 점수를 각각 측정한다",
          "개선 전/후 점수 비교표를 만들어 무엇이 좋아졌는지 정리한다"
        ]
      },
      {
        "title": "Lab. 팀 상호 코드 리뷰 30분 (7교시 실습)",
        "steps": [
          "옆 팀과 저장소를 맞바꿔, 각자 5분간 README의 실행법 그대로 직접 돌려 본다(안 돌아가면 그 자체가 첫 피드백)",
          "리뷰 관점 네 가지로 살핀다: ① 키가 코드에 노출되지 않았나(.env 분리) ② 빈 입력·오류에 안 죽나 ③ 함수 이름만 봐도 역할이 읽히나 ④ 답에 근거(출처)를 함께 보여 주나",
          "좋은 점 1개와 고칠 점 1개를 상대 저장소의 이슈나 메모로 남긴다(말투는 제안형으로)",
          "받은 피드백 중 5분 안에 고칠 수 있는 것 1개를 즉시 반영하고 커밋한다",
          "무엇을 고쳤는지 한 줄로 README의 회고(KPT) 아래에 추가한다"
        ]
      }
    ],
    "homework": [
      "프로젝트 README를 최종본으로 다듬어(주제·실행법·아키텍처·회고 포함) 팀 저장소에 push 하기",
      "이번 미니 프로젝트에서 더 발전시키고 싶은 기능 1개를 골라, 어떤 기술(재순위·메모리·웹UI 등)로 확장할지 3줄로 적어 제출하기",
      "RAG 정량 평가 결과물(검색 정확도·근거 충실도·답변 관련성 점수표)을 제출하기"
    ]
  }
}

export const detailsFor = (subjectId, day) => details[`${subjectId}-${day}`] || null
