// 담당일정 외 과목 심화 병합기 — scratchpad/etc_enrich/enrich_*.mjs → src/data/otherdeep.js
import { readdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIR = process.env.SKALA_SCRATCH_DIR || '/private/tmp/claude-501/-Users-aebonlee/9687267a-0417-44d5-9c32-3a9303a4f76a/scratchpad/etc_enrich'

const merged = {}
for (const f of readdirSync(DIR).filter((f) => f.endsWith('.mjs')).sort()) {
  const { add } = await import(pathToFileURL(join(DIR, f)).href)
  for (const [id, v] of Object.entries(add)) {
    // 형식 검증
    for (const k of v.concepts || []) if (!k.term || !k.desc) throw new Error(`${id}: concept 필드 누락`)
    for (const e of v.examples || []) if (!e.title || !e.lang || !e.code) throw new Error(`${id}: example 필드 누락(${e.title || '무제'})`)
    // 같은 과목이 여러 파일에 있으면 덮어쓰지 않고 이어붙인다(기존 콘텐츠 보존)
    const prev = merged[id] || {}
    merged[id] = {
      ...prev,
      ...v,
      concepts: [...(prev.concepts || []), ...(v.concepts || [])],
      examples: [...(prev.examples || []), ...(v.examples || [])],
    }
    console.log(`  ${f} → ${id}: 개념 +${v.concepts?.length || 0} · 실습 +${v.examples?.length || 0}`)
  }
}

const header =
  '// 담당일정 외 과목 심화(핵심개념+따라하기 실습) — 3·4기 상세 교재 근거, 우리말 재서술(전 라인 한글 주석).\n' +
  '// scripts/merge-otherdeep.mjs 가 scratchpad/etc_enrich/enrich_*.mjs 를 병합 생성.\n'
writeFileSync(join(ROOT, 'src/data/otherdeep.js'), header + 'export const otherDeep = ' + JSON.stringify(merged, null, 2) + '\n')
const nc = Object.values(merged).reduce((a, v) => a + (v.concepts?.length || 0), 0)
const ne = Object.values(merged).reduce((a, v) => a + (v.examples?.length || 0), 0)
console.log(`\n생성: src/data/otherdeep.js — ${Object.keys(merged).length}과목, 개념 ${nc} · 실습 ${ne}`)
