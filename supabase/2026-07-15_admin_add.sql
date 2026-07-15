-- 관리자 추가(안보람) — 이 스니펫만 SQL Editor에서 실행 (멱등)
create or replace function public.skala_is_admin()
returns boolean language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = any (array[
    'aebon@kyonggi.ac.kr',   -- 이애본 · 구글
    'aebon@kakao.com',       -- 이애본 · 카카오(주 사용)
    'boraborami@gmail.com'   -- 안보람 · 운영 매니저 (2026-07-15 추가)
  ]);
$$;
