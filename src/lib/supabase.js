import { createClient } from '@supabase/supabase-js'

// 환경변수가 있을 때만 클라이언트를 생성한다.
// (커리큘럼을 정적 데이터로만 운영하는 동안에는 null 이어도 사이트가 정상 동작한다.)
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && anonKey ? createClient(url, anonKey) : null

export const hasSupabase = Boolean(supabase)
