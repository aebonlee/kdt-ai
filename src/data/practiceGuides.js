// 종합실습 안내(임성열 강사 배포본) — 담당 분반 학생에게 그대로 제공.
// 근거: 임성열 강사 배포 실습소스 llm_code (practice_0 프롬프트 · practice_1-1 LSTM ·
//       practice_1-2 Transformer · practice_2 CrewAI 에이전트) — 판교 4층 2반 2026-07-23~24.
// subjectId(마지막 날) 기준으로 Lectures 페이지 복습퀴즈 위에 노출된다.
export const practiceGuides = {
  transformer: {
    title: '종합실습 안내 — LLM과 Transformer 아키텍처',
    source: '임성열 강사 배포본 · 판교 4층 2반 (2026-07-23~24)',
    intro:
      '아래 실습 노트북을 바탕으로 딥러닝(LSTM)에서 Transformer, 그리고 LLM 에이전트까지 직접 실행하며 구조를 이해합니다. **개인 과제는 개인코드 3종을 실행해 1페이지 보고서로 제출**하고, **팀 과제는 CrewAI로 에이전트 팀을 구성해 개발**합니다.',
    files: [
      { label: 'practice_1-1.ipynb — LSTM 문장 생성(개인 1)', href: '/materials/practice_1-1.ipynb' },
      { label: 'practice_1-2.ipynb — Transformer(GPT-2) 문장 생성(개인 2)', href: '/materials/practice_1-2.ipynb' },
      { label: 'practice_0.ipynb — 프롬프트 실습 CoT·SC·ReAct(개인 3)', href: '/materials/practice_0.ipynb' },
      { label: 'practice_2.CrewAI_Agent_System.ipynb — 에이전트 팀 개발(팀)', href: '/materials/practice_2.CrewAI_Agent_System.ipynb' },
      { label: 'requirements-llm.txt · requirements-prompt.txt — 실습 환경', href: '/materials/requirements-llm.txt' },
      { label: 'paper-attention.pdf — 원논문 "Attention Is All You Need"', href: '/materials/paper-attention.pdf' },
    ],
    groups: [
      {
        h: '■ 개인 과제 — 개인코드 3종 실행 후 1페이지 보고서 (개인 제출)',
        note: '아래 3개 노트북을 순서대로 실행하고, 관찰한 내용을 자신의 말로 1페이지(1~2p) 보고서로 정리합니다. 코드를 새로 짜는 것이 아니라 정상 실행 + 결과 해석이 핵심입니다.',
        items: [
          '① LSTM 문장 생성 (practice_1-1) — PyTorch(nn·optim)로 LSTM을 학습해 문장을 생성하고, 문장이 길어질 때 앞 문맥이 흐려지는 장기 의존성 한계를 직접 관찰합니다.',
          '② Transformer 문장 생성 (practice_1-2) — 사전학습 GPT-2(transformers)로 같은 과제를 다시 생성해, ①의 LSTM 결과와 무엇이 어떻게 달라졌는지(자연스러움·문맥 유지) 비교합니다.',
          '③ 프롬프트 실습 (practice_0) — "Attention Is All You Need" 논문을 RAG로 불러와, 세 가지 주제 프롬프트를 CoT(단계적 사고) → SC(자기 일관성 검증) → ReAct(추론+행동) 흐름으로 실행하고 응답 차이를 관찰합니다.',
        ],
        after: '보고서(1페이지) 필수 포함: (1) LSTM vs Transformer 생성 결과 비교와 그 차이의 이유(장기 의존성·Self-Attention 관점) / (2) 프롬프트 기법(CoT·SC·ReAct)이 응답 품질에 준 영향 / (3) 세 실습에서 확인한 한계와 향후 개선 방향. 캡처(생성 문장·응답)를 근거로 첨부합니다.',
      },
      {
        h: '■ 팀 과제 — CrewAI 에이전트 팀으로 개발 (팀 제출)',
        note: 'practice_2를 기반으로, LLM 에이전트 여러 개를 역할로 나눠 협업시키는 팀을 구성해 하나의 산출물을 만들어 냅니다. 데모를 그대로 제출하지 말고 팀이 정한 시나리오(주제·목표)에 맞게 role·goal·Task를 변형합니다.',
        items: [
          '에이전트 구성 (practice_2) — Agent(role·goal·backstory) 여러 개를 정의하고 Task·Crew로 묶어 순차/협업 파이프라인을 만듭니다. 예제는 기획자 → 작성자 → 편집자 3인 협업 구조입니다.',
          '시나리오 기획 — 우리 팀이 만들 서비스가 누구에게(이해관계자) 어떤 가치를 주는지, 왜 에이전트를 그렇게 나눴는지를 설계합니다.',
          '실행·검증 — Crew를 실행해 각 Task의 output과 최종 결과(CrewOutput)를 확인하고, 수업 개념(토큰화·임베딩·Self-Attention·자기회귀 생성 등) 중 최소 1개를 설계와 연결해 설명합니다.',
        ],
        after: '발표자료(최소 3페이지): 1p 시나리오·Biz 가치 / 2p 에이전트·Task 설계 근거 / 3p 실행 결과와 수업개념 반영. 팀 편성은 좌석표 기준(6인석 → 3+3, 4인석 → 4인).',
      },
    ],
    deadline: '개인 보고서 제출마감: 7.26(일) 밤 12시 정각 전 (24:00 이전)',
    submit:
      '제출: 슬랙 2반 종합실습 안내글 스레드에 댓글로 — (개인) 1페이지 보고서 + 실행 코드/캡처, (팀) 에이전트 구현 코드 + 발표자료. 파일명 예: Transformer_2반_홍길동. ※ API 키는 각자 .env에 본인 키로 설정(코드·제출물에 키를 포함하지 않습니다).',
  },
}
