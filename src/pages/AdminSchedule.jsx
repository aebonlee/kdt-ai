import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { myPairings, partnerCounts, instructorDays, scheduleAlerts, PAIRING_SOURCE } from '../data/adminschedule'
import { subjectById } from '../data/curriculum'

// 캠퍼스 배지 색 — Schedule.jsx 지역 배지와 동일 계열
const CAMPUS_COLOR = {
  '판교 4층': { color: '#2563EB', bg: 'rgba(37,99,235,0.10)' },
  '판교 5층': { color: '#7C3AED', bg: 'rgba(124,58,237,0.10)' },
  광주: { color: '#059669', bg: 'rgba(5,150,105,0.10)' },
  울산: { color: '#D97706', bg: 'rgba(217,119,6,0.12)' },
}
const campusMeta = (c) => CAMPUS_COLOR[c] || { color: 'var(--navy-600)', bg: 'var(--navy-100)' }

const monthLabel = (m) => `${Number(m.slice(5, 7))}월`
const dateLabel = (d) => `${Number(d.slice(5, 7))}/${Number(d.slice(8, 10))}`

const FILTERS = ['전체', '판교 4층', '판교 5층', '광주', '울산']

export default function AdminSchedule() {
  const { user } = useAuth()
  const [campus, setCampus] = useState('전체')

  const filtered = useMemo(
    () => myPairings.filter((p) => campus === '전체' || p.campus === campus),
    [campus],
  )

  // 월별 그룹
  const byMonth = useMemo(() => {
    const map = new Map()
    for (const p of filtered) {
      const m = p.date.slice(0, 7)
      if (!map.has(m)) map.set(m, [])
      map.get(m).push(p)
    }
    return [...map.entries()]
  }, [filtered])

  // 과목별 요약(주강사와의 짝) — 첫 세션 날짜 순
  const bySubject = useMemo(() => {
    const map = new Map()
    for (const p of myPairings) {
      if (!map.has(p.subjectId)) map.set(p.subjectId, { subjectId: p.subjectId, subject: p.subject, authors: p.authors, leads: new Set(), dates: [] })
      const g = map.get(p.subjectId)
      p.lead.forEach((n) => g.leads.add(n))
      g.dates.push(p)
    }
    return [...map.values()]
  }, [])

  const campusCount = useMemo(() => {
    const m = new Map()
    for (const p of myPairings) m.set(p.campus, (m.get(p.campus) || 0) + 1)
    return [...m.entries()]
  }, [])

  return (
    <section className="section">
      <div className="container">
        {/* ── 헤더 ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 16, justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, background: 'var(--navy-100)', color: 'var(--navy-700)', fontSize: 12, fontWeight: 800, letterSpacing: 0.3 }}>
              🔒 관리자 전용 · {user?.email}
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: 'var(--navy-800)', marginTop: 12 }}>페어링 시간표</h1>
            <p style={{ color: 'var(--ink-soft)', marginTop: 6, fontSize: 14, lineHeight: 1.7 }}>
              내 강의일 <b>{myPairings.length}일</b> 기준 — 같은 날 같은 캠퍼스에서 같은 과목을 병행 진행하는 <b>반별 강사진</b>과
              과목 교안을 만든 <b>주강사</b>를 함께 표시합니다.
              <br />
              <span style={{ fontSize: 12.5 }}>근거: {PAIRING_SOURCE} · 주강사는 실라버스/교육생 교재/종합실습평가 파일의 과목별 저자 기준</span>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {campusCount.map(([c, n]) => {
              const cm = campusMeta(c)
              return (
                <span key={c} style={{ padding: '6px 12px', borderRadius: 10, fontSize: 12.5, fontWeight: 800, color: cm.color, background: cm.bg }}>
                  {c} {n}일
                </span>
              )
            })}
          </div>
        </div>

        {/* ── 변경 알림 ── */}
        {scheduleAlerts.length > 0 && (
          <div style={{ marginTop: 18, padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(217,115,13,0.35)', background: 'rgba(217,115,13,0.08)' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#D9730D' }}>⚠ 확정표 대비 변경 확인됨</div>
            {scheduleAlerts.map((a) => (
              <p key={a.date} style={{ marginTop: 4, fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.6 }}>
                <b>{a.date}</b> — {a.text}
              </p>
            ))}
          </div>
        )}

        {/* ── 과목별 주강사 짝 요약 ── */}
        <h2 style={{ marginTop: 30, fontSize: 18, fontWeight: 900, color: 'var(--navy-800)' }}>과목별 주강사 페어 요약</h2>
        <p style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-soft)' }}>
          <b style={{ color: 'var(--gold)' }}>★</b> 현장 동행 = 내 강의일에 같은 캠퍼스 라인업에 주강사가 함께 배정된 경우
        </p>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
          {bySubject.map((g) => {
            const leads = [...g.leads]
            const subj = subjectById(g.subjectId)
            return (
              <div key={g.subjectId} style={{ border: '1px solid var(--line)', borderRadius: 12, padding: '12px 14px', background: 'var(--bg-white)' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--navy-800)', lineHeight: 1.4 }}>{subj?.name || g.subject}</div>
                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.7 }}>
                  <div>
                    <span style={{ color: 'var(--ink-soft)' }}>주강사(교안)</span>{' '}
                    {g.authors.length > 0 ? (
                      <b style={{ color: 'var(--navy-700)' }}>{g.authors.join(' · ')}</b>
                    ) : (
                      <span style={{ color: 'var(--ink-soft)' }}>교안 미수령</span>
                    )}
                  </div>
                  <div>
                    <span style={{ color: 'var(--ink-soft)' }}>현장 동행</span>{' '}
                    {leads.length > 0 ? (
                      <b style={{ color: 'var(--gold)' }}>★ {leads.join(' · ')}</b>
                    ) : (
                      <span style={{ color: 'var(--ink-soft)' }}>없음(라인업은 아래 표)</span>
                    )}
                  </div>
                  <div style={{ color: 'var(--ink-soft)', fontSize: 12.5 }}>
                    {g.dates.length}일 · {g.dates.map((p) => dateLabel(p.date)).join(', ')}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── 필터 ── */}
        <div style={{ marginTop: 30, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <h2 style={{ fontSize: 18, fontWeight: 900, color: 'var(--navy-800)', marginRight: 8 }}>일자별 상세</h2>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setCampus(f)}
              style={{
                padding: '6px 12px', borderRadius: 999, cursor: 'pointer', fontSize: 12.5, fontWeight: 700,
                border: `1px solid ${campus === f ? 'var(--gold)' : 'var(--line-strong)'}`,
                background: campus === f ? 'var(--gold)' : 'var(--bg-white)',
                color: campus === f ? '#fff' : 'var(--navy-600)',
              }}
            >
              {f}
            </button>
          ))}
          <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{filtered.length}일 표시</span>
        </div>

        {/* ── 월별 상세 표 ── */}
        {byMonth.map(([month, items]) => (
          <div key={month} style={{ marginTop: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy-700)' }}>
              {monthLabel(month)} <span style={{ color: 'var(--ink-soft)', fontWeight: 600 }}>· {items.length}일</span>
            </h3>
            <div style={{ marginTop: 8, overflowX: 'auto', border: '1px solid var(--line)', borderRadius: 12 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 720 }}>
                <thead>
                  <tr style={{ background: 'var(--navy-50)' }}>
                    {['날짜', '캠퍼스 · 내 반', '과목', '주강사(교안)', '함께한 강사진(반별)'].map((h) => (
                      <th key={h} style={{ textAlign: 'left', padding: '9px 12px', color: 'var(--navy-700)', fontWeight: 800, whiteSpace: 'nowrap', borderBottom: '1px solid var(--line)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => {
                    const cm = campusMeta(p.campus)
                    return (
                      <tr key={p.date} style={{ borderBottom: '1px solid var(--line)' }}>
                        <td style={{ padding: '9px 12px', whiteSpace: 'nowrap' }}>
                          <Link to={`/day/${p.date}`} style={{ fontWeight: 800, color: 'var(--navy-800)' }}>{dateLabel(p.date)}</Link>
                          <span style={{ color: 'var(--ink-soft)' }}> ({p.weekday}) </span>
                          <span style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>W{p.week}</span>
                        </td>
                        <td style={{ padding: '9px 12px', whiteSpace: 'nowrap' }}>
                          <span style={{ padding: '3px 8px', borderRadius: 8, fontSize: 12, fontWeight: 800, color: cm.color, background: cm.bg }}>{p.campus}</span>{' '}
                          <b>{p.cls}</b> <span style={{ color: 'var(--ink-soft)', fontSize: 12 }}>{p.room}</span>
                          {p.substitute && (
                            <span style={{ marginLeft: 6, padding: '2px 8px', borderRadius: 999, fontSize: 11.5, fontWeight: 800, color: '#D9730D', background: 'rgba(217,115,13,0.12)' }}>
                              대타 {p.substitute}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '9px 12px', minWidth: 150, lineHeight: 1.45 }}>{p.subject}</td>
                        <td style={{ padding: '9px 12px', whiteSpace: 'nowrap' }}>
                          {p.lead.length > 0 ? (
                            <b style={{ color: 'var(--gold)' }}>★ {p.lead.join(' · ')}</b>
                          ) : p.authors.length > 0 ? (
                            <span style={{ color: 'var(--ink-soft)' }}>{p.authors.join(' · ')} <span style={{ fontSize: 11.5 }}>(현장 미배정)</span></span>
                          ) : (
                            <span style={{ color: 'var(--ink-soft)' }}>교안 미수령</span>
                          )}
                        </td>
                        <td style={{ padding: '9px 12px', lineHeight: 1.8 }}>
                          {p.lineup.map((x) => (
                            <span
                              key={x.cls}
                              title={`${x.cls} ${x.room}`}
                              style={{
                                display: 'inline-block', marginRight: 6, padding: '2px 9px', borderRadius: 999, fontSize: 12,
                                fontWeight: x.me ? 900 : 600,
                                color: x.me ? '#fff' : p.lead.includes(x.name) ? 'var(--gold)' : 'var(--navy-600)',
                                background: x.me ? 'var(--gold)' : 'var(--navy-50)',
                                border: p.lead.includes(x.name) && !x.me ? '1px solid var(--gold)' : '1px solid transparent',
                              }}
                            >
                              {x.cls.replace('반', '')}·{x.name}
                            </span>
                          ))}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* ── 병행 동료 빈도 ── */}
        <h2 style={{ marginTop: 34, fontSize: 18, fontWeight: 900, color: 'var(--navy-800)' }}>병행 동료 강사 빈도</h2>
        <p style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-soft)' }}>내 강의일에 같은 캠퍼스에서 함께 강의한 날 수 (전체 {partnerCounts.length}명)</p>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {partnerCounts.map((p) => (
            <span key={p.name} style={{ padding: '6px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 700, border: '1px solid var(--line-strong)', background: 'var(--bg-white)', color: 'var(--navy-700)' }}>
              {p.name} <b style={{ color: 'var(--gold)' }}>{p.days}일</b>
            </span>
          ))}
        </div>

        {/* ── 강사별 전체 강의 일수 ── */}
        <h2 style={{ marginTop: 34, fontSize: 18, fontWeight: 900, color: 'var(--navy-800)' }}>강사별 전체 강의 일수</h2>
        <p style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-soft)' }}>
          18개반 시간표 전체(광주 · 울산 · 판교 4/5층, 7/14~12/18) 기준 강사 {instructorDays.length}명의 강의 일수입니다.
          내 일수는 시간표 기재 기준({instructorDays.find((x) => x.name === '이애본')?.days}일 — 8/20 대타일 제외)이며, 'SK'는 특강 진행 주체 표기입니다.
        </p>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {instructorDays.map((p) => {
            const isMe = p.name === '이애본'
            return (
              <span
                key={p.name}
                style={{
                  padding: '6px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 700,
                  border: `1px solid ${isMe ? 'var(--gold)' : 'var(--line-strong)'}`,
                  background: isMe ? 'var(--navy-50)' : 'var(--bg-white)',
                  color: 'var(--navy-700)',
                }}
              >
                {p.name} <b style={{ color: 'var(--gold)' }}>{p.days}일</b>
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
