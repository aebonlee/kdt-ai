// 관리자 대시보드 — 분반별 가입 현황 · 교수자 명단(분리) · 과목×분반 평가 진행 현황.
// 관리 풍선 메뉴의 허브 역할(기존 메뉴는 그대로 유지).
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase, hasSupabase } from '../lib/supabase'
import { TRACK_LABELS, CLASS_MAP, classLabel } from '../data/classes'
import { ROSTERS } from '../data/rosters'
import { evalUnits, customKey } from '../data/evalunits'
import { exams } from '../data/exams'
import { mergeInstructors } from '../utils/people'
import { subjectById } from '../data/curriculum'

const fmtDate = (s) => (s ? new Date(s).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }) : '-')

export default function AdminDashboard() {
  const { user } = useAuth()
  const [profiles, setProfiles] = useState([])
  const [evalCounts, setEvalCounts] = useState({}) // `${subject}|${track}|${class}` → n
  const [err, setErr] = useState('')

  useEffect(() => {
    if (!hasSupabase) return
    supabase.from('skala_profiles').select('name,email,role,track,class_no,confirmed_at,created_at').order('created_at')
      .then(({ data, error }) => (error ? setErr(error.message) : setProfiles(data || [])))
    supabase.from('skala_evaluations').select('subject_id,track,class_no')
      .then(({ data }) => {
        const m = {}
        for (const r of data || []) {
          const k = `${r.subject_id}|${r.track}|${r.class_no}`
          m[k] = (m[k] || 0) + 1
        }
        setEvalCounts(m)
      })
  }, [])

  const students = profiles.filter((p) => p.role === 'student')
  // 교수자는 같은 사람이 여러 번 가입한 사례가 있어 동일인으로 접어 센다.
  const instructorRows = profiles.filter((p) => p.role === 'instructor')
  const instructors = mergeInstructors(instructorRows)
  const dupAccounts = instructorRows.length - instructors.length
  // 소속 확인이 오래됐거나 없는 학생(14일 기준) — 재확인 대상
  const staleCount = students.filter((p) => !p.confirmed_at ||
    Date.now() - new Date(p.confirmed_at).getTime() > 14 * 24 * 60 * 60 * 1000).length

  // 분반별 그룹 (가입 학생 + 명단 프리셋 정원)
  const classes = []
  for (const [track, list] of Object.entries(CLASS_MAP)) {
    for (const c of list) {
      const members = students.filter((s) => s.track === track && s.class_no === c.no)
      const roster = Object.values(ROSTERS).find((r) => r.track === track && r.class_no === c.no)
      const isMine = evalUnits.some((u) => u.track === track && u.classNo === c.no)
      if (members.length || roster || isMine) {
        classes.push({ track, no: c.no, room: c.room, members, roster, isMine })
      }
    }
  }
  classes.sort((a, b) => (b.isMine - a.isMine) || (b.members.length - a.members.length))

  // 담당 분반의 평가 단위(과목×분반) 진행 현황
  const unitsWithExam = evalUnits.filter((u) => exams[u.subjectId])

  // 담당 외 분반 평가(타 강사 입력분) — 주강사·운영 매니저가 전체를 확인한다
  const extraEvals = Object.entries(evalCounts)
    .map(([k, n]) => {
      const [subjectId, track, cls] = k.split('|')
      return { subjectId, track, classNo: Number(cls), n }
    })
    .filter((e) => TRACK_LABELS[e.track] && e.classNo &&
      !unitsWithExam.some((u) => u.subjectId === e.subjectId && u.track === e.track && u.classNo === e.classNo))
    .sort((a, b) => a.subjectId.localeCompare(b.subjectId) || a.track.localeCompare(b.track) || a.classNo - b.classNo)

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, background: 'var(--navy-100)', color: 'var(--navy-700)', fontSize: 12, fontWeight: 800 }}>
          🔒 관리자 전용 · {user?.email}
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: 'var(--navy-800)', marginTop: 12 }}>관리자 대시보드</h1>
        <p style={{ color: 'var(--ink-soft)', marginTop: 6, fontSize: 14 }}>
          분반별 가입 현황과 담당 강의 평가 진행 상황입니다. 세부 화면은 상단 관리 메뉴에서 그대로 이동할 수 있습니다.
        </p>
        {err && <p style={{ marginTop: 8, fontSize: 13, color: '#E5484D' }}>프로필 로드 실패: {err}</p>}

        {/* 요약 */}
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          {[
            ['가입 학생', `${students.length}명`],
            ['교수자', `${instructors.length}명${dupAccounts ? ` (계정 ${instructorRows.length})` : ''}`],
            ['활성 분반', `${classes.filter((c) => c.members.length).length}개`],
            ['평가 단위(과목×분반)', `${unitsWithExam.length}건`],
            ['소속 재확인 대상', `${staleCount}명`],
          ].map(([label, val]) => (
            <div key={label} className="card" style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 12, color: 'var(--ink-soft)', fontWeight: 700 }}>{label}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--navy-800)', marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>

        {/* 분반별 관리 */}
        <h2 style={{ marginTop: 30, fontSize: 18, fontWeight: 900, color: 'var(--navy-800)' }}>분반별 현황</h2>
        <p style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-soft)' }}>★ = 내 담당 강의가 있는 분반 · 정원은 자리배치표 명단 기준</p>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
          {classes.map((c) => (
            <div key={`${c.track}${c.no}`} className="card" style={{ padding: '16px 18px', borderLeft: c.isMine ? '3px solid var(--gold)' : undefined }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--navy-800)' }}>
                  {c.isMine ? '★ ' : ''}{classLabel(c.track, c.no)}
                </h3>
                <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{c.room}{c.roster ? ` · 정원 ${c.roster.students.length}명` : ''}</span>
              </div>
              <div style={{ marginTop: 6, fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>
                가입 {c.members.length}명{c.roster ? ` / ${c.roster.students.length}명` : ''}
              </div>
              {c.members.length > 0 && (
                <details style={{ marginTop: 8 }}>
                  <summary style={{ cursor: 'pointer', fontSize: 12.5, color: 'var(--navy-600)', fontWeight: 700 }}>가입자 명단 보기</summary>
                  <ul style={{ marginTop: 6, fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.8 }}>
                    {c.members.map((m, i) => (
                      <li key={i}>{m.name || '(이름 미입력)'} <span style={{ fontSize: 11 }}>&lt;{m.email}&gt;</span> · 확인 {fmtDate(m.confirmed_at)}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          ))}
        </div>

        {/* 과목×분반 평가 현황 */}
        <h2 style={{ marginTop: 30, fontSize: 18, fontWeight: 900, color: 'var(--navy-800)' }}>담당 강의 평가 현황</h2>
        <p style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-soft)' }}>과목 × 담당 분반(강의일자) 단위로 개별 평가합니다. 카드를 누르면 해당 평가로 이동합니다.</p>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
          {unitsWithExam.map((u) => {
            const done = evalCounts[`${u.subjectId}|${u.track}|${u.classNo}`] || 0
            const roster = Object.values(ROSTERS).find((r) => r.track === u.track && r.class_no === u.classNo)
            const total = roster?.students.length
            return (
              <Link key={u.key} to={`/admin/evaluate?unit=${encodeURIComponent(u.key)}`} className="card" style={{ padding: '14px 16px' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--navy-800)', lineHeight: 1.4 }}>{u.subjectName}</div>
                <div style={{ marginTop: 4, fontSize: 12.5, color: 'var(--ink-soft)' }}>{u.campus} {u.cls} · {u.dateLabel}</div>
                <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 800, color: done ? 'var(--gold)' : 'var(--ink-soft)' }}>
                  {done ? `평가 입력 ${done}명${total ? ` / ${total}명` : ''}` : '미시작'} →
                </div>
              </Link>
            )
          })}
        </div>

        {/* 담당 외 분반 평가 현황 — 관리자 전체 확인 */}
        <h2 style={{ marginTop: 30, fontSize: 18, fontWeight: 900, color: 'var(--navy-800)' }}>전체 평가 현황 — 담당 외 분반</h2>
        <p style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-soft)' }}>
          주강사·운영 매니저는 관리자로 모든 분반의 평가 내용을 확인할 수 있습니다. 교과목 평가 화면의 "전체 분반 조회"로 임의 과목×분반도 열람됩니다.
        </p>
        {extraEvals.length ? (
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
            {extraEvals.map((e) => (
              <Link key={`${e.subjectId}|${e.track}|${e.classNo}`} to={`/admin/evaluate?unit=${encodeURIComponent(customKey(e.subjectId, e.track, e.classNo))}`} className="card" style={{ padding: '14px 16px' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--navy-800)', lineHeight: 1.4 }}>{subjectById(e.subjectId)?.name || e.subjectId}</div>
                <div style={{ marginTop: 4, fontSize: 12.5, color: 'var(--ink-soft)' }}>{classLabel(e.track, e.classNo)}</div>
                <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 800, color: 'var(--gold)' }}>평가 입력 {e.n}명 →</div>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ marginTop: 10, fontSize: 13, color: 'var(--ink-soft)' }}>담당 외 분반에 입력된 평가가 아직 없습니다.</p>
        )}

        {/* 교수자 명단 (분리) */}
        <h2 style={{ marginTop: 30, fontSize: 18, fontWeight: 900, color: 'var(--navy-800)' }}>
          교수자 명단
          <Link to="/admin/roster" style={{ marginLeft: 10, fontSize: 12.5, fontWeight: 700 }}>가입명부 전체 보기 →</Link>
        </h2>
        <p style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-soft)' }}>{'교수자로 가입한 계정입니다(학생 명단과 분리 관리). 같은 사람이 여러 번 가입한 경우 한 줄로 합쳐 보여줍니다.'}</p>
        <div style={{ marginTop: 10, overflowX: 'auto', border: '1px solid var(--line)', borderRadius: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 480 }}>
            <thead>
              <tr style={{ background: 'var(--navy-50)' }}>
                {['성명', '이메일', '가입일', '최근 확인'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '9px 12px', color: 'var(--navy-700)', fontWeight: 800, borderBottom: '1px solid var(--line)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {instructors.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 700 }}>
                    {p.name || '-'}
                    {p.accountCount > 1 && (
                      <span title={`계정 ${p.accountCount}개를 동일인으로 합침`} style={{ marginLeft: 6, fontSize: 11, fontWeight: 800, color: 'var(--navy-700)', background: 'var(--navy-50)', borderRadius: 999, padding: '1px 7px' }}>
                        계정 {p.accountCount}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '8px 12px', color: 'var(--ink-soft)' }}>
                    {p.email}
                    {p.accountCount > 1 && (
                      <div style={{ fontSize: 11.5, marginTop: 2, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                        {p.accounts.filter((a) => a.email !== p.email).map((a) => a.email).join(' · ')}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '8px 12px' }}>{fmtDate(p.created_at)}</td>
                  <td style={{ padding: '8px 12px' }}>{fmtDate(p.confirmed_at)}</td>
                </tr>
              ))}
              {instructors.length === 0 && (
                <tr><td colSpan={4} style={{ padding: 16, textAlign: 'center', color: 'var(--ink-soft)' }}>교수자 가입 없음</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
