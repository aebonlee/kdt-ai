// 교수진·운영진 직책 체계 (2026-07-21 대표 정리)
//
// 접근 정책: 교수자로 가입한 계정(role=instructor)은 모두 관리자 대시보드에 접근한다.
//   대시보드는 SKALA 운영진이 공유하는 정보이고, 평가 산출물 같은 민감 파일은
//   구글드라이브 권한으로 별도 이중 보호된다([[docs.js]] 주석).
//
// 직책(title) 종류:
//   chief_manager    책임매니저      — 운영 총괄
//   class_manager    분반담당매니저   — 특정 분반 운영 담당
//   lead_professor   전임교수        — 과목 교안 저자(주강사)
//   practice_professor 실습교수      — 반별 실습 지도 (instructor 기본값)
//
// 직책은 세 곳에서 온다(우선순위 순):
//   1) kdt_profiles.title 컬럼 (DB, 나중에 부여 — 없어도 동작)
//   2) 아래 TITLE_BY_EMAIL 매핑 (알려진 사람)
//   3) role=instructor 이면 '실습교수', 관리자 화이트리스트면 '운영'

export const TITLES = {
  chief_manager: { label: '책임매니저', short: '책임', color: '#7C3AED', group: 'manager' },
  class_manager: { label: '분반담당매니저', short: '분반매니저', color: '#9333EA', group: 'manager' },
  lead_professor: { label: '전임교수', short: '전임', color: '#0E7A5F', group: 'professor' },
  practice_professor: { label: '실습교수', short: '실습', color: '#3F51FF', group: 'professor' },
}

// 알려진 계정의 직책 매핑 — 이메일(로컬파트 기준으로도 매칭)
export const TITLE_BY_EMAIL = {
  'boraborami@gmail.com': 'chief_manager',   // 안보람 (운영 총괄)
  'humanaiphd@gmail.com': 'lead_professor',  // 임성열 (전임교수·주강사)
  'aebon@kyonggi.ac.kr': 'practice_professor', // 이애본 (실습교수 — 본인, 사이트 관리자)
  'aebon@kakao.com': 'practice_professor',
}

const norm = (s) => (s || '').trim().toLowerCase()

// 직책 코드 판정 — profile(DB title/role) + user(email) 로.
export function resolveTitle(user, profile) {
  const t = profile?.title
  if (t && TITLES[t]) return t
  const email = norm(user?.email)
  if (TITLE_BY_EMAIL[email]) return TITLE_BY_EMAIL[email]
  // 로컬파트만으로도 한 번 더(구글/카카오 도메인 차이 대비)
  const lp = email.split('@')[0]
  for (const [e, code] of Object.entries(TITLE_BY_EMAIL)) {
    if (e.split('@')[0] === lp) return code
  }
  if (profile?.role === 'instructor') return 'practice_professor'
  return null
}

export function titleLabel(user, profile) {
  const code = resolveTitle(user, profile)
  return code ? TITLES[code].label : ''
}
