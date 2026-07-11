// SKALA 4기 강의안 → A4 PDF 교재용 HTML 생성기
// 사용: node scripts/build-textbook.mjs  → dist-textbook/textbook.html
// 이후 Chrome 헤드리스 --print-to-pdf 로 PDF 변환 (scripts/make-textbook-pdf.sh)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { subjects, sessions } from '../src/data/curriculum.js'
import { PERIOD_TIMES } from '../src/data/lectureperiods.js'
import { modeOf, periodTagsOf } from '../src/data/lecturemodes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escNl = (s) => esc(s).replace(/\n/g, '<br>')

// 분반 반복 여부 (표지·과목 헤더 표기용)
const bySub = {}
for (const s of sessions) (bySub[s.subjectId] = bySub[s.subjectId] || []).push(`${s.region}${s.klass}`)
const classesOf = (id) => [...new Set(bySub[id] || [])]

// 담당 세션이 있는 과목 순서(첫 강의일) + 참고(미배정) 과목은 뒤에
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

function renderExamples(list, heading, icon) {
  if (!list?.length) return ''
  let h = `<h4 class="sec">${icon} ${heading}</h4>`
  for (const ex of list) {
    h += `<div class="ex"><div class="ex-h">${esc(ex.title)} <span class="lang">(${esc(ex.lang)})</span></div>` +
      `<pre class="code"><code>${esc(ex.code)}</code></pre>` +
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
  h += `</section>`
  return h
}

async function main() {
  let body = ''
  // 표지
  const totalDays = ordered.reduce((a, s) => a + s.days.length, 0)
  body += `<section class="cover">
    <div class="cover-brand">SKALA · SK AI Leader Academy</div>
    <h1>SKALA 4기 강의안 교재</h1>
    <p class="cover-sub">이애본 강사 담당 전 과목 · 강의안 통합본</p>
    <div class="cover-meta">
      <div><b>과정</b> AI 캠퍼스 · K-뉴딜</div>
      <div><b>기간</b> 2026.07.14 ~ 10.28 (평일 09:00~18:00, 오프라인)</div>
      <div><b>지역</b> 울산 · 판교(4·5층) · 광주</div>
      <div><b>수록</b> ${ordered.length}과목 · ${totalDays}일차</div>
    </div>
    <p class="cover-note">본 교재의 코드·설명은 SKALA 4기 실라버스에 근거해 우리말로 재서술한 자립 학습용 자료입니다.</p>
  </section>`

  // 목차
  body += `<section class="toc"><h2>목차</h2><ol>`
  ordered.forEach((s, i) => {
    const cls = classesOf(s.id)
    const tag = bySub[s.id] ? cls.join(', ') : '참고(미배정)'
    body += `<li><span class="toc-name">${esc(s.name)}</span><span class="toc-meta">${esc(s.code)} · ${s.days.length}일차 · ${esc(tag)}</span></li>`
  })
  body += `</ol></section>`

  // 과목별
  for (const subj of ordered) {
    const cls = classesOf(subj.id)
    body += `<section class="subject-head" id="subj-${esc(subj.id)}">
      <div class="sh-cat">${esc(subj.category)}</div>
      <h2>${esc(subj.name)}</h2>
      <p class="sh-sum">${esc(subj.summary)}</p>
      <div class="sh-meta"><span class="chip code">${esc(subj.code)}</span>
        <span class="chip day">${subj.days.length}일차</span>
        <span class="chip ${bySub[subj.id] ? 'cat' : 'm-theory'}">${bySub[subj.id] ? esc(cls.join(', ')) : '참고 · 미배정'}</span></div>
    </section>`
    for (let i = 0; i < subj.days.length; i++) body += await renderDay(subj, i)
  }

  const outDir = join(ROOT, 'dist-textbook')
  mkdirSync(outDir, { recursive: true })

  const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8">
<title>SKALA 4기 강의안 교재 — 이애본 강사</title>
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
pre.code{background:#0f1229;color:#e6e9f5;border-radius:8px;padding:12px 14px;overflow:visible;white-space:pre-wrap;word-break:break-word;font-family:'SFMono-Regular',Consolas,monospace;font-size:8.3pt;line-height:1.55;margin:0;}
p.note{margin:6px 0 0;font-size:9pt;color:var(--soft);line-height:1.6;}
`

main()
