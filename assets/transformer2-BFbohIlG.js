const e={"transformer2-1":{plan:{schedule:[{time:"09:00–09:50",topic:"[강의] LLM이 뭐길래? '다음 단어 맞히기' 게임으로 시작하기"},{time:"10:00–10:50",topic:"[강의] 토큰화(BPE)와 임베딩 — 글자를 숫자 벡터로 바꾸기"},{time:"11:00–11:50",topic:"[실습] 토크나이저로 문장 쪼개고 임베딩 벡터 직접 꺼내보기"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"[강의] RNN·LSTM의 한계 — 한 줄로 서서 차례차례 읽기의 답답함"},{time:"14:00–14:50",topic:"[강의] Attention의 직관 — 중요한 문장에 형광펜 치기"},{time:"15:00–15:50",topic:"[강의] Self-Attention과 Query·Key·Value 삼총사"},{time:"16:00–16:50",topic:"[실습] Scaled Dot-Product Attention 손으로·NumPy로 계산하기"},{time:"17:00–17:50",topic:"[실습] Attention 가중치 히트맵으로 시각화하기"}],practice:{title:"실습1. 딥러닝(LSTM) vs Transformer 문장 생성 비교 — 개인 (practice_1-1, practice_1-2)",steps:["제공된 code.zip을 풀고 VS Code에서 실습 폴더를 연 뒤 `python3 -m venv .venv && source .venv/bin/activate` 로 가상환경을 만들고 `python -m pip install -r requirements-llm.txt` 로 torch·numpy 등 실습 패키지를 설치한다.","[실습1-1 · practice_1-1.ipynb] 한국어 말뭉치를 문자 단위로 토큰화하고 정수 인덱스로 인코딩한 뒤, nn.Embedding → nn.LSTM(hidden_size=50, num_layers=2) → nn.Linear(hidden_size, vocab_size) 구조(CharLSTM)로 '다음 문자 예측' 언어모델을 구성한다.","CrossEntropyLoss + Adam으로 학습 루프를 돌려 loss가 감소하는지 확인하고, 시작 토큰을 넣어 은닉상태(hidden state)를 순차 전달하며 문장을 자기회귀(autoregressive)로 생성한다.","[한계 관찰] 문장이 길어질수록 앞부분 맥락(주어·인물관계)이 희석되는 장기 의존성(long-term dependency) 한계를, 긴 생성 예시로 직접 캡처한다 — 순차 처리라 병렬화가 어렵고 느리다는 점도 확인 → 'Transformer가 필요한 이유'로 연결한다.","[실습1-2 · practice_1-2.ipynb] 같은 '다음 토큰 예측' 과제를 Transformer 계열 사전학습 모델로 다시 푼다 — transformers 라이브러리에서 GPT2Tokenizer·GPT2LMHeadModel을 from_pretrained('gpt2')로 불러와 문장을 생성한다(직접 구현이 아니라 사전학습 모델 활용).","generate()에 attention_mask와 pad_token_id(eos 대체)를 지정해 실행하고, 내부적으로는 Self-Attention(Q·K·V, scaled dot-product QKᵀ/√d_k)·causal mask로 모든 위치를 한 번에 참조하며 다음 토큰을 예측한다는 점을 오전 강의(15~16교시) 내용과 연결한다.","[비교 관찰] '직접 학습한 소형 LSTM' vs '사전학습된 대형 Transformer(GPT-2)'의 생성 결과를 나란히 캡처해 자연스러움·문맥 유지 차이를 비교하고, temperature·top_k 등 생성 파라미터 변화와 N²(문장 길이 제곱) 연산량·컨텍스트 윈도우 한계도 함께 짚는다.","[제출물] LSTM·Transformer 생성 코드·결과와, 두 모델의 한계·개선점을 비교한 리포트를 작성한다."],deliverable:"LSTM 기반 생성 코드·결과 / Transformer 기반 생성 코드·결과 / 두 모델의 한계·개선점 비교 리포트. ※ 평가: 실습1 100점 = 1-1 LSTM(RNN) 문장생성 정상동작 40 + 1-2 Transformer 대체 문장생성 정상동작 60 (정상 동작 여부 중심)"},figures:[{src:"/images/manhattan-distance.svg",title:"맨해튼 거리 vs 유클리드 거리",caption:"격자 도시에서 가로·세로로만 이동한 거리의 합(L1, 노랑 실선)과 직선 거리(L2, 파랑 점선). 임베딩 벡터의 '가까움'을 재는 거리 척도의 출발점이다."},{src:"/images/softmax.svg",title:"소프트맥스 — 점수를 확률로",caption:"출력층의 제각각인 점수(logits)를 0~1 확률로 정규화해 총합을 1로 만든다. 다음 토큰 확률 분포와 Self-Attention 가중치, 오늘 수업 두 곳 모두에 등장한다."}]},examples:[{title:"CharLSTM — 문자 단위 LSTM 언어모델 뼈대 (practice_1-1)",lang:"python",code:`import torch
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
코사인 유사도 — 거리 대신 두 벡터가 이루는 각도로 비슷함을 재는 방법. 임베딩처럼 고차원 벡터의 의미 비교에는 방향(각도)이 더 중요해 실무에서 널리 쓰인다.`},{term:"소프트맥스(Softmax) 함수",desc:"딥러닝의 다중 클래스 분류(Multi-class Classification)에서 쓰는 활성화 함수다. 여러 클래스(예: 강아지·고양이·호랑이) 중 하나를 예측할 때, 출력층의 점수를 0~1 사이 확률로 정규화해 총합이 항상 1이 되게 만든다. 언어모델에서는 '다음 토큰'의 확률 분포를 만들 때, Self-Attention에서는 QKᵀ/√d_k 점수를 attention 가중치(합=1)로 바꿀 때 — 오늘 수업 두 곳 모두에 등장한다."}],detail:{topics:[{h:"언어모델과 벡터 공간",items:["다음 토큰 예측 — 언어모델은 '다음에 올 말'의 확률 분포를 만든다","토큰화·임베딩 — 글자를 숫자 벡터로, 의미가 비슷하면 벡터도 가깝게","벡터 거리 — 맨해튼(L1)·유클리드(L2)·코사인 유사도로 '가까움'을 잰다","softmax — 제각각인 점수를 합=1인 확률로 정규화"]},{h:"LSTM에서 Transformer로",items:["LSTM — 한 줄로 서서 차례차례 읽기, 고정 크기 기억(hidden)에 문맥 압축","장기 의존성 한계 — 문장이 길어지면 앞 문맥이 흐려진다","Self-Attention — 모든 위치를 한 번에 참조, Q·K·V와 scaled dot-product","병렬화 — 순차 처리(LSTM)와 달리 한꺼번에 계산해 학습이 빠르다"]}],labs:[{title:"Lab. 거리 척도 3종 비교 — 어떤 '가까움'이 맞을까",steps:["넘파이로 2차원 점 A(1,1)·B(5,4)의 맨해튼·유클리드 거리를 계산한다(7 vs 5).","같은 두 벡터의 코사인 유사도를 계산하고, 벡터 길이를 2배로 늘려도 코사인 값은 그대로임을 확인한다.","고차원 임베딩 비교에 코사인이 널리 쓰이는 이유(방향=의미, 길이는 빈도 영향)를 한 줄로 정리한다."]},{title:"Lab. 생성 파라미터 실험 — temperature·top_k",steps:["practice_1-2의 generate()에서 temperature를 0.3 / 0.8 / 1.5로 바꿔 같은 프롬프트로 3회 생성한다.","top_k를 5 / 50으로 바꿔 문장의 다양성과 안정성이 어떻게 달라지는지 캡처한다.","softmax 확률 분포가 temperature에 따라 '뾰족해지고 평평해지는' 원리와 연결해 설명한다."]}],homework:["개인 보고서(1페이지): LSTM vs GPT-2 생성 비교 + 차이의 이유(장기 의존성·Self-Attention) — 오늘 밤 12시 정각 전(24:00) 슬랙 2반 제출","practice_0(CoT·SC·ReAct)을 실행해 프롬프트 기법별 응답 차이를 캡처해 보고서에 포함"]},theory:null,realCodes:[],periods:["[강의] LLM이 뭐길래? '다음 단어 맞히기' 게임으로 시작하기","[강의] 토큰화와 임베딩 — 벡터 공간과 거리(맨해튼·유클리드)·유사도","[강의] RNN·LSTM의 한계 — 순차 처리와 장기 의존성","[강의] Self-Attention과 Query·Key·Value, softmax로 확률 만들기","[실습] 실습1-1 — PyTorch LSTM(CharLSTM)으로 한국어 문장 생성","[실습] 실습1-1 — 장기 의존성 한계 관찰·생성 결과 캡처","[실습] 실습1-2 — 사전학습 GPT-2로 같은 과제 재생성","[실습] 실습1 마무리 — LSTM vs Transformer 비교 리포트 작성"]},"transformer2-2":{plan:{schedule:[{time:"09:00–09:50",topic:"[강의] 복습: LSTM→Transformer, 그리고 LLM 추론(Inference) 파이프라인 — 토큰화→임베딩→Self-Attention→다음 토큰 예측(자기회귀)"},{time:"10:00–10:50",topic:"[강의] LLM을 API 레벨에서 쓰기 — 스트리밍 응답·컨텍스트 윈도우·토큰=비용(usage), 프롬프트 기법 CoT·SC·ReAct 복습(practice_0)"},{time:"11:00–11:50",topic:"[강의+실습 착수] 에이전트 프레임워크 CrewAI 개념(Agent·Task·Crew, 역할 분담·도구 호출) → 실습2 착수: 팀 편성·.env(API키)·requirements-llm 설치"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"[실습] 실습2 ① Agent 정의 — Writer·Editor에 role·goal·backstory·LLM(gpt-4o)·temperature 설정"},{time:"14:00–14:50",topic:"[실습] 실습2 ② Task(Plan→Write→Edit) 정의·Crew(process=sequential)·kickoff() 실행, 응답 usage로 한국어/영어 토큰·비용 비교"},{time:"15:00–15:50",topic:"[실습] 실습2 ③ 가상데이터(상담·계약·거래·FAQ)로 이해관계자·Biz 가치 도출해 AI 서비스 시나리오 기획 + 프롬프트·호출수 최적화(크레딧 절약)"},{time:"16:00–16:50",topic:"[실습] 실습2 ④ 팀 에이전트 코드 마무리 + 서비스 시나리오 발표자료(최소 3p) 정리·리허설"},{time:"17:00–17:50",topic:"[발표·채점] 팀별 발표 → 평가(Biz가치 40·기술이해도 30·수업충실도 30), 개인별 점수·판단근거·보완사항 기록"}],practice:{title:"실습2. CrewAI로 Transformer 기반 LLM을 API 레벨에서 활용하는 에이전트 구현 — 팀 (practice_2.CrewAI_Agent_System)",steps:["`python -m pip install -r requirements-llm.txt` 로 crewai·openai 등을 설치하고, code/.env에 반별 OPENAI_API_KEY를 등록한다(키는 GitHub·공개 채널에 절대 공유 금지).","[practice_2.CrewAI_Agent_System.ipynb] LLM API 호출이 내부적으로 토큰화 → 임베딩 → Self-Attention 연산 → 다음 토큰 예측(자기회귀)으로 이뤄지는 추론(Inference) 파이프라인을 응용 레벨에서 체감한다.","Agent를 역할별로 정의한다 — 예: Writer(초안 생성)·Editor(교정·검수). 각 Agent에 role·goal·backstory와 사용할 LLM(gpt-4o 등)·temperature를 지정한다.","Task를 정의해 Agent에 배정한다(예: Plan → Write → Edit). Task 설명에는 CoT(단계별 사고)·ReAct(Thought→Action→Observation) 스타일 지시를 반영해 안정적으로 동작하게 한다.","Crew(agents, tasks, process=sequential)를 구성하고 crew.kickoff()로 실행한다. 응답의 usage(token 사용량)로 동일 의미라도 한국어가 영어보다 토큰을 더 소모(=비용·지연 증가)함을 확인한다.","다단계 에이전트는 매 호출마다 추론 파이프라인 전체를 반복하므로 속도·비용이 누적됨을 관찰하고, 프롬프트 길이·호출 횟수·max_tokens를 줄이는 최적화를 적용한다(반별 API 크레딧 절약).","제공된 가상 데이터(고객상담이력·B2B계약서·거래데이터셋·사내정책FAQ)로 이해관계자를 추정하고 Biz 가치가 있는 AI 서비스 시나리오를 기획한다.","[제출물] 팀 단위 에이전트 구현 코드와, 서비스 시나리오 기획서를 발표자료(최소 3페이지)로 정리한다."],deliverable:"팀 단위 에이전트 구현 코드(.ipynb) + 서비스 시나리오 기획 발표자료(최소 3페이지, Biz가치·기술이해·수업충실 어필). ※ 평가: 실습2 100점 = Biz가치 40 + 기술이해도 30 + 수업충실도 30 · 평가결과에 개인별 점수·판단근거·보완사항 필수 · 팀 편성=좌석표 기준(6인석 → 3+3, 4인석 → 4인)"}},examples:[{title:"CrewAI — Agent 정의 (Writer·Editor 역할 분담)",lang:"python",code:`from crewai import Agent

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
Crew — Agent·Task 묶음을 process=sequential 등으로 실행(kickoff). 여러 LLM을 역할로 나눠 협업시키는 에이전트 프레임워크다.`},{term:"토큰 = 비용 (usage)",desc:"API 응답의 usage(prompt_tokens·completion_tokens)가 곧 요금과 지연의 단위다. 같은 의미라도 한국어가 영어보다 토큰을 더 소모하며, 프롬프트 길이·호출 횟수·max_tokens를 줄이는 것이 실전 최적화의 기본이다."}],detail:{topics:[{h:"LLM을 API 레벨에서 쓰기",items:["추론(Inference) 파이프라인 — 토큰화→임베딩→Self-Attention→자기회귀 생성","토큰 = 비용 — usage로 사용량을 읽고, 한국어가 영어보다 토큰을 더 쓴다","컨텍스트 윈도우 — 한 번에 넣을 수 있는 문맥의 한계","프롬프트 기법 — CoT·Self-Consistency·ReAct를 Task 설명에 반영"]},{h:"CrewAI 에이전트 협업",items:["Agent — role·goal·backstory가 곧 시스템 프롬프트","Task — 할 일 정의와 expected_output, Agent에 배정","Crew — process=sequential로 Task를 순차 실행(kickoff)","다단계 호출 — 매 호출마다 파이프라인 전체가 반복돼 비용이 누적된다"]}],labs:[{title:"Lab. 역할을 바꾸면 결과가 바뀔까",steps:["practice_2의 Writer backstory를 '초등학생도 이해할 쉬운 글을 쓰는 작가'로 바꿔 재실행한다.","Editor의 goal에 '과장 표현 삭제'를 추가해 최종 원고가 어떻게 달라지는지 비교한다.","role·goal·backstory 변경이 곧 프롬프트 변경임을 팀 시나리오 설계에 활용한다."]},{title:"Lab. 호출 비용 다이어트",steps:["crew.usage_metrics로 현재 파이프라인의 총 토큰을 기록한다.","Task 설명에서 불필요한 긴 지시문을 줄이고, 같은 내용 재호출을 제거한 뒤 다시 실행한다.","절감 전/후 토큰 수를 비교해 발표 자료의 '비용 구조' 근거로 쓴다."]}],homework:["팀 과제: 에이전트 구현 코드 + 서비스 시나리오 발표자료(최소 3p) — 7.24(금) 팀별 발표 후, 밤 12시 정각 전(24:00)까지 슬랙 2반 제출","발표 준비: Biz가치 40 · 기술이해도 30 · 수업충실도 30 배점에 맞춰 3페이지 구성 점검"]},theory:null,realCodes:[],periods:["[강의] 복습: LSTM→Transformer, LLM 추론(Inference) 파이프라인","[강의] LLM을 API 레벨에서 쓰기 — 토큰=비용(usage)·CoT·SC·ReAct 복습","[강의+실습] CrewAI 개념(Agent·Task·Crew) + 실습2 착수(팀 편성·.env)","[실습] 실습2 ① Agent 정의 — Writer·Editor role·goal·backstory","[실습] 실습2 ② Task·Crew 구성·kickoff 실행, usage로 비용 비교","[실습] 실습2 ③ 가상데이터로 Biz 가치·서비스 시나리오 기획","[실습] 실습2 ④ 팀 코드·발표자료(최소 3p) 마무리·리허설","[발표] 팀별 발표·평가 — Biz가치 40 · 기술이해도 30 · 수업충실도 30"]}};export{e as default};
