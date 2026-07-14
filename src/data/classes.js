// SKALA 4기 분반(18개반) 정의 — ★ 4기 강사 반별 시간표_F(260710 확정본) 기준.
// 학생은 소속 반 교실 고정, 강사가 캠퍼스로 이동하며 강의한다.
// track 키는 othersessions.js TRACKS 와 동일(gj/us/p4/p5).

export const TRACK_LABELS = {
  gj: '광주',
  us: '울산',
  p4: '판교 4층',
  p5: '판교 5층',
}

// 캠퍼스(track)별 반 목록 — no: 반 번호, room: 강의실
export const CLASS_MAP = {
  gj: [
    { no: 1, room: '201호' },
    { no: 2, room: '202호' },
    { no: 3, room: '204호' },
    { no: 4, room: '205호' },
  ],
  us: [
    { no: 1, room: '201호' },
    { no: 2, room: '202호' },
    { no: 3, room: '203호' },
    { no: 4, room: '204호' },
  ],
  p4: [
    { no: 1, room: '401호' },
    { no: 2, room: '402호' },
    { no: 3, room: '403호' },
    { no: 4, room: '404호' },
    { no: 5, room: '405호' },
  ],
  p5: [
    { no: 6, room: '501호' },
    { no: 7, room: '502호' },
    { no: 8, room: '503호' },
    { no: 9, room: '504호' },
    { no: 10, room: '505호' },
  ],
}

// "판교 5층 7반" 같은 표시 문자열
export const classLabel = (track, classNo) => {
  if (!track) return ''
  const label = TRACK_LABELS[track] || track
  return classNo ? `${label} ${classNo}반` : label
}

// 담당(이애본) 세션의 track 판별 — build-textbook trackOf 와 동일 규칙
export const trackOfSession = (s) =>
  s.region === '광주' ? 'gj' : s.region === '울산' ? 'us' : s.klass === '4층' ? 'p4' : 'p5'
