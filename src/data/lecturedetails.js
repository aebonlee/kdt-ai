// 날짜별 강의안 심화 보강 — subjectId-day 키.
// 8시간 분량을 위해 상세 학습내용(topics) · 추가 실습(labs) · 과제(homework)를 제공.
//   topics:   [{ h, items[] }]      세부 학습 항목
//   labs:     [{ title, steps[] }]  추가 실습(메인 실습 외)
//   homework: [string]              과제

export const details = {
  // ── Prompt 설계와 Context Engineering ──
  'prompt-1': {
    topics: [
      { h: 'LLM 동작 원리', items: ['토큰화와 확률적 다음-토큰 예측', '디코딩 파라미터(temperature·top_p·max_tokens)', 'System/User/Assistant 역할 분리', '컨텍스트 윈도우와 토큰 비용 산정'] },
      { h: '프롬프트 패턴', items: ['역할·지시·예시·제약 4요소', 'Zero/One/Few-shot 비교', 'Chain-of-Thought·Self-Consistency', '출력 형식 강제(JSON·표·스키마)'] },
      { h: 'Context Engineering', items: ['문서 주입·요약·압축 전략', '동적 프롬프트(템플릿+변수)', '프롬프트 인젝션·탈옥 방어', '환각 원인과 완화(근거·RAG)'] },
    ],
    labs: [
      { title: 'Lab1. 출력 형식 강제', steps: ['자유형 응답을 JSON 스키마로 고정', '파싱 실패 시 재요청 로직', '5개 입력으로 안정성 검증'] },
      { title: 'Lab2. CoT 효과 측정', steps: ['추론 문제 10개 선정', 'CoT 유무로 정답률 비교', '오답 패턴 분석·프롬프트 개선'] },
    ],
    homework: ['본인 업무 프롬프트 3종을 템플릿(변수 포함)으로 정리', '같은 과제를 기법별로 비교한 평가표 제출'],
  },

  // ── Vue.js ──
  'vue-1': {
    topics: [
      { h: '프로젝트 구성', items: ['Vite 스캐폴딩·디렉터리 구조', 'SFC(template/script/style)', 'script setup 문법', '개발 서버·HMR'] },
      { h: '반응형 핵심', items: ['ref / reactive 차이와 .value', 'Proxy 기반 의존성 추적', 'computed 캐싱 vs 메서드', 'watch / watchEffect'] },
      { h: '템플릿 문법', items: ['보간·디렉티브(v-if/for/bind/on)', 'v-model 양방향', '리스트 key 와 재사용', '이벤트 수식어'] },
    ],
    labs: [
      { title: 'Lab1. 카운터·온도 변환기', steps: ['ref 상태와 이벤트 핸들러', 'computed 로 파생값(℃↔℉)', '입력 유효성 처리'] },
      { title: 'Lab2. 실시간 검색 필터', steps: ['목록 데이터 준비', 'computed 로 필터링', '하이라이트 표시'] },
    ],
    homework: ['Todo 앱에 필터(전체/완료/미완료) 추가', 'computed·watch 차이를 코드로 정리'],
  },
  'vue-2': {
    topics: [
      { h: '컴포넌트 통신', items: ['props 정의·검증·기본값', 'emit 커스텀 이벤트', 'v-model 컴포넌트 적용', 'provide/inject(심화)'] },
      { h: '슬롯·합성', items: ['기본/이름/스코프 슬롯', '컨테이너-프레젠테이션 분리', 'composable(use~)로 로직 추출'] },
      { h: '라이프사이클', items: ['onMounted/onUnmounted', '비동기 데이터 패칭 시점', '정리(clean-up) 처리'] },
    ],
    labs: [
      { title: 'Lab1. 재사용 리스트', steps: ['List/Item 컴포넌트 분리', 'props/emit 연결', '슬롯으로 행 커스터마이즈'] },
      { title: 'Lab2. useToggle composable', steps: ['상태+토글 함수 추출', '여러 컴포넌트에서 재사용', '초기값 인자화'] },
    ],
    homework: ['모달 컴포넌트를 슬롯+emit 으로 구현', '공통 로직 1개를 composable 로 분리'],
  },
  'vue-3': {
    topics: [
      { h: 'Vue Router', items: ['라우트 정의·history 모드', '동적/중첩/이름 라우트', 'router-link / programmatic 이동', 'lazy 로딩'] },
      { h: '네비게이션 가드', items: ['beforeEach 전역 가드', 'meta.requiresAuth 패턴', '리다이렉트·쿼리 보존'] },
      { h: 'Pinia 상태관리', items: ['store 정의(state/getters/actions)', '컴포넌트 연동', '비동기 액션', '스토어 모듈화'] },
    ],
    labs: [
      { title: 'Lab1. 목록-상세 라우팅', steps: ['/list, /detail/:id 구성', 'params 로 상세 조회', '뒤로가기 동작 확인'] },
      { title: 'Lab2. 인증 가드', steps: ['로그인 상태 스토어', 'beforeEach 로 보호', '미인증 시 /login 리다이렉트'] },
    ],
    homework: ['Pinia 스토어로 목록 CRUD 액션 구현', '보호 라우트 1개에 가드 적용'],
  },
  'vue-4': {
    topics: [
      { h: 'API 연동', items: ['fetch/axios, async/await', '로딩·에러·빈 상태 처리', 'AbortController 취소', '재시도·타임아웃'] },
      { h: '폼·유효성', items: ['폼 바인딩·검증 규칙', '제출 흐름·중복 제출 방지', '에러 메시지 UX'] },
      { h: '빌드·배포', items: ['환경변수(VITE_) 관리', 'Vite 빌드·코드분할', '정적 호스팅+SPA 폴백'] },
    ],
    labs: [
      { title: 'Lab1. useFetch 도입', steps: ['composable 로 패칭 추출', '목록·상세에 적용', '에러/로딩 UI'] },
      { title: 'Lab2. 배포', steps: ['환경변수로 API 베이스 분리', 'npm run build', '정적 호스팅 배포·동작 확인'] },
    ],
    homework: ['미니 SPA(목록·상세·폼)를 API와 통합 완성', '배포 URL 제출'],
  },

  // ── sLLM ──
  'sllm-1': {
    topics: [
      { h: 'sLLM 생태계', items: ['Llama·Qwen·Gemma 계열', '라이선스·상업적 사용', '모델 크기 vs 성능 트레이드오프', '벤치마크 읽는 법'] },
      { h: '경량화', items: ['양자화(GPTQ·AWQ·NF4)', 'KV 캐시·메모리 산정', 'CPU/GPU 요구사항'] },
      { h: '로컬 서빙', items: ['ollama / vLLM / TGI', 'OpenAI 호환 API', '동시성·배치·스트리밍'] },
    ],
    labs: [
      { title: 'Lab1. 모델 2종 비교', steps: ['동일 프롬프트 실행', '품질·속도·메모리 측정', '용도별 선정 근거'] },
      { title: 'Lab2. 로컬 추론 API', steps: ['ollama 서버 기동', 'OpenAI 호환 호출', '파라미터 실험(temperature)'] },
    ],
    homework: ['양자화 수준별 메모리·속도 비교표 작성', '과제용 도메인에 맞는 모델 선정 리포트'],
  },
  'sllm-2': {
    topics: [
      { h: '데이터셋', items: ['instruction 포맷 설계', 'chat template 적용', '데이터 정제·중복 제거', '학습/검증 분할'] },
      { h: 'LoRA 학습', items: ['rank·alpha·target_modules', 'QLoRA(4bit)·메모리 절감', '학습률·에폭·배치', '손실 모니터링'] },
      { h: '평가·배포', items: ['정성·정량 평가', '어댑터 병합/로드', '추론 서빙 적용'] },
    ],
    labs: [
      { title: 'Lab1. 데이터셋 구축', steps: ['도메인 instruction 50~200건', '포맷 검증', '품질 점검'] },
      { title: 'Lab2. LoRA 파인튜닝', steps: ['LoRA 설정·학습 실행', '학습 전/후 응답 비교', '어댑터 저장·추론'] },
    ],
    homework: ['파인튜닝 전/후 비교 리포트', '하이퍼파라미터 1개를 바꿔 영향 분석'],
  },

  // ── ML/DL ──
  'ml-dl-1': {
    topics: [
      { h: '학습 유형', items: ['지도/비지도/강화', '회귀 vs 분류', '문제→모델 매핑'] },
      { h: '데이터 다루기', items: ['전처리·스케일링·인코딩', '훈련/검증/테스트 분할', '데이터 누수 방지'] },
      { h: '평가', items: ['혼동행렬·정밀도/재현율/F1', 'ROC-AUC', '교차검증·그리드서치'] },
    ],
    labs: [
      { title: 'Lab1. 분류 파이프라인', steps: ['데이터 로드·전처리', '모델 2~3종 학습', '지표 비교'] },
      { title: 'Lab2. 누수 점검', steps: ['스케일러를 파이프라인에 포함', 'CV 점수 비교', '누수 영향 확인'] },
    ],
    homework: ['공개 데이터셋으로 분류 모델 노트북 제출', '평가지표 선택 근거 작성'],
  },
  'ml-dl-2': {
    topics: [
      { h: '신경망 구조', items: ['퍼셉트론→MLP', '활성화 함수 선택', '가중치 초기화'] },
      { h: '학습 메커니즘', items: ['순전파/역전파', '손실 함수', '옵티마이저(SGD/Adam)', '학습률 스케줄'] },
      { h: 'PyTorch', items: ['텐서·autograd', 'Dataset/DataLoader', '학습 루프 작성', 'GPU 이동'] },
    ],
    labs: [
      { title: 'Lab1. MLP 분류기', steps: ['모델 정의', '학습 루프 구현', '검증 정확도 추적'] },
      { title: 'Lab2. 조기종료', steps: ['검증 손실 모니터링', 'patience 적용', '최적 체크포인트 저장'] },
    ],
    homework: ['학습 곡선(train/val) 그래프 포함 제출', '옵티마이저 2종 수렴 비교'],
  },
  'ml-dl-3': {
    topics: [
      { h: '아키텍처', items: ['CNN(합성곱·풀링)', 'RNN/LSTM', 'Transformer·Attention 직관'] },
      { h: '전이학습', items: ['사전학습 모델 로드', '특징 추출 vs 미세조정', '레이어 동결'] },
      { h: '일반화', items: ['드롭아웃·정규화', '데이터 증강', '하이퍼파라미터 탐색'] },
    ],
    labs: [
      { title: 'Lab1. 전이학습', steps: ['사전학습 모델 불러오기', '분류층 교체·학습', '베이스라인 대비 비교'] },
      { title: 'Lab2. 증강 효과', steps: ['증강 적용/미적용 비교', '과적합 변화 관찰', '결과 정리'] },
    ],
    homework: ['전이학습 개선 리포트(개선 요인 분석)', 'Attention 수식을 직접 설명'],
  },

  // ── RAG ──
  'rag-1': {
    topics: [
      { h: 'RAG 파이프라인', items: ['적재→청킹→임베딩→색인→검색→생성', 'RAG vs 파인튜닝', '아키텍처 패턴'] },
      { h: '문서 처리', items: ['로더(PDF/HTML/MD)', '청킹 전략·오버랩', '메타데이터 설계'] },
      { h: '임베딩·색인', items: ['임베딩 모델 선택', '벡터 인덱스(HNSW/IVF)', '유사도 척도'] },
    ],
    labs: [
      { title: 'Lab1. 인덱싱 파이프라인', steps: ['문서 로드·청킹', '임베딩·벡터DB 저장', '검색 결과 점검'] },
      { title: 'Lab2. 청킹 비교', steps: ['청크 크기 2종', '검색 품질 비교', '최적값 선택'] },
    ],
    homework: ['자료 셋으로 검색 가능한 인덱스 구축', '청킹 파라미터 영향 정리'],
  },
  'rag-3': {
    topics: [
      { h: '평가', items: ['충실도·관련성·문맥 지표', 'RAGAS 자동 평가', '평가셋 구성'] },
      { h: '검색 고도화', items: ['하이브리드(BM25+벡터)', '재순위(cross-encoder)', '멀티쿼리·HyDE'] },
      { h: '운영', items: ['비용·지연·캐싱', '실패 분석(검색 vs 생성)', '모니터링'] },
    ],
    labs: [
      { title: 'Lab1. 평가셋·측정', steps: ['질문-정답 셋 작성', '베이스라인 측정', '병목 진단'] },
      { title: 'Lab2. 재순위 적용', steps: ['후보 회수 확대', 'cross-encoder 재정렬', '개선 전/후 비교'] },
    ],
    homework: ['RAG 개선 전/후 지표 리포트', '하이브리드 검색 적용 결과 분석'],
  },

  // ── LangChain ──
  'langchain-1': {
    topics: [
      { h: '구성요소', items: ['모델·프롬프트·파서', '메시지 타입', '생태계 개요'] },
      { h: 'LCEL', items: ['| 파이프 체인', '입출력 스키마', 'stream/batch/invoke'] },
      { h: '구조화 출력', items: ['JsonOutputParser', 'Pydantic 파서', '검증·재시도'] },
    ],
    labs: [
      { title: 'Lab1. 첫 체인', steps: ['프롬프트→모델→파서', 'JSON 출력', '입력 변수화'] },
      { title: 'Lab2. 폴백', steps: ['대체 모델 지정', 'with_retry 적용', '장애 시뮬레이션'] },
    ],
    homework: ['감성분석 체인(JSON 출력) 구현', '폴백·재시도 적용'],
  },
  'langchain-2': {
    topics: [
      { h: '메모리', items: ['대화 히스토리', '윈도우·요약 메모리', '세션 분리'] },
      { h: '도구·검색', items: ['Tool 정의·바인딩', 'Retriever 결합', '문서 QA'] },
      { h: '라우팅', items: ['조건 분기', '의도 분류', '멀티스텝 체인'] },
    ],
    labs: [
      { title: 'Lab1. 문서 QA 챗봇', steps: ['Retriever 구성', '메모리로 멀티턴', '출처 표기'] },
      { title: 'Lab2. 도구 연동', steps: ['검색 도구 정의', '체인에 결합', '동작 확인'] },
    ],
    homework: ['멀티턴 문서 QA 챗봇 완성', '라우팅으로 의도별 분기 추가'],
  },
  'langchain-3': {
    topics: [
      { h: '스트리밍', items: ['토큰 스트리밍', '콜백 핸들러', 'UI 연동'] },
      { h: '관측·안정성', items: ['LangSmith 추적', '비용·캐싱', '가드레일'] },
      { h: '서비스화', items: ['FastAPI 노출', '환경변수·배포', '에러 처리'] },
    ],
    labs: [
      { title: 'Lab1. 스트리밍 API', steps: ['chain.stream', 'StreamingResponse', '프론트 표시'] },
      { title: 'Lab2. 관측 적용', steps: ['LangSmith 환경설정', '체인 추적', '지연·비용 확인'] },
    ],
    homework: ['미니 생성형 AI 서비스(API+UI) 배포', '비용·에러 처리 추가'],
  },

  // ── 모델 서빙/AIOps ──
  'serving-1': {
    topics: [
      { h: '서빙 설계', items: ['온라인/배치/스트림', '동기 vs 비동기', 'SLA(지연·처리량)'] },
      { h: '추론 API', items: ['FastAPI/BentoML', '입력 검증(Pydantic)', '전/후처리'] },
      { h: '성능', items: ['배치 추론', '모델 워밍업', '지연 측정'] },
    ],
    labs: [
      { title: 'Lab1. 추론 API', steps: ['모델 로드', '/predict 구현', '검증·테스트'] },
      { title: 'Lab2. 배치 처리', steps: ['배치 엔드포인트', '처리량 비교', '병목 확인'] },
    ],
    homework: ['추론 REST API 구현·문서화', '단건 vs 배치 처리량 측정'],
  },
  'serving-2': {
    topics: [
      { h: '컨테이너화', items: ['Dockerfile 작성', '레이어 캐시', '이미지 경량화'] },
      { h: '확장·배포', items: ['오토스케일링', '헬스체크(live/ready)', '무중단 배포'] },
      { h: '모니터링', items: ['메트릭·로그·트레이스', '드리프트 감지', '알림'] },
    ],
    labs: [
      { title: 'Lab1. 컨테이너 배포', steps: ['Dockerfile 작성', '빌드·실행', '호출 확인'] },
      { title: 'Lab2. 모니터링', steps: ['헬스체크 추가', '기본 메트릭 수집', '로그 확인'] },
    ],
    homework: ['추론 API 컨테이너화·실행', '드리프트 감지 코드 작성'],
  },
  'serving-3': {
    topics: [
      { h: 'MLOps', items: ['파이프라인·실험관리', '모델 레지스트리', '재현성'] },
      { h: 'CI/CD', items: ['빌드·테스트·배포 자동화', '카나리/블루그린', '롤백'] },
      { h: 'AIOps', items: ['이상탐지', '자동 대응', '운영 대시보드'] },
    ],
    labs: [
      { title: 'Lab1. CI 파이프라인', steps: ['테스트 자동화', '이미지 빌드', '아티팩트 푸시'] },
      { title: 'Lab2. 배포 자동화', steps: ['배포 단계 추가', '롤백 시나리오', '검증'] },
    ],
    homework: ['Actions 로 빌드→배포 파이프라인 구성', '롤백 전략 문서화'],
  },

  // ── AI Agent (LangGraph) ──
  'agent-1': {
    topics: [
      { h: '에이전트 개념', items: ['워크플로 vs 에이전트', 'ReAct 패턴', '자율 추론·도구 사용'] },
      { h: 'LangGraph', items: ['그래프·노드·엣지·State', '조건부 엣지(루프)', '체크포인트'] },
      { h: '도구', items: ['@tool 정의', '도구 바인딩', '최대 스텝 제한'] },
    ],
    labs: [
      { title: 'Lab1. 단일 에이전트', steps: ['State 정의', '도구 2개 바인딩', 'ReAct 루프'] },
      { title: 'Lab2. 분기 제어', steps: ['조건부 엣지', '도구 반복', '종료 조건'] },
    ],
    homework: ['도구를 쓰는 에이전트 구현·시연', '무한루프 방지 로직 추가'],
  },
  'agent-2': {
    topics: [
      { h: '멀티 에이전트', items: ['Supervisor 패턴', '역할 분담', '서브그래프'] },
      { h: 'HITL', items: ['승인·중단·재개', '상태 영속화', '사람 개입 지점'] },
      { h: '안정화', items: ['에러 복구·재시도', '관측·평가', '비용 통제'] },
    ],
    labs: [
      { title: 'Lab1. 멀티 에이전트', steps: ['플래너/워커 정의', '서브그래프 분배', '엔드투엔드'] },
      { title: 'Lab2. HITL', steps: ['승인 노드 추가', '중단/재개', '동작 확인'] },
    ],
    homework: ['멀티 에이전트 워크플로 구현', 'HITL 승인 흐름 추가'],
  },

  // ── Vector DB ──
  'vectordb-1': {
    topics: [
      { h: '원리', items: ['임베딩·벡터 공간', '유사도(코사인/내적/L2)', '차원·정규화'] },
      { h: '인덱싱', items: ['HNSW(m/ef)', 'IVF', '정확도-속도 트레이드오프'] },
      { h: '활용', items: ['pgvector/Chroma/FAISS/Pinecone', '메타데이터 필터', '하이브리드 검색'] },
    ],
    labs: [
      { title: 'Lab1. 임베딩 검색', steps: ['문서 임베딩', '벡터DB 저장', 'top-k 검색'] },
      { title: 'Lab2. 필터·튜닝', steps: ['메타데이터 필터', 'ef 조절', '재현율 비교'] },
    ],
    homework: ['Vector DB 1종으로 검색 구현', 'HNSW 파라미터 영향 정리'],
  },

  // ── Capstone ──
  'capstone-1': {
    topics: [
      { h: '문제 정의', items: ['사용자·문제·가치', '범위 설정', '성공 기준'] },
      { h: '설계', items: ['아키텍처 다이어그램', 'API 계약', '데이터·도구 선정'] },
      { h: '계획', items: ['WBS·역할 분담', '마일스톤', '리스크'] },
    ],
    labs: [
      { title: 'Lab1. 설계 워크숍', steps: ['아키텍처 도식화', 'API 계약 합의', '데이터 흐름 정의'] },
    ],
    homework: ['캡스톤 설계서 + 아키텍처 도식 제출'],
  },
  'capstone-2': {
    topics: [
      { h: '구현 전략', items: ['수직 슬라이스 우선', '통합 우선', '데모 가능 상태 유지'] },
      { h: '핵심 기능', items: ['에이전트·도구', 'RAG·외부 API', 'UI 통합'] },
      { h: '품질', items: ['로깅·관측', '에러 처리', '중간 점검'] },
    ],
    labs: [
      { title: 'Lab1. MVP 통합', steps: ['핵심 기능 연결', '엔드투엔드 동작', '데모 준비'] },
    ],
    homework: ['동작하는 MVP 데모 준비'],
  },
  'capstone-3': {
    topics: [
      { h: '완성', items: ['엔드투엔드 통합', '버그 수정', '성능·한계 점검'] },
      { h: '발표', items: ['스토리(문제→해결→데모)', '리허설', '백업'] },
      { h: '마무리', items: ['회고(KPT)', 'README·재현성', '포트폴리오'] },
    ],
    labs: [
      { title: 'Lab1. 시연 리허설', steps: ['시나리오 스크립트', '스모크 테스트', '백업 영상'] },
    ],
    homework: ['최종 발표·데모', '회고 문서·README 제출'],
  },

  // ── Mini-project ──
  'miniproject-1': {
    topics: [
      { h: '기획', items: ['주제·요구사항', '우선순위(MoSCoW)', '성공 기준'] },
      { h: '설계', items: ['아키텍처', '계약 우선 API', '데이터 플로우'] },
      { h: '셋업', items: ['레포·골격', 'CI 기본', '환경변수'] },
    ],
    labs: [{ title: 'Lab1. 킥오프', steps: ['요구사항 정의', '아키텍처 스케치', '레포 셋업'] }],
    homework: ['기획서+설계도+초기 레포 제출'],
  },
  'miniproject-2': {
    topics: [
      { h: '핵심 구현', items: ['LLM/RAG/Agent 기능', 'API·UI 통합', '예외 처리'] },
      { h: '안정화', items: ['캐싱', '로깅', '입력 검증'] },
      { h: '점검', items: ['중간 시연', '피드백 반영', '백로그 갱신'] },
    ],
    labs: [{ title: 'Lab1. 기능 통합', steps: ['핵심 기능 구현', 'API 연결', '중간 시연'] }],
    homework: ['동작하는 MVP 제출'],
  },
  'miniproject-3': {
    topics: [
      { h: '테스트', items: ['핵심 시나리오', '엣지 케이스', '부하·스모크'] },
      { h: '배포', items: ['환경 구성', '시크릿 분리', '롤백'] },
      { h: '발표', items: ['데모 시나리오', '결과·지표', '회고'] },
    ],
    labs: [{ title: 'Lab1. 배포·시연', steps: ['배포 환경 구성', '스모크 테스트', '발표 리허설'] }],
    homework: ['배포 URL + 발표자료 제출'],
  },

  // ── 참고용 (Spring AI) ──
  'spring-ai-1': {
    topics: [
      { h: '환경', items: ['Spring Boot 셋업', 'Spring AI 의존성', 'API 키 구성'] },
      { h: 'ChatClient', items: ['ChatModel/ChatClient', '프로바이더 연동', '옵션 설정'] },
      { h: '프롬프트', items: ['PromptTemplate', '메시지 역할', '스트리밍'] },
    ],
    labs: [{ title: 'Lab1. 채팅 API', steps: ['ChatClient 구성', '/chat 엔드포인트', 'Postman 테스트'] }],
    homework: ['채팅 REST API 구현'],
  },
  'spring-ai-2': {
    topics: [
      { h: 'Embedding', items: ['EmbeddingModel', '벡터화', '차원 일치'] },
      { h: 'VectorStore', items: ['pgvector 연동', '문서 적재', '유사도 검색'] },
      { h: 'RAG', items: ['문서 처리', '컨텍스트 결합', '출처 표기'] },
    ],
    labs: [{ title: 'Lab1. 문서 QA', steps: ['문서 적재', '검색', 'RAG 응답'] }],
    homework: ['문서 기반 QA API 구현'],
  },
  'spring-ai-3': {
    topics: [
      { h: 'Function Calling', items: ['함수 정의·등록', '호출 흐름', '결과 매핑'] },
      { h: '구조화 출력', items: ['entity 매핑', '검증'] },
      { h: '보안', items: ['인젝션 방어', '키 관리'] },
    ],
    labs: [{ title: 'Lab1. 도구 연동', steps: ['함수 등록', '호출', '구조화 출력'] }],
    homework: ['Function Calling 기반 기능 구현'],
  },
}

export const detailsFor = (subjectId, day) => details[`${subjectId}-${day}`] || null
