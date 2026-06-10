-- ============================================================
-- SKALA 4기 — 게시판·댓글·학습진도 스키마 (Supabase / Postgres)
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.
-- 테이블 접두어: skala_  (기존 프로젝트와 분리)
-- ============================================================

create extension if not exists pgcrypto;

-- 관리자(강사) 이메일 판별 — 로그인 이메일 기준
-- ⚠️ 실제 강사 로그인 이메일로 교체/추가하세요. (프론트 src/config/admin.js 와 동일하게)
create or replace function public.skala_is_admin()
returns boolean language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = any (array[
    'aebon@kyonggi.ac.kr',
    'aebonlee@gmail.com'
  ]);
$$;

-- ── 게시글 (Q&A / 공지) ──
create table if not exists public.skala_posts (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('qna', 'notice')),
  title       text not null,
  body        text default '',
  author_id   uuid not null default auth.uid(),
  author_name text,
  created_at  timestamptz not null default now()
);
alter table public.skala_posts enable row level security;

create policy "posts_read"   on public.skala_posts for select using (auth.uid() is not null);
create policy "posts_insert" on public.skala_posts for insert
  with check (auth.uid() = author_id and (type = 'qna' or public.skala_is_admin()));
create policy "posts_update" on public.skala_posts for update
  using (auth.uid() = author_id or public.skala_is_admin());
create policy "posts_delete" on public.skala_posts for delete
  using (auth.uid() = author_id or public.skala_is_admin());

-- ── 댓글 ──
create table if not exists public.skala_comments (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid not null references public.skala_posts(id) on delete cascade,
  body        text not null,
  author_id   uuid not null default auth.uid(),
  author_name text,
  created_at  timestamptz not null default now()
);
alter table public.skala_comments enable row level security;

create policy "comments_read"   on public.skala_comments for select using (auth.uid() is not null);
create policy "comments_insert" on public.skala_comments for insert with check (auth.uid() = author_id);
create policy "comments_delete" on public.skala_comments for delete
  using (auth.uid() = author_id or public.skala_is_admin());

-- ── 학습 진도 (자가평가 동기화) ──
create table if not exists public.skala_progress (
  user_id    uuid primary key default auth.uid(),
  user_name  text,
  completed  jsonb default '[]'::jsonb,   -- 이해 완료한 날짜 문자열 배열
  updated_at timestamptz default now()
);
alter table public.skala_progress enable row level security;

-- 본인 진도는 읽기/쓰기, 강사는 전체 읽기
create policy "progress_select" on public.skala_progress for select
  using (auth.uid() = user_id or public.skala_is_admin());
create policy "progress_insert" on public.skala_progress for insert with check (auth.uid() = user_id);
create policy "progress_update" on public.skala_progress for update using (auth.uid() = user_id);

create index if not exists idx_skala_posts_type on public.skala_posts (type, created_at desc);
create index if not exists idx_skala_comments_post on public.skala_comments (post_id, created_at);
