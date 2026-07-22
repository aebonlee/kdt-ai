import { refGroups, refImages } from '../data/resources'
import { course } from '../data/course'
import Sentences from '../components/Sentences'
import CurriculumFlow from '../components/CurriculumFlow'

export default function References() {
  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">References</span>
          <h1>참고자료</h1>
          <p>
            <span style={{ display: 'block' }}>강의에 도움이 되는 공식 문서와 자료 모음입니다.</span>
            <span style={{ display: 'block' }}>과목별 공식 문서는 새 탭으로 열립니다.</span>
          </p>
        </div>
      </div>

      {/* 전체 커리큘럼 흐름도 — 메인(Home)과 동일 구조로 배치 */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Overview</span>
            <h2>전체 커리큘럼</h2>
            <p>
              <Sentences text={`AI 실무 전 과정의 흐름입니다. 본 사이트는 이 중 ${course.instructor} 강사 담당 과목을 다룹니다.`} />
            </p>
          </div>
          <div className="card" style={{ padding: 'var(--s-6)', overflowX: 'auto' }}>
            <CurriculumFlow />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* 이미지 자료 */}
          {refImages.map((img) => (
            <div key={img.src} style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--navy-800)', marginBottom: 12 }}>
                {img.caption}
              </h2>
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 'var(--s-5)' }}>
                <img src={img.src} alt={img.caption} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>
          ))}

          {/* 링크 그룹 */}
          <div className="grid grid-3">
            {refGroups.map((g) => (
              <div key={g.title} className="card">
                <h4 style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy-800)', marginBottom: g.note ? 6 : 12, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  {g.title}
                  {g.tag && <span className="ref-tag">{g.tag}</span>}
                </h4>
                {g.note && (
                  <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 12px' }}>{g.note}</p>
                )}
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {g.links.map((l) => (
                    <li key={l.url}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 14 }}
                      >
                        {l.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
