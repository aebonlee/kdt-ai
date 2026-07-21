// 학습추천사이트 — 이애본 강사(드림아이티비즈)가 제자들을 위해 만들어 운영하는 학습 사이트 11곳.
// 디자인보다 콘텐츠 중심으로 개발, 내용 검증 완료. 매일 과정 학습이 우선 — 귀가 후 틈틈이 단계별 정복 권장.

export const RECOMMEND_NOTICE = {
  login: '드림아이티비즈 학습 사이트들은 회원 계정을 공유합니다 — 한 번 가입한 계정(구글·카카오)으로 모든 사이트에 그대로 로그인할 수 있어 사이트마다 다시 가입할 필요가 없습니다.',
  usage: '매일 집중해야 하는 과정 학습이 우선입니다. 귀가 후 틈틈이, 하나씩 단계별로 정복해 보세요.',
}

export const RECOMMEND_GROUPS = [
  {
    name: '자격증 대비',
    icon: '📜',
    desc: '취업·이직에 바로 쓰이는 IT 자격증을 과목별로 준비합니다.',
    sites: [
      { url: 'https://aice.dreamitbiz.com/', name: 'AICE 자격증 학습', desc: 'KT AICE(AI 능력시험) 자격증 대비 — AI 기초부터 실기형 문제까지', tag: 'KT AICE' },
      { url: 'https://aws.dreamitbiz.com/', name: 'AWS 자격증 학습', desc: 'AWS 공인 자격증(클라우드) 대비 학습', tag: 'AWS', badge: '🎟️ 응시 쿠폰 발행 안내', badgeDesc: 'AWS 자격증 응시 쿠폰(바우처) 발행을 안내합니다 — 사이트 내 공지를 확인하세요.' },
      { url: 'https://eip.dreamitbiz.com/', name: '정보처리 자격증 학습', desc: '정보처리기사 필기·실기 이론 대비', tag: '정보처리' },
      { url: 'https://coding.dreamitbiz.com/', name: '정보처리 실기 코딩 학습', desc: '정보처리 실기 대비 C · Java · Python 3개 언어 코딩 집중 학습', tag: '정보처리 실기' },
      { url: 'https://linux-study.dreamitbiz.com/', name: '리눅스 마스터 자격증 학습', desc: '리눅스 마스터 자격증 대비 — 명령어·시스템 관리 실습', tag: '리눅스 마스터' },
    ],
  },
  {
    name: '프로그래밍 · CS 기초',
    icon: '💻',
    desc: '언어와 컴퓨터과학 기본기 — 과정 수강과 코딩테스트의 바탕이 됩니다.',
    sites: [
      { url: 'https://python-study.dreamitbiz.com/', name: '파이썬 학습', desc: '파이썬 기초부터 활용까지 — 데이터분석·AI 과목의 기반 언어', tag: 'Python' },
      { url: 'https://java-study.dreamitbiz.com/', name: '자바 학습', desc: '자바 문법·객체지향 — Java/SpringBoot 과목 예습·복습에 적합', tag: 'Java' },
      { url: 'https://data-structure.dreamitbiz.com/', name: '자료구조 학습', desc: '배열·리스트·트리·해시 등 핵심 자료구조 개념과 구현', tag: 'CS 기초' },
      { url: 'https://algorithm.dreamitbiz.com/', name: '알고리즘 학습', desc: '정렬·탐색·그래프 등 알고리즘 유형별 학습 — 코딩테스트 대비', tag: 'CS 기초' },
    ],
  },
  {
    name: '심화 · 종합',
    icon: '🚀',
    desc: '기본기를 넘어 종합 역량으로 — 프로젝트와 데이터 감각을 키웁니다.',
    sites: [
      { url: 'https://bootcamp.dreamitbiz.com/', name: '부트캠프', desc: '단계별 커리큘럼으로 완주하는 종합 개발 부트캠프', tag: '종합' },
      { url: 'https://statistics.dreamitbiz.com/', name: '통계 학습', desc: '기초통계 지식 정리 — 데이터분석·머신러닝 과목의 수학적 바탕', tag: '통계' },
    ],
  },
]
