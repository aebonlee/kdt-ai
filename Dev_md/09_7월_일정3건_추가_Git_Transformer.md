# 09. 7월 일정 3건 추가 — Git · LLM/Transformer

작업일: 2026-06-30
대상: `src/data/curriculum.js`, `src/data/course.js`, `src/pages/Lectures.jsx`,
강의안 6개 데이터 파일(`lectureperiods·concepts·details·examples·plans·theory`)

---

## 배경

SK 추가 통보로 7월에 일정 **3건(5일)** 이 신설되어, 일정·학습내용을 함께 반영했다.
교육기간 시작일도 **07/15 → 07/14** 로 당겨졌다(엑셀 원본 `7/14(화) ~ 11/05` 기준).

| 날짜 | 지역/층 | 과목 | 비고 |
|---|---|---|---|
| 07/14(화) | 판교 5층 | 팀빌딩 · Git 이해/활용 | 5H 과정 시작일 |
| 07/21(화)~22(수) | 판교 4층 | LLM과 Transformer 아키텍처 | 분반 1 (Day1-2) |
| 07/23(목)~24(금) | 판교 5층 | LLM과 Transformer 아키텍처 | 분반 2 (Day1-2) |

> Transformer는 두 분반에 동일 강의안으로 2회 진행 → `klass`(층)로 분반 구분.
> 07/14는 팀빌딩이 더해진 **5시간** 단축일(09:00~15:00).

---

## 1. 신규 과목 2개 (`curriculum.js` · `subjects[]`)

| id | code | 과목명 | 일수 | 카테고리 | 비고 |
|---|---|---|---|---|---|
| `git` | 1-1 | Git 이해/활용 | 1 | 프로그래밍 기초 | `hours: 5` 필드 추가 |
| `transformer` | 8-2 | LLM과 Transformer 아키텍처 | 2 | LLM · Agent | |

- `git` 과목에 옵션 필드 `hours: 5` 도입 → `Lectures.jsx` 시간 라벨이 5H면 `09:00~15:00`로 표시.

## 2. 일정(sessions) 5건 추가

7월 블록을 3일 → **8일**로 확장:

```
07/14 판교5층 git Day1   (신규)
07/15 울산   python Day1
07/16 울산   python Day2
07/21 판교4층 transformer Day1  (신규·분반1)
07/22 판교4층 transformer Day2  (신규·분반1)
07/23 판교5층 transformer Day1  (신규·분반2)
07/24 판교5층 transformer Day2  (신규·분반2)
07/31 판교5층 vue Day1
```

- 판교 4층=틸(`pangyo3`), 5층=인디고(`pangyo`)로 두 분반이 색상으로도 구분됨.
- `totalSessions`(43→**48**) 등 카운트는 `sessions`에서 동적 산출 → Home·Progress·Dashboard 자동 갱신.

## 3. 학습내용(강의안) 채움

신규 day-키 `git-1`, `transformer-1`, `transformer-2` 를 6개 파일에 보강:

| 파일 | 내용 | git-1 | transformer-1/2 |
|---|---|---|---|
| `lectureplans` | 시간표·실습 | ✅(5H) | ✅ |
| `lectureperiods` | 교시 시간표 | —(5H라 plan 폴백) | ✅ |
| `lectureconcepts` | 핵심 개념 | 6개 | 각 6개 |
| `lecturedetails` | 상세항목·Lab·과제 | ✅ | ✅ |
| `lectureexamples` | 실습 코드 | 2 | 각 2 |
| `lecturetheory` | 심화 이론·실전 소스 | ✅ | ✅ |

- Git: 버전관리 개념 → add/commit/branch/merge/충돌 → GitHub PR 협업, 충돌 해결 실전 코드.
- Transformer: 토큰화·임베딩 → RNN 한계 → Self-Attention(Q·K·V) → Multi-Head·PE·잔차·LayerNorm → BERT/GPT·사전학습·스케일링. NumPy Attention·PyTorch 인코더 블록·HuggingFace 추론 예제.

## 4. 기간 표기 정정

- `course.js` range `07.15 → 07.14 ~ 10.28`
- `curriculum.js` 헤더 주석 교육기간 `07.14` 로 수정

---

## 검증

- `npm run build` 정상 통과
- 데이터 정합성: 총 **48세션** / 7월 8일 / 신규 세션 요일·과목·Day 매핑 오류 0건
- 신규 day-키 6개 파일 충족 확인(plan·concepts·details·examples·theory, periods는 transformer만)
