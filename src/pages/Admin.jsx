import { useMemo, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  docsGroups,
  docsTotalCount,
  DOCS_ROOT_FOLDER,
  drivePreview,
  driveView,
  driveDownload,
} from '../data/docs'

// 파일 유형별 색/뱃지
const TYPE_META = {
  pdf: { label: 'PDF', color: '#E5484D', bg: 'rgba(229,72,77,0.12)' },
  pptx: { label: 'PPT', color: '#D9730D', bg: 'rgba(217,115,13,0.12)' },
  xlsx: { label: 'XLS', color: '#30A46C', bg: 'rgba(48,164,108,0.12)' },
  zip: { label: 'ZIP', color: '#8A8FC4', bg: 'rgba(138,143,196,0.14)' },
}
const typeMeta = (x) => TYPE_META[x] || { label: (x || '').toUpperCase(), color: '#8A8FC4', bg: 'rgba(138,143,196,0.14)' }

const fmtSize = (b) => {
  if (!b) return ''
  if (b >= 1024 * 1024) return `${(b / 1024 / 1024).toFixed(1)} MB`
  return `${Math.round(b / 1024)} KB`
}

export default function Admin() {
  const { user } = useAuth()
  const [q, setQ] = useState('')
  const [activeGroup, setActiveGroup] = useState('all')
  const [selected, setSelected] = useState(null) // { t, id, x, b, groupTitle }

  // 검색 + 카테고리 필터
  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase()
    return docsGroups
      .filter((g) => activeGroup === 'all' || g.id === activeGroup)
      .map((g) => ({
        ...g,
        files: g.files.filter((f) => !kw || f.t.toLowerCase().includes(kw)),
      }))
      .filter((g) => g.files.length > 0)
  }, [q, activeGroup])

  const shownCount = filtered.reduce((n, g) => n + g.files.length, 0)

  return (
    <section className="section">
      <div className="container">
        {/* ── 헤더 ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 16, justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, background: 'var(--navy-100)', color: 'var(--navy-700)', fontSize: 12, fontWeight: 800, letterSpacing: 0.3 }}>
              🔒 관리자 전용 · {user?.email}
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: 'var(--navy-800)', marginTop: 12 }}>
              관리자 자료실
            </h1>
            <p style={{ color: 'var(--ink-soft)', marginTop: 6, fontSize: 14, lineHeight: 1.6 }}>
              SKALA 4기 실습교수 강의자료 <b>{docsTotalCount}건</b>을 구글드라이브에서 바로 열람합니다.
              <br />
              파일은 비공개 드라이브에 있으며, 구글 로그인 권한이 있어야 미리보기가 열립니다. 파일명 옆 날짜는 드라이브 파일의 버전 기준일입니다.
            </p>
          </div>
          <a href={DOCS_ROOT_FOLDER} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ whiteSpace: 'nowrap' }}>
            📂 드라이브 폴더 전체 열기 ↗
          </a>
        </div>

        {/* ── 컨트롤: 검색 + 카테고리 ── */}
        <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="파일명 검색…"
            style={{
              flex: '1 1 240px', minWidth: 200, padding: '10px 14px', borderRadius: 10,
              border: '1px solid var(--line-strong)', background: 'var(--bg-white)', color: 'var(--ink)', fontSize: 14,
            }}
          />
          <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{shownCount}건 표시</span>
        </div>
        <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <GroupChip label={`전체 (${docsTotalCount})`} active={activeGroup === 'all'} onClick={() => setActiveGroup('all')} />
          {docsGroups.map((g) => (
            <GroupChip
              key={g.id}
              label={`${g.title.replace(/^\d+\.\s*/, '').replace(/^\[[^\]]+\]\s*/, '')} (${g.files.length})`}
              active={activeGroup === g.id}
              onClick={() => setActiveGroup(g.id)}
            />
          ))}
        </div>

        {/* ── 본문: 목록 + 미리보기 ── */}
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.35fr)', gap: 20, alignItems: 'start' }} className="admin-grid">
          {/* 파일 목록 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {filtered.map((g) => (
              <div key={g.id}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy-700)' }}>{g.title}</h3>
                  <a href={g.folder} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>
                    폴더 ↗
                  </a>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {g.files.map((f) => {
                    const tm = typeMeta(f.x)
                    const isSel = selected?.id === f.id
                    return (
                      <button
                        key={f.id}
                        onClick={() => setSelected({ ...f, groupTitle: g.title })}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left',
                          padding: '10px 12px', borderRadius: 10, cursor: 'pointer',
                          border: `1px solid ${isSel ? 'var(--gold)' : 'var(--line)'}`,
                          background: isSel ? 'var(--navy-50)' : 'var(--bg-white)',
                          transition: 'border-color .12s, background .12s',
                        }}
                      >
                        <span style={{ flex: '0 0 auto', fontSize: 11, fontWeight: 800, color: tm.color, background: tm.bg, padding: '3px 7px', borderRadius: 6 }}>
                          {tm.label}
                        </span>
                        <span style={{ flex: 1, fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.4 }}>
                          {f.t}
                          {f.d && (
                            <span style={{ marginLeft: 6, fontSize: 11, color: 'var(--ink-soft)', fontWeight: 600, whiteSpace: 'nowrap' }} title="드라이브 파일 버전 기준일">
                              {f.d.slice(2)}
                            </span>
                          )}
                        </span>
                        <span style={{ flex: '0 0 auto', fontSize: 11.5, color: 'var(--ink-soft)' }}>{fmtSize(f.b)}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p style={{ color: 'var(--ink-soft)', fontSize: 14 }}>“{q}” 검색 결과가 없습니다.</p>
            )}
          </div>

          {/* 미리보기 */}
          <div style={{ position: 'sticky', top: 16 }} className="admin-preview">
            {selected ? (
              <div style={{ border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', background: 'var(--bg-white)' }}>
                <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--line)' }}>
                  <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{selected.groupTitle}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy-800)', marginTop: 2, lineHeight: 1.4 }}>{selected.t}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                    <a href={driveView(selected.id)} target="_blank" rel="noreferrer" className="btn btn-cta" style={{ fontSize: 13, padding: '7px 14px' }}>
                      새 탭에서 크게 보기 ↗
                    </a>
                    {selected.b > 25 * 1024 * 1024 ? (
                      // 25MB 초과 파일은 uc?export=download 가 구글 확인 페이지로 리다이렉트되어 원클릭이 안 됨 → view로 안내
                      <a href={driveView(selected.id)} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: 13, padding: '7px 14px' }} title="25MB 초과 파일은 새 탭에서 열어 다운로드하세요">
                        ⬇ 다운로드(새 탭)
                      </a>
                    ) : (
                      <a href={driveDownload(selected.id)} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: 13, padding: '7px 14px' }}>
                        ⬇ 다운로드
                      </a>
                    )}
                  </div>
                </div>
                <iframe
                  key={selected.id}
                  title={selected.t}
                  src={drivePreview(selected.id)}
                  style={{ width: '100%', height: 620, border: 0, display: 'block', background: 'var(--navy-50)' }}
                  allow="autoplay"
                />
              </div>
            ) : (
              <div style={{ border: '1px dashed var(--line-strong)', borderRadius: 14, padding: '60px 24px', textAlign: 'center', color: 'var(--ink-soft)', background: 'var(--navy-50)' }}>
                <div style={{ fontSize: 40 }}>📄</div>
                <p style={{ marginTop: 12, fontSize: 14 }}>
                  왼쪽에서 파일을 선택하면
                  <br />
                  여기에서 바로 미리볼 수 있습니다.
                </p>
                <p style={{ marginTop: 8, fontSize: 12.5, lineHeight: 1.6 }}>
                  PDF · PPT · Excel 모두 구글 뷰어로 열립니다.
                  <br />
                  미리보기가 안 뜨면 브라우저에 강사 구글계정
                  <br />
                  (aebon@hs.ac.kr)이 로그인되어 있는지 확인하세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 모바일: 1단으로 */}
      <style>{`
        @media (max-width: 860px) {
          .admin-grid { grid-template-columns: 1fr !important; }
          .admin-preview { position: static !important; }
        }
      `}</style>
    </section>
  )
}

function GroupChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 13px', borderRadius: 999, cursor: 'pointer', fontSize: 12.5, fontWeight: 700,
        border: `1px solid ${active ? 'var(--gold)' : 'var(--line-strong)'}`,
        background: active ? 'var(--gold)' : 'var(--bg-white)',
        color: active ? '#fff' : 'var(--navy-600)',
      }}
    >
      {label}
    </button>
  )
}
