// 교과목 평가 기록 (관리자 전용) — 기록 보관소.
//
// 웹에서 점수를 입력하지 않는다(2026-07-21 대표 확정).
// 평가는 슬랙으로 제출을 받아 로컬에서 엑셀로 집계하는 흐름이 이미 자리 잡았고,
// 사이트는 "무엇을 언제 평가해 어디에 남겼는지"를 보는 역할만 한다.
// 산출물 엑셀은 구글드라이브에 평가 건별 구분 폴더로 두고 여기서 링크로 연다.
//
// 이전 버전(웹 점수 입력 + kdt_evaluations 저장 + XLSX 내보내기)은 git 이력에 있다.
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { evalUnits } from '../data/evalunits'
import { exams } from '../data/exams'
import { subjectById } from '../data/curriculum'
import { recordFor, EVAL_RECORDS } from '../data/evalrecords'
import { DOCS_ROOT_FOLDER, drivePreview, driveView, driveDownload } from '../data/docs'

const fmtBytes = (b) => (!b ? '' : b > 1e6 ? `${(b / 1e6).toFixed(1)}MB` : `${Math.round(b / 1e3)}KB`)
const fmtDate = (d) => (d ? `${Number(d.slice(5, 7))}/${Number(d.slice(8, 10))}` : '-')

export default function AdminEvaluate() {
  const [params, setParams] = useSearchParams()
  const units = useMemo(() => evalUnits.filter((u) => exams[u.subjectId]), [])
  const active = params.get('unit') || units[0]?.key
  const unit = units.find((u) => u.key === active) || units[0]
  const rec = unit ? recordFor(unit.key) : null
  const [preview, setPreview] = useState(null)

  const doneKeys = useMemo(() => new Set(EVAL_RECORDS.map((r) => r.key)), [])
  const done = units.filter((u) => doneKeys.has(u.key)).length

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 1400 }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--navy-800)' }}>교과목 평가 기록</h1>
        <p style={{ marginTop: 6, fontSize: 13.5, color: 'var(--ink-soft)', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
          평가는 슬랙으로 제출을 받아 엑셀로 집계합니다.
          이 화면은 완료된 평가의 산출물을 과목·분반별로 보관하는 기록입니다.
        </p>

        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          {[
            ['평가 단위', `${units.length}건`],
            ['완료', `${done}건`],
            ['남은 평가', `${units.length - done}건`],
          ].map(([l, v]) => (
            <div key={l} className="card" style={{ padding: '14px 16px' }}>
              <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{l}</p>
              <p style={{ fontSize: 20, fontWeight: 900, color: 'var(--navy-800)', marginTop: 4 }}>{v}</p>
            </div>
          ))}
        </div>

        {/* 평가 단위 탭 — 과목 × 분반 */}
        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {units.map((u) => {
            const on = u.key === unit?.key
            const ok = doneKeys.has(u.key)
            return (
              <button
                key={u.key} type="button"
                onClick={() => setParams({ unit: u.key })}
                title={`${u.subjectName} · ${u.campus} ${u.cls}`}
                style={{
                  cursor: 'pointer', padding: '6px 11px', borderRadius: 999, fontSize: 12.5, fontWeight: 800,
                  whiteSpace: 'nowrap',
                  border: `1px solid ${on ? 'var(--navy-800)' : 'var(--line)'}`,
                  background: on ? 'var(--navy-800)' : 'transparent',
                  color: on ? '#fff' : 'var(--ink-soft)',
                }}
              >
                {ok && <span style={{ marginRight: 4, color: on ? '#b8f5d0' : '#0E7A5F' }}>✓</span>}
                {u.subjectName} <span style={{ opacity: 0.75, fontWeight: 600 }}>{u.campus} {u.cls}</span>
              </button>
            )
          })}
        </div>

        {unit && (
          <div style={{ marginTop: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: 'var(--navy-800)', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
              {unit.subjectName}
              <span style={{ marginLeft: 8, fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)' }}>
                {unit.campus} {unit.cls} · {unit.room} · {unit.dateLabel}
              </span>
            </h2>

            {!rec && (
              <div className="card" style={{ marginTop: 12, padding: 18 }}>
                <p style={{ fontWeight: 800, color: 'var(--navy-800)' }}>아직 평가 기록이 없습니다.</p>
                <p style={{ marginTop: 6, fontSize: 13.5, color: 'var(--ink-soft)', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                  과목이 끝나면 슬랙 제출물을 엑셀로 집계한 뒤, 드라이브에 평가 건별 구분 폴더를 만들어 올리고
                  <code style={{ margin: '0 4px' }}>src/data/evalrecords.js</code>에 한 건 추가하면 여기에 나타납니다.
                </p>
                <p style={{ marginTop: 8, fontSize: 12.5, color: 'var(--ink-soft)', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                  폴더 규칙 — <b>6. 종합실습 평가 기록 / &lt;날짜&gt; &lt;캠퍼스&gt; &lt;반&gt; &lt;과목&gt;</b>
                </p>
                <a href={DOCS_ROOT_FOLDER} target="_blank" rel="noreferrer" className="section-link" style={{ display: 'inline-block', marginTop: 10 }}>
                  드라이브 열기 →
                </a>
              </div>
            )}

            {rec && (
              <>
                <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
                  {[
                    ['강의일', rec.dates.map(fmtDate).join(' · ')],
                    ['마감', fmtDate(rec.closedAt)],
                    ['평가 인원', `${rec.students}명`],
                    ['산출물', `${rec.files.length}건`],
                  ].map(([l, v]) => (
                    <div key={l} className="card" style={{ padding: '12px 14px' }}>
                      <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{l}</p>
                      <p style={{ fontSize: 16, fontWeight: 900, color: 'var(--navy-800)', marginTop: 3 }}>{v}</p>
                    </div>
                  ))}
                </div>

                <p style={{ marginTop: 12, fontSize: 13, color: 'var(--ink-soft)', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                  제출처 — {rec.submittedTo}
                </p>

                <div style={{ marginTop: 12, border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
                  {rec.files.map((f, i) => (
                    <div key={f.id} style={{
                      display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
                      padding: '10px 14px', borderBottom: i < rec.files.length - 1 ? '1px solid var(--line)' : 'none',
                    }}>
                      <span style={{ flex: 1, minWidth: 200, fontSize: 13.5, fontWeight: 700, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                        {f.t}
                      </span>
                      <span style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>{f.x?.toUpperCase()} {fmtBytes(f.b)}</span>
                      <button type="button" onClick={() => setPreview(preview === f.id ? null : f.id)}
                        style={{ cursor: 'pointer', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 7, border: '1px solid var(--line)', background: 'transparent', color: 'var(--navy-700)' }}>
                        {preview === f.id ? '닫기' : '미리보기'}
                      </button>
                      <a href={driveView(f.id)} target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 700 }}>새 탭</a>
                      <a href={driveDownload(f.id)} style={{ fontSize: 12, fontWeight: 700 }}>받기</a>
                    </div>
                  ))}
                </div>

                {preview && (
                  <iframe
                    title="평가 산출물 미리보기" src={drivePreview(preview)}
                    style={{ marginTop: 12, width: '100%', height: 640, border: '1px solid var(--line)', borderRadius: 12 }}
                  />
                )}

                <a href={rec.folder} target="_blank" rel="noreferrer" className="section-link" style={{ display: 'inline-block', marginTop: 12 }}>
                  드라이브 폴더 열기 →
                </a>

                {rec.notes?.length > 0 && (
                  <>
                    <h3 style={{ marginTop: 22, fontSize: 15, fontWeight: 900, color: 'var(--navy-800)' }}>기록</h3>
                    <ul style={{ marginTop: 8, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.75 }}>
                      {rec.notes.map((n, i) => (
                        <li key={i} style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>{n}</li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}

            {exams[unit.subjectId] && (
              <details style={{ marginTop: 22 }}>
                <summary style={{ cursor: 'pointer', fontSize: 14, fontWeight: 800, color: 'var(--navy-800)' }}>
                  평가 기준 보기 — {subjectById(unit.subjectId)?.name || unit.subjectName}
                </summary>
                <div style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.8 }}>
                  {exams[unit.subjectId].criteria?.map((c, i) => (
                    <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--line)', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                      <b>{c.item}</b> {c.points && <span style={{ color: 'var(--accent)' }}>{c.points}</span>}
                      {c.desc && <div style={{ color: 'var(--ink-soft)', fontSize: 12.5, marginTop: 2 }}>{c.desc}</div>}
                    </div>
                  ))}
                  {exams[unit.subjectId].notes?.length > 0 && (
                    <ul style={{ marginTop: 10, paddingLeft: 18, fontSize: 12.5, color: 'var(--ink-soft)' }}>
                      {exams[unit.subjectId].notes.map((n, i) => (
                        <li key={i} style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>{n}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
