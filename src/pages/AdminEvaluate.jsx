// 교과목 종합실습 평가 자동화 (관리자 전용)
// 평가기준은 사이트에 수록된 exams.js(= 수령 종합실습평가 xlsx와 정합 검증 완료)를 그대로 사용하고,
// 입력·내보내기 형식은 원본 평가지의 "평가결과" 시트(고유번호·성명·항목별·점수·판단근거·보완사항·비고)를 따른다.
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, hasSupabase } from '../lib/supabase'
import { exams } from '../data/exams'
import { subjectById, subjects } from '../data/curriculum'
import { ExamBlock } from '../components/ExamQuiz'
import { TRACK_LABELS, classLabel } from '../data/classes'
import { ROSTERS } from '../data/rosters'
import { evalUnits, unitByKey, unitLabel } from '../data/evalunits'
import { useSearchParams } from 'react-router-dom'

// 배점 문자열("20점")에서 숫자 추출 — 숫자 없으면 상한 없음
const maxOf = (points) => {
  const m = /(\d+)/.exec(points || '')
  return m ? Number(m[1]) : null
}

const newRow = () => ({
  id: null, _key: Math.random().toString(36).slice(2),
  student_name: '', student_no: '', track: null, class_no: null, profile_id: null,
  scores: {}, note_basis: '', note_improve: '', _dirty: true,
})

export default function AdminEvaluate() {
  const { user } = useAuth()
  const [params, setParams] = useSearchParams()
  // 평가 단위 = 과목 × 담당 분반(강의일자) — 분반마다 개별 평가
  const unitsWithExam = evalUnits.filter((u) => exams[u.subjectId])
  const initUnit = unitByKey(params.get('unit')) && exams[unitByKey(params.get('unit')).subjectId]
    ? params.get('unit') : unitsWithExam[0]?.key
  const [unitKey, setUnitKey] = useState(initUnit)
  const unit = unitByKey(unitKey) || unitsWithExam[0]
  const subjectId = unit?.subjectId
  const selectUnit = (k) => { setUnitKey(k); setParams({ unit: k }, { replace: true }) }
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [showRubric, setShowRubric] = useState(false)

  const exam = exams[subjectId]
  const criteria = exam?.criteria || []
  const totalMax = criteria.reduce((a, c) => a + (maxOf(c.points) || 0), 0)

  // 평가 단위(과목×분반) 전환 시 해당 분반 저장분만 로드
  useEffect(() => {
    if (!hasSupabase || !unit) return
    setLoading(true); setMsg('')
    supabase.from('skala_evaluations').select('*')
      .eq('subject_id', unit.subjectId).eq('track', unit.track).eq('class_no', unit.classNo)
      .order('created_at')
      .then(({ data, error }) => {
        if (error) { setMsg('불러오기 실패: ' + error.message + ' — skala_evaluations 테이블(SQL) 실행 여부를 확인하세요.'); setRows([]) }
        else setRows((data || []).map((r) => ({ ...r, _key: r.id, _dirty: false })))
      })
      .finally(() => setLoading(false))
  }, [unitKey])

  // 등록 학생 불러오기(소속 분반 온보딩 완료자) — 이미 행에 있는 학생은 건너뜀
  const loadStudents = async () => {
    const { data, error } = await supabase
      .from('skala_profiles').select('user_id,name,email,track,class_no')
      .eq('role', 'student').eq('track', unit.track).eq('class_no', unit.classNo)
    if (error) { setMsg('학생 명단 로드 실패: ' + error.message); return }
    const existing = new Set(rows.map((r) => r.profile_id).filter(Boolean))
    const added = (data || [])
      .filter((p) => !existing.has(p.user_id))
      .map((p) => ({ ...newRow(), student_name: p.name || p.email || '', track: p.track, class_no: p.class_no, profile_id: p.user_id }))
    if (!added.length) { setMsg('추가할 신규 등록 학생이 없습니다.'); return }
    setRows((prev) => [...prev, ...added])
    setMsg(`등록 학생 ${added.length}명을 불러왔습니다. 점수 입력 후 저장하세요.`)
  }

  // 자리배치표 명단 프리셋 불러오기 — 이미 있는 고유번호/성명은 건너뜀
  const unitRoster = Object.values(ROSTERS).find((r) => r.track === unit?.track && r.class_no === unit?.classNo)
  const loadRoster = (rosterKey) => {
    const r = ROSTERS[rosterKey]
    if (!r) return
    const existNo = new Set(rows.map((x) => x.student_no).filter(Boolean))
    const existName = new Set(rows.map((x) => x.student_name.trim()).filter(Boolean))
    const added = r.students
      .filter((st) => !existNo.has(st.no) && !existName.has(st.name))
      .map((st) => ({ ...newRow(), student_no: st.no, student_name: st.name, track: r.track, class_no: r.class_no }))
    if (!added.length) { setMsg(`${r.label} 명단이 이미 모두 추가되어 있습니다.`); return }
    setRows((prev) => [...prev, ...added])
    setMsg(`${r.label} 명단 ${added.length}명 추가 (자리배치표 기준 · ${r.manager} 제외). 저장 전 성명 오탈자를 확인하세요.`)
  }

  const patchRow = (key, patch) =>
    setRows((prev) => prev.map((r) => (r._key === key ? { ...r, ...patch, _dirty: true } : r)))

  const setScore = (key, item, value, max) => {
    let v = value === '' ? '' : Number(value)
    if (v !== '' && max != null && v > max) v = max
    if (v !== '' && v < 0) v = 0
    setRows((prev) => prev.map((r) =>
      r._key === key ? { ...r, scores: { ...r.scores, [item]: v }, _dirty: true } : r))
  }

  const totalOf = (r) => criteria.reduce((a, c) => a + (Number(r.scores?.[c.item]) || 0), 0)

  const removeRow = async (r) => {
    if (!confirm(`${r.student_name || '이 행'} 평가를 삭제할까요?`)) return
    if (r.id) await supabase.from('skala_evaluations').delete().eq('id', r.id)
    setRows((prev) => prev.filter((x) => x._key !== r._key))
  }

  const saveAll = async () => {
    const dirty = rows.filter((r) => r._dirty && r.student_name.trim())
    if (!dirty.length) { setMsg('저장할 변경이 없습니다. (성명이 비어 있는 행은 저장되지 않습니다)'); return }
    setSaving(true); setMsg('')
    const payload = dirty.map(({ _key, _dirty, id, ...r }) => ({
      ...(id ? { id } : {}), ...r, subject_id: subjectId,
      track: r.track || unit.track, class_no: r.class_no || unit.classNo,
      updated_at: new Date().toISOString(),
    }))
    const { data, error } = await supabase.from('skala_evaluations').upsert(payload).select()
    setSaving(false)
    if (error) { setMsg('저장 실패: ' + error.message); return }
    // 반환 id 를 행에 반영
    setRows((prev) => {
      const saved = [...(data || [])]
      return prev.map((r) => {
        if (!r._dirty || !r.student_name.trim()) return r
        const hit = r.id ? saved.find((s) => s.id === r.id) : saved.find((s) => s.student_name === r.student_name && !prev.some((p) => p.id === s.id))
        return hit ? { ...r, id: hit.id, _dirty: false } : r
      })
    })
    setMsg(`저장 완료 — ${payload.length}명 (${new Date().toLocaleTimeString('ko-KR')})`)
  }

  // CSV 내보내기 — 원본 평가지 "평가결과" 시트 컬럼 그대로
  const exportCsv = () => {
    const subj = subjectById(subjectId)
    const esc = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"'
    const head = ['훈련생 고유번호', '성명', '분반',
      ...criteria.map((c, i) => `평가항목 ${i + 1}. ${c.item}${maxOf(c.points) != null ? ` (${maxOf(c.points)}점)` : ''}`),
      `점수 합계${totalMax ? ` (/${totalMax})` : ''}`, '판단근거', '보완사항', '비고']
    const lines = rows.filter((r) => r.student_name.trim()).map((r) => [
      esc(r.student_no), esc(r.student_name), esc(classLabel(r.track, r.class_no)),
      ...criteria.map((c) => esc(r.scores?.[c.item] ?? '')),
      esc(totalOf(r)), esc(r.note_basis), esc(r.note_improve), esc(''),
    ].join(','))
    const csv = '﻿' + [head.map(esc).join(','), ...lines].join('\r\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    a.download = `SKALA4기_종합실습평가_${subj?.name || subjectId}_${unit.campus}${unit.cls}_${unit.dateLabel.replace(/\//g, '')}_이애본.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const doneCount = rows.filter((r) => r.student_name.trim() && criteria.every((c) => r.scores?.[c.item] !== undefined && r.scores?.[c.item] !== '')).length

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, background: 'var(--navy-100)', color: 'var(--navy-700)', fontSize: 12, fontWeight: 800 }}>
          🔒 관리자 전용 · {user?.email}
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: 'var(--navy-800)', marginTop: 12 }}>교과목 평가</h1>
        <p style={{ color: 'var(--ink-soft)', marginTop: 6, fontSize: 14, lineHeight: 1.7 }}>
          사이트에 수록된 종합실습 평가기준(수령 평가지와 정합 검증 완료) 그대로 점수를 입력하고,
          원본 평가지의 "평가결과" 시트 형식 CSV로 내보냅니다. 저장은 Supabase(관리자 전용)에 기록됩니다.
        </p>

        {/* 평가 단위 선택 — 과목 × 담당 분반(강의일자) 개별 평가 */}
        <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {unitsWithExam.map((u) => (
            <button key={u.key} onClick={() => selectUnit(u.key)} style={{
              padding: '7px 13px', borderRadius: 999, cursor: 'pointer', fontSize: 12.5, fontWeight: 700,
              border: `1px solid ${unitKey === u.key ? 'var(--gold)' : 'var(--line-strong)'}`,
              background: unitKey === u.key ? 'var(--gold)' : 'var(--bg-white)',
              color: unitKey === u.key ? '#fff' : 'var(--navy-600)',
            }}>
              {u.subjectName} <span style={{ fontWeight: 600, fontSize: 11 }}>· {u.campus} {u.cls} · {u.dateLabel}</span>
            </button>
          ))}
        </div>
        {unit && (
          <p style={{ marginTop: 10, fontSize: 13.5, fontWeight: 800, color: 'var(--navy-800)' }}>
            {unitLabel(unit)} <span style={{ fontWeight: 600, color: 'var(--ink-soft)' }}>({unit.room})</span>
          </p>
        )}

        {/* 도구줄 */}
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }} onClick={loadStudents}>
            👥 등록 학생 불러오기
          </button>
          {unitRoster && (
            <button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }}
              onClick={() => loadRoster(Object.keys(ROSTERS).find((k) => ROSTERS[k] === unitRoster))}>
              📋 {unitRoster.label} 명단 불러오기
            </button>
          )}
          <button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }} onClick={() => setRows((p) => [...p, newRow()])}>
            + 행 추가(수기)
          </button>
          <button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }} onClick={() => setShowRubric((v) => !v)}>
            📋 평가기준 {showRubric ? '접기' : '보기'}
          </button>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>입력 완료 {doneCount} / {rows.length}명</span>
          <button className="btn btn-cta" style={{ padding: '8px 18px', fontSize: 13, opacity: saving ? 0.6 : 1 }} disabled={saving} onClick={saveAll}>
            {saving ? '저장 중…' : '💾 저장'}
          </button>
          <button className="btn btn-primary" style={{ padding: '8px 18px', fontSize: 13 }} onClick={exportCsv}>
            ⬇ CSV 내보내기
          </button>
        </div>
        {msg && <p style={{ marginTop: 10, fontSize: 13, color: msg.includes('실패') ? '#E5484D' : 'var(--gold)', fontWeight: 700 }}>{msg}</p>}

        {/* 평가기준 참고(개발된 내용 그대로) */}
        {showRubric && (
          <div className="card" style={{ marginTop: 14 }}>
            <ExamBlock e={exam} />
          </div>
        )}

        {/* 입력 그리드 */}
        <div style={{ marginTop: 16, overflowX: 'auto', border: '1px solid var(--line)', borderRadius: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, minWidth: 760 + criteria.length * 90 }}>
            <thead>
              <tr style={{ background: 'var(--navy-50)' }}>
                {['고유번호', '성명', '분반',
                  ...criteria.map((c) => `${c.item}${maxOf(c.points) != null ? ` (${maxOf(c.points)})` : ''}`),
                  `합계${totalMax ? `/${totalMax}` : ''}`, '판단근거', '보완사항', ''].map((h, i) => (
                  <th key={i} style={{ textAlign: 'left', padding: '8px 10px', color: 'var(--navy-700)', fontWeight: 800, whiteSpace: i > 2 && i < 3 + criteria.length ? 'normal' : 'nowrap', minWidth: i > 2 && i < 3 + criteria.length ? 84 : undefined, borderBottom: '1px solid var(--line)', fontSize: 11.5, lineHeight: 1.4 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7 + criteria.length} style={{ padding: 20, textAlign: 'center', color: 'var(--ink-soft)' }}>불러오는 중…</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={7 + criteria.length} style={{ padding: 24, textAlign: 'center', color: 'var(--ink-soft)' }}>
                  "등록 학생 불러오기" 또는 "행 추가"로 평가할 학생을 추가하세요.
                </td></tr>
              ) : rows.map((r) => (
                <tr key={r._key} style={{ borderBottom: '1px solid var(--line)', background: r._dirty ? 'rgba(63,81,255,0.04)' : 'transparent' }}>
                  <td style={{ padding: '6px 8px' }}>
                    <input value={r.student_no || ''} onChange={(e) => patchRow(r._key, { student_no: e.target.value })} placeholder="0000"
                      style={{ width: 72, padding: '6px 8px', borderRadius: 8, border: '1px solid var(--line-strong)', background: 'var(--bg-white)', color: 'var(--ink)', fontSize: 12.5 }} />
                  </td>
                  <td style={{ padding: '6px 8px' }}>
                    <input value={r.student_name} onChange={(e) => patchRow(r._key, { student_name: e.target.value })} placeholder="성명"
                      style={{ width: 90, padding: '6px 8px', borderRadius: 8, border: '1px solid var(--line-strong)', background: 'var(--bg-white)', color: 'var(--ink)', fontSize: 12.5, fontWeight: 700 }} />
                  </td>
                  <td style={{ padding: '6px 8px', whiteSpace: 'nowrap' }}>
                    <select value={r.track ? `${r.track}|${r.class_no || ''}` : ''} onChange={(e) => {
                      const [t, n] = e.target.value.split('|')
                      patchRow(r._key, { track: t || null, class_no: n ? Number(n) : null })
                    }} style={{ padding: '6px 6px', borderRadius: 8, border: '1px solid var(--line-strong)', background: 'var(--bg-white)', color: 'var(--ink)', fontSize: 12 }}>
                      <option value="">-</option>
                      {Object.entries(TRACK_LABELS).flatMap(([t, label]) =>
                        ({ gj: [1,2,3,4], us: [1,2,3,4], p4: [1,2,3,4,5], p5: [6,7,8,9,10] })[t].map((n) => (
                          <option key={`${t}${n}`} value={`${t}|${n}`}>{label} {n}반</option>
                        )))}
                    </select>
                  </td>
                  {criteria.map((c) => {
                    const max = maxOf(c.points)
                    return (
                      <td key={c.item} style={{ padding: '6px 6px' }}>
                        <input type="number" min={0} max={max ?? undefined} value={r.scores?.[c.item] ?? ''} title={c.desc}
                          onChange={(e) => setScore(r._key, c.item, e.target.value, max)}
                          style={{ width: 64, padding: '6px 6px', borderRadius: 8, border: '1px solid var(--line-strong)', background: 'var(--bg-white)', color: 'var(--ink)', fontSize: 12.5, textAlign: 'center' }} />
                      </td>
                    )
                  })}
                  <td style={{ padding: '6px 8px', fontWeight: 900, color: 'var(--gold)', whiteSpace: 'nowrap' }}>{totalOf(r)}</td>
                  <td style={{ padding: '6px 8px' }}>
                    <input value={r.note_basis || ''} onChange={(e) => patchRow(r._key, { note_basis: e.target.value })} placeholder="점수 판단 근거"
                      style={{ width: 170, padding: '6px 8px', borderRadius: 8, border: '1px solid var(--line-strong)', background: 'var(--bg-white)', color: 'var(--ink)', fontSize: 12 }} />
                  </td>
                  <td style={{ padding: '6px 8px' }}>
                    <input value={r.note_improve || ''} onChange={(e) => patchRow(r._key, { note_improve: e.target.value })} placeholder="보완사항"
                      style={{ width: 170, padding: '6px 8px', borderRadius: 8, border: '1px solid var(--line-strong)', background: 'var(--bg-white)', color: 'var(--ink)', fontSize: 12 }} />
                  </td>
                  <td style={{ padding: '6px 8px' }}>
                    <button onClick={() => removeRow(r)} title="행 삭제" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E5484D', fontWeight: 800 }}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: 12, fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          · 점수는 항목별 배점을 넘지 않게 자동 제한됩니다. 파란 배경 행은 저장 전 변경분입니다.<br />
          · CSV는 엑셀에서 바로 열리며(BOM 포함), 원본 평가지의 평가결과 시트에 붙여넣기 좋게 같은 순서로 내보냅니다.
        </p>
      </div>
    </section>
  )
}
