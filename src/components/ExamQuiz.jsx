// 종합실습 평가기준(과목 첫날) + 복습 퀴즈(과목 마지막날) 섹션
import { exams } from '../data/exams'
import { quizzes } from '../data/quizzes'

const H = { fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }
const TYPE = { ox: 'O/X', choice: '4지선다', short: '단답' }

export function ExamBlock({ e }) {
  if (!e) return null
  const hasPoints = e.criteria?.some((c) => c.points)
  return (
    <>
      <h3 style={H}>📋 종합실습 평가기준 · 제출물</h3>
      {e.purpose && (
        <div className="box box-tips" style={{ marginTop: 12 }}>
          <div className="box-h">🎯 실습 목적</div>
          <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{e.purpose}</p>
        </div>
      )}
      {e.tasks?.length > 0 && (
        <>
          <div className="exam-sub">실습 구성</div>
          <div className="exam-tablewrap">
            <table className="exam-table">
              <thead><tr><th>실습명</th><th>주요 활동</th><th>시간</th></tr></thead>
              <tbody>
                {e.tasks.map((t, i) => (
                  <tr key={i}><td>{t.name}</td><td style={{ whiteSpace: 'pre-line' }}>{t.activity}</td><td>{t.time}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {e.criteria?.length > 0 && (
        <>
          <div className="exam-sub">평가 항목</div>
          <div className="exam-tablewrap">
            <table className="exam-table">
              <thead><tr><th>평가 항목</th><th>평가 내용</th>{hasPoints && <th>배점</th>}</tr></thead>
              <tbody>
                {e.criteria.map((c, i) => (
                  <tr key={i}><td>{c.item}</td><td style={{ whiteSpace: 'pre-line' }}>{c.desc}</td>{hasPoints && <td>{c.points}</td>}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {e.deliverables?.length > 0 && (
        <div className="box box-practice" style={{ marginTop: 12 }}>
          <div className="box-h">📦 제출 · 필수 항목</div>
          <ul>{e.deliverables.map((d, i) => <li key={i}>{d}</li>)}</ul>
        </div>
      )}
      {e.notes?.length > 0 && (
        <div className="exam-notes">
          <b>유의사항</b>
          <ul>{e.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
        </div>
      )}
    </>
  )
}

function QuizBlock({ qs }) {
  if (!qs?.length) return null
  return (
    <>
      <h3 style={H}>
        📝 복습 퀴즈{' '}
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)' }}>(질문을 눌러 정답·해설 펼치기)</span>
      </h3>
      <div className="quiz">
        {qs.map((q, i) => (
          <details key={i} className="quiz-item">
            <summary>
              <span className="quiz-tag">{TYPE[q.type] || '퀴즈'}</span> Q{i + 1}. {q.q}
            </summary>
            {q.type === 'choice' && q.choices && (
              <ol className="quiz-choices">{q.choices.map((c, j) => <li key={j}>{c}</li>)}</ol>
            )}
            <div className="quiz-ans">
              <b>정답{q.type === 'choice' ? ` ${q.answer + 1}.` : ''}</b>{' '}
              {q.type === 'choice' ? q.choices?.[q.answer] : String(q.answer)}
            </div>
            {q.explain && <p className="quiz-exp">{q.explain}</p>}
          </details>
        ))}
      </div>
    </>
  )
}

export default function ExamQuiz({ subjectId, day, totalDays }) {
  const e = day === 1 ? exams[subjectId] : null
  const qs = day === totalDays ? quizzes[subjectId] : null
  if (!e && !qs) return null
  return (
    <>
      <ExamBlock e={e} />
      <QuizBlock qs={qs} />
    </>
  )
}
