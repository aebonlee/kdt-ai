// 강사(관리자) 식별 — 로그인 이메일 기준.
// ⚠️ 실제 구글/카카오 로그인에 사용하는 이메일로 교체/추가하세요.
export const ADMIN_EMAILS = [
  'aebon@kyonggi.ac.kr',
  'aebonlee@gmail.com',
]

export const isAdmin = (user) =>
  !!user && ADMIN_EMAILS.includes((user.email || '').toLowerCase())
