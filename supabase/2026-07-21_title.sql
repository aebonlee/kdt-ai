-- 교수진·운영진 직책 컬럼 (2026-07-21)
-- role(student/instructor)과 별개로 세부 직책을 담는다.
-- 값은 src/config/roles.js TITLES 의 코드와 일치:
--   chief_manager / class_manager / lead_professor / practice_professor
-- 미지정(null)이면 앱에서 role·이메일 매핑으로 기본값을 채운다.
alter table if exists public.kdt_profiles
  add column if not exists title text
  check (title is null or title in
    ('chief_manager', 'class_manager', 'lead_professor', 'practice_professor'));
