import { Link } from 'react-router-dom'
import { course } from '../data/course'
import { subjects } from '../data/curriculum'

const overviewCards = [
  { label: '교육 기간', value: course.overview.period },
  { label: '교육 시간', value: course.overview.time },
  { label: '교육 형태', value: course.overview.format },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky">
            {course.subtitle}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {course.title} <span className="text-amber">{course.cohort}</span> 교육 커리큘럼
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{course.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/schedule"
              className="rounded-lg bg-amber px-5 py-3 font-bold text-navy transition hover:brightness-105"
            >
              전체 일정 보기
            </Link>
            <Link
              to="/subjects"
              className="rounded-lg border border-white/20 px-5 py-3 font-bold text-white transition hover:bg-white/10"
            >
              과목별 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-bold text-navy">SKALA 교육 커리큘럼 Overview</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {overviewCards.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-azure">{c.label}</p>
              <p className="mt-2 text-lg font-bold text-slate-800">{c.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subjects preview */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold text-navy">과목 구성</h2>
          <Link to="/subjects" className="text-sm font-semibold text-azure hover:underline">
            전체 보기 →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {subjects.map((s) => (
            <Link
              key={s.id}
              to="/subjects"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-azure hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-navy group-hover:text-azure">{s.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
