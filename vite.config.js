import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 커스텀 도메인(skala.dreamitbiz.com)에 배포하므로 base 는 루트('/').
// CNAME 은 public/ 에 두어 빌드 시 dist/ 로 복사되도록 한다.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        // 자주 바뀌지 않는 외부 라이브러리를 별도 청크로 분리(캐시 효율↑, 초기 청크↓)
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
})
