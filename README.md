# skala

**SKALA (SK AI Leader Academy) 4기 — 과목·일자별 학습 커리큘럼 뷰어**

AI 시대를 이끌어나갈 SK형 인재를 양성하는 실전형 AI 인재 프로그램. 4기 학습자에게 과목별·일자별 학습내용을 제공합니다.

- 배포: https://skala.dreamitbiz.com (GitHub Pages, `main` 푸시 시 Actions 자동배포)
- 스택: React 18 · Vite 5 · Tailwind CSS 3 · React Router 6 · (옵션) Supabase

## 교육 커리큘럼 Overview

| 항목 | 내용 |
|------|------|
| 교육 기간 | 2026년 7월 ~ 2026년 12월 |
| 교육 시간 | 평일 09:00 ~ 18:00 |
| 교육 형태 | 100% 오프라인 출석 필요 |

## 화면 구성

- **홈** (`/`) — 과정 개요 + 과목 미리보기
- **과목별** (`/subjects`) — 과목(모듈)별로 일자별 수업 묶어 보기
- **일정** (`/schedule`) — 주차별 타임라인
- **일자별 상세** (`/day/:date`) — 해당 날짜의 학습목표·내용·자료

## 개발

```bash
npm install
npm run dev      # 로컬 개발 서버
npm run build    # 프로덕션 빌드 (dist/)
```

## 커리큘럼 데이터

`src/data/curriculum.js` 의 `subjects`(과목), `sessions`(일자별 수업)를 수정합니다.
현재는 구조 확인용 **샘플** 데이터이며, 참고자료(아래)를 기준으로 실제 내용을 채웁니다.

## 참고자료 업로드

엑셀·이미지 등 참고자료는 [`reference/`](./reference) 폴더에 올립니다.
- `reference/excel/` — 일정표/커리큘럼 엑셀
- `reference/images/` — 시간표 캡처/안내 이미지

## OG(공유 미리보기) 이미지

`public/og.png` (1200×630, 다크 블루). 재생성:

```bash
npm i -D sharp           # 임시 설치
node scripts/make-og.mjs
npm un sharp
```
