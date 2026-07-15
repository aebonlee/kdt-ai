// 난이도(하·중·상)·중요도(★) 미니 배지 — 선수학습·강의안 공용
const LEVEL_META = { 1: ['하', '#0E7A5F'], 2: ['중', '#D9730D'], 3: ['상', '#E5484D'] }

export default function Rating({ level, weight }) {
  if (!level && !weight) return null
  const [lvLabel, lvColor] = LEVEL_META[level] || LEVEL_META[2]
  return (
    <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
      <span style={{ fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 999, color: lvColor, background: 'color-mix(in srgb, ' + lvColor + ' 12%, transparent)' }}>
        난이도 {lvLabel}
      </span>
      <span style={{ fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 999, color: 'var(--gold)', background: 'var(--navy-50)' }} title={'중요도 ' + (weight || 0) + '/3'}>
        중요도 {'★'.repeat(weight || 0)}{'☆'.repeat(3 - (weight || 0))}
      </span>
    </span>
  )
}
