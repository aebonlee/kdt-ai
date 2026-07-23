const n={"transformer-1":{plan:{schedule:[{time:"09:00–09:50",topic:"[강의] LLM이 뭐길래? '다음 단어 맞히기' 게임으로 시작하기"},{time:"10:00–10:50",topic:"[강의] 토큰화(BPE)와 임베딩 — 글자를 숫자 벡터로 바꾸기"},{time:"11:00–11:50",topic:"[실습] 토크나이저로 문장 쪼개고 임베딩 벡터 직접 꺼내보기"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"[강의] RNN·LSTM의 한계 — 한 줄로 서서 차례차례 읽기의 답답함"},{time:"14:00–14:50",topic:"[강의] Attention의 직관 — 중요한 문장에 형광펜 치기"},{time:"15:00–15:50",topic:"[강의] Self-Attention과 Query·Key·Value 삼총사"},{time:"16:00–16:50",topic:"[실습] Scaled Dot-Product Attention 손으로·NumPy로 계산하기"},{time:"17:00–17:50",topic:"[실습] Attention 가중치 히트맵으로 시각화하기"}],practice:{title:"Self-Attention을 NumPy로 한 줄씩 만들고 가중치를 시각화하기",steps:["Colab 새 노트북을 열고 첫 셀에 `import numpy as np` 와 `import matplotlib.pyplot as plt` 를 입력해 실행한다.","예문 '나는 학교에 갔다' 를 3개 토큰으로 보고, 각 토큰의 임베딩을 4차원 난수 행렬 X(3x4)로 만든다(np.random.seed(0)로 고정).","가중치 행렬 Wq, Wk, Wv 를 각각 4x4 난수로 만들고 Q=X@Wq, K=X@Wk, V=X@Wv 를 계산한다.","점수 행렬 scores = Q@K.T 를 구하고 sqrt(차원수=4)로 나눠 스케일링한다.","softmax 함수를 직접 정의해 scores 의 각 행을 확률(합=1)로 바꿔 attention 가중치 A 를 만든다.","print(A.sum(axis=1)) 로 각 행의 합이 1.0 인지 확인한다(기대 결과: [1. 1. 1.]).","출력 output = A@V 를 계산하고 shape 이 (3,4)인지 print(output.shape)로 확인한다(기대 결과: (3, 4)).","plt.imshow(A) 와 plt.colorbar() 로 가중치 히트맵을 그리고, 어떤 토큰이 어떤 토큰을 많이 보는지 눈으로 확인한다.","토큰 라벨(나는/학교에/갔다)을 x·y축에 붙여 그림을 캡처한다."],deliverable:"Self-Attention 계산 노트북(.ipynb)과 attention 가중치 히트맵 이미지 1장"}},examples:[{title:"토크나이저로 문장을 토큰으로 쪼개기",lang:"python",code:`from transformers import AutoTokenizer            # 허깅페이스 토크나이저 불러오기

tok = AutoTokenizer.from_pretrained("bert-base-uncased")  # 사전학습 BERT 토크나이저 로드
sentence = "Transformers are amazing!"             # 쪼갤 예문
ids = tok(sentence)["input_ids"]                   # 문장을 토큰 ID 리스트로 변환
print(tok.convert_ids_to_tokens(ids))              # 결과: ['[CLS]', 'transformers', 'are', 'amazing', '!', '[SEP]']`,note:"한 단어가 여러 부분단어로 쪼개질 수 있고, 문장 앞뒤에 [CLS]·[SEP] 특수 토큰이 붙는 것을 확인한다."},{title:"softmax로 '집중 비율' 만들어 보기",lang:"python",code:`import numpy as np                                # 수치 계산 라이브러리

scores = np.array([2.0, 1.0, 0.1])                 # 세 토큰에 대한 원점수(아무 값)
exp = np.exp(scores - scores.max())                # 최댓값 빼고 지수화(오버플로 방지)
weights = exp / exp.sum()                           # 합이 1이 되도록 정규화
print(np.round(weights, 3))                         # 결과: [0.659 0.242 0.099]
print("합:", weights.sum())                         # 결과: 합: 1.0`,note:"점수가 가장 큰 항목이 가장 큰 비율을 가져가고, 전체 합은 항상 1이 된다."},{title:"토큰의 임베딩 벡터를 직접 꺼내 보기",lang:"python",code:`import torch                                       # 딥러닝 텐서 계산 라이브러리
from transformers import AutoTokenizer, AutoModel  # 토크나이저와 모델 불러오기

tok = AutoTokenizer.from_pretrained("bert-base-uncased")  # BERT 토크나이저 로드
model = AutoModel.from_pretrained("bert-base-uncased")    # BERT 본체 로드
model.eval()                                     # 추론 모드로 전환(학습 끔)

sentence = "I love AI"                            # 임베딩을 꺼내 볼 예문
inputs = tok(sentence, return_tensors="pt")      # 문장을 토큰 ID 텐서로 변환
print("토큰:", tok.convert_ids_to_tokens(inputs["input_ids"][0]))
# 결과: 토큰: ['[CLS]', 'i', 'love', 'ai', '[SEP]']

with torch.no_grad():                            # 기울기 계산 끔(추론이라 불필요)
    out = model(**inputs)                        # 모델에 넣어 각 토큰의 벡터를 얻음

vecs = out.last_hidden_state                     # (문장수, 토큰수, 768) 임베딩 텐서
print("shape:", vecs.shape)                      # 결과: shape: torch.Size([1, 5, 768])

# 'love'(세 번째=index 2) 토큰의 벡터에서 앞 5개 숫자만 미리보기
print("love 벡터 앞 5개:", vecs[0, 2, :5].round(decimals=3))
# 결과 예: love 벡터 앞 5개: tensor([-0.312, 0.148, 0.027, -0.559, 0.203])`,note:"글자였던 토큰이 768개 숫자로 된 벡터로 바뀌어 나오는 것을 눈으로 확인한다. 이 768차원 벡터 하나하나가 '의미 지도 위의 좌표'이며, 오후에 배울 Attention은 바로 이 벡터들을 서로 비교·가중합하는 계산이다."},{title:"세 단어 문장으로 Self-Attention 행렬 직접 계산",lang:"python",code:`import numpy as np
np.random.seed(0)

# "고양이 가 앉았다" — 토큰 3개, 임베딩 차원 4라고 가정
tokens = ["고양이", "가", "앉았다"]
X = np.random.randn(3, 4)          # 각 토큰의 임베딩(실제로는 학습됨)

# Q·K·V 가중치(학습 대상). 여기선 무작위로 흉내만 낸다
Wq, Wk, Wv = (np.random.randn(4, 4) for _ in range(3))
Q, K, V = X @ Wq, X @ Wk, X @ Wv   # 각 토큰을 질문/열쇠/값으로 투영

scores = Q @ K.T / np.sqrt(4)      # √dₖ 스케일링(=2)
w = np.exp(scores - scores.max(1, keepdims=True))
w = w / w.sum(1, keepdims=True)    # 행 합=1 인 attention 가중치

for i, t in enumerate(tokens):
    # 토큰 t 가 문장의 각 토큰을 '얼마나 참고했는지'
    share = {tokens[j]: round(float(w[i, j]), 2) for j in range(3)}
    print(f"{t:5} 가 참고한 비율 → {share}")`,note:'Self-Attention은 각 토큰이 문장 안 다른 토큰을 "얼마나 참고할지"를 가중치로 만든다. 행 합이 1이 되는 것을 눈으로 확인.'},{title:"임베딩은 의미 공간 — 코사인 유사도로 확인",lang:"python",code:`import numpy as np

# 학습된 임베딩이라면 의미가 가까운 단어끼리 벡터도 가깝다
vec = {
    "왕":   np.array([0.9, 0.1, 0.8]),
    "여왕": np.array([0.8, 0.2, 0.9]),
    "사과": np.array([0.1, 0.9, 0.2]),
}
def cos(a, b):                       # 코사인 유사도(-1~1, 1=같은 방향)
    return a @ b / (np.linalg.norm(a) * np.linalg.norm(b))

print("왕-여왕:", round(cos(vec["왕"], vec["여왕"]), 3))   # 높음(의미 유사)
print("왕-사과:", round(cos(vec["왕"], vec["사과"]), 3))   # 낮음(의미 다름)`,note:"토큰화→임베딩 뒤 단어는 벡터가 된다. 코사인 유사도가 크면 의미가 가깝다 — 벡터 검색·RAG의 토대."},{title:"Multi-Head Attention — 차원을 나눠 여러 관점으로 보고 다시 합치기",lang:"python",code:`import numpy as np                       # 수치 계산 라이브러리
np.random.seed(0)                          # 결과 고정용 시드

# 토큰 3개, 모델 차원 8이라고 가정(임베딩은 학습되지만 여기선 흉내)
X = np.random.randn(3, 8)                  # (토큰 수, 모델 차원)
num_heads = 2                              # 헤드 2개로 나눈다
head_dim = 8 // num_heads                  # 각 헤드가 맡는 차원 = 4

def softmax(s):                            # 행 합이 1이 되도록 정규화
    e = np.exp(s - s.max(axis=-1, keepdims=True))  # 오버플로 방지
    return e / e.sum(axis=-1, keepdims=True)

outputs = []                               # 각 헤드 결과를 모을 리스트
for h in range(num_heads):                 # 헤드마다 서로 다른 관점으로 계산
    part = X[:, h*head_dim:(h+1)*head_dim] # 차원을 헤드별로 4개씩 자른다
    scores = part @ part.T / np.sqrt(head_dim)  # 스케일드 닷-프로덕트 점수
    weights = softmax(scores)              # 어텐션 가중치(합=1)
    outputs.append(weights @ part)         # 가중합 = 이 헤드의 결과
multi_head = np.concatenate(outputs, axis=-1)   # 여러 헤드를 다시 이어 붙임(concat)
print("헤드별 결과를 합친 모양:", multi_head.shape)  # 결과: (3, 8)`,note:"멀티헤드 어텐션은 차원을 여러 헤드로 나눠 각기 다른 관점의 관계를 병렬로 계산한 뒤 다시 이어 붙인다. 한 번의 어텐션보다 다양한 상호작용을 잡아낸다."},{title:"RNN(순차) vs Transformer(병렬) — 왜 어텐션이 빠른가",lang:"python",code:`import numpy as np                       # 수치 계산

tokens = ["나는", "밥을", "먹었다"]         # 토큰 3개
x = np.array([1.0, 2.0, 3.0])              # 각 토큰의 아주 단순한 값(임베딩 대신)

# 1) RNN 방식: 앞에서 뒤로 '순차'로만 진행(이어달리기)
hidden = 0.0                               # 이전 정보를 담는 은닉 상태
for i, t in enumerate(tokens):             # 반드시 앞 토큰부터 하나씩
    hidden = hidden * 0.5 + x[i]           # 앞 결과가 있어야 다음 계산 가능
    print(f"RNN {t}: 이전을 받아 처리 -> {hidden:.1f}")  # 중간이 끊기면 흐름 깨짐

# 2) Transformer 방식: 모든 토큰을 '동시에' 서로 참조(병렬)
scores = np.outer(x, x)                    # 모든 토큰 쌍의 관련도를 한 번에
weights = scores / scores.sum(axis=1, keepdims=True)  # 행별로 참고 비율화
context = weights @ x                       # 각 토큰이 전체를 동시에 반영
print("Transformer: 한 번에 전체 참조 ->", context.round(1))  # 순서 대기 없음`,note:"RNN은 앞 토큰 결과가 있어야 다음을 계산해 순차적(병렬화 어려움)이지만, 어텐션은 모든 토큰을 동시에 참조해 병렬 학습이 가능하다. 이 차이가 Transformer 속도의 핵심이다."},{title:"실습 1-A · LSTM으로 문장을 생성하고 한계를 눈으로 확인하기",lang:"python",code:`# [목표] 코드를 새로 짜는 게 아니라, 제공된 데모를 돌려 "한계를 체감"하는 것이 전부다.
#        이 단계에서는 구현력·튜닝을 평가하지 않는다. 실행하고 관찰하면 된다.
import torch
import torch.nn as nn

# 1) 아주 작은 LSTM 언어모델 — 구조를 이해할 수 있을 만큼만 단순하게
class TinyLSTM(nn.Module):
    def __init__(self, vocab_size, embed_dim=64, hidden_size=128):
        super().__init__()
        # 토큰 번호를 의미 벡터로 바꾸는 임베딩 층
        self.embed = nn.Embedding(vocab_size, embed_dim)
        # 이전 상태를 다음 시점으로 넘기며 순차 처리하는 LSTM 층
        self.lstm = nn.LSTM(embed_dim, hidden_size, batch_first=True)
        # 은닉 상태를 어휘 전체에 대한 점수(logits)로 펼치는 출력 층
        self.fc = nn.Linear(hidden_size, vocab_size)

    def forward(self, x, state=None):
        # 임베딩 -> LSTM -> 출력층 순서로 흘려보낸다
        out, state = self.lstm(self.embed(x), state)
        return self.fc(out), state

# 2) 한 글자씩 이어 붙이며 문장을 만든다 (자기회귀 생성)
def generate(model, start_ids, steps=200):
    model.eval()
    ids = list(start_ids)
    state = None
    with torch.no_grad():
        for _ in range(steps):
            # 직전 토큰 하나만 넣고 다음 토큰 점수를 받는다
            x = torch.tensor([[ids[-1]]])
            logits, state = model(x, state)
            # 점수를 확률로 바꿔 그 확률대로 하나를 뽑는다
            probs = torch.softmax(logits[0, -1], dim=-1)
            ids.append(int(torch.multinomial(probs, 1)))
    return ids

# 3) [관찰 포인트] 길게 뽑을수록 앞 맥락에서 멀어지는지 직접 본다
#    예: "오늘 아침 회사에서 팀 회의를 했는데..."로 시작해 200자를 뽑으면
#    뒤로 갈수록 회의와 무관한 이야기로 흘러가는 현상이 보인다.
#    이유: 은닉 상태 하나에 눌러 담은 초반 정보가 뒤로 갈수록 희석되기 때문이다.

# 4) [바꿔가며 볼 것] 아래 두 값을 바꿔 언제부터 무너지는지 비교해 본다
#    - hidden_size: 128 -> 64로 줄이면 더 빨리 흐트러지는가?
#    - steps: 50 / 200 / 500 중 어디서부터 문맥이 깨지는가?`,note:'이 실습의 채점 기준은 "제공된 예제를 정상 실행해 문장이 실제로 출력되었는가"다. 독자적 구현이나 하이퍼파라미터 튜닝은 요구하지 않으니, 코드를 완벽히 이해하지 못해도 겁먹지 말고 일단 돌려서 결과를 캡처하자. 대신 hidden_size와 생성 길이를 바꿔가며 "언제부터 무너지는지"를 직접 본 사람은 다음 단계의 비교 서술이 훨씬 쉬워진다.'},{title:"실습 1-B · 같은 과제를 Transformer로 다시 — 무엇이 달라지는가",lang:"python",code:`# [목표] 똑같은 시작 문장·똑같은 생성 길이로 Transformer 데모를 돌려 LSTM과 나란히 놓는다.
#        핵심은 "비교"다. 조건을 다르게 해놓고 비교하면 그 자체가 감점 사유가 된다.
import torch
import torch.nn as nn

class TinyTransformer(nn.Module):
    def __init__(self, vocab_size, embed_dim=64, n_head=4, n_layer=2, block_size=128):
        super().__init__()
        # 토큰의 의미를 담는 임베딩
        self.tok_embed = nn.Embedding(vocab_size, embed_dim)
        # Self-Attention은 순서를 스스로 알지 못하므로 위치 정보를 따로 더해 준다
        self.pos_embed = nn.Embedding(block_size, embed_dim)
        layer = nn.TransformerEncoderLayer(
            d_model=embed_dim, nhead=n_head, batch_first=True)
        self.blocks = nn.TransformerEncoder(layer, num_layers=n_layer)
        self.fc = nn.Linear(embed_dim, vocab_size)
        self.block_size = block_size

    def forward(self, x):
        seq_len = x.size(1)
        pos = torch.arange(seq_len).unsqueeze(0)
        # 토큰 의미 + 위치 정보를 더해 입력 벡터를 만든다
        h = self.tok_embed(x) + self.pos_embed(pos)
        # 미래 토큰을 보지 못하게 가리는 인과 마스크 (없으면 정답을 훔쳐본다)
        mask = nn.Transformer.generate_square_subsequent_mask(seq_len)
        h = self.blocks(h, mask=mask)
        return self.fc(h)

# [LSTM과 결정적으로 다른 점]
# LSTM: 직전 토큰 하나 + 은닉 상태만 보고 다음을 예측한다 (정보가 한 통로로 눌려 흐른다)
# Transformer: 지금까지 나온 모든 토큰을 매번 통째로 다시 본다 (거리와 무관하게 직접 참조)
#   -> 그래서 앞부분에 등장한 주어·인물관계가 문장 후반까지 살아남는다
#   -> 대신 문장 길이의 제곱에 비례해 계산량이 늘어난다 (긴 문서일수록 비용 부담)

# [비교할 때 반드시 맞출 것]
#  · 시작 문장을 동일하게
#  · 생성 길이(steps)를 동일하게
#  · 조건을 일부러 다르게 했다면 보고서에 그 사실을 반드시 밝힐 것`,note:'정답이 정해진 실습이 아니라 "차이를 체감했는가"를 확인하는 실습이다. 그래서 배점도 Transformer 쪽(60점)이 LSTM 쪽(40점)보다 높다 — 이 과목의 학습목표가 Transformer로의 개선을 느끼는 데 있기 때문이다. 비교 서술에는 수업에서 다룬 장기 의존성이나 Self-Attention을 언급하는 정도면 충분하고, 정량적 성능 비교까지는 요구하지 않는다.'},{title:"실습 1 자가 점검 — 제출 전에 내가 먼저 확인할 것",lang:"text",code:`[이 실습이 요구하지 않는 것 — 먼저 안심하고 시작하자]
  · 독자적인 모델 구현 (제공된 예제 코드를 쓰면 된다)
  · 하이퍼파라미터 튜닝
  · 정량적 성능 비교나 심화 분석
  딥러닝·LSTM을 정식으로 배우지 않은 상태를 전제로 설계된 실습이다.

[LSTM 문장 생성 — 40점 항목 체크포인트]
  □ 제공된 예제 코드를 (그대로 또는 최소 수정으로) 정상 실행했는가
  □ 생성된 문장이 실제로 화면에 출력되었는가
  □ 실행 결과를 출력/캡처 형태로 제출물에 포함했는가
  ※ 결과 캡처 누락이 가장 흔한 실점 사유다. 돌아갔다는 증거를 꼭 남기자.

[Transformer 문장 생성 — 60점 항목 체크포인트]
  □ Transformer 예제 코드도 정상 실행해 문장을 생성했는가
  □ LSTM 결과와 어떤 차이가 있었는지 "내 말로" 서술했는가
  □ 그 차이의 이유를 수업 개념(장기 의존성 · Self-Attention)과 연결해 한 줄이라도 붙였는가
  ※ "다르게 나왔다"로만 끝내고 이유가 없으면 서술이 부족한 것으로 본다.

[감점을 부르는 흔한 실수]
  · LSTM과 Transformer에 서로 다른 시작 문장·조건을 쓰고 그 사실을 밝히지 않은 채 비교
    → 조건이 달라도 괜찮다. 다만 "달랐다"는 것을 인지하고 적었는지가 중요하다.
  · 코드는 돌렸는데 결과 캡처가 없어 정상 동작 여부가 불분명한 경우
  · 팀 간 결과물이 지나치게 유사한 경우(표절·복붙)

[제출 산출물]
  · LSTM 기반 생성 코드와 결과
  · Transformer 기반 생성 코드와 결과
  · 두 모델의 한계와 개선점을 비교한 리포트`,note:'이 실습은 "정답을 맞히는 시험"이 아니라 "직접 돌려보고 느낀 것을 말할 수 있는가"를 보는 실습이다. 그래서 체크포인트가 실행 여부와 서술 여부에 몰려 있다. 코드가 어렵게 느껴지더라도 실행과 캡처, 그리고 두세 문장의 비교 서술만 챙기면 대부분의 배점을 확보할 수 있다.'}],concepts:[{term:"언어모델(Language Model)",desc:"앞 문장을 보고 '다음에 올 단어'를 확률로 맞히는 모델로, 스마트폰 자판의 다음 단어 추천을 떠올리면 쉽다."},{term:"토큰(Token)",desc:"모델이 한 입에 삼키는 글자 조각으로, 문장을 단어나 부분단어로 잘게 자른 한 토막을 말한다."},{term:"토큰화/BPE",desc:"자주 같이 등장하는 글자쌍을 하나로 합쳐 단어를 부분단어로 쪼개는 방식으로, 레고 블록처럼 조각을 모아 어떤 단어든 표현한다."},{term:"임베딩(Embedding)",desc:"토큰을 숫자들의 묶음(벡터)으로 바꾼 것으로, 뜻이 비슷한 단어는 좌표가 가까운 '의미 지도 위의 점'이 된다."},{term:"Attention(주의)",desc:"지금 단어를 이해하려고 문장 속 어느 단어를 얼마나 볼지 정하는 장치로, 중요한 부분에 형광펜을 치는 것과 같다."},{term:"Query·Key·Value(Q·K·V)",desc:"Query는 '내가 찾는 질문', Key는 '각 단어의 이름표', Value는 '그 단어의 알맹이 정보'로, 도서관에서 검색어(Q)로 책 제목(K)을 맞춰보고 내용(V)을 꺼내는 것과 같다."},{term:"Softmax",desc:"여러 점수를 합이 1인 확률로 바꿔주는 함수로, 표를 % 비율로 환산해 '어디에 몇 % 집중'을 정한다."}],detail:{topics:[{h:"입력을 숫자로 바꾸는 단계",items:["토큰화(BPE/WordPiece)와 어휘집(vocabulary)","토큰 ID와 특수 토큰([CLS]/[SEP])","임베딩 벡터와 의미 공간","벡터 유사도(가까운 단어=비슷한 뜻)"]},{h:"기존 시퀀스 모델의 한계",items:["RNN의 순차 처리와 느린 학습","장기 의존성(앞 내용을 잊어버림) 문제","기울기 소실(gradient vanishing)","병렬화가 어려운 구조적 한계"]},{h:"Attention의 구성 요소",items:["Query·Key·Value의 역할 구분","내적(dot-product)으로 유사도 측정","스케일링(sqrt(d_k))의 이유","softmax 가중치와 가중합(weighted sum)"]}],labs:[{title:"Lab 1. 토크나이저와 임베딩 직접 만져보기",steps:["`pip install transformers torch` 로 라이브러리를 설치한다.","AutoTokenizer로 'bert-base-uncased'를 불러온다.","좋아하는 영어 문장 하나를 토큰화해 input_ids를 출력한다.","convert_ids_to_tokens로 ID가 어떤 토큰인지 확인한다.","AutoModel로 같은 모델을 불러와 문장의 last_hidden_state.shape를 출력하고 (1, 토큰수, 768)인지 확인한다."]},{title:"Lab 2. softmax로 집중도 바꿔보기",steps:["NumPy로 점수 배열 [2.0, 1.0, 0.1]을 만든다.","softmax를 적용해 가중치를 출력한다.","점수를 [5.0, 1.0, 0.1]로 키워 다시 계산하고, 1등에 더 쏠리는지 비교한다.","모든 점수를 똑같이 [1,1,1]로 두면 가중치가 균등(1/3)해지는지 확인한다."]},{title:"Lab 3. Attention 가중치 시각화",steps:["메인 실습의 attention 행렬을 가져온다.","plt.imshow(attention)로 히트맵을 그린다.","plt.xticks/plt.yticks로 토큰 이름을 축에 붙인다.","어떤 토큰이 자기 자신을 많이 보는지, 어떤 토큰을 많이 보는지 한 줄로 해석을 적는다."]}],homework:["오늘 만든 NumPy Self-Attention 코드에서 토큰을 4개(예: '나는 오늘 학교에 갔다')로 늘려 attention 행렬이 (4,4)가 되는지 확인하고 히트맵을 캡처해 제출한다.","'언어모델은 다음 토큰을 맞히는 모델이다'를 비유 하나를 넣어 5문장으로 설명하는 짧은 글을 작성한다."]},theory:{theory:[{h:"컴퓨터가 뜻을 알게 된 과정: 숫자 표현의 진화사",body:`컴퓨터가 단어의 '의미'를 다루기까지는 여러 단계를 거쳤다.
① 원-핫 인코딩 — 단어마다 자리 하나만 1인 긴 0/1 벡터다. 단어를 구분은 하지만 '왕'과 '여왕'이 '사과'만큼이나 서로 멀어서, 의미가 전혀 담기지 않는다.
② 빈도 기반(TF-IDF 등) — 어떤 단어가 문서에 얼마나 자주, 또 얼마나 희귀하게 나오는지로 표현한다. 문서 분류에는 쓸 만하지만 단어 사이의 뜻 관계는 여전히 모른다.
③ Word2Vec 분산표현 — '비슷한 자리에 나오는 단어는 뜻도 비슷하다'는 생각으로 단어를 짧고 촘촘한 벡터로 학습한다. 이때 처음으로 '왕-남자+여자≈여왕' 같은 의미 연산이 가능해졌다.
④ 문맥 기반 임베딩 — Word2Vec은 '배(먹는 배/타는 배)'를 늘 같은 벡터로 봤지만, Transformer는 문장마다 주변 단어를 보고 그때그때 다른 벡터를 만든다.

결국 우리가 배울 임베딩은 이 진화의 최신 단계이며, '어떻게 하면 의미의 거리를 숫자로 더 잘 담을까'라는 한 질문의 답이 계속 발전해 온 것이다.`},{h:"LLM은 결국 '다음 단어 맞히기' 선수다",body:`거대언어모델(LLM)이라고 하면 어렵게 들리지만, 핵심은 끝말잇기처럼 '다음에 올 말'을 맞히는 게임 선수다.
스마트폰에서 '오늘 점심' 까지 치면 '뭐 먹지'를 추천해주는 그 기능을 어마어마하게 키운 것이라고 보면 된다.

조금 더 정확히 말하면, 언어모델은 앞에 주어진 토큰들을 보고 '다음 토큰이 무엇일 확률이 가장 높은가'를 계산한다.
예를 들어 '하늘이 ___' 다음에는 '파랗다'가 0.7, '빨갛다'가 0.05 같은 식으로 확률을 매긴다.
이 다음-토큰-확률을 아주 잘 맞히도록 인터넷의 방대한 글로 훈련한 모델이 바로 GPT 같은 LLM이다.
그래서 우리가 배울 모든 구조는 결국 '이 확률을 더 잘 맞히기 위한 장치'라는 한 문장으로 꿸 수 있다.`},{h:"왜 컴퓨터는 글자를 숫자로 바꿔야 할까",body:`컴퓨터는 글자를 모른다.
오직 숫자만 계산할 수 있기 때문에, 우리가 쓰는 '학교'라는 단어도 숫자 묶음으로 번역해줘야 한다.

첫 단계가 토큰화로, 문장을 '학교/에/갔다' 처럼 작은 조각으로 자른다.
BPE라는 방식은 자주 붙어 다니는 글자쌍을 묶어서, 처음 보는 단어도 익숙한 조각의 조합으로 표현하게 해준다.
그 다음 단계가 임베딩으로, 각 토큰을 좌표(벡터)로 바꿔 '의미 지도' 위의 점으로 만든다.
이 지도에서는 '왕'과 '여왕'이 가깝게, '왕'과 '사과'가 멀게 놓이도록 학습되어, 컴퓨터가 의미의 거리까지 숫자로 다룰 수 있게 된다.`},{h:"Attention은 문장에 형광펜을 치는 일",body:`긴 문장을 이해할 때 우리는 모든 단어를 똑같이 보지 않고, 핵심 단어에 형광펜을 친다.
'그 영화는 정말 지루했지만 음악은 좋았다'에서 '좋았다'를 이해하려면 '음악'에 더 집중해야 하는 것과 같다.

Attention은 바로 이 '어디에 얼마나 집중할지'를 숫자로 계산하는 장치다.
과거의 RNN처럼 단어를 한 줄로 세워 차례차례 읽는 대신, Attention은 모든 단어를 한눈에 펼쳐놓고 서로를 직접 비교한다.
그래서 문장이 길어도 멀리 떨어진 단어끼리 관계를 바로 연결할 수 있고, 동시에 처리하니 속도도 빠르다.
이 '형광펜 치기'를 자기 문장 안에서 스스로 하기 때문에 Self-Attention(셀프 어텐션)이라고 부른다.`},{h:"RNN·LSTM의 한계 — 한 줄로 서서 차례차례 읽는 답답함",body:`Transformer가 나오기 전에는 문장을 처리할 때 단어를 한 줄로 세워 앞에서부터 한 개씩 차례로 읽었다. 이 방식을 RNN이라고 한다.
비유하면 여러 사람이 한 줄로 서서 귓속말로 메시지를 뒤로 전달하는 게임과 같다. 앞사람이 들은 요약(기억=hidden state)을 다음 사람에게 넘기고, 그 사람은 자기가 본 단어를 합쳐 다시 요약해 넘긴다.

이 구조에는 세 가지 답답함이 있었다.
① 느리다 — 앞 단어를 다 읽어야 다음 단어를 읽을 수 있어서, 여러 단어를 동시에(병렬) 처리하지 못한다. 문장이 길수록 계산이 줄줄이 밀린다.
② 멀리 있는 말을 잊는다 — 귓속말이 뒤로 갈수록 앞부분 내용이 흐려지듯, 문장이 길면 맨 앞 단어의 정보가 뒤까지 살아남지 못한다(장기 의존성 문제). '나는 어릴 때 프랑스에서 자라서 ... 그래서 ___를 유창하게 한다' 같은 문장에서 맨 앞 '프랑스'를 끝까지 기억해야 하는데 그게 어렵다.
③ 학습이 흔들린다 — 정보를 여러 단계 거쳐 전달하다 보면 학습 신호(기울기)가 점점 작아져 사라진다(기울기 소실).

LSTM은 '무엇을 기억하고 무엇을 잊을지'를 조절하는 문(gate)을 달아 ②를 어느 정도 개선했다. 하지만 여전히 한 줄로 차례차례 읽는다는 본질(①의 순차 처리)은 바꾸지 못했다.

그래서 사람들은 생각을 뒤집었다. '왜 꼭 줄을 세워 읽어야 하지? 모든 단어를 한 판에 펼쳐 놓고, 필요한 단어끼리 곧바로 연결하면 안 될까?' 이 발상이 바로 다음 시간에 배울 Attention이고, 멀리 떨어진 단어도 한 번에 이어 주며 동시에 처리해 속도까지 잡은 것이 Transformer다. 즉 RNN의 세 가지 답답함이 Attention을 만든 동기다.`},{h:"Self-Attention과 Query·Key·Value 삼총사",body:`앞에서 Attention은 '어디에 형광펜을 칠지 정하는 일'이라고 했다. 그렇다면 그 '집중 비율'을 대체 어떻게 숫자로 계산할까? 그 비밀이 Query·Key·Value 세 가지 벡터에 있다.

토큰 하나하나는 자기 임베딩에서 세 가지 역할의 벡터를 만들어 낸다.
· Query(질문) — '나는 지금 어떤 정보를 찾고 있나'
· Key(이름표) — '나는 이런 정보를 가진 단어야'
· Value(알맹이) — '내가 실제로 넘겨줄 내용은 이거야'

도서관에서 책을 찾는 장면을 떠올리면 딱 맞는다. 내가 검색창에 친 검색어가 Query, 책마다 붙은 제목·색인이 Key, 책 속 실제 내용이 Value다. 검색어(Q)를 모든 책 제목(K)과 비교해 가장 잘 맞는 책을 찾고, 그 책의 내용(V)을 꺼내 온다.

계산 순서는 이렇게 흐른다.
1) 한 토큰의 Query를 문장 속 모든 토큰의 Key와 하나씩 내적(dot-product)해 '얼마나 잘 맞나' 점수를 낸다.
2) 점수가 너무 커지지 않게 √(차원수)로 나눠 준다(스케일링). 이 안전장치가 있어야 뒤의 softmax가 한쪽으로 극단적으로 쏠리지 않는다.
3) 점수들을 softmax로 통과시켜 합이 1인 '집중 비율'로 바꾼다.
4) 그 비율로 각 토큰의 Value를 가중합한다. 결과가 바로 그 토큰의 '문맥이 반영된 새 표현'이다.

핵심은 이 과정을 문장 안의 모든 토큰이 동시에, 서로에게 수행한다는 점이다. Q·K·V가 전부 같은 문장 자기 자신에게서 나오기 때문에 'Self(스스로)-Attention'이라고 부른다. 그 결과 각 단어는 자기 혼자만의 뜻이 아니라, 문장 안 관련 단어들의 정보를 적절히 섞어 담은 새로운 벡터로 다시 태어난다. 다음 실습에서 이 네 단계를 NumPy로 한 줄씩 직접 계산해 볼 것이다.`}]},realCodes:[{title:"NumPy로 처음부터 만드는 Self-Attention (엔드투엔드)",lang:"python",code:`import numpy as np                      # 행렬 계산을 위한 핵심 라이브러리 불러오기

np.random.seed(0)                        # 난수를 고정해 매번 같은 결과가 나오게 함(재현성)

# 1) 입력 임베딩 만들기: 토큰 3개, 각 토큰은 4차원 벡터
tokens = ["나는", "학교에", "갔다"]      # 예문을 3개 토큰으로 가정
X = np.random.rand(3, 4)                  # (3토큰 x 4차원) 임베딩 행렬을 난수로 생성

# 2) Q, K, V를 만드는 가중치 행렬(학습으로 정해지는 값, 여기선 난수)
Wq = np.random.rand(4, 4)                 # Query 변환용 가중치 (4 -> 4)
Wk = np.random.rand(4, 4)                 # Key 변환용 가중치 (4 -> 4)
Wv = np.random.rand(4, 4)                 # Value 변환용 가중치 (4 -> 4)

# 3) 입력 X를 Q, K, V 세 가지 역할로 변환
Q = X @ Wq                                # '내가 찾는 질문' 벡터들 (3 x 4)
K = X @ Wk                                # '각 토큰의 이름표' 벡터들 (3 x 4)
V = X @ Wv                                # '각 토큰의 알맹이 정보' 벡터들 (3 x 4)

# 4) 점수 계산: Query와 Key를 내적해 '얼마나 잘 맞나' 측정
scores = Q @ K.T                          # (3 x 3) 각 토큰이 각 토큰을 보는 원점수
d_k = Q.shape[1]                          # Key의 차원 수(=4), 스케일링에 사용
scores = scores / np.sqrt(d_k)            # sqrt(차원)로 나눠 값이 너무 커지는 것 방지

# 5) softmax로 점수를 합이 1인 '집중 비율'로 변환
def softmax(x):                           # 행 단위 softmax 함수 직접 정의
    e = np.exp(x - x.max(axis=1, keepdims=True))  # 최댓값을 빼서 수치 오버플로 방지
    return e / e.sum(axis=1, keepdims=True)       # 각 행을 합이 1인 확률로 정규화

attention = softmax(scores)               # (3 x 3) attention 가중치 행렬 완성
print("가중치 합:", attention.sum(axis=1))  # 결과: 가중치 합: [1. 1. 1.]

# 6) 가중치로 Value를 가중합해 최종 출력 만들기
output = attention @ V                     # (3 x 4) 각 토큰의 문맥 반영 결과
print("출력 shape:", output.shape)          # 결과: 출력 shape: (3, 4)`,note:`임베딩→Q/K/V 변환→점수→softmax→가중합 이라는 Self-Attention의 전 과정을 외부 라이브러리 없이 NumPy만으로 재현한다.
출력 shape이 입력과 같은 (3,4)로 유지되는 점이 핵심이다.`}],periods:["[강의] LLM이 뭐길래? '다음 단어 맞히기' 게임으로 시작하기","[강의] 토큰화(BPE)와 임베딩 — 글자를 숫자 벡터로 바꾸기","[실습] 토크나이저로 문장 쪼개고 임베딩 벡터 직접 꺼내보기","[강의] RNN·LSTM의 한계 — 한 줄로 서서 차례차례 읽기의 답답함","[강의] Attention의 직관 — 중요한 문장에 형광펜 치기","[강의] Self-Attention과 Query·Key·Value 삼총사","[실습] Scaled Dot-Product Attention 손으로·NumPy로 계산하기","[실습] Attention 가중치 히트맵으로 시각화하기"]},"transformer-2":{plan:{schedule:[{time:"09:00–09:50",topic:"[강의] Multi-Head Attention — 여러 명이 각자 관점으로 읽기"},{time:"10:00–10:50",topic:"[강의] Positional Encoding·FFN·잔차연결(Residual)·LayerNorm 조립"},{time:"11:00–11:50",topic:"[강의] Encoder vs Decoder, 그리고 BERT·GPT·T5"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"[실습] 사전학습 BERT로 문장 임베딩 뽑아 유사도 비교하기"},{time:"14:00–14:50",topic:"[강의] Transformer 이후 혁신 ① Scaling Law · In-Context Learning"},{time:"15:00–15:50",topic:"[강의] Transformer 이후 혁신 ② RLHF · MoE(Mixture of Experts)"},{time:"16:00–16:50",topic:"[강의] LLM 생태계: Open-Weight vs Closed, 벤치마크·Leaderboard"},{time:"17:00–17:50",topic:"[실습] GPT-2로 문장 생성하고 다음 토큰 확률 들여다보기"}],practice:{title:"Lab 0. 손으로 만드는 bigram 언어모델 → 사전학습 GPT-2로 텍스트 생성·'다음 토큰 확률' 확인하기",steps:["[Lab 0] 짧은 예문(예: i love ai i love code i love you)을 단어 리스트로 만든다.","[Lab 0] 연속한 (앞단어, 뒷단어) 쌍을 세어 bigram 카운트 표를 만든다.","[Lab 0] 각 행을 합이 1이 되도록 나눠 다음-단어 확률표를 만든다(이 표 자체가 언어모델).","[Lab 0] 'i' 다음 단어 확률을 출력해 love가 가장 높게 나오는지 확인한다.","[Lab 0] 이 확률표로 다음 단어를 샘플링해 문장을 이어 생성해 본다.","[Lab 0] 한계를 관찰한다: 바로 앞 한 단어만 보므로 긴 문맥을 못 살린다 — '그래서 Transformer가 필요하다'로 오후 GPT-2 실습에 연결한다.","Colab에서 `pip install transformers torch` 로 라이브러리를 설치한다.","import torch 와 from transformers import GPT2LMHeadModel, GPT2Tokenizer 로 torch·GPT-2 모델·토크나이저를 불러온다(torch는 뒤 확률 계산에 필요).","model = GPT2LMHeadModel.from_pretrained('gpt2') 와 tokenizer = GPT2Tokenizer.from_pretrained('gpt2') 를 실행한다.","프롬프트 'The future of AI is' 를 tokenizer로 인코딩해 input_ids 텐서를 만든다.","model.generate(input_ids, max_length=20, pad_token_id=tokenizer.eos_token_id) 로 문장을 이어 생성하고 decode 해 출력한다(pad_token_id를 넣으면 pad 경고가 안 뜬다 · 기대 결과: 영어 문장이 자연스럽게 이어짐).","다음 토큰 확률을 보려고 logits = model(input_ids).logits 의 마지막 위치(logits[0, -1])를 꺼내 probs = torch.softmax(그 값, dim=-1) 로 확률로 바꾼다.","torch.topk(probs, 5) 로 가장 확률 높은 다음 토큰 5개와 확률을 출력한다.","tokenizer.decode 로 그 5개 토큰을 사람이 읽는 단어로 바꿔 무엇을 예측했는지 확인한다.","프롬프트를 'The future of AI is' 와 'I love' 두 가지로 바꿔, 예측 단어가 어떻게 달라지는지 비교 캡처한다.","[제출물] 위 실습을 바탕으로 1~2페이지 '개발해석 보고서'를 작성한다 — ① 구현한 미니 언어모델(bigram→GPT-2) 구조, ② 이해한 Transformer 핵심 개념(토큰화·임베딩·Attention·다음 토큰 예측)을 자기 말로, ③ 생성 문장 예시와 모델의 한계를 실습 결과와 연결한 해석, ④ 실제 LLM과 미니모델의 차이·배운 점·개선 방향(성찰). 노트북(.ipynb)은 보조 자료로 함께 내면 좋다(선택)."],deliverable:"1~2페이지 개발해석 보고서(구현 모델 구조 + Transformer 핵심 개념 이해 + 결과 해석 + 성찰·개선방향)가 주 산출물. GPT-2 생성 결과·top-5 확률 노트북(.ipynb)은 선택(Optional). ※ 평가기준: 이해역량 55(구조이해 30·학습생성 25) + 해석역량 45(결과해석 25·성찰 20)"}},examples:[{title:"BERT(빈칸 채우기)로 [MASK] 예측하기",lang:"python",code:`from transformers import pipeline                  # 간편 추론 파이프라인 불러오기

fill = pipeline("fill-mask", model="bert-base-uncased")  # 빈칸 채우기 파이프라인 생성
result = fill("Paris is the [MASK] of France.")     # [MASK] 자리에 올 단어 예측
print(result[0]["token_str"], round(result[0]["score"], 3))  # 결과: capital 0.9 근처`,note:"BERT는 양방향으로 문맥을 읽어 빈칸에 가장 어울리는 단어를 높은 확률로 채운다."},{title:"GPT-2(이어 쓰기)로 문장 생성하기",lang:"python",code:`from transformers import pipeline                  # 추론 파이프라인 불러오기

gen = pipeline("text-generation", model="gpt2")     # 텍스트 생성 파이프라인 생성
out = gen("The future of AI is", max_length=20, num_return_sequences=1)  # 문장 이어쓰기
print(out[0]["generated_text"])                     # 결과: 입력에 이어 자연스러운 영어 문장 출력`,note:"GPT-2는 왼쪽부터 다음 토큰을 차례로 예측하며 문장을 만들어내는 Decoder-only 모델이다."},{title:"밑바닥부터 만드는 초소형 언어모델(bigram 카운트 기반)",lang:"python",code:`import numpy as np
# 아주 작은 말뭉치
text = 'i love ai i love code i love you'
words = text.split()
vocab = sorted(set(words))              # 단어 사전
w2i = {w: i for i, w in enumerate(vocab)}  # 단어->번호
n = len(vocab)
# 1) bigram 카운트 표: '앞 단어' 다음에 '뒷 단어'가 몇 번 왔나
counts = np.zeros((n, n))
for a, b in zip(words[:-1], words[1:]):
    counts[w2i[a], w2i[b]] += 1
# 2) 각 행을 확률로 정규화 = 다음-단어 확률 분포 (이것이 언어모델!)
probs = counts / counts.sum(axis=1, keepdims=True)
# 3) 'i' 다음에 올 단어를 확률로 예측
row = probs[w2i['i']]
for w in vocab:
    print(w, round(row[w2i[w]], 2))     # love가 가장 높게 나옴
`,note:"외부 모델 없이 단어쌍 빈도를 세어 확률로 바꾸는 것만으로도 가장 단순한 언어모델이 만들어진다. GPT는 이 bigram 표를 Transformer라는 거대한 함수로 바꾸고 훨씬 긴 앞 문맥을 보게 한 확장판일 뿐임을 체감한다."},{title:"Positional Encoding — 순서 정보를 주입",lang:"python",code:`import numpy as np

def positional_encoding(seq_len, d_model):
    pos = np.arange(seq_len)[:, None]        # 위치 0,1,2,...
    i = np.arange(d_model)[None, :]          # 차원 인덱스
    angle = pos / np.power(10000, (2 * (i // 2)) / d_model)
    pe = np.zeros((seq_len, d_model))
    pe[:, 0::2] = np.sin(angle[:, 0::2])     # 짝수 차원=sin
    pe[:, 1::2] = np.cos(angle[:, 1::2])     # 홀수 차원=cos
    return pe

pe = positional_encoding(seq_len=5, d_model=8)
print(pe.round(2))   # 위치마다 고유한 패턴 → 순서 구분 가능`,note:'Attention 자체는 순서를 모른다. 위치별로 다른 sin/cos 패턴을 더해 "몇 번째 토큰인지"를 알려준다.'},{title:"디코딩 파라미터(temperature·top-p)가 생성에 미치는 영향",lang:"python",code:`from transformers import pipeline
gen = pipeline("text-generation", model="gpt2")

prompt = "In the future, AI will"
# temperature↑ → 다양·창의적이지만 산만, ↓ → 안정적이지만 반복적
for t in [0.2, 1.0]:
    out = gen(prompt, max_new_tokens=20, do_sample=True,
              temperature=t, top_p=0.9)[0]["generated_text"]
    print(f"[temp={t}] {out}\\n")`,note:'Decoder-only 모델은 다음 토큰을 확률로 뽑는다. temperature·top-p가 "창의성 vs 안정성" 손잡이 — 업무 답변은 낮게, 브레인스토밍은 높게.'},{title:"Masked(인과) Self-Attention — 미래 토큰을 가리는 이유",lang:"python",code:`import numpy as np                       # 수치 계산

# 디코더(GPT 계열)는 '미래 토큰'을 미리 보면 안 된다 -> 마스크로 가린다
tokens = ["나는", "밥을", "먹었다"]         # 토큰 3개
np.random.seed(0)                          # 재현용 시드
X = np.random.randn(3, 4)                  # 각 토큰 임베딩(차원 4)

scores = X @ X.T / np.sqrt(4)              # 토큰끼리의 관련도 점수
mask = np.triu(np.ones((3, 3)), k=1)       # 위쪽 삼각형(미래 위치)만 1
scores = np.where(mask == 1, -np.inf, scores)  # 미래 자리는 -무한대로 막는다

def softmax(s):                            # 행 합이 1이 되게(-inf는 0이 됨)
    e = np.exp(s - s.max(axis=-1, keepdims=True))
    return e / e.sum(axis=-1, keepdims=True)

weights = softmax(scores)                  # 마스킹된 어텐션 가중치
for i, t in enumerate(tokens):             # 각 토큰이 참고한 비율 확인
    print(t, "가 참고:", weights[i].round(2))  # 뒤 토큰 비율은 항상 0`,note:"마스크드 셀프 어텐션은 현재 위치보다 뒤에 올 토큰을 가려, 아직 생성되지 않은 미래 단어를 참고하지 못하게 한다. GPT 같은 CLM이 왼->오 순서로 문장을 만드는 이유다."},{title:"최종 출력 단계 — logits를 확률로 바꿔 다음 토큰 고르기",lang:"python",code:`from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저
import torch                               # 텐서 계산

name = "gpt2"                              # 작은 CLM 모델
tok = AutoTokenizer.from_pretrained(name)  # 토크나이저 로드
model = AutoModelForCausalLM.from_pretrained(name)  # 모델 로드
model.eval()                               # 추론 모드

prompt = "The capital of France is"        # 다음 단어를 예측할 문장
ids = tok(prompt, return_tensors="pt").input_ids  # 문장을 토큰 ID로

with torch.no_grad():                      # 기울기 계산 끔(추론)
    logits = model(ids).logits             # 각 위치의 단어사전 크기 점수(Linear 출력)
last = logits[0, -1]                       # 마지막 위치의 다음-토큰 점수만 사용
probs = torch.softmax(last, dim=-1)        # 소프트맥스로 확률 분포 변환
top = torch.topk(probs, 5)                 # 확률 상위 5개 후보

for score, idx in zip(top.values, top.indices):  # 후보를 확률과 함께
    print(tok.decode(idx), round(score.item(), 3))  # 단어와 확률 출력
# 가장 확률 높은 토큰을 고르면(greedy) 그것이 생성되는 다음 단어`,note:'Transformer 마지막 단계는 결과 벡터를 Linear로 단어사전 크기만큼 펼치고(logits), Softmax로 확률을 만든 뒤 가장 높은 단어를 고른다. 생성이 곧 "다음 토큰 확률 뽑기"임을 눈으로 확인한다.'},{title:"실습 2-A · LLM API 최소 연결 — 응답과 토큰 사용량 확인하기",lang:"python",code:`# [전제] 파이썬 세부 문법을 다 몰라도 된다. "API를 연결해 실행할 수 있는" 수준이면 충분하다.
import os
from openai import OpenAI

# 1) 키는 코드에 직접 쓰지 말고 환경변수로 읽는다 (화면 공유·깃 업로드 사고 방지)
#    터미널: export OPENAI_API_KEY="발급받은키"
#    Colab:  os.environ["OPENAI_API_KEY"] = "발급받은키"  (노트북 공유 전 반드시 삭제)
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

# 2) 가장 단순한 호출 한 번
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        # system: 이 대화 전체에 걸린 역할 지시
        {"role": "system", "content": "너는 사내 규정을 안내하는 도우미야."},
        # user: 실제 질문
        {"role": "user", "content": "연차는 며칠 전에 신청해야 해?"},
    ],
    temperature=0.2,   # 낮을수록 일관되게, 높을수록 다양하게
)

# 3) 생성된 답변 본문
print(response.choices[0].message.content)

# 4) [핵심 관찰] 토큰 사용량 — 비용과 속도가 여기서 결정된다
usage = response.usage
print("입력 토큰:", usage.prompt_tokens)
print("출력 토큰:", usage.completion_tokens)
print("합계:", usage.total_tokens)

# 5) [직접 비교해 볼 것] 같은 뜻의 문장을 한국어와 영어로 각각 보내고 입력 토큰을 비교한다
#    한국어가 영어보다 토큰을 더 많이 쓰는 경우가 흔하다.
#    토큰 수 = 비용이자 응답 지연이므로, 에이전트를 설계할 때
#    프롬프트 길이와 언어 선택도 설계 요소가 된다.`,note:'토큰화·임베딩이 추상적으로 느껴졌다면 usage 값이 그 개념을 숫자로 보여 준다. 같은 의미의 한국어/영어 프롬프트를 나란히 보내 입력 토큰을 비교해 보면 "언어별 토큰화 효율이 다르다"는 말이 바로 체감된다. 이 관찰 하나가 실습 2의 기술 이해도 항목에서 수업 개념과 내 설계를 연결하는 좋은 재료가 된다.'},{title:"실습 2-B · 에이전트 뼈대 — 역할·과제·실행을 나눠 조립하기",lang:"python",code:`# [목표] 프레임워크(예: CrewAI)로 LLM 에이전트를 구성해 본다.
#        복잡하게 만들 필요 없다. 역할 2개 + 과제 2개면 충분히 동작한다.
# 설치: pip install crewai
import os
from crewai import Agent, Task, Crew

os.environ["OPENAI_API_KEY"] = os.environ.get("OPENAI_API_KEY", "")

# 1) Agent = "누가" — 역할·목표·배경을 문장으로 준다
researcher = Agent(
    role="사내 정책 조사 담당",
    goal="질문에 답하는 데 필요한 근거를 사내 정책에서 찾아 정리한다",
    backstory="회사 규정을 오래 다뤄 조항 간 관계를 잘 아는 담당자다",
    verbose=True,   # 중간 사고 과정을 화면에 보여 준다 (관찰용)
)

writer = Agent(
    role="답변 작성 담당",
    goal="조사된 근거만 사용해 직원이 이해하기 쉬운 답변을 쓴다",
    backstory="어려운 규정을 쉬운 말로 바꾸는 데 능숙한 사내 커뮤니케이터다",
    verbose=True,
)

# 2) Task = "무엇을" — 여기에 ReAct 스타일 단계를 명시하면 훨씬 안정적으로 동작한다
research_task = Task(
    description=(
        "직원 질문에 답하기 전에 다음 순서를 따르세요.\\n"
        "Thought: 먼저 어떤 정책 조항이 관련 있는지 생각한다.\\n"
        "Action: 관련 조항을 찾아 근거로 모은다.\\n"
        "Observation: 찾은 내용을 정리한다.\\n"
        "질문: 연차는 며칠 전에 신청해야 하는가?"
    ),
    expected_output="관련 조항과 근거를 정리한 목록",
    agent=researcher,
)

write_task = Task(
    description="앞 단계에서 정리된 근거만 사용해 3문장 이내로 답변을 작성하세요.",
    expected_output="직원에게 그대로 보낼 수 있는 짧은 답변",
    agent=writer,
)

# 3) Crew = "어떻게" — 누가 어떤 순서로 일할지 묶어 실행한다
crew = Crew(agents=[researcher, writer], tasks=[research_task, write_task], verbose=True)
result = crew.kickoff()
print(result)

# [관찰 포인트] 에이전트가 단계를 거칠 때마다 LLM을 새로 호출한다.
#   매 호출마다 토큰화 -> 임베딩 -> Self-Attention 추론 파이프라인이 처음부터 다시 돈다.
#   그래서 다단계 에이전트는 단일 호출보다 느리고 비용이 크다.`,note:"Agent(누가)·Task(무엇을)·Crew(어떻게)의 3분할만 잡으면 나머지는 문장으로 채우는 작업이다. Task 설명에 Thought/Action/Observation 흐름을 넣는 것은 모델 구조를 바꾸는 게 아니라 입력 설계일 뿐이지만, 단계가 많은 작업일수록 결과 안정성이 눈에 띄게 좋아진다 — Prompt·Context Engineering 과목에서 배운 ReAct가 여기서 그대로 쓰인다."},{title:"실습 2-C · 시나리오 기획 20분 뼈대와 보고서 3페이지 구성",lang:"text",code:`[진행 방식] 데모를 그대로 제출하는 실습이 아니다.
  교수 데모 설명 → 팀별로 "우리만의 시나리오" 기획 → 데모 코드를 그 시나리오에 맞게 수정·실행
  → 의도한 결과가 나오는지 확인 → 그 과정과 결과를 평가받는다.
  ※ 팀 구성과 시간 배분은 각 반 진행 상황에 따라 조정될 수 있으니 담당 교수 안내를 우선한다.

[20분 기획 회의 — 이 4칸만 채우면 된다]
  1. 누가 쓰는가      : 구체적인 사용자 한 명을 정한다 (예: 신입사원, 콜센터 상담원)
  2. 무엇이 불편한가  : 지금 이 일이 없으면 생기는 손해·비효율을 한 문장으로
  3. 어떻게 도울까    : 에이전트를 몇 개 두고 각각 무슨 역할을 맡을지
  4. 무엇이 다른가    : 그냥 챗봇에 물어보는 것과 비교해 뭐가 나은지
  ※ 2번과 4번이 비면 "기술 데모 수준"으로 평가된다 — Biz 가치 항목의 핵심이 이 둘이다.

[시나리오 예시 — 그대로 쓰지 말고 우리 팀 상황으로 바꿀 것]
  · 사내 규정 안내: 조사 에이전트가 근거를 찾고 작성 에이전트가 쉬운 말로 답변
  · 고객 문의 분류: 분류 에이전트가 유형을 나누고 응대 에이전트가 초안 작성
  · 회의록 정리: 요약 에이전트가 핵심을 뽑고 검토 에이전트가 빠진 항목을 점검

[보고서 3페이지 구성 — 페이지가 곧 평가 항목이다]
  1p · 시나리오와 Biz 가치   → 이해관계자, 없을 때의 손해, 기존 방식 대비 차별점
  2p · 기술 설계 근거        → 에이전트를 왜 이렇게 나눴는지, 프롬프트를 왜 그렇게 썼는지
  3p · 수업 개념 반영과 실행 결과 → 사용한 수업 개념 + 실제 실행 화면·출력
  ※ 특정 페이지를 못 채우면 그 페이지와 연결된 평가 항목에서 감점된다.

[자가 점검 — 제출 전에]
  □ 이해관계자가 "직장인" 같은 뭉뚱그린 말이 아니라 구체적인가
  □ 왜 이렇게 설계했는지 스스로 설명한 문장이 있는가 (사용법 설명만으로는 부족)
  □ 수업 개념을 최소 1개, 가능하면 2개 이상 명시적으로 언급했는가
     (토큰화 · 임베딩 · Self-Attention · 자기회귀 생성 · CoT/SC/ReAct 중에서)
  □ 그 개념이 말로만이 아니라 결과물에 실제로 반영된 것이 보이는가
  □ 실행 결과 화면이 보고서에 들어 있는가
  □ 다른 팀 결과물과 지나치게 유사하지 않은가

[개념을 결과물에 "실제로 반영"한다는 것의 예]
  · Self-Attention을 언급했다면 → 프롬프트 앞부분 지시가 뒷부분 생성까지 반영된 사례를 캡처
  · 토큰화를 언급했다면 → 한/영 프롬프트의 토큰 사용량을 비교한 표를 첨부
  · ReAct를 언급했다면 → Task 설명에 넣은 Thought/Action/Observation 구조를 인용`,note:'평가에서 가장 크게 갈리는 항목은 Biz 가치이고, 그 안에서도 "이 서비스가 없으면 무슨 손해가 나는가"와 "기존 방식과 뭐가 다른가"를 적었는지가 결정적이다. 기술 이해도와 수업 충실도는 완벽한 이해를 요구하지 않는다 — 수업에서 들은 개념을 내 설계와 연결해 설명하려는 시도가 있으면 되고, 그 개념이 결과물에 실제로 드러나면 더 좋다.'}],concepts:[{term:"Multi-Head Attention",desc:"한 문장을 여러 명이 각자 다른 관점(문법·의미·어순)으로 동시에 읽고 결과를 합치는 방식으로, 여러 전문가의 의견을 모으는 회의와 같다."},{term:"Positional Encoding(위치 인코딩)",desc:"Attention은 단어 순서를 모르기 때문에 각 단어에 '몇 번째 자리인지' 번호표를 더해주는 장치로, 줄 선 사람들에게 번호표를 나눠주는 것과 같다."},{term:"Feed-Forward Network(FFN)",desc:"Attention이 모은 정보를 각 단어마다 한 번 더 가공하는 작은 신경망으로, 재료를 모은 뒤 각자 요리해 맛을 더하는 단계다."},{term:"잔차연결(Residual Connection)",desc:"층을 통과한 결과에 '원래 입력'을 다시 더해주는 지름길로, 정보가 사라지지 않게 비상 통로를 열어두는 것과 같다."},{term:"Layer Normalization",desc:"각 층의 출력 숫자들을 비슷한 크기로 다듬어 학습을 안정시키는 장치로, 들쭉날쭉한 볼륨을 적정 수준으로 맞추는 음량 조절기와 같다."},{term:"Encoder vs Decoder",desc:"Encoder는 문장 전체를 양방향으로 읽어 '이해'하는 데 강하고(BERT), Decoder는 왼쪽부터 차례로 읽어 '생성'하는 데 강하다(GPT)."},{term:"사전학습·파인튜닝",desc:"방대한 글로 기초 실력을 먼저 쌓는 게 사전학습, 그 모델을 내 업무 데이터로 살짝 더 가르치는 게 파인튜닝으로, 대학 교양 후 전공 특강을 듣는 것과 같다."},{term:"Scaling Law(스케일링 법칙)",desc:"모델 크기·데이터·연산을 늘리면 성능이 예측 가능하게 좋아진다는 경험 법칙으로, LLM을 '무작정 크게' 키운 이유가 되었다."},{term:"In-Context Learning(맥락 내 학습)",desc:"모델을 다시 학습시키지 않고, 프롬프트 안에 예시 몇 개만 보여주면 그 자리에서 패턴을 따라 하는 능력이다(Few-shot)."},{term:"RLHF(인간 피드백 강화학습)",desc:"사람이 여러 답 중 더 좋은 답을 골라 주면, 그 선호를 학습해 모델이 더 도움되고 안전하게 답하도록 정렬(align)하는 방법이다."},{term:"MoE(Mixture of Experts)",desc:"여러 '전문가' 신경망 중 입력마다 일부만 골라 쓰는 구조로, 전체 크기는 키우면서 실제 계산량은 줄여 효율을 높인다."},{term:"Open-Weight vs Closed Model",desc:"가중치를 공개해 직접 내려받아 쓰는 모델(Llama·Qwen 등)과, API로만 쓰는 비공개 모델(GPT·Claude 등)의 구분으로, 벤치마크·Leaderboard로 성능을 비교한다."},{term:"인과적 마스킹(Causal / Masked Self-Attention)",desc:"Decoder가 문장을 생성할 때 아직 나오지 않은 미래 단어를 미리 훔쳐보지 못하게, 자기보다 뒤 자리의 Attention 점수를 -무한대로 가려 0으로 만드는 장치다. 시험 볼 때 뒷장 답을 손으로 가리고 푸는 것과 같다. GPT가 왼쪽에서 오른쪽으로 한 단어씩 예측(자기회귀 생성)할 수 있는 것이 바로 이 마스킹 덕분이며, 미래를 안 가리는 BERT(양방향 이해)와 Decoder를 가르는 결정적 차이다."}],detail:{topics:[{h:"Transformer 블록의 구성 요소",items:["Multi-Head Attention과 표현 부공간","Positional Encoding(사인·코사인)","Feed-Forward Network(FFN)","잔차연결과 Layer Normalization"]},{h:"대표 모델과 구조 차이",items:["Encoder-only: BERT(이해·분류)","Decoder-only: GPT(생성)","Encoder-Decoder: T5(번역·요약)","양방향 vs 단방향(왼쪽→오른쪽) 읽기"]},{h:"사전학습과 활용",items:["사전학습(pre-training)의 목표","파인튜닝과 전이학습","추론·임베딩 추출 활용"]},{h:"Transformer 이후 혁신과 LLM 생태계",items:["Scaling Law: 크게 키우면 성능이 예측 가능하게↑","In-Context Learning: 예시만 보여주면 그 자리에서 학습","RLHF: 사람 선호를 학습해 도움·안전하게 정렬","MoE: 전문가 일부만 골라 써 효율↑","생태계: Open-Weight vs Closed, 벤치마크·Leaderboard","주요 플레이어 — Closed(API 전용): OpenAI GPT·Anthropic Claude·Google Gemini(최고 성능·안전장치, 가중치 비공개)","주요 플레이어 — Open-Weight(가중치 공개): Meta Llama·Alibaba Qwen·Mistral·DeepSeek(직접 파인튜닝·온프레미스 배포 가능)","고르는 기준: 성능·비용·데이터 보안(사내 데이터를 외부 API에 보낼 수 있나)·커스터마이징 필요성","대표 벤치마크 — MMLU(지식·추론)·GSM8K(수학)·HumanEval(코드)·HellaSwag(상식)","리더보드 — HuggingFace Open LLM Leaderboard(공개 모델 자동 채점)·LMSYS Chatbot Arena(사람 블라인드 비교 Elo)","주의: 벤치마크 점수가 높아도 내 업무에선 다를 수 있으니 내 데이터·과제로 직접 평가(오프라인 테스트)하는 습관이 중요"]}],labs:[{title:"Lab 1. Positional Encoding 그려보기",steps:["realCode의 positional_encoding 함수를 그대로 입력한다.","seq_len=50, d_model=64로 PE를 만든다.","plt.imshow로 히트맵을 그려 줄무늬 패턴을 확인한다.","d_model을 16으로 줄여 다시 그려 무늬가 어떻게 단순해지는지 비교한다."]},{title:"Lab 2. BERT로 빈칸 채우기",steps:["pipeline('fill-mask', model='bert-base-uncased')를 만든다.","'The capital of Korea is [MASK].' 를 입력해 예측 단어를 본다.","result 상위 5개 후보와 점수를 출력한다.","[MASK] 위치를 바꾼 다른 문장으로도 시험해 본다."]},{title:"Lab 3. GPT-2로 이어 쓰기 비교",steps:["pipeline('text-generation', model='gpt2')를 만든다.","프롬프트 'Once upon a time'으로 문장을 생성한다.","max_length를 30, 50으로 바꿔 생성 길이 차이를 본다.","같은 프롬프트를 두 번 실행해 결과가 달라지는지(샘플링) 확인한다."]}],homework:["GPT-2 실습에서 서로 다른 프롬프트 3개를 넣어 'top-5 다음 토큰'을 각각 표로 정리하고, 프롬프트에 따라 예측이 어떻게 달라지는지 3문장으로 해석해 제출한다.","BERT(Encoder)와 GPT(Decoder)의 차이를 '이해 vs 생성' 관점에서 비유 하나를 넣어 한 문단으로 정리한다."]},theory:{theory:[{h:"Encoder는 다 보고, Decoder는 왼쪽만 본다",body:`BERT(Encoder)와 GPT(Decoder)는 같은 블록을 쓰지만 '무엇까지 볼 수 있게 하느냐'가 다르다.
Encoder는 문장 전체를 한꺼번에 양방향으로 봐서 이해·분류·유사도에 강하다. 빈칸 채우기처럼 앞뒤 문맥을 모두 활용하기 때문이다.
Decoder는 인과적 마스킹으로 '지금 단어까지'만 보게 막아, 다음 단어를 예측하며 왼쪽에서 오른쪽으로 글을 지어낸다. 이것이 자기회귀(autoregressive) 생성이다.

그래서 챗봇·글쓰기 같은 생성 작업은 대부분 Decoder-only(GPT·Llama·Claude 계열) 구조를 쓴다.
정리하면, 마스킹을 켜면 생성기(Decoder), 끄면 이해기(Encoder)가 된다는 한 스위치로 두 계열을 꿸 수 있다.`},{h:"Multi-Head Attention은 여러 전문가의 회의다",body:`어려운 문서를 혼자 읽는 것보다 여러 사람이 각자 관점으로 읽고 의견을 합치면 더 정확하다.
문법을 보는 사람, 주제를 보는 사람, 어순을 보는 사람이 따로 읽고 회의로 종합하는 장면을 떠올리면 된다.

Multi-Head Attention이 바로 이 회의다.
하나의 Attention만 쓰지 않고, 여러 개(head)를 두어 같은 문장을 서로 다른 표현 부공간에서 동시에 바라본다.
각 head가 만든 결과를 옆으로 이어 붙인 뒤 한 번 더 섞어서 최종 표현을 만든다.
덕분에 모델은 '이 단어가 주어인가'와 '이 단어가 감정 표현인가' 같은 여러 관계를 한꺼번에 포착할 수 있다.`},{h:"순서를 모르는 Attention에 번호표 주기",body:`Self-Attention은 모든 단어를 한눈에 펼쳐 보는 대신, 단어가 몇 번째에 있었는지를 잊어버린다.
'개가 사람을 물었다'와 '사람이 개를 물었다'는 순서만 다른데, 순서를 모르면 뜻이 뒤섞인다.

그래서 각 단어 임베딩에 '몇 번째 자리'라는 정보를 숫자로 더해주는데, 이것이 Positional Encoding이다.
원래 Transformer는 사인·코사인 곡선을 이용해 자리마다 고유한 무늬의 숫자를 만들어 더한다.
이렇게 하면 모델은 단어의 뜻뿐 아니라 '어디쯤에 있었는지'까지 함께 알게 된다.
줄 선 사람들에게 1번·2번 번호표를 나눠줘 순서를 기억시키는 것과 똑같은 아이디어다.`},{h:"Transformer 블록은 레고처럼 쌓는다",body:`Transformer는 마법 상자가 아니라, 똑같이 생긴 블록을 여러 층 쌓아 만든 탑이다.
블록 하나에는 Multi-Head Attention과 작은 신경망(FFN)이 들어 있고, 그 사이사이에 잔차연결과 LayerNorm이라는 안전장치가 끼워진다.

잔차연결은 층을 통과한 결과에 원래 입력을 더해, 깊이 쌓아도 정보가 사라지지 않게 비상 통로를 만들어준다.
LayerNorm은 숫자 크기를 고르게 다듬어 학습이 흔들리지 않게 잡아준다.
이 블록을 BERT는 양방향으로 읽도록, GPT는 왼쪽부터만 읽도록 배치해 각각 이해와 생성에 특화시킨다.
결국 거대한 LLM도 이 단순한 블록을 아주 많이 쌓고, 아주 많은 글로 훈련한 결과일 뿐이다.`},{h:"Transformer 이후: 더 크게, 그리고 더 사람에 맞게",body:`Transformer 구조가 나온 뒤 LLM은 두 방향으로 발전했다.
첫째는 '크기'다. 모델·데이터·연산을 늘리면 성능이 예측 가능하게 좋아진다는 Scaling Law가 확인되면서, 모두가 모델을 키우기 시작했다.
그 과정에서 예상 못 한 능력도 생겼는데, 예시 몇 개만 보여주면 다시 학습하지 않고도 그 자리에서 따라 하는 In-Context Learning이 대표적이다.

둘째는 '사람에 맞추기'다. 크기만 키운 모델은 똑똑해도 엉뚱하거나 불친절할 수 있어, 사람이 더 좋은 답을 골라 주면 그 선호를 학습하는 RLHF로 도움되고 안전하게 다듬는다.
또 전체를 다 키우면 계산이 너무 무거워서, 입력마다 여러 '전문가' 중 일부만 골라 쓰는 MoE(Mixture of Experts)로 크기와 효율을 함께 잡는다.
이렇게 나온 모델들은 가중치를 공개한 Open-Weight(Llama·Qwen 등)와 API로만 쓰는 Closed(GPT·Claude 등)로 나뉘고, 벤치마크·Leaderboard로 성능을 겨룬다.`},{h:"Transformer 이후 혁신 ① — Scaling Law와 In-Context Learning",body:`Transformer라는 좋은 구조가 나온 뒤, 사람들은 한 가지 놀라운 사실을 발견했다. '모델을 키우면 키우는 만큼 성능이 예측 가능하게 좋아진다'는 것이다. 이것을 Scaling Law(스케일링 법칙)라고 한다.

무엇을 키우나? 세 가지다. ① 모델 크기(파라미터 수), ② 학습 데이터 양, ③ 학습에 쓴 계산량. 이 셋을 늘리면 '다음 단어 맞히기'의 오차가 매끄러운 곡선을 그리며 줄어든다. 곡선이 매끄럽다는 건, 실험 전에도 '이만큼 키우면 이 정도 좋아지겠다'를 대략 예상할 수 있다는 뜻이다. 그래서 세계의 기업들이 앞다투어 모델을 키우는 '규모 경쟁'에 뛰어들었다. 다만 무작정 파라미터만 키우면 안 되고, 데이터도 그에 맞춰 함께 늘려야 효율이 좋다는 것(적절한 균형)이 이후 연구에서 밝혀졌다.

그런데 크게 키우다 보니 아무도 가르치지 않은 능력이 '창발(emergent)'했다. 대표가 In-Context Learning(맥락 내 학습)이다. 모델을 다시 훈련시키지 않고도, 프롬프트 안에 예시 몇 개만 적어 주면 그 자리에서 패턴을 따라 하는 능력이다.
예를 들어 프롬프트에 '행복→happy, 슬픔→sad, 사랑→' 이렇게 몇 쌍만 보여 주면 모델이 'love'를 이어 준다. 예시 0개면 zero-shot, 1개면 one-shot, 몇 개면 few-shot이라고 부른다.

이게 왜 대단한가? 보통 '학습'은 무거운 재훈련 과정인데, In-Context Learning은 추론하는 순간(프롬프트를 읽는 순간)에 즉석에서 일어난다. 우리가 프롬프트에 예시와 형식을 잘 적어 주기만 해도 모델이 곧잘 따라오는 이유, 즉 프롬프트 엔지니어링이 통하는 근본 원리가 바로 이 능력이다.`},{h:"Transformer 이후 혁신 ② — RLHF와 MoE",body:`크게 키운 모델은 똑똑하지만, 그것만으로는 우리가 아는 ChatGPT 같은 '친절한 비서'가 되지 않는다. 사전학습만 끝낸 모델은 그저 '다음 단어를 그럴듯하게 잇는' 선수일 뿐, 질문에 도움되게·안전하게 답하도록 다듬어지진 않았기 때문이다. 이 마지막 다듬기가 RLHF(인간 피드백 기반 강화학습)다.

RLHF는 보통 세 단계로 진행된다.
1) 시범 학습(SFT) — 사람이 만든 '좋은 질문-답변' 예시로 먼저 예의 바르게 답하는 법을 가르친다.
2) 보상 모델 만들기 — 같은 질문에 모델이 여러 답을 내면, 사람이 '이게 더 낫다'고 순위를 매긴다. 이 사람의 선호를 학습한 채점기(보상 모델)를 만든다.
3) 강화학습 — 모델이 보상 모델에게서 높은 점수를 받는 방향으로 답변 습관을 조금씩 교정한다.
결과적으로 모델은 사람의 취향에 '정렬(align)'되어 더 도움되고 안전하게 답한다. 최근에는 이 과정을 더 간단히 만든 DPO 같은 방법도 널리 쓰인다(핵심 아이디어는 같다: 사람이 선호한 답을 더 내도록 학습).

또 하나의 혁신은 효율에 관한 것이다. 모델을 무작정 키우면 계산 비용이 감당 안 되는데, 이를 푸는 영리한 구조가 MoE(Mixture of Experts, 전문가 혼합)다.
블록 안에 하나의 큰 신경망 대신 여러 개의 '전문가' 신경망을 두고, 입력 토큰마다 라우터가 그중 일부(예: 8명 중 2명)만 골라 쓴다. 그래서 모델 전체가 가진 지식(파라미터 총량)은 어마어마하게 크지만, 한 토큰을 처리할 때 실제로 켜지는 부분은 작아 계산이 가볍다.
비유하면 큰 병원에 전문의가 수십 명 있어도 환자 한 명은 필요한 두세 명만 만나는 것과 같다. Mixtral, DeepSeek 같은 최신 오픈 모델들이 이 구조로 '큰 용량 + 낮은 계산비'를 동시에 잡았다. 정리하면 RLHF는 모델을 사람에게 맞추는 기술, MoE는 크기와 효율을 함께 잡는 기술이다.`},{h:"LLM 생태계 — Open-Weight vs Closed, 그리고 성능 평가",body:`이제 실무자의 질문으로 내려오자. '그래서 나는 어떤 LLM을 써야 하나?' 오늘날 모델은 크게 두 진영으로 나뉜다.

· Closed(비공개) 모델 — OpenAI의 GPT, Anthropic의 Claude, Google의 Gemini가 대표다. 가중치를 공개하지 않고 API로만 빌려 쓴다. 대체로 최고 수준의 성능과 안전장치를 갖췄지만, 내 데이터를 외부 서버로 보내야 하고 세밀한 커스터마이징엔 제약이 있다.
· Open-Weight(가중치 공개) 모델 — Meta의 Llama, Alibaba의 Qwen, Mistral, DeepSeek 등이다. 가중치를 직접 내려받아 내 서버(온프레미스)에서 돌리고, 내 데이터로 파인튜닝할 수 있다. 데이터가 밖으로 안 나가고 자유도가 높은 대신, 운영과 튜닝을 내가 책임져야 한다.

고르는 기준은 네 가지로 요약된다. ① 성능(내 과제를 잘 푸나) ② 비용(호출당·운영 비용) ③ 데이터 보안(사내 기밀을 외부 API에 보내도 되나) ④ 커스터마이징 필요성(내 데이터로 깊이 학습시켜야 하나). 예컨대 민감한 사내 문서를 다뤄야 하면 Open-Weight를 온프레미스로, 빠르게 최고 성능이 필요하면 Closed API를 택하는 식이다.

그럼 성능은 어떻게 비교할까? 표준 시험지인 벤치마크가 있다. MMLU(폭넓은 지식·추론), GSM8K(수학 문제풀이), HumanEval(코딩), HellaSwag(상식) 등이 대표적이다. 여러 모델을 한 줄로 세워 겨루는 리더보드도 있다. HuggingFace Open LLM Leaderboard는 공개 모델을 자동 채점하고, LMSYS Chatbot Arena는 사람이 어느 모델 답인지 모른 채(블라인드) 둘을 비교 투표해 체스처럼 Elo 점수를 매긴다.

마지막으로 꼭 강조할 점. 벤치마크 점수가 높다고 내 업무에서도 최고인 건 아니다. 시험 문제가 학습 데이터에 새어 들어가는 오염 문제도 있고, 내 도메인 말투·양식은 벤치마크에 없기 때문이다. 그래서 실무에서는 반드시 '내 데이터·내 과제'로 직접 돌려 보는 오프라인 평가를 습관화해야 한다. 리더보드는 후보를 추리는 참고서일 뿐, 최종 결정은 내 데이터가 내린다.`}]},realCodes:[{title:"Positional Encoding 만들고 시각화하기 (엔드투엔드)",lang:"python",code:`import numpy as np                       # 수치 계산 라이브러리
import matplotlib.pyplot as plt           # 그래프 시각화 라이브러리

def positional_encoding(seq_len, d_model):    # 길이와 차원을 받아 위치 인코딩 생성
    pe = np.zeros((seq_len, d_model))         # (위치 x 차원) 0으로 채운 빈 표 준비
    position = np.arange(seq_len)[:, None]    # 0,1,2,... 위치 번호를 세로 벡터로
    # 차원 인덱스마다 주기를 다르게 하는 분모 계산
    div = np.exp(np.arange(0, d_model, 2) * (-np.log(10000.0) / d_model))
    pe[:, 0::2] = np.sin(position * div)      # 짝수 차원은 사인 곡선 값으로 채움
    pe[:, 1::2] = np.cos(position * div)      # 홀수 차원은 코사인 곡선 값으로 채움
    return pe                                 # 완성된 위치 인코딩 표 반환

seq_len, d_model = 50, 64                     # 토큰 50개, 차원 64로 설정
pe = positional_encoding(seq_len, d_model)    # 위치 인코딩 표 생성
print("PE shape:", pe.shape)                  # 결과: PE shape: (50, 64)

plt.imshow(pe, aspect="auto", cmap="viridis") # 표를 색상 무늬 이미지로 그림
plt.xlabel("차원(dimension)")                  # 가로축: 임베딩 차원
plt.ylabel("위치(position)")                   # 세로축: 토큰 위치
plt.colorbar()                                # 값-색 대응 막대 추가
plt.title("Positional Encoding")              # 그래프 제목
plt.show()                                    # 화면에 출력(줄무늬 패턴이 보임)`,note:`자리마다 사인·코사인이 만들어내는 고유한 줄무늬 패턴을 눈으로 확인할 수 있다.
이 표를 단어 임베딩에 더하면 모델이 순서를 알게 된다.`},{title:"사전학습 BERT로 문장 임베딩 뽑아 유사도 비교 (엔드투엔드)",lang:"python",code:`import torch                                   # 딥러닝 텐서 연산 라이브러리
from transformers import AutoTokenizer, AutoModel  # 토크나이저와 모델 불러오기

tok = AutoTokenizer.from_pretrained("bert-base-uncased")  # BERT 토크나이저 로드
model = AutoModel.from_pretrained("bert-base-uncased")    # BERT 본체 모델 로드
model.eval()                                    # 추론 모드(학습 끔)로 전환

def embed(text):                                # 문장을 하나의 벡터로 바꾸는 함수
    inputs = tok(text, return_tensors="pt")     # 문장을 텐서 형태로 토큰화
    with torch.no_grad():                       # 기울기 계산 끔(추론이라 불필요)
        out = model(**inputs)                   # 모델에 넣어 출력 얻기
    return out.last_hidden_state.mean(dim=1)    # 토큰 벡터 평균으로 문장 벡터화

a = embed("I love cats")                         # 1번 문장 임베딩
b = embed("I adore kittens")                     # 2번 문장(비슷한 뜻) 임베딩
c = embed("The stock market crashed")            # 3번 문장(다른 뜻) 임베딩

cos = torch.nn.functional.cosine_similarity     # 코사인 유사도 함수 별칭
print("비슷한 문장:", round(cos(a, b).item(), 3))   # 결과 예: 비슷한 문장: 0.9 근처(높음)
print("다른 문장:", round(cos(a, c).item(), 3))     # 결과 예: 다른 문장: 0.6 근처(낮음)`,note:"뜻이 비슷한 문장끼리는 코사인 유사도가 높고, 다른 주제 문장과는 낮게 나오는 것을 통해 임베딩이 의미를 담고 있음을 확인한다."}],periods:["[강의] Multi-Head Attention — 여러 명이 각자 관점으로 읽기","[강의] Positional Encoding·FFN·잔차연결(Residual)·LayerNorm 조립","[강의] Encoder vs Decoder, 그리고 BERT·GPT·T5","[실습] 사전학습 BERT로 문장 임베딩 뽑아 유사도 비교하기","[강의] Transformer 이후 혁신 ① Scaling Law · In-Context Learning","[강의] Transformer 이후 혁신 ② RLHF · MoE(Mixture of Experts)","[강의] LLM 생태계: Open-Weight vs Closed Model, 벤치마크·Leaderboard","[실습] GPT-2로 문장 생성하고 다음 토큰 확률 들여다보기"]}};export{n as default};
