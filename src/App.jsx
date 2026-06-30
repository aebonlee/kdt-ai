import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import RequireAuth from './components/RequireAuth'

// 라우트 단위 코드 스플리팅 — 각 페이지를 필요할 때만 내려받는다.
// 특히 무거운 강의안 데이터(lecture*.js)는 Lectures 청크에만 포함되어 초기 번들에서 빠진다.
const Home = lazy(() => import('./pages/Home'))
const Subjects = lazy(() => import('./pages/Subjects'))
const Schedule = lazy(() => import('./pages/Schedule'))
const DayDetail = lazy(() => import('./pages/DayDetail'))
const Prep = lazy(() => import('./pages/Prep'))
const PrepDetail = lazy(() => import('./pages/PrepDetail'))
const Lectures = lazy(() => import('./pages/Lectures'))
const TeamProject = lazy(() => import('./pages/TeamProject'))
const References = lazy(() => import('./pages/References'))
const Progress = lazy(() => import('./pages/Progress'))
const Login = lazy(() => import('./pages/Login'))
const Board = lazy(() => import('./pages/Board'))
const BoardDetail = lazy(() => import('./pages/BoardDetail'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

// lazy 청크를 내려받는 동안 잠깐 보여줄 로딩 표시
function PageFallback() {
  return (
    <div style={{ padding: '80px 20px', textAlign: 'center', color: 'var(--ink-soft)' }}>
      불러오는 중…
    </div>
  )
}

export default function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <ScrollToTop />
      <Header />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/prep" element={<Prep />} />
            <Route path="/prep/:id" element={<PrepDetail />} />
            <Route path="/lectures" element={<Lectures />} />
            <Route path="/lectures/:date" element={<Lectures />} />
            <Route path="/team" element={<TeamProject />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/reference" element={<References />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/day/:date" element={<DayDetail />} />

            {/* 로그인 / 게시판 / 대시보드 */}
            <Route path="/login" element={<Login />} />
            <Route path="/board" element={<RequireAuth><Board /></RequireAuth>} />
            <Route path="/board/:id" element={<RequireAuth><BoardDetail /></RequireAuth>} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
