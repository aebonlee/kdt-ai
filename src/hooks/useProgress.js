// 학습 진도(자가평가) 상태 — localStorage 기반 외부 스토어.
// 일자(session date)별 "이해 완료" 여부를 저장한다. (출결과 무관, 학습 이해도 자가체크)
import { useSyncExternalStore } from 'react'

const KEY = 'skala-progress'
const listeners = new Set()

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

let state = load()

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

function emit() {
  listeners.forEach((l) => l())
}

export function setDone(date, done) {
  const next = { ...state }
  if (done) next[date] = true
  else delete next[date]
  state = next
  save()
  emit()
}

export function toggleDone(date) {
  setDone(date, !state[date])
}

export function resetProgress() {
  state = {}
  save()
  emit()
}

function subscribe(l) {
  listeners.add(l)
  return () => listeners.delete(l)
}

function getSnapshot() {
  return state
}

export function useProgress() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
