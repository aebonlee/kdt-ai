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
      `<div class="code-wrap"><button type="button" class="copy-btn" aria-label="코드 복사">복사</button>` +
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
  h += `</section>`
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
    const tag = bySub[s.id] ? classesOf(s.id).join(', ') : '참고(미배정)'
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
        <span class="chip ${bySub[subj.id] ? 'cat' : 'm-theory'}">${bySub[subj.id] ? esc(cls.join(', ')) : '참고 · 미배정'}</span></div>
    </div>`
    for (let i = 0; i < subj.days.length; i++) sh += await renderDay(subj, i)
    subjectBlocks.push({ id: subj.id, name: subj.name, html: sh })
  }

  // 인쇄본(PDF)·no-JS 폴백용 연속 본문
  const body = home + subjectBlocks.map((b) => b.html).join('')

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
    // 페이지: 개요(표지+목차) + 과목별
    const pages = `<section class="page is-active" data-page="home" id="tb-top">${home}</section>` +
      subjectBlocks.map((b) => `<section class="page" data-page="${esc(b.id)}" id="subj-${esc(b.id)}">${b.html}</section>`).join('')
    const head = `<title>SKALA 4기 실습 교재 — 이애본 강사</title>
<style>${SCREEN_CSS}</style>`
    const content = `<div class="tb">
  <aside class="tb-side">
    <div class="tb-brandbox">
      <div class="tb-brand">SKALA <b>4기</b> 실습 교재</div>
      <div class="tb-brand-sub">이애본 강사 · 담당 ${ordered.length}과목</div>
    </div>
    <nav class="tb-nav" aria-label="과목 목차">
      <a class="sl sl-top is-active" href="#tb-top" data-goto="home">📖 표지 · 목차</a>
      ${sideItems}
    </nav>
  </aside>
  <main class="tb-main">
    <div class="tb-toolbar">
      <span class="tb-crumb" id="tb-crumb">표지 · 목차</span>
      <button type="button" class="print-btn" id="tb-print">🖨 이 과목 인쇄</button>
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
.copy-btn{display:none;}
.cmt{color:#4ade80;font-style:italic;}
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
.tb-crumb{font-weight:800;color:var(--ink);font-size:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.print-btn{flex:none;font-family:inherit;font-size:13px;font-weight:700;color:#fff;background:var(--indigo);
  border:none;border-radius:8px;padding:8px 15px;cursor:pointer;transition:background .15s;}
.print-btn:hover{background:var(--navy800);}
.print-btn:focus-visible{outline:2px solid var(--light-indigo);outline-offset:2px;}
/* 목차 링크 */
.toc-row{display:block;text-decoration:none;color:inherit;}
.toc-row:hover .toc-name{color:var(--indigo);text-decoration:underline;}
/* 코드 주석(녹색) */
.cmt{color:#4ade80;font-style:italic;}
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
  .tb{grid-template-columns:minmax(0,1fr);}
  .tb-side{position:sticky;top:0;z-index:20;height:auto;max-height:44vh;overflow-y:auto;
    border-right:none;border-bottom:1px solid rgba(255,255,255,.14);
    display:flex;flex-direction:column;padding:16px 14px 14px;}
  .tb-nav{flex-direction:row;flex-wrap:wrap;gap:6px;}
  .sl{border-left:none;border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:6px 12px;max-width:100%;}
  .sl-n{white-space:normal;word-break:keep-all;}
  .sl-m{display:none;}.sl-top{width:100%;text-align:center;}
  .tb-main{padding:0 18px 100px;overflow-x:hidden;}
  .cover{padding:40px 20px;}
  .cover-brand{letter-spacing:.12em;overflow-wrap:anywhere;}
  .cover h1{font-size:25px;}
  .cover-sub{font-size:15px;}
  .cover-meta{display:block;max-width:100%;padding:16px 18px;font-size:13px;}
  .cover-meta div{overflow-wrap:anywhere;}
  .cover-meta b{width:44px;}
  .concepts,.topics{grid-template-columns:1fr;}
  .day{padding:20px 16px;}
  .tb-toolbar{padding:10px 0;}
  .tb-crumb{font-size:14px;}
  .print-btn{padding:7px 12px;font-size:12px;}
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
    if (crumb) crumb.textContent = labelOf(id);
    window.scrollTo(0, 0);
    try { history.replaceState(null, '', id === 'home' ? '#tb-top' : '#subj-' + id); } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-goto]');
    if (!a || !root.contains(a)) return;
    e.preventDefault();
    show(a.getAttribute('data-goto'));
  });
  var m = (location.hash || '').match(/^#subj-(.+)$/);
  show(m ? m[1] : 'home');
  var pb = document.getElementById('tb-print');
  if (pb) pb.addEventListener('click', function () { window.print(); });
})();
`

main()
