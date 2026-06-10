// 날짜별 "심화 이론(theory)" + "실전 소스(realCode)" — subjectId-day 키.
//   theory:   [{ h, body }]            상세 이론 정리(서술형)
//   realCode: [{ title, lang, code, note }]  길고 실전적인 소스 예시
// (1차: LLM·Agent 핵심 / 이후 ML·DL·Vue·서빙·프로젝트로 확장)

export const theory = {
  // ── Prompt 설계와 Context Engineering ──
  'prompt-1': {
    theory: [
      {
        h: 'LLM은 어떻게 텍스트를 생성하는가',
        body: 'LLM은 입력 토큰 시퀀스를 받아 "다음 토큰의 확률분포"를 출력하고, 이를 샘플링해 한 토큰씩 이어붙이는 자기회귀(autoregressive) 모델이다. temperature는 이 분포를 평탄(높음)하거나 뾰족(낮음)하게 만들어 무작위성을 조절하고, top_p(누적확률 컷)·top_k(후보 수 제한)로 샘플링 범위를 좁힌다. 따라서 temperature>0이면 같은 프롬프트라도 매번 결과가 달라진다. 비용·컨텍스트 한도는 모두 토큰 수로 계산되며, 한국어는 영어보다 토큰이 많이 쪼개져 비용·길이 관리가 특히 중요하다.',
      },
      {
        h: '프롬프트 설계의 5요소',
        body: '효과적인 프롬프트는 역할(누구로서)·지시(무엇을)·맥락(배경)·예시(few-shot)·제약(형식·금지)을 분리해 명시한다. Few-shot 예시는 원하는 입출력 패턴을 "보여줘" 형식을 안정화하고, Chain-of-Thought("단계적으로 풀어라")는 중간 추론을 유도해 산술·논리 정확도를 높인다. 다만 CoT는 토큰을 더 쓰므로, 최종 답만 필요하면 추론은 내부적으로 하되 정해진 형식의 답만 출력하도록 지시한다. 출력은 JSON 스키마 등으로 강제하면 후속 파싱이 안정적이다.',
      },
      {
        h: 'Context Engineering · 환각 · 보안',
        body: '모델은 컨텍스트 윈도우 안의 정보만 본다. 긴 문서는 요약·청킹·검색(RAG)으로 필요한 부분만 주입하고, 토큰 예산을 고려해 무엇을 넣고 뺄지 설계하는 것이 Context Engineering이다. 환각은 모델이 학습 분포에서 "그럴듯한" 토큰을 생성하기 때문에 생기며, 근거 문서 제공·"모르면 모른다고 답하라" 지시·출처 인용으로 완화한다. 사용자 입력을 system 지시와 절대 합치지 않고 검증해 프롬프트 인젝션·탈옥을 방어한다.',
      },
    ],
    realCode: [
      {
        title: '실전: 재시도 + JSON 스키마 검증 LLM 호출',
        lang: 'python',
        code: `import json, time
from anthropic import Anthropic

client = Anthropic()  # ANTHROPIC_API_KEY

SCHEMA_HINT = '{"category": "배송|결제|환불|기타", "urgent": true|false}'

def classify(text: str, retries: int = 2) -> dict:
    """문의를 분류해 검증된 dict로 반환. 형식 오류 시 재시도."""
    prompt = (
        "너는 고객문의 분류기다. 반드시 아래 JSON만 출력한다.\\n"
        f"형식: {SCHEMA_HINT}\\n\\n"
        f"문의: {text}"
    )
    last_err = None
    for attempt in range(retries + 1):
        msg = client.messages.create(
            model="claude-sonnet-4-5",
            max_tokens=200,
            temperature=0,                 # 분류는 결정적으로
            messages=[{"role": "user", "content": prompt}],
        )
        raw = msg.content[0].text.strip()
        try:
            data = json.loads(raw)         # 파싱 시도
            assert data["category"] in {"배송", "결제", "환불", "기타"}
            assert isinstance(data["urgent"], bool)
            return data                    # 검증 통과
        except Exception as e:             # 형식 깨지면 재시도
            last_err = e
            prompt += f"\\n\\n[이전 출력이 형식 오류였다: {e}. JSON만 다시 출력하라]"
            time.sleep(0.5 * (attempt + 1))
    raise ValueError(f"형식 검증 실패: {last_err}")

print(classify("결제했는데 두 번 빠져나갔어요"))
# → {'category': '결제', 'urgent': True}`,
        note: '운영용 LLM 호출의 기본형: temperature=0으로 결정성 확보, 파싱+스키마 검증, 실패 시 오류를 프롬프트에 피드백하며 재시도.',
      },
    ],
  },

  // ── sLLM ──
  'sllm-1': {
    theory: [
      {
        h: 'sLLM을 쓰는 이유와 트레이드오프',
        body: 'sLLM(수~수십억 파라미터)은 온프레미스 구동으로 데이터가 외부로 나가지 않아 프라이버시·규제에 유리하고, 호출당 비용이 없으며 지연을 통제할 수 있다. 대신 대형 모델 대비 추론 능력·세계 지식이 약하므로, RAG로 지식을 보강하거나 도메인 데이터로 파인튜닝해 특정 작업 성능을 끌어올리는 전략이 핵심이다. 모델 선택은 라이선스(상업적 사용 가능 여부), 벤치마크, 한국어 성능, 컨텍스트 길이를 함께 본다.',
      },
      {
        h: '양자화와 메모리 산정',
        body: '양자화는 FP16 가중치를 INT8/INT4 등 낮은 비트로 표현해 메모리를 크게 줄인다(대략 7B FP16≈14GB, 4bit≈4~5GB). NF4는 정규분포에 최적화된 4bit 포맷으로 QLoRA에서 쓰인다. 추론 시 실제 메모리는 가중치+KV 캐시(컨텍스트 길이·배치에 비례)로 결정되므로, 긴 컨텍스트·큰 배치는 VRAM을 빠르게 소모한다. vLLM의 PagedAttention은 KV 캐시를 페이지 단위로 관리해 처리량을 높인다.',
      },
    ],
    realCode: [
      {
        title: '실전: vLLM OpenAI 호환 서버 + 스트리밍 클라이언트',
        lang: 'python',
        code: `# 1) 서버 기동 (터미널)
#    python -m vllm.entrypoints.openai.api_server \\
#      --model Qwen/Qwen2.5-7B-Instruct --quantization awq --max-model-len 8192

# 2) OpenAI SDK로 그대로 호출 (호환 API)
from openai import OpenAI

client = OpenAI(base_url="http://localhost:8000/v1", api_key="EMPTY")  # 로컬

stream = client.chat.completions.create(
    model="Qwen/Qwen2.5-7B-Instruct",
    messages=[
        {"role": "system", "content": "너는 간결한 한국어 코드 리뷰어다."},
        {"role": "user", "content": "이 함수의 시간복잡도와 개선점은? def f(a): return [x for x in a if a.count(x) > 1]"},
    ],
    temperature=0.2,
    stream=True,          # 토큰 스트리밍
)
for chunk in stream:      # 생성되는 즉시 출력
    delta = chunk.choices[0].delta.content or ""
    print(delta, end="", flush=True)`,
        note: 'vLLM은 OpenAI 호환 엔드포인트를 제공하므로 기존 OpenAI 코드를 base_url만 바꿔 재사용한다. count()를 루프에서 호출해 O(n²)인 점을 모델이 지적하도록 유도하는 예시.',
      },
    ],
  },
  'sllm-2': {
    theory: [
      {
        h: 'LoRA의 수학적 직관',
        body: '파인튜닝은 가중치 W를 W+ΔW로 갱신하는 것인데, LoRA는 ΔW를 두 저랭크 행렬의 곱 B·A(rank r ≪ 차원)로 근사한다. 즉 원본 W는 고정(freeze)하고 작은 A·B만 학습하므로 학습 파라미터가 전체의 1% 미만으로 줄고, 결과물은 수 MB 어댑터로 저장된다. r(rank)과 alpha(스케일)가 핵심 하이퍼파라미터이며, target_modules로 어떤 층(주로 q_proj·v_proj)에 적용할지 정한다. QLoRA는 4bit 양자화된 베이스 위에 LoRA를 얹어 단일 GPU로도 큰 모델을 미세조정한다.',
      },
      {
        h: '데이터셋 품질이 성능을 좌우한다',
        body: 'instruction 튜닝 데이터는 (지시, 입력, 응답) 형태로 구성하며, 모델별 chat template에 정확히 맞춰야 학습/추론 포맷 불일치로 인한 성능 저하를 막는다. 수백 건의 고품질 데이터가 수천 건의 잡음 데이터보다 낫다 — 중복 제거, 형식 통일, 응답 품질 검수가 중요하다. 적은 데이터로 과도하게 학습하면 과적합되므로 검증셋으로 손실을 모니터링하고 조기종료한다.',
      },
    ],
    realCode: [
      {
        title: '실전: QLoRA 파인튜닝 파이프라인 (PEFT + TRL)',
        lang: 'python',
        code: `from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model
from trl import SFTTrainer, SFTConfig
from datasets import load_dataset

MODEL = "Qwen/Qwen2.5-0.5B-Instruct"

# 1) 4bit 양자화 로딩 (QLoRA)
bnb = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4",
                         bnb_4bit_compute_dtype="bfloat16")
model = AutoModelForCausalLM.from_pretrained(MODEL, quantization_config=bnb, device_map="auto")
tok = AutoTokenizer.from_pretrained(MODEL)

# 2) LoRA 설정 — q/v 투영층만, 전체의 ~0.5%만 학습
lora = LoraConfig(r=16, lora_alpha=32, lora_dropout=0.05,
                  target_modules=["q_proj", "v_proj"], task_type="CAUSAL_LM")
model = get_peft_model(model, lora)
model.print_trainable_parameters()

# 3) 데이터셋 — chat template 적용
ds = load_dataset("json", data_files="train.jsonl")["train"]
def fmt(ex):
    return {"text": tok.apply_chat_template(ex["messages"], tokenize=False)}
ds = ds.map(fmt)

# 4) 학습
trainer = SFTTrainer(
    model=model, train_dataset=ds,
    args=SFTConfig(output_dir="out", num_train_epochs=3, per_device_train_batch_size=2,
                   gradient_accumulation_steps=4, learning_rate=2e-4, logging_steps=10,
                   bf16=True, save_strategy="epoch"),
)
trainer.train()
model.save_pretrained("./adapter")   # 어댑터만 저장(수 MB)`,
        note: 'QLoRA 표준 파이프라인: 4bit 로딩 → LoRA 부착 → chat template 포맷 → SFTTrainer 학습 → 어댑터 저장. gradient_accumulation으로 실효 배치를 키워 작은 GPU를 보완.',
      },
    ],
  },

  // ── RAG ──
  'rag-1': {
    theory: [
      {
        h: 'RAG가 해결하는 문제',
        body: 'LLM은 학습 시점 이후 지식(지식 컷오프)을 모르고, 사내 비공개 문서도 알지 못하며, 모르면 환각한다. RAG(Retrieval-Augmented Generation)는 질의 시점에 외부 지식베이스에서 관련 문서를 "검색"해 프롬프트에 "증강"한 뒤 생성한다. 덕분에 최신성·근거·출처를 확보하고, 파인튜닝 없이 지식을 갱신할 수 있다(문서만 교체). 파인튜닝이 "말투·형식·기술"을 가르친다면, RAG는 "사실·지식"을 주입하는 상호보완 관계다.',
      },
      {
        h: '청킹과 임베딩 설계',
        body: '문서는 그대로 임베딩하면 너무 길어 검색 정밀도가 떨어지므로 의미 단위로 분할(청킹)한다. 청크가 너무 작으면 문맥이 끊기고, 너무 크면 노이즈가 섞인다 — 보통 300~800자에 10~20% 오버랩을 두고, 문단·문장 경계를 우선 분할한다. 각 청크는 임베딩 모델로 고차원 벡터가 되며, 의미가 비슷한 텍스트는 벡터 공간에서 가깝게 위치한다. 임베딩 모델의 차원과 Vector DB 설정이 일치해야 한다.',
      },
    ],
    realCode: [
      {
        title: '실전: 적재→검색 RAG 파이프라인 (LangChain + Chroma)',
        lang: 'python',
        code: `from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# 1) 적재 + 청킹 (문단→문장 경계 우선)
docs = PyPDFLoader("manual.pdf").load()
chunks = RecursiveCharacterTextSplitter(
    chunk_size=600, chunk_overlap=80,
    separators=["\\n\\n", "\\n", ". ", " "],
).split_documents(docs)

# 2) 임베딩 + 벡터 인덱스 저장
db = Chroma.from_documents(chunks, OpenAIEmbeddings(model="text-embedding-3-small"),
                           persist_directory="./db")
retriever = db.as_retriever(search_kwargs={"k": 4})

# 3) 검색 컨텍스트 결합 프롬프트 (환각 억제 지시 포함)
prompt = ChatPromptTemplate.from_template(
    "아래 컨텍스트만 근거로 한국어로 답하라. 근거가 없으면 '자료에 없음'이라고 답하라.\\n\\n"
    "[컨텍스트]\\n{context}\\n\\n[질문] {question}")

def fmt(docs):  # 검색 결과를 출처와 함께 직렬화
    return "\\n---\\n".join(f"(p.{d.metadata.get('page','?')}) {d.page_content}" for d in docs)

rag = ({"context": retriever | fmt, "question": RunnablePassthrough()}
       | prompt | ChatOpenAI(model="gpt-4o-mini", temperature=0) | StrOutputParser())

print(rag.invoke("환불은 며칠 걸리나요?"))`,
        note: '적재-청킹-임베딩-검색-생성을 LCEL로 연결한 완결형 RAG. 출처(page)를 컨텍스트에 포함하고 "없으면 없다"를 지시해 환각을 줄인다.',
      },
    ],
  },
  'rag-3': {
    theory: [
      {
        h: 'RAG는 측정해야 개선된다',
        body: 'RAG 품질은 검색 단계와 생성 단계로 나뉘므로 실패 원인을 분리 진단해야 한다. 검색이 정답 문서를 못 가져오면(낮은 context recall) 청킹·임베딩·top-k를 손보고, 정답 문서를 가져왔는데 답이 틀리면(낮은 faithfulness) 프롬프트·모델을 손본다. RAGAS 같은 도구는 충실도(답이 컨텍스트에 근거하는가)·답변 관련성·문맥 정밀도/재현율을 LLM 평가자로 자동 산출해, 튜닝 전후를 정량 비교하게 해준다.',
      },
      {
        h: '검색 고도화: 하이브리드 + 재순위',
        body: '벡터 검색은 의미는 잘 잡지만 고유명사·코드·약어 같은 정확 일치에 약하다. BM25(키워드)와 벡터 검색을 결합한 하이브리드 검색이 이를 보완한다. 또한 1차로 후보를 넓게(top-20) 회수한 뒤 cross-encoder 재순위 모델로 (질의, 문서) 쌍을 정밀 채점해 상위 4개만 쓰면 정확도가 크게 오른다. 멀티쿼리(질문을 여러 표현으로 확장)·HyDE(가상 답변을 만들어 검색)도 재현율을 높이는 기법이다.',
      },
    ],
    realCode: [
      {
        title: '실전: 하이브리드 검색 + Cross-Encoder 재순위',
        lang: 'python',
        code: `from langchain_community.retrievers import BM25Retriever
from langchain.retrievers import EnsembleRetriever
from sentence_transformers import CrossEncoder

# 1) 하이브리드: 키워드(BM25) + 벡터, 가중 앙상블
bm25 = BM25Retriever.from_documents(chunks); bm25.k = 10
vec = db.as_retriever(search_kwargs={"k": 10})
hybrid = EnsembleRetriever(retrievers=[bm25, vec], weights=[0.4, 0.6])

# 2) 재순위: cross-encoder로 (질의,문서) 정밀 채점
reranker = CrossEncoder("BAAI/bge-reranker-v2-m3")

def search(query: str, top_n: int = 4):
    cands = hybrid.invoke(query)                  # 넓게 회수(recall↑)
    pairs = [(query, d.page_content) for d in cands]
    scores = reranker.predict(pairs)              # 정밀 채점
    ranked = sorted(zip(scores, cands), key=lambda x: x[0], reverse=True)
    return [d for _, d in ranked[:top_n]]         # 상위 N만(precision↑)

for d in search("환불 정책 예외 조항"):
    print(round(float(d.metadata.get("page", 0)), 1), d.page_content[:60])`,
        note: '2단계 검색의 정석: 하이브리드로 recall 확보 → cross-encoder로 precision 확보. 고유명사·예외 조항처럼 정확 일치가 중요한 질의에서 효과가 크다.',
      },
    ],
  },

  // ── LangChain ──
  'langchain-1': {
    theory: [
      {
        h: 'LangChain과 LCEL의 철학',
        body: 'LangChain은 LLM 앱을 모델·프롬프트·출력파서·도구·메모리·리트리버 같은 교체 가능한 부품으로 보고 조합한다. LCEL(LangChain Expression Language)은 이 부품들을 | 파이프로 잇는 선언적 표현으로, 모든 컴포넌트가 invoke/stream/batch를 가진 Runnable 인터페이스를 구현하기에 일관되게 연결·스트리밍·병렬화된다. 예: prompt | model | parser. 선언적이라 중간 단계 교체(모델 바꾸기, 파서 추가)가 쉽다.',
      },
      {
        h: '구조화 출력과 신뢰성',
        body: 'LLM의 자유 텍스트는 후속 처리가 불안정하므로 출력 파서로 JSON/객체를 강제한다. Pydantic 모델을 파서에 연결하면 타입·필수값을 검증하고, 실패 시 with_retry로 재요청한다. 운영에서는 with_fallbacks로 주 모델 장애 시 대체 모델로 전환해 가용성을 확보한다. 이런 견고성 패턴(검증·재시도·폴백)이 데모와 서비스의 차이를 만든다.',
      },
    ],
    realCode: [
      {
        title: '실전: Pydantic 구조화 출력 + 폴백 + 재시도',
        lang: 'python',
        code: `from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field

class Ticket(BaseModel):
    category: str = Field(description="배송/결제/환불/기타 중 하나")
    priority: int = Field(ge=1, le=5, description="긴급도 1~5")
    summary: str

parser = PydanticOutputParser(pydantic_object=Ticket)

prompt = ChatPromptTemplate.from_messages([
    ("system", "고객 문의를 분석해 지정 형식으로만 답하라.\\n{format}"),
    ("human", "{text}"),
]).partial(format=parser.get_format_instructions())

# 주 모델 실패 시 보조 모델로 폴백 + 2회 재시도
model = (ChatOpenAI(model="gpt-4o", temperature=0)
         .with_fallbacks([ChatOpenAI(model="gpt-4o-mini")])
         .with_retry(stop_after_attempt=2))

chain = prompt | model | parser
ticket = chain.invoke({"text": "결제가 두 번 됐어요. 빨리 환불해주세요"})
print(ticket.category, ticket.priority, ticket.summary)  # 검증된 Ticket 객체`,
        note: 'Pydantic 파서로 타입·범위(priority 1~5)를 검증하고, 폴백+재시도로 장애에 대응. 구조화 객체라 후속 DB 저장·라우팅이 안전하다.',
      },
    ],
  },
  'langchain-2': {
    theory: [
      {
        h: '메모리: 대화에 맥락을 부여하기',
        body: 'LLM은 상태가 없으므로 멀티턴 대화를 하려면 이전 대화를 매 요청에 다시 넣어야 한다. 단순 누적은 토큰을 빠르게 소진하므로, 최근 N턴만 유지(윈도우)하거나 과거를 요약(summary)하는 메모리 전략을 쓴다. 세션 ID로 사용자별 대화를 분리하고, RunnableWithMessageHistory로 체인에 히스토리를 주입한다.',
      },
      {
        h: '도구(Tool)와 문서 QA',
        body: '도구는 LLM이 호출할 수 있는 외부 함수(검색·계산·DB·API)로, 함수 설명(docstring)이 모델의 "언제 부를지" 판단 근거가 된다. 문서 QA는 리트리버를 체인에 결합해 질문 관련 청크를 가져와 답하게 하며, 메모리와 결합하면 "방금 말한 그거"처럼 맥락을 유지하는 챗봇이 된다. 의도가 다양하면 RunnableBranch로 전문화된 체인에 라우팅한다.',
      },
    ],
    realCode: [
      {
        title: '실전: 메모리 + 리트리버 문서 QA 챗봇',
        lang: 'python',
        code: `from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_openai import ChatOpenAI

store = {}
def history(session_id: str):
    return store.setdefault(session_id, ChatMessageHistory())

prompt = ChatPromptTemplate.from_messages([
    ("system", "너는 사내 문서 도우미다. 컨텍스트만 근거로 답하라.\\n\\n{context}"),
    MessagesPlaceholder("history"),     # 이전 대화 주입
    ("human", "{input}"),
])

def build_context(x):                   # 입력으로 리트리버 검색
    docs = retriever.invoke(x["input"])
    return "\\n---\\n".join(d.page_content for d in docs)

chain = (lambda x: {**x, "context": build_context(x)}) | prompt | ChatOpenAI(model="gpt-4o-mini")

bot = RunnableWithMessageHistory(
    chain, history, input_messages_key="input", history_messages_key="history")

cfg = {"configurable": {"session_id": "user-1"}}
print(bot.invoke({"input": "환불 절차 알려줘"}, config=cfg).content)
print(bot.invoke({"input": "그거 며칠 걸려?"}, config=cfg).content)  # 맥락 유지`,
        note: '리트리버로 컨텍스트를 만들고 MessagesPlaceholder로 히스토리를 끼워 멀티턴 문서 QA를 구현. "그거"처럼 대명사로 이어지는 질문도 처리된다.',
      },
    ],
  },
  'langchain-3': {
    theory: [
      {
        h: '데모에서 서비스로: 스트리밍·관측·안정성',
        body: '체감 지연을 줄이려면 토큰을 생성 즉시 흘려보내는 스트리밍이 필수다(SSE/StreamingResponse). 운영에서는 관측성이 핵심으로, LangSmith 등으로 각 단계의 프롬프트·토큰·지연·오류를 추적해야 블랙박스를 디버깅할 수 있다. 비용은 캐싱(동일 입력 재사용)으로 줄이고, 입출력 가드레일로 유해·이탈 응답을 차단한다. 환경변수로 키·모델을 분리하고, 재시도·타임아웃으로 외부 의존성 장애에 대비한다.',
      },
    ],
    realCode: [
      {
        title: '실전: FastAPI 스트리밍 + 캐시 + 에러 처리',
        lang: 'python',
        code: `import hashlib
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from langchain_openai import ChatOpenAI

app = FastAPI()
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3, timeout=30, max_retries=2)
_cache: dict[str, str] = {}

@app.get("/ask")
def ask(q: str):
    key = hashlib.sha256(q.encode()).hexdigest()
    if key in _cache:                          # 캐시 적중 → 즉시 반환
        return {"answer": _cache[key], "cached": True}

    def gen():
        buf = []
        try:
            for chunk in llm.stream(q):        # 토큰 스트리밍
                tok = chunk.content or ""
                buf.append(tok)
                yield tok
            _cache[key] = "".join(buf)         # 완료 후 캐시 저장
        except Exception as e:
            yield f"\\n[오류] 잠시 후 다시 시도해주세요: {e}"

    return StreamingResponse(gen(), media_type="text/plain")`,
        note: '스트리밍으로 타자 치듯 응답하고, 완료분을 캐시에 저장해 반복 질의 비용을 줄인다. 예외를 잡아 사용자에게 안전한 메시지를 흘려보낸다.',
      },
    ],
  },

  // ── AI Agent (LangGraph) ──
  'agent-1': {
    theory: [
      {
        h: '워크플로 vs 에이전트',
        body: '정해진 순서로 LLM을 호출하면 워크플로, LLM이 "다음에 무엇을 할지"(어떤 도구를 부를지, 끝낼지)를 스스로 결정하면 에이전트다. ReAct 패턴은 추론(Reason: 무엇이 필요한가)과 행동(Act: 도구 호출)을 번갈아 수행하며, 도구 결과를 관찰(Observe)해 다음 추론에 반영하는 루프를 돈다. 자율성이 높을수록 유연하지만 비용·예측불가능성도 커지므로, 최대 스텝 제한과 관측이 필요하다.',
      },
      {
        h: 'LangGraph: 상태 그래프로 제어',
        body: 'LangGraph는 에이전트를 노드(작업)·엣지(흐름)·State(누적 상태)로 명시한다. State는 메시지·중간 결과를 담는 공유 딕셔너리이고, 조건부 엣지가 상태를 보고 다음 노드를 결정해 "도구 호출 → 재추론" 루프를 형성한다. 체크포인터로 상태를 저장하면 중단·재개와 Human-in-the-loop(사람 승인 후 재개)가 가능하다. 흐름이 명시적이라 디버깅·테스트가 쉽다.',
      },
    ],
    realCode: [
      {
        title: '실전: 도구 사용 ReAct 에이전트 (LangGraph 저수준)',
        lang: 'python',
        code: `from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

@tool
def search_db(keyword: str) -> str:
    """사내 제품 DB에서 키워드로 검색한다."""
    return f"[{keyword}] 재고 12개, 가격 1500"

tools = [search_db]
llm = ChatOpenAI(model="gpt-4o-mini").bind_tools(tools)
tool_map = {t.name: t for t in tools}

class State(TypedDict):
    messages: Annotated[list, add_messages]

def agent(s):  # 모델 추론(도구 호출 결정 포함)
    return {"messages": [llm.invoke(s["messages"])]}

def run_tools(s):  # 모델이 요청한 도구 실행
    last = s["messages"][-1]
    out = []
    for call in last.tool_calls:
        res = tool_map[call["name"]].invoke(call["args"])
        out.append({"role": "tool", "content": str(res), "tool_call_id": call["id"]})
    return {"messages": out}

def route(s):  # 도구 호출이 있으면 tools로, 없으면 종료
    return "tools" if s["messages"][-1].tool_calls else END

g = StateGraph(State)
g.add_node("agent", agent); g.add_node("tools", run_tools)
g.add_edge(START, "agent")
g.add_conditional_edges("agent", route, {"tools": "tools", END: END})
g.add_edge("tools", "agent")     # 도구 결과 → 재추론 (ReAct 루프)
app = g.compile()

res = app.invoke({"messages": [("user", "노트북 재고와 가격 알려줘")]})
print(res["messages"][-1].content)`,
        note: 'ReAct 루프를 저수준 그래프로 직접 구성: agent(추론)↔tools(행동)를 조건부 엣지로 순환. tool_calls 유무로 종료를 제어해 무한루프를 막는다.',
      },
    ],
  },
  'agent-2': {
    theory: [
      {
        h: '멀티 에이전트와 Human-in-the-loop',
        body: '단일 에이전트가 너무 많은 책임을 지면 프롬프트가 비대해지고 실패가 잦다. Supervisor 패턴은 감독 에이전트가 작업을 보고 적합한 전문 에이전트(예: researcher, coder)를 선택·호출하고 결과를 종합한다. 각 전문 에이전트는 자신의 도구·프롬프트에 집중하는 서브그래프로 캡슐화된다. 위험하거나 비가역적인 작업(결제·삭제 등)은 Human-in-the-loop로 사람 승인 노드를 두고, 체크포인터로 상태를 저장해 승인 후 재개한다.',
      },
    ],
    realCode: [
      {
        title: '실전: Supervisor 멀티 에이전트 라우팅',
        lang: 'python',
        code: `from typing import TypedDict, Literal
from langgraph.graph import StateGraph, START, END
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

class State(TypedDict):
    task: str
    result: str
    next: str

def supervisor(s) -> dict:
    # 감독이 다음 담당자를 선택 (researcher / coder / FINISH)
    decision = llm.invoke(
        f"작업: {s['task']}\\n현재 결과: {s.get('result','(없음)')}\\n"
        "다음 담당자를 한 단어로: researcher, coder, FINISH"
    ).content.strip()
    return {"next": decision}

def researcher(s):  # 자료 조사 전문
    r = llm.invoke(f"조사: {s['task']}").content
    return {"result": (s.get("result","") + "\\n[조사] " + r)}

def coder(s):       # 코드 작성 전문
    r = llm.invoke(f"다음을 코드로: {s['task']}\\n참고: {s.get('result','')}").content
    return {"result": (s.get("result","") + "\\n[코드] " + r)}

def route(s) -> Literal["researcher", "coder", "__end__"]:
    return END if s["next"] == "FINISH" else s["next"]

g = StateGraph(State)
for name, fn in [("supervisor", supervisor), ("researcher", researcher), ("coder", coder)]:
    g.add_node(name, fn)
g.add_edge(START, "supervisor")
g.add_conditional_edges("supervisor", route,
                        {"researcher": "researcher", "coder": "coder", END: END})
g.add_edge("researcher", "supervisor")   # 작업 후 감독에게 복귀
g.add_edge("coder", "supervisor")
app = g.compile()

print(app.invoke({"task": "정렬 알고리즘을 조사하고 파이썬으로 구현", "result": "", "next": ""})["result"])`,
        note: 'Supervisor가 researcher↔coder를 오가며 작업을 분배하고 FINISH로 종료. 역할을 분리해 각 에이전트 프롬프트를 단순하게 유지한다.',
      },
    ],
  },

  // ── Vector DB ──
  'vectordb-1': {
    theory: [
      {
        h: '벡터 검색의 원리',
        body: '임베딩 모델은 텍스트를 수백~수천 차원의 벡터로 변환하며, 의미가 비슷한 텍스트는 벡터 공간에서 가깝게 위치한다. 검색은 질의 벡터와 문서 벡터의 유사도(코사인·내적·L2 거리)를 계산해 가까운 것을 찾는 것이다. 벡터를 정규화하면 내적이 코사인 유사도와 같아진다. 전수 비교(brute-force)는 정확하지만 느리므로, 대규모에서는 근사 최근접(ANN) 인덱스로 속도를 확보한다.',
      },
      {
        h: 'ANN 인덱스: HNSW vs IVF',
        body: 'HNSW는 다층 그래프를 만들어 가까운 이웃으로 점프하며 탐색하는 방식으로, m(노드당 연결 수)과 ef(탐색 폭)로 정확도-속도를 조절한다 — ef를 키우면 재현율↑·속도↓. IVF는 벡터를 군집(cluster)으로 나눠 질의와 가까운 일부 군집만 탐색해 메모리·속도 효율이 좋다. 모든 ANN은 약간의 정확도를 내주고 속도를 얻는 트레이드오프이며, 서비스의 재현율 요구에 맞춰 파라미터를 튜닝한다. 메타데이터 필터를 결합하면 "최근 3개월 문서 중" 같은 조건부 검색이 된다.',
      },
    ],
    realCode: [
      {
        title: '실전: pgvector 테이블·인덱스·하이브리드 검색 (SQL)',
        lang: 'sql',
        code: `-- 1) 확장 + 테이블 (임베딩 차원은 모델과 일치)
create extension if not exists vector;
create table docs (
  id        bigserial primary key,
  content   text,
  category  text,
  created_at timestamptz default now(),
  embedding vector(1536)
);

-- 2) ANN 인덱스 (HNSW + 코사인)
create index on docs using hnsw (embedding vector_cosine_ops)
  with (m = 16, ef_construction = 64);
-- 메타데이터 필터용 보조 인덱스
create index on docs (category, created_at);

-- 3) 검색 정확도-속도 손잡이
set hnsw.ef_search = 100;

-- 4) 메타데이터 필터 + 벡터 유사도 (하이브리드)
select id, content,
       1 - (embedding <=> :q_vec) as score        -- 코사인 유사도
from docs
where category = '환불'                            -- 메타 필터
  and created_at > now() - interval '90 days'      -- 최근 90일
order by embedding <=> :q_vec                      -- 거리 오름차순(가까운 순)
limit 5;`,
        note: '<=> 는 코사인 거리 연산자, 1-거리=유사도. WHERE로 메타데이터를 거르고 ORDER BY로 벡터 근접 정렬하는 실전 하이브리드 패턴. ef_search로 재현율을 조절한다.',
      },
    ],
  },

  // ── 머신러닝/딥러닝 ──
  'ml-dl-1': {
    theory: [
      {
        h: '일반화와 편향-분산 트레이드오프',
        body: '머신러닝의 목표는 훈련 데이터 암기가 아니라 보지 않은 데이터에서의 성능(일반화)이다. 모델이 너무 단순하면 패턴을 못 잡고(과소적합·높은 편향), 너무 복잡하면 훈련 노이즈까지 외워(과적합·높은 분산) 새 데이터에서 실패한다. 이 균형점을 찾는 것이 핵심이며, 훈련/검증/테스트 분할과 교차검증으로 일반화 성능을 추정한다. 전처리(스케일링·인코딩)는 반드시 훈련 데이터 기준으로 fit해, 테스트 정보가 전처리에 스며드는 데이터 누수를 막아야 한다.',
      },
      {
        h: '평가지표는 문제에 맞춰 고른다',
        body: '정확도는 클래스 불균형에서 오해를 부른다(정상 99% 데이터면 무조건 정상이라 찍어도 99%). 정밀도(예측 양성 중 실제 양성)와 재현율(실제 양성 중 잡아낸 비율)은 트레이드오프이며 F1으로 균형을 본다. 임계값에 무관한 ROC-AUC는 순위 능력을 측정한다. 거짓양성과 거짓음성 중 무엇이 더 치명적인지(비즈니스 비용)에 따라 지표와 결정 임계값을 정한다.',
      },
    ],
    realCode: [
      {
        title: '실전: 전처리 파이프라인 + 교차검증 (scikit-learn)',
        lang: 'python',
        code: `import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

df = pd.read_csv("data.csv")
y = df.pop("target")
num = df.select_dtypes("number").columns
cat = df.select_dtypes("object").columns

# 수치=표준화, 범주=원핫 — 전처리를 파이프라인에 넣어 누수 방지
pre = ColumnTransformer([
    ("num", StandardScaler(), num),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat),
])
pipe = Pipeline([("pre", pre),
                 ("clf", RandomForestClassifier(n_estimators=300, random_state=42))])

Xtr, Xte, ytr, yte = train_test_split(df, y, test_size=0.2, stratify=y, random_state=42)
print("CV F1:", cross_val_score(pipe, df, y, cv=5, scoring="f1_macro").mean())

pipe.fit(Xtr, ytr)
print(classification_report(yte, pipe.predict(Xte)))`,
        note: 'ColumnTransformer로 수치·범주를 따로 전처리하고 Pipeline에 포함해 교차검증 시 누수를 차단. stratify로 클래스 비율을 유지하고 f1_macro로 불균형을 고려.',
      },
    ],
  },
  'ml-dl-2': {
    theory: [
      {
        h: '역전파와 옵티마이저',
        body: '신경망 학습은 손실을 가중치로 미분한 기울기를 따라, 손실이 줄어드는 방향으로 가중치를 조금씩 갱신하는 과정이다. 역전파는 연쇄법칙으로 출력층→입력층 방향으로 기울기를 효율적으로 계산한다. 옵티마이저는 이 기울기를 어떻게 적용할지 정하며, SGD는 단순하지만 학습률에 민감하고, Adam은 1·2차 모멘트로 적응적 학습률을 제공해 대체로 빠르고 안정적으로 수렴한다. 학습률이 너무 크면 발산, 너무 작으면 느리거나 지역최소에 갇힌다.',
      },
      {
        h: '활성화·정규화·조기종료',
        body: '비선형 활성화(ReLU 등)가 없으면 층을 아무리 쌓아도 하나의 선형 변환에 불과하다. ReLU는 음수를 0으로 보내 기울기 소실에 강하고 계산이 싸 기본으로 쓰인다. 과적합 방지로 드롭아웃(학습 시 일부 뉴런 무작위 비활성)·배치정규화(층 입력 분포 안정화)를 쓰고, 검증 손실을 모니터링해 더 개선되지 않으면 조기종료하여 과적합 직전 가중치를 저장한다.',
      },
    ],
    realCode: [
      {
        title: '실전: PyTorch 학습 루프 + 검증 + 조기종료',
        lang: 'python',
        code: `import torch, torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset

def make_loader(X, y, bs=64, shuffle=False):
    ds = TensorDataset(torch.tensor(X, dtype=torch.float32),
                       torch.tensor(y, dtype=torch.long))
    return DataLoader(ds, batch_size=bs, shuffle=shuffle)

device = "cuda" if torch.cuda.is_available() else "cpu"
model = nn.Sequential(nn.Linear(30, 64), nn.ReLU(), nn.Dropout(0.2),
                      nn.Linear(64, 2)).to(device)
opt = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

best, patience, wait = 1e9, 5, 0
for epoch in range(100):
    model.train()
    for xb, yb in train_loader:
        xb, yb = xb.to(device), yb.to(device)
        opt.zero_grad()
        loss = loss_fn(model(xb), yb)
        loss.backward(); opt.step()

    model.eval(); vloss = 0.0
    with torch.no_grad():
        for xb, yb in val_loader:
            xb, yb = xb.to(device), yb.to(device)
            vloss += loss_fn(model(xb), yb).item()
    vloss /= len(val_loader)

    if vloss < best:                      # 개선되면 체크포인트
        best, wait = vloss, 0
        torch.save(model.state_dict(), "best.pt")
    else:
        wait += 1
        if wait >= patience:              # 개선 없으면 조기종료
            print(f"early stop @ epoch {epoch}, best val={best:.4f}"); break`,
        note: 'zero_grad→forward→loss→backward→step의 4단계 학습 루프에 검증·조기종료·체크포인트를 결합한 실전 템플릿. Dropout으로 과적합을 억제한다.',
      },
    ],
  },
  'ml-dl-3': {
    theory: [
      {
        h: 'CNN · RNN · Transformer',
        body: 'CNN은 합성곱 필터로 지역 패턴(엣지→질감→형태)을 계층적으로 추출하고 파라미터를 공유해 이미지에 효율적이다. RNN/LSTM은 순차 데이터를 시점별로 처리하되 장기 의존성에 약했고, LSTM의 게이트(입력·망각·출력)가 이를 완화했다. Transformer는 Self-Attention으로 모든 토큰 쌍의 관계를 병렬로 계산해 장거리 의존성과 학습 속도를 동시에 해결했으며, 현대 LLM과 비전 모델(ViT)의 표준 아키텍처가 되었다.',
      },
      {
        h: '전이학습 전략',
        body: '대규모 데이터로 사전학습된 모델은 일반적 특징(엣지·표현)을 이미 학습한 상태다. 전이학습은 이 가중치를 가져와 작은 도메인 데이터로 미세조정하며, 데이터가 적을수록 효과가 크다. 보통 초기에는 특징 추출부를 동결하고 분류층만 학습하다가, 데이터가 충분하면 상위 층까지 낮은 학습률로 함께 미세조정한다. 데이터 증강은 학습 데이터를 변형해 과적합을 줄이고 일반화를 높인다.',
      },
    ],
    realCode: [
      {
        title: '실전: 전이학습 (ResNet18 미세조정 + 증강)',
        lang: 'python',
        code: `import torch, torch.nn as nn
import torchvision as tv
from torchvision import transforms as T

# 1) 데이터 증강 (학습) vs 정규화만 (검증)
train_tf = T.Compose([
    T.RandomResizedCrop(224), T.RandomHorizontalFlip(),
    T.ColorJitter(0.2, 0.2, 0.2), T.ToTensor(),
    T.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
])

# 2) 사전학습 모델 로드 → 특징 추출부 동결
model = tv.models.resnet18(weights="IMAGENET1K_V1")
for p in model.parameters():
    p.requires_grad = False

# 3) 분류층을 우리 클래스 수로 교체 (이 층만 학습됨)
NUM_CLASSES = 5
model.fc = nn.Linear(model.fc.in_features, NUM_CLASSES)

# 4) fc만 우선 학습 → 이후 layer4까지 낮은 LR로 미세조정(선택)
opt = torch.optim.Adam(model.fc.parameters(), lr=1e-3)

# (미세조정 단계) 상위 블록 해제
for p in model.layer4.parameters():
    p.requires_grad = True
opt = torch.optim.Adam([
    {"params": model.fc.parameters(), "lr": 1e-3},
    {"params": model.layer4.parameters(), "lr": 1e-4},   # 더 낮게
])`,
        note: '특징 추출부 동결 → 분류층 교체·학습 → 상위 블록만 낮은 LR로 미세조정하는 2단계 전이학습. 학습/검증 증강을 다르게 적용해 누수를 막는다.',
      },
    ],
  },

  // ── 모델 서빙 / AIOps ──
  'serving-1': {
    theory: [
      {
        h: '서빙 패턴과 SLA',
        body: '추론 서빙은 요청-응답이 실시간인 온라인, 대량을 모아 처리하는 배치, 연속 입력을 처리하는 스트림으로 나뉜다. 온라인 서빙은 지연(latency)이, 배치는 처리량(throughput)이 핵심 지표다. 모델은 앱 시작 시 1회 로드해 요청마다 재로딩을 피하고(예: FastAPI lifespan), 입력은 Pydantic으로 검증해 잘못된 입력이 추론까지 가지 않게 한다. 요청을 모아 배치로 추론하면 GPU 활용률·처리량이 오르지만 지연은 늘어 균형이 필요하다.',
      },
    ],
    realCode: [
      {
        title: '실전: FastAPI 추론 서비스 (lifespan 로드 + 검증 + 배치)',
        lang: 'python',
        code: `from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, conlist
import joblib, numpy as np

STATE = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    STATE["model"] = joblib.load("model.pkl")   # 시작 시 1회 로드
    yield
    STATE.clear()

app = FastAPI(lifespan=lifespan)

class Req(BaseModel):
    features: conlist(float, min_length=30, max_length=30)   # 길이 검증

class BatchReq(BaseModel):
    items: list[Req]

@app.get("/health")
def health():
    return {"ok": "model" in STATE}

@app.post("/predict")
def predict(req: Req):
    try:
        p = STATE["model"].predict([req.features])[0]
        return {"prediction": int(p)}
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/predict-batch")             # 배치 추론으로 처리량↑
def predict_batch(req: BatchReq):
    X = np.array([r.features for r in req.items])
    return {"predictions": STATE["model"].predict(X).astype(int).tolist()}`,
        note: 'lifespan으로 모델을 1회 로드, Pydantic conlist로 입력 길이 검증, 단건·배치 엔드포인트를 함께 제공하는 실전 서빙 구조. /health는 readiness 프로브용.',
      },
    ],
  },
  'serving-2': {
    theory: [
      {
        h: '컨테이너화와 무중단 배포',
        body: 'Docker는 앱·의존성·런타임을 이미지로 묶어 어디서든 동일하게 실행되게 한다(환경 불일치 해소). 레이어 캐시를 활용하려면 자주 바뀌지 않는 의존성 설치를 먼저 두고 소스 복사를 나중에 둔다. 쿠버네티스는 배포·스케일·복구를 자동화하며, liveness(살아있나)와 readiness(트래픽 받을 준비됐나) 프로브를 구분해 모델 로딩이 끝나야 트래픽을 받게 한다. 롤링 업데이트로 새 파드가 ready가 된 뒤에만 트래픽을 옮겨 무중단 배포한다.',
      },
    ],
    realCode: [
      {
        title: '실전: Dockerfile + Kubernetes 배포(프로브 포함)',
        lang: 'docker',
        code: `# ---- Dockerfile (의존성 레이어 분리로 캐시 활용) ----
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt   # 자주 안 바뀜 → 먼저
COPY . .                                             # 소스는 나중에
EXPOSE 8000
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", \\
     "-w", "2", "app:app", "--bind", "0.0.0.0:8000"]

# ---- k8s deployment 발췌 (yaml) ----
# livenessProbe:  { httpGet: { path: /health, port: 8000 }, initialDelaySeconds: 15 }
# readinessProbe: { httpGet: { path: /health, port: 8000 }, periodSeconds: 5 }
# strategy: { type: RollingUpdate, rollingUpdate: { maxUnavailable: 0, maxSurge: 1 } }`,
        note: '의존성→소스 순서로 빌드 캐시를 극대화하고, liveness/readiness 프로브 + maxUnavailable:0 롤링 업데이트로 무중단 배포를 구성한다.',
      },
    ],
  },
  'serving-3': {
    theory: [
      {
        h: 'MLOps · CI/CD · 드리프트',
        body: 'MLOps는 데이터·학습·배포·모니터링을 자동화하고 재현 가능하게 만드는 실천이다. 모델 레지스트리로 버전·스테이지(staging/production)를 관리하고, CI/CD로 테스트→빌드→배포를 자동화하며, 카나리/블루그린 배포로 위험을 줄이고 문제 시 즉시 롤백한다. 배포 후에도 입력·개념 분포가 변하면(드리프트) 성능이 조용히 저하되므로 통계 검정(KS 등)으로 감시하고, 임계 초과 시 알림·재학습을 트리거한다.',
      },
    ],
    realCode: [
      {
        title: '실전: GitHub Actions ML CI/CD',
        lang: 'yaml',
        code: `name: ml-deploy
on: { push: { branches: [main] } }

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.11" }
      - run: pip install -r requirements.txt
      - run: pytest -q                          # 1) 테스트 게이트
      - run: |                                   # 2) 모델 검증(최소 성능)
          python scripts/eval.py --min-f1 0.85
      - name: Build & push image                # 3) 이미지 빌드/푸시
        run: |
          docker build -t $REG/infer:\${{ github.sha }} .
          echo "\${{ secrets.REG_TOKEN }}" | docker login $REG -u ci --password-stdin
          docker push $REG/infer:\${{ github.sha }}
        env: { REG: registry.example.com }
      - name: Deploy (canary)                    # 4) 카나리 배포
        run: kubectl set image deploy/infer infer=$REG/infer:\${{ github.sha }}`,
        note: '테스트·모델 성능 게이트를 통과해야 빌드·배포가 진행되는 ML CI/CD. 커밋 SHA를 이미지 태그로 써서 롤백을 쉽게 한다.',
      },
    ],
  },

  // ── Vue.js ──
  'vue-1': {
    theory: [
      {
        h: '반응성 시스템은 어떻게 동작하나',
        body: 'Vue 3의 반응성은 JavaScript Proxy로 구현된다. reactive(obj)는 객체 접근(get)을 가로채 "이 값을 누가 사용하는지" 의존성을 수집하고, 변경(set)이 일어나면 그 값을 쓰는 computed·렌더 함수만 다시 실행한다. ref는 원시값을 {value} 객체로 감싸 같은 추적을 가능하게 하며, 템플릿에서는 .value가 자동 언랩된다. 덕분에 개발자는 DOM을 직접 조작하지 않고 상태만 바꾸면 화면이 최소 비용으로 갱신된다. computed는 의존이 바뀔 때만 재계산되어 캐싱되고, watch는 값 변화에 따른 부수효과(API 호출 등)에 쓴다.',
      },
    ],
    realCode: [
      {
        title: '실전: 검색+정렬+디바운스 컴포넌트 (SFC)',
        lang: 'html',
        code: `<script setup>
import { ref, computed, watch } from 'vue'

const items = ref([])           // 원본 데이터
const keyword = ref('')
const sortKey = ref('name')
const loading = ref(false)
let timer

// 파생 목록: 필터 + 정렬 (의존이 바뀔 때만 재계산)
const view = computed(() =>
  items.value
    .filter(i => i.name.includes(keyword.value))
    .sort((a, b) => String(a[sortKey.value]).localeCompare(String(b[sortKey.value])))
)

// 검색어 입력은 300ms 디바운스로 API 호출 절감
watch(keyword, (kw) => {
  clearTimeout(timer)
  timer = setTimeout(async () => {
    loading.value = true
    const res = await fetch('/api/search?q=' + encodeURIComponent(kw))
    items.value = await res.json()
    loading.value = false
  }, 300)
})
</script>

<template>
  <input v-model="keyword" placeholder="검색" />
  <select v-model="sortKey"><option value="name">이름</option><option value="price">가격</option></select>
  <p v-if="loading">불러오는 중…</p>
  <ul v-else><li v-for="i in view" :key="i.id">{{ i.name }} — {{ i.price }}</li></ul>
</template>`,
        note: 'computed로 필터+정렬을 선언적으로 파생하고, watch+setTimeout 디바운스로 입력마다 API를 때리지 않게 한다. 반응성·computed·watch를 한 컴포넌트에서 종합.',
      },
    ],
  },
  'vue-2': {
    theory: [
      {
        h: '컴포넌트 통신과 합성',
        body: 'Vue는 단방향 데이터 흐름을 따른다 — 부모는 props로 데이터를 내려주고(자식은 읽기만), 자식은 emit 이벤트로 변경을 부모에 요청한다. 이 규칙이 데이터 출처를 명확히 해 디버깅을 쉽게 한다. 슬롯은 컴포넌트에 마크업을 주입하는 구멍으로 레이아웃 재사용에 쓰이고, Composition API의 composable(use~ 함수)은 상태+로직을 추출해 여러 컴포넌트에서 재사용하게 한다(React 훅과 유사). 라이프사이클 훅(onMounted 등)으로 데이터 패칭·정리 시점을 제어한다.',
      },
    ],
    realCode: [
      {
        title: '실전: 재사용 composable + props/emit 컴포넌트',
        lang: 'javascript',
        code: `// composables/useToggle.js — 상태+동작을 추출해 재사용
import { ref } from 'vue'
export function useToggle(initial = false) {
  const state = ref(initial)
  const toggle = () => (state.value = !state.value)
  const set = (v) => (state.value = v)
  return { state, toggle, set }
}

// composables/useAsync.js — 비동기 로딩/에러 공통 처리
import { ref } from 'vue'
export function useAsync(fn) {
  const data = ref(null), error = ref(null), loading = ref(false)
  async function run(...args) {
    loading.value = true; error.value = null
    try { data.value = await fn(...args) }
    catch (e) { error.value = e.message }
    finally { loading.value = false }
  }
  return { data, error, loading, run }
}

/* 사용 (컴포넌트 script setup)
import { useAsync } from '@/composables/useAsync'
const { data, error, loading, run } = useAsync((id) => fetch('/api/'+id).then(r=>r.json()))
run(42)
*/`,
        note: '공통 로직(토글·비동기 패칭)을 composable로 추출하면 여러 컴포넌트가 재사용한다. props/emit이 컴포넌트 간 통신이라면 composable은 로직 재사용 수단.',
      },
    ],
  },
  'vue-3': {
    theory: [
      {
        h: '라우팅과 전역 상태',
        body: 'SPA는 서버 왕복 없이 URL과 컴포넌트를 매핑한다(History API). Vue Router는 라우트 정의, 동적 파라미터(/detail/:id), 중첩 라우트, 네비게이션 가드(beforeEach로 인증 체크)를 제공한다. 여러 컴포넌트가 공유하는 상태는 Pinia 스토어(state·getters·actions)로 중앙화해 prop 드릴링을 피한다. 상태는 스토어→컴포넌트로 흐르고 변경은 action을 통하므로 예측 가능성과 디버깅성이 좋아진다.',
      },
    ],
    realCode: [
      {
        title: '실전: Pinia 스토어 + Router 가드',
        lang: 'javascript',
        code: `// stores/auth.js
import { defineStore } from 'pinia'
export const useAuth = defineStore('auth', {
  state: () => ({ user: null, token: localStorage.getItem('token') }),
  getters: { isAuthed: (s) => !!s.token },
  actions: {
    async login(email, pw) {
      const res = await fetch('/api/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pw }),
      })
      if (!res.ok) throw new Error('로그인 실패')
      const { token, user } = await res.json()
      this.token = token; this.user = user
      localStorage.setItem('token', token)
    },
    logout() { this.token = null; this.user = null; localStorage.removeItem('token') },
  },
})

// router.js — 인증 가드
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/pages/Home.vue') },
    { path: '/mypage', component: () => import('@/pages/My.vue'), meta: { requiresAuth: true } },
    { path: '/login', component: () => import('@/pages/Login.vue') },
  ],
})
router.beforeEach((to) => {
  const auth = useAuth()
  if (to.meta.requiresAuth && !auth.isAuthed)
    return { path: '/login', query: { redirect: to.fullPath } }   // 미인증 차단
})
export default router`,
        note: 'Pinia 스토어에 인증 상태·액션을 모으고, router.beforeEach 가드로 보호 라우트 접근을 통제하는 실전 인증 구조. meta.requiresAuth로 보호 페이지를 선언적으로 표시.',
      },
    ],
  },
  'vue-4': {
    theory: [
      {
        h: 'API 연동과 배포',
        body: '실데이터 연동은 로딩·에러·빈 상태(3-상태)를 분리 관리해야 UI가 안정적이다. axios 인스턴스에 baseURL·인터셉터를 두면 토큰 주입·공통 에러 처리를 한곳에서 한다. API 주소·키는 환경변수(Vite는 VITE_ 접두어만 클라이언트 노출)로 분리해 개발/운영을 전환한다. 빌드는 소스를 정적 파일(dist)로 변환하며 트리셰이킹·코드분할로 용량을 줄이고, SPA는 서버가 모든 경로를 index.html로 폴백해야 새로고침 404가 나지 않는다.',
      },
    ],
    realCode: [
      {
        title: '실전: axios 인스턴스(인터셉터) + 환경변수',
        lang: 'javascript',
        code: `// lib/http.js — 공통 axios 인스턴스
import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,   // .env: VITE_API_BASE=https://api...
  timeout: 15000,
})

// 요청 인터셉터: 토큰 자동 주입
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = \`Bearer \${token}\`
  return config
})

// 응답 인터셉터: 공통 에러 처리(401 → 로그인 이동)
http.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      location.href = '/login'
    }
    return Promise.reject(new Error(err.response?.data?.message || err.message))
  },
)

export default http
// 사용: const items = await http.get('/items')   // res.data 가 바로 반환됨`,
        note: '인터셉터로 토큰 주입·401 처리·에러 정규화를 한곳에 모은 실전 HTTP 레이어. 환경변수로 API 베이스를 분리해 개발/운영을 전환한다.',
      },
    ],
  },
}

export const theoryFor = (subjectId, day) => theory[`${subjectId}-${day}`] || null
