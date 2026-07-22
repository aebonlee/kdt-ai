# 55. 실습교수 보충자료 분리 — React 실습교안에 복원

날짜: 2026-07-22

## 배경 — 강의안과 실습교안이 같아진 문제

iframe→React 전환(9d5a45a) 과정에서 실습교안(`Textbook.jsx`)이 학습강의안(`Lectures.jsx`)과 **동일 구성**이 됐다(코드 주석에도 "학습강의안과 동일 구성"). 대표 지적: 인쇄용 실습교안은 강의안에 **추가 요소**가 있어야 했다.

이전 실습교안(정적 `practice-textbook.html`, `build-textbook.mjs` 산출물)과 대조하니, 콘텐츠는 같은 강의 데이터에서 뽑아 거의 동일했고 **유일한 실질 차이가 🧩 실습교수 보충자료 분리**였다(Dev_md 53 A안). PDF 빌드는 분리하는데 React 화면은 안 해서 강의안과 구분이 사라졌던 것.

## 한 일 — origin:'practice' 분리를 React에도 이식

`build-textbook.mjs`의 `renderPracticeSupplement` 로직을 React로 이식. **화면 데이터·강의안(/lectures)은 손대지 않았다** — 실습교안에서만 분리.

1. **신규 `src/components/PracticeSupplement.jsx`** — 제목 "🧩 실습교수 보충자료" + 출처 한 줄(`source`, 관리자용 메타) + 개념(concepts) + 따라하기 실습(examples). Textbook·EtcCourse 공용.
2. **`Textbook.jsx`** (담당 과목)
   - `isPractice`/`notPractice` 헬퍼 추가
   - 본문 실습예제(`codeExamples`)에서 `origin:'practice'` 제외
   - 과목 말미(days 루프 뒤)에 전 일차 practice 예제를 모아 `PracticeSupplement` 렌더
3. **`EtcCourse.jsx`** (담당일정 외 과목)
   - 핵심개념·따라하기실습에서 practice 제외(`mainConcepts`/`mainExamples`)
   - 따라하기 실습 뒤에 practice 개념+예제를 `PracticeSupplement`로 렌더

## 검증

- `npm run build` 통과 (3.11s)
- 데이터 정합성(vite-node **리터럴 import** — 변수 동적 import는 vite-node가 "Unknown variable dynamic import"로 거부하니 주의):
  - 담당: git 예제 24=본문 22+보충 2 ✓ / python 57=52+5 ✓ / prompt 28=25+3 ✓
  - etc: htmlcss 예제 보충 2 / stats 개념 보충 4·예제 보충 4
  - 합계 **20건** = Dev_md 53 "총 20건" 일치, 각 과목 본문+보충=전체(중복 0)

## 남은 일

- (이월) docs.js `ref` 필드 도입 여부 · 김영희 주강사/실습교수 최종 확인
- 대표 화면 확인(라이트/다크에서 보충자료 소절 가시성)
