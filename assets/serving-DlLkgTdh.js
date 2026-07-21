const e={"serving-1":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 OT·모델 서빙이 왜 필요한가 (학습된 모델을 서비스로)"},{time:"10:00–10:50",topic:"2교시 서빙 패턴 비교: 온라인·배치·스트림"},{time:"11:00–11:50",topic:"3교시 [실습] 모델 저장·로드와 추론 함수 만들기"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 FastAPI 기초: 엔드포인트·요청/응답 모델"},{time:"14:00–14:50",topic:"5교시 [실습] FastAPI 추론 API 만들고 호출하기"},{time:"15:00–15:50",topic:"6교시 입력 검증·전처리·후처리와 에러 처리"},{time:"16:00–16:50",topic:"7교시 BentoML로 모델 패키징과 버전 관리"},{time:"17:00–17:50",topic:"8교시 [실습] 추론 REST API 완성·테스트·정리"}],practice:{title:"학습된 머신러닝 모델을 FastAPI 추론 REST API로 서빙하기",steps:["터미널에서 가상환경을 만들고(`python -m venv .venv` 후 활성화) `pip install fastapi uvicorn scikit-learn joblib` 로 필요한 패키지를 설치한다.","`train.py` 를 작성해 scikit-learn 의 붓꽃(iris) 데이터로 분류 모델을 학습하고 `joblib.dump(model, 'model.joblib')` 로 파일에 저장한다(실행하면 같은 폴더에 model.joblib 생성).","`app.py` 를 만들고 FastAPI 앱과 Pydantic 입력 스키마(꽃받침·꽃잎 4개 수치)를 정의한다.","앱이 시작될 때 `joblib.load('model.joblib')` 로 모델을 한 번만 메모리에 올리고, `/predict` POST 엔드포인트에서 입력을 받아 예측을 반환하게 작성한다.","터미널에서 `uvicorn app:app --reload --port 8000` 명령으로 서버를 켠다(콘솔에 'Uvicorn running on http://127.0.0.1:8000' 이 보이면 성공).","브라우저로 `http://127.0.0.1:8000/docs` 에 접속해 자동 생성된 Swagger 문서에서 `/predict` 를 'Try it out' 으로 직접 호출한다.",'터미널에서 `curl` 로 JSON 을 POST 해 `{"prediction":"setosa"}` 형태의 응답이 오는지 확인한다(기대 결과: HTTP 200 과 예측 라벨).',"잘못된 입력(숫자 대신 문자)을 보내 422 검증 에러가 자동으로 나는지 확인하고, 모델 버전 정보를 응답에 함께 담아 마무리한다."],deliverable:"model.joblib + train.py + app.py 로 구성된, /predict 호출 시 예측 라벨과 모델 버전을 돌려주는 실행 가능한 FastAPI 추론 서비스"}},examples:[{title:"joblib 으로 모델 저장하고 다시 불러오기",lang:"python",code:`import joblib                                    # 파일 저장/로드 도구 가져오기
from sklearn.linear_model import LogisticRegression  # 간단한 분류 모델

clf = LogisticRegression()                    # 모델 객체 생성
clf.fit([[0],[1],[2],[3]], [0,0,1,1])         # 작은 데이터로 학습(0,1 / 2,3 → 클래스 0,1)

joblib.dump(clf, 'clf.joblib')               # 학습된 모델을 파일로 저장
loaded = joblib.load('clf.joblib')           # 파일에서 모델을 다시 불러오기
print(loaded.predict([[2.5]]))               # 결과: [1] (2.5는 클래스 1로 예측)
`,note:"학습과 서빙은 보통 다른 시점·다른 컴퓨터에서 일어나므로 모델을 파일로 주고받는 것이 기본이다."},{title:"curl 로 추론 API 호출해 보기",lang:"bash",code:`# 실행 중인 FastAPI 서버에 JSON 입력을 POST로 보낸다
curl -X POST http://127.0.0.1:8000/predict \\
  -H 'Content-Type: application/json' \\
  -d '{"sepal_length":5.1,"sepal_width":3.5,"petal_length":1.4,"petal_width":0.2}'
# 결과 예시: {"prediction":"setosa","model_version":"v1.0.0"}
`,note:"-H 는 보내는 데이터가 JSON 이라는 표시이고, -d 는 실제 입력 본문이다."},{title:"동기 엔드포인트를 비동기로 바꾸기",lang:"python",code:`from fastapi import FastAPI
from fastapi.concurrency import run_in_threadpool  # 무거운 연산을 스레드로 넘기는 도구

app = FastAPI()

# 외부 호출·대기가 있으면 async def + await 로 그 시간 동안 다른 요청도 함께 처리한다
@app.post('/predict')
async def predict(payload: dict):
    # 모델 예측처럼 CPU를 오래 쓰는 일은 이벤트 루프를 막으므로 스레드풀로 넘긴다
    result = await run_in_threadpool(model.predict, [[payload['x']]])
    return {'prediction': int(result[0])}
`,note:"async라고 무조건 빨라지는 게 아니라 대기(I/O)가 있을 때 이득이며, CPU 연산은 스레드풀이나 배치로 풀어야 다른 요청을 막지 않는다."},{title:"검증·에러 처리·헬스체크·로깅을 한 번에 갖춘 추론 엔드포인트 (python)",lang:"python",code:`import logging, time                              # 로깅과 시간 측정용 표준 라이브러리
from fastapi import FastAPI, HTTPException         # API 본체와 에러 응답 도구
from pydantic import BaseModel, Field             # 입력 양식과 값 제약(Field)
import joblib

# 로그를 '시간 | 레벨 | 내용' 형태로 남기도록 기본 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s | %(levelname)s | %(message)s')
log = logging.getLogger('serving')                # 이 서비스 전용 로거

app = FastAPI(title='안전한 추론 API')
model = None                                       # 모델은 시작 이벤트에서 채운다

class IrisInput(BaseModel):                        # 요청 양식 정의
    # Field(gt=0)로 '0보다 커야 함'이라는 값 범위까지 스키마에 명시 → 위반 시 자동 422
    sepal_length: float = Field(gt=0, le=10)       # 0 초과 10 이하만 허용
    sepal_width: float = Field(gt=0, le=10)
    petal_length: float = Field(gt=0, le=10)
    petal_width: float = Field(gt=0, le=10)

@app.on_event('startup')                           # 서버가 켜질 때 딱 한 번 실행(Eager 로딩)
def load():
    global model
    model = joblib.load('model.joblib')            # 모델을 메모리에 올려 둠
    log.info('모델 로딩 완료')                      # 로그: 준비 상태 기록

@app.get('/health')                                # 서버가 살아있는지 확인(로드밸런서용)
def health():
    return {'status': 'ok'}

@app.get('/ready')                                 # 모델까지 준비됐는지 확인
def ready():
    return {'ready': model is not None}             # 모델이 없으면 아직 준비 안 됨

@app.post('/predict')
def predict(item: IrisInput):                       # 여기 도달했다면 형식·범위 검증은 이미 통과
    start = time.time()                            # 처리 시작 시각
    try:
        features = [[item.sepal_length, item.sepal_width,
                     item.petal_length, item.petal_width]]
        pred = int(model.predict(features)[0])     # 예측 시도
    except Exception as e:                         # 예측 중 어떤 오류가 나도
        log.error(f'예측 실패: {e}')                # 상세 원인은 로그로만 남기고
        raise HTTPException(status_code=500, detail='추론 처리 중 오류')  # 사용자엔 안전한 메시지
    latency = round((time.time() - start) * 1000)  # 걸린 시간(ms)
    # 집계하기 좋은 한 줄 로그: 어떤 요청이 얼마나 걸려 성공했는지
    log.info(f'endpoint=/predict status=200 latency_ms={latency} pred={pred}')
    return {'prediction': pred, 'latency_ms': latency}`,note:"Field 로 값 범위까지 스키마에 넣으면 잘못된 값이 자동으로 422 로 막히고, try/except 는 예측 실패를 500 스택트레이스 노출 없이 처리한다. /health·/ready 로 모니터링 도구가 서버 상태를 점검하고, latency 를 담은 한 줄 로그가 Day2·Day3 모니터링의 출발점이 된다."},{title:"배치 추론 + 동시성",lang:"python",code:`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class BatchReq(BaseModel):
    items: list[list[float]]   # 여러 입력을 한 번에

@app.post("/predict-batch")
def predict_batch(req: BatchReq):
    # 1건씩 호출보다 배치 추론이 GPU 활용률↑, 처리량↑
    preds = model.predict(req.items)   # 벡터화 연산
    return {"predictions": preds.tolist()}`,note:"요청을 모아 배치로 추론하면 처리량(throughput)이 크게 오른다. 지연(latency)과의 균형을 설정."},{title:"APIRouter로 라우터를 분리하고 include_router로 합치기",lang:"python",code:`# api/routers/task.py - 할 일(Task) 관련 엔드포인트만 모아 둔 라우터 파일
from fastapi import APIRouter          # 여러 경로를 묶어 관리하는 미니 라우터

router = APIRouter()                   # 이 파일 전용 라우터 객체를 만든다

@router.get('/tasks')                  # GET /tasks - 목록 조회 경로 동작 함수
async def list_tasks():                # async: 대기 시간에 다른 요청도 처리
    return [{'id': 1, 'title': '첫 번째 할 일'}]  # 지금은 더미 데이터를 반환

@router.post('/tasks')                 # POST /tasks - 새 할 일 생성
async def create_task():
    return {'id': 2, 'title': '새 할 일'}

# ---- api/main.py - 앱 본체에서 위 라우터를 불러와 합친다 ----
from fastapi import FastAPI
from api.routers import task           # 방금 만든 task 라우터 모듈 가져오기

app = FastAPI()                        # FastAPI 앱 본체
app.include_router(task.router)        # task 라우터의 모든 경로를 앱에 등록한다`,note:"엔드포인트가 늘면 main.py가 비대해지므로 리소스별로 파일을 나눠 APIRouter로 만들고 include_router로 합친다. Swagger UI(/docs)에 등록된 경로가 그대로 나타난다."},{title:"Pydantic 스키마로 요청·응답 타입 정의 (BaseModel 상속)",lang:"python",code:`from fastapi import APIRouter
from pydantic import BaseModel, Field  # 데이터 검증용 기본 클래스와 필드 설정

router = APIRouter()

# 공통 필드(title)를 담는 부모 스키마 - 중복 없이 물려주기 위함
class TaskBase(BaseModel):
    title: str | None = Field(None, example='세탁물 찾아오기')  # 제목: 문자열 또는 None

class TaskCreate(TaskBase):            # 생성 요청용 - id 없이 title만 받는다
    pass

class TaskCreateResponse(TaskCreate):  # 생성 응답용 - 서버가 매긴 id를 덧붙인다
    id: int

# response_model을 지정하면 반환값이 이 스키마에 맞는지 자동 검증/직렬화된다
@router.post('/tasks', response_model=TaskCreateResponse)
async def create_task(body: TaskCreate):   # 요청 본문이 TaskCreate 형식이 아니면 자동 422
    # 받은 title에 id=1을 붙여 응답 스키마로 돌려준다
    return TaskCreateResponse(id=1, **body.dict())  # **로 title을 그대로 펼쳐 넣는다`,note:"BaseModel을 상속해 요청(TaskCreate)/응답(TaskCreateResponse) 타입을 나누면 잘못된 입력은 FastAPI가 자동으로 422로 막고 응답도 스키마대로 검증된다. TaskBase로 공통 필드(title)를 한 번만 정의해 재사용한다."}],concepts:[{term:"모델 서빙(Model Serving)",desc:"학습이 끝난 모델을 다른 프로그램이 인터넷으로 불러 쓸 수 있게 '식당 주방'처럼 항상 대기시켜 주문(입력)을 받아 요리(예측)를 내주는 것이다."},{term:"추론(Inference)",desc:"이미 학습된 모델에 새로운 입력을 넣어 예측 결과를 얻는 과정으로, 시험공부(학습)가 끝난 학생이 실제 문제를 푸는 단계에 해당한다."},{term:"온라인 서빙",desc:"사용자가 요청하면 즉시 한 건씩 답을 주는 방식으로, 카페에서 주문 즉시 음료를 만들어 주는 것과 같다."},{term:"배치(Batch) 서빙",desc:"요청을 모았다가 정해진 시간에 한꺼번에 대량으로 예측하는 방식으로, 밤사이 쌓인 빨래를 아침에 몰아서 세탁기에 돌리는 것과 비슷하다."},{term:"REST API",desc:"프로그램끼리 약속된 주소(URL)와 규칙으로 데이터를 주고받는 창구로, 식당의 '주문 메뉴판+주문서' 역할을 한다."},{term:"직렬화(Serialization)",desc:"메모리 안의 모델 객체를 파일로 저장 가능한 형태(바이트)로 바꾸는 것으로, 완성된 요리를 도시락에 담아 보관·운반하는 것에 비유할 수 있다."},{term:"Pydantic 스키마",desc:"API 가 받을 입력의 모양(필드 이름·자료형)을 미리 정의해 두는 '주문서 양식'으로, 양식에 안 맞는 주문은 자동으로 걸러 준다."},{term:"동기 vs 비동기(Sync/Async)",desc:"동기는 요청 하나를 끝까지 처리해야 다음 손님을 받는 방식이고, 비동기는 오래 걸리는 일을 기다리는 동안 다른 요청을 먼저 처리하는 방식이다. 콜센터 상담원이 통화 하나를 끝내야 다음 전화를 받으면 동기, 대기 손님을 번갈아 응대하면 비동기다."},{term:"처리량(Throughput)과 배치(Batching)",desc:"처리량은 1초에 몇 건을 처리하느냐이고, 여러 요청을 잠깐 모아 한 번에 모델에 넣어(batching) GPU를 꽉 채워 돌리면 같은 시간에 더 많이 처리할 수 있다."},{term:"Lazy vs Eager 로딩",desc:"Eager는 서버가 켜질 때 모델을 미리 메모리에 올려 첫 요청부터 빠른 방식, Lazy는 첫 요청이 올 때 비로소 모델을 올려 서버 시작은 빠르지만 첫 응답이 느린 방식이다."},{term:"gRPC",desc:"REST(HTTP+JSON)보다 데이터를 압축된 형식으로 주고받아 더 빠른, 서비스 간 고성능 통신 규약이다. 사람이 눈으로 보기엔 REST가 편하고, 초저지연·대량 내부 통신엔 gRPC가 유리하다."}],detail:{topics:[{h:"서빙 패턴 한눈에",items:["온라인 서빙(즉시 1건 응답)","배치 서빙(모아서 대량 처리)","스트림 서빙(흐르는 데이터 실시간 처리)","요청량·지연 허용치로 방식 선택"]},{h:"추론 API 구성요소",items:["엔드포인트(URL) 정의","입력 스키마와 자동 검증","전처리→예측→후처리 흐름","헬스체크(/health) 엔드포인트","응답에 모델 버전 포함"]},{h:"모델 패키징·버전관리",items:["joblib/pickle 직렬화","모델 파일과 라벨/전처리기 함께 저장","BentoML 로 서비스 묶기","버전 태그(v1.0.0)와 변경 이력 관리"]},{h:"비동기·로딩 전략",items:["동기 vs 비동기 엔드포인트(async def/await)","동시 요청 처리로 throughput 개선","요청 배치(batching)와 지연-처리량 트레이드오프","Eager 로딩(기동 시 적재) vs Lazy 로딩(첫 요청 시 적재)","서빙 아키텍처 패턴: REST vs gRPC, 동기 vs 비동기"]}],labs:[{title:"Lab 1. 내 첫 추론 함수 만들기",steps:["주피터에서 scikit-learn 붓꽃 데이터를 불러와 분류 모델을 학습한다.","학습된 모델을 `joblib.dump` 로 model.joblib 파일에 저장한다.","새 셀에서 `joblib.load` 로 모델을 다시 불러온다.","측정값 4개를 리스트로 만들어 `model.predict` 에 넣고 결과를 출력한다.","출력된 숫자를 품종 이름으로 바꿔 print 로 확인한다(예: 0 → setosa)."]},{title:"Lab 2. FastAPI 로 API 감싸기",steps:["`pip install fastapi uvicorn` 로 도구를 설치한다.","app.py 에 FastAPI 앱과 Pydantic 입력 스키마를 작성한다.","`/predict` POST 함수에서 모델을 불러 예측 결과를 반환하게 만든다.","터미널에서 `uvicorn app:app --reload` 로 서버를 켠다.","브라우저 `/docs` 에서 'Try it out' 으로 직접 호출해 응답을 확인한다."]},{title:"Lab 3. 잘못된 입력 막아 보기",steps:["숫자가 와야 할 자리에 문자열을 넣은 JSON 을 만든다.","curl 또는 /docs 로 그 잘못된 입력을 전송한다.","응답 코드가 422(검증 실패)로 오는지 확인한다.","에러 메시지에서 어떤 필드가 문제인지 읽어 본다.","올바른 입력으로 다시 보내 200 응답을 받아 비교한다."]},{title:"Lab 4. 동기·비동기·로딩 전략 비교하기",steps:["/predict_sync(동기)와 /predict_async(async def) 두 엔드포인트를 같은 모델로 만든다.","간단한 부하 스크립트로 동시에 여러 요청을 보내 각 버전의 초당 처리 건수를 비교한다.","모델 로딩을 Eager(앱 시작 시 load)로 한 버전과 Lazy(첫 요청 때 load)로 한 버전을 만든다.","서버 기동 직후 첫 요청의 응답 시간을 두 버전에서 재어 차이를 기록한다.","어떤 서비스에 어떤 조합이 맞는지 한 줄로 결론을 적는다."]}],homework:["오늘 만든 추론 API 에 `/model-info` GET 엔드포인트를 추가해 모델 버전·학습 데이터 이름·생성일을 JSON 으로 돌려주도록 확장하라.","온라인 서빙과 배치 서빙이 각각 더 적합한 실제 서비스 사례를 2개씩 찾아, 응답 속도와 처리량 관점에서 왜 그 방식이 맞는지 3~4문장으로 정리하라."]},theory:{theory:[{h:"동기 vs 비동기, 그리고 배치로 처리량 높이기",body:`추론 서버에 요청이 몰릴 때, 동기 방식은 한 요청이 모델 예측(수십~수백 ms)을 끝낼 때까지 서버가 다른 요청을 붙잡아 두어 줄이 길어진다.
FastAPI에서 \`async def\`로 엔드포인트를 만들고 \`await\`로 대기 지점을 표시하면, 모델이 계산하는 동안 서버가 다른 요청도 함께 진행해 같은 하드웨어로 더 많은 동시 요청을 소화한다.

한 걸음 더 나아가, 짧은 시간(예: 20ms) 안에 들어온 요청 여러 건을 모아 모델에 한 번에 넣는 '배치 처리'를 하면 GPU를 한 번 돌릴 때 여러 건을 동시에 예측해 처리량(throughput)이 크게 오른다.
다만 배치는 모으는 시간만큼 개별 응답이 살짝 늦어지므로, '지연을 조금 감수하고 처리량을 얻는' 트레이드오프임을 이해하고 서비스 성격에 맞춰 선택한다.
실습에서는 같은 모델을 동기·비동기 버전으로 각각 만들어 부하를 줬을 때 초당 처리 건수가 어떻게 달라지는지 눈으로 비교한다.`},{h:"Lazy vs Eager - 모델을 언제 메모리에 올릴까",body:`큰 모델일수록 파일을 메모리로 불러오는 데 수 초가 걸린다. 이 로딩을 '언제' 하느냐가 서비스 체감을 좌우한다.
Eager 로딩은 서버가 켜지는 순간 모델을 미리 올려 둔다 — 서버 기동은 느려지지만 첫 사용자부터 빠른 응답을 받는다. 실시간 서비스라면 대개 Eager가 정답이다.
Lazy 로딩은 첫 요청이 들어올 때 그제서야 모델을 올린다 — 서버는 즉시 뜨지만 운 나쁜 첫 사용자가 로딩 시간을 다 뒤집어쓴다.

잘 안 쓰는 모델을 여러 개 얹어 두고 요청이 온 것만 올리고 싶을 때(메모리 절약)는 Lazy가 유리하다.
두 방식의 '서버 시작 시간'과 '첫 응답 시간'을 재보면, 실시간 서빙에서 왜 Eager를 기본으로 삼는지 체감할 수 있다.`},{h:"왜 모델을 '서빙' 해야 할까?",body:`모델을 아무리 잘 학습시켜도 내 노트북의 주피터 노트북 안에만 있으면 다른 사람은 그 모델을 쓸 수 없다.
서빙은 이 모델을 '항상 켜져 있는 식당 주방'처럼 만들어서, 누구든 인터넷으로 주문(입력 데이터)을 보내면 요리(예측 결과)를 받아 갈 수 있게 하는 일이다.

예를 들어 쇼핑몰의 추천 모델은 고객이 페이지를 열 때마다 0.1초 안에 추천 결과를 내줘야 한다.
그래서 모델을 파일로 저장한 뒤, 그 파일을 불러 대기시키고, 요청을 받을 창구(API)를 여는 세 단계가 서빙의 핵심이다.
이 과목 첫날은 바로 이 '주방을 여는' 가장 기본적인 방법을 손으로 직접 만들어 본다.`},{h:"온라인·배치·스트림, 상황에 맞는 서빙 고르기",body:`서빙 방식은 크게 세 가지가 있고, 상황에 따라 골라 써야 한다.
온라인 서빙은 요청이 오는 즉시 한 건씩 답하는 방식으로, 챗봇이나 실시간 추천처럼 '지금 당장' 답이 필요할 때 쓴다.
배치 서빙은 데이터를 모아 두었다가 새벽 2시처럼 한가한 시간에 몰아서 처리하는 방식으로, 매일 전체 고객의 이탈 점수를 한 번에 계산하는 일에 어울린다.

스트림 서빙은 끊임없이 흘러 들어오는 데이터(예: 결제 로그)를 흐르는 대로 바로바로 처리하는 방식이다.
실무에서는 '응답이 얼마나 빨라야 하는가'와 '한 번에 얼마나 많이 처리하는가'를 기준으로 이 셋 중 하나를 고른다.`},{h:"FastAPI 가 서빙 입문에 좋은 이유",body:"FastAPI 는 파이썬으로 API 를 아주 쉽고 빠르게 만들 수 있는 도구다.\n함수 위에 `@app.post('/predict')` 한 줄만 붙이면 그 함수가 인터넷 주소(엔드포인트)가 되는 식이라 직관적이다.\n게다가 입력 양식(Pydantic)을 정해 두면 잘못된 데이터가 들어올 때 자동으로 막아 주고, `/docs` 주소로 들어가면 시험 삼아 호출해 볼 수 있는 화면까지 공짜로 만들어 준다.\n그래서 처음 서빙을 배우는 사람에게는 복잡한 설정 없이 '모델을 API 로 감싸는' 경험을 하기에 가장 좋은 출발점이다."},{h:"FastAPI 기본 구조: 라우팅·요청/응답 모델·자동 문서",body:"(4교시) 서빙 API를 만들 때 실제로 이해해야 할 뼈대는 딱 세 가지다. 첫째는 '라우팅'이다. 함수 위에 `@app.post('/predict')` 를 붙이면, 인터넷 주소 `/predict` 로 POST 요청이 올 때 바로 그 함수가 실행된다. 즉 URL 하나가 함수 하나에 연결되는 것이고, 여러 엔드포인트를 만들면 각 주소가 각기 다른 창구가 된다.\n\n둘째는 '요청/응답 모델'이다. 클라이언트가 보내는 JSON 은 Pydantic 클래스(BaseModel)로 받는다. `class IrisInput(BaseModel): sepal_length: float ...` 처럼 필드 이름과 자료형을 적어 두면, 들어온 JSON 이 이 양식대로 자동으로 파싱되고 형이 안 맞으면 걸러진다. 함수가 `return {'prediction': ...}` 로 파이썬 딕셔너리를 돌려주면 FastAPI 가 그걸 JSON 응답으로 바꿔 내보낸다. 개발자는 '변환'을 신경 쓸 필요 없이 파이썬 객체만 다루면 된다.\n\n셋째는 '자동 문서(Swagger)'다. 위 두 가지를 정의하는 순간 FastAPI 가 `/docs` 주소에 시험용 화면을 공짜로 만들어 준다. 입력 양식이 그대로 폼으로 뜨고 'Try it out' 버튼으로 바로 호출해 볼 수 있어, 별도 클라이언트 없이도 API 가 잘 도는지 확인할 수 있다. 수업에서는 이 세 가지가 어떻게 코드 몇 줄로 맞물리는지 app.py 를 함께 읽으며 짚는다."},{h:"입력은 믿지 말라: 검증·에러 처리·헬스체크·로깅 기초",body:"(6교시) 실제 서비스는 온갖 이상한 입력과 예상 못 한 오류를 만난다. 그래서 '정상 요청만 처리'하는 코드에 네 겹의 안전장치를 더한다.\n\n(1) 입력 검증 — Pydantic 이 자료형은 자동으로 막아 422 를 돌려주지만, '꽃잎 길이가 음수' 같은 값의 범위·업무 규칙은 개발자가 직접 확인해 `raise HTTPException(status_code=400, detail='...')` 로 깔끔한 에러를 돌려줘야 한다. 검증은 '나쁜 데이터가 모델까지 못 가게' 앞단에서 막는 일이다.\n\n(2) 에러 핸들링 — 모델 예측 중 예외가 나면 그대로 두면 500 과 함께 내부 코드 흐름(스택트레이스)이 사용자에게 노출된다. `try/except` 로 감싸 예외를 잡고, 사용자에게는 '처리 중 오류가 발생했습니다' 정도의 안전한 메시지만 주고, 상세 원인은 로그로만 남긴다.\n\n(3) 헬스체크 — `/health` 같은 점검용 주소를 하나 열어 두면, 로드밸런서나 모니터링 도구가 주기적으로 찔러 보고 '이 서버 살아 있나'를 판단한다. 죽은 서버로는 트래픽을 안 보내게 하는 기본 장치이며, 모델까지 다 로드됐는지 확인하는 `/ready` 로 나누기도 한다.\n\n(4) 로깅 기초 — 언제·어떤 요청이·얼마나 걸려·성공/실패했는지를 한 줄씩 남긴다. 지금은 그냥 print 처럼 보여도, 이 기록이 Day2 의 모니터링과 Day3 의 AIOps(집계·이상탐지)의 원재료가 된다. 그래서 '사람이 읽는 문장'보다 나중에 기계가 집계하기 좋은 형태로 남기는 습관을 처음부터 들인다."}]},realCodes:[{title:"학습→저장→FastAPI 서빙: 처음부터 끝까지",lang:"python",code:`# ===== train.py : 모델을 학습해서 파일로 저장하는 스크립트 =====
from sklearn.datasets import load_iris            # 연습용 붓꽃 데이터셋을 불러오는 함수
from sklearn.ensemble import RandomForestClassifier  # 분류에 쓸 랜덤포레스트 모델
import joblib                                       # 모델을 파일로 저장/로드하는 도구

data = load_iris()                                  # 데이터 적재: 입력(X)과 정답(y), 라벨 이름이 들어 있음
X, y = data.data, data.target                       # X=꽃 측정값 4개, y=품종 번호(0,1,2)

model = RandomForestClassifier(n_estimators=100)    # 나무 100그루로 구성한 분류 모델 생성
model.fit(X, y)                                     # 데이터로 모델 학습(시험공부 단계)

joblib.dump(model, 'model.joblib')                  # 학습된 모델을 파일로 저장(주방에 보관)
joblib.dump(list(data.target_names), 'labels.joblib')  # 숫자→품종이름 변환표도 함께 저장
print('학습 완료, model.joblib 저장됨')             # 결과: 콘솔에 완료 메시지 출력


# ===== app.py : 저장한 모델을 API로 서빙하는 스크립트 =====
from fastapi import FastAPI                         # API 서버를 만드는 핵심 클래스
from pydantic import BaseModel                      # 입력 양식(스키마)을 정의하는 도구
import joblib                                       # 저장한 모델 파일을 불러오는 도구

app = FastAPI(title='Iris 분류 API')                # API 앱 본체 생성(식당 개업)
MODEL_VERSION = 'v1.0.0'                            # 모델 버전 문자열(응답에 함께 돌려줄 정보)
model = joblib.load('model.joblib')                # 서버 켜질 때 모델을 메모리에 한 번만 로드
labels = joblib.load('labels.joblib')              # 숫자 예측을 사람이 읽는 이름으로 바꿀 표

class IrisInput(BaseModel):                         # 클라이언트가 보낼 입력 양식 정의
    sepal_length: float                            # 꽃받침 길이(실수)
    sepal_width: float                             # 꽃받침 너비(실수)
    petal_length: float                            # 꽃잎 길이(실수)
    petal_width: float                             # 꽃잎 너비(실수)

@app.post('/predict')                              # POST /predict 주소를 이 함수에 연결
def predict(item: IrisInput):                      # 검증을 통과한 입력이 item 으로 들어옴
    features = [[item.sepal_length, item.sepal_width,   # 모델이 받는 2차원 형태로 입력 정리
                 item.petal_length, item.petal_width]]
    pred_num = int(model.predict(features)[0])      # 모델 예측(품종 번호 한 개)을 정수로 변환
    return {                                        # JSON 형태로 결과 응답
        'prediction': labels[pred_num],            # 번호를 품종 이름으로 바꿔서 반환
        'model_version': MODEL_VERSION             # 어떤 버전 모델이 답했는지 함께 반환
    }

@app.get('/health')                                # 서버가 살아있는지 확인하는 점검용 주소
def health():                                      # 모니터링 도구가 주기적으로 호출함
    return {'status': 'ok'}                         # 결과: {"status":"ok"} 반환
`,note:"train.py 를 먼저 실행해 모델 파일을 만든 뒤 `uvicorn app:app --reload` 로 서버를 켜면 /docs 에서 바로 테스트할 수 있다.\n모델은 서버 시작 시 한 번만 로드해야 매 요청이 빠르다."}],periods:["1교시 OT·모델 서빙이 왜 필요한가 (학습된 모델을 서비스로)","2교시 서빙 패턴 비교: 온라인·배치·스트림","3교시 [실습] 모델 저장·로드와 추론 함수 만들기","4교시 FastAPI 기초: 엔드포인트·요청/응답 모델","5교시 [실습] FastAPI 추론 API 만들고 호출하기","6교시 입력 검증·에러 핸들링·헬스체크·로깅 기초","7교시 비동기 처리(async/await)·배치로 처리량 높이기 + Lazy vs Eager 로딩(모델 패키징·버전관리는 참고)","8교시 [실습] 추론 REST API 완성·테스트·정리"]},"serving-2":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 컨테이너가 왜 필요한가: '내 컴에선 됐는데' 문제 해결"},{time:"10:00–10:50",topic:"2교시 Docker 핵심 개념: 이미지·컨테이너·레지스트리"},{time:"11:00–11:50",topic:"3교시 [실습] 추론 API 를 Dockerfile 로 이미지화·실행"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 확장(Scaling)과 오토스케일링·부하 대응 개념"},{time:"14:00–14:50",topic:"5교시 [실습] docker compose 로 여러 컨테이너 띄우기"},{time:"15:00–15:50",topic:"6교시 관측성(Observability): 메트릭·로그·트레이싱"},{time:"16:00–16:50",topic:"7교시 [실습] Prometheus 지표 노출과 모니터링 확인"},{time:"17:00–17:50",topic:"8교시 데이터·모델 드리프트 모니터링과 알림"}],practice:{title:"FastAPI 추론 서비스를 Docker 로 컨테이너화하고 Prometheus 지표로 모니터링하기",steps:["1일차에 만든 app.py 와 model.joblib 이 있는 폴더에 `requirements.txt` 를 만들어 fastapi·uvicorn·scikit-learn·joblib·prometheus-client 를 적는다.","같은 폴더에 `Dockerfile` 을 작성한다(베이스 이미지 지정→작업폴더 설정→의존성 설치→소스 복사→실행 명령 순서).","터미널에서 `docker build -t iris-api:v1 .` 로 이미지를 만든다(마지막 줄에 'Successfully tagged iris-api:v1' 이 보이면 성공).","`docker run -d -p 8000:8000 --name iris iris-api:v1` 로 컨테이너를 띄우고 `docker ps` 로 실행 중인지 확인한다.",'`curl http://localhost:8000/health` 로 컨테이너 안의 API 가 응답하는지 확인한다(기대 결과: {"status":"ok"}).',"app.py 에 prometheus-client 로 요청 수·지연시간 지표를 추가하고 `/metrics` 엔드포인트를 노출한다.","`docker-compose.yml` 을 작성해 추론 API 와 Prometheus 두 컨테이너를 함께 `docker compose up` 으로 띄운다.","브라우저로 Prometheus(`http://localhost:9090`)에 접속해 `predict_requests_total` 지표를 그래프로 조회한다(요청을 몇 번 보내면 숫자가 올라가는지 확인)."],deliverable:"Dockerfile·docker-compose.yml·requirements.txt 가 포함된, 컨테이너로 실행되며 /metrics 로 요청 수·지연 지표를 노출하고 Prometheus 가 수집하는 추론 서비스"}},examples:[{title:"이미지 빌드하고 컨테이너 실행하기",lang:"bash",code:`# 현재 폴더(.)의 Dockerfile 로 이미지를 만들고 이름표(tag)를 붙인다
docker build -t iris-api:v1 .
# 만든 이미지를 백그라운드(-d)로 실행하고 포트를 연결한다
docker run -d -p 8000:8000 --name iris iris-api:v1
# 지금 실행 중인 컨테이너 목록을 확인한다
docker ps                # 결과: iris 컨테이너가 8000포트로 Up 상태
`,note:"-d 는 백그라운드 실행, -p 호스트:컨테이너 는 포트를 바깥과 연결한다는 뜻이다."},{title:"컨테이너 로그 보고 정리하기",lang:"bash",code:`# iris 컨테이너가 출력한 로그를 실시간으로 따라 본다
docker logs -f iris      # 요청이 들어올 때마다 접근 로그가 흐름
# 다 봤으면 Ctrl+C 로 빠져나온 뒤 컨테이너를 멈추고 삭제한다
docker stop iris         # 컨테이너 정지
docker rm iris           # 정지된 컨테이너 삭제(정리)
`,note:"문제가 생기면 가장 먼저 `docker logs` 로 컨테이너가 남긴 기록을 확인한다."},{title:"모델 서빙 Dockerfile 작성하기 (FastAPI)",lang:"dockerfile",code:`# 1) 가벼운 파이썬 공식 이미지에서 시작한다(slim = 용량 최소화)
FROM python:3.12-slim

# 2) 컨테이너 안 작업 폴더를 정한다(이후 명령의 기준 경로)
WORKDIR /app

# 3) 의존성 목록만 먼저 복사해 설치한다
#    코드보다 먼저 복사해야, 코드만 바뀔 때 이 설치 층을 캐시로 재사용해 빌드가 빨라진다
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4) 나머지 앱 소스와 모델 파일을 복사한다
COPY . .

# 5) 컨테이너가 쓰는 포트를 문서화한다(실제 연결은 docker run -p 로)
EXPOSE 8000

# 6) 컨테이너 시작 시 실행할 명령 - uvicorn 으로 FastAPI 앱을 띄운다
#    host 는 반드시 0.0.0.0 이어야 컨테이너 바깥에서도 접속된다(127.0.0.1 이면 안에서만)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,note:"requirements 를 코드보다 먼저 COPY 하는 순서가 핵심 - 코드만 바뀔 때 pip 설치 층이 캐시되어 재빌드가 빨라진다. host 는 반드시 0.0.0.0."},{title:"헬스체크 + Prometheus 메트릭 엔드포인트 노출하기",lang:"python",code:`# pip install fastapi uvicorn prometheus-client
import time
from fastapi import FastAPI, Response
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST

app = FastAPI()

# 1) 지표 정의 - 누적 개수(Counter)와 응답시간 분포(Histogram)
REQS = Counter("predict_requests_total", "예측 요청 총 횟수")         # 계속 증가만 한다
LATENCY = Histogram("predict_latency_seconds", "예측 처리 시간(초)")  # 구간별 분포

@app.get("/health")   # 2) 헬스체크: 로드밸런서·쿠버네티스가 살아있는지 확인하는 용도
def health():
    return {"status": "ok"}   # 200 이면 정상 - 죽으면 트래픽을 안 보낸다

@app.post("/predict")
def predict(x: float):
    REQS.inc()                      # 요청 수 +1
    with LATENCY.time():            # 이 블록의 실행시간을 자동으로 히스토그램에 기록
        time.sleep(0.02)            # 실제로는 여기서 모델 추론을 한다
        result = x * 2
    return {"prediction": result}

@app.get("/metrics")  # 3) Prometheus 가 주기적으로 긁어가는(scrape) 엔드포인트
def metrics():
    # 수집된 지표를 Prometheus 텍스트 형식으로 내보낸다
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)`,note:"/health 는 생존 확인, /metrics 는 Prometheus 가 긁어갈 지표 노출구다. Counter(누적)와 Histogram(응답시간 분포)만 있어도 요청량·지연을 대시보드로 모니터링할 수 있다."},{title:"헬스체크 + 무중단 배포 개념",lang:"yaml",code:`# Kubernetes 프로브: 컨테이너가 살아있는지/요청 받을 준비됐는지 확인
livenessProbe:        # 죽으면 재시작
  httpGet: { path: /health, port: 8000 }
  initialDelaySeconds: 10
readinessProbe:       # 준비 전엔 트래픽 라우팅 제외
  httpGet: { path: /ready, port: 8000 }
  periodSeconds: 5
# readiness가 통과한 새 파드로만 트래픽 → 롤링 업데이트 무중단`,note:"liveness(생존)와 readiness(준비) 프로브를 구분한다. 모델 로딩이 끝나야 ready 를 반환하도록 구현."},{title:"docker-compose.yaml로 API + DB 한 번에 띄우기",lang:"yaml",code:`# docker-compose.yaml - FastAPI 앱과 MySQL DB를 한 번에 띄운다
services:
  demo-app:                       # (1) 우리 API 서비스
    build: .                      # 현재 폴더의 Dockerfile로 이미지를 빌드
    volumes:
      - .:/src                    # 호스트 코드를 컨테이너에 연결(저장하면 바로 반영)
    working_dir: /src             # 컨테이너 안 작업 폴더
    ports:
      - "8001:8001"               # 호스트 8001 -> 컨테이너 8001 포트 연결
    environment:
      WATCHFILES_FORCE_POLLING: "true"  # OS 상관없이 코드 변경 감지(핫 리로드)용
  db:                             # (2) 데이터베이스 서비스
    image: mysql:8.0              # MySQL 8.0 공식 이미지(실습은 오픈소스 MariaDB 권장)
    platform: linux/x86_64        # 애플 실리콘(M1/M2) 맥에서 필요
    environment:
      MYSQL_ALLOW_EMPTY_PASSWORD: "yes"  # 실습용: 루트 비번 없이 생성
      MYSQL_DATABASE: demo        # demo 데이터베이스를 초기 생성
      TZ: Asia/Seoul              # 시간대를 한국으로
    ports:
      - "33306:3306"              # 호스트 33306 -> 컨테이너 3306`,note:'docker compose up 한 번이면 API와 DB가 동시에 뜬다. volumes로 코드를 연결하고 WATCHFILES_FORCE_POLLING을 켜면 파일 저장 시 컨테이너가 바로 반영한다. 포트는 "호스트:컨테이너" 순서다.'},{title:"실행 중인 컨테이너 안에서 명령 실행하기 (docker compose exec)",lang:"bash",code:`# 1) 앱과 DB 컨테이너를 빌드하며 동시에 띄운다 (백그라운드 -d)
docker compose up -d --build

# 2) 새 패키지를 추가할 땐 실행 중인 app 컨테이너 안에서 poetry로 설치한다
docker compose exec demo-app poetry add sqlalchemy pymysql

# 3) db 컨테이너 안으로 들어가 demo 데이터베이스에 접속해 테이블을 확인한다
docker compose exec db mysql demo -e "SHOW TABLES;"

# 4) 의존성이 바뀌면 캐시를 무시하고 이미지를 다시 빌드한다
docker compose build --no-cache      # pyproject.toml 변경을 확실히 반영`,note:"exec는 이미 떠 있는 컨테이너 안에서 명령을 실행한다. 패키지 추가는 컨테이너 안 poetry로 해야 pyproject.toml/poetry.lock에 잠기고, 의존성이 바뀌면 --no-cache로 재빌드해야 반영된다."}],concepts:[{term:"컨테이너(Container)",desc:"프로그램과 그 실행에 필요한 라이브러리·설정을 한 상자에 통째로 담아, 어느 컴퓨터에서든 똑같이 실행되게 만든 '이사용 컨테이너 박스'다."},{term:"이미지(Image)",desc:"컨테이너를 찍어내는 '붕어빵 틀'로, 한 번 만들어 두면 같은 환경의 컨테이너를 몇 개든 똑같이 복제해 실행할 수 있다."},{term:"Dockerfile",desc:"이미지를 어떻게 만들지 한 줄씩 적은 '요리 레시피'로, 베이스 환경·설치할 것·실행 명령을 순서대로 기록한다."},{term:"오토스케일링(Auto Scaling)",desc:"요청이 몰리면 컨테이너 수를 자동으로 늘리고 한가하면 줄이는 기능으로, 손님이 많으면 알바를 더 부르는 식당 운영과 같다."},{term:"관측성(Observability)",desc:"서비스 내부가 지금 어떤 상태인지 메트릭·로그·트레이싱 세 가지 단서로 들여다보는 능력으로, 환자 몸 상태를 체온·일지·X-ray 로 파악하는 것과 비슷하다."},{term:"메트릭(Metric)",desc:"요청 수·응답 시간·CPU 사용률처럼 시간에 따라 변하는 숫자 지표로, 자동차 계기판의 속도·연료 게이지에 해당한다."},{term:"데이터 드리프트(Data Drift)",desc:"서비스 운영 중 들어오는 데이터의 분포가 학습 때와 점점 달라지는 현상으로, 옛날 지도로 새로 바뀐 길을 찾으면 자꾸 틀리는 것과 같다."},{term:"컨셉 드리프트(Concept Drift)",desc:"데이터 드리프트가 입력 데이터의 분포가 변하는 것이라면, 컨셉 드리프트는 입력과 정답 사이의 관계(규칙) 자체가 변하는 것이다. 스팸 필터에서 들어오는 메일 종류는 그대로인데 스패머가 수법을 바꿔 예전엔 정상이던 패턴이 이제 스팸이 되면, 입력은 그대로여도 모델이 틀리기 시작한다. 데이터 드리프트는 입력만 봐도 감지되지만, 컨셉 드리프트는 실제 정답(라벨)이 들어와 성능이 떨어지는 것을 봐야 확인되는 경우가 많아 더 까다롭다."}],detail:{topics:[{h:"Docker 핵심",items:["이미지 vs 컨테이너 차이","Dockerfile 작성 순서","레이어 캐시로 빌드 가속","포트 매핑(-p)과 볼륨(-v)","docker compose 로 다중 컨테이너"]},{h:"확장과 부하 대응",items:["수평 확장(scale out)","오토스케일링 기준(CPU·요청량)","로드밸런싱으로 트래픽 분배","헬스체크로 비정상 인스턴스 교체"]},{h:"관측성·드리프트",items:["메트릭(요청 수·지연·에러율)","로그 수집과 검색","분산 트레이싱","데이터/모델 드리프트 감시","이상 시 알림(alert)"]}],labs:[{title:"Lab 1. 추론 API 이미지로 굽기",steps:["app.py·model.joblib 이 있는 폴더에 requirements.txt 를 만든다.","Dockerfile 을 베이스→작업폴더→설치→복사→실행 순서로 작성한다.","`docker build -t iris-api:v1 .` 로 이미지를 만든다.","`docker images` 로 만들어진 이미지를 목록에서 확인한다.","`docker run -d -p 8000:8000 iris-api:v1` 로 실행하고 /health 를 호출해 본다."]},{title:"Lab 2. compose 로 모니터링까지 한 번에",steps:["app.py 에 prometheus-client 로 지표와 /metrics 를 추가한다.","prometheus.yml 에 api:8000 을 수집 대상으로 적는다.","docker-compose.yml 에 api·prometheus 두 서비스를 정의한다.","`docker compose up --build` 로 두 컨테이너를 함께 띄운다.","localhost:9090 에서 predict_requests_total 을 조회한다."]},{title:"Lab 3. 간단 드리프트 감시 만들기",steps:["학습 데이터의 각 입력 평균값을 기준값으로 저장한다.","최근 들어온 입력들의 평균을 계산하는 함수를 만든다.","기준값과 최근 평균의 차이가 임계치를 넘는지 비교한다.","임계치를 넘으면 콘솔에 '드리프트 의심' 경고를 출력한다.","일부러 다른 분포의 입력을 보내 경고가 뜨는지 확인한다.","경고가 발생하면 콘솔뿐 아니라 파일·로그에 '드리프트 알림' 레코드(시각·어떤 피처가·기준 대비 얼마나 벗어났는지)를 남긴다.","알림이 일정 횟수 이상 쌓이면 '재학습 필요' 플래그를 세우고, 재학습 스크립트를 호출하는 트리거 함수를 연결한다.","정상 분포로 기준 통계를 산출한 뒤 일부러 다른 분포를 주입해 이상탐지→알림→재학습 트리거가 순서대로 동작하는지 로그로 확인한다(Day3 AIOps 자동 대응의 축소판)."]},{title:"Lab 4. model_version 파라미터로 버전별 모델 서빙 + 미니 레지스트리",steps:["서로 다른 설정으로 학습한 모델 두 개를 model_v1.joblib, model_v2.joblib로 저장한다.","각 모델의 메타데이터(버전·학습일시·정확도·학습데이터 이름)를 registry.json(또는 SQLite)에 기록해 미니 레지스트리를 만든다.","/predict에 model_version 쿼리 파라미터를 추가한다(예: /predict?model_version=v2).","파라미터 값에 따라 registry에서 해당 버전의 파일 경로를 찾아 그 모델을 로딩·예측하도록 라우팅한다.","v1과 v2를 번갈아 호출해 다른 모델이 응답하는지, 응답에 어떤 버전이 답했는지 함께 반환되는지 확인한다.","응답이 이상하면 파라미터 하나만 바꿔 v1으로 되돌리는(롤백) 것을 체감한다(MLflow 레지스트리의 축소판)."]}],homework:["오늘 만든 Dockerfile 의 이미지 용량을 `docker images` 로 확인하고, 베이스 이미지를 slim 으로 바꾸거나 불필요한 파일을 빼서 용량을 줄인 뒤 전후 크기를 비교해 정리하라.","메트릭·로그·트레이싱 각각이 '문제를 발견·진단'하는 데 어떻게 다르게 쓰이는지, 응답이 갑자기 느려진 상황을 가정해 셋을 어떤 순서로 보는지 5문장 이내로 설명하라."]},theory:{theory:[{h:"'내 컴퓨터에선 됐는데요' 문제와 컨테이너",body:`개발자가 자기 노트북에서 잘 돌던 코드를 서버에 올리면 파이썬 버전이 다르거나 라이브러리가 없어서 갑자기 멈추는 일이 흔하다.
이 '환경이 달라서 생기는 사고'를 막아 주는 것이 컨테이너다.
컨테이너는 코드뿐 아니라 그 코드가 필요로 하는 모든 것(파이썬·라이브러리·설정)을 한 상자에 같이 담는다.

그래서 그 상자를 통째로 옮기면 어느 컴퓨터에서든 똑같이 동작한다.
이사할 때 짐을 컨테이너 박스에 담아 그대로 옮기면 새 집에서도 똑같이 풀 수 있는 것과 같은 원리다.
Docker 는 이런 컨테이너를 만들고 실행하는 가장 널리 쓰이는 도구다.`},{h:"확장(Scaling): 손님이 몰릴 때 견디는 법",body:`서비스를 운영하다 보면 평소엔 한가하다가 이벤트 때 갑자기 요청이 수십 배로 몰리는 일이 생긴다.
이때 컨테이너 한 개로는 버거우므로 똑같은 컨테이너를 여러 개 복제해 일을 나눠 맡기는데, 이를 수평 확장(scale out)이라고 한다.
오토스케일링은 이 늘리고 줄이는 일을 사람이 아니라 시스템이 요청량을 보고 자동으로 하게 만든 것이다.

식당으로 비유하면 손님이 밀려들 때 주방 인원을 늘리고, 한가해지면 다시 줄여 인건비를 아끼는 것과 같다.
컨테이너는 똑같은 복제본을 빠르게 찍어낼 수 있어서 이런 자동 확장에 매우 잘 맞는다.`},{h:"관측성: 메트릭·로그·트레이싱 세 친구",body:`서비스를 띄워 놓고 끝이 아니라, 지금 잘 돌고 있는지 늘 들여다봐야 한다.
이때 쓰는 세 가지 단서가 메트릭·로그·트레이싱이다.
메트릭은 '초당 요청 수 120건, 평균 응답 0.2초' 같은 숫자 지표로 전체 건강 상태를 보여 준다.
로그는 '언제 누가 어떤 요청을 했고 에러가 났다' 같은 사건 기록이라 문제의 원인을 찾을 때 본다.
트레이싱은 요청 하나가 여러 서비스를 거치는 경로와 각 구간 소요 시간을 따라가, 어디서 느려졌는지 짚어 준다.

또한 모델 서빙에서는 입력 데이터가 학습 때와 달라지는 '드리프트'를 함께 감시해야 모델이 조용히 나빠지는 것을 일찍 잡아낼 수 있다.`},{h:"드리프트를 어떻게 감시하고 알릴까: 기준통계·임계값·알림 설계",body:`(8교시) 모델은 배포된 순간부터 조용히 나빠질 수 있다. 코드는 그대로인데 세상이 바뀌어 들어오는 데이터가 학습 때와 달라지기 때문이다. 이걸 잡아내는 실무 절차는 세 단계다.

(1) 기준통계 잡기 — 학습에 쓴 데이터에서 각 입력 피처의 평균·표준편차·분포를 미리 계산해 '정상 기준'으로 저장해 둔다. 감시란 결국 '지금 들어오는 데이터가 이 기준에서 얼마나 벗어났나'를 재는 일이다.

(2) 이탈 측정과 임계값 — 최근 들어온 요청들의 평균이 기준에서 크게 벗어나거나 분포 모양이 달라지면 드리프트를 의심한다. 현업에서는 두 분포의 차이를 하나의 숫자로 요약하는 PSI(Population Stability Index) 같은 지표를 쓰는데, 원리는 '기준 대비 얼마나 이동했나'를 수치화하는 것이다. 여기에 '이 선을 넘으면 경고'라는 임계값(threshold)을 정해 둔다. 임계값이 너무 낮으면 자잘한 변화에도 알림이 쏟아지고(피로), 너무 높으면 문제를 늦게 잡는다 — 이 균형을 잡는 게 설계의 핵심이다.

(3) 데이터 vs 컨셉 드리프트, 그리고 알림 — 데이터 드리프트는 입력만 봐도 감지되지만, 컨셉 드리프트(입력↔정답 관계가 변함)는 실제 정답(라벨)이 뒤늦게 들어와 성능이 떨어지는 걸 봐야 확인되는 경우가 많아 더 까다롭다. 그래서 입력 분포 감시와 성능 지표 감시를 함께 건다. 임계값을 넘으면 콘솔·로그·메신저로 알림을 보내고, 같은 알림이 일정 횟수 쌓이면 '재학습 필요' 플래그를 세워 Day3 의 자동 대응(재학습 트리거)으로 넘긴다. 오늘 Lab 3 의 드리프트 시뮬레이션이 바로 이 감시→알림 흐름의 축소판이다.`},{h:"헬스체크의 두 얼굴: Liveness와 Readiness, 그리고 자가 치유",body:`Day1에서 만든 /health는 '서버 살아 있나요?' 한 가지만 답했다. 그런데 여러 컨테이너를 자동으로 굴리는 운영 환경(쿠버네티스 같은 오케스트레이터)에서는 이 질문을 두 갈래로 나눠서 물어야 한다.
첫째 Liveness(살아 있나)는 '이 컨테이너가 죽거나 멈춰 버린 건 아닌가'를 본다. 무한 루프에 빠지거나 응답이 완전히 끊기면 Liveness가 실패하고, 오케스트레이터는 그 컨테이너를 죽이고 새로 띄운다. 이것이 '자가 치유(self-healing)'다 — 새벽에 사람이 깨서 재시작하지 않아도 시스템이 알아서 되살린다.
둘째 Readiness(준비됐나)는 '지금 요청을 받아도 되나'를 본다. 서버 프로세스는 떴지만 아직 큰 모델을 메모리에 올리는 중이라면, 살아는 있어도 요청을 처리할 수 없다. 이때 Readiness를 '아직'으로 답하면 오케스트레이터는 그 컨테이너로 손님(트래픽)을 보내지 않고 기다린다. 준비가 끝나면 그제야 트래픽이 들어온다.
이 둘을 나누는 게 왜 중요한가. 새 버전을 배포할 때, 새 컨테이너가 Readiness '준비 완료'를 보내기 전까지 옛 컨테이너가 계속 손님을 받는다. 그래서 사용자는 배포 중에도 끊김을 느끼지 않는다 — 이것이 무중단(롤링) 배포의 원리다.
실무 감각 하나: Liveness 검사를 너무 무겁게(모델 추론까지) 만들면, 잠깐 느려졌을 뿐인데 멀쩡한 컨테이너가 자꾸 재시작되는 사고가 난다. Liveness는 가볍게 '프로세스 반응만', Readiness는 '모델 로드까지 끝났는지'로 나누는 습관을 들인다.`},{h:"리소스 요청·제한과 골든 시그널: 얼마를 주고, 무엇을 재나",body:`컨테이너를 여러 개 띄우면 한 대의 서버(노드) 위에서 자원(CPU·메모리)을 나눠 쓴다. 그래서 각 컨테이너에 '얼마나 쓸지'를 미리 정해 줘야 서로 싸우지 않는다. 여기 두 개의 숫자가 나온다.
requests(요청량)는 '이만큼은 보장해 줘'라는 최소 예약이다. 오케스트레이터는 이 값을 보고 어느 노드에 컨테이너를 얹을지 자리를 잡는다. limits(제한)는 '이 이상은 못 쓴다'는 상한이다. 메모리 limit을 넘어서면 컨테이너가 강제 종료되는데(OOMKilled), 큰 모델을 올리는 서빙에서는 이 사고가 흔하다. 그래서 모델이 실제로 먹는 메모리를 측정해 limit을 넉넉히 잡는 게 안정 운영의 기본이다.
자원을 정했으면 이제 '잘 돌고 있나'를 숫자로 봐야 한다. 앞서 배운 메트릭·로그·트레이싱이 도구라면, 무엇을 재야 하는지 압축한 것이 '골든 시그널' 네 가지다. (1) 지연(Latency) — 응답에 걸린 시간인데, 평균이 아니라 p95·p99(느린 쪽 상위 5%·1%)로 봐야 '대부분 빠른데 일부가 심하게 느린' 상황을 잡는다. (2) 트래픽(Traffic) — 초당 요청 수, 얼마나 붐비는지. (3) 에러율(Errors) — 실패한 요청의 비율. (4) 포화도(Saturation) — CPU·메모리·GPU가 한계에 얼마나 가까운지.
이 네 지표가 중요한 이유: 앞의 오토스케일링이 '언제 컨테이너를 늘릴지' 판단하는 근거가 바로 이 숫자들이기 때문이다. 예컨대 p95 지연이 기준을 넘거나 CPU 포화도가 높아지면 자동으로 복제본을 늘린다. 즉 헬스체크가 '죽었나 살았나', 골든 시그널이 '건강한가 지쳤나'를 말해 주고, 이 둘이 있어야 서빙이 스스로 버티고 늘어나는 시스템이 된다.`}]},realCodes:[{title:"추론 API 를 컨테이너로 만드는 Dockerfile + compose",lang:"bash",code:`# ===== Dockerfile : 추론 API 이미지를 만드는 레시피 =====
FROM python:3.11-slim          # 가볍고 파이썬 3.11이 깔린 베이스 이미지에서 시작
WORKDIR /app                   # 컨테이너 안 작업 폴더를 /app 으로 지정
COPY requirements.txt .        # 의존성 목록 파일만 먼저 복사(캐시 활용으로 빌드 빨라짐)
RUN pip install --no-cache-dir -r requirements.txt  # 목록대로 라이브러리 설치(캐시 없이 용량 절약)
COPY app.py model.joblib labels.joblib .  # 실제 코드와 모델 파일을 컨테이너로 복사
EXPOSE 8000                    # 이 컨테이너가 8000번 포트를 쓴다고 표시
# 0.0.0.0 으로 떠야 컨테이너 밖에서도 접속 가능
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]  # 컨테이너 시작 시 실행할 명령

# ===== docker-compose.yml : 추론API + Prometheus 두 개를 함께 실행 =====
services:                      # 띄울 컨테이너 묶음 정의 시작
  api:                         # 첫 번째 서비스 이름(추론 API)
    build: .                   # 현재 폴더의 Dockerfile 로 이미지 빌드
    ports:                     # 포트 연결(호스트:컨테이너)
      - "8000:8000"           # 내 PC 8000 → 컨테이너 8000 으로 연결
  prometheus:                  # 두 번째 서비스(지표 수집기)
    image: prom/prometheus     # 공개된 Prometheus 이미지 그대로 사용
    ports:                     # 포트 연결
      - "9090:9090"           # 내 PC 9090 → Prometheus 9090
    volumes:                   # 설정 파일을 컨테이너 안으로 연결
      - ./prometheus.yml:/etc/prometheus/prometheus.yml  # 수집 대상 설정 주입

# ===== 실행 명령 =====
# docker compose up --build    # 이미지 빌드 후 두 컨테이너를 한 번에 실행
# docker compose down          # 실행한 컨테이너를 모두 정리
`,note:`requirements.txt 만 먼저 COPY 해서 설치하면 코드만 바뀔 때 라이브러리 재설치를 건너뛰어 빌드가 빨라진다.
compose 로 묶으면 API 와 모니터링을 명령 한 줄로 함께 띄울 수 있다.`},{title:"FastAPI 에 Prometheus 모니터링 지표 붙이기",lang:"python",code:`from fastapi import FastAPI, Response          # API 본체와 응답 객체
from prometheus_client import Counter, Histogram, generate_latest  # 지표 도구들
import time                                    # 응답 시간 측정용
import joblib                                   # 모델 로드용

app = FastAPI()                                # API 앱 생성
model = joblib.load('model.joblib')            # 모델을 메모리에 로드

# 누적 카운터: 들어온 예측 요청 총 횟수를 센다
REQ_COUNT = Counter('predict_requests_total', '예측 요청 총 횟수')
# 히스토그램: 응답에 걸린 시간 분포를 기록한다
REQ_LATENCY = Histogram('predict_latency_seconds', '예측 처리 시간(초)')

@app.post('/predict')                          # 예측 엔드포인트
def predict(features: list[float]):            # 입력: 측정값 4개 리스트
    REQ_COUNT.inc()                            # 요청이 올 때마다 카운터 +1
    start = time.time()                        # 처리 시작 시각 기록
    pred = int(model.predict([features])[0])   # 모델 예측 수행
    REQ_LATENCY.observe(time.time() - start)   # 걸린 시간을 히스토그램에 기록
    return {'prediction': pred}                # 예측 결과 반환

@app.get('/metrics')                           # Prometheus 가 긁어갈 지표 노출 주소
def metrics():                                 # 주기적으로 호출됨
    # 수집한 모든 지표를 Prometheus 텍스트 형식으로 반환
    return Response(generate_latest(), media_type='text/plain')
`,note:`Counter 는 계속 쌓이는 숫자(요청 수), Histogram 은 값의 분포(응답 시간)를 재는 데 쓴다.
/metrics 만 열어 두면 Prometheus 가 알아서 주기적으로 가져간다.`},{title:"실전: docker-compose (API + Vector DB)",lang:"yaml",code:`# 추론 API와 pgvector DB를 한 번에 기동
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
  pgdata:`,note:"depends_on + healthcheck로 DB가 준비된 뒤 API를 띄운다. volume으로 DB 데이터를 영속화. 로컬·시연 환경을 한 명령(docker compose up)으로 재현."}],periods:["1교시 컨테이너가 왜 필요한가: '내 컴에선 됐는데' 문제 해결","2교시 Docker 핵심 개념: 이미지·컨테이너·레지스트리","3교시 [실습] 추론 API 를 Dockerfile 로 이미지화·실행","4교시 확장(Scaling)과 오토스케일링·부하 대응 개념","5교시 [실습] docker compose 로 여러 컨테이너 띄우기","6교시 관측성(Observability): 메트릭·로그·트레이싱","7교시 [실습] Prometheus 지표 노출과 모니터링 확인","8교시 데이터·모델 드리프트 모니터링과 알림"]},"serving-3":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 MLOps 가 풀려는 문제와 전체 그림"},{time:"10:00–10:50",topic:"2교시 실험 관리와 재현성: MLflow 로 추적하기"},{time:"11:00–11:50",topic:"3교시 [실습] MLflow 로 학습 파라미터·지표 기록"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 모델 레지스트리와 스테이지 승격"},{time:"14:00–14:50",topic:"5교시 [실습] 모델 등록·버전·Staging→Production"},{time:"15:00–15:50",topic:"6교시 CI/CD 로 학습·배포 자동화하기"},{time:"16:00–16:50",topic:"7교시 [실습] GitHub Actions 로 자동 빌드·배포 파이프라인"},{time:"17:00–17:50",topic:"8교시 AIOps: 이상탐지·자동 대응과 과정 마무리"}],practice:{title:"MLflow 실험 추적 + 모델 레지스트리 + GitHub Actions CI/CD 로 자동 배포 파이프라인 만들기",steps:["`pip install mlflow scikit-learn` 후 터미널에서 `mlflow ui` 를 실행하고 브라우저로 `http://127.0.0.1:5000` 에 접속해 실험 관리 화면을 연다.","`train.py` 에 `mlflow.start_run()` 블록을 넣어 하이퍼파라미터(n_estimators)와 정확도(accuracy)를 `log_param`·`log_metric` 으로 기록한다.","`train.py` 를 n_estimators 값을 바꿔 가며 여러 번 실행하고, MLflow UI 에서 실행(run)들의 정확도를 표로 비교한다.","가장 정확도가 높은 실행의 모델을 `mlflow.sklearn.log_model` 로 저장하고 레지스트리에 'iris-clf' 이름으로 등록한다.","MLflow UI 의 Models 탭에서 등록된 모델 버전을 'Staging' 으로, 검증 후 'Production' 으로 승격(promote)한다.","프로젝트를 GitHub 저장소로 올리고 `.github/workflows/mlops.yml` 워크플로 파일을 작성한다(체크아웃→파이썬 설치→의존성→학습→테스트 순서).","코드를 push 해서 GitHub Actions 탭에서 워크플로가 자동 실행되고 초록색 체크가 뜨는지 확인한다(기대 결과: 모든 단계 통과).","테스트가 실패하도록 일부러 코드를 깨뜨려 push 한 뒤, Actions 가 빨간 X 로 배포를 막아 주는지 확인하고 다시 고쳐 통과시킨다."],deliverable:"MLflow 로 실험이 추적·비교되고 best 모델이 레지스트리에 등록·승격되며, GitHub Actions 가 push 마다 학습·테스트를 자동 수행하는 end-to-end MLOps 파이프라인"}},examples:[{title:"MLflow 로 파라미터·지표 한 건 기록하기",lang:"python",code:`import mlflow                          # 실험 추적 도구

with mlflow.start_run():            # 실행 하나 시작
    mlflow.log_param('lr', 0.01)    # 학습률 설정값 기록
    mlflow.log_metric('acc', 0.95)  # 정확도 결과 기록
    print('기록 완료')              # 결과: MLflow UI 에 run 1개가 쌓임
`,note:"log_param 은 '내가 정한 설정', log_metric 은 '나온 결과'를 적는다고 구분하면 쉽다."},{title:"pytest 로 모델 정확도 기준 검증하기",lang:"python",code:`import joblib                          # 모델 로드
from sklearn.datasets import load_iris   # 검증 데이터
from sklearn.metrics import accuracy_score  # 정확도 계산

def test_accuracy_threshold():      # 이름이 test_ 로 시작하면 pytest 가 자동 실행
    model = joblib.load('model.joblib')  # 학습된 모델 불러오기
    X, y = load_iris(return_X_y=True)    # 검증용 입력·정답
    acc = accuracy_score(y, model.predict(X))  # 전체 정확도 계산
    assert acc > 0.9                 # 0.9 미만이면 테스트 실패(배포 차단)
`,note:"assert 가 거짓이면 테스트가 실패하고 CI 가 빨간불이 되어 나쁜 모델 배포를 막는다."},{title:"model_version 쿼리 파라미터로 버전 라우팅하기",lang:"python",code:`import json, joblib
from fastapi import FastAPI

app = FastAPI()
# registry.json 예: {"v1": "models/clf_v1.joblib", "v2": "models/clf_v2.joblib"}
registry = json.load(open('registry.json', encoding='utf-8'))
_cache = {}

def load_model(version):
    if version not in _cache:                 # 같은 버전은 한 번만 로드해 캐시
        _cache[version] = joblib.load(registry[version])
    return _cache[version]

@app.post('/predict')
def predict(x: float, model_version: str = 'v1'):  # 쿼리로 버전 선택
    model = load_model(model_version)
    pred = int(model.predict([[x]])[0])
    return {'prediction': pred, 'model_version': model_version}  # 어느 버전이 답했는지 함께 반환
`,note:"버전 파라미터 하나로 A/B 비교와 롤백이 가능해진다."},{title:"구조화 로깅(structured logging)으로 집계하기 좋게 남기기",lang:"python",code:`import json, time

def log_event(endpoint, latency_ms, status, model_version):
    # 사람이 읽는 문장 대신 JSON 한 줄로 남긴다
    line = json.dumps({
        'ts': time.time(),
        'endpoint': endpoint,
        'latency_ms': latency_ms,
        'status': status,
        'model_version': model_version,
    }, ensure_ascii=False)
    print(line)  # 실제로는 파일이나 로그 수집기로 보낸다

log_event('/predict', 42, 200, 'v2')
# 결과: {"ts": 1750000000.0, "endpoint": "/predict", "latency_ms": 42, "status": 200, "model_version": "v2"}
# 이렇게 쌓인 로그는 나중에 스크립트로 평균 응답시간·에러율을 쉽게 집계할 수 있다
`,note:"사람이 읽는 문장 로그보다 기계가 집계하기 좋은 구조화 로그가 모니터링·AIOps의 출발점이다."},{title:"AIOps 미니 - 로그 집계 → 임계값 경고 → 재학습 트리거 (python)",lang:"python",code:`import json                                        # 구조화 로그(JSON 한 줄)를 읽기 위함

# Day1에서 남긴 구조화 로그 파일을 한 줄씩 읽어 리스트로 만든다
# 각 줄 예: {"endpoint":"/predict","status":200,"latency_ms":42,"drift":0.03}
def read_logs(path='serving.log'):
    rows = []
    for line in open(path, encoding='utf-8'):
        line = line.strip()
        if line.startswith('{'):                   # JSON 형태의 줄만 골라
            rows.append(json.loads(line))          # 파이썬 딕셔너리로 변환
    return rows

# 로그에서 운영 지표 3종(평균 지연/에러율/평균 드리프트)을 집계한다
def aggregate(rows):
    n = len(rows) or 1                             # 0으로 나누기 방지
    avg_latency = sum(r['latency_ms'] for r in rows) / n           # 평균 응답시간
    error_rate = sum(1 for r in rows if r['status'] >= 500) / n    # 5xx 비율
    avg_drift = sum(r.get('drift', 0) for r in rows) / n           # 평균 드리프트 점수
    return {'avg_latency': avg_latency, 'error_rate': error_rate, 'avg_drift': avg_drift}

# 임계값(threshold)을 넘는 지표가 있으면 경고 목록을 만든다
THRESHOLDS = {'avg_latency': 300, 'error_rate': 0.05, 'avg_drift': 0.2}  # 운영 기준선

def check_and_alert(metrics):
    alerts = []
    for key, limit in THRESHOLDS.items():
        if metrics[key] > limit:                   # 기준선을 넘었으면
            alerts.append(f'[경고] {key}={metrics[key]:.3f} > 임계값 {limit}')
    for a in alerts:
        print(a)                                   # 실제로는 Slack/메일로 발송
    return alerts

# 드리프트 경고가 있으면 '재학습 트리거'를 당긴다 (Day1~3 자동 대응의 마무리)
def trigger_retrain(alerts):
    if any('avg_drift' in a for a in alerts):       # 드리프트 관련 경고가 있으면
        print('>> 재학습 파이프라인 트리거: train.py 실행 요청')
        # 실제로는 GitHub Actions 재실행/워크플로 dispatch API를 호출한다
        return True
    return False

if __name__ == '__main__':
    rows = read_logs()
    metrics = aggregate(rows)                       # 1) 로그 → 지표 집계
    print('집계 결과:', metrics)
    alerts = check_and_alert(metrics)               # 2) 임계값 초과 → 경고
    trigger_retrain(alerts)                         # 3) 드리프트면 → 재학습 트리거`,note:"Day1의 구조화 로그를 원재료로 삼아 '집계 → 임계값 경고 → 재학습 트리거'라는 AIOps 자동 대응의 최소 형태를 한 파일로 보여준다. 서빙(Day1)·컨테이너와 드리프트 감시(Day2)·자동화(Day3)가 하나의 파이프라인으로 이어지는 것을 마지막 8교시에서 이 코드로 회고한다."},{title:"데이터 드리프트 감지",lang:"python",code:`from scipy.stats import ks_2samp

# 학습 분포 vs 운영 입력 분포를 통계적으로 비교
def detect_drift(train_feature, live_feature, alpha=0.05):
    stat, p = ks_2samp(train_feature, live_feature)  # KS 검정
    # p < alpha 면 두 분포가 유의하게 다름 → 드리프트 경보
    return p < alpha

if detect_drift(train_X[:, 0], live_X[:, 0]):
    alert("입력 분포 변화 감지 — 재학습 검토")`,note:"운영 데이터가 학습 시점과 달라지면(드리프트) 성능이 조용히 저하된다. 통계 검정으로 자동 감시."},{title:"Depends(get_db)로 DB 세션 주입하고 404 처리하기",lang:"python",code:`from fastapi import FastAPI, Depends, HTTPException  # DI(Depends)와 예외 응답 도구
from sqlalchemy.orm import Session                   # DB 세션 타입

app = FastAPI()

# 요청마다 DB 세션을 열고, 끝나면 반드시 닫아 주는 의존성 함수
def get_db():
    db = SessionLocal()      # 세션 하나 생성(SessionLocal은 sessionmaker로 미리 정의)
    try:
        yield db             # 이 세션을 경로 함수에 주입해서 쓰게 한다
    finally:
        db.close()           # 요청 처리가 끝나면 세션을 닫는다(자원 누수 방지)

@app.put('/tasks/{task_id}')
# Depends(get_db)가 세션을 자동으로 만들어 db 인자에 넣어 준다(의존성 주입)
async def update_task(task_id: int, db: Session = Depends(get_db)):
    task = db.get(Task, task_id)   # id로 할 일 하나를 조회(Task는 ORM 모델)
    if task is None:               # 없는 id면
        raise HTTPException(status_code=404, detail='Task not found')  # 404로 없음을 알림
    task.title = '수정된 제목'      # 존재하면 내용을 수정
    db.commit()                    # 변경을 DB에 반영
    return {'id': task_id, 'title': task.title}`,note:"Depends(get_db)로 세션을 주입하면 비즈니스 로직과 DB가 느슨하게 묶여 테스트 때 다른 DB로 갈아끼우기 쉽다. 없는 리소스는 HTTPException(404)로 분명히 알려야 클라이언트가 정상/오류를 구분한다."},{title:"dependency_overrides로 DB를 갈아끼워 단위 테스트하기",lang:"python",code:`# 설치: pip install fastapi httpx pytest
from fastapi.testclient import TestClient  # 서버를 실제로 안 띄우고 호출하는 테스트 도구
from main import app, get_db               # 앞에서 만든 앱과 실제 DB 의존성

# 테스트용 가짜 DB 세션 - 진짜 DB 대신 이걸 쓰게 만든다
def fake_get_db():
    yield {'fake': True}                   # 실제 연결 없이 가짜 세션을 넘겨 준다

# dependency_overrides로 get_db를 통째로 가짜 버전으로 교체(프로덕션 코드는 그대로)
app.dependency_overrides[get_db] = fake_get_db
client = TestClient(app)                   # 앱을 감싼 테스트 클라이언트

def test_health():                         # test_로 시작하면 pytest가 자동 실행
    res = client.get('/health')            # 실제 네트워크 없이 앱 함수를 직접 호출
    assert res.status_code == 200          # 200이 아니면 테스트 실패
    assert res.json() == {'status': 'ok'}  # 응답 본문까지 정확히 확인`,note:"DI(Depends) 덕분에 dependency_overrides 한 줄로 실제 DB를 가짜로 교체할 수 있어, DB 없이도 API 로직을 재현 가능하게 테스트한다. TestClient는 서버를 띄우지 않고 앱을 직접 호출해 CI에서 빠르게 돌아간다."}],concepts:[{term:"MLOps",desc:"모델을 만들고(학습)·올리고(배포)·돌보는(운영) 전 과정을 자동화하고 체계화하는 방법으로, 소프트웨어 개발의 DevOps 를 머신러닝에 맞게 확장한 것이다."},{term:"실험 추적(Experiment Tracking)",desc:"모델을 학습할 때마다 어떤 설정으로 했고 결과가 얼마였는지 자동으로 기록해 두는 것으로, 요리할 때마다 레시피와 맛 점수를 노트에 적어 두는 것과 같다."},{term:"재현성(Reproducibility)",desc:"같은 코드·데이터·설정이면 누가 언제 돌려도 같은 결과가 나오게 하는 성질로, 똑같은 재료와 레시피면 같은 요리가 나오는 것과 같다."},{term:"모델 레지스트리(Model Registry)",desc:"학습된 모델들을 버전과 상태(개발·검증·운영)별로 정리해 보관하는 '모델 도서관'으로, 어떤 모델이 지금 서비스에 쓰이는지 한눈에 관리한다."},{term:"CI/CD",desc:"코드를 올리면 자동으로 검사(CI)하고 문제없으면 자동으로 배포(CD)하는 컨베이어 벨트로, 사람이 손으로 옮기다 생기는 실수를 없애 준다."},{term:"AIOps",desc:"운영 중 쏟아지는 로그·지표를 AI 가 분석해 이상을 자동으로 찾아내고 대응까지 돕는 것으로, 24시간 지켜보는 똑똑한 경비원에 비유할 수 있다."},{term:"스테이지 승격(Promotion)",desc:"검증을 통과한 모델 버전을 'Staging(검증)'에서 'Production(운영)'으로 단계 올려 실제 서비스에 투입하는 절차다."},{term:"MLOps 성숙도 단계",desc:"조직이 ML을 얼마나 자동화했는지를 나타내는 수준이다. 대략 0단계는 모든 걸 수동으로 노트북에서 학습·배포, 1단계는 학습 파이프라인 자동화로 새 데이터가 오면 자동 재학습(지속적 학습, CT), 2단계는 CI/CD까지 완전 자동화되어 코드·데이터 변경이 자동으로 테스트·배포로 이어진다. 단계가 올라갈수록 사람 개입과 실수가 줄고 반복 속도가 빨라진다."},{term:"재학습 트리거(Retraining Trigger)",desc:"모델을 다시 학습시킬 조건과 그것을 감지해 학습을 시작시키는 장치다. 정해진 주기(매주), 성능 하락(정확도가 기준 이하), 드리프트 감지(입력 분포 변화) 등이 방아쇠가 되어 재학습 파이프라인을 자동으로 돌린다."}],detail:{topics:[{h:"MLOps 파이프라인",items:["데이터→학습→평가→배포 흐름","실험 추적(MLflow)","재현성(seed·환경 고정)","파이프라인 자동화의 가치"]},{h:"모델 레지스트리·재현성",items:["모델 버전 관리","Staging vs Production 단계","스테이지 승격·롤백","메타데이터(지표·데이터셋) 보관"]},{h:"CI/CD·AIOps",items:["push 트리거 자동 검사","테스트 게이트로 배포 차단","자동 배포(CD)","AIOps 이상탐지·자동 알림·자동 대응"]}],labs:[{title:"Lab 1. MLflow 로 실험 비교하기",steps:["`pip install mlflow` 후 `mlflow ui` 를 실행해 5000포트를 연다.","train.py 에 start_run·log_param·log_metric 을 추가한다.","n_estimators 값을 바꿔 가며 3번 실행한다.","MLflow UI 의 Experiments 에서 세 run 의 accuracy 를 표로 본다.","정확도가 가장 높은 run 을 찾아 설정값을 적어 둔다."]},{title:"Lab 2. 모델 등록과 승격",steps:["best run 의 모델을 log_model 로 'iris-clf' 이름으로 등록한다.","MLflow UI 의 Models 탭에서 등록된 버전을 확인한다.","해당 버전을 'Staging' 단계로 바꾼다.","간단한 검증을 통과했다고 보고 'Production' 으로 승격한다.","이전 버전으로 되돌리는(롤백) 메뉴 위치도 찾아 확인한다."]},{title:"Lab 3. GitHub Actions 자동화",steps:["프로젝트를 GitHub 저장소에 올린다.",".github/workflows/mlops.yml 워크플로 파일을 작성한다.","체크아웃→파이썬→설치→학습→pytest 단계를 적는다.","코드를 push 하고 Actions 탭에서 실행을 지켜본다.","일부러 테스트를 깨뜨려 빨간 X 가 배포를 막는지 확인한다."]}],homework:["오늘 만든 MLflow 실험에 학습 데이터 버전·학습 소요 시간·혼동행렬 이미지를 추가로 기록(log_artifact)하고, 어떤 정보가 재현성에 도움이 되는지 3~4문장으로 정리하라.","AIOps 관점에서 '응답 지연 급증' 또는 '예측 분포 이상' 중 하나를 골라, 어떤 지표로 탐지하고 어떤 자동 대응(스케일 아웃·롤백·알림 등)을 연결할지 시나리오를 6~8문장으로 설계하라."]},theory:{theory:[{h:"MLOps는 DevOps와 무엇이 다르고, 성숙도는 어떻게 오르나",body:`일반 소프트웨어의 DevOps는 '코드'만 버전 관리하고 배포하면 되지만, ML은 코드에 더해 '데이터'와 '모델'이라는 두 변수가 계속 변한다.
그래서 MLOps는 코드뿐 아니라 데이터 버전·모델 버전·학습 실험까지 함께 추적하고, 배포 후에도 데이터가 바뀌면 성능이 떨어지므로 '지속적 학습(CT, Continuous Training)'이라는 개념이 더해진다.
즉 DevOps의 CI/CD에 '데이터·모델 검증'과 '재학습'이 더 붙은 것이 MLOps다.

성숙도 관점에서 처음엔 모든 것을 손으로 하지만(수동), 다음엔 학습 파이프라인을 자동화해 새 데이터에 자동 재학습하고, 마지막엔 CI/CD로 코드·데이터 변경이 자동 테스트·배포까지 흐르게 만든다.
오늘 실습은 이 사다리에서 '실험 추적 → 모델 레지스트리 → CI/CD 자동화'로 한 칸씩 올라가는 과정에 해당한다.`},{h:"MLOps 는 무슨 문제를 푸는가",body:`모델 하나를 만드는 것은 시작일 뿐이고, 진짜 어려움은 그 모델을 계속 새 데이터로 다시 학습하고, 더 좋은 버전으로 바꾸고, 문제가 생기면 되돌리는 '운영'에 있다.
이걸 사람이 손으로 하면 어떤 설정으로 학습했는지 잊어버리고, 어떤 모델이 지금 돌고 있는지 헷갈리며, 배포하다 실수가 난다.
MLOps 는 이 모든 과정을 기록·자동화·표준화해서 실수를 줄이고 빠르게 반복할 수 있게 만드는 방법이다.

쉽게 말해 '한 번 잘 만든 모델'이 아니라 '계속 잘 굴러가는 모델 공장'을 짓는 일이다.
오늘은 그 공장의 핵심 부품인 실험 추적·모델 레지스트리·CI/CD 를 직접 다뤄 본다.`},{h:"실험 추적과 재현성: 기억에 의존하지 않기",body:`모델을 개선하다 보면 '학습률을 0.01 로 했을 때가 좋았나, 0.001 이었나?' 하고 헷갈리는 순간이 반드시 온다.
사람 기억은 못 믿으므로, 학습할 때마다 설정(파라미터)과 결과(정확도 등)를 자동으로 적어 두는 것이 실험 추적이다.
MLflow 같은 도구를 쓰면 코드 몇 줄로 모든 실행이 표로 쌓여서, 어떤 설정이 가장 좋았는지 클릭 한 번으로 비교할 수 있다.

여기에 더해 같은 코드·데이터·설정이면 항상 같은 결과가 나오도록 보장하는 것이 재현성이다.
재현성이 있어야 'A 가 만든 좋은 모델'을 'B 도 똑같이 다시 만들' 수 있고, 문제가 생겼을 때 원인을 추적할 수 있다.`},{h:"CI/CD 와 AIOps: 자동화로 사람을 자유롭게",body:`CI/CD 는 코드를 저장소에 올리는 순간 자동으로 테스트하고, 통과하면 자동으로 배포까지 이어 주는 컨베이어 벨트다.
예를 들어 학습 코드를 고쳐 push 하면, 시스템이 알아서 모델을 다시 학습하고 정확도가 기준 이상인지 검사한 뒤 통과해야만 배포한다.
이렇게 하면 새벽에 사람이 수동으로 배포하다 실수하는 일을 없앨 수 있다.

AIOps 는 한 걸음 더 나아가, 운영 중에 쏟아지는 지표와 로그를 AI 가 분석해 평소와 다른 이상 징후를 자동으로 찾아내고 알림을 주거나 스스로 대응하게 한다.
사람은 모든 화면을 24시간 볼 수 없으므로, 이런 자동 감시·대응이 안정적인 서비스 운영의 마지막 퍼즐 조각이 된다.`},{h:"모델 레지스트리와 스테이지 승격: 지금 어떤 모델이 돌고 있나",body:`(4교시) 실험을 많이 하다 보면 모델 파일이 수십 개로 늘어난다. 'model_final_진짜최종_v2.joblib' 같은 이름이 쌓이면 어떤 게 지금 서비스에 쓰이는 모델인지 아무도 모르게 된다. 모델 레지스트리는 이 혼란을 없애는 '모델 도서관'이다.

핵심은 두 축이다. 첫째, '버전'. 같은 이름(예: iris-clf)으로 등록하면 새로 올릴 때마다 v1, v2, v3 처럼 번호가 자동으로 붙고, 각 버전에는 정확도·학습일시·학습데이터 같은 메타데이터가 함께 저장된다. 둘째, '스테이지(단계)'. 각 버전은 None → Staging(검증 중) → Production(운영) → Archived(퇴역) 라는 생애주기를 가진다. 지금 실제 서비스가 불러 쓰는 건 'Production 단계로 지정된 버전' 하나뿐이다. 그래서 서빙 코드는 파일 이름을 하드코딩하지 않고 '현재 Production 모델을 달라'고만 요청하면 된다.

'승격(Promotion)'은 검증을 통과한 버전을 Staging 에서 Production 으로 단계를 올려 실제 트래픽을 받게 하는 결정이다. 반대로 새 모델이 이상하면, 이전 버전을 다시 Production 으로 지정하기만 하면 즉시 예전 모델로 되돌아가는 '롤백'이 된다 — 파일을 다시 배포할 필요가 없다. 이렇게 레지스트리를 코드 저장소와 분리해 두면 '누가·언제·어떤 근거로 이 모델을 운영에 올렸나'가 기록으로 남아 안전하고 추적 가능해진다. 오늘 실습(Lab 2)에서 MLflow 로 이 등록→Staging→Production→롤백을 직접 눌러 본다.`}]},realCodes:[{title:"MLflow 로 실험 추적하고 best 모델 등록까지",lang:"python",code:`import mlflow                                    # 실험 추적 도구
import mlflow.sklearn                          # sklearn 모델 저장 전용 모듈
from sklearn.datasets import load_iris         # 연습용 데이터
from sklearn.ensemble import RandomForestClassifier  # 분류 모델
from sklearn.model_selection import train_test_split  # 데이터 분할
from sklearn.metrics import accuracy_score     # 정확도 계산

X, y = load_iris(return_X_y=True)              # 입력 X, 정답 y 한 번에 받기
# 학습용 80% / 검증용 20% 로 나눔(seed 고정으로 재현성 확보)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

mlflow.set_experiment('iris-classification')   # 실험 묶음 이름 지정(없으면 생성)

for n in [10, 50, 100]:                         # 나무 개수를 바꿔 가며 여러 실험 실행
    with mlflow.start_run():                   # 하나의 실행(run) 시작 — 이 블록이 한 실험
        model = RandomForestClassifier(n_estimators=n, random_state=42)  # 설정대로 모델 생성
        model.fit(X_tr, y_tr)                   # 학습 데이터로 학습
        acc = accuracy_score(y_te, model.predict(X_te))  # 검증 정확도 계산

        mlflow.log_param('n_estimators', n)    # 사용한 설정값 기록
        mlflow.log_metric('accuracy', acc)     # 결과 지표 기록
        # 모델 자체를 저장하고 레지스트리에 'iris-clf' 라는 이름으로 등록
        mlflow.sklearn.log_model(model, name='model', registered_model_name='iris-clf')
        print(f'n={n}, accuracy={acc:.3f}')    # 결과: 예) n=100, accuracy=0.967

# 실행 후 \`mlflow ui\` 를 켜고 5000포트에서 run 들의 정확도를 표로 비교하면 된다
`,note:`for 루프 안에서 설정만 바꿔 여러 run 을 남기면 MLflow UI 에서 어떤 설정이 가장 좋았는지 한눈에 비교된다.
random_state 를 고정해 같은 결과가 재현되도록 한 점이 중요하다.`},{title:"GitHub Actions 로 학습·테스트 자동화 (CI)",lang:"bash",code:`# 파일 위치: .github/workflows/mlops.yml
name: MLOps CI                     # 워크플로 이름(Actions 탭에 표시됨)
on:                                # 언제 이 워크플로를 돌릴지 정의
  push:                            # 코드가 push 될 때마다 자동 실행
    branches: [ main ]             # main 브랜치 push 만 대상
jobs:                              # 수행할 작업 묶음
  build-and-test:                  # 작업 이름
    runs-on: ubuntu-latest         # 깃허브가 빌려주는 우분투 가상머신에서 실행
    steps:                         # 순서대로 실행할 단계들
      - uses: actions/checkout@v4  # 1) 내 저장소 코드를 가상머신으로 내려받기
      - uses: actions/setup-python@v5  # 2) 파이썬 환경 준비
        with:
          python-version: '3.11'   # 사용할 파이썬 버전 지정
      - name: Install deps         # 3) 의존성 설치 단계
        run: pip install -r requirements.txt  # requirements 대로 라이브러리 설치
      - name: Train model          # 4) 모델 학습 실행
        run: python train.py       # 학습 스크립트 실행(모델 파일 생성)
      - name: Run tests            # 5) 테스트 실행(정확도 기준 검증 등)
        run: pytest -q             # 테스트 통과해야 다음으로 진행
# 한 단계라도 실패하면 빨간 X 가 뜨고 배포가 자동으로 막힌다
`,note:`push 한 순간 깃허브가 깨끗한 가상머신에서 위 단계를 순서대로 실행한다.
테스트가 실패하면 자동으로 배포가 차단되어 잘못된 모델이 서비스로 나가는 것을 막아 준다.`}],periods:["1교시 MLOps 가 풀려는 문제와 전체 그림","2교시 실험 관리와 재현성: MLflow 로 추적하기","3교시 [실습] MLflow 로 학습 파라미터·지표 기록","4교시 모델 레지스트리와 스테이지 승격","5교시 [실습] 모델 등록·버전·Staging→Production","6교시 CI/CD 로 학습·배포 자동화하기","7교시 [실습] GitHub Actions 로 자동 빌드·배포 파이프라인","8교시 AIOps: 이상탐지·자동 대응과 과정 마무리"]}};export{e as default};
