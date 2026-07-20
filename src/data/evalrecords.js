// 종합실습 평가 기록 — 완료된 평가의 산출물(엑셀)을 구글드라이브 링크로 보관한다.
//
// 왜 웹 입력이 아닌가 (2026-07-21 대표 확정):
//   평가는 슬랙으로 제출을 받아 로컬에서 엑셀로 집계하는 흐름이 이미 자리 잡았다.
//   사이트는 입력 도구가 아니라 "무엇을 언제 평가해 어디에 남겼는지"를 보는 기록 보관소 역할만 한다.
//
// 키(key)는 evalunits.js 의 평가 단위 키와 같다 — `<subjectId>|<campus>|<cls>`
// 파일은 드라이브 파일 ID만 담는다(원본은 리포에 두지 않는다 — docs.js 와 동일 원칙).
//
// 폴더 규칙 — 평가 건마다 구분 폴더를 둔다.
//   SKALA 4기 실습교수 자료 / 6. 종합실습 평가 기록 / <YYYY-MM-DD> <캠퍼스> <반> <과목>
//
// 추가 방법: 아래 배열에 한 건 추가하고 드라이브 폴더·파일 ID를 채운다.

export const EVAL_RECORDS = [
  {
    key: 'python|울산|4반',
    subjectName: '데이터 분석을 위한 Python 이해',
    campus: '울산',
    cls: '4반',
    dates: ['2026-07-15', '2026-07-16'],
    closedAt: '2026-07-20',           // 최종 마감일
    students: 33,                      // 평가 대상 인원
    submittedTo: '백정열 전임교수 (슬랙 DM) · 구글드라이브 종합실습평가 폴더',
    folder: 'https://drive.google.com/drive/folders/138nuNOmKLNo3DcIT-KqvreTBlrNkfNqW',
    files: [
      { t: '실습 시행_울산_파이썬_RAW (운영진 원본 양식 정본)', id: '130a5v1NA70GyO-ebkupXgwScQsOo7RCf', x: 'xlsx', b: 19742 },
      { t: 'SKALA4기_울산4반_성적표 (33명 × 6과제 요약)', id: '1KU-Oj2hx3lxIl1K5V1fGqSBc-q9401U0', x: 'xlsx', b: 12183 },
      { t: '울산4반_채점상세 (항목별 점수 + 우수사항·보완사항)', id: '1NG0ysg76TR3DNQj2eqqIHeTBOWiRdGiD', x: 'xlsx', b: 24330 },
      { t: '00_안내 (채점 기준·특이사항 요약)', id: '1IHMSierpwyo47chCoraBJaWdGWjDjfj7', x: 'txt', b: 1398 },
    ],
    notes: [
      '과제 6건 채점 — Practice 1~4, 종합실습 1·2.',
      '기한 초과는 일수와 무관하게 일괄 -5점(=95). 미제출만 F·0.',
      '근거는 슬랙 제출 스레드 + 개인 DM 전수 재판독.',
      'Practice 3·4는 원 양식에 열이 없어 S~U / V~X 열을 신설했다(4반만 기재).',
      '신*영 퇴소로 전 과제 F. 백*혁·안*준은 명단 외 추가(131·132행).',
    ],
  },
]

const byKey = new Map(EVAL_RECORDS.map((r) => [r.key, r]))
export const recordFor = (key) => byKey.get(key) || null
export const isEvaluated = (key) => byKey.has(key)
export const evaluatedCount = EVAL_RECORDS.length
