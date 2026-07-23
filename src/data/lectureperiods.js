// 교시 기준 정확한 시간표.
// 1~3교시(오전) · 점심 · 4~8교시(오후). 각 교시 50분 수업 + 10분 휴식.
// periods[key] = 8개 항목(1교시~8교시 순). 점심은 렌더러가 3교시 뒤에 자동 삽입.

export const PERIOD_TIMES = [
  { label: '1교시', time: '09:00 ~ 09:50' },
  { label: '2교시', time: '10:00 ~ 10:50' },
  { label: '3교시', time: '11:00 ~ 11:50' },
  { label: '점심', time: '12:00 ~ 13:00', lunch: true },
  { label: '4교시', time: '13:00 ~ 13:50' },
  { label: '5교시', time: '14:00 ~ 14:50' },
  { label: '6교시', time: '15:00 ~ 15:50' },
  { label: '7교시', time: '16:00 ~ 16:50' },
  { label: '8교시', time: '17:00 ~ 17:50' },
]

export const periods = {
  "git-1": [
    "OT · 프로그래밍 개요(Frontend vs Backend · IT 용어)",
    "개발환경 구축: VS Code 설치 · Workspace · Git 설정",
    "Git 기초 개념 + VS Code Source Control",
    "Git 기초 명령어: init·add·commit·status·log",
    ".gitignore · diff · 커밋 되돌리기",
    "Remote Repository 이해 + GitHub 설정 · SSH 키 관리",
    "원격 사용법: clone·push·pull · Sync Changes",
    "(심화) 브랜치 · 머지 · 충돌 · PR 협업"
  ],
  // ── 2반(판교 4층·임성열 전임교수, 07-23~24) — 별개 커리큘럼 (LSTM vs Transformer + CrewAI) ──
  "transformer2-1": [
    "[강의] Software 1.0→3.0 — LLM, 언어가 인터페이스가 되다",
    "[강의] 토큰화와 임베딩 — 벡터 공간과 거리(맨해튼·유클리드)·유사도",
    "[강의] RNN·LSTM의 한계 — 순차 처리와 장기 의존성",
    "[강의] Self-Attention과 Query·Key·Value, softmax로 확률 만들기",
    "[실습] 실습1-1 — PyTorch LSTM(CharLSTM)으로 한국어 문장 생성",
    "[실습] 실습1-1 — 장기 의존성 한계 관찰·생성 결과 캡처",
    "[실습] 실습1-2 — 사전학습 GPT-2로 같은 과제 재생성",
    "[실습] 실습1 마무리 — LSTM vs Transformer 비교 리포트 작성",
  ],
  "transformer2-2": [
    "[강의] 복습: LSTM→Transformer, LLM 추론(Inference) 파이프라인",
    "[강의] LLM을 API 레벨에서 쓰기 — 토큰=비용(usage)·CoT·SC·ReAct 복습",
    "[강의+실습] CrewAI 개념(Agent·Task·Crew) + 실습2 착수(팀 편성·.env)",
    "[실습] 실습2 ① Agent 정의 — Writer·Editor role·goal·backstory",
    "[실습] 실습2 ② Task·Crew 구성·kickoff 실행, usage로 비용 비교",
    "[실습] 실습2 ③ 가상데이터로 Biz 가치·서비스 시나리오 기획",
    "[실습] 실습2 ④ 팀 코드·발표자료(최소 3p) 마무리·리허설",
    "[발표] 팀별 발표·평가 — Biz가치 40 · 기술이해도 30 · 수업충실도 30",
  ],
  "transformer-1": [
    "[강의] LLM이 뭐길래? '다음 단어 맞히기' 게임으로 시작하기",
    "[강의] 토큰화(BPE)와 임베딩 — 글자를 숫자 벡터로 바꾸기",
    "[실습] 토크나이저로 문장 쪼개고 임베딩 벡터 직접 꺼내보기",
    "[강의] RNN·LSTM의 한계 — 한 줄로 서서 차례차례 읽기의 답답함",
    "[강의] Attention의 직관 — 중요한 문장에 형광펜 치기",
    "[강의] Self-Attention과 Query·Key·Value 삼총사",
    "[실습] Scaled Dot-Product Attention 손으로·NumPy로 계산하기",
    "[실습] Attention 가중치 히트맵으로 시각화하기"
  ],
  "transformer-2": [
    "[강의] Multi-Head Attention — 여러 명이 각자 관점으로 읽기",
    "[강의] Positional Encoding·FFN·잔차연결(Residual)·LayerNorm 조립",
    "[강의] Encoder vs Decoder, 그리고 BERT·GPT·T5",
    "[실습] 사전학습 BERT로 문장 임베딩 뽑아 유사도 비교하기",
    "[강의] Transformer 이후 혁신 ① Scaling Law · In-Context Learning",
    "[강의] Transformer 이후 혁신 ② RLHF · MoE(Mixture of Experts)",
    "[강의] LLM 생태계: Open-Weight vs Closed Model, 벤치마크·Leaderboard",
    "[실습] GPT-2로 문장 생성하고 다음 토큰 확률 들여다보기"
  ],
  "python-1": [
    "1교시 개발환경·실행 구조: Homebrew·3.11·VS Code·venv, 소스→AST→바이트코드→PVM",
    "2교시 [실습] venv 생성·pip·requirements.txt·VS Code 설정",
    "3교시 자료구조 시간복잡도·컴프리헨션·제너레이터",
    "4교시 [실습] dataclass·TypedDict로 데이터 모델링",
    "5교시 함수·파일·예외: functools·CSV/JSON/Parquet·pathlib",
    "6교시 [실습] 타입 힌트·Pydantic v2·mypy",
    "7교시 코드 품질: Ruff·pytest·VS Code 디버거",
    "8교시 [메인 실습] 비동기 수집→Pydantic 검증→Parquet 저장→pytest→Git"
  ],
  "python-2": [
    "1교시 Pandas 2.x 실전·Copy-on-Write",
    "2교시 [실습] groupby·pivot_table·merge",
    "3교시 Polars Lazy API·Pandas vs Polars 성능 비교",
    "4교시 [실습] DuckDB로 CSV·Parquet에 SQL 분석",
    "5교시 시각화: Matplotlib·Plotly·Altair·Streamlit",
    "6교시 [실습] 기초 통계·가설 검정(t-test·카이제곱)",
    "7교시 sklearn Pipeline·joblib·분석 자동화(schedule·Jinja2)",
    "8교시 [메인 실습] 공개 데이터 EDA→시각화+통계→Pipeline→GitHub 공유"
  ],
  "prompt-1": [
    "1교시 LLM은 어떻게 답을 만들까 - 다음 단어 예측과 프롬프트의 역할",
    "2교시 Prompt Design Framework: 역할·지시·예시·제약 뜯어보기",
    "3교시 실습: 나쁜 프롬프트를 좋은 프롬프트로 바꿔보기",
    "4교시 주요 기법: Zero-shot / Few-shot / Chain-of-Thought",
    "5교시 System·User·Assistant 메시지 설계와 역할 분리",
    "6교시 실습: Few-shot + CoT로 업무 분류기 만들기",
    "7교시 컨텍스트 윈도우·토큰 비용과 Context Engineering(맥락 설계)",
    "8교시 Prompt를 넘어서: Context → AI Agent·Harness Engineering + 개선 실습"
  ],
  "vue-1": [
    "1교시 Vue 소개와 왜 프레임워크가 필요한가 (개념)",
    "2교시 Vite로 첫 Vue 프로젝트 만들기 (실습)",
    "3교시 SFC 구조와 첫 컴포넌트 화면에 띄우기 (실습)",
    "4교시 반응형 상태 ref와 reactive 이해 (실습)",
    "5교시 템플릿 문법과 디렉티브 v-if·v-for·v-bind (실습)",
    "6교시 이벤트 v-on과 폼 바인딩 v-model (실습)",
    "7교시 computed와 watch로 파생 상태 다루기 (실습)",
    "8교시 미니 실습: 반응형 카운터·할 일 목록 UI (실습)"
  ],
  "vue-2": [
    "1교시 컴포넌트로 화면 쪼개기 (개념·실습)",
    "2교시 props 로 부모→자식 데이터 내려주기 (실습)",
    "3교시 emit 으로 자식→부모 이벤트 올려보내기 (실습)",
    "4교시 slot 으로 내용 끼워넣기 (실습)",
    "5교시 라이프사이클 훅과 onMounted (실습)",
    "6교시 Composition API와 setup 패턴 (실습)",
    "7교시 컴포저블(useXxx)로 로직 재사용 (실습)",
    "8교시 미니 실습: 목록·아이템 컴포넌트 분리 (실습)"
  ],
  "vue-3": [
    "1교시 SPA와 라우팅 개념 이해 (개념)",
    "2교시 Vue Router 설치와 기본 라우트 (실습)",
    "3교시 router-link·router-view로 페이지 이동 (실습)",
    "4교시 동적 파라미터와 중첩 라우트 (실습)",
    "5교시 네비게이션 가드로 접근 제어 (실습)",
    "6교시 Pinia 설치와 스토어 만들기 (실습)",
    "7교시 state·getters·actions 다루기 (실습)",
    "8교시 미니 실습: 목록·상세 라우팅 + 전역 장바구니 (실습)"
  ],
  "vue-4": [
    "1교시 비동기와 API 통신 개념 (개념)",
    "2교시 fetch·axios로 데이터 불러오기 (실습)",
    "3교시 로딩·에러 상태 처리 패턴 (실습)",
    "4교시 폼 입력과 유효성 검사 (실습)",
    "5교시 환경변수와 API 베이스 설정 (실습)",
    "6교시 미니 SPA 통합: 목록·상세·폼 (실습)",
    "7교시 Vite 빌드와 정적 배포 (실습)",
    "8교시 최종 실습: SPA 완성·배포·점검 (실습)"
  ],
  "webproject-1": [
    "1교시 OT·미니프로젝트 목표와 한 사이클(기획→배포) 흐름 잡기",
    "2교시 주제 선정 워크숍·사용자 시나리오 함께 써보기(실습)",
    "3교시 와이어프레임으로 화면 흐름 그리기(실습)",
    "4교시 기능 명세서 작성과 우선순위 정하기",
    "5교시 프론트/백엔드 아키텍처와 데이터 모델 설계(실습)",
    "6교시 화면-데이터 연결 JSON 목업 만들기(실습)",
    "7교시 기술 스택 선정과 프로젝트 폴더 초기화(실습)",
    "8교시 작업 분담·일정표 작성과 1일차 회고"
  ],
  "webproject-2": [
    "1교시 1일차 설계 리뷰와 오늘 구현 목표 정하기",
    "2교시 컴포넌트로 화면 쪼개기와 목록 화면 만들기(실습)",
    "3교시 라우터로 목록↔상세 화면 이동 붙이기(실습)",
    "4교시 상태 관리로 데이터 한곳에 모으기(실습)",
    "5교시 입력 폼 만들고 새 글 추가 기능 구현(실습)",
    "6교시 폼 유효성 검사와 예외 처리 넣기(실습)",
    "7교시 LLM API 연동 — 입력을 보내고 요약/추천 결과를 화면에 표시(실습)",
    "8교시 중간 점검·코드 리뷰와 내일 통합 준비"
  ],
  "webproject-3": [
    "1교시 어제까지 만든 기능 통합 점검과 버그 목록 만들기",
    "2교시 발견한 버그 함께 고치기(실습)",
    "3교시 전체 흐름 통합 테스트하기(실습)",
    "4교시 환경변수·API 주소 정리와 빌드 준비(실습)",
    "5교시 프로덕션 빌드와 정적 배포(GitHub Pages)(실습)",
    "6교시 배포 주소 확인·점검과 발표 자료 만들기(실습)",
    "7교시 팀별 시연 발표",
    "8교시 회고(잘된 점·아쉬운 점·개선점)와 과정 마무리"
  ],
  "spring-ai-1": [
    "1교시 Spring AI란? — 자바 백엔드와 LLM을 잇는 다리",
    "2교시 [실습] 개발환경 준비 — JDK·Spring Boot·의존성 추가",
    "3교시 [실습] ChatClient/ChatModel 추상화 첫 호출",
    "4교시 [실습] application.yml로 모델 프로바이더(OpenAI·Anthropic) 설정",
    "5교시 PromptTemplate과 구조화된 메시지(System/User) 설계",
    "6교시 [실습] 채팅 응답 REST API 만들기 — Controller·Service",
    "7교시 [실습·메인] 채팅 API 엔드투엔드 완성",
    "8교시 [실습] 응답 확인·트러블슈팅·정리"
  ],
  "spring-ai-2": [
    "1교시 RAG가 필요한 이유 — LLM이 '모르는 것'을 문서로 채우기",
    "2교시 임베딩(Embedding)이란 — 문장을 숫자 벡터로 바꾸기",
    "3교시 [실습] VectorStore와 pgvector 연동·설정",
    "4교시 [실습] 문서 읽기·쪼개기 — DocumentReader/TextSplitter",
    "5교시 [실습] 문서를 벡터로 저장하기 — VectorStore 적재",
    "6교시 검색 결합 프롬프트(RAG) 구성 원리",
    "7교시 [실습·메인] 사내 문서 QA API 만들기",
    "8교시 [실습] 질의 테스트·정확도 점검·정리"
  ],
  "spring-ai-3": [
    "1교시 Tool Calling 복습 — LLM이 우리 함수를 호출하게 하기",
    "2교시 [실습] @Tool로 함수 등록하고 구조화 출력(자바 객체)으로 받기",
    "3교시 MCP(Model Context Protocol)란 — 도구·자원을 표준으로 잇기",
    "4교시 [실습] Spring AI MCP Client로 외부 MCP 서버 도구 연결",
    "5교시 AI Agent 설계 — 목표·계획·실행·관찰(Reflect) 루프",
    "6교시 [실습] 도구를 쓰는 에이전트 워크플로 만들기",
    "7교시 [실습·메인] MCP·Agent 통합 AI 기능 서비스 완성",
    "8교시 [실습] 통합 테스트·시연·정리"
  ],
  "sllm-1": [
    "1교시 — sLLM이 뭐길래? LLM 서빙 파이프라인과 작은 LLM의 정체",
    "2교시 — MLM vs CLM 구조 비교, LLM vs sLLM(토크나이저·임베딩·경량화)",
    "3교시 [실습] Hugging Face 모델 카드 읽고 첫 추론 돌려보기",
    "4교시 — 양자화(quantization)와 On-Device 추론",
    "5교시 [실습] Ollama로 로컬에서 모델 채팅 띄우기",
    "6교시 — sLLM Use Case 시나리오: DBMS·영업비밀·개인정보 등 보안 민감 영역",
    "7교시 — PEFT·LoRA 맛보기: 통째로 안 바꾸고 살짝만 고치는 학습",
    "8교시 [실습] 로컬 모델을 API로 호출하는 미니 챗봇 완성·점검"
  ],
  "sllm-2": [
    "1교시 — sLLM·PEFT 최신 동향: 작은 모델이 뜨는 이유(온디바이스·증류·QLoRA 이후 흐름)",
    "2교시 — PEFT 변형 비교: LoRA·QLoRA vs Adapter vs Prefix/Prompt tuning",
    "3교시 — 목적별 PEFT 선택 가이드(도메인 지식·극소 파라미터·추론 강화)",
    "4교시 [실습] instruction 데이터 JSONL 가공 + LoRA 학습 코드 작성",
    "5교시 [실습] LoRA 첫 학습 돌리고 loss 곡선 보기",
    "6교시 — sLLM 서비스 파이프라인: 임베딩 연결·Vector DB 선정·설계",
    "7교시 [실습] sLLM + Vector DB(RAG) 연동해 보기",
    "8교시 [실습] 학습한 LoRA 합쳐 추론·서빙 배포·마무리"
  ],
  "ml-dl-1": [
    "1교시 · 머신러닝이 뭐길래? 학습 유형(지도·비지도·강화) 한눈에",
    "2교시 · 회귀 vs 분류 · 대표 알고리즘 지도 그리기",
    "3교시 [실습] Colab 켜고 붓꽃 데이터 불러와 살펴보기",
    "4교시 · 데이터 분할·과적합·일반화: 왜 시험은 따로 봐야 할까",
    "5교시 [실습] train_test_split 으로 학습/평가 데이터 나누기",
    "6교시 · 평가지표(정확도·정밀도·재현율·F1·ROC) 쉽게 이해하기",
    "7교시 [실습] scikit-learn 분류 모델 학습하고 점수 매기기",
    "8교시 [실습] 모델 바꿔가며 성능 비교 · 혼동행렬 해석"
  ],
  "ml-dl-2": [
    "1교시 · 신경망이란? 뇌의 뉴런에서 빌려온 아이디어",
    "2교시 · 퍼셉트론과 다층 신경망(MLP) 구조 그려보기",
    "3교시 [실습] PyTorch 설치 확인 · 텐서(Tensor) 다뤄보기",
    "4교시 · 순전파·역전파: 모델이 틀리고 고치는 과정",
    "5교시 · 활성화 함수와 손실 함수 · 옵티마이저(SGD/Adam)",
    "6교시 [실습] nn.Module 로 신경망 한 개 쌓아보기",
    "7교시 [실습] 학습 루프(forward→loss→backward→step) 돌리기",
    "8교시 [실습] 학습 곡선 그려 손실이 줄어드는지 확인"
  ],
  "ml-dl-3": [
    "1교시 · 데이터 종류에 맞는 아키텍처: CNN·RNN·Transformer 지도",
    "2교시 · CNN 직관: 이미지에서 '특징'을 훑어 찾기",
    "3교시 [실습] CNN 으로 손글씨 이미지 분류 맛보기",
    "4교시 · RNN/LSTM 과 Transformer·Attention 직관",
    "5교시 · 과적합과의 싸움: 드롭아웃·정규화·데이터 증강",
    "6교시 [실습] 드롭아웃 넣고 빼며 과적합 비교",
    "7교시 · 하이퍼파라미터 튜닝과 전이학습(Transfer Learning)",
    "8교시 [실습] 사전학습 개념 정리 + 미니 개선 과제"
  ],
  "feature-1": [
    "1교시 피처 엔지니어링이란? 모델 성능을 좌우하는 \"재료 손질\"",
    "2교시 데이터 둘러보기(EDA): 변수 유형·분포·상관 히트맵으로 데이터 파악",
    "3교시 [실습] 스케일링·정규화로 숫자 크기 맞추기",
    "4교시 범주형 인코딩: 원-핫·라벨·타깃 인코딩",
    "5교시 [실습] 수치·날짜·텍스트 파생 피처 만들기",
    "6교시 변수 선택(필터·래퍼·임베디드)과 차원 축소(PCA)",
    "7교시 [실습] 피처 엔지니어링 전후 성능 비교",
    "8교시 정리·코드 리뷰·미니 회고"
  ],
  "modeldev-1": [
    "1교시 오리엔테이션 - 모델 개발이란 무엇인가(전체 흐름 한눈에)",
    "2교시 문제 유형별 모델 선택 기준(분류·회귀 고르기)",
    "3교시 [실습] 데이터 불러오고 학습·검증·테스트로 나누기",
    "4교시 교차검증으로 일반화 성능 정직하게 평가하기",
    "5교시 [실습] 전처리→학습→평가 파이프라인 만들기",
    "6교시 평가지표 설계와 베이스라인(기준점) 세우기",
    "7교시 [실습] 베이스라인 모델 학습·평가",
    "8교시 [실습] 교차검증 점수 비교 & 오늘 내용 정리"
  ],
  "modeldev-2": [
    "1교시 복습 - 하이퍼파라미터란 무엇인가(모델의 '설정 손잡이')",
    "2교시 탐색 방법 비교: Grid · Random · Bayesian",
    "3교시 [실습] GridSearchCV 로 자동 튜닝하기",
    "4교시 과적합 다시 보기 - 정규화와 조기종료(early stopping)",
    "5교시 [실습] 조기종료로 과적합 막기",
    "6교시 앙상블 - 배깅 · 부스팅 · 스태킹의 직관",
    "7교시 [실습] 앙상블(RandomForest·GradientBoosting)로 성능 끌어올리기",
    "8교시 [운영] MLOps 관점 모델 성능 관리와 Drift(데이터·컨셉) 대응 전략"
  ],
  "rag-1": [
    "1교시 RAG가 왜 필요한가: LLM의 한계와 검색 증강의 직관",
    "2교시 RAG 전체 파이프라인 한눈에 보기(적재→청킹→임베딩→색인→검색→생성)",
    "3교시 [실습] 개발환경 셋업과 첫 문서 로딩",
    "4교시 청킹(chunking) 전략: 문서를 어떻게 잘라야 하나",
    "5교시 [실습] 청킹 파라미터 바꿔가며 비교하기",
    "6교시 임베딩(embedding)과 벡터 공간의 이해",
    "7교시 벡터 색인과 유사도 검색 기초",
    "8교시 [실습] 문서 인덱싱 파이프라인 완성하기"
  ],
  "rag-2": [
    "1교시 어제 인덱스 복습과 Retriever의 역할, top-k·재순위 개요",
    "2교시 하이브리드 검색(키워드 BM25 + 벡터)과 재순위(Re-ranking)",
    "3교시 [실습] 하이브리드 + Reranker로 검색 품질 높이기",
    "4교시 고급 리트리버: ParentDocumentRetriever·MultiQueryRetriever",
    "5교시 고급 리트리버: EnsembleRetriever·LongContextReorder",
    "6교시 SemanticChunker와 청킹 전략 심화",
    "7교시 [실습] 고급 리트리버로 질의응답(QA) 체인 완성",
    "8교시 [실습] 출처 인용 RAG 챗봇으로 마무리"
  ],
  "rag-3": [
    "1교시 RAG 확장 4단계: Naive → Advanced → Modular → Agentic",
    "2교시 Agentic RAG 개념: 검색·판단을 에이전트 루프로",
    "3교시 LangGraph 기본 구조(Messages·State·Graph) 빠르게",
    "4교시 [실습] LangGraph로 Agentic RAG 뼈대 만들기",
    "5교시 RAG 평가: RAGAS(충실도·답변 관련성·문맥 정밀도)",
    "6교시 [실습] 평가셋으로 RAG 점수 매기고 개선하기",
    "7교시 비용·지연(latency)·캐싱 최적화",
    "8교시 [실습] Agentic RAG 파이프라인 통합·마무리"
  ],
  "langchain-1": [
    "오리엔테이션: LangChain이 왜 필요한가 (LLM 앱의 고민거리)",
    "[실습] 개발환경 셋업 - 파이썬 가상환경·LangChain·API 키 연결",
    "[실습] 첫 LLM 호출 - 모델·프롬프트·출력 파서 따로 써보기",
    "LCEL과 Runnable 인터페이스: 파이프(|) 조립과 invoke/stream/batch",
    "[실습] LCEL로 첫 체인 만들기 (프롬프트 | 모델 | 파서)",
    "출력 파서 깊이보기: 문자열·JSON·구조화 출력",
    "[실습] 번역기·요약기 체인 만들고 입력 바꿔보기",
    "마무리: 오늘 배운 부품으로 미니 체인 정리 + Q&A"
  ],
  "langchain-2": [
    "복습: 어제의 체인에 '기억'과 '도구'를 더하면? (오늘의 그림)",
    "[실습] 대화 메모리 - 앞말을 기억하는 챗봇 만들기",
    "Tool Binding: bind_tools() 동작 원리와 도구 호출 결정",
    "[실습] bind_tools로 Tool 연결 + RunnableParallel/Lambda 복합 체인",
    "문서 QA 큰그림: 임베딩·벡터스토어·리트리버",
    "[실습] PDF/텍스트 읽어 벡터스토어에 넣기",
    "[실습] 리트리버 결합 문서 QA 체인 완성",
    "마무리: 메모리+도구+문서QA를 합친 챗봇 정리 + Q&A"
  ],
  "langchain-3": [
    "복습: 동작하는 챗봇을 '서비스'로 만들려면 무엇이 더 필요한가",
    "[실습] 스트리밍 응답 - 글자가 흐르듯 나오게 하기",
    "LangChain vs LangGraph 경계와 Runnable 통일성",
    "[실습] LangSmith로 체인 추적·디버깅하기",
    "비용·캐싱·에러 처리: 실서비스에서 꼭 챙길 것들",
    "[실습] 캐싱·재시도·예외 처리 붙이기",
    "[실습] FastAPI로 챗봇을 웹 API로 배포하기",
    "마무리: 3일간 부품을 합친 미니 생성형 AI 서비스 + 발표"
  ],
  "serving-1": [
    "1교시 OT·모델 서빙이 왜 필요한가 (학습된 모델을 서비스로)",
    "2교시 서빙 패턴 비교: 온라인·배치·스트림",
    "3교시 [실습] 모델 저장·로드와 추론 함수 만들기",
    "4교시 FastAPI 기초: 엔드포인트·요청/응답 모델",
    "5교시 [실습] FastAPI 추론 API 만들고 호출하기",
    "6교시 입력 검증·에러 핸들링·헬스체크·로깅 기초",
    "7교시 비동기 처리(async/await)·배치로 처리량 높이기 + Lazy vs Eager 로딩(모델 패키징·버전관리는 참고)",
    "8교시 [실습] 추론 REST API 완성·테스트·정리"
  ],
  "serving-2": [
    "1교시 컨테이너가 왜 필요한가: '내 컴에선 됐는데' 문제 해결",
    "2교시 Docker 핵심 개념: 이미지·컨테이너·레지스트리",
    "3교시 [실습] 추론 API 를 Dockerfile 로 이미지화·실행",
    "4교시 확장(Scaling)과 오토스케일링·부하 대응 개념",
    "5교시 [실습] docker compose 로 여러 컨테이너 띄우기",
    "6교시 관측성(Observability): 메트릭·로그·트레이싱",
    "7교시 [실습] Prometheus 지표 노출과 모니터링 확인",
    "8교시 데이터·모델 드리프트 모니터링과 알림"
  ],
  "serving-3": [
    "1교시 MLOps 가 풀려는 문제와 전체 그림",
    "2교시 실험 관리와 재현성: MLflow 로 추적하기",
    "3교시 [실습] MLflow 로 학습 파라미터·지표 기록",
    "4교시 모델 레지스트리와 스테이지 승격",
    "5교시 [실습] 모델 등록·버전·Staging→Production",
    "6교시 CI/CD 로 학습·배포 자동화하기",
    "7교시 [실습] GitHub Actions 로 자동 빌드·배포 파이프라인",
    "8교시 AIOps: 이상탐지·자동 대응과 과정 마무리"
  ],
  "agent-1": [
    "1교시 AI 에이전트란 - 챗봇과의 차이, Agent Protocol 개요",
    "2교시 ReAct 패턴 - 생각하고(Reason) 행동하기(Act)",
    "3교시 Agentic Workflow 설계: Goal · Plan · Execute · Reflect",
    "4교시 [실습] 환경 셋업 + LangGraph 설계 3요소(Workflow·Loop·Memory)",
    "5교시 [실습] State·노드로 Workflow 그래프 만들기(Loop·Memory 반영)",
    "6교시 도구(Tool) 정의와 LLM이 도구를 부르게 하기 + Distributed(분산 에이전트) 개념 맛보기",
    "7교시 Agentic RAG Workflow(검색·판단 루프) 개념과 조건 분기",
    "8교시 [실습] 단일 에이전트 완성 + 실행 결과 점검"
  ],
  "agent-2": [
    "1교시 단일 에이전트의 한계와 멀티 에이전트의 필요성",
    "2교시 멀티 에이전트 패턴: Supervisor · Middleware",
    "3교시 [실습] Supervisor로 전문가 에이전트 라우팅",
    "4교시 Harness Engineering과 Parallel Execution(Fan-out)",
    "5교시 [실습] Fan-out으로 여러 작업 동시 실행하기",
    "6교시 Human-in-the-loop - interrupt로 사람 승인 받기",
    "7교시 에러 복구·재시도·관측(로깅/추적) 다루기",
    "8교시 [실습] 멀티 에이전트 워크플로 완성 + 회고"
  ],
  "vectordb-1": [
    "1교시 — 오리엔테이션: 벡터 검색이 왜 필요한가, RAG 한계 진단",
    "2교시 — 임베딩과 벡터 공간, 코사인/내적 유사도, 인덱싱(HNSW·IVF)",
    "3교시 [실습] 임베딩·유사도 계산 + FAISS Flat vs HNSW 속도 비교",
    "4교시 — 대표 Vector DB 비교: FAISS·Chroma·pgvector·Qdrant·Pinecone",
    "5교시 [실습] FAISS→Qdrant로 문서 임베딩·저장·검색 옮기기",
    "6교시 — Chunking Engineering과 하이브리드 검색, Re-ranking",
    "7교시 [실습] Hybrid + Reranking으로 검색 정확도 높이기",
    "8교시 — Agentic RAG와 Production Architecture, 최신 동향(MEMO)"
  ],
  "capstone-1": [
    "1교시 OT: 캡스톤 목표와 Backend·VectorDB·Agent(MCP)·Frontend 전체 그림",
    "2교시 MCP(Model Context Protocol) 개요와 MCP Server 구성요소",
    "3교시 MCP 설계: Tool·Resource·Prompt 분리 의사결정",
    "4교시 [실습] MCP Server 구현하고 MCP Inspector로 점검",
    "5교시 통합 아키텍처: 시스템 경계(Backend·VectorDB·Agent·Frontend) 설계",
    "6교시 [실습] FastAPI에 RAG + Agent + MCP Client 통합",
    "7교시 [실습] Thread(대화 세션) 관리 붙이기",
    "8교시 통합 스모크 테스트와 중간 점검"
  ],
  "capstone-2": [
    "1교시 스트리밍의 3가지 차원(모델·서버·클라이언트) 이해",
    "2교시 Backend: SSE(Server-Sent Events) 스트리밍 엔드포인트 설계",
    "3교시 [실습] FastAPI SSE 엔드포인트 구현",
    "4교시 Frontend: Vue.js/Next.js + Vercel AI SDK 연동",
    "5교시 [실습] 프론트에서 토큰 스트리밍 렌더링",
    "6교시 [실습] Multi-Agent Streaming(에이전트별 진행 스트림)",
    "7교시 Observability & Eval: 추적·로그·응답 품질 평가",
    "8교시 [실습] LangSmith/로깅으로 실행 추적 붙이기"
  ],
  "capstone-3": [
    "1교시 Error Handling과 재시도 전략 설계",
    "2교시 [실습] 예외·타임아웃·재시도 처리 붙이기",
    "3교시 Cost & Latency 관리(토큰·모델·캐싱)",
    "4교시 Stateless Session 전환(수평 확장 대비)",
    "5교시 Query Routing과 Conditional Routing",
    "6교시 [실습] Validator Agent 출력 검증 + Dynamic Planning",
    "7교시 팀별 최종 통합·발표·라이브 데모",
    "8교시 상호 피드백·회고(KPT) · Wrap-up QUIZ"
  ],
  "miniproject-1": [
    "OT · 미니프로젝트 개요와 평가 기준 안내",
    "주제 선정과 사용자 시나리오 정의",
    "[실습] 요구사항 명세서 한 장으로 정리하기",
    "AI 서비스 아키텍처 설계 (LLM · RAG · Agent)",
    "데이터 플로우와 API 인터페이스 설계",
    "[실습] 기술 스택 선정과 개발 환경 셋업",
    "[실습] 프로젝트 폴더 구조 만들고 .env로 키 연결하기",
    "작업 분담 · 일정 수립과 Day1 회고"
  ],
  "miniproject-2": [
    "어제 설계 점검과 오늘 구현 목표 확정",
    "[실습] LLM 호출 모듈(llm.py) 구현",
    "[실습] RAG ① 문서 적재 · 청킹 · 임베딩 · 색인",
    "[실습] RAG ② Retriever로 관련 문서 검색하기",
    "[실습] Agent와 도구(Tool) 연동으로 기능 확장",
    "[실습] 전체 파이프라인 통합(입력→검색→생성→출력)",
    "[실습] 예외 처리와 안정화(빈 입력·키 오류 대응)",
    "중간 시연과 팀 상호 피드백"
  ],
  "miniproject-3": [
    "오늘 목표 공유와 테스트 전략 안내",
    "[실습] 기능 테스트와 버그 수정",
    "[실습] requirements.txt 정리와 Dockerfile 작성",
    "[실습] 컨테이너 빌드·실행으로 배포 환경 만들기",
    "[실습] 데모 시나리오 작성과 발표 리허설",
    "팀별 결과 발표 (시연 + 설명)",
    "상호 피드백과 코드 리뷰",
    "회고와 개선점 정리 · 수료"
  ]
}

export const periodsFor = (subjectId, day) => periods[`${subjectId}-${day}`] || null
