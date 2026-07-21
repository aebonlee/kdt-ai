// 학생 명단 (관리자 전용) — 소속 프로필(kdt_profiles) × 학습 진도(kdt_progress) 통합 뷰.
// 분반 필터·검색·재확인 필요 표시·CSV 내보내기. 교수자는 관리자 대시보드에서 분리 관리.
import { useEffect, useMemo, useState } from 'react'
import { supabase, hasSupabase } from '../lib/supabase'
import { TRACK_LABELS, classLabel } from '../data/classes'
import { ROSTERS } from '../data/rosters'
import { RECONFIRM_DAYS } from '../hooks/useProfile'
import { mergePeople } from '../utils/people'

const fmtDate = (s) => (s ? new Date(s).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }) : '-')
const isStale = (p) => !p.confirmed_at || Date.now() - new Date(p.confirmed_at).getTime() > RECONFIRM_DAYS * 864e5

export default function AdminStudents() {
  const [students, setStudents] = useState([])
  const [progress, setProgress] = useState({}) // user_id → 완료 일수
  const [q, setQ] = useState('')
  const [cls, setCls] = useState('all') // 'all' | `${track}|${no}` | 'none'
  const [err, setErr] = useState('')

  useEffect(() => {
    if (!hasSupabase) return
    supabase.from('kdt_profiles')
      .select('user_id,name,email,track,class_no,confirmed_at,created_at')
      .eq('role', 'student').order('created_at')
      // 같은 사람이 여러 번 가입한 경우 접어서 센다(이메일 아이디 일치 기준).
      .then(({ data, error }) => (error ? setErr(error.message) : setStudents(mergePeople(data || []))))
    supabase.from('kdt_progress').select('user_id,completed,updated_at')
      .then(({ data }) => {
        const m = {}
        for (const r of data || []) m[r.user_id] = { days: (r.completed || []).length, at: r.updated_at }
        setProgress(m)
      })
  }, [])

  // 분반 옵션(가입자가 있는 분반만)
  const classOptions = useMemo(() => {
    const set = new Map()
    for (const s of students) {
      if (s.track && s.class_no) set.set(`${s.track}|${s.class_no}`, classLabel(s.track, s.class_no))
    }
    return [...set.entries()].sort((a, b) => a[1].localeCompare(b[1]))
  }, [students])

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase()
    return students.filter((s) => {
      if (cls === 'none' && (s.track || s.class_no)) return false
      if (cls !== 'all' && cls !== 'none') {
        const [t, n] = cls.split('|')
        if (s.track !== t || String(s.class_no) !== n) return false
      }
      if (kw && !`${s.name || ''} ${s.email || ''}`.toLowerCase().includes(kw)) return false
      return true
    })
  }, [students, q, cls])

  const staleCount = students.filter(isStale).length

  const exportCsv = () => {
    const esc = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"'
    const head = ['성명', '이메일', '분반', '가입일', '소속 확인일', '재확인 필요', '진도(완료 일수)']
    const lines = filtered.map((s) => [
      esc(s.name || ''), esc(s.email || ''), esc(classLabel(s.track, s.class_no)),
      esc(fmtDate(s.created_at)), esc(fmtDate(s.confirmed_at)), esc(isStale(s) ? 'Y' : ''),
      esc(progress[s.user_id]?.days ?? 0),
    ].join(','))
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob(['﻿' + [head.map(esc).join(','), ...lines].join('\r\n')], { type: 'text/csv;charset=utf-8' }))
    a.download = `SKALA4기_학생명단_${cls === 'all' ? '전체' : cls === 'none' ? '미지정' : classOptions.find(([k]) => k === cls)?.[1] || cls}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <section className="section">
      <div className="container">
        <h1 style={{ fontSize: 28, fontWeight: 900, color: 'var(--navy-800)' }}>학생 명단</h1>
        <p style={{ color: 'var(--ink-soft)', marginTop: 6, fontSize: 14, lineHeight: 1.7 }}>
          소속 분반 온보딩을 완료한 학생 {students.length}명 — 재확인 필요 {staleCount}명(미확인 또는 {RECONFIRM_DAYS}일 경과).
          자리배치표 명단 대비 미가입자는 각 분반의 평가 화면에서 명단 프리셋으로 관리됩니다.
        </p>
        {err && <p style={{ marginTop: 8, fontSize: 13, color: '#E5484D' }}>로드 실패: {err}</p>}

        {/* 필터 · 검색 · 내보내기 */}
        <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <select value={cls} onChange={(e) => setCls(e.target.value)}
            style={{ padding: '9px 12px', borderRadius: 10, border: '1px solid var(--line-strong)', background: 'var(--bg-white)', color: 'var(--ink)', fontSize: 13.5, fontWeight: 700 }}>
            <option value="all">전체 분반 ({students.length})</option>
            {classOptions.map(([k, label]) => (
              <option key={k} value={k}>
                {label} ({students.filter((s) => `${s.track}|${s.class_no}` === k).length})
              </option>
            ))}
            <option value="none">분반 미지정</option>
          </select>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="이름·이메일 검색…"
            style={{ flex: '1 1 200px', minWidth: 180, padding: '9px 12px', borderRadius: 10, border: '1px solid var(--line-strong)', background: 'var(--bg-white)', color: 'var(--ink)', fontSize: 13.5 }} />
          <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{filtered.length}명 표시</span>
          <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }} onClick={exportCsv}>⬇ CSV</button>
        </div>

        {/* 명단 표 */}
        <div style={{ marginTop: 14, overflowX: 'auto', border: '1px solid var(--line)', borderRadius: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 720 }}>
            <thead>
              <tr style={{ background: 'var(--navy-50)' }}>
                {['성명', '이메일', '분반', '가입일', '소속 확인', '진도', '상태'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '9px 12px', color: 'var(--navy-700)', fontWeight: 800, whiteSpace: 'nowrap', borderBottom: '1px solid var(--line)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const pg = progress[s.user_id]
                const stale = isStale(s)
                return (
                  <tr key={s.user_id} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 800, color: 'var(--navy-800)', whiteSpace: 'nowrap' }}>{s.name || '(이름 미입력)'}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ink-soft)' }}>{s.email}</td>
                    <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>
                      {s.track ? (
                        <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 800, background: 'var(--navy-100)', color: 'var(--navy-700)' }}>
                          {classLabel(s.track, s.class_no)}
                        </span>
                      ) : <span style={{ color: 'var(--ink-soft)' }}>미지정</span>}
                    </td>
                    <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>{fmtDate(s.created_at)}</td>
                    <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>{fmtDate(s.confirmed_at)}</td>
                    <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>
                      {pg ? <b style={{ color: 'var(--gold)' }}>{pg.days}일</b> : <span style={{ color: 'var(--ink-soft)' }}>-</span>}
                    </td>
                    <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>
                      {stale ? (
                        <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 800, color: '#D9730D', background: 'rgba(217,115,13,0.12)' }}>재확인 필요</span>
                      ) : (
                        <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 800, color: '#0E7A5F', background: 'rgba(14,122,95,0.10)' }}>확인됨</span>
                      )}
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ padding: 20, textAlign: 'center', color: 'var(--ink-soft)' }}>표시할 학생이 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: 12, fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          · 진도 = 학습관리에서 "이해했어요"로 체크한 일수(서버 동기화분). 브라우저에만 저장한 학생은 표시되지 않을 수 있습니다.<br />
          · 게시판·Q&A 참여 현황은 기존 대시보드(게시판 관리)에서 확인하세요.
        </p>
      </div>
    </section>
  )
}
