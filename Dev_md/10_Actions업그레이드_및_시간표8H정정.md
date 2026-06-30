# 10. GitHub Actions 업그레이드 · 시간표 8H 정정

작업일: 2026-06-30
대상: `.github/workflows/deploy.yml`, `src/data/curriculum.js`,
`src/data/lectureperiods.js`, `src/data/lectureplans.js`, `src/pages/Lectures.jsx`

---

## 1. GitHub Actions Node 20 deprecation 경고 정리

배포 로그의 `Node.js 20 is deprecated` 경고 해소 — 모든 액션을 Node 24 런타임
대응 최신 메이저로 올리고, 빌드 Node도 22 LTS로 상향.

| 액션 | 변경 |
|---|---|
| `actions/checkout` | v4 → **v5** |
| `actions/setup-node` | v4 → **v6** |
| `actions/configure-pages` | v5 → **v6** |
| `actions/upload-pages-artifact` | v3 → **v5** |
| `actions/deploy-pages` | v4 → **v5** |
| `node-version` | 20 → **22** (LTS) |

> 각 액션 최신 메이저는 GitHub API(`releases/latest`)로 실재 확인 후 반영.

## 2. 시간표 8H 표준 정정

"모든 시간표는 9시부터 50분 단위 8시간" 기준으로, 09번에서 **5H**로 넣었던
팀빌딩·Git(07/14) 일정을 **표준 8H(09:00~17:50, 교시당 50분)** 로 정정.

- `curriculum.js`: `git` 과목의 `hours: 5` 필드 제거(전 일정 8H 통일)
- `lectureperiods.js`: `git-1` 8교시 시간표 추가 → 표준 교시 테이블로 렌더
- `lectureplans.js`: `git-1` 강의안을 8교시(+점심) 8H로 확장
- `Lectures.jsx`: 시간 라벨 5H 분기 제거 → 항상 `09:00~18:00 (8H)`

### git-1 8교시 구성
1 OT·팀빌딩 · 2 버전관리/Git 설치 · 3 Git 기본(add·commit·log) ·
(점심) · 4 .gitignore·되돌리기 · 5 브랜치·머지 · 6 충돌 해결 실습 ·
7 GitHub 원격(clone·push·pull) · 8 PR·코드리뷰 팀 실습

---

## 검증

- `npm run build` 정상 통과
- 데이터: `git.hours` 제거 확인, `git-1`/`transformer-1`/`transformer-2` 모두 8교시 시간표 보유
- 신규/기존 전 일정이 동일한 50분 단위 8H 교시표로 표시됨
