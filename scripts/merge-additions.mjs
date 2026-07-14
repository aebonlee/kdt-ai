// 자료 그라운딩 실습예제 병합기
// scratchpad/additions/cluster_*.mjs (각 분석 에이전트가 저장) → src/data/lectureexamples3.js
import { readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const ADD = process.env.SKALA_SCRATCH_DIR || '/private/tmp/claude-501/-Users-aebonlee/9687267a-0417-44d5-9c32-3a9303a4f76a/scratchpad/additions'

if (!existsSync(ADD)) {
  console.error('additions 폴더 없음:', ADD)
  process.exit(1)
}

const files = readdirSync(ADD).filter((f) => f.endsWith('.mjs')).sort()
const merged = {}
let total = 0
for (const f of files) {
  const mod = await import(pathToFileURL(join(ADD, f)).href)
  const add = mod.add || {}
  for (const [k, arr] of Object.entries(add)) {
    if (!Array.isArray(arr)) continue
    merged[k] = (merged[k] || []).concat(arr)
    total += arr.length
  }
  console.log(`  ${f}: ${Object.keys(add).length} keys`)
}

const header =
  '// 자료 그라운딩 실습예제 — SKALA 4기 교육생 교재·종합실습 가이드·3기 교재에 근거해\n' +
  '// 실제 실습/코드를 우리말로 재서술(왕초보·전 라인 한글 주석). 코드 주석은 사이트에서 녹색으로 표기됨.\n' +
  '// scripts/merge-additions.mjs 가 자동 병합 생성 (subjectId-day 키 → examplesFor 에 합쳐짐).\n'
const out = header + 'export const examplesExtra3 = ' + JSON.stringify(merged, null, 2) + '\n'
writeFileSync(join(ROOT, 'src', 'data', 'lectureexamples3.js'), out)
console.log(`\n생성: src/data/lectureexamples3.js — ${files.length}파일, ${Object.keys(merged).length}키, ${total}예제`)
