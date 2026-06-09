import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 라우트 변경 시 스크롤을 상단으로 초기화
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
