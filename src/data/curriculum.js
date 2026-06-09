// ─────────────────────────────────────────────────────────────
// SKALA 4기 커리큘럼 데이터
//
// ⚠️ 아래 subjects / sessions 는 구조 확인용 "샘플" 데이터입니다.
//    대표님이 공유하실 엑셀/이미지(=> /reference 폴더) 기준으로
//    실제 과목·일자·학습내용을 채워 넣으면 됩니다.
//
// 데이터 모델
//   subject : 과목(모듈) 한 개          { id, name, color, summary }
//   session : 특정 "일자"의 수업 한 회   { date, weekday, week, subjectId, title, objectives[], contents[], materials[] }
//
//   color 는 tailwind.config.js 의 팔레트 키(navy/ocean/azure/sky/amber) 중 하나.
// ─────────────────────────────────────────────────────────────

export const subjects = [
  {
    id: 'ai-foundation',
    name: 'AI Foundation',
    color: 'azure',
    summary: 'AI/ML 기초 이론과 Python 기반 실습으로 토대를 다지는 입문 과정',
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    color: 'ocean',
    summary: '신경망·CNN·RNN·Transformer 등 딥러닝 핵심 아키텍처 학습',
  },
  {
    id: 'llm-app',
    name: 'LLM & Application',
    color: 'sky',
    summary: 'LLM/RAG/에이전트를 활용한 AI 애플리케이션 개발',
  },
  {
    id: 'team-project',
    name: 'Team Project',
    color: 'amber',
    summary: 'SK 실제 비즈니스 문제 해결을 위한 리얼 팀 프로젝트',
  },
]

export const sessions = [
  {
    date: '2026-07-06',
    weekday: '월',
    week: 1,
    subjectId: 'ai-foundation',
    title: '오리엔테이션 & AI 개요',
    objectives: ['과정 전반 이해', 'AI/ML/DL 개념 구분'],
    contents: ['SKALA 4기 OT', 'AI 트렌드와 SK의 AI 전략', '개발 환경 셋업'],
    materials: [],
  },
  {
    date: '2026-07-07',
    weekday: '화',
    week: 1,
    subjectId: 'ai-foundation',
    title: 'Python for AI (1)',
    objectives: ['Python 핵심 문법 복습', 'NumPy 기초'],
    contents: ['자료구조/제어문', 'NumPy 배열 연산', '실습'],
    materials: [],
  },
  {
    date: '2026-07-08',
    weekday: '수',
    week: 1,
    subjectId: 'ai-foundation',
    title: '데이터 분석 기초',
    objectives: ['Pandas 데이터 핸들링', '시각화 기초'],
    contents: ['Pandas DataFrame', 'Matplotlib/Seaborn', 'EDA 실습'],
    materials: [],
  },
  {
    date: '2026-07-13',
    weekday: '월',
    week: 2,
    subjectId: 'deep-learning',
    title: '신경망 기초',
    objectives: ['퍼셉트론/역전파 이해', 'PyTorch 첫걸음'],
    contents: ['신경망 구조', '경사하강법', 'PyTorch 텐서'],
    materials: [],
  },
  {
    date: '2026-07-14',
    weekday: '화',
    week: 2,
    subjectId: 'deep-learning',
    title: 'CNN과 이미지 분류',
    objectives: ['합성곱 연산 이해', '이미지 분류 모델 구현'],
    contents: ['Convolution/Pooling', '대표 CNN 아키텍처', '실습: 이미지 분류'],
    materials: [],
  },
  {
    date: '2026-09-01',
    weekday: '화',
    week: 9,
    subjectId: 'llm-app',
    title: 'LLM & RAG 개요',
    objectives: ['LLM 동작 원리 이해', 'RAG 파이프라인 설계'],
    contents: ['Transformer 복습', '프롬프트 엔지니어링', 'RAG 구성요소'],
    materials: [],
  },
  {
    date: '2026-11-02',
    weekday: '월',
    week: 18,
    subjectId: 'team-project',
    title: '팀 프로젝트 킥오프',
    objectives: ['주제 선정', '팀 구성 및 역할 분담'],
    contents: ['현업 인터뷰 공유', '문제 정의', '프로젝트 계획 수립'],
    materials: [],
  },
]

// ── 조회 헬퍼 ──
export const subjectById = (id) => subjects.find((s) => s.id === id)

export const sessionsBySubject = (id) =>
  sessions.filter((s) => s.subjectId === id).sort((a, b) => a.date.localeCompare(b.date))

export const sessionByDate = (date) => sessions.find((s) => s.date === date)

export const sortedSessions = () =>
  [...sessions].sort((a, b) => a.date.localeCompare(b.date))

// 주차별 그룹 { week, items[] }
export const sessionsByWeek = () => {
  const map = new Map()
  for (const s of sortedSessions()) {
    if (!map.has(s.week)) map.set(s.week, [])
    map.get(s.week).push(s)
  }
  return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([week, items]) => ({ week, items }))
}
