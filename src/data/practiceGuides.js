// 종합실습 안내 — 분반·담당교수별로 별개 키. 담당 분반 학생에게 그대로 제공.
// 근거: 임성열 강사 배포 실습소스 llm_code (practice_0 프롬프트 · practice_1-1 LSTM ·
//       practice_1-2 Transformer · practice_2 CrewAI 에이전트) — 판교 4층 2반 2026-07-23~24.
// subjectId(마지막 날) 기준으로 Lectures 페이지 복습퀴즈 위에 노출된다.
export const practiceGuides = {
  // ── 7반(판교 5층·박병선 전임교수, 2026-07-21~22) — 미니모델 체험형 ──
  transformer: {
    title: '종합실습 안내 — LLM과 Transformer 아키텍처',
    source: '박병선 전임교수 배포본 기준',
    intro: '아래 코드(첨부 노트북·데이터)를 바탕으로 Transformer 구조를 이해해 봅니다.',
    files: [
      { label: '종합실습_LLM과_Transformer_아키텍처_언어모델.ipynb', href: '/materials/transformer_minimodel_practice.ipynb' },
      { label: 'input_kr.txt (학습용 코퍼스)', href: '/materials/input_kr.txt' },
    ],
    groups: [
      {
        h: '■ 조별 Activity — baseline 개선 실험 & 발표 (마감 16:30)',
        note: '아래 개선 후보 리스트를 참고하여 2가지 이상 조별로 적용해 봅니다.',
        items: [
          '모델 크기 — n_layer · n_head · n_embd 를 줄이거나 늘려보기 (GPTConfig 셀) · "작은 모델도 문장을 외울까?"',
          '학습 반복 수 — MAX_ITERS 를 100 / 500 / 2000 등으로 바꾸며 loss 곡선과 생성 문장 비교',
          '문맥 길이 (block_size) — 32 / 128 / 256 등으로 바꿔 짧은/긴 문맥이 생성 품질에 주는 영향 확인',
          '생성 파라미터 (temperature, top_k) — 낮추면 안정적·뻔한 문장, 높이면 다양한 문장. 트레이드오프 확인',
          '데이터 양 — corpus 전체 대신 절반만 잘라 학습, 데이터가 적을 때 특징(암기 vs 일반화) 비교',
          'causal mask 유무 비교 — Block 클래스의 CausalSelfAttention 을 SelfAttention 으로 바꿔 mask 영향 보기(미래를 미리 보면?)',
        ],
        after: '발표 형식(조당 5~10분): 무엇을 바꿨나(변수+값) / 예상 / 실제 결과(loss 곡선 스크린샷 + 생성 문장 before·after) / 해석(예상과 달랐던 부분과 이유)',
      },
      {
        h: '■ 개인 Activity — 1~2page 개발해석 보고서',
        note: '하기 내용을 1~2 page 로 작성합니다.',
        items: [
          'Transformer 구조 설명(자신의 말로) — 토큰화 → 임베딩 → Self-Attention → Causal Mask → Logits/Loss 흐름',
          '조별 실험 과정에서 내가 관찰한 것 — 우리 조가 바꾼 변수는 무엇이고 어떻게 달라졌나, 생성 결과에서 확인한 특징',
          '결과에서 확인한 한계',
          '향후 개선 방향과 그 이유 — 가능하면 다른 조 발표 내용을 최소 1개 인용해 비교',
        ],
      },
    ],
    deadline: '개인 제출마감: 7.26(일) 24:00',
    submit: '제출: 슬랙 7반 종합실습 안내글 스레드에 댓글로 보고서(1~2p) + (선택) 본인이 개선/추가 실험한 코드 파일. 파일명 예: Transformer_7반_홍길동',
  },
  // ── 2반(판교 4층·임성열 강사, 2026-07-23~24) — LSTM vs Transformer + CrewAI ──
  transformer2: {
    title: '종합실습 안내 — LLM과 Transformer 아키텍처',
    source: '임성열 강사 배포본 · 판교 4층 2반 (2026-07-23~24)',
    intro:
      '아래 실습 노트북을 바탕으로 딥러닝(LSTM)에서 Transformer, 그리고 LLM 에이전트까지 직접 실행하며 구조를 이해합니다.\n**개인 과제는 개인코드 3종을 실행해 1페이지 보고서로 제출**하고, **팀 과제는 CrewAI로 에이전트 팀을 구성해 개발**합니다.',
    files: [
      { label: 'practice_1-1.ipynb — LSTM 문장 생성(개인 1)', href: '/materials/practice_1-1.ipynb' },
      { label: 'practice_1-2.ipynb — Transformer(GPT-2) 문장 생성(개인 2)', href: '/materials/practice_1-2.ipynb' },
      { label: 'practice_0.ipynb — 프롬프트 실습 CoT·SC·ReAct(개인 3)', href: '/materials/practice_0.ipynb' },
      { label: 'practice_2.CrewAI_Agent_System.ipynb — 에이전트 팀 개발(팀)', href: '/materials/practice_2.CrewAI_Agent_System.ipynb' },
      { label: 'requirements-llm.txt — 실습1·2(LSTM·GPT-2·CrewAI) 환경', href: '/materials/requirements-llm.txt' },
      { label: 'requirements-prompt.txt — practice_0(프롬프트·RAG) 환경', href: '/materials/requirements-prompt.txt' },
      { label: 'paper-attention.pdf — 원논문 "Attention Is All You Need"', href: '/materials/paper-attention.pdf' },
    ],
    groups: [
      {
        h: '■ 개인 과제 — 개인코드 3종 실행 후 1페이지 보고서 (개인 제출)',
        note: '아래 3개 노트북을 순서대로 실행하고, 관찰한 내용을 자신의 말로 1페이지(1~2p) 보고서로 정리합니다.\n코드를 새로 짜는 것이 아니라 정상 실행 + 결과 해석이 핵심입니다.',
        items: [
          '① LSTM 문장 생성 (practice_1-1) — PyTorch(nn·optim)로 LSTM을 학습해 문장을 생성하고, 문장이 길어질 때 앞 문맥이 흐려지는 장기 의존성 한계를 직접 관찰합니다.',
          '② Transformer 문장 생성 (practice_1-2) — 사전학습 GPT-2(transformers)로 같은 과제를 다시 생성해, ①의 LSTM 결과와 무엇이 어떻게 달라졌는지(자연스러움·문맥 유지) 비교합니다.',
          '③ 프롬프트 실습 (practice_0) — "Attention Is All You Need" 논문을 RAG로 불러와, 세 가지 주제 프롬프트를 CoT(단계적 사고) → SC(자기 일관성 검증) → ReAct(추론+행동) 흐름으로 실행하고 응답 차이를 관찰합니다.',
        ],
        after: '보고서(1페이지) 필수 포함: (1) LSTM vs Transformer 생성 결과 비교와 그 차이의 이유(장기 의존성·Self-Attention 관점) / (2) 프롬프트 기법(CoT·SC·ReAct)이 응답 품질에 준 영향 / (3) 세 실습에서 확인한 한계와 향후 개선 방향.\n캡처(생성 문장·응답)를 근거로 첨부합니다.',
      },
      {
        h: '■ 팀 과제 — CrewAI 에이전트 팀으로 개발 (팀 제출)',
        note: 'practice_2를 기반으로, LLM 에이전트 여러 개를 역할로 나눠 협업시키는 팀을 구성해 하나의 산출물을 만들어 냅니다.\n데모를 그대로 제출하지 말고 팀이 정한 시나리오(주제·목표)에 맞게 role·goal·Task를 변형합니다.',
        items: [
          '에이전트 구성 (practice_2) — Agent(role·goal·backstory) 여러 개를 정의하고 Task·Crew로 묶어 순차/협업 파이프라인을 만듭니다.\n예제는 기획자 → 작성자 → 편집자 3인 협업 구조입니다.',
          '시나리오 기획 — 우리 팀이 만들 서비스가 누구에게(이해관계자) 어떤 가치를 주는지, 왜 에이전트를 그렇게 나눴는지를 설계합니다.',
          '실행·검증 — Crew를 실행해 각 Task의 output과 최종 결과(CrewOutput)를 확인하고, 수업 개념(토큰화·임베딩·Self-Attention·자기회귀 생성 등) 중 최소 1개를 설계와 연결해 설명합니다.',
        ],
        after: '발표자료(최소 3페이지): 1p 시나리오·Biz 가치 / 2p 에이전트·Task 설계 근거 / 3p 실행 결과와 수업개념 반영.\n팀 편성은 좌석표 기준(6인석 → 3+3, 4인석 → 4인).',
      },
    ],
    deadline: '제출마감 — 개인 보고서: 7.23(목) 밤 12시 정각 전(24:00) · 팀 과제: 7.24(금) 팀별 발표 후, 밤 12시 정각 전(24:00)까지 슬랙 제출',
    submit:
      '제출: 슬랙 2반의 전용 안내글 스레드에 댓글로 — (개인) 개인 과제 안내글에 1페이지 보고서 + 실행 코드/캡처, (팀) 팀 과제 안내글에 에이전트 구현 코드 + 발표자료.\n파일명 예: Transformer_2반_홍길동.\n※ API 키는 각자 .env에 본인 키로 설정(코드·제출물에 키를 포함하지 않습니다).',
  },
}
