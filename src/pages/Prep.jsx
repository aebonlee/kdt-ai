import { useState } from 'react'
import { Link } from 'react-router-dom'
import { prepTopics } from '../data/resources'

const CAT_ORDER = ['필수', '프론트', '백엔드', '데이터', '라이브러리', 'AI 데모', '배포', 'BaaS', '실습환경', 'AI 기초', 'SKALA 연계']
const categories = ['전체', ...CAT_ORDER.filter((c) => prepTopics.some((t) => t.tag === c))]

export default function Prep() {
  const [cat, setCat] = useState('전체')
  const topics = cat === '전체' ? prepTopics : prepTopics.filter((t) => t.tag === cat)

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Prerequisites</span>
          <h1>선수학습자료</h1>
          <p>
            <span style={{ display: 'block' }}>수업 전·후 스스로 다져두면 좋은 기초 자료입니다.</span>
            <span style={{ display: 'block' }}>분류를 선택하고 주제를 클릭하면 상세 페이지로 이동합니다.</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* 상단 카테고리 탭 */}
          <div className="month-tabs" style={{ marginBottom: 24 }}>
            {categories.map((c) => (
              <button
                key={c}
                className={`month-tab${cat === c ? ' active' : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
                <span style={{ marginLeft: 6, opacity: 0.7, fontWeight: 600 }}>
                  {c === '전체' ? prepTopics.length : prepTopics.filter((t) => t.tag === c).length}
                </span>
              </button>
            ))}
          </div>

          {/* 주제 카드 → 개별 페이지 */}
          <div className="grid grid-3">
            {topics.map((t) => (
              <Link key={t.id} to={`/prep/${t.id}`} className="card">
                <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="chip chip-cat">{t.tag}</span>
                  <PrepRating level={t.level} weight={t.weight} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--navy-800)' }}>{t.name}</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: 13.5, marginTop: 8 }}>{t.desc}</p>
                <span className="section-link" style={{ display: 'inline-block', marginTop: 12 }}>
                  자세히 보기 →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// 난이도(하·중·상)·중요도(★) 미니 배지
const LEVEL_META = { 1: ['하', '#0E7A5F'], 2: ['중', '#D9730D'], 3: ['상', '#E5484D'] }
export function PrepRating({ level, weight }) {
  if (!level && !weight) return null
  const [lvLabel, lvColor] = LEVEL_META[level] || LEVEL_META[2]
  return (
    <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
      <span style={{ fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 999, color: lvColor, background: 'color-mix(in srgb, ' + lvColor + ' 12%, transparent)' }}>
        난이도 {lvLabel}
      </span>
      <span style={{ fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 999, color: 'var(--gold)', background: 'var(--navy-50)' }} title={'중요도 ' + weight + '/3'}>
        중요도 {'★'.repeat(weight || 0)}{'☆'.repeat(3 - (weight || 0))}
      </span>
    </span>
  )
}
