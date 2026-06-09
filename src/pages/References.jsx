import { refGroups, refImages } from '../data/resources'

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
                <h4 style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy-800)', marginBottom: 12 }}>{g.title}</h4>
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
