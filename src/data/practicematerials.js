// 담당 수업일에 공유된 실습 파일 — 실습강의안(날짜 페이지)에서 해설과 함께 다운로드.
// href가 /materials/* 면 사이트 직접 다운로드, external이면 슬랙 원본(로그인 필요).
// 환경설정(requirements)·수업 중 배포분도 여기에 — 교과목별 강의안에는 싣지 않는다(대표 확정 원칙).
export const practiceMaterials = {
  '2026-07-21': {
    items: [
      { href: '/materials/transformer_minimodel_practice.ipynb', label: 'transformer_minimodel_practice.ipynb', desc: '미니 언어모델(charGPT) 종합실습 노트북(박병선 전임교수)' },
      { href: '/materials/input_kr.txt', label: 'input_kr.txt', desc: '미니모델 학습용 한국어 코퍼스' },
      { href: '/materials/paper-attention.pdf', label: 'paper-attention.pdf', desc: '원논문 "Attention Is All You Need"' },
    ],
  },
  '2026-07-22': {
    items: [
      { href: '/materials/transformer_minimodel_practice.ipynb', label: 'transformer_minimodel_practice.ipynb', desc: '조별 Activity baseline — 변수 2종 이상 바꿔 개선 실험' },
      { href: '/materials/input_kr.txt', label: 'input_kr.txt', desc: '미니모델 학습용 한국어 코퍼스' },
    ],
    notes: [
      '■ 조별 Activity — baseline 개선 실험(변수 2종+) 발표 (조별 제출)',
      '■ 개인 Activity — 1~2p 개발해석 보고서, 7.26(일) 24:00 마감 (개인 제출)',
    ],
  },
  '2026-07-23': {
    items: [
      { href: '/materials/practice_1-1.ipynb', label: 'practice_1-1.ipynb', desc: 'LSTM 문장 생성(개인 1)' },
      { href: '/materials/practice_1-2.ipynb', label: 'practice_1-2.ipynb', desc: 'Transformer(GPT-2) 문장 생성(개인 2)' },
      { href: '/materials/practice_0.ipynb', label: 'practice_0.ipynb', desc: '프롬프트 실습 CoT·SC·ReAct(개인 3)' },
      { href: '/materials/requirements-llm.txt', label: 'requirements-llm.txt', desc: '환경설정 — 실습1·2(LSTM·GPT-2·CrewAI)용 패키지' },
      { href: '/materials/requirements-prompt.txt', label: 'requirements-prompt.txt', desc: '환경설정 — practice_0(프롬프트·RAG)용 패키지' },
      { href: '/materials/paper-attention.pdf', label: 'paper-attention.pdf', desc: '원논문 "Attention Is All You Need"' },
    ],
    notes: [
      '■ 개인 과제 — 개인코드 3종 실행 후 1페이지 보고서 (개인 제출, 7.23 24:00 마감)',
    ],
  },
  '2026-07-24': {
    items: [
      { href: '/materials/practice_2.CrewAI_Agent_System.ipynb', label: 'practice_2.CrewAI_Agent_System.ipynb', desc: '에이전트 팀 개발(팀)' },
      { href: '/materials/fashion_coordinator.ipynb', label: 'fashion_coordinator.ipynb', desc: '실습2 발표과제 템플릿(임성열 전임교수 추가 공유)' },
      { href: '/materials/fashion_data.csv', label: 'fashion_data.csv', desc: '템플릿용 옷장 데이터(100벌)' },
      { href: '/materials/requirements-llm.txt', label: 'requirements-llm.txt', desc: '환경설정 — CrewAI 실습용 패키지' },
      { href: 'https://theskala.slack.com/files/U0BBXL5DH3L/F0BKA44E3LK/', label: '코드이해_개인과제_템플릿.docx', desc: '개인과제 코드이해 템플릿(임성열 전임교수, 7/24 오전 공유)', external: true },
      { href: 'https://theskala.slack.com/files/U0BBXL5DH3L/F0BLAM00T5E/', label: '실습_개념+종합_쉬운설명.pdf', desc: '실습 교안 쉬운 설명판(임성열 전임교수, 7/24 오전 공유)', external: true },
      { href: 'https://theskala.slack.com/files/U0BBXL5DH3L/F0BK9105726/', label: '[템플릿-예시] AI 서브노트.docx', desc: '학습 정리용 서브노트 템플릿(임성열 전임교수, 7/23 공유)', external: true },
    ],
    notes: [
      '■ 팀 과제 — CrewAI 팀 구현 + 발표자료(최소 3p: 시나리오·Biz 가치 / 설계 근거 / 실행 결과), 발표 후 7.24 24:00 마감 (팀당 1댓글 제출)',
      '■ 평가 — Biz 가치 40 · 기술 이해도 30 · 수업 충실도 30, 제출물에 팀원 역할 명시',
    ],
  },
}
