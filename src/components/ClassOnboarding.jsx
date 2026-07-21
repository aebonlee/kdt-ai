// 소속 분반 온보딩 — 로그인 후 소속 반(학생) / 담당 분반(교수자)을 입력·확인받는다.
// · 미입력·미확인: 모달 표시(세션당 "나중에" 1회 허용)
// · 입력 완료 후에도 confirmed_at 이 오래되면(RECONFIRM_DAYS) 재확인 배너로 반복 확인 — 정보 정확도 유지
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { TRACK_LABELS, CLASS_MAP, classLabel } from '../data/classes'
import { TITLES } from '../config/roles'
import {
  useProfile, loadProfile, saveProfile, reconfirmProfile, needsReconfirm, isProfileComplete,
} from '../hooks/useProfile'

// 교수자 직책 선택지 — roles.js TITLES 와 코드 일치.
// 담당 분반 선택이 필요한 직책: 분반담당매니저 · 실습교수(반별 실습 지도)
const TITLE_OPTIONS = [
  { code: 'lead_professor', label: '전임교수', desc: '과목 교안 저자(주강사)', needsClasses: false },
  { code: 'lead_practice', label: '실습교수 총괄', desc: '실습교수진 총괄 책임', needsClasses: false },
  { code: 'practice_professor', label: '실습교수', desc: '반별 실습 지도', needsClasses: true },
  { code: 'chief_manager', label: '책임매니저', desc: '운영 총괄', needsClasses: false },
  { code: 'class_manager', label: '분반담당매니저', desc: '특정 분반 운영 담당', needsClasses: true },
]
const titleNeedsClasses = (code) => TITLE_OPTIONS.find((o) => o.code === code)?.needsClasses

// 다른 화면(학습관리 등)에서 모달을 다시 열 수 있게 하는 간단한 오프너
let opener = null
export function openClassOnboarding() {
  if (opener) opener()
}

const SNOOZE_KEY = 'kdt-onboarding-snooze'

export default function ClassOnboarding() {
  const { user } = useAuth()
  const { status, profile } = useProfile()
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState('student')
  const [title, setTitle] = useState('') // 교수자 직책 코드
  const [track, setTrack] = useState('')
  const [classNo, setClassNo] = useState(null)
  const [teach, setTeach] = useState([]) // [{track, no}]
  const [checked, setChecked] = useState(false)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => { opener = () => setOpen(true); return () => { opener = null } }, [])
  useEffect(() => { if (user) loadProfile(user) }, [user])

  // 프로필이 비었거나 미완성이면 모달 자동 오픈(세션당 스누즈 1회)
  useEffect(() => {
    if (!user || status !== 'ready') return
    if (isProfileComplete(profile)) return
    if (sessionStorage.getItem(SNOOZE_KEY)) return
    setOpen(true)
  }, [user, status, profile])

  // 기존 값 프리필
  useEffect(() => {
    if (!profile) return
    setRole(profile.role || 'student')
    setTitle(profile.title || '')
    setTrack(profile.track || '')
    setClassNo(profile.class_no || null)
    setTeach(profile.teach_classes || [])
  }, [profile])

  const complete = isProfileComplete(profile)
  const reconfirm = user && status === 'ready' && complete && needsReconfirm(profile)

  const canSave = useMemo(() => {
    if (!checked) return false
    if (role === 'instructor') {
      if (!title) return false
      // 담당 분반이 필요한 직책은 분반을 골라야 한다
      return titleNeedsClasses(title) ? teach.length > 0 : true
    }
    return !!track && !!classNo
  }, [checked, role, title, track, classNo, teach])

  if (!user || status === 'unavailable' || status === 'idle' || status === 'loading') return null

  // ── 재확인 배너 (정보는 있으나 확인이 오래됨) ──
  if (!open && reconfirm) {
    const teachLabel = (profile.teach_classes || []).map((t) => classLabel(t.track, t.no)).join(', ')
    const label = profile.role === 'instructor'
      ? [profile.title ? TITLES[profile.title]?.label : '교수자', teachLabel && `담당 ${teachLabel}`].filter(Boolean).join(' · ')
      : classLabel(profile.track, profile.class_no)
    return (
      <div style={{
        position: 'sticky', top: 0, zIndex: 240, display: 'flex', flexWrap: 'wrap', gap: 10,
        alignItems: 'center', justifyContent: 'center', padding: '9px 16px',
        background: 'var(--navy-100)', borderBottom: '1px solid var(--line)', fontSize: 13.5,
      }}>
        <span>
          소속 정보 확인 — <b style={{ color: 'var(--navy-800)' }}>{label}</b> 이(가) 지금도 맞나요?
        </span>
        <button className="btn btn-cta" style={{ padding: '5px 14px', fontSize: 12.5 }}
          onClick={async () => { await reconfirmProfile(user) }}>
          ✓ 맞아요
        </button>
        <button className="btn btn-ghost" style={{ padding: '5px 14px', fontSize: 12.5 }}
          onClick={() => { setOpen(true) }}>
          변경할래요
        </button>
      </div>
    )
  }

  if (!open) return null

  const toggleTeach = (t, no) => {
    setTeach((prev) => {
      const exists = prev.some((x) => x.track === t && x.no === no)
      return exists ? prev.filter((x) => !(x.track === t && x.no === no)) : [...prev, { track: t, no }]
    })
  }

  const onSave = async () => {
    setSaving(true); setErr('')
    const now = new Date().toISOString()
    const patch = role === 'instructor'
      ? {
          role, title,
          // 담당 분반이 필요 없는 직책(전임교수·책임매니저)은 분반을 비운다
          teach_classes: titleNeedsClasses(title) ? teach : [],
          track: null, class_no: null, confirmed_at: now,
        }
      : { role, title: null, track, class_no: classNo, teach_classes: [], confirmed_at: now }
    const { error } = await saveProfile(user, patch)
    setSaving(false)
    if (error) setErr('저장에 실패했습니다: ' + error.message)
    else setOpen(false)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 16, background: 'rgba(14,17,82,0.55)',
    }}>
      <div style={{
        width: 'min(560px, 100%)', maxHeight: '90vh', overflowY: 'auto', borderRadius: 16,
        background: 'var(--bg-white)', padding: '26px 26px 22px', boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
      }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)', letterSpacing: 1 }}>CLASS CHECK</div>
        <h3 style={{ fontSize: 20, fontWeight: 900, color: 'var(--navy-800)', marginTop: 6 }}>소속 분반을 확인해 주세요</h3>
        <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.7 }}>
          분반에 맞는 수강 일정과 학습관리를 제공하기 위해 필요합니다. 잘못 선택했으면 언제든 학습관리에서 변경할 수 있습니다.
        </p>

        {/* 역할 선택 */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {[['student', '학생 (교육생)'], ['instructor', '교수자']].map(([k, label]) => (
            <button key={k} onClick={() => setRole(k)} style={{
              flex: 1, padding: '10px 12px', borderRadius: 10, fontSize: 13.5, fontWeight: 800, cursor: 'pointer',
              border: `1.5px solid ${role === k ? 'var(--gold)' : 'var(--line-strong)'}`,
              background: role === k ? 'var(--navy-50)' : 'var(--bg-white)',
              color: role === k ? 'var(--gold)' : 'var(--navy-700)',
            }}>{label}</button>
          ))}
        </div>

        {role === 'student' ? (
          <>
            {/* 캠퍼스 */}
            <div style={{ marginTop: 16, fontSize: 13, fontWeight: 800, color: 'var(--navy-700)' }}>소속 캠퍼스</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              {Object.entries(TRACK_LABELS).map(([k, label]) => (
                <button key={k} onClick={() => { setTrack(k); setClassNo(null) }} style={{
                  padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  border: `1.5px solid ${track === k ? 'var(--gold)' : 'var(--line-strong)'}`,
                  background: track === k ? 'var(--gold)' : 'var(--bg-white)',
                  color: track === k ? '#fff' : 'var(--navy-700)',
                }}>{label}</button>
              ))}
            </div>
            {/* 반 */}
            {track && (
              <>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 800, color: 'var(--navy-700)' }}>소속 반</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 8, marginTop: 8 }}>
                  {CLASS_MAP[track].map((c) => (
                    <button key={c.no} onClick={() => setClassNo(c.no)} style={{
                      padding: '9px 8px', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer',
                      border: `1.5px solid ${classNo === c.no ? 'var(--gold)' : 'var(--line-strong)'}`,
                      background: classNo === c.no ? 'var(--navy-50)' : 'var(--bg-white)',
                      color: classNo === c.no ? 'var(--gold)' : 'var(--navy-700)',
                    }}>
                      {c.no}반 <span style={{ fontWeight: 600, fontSize: 11, color: 'var(--ink-soft)' }}>{c.room}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {/* 직책 선택 */}
            <div style={{ marginTop: 16, fontSize: 13, fontWeight: 800, color: 'var(--navy-700)' }}>직책</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8, marginTop: 8 }}>
              {TITLE_OPTIONS.map((o) => {
                const on = title === o.code
                const t = TITLES[o.code]
                return (
                  <button key={o.code} onClick={() => { setTitle(o.code); if (!o.needsClasses) setTeach([]) }} style={{
                    textAlign: 'left', padding: '10px 12px', borderRadius: 10, cursor: 'pointer',
                    border: `1.5px solid ${on ? t.color : 'var(--line-strong)'}`,
                    background: on ? 'var(--navy-50)' : 'var(--bg-white)',
                  }}>
                    <div style={{ fontSize: 13.5, fontWeight: 800, color: on ? t.color : 'var(--navy-800)' }}>{o.label}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', marginTop: 2 }}>{o.desc}</div>
                  </button>
                )
              })}
            </div>

            {/* 담당 분반 — 분반이 필요한 직책에서만 */}
            {title && titleNeedsClasses(title) && (
              <>
                <div style={{ marginTop: 16, fontSize: 13, fontWeight: 800, color: 'var(--navy-700)' }}>
                  담당 분반 <span style={{ fontWeight: 600, color: 'var(--ink-soft)' }}>(복수 선택 가능 · 판교는 4층 1~5반 / 5층 6~10반)</span>
                </div>
                {Object.entries(TRACK_LABELS).map(([t, label]) => (
                  <div key={t} style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)' }}>{label}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                      {CLASS_MAP[t].map((c) => {
                        const on = teach.some((x) => x.track === t && x.no === c.no)
                        return (
                          <button key={c.no} onClick={() => toggleTeach(t, c.no)} style={{
                            padding: '6px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
                            border: `1.5px solid ${on ? 'var(--gold)' : 'var(--line-strong)'}`,
                            background: on ? 'var(--gold)' : 'var(--bg-white)',
                            color: on ? '#fff' : 'var(--navy-700)',
                          }}>{c.no}반 <span style={{ fontWeight: 600, fontSize: 11, opacity: 0.8 }}>{c.room}</span></button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}

        {/* 확인 체크 */}
        <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 18, cursor: 'pointer', fontSize: 13.5, lineHeight: 1.6 }}>
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} style={{ marginTop: 3, width: 16, height: 16 }} />
          <span>
            {role === 'instructor'
              ? <>직책 <b>{title ? TITLES[title].label : '미선택'}</b>{titleNeedsClasses(title) && <> · 담당 분반 <b>{teach.length ? teach.map((t) => classLabel(t.track, t.no)).join(', ') : '미선택'}</b></>}이(가) 맞음을 확인합니다.</>
              : <>소속 분반(<b>{track && classNo ? classLabel(track, classNo) : '미선택'}</b>)이 맞음을 확인합니다.</>}
          </span>
        </label>

        {err && <p style={{ marginTop: 10, fontSize: 12.5, color: '#E5484D' }}>{err}</p>}

        <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" style={{ padding: '9px 16px', fontSize: 13 }}
            onClick={() => { sessionStorage.setItem(SNOOZE_KEY, '1'); setOpen(false) }}>
            나중에
          </button>
          <button className="btn btn-cta" style={{ padding: '9px 20px', fontSize: 13, opacity: canSave && !saving ? 1 : 0.5 }}
            disabled={!canSave || saving} onClick={onSave}>
            {saving ? '저장 중…' : '확인 완료'}
          </button>
        </div>
      </div>
    </div>
  )
}
