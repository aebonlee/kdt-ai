// 교과목별 강의안 카탈로그 — 담당/타 강사 구분 없이 전 과목을 진행순으로 나열.
// 순서: 전과목 진행순 마스터 A표(2026-07-24 대표 확정, 판교 기준 첫 등장 순).
// 한 과목이 전임교수별로 갈리면 versions에 A안/B안으로 병기 (예: Transformer).
// type: 'main' = 담당 과목(subjects/lectures 데이터) · 'etc' = 타 강사 과목(otherCourses/otherDeep).
// 전임교수명은 정본(교재 저자·배정표)으로 확인된 것만 표기한다.
export const subjectCatalog = [
  { title: 'Git 이해/활용', versions: [{ type: 'main', id: 'git', plan: 'A안' }] },
  { title: 'HTML, CSS, JavaScript', versions: [{ type: 'etc', id: 'htmlcss', plan: 'A안' }] },
  { title: '데이터 분석 개요 및 기초통계', versions: [{ type: 'etc', id: 'stats', plan: 'A안' }] },
  { title: 'Prompt 설계와 Context Engineering', versions: [{ type: 'main', id: 'prompt', plan: 'A안' }] },
  {
    title: 'LLM과 Transformer 아키텍처',
    versions: [
      { type: 'main', id: 'transformer', plan: 'A안', professor: '박병선 전임교수' },
      { type: 'main', id: 'transformer2', plan: 'B안', professor: '임성열 전임교수' },
    ],
  },
  { title: 'Java, SpringBoot, Rest API 구현', versions: [{ type: 'etc', id: 'java', plan: 'A안' }] },
  { title: '데이터 분석을 위한 Python 이해', versions: [{ type: 'main', id: 'python', plan: 'A안' }] },
  { title: '실전 Feature Engineering', versions: [{ type: 'main', id: 'feature', plan: 'A안' }] },
  { title: '머신러닝 및 딥러닝 이해', versions: [{ type: 'main', id: 'ml-dl', plan: 'A안' }] },
  { title: '스마트 데이터 이해 및 활용', versions: [{ type: 'etc', id: 'smartdata', plan: 'A안' }] },
  { title: 'sLLM 구현 및 Fine Tunning', versions: [{ type: 'main', id: 'sllm', plan: 'A안', professor: '임성열 전임교수' }] },
  { title: '컨테이너 이해 및 애플리케이션 컨테이너화', versions: [{ type: 'etc', id: 'container', plan: 'A안' }] },
  { title: 'Front-Framework: Vue.js', versions: [{ type: 'main', id: 'vue', plan: 'A안', professor: '강병호 전임교수' }] },
  { title: 'Spring AI', versions: [{ type: 'main', id: 'spring-ai', plan: 'A안' }] },
  { title: 'Agile 방법론 및 MSA 개발', versions: [{ type: 'etc', id: 'agile', plan: 'A안' }] },
  { title: '웹 서비스 개발 mini-Project', versions: [{ type: 'main', id: 'webproject', plan: 'A안' }] },
  { title: '생성형 AI 서비스 개발의 이해/활용 (LangChain)', versions: [{ type: 'main', id: 'langchain', plan: 'A안' }] },
  { title: '모델 개발 및 최적화', versions: [{ type: 'main', id: 'modeldev', plan: 'A안' }] },
  { title: '쿠버네티스 이해 및 애플리케이션 배포', versions: [{ type: 'etc', id: 'k8s', plan: 'A안' }] },
  { title: '모델 서빙 및 AIOps 구성', versions: [{ type: 'main', id: 'serving', plan: 'A안' }] },
  { title: 'RAG Pipeline 설계 및 구축', versions: [{ type: 'main', id: 'rag', plan: 'A안', professor: '배기주 전임교수' }] },
  { title: 'Vector DB', versions: [{ type: 'main', id: 'vectordb', plan: 'A안', professor: '백정열 전임교수' }] },
  { title: '쿠버네티스 실무 심화', versions: [{ type: 'etc', id: 'k8s-adv', plan: 'A안' }] },
  { title: '데이터 분석 Mini-project', versions: [{ type: 'etc', id: 'datamini', plan: 'A안' }] },
  { title: 'AI Agent 설계 및 구축 (LangGraph)', versions: [{ type: 'main', id: 'agent', plan: 'A안', professor: '배기주 전임교수' }] },
  { title: 'AI Agent Capstone (MCP)', versions: [{ type: 'main', id: 'capstone', plan: 'A안' }] },
  { title: 'AI 서비스 개발 Mini-project', versions: [{ type: 'main', id: 'miniproject', plan: 'A안' }] },
  { title: 'DevOps 이해 및 활용', versions: [{ type: 'etc', id: 'devops', plan: 'A안' }] },
  { title: 'AI 프로젝트 방법론', versions: [{ type: 'etc', id: 'method', plan: 'A안' }] },
]
