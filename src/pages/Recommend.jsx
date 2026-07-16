// 학습추천사이트 — 강사가 제자들을 위해 직접 만들어 운영하는 학습 사이트 모음.
// 계정 공유(1회 로그인) 안내 + AWS 응시 쿠폰 안내를 함께 제공한다.
import { RECOMMEND_GROUPS, RECOMMEND_NOTICE } from '../data/recommendsites'

const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

export default function Recommend() {
  const total = RECOMMEND_GROUPS.reduce((a, g) => a + g.sites.length, 0)
  return (
    <div>
      <div className="page-header-ed">
        <div className="container">
          <span className="eyebrow">Recommended Sites</span>
          <h1>학습추천사이트</h1>
          <p>
            <span style={{ display: 'block' }}>이애본 강사가 제자들을 위해 만들어 운영하는 학습 사이트 {total}곳입니다. 도움이 된다면 편하게 이용하세요.</span>
            <span style={{ display: 'block' }}>디자인보다 콘텐츠 중심으로 개발해 내용은 검증된 자료들입니다.</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* 이용 안내 — 1회 로그인 · 학습 우선순위 */}
          <div className="grid grid-2" style={{ marginBottom: 12 }}>
            <div className="box box-tips">
              <div className="box-h">🔑 로그인은 한 번이면 됩니다</div>
              <p style={{ margin: 0 }}>{RECOMMEND_NOTICE.login}</p>
            </div>
            <div className="box box-practice">
              <div className="box-h">📌 이용 팁</div>
              <p style={{ margin: 0 }}>{RECOMMEND_NOTICE.usage}</p>
            </div>
          </div>

          {RECOMMEND_GROUPS.map((g) => (
            <div key={g.name}>
              <div className="section-head" style={{ marginTop: 36 }}>
                <span className="eyebrow">{g.icon}</span>
                <h2>{g.name}</h2>
                <p>{g.desc}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
                {g.sites.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="card" style={{ padding: '18px 20px', display: 'block' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--navy-800)' }}>{s.name}</h3>
                      <span className="chip chip-day" style={{ flex: '0 0 auto' }}>{s.tag}</span>
                    </div>
                    <p style={{ marginTop: 8, fontSize: 13.5, color: 'var(--navy-700)', lineHeight: 1.7 }}>{s.desc}</p>
                    {s.badge && (
                      <p style={{ marginTop: 8, fontSize: 12.5, fontWeight: 800, color: 'var(--gold)' }} title={s.badgeDesc}>
                        {s.badge}
                      </p>
                    )}
                    <p style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-soft)' }}>
                      {host(s.url)} <span style={{ color: 'var(--gold)', fontWeight: 800 }}>바로가기 ↗</span>
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}

          <p style={{ marginTop: 28, fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.8 }}>
            ※ 모두 무료로 운영되는 사이트입니다. AWS 자격증 학습의 응시 쿠폰(바우처) 발행 안내는 해당 사이트 공지에서 확인하세요.
          </p>
        </div>
      </section>
    </div>
  )
}
