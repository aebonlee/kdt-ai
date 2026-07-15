// 강사(관리자) 식별 — 로그인 이메일 기준.
// ⚠️ 실제 구글/카카오 로그인에 사용하는 이메일로 교체/추가하세요.
export const ADMIN_EMAILS = [
  'aebon@kyonggi.ac.kr', // 구글 로그인
  'aebon@kakao.com', // 카카오 로그인(주 사용)
  'boraborami@gmail.com', // 안보람 (운영 매니저 — 최고관리자, 2026-07-15 대표 지시)
]

export const isAdmin = (user) =>
  !!user && ADMIN_EMAILS.includes((user.email || '').toLowerCase())
