-- ═══════════════════════════════════════════════════════════
-- skala_ → kdt_ 회원 데이터 이관 (2026-07-21)
-- 대상: skala에 가입한 학생 81명 + 교수 10명 = 91명의 프로필·진도·평가·게시판
-- 전제: 2026-07-21_kdt_setup.sql 로 kdt_ 테이블이 이미 생성돼 있어야 함.
-- auth.users(로그인 계정)는 공유라 이관 대상 아님 — 프로필 등 앱 데이터만 복사.
-- 안전: on conflict do nothing → 여러 번 실행해도 중복/덮어쓰기 없음(멱등).
--       kdt_ 에 이미 입력한 값이 있으면 그것을 우선 보존.
-- ═══════════════════════════════════════════════════════════

-- ── ⓪ 선(先)교정: kdt_progress.completed 가 text[] 로 잘못 만들어진 경우 jsonb 로 변경 ──
--    (초기 setup SQL 버그 — skala_progress.completed 는 jsonb 이므로 맞춰야 이관됨)
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='kdt_progress'
      and column_name='completed' and data_type='ARRAY'
  ) then
    alter table public.kdt_progress
      alter column completed drop default,
      alter column completed type jsonb using to_jsonb(completed),
      alter column completed set default '[]'::jsonb;
  end if;
end $$;

-- ── ① 회원 프로필 (소속·직책·담당분반·확인시각) ──
insert into public.kdt_profiles
  (user_id, name, email, role, title, track, class_no, teach_classes, confirmed_at, created_at, updated_at)
select
  user_id, name, email, role,
  -- title 컬럼이 skala_profiles 에 없을 수 있으므로 안전하게 처리:
  (case when to_jsonb(p) ? 'title' then p.title else null end),
  track, class_no, teach_classes, confirmed_at, created_at, now()
from public.skala_profiles p
on conflict (user_id) do nothing;

-- ── ② 학습 진도 ──
insert into public.kdt_progress (user_id, completed, user_name, updated_at)
select user_id, completed, user_name, updated_at
from public.skala_progress
on conflict (user_id) do nothing;

-- ── ③ 종합실습 평가 기록 (관리자 입력분) ──
--    ⚠️ kdt_evaluations 가 초기 setup SQL 버그로 skala 와 컬럼이 다르게 만들어졌다면
--       (evaluator_id/bigint id) 데이터가 없을 때 원본 스키마로 재생성한다.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='kdt_evaluations' and column_name='evaluator_id'
  ) and not exists (select 1 from public.kdt_evaluations limit 1) then
    drop table public.kdt_evaluations;
  end if;
end $$;

create table if not exists public.kdt_evaluations (
  id           uuid primary key default gen_random_uuid(),
  subject_id   text not null,
  student_name text not null,
  student_no   text default '',
  track        text,
  class_no     int,
  profile_id   uuid,
  scores       jsonb not null default '{}'::jsonb,
  note_basis   text default '',
  note_improve text default '',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists kdt_evaluations_subject_idx on public.kdt_evaluations(subject_id, track, class_no);
alter table public.kdt_evaluations enable row level security;
drop policy if exists "kdt_evaluations_admin_all" on public.kdt_evaluations;
create policy "kdt_evaluations_admin_all" on public.kdt_evaluations for all using (public.kdt_is_admin()) with check (public.kdt_is_admin());

insert into public.kdt_evaluations
  (id, subject_id, student_name, student_no, track, class_no, profile_id, scores, note_basis, note_improve, created_at, updated_at)
select
  id, subject_id, student_name, student_no, track, class_no, profile_id, scores, note_basis, note_improve, created_at, updated_at
from public.skala_evaluations
on conflict (id) do nothing;

-- ── ④ 게시판 글·댓글 ──
--    ⚠️ kdt_posts/comments 가 초기 setup 버그로 id=bigint/is_pinned 등
--       원본(uuid, is_pinned 없음)과 다르게 만들어졌다면 비어 있을 때 재생성.
do $$
begin
  if exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='kdt_posts'
               and column_name='id' and data_type in ('bigint','integer'))
     and not exists (select 1 from public.kdt_posts limit 1) then
    drop table if exists public.kdt_comments;   -- FK 때문에 먼저
    drop table public.kdt_posts;
  end if;
end $$;

create table if not exists public.kdt_posts (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('qna', 'notice')),
  title       text not null,
  body        text default '',
  author_id   uuid not null default auth.uid(),
  author_name text,
  created_at  timestamptz not null default now()
);
alter table public.kdt_posts enable row level security;
drop policy if exists "kdt_posts_read"  on public.kdt_posts;
drop policy if exists "kdt_posts_write" on public.kdt_posts;
create policy "kdt_posts_read"  on public.kdt_posts for select using (true);
create policy "kdt_posts_write" on public.kdt_posts for insert with check (auth.uid() = author_id);
create policy "kdt_posts_own"   on public.kdt_posts for update using (auth.uid() = author_id or public.kdt_is_admin());
create policy "kdt_posts_del"   on public.kdt_posts for delete using (auth.uid() = author_id or public.kdt_is_admin());

create table if not exists public.kdt_comments (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid not null references public.kdt_posts(id) on delete cascade,
  body        text not null,
  author_id   uuid not null default auth.uid(),
  author_name text,
  created_at  timestamptz not null default now()
);
alter table public.kdt_comments enable row level security;
drop policy if exists "kdt_comments_read"  on public.kdt_comments;
drop policy if exists "kdt_comments_write" on public.kdt_comments;
create policy "kdt_comments_read"  on public.kdt_comments for select using (true);
create policy "kdt_comments_write" on public.kdt_comments for insert with check (auth.uid() = author_id);

insert into public.kdt_posts
  (id, type, title, body, author_id, author_name, created_at)
select id, type, title, body, author_id, author_name, created_at
from public.skala_posts
on conflict (id) do nothing;

insert into public.kdt_comments
  (id, post_id, body, author_id, author_name, created_at)
select id, post_id, body, author_id, author_name, created_at
from public.skala_comments
on conflict (id) do nothing;

-- ── 이관 결과 확인 ──
select 'kdt_profiles'   as tbl, count(*) from public.kdt_profiles
union all select 'kdt_progress',    count(*) from public.kdt_progress
union all select 'kdt_evaluations', count(*) from public.kdt_evaluations
union all select 'kdt_posts',       count(*) from public.kdt_posts
union all select 'kdt_comments',    count(*) from public.kdt_comments;
