const n={"sllm-1":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 — sLLM이 뭐길래? LLM 서빙 파이프라인과 작은 LLM의 정체"},{time:"10:00–10:50",topic:"2교시 — MLM vs CLM 구조 비교, LLM vs sLLM(토크나이저·임베딩·경량화)"},{time:"11:00–11:50",topic:"3교시 [실습] Hugging Face 모델 카드 읽고 첫 추론 돌려보기"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 — 양자화(quantization)와 On-Device 추론"},{time:"14:00–14:50",topic:"5교시 [실습] Ollama로 로컬에서 모델 채팅 띄우기"},{time:"15:00–15:50",topic:"6교시 — sLLM Use Case 시나리오: DBMS·영업비밀·개인정보 등 보안 민감 영역"},{time:"16:00–16:50",topic:"7교시 — PEFT·LoRA 맛보기: 통째로 안 바꾸고 살짝만 고치는 학습"},{time:"17:00–17:50",topic:"8교시 [실습] 로컬 모델을 API로 호출하는 미니 챗봇 완성·점검"}],practice:{title:"내 컴퓨터에 작은 LLM 올려서 채팅 API 만들기 (Ollama + Python)",steps:["터미널을 열고 'ollama --version' 을 입력해 Ollama가 설치되어 있는지 확인한다(없으면 ollama.com에서 설치).","'ollama pull qwen2.5:0.5b' 명령으로 0.5B 크기의 아주 작은 모델을 내려받는다(용량이 작아 노트북에서도 돈다).","'ollama run qwen2.5:0.5b' 를 실행하고 '안녕? 너 누구야?' 라고 입력해 모델이 한국어로 답하는지 본다.","새 터미널에서 'pip install requests' 로 HTTP 요청 라이브러리를 설치한다.","VS Code에서 chat.py 파일을 만들고, localhost:11434/api/chat 으로 요청을 보내는 코드를 작성한다(아래 realCode 참고).","코드에 system 메시지로 '너는 친절한 한국어 비서야' 라는 역할을 넣어 모델의 말투를 고정한다.","'python chat.py' 로 실행하고 '파이썬으로 1부터 10까지 더하는 법 알려줘' 라고 물어본다.","기대 결과: 터미널에 모델이 생성한 한국어 답변과 짧은 파이썬 코드가 출력된다.","temperature 값을 0.2와 1.0으로 각각 바꿔 실행해 답변의 일관성·창의성 차이를 비교한다.","마지막으로 대화 내용을 result.txt 파일로 저장하는 코드를 추가해 결과를 남긴다."],deliverable:"로컬 sLLM과 대화한 chat.py 소스 + 실행 화면 캡처 + 저장된 result.txt"}},examples:[{title:"Hugging Face로 작은 모델 받아 한 줄 생성하기",lang:"python",code:`from transformers import pipeline   # 복잡한 단계를 한 번에 묶어주는 편의 도구

# 'text-generation' 작업과 쓸 모델 이름만 주면 알아서 내려받아 준비한다
gen = pipeline("text-generation", model="Qwen/Qwen2.5-0.5B")

result = gen("인공지능을 한 문장으로 설명하면", max_new_tokens=30)  # 최대 30토큰까지 이어 쓰게 함
print(result[0]["generated_text"])   # 결과: 입력 문장 + 모델이 이어 쓴 설명이 출력됨`,note:"pipeline 한 줄이면 모델 다운로드부터 추론까지 자동으로 처리된다."},{title:"모델 용량 가늠하기 — 파라미터 수로 메모리 추정",lang:"python",code:`params_billion = 7      # 모델 크기(예: 7B = 70억 파라미터)
bits = 4                # 양자화 비트 수(4비트로 압축했다고 가정)

# 대략적인 용량(GB) = 파라미터 수(10억) x 비트 / 8(=1바이트)
approx_gb = params_billion * bits / 8   # 7 * 4 / 8 = 3.5
print(f"필요 메모리 약 {approx_gb} GB")   # 결과: 필요 메모리 약 3.5 GB`,note:"4비트 양자화를 쓰면 7B 모델도 약 3.5GB라 일반 노트북 메모리에 들어간다."},{title:"4bit 양자화 로딩 (bitsandbytes)",lang:"python",code:`from transformers import AutoModelForCausalLM, BitsAndBytesConfig

# 4bit 양자화: 가중치를 4비트로 저장 → VRAM 사용 약 1/4
bnb = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",        # 정규분포에 최적화된 NF4
    bnb_4bit_compute_dtype="bfloat16",# 연산은 bf16으로(정확도 보존)
)
model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen2.5-7B", quantization_config=bnb, device_map="auto",
)
# 7B 모델을 소비자 GPU(예: 12GB)에서도 구동 가능`,note:"양자화는 메모리를 줄이는 대신 약간의 정확도 손실이 있다. NF4 + bf16 compute 가 품질-효율 균형점."},{title:"Ollama로 로컬 sLLM 3분 만에 띄우기",lang:"bash",code:`# 설치형 로컬 서빙 — 인터넷·API키 없이 내 PC에서 sLLM 구동
ollama pull qwen2.5:3b        # 3B 소형 모델 내려받기(양자화본)
ollama run qwen2.5:3b "사내 규정 요약 도우미처럼 답해줘"

# OpenAI 호환 API로도 열려서 기존 코드 그대로 붙는다
curl http://localhost:11434/v1/chat/completions -d '{
  "model": "qwen2.5:3b",
  "messages": [{"role":"user","content":"연차는 며칠?"}]
}'`,note:"보안 민감 데이터(영업비밀·개인정보)는 외부 API 대신 로컬 sLLM으로 처리한다. Ollama는 OpenAI 호환 API를 제공해 코드 이식이 쉽다."},{title:"sLLM vs LLM — 언제 무엇을 쓰나(선택 기준)",lang:"text",code:`# 같은 작업이라도 규모/보안/비용에 따라 답이 다르다
[sLLM(3~8B, 로컬) 유리]
  - 보안: 데이터가 외부로 나가면 안 됨(사내 문서·고객정보)
  - 비용: 대량·반복 호출(요약·분류를 하루 수만 건)
  - 지연: 오프라인·엣지 환경, 네트워크 불안정
[대형 LLM(API) 유리]
  - 난도: 복잡한 추론·긴 문맥·다국어 고품질
  - 속도: 초기 구축을 빠르게(파인튜닝 없이 바로)
# 실무는 '분류·요약=sLLM, 어려운 추론=대형' 하이브리드가 흔하다`,note:'"무조건 큰 모델"이 답이 아니다. 보안·비용·지연 요구를 먼저 따져 sLLM과 대형 LLM을 역할 분담시킨다.'},{title:"KV 캐시 켜고 끄고 — 추론 속도 차이 직접 재보기",lang:"python",code:`from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저
import torch, time                         # 텐서와 시간 측정

name = "Qwen/Qwen2.5-0.5B"                 # 가벼운 소형 모델
tok = AutoTokenizer.from_pretrained(name)  # 토크나이저 로드
model = AutoModelForCausalLM.from_pretrained(name)  # 모델 로드
model.eval()                               # 추론 모드

prompt = "인공지능의 미래를 설명하면"        # 생성 시작 문장
ids = tok(prompt, return_tensors="pt").input_ids  # 토큰 ID로 변환

def run(use_cache):                        # KV 캐시 사용 여부에 따라 시간 측정
    t = time.time()                        # 시작 시각
    with torch.no_grad():                  # 추론
        model.generate(ids, max_new_tokens=40, do_sample=False,
                       use_cache=use_cache) # 캐시 on/off만 다르게
    return round(time.time() - t, 2)       # 걸린 시간(초)

print("KV캐시 끔:", run(False), "초")       # 매 토큰마다 과거를 다시 계산 -> 느림
print("KV캐시 켬:", run(True), "초")        # 과거 Key/Value 재사용 -> 빠름`,note:"Transformer는 토큰을 만들 때마다 이전 토큰들의 Key/Value가 필요하다. KV 캐시는 이를 저장해 재사용함으로써 반복 계산을 없애 추론 속도를 끌어올린다."},{title:"FAISS로 사내 문서 벡터 인덱스 만들고 검색하기 (RAG 검색부)",lang:"python",code:`from sentence_transformers import SentenceTransformer  # 문장을 벡터로 바꾸는 임베딩 모델
import faiss                               # 벡터 유사도 검색 라이브러리(메타 제작)

# 검색 대상 사내 문서 조각들(실제로는 파일을 청크로 나눠 넣는다)
chunks = [
    "연차 휴가는 입사 1년 후 15일이 부여된다.",   # 문서1
    "재택근무는 팀장 승인 시 주 2회까지 가능하다.", # 문서2
    "복지포인트는 매년 1월 1일에 지급된다.",       # 문서3
]
embedder = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")  # 다국어 임베딩
vecs = embedder.encode(chunks, normalize_embeddings=True)  # 문서들을 벡터로(정규화)

index = faiss.IndexFlatIP(vecs.shape[1])   # 내적(=코사인) 기준 벡터 인덱스 생성
index.add(vecs)                            # 문서 벡터들을 인덱스에 저장

question = "재택근무 며칠까지 돼?"           # 사용자 질문
q_vec = embedder.encode([question], normalize_embeddings=True)  # 질문도 같은 방식으로 벡터화
scores, ids = index.search(q_vec, k=1)     # 가장 가까운 문서 1개 검색
print("가장 관련 있는 문서:", chunks[ids[0][0]])  # 결과: 재택근무 문서`,note:"FAISS는 문서 벡터를 인덱스에 담아 질문 벡터와 가장 가까운 조각을 빠르게 찾아 준다. 이렇게 찾은 근거를 sLLM 프롬프트에 붙이면 사내 문서 기반 RAG가 된다."},{title:"MLM vs CLM — 빈칸 채우기와 이어 쓰기를 직접 비교",lang:"python",code:`from transformers import pipeline   # 허깅페이스 편의 파이프라인

# 1) MLM(빈칸 채우기) - BERT 계열: 앞뒤 문맥을 '양방향'으로 보고 [MASK]를 맞힌다
fill = pipeline('fill-mask', model='bert-base-multilingual-cased')
for cand in fill('서울은 한국의 [MASK]이다.')[:3]:   # 확률 높은 후보 3개
    print('MLM 후보:', cand['token_str'], round(cand['score'], 3))

# 2) CLM(다음 토큰 예측) - GPT 계열: '왼쪽 문맥만' 보고 뒤를 이어 쓴다
gen = pipeline('text-generation', model='Qwen/Qwen2.5-0.5B')
out = gen('서울은 한국의', max_new_tokens=20, do_sample=False)
print('CLM 생성:', out[0]['generated_text'])   # 문장이 자연스럽게 이어진다

# 정리: MLM 은 문장 이해(분류·개체명 인식)에, CLM 은 생성(대화·요약)에 강하다
# 요즘 sLLM(Llama·Qwen·Gemma·EXAONE)이 전부 CLM(Decoder-only)인 이유:
#   '프롬프트 -> 응답' 학습이 다음 토큰 예측 구조와 그대로 맞아떨어지기 때문`,note:"MLM(BERT)은 양방향 문맥으로 빈칸을 맞추고, CLM(GPT)은 이전 토큰만 보고 다음을 예측한다. 지시-응답 형태의 파인튜닝이 CLM 의 다음 토큰 예측과 직접 일치하기 때문에, sLLM 파인튜닝은 사실상 CLM 중심으로 이루어진다."},{title:"토크나이저 뜯어보기 — 분해·번호화·복원과 pad 토큰 준비",lang:"python",code:`from transformers import AutoTokenizer   # 모델과 짝을 이루는 토크나이저 로더

tok = AutoTokenizer.from_pretrained('Qwen/Qwen2.5-0.5B')  # Qwen 토크나이저

text = '연차 신청은 어떻게 하나요?'        # 모델에 넣을 문장
tokens = tok.tokenize(text)               # 1) 문장을 토큰 조각으로 분해
print('토큰 조각:', tokens)               # 한글이 여러 조각으로 쪼개진다

ids = tok.encode(text)                    # 2) 각 조각을 번호(ID)로 변환
print('토큰 ID :', ids)                   # 모델이 실제로 먹는 것은 이 숫자들
print('토큰 수 :', len(ids))              # 과금·컨텍스트 길이의 단위

print('복원    :', tok.decode(ids))       # 3) 번호를 다시 문장으로 복원

# 학습·배치 처리 때 길이를 맞출 pad 토큰이 없는 모델은 eos 로 대신 지정한다
if tok.pad_token is None:                 # Qwen 계열은 pad 토큰이 비어 있다
    tok.pad_token = tok.eos_token         # 문장 끝(eos) 토큰을 패딩으로 재사용
print('패딩 토큰:', tok.pad_token)         # 파인튜닝 전에 꼭 거치는 준비 단계`,note:"LLM 은 글자가 아니라 토큰 번호를 먹기 때문에, 분해(tokenize)→번호화(encode)→복원(decode)의 왕복을 눈으로 확인하는 것이 첫걸음이다. pad_token 이 없는 모델에 eos 를 패딩으로 지정하는 것은 이후 모든 파인튜닝 실습 코드의 공통 준비 동작이다."},{title:"LoRA 적용 전/후 — 학습 파라미터가 1% 미만으로 줄어드는 것 확인",lang:"python",code:`from transformers import AutoModelForCausalLM          # 생성형(CLM) 모델 로더
from peft import LoraConfig, get_peft_model, TaskType   # LoRA 도구 3종

model = AutoModelForCausalLM.from_pretrained('Qwen/Qwen2.5-0.5B')  # 베이스 sLLM

# [적용 전] 전체 파라미터 수를 직접 세어 본다
total = sum(p.numel() for p in model.parameters())   # 모든 가중치 개수 합산
print('전체 파라미터:', format(total, ','))            # 약 5억 개

# LoRA 설정: 원래 가중치는 얼려 두고, 작은 보조 행렬만 학습한다
lora = LoraConfig(
    task_type=TaskType.CAUSAL_LM,   # 생성형 과제용
    r=8,                # rank: 낮을수록 경량, 높일수록 표현력 증가
    lora_alpha=16,      # 스케일링 계수(관례상 r 의 2배에서 시작)
    lora_dropout=0.05,  # 과적합 방지용 드롭아웃
    target_modules=['q_proj', 'v_proj'],   # 어텐션 투영층에만 부착
)
model = get_peft_model(model, lora)   # 모델에 LoRA 어댑터 결합

# [적용 후] 실제로 학습되는 파라미터 비율을 확인한다
model.print_trainable_parameters()
# 예: trainable params: 1.1M || all params: 495M || trainable%: 0.22
# 전체의 1% 미만만 학습해도 도메인 지식 주입이 가능한 것이 LoRA 의 힘`,note:"LoRA 는 기존 가중치를 얼리고 어텐션 투영층 옆에 저랭크 행렬만 붙여 학습한다. 적용 전 전체 파라미터와 적용 후 trainable 비율을 나란히 확인하면, rank(r)와 alpha 가 학습량·표현력을 조절하는 손잡이라는 것이 숫자로 보인다."},{title:"GPU/CPU 환경 분기 로딩 — 어디서든 도는 실습 준비 코드",lang:"python",code:`import torch                                        # 장치(GPU/CPU) 확인용
from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저

MODEL = 'Qwen/Qwen2.5-1.5B'        # 실습 기준 sLLM
tok = AutoTokenizer.from_pretrained(MODEL)   # 토크나이저는 환경과 무관하게 동일

if torch.cuda.is_available():      # GPU(CUDA)가 있는 환경 - 예: Colab
    model = AutoModelForCausalLM.from_pretrained(
        MODEL,
        torch_dtype=torch.float16, # 절반 정밀도로 메모리 절약
        device_map='auto',         # 모델을 GPU 에 자동 배치
    )
    print('GPU 로딩:', torch.cuda.get_device_name(0))   # 어떤 GPU 인지 확인
else:                              # CPU 만 있는 환경 - Mac/Windows 노트북 공통
    model = AutoModelForCausalLM.from_pretrained(
        MODEL,
        torch_dtype=torch.float32, # CPU 는 float32 가 안전하다
    )
    print('CPU 로딩 완료 (느리지만 어디서나 실행된다)')

if tok.pad_token is None:          # 공통 마무리: 패딩 토큰 준비
    tok.pad_token = tok.eos_token  # eos 를 패딩으로 재사용
model.config.pad_token_id = tok.pad_token_id   # 모델 설정에도 반영`,note:"같은 실습 코드라도 GPU 에서는 float16+device_map, CPU 에서는 float32 로 로딩 방식이 달라진다. torch.cuda.is_available() 분기 하나로 Colab 과 내 노트북 어디서든 도는 코드를 만드는 것이 sLLM 실습의 출발 준비다."}],concepts:[{term:"LLM (대규모 언어모델)",desc:"사람이 쓴 방대한 글을 학습해 '다음에 올 단어'를 잘 맞히도록 훈련된, 글을 읽고 쓰는 아주 똑똑한 자동완성기다."},{term:"sLLM (소형 LLM)",desc:"거대한 LLM을 노트북·휴대폰에서도 돌아가게 작게 줄인 모델로, 큰 모델이 대형 트럭이라면 sLLM은 골목도 다니는 경차에 가깝다."},{term:"오픈소스 모델",desc:"회사가 모델의 속(가중치)을 무료로 공개해 누구나 내려받아 내 컴퓨터에서 쓰고 고칠 수 있게 한 모델이다(Llama·Qwen·Gemma 등)."},{term:"파라미터(매개변수)",desc:"모델이 학습으로 얻은 '지식 숫자 덩어리'로, 7B는 70억 개라는 뜻이며 숫자가 클수록 똑똑하지만 무겁다."},{term:"양자화(quantization)",desc:"지식 숫자들을 정밀한 소수 대신 더 거친 정수로 바꿔 모델 용량을 줄이는 기술로, 고화질 사진을 용량 작은 압축 사진으로 바꾸는 것과 비슷하다."},{term:"로컬 서빙",desc:"인터넷 너머 회사 서버가 아니라 내 컴퓨터 안에서 모델을 띄워 쓰는 것으로, 인터넷 없이도 쓰고 데이터가 밖으로 안 나간다."},{term:"PEFT·LoRA",desc:"모델 전체를 다시 가르치지 않고 작은 보조 부품만 끼워 살짝 고치는 학습법으로, 옷 전체를 새로 짓는 대신 소매만 줄여 맞추는 것과 같다."},{term:"MLM vs CLM",desc:"MLM(BERT식)은 문장 가운데 빈칸을 맞히며 '이해'에 강하고, CLM(GPT식)은 왼쪽부터 다음 단어를 맞히며 '생성'에 강하다. sLLM은 대부분 CLM 계열이다."},{term:"sLLM Use Case(보안 민감)",desc:"데이터를 외부로 보내면 안 되는 DBMS·영업비밀·개인정보 업무에서, 데이터가 내부에 머무는 로컬 sLLM이 특히 유용하다."}],detail:{topics:[{h:"대표 오픈소스 sLLM 한눈에",items:["Meta Llama 3.x (1B·3B·8B): 폭넓게 쓰이는 표준격","Alibaba Qwen2.5 (0.5B~7B): 다국어·한국어에 강함","Google Gemma 2 (2B·9B): 가볍고 안정적","Microsoft Phi-3 (mini): 작아도 추론력 좋음","모델 카드에서 라이선스·언어·용도 꼭 확인하기"]},{h:"로컬 서빙 도구 비교",items:["Ollama: 설치 한 번이면 끝, 가장 쉬움(입문 추천)","vLLM: 빠른 동시 처리, 서버용 고성능 서빙","Hugging Face Transformers: 코드로 세밀하게 제어","GGUF·llama.cpp: CPU만으로도 돌리는 양자화 포맷","용도: 빠른 체험=Ollama, 운영=vLLM"]},{h:"양자화 방식 맛보기",items:["FP16/BF16: 절반 정밀도, 품질 거의 그대로","INT8: 8비트, 용량 절반·속도 향상","INT4(Q4): 4비트, 용량 1/4·노트북용 대세","GPTQ·AWQ·GGUF: 대표 양자화 포맷 이름","트레이드오프: 비트 낮을수록 가볍지만 품질 손실"]},{h:"MLM vs CLM와 sLLM Use Case",items:["MLM(BERT식): 빈칸 맞히기, 이해·분류에 강함","CLM(GPT식): 다음 단어 예측, 생성에 강함(sLLM 주류)","Use Case: DBMS·영업비밀·개인정보 등 외부 반출 금지 업무","로컬 sLLM이면 데이터가 내부에 머물러 보안에 유리"]},{h:"LLM이 답을 만들기까지 — 공통 4단계",items:["① 토크나이저: 문장을 모델이 아는 숫자 조각(토큰)으로 쪼갬","② 임베딩: 각 토큰을 의미를 담은 벡터로 바꿈","③ 전처리: 프롬프트 템플릿(chat template)으로 질문을 정해진 대화 양식으로 감쌈","④ 후처리: 생성된 토큰을 다시 글자로 되돌리고 stop token에서 끊어 필요한 부분만 남김","sLLM도 이 4단계는 똑같고, 다만 모델 본체가 경량화·양자화되어 있고 PEFT로 갈아 끼우기 쉽다는 점이 다름"]}],labs:[{title:"Lab 1 — Ollama로 첫 모델 띄우기",steps:["ollama.com에서 Ollama를 설치한다.","터미널에 'ollama pull gemma2:2b' 를 입력해 모델을 받는다.","'ollama list' 로 받은 모델 목록을 확인한다.","'ollama run gemma2:2b' 후 '한국의 수도는?' 이라고 물어본다.","/bye 를 입력해 대화를 종료한다."]},{title:"Lab 2 — Transformers로 모델 정보 들여다보기",steps:["'pip install transformers torch' 로 라이브러리를 설치한다.","파이썬에서 AutoModelForCausalLM 으로 'Qwen/Qwen2.5-0.5B' 를 불러온다.","model.num_parameters() 를 출력해 파라미터 개수를 확인한다.","숫자가 약 5억(0.5B)인지 눈으로 확인한다.","메모리가 부족하면 더 작은 모델로 바꿔 다시 시도한다."]},{title:"Lab 3 — Hugging Face 모델 카드 제대로 읽기",steps:["huggingface.co 에서 'Qwen/Qwen2.5-0.5B-Instruct' 페이지를 연다.","상단 요약에서 파라미터 규모(0.5B)와 지원 언어(한국어 포함 여부)를 확인한다.","'License' 항목을 찾아 상업적 사용이 가능한 라이선스인지 확인한다(회사 도입 시 필수 체크).","'Intended use'/'Limitations' 부분을 읽고 이 모델이 무엇에 강하고 무엇에 약한지 두 줄로 메모한다.","모델 이름 뒤 '-Instruct' 유무의 차이(대화용으로 다듬어졌는지)를 옆 사람과 설명해 본다.","같은 방식으로 'google/gemma-2-2b-it' 카드도 열어 라이선스·언어·크기를 표로 비교한다."]},{title:"Lab 4 — 우리 팀 sLLM Use Case 도출 워크숍",steps:["우리 회사·부서에서 '외부로 데이터를 보내면 안 되는' 업무를 3개 적어 본다(예: 계약서 요약, 상담로그 분류, 사내 DB 질의).","각 업무에 대해 '작업 난이도(상/중/하)'와 '데이터 민감도(상/중/하)'를 표로 매긴다.","두 값을 놓고 sLLM이 맞는지(민감도 높음+난이도 중하), 큰 API가 맞는지 판정한다.","sLLM으로 정한 업무 하나를 골라 입력(무엇을 넣고)·출력(무엇을 받는지)을 한 문장씩 정의한다.","그 업무를 오늘 배운 로컬 서빙으로 구현한다면 어떤 순서일지 3단계로 스케치한다.","팀별로 1분씩 발표하고, 강사와 함께 '가장 현실적인 첫 과제'를 하나 정한다."]}],homework:["Ollama로 서로 다른 모델 2개(예: qwen2.5:0.5b, gemma2:2b)에 같은 질문 5개를 던지고, 답변 품질·속도를 표로 비교 정리하기.","내 노트북 사양(RAM·GPU 유무)을 적고, 양자화 용량 공식으로 돌릴 수 있는 최대 모델 크기를 추정해 한 문단으로 설명하기."]},theory:{theory:[{h:"sLLM·PEFT 요즘 흐름 - 작은 모델이 뜨는 이유",body:`예전엔 '무조건 큰 모델이 이긴다'는 분위기였지만, 요즘은 방향이 갈렸다.
큰 모델은 API로 어려운 일을 맡기고, 반복적이고 보안이 중요한 일은 잘 다듬은 작은 모델에 맡기는 '역할 분담'이 대세가 되고 있다.

그 배경에는 세 흐름이 있다.
첫째, 휴대폰·노트북·사내 서버에서 돌리려는 수요가 커지며 2B~8B급 소형 모델(Llama·Qwen·Gemma·Phi 계열)이 매년 빠르게 똑똑해지고 있다.
둘째, 큰 모델의 답과 추론 과정을 작은 모델에 베껴 넣는 '증류(distillation)'로 작은 모델의 실력이 크게 올랐다.
셋째, 파인튜닝에서는 메모리를 극단적으로 아끼는 QLoRA가 표준이 됐고, 이후에도 LoRA를 개선한 변형과 학습을 몇 배 빠르게 해 주는 도구들이 계속 나온다.

현장의 결론은 분명하다 — '가장 큰 모델'이 아니라 '내 문제에 딱 맞게 튜닝한 가장 작은 모델'을 찾는 것이 비용·속도·보안 모두에서 이득이다.`},{h:"sLLM은 '경차'다 — 작아도 충분히 일한다",body:`거대한 LLM을 슈퍼컴퓨터급 대형 트럭이라고 하면, sLLM은 좁은 골목까지 다니는 경차다.
트럭은 짐을 많이 싣지만 주차장도 기름값도 부담이고, 경차는 짐은 적게 싣지만 어디든 쉽게 다닌다.
sLLM도 마찬가지여서, 아주 어려운 추론은 큰 모델보다 약하지만 요약·분류·간단한 챗봇 같은 일상 업무는 충분히 해낸다.

작다는 것의 진짜 장점은 '내 컴퓨터에서 돈다'는 점이다.
회사 기밀 문서를 외부 서버에 안 보내고 처리할 수 있고, 인터넷이 없어도 동작하며, 호출할 때마다 돈이 나가지 않는다.
그래서 실무에서는 '모든 일을 큰 모델에 맡기지 말고, 가벼운 일은 sLLM에 맡기자'는 흐름이 점점 커지고 있다.`},{h:"오픈소스 모델 생태계 — 누구나 받아서 고칠 수 있다",body:`예전에는 똑똑한 LLM은 회사 서버 안에만 있고 우리는 API로 빌려 쓰기만 했다.
지금은 Meta의 Llama, 알리바바의 Qwen, 구글의 Gemma처럼 모델의 '속'을 통째로 공개한 오픈소스 모델이 많아졌다.
공개된 모델은 Hugging Face라는 '모델 앱스토어' 같은 사이트에서 내려받아 바로 쓸 수 있다.

오픈소스라서 좋은 점은 자유롭게 고칠 수 있다는 것이다.
내 회사 말투, 내 업무 데이터에 맞게 뒤에서 배울 LoRA로 살짝 다듬으면 '우리 회사 전용 비서'를 만들 수 있다.
이번 과정의 목표가 바로 이 '내 것으로 만들기'의 첫걸음이다.`},{h:"양자화 — 큰 모델을 작은 가방에 욱여넣기",body:`모델은 수십억 개의 숫자(가중치)로 되어 있고, 원래는 각 숫자를 아주 정밀한 소수(32비트)로 저장한다.
양자화는 이 정밀한 소수를 더 거친 정수(예: 4비트)로 바꿔 저장하는 기술이다.
고화질 사진을 용량 작은 압축본으로 바꾸면 약간 흐려지지만 알아보는 데는 문제없는 것과 똑같다.

4비트로 양자화하면 모델 용량이 대략 4분의 1로 줄어 노트북 메모리에도 들어간다.
품질은 조금 떨어지지만 대부분의 업무에서는 차이를 느끼기 어려울 정도다.
그래서 '로컬에서 LLM 돌리기'는 거의 항상 양자화와 함께 간다.`},{h:"MLM vs CLM, 그리고 보안이라는 이유",body:`언어모델은 크게 두 방식으로 학습한다. MLM(BERT식)은 문장 가운데를 가리고 '빈칸 맞히기'를 시켜 문맥 이해에 강해지고, CLM(GPT식)은 왼쪽부터 '다음 단어 맞히기'를 시켜 글 생성에 강해진다.
우리가 쓰는 sLLM은 대부분 CLM 계열이다.

sLLM을 굳이 내 컴퓨터에서 돌리는 데는 '보안'이라는 분명한 이유가 있다.
DBMS 기록·영업비밀·개인정보처럼 밖으로 내보내면 안 되는 데이터를 다룰 때, 클라우드 LLM에 보내는 대신 로컬 sLLM으로 처리하면 데이터가 회사 안에 머문다.
작아서 성능이 조금 낮더라도, '데이터가 새지 않는다'는 가치가 더 큰 업무가 많다.`},{h:"LLM 서빙 파이프라인 — 질문 한 줄이 답이 되어 돌아오기까지",body:`오늘 첫 시간에는 '모델을 어떻게 서비스로 쓰는가'의 전체 그림부터 잡는다.
우리가 챗봇에 질문을 던지면, 그 한 줄은 다음 순서를 거쳐 답이 되어 돌아온다.
① 사용자가 API 서버로 요청을 보낸다(예: localhost:11434 같은 주소).
② 서버가 질문을 받아 '전처리'한다 — 시스템/사용자 역할이 붙은 대화 양식(chat template)으로 감싼다.
③ 토크나이저가 문장을 모델이 아는 숫자 조각(토큰)으로 쪼갠다.
④ 모델(GPU/CPU)이 다음 토큰을 한 개씩 예측하며 답을 만들어 간다.
⑤ 디토크나이저가 숫자를 다시 글자로 되돌리고, 후처리로 stop token에서 잘라 필요한 부분만 남긴다.
⑥ 완성된 답을 서버가 사용자에게 돌려준다.

서빙(serving) 관점에서 더 볼 것이 몇 가지 있다.
한꺼번에 여러 사람이 물으면 요청을 '큐'에 줄 세우고 묶어서(batch) 처리하면 효율이 오른다.
이미 계산한 앞부분은 'KV 캐시'에 저장해 두어 매 토큰마다 처음부터 다시 계산하지 않는다.
답을 한 번에 주지 않고 한 글자씩 흘려보내면(streaming) 체감 속도가 빨라진다.

왜 이 그림이 중요한가 — 오늘 오후에 우리가 만들 미니 챗봇도 정확히 이 파이프라인의 축소판이다.
그리고 이 흐름은 큰 LLM이든 작은 sLLM이든 똑같다. 차이는 단 하나, sLLM은 이 서버 전체를 '내 노트북 안에' 통째로 올릴 수 있다는 점이다. 그래서 오늘 배울 로컬 서빙과 다음 시간의 경량화·양자화가 의미를 갖는다.`},{h:"sLLM을 어디에 쓸까 — 보안이 곧 이유가 되는 업무들",body:`6교시는 'sLLM이 실제로 어떤 일에 맞는가'를 시나리오로 따져 보는 시간이다.
sLLM의 결정적 장점은 성능이 아니라 '데이터가 내 울타리 밖으로 안 나간다'는 점이다. 그래서 보안이 중요한 업무일수록 sLLM이 빛난다.

대표 시나리오를 하나씩 보자.
① 사내 DB 자연어 질의 — '지난달 A지점 매출 top5 뽑아줘' 같은 질문을 SQL로 바꿔 준다. 이때 DB 스키마와 실제 데이터는 절대 외부 API로 보낼 수 없다. 로컬 sLLM이면 회사 안에서 처리된다.
② 영업비밀 문서 요약·분류 — 계약서·설계도·내부 보고서를 요약하거나 태그를 붙인다. 문서 자체가 기밀이라 클라우드에 못 올린다.
③ 개인정보 처리 — 상담 로그에서 이름·주민번호를 마스킹하거나 민원을 분류한다. 개인정보보호 규정상 외부 전송이 막혀 있다.
④ 오프라인 현장 — 공장·병원·군·선박처럼 인터넷이 없거나 막힌 곳에서도 로컬 모델은 그냥 돈다.

판단 기준을 정리하면 간단하다.
'데이터 민감도는 높고, 작업 난이도는 중간 이하'인 일 → sLLM이 최적이다(요약·분류·추출·정형화된 질의응답).
반대로 '데이터는 안 민감한데 아주 어려운 추론'이 필요하면 → 큰 API 모델에 맡기는 게 낫다.
실무는 이 둘을 섞어 쓴다. 오늘 우리는 그중 '내 손 안에서 도는 쪽'을 만드는 법을 배운다.`},{h:"PEFT·LoRA 맛보기 — 통째로 안 바꾸고 살짝만 고치기 (내일의 예고)",body:`오늘 마지막 이론 시간에는 내일 실습의 핵심인 PEFT의 감을 잡는다. 개념만, 코드는 내일.

모델을 우리 용도에 맞게 다시 가르치는 것을 '파인튜닝'이라 한다.
그런데 수십억 개 숫자를 전부 다시 학습(full fine-tuning)하려면 값비싼 GPU, 긴 시간, 큰 저장공간이 모두 필요하다. 개인이나 작은 팀에는 부담이 크다.

그래서 나온 것이 PEFT(Parameter-Efficient Fine-Tuning) — '아주 조금의 파라미터만 효율적으로 학습하기'다.
모델 본체는 그대로 얼려 두고, 전체의 1%도 안 되는 작은 부품만 새로 배운다.
그 대표가 LoRA다. 어텐션 층 옆에 작은 보조 행렬 두 개만 끼워 넣고 그것만 학습한다.
비유하면, 두꺼운 전공책을 다시 쓰는 대신 필요한 곳에 포스트잇만 붙이는 것이다.

장점이 세 가지다.
첫째, 학습할 숫자가 적어 무료 Colab GPU에서도 작은 모델을 튜닝할 수 있다.
둘째, 배운 결과가 수십 MB짜리 '어댑터' 파일 하나로 나와 관리가 쉽다.
셋째, 본체에 끼웠다 뺐다 하며 '고객상담용', '요약용' 같은 여러 버전을 갈아 끼울 수 있다.

왜 중요한가 — 오늘까지는 남이 만든 모델을 '가져다 쓰는' 단계였다. LoRA는 그 모델을 '내 것으로 만드는' 열쇠다. 내일 우리는 직접 어댑터를 학습해 모델의 말투를 바꿔 볼 것이다.`}]},realCodes:[{title:"로컬 Ollama 모델과 대화하는 미니 챗봇 (chat.py)",lang:"python",code:`import requests          # HTTP 요청을 보내는 라이브러리(로컬 모델 서버에 말을 건다)
import json              # 모델이 한 줄씩 보내주는 JSON 응답을 해석하기 위해 사용

URL = "http://localhost:11434/api/chat"   # Ollama가 켜지면 이 주소로 채팅 요청을 받는다
MODEL = "qwen2.5:0.5b"                       # 미리 pull 해 둔 아주 작은 모델 이름

# system 메시지로 모델의 '역할·말투'를 고정한다(대화 내내 유지됨)
messages = [
    {"role": "system", "content": "너는 친절한 한국어 비서야. 짧고 쉽게 답해줘."}
]

def ask(question):                          # 질문 한 번을 보내고 답을 받아오는 함수
    messages.append({"role": "user", "content": question})  # 사용자 질문을 대화에 추가
    payload = {                             # 모델 서버에 보낼 요청 내용을 만든다
        "model": MODEL,                     # 어떤 모델을 쓸지 지정
        "messages": messages,               # 지금까지의 전체 대화(기억 역할)
        "stream": False,                    # True면 한 글자씩, False면 완성된 답을 한 번에 받음
        "options": {"temperature": 0.2}     # 0에 가까울수록 일관되고 차분한 답을 함
    }
    res = requests.post(URL, json=payload)  # 로컬 모델 서버에 POST 요청을 보낸다
    answer = res.json()["message"]["content"]  # 응답 JSON에서 모델이 쓴 글만 꺼낸다
    messages.append({"role": "assistant", "content": answer})  # 답도 대화에 저장(다음 질문이 맥락 기억)
    return answer                           # 답변 문자열을 돌려준다

if __name__ == "__main__":                  # 이 파일을 직접 실행했을 때만 아래가 돈다
    reply = ask("파이썬으로 1부터 10까지 더하는 법 알려줘")  # 첫 질문을 던진다
    print("모델 답변:", reply)              # 결과: 한국어 설명 + 짧은 파이썬 코드가 출력됨
    with open("result.txt", "w", encoding="utf-8") as f:  # 대화 결과를 파일로 저장 준비
        f.write(reply)                      # 모델 답변을 result.txt에 기록(증빙용)`,note:`Ollama가 켜진 상태에서 'python chat.py'만 실행하면 인터넷 없이 내 컴퓨터의 모델과 대화하고, 그 결과를 result.txt로 남긴다.
system 메시지로 말투를 고정하고 messages 리스트로 대화를 기억시키는 것이 핵심이다.`}],periods:["1교시 — sLLM이 뭐길래? LLM 서빙 파이프라인과 작은 LLM의 정체","2교시 — MLM vs CLM 구조 비교, LLM vs sLLM(토크나이저·임베딩·경량화)","3교시 [실습] Hugging Face 모델 카드 읽고 첫 추론 돌려보기","4교시 — 양자화(quantization)와 On-Device 추론","5교시 [실습] Ollama로 로컬에서 모델 채팅 띄우기","6교시 — sLLM Use Case 시나리오: DBMS·영업비밀·개인정보 등 보안 민감 영역","7교시 — PEFT·LoRA 맛보기: 통째로 안 바꾸고 살짝만 고치는 학습","8교시 [실습] 로컬 모델을 API로 호출하는 미니 챗봇 완성·점검"]},"sllm-2":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 — sLLM·PEFT 최신 동향: 온디바이스 붐 · 증류로 똑똑해진 소형모델 · QLoRA 이후 신기법(학계/업계/현장)"},{time:"10:00–10:50",topic:"2교시 — 파인튜닝이 뭐고 언제 쓰나? PEFT가 필요한 이유 + 변형 비교(LoRA·QLoRA vs Adapter vs Prefix/Prompt tuning)"},{time:"11:00–11:50",topic:"3교시 — 목적별 PEFT 선택 가이드(도메인 지식·극소 파라미터·추론 강화)"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 [실습] instruction 데이터 JSONL 가공 + LoRA 학습 코드 작성"},{time:"14:00–14:50",topic:"5교시 [실습] LoRA 첫 학습 돌리고 loss 곡선 보기"},{time:"15:00–15:50",topic:"6교시 — sLLM 서비스 파이프라인: 임베딩 연결·Vector DB 선정·설계"},{time:"16:00–16:50",topic:"7교시 [실습] sLLM + Vector DB(RAG) 연동해 보기"},{time:"17:00–17:50",topic:"8교시 [실습] 학습한 LoRA 합쳐 추론·서빙 배포·마무리"}],practice:{title:"내 말투·도메인으로 sLLM 파인튜닝하기 (QLoRA, Colab)",steps:["Google Colab에서 새 노트북을 만들고 메뉴 '런타임 > 런타임 유형 변경'에서 GPU(T4)를 선택한다.","첫 셀에 '!pip install transformers peft datasets bitsandbytes accelerate trl' 를 입력해 라이브러리를 설치한다.","지시-출력 쌍 10~20개를 직접 만들어 data.jsonl 파일로 저장한다(예: 사내 용어를 설명하게 가르치기).","datasets.load_dataset 으로 data.jsonl 을 불러와 학습 형식(프롬프트 템플릿)으로 변환한다.","4비트 양자화 설정(BitsAndBytesConfig)으로 베이스 모델을 메모리 적게 불러온다.","LoraConfig 로 r=8, target_modules 를 지정해 LoRA 어댑터를 모델에 붙인다.","SFTTrainer 에 모델·데이터·학습설정을 넣고 trainer.train() 으로 학습을 시작한다.","기대 결과: 셀 출력에 step마다 loss 값이 점점 줄어드는 로그가 나타난다.","학습이 끝나면 같은 질문을 '학습 전 모델'과 '학습 후 모델'에 각각 물어 답변 변화를 비교한다.","model.save_pretrained('my-lora') 로 학습된 LoRA 어댑터(수십 MB)만 저장해 결과로 제출한다."],deliverable:"data.jsonl 학습셋 + 학습 노트북(.ipynb) + 학습 전후 답변 비교표 + 저장된 LoRA 어댑터 폴더"}},examples:[{title:"instruction 학습 데이터 한 줄 만들기 (JSONL)",lang:"python",code:`import json   # 파이썬 딕셔너리를 JSON 문자열로 바꾸기 위해 사용

# 모델에게 줄 '모범답안 카드' 한 장(지시 + 모범 출력)
sample = {
    "text": "### 지시:\\nDreamIT의 약자를 풀어줘\\n### 응답:\\nDream + IT, 꿈을 IT로 이룬다는 뜻입니다."
}

# JSONL은 한 줄에 하나의 JSON, 여러 줄을 모아 학습셋이 된다
with open("data.jsonl", "a", encoding="utf-8") as f:  # 이어쓰기(a) 모드로 열기
    f.write(json.dumps(sample, ensure_ascii=False) + "\\n")  # 카드 한 장을 파일에 추가
print("한 줄 추가 완료")   # 결과: 한 줄 추가 완료`,note:"이런 카드를 10~20장 모으면 작은 도메인 파인튜닝 학습셋이 된다."},{title:"학습한 LoRA 어댑터로 추론하기",lang:"python",code:`from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저
from peft import PeftModel   # 저장한 LoRA 어댑터를 본체에 다시 끼우는 도구

base = "Qwen/Qwen2.5-0.5B"           # 학습에 썼던 베이스 모델
tok = AutoTokenizer.from_pretrained(base)        # 토크나이저 불러오기
model = AutoModelForCausalLM.from_pretrained(base)  # 베이스 모델 불러오기
model = PeftModel.from_pretrained(model, "my-lora")  # 저장해 둔 LoRA 어댑터 결합

prompt = "### 지시:\\nDreamIT의 약자를 풀어줘\\n### 응답:\\n"  # 학습 때와 같은 형식으로 질문
ids = tok(prompt, return_tensors="pt").input_ids   # 문장을 토큰 숫자로 변환
out = model.generate(ids, max_new_tokens=40)       # 최대 40토큰 답 생성
print(tok.decode(out[0], skip_special_tokens=True))  # 결과: 학습한 말투로 답이 출력됨`,note:"본체 + LoRA 어댑터를 합쳐 불러오면 파인튜닝된 모델로 추론할 수 있다."},{title:"sLLM + Vector DB로 문서 근거 답변하기 (rag.py)",lang:"python",code:`from sentence_transformers import SentenceTransformer  # 문장을 의미 벡터로 바꾸는 임베딩 모델
import numpy as np      # 벡터 간 유사도 계산에 사용
import requests         # 로컬 Ollama 모델에 답을 요청할 때 사용

# 1) 우리가 검색 대상으로 삼을 사내 문서 조각(청크)들 — 실제로는 파일에서 읽어온다
docs = [
    "연차 휴가는 입사 1년 후부터 15일이 부여된다.",
    "재택근무는 팀장 승인 시 주 2회까지 가능하다.",
    "경조사비는 결혼 시 30만원, 조사 시 20만원을 지급한다.",
]

# 2) 한국어를 잘 다루는 다국어 임베딩 모델을 불러온다
embedder = SentenceTransformer("intfloat/multilingual-e5-small")
doc_vecs = embedder.encode(docs)   # 문서 3개를 각각 벡터로 변환(가장 단순한 형태의 Vector DB)

def search(question, top_k=1):     # 질문과 의미가 가까운 문서를 찾는 함수
    q_vec = embedder.encode([question])[0]          # 질문도 같은 방식으로 벡터화
    sims = doc_vecs @ q_vec / (                      # 코사인 유사도 계산
        np.linalg.norm(doc_vecs, axis=1) * np.linalg.norm(q_vec))
    best = sims.argsort()[::-1][:top_k]              # 유사도 높은 순으로 top_k개 인덱스
    return [docs[i] for i in best]                   # 가장 관련 있는 문서 조각을 돌려준다

def answer(question):              # 검색한 근거를 붙여 sLLM에게 답하게 하는 함수
    context = "\\n".join(search(question))   # 찾아온 근거 문서를 한 덩어리로 합침
    prompt = f"다음 근거만 보고 한국어로 답해줘.\\n[근거]\\n{context}\\n[질문]\\n{question}"
    res = requests.post("http://localhost:11434/api/chat", json={
        "model": "qwen2.5:0.5b", "stream": False,
        "messages": [{"role": "user", "content": prompt}]})
    return res.json()["message"]["content"]  # 모델이 근거를 보고 만든 답만 꺼낸다

if __name__ == "__main__":
    print(answer("재택근무 며칠까지 돼?"))   # 결과: 근거 문서를 인용해 '주 2회'라고 답함`,note:`임베딩으로 질문과 가장 가까운 사내 문서를 찾아(Vector DB 역할), 그 근거를 프롬프트에 붙여 sLLM에게 답하게 하는 RAG의 최소 형태다.
문서 목록만 우리 자료로 바꾸면 '사내 규정 챗봇'이 된다. 규모가 커지면 이 검색 부분을 Chroma·FAISS 같은 전용 Vector DB로 바꾸면 된다.`},{title:"LoRA를 본체에 합쳐 배포용 모델 만들기 (merge_and_serve.py)",lang:"python",code:`from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저
from peft import PeftModel   # 저장한 LoRA 어댑터를 본체에 끼우는 도구

BASE = "Qwen/Qwen2.5-0.5B"          # 학습에 썼던 베이스 모델
tok = AutoTokenizer.from_pretrained(BASE)          # 토크나이저 불러오기
model = AutoModelForCausalLM.from_pretrained(BASE) # 베이스 모델 불러오기
model = PeftModel.from_pretrained(model, "my-lora")  # 어제 학습한 LoRA 어댑터를 끼운다

# 핵심: 본체와 어댑터를 '하나로 합친다'(merge)
# 합치면 추론할 때 어댑터를 따로 안 끼워도 되고 로딩·추론이 단순해진다
merged = model.merge_and_unload()    # LoRA 가중치를 본체에 더해 하나의 모델로 만든다

merged.save_pretrained("my-sllm")    # 배포용 단일 모델로 저장
tok.save_pretrained("my-sllm")       # 토크나이저도 같은 폴더에 저장(배포 한 세트)
print("병합 완료! my-sllm 폴더가 배포용 모델이다")

# 배포된 모델로 바로 추론해 확인해 본다(서빙의 최소 형태)
prompt = "### 지시:\\nDreamIT의 약자를 풀어줘\\n### 응답:\\n"
ids = tok(prompt, return_tensors="pt").input_ids  # 질문을 토큰으로 변환
out = merged.generate(ids, max_new_tokens=40)     # 병합된 모델로 답 생성
print(tok.decode(out[0], skip_special_tokens=True))  # 결과: 학습한 말투로 답이 나옴`,note:`어댑터를 따로 끼워 쓰던 것을 merge_and_unload()로 본체에 합치면, 배포·운영 시 모델 하나만 올리면 되어 관리가 단순해진다.
이렇게 저장한 my-sllm 폴더를 그대로 Ollama용 GGUF로 변환하거나 vLLM 서버에 올리면 실제 서빙 배포로 이어진다.`},{title:"학습 데이터 포맷 (chat template)",lang:"python",code:`# instruction 튜닝 데이터는 모델의 chat template에 맞춰야 한다
sample = {
    "messages": [
        {"role": "system", "content": "너는 사내 규정 도우미다."},
        {"role": "user", "content": "연차는 며칠인가요?"},
        {"role": "assistant", "content": "입사 1년 후 15일이 부여됩니다."},
    ]
}
# tokenizer가 모델별 특수토큰(<|im_start|> 등)을 자동 삽입
text = tokenizer.apply_chat_template(sample["messages"], tokenize=False)
print(text)  # 학습/추론이 동일 포맷이어야 성능이 안정적`,note:"학습 포맷과 추론 포맷이 다르면 성능이 급락한다. apply_chat_template 로 일관성을 보장한다."},{title:"QLoRA — 4bit로 올린 모델에 LoRA 붙여 저비용 파인튜닝",lang:"python",code:`import torch                             # 텐서 계산
from transformers import (AutoTokenizer, AutoModelForCausalLM,
                          BitsAndBytesConfig)  # 모델·양자화 설정
from peft import (LoraConfig, get_peft_model, TaskType,
                  prepare_model_for_kbit_training)  # PEFT 도구

name = "Qwen/Qwen2.5-1.5B-Instruct"        # 베이스 sLLM
tok = AutoTokenizer.from_pretrained(name)  # 토크나이저
tok.pad_token = tok.eos_token              # 패딩 토큰 지정

# 1) 4bit 양자화 설정으로 모델을 가볍게 올린다(메모리 약 1/4)
bnb = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4",
                         bnb_4bit_compute_dtype=torch.float16)
model = AutoModelForCausalLM.from_pretrained(name, quantization_config=bnb,
                                             device_map="auto")  # 4bit 로딩
model = prepare_model_for_kbit_training(model)  # 양자화 모델을 학습 가능 상태로 준비

# 2) LoRA 어댑터를 어텐션 투영층에만 붙인다(전체가 아닌 일부만 학습)
lora = LoraConfig(task_type=TaskType.CAUSAL_LM, r=16, lora_alpha=32,
                  target_modules=["q_proj", "k_proj", "v_proj", "o_proj"])
model = get_peft_model(model, lora)        # 모델에 LoRA 결합
model.print_trainable_parameters()         # 학습 파라미터 비율 출력(보통 1% 미만)
# 이후 Trainer로 소량 FAQ 데이터를 학습하면 저비용 도메인 튜닝 완성`,note:"QLoRA는 4bit 양자화(메모리 절감)와 LoRA(일부만 학습)를 결합해 큰 모델도 적은 자원으로 파인튜닝한다. prepare_model_for_kbit_training이 양자화 모델을 학습 가능하게 만드는 열쇠다."},{title:'Prompt Tuning — 가중치는 그대로, 입력 앞 "가상 토큰"만 학습',lang:"python",code:`from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저
from peft import (PromptTuningConfig, PromptTuningInit,
                  get_peft_model, TaskType)  # 프롬프트 튜닝 도구

name = "Qwen/Qwen2.5-0.5B"                 # 베이스 sLLM
tok = AutoTokenizer.from_pretrained(name)  # 토크나이저
base = AutoModelForCausalLM.from_pretrained(name)  # 베이스 모델

# 학습 대상은 오직 입력 앞에 붙는 가상 토큰의 임베딩뿐이다
cfg = PromptTuningConfig(
    task_type=TaskType.CAUSAL_LM,          # 생성형(CLM) 과제
    prompt_tuning_init=PromptTuningInit.TEXT,  # 문장으로 초기화
    num_virtual_tokens=20,                 # 학습되는 가상 토큰 수(매우 적음)
    prompt_tuning_init_text="다음 사내 문서를 바탕으로 정확히 답하라:",  # 초기 지시문
    tokenizer_name_or_path=name,           # 초기 문구를 토큰화할 토크나이저
)
model = get_peft_model(base, cfg)          # 베이스 모델 앞에 가상 프롬프트를 붙인다
model.print_trainable_parameters()         # 학습 파라미터가 극소량임을 확인`,note:"프롬프트 튜닝은 모델 내부 가중치 전체가 아니라 입력 앞에 붙는 작은 프롬프트 임베딩만 학습한다. 저장·연산 자원이 극도로 제한된 On-Device 환경에 적합하다."},{title:"맥락 압축 — 긴 문서를 핵심만 줄여 넣고 답하기",lang:"python",code:`from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저
import torch                               # 텐서 계산

name = "Qwen/Qwen2.5-1.5B-Instruct"        # sLLM
tok = AutoTokenizer.from_pretrained(name)  # 토크나이저
model = AutoModelForCausalLM.from_pretrained(name)  # 모델
model.eval()                               # 추론 모드

def generate(prompt, n=200):               # 프롬프트를 넣어 텍스트를 생성
    ids = tok(prompt, return_tensors="pt").input_ids  # 토큰화
    with torch.no_grad():                  # 추론
        out = model.generate(ids, max_new_tokens=n, do_sample=False)  # 생성
    return tok.decode(out[0], skip_special_tokens=True)  # 문자열로 복원

long_doc = "연차는 입사 1년 후 15일 부여. 반차는 오전·오후로 신청 가능. (이하 긴 규정 원문)"  # 긴 문서
# 1) 먼저 문서를 질문 답변에 쓸 '핵심 맥락'으로 압축한다
compressed = generate("다음 문서를 핵심 규칙만 남겨 압축하라:\\n" + long_doc, n=150)
# 2) 압축된 맥락만 근거로 질문에 답한다(토큰 절약 + 잡음 감소)
answer = generate("아래 맥락만 근거로 답하라.\\n[맥락]\\n" + compressed + "\\n[질문]\\n연차는 며칠?")
print(answer)                              # 압축 맥락에 근거한 답 출력`,note:"검색된 문서를 통째로 넣으면 토큰이 낭비되고 잡음이 섞인다. 먼저 핵심만 압축한 뒤 그 맥락으로 답하면 제한된 컨텍스트를 효율적으로 쓰면서 정확도를 지킬 수 있다."},{title:"Trainer 로 미니 파인튜닝 실행 — 하이퍼파라미터의 의미까지",lang:"python",code:`# 앞 예제에서 LoRA 를 붙인 model 과 tok 을 그대로 사용한다고 가정
from datasets import load_dataset                  # JSONL 학습셋 로더
from transformers import (Trainer, TrainingArguments,
                          DataCollatorForLanguageModeling)  # 학습 도구 3종

# faq_train.jsonl: 한 줄에 {'question': ..., 'answer': ...} 형식의 사내 FAQ
dataset = load_dataset('json', data_files='faq_train.jsonl')['train']

def build_prompt(ex):              # Q/A 쌍을 하나의 학습 문장으로 조립
    text = '다음은 사내 FAQ입니다.\\n\\nQ: ' + ex['question'] + '\\nA: ' + ex['answer'] + tok.eos_token
    return {'text': text}          # 끝에 eos: '여기서 답이 끝난다'를 가르친다

def tokenize(ex):                  # 문장을 토큰으로 바꾸고 정답(labels)을 만든다
    out = tok(ex['text'], truncation=True, max_length=512, padding='max_length')
    out['labels'] = out['input_ids'].copy()   # CLM: 입력 그대로가 다음 토큰의 정답
    return out

data = dataset.map(build_prompt).map(tokenize, remove_columns=dataset.column_names)

args = TrainingArguments(
    output_dir='./qwen-lora-faq',      # 체크포인트 저장 폴더
    num_train_epochs=3,                # 전체 데이터를 3바퀴 학습
    per_device_train_batch_size=1,     # 한 번에 1건(메모리 절약)
    gradient_accumulation_steps=4,     # 4번 모아 1번 업데이트 = 실질 배치 4
    learning_rate=2e-4,                # LoRA 는 비교적 큰 학습률을 쓴다
    logging_steps=10,                  # 10스텝마다 loss 출력(학습 모니터링)
    report_to='none',                  # 외부 로깅 서비스 끔
)
collator = DataCollatorForLanguageModeling(tokenizer=tok, mlm=False)  # CLM 용 배치 조립
trainer = Trainer(model=model, args=args, train_dataset=data, data_collator=collator)
trainer.train()                        # loss 가 점점 줄어드는지 지켜본다
model.save_pretrained('./qwen-faq-lora')   # LoRA 어댑터만 저장(용량 수 MB)`,note:"학습의 실체는 프롬프트 조립→토큰화(labels=input_ids)→Trainer 실행의 3단계다. 배치 1에 gradient_accumulation 4를 곱해 실질 배치를 키우고, LoRA 특유의 큰 학습률(2e-4)과 logging_steps 로 loss 감소를 관찰하는 것이 하이퍼파라미터 읽기의 시작이다."},{title:"Long-Context 확장(YaRN) — 긴 계약서를 압축 없이 통째로 넣기",lang:"python",code:`import torch                                        # 텐서 계산
from transformers import AutoConfig, AutoTokenizer, AutoModelForCausalLM

MODEL = 'Qwen/Qwen2.5-1.5B-Instruct'   # 기본 32K 컨텍스트 모델

# 1) 설정을 먼저 불러와 RoPE 스케일링(YaRN)으로 컨텍스트를 약 4배 확장
config = AutoConfig.from_pretrained(MODEL)
config.rope_scaling = {
    'rope_type': 'yarn',                        # 위치 인코딩을 늘려 잡는 기법
    'factor': 4.0,                              # 32K -> 약 128K 로 확장
    'original_max_position_embeddings': 32768,  # 원래 학습된 최대 길이
}

tok = AutoTokenizer.from_pretrained(MODEL)          # 토크나이저 로드
model = AutoModelForCausalLM.from_pretrained(       # 확장 설정을 적용해 로드
    MODEL, config=config, torch_dtype=torch.float32)

# 2) 긴 문서 원문을 '압축하지 않고 통째로' 넣어 질문한다
long_doc = '제1조 ... (수만 자짜리 계약서 원문이라고 가정) ...'
prompt = '다음 문서 원문을 그대로 참고해 답하세요.\\n[문서]\\n' + long_doc + '\\n[질문]\\n손해배상 예외 사유는?\\n[답변]\\n'
ids = tok(prompt, return_tensors='pt', truncation=True, max_length=32768 * 4)
print('입력 토큰 수:', ids['input_ids'].shape[1])    # 얼마나 긴 입력인지 확인
out = model.generate(**ids, max_new_tokens=200, do_sample=False)
print(tok.decode(out[0], skip_special_tokens=True))  # 원문 근거 그대로 답변`,note:"요약 압축은 빠르지만 세부 정보가 유실될 수 있고, YaRN 으로 컨텍스트를 확장하면 원문 손실은 없는 대신 연산·메모리 부담이 커진다. 조항 하나하나가 중요한 계약서 검토처럼 '세부가 생명'인 작업에서 Long-Context 를 선택하는 판단 기준을 익힌다."},{title:"FastAPI 로 파인튜닝 sLLM 서빙 — /ask 한 개로 시작하는 API 서버",lang:"python",code:`# app.py - 파인튜닝된 sLLM 을 API 로 여는 최소 서빙 코드
from fastapi import FastAPI            # pip install fastapi uvicorn
from pydantic import BaseModel         # 요청 형식을 검증하는 도구

app = FastAPI(title='사내 FAQ sLLM')    # API 서버 객체 생성

class Ask(BaseModel):                  # /ask 로 들어올 요청의 형태 선언
    question: str                      # 질문 문자열(필수)
    max_new_tokens: int = 128          # 답변 길이 상한(기본 128)

@app.get('/health')                    # 서버 상태 확인용(배포 체크리스트 항목)
def health():
    return {'status': 'ok', 'model': 'Qwen2.5-1.5B + LoRA'}

@app.post('/ask')                      # 질문을 받아 답을 돌려주는 핵심 창구
def ask(req: Ask):
    # 학습 때와 '같은 형식'의 프롬프트로 조립해야 성능이 안정적이다
    prompt = '다음은 사내 FAQ입니다.\\n\\nQ: ' + req.question + '\\nA:'
    answer = generate_text(prompt, req.max_new_tokens)  # 학습 실습의 생성 함수 재사용
    return {'question': req.question, 'answer': answer}

# 실행: uvicorn app:app --port 8000
# 접속: http://localhost:8000/docs (Swagger 화면에서 바로 눌러 테스트)
# 배포 전 점검: 응답 지연시간(예: 3초 이내), 검색 결과 없음·토큰 초과 예외 처리`,note:"튜닝한 모델은 파일로 두면 끝이 아니라 API 로 열어야 서비스가 된다. FastAPI 는 Pydantic 으로 요청을 검증하고 /docs 스와거 화면을 공짜로 만들어 주며, /health 응답·지연시간·예외 처리는 교재 배포 체크리스트의 필수 점검 항목이다."},{title:"RAG vs Fine-Tuning — 도메인 지식을 넣는 두 갈래 선택 기준",lang:"text",code:`# 도메인 지식 주입의 두 갈래 - 서로 다른 층위의 작업이다
[RAG / 벡터DB 검색]
  - 지식 위치: 외부 벡터DB (실행 시점에 검색해 근거로 제시)
  - 최신성  : 문서만 갈아끼우면 즉시 반영
  - 잘하는 것: 사실 검색, 근거 제시, 자주 바뀌는 규정 대응
  - 한계    : 검색 품질에 성능이 좌우, 추론·판단형 질문에 약함

[Fine-Tuning / 파라미터 학습]
  - 지식 위치: 모델 가중치 내부 (학습으로 내재화)
  - 최신성  : 바뀔 때마다 재학습 필요(비용·시간 소요)
  - 잘하는 것: 전문 용어·응답 말투·판단 기준 자체를 모델에 심기
  - 한계    : 재학습 비용, 과적합 위험

[실무 결론]
  - 둘은 경쟁이 아니라 결합: 검색(RAG) + 맥락 압축 + LoRA 튜닝 모델
  - 예: 계약서 검토 보조 = 맥락압축 60% + LoRA(법무 용어 주입) 40%
  - 실패 패턴 1: RAG 만 쓰다 실패 - 근거 문서가 없는 추론 질문에 취약
  - 실패 패턴 2: 튜닝만 쓰다 실패 - 자주 바뀌는 규정을 재학습이 못 따라감
  - 임베딩과 sLLM 의 언어 커버리지가 어긋나면 검색은 돼도 답변 품질이 떨어진다`,note:"RAG 는 지식을 밖(벡터DB)에 두고 검색하고, Fine-Tuning 은 지식을 안(가중치)에 심는다는 근본 차이가 있다. 실무에서는 둘 중 하나가 아니라 목적에 따라 비중을 배분해 결합하며, 작은 시나리오로 시작해 비중을 조정하는 것이 검증된 접근이다."}],concepts:[{term:"파인튜닝(fine-tuning)",desc:"이미 다 배운 모델을 내 데이터로 '추가 재교육'해 특정 분야·말투에 더 맞게 만드는 것으로, 신입을 우리 회사 방식으로 다시 교육하는 것과 같다."},{term:"instruction 포맷",desc:"'이런 지시를 받으면 이렇게 답해라'를 지시-입력-출력 한 쌍으로 적은 학습 예시로, 모델에게 주는 모범답안 카드라고 보면 된다."},{term:"LoRA",desc:"거대한 모델 본체는 얼리고(고정하고) 작은 보조 행렬만 새로 배우는 기법으로, 책 전체를 다시 쓰지 않고 포스트잇만 붙이는 것과 같다."},{term:"QLoRA",desc:"베이스 모델을 4비트로 양자화해 메모리를 더 아끼면서 LoRA 학습을 하는 방법으로, 무료 Colab GPU에서도 파인튜닝이 가능해진다."},{term:"어댑터(adapter)",desc:"LoRA로 새로 배운 작은 부품 파일로, 본체 모델에 끼웠다 뺐다 할 수 있어 용량이 수십 MB로 아주 가볍다."},{term:"손실(loss)",desc:"모델의 답이 정답에서 얼마나 틀렸는지를 나타내는 점수로, 학습이 잘 되면 이 숫자가 점점 작아진다(작을수록 좋음)."},{term:"에폭(epoch)",desc:"준비한 학습 데이터 전체를 처음부터 끝까지 한 번 다 본 것을 1에폭이라 하며, 보통 여러 에폭을 반복해 가르친다."},{term:"Prefix/Prompt Tuning",desc:"모델 본체는 그대로 두고 입력 앞에 학습된 '가상 토큰'만 붙여 방향을 바꾸는 초경량 PEFT로, LoRA보다도 바꾸는 값이 적다."},{term:"PEFT 선택 가이드",desc:"도메인 지식을 넉넉히 주입할 땐 LoRA/QLoRA, 극소 자원만 쓸 땐 Prefix/Prompt, 여러 작업을 갈아 끼울 땐 Adapter처럼 목적에 맞게 고른다."},{term:"sLLM 서비스 파이프라인",desc:"파인튜닝한 sLLM에 임베딩·Vector DB(RAG)를 연결해, 사내 문서를 근거로 답하는 실제 서비스로 완성하는 흐름이다."},{term:"전처리·후처리(프롬프트 템플릿)",desc:"모델에 넣기 전 사용자 질문을 정해진 대화 양식(시스템/사용자/어시스턴트 형식, chat template)으로 감싸는 게 전처리, 모델이 뱉은 원문에서 필요한 부분만 잘라내거나 형식을 맞추는 게 후처리다. 같은 질문이라도 학습 때 쓴 템플릿과 똑같이 감싸 줘야 파인튜닝 효과가 제대로 난다."},{term:"stop token(정지 토큰)",desc:"모델에게 여기서 답을 멈추라고 알려주는 특수 표시로, 이것이 없으면 모델이 답을 마치고도 계속 이상한 말을 이어 쓴다."}],detail:{topics:[{h:"좋은 학습 데이터의 조건",items:["지시-출력이 명확하고 일관된 형식일 것","다양한 표현·상황을 골고루 담을 것","정답(출력)의 품질이 높아야 모델이 잘 배움","양보다 질: 잘 만든 50개가 엉성한 500개보다 나음","민감정보·저작권 데이터는 제외하기"]},{h:"핵심 하이퍼파라미터",items:["learning_rate: 학습 속도, LoRA는 1e-4~3e-4 흔함","epoch: 반복 횟수, 너무 크면 과적합","r(rank): LoRA 보조 행렬 크기(8·16·32)","batch_size: 한 번에 보는 데이터 수(메모리에 맞춰)","target_modules: 어떤 층에 LoRA를 붙일지"]},{h:"평가와 검증 방법",items:["loss 곡선이 안정적으로 내려가는지 보기","학습 전·후 같은 질문으로 답변 비교","학습에 안 쓴 테스트 질문으로 일반화 확인","과적합 징후: 학습셋만 잘하고 새 질문은 못함","사람이 직접 읽어보는 정성 평가 병행"]},{h:"PEFT 변형 비교와 sLLM 서비스",items:["LoRA/QLoRA: 도메인 지식 주입에 두루 강함(대세)","Adapter: 여러 작업을 부품처럼 갈아 끼울 때","Prefix/Prompt Tuning: 극소 자원·초경량이 필요할 때","선택 가이드: 목적(지식·자원·전환)에 맞게 고르기","서비스화: 파인튜닝 sLLM + 임베딩 + Vector DB(RAG) 연결"]},{h:"목적별 PEFT 시나리오 3종 — 무엇이 달라지나",items:["① 도메인 지식/말투 주입 → LoRA·QLoRA, 지시-출력 쌍 수십~수백 장, r=8~16, 에폭 3 안팎(가장 흔한 기본값)","② 극소 자원·초경량 배포 → Prefix/Prompt Tuning, 본체는 그대로 두고 가상 토큰만 학습","③ 여러 작업 전환 → Adapter, 작업별 부품을 끼웠다 뺐다 하며 한 본체로 다역","④ 추론 능력 강화 → 사고과정이 담긴 데이터로 LoRA 학습하거나 큰 모델 답을 증류","핵심 차이: 목적이 바뀌면 데이터 형태·붙이는 위치·학습 강도가 함께 바뀜 — 기법만 고르는 게 아니라 데이터부터 다르게 준비"]},{h:"서빙 기본 성능 튜닝 — 배포 전 체크리스트",items:["샘플링: temperature 낮추면(0~0.3) 일관, 높이면 다양 — 업무용은 낮게","길이 제한: max_new_tokens로 답 길이·응답시간 통제","스트리밍: 한 글자씩 흘려보내면 체감 속도가 빨라짐","양자화 추론: 4비트로 올리면 메모리↓ 속도↑, 품질은 소폭↓","동시 처리: 트래픽이 많으면 vLLM 같은 서버로 배치 처리, KV 캐시로 반복 연산 절약","어댑터 병합: 배포 시 LoRA를 본체에 합치면(merge) 로딩·추론이 단순해짐"]}],labs:[{title:"Lab 1 — 내 학습셋 5장 만들기",steps:["우리 팀·도메인에서 자주 묻는 질문 5개를 고른다.","각 질문의 모범답안을 직접 작성한다.","examples의 JSONL 코드로 'text' 형식 카드 5장을 만든다.","data.jsonl 파일을 열어 5줄이 잘 들어갔는지 확인한다.","오타·형식 불일치가 없는지 한 줄씩 점검한다."]},{title:"Lab 2 — 학습 전후 답변 비교",steps:["학습 전 베이스 모델에 테스트 질문 3개를 던져 답을 메모한다.","train_lora.py 로 3에폭 학습을 돌린다.","학습 후 어댑터를 끼운 모델에 같은 질문 3개를 던진다.","전·후 답변을 나란히 표로 정리한다.","어떤 점이 의도대로 바뀌었는지 한 줄 코멘트를 단다."]},{title:"Lab 3 — 어댑터 저장·재사용",steps:["model.save_pretrained('my-lora') 로 어댑터를 저장한다.","my-lora 폴더 용량이 수십 MB인지 확인한다.","런타임을 새로 시작한다(메모리 비우기).","PeftModel로 베이스+my-lora를 다시 불러온다.","질문을 던져 학습 결과가 그대로 재현되는지 확인한다."]},{title:"Lab 4 — 사내 문서 3개로 미니 RAG 붙이기",steps:["우리 팀 규정·매뉴얼에서 한두 문장짜리 사실 문장 3~5개를 골라 docs 리스트로 적는다.","'pip install sentence-transformers numpy' 로 임베딩 라이브러리를 설치한다.","examples의 rag.py 코드를 그대로 만들고 docs만 우리 문장으로 교체한다.","Ollama가 켜져 있는지(ollama run qwen2.5:0.5b) 확인한다.","우리 문서로만 답할 수 있는 질문을 던져 모델이 올바른 근거를 인용하는지 확인한다.","일부러 문서에 없는 질문을 던져 '근거에 없다'고 답하는지, 아니면 지어내는지(환각) 관찰하고 한 줄 코멘트를 단다.","top_k를 1에서 2로 늘려 답변이 어떻게 달라지는지 비교한다."]}],homework:["내 도메인 학습셋을 20장으로 늘려 다시 파인튜닝하고, 데이터를 5장·20장으로 늘렸을 때 답변 품질이 어떻게 달라졌는지 비교 보고서를 한 페이지로 작성하기.","learning_rate 또는 epoch 중 하나를 두 가지 값으로 바꿔 학습해 loss 곡선과 답변 품질 차이를 캡처와 함께 정리하기."]},theory:{theory:[{h:"파인튜닝은 '신입 재교육'이다",body:`이미 한국어와 상식을 두루 아는 똑똑한 신입사원이 들어왔다고 생각해 보자.
이 신입은 일반 지식은 풍부하지만 우리 회사의 용어·규정·말투는 아직 모른다.
파인튜닝은 바로 이 신입을 우리 회사 사례로 며칠 더 교육해 '우리식으로' 답하게 만드는 과정이다.

그래서 파인튜닝은 모델에게 새 지식을 통째로 주입하는 것이 아니라, 이미 아는 것을 '우리 방식'으로 정렬하는 데 강하다.
말투를 통일하거나, 정해진 형식(JSON 등)으로 답하게 하거나, 특정 도메인 질문에 일관되게 답하게 할 때 효과가 크다.
반대로 최신 사실을 알려주는 일은 파인튜닝보다 RAG(검색 붙이기)가 더 잘 맞는다는 점도 함께 기억하자.`},{h:"LoRA — 책에 포스트잇만 붙이기",body:`두꺼운 전공책 전체를 내 마음대로 다시 쓰려면 시간도 종이도 엄청나게 든다.
LoRA는 책 본문은 그대로 두고, 필요한 곳에 작은 포스트잇(보조 행렬)만 붙여 내용을 보완하는 방식이다.
모델의 거대한 가중치는 그대로 얼려 두고, 그 옆에 끼우는 작은 행렬 두 개만 새로 학습하기 때문이다.

이렇게 하면 학습해야 할 숫자가 전체의 1% 미만으로 줄어 메모리와 시간이 크게 절약된다.
게다가 배운 결과가 수십 MB짜리 '어댑터' 파일로만 나와서, 본체에 끼웠다 뺐다 하며 여러 버전을 쉽게 관리할 수 있다.
QLoRA는 여기에 더해 본체를 4비트로 압축해 불러오므로, 무료 Colab GPU에서도 작은 모델 파인튜닝이 가능해진다.`},{h:"잘 배웠는지 확인하기 — loss와 눈으로 보는 검증",body:`학습 중에는 loss라는 점수를 본다.
loss는 모델의 답이 정답에서 얼마나 벗어났는지를 나타내며, 학습이 잘 되면 이 숫자가 계단을 내려가듯 점점 작아진다.
다만 loss가 줄었다고 무조건 좋은 것은 아니어서, 학습 데이터만 통째로 외워버리는 '과적합'도 조심해야 한다.

그래서 숫자만 믿지 말고 사람이 직접 물어보는 검증을 함께 한다.
학습 전 모델과 학습 후 모델에 같은 질문을 던져 답변이 의도대로 바뀌었는지 눈으로 비교하는 것이다.
이 '전·후 비교'가 파인튜닝이 성공했는지 가장 직관적으로 확인하는 방법이다.`},{h:"PEFT 삼형제 — 상황에 맞게 고른다",body:`전체를 다시 가르치지 않고 작은 부품만 학습하는 PEFT에도 여러 방식이 있다.
LoRA(와 4비트로 더 가볍게 하는 QLoRA)는 도메인 지식을 넉넉히 주입할 때 두루 강해 가장 많이 쓴다.
Adapter는 작업마다 부품을 갈아 끼우고 싶을 때 좋고, Prefix/Prompt Tuning은 모델은 그대로 두고 입력 앞에 학습된 '가상 토큰'만 붙이는 초경량 방식이라 자원이 아주 적을 때 유리하다.

정하는 기준은 간단하다: 지식을 많이 넣어야 하면 LoRA, 여러 작업을 전환해야 하면 Adapter, 극소 자원이면 Prefix.
그리고 파인튜닝한 sLLM에 임베딩·Vector DB(RAG)를 연결하면, 사내 문서를 근거로 답하는 실제 서비스가 된다.`},{h:"sLLM·PEFT 2026 동향 — 작은 모델이 주인공이 되는 흐름",body:`둘째 날은 '요즘 현장이 왜 작은 모델로 움직이는가'로 시작한다. 학계·업계·현장 세 층으로 나눠 보자.

[현장] 폰·노트북·사내 서버에서 직접 모델을 돌리려는 '온디바이스' 수요가 폭발했다. 이유는 첫날 배운 그대로 — 비용 절감, 데이터 보안, 오프라인 동작이다. 이 수요가 소형 모델 발전을 끌고 간다.

[업계] 소형 모델의 세대가 매년 훌쩍 뛴다. Llama 3.x(1B·3B·8B), Qwen2.5(0.5B~7B), Gemma 2(2B·9B), Phi 계열 같은 2~8B급 모델이 '작년의 중형 모델' 수준까지 올라왔다. 결정적 비결은 '증류(distillation)' — 큰 모델의 답과 사고 과정을 작은 모델에 베껴 넣어 실력을 끌어올린다.

[학계·도구] 파인튜닝 쪽은 메모리를 극단적으로 아끼는 QLoRA가 사실상 표준이 됐고, 그 이후로도 학습을 몇 배 빠르게 해 주는 도구(예: Unsloth)와 LoRA를 개선한 변형들이 계속 나온다. 서빙 쪽도 vLLM(고성능 서버)과 llama.cpp/GGUF(CPU 구동)가 대중화돼 '작은 모델을 어디서든 띄우기'가 쉬워졌다.

현장의 결론은 첫날과 같다 — '가장 큰 모델'이 아니라 '내 문제에 딱 맞게 튜닝한 가장 작은 모델'을 찾는 것이 비용·속도·보안 모두에서 이득이다. 오늘 우리는 바로 그 '튜닝'을 직접 해 본다.`},{h:"sLLM 서비스로 완성하기 — 임베딩·Vector DB·RAG 설계",body:`6교시는 파인튜닝한 모델을 '진짜 서비스'로 잇는 시간이다. 여기서 RAG(검색 붙이기)가 등장한다.

왜 파인튜닝만으로 부족한가 — 파인튜닝은 '말투와 형식'을 바꾸는 데 강하지만, 방대하고 자주 바뀌는 '사실 지식'을 통째로 넣기엔 나쁘다. 규정이 바뀔 때마다 다시 학습할 수는 없다. 그래서 '최신 사실은 검색해서 근거로 붙여 주자'는 것이 RAG다.

RAG 파이프라인의 흐름은 이렇다.
① 사내 문서를 적당한 크기의 조각(청크)으로 쪼갠다.
② 임베딩 모델로 각 청크를 '의미 벡터'로 바꾼다.
③ 그 벡터들을 Vector DB에 저장해 둔다.
④ 사용자 질문이 오면 질문도 벡터로 바꾼다.
⑤ Vector DB에서 질문과 의미가 가까운 청크 몇 개(top-k)를 찾아온다.
⑥ 찾아온 청크를 '근거'로 프롬프트에 붙여 sLLM에 넘기고, 모델은 그 근거를 보고 답한다.

설계 시 선택할 것들.
임베딩 모델: 한국어를 잘 다루는 다국어 임베딩(bge-m3, multilingual-e5 계열 등)을 고른다.
Vector DB: 입문·소규모면 FAISS나 Chroma(로컬·간단), 운영·대규모면 Qdrant·Milvus를 쓴다.
설계 포인트: 청크 크기(너무 크면 잡음, 너무 작으면 맥락 손실), top-k 개수, 그리고 부서·날짜 같은 메타데이터 필터.

핵심 한 줄 — 파인튜닝은 '우리 말투', RAG는 '우리 근거'. 둘을 합치면 '사내 문서를 근거로, 우리 말투로 답하는' sLLM 서비스가 완성된다. 바로 다음 실습에서 이 RAG를 직접 붙여 본다.`}]},realCodes:[{title:"QLoRA로 작은 모델 파인튜닝하기 (train_lora.py)",lang:"python",code:`import torch                                   # 딥러닝 연산을 담당하는 핵심 라이브러리
from datasets import load_dataset              # 학습 데이터를 불러오는 도구
from transformers import (AutoModelForCausalLM,  # 사전학습 언어모델을 불러오는 클래스
                          AutoTokenizer,         # 문장을 토큰(숫자)으로 바꾸는 도구
                          BitsAndBytesConfig,    # 4비트 양자화 설정용
                          TrainingArguments)     # 학습 옵션(에폭·배치 등) 설정용
from peft import LoraConfig, get_peft_model     # LoRA 어댑터를 모델에 붙이는 도구
from trl import SFTConfig, SFTTrainer                       # 지시학습(SFT)을 쉽게 해주는 학습기

MODEL = "Qwen/Qwen2.5-0.5B"                      # 파인튜닝할 작은 베이스 모델

# 베이스 모델을 4비트로 양자화해 메모리를 아끼는 설정(QLoRA의 핵심)
bnb = BitsAndBytesConfig(load_in_4bit=True,            # 4비트로 불러오기 켜기
                         bnb_4bit_compute_dtype=torch.float16)  # 계산은 16비트로

tok = AutoTokenizer.from_pretrained(MODEL)      # 모델에 맞는 토크나이저 불러오기
tok.pad_token = tok.eos_token                   # 빈자리 채움 토큰을 문장끝 토큰으로 지정

model = AutoModelForCausalLM.from_pretrained(   # 양자화 설정을 적용해 모델 불러오기
    MODEL, quantization_config=bnb, device_map="auto")  # GPU에 자동 배치

# LoRA 설정: r은 보조 행렬 크기, 어떤 층에 붙일지 지정
lora = LoraConfig(r=8, lora_alpha=16,           # r=8 작은 보조 행렬, alpha는 학습 강도
                  target_modules=["q_proj", "v_proj"],  # 어텐션의 Q·V 부분에만 부착
                  lora_dropout=0.05, task_type="CAUSAL_LM")  # 과적합 방지 드롭아웃
model = get_peft_model(model, lora)             # 베이스 모델에 LoRA 어댑터를 끼운다

ds = load_dataset("json", data_files="data.jsonl")["train"]  # 내 학습 데이터 불러오기

args = SFTConfig(output_dir="out",       # 결과 저장 폴더
                         num_train_epochs=3,      # 데이터를 3번 반복 학습
                         per_device_train_batch_size=2,  # 한 번에 2개씩 학습
                         learning_rate=2e-4,      # 학습 속도(LoRA는 보통 큰 편)
                         logging_steps=5, dataset_text_field="text")  # text 열 지정·5스텝마다 loss

trainer = SFTTrainer(model=model, train_dataset=ds,  # 모델·데이터 연결
                     args=args)  # dataset_text_field는 SFTConfig로 이동(TRL 1.x)
trainer.train()                                  # 학습 시작(loss가 줄어드는 로그가 나옴)

model.save_pretrained("my-lora")                 # 학습된 LoRA 어댑터만 저장(수십 MB)
print("학습 완료! my-lora 폴더에 어댑터 저장됨")  # 결과: 완료 메시지 출력`,note:`베이스 모델은 4비트로 얼려 두고 q_proj·v_proj에 붙인 작은 LoRA만 학습하므로 무료 GPU에서도 돌아간다.
학습이 끝나면 본체가 아니라 가벼운 어댑터(my-lora)만 저장되는 것이 LoRA의 가장 큰 장점이다.`},{title:"실전: 파인튜닝 어댑터 로드 후 추론",lang:"python",code:`from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel

BASE = "Qwen/Qwen2.5-0.5B-Instruct"

# 1) 원본(베이스) 위에 학습한 LoRA 어댑터를 얹는다
base = AutoModelForCausalLM.from_pretrained(BASE, device_map="auto")
model = PeftModel.from_pretrained(base, "./adapter")   # 수 MB 어댑터
model = model.merge_and_unload()                       # 추론용으로 병합(선택)
tok = AutoTokenizer.from_pretrained(BASE)

# 2) chat template 로 추론(학습 포맷과 동일해야 함)
msgs = [{"role": "user", "content": "연차는 며칠인가요?"}]
inputs = tok.apply_chat_template(msgs, add_generation_prompt=True, return_tensors="pt").to(model.device)
out = model.generate(inputs, max_new_tokens=128, do_sample=False)  # 결정적 생성
print(tok.decode(out[0][inputs.shape[1]:], skip_special_tokens=True))`,note:"베이스 모델에 LoRA 어댑터를 로드/병합해 추론. 추론 포맷(chat template)이 학습과 일치해야 성능이 유지된다."}],periods:["1교시 — sLLM·PEFT 최신 동향: 작은 모델이 뜨는 이유(온디바이스·증류·QLoRA 이후 흐름)","2교시 — PEFT 변형 비교: LoRA·QLoRA vs Adapter vs Prefix/Prompt tuning","3교시 — 목적별 PEFT 선택 가이드(도메인 지식·극소 파라미터·추론 강화)","4교시 [실습] instruction 데이터 JSONL 가공 + LoRA 학습 코드 작성","5교시 [실습] LoRA 첫 학습 돌리고 loss 곡선 보기","6교시 — sLLM 서비스 파이프라인: 임베딩 연결·Vector DB 선정·설계","7교시 [실습] sLLM + Vector DB(RAG) 연동해 보기","8교시 [실습] 학습한 LoRA 합쳐 추론·서빙 배포·마무리"]}};export{n as default};
