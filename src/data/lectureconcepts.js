// 날짜별 "핵심 개념(이론)" — subjectId-day 키. { term, desc }
// 8시간 강의의 학술적 토대를 보강한다.

export const concepts = {
  // ── 데이터 분석을 위한 Python 이해 ──
  'python-1': [
    { term: '동적 타이핑', desc: '변수 선언 시 타입을 지정하지 않고 대입된 값으로 타입이 정해지는 파이썬 방식.' },
    { term: '자료구조 선택', desc: '리스트(순서·가변)·튜플(불변)·딕셔너리(키-값)·집합(중복 없음)을 용도에 맞게 선택한다.' },
    { term: '컴프리헨션', desc: '[x*2 for x in data if x>0]처럼 반복과 조건을 한 줄로. 가독성과 속도 모두 유리.' },
    { term: '벡터화', desc: '반복문 대신 NumPy 배열 단위 연산으로 일괄 처리 → 순수 파이썬 루프보다 수십 배 빠름.' },
    { term: '브로드캐스팅', desc: '모양이 다른 배열 간 연산을 자동으로 확장해 수행하는 NumPy 규칙.' },
  ],
  'python-2': [
    { term: 'DataFrame', desc: '행·열로 이루어진 2차원 표 구조. 엑셀 시트처럼 다루는 Pandas의 핵심 객체.' },
    { term: 'loc vs iloc', desc: 'loc는 라벨(이름) 기반, iloc는 정수 위치 기반 인덱싱.' },
    { term: '결측치(NaN)', desc: '비어 있는 값. dropna로 제거하거나 fillna로 대체하며 분석 전 반드시 처리한다.' },
    { term: 'groupby', desc: '분할-적용-결합. 범주별로 묶어 평균·합계 등 집계를 산출한다.' },
    { term: 'merge', desc: '공통 키를 기준으로 두 표를 SQL JOIN처럼 결합한다.' },
    { term: 'EDA', desc: '탐색적 데이터 분석. 통계와 시각화로 분포·관계·이상치를 파악하는 과정.' },
  ],

  // ── 웹 서비스 개발 mini-Project ──
  'webproject-1': [
    { term: '요구사항 정의', desc: '무엇을 만들지 기능 단위로 명세. 범위(scope) 합의가 프로젝트 성패를 좌우한다.' },
    { term: '사용자 시나리오', desc: '사용자가 목표를 이루는 단계별 흐름. 화면·기능 도출의 기준이 된다.' },
    { term: '와이어프레임', desc: '화면 구조를 선·박스로 단순하게 그린 설계도(저충실도 시안).' },
    { term: '데이터 모델', desc: '저장할 엔티티와 관계 정의. API·DB 설계의 토대.' },
    { term: 'MVP', desc: '최소 기능 제품. 핵심 가치만 먼저 구현해 빠르게 검증한다.' },
  ],
  'webproject-2': [
    { term: '컴포넌트화', desc: 'UI를 재사용 가능한 단위로 분리해 조립. 유지보수·협업에 유리.' },
    { term: '상태 관리', desc: '화면이 보여줄 데이터의 단일 출처(source of truth)를 두고 관리한다.' },
    { term: '비동기 처리', desc: 'API 호출의 로딩·성공·에러 상태를 명시적으로 다루는 흐름.' },
    { term: '유효성 검사', desc: '사용자 입력을 제출 전 검증해 잘못된 데이터를 막는다.' },
    { term: '관심사 분리', desc: 'UI·로직·데이터 계층을 나눠 복잡도를 관리하는 설계 원칙.' },
  ],
  'webproject-3': [
    { term: 'QA', desc: '품질 보증. 기능이 명세대로 동작하는지 점검하고 버그를 수정한다.' },
    { term: '회귀 테스트', desc: '수정이 기존 기능을 깨뜨리지 않았는지 다시 확인하는 테스트.' },
    { term: '빌드', desc: '소스를 배포용 정적 파일로 변환(번들·압축·최적화)하는 과정.' },
    { term: '환경변수', desc: 'API 키·주소 등 환경별 설정을 코드와 분리해 관리(.env).' },
    { term: '데모', desc: '핵심 사용자 흐름을 실제로 시연하며 결과를 전달하는 발표.' },
  ],

  // ── 실전 Feature Engineering ──
  'feature-1': [
    { term: '피처 엔지니어링', desc: '원시 데이터를 모델이 학습하기 좋은 변수로 가공하는 작업. 성능을 크게 좌우한다.' },
    { term: '스케일링', desc: '변수 범위를 맞추는 처리(표준화·정규화). 거리·경사 기반 모델에 특히 중요.' },
    { term: '인코딩', desc: '범주형을 수치로 변환. 원-핫·라벨·타깃 인코딩 등.' },
    { term: '타깃 인코딩', desc: '범주를 타깃 평균값으로 치환. 누수 방지를 위해 교차검증 내부에서 적용한다.' },
    { term: '차원 축소(PCA)', desc: '상관 높은 변수들을 주성분으로 압축해 과적합·연산을 줄인다.' },
    { term: '데이터 누수', desc: '학습에 미래·정답 정보가 새어들어 평가를 부풀리는 오류. 반드시 차단.' },
  ],

  // ── 모델 개발 및 최적화 ──
  'modeldev-1': [
    { term: '베이스라인', desc: '단순한 모델로 세운 기준 성능. 이후 개선 효과를 측정하는 출발점.' },
    { term: '교차검증(K-fold)', desc: '데이터를 K등분해 번갈아 검증 → 일반화 성능을 안정적으로 추정.' },
    { term: '데이터 분할', desc: 'train/valid/test 분리. test는 최종 한 번만 사용해 과대평가를 막는다.' },
    { term: '평가지표', desc: '문제에 맞는 지표 선택(분류 F1·AUC, 회귀 RMSE·MAE).' },
    { term: '파이프라인', desc: '전처리→학습→평가를 하나로 묶어 재현성을 높이고 누수를 방지.' },
  ],
  'modeldev-2': [
    { term: '하이퍼파라미터', desc: '학습 전 사람이 정하는 설정값(학습률·트리 깊이·규제 강도 등).' },
    { term: 'Grid/Random Search', desc: '격자 전수 탐색/무작위 탐색으로 최적 조합을 찾는 방법.' },
    { term: 'Bayesian 최적화', desc: '이전 시도 결과로 다음 후보를 똑똑하게 선택(Optuna 등).' },
    { term: '정규화·조기종료', desc: '규제와 조기 중단으로 과적합을 억제하는 대표 기법.' },
    { term: '앙상블', desc: '여러 모델을 결합(배깅·부스팅·스태킹)해 성능과 안정성을 높인다.' },
    { term: '모델 경량화', desc: '가지치기·양자화·지식증류로 추론 속도·크기를 최적화.' },
  ],

  'prompt-1': [
    { term: '토큰(Token)', desc: 'LLM이 텍스트를 처리하는 최소 단위. 비용·컨텍스트 한도가 모두 토큰 기준으로 계산된다.' },
    { term: 'Temperature', desc: '생성의 무작위성 조절(0=결정적). 사실형 작업은 낮게, 창의적 작업은 높게 설정.' },
    { term: 'Few-shot 프롬프팅', desc: '입력-출력 예시를 제시해 형식·패턴을 학습시키는 기법. Zero-shot 대비 안정적.' },
    { term: 'Chain-of-Thought', desc: '"단계적으로 생각하라"로 중간 추론을 유도 → 복잡한 문제 정확도 향상.' },
    { term: 'Context Window', desc: '한 번에 볼 수 있는 토큰 총량. 초과분은 잘리므로 요약·압축 전략 필요.' },
    { term: '환각(Hallucination)', desc: '사실이 아닌 그럴듯한 답. 근거 제시·RAG로 완화한다.' },
  ],
  'vue-1': [
    { term: '반응성(Reactivity)', desc: '상태가 바뀌면 DOM이 자동 갱신되는 Vue의 핵심. Proxy로 의존성을 추적한다.' },
    { term: 'ref vs reactive', desc: 'ref는 모든 값을 .value로, reactive는 객체를 깊은 반응형으로. 템플릿에선 ref 자동 언랩.' },
    { term: '가상 DOM', desc: '변경을 메모리 트리에서 비교(diff) 후 실제 DOM에 최소 패치 → 효율적 렌더.' },
    { term: '디렉티브', desc: 'v-if·v-for·v-bind·v-on·v-model 등 템플릿을 확장하는 특수 속성.' },
    { term: 'computed', desc: '의존 상태가 바뀔 때만 재계산되는 캐시된 파생 값(메서드와 차이).' },
  ],
  'vue-2': [
    { term: 'props / emit', desc: '부모→자식은 props(읽기전용), 자식→부모는 emit 이벤트. 단방향 데이터 흐름.' },
    { term: '슬롯(slot)', desc: '컴포넌트에 마크업을 주입하는 구멍. 레이아웃 재사용·합성에 활용.' },
    { term: 'Composition API', desc: 'setup()에서 로직을 함수 단위로 구성 → 재사용·타입 친화.' },
    { term: '라이프사이클', desc: 'onMounted/onUnmounted 등 생애주기 훅으로 데이터 패칭·정리 시점 제어.' },
    { term: 'composable', desc: 'use~로 시작하는 재사용 로직 함수(상태+동작). 횡단 관심사 분리.' },
  ],
  'vue-3': [
    { term: '클라이언트 라우팅', desc: '새로고침 없이 URL↔컴포넌트를 매핑하는 SPA 방식(History API).' },
    { term: '동적 라우트', desc: '/detail/:id처럼 파라미터를 받는 경로. useRoute().params로 접근.' },
    { term: '네비게이션 가드', desc: '라우트 전환 전/후 훅(beforeEach). 인증·권한 체크에 사용.' },
    { term: '전역 상태(Pinia)', desc: '여러 컴포넌트가 공유하는 저장소. state/getters/actions로 구성.' },
    { term: '단방향 데이터 흐름', desc: '상태는 스토어→컴포넌트, 변경은 action 경유 → 예측 가능성↑.' },
  ],
  'vue-4': [
    { term: '비동기 3-상태', desc: 'loading/error/data를 분리 관리. finally로 로딩 해제 보장.' },
    { term: 'CORS', desc: '다른 출처 API 호출을 제한하는 브라우저 보안 정책. 서버 허용 헤더 필요.' },
    { term: '환경변수(VITE_)', desc: 'Vite는 VITE_ 접두어만 클라이언트에 노출. 키·주소 분리.' },
    { term: '번들링/트리셰이킹', desc: '소스를 정적 파일로 변환하며 미사용 코드 제거·코드분할.' },
    { term: 'SPA 배포 폴백', desc: '서버가 모든 경로를 index.html로 폴백해야 새로고침 404 방지.' },
  ],
  'sllm-1': [
    { term: 'sLLM', desc: '수~수십억 파라미터의 소형 LLM. 온프레미스·저비용·프라이버시에 유리.' },
    { term: '양자화', desc: '가중치를 4/8bit로 표현해 메모리·속도 개선(소폭 정확도 손실).' },
    { term: 'NF4', desc: '정규분포에 최적화된 4bit 포맷. QLoRA에서 사용.' },
    { term: '추론 서버', desc: 'vLLM/ollama로 모델을 API화. PagedAttention 등으로 처리량↑.' },
    { term: 'KV 캐시', desc: '이전 토큰의 키·값을 저장해 재계산 방지. 컨텍스트가 길수록 메모리 증가.' },
  ],
  'sllm-2': [
    { term: 'PEFT', desc: '일부 파라미터만 학습하는 효율적 미세조정 기법군.' },
    { term: 'LoRA', desc: '가중치에 저랭크 행렬(A·B)을 더해 학습. 원본 고정, 어댑터만 수 MB 저장.' },
    { term: 'QLoRA', desc: '4bit 양자화 모델 위 LoRA. 단일 GPU로 큰 모델 파인튜닝.' },
    { term: 'instruction 데이터', desc: '지시-응답 쌍. chat template에 맞춰야 성능 안정.' },
    { term: '과적합', desc: '적은 데이터 과학습 시 일반화 저하. 검증·조기종료로 방지.' },
  ],
  'ml-dl-1': [
    { term: '지도/비지도 학습', desc: '레이블 유무로 구분. 분류·회귀(지도) vs 군집·차원축소(비지도).' },
    { term: '과적합/과소적합', desc: '훈련에만 맞춤 vs 패턴 미포착. 검증으로 균형을 찾는다.' },
    { term: '편향-분산 트레이드오프', desc: '단순(높은 편향) vs 복잡(높은 분산) 모델의 균형이 일반화 핵심.' },
    { term: '평가지표', desc: '정확도·정밀도·재현율·F1·ROC-AUC. 불균형 데이터는 정확도만 보면 위험.' },
    { term: '교차검증', desc: '데이터를 k등분해 번갈아 검증 → 일반화 성능 안정 추정.' },
  ],
  'ml-dl-2': [
    { term: '퍼셉트론/MLP', desc: '가중합+활성화로 비선형 근사. 층을 쌓아 표현력 확장.' },
    { term: '역전파', desc: '손실을 출력→입력으로 미분 전파해 기울기 계산. 학습의 핵심 알고리즘.' },
    { term: '활성화 함수', desc: 'ReLU/sigmoid/tanh. 비선형성 부여. ReLU가 기울기 소실에 강해 기본.' },
    { term: '옵티마이저', desc: 'SGD/Adam. Adam은 적응적 학습률로 수렴이 빠르다.' },
    { term: '미니배치/에폭', desc: '일부씩(배치) 갱신, 전체 1회 순회=1에폭. 메모리·노이즈 균형.' },
  ],
  'ml-dl-3': [
    { term: 'CNN', desc: '합성곱으로 지역 패턴 추출. 파라미터 공유로 이미지에 효율적.' },
    { term: 'RNN/LSTM', desc: '순차 데이터 처리. LSTM 게이트로 장기 의존성·기울기 소실 완화.' },
    { term: 'Transformer', desc: 'Self-Attention으로 전체 토큰 관계를 병렬 학습. 현대 LLM의 기반.' },
    { term: '전이학습', desc: '사전학습 모델을 작은 데이터에 미세조정 → 적은 자원으로 고성능.' },
    { term: '정규화/증강', desc: '드롭아웃·배치정규화·데이터 증강으로 과적합 억제.' },
  ],
  'rag-1': [
    { term: 'RAG', desc: '검색으로 외부 지식을 가져와 프롬프트에 결합 → 최신성·근거·환각 완화.' },
    { term: '청킹(Chunking)', desc: '문서를 의미 단위로 분할. 크기·오버랩이 검색 품질을 좌우.' },
    { term: '임베딩', desc: '텍스트를 의미 벡터로 변환. 유사 의미는 가까운 벡터가 된다.' },
    { term: '벡터 인덱스', desc: '대량 벡터를 빠르게 찾는 자료구조(HNSW/IVF) = 근사 최근접(ANN).' },
    { term: '유사도', desc: '코사인/내적으로 질의-문서 근접도 측정. 정규화 시 내적=코사인.' },
  ],
  'rag-3': [
    { term: '충실도(Faithfulness)', desc: '답변이 제공 컨텍스트에 근거하는 정도. 환각 측정의 핵심 지표.' },
    { term: '문맥 정밀도/재현율', desc: '검색 문맥이 정답 관련인지(정밀도)·정답을 포함하는지(재현율).' },
    { term: 'RAGAS', desc: 'RAG 자동 평가 프레임워크. 충실도·관련성·문맥 지표를 산출.' },
    { term: '하이브리드 검색', desc: '키워드(BM25)+벡터 결합. 고유명사·약어에 강하다.' },
    { term: '재순위(Re-ranking)', desc: '1차 검색 후 cross-encoder로 정밀 재정렬해 상위 정확도↑.' },
  ],
  'langchain-1': [
    { term: 'LangChain', desc: '모델·프롬프트·파서·도구·메모리를 조합하는 LLM 앱 프레임워크.' },
    { term: 'LCEL', desc: '| 파이프로 컴포넌트를 잇는 선언적 체인. 스트리밍·배치·병렬 기본 지원.' },
    { term: '출력 파서', desc: 'LLM 텍스트를 구조화(JSON/객체)로 변환·검증. 실패 시 재시도.' },
    { term: 'Runnable', desc: 'invoke/stream/batch를 가진 표준 인터페이스. 모든 컴포넌트가 구현.' },
  ],
  'langchain-2': [
    { term: '메모리', desc: '대화 히스토리를 유지해 멀티턴 맥락 제공(윈도우·요약 메모리 등).' },
    { term: 'Tool', desc: 'LLM이 호출하는 외부 함수. 도구 설명이 호출 판단의 근거.' },
    { term: 'Retriever', desc: '질의로 관련 문서를 가져오는 추상화. 검색 방식 교체 가능.' },
    { term: '라우팅', desc: '입력 의도에 따라 다른 체인으로 분기(RunnableBranch).' },
  ],
  'langchain-3': [
    { term: '스트리밍', desc: '토큰을 생성 즉시 전송해 체감 지연 감소(SSE).' },
    { term: '관측(LangSmith)', desc: '단계별 이벤트를 추적해 프롬프트·지연·비용 분석.' },
    { term: '폴백/재시도', desc: '모델 장애 시 대체 모델·재시도로 가용성 확보.' },
    { term: '가드레일', desc: '입출력 검증으로 유해·이탈 응답 차단.' },
  ],
  'serving-1': [
    { term: '서빙 패턴', desc: '온라인(실시간)·배치·스트림. 지연·처리량 요구로 선택.' },
    { term: '추론 API', desc: '모델을 REST/gRPC로 노출. 전처리-추론-후처리 파이프라인.' },
    { term: '모델 패키징', desc: '가중치+코드+의존성을 버전과 함께 묶어 재현성 확보.' },
    { term: '지연 vs 처리량', desc: '배치 크기↑는 처리량↑·지연↑. 서비스 요구로 균형.' },
  ],
  'serving-2': [
    { term: '컨테이너', desc: '앱+의존성 격리 패키징(Docker). 환경 불일치 문제 해결.' },
    { term: '오케스트레이션', desc: '쿠버네티스로 배포·스케일·복구 자동화.' },
    { term: '오토스케일링', desc: '부하에 따라 인스턴스 자동 증감(HPA).' },
    { term: '관측성 3축', desc: '메트릭·로그·트레이스로 시스템 상태 파악.' },
    { term: '드리프트', desc: '입력/개념 분포 변화로 성능 저하 → 모니터링·재학습.' },
  ],
  'serving-3': [
    { term: 'MLOps', desc: '데이터·학습·배포·모니터링을 자동화·재현 가능하게.' },
    { term: '모델 레지스트리', desc: '모델 버전·메타·스테이지를 관리하는 저장소.' },
    { term: 'CI/CD', desc: '커밋→테스트→빌드→배포 자동화로 안전한 릴리스.' },
    { term: '카나리/블루그린', desc: '점진/병렬 배포로 위험 최소화·즉시 롤백.' },
  ],
  'agent-1': [
    { term: '에이전트', desc: '목표를 위해 스스로 추론하고 도구를 쓰는 LLM 시스템.' },
    { term: 'ReAct', desc: '추론(Reason)↔행동(Act)을 번갈아 수행. 도구 호출의 기반.' },
    { term: 'StateGraph', desc: '노드(작업)·엣지(흐름)·State로 워크플로를 명시(LangGraph).' },
    { term: '조건부 엣지', desc: '상태에 따라 다음 노드 결정 → 도구 반복·종료 제어.' },
    { term: '체크포인트', desc: '상태 저장으로 중단·재개·HITL 가능.' },
  ],
  'agent-2': [
    { term: '멀티 에이전트', desc: '역할 분담된 에이전트들의 협업으로 복잡 작업 분해.' },
    { term: 'Supervisor 패턴', desc: '감독이 다음 작업 에이전트를 선택·조율.' },
    { term: '서브그래프', desc: '그래프를 모듈로 중첩해 재사용·캡슐화.' },
    { term: 'HITL', desc: '사람이 승인·수정 후 재개. 위험 작업의 안전장치.' },
  ],
  'vectordb-1': [
    { term: '벡터 검색', desc: '의미 임베딩의 근접도로 검색 → 키워드 일치 한계 보완.' },
    { term: 'HNSW', desc: '그래프 기반 ANN. m/ef로 정확도-속도 조절. 대규모에 강함.' },
    { term: 'IVF', desc: '군집 분할 후 일부만 탐색하는 ANN. 메모리 효율적.' },
    { term: '거리/유사도', desc: '코사인·내적·L2. 임베딩 정규화 시 내적=코사인.' },
    { term: '메타데이터 필터', desc: '벡터 검색에 조건을 결합한 하이브리드 검색.' },
  ],
  'capstone-1': [
    { term: '문제 정의', desc: '사용자·문제·가치를 한 문장으로. 범위를 좁혀 깊게.' },
    { term: '아키텍처 설계', desc: '컴포넌트·데이터 흐름·계약을 도식화 → 병렬 작업 토대.' },
    { term: 'MVP', desc: '핵심 가설을 검증하는 최소 기능. 완벽보다 동작.' },
    { term: 'WBS', desc: '작업 분해 구조. 태스크·담당·기한으로 가시화.' },
  ],
  'capstone-2': [
    { term: '수직 슬라이스', desc: '한 기능을 UI~DB까지 먼저 완성해 통합 위험 조기 해소.' },
    { term: '관측/로깅', desc: '멀티스텝 시스템 디버깅을 위한 단계별 추적.' },
    { term: '지속 통합', desc: '매일 통합해 "통합 지옥" 회피.' },
    { term: '데모 가능 상태', desc: '항상 시연 가능한 버전을 유지.' },
  ],
  'capstone-3': [
    { term: '엔드투엔드 테스트', desc: '전체 시나리오를 통째로 검증해 회귀 방지.' },
    { term: '스모크 테스트', desc: '핵심 경로만 빠르게 점검. 발표 전 필수.' },
    { term: '회고(KPT)', desc: 'Keep/Problem/Try로 프로세스 개선.' },
    { term: '재현성', desc: 'README·환경·시드로 누구나 재실행 가능하게.' },
  ],
  'miniproject-1': [
    { term: '요구사항 정의', desc: 'Must/Should/Could로 우선순위화해 범위 통제.' },
    { term: '계약 우선', desc: 'API 스펙을 먼저 합의해 프론트·백 병렬 개발.' },
    { term: '데이터 플로우', desc: '입력→처리→출력 경로 설계로 병목·의존 파악.' },
    { term: '기술 선택', desc: '팀 역량·문서·배포 용이성을 기준으로.' },
  ],
  'miniproject-2': [
    { term: '모듈화', desc: '관심사 분리(API/로직/DB)로 협업·테스트 용이.' },
    { term: '예외 처리', desc: '실패를 잡아 사용자 친화 메시지 반환 → 안정성.' },
    { term: '캐싱', desc: '반복 질의 결과 재사용으로 비용·지연 절감.' },
    { term: '중간 시연', desc: '조기 피드백으로 방향 교정.' },
  ],
  'miniproject-3': [
    { term: '스모크/부하 테스트', desc: '핵심 경로·동시성 점검. 콜드스타트 확인.' },
    { term: '배포', desc: '환경변수·시크릿 분리, 재현 가능한 빌드.' },
    { term: '롤백 전략', desc: '문제 시 즉시 이전 버전 복귀.' },
    { term: '문서/발표', desc: 'README·데모 시나리오로 가치 전달.' },
  ],
  // 참고용 (Spring AI)
  'spring-ai-1': [
    { term: 'ChatClient', desc: 'Spring AI의 LLM 호출 추상화. 프로바이더 교체 용이.' },
    { term: 'PromptTemplate', desc: '변수 치환 프롬프트. 시스템 지시 고정.' },
    { term: '프로바이더 추상화', desc: 'OpenAI/Anthropic 등을 동일 인터페이스로 사용.' },
  ],
  'spring-ai-2': [
    { term: 'EmbeddingModel', desc: '텍스트→벡터. VectorStore 적재에 사용.' },
    { term: 'VectorStore', desc: 'pgvector 등 벡터 저장·검색 추상화.' },
    { term: 'TextSplitter', desc: '토큰/문자 기준 청킹.' },
  ],
  'spring-ai-3': [
    { term: 'Function Calling', desc: '모델이 등록 함수를 호출. @Description이 판단 근거.' },
    { term: 'Structured Output', desc: '응답을 POJO로 자동 매핑.' },
    { term: '인젝션 방어', desc: '사용자 입력을 system과 분리·검증.' },
  ],
}

export const conceptsFor = (subjectId, day) => concepts[`${subjectId}-${day}`] || []
