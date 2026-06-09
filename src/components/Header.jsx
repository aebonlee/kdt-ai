import { NavLink, Link } from 'react-router-dom'
import { course } from '../data/course'

const nav = [
  { to: '/', label: '홈', end: true },
  { to: '/subjects', label: '과목별' },
  { to: '/schedule', label: '일정' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-azure font-bold text-white">
            S
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-extrabold tracking-tight text-white">
              {course.title}
            </span>
            <span className="block text-[11px] font-medium text-sky">
              {course.subtitle} · {course.cohort}
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-azure text-white' : 'text-slate-200 hover:bg-white/10'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
