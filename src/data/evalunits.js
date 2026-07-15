// 평가 단위 — "과목 × 담당 분반(강의일자)" 별 개별 평가를 위한 도출 데이터.
// 원천: adminschedule.js myPairings(반별 시간표_F 판독본). 과목을 여러 분반에 진행하면 분반마다 별도 단위.
import { myPairings } from './adminschedule'
import { subjectById } from './curriculum'

const CAMPUS_TRACK = { '광주': 'gj', '울산': 'us', '판교 4층': 'p4', '판교 5층': 'p5' }

const fmt = (d) => `${Number(d.slice(5, 7))}/${Number(d.slice(8, 10))}`

// [{ key, subjectId, subjectName, campus, cls, room, track, classNo, dates[], dateLabel }]
export const evalUnits = (() => {
  const map = new Map()
  for (const p of myPairings) {
    const key = `${p.subjectId}|${p.campus}|${p.cls}`
    if (!map.has(key)) {
      map.set(key, {
        key,
        subjectId: p.subjectId,
        subjectName: subjectById(p.subjectId)?.name || p.subject,
        campus: p.campus,
        cls: p.cls,
        room: p.room,
        track: CAMPUS_TRACK[p.campus],
        classNo: Number.parseInt(p.cls, 10) || null,
        dates: [],
      })
    }
    map.get(key).dates.push(p.date)
  }
  return [...map.values()]
    .map((u) => {
      u.dates.sort()
      u.dateLabel = u.dates.length === 1 ? fmt(u.dates[0]) : `${fmt(u.dates[0])}~${fmt(u.dates[u.dates.length - 1])}`
      return u
    })
    .sort((a, b) => a.dates[0].localeCompare(b.dates[0]))
})()

export const unitByKey = (key) => evalUnits.find((u) => u.key === key)

// 단위 표시명: "데이터 분석을 위한 Python 이해 — 울산 4반 · 7/15~7/16"
export const unitLabel = (u) => `${u.subjectName} — ${u.campus} ${u.cls} · ${u.dateLabel}`
