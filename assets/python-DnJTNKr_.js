const n={"python-1":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 개발환경과 실행 구조 (Homebrew · Python 3.11 · venv · AST→PVM)"},{time:"10:00–10:50",topic:"2교시 [실습] venv 생성 · pip · requirements.txt · VS Code 설정"},{time:"11:00–11:50",topic:"3교시 자료구조 시간복잡도 · 컴프리헨션 · 제너레이터"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 [실습] dataclass · TypedDict 로 데이터 모델링"},{time:"14:00–14:50",topic:"5교시 함수 · 파일 · 예외 (functools · Parquet · pathlib)"},{time:"15:00–15:50",topic:"6교시 [실습] 타입 힌트 · Pydantic · mypy"},{time:"16:00–16:50",topic:"7교시 코드 품질과 테스트: Ruff · pytest · 디버거"},{time:"17:00–17:50",topic:"8교시 [메인 실습] 비동기 · 병렬 (asyncio · httpx · 멀티프로세싱)"}],practice:{title:"공공 API 데이터를 비동기로 수집→검증→저장하는 재현 가능한 파이프라인 만들기",steps:["터미널에서 `python -m venv .venv` 로 가상환경을 만들고 활성화한 뒤, `pip install httpx pydantic pyarrow pandas pytest ruff` 를 설치하고 `pip freeze > requirements.txt` 로 버전을 고정한다.","무료 공공 API(예: 공공데이터포털·오픈 API) 하나를 정하고, `httpx.AsyncClient` 로 여러 페이지를 `asyncio.gather` 로 동시에 받아 오는 비동기 수집 함수를 작성한다.","받아 온 각 레코드를 Pydantic 모델(BaseModel)로 정의해 필수 필드·타입을 검증하고, 형식이 어긋나는 레코드는 걸러 내거나 오류를 남긴다.","검증을 통과한 레코드를 pandas DataFrame 으로 모아 `to_parquet` 로 Parquet 파일에 저장한다(같은 데이터를 CSV 대신 Parquet 로 저장하는 이유를 한 줄 메모).","핵심 함수(수집·검증·저장)에 대해 pytest 테스트를 최소 2개 작성해 `pytest` 로 모두 통과하는지 확인한다.","`ruff check .` 로 코드 스타일·오류를 검사하고 지적된 부분을 고쳐 통과시킨다.","전체 실행 스크립트(`main.py`)를 한 번 돌려 '수집 → 검증 → Parquet 저장'이 끊김 없이 완료되는지 확인한다.","`git init` 후 requirements.txt 를 포함해 커밋하고, 다른 사람이 clone 해 `pip install -r requirements.txt` 만으로 똑같이 재현되는지 점검한다."],deliverable:"재현 가능한(requirements.txt 포함) Git 저장소와 공공 API 수집·Pydantic 검증·Parquet 저장 스크립트, pytest 통과 로그"}},examples:[{title:"제너레이터로 대용량 파일을 메모리 아끼며 처리하기",lang:"python",code:`# 파일을 한 줄씩 흘려보내는 제너레이터(전체를 메모리에 올리지 않는다)
def read_lines(path):
    with open(path, encoding='utf-8') as f:
        for line in f:      # 파일 객체는 한 줄씩 순회할 수 있다
            yield line       # return 이 아니라 yield: 한 줄을 내주고 멈췄다 재개

# sum 이 제너레이터에서 한 줄씩 받아 길이를 더한다(리스트로 전부 읽지 않음)
total = sum(len(l) for l in read_lines('big.log'))
print('전체 글자 수:', total)  # 수 GB 로그도 적은 메모리로 처리 가능`,note:"리스트는 모든 줄을 한꺼번에 메모리에 올리지만, yield 제너레이터는 한 줄씩 흘려보내 큰 파일도 견딘다."},{title:"dataclass로 데이터 레코드 깔끔하게 정의하기",lang:"python",code:`from dataclasses import dataclass  # 반복되는 __init__ 을 자동으로 만들어 준다

@dataclass
class Order:
    name: str    # 상품명
    qty: int     # 수량
    price: int   # 단가

order = Order('사과', 3, 1000)   # 생성자를 직접 안 써도 필드 순서로 만들어진다
print(order.price)               # 결과: 1000 (점으로 필드 접근)
print(order)                     # 결과: Order(name='사과', qty=3, price=1000)`,note:"@dataclass 한 줄이면 생성자·출력 형식이 자동 생성되어 데이터 묶음을 짧게 표현할 수 있다."},{title:"Pydantic으로 입력값 검증하기",lang:"python",code:`from pydantic import BaseModel, Field, ValidationError

# 가격은 0보다 커야 한다는 규칙(gt=0)을 스키마에 새긴다
class OrderIn(BaseModel):
    name: str
    price: int = Field(gt=0)

# 올바른 입력은 통과하고 model_dump()로 dict 변환할 수 있다
ok = OrderIn(name='사과', price=1000)
print(ok.model_dump())  # 결과: {'name': '사과', 'price': 1000}

# 규칙을 어기면(음수 가격) ValidationError 로 걸러진다
try:
    OrderIn(name='사과', price=-1)
except ValidationError as e:
    print('검증 실패:', e.errors()[0]['msg'])  # 결과: 검증 실패: Input should be greater than 0`,note:"dataclass는 형태만 잡지만, Pydantic은 값의 규칙(양수·형식)까지 검사해 잘못된 입력을 자동으로 막아 준다."},{title:"functools·파일 IO·pathlib·예외를 한 흐름으로 (5교시 시연)",lang:"python",code:`from functools import reduce           # 목록을 하나의 값으로 '접는' 도구
from pathlib import Path              # OS에 상관없이 안전하게 경로를 다룬다
import json                          # JSON 파일 읽고 쓰기

# 1) 여러 주문 금액을 map/filter/reduce 로 한 줄씩 처리한다
prices = [12000, -1, 35000, 0, 8000]
valid = list(filter(lambda p: p > 0, prices))   # 0 이하(잘못된 값)를 걸러낸다
with_tax = list(map(lambda p: int(p * 1.1), valid))  # 모든 값에 부가세 10% 적용
total = reduce(lambda a, b: a + b, with_tax)    # 누적 합계로 접는다
print('부가세 합계:', total)                    # 결과: 부가세 합계: 60500

# 2) pathlib 로 경로를 만들고 JSON 으로 저장한다 (문자열 '+' 대신 / 연산)
out = Path('data') / 'summary.json'             # data/summary.json 경로 객체
out.parent.mkdir(exist_ok=True)                 # data 폴더가 없으면 만든다
out.write_text(json.dumps({'total': total}, ensure_ascii=False), encoding='utf-8')

# 3) 없을 수도 있는 파일을 예외 처리로 안전하게 읽는다
try:
    raw = Path('data/summary.json').read_text(encoding='utf-8')
    print('저장된 값:', json.loads(raw))         # 결과: 저장된 값: {'total': 60500}
except FileNotFoundError:
    print('파일이 없어 건너뜀')                   # 터지지 않고 다음으로 진행
`,note:"filter→map→reduce 로 반복문을 압축하고, pathlib 로 경로를, try/except 로 없는 파일을 안전하게 넘기는 실무 파이프라인의 뼈대다."},{title:"pytest 로 정제 함수 테스트하고 Ruff 로 정리 (7교시 시연)",lang:"python",code:`# clean.py - 테스트 대상이 되는 정제 함수
def clean_prices(prices):
    '''0 이하 값을 걸러내고 정상 금액만 돌려준다.'''
    return [p for p in prices if p is not None and p > 0]

# test_clean.py - pytest 가 자동으로 찾아 실행하는 테스트 파일
# (파일명 test_ 로 시작, 함수명도 test_ 로 시작해야 인식된다)
from clean import clean_prices

def test_음수와_None_이_제거된다():
    # given: 정상값 2개 + 잘못된 값 3개
    result = clean_prices([12000, -1, None, 0, 8000])
    # then: 정상값 2개만 남아야 한다
    assert result == [12000, 8000]

def test_빈_목록은_빈_목록을_돌려준다():
    assert clean_prices([]) == []

# 터미널에서 실행:
#   pytest            -> .. 처럼 통과 개수가 뜨고, 틀리면 어디가 왜 틀렸는지 보여준다
#   ruff check .      -> 사용 안 한 import, 스타일 오류를 찾아 준다
#   ruff format .     -> 들여쓰기·따옴표를 자동으로 통일한다
`,note:"assert 로 '기대값'을 코드에 박아 두면, 나중에 함수를 잘못 고쳤을 때 pytest 가 즉시 빨간불을 켜 준다. Ruff 는 검사와 정리를 한 번에 한다."},{title:"asyncio·httpx 로 여러 API를 동시에 수집 (8교시 시연)",lang:"python",code:`import asyncio          # 비동기 실행을 관리하는 표준 라이브러리
import httpx            # async 를 지원하는 최신 HTTP 클라이언트

# 한 개의 주소를 비동기로 받아오는 코루틴(async 함수)
async def fetch(client, url):
    r = await client.get(url)      # await: 응답을 기다리는 동안 다른 일을 양보
    return r.status_code           # 상태코드만 돌려준다(200 이면 성공)

async def main():
    urls = [f'https://httpbin.org/delay/1' for _ in range(5)]  # 각 1초 지연되는 5개
    async with httpx.AsyncClient(timeout=10) as client:
        # gather: 5개 요청을 순서대로가 아니라 '동시에' 띄운다
        results = await asyncio.gather(*[fetch(client, u) for u in urls])
    print('응답 코드들:', results)   # 결과: 응답 코드들: [200, 200, 200, 200, 200]

# 순서대로면 5초, 동시 처리면 약 1초 - 기다림을 겹쳐 시간을 아낀다
asyncio.run(main())
`,note:"각 요청이 1초씩 걸려도 gather 로 동시에 띄우면 전체가 약 1초에 끝난다. 네트워크처럼 '기다림이 많은' 작업에서 asyncio 의 효과가 가장 크다."},{title:"Parquet으로 저장하고 필요한 열만 골라 읽기 (예외처리 포함)",lang:"python",code:`import pandas as pd                    # 표(DataFrame) 처리 라이브러리

# 도시별 날씨 수집이 끝났다고 가정한 표
df = pd.DataFrame({
    "도시": ["서울", "도쿄", "뉴욕", "런던"],            # 도시 이름
    "기온": [25.7, 28.1, 23.0, 24.3],                  # 현재 기온(도)
    "현지시각": ["16:46", "16:46", "03:46", "08:46"],   # 각 도시의 현지 시각
})

df.to_parquet("weather.parquet")       # parquet(열 단위 압축 형식) 파일로 저장

try:                                   # 파일이 없을 수도 있으니 예외 대비
    slim = pd.read_parquet("weather.parquet", columns=["도시", "기온"])  # 필요한 열만 읽기
    print(slim)                        # 현지시각 없이 도시·기온 2개 열만 나온다
except FileNotFoundError:              # 파일이 없으면 이 블록으로
    print("weather.parquet 이 없습니다. 저장 단계를 먼저 실행하세요.")

# CSV 는 행 단위, parquet 은 열 단위 저장 — 그래서 '필요한 열만' 골라 읽을 수 있다
# 데이터가 커질수록 읽기 속도와 파일 용량 모두 parquet 이 유리하다`,note:"윤선영 실습교수의 데이터분석 Python 종합실습1 3~4번(Weather 객체를 csv·parquet 으로 저장하고 도시·기온만 읽어오기, 파일 없으면 예외처리)을 왕초보용으로 줄였다. CSV 와 달리 parquet 은 columns 인자로 필요한 열만 읽을 수 있다는 점과 FileNotFoundError 대비가 핵심이다.",origin:"practice",source:"윤선영 실습교수(울산 3반) — 파이썬 실습·종합실습 배포 자료"},{title:"수집→검증→저장을 한 스크립트로 — 미니 데이터 파이프라인",lang:"python",code:`import httpx                              # HTTP 요청 라이브러리
import pandas as pd                       # 표 처리
from pydantic import BaseModel, ValidationError   # 데이터 검증 도구

class Product(BaseModel):                 # 상품 1건이 갖춰야 할 형태 선언
    id: int                               # 상품 번호는 정수
    title: str                            # 상품명은 문자열
    price: float                          # 가격은 실수

rows = []                                 # 검증을 통과한 데이터만 담을 목록
for i in range(1, 4):                     # 상품 1~3번을 차례로 수집
    r = httpx.get(f"https://fakestoreapi.com/products/{i}", timeout=10)  # API 호출
    try:                                  # 받은 데이터가 형태에 맞는지 검사
        p = Product(**r.json())           # JSON 을 스키마에 통과시켜 검증
        rows.append({"번호": p.id, "제품명": p.title, "가격": p.price})   # 통과분만 적재
    except ValidationError:               # 형태가 어긋난 데이터는
        print(i, "번 상품 검증 실패 — 건너뜀")   # 프로그램을 멈추지 말고 기록만 남긴다

df = pd.DataFrame(rows)                   # 검증 통과분으로 표 생성
df.to_csv("products.csv", index=False)    # 사람이 열어 보기 좋은 CSV 로 저장
df.to_parquet("products.parquet")         # 분석용으로 빠른 parquet 으로도 저장
print("수집→검증→저장 완료:", len(df), "건")   # 파이프라인 결과 한 줄 요약`,note:"윤선영 실습교수 가이드의 평가 과제(fakestoreapi 데이터 수집 → Pydantic 스키마 검증+예외처리 → CSV·Parquet 저장을 하나의 자동화 스크립트로, 배점 40점)를 축소 재현했다. 지금까지 따로 배운 httpx·Pydantic·파일 저장을 처음으로 한 흐름에 이어 붙이는 것이 포인트다. 불량 데이터 1건 때문에 전체가 죽지 않도록 건너뛰고 기록하는 습관도 함께 익힌다.",origin:"practice",source:"윤선영 실습교수(울산 3반) — 파이썬 실습·종합실습 배포 자료"},{title:"실습1: 매출 레코드 집계 — Counter·defaultdict·컴프리헨션 (Practice 1)",lang:"python",code:`# 실습1(Practice 1): 매출 레코드를 자료구조로 집계하기
from collections import Counter, defaultdict  # 빈도 집계·그룹핑 전용 자료구조

# Python_Practice1_Data.json 을 흉내 낸 Sales 레코드(행: 날짜·지역·금액·품목)
sales = [
    {'date': '2026-01', 'region': '서울', 'amount': 1500, 'category': '가전'},
    {'date': '2026-01', 'region': '부산', 'amount': 800,  'category': '의류'},
    {'date': '2026-02', 'region': '서울', 'amount': 1200, 'category': '가전'},
    {'date': '2026-02', 'region': '서울', 'amount': 300,  'category': '식품'},
    {'date': '2026-02', 'region': '부산', 'amount': 2000, 'category': '가전'},
]

# 1) amount >= 1000 인 거래만 남긴다(리스트 컴프리헨션 = 필터+수집 한 줄)
big = [r for r in sales if r['amount'] >= 1000]

# 2) Counter 로 '지역별 거래 건수'를 센다(직접 루프 대신 - 감점 회피)
region_count = Counter(r['region'] for r in big)
print('지역별 건수:', region_count.most_common())  # 많은 순으로 정렬 보장

# 3) defaultdict 로 '카테고리별 금액 리스트'를 모은다(키 없으면 빈 리스트 자동 생성)
by_cat = defaultdict(list)
for r in big:
    by_cat[r['category']].append(r['amount'])

# 4) 딕셔너리 컴프리헨션으로 '지역별 총매출' dict 를 만든다
region_total = {reg: sum(r['amount'] for r in big if r['region'] == reg)
                for reg in region_count}
print('지역별 총매출:', region_total)   # {'서울': 2700, '부산': 2000}

# 5) 금액 상위 3건을 내림차순 정렬(정렬 기준 key=금액, reverse)
top3 = sorted(big, key=lambda r: r['amount'], reverse=True)[:3]
assert region_total['서울'] == 2700  # 체크포인트: 값이 맞는지 assert 로 자가검증`,note:"Practice 1의 정석 흐름: for 루프 대신 컴프리헨션, 직접 카운팅 대신 Counter, if-키확인 대신 defaultdict를 쓰는 것이 채점 감점 회피 포인트다. assert로 집계 결과를 스스로 검증한다."},{title:"실습1: 리스트 vs 제너레이터 메모리 비교 (Practice 1 체크포인트)",lang:"python",code:`# 실습1: 같은 결과, 다른 메모리 — 제너레이터가 왜 대용량에 강한가
import sys  # 객체가 차지하는 바이트를 재는 표준 모듈

# 1) 리스트: 1000만 개 제곱값을 '한꺼번에' 메모리에 올린다
squares_list = [x * x for x in range(10_000_000)]

# 2) 제너레이터: 같은 계산을 '필요할 때 하나씩' 만든다(괄호가 () 이면 제너레이터)
squares_gen = (x * x for x in range(10_000_000))

# 3) 두 객체의 메모리 크기를 비교한다
print('리스트   :', sys.getsizeof(squares_list), 'bytes')  # 수천만 bytes
print('제너레이터:', sys.getsizeof(squares_gen), 'bytes')   # 100 bytes 대

# 4) 체크포인트: 제너레이터가 리스트보다 훨씬 작아야 한다
assert sys.getsizeof(squares_gen) < sys.getsizeof(squares_list)

# 5) 단, 제너레이터는 '한 번만' 흐른다 — 합을 구하면 소진된다
total = sum(squares_gen)  # 하나씩 꺼내 더함(전부 메모리에 올리지 않음)
print('합계:', total, '/ 다시 세면:', sum(squares_gen))  # 두 번째는 0(이미 소진)`,note:"Checkpoint는 sys.getsizeof(generator) < list 확인을 요구한다. 이때 제너레이터를 list()로 바꿔 비교하면 메모리 차이가 사라져 감점되므로, 변환하지 말고 그대로 크기를 재는 것이 핵심이다."},{title:"실행 구조 눈으로 보기 — dis로 바이트코드 확인 (1장)",lang:"python",code:`# 소스 -> AST -> 바이트코드 -> PVM: 파이썬이 코드를 실행하는 진짜 순서
import dis  # 함수가 어떤 바이트코드로 컴파일되는지 보여주는 표준 모듈

# 아주 단순한 덧셈 함수 하나를 정의한다
def add(x, y):
    return x + y  # 이 한 줄이 실제로 어떤 명령들로 쪼개지는지 확인

# dis 로 내부 바이트코드 명령을 출력한다
dis.dis(add)
# 출력(요지):
#   LOAD_FAST   x    <- 지역변수 x 를 스택에 올림
#   LOAD_FAST   y    <- 지역변수 y 를 스택에 올림
#   BINARY_OP   +    <- 스택 위 두 값을 더함
#   RETURN_VALUE     <- 결과를 반환

# CPython 은 소스를 기계어가 아니라 '바이트코드'로 바꿔 PVM 이 한 줄씩 실행한다.
# 이 구조를 알면 __pycache__(.pyc)가 왜 생기는지, 그리고 컴프리헨션이
# for 루프보다 빠른 이유(생성되는 바이트코드 수가 더 적음)를 납득할 수 있다.`,note:'교재 1장의 dis·LOAD_FAST·BINARY_OP·RETURN_VALUE 설명을 그대로 실습으로. "왜 컴프리헨션이 빠른가"를 느낌이 아니라 바이트코드 개수로 이해하게 하는 개념 데모다.'},{title:"list vs set — 자료구조 선택이 속도를 가른다 (timeit 실측)",lang:"python",code:`import timeit                      # 코드 실행 시간을 반복 측정하는 표준 모듈

data_list = list(range(100_000))   # 10만 개 숫자를 담은 리스트
data_set = set(data_list)          # 같은 숫자를 담은 집합(내부는 해시 테이블)

# 리스트의 in 검사: 앞에서부터 하나씩 훑는다 - O(n)
t_list = timeit.timeit(lambda: 99_999 in data_list, number=1000)
# 집합의 in 검사: 해시로 위치를 바로 찾는다 - O(1)
t_set = timeit.timeit(lambda: 99_999 in data_set, number=1000)

print('리스트 검색:', round(t_list, 4), '초')   # 집합보다 수백 배 느리다
print('집합 검색  :', round(t_set, 6), '초')    # 거의 0에 가깝다

# set 은 중복 제거에 더해 집합 연산까지 한 줄로 된다
a = {'서울', '부산', '대구'}       # 이번 달 매출이 있는 지역
b = {'서울', '인천'}               # 프로모션 대상 지역
print('교집합:', a & b)            # 결과: {'서울'} - 둘 다 해당
print('차집합:', a - b)            # 결과: {'부산', '대구'} - 매출만 있는 곳`,note:"같은 in 검사라도 리스트는 전부 훑고(O(n)) 집합은 해시로 바로 찾는다(O(1)). timeit 으로 반복 측정하면 감이 아니라 숫자로 차이를 확인할 수 있어, 자료구조 선택 기준을 몸으로 익히게 된다."},{title:"TypedDict + mypy — dict 에 타입 계약을 새겨 실행 전에 오류 잡기",lang:"python",code:`from typing import TypedDict       # dict 모양에 타입 힌트를 입히는 도구

# dict 를 그대로 쓰되, 어떤 키에 어떤 타입이 오는지 '계약'을 선언한다
class SalesRow(TypedDict):
    date: str      # 날짜 문자열
    region: str    # 지역명
    amount: float  # 매출액(실수)

# CSV 한 행을 읽었다고 가정 - 겉모습은 평범한 dict 다
row: SalesRow = {'date': '2026-01', 'region': '서울', 'amount': 1500.0}
print(row['region'])               # 일반 dict 처럼 자유롭게 사용

# 타입 힌트가 있으면 정적 검사기가 실수를 '실행 전에' 잡아 준다
def compute_avg(values: list[float]) -> float:
    return sum(values) / len(values)   # 평균 계산

# compute_avg(['a', 'b'])   # <- 문자열 리스트를 넘기는 실수(주석 해제해 실험)
# 터미널에서:  mypy analysis.py
#   error: Argument 1 has incompatible type 'list[str]'; expected 'list[float]'
# 수백만 행을 처리한 뒤 터지는 것보다, 실행 전에 빨간 줄로 아는 편이 훨씬 싸다`,note:"dataclass 가 클래스형 레코드라면 TypedDict 는 dict 를 그대로 쓰면서 타입만 계약하는 방식이라 Pandas 행·JSON 과 궁합이 좋다. mypy 나 VS Code Pylance 가 이 힌트를 읽어 컬럼 타입 실수를 런타임 전에 차단해 준다."},{title:"ProcessPoolExecutor — CPU 무거운 전처리를 코어 수만큼 병렬로",lang:"python",code:`from concurrent.futures import ProcessPoolExecutor  # 여러 프로세스로 나눠 실행
import multiprocessing as mp       # 내 컴퓨터의 CPU 코어 수 확인용

# CPU 를 많이 쓰는 무거운 계산(행 단위 전처리라고 가정)
def process_chunk(chunk):
    return [x * x % 97 for x in chunk]   # 청크 안의 값을 하나씩 변환

def split_chunks(data, n):         # 데이터를 코어 수만큼 등분하는 함수
    size = len(data) // n          # 청크 하나의 크기
    return [data[i*size:(i+1)*size] for i in range(n)]   # n 개 조각으로 분할

if __name__ == '__main__':         # 멀티프로세싱은 이 가드가 반드시 필요하다
    data = list(range(1_000_000))  # 처리할 큰 데이터(100만 건)
    n_cores = mp.cpu_count()       # CPU 코어 수(예: 8)
    chunks = split_chunks(data, n_cores)   # 코어 수만큼 청크 분할
    with ProcessPoolExecutor(max_workers=n_cores) as exe:
        results = list(exe.map(process_chunk, chunks))   # 청크들을 동시에 처리
    total = sum(len(r) for r in results)   # 조각난 결과를 다시 합친다
    print(n_cores, '코어로', total, '건 병렬 처리 완료')   # 이론상 코어 수배 빨라진다`,note:"asyncio 는 네트워크처럼 기다림이 많은 작업용이고, 계산 자체가 무거운 작업은 GIL 을 우회하는 멀티프로세싱이 답이다. 데이터를 코어 수만큼 등분해 ProcessPoolExecutor.map 에 넘기는 것이 대용량 전처리의 기본 병렬 패턴이다."},{title:"cProfile — 느린 함수를 느낌이 아니라 측정으로 찾기",lang:"python",code:`import cProfile                    # 함수별 호출 횟수·누적 시간을 재는 표준 도구

def load_data():                   # 1단계: 데이터 읽기(빠르다고 가정)
    return list(range(200_000))

def slow_clean(data):              # 2단계: 일부러 느리게 만든 정제 함수(병목 후보)
    out = []
    for x in data:                 # 파이썬 루프 + 문자열 변환이라 느리다
        out.append(str(x).zfill(8))
    return out

def summarize(data):               # 3단계: 요약 통계(빠르다)
    return sum(len(s) for s in data)

def analysis():                    # 전체 분석 흐름을 하나로 묶은 함수
    data = load_data()             # 읽고
    cleaned = slow_clean(data)     # 정제하고
    return summarize(cleaned)      # 요약한다

# cumtime(누적 시간) 순으로 정렬해 어느 함수가 오래 걸렸는지 표로 출력
cProfile.run('analysis()', sort='cumtime')
# 출력에서 slow_clean 이 시간 대부분을 차지함을 확인 -> 최적화는 여기부터`,note:"느리다는 느낌만으로 아무 곳이나 고치면 헛수고가 되기 쉽다. cProfile 로 함수별 누적 시간을 먼저 재고, 가장 오래 걸린 함수 하나만 벡터화·병렬화하는 것이 올바른 최적화 순서다."},{title:"Practice 2 데이터 받기 — json.load로 판매 데이터 읽기",lang:"python",files:[{label:"Python_Practice2_Data.json 내려받기",href:"/practice/Python_Practice2_Data.json"}],code:`# Practice 2 데이터: 사이트에서 내려받아 코드와 같은 폴더에 둔다
#   https://skala.dreamitbiz.com/practice/Python_Practice2_Data.json
import json                                    # 표준 라이브러리 — 설치 불필요

# 1) 파일을 열고 json.load 로 파이썬 객체로 변환한다
with open("Python_Practice2_Data.json", encoding="utf-8") as f:
    sales = json.load(f)                       # 리스트[딕셔너리] 형태로 읽힌다

# 2) 구조부터 확인하는 습관 — 몇 건인지, 한 건이 어떻게 생겼는지
print(len(sales))                              # 100  (판매 기록 100건)
print(sales[0])                                # {'region': '서울', 'category': '전자', 'amount': 1500, 'month': '2024-01'}

# 3) 필드 확인: region(지역) · category(품목) · amount(금액) · month(연-월)
#    ※ 문제지에는 date 로 나오지만, 이 파일은 month 로 제공된다 — 변수명 month 로 진행해도 된다(강사 공지)
for row in sales[:3]:                          # 앞 3건만 훑어보기
    print(row["month"], row["region"], row["category"], row["amount"])`,note:"json.load(파일객체)와 json.loads(문자열)를 구분하자. 분석 코드를 짜기 전에 len()과 첫 항목 출력으로 데이터 모양부터 확인하는 것이 실수를 줄이는 가장 빠른 길이다."},{title:"Practice 2 집계 — 월별·지역별 매출 합계와 품목 Top",lang:"python",files:[{label:"Python_Practice2_Data.json 내려받기",href:"/practice/Python_Practice2_Data.json"}],code:`# Practice 2 본 과제: 읽어 온 판매 데이터를 기준별로 집계한다
import json
from collections import defaultdict, Counter  # 집계 전용 도구 2가지

with open("Python_Practice2_Data.json", encoding="utf-8") as f:
    sales = json.load(f)                       # 100건 로드

# 1) 월(month)별 매출 합계 — 키가 없으면 0에서 시작하는 defaultdict
by_month = defaultdict(int)
for row in sales:
    by_month[row["month"]] += row["amount"]    # 같은 달끼리 금액 누적
for month in sorted(by_month):                 # 1월부터 순서대로
    print(month, by_month[month])

# 2) 지역(region)별 매출 합계 — 같은 패턴 재사용
by_region = defaultdict(int)
for row in sales:
    by_region[row["region"]] += row["amount"]
print(sorted(by_region.items(), key=lambda x: -x[1]))   # 매출 큰 지역부터

# 3) 품목(category) 판매 건수 Top 2 — 건수 세기는 Counter 한 줄
top = Counter(row["category"] for row in sales)
print(top.most_common(2))                      # [('전자', n1), ('의류', n2)] 형태`,note:"합계 집계는 defaultdict(int), 건수 집계는 Counter — 이 두 도구만 알면 Practice 2 유형은 전부 풀린다. 같은 for 패턴을 키만 바꿔 재사용하는 감각을 익히자."},{title:"Practice 1 완주 가이드 ① — 컴프리헨션 필터·지역별 총매출·Counter·defaultdict",lang:"python",files:[{label:"Python_Practice2_Data.json 내려받기",href:"/practice/Python_Practice2_Data.json"}],code:`# [Practice 1 - 전반부] 판매 데이터 필터링·집계 프로그램
# 설명: JSON 판매 데이터에서 amount >= 1000 거래만 골라
#       지역별 총매출·거래 건수·카테고리별 금액 목록을 집계한다
# 변경내역: v1.0 최초 작성
import json                                    # JSON 파일 읽기
from collections import Counter, defaultdict  # 집계 전용 자료구조 2종

def load_sales(path):
    """판매 JSON을 읽어 리스트로 반환한다. 실패하면 빈 리스트."""
    try:                                       # 파일이 없어도 멈추지 않게
        with open(path, encoding='utf-8') as f:
            return json.load(f)                # 리스트[딕셔너리]로 변환
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print('로딩 실패:', e)                  # 원인을 알리고
        return []                              # 빈 리스트로 안전하게 계속

sales = load_sales('Python_Practice2_Data.json')   # 100건 로드

# 1) amount >= 1000 거래만 필터링 — for문만 쓰면 감점, 컴프리헨션 한 줄
high = [r for r in sales if r['amount'] >= 1000]

# 2) 지역별 총매출 dict — 딕셔너리 컴프리헨션으로 계산
region_total = {reg: sum(r['amount'] for r in high if r['region'] == reg)
                for reg in set(r['region'] for r in high)}

# 3) Counter로 지역별 거래 건수 — 직접 루프 카운팅은 감점 대상
region_count = Counter(r['region'] for r in high)
print('지역별 건수:', region_count.most_common())   # 많은 순 정렬 보장

# 4) defaultdict로 카테고리별 amount 리스트 — if key not in 패턴은 감점
by_cat = defaultdict(list)
for r in high:
    by_cat[r['category']].append(r['amount'])      # 키가 없으면 자동 생성

# Checkpoint 자가검증: 총매출 합계 일치 + top3 금액 내림차순
assert sum(region_total.values()) == sum(r['amount'] for r in high)
top3 = sorted(high, key=lambda r: r['amount'], reverse=True)[:3]
assert top3[0]['amount'] >= top3[1]['amount'] >= top3[2]['amount']
print('지역별 총매출:', region_total)
print('금액 top3:', [r['amount'] for r in top3])`,note:"Practice 1의 1·2번 문제를 제출 형태로 완성한 풀이다. for 루프만으로 필터링(-2), if key not in 패턴(-1), 직접 루프 카운팅(-1)이 감점 대상이므로 컴프리헨션·defaultdict·Counter를 반드시 그대로 쓰고, 머리말 주석·함수 docstring·try/except까지 갖춰야 Comm. 20점과 예외처리 35점을 지킬 수 있다."},{title:"Practice 1 완주 가이드 ② — 제너레이터 메모리 비교와 월·카테고리 총매출",lang:"python",files:[{label:"Python_Practice2_Data.json 내려받기",href:"/practice/Python_Practice2_Data.json"}],code:`# [Practice 1 - 후반부] 제너레이터 메모리 비교 + 월·카테고리 그룹 총매출
# 설명: amount > 1000 행만 yield하는 제너레이터를 만들어
#       리스트 버전과 메모리 크기를 비교하고,
#       month·category 기준 총매출 dict를 완성한다
# 변경내역: v1.0 최초 작성
import json                                   # JSON 파일 읽기
import sys                                    # getsizeof로 메모리 크기 측정
from collections import defaultdict          # 그룹 합계 누적용

def load_sales(path):
    """판매 JSON을 읽어 리스트로 반환한다. 실패하면 빈 리스트."""
    try:
        with open(path, encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print('로딩 실패:', e)
        return []

def high_sales(rows):
    """amount가 1000을 초과하는 행만 하나씩 내보내는 제너레이터."""
    for r in rows:                            # 전체를 복사하지 않고
        if r['amount'] > 1000:                # 조건에 맞는 행만
            yield r                           # 그때그때 하나씩 내보낸다

sales = load_sales('Python_Practice2_Data.json')

# 3) 리스트 버전 vs 제너레이터 버전 메모리 비교
as_list = [r for r in sales if r['amount'] > 1000]   # 결과 전부를 메모리에 저장
as_gen = high_sales(sales)                            # 아직 아무것도 계산 안 함
print('리스트:', sys.getsizeof(as_list), 'bytes')
print('제너레이터:', sys.getsizeof(as_gen), 'bytes')
# 주의: list(as_gen)으로 바꿔서 비교하면 감점 — 제너레이터 자체 크기를 재야 한다
assert sys.getsizeof(as_gen) < sys.getsizeof(as_list)   # Checkpoint 통과

# 4) month·category 그룹 총매출 — defaultdict로 누적 후 컴프리헨션으로 정리
group_total = defaultdict(int)
for r in sales:
    group_total[(r['month'], r['category'])] += r['amount']   # (월, 품목) 키로 합산
result = {m + '/' + c: v for (m, c), v in sorted(group_total.items())}
print('월·카테고리 총매출:', result)`,note:"Practice 1의 3·4번 문제 풀이다. 체크포인트는 sys.getsizeof(제너레이터)가 리스트보다 작음을 확인하는 것인데, list(제너레이터)로 변환해 재면 메모리 차이가 사라져 -2 감점이니 제너레이터 객체 자체를 재야 한다. 월·카테고리 그룹핑은 (month, category) 튜플 키 defaultdict 누적 후 컴프리헨션으로 정리하는 것이 교재가 요구하는 조합이다."},{title:"Practice 2 완주 가이드 ① — safe_load_csv와 Pydantic SalesRecord 스키마",lang:"python",files:[{label:"Python_Practice2_Data.json 내려받기",href:"/practice/Python_Practice2_Data.json"}],code:`# [Practice 2 - 전반부] 안전한 파일 로딩 + Pydantic v2 스키마 정의
# 설명: try/except/finally로 파일을 안전하게 읽고(safe_load_csv),
#       SalesRecord 모델로 필드 규칙을 선언한다
# 변경내역: v1.0 최초 작성
import json                                    # 이번 실습 데이터는 JSON(강사 공지)
import logging                                 # print 대신 단계별 기록
from typing import Optional                    # 있어도 되고 없어도 되는 필드 표기
from pydantic import BaseModel, Field          # 데이터 검증 라이브러리

logging.basicConfig(level=logging.INFO)        # INFO 이상을 화면에 출력
logger = logging.getLogger(__name__)           # 이 모듈 전용 로거

def safe_load_csv(path):
    """파일을 읽어 dict 리스트 반환, 실패 시 None(문제지 함수명 유지)."""
    try:                                       # try 없이 읽으면 감점(-3)
        with open(path, encoding='utf-8') as f:
            data = json.load(f)                # JSON을 파이썬 리스트로
        logger.info('로딩 성공: %d건', len(data))   # 성공 기록
        return data
    except FileNotFoundError:                  # 파일이 없을 때만 잡는다
        logger.error('파일 없음: %s', path)     # 오류 기록 후
        return None                            # None 반환(Checkpoint)
    finally:                                   # 성공/실패 모두 실행 — 누락 시 감점(-1)
        print('로딩 종료')

class SalesRecord(BaseModel):
    """판매 1건 스키마 — month·region 필수, amount 양수, category 선택."""
    month: str = Field(min_length=1)           # 문제지의 date == 이 파일의 month
    region: str = Field(min_length=1)          # 빈 문자열이면 검증 실패
    amount: float = Field(gt=0)                # 0 초과만 허용
    category: Optional[str] = None             # 없어도 되는 필드

# Checkpoint: 없는 파일은 None, 정상 파일은 건수 확인
assert safe_load_csv('없는파일.json') is None
raw = safe_load_csv('Python_Practice2_Data.json')
print('로딩 건수:', len(raw))                    # 100
print('검증 예시:', SalesRecord(**raw[0]).model_dump())`,note:"Practice 2의 1·2번 문제 풀이다. try 없이 파일을 읽으면 -3, finally 블록이 없으면 -1 감점이므로 try/except/finally 3단을 모두 갖추고, 없는 파일에서 None이 나오는지 assert로 자가검증한다. 강사 공지대로 데이터는 Python_Practice2_Data.json이고 문제지의 date는 이 파일의 month 필드로 진행하면 된다."},{title:"Practice 2 완주 가이드 ② — valid/errors 분리 저장과 재로딩 검증",lang:"python",files:[{label:"Python_Practice2_Data.json 내려받기",href:"/practice/Python_Practice2_Data.json"}],code:`# [Practice 2 - 후반부] 검증 파이프라인 — valid/errors 분리·저장·재로딩
# 설명: 레코드를 SalesRecord로 검증해 성공은 valid, 실패는 errors로
#       나누고, CSV/JSON으로 저장한 뒤 다시 읽어 건수를 검증한다
# 변경내역: v1.0 최초 작성
import csv                                      # valid 저장용
import json                                     # 데이터 로딩·errors 저장용
from typing import Optional
from pydantic import BaseModel, Field, ValidationError

class SalesRecord(BaseModel):
    """판매 1건 스키마 — month·region 필수, amount 양수, category 선택."""
    month: str = Field(min_length=1)
    region: str = Field(min_length=1)
    amount: float = Field(gt=0)
    category: Optional[str] = None

with open('Python_Practice2_Data.json', encoding='utf-8') as f:
    raw = json.load(f)                          # 정상 데이터 100건

# 검증 파이프라인 시험용 불량 레코드 3건을 일부러 섞는다
bad = [{'month': '', 'region': '서울', 'amount': 100, 'category': '전자'},
       {'month': '2024-05', 'region': '', 'amount': 200, 'category': None},
       {'month': '2024-05', 'region': '부산', 'amount': -50, 'category': '식품'}]

valid, errors = [], []                          # 성공/실패를 나눠 담을 그릇
for i, row in enumerate(raw + bad):
    try:
        rec = SalesRecord(**row)                # 스키마 검증 시도
        valid.append(rec.model_dump())          # dict 직접 구성은 감점(-1)
    except ValidationError as e:                # Exception으로 잡으면 감점(-1)
        errors.append({'row': i, 'error': e.errors()[0]['msg']})

# 저장: valid는 CSV, errors는 JSON — ensure_ascii=False 없으면 한글 깨짐(-1)
with open('valid.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=['month', 'region', 'amount', 'category'])
    w.writeheader()                             # 첫 줄에 컬럼명
    w.writerows(valid)                          # 검증 통과분 전체 기록
with open('errors.json', 'w', encoding='utf-8') as f:
    json.dump(errors, f, ensure_ascii=False, indent=2)

# 재로딩 검증: 저장한 CSV를 다시 읽어 건수가 같은지 확인
with open('valid.csv', encoding='utf-8') as f:
    reloaded = list(csv.DictReader(f))
assert len(reloaded) == len(valid) and len(errors) == 3   # Checkpoint
print('valid:', len(valid), '/ errors:', len(errors), '/ 재로딩:', len(reloaded))`,note:"Practice 2의 3·4번 문제 풀이다. ValidationError 대신 Exception으로 잡거나(-1) model_dump() 대신 dict를 직접 만들면(-1) 감점이고, errors JSON 저장 시 ensure_ascii=False가 없으면 한글이 깨져 또 -1이다. 배포 데이터 100건은 전부 정상이라 검증 실패를 보려고 불량 3건을 일부러 섞었다 — 교재 샘플 데이터라면 valid 4건/errors 3건이 나온다."},{title:"실습용 외부 API 카탈로그 — 키 없이 바로 호출 가능",lang:"text",code:`[키 발급 없이 바로 쓰는 무료 API — 실습 추천]

1) JSONPlaceholder — 연습용 가짜 데이터(가장 안전한 첫 연습)
   https://jsonplaceholder.typicode.com/posts

2) 환율(ER-API) — 실시간 환율, USD 기준 통화별 시세
   https://open.er-api.com/v6/latest/USD

3) Open-Meteo — 날씨 예보(위도·경도로 조회, 울산 예시)
   https://api.open-meteo.com/v1/forecast?latitude=35.54&longitude=129.31&current_weather=true

4) 업비트 공개 시세 — 코인 현재가(실시간 데이터 다루기)
   https://api.upbit.com/v1/ticker?markets=KRW-BTC

5) Nager.Date — 한국 공휴일 목록(날짜 데이터 연습)
   https://date.nager.at/api/v3/PublicHolidays/2026/KR

6) httpbin — 내가 보낸 요청을 그대로 보여주는 거울(헤더·파라미터 확인)
   https://httpbin.org/get

[키 발급이 필요한 API — 실무에서 만나는 형태]
- 공공데이터포털(data.go.kr): 회원가입 후 활용신청 → 승인 → serviceKey 파라미터로 전달
- OpenAI API 등 유료 API: 키는 반드시 .env 파일에 보관하고 절대 커밋하지 않는다

[호출 전 체크 3가지]
① timeout을 항상 지정한다(응답이 없으면 무한 대기)
② raise_for_status()로 실패(4xx/5xx)를 감지한다
③ 반복문 안에서 과도하게 호출하지 않는다(요청 제한, rate limit)`,note:"종합실습 1(데이터 수집 파이프라인)의 API 연동 단계에서 이 중 하나를 골라 쓰면 된다. 어떤 API든 '주소 → 상태코드 확인 → json() 파싱' 3단계는 동일하다."},{title:"외부 API 호출 기본형 — 환율을 안전하게 받아오기",lang:"python",code:`# 외부 API 호출의 표준 골격 — 어떤 API로 바꿔도 이 3단계는 같다
import requests                                    # pip install requests

URL = "https://open.er-api.com/v6/latest/USD"      # 무료 환율 API(키 불필요)

def get_krw_rate():
    """원/달러 환율을 받아온다 — 실패하면 None을 돌려준다"""
    try:
        r = requests.get(URL, timeout=5)           # ① timeout 필수: 5초 안에 응답 없으면 포기
        r.raise_for_status()                       # ② 4xx/5xx면 여기서 예외 발생
        data = r.json()                            # ③ JSON 응답 → 파이썬 dict
        return data["rates"]["KRW"]                # 중첩 dict에서 원화 환율만 추출
    except requests.Timeout:                       # 시간 초과 — 네트워크 문제
        print("응답 시간 초과 — 잠시 후 다시 시도하세요")
    except requests.HTTPError as e:                # 서버가 오류 상태코드를 반환
        print("HTTP 오류:", e.response.status_code)
    except (KeyError, ValueError):                 # 응답 구조가 예상과 다름
        print("응답 형식이 예상과 다릅니다")
    return None

rate = get_krw_rate()
if rate:                                           # None 체크 후 사용 — 방어적 코딩
    print("1 USD =", round(rate, 1), "KRW")`,note:"try/except로 시간초과·HTTP 오류·형식 오류를 각각 잡는 것이 평가 기준의 '오류/예외 처리(35점)'에 그대로 대응한다. 종합실습에선 이 골격을 httpx.AsyncClient로 바꿔 비동기 수집으로 확장한다."},{title:"API가 뭐예요? — 식당 주문으로 이해하는 개념 (비전공자용)",lang:"text",code:`[API = 식당의 주문 창구]

· 내가 주방에 직접 들어가 요리하지 않는다 → 주문서(요청)를 내면 음식(응답)이 나온다
· API도 같다: 남의 서버(주방)에 직접 들어갈 수 없으니,
  정해진 주소(창구)로 요청을 보내면 데이터(음식)를 받는다

[요청 주소(URL) 읽는 법]
  https://open.er-api.com/v6/latest/USD
  └─ 가게 주소 ──┘└── 메뉴(경로) ──┘

  https://api.upbit.com/v1/ticker?markets=KRW-BTC
                                 └ ? 뒤는 주문 옵션(파라미터) : "비트코인으로 주세요"

[응답은 JSON — 어제 배운 딕셔너리와 똑같이 생겼다]
  {"result": "success", "rates": {"KRW": 1390.5, "JPY": 155.2}}
  → 파이썬에서 r.json() 하면 그대로 dict가 된다 → data["rates"]["KRW"] 로 꺼낸다

[지금 바로 해보기 — 코드 없이!]
  1) 브라우저 주소창에 https://open.er-api.com/v6/latest/USD 를 붙여넣는다
  2) 화면에 보이는 글자 덩어리가 바로 JSON 응답이다
  3) 그 안에서 KRW 를 찾아보자 — 파이썬은 이걸 자동으로 꺼내주는 것뿐이다`,note:"API는 '남이 만들어 둔 데이터 자판기'다. 주소를 알고, 버튼(요청)을 누르고, 나온 것(JSON)을 받아 쓰면 된다. 브라우저로 먼저 열어보면 파이썬 코드가 하는 일이 눈에 보인다."},{title:"따라하기 — 파이썬 3줄로 첫 API 호출 (비전공자용)",lang:"python",code:`# 첫 API 호출 — 딱 3단계만 기억하자: 요청 → 변환 → 꺼내기
import requests                                  # 인터넷 요청 도구(설치: pip install requests)

# [1단계] 요청 보내기 — 브라우저 주소창에 치는 것과 같은 일
r = requests.get("https://open.er-api.com/v6/latest/USD", timeout=5)
print(r.status_code)                             # 200이 나오면 성공! (404=주소 틀림, 500=서버 문제)

# [2단계] JSON → 딕셔너리로 변환
data = r.json()                                  # 글자 덩어리(JSON)가 파이썬 dict로 변신
print(type(data))                                # <class 'dict'> — 우리가 아는 딕셔너리다
print(list(data.keys()))                         # 어떤 키가 있는지 먼저 구경

# [3단계] 원하는 값 꺼내기 — 딕셔너리 인덱싱 그대로
rates = data["rates"]                            # 통화별 환율이 담긴 안쪽 딕셔너리
print("1달러 =", rates["KRW"], "원")             # 원화 환율
print("1달러 =", rates["JPY"], "엔")             # 엔화 환율

# 연습: 위 주소의 USD를 EUR로 바꾸면? → 1유로 기준 환율이 나온다`,note:"모르는 API를 만나면 항상 print(list(data.keys()))로 구조부터 구경하자 — 지도 없이 길을 걷지 않는 것과 같다. 3단계(요청→변환→꺼내기)만 익히면 어떤 API든 똑같이 쓸 수 있다."},{title:"종합실습 1 지정 API — countries.dev 국가 정보 조회 (보완 안내)",lang:"python",code:`# [종합실습 1 보완 안내] 기존 API가 유료화되어 countries.dev 로 진행한다 (강사 공지 7/15)
#  · 국가 단건 조회: https://countries.dev/alpha/{코드}  — alpha-2(KR) / alpha-3(KOR) 모두, 대소문자 무관
#  · 문서: https://countries.dev/docs  (응답 포맷 · 에러코드 · 요청 제한은 docs 하위 참조)
#  · Git 커밋은 최종 1회로 제출 (여러 번 나누는 건 실무에서!)
import requests

def get_country(code):
    """국가 코드(KR·KOR 등)로 국가 정보를 조회한다"""
    url = "https://countries.dev/alpha/" + code        # 엔드포인트에 코드만 바꿔 끼운다
    try:
        r = requests.get(url, timeout=5)               # timeout 필수
        r.raise_for_status()                           # 잘못된 코드면 4xx → 예외
        return r.json()                                # dict 로 변환
    except requests.RequestException as e:             # 네트워크·HTTP 오류 통합 처리
        print("조회 실패:", code, "-", e)
        return None

kr = get_country("KR")                                 # alpha-2 코드 (KOR 도 동일 결과)
if kr:
    print(kr["name"], kr["flag"])                      # Korea (Republic of) 🇰🇷
    print("수도:", kr["capital"])                      # Seoul
    print("인구:", format(kr["population"], ","))      # 51,780,579
    print("통화:", kr["currencies"][0]["code"])        # KRW — 리스트 안의 dict 주의!
    print("시간대:", kr["timezones"])                  # ['UTC+09:00']

# 응답 주요 필드: name·capital·population·region·currencies(리스트)·languages(리스트)·borders·flag
# 여러 나라 수집: ["KR","US","JP","DE"] 를 반복 조회 → 종합실습의 비동기(httpx) 수집으로 확장`,note:"실제 응답을 확인하고 쓴 예제다 — currencies·languages 는 '리스트 안에 dict'라 [0]으로 먼저 꺼내야 한다. 잘못된 코드를 넣으면 4xx가 오므로 raise_for_status 예외 처리가 평가(오류/예외 35점)와 직결된다."},{title:"실습 데이터 파일 정정 안내 — Practice1 json 대신 Practice2 json (7/20 공지)",lang:"text",code:`[정정] Python_Practice1_Data.json 파일은 JSON 로딩 시 오류가 납니다.
  → Python_Practice2_Data.json (약 8.2KB)으로 대체해서 실습하세요.

[확인 방법] 파일이 정상인지 먼저 검사한 뒤 본 실습으로 넘어가면 시간을 아낀다
import json

try:
    # 인코딩을 명시해야 한글 데이터에서 깨짐·오류가 나지 않는다
    with open("Python_Practice2_Data.json", encoding="utf-8") as f:
        data = json.load(f)
    # 최상위 자료형과 개수를 먼저 확인해 구조를 파악한다
    print(type(data), len(data))
    # 첫 레코드의 키 목록을 보면 어떤 필드가 있는지 바로 보인다
    print(data[0].keys() if isinstance(data, list) else list(data)[:5])
except json.JSONDecodeError as e:
    # 어느 줄·어느 위치에서 깨졌는지 알려 준다 — 파일 손상 여부 판별의 핵심
    print("JSON 형식 오류:", e.lineno, e.colno, e.msg)
except FileNotFoundError:
    print("파일 경로를 확인하세요. 노트북과 같은 폴더에 두는 것이 가장 간단합니다.")

[실습 진행 구조 — 광주 1~4반 기준]
  Practice 1 (오전) → Practice 2 (오후) → 종합 실습 1 (마감 전)
  · 각 실습은 채널의 해당 안내 메시지에 "댓글(스레드)로 코드 제출"
  · 제출 마감은 익일 오전 9시
  · 수정본은 기존 댓글을 고치지 말고 새 댓글로 추가 게시할 것

[참고 자료]
  · 파이썬 입문 교재 소스코드 모음: github.com/comstudy21joon/python
  · 점프 투 파이썬 (문법이 아직 낯설다면): wikidocs.net/book/1`,note:"Practice 1 데이터 파일이 손상돼 있어 실습 자체가 시작되지 않는 사고가 있었고, 대체 파일로 진행하라는 공지가 나왔다. 남의 데이터 파일을 받아 쓸 때는 본 실습 코드를 짜기 전에 json.load를 한 번 감싸서 열어 보는 습관이 시간을 가장 크게 아껴 준다 — JSONDecodeError는 깨진 줄·열 번호까지 알려 주므로 파일 문제인지 내 코드 문제인지 즉시 갈린다."},{title:"데코레이터 기초 — 함수를 포장지로 감싸기 (이전 기수 교재 보완)",lang:"python",code:`# 데코레이터는 "함수를 받아서 새 함수를 돌려주는 함수"다
def my_decorator(func):
    # wrapper 가 원래 함수를 감싸는 포장지 역할을 한다
    def wrapper(*args, **kwargs):
        # 원래 함수가 실행되기 직전에 끼어드는 자리
        print("[포장지] 실행 전")
        # 받은 인자를 그대로 원래 함수에 넘겨준다
        result = func(*args, **kwargs)
        # 원래 함수가 끝난 직후에 끼어드는 자리
        print("[포장지] 실행 후")
        # 원래 함수의 결과를 그대로 돌려줘야 값이 사라지지 않는다
        return result
    # 감싼 함수 자체를 반환한다 (호출하지 않고 이름만 반환)
    return wrapper

# @ 기호는 add = my_decorator(add) 와 완전히 같은 뜻이다
@my_decorator
def add(a, b):
    # 원래 함수는 자기 일만 하면 된다 (출력 코드가 섞이지 않는다)
    return a + b

# 호출하면 포장지 -> 원래 함수 -> 포장지 순서로 실행된다
print(add(3, 5))`,note:"이전 기수 교재 10장(데코레이터/클로저 구조)의 기초 설명을 재구성했다. 현행 교안에는 functools 활용 예제는 있지만 데코레이터를 밑바닥부터 만들어 보는 단계가 없어 보완용으로 넣었다. *args, **kwargs 로 받아 그대로 넘기고 result 를 반드시 return 하는 것이 골격이다."},{title:"functools.wraps — 데코레이터가 훔쳐간 함수 이름 되돌리기 (이전 기수 교재 보완)",lang:"python",code:`import functools

# 1) wraps 없이 감싸면 원래 함수의 정체가 지워진다
def bad_decorator(func):
    def wrapper():
        """이것은 포장지 함수입니다."""
        return func()
    return wrapper

# 2) wraps 를 붙이면 이름과 설명을 원본에서 복사해 온다
def good_decorator(func):
    @functools.wraps(func)
    def wrapper():
        """이것은 포장지 함수입니다."""
        return func()
    return wrapper

# 같은 원본 함수를 두 데코레이터로 각각 감싸 본다
def say_hello():
    """인사를 하는 함수입니다."""
    print("안녕하세요!")

bad = bad_decorator(say_hello)
good = good_decorator(say_hello)

# wraps 가 없으면 정체가 포장지 것으로 바뀐다
print(bad.__name__, "|", bad.__doc__)    # wrapper | 이것은 포장지 함수입니다.
# wraps 가 있으면 원래 이름과 설명이 살아 있다
print(good.__name__, "|", good.__doc__)  # say_hello | 인사를 하는 함수입니다.`,note:"이전 기수 교재 10장의 functools.wraps 단원을 두 경우 비교 형태로 재서술했다. 데코레이터를 쓰면 __name__ 과 __doc__ 이 포장지 것으로 바뀌는데, 이는 로깅이나 자동 문서화에서 엉뚱한 이름이 찍히는 실제 사고로 이어진다. 데코레이터를 만들 때 wraps 는 사실상 필수 습관이다."},{title:"logging 3단 구조 — 콘솔·전체파일·에러파일 나눠 남기기 (이전 기수 교재 보완)",lang:"python",code:`import logging, os
from logging.handlers import TimedRotatingFileHandler

os.makedirs("logs", exist_ok=True)  # 로그 폴더를 미리 만든다
logger = logging.getLogger("MyApp")  # 이름을 가진 로거 (모듈별로 나누면 추적이 쉽다)
logger.setLevel(logging.DEBUG)       # 로거는 다 통과시키고, 걸러내기는 핸들러가 맡는다

# 파일에는 시각, 레벨, 파일명, 줄번호까지 남겨야 나중에 원인을 찾는다
detail = logging.Formatter("%(asctime)s | %(levelname)s | %(filename)s:%(lineno)d | %(message)s")
brief = logging.Formatter("[%(levelname)s] %(message)s")  # 콘솔은 간결하게

# 1) 콘솔은 INFO 이상, 2) 전체 파일은 DEBUG 이상, 3) 에러 파일은 ERROR 이상
console = logging.StreamHandler()
daily = TimedRotatingFileHandler("logs/app.log", when="midnight", backupCount=7, encoding="utf-8")
errors = logging.FileHandler("logs/error.log", encoding="utf-8")

# 핸들러마다 통과 레벨과 포맷을 다르게 걸어 준다
for handler, level, fmt in ((console, logging.INFO, brief),
                            (daily, logging.DEBUG, detail),
                            (errors, logging.ERROR, detail)):
    handler.setLevel(level)
    handler.setFormatter(fmt)
    logger.addHandler(handler)  # 한 번의 로그가 세 갈래로 흐른다

# 같은 방식의 호출이지만 레벨에 따라 도착하는 곳이 달라진다
logger.debug("디버그 정보")   # 전체 파일에만
logger.info("정상 흐름")      # 콘솔 + 전체 파일
logger.error("에러 발생")     # 콘솔 + 전체 파일 + 에러 파일`,note:"이전 기수 교재 7장(logging 로깅 구조 설계)의 핵심 구조를 재구성했다. print 는 레벨 구분도 보관도 안 되기 때문에 운영 중 문제를 재현할 수 없다는 것이 출발점이다. 로거는 통과만 시키고 걸러내기는 핸들러가 한다는 역할 분담이 이 구조를 이해하는 열쇠다."},{title:"사용자 정의 예외 — 내 프로그램 전용 오류 이름 만들기 (이전 기수 교재 보완)",lang:"python",code:`# Exception 을 상속하면 그것만으로 새로운 예외 종류가 된다
class DataError(Exception):
    """데이터 처리 중 생긴 문제를 묶는 상위 예외"""

# 상위 예외를 다시 상속해 더 구체적인 상황으로 가지를 친다
class MissingFieldError(DataError):
    def __init__(self, field):
        self.field = field  # 어떤 항목이 비었는지 예외 안에 담아 둔다
        super().__init__("필수 항목이 비었습니다: " + field)  # 메시지는 부모에게

class OutOfRangeError(DataError):
    def __init__(self, value):
        self.value = value
        super().__init__("허용 범위를 벗어났습니다: " + str(value))

# 검증 함수는 문제를 직접 처리하지 않고 예외로 호출한 쪽에 알린다
def check_record(record):
    if not record.get("name"):
        raise MissingFieldError("name")
    if record.get("age", -1) < 0:
        raise OutOfRangeError(record.get("age"))
    return True

rows = [{"name": "철수", "age": 25}, {"name": "", "age": 30}, {"name": "영희", "age": -5}]
for row in rows:
    try:
        check_record(row)
        print("정상:", row)
    except DataError as e:  # 상위 예외 하나만 잡아도 하위 예외가 모두 걸린다
        print("문제 발견 [" + type(e).__name__ + "]", e)  # 종류까지 구분해 기록`,note:"이전 기수 교재 9장(예외처리)의 사용자 정의 예외 단원을 계층 구조로 확장해 재서술했다. ValueError 같은 범용 예외만 쓰면 내 로직이 낸 오류인지 라이브러리가 낸 오류인지 구분되지 않는다. 상위 예외 하나를 두고 상속으로 가지를 치면 except 한 줄로 내 오류만 골라 잡을 수 있다."},{title:"__slots__ — 객체 수백만 개일 때 메모리 줄이기 (이전 기수 교재 보완)",lang:"python",code:`import tracemalloc

# 일반 클래스는 속성을 __dict__ 라는 사전에 담아 자유롭게 늘릴 수 있다
class NoSlots:
    def __init__(self, x, y):
        self.x, self.y = x, y

# __slots__ 를 선언하면 지정한 속성만 고정 자리에 저장한다
class WithSlots:
    __slots__ = ("x", "y")  # 여기 적힌 이름 외의 속성은 아예 만들 수 없다
    def __init__(self, x, y):
        self.x, self.y = x, y

# 느낌이 아니라 실제 측정으로 차이를 확인한다
def peak_kb(cls, n=10000):
    tracemalloc.start()
    objs = [cls(i, i) for i in range(n)]
    peak = tracemalloc.get_traced_memory()[1]  # 최고 사용량
    tracemalloc.stop()
    print(cls.__name__, len(objs), "개 ->", round(peak / 1024, 2), "KB")

peak_kb(NoSlots)
peak_kb(WithSlots)

# 대신 유연성은 사라진다 - 없는 속성을 붙이면 즉시 오류가 난다
try:
    WithSlots(1, 2).z = 3
except AttributeError as e:
    print("슬롯에 없는 속성이라 거부됨:", e)`,note:'이전 기수 교재 8장(객체지향)의 __slots__ 와 메모리 측정 단원을 재구성했다. 현행 교안의 dataclass 카드가 "구조를 깔끔하게"에 초점을 둔다면 이쪽은 "같은 구조를 싸게"에 해당한다. 속성이 고정된 경량 객체를 대량 생성할 때만 쓰고, 동적으로 속성을 붙여야 하면 쓰지 않는 것이 판단 기준이다.'},{title:"제출 파일명 규칙 갱신 — 캠퍼스명·반이 앞에 붙는다 (교재 최신본 기준)",lang:"text",code:`[변경 사항] 교재 갱신본에서 제출 파일명 규칙이 바뀌었다.
  구본:  이름_실습명.zip            예) 홍길동_day1종합실습.zip
  신본:  캠퍼스명_반_이름_실습명.zip  예) 서울_1반_홍길동_day1종합실습.zip

  Practice 개별 파일도 같은 원칙이다.
  신본:  캠퍼스명_반_이름.py 로 제출

[왜 바뀌었나]
  4기는 울산·판교·광주 여러 캠퍼스에서 같은 과목이 동시에 진행된다.
  이름만 적으면 동명이인이 섞이거나 어느 반 제출물인지 구분되지 않아
  채점 단계에서 파일을 되돌려보내는 일이 생긴다.
  앞에 캠퍼스와 반을 붙이면 정렬만 해도 반별로 묶인다.

[작성 예시]
  울산_3반_김민수_day1종합실습.zip
  판교_7반_이서연_day2종합실습.zip
  광주_2반_박지훈.py

[주의 — 반별 안내가 우선한다]
  이 규칙은 교재 공식본 기준이다. 실제 운영에서는 담당 실습교수가
  다른 규칙을 안내하는 경우가 있다. 예를 들어 울산 배포본에서는
  Practice 4종을 Practice번호_내이름.py 로 만들어 Practice_내이름.zip 으로 묶고,
  종합실습 2는 Test2_내이름.zip 형태로 안내된 바 있다.
  → 충돌하면 담당 실습교수의 채널 공지를 따르고, 없으면 교재 규칙을 따른다.

[제출 전 30초 점검]
  □ 파일명에 캠퍼스명·반·이름이 순서대로 들어갔는가
  □ 확장자가 맞는가 (Practice는 .py / 종합실습은 .zip)
  □ zip 안에 불필요한 폴더(__pycache__, .ipynb_checkpoints)가 섞이지 않았는가
  □ 압축을 풀었을 때 파일이 바로 나오는가 (폴더가 이중으로 감싸지지 않았는가)`,note:"교재 갱신본에서 실제로 달라진 것은 제출 규칙·API 전환·데이터 링크 세 가지뿐이고, 그중 이 항목만 새로 반영한다. 파일명 규칙은 내용과 무관해 보이지만 채점 파이프라인에서 되돌려보내는 사유 1순위라 실제로는 감점과 직결된다. 캠퍼스가 여러 곳인 기수에서만 생기는 문제라 이전 기수 자료를 참고했다면 특히 놓치기 쉽다."}],concepts:[{term:"변수(variable)",desc:"값을 담아 두는 이름표로, 상자에 이름을 붙여 두고 필요할 때 꺼내 쓰는 것과 같다."},{term:"자료형(data type)",desc:"값의 종류를 뜻하며 숫자(int·float), 글자(str), 참/거짓(bool) 처럼 데이터마다 다룰 수 있는 방식이 다르다."},{term:"리스트(list)",desc:"여러 값을 순서대로 줄 세워 담는 자료구조로, 칸이 번호로 매겨진 사물함이라고 생각하면 된다."},{term:"딕셔너리(dict)",desc:"이름표(키)와 값을 짝지어 저장하는 자료구조로, 단어를 찾으면 뜻이 나오는 사전과 같다."},{term:"반복문(for)",desc:"같은 작업을 데이터 개수만큼 자동으로 되풀이해 주는 문법으로, 사람이 손으로 반복할 일을 컴퓨터가 대신한다."},{term:"함수(function)",desc:"자주 쓰는 코드를 이름 하나로 묶어 재사용하는 도구로, 버튼 하나로 정해진 일을 시키는 기계와 같다."},{term:"NumPy 배열(ndarray)",desc:"숫자 데이터를 빠르게 계산하기 위한 특수 리스트로, 수백만 개 숫자도 한 줄 명령으로 한꺼번에 계산한다."},{term:"venv(가상환경)",desc:"프로젝트마다 라이브러리를 따로 담는 독립 상자로, 다른 프로젝트와 버전이 충돌하지 않게 격리한다."},{term:"컴프리헨션(comprehension)",desc:"for와 조건을 한 줄로 압축해 리스트·딕셔너리·집합을 만드는 문법이다."},{term:"제너레이터(generator)",desc:"값을 한꺼번에 만들지 않고 필요할 때 하나씩 흘려보내, 대용량 데이터도 적은 메모리로 처리한다."},{term:"dataclass",desc:"데이터 한 건(예: 주문)을 담는 상자를 몇 줄로 정의해 주는 도구다."},{term:"타입 힌트(type hint)",desc:"변수·함수에 어떤 종류의 값이 오가는지 표시해, 실수와 버그를 미리 잡게 돕는 메모다."},{term:"Pydantic",desc:"들어온 데이터가 정한 형식(스키마)에 맞는지 자동으로 검증하고 걸러 주는 검문소 같은 도구다."},{term:"Ruff",desc:"코드 스타일 오류를 찾아 주고 자동으로 정리해 주는 매우 빠른 린터/포매터다."},{term:"pytest",desc:"내가 만든 함수가 기대대로 동작하는지 자동으로 확인해 주는 테스트 도구다."},{term:"asyncio(비동기)",desc:"기다리는 시간에 다른 일을 하도록 순서를 겹쳐, 여러 API 요청을 동시에 처리해 시간을 줄인다."}],detail:{topics:[{h:"실행 구조·개발 환경",items:["Homebrew·Python 3.11·VS Code로 개발 환경 갖추기","venv로 가상환경 만들고 pip로 패키지 관리","소스→AST→바이트코드→PVM 실행 과정 이해"]},{h:"자료구조·컴프리헨션",items:["list/dict/set/tuple의 특징과 시간복잡도","리스트·딕셔너리 컴프리헨션","제너레이터로 메모리 아끼기","dataclass·TypedDict로 구조 표현"]},{h:"함수·파일·예외",items:["functools(partial·reduce) 활용","CSV·JSON·Parquet 읽고 쓰기","pathlib로 경로 다루기","예외 처리(try/except)로 안전하게"]},{h:"타입·검증",items:["타입 힌트로 의도 드러내기","Pydantic v2(BaseModel·Field·model_dump/validate)","mypy로 타입 검사"]},{h:"코드 품질·테스트",items:["Ruff로 린트·포맷 자동화","pytest로 테스트 작성","requirements.txt로 의존성 고정","VS Code 디버거로 단계 실행"]},{h:"비동기·병렬",items:["asyncio(async/await)로 비동기 처리","httpx로 비동기 HTTP 호출","멀티프로세싱으로 CPU 병렬 처리","timeit·cProfile로 성능 측정"]}],labs:[{title:"Lab1. venv 만들고 개발환경 검증",steps:["터미널에서 'python3.11 -m venv .venv' 로 가상환경을 만든다.","'source .venv/bin/activate' 로 가상환경을 활성화한다.","'pip install httpx pydantic ruff pytest' 로 필요한 패키지를 설치한다.","'pip freeze > requirements.txt' 로 환경을 기록한다.","VS Code에서 인터프리터를 .venv로 지정한다."]},{title:"Lab2. 컴프리헨션·제너레이터·dataclass로 데이터 모델링",steps:["주문 리스트를 컴프리헨션으로 정제한다.","@dataclass로 Order(상품·수량·금액)를 정의해 표현한다.","제너레이터로 대용량 로그를 한 줄씩 읽어 합계를 구한다.","리스트 방식과 제너레이터 방식의 메모리 차이를 체감한다."]},{title:"Lab3. Pydantic 검증 + pytest + Ruff",steps:["BaseModel로 주문 스키마를 정의해 잘못된 데이터가 걸러지는지 확인한다.","핵심 함수에 pytest 테스트를 작성한다.","'ruff check .' 와 'ruff format .' 으로 코드를 정리한다."]}],homework:["공공 데이터포털 등 무료 JSON API에서 asyncio·httpx로 데이터를 비동기 수집하고, Pydantic으로 스키마를 검증한 뒤 Parquet로 저장하는 스크립트를 작성해 제출한다.","위 스크립트의 수집·변환 함수에 pytest 테스트를 최소 2개 붙이고, ruff로 정리한 뒤 requirements.txt와 함께 Git으로 커밋해 재현 가능한 형태로 만든다."]},theory:{theory:[{h:"내 코드는 어떻게 실행될까 - AST와 PVM",body:`Python은 우리가 쓴 소스를 곧바로 실행하지 않는다.
먼저 문법 구조(AST)로 해석한 뒤 바이트코드로 번역하고, 그 바이트코드를 PVM(파이썬 가상머신)이 한 줄씩 실행한다.
이 흐름을 알면 오류 메시지를 읽는 눈이 생기고, 3.11이 왜 더 빠르고 오류 위치를 더 정확히 짚어 주는지도 이해된다.`},{h:"venv를 반드시 쓰는 이유",body:`프로젝트마다 필요한 라이브러리 버전이 다른데, 컴퓨터 전체에 하나로만 깔면 A 프로젝트를 고치다 B가 깨진다.
venv는 프로젝트별로 독립된 상자를 만들어 이런 충돌을 원천 차단한다.
requirements.txt와 함께 쓰면 남의 컴퓨터에서도 똑같은 환경을 그대로 재현할 수 있다.`},{h:"타입 힌트와 Pydantic이 버그를 미리 막는 원리",body:`데이터가 파이프라인을 흐르다 엉뚱한 형식이 섞이면 한참 뒤에 가서야 터진다.
타입 힌트로 형식을 적어 두면 mypy가 실행 전에 문제를 잡아 주고, Pydantic은 데이터가 들어오는 입구에서 형식을 검문해 잘못된 값을 초반에 걸러낸다.
둘 다 '문제를 늦게 말고 일찍' 발견하게 해 주는 안전장치다.`},{h:"왜 데이터 분석에 Python을 쓰나요?",body:`Python 은 사람이 쓰는 말과 비슷하게 읽혀서 처음 배우는 사람도 코드를 술술 따라 읽을 수 있다.
게다가 데이터를 다루는 도구(Pandas, NumPy 같은 라이브러리)가 무료로 잘 갖춰져 있어 엑셀로는 버거운 수십만 줄 데이터도 거뜬히 처리한다.

비유하자면 엑셀이 손으로 칸을 채우는 모눈종이라면, Python 은 '이 조건이면 이렇게 처리해'라고 규칙만 적어 두면 알아서 수백만 칸을 채워 주는 자동 계산기다.
그래서 반복 작업이 많은 실무 데이터 정리에서 시간을 크게 아껴 준다.`},{h:"자료구조를 골라 쓰는 기준",body:`데이터를 담을 그릇은 여러 종류가 있고, 무엇을 담느냐에 따라 알맞은 그릇이 다르다.
순서가 중요하고 나중에 값을 바꿀 거라면 리스트를 쓰고, 이름으로 값을 빠르게 찾고 싶다면 딕셔너리를 쓴다.

예를 들어 학생 점수를 그냥 줄 세우면 리스트지만, 홍길동의 점수처럼 이름으로 찾으려면 딕셔너리가 편하다.
한 번 정하면 바뀌면 안 되는 값(예: 위도·경도 한 쌍)은 튜플에 담아 실수로 수정되는 일을 막는다.`},{h:"반복문과 함수가 일을 줄여 주는 이유",body:`데이터가 10개일 때는 손으로 처리해도 되지만 10만 개면 불가능하다.
반복문은 한 줄짜리 규칙을 데이터 수만큼 자동으로 적용해 주므로, 데이터가 아무리 많아도 코드는 그대로다.

함수는 그 규칙에 이름을 붙여 두는 것이라, 같은 처리를 여러 곳에서 다시 쓸 때 복사·붙여넣기 대신 이름만 부르면 된다.
이렇게 하면 코드가 짧아지고, 한 군데만 고쳐도 전체가 함께 고쳐져 실수가 줄어든다.`},{h:"함수형 도구·파일 포맷·예외 - 파이프라인을 짧고 튼튼하게 (5교시)",body:`데이터 처리는 결국 '모든 값에 같은 규칙 적용(map)', '조건에 맞는 값만 남기기(filter)', '누적해서 하나로 접기(reduce)'의 반복이다.
functools의 partial 은 자주 쓰는 함수의 인자 일부를 미리 고정해 이름만 짧게 부르게 해 주고, reduce 는 목록을 하나의 값으로 접을 때 쓴다. 이런 함수형 도구를 알면 for 문으로 길게 쓰던 코드가 한 줄로 정리된다.

파일 포맷도 골라 쓸 줄 알아야 한다. CSV 는 사람이 열어 보기 좋지만 용량이 크고 타입 정보가 없다. JSON 은 중첩 구조를 담기 좋아 API 응답에 흔하다. Parquet 는 열 단위로 압축 저장해 대용량 분석에서 훨씬 빠르고 작다 - 그래서 중간 산출물은 Parquet 로 저장하는 게 실무 관행이다.

경로는 문자열을 '+' 로 이어 붙이면 OS마다 깨지므로, pathlib 의 Path 로 다뤄 안전하게 만든다.
마지막으로 파일이 없거나 형식이 깨진 데이터는 반드시 생기므로, try/except 로 '터지면 멈추는' 대신 '잘못된 건만 건너뛰고 로그를 남기는' 예외 처리 패턴을 몸에 익혀야 파이프라인이 밤새 안전하게 돈다.`},{h:"코드 품질 - Ruff·pytest·디버거가 분석가에게 필요한 이유 (7교시)",body:`분석 코드는 '한 번 돌리고 버리는 것' 같지만, 실제로는 몇 주 뒤의 내가 다시 열어 고치고 남에게 넘긴다. 그때 품질 도구가 시간을 지켜 준다.

Ruff 는 린터(문법·스타일 오류를 잡아 주는 검사기)와 포매터(들여쓰기·따옴표를 자동 정리)를 하나로 합친 도구다. 예전엔 flake8 로 검사하고 black 으로 정리했지만, 이제 Ruff 하나가 훨씬 빠르게 둘 다 한다. 'ruff check .' 로 문제를 찾고 'ruff format .' 으로 모양을 통일한다.

pytest 는 '이 함수는 이런 입력에 이런 값을 내야 한다'를 코드로 박아 두는 것이다. 데이터 정제 함수처럼 조용히 틀리는 코드일수록, 테스트가 있으면 잘못 고쳤을 때 바로 빨간불이 켜진다. assert 한 줄이면 시작할 수 있다.

VS Code 디버거는 print 를 여기저기 박는 대신, 원하는 줄에 중단점을 찍고 그 순간의 변수 값을 눈으로 확인하며 한 줄씩 실행하게 해 준다. 원인을 모를 때 print 로 헤매는 시간을 크게 줄여 준다.
핵심 메시지: 이 셋은 '나중에 터질 버그를 지금 싸게 잡는' 투자다.`},{h:"비동기와 병렬 - 기다림과 계산을 나눠 빠르게 (8교시 메인 실습 개념)",body:`오늘의 메인 실습은 여러 API에서 데이터를 모아 검증하고 저장하는 것이다. 여기서 대부분의 시간은 '계산'이 아니라 'API 응답을 기다리는 것'에 쓰인다. API 100곳을 순서대로 부르면 앞의 응답을 다 기다린 뒤에야 다음을 부르니 느리다.

asyncio 의 async/await 는 이 '기다리는 시간'을 겹치게 해 준다. 한 요청을 보내고 응답을 기다리는 동안 다른 요청을 미리 보내 두는 방식이라, 네트워크처럼 기다림이 많은 작업(I/O bound)에서 수십 배 빨라진다. httpx 는 이 async 를 지원하는 최신 HTTP 클라이언트라 requests 대신 쓴다.

반대로 무거운 계산(이미지 변환·대용량 파싱 같은 CPU bound)은 기다림이 아니라 진짜 연산이 병목이므로, asyncio 로는 빨라지지 않는다. 이때는 멀티프로세싱으로 CPU 코어 여러 개에 일을 나눠 준다.
판단 기준: '기다림이 많으면 asyncio, 계산이 많으면 멀티프로세싱'. 그리고 timeit·cProfile 로 실제 어디가 느린지 측정한 뒤에 고른다 - 짐작으로 최적화하지 않는다.`}]},realCodes:[{title:"지저분한 주문 데이터를 정제하는 전처리 스크립트",lang:"python",code:`import numpy as np  # 숫자 배열을 빠르게 계산하기 위한 NumPy 라이브러리를 불러온다

# 실무에서 받는 데이터는 보통 이렇게 빈값·이상치가 섞여 '지저분'하다
orders = [12000, 0, 35000, -1, 8000, None, 21000]  # 주문 금액 목록(0·음수·None 은 잘못된 값)

clean = []  # 정상 금액만 모아 둘 빈 리스트를 준비한다

for price in orders:          # orders 안의 값을 하나씩 price 에 꺼내 반복한다
    if price is None:         # 값이 비어 있으면(None)
        continue              # 건너뛰고 다음 값으로 넘어간다
    if price <= 0:            # 금액이 0 이하인 잘못된 값이면
        continue              # 역시 건너뛴다
    clean.append(price)       # 위 검사를 모두 통과한 정상 금액만 담는다

prices = np.array(clean)      # 정제된 리스트를 NumPy 배열로 바꿔 한꺼번에 계산할 준비

with_tax = prices * 1.1       # 모든 금액에 부가세 10%를 한 줄로 더한다(반복문 불필요)

summary = {                                   # 결과 요약을 사전 형태로 정리
    '건수': len(prices),                      # 정상 주문 개수
    '합계': int(prices.sum()),                # 금액 총합(정수로 변환)
    '평균': round(float(prices.mean())),      # 평균 금액(소수 반올림)
}

print('정제 전 개수:', len(orders))           # 결과: 정제 전 개수: 7
print('정제 후 개수:', len(prices))           # 결과: 정제 후 개수: 4
print('부가세 포함:', with_tax)               # 결과: 부가세 포함: [13200. 38500.  8800. 23100.]
print('요약:', summary)                        # 결과: 요약: {'건수': 4, '합계': 76000, '평균': 19000}`,note:"실무 데이터는 거의 항상 빈값·이상치가 섞여 있어 걸러내기 → 배열 변환 → 요약이 전처리의 기본 골격이다."}],periods:["1교시 개발환경·실행 구조: Homebrew·3.11·VS Code·venv, 소스→AST→바이트코드→PVM","2교시 [실습] venv 생성·pip·requirements.txt·VS Code 설정","3교시 자료구조 시간복잡도·컴프리헨션·제너레이터","4교시 [실습] dataclass·TypedDict로 데이터 모델링","5교시 함수·파일·예외: functools·CSV/JSON/Parquet·pathlib","6교시 [실습] 타입 힌트·Pydantic v2·mypy","7교시 코드 품질: Ruff·pytest·VS Code 디버거","8교시 [메인 실습] 비동기 수집→Pydantic 검증→Parquet 저장→pytest→Git"]},"python-2":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 Pandas 2.x 실전 · Copy-on-Write 이해"},{time:"10:00–10:50",topic:"2교시 [실습] groupby · pivot_table · merge"},{time:"11:00–11:50",topic:"3교시 Polars Lazy API · Pandas 성능 비교"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 [실습] DuckDB로 Parquet에 SQL 질의하기"},{time:"14:00–14:50",topic:"5교시 시각화(Plotly · Altair) · Streamlit 소개"},{time:"15:00–15:50",topic:"6교시 [실습] 기초 통계 · 가설 검정"},{time:"16:00–16:50",topic:"7교시 sklearn Pipeline · joblib · 분석 자동화(schedule · Jinja2)"},{time:"17:00–17:50",topic:"8교시 [메인 실습] 공개 데이터 EDA→시각화+통계→Pipeline 모델→GitHub"}],practice:{title:"공개 데이터로 EDA→시각화+통계→Pipeline 모델까지 만들어 GitHub에 올리기",steps:["가상환경에 `pip install polars pandas pyarrow plotly scipy scikit-learn joblib` 를 설치하고, 공개 데이터셋(예: seaborn 'tips'나 공공데이터 CSV) 하나를 정한다.","Polars(또는 Pandas)로 데이터를 불러와 결측치·타입을 정리하고, groupby/pivot 으로 핵심 지표를 요약하는 EDA 를 수행한다(같은 집계를 Polars Lazy 로도 해 보며 속도를 비교).","Plotly(또는 Altair)로 분포·관계를 보여 주는 그래프를 2개 이상 그려, 데이터에서 눈에 띄는 패턴을 캡처한다.","두 그룹의 평균 차이를 검증하는 가설 검정을 수행한다: `scipy.stats.ttest_ind` 로 t-test 를 돌리고 p-value 로 결론(유의미/아님)을 적는다.","예측 목표를 하나 정하고, `make_pipeline(StandardScaler(), 모델)` 형태의 sklearn Pipeline 으로 학습·평가한 뒤 `joblib.dump` 로 모델을 파일로 저장한다.","프로젝트를 data/ · notebooks/ · src/ 처럼 폴더 구조로 정리하고 README 에 분석 요약을 적는다.","`git init` 후 전체를 커밋하고 GitHub 저장소에 push 해, 링크로 결과가 재현·확인되는지 점검한다."],deliverable:"Polars/Pandas EDA + Plotly 시각화 + t-test + Pipeline 모델(joblib 저장)을 담고 폴더 구조로 정리해 GitHub에 올린 프로젝트"}},examples:[{title:"DataFrame 만들고 열 선택하기",lang:"python",code:`import pandas as pd  # Pandas 불러오기
# 딕셔너리로 표를 만든다(키=열 이름, 값=열 데이터)
df = pd.DataFrame({'이름': ['A', 'B', 'C'], '점수': [90, 70, 85]})
print(df['점수'].mean())  # '점수' 열의 평균 → 결과: 81.666...`,note:"딕셔너리 하나만 있으면 바로 표(DataFrame)를 만들 수 있다."},{title:"조건으로 행 필터링하기",lang:"python",code:`import pandas as pd
df = pd.DataFrame({'이름': ['A', 'B', 'C'], '점수': [90, 70, 85]})
# 대괄호 안에 조건을 넣으면 참인 행만 남는다
high = df[df['점수'] >= 80]  # 80점 이상만 선택
print(len(high))             # 선택된 행 개수 → 결과: 2`,note:"df[조건] 형태가 Pandas 에서 데이터를 골라내는 가장 기본적인 방법이다."},{title:"groupby로 그룹별 평균 내기",lang:"python",code:`import pandas as pd
df = pd.DataFrame({'반': ['1', '1', '2'], '점수': [90, 80, 70]})
# '반'으로 묶어 각 반의 평균 점수를 구한다
print(df.groupby('반')['점수'].mean())  # 결과: 1반 85.0, 2반 70.0`,note:"groupby 는 같은 항목끼리 모아 통계 내기의 핵심 도구다."},{title:"Polars Lazy API - 계획을 쌓고 한 번에 실행 (3교시 시연)",lang:"python",code:`import polars as pl     # Pandas보다 빠른 최신 데이터프레임 라이브러리

# scan_csv: 파일을 '지금 읽지 않고' 읽을 계획만 세운다(Lazy)
lazy = pl.scan_csv('sales.csv')

# filter·group_by·agg 를 이어 붙여도 아직 실행되지 않는다 - 계획만 쌓인다
plan = (
    lazy
    .filter(pl.col('amount') > 0)                # 정상 금액만
    .group_by('region')                          # 지역별로 묶어
    .agg(pl.col('amount').mean().alias('avg'))    # 평균 매출 계산
)

# collect() 를 부르는 순간, Polars가 쌓인 계획을 '최적화해서' 한 번에 실행한다
# (예: 필요 없는 열은 아예 읽지 않아 Pandas보다 빠르고 메모리도 적게 쓴다)
result = plan.collect()
print(result)   # 결과: region별 평균 매출 표
`,note:"Pandas는 한 줄마다 즉시 실행하지만, Polars Lazy는 collect() 전까지 계획만 쌓다가 통째로 최적화해 실행한다. 대용량일수록 이 차이가 속도로 나타난다."},{title:"Plotly Express 로 인터랙티브 차트 한 줄 (5교시 시연)",lang:"python",code:`import plotly.express as px   # 인터랙티브 차트를 한 줄로 그려 주는 라이브러리

df = px.data.tips()          # 연습용 식당 팁 데이터(내장)

# 산점도: 결제액(x) 대비 팁(y), 점 색은 흡연 여부로 구분
# 마우스를 올리면 값이 뜨고, 드래그로 확대·축소가 되는 차트가 만들어진다
fig = px.scatter(
    df, x='total_bill', y='tip',
    color='smoker',           # 범주별로 색을 나눈다
    size='size',              # 점 크기 = 일행 인원 수
    title='결제액 대비 팁 (인터랙티브)'
)

fig.write_html('tip_scatter.html')  # HTML로 저장하면 브라우저에서 만져 볼 수 있다
# 주피터에서는 fig.show() 로 바로 확인
print('차트 저장 완료')
`,note:"Matplotlib이 정적 이미지라면 Plotly는 마우스로 만지는 차트다. write_html로 저장하면 코드를 모르는 동료도 브라우저에서 확대·필터해 볼 수 있다."},{title:"t-검정으로 두 그룹 차이가 우연인지 확인 (6교시 시연)",lang:"python",code:`from scipy import stats     # 통계 검정 함수가 모인 라이브러리
import seaborn as sns

df = sns.load_dataset('tips')

# 흡연 그룹과 비흡연 그룹의 '팁 금액'을 각각 뽑는다
smoker = df[df['smoker'] == 'Yes']['tip']
nonsmoker = df[df['smoker'] == 'No']['tip']

print('흡연 평균:', round(smoker.mean(), 2))      # 눈에 보이는 평균 차이
print('비흡연 평균:', round(nonsmoker.mean(), 2))

# 독립표본 t-검정: 두 그룹 평균 차이가 '통계적으로 의미 있는가'를 따진다
t, p = stats.ttest_ind(smoker, nonsmoker)
print('p-value:', round(p, 3))

# 판정 규칙: p < 0.05 면 '우연이라 보기 어렵다(의미 있는 차이)', 아니면 '차이가 있다고 보기 어렵다'
if p < 0.05:
    print('=> 두 그룹의 팁은 통계적으로 유의하게 다르다')
else:
    print('=> 평균은 달라 보여도 우연일 수 있어 단정할 수 없다')
`,note:"평균 숫자가 달라 보여도 표본이 적으면 우연일 수 있다. p-value가 0.05보다 작을 때만 '의미 있는 차이'라고 말하는 습관이 분석의 신뢰도를 지킨다."},{title:"sklearn Pipeline 으로 전처리+모델을 한 덩어리로 저장 (7교시 시연)",lang:"python",code:`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler   # 스케일 맞추기(전처리)
from sklearn.linear_model import LogisticRegression # 분류 모델
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
import joblib   # 학습된 파이프라인을 파일로 저장/불러오기

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)

# 전처리(스케일러)와 모델을 한 줄로 묶는다 - 학습·예측에 '같은 처리'가 보장된다
pipe = Pipeline([
    ('scaler', StandardScaler()),          # 1단계: 값의 크기를 표준화
    ('model', LogisticRegression(max_iter=200)),  # 2단계: 모델 학습
])

pipe.fit(X_tr, y_tr)                        # 전처리+학습이 한 번에 진행된다
print('정확도:', round(pipe.score(X_te, y_te), 3))

# 파이프라인을 통째로 저장하면, 나중에 불러와 바로 예측할 수 있다(재현성 확보)
joblib.dump(pipe, 'model.joblib')
loaded = joblib.load('model.joblib')       # 다른 곳에서 그대로 불러오기
print('불러온 모델 예측:', loaded.predict(X_te[:3]))
`,note:"전처리를 예측 때 빠뜨리는 실수를 Pipeline이 원천 차단한다. joblib으로 통째 저장하면 '학습한 그대로'를 다른 환경에서 재현할 수 있다."},{title:"업종별 매출 합계 상위 뽑고 막대그래프를 파일로 저장하기",lang:"python",code:`import pandas as pd                       # 표 처리
import matplotlib.pyplot as plt          # 그래프 그리기

# 서울시 상권 추정매출을 흉내 낸 작은 표 (실전은 공공데이터 CSV 사용)
df = pd.DataFrame({
    "서비스_업종": ["한식", "카페", "한식", "편의점", "카페", "미용실"],
    "당월_매출": [820, 310, 640, 450, 280, 190],       # 단위: 만원
    "연령대_10": [20, 60, 15, 90, 70, 10],             # 10대 매출
    "연령대_20": [180, 140, 150, 160, 120, 60],        # 20대 매출
    "연령대_30": [260, 80, 210, 120, 70, 80],          # 30대 매출
})

# 업종별로 묶어 합계 → 내림차순 정렬 → 상위 3개만 (실전은 상위 10개)
top = df.groupby("서비스_업종")["당월_매출"].sum().sort_values(ascending=False).head(3)
print(top)                                # 한식 1460, 카페 590, 편의점 450 순서

# 연령대 3개 열의 열별 합계로 막대그래프를 그려 '파일로' 저장
ages = df[["연령대_10", "연령대_20", "연령대_30"]].sum()   # 열마다 합계 1개씩
ages.plot(kind="bar", title="age sales")   # 합계 3개를 막대그래프로
plt.tight_layout()                        # 글자가 잘리지 않게 여백 자동 조정
plt.savefig("age_sales.png")              # 화면 표시 대신 PNG 파일로 저장
print("age_sales.png 저장 완료")           # 보고서에 바로 붙일 이미지 완성`,note:"윤선영 실습교수의 종합실습2 3~4번(서비스 업종별 당월 매출 합계를 내림차순 상위 10개로 뽑고, 연령대 3개 칼럼 합계로 bar 그래프를 그려 파일 저장)을 축소한 것이다. groupby 뒤에 sort_values 와 head 를 이어 붙여 상위 N 개를 뽑는 체인과, plt.show 대신 savefig 로 결과를 이미지 파일로 남기는 습관이 핵심이다.",origin:"practice",source:"윤선영 실습교수(울산 3반) — 파이썬 실습·종합실습 배포 자료"},{title:"ColumnTransformer — 숫자 열과 글자 열을 각각 다르게 전처리해 결합",lang:"python",code:`import pandas as pd                                    # 표 처리
from sklearn.pipeline import Pipeline                  # 처리 단계 묶기
from sklearn.compose import ColumnTransformer          # 열 종류별로 다른 처리 적용
from sklearn.impute import SimpleImputer               # 결측치(빈칸) 채우기
from sklearn.preprocessing import StandardScaler, OneHotEncoder  # 표준화·원핫
from sklearn.linear_model import LinearRegression      # 회귀 모델

# 수치형 열 전용: 빈칸은 중앙값으로 채우고 → 크기를 표준화
num_pipe = Pipeline([("결측", SimpleImputer(strategy="median")),
                     ("스케일", StandardScaler())])
# 범주형 열 전용: 빈칸은 "missing" 글자로 채우고 → 원핫인코딩(0/1 표로 변환)
cat_pipe = Pipeline([("결측", SimpleImputer(strategy="constant", fill_value="missing")),
                     ("원핫", OneHotEncoder(handle_unknown="ignore"))])

# 두 파이프라인을 '열 이름 기준'으로 하나로 결합
pre = ColumnTransformer([
    ("수치", num_pipe, ["연령대_10", "연령대_20", "연령대_30"]),   # 숫자 열 3개는 이쪽
    ("범주", cat_pipe, ["상권_구분"]),                             # 글자 열 1개는 저쪽
])

model = Pipeline([("전처리", pre), ("회귀", LinearRegression())])   # 전처리+모델 완성
X = pd.DataFrame({"연령대_10": [20, None, 15], "연령대_20": [180, 140, 150],
                  "연령대_30": [260, 80, None], "상권_구분": ["골목", None, "발달"]})
y = [820, 310, 640]                                    # 정답: 당월 매출(만원)
model.fit(X, y)                                        # 빈칸이 있어도 그대로 학습된다
print("예측:", model.predict(X).round(1))               # 학습 데이터로 예측 확인`,note:"윤선영 실습교수의 종합실습2 5~6번(수치형 파이프라인 + 범주형 파이프라인을 하나로 결합해 최종 모델 파이프라인 완성, 연령대 매출로 당월 매출 예측)을 재구성했다. 기존 예제의 Pipeline 이 한 종류 전처리만 다뤘다면, 여기서는 ColumnTransformer 로 숫자 열과 글자 열에 서로 다른 전처리를 동시에 적용하는 실무 표준 패턴을 배운다. 결측치가 섞인 원본을 손대지 않고 fit 한 번으로 끝나는 것이 매력이다.",origin:"practice",source:"윤선영 실습교수(울산 3반) — 파이썬 실습·종합실습 배포 자료"},{title:"실습3: IQR 이상치 제거 후 named aggregation 집계 (Practice 3)",lang:"python",code:`# 실습3(Practice 3): sales_100k.csv 흐름 — EDA -> IQR 이상치 제거 -> 집계
import pandas as pd  # 표 데이터 처리

# 실제 실습은 10만 행 CSV. 여기선 작은 표로 흐름만 재현(999999 는 이상치)
df = pd.DataFrame({
    'region':   ['서울', '서울', '부산', '부산', '서울', '부산'],
    'category': ['가전', '식품', '가전', '식품', '가전', '식품'],
    'amount':   [1200, 300, 2000, 500, 999999, 700],
})
print(df.info())          # 컬럼·타입·결측치 한눈에(EDA 첫걸음)
print(df.isnull().sum())  # 컬럼별 결측치 개수

# 1) IQR(사분위 범위)로 정상 범위를 계산한다
Q1 = df['amount'].quantile(0.25)  # 하위 25% 값
Q3 = df['amount'].quantile(0.75)  # 상위 25% 값
IQR = Q3 - Q1                      # 사분위 범위
low, high = Q1 - 1.5 * IQR, Q3 + 1.5 * IQR  # 정상으로 볼 하한·상한

before = len(df)                            # 제거 전 행수
clean = df[df['amount'].between(low, high)]  # 정상 범위 안만 남김
print('제거 전:', before, '-> 제거 후:', len(clean))  # 이상치 빠짐 확인

# 2) named aggregation: 결과 컬럼명을 직접 지정해 지역·품목별 집계
result = (clean.groupby(['region', 'category'])
          .agg(total=('amount', 'sum'),   # 총매출
               mean=('amount', 'mean'),   # 평균
               cnt=('amount', 'count'))   # 건수
          .sort_values('total', ascending=False))  # 총매출 내림차순
print(result)`,note:'Checkpoint 그대로: between(Q1-1.5*IQR, Q3+1.5*IQR)로 IQR 범위를 잡고 제거 전·후 행수를 출력, groupby는 total=("amount","sum") 형태의 named aggregation으로 컬럼명을 지정해야 감점(-20)을 피한다.'},{title:"실습3: DuckDB로 DataFrame에 바로 SQL 집계 (Practice 3)",lang:"python",code:`# 실습3(Practice 3): 같은 집계를 SQL 로 — Pandas/Polars/DuckDB 3종 비교의 한 축
import duckdb   # pip install duckdb, CSV/DataFrame 에 직접 SQL 을 실행
import pandas as pd

df = pd.DataFrame({
    'region':   ['서울', '서울', '부산', '부산'],
    'category': ['가전', '식품', '가전', '식품'],
    'amount':   [1200, 300, 2000, 500],
})

# 파이썬 변수 df 를 그대로 테이블처럼 쓴다(별도 적재 없이 FROM df)
sql = '''
    SELECT region, category,
           SUM(amount) AS total,   -- 총매출
           COUNT(*)    AS cnt       -- 건수
    FROM df
    GROUP BY region, category
    ORDER BY total DESC             -- 총매출 내림차순
'''
result = duckdb.query(sql).to_df()  # 결과를 다시 DataFrame 으로 받는다
print(result)

# Practice 3 핵심: 같은 집계를 Pandas groupby / Polars Lazy / DuckDB SQL 로 짜고
# timeit 으로 '동일 반복 횟수'를 맞춰 실행 시간을 공정 비교하는 것.`,note:"DuckDB는 커리큘럼(Polars+DuckDB) 필수인데 사이트에 예제가 없었다. timeit 비교 시 세 도구의 number(반복 횟수)를 통일하지 않으면 공정 비교가 아니라 감점 대상이라는 점을 note로 강조한다."},{title:"실습4: 카이제곱 검정 — 두 범주형 변수의 독립성 (Practice 4)",lang:"python",code:`# 실습4(Practice 4): 지역과 결제수단이 서로 관련 있는가(범주형 vs 범주형)
import pandas as pd
from scipy.stats import chi2_contingency  # 카이제곱 독립성 검정 함수

df = pd.DataFrame({
    'region': ['서울', '서울', '부산', '부산', '서울', '부산', '서울', '부산'],
    'pay':    ['카드', '현금', '카드', '카드', '현금', '현금', '카드', '현금'],
})

# 1) 두 범주형 변수로 분할표(교차표)를 만든다
table = pd.crosstab(df['region'], df['pay'])
print(table)

# 2) 카이제곱 검정: 지역과 결제수단이 독립인지 검정
chi2, p, dof, expected = chi2_contingency(table)
print('카이제곱:', round(chi2, 3), 'p-value:', round(p, 3))

# 3) 해석은 반드시 코드/주석으로 남긴다(수치만 출력하면 감점)
if p < 0.05:
    print('=> p<0.05: 지역과 결제수단은 독립이 아니다(관련 있음)')
else:
    print('=> p>=0.05: 독립이 아니라고 볼 근거가 부족하다')`,note:'Practice 4는 t-test 외에 chi2_contingency로 범주형 독립성까지 요구한다. Checkpoint가 "p<0.05 유의미 여부 판단을 코드/주석으로 남기지 않으면 -20"이라, 판정 분기를 반드시 넣는 습관을 보여준다.'},{title:"pivot_table 과 merge — 엑셀 피벗과 SQL JOIN 을 Pandas 로",lang:"python",code:`import pandas as pd                # 표 처리 라이브러리

# 매출 표: 고객·지역·분류별 거래 기록
sales = pd.DataFrame({
    'customer_id': [1, 2, 1, 3],                    # 고객 번호
    'region': ['서울', '부산', '서울', '부산'],       # 지역
    'category': ['가전', '식품', '식품', '가전'],     # 상품 분류
    'amount': [1200, 300, 500, 2000],               # 매출액
})
# 고객 표: 고객 번호와 등급(다른 파일에서 온 표라고 가정)
cust = pd.DataFrame({'customer_id': [1, 2, 3], 'grade': ['VIP', '일반', '일반']})

# 1) pivot_table: 엑셀 피벗과 동일 - 행=지역, 열=분류, 값=매출 합계
pivot = sales.pivot_table(values='amount', index='region',
                          columns='category', aggfunc='sum', fill_value=0)
print(pivot)                       # 지역 x 분류 매출 교차표 완성

# 2) merge: SQL 의 LEFT JOIN - 고객 등급을 매출 표에 붙인다
joined = pd.merge(sales, cust, on='customer_id', how='left')
print(joined[['customer_id', 'amount', 'grade']])   # 등급이 붙은 매출 표

# 3) 결합했으니 등급별 매출 합계도 한 줄
print(joined.groupby('grade')['amount'].sum())      # VIP 1700, 일반 2300`,note:"pivot_table 은 행·열 두 축으로 펼쳐 보는 교차 집계, merge 는 두 표를 공통 키로 잇는 SQL JOIN 이다. 다른 출처의 표를 merge 로 붙인 뒤 groupby·pivot 으로 집계하는 것이 실무 분석의 기본 결합 흐름이다."},{title:"Pandas 2.x Copy-on-Write — 걸러낸 조각을 고칠 때의 함정",lang:"python",code:`import pandas as pd                # Pandas 2.x 부터 Copy-on-Write 가 기본이다

df = pd.DataFrame({'region': ['서울', '부산', '서울'],
                   'amount': [1000, 2000, 3000]})   # 원본 매출 표

# [위험] 조건으로 걸러낸 조각은 '뷰'라서 바로 대입하면 경고/오류가 난다
seoul = df[df['region'] == '서울']          # 이 시점의 seoul 은 원본을 비추는 뷰
# seoul['amount'] = seoul['amount'] * 1.1  # <- ChainedAssignment 경고! (2.x)

# [안전 1] copy() 로 원본과 연결을 끊은 복사본을 만들어 수정한다
seoul = df[df['region'] == '서울'].copy()  # 독립된 내 표
seoul['amount'] = seoul['amount'] * 1.1    # 마음껏 수정 가능
print(seoul)                               # 서울 행만 10% 인상된 복사본

# [안전 2] 원본 자체를 고치려면 .loc 으로 조건과 열을 한 번에 지정한다
df.loc[df['region'] == '서울', 'amount'] *= 1.1   # 원본 직접 수정(경고 없음)
print(df)                                  # 원본에서도 서울 행만 인상됨`,note:"Pandas 2.x 는 Copy-on-Write 가 기본이라, 걸러낸 뷰에 연쇄 대입하면 경고가 나고 의도대로 안 바뀔 수 있다. 복사본을 원하면 .copy(), 원본 수정이 목적이면 .loc 한 줄 — 이 두 패턴만 지키면 가장 흔한 Pandas 사고를 예방한다."},{title:"apply 대신 벡터화 — str·dt 접근자로 열 전체를 한 번에",lang:"python",code:`import pandas as pd                # 표 처리 라이브러리

df = pd.DataFrame({
    'name': ['kim', 'lee', 'park'] * 1000,                        # 고객명 3000건
    'date': ['2026-01-05', '2026-02-14', '2026-03-01'] * 1000,    # 주문일 3000건
})

# [느린 방법] apply: 행마다 파이썬 함수를 호출한다(사실상 파이썬 루프)
df['upper1'] = df['name'].apply(lambda x: x.upper())

# [빠른 방법] str 접근자: C 레벨에서 열 전체를 한 번에 처리(벡터화)
df['upper2'] = df['name'].str.upper()      # 100만 행 기준 수십 배 빠르다

# 날짜도 마찬가지 - dt 접근자로 연·월·요일을 한 번에 뽑는다
df['date'] = pd.to_datetime(df['date'])    # 문자열을 날짜 타입으로 변환
df['month'] = df['date'].dt.month          # 월 추출
df['weekday'] = df['date'].dt.day_name()   # 요일 이름 추출
print(df[['name', 'upper2', 'month', 'weekday']].head(3))

# 습관: apply 를 쓰기 전에 'str/dt/산술 벡터 연산으로 되는가'를 먼저 묻는다`,note:"apply 는 편하지만 행마다 파이썬 함수를 부르는 루프라 느리고, str.upper()·dt.month 같은 벡터화 연산은 C 수준에서 열 전체를 처리해 수십 배 빠르다. 교재 실측 기준 100만 행에서 apply 약 3.2초, str 접근자 약 0.08초로 40배 차이가 난다."},{title:"schedule 로 매일 아침 리포트 자동 실행 — 반복 분석 자동화",lang:"python",code:`import schedule                    # pip install schedule - 파이썬 안의 간단한 스케줄러
import time                        # 대기 루프용
import logging                     # 성공/실패를 기록으로 남기기 위해

logging.basicConfig(level=logging.INFO)    # 실행 기록을 화면에 출력

def run_daily_report():            # 매일 반복할 분석 작업 한 덩어리
    try:                           # 자동 실행은 실패해도 프로그램이 죽으면 안 된다
        # df = load_and_clean('sales.csv')   # 1) 데이터 적재·정제
        # stats = compute_stats(df)          # 2) 통계 계산
        # render_report(stats)               # 3) 리포트 파일 생성
        logging.info('아침 리포트 생성 완료')          # 성공 기록
    except Exception as e:
        logging.error('리포트 실패: ' + str(e))       # 실패도 기록으로 남긴다

schedule.every().day.at('08:00').do(run_daily_report)     # 매일 아침 8시
schedule.every().monday.at('09:00').do(run_daily_report)  # 매주 월요일 9시(주간판)
schedule.every(1).hours.do(run_daily_report)              # 매시간(새 데이터 확인용)

while True:                        # 프로그램을 켜 두면
    schedule.run_pending()         # 예약 시각이 된 작업을 실행하고
    time.sleep(60)                 # 1분마다 예약을 확인한다`,note:"매주 손으로 만들던 리포트를 schedule 에 등록하면 수십 분 작업이 0분이 되고, 같은 코드가 항상 같은 결과를 내 복붙 오류도 사라진다. 자동 실행 함수는 반드시 try/except 와 logging 으로 감싸, 실패해도 죽지 않고 기록이 남게 하는 것이 핵심이다."},{title:"Practice 3 완주 가이드 ① — EDA·IQR 이상치 제거·named aggregation",lang:"python",code:`# [Practice 3 - 전반부] Pandas EDA — IQR 이상치 제거 + named aggregation
# 설명: sales_100k.csv를 로딩해 기본 EDA를 출력하고, IQR 방법으로
#       이상치를 제거한 뒤 region·category별로 집계·정렬한다
# 변경내역: v1.0 최초 작성
import pandas as pd                        # 표 데이터 처리
import numpy as np                         # 합성 데이터 생성용

def load_sales(path):
    """CSV 로딩. 파일이 없으면 실습용 합성 데이터로 대체(중단 방지)."""
    try:
        return pd.read_csv(path)
    except FileNotFoundError:              # 파일이 없어도 실습은 계속
        print('파일 없음 — 합성 데이터 10만 행으로 대체')
        rng = np.random.default_rng(0)     # 시드 고정: 누가 돌려도 같은 결과
        tmp = pd.DataFrame({
            'region': rng.choice(['서울', '부산', '대구', '인천'], 100_000),
            'category': rng.choice(['전자', '의류', '식품'], 100_000),
            'month': rng.choice(['2024-01', '2024-02', '2024-03'], 100_000),
            'amount': rng.integers(100, 5000, 100_000)})
        tmp.loc[:99, 'amount'] = 999_999   # 이상치 100건을 일부러 심는다
        return tmp

df = load_sales('sales_100k.csv')

# 1) 기본 EDA — Checkpoint: info()와 isnull().sum() 출력 필수
print(df.info())                           # 행 수·컬럼 타입·메모리 한눈에
print(df.isnull().sum())                   # 컬럼별 결측치 개수

# 2) IQR 이상치 제거 — 공식이 틀리면 -20점, 그대로 외우자
Q1 = df['amount'].quantile(0.25)           # 하위 25% 지점
Q3 = df['amount'].quantile(0.75)           # 상위 25% 지점
IQR = Q3 - Q1                              # 사분위 범위
clean = df[df['amount'].between(Q1 - 1.5 * IQR, Q3 + 1.5 * IQR)]
print('제거 전:', len(df), '/ 제거 후:', len(clean))   # 전·후 행 수 출력(Checkpoint)

# 3) named aggregation — agg({'amount':'sum'}) 방식은 -20점
result = (clean.groupby(['region', 'category'])
          .agg(total=('amount', 'sum'),    # 결과 컬럼명을 직접 지정
               mean=('amount', 'mean'),
               count=('amount', 'count'))
          .sort_values('total', ascending=False))   # 총매출 내림차순(Checkpoint)
print(result.head(6))`,note:"Practice 3의 1·2번 문제 풀이다. 감점 3대장은 IQR 공식 오류(-20), agg({'amount':'sum'}) 식의 named aggregation 미사용(-20)이므로 Q1-1.5*IQR ~ Q3+1.5*IQR 범위와 total=('amount','sum') 형태를 그대로 쓰자. 체크포인트가 요구하는 df.info()·isnull().sum() 출력과 제거 전·후 행 수 출력도 빠뜨리면 안 된다."},{title:"Practice 3 완주 가이드 ② — Polars Lazy·DuckDB SQL·timeit 공정 비교",lang:"python",code:`# [Practice 3 - 후반부] Polars Lazy · DuckDB SQL · timeit 3종 성능 비교
# 설명: 같은 집계(지역·카테고리별 총매출)를 Pandas/Polars/DuckDB로
#       작성하고 timeit으로 '동일 반복 횟수' 실행 시간을 비교한다
# 변경내역: v1.0 최초 작성
import os                                  # 파일 존재 확인
import timeit                              # 실행 시간 측정 표준 도구
import pandas as pd
import polars as pl
import duckdb

if not os.path.exists('sales_100k.csv'):   # 실습 파일이 없으면 합성 CSV 생성
    import numpy as np
    rng = np.random.default_rng(0)
    pd.DataFrame({'region': rng.choice(['서울', '부산', '대구'], 100_000),
                  'category': rng.choice(['전자', '의류', '식품'], 100_000),
                  'amount': rng.integers(100, 5000, 100_000)}
                 ).to_csv('sales_100k.csv', index=False)

def pandas_agg():
    """Pandas: 읽기부터 집계까지(공정 비교를 위해 읽기 포함)."""
    df = pd.read_csv('sales_100k.csv')
    return (df[df['amount'] > 0].groupby(['region', 'category'])
            .agg(total=('amount', 'sum')).sort_values('total', ascending=False))

def polars_agg():
    """Polars Lazy: scan→filter→group_by→agg→sort→collect 체인."""
    return (pl.scan_csv('sales_100k.csv')          # read_csv(Eager)면 -20
            .filter(pl.col('amount') > 0)          # 계획만 쌓인다
            .group_by(['region', 'category'])
            .agg(pl.col('amount').sum().alias('total'))
            .sort('total', descending=True)
            .collect())                            # collect() 누락도 -20

def duckdb_agg():
    """DuckDB: CSV 파일에 바로 SQL GROUP BY."""
    sql = ("SELECT region, category, SUM(amount) AS total "
           "FROM 'sales_100k.csv' WHERE amount > 0 "
           "GROUP BY region, category ORDER BY total DESC")
    return duckdb.query(sql).to_df()               # 결과를 DataFrame으로

print(duckdb_agg().head(3))                        # 집계 결과 확인(세 도구 동일해야 함)

N = 3                                              # 반복 횟수가 다르면 -20: 셋 다 N으로 통일
for name, fn in [('Pandas', pandas_agg), ('Polars', polars_agg), ('DuckDB', duckdb_agg)]:
    sec = timeit.timeit(fn, number=N)              # 같은 조건에서 N회 실행
    print(name, round(sec, 3), '초 (', N, '회)')`,note:"Practice 3의 3·4번 문제 풀이다. Polars는 read_csv(Eager)가 아니라 scan_csv로 시작해 collect()로 끝나는 체인이어야 하며(각 -20), timeit은 세 도구 모두 같은 number 값으로 돌려야 공정 비교로 인정된다(-20). 세 함수 모두 파일 읽기부터 포함시켜 측정 조건을 똑같이 맞춘 것이 핵심이다."},{title:"Practice 4 완주 가이드 ① — 2x2 서브플롯 4종 차트와 t-test·카이제곱",lang:"python",code:`# [Practice 4 - 전반부] 2x2 서브플롯 4종 차트 + t-test·카이제곱 검정
# 설명: 한 figure에 4종 차트를 배치해 저장하고, 서울 vs 부산 평균
#       매출 t-test와 지역x카테고리 카이제곱 검정 결과를 해석한다
# 변경내역: v1.0 최초 작성
import matplotlib
matplotlib.use('Agg')                       # 화면 없이 파일로만 저장(서버 환경 대비)
import platform
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats                     # t-test, 카이제곱 검정

# 한글 축 라벨이 깨지지 않게 OS별 기본 한글 폰트를 지정한다
plt.rc('font', family='Malgun Gothic' if platform.system() == 'Windows' else 'AppleGothic')
plt.rcParams['axes.unicode_minus'] = False  # 마이너스 기호 깨짐 방지

try:
    df = pd.read_csv('sales_100k.csv')      # 실습 3에서 쓰던 데이터 재사용
except FileNotFoundError:
    raise SystemExit('sales_100k.csv가 필요합니다 — 실습 3을 먼저 실행하세요')

# 1) 2x2 서브플롯 — 차트 4개를 개별 plt.show()로 따로 내면 -20
fig, axes = plt.subplots(2, 2, figsize=(10, 8))
axes[0, 0].hist(df['amount'], bins=30)                       # 1. 금액 히스토그램
axes[0, 0].set_title('Amount Histogram')
df.boxplot(column='amount', by='region', ax=axes[0, 1])      # 2. 지역별 박스플롯
region_sum = df.groupby('region')['amount'].sum()
axes[1, 0].bar(region_sum.index, region_sum.values)          # 3. 지역별 총매출 바차트
axes[1, 0].set_title('Region Total')
num_corr = df.select_dtypes('number').corr()                 # 4. 숫자 열 상관 히트맵
im = axes[1, 1].imshow(num_corr, cmap='Blues')
fig.colorbar(im, ax=axes[1, 1])
fig.tight_layout()
fig.savefig('eda_4charts.png')              # 한 장의 그림 파일로 제출
print('eda_4charts.png 저장 완료')

# 2) t-test: 서울 vs 부산 평균 매출 차이 — p-value 해석 누락은 -20
seoul = df.loc[df['region'] == '서울', 'amount']
busan = df.loc[df['region'] == '부산', 'amount']
t, p = stats.ttest_ind(seoul, busan)
print('t =', round(t, 3), ', p-value =', round(p, 4))
print('=> 유의미' if p < 0.05 else '=> 우연 범위(유의하지 않음)')   # 해석 한 줄 필수

# 3) 카이제곱: 지역 x 카테고리 독립성 — 분할표를 만들어 검정
table = pd.crosstab(df['region'], df['category'])
chi2, p2, dof, expected = stats.chi2_contingency(table)
print('chi2 =', round(chi2, 3), ', p-value =', round(p2, 4))
print('=> 관련 있음' if p2 < 0.05 else '=> 독립(관련 없다고 본다)')`,note:"Practice 4의 1·2번 문제 풀이다. 차트 4개를 개별 plt.show()로 따로 내면 -20이므로 반드시 fig, axes = plt.subplots(2,2) 한 장에 모으고, t-test·카이제곱 모두 p-value 수치만 출력하면 -20이니 p < 0.05 판단문을 코드로 남겨야 한다. matplotlib.use('Agg')를 지우고 plt.show()를 넣으면 화면으로도 볼 수 있다."},{title:"Practice 4 완주 가이드 ② — sklearn Pipeline 저장·재로딩과 Plotly HTML",lang:"python",code:`# [Practice 4 - 후반부] sklearn Pipeline 훈련·저장·재로딩 + Plotly HTML
# 설명: ColumnTransformer+Pipeline으로 전처리와 모델을 한 덩어리로
#       학습·평가·저장·재로딩하고, Plotly 막대 차트를 HTML로 저장한다
# 변경내역: v1.0 최초 작성
import pandas as pd
import joblib                                   # 모델 파일 저장/불러오기
import plotly.express as px                     # 인터랙티브 차트
from sklearn.pipeline import Pipeline           # 전처리+모델 묶음
from sklearn.compose import ColumnTransformer   # 열별로 다른 전처리
from sklearn.preprocessing import OneHotEncoder # 글자 열을 숫자로
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

try:
    df = pd.read_csv('sales_100k.csv')
except FileNotFoundError:
    raise SystemExit('sales_100k.csv가 필요합니다 — 실습 3을 먼저 실행하세요')

# 목표(y): 중앙값보다 큰 고액 거래인지 예측, 입력(X): 지역·카테고리
y = (df['amount'] > df['amount'].median()).astype(int)
X = df[['region', 'category']]

# 1) 전처리 + 모델을 Pipeline 하나로 — 따로따로 실행하면 -20
pre = ColumnTransformer([('cat', OneHotEncoder(), ['region', 'category'])])
pipe = Pipeline([('pre', pre),                              # 1단계: 인코딩
                 ('model', LogisticRegression(max_iter=500))])  # 2단계: 분류

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)
pipe.fit(X_tr, y_tr)                            # 전처리+학습이 한 번에
print('정확도:', round(pipe.score(X_te, y_te), 3))

# 2) joblib 저장 + 재로딩 — dump 없이 학습만 하면 -20
joblib.dump(pipe, 'sales_model.joblib')         # 파이프라인 통째로 저장
loaded = joblib.load('sales_model.joblib')      # 다시 불러와서
print('재로딩 예측:', loaded.predict(X_te.head(3)).tolist())   # 그대로 예측 가능

# 3) Plotly 막대 차트를 HTML로 저장 — fig.show()만 하면 -20
top = df.groupby(['region', 'category'], as_index=False)['amount'].sum()
fig = px.bar(top, x='region', y='amount', color='category',
             title='Region x Category Total Sales')
fig.write_html('sales_bar.html')                # 브라우저로 열리는 파일 제출
print('sales_bar.html 저장 완료')`,note:"Practice 4의 3·4번 문제 풀이다. 전처리와 모델을 따로 실행하면 Pipeline 미사용 -20, joblib.dump() 없이 학습만 하면 -20, Plotly를 fig.show()로 화면 출력만 하고 write_html()을 안 부르면 또 -20이다. ColumnTransformer를 Pipeline 1단계로 넣으면 재로딩한 모델이 전처리까지 그대로 재현한다는 점이 이 실습의 핵심이다."},{title:"종합실습 2 데이터 링크 수정 — Stack Overflow 설문 CSV (보완 안내)",lang:"python",code:`# [종합실습 2 보완 안내] 실습지의 두 번째 Stack Overflow 링크가 아래로 수정되었다 (백정열 교수 공지 7/16)
# · 2024년 설문 데이터(CSV 직링크, zip 아님):
#   https://github.com/StackExchange/Survey/raw/refs/heads/main/packages/archive/2024/results.csv
# · 전체 아카이브 폴더(스키마 설명 포함): https://github.com/StackExchange/Survey/tree/main/packages/archive/2024
# · 공식 안내 페이지(연도별 링크 정리): https://survey.stackoverflow.co/
import pandas as pd

URL = ('https://github.com/StackExchange/Survey/raw/refs/heads/main/'
       'packages/archive/2024/results.csv')   # 수정된 2024년 CSV 직링크

df = pd.read_csv(URL)                  # 인터넷에서 바로 읽기(수십 MB — 잠시 걸린다)
print(df.shape)                        # (응답자 수, 문항 수) 확인
print(df.columns[:10].tolist())        # 앞 문항 10개 이름 구경
# 문항(컬럼)의 의미는 아카이브 폴더의 스키마 문서를 참고한다`,note:"종합실습 2 실습지의 두 번째 Stack Overflow 링크가 잘못되어 위 주소로 수정 공지되었다(7/16 백정열 교수). zip이 아니라 CSV 직링크이므로 pd.read_csv(URL)로 바로 읽으면 되고, 링크가 또 바뀌면 공식 안내 페이지(survey.stackoverflow.co)에서 연도별 최신 링크를 확인하는 습관이 안전하다."},{title:"Practice 3·4 실습 데이터 실물 확인 — sales_100k.csv 스키마 (보완 안내)",lang:"python",code:`# [Practice 3·4 보완 안내] 배포된 sales_100k.csv 실물 확인 결과 (7/16)
# · 실제 100만 행 × 11컬럼 (파일명의 100k보다 크다 — 성능 비교가 더 실감난다)
# · 컬럼: order_id, order_date, region, category, product_name,
#         quantity, unit_price, payment_method, customer_age, customer_gender, amount
# · region·category 값은 한글! region 결측 10,000건 · category 결측 8,000건 존재
import pandas as pd

df = pd.read_csv('sales_100k.csv')
print(df.isnull().sum())          # region 10000 · category 8000 이 나오는 게 정상(파일 문제 아님)

print(df['region'].unique())      # ['인천' '부산' '서울' '광주' '울산' '경기' '대전' '대구' nan]

# t-검정 그룹은 영어 'Seoul'이 아니라 한글 값으로! (영문으로 쓰면 빈 Series)
seoul = df.loc[df['region'] == '서울', 'amount']
busan = df.loc[df['region'] == '부산', 'amount']
print(len(seoul), len(busan))     # 247558, 119425 — 값이 잡히는지 꼭 확인

# 카이제곱용 payment_method 는 카드·현금·계좌이체·포인트 4종(결측 없음)`,note:"실물 파일 점검 결과다. ① 결측치가 일부러 심어져 있으니 isnull().sum() 출력이 0이 아니라고 당황하지 말 것(EDA 채점 포인트), ② region·category가 한글 값이므로 조건 필터와 t-검정 그룹 추출에 '서울'·'부산'처럼 한글로 써야 한다, ③ 실물이 100만 행이라 Pandas vs Polars vs DuckDB 성능 차이가 확실히 보인다."},{title:"실습교수 공유 링크 — DuckDB 공식 블로그 · 종합실습 가이드 (수업 중 공지)",lang:"text",code:`수업 중(7/16) 실습교수들이 전 분반에 공유한 자료다.

[백정열 교수 — 전 분반 공지]
· DuckDB 공식 블로그: https://duckdb.org/news/
  Practice 3에서 쓴 DuckDB의 릴리스 소식·활용 사례가 정리된 공식 채널.
  "CSV에 바로 SQL"이 어디까지 발전했는지 훑어보면 도구 선택 감이 생긴다.

[조홍근 실습교수 — 울산 2반 공유]
· 종합실습 가이드 다운로드: https://tinyurl.com/sk-python
· 팀으로 실습하더라도 제출은 각자(개개인) 해야 한다는 점을 재강조.

[수업 마무리 안내]
· 파이썬 과목 Quiz는 구글폼으로 제출(채널 공지 링크).
· 백정열 교수: "10월 Vector DB 과정에서 다시 만난다 — 그때는 자신 있게 파이썬 잘 합니다!라고 해주길."`,note:"울산 4반 외 다른 반 채널에서 공유된 자료까지 모은 것이다. 종합실습 가이드 단축링크(tinyurl.com/sk-python)는 가이드 PDF를 다시 볼 때 유용하고, DuckDB 블로그는 도구가 살아 움직이는 생태계임을 보여준다. 파이썬은 10월 Vector DB 과목의 기반이 되므로 방학처럼 쉬지 말고 Practice 코드를 한 번 더 돌려보자."},{title:"종합실습 2 제출 안내·채점기준 실물 — 데이터셋과 배점 (윤선영 교수 배포)",lang:"text",code:`[제출 구성]
· Practice 1~4: Practice번호_내이름.py 4개 → Practice_내이름.zip
· 종합실습 2: Test2_내이름.py + git2_내이름.py → Test2_내이름.zip
  (git 실습 파일까지 함께 — GitHub 업로드가 채점 항목이다)

[채점기준 — 100점]
① 10점  프로그램 전체 설명(머리말) + 함수·기능 설명 주석
② 10점  필요한 칼럼만 골라 DataFrame 생성 →
         서비스_업종_코드_명별 당월_매출_금액 합계, 내림차순 상위 10개
③ 20점  연령대_10/20/30_매출_금액 세 칼럼의 합계로 bar 그래프 → 파일 저장
④ 30점  파이프라인: 수치형(결측 중간값+스케일링) + 범주형(결측 'missing'+원핫)
         → 두 파이프라인 결합 → 최종 모델 파이프라인 완성
⑤ 20점  모델 만들고 성능 확인
⑥ 10점  GitHub에 올리고 캡처

[실습 데이터 실물]
· 서울시 상권분석서비스(추정매출-상권).csv — 47MB, 채널에 공유됨
· 필요한 칼럼: 서비스_업종_코드_명 · 당월_매출_금액 · 연령대_10/20/30_매출_금액 등

[종합실습 1 평가기준(참고)] 주석 20 · 오류/예외처리 20 · 코드 간결성 30 ·
코드 완성 10 · GitHub 업로드 10 · 납기 10`,note:"울산 3반 채널에 배포된 제출 안내 원문을 정리했다. 배점을 보면 ④파이프라인이 30점으로 가장 크고 ③시각화 파일 저장이 20점 — 이 두 항목이 바로 위의 '업종별 매출 상위 10 + bar 저장'과 'ColumnTransformer 파이프라인' 예제 카드다. 주석(머리말·함수 설명)과 GitHub 업로드까지 배점에 있으니 코드만 잘 짜고 20점을 흘리지 말자.",origin:"practice",source:"윤선영 실습교수(울산 3반) — 파이썬 실습·종합실습 배포 자료"}],concepts:[{term:"DataFrame",desc:"행과 열로 이뤄진 표 형태 데이터로, Python 안에서 다루는 엑셀 시트라고 생각하면 된다."},{term:"Series",desc:"DataFrame 의 한 개 열(column)에 해당하는 1차원 데이터로, 표에서 세로줄 하나를 떼어 낸 것이다."},{term:"결측치(NaN)",desc:"값이 비어 있는 칸으로, 설문에서 응답하지 않은 빈칸처럼 처리하지 않으면 계산이 어긋난다."},{term:"groupby",desc:"같은 항목끼리 묶어 합계·평균을 내는 기능으로, 영수증을 요일별로 모아 합산하는 것과 같다."},{term:"merge",desc:"두 표를 공통 열(키)을 기준으로 옆으로 붙이는 작업으로, 회원표와 주문표를 회원번호로 연결하는 것이다."},{term:"EDA(탐색적 데이터 분석)",desc:"본격 모델링 전에 데이터를 그래프·통계로 훑어보며 특징과 이상한 점을 찾는 단계다."},{term:"matplotlib/Plotly",desc:"데이터를 막대·선·점 그래프로 그려 주는 시각화 도구로, matplotlib은 정적 그래프, Plotly는 마우스로 확대·확인되는 인터랙티브 그래프를 그린다."},{term:"Polars",desc:"Pandas와 비슷한 표 처리 라이브러리인데, 필요한 계산만 몰아서 실행(Lazy)해 대용량에서 훨씬 빠르다."},{term:"Lazy API",desc:"명령을 바로 실행하지 않고 계획만 쌓아 뒀다가 collect() 할 때 한꺼번에 최적화해 실행하는 방식이다."},{term:"DuckDB",desc:"파일(CSV·Parquet)에 대고 바로 SQL을 실행하는 초경량 분석용 DB로, 별도 서버가 필요 없다."},{term:"Parquet",desc:"열 단위로 압축 저장해 대용량 데이터를 빠르게 읽고 용량도 적은 파일 형식이다."},{term:"Copy-on-Write",desc:"Pandas 2.x에서 데이터를 실수로 바꾸는 사고를 막고 성능도 높이는 새 동작 방식이다."},{term:"가설 검정(t-test·카이제곱)",desc:"두 집단의 차이가 우연인지 의미 있는 차이인지 통계로 판단하는 방법이다."},{term:"sklearn Pipeline",desc:"결측치 처리·스케일링·모델 학습을 한 줄로 묶어 실수 없이 재사용하는 조립 라인이다."},{term:"joblib",desc:"학습이 끝난 모델을 파일로 저장했다가 나중에 그대로 불러 쓰게 해 주는 도구다."},{term:"Plotly/Altair",desc:"마우스로 확대·확인이 되는 인터랙티브 그래프를 그려 주는 시각화 도구다."}],detail:{topics:[{h:"Pandas 2.x",items:["로딩·탐색·선택·정렬","결측치·이상치 다루기","groupby·pivot_table·merge","Copy-on-Write 이해"]},{h:"Polars+DuckDB",items:["Lazy API(scan_csv·filter·group_by·collect)","Pandas와 성능 비교","DuckDB SQL로 분석","데이터 크기별 처리 전략 선택"]},{h:"시각화",items:["Matplotlib 기본 그래프","Plotly Express 인터랙티브 차트","Altair 선언형 시각화","Streamlit으로 공유"]},{h:"통계·ML",items:["기술통계·상관계수","t-test·카이제곱 검정","sklearn Pipeline 구성","joblib으로 모델 저장"]},{h:"자동화",items:["schedule·cron으로 반복 실행","Jinja2로 리포트 생성","LLM API 개요","파이프라인 설계"]},{h:"구조화·공유",items:["Jupyter vs .py 선택","프로젝트 폴더 표준","모듈화로 재사용","GitHub로 공유"]}],labs:[{title:"Lab1. Polars Lazy로 대용량 CSV 빠르게 집계",steps:["pl.scan_csv로 대용량 파일을 lazy로 연다.","filter·group_by·agg로 처리 계획을 쌓는다.","collect()로 실제 실행한다.","같은 작업을 Pandas로도 해 timeit으로 속도를 비교한다."]},{title:"Lab2. DuckDB로 Parquet에 SQL 분석",steps:[`duckdb.sql("SELECT day, AVG(tip) FROM 'tips.parquet' GROUP BY day") 처럼 파일에 직접 SQL을 실행한다.`,"결과를 DataFrame으로 받아 확인한다.","Pandas로 같은 집계를 했을 때와 코드 길이를 비교한다."]},{title:"Lab3. Plotly EDA + 기초 통계 + Pipeline",steps:["Plotly Express로 산점도·막대 인터랙티브 차트를 그린다.","두 그룹 평균 차이를 t-test로 검정한다.","sklearn Pipeline(전처리+모델)을 구성한다.","joblib으로 파이프라인을 저장한다."]},{title:"Lab. groupby·pivot_table·merge 로 표 요약·결합 (2교시 실습)",steps:["seaborn 의 tips 데이터를 불러온다: import seaborn as sns; df = sns.load_dataset('tips').","groupby: df.groupby('day')['tip'].mean() 으로 요일별 평균 팁을 구한다.","pivot_table: df.pivot_table(index='day', columns='smoker', values='tip', aggfunc='mean') 로 요일×흡연여부 교차표를 만든다.","merge: 요일별 평균을 담은 작은 표를 df 에 pd.merge(df, 평균표, on='day') 로 붙여 각 행에 '그 요일 평균'을 결합한다.","각 행의 tip 이 그 요일 평균보다 큰지 비교하는 파생 열을 만들어 결과를 확인한다."]}],homework:["공개 데이터셋 하나를 골라 Polars(또는 Pandas)로 EDA→Plotly 시각화 2개→관심 있는 두 집단 평균 차이를 t-test로 검정하고 결론을 한 문장으로 정리해 노트북으로 제출한다.","전처리+모델을 sklearn Pipeline으로 묶어 joblib으로 저장하고, 분석 프로젝트를 data/·src/·notebooks/ 폴더 구조로 정리해 README와 함께 GitHub에 공유한다."]},theory:{theory:[{h:"Pandas vs Polars vs DuckDB - 언제 무엇을 쓰나",body:`수만~수십만 줄 정도면 익숙한 Pandas로 충분하다.
수백만 줄이 넘거나 속도가 중요하면 필요한 계산만 몰아서 실행하는 Polars(Lazy)가 유리하고, 이미 파일로 저장된 데이터를 SQL로 빠르게 훑고 싶으면 DuckDB가 편하다.
데이터 크기와 작업 성격에 맞춰 도구를 고르는 판단 자체가 실무 역량이다.`},{h:"숫자로 끝내지 말고 검정하라",body:`요일별 평균 팁이 달라 보여도 그 차이가 우연일 수 있다.
t-검정이나 카이제곱 같은 가설 검정은 '이 차이가 통계적으로 의미 있는가'를 따져 잘못된 결론을 막아 준다.
눈에 보이는 숫자 차이를 곧바로 결론으로 삼지 않는 습관이 분석의 신뢰도를 높인다.`},{h:"전처리와 모델을 Pipeline으로 묶는 이유",body:`결측치 채우기나 스케일링을 학습 데이터에만 적용하고 예측할 때 빠뜨리면 결과가 어긋난다.
sklearn의 Pipeline은 전처리부터 모델까지 한 덩어리로 묶어 학습·예측에 똑같은 처리가 적용되도록 보장한다.
완성된 파이프라인은 joblib으로 통째로 저장·배포할 수 있어 실무 재현성도 확보된다.`},{h:"Pandas의 DataFrame이 엑셀보다 강력한 이유",body:`DataFrame 은 화면에 표로 보이지만, 그 안에서는 한 열 전체에 같은 규칙을 한 줄로 적용할 수 있다.
예를 들어 모든 금액에 부가세를 더해라를 엑셀은 셀마다 수식을 끌어 내려야 하지만, Pandas 는 df['price'] * 1.1 한 줄이면 끝난다.

또한 수십만 줄이 넘어가도 속도가 거의 떨어지지 않고, 결측치 처리·그룹 집계·표 합치기 같은 실무 작업이 함수 하나로 준비돼 있다.
비유하면 엑셀이 한 칸씩 손으로 채우는 도구라면, Pandas 는 열 단위로 명령을 내리는 자동화 도구다.`},{h:"지저분한 데이터를 깨끗이 만드는 과정",body:`현실의 데이터에는 빈칸(결측치)과 말도 안 되는 값(이상치)이 섞여 있어 그대로 평균을 내면 결과가 엉뚱해진다.
그래서 분석 전에 비어 있으면 어떻게 할지, 너무 크거나 작은 값은 어떻게 할지를 먼저 정한다.

빈칸은 행을 통째로 버리거나(dropna), 평균·0 같은 값으로 채워(fillna) 메운다.
이상치는 상식적인 범위를 정해 그 밖의 값을 걸러 내거나 따로 떼어 살펴본다.
이 정제 단계를 건너뛰면 뒤의 모든 분석이 오염되므로 가장 공들여야 하는 부분이다.`},{h:"왜 그래프로 그려 봐야 하나요?",body:`숫자 표만 보면 데이터의 흐름이나 튀는 값을 알아채기 어렵다.
같은 데이터라도 막대그래프나 산점도로 그리면 월요일에만 매출이 뚝 떨어진다 같은 패턴이 한눈에 보인다.

시각화는 분석가가 데이터와 대화하는 방법이라, 그래프를 그리다 보면 미처 몰랐던 질문이 떠오른다.
그래서 EDA 단계에서는 결론을 내기 전에 여러 각도로 그려 보며 데이터의 성격을 충분히 파악하는 것이 중요하다.`},{h:"Copy-on-Write - Pandas 2.x가 바꾼 복사 규칙 (1교시)",body:`Pandas 를 쓰다 보면 누구나 한 번은 만나는 경고가 SettingWithCopyWarning 이다. 'df 에서 일부를 잘라 낸 sub 를 고쳤는데, 원본 df 도 같이 바뀌었나? 안 바뀌었나?'가 애매했기 때문이다.

Pandas 2.x 는 이 혼란을 Copy-on-Write(CoW, 쓸 때 복사)라는 규칙으로 정리했다. 데이터를 잘라 낸 조각은 원본과 메모리를 잠시 공유하다가, 그 조각에 값을 '쓰는 순간'에만 진짜 복사가 일어난다. 그래서 조각을 고쳐도 원본은 절대 따라 바뀌지 않는다 - 동작이 예측 가능해진다.

실무적으로 무엇이 달라지나. 원본을 바꾸려면 df.loc[조건, '열'] = 값 처럼 원본에 직접 명확히 써야 하고, sub = df[조건] 뒤에 sub 를 고치는 건 원본에 영향이 없다. 덤으로 불필요한 복사를 줄여 메모리·속도도 개선된다.
핵심: '자른 건 자른 것, 원본은 원본' - CoW 덕분에 이 직관이 그대로 맞아떨어진다. 새로 시작하는 코드는 pd.options.mode.copy_on_write = True 를 켜 두는 걸 권장한다.`},{h:"시각화 도구 네 개, 언제 무엇을 쓰나 (5교시)",body:`차트 도구가 여러 개인 이유는 '누구에게 보여 줄 것인가'가 다르기 때문이다. 목적에 맞춰 고르면 된다.

Matplotlib 은 가장 오래된 기본 도구다. 세밀하게 다 조정할 수 있지만 코드가 길다. 논문·보고서에 넣을 정적 이미지(PNG)를 정확히 만들 때 쓴다.

Plotly Express 는 마우스를 올리면 값이 뜨고 확대·축소가 되는 인터랙티브 차트를 한 줄로 만든다. 발표나 대시보드처럼 '만져 보게 하고 싶을 때' 좋다.

Altair 는 '어떤 데이터를 어떤 축에 얹을지'만 선언하면 되는 문법이라, EDA 단계에서 빠르게 여러 각도로 그려 보기에 최적이다. 생각의 속도로 그림이 나온다.

Streamlit 은 차트를 넘어, 분석 결과를 몇 줄로 웹앱처럼 만들어 링크로 공유하는 도구다. '주피터를 못 여는 동료에게 결과를 보여 줄 때' 쓴다.
정리하면: 정밀 정적 이미지는 Matplotlib, 만지는 발표용은 Plotly, 빠른 탐색은 Altair, 웹으로 공유는 Streamlit. 하나만 고집하지 말고 상황에 맞춰 갈아탄다.`},{h:"분석 자동화 - schedule과 Jinja2로 리포트를 사람 손 없이 (7교시)",body:`좋은 분석일수록 매주·매일 반복된다. '월요일마다 지난주 매출을 정리해 리포트로 보낸다' 같은 일을 매번 손으로 하면 실수도 나고 시간도 든다. 이걸 코드가 대신하게 만드는 게 자동화다.

반복 실행은 두 가지로 건다. 개발·테스트 단계에서는 파이썬 안에서 도는 schedule 라이브러리로 'every().day.at("09:00")' 처럼 간단히 스케줄을 걸어 본다. 서버에 올려 진짜로 매일 돌릴 때는 운영체제의 cron 에 등록해 파이썬이 꺼져 있어도 시간이 되면 스크립트가 실행되게 한다.

리포트 본문은 Jinja2 템플릿으로 만든다. HTML/텍스트 틀을 미리 만들어 두고 {{ 매출 }}, {{ 증감 }} 같은 자리에 이번 회차 숫자만 갈아 끼우면, 매번 똑같은 형식의 리포트가 데이터만 바뀌어 자동 생성된다. 코드와 디자인이 섞이지 않아 유지보수가 쉽다.
큰 그림: 수집 → 분석 → Jinja2 로 리포트 렌더 → 저장/발송을 하나의 스크립트로 묶고, schedule/cron 이 그걸 정해진 시각에 눌러 주는 구조다. 사람은 결과만 확인하면 된다.`}]},realCodes:[{title:"CSV 적재부터 정제·집계·시각화까지 EDA 전 과정",lang:"python",code:`import pandas as pd            # 표 형태 데이터를 다루는 Pandas 라이브러리
import seaborn as sns          # 통계 그래프를 쉽게 그려 주는 시각화 라이브러리
import matplotlib.pyplot as plt  # 그래프 출력을 제어하는 기본 도구

df = sns.load_dataset('tips')  # 연습용 식당 팁 데이터를 표(DataFrame)로 불러온다

print(df.shape)                # 행·열 개수 확인 → 결과: (244, 7)
print(df.isna().sum().sum())   # 전체 결측치 총개수 확인 → 결과: 0

df = df.dropna()               # 혹시 빈칸이 있으면 그 행을 통째로 제거해 데이터를 깨끗이 한다

# total_bill(결제액)이 비정상적으로 큰 이상치를 상위 범위로 제한한다
df = df[df['total_bill'] <= 50]  # 50 이하 주문만 남겨 극단값 영향을 줄인다

# 새 파생 열: 팁 비율(팁 / 결제액 * 100)을 계산해 분석에 추가한다
df['tip_pct'] = df['tip'] / df['total_bill'] * 100  # 한 줄로 모든 행에 적용

# 요일(day)별로 묶어 평균 팁 비율을 집계한다
by_day = df.groupby('day')['tip_pct'].mean()  # groupby: 같은 요일끼리 모아 평균
print(by_day)                  # 결과: 요일별 평균 팁 비율(%) 출력

# 집계 결과를 막대그래프로 그려 한눈에 비교한다
sns.barplot(data=df, x='day', y='tip_pct')  # x=요일, y=팁비율 막대그래프
plt.title('day tip percent')                 # 그래프 제목을 단다
plt.savefig('tip_by_day.png')                # 그림을 파일로 저장한다

df.to_csv('tips_clean.csv', index=False)     # 정제된 표를 CSV 파일로 저장(인덱스 제외)
print('저장 완료')             # 결과: 저장 완료`,note:"적재 → 결측·이상치 정제 → 파생 열 생성 → groupby 집계 → 시각화 → 저장으로 이어지는 EDA 의 표준 흐름을 한 번에 보여 준다."}],periods:["1교시 Pandas 2.x 실전·Copy-on-Write","2교시 [실습] groupby·pivot_table·merge","3교시 Polars Lazy API·Pandas vs Polars 성능 비교","4교시 [실습] DuckDB로 CSV·Parquet에 SQL 분석","5교시 시각화: Matplotlib·Plotly·Altair·Streamlit","6교시 [실습] 기초 통계·가설 검정(t-test·카이제곱)","7교시 sklearn Pipeline·joblib·분석 자동화(schedule·Jinja2)","8교시 [메인 실습] 공개 데이터 EDA→시각화+통계→Pipeline→GitHub 공유"]}};export{n as default};
