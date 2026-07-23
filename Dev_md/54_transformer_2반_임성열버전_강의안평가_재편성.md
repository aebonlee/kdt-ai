# 2026-07-23 · Transformer(2반, 판교 4층) 강의안·평가 임성열 버전으로 재편성

## 배경
- 판교 4층 2반(2026-07-23~24) Transformer 과목 담당=임성열. 그러나 웹 강의안/평가안내가
  박병선(5층 7반, 7/21~22) charGPT 미니모델 버전으로 표기돼 있었음.
- 특히 exams.js 'transformer'.variant = "2026.07.22. 506~510 공통강의 담당 박병선 전임교수
  (미니모델 체험형 평가안내)" 문구가 오늘 강의안에 그대로 노출됨.

## 변경
- src/data/exams.js 'transformer': 박병선 미니모델 체험형(이해55/해석45) → 임성열 버전으로 교체.
  · 실습1: LSTM vs Transformer 문장생성 (1-1 LSTM 40 + 1-2 Transformer 60, 정상동작 중심)
  · 실습2: CrewAI 기반 LLM API 에이전트 (Biz가치 40 + 기술이해 30 + 수업충실 30)
  · notes에 개인별 점수·판단근거·보완사항 필수, 팀=좌석표(6인석→3+3,4인석→4) 명시.
  · 박병선 미니모델 안은 "7반(5층, 7/21~22) 별도 버전"으로 참고 보존.
- src/data/lectureplans.js transformer-1 practice: NumPy Self-Attention → 실습1(LSTM→Transformer,
  practice_1-1/1-2) 정확·기술 재작성(장기의존성·causal mask·QKV·N² 등).
- lectureplans.js transformer-2 practice: bigram→GPT-2 미니모델 → 실습2(CrewAI Agent/Task,
  practice_2) 재작성. day2 17시 실습 슬롯도 CrewAI로 수정.

## 검증/배포
- npm run build 통과(prebuild가 lectures/transformer.js 재생성). gh-pages 배포.
