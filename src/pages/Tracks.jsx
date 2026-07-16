// 과정별 안내 — 캠퍼스(판교/광주/울산) 탭으로 트랙별 교과목 정리와 시간표를 제공.
// 학생은 소속 교실 고정, 강사가 캠퍼스로 이동하는 구조를 그대로 반영(담당=인디고·타 강사=다크그린).
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { trackSchedule } from '../data/trackschedule'
import { CURRI_META, CURRI_GROUPS } from '../data/currihours'
import { useAuth } from '../contexts/AuthContext'
import { useProfile } from '../hooks/useProfile'

const CAMPUS_TABS = [
  { key: '판교', tracks: [{ t: 'p5', label: '5층' }, { t: 'p4', label: '4층' }] },
  { key: '광주', tracks: [{ t: 'gj', label: '' }] },
  { key: '울산', tracks: [{ t: 'us', label: '' }] },
]

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
const wd = (d) => WEEKDAYS[new Date(d + 'T00:00:00').getDay()]
const fmt = (d) => `${Number(d.slice(5, 7))}/${Number(d.slice(8, 10))}`

export default function Tracks() {
  const { user } = useAuth()
  const { profile } = useProfile()
  // 내 소속 트랙이 있으면 그 캠퍼스 탭을 기본 선택
  const myTrack = profile?.track
  const initCampus = CAMPUS_TABS.find((c) => c.tracks.some((x) => x.t === myTrack))?.key || '판교'
  const [campus, setCampus] = useState(initCampus)
  const tab = CAMPUS_TABS.find((c) => c.key === campus)
  const [trackIdx, setTrackIdx] = useState(0)
  const track = tab.tracks[Math.min(trackIdx, tab.tracks.length - 1)].t

  const schedule = useMemo(() => trackSchedule(track), [track])
  // 시간 배정 열 선택 — 판교(p) / 광주·울산(k)
  const hourKey = campus === '판교' ? 'p' : 'k'

  // 교과목 요약 — 같은 과목명끼리 그룹(기간·일수·강사)
  const subjects = useMemo(() => {
    const map = new Map()
    for (const it of schedule) {
      if (it.event) continue
      if (!map.has(it.name)) map.set(it.name, { name: it.name, mine: it.mine, lead: new Set(), prac: new Set(), dates: [], link: it.link })
      const g = map.get(it.name)
      g.dates.push(it.date)
      if (it.leadBy) g.lead.add(it.leadBy)
      if (it.practiceBy) g.prac.add(it.practiceBy)
      if (it.mine) g.mine = true
    }
    return [...map.values()].sort((a, b) => a.dates[0].localeCompare(b.dates[0]))
  }, [schedule])

  // 월별 시간표 그룹
  const months = useMemo(() => {
    const arr = []
    for (const it of schedule) {
      const m = it.date.slice(0, 7)
      let g = arr.find((x) => x.m === m)
      if (!g) { g = { m, items: [] }; arr.push(g) }
      g.items.push(it)
    }
    return arr
  }, [schedule])

  const today = new Date().toLocaleDateString('sv-SE')

  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Tracks</span>
          <h1>과정별 안내</h1>
          <p>
            <span style={{ display: 'block' }}>캠퍼스(분반)별 교과목과 시간표입니다. 과목마다 교안을 만든 주강사와 교실에서 진행하는 실습강사가 함께합니다.</span>
            <span style={{ display: 'block' }}>
              <b style={{ color: 'var(--gold)' }}>인디고 = 이애본 실습강사 진행</b> · <b style={{ color: 'var(--etc-green)' }}>다크그린 = 타 실습강사 진행</b>
            </span>
          </p>
          {/* 캠퍼스 탭 */}
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            {CAMPUS_TABS.map((c) => (
              <button
                key={c.key}
                onClick={() => { setCampus(c.key); setTrackIdx(0) }}
                className="btn"
                style={{
                  padding: '8px 20px', fontSize: 14, fontWeight: 800, borderRadius: 999,
                  background: campus === c.key ? 'var(--gold)' : 'transparent',
                  color: campus === c.key ? '#fff' : 'var(--navy-700)',
                  border: campus === c.key ? '1px solid var(--gold)' : '1px solid var(--line-strong)',
                }}
              >
                {c.key}
              </button>
            ))}
            {/* 판교 층 토글 */}
            {tab.tracks.length > 1 && (
              <span style={{ display: 'inline-flex', gap: 6, marginLeft: 6 }}>
                {tab.tracks.map((x, i) => (
                  <button
                    key={x.t}
                    onClick={() => setTrackIdx(i)}
                    className="btn"
                    style={{
                      padding: '8px 14px', fontSize: 13, fontWeight: 700, borderRadius: 999,
                      background: trackIdx === i ? 'var(--navy-100)' : 'transparent',
                      color: 'var(--navy-700)',
                      border: `1px solid ${trackIdx === i ? 'var(--navy-300)' : 'var(--line)'}`,
                    }}
                  >
                    {x.label}
                  </button>
                ))}
              </span>
            )}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* 운영 정보 — 공식 시간표 양식(판교 4·5층 동일) 기준 */}
          <div className="card" style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--navy-800)', marginBottom: 10 }}>⏰ 과정 운영 안내 (전 캠퍼스 공통)</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 10, fontSize: 13, lineHeight: 1.7 }}>
              <div><b>수업 시간</b><br />평일 09:00 ~ 18:00 (8시간)</div>
              <div><b>점심시간</b><br />12:00 ~ 13:00</div>
              <div><b>총 훈련</b><br />862시간 · 108일</div>
              <div><b>특이 일정</b><br />9/23 4교시(13시 종료) · 12/9~11 ~20:30 · 12/18 수료(13시)</div>
            </div>
            <p style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-soft)' }}>
              ※ 공식 시간표 양식 기준(판교 4층·5층 동일) · 11월~12월은 생성형 AI 서비스 개발 팀프로젝트 기간
            </p>
          </div>

          {/* 교과목 정리 */}
          <div className="section-head">
            <span className="eyebrow">Subjects</span>
            <h2>{campus}{tab.tracks.length > 1 ? ` ${tab.tracks[trackIdx].label}` : ''} 교과목</h2>
            <p>수강 순서대로 정렬 · 과목을 누르면 학습 자료로 이동합니다.</p>
          </div>
          <div className="grid grid-3">
            {subjects.map((s) => {
              const Wrapper = s.link ? Link : 'div'
              return (
                <Wrapper key={s.name} {...(s.link ? { to: s.link } : {})} className="card">
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                    <span
                      className="chip"
                      style={s.mine
                        ? { background: 'var(--gold)', color: '#fff', border: 'none' }
                        : { background: 'var(--etc-green)', color: '#fff', border: 'none' }}
                    >
                      {s.mine ? '이애본 강사' : '타 강사'}
                    </span>
                    <span className="chip chip-day">{s.dates.length}일</span>
                  </div>
                  <h3 style={{ fontSize: 15.5, fontWeight: 800, color: s.mine ? 'var(--navy-800)' : 'var(--etc-green)', lineHeight: 1.4 }}>
                    {s.name}
                  </h3>
                  <p style={{ color: 'var(--ink-soft)', fontSize: 12.5, marginTop: 6 }}>
                    {fmt(s.dates[0])}{s.dates.length > 1 ? ` ~ ${fmt(s.dates[s.dates.length - 1])}` : ''}
                  </p>
                  <p style={{ fontSize: 12, marginTop: 4, lineHeight: 1.6 }}>
                    {s.lead.size > 0 && <span style={{ display: 'block', color: 'var(--navy-700)' }}><b>주강사</b> {[...s.lead].join(' · ')}</span>}
                    {s.prac.size > 0 && (
                      <span style={{ display: 'block', color: s.mine ? 'var(--gold)' : 'var(--ink-soft)', fontWeight: s.mine ? 800 : 600 }}>
                        <b style={{ color: 'var(--navy-700)' }}>실습강사</b> {[...s.prac].join(' · ')}
                      </span>
                    )}
                  </p>
                </Wrapper>
              )
            })}
          </div>

          {/* 시간표 */}
          <div className="section-head" style={{ marginTop: 40 }}>
            <span className="eyebrow">Timetable</span>
            <h2>{campus}{tab.tracks.length > 1 ? ` ${tab.tracks[trackIdx].label}` : ''} 시간표</h2>
            <p>실시간 배정표 기준(변동 가능) · 오늘 날짜는 강조 표시됩니다.</p>
          </div>
          {months.map((g) => (
            <div key={g.m} style={{ marginTop: 18 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy-700)' }}>{Number(g.m.slice(5))}월</h3>
              <div style={{ marginTop: 8, overflowX: 'auto', border: '1px solid var(--line)', borderRadius: 12 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 560 }}>
                  <thead>
                    <tr style={{ background: 'var(--navy-50)' }}>
                      {['날짜', '교과목', '주강사', '실습강사', ''].map((h, i) => (
                        <th key={i} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--navy-700)', fontWeight: 800, whiteSpace: 'nowrap', borderBottom: '1px solid var(--line)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {g.items.map((it) => {
                      const isToday = it.date === today
                      return (
                        <tr key={it.date} style={{ borderBottom: '1px solid var(--line)', background: isToday ? 'var(--navy-50)' : 'transparent' }}>
                          <td style={{ padding: '8px 12px', whiteSpace: 'nowrap', fontWeight: isToday ? 900 : 600 }}>
                            {isToday && <span style={{ color: 'var(--gold)', marginRight: 4 }}>▶</span>}
                            {fmt(it.date)} ({wd(it.date)})
                          </td>
                          <td style={{ padding: '8px 12px', fontWeight: 700, color: it.event ? 'var(--ink-soft)' : it.mine ? 'var(--navy-800)' : 'var(--etc-green)' }}>
                            {it.name}
                          </td>
                          <td style={{ padding: '8px 12px', whiteSpace: 'nowrap', fontSize: 12.5, color: 'var(--navy-700)', fontWeight: 600 }}>
                            {it.event ? '-' : it.leadBy || '-'}
                          </td>
                          <td style={{ padding: '8px 12px', whiteSpace: 'nowrap', fontSize: 12.5, color: it.mine ? 'var(--gold)' : 'var(--ink-soft)', fontWeight: it.mine ? 800 : 600 }}>
                            {it.event ? '-' : it.leadBy && it.leadBy === it.practiceBy ? '주강사 직강' : it.practiceBy || '-'}
                          </td>
                          <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>
                            {it.link && (
                              <Link to={it.link} style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>학습 →</Link>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          <p style={{ marginTop: 14, fontSize: 12.5, color: 'var(--ink-soft)' }}>
            ※ 11월 이후는 팀프로젝트 · 최종평가 기간입니다. 상세는 팀 프로젝트 메뉴를 참고하세요.
          </p>

          {/* 교과목 시간 배정 — 공식 커리큘럼(0602 수정본) 기준, 지역별 시수 */}
          <div className="section-head" style={{ marginTop: 44 }}>
            <span className="eyebrow">Hours</span>
            <h2>{campus} 교과목 시간 배정</h2>
            <p>
              공식 커리큘럼 기준 — {CURRI_META[hourKey].label} 총 <b>{CURRI_META[hourKey].total}시간</b> · 교육기간 {CURRI_META[hourKey].period}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {CURRI_GROUPS.map((g) => (
              <div key={g.name} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 16px', background: 'var(--navy-50)', borderBottom: '1px solid var(--line)' }}>
                  <b style={{ fontSize: 14, color: 'var(--navy-800)' }}>{g.name}</b>
                  <span className="chip chip-day" style={{ flex: '0 0 auto' }}>{g[hourKey]}시간</span>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <tbody>
                    {g.items.map((it, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                        <td style={{ padding: '7px 16px', color: 'var(--navy-700)', fontWeight: 600 }}>{it.name}</td>
                        <td style={{ padding: '7px 16px', whiteSpace: 'nowrap', fontSize: 12.5, color: 'var(--ink-soft)' }}>{it.author ? `주강사 ${it.author}` : ''}</td>
                        <td style={{ padding: '7px 16px', whiteSpace: 'nowrap', textAlign: 'right', fontWeight: 800, color: 'var(--navy-800)' }}>{it.h ?? it[hourKey]}h</td>
                      </tr>
                    ))}
                    {g.mini && (
                      <tr>
                        <td style={{ padding: '7px 16px', fontWeight: 800, color: 'var(--gold)' }}>{g.mini.name}</td>
                        <td style={{ padding: '7px 16px', whiteSpace: 'nowrap', fontSize: 12.5, color: 'var(--ink-soft)' }}>주강사 {g.mini.author}</td>
                        <td style={{ padding: '7px 16px', whiteSpace: 'nowrap', textAlign: 'right', fontWeight: 800, color: 'var(--gold)' }}>{g.mini.h}h</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 12, fontSize: 12.5, color: 'var(--ink-soft)' }}>
            ※ 총 시수는 변경 불가(공식 커리큘럼 명기) · 판교 862시간, 광주·울산 818시간 — 차이는 팀 프로젝트(272↔244h)·SK Soft Skills(8↔4h)·도메인 특강(24↔16h)·수료식(10↔6h)입니다.
          </p>
        </div>
      </section>
    </div>
  )
}
