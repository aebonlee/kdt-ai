// SKALA 4기 강의안 → A4 PDF 교재용 HTML 생성기
// 사용: node scripts/build-textbook.mjs  → dist-textbook/textbook.html
// 이후 Chrome 헤드리스 --print-to-pdf 로 PDF 변환 (scripts/make-textbook-pdf.sh)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { subjects, sessions } from '../src/data/curriculum.js'
import { PERIOD_TIMES } from '../src/data/lectureperiods.js'
import { modeOf, periodTagsOf } from '../src/data/lecturemodes.js'
import { exams, examsAlt } from '../src/data/exams.js'
import { quizzes } from '../src/data/quizzes.js'
import { otherCourses } from '../src/data/othercontent.js'
import { otherDeep } from '../src/data/otherdeep.js'
import { otherExams } from '../src/data/otherexams.js'
import { otherSessions, otherPeriods, TRACKS, EVENT_LABELS } from '../src/data/othersessions.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const WEB = process.argv.includes('--web')

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escNl = (s) => esc(s).replace(/\n/g, '<br>')

// 코드 주석 녹색 처리 — 사이트 CodeBlock.jsx 와 동일한 감지 로직 이식.
const LINE_TOKEN = {
  python: '#', py: '#', bash: '#', sh: '#', shell: '#', yaml: '#', yml: '#',
  docker: '#', dockerfile: '#', ruby: '#', r: '#', toml: '#', ini: '#', text: '#',
  javascript: '//', js: '//', jsx: '//', ts: '//', typescript: '//', java: '//',
  c: '//', cpp: '//', go: '//', kotlin: '//', swift: '//', sql: '--',
}
function codeSegs(line, lang) {
  if (lang === 'html' || lang === 'vue' || lang === 'xml' || lang === 'svg') {
    const a = line.indexOf('<!--')
    if (a !== -1) return [{ t: line.slice(0, a) }, { t: line.slice(a), c: true }]
  }
  const tok = LINE_TOKEN[lang]
  if (tok) {
    for (let i = 0; i < line.length; i++) {
      if (line.startsWith(tok, i)) {
        const before = i === 0 ? '' : line[i - 1]
        if (i === 0 || before === ' ' || before === '\t') {
          return [{ t: line.slice(0, i) }, { t: line.slice(i), c: true }]
        }
      }
    }
  }
  return [{ t: line }]
}
// 언어별 라인 주석을 녹색(.cmt)으로 감싸며 HTML 이스케이프
const hlCode = (code, lang) =>
  String(code).split('\n')
    .map((ln) => codeSegs(ln, (lang || '').toLowerCase())
      .map((s) => (s.c ? `<span class="cmt">${esc(s.t)}</span>` : esc(s.t))).join(''))
    .join('\n')

// 분반 반복 여부 (표지·과목 헤더 표기용)
const bySub = {}
for (const s of sessions) (bySub[s.subjectId] = bySub[s.subjectId] || []).push(`${s.region}${s.klass}`)
const classesOf = (id) => [...new Set(bySub[id] || [])]

// 담당 세션이 있는 과목 순서(첫 강의일) + 참고자료 과목은 뒤에
const firstDate = (id) => (bySub[id] ? [...bySub[id]] && sessions.filter((s) => s.subjectId === id).map((s) => s.date).sort()[0] : null)
const taught = subjects.filter((s) => bySub[s.id]).sort((a, b) => firstDate(a.id).localeCompare(firstDate(b.id)))
const refs = subjects.filter((s) => !bySub[s.id])
const ordered = [...taught, ...refs]

const modeClass = (tag) =>
  tag === '종합실습' ? 'm-full' : tag === '실습' ? 'm-lab' : tag === '이론+실습' ? 'm-mix' : 'm-theory'

async function load(id) {
  const mod = await import(`../src/data/lectures/${id}.js`)
  return mod.default
}

function sectionPeriods(dd, subjectId, day) {
  const periods = dd.periods
  const plan = dd.plan
  const tags = periodTagsOf(subjectId, day)
  if (periods) {
    let rows = ''
    PERIOD_TIMES.forEach((slot, j) => {
      if (slot.lunch) {
        rows += `<tr><td class="pt">${esc(slot.time)}</td><td class="lunch">점심 휴식</td></tr>`
        return
      }
      const ci = j < 3 ? j : j - 1
      const tag = tags?.[ci]
      rows += `<tr><td class="pt"><b>${esc(slot.label)}</b><br><span class="pt-time">${esc(slot.time)}</span></td>` +
        `<td>${esc(periods[ci] || '')}${tag ? ` <span class="tag ${modeClass(tag)}">${esc(tag)}</span>` : ''}</td></tr>`
    })
    return `<table class="plan">${rows}</table>`
  }
  if (plan?.schedule) {
    let rows = ''
    for (const r of plan.schedule) {
      rows += r.lunch
        ? `<tr><td class="pt">${esc(r.time)}</td><td class="lunch">${esc(r.topic)}</td></tr>`
        : `<tr><td class="pt">${esc(r.time)}</td><td><b>${esc(r.topic)}</b>${r.detail ? `<br><span class="pd">${esc(r.detail)}</span>` : ''}</td></tr>`
    }
    return `<table class="plan">${rows}</table>`
  }
  return ''
}

// 종합실습 평가기준·제출물 (과목 첫날에 노출) — 기타 과목(참고용)·타 강사판(examsAlt)도 같은 렌더 사용
function renderExam(subjectId, examData, title) {
  const e = examData || exams[subjectId]
  if (!e) return ''
  const variantChip = e.variant ? ` <span class="thin">· ${esc(e.variant)}</span>` : ''
  let h = `<h4 class="sec">${title || '📋 종합실습 평가기준 · 제출물'}${variantChip}</h4>`
  if (e.purpose) h += `<div class="box tips"><div class="box-h">🎯 실습 목적</div><p style="margin:0;font-size:14px;color:var(--ink-2,#3a3f66)">${escNl(e.purpose)}</p></div>`
  if (e.tasks?.length) {
    h += `<div class="exam-sub">실습 구성</div><table class="plan"><tr><td class="pt"><b>실습명</b></td><td><b>주요 활동</b></td><td class="pt" style="width:60px"><b>시간</b></td></tr>` +
      e.tasks.map((t) => `<tr><td class="pt">${esc(t.name)}</td><td>${escNl(t.activity)}</td><td class="pt">${esc(t.time || '')}</td></tr>`).join('') + `</table>`
  }
  if (e.criteria?.length) {
    h += `<div class="exam-sub">평가 항목</div><table class="plan"><tr><td class="pt"><b>평가 항목</b></td><td><b>평가 내용</b></td>${e.criteria.some((c) => c.points) ? '<td class="pt" style="width:64px"><b>배점</b></td>' : ''}</tr>` +
      e.criteria.map((c) => `<tr><td class="pt">${esc(c.item)}</td><td>${escNl(c.desc)}</td>${e.criteria.some((x) => x.points) ? `<td class="pt">${esc(c.points || '')}</td>` : ''}</tr>`).join('') + `</table>`
  }
  if (e.deliverables?.length) {
    h += `<div class="box practice"><div class="box-h">📦 제출 · 필수 항목</div><ul>` +
      e.deliverables.map((d) => `<li>${esc(d)}</li>`).join('') + `</ul></div>`
  }
  if (e.notes?.length) {
    h += `<div class="exam-notes"><b>유의사항</b><ul>` + e.notes.map((n) => `<li>${esc(n)}</li>`).join('') + `</ul></div>`
  }
  return h
}

// 과목 복습 퀴즈 (과목 마지막날에 노출, details로 접었다 펴기)
function renderQuiz(subjectId) {
  const qs = quizzes[subjectId]
  if (!qs?.length) return ''
  const typeLabel = { ox: 'O/X', choice: '4지선다', short: '단답' }
  let h = `<h4 class="sec">📝 복습 퀴즈 <span class="thin">(질문을 눌러 정답·해설 펼치기)</span></h4><div class="quiz">`
  qs.forEach((q, i) => {
    let inner = ''
    if (q.type === 'choice' && q.choices?.length) {
      inner += `<ol class="quiz-choices">` + q.choices.map((c) => `<li>${esc(c)}</li>`).join('') + `</ol>`
      const ansText = q.choices[q.answer]
      inner += `<div class="quiz-ans"><b>정답 ${Number(q.answer) + 1}.</b> ${esc(ansText || '')}</div>`
    } else {
      inner += `<div class="quiz-ans"><b>정답</b> ${esc(String(q.answer))}</div>`
    }
    if (q.explain) inner += `<p class="quiz-exp">${escNl(q.explain)}</p>`
    h += `<details class="quiz-item"><summary><span class="quiz-tag">${typeLabel[q.type] || '퀴즈'}</span> Q${i + 1}. ${esc(q.q)}</summary>${inner}</details>`
  })
  return h + `</div>`
}

function renderExamples(list, heading, icon) {
  if (!list?.length) return ''
  let h = `<h4 class="sec">${icon} ${heading}</h4>`
  for (const ex of list) {
    h += `<div class="ex"><div class="ex-h">${esc(ex.title)} <span class="lang">(${esc(ex.lang)})</span></div>` +
      `<div class="code-wrap"><button type="button" class="wrap-btn" aria-label="줄바꿈/가로 전환">↔ 가로</button>` +
      `<button type="button" class="copy-btn" aria-label="코드 복사">복사</button>` +
      `<pre class="code"><code>${hlCode(ex.code, ex.lang)}</code></pre></div>` +
      (ex.note ? `<p class="note">💡 ${escNl(ex.note)}</p>` : '') + `</div>`
  }
  return h
}

async function renderDay(subj, dayIdx) {
  const day = subj.days[dayIdx]
  const dnum = dayIdx + 1
  const dd = await load(subj.id)
  const one = dd[`${subj.id}-${dnum}`] || {}
  const mode = modeOf(subj.id, dnum)

  let h = `<section class="day">`
  h += `<div class="day-head"><span class="chip code">${esc(subj.code)}</span>` +
    `<span class="chip cat">${esc(subj.category)}</span>` +
    `<span class="chip day">Day ${dnum} / ${subj.days.length}</span>` +
    (mode ? `<span class="chip ${modeClass(mode.tag)}">${esc(mode.tag)} · ${esc(mode.ratio)}</span>` : '') + `</div>`
  h += `<h3 class="day-title">${esc(day.title)}</h3>`
  h += `<p class="day-sub">${esc(subj.name)} · Day ${dnum}</p>`
  if (mode?.note) h += `<p class="mode-note">${esc(mode.note)}</p>`

  // 학습 목표
  if (day.objectives?.length) {
    h += `<div class="box tips"><div class="box-h">🎯 학습 목표</div><ul>` +
      day.objectives.map((o) => `<li>${esc(o)}</li>`).join('') + `</ul></div>`
  }
  // 핵심 개념
  if (one.concepts?.length) {
    h += `<h4 class="sec">📚 핵심 개념</h4><div class="concepts">` +
      one.concepts.map((c) => `<dl class="concept"><dt>${esc(c.term)}</dt><dd>${escNl(c.desc)}</dd></dl>`).join('') + `</div>`
  }
  // 심화 이론
  if (one.theory?.theory?.length) {
    h += `<h4 class="sec">📘 심화 이론</h4>` +
      one.theory.theory.map((t) => `<div class="card"><h5>${esc(t.h)}</h5><p>${escNl(t.body)}</p></div>`).join('')
  }
  // 상세 학습 내용
  if (one.detail?.topics?.length) {
    h += `<h4 class="sec">📖 상세 학습 내용</h4><div class="topics">` +
      one.detail.topics.map((t) => `<div class="card"><h5 class="gold">${esc(t.h)}</h5><ul class="dot">` +
        (t.items || []).map((it) => `<li>${esc(it)}</li>`).join('') + `</ul></div>`).join('') + `</div>`
  }
  // 진행 시간표
  h += `<h4 class="sec">⏱ 진행 시간표 <span class="thin">(09:00~17:50 · 교시당 50분)</span></h4>` + sectionPeriods(one, subj.id, dnum)
  // 실습(plan.practice)
  if (one.plan?.practice) {
    const p = one.plan.practice
    h += `<h4 class="sec">🧪 실습</h4><div class="box practice"><div class="box-h">${esc(p.title)}</div><ol>` +
      p.steps.map((s) => `<li>${esc(s)}</li>`).join('') + `</ol>` +
      (p.deliverable ? `<p class="deliver"><b>📦 산출물 · </b>${esc(p.deliverable)}</p>` : '') + `</div>`
  }
  // 추가 실습 Lab
  if (one.detail?.labs?.length) {
    h += `<h4 class="sec">🔬 추가 실습 (Lab)</h4><div class="labs">` +
      one.detail.labs.map((lab) => `<div class="box tips"><div class="box-h">${esc(lab.title)}</div><ol>` +
        lab.steps.map((s) => `<li>${esc(s)}</li>`).join('') + `</ol></div>`).join('') + `</div>`
  }
  // 실습 예제 + 실전 소스
  h += renderExamples(one.examples, '실습 예제', '💻')
  h += renderExamples(one.realCodes, '실전 소스', '🛠')
  // 과제
  if (one.detail?.homework?.length) {
    h += `<h4 class="sec">📝 과제</h4><div class="box practice"><ol>` +
      one.detail.homework.map((hw) => `<li>${esc(hw)}</li>`).join('') + `</ol></div>`
  }
  // 종합실습 평가기준(과목 첫날) · 복습 퀴즈(과목 마지막날) — 과목 단위 정보
  if (dnum === 1) {
    h += renderExam(subj.id)
    if (examsAlt[subj.id]) {
      h += renderExam(subj.id, examsAlt[subj.id], '📑 타 강사판 평가안 (참고)')
      h += `<p class="note">※ 같은 과목이라도 담당교수에 따라 평가 체계가 다를 수 있습니다. 기본안과 함께 참고하세요.</p>`
    }
  }
  if (dnum === subj.days.length) h += renderQuiz(subj.id)
  h += `</section>`
  return h
}

// ── 기타(타 강사 진행) 과정 페이지 — 앞뒤 학습 안내 ──
function renderEtcPage() {
  const subjName = (id) => subjects.find((s) => s.id === id)?.name
  const nameOf = (c) => otherCourses[c]?.name || subjName(c) || EVENT_LABELS[c] || c
  const trackOf = (s) => (s.region === '광주' ? 'gj' : s.region === '울산' ? 'us' : s.klass === '4층' ? 'p4' : 'p5')

  let h = `<div class="subject-head">
    <div class="sh-cat">담당일정 외 · 타 강사 진행</div>
    <h2>담당일정 외 강의내용 학습 자료</h2>
    <p class="sh-sum">이애본 강사 담당 강의의 앞뒤에 각 분반에서 배우는 과목입니다. 과정 전체 흐름을 잇는 예습·복습 자료로 활용하세요.</p>
    <div class="sh-meta"><span class="chip code">참고</span><span class="chip cat">${Object.keys(otherCourses).length}과목</span><span class="chip day">실시간 배정표 기준 · 변동 가능</span></div>
  </div>`

  // 과목별 학습내용 카드
  h += `<h4 class="sec">📖 과목별 학습내용</h4>`
  for (const [id, c] of Object.entries(otherCourses)) {
    const deep = otherDeep[id] || {}
    h += `<div class="card etc-card" id="etccourse-${esc(id)}"><h5>${esc(c.name)} <span class="thin">· ${esc(c.category)} · ${c.hours}시간</span></h5>` +
      `<p style="margin:4px 0 8px">${esc(c.summary)}</p>` +
      `<ul class="dot">${(c.topics || []).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` +
      (deep.concepts?.length
        ? `<div class="exam-sub">핵심 개념</div><div class="concepts">` +
          deep.concepts.map((k) => `<dl class="concept"><dt>${esc(k.term)}</dt><dd>${escNl(k.desc)}</dd></dl>`).join('') + `</div>`
        : '') +
      (deep.examples?.length ? renderExamples(deep.examples, '따라하기 실습', '💻') : '') +
      (otherExams[id]
        ? renderExam(id, otherExams[id]) + `<p class="note">※ 타 강사 진행 과목의 평가기준 — 평가 방향을 미리 파악하는 참고자료입니다.</p>`
        : '') +
      (c.tip ? `<p class="note">🔗 ${escNl(c.tip)}</p>` : '') + `</div>`
  }

  // 분반별 일정표 (담당 강의는 ★로 병합 표시)
  const taughtMap = new Map()
  for (const s of sessions) taughtMap.set(`${s.date}|${trackOf(s)}`, s.subjectId)
  const allDates = [...new Set([...otherSessions.map((s) => s.date), ...sessions.map((s) => s.date)])].sort()
  h += `<h4 class="sec">📅 분반별 일정 <span class="thin">(★ = 이애본 강사 담당 — 좌측 과목 페이지 참조)</span></h4>`
  h += `<table class="plan"><tr><td class="pt"><b>날짜</b></td>${TRACKS.map((t) => `<td><b>${esc(t.label)}</b></td>`).join('')}</tr>`
  for (const date of allDates) {
    const os = otherSessions.find((s) => s.date === date) || {}
    const cells = TRACKS.map((t) => {
      const taught = taughtMap.get(`${date}|${t.key}`)
      if (taught) return `<td><b>★ ${esc(subjName(taught))}</b></td>`
      const cell = os[t.key]
      if (!cell) return `<td></td>`
      return `<td>${esc(nameOf(cell.c))}${cell.by ? ` <span class="pd">${esc(cell.by)}</span>` : ''}</td>`
    })
    h += `<tr><td class="pt">${esc(date.slice(5))}</td>${cells.join('')}</tr>`
  }
  h += `</table>`
  h += `<p class="note">※ 실시간 배정표 기준(전 구간 반영) · 일정은 변동될 수 있습니다.</p>`

  // 11월 이후 요약
  h += `<h4 class="sec">🗓 11월 이후</h4>`
  for (const p of otherPeriods) {
    h += `<div class="card"><h5>${esc(p.label)}</h5><p>${esc(p.range)} — ${esc(p.note)}</p></div>`
  }
  return h
}

async function main() {
  const totalDays = ordered.reduce((a, s) => a + s.days.length, 0)

  // 표지 + 목차 (개요 페이지)
  const cover = `<section class="cover">
    <div class="cover-brand">SKALA · SK AI Leader Academy</div>
    <h1>SKALA 4기 실습 교재</h1>
    <p class="cover-sub">이애본 강사 담당 ${ordered.length}과목 · 실습 교재</p>
    <div class="cover-meta">
      <div><b>과정</b> AI 캠퍼스 · K-뉴딜</div>
      <div><b>기간</b> 2026.07.14 ~ 10.28 (평일 09:00~18:00, 오프라인)</div>
      <div><b>지역</b> 울산 · 판교(4·5층) · 광주</div>
      <div><b>수록</b> 담당 ${ordered.length}과목</div>
    </div>
    <p class="cover-note">본 실습 교재의 코드·설명은 SKALA 4기 실라버스에 근거해 우리말로 재서술한 자립 학습용 자료입니다. 각 소스의 <span class="cmt">녹색 주석</span>을 따라 실습하세요.</p>
  </section>`
  const tocRows = ordered.map((s) => {
    const tag = bySub[s.id] ? classesOf(s.id).join(', ') : '참고자료'
    return `<li><a class="toc-row" href="#subj-${esc(s.id)}" data-goto="${esc(s.id)}"><span class="toc-name">${esc(s.name)}</span><span class="toc-meta">${esc(s.code)} · ${s.days.length}일차 · ${esc(tag)}</span></a></li>`
  }).join('')
  const toc = `<section class="toc"><h2>목차 <span class="thin">(과목을 누르면 해당 과목만 펼쳐집니다)</span></h2><ol>${tocRows}</ol></section>`
  const home = cover + toc

  // 과목별 블록 (페이지 단위 구성용)
  const subjectBlocks = []
  for (const subj of ordered) {
    const cls = classesOf(subj.id)
    let sh = `<div class="subject-head">
      <div class="sh-cat">${esc(subj.category)}</div>
      <h2>${esc(subj.name)}</h2>
      <p class="sh-sum">${esc(subj.summary)}</p>
      <div class="sh-meta"><span class="chip code">${esc(subj.code)}</span>
        <span class="chip day">${subj.days.length}일차</span>
        <span class="chip ${bySub[subj.id] ? 'cat' : 'm-theory'}">${bySub[subj.id] ? esc(cls.join(', ')) : '참고자료'}</span></div>
    </div>`
    for (let i = 0; i < subj.days.length; i++) sh += await renderDay(subj, i)
    subjectBlocks.push({ id: subj.id, name: subj.name, html: sh })
  }

  // 인쇄본(PDF)·no-JS 폴백용 연속 본문 (기타 과정은 부록으로)
  const etcPage = renderEtcPage()
  const body = home + subjectBlocks.map((b) => b.html).join('') + etcPage

  const outDir = join(ROOT, 'dist-textbook')
  mkdirSync(outDir, { recursive: true })

  if (WEB) {
    // 웹 뷰어: 좌측 메뉴(과목) 클릭 → 해당 과목만 페이지 단위로 표시. + 인쇄 버튼.
    const sideItems = ordered
      .map((s) => {
        const tag = bySub[s.id] ? classesOf(s.id).join(', ') : '참고'
        return `<a class="sl" href="#subj-${esc(s.id)}" data-goto="${esc(s.id)}"><span class="sl-n">${esc(s.name)}</span><span class="sl-m">${esc(s.code)} · ${s.days.length}일차 · ${esc(tag)}</span></a>`
      })
      .join('')
    // 담당일정 외(타 강사) 과목 사이드 메뉴 — 기타 페이지 내 과목 카드로 스크롤
    const etcSideItems = Object.entries(otherCourses)
      .map(([id, c]) =>
        `<a class="sl sl-etc" href="#" data-goto="etc" data-anchor="etccourse-${esc(id)}"><span class="sl-n">${esc(c.name)}</span><span class="sl-m">${esc(c.category)} · ${c.hours}시간 · 타 강사</span></a>`)
      .join('')
    // 페이지: 개요(표지+목차) + 과목별
    // 주의: 페이지 섹션에는 id를 두지 않는다(해시 진입 시 네이티브 앵커 점프로 상단 빈공간이 생김).
    // 내비게이션·초기 해시 처리는 모두 JS show()가 전담한다.
    const pages = `<section class="page is-active" data-page="home">${home}</section>` +
      subjectBlocks.map((b) => `<section class="page" data-page="${esc(b.id)}">${b.html}</section>`).join('') +
      `<section class="page" data-page="etc">${etcPage}</section>`
    const head = `<title>SKALA 4기 실습 교재 — 이애본 강사</title>
<style>${SCREEN_CSS}${TAB_CSS}</style>`
    const content = `<div class="tb">
  <div class="tb-overlay" id="tb-overlay" aria-hidden="true"></div>
  <aside class="tb-side" id="tb-side">
    <div class="tb-brandbox">
      <div class="tb-brand">SKALA <b>4기</b> 실습 교재</div>
      <div class="tb-brand-sub">이애본 강사 · 담당 ${ordered.length}과목</div>
    </div>
    <div class="tb-tabs" role="tablist" aria-label="교안 구분">
      <button type="button" class="tb-tab is-active" data-tab="mine">담당 강의</button>
      <button type="button" class="tb-tab tb-tab-etc" data-tab="etc">담당일정 외</button>
    </div>
    <nav class="tb-nav" aria-label="과목 목차">
      <div class="tb-group" id="tb-group-mine">
        <a class="sl sl-top is-active" href="#" data-goto="home">📖 표지 · 목차</a>
        ${sideItems}
      </div>
      <div class="tb-group" id="tb-group-etc" hidden>
        <a class="sl sl-top sl-etc" href="#" data-goto="etc">📚 담당일정 외 개요 · 분반별 일정</a>
        ${etcSideItems}
      </div>
    </nav>
  </aside>
  <main class="tb-main">
    <div class="tb-toolbar">
      <button type="button" class="menu-btn" id="tb-menu" aria-label="과목 메뉴 열기" aria-expanded="false">
        <span class="menu-ico"><i></i><i></i><i></i></span><span class="menu-txt">과목</span>
      </button>
      <span class="tb-crumb" id="tb-crumb">표지 · 목차</span>
      <button type="button" class="print-btn" id="tb-print">🖨 <span class="pb-txt">인쇄</span></button>
    </div>
    <div class="tb-pages">${pages}</div>
  </main>
</div>
<script>${COPY_JS}
${PAGE_JS}</script>`
    // (1) Artifact 발행용 조각(no html/head/body)
    const frag = `${head}\n${content}`
    writeFileSync(join(outDir, 'textbook-web.html'), frag)
    // (2) 사이트 배포용 독립 HTML → public/practice-textbook.html ("실습교안" 메뉴가 링크)
    const standalone = `<!doctype html><html lang="ko"><head><meta charset="utf-8">` +
      `<meta name="viewport" content="width=device-width, initial-scale=1">${head}</head><body>${content}</body></html>`
    writeFileSync(join(ROOT, 'public', 'practice-textbook.html'), standalone)
    console.log(`생성: dist-textbook/textbook-web.html + public/practice-textbook.html (${(frag.length / 1024).toFixed(0)}KB, ${ordered.length}과목)`)
    return
  }

  const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8">
<title>SKALA 4기 실습 교재 — 이애본 강사</title>
<style>${CSS}</style></head><body>${body}</body></html>`
  writeFileSync(join(outDir, 'textbook.html'), html)
  console.log(`생성: dist-textbook/textbook.html (${(html.length / 1024).toFixed(0)}KB, ${ordered.length}과목 ${totalDays}일차)`)
}

const CSS = `
:root{--navy900:#0E1152;--navy800:#1a1f6b;--navy700:#3a3f7a;--indigo:#3F51FF;--gold:#C9A227;--line:#e5e7ef;--ink:#1c2033;--soft:#6b7089;--bg:#fff;}
*{box-sizing:border-box;}
@page{size:A4;margin:16mm 14mm;}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
body{font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;color:var(--ink);font-size:10.5pt;line-height:1.65;margin:0;}
h1,h2,h3,h4,h5{margin:0;color:var(--navy800);}
.cover{height:245mm;display:flex;flex-direction:column;justify-content:center;text-align:center;page-break-after:always;background:linear-gradient(160deg,#0E1152,#3F51FF);color:#fff;margin:-16mm -14mm 0;padding:0 24mm;border-radius:0;}
.cover-brand{font-size:12pt;letter-spacing:.22em;opacity:.85;margin-bottom:18px;text-transform:uppercase;}
.cover h1{color:#fff;font-size:32pt;font-weight:800;line-height:1.25;}
.cover-sub{font-size:14pt;margin:16px 0 40px;opacity:.92;}
.cover-meta{display:inline-block;text-align:left;background:rgba(255,255,255,.1);border-radius:12px;padding:20px 28px;font-size:11pt;line-height:2;}
.cover-meta b{display:inline-block;width:52px;color:#ACBEFF;}
.cover-note{margin-top:40px;font-size:9.5pt;opacity:.8;max-width:120mm;margin-left:auto;margin-right:auto;}
.toc{page-break-after:always;padding-top:8mm;}
.toc h2{font-size:20pt;border-bottom:3px solid var(--navy800);padding-bottom:10px;margin-bottom:18px;}
.toc ol{padding-left:22px;}
.toc li{padding:7px 0;border-bottom:1px dotted var(--line);}
.toc-name{font-weight:700;}
.toc-meta{float:right;color:var(--soft);font-size:9pt;}
.subject-head{page-break-before:always;padding:14mm 0 6mm;border-bottom:3px solid var(--gold);margin-bottom:8mm;}
.sh-cat{font-size:10pt;font-weight:800;letter-spacing:.16em;color:var(--indigo);text-transform:uppercase;}
.subject-head h2{font-size:24pt;font-weight:800;margin:6px 0 8px;}
.sh-sum{color:var(--navy700);font-size:11pt;}
.sh-meta{margin-top:12px;}
.day{page-break-before:always;}
.subject-head + .day{page-break-before:auto;}
.day-head{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;}
.chip{font-size:8pt;font-weight:700;padding:2px 9px;border-radius:999px;border:1px solid var(--line);color:var(--navy700);white-space:nowrap;}
.chip.code{background:var(--navy900);color:#fff;border-color:var(--navy900);}
.chip.cat{background:#eef0ff;color:var(--indigo);border-color:#d8ddff;}
.chip.day{background:#fff8e6;color:#8a6d0f;border-color:#f0e2b0;}
.m-theory{background:#eef2f7;color:#41506b;}.m-lab{background:#e7f6ee;color:#1f7a4d;}.m-mix{background:#fff1e6;color:#b5651d;}.m-full{background:#fde8ef;color:#b02a5b;}
.day-title{font-size:16pt;font-weight:800;margin-top:4px;}
.day-sub{color:var(--soft);font-size:9.5pt;margin:2px 0 0;}
.mode-note{font-size:9.5pt;color:var(--navy700);margin:8px 0 0;padding:8px 12px;background:#f6f7fb;border-left:3px solid var(--indigo);border-radius:0 6px 6px 0;}
.sec{font-size:12.5pt;font-weight:800;margin:16px 0 8px;padding-top:6px;border-top:1px solid var(--line);color:var(--navy800);}
.sec.thin,.thin{font-weight:600;font-size:9pt;color:var(--soft);}
.box{border:1px solid var(--line);border-radius:8px;padding:12px 16px;margin:8px 0;page-break-inside:avoid;}
.box.tips{background:#f6f8fc;border-color:#dde5f2;}
.box.practice{background:#fbf7ec;border-color:#eadfbf;}
.box-h{font-weight:800;color:var(--navy800);margin-bottom:6px;font-size:10.5pt;}
.box ul,.box ol{margin:4px 0;padding-left:20px;}
.box li{margin:3px 0;}
.deliver{margin-top:8px;font-size:9.5pt;}.deliver b{color:var(--gold);}
.concepts{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.concept{border:1px solid var(--line);border-radius:6px;padding:9px 12px;margin:0;page-break-inside:avoid;}
.concept dt{font-weight:800;color:var(--navy800);font-size:10pt;margin-bottom:3px;}
.concept dd{margin:0;font-size:9pt;color:var(--navy700);}
.card{border:1px solid var(--line);border-radius:8px;padding:11px 14px;margin:8px 0;page-break-inside:avoid;}
.card h5{font-size:10.5pt;font-weight:800;margin-bottom:5px;}
.card h5.gold{color:#a5851f;}
.card p{margin:0;font-size:9.5pt;color:var(--navy700);}
.topics{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
ul.dot{list-style:none;margin:0;padding:0;}
ul.dot li{position:relative;padding-left:13px;font-size:9pt;color:var(--navy700);margin:3px 0;}
ul.dot li:before{content:'';position:absolute;left:2px;top:6px;width:4px;height:4px;border-radius:50%;background:var(--gold);}
table.plan{width:100%;border-collapse:collapse;margin:8px 0;page-break-inside:avoid;font-size:9.5pt;}
table.plan td{border:1px solid var(--line);padding:6px 10px;vertical-align:top;}
td.pt{width:26mm;background:#f6f7fb;font-size:9pt;white-space:nowrap;}
.pt-time{font-weight:500;color:var(--soft);font-size:8pt;}
.pd{color:var(--soft);font-size:8.5pt;}
.lunch{color:var(--soft);font-style:italic;background:#fafbfd;}
.tag{font-size:7.5pt;font-weight:700;padding:1px 7px;border-radius:999px;}
.ex{margin:10px 0;page-break-inside:avoid;}
.ex-h{font-weight:800;color:var(--navy800);font-size:10pt;margin-bottom:5px;}
.lang{font-weight:600;color:var(--soft);font-size:8.5pt;}
.copy-btn{display:none;}.wrap-btn{display:none;}
.cmt{color:#4ade80;font-style:italic;}
.exam-sub{font-weight:800;font-size:10.5pt;margin:10px 0 4px;color:var(--navy800);}
.exam-notes{font-size:9pt;color:var(--soft);margin-top:8px;}.exam-notes ul{margin:4px 0;padding-left:18px;}
.quiz-item{border:1px solid var(--line);border-radius:6px;margin:6px 0;padding:8px 12px;page-break-inside:avoid;}
.quiz-item>*:not(summary){display:block;}
.quiz-item summary{font-weight:700;font-size:10pt;list-style:none;}
.quiz-tag{font-size:7.5pt;font-weight:700;color:var(--indigo);}
.quiz-choices{margin:6px 0;padding-left:18px;font-size:9pt;}
.quiz-ans{font-size:9.5pt;color:#1f7a4d;margin-top:4px;}
.quiz-exp{font-size:9pt;color:var(--navy700);margin-top:4px;white-space:pre-line;}
pre.code{background:#0f1229;color:#e6e9f5;border-radius:8px;padding:12px 14px;overflow:visible;white-space:pre-wrap;word-break:break-word;font-family:'SFMono-Regular',Consolas,monospace;font-size:8.3pt;line-height:1.55;margin:0;}
p.note{margin:6px 0 0;font-size:9pt;color:var(--soft);line-height:1.6;}
`

// ── 화면용(웹 뷰어) 스타일 — SKALA 브랜드, 라이트/다크 테마, 스티키 사이드바 ──
const SCREEN_CSS = `
:root{
  --navy900:#0E1152;--navy800:#1a1f6b;--indigo:#3F51FF;--gold:#C9A227;--light-indigo:#ACBEFF;
  --bg:#f4f5fa;--surface:#ffffff;--surface-2:#f7f8fc;--ink:#1c2033;--ink-2:#3a3f66;--soft:#6b7089;
  --line:#e5e7ef;--line-2:#eef0f6;--code-bg:#0f1229;--code-fg:#e6e9f5;--side-bg:#0E1152;
  --tb-navy-h:#3a3f7a;--gold-soft:#8a6d0f;--indigo-soft:#eef0ff;
}
@media (prefers-color-scheme:dark){:root{
  --bg:#0a0c26;--surface:#141737;--surface-2:#1a1e42;--ink:#eef0fa;--ink-2:#c3c8e6;--soft:#9096b8;
  --line:#2a2f5a;--line-2:#242956;--code-bg:#080a1c;--code-fg:#e6e9f5;--side-bg:#080a1c;
  --tb-navy-h:#c3c8e6;--gold-soft:#e0c56b;--indigo-soft:#232a5c;
}}
:root[data-theme="light"]{
  --bg:#f4f5fa;--surface:#ffffff;--surface-2:#f7f8fc;--ink:#1c2033;--ink-2:#3a3f66;--soft:#6b7089;
  --line:#e5e7ef;--line-2:#eef0f6;--code-bg:#0f1229;--code-fg:#e6e9f5;--side-bg:#0E1152;
  --tb-navy-h:#3a3f7a;--gold-soft:#8a6d0f;--indigo-soft:#eef0ff;
}
:root[data-theme="dark"]{
  --bg:#0a0c26;--surface:#141737;--surface-2:#1a1e42;--ink:#eef0fa;--ink-2:#c3c8e6;--soft:#9096b8;
  --line:#2a2f5a;--line-2:#242956;--code-bg:#080a1c;--code-fg:#e6e9f5;--side-bg:#080a1c;
  --tb-navy-h:#c3c8e6;--gold-soft:#e0c56b;--indigo-soft:#232a5c;
}
*{box-sizing:border-box;}
.tb{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif;color:var(--ink);background:var(--bg);
  display:grid;grid-template-columns:288px minmax(0,1fr);min-height:100vh;line-height:1.68;font-size:15px;}
.tb h1,.tb h2,.tb h3,.tb h4,.tb h5{margin:0;color:var(--ink);}

/* 사이드바 */
.tb-side{position:sticky;top:0;align-self:start;height:100vh;overflow-y:auto;background:var(--side-bg);color:#fff;
  padding:22px 14px 40px;border-right:1px solid var(--line);}
.tb-brandbox{padding:6px 10px 16px;border-bottom:1px solid rgba(255,255,255,.14);margin-bottom:12px;}
.tb-brand{font-size:16px;font-weight:800;letter-spacing:.02em;color:#fff;}
.tb-brand b{color:var(--light-indigo);}
.tb-brand-sub{font-size:11.5px;color:rgba(255,255,255,.62);margin-top:4px;letter-spacing:.02em;}
.tb-nav{display:flex;flex-direction:column;gap:1px;}
.sl{display:block;padding:9px 12px;border-radius:8px;text-decoration:none;color:rgba(255,255,255,.82);
  border-left:2px solid transparent;transition:background .15s,color .15s;}
.sl:hover{background:rgba(255,255,255,.08);color:#fff;}
.sl:focus-visible{outline:2px solid var(--light-indigo);outline-offset:1px;}
.sl-n{display:block;font-size:13.5px;font-weight:700;}
.sl-m{display:block;font-size:10.5px;color:rgba(255,255,255,.5);margin-top:2px;font-variant-numeric:tabular-nums;}
.sl-top{font-size:12px;font-weight:700;color:var(--light-indigo);margin-bottom:8px;}

/* 본문 */
.tb-main{padding:0 clamp(20px,4vw,64px) 120px;min-width:0;}
.page{max-width:900px;margin:0 auto;}
/* 페이징: JS 있으면 활성 페이지만, 없으면 전체 스크롤 폴백 */
.js-paged .page{display:none;}
.js-paged .page.is-active{display:block;}
/* 상단 툴바(빵부스러기 + 인쇄) */
.tb-toolbar{position:sticky;top:0;z-index:15;max-width:900px;margin:0 auto 10px;
  display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding:12px 0;background:var(--bg);border-bottom:1px solid var(--line);}
.tb-crumb{flex:1;min-width:0;font-weight:800;color:var(--ink);font-size:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.print-btn{flex:none;font-family:inherit;font-size:13px;font-weight:700;color:#fff;background:var(--indigo);
  border:none;border-radius:8px;padding:8px 15px;cursor:pointer;transition:background .15s;}
.print-btn:hover{background:var(--navy800);}
.print-btn:focus-visible{outline:2px solid var(--light-indigo);outline-offset:2px;}
/* 햄버거 버튼(모바일 전용) + 드로어 오버레이 */
.menu-btn{display:none;flex:none;align-items:center;gap:8px;font-family:inherit;font-size:13px;font-weight:700;
  color:var(--ink);background:var(--surface);border:1px solid var(--line);border-radius:9px;padding:7px 12px;cursor:pointer;}
.menu-btn:focus-visible{outline:2px solid var(--indigo);outline-offset:2px;}
.menu-ico{display:inline-flex;flex-direction:column;gap:3px;width:16px;}
.menu-ico i{display:block;height:2px;border-radius:2px;background:var(--indigo);transition:transform .2s,opacity .2s;}
.tb.drawer-open .menu-ico i:nth-child(1){transform:translateY(5px) rotate(45deg);}
.tb.drawer-open .menu-ico i:nth-child(2){opacity:0;}
.tb.drawer-open .menu-ico i:nth-child(3){transform:translateY(-5px) rotate(-45deg);}
.tb-overlay{display:none;position:fixed;inset:0;z-index:390;background:rgba(14,17,82,.42);
  opacity:0;pointer-events:none;transition:opacity .25s ease;}
.tb.drawer-open .tb-overlay{opacity:1;pointer-events:auto;}
/* 목차 링크 */
.toc-row{display:block;text-decoration:none;color:inherit;}
.toc-row:hover .toc-name{color:var(--indigo);text-decoration:underline;}
/* 코드 주석(녹색) */
.cmt{color:#4ade80;font-style:italic;}
/* 평가기준 · 퀴즈 섹션 */
.exam-sub{font-weight:800;color:var(--ink);font-size:14px;margin:16px 0 7px;}
.exam-notes{font-size:13px;color:var(--soft);margin-top:12px;}
.exam-notes ul{margin:5px 0;padding-left:20px;}
.exam-notes li{margin:3px 0;}
.quiz{display:flex;flex-direction:column;gap:9px;}
.quiz-item{border:1px solid var(--line);border-radius:11px;background:var(--surface-2);overflow:hidden;}
.quiz-item summary{cursor:pointer;padding:13px 16px;font-weight:700;font-size:14px;line-height:1.55;list-style:none;}
.quiz-item summary::-webkit-details-marker{display:none;}
.quiz-item summary::before{content:'▸ ';color:var(--indigo);font-weight:800;}
.quiz-item[open] summary::before{content:'▾ ';}
.quiz-item[open] summary{border-bottom:1px solid var(--line);}
.quiz-tag{display:inline-block;font-size:10.5px;font-weight:800;color:var(--indigo);background:var(--indigo-soft);border-radius:999px;padding:1px 9px;margin-right:6px;}
.quiz-choices{margin:11px 16px;padding-left:20px;}
.quiz-choices li{margin:4px 0;font-size:13.5px;color:var(--ink-2);}
.quiz-ans{margin:11px 16px 0;font-size:13.5px;}
.quiz-ans b{color:#1f9d57;}
.quiz-exp{margin:8px 16px 14px;font-size:13px;color:var(--ink-2);line-height:1.72;white-space:pre-line;}
.cover{margin:32px auto 40px;text-align:center;background:linear-gradient(155deg,#0E1152,#3F51FF);color:#fff;
  border-radius:20px;padding:64px 40px;box-shadow:0 24px 60px rgba(14,17,82,.32);}
.cover-brand{font-size:13px;letter-spacing:.24em;opacity:.85;margin-bottom:16px;text-transform:uppercase;}
.cover h1{color:#fff;font-size:clamp(30px,5vw,46px);font-weight:800;line-height:1.2;text-wrap:balance;}
.cover-sub{font-size:17px;margin:14px 0 34px;opacity:.92;}
.cover-meta{display:inline-block;text-align:left;background:rgba(255,255,255,.1);border-radius:14px;padding:22px 30px;font-size:14.5px;line-height:2.05;}
.cover-meta b{display:inline-block;width:56px;color:var(--light-indigo);}
.cover-note{margin:34px auto 0;font-size:13px;opacity:.8;max-width:560px;}
.toc{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:28px 32px;margin-bottom:8px;}
.toc h2{font-size:24px;border-bottom:3px solid var(--indigo);padding-bottom:12px;margin-bottom:14px;}
.toc ol{padding-left:24px;margin:0;}
.toc li{padding:9px 0;border-bottom:1px dotted var(--line);}
.toc-name{font-weight:700;}
.toc-meta{float:right;color:var(--soft);font-size:12.5px;font-variant-numeric:tabular-nums;}

/* 과목 헤더 (앵커 대상) */
.subject-head{scroll-margin-top:16px;padding:40px 0 18px;border-bottom:3px solid var(--gold);margin:44px 0 26px;}
.subject-head:first-of-type{margin-top:20px;}
.sh-cat{font-size:12.5px;font-weight:800;letter-spacing:.16em;color:var(--indigo);text-transform:uppercase;}
.subject-head h2{font-size:clamp(26px,4vw,34px);font-weight:800;margin:8px 0 10px;text-wrap:balance;}
.sh-sum{color:var(--ink-2);font-size:16px;}
.sh-meta{margin-top:14px;display:flex;align-items:center;gap:7px;flex-wrap:wrap;}

/* 일차 카드 */
.day{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:26px 30px;margin:22px 0;
  box-shadow:0 2px 10px rgba(14,17,82,.04);}
.day-head{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:10px;}
.chip{display:inline-flex;align-items:center;line-height:1.4;font-size:11px;font-weight:700;padding:3px 11px;border-radius:999px;border:1px solid var(--line);color:var(--ink-2);white-space:nowrap;}
.chip.code{background:var(--navy900);color:#fff;border-color:var(--navy900);}
.chip.cat{background:var(--indigo-soft);color:var(--indigo);border-color:transparent;}
.chip.day{background:rgba(201,162,39,.14);color:var(--gold-soft);border-color:transparent;}
.m-theory{background:rgba(65,80,107,.13);color:#5a6786;}.m-lab{background:rgba(31,122,77,.15);color:#1f7a4d;}
.m-mix{background:rgba(181,101,29,.15);color:#b5651d;}.m-full{background:rgba(176,42,91,.14);color:#c2477a;}
.day-title{font-size:22px;font-weight:800;margin-top:4px;text-wrap:balance;}
.day-sub{color:var(--soft);font-size:13px;margin:3px 0 0;}
.mode-note{font-size:13.5px;color:var(--ink-2);margin:12px 0 0;padding:10px 14px;background:var(--surface-2);border-left:3px solid var(--indigo);border-radius:0 8px 8px 0;}
.sec{font-size:17px;font-weight:800;margin:26px 0 12px;padding-top:14px;border-top:1px solid var(--line-2);}
.sec.thin,.thin{font-weight:600;font-size:12.5px;color:var(--soft);}
.box{border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:10px 0;}
.box.tips{background:var(--surface-2);border-color:var(--line);}
.box.practice{background:rgba(201,162,39,.07);border-color:rgba(201,162,39,.28);}
.box-h{font-weight:800;margin-bottom:7px;font-size:15px;}
.box ul,.box ol{margin:5px 0;padding-left:22px;}
.box li{margin:4px 0;}
.deliver{margin-top:10px;font-size:13.5px;}.deliver b{color:var(--gold-soft);}
.concepts{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px;}
.concept{border:1px solid var(--line);border-radius:9px;padding:12px 15px;margin:0;background:var(--surface-2);}
.concept dt{font-weight:800;font-size:14.5px;margin-bottom:4px;}
.concept dd{margin:0;font-size:13px;color:var(--ink-2);}
.card{border:1px solid var(--line);border-radius:11px;padding:14px 17px;margin:10px 0;background:var(--surface-2);}
.card h5{font-size:15px;font-weight:800;margin-bottom:6px;}
.card h5.gold{color:var(--gold-soft);}
.card p{margin:0;font-size:14px;color:var(--ink-2);white-space:pre-line;}
.topics{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:10px;}
ul.dot{list-style:none;margin:0;padding:0;}
ul.dot li{position:relative;padding-left:15px;font-size:13.5px;color:var(--ink-2);margin:4px 0;}
ul.dot li:before{content:'';position:absolute;left:2px;top:8px;width:5px;height:5px;border-radius:50%;background:var(--gold);}
table.plan{width:100%;border-collapse:collapse;margin:10px 0;font-size:13.5px;}
table.plan td{border:1px solid var(--line);padding:8px 12px;vertical-align:top;}
td.pt{width:150px;background:var(--surface-2);font-size:13px;white-space:nowrap;font-variant-numeric:tabular-nums;}
.pt-time{font-weight:500;color:var(--soft);font-size:11.5px;}
.pd{color:var(--soft);font-size:12.5px;}
.lunch{color:var(--soft);font-style:italic;background:var(--surface-2);}
.tag{font-size:10.5px;font-weight:700;padding:2px 9px;border-radius:999px;}
.ex{margin:14px 0;}
.ex-h{font-weight:800;font-size:14.5px;margin-bottom:7px;}
.lang{font-weight:600;color:var(--soft);font-size:12px;}
.code-wrap{position:relative;}
.wrap-btn{display:none;position:absolute;top:9px;right:66px;z-index:2;font-family:inherit;font-size:11.5px;font-weight:700;
  color:#cfd4f5;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.18);border-radius:7px;
  padding:4px 10px;cursor:pointer;transition:background .15s;}
.wrap-btn:hover{background:rgba(255,255,255,.18);color:#fff;}
.wrap-btn:focus-visible{outline:2px solid var(--light-indigo);outline-offset:1px;}
.copy-btn{position:absolute;top:9px;right:9px;z-index:2;font-family:inherit;font-size:11.5px;font-weight:700;
  color:#cfd4f5;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.18);border-radius:7px;
  padding:4px 11px;cursor:pointer;transition:background .15s,color .15s;}
.copy-btn:hover{background:rgba(255,255,255,.18);color:#fff;}
.copy-btn:focus-visible{outline:2px solid var(--light-indigo);outline-offset:1px;}
.copy-btn.done{background:var(--gold);color:#1c1400;border-color:var(--gold);}
pre.code{background:var(--code-bg);color:var(--code-fg);border-radius:10px;padding:16px 18px;overflow-x:auto;
  white-space:pre;font-family:'SFMono-Regular',ui-monospace,Consolas,monospace;font-size:12.5px;line-height:1.62;margin:0;}
p.note{margin:8px 0 0;font-size:13px;color:var(--soft);line-height:1.65;white-space:pre-line;}
@media (max-width:820px){
  .tb{grid-template-columns:minmax(0,1fr);}          /* 단일 컬럼: 사이드바는 드로어로 분리 */
  /* 사이드바 → 왼쪽에서 미끄러져 나오는 오프캔버스 드로어 */
  .tb-side{position:fixed;top:0;left:0;bottom:0;z-index:400;width:min(84vw,320px);
    max-height:100vh;overflow-y:auto;-webkit-overflow-scrolling:touch;
    padding:20px 14px 32px;border-right:1px solid rgba(255,255,255,.12);
    box-shadow:6px 0 30px rgba(0,0,0,.28);
    transform:translateX(-100%);transition:transform .26s ease;
    display:flex;flex-direction:column;}
  .tb.drawer-open .tb-side{transform:translateX(0);}
  .tb-overlay{display:block;}
  .menu-btn{display:inline-flex;}
  /* 콘텐츠는 전체 폭 사용 */
  .tb-main{padding:0 16px 96px;overflow-x:hidden;}
  .tb-toolbar{padding:10px 0;gap:8px;}
  .tb-crumb{font-size:15px;}
  .print-btn{padding:7px 11px;}
  /* 표지·본문 모바일 정리 */
  .cover{padding:40px 20px;}
  .cover-brand{letter-spacing:.12em;overflow-wrap:anywhere;}
  .cover h1{font-size:25px;}
  .cover-sub{font-size:15px;}
  .cover-meta{display:block;max-width:100%;padding:16px 18px;font-size:13px;}
  .cover-meta div{overflow-wrap:anywhere;}
  .cover-meta b{width:44px;}
  .concepts,.topics{grid-template-columns:1fr;}
  .day{padding:20px 15px;}
  /* 코드: 모바일 기본 줄바꿈(세로 스크롤 자연스럽게, 제스처 불필요) + 폰트 축소 */
  pre.code{font-size:11.5px;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;
    -webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;}
  /* 토글로 '가로' 선택 시(다이어그램 등): 줄바꿈 해제하고 가로 스크롤 */
  .code-wrap.nowrap pre.code{white-space:pre;overflow-wrap:normal;word-break:normal;}
  .wrap-btn{display:inline-flex;}
  .code-wrap.nowrap::after{content:'← 좌우로 스크롤 →';position:absolute;right:10px;bottom:6px;
    font-size:9.5px;color:rgba(255,255,255,.34);pointer-events:none;letter-spacing:.02em;}
}
@media (max-width:400px){
  .menu-txt,.pb-txt{display:none;}   /* 아주 좁은 폭: 버튼은 아이콘만 */
  .tb-main{padding:0 12px 90px;}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important;}}
html{scroll-behavior:smooth;}
pre.code{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
/* 인쇄: 현재 보고 있는 과목만 출력 */
@media print{
  .tb-side,.tb-toolbar,.copy-btn{display:none!important;}
  .tb{display:block;background:#fff;}
  .tb-main{padding:0;overflow:visible;}
  .js-paged .page{display:none!important;}
  .js-paged .page.is-active{display:block!important;max-width:none;}
  .day{break-inside:auto;border:none;box-shadow:none;padding:0;margin:0 0 14px;}
  .subject-head{page-break-after:avoid;}
  .ex,.concept,.card,.box,table.plan{break-inside:avoid;}
  .cover{box-shadow:none;}
  a[data-goto]{color:inherit;text-decoration:none;}
}
`

// 코드 블록 복사 버튼 동작 (웹 뷰어 전용, 자체 포함 인라인 스크립트)
const COPY_JS = `
// 코드 줄바꿈 ↔ 가로 스크롤 토글(모바일)
document.addEventListener('click', function (e) {
  var wb = e.target.closest('.wrap-btn');
  if (!wb) return;
  var cw = wb.closest('.code-wrap');
  var nowrap = cw.classList.toggle('nowrap');
  wb.textContent = nowrap ? '↩ 줄바꿈' : '↔ 가로';
});
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.copy-btn');
  if (!btn) return;
  var pre = btn.parentElement.querySelector('pre.code code') || btn.parentElement.querySelector('pre.code');
  var text = pre ? pre.innerText : '';
  var done = function () {
    btn.classList.add('done');
    var prev = btn.textContent;
    btn.textContent = '복사됨 ✓';
    setTimeout(function () { btn.classList.remove('done'); btn.textContent = '복사'; }, 1400);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(function () { fallback(text); done(); });
  } else { fallback(text); done(); }
  function fallback(t) {
    var ta = document.createElement('textarea');
    ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (err) {}
    document.body.removeChild(ta);
  }
});
`

// 페이지 단위 전환(좌측 메뉴=과목 페이지) + 인쇄 (웹 뷰어 전용)
const TAB_CSS = `
.tb-tabs{display:flex;gap:6px;padding:10px 12px 2px;}
.tb-tab{flex:1;padding:9px 8px;font-weight:800;font-size:12.5px;border-radius:9px;border:1px solid rgba(255,255,255,0.25);background:transparent;color:rgba(255,255,255,0.8);cursor:pointer;}
.tb-tab.is-active{background:#3F51FF;border-color:#3F51FF;color:#fff;}
.tb-tab-etc.is-active{background:#0E7A5F;border-color:#0E7A5F;color:#fff;}
.sl-etc{border-left:3px solid #0E7A5F;}
.sl-etc.is-active,.sl-etc:hover{background:rgba(14,122,95,0.18);}
.page[data-page="etc"] .subject-head h2{color:#0E7A5F;}
.page[data-page="etc"] .subject-head{border-bottom-color:#0E7A5F;}
.page[data-page="etc"] h4.sec{color:#0E7A5F;}
.page[data-page="etc"] .chip.code{background:#0E7A5F;border-color:#0E7A5F;color:#fff;}
.page[data-page="etc"] .etc-card h5{color:#0E7A5F;}
.page[data-page="etc"] .box-h{color:#0E7A5F;}
`

const PAGE_JS = `
(function () {
  var root = document.querySelector('.tb');
  if (!root) return;
  root.classList.add('js-paged');           // 페이징 CSS 활성화(무JS면 전체 스크롤 폴백)
  var pages = root.querySelectorAll('.page');
  var crumb = document.getElementById('tb-crumb');
  var side = root.querySelector('.tb-side');
  function labelOf(id) {
    if (id === 'home') return '표지 · 목차';
    var n = root.querySelector('.sl[data-goto="' + id + '"] .sl-n');
    return n ? n.textContent : id;
  }
  function show(id) {
    var found = false;
    pages.forEach(function (p) {
      var on = p.getAttribute('data-page') === id;
      p.classList.toggle('is-active', on);
      if (on) found = true;
    });
    if (!found) { id = 'home'; pages.forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('data-page') === 'home'); }); }
    root.querySelectorAll('.sl').forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('data-goto') === id); });
    setTab(id === 'etc' ? 'etc' : 'mine');
    if (crumb) crumb.textContent = labelOf(id);
    window.scrollTo(0, 0);
    try { history.replaceState(null, '', id === 'home' ? '#tb-top' : '#subj-' + id); } catch (e) {}
  }
  // 담당 / 담당일정 외 탭
  var tabBtns = root.querySelectorAll('.tb-tab');
  function setTab(t) {
    tabBtns.forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-tab') === t); });
    var gm = document.getElementById('tb-group-mine');
    var ge = document.getElementById('tb-group-etc');
    if (gm) gm.hidden = t !== 'mine';
    if (ge) ge.hidden = t !== 'etc';
  }
  tabBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.getAttribute('data-tab');
      setTab(t);
      show(t === 'etc' ? 'etc' : 'home');
    });
  });
  // 모바일 드로어 열고 닫기
  var menuBtn = document.getElementById('tb-menu');
  var overlay = document.getElementById('tb-overlay');
  function setDrawer(open) {
    root.classList.toggle('drawer-open', open);
    if (menuBtn) menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    // 드로어가 열렸을 때만 배경 스크롤을 잠근다(데스크톱에선 항상 닫힘 상태)
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (menuBtn) menuBtn.addEventListener('click', function () { setDrawer(!root.classList.contains('drawer-open')); });
  if (overlay) overlay.addEventListener('click', function () { setDrawer(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });

  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-goto]');
    if (!a || !root.contains(a)) return;
    e.preventDefault();
    show(a.getAttribute('data-goto'));
    var anchor = a.getAttribute('data-anchor');
    if (anchor) {
      var el = document.getElementById(anchor);
      if (el) setTimeout(function () { el.scrollIntoView({ block: 'start' }); }, 30);
    }
    setDrawer(false);   // 과목을 고르면 드로어를 닫아 콘텐츠를 바로 보여준다
  });
  var m = (location.hash || '').match(/^#subj-(.+)$/);
  show(m ? m[1] : 'home');
  var pb = document.getElementById('tb-print');
  if (pb) pb.addEventListener('click', function () { window.print(); });
})();
`

main()
