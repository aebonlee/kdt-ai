// 기타(타 강사 진행) 과목 상세 — 학습내용 요약 + 분반별 진행 시기.
// 학생이 담당 강의 앞뒤 과목을 예습·복습할 수 있게 안내한다.
import { Link } from 'react-router-dom'
import { otherCourses } from '../data/othercontent'
import { otherDeep } from '../data/otherdeep'
import { otherSessions, TRACKS } from '../data/othersessions'
import CodeBlock from './CodeBlock'

const fmt = (d) => `${d.slice(5, 7)}-${d.slice(8, 10)}`

export default function EtcCourse({ courseId }) {
  const c = otherCourses[courseId]
  const deep = otherDeep[courseId] || {}
  if (!c) {
    return (
      <div>
        <p style={{ color: 'var(--ink-soft)' }}>과목 정보를 찾을 수 없습니다.</p>
        <Link to="/lectures" className="btn btn-ghost" style={{ marginTop: 12 }}>← 강의안으로</Link>
      </div>
    )
  }

  // 이 과목이 진행되는 날짜·분반·강사
  const rows = []
  for (const s of otherSessions) {
    for (const t of TRACKS) {
      const cell = s[t.key]
      if (cell?.c === courseId) rows.push({ date: s.date, track: t.label, by: cell.by })
    }
  }

  return (
    <div>
      <div className="detail-meta">
        <span className="chip chip-code">기타</span>
        <span className="chip chip-cat">{c.category}</span>
        <span className="chip chip-day">{c.hours}시간</span>
        <span className="chip chip-region gwangju">타 강사 진행</span>
      </div>

      <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--navy-800)', marginTop: 8 }}>{c.name}</h2>
      <p style={{ color: 'var(--ink-soft)', marginTop: 4 }}>{c.summary}</p>

      <div className="mode-note" style={{ marginTop: 14 }}>
        <span className="mode-desc">
          이 과목은 SKALA 4기에서 <b>별도 강사</b>가 진행합니다. 이애본 강사 담당 강의의 앞뒤에 배우는 내용이므로,
          아래 학습내용을 참고해 예습·복습하면 과정 흐름이 이어집니다.
        </span>
      </div>

      {c.topics?.length > 0 && (
        <>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>📖 주요 학습내용</h3>
          <div className="card" style={{ marginTop: 12 }}>
            <ul className="dot-list">
              {c.topics.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        </>
      )}

      {deep.concepts?.length > 0 && (
        <>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>📚 핵심 개념</h3>
          <div className="grid grid-2" style={{ marginTop: 12 }}>
            {deep.concepts.map((k, i) => (
              <dl key={i} className="concept">
                <dt>{k.term}</dt>
                <dd style={{ whiteSpace: 'pre-line' }}>{k.desc}</dd>
              </dl>
            ))}
          </div>
        </>
      )}

      {deep.examples?.length > 0 && (
        <>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>💻 따라하기 실습</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 12 }}>
            {deep.examples.map((ex, i) => (
              <div key={i}>
                <div className="box-h" style={{ marginBottom: 8 }}>
                  {ex.title} <span style={{ fontWeight: 600, color: 'var(--ink-soft)', fontSize: 12 }}>({ex.lang})</span>
                </div>
                <CodeBlock code={ex.code} lang={ex.lang} />
                {ex.note && (
                  <p style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>💡 {ex.note}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {c.tip && (
        <div className="box box-tips" style={{ marginTop: 20 }}>
          <div className="box-h">🔗 담당 과목과의 연결</div>
          <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{c.tip}</p>
        </div>
      )}

      {rows.length > 0 && (
        <>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }}>
            📅 분반별 진행 시기 <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)' }}>(실시간 배정표 기준·변동 가능)</span>
          </h3>
          <div className="exam-tablewrap" style={{ marginTop: 12 }}>
            <table className="exam-table">
              <thead><tr><th>날짜</th><th>분반</th><th>강사</th></tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}><td>{fmt(r.date)}</td><td>{r.track}</td><td>{r.by || '-'}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
