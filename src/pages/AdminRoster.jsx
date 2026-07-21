// 가입명부 (관리자 전용) — 실제 가입 계정을 두 갈래로 나눠 본다.
//   탭 1: 매니저 & 교수진   — role=instructor, 동일인 다계정 통합
//   탭 2: 분반별 학생명단   — role=student, 분반(track×class_no)별 + 자리배치 명단 대조
// 각 탭 상단에 집계표를 함께 둔다.
import { useEffect, useMemo, useState } from 'react'
import { supabase, hasSupabase } from '../lib/supabase'
import { TRACK_LABELS, CLASS_MAP, classLabel } from '../data/classes'
import { ROSTERS } from '../data/rosters'
import { mergePeople, mergeInstructors } from '../utils/people'
import { TITLES, resolveTitle } from '../config/roles'

const fmtDate = (v) => (v ? new Date(v).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }) : '-')
const norm = (s) => (s || '').replace(/\s+/g, '')

// 분반 키 → 자리배치 명단(rosters.js) 매핑. 키 예: us4, p5_7
function rosterFor(track, classNo) {
  const direct = ROSTERS[`${track}${classNo}`]
  if (direct) return direct
  return Object.values(ROSTERS).find((r) => r.track === track && r.class_no === classNo) || null
}

export default function AdminRoster() {
  const [tab, setTab] = useState('staff')
  const [cls, setCls] = useState(null)   // 선택된 분반 키 (track+no). null = 첫 분반
  const [rows, setRows] = useState([])
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')

  useEffect(() => {
    if (!hasSupabase) { setLoading(false); return }
    supabase.from('skala_profiles')
      .select('*')
      .order('created_at')
      .then(({ data, error }) => {
        if (error) setErr(error.message)
        else setRows(data || [])
        setLoading(false)
      })
  }, [])

  const staffRaw = useMemo(() => rows.filter((r) => r.role === 'instructor'), [rows])
  const studentRaw = useMemo(() => rows.filter((r) => r.role === 'student'), [rows])
  const staff = useMemo(() => mergeInstructors(staffRaw), [staffRaw])
  const students = useMemo(() => mergePeople(studentRaw), [studentRaw])

  // ── 분반별 집계: 가입자 × 자리배치 명단 대조
  const byClass = useMemo(() => {
    const out = []
    for (const [track, list] of Object.entries(CLASS_MAP)) {
      for (const c of list) {
        const joined = students.filter((s) => s.track === track && s.class_no === c.no)
        const roster = rosterFor(track, c.no)
        const names = new Set(joined.map((s) => norm(s.name)))
        const missing = roster ? roster.students.filter((s) => !names.has(norm(s.name))) : []
        const extra = roster ? joined.filter((s) => !roster.students.some((r) => norm(r.name) === norm(s.name))) : []
        out.push({
          track, no: c.no, room: c.room, label: classLabel(track, c.no),
          joined, roster, missing, extra,
          confirmed: joined.filter((s) => s.confirmed_at).length,
        })
      }
    }
    return out
  }, [students])

  const kw = q.trim().toLowerCase()
  const match = (p) => !kw || (p.name || '').toLowerCase().includes(kw) || (p.email || '').toLowerCase().includes(kw)

  const totalRosterCount = byClass.reduce((n, c) => n + (c.roster ? c.roster.students.length : 0), 0)
  const totalMissing = byClass.reduce((n, c) => n + c.missing.length, 0)
  const dupStaff = staffRaw.length - staff.length
  const dupStudent = studentRaw.length - students.length

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 1400 }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--navy-800)' }}>가입명부</h1>
        <p style={{ marginTop: 6, fontSize: 13.5, color: 'var(--ink-soft)', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
          실제 가입한 계정을 매니저·교수진과 분반별 학생으로 나눠 봅니다.
          같은 사람이 여러 번 가입한 경우는 한 줄로 합쳐 셉니다.
        </p>

        {!hasSupabase && <p className="card" style={{ marginTop: 16, padding: 16 }}>Supabase가 설정되지 않아 명부를 불러올 수 없습니다.</p>}
        {err && <p className="card" style={{ marginTop: 16, padding: 16, color: '#c00' }}>{err}</p>}

        {/* 탭 */}
        <div style={{ marginTop: 18, display: 'flex', gap: 8, borderBottom: '1px solid var(--line)' }}>
          {[['staff', `매니저 & 교수진 (${staff.length})`], ['class', `분반별 학생명단 (${students.length})`]].map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              style={{
                border: 'none', background: 'none', cursor: 'pointer', padding: '10px 14px',
                fontSize: 14, fontWeight: 800,
                color: tab === k ? 'var(--navy-800)' : 'var(--ink-soft)',
                borderBottom: tab === k ? '3px solid var(--accent)' : '3px solid transparent',
                marginBottom: -1,
              }}
            >{label}</button>
          ))}
        </div>

        <input
          value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="이름 · 이메일 검색"
          style={{ marginTop: 14, width: '100%', maxWidth: 320, padding: '9px 12px', border: '1px solid var(--line)', borderRadius: 8, fontSize: 13.5 }}
        />

        {loading && <p style={{ marginTop: 20, color: 'var(--ink-soft)' }}>불러오는 중…</p>}

        {/* ── 탭 1: 매니저 & 교수진 ── */}
        {!loading && tab === 'staff' && (
          <>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
              {[
                ['등록 인원', `${staff.length}명`],
                ['가입 계정', `${staffRaw.length}개`],
                ['중복 가입', dupStaff ? `${dupStaff}건 통합` : '없음'],
                ['소속 확인', `${staff.filter((p) => p.confirmed_at).length}명`],
              ].map(([l, v]) => (
                <div key={l} className="card" style={{ padding: '14px 16px' }}>
                  <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{l}</p>
                  <p style={{ fontSize: 20, fontWeight: 900, color: 'var(--navy-800)', marginTop: 4 }}>{v}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 14, overflowX: 'auto', border: '1px solid var(--line)', borderRadius: 12 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 620 }}>
                <thead>
                  <tr style={{ background: 'var(--navy-50)' }}>
                    {['성명', '이메일', '소속', '가입일', '최근 확인'].map((h) => (
                      <th key={h} style={{ textAlign: 'left', padding: '9px 12px', color: 'var(--navy-700)', fontWeight: 800, borderBottom: '1px solid var(--line)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {staff.filter(match).map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {p.name || '-'}
                        {(() => {
                          const code = resolveTitle({ email: p.email }, p)
                          if (!code) return null
                          const t = TITLES[code]
                          return <span style={{ marginLeft: 6, fontSize: 10.5, fontWeight: 800, color: '#fff', background: t.color, borderRadius: 999, padding: '1px 8px' }}>{t.label}</span>
                        })()}
                        {p.accountCount > 1 && (
                          <span title={`계정 ${p.accountCount}개를 동일인으로 합침`} style={{ marginLeft: 6, fontSize: 11, fontWeight: 800, color: 'var(--navy-700)', background: 'var(--navy-50)', borderRadius: 999, padding: '1px 7px' }}>
                            계정 {p.accountCount}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '8px 12px', color: 'var(--ink-soft)', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                        {p.email}
                        {p.accountCount > 1 && (
                          <div style={{ fontSize: 11.5, marginTop: 2 }}>
                            {p.accounts.filter((a) => a.email !== p.email).map((a) => a.email).join(' · ')}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '8px 12px' }}>{p.track ? classLabel(p.track, p.class_no) : '-'}</td>
                      <td style={{ padding: '8px 12px' }}>{fmtDate(p.created_at)}</td>
                      <td style={{ padding: '8px 12px' }}>{fmtDate(p.confirmed_at)}</td>
                    </tr>
                  ))}
                  {staff.filter(match).length === 0 && (
                    <tr><td colSpan={5} style={{ padding: 16, textAlign: 'center', color: 'var(--ink-soft)' }}>해당 인원 없음</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── 탭 2: 분반별 학생명단 ── */}
        {!loading && tab === 'class' && (
          <>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
              {[
                ['가입 학생', `${students.length}명`],
                ['가입 계정', `${studentRaw.length}개`],
                ['중복 가입', dupStudent ? `${dupStudent}건 통합` : '없음'],
                ['자리배치 명단', totalRosterCount ? `${totalRosterCount}명` : '-'],
                ['미가입(명단 대조)', totalMissing ? `${totalMissing}명` : '없음'],
              ].map(([l, v]) => (
                <div key={l} className="card" style={{ padding: '14px 16px' }}>
                  <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{l}</p>
                  <p style={{ fontSize: 20, fontWeight: 900, color: 'var(--navy-800)', marginTop: 4 }}>{v}</p>
                </div>
              ))}
            </div>

            {/* 분반 집계표 */}
            <div style={{ marginTop: 14, overflowX: 'auto', border: '1px solid var(--line)', borderRadius: 12 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 620 }}>
                <thead>
                  <tr style={{ background: 'var(--navy-50)' }}>
                    {['분반', '강의실', '가입', '소속확인', '명단', '미가입'].map((h) => (
                      <th key={h} style={{ textAlign: 'left', padding: '9px 12px', color: 'var(--navy-700)', fontWeight: 800, borderBottom: '1px solid var(--line)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {byClass.map((c) => (
                    <tr key={`${c.track}${c.no}`} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 700, whiteSpace: 'nowrap' }}>{c.label}</td>
                      <td style={{ padding: '8px 12px', color: 'var(--ink-soft)' }}>{c.room}</td>
                      <td style={{ padding: '8px 12px', fontWeight: 800 }}>{c.joined.length}</td>
                      <td style={{ padding: '8px 12px' }}>{c.confirmed}</td>
                      <td style={{ padding: '8px 12px', color: 'var(--ink-soft)' }}>{c.roster ? c.roster.students.length : '-'}</td>
                      <td style={{ padding: '8px 12px', color: c.missing.length ? '#c00' : 'var(--ink-soft)', fontWeight: c.missing.length ? 800 : 400 }}>
                        {c.roster ? (c.missing.length || '-') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {students.length === 0 && (
              <p className="card" style={{ marginTop: 14, padding: 16, color: 'var(--ink-soft)', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                아직 학생 가입이 없습니다. 아래 분반 탭은 18개 분반 구조를 보여주며, 학생이 가입하면 해당 분반에 채워집니다.
              </p>
            )}

            {/* 분반 탭 — 18개 분반을 상단에서 골라 본다(아래로 길게 내려가지 않게) */}
            <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {byClass.map((c) => {
                const k = `${c.track}${c.no}`
                const on = (cls || `${byClass[0].track}${byClass[0].no}`) === k
                return (
                  <button
                    key={k} type="button" onClick={() => setCls(k)}
                    style={{
                      cursor: 'pointer', padding: '6px 11px', borderRadius: 999, fontSize: 12.5, fontWeight: 800,
                      whiteSpace: 'nowrap',
                      border: `1px solid ${on ? 'var(--navy-800)' : 'var(--line)'}`,
                      background: on ? 'var(--navy-800)' : 'transparent',
                      color: on ? '#fff' : 'var(--ink-soft)',
                    }}
                  >
                    {c.label}
                    <span style={{ marginLeft: 5, opacity: .75, fontWeight: 600 }}>{c.joined.length}</span>
                    {c.missing.length > 0 && <span style={{ marginLeft: 4, color: on ? '#ffd7d7' : '#c00' }}>●</span>}
                  </button>
                )
              })}
            </div>

            {/* 선택 분반 상세 */}
            {byClass.filter((c) => `${c.track}${c.no}` === (cls || `${byClass[0].track}${byClass[0].no}`)).map((c) => {
              const shown = c.joined.filter(match)
              return (
                <div key={`d${c.track}${c.no}`} style={{ marginTop: 18 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 900, color: 'var(--navy-800)' }}>
                    {c.label} <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-soft)' }}>
                      {c.room} · 가입 {c.joined.length}명{c.roster ? ` / 명단 ${c.roster.students.length}명` : ''}
                      {c.roster?.manager ? ` · ${c.roster.manager}` : ''}
                    </span>
                  </h3>
                  <div style={{ marginTop: 8, overflowX: 'auto', border: '1px solid var(--line)', borderRadius: 12 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 560 }}>
                      <thead>
                        <tr style={{ background: 'var(--navy-50)' }}>
                          {['성명', '조', '이메일', '가입일', '확인'].map((h) => (
                            <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--navy-700)', fontWeight: 800, borderBottom: '1px solid var(--line)' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {shown.map((s, i) => {
                          const r = c.roster?.students.find((x) => norm(x.name) === norm(s.name))
                          return (
                            <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                              <td style={{ padding: '7px 12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                {s.name || '-'}
                                {s.accountCount > 1 && (
                                  <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 800, color: 'var(--navy-700)', background: 'var(--navy-50)', borderRadius: 999, padding: '1px 7px' }}>계정 {s.accountCount}</span>
                                )}
                              </td>
                              <td style={{ padding: '7px 12px' }}>{r?.team ? `${r.team}조` : '-'}</td>
                              <td style={{ padding: '7px 12px', color: 'var(--ink-soft)', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>{s.email}</td>
                              <td style={{ padding: '7px 12px' }}>{fmtDate(s.created_at)}</td>
                              <td style={{ padding: '7px 12px' }}>{s.confirmed_at ? '✓' : '-'}</td>
                            </tr>
                          )
                        })}
                        {shown.length === 0 && (
                          <tr><td colSpan={5} style={{ padding: 14, textAlign: 'center', color: 'var(--ink-soft)' }}>가입자 없음</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {c.missing.length > 0 && (
                    <p style={{ marginTop: 8, fontSize: 12.5, color: '#c00', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                      미가입 {c.missing.length}명 — {c.missing.map((m) => m.name).join(' · ')}
                    </p>
                  )}
                  {c.extra.length > 0 && (
                    <p style={{ marginTop: 4, fontSize: 12.5, color: 'var(--ink-soft)', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                      명단 밖 가입 {c.extra.length}명 — {c.extra.map((m) => m.name).join(' · ')}
                    </p>
                  )}
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}
