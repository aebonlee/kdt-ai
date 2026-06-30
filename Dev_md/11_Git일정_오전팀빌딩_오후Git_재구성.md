# 11. Git 일정(07/14) — 오전 팀빌딩 · 오후 Git 재구성

작업일: 2026-06-30
대상: `src/data/lectureperiods.js`, `src/data/lectureplans.js`, `src/data/curriculum.js`

---

## 변경

07/14 일정(8H)을 **오전 3교시=팀빌딩 / 오후 5교시=Git** 으로 명확히 분리.

| 교시 | 시간 | 구분 | 내용 |
|---|---|---|---|
| 1 | 09:00~09:50 | 팀빌딩 | OT · 과정 소개 · 아이스브레이킹 |
| 2 | 10:00~10:50 | 팀빌딩 | 팀 구성 · 역할 정하기 |
| 3 | 11:00~11:50 | 팀빌딩 | 팀 그라운드룰 · 협업 목표 설정 |
| — | 12:00~13:00 | — | 점심 |
| 4 | 13:00~13:50 | Git | 버전관리 개념 · Git 설치/설정 |
| 5 | 14:00~14:50 | Git | Git 기본: add·commit·status·log |
| 6 | 15:00~15:50 | Git | .gitignore · diff · 커밋 되돌리기 |
| 7 | 16:00~16:50 | Git | 브랜치 · 머지 · 충돌 해결 |
| 8 | 17:00~17:50 | Git | GitHub 원격: clone·push·pull · PR |

- `lectureperiods.js` git-1: 교시 배열을 3+5로 교체(렌더되는 교시표)
- `lectureplans.js` git-1: 강의안 schedule 동기화
- `curriculum.js` git day contents: `[오전·팀빌딩]`/`[오후·Git]` 태그로 학습내용 정리

> 이전(10번)에는 팀빌딩이 1교시에만 있었으나, 오전 3시간 전체를 팀빌딩으로 확대.

---

## 검증

- `npm run build` 정상 통과
- git-1 교시표 오전(1~3) 팀빌딩 · 오후(4~8) Git 확인
