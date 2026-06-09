import { course } from '../data/course'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
        <p className="font-semibold text-slate-700">
          {course.title} — {course.subtitle} {course.cohort}
        </p>
        <p className="mt-1">
          {course.overview.period} · {course.overview.time} · {course.overview.format}
        </p>
        <p className="mt-1">캠퍼스: {course.campuses.join(' · ')} · 문의: {course.contact}</p>
        <p className="mt-3 text-xs text-slate-400">
          본 사이트는 SKALA 4기 학습자용 커리큘럼 안내 페이지입니다.
        </p>
      </div>
    </footer>
  )
}
