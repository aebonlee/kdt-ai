const e={"transformer2-1":{plan:{schedule:[{time:"09:00–09:50",topic:"[강의] Software 1.0→3.0 — LLM, 언어가 인터페이스가 되다"},{time:"10:00–10:50",topic:"[강의] 토큰화와 임베딩 — 벡터 공간과 거리(맨해튼·유클리드)·유사도"},{time:"11:00–11:50",topic:"[강의] RNN·LSTM의 한계 — 순차 처리와 장기 의존성"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"[강의] Self-Attention과 Query·Key·Value, softmax로 확률 만들기"},{time:"14:00–14:50",topic:"[실습] 실습1-1 — PyTorch LSTM(CharLSTM)으로 한국어 문장 생성"},{time:"15:00–15:50",topic:"[실습] 실습1-1 — 장기 의존성 한계 관찰·생성 결과 캡처"},{time:"16:00–16:50",topic:"[실습] 실습1-2 — 사전학습 GPT-2로 같은 과제 재생성"},{time:"17:00–17:50",topic:"[실습] 실습1 마무리 — LSTM vs Transformer 비교 리포트 작성"}],practice:{title:"실습1. 딥러닝(LSTM) vs Transformer 문장 생성 비교 — 개인 (practice_1-1, practice_1-2)",steps:["제공된 code.zip을 풀고 VS Code에서 실습 폴더를 연 뒤 `python3 -m venv .venv && source .venv/bin/activate` 로 가상환경을 만들고 `python -m pip install -r requirements-llm.txt` 로 torch·numpy 등 실습 패키지를 설치한다.","[실습1-1 · practice_1-1.ipynb] 한국어 말뭉치를 문자 단위로 토큰화하고 정수 인덱스로 인코딩한 뒤, nn.Embedding → nn.LSTM(hidden_size=50, num_layers=2) → nn.Linear(hidden_size, vocab_size) 구조(CharLSTM)로 '다음 문자 예측' 언어모델을 구성한다.","CrossEntropyLoss + Adam으로 학습 루프를 돌려 loss가 감소하는지 확인하고, 시작 토큰을 넣어 은닉상태(hidden state)를 순차 전달하며 문장을 자기회귀(autoregressive)로 생성한다.","[한계 관찰] 문장이 길어질수록 앞부분 맥락(주어·인물관계)이 희석되는 장기 의존성(long-term dependency) 한계를, 긴 생성 예시로 직접 캡처한다 — 순차 처리라 병렬화가 어렵고 느리다는 점도 확인 → 'Transformer가 필요한 이유'로 연결한다.","[실습1-2 · practice_1-2.ipynb] 같은 '다음 토큰 예측' 과제를 Transformer 계열 사전학습 모델로 다시 푼다 — transformers 라이브러리에서 GPT2Tokenizer·GPT2LMHeadModel을 from_pretrained('gpt2')로 불러와 문장을 생성한다(직접 구현이 아니라 사전학습 모델 활용).","generate()에 attention_mask와 pad_token_id(eos 대체)를 지정해 실행하고, 내부적으로는 Self-Attention(Q·K·V, scaled dot-product QKᵀ/√d_k)·causal mask로 모든 위치를 한 번에 참조하며 다음 토큰을 예측한다는 점을 오전 강의(15~16교시) 내용과 연결한다.","[비교 관찰] '직접 학습한 소형 LSTM' vs '사전학습된 대형 Transformer(GPT-2)'의 생성 결과를 나란히 캡처해 자연스러움·문맥 유지 차이를 비교하고, temperature·top_k 등 생성 파라미터 변화와 N²(문장 길이 제곱) 연산량·컨텍스트 윈도우 한계도 함께 짚는다.","[제출물] LSTM·Transformer 생성 코드·결과와, 두 모델의 한계·개선점을 비교한 리포트를 작성한다."],deliverable:"LSTM 기반 생성 코드·결과 / Transformer 기반 생성 코드·결과 / 두 모델의 한계·개선점 비교 리포트. ※ 평가: 실습1 100점 = 1-1 LSTM(RNN) 문장생성 정상동작 40 + 1-2 Transformer 대체 문장생성 정상동작 60 (정상 동작 여부 중심)"},figures:[{src:"/images/manhattan-distance.svg",title:"맨해튼 거리 vs 유클리드 거리",caption:"격자 도시에서 가로·세로로만 이동한 거리의 합(L1, 노랑 실선)과 직선 거리(L2, 파랑 점선). 임베딩 벡터의 '가까움'을 재는 거리 척도의 출발점이다."},{src:"/images/softmax.svg",title:"소프트맥스 — 점수를 확률로",caption:"출력층의 제각각인 점수(logits)를 0~1 확률로 정규화해 총합을 1로 만든다. 다음 토큰 확률 분포와 Self-Attention 가중치, 오늘 수업 두 곳 모두에 등장한다."}]},examples:[{title:"CharLSTM — 문자 단위 LSTM 언어모델 뼈대 (practice_1-1)",lang:"python",code:`import torch
import torch.nn as nn

# Embedding -> LSTM -> Linear : '다음 문자 예측' 언어모델
class CharLSTM(nn.Module):
    def __init__(self, input_size, hidden_size=50, num_layers=2):
        super().__init__()
        self.embedding = nn.Embedding(input_size, hidden_size)  # 문자 -> 벡터
        self.lstm = nn.LSTM(hidden_size, hidden_size, num_layers, batch_first=True)  # 순차 처리
        self.fc = nn.Linear(hidden_size, input_size)            # 다음 문자 점수(logits)

    def forward(self, x, hidden=None):
        x = self.embedding(x)
        out, hidden = self.lstm(x, hidden)   # hidden(기억)을 다음 스텝으로 전달
        return self.fc(out), hidden`,note:"hidden_size=50은 LSTM의 '기억 공간' 크기다. 문장이 길어질수록 이 고정 크기 기억에 앞 문맥이 눌려 담기며 흐려진다 — 오늘 실습에서 직접 관찰할 장기 의존성 한계의 원인이다."},{title:"사전학습 GPT-2로 같은 과제 다시 풀기 (practice_1-2)",lang:"python",code:`from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

tokenizer = GPT2Tokenizer.from_pretrained('gpt2')   # 토크나이저 로드
model = GPT2LMHeadModel.from_pretrained('gpt2')     # 사전학습 Transformer 로드

inputs = tokenizer('The future of AI is', return_tensors='pt')
out = model.generate(
    inputs['input_ids'],
    attention_mask=inputs['attention_mask'],
    max_length=40,
    do_sample=True, temperature=0.8, top_k=50,
    pad_token_id=tokenizer.eos_token_id,  # GPT-2는 pad 토큰이 없어 eos로 대체
)
print(tokenizer.decode(out[0], skip_special_tokens=True))`,note:"직접 학습한 소형 LSTM과 달리, GPT-2는 대규모 코퍼스로 미리 학습된 Transformer다. Self-Attention이 모든 위치를 한 번에 참조하므로 긴 문장에서도 앞 문맥이 유지된다 — 보고서에서 이 차이를 자신의 말로 비교한다."},{title:"맨해튼·유클리드 거리 직접 계산 — 임베딩 '가까움'의 척도",lang:"python",code:`import numpy as np

a = np.array([1, 1])   # 지점 A (임베딩 벡터라고 생각해도 된다)
b = np.array([5, 4])   # 지점 B

manhattan = np.abs(a - b).sum()          # |dx| + |dy| = 4 + 3
euclidean = np.sqrt(((a - b) ** 2).sum())  # sqrt(4^2 + 3^2)

print('맨해튼 거리(L1):', manhattan)   # 7  — 격자 골목만 따라 이동(택시 거리)
print('유클리드 거리(L2):', euclidean) # 5.0 — 자로 잰 직선 거리

# 코사인 유사도 — 거리 대신 '방향(각도)'으로 비슷함을 잰다 (고차원 임베딩 비교의 표준)
cos = (a @ b) / (np.linalg.norm(a) * np.linalg.norm(b))
print('코사인 유사도:', round(float(cos), 4))`,note:"임베딩 공간에서 '비슷한 의미 = 가까운 벡터'다. 무엇으로 가까움을 재느냐(맨해튼 L1 · 유클리드 L2 · 코사인)가 오늘 배우는 벡터 공간 감각의 출발점이다."}],concepts:[{term:"맨해튼 거리(Manhattan Distance)",desc:"격자(바둑판) 모양 도시에서 두 지점 사이를 이동할 때 수평·수직 이동 거리의 합이다. 대각선 없이 가로·세로 골목만 따라 이동해야 하는 미국 뉴욕 맨해튼의 도로망에서 유래해 '택시 거리'라고도 불린다. 수식은 |x₁−x₂| + |y₁−y₂| (L1 거리). 임베딩 벡터끼리 얼마나 가까운지(비슷한 의미인지)를 재는 거리 척도 중 하나다."},{term:"유클리드 거리와 코사인 유사도",desc:`유클리드 거리(L2) — 두 점을 자로 잰 직선 거리(√((x₁−x₂)²+(y₁−y₂)²))로, 맨해튼 거리보다 항상 같거나 짧다.
코사인 유사도 — 거리 대신 두 벡터가 이루는 각도로 비슷함을 재는 방법. 임베딩처럼 고차원 벡터의 의미 비교에는 방향(각도)이 더 중요해 실무에서 널리 쓰인다.`},{term:"소프트맥스(Softmax) 함수",desc:"딥러닝의 다중 클래스 분류(Multi-class Classification)에서 쓰는 활성화 함수다. 여러 클래스(예: 강아지·고양이·호랑이) 중 하나를 예측할 때, 출력층의 점수를 0~1 사이 확률로 정규화해 총합이 항상 1이 되게 만든다. 언어모델에서는 '다음 토큰'의 확률 분포를 만들 때, Self-Attention에서는 QKᵀ/√d_k 점수를 attention 가중치(합=1)로 바꿀 때 — 오늘 수업 두 곳 모두에 등장한다."},{term:"Corpus와 Vocabulary",desc:`기계가 언어를 이해하려면 언어를 수치로 변환해야 하는데, 그 재료가 되는 '수집하여 가지고 있는 모든 단어들'이 Corpus다.
NLP 작업을 위해 Corpus에서 뽑은 단어들이 Vocabulary이며, One-hot vector의 크기(N=단어 개수)도 여기서 정해진다. (교재 p.34)`},{term:"TF-IDF",desc:`'어떤 단어가 중요한가'를 가리는 빈도 기반 지표다.
TF(많이 나오면 중요)에 IDF(다른 문서에도 흔하면 중요도 하락)를 곱해, 이 문서에서 정말 특징적인 단어를 찾아낸다. (p.36)`},{term:"분포가설(Distributional Hypothesis)",desc:`단어의 의미는 그 단어가 나타나는 문맥이 정의하며, 비슷한 문맥에서 쓰이는 단어는 의미도 비슷하다는 가설이다("You shall know a word by the company it keeps").
Word2Vec 등 워드 임베딩이 이 가설의 딥러닝 구현이다. (p.39)`},{term:"Contextual Embedding(문맥적 임베딩)",desc:`Word2Vec류는 '한 단어=고정 벡터 하나'라 동음이의어('배'=과일/선박/신체)를 구분하지 못한다.
Transformer 기반 임베딩은 같은 단어라도 문맥에 따라 다른 벡터를 생성한다 — "money in the bank"와 "river bank"의 bank가 서로 다른 좌표에 놓인다. (p.48)`},{term:"전이학습(Transfer Learning)과 Pretrained Model",desc:`유사한 데이터로 미리 학습해 둔 모델이 Pretrained Model이고, 이를 바탕으로 내 문제를 푸는 접근이 전이학습이다.
실습1-2에서 사전학습 GPT-2를 그대로 불러와 문장을 생성하는 것이 바로 이 개념의 체감이다. (p.49)`}],detail:{topics:[{h:"Intro — Software 3.0과 AI 시대",items:["전통적 개발은 함수를, AI 소프트웨어는 모델을 만든다","Software 1.0(규칙 코딩) → 2.0(데이터로 학습) → 3.0(목표 정의로 사고·행동)",'"소프트웨어의 인터페이스는 API가 아니라 언어다" — 개발자는 문제정의자·사고 설계자로',"LLM = 추론엔진·지식 인터페이스·자연어 컴파일러·에이전트의 두뇌","AI 2~3년 주기 퀀텀 점프: 2012 AlexNet → 2017 Attention Is All You Need → 2022 ChatGPT","증강 지능 — 대체가 아니라 인간 의사결정의 향상"]},{h:"NLP에서 LLM까지 — 언어의 수치화 여정",items:["Corpus·Vocabulary, One-hot vector, BoW(빈도 표현)","N-Gram(순서 일부 보존)·TF-IDF(중요 단어 선별)와 차원의 저주","분포가설 → Word2Vec 임베딩 (King−Man+Woman=Queen)","언어모델 = 단어 시퀀스에 확률 할당, 다음 단어 예측","RNN(hidden state) → vanishing gradient → LSTM/GRU(게이트) → Seq2Seq(압축 소실)","Attention의 등장과 Contextual Embedding('배'의 세 가지 의미 구분)"]},{h:"Self-Attention 수학 — 유사도에서 어텐션까지",items:["코사인 유사도 — 내적을 벡터 크기로 정규화(L2), 각도 기반 유사도","내적의 기하학적 의미 — 정사영 길이 × 벡터 길이","벡터 거리 비교 사례 — 유클리드 거리 vs 코사인 유사도 (맨해튼 거리 포함)","입력 × W^Q·W^K·W^V → Q(질문)·K(색인)·V(내용)","QKᵀ Score Matrix — (i,j) = i토큰이 j토큰을 주목하는 정도","√d_k 스케일링 + Softmax 확률화 → V 가중합 = 문맥 벡터","Attention(Q,K,V) = Softmax(QKᵀ/√d_k)V"]}],labs:[{title:"Lab. 거리 척도 3종 비교 — 어떤 '가까움'이 맞을까",steps:["넘파이로 2차원 점 A(1,1)·B(5,4)의 맨해튼·유클리드 거리를 계산한다(7 vs 5).","같은 두 벡터의 코사인 유사도를 계산하고, 벡터 길이를 2배로 늘려도 코사인 값은 그대로임을 확인한다.","고차원 임베딩 비교에 코사인이 널리 쓰이는 이유(방향=의미, 길이는 빈도 영향)를 한 줄로 정리한다."]},{title:"Lab. 생성 파라미터 실험 — temperature·top_k",steps:["practice_1-2의 generate()에서 temperature를 0.3 / 0.8 / 1.5로 바꿔 같은 프롬프트로 3회 생성한다.","top_k를 5 / 50으로 바꿔 문장의 다양성과 안정성이 어떻게 달라지는지 캡처한다.","softmax 확률 분포가 temperature에 따라 '뾰족해지고 평평해지는' 원리와 연결해 설명한다."]}],homework:["개인 보고서(1페이지): LSTM vs GPT-2 생성 비교 + 차이의 이유(장기 의존성·Self-Attention) — 오늘 밤 12시 정각 전(24:00) 슬랙 2반 제출","practice_0(CoT·SC·ReAct)을 실행해 프롬프트 기법별 응답 차이를 캡처해 보고서에 포함"]},theory:{theory:[{h:"Software 1.0 → 3.0 — '언어가 코드가 되는 순간' (교재 pp.3-16)",body:`교재는 소프트웨어 개발 방식을 세 단계로 정리한다. Software 1.0은 사람이 규칙을 코드로 직접 작성하는 방식, 2.0은 사람이 데이터를 주고 모델을 학습시키는 방식, 3.0은 사람이 목표(역할)를 정의하면 모델이 스스로 사고하고 행동하는 방식이다.
요리에 비유하면 1.0은 레시피를 한 줄씩 직접 쓰는 것, 2.0은 요리 사진을 잔뜩 보여주며 요리사를 훈련시키는 것, 3.0은 "손님이 좋아할 저녁을 차려줘"라고 목표만 말하는 것이다.
이제 소프트웨어의 인터페이스는 API가 아니라 **언어(Language)**이며, 개발자는 코드 작성자에서 문제정의자·사고 설계자로 역할이 바뀐다.
이 관점에서 LLM은 단순한 AI가 아니라 사고를 실행하는 플랫폼 — 추론엔진·지식 인터페이스·자연어 컴파일러·에이전트의 두뇌다.`},{h:"빈도 기반 표현과 그 한계 — One-hot·BoW·N-Gram·TF-IDF (pp.34-37)",body:`기계가 언어를 이해하려면 언어를 수치로 바꿔야 한다. 모든 단어의 모음이 Corpus, NLP 작업을 위해 뽑은 단어들이 Vocabulary다.
가장 단순한 표현이 단어마다 번호를 매긴 One-hot vector, 문장을 단어 빈도로 표현한 것이 BoW(Bag of Words)다 — 책을 '단어별 등장 횟수 표'로만 요약하는 셈이라 순서를 잃는다.
N-Gram은 연속된 n개 단어 뭉치로 순서를 일부 보존하고, TF-IDF는 '많이 나오지만 다른 문서에도 흔한 단어는 덜 중요하다'는 보정으로 특징적인 단어를 가려낸다.
그러나 빈도 기반 표현은 단어 수가 늘수록 벡터가 거대해지는 **차원의 저주**에 빠지고, '동생'과 '아우'처럼 표기가 달라도 의미가 같은 단어의 관계 표현에 취약하다.`},{h:"분포가설과 Word2Vec — 의미를 좌표로 옮기다 (pp.39-43)",body:`"You shall know a word by the company it keeps" — 단어의 의미는 그 단어가 나타나는 문맥이 정의한다는 것이 분포가설이다. 친구를 보면 그 사람을 알 수 있다는 속담과 같은 원리다.
Word2Vec은 이 가설의 딥러닝 구현으로, 함께 출현한 단어로 학습 데이터를 만들어 주변 단어와 타겟 단어 간의 분류 문제로 학습하면 단어들의 관계가 임베딩 공간에 투영된다.
그 결과 **King − Man + Woman = Queen**처럼 단어 간 더하기·빼기가 가능해지고 유사도 기반 검색에 활용된다.
단어 간 관계가 수많은 문장 읽기로 형성되는 과정은, 사람이 계속 읽고 들으며 언어를 배우는 것과 비슷하다.`},{h:"언어모델(LM) — 가장 자연스러운 다음 단어 찾기 (p.44)",body:`"퇴근 후 공항에 택시를 타고 갔는데, 탑승시간에 늦어서 결국 비행기를 ( )" — 앞 단어들을 보고 괄호에 들어갈 그럴듯한 단어를 추론하는 것이 언어를 이해하는 것과 일맥상통한다.
언어모델은 가장 자연스러운 단어 시퀀스를 찾아내는 모델이고, 이는 단어 시퀀스에 **확률을 할당**한다는 뜻이다.
문장 앞부분이 주어졌을 때 후보 단어들의 등장 확률을 데이터로부터 추정해 가장 높은 확률의 단어를 고른다.
끝말잇기 고수가 다음에 올 말을 자연스럽게 떠올리듯, 모델도 앞 단어들의 history를 보고 다음 단어를 추론한다.`},{h:"RNN·LSTM — 컨베이어 벨트의 기억력과 장기 의존성의 벽 (pp.45-46)",body:`RNN은 컨베이어 벨트처럼 단어를 한 개씩 순서대로 처리하며, 앞선 기록을 hidden state로 기억해 다음 예측에 쓴다.
그러나 학습에서 기울기가 점점 작아지는 vanishing gradient 때문에 앞 시점이 거의 학습되지 않아, 문장이 길수록 **장기 의존성** 학습에 실패한다 — 말 전달 게임에서 사람을 많이 거칠수록 처음 말이 흐려지는 것과 같다.
LSTM은 input·output·memory 게이트로 정보 흐름을 섬세하게 제어해 이를 완화했지만 구조가 복잡하고 연산비용이 크며, GRU는 유사 성능을 경량화한 변형이다.
Seq2Seq는 Encoder가 전체 맥락을 하나의 Context vector로 압축해 Decoder에 넘기는 구조라, 입력이 길어지면 압축 과정에서 정보가 소실돼 정확도가 떨어진다.
오늘 실습1-1에서 이 한계를 생성 문장으로 직접 관찰한다.`},{h:"Attention — 순서의 파괴, 전체를 조망하다 (pp.47-48)",body:`"…탑승시간에 늦어서 그것을 (환불했다)"에서 '그것'을 유추하려면 문장 전체를 봐야 하는데, 순차 처리 모델은 뒷 단어를 고려하지 못한다.
Attention 기반 모델은 단어를 출력할 때마다 **매 시점 전체 입력 문장을 다시 보고**, 압축된 벡터 하나 대신 모든 hidden state를 참고한다.
지금 출력하는 단어에 따라 봐야 할 단어가 다르므로, 각 단어가 출력에 도움 되는 정도를 점수화한 것이 Attention Score다 — 시험 문제를 풀 때 교과서를 처음부터 다시 읽지 않고 관련 페이지에 형광펜을 치고 집중하는 것과 같다.
또한 Word2Vec 같은 고정 임베딩이 '배'(과일/선박/신체)를 구분 못 하던 한계를, 문맥마다 다른 벡터를 만드는 **Contextual Embedding**으로 극복했다.
이 Attention 기반 병렬 처리 구조(Transformer)가 대규모 사전학습 모델(LLM) 시대를 열었다.`},{h:"Self-Attention의 세 주인공 — Q(Query)·K(Key)·V(Value) (pp.63-64)",body:`입력 벡터에 세 가중치 행렬(W^Q·W^K·W^V)을 곱해 Q·K·V를 만든다.
Q는 "내가 어디에 집중할까?"라는 질문, K는 참고될 수 있는 정보의 색인, V는 실제 전달되는 정보다 — 도서관에 비유하면 Q는 검색창의 질문, K는 책마다 붙은 색인표, V는 책의 실제 내용이다.
Q와 K의 행렬곱으로 Score Matrix를 만드는데, (i,j)셀은 "i번째 토큰이 j번째 토큰을 얼마나 주목하는가"이며 문맥상 관계가 깊을수록 값이 크다.
문장 내 **모든 토큰 쌍의 관계를 한 번의 행렬 연산으로 동시에** 계산하므로 순차 처리 없이 병렬화가 가능하다 — LSTM과의 결정적 차이다.`},{h:"√d_k 스케일링과 Softmax — 점수를 확률로 (pp.65-67)",body:`Q·K 내적 점수는 벡터 차원(d_k)이 클수록 분산이 커져 Softmax의 기울기가 극도로 작아진다. 그래서 **√d_k로 나누는 스케일링**으로 값의 범위를 안정화한다.
과목마다 만점이 다른 시험 점수를 100점 만점으로 환산해 비교하는 것과 비슷하다.
Softmax를 거치면 각 행의 합이 1인 확률(Attention 가중치)이 되고, 여기에 V를 곱해 각 토큰이 다른 토큰들의 정보를 비율대로 섞은 **문맥 벡터**를 만든다.
전체 수식은 Attention(Q,K,V) = Softmax(QKᵀ/√d_k)V — 오늘 개념 도해의 소프트맥스가 바로 이 자리에 들어간다.`}]},realCodes:[],periods:["[강의] Software 1.0→3.0 — LLM, 언어가 인터페이스가 되다","[강의] 토큰화와 임베딩 — 벡터 공간과 거리(맨해튼·유클리드)·유사도","[강의] RNN·LSTM의 한계 — 순차 처리와 장기 의존성","[강의] Self-Attention과 Query·Key·Value, softmax로 확률 만들기","[실습] 실습1-1 — PyTorch LSTM(CharLSTM)으로 한국어 문장 생성","[실습] 실습1-1 — 장기 의존성 한계 관찰·생성 결과 캡처","[실습] 실습1-2 — 사전학습 GPT-2로 같은 과제 재생성","[실습] 실습1 마무리 — LSTM vs Transformer 비교 리포트 작성"]},"transformer2-2":{plan:{schedule:[{time:"09:00–09:50",topic:"[강의] 복습: LSTM→Transformer, LLM 추론(Inference) 파이프라인"},{time:"10:00–10:50",topic:"[강의] LLM을 API 레벨에서 쓰기 — 토큰=비용(usage)·CoT·SC·ReAct 복습"},{time:"11:00–11:50",topic:"[강의+실습] CrewAI 개념(Agent·Task·Crew) + 실습2 착수(팀 편성·.env)"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"[실습] 실습2 ① Agent 정의 — Writer·Editor role·goal·backstory"},{time:"14:00–14:50",topic:"[실습] 실습2 ② Task·Crew 구성·kickoff 실행, usage로 비용 비교"},{time:"15:00–15:50",topic:"[실습] 실습2 ③ 가상데이터로 Biz 가치·서비스 시나리오 기획"},{time:"16:00–16:50",topic:"[실습] 실습2 ④ 팀 코드·발표자료(최소 3p) 마무리·리허설"},{time:"17:00–17:50",topic:"[발표] 팀별 발표·평가 — Biz가치 40 · 기술이해도 30 · 수업충실도 30"}],practice:{title:"실습2. CrewAI로 Transformer 기반 LLM을 API 레벨에서 활용하는 에이전트 구현 — 팀 (practice_2.CrewAI_Agent_System)",steps:["`python -m pip install -r requirements-llm.txt` 로 crewai·openai 등을 설치하고, code/.env에 반별 OPENAI_API_KEY를 등록한다(키는 GitHub·공개 채널에 절대 공유 금지).","[practice_2.CrewAI_Agent_System.ipynb] LLM API 호출이 내부적으로 토큰화 → 임베딩 → Self-Attention 연산 → 다음 토큰 예측(자기회귀)으로 이뤄지는 추론(Inference) 파이프라인을 응용 레벨에서 체감한다.","Agent를 역할별로 정의한다 — 예: Writer(초안 생성)·Editor(교정·검수). 각 Agent에 role·goal·backstory와 사용할 LLM(gpt-4o 등)·temperature를 지정한다.","Task를 정의해 Agent에 배정한다(예: Plan → Write → Edit). Task 설명에는 CoT(단계별 사고)·ReAct(Thought→Action→Observation) 스타일 지시를 반영해 안정적으로 동작하게 한다.","Crew(agents, tasks, process=sequential)를 구성하고 crew.kickoff()로 실행한다. 응답의 usage(token 사용량)로 동일 의미라도 한국어가 영어보다 토큰을 더 소모(=비용·지연 증가)함을 확인한다.","다단계 에이전트는 매 호출마다 추론 파이프라인 전체를 반복하므로 속도·비용이 누적됨을 관찰하고, 프롬프트 길이·호출 횟수·max_tokens를 줄이는 최적화를 적용한다(반별 API 크레딧 절약).","제공된 가상 데이터(고객상담이력·B2B계약서·거래데이터셋·사내정책FAQ)로 이해관계자를 추정하고 Biz 가치가 있는 AI 서비스 시나리오를 기획한다.","[제출물] 팀 단위 에이전트 구현 코드와, 서비스 시나리오 기획서를 발표자료(최소 3페이지)로 정리한다."],deliverable:"팀 단위 에이전트 구현 코드(.ipynb) + 서비스 시나리오 기획 발표자료(최소 3페이지, Biz가치·기술이해·수업충실 어필). ※ 평가: 실습2 100점 = Biz가치 40 + 기술이해도 30 + 수업충실도 30 · 평가결과에 개인별 점수·판단근거·보완사항 필수 · 팀 편성=좌석표 기준(6인석 → 3+3, 4인석 → 4인)"}},examples:[{title:"CrewAI — Agent 정의 (Writer·Editor 역할 분담)",lang:"python",code:`from crewai import Agent

writer = Agent(
    role='Writer',                        # 역할 이름
    goal='주제에 맞는 초안을 작성한다',   # 이 에이전트의 목표
    backstory='간결한 글을 잘 쓰는 작가', # 성격·배경(프롬프트에 반영됨)
    llm='gpt-4o',                         # 사용할 LLM
)

editor = Agent(
    role='Editor',
    goal='초안을 사실 확인하고 다듬는다',
    backstory='꼼꼼한 편집자. 과장된 표현을 걷어낸다',
    llm='gpt-4o',
)`,note:"role·goal·backstory가 곧 시스템 프롬프트가 된다. 팀 과제에서는 데모의 역할 구성을 그대로 내지 말고, 우리 팀 시나리오에 맞는 역할로 바꾸는 것이 평가 포인트(기술이해도)다."},{title:"Task와 Crew — Plan→Write→Edit 파이프라인 실행",lang:"python",code:`from crewai import Task, Crew, Process

write_task = Task(
    description='주제: {topic}. 단계적으로 생각(CoT)한 뒤 500자 초안을 작성해줘.',
    agent=writer,
    expected_output='500자 내외의 초안',
)
edit_task = Task(
    description='초안의 사실관계를 확인하고 문장을 다듬어줘.',
    agent=editor,
    expected_output='최종 원고',
)

crew = Crew(agents=[writer, editor], tasks=[write_task, edit_task],
            process=Process.sequential)   # 순차 실행: Write -> Edit
result = crew.kickoff(inputs={'topic': '우리 팀 서비스 시나리오'})
print(result)`,note:"kickoff() 한 번에 Task들이 순서대로 실행된다. 각 Task의 output이 다음 Task의 문맥으로 넘어가는 것이 에이전트 협업의 핵심이다."},{title:"usage로 토큰=비용 확인 — 호출 최적화의 근거",lang:"python",code:`# 다단계 에이전트는 매 호출마다 추론 파이프라인 전체를 반복한다
# -> 호출 수 x 토큰 수가 곧 비용·지연이 된다
print(crew.usage_metrics)
# 예) prompt_tokens=1830, completion_tokens=642, total_tokens=2472

# 절약 수칙 (반별 공용 크레딧)
# 1) 프롬프트에 불필요한 긴 원문을 통째로 넣지 않는다(필요 부분만)
# 2) 같은 요청을 반복 호출하지 않는다(결과 재사용)
# 3) max_tokens를 과대 설정하지 않는다
# 4) 같은 의미라도 한국어가 영어보다 토큰을 더 소모한다는 점을 감안한다`,note:"usage(토큰 사용량)를 읽을 줄 알면 '왜 느리고 왜 비싼가'를 수치로 설명할 수 있다 — 발표에서 Biz 가치(비용 구조)를 말할 때 근거로 쓰자."}],concepts:[{term:"추론(Inference) 파이프라인",desc:"LLM API를 한 번 호출할 때 내부에서 벌어지는 일 — 토큰화 → 임베딩 → Self-Attention 연산 → 다음 토큰 예측(자기회귀)을 거쳐 응답이 만들어진다. 다단계 에이전트는 매 호출마다 이 전체 과정을 반복하므로 속도와 비용이 호출 수에 비례해 누적된다."},{term:"CrewAI — Agent · Task · Crew",desc:`Agent — role·goal·backstory로 정의한 역할(곧 시스템 프롬프트).
Task — 할 일과 expected_output을 적어 Agent에 배정.
Crew — Agent·Task 묶음을 process=sequential 등으로 실행(kickoff). 여러 LLM을 역할로 나눠 협업시키는 에이전트 프레임워크다.`},{term:"토큰 = 비용 (usage)",desc:"API 응답의 usage(prompt_tokens·completion_tokens)가 곧 요금과 지연의 단위다. 같은 의미라도 한국어가 영어보다 토큰을 더 소모하며, 프롬프트 길이·호출 횟수·max_tokens를 줄이는 것이 실전 최적화의 기본이다."},{term:"Foundation 모델",desc:`프롬프트 기반의 대규모 사전 학습 언어 모델이다("Language Models are Few-Shot Learners", 2020).
대규모 데이터·사전 학습으로 다양한 작업을 높은 성능으로 수행하며, 멀티모달 학습으로 확장되고 있다. (p.28)`},{term:"BLEU와 WMT",desc:`BLEU는 기계번역 품질 지표로, Transformer 논문은 WMT 2014 영-독 28.4·영-불 41.8로 당시 SOTA를 달성했다.
WMT는 기계번역 분야의 가장 권위 있는 학회로 매년 번역 경진대회를 연다. (p.60)`},{term:"컨텍스트 윈도우(Context Window)",desc:`모델이 한 번에 참조할 수 있는 입력 길이의 한계다.
Self-Attention 연산량이 문장 길이의 제곱(N²)에 비례하기 때문에 생기며, 프롬프트를 아무리 잘 설계해도 이 모델 자체의 한계는 넘을 수 없다. (실습 가이드 p.18)`},{term:"증강 지능(Augmented Intelligence)",desc:`AI가 인간의 지능과 의사결정을 '대체'가 아니라 '향상'시키는 데 초점을 둔 활용 방식이다.
인간의 경쟁자가 아닌 도구로서의 AI — 사람이 생산적 역할을 계속 수행하는 미래를 원할수록 중요해진다. (p.25)`},{term:"LLM 평가 벤치마크",desc:`MMLU(57개 분야 지식·추론)·HellaSwag(상식적 문장 완성)·GSM8K(수학적 추론)·HumanEval(파이썬 코딩)·TruthfulQA(환각 방지) 등 리더보드가 쓰는 표준 문제 세트다.
어제오늘 쓴 모델이 '어떤 시험을 잘 보는 학생'인지 읽는 눈을 준다. (p.80)`}],detail:{topics:[{h:"Transformer 아키텍처 완성",items:['"Attention Is All You Need"(2017) — RNN·CNN 없이 Self-Attention만으로',"인코더-디코더 구조, BLEU 성과(영-독 28.4·영-불 41.8, 더 적은 비용으로 SOTA)","Multi-Head Attention — 병렬 어텐션 h개 + Concat + Linear 재조합","LayerNorm(차원별 정규화)·Residual(원 입력 보존, 포스트잇 비유)","FFN(ReLU 비선형성)·Positional Encoding(번호표 비유)","Masked Self-Attention — 미래를 가리고 다음 토큰 예측(GPT의 원리)"]},{h:"LLM 생태계와 선택 기준",items:["현대 LLM 4대 특징 — 규모·사전학습(+Fine-tuning)·NLP 작업·Transformer","GPT-3 = 5,000억 토큰·175B 파라미터(GPT-2의 100배 이상)","리더보드 3종 — Stanford HELM(학계)·Vellum(산업계)·HF Open LLM(오픈소스)","평가 축 — 추론(GPQA)·수학(AIME)·코딩(SWE Bench)·속도·토큰당 비용","Market leaders — GPT-5·Gemini 3·Claude 4.5·Grok 4·LLaMA 4의 강점 비교","AI 진화 방향 — 인지 AI → 생성형 AI → AI 에이전트 → 피지컬 AI"]},{h:"LLM 활용 — API에서 Multi-Agent까지",items:["추론 파이프라인 — 토큰화→임베딩→Self-Attention→다음 토큰 예측(자기회귀)","토큰 = 비용·속도 — usage 확인, 한국어가 영어보다 토큰을 더 소모","다단계 에이전트 — 매 호출마다 파이프라인 전체 반복(느리고 비싼 이유)","CoT·SC·ReAct — 구조를 바꾸지 않고 프롬프트 설계로 추론 품질 향상","CrewAI — Agent(role·goal·backstory, 롤플레잉 성능 향상)·Task·Crew","기획자→작성자→편집자 협업 템플릿 → 팀 시나리오로 변형(실습2)"]}],labs:[{title:"Lab. 역할을 바꾸면 결과가 바뀔까",steps:["practice_2의 Writer backstory를 '초등학생도 이해할 쉬운 글을 쓰는 작가'로 바꿔 재실행한다.","Editor의 goal에 '과장 표현 삭제'를 추가해 최종 원고가 어떻게 달라지는지 비교한다.","role·goal·backstory 변경이 곧 프롬프트 변경임을 팀 시나리오 설계에 활용한다."]},{title:"Lab. 호출 비용 다이어트",steps:["crew.usage_metrics로 현재 파이프라인의 총 토큰을 기록한다.","Task 설명에서 불필요한 긴 지시문을 줄이고, 같은 내용 재호출을 제거한 뒤 다시 실행한다.","절감 전/후 토큰 수를 비교해 발표 자료의 '비용 구조' 근거로 쓴다."]}],homework:["팀 과제: 에이전트 구현 코드 + 서비스 시나리오 발표자료(최소 3p) — 7.24(금) 팀별 발표 후, 밤 12시 정각 전(24:00)까지 슬랙 2반 제출","발표 준비: Biz가치 40 · 기술이해도 30 · 수업충실도 30 배점에 맞춰 3페이지 구성 점검"]},theory:{theory:[{h:'"Attention Is All You Need" — Transformer의 탄생 (pp.27, 59-62)',body:`2017년 Google Brain의 신경망 기계번역 연구에서 나온 논문이다. 당시 주류였던 RNN/LSTM 기반 Seq2Seq는 병렬화가 어렵고 장기 의존성 문제가 있었고, CNN 기반은 먼 토큰 관계에 너무 깊은 층이 필요했다.
제안은 명확했다 — **RNN도 CNN도 없이 Self-Attention만으로** 시퀀스를 처리하자.
인코더는 입력 문장을 여러 층의 self-attention과 FFN으로 벡터화하고, 디코더는 인코딩된 벡터와 자기 출력에 대한 masked self-attention으로 목표 문장을 생성한다.
WMT 2014 영어-독일어 BLEU 28.4, 영어-불어 41.8로 더 적은 연산 비용에 SOTA를 달성했고, 이후 BERT·GPT 등 모든 대규모 언어모델의 기반 아키텍처가 됐다.`},{h:"Multi-Head Attention — 여러 관점으로 보고 하나로 합치기 (pp.68-69)",body:`입력 시퀀스를 서로 다른 관점에서 주목해 보고, 여러 관점을 합쳐 하나의 통합 표현으로 만드는 구조다. Scaled Dot-Product Attention을 h개 병렬 수행한 뒤 Concatenate하고 Linear 층을 통과시킨다.
소설 한 편을 여러 명이 나눠 읽되 한 명은 인물 관계, 한 명은 사건 순서, 한 명은 감정선을 보고 나중에 독후감을 합치는 것과 같다.
마지막 Linear가 꼭 필요한 이유도 교재에 명시돼 있다 — Concat한 벡터는 헤드별 특징(문법 관계·의미 유사성 등)이 흩어져 있어, 이를 **융합·재조합해 다음 레이어가 쓸 표현 공간으로 투영**해야 한다.`},{h:"LayerNorm과 Residual — 안정적으로 깊게 쌓는 비결 (p.70)",body:`LayerNorm은 각 토큰 벡터의 차원별 평균·분산을 정규화해 입력 분포를 일정하게 유지시켜, 학습을 빠르고 안정적으로 만들고 그래디언트 소실을 막는다.
Residual Connection은 어텐션이 계산한 값만 쓰면 원래 입력 정보가 손실될 수 있으므로, **기존 정보 위에 관계 정보를 '보강'**하는 방식이다.
공책에 필기를 새로 쓰는 게 아니라 원본 위에 포스트잇으로 보충 설명을 붙이는 것과 같아 원본이 그대로 남는다.
수식은 Output = LayerNorm(Input + MultiHeadAttention(Input))이다.`},{h:"Feed Forward와 Positional Encoding — 표현력과 순서 감각 (pp.71-72)",body:`Attention은 거의 선형변환의 조합이라 표현력이 부족할 수 있어, FFN에서 ReLU **비선형성**을 더해 문맥 벡터를 더 풍부하게 만든다 — 직선 자만으로는 곡선을 그릴 수 없어 곡선 자를 하나 더 갖추는 격이다.
한편 어텐션 구조는 모든 토큰을 '한꺼번에' 보기 때문에 순서를 모른다 — "나는 밥을 먹었다"와 "밥이 나를 먹었다"를 구분하지 못한다.
해법이 Positional Encoding이다. 위치 임베딩을 학습하거나, 학습 없이 삼각함수 계산값을 인코딩으로 쓴다.
좌석표 없이 모인 학생들에게 번호표를 나눠주는 것과 같은 역할이다.`},{h:"Decoder와 Masked Self-Attention — 생성의 구조 (pp.73-74)",body:`어텐션은 모든 단어가 주어졌을 때 서로의 문맥을 파악하는 구조이지, 그 자체로 '다음 토큰 예측' 구조는 아니다.
생성하려면 지금까지 나온 토큰만으로 서로를 참조해 다음 토큰을 예측해야 하므로, 디코더의 Masked Self-Attention은 Score 행렬에서 **미래 위치를 가린다(mask)**.
"I → I study → I study AI"처럼 소설을 쓸 때 이미 쓴 앞 문장만 보고 다음 문장을 이어가는 방식이다.
학습 시 정답(Y)은 '다음 토큰'이고, 매 스텝 Attention 결과와 Ground Truth를 비교해 Loss를 계산한다 — GPT류 생성 모델의 기본 원리다.`},{h:"대규모 데이터 × Transformer = GPT (pp.50-51, 76)",body:`Transformer의 큰 의미는 **분산 컴퓨팅을 가능하게** 했다는 점이며, 이것이 GPT-2·3처럼 거대한 모델이 등장한 가장 중요한 이유다.
GPT-3는 약 5,000억 토큰(Common Crawl 등 45TB)을 학습했고 파라미터는 GPT-2의 100배 이상(1.5B → 175B)이다.
교재가 정리한 현대 LLM의 4대 특징 — 매개변수 규모, 사전 학습(+Fine-tuning), 자연어 처리 작업 수행, Transformer 아키텍처.
두꺼운 백과사전을 통째로 읽고 자란 학생이 어떤 질문에도 답을 이어가는 것에 비유할 수 있다.`},{h:"LLM 리더보드 — 성능 순위는 어디서 보나 (pp.78-97)",body:`모델 선택의 근거로 교재는 세 갈래 리더보드를 소개한다.
학계의 **Stanford HELM**은 정답률·Calibration·공정성·강인성·효율·안전성을 하나의 틀로 비교하고, 산업계의 **Vellum**은 추론(GPQA)·수학(AIME)·코딩(SWE Bench)·Tool Use와 함께 문맥 길이·토큰당 비용·속도 등 실무 지표를 제공하며, 연구자 중심의 **Hugging Face Open LLM Leaderboard**는 MMLU·HellaSwag·GSM8K·HumanEval 같은 표준 벤치마크로 오픈소스 모델의 순위를 매긴다.
시장에서는 GPT-5(자동 라우팅·코딩), Gemini 3(멀티모달·Google 연동), Claude 4.5(코딩·긴 문서 사고 파트너), Grok 4(실시간 검색), LLaMA 4(오픈 weights)가 각자의 강점으로 경쟁한다.
학원을 고를 때 한 곳의 광고가 아니라 여러 평가 기관의 성적표를 겹쳐 보는 것과 같다.`},{h:"CrewAI — 역할을 나눠 협업하는 Multi-Agent LLM (pp.102-105)",body:`교재의 심화 활용 파트는 Multi-Agent LLM을 CrewAI로 보여준다. Agent 정의에 role·goal·backstory를 주는 이유는 **LLM이 롤플레잉을 할 때 더 나은 성능**을 보이는 것으로 확인되었기 때문이다.
예시는 콘텐츠 기획자(Planner)·작성자(Writer)·편집자(Editor) 3개 에이전트로, 각각 Plan·Write·Edit Task와 짝지어져 실행 체인이 개요→독자층 분석→콘텐츠를 단계적으로 생성한다.
학급 신문을 만들 때 기획·기사·맞춤법 담당을 나누면 혼자 다 하는 것보다 결과가 좋아지는 원리다.
이는 도메인 지식을 갖추고 질문에 답을 찾아 주는 지능형 보고서 작성 에이전트로 확장된다 — 오늘 실습2에서 팀 시나리오로 직접 만든다.`}]},realCodes:[],periods:["[강의] 복습: LSTM→Transformer, LLM 추론(Inference) 파이프라인","[강의] LLM을 API 레벨에서 쓰기 — 토큰=비용(usage)·CoT·SC·ReAct 복습","[강의+실습] CrewAI 개념(Agent·Task·Crew) + 실습2 착수(팀 편성·.env)","[실습] 실습2 ① Agent 정의 — Writer·Editor role·goal·backstory","[실습] 실습2 ② Task·Crew 구성·kickoff 실행, usage로 비용 비교","[실습] 실습2 ③ 가상데이터로 Biz 가치·서비스 시나리오 기획","[실습] 실습2 ④ 팀 코드·발표자료(최소 3p) 마무리·리허설","[발표] 팀별 발표·평가 — Biz가치 40 · 기술이해도 30 · 수업충실도 30"]}};export{e as default};
