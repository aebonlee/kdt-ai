// 동일인 다계정 통합 —
// 구글·카카오를 함께 쓰거나 같은 제공자로 여러 번 가입하면 한 사람이 여러 행으로 잡힌다.
// (실측: 김영희 교수 3회 가입, 2026-07-21 대표 확인)
//
// 판정 순서
//   1) SAME_PERSON_EMAIL_GROUPS 에 명시된 이메일 묶음 — 가장 강한 근거. 이름이 달라도 합친다.
//   2) 이메일 로컬파트(@ 앞) 일치 — 같은 아이디로 구글·카카오·네이버에 가입한 경우.
//      실측: 김영희 교수가 openvision… 로컬파트로 3개 도메인에 가입(2026-07-21 대표 확인).
//   3) 이름 일치 — 교수자처럼 모집단이 작고 이름이 겹치지 않는 경우에만 쓴다.
// 학생은 동명이인 가능성이 있어 이름 병합을 기본으로 쓰지 않는다.
// 다만 로컬파트 일치(2)는 학생에게도 안전한 편이라 기본 적용한다 —
// 서로 다른 사람이 같은 아이디를 쓰면서 같은 기수에 있을 확률은 낮다.

// 이름이 서로 다르게 적혔거나(오타·영문) 이름만으로 못 묶는 예외를 여기에 적는다.
// 예: ['a@gmail.com', 'a@kakao.com']
export const SAME_PERSON_EMAIL_GROUPS = []

const norm = (s) => (s || '').replace(/\s+/g, '').toLowerCase()

// 이메일 → 그룹 대표 이메일
const emailToLead = (() => {
  const m = new Map()
  for (const g of SAME_PERSON_EMAIL_GROUPS) {
    const lead = norm(g[0])
    for (const e of g) m.set(norm(e), lead)
  }
  return m
})()

/**
 * 같은 사람의 프로필 행들을 하나로 접는다.
 * @param {Array} rows  kdt_profiles 행 (name·email·created_at·confirmed_at 등)
 * @param {{byName?: boolean}} opts  byName=true 면 이름 일치도 동일인으로 본다(교수자용)
 * @returns {Array} 대표 행 + accounts(전체 계정 목록) + accountCount
 */
export function mergePeople(rows, { byName = false } = {}) {
  // 1차: 로컬파트가 여러 도메인에 걸쳐 나타나는지 먼저 조사한다.
  //      (한 도메인에만 있으면 굳이 로컬파트로 묶을 이유가 없다)
  const localDomains = new Map()
  for (const r of rows || []) {
    const [lp, dom] = norm(r.email).split('@')
    if (!lp || !dom) continue
    if (!localDomains.has(lp)) localDomains.set(lp, new Set())
    localDomains.get(lp).add(dom)
  }

  const buckets = new Map()
  for (const r of rows || []) {
    const e = norm(r.email)
    const lp = e.split('@')[0]
    let key
    if (emailToLead.has(e)) key = emailToLead.get(e)                       // ① 명시 그룹
    else if (lp && localDomains.get(lp)?.size > 1) key = `local:${lp}`      // ② 로컬파트 다도메인
    else if (byName && r.name) key = `name:${norm(r.name)}`                 // ③ 이름(교수자)
    else key = e
    if (!buckets.has(key)) buckets.set(key, [])
    buckets.get(key).push(r)
  }

  const out = []
  for (const group of buckets.values()) {
    // 먼저 가입한 계정을 대표로 삼되, 소속 확인(confirmed_at)이 된 계정이 있으면 그쪽을 우선한다
    const sorted = [...group].sort((a, b) => String(a.created_at || '').localeCompare(String(b.created_at || '')))
    const lead = sorted.find((r) => r.confirmed_at) || sorted[0]
    out.push({
      ...lead,
      // 대표 행이 비어 있으면 다른 계정의 값으로 메운다
      track: lead.track || sorted.find((r) => r.track)?.track || null,
      class_no: lead.class_no ?? sorted.find((r) => r.class_no != null)?.class_no ?? null,
      confirmed_at: lead.confirmed_at || sorted.find((r) => r.confirmed_at)?.confirmed_at || null,
      accounts: sorted.map((r) => ({ email: r.email, created_at: r.created_at, confirmed_at: r.confirmed_at })),
      accountCount: sorted.length,
    })
  }
  return out.sort((a, b) => String(a.created_at || '').localeCompare(String(b.created_at || '')))
}

/** 교수자 명단용 — 이름 병합까지 적용한다. */
export const mergeInstructors = (rows) => mergePeople(rows, { byName: true })
