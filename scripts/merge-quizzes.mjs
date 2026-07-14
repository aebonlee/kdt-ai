// 복습 퀴즈 병합기 — 기존 src/data/quizzes.js + scratchpad/quiz_add/quiz_*.mjs → quizzes.js 재생성
import { readdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const ADD = '/private/tmp/claude-501/-Users-aebonlee/9687267a-0417-44d5-9c32-3a9303a4f76a/scratchpad/quiz_add'

const { quizzes: existing } = await import(pathToFileURL(join(ROOT, 'src/data/quizzes.js')).href)
const merged = { ...existing }

for (const f of readdirSync(ADD).filter((f) => f.endsWith('.mjs')).sort()) {
  const { add } = await import(pathToFileURL(join(ADD, f)).href)
  for (const [k, arr] of Object.entries(add)) {
    if (merged[k]) { console.log(`  skip ${k} (이미 존재)`); continue }
    // 형식 검증: 필수 필드·choice 인덱스 범위
    for (const q of arr) {
      if (!q.type || !q.q || q.answer === undefined || !q.explain) throw new Error(`${k}: 필드 누락 — ${q.q?.slice(0, 30)}`)
      if (q.type === 'choice' && (!Array.isArray(q.choices) || q.answer < 0 || q.answer >= q.choices.length))
        throw new Error(`${k}: choice 인덱스 오류 — ${q.q.slice(0, 30)}`)
    }
    merged[k] = arr
    console.log(`  ${f} → ${k}: ${arr.length}문항`)
  }
}

const header =
  '// 과목별 복습 퀴즈 — 과목 마지막날에 표시. 실제 강의 내용에 근거해 작성(왕초보 친화·상세 해설).\n' +
  '// { type: ox|choice|short, q, choices?(4개), answer(O/X | 0기준 인덱스 | 단답), explain }\n' +
  '// scripts/merge-quizzes.mjs 로 병합 생성.\n'
writeFileSync(join(ROOT, 'src/data/quizzes.js'), header + 'export const quizzes = ' + JSON.stringify(merged, null, 2) + '\n')
const total = Object.values(merged).reduce((a, x) => a + x.length, 0)
console.log(`\n생성: src/data/quizzes.js — ${Object.keys(merged).length}과목 ${total}문항`)
