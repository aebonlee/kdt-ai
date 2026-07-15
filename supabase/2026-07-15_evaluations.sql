-- ============================================================
-- SKALA 4기 — 교과목 종합실습 평가 기록 (2026-07-15 추가분)
-- ⚠️ 이 파일만 SQL Editor 에 붙여넣고 실행하세요 (schema.sql 전체 재실행 금지).
-- 멱등(idempotent): 여러 번 실행해도 안전합니다. 관리자(강사) 전용 테이블.
-- ============================================================

create table if not exists public.skala_evaluations (
  id           uuid primary key default gen_random_uuid(),
  subject_id   text not null,            -- 과목 id (exams.js 키)
  student_name text not null,
  student_no   text default '',          -- 훈련생 고유번호(수기)
  track        text,                     -- gj·us·p4·p5
  class_no     int,
  profile_id   uuid,                     -- skala_profiles 연결(등록 학생인 경우)
  scores       jsonb not null default '{}'::jsonb,  -- { "평가항목명": 점수 }
  note_basis   text default '',          -- 점수 판단 근거
  note_improve text default '',          -- 보완사항
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists skala_evaluations_subject_idx
  on public.skala_evaluations (subject_id);

alter table public.skala_evaluations enable row level security;

-- 관리자(강사)만 접근
drop policy if exists "evaluations_admin_all" on public.skala_evaluations;
create policy "evaluations_admin_all" on public.skala_evaluations
  for all using (public.skala_is_admin()) with check (public.skala_is_admin());
