// 관리자 대시보드 — 담당강사 허브.
//   ① 오늘·이번 주 내 강의 일정   ② 과목 종료일 = 평가 필요 알림
//   ③ 담당 강의 평가 기록 현황     ④ 분반별 가입 현황 · 교수자 명단
// 평가는 슬랙 제출 → 엑셀 집계 흐름이라(대표 확정), 여기서는 '무엇을 평가해야/했나'만 본다.
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase, hasSupabase } from '../lib/supabase'
import { CLASS_MAP, classLabel, classShort } from '../data/classes'
import { ROSTERS } from '../data/rosters'
import { evalUnits } from '../data/evalunits'
import { myPairings } from '../data/adminschedule'
import { exams } from '../data/exams'
import { isEvaluated } from '../data/evalrecords'
import { mergeInstructors, mergePeople } from '../utils/people'
import { TITLES, resolveTitle, titleLabel } from '../config/roles'
import { useProfile } from '../hooks/useProfile'
import { openClassOnboarding } from '../components/ClassOnboarding'

const KST = () => {
  // 브라우저 로컬이 KST가 아닐 수 있어 Asia/Seoul 로 오늘 날짜(YYYY-MM-DD)를 구한다
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date())
  const g = (t) => p.find((x) => x.type === t).value
  return `${g('year')}-${g('month')}-${g('day')}`
}
const fmtDate = (s) => (s ? `${Number(s.slice(5, 7))}/${Number(s.slice(8, 10))}` : '-')
const WD = ['일', '월', '화', '수', '목', '금', '토']
const wdOf = (d) => WD[new Date(d + 'T00:00:00+09:00').getDay()]

export default function AdminDashboard() {
  const { user } = useAuth()
  const { profile: myProfile } = useProfile()
  const [profiles, setProfiles] = useState([])
  const [err, setErr] = useState('')
  const today = useMemo(KST, [])

  useEffect(() => {
    if (!hasSupabase) return
    supabase.from('skala_profiles').select('*').order('created_at')
      .then(({ data, error }) => (error ? setErr(error.message) : setProfiles(data || [])))
  }, [])

  const students = useMemo(() => mergePeople(profiles.filter((p) => p.role === 'student')), [profiles])
  const instructors = useMemo(() => mergeInstructors(profiles.filter((p) => p.role === 'instructor')), [profiles])
  const instructorRows = profiles.filter((p) => p.role === 'instructor')
  const dupAccounts = instructorRows.length - instructors.length

  // ── 담당 세션을 날짜순으로 정리 ──
  const sessions = useMemo(() => [...myPairings].sort((a, b) => a.date.localeCompare(b.date)), [])
  const todaySessions = sessions.filter((s) => s.date === today)
  // 이번 주(월~일) 범위
  const weekRange = useMemo(() => {
    const d = new Date(today + 'T00:00:00+09:00')
    const dow = (d.getDay() + 6) % 7 // 월=0
    const mon = new Date(d); mon.setDate(d.getDate() - dow)
    const sun = new Date(mon); sun.setDate(mon.getDate() + 6)
    const iso = (x) => x.toISOString().slice(0, 10)
    return [iso(mon), iso(sun)]
  }, [today])
  const weekSessions = sessions.filter((s) => s.date >= weekRange[0] && s.date <= weekRange[1])
  const nextSession = sessions.find((s) => s.date > today)

  // ── 평가 필요 알림: 과목×분반의 마지막 강의일 = 평가 마감 트리거 ──
  const unitsWithExam = useMemo(() => evalUnits.filter((u) => exams[u.subjectId]), [])
  const evalStatus = useMemo(() => unitsWithExam.map((u) => {
    const last = u.dates[u.dates.length - 1]
    const done = isEvaluated(u.key)
    // 강의 끝났는데 기록 없음 = 평가 필요
    const needed = !done && last <= today
    const upcoming = !done && last > today
    return { u, last, done, needed, upcoming }
  }), [unitsWithExam, today])
  const needEval = evalStatus.filter((e) => e.needed).sort((a, b) => a.last.localeCompare(b.last))
  const doneEval = evalStatus.filter((e) => e.done)

  // ── 분반별 가입 현황 ──
  const classes = useMemo(() => {
    const out = []
    for (const [track, list] of Object.entries(CLASS_MAP)) {
      for (const c of list) {
        const members = students.filter((s) => s.track === track && s.class_no === c.no)
        const roster = Object.values(ROSTERS).find((r) => r.track === track && r.class_no === c.no)
        const isMine = evalUnits.some((u) => u.track === track && u.classNo === c.no)
        if (members.length || roster || isMine) out.push({ track, no: c.no, room: c.room, members, roster, isMine })
      }
    }
    return out.sort((a, b) => (b.isMine - a.isMine) || (b.members.length - a.members.length))
  }, [students])

  const staleCount = students.filter((p) => !p.confirmed_at ||
    Date.now() - new Date(p.confirmed_at).getTime() > 14 * 24 * 60 * 60 * 1000).length

  // 직책 배지 — 이메일/DB title 로 판정
  const TitleBadge = ({ p }) => {
    const code = resolveTitle({ email: p.email }, p)
    if (!code) return null
    const t = TITLES[code]
    return (
      <span style={{ marginLeft: 6, fontSize: 10.5, fontWeight: 800, color: '#fff', background: t.color, borderRadius: 999, padding: '1px 8px', whiteSpace: 'nowrap' }}>
        {t.label}
      </span>
    )
  }

  const SessionChip = ({ s, highlight }) => (
    <Link to={`/day/${s.date}`} className="card" style={{
      padding: '12px 14px', display: 'block',
      // 오늘 강의는 연한 파랑 배경으로 강조
      background: highlight ? 'var(--navy-50)' : undefined,
      borderColor: highlight ? 'var(--accent)' : undefined,
    }}>
      <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', fontWeight: 700 }}>{fmtDate(s.date)} ({wdOf(s.date)})</div>
      <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--navy-800)', marginTop: 3, lineHeight: 1.35, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>{s.subject}</div>
      <div style={{ fontSize: 12.5, color: 'var(--accent)', fontWeight: 700, marginTop: 4 }}>
        {classShort(s.campus.includes('4층') ? 'p4' : s.campus.includes('5층') ? 'p5' : s.campus === '울산' ? 'us' : 'gj', Number.parseInt(s.cls, 10))} · {s.room}
      </div>
    </Link>
  )

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, background: 'var(--navy-100)', color: 'var(--navy-700)', fontSize: 12, fontWeight: 800 }}>
          🔒 관리자 전용 · {user?.email}
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: 'var(--navy-800)', marginTop: 12 }}>관리자 대시보드</h1>
        <p style={{ color: 'var(--ink-soft)', marginTop: 6, fontSize: 14, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
          오늘 {fmtDate(today)} ({wdOf(today)}) 기준 — 내 강의 일정과 과목별 평가 진행 상황입니다.
        </p>
        {err && <p style={{ marginTop: 8, fontSize: 13, color: '#E5484D' }}>프로필 로드 실패: {err}</p>}

        {/* 내 정보 — 본인 소속/직책 확인·수정 */}
        <div className="card" style={{ marginTop: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 12, color: 'var(--ink-soft)', fontWeight: 700 }}>내 정보</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy-800)', marginTop: 3, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
              {myProfile ? (
                myProfile.role === 'instructor'
                  ? <>{titleLabel(user, myProfile) || '교수자'}{(myProfile.teach_classes || []).length > 0 && <span style={{ fontWeight: 600, color: 'var(--ink-soft)' }}> · 담당 {myProfile.teach_classes.map((t) => classLabel(t.track, t.no)).join(', ')}</span>}</>
                  : myProfile.track ? <>{classLabel(myProfile.track, myProfile.class_no)} <span style={{ fontWeight: 600, color: 'var(--ink-soft)' }}>· 학생</span></> : '소속 미설정'
              ) : '소속 정보가 아직 없습니다'}
            </div>
          </div>
          <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: 13 }} onClick={() => openClassOnboarding()}>
            내 정보 수정
          </button>
        </div>

        {/* ① 오늘 일정 */}
        <h2 style={{ marginTop: 26, fontSize: 18, fontWeight: 900, color: 'var(--navy-800)' }}>오늘 내 강의</h2>
        {todaySessions.length ? (
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
            {todaySessions.map((s) => <SessionChip key={s.date + s.cls} s={s} highlight />)}
          </div>
        ) : (
          <p style={{ marginTop: 8, fontSize: 13.5, color: 'var(--ink-soft)' }}>
            오늘은 담당 강의가 없습니다.{nextSession && ` 다음 강의는 ${fmtDate(nextSession.date)} (${wdOf(nextSession.date)}) ${nextSession.subject} · ${nextSession.campus} ${nextSession.cls}.`}
          </p>
        )}

        {/* ② 평가 필요 알림 */}
        {needEval.length > 0 && (
          <div className="card" style={{ marginTop: 22, padding: '16px 18px', borderLeft: '4px solid #E5484D' }}>
            <h2 style={{ fontSize: 16, fontWeight: 900, color: '#c0362f' }}>평가가 필요한 과목 {needEval.length}건</h2>
            <p style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-soft)', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
              강의가 끝났는데 평가 기록이 아직 없습니다. 슬랙 제출물을 엑셀로 집계한 뒤 교과목 평가에 등록하세요.
            </p>
            <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {needEval.map((e) => (
                <Link key={e.u.key} to={`/admin/evaluate?unit=${encodeURIComponent(e.u.key)}`}
                  style={{ padding: '7px 12px', borderRadius: 10, fontSize: 12.5, fontWeight: 800, background: 'rgba(229,72,77,0.08)', color: '#c0362f', border: '1px solid rgba(229,72,77,0.25)' }}>
                  {e.u.subjectName} · {e.u.campus} {e.u.cls} <span style={{ opacity: 0.7 }}>({fmtDate(e.last)} 종료)</span> →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 요약 */}
        <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          {[
            ['평가 완료', `${doneEval.length} / ${unitsWithExam.length}건`],
            ['평가 대기', `${needEval.length}건`, needEval.length ? '#c0362f' : undefined],
            ['가입 학생', `${students.length}명`],
            ['교수자', `${instructors.length}명${dupAccounts ? ` (계정 ${instructorRows.length})` : ''}`],
            ['소속 재확인', `${staleCount}명`],
          ].map(([label, val, color]) => (
            <div key={label} className="card" style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 12, color: 'var(--ink-soft)', fontWeight: 700 }}>{label}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: color || 'var(--navy-800)', marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>

        {/* ③ 이번 주 일정 */}
        <h2 style={{ marginTop: 30, fontSize: 18, fontWeight: 900, color: 'var(--navy-800)' }}>
          이번 주 일정
          <span style={{ marginLeft: 8, fontSize: 12.5, fontWeight: 600, color: 'var(--ink-soft)' }}>{fmtDate(weekRange[0])} ~ {fmtDate(weekRange[1])}</span>
          <Link to="/schedule" style={{ marginLeft: 10, fontSize: 12.5, fontWeight: 700 }}>전체 일정표 →</Link>
        </h2>
        {weekSessions.length ? (
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
            {weekSessions.map((s) => <SessionChip key={s.date + s.cls} s={s} highlight={s.date === today} />)}
          </div>
        ) : (
          <p style={{ marginTop: 8, fontSize: 13.5, color: 'var(--ink-soft)' }}>이번 주 담당 강의가 없습니다.</p>
        )}

        {/* ④ 담당 강의 평가 현황 */}
        <h2 style={{ marginTop: 30, fontSize: 18, fontWeight: 900, color: 'var(--navy-800)' }}>
          담당 강의 평가 현황
          <Link to="/admin/evaluate" style={{ marginLeft: 10, fontSize: 12.5, fontWeight: 700 }}>교과목 평가 →</Link>
        </h2>
        <p style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-soft)', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
          과목 × 담당 분반(강의일자) 단위. ✓ = 평가 기록 완료 · ● = 강의 종료·평가 대기 · ○ = 강의 예정
        </p>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
          {evalStatus.sort((a, b) => a.last.localeCompare(b.last)).map((e) => {
            const mark = e.done ? '✓' : e.needed ? '●' : '○'
            const color = e.done ? '#0E7A5F' : e.needed ? '#c0362f' : 'var(--ink-soft)'
            return (
              <Link key={e.u.key} to={`/admin/evaluate?unit=${encodeURIComponent(e.u.key)}`} className="card"
                style={{
                  padding: '14px 16px', borderLeft: `3px solid ${color}`,
                  // 평가 완료 카드는 연한 그린 배경으로 강조
                  background: e.done ? 'rgba(14,122,95,0.08)' : undefined,
                }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--navy-800)', lineHeight: 1.4, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>{e.u.subjectName}</div>
                <div style={{ marginTop: 4, fontSize: 12.5, color: 'var(--ink-soft)' }}>{e.u.campus} {e.u.cls} · {e.u.dateLabel}</div>
                <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 800, color }}>
                  <span style={{ marginRight: 4 }}>{mark}</span>
                  {e.done ? '평가 완료' : e.needed ? '평가 대기' : `${fmtDate(e.last)} 종료 예정`} →
                </div>
              </Link>
            )
          })}
        </div>

        {/* ⑤ 분반별 현황 */}
        <h2 style={{ marginTop: 30, fontSize: 18, fontWeight: 900, color: 'var(--navy-800)' }}>
          분반별 가입 현황
          <Link to="/admin/roster" style={{ marginLeft: 10, fontSize: 12.5, fontWeight: 700 }}>가입명부 →</Link>
        </h2>
        <p style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-soft)' }}>★ = 내 담당 강의가 있는 분반 · 정원은 자리배치표 명단 기준</p>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
          {classes.map((c) => (
            <div key={`${c.track}${c.no}`} className="card" style={{ padding: '14px 16px', borderLeft: c.isMine ? '3px solid var(--gold)' : undefined }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy-800)' }}>{c.isMine ? '★ ' : ''}{classLabel(c.track, c.no)}</h3>
                <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{c.room}</span>
              </div>
              <div style={{ marginTop: 6, fontSize: 13, fontWeight: 700, color: c.roster && c.members.length < c.roster.students.length ? 'var(--ink-soft)' : 'var(--gold)' }}>
                가입 {c.members.length}명{c.roster ? ` / 정원 ${c.roster.students.length}명` : ''}
              </div>
            </div>
          ))}
        </div>

        {/* ⑥ 교수자 명단 */}
        <h2 style={{ marginTop: 30, fontSize: 18, fontWeight: 900, color: 'var(--navy-800)' }}>
          교수자 명단
          <Link to="/admin/roster" style={{ marginLeft: 10, fontSize: 12.5, fontWeight: 700 }}>가입명부 전체 →</Link>
        </h2>
        <p style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-soft)', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
          교수자로 가입한 계정입니다(학생과 분리 관리). 같은 사람이 여러 번 가입한 경우 한 줄로 합쳐 보여줍니다.
        </p>
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
                  <td style={{ padding: '8px 12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {p.name || '-'}
                    <TitleBadge p={p} />
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
