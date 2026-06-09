import { useParams, Link } from 'react-router-dom'
import { sessionByDate, subjectById, sortedSessions } from '../data/curriculum'

function Section({ title, items }) {
  if (!items || items.length === 0) return null
  return (
    <div className="mt-6">
      <h3 className="text-sm font-bold uppercase tracking-wide text-azure">{title}</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  )
}

export default function DayDetail() {
  const { date } = useParams()
  const session = sessionByDate(date)

  if (!session) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg font-semibold text-slate-700">
          {date} 일자의 등록된 수업이 없습니다.
        </p>
        <Link to="/schedule" className="mt-4 inline-block font-semibold text-azure hover:underline">
          ← 전체 일정으로
        </Link>
      </div>
    )
  }

  const subj = subjectById(session.subjectId)
  const all = sortedSessions()
  const idx = all.findIndex((s) => s.date === date)
  const prev = idx > 0 ? all[idx - 1] : null
  const next = idx < all.length - 1 ? all[idx + 1] : null

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link to="/schedule" className="text-sm font-semibold text-azure hover:underline">
        ← 전체 일정
      </Link>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-navy px-3 py-1 font-semibold text-white">
            {subj?.name}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
            {session.week}주차
          </span>
          <span className="font-mono text-slate-500">
            {session.date} ({session.weekday})
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-navy">{session.title}</h1>

        <Section title="학습 목표" items={session.objectives} />
        <Section title="학습 내용" items={session.contents} />
        <Section title="학습 자료" items={session.materials} />
      </div>

      {/* 이전/다음 */}
      <div className="mt-6 flex justify-between gap-3">
        {prev ? (
          <Link
            to={`/day/${prev.date}`}
            className="flex-1 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-azure"
          >
            <span className="text-xs text-slate-400">← 이전</span>
            <p className="font-semibold text-navy">{prev.title}</p>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {next ? (
          <Link
            to={`/day/${next.date}`}
            className="flex-1 rounded-xl border border-slate-200 bg-white p-4 text-right shadow-sm transition hover:border-azure"
          >
            <span className="text-xs text-slate-400">다음 →</span>
            <p className="font-semibold text-navy">{next.title}</p>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </div>
    </div>
  )
}
