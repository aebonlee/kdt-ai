// ─────────────────────────────────────────────────────────────
// SKALA 4기 — 이애본 강사 담당 강의 커리큘럼
//
// 출처: [SK] SKALA AI 캠퍼스 과정 강사 강의분야/스케쥴 확정표 (최종 반영)
//   교육기간 2026.07.15 ~ 10.28, 평일 09:00~18:00 (100% 오프라인)
//   지역: 울산 · 판교(4·5층) · 광주
//
// 데이터 모델
//   subject : 과목(모듈). days[] 에 일차별 학습내용(목표/내용) 보유
//   session : 실제 강의가 잡힌 "일자" 인스턴스 (날짜·요일·지역·층/반 + 해당 과목의 day)
//             동일 과목을 여러 지역(분반)에 진행하면 day 는 분반마다 1부터 다시 시작
// ─────────────────────────────────────────────────────────────

export const subjects = [
  {
    id: 'python',
    code: '7-1',
    name: '데이터 분석을 위한 Python 이해',
    category: '데이터분석 · MLOps',
    summary: '데이터 분석을 위한 Python 문법과 핵심 라이브러리(Pandas) 기반 데이터 처리·시각화',
    days: [
      {
        title: 'Python 기초와 데이터 다루기',
        objectives: [
          '데이터 분석 관점의 Python 문법 이해',
          '자료구조와 함수로 데이터 처리 로직 작성',
        ],
        contents: [
          '데이터 분석 환경(Jupyter/Colab) 셋업',
          '변수·자료형·연산자, 문자열 처리',
          '리스트·딕셔너리·튜플·집합 등 자료구조',
          '조건문·반복문·함수·컴프리헨션',
          'NumPy 배열과 벡터 연산 기초',
          '실습: 데이터 전처리 기본 스크립트',
        ],
      },
      {
        title: 'Pandas·시각화로 데이터 분석',
        objectives: [
          'Pandas 로 데이터 적재·정제·집계',
          '시각화로 데이터 인사이트 도출',
        ],
        contents: [
          'Series · DataFrame 구조와 인덱싱',
          '결측치·이상치 처리와 데이터 정제',
          '필터링·정렬·그룹별 집계(groupby)',
          '병합(merge)·피벗·재구조화',
          'matplotlib · seaborn 시각화',
          '실습: 실데이터 탐색적 분석(EDA)',
        ],
      },
    ],
  },
  {
    // 최종 일정 미배정 → 일정·과목별엔 표시 안 됨. 강의안 "참고"에만 노출.
    id: 'prompt',
    code: '8-1',
    name: 'Prompt 설계와 Context Engineering',
    category: 'LLM · Agent',
    reference: true,
    summary: 'LLM의 입력을 설계·최적화하는 프롬프트 엔지니어링과 컨텍스트 구성 기법',
    days: [
      {
        title: '프롬프트 설계와 컨텍스트 엔지니어링',
        objectives: [
          'LLM의 동작과 프롬프트의 역할 이해',
          '프롬프트 구성요소와 패턴을 활용한 입력 설계',
          '컨텍스트 윈도우·토큰 한계를 고려한 입력 최적화',
        ],
        contents: [
          '프롬프트 구성요소: 역할(role)·지시(instruction)·예시(example)·제약(constraint)',
          'Zero-shot / Few-shot / Chain-of-Thought 프롬프팅',
          'System · User · Assistant 메시지 설계',
          '컨텍스트 윈도우와 토큰 비용, 컨텍스트 압축·요약 전략',
          '프롬프트 패턴과 안티패턴, 환각(hallucination) 줄이기',
          '실습: 업무 프롬프트 작성 → 평가 → 개선',
        ],
      },
    ],
  },
  {
    id: 'vue',
    code: '2-1',
    name: 'Front-Framework: Vue.js',
    category: 'Front-End',
    summary: 'Vue 3 기반 컴포넌트 프론트엔드 개발 (반응형, Composition API, 라우팅)',
    days: [
      {
        title: 'Vue 기초와 반응형 시스템',
        objectives: [
          'Vue 3 프로젝트 구조와 SFC(Single File Component) 이해',
          '반응형 상태와 템플릿 문법 활용',
        ],
        contents: [
          'Vue 개요, Vite 기반 프로젝트 셋업, SFC 구조',
          '반응형 상태: ref / reactive, 양방향 바인딩 v-model',
          '템플릿 문법과 디렉티브: v-if / v-for / v-bind / v-on',
          '이벤트 처리와 폼 입력',
          'computed / watch 로 파생 상태 다루기',
          '실습: 반응형 UI 컴포넌트 만들기',
        ],
      },
      {
        title: '컴포넌트 통신과 Composition API',
        objectives: [
          '컴포넌트 통신과 재사용 패턴 이해',
          'Composition API 로 로직 구성',
        ],
        contents: [
          '컴포넌트 통신: props / emit, 슬롯(slot)',
          '라이프사이클 훅과 Composition API(setup) 패턴',
          'computed / watch 심화, 반응형 유틸',
          '컴포넌트 분리·재사용 설계',
          '실습: 재사용 컴포넌트(목록·아이템) 구성',
        ],
      },
      {
        title: '라우팅과 상태관리 (Router · Pinia)',
        objectives: [
          'SPA 라우팅 구성',
          '전역 상태 관리(Pinia) 적용',
        ],
        contents: [
          'Vue Router: 라우트·동적 파라미터·중첩 라우트',
          '네비게이션 가드(인증 등)',
          'Pinia 스토어: state / getters / actions',
          '컴포넌트-스토어 연동 패턴',
          '실습: 목록·상세 라우팅 + 전역 상태',
        ],
      },
      {
        title: 'API 연동과 실전 SPA · 배포',
        objectives: [
          'API 연동과 비동기 상태 처리',
          'SPA 통합·빌드·배포',
        ],
        contents: [
          'fetch / axios 비동기 데이터, 로딩·에러 처리',
          '폼 처리와 유효성 검사',
          '환경변수와 API 베이스 설정',
          'Vite 빌드와 정적 배포',
          '실습: 미니 SPA(목록·상세·폼) 완성·배포',
        ],
      },
    ],
  },
  {
    id: 'webproject',
    code: '2-2',
    name: '웹 서비스 개발 mini-Project',
    category: 'Front-End',
    summary: '기획부터 배포까지 한 사이클로 진행하는 웹 서비스 개발 미니 프로젝트',
    days: [
      {
        title: '기획·설계',
        objectives: ['웹 서비스 주제 기획과 요구사항 정의', '화면·데이터·아키텍처 설계'],
        contents: [
          '주제 선정과 사용자 시나리오 정의',
          '화면 흐름(와이어프레임)과 기능 명세',
          '프론트/백엔드 아키텍처·데이터 모델 설계',
          '기술 스택 선정과 작업 분담·일정',
        ],
      },
      {
        title: '구현',
        objectives: ['설계 기반 핵심 화면·기능 구현'],
        contents: [
          'UI 컴포넌트와 화면 라우팅 구현',
          'API 연동과 상태 관리',
          '폼 처리·유효성 검사·예외 처리',
          '중간 점검과 피드백 반영',
        ],
      },
      {
        title: '통합·배포·발표',
        objectives: ['통합 테스트 후 배포하고 결과 발표'],
        contents: [
          '기능 통합과 버그 수정',
          '빌드와 정적 배포(환경 구성)',
          '시연 준비와 결과 발표',
          '회고와 개선점 정리',
        ],
      },
    ],
  },
  {
    // 현재 강의 배정 없음(세션 없음) → 일정·과목별 강의엔 표시 안 됨. 강의안에 "참고용"으로만 노출.
    id: 'spring-ai',
    code: '4-2',
    name: 'Spring AI',
    category: 'Back-end',
    reference: true,
    summary: 'Spring Boot 기반으로 LLM·RAG·Tool을 통합하는 Spring AI 애플리케이션 개발',
    days: [
      {
        title: 'Spring AI 개요와 LLM 연동',
        objectives: [
          'Spring AI 아키텍처와 추상화(ChatClient) 이해',
          'Spring Boot 애플리케이션에 LLM 연동',
        ],
        contents: [
          'Spring AI 개요와 의존성·환경설정',
          'ChatClient / ChatModel 추상화',
          'OpenAI · Anthropic 등 모델 프로바이더 연동',
          'PromptTemplate 과 구조화된 메시지',
          '실습: 채팅 응답 REST API 구현',
        ],
      },
      {
        title: 'Spring AI 기반 RAG',
        objectives: [
          'Embedding 과 VectorStore 개념 이해',
          'Spring AI 로 문서 기반 질의응답 구현',
        ],
        contents: [
          'Embedding Model 과 벡터화',
          'VectorStore(예: pgvector) 연동과 문서 적재',
          'Document Reader / Splitter 로 문서 처리',
          'Retrieval 결합 프롬프트(RAG) 구성',
          '실습: 사내 문서 QA API',
        ],
      },
      {
        title: 'Function Calling·구조화 출력·서비스 통합',
        objectives: [
          'Tool/Function Calling 으로 외부 기능 연동',
          'AI 기능을 실제 서비스에 통합',
        ],
        contents: [
          'Function Calling(Tool) 정의와 호출',
          '구조화 출력(Structured Output) 매핑',
          '스트리밍 응답과 예외·재시도 처리',
          'AI 기능의 서비스 통합과 보안 고려사항',
          '실습: 도구 연동형 AI 기능 서비스',
        ],
      },
    ],
  },
  {
    id: 'sllm',
    code: '8-3',
    name: 'sLLM 구현 및 Fine Tunning',
    category: 'LLM · Agent',
    summary: '오픈소스 소형 LLM(sLLM)의 활용과 LoRA 기반 파인튜닝',
    days: [
      {
        title: 'sLLM 이해와 로컬 서빙',
        objectives: [
          'sLLM 개념과 오픈소스 모델 생태계 이해',
          '양자화와 로컬 추론 환경 구성',
        ],
        contents: [
          'sLLM 개념과 대형 LLM 대비 장단점',
          '대표 오픈소스 모델(Llama, Qwen, Gemma 등)',
          '양자화(quantization)와 경량화',
          '로컬 서빙(ollama / vLLM / HF) 환경 구성',
          'PEFT · LoRA 개념 소개',
        ],
      },
      {
        title: 'LoRA 파인튜닝 실습',
        objectives: [
          '파인튜닝용 데이터셋 구성 방법 이해',
          'LoRA 로 sLLM 파인튜닝·평가·배포',
        ],
        contents: [
          '파인튜닝 데이터셋 설계(instruction 포맷)',
          'LoRA / QLoRA 학습 파이프라인',
          '학습 모니터링과 하이퍼파라미터',
          '평가와 추론 검증',
          '실습: 도메인 특화 sLLM 파인튜닝',
        ],
      },
    ],
  },
  {
    id: 'ml-dl',
    code: '7-3',
    name: '머신러닝 및 딥러닝 이해',
    category: '데이터분석 · MLOps',
    summary: '머신러닝/딥러닝의 핵심 개념과 PyTorch 기반 모델링 기초',
    days: [
      {
        title: '머신러닝 기초',
        objectives: [
          '지도·비지도 학습과 대표 알고리즘 이해',
          'scikit-learn 으로 모델 학습·평가',
        ],
        contents: [
          'ML 개요와 학습 유형(지도/비지도/강화)',
          '회귀와 분류, 대표 알고리즘',
          '데이터 분할, 과적합과 일반화',
          '평가지표(정확도·정밀도·재현율·F1·ROC)',
          '실습: scikit-learn 분류 모델',
        ],
      },
      {
        title: '딥러닝 기초와 신경망',
        objectives: [
          '신경망 구조와 학습 원리 이해',
          'PyTorch 로 신경망 구현',
        ],
        contents: [
          '퍼셉트론과 다층 신경망(MLP)',
          '순전파·역전파, 활성화 함수',
          '손실 함수와 옵티마이저(SGD/Adam)',
          'PyTorch 텐서와 학습 루프',
          '실습: 신경망 분류 모델 학습',
        ],
      },
      {
        title: '딥러닝 아키텍처 개요',
        objectives: [
          '대표 딥러닝 아키텍처의 특징 이해',
          '정규화·튜닝으로 모델 성능 개선',
        ],
        contents: [
          'CNN(이미지), RNN/LSTM(시퀀스) 개요',
          'Transformer 와 Attention 직관',
          '과적합 방지: 드롭아웃·정규화·데이터 증강',
          '하이퍼파라미터 튜닝과 전이학습',
          '실습: 모델 개선 미니 과제',
        ],
      },
    ],
  },
  {
    id: 'feature',
    code: '7-2',
    name: '실전 Feature Engineering',
    category: '데이터분석 · MLOps',
    summary: '모델 성능을 끌어올리는 실전 피처 엔지니어링 기법',
    days: [
      {
        title: '실전 Feature Engineering',
        objectives: [
          '피처 엔지니어링이 모델 성능에 미치는 영향 이해',
          '데이터 유형별 피처 생성·선택·변환 기법 적용',
        ],
        contents: [
          '피처 엔지니어링 개요와 워크플로',
          '결측치·이상치 처리, 스케일링·정규화',
          '범주형 인코딩(원-핫·타깃·임베딩)',
          '수치·날짜·텍스트 파생 피처 생성',
          '피처 선택(중요도·상관·정규화)과 차원 축소',
          '실습: 피처 엔지니어링 전후 성능 비교',
        ],
      },
    ],
  },
  {
    id: 'modeldev',
    code: '7-4',
    name: '모델 개발 및 최적화',
    category: '데이터분석 · MLOps',
    summary: '모델 학습 파이프라인 구성과 하이퍼파라미터·성능 최적화',
    days: [
      {
        title: '모델 개발과 학습',
        objectives: [
          '문제 정의에 맞는 모델 선택과 학습 파이프라인 구성',
          '교차검증으로 일반화 성능 평가',
        ],
        contents: [
          '문제 유형별 모델 선택 기준',
          '학습/검증/테스트 분할과 교차검증',
          '파이프라인 구성(전처리→학습→평가)',
          '평가지표 설계와 베이스라인 수립',
          '실습: 베이스라인 모델 학습·평가',
        ],
      },
      {
        title: '모델 최적화·튜닝',
        objectives: [
          '하이퍼파라미터 튜닝으로 성능 개선',
          '과적합 제어와 모델 경량화·앙상블 적용',
        ],
        contents: [
          '하이퍼파라미터 탐색(Grid/Random/Bayesian)',
          '정규화·조기종료로 과적합 제어',
          '앙상블(배깅·부스팅·스태킹)',
          '모델 경량화와 추론 성능 최적화',
          '실습: 튜닝으로 성능 개선·비교',
        ],
      },
    ],
  },
  {
    // 최종 일정 미배정 → 일정·과목별엔 표시 안 됨. 강의안 "참고"에만 노출.
    id: 'rag',
    code: '8-7',
    name: 'RAG Pipeline 설계 및 구축',
    category: 'LLM · Agent',
    reference: true,
    summary: '검색 증강 생성(RAG) 파이프라인의 설계·구축·평가·고도화',
    days: [
      {
        title: 'RAG 개념과 인덱싱',
        objectives: [
          'RAG의 필요성과 전체 파이프라인 이해',
          '문서 적재·청킹·임베딩·색인 구성',
        ],
        contents: [
          'RAG 개념과 LLM 한계 보완',
          '문서 로딩과 청킹(chunking) 전략',
          '임베딩과 벡터 인덱싱',
          '벡터 검색(유사도) 기초',
          '실습: 문서 인덱싱 파이프라인',
        ],
      },
      {
        title: '검색·재순위·생성',
        objectives: [
          '리트리버 구성과 검색 품질 향상',
          '검색 결과를 결합한 응답 생성',
        ],
        contents: [
          'Retriever 구성과 top-k 검색',
          '재순위(re-ranking)와 하이브리드 검색(키워드+벡터)',
          '컨텍스트 결합 프롬프트 설계',
          '출처 인용과 근거 제시',
          '실습: 질의응답 체인 구축',
        ],
      },
      {
        title: 'RAG 평가와 고도화',
        objectives: [
          'RAG 품질을 정량 평가',
          '실서비스 관점의 고도화 적용',
        ],
        contents: [
          '평가 지표와 RAGAS(충실도·관련성)',
          '청킹·임베딩·검색 파라미터 튜닝',
          '멀티 문서·메타데이터 필터링',
          '비용·지연·캐싱 최적화',
          '실습: RAG 파이프라인 개선',
        ],
      },
    ],
  },
  {
    id: 'langchain',
    code: '8-6',
    name: '생성형 AI 서비스 개발의 이해/활용 (LangChain)',
    category: 'LLM · Agent',
    summary: 'LangChain 으로 LLM 기반 애플리케이션을 구성·서비스화',
    days: [
      {
        title: 'LangChain 구조와 LCEL',
        objectives: [
          'LangChain 핵심 구성요소 이해',
          'LCEL 로 체인 조합',
        ],
        contents: [
          'LangChain 개요와 생태계',
          '모델 · 프롬프트 · 출력 파서',
          'LCEL(LangChain Expression Language) 체인 구성',
          '실습: 기본 체인 만들기',
        ],
      },
      {
        title: '메모리·도구·문서 QA',
        objectives: [
          '대화 메모리와 도구 사용 적용',
          '문서 기반 QA 체인 구성',
        ],
        contents: [
          '대화 메모리(Memory)',
          '도구(Tool)와 외부 연동',
          'Retriever 결합 문서 QA',
          '체인 조합과 라우팅',
          '실습: 문서 QA 챗봇',
        ],
      },
      {
        title: '스트리밍·서비스화',
        objectives: [
          '응답 스트리밍과 콜백 처리',
          'LLM 앱의 서비스 배포 관점 이해',
        ],
        contents: [
          '스트리밍 응답과 콜백',
          '관측(LangSmith) 과 디버깅',
          '비용·캐싱·에러 처리',
          '서비스 배포 구조',
          '실습: 미니 생성형 AI 서비스',
        ],
      },
    ],
  },
  {
    id: 'serving',
    code: '7-5',
    name: '모델 서빙 및 AIOps 구성',
    category: '데이터분석 · MLOps',
    summary: '학습한 모델의 서빙·운영(MLOps/AIOps) 파이프라인 구성',
    days: [
      {
        title: '모델 서빙 기초',
        objectives: [
          '모델 서빙 패턴 이해',
          '추론 API 구현',
        ],
        contents: [
          '온라인/배치/스트림 서빙 패턴',
          'FastAPI · BentoML 로 추론 API',
          '모델 패키징과 버전 관리',
          '입력 검증·전처리·후처리',
          '실습: 추론 REST API',
        ],
      },
      {
        title: '컨테이너화·확장·모니터링',
        objectives: [
          '서빙 서비스의 컨테이너화·확장',
          '운영 지표 모니터링 구성',
        ],
        contents: [
          'Docker 컨테이너화와 배포',
          '오토스케일링과 부하 대응',
          '메트릭·로그·트레이싱(관측성)',
          '데이터·모델 드리프트 모니터링',
          '실습: 컨테이너 서빙 + 모니터링',
        ],
      },
      {
        title: 'MLOps/AIOps 파이프라인',
        objectives: [
          '학습→배포 자동화 파이프라인 이해',
          'CI/CD 와 운영 자동화 적용',
        ],
        contents: [
          'MLOps 파이프라인과 실험 관리',
          '모델 레지스트리와 재현성',
          'CI/CD 자동 배포',
          'AIOps: 이상탐지·자동 대응',
          '실습: 파이프라인 구성',
        ],
      },
    ],
  },
  {
    id: 'agent',
    code: '8-8',
    name: 'AI Agent 설계 및 구축 (LangGraph)',
    category: 'LLM · Agent',
    summary: 'LangGraph 기반 에이전트(상태·도구·멀티에이전트) 설계와 구축',
    days: [
      {
        title: '에이전트 개념과 LangGraph',
        objectives: [
          '에이전트와 ReAct 패턴 이해',
          'LangGraph 그래프/노드/상태 구성',
        ],
        contents: [
          '에이전트 개념과 자율 추론',
          'ReAct(추론+행동) 패턴',
          'LangGraph 의 그래프·노드·엣지·상태(State)',
          '도구 호출과 분기 제어',
          '실습: 단일 에이전트 구축',
        ],
      },
      {
        title: '멀티 에이전트·휴먼인더루프',
        objectives: [
          '멀티 에이전트 협업 설계',
          '사람 개입(HITL)과 안정적 운영',
        ],
        contents: [
          '멀티 에이전트 오케스트레이션',
          '도구·메모리·서브그래프 조합',
          'Human-in-the-loop 와 승인 흐름',
          '에러 복구·재시도·관측',
          '실습: 멀티 에이전트 워크플로',
        ],
      },
    ],
  },
  {
    id: 'vectordb',
    code: '8-4',
    name: 'Vector DB',
    category: 'LLM · Agent',
    summary: '벡터 검색의 원리와 Vector DB 활용',
    days: [
      {
        title: 'Vector DB 원리와 활용',
        objectives: [
          '임베딩과 벡터 유사도 검색 원리 이해',
          '대표 Vector DB 를 활용한 검색 구현',
        ],
        contents: [
          '임베딩과 벡터 공간, 유사도(코사인/내적)',
          '인덱싱 알고리즘: HNSW · IVF',
          '대표 Vector DB: pgvector · Chroma · FAISS · Pinecone',
          '메타데이터 필터링과 하이브리드 검색',
          '실습: 문서 임베딩·검색 구현',
        ],
      },
    ],
  },
  {
    id: 'capstone',
    code: 'CAP',
    name: 'AI Agent Capstone',
    category: 'LLM · Agent',
    summary: '에이전트 기반 AI 서비스 캡스톤: 기획 → 설계 → 구현 → 발표',
    days: [
      {
        title: '주제 선정과 아키텍처 설계',
        objectives: ['문제 정의와 캡스톤 주제 선정', '에이전트 시스템 아키텍처 설계'],
        contents: [
          '문제 정의와 사용자 시나리오',
          '에이전트 + RAG + 도구 아키텍처 설계',
          '데이터·모델·인터페이스 계획',
          '팀별 계획 수립',
        ],
      },
      {
        title: '구현',
        objectives: ['설계 기반 에이전트 서비스 구현'],
        contents: [
          '에이전트 그래프·도구 구현',
          'RAG·외부 API 연동',
          '프론트/백 통합',
          '중간 점검과 피드백',
        ],
      },
      {
        title: '통합·발표',
        objectives: ['완성도 점검과 결과 발표'],
        contents: [
          '통합 테스트와 시연 준비',
          '성능·한계 점검',
          '결과 발표와 회고',
        ],
      },
    ],
  },
  {
    id: 'miniproject',
    code: '8-10',
    name: 'AI 서비스 개발 Mini-project',
    category: 'LLM · Agent',
    summary: 'LLM·RAG·Agent 를 통합한 AI 서비스 미니 프로젝트',
    days: [
      {
        title: '기획·설계',
        objectives: ['미니 프로젝트 주제 기획과 요구사항 정의', '서비스 아키텍처 설계'],
        contents: [
          '주제 선정과 요구사항 정의',
          '아키텍처·데이터 플로우 설계',
          '기술 스택 선정',
          '작업 분담과 일정',
        ],
      },
      {
        title: '구현',
        objectives: ['핵심 기능 구현(LLM/RAG/Agent 통합)'],
        contents: [
          'LLM·RAG·Agent 기능 구현',
          'API·UI 통합',
          '예외 처리와 안정화',
          '중간 시연',
        ],
      },
      {
        title: '테스트·배포·발표',
        objectives: ['테스트·배포 후 결과 발표'],
        contents: [
          '기능 테스트와 버그 수정',
          '배포와 시연 환경 구성',
          '결과 발표와 피드백',
        ],
      },
    ],
  },
]

// 실제 강의가 잡힌 일자(최종 확정) — 날짜·요일·지역·층/반 + 과목 day
// klass: 판교는 강의장 층('4층'·'5층'), 광주는 분반('1반'), 울산은 단일('')
export const sessions = [
  // ── 7월 (3일) ──
  { date: '2026-07-15', weekday: '수', region: '울산', klass: '', subjectId: 'python', day: 1 },
  { date: '2026-07-16', weekday: '목', region: '울산', klass: '', subjectId: 'python', day: 2 },
  { date: '2026-07-31', weekday: '금', region: '판교', klass: '5층', subjectId: 'vue', day: 1 },

  // ── 8월 (9일) ──
  // Vue.js — 판교 분반 (Day1~4)
  { date: '2026-08-03', weekday: '월', region: '판교', klass: '5층', subjectId: 'vue', day: 2 },
  { date: '2026-08-04', weekday: '화', region: '판교', klass: '5층', subjectId: 'vue', day: 3 },
  { date: '2026-08-05', weekday: '수', region: '판교', klass: '5층', subjectId: 'vue', day: 4 },
  // Vue.js — 광주 분반 (Day1~4)
  { date: '2026-08-18', weekday: '화', region: '광주', klass: '1반', subjectId: 'vue', day: 1 },
  { date: '2026-08-19', weekday: '수', region: '광주', klass: '1반', subjectId: 'vue', day: 2 },
  { date: '2026-08-20', weekday: '목', region: '광주', klass: '1반', subjectId: 'vue', day: 3 },
  { date: '2026-08-21', weekday: '금', region: '광주', klass: '1반', subjectId: 'vue', day: 4 },
  // sLLM
  { date: '2026-08-28', weekday: '금', region: '판교', klass: '5층', subjectId: 'sllm', day: 1 },
  { date: '2026-08-31', weekday: '월', region: '판교', klass: '5층', subjectId: 'sllm', day: 2 },

  // ── 9월 (14일) ──
  { date: '2026-09-01', weekday: '화', region: '판교', klass: '5층', subjectId: 'ml-dl', day: 1 },
  { date: '2026-09-02', weekday: '수', region: '판교', klass: '5층', subjectId: 'ml-dl', day: 2 },
  { date: '2026-09-03', weekday: '목', region: '판교', klass: '5층', subjectId: 'ml-dl', day: 3 },
  // 웹 서비스 mini-Project — 판교 4층 분반 (Day1~3)
  { date: '2026-09-08', weekday: '화', region: '판교', klass: '4층', subjectId: 'webproject', day: 1 },
  { date: '2026-09-09', weekday: '수', region: '판교', klass: '4층', subjectId: 'webproject', day: 2 },
  { date: '2026-09-10', weekday: '목', region: '판교', klass: '4층', subjectId: 'webproject', day: 3 },
  { date: '2026-09-11', weekday: '금', region: '판교', klass: '4층', subjectId: 'langchain', day: 1 },
  { date: '2026-09-14', weekday: '월', region: '판교', klass: '5층', subjectId: 'feature', day: 1 },
  // 웹 서비스 mini-Project — 판교 5층 분반 (Day1~3)
  { date: '2026-09-15', weekday: '화', region: '판교', klass: '5층', subjectId: 'webproject', day: 1 },
  { date: '2026-09-16', weekday: '수', region: '판교', klass: '5층', subjectId: 'webproject', day: 2 },
  { date: '2026-09-17', weekday: '목', region: '판교', klass: '5층', subjectId: 'webproject', day: 3 },
  // 모델 개발 및 최적화
  { date: '2026-09-28', weekday: '월', region: '판교', klass: '5층', subjectId: 'modeldev', day: 1 },
  { date: '2026-09-29', weekday: '화', region: '판교', klass: '5층', subjectId: 'modeldev', day: 2 },
  // 모델 서빙 및 AIOps — 판교 분반 (Day1~3)
  { date: '2026-09-30', weekday: '수', region: '판교', klass: '5층', subjectId: 'serving', day: 1 },

  // ── 10월 (17일) ──
  { date: '2026-10-01', weekday: '목', region: '판교', klass: '5층', subjectId: 'serving', day: 2 },
  { date: '2026-10-02', weekday: '금', region: '판교', klass: '5층', subjectId: 'serving', day: 3 },
  // 모델 서빙 및 AIOps — 광주 분반 (Day1~3)
  { date: '2026-10-06', weekday: '화', region: '광주', klass: '1반', subjectId: 'serving', day: 1 },
  { date: '2026-10-07', weekday: '수', region: '광주', klass: '1반', subjectId: 'serving', day: 2 },
  { date: '2026-10-08', weekday: '목', region: '광주', klass: '1반', subjectId: 'serving', day: 3 },
  // AI Agent
  { date: '2026-10-12', weekday: '월', region: '광주', klass: '1반', subjectId: 'agent', day: 1 },
  { date: '2026-10-13', weekday: '화', region: '광주', klass: '1반', subjectId: 'agent', day: 2 },
  // Vector DB
  { date: '2026-10-14', weekday: '수', region: '광주', klass: '1반', subjectId: 'vectordb', day: 1 },
  // AI Agent Capstone
  { date: '2026-10-15', weekday: '목', region: '광주', klass: '1반', subjectId: 'capstone', day: 1 },
  { date: '2026-10-16', weekday: '금', region: '광주', klass: '1반', subjectId: 'capstone', day: 2 },
  { date: '2026-10-19', weekday: '월', region: '광주', klass: '1반', subjectId: 'capstone', day: 3 },
  // AI 서비스 개발 Mini-project — 광주 분반 (Day1~3)
  { date: '2026-10-20', weekday: '화', region: '광주', klass: '1반', subjectId: 'miniproject', day: 1 },
  { date: '2026-10-21', weekday: '수', region: '광주', klass: '1반', subjectId: 'miniproject', day: 2 },
  { date: '2026-10-22', weekday: '목', region: '광주', klass: '1반', subjectId: 'miniproject', day: 3 },
  // AI 서비스 개발 Mini-project — 판교 분반 (Day1~3)
  { date: '2026-10-26', weekday: '월', region: '판교', klass: '5층', subjectId: 'miniproject', day: 1 },
  { date: '2026-10-27', weekday: '화', region: '판교', klass: '5층', subjectId: 'miniproject', day: 2 },
  { date: '2026-10-28', weekday: '수', region: '판교', klass: '5층', subjectId: 'miniproject', day: 3 },
]

// ── 조회 헬퍼 ──
export const subjectById = (id) => subjects.find((s) => s.id === id)

export const sortedSessions = () => [...sessions].sort((a, b) => a.date.localeCompare(b.date))

export const sessionByDate = (date) => sessions.find((s) => s.date === date)

// 참고용(미배정) 과목 — 강의안에 참고로만 노출
export const referenceSubjects = subjects.filter((s) => s.reference)

// 과목별로 묶은 세션 { subject, items[] } (담당 과목만, 첫 강의일 순)
export const sessionsBySubject = () =>
  subjects
    .map((subject) => ({
      subject,
      items: sortedSessions().filter((s) => s.subjectId === subject.id),
    }))
    .filter((g) => g.items.length > 0)
    .sort((a, b) => a.items[0].date.localeCompare(b.items[0].date))

// 월별 그룹 { month, items[] }  (month: '2026-07')
export const sessionsByMonth = () => {
  const map = new Map()
  for (const s of sortedSessions()) {
    const m = s.date.slice(0, 7)
    if (!map.has(m)) map.set(m, [])
    map.get(m).push(s)
  }
  return [...map.entries()].map(([month, items]) => ({ month, items }))
}

// 세션 → 해당 과목 day 내용
export const dayOf = (session) => {
  const subj = subjectById(session.subjectId)
  return subj?.days?.[session.day - 1] ?? null
}

export const totalSessions = sessions.length
export const totalSubjects = sessions.reduce((set, s) => set.add(s.subjectId), new Set()).size
