# 03. 로그인(구글/카카오) · 게시판 · 대시보드 (Supabase)

## 구현 내용
- **로그인**: Supabase Auth OAuth — Google / Kakao. 게시판·대시보드만 로그인 필요(나머지는 공개)
- **게시판**: Q&A 게시판 + 공지사항(공지는 강사만 작성) + 댓글
- **대시보드**: 학습자(내 진도율·공지) + 강사 관리(학습자 수·평균 진도·학습자별 진도)
- **진도 동기화**: 학습관리(자가평가) 진도를 로그인 시 Supabase `skala_progress` 에 자동 upsert
- 코드: `contexts/AuthContext`, `components/{AuthButtons,RequireAuth}`, `pages/{Login,Board,BoardDetail,Dashboard}`, `data/db.js`, `config/admin.js`

## 연결 정보
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (anon 키는 공개용 → 클라이언트 노출 안전)
- 로컬: `.env.local` (gitignore). 배포: GitHub Actions repo secret + 워크플로 `env` 주입 완료

## ⚠️ 대표님이 직접 해야 하는 설정 (대시보드 권한 필요)

### 1) 테이블 생성
Supabase 대시보드 → **SQL Editor** → `supabase/schema.sql` 내용 붙여넣고 **Run**.
(skala_posts / skala_comments / skala_progress + RLS + 관리자 판별 함수)

### 2) 관리자(강사) 이메일 등록
- `src/config/admin.js` 의 `ADMIN_EMAILS`
- `supabase/schema.sql` 의 `skala_is_admin()` 함수
→ **두 곳 모두** 실제 강사 로그인 이메일로 교체. (수정 후 SQL 함수만 다시 Run)

### 3) OAuth 공급자 설정 (Supabase 대시보드 → Authentication → Providers)
- **Google**: 사용 설정 + Google Cloud OAuth Client ID/Secret 입력
- **Kakao**: 사용 설정 + 카카오 개발자센터 REST API 키/Client Secret 입력
- **Authentication → URL Configuration**:
  - Site URL: `https://skala.dreamitbiz.com`
  - Redirect URLs 에 `https://skala.dreamitbiz.com/**` 추가 (로컬 테스트 시 `http://localhost:5173/**` 도)
- 각 공급자 콘솔의 Redirect URI 에는 Supabase 콜백
  `https://hcmgdztsgjvzcyxyayaj.supabase.co/auth/v1/callback` 등록

### 4) 확인
- 위 설정 후 `/login` 에서 구글/카카오 로그인 → `/board`, `/dashboard` 이용 가능
- 강사 이메일로 로그인하면 상단에 "(강사)" 표시 + 강사 관리 대시보드 노출

## 동작(설정 전/후)
- 설정 전에도 사이트는 정상 동작(공개 페이지). 로그인 시도 시 안내 표시.
- 테이블 생성 전 게시판은 "불러오지 못했습니다" 안내 → SQL 실행 후 정상화.
