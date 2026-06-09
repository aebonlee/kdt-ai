/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── SKALA 브랜드 팔레트 (기본: 다크 블루) ──
        // 1) navy   : 가장 진한 다크 블루 (배경/헤더)
        // 2) ocean  : 메인 블루
        // 3) azure  : 강조 블루 (버튼/링크)
        // 4) sky    : 밝은 블루 (하이라이트)
        // 5) amber  : 포인트 컬러 (CTA/액센트)
        navy: '#0A1F44',
        ocean: '#14346E',
        azure: '#2563EB',
        sky: '#38BDF8',
        amber: '#FBBF24',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
