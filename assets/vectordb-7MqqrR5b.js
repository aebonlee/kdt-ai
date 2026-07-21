const n={"vectordb-1":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 — 오리엔테이션: 벡터 검색이 왜 필요한가, RAG 한계 진단"},{time:"10:00–10:50",topic:"2교시 — 임베딩과 벡터 공간, 코사인/내적 유사도, 인덱싱(HNSW·IVF)"},{time:"11:00–11:50",topic:"3교시 [실습] 임베딩·유사도 계산 + FAISS Flat vs HNSW 속도 비교"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 — 대표 Vector DB 비교: FAISS·Chroma·pgvector·Qdrant·Pinecone"},{time:"14:00–14:50",topic:"5교시 [실습] FAISS→Qdrant로 문서 임베딩·저장·검색 옮기기"},{time:"15:00–15:50",topic:"6교시 — Chunking Engineering과 하이브리드 검색, Re-ranking"},{time:"16:00–16:50",topic:"7교시 [실습] Hybrid + Reranking으로 검색 정확도 높이기"},{time:"17:00–17:50",topic:"8교시 — Agentic RAG와 Production Architecture, 최신 동향(MEMO)"}],practice:{title:"문서 검색기 만들기 — 임베딩·저장·검색 + FAISS→Qdrant 이전 + Re-ranking",steps:["`pip install sentence-transformers faiss-cpu qdrant-client` 로 설치한다.","검색 대상 문장 6~8개를 리스트로 준비하고, `SentenceTransformer('all-MiniLM-L6-v2')` 로 임베딩한다(벡터 길이 384 확인).","먼저 FAISS(`IndexFlatIP`)에 벡터를 넣고 질문 하나로 top-3 검색이 되는지 확인한다.","같은 데이터를 Qdrant(로컬 `QdrantClient(':memory:')`)의 컬렉션에 upsert 하고, 동일 질문으로 검색해 FAISS와 결과가 같은지 비교한다.","질문과 주제가 같은 문장이 상위에 오는지 눈으로 확인한다(기대 결과: 같은 주제 문장이 top에 노출).","키워드(BM25)와 벡터 결과를 합치는 하이브리드 검색을 구성한다.","가져온 후보에 Cross-Encoder Re-ranking을 적용해, 재순위 전/후 상위 3개가 어떻게 달라지는지 출력해 비교한다.","각 문서에 주제 태그(metadata)를 달고 필터 검색으로 특정 주제 안에서만 검색되는지 확인한다.","질문을 2~3개 바꿔가며 재순위가 정말 더 나은 순서를 만드는지 한 줄로 메모한다.","완성 코드를 저장하고 FAISS/Qdrant/재순위 결과 캡처를 산출물로 남긴다."],deliverable:"검색기 소스 + FAISS↔Qdrant 결과 비교 + 재순위 전/후 상위3 비교 캡처 + '재순위 효과' 1줄 회고"}},examples:[{title:"코사인 유사도를 손으로 계산해 보기",lang:"python",code:`import numpy as np  # 벡터 계산용 라이브러리

# 세 개의 짧은 벡터를 직접 정의한다 (실제 임베딩 대신 이해용 예시)
a = np.array([1.0, 0.0, 1.0])  # 기준 문장 벡터
b = np.array([0.9, 0.1, 1.0])  # a와 방향이 비슷한 벡터
c = np.array([0.0, 1.0, 0.0])  # a와 방향이 다른 벡터

# 코사인 유사도 = 내적 / (각 벡터 길이의 곱)
def cosine(x, y):
    return np.dot(x, y) / (np.linalg.norm(x) * np.linalg.norm(y))

print(round(cosine(a, b), 3))  # 결과: 0.996  (매우 비슷)
print(round(cosine(a, c), 3))  # 결과: 0.0    (관련 없음)`,note:"값이 1에 가까울수록 비슷하고 0에 가까울수록 무관하다는 직관을 숫자로 확인한다."},{title:"문장 2개의 의미 유사도 비교",lang:"python",code:`from sentence_transformers import SentenceTransformer, util  # 모델과 유사도 도구

model = SentenceTransformer("all-MiniLM-L6-v2")  # 임베딩 모델 로드

# 글자는 다르지만 뜻이 비슷한 문장 / 전혀 다른 문장을 준비
s1 = "강아지를 산책시켰다"
s2 = "반려견과 함께 걸었다"   # s1과 의미가 비슷
s3 = "환율이 크게 올랐다"     # s1과 무관

v = model.encode([s1, s2, s3])  # 세 문장을 한 번에 벡터로 변환

# cos_sim: 두 벡터의 코사인 유사도를 계산해 준다
print(round(util.cos_sim(v[0], v[1]).item(), 3))  # 결과: 0.7 안팎 (비슷)
print(round(util.cos_sim(v[0], v[2]).item(), 3))  # 결과: 0.1 안팎 (무관)`,note:"단어가 달라도 의미가 가까우면 점수가 높게 나오는 것이 시맨틱 검색의 핵심이다."},{title:"FAISS Flat vs HNSW 검색 속도 비교 (3교시)",lang:"python",code:`import faiss
import numpy as np
import time

# 가짜 벡터 1만 개(384차원) 준비 — 실제로는 문서 임베딩이 들어간다
np.random.seed(0)
data = np.random.rand(10000, 384).astype("float32")
faiss.normalize_L2(data)  # 코사인 비교를 위해 길이를 1로 맞춤

# 1) Flat: 모든 벡터를 다 비교하는 완전탐색 (정확하지만 느림)
flat = faiss.IndexFlatIP(384)
flat.add(data)

# 2) HNSW: 그래프로 지름길을 만들어 빠르게 근사 탐색 (살짝 부정확할 수 있음)
hnsw = faiss.IndexHNSWFlat(384, 32)  # 32 = 이웃 연결 수(M)
hnsw.add(data)

q = data[:1]  # 질문 벡터 1개(첫 벡터를 재사용)

# 각 인덱스에서 top-5를 찾고 걸린 시간을 잰다
t0 = time.perf_counter(); flat.search(q, 5); t1 = time.perf_counter()
hnsw.search(q, 5); t2 = time.perf_counter()

print(f"Flat 검색: {(t1-t0)*1000:.2f} ms")   # 느림
print(f"HNSW 검색: {(t2-t1)*1000:.2f} ms")   # 훨씬 빠름
# 결과: 데이터가 커질수록 HNSW가 수십 배 빨라진다(정확도는 거의 동일)`,note:"완전탐색은 정답을 보장하지만 느리고, HNSW는 약간의 정확도를 내주고 속도를 크게 얻는 거래(trade-off)를 눈으로 확인한다."},{title:"FAISS에서 Qdrant로 — 원문·태그까지 저장하고 검색하기 (5교시)",lang:"python",code:`from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct

model = SentenceTransformer("all-MiniLM-L6-v2")
docs = [
    "강아지는 산책을 좋아하는 반려동물이다",
    "고양이는 그루밍으로 몸을 청결하게 한다",
    "오늘 서울의 날씨는 맑고 따뜻하다",
    "주식 시장은 금리 변화에 민감하다",
]
vecs = model.encode(docs, normalize_embeddings=True)

# ':memory:' — 서버를 안 띄우고 메모리에서 도는 로컬 Qdrant(실습용)
client = QdrantClient(":memory:")

# 컬렉션(=테이블) 생성: 벡터 차원 384, 거리 척도는 코사인
client.create_collection(
    collection_name="docs",
    vectors_config=VectorParams(size=384, distance=Distance.COSINE),
)

# upsert: 벡터 + 원문(payload)을 함께 저장한다
client.upsert(
    collection_name="docs",
    points=[
        PointStruct(id=i, vector=vecs[i].tolist(), payload={"text": docs[i]})
        for i in range(len(docs))
    ],
)

# 질문을 같은 모델로 벡터화해 검색
q = model.encode("반려동물 키우기", normalize_embeddings=True)
hits = client.query_points(collection_name="docs", query=q.tolist(), limit=2).points

for h in hits:
    print(f"{h.score:.3f}  {h.payload['text']}")
# 결과: 강아지·고양이 문장이 위로, 날씨·주식은 밀린다 (FAISS와 같은 결과)`,note:"FAISS는 벡터만 다루지만 Qdrant는 원문·태그(payload)를 함께 저장하고 필터·서버 운영까지 된다 — 프로토타입에서 프로덕션으로 넘어가는 지점이다."},{title:"하이브리드 검색 — BM25(키워드) + 벡터를 RRF로 합치기 (7교시)",lang:"python",code:`from rank_bm25 import BM25Okapi
from sentence_transformers import SentenceTransformer, util

docs = [
    "환불은 결제일로부터 7일 이내에 가능합니다",
    "배송은 보통 2~3일 소요됩니다",
    "GPT-4o 모델의 요금은 토큰 단위로 부과됩니다",
    "반품 시 왕복 배송비가 청구될 수 있습니다",
]
query = "GPT-4o 환불"

# 1) 키워드 검색(BM25): 정확한 단어 겹침에 강함
bm25 = BM25Okapi([d.split() for d in docs])
kw_scores = bm25.get_scores(query.split())
kw_rank = sorted(range(len(docs)), key=lambda i: kw_scores[i], reverse=True)

# 2) 벡터 검색: 의미 유사도에 강함
model = SentenceTransformer("all-MiniLM-L6-v2")
dv = model.encode(docs, normalize_embeddings=True)
qv = model.encode(query, normalize_embeddings=True)
vec_rank = sorted(range(len(docs)), key=lambda i: util.cos_sim(qv, dv[i]).item(), reverse=True)

# 3) RRF로 두 등수를 합친다: 점수 = 1/(k+순위), k는 완충 상수(보통 60)
def rrf(rankings, k=60):
    score = {}
    for ranking in rankings:
        for rank, doc_id in enumerate(ranking):
            score[doc_id] = score.get(doc_id, 0) + 1 / (k + rank)
    return sorted(score, key=score.get, reverse=True)

for i in rrf([kw_rank, vec_rank]):
    print(docs[i])
# 결과: 'GPT-4o'(키워드)와 '환불'(의미)이 둘 다 반영돼 관련 문서가 위로 올라온다`,note:"벡터만·키워드만 쓸 때 각자 놓치는 문서를, 등수를 더하는 RRF로 함께 끌어올린다. 점수 척도가 달라도 순위만 쓰므로 안전하게 섞인다."},{title:"Cross-Encoder로 재순위(Re-ranking) — 상위를 다시 정밀 채점 (7교시)",lang:"python",code:`from sentence_transformers import CrossEncoder

query = "환불 기간이 어떻게 되나요?"
# 1차 검색(벡터/하이브리드)으로 가져온 후보들이라고 가정
candidates = [
    "배송은 보통 2~3일 소요됩니다",
    "환불은 결제일로부터 7일 이내에 가능합니다",
    "회원 가입은 이메일로 진행합니다",
    "환불 요청은 마이페이지에서 접수합니다",
]

# Cross-Encoder: (질문, 문서)를 한 쌍으로 함께 읽어 관련도를 직접 채점 — 정확하지만 느림
reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")
scores = reranker.predict([(query, c) for c in candidates])

# 점수가 높은 순으로 다시 정렬(재순위)
ranked = sorted(zip(scores, candidates), reverse=True)
for score, doc in ranked:
    print(f"{score:6.2f}  {doc}")
# 결과: '환불 기간' 관련 문장이 최상위로, 배송·가입 문장은 아래로 밀린다`,note:"1차 검색은 빠르게 넉넉히 후보를 모으고(bi-encoder), 그중 상위만 Cross-Encoder로 정밀 재채점하는 2단 구조가 프로덕션 표준이다."},{title:"HNSW 파라미터 튜닝",lang:"sql",code:`-- HNSW: 그래프 기반 근사 최근접 탐색(ANN)
-- m: 노드당 연결 수(↑ 정확도/메모리), ef_construction: 빌드 품질
create index on docs using hnsw (embedding vector_cosine_ops)
  with (m = 16, ef_construction = 64);

-- 검색 시 ef_search ↑ → 정확도↑·속도↓ (재현율 조절 손잡이)
set hnsw.ef_search = 100;
select content from docs order by embedding <=> :q limit 5;`,note:"ANN은 정확도와 속도의 트레이드오프다. m/ef 로 재현율을 조절하며 서비스 요구에 맞춘다."},{title:"FAISS 기본 - IndexFlatIP로 코사인 유사도 검색(정규화=내적)",lang:"python",code:`# pip install faiss-cpu numpy 를 먼저 설치한다
import numpy as np                                  # 벡터 계산용
import faiss                                        # 페이스북 벡터 검색 라이브러리

N, d = 5000, 768                                    # 문서 5000개, 임베딩 차원 768
data = np.random.randn(N, d).astype('float32')      # 임베딩이라고 가정한 난수 벡터
data /= np.linalg.norm(data, axis=1, keepdims=True) # L2 정규화: 정규화하면 내적=코사인유사도

index = faiss.IndexFlatIP(d)                         # IP=내적 기준 완전탐색(Flat) 인덱스
index.add(data)                                      # 모든 벡터를 인덱스에 그대로 저장

query = data[0:1]                                    # 0번 문서를 질의 벡터로 사용(자기 자신이 1등이어야 정상)
scores, ids = index.search(query, 5)                 # 가장 비슷한 상위 5개 검색
print('Top-5 문서 번호:', ids[0])                    # 결과: [0 ...] 0번이 맨 앞에 나온다
print('Top-5 유사도:', scores[0].round(3))           # 코사인 유사도 값(1에 가까울수록 유사)`,note:"Flat 인덱스는 모든 벡터와 전부 비교해 항상 정확하지만 데이터가 커지면 느리다. 정규화 후 내적을 쓰면 코사인 유사도가 되어 계산이 간단해진다."},{title:"FAISS IVF-Flat - 동네(클러스터)로 나눠 빠르게 검색(nlist·nprobe)",lang:"python",code:`import numpy as np
import faiss

N, d = 100000, 128                                   # 10만 개 벡터로 속도 차이를 체감
data = np.random.random((N, d)).astype('float32')    # 예시 데이터
data /= np.linalg.norm(data, axis=1, keepdims=True)  # 코사인용 정규화

nlist = 100                                          # 전체 공간을 100개 '동네(클러스터)'로 나눈다
quantizer = faiss.IndexFlatIP(d)                     # 동네 중심을 찾는 기준 인덱스
index = faiss.IndexIVFFlat(quantizer, d, nlist, faiss.METRIC_INNER_PRODUCT)

index.train(data)                                    # K-means로 100개 동네 중심을 학습
index.add(data)                                      # 각 벡터를 가까운 동네에 배치

index.nprobe = 5                                     # 검색 시 가까운 5개 동네만 열어본다(전체의 5%)
query = data[0:1]                                    # 질의 벡터
scores, ids = index.search(query, 5)                 # 선택된 동네 안에서만 Top-5 계산
print('Top-5:', ids[0])                              # nprobe를 1->10으로 키우면 정확도 상승 속도 하락
print('전체 대비 탐색 비율: 약', index.nprobe / nlist * 100, '%')`,note:"IVF는 전체를 nlist개 동네로 나누고 nprobe개만 뒤져서 Flat보다 10~50배 빠르다. nprobe가 곧 정확도-속도 손잡이다."},{title:"Qdrant 실무 - 컬렉션 생성·Upsert 후 메타데이터 필터 검색",lang:"python",code:`# 터미널에서 먼저 실행: docker run -p 6333:6333 qdrant/qdrant
# pip install qdrant-client
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct, Filter, FieldCondition, Range

client = QdrantClient(host='localhost', port=6333)   # 로컬 Qdrant 서버에 연결
client.recreate_collection(                           # 'rag_docs' 컬렉션(=테이블) 생성
    collection_name='rag_docs',
    vectors_config=VectorParams(size=4, distance=Distance.COSINE),  # 4차원·코사인 거리
)

points = [                                            # Point = ID + 벡터 + payload(메타데이터)
    PointStruct(id=1, vector=[0.1, 0.2, 0.1, 0.9], payload={'page': 3, 'category': '재무'}),
    PointStruct(id=2, vector=[0.9, 0.1, 0.2, 0.1], payload={'page': 8, 'category': '법무'}),
]
client.upsert(collection_name='rag_docs', points=points)  # 벡터+메타데이터를 함께 저장(Upsert)

hits = client.search(                                 # 5페이지 이후 문서에서만 유사도 검색
    collection_name='rag_docs',
    query_vector=[0.1, 0.2, 0.1, 0.8],
    query_filter=Filter(must=[FieldCondition(key='page', range=Range(gte=5))]),  # page>=5 필터
    limit=3,
)
print('필터 통과 결과:', [(h.id, h.payload) for h in hits])  # page 8짜리(id=2)만 남는다`,note:'FAISS와 달리 Qdrant는 벡터에 payload(메타데이터)를 붙여 저장하고 "재무팀 5페이지 이후"처럼 조건 필터 검색이 가능하다. 그래서 실무 프로덕션에서 선호된다.'},{title:"NumPy만으로 Flat 검색 - 행렬곱 한 번과 argpartition으로 Top-k",lang:"python",code:`import numpy as np                                   # 수치 계산 라이브러리

N, d = 10000, 768                                    # 문서 1만 개, 768차원 임베딩 가정
docs = np.random.randn(N, d).astype('float32')       # 문서 임베딩(연습용 난수)
query = np.random.randn(d).astype('float32')         # 질문 임베딩 1개

# 코사인용 정규화: 길이를 1로 만들어 두면 내적 = 코사인 유사도
docs = docs / np.linalg.norm(docs, axis=1, keepdims=True)   # 각 행을 길이 1로
query = query / np.linalg.norm(query)                       # 질문도 길이 1로

scores = docs @ query                                # 행렬-벡터 곱 1번으로 1만 개 점수 계산
k = 5                                                # 상위 5개만 필요
idx = np.argpartition(-scores, k - 1)[:k]            # 전체 정렬 대신 부분 선택(훨씬 빠름)
idx = idx[np.argsort(-scores[idx])]                  # 뽑힌 5개만 점수순으로 정렬
print('Top-5 문서 번호:', idx)                        # 가장 비슷한 문서 5개
print('Top-5 점수:', np.round(scores[idx], 4))       # 유사도 점수 확인`,note:"Flat(브루트포스) 인덱스는 모든 벡터와 전부 비교하는 전수조사라 항상 정답이다. 파이썬 for 루프 대신 BLAS 기반 행렬곱을 쓰고, 전체 정렬 O(N log N) 대신 argpartition(평균 O(N))으로 Top-k만 뽑는 것이 교재가 강조하는 핵심 최적화다. 데이터가 작을 때는 ANN을 붙이는 것보다 이 방식이 오히려 빠르고 정확하다."},{title:"IVF-PQ 압축 인덱스 - 벡터를 코드북으로 눌러 담아 메모리 절약",lang:"python",code:`import faiss                                     # 벡터 검색 라이브러리 (pip install faiss-cpu)
import numpy as np                               # 수치 계산

data = np.random.random((10000, 128)).astype('float32')  # 128차원 벡터 1만 개
d = 128                                          # 벡터 차원
m = 8                                            # 서브벡터 개수: 128차원을 8조각으로 분할
nlist = 100                                      # IVF 클러스터(동네) 개수

quantizer = faiss.IndexFlatL2(d)                 # 클러스터 중심을 찾는 기준 인덱스
index = faiss.IndexIVFPQ(quantizer, d, nlist, m, 8)  # 조각당 8비트 = 256개 코드북
index.train(data)                                # K-means 학습 + 코드북 생성
index.add(data)                                  # 압축 저장: 벡터당 512바이트 -> 8바이트

query = np.random.random((1, 128)).astype('float32')  # 질문 벡터
index.nprobe = 10                                # 가까운 동네 10곳만 열어 봄
D, I = index.search(query, 5)                    # 근사 Top-5 검색
print('Top-5 문서 ID:', I)                        # 압축했는데도 비슷한 것을 잘 찾는다`,note:"PQ(Product Quantization)는 큰 벡터를 여러 조각으로 나눠 각 조각을 대표 코드 번호 하나로 바꾸는 압축 기술로, 메모리를 수십~수백 배 줄인다. 벡터 1억 개면 200GB가 되는 문제를 풀기 위한 것으로, 보통 클러스터 기반 IVF와 묶어 IVF-PQ로 쓴다. 대신 근사치라 정확도를 약간 희생하는 속도·메모리·정확도의 균형 기술이다."},{title:"MinHash-LSH로 중복 문서 잡아내기 - 비슷하면 같은 버킷에 모인다",lang:"python",code:`from datasketch import MinHash, MinHashLSH   # 스케치 기반 유사도 라이브러리
import re                                    # 단어 추출용 정규식

def shingles(text, k=3):                     # 문장을 k개 단어 묶음(셰이글)으로 자르기
    tokens = re.findall(r'\\w+', text.lower())   # 소문자로 바꿔 단어만 추출
    return set(tuple(tokens[i:i+k]) for i in range(max(0, len(tokens)-k+1)))  # k-gram 집합

docs = ['deep learning advances nlp and cv',           # 문서 0
        'nlp and cv see advances with deep learning',  # 문서 1: 0과 거의 같은 내용
        'i love espresso and latte']                   # 문서 2: 전혀 다른 내용

mh_list = []                                 # 문서별 MinHash 시그니처 보관
for doc in docs:                             # 문서마다
    m = MinHash(num_perm=128)                # 길이 128짜리 시그니처 생성기
    for sh in shingles(doc):                 # 셰이글 하나하나를
        m.update(' '.join(sh).encode('utf-8'))   # 해시에 반영
    mh_list.append(m)                        # 시그니처 완성

lsh = MinHashLSH(threshold=0.8, num_perm=128)   # 자카드 유사도 0.8 이상이면 같은 버킷
for i, m in enumerate(mh_list):                 # 시그니처를 인덱스에 등록
    lsh.insert('doc-' + str(i), m)              # 문서 이름표를 붙여 삽입
print(lsh.query(mh_list[0]))                    # 0번과 비슷한 후보: doc-0, doc-1`,note:"LSH는 비슷한 것끼리 일부러 같은 해시 버킷에 충돌시키는 발상의 전환으로, 전부 비교하지 않고 소수의 후보만 정밀 비교하게 해 준다. 뉴스 서비스의 실시간 중복 기사 탐지가 대표 사례다. threshold를 0.7~0.9로 바꿔 가며 후보가 어떻게 달라지는지 관찰해 보자."}],concepts:[{term:"임베딩(Embedding)",desc:`글이나 이미지처럼 사람이 이해하는 데이터를 컴퓨터가 비교할 수 있도록 숫자들의 목록(벡터)으로 바꾼 것이다.
뜻이 비슷한 문장은 서로 가까운 숫자 목록을 갖게 된다.`},{term:"벡터(Vector)",desc:`여러 개의 숫자를 한 줄로 늘어놓은 것으로, 공간 위의 한 점이라고 생각하면 쉽다.
임베딩 모델은 보통 한 문장을 수백 개의 숫자로 된 벡터 하나로 표현한다.`},{term:"코사인 유사도(Cosine Similarity)",desc:`두 벡터가 가리키는 '방향'이 얼마나 비슷한지를 -1~1 사이 숫자로 잰 값이다.
1에 가까울수록 의미가 비슷하다는 뜻이라 검색 순위를 매길 때 가장 많이 쓴다.`},{term:"최근접 이웃 검색(Nearest Neighbor Search)",desc:`질문 벡터와 가장 가까운(=가장 비슷한) 문서 벡터를 찾아내는 작업이다.
넓은 창고에서 내 물건과 제일 닮은 물건을 찾는 것과 같다.`},{term:"ANN(근사 최근접 이웃)",desc:`문서가 수백만 개면 하나하나 다 비교하기엔 너무 느리므로, 약간의 정확도를 양보하고 훨씬 빠르게 '거의 가장 가까운' 것을 찾는 방법이다.
HNSW·IVF가 대표적인 ANN 알고리즘이다.`},{term:"Vector DB(벡터 데이터베이스)",desc:`임베딩 벡터를 대량으로 저장하고, 비슷한 벡터를 빠르게 찾아주는 일에 특화된 데이터베이스다.
FAISS(로컬 라이브러리)·Chroma·pgvector·Qdrant·Pinecone 등이 있으며, 실습에서는 FAISS로 시작해 Qdrant로 옮겨 본다.`},{term:"메타데이터 필터링",desc:`벡터와 함께 저장해 둔 꼬리표(작성일·카테고리·작성자 등)로 검색 범위를 먼저 좁히는 기능이다.
'2024년 글 중에서만' 처럼 조건을 걸어 더 정확한 검색을 만든다.`},{term:"재순위(Re-ranking)",desc:`벡터 검색으로 후보를 넉넉히 가져온 뒤, Cross-Encoder 같은 더 정교한 모델로 다시 점수를 매겨 진짜 관련 높은 것을 위로 올리는 단계다.
검색 정확도를 크게 끌어올리는 프로덕션 필수 기법이다.`},{term:"Agentic RAG · Production Architecture",desc:"단순 검색을 넘어, 결과가 부족하면 스스로 재검색·재작성하는 검색(Agentic RAG)과, 임베딩·인덱싱·재순위·캐싱을 갖춘 실서비스용 구조(Production Architecture)를 말한다."},{term:"임베딩 모델 선택(MTEB)",desc:"검색 품질의 절반은 어떤 임베딩 모델을 쓰느냐에서 갈린다. 모델마다 벡터 차원(384~3072), 지원 언어, 도메인(법률·의료·코드) 이해도, 속도·비용이 다르다. MTEB(Massive Text Embedding Benchmark)는 여러 임베딩 모델을 검색·분류·유사도 과제로 겨뤄 순위를 매긴 공개 리더보드로, 모델을 고를 때 첫 참고 자료다. 한국어가 많으면 다국어/한국어 특화 모델을, 사내 전문 용어가 많으면 도메인에 파인튜닝된 임베딩을 고르는 식으로 데이터에 맞춰 선택한다."},{term:"MEMO — Memory as a Model(최신 논문)",desc:"에이전트가 대화를 이어가려면 과거 내용을 기억해야 하는데, 지금까지는 대화 기록을 벡터 DB 같은 별도 저장소에 넣었다 꺼내 쓰는 방식이 흔했다. MEMO는 이 기억을 바깥 저장소가 아니라 모델이 다루는 하나의 대상(Memory as a Model)으로 보고, 무엇을 기억하고 잊고 요약할지를 더 능동적으로 관리하려는 최신 연구 흐름이다. 세부는 논문마다 다르지만, 핵심은 프로덕션 RAG·에이전트의 다음 과제가 검색을 넘어 장기 기억 관리로 넘어가고 있다는 점이다."}],detail:{topics:[{h:"임베딩과 유사도의 기초",items:["텍스트를 벡터로 바꾸는 임베딩 모델의 역할","벡터 차원(예: 384, 768)의 의미와 모델별 차이","코사인 유사도와 내적(dot product)의 관계","벡터 길이 정규화(normalize)가 필요한 이유","임베딩 모델은 성능이 고정된 게 아니라 골라 쓰는 부품 — 같은 문서라도 모델을 바꾸면 검색 결과가 달라짐","MTEB 리더보드로 후보 모델을 좁히고, 실제 우리 질문 20~30개로 직접 top-k 정확도를 재보는 게 정답에 가장 가까움","차원이 클수록 표현력은 좋지만 저장·검색 비용이 커짐 — 검색 품질과 인프라 비용의 균형","도메인 특화가 안 맞으면 (1) 더 나은 모델 교체 (2) 도메인 데이터로 임베딩 파인튜닝 (3) 하이브리드+재순위 순으로 접근","한국어 서비스는 다국어/한국어 임베딩 모델을 기본으로 검토"]},{h:"인덱싱 알고리즘",items:["완전탐색(Flat)의 정확성과 느린 속도","HNSW: 그래프 기반 탐색의 직관","IVF: 클러스터로 나눠 검색 범위 줄이기","정확도와 속도의 트레이드오프(recall vs latency)"]},{h:"대표 Vector DB와 실전 검색 기능",items:["임베디드형 FAISS·Chroma vs 서버형 Qdrant·pgvector·Pinecone","FAISS로 시작해 Qdrant(서버형)로 옮기는 경로","메타데이터 필터링으로 검색 범위 좁히기","키워드(BM25)+벡터를 합치는 하이브리드 검색"]},{h:"재순위·Agentic RAG·Production",items:["Re-ranking(Cross-Encoder)으로 검색 정확도 향상","Chunking Engineering: 검색 품질을 좌우하는 청킹 설계","Agentic RAG: 부족하면 스스로 재검색하는 검색","Production Architecture와 최신 동향(MEMO: Memory as a Model)"]}],labs:[{title:"Lab 1 — 임베딩 첫걸음: 문장을 벡터로 바꿔 길이 확인하기",steps:["`pip install sentence-transformers` 로 라이브러리를 설치한다.","파이썬 파일에서 `SentenceTransformer('all-MiniLM-L6-v2')` 모델을 불러온다.","좋아하는 문장 1개를 `model.encode('문장')` 으로 벡터로 바꾼다.","`print(len(벡터))` 로 벡터 길이가 384인지 확인한다 (기대 결과: 384).","문장을 2개로 늘려 `encode([문장1, 문장2])` 의 결과 모양(shape)이 (2, 384)인지 확인한다."]},{title:"Lab 2 — FAISS Flat vs HNSW 검색 속도 비교",steps:["`pip install faiss-cpu numpy` 로 설치한다.","`np.random.rand(10000, 384).astype('float32')` 로 가짜 벡터 1만 개를 만든다.","`faiss.IndexFlatIP(384)` 와 `faiss.IndexHNSWFlat(384, 32)` 두 인덱스를 각각 만들어 `add` 한다.","질문 벡터 1개로 두 인덱스에서 각각 `search(q, 5)` 를 실행한다.","`import time` 으로 검색 전후 시간을 재서 두 방식의 속도 차이를 출력하고, 결과 순위가 비슷한지 비교한다."]},{title:"Lab 3 — Chroma에 메타데이터 달고 조건 검색하기",steps:["`pip install chromadb` 로 설치하고 `chromadb.Client()` 로 DB를 만든다.","`create_collection('news')` 컬렉션을 만든다.","문서 4개를 `metadatas=[{'cat':'pet'}, {'cat':'pet'}, {'cat':'econ'}, {'cat':'econ'}]` 와 함께 `add` 한다.","`query(query_texts=['동물'], where={'cat':'pet'}, n_results=2)` 로 pet 카테고리 안에서만 검색한다.","필터를 뺐을 때와 결과가 어떻게 달라지는지 두 경우를 출력해 비교한다."]},{title:"Lab 4 — FAISS에서 Qdrant로 옮겨 같은 결과 확인하기 (5교시)",steps:["`pip install qdrant-client` 로 설치한다.","오전에 만든 문장 6~8개와 그 임베딩(384차원)을 그대로 재사용한다.","`QdrantClient(':memory:')` 로 로컬 Qdrant를 띄우고 `create_collection('docs', VectorParams(size=384, distance=Distance.COSINE))` 으로 컬렉션을 만든다.","각 문장을 `PointStruct(id, vector, payload={'text': 원문})` 로 `upsert` 한다.","같은 질문으로 `query_points(..., limit=3)` 검색해, FAISS 때와 상위 3개 문서가 같은지 표로 비교한다(기대: 거의 동일).","payload에 주제 태그(예: `{'cat': 'pet'}`)를 넣고 필터 검색(`query_filter`)으로 특정 주제 안에서만 검색되는지 확인한다."]},{title:"Lab 5 — 하이브리드 + 재순위로 상위 문서 바로잡기 (7교시)",steps:["`pip install rank-bm25` 로 BM25 라이브러리를 설치한다.","고유명사·숫자가 섞인 문장 6~8개를 준비한다(예: 모델명 'GPT-4o', 환불 규정 '7일' 등).","BM25로 키워드 순위를, 임베딩 코사인으로 벡터 순위를 각각 구한다.","두 순위를 RRF(`1/(k+순위)`, k=60)로 합쳐 하이브리드 순위를 만든다.","`CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')` 로 하이브리드 상위 후보를 재채점해 재순위한다.","'벡터만' vs '하이브리드' vs '하이브리드+재순위' 세 경우의 top-3를 나란히 출력해, 어느 방법이 정답 문서를 가장 위로 올렸는지 한 줄로 메모한다."]}],homework:["오늘 만든 검색 코드를 FAISS에서 Qdrant로 옮기고, 같은 질문에 대한 검색 결과가 동일한지 표로 정리해 제출한다.","하이브리드 검색 결과에 Re-ranking을 적용해, 재순위 전/후 상위 3개 문서가 어떻게 달라지는지 비교해 3문장으로 정리한다."]},theory:{theory:[{h:"RAG 설계 패턴 - Naive에서 Advanced, Modular로",body:`가장 단순한 RAG(Naive RAG)는 [질문 → 벡터검색 → 그대로 LLM] 한 줄이다.
데모는 되지만 실서비스에선 엉뚱한 문서를 물어오거나 근거 없이 지어내는 문제가 잦다.
그래서 Advanced RAG는 검색 앞뒤에 손질을 더한다 — 검색 전(pre-retrieval)에는 질문을 다듬거나(query rewriting) 청킹을 개선하고, 검색 후(post-retrieval)에는 재순위(re-ranking)와 불필요한 문맥 압축으로 LLM에 넣을 근거의 질을 높인다.
한 단계 더 나아간 Modular RAG는 검색·재작성·재순위·라우팅을 갈아 끼울 수 있는 부품으로 나눠, 상황에 따라 조합을 바꾼다.

오늘 실습의 FAISS → Qdrant + Hybrid + Reranking이 바로 Naive에서 Advanced로 올라가는 과정이다.`},{h:"왜 '키워드 검색'만으로는 부족할까",body:`옛날 검색은 글자가 똑같이 들어있는지를 보고 찾았다.
그래서 '강아지'로 검색하면 '강아지'라는 글자가 든 문서만 나오고, 뜻이 같은 '반려견' 문서는 놓치기 쉬웠다.
사람은 단어가 달라도 의미가 비슷하면 같은 주제로 느끼는데, 글자만 맞추는 검색은 이 '의미'를 모른다.

임베딩은 바로 이 의미를 숫자로 담아낸다.
'강아지'와 '반려견'을 비슷한 벡터로 만들어 두면, 글자가 달라도 가까운 위치에 놓이기 때문에 함께 검색된다.
이렇게 의미로 찾는 검색을 '시맨틱 검색(semantic search)'이라 부르며, Vector DB가 이를 가능하게 해준다.`},{h:"단순 RAG의 한계부터 진단하기",body:`오늘의 출발점은 '지금 쓰는 RAG가 왜 부족한가'를 짚는 것이다.
단순 RAG는 네 곳에서 자주 무너진다.
① 검색 실패: 질문 표현이 문서와 달라 관련 문서를 못 찾는다.
② 환각: 근거가 약해도 그럴듯하게 지어낸다.
③ 최신성·범위: 청킹이 나쁘거나 필터가 없어 엉뚱한 시점·범주의 문서를 섞는다.
④ 평가 부재: 좋아졌는지 나빠졌는지 숫자로 확인할 방법이 없다.

이 네 가지를 하나씩 메우는 도구가 오늘 배우는 좋은 임베딩·청킹·하이브리드·재순위·Agentic RAG다.`},{h:"벡터 공간과 유사도 — '가까우면 비슷하다'",body:`임베딩 벡터를 공간 위의 점이라고 상상해 보자.
비슷한 뜻의 문장들은 서로 가까이 모여 있고, 동떨어진 주제는 멀리 떨어져 있다.
그래서 '두 문장이 비슷한가?'라는 질문은 '두 점이 얼마나 가까운가?'라는 거리 계산 문제로 바뀐다.

가까움을 재는 방법은 크게 두 가지다.
하나는 두 화살표의 방향 차이를 보는 코사인 유사도이고, 다른 하나는 두 벡터를 곱해 더하는 내적(dot product)이다.
문서 길이의 영향을 줄이고 싶을 때는 보통 길이를 1로 맞춘 뒤 코사인 유사도를 쓰는데, 이 경우 코사인과 내적은 사실상 같은 결과를 준다.`},{h:"다 비교하면 느리다 — HNSW와 IVF의 직관",body:`문서가 100개면 질문 하나에 100번만 비교하면 되지만, 1000만 개라면 매번 1000만 번을 비교해야 해서 너무 느리다.
그래서 미리 '지름길 지도'를 만들어 두는 것이 인덱싱이다.

HNSW는 친구 관계망처럼 점들을 서로 연결해 두고, 가까운 이웃을 따라 징검다리를 건너듯 빠르게 목적지에 다가가는 방식이다.
IVF는 먼저 비슷한 점들끼리 동네(클러스터)로 묶어 두고, 질문이 들어오면 가까운 몇 개 동네만 뒤져서 시간을 아낀다.
둘 다 모든 후보를 다 보지는 않으므로 아주 가끔 진짜 1등을 놓칠 수 있지만, 그 대신 수십~수백 배 빨라지는 실용적인 거래(trade-off)를 한다.`},{h:"검색을 더 똑똑하게: 재순위와 Agentic RAG",body:`벡터 검색으로 후보를 빠르게 가져와도, 정말 좋은 문서가 항상 맨 위에 오지는 않는다.
그래서 후보를 넉넉히 가져온 뒤 더 정교한 모델(Cross-Encoder)로 다시 점수를 매겨 순서를 바로잡는 재순위(Re-ranking)를 얹는다.
여기에 단어가 정확히 겹치는지 보는 키워드 검색까지 섞은 하이브리드로 서로의 약점을 보완한다.

한 걸음 더 나아가면, 결과가 부족할 때 스스로 질문을 고쳐 다시 검색하는 Agentic RAG가 검색 자체를 똑똑하게 만든다.
실서비스에서는 보통 FAISS(로컬 라이브러리)로 시작해 Qdrant 같은 서버형 Vector DB로 옮기고, 임베딩·청킹·재순위·캐싱을 갖춘 Production Architecture로 완성한다.
즉 '빠른 검색'에서 '정확하고 스스로 판단하는 검색'으로 올라가는 것이 이 과목의 목표다.`},{h:"어떤 Vector DB를 고를까 — 임베디드형 vs 서버형 (4교시)",body:`벡터를 저장하고 비슷한 것을 찾아주는 도구는 크게 두 부류다.
임베디드형은 내 파이썬 프로세스 '안에서' 도는 라이브러리다 — FAISS(속도가 빠른 연구·산업 표준)와 Chroma(설치가 간편하고 메타데이터 검색이 쉬움)가 대표다. pip 한 줄이면 되고 별도 서버를 안 띄워도 되니 프로토타입·소규모에 딱 맞지만, 여러 대의 서버가 같은 데이터를 공유하거나 수백만~수억 개 벡터를 24시간 운영하기엔 버겁다.
서버형은 별도 프로세스나 클라우드로 떠서 네트워크로 붙는다 — Qdrant(러스트 기반, 필터·하이브리드 검색이 강점), pgvector(이미 PostgreSQL을 쓰면 기존 테이블 옆에 벡터를 같이 저장), Pinecone(완전관리형 SaaS라 인프라를 아예 신경 안 씀)이 대표다.

고르는 기준은 네 가지로 정리된다. ① 데이터 규모 — 수만 개면 FAISS·Chroma, 수백만 개 이상이면 서버형. ② 메타데이터 필터와 하이브리드가 중요하면 Qdrant. ③ 이미 Postgres를 운영 중이면 pgvector가 운영 부담이 가장 적다. ④ 인프라 관리를 통째로 피하고 싶으면 Pinecone.
오늘 실습이 FAISS로 원리를 익히고 Qdrant로 옮기는 이유가 여기 있다 — '프로토타입 → 프로덕션'으로 넘어가는 그 이동을 직접 겪어보는 것이다.`},{h:"청킹이 검색 품질의 절반 — 자르는 법과 섞는 법 (6교시)",body:`아무리 좋은 임베딩과 인덱스를 써도 문서를 잘못 자르면 검색이 무너진다.
청킹(chunking)은 긴 문서를 검색 단위로 쪼개는 일인데, 너무 크게 자르면 한 조각에 여러 주제가 섞여 질문과 엉뚱하게 매칭되고, 너무 잘게 자르면 문맥이 끊겨 답의 근거가 사라진다. 실무의 출발점은 300~800 토큰에 10~20% 겹침(overlap)을 두는 것 — 이 겹침이 경계에서 잘린 문장을 살려준다. 문서 성격에 맞춘 전략도 있다: 마크다운·조항 문서는 제목·항목 경계로 자르고(구조 기반), FAQ는 질문-답 한 쌍을 한 조각으로 묶는다.

다음은 하이브리드 검색이다. 벡터 검색은 '의미'는 잘 잡지만 정확한 고유명사·모델명·코드·숫자에는 약하고, 키워드 검색(BM25)은 정반대로 정확한 단어 겹침에 강하다. 그래서 둘을 함께 돌려 결과를 합친다.
합치는 대표 방법이 RRF(Reciprocal Rank Fusion)로, 각 검색에서 매겨진 '등수'를 1/(k+순위)로 바꿔 더해 최종 순위를 낸다. 점수 척도가 서로 달라도 등수만 쓰기 때문에 안전하게 섞인다.

정리하면 — 청킹으로 조각을 잘 만들고, 하이브리드로 서로의 약점을 메우고, 다음 시간에 배울 재순위(Re-ranking)로 상위를 다듬는 3단이 검색 정확도를 끌어올리는 실전 레시피다.`},{h:"검색이 스스로 판단하게 — Agentic RAG와 프로덕션 구조, 그리고 MEMO (8교시)",body:`지금까지의 RAG는 '한 번 검색 → 한 번 답'이었다.
Agentic RAG는 여기에 판단 고리를 얹는다. 검색 결과를 LLM이 스스로 채점하고(이 문서가 질문과 관련 있나?), 부실하면 질문을 고쳐(rewrite) 다시 검색하거나, 복잡한 질문은 여러 개로 쪼개 각각 찾은 뒤 합친다. 즉 '검색 → 평가 → (부족하면) 재검색' 루프가 돈다. 오늘 관련 실습에서 본 grade → rewrite 되먹임이 바로 이 구조의 최소형이다.

이걸 실서비스로 굳히면 Production Architecture가 된다: 임베딩 캐시(같은 질문이 반복되면 재계산하지 않음), 서버형 Vector DB(Qdrant 등), 하이브리드+재순위 파이프라인, 그리고 관측(로깅·trace)과 평가(RAGAS 등)까지 갖춘 한 덩어리다. 오늘 배운 임베딩 → 인덱싱 → 하이브리드 → 재순위 → Agentic 루프가 이 구조의 뼈대다.

마지막으로 최신 흐름 하나 — MEMO(Memory as a Model). 지금은 대화 기록을 벡터 DB에 넣었다 꺼내 쓰는 방식이 흔한데, MEMO 계열 연구는 '무엇을 기억하고·잊고·요약할지'를 모델이 능동적으로 다루는 하나의 대상으로 본다. 세부는 논문마다 다르지만 요지는 분명하다 — 프로덕션 RAG의 다음 과제가 '더 잘 찾기'를 넘어 '장기 기억을 잘 관리하기'로 옮겨가고 있다는 것이다.`}]},realCodes:[{title:"엔드투엔드: FAISS로 문서 임베딩 → 인덱스 구축 → 질문 검색",lang:"python",code:`# sentence-transformers: 문장을 벡터로 바꿔주는 임베딩 모델 라이브러리
from sentence_transformers import SentenceTransformer
# faiss: 대량 벡터를 빠르게 검색하기 위한 인덱스 라이브러리 (cpu 버전)
import faiss
# numpy: 벡터(숫자 배열)를 다루는 기본 도구
import numpy as np

# 1) 검색 대상이 될 문서들을 준비한다 (실무에선 DB나 파일에서 읽어온다)
docs = [
    "강아지는 산책을 좋아하는 반려동물이다",   # 주제: 반려동물
    "고양이는 그루밍으로 몸을 청결하게 한다",   # 주제: 반려동물
    "오늘 서울의 날씨는 맑고 따뜻하다",         # 주제: 날씨
    "주식 시장은 금리 변화에 민감하게 반응한다", # 주제: 경제
]

# 2) 임베딩 모델을 불러온다 (처음 실행 시 자동 다운로드, 384차원 벡터를 만든다)
model = SentenceTransformer("all-MiniLM-L6-v2")

# 3) 모든 문서를 벡터로 변환한다 (normalize_embeddings=True 로 길이를 1로 맞춰 코사인 비교 준비)
doc_vecs = model.encode(docs, normalize_embeddings=True)
# float32 로 변환: FAISS는 32비트 실수 배열만 받기 때문
doc_vecs = np.array(doc_vecs, dtype="float32")

# 4) 인덱스를 만든다. IndexFlatIP = 내적(Inner Product) 기준 완전탐색 인덱스
#    벡터 길이를 1로 맞췄으므로 내적값이 곧 코사인 유사도가 된다
dim = doc_vecs.shape[1]            # 벡터 하나의 길이(=384)를 꺼낸다
index = faiss.IndexFlatIP(dim)     # 빈 인덱스 생성
index.add(doc_vecs)                # 문서 벡터들을 인덱스에 등록한다
print("저장된 문서 수:", index.ntotal)  # 결과: 저장된 문서 수: 4

# 5) 질문을 같은 모델·같은 방식으로 벡터화한다 (검색하려면 같은 공간에 있어야 한다)
query = "반려동물을 키우는 방법"
q_vec = model.encode([query], normalize_embeddings=True)
q_vec = np.array(q_vec, dtype="float32")

# 6) 가장 비슷한 문서 2개를 찾는다. scores=유사도, idxs=문서 위치(인덱스)
scores, idxs = index.search(q_vec, k=2)

# 7) 검색 결과를 사람이 읽기 좋게 출력한다
for rank, (doc_id, score) in enumerate(zip(idxs[0], scores[0]), start=1):
    # doc_id 위치의 원문과 유사도 점수를 함께 보여준다
    print(f"{rank}위 (유사도 {score:.3f}): {docs[doc_id]}")
# 결과 예시: 1위에 강아지/고양이 문장이, 날씨·주식 문장은 뒤로 밀린다`,note:`임베딩 → 인덱스 적재 → 질문 검색으로 이어지는 가장 기본적인 시맨틱 검색의 전체 흐름이다.
핵심은 '문서와 질문을 같은 모델로 벡터화해야 비교가 된다'는 점이다.`},{title:"실전: FAISS IVF 인덱스 구축·검색",lang:"python",code:`import faiss, numpy as np

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
print("상위 문서 idx:", ids[0], "유사도:", scores[0])`,note:"IVF는 train()으로 군집을 학습한 뒤 nprobe로 탐색 범위를 조절한다(↑정확도/↓속도). L2 정규화로 내적을 코사인과 동일하게 만든다."}],periods:["1교시 — 오리엔테이션: 벡터 검색이 왜 필요한가, RAG 한계 진단","2교시 — 임베딩과 벡터 공간, 코사인/내적 유사도, 인덱싱(HNSW·IVF)","3교시 [실습] 임베딩·유사도 계산 + FAISS Flat vs HNSW 속도 비교","4교시 — 대표 Vector DB 비교: FAISS·Chroma·pgvector·Qdrant·Pinecone","5교시 [실습] FAISS→Qdrant로 문서 임베딩·저장·검색 옮기기","6교시 — Chunking Engineering과 하이브리드 검색, Re-ranking","7교시 [실습] Hybrid + Reranking으로 검색 정확도 높이기","8교시 — Agentic RAG와 Production Architecture, 최신 동향(MEMO)"]}};export{n as default};
