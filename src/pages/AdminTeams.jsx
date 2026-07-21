import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { listAllProgress } from '../data/db'
import { totalSessions } from '../data/curriculum'
import { teams, normName } from '../data/teams'

const fmt = (s) => (s ? new Date(s).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }) : '—')
const pctOf = (r) => Math.round(((r?.completed?.length ?? 0) / totalSessions) * 100)

export default function AdminTeams() {
  const [rows, setRows] = useState(null) // kdt_progress 전체
  const [err, setErr] = useState('')

  useEffect(() => {
    listAllProgress()
      .then(setRows)
      .catch((e) => setErr(e.message || '불러오기 실패'))
  }, [])

  // 이름 → 진도 레코드 "목록"(동명이인 보존: 같은 이름의 서로 다른 user_id를 모두 담는다)
  const byName = useMemo(() => {
    const m = new Map()
    ;(rows || []).forEach((r) => {
      const k = normName(r.user_name)
      if (!m.has(k)) m.set(k, [])
      m.get(k).push(r)
    })
    return m
  }, [rows])

  // 팀별 명단 구성 + 팀 배정 안 된 학습자 (매칭·미배정 판정은 user_id 기준)
  const { teamViews, unassigned } = useMemo(() => {
    const assignedIds = new Set()
    const teamViews = teams.map((t) => {
      const members = t.members.map((name) => {
        const matches = byName.get(normName(name)) || []
        matches.forEach((r) => assignedIds.add(r.user_id)) // 동명이인 전원을 배정 처리
        const r = matches[0]
        return {
          name,
          joined: matches.length > 0,
          pct: r ? pctOf(r) : 0,
          updated: r?.updated_at,
          dupCount: matches.length, // 2 이상이면 동명이인 → 경고 표시
        }
      })
      return { ...t, members }
    })
    // user_id 기준으로 미배정 판정 → 동명이인 두 번째 계정이 누락되지 않는다
    const unassigned = (rows || []).filter((r) => !assignedIds.has(r.user_id))
    return { teamViews, unassigned }
  }, [byName, rows])

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, background: 'var(--navy-100)', color: 'var(--navy-700)', fontSize: 12, fontWeight: 800 }}>
              🔒 관리자 전용
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: 'var(--navy-800)', marginTop: 12 }}>프로젝트 팀별 명단</h1>
            <p style={{ color: 'var(--ink-soft)', marginTop: 6, fontSize: 14 }}>
              팀 편성은 <code>src/data/teams.js</code> 에 넣습니다. 이름이 로그인 학습자와 매칭되면 진도율이 함께 표시됩니다.
            </p>
          </div>
          <Link to="/dashboard" className="btn btn-outline" style={{ whiteSpace: 'nowrap' }}>
            👥 대시보드(전체 진도) →
          </Link>
        </div>

        {err && (
          <p style={{ marginTop: 20, color: '#E5484D', fontSize: 14 }}>
            불러오기 오류: {err} (kdt_progress 테이블·RLS 관리자 조회 권한 확인)
          </p>
        )}
        {!rows && !err && <p style={{ marginTop: 20, color: 'var(--ink-soft)' }}>불러오는 중…</p>}

        {rows && (
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* 팀 배정이 있을 때 */}
            {teamViews.length > 0 &&
              teamViews.map((t) => (
                <div key={t.no} className="card">
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--navy-800)' }}>
                      {t.name || `${t.no}팀`}
                    </h3>
                    {t.topic && <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>· {t.topic}</span>}
                    <span style={{ fontSize: 12, color: 'var(--ink-soft)', marginLeft: 'auto' }}>{t.members.length}명</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {t.members.map((m, i) => (
                      <MemberRow key={`${t.no}-${i}-${m.name}`} {...m} />
                    ))}
                  </div>
                </div>
              ))}

            {/* 팀 배정이 없을 때 안내 */}
            {teamViews.length === 0 && (
              <div className="card" style={{ borderLeft: '3px solid var(--gold)' }}>
                <p style={{ fontSize: 14, color: 'var(--navy-700)', fontWeight: 700 }}>아직 팀 편성이 등록되지 않았습니다.</p>
                <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.6 }}>
                  <code>src/data/teams.js</code> 에 팀·멤버를 넣으면 팀별로 묶여 표시됩니다.
                  <br />
                  아래는 현재 로그인·진도를 남긴 전체 학습자 명단입니다.
                </p>
              </div>
            )}

            {/* 팀 미배정(또는 전체) 학습자 */}
            <div className="card">
              <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--navy-800)', marginBottom: 12 }}>
                {teamViews.length > 0 ? `팀 미배정 학습자 (${unassigned.length}명)` : `전체 학습자 (${unassigned.length}명)`}
              </p>
              {unassigned.length === 0 ? (
                <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                  {teamViews.length > 0 ? '모든 학습자가 팀에 배정되었습니다.' : '아직 로그인·진도 데이터가 없습니다.'}
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {unassigned.map((r) => (
                    <MemberRow key={r.user_id} name={r.user_name} joined pct={pctOf(r)} updated={r.updated_at} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function MemberRow({ name, joined, pct, updated, dupCount = 0 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ width: 150, fontSize: 13.5, color: 'var(--navy-700)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {name}
        {dupCount > 1 && (
          <span title="같은 이름의 계정이 여러 개입니다. 진도율은 그중 하나 기준입니다." style={{ marginLeft: 6, fontSize: 11, color: '#D9730D', fontWeight: 700 }}>
            ⚠︎동명 {dupCount}
          </span>
        )}
      </span>
      {joined ? (
        <>
          <span className="progressbar" style={{ flex: 1 }}><span style={{ width: `${pct}%` }} /></span>
          <span style={{ width: 44, textAlign: 'right', fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>{pct}%</span>
          <span style={{ width: 52, textAlign: 'right', fontSize: 12, color: 'var(--ink-soft)' }}>{fmt(updated)}</span>
        </>
      ) : (
        <span style={{ flex: 1, fontSize: 12.5, color: 'var(--ink-soft)' }}>미접속(로그인 기록 없음)</span>
      )}
    </div>
  )
}
