// CI 스모크 테스트 — 빌드 후 데이터 정합성·산출물을 검증한다 (브라우저 불필요, 수 초 내 완료)
// 사용: npm run build && npm run smoke   (실패 시 exit 1 → 배포 차단)
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
let failed = 0
const ok = (msg) => console.log(`  ✓ ${msg}`)
const fail = (msg) => { failed++; console.error(`  ✗ ${msg}`) }
const assert = (cond, msg) => (cond ? ok(msg) : fail(msg))

// ── 1. 커리큘럼·강의 데이터 정합성 ─────────────────────────────
console.log('\n[1] 커리큘럼·강의 데이터')
const { subjects, sessions } = await import(join(ROOT, 'src/data/curriculum.js'))
const totalDays = subjects.reduce((a, s) => a + s.days.length, 0)
ok(`과목 ${subjects.length}개 · 일차 ${totalDays}개`)

// 세션이 유효한 과목·일차를 가리키는가
const badSessions = sessions.filter((s) => {
  const subj = subjects.find((x) => x.id === s.subjectId)
  return !subj || s.day < 1 || s.day > subj.days.length
})
assert(badSessions.length === 0, `세션 ${sessions.length}건 참조 유효` + (badSessions.length ? ` — 오류: ${badSessions.map((s) => s.date).join(',')}` : ''))

// 모든 과목-일차가 강의 자료를 완비했는가 (실습·Lab·예제·시간표·핵심개념)
const { examplesFor } = await import(join(ROOT, 'src/data/lectureexamples.js'))
const missing = []
for (const s of subjects) {
  const mod = (await import(join(ROOT, `src/data/lectures/${s.id}.js`))).default
  for (let d = 1; d <= s.days.length; d++) {
    const dd = mod[`${s.id}-${d}`]
    if (!dd) { missing.push(`${s.id}-${d}: 데이터 없음`); continue }
    if (!dd.plan?.practice) missing.push(`${s.id}-${d}: 실습(practice) 없음`)
    if (!dd.detail?.labs?.length) missing.push(`${s.id}-${d}: Lab 없음`)
    if (!(dd.periods?.length || dd.plan?.schedule?.length)) missing.push(`${s.id}-${d}: 시간표 없음`)
    if (!dd.concepts?.length) missing.push(`${s.id}-${d}: 핵심개념 없음`)
    const ex = examplesFor(s.id, d)
    if (ex.length < 3) missing.push(`${s.id}-${d}: 예제 ${ex.length}개(<3)`)
    for (const e of ex) if (!e.title || !e.lang || !e.code) missing.push(`${s.id}-${d}: 예제 필드 누락(${e.title || '무제'})`)
  }
}
assert(missing.length === 0, `전 일차 실습·Lab·시간표·개념·예제(3+) 완비` + (missing.length ? `\n    - ${missing.slice(0, 8).join('\n    - ')}` : ''))

// ── 2. 평가기준·퀴즈 형식 ────────────────────────────────────
console.log('\n[2] 평가기준·퀴즈')
const { exams } = await import(join(ROOT, 'src/data/exams.js'))
const { otherExams } = await import(join(ROOT, 'src/data/otherexams.js'))
const { otherCourses } = await import(join(ROOT, 'src/data/othercontent.js'))
const { examsAlt } = await import(join(ROOT, 'src/data/exams.js')).then((m) => ({ examsAlt: m.examsAlt }))
const { quizzes } = await import(join(ROOT, 'src/data/quizzes.js'))
const subjectIds = new Set(subjects.map((s) => s.id))

const badExam = Object.entries(exams).filter(([k, e]) => !subjectIds.has(k) || !e.purpose || !e.criteria?.length)
assert(Object.keys(exams).length >= 12 && badExam.length === 0, `평가기준 ${Object.keys(exams).length}과목 형식 유효`)

let quizIssues = []
for (const [k, arr] of Object.entries(quizzes)) {
  if (!subjectIds.has(k)) quizIssues.push(`${k}: 존재하지 않는 과목`)
  if (arr.length < 5) quizIssues.push(`${k}: 문항 ${arr.length}개(<5)`)
  arr.forEach((q, i) => {
    if (!q.type || !q.q || q.answer === undefined || !q.explain) quizIssues.push(`${k}#${i + 1}: 필드 누락`)
    if (q.type === 'choice' && (!Array.isArray(q.choices) || q.choices.length !== 4 || q.answer < 0 || q.answer >= q.choices.length))
      quizIssues.push(`${k}#${i + 1}: choice 형식 오류`)
    if (q.type === 'ox' && q.answer !== 'O' && q.answer !== 'X') quizIssues.push(`${k}#${i + 1}: ox 답 오류`)
  })
}
const quizTotal = Object.values(quizzes).flat().length
assert(Object.keys(quizzes).length === subjects.length && quizIssues.length === 0,
  `퀴즈 ${Object.keys(quizzes).length}/${subjects.length}과목 ${quizTotal}문항 형식 유효` + (quizIssues.length ? `\n    - ${quizIssues.slice(0, 8).join('\n    - ')}` : ''))

// ── 3. 빌드 산출물 ───────────────────────────────────────────
console.log('\n[3] 빌드 산출물 (dist/)')
const dist = join(ROOT, 'dist')
for (const f of ['index.html', 'CNAME', 'practice-textbook.html', 'brandLogo.png']) {
  assert(existsSync(join(dist, f)), `dist/${f} 존재`)
}

if (existsSync(join(dist, 'index.html'))) {
  // index.html이 참조하는 자산이 실제로 존재하는가 (배포 후 404 예방)
  const html = readFileSync(join(dist, 'index.html'), 'utf8')
  const refs = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((m) => m[1])
  const gone = refs.filter((r) => !existsSync(join(dist, r)))
  assert(refs.length > 0 && gone.length === 0, `index.html 자산 ${refs.length}건 존재` + (gone.length ? ` — 누락: ${gone.join(',')}` : ''))
}

if (existsSync(join(dist, 'practice-textbook.html'))) {
  const pt = readFileSync(join(dist, 'practice-textbook.html'), 'utf8')
  const pages = (pt.match(/class="page[ "]/g) || []).length
  const quizSecs = (pt.match(/📝 복습 퀴즈/g) || []).length
  const examSecs = (pt.match(/📋 종합실습 평가기준/g) || []).length
  // 개요 + 담당 과목 + 담당외 개요 + 담당외 과목별 개별 페이지
  const expectedPages = subjects.length + 2 + Object.keys(otherCourses).length
  assert(pages === expectedPages, `실습교안 페이지 ${pages} = 개요+${subjects.length}과목+기타개요+담당외 ${Object.keys(otherCourses).length}과목`)
  assert(quizSecs === Object.keys(quizzes).length, `실습교안 퀴즈 섹션 ${quizSecs}`)
  // 담당 과목 평가기준 + 담당일정 외 참고용 평가기준(otherexams)이 함께 수록된다
  assert(examSecs === Object.keys(exams).length + Object.keys(otherExams).length, `실습교안 평가기준 섹션 ${examSecs} = 담당 ${Object.keys(exams).length} + 참고 ${Object.keys(otherExams).length}`)
  const altSecs = (pt.match(/📑 전임교수 평가안/g) || []).length
  assert(altSecs === Object.keys(examsAlt).length, `실습교안 전임교수 평가안 ${altSecs}`)
  assert(!pt.includes('&amp;lt;') && !pt.includes('&amp;gt;'), '이중 이스케이프 없음')
  assert(pt.includes('class="copy-btn"') && pt.includes('class="cmt"'), '복사 버튼·녹색 주석 존재')
}

// ── 결과 ────────────────────────────────────────────────────
console.log(failed ? `\n✗ 스모크 테스트 실패 ${failed}건 — 배포 중단` : '\n✓ 스모크 테스트 전부 통과')
process.exit(failed ? 1 : 0)
