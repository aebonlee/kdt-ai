// 분반(트랙) 수강 일정 — 담당(이애본) 세션 + 타 강사 진행(othersessions) 병합.
// 학습관리·대시보드에서 "우리 반이 실제 수강하는 날짜" 기준으로 사용한다.
import { sortedSessions, subjectById } from './curriculum'
import { otherSessions, EVENT_LABELS } from './othersessions'
import { otherCourses } from './othercontent'
import { trackOfSession } from './classes'
import { myPairings } from './adminschedule'
import { authorOf } from './currihours'

// 날짜 → 내 페어링(주강사 lead) 조회용 — 담당 세션은 날짜가 유일하다.
const pairingByDate = new Map(myPairings.map((p) => [p.date, p]))

export function trackSchedule(track) {
  const items = new Map() // date → item
  for (const s of sortedSessions()) {
    if (trackOfSession(s) !== track) continue
    const subj = subjectById(s.subjectId)
    const pr = pairingByDate.get(s.date)
    items.set(s.date, {
      date: s.date, weekday: s.weekday, name: subj?.name || s.subjectId,
      by: '이애본', mine: true, link: `/lectures/${s.date}`,
      // 주강사 = 그날 라인업 중 교안 저자, 실습강사 = 이애본(대타일은 대타 강사)
      leadBy: pr?.lead?.join(' · ') || authorOf(s.subjectId), practiceBy: pr?.substitute || '이애본',
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
    items.set(s.date, {
      date: s.date, name, by: cell.by || '', mine: false, link, event: !etc && !subj,
      // 주강사 = 커리큘럼상 교안 작성자, 실습강사 = 반별 시간표상 그날 교실 진행 강사
      leadBy: authorOf(cell.c), practiceBy: cell.by || '',
    })
  }
  return [...items.values()].sort((a, b) => a.date.localeCompare(b.date))
}
