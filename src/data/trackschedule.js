// 분반(트랙) 수강 일정 — 담당(이애본) 세션 + 타 강사 진행(othersessions) 병합.
// 학습관리·대시보드에서 "우리 반이 실제 수강하는 날짜" 기준으로 사용한다.
import { sortedSessions, subjectById } from './curriculum'
import { otherSessions, EVENT_LABELS } from './othersessions'
import { otherCourses } from './othercontent'
import { trackOfSession } from './classes'

export function trackSchedule(track) {
  const items = new Map() // date → item
  for (const s of sortedSessions()) {
    if (trackOfSession(s) !== track) continue
    const subj = subjectById(s.subjectId)
    items.set(s.date, {
      date: s.date, weekday: s.weekday, name: subj?.name || s.subjectId,
      by: '이애본', mine: true, link: `/lectures/${s.date}`,
    })
  }
  for (const s of otherSessions) {
    const cell = s[track]
    if (!cell || items.has(s.date)) continue
    const subj = subjectById(cell.c)
    const etc = otherCourses[cell.c]
    const name = etc?.name || subj?.name || EVENT_LABELS[cell.c] || cell.c
    const link = etc
      ? `/lectures/etc-${cell.c}`
      : subj
        ? (sortedSessions().find((x) => x.subjectId === cell.c) ? `/lectures/${sortedSessions().find((x) => x.subjectId === cell.c).date}` : `/lectures/ref-${cell.c}-1`)
        : null
    items.set(s.date, { date: s.date, name, by: cell.by || '', mine: false, link, event: !etc && !subj })
  }
  return [...items.values()].sort((a, b) => a.date.localeCompare(b.date))
}
