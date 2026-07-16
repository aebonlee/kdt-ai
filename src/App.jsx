import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import RequireAuth from './components/RequireAuth'
import RequireAdmin from './components/RequireAdmin'
import AdminShell from './components/AdminShell'
import Home from './pages/Home' // 랜딩은 정적 import — entry→Home→curriculum 워터폴 제거(-1 RTT)
import ClassOnboarding from './components/ClassOnboarding'

// 라우트 단위 코드 스플리팅 — 각 페이지를 필요할 때만 내려받는다.
// 특히 무거운 강의안 데이터(lecture*.js)는 Lectures 청크에만 포함되어 초기 번들에서 빠진다.
const About = lazy(() => import('./pages/About'))
const Tracks = lazy(() => import('./pages/Tracks'))
const InstructorIntro = lazy(() => import('./pages/InstructorIntro'))
const AboutGuide = lazy(() => import('./pages/AboutGuide'))
const Textbook = lazy(() => import('./pages/Textbook'))
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
const Recommend = lazy(() => import('./pages/Recommend'))
const BoardDetail = lazy(() => import('./pages/BoardDetail'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Admin = lazy(() => import('./pages/Admin'))
const AdminTeams = lazy(() => import('./pages/AdminTeams'))
const AdminSchedule = lazy(() => import('./pages/AdminSchedule'))
const AdminEvaluate = lazy(() => import('./pages/AdminEvaluate'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AdminStudents = lazy(() => import('./pages/AdminStudents'))

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
      <ClassOnboarding />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/guide" element={<AboutGuide />} />
            <Route path="/about/instructor" element={<InstructorIntro />} />
            <Route path="/tracks" element={<RequireAuth><Tracks /></RequireAuth>} />
            <Route path="/prep" element={<Prep />} />
            <Route path="/prep/:id" element={<PrepDetail />} />
            <Route path="/lectures" element={<RequireAuth><Lectures /></RequireAuth>} />
            <Route path="/lectures/:date" element={<RequireAuth><Lectures /></RequireAuth>} />
            <Route path="/team" element={<RequireAuth><TeamProject /></RequireAuth>} />
            <Route path="/reference" element={<RequireAuth><References /></RequireAuth>} />
            <Route path="/progress" element={<RequireAuth><Progress /></RequireAuth>} />
            <Route path="/day/:date" element={<RequireAuth><DayDetail /></RequireAuth>} />
            <Route path="/textbook" element={<RequireAuth><Textbook /></RequireAuth>} />

            {/* 로그인 / 게시판 / 대시보드 */}
            <Route path="/login" element={<Login />} />
            <Route path="/board" element={<RequireAuth><Board /></RequireAuth>} />
            <Route path="/board/:id" element={<RequireAuth><BoardDetail /></RequireAuth>} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />

            {/* 관리자(강사) 전용 — 수업일정표(학생 비공개)·자료실·페어링 시간표 */}
            <Route path="/schedule" element={<RequireAdmin><Schedule /></RequireAdmin>} />
            <Route path="/subjects" element={<RequireAdmin><Subjects /></RequireAdmin>} />
            <Route path="/admin" element={<RequireAdmin><AdminShell><Admin /></AdminShell></RequireAdmin>} />
            <Route path="/admin/teams" element={<RequireAdmin><AdminShell><AdminTeams /></AdminShell></RequireAdmin>} />
            <Route path="/admin/schedule" element={<RequireAdmin><AdminShell><AdminSchedule /></AdminShell></RequireAdmin>} />
            <Route path="/admin/evaluate" element={<RequireAdmin><AdminShell><AdminEvaluate /></AdminShell></RequireAdmin>} />
            <Route path="/admin/main" element={<RequireAdmin><AdminShell><AdminDashboard /></AdminShell></RequireAdmin>} />
            <Route path="/admin/students" element={<RequireAdmin><AdminShell><AdminStudents /></AdminShell></RequireAdmin>} />
            {/* 알 수 없는 경로는 홈으로 정규화(주소창에 죽은 URL 남지 않게) */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
