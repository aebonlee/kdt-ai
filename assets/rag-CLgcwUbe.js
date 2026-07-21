const e={"rag-1":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 RAG가 왜 필요한가: LLM의 한계와 검색 증강의 직관"},{time:"10:00–10:50",topic:"2교시 RAG 전체 파이프라인 한눈에 보기(적재→청킹→임베딩→색인→검색→생성)"},{time:"11:00–11:50",topic:"3교시 [실습] 개발환경 셋업과 첫 문서 로딩"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 청킹(chunking) 전략: 문서를 어떻게 잘라야 하나"},{time:"14:00–14:50",topic:"5교시 [실습] 청킹 파라미터 바꿔가며 비교하기"},{time:"15:00–15:50",topic:"6교시 임베딩(embedding)과 벡터 공간의 이해"},{time:"16:00–16:50",topic:"7교시 벡터 색인과 유사도 검색 기초"},{time:"17:00–17:50",topic:"8교시 [실습] 문서 인덱싱 파이프라인 완성하기"}],practice:{title:"내 PDF 문서를 검색 가능한 벡터 인덱스로 만드는 파이프라인 구축",steps:["터미널을 열고 'python -m venv venv' 명령으로 가상환경을 만든 뒤 'source venv/bin/activate'(윈도우는 venv\\Scripts\\activate)로 활성화한다.","'pip install langchain langchain-chroma langchain-community langchain-openai chromadb pypdf' 를 실행해 필요한 라이브러리를 한 번에 설치한다.","작업 폴더에 'docs' 폴더를 만들고, 검색 대상이 될 PDF 파일 1개(예: 회사 규정집)를 그 안에 복사한다.","환경변수에 OpenAI API 키를 넣는다: 터미널에서 'export OPENAI_API_KEY=sk-...' (윈도우는 set 사용).","PyPDFLoader 로 PDF를 불러와 전체 페이지 수를 print 로 확인한다(기대 결과: 예 '총 12페이지 로드').","RecursiveCharacterTextSplitter 로 chunk_size=500, chunk_overlap=50 으로 잘라 조각 개수를 출력한다(기대 결과: 예 '조각 37개 생성').","OpenAIEmbeddings 와 Chroma 를 이용해 조각들을 벡터로 바꿔 'chroma_db' 폴더에 저장(persist)한다.",`저장된 인덱스에 'similarity_search("환불 규정은?", k=3)' 질의를 던져 가장 가까운 3개 조각의 앞 80자를 출력한다.`,"출력된 3개 조각이 질문과 관련 있는 내용인지 눈으로 확인하고, 관련 없으면 chunk_size 를 800으로 바꿔 다시 인덱싱해 비교한다.","최종 인덱싱 코드를 'indexing.py' 파일로 저장하고, 다시 실행해도 같은 결과가 나오는지 확인한다."],deliverable:"내 PDF로 만든 chroma_db 폴더 + indexing.py 스크립트 + 검색 결과 3개를 캡처한 화면"}},examples:[{title:"임베딩으로 문장의 의미 비슷함을 숫자로 재 보기",lang:"python",code:`from langchain_openai import OpenAIEmbeddings  # 임베딩 모델 불러오기
from numpy import dot  # 두 벡터의 내적을 구하는 함수
from numpy.linalg import norm  # 벡터의 길이(크기)를 구하는 함수

emb = OpenAIEmbeddings(model="text-embedding-3-small")  # 임베딩 모델 준비
v1 = emb.embed_query("강아지가 공원을 뛴다")  # 첫 문장을 벡터로 변환
v2 = emb.embed_query("개가 공원에서 달린다")  # 의미가 비슷한 문장을 벡터로 변환
v3 = emb.embed_query("오늘 주식 시장이 폭락했다")  # 의미가 전혀 다른 문장을 벡터로 변환

def cos(a, b):  # 코사인 유사도를 계산하는 함수 정의
    return dot(a, b) / (norm(a) * norm(b))  # 내적을 각 벡터 길이의 곱으로 나눈다

print(round(cos(v1, v2), 3))  # 결과: 0.8 부근(비슷한 문장이라 높음)
print(round(cos(v1, v3), 3))  # 결과: 0.1 부근(다른 주제라 낮음)`,note:"의미가 비슷한 문장은 유사도가 높고 다른 주제는 낮게 나오는 것을 눈으로 확인하는 게 핵심이다."},{title:"긴 글을 조각으로 잘라 개수와 모양 확인하기",lang:"python",code:`from langchain_text_splitters import RecursiveCharacterTextSplitter  # 분할기 불러오기

text = "RAG는 검색과 생성을 합친 방법이다. " * 20  # 같은 문장을 20번 이어 붙여 긴 글을 만든다
splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=20)  # 100자씩, 20자 겹치게
chunks = splitter.split_text(text)  # 긴 글을 조각 리스트로 자른다

print(f"조각 수: {len(chunks)}")  # 결과: 조각 수: 8 (글 길이에 따라 달라짐)
print(chunks[0])  # 결과: 첫 조각 내용이 100자 안쪽으로 출력됨`,note:"chunk_size 와 chunk_overlap 숫자를 바꾸면 조각 수가 달라지는 것을 체감하는 예제다."},{title:"청킹 전략 비교 — 조각 크기를 바꿔 개수·평균 길이 보기",lang:"python",code:`from langchain_text_splitters import RecursiveCharacterTextSplitter  # 재귀 분할기

text = ("RAG는 검색과 생성을 결합한다. 먼저 문서를 조각으로 나눈다. "
        "각 조각을 벡터로 만든다. 질문이 오면 가까운 조각을 찾는다. ") * 8  # 예시 긴 글

# 같은 글을 서로 다른 chunk_size 로 잘라 결과를 비교한다
for size in (80, 200, 400):  # 조각 크기를 3가지로 바꿔 본다
    splitter = RecursiveCharacterTextSplitter(chunk_size=size, chunk_overlap=int(size * 0.1))  # 겹침은 10%
    chunks = splitter.split_text(text)  # 긴 글을 조각으로 자른다
    avg = sum(len(c) for c in chunks) / len(chunks)  # 조각 평균 길이 계산
    print(f"size={size:>3} -> 조각 {len(chunks):>2}개, 평균 {avg:.0f}자")
# 결과 예:
# size= 80 -> 조각 16개, 평균 61자   (작게 자르면 조각이 많고 문맥이 짧다)
# size=200 -> 조각  7개, 평균 148자
# size=400 -> 조각  4개, 평균 250자   (크게 자르면 조각이 적고 불필요한 내용이 섞인다)`,note:"작게 자르면 정확하지만 문맥이 끊기고, 크게 자르면 문맥은 풍부하나 잡음이 섞인다. 우리 문서에 맞는 크기를 실험으로 찾는 게 인덱싱의 첫 단추다."},{title:"자르기→임베딩→저장, 인덱싱 한 번에 완성하기 (Chroma)",lang:"python",code:`from langchain_text_splitters import RecursiveCharacterTextSplitter  # 분할기
from langchain_openai import OpenAIEmbeddings  # 임베딩 모델
from langchain_chroma import Chroma  # 벡터 DB
from langchain_core.documents import Document  # 문서 조각 객체

# 1) 색인할 원문(실제로는 파일/DB 에서 읽어온다)
raw = "연차 휴가는 입사 1년 후부터 15일이 부여된다. 재택근무는 팀장 승인 시 주 2회까지 가능하다. 경조사비는 결혼 시 30만원을 지급한다."

# 2) 긴 글을 조각으로 자른다(검색의 최소 단위 만들기)
splitter = RecursiveCharacterTextSplitter(chunk_size=40, chunk_overlap=5)
chunks = [Document(page_content=c) for c in splitter.split_text(raw)]

# 3) 조각을 임베딩해 Chroma 에 저장한다 - 이 저장 과정이 바로 인덱싱
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vectordb = Chroma.from_documents(chunks, embeddings, persist_directory="chroma_db")
print(f"{len(chunks)}개 조각을 색인해 chroma_db 폴더에 저장했다")

# 4) 저장한 인덱스로 바로 유사도 검색을 해 본다(다음 실습에서 리트리버로 확장)
hits = vectordb.similarity_search("재택근무 며칠까지 돼?", k=1)
print(hits[0].page_content)  # 결과: 재택근무 관련 조각이 검색된다`,note:"자르기(split)->임베딩(embed)->저장(Chroma.from_documents)의 3단계가 인덱싱의 전부다. persist_directory 폴더에 저장해 두면 다음 실습(리트리버)에서 그대로 불러 쓴다."},{title:"하이브리드 청킹 전략 비교",lang:"python",code:`from langchain_text_splitters import RecursiveCharacterTextSplitter

# 문서 성격에 따라 청크 크기를 다르게 실험한다
configs = [
    (300, 30),   # 짧은 청크: 정밀하지만 문맥 부족
    (800, 120),  # 긴 청크: 문맥 풍부하지만 노이즈 증가
]
for size, overlap in configs:
    sp = RecursiveCharacterTextSplitter(
        chunk_size=size, chunk_overlap=overlap,
        separators=["\\n\\n", "\\n", ". ", " "],  # 의미 경계 우선 분할
    )
    chunks = sp.split_text(document)
    print(f"size={size}: {len(chunks)}개 청크")`,note:"separators 순서대로 분할을 시도해 문단→문장 경계를 보존한다. 청크 크기는 검색 정밀도와 문맥의 트레이드오프."},{title:"PDF 로딩 → 청킹 → 메타데이터 태깅(전처리 한 흐름)",lang:"python",code:`# pip install pymupdf langchain-community langchain-text-splitters
from langchain_community.document_loaders import PyMuPDFLoader        # 빠른 PDF 텍스트 추출기
from langchain_text_splitters import RecursiveCharacterTextSplitter   # 계층적 분할기

docs = PyMuPDFLoader('data/ai_semiconductor.pdf').load()  # PDF를 페이지 단위 문서로 로드
print('페이지 수:', len(docs))                            # 각 문서에 page 번호가 메타데이터로 들어있다

splitter = RecursiveCharacterTextSplitter(                # 문단->줄->문장->단어 순으로 자른다
    chunk_size=500,                                       # 실무 기본값 300~500 토큰
    chunk_overlap=50,                                     # 10% 겹침으로 문맥 단절 방지
    separators=['\\n\\n', '\\n', '. ', ' '],              # 의미 경계 우선순위
)
chunks = splitter.split_documents(docs)                   # 페이지들을 작은 청크로 분할

for c in chunks[:2]:                                      # 앞 청크 2개에 검색용 메타데이터를 덧붙인다
    c.metadata.update({'category': '반도체', 'language': 'ko'})  # 필터 검색에 쓸 태그
    print('page', c.metadata.get('page'), '| 글자수', len(c.page_content))
print('총 청크 수:', len(chunks))                         # 100페이지 PDF가 수백 개 청크로 쪼개진다`,note:"RAG 전처리의 뼈대다. PyMuPDF로 텍스트를 뽑고, Recursive 분할기로 의미 경계를 지키며 자르고, category·page 같은 메타데이터를 심어야 나중에 필터 검색이 된다."},{title:"Parent-Child 검색 - 작게 찾고 크게 전달(실무 최우선)",lang:"python",code:`# 검색 정밀도(작은 Child)와 문맥 풍부함(큰 Parent)을 동시에 얻는 전략
from langchain.retrievers import ParentDocumentRetriever
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.storage import InMemoryStore

parent_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)  # 큰 단위(맥락 보존, LLM에 전달용)
child_splitter = RecursiveCharacterTextSplitter(chunk_size=200)    # 작은 단위(정밀 검색·임베딩용)

vectorstore = Chroma(embedding_function=OpenAIEmbeddings())        # Child 벡터를 저장할 곳
docstore = InMemoryStore()                                         # 원본 Parent 문서를 보관할 곳

retriever = ParentDocumentRetriever(                               # 두 저장소를 묶는 검색기
    vectorstore=vectorstore,      # 검색은 작은 Child 벡터로
    docstore=docstore,            # 반환은 Child가 속한 큰 Parent로
    child_splitter=child_splitter,
    parent_splitter=parent_splitter,
)
retriever.add_documents(docs)                                     # 문서를 넣으면 Parent/Child가 자동 생성
found = retriever.invoke('HBM 메모리 대역폭은?')                    # 작은 청크로 정확히 매칭한 뒤
print('반환된 문맥 길이:', len(found[0].page_content))             # 큰 Parent 청크를 통째로 돌려준다`,note:"Child(200토큰)로 정밀하게 위치를 찾고, 그 청크가 속한 Parent(1000토큰)를 LLM에 넘긴다. 검색 정밀도와 답변 문맥을 동시에 잡는 실무 표준 전략이다."},{title:"토큰과 청크의 관계 - 슬라이딩 윈도우로 직접 잘라 보기",lang:"python",code:`sentence = 'This is an example text for demonstration'   # 실습용 문장
tokens = sentence.split()                  # 아주 단순한 토크나이저: 공백으로 단어 조각내기
print('토큰:', tokens)                      # 토큰 = 단어 조각 7개

chunk_size = 4                             # 청크 하나에 담을 토큰 수
chunk_overlap = 2                          # 앞 청크와 겹칠 토큰 수(문맥 단절 방지)
step = chunk_size - chunk_overlap          # 창을 옮기는 보폭 = 4 - 2 = 2

chunks = []                                # 완성된 청크를 담을 리스트
for start in range(0, len(tokens), step):  # 보폭만큼 창을 밀며 반복
    chunk = tokens[start:start + chunk_size]   # 현재 창 안의 토큰들
    if chunk:                              # 빈 조각은 제외하고
        chunks.append(chunk)               # 청크로 저장
    if start + chunk_size >= len(tokens):  # 문장 끝에 닿으면
        break                              # 반복 종료

for i, c in enumerate(chunks):             # 결과 확인
    print('Chunk' + str(i + 1) + ':', c)   # 청크 경계마다 두 토큰이 겹친다`,note:"토큰은 문장을 쪼갠 단어 조각이고, 청크는 모델이 감당할 수 있게 토큰을 다시 묶은 덩어리다. 교재 예시 그대로 chunk_size=4, overlap=2로 자르면 청크 사이에 두 토큰이 겹쳐 문맥이 끊기지 않고 이어진다. 오버랩은 보통 청크 크기의 10~20%가 권장값이다."},{title:"원핫 인코딩 vs 학습된 임베딩 - 왜 밀집 벡터를 쓰는가",lang:"python",code:`import numpy as np                          # 수치 계산

vocab = ['request', 'feature', 'how', 'issue', 'credit']  # 단어 사전 5개
one_hot = np.eye(len(vocab))                # 원핫: 자기 자리만 1, 나머지 전부 0
print('request 원핫:', one_hot[0])          # [1,0,0,0,0] - 절대다수가 0(희소 벡터)

# 원핫끼리 내적하면 다른 단어는 무조건 0 -> 의미 유사도를 전혀 표현 못 함
print('request-issue 유사도:', one_hot[0] @ one_hot[3])   # 항상 0.0

# 학습된 임베딩(예시 값): 문맥상 비슷한 단어는 벡터도 가깝게 학습된다
emb = {'request': np.array([0.007, -0.039, -0.002, -0.024, 0.007]),    # request
       'issue':   np.array([-0.015, -0.035, -0.009, -0.012, -0.015]),  # issue
       'credit':  np.array([-0.012, -0.027, -0.001, -0.051, 0.064])}   # credit

def cos(a, b):                              # 코사인 유사도 함수
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))  # 내적 / 크기곱

print('request-issue :', round(cos(emb['request'], emb['issue']), 3))   # 의미 관계가 숫자로
print('request-credit:', round(cos(emb['request'], emb['credit']), 3))  # 단어쌍마다 다른 유사도`,note:"원핫은 단어 수만큼 차원이 커지고 대부분이 0인 희소 구조라 서로 다른 단어의 유사도가 항상 0이다. 학습된 임베딩은 낮은 차원(보통 384~1536)에 의미를 밀집시켜 비슷한 단어가 가까운 점이 되도록 만든다. RAG의 임베딩 단계는 이 원리를 문장·청크 단위로 확장한 것이다."},{title:"메타데이터 설계 - 권한 태그와 문서 타입으로 검색 전에 거르기",lang:"python",code:`# 교재 권장 메타데이터: 식별자 + 검색 근거 + 필터링 필드를 함께 저장한다
chunks = [
    {'content': '2024년 재무 실적 요약...', 'metadata': {              # 청크 1
        'doc_id': 'annual_2024', 'page': 23, 'document_type': '보고서',  # 식별자·근거
        'updated_at': '2024-03-15', 'access_tag': ['finance']}},         # 필터 필드
    {'content': '설치 절차 1단계...', 'metadata': {                   # 청크 2
        'doc_id': 'manual_v2', 'page': 7, 'document_type': '매뉴얼',
        'updated_at': '2024-06-01', 'access_tag': ['all']}},
]

def visible_chunks(user_tags, doc_type=None):     # 벡터 검색 전에 후보를 거르는 함수
    out = []                                      # 통과한 청크 저장
    for c in chunks:                              # 모든 청크 검사
        meta = c['metadata']                      # 메타데이터 꺼내기
        opened = 'all' in meta['access_tag']      # 전체 공개 문서인가
        allowed = set(meta['access_tag']) & set(user_tags)   # 사용자 권한과 교집합
        if not opened and not allowed:            # 공개도 아니고 권한도 없으면
            continue                              # 검색 대상에서 제외(허용 vs 배제)
        if doc_type and meta['document_type'] != doc_type:   # 문서 타입 조건 불일치도
            continue                              # 제외
        out.append(c)                             # 조건 통과한 청크만 남김
    return out                                    # 남은 후보만 벡터 검색으로 넘긴다

print(len(visible_chunks(['all'])))               # 일반 사용자: 매뉴얼 1건만 보임
print(len(visible_chunks(['finance'], '보고서')))  # 재무 권한 + 보고서 필터: 1건`,note:"메타데이터는 doc_id 같은 식별자, page·section 같은 검색 근거, access_tag·document_type·updated_at 같은 필터링 필드의 세 층으로 설계한다. 특히 접근 권한은 답변을 만든 뒤가 아니라 검색 단계에서부터 체크해야 내부 정보 유출을 막을 수 있다는 것이 교재의 강조점이다."}],concepts:[{term:"RAG(검색 증강 생성)",desc:"LLM이 답하기 전에 외부 문서에서 관련 내용을 먼저 찾아와 참고하게 만드는 방식이다."},{term:"할루시네이션(환각)",desc:"LLM이 사실이 아닌 내용을 그럴듯하게 지어내는 현상을 말한다."},{term:"청킹(chunking)",desc:"긴 문서를 검색하기 좋게 작은 조각으로 나누는 작업이다."},{term:"임베딩(embedding)",desc:"문장을 의미가 담긴 숫자 벡터로 바꿔 컴퓨터가 의미를 비교할 수 있게 하는 기술이다."},{term:"벡터(vector)",desc:"여러 개의 숫자를 한 줄로 늘어놓은 것으로, 문장의 의미를 좌표처럼 나타낸다."},{term:"코사인 유사도",desc:"두 벡터가 가리키는 방향이 얼마나 비슷한지로 의미의 가까움을 재는 척도다."},{term:"벡터 DB(Vector DB)",desc:"수많은 임베딩 벡터를 저장하고 빠르게 비슷한 것을 찾아주는 데이터베이스다."},{term:"RAG를 언제 쓰나(RAG vs Fine-tuning vs Long-context)",desc:"최신·비공개 지식이 자주 바뀌고 출처를 대야 하면 RAG, 말투·형식·특정 도메인 정렬이 목적이면 파인튜닝, 참고할 문서가 소량·고정이면 그냥 긴 프롬프트(Long-context)에 넣는 것이 낫다. 셋은 배타적이지 않고 섞어 쓰며, 무조건 RAG가 아니라 문제 성격에 맞춰 고르는 것이 핵심이다."}],detail:{topics:[{h:"RAG가 해결하는 LLM의 약점",items:["학습 시점 이후의 최신 정보를 모르는 문제","회사 내부 문서 등 비공개 자료를 모르는 문제","모르는 것을 지어내는 환각 문제","답의 출처를 제시하지 못하는 신뢰성 문제"]},{h:"청킹 전략을 정하는 기준",items:["chunk_size: 너무 크면 검색이 뭉뚱그려지고 너무 작으면 문맥이 끊긴다","chunk_overlap: 조각 경계에서 문맥이 잘리지 않게 겹치는 양","문서 종류별 분할 기준(문단·문장·마크다운 헤더 등)","표·코드처럼 잘리면 안 되는 구조의 보존"]},{h:"임베딩과 벡터 검색의 구성요소",items:["임베딩 모델 선택(차원 수·다국어 지원·비용)","유사도 척도: 코사인 유사도와 내적","벡터 인덱스 저장소(Chroma·FAISS·pgvector)","검색 개수 k 와 결과 품질의 관계"]}],labs:[{title:"Lab 1 — 처음부터 개발환경 만들기",steps:["터미널에서 작업 폴더로 이동한 뒤 'python -m venv venv' 로 가상환경을 만든다.","'source venv/bin/activate' (윈도우는 venv\\Scripts\\activate)로 가상환경을 켠다.","'pip install langchain langchain-chroma langchain-community langchain-openai chromadb pypdf numpy' 로 라이브러리를 설치한다.",`'python -c "import langchain; print(langchain.__version__)"' 를 실행해 버전이 출력되면 설치 성공이다.`]},{title:"Lab 2 — 청킹 파라미터 바꿔 비교하기",steps:["예제2 코드를 파일로 저장한다.","chunk_size 를 100에서 300으로 바꿔 실행하고 조각 수가 줄어드는지 확인한다.","chunk_overlap 을 0으로 바꿔 실행하고 조각 경계의 문맥이 어떻게 끊기는지 첫 두 조각을 비교한다.","어떤 설정이 우리 문서에 적당한지 한 줄 메모로 남긴다."]},{title:"Lab 1-B — 첫 PDF를 실제로 로딩해 보기 (3교시 후반)",steps:["작업 폴더에 'docs' 폴더를 만들고 검색 대상 PDF 1개(예: 회사 규정집, 논문)를 그 안에 복사한다.","터미널에서 'export OPENAI_API_KEY=sk-...'(윈도우는 set)로 API 키를 환경변수에 넣는다.","PyPDFLoader('docs/파일명.pdf')로 로더를 만들고 .load()로 페이지 리스트를 받는다.","'print(len(pages))'로 전체 페이지 수를, 'print(pages[0].page_content[:200])'로 첫 페이지 앞부분을 출력해 실제 텍스트가 잘 읽혔는지 눈으로 확인한다.","pages[0].metadata를 출력해 source(파일명)와 page(쪽번호)가 자동으로 붙어 있는지 확인한다 — 이 메타데이터가 나중에 출처 인용의 재료가 된다."]}],homework:["자신이 자주 보는 PDF 1개를 골라 오늘 만든 indexing.py 로 인덱싱하고, 질문 3개를 던져 검색 결과를 캡처해 제출한다.","chunk_size 를 300/500/800 세 가지로 바꿔 같은 질문을 검색했을 때 결과가 어떻게 달라지는지 2~3문장으로 정리한다."]},theory:{theory:[{h:"RAG를 꼭 써야 할까? - 도입 판단 기준",body:`예전엔 모델 입력 길이가 짧아 외부 문서를 넣으려면 RAG가 거의 유일한 답이었다.
지금은 입력창(컨텍스트)이 크게 늘고 파인튜닝도 쉬워져, '이 문제에 정말 RAG가 맞나'를 먼저 따져야 한다.

세 갈래로 생각하면 쉽다.
(1) 자료가 자주 바뀌고 양이 많고 출처를 제시해야 한다 → RAG.
(2) 지식보다 말투·출력 형식·도메인 일관성을 바꾸고 싶다 → 파인튜닝.
(3) 참고 문서가 몇 장뿐이고 거의 안 바뀐다 → 그냥 프롬프트에 통째로 넣기(Long-context).

실무에선 파인튜닝으로 말투를 잡고 RAG로 최신 근거를 붙이는 식으로 함께 쓰는 경우가 많다.
이 판단을 건너뛰면 필요 없는 곳에 무거운 파이프라인을 까는 낭비가 생긴다.`},{h:"왜 LLM만으로는 부족하고 RAG가 필요한가",body:`LLM은 아주 똑똑한 사람이지만 시험장에 책을 못 들고 들어간 상태와 같다.
학습한 시점까지의 지식만 머릿속에 있어서, 우리 회사 내부 문서나 어제 바뀐 규정은 알지 못한다.
그래서 모르는 것을 물으면 솔직히 모른다고 하지 않고 그럴듯하게 지어내는데, 이것을 환각이라고 부른다.

RAG는 이 똑똑한 사람에게 시험 직전에 관련 페이지를 펼친 책을 손에 쥐여 주는 것과 같다.
질문이 들어오면 먼저 문서 더미에서 관련 내용을 검색해 찾아오고, 그 내용을 함께 보여주며 답하게 한다.
이렇게 하면 최신 정보와 우리만의 자료를 근거로 답할 수 있고, 출처까지 제시할 수 있어 신뢰도가 크게 올라간다.`},{h:"RAG 파이프라인의 두 단계: 미리 준비하기와 실시간 답하기",body:`RAG는 크게 두 시점으로 나뉜다.
첫째는 미리 준비하는 단계로, 문서를 불러와(로딩) 작은 조각으로 자르고(청킹) 숫자 벡터로 바꿔(임베딩) 벡터 DB에 저장(색인)하는 과정이다.
이 단계는 식당이 영업 전에 재료를 손질해 냉장고에 정리해 두는 것과 같다.

둘째는 실시간으로 답하는 단계로, 사용자의 질문이 들어오면 그 질문을 벡터로 바꿔 가장 비슷한 조각들을 찾고(검색), 찾은 조각을 질문과 함께 LLM에게 건네 답을 만든다(생성).
오늘은 이 중 첫째 단계인 준비하기, 즉 인덱싱에 집중한다.
준비가 잘 되어 있어야 둘째 날의 검색과 생성이 정확해지기 때문이다.`},{h:"청킹 전략 — 문서를 어떻게 잘라야 검색이 잘 되나",body:`청킹은 RAG에서 눈에 잘 안 띄지만 성능을 가장 크게 좌우하는 단계다.
검색은 '조각' 단위로 이뤄지기 때문에, 어떻게 자르느냐가 곧 무엇이 검색되느냐를 결정한다.
조각이 너무 크면 한 조각에 여러 주제가 섞여 검색이 뭉뚱그려지고, 정작 필요한 문장이 관련 없는 문장에 묻힌다.
반대로 너무 작으면 문장이 토막 나 문맥이 끊기고, '그것', '이 규정' 같은 지시어가 무엇을 가리키는지 사라진다.

그래서 두 개의 손잡이만 기억하면 된다. chunk_size(한 조각의 최대 길이)와 chunk_overlap(옆 조각과 겹치는 양)이다.
overlap은 조각 경계에서 문장이 반 토막 나는 것을 막아 주는 안전장치로, 보통 chunk_size의 10~20% 정도를 준다.
또 하나 중요한 것은 '어디서 자르는가'다. RecursiveCharacterTextSplitter는 문단 → 줄 → 문장 → 단어 순으로 자연스러운 경계를 우선해 자르기 때문에, 무작정 글자 수로 끊는 것보다 문맥이 덜 깨진다.

실무 감각으로는, 일반 산문은 300~800자에서 시작해 보고, 표·코드·조항처럼 구조가 있는 문서는 그 구조(마크다운 헤더, 조 단위)를 살려 자르는 것이 좋다.
정답은 없고 문서 종류마다 다르므로, 바로 이어지는 실습에서 숫자를 바꿔 가며 조각 수와 검색 결과가 어떻게 달라지는지 직접 눈으로 확인하는 것이 이 시간의 핵심이다.`},{h:"임베딩 — 문장의 의미를 좌표로 바꾸기",body:`컴퓨터는 '강아지'와 '개'가 비슷한 말이라는 걸 글자만 봐서는 모른다. 글자가 완전히 다르기 때문이다.
임베딩은 이 문제를 푸는 기술로, 문장을 수백~수천 개의 숫자로 이뤄진 벡터(좌표)로 바꿔 준다.
핵심은 '의미가 비슷한 문장은 좌표도 가깝게' 배치된다는 점이다. 그래서 '강아지가 뛴다'와 '개가 달린다'는 공간에서 서로 가까이 놓이고, '주식이 폭락했다'는 멀리 떨어진다.

두 좌표가 얼마나 가까운지를 재는 대표적인 자가 코사인 유사도다.
두 벡터가 가리키는 '방향'이 얼마나 같은지를 보는 것으로, 1에 가까우면 의미가 비슷하고 0에 가까우면 상관없다는 뜻이다.
RAG의 검색은 결국 '질문 벡터와 방향이 가장 비슷한 조각 벡터들'을 찾는 일이다.

임베딩 모델을 고를 때는 세 가지를 본다. 차원 수(표현력과 저장 비용의 균형), 다국어 지원(한국어 문서라면 필수), 그리고 호출 비용이다.
한 가지 반드시 지킬 규칙은, 색인할 때 쓴 임베딩 모델과 검색할 때 쓰는 모델이 같아야 한다는 것이다. 좌표계가 다르면 거리를 비교하는 것 자체가 무의미해지기 때문이다.
이어지는 실습에서 두 문장의 코사인 유사도를 직접 계산해 보며, 의미가 숫자로 어떻게 드러나는지 체감한다.`},{h:"벡터 색인과 유사도 검색 — 수만 조각에서 순식간에 찾기",body:`조각을 모두 벡터로 바꿨다면, 이제 질문이 들어올 때마다 '가장 비슷한 조각'을 빠르게 찾아내야 한다.
조각이 몇 개뿐이면 전부와 하나하나 거리를 재도 되지만, 수만·수십만 개가 되면 매번 전수 비교는 너무 느리다.
그래서 벡터 DB는 미리 벡터들을 똑똑하게 정리(색인)해 두고, 근사 최근접 탐색(ANN)이라는 방법으로 '거의 가장 가까운' 것들을 순식간에 찾아 준다. 약간의 정확도를 내주고 속도를 크게 얻는 거래인 셈이다.

검색할 때 우리가 정하는 숫자가 k다. '가장 비슷한 것 몇 개를 가져올까'인데, 작으면 정답 조각을 놓칠 수 있고 크면 관련 없는 조각까지 딸려 온다. 보통 3~5에서 시작한다.
거리를 재는 방식은 코사인 유사도나 내적을 주로 쓰고, 대부분의 벡터 DB가 기본값으로 알아서 처리해 준다.

저장소는 목적에 따라 고른다. Chroma는 설치가 간단해 학습·프로토타입에 좋고, FAISS는 로컬에서 아주 빠르며, pgvector는 기존 PostgreSQL에 벡터 검색을 얹고 싶을 때 쓴다.
오늘 마지막 실습에서는 Chroma에 조각을 색인하고 similarity_search로 질문을 던져, 관련 조각이 실제로 위로 올라오는지 확인하며 인덱싱 파이프라인을 완성한다. 여기까지가 '미리 준비하기' 단계의 끝이고, 내일은 이 인덱스 위에서 검색과 생성을 다룬다.`}]},realCodes:[{title:"PDF 문서를 벡터 인덱스로 만드는 엔드투엔드 인덱싱 스크립트",lang:"python",code:`# 필요한 라이브러리들을 불러온다(설치: pip install langchain langchain-chroma langchain-community langchain-openai chromadb pypdf)
from langchain_community.document_loaders import PyPDFLoader  # PDF 파일을 읽어 문서 객체로 만들어 주는 도구
from langchain_text_splitters import RecursiveCharacterTextSplitter  # 긴 글을 똑똑하게 잘라 주는 도구
from langchain_openai import OpenAIEmbeddings  # 문장을 숫자 벡터로 바꿔 주는 OpenAI 임베딩 모델
from langchain_chroma import Chroma  # 벡터를 저장하고 검색해 주는 가벼운 벡터 DB

# 1) 문서 로딩: docs 폴더의 PDF 파일 경로를 지정해 로더를 만든다
loader = PyPDFLoader("docs/company_policy.pdf")  # 괄호 안 인자는 읽어올 PDF의 파일 경로
pages = loader.load()  # 실제로 PDF를 읽어 페이지별 문서 리스트로 반환
print(f"총 {len(pages)}페이지 로드")  # 결과: 총 12페이지 로드

# 2) 청킹: 한 조각 500자, 조각끼리 50자 겹치게 설정해 분할기를 만든다
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,    # 한 조각의 최대 글자 수(너무 크면 검색이 뭉뚱그려진다)
    chunk_overlap=50,  # 앞뒤 조각이 50자 겹치게 해 문맥이 끊기지 않도록 한다
)
chunks = splitter.split_documents(pages)  # 페이지들을 받아 작은 조각 리스트로 자른다
print(f"조각 {len(chunks)}개 생성")  # 결과: 조각 37개 생성

# 3) 임베딩 + 색인: 각 조각을 벡터로 바꿔 Chroma DB에 저장한다
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")  # 사용할 임베딩 모델 이름 지정
vectordb = Chroma.from_documents(
    documents=chunks,                 # 벡터로 만들 문서 조각들
    embedding=embeddings,             # 변환에 쓸 임베딩 모델
    persist_directory="chroma_db",    # 벡터를 디스크에 저장할 폴더 이름
)
print("인덱싱 완료, chroma_db 폴더에 저장됨")  # 결과: 인덱싱 완료, chroma_db 폴더에 저장됨

# 4) 확인: 저장된 인덱스에 질문을 던져 비슷한 조각 3개를 찾아본다
results = vectordb.similarity_search("환불 규정은 어떻게 되나요?", k=3)  # k=3은 가장 가까운 3개를 의미
for i, doc in enumerate(results, start=1):  # 찾은 조각을 1번부터 번호 매겨 반복
    print(f"[{i}] {doc.page_content[:80]}")  # 각 조각의 앞 80자만 미리보기로 출력`,note:`PDF 한 개를 로딩→청킹→임베딩→색인까지 한 번에 처리하는 RAG 준비 단계의 완성형 코드다.
similarity_search 결과가 질문과 관련 있으면 인덱싱이 잘 된 것이다.`},{title:"실전: 멀티 포맷 로더 + 메타데이터 청킹",lang:"python",code:`from pathlib import Path
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
print(f"{len(chunks)}개 청크 (출처 메타 포함)")  # 검색 결과에 출처 표기 가능`,note:"확장자별 로더를 매핑해 PDF·TXT·MD를 일괄 적재하고, source/doc_type 메타데이터를 붙여 답변에 출처·필터를 활용한다."}],periods:["1교시 RAG가 왜 필요한가: LLM의 한계와 검색 증강의 직관","2교시 RAG 전체 파이프라인 한눈에 보기(적재→청킹→임베딩→색인→검색→생성)","3교시 [실습] 개발환경 셋업과 첫 문서 로딩","4교시 청킹(chunking) 전략: 문서를 어떻게 잘라야 하나","5교시 [실습] 청킹 파라미터 바꿔가며 비교하기","6교시 임베딩(embedding)과 벡터 공간의 이해","7교시 벡터 색인과 유사도 검색 기초","8교시 [실습] 문서 인덱싱 파이프라인 완성하기"]},"rag-2":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 어제 인덱스 복습과 Retriever의 역할, top-k·재순위 개요"},{time:"10:00–10:50",topic:"2교시 하이브리드 검색(키워드 BM25 + 벡터)과 재순위(Re-ranking)"},{time:"11:00–11:50",topic:"3교시 [실습] 하이브리드 + Reranker로 검색 품질 높이기"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 고급 리트리버: ParentDocumentRetriever·MultiQueryRetriever"},{time:"14:00–14:50",topic:"5교시 고급 리트리버: EnsembleRetriever·LongContextReorder"},{time:"15:00–15:50",topic:"6교시 SemanticChunker와 청킹 전략 심화"},{time:"16:00–16:50",topic:"7교시 [실습] 고급 리트리버로 질의응답(QA) 체인 완성"},{time:"17:00–17:50",topic:"8교시 [실습] 출처 인용 RAG 챗봇으로 마무리"}],practice:{title:"고급 리트리버(하이브리드+재순위)로 검색 품질을 높인 출처 인용 QA 체인 구축",steps:["1일차에 만든 'chroma_db' 폴더를 그대로 불러와 Chroma 객체로 다시 연다.","기본 리트리버(k=4)로 '연차 휴가는 며칠인가요?' 를 검색해 가져온 조각의 출처를 출력해 본다(기준선).","BM25Retriever(키워드)와 벡터 리트리버를 EnsembleRetriever로 묶어(가중치 0.5:0.5) 하이브리드 검색을 만든다.","(선택) CrossEncoder 또는 Cohere Rerank로 후보를 재순위해 상위 몇 개만 남긴다.","MultiQueryRetriever로 같은 질문을 여러 표현으로 바꿔 검색되는 문서가 늘어나는지 비교한다.","ChatPromptTemplate로 '아래 컨텍스트만 근거로 답하고 모르면 모른다'는 프롬프트를 만든다.","리트리버 | 프롬프트 | 모델을 LCEL 파이프(|)로 연결해 체인을 만들고 질문해 답과 출처를 함께 출력한다.","문서에 없는 질문(예: '대표이사 생일은?')을 던져 '모른다'고 답하는지 확인한다.","기본 리트리버와 고급(하이브리드+재순위) 리트리버의 답 품질을 눈으로 비교해 한 줄로 메모한다.","코드를 'qa_chain.py' 로 저장한다."],deliverable:"qa_chain.py(하이브리드+재순위) + 기본 vs 고급 리트리버 답변 비교 메모 + 출처 표기 캡처"}},examples:[{title:"리트리버로 관련 조각만 빠르게 가져오기",lang:"python",code:`from langchain_chroma import Chroma  # 벡터 DB 불러오기
from langchain_openai import OpenAIEmbeddings  # 임베딩 모델

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")  # 색인 때와 같은 모델
vectordb = Chroma(persist_directory="chroma_db", embedding_function=embeddings)  # 저장 폴더 로드
retriever = vectordb.as_retriever(search_kwargs={"k": 3})  # 상위 3개만 가져오는 리트리버

docs = retriever.invoke("환불은 며칠 안에 가능한가요?")  # 질문을 넣어 관련 조각을 가져온다
print(f"가져온 조각 수: {len(docs)}")  # 결과: 가져온 조각 수: 3
print(docs[0].page_content[:60])  # 결과: 첫 조각의 앞 60자가 출력됨`,note:"k 값을 바꾸면 가져오는 조각 수가 그대로 바뀌는 것을 확인한다."},{title:"키워드(BM25)와 벡터를 합친 하이브리드 검색",lang:"python",code:`from langchain_community.retrievers import BM25Retriever  # 키워드 기반 검색기
# (EnsembleRetriever는 langchain 1.0에서 langchain_classic으로 이동 — 실제 사용 시 그 경로로 import)
from langchain_core.documents import Document  # 문서 조각 객체

docs = [Document(page_content=t) for t in [  # 간단한 예시 문서 3개를 만든다
    "환불은 구매 후 7일 이내 가능합니다",
    "배송은 보통 2~3일 걸립니다",
    "회원 등급은 구매액에 따라 정해집니다",
]]
bm25 = BM25Retriever.from_documents(docs)  # 단어가 겹치는지로 찾는 키워드 검색기 생성
bm25.k = 2  # 상위 2개만 반환하도록 설정
# 실제로는 벡터 리트리버와 EnsembleRetriever([bm25, vector], weights=[0.5,0.5])로 합친다
print(bm25.invoke("환불")[0].page_content)  # 결과: 환불은 구매 후 7일 이내 가능합니다`,note:"키워드 검색은 정확한 단어 일치에 강해 벡터 검색의 약점을 보완한다."},{title:"고급 리트리버 3종을 실제로 엮어 보기 (MultiQuery · Ensemble · LongContextReorder)",lang:"python",code:`# 어제 만든 인덱스에 고급 리트리버를 층층이 얹어 검색 품질을 끌어올린다
from langchain_chroma import Chroma  # 벡터 DB
from langchain_openai import OpenAIEmbeddings, ChatOpenAI  # 임베딩 모델과 LLM
from langchain_community.retrievers import BM25Retriever  # 키워드 검색기
from langchain.retrievers.multi_query import MultiQueryRetriever  # 질문을 여러 표현으로 바꿔 검색
from langchain_community.document_transformers import LongContextReorder  # 중요 문서를 앞뒤로 재배치
# (EnsembleRetriever는 langchain 1.0에서 langchain_classic 으로 이동 - 실제 사용 시 그 경로로 import)
from langchain_classic.retrievers import EnsembleRetriever

# 1) 어제 저장한 인덱스를 같은 임베딩 모델로 연다
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vectordb = Chroma(persist_directory="chroma_db", embedding_function=embeddings)
vector_ret = vectordb.as_retriever(search_kwargs={"k": 4})  # 의미 기반 검색기

# 2) 같은 조각들로 키워드 검색기(BM25)도 만든다
all_docs = vectordb.similarity_search("", k=1000)  # 색인된 조각을 넉넉히 가져와
bm25 = BM25Retriever.from_documents(all_docs)  # 단어 일치로 찾는 검색기 생성
bm25.k = 4  # 상위 4개 반환

# 3) 두 검색기를 EnsembleRetriever로 묶는다(가중치 절반씩)
ensemble = EnsembleRetriever(retrievers=[bm25, vector_ret], weights=[0.5, 0.5])

# 4) 그 위에 MultiQuery를 얹어 질문을 여러 표현으로 바꿔 검색한다
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
multi = MultiQueryRetriever.from_llm(retriever=ensemble, llm=llm)

# 5) 실제로 검색하고, 마지막에 LongContextReorder로 순서를 다듬는다
docs = multi.invoke("연차 휴가는 며칠인가요?")  # 여러 표현으로 검색해 합친 결과
reordered = LongContextReorder().transform_documents(docs)  # 중요 문서를 앞뒤로 재배치
print(f"최종 문서 수: {len(reordered)}")  # 결과: 예 6
for i, d in enumerate(reordered, 1):  # 순서대로 미리보기
    print(f"[{i}] {d.page_content[:50]}")`,note:"기본 벡터 검색 -> 키워드와 합치기(Ensemble) -> 표현 늘리기(MultiQuery) -> 순서 다듬기(Reorder)로 층층이 쌓는 흐름을 한 파일에서 확인한다. 각 층을 하나씩 빼 보며 결과가 어떻게 달라지는지 비교하면 어떤 층이 우리 문서에 효과적인지 감이 잡힌다."},{title:"Cross-Encoder 재순위(Re-ranking)",lang:"python",code:`from sentence_transformers import CrossEncoder

# 1차: 벡터검색으로 후보 20개를 빠르게 회수(recall 확보)
candidates = retriever.invoke(query)[:20]

# 2차: cross-encoder로 (질문, 문서) 쌍을 정밀 채점 → 상위 4개만 사용
reranker = CrossEncoder("BAAI/bge-reranker-base")
scored = reranker.predict([(query, c.page_content) for c in candidates])
top = [c for _, c in sorted(zip(scored, candidates), reverse=True)][:4]`,note:"벡터검색(빠름·recall) → 크로스인코더(느림·정밀)의 2단계가 RAG 품질을 크게 끌어올린다."},{title:"BM25 키워드 검색 - Dense가 놓치는 에러코드를 잡는다(bm25s)",lang:"python",code:`# pip install bm25s
# 'PostgreSQL 42P01' 같은 정확한 키워드는 의미검색(Dense)이 자주 실패한다
import bm25s

corpus = [                                            # 검색 대상 문서들
    'PostgreSQL 17.2 릴리즈 노트와 신규 기능',
    '데이터베이스 기초 개념 가이드',
    '오류 코드 42P01 테이블 없음 해결 방법',
]
tokens = bm25s.tokenize(corpus)                       # 문서를 단어 단위로 쪼갠다(토큰화)
retriever = bm25s.BM25()                              # BM25 인덱스 객체 생성
retriever.index(tokens)                               # 통계(단어 빈도·희소성) 기반 색인 구축(학습 불필요)

query = bm25s.tokenize('42P01 오류')                   # 질의도 같은 방식으로 토큰화
results, scores = retriever.retrieve(query, k=2)      # 키워드가 일치하는 상위 2개 문서
for i in range(results.shape[1]):                     # 결과를 순서대로 출력
    idx = results[0, i]                               # 문서 번호
    print(round(float(scores[0, i]), 2), corpus[idx]) # 42P01 문서가 1위로 나온다`,note:"BM25는 40년 검증된 키워드 검색으로 학습이 필요 없다. 희귀한 단어(42P01)가 문서에 많이 나올수록 점수가 높아, Dense가 놓치는 버전번호·에러코드·고유명사를 정확히 잡는다."},{title:"RRF로 Dense와 BM25 두 순위를 안전하게 합치기(k=60)",lang:"python",code:`# 두 검색기의 점수는 스케일이 달라 그냥 더하면 안 된다 -> 순위(rank)만으로 합친다
def rrf_fusion(dense_ids, bm25_ids, k=60, top_n=5):   # k=60은 검증된 표준 상수
    scores = {}                                       # 문서번호 -> 합산 점수
    for rank, doc_id in enumerate(dense_ids):         # Dense 결과를 1위부터 순회
        scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank + 1)  # 순위가 앞설수록 큰 점수
    for rank, doc_id in enumerate(bm25_ids):          # BM25 결과도 같은 방식으로 더한다
        scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank + 1)
    ranked = sorted(scores.items(), key=lambda x: x[1], reverse=True)  # 합산 점수 내림차순
    return ranked[:top_n]                             # 최종 Top-N 반환

dense = [10, 3, 7, 1, 5]                              # Dense(의미) 검색의 상위 문서 순서(예시)
bm25 = [7, 10, 2, 3, 9]                               # BM25(키워드) 검색의 상위 문서 순서(예시)
final = rrf_fusion(dense, bm25)                       # 두 순위를 RRF로 융합
print('Hybrid 최종 순위:', final)                      # 양쪽에서 모두 상위였던 7·10번이 앞으로 온다`,note:"RRF(Reciprocal Rank Fusion)는 점수가 아니라 순위만 사용해 두 검색기를 합친다. 스케일이 달라도 안전하며 k=60은 거의 바꿀 필요가 없는 표준값이다."},{title:"BGE-Reranker로 최종 재정렬 - 느리지만 정밀한 Cross-Encoder",lang:"python",code:`# pip install FlagEmbedding
# Hybrid로 Top-50을 빠르게 추린 뒤, 질문+문서를 함께 넣어 정밀 채점한다
from FlagEmbedding import FlagReranker

reranker = FlagReranker('BAAI/bge-reranker-v2-m3', use_fp16=True)  # 다국어(한국어) 리랭커, CPU도 동작

query = 'HNSW 인덱스와 IVF의 메모리 사용 차이'          # 사용자 질문
candidates = [                                        # Hybrid 검색이 넘겨준 후보 문서들
    'FAISS 라이브러리 소개',
    'HNSW 구조와 메모리 사용량 설명',
    'IVF 클러스터 기반 검색 원리',
]
pairs = [[query, doc] for doc in candidates]          # (질문, 문서) 쌍으로 묶는다
scores = reranker.compute_score(pairs, normalize=True)  # 0~1 관련도 점수로 정밀 채점

ranked = sorted(zip(scores, candidates), reverse=True)  # 점수 높은 순으로 재정렬
for score, doc in ranked:                             # 관련 있는 문서가 위로 올라온다
    print(round(score, 3), doc)                       # HNSW·IVF 문서가 상위, 무관한 소개글이 하위`,note:"Bi-Encoder(벡터검색)는 빠르지만 질문-문서 상호작용을 못 본다. Cross-Encoder인 BGE-Reranker는 둘을 함께 입력해 정밀하게 채점한다. 느려서 전체 DB엔 못 쓰고 Top-50에만 적용한다."},{title:"MMR 직접 구현 - 관련성과 다양성 사이를 λ로 조절",lang:"python",code:`import numpy as np                              # 수치 계산

np.random.seed(0)                               # 결과 재현용 시드
query = np.random.randn(8)                      # 질문 벡터(8차원 연습)
docs = np.random.randn(6, 8)                    # 후보 문서 6개

def cos(a, b):                                  # 코사인 유사도
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-12))

def mmr(query, docs, k=3, lam=0.5):             # lam=1 관련성만, lam=0 다양성만
    selected = []                               # 뽑힌 문서 번호
    rest = list(range(len(docs)))               # 아직 남은 후보
    while len(selected) < k and rest:           # k개 뽑을 때까지 반복
        best, best_score = None, -1e9           # 이번 라운드 최고 후보
        for i in rest:                          # 남은 후보마다
            rel = cos(query, docs[i])           # 쿼리와의 관련성
            red = max((cos(docs[i], docs[j]) for j in selected), default=0)  # 기존 선택과의 중복도
            score = lam * rel - (1 - lam) * red # MMR 점수 = 관련성 - 중복 벌점
            if score > best_score:              # 더 좋은 후보를 찾으면
                best, best_score = i, score     # 갱신
        selected.append(best)                   # 최고 후보 확정
        rest.remove(best)                       # 후보군에서 제거
    return selected                             # 관련 있으면서 서로 다른 k개

print('lam=1.0(유사도만):', mmr(query, docs, lam=1.0))   # 단순 Top-k와 같아짐
print('lam=0.5(균형)  :', mmr(query, docs, lam=0.5))     # 중복을 피해 고른 결과`,note:"코사인 Top-k는 서로 거의 같은 문서만 몰려 나와 새로 더해 주는 가치가 0에 가까울 수 있다. MMR은 쿼리와 가까우면서 이미 뽑힌 문서와는 먼 후보에 높은 점수를 줘, 여러 관점을 모아야 하는 질의에 유리하다. λ가 1이면 유사성만, 0이면 다양성만 보게 되어 중간값으로 균형을 잡는다."},{title:"RAG 체인 조립 - retriever | prompt | llm 파이프라인",lang:"python",code:`from langchain_core.prompts import PromptTemplate          # 프롬프트 틀
from langchain_openai import ChatOpenAI                    # 답변 생성 LLM
from langchain_core.output_parsers import StrOutputParser  # 답변 텍스트만 뽑는 파서
from langchain_core.runnables import RunnablePassthrough   # 입력을 그대로 통과

prompt = PromptTemplate.from_template(          # RAG 표준 프롬프트: 지시 + 질문 + 문맥
    '당신은 질문-답변 작업을 수행하는 AI 어시스턴트입니다.\\n'
    '검색된 문맥(context)을 사용하여 질문(question)에 답하세요.\\n'
    '문맥에서 답을 찾을 수 없다면 모른다고 말하세요. 한국어로 답하세요.\\n\\n'
    '# Question:\\n{question}\\n\\n# Context:\\n{context}\\n\\n# Answer:'
)
llm = ChatOpenAI(model='gpt-4o-mini', temperature=0)   # 사실 위주 답변이라 온도 0
# retriever = vectorstore.as_retriever()               # 앞 실습에서 만든 검색기 재사용

chain = (                                      # LCEL 파이프라인 조립
    {'context': retriever,                     # 질문 -> 리트리버가 문맥을 검색해 채움
     'question': RunnablePassthrough()}        # 질문은 가공 없이 그대로 전달
    | prompt                                   # 문맥+질문을 프롬프트에 채우고
    | llm                                      # LLM이 답변을 생성한 뒤
    | StrOutputParser()                        # 텍스트만 추출
)
print(chain.invoke('RAG의 전처리 단계는 무엇인가요?'))   # 체인 한 번에 실행`,note:"Document Loader부터 Retriever까지 만든 부품을 파이프(|) 연산자 하나로 잇는 Chain 단계다. 프롬프트는 지시사항·질문·문맥의 3부 구성이 표준이며, 문맥에 없으면 모른다고 답하라는 지시가 환각을 줄이는 핵심 문구다. 검색 결과(chunk)가 context 자리에 자동으로 채워진다."},{title:"요약 기반 검색 - 요약으로 찾고 원문으로 답한다",lang:"python",code:`# 긴 원문 대신 짧은 요약을 임베딩해 검색 속도와 관련도를 높이는 전략
docs = [                                        # 원문과 요약을 쌍으로 저장
    {'id': 0, 'raw': '3분기 매출은 전년 대비 12% 증가했으며 원인은... (긴 본문)',
     'summary': '3분기 매출 12% 증가와 원인 분석'},                 # 검색용 요약
    {'id': 1, 'raw': '신규 채용 절차는 서류, 코딩테스트, 면접 순이며... (긴 본문)',
     'summary': '신규 채용 3단계 절차 안내'},                       # 검색용 요약
]

from langchain_openai import OpenAIEmbeddings   # 임베딩 모델
import numpy as np                              # 유사도 계산
emb = OpenAIEmbeddings()                        # 요약문 임베딩에 사용

vecs = np.array(emb.embed_documents([d['summary'] for d in docs]))  # 요약만 임베딩
q = np.array(emb.embed_query('채용 절차가 어떻게 되나요?'))           # 질문 임베딩

scores = vecs @ q / (np.linalg.norm(vecs, axis=1) * np.linalg.norm(q))  # 코사인 유사도
best = int(np.argmax(scores))                   # 요약 기준으로 1등 문서 선택
print('검색은 요약으로 :', docs[best]['summary'])  # 짧고 핵심적인 요약이 검색 대상
print('LLM에는 원문 전달:', docs[best]['raw'])     # 답변 생성에는 풍부한 원문 사용`,note:"벡터 저장 전에 LLM으로 요약을 만들어 두고, 검색은 요약으로 하되 답변 생성에는 원문(또는 원문+요약)을 쓰는 교재의 요약 기반 검색 전략이다. Parent-Child가 조각 크기로 검색과 전달을 나눈다면, 이 방식은 정보 밀도로 나눈다. 문서가 길면 Map-Reduce·Refine 요약과 결합하고, 요약 품질을 높이려면 Chain of Density를 검토한다."}],concepts:[{term:"리트리버(Retriever)",desc:"질문을 받아 벡터 DB에서 관련 조각을 찾아오는 검색 담당 부품으로, top-k(상위 k개)만 골라 온다."},{term:"하이브리드 검색 + 재순위(Re-ranking)",desc:"키워드(BM25)와 벡터 검색을 함께 쓴 뒤, 넉넉히 가져온 후보를 Reranker 모델로 다시 정렬해 진짜 좋은 것을 위로 올린다."},{term:"ParentDocumentRetriever",desc:"검색은 작은 조각으로 정확히 하되, 답에는 그 조각이 속한 넓은 원문(부모 문서)을 돌려줘 맥락을 살리는 리트리버다."},{term:"MultiQueryRetriever",desc:"하나의 질문을 여러 표현으로 바꿔 각각 검색한 뒤 결과를 합쳐, 표현 차이로 놓치는 문서를 줄이는 리트리버다."},{term:"EnsembleRetriever",desc:"키워드·벡터 등 여러 리트리버의 결과를 가중치로 합산해 하나로 묶는 리트리버다."},{term:"LongContextReorder",desc:"긴 맥락에서 중요한 문서를 맨 앞뒤로 재배치하는 기법으로, 모델이 가운데 내용을 놓치는 'lost in the middle' 문제를 줄인다."},{term:"SemanticChunker",desc:"글자 수가 아니라 '의미가 바뀌는 지점'에서 문서를 잘라, 한 조각이 하나의 주제를 담게 하는 청킹 방식이다."}],detail:{topics:[{h:"고급 리트리버 5종",items:["ParentDocumentRetriever: 작은 조각으로 검색, 넓은 원문 반환","MultiQueryRetriever: 질문을 여러 표현으로 바꿔 검색","EnsembleRetriever: 키워드·벡터 결과를 가중 합산","LongContextReorder: 중요 문서를 앞뒤로 재배치","SemanticChunker: 의미가 바뀌는 지점에서 청킹"]},{h:"검색 품질을 높이는 기법",items:["하이브리드 검색(BM25 + 벡터)","재순위(Re-ranking): Cross-Encoder · Cohere Rerank","top-k·score_threshold 튜닝, mmr로 다양성 확보","질문 재작성(query rewriting)"]},{h:"답변 생성 프롬프트 설계",items:["컨텍스트만 근거로 답하라는 제약","근거 없으면 '모른다'고 답하게 하는 안전장치","출처(파일·페이지) 함께 표기하기","답변 형식·길이·말투 지정"]}],labs:[{title:"Lab 1 — 리트리버 동작 눈으로 확인하기",steps:["예제1 코드를 파일로 저장하고 실행한다.","k 값을 3에서 1로 바꿔 실행하고 가져온 조각 수가 1개로 주는지 확인한다.","질문을 우리 문서와 무관한 내용(예: '날씨 어때')으로 바꿔 보고 어떤 조각이 오는지 관찰한다.","관찰 결과를 한 줄로 메모한다."]},{title:"Lab 2 — '모른다'고 답하게 만들기",steps:["실전 코드의 QA 체인을 실행한다.","문서에 분명히 있는 질문을 던져 정상 답변과 출처가 나오는지 확인한다.","문서에 없는 질문을 던져 '모른다'고 답하는지 확인한다.","만약 지어낸 답이 나오면 프롬프트의 '근거 없으면 모른다' 문장을 더 강하게 고쳐 다시 시험한다."]}],homework:["어제 인덱싱한 자신의 문서로 QA 체인을 만들어, 정상 질문 2개와 문서에 없는 질문 1개를 던진 결과를 캡처해 제출한다.","k 값을 2와 6으로 바꿔 같은 질문을 했을 때 답변 품질이 어떻게 달라지는지 2~3문장으로 정리한다."]},theory:{theory:[{h:"검색이 답의 품질을 좌우한다",body:`RAG에서 LLM은 요리사이고 검색은 장보기와 같다.
아무리 솜씨 좋은 요리사라도 잘못된 재료를 받으면 좋은 요리를 낼 수 없다.
즉 리트리버가 질문과 동떨어진 조각을 가져오면, LLM은 그 잘못된 내용을 근거로 엉뚱한 답을 만든다.

그래서 가져올 개수 k를 적절히 정하는 일이 중요하다.
k가 너무 작으면 정답이 든 조각을 놓치고, 너무 크면 관련 없는 내용까지 섞여 답이 흐려진다.
보통 3에서 5 사이로 시작해 결과를 보며 조정하고, 의미 검색만으로 약할 때는 키워드 검색을 더하는 하이브리드 방식을 쓴다.`},{h:"재순위와 출처 인용으로 신뢰를 더한다",body:`재순위는 면접에 비유할 수 있다.
서류로 후보를 넉넉히 20명 추린 뒤, 면접으로 다시 점수를 매겨 상위 4명만 뽑는 것과 같다.
벡터 검색으로 빠르게 후보를 많이 가져온 다음, 더 정교한 재순위 모델로 다시 줄을 세우면 진짜 관련 높은 조각이 위로 온다.

마지막으로 답을 만들 때는 가져온 조각만 근거로 삼게 하고, 근거가 없으면 솔직히 모른다고 답하도록 프롬프트로 못을 박는다.
그리고 어떤 문서의 몇 페이지를 봤는지 출처를 함께 보여 주면, 사용자가 답을 직접 검증할 수 있어 신뢰가 크게 올라간다.
이 출처 인용은 실무에서 RAG를 도입하는 가장 큰 이유 중 하나다.`},{h:"고급 리트리버 (1) — ParentDocumentRetriever와 MultiQueryRetriever",body:`기본 리트리버는 '자른 조각 그대로 검색해서 그 조각을 돌려주는' 단순한 방식이다. 여기엔 딜레마가 하나 있다.
검색 정확도를 높이려면 조각을 잘게 잘라야 하는데, 조각이 작으면 답에 필요한 앞뒤 맥락이 잘려 나간다.
ParentDocumentRetriever는 이 딜레마를 우아하게 푼다. 검색은 '작은 자식 조각'으로 정확히 하되, LLM에게 넘길 때는 그 조각이 속한 '넓은 부모 문서'를 돌려준다. 정확도와 맥락을 동시에 챙기는 셈이다.
예를 들어 한 문장으로 정확히 검색은 되지만, 답할 때는 그 문장이 든 문단이나 절 전체를 근거로 주는 식이다.

MultiQueryRetriever는 다른 약점을 노린다. 사용자가 쓴 질문 표현과 문서 속 표현이 다르면, 의미가 같아도 검색이 빗나갈 수 있다.
그래서 LLM을 시켜 원래 질문을 서너 개의 다른 표현으로 바꾼 뒤, 각각으로 검색하고 결과를 합친다.
'연차 며칠?'을 '연차 휴가 일수는', '유급 휴가 규정은'처럼 바꿔 검색하니, 표현 차이로 놓치던 문서까지 건져 올린다. 대신 LLM 호출이 늘어 약간 느리고 비용이 든다는 점은 감안해야 한다.

두 리트리버는 성격이 달라 상황에 맞게 고르거나 함께 쓴다. 맥락이 중요한 긴 문서라면 Parent, 사용자의 질문 표현이 들쭉날쭉하면 MultiQuery가 잘 맞는다. 다음 시간에는 여러 리트리버를 아예 하나로 묶는 법을 배운다.`},{h:"고급 리트리버 (2) — EnsembleRetriever와 LongContextReorder",body:`검색 방식은 저마다 강점이 다르다. 키워드 검색(BM25)은 '정확히 그 단어'가 든 문서를 잘 찾고, 벡터 검색은 단어가 달라도 '의미가 비슷한' 문서를 잘 찾는다.
EnsembleRetriever는 이 둘을 한 팀으로 묶는 도구다. 각 리트리버의 결과에 가중치를 주고, RRF(순위를 합치는 방식)로 하나의 순위표로 재정렬한다.
덕분에 고유명사·모델명·코드처럼 정확한 단어가 중요한 질문과, 뜻으로 찾아야 하는 질문 모두에서 안정적으로 좋은 결과를 낸다. 가중치는 보통 0.5:0.5에서 시작해 문서 성격에 맞춰 조정한다.

LongContextReorder는 결이 조금 다른, 검색 이후의 정리 기법이다.
LLM은 여러 문서를 한꺼번에 받으면 '가운데'에 놓인 내용을 잘 놓치는 경향이 있다(lost in the middle 현상).
그래서 가장 관련 높은 문서를 맨 앞과 맨 뒤로 재배치하고, 덜 중요한 것을 가운데로 몰아넣는다. 같은 문서를 주더라도 순서만 바꿔 모델이 핵심을 더 잘 보게 만드는 것이다.
검색 결과가 많을수록 이 재배치의 효과가 커진다. 리트리버로 후보를 넉넉히 가져온 뒤 맨 마지막에 순서를 다듬는 '마무리 손질'로 기억하면 된다. 정리하면 오늘 배운 리트리버들은 서로 배타적이지 않고, 층층이 쌓아 검색 품질을 끌어올리는 도구 상자다.`},{h:"SemanticChunker — 의미가 바뀌는 지점에서 자르기",body:`1일차의 청킹은 '글자 수'를 기준으로 잘랐다. 간단하고 빠르지만, 한 주제가 한창 이어지는 도중에 500자가 찼다는 이유로 뚝 끊길 수 있다는 약점이 있다.
SemanticChunker는 발상을 바꾼다. 글자 수가 아니라 '의미가 달라지는 경계'에서 자른다.
방법은 이렇다. 문장을 하나씩 임베딩해 이웃 문장과의 의미 거리를 재고, 거리가 갑자기 크게 벌어지는 지점(주제가 바뀌는 곳)을 잘라야 할 경계로 삼는다.
그 결과 한 조각이 하나의 주제를 온전히 담게 되어, 검색했을 때 답에 필요한 내용이 한 조각 안에 모여 있을 확률이 높아진다.

대신 공짜는 아니다. 자르는 과정에서 문장마다 임베딩을 호출하므로 글자 수 방식보다 느리고 비용이 든다.
그래서 실무에서는 문서의 성격을 보고 고른다. 주제가 자주 바뀌는 회의록·FAQ·긴 보고서에는 SemanticChunker가 빛나고, 형식이 일정한 문서에는 굳이 필요 없을 수 있다.
결국 '어떻게 자르는가'는 1일차의 크기 조절에서 시작해, 오늘은 '의미 단위로 자르기'까지 선택지를 넓히는 것이다. 청킹과 리트리버는 검색 품질의 두 축이며, 오후 실습에서 이 둘을 함께 손봐 QA 체인을 완성한다.`}]},realCodes:[{title:"검색→프롬프트→생성을 LCEL로 잇고 출처까지 보여 주는 QA 체인",lang:"python",code:`# 어제 만든 벡터 인덱스를 다시 열어 질의응답 체인을 만든다
from langchain_chroma import Chroma  # 벡터 DB
from langchain_openai import OpenAIEmbeddings, ChatOpenAI  # 임베딩 모델과 대화형 LLM
from langchain_core.prompts import ChatPromptTemplate  # 프롬프트 틀을 만드는 도구
from langchain_core.output_parsers import StrOutputParser  # LLM 출력을 문자열로 깔끔히 뽑는 파서
from langchain_core.runnables import RunnablePassthrough  # 입력을 그대로 흘려보내는 부품

# 1) 어제 저장한 인덱스를 같은 임베딩 모델로 다시 연다
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")  # 색인할 때와 같은 모델이어야 한다
vectordb = Chroma(persist_directory="chroma_db", embedding_function=embeddings)  # 저장 폴더를 지정해 로드
retriever = vectordb.as_retriever(search_kwargs={"k": 4})  # 가장 비슷한 4개를 가져오는 리트리버

# 2) 가져온 조각들을 하나의 문자열로 합치는 함수(출처도 함께 표기)
def format_docs(docs):  # docs는 검색으로 찾은 문서 조각 리스트
    lines = []  # 조각 내용을 모을 빈 리스트
    for d in docs:  # 각 조각을 하나씩 돌면서
        src = d.metadata.get("source", "?")  # 조각이 어느 파일에서 왔는지 출처를 꺼낸다
        page = d.metadata.get("page", "?")  # 몇 페이지에서 왔는지 꺼낸다
        lines.append(f"[{src} p.{page}] {d.page_content}")  # 출처를 앞에 붙여 합친다
    return "\\n\\n".join(lines)  # 조각들을 빈 줄로 구분해 하나의 글로 만든다

# 3) LLM에게 줄 지시문(프롬프트) 틀을 만든다
prompt = ChatPromptTemplate.from_template(
    "아래 컨텍스트만 근거로 한국어로 답하세요. 근거가 없으면 '모른다'고 답하세요.\\n\\n"
    "[컨텍스트]\\n{context}\\n\\n[질문]\\n{question}"  # {context}와 {question} 자리에 실제 값이 채워진다
)
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)  # temperature=0은 매번 일관된 답을 내게 한다

# 4) 검색→프롬프트→LLM→문자열 순서로 부품을 파이프(|)로 연결한다
chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}  # 질문은 검색에도, 그대로도 전달
    | prompt        # 위 값들을 프롬프트 틀에 채워 넣고
    | llm           # 완성된 프롬프트를 LLM에 보내 답을 받고
    | StrOutputParser()  # 답에서 순수 텍스트만 뽑아낸다
)

# 5) 실제로 질문을 던져 답을 확인한다
answer = chain.invoke("연차 휴가는 며칠인가요?")  # 괄호 안 문자열이 사용자의 질문
print(answer)  # 결과: 문서 근거에 기반한 답변 문장이 출력됨

# 6) 답의 근거가 된 출처도 따로 보여 준다
for d in retriever.invoke("연차 휴가는 며칠인가요?"):  # 같은 질문으로 근거 조각을 다시 가져와
    print("출처:", d.metadata.get("source"), "p.", d.metadata.get("page"))  # 파일명과 페이지 출력`,note:`리트리버·프롬프트·LLM을 LCEL 파이프로 한 줄에 엮어 출처까지 보여 주는 RAG QA의 완성형이다.
temperature=0과 '모르면 모른다' 지시가 환각을 줄이는 핵심 장치다.`}],periods:["1교시 어제 인덱스 복습과 Retriever의 역할, top-k·재순위 개요","2교시 하이브리드 검색(키워드 BM25 + 벡터)과 재순위(Re-ranking)","3교시 [실습] 하이브리드 + Reranker로 검색 품질 높이기","4교시 고급 리트리버: ParentDocumentRetriever·MultiQueryRetriever","5교시 고급 리트리버: EnsembleRetriever·LongContextReorder","6교시 SemanticChunker와 청킹 전략 심화","7교시 [실습] 고급 리트리버로 질의응답(QA) 체인 완성","8교시 [실습] 출처 인용 RAG 챗봇으로 마무리"]},"rag-3":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 RAG 확장 4단계: Naive → Advanced → Modular → Agentic"},{time:"10:00–10:50",topic:"2교시 Agentic RAG 개념: 검색·판단을 에이전트 루프로"},{time:"11:00–11:50",topic:"3교시 LangGraph 기본 구조(Messages·State·Graph) 빠르게"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 [실습] LangGraph로 Agentic RAG 뼈대 만들기"},{time:"14:00–14:50",topic:"5교시 RAG 평가: RAGAS(충실도·답변 관련성·문맥 정밀도)"},{time:"15:00–15:50",topic:"6교시 [실습] 평가셋으로 RAG 점수 매기고 개선하기"},{time:"16:00–16:50",topic:"7교시 비용·지연(latency)·캐싱 최적화"},{time:"17:00–17:50",topic:"8교시 [실습] Agentic RAG 파이프라인 통합·마무리"}],practice:{title:"LangGraph로 Agentic RAG를 만들고 RAGAS로 채점·튜닝하기",steps:["'pip install langgraph ragas datasets' 로 라이브러리를 설치한다.","State에 messages·question·context 를 담고, retrieve(검색)·grade(근거 충분?)·rewrite(질문 재작성)·generate(생성) 노드를 만든다.","조건 분기: grade가 '부족'이면 rewrite→retrieve로 되돌아가고, '충분'이면 generate로 간다(최대 반복 3회로 제한).","문서에 답이 분명한 질문을 넣어, 한 번 검색으로 바로 생성까지 가는지 확인한다.","일부러 애매하게 물어(예: 줄임말·오타), rewrite→재검색 루프가 도는지, 최대 3회에서 멈추는지 관찰한다.","내 문서에서 답이 분명한 질문 5개와 정답(ground truth)을 만든다.","각 질문의 답변·컨텍스트를 모아 RAGAS로 faithfulness·answer_relevancy·context_precision 을 측정한다(기준선).","k(4→6)나 청킹(500→800) 중 하나만 바꿔 다시 측정하고 점수를 비교한다.","캐싱을 켜고 같은 질문을 두 번 던져 두 번째가 빠른지 시간을 잰다.","최종 설정을 'config 메모'로 남기고 비용·속도 trade-off를 한 줄로 정리한다.","[조별 캡스톤 안내] 이 과목은 Day2 후반부터 Day3까지 개인 실습이 아니라 조별 캡스톤으로 이어진다 — 위 개인 homework는 팀 산출물을 위한 연습으로 연결된다.","(1) 설계 산출물: 조별로 도메인·문서·질문셋을 정하고, 어떤 로더·청킹·리트리버·평가지표를 왜 골랐는지 담은 RAG 파이프라인 설계 문서를 먼저 제출한다.","(2) 개발 산출물: 설계대로 구현해 동작하는 Agentic RAG 와 RAGAS 평가 결과를 개발 산출물로 제출한다.","(3) 발표·마무리: 조별로 발표하고 서로 Feedback 을 주고받은 뒤, Wrap-up 과 QUIZ 로 과정을 마무리한다."],deliverable:"Agentic RAG 그래프(재검색 루프) + 평가셋(질문5+정답) + 튜닝 전후 RAGAS 점수표 + config 메모, 그리고 조별 캡스톤 산출물(설계 문서 → 개발 결과 → 발표·피드백)"}},examples:[{title:"같은 질문 두 번으로 캐싱 효과 체감하기",lang:"python",code:`import time  # 시간을 재는 표준 라이브러리
from langchain_openai import ChatOpenAI  # 대화형 LLM
from langchain_core.caches import InMemoryCache  # 메모리에 결과를 저장하는 캐시
from langchain_core.globals import set_llm_cache  # 전역 캐시를 설정하는 함수

set_llm_cache(InMemoryCache())  # LLM 호출 결과를 메모리에 캐싱하도록 켠다
llm = ChatOpenAI(model="gpt-4o-mini")  # 사용할 모델 준비

t1 = time.time()  # 첫 호출 시작 시각 기록
llm.invoke("RAG를 한 문장으로 설명해줘")  # 처음에는 실제로 API를 호출해 느리다
print(f"1차: {time.time()-t1:.2f}초")  # 결과: 1차: 1.20초 (예시)

t2 = time.time()  # 두 번째 호출 시작 시각 기록
llm.invoke("RAG를 한 문장으로 설명해줘")  # 같은 질문은 캐시에서 바로 가져와 빠르다
print(f"2차: {time.time()-t2:.2f}초")  # 결과: 2차: 0.00초 (캐시 적중)`,note:"같은 입력은 캐시에서 즉시 반환되어 비용과 시간을 크게 줄여 준다."},{title:"메타데이터 필터로 특정 문서만 검색하기",lang:"python",code:`from langchain_chroma import Chroma  # 벡터 DB
from langchain_openai import OpenAIEmbeddings  # 임베딩 모델

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")  # 색인 때와 같은 모델
vectordb = Chroma(persist_directory="chroma_db", embedding_function=embeddings)  # 인덱스 로드

# filter 에 조건을 주면 꼬리표가 맞는 조각만 검색 대상으로 삼는다
results = vectordb.similarity_search(
    "휴가 규정",                    # 검색할 질문
    k=3,                            # 상위 3개
    filter={"source": "docs/company_policy.pdf"}  # 이 파일에서 온 조각만 검색
)
print(len(results))  # 결과: 3 (해당 문서 안에서만 찾음)`,note:"여러 문서가 섞여 있을 때 원하는 문서로 검색 범위를 좁혀 정확도와 속도를 높인다."},{title:"RAGAS로 내 RAG를 자동 채점하기 (충실도·답변 관련성·문맥 정밀도)",lang:"python",code:`# 만든 RAG의 답 품질을 사람이 일일이 안 보고 숫자로 채점한다 (설치: pip install ragas datasets)
from ragas import EvaluationDataset, evaluate  # 평가셋 객체와 채점 함수(ragas 0.2+)
from ragas.metrics import faithfulness, answer_relevancy, context_precision  # 세 가지 지표
# qa_chain, retriever 는 2일차에서 만든 것을 재사용한다고 가정

# 1) 내 문서에서 '답이 분명한' 질문과 정답을 준비한다
questions = ["연차 휴가는 며칠인가요?", "환불은 며칠 이내 가능한가요?"]
ground_truths = ["연차는 15일이다", "환불은 구매 후 7일 이내 가능하다"]  # 사람이 아는 정답

# 2) 각 질문을 RAG에 넣어 '답변'과 '근거(검색된 문맥)'를 모은다
answers, contexts = [], []  # 답과 근거를 담을 빈 리스트
for q in questions:  # 질문을 하나씩 돌면서
    answers.append(qa_chain.invoke(q))  # RAG가 만든 답을 저장
    contexts.append([d.page_content for d in retriever.invoke(q)])  # 그때 검색된 조각들을 저장

# 3) RAGAS 0.2+ 형식(user_input·response·retrieved_contexts·reference)으로 평가셋을 만든다
samples = [
    {"user_input": q, "response": a, "retrieved_contexts": c, "reference": g}
    for q, a, c, g in zip(questions, answers, contexts, ground_truths)
]
data = EvaluationDataset.from_list(samples)

# 4) 세 지표로 채점한다
result = evaluate(data, metrics=[faithfulness, answer_relevancy, context_precision])
print(result)  # 결과: {'faithfulness': 0.92, 'answer_relevancy': 0.88, 'context_precision': 0.80} 같은 점수
# 충실도=지어내지 않았나, 답변 관련성=질문에 맞나, 문맥 정밀도=검색이 쓸모 있었나`,note:"이 점수를 '기준선'으로 적어 두고, k나 청킹을 하나만 바꿔 다시 재면 개선 여부를 숫자로 확인할 수 있다. 한 번에 하나씩만 바꾸는 것이 실험의 철칙이다."},{title:"평가셋 구성 + 실패 분석",lang:"python",code:`# 지표가 낮을 때 '검색'인지 '생성'인지 분리 진단한다
for row in eval_rows:
    hit = any(row["truth_doc"] in c for c in row["contexts"])
    if not hit:
        print("검색 실패:", row["question"])   # → 청킹/임베딩 개선 필요
    elif row["truth"] not in row["answer"]:
        print("생성 실패:", row["question"])   # → 프롬프트/모델 개선 필요`,note:"검색 실패와 생성 실패를 구분해야 올바른 개선 포인트를 잡는다. 평가 없이는 튜닝이 추측이 된다."},{title:"검색기 평가 - Hit Rate@K와 MRR 직접 계산",lang:"python",code:`# 검색이 정답 문서를 '몇 개 안에' 그리고 '몇 번째로' 찾는지를 수치로 본다
def evaluate(results, answers, k=3):                  # results: 질문별 검색된 문서ID 리스트
    hit, rr_sum = 0, 0.0                              # 적중 횟수, 역순위 합
    for docs, truth in zip(results, answers):         # 질문마다 (검색결과, 정답ID) 비교
        topk = docs[:k]                               # 상위 K개만 평가 대상
        if truth in topk:                             # 정답이 상위 K 안에 있으면
            hit += 1                                  # Hit Rate 카운트 증가
            rank = topk.index(truth) + 1              # 정답이 몇 번째인지(1부터)
            rr_sum += 1 / rank                        # 역순위(1위=1.0, 2위=0.5, 3위=0.33)
    return hit / len(answers), rr_sum / len(answers)  # (Hit Rate@K, MRR)

results = [[42, 7, 3], [1, 88, 5], [9, 2, 60], [11, 4, 8]]  # 4개 질문의 검색 결과(예시)
answers = [42, 88, 60, 99]                            # 각 질문의 정답 문서ID(마지막은 못 찾음)
hr, mrr = evaluate(results, answers, k=3)             # 지표 계산
print('Hit Rate@3:', round(hr, 3))                    # 0.75 (4개 중 3개 적중)
print('MRR:', round(mrr, 3))                          # 0.458 (정답이 앞 순위일수록 높다)`,note:'Hit Rate@K는 "정답이 상위 K개 안에 있나"만 보고, MRR은 "몇 번째에 있나"까지 반영한다. 같은 Hit Rate라도 MRR이 높으면 더 좋은 검색기다.'},{title:"생성 답변 평가 - LLM-as-a-Judge(정확성·충실성 채점)",lang:"python",code:`# 생성된 답변이 문맥에 충실한지 다른 LLM에게 심사를 맡긴다
from openai import OpenAI
client = OpenAI(api_key='sk-본인키')

JUDGE = '''당신은 RAG 답변 평가자입니다. 아래 기준으로 1~5점 채점하세요.
- 정확성(Correctness): 문맥과 사실이 일치하는가
- 충실성(Faithfulness): 문맥에 없는 내용을 지어내지 않았는가(환각 감점)
반드시 "정확성:N 충실성:N 이유:..." 형식으로만 답하세요.'''

question = 'HBM이란 무엇인가?'                          # 사용자 질문
context = 'HBM은 여러 D램을 수직으로 쌓은 고대역폭 메모리다.'  # 검색된 근거 문맥
answer = 'HBM은 D램을 쌓아 대역폭을 높인 메모리이며 2010년 삼성이 최초 개발했다.'  # 평가 대상 답변

res = client.chat.completions.create(                 # 심사 LLM 호출
    model='gpt-4o-mini',
    messages=[
        {'role': 'system', 'content': JUDGE},         # 평가자 역할과 기준 부여
        {'role': 'user', 'content': f'질문:{question}\\n문맥:{context}\\n답변:{answer}'},
    ],
    temperature=0,                                    # 일관된 채점을 위해 0 고정
)
print(res.choices[0].message.content)                 # 뒷부분 '삼성 최초 개발'은 문맥에 없어 충실성 감점`,note:"정답 라벨을 일일이 만들기 어려운 생성 품질은 LLM-as-a-Judge로 평가한다. 정확성·충실성처럼 판정 가능한 기준을 명시하고 형식을 고정해야 채점이 일관된다."},{title:"쿼리 분해(Query Transformation) - 비교 질문을 하위 질문으로",lang:"python",code:`from langchain_openai import ChatOpenAI                    # LLM
from langchain_core.prompts import PromptTemplate          # 프롬프트 틀
from langchain_core.output_parsers import StrOutputParser  # 텍스트 파서

llm = ChatOpenAI(model='gpt-4o-mini', temperature=0)   # 분해는 일관성이 중요해 온도 0

decompose = PromptTemplate.from_template(              # 하위 질문 생성 지시
    '다음 질문을 검색하기 좋은 단순한 하위 질문 2~3개로 나눠줘.\\n'
    '한 줄에 하나씩만 출력해줘.\\n질문: {question}'
) | llm | StrOutputParser()                            # 분해 전용 미니 체인

question = '삼성전자와 애플의 최근 3년 실적을 비교해 주세요.'   # 복합 비교 질문
sub_questions = decompose.invoke({'question': question}).strip().split('\\n')  # 하위 질문 목록

results = []                                           # 하위 질문별 검색 결과 기록
for sq in sub_questions:                               # 하위 질문마다
    found = retriever.invoke(sq)                       # 각각 독립적으로 검색
    results.append(sq + ' -> 검색 문서 ' + str(len(found)) + '건')  # 결과 정리

print('하위 질문:', sub_questions)                      # 분해가 잘 되었는지 확인
print(results)                                         # 마지막에 답변을 종합 생성한다`,note:"Naive RAG는 1질문=1검색 구조라 비교·인과 같은 복합 질문에 약하다. Advanced RAG의 Pre-Retrieval 단계에서 질문을 하위 질문으로 변환(Query Transformation)해 각각 검색하고 마지막에 종합하면 검색 누락이 크게 줄어든다. 단, 분해가 잘못되면 전체가 오답이 되고 LLM 호출이 늘어나는 트레이드오프가 있다."},{title:"Modular RAG 라우팅 패턴 - 질문 유형별로 다른 파이프라인",lang:"python",code:`def route(question):                          # Query Routing: 어느 흐름으로 보낼지 결정
    if any(w in question for w in ['얼마', '평균', '%']):    # 수치·계산형 질문
        return 'calc'                          # 계산 모듈 경로
    if any(w in question for w in ['최신', '오늘', '뉴스']):  # 실시간 정보형 질문
        return 'web'                           # 웹 검색 모듈 경로
    return 'vector'                            # 기본: 사내 문서 벡터 검색 경로

def run_pipeline(question):                    # 경로별로 다른 모듈 조합 실행
    path = route(question)                     # 1) 규칙 기반 라우팅 판단
    if path == 'calc':                         # 계산형이면
        return '계산 모듈: 수치 테이블 조회 후 계산'       # RDB + 계산 도구 조합
    if path == 'web':                          # 실시간형이면
        return '웹 검색 모듈: 최신 문서 수집 후 요약'      # 웹 검색 + 요약 조합
    return '벡터 검색 모듈: 문서 검색 + 재순위 + 생성'     # 기본 RAG 조합

questions = ['작년 영업이익률은 몇 %인가요?',     # 유형이 다른 세 질문
             '오늘 반도체 뉴스 요약해줘',
             '휴가 규정 알려줘']
for q in questions:                            # 질문마다
    print(q, '->', run_pipeline(q))            # 서로 다른 경로로 분기되는지 확인`,note:"Modular RAG는 RAG를 레고처럼 기능 모듈로 쪼개고 Routing·Branching·Loop 패턴으로 재조립하는 프레임워크다. 라우팅 조건은 LLM 판단이 아니라 규칙(Rule)으로 정의해야 흐름이 안정적이라는 것이 교재의 지적이다. 실무에서는 검색기·프롬프트 템플릿·모델까지 경로별로 바꿔 끼운다."},{title:"RAGAS 합성 테스트셋 - 평가용 질문·정답 쌍을 자동 생성",lang:"python",code:`from ragas.testset.generator import TestsetGenerator     # 테스트셋 생성기
from ragas.testset.evolutions import simple, reasoning, multi_context, conditional  # 질문 유형 4종

generator = TestsetGenerator.from_langchain(   # 생성기 조립
    generator_llm,                             # 질문을 만들어 내는 LLM
    critic_llm,                                # 만들어진 질문의 품질을 검사하는 LLM
    ragas_embeddings,                          # 임베딩 모델
    doc_store,                                 # 문서 저장소(InMemory)
)

distributions = {simple: 0.4,        # 단순 사실 질문 40%
                 reasoning: 0.2,     # 추론이 필요한 질문 20%
                 multi_context: 0.2, # 여러 문맥을 종합하는 질문 20%
                 conditional: 0.2}   # 조건부 질문 20%

test_set = generator.generate_with_langchain_docs(   # 우리 문서에서 자동 생성
    documents=docs,                # 지식베이스 문서
    test_size=10,                  # 질문 10개
    distributions=distributions,   # 유형 비율 반영
)
print(test_set.to_pandas().head()) # 질문·문맥·정답(Ground Truth) 쌍 확인`,note:"평가셋을 손으로 만들기 어려울 때 RAGAS의 Synthetic Test Dataset 기능이 문서에서 질문·문맥·참조답변 쌍을 자동 생성해 준다. 단순 질문만 섞으면 검색기의 약점이 드러나지 않으므로 추론·다중문맥·조건부 유형의 비율을 함께 지정하는 것이 핵심이다. 이렇게 만든 데이터로 Context Precision/Recall, Faithfulness 등을 채점한다."}],concepts:[{term:"RAG 확장 4단계",desc:"Naive(기본) → Advanced(검색·재순위 개선) → Modular(부품 조립) → Agentic(스스로 판단)로 발전하는 RAG의 성장 단계다."},{term:"Agentic RAG",desc:"한 번 검색하고 끝내지 않고, 결과가 부족하면 질문을 다시 쓰거나 재검색하는 등 에이전트처럼 스스로 판단하며 답을 완성하는 RAG다."},{term:"LangGraph(State·Messages·Graph)",desc:"검색·판단·생성을 노드로 만들고 화살표로 이어, 조건에 따라 반복·분기하는 에이전트 흐름을 그래프로 만드는 도구다."},{term:"RAGAS",desc:"RAG의 답 품질을 사람이 일일이 안 봐도 자동으로 점수 매겨 주는 평가 도구다."},{term:"충실도(faithfulness)",desc:"답변이 가져온 문서 내용에 충실한지, 즉 지어내지(환각) 않았는지를 재는 점수다."},{term:"문맥 정밀도(context precision)",desc:"검색해 온 문서 중 실제로 답에 쓸모 있었던 비율로, 쓸데없는 문서를 얼마나 안 가져왔는지를 본다."},{term:"캐싱(caching)",desc:"한 번 계산한 검색·답변을 저장해 두고 같은 요청엔 재사용해 속도·비용을 아끼는 기법이다."}],detail:{topics:[{h:"RAG 확장 4단계",items:["Naive: 검색 → 붙여넣기 → 생성(가장 단순)","Advanced: 재순위·질문 재작성으로 검색 개선","Modular: 검색·생성을 고정 순서가 아닌 '갈아 끼우는 부품'으로 다룸","Modular 모듈 예 — 라우팅(질문 종류별 인덱스/도구 분기)·검색 융합(키워드·벡터·질문변형 결과를 RRF로 재정렬)·메모리/재작성(검색 앞단에 이전 대화·질문 재작성 삽입)","Advanced가 '검색을 잘하게'라면 Modular는 '흐름 자체를 조립·교체 가능하게', 여기에 스스로 판단·반복이 더해지면 Agentic","Agentic: 결과가 부족하면 스스로 재검색·재작성"]},{h:"Agentic RAG를 LangGraph로",items:["State(Messages)에 질문·검색결과·판단을 담기","노드: 검색 → 충분한지 판단 → (부족) 질문 재작성·재검색","조건 분기: 근거가 충분하면 생성, 아니면 검색 루프","종료 조건과 무한 루프 방지(최대 반복 수)"]},{h:"평가(RAGAS)와 운영",items:["충실도·답변 관련성·문맥 정밀도로 채점","청킹·임베딩·k·재순위를 한 번에 하나씩 튜닝","캐싱으로 반복 질문 비용·지연 절감","토큰 비용과 응답 지연의 trade-off 관리"]},{h:"조별 산출물 체크리스트",items:["설계: 대상 문서/도메인, 청킹 전략과 근거, 리트리버 조합, 평가셋(질문+정답), 목표 지표 기준선","개발: 동작하는 RAG(가능하면 재검색 루프 포함), RAGAS 3지표 측정값, 튜닝 전/후 비교 1건","개발: 실패 사례 1건과 개선 시도 기록","발표: 무엇을 왜 그렇게 정했고 지표가 어떻게 움직였는지 3분 요약"]}],labs:[{title:"Lab 1 — LangGraph로 Agentic RAG 뼈대 만들기",steps:["실전 코드의 Agentic RAG 그래프를 파일로 저장한다.","'검색 → 판단(충분?) → 생성' 3노드와 '부족하면 재검색' 분기를 확인한다.","문서에 답이 있는 질문을 넣어 한 번 검색으로 답하는지 확인한다.","일부러 애매한 질문을 넣어, 재검색 루프가 도는지(그리고 최대 횟수에서 멈추는지) 관찰한다."]},{title:"Lab 2 — RAGAS로 채점하고 한 손잡이만 바꿔 비교",steps:["내 문서에서 답이 분명한 질문 3개와 정답을 적는다.","평가 스크립트의 questions·ground_truths 를 내 것으로 바꿔 faithfulness·answer_relevancy 를 측정한다(기준선).","k 값만 4→6으로 바꿔 다시 측정하고 기준선과 비교한다.","결과를 '한 줄 실험 노트'로 남긴다(예: k 6으로 충실도 +0.05, 응답은 느려짐)."]}],homework:["Agentic RAG(재검색 루프 포함)를 완성해, 한 번에 답하는 질문과 재검색이 필요한 질문 각각의 실행 로그를 캡처해 제출한다.","질문 5개짜리 평가셋으로 RAGAS 점수를 재고, 파라미터 하나(k·청킹·재순위)를 바꿔 튜닝 전후 점수를 표로 정리해 제출한다."]},theory:{theory:[{h:"Agentic RAG — 한 번 검색으로 끝내지 않는다",body:`기본(Naive) RAG는 '검색 한 번 → 생성 한 번'이다.
그런데 질문이 애매하거나 검색이 빗나가면, 나쁜 근거를 붙잡고 나쁜 답을 만들어 버린다.
Agentic RAG는 사람처럼 행동한다 — 가져온 근거가 부족하면 '다시 찾아볼까?'를 스스로 판단해, 질문을 더 구체적으로 고쳐 재검색한다.

LangGraph로는 검색(retrieve)·판단(grade)·재작성(rewrite)·생성(generate)을 노드로 만들고, '근거가 충분한가?'라는 조건 분기로 루프를 돈다.
충분하면 생성으로 빠지고, 부족하면 질문을 고쳐 다시 검색한다. 단, 무한 루프를 막으려면 최대 반복 횟수를 반드시 정해 둔다.
확장 단계로 보면 Naive → Advanced → Modular → Agentic의 마지막 단계로, 검색 자체가 똑똑해지는 방식이다.`},{h:"RAG는 느낌이 아니라 숫자로 평가한다",body:`RAG를 만들고 나면 '잘 되는 것 같다'는 느낌만으로 끝내기 쉽다.
하지만 느낌은 사람마다 다르고 어제와 오늘이 다르기 때문에, 개선 여부를 객관적으로 알 수 없다.
그래서 시험 채점표처럼 점수를 매기는 평가가 필요하다.

RAGAS는 대표적인 평가 도구로, 세 가지를 많이 본다.
충실도는 답이 가져온 문서에 충실한지(지어내지 않았는지), 답변 관련성은 답이 질문에 맞는지, 문맥 정밀도는 검색해 온 문서 중 실제로 쓸모 있던 비율을 본다.
이 점수를 기준선으로 잡아 두면, 무언가를 바꿨을 때 좋아졌는지 나빠졌는지를 숫자로 확인할 수 있다.`},{h:"튜닝과 운영: 품질·비용·속도의 줄다리기",body:`RAG의 성능을 올리는 손잡이는 여러 개다.
조각 크기, 겹침 양, 임베딩 모델, 가져올 개수 k, 재순위 사용 여부 등을 바꿔 가며 평가 점수를 비교한다.
중요한 것은 한 번에 하나씩만 바꾸는 것인데, 그래야 무엇이 점수를 바꿨는지 알 수 있기 때문이다.

실무에서는 품질만큼 비용과 속도도 중요하다.
k를 키우거나 재순위를 더하면 답은 좋아지지만 LLM 토큰 비용과 응답 시간이 늘어난다.
그래서 자주 들어오는 질문은 캐싱으로 결과를 재사용하고, 메타데이터 필터로 검색 범위를 좁혀 속도를 높인다.
결국 RAG 운영은 품질과 비용과 속도 사이에서 균형점을 찾는 줄다리기다.`},{h:"RAG 확장 4단계 — Naive에서 Agentic까지 한 장으로",body:`RAG는 한 번에 완성되는 것이 아니라 필요에 따라 단계적으로 자란다. 오늘은 그 성장 지도를 먼저 그려 두고, 각 단계를 살로 붙여 간다.
첫 단계 Naive RAG는 가장 단순하다. '질문으로 한 번 검색 → 가져온 조각을 그대로 붙여넣기 → 생성'이 전부다. 1일차에 만든 것이 바로 이 단계로, 빠르게 시작하기엔 좋지만 검색이 빗나가면 답도 함께 빗나간다.

두 번째 Advanced RAG는 '검색을 더 잘하게' 만드는 단계다. 2일차에 배운 하이브리드 검색, 재순위, 질문 재작성, 고급 리트리버가 모두 여기에 속한다. 파이프라인의 순서는 그대로 두고 검색 품질만 끌어올린다.

세 번째 Modular RAG는 '흐름 자체를 부품으로 조립·교체'하는 단계다. 검색과 생성을 고정된 한 줄이 아니라 갈아 끼울 수 있는 모듈로 다룬다. 질문 종류에 따라 다른 인덱스로 보내는 라우팅, 여러 검색 결과를 합치는 검색 융합, 검색 앞단에 이전 대화를 넣는 메모리 등이 예다.

마지막 Agentic RAG는 여기에 '스스로 판단하고 반복하는' 능력을 더한다. 근거가 부족하면 스스로 질문을 고쳐 다시 검색한다.
Advanced가 '검색을 잘하게', Modular가 '흐름을 조립 가능하게'라면, Agentic은 '검색을 할지·어떻게 할지를 스스로 정하게' 만드는 단계다.
주의할 점은 무조건 마지막 단계가 정답은 아니라는 것이다. 단계가 올라갈수록 똑똑해지지만 느리고 비싸진다. 문제에 맞는 만큼만 올라가면 된다. 오늘의 목표는 이 마지막 단계를 직접 만들어 보고, 그 값어치를 숫자(RAGAS)로 확인하는 것이다.`},{h:"LangGraph 기본 구조 — Messages·State·Graph 세 단어로 이해하기",body:`Agentic RAG처럼 '조건에 따라 되돌아가고 반복하는' 흐름은 LCEL 파이프(|) 한 줄로는 표현하기 어렵다. 파이프는 앞에서 뒤로 한 방향으로만 흐르기 때문이다.
LangGraph는 이런 흐름을 '그래프'로 그리게 해 주는 도구다. 딱 세 단어만 잡으면 된다.

첫째, State는 그래프가 처음부터 끝까지 들고 다니는 '작업 상태 보따리'다. 지금 질문이 무엇이고, 검색해 온 근거는 무엇이며, 재검색을 몇 번 했는지 같은 값을 여기에 담는다. 각 단계는 이 보따리를 받아 필요한 부분만 바꿔 돌려준다.
Messages는 그 State 안에 흔히 들어가는 대화 기록으로, 사용자·AI가 주고받은 말이 차곡차곡 쌓인다.

둘째, 노드(Node)는 실제 일을 하는 각각의 함수다. '검색하기', '근거가 충분한지 판단하기', '질문 다시 쓰기', '답 생성하기'가 각각 하나의 노드가 된다.
셋째, 엣지(Edge)는 노드를 잇는 화살표다. 그냥 다음으로 넘어가는 화살표도 있고, '근거가 충분하면 생성으로, 부족하면 재검색으로'처럼 조건에 따라 갈라지는 화살표(조건 분기)도 있다. 이 조건 분기가 바로 되돌아가는 루프를 만든다.

정리하면, State라는 보따리를 노드들이 돌려가며 고치고, 엣지가 그 순서를 정하며, 조건 분기로 반복과 분기를 만든다. 그리고 루프가 영원히 돌지 않도록 '최대 반복 횟수' 같은 종료 조건을 반드시 State에 넣어 둔다. 다음 실습에서 이 세 부품으로 Agentic RAG의 뼈대를 직접 조립한다.`}]},realCodes:[{title:"LangGraph로 만드는 최소 Agentic RAG(근거 부족하면 재검색)",lang:"python",code:`# 근거가 부족하면 질문을 고쳐 다시 검색하는 Agentic RAG (설치: pip install langgraph)
from typing_extensions import TypedDict  # 상태의 모양을 정의
from langgraph.graph import StateGraph, START, END  # 그래프 본체와 시작/끝
from langchain_openai import ChatOpenAI
# retriever, format_docs 는 2일차 rag-2에서 만든 것을 재사용한다고 가정

llm = ChatOpenAI(model='gpt-4o-mini', temperature=0)

class State(TypedDict):  # 그래프가 들고 다닐 상태
    question: str   # 현재 질문(재작성되며 바뀔 수 있음)
    context: str    # 검색해 온 근거
    tries: int      # 재검색 횟수(무한 루프 방지)
    answer: str     # 최종 답 또는 판단 결과

def retrieve(state):  # 검색 노드
    docs = retriever.invoke(state['question'])  # 현재 질문으로 검색
    return {'context': format_docs(docs), 'tries': state.get('tries', 0) + 1}

def grade(state):  # 판단 노드 — 근거가 충분한가?
    v = llm.invoke(f"질문에 답하기에 근거가 충분하면 YES, 아니면 NO만 출력.\\n질문:{state['question']}\\n근거:{state['context']}").content
    return {'answer': '충분' if 'YES' in v else '부족'}

def rewrite(state):  # 질문 재작성 노드
    better = llm.invoke(f"검색이 잘 되도록 질문을 더 구체적으로 바꿔줘:\\n{state['question']}").content
    return {'question': better}

def generate(state):  # 생성 노드
    ans = llm.invoke(f"아래 근거만 사용해 답하라.\\n근거:{state['context']}\\n질문:{state['question']}").content
    return {'answer': ans}

def route(state):  # 조건 분기 — 충분하면 생성, 부족하고 3회 미만이면 재작성
    if state['answer'] == '충분':
        return 'generate'
    return 'rewrite' if state['tries'] < 3 else 'generate'

g = StateGraph(State)
g.add_node('retrieve', retrieve); g.add_node('grade', grade)
g.add_node('rewrite', rewrite); g.add_node('generate', generate)
g.add_edge(START, 'retrieve'); g.add_edge('retrieve', 'grade')
g.add_conditional_edges('grade', route, {'generate': 'generate', 'rewrite': 'rewrite'})
g.add_edge('rewrite', 'retrieve'); g.add_edge('generate', END)  # 재작성하면 다시 검색
app = g.compile()

result = app.invoke({'question': '연차 며칠?', 'tries': 0})  # 애매한 질문
print(result['answer'])  # 결과: (필요하면 재검색을 거쳐) 근거에 기반한 답이 나옴`,note:`grade에서 '부족'이 나오면 rewrite→retrieve로 되돌아가 다시 검색합니다.
tries로 최대 3회 제한을 두어 무한 루프를 막는 것이 Agentic RAG의 안전장치다.`},{title:"RAGAS로 RAG 답변을 자동 채점하는 평가 스크립트",lang:"python",code:`# RAG 답변의 품질을 RAGAS로 자동 채점한다(설치: pip install ragas)
from ragas import EvaluationDataset, evaluate  # 평가셋 객체와 채점 함수(ragas 0.2+ 기준)
from ragas.metrics import faithfulness, answer_relevancy, context_precision  # 충실도·답변관련성·문맥정밀도

# 1) 평가에 쓸 질문·정답(reference)을 사람이 미리 준비한다
questions = ["연차 휴가는 며칠인가요?", "환불은 며칠 내 가능한가요?"]  # 평가 질문 목록
references = ["연 15일입니다", "구매 후 7일 이내 가능합니다"]  # 각 질문의 모범 답안

# 2) 우리 RAG의 답과 근거를 모아 '샘플' 리스트로 만든다(qa_chain은 2일차에서 만든 체인)
samples = []
for q, ref in zip(questions, references):  # 질문·정답을 짝지어 반복
    answer = qa_chain.invoke(q)  # 체인으로 답 생성
    ctxs = [d.page_content for d in retriever.invoke(q)]  # 같은 질문의 근거 조각 본문
    samples.append({
        "user_input": q,           # (구버전 'question')
        "response": answer,        # (구버전 'answer')
        "retrieved_contexts": ctxs, # (구버전 'contexts')
        "reference": ref,          # (구버전 'ground_truth')
    })

# 3) 샘플을 EvaluationDataset으로 묶는다(0.2부터 이 형식이 표준)
dataset = EvaluationDataset.from_list(samples)

# 4) 세 지표로 채점을 실행한다
result = evaluate(dataset, metrics=[faithfulness, answer_relevancy, context_precision])
print(result)  # 결과: {'faithfulness': 0.82, 'answer_relevancy': 0.79, 'context_precision': 0.88} 형태`,note:`⚠️ ragas 0.2부터 입력 형식이 바뀌었다: 필드명이 user_input/response/retrieved_contexts/reference 이고,
Dataset 대신 EvaluationDataset.from_list 를 쓴다. 파라미터를 바꾼 뒤 점수를 다시 재면 개선을 객관적으로 확인할 수 있다.`},{title:"실전: RAGAS 자동 평가 스크립트",lang:"python",code:`from ragas import EvaluationDataset, evaluate   # ragas 0.2+ 기준
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
# faithfulness 낮으면 생성(프롬프트), context_precision 낮으면 검색을 손본다`,note:"ragas 0.2부터 EvaluationDataset + user_input/response/retrieved_contexts/reference 형식. 지표로 병목(검색 vs 생성)을 진단하고, 튜닝 전/후 같은 평가셋으로 개선을 증명."}],periods:["1교시 RAG 확장 4단계: Naive → Advanced → Modular → Agentic","2교시 Agentic RAG 개념: 검색·판단을 에이전트 루프로","3교시 LangGraph 기본 구조(Messages·State·Graph) 빠르게","4교시 [실습] LangGraph로 Agentic RAG 뼈대 만들기","5교시 RAG 평가: RAGAS(충실도·답변 관련성·문맥 정밀도)","6교시 [실습] 평가셋으로 RAG 점수 매기고 개선하기","7교시 비용·지연(latency)·캐싱 최적화","8교시 [실습] Agentic RAG 파이프라인 통합·마무리"]}};export{e as default};
