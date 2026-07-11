export const exams = {
  'ml-dl': {
    purpose: '주어진 데이터에 가장 적합한 딥러닝 아키텍처를 찾아가며 딥러닝 아키텍처 이해 역량을 평가한다. CNN과 RNN 계열 같은 기본 아키텍처를 이해하고 딥러닝 최적화를 코드 수준에서 다루는 기초 역량을 확보하는 것이 목표다.',
    tasks: [
      { name: 'CNN Architecture', activity: 'CNN 기본 골격(Vanilla Skeleton)을 이해하고, 레이어를 재구성하며 모델을 최적화한다.', time: '2H' },
      { name: 'LSTM 또는 AE Architecture', activity: 'RNN 계열(LSTM) 또는 AutoEncoder 기본 골격을 이해하고, 레이어를 재구성하며 모델을 최적화한다. 상세 아키텍처 설정은 실습교수 재량으로 조정한다.', time: '2H' },
    ],
    criteria: [
      { item: '아키텍처 개선 논리', desc: '개선 목표가 명확하고 설계 판단이 논리적인지 평가한다.', points: '20점' },
      { item: '아키텍처 개선 설계 타당성', desc: '개선 목적에 맞는 Layer, Optimizer, Activation을 적절히 선정하고 적용했는지 평가한다.', points: '15점' },
      { item: '학습 안정성 및 일반화', desc: 'Train 학습 안정성과 Test 성능 안정성을 그래프로 확인하고, Overfitting이 완화되었는지 평가한다.', points: '15점' },
    ],
    deliverables: [
      '개인별 점수, 점수 판단 근거, 보완사항',
      'Train/Test 성능 안정성을 보여주는 학습 그래프',
    ],
    notes: [
      '오픈 데이터셋을 활용하되 도메인은 제한하지 않으며, 주식 데이터는 사용하지 않는다.',
      '최적화 Guide Code 제공 여부는 실습교수가 선택한다.',
      '두 실습은 각각 50점 만점, 총 100점으로 평가한다.',
      '마감 시간을 지키지 못하면 실습교수 재량으로 감점될 수 있다.',
    ],
  },

  'feature': {
    purpose: '주어진 데이터에 Hands-On 가이드를 따라 Feature Engineering 역량을 평가한다. 제조 도메인 오픈 데이터를 대상으로, 도메인 관점에서 데이터를 이해하고 변수를 해석·개발하는 기초 역량을 확보하는 것이 목표다.',
    tasks: [
      { name: 'Part A : Machine Failure', activity: '이진(Binary) Target을 해석하기 위해 원본 변수를 이해·정의하고, 도메인 관점에서 새로운 변수를 만들어 보고서를 작성한다.', time: '3H' },
      { name: 'Part B : Failure Type', activity: '다중 클래스(Classes) Target을 해석하기 위해 도메인 관점의 가설을 수립하고, 변수를 해석·정의하여 보고서를 작성한다.', time: '3.5H' },
    ],
    criteria: [
      { item: '단일 변수 이해', desc: '기초통계량과 그래프를 바탕으로 단일 변수의 특징을 이해했는지 평가한다.', points: '10점' },
      { item: '변수 간 관계 이해', desc: '두 개 이상 변수 간 관계를 기초통계량과 그래프로 해석했는지 평가한다(단, 상관관계는 제외).', points: '10점' },
      { item: '인과적 사고', desc: '도메인 관점에서 수립한 합리적 가설을 근거로 변수 특징을 해석했는지 보고서를 기반으로 평가한다.', points: '30점' },
    ],
    deliverables: [
      '개인별 점수, 점수 판단 근거, 보완사항',
      '변수 해석과 가설을 정리한 보고서(Part A, Part B)',
    ],
    notes: [
      '설계된 Hands-On 가이드를 따라 진행하되, 상세 추가 가이드가 제공될 수 있다.',
      '두 실습은 각각 50점 만점, 총 100점으로 평가한다.',
      '마감 시간을 지키지 못하면 실습교수 재량으로 감점될 수 있다.',
    ],
  },

  'rag': {
    purpose: '목적에 맞는 Agentic RAG 파이프라인을 설계하고 이를 기반으로 개발하는 역량을 평가한다. 도메인 특성을 고려한 설계와 그 구현 충실도를 확인하며, 이후 AI Agent 설계 역량으로 이어질 기초를 다진다.',
    tasks: [
      { name: 'Agentic RAG 설계', activity: 'LangGraph 기본 구조를 이해하고 목적에 맞는 파이프라인을 설계한다. 문제 정의, 에이전트 설계, State 정의, 임베딩 모델 선정, 평가 기준, 보고서 목차 등 설계 산출물을 제출한다.', time: '0.5D' },
      { name: 'Agentic RAG 개발', activity: '설계를 기반으로 실제로 개발하고 조별로 발표한다. 개발 산출물은 GitHub 링크로 제출한다.', time: '1D' },
    ],
    criteria: [
      { item: '문제 정의', desc: '조별로 선택한 도메인의 문제 정의가 명확한지 평가한다.', points: '5점' },
      { item: 'Agent 설계', desc: '에이전트 역할 분리가 합리적이고, 불필요한 에이전트 없이 각자 명확한 책임을 갖는지 평가한다.', points: '15점' },
      { item: 'RAG 설계', desc: 'RAG를 적용할 에이전트 선정이 적절하고 문서 선정 전략과 활용 방식이 타당한지 평가한다.', points: '15점' },
      { item: 'Embedding 모델 선택', desc: '오픈소스 임베딩 모델의 선택 이유와 적용 전략이 합리적으로 설명되었는지 평가한다.', points: '10점' },
      { item: '평가 기준 설계', desc: 'Bessemer Checklist나 Scorecard Method를 적절히 활용해 투자 판단 기준을 설계했는지 평가한다.', points: '15점' },
      { item: 'State Schema 설계', desc: 'State 구조가 Graph 흐름에 맞게 정의되고 에이전트 간 데이터 흐름이 명확한지 평가한다.', points: '15점' },
      { item: 'Graph 설계', desc: 'Workflow, Loop, Branch 구조가 논리적으로 설계되어 에이전트 협업 구조가 잘 표현되었는지 평가한다.', points: '15점' },
      { item: '보고서 구조 설계', desc: '보고서 목차와 전달 구조가 목적에 맞게 논리적으로 구성되었는지 평가한다.', points: '10점' },
      { item: '설계 구현 충실도', desc: '제출한 설계 문서의 에이전트 구조, Graph 흐름, State 구조가 실제 코드에 반영되었는지 평가한다.', points: '15점' },
      { item: 'Agent 구조 구현', desc: '역할별 에이전트가 분리 구현되고 흐름 제어가 논리적으로 부합하도록 구현되었는지 평가한다.', points: '15점' },
      { item: 'RAG Pipeline 구현', desc: '문서 로딩, 임베딩, 검색, 컨텍스트 활용 흐름이 정상적으로 구현되었는지 평가한다.', points: '20점' },
      { item: '코드 구조 및 프로젝트 구성', desc: '디렉토리 구조, 모듈 분리, 실행 스크립트 등이 명확하게 구성되었는지 평가한다.', points: '10점' },
      { item: '실행 결과 재현성', desc: '코드 실행 시 실제로 투자 분석 결과가 생성되는지 평가한다.', points: '10점' },
      { item: 'Output - 보고서', desc: '생성된 보고서가 정의된 관점에서 논리적으로 작성되고 목표에 부합하는지 평가한다.', points: '20점' },
      { item: 'Output - README', desc: 'README에 프로젝트 목적, 구조, 실행방법, 역할분담이 명확히 설명되었는지 평가한다.', points: '10점' },
    ],
    deliverables: [
      '개인별 점수, 점수 판단 근거, 보완사항',
      '설계 산출물(문제 정의, 에이전트 설계, State 정의, 임베딩 모델 선정, 평가 기준, 보고서 목차 등)',
      '개발 산출물 GitHub 링크',
      '생성 보고서 및 README',
    ],
    notes: [
      '기존 주제는 스타트업 투자 평가 리포트(Semiconductor, Robotics, Logistics, AgTech)다.',
      '설계 실습 100점, 개발 실습 100점으로 총 200점 만점이다.',
      '마감 시간을 지키지 못하면 실습교수 재량으로 감점될 수 있다.',
    ],
  },

  'agent': {
    purpose: '목적에 맞는 Multi-Agent를 설계하고 이를 기반으로 개발하는 역량을 평가한다. Agent Pattern 이해를 바탕으로 설계·구현되었는지 확인하며, 이후 AI Agent Capstone 과정으로 이어지도록 한다.',
    tasks: [
      { name: 'Multi-Agent 설계', activity: '목적에 맞는 멀티 에이전트를 설계한다. 문제 정의, 에이전트 설계, State 정의, 임베딩 모델 선정, 보고서 목차 등 설계 산출물을 제출한다.', time: '2H' },
      { name: 'Multi-Agent 개발', activity: '설계를 기반으로 개발하고 GitHub 링크로 산출물을 제출한다.', time: '0.5D' },
    ],
    criteria: [
      { item: 'Goal 정의', desc: 'Goal과 Criteria가 명확하고, 에이전트가 해결할 목표가 측정 가능하게 정의되었는지 평가한다.', points: '15점' },
      { item: 'Task Decomposition', desc: '전체 문제를 에이전트가 독립적으로 수행 가능하도록 논리적으로 분해했는지 평가한다.', points: '15점' },
      { item: 'Control Strategy', desc: 'Workflow 제어 방식이 합리적으로 설계되고 데이터 편향/오류를 고려했는지 평가한다.', points: '10점' },
      { item: 'Agent 설계', desc: '에이전트 역할 분리가 합리적이고 불필요한 에이전트 없이 명확한 책임을 갖는지 평가한다.', points: '15점' },
      { item: 'State Schema 설계', desc: 'State 구조가 Graph 흐름에 맞게 정의되고 에이전트 간 데이터 흐름이 명확한지 평가한다.', points: '15점' },
      { item: 'Graph 설계', desc: 'Workflow, Loop, Branch 구조가 논리적으로 설계되어 에이전트 협업 구조가 잘 표현되었는지 평가한다.', points: '20점' },
      { item: 'Embedding 모델 선택', desc: '오픈소스 임베딩 모델의 선택 이유와 적용 전략이 합리적으로 설명되었는지 평가한다.', points: '10점' },
      { item: '설계 구현 충실도', desc: '제출한 설계 문서의 에이전트 구조, Graph 흐름, State 구조가 실제 코드에 반영되었는지 평가한다.', points: '15점' },
      { item: 'Agent 구조 구현', desc: '역할별 에이전트가 분리 구현되고 흐름 제어가 논리적으로 부합하도록 구현되었는지 평가한다.', points: '30점' },
      { item: '코드 구조 및 프로젝트 구성', desc: '디렉토리 구조, 모듈 분리, 실행 스크립트 등이 명확하게 구성되었는지 평가한다.', points: '5점' },
      { item: '실행 결과 재현성', desc: '코드 실행 시 실제로 분석 결과가 생성되는지 평가한다.', points: '10점' },
      { item: 'Output - 보고서', desc: '생성된 보고서가 정의된 관점과 목차를 기반으로 논리적으로 작성되고 목표에 부합하는지 평가한다.', points: '20점' },
      { item: 'Output - 전략 인사이트', desc: '기업 비교, 전략 차이, 시사점이 데이터를 기반으로 도출되었는지 평가한다.', points: '20점' },
    ],
    deliverables: [
      '개인별 점수, 점수 판단 근거, 보완사항',
      '설계 산출물(문제 정의, 에이전트 설계, State 정의, 임베딩 모델 선정, 보고서 목차 등)',
      '개발 산출물 GitHub 링크',
      '생성 보고서 및 전략 인사이트',
    ],
    notes: [
      '특정 도메인의 업무 상황을 제시하고 목적에 맞는 에이전트 설계·개발이 진행되도록 설계한다.',
      '기존 주제는 배터리 시장 전략 분석 보고서, 전기차 시장 침체 극복을 위한 마케팅 전략 수립 등이다.',
      '설계 실습 100점, 개발 실습 100점으로 총 200점 만점이다.',
      '2일 과정이라 별도 조별 발표는 진행하지 않는다.',
      '마감 시간을 지키지 못하면 실습교수 재량으로 감점될 수 있다.',
    ],
  },

  'capstone': {
    purpose: 'Backend, VectorDB, MCP 기반 AI Agent, Frontend로 이어지는 서비스 개발 역량을 Hands-On 가이드를 따라 확인하고 Git에 반영한다. 앞서 학습한 단위 기술 이해를 바탕으로 에이전트 기반 서비스 개발을 이해하고 있는지 평가한다.',
    tasks: [
      { name: 'Part A - Streaming 실습', activity: 'Single 및 Multi-Agent Streaming을 개발한다. Backend-Agent-Frontend를 연결하고 에이전트를 Single에서 Multi-Agent로 확장한다.', time: '0.5D' },
      { name: 'Part B - Agent 확장 실습', activity: 'Supervisor Pattern에 Query Routing, Validator Agent, Conditional Routing, Dynamic Planning 기능을 하나씩 추가하며 패턴을 고도화한다.', time: '0.5D' },
    ],
    criteria: [
      { item: 'Backend SSE Endpoint 구현', desc: 'LangGraph 이벤트를 SSE 이벤트로 변환하는 원리를 이해하고 코드에 반영했는지 평가한다.', points: '25점' },
      { item: 'Frontend 구현', desc: 'Next.js와 App Router로 Frontend 프로젝트를 생성하고 Token stream 및 tool call event를 코드에 반영했는지 평가한다.', points: '25점' },
      { item: 'Supervisor Pattern 확장 구현', desc: 'Query Routing, Validator Agent, Conditional Routing을 구현했는지 평가한다.', points: '15점' },
      { item: 'Dynamic Planning 구현', desc: 'Supervisor의 Dynamic Planning을 구현했는지 평가한다.', points: '30점' },
      { item: '코드 구조 및 프로젝트 구성', desc: '디렉토리 구조, 모듈 분리, 실행 스크립트 등이 명확하게 구성되었는지 평가한다.', points: '5점' },
    ],
    deliverables: [
      '개인별 점수, 점수 판단 근거, 보완사항',
      'Streaming 구현 결과(Backend SSE + Frontend)',
      'Supervisor Pattern 확장 및 Dynamic Planning 구현 코드',
    ],
    notes: [
      '기설계된 Hands-On 가이드를 따라 진행하되, 상세 추가 가이드가 제공될 수 있다.',
      'Part A 50점, Part B 50점으로 총 100점 만점이다.',
      '마감 시간을 지키지 못하면 실습교수 재량으로 감점될 수 있다.',
    ],
  },

  'miniproject': {
    purpose: '생성형 AI 전 과정을 정리하고 내재화하기 위한 실습으로, Multi-Agent를 설계·개발하는 능력을 확인한다. 도메인 특성을 충분히 고려했는지를 실습 결과물로 평가한다.',
    tasks: [
      { name: 'Agent 설계', activity: '목적에 맞는 멀티 에이전트를 설계한다. 문제 정의, 에이전트 설계, State 정의, 임베딩 모델 선정, 보고서 목차 등 설계 산출물을 제출한다.', time: '2H' },
      { name: 'AI Service 개발', activity: '설계를 기반으로 개발하고, GitHub 개발 산출물과 Frontend 캡쳐 화면을 제출한다.', time: '2H' },
    ],
    criteria: [
      { item: 'Goal 정의', desc: 'Goal과 Criteria가 명확하고, 에이전트가 해결할 목표가 측정 가능하게 정의되었는지 평가한다.', points: '15점' },
      { item: 'Task Decomposition', desc: '전체 문제를 에이전트가 독립적으로 수행 가능하도록 논리적으로 분해했는지 평가한다.', points: '15점' },
      { item: 'Control Strategy', desc: 'Workflow 제어 방식이 합리적으로 설계되고 데이터 편향/오류를 고려했는지 평가한다.', points: '10점' },
      { item: 'Agent 설계', desc: '에이전트 역할 분리가 합리적이고 불필요한 에이전트 없이 명확한 책임을 갖는지 평가한다.', points: '15점' },
      { item: 'State Schema 설계', desc: 'State 구조가 Graph 흐름에 맞게 정의되고 에이전트 간 데이터 흐름이 명확한지 평가한다.', points: '15점' },
      { item: 'Graph 설계', desc: 'Workflow, Loop, Branch 구조가 논리적으로 설계되어 에이전트 협업 구조가 잘 표현되었는지 평가한다.', points: '20점' },
      { item: 'Embedding 모델 선택', desc: '오픈소스 임베딩 모델의 선택 이유와 적용 전략이 합리적으로 설명되었는지 평가한다.', points: '10점' },
      { item: '설계 구현 충실도', desc: '제출한 설계 문서의 에이전트 구조, Graph 흐름, State 구조가 실제 코드에 반영되었는지 평가한다.', points: '15점' },
      { item: 'Agent 구조 구현', desc: '역할별 에이전트가 분리 구현되고 흐름 제어가 논리적으로 부합하도록 구현되었는지 평가한다.', points: '30점' },
      { item: '코드 구조 및 프로젝트 구성', desc: '디렉토리 구조, 모듈 분리, 실행 스크립트 등이 명확하게 구성되었는지 평가한다.', points: '5점' },
      { item: '실행 결과 재현성', desc: '코드 실행 시 실제로 분석 결과가 생성되고 Task Decomposition이 확인되는지 평가한다.', points: '10점' },
      { item: 'Output - 보고서', desc: '생성된 보고서가 정의된 관점과 목차를 기반으로 논리적으로 작성되고 목표에 부합하는지 평가한다.', points: '20점' },
      { item: 'Output - Frontend', desc: '제출된 Frontend 화면이 서비스 목적에 부합하도록 동작하는지 평가한다.', points: '20점' },
    ],
    deliverables: [
      '개인별 점수, 점수 판단 근거, 보완사항',
      '설계 산출물(문제 정의, 에이전트 설계, State 정의, 임베딩 모델 선정, 보고서 목차 등)',
      '개발 산출물 GitHub 링크 및 Frontend 캡쳐 화면',
      '생성 보고서',
    ],
    notes: [
      '제조, 반도체 등 특정 도메인의 업무 상황을 구체적으로 제시하고, 조별로 목적에 맞게 설계·개발하여 완결적으로 구현했는지 평가한다.',
      '기존 주제는 반도체 R&D 기술 전략 분석 보고서(TRL 기반), AI 기술 특허 평가, AI 윤리성 리스크 진단 등이다.',
      '설계 실습 100점, 개발 실습 100점으로 총 200점 만점이다.',
      '조별 발표는 필수는 아니며 실습교수 재량으로 편성할 수 있다.',
      '마감 시간을 지키지 못하면 실습교수 재량으로 감점될 수 있다.',
    ],
  },

  'transformer': {
    purpose: 'LLM의 기술 구조를 이해하고, 기존 딥러닝 방식 대비 Transformer 모델이 사용되는 원리를 이해하는지 평가한다. LLM을 활용한 AI 서비스를 기획하고 CrewAI 기반으로 LLM 연동 서비스를 구현한 결과를 평가한다.',
    tasks: [
      { name: '딥러닝(LSTM) vs Transformer 모델 비교', activity: 'LSTM으로 문장을 생성해 한계점을 파악한 뒤, Transformer 모델로 문장 생성을 개선하는 실습을 수행한다.', time: '' },
      { name: 'Transformer 기반 LLM API 활용 (2인 과제)', activity: 'CrewAI 등 프레임워크 기반으로 LLM 에이전트를 구성·연동한다. 프롬프트가 토큰화·임베딩·Self-Attention을 거쳐 다음 토큰을 예측하는 추론 과정을 응용 레벨에서 체감한다.', time: '' },
    ],
    criteria: [
      { item: '딥러닝(RNN/LSTM) 문장 생성', desc: 'RNN 또는 LSTM이 문장 생성에 올바로 적용되고 정상 동작하는지 평가한다.', points: '40점' },
      { item: 'Transformer 문장 생성', desc: 'Transformer 모델이 문장 생성에 올바로 적용되고 정상 동작하는지 평가한다.', points: '60점' },
      { item: 'LLM API 활용 시나리오 Biz 가치', desc: 'Transformer 기반 LLM을 API 레벨에서 활용하는 시나리오 기획이 AI 서비스로서 비즈니스 가치가 있는지 평가한다.', points: '40점' },
      { item: 'LLM API 활용 시나리오 기술 이해도', desc: 'Transformer 기반 LLM의 API 레벨 활용 기술을 충분히 이해하고 있는지 평가한다.', points: '30점' },
      { item: 'LLM API 활용 시나리오 수업 충실도', desc: 'Transformer 및 Transformer 아키텍처 수업에서 전달한 내용을 충실히 소화했는지 평가한다.', points: '30점' },
    ],
    deliverables: [
      '개인별 점수, 점수 판단 근거, 보완사항',
      'LSTM 및 Transformer 문장 생성 실습 결과',
      'CrewAI 등 기반 LLM 연동 서비스 구현 결과',
    ],
    notes: [
      '두 번째 실습은 2인 과제로 진행한다.',
    ],
  },

  'sllm': {
    purpose: '내부 파이프라인의 필요성을 이해하고, CLM(Causal Language Model) Fine-Tuning과 PEFT(LoRA 등) 기초 실습으로 LLM과 sLLM 구조의 차이를 체득한다. 파인튜닝 기법을 바탕으로 목적에 맞는 파이프라인·임베딩 모델을 선정하고 sLLM 서비스 파이프라인을 구현하여 서빙·배포까지 완료한다.',
    tasks: [
      { name: 'sLLM 구현 및 Fine-Tuning 기초', activity: '내부 파이프라인 설계 원리를 학습하고, CLM 기반 Fine-Tuning과 PEFT(LoRA) 기초 구현 및 코드 리뷰를 통해 LLM 대비 sLLM 구조 차이를 체득한다.', time: '' },
      { name: 'sLLM 서비스 설계 및 PEFT 응용', activity: '목적별 파이프라인과 임베딩 모델을 선정해 sLLM 서비스 파이프라인을 구현하고, PEFT를 응용해 서빙·배포까지 완료한다.', time: '' },
    ],
    criteria: [
      { item: 'CLM Fine-Tuning 구현 역량', desc: 'CLM 기반 Fine-Tuning 원리를 이해하고 실제 코드로 구현해 모델을 학습시킬 수 있는지 평가한다.', points: '60점' },
      { item: 'PEFT(LoRA) 기초 적용 역량', desc: 'LoRA 등 PEFT 기법의 동작 원리를 이해하고 이를 활용해 경량화된 방식으로 sLLM을 파인튜닝할 수 있는지 평가한다.', points: '40점' },
      { item: '목적별 파이프라인 및 임베딩 모델 선정 역량', desc: '서비스 목적에 맞춰 적절한 파이프라인 구조와 임베딩 모델을 판단·선정할 수 있는지 평가한다.', points: '40점' },
      { item: 'sLLM 서비스 구현 및 서빙 배포 역량', desc: 'PEFT를 응용해 설계한 sLLM 서비스를 실제로 구현하고 정상적으로 서빙·배포까지 완료할 수 있는지 평가한다.', points: '60점' },
    ],
    deliverables: [
      '개인별 점수, 점수 판단 근거, 보완사항',
      'CLM Fine-Tuning 및 PEFT(LoRA) 구현 코드',
      'sLLM 서비스 구현 및 서빙·배포 결과',
    ],
    notes: [
      '실습 1과 실습 2 각각 100점 만점으로 평가한다.',
    ],
  },

  'prompt': {
    purpose: 'Prompt 특성을 이해하고 Context Engineering을 활용해 효과적으로 LLM을 다룰 수 있는지 평가한다. LLM 동작 원리를 이해하고 맥락에 맞게 Prompt를 작성·활용할 수 있는지 실습으로 평가한다.',
    tasks: [
      { name: 'CoT, SC, ReAct 단계별 개선', activity: 'Prompt 기법별 차별화 특성과 성능 개선 원리를 파악한다. CoT, Self-Consistency, ReAct 각 기법의 단계별 동작 원리를 이해한다.', time: '' },
      { name: 'LLM 기반 Prompt 동작 구현 (2인 과제)', activity: 'LLM을 이용한 시나리오를 기획하고, Context 특징을 이해해 주제를 도출한 뒤 시나리오에 따라 동작하는 Prompt Script를 구현한다.', time: '' },
    ],
    criteria: [
      { item: 'CoT 특성 반영 여부', desc: 'Prompt에 CoT 특성이 맞게 적용되고 정상 동작하는지 평가한다.', points: '30점' },
      { item: 'SC 특성 반영 여부', desc: 'Prompt에 Self-Consistency 특성이 맞게 적용되고 정상 동작하는지 평가한다.', points: '30점' },
      { item: 'ReAct 특성 반영 여부', desc: 'Prompt에 ReAct 특성이 맞게 적용되고 정상 동작하는지 평가한다.', points: '40점' },
      { item: '종합 Prompt 시나리오 Biz 가치', desc: 'LLM 기반 시나리오 기획이 AI 서비스로서 비즈니스 가치가 있는지 평가한다.', points: '40점' },
      { item: '종합 Prompt 시나리오 기술 이해도', desc: 'Prompt와 Context Engineering 기술을 충분히 이해하고 있는지 평가한다.', points: '30점' },
      { item: '종합 Prompt 시나리오 수업 충실도', desc: 'Prompt와 Context Engineering 수업에서 전달한 내용을 충실히 소화했는지 평가한다.', points: '30점' },
    ],
    deliverables: [
      '개인별 점수, 점수 판단 근거, 보완사항',
      'CoT/SC/ReAct 단계별 개선 실습 결과',
      '동작하는 Prompt Script(시나리오 기반)',
    ],
    notes: [
      '두 번째 실습은 2인 과제로 진행한다.',
    ],
  },

  'vectordb': {
    purpose: 'RAG Advanced 과정으로, 실제 Vector DB 구성과 청킹을 연습한다. FAISS에서 Qdrant로 이어지는 RAG 구축과 Hybrid Search, Re-ranking을 통해 Dense 검색의 한계를 확인하고 개선한다.',
    tasks: [
      { name: 'FAISS → Qdrant RAG 구축 + Hybrid Search & Re-ranking', activity: 'PDF를 로딩해 Chunking한 뒤 FAISS와 Qdrant를 비교하고, Hybrid Search와 Re-ranking을 적용해 Dense 검색의 한계를 확인하고 개선 전후를 비교한다.', time: '' },
    ],
    criteria: [
      { item: '검색 비교 및 필터 검색 결과', desc: 'FAISS와 Qdrant의 검색 결과를 비교하고 필터 검색 결과를 확인한다.', points: '35점' },
      { item: 'Before/After 비교 및 RAGAS 검증', desc: 'Dense 벡터 유사도 검색만 사용한 결과, Dense+BM25를 RRF로 합친 Hybrid 결과, Reranker를 적용한 Hybrid 결과의 세 단계를 정리하고 RAGAS로 검증한다.', points: '35점' },
      { item: '질문별 결과 처리', desc: '개인이 자유롭게 던진 질문에 대해 결과가 잘 만들어졌는지 확인한다.', points: '10점' },
      { item: 'RAG 설정 시 주요 고려 사항', desc: 'RAG 설정에서 고려할 사항에 대한 개인 의견을 정리했는지 평가한다.', points: '10점' },
      { item: '완성도', desc: '제출 기한 준수 여부와 코드 내 주석 처리 누락 여부를 평가한다.', points: '10점' },
    ],
    deliverables: [
      '개인별 점수, 점수 판단 근거, 보완사항',
      'FAISS/Qdrant 검색 비교 결과',
      'Dense / Hybrid(RRF) / Reranker 세 단계 결과 및 RAGAS 검증 결과',
      'RAG 설정 고려 사항 개인 의견 정리',
    ],
    notes: [
      '개인이 자유롭게 질문을 설정하되 결과 품질을 확인한다.',
      '코드 내 주석 누락 시 감점될 수 있다.',
    ],
  },

  'python': {
    purpose: '데이터 분석 및 AI 프로젝트 수행 기반 실습을 통해 문제 해결 능력을 평가한다. venv 환경 구성, 비동기 데이터 수집, 스키마 검증, 저장 포맷 성능 비교, 테스트/Git까지 수행하며 이후 AI 서비스 개발에 활용될 개발 환경 구성 역량을 확보한다.',
    tasks: [
      { name: '데이터 수집 미니 파이프라인', activity: 'venv와 requirements.txt로 환경을 구성하고, API를 연동해 비동기로 데이터를 수집한다.', time: '' },
      { name: 'End2End 데이터 분석 프로젝트', activity: '데이터 연동과 ML 사전 연습을 수행하고, 자동화 기능을 포함해 프로젝트를 완료한 뒤 발표한다.', time: '' },
    ],
    criteria: [
      { item: '환경구성 + 비동기 수집', desc: 'venv 활성화 상태에서 requirements.txt로 설치를 완료하고, 3개 API를 모두 asyncio.gather()로 동시 수집해 응답을 정상 확인했는지 평가한다.', points: '35점' },
      { item: '스키마 검증 + 저장 비교', desc: 'Pydantic v2 모델을 정의하고 타입 오류 시 예외 처리를 포함하며, CSV와 Parquet 모두 저장해 성능 측정 결과를 출력했는지 평가한다.', points: '45점' },
      { item: '테스트/커밋', desc: 'pytest 1건 이상 통과, ruff check 오류 없음, Git 커밋 이력 존재 여부를 평가한다.', points: '10점' },
      { item: '완성도(실습1)', desc: '주석 처리 누락 시 감점한다.', points: '10점' },
      { item: '데이터 준비 + 시각화', desc: 'Pandas와 Polars를 모두 사용해 결측치 처리와 EDA 결과를 출력하고, Seaborn 정적 차트와 Plotly 인터랙티브 차트를 각 1개 이상(제목·축 레이블 포함) 작성했는지 평가한다.', points: '35점' },
      { item: '통계분석 + ML Pipeline', desc: '기술통계·상관계수를 출력하고 t-test 결과와 p-value 해석을 포함하며, Pipeline 객체로 전처리+모델을 구성해 평가 지표(정확도·F1 등)를 출력하고 모델 파일을 저장했는지 평가한다.', points: '45점' },
      { item: '자동화 + 발표', desc: 'report.md를 자동 생성하고 5분 발표를 수행했는지 평가한다.', points: '10점' },
      { item: '완성도(실습2)', desc: '주석 처리 누락 시 감점한다.', points: '10점' },
    ],
    deliverables: [
      '개인별 점수, 점수 판단 근거, 보완사항',
      'venv 환경 및 requirements.txt, 비동기 수집 코드',
      'Pydantic v2 검증 코드, CSV/Parquet 저장 및 성능 측정 결과',
      'pytest 테스트, ruff 검사 결과, Git 커밋 이력',
      'EDA·시각화·통계·ML Pipeline 결과물, 자동 생성 report.md',
    ],
    notes: [
      '종합실습 1과 종합실습 2는 각각 100점 만점으로 평가한다.',
      '코드 내 주석 누락 시 감점된다.',
    ],
  },

  'webproject': {
    purpose: 'AI 웹 서비스를 기획하고 기능/비기능 요구사항을 도출하는 연습과, 시스템 설계 및 데이터 모델링을 통한 아키텍처 구성 연습을 수행한다(단, 애플리케이션 개발과 테스트/디버깅 단계는 제외).',
    tasks: [
      { name: 'AI 웹 서비스 설계 Mini-Project', activity: '시스템을 기획·설계하고 산출물을 작성한다. 기획 및 요구사항, 설계에 대한 산출물을 작성한다.', time: '' },
    ],
    criteria: [
      { item: '납기', desc: '산출물 납기를 준수했는지 평가한다.', points: '20점' },
      { item: '목표 시스템 정의', desc: '구현·기능의 명확성을 평가한다. 서비스 개요 및 배경, 사용자(Actor)별 시스템 기능(요구사항) 정의, 서비스 UI 흐름(전체 화면 와이어프레임)을 포함한다.', points: '30점' },
      { item: '시스템 설계', desc: '데이터 모델과 API 명세를 적절히 작성했는지 평가한다.', points: '40점' },
      { item: '발표', desc: '전달 능력과 시간 준수 여부를 평가한다.', points: '10점' },
    ],
    deliverables: [
      '개인별 점수, 점수 판단 근거, 보완사항',
      '기획 및 요구사항 산출물(서비스 개요/배경, Actor별 기능 정의, UI 흐름 와이어프레임)',
      '시스템 설계 산출물(데이터 모델, API 명세)',
      '발표',
    ],
    notes: [
      '애플리케이션 개발과 테스트/디버깅 단계는 실습 범위에서 제외한다.',
    ],
  },
}
