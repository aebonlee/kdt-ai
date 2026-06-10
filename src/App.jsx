import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import Subjects from './pages/Subjects'
import Schedule from './pages/Schedule'
import DayDetail from './pages/DayDetail'
import Prep from './pages/Prep'
import PrepDetail from './pages/PrepDetail'
import Lectures from './pages/Lectures'
import TeamProject from './pages/TeamProject'
import References from './pages/References'
import Progress from './pages/Progress'
import Login from './pages/Login'
import Board from './pages/Board'
import BoardDetail from './pages/BoardDetail'
import Dashboard from './pages/Dashboard'
import RequireAuth from './components/RequireAuth'

export default function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <ScrollToTop />
      <Header />
      <main style={{ flex: 1 }}>
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
      </main>
      <Footer />
    </div>
  )
}
