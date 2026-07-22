// 종합실습 안내(전임교수 배포본) — 담당 분반 학생에게 그대로 제공.
// 근거: 박병선 전임교수가 판교 6반에 배포한 [실습안내]·[조별 Activity Guide]·[개인 Activity Guide]
//       (2026-07-22). 7반에도 동일 기준으로 제공한다.
// subjectId(마지막 날) 기준으로 Lectures 페이지 복습퀴즈 위에 노출된다.
export const practiceGuides = {
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
}
