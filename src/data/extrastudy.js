// 과목 마지막 날 "추가 학습 — 더 해보기" — 복습 퀴즈와 함께 항상 노출 (대표 지시 2026-07-17).
// challenges: 수업 내용을 한 단계 확장하는 도전 과제, links: 검증된 심화 자료(공식 문서·운영 학습사이트).
export const extraStudy = {
  git: {
    challenges: [
      '개인 리포를 만들어 feature 브랜치 → main PR 병합 흐름을 혼자서 한 바퀴 돌려 본다 (커밋 3개 이상).',
      '두 브랜치에서 같은 줄을 일부러 다르게 고쳐 충돌(conflict)을 만들고, 직접 해결해 병합한다.',
      '.gitignore를 작성해 node_modules·.env가 커밋되지 않는 것을 확인한다 — 이미 추적 중인 파일 제외 방법(git rm --cached)까지.',
    ],
    links: [
      { t: 'Learn Git Branching (한국어, 게임처럼 브랜치 연습)', u: 'https://learngitbranching.js.org/?locale=ko' },
      { t: 'Pro Git 책 (공식, 한국어판 무료)', u: 'https://git-scm.com/book/ko/v2' },
    ],
  },
  htmlcss: {
    challenges: [
      '종합실습(중고차 목록 관리)의 완성본에 localStorage 저장을 직접 추가해 새로고침에도 데이터가 남게 개선해 본다.',
      'TodoList 실습을 Emmet만 사용해 5분 안에 뼈대부터 다시 만들어 본다.',
      'CodePen에서 마음에 드는 카드 UI 하나를 골라 안 보고 재현한 뒤, 원본과 비교해 차이를 분석한다.',
    ],
    links: [
      { t: '모던 자바스크립트 Deep Dive 소스 (poiemaweb)', u: 'https://poiemaweb.com/' },
      { t: 'CodePen — 다른 사람 컴포넌트 뜯어보기', u: 'https://codepen.io/' },
    ],
  },
  vue: {
    challenges: [
      'HTML/CSS 과목에서 만든 TodoList를 Vue 컴포넌트(App > TodoInput + TodoList)로 다시 만든다.',
      'props로 데이터를 내리고 emit으로 이벤트를 올리는 부모-자식 통신을 직접 구현해 본다.',
      'vue-router로 목록/상세 2페이지를 만들어 URL 파라미터로 항목을 조회한다.',
    ],
    links: [
      { t: 'Vue.js 공식 문서 (한국어)', u: 'https://ko.vuejs.org/' },
      { t: '수업 공식 소스 — skala-vue (강병호 강사)', u: 'https://github.com/kbh73/skala-vue' },
    ],
  },
  webproject: {
    challenges: [
      '본인이 만들고 싶은 서비스 하나를 골라 핵심 화면 3개를 손그림/피그마로 설계해 본다.',
      '그 서비스에 필요한 REST API 3개를 "메서드 + 경로 + 요청/응답 JSON" 형식으로 명세한다.',
      '설계한 화면 1개를 HTML/CSS로 실제 코딩해 설계와 구현의 간극을 체험한다.',
    ],
    links: [
      { t: 'Figma (무료 와이어프레임 도구)', u: 'https://www.figma.com/' },
      { t: '부트캠프 학습 사이트 (드림아이티비즈)', u: 'https://bootcamp.dreamitbiz.com/' },
    ],
  },
  python: {
    challenges: [
      'Practice 3의 Pandas 풀이 전체를 Polars Lazy API로만 다시 작성하고 timeit으로 몇 배 빠른지 실측한다.',
      'sales_100k.csv의 region 결측 1만 건을 ① 제거 ② "미상"으로 대체 — 두 전략의 집계 결과 차이를 비교 분석한다.',
      '종합실습 2 파이프라인에 RandomForest 외 모델(LinearRegression·GradientBoosting)을 추가해 성능표를 만든다.',
    ],
    links: [
      { t: '파이썬 학습 사이트 (드림아이티비즈)', u: 'https://python-study.dreamitbiz.com/' },
      { t: '통계 학습 사이트 — 기초통계 과목 대비', u: 'https://statistics.dreamitbiz.com/' },
      { t: 'Pandas 공식 사용자 가이드', u: 'https://pandas.pydata.org/docs/user_guide/' },
    ],
  },
  prompt: {
    challenges: [
      '임원 보고서 압축 프롬프트(결론1+포인트5+리스크3+액션3)를 자신의 전공/경험 문서에 적용해 본다.',
      '같은 질문을 temperature 0.2 / 0.7 / 1.2로 세 번 보내 답변 차이를 표로 정리한다 (API 또는 플레이그라운드).',
      '[자료 시작]~[자료 끝] + "없으면 확인 필요" 패턴으로 할루시네이션이 실제로 차단되는지 실험한다.',
    ],
    links: [
      { t: 'OpenAI Cookbook (프롬프트 실전 예제)', u: 'https://cookbook.openai.com/' },
      { t: 'Anthropic 프롬프트 엔지니어링 가이드', u: 'https://docs.anthropic.com/' },
    ],
  },
  transformer: {
    challenges: [
      'The Illustrated Transformer를 읽고 Self-Attention 계산 흐름을 손으로 한 번 따라 그려 본다.',
      '한국어 문장 하나를 GPT·BERT 계열 토크나이저로 각각 토큰화해 분절 차이를 비교한다.',
      '문장 5개를 임베딩해 코사인 유사도 행렬을 만들고, 직관과 일치하는지 확인한다.',
    ],
    links: [
      { t: 'The Illustrated Transformer (시각 설명의 고전)', u: 'https://jalammar.github.io/illustrated-transformer/' },
      { t: 'Hugging Face 무료 코스', u: 'https://huggingface.co/learn' },
    ],
  },
  sllm: {
    challenges: [
      'Hugging Face PEFT 문서의 LoRA 튜토리얼을 소형 모델로 끝까지 재현해 본다.',
      '같은 모델의 양자화 전/후(예: 4bit) 답변 품질과 메모리 사용량을 비교표로 만든다.',
      '"프롬프트로 해결 vs 파인튜닝 필요"의 판단 기준을 자기 언어로 5줄 정리한다.',
    ],
    links: [
      { t: 'Hugging Face PEFT (LoRA 공식 문서)', u: 'https://huggingface.co/docs/peft' },
      { t: 'Hugging Face 무료 코스', u: 'https://huggingface.co/learn' },
    ],
  },
  vectordb: {
    challenges: [
      '자기 관심 분야 문서 100개(뉴스·논문 초록 등)를 임베딩해 코사인 유사도 검색기를 만들어 본다.',
      'chunk 크기(200/500/1000자)를 바꿔 같은 질문의 검색 품질이 어떻게 달라지는지 실험한다.',
      '메타데이터 필터(날짜·카테고리)를 걸어 검색 결과가 좁혀지는 것을 확인한다.',
    ],
    links: [
      { t: 'Chroma 공식 문서 (가장 가벼운 벡터 DB)', u: 'https://docs.trychroma.com/' },
      { t: 'FAISS (Meta 벡터 검색 라이브러리)', u: 'https://github.com/facebookresearch/faiss' },
    ],
  },
  langchain: {
    challenges: [
      '수업 체인에 대화 메모리를 붙여 이전 질문을 기억하는 챗봇으로 확장한다.',
      '계산기·검색 등 도구 2개를 가진 미니 에이전트를 만들어 도구 선택 로그를 관찰한다.',
      '기존 체인 하나를 LCEL(파이프 연산자) 스타일로 재작성해 가독성을 비교한다.',
    ],
    links: [
      { t: 'LangChain 공식 문서', u: 'https://python.langchain.com/' },
    ],
  },
  'spring-ai': {
    challenges: [
      'SpringBoot REST API에 Spring AI 챗 엔드포인트(/api/chat)를 추가해 본다.',
      '프롬프트 템플릿을 코드 밖(리소스 파일)으로 분리해 재배포 없이 문구를 바꿔 본다.',
      '스트리밍 응답(SSE)으로 토큰이 실시간 출력되게 개선한다.',
    ],
    links: [
      { t: 'Spring AI 공식 프로젝트', u: 'https://spring.io/projects/spring-ai' },
      { t: '자바 학습 사이트 (드림아이티비즈)', u: 'https://java-study.dreamitbiz.com/' },
    ],
  },
  'ml-dl': {
    challenges: [
      '타이타닉 데이터로 전처리→학습→평가 분류 파이프라인을 처음부터 혼자 구축한다.',
      '일부러 과적합을 만든 뒤(깊은 트리) 규제·가지치기로 잡아 학습/검증 곡선 변화를 관찰한다.',
      '단일 홀드아웃 vs 5-fold 교차검증의 성능 추정 차이를 비교한다.',
    ],
    links: [
      { t: 'scikit-learn 공식 튜토리얼', u: 'https://scikit-learn.org/stable/tutorial/' },
      { t: '통계 학습 사이트 (드림아이티비즈)', u: 'https://statistics.dreamitbiz.com/' },
    ],
  },
  feature: {
    challenges: [
      'sales_100k의 order_date에서 파생변수 5개(요일·월·분기·주말여부·월초/말)를 만들어 모델 성능 변화를 본다.',
      '범주 인코딩 3종(원핫·라벨·빈도)을 같은 데이터에 적용해 장단점을 표로 정리한다.',
      '데이터 누수(leakage)를 일부러 만들어 성능이 비정상적으로 좋아지는 것을 재현하고 원인을 설명한다.',
    ],
    links: [
      { t: 'Kaggle Learn — Feature Engineering (무료 실습)', u: 'https://www.kaggle.com/learn' },
    ],
  },
  modeldev: {
    challenges: [
      '같은 모델을 GridSearchCV vs RandomizedSearchCV로 튜닝해 시간 대비 성능을 비교한다.',
      '완성 모델의 "모델 카드"(용도·데이터·성능·한계)를 1페이지로 작성해 본다.',
      '모델 3개의 성능·학습시간·해석가능성을 트레이드오프 표로 만들어 선택 근거를 설명한다.',
    ],
    links: [
      { t: 'scikit-learn 하이퍼파라미터 튜닝 가이드', u: 'https://scikit-learn.org/stable/modules/grid_search.html' },
    ],
  },
  serving: {
    challenges: [
      '학습한 모델(joblib)을 FastAPI 엔드포인트로 감싸 curl로 예측을 받아 본다.',
      '그 API를 Dockerfile로 컨테이너화해 로컬에서 이미지 빌드→실행까지 완주한다.',
      '동일 요청을 100번 반복 호출해 평균 응답시간을 재고 병목 지점을 추정해 본다.',
    ],
    links: [
      { t: 'FastAPI 공식 문서 (한국어 지원)', u: 'https://fastapi.tiangolo.com/ko/' },
      { t: 'AWS 자격증 학습 사이트 — 클라우드 배포 심화', u: 'https://aws.dreamitbiz.com/' },
    ],
  },
  rag: {
    challenges: [
      '자기 문서 10개로 미니 RAG를 만들어 "문서에 있는 질문 vs 없는 질문"의 답변 차이를 확인한다.',
      'chunk 크기와 top_k를 바꿔가며 답변 품질 실험표를 만든다 (최소 4조합).',
      '답변에 출처(어느 문서 몇 번째 청크)가 표시되도록 인용 기능을 붙인다.',
    ],
    links: [
      { t: 'LangChain RAG 튜토리얼', u: 'https://python.langchain.com/' },
    ],
  },
  agent: {
    challenges: [
      '도구 2개(계산·검색)를 가진 에이전트를 만들고 ReAct 로그에서 "생각→행동→관찰" 흐름을 추적한다.',
      '에이전트가 실패하는 입력을 3개 찾아내고, 가드레일(입력 검증·재시도)을 추가해 방어한다.',
      '멀티 에이전트(작성자+검토자) 구조로 확장해 단일 에이전트와 결과 품질을 비교한다.',
    ],
    links: [
      { t: 'LangGraph 공식 문서', u: 'https://langchain-ai.github.io/langgraph/' },
      { t: 'AI 에이전트 완주 학습 사이트 (드림아이티비즈)', u: 'https://ai-agents.dreamitbiz.com/' },
    ],
  },
  capstone: {
    challenges: [
      '팀 프로젝트 아이디어를 "문제→대상 사용자→핵심 기능 3개→기술 스택" 1페이지로 기획해 본다.',
      '후보 기술 스택 2안을 학습곡선·성능·팀 역량 기준으로 비교표를 만들어 결정 근거를 남긴다.',
      '프로젝트 리스크 5개와 각각의 완화 방안을 미리 목록화한다 (일정·기술·데이터·협업·발표).',
    ],
    links: [
      { t: '부트캠프 학습 사이트 (드림아이티비즈)', u: 'https://bootcamp.dreamitbiz.com/' },
    ],
  },
  miniproject: {
    challenges: [
      '이번 분석을 "질문→데이터→방법→발견→한계" 구조의 1페이지 리포트로 재정리한다.',
      '만든 차트 중 하나를 골라 제목·축·강조색을 개선해 전달력 전/후를 비교한다.',
      '분석 저장소를 다른 사람이 clone 후 5분 안에 재현할 수 있게 README와 requirements를 정비한다.',
    ],
    links: [
      { t: '데이터 분석 실습 사이트 (드림아이티비즈)', u: 'https://data.dreamitbiz.com/' },
    ],
  },
}

export const extraStudyFor = (id) => extraStudy[id] || null

// transformer2(2반·임성열) — 도전과제·심화링크는 transformer와 공유 (2026-07-23 분리 시).
extraStudy['transformer2'] = extraStudy['transformer']
