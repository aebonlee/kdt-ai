// 강의안 실전 소스 추가(2차 보강) — subjectId-day 키.
// lecturetheory.js 의 realCode 와 병합되어 표시된다. 주석은 녹색으로 강조.

export const realCodeExtra = {
  'prompt-1': [
    {
      title: '실전: 프롬프트 A/B 평가 자동화',
      lang: 'python',
      code: `# 두 프롬프트(A/B)를 동일 테스트셋에 돌려 정답률·비용을 비교한다
from anthropic import Anthropic
client = Anthropic()

PROMPTS = {
    "A_zeroshot": "다음 문장의 감성(긍정/부정)만 한 단어로: {t}",
    "B_fewshot":  "예) '좋아요'→긍정, '별로'→부정\\n문장: {t}\\n감성(긍정/부정):",
}
TESTSET = [("배송 빠르고 좋아요", "긍정"), ("다신 안 사요", "부정")]

def run(prompt_tmpl, text):
    msg = client.messages.create(
        model="claude-opus-4-8", max_tokens=10,
        messages=[{"role": "user", "content": prompt_tmpl.format(t=text)}],
    )
    return msg.content[0].text.strip()

for name, tmpl in PROMPTS.items():
    correct = sum(run(tmpl, t).startswith(label) for t, label in TESTSET)  # 정답 수
    acc = correct / len(TESTSET)                                           # 정답률
    print(f"{name}: 정답률 {acc:.0%}")   # 어느 프롬프트가 더 나은지 정량 비교`,
      note: '프롬프트는 "감"이 아니라 테스트셋 정답률로 비교한다. 같은 입력에 A/B를 돌려 수치로 고르는 실전 평가 루프.',
    },
  ],
  'sllm-2': [
    {
      title: '실전: 파인튜닝 어댑터 로드 후 추론',
      lang: 'python',
      code: `from transformers import AutoModelForCausalLM, AutoTokenizer
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
print(tok.decode(out[0][inputs.shape[1]:], skip_special_tokens=True))`,
      note: '베이스 모델에 LoRA 어댑터를 로드/병합해 추론. 추론 포맷(chat template)이 학습과 일치해야 성능이 유지된다.',
    },
  ],
  'ml-dl-2': [
    {
      title: '실전: 모델 저장·로드 + 추론 서비스화',
      lang: 'python',
      code: `import torch

# 1) 학습 후 가중치 저장 (state_dict 권장)
torch.save(model.state_dict(), "model.pt")

# 2) 추론 시: 동일 구조 생성 → 가중치 로드 → eval 모드
infer = build_model()                      # 학습 때와 같은 아키텍처
infer.load_state_dict(torch.load("model.pt", map_location="cpu"))
infer.eval()                               # 드롭아웃/BN을 추론 모드로

@torch.no_grad()                           # 기울기 계산 끔(메모리·속도↑)
def predict(x):
    logits = infer(torch.tensor(x, dtype=torch.float32))
    prob = torch.softmax(logits, dim=-1)   # 확률로 변환
    return int(prob.argmax()), float(prob.max())

label, conf = predict(sample_features)
print(f"예측={label}, 신뢰도={conf:.2f}")`,
      note: 'eval() + no_grad()는 추론의 필수 2종. state_dict로 저장/로드하면 구조와 분리돼 이식이 쉽다. softmax로 신뢰도까지 함께 반환.',
    },
  ],
  'rag-1': [
    {
      title: '실전: 멀티 포맷 로더 + 메타데이터 청킹',
      lang: 'python',
      code: `from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_community.document_loaders import UnstructuredMarkdownLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

LOADERS = {".pdf": PyPDFLoader, ".txt": TextLoader, ".md": UnstructuredMarkdownLoader}

def load_dir(folder: str):
    docs = []
    for path in Path(folder).rglob("*"):          # 폴더 전체 순회
        loader = LOADERS.get(path.suffix.lower())
        if not loader:
            continue
        for d in loader(str(path)).load():
            d.metadata["source"] = path.name       # 출처 메타데이터 부착
            d.metadata["doc_type"] = path.suffix[1:]
            docs.append(d)
    return docs

splitter = RecursiveCharacterTextSplitter(chunk_size=600, chunk_overlap=80)
chunks = splitter.split_documents(load_dir("./knowledge"))
print(f"{len(chunks)}개 청크 (출처 메타 포함)")  # 검색 결과에 출처 표기 가능`,
      note: '확장자별 로더를 매핑해 PDF·TXT·MD를 일괄 적재하고, source/doc_type 메타데이터를 붙여 답변에 출처·필터를 활용한다.',
    },
  ],
  'rag-3': [
    {
      title: '실전: RAGAS 자동 평가 스크립트',
      lang: 'python',
      code: `from ragas import EvaluationDataset, evaluate   # ragas 0.2+ 기준
from ragas.metrics import faithfulness, answer_relevancy, context_precision

# 평가셋: 각 항목을 user_input/response/retrieved_contexts/reference 로(0.2 필드명)
samples = [
    {
        "user_input": q,                                          # (구 'question')
        "response": rag.invoke(q),                                # (구 'answer') 우리 RAG 출력
        "retrieved_contexts": [c.page_content for c in retriever.invoke(q)],  # (구 'contexts')
        "reference": gt,                                          # (구 'ground_truth')
    }
    for q, *_, gt in eval_data
]
dataset = EvaluationDataset.from_list(samples)   # Dataset.from_dict 대신 이 형식
report = evaluate(dataset, metrics=[faithfulness, answer_relevancy, context_precision])
print(report)   # 충실도/관련성/문맥정밀도 → 튜닝 전후 정량 비교
# faithfulness 낮으면 생성(프롬프트), context_precision 낮으면 검색을 손본다`,
      note: 'ragas 0.2부터 EvaluationDataset + user_input/response/retrieved_contexts/reference 형식. 지표로 병목(검색 vs 생성)을 진단하고, 튜닝 전/후 같은 평가셋으로 개선을 증명.',
    },
  ],
  'langchain-2': [
    {
      title: '실전: Retriever 도구 + 에이전트',
      lang: 'python',
      code: `from langchain.tools.retriever import create_retriever_tool
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI

# 1) 리트리버를 "도구"로 래핑 → 에이전트가 필요할 때만 검색
doc_tool = create_retriever_tool(
    retriever,
    name="search_manual",
    description="제품 매뉴얼에서 관련 내용을 검색한다. 사용법·정책 질문에 사용.",
)

# 2) 도구를 가진 에이전트 (검색 여부를 스스로 판단)
agent = create_react_agent(ChatOpenAI(model="gpt-4o-mini"), tools=[doc_tool])

res = agent.invoke({"messages": [("user", "환불 정책 알려줘")]})
print(res["messages"][-1].content)
# 일상 인사엔 검색을 건너뛰고, 정책 질문엔 search_manual을 호출`,
      note: 'RAG를 항상 돌리는 대신 검색을 "도구"로 만들면 에이전트가 필요할 때만 호출한다. 도구 description이 호출 판단의 근거.',
    },
  ],
  'agent-1': [
    {
      title: '실전: 고수준 에이전트 + 스텝 제한·체크포인트',
      lang: 'python',
      code: `from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

@tool
def calc(expr: str) -> str:
    """간단한 산술식을 계산한다. 예: '12*30'"""
    return str(eval(expr, {"__builtins__": {}}))   # 안전 평가(빌트인 차단)

# 체크포인터로 대화 상태 저장(멀티턴·재개 가능)
agent = create_react_agent(
    ChatOpenAI(model="gpt-4o-mini"), tools=[calc], checkpointer=MemorySaver(),
)
cfg = {"configurable": {"thread_id": "u1"}, "recursion_limit": 8}  # 무한루프 방지

for q in ["12와 30을 곱하면?", "거기에 5를 더하면?"]:     # 멀티턴(맥락 유지)
    out = agent.invoke({"messages": [("user", q)]}, config=cfg)
    print(out["messages"][-1].content)`,
      note: 'recursion_limit로 도구 반복 폭주를 막고, MemorySaver 체크포인터로 thread_id별 멀티턴 맥락을 유지. eval은 빌트인 차단으로 최소 안전화.',
    },
  ],
  'vectordb-1': [
    {
      title: '실전: FAISS IVF 인덱스 구축·검색',
      lang: 'python',
      code: `import faiss, numpy as np

emb = np.array(doc_embeddings, dtype="float32")   # (N, d)
faiss.normalize_L2(emb)                           # 정규화 → 내적=코사인
d = emb.shape[1]

# IVF: 군집 분할 후 일부만 탐색(대규모에서 빠름)
nlist = 100                                       # 군집 수
quantizer = faiss.IndexFlatIP(d)
index = faiss.IndexIVFFlat(quantizer, d, nlist, faiss.METRIC_INNER_PRODUCT)
index.train(emb)                                  # 군집 학습 필요
index.add(emb)
index.nprobe = 10                                 # 탐색할 군집 수(정확도↔속도)

q = np.array([query_emb], dtype="float32"); faiss.normalize_L2(q)
scores, ids = index.search(q, k=5)                # 상위 5개
print("상위 문서 idx:", ids[0], "유사도:", scores[0])`,
      note: 'IVF는 train()으로 군집을 학습한 뒤 nprobe로 탐색 범위를 조절한다(↑정확도/↓속도). L2 정규화로 내적을 코사인과 동일하게 만든다.',
    },
  ],
  'serving-2': [
    {
      title: '실전: docker-compose (API + Vector DB)',
      lang: 'yaml',
      code: `# 추론 API와 pgvector DB를 한 번에 기동
services:
  api:
    build: .                       # 위 Dockerfile 사용
    ports: ["8000:8000"]
    environment:
      - DB_URL=postgresql://app:secret@db:5432/app   # 서비스명(db)으로 접속
    depends_on:
      db: { condition: service_healthy }   # DB 준비 후 기동
  db:
    image: pgvector/pgvector:pg16
    environment:
      - POSTGRES_USER=app
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=app
    volumes: ["pgdata:/var/lib/postgresql/data"]   # 데이터 영속화
    healthcheck:                                    # 준비 상태 점검
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
volumes:
  pgdata:`,
      note: 'depends_on + healthcheck로 DB가 준비된 뒤 API를 띄운다. volume으로 DB 데이터를 영속화. 로컬·시연 환경을 한 명령(docker compose up)으로 재현.',
    },
  ],
}

export const realCodeExtraFor = (subjectId, day) => realCodeExtra[`${subjectId}-${day}`] || []
