# CLAUDE.md — SKALA 4기 학습사이트

SKALA(SK AI Leader Academy) 4기 **이애본 강사** 학습 플랫폼. 담당 18과목 강의안 + 담당일정 외 11과목 + 실습교재 산출물 3종을 단일 데이터 소스에서 생성한다.
- 라이브: https://skala.dreamitbiz.com (main 푸시 → GitHub Actions 자동배포, 스모크 게이트)
- 스택: React18 + Vite5 + react-router. Tailwind 없음 — `src/index.css` 단일 디자인시스템(CSS 변수, 라이트/다크).

## 명령
| 명령 | 역할 |
|---|---|
| `npm run dev` / `build` | predev/prebuild가 **split-lectures + build-textbook --web** 자동 실행 |
| `npm run smoke` | 15검사(데이터 정합·산출물) — **CI에서 실패 시 배포 차단**. 콘텐츠 수정 후 필수 |
| `npm run textbook` | A4 PDF 교재 재생성(Chrome 헤드리스) → `dist-textbook/SKALA_4기_실습교재_이애본.pdf` |
| `node scripts/merge-additions.mjs` | 실습예제 병합 → `lectureexamples3.js` |
| `node scripts/merge-quizzes.mjs` / `merge-otherdeep.mjs` | 퀴즈 / 담당일정 외 심화 병합(이어붙이기, 기존은 `*_000_base.mjs` 시드로 보존) |
| `SKALA_SCRATCH_DIR` env | merge 스크립트 입력 폴더 오버라이드(세션 scratchpad 경로 하드코딩 대체) |

## 데이터 구조 (진실원본 — 여기만 편집)
- `src/data/curriculum.js` — 과목 18(subjects) + 담당 세션 48(sessions). **일정 변경은 여기**
- `src/data/lecture*.js` 6종 — 강의안 본문(subjectId-day 키, 42키 정합 필수). `scripts/split-lectures.mjs`가 `src/data/lectures/<id>.js`(gitignore) 생성
- `src/data/lectureexamples{,2,3}.js` — 실습예제 3층(`examplesFor`가 병합). **3은 자료 그라운딩 전용, merge-additions 생성물이므로 직접 수정 금지**(scratchpad cluster 재병합)
- `src/data/exams.js` / `quizzes.js` — 담당 평가기준 12과목 / 퀴즈 18과목 148문항. `otherexams.js` — 담당외 참고용 평가기준 6과목(스모크 기준 12+6=18)
- `src/data/othercontent.js` + `otherdeep.js` + `othersessions.js` — 담당일정 외 11과목(요약·심화·4트랙 일정 73일)
- `src/data/adminschedule.js` — 관리자 전용 페어링 시간표(48건, 반별 시간표_F 260710 판독 생성물). 8/20은 정동엽 대타(`substitute`)·담당 유지
- `/schedule` 수업일정표는 **학생 비공개(RequireAdmin)** — 공개 내비에 다시 넣지 말 것(대표 지시 2026-07-14)
- 생성물(gitignore): `src/data/lectures/`, `public/practice-textbook.html`, `dist-textbook/`

## 콘텐츠 작성 규칙 (엄수)
1. **SK 교재 원문 verbatim 금지** — 반드시 우리말 재서술(저작권). 근거 자료: `/Volumes/aebon - 데이터/skala-4/` (새 자료는 날짜별 폴더로 추가됨 — 보이면 신규분으로 분석·반영)
2. 왕초보 실습중심 · **전 코드라인 한글 주석**(사이트가 녹색 표기)
3. 코드 문자열: 리터럴 `<` `>` `&` 사용(HTML 엔티티 쓰면 이중 이스케이프), **백틱·`${}` 금지**, 파이썬 문자열 개행은 `\\n`
4. 예제 10~30줄, note는 근거·직관 2~3문장. quiz choice는 4지선다·0기준 인덱스
5. '미배정' 같은 내부 용어 금지 — 학습자 언어("참고자료", "담당일정 외 강의내용 학습 자료")

## 에이전트 활용 패턴 (검증된 파이프라인)
대량 자료 그라운딩은 **과목 클러스터별 병렬 에이전트**로:
1. 원자료 추출: PDF `pdftotext -enc UTF-8`, xlsx는 python zipfile+sharedStrings, pptx는 python-pptx → scratchpad
2. 클러스터당 에이전트 1개(4~5개 병렬): 원문 txt + 기존 사이트 데이터(중복 방지) 읽고 → **scratchpad에 `export const add = {...}` .mjs 파일로 저장 + node import 자체 검증**까지 시키기 (본문으로 받으면 이스케이프 사고남)
3. 병합: merge-* 스크립트(형식 검증 내장) → 빌드 → `npm run smoke`
4. 검증: 헤드리스 Chrome 스크린샷(퍼페티어 캐시 `~/.cache/puppeteer/chrome/*/Google Chrome for Testing`)으로 실렌더 확인 — 모바일은 scrollWidth 측정(주의: 헤드리스 최소 뷰포트 500px)
- 에이전트 프롬프트에 반드시: 리터럴 `<>&`·백틱 금지 규칙, 저장 경로, 검증 명령, "기존과 중복 금지 + 근거 보고"

## 스킬·검증 습관
- UI 변경 → 헤드리스 스크린샷(라이트/다크/모바일 390px)으로 확인 후 배포. 데스크톱 실기기 확인은 대표님 몫(빌드·커밋·푸시·배포까지가 Claude 담당)
- 배포 확인: `gh run list --limit 1` / `gh run watch <id> --exit-status`
- 워크플로 원칙: **작업 완료 = Dev_md 문서화 + 커밋 + 푸시 세트** (Dev_md 32편, 커밋 메시지 한국어·상세)
- claude.ai 웹 뷰어 아티팩트: `dist-textbook/textbook-web.html`을 같은 대화에서 재발행하면 동일 URL 유지

## 주의사항
- 실라버스·배정표 원본 구글시트는 **AI 접근 차단** — 스크린샷 판독으로 처리(배정표 변경 시 재수령 → othersessions.js)
- `.env.local` 없으면 로컬 로그인 깨짐 → 형제 리포(chosun 등)의 Supabase anon key 복사
- 실습교안 gzip 크기 모니터링(현 606KB, ~700KB 도달 시 과목 분할 검토)
- Supabase 단일 프로젝트 공유(hcmgdztsgjvzcyxyayaj) — 분리 제안 금지, skala_ 접두사 테이블

## 다음 작업 후보 (대기 중 — 어느 세션이든 이어받기)
1. **평가기준 6과목 반영** — git·vue·spring-ai·modeldev·langchain·serving 평가양식이 들어오면 exams.js 추가(2026-07-14 수령분에도 없음 — 담당외 6과목은 otherexams.js로 반영 완료, 담당 12과목은 최신본과 정합 검증 완료). 타 강사판 평가안 3건(feature 이은호, prompt·transformer 박병선) 병기 여부는 대표 결정 대기
2. **새 강의 자료 반영** — skala-4 폴더의 **날짜별 새 폴더** 발견 시: 추출 → 클러스터 에이전트 → merge-additions → smoke → 배포 (위 '에이전트 활용 패턴' 그대로)
3. **배정표 변경 반영** — 새 배정표 스크린샷 수령 시 판독 → `othersessions.js` 갱신(담당 일정 변경이면 curriculum.js sessions도)
4. 실습교안 gzip ~700KB 도달 시 과목별 분할 로드 / CI에 접근성 자동검사(axe) 추가 검토
