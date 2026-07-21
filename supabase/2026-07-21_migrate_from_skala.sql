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
insert into public.kdt_evaluations
  (subject_id, track, class_no, student_name, student_no, scores, note_basis, note_improve, evaluator_id, updated_at)
select
  subject_id, track, class_no, student_name, student_no, scores, note_basis, note_improve, evaluator_id, updated_at
from public.skala_evaluations
on conflict do nothing;

-- ── ④ 게시판 글·댓글 (원하면 함께 이관) ──
insert into public.kdt_posts
  (id, type, title, body, author_id, author_name, is_pinned, created_at)
select id, type, title, body, author_id, author_name, is_pinned, created_at
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
