// 기타(타 강사 진행) 일정 — SK SKALA 4기 강사별 배정표(실시간 배정표, 2026-07-12 열람) 근거.
// 학생들이 담당(이애본) 강의 앞뒤에 배우는 과목을 트랙(분반)별로 확인하는 용도.
// 트랙: gj=광주 · us=울산 · p4=판교(4층) · p5=판교(5층)
// 셀 값: { c: 과목ID, by: '강사명' } — 과목ID는 othercontent(기타 신규) 또는 curriculum subjects(담당 과목의 타 반 진행)
// ※ 담당(이애본) 세션은 curriculum.js sessions 가 원본 — UI에서 ★로 병합 표시한다.
// ※ 10/5(월)~10/23(금) 구간은 배정표 스크린샷 미확보 — 확인 중(광주 담당 일정만 curriculum에 존재).

export const TRACKS = [
  { key: 'gj', label: '광주' },
  { key: 'us', label: '울산' },
  { key: 'p4', label: '판교 4층' },
  { key: 'p5', label: '판교 5층' },
]

// 특강·행사 라벨(과목 상세 없음)
export const EVENT_LABELS = {
  'ev-job': '특강(취업)',
  'ev-domain': '특강(도메인)',
  'ev-rest': '자체휴강',
  'team': '팀프로젝트',
  'team-check': '팀프로젝트(중간점검)',
  'final-pre': '최종평가(예선)',
  'final-main': '최종평가(본선) · 수료식',
}

export const otherSessions = [
  { date: '2026-07-14', gj: { c: 'git', by: '강병호' }, us: { c: 'git', by: '백정열' }, p4: { c: 'git', by: '권기창' } },
  { date: '2026-07-15', gj: { c: 'htmlcss', by: '강병호' }, p4: { c: 'htmlcss', by: '권기창' }, p5: { c: 'prompt', by: '박병선' } },
  { date: '2026-07-16', gj: { c: 'htmlcss', by: '강병호' }, p4: { c: 'htmlcss', by: '권기창' }, p5: { c: 'stats', by: '박병선' } },
  { date: '2026-07-20', gj: { c: 'python', by: '백정열' }, us: { c: 'smartdata', by: '최진철' }, p4: { c: 'stats', by: '이은호' }, p5: { c: 'stats', by: '박병선' } },
  { date: '2026-07-21', gj: { c: 'python', by: '백정열' }, us: { c: 'smartdata', by: '최진철' }, p4: { c: 'stats', by: '이은호' } },
  { date: '2026-07-22', gj: { c: 'smartdata', by: '백정열' }, us: { c: 'smartdata', by: '최진철' }, p4: { c: 'prompt', by: '임성열' } },
  { date: '2026-07-23', gj: { c: 'smartdata', by: '백정열' }, us: { c: 'htmlcss', by: '정윤석' }, p5: { c: 'htmlcss', by: '강병호' } },
  { date: '2026-07-24', gj: { c: 'smartdata', by: '백정열' }, us: { c: 'htmlcss', by: '정윤석' }, p5: { c: 'htmlcss', by: '강병호' } },
  { date: '2026-07-27', gj: { c: 'stats', by: '박병선' }, us: { c: 'stats', by: '배기주' }, p4: { c: 'java', by: '정윤석' }, p5: { c: 'smartdata', by: '백정열' } },
  { date: '2026-07-28', gj: { c: 'stats', by: '박병선' }, us: { c: 'stats', by: '배기주' }, p4: { c: 'java', by: '정윤석' }, p5: { c: 'smartdata', by: '백정열' } },
  { date: '2026-07-29', gj: { c: 'prompt', by: '박병선' }, us: { c: 'feature', by: '배기주' }, p4: { c: 'java', by: '정윤석' }, p5: { c: 'smartdata', by: '백정열' } },
  { date: '2026-07-30', gj: { c: 'transformer', by: '박병선' }, us: { c: 'java', by: '임성열' }, p4: { c: 'java', by: '정윤석' }, p5: { c: 'smartdata', by: '백정열' } },
  { date: '2026-07-31', gj: { c: 'transformer', by: '박병선' }, us: { c: 'java', by: '임성열' }, p4: { c: 'java', by: '정윤석' } },
  { date: '2026-08-03', gj: { c: 'java', by: '정윤석' }, us: { c: 'java', by: '임성열' }, p4: { c: 'python', by: '백정열' } },
  { date: '2026-08-04', gj: { c: 'java', by: '정윤석' }, us: { c: 'java', by: '임성열' }, p4: { c: 'python', by: '백정열' } },
  { date: '2026-08-05', gj: { c: 'java', by: '정윤석' }, us: { c: 'java', by: '임성열' }, p4: { c: 'feature', by: '박병선' } },
  { date: '2026-08-06', gj: { c: 'java', by: '정윤석' }, us: { c: 'agile', by: '임성열' }, p4: { c: 'ml-dl', by: '배기주' }, p5: { c: 'python', by: '백정열' } },
  { date: '2026-08-07', gj: { c: 'java', by: '정윤석' }, us: { c: 'agile', by: '임성열' }, p4: { c: 'ml-dl', by: '배기주' }, p5: { c: 'python', by: '백정열' } },
  { date: '2026-08-10', gj: { c: 'agile', by: '임성열' }, us: { c: 'vue', by: '강병호' }, p4: { c: 'ml-dl', by: '배기주' }, p5: { c: 'java', by: '이용우' } },
  { date: '2026-08-11', gj: { c: 'agile', by: '임성열' }, us: { c: 'vue', by: '강병호' }, p4: { c: 'smartdata', by: '백정열' }, p5: { c: 'java', by: '이용우' } },
  { date: '2026-08-12', gj: { c: 'sllm', by: '임성열' }, us: { c: 'vue', by: '강병호' }, p4: { c: 'smartdata', by: '백정열' }, p5: { c: 'java', by: '이용우' } },
  { date: '2026-08-13', gj: { c: 'sllm', by: '임성열' }, us: { c: 'vue', by: '강병호' }, p4: { c: 'smartdata', by: '백정열' }, p5: { c: 'java', by: '이용우' } },
  { date: '2026-08-14', gj: { c: 'feature', by: '이은호' }, us: { c: 'ev-job', by: '최헌영' }, p4: { c: 'smartdata', by: '백정열' }, p5: { c: 'java', by: '이용우' } },
  { date: '2026-08-18', us: { c: 'webproject', by: '권기창' }, p4: { c: 'sllm', by: '박병선' }, p5: { c: 'spring-ai', by: '정윤석' } },
  { date: '2026-08-19', us: { c: 'webproject', by: '권기창' }, p4: { c: 'sllm', by: '박병선' }, p5: { c: 'spring-ai', by: '정윤석' } },
  { date: '2026-08-20', us: { c: 'webproject', by: '권기창' }, p4: { c: 'container', by: '백정열' }, p5: { c: 'spring-ai', by: '정윤석' } },
  { date: '2026-08-21', us: { c: 'ev-domain' }, p4: { c: 'container', by: '백정열' }, p5: { c: 'container', by: '이용우' } },
  { date: '2026-08-24', gj: { c: 'container', by: '정윤석' }, us: { c: 'prompt', by: '최진철' }, p4: { c: 'vue', by: '강병호' }, p5: { c: 'container', by: '이용우' } },
  { date: '2026-08-25', gj: { c: 'container', by: '정윤석' }, us: { c: 'transformer', by: '권기창' }, p4: { c: 'vue', by: '강병호' }, p5: { c: 'ev-job', by: '최헌영' } },
  { date: '2026-08-26', gj: { c: 'k8s', by: '정윤석' }, us: { c: 'transformer', by: '권기창' }, p4: { c: 'vue', by: '강병호' }, p5: { c: 'agile', by: '임성열' } },
  { date: '2026-08-27', gj: { c: 'k8s', by: '정윤석' }, us: { c: 'sllm', by: '권기창' }, p4: { c: 'vue', by: '강병호' }, p5: { c: 'agile', by: '임성열' } },
  { date: '2026-08-28', gj: { c: 'ev-job', by: '최헌영' }, us: { c: 'sllm', by: '권기창' }, p4: { c: 'spring-ai', by: '이용우' } },
  { date: '2026-08-31', gj: { c: 'spring-ai', by: '정윤석' }, us: { c: 'ml-dl', by: '이은호' }, p4: { c: 'spring-ai', by: '이용우' } },
  { date: '2026-09-01', gj: { c: 'spring-ai', by: '정윤석' }, us: { c: 'ml-dl', by: '이은호' }, p4: { c: 'spring-ai', by: '이용우' } },
  { date: '2026-09-02', gj: { c: 'webproject', by: '강병호' }, us: { c: 'ml-dl', by: '이은호' }, p4: { c: 'agile', by: '임성열' } },
  { date: '2026-09-03', gj: { c: 'webproject', by: '강병호' }, us: { c: 'modeldev', by: '이은호' }, p4: { c: 'agile', by: '임성열' } },
  { date: '2026-09-04', gj: { c: 'webproject', by: '강병호' }, us: { c: 'modeldev', by: '이은호' }, p4: { c: 'ev-domain' }, p5: { c: 'ev-domain' } },
  { date: '2026-09-07', gj: { c: 'ml-dl', by: '박병선' }, us: { c: 'container', by: '이용우' }, p4: { c: 'ev-job', by: '최헌영' }, p5: { c: 'k8s', by: '정윤석' } },
  { date: '2026-09-08', gj: { c: 'ml-dl', by: '박병선' }, us: { c: 'container', by: '이용우' }, p5: { c: 'k8s', by: '정윤석' } },
  { date: '2026-09-09', gj: { c: 'ml-dl', by: '박병선' }, us: { c: 'spring-ai', by: '이용우' }, p5: { c: 'langchain', by: '이미애' } },
  { date: '2026-09-10', gj: { c: 'modeldev', by: '이은호' }, us: { c: 'spring-ai', by: '이용우' }, p5: { c: 'langchain', by: '이미애' } },
  { date: '2026-09-11', gj: { c: 'modeldev', by: '이은호' }, us: { c: 'k8s', by: '이용우' }, p5: { c: 'langchain', by: '이미애' } },
  { date: '2026-09-14', gj: { c: 'k8s-adv', by: '정윤석' }, us: { c: 'k8s', by: '이용우' }, p4: { c: 'langchain', by: '권기창' } },
  { date: '2026-09-15', gj: { c: 'k8s-adv', by: '정윤석' }, us: { c: 'serving', by: '이현민' }, p4: { c: 'langchain', by: '권기창' } },
  { date: '2026-09-16', gj: { c: 'k8s-adv', by: '정윤석' }, us: { c: 'serving', by: '이현민' }, p4: { c: 'modeldev', by: '박병선' } },
  { date: '2026-09-17', gj: { c: 'ev-domain' }, us: { c: 'serving', by: '이현민' }, p4: { c: 'modeldev', by: '박병선' } },
  { date: '2026-09-18', gj: { c: 'langchain', by: '권기창' }, us: { c: 'langchain', by: '임성열' }, p4: { c: 'k8s', by: '이용우' }, p5: { c: 'rag', by: '배기주' } },
  { date: '2026-09-21', gj: { c: 'langchain', by: '권기창' }, us: { c: 'langchain', by: '임성열' }, p4: { c: 'k8s', by: '이용우' }, p5: { c: 'rag', by: '배기주' } },
  { date: '2026-09-22', gj: { c: 'langchain', by: '권기창' }, us: { c: 'langchain', by: '임성열' }, p4: { c: 'serving', by: '이현민' }, p5: { c: 'rag', by: '배기주' } },
  { date: '2026-09-23', gj: { c: 'ev-rest' }, us: { c: 'ev-rest' }, p4: { c: 'ev-job', by: '최헌영' }, p5: { c: 'ev-job', by: '최헌영' } },
  { date: '2026-09-28', gj: { c: 'rag', by: '박병선' }, us: { c: 'rag', by: '배기주' }, p4: { c: 'serving', by: '이현민' } },
  { date: '2026-09-29', gj: { c: 'rag', by: '박병선' }, us: { c: 'rag', by: '배기주' }, p4: { c: 'serving', by: '이현민' } },
  { date: '2026-09-30', gj: { c: 'rag', by: '박병선' }, us: { c: 'rag', by: '배기주' }, p4: { c: 'rag', by: '권기창' } },
  { date: '2026-10-01', gj: { c: 'datamini', by: '박병선' }, us: { c: 'datamini', by: '배기주' }, p4: { c: 'rag', by: '권기창' } },
  { date: '2026-10-02', gj: { c: 'datamini', by: '박병선' }, us: { c: 'datamini', by: '배기주' }, p4: { c: 'rag', by: '권기창' } },
  // ── 10/5(월)~10/23(금): 배정표 확인 중 (광주 담당 일정은 좌측 날짜 목록 참조) ──
  { date: '2026-10-26', gj: { c: 'devops', by: '정윤석' }, us: { c: 'miniproject', by: '임성열' }, p4: { c: 'miniproject', by: '권기창' } },
  { date: '2026-10-27', gj: { c: 'method', by: '백정열' }, us: { c: 'method', by: '최진철' }, p4: { c: 'devops', by: '이용우' } },
  { date: '2026-10-28', gj: { c: 'team' }, us: { c: 'team' }, p4: { c: 'devops', by: '이용우' } },
  { date: '2026-10-29', gj: { c: 'team' }, us: { c: 'team' }, p4: { c: 'method', by: '백정열' }, p5: { c: 'method', by: '백정열' } },
  { date: '2026-10-30', gj: { c: 'team' }, us: { c: 'team' }, p4: { c: 'ev-domain' }, p5: { c: 'ev-domain' } },
]

// 11월 이후 — 전 트랙 공통 흐름 요약(일자 나열 대신 기간으로 안내)
export const otherPeriods = [
  { range: '2026-11-02 ~ 2026-12-09', label: '팀프로젝트 (반별 실습교수 로테이션 지도)', note: '중간점검: 11/12(광주·울산) · 11/20(판교), 도메인 특강 11/6' },
  { range: '2026-12-10 ~ 2026-12-11', label: '최종평가 (광주·울산)', note: '12/10 예선 · 12/11 본선 및 수료식(16시 종료)' },
  { range: '2026-12-14 ~ 2026-12-18', label: '팀프로젝트 마무리 · 최종평가 (판교)', note: '12/17 예선 · 12/18 본선 및 수료식' },
]

// 월별 그룹 { month:'2026-07', items:[...] }
export const otherByMonth = () => {
  const map = new Map()
  for (const s of otherSessions) {
    const m = s.date.slice(0, 7)
    if (!map.has(m)) map.set(m, [])
    map.get(m).push(s)
  }
  return [...map.entries()].map(([month, items]) => ({ month, items }))
}
