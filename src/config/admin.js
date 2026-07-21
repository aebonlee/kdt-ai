// 강사(관리자) 식별 — 로그인 이메일 기준.
// ⚠️ 실제 구글/카카오 로그인에 사용하는 이메일로 교체/추가하세요.
export const ADMIN_EMAILS = [
  'aebon@kyonggi.ac.kr', // 구글 로그인
  'aebon@kakao.com', // 카카오 로그인(주 사용)
  'boraborami@gmail.com', // 안보람 (운영 매니저 — 최고관리자, 2026-07-15 대표 지시)
  'humanaiphd@gmail.com', // 임성렬 (주강사, 2026-07-16 추가)
  '2woorin@gmail.com', // 실습교수 총괄 책임자 (2026-07-21 대표 지시)
]

// 이메일 화이트리스트 판정 — 프로필 로드 전에도 동작하는 동기 함수.
export const isAllowlisted = (user) =>
  !!user && ADMIN_EMAILS.includes((user.email || '').toLowerCase())

// 하위호환 별칭.
export const isAdmin = isAllowlisted

// 대시보드 등 관리자 화면 접근 가능 여부 —
// 이메일 화이트리스트 OR 교수자로 가입(role=instructor)한 계정 전원(2026-07-21 대표 지시).
// profile 이 아직 로드되지 않았으면 화이트리스트만으로 우선 판정한다.
export const canAccessAdmin = (user, profile) =>
  isAllowlisted(user) || profile?.role === 'instructor'
