import { createClient } from '@supabase/supabase-js'

// 공용 Supabase 접속 정보 (전 사이트 공통, CLAUDE.md §3.2).
// ⚠️ fallback 하드코딩 필수 — 클린 빌드(gh-pages)에서 env 누락 시
//    "Supabase not configured"로 로그인이 통째로 깨지는 사고 방지.
//    kdt-ai 는 kdt_ 접두사 테이블을 쓰지만 접속 프로젝트는 공용(단일 org).
const FALLBACK_URL = 'https://hcmgdztsgjvzcyxyayaj.supabase.co'
const FALLBACK_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjbWdkenRzZ2p2emN5eHlheWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MzU4ODcsImV4cCI6MjA4NzAxMTg4N30.gznaPzY1l8qDAPsEyYNR9KS7f7VqS3xaw-_2HTSwSZw'

const url = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY

export const supabase = url && anonKey ? createClient(url, anonKey) : null

export const hasSupabase = Boolean(supabase)
