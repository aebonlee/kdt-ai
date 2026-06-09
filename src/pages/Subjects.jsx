import { Link } from 'react-router-dom'
import { subjects, sessionsBySubject } from '../data/curriculum'

// 팔레트 키 → 좌측 보더/배지 색
const accent = {
  navy: 'border-navy',
  ocean: 'border-ocean',
  azure: 'border-azure',
  sky: 'border-sky',
  amber: 'border-amber',
}

export default function Subjects() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-extrabold text-navy">과목별 보기</h1>
      <p className="mt-1 text-slate-600">과목(모듈)별로 묶어 일자별 수업 내용을 확인합니다.</p>

      <div className="mt-8 space-y-8">
        {subjects.map((s) => {
          const items = sessionsBySubject(s.id)
          return (
            <section
              key={s.id}
              className={`rounded-2xl border-l-4 ${accent[s.color] ?? 'border-azure'} border-y border-r border-slate-200 bg-white p-6 shadow-sm`}
            >
              <h2 className="text-xl font-bold text-navy">{s.name}</h2>
              <p className="mt-1 text-sm text-slate-600">{s.summary}</p>

              {items.length === 0 ? (
                <p className="mt-4 text-sm text-slate-400">등록된 일정이 아직 없습니다.</p>
              ) : (
                <ul className="mt-4 divide-y divide-slate-100">
                  {items.map((it) => (
                    <li key={it.date}>
                      <Link
                        to={`/day/${it.date}`}
                        className="flex items-center justify-between gap-4 py-3 transition hover:text-azure"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-28 shrink-0 text-sm font-mono text-slate-500">
                            {it.date} ({it.weekday})
                          </span>
                          <span className="font-semibold">{it.title}</span>
                        </span>
                        <span className="text-sm text-slate-400">{it.week}주차 →</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
