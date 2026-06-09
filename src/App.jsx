import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import Subjects from './pages/Subjects'
import Schedule from './pages/Schedule'
import DayDetail from './pages/DayDetail'

export default function App() {
  return (
    <div className="flex min-h-screen min-w-[320px] flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/day/:date" element={<DayDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
