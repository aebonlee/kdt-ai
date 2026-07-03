// Supabase 데이터 액세스 — 게시판(Q&A·공지), 댓글, 학습 진도
import { supabase, hasSupabase } from '../lib/supabase'

const guard = () => {
  if (!hasSupabase) throw new Error('Supabase 연결 설정이 필요합니다.')
}

const nameOf = (user) =>
  user?.user_metadata?.name ||
  user?.user_metadata?.full_name ||
  user?.user_metadata?.nickname ||
  user?.email ||
  '익명'

// ── 게시글 (type: 'qna' | 'notice') ──
export async function listPosts(type) {
  guard()
  const { data, error } = await supabase
    .from('skala_posts')
    .select('*')
    .eq('type', type)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getPost(id) {
  guard()
  const { data, error } = await supabase.from('skala_posts').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function createPost({ type, title, body, user }) {
  guard()
  const { data, error } = await supabase
    .from('skala_posts')
    .insert({ type, title, body, author_id: user.id, author_name: nameOf(user) })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deletePost(id) {
  guard()
  const { error } = await supabase.from('skala_posts').delete().eq('id', id)
  if (error) throw error
}

// ── 댓글 ──
export async function listComments(postId) {
  guard()
  const { data, error } = await supabase
    .from('skala_comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export async function addComment({ postId, body, user }) {
  guard()
  const { data, error } = await supabase
    .from('skala_comments')
    .insert({ post_id: postId, body, author_id: user.id, author_name: nameOf(user) })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteComment(id) {
  guard()
  const { error } = await supabase.from('skala_comments').delete().eq('id', id)
  if (error) throw error
}

// ── 학습 진도 (자가평가 동기화) ──
export async function syncProgress(user, dates) {
  guard()
  const { error } = await supabase
    .from('skala_progress')
    .upsert(
      { user_id: user.id, user_name: nameOf(user), completed: dates, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' },
    )
  if (error) throw error
}

export async function getMyProgress(userId) {
  guard()
  const { data, error } = await supabase.from('skala_progress').select('*').eq('user_id', userId).maybeSingle()
  // error 를 삼키면 '진도 없음(null)'과 '조회 실패'가 구분되지 않아, 이후 syncProgress 가 서버 진도를 빈 값으로 덮어쓸 수 있다.
  if (error) throw error
  return data
}

// 강사 관리용 — 전체 학습자 진도 (RLS: 관리자만 조회 허용)
export async function listAllProgress() {
  guard()
  const { data, error } = await supabase
    .from('skala_progress')
    .select('*')
    .order('updated_at', { ascending: false })
  if (error) throw error
  return data
}

export async function countPosts() {
  guard()
  const { count, error } = await supabase.from('skala_posts').select('*', { count: 'exact', head: true })
  if (error) throw error
  return count ?? 0
}
