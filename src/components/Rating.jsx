// 난이도(5단계)·중요도(★5개) 미니 배지 — 선수학습·강의안 공용
// 난이도 = 선수지식 요구량 + 개념 추상도 + 실습 환경 난도
// 중요도 = 과정 목표(AI 실무) 직결도 + 후속 과목 연결성 + 실무 사용 빈도
// ⚠ 값은 이애본 실습교수의 학습 안내용 판단 기준이다 — 정본 실라버스에는 등급 표기가 없다.
const LEVEL_META = {
  1: ['입문', '#0E7A5F'],
  2: ['기초', '#0d9488'],
  3: ['보통', '#D9730D'],
  4: ['심화', '#EA580C'],
  5: ['고난도', '#E5484D'],
}
const MAX = 5

export default function Rating({ level, weight }) {
  if (!level && !weight) return null
  const [lvLabel, lvColor] = LEVEL_META[level] || LEVEL_META[3]
  const w = Math.min(MAX, Math.max(0, weight || 0))
  return (
    <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
      <span
        style={{ fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 999, color: lvColor, background: 'color-mix(in srgb, ' + lvColor + ' 12%, transparent)' }}
        title={'난이도 ' + level + '/' + MAX + ' — 1 입문 · 2 기초 · 3 보통 · 4 심화 · 5 고난도'}
      >
        난이도 {lvLabel}
      </span>
      <span
        style={{ fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 999, color: 'var(--gold)', background: 'var(--navy-50)' }}
        title={'중요도 ' + w + '/' + MAX}
      >
        중요도 {'★'.repeat(w)}{'☆'.repeat(MAX - w)}
      </span>
    </span>
  )
}
