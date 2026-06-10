import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import Subjects from './pages/Subjects'
import Schedule from './pages/Schedule'
import DayDetail from './pages/DayDetail'
import Prep from './pages/Prep'
import Lectures from './pages/Lectures'
import References from './pages/References'
import Progress from './pages/Progress'

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
          <Route path="/lectures" element={<Lectures />} />
          <Route path="/lectures/:date" element={<Lectures />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/reference" element={<References />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/day/:date" element={<DayDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
