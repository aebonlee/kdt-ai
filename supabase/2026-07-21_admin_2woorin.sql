-- 2woorin@gmail.com 관리자 승격 — 실습교수 총괄 책임자 (2026-07-21 대표 지시)
-- kdt_is_admin() 함수에 이메일 추가. Supabase SQL Editor에서 실행.
create or replace function public.kdt_is_admin() returns boolean
language sql stable as $$
  select coalesce(
    (auth.jwt() ->> 'email') in (
      'aebon@kyonggi.ac.kr', 'aebon@kakao.com',
      'boraborami@gmail.com', 'humanaiphd@gmail.com',
      '2woorin@gmail.com'                      -- 실습교수 총괄 책임자
    ), false);
$$;
