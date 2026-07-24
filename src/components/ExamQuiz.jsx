// 종합실습 평가기준(과목 첫날) + 복습 퀴즈·추가 학습(과목 마지막날) 섹션
import { exams, examsAlt } from '../data/exams'
import { quizzes } from '../data/quizzes'
import { extraStudy } from '../data/extrastudy'
import Rich from './Rich'

const H = { fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '28px 0 4px' }
const TYPE = { ox: 'O/X', choice: '4지선다', short: '단답' }

export function ExamBlock({ e, title = '📋 종합실습 평가기준 · 제출물' }) {
  if (!e) return null
  const hasPoints = e.criteria?.some((c) => c.points)
  return (
    <>
      <h3 style={H}>
        {title}
        {e.variant && (
          <span style={{ marginLeft: 8, padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: 'var(--navy-100)', color: 'var(--navy-700)', verticalAlign: 'middle' }}>
            {e.variant}
          </span>
        )}
      </h3>
      {e.purpose && (
        <div className="box box-tips" style={{ marginTop: 12 }}>
          <div className="box-h">🎯 실습 목적</div>
          <p style={{ margin: 0, whiteSpace: 'pre-line' }}><Rich text={e.purpose} /></p>
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
                  <tr key={i}><td>{t.name}</td><td style={{ whiteSpace: 'pre-line' }}><Rich text={t.activity} /></td><td>{t.time}</td></tr>
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
                  <tr key={i}><td>{c.item}</td><td style={{ whiteSpace: 'pre-line' }}><Rich text={c.desc} /></td>{hasPoints && <td>{c.points}</td>}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {e.deliverables?.length > 0 && (
        <div className="box box-practice" style={{ marginTop: 12 }}>
          <div className="box-h">📦 제출 · 필수 항목</div>
          <ul>{e.deliverables.map((d, i) => <li key={i}><Rich text={d} /></li>)}</ul>
        </div>
      )}
      {e.notes?.length > 0 && (
        <div className="exam-notes">
          <b>유의사항</b>
          <ul>{e.notes.map((n, i) => <li key={i}><Rich text={n} /></li>)}</ul>
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

// 과목 마지막 날 — 도전 과제 + 심화 링크 (복습 퀴즈와 세트로 항상 노출)
function ExtraStudyBlock({ x }) {
  if (!x) return null
  return (
    <>
      <h3 style={H}>
        🚀 추가 학습 — 더 해보기{' '}
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)' }}>(과목을 내 것으로 만드는 도전 과제)</span>
      </h3>
      {x.challenges?.length > 0 && (
        <div className="box box-practice" style={{ marginTop: 12 }}>
          <div className="box-h">💪 도전 과제</div>
          <ol>{x.challenges.map((c, i) => <li key={i}>{c}</li>)}</ol>
        </div>
      )}
      {x.links?.length > 0 && (
        <div className="box box-tips" style={{ marginTop: 12 }}>
          <div className="box-h">🔗 심화 자료</div>
          <ul>
            {x.links.map((l, i) => (
              <li key={i}>
                <a href={l.u} target="_blank" rel="noreferrer" style={{ color: 'var(--gold)', fontWeight: 700 }}>{l.t} ↗</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default function ExamQuiz({ subjectId, day, totalDays, showExam = true }) {
  // 평가기준은 과목 첫날 + 마지막날(종합실습 평가 당일)에 노출
  const e = day === 1 || day === totalDays ? exams[subjectId] : null
  const alt = day === 1 || day === totalDays ? examsAlt[subjectId] : null
  const qs = day === totalDays ? quizzes[subjectId] : null
  const extra = day === totalDays ? extraStudy[subjectId] : null
  if (!e && !alt && !qs && !extra) return null
  return (
    <>
      {showExam && <ExamBlock e={e} />}
      {showExam && alt && (
        <>
          <ExamBlock e={alt} title="📑 전임교수 평가안 (참고)" />
          <p style={{ marginTop: 8, fontSize: 12.5, color: 'var(--ink-soft)' }}>
            ※ 같은 과목이라도 담당교수에 따라 평가 체계가 다를 수 있습니다. 위 기본안과 함께 평가 방향을 참고하세요.
          </p>
        </>
      )}
      <QuizBlock qs={qs} />
      <ExtraStudyBlock x={extra} />
    </>
  )
}
