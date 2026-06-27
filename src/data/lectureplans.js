// 날짜별 8시간(09:00~18:00) 강의안 — subjectId-day 키로 관리.
// 같은 과목 같은 day 는 분반이 달라도 동일 강의안을 공유한다.
//   plan = { schedule: [{time, topic, detail|lunch}], practice: {title, steps[], deliverable} }

const lunch = { time: '12:00–13:00', topic: '점심 휴식', lunch: true }

export const plans = {
  // ── 데이터 분석을 위한 Python 이해 ──
  'python-1': {
    schedule: [
      { time: '09:00–09:30', topic: 'OT · 분석 환경 점검', detail: 'Colab/Jupyter 셋업, 셀 실행, 강의 목표·데이터 분석 흐름 소개' },
      { time: '09:30–11:00', topic: '기본 문법', detail: '변수·자료형·연산자, 문자열 포매팅(f-string), 입출력' },
      { time: '11:00–12:00', topic: '자료구조', detail: '리스트·튜플·딕셔너리·집합, 인덱싱·슬라이싱, 컴프리헨션' },
      lunch,
      { time: '13:00–15:00', topic: '실습: 자료구조 다루기', detail: '점수 통계·단어 빈도·중복 제거 미니 문제' },
      { time: '15:00–16:30', topic: '제어문·함수·예외', detail: '조건문·반복문(enumerate/zip), 함수·예외 처리' },
      { time: '16:30–17:30', topic: 'NumPy 기초', detail: '배열 생성·벡터 연산·브로드캐스팅·집계' },
      { time: '17:30–18:00', topic: '정리 · Q&A', detail: '핵심 정리, Day2(Pandas) 예고, 과제 안내' },
    ],
    practice: {
      title: '자료구조 + NumPy로 데이터 요약하기',
      steps: [
        'csv 한 개를 골라 리스트/딕셔너리로 적재',
        '합계·평균·최대/최소 등 요약 통계 계산',
        '같은 계산을 NumPy 벡터 연산으로 다시 구현',
        '반복문 버전과 속도·코드 길이 비교',
      ],
      deliverable: '요약 통계 노트북(반복문·NumPy 두 버전 포함)',
    },
  },
  'python-2': {
    schedule: [
      { time: '09:00–09:30', topic: 'Day1 리뷰 · Pandas 개요', detail: 'Pandas의 역할, Series/DataFrame 구조 소개' },
      { time: '09:30–11:00', topic: 'DataFrame 다루기', detail: 'read_csv, head/info/describe, loc/iloc, 조건 선택' },
      { time: '11:00–12:00', topic: '데이터 정제', detail: '결측치 dropna/fillna, 자료형 변환, 중복 제거' },
      lunch,
      { time: '13:00–15:00', topic: '실습: 적재·정제', detail: '실데이터 결측·이상치 진단 후 규칙대로 처리' },
      { time: '15:00–16:30', topic: '집계·결합', detail: 'groupby·agg, merge·pivot_table 로 재구조화' },
      { time: '16:30–17:30', topic: '시각화', detail: 'matplotlib 기본 차트, seaborn 분포·상관 히트맵' },
      { time: '17:30–18:00', topic: '발표 · 회고', detail: 'EDA 결과 공유, 인사이트 정리' },
    ],
    practice: {
      title: '실데이터 EDA 노트북 완성',
      steps: [
        '데이터 적재 후 결측·이상치 처리',
        'groupby로 범주별 집계표 작성',
        '분포·상관 차트 3종 시각화',
        '발견한 인사이트 3가지 마크다운 정리',
      ],
      deliverable: '정제→집계→시각화→인사이트가 담긴 EDA 노트북',
    },
  },

  // ── 웹 서비스 개발 mini-Project ──
  'webproject-1': {
    schedule: [
      { time: '09:00–09:30', topic: 'OT · 미니프로젝트 안내', detail: '진행 방식·산출물·평가 기준, 팀 구성' },
      { time: '09:30–11:00', topic: '주제·요구사항', detail: '문제 정의, MVP 선정, 사용자 시나리오, 기능 우선순위' },
      { time: '11:00–12:00', topic: '화면 설계', detail: '와이어프레임으로 핵심 화면·흐름 구성' },
      lunch,
      { time: '13:00–15:00', topic: '실습: 데이터·API 설계', detail: '엔티티/관계 모델링, CRUD 엔드포인트 정의' },
      { time: '15:00–16:30', topic: '아키텍처·스택', detail: '프론트/백 구조, 기술 스택 선정 근거' },
      { time: '16:30–17:30', topic: '셋업·분담', detail: '리포 초기화, 작업 분담·일정(WBS), 협업 규칙' },
      { time: '17:30–18:00', topic: '계획 발표', detail: '팀별 기획·설계 공유, Day2 예고' },
    ],
    practice: {
      title: '프로젝트 기획·설계 패키지 만들기',
      steps: [
        '문제·MVP·사용자 시나리오 정리',
        '핵심 3화면 와이어프레임 작성',
        '데이터 모델 + API 설계서 작성',
        '작업 분담·일정 보드 구성',
      ],
      deliverable: '기획서 + 와이어프레임 + API 설계서',
    },
  },
  'webproject-2': {
    schedule: [
      { time: '09:00–09:30', topic: 'Day1 리뷰 · 환경 세팅', detail: '설계 확인, 개발 환경·공통 모듈 정리' },
      { time: '09:30–11:00', topic: '구조 구현', detail: '공통 레이아웃·라우팅·재사용 컴포넌트' },
      { time: '11:00–12:00', topic: 'UI 구현', detail: '목록·상세·폼 화면 골격' },
      lunch,
      { time: '13:00–15:00', topic: '실습: API 연동', detail: '목록-상세 데이터 연동, 로딩·에러 처리' },
      { time: '15:00–16:30', topic: '폼·상태 관리', detail: '입력 폼·유효성 검사, 전역/지역 상태' },
      { time: '16:30–17:30', topic: '기능 통합', detail: '컴포넌트 합치고 시나리오대로 동작 확인' },
      { time: '17:30–18:00', topic: '중간 점검', detail: '진척 공유·이슈 정리, Day3 예고' },
    ],
    practice: {
      title: '핵심 기능 동작까지 구현',
      steps: [
        '목록 화면 API 연동·렌더',
        '상세 라우팅·파라미터 처리',
        '입력 폼 유효성 검사·제출',
        '로딩·에러·빈 상태 UI 처리',
      ],
      deliverable: '핵심 사용자 흐름이 동작하는 중간 빌드',
    },
  },
  'webproject-3': {
    schedule: [
      { time: '09:00–09:30', topic: 'Day2 리뷰 · 잔여 정리', detail: '남은 기능·이슈 점검, 오늘 목표 합의' },
      { time: '09:30–11:00', topic: '통합·안정화', detail: '기능 통합, 버그 수정, 예외 보강' },
      { time: '11:00–12:00', topic: 'UI/UX 다듬기', detail: '반응형·접근성, 시각 정리' },
      lunch,
      { time: '13:00–15:00', topic: '실습: QA·디버깅', detail: '체크리스트로 점검 후 수정·회귀 확인' },
      { time: '15:00–16:30', topic: '빌드·배포', detail: '환경변수 분리, 프로덕션 빌드, 정적 배포' },
      { time: '16:30–17:30', topic: '발표 준비·리허설', detail: '데모 시나리오·자료·역할 분담' },
      { time: '17:30–18:00', topic: '발표 · 회고', detail: '데모 발표, 상호 피드백, 회고' },
    ],
    practice: {
      title: '배포 + 데모 발표',
      steps: [
        'QA 체크리스트로 버그 수정',
        '환경변수 설정 후 프로덕션 빌드',
        '정적 호스팅에 배포·동작 검증',
        '데모 시나리오로 발표',
      ],
      deliverable: '배포 URL + 리포 + 회고 노트',
    },
  },

  // ── 실전 Feature Engineering ──
  'feature-1': {
    schedule: [
      { time: '09:00–09:30', topic: 'OT · 피처 엔지니어링 개요', detail: '피처가 성능에 미치는 영향, 전체 워크플로' },
      { time: '09:30–11:00', topic: '수치형 처리', detail: '결측치 대체, 이상치 탐지(IQR/z-score), 스케일링' },
      { time: '11:00–12:00', topic: '변환', detail: '로그·박스콕스 변환, 구간화(binning)' },
      lunch,
      { time: '13:00–14:30', topic: '실습: 수치형 전처리', detail: '결측·이상치·스케일링 파이프라인 구성' },
      { time: '14:30–16:00', topic: '범주·파생 피처', detail: '원-핫/타깃 인코딩, 날짜·텍스트·상호작용 피처' },
      { time: '16:00–17:00', topic: '피처 선택·축소', detail: '중요도·상관 기반 선택, PCA, 누수 차단' },
      { time: '17:00–18:00', topic: '실습: 전후 성능 비교 · 정리', detail: '피처 추가 전후 검증 점수 비교, 해석' },
    ],
    practice: {
      title: '피처 엔지니어링으로 성능 끌어올리기',
      steps: [
        '베이스라인 피처로 검증 점수 측정',
        '인코딩·파생·스케일링 피처 5종 이상 생성',
        '교차검증 내 타깃 인코딩으로 누수 방지',
        '전후 점수 비교·중요 피처 해석',
      ],
      deliverable: '피처 생성 노트북 + 전후 성능 비교표',
    },
  },

  // ── 모델 개발 및 최적화 ──
  'modeldev-1': {
    schedule: [
      { time: '09:00–09:30', topic: 'OT · 모델 개발 워크플로', detail: '문제→베이스라인→검증→비교의 흐름' },
      { time: '09:30–11:00', topic: '문제·모델 선택', detail: '분류/회귀 정의, 지표 선택, 모델 후보' },
      { time: '11:00–12:00', topic: '검증 설계', detail: 'train/valid/test, K-fold, 계층적 분할, 누수' },
      lunch,
      { time: '13:00–15:00', topic: '실습: 베이스라인', detail: '더미·선형 모델 학습, 교차검증 점수' },
      { time: '15:00–16:30', topic: '파이프라인', detail: 'Pipeline·ColumnTransformer, 재현성 관리' },
      { time: '16:30–17:30', topic: '실습: 모델 비교', detail: '3개 모델 동일 검증, 점수·시간 비교' },
      { time: '17:30–18:00', topic: '정리 · Q&A', detail: '선정 근거 정리, Day2(튜닝) 예고' },
    ],
    practice: {
      title: '베이스라인 수립과 모델 비교',
      steps: [
        '전처리+모델 파이프라인 구성',
        '베이스라인 교차검증 점수 측정',
        '모델 2종 추가 후 동일 검증',
        '점수·학습시간 비교표로 후보 선정',
      ],
      deliverable: '모델 비교표 + 선정 근거 노트',
    },
  },
  'modeldev-2': {
    schedule: [
      { time: '09:00–09:30', topic: 'Day1 리뷰 · 튜닝 목표', detail: '베이스라인 확인, 개선 목표 설정' },
      { time: '09:30–11:00', topic: '하이퍼파라미터 탐색', detail: 'Grid/Random Search, 탐색 공간 설계' },
      { time: '11:00–12:00', topic: 'Bayesian 최적화', detail: 'Optuna study, CV와 결합한 튜닝' },
      lunch,
      { time: '13:00–15:00', topic: '실습: 튜닝 실행', detail: 'Optuna로 best params 탐색, 전후 비교' },
      { time: '15:00–16:00', topic: '과적합 제어', detail: '규제·조기종료, 학습곡선, 편향-분산' },
      { time: '16:00–17:00', topic: '앙상블·경량화', detail: '배깅·부스팅·스태킹, 가지치기·양자화' },
      { time: '17:00–18:00', topic: '발표 · 회고', detail: '성능 개선 결과 공유, 모델 카드 작성' },
    ],
    practice: {
      title: '튜닝과 앙상블로 성능 개선',
      steps: [
        'Optuna 탐색 공간 정의·실행',
        '튜닝 전후 검증 점수 비교',
        '상위 모델 보팅/스태킹 앙상블',
        '최종 모델 카드(설정·점수·한계) 작성',
      ],
      deliverable: '튜닝·앙상블 결과 보고 + 모델 카드',
    },
  },

  // ── Prompt 설계와 Context Engineering ──
  'prompt-1': {
    schedule: [
      { time: '09:00–09:30', topic: '오리엔테이션 · 사전 점검', detail: '강의 목표, LLM 사용 환경(API/Playground) 점검, 토큰·비용 개념 소개' },
      { time: '09:30–11:00', topic: 'LLM 동작과 프롬프트 기본', detail: '토큰화·확률적 생성 원리, System/User/Assistant 메시지 구조, 프롬프트 구성요소(역할·지시·예시·제약)' },
      { time: '11:00–12:00', topic: '프롬프트 기법', detail: 'Zero-shot / Few-shot / Chain-of-Thought, 출력 형식 강제(JSON), 환각 줄이기 전략' },
      lunch,
      { time: '13:00–15:00', topic: '실습: 업무 프롬프트 설계', detail: '요약·분류·추출 과제를 프롬프트로 해결, 동일 과제를 기법별로 비교 평가' },
      { time: '15:00–17:00', topic: 'Context Engineering', detail: '컨텍스트 윈도우 관리, 문서 주입·요약·압축, 프롬프트 템플릿화와 변수화' },
      { time: '17:00–18:00', topic: '정리 · Q&A · 과제', detail: '프롬프트 안티패턴 리뷰, 자신의 업무에 적용할 프롬프트 1개 설계 과제' },
    ],
    practice: {
      title: '나만의 업무 프롬프트 라이브러리 만들기',
      steps: [
        '반복 업무 3가지를 선정(요약/분류/작성 등)',
        '각 업무를 Few-shot + 출력형식 지정 프롬프트로 작성',
        '같은 입력에 대해 기법별 결과를 비교·평가표 작성',
        '가장 좋은 프롬프트를 템플릿(변수 포함)으로 정리',
      ],
      deliverable: '재사용 가능한 프롬프트 템플릿 3종 + 비교 평가 노트',
    },
  },

  // ── Front-Framework: Vue.js ──
  'vue-1': {
    schedule: [
      { time: '09:00–09:30', topic: '도입 · 환경 구성', detail: 'SPA 개념, Node·Vite 셋업, 프로젝트 구조와 SFC(.vue) 이해' },
      { time: '09:30–11:00', topic: '반응형 시스템', detail: 'ref / reactive, 템플릿 보간, computed 와 의존성 추적의 원리' },
      { time: '11:00–12:00', topic: '디렉티브 · 이벤트', detail: 'v-if / v-for / v-bind / v-on / v-model, 폼 입력 바인딩' },
      lunch,
      { time: '13:00–15:00', topic: '실습: 반응형 UI', detail: '카운터·할 일 목록·검색 필터를 컴포넌트로 구현' },
      { time: '15:00–17:00', topic: 'computed · watch 활용', detail: '파생 상태, watch 부수효과, 리스트 렌더링 최적화(key)' },
      { time: '17:00–18:00', topic: '정리 · Q&A', detail: 'Vue DevTools 디버깅, Day2 예고(컴포넌트·라우팅)' },
    ],
    practice: {
      title: 'Todo 앱 (반응형 기초)',
      steps: [
        'v-model 로 입력 바인딩, 추가/삭제 구현',
        'v-for 로 목록 렌더링(key 지정)',
        'computed 로 완료/미완료 카운트 표시',
        '필터(전체/완료/미완료) 토글 추가',
      ],
      deliverable: '동작하는 Todo SFC 컴포넌트',
    },
  },
  'vue-2': {
    schedule: [
      { time: '09:00–09:30', topic: 'Day1 리뷰', detail: '반응형·디렉티브 복습, 컴포넌트 분리의 필요성' },
      { time: '09:30–11:00', topic: '컴포넌트 통신', detail: 'props 로 내려주기 / emit 으로 올리기, 슬롯(slot)' },
      { time: '11:00–12:00', topic: 'Composition API', detail: 'setup, 라이프사이클 훅, computed / watch 심화' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 재사용 컴포넌트', detail: 'props/emit 기반 목록·아이템 컴포넌트 분리' },
      { time: '15:30–17:30', topic: '컴포넌트 설계', detail: '컨테이너/프레젠테이션 분리, 합성(composables)' },
      { time: '17:30–18:00', topic: '정리 · Q&A', detail: 'Day3 예고(라우팅·상태관리)' },
    ],
    practice: {
      title: '재사용 컴포넌트 구성',
      steps: [
        '부모-자식을 props/emit 으로 연결',
        '슬롯으로 레이아웃 재사용',
        'composable(use~) 함수로 로직 분리',
        '리스트-아이템 컴포넌트로 리팩터링',
      ],
      deliverable: 'props/emit·슬롯이 적용된 컴포넌트 세트',
    },
  },
  'vue-3': {
    schedule: [
      { time: '09:00–09:30', topic: 'Day2 리뷰', detail: '컴포넌트 통신 복습, SPA 라우팅의 필요성' },
      { time: '09:30–11:00', topic: 'Vue Router', detail: '라우트 정의, 동적 파라미터(:id), 중첩·이름 라우트' },
      { time: '11:00–12:00', topic: '네비게이션 가드', detail: 'beforeEach 인증 가드, 리다이렉트' },
      lunch,
      { time: '13:00–15:00', topic: 'Pinia 상태관리', detail: 'state/getters/actions, 컴포넌트 연동' },
      { time: '15:00–17:30', topic: '실습: 라우팅+상태', detail: '목록·상세 라우팅 + 전역 상태 공유' },
      { time: '17:30–18:00', topic: '정리 · Q&A', detail: 'Day4 예고(API·배포)' },
    ],
    practice: {
      title: '라우팅 + 전역 상태',
      steps: [
        'Router 로 /list, /detail/:id 구성',
        '네비게이션 가드로 접근 제어',
        'Pinia 스토어에 목록 데이터·액션 정의',
        '상세 화면에서 스토어 데이터 조회',
      ],
      deliverable: '라우팅·Pinia 가 연동된 화면',
    },
  },
  'vue-4': {
    schedule: [
      { time: '09:00–09:30', topic: 'Day3 리뷰', detail: '라우팅·상태 복습, 실데이터 연동 준비' },
      { time: '09:30–11:00', topic: 'API 연동', detail: 'fetch/axios, async/await, 로딩·에러 상태' },
      { time: '11:00–12:00', topic: '폼·유효성', detail: '폼 바인딩, 검증, 제출 흐름' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 미니 SPA 완성', detail: '목록·상세·폼을 API와 통합' },
      { time: '15:30–17:00', topic: '빌드·배포', detail: '환경변수, Vite 빌드, 정적 호스팅 배포' },
      { time: '17:00–18:00', topic: '발표 · 정리', detail: 'SPA 시연, 4일차 종합' },
    ],
    practice: {
      title: '미니 SPA 완성·배포',
      steps: [
        'API(fetch)로 목록·상세 데이터 연동',
        '로딩/에러/빈 상태 처리',
        '생성 폼 + 유효성 검사',
        'Vite 빌드 후 정적 배포',
      ],
      deliverable: '배포된 미니 SPA',
    },
  },

  // ── Spring AI (현재 미배정 — 참고용 보존) ──
  'spring-ai-1': {
    schedule: [
      { time: '09:00–09:30', topic: '도입 · 환경', detail: 'Spring Boot 프로젝트 셋업, Spring AI 의존성, API 키 구성' },
      { time: '09:30–11:00', topic: 'ChatClient 추상화', detail: 'ChatModel/ChatClient 구조, 모델 프로바이더(OpenAI/Anthropic) 연동' },
      { time: '11:00–12:00', topic: '프롬프트 다루기', detail: 'PromptTemplate, 메시지 역할, 옵션(temperature 등)' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 채팅 API', detail: '/chat REST 엔드포인트 구현, 요청/응답 DTO 설계' },
      { time: '15:30–17:00', topic: '스트리밍 · 예외', detail: '스트리밍 응답(Flux), 타임아웃·재시도·에러 처리' },
      { time: '17:00–18:00', topic: '정리 · Q&A', detail: 'Day2 예고(RAG), 구조 리뷰' },
    ],
    practice: {
      title: '채팅 응답 REST API',
      steps: [
        'Spring Boot + Spring AI 프로젝트 생성',
        'ChatClient 빈 구성, API 키 환경변수화',
        '/chat POST 엔드포인트(질문→답변)',
        'PromptTemplate 로 시스템 지시 주입',
      ],
      deliverable: 'Postman 으로 호출되는 채팅 API',
    },
  },
  'spring-ai-2': {
    schedule: [
      { time: '09:00–09:30', topic: 'Day1 리뷰 · RAG 개요', detail: 'RAG 필요성, Embedding/VectorStore 개념' },
      { time: '09:30–11:00', topic: 'Embedding · VectorStore', detail: 'EmbeddingModel, pgvector 등 VectorStore 연동' },
      { time: '11:00–12:00', topic: '문서 처리', detail: 'DocumentReader/Splitter, 청킹·메타데이터' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 문서 적재', detail: '문서 → 청킹 → 임베딩 → VectorStore 저장 파이프라인' },
      { time: '15:30–17:00', topic: 'Retrieval 결합', detail: '검색 결과를 프롬프트에 결합(RAG), 출처 표기' },
      { time: '17:00–18:00', topic: '정리 · Q&A', detail: '검색 품질 점검, Day3 예고(Tool)' },
    ],
    practice: {
      title: '사내 문서 QA API',
      steps: [
        '샘플 문서를 청킹·임베딩하여 VectorStore 적재',
        '질문 임베딩으로 top-k 검색',
        '검색 컨텍스트를 프롬프트에 결합해 답변',
        '응답에 출처(문서/청크) 포함',
      ],
      deliverable: '문서 기반 질의응답 REST API',
    },
  },
  'spring-ai-3': {
    schedule: [
      { time: '09:00–09:30', topic: '도입', detail: 'Function Calling 개념, 사용 시나리오' },
      { time: '09:30–11:00', topic: 'Tool/Function Calling', detail: '함수 정의·등록, 모델의 도구 호출 흐름' },
      { time: '11:00–12:00', topic: '구조화 출력', detail: 'Structured Output 매핑(POJO), 검증' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 도구 연동 AI', detail: '외부 API(날씨/DB 조회 등)를 Function 으로 연동' },
      { time: '15:30–17:00', topic: '서비스 통합 · 보안', detail: '기존 서비스에 AI 기능 통합, 키·프롬프트 인젝션 방어' },
      { time: '17:00–18:00', topic: '발표 · 정리', detail: '3일차 종합, 결과 공유' },
    ],
    practice: {
      title: '도구 연동형 AI 기능',
      steps: [
        '외부 조회 함수(예: 상품/날씨) 정의·등록',
        '모델이 필요 시 함수를 호출하도록 구성',
        '함수 결과를 구조화 출력으로 매핑',
        '엔드투엔드 시연',
      ],
      deliverable: 'Function Calling 기반 AI 서비스 데모',
    },
  },

  // ── sLLM 구현 및 Fine Tunning ──
  'sllm-1': {
    schedule: [
      { time: '09:00–09:30', topic: '도입', detail: 'sLLM 개념, 대형 LLM 대비 장단점·활용처' },
      { time: '09:30–11:00', topic: '오픈소스 모델 생태계', detail: 'Llama/Qwen/Gemma, 라이선스, 모델 선택 기준' },
      { time: '11:00–12:00', topic: '경량화 · 양자화', detail: 'quantization(4/8bit), 메모리·속도 트레이드오프' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 로컬 서빙', detail: 'ollama/vLLM 로 모델 구동, 추론 호출·파라미터 실험' },
      { time: '15:30–17:00', topic: 'PEFT · LoRA 개념', detail: '풀파인튜닝 vs PEFT, LoRA/QLoRA 원리' },
      { time: '17:00–18:00', topic: '정리 · Q&A', detail: 'Day2(파인튜닝) 데이터 준비 안내' },
    ],
    practice: {
      title: '로컬 sLLM 구동·비교',
      steps: [
        'ollama 등으로 2개 모델 구동',
        '동일 프롬프트로 응답 품질·속도 비교',
        '양자화 수준별 메모리·속도 측정',
        '용도에 맞는 모델 선정 근거 정리',
      ],
      deliverable: '모델 비교 리포트',
    },
  },
  'sllm-2': {
    schedule: [
      { time: '09:00–09:30', topic: 'Day1 리뷰', detail: 'LoRA 개념 복습, 파인튜닝 목표 설정' },
      { time: '09:30–11:00', topic: '데이터셋 구성', detail: 'instruction 포맷, 데이터 품질·전처리' },
      { time: '11:00–12:00', topic: '학습 파이프라인', detail: 'PEFT/LoRA 설정, 하이퍼파라미터' },
      lunch,
      { time: '13:00–15:30', topic: '실습: LoRA 파인튜닝', detail: '도메인 데이터로 LoRA 학습 실행·모니터링' },
      { time: '15:30–17:00', topic: '평가 · 배포', detail: '추론 검증, 어댑터 병합, 서빙 적용' },
      { time: '17:00–18:00', topic: '발표 · 정리', detail: '학습 전/후 비교, 결과 공유' },
    ],
    practice: {
      title: '도메인 특화 sLLM 파인튜닝',
      steps: [
        'instruction 형식 데이터셋 50~200건 구성',
        'LoRA 설정 후 학습 실행',
        '학습 전/후 동일 질문 응답 비교',
        '어댑터 저장·로드로 추론 검증',
      ],
      deliverable: '파인튜닝된 LoRA 어댑터 + 평가 결과',
    },
  },

  // ── 머신러닝 및 딥러닝 이해 ──
  'ml-dl-1': {
    schedule: [
      { time: '09:00–09:30', topic: '도입', detail: 'AI/ML/DL 관계, 학습 유형(지도/비지도/강화)' },
      { time: '09:30–11:00', topic: '회귀 · 분류', detail: '대표 알고리즘, 손실·결정경계 직관' },
      { time: '11:00–12:00', topic: '데이터·평가', detail: '훈련/검증/테스트 분할, 과적합, 평가지표' },
      lunch,
      { time: '13:00–15:30', topic: '실습: scikit-learn', detail: '데이터 적재→전처리→모델 학습→평가 파이프라인' },
      { time: '15:30–17:00', topic: '모델 비교 · 튜닝', detail: '여러 모델 비교, 교차검증, 그리드서치' },
      { time: '17:00–18:00', topic: '정리 · Q&A', detail: 'Day2(딥러닝) 예고' },
    ],
    practice: {
      title: '분류 모델 만들기',
      steps: [
        '공개 데이터셋 로드·전처리',
        '2~3개 분류 모델 학습',
        '정확도·정밀도·재현율·F1 비교',
        '교차검증으로 일반화 성능 확인',
      ],
      deliverable: '모델 비교 노트북',
    },
  },
  'ml-dl-2': {
    schedule: [
      { time: '09:00–09:30', topic: 'Day1 리뷰', detail: 'ML→DL 전환 동기, 신경망 개요' },
      { time: '09:30–11:00', topic: '신경망 원리', detail: '퍼셉트론·MLP, 순전파/역전파, 활성화 함수' },
      { time: '11:00–12:00', topic: '학습 구성요소', detail: '손실 함수, 옵티마이저(SGD/Adam), 학습률' },
      lunch,
      { time: '13:00–15:30', topic: '실습: PyTorch', detail: '텐서·자동미분, 학습 루프 직접 작성' },
      { time: '15:30–17:00', topic: '학습 안정화', detail: '배치/에폭, 검증 손실 모니터링, 조기종료' },
      { time: '17:00–18:00', topic: '정리 · Q&A', detail: 'Day3(아키텍처) 예고' },
    ],
    practice: {
      title: 'PyTorch 신경망 학습',
      steps: [
        'Dataset/DataLoader 구성',
        'MLP 모델 정의',
        '학습 루프(forward→loss→backward→step) 작성',
        '검증 정확도 추적·그래프화',
      ],
      deliverable: '학습 곡선이 포함된 분류 모델',
    },
  },
  'ml-dl-3': {
    schedule: [
      { time: '09:00–09:30', topic: '도입', detail: '대표 아키텍처 개요 지도' },
      { time: '09:30–11:00', topic: 'CNN · RNN', detail: '합성곱/풀링(이미지), 시퀀스 모델(RNN/LSTM)' },
      { time: '11:00–12:00', topic: 'Transformer', detail: 'Attention 직관, 사전학습·전이학습 개념' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 전이학습', detail: '사전학습 모델 파인튜닝으로 이미지/텍스트 분류' },
      { time: '15:30–17:00', topic: '정규화 · 튜닝', detail: '드롭아웃·데이터 증강, 하이퍼파라미터 탐색' },
      { time: '17:00–18:00', topic: '발표 · 정리', detail: '3일차 종합, 성능 개선 회고' },
    ],
    practice: {
      title: '전이학습으로 성능 끌어올리기',
      steps: [
        '사전학습 모델 불러오기',
        '데이터 증강 적용',
        '파인튜닝 후 베이스라인과 비교',
        '개선 요인 분석·정리',
      ],
      deliverable: '베이스라인 대비 개선 리포트',
    },
  },

  // ── RAG Pipeline 설계 및 구축 ──
  'rag-1': {
    schedule: [
      { time: '09:00–09:30', topic: '도입', detail: 'RAG 개념·필요성, 전체 파이프라인 지도' },
      { time: '09:30–11:00', topic: '문서 적재·청킹', detail: '로더, 청킹 전략(크기·오버랩), 메타데이터' },
      { time: '11:00–12:00', topic: '임베딩·색인', detail: '임베딩 모델, 벡터 인덱스, 유사도' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 인덱싱', detail: '문서→청킹→임베딩→벡터DB 저장 파이프라인' },
      { time: '15:30–17:00', topic: '기본 검색', detail: 'top-k 검색·결과 점검, 청킹 파라미터 영향 실험' },
      { time: '17:00–18:00', topic: '정리 · Q&A', detail: 'Day2(검색·생성) 예고' },
    ],
    practice: {
      title: '문서 인덱싱 파이프라인',
      steps: [
        '문서 셋 준비·로딩',
        '청킹 전략 2종 비교',
        '임베딩·벡터DB 저장',
        '검색 결과 품질 눈으로 점검',
      ],
      deliverable: '검색 가능한 벡터 인덱스',
    },
  },
  'rag-2': {
    schedule: [
      { time: '09:00–09:30', topic: 'Day1 리뷰', detail: '인덱스 점검, 검색 품질 이슈 공유' },
      { time: '09:30–11:00', topic: '리트리버·재순위', detail: 'Retriever, re-ranking, 하이브리드(키워드+벡터)' },
      { time: '11:00–12:00', topic: '생성 결합', detail: '컨텍스트 결합 프롬프트, 출처 인용' },
      lunch,
      { time: '13:00–15:30', topic: '실습: QA 체인', detail: '검색→프롬프트 결합→생성 엔드투엔드 구현' },
      { time: '15:30–17:00', topic: '근거·안전', detail: '근거 제시, 모르면 모른다 처리, 인젝션 대응' },
      { time: '17:00–18:00', topic: '정리 · Q&A', detail: 'Day3(평가·고도화) 예고' },
    ],
    practice: {
      title: '질의응답 RAG 체인',
      steps: [
        'Retriever 구성(top-k)',
        '하이브리드 검색 적용·비교',
        '컨텍스트+질문 프롬프트로 답변 생성',
        '출처 표기·근거 포함',
      ],
      deliverable: '출처가 표기되는 RAG QA',
    },
  },
  'rag-3': {
    schedule: [
      { time: '09:00–09:30', topic: '도입', detail: 'RAG 평가의 필요성' },
      { time: '09:30–11:00', topic: '평가 지표', detail: '충실도·관련성, RAGAS 등 자동 평가' },
      { time: '11:00–12:00', topic: '고도화 기법', detail: '메타데이터 필터, 멀티쿼리, 재색인' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 평가·튜닝', detail: '평가셋 구성→측정→파라미터 튜닝 반복' },
      { time: '15:30–17:00', topic: '운영 최적화', detail: '비용·지연·캐싱, 모니터링' },
      { time: '17:00–18:00', topic: '발표 · 정리', detail: '개선 전/후 지표 비교 발표' },
    ],
    practice: {
      title: 'RAG 품질 개선 사이클',
      steps: [
        '질문-정답 평가셋 작성',
        '베이스라인 지표 측정',
        '청킹·검색·프롬프트 튜닝',
        '개선 전/후 지표 비교',
      ],
      deliverable: '평가 지표 개선 리포트',
    },
  },

  // ── 생성형 AI 서비스 개발 (LangChain) ──
  'langchain-1': {
    schedule: [
      { time: '09:00–09:30', topic: '도입', detail: 'LangChain 개요·생태계, 사용 사례' },
      { time: '09:30–11:00', topic: '핵심 구성요소', detail: '모델·프롬프트·출력 파서, 메시지 타입' },
      { time: '11:00–12:00', topic: 'LCEL', detail: '체인 조합(pipe), 입력/출력 스키마' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 기본 체인', detail: '프롬프트→모델→파서 체인 구성·실행' },
      { time: '15:30–17:00', topic: '구조화 출력', detail: 'JSON/Pydantic 파서, 검증·재시도' },
      { time: '17:00–18:00', topic: '정리 · Q&A', detail: 'Day2(메모리·도구) 예고' },
    ],
    practice: {
      title: '첫 LangChain 체인',
      steps: [
        '프롬프트 템플릿 정의',
        '모델·출력파서 연결(LCEL)',
        '구조화 출력(JSON) 받기',
        '실패 시 재시도 처리',
      ],
      deliverable: '구조화 출력 체인',
    },
  },
  'langchain-2': {
    schedule: [
      { time: '09:00–09:30', topic: 'Day1 리뷰', detail: '체인 복습, 상태가 필요한 이유' },
      { time: '09:30–11:00', topic: '메모리', detail: '대화 메모리, 히스토리 관리' },
      { time: '11:00–12:00', topic: '도구(Tool)', detail: '도구 정의·연결, 외부 API 호출' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 문서 QA', detail: 'Retriever 결합 문서 QA 체인 구현' },
      { time: '15:30–17:00', topic: '체인 라우팅', detail: '조건 분기·라우팅, 멀티스텝 구성' },
      { time: '17:00–18:00', topic: '정리 · Q&A', detail: 'Day3(서비스화) 예고' },
    ],
    practice: {
      title: '문서 QA 챗봇',
      steps: [
        'Retriever 구성',
        '메모리로 멀티턴 대화 유지',
        '문서 기반 답변 생성',
        '도구 1개 연동(예: 검색)',
      ],
      deliverable: '멀티턴 문서 QA 챗봇',
    },
  },
  'langchain-3': {
    schedule: [
      { time: '09:00–09:30', topic: '도입', detail: '데모를 서비스로 전환하는 관점' },
      { time: '09:30–11:00', topic: '스트리밍·콜백', detail: '토큰 스트리밍, 콜백/관측(LangSmith)' },
      { time: '11:00–12:00', topic: '안정성', detail: '비용·캐싱·에러 처리, 가드레일' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 서비스화', detail: 'FastAPI/Streamlit 로 체인을 API/UI 로 노출' },
      { time: '15:30–17:00', topic: '배포 준비', detail: '환경변수·시크릿, 배포 구조' },
      { time: '17:00–18:00', topic: '발표 · 정리', detail: '미니 서비스 시연' },
    ],
    practice: {
      title: '미니 생성형 AI 서비스',
      steps: [
        '체인을 FastAPI 엔드포인트로 노출',
        '스트리밍 응답 적용',
        '간단 UI(Streamlit) 연결',
        '에러·비용 처리 추가',
      ],
      deliverable: '호출 가능한 생성형 AI 서비스',
    },
  },

  // ── 모델 서빙 및 AIOps 구성 ──
  'serving-1': {
    schedule: [
      { time: '09:00–09:30', topic: '도입', detail: '서빙 패턴(온라인/배치/스트림) 개요' },
      { time: '09:30–11:00', topic: '추론 API 설계', detail: 'FastAPI/BentoML, 입출력 스키마' },
      { time: '11:00–12:00', topic: '패키징·버전', detail: '모델 직렬화, 버전 관리, 전/후처리' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 추론 API', detail: '학습 모델을 /predict REST 로 서빙' },
      { time: '15:30–17:00', topic: '검증·성능', detail: '입력 검증, 배치 처리, 지연 측정' },
      { time: '17:00–18:00', topic: '정리 · Q&A', detail: 'Day2(컨테이너·모니터링) 예고' },
    ],
    practice: {
      title: '모델 추론 REST API',
      steps: [
        '모델 로드 + 전/후처리 구현',
        'FastAPI /predict 엔드포인트',
        '입력 검증(Pydantic)',
        '응답 지연 측정',
      ],
      deliverable: '동작하는 추론 API',
    },
  },
  'serving-2': {
    schedule: [
      { time: '09:00–09:30', topic: 'Day1 리뷰', detail: '로컬→배포 전환 과제' },
      { time: '09:30–11:00', topic: '컨테이너화', detail: 'Dockerfile, 이미지 빌드·실행' },
      { time: '11:00–12:00', topic: '확장', detail: '오토스케일링, 헬스체크, 무중단 배포 개념' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 컨테이너 배포', detail: '추론 API 도커화→실행→호출' },
      { time: '15:30–17:00', topic: '모니터링', detail: '메트릭·로그·트레이싱, 드리프트 감지' },
      { time: '17:00–18:00', topic: '정리 · Q&A', detail: 'Day3(파이프라인) 예고' },
    ],
    practice: {
      title: '컨테이너 서빙 + 모니터링',
      steps: [
        '추론 API Dockerfile 작성',
        '이미지 빌드·컨테이너 실행',
        '헬스체크·로그 확인',
        '기본 메트릭 수집',
      ],
      deliverable: '컨테이너로 구동되는 서빙',
    },
  },
  'serving-3': {
    schedule: [
      { time: '09:00–09:30', topic: '도입', detail: 'MLOps/AIOps 전체 그림' },
      { time: '09:30–11:00', topic: '파이프라인', detail: '실험관리, 모델 레지스트리, 재현성' },
      { time: '11:00–12:00', topic: 'CI/CD', detail: '자동 빌드·테스트·배포' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 자동화', detail: 'GitHub Actions 로 빌드→배포 파이프라인' },
      { time: '15:30–17:00', topic: 'AIOps', detail: '이상 탐지·알림·자동 대응 개념' },
      { time: '17:00–18:00', topic: '발표 · 정리', detail: '3일차 종합, 운영 체크리스트' },
    ],
    practice: {
      title: '서빙 CI/CD 파이프라인',
      steps: [
        '테스트 자동화 구성',
        'Actions 로 이미지 빌드',
        '배포 단계 자동화',
        '롤백 전략 정리',
      ],
      deliverable: '자동 배포 파이프라인',
    },
  },

  // ── AI Agent 설계 및 구축 (LangGraph) ──
  'agent-1': {
    schedule: [
      { time: '09:00–09:30', topic: '도입', detail: '에이전트 개념, 워크플로 vs 에이전트' },
      { time: '09:30–11:00', topic: 'ReAct · LangGraph', detail: '추론+행동, 그래프·노드·엣지·State' },
      { time: '11:00–12:00', topic: '도구 호출', detail: '도구 바인딩, 분기·반복 제어' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 단일 에이전트', detail: '도구를 쓰는 ReAct 에이전트 그래프 구현' },
      { time: '15:30–17:00', topic: '상태·메모리', detail: '상태 누적, 체크포인트, 디버깅' },
      { time: '17:00–18:00', topic: '정리 · Q&A', detail: 'Day2(멀티 에이전트) 예고' },
    ],
    practice: {
      title: '도구 사용 단일 에이전트',
      steps: [
        'State 스키마 정의',
        '도구 2개 바인딩(검색/계산 등)',
        'ReAct 루프 그래프 구성',
        '질의 처리 시연',
      ],
      deliverable: '동작하는 LangGraph 에이전트',
    },
  },
  'agent-2': {
    schedule: [
      { time: '09:00–09:30', topic: 'Day1 리뷰', detail: '단일 에이전트 한계, 협업 필요성' },
      { time: '09:30–11:00', topic: '멀티 에이전트', detail: '오케스트레이션, 서브그래프, 역할 분담' },
      { time: '11:00–12:00', topic: 'HITL', detail: 'Human-in-the-loop, 승인·중단·재개' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 멀티 에이전트', detail: '플래너-워커 구조 워크플로 구현' },
      { time: '15:30–17:00', topic: '안정화', detail: '에러 복구·재시도, 관측·평가' },
      { time: '17:00–18:00', topic: '발표 · 정리', detail: '워크플로 시연, 회고' },
    ],
    practice: {
      title: '멀티 에이전트 워크플로',
      steps: [
        '플래너/워커 역할 정의',
        '서브그래프로 작업 분배',
        'HITL 승인 노드 추가',
        '엔드투엔드 시연',
      ],
      deliverable: '멀티 에이전트 시스템',
    },
  },

  // ── Vector DB ──
  'vectordb-1': {
    schedule: [
      { time: '09:00–09:30', topic: '도입', detail: '왜 벡터 검색인가, RAG 와의 관계' },
      { time: '09:30–11:00', topic: '임베딩·유사도', detail: '벡터 공간, 코사인/내적, 차원' },
      { time: '11:00–12:00', topic: '인덱싱 알고리즘', detail: 'HNSW·IVF, 정확도-속도 트레이드오프' },
      lunch,
      { time: '13:00–15:30', topic: '실습: 검색 구현', detail: 'pgvector/Chroma/FAISS 중 택1로 임베딩·검색' },
      { time: '15:30–17:00', topic: '필터·하이브리드', detail: '메타데이터 필터링, 하이브리드 검색' },
      { time: '17:00–18:00', topic: '정리 · Q&A', detail: '성능·운영 고려사항' },
    ],
    practice: {
      title: '문서 임베딩·검색',
      steps: [
        '문서 임베딩 생성',
        'Vector DB 에 저장(메타데이터 포함)',
        'top-k 유사도 검색',
        '메타데이터 필터 적용',
      ],
      deliverable: '필터링 가능한 벡터 검색',
    },
  },

  // ── AI Agent Capstone ──
  'capstone-1': {
    schedule: [
      { time: '09:00–10:00', topic: '캡스톤 오리엔테이션', detail: '목표·평가 기준, 팀 빌딩' },
      { time: '10:00–12:00', topic: '문제 정의', detail: '사용자/문제 시나리오 구체화, 범위 설정' },
      lunch,
      { time: '13:00–15:30', topic: '아키텍처 설계', detail: '에이전트+RAG+도구 구성도, 데이터·인터페이스 계획' },
      { time: '15:30–17:00', topic: '계획 수립', detail: '작업 분해(WBS), 역할 분담, 일정' },
      { time: '17:00–18:00', topic: '계획 발표', detail: '팀별 설계 공유·피드백' },
    ],
    practice: {
      title: '캡스톤 설계서',
      steps: [
        '문제·사용자·가치 정의',
        '시스템 아키텍처 다이어그램',
        '데이터·도구·모델 선정',
        '작업·일정 계획',
      ],
      deliverable: '캡스톤 설계 문서 + 아키텍처 도식',
    },
  },
  'capstone-2': {
    schedule: [
      { time: '09:00–09:30', topic: '데일리 스탠드업', detail: '진행 상황·블로커 공유' },
      { time: '09:30–12:00', topic: '핵심 구현 (1)', detail: '에이전트 그래프·도구 구현' },
      lunch,
      { time: '13:00–16:30', topic: '핵심 구현 (2)', detail: 'RAG·외부 API·프론트 통합' },
      { time: '16:30–18:00', topic: '중간 점검', detail: '데모 가능 수준 점검, 멘토 피드백' },
    ],
    practice: {
      title: '캡스톤 구현 (집중 개발)',
      steps: [
        '에이전트·도구 우선 구현',
        'RAG/외부 연동 결합',
        'UI/통합',
        '중간 데모 준비',
      ],
      deliverable: '동작하는 핵심 기능(MVP)',
    },
  },
  'capstone-3': {
    schedule: [
      { time: '09:00–09:30', topic: '데일리 스탠드업', detail: '마무리 작업 분배' },
      { time: '09:30–12:00', topic: '통합·테스트', detail: '엔드투엔드 통합, 버그 수정' },
      lunch,
      { time: '13:00–15:00', topic: '시연 준비', detail: '시나리오 정리, 발표 자료' },
      { time: '15:00–17:00', topic: '최종 발표', detail: '팀별 시연·발표' },
      { time: '17:00–18:00', topic: '회고', detail: '상호 피드백, 배운 점 정리' },
    ],
    practice: {
      title: '캡스톤 완성·발표',
      steps: [
        '엔드투엔드 통합·검증',
        '성능·한계 점검',
        '발표 자료·데모 준비',
        '발표 및 회고',
      ],
      deliverable: '완성된 에이전트 서비스 + 발표',
    },
  },

  // ── AI 서비스 개발 Mini-project ──
  'miniproject-1': {
    schedule: [
      { time: '09:00–10:00', topic: '프로젝트 오리엔테이션', detail: '목표·산출물, 팀 구성' },
      { time: '10:00–12:00', topic: '기획·요구사항', detail: '주제 선정, 요구사항·성공 기준 정의' },
      lunch,
      { time: '13:00–15:30', topic: '설계', detail: '아키텍처·데이터 플로우, 기술 스택 선정' },
      { time: '15:30–17:00', topic: '환경 셋업', detail: '레포·CI·기본 골격 구성' },
      { time: '17:00–18:00', topic: '계획 공유', detail: '작업 분담·일정 발표' },
    ],
    practice: {
      title: '미니 프로젝트 기획·설계',
      steps: [
        '주제·요구사항 정의',
        '아키텍처·데이터 플로우 설계',
        '기술 스택 선정',
        '레포·골격 셋업',
      ],
      deliverable: '기획서 + 설계도 + 초기 레포',
    },
  },
  'miniproject-2': {
    schedule: [
      { time: '09:00–09:30', topic: '스탠드업', detail: '진행·블로커 공유' },
      { time: '09:30–12:00', topic: '핵심 구현 (1)', detail: 'LLM/RAG/Agent 핵심 기능 구현' },
      lunch,
      { time: '13:00–16:30', topic: '핵심 구현 (2)', detail: 'API·UI 통합, 예외 처리' },
      { time: '16:30–18:00', topic: '중간 시연', detail: '데모·피드백' },
    ],
    practice: {
      title: '미니 프로젝트 구현',
      steps: [
        '핵심 AI 기능 구현',
        'API·UI 통합',
        '예외·안정화',
        '중간 시연 준비',
      ],
      deliverable: '동작하는 MVP',
    },
  },
  'miniproject-3': {
    schedule: [
      { time: '09:00–09:30', topic: '스탠드업', detail: '마무리 작업 분배' },
      { time: '09:30–12:00', topic: '테스트·안정화', detail: '기능 테스트, 버그 수정' },
      lunch,
      { time: '13:00–15:00', topic: '배포', detail: '배포·시연 환경 구성' },
      { time: '15:00–17:00', topic: '최종 발표', detail: '팀별 시연·발표' },
      { time: '17:00–18:00', topic: '회고', detail: '피드백·정리' },
    ],
    practice: {
      title: '미니 프로젝트 완성·배포',
      steps: [
        '기능 테스트·버그 수정',
        '배포 환경 구성',
        '발표 자료 준비',
        '발표 및 회고',
      ],
      deliverable: '배포된 서비스 + 발표',
    },
  },
}

export const planFor = (subjectId, day) => plans[`${subjectId}-${day}`] || null
