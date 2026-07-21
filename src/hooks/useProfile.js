// 소속 분반 프로필(skala_profiles) — 공유 스토어.
// 헤더 배지·온보딩 모달·학습관리가 같은 상태를 본다.
// 테이블 미생성(42P01) 등 오류 시에는 조용히 비활성화(status: 'unavailable')되어 사이트 이용을 막지 않는다.
import { useSyncExternalStore } from 'react'
import { supabase, hasSupabase } from '../lib/supabase'

const listeners = new Set()
let state = { status: 'idle', profile: null, userId: null }

// 확인(confirmed_at)이 이 일수보다 오래되면 재확인 배너를 띄운다
export const RECONFIRM_DAYS = 14

function emit() {
  listeners.forEach((l) => l())
}

function set(next) {
  state = { ...state, ...next }
  emit()
}

export async function loadProfile(user) {
  if (!hasSupabase || !user) {
    set({ status: 'unavailable', profile: null, userId: null })
    return
  }
  if (state.userId === user.id && (state.status === 'ready' || state.status === 'loading')) return
  set({ status: 'loading', userId: user.id })
  try {
    const { data, error } = await supabase
      .from('skala_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()
    if (error) {
      // 테이블 미생성(42P01) 포함 — 기능만 끄고 사이트는 정상 동작
      console.warn('[skala_profiles] 조회 실패:', error.message)
      set({ status: 'unavailable', profile: null })
      return
    }
    set({ status: 'ready', profile: data || null })
  } catch (e) {
    console.warn('[skala_profiles] 조회 예외:', e)
    set({ status: 'unavailable', profile: null })
  }
}

export async function saveProfile(user, patch) {
  if (!hasSupabase || !user) return { error: new Error('로그인이 필요합니다') }
  const row = {
    user_id: user.id,
    email: user.email || null,
    name:
      user.user_metadata?.name || user.user_metadata?.full_name || user.user_metadata?.nickname || null,
    updated_at: new Date().toISOString(),
    ...patch,
  }
  let { data, error } = await supabase
    .from('skala_profiles')
    .upsert(row, { onConflict: 'user_id' })
    .select()
    .maybeSingle()
  // title 컬럼이 아직 생성되지 않은 환경(supabase/2026-07-21_title.sql 미실행)에서는
  // title 없이 한 번 더 시도해 저장 자체가 막히지 않게 한다.
  if (error && /['"]?title['"]? column/i.test(error.message || '')) {
    const { title, ...rest } = row
    ;({ data, error } = await supabase
      .from('skala_profiles')
      .upsert(rest, { onConflict: 'user_id' })
      .select()
      .maybeSingle())
  }
  if (!error) set({ status: 'ready', profile: data })
  return { data, error }
}

// "지금 정보가 맞다" 재확인 — confirmed_at만 갱신
export async function reconfirmProfile(user) {
  return saveProfile(user, { confirmed_at: new Date().toISOString() })
}

// 재확인이 필요한 상태인지 (미확인이거나 확인이 오래됨)
export function needsReconfirm(profile) {
  if (!profile) return true
  if (!profile.confirmed_at) return true
  const age = Date.now() - new Date(profile.confirmed_at).getTime()
  return age > RECONFIRM_DAYS * 24 * 60 * 60 * 1000
}

// 프로필이 실질 정보를 갖췄는지 (학생: 트랙+반 / 교수자: 담당 분반 1개 이상)
// 담당 분반 선택이 필요한 직책 — 나머지(전임교수·책임매니저)는 분반 없이도 완성
const TITLE_NEEDS_CLASSES = new Set(['practice_professor', 'class_manager'])

export function isProfileComplete(profile) {
  if (!profile) return false
  if (profile.role === 'instructor') {
    if (!profile.title) return false                       // 직책 미선택
    if (!TITLE_NEEDS_CLASSES.has(profile.title)) return true // 전임교수·책임매니저
    return (profile.teach_classes || []).length > 0        // 분반 필요 직책
  }
  return !!profile.track && !!profile.class_no
}

function subscribe(l) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useProfile() {
  return useSyncExternalStore(subscribe, () => state)
}
