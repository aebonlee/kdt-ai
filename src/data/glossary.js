// 부록: 용어사전 (LLM · Transformer · 에이전트 커리큘럼 전반)
// 표기 원칙: 한글표기(영문) + 정확한 정의. 강의안·실습교안과 용어 일관.
export const glossaryIntro =
  'LLM과 Transformer 아키텍처 및 실습에서 쓰이는 핵심 용어를 한글표기(영문)와 함께 정리했습니다. 강의안·실습교안과 동일한 용어를 사용합니다.'

export const glossary = [
  {
    h: '신경망·순환신경망 기초',
    terms: [
      { ko: '인공신경망', en: 'ANN, Artificial Neural Network', def: '가중치로 연결된 뉴런 층으로 입력을 출력에 매핑하며 학습하는 모델의 총칭.' },
      { ko: '순환신경망', en: 'RNN, Recurrent Neural Network', def: '이전 시점의 은닉 상태를 다음 시점으로 전달하며 순차 데이터를 처리하는 신경망.' },
      { ko: '장단기 기억', en: 'LSTM, Long Short-Term Memory', def: '입력·출력·망각 게이트로 정보를 조절해 RNN보다 긴 문맥을 유지하는 순환신경망. 그래도 매우 긴 문장에서는 앞부분 정보가 희석된다.' },
      { ko: '은닉 상태', en: 'Hidden State', def: '순환신경망이 시점마다 갱신·전달하는 내부 기억 벡터. 지금까지의 문맥을 요약해 담는다.' },
      { ko: '게이트', en: 'Gate', def: 'LSTM에서 정보를 얼마나 받아들이고(입력)·유지하고(망각)·내보낼지(출력) 0~1로 조절하는 장치.' },
      { ko: '장기 의존성 문제', en: 'Long-term Dependency', def: '문장이 길어질수록 앞부분 맥락이 뒤로 갈수록 흐려지는 순환신경망의 한계. Transformer 등장의 배경.' },
      { ko: '기울기 소실', en: 'Vanishing Gradient', def: '역전파에서 기울기가 점점 작아져 앞쪽 층·먼 시점이 잘 학습되지 않는 현상.' },
    ],
  },
  {
    h: 'Transformer 구조',
    terms: [
      { ko: '트랜스포머', en: 'Transformer', def: '순환 없이 셀프 어텐션으로 모든 토큰 관계를 한 번에 계산하는 아키텍처. 병렬화가 쉽고 장기 의존성을 구조적으로 해결한다.' },
      { ko: '셀프 어텐션', en: 'Self-Attention', def: '한 시퀀스 안에서 각 토큰이 다른 모든 토큰과의 관련도를 계산해 정보를 가중합하는 Transformer의 핵심 연산.' },
      { ko: '쿼리·키·값', en: 'Query·Key·Value (Q·K·V)', def: '입력을 세 벡터로 변환한 것. Query와 Key의 유사도로 가중치를 구하고 그 가중치로 Value를 합친다.' },
      { ko: '스케일드 닷-프로덕트 어텐션', en: 'Scaled Dot-Product Attention', def: 'QKᵀ를 √d_k로 나눠 스케일링한 뒤 softmax로 가중치를 만들어 V를 가중합하는 어텐션 계산식.' },
      { ko: '멀티-헤드 어텐션', en: 'Multi-Head Attention', def: '어텐션을 여러 헤드로 나눠 서로 다른 표현 부분공간을 동시에 보게 하는 방식. n_embd = n_head × head_dim.' },
      { ko: '위치 인코딩', en: 'Positional Encoding', def: '어텐션은 순서를 모르므로, 토큰 위치 정보를 임베딩에 더해 넣는 장치.' },
      { ko: '코잘 마스크', en: 'Causal Mask', def: '디코더(GPT)형에서 각 위치가 미래 토큰을 보지 못하도록 가리는 하삼각 마스크. 다음 토큰 예측의 정보 누수를 막는다.' },
      { ko: '잔차 연결', en: 'Residual Connection', def: '층의 입력을 출력에 그대로 더해 깊은 신경망의 학습을 안정화하는 연결.' },
      { ko: '층 정규화', en: 'Layer Normalization', def: '각 층에서 활성값 분포를 정규화해 학습을 안정·가속하는 기법.' },
      { ko: '피드포워드 신경망', en: 'FFN, Feed-Forward Network', def: '어텐션 뒤에서 각 토큰 표현을 독립적으로 비선형 변환하는 완전연결 층(예: 192→768→192).' },
      { ko: '인코더·디코더', en: 'Encoder·Decoder', def: '인코더는 마스크 없이 양방향 참조(BERT형), 디코더는 코잘 마스크로 과거만 참조(GPT형).' },
    ],
  },
  {
    h: '언어모델·토큰',
    terms: [
      { ko: '언어모델', en: 'Language Model', def: '앞선 토큰들로 다음 토큰의 확률분포를 예측하는 모델.' },
      { ko: '대규모 언어모델', en: 'LLM, Large Language Model', def: '방대한 텍스트로 학습한 대형 Transformer 언어모델. 프롬프트 기반으로 다양한 과업을 수행한다.' },
      { ko: '토큰화', en: 'Tokenization', def: '문장을 모델이 다루는 최소 단위(토큰)로 쪼개는 전처리.' },
      { ko: '서브워드 토큰화', en: 'Subword Tokenization (BPE 등)', def: '단어를 하위 조각으로 분리해 신조어·오탈자에도 유연하게 대응하는 토큰화 방식.' },
      { ko: '임베딩', en: 'Embedding', def: '토큰을 의미를 담은 고차원 실수 벡터로 변환한 것. 의미가 비슷할수록 공간상 가깝다.' },
      { ko: '다음 토큰 예측', en: 'Next-Token Prediction', def: '현재까지의 문맥으로 바로 다음 토큰을 맞히는 언어모델의 기본 학습·생성 방식.' },
      { ko: '자기회귀 생성', en: 'Autoregressive Generation', def: '한 토큰을 생성해 다시 입력에 붙이며 한 토큰씩 이어 문장을 만드는 방식.' },
      { ko: '로짓', en: 'Logits', def: 'softmax 이전의 각 토큰에 대한 원시 점수 벡터.' },
      { ko: '소프트맥스', en: 'Softmax', def: '로짓을 합이 1인 확률분포로 바꾸는 함수.' },
      { ko: '컨텍스트 윈도우', en: 'Context Window', def: '모델이 한 번에 참조할 수 있는 최대 토큰 길이. 연산량(N²) 때문에 현실적 한계가 있다.' },
      { ko: '퍼플렉서티', en: 'Perplexity', def: '언어모델이 다음 토큰을 얼마나 잘 맞히는지 나타내는 지표. 낮을수록 좋다.' },
    ],
  },
  {
    h: '학습·평가',
    terms: [
      { ko: '손실', en: 'Loss', def: '예측과 정답의 차이를 수치화한 값. 학습은 이 값을 줄이는 방향으로 진행된다.' },
      { ko: '교차 엔트로피', en: 'Cross-Entropy', def: '예측 확률분포와 정답 분포의 차이를 재는 분류·언어모델의 대표 손실함수.' },
      { ko: '경사하강', en: 'Gradient Descent', def: '손실의 기울기를 따라 파라미터를 조금씩 갱신해 손실을 낮추는 최적화.' },
      { ko: '이터레이션·에폭', en: 'Iteration·Epoch', def: '이터레이션은 배치 1회 학습 스텝, 에폭은 전체 데이터 1회 통과.' },
      { ko: '과적합', en: 'Overfitting', def: '학습 데이터에 지나치게 맞아 새 데이터 성능이 떨어지는 현상. 소량 데이터·과도한 학습에서 암기가 나타난다.' },
      { ko: '검증 손실', en: 'Validation Loss', def: '학습에 쓰지 않은 데이터로 잰 손실. 과적합 여부 판단의 핵심 지표.' },
      { ko: '일반화 격차', en: 'Generalization Gap', def: '검증 손실 − 학습 손실. 클수록 과적합 신호.' },
      { ko: '조기 종료', en: 'Early Stopping', def: '검증 손실이 최저인 시점에서 학습을 멈춰 과적합을 막는 기법.' },
    ],
  },
  {
    h: '생성 파라미터',
    terms: [
      { ko: '템퍼러처', en: 'Temperature', def: '생성의 무작위성 조절값. 낮으면(예 0.2) 확률분포가 뾰족해져 일관·안정, 높으면 다양·불안정.' },
      { ko: '탑-k 샘플링', en: 'Top-k Sampling', def: '확률 상위 k개 토큰만 후보로 남겨 샘플링. k가 작을수록 안전하지만 단조로워진다.' },
      { ko: '탑-p 샘플링', en: 'Top-p / Nucleus Sampling', def: '누적 확률이 p가 될 때까지의 토큰만 후보로 삼는 방식. temperature와는 보통 하나만 사용.' },
      { ko: '최대 토큰', en: 'max_tokens', def: '생성할 최대 토큰 수. 필요 이상으로 크게 잡으면 비용·지연이 늘어난다.' },
      { ko: '그리디·샘플링', en: 'Greedy·Sampling', def: '그리디는 매 스텝 최고 확률 토큰 선택(결정적), 샘플링은 확률적으로 선택(다양).' },
    ],
  },
  {
    h: '프롬프트·추론 기법',
    terms: [
      { ko: '프롬프트', en: 'Prompt', def: '모델에 주는 입력·지시문. 설계에 따라 응답 품질이 크게 달라진다.' },
      { ko: '프롬프트 엔지니어링', en: 'Prompt Engineering', def: '모델 구조를 바꾸지 않고 입력 설계만으로 추론 품질을 끌어올리는 기술.' },
      { ko: '시스템·유저 메시지', en: 'System·User Message', def: '시스템은 역할·규칙을 고정하고, 유저는 실제 요청을 담는 대화 구성 요소.' },
      { ko: '인컨텍스트 러닝', en: 'In-Context Learning', def: '가중치 갱신 없이 프롬프트 안의 예시·지시만으로 과업을 수행하는 LLM의 능력.' },
      { ko: '생각의 사슬', en: 'CoT, Chain-of-Thought', def: '결론만 내지 말고 단계별 사고·중간 근거를 남기게 유도하는 프롬프트 기법.' },
      { ko: '자기 일관성', en: 'SC, Self-Consistency', def: '같은 문제를 여러 독립 경로로 다시 검증해 일치도로 신뢰도를 높이는 기법.' },
      { ko: '리액트', en: 'ReAct, Reason + Act', def: 'Thought→Action(도구 호출)→Observation을 반복하며 추론과 행동을 결합하는 에이전트 기법.' },
      { ko: '추론', en: 'Inference', def: '학습된 모델이 입력을 받아 토큰화→임베딩→Self-Attention→다음 토큰 예측으로 결과를 생성하는 과정.' },
    ],
  },
  {
    h: '에이전트·서비스·생태계',
    terms: [
      { ko: '에이전트', en: 'Agent', def: '역할(role)·목표(goal)를 갖고 LLM·도구를 이용해 스스로 작업을 수행하는 단위.' },
      { ko: '태스크', en: 'Task', def: '에이전트에 주어지는 구체적 작업 단위. 설명에 CoT·ReAct 지시를 담기도 한다.' },
      { ko: '크루', en: 'Crew', def: '여러 에이전트와 태스크를 묶어 순차/협업으로 실행하는 CrewAI의 실행 단위.' },
      { ko: '크루에이아이', en: 'CrewAI', def: '역할 기반 다중 에이전트를 손쉽게 구성·연동하는 LLM 오케스트레이션 프레임워크.' },
      { ko: '도구 호출', en: 'Tool Calling', def: '에이전트가 검색·계산·DB 조회 등 외부 도구를 호출해 결과를 활용하는 것.' },
      { ko: 'API 키·환경변수', en: 'API Key · .env', def: 'LLM API 인증 키. 코드에 직접 쓰지 않고 .env·환경변수로 불러오며 외부 공유를 금지한다.' },
      { ko: '토큰 비용', en: 'Token Cost', def: 'API 과금·속도가 토큰 수에 비례한다. 한국어는 같은 의미라도 영어보다 토큰이 많이 든다.' },
      { ko: '인간 피드백 강화학습', en: 'RLHF', def: '사람 선호 피드백으로 모델 응답을 정렬(align)하는 학습 방법.' },
      { ko: '전문가 혼합', en: 'MoE, Mixture of Experts', def: '여러 전문가 서브네트워크 중 일부만 선택 활성화해 효율을 높이는 구조.' },
      { ko: '스케일링 법칙', en: 'Scaling Law', def: '모델·데이터·연산을 키울수록 성능이 예측 가능하게 향상된다는 경험 법칙.' },
      { ko: '오픈웨이트', en: 'Open-Weight', def: '가중치가 공개되어 내려받아 실행·미세조정할 수 있는 모델. 반대는 API로만 쓰는 Closed 모델.' },
    ],
  },
]
