import { Link } from 'react-router-dom'
import { sessionsByWeek, subjectById } from '../data/curriculum'

const dot = {
  navy: 'bg-navy',
  ocean: 'bg-ocean',
  azure: 'bg-azure',
  sky: 'bg-sky',
  amber: 'bg-amber',
}

export default function Schedule() {
  const weeks = sessionsByWeek()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-extrabold text-navy">전체 일정</h1>
      <p className="mt-1 text-slate-600">주차별 타임라인 · 날짜를 클릭하면 일자별 상세로 이동합니다.</p>

      <div className="mt-8 space-y-10">
        {weeks.map(({ week, items }) => (
          <section key={week}>
            <h2 className="mb-3 inline-block rounded-full bg-navy px-4 py-1 text-sm font-bold text-white">
              {week}주차
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => {
                const subj = subjectById(it.subjectId)
                return (
                  <Link
                    key={it.date}
                    to={`/day/${it.date}`}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-azure hover:shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${dot[subj?.color] ?? 'bg-azure'}`} />
                      <span className="text-xs font-semibold text-slate-500">{subj?.name}</span>
                    </div>
                    <p className="mt-2 font-mono text-sm text-slate-500">
                      {it.date} ({it.weekday})
                    </p>
                    <p className="mt-1 font-bold text-navy">{it.title}</p>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
