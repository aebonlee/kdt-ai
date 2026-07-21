-- ============================================================
-- SKALA 4기 — 소속 분반 프로필 (2026-07-14 추가분)
-- ⚠️ 이 파일만 실행하세요 (schema.sql 전체 재실행 금지 — 기존 정책과 충돌).
-- 멱등(idempotent): 여러 번 실행해도 안전합니다.
-- auth.users 트리거를 쓰지 않습니다(가입 마비 사고 예방) —
-- 프로필 행은 로그인 후 클라이언트가 직접 upsert 합니다.
-- ============================================================

create table if not exists public.kdt_profiles (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  email       text,
  name        text,
  role        text not null default 'student' check (role in ('student', 'instructor')),
  -- 학생: 소속 트랙/반 (track: gj·us·p4·p5)
  track       text check (track in ('gj', 'us', 'p4', 'p5')),
  class_no    int,
  -- 교수자: 담당 분반 목록 [{track, no}] (예: [{"track":"p5","no":7}])
  teach_classes jsonb not null default '[]'::jsonb,
  confirmed_at timestamptz,          -- 본인이 "맞음" 확인한 시각(주기 재확인 기준)
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.kdt_profiles enable row level security;

-- 본인 행만 읽기/쓰기, 관리자(강사)는 전체 열람 — 재실행 안전하게 drop 후 생성
drop policy if exists "profiles_self_select" on public.kdt_profiles;
create policy "profiles_self_select" on public.kdt_profiles
  for select using (auth.uid() = user_id or public.kdt_is_admin());

drop policy if exists "profiles_self_insert" on public.kdt_profiles;
create policy "profiles_self_insert" on public.kdt_profiles
  for insert with check (auth.uid() = user_id);

drop policy if exists "profiles_self_update" on public.kdt_profiles;
create policy "profiles_self_update" on public.kdt_profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
