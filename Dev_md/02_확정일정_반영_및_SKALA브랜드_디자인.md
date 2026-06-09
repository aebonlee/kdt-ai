# 02. 확정 일정 반영 & SKALA 브랜드 디자인 전환

## 1) 담당 강의 일정 확정 (이애본 강사)
- 기준: SKALA 4기 확정표에서 **"확정" 행 중 비고(기타) 열에 동그라미(o) 표시된 일자 = 담당 강의일**
  - 제외 행에는 o 없음 / 확정이어도 o 없으면 타 강사
- 결과: **37개 강의일, 12개 과목** (교육기간 2026.07.14~11.05)
- **광주는 별도 분반** → `region`(판교/광주)·`klass`(반)로 데이터 구분, UI에서 색·필터로 분리 표시
  - 판교 3·4반 / 광주 1반

### 담당 과목 (첫 강의일 순)
Prompt 설계와 Context Engineering · Front-Framework: Vue.js · Spring AI · sLLM 구현 및 Fine Tunning ·
머신러닝 및 딥러닝 이해 · RAG Pipeline 설계 및 구축 · 생성형 AI 서비스 개발(LangChain) ·
모델 서빙 및 AIOps 구성 · AI Agent 설계 및 구축(LangGraph) · Vector DB · AI Agent Capstone · AI 서비스 개발 Mini-project

- 각 과목은 `days[]`(일차별 학습목표·학습내용) 보유, 각 강의일(`sessions[]`)이 (날짜·요일·지역·반 + day) 로 연결

## 2) 디자인: data 사이트 형태 + SKALA 브랜드
- 레이아웃: `data.dreamitbiz.com` 의 **Editorial Navy** 구조 이식
  (eyebrow 라벨, 대형 타이틀, 메트릭 패널, 카드 그리드, page-header, 푸터)
- Tailwind 제거 → 단일 `src/index.css` 디자인 시스템(CSS 변수)으로 전환
- 컬러: **SKALA 공식 브랜드** — 딥 인디고 `#0E1152`, 액센트 `#3F51FF`, 그라데이션 `#6C4DFF→#3F51FF`, 라이트 `#ACBEFF`
- **라이트 모드 기본 + 다크 모드 토글**(공식 SKALA 딥 인디고 룩). `localStorage('skala-theme')` 유지, 깜빡임 방지 init 스크립트
- **SKALA 공식 로고 사용**: `public/brandLogo.png`(헤더 인디고 칩 안 + 푸터), `favicon.ico`, OG 이미지 인디고 브랜드로 재생성

## 3) 화면
- 홈: 히어로 + 메트릭(37일/12과목/2지역) + 담당 과목 카드
- 과목별: 과목 단위로 일자 묶음(지역·반 칩 구분)
- 일정: 월별 타임라인 + **지역(분반) 필터(전체/판교/광주)**
- 일자별 상세: 학습목표·학습내용 + 이전/다음

## 검증
- `npm run build` 성공 (44 modules)
- dist 에 brandLogo/favicon/og/CNAME 포함 확인
