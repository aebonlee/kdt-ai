const e={"agent-1":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 AI 에이전트란 - 챗봇과의 차이, Agent Protocol 개요"},{time:"10:00–10:50",topic:"2교시 ReAct 패턴 - 생각하고(Reason) 행동하기(Act)"},{time:"11:00–11:50",topic:"3교시 Agentic Workflow 설계: Goal · Plan · Execute · Reflect"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 [실습] 환경 셋업 + LangGraph 핵심(그래프·노드·State)"},{time:"14:00–14:50",topic:"5교시 [실습] State와 노드로 단순 그래프 만들기"},{time:"15:00–15:50",topic:"6교시 도구(Tool) 정의와 LLM이 도구를 부르게 하기"},{time:"16:00–16:50",topic:"7교시 Agentic RAG Workflow(검색·판단 루프) 개념과 조건 분기"},{time:"17:00–17:50",topic:"8교시 [실습] 단일 에이전트 완성 + 실행 결과 점검"}],practice:{title:"검색 도구를 쓰는 단일 ReAct 에이전트 직접 만들기",steps:["터미널을 열고 `python -m venv venv` 로 가상환경을 만든 뒤 `source venv/bin/activate`(윈도우는 venv\\Scripts\\activate) 로 활성화한다.","`pip install langgraph langchain langchain-anthropic` 명령으로 필요한 라이브러리를 설치한다(설치 끝에 'Successfully installed' 가 보이면 성공).",'발급받은 API 키를 `export ANTHROPIC_API_KEY="sk-..."` 로 환경변수에 넣는다(키를 코드에 직접 쓰지 않기 위해서다).',"`agent.py` 파일을 만들고, State(대화 상태)를 messages 리스트 하나로 정의한다.","두 자리 곱셈을 해주는 `multiply` 함수에 @tool 데코레이터를 붙여 '도구'로 등록한다.","LLM 노드와 도구 실행 노드(ToolNode)를 만들고, add_node 로 그래프에 두 노드를 추가한다.","add_conditional_edges 로 'LLM이 도구를 부르면 도구 노드로, 아니면 END로' 가는 분기를 연결한다.",'`graph.invoke({"messages": [("user", "23 곱하기 17은?")]})` 로 에이전트를 실행한다.',"출력 메시지를 확인하여 에이전트가 multiply 도구를 호출하고 최종 답 391을 내놓는지 점검한다(기대 결과: 마지막 메시지에 '391').","질문을 '오늘 기분이 어때?' 같은 도구가 필요 없는 문장으로 바꿔 실행해, 이번엔 도구를 안 부르고 바로 답하는지 비교한다."],deliverable:"도구 호출 분기가 동작하는 agent.py 파일과, 두 종류 질문(계산형/일상형)의 실행 로그 캡처"}},examples:[{title:"@tool 로 함수를 도구로 등록하기",lang:"python",code:`from langchain_core.tools import tool  # 함수를 도구로 바꿔 주는 데코레이터

@tool  # 이 한 줄이 아래 함수를 에이전트용 도구로 만든다
def get_weather(city: str) -> str:
    """도시 이름을 받아 그 도시의 날씨를 알려준다."""  # LLM은 이 설명을 보고 언제 쓸지 정한다
    return f"{city}의 날씨는 맑음, 24도"  # 실제로는 날씨 API를 부르겠지만 여기선 예시 값

print(get_weather.name)         # 결과: get_weather (도구 이름)
print(get_weather.description)  # 결과: 도시 이름을 받아 그 도시의 날씨를 알려준다.
print(get_weather.invoke({"city": "서울"}))  # 결과: 서울의 날씨는 맑음, 24도`,note:"함수 위에 @tool 만 붙이면 이름·설명·입력형식이 자동으로 잡혀 에이전트가 바로 쓸 수 있다."},{title:"add_messages 로 메시지가 쌓이는지 확인",lang:"python",code:`from langgraph.graph.message import add_messages  # 메시지를 이어붙여 주는 함수
from langchain_core.messages import HumanMessage, AIMessage  # 사람/AI 메시지 형식

old = [HumanMessage(content="안녕")]  # 기존 메모장에 있던 사람 메시지
new = [AIMessage(content="안녕하세요!")]  # 새로 추가할 AI 메시지

# add_messages는 old를 지우지 않고 new를 뒤에 붙여 하나의 리스트로 합친다
merged = add_messages(old, new)
print(len(merged))          # 결과: 2 (덮어쓰지 않고 합쳐졌다)
print(merged[0].content)    # 결과: 안녕
print(merged[1].content)    # 결과: 안녕하세요!`,note:"State의 messages가 매번 초기화되지 않고 대화가 누적되는 비결이 바로 이 add_messages다."},{title:"검색 결과를 채점해 재검색으로 갈라지는 Agentic RAG (조건 분기 데모)",lang:"python",code:`from langgraph.graph import StateGraph, START, END  # 그래프 뼈대와 시작/끝 표시
from typing import TypedDict  # 상태의 형태를 약속하는 타입

# 1) 상태: 질문, 검색된 문서, 재검색 횟수를 들고 다닌다
class State(TypedDict):
    question: str   # 사용자의 질문(재작성되며 바뀔 수 있다)
    docs: list      # 검색해서 가져온 문서들
    tries: int      # 재검색을 몇 번 했는지(무한 루프 방지용)

# 2) 검색 노드: 질문으로 문서를 가져온다(예시로 고정 응답)
def retrieve(state: State):
    # 실제로는 Vector DB를 검색한다. 여기선 첫 시도엔 부실한 결과, 재검색 땐 정확한 결과를 흉내
    if state["tries"] == 0:
        found = ["전기차 보조금은 지역마다 다르다"]              # 질문에 딱 맞지 않는 문서
    else:
        found = ["서울 전기차 보조금은 2026년 기준 최대 900만원"]  # 재검색 후 정확한 문서
    return {"docs": found}  # 찾은 문서를 상태에 저장

# 3) 채점 겸 분기 함수: 가져온 문서가 질문에 맞는지 스스로 판단한다
def grade(state: State) -> str:
    joined = " ".join(state["docs"])          # 문서들을 하나로 합쳐 살펴본다
    if state["tries"] >= 2:                    # 너무 많이 재검색했으면 그만(무한 루프 방지)
        return "generate"
    if "서울" in joined:                        # 아주 단순한 채점: 핵심어가 들어있으면 통과
        return "generate"                      # 근거 충분 → 답 생성으로
    return "rewrite"                           # 근거 부족 → 질문 다듬어 재검색

# 4) 질문 재작성 노드: 더 구체적으로 바꾸고 재검색 횟수를 하나 올린다
def rewrite(state: State):
    new_q = state["question"] + " 서울 2026년 기준"   # 질문을 더 구체화
    return {"question": new_q, "tries": state["tries"] + 1}

# 5) 답 생성 노드: 통과한 문서로 최종 답을 만든다(실제로는 LLM이 담당)
def generate(state: State):
    return {"docs": state["docs"]}  # 데모에서는 통과한 문서를 그대로 결과로 둔다

# 6) 그래프 조립
graph = StateGraph(State)
graph.add_node("retrieve", retrieve)  # 검색 노드
graph.add_node("rewrite", rewrite)    # 질문 재작성 노드
graph.add_node("generate", generate)  # 답 생성 노드
graph.add_edge(START, "retrieve")      # 시작하면 먼저 검색
# 검색 뒤 grade가 반환한 신호로 갈림길을 정한다(조건부 엣지)
graph.add_conditional_edges("retrieve", grade, {"generate": "generate", "rewrite": "rewrite"})
graph.add_edge("rewrite", "retrieve")  # 다듬은 질문으로 '다시 검색'하는 루프
graph.add_edge("generate", END)         # 답을 만들면 종료
app = graph.compile()

# 7) 실행: 처음엔 부실 검색 → 채점 실패 → 재작성 → 재검색 → 통과 → 답
result = app.invoke({"question": "전기차 보조금 얼마야?", "docs": [], "tries": 0})
print(result["docs"])  # 결과: ['서울 전기차 보조금은 2026년 기준 최대 900만원'] (재검색 후 통과)`,note:"7교시 이론(채점→조건분기→재검색 루프)을 눈으로 확인하는 최소 예제다. retrieve의 예시 응답을 실제 Vector DB 검색으로 바꾸고 grade를 LLM 채점으로 바꾸면 바로 실무형이 된다."},{title:"조건부 엣지 (도구 반복 제어)",lang:"python",code:`from langgraph.graph import StateGraph, START, END

def should_continue(state):
    # 마지막 메시지에 도구 호출이 있으면 'tools'로, 없으면 종료
    last = state["messages"][-1]
    return "tools" if last.tool_calls else END

g = StateGraph(State)
g.add_node("agent", call_model)
g.add_node("tools", run_tools)
g.add_edge(START, "agent")
# 조건부 분기: 에이전트 → (도구 필요?) → 도구 → 다시 에이전트(루프)
g.add_conditional_edges("agent", should_continue, {"tools": "tools", END: END})
g.add_edge("tools", "agent")`,note:"조건부 엣지가 ReAct 루프(추론→도구→재추론)를 형성한다. 무한루프 방지를 위해 최대 스텝 제한도 둔다."},{title:"LangGraph State 정의 - add_messages 리듀서로 대화 누적",lang:"python",code:`# pip install langgraph
# State는 노드끼리 주고받는 '공용 기억 저장소'다
from typing import Annotated, TypedDict
from langgraph.graph.message import add_messages

class GraphState(TypedDict):                          # 그래프 전체가 공유하는 상태 스키마
    question: str                                     # 사용자 질문(덮어쓰기 필드)
    context: str                                      # 검색된 문서(덮어쓰기 필드)
    answer: str                                       # 생성된 답변(덮어쓰기 필드)
    messages: Annotated[list, add_messages]           # 대화 메시지(누적 필드: 리듀서가 append)

# 일반 필드는 새 값으로 '덮어쓰기'되지만
# add_messages가 붙은 messages는 기존 리스트에 '누적'된다
s = {'question': 'HBM이란?', 'context': '', 'answer': '', 'messages': []}
s = {**s, 'messages': add_messages(s['messages'], [{'role': 'user', 'content': '안녕'}])}
s = {**s, 'messages': add_messages(s['messages'], [{'role': 'assistant', 'content': '반가워요'}])}
print('누적된 메시지 수:', len(s['messages']))         # 2 (덮어쓰지 않고 쌓인다)`,note:"State의 일반 필드는 노드를 지날 때 덮어쓰기되지만, add_messages 리듀서를 붙인 필드는 자동으로 누적된다. 이 덕분에 대화 맥락이 흐름 전체에 유지된다."},{title:"Node 함수 - State를 받아 State를 돌려주는 작업 단위",lang:"python",code:`# 노드는 하나의 함수다: 현재 State를 입력받아, 바꿀 부분만 State로 반환한다
from typing import TypedDict

class GraphState(TypedDict):                          # 앞에서 정의한 상태 재사용
    question: str
    context: str
    answer: str

def retrieve_node(state: GraphState) -> GraphState:   # 노드1: 문서 검색
    q = state['question']                             # State에서 질문을 읽고
    docs = f'[{q}] 관련 검색 문맥...'                   # 실제로는 벡터DB 검색(여기선 개념만)
    return {'context': docs}                          # context 키만 갱신해 반환

def generate_node(state: GraphState) -> GraphState:   # 노드2: 답변 생성
    ctx = state['context']                            # 앞 노드가 채운 context를 읽고
    ans = f'문맥 기반 답변(근거: {ctx})'               # 실제로는 LLM 호출
    return {'answer': ans}                            # answer 키만 갱신해 반환

# 두 노드를 순서대로 실행하면 State가 점진적으로 채워진다
st = {'question': 'HBM이란?', 'context': '', 'answer': ''}
st = {**st, **retrieve_node(st)}                      # 검색 노드 실행 -> context 채움
st = {**st, **generate_node(st)}                      # 생성 노드 실행 -> answer 채움
print(st['answer'])                                   # 검색->생성이 State로 연결된 것을 확인`,note:"노드는 State 전체가 아니라 자신이 읽고 쓸 키만 다뤄야 한다(State Ownership). 반환은 반드시 State여야 다음 노드가 이어받는다. 로직이 복잡하면 노드를 쪼개 디버깅을 쉽게 한다."},{title:"LangChain 1.0 create_agent - @tool로 ReAct 에이전트 만들기",lang:"python",code:`# pip install langchain langchain-openai
# LangChain 1.0은 create_agent 하나로 프롬프트+모델+도구를 묶는다(scratchpad 자동 관리)
from langchain.agents import create_agent
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI

@tool
def get_stock_price(ticker: str) -> str:              # @tool 데코레이터로 함수를 도구로 변환
    "Return today's closing price for a stock ticker."  # docstring은 LLM이 읽는 사용설명(영어 권장)
    prices = {'000660': '18만원', '005930': '7만원'}   # 실제로는 외부 API 호출
    return prices.get(ticker, '정보 없음')             # 티커에 맞는 종가 반환

agent = create_agent(                                 # 에이전트 정의
    model=ChatOpenAI(model='gpt-4o-mini'),            # 두뇌 역할 LLM
    tools=[get_stock_price],                          # 손발 역할 도구 목록
    system_prompt='너는 도구를 활용해 답하는 금융 비서다.',  # 역할 지시
)
result = agent.invoke({'messages': [                   # 메시지 중심 구조로 실행
    {'role': 'user', 'content': 'SK하이닉스(000660) 종가 알려줘'},
]})
print(result['messages'][-1].content)                 # LLM이 스스로 도구를 호출(ReAct)해 답한다`,note:"ReAct는 생각(Thought)->도구 호출(Action)->관찰(Observation)을 반복한다. create_agent가 이 루프와 scratchpad를 자동 관리해, @tool로 만든 도구만 넘기면 에이전트가 알아서 호출한다."},{title:"ReAct 루프를 파이썬으로 흉내 - Thought, Action, Observation",lang:"python",code:`def stock_price_tool(ticker):                  # 도구: 주가 조회(연습용 가짜 데이터)
    prices = {'SK하이닉스': 210000, '삼성전자': 71000}   # 미리 준비한 종가 표
    return prices.get(ticker, 0)               # 종목명으로 가격 반환

def react_agent(question):                     # ReAct: 사고와 행동을 번갈아 반복
    log = []                                   # 지금까지의 사고 기록(scratchpad)
    for step in range(3):                      # 무한루프 방지: 최대 3회 반복
        log.append('Thought: 답하려면 어떤 도구가 필요한가?')   # 1) Thought: 다음 행동 사고
        if 'SK하이닉스' in question:            # 2) Action: 도구 호출 결정
            obs = stock_price_tool('SK하이닉스')            # 도구 실행
            log.append('Action: stock_price_tool / Observation: ' + str(obs))  # 3) 결과 관찰
            if obs > 0:                        # 정보 충족성 판단(루프 종료 조건)
                return log, 'SK하이닉스 종가는 ' + format(obs, ',') + '원입니다.'  # 답변 확정
        log.append('Observation: 정보 부족, 다시 사고')   # 부족하면 루프 계속
    return log, '답을 찾지 못했습니다.'          # 최대 반복 도달 시 안전 종료

log, answer = react_agent('금일 SK하이닉스 종가는 얼마인가요?')   # 실행
print('\\n'.join(log))                          # 사고-행동-관찰 흐름 출력
print('Answer:', answer)                       # 최종 답변`,note:"ReAct는 Thought(사고), Action(도구 실행), Observation(결과 관찰)을 답이 나올 때까지 반복하는 프레임워크로, Reasoning과 Acting을 최초로 하나의 시스템에 결합한 연구다. 이 수동 구현이 create_agent가 내부에서 대신해 주는 일의 뼈대다. 정보 충족성 판단과 최대 반복 횟수 같은 종료 조건이 없으면 루프는 끝나지 않는다."},{title:"State 덮어쓰기(Overwrite) - 노드는 바뀐 키만 갱신한다",lang:"python",code:`# LangGraph의 State는 노드를 지날 때 '바뀐 키만' 덮어쓰고 나머지는 유지된다
state = {}                                     # 빈 상태에서 시작

def node1(state):                              # 노드1: 질문 입력 단계
    return {'time': 1, 'name': '철수', 'llm': 'GPT'}   # 세 키를 기록

def node2(state):                              # 노드2: 시간만 갱신
    return {'time': 2}                         # name과 llm은 건드리지 않음

def node3(state):                              # 노드3: 이름 변경 단계
    return {'time': 3, 'name': '영희'}          # name을 덮어쓰기

messages = []                                  # 대화 기록(누적이 필요한 필드)
for node in [node1, node2, node3]:             # 노드를 순서대로 실행
    update = node(state)                       # 노드가 돌려준 '부분 업데이트'
    state.update(update)                       # 일반 필드: 선택적 덮어쓰기
    messages = messages + ['통과: ' + str(update)]   # 리스트 필드: 리듀서처럼 누적
    print('state:', state)                     # 매 단계 상태 확인

print('messages 개수:', len(messages))         # 3건 모두 남아 있음(누적)
print('name 최종값:', state['name'])            # 영희 - 마지막 갱신만 남음(덮어쓰기)`,note:"교재의 State Update 표 그대로, 일반 필드는 Overwrite 방식이라 바뀐 키만 갱신되고 변경되지 않은 값은 유지되며 State가 점진적으로 확장된다. 반면 messages 같은 대화 필드는 add_messages 리듀서로 덮지 않고 누적해야 한다. 이 차이를 모르면 대화가 사라지거나 답이 안 바뀌는 버그를 만나게 된다."},{title:"실무형 GraphState 설계 - 중첩 구조와 실행 제어 필드",lang:"python",code:`from typing import TypedDict, List, Literal      # 타입 명세 도구

class RetrievalResult(TypedDict):                # 검색 계층: 검색 노드만 쓰는 영역
    query: str                                   # 실제 실행된 검색어
    documents: List[str]                         # 찾아온 문서들
    retrieval_time_ms: float                     # 검색 소요 시간(관측용)

class EvaluationResult(TypedDict):               # 평가 계층: 판정 노드만 쓰는 영역
    relevance: float                             # 관련성 점수
    overall: Literal['GOOD', 'BAD']              # 최종 판정(분기 기준)

class ErrorInfo(TypedDict, total=False):         # 실패 대비 영역(선택 필드 허용)
    message: str                                 # 에러 메시지
    node: str                                    # 실패한 노드 이름
    retry_count: int                             # 재시도 횟수

class GraphState(TypedDict, total=False):        # 전체 상태: 계층별로 묶어 관리
    user_input: str                              # 사용자 입력
    retrieval: RetrievalResult                   # 검색 결과(중첩 구조)
    evaluation: EvaluationResult                 # 평가 결과(중첩 구조)
    status: Literal['RUNNING', 'FAILED', 'SUCCESS']  # 실행 상태(관측·제어)
    step_count: int                              # 스텝 수(무한루프 방지)
    error: ErrorInfo                             # 에러 정보

state = GraphState(user_input='휴가 규정?', status='RUNNING', step_count=0)  # 초기 상태
print(state)                                     # 노드는 자기 계층의 키만 읽고 쓴다`,note:"교재의 Production-level State 설계로, 평평한 dict 대신 검색·평가·에러를 계층별 중첩 구조로 묶고 status·step_count·retry_count 같은 실행 제어 필드를 반드시 포함한다. State는 데이터 컨테이너가 아니라 노드 간의 Read/Write 계약이며, 노드는 자신이 읽고 쓸 키만 알아야 한다(State Ownership). step_count는 무한루프 방지의 안전장치다."}],concepts:[{term:"AI 에이전트(Agent)",desc:"사람이 시킨 목표를 받아 스스로 '무엇을 할지 판단하고 도구를 골라 실행'하는, 자율적으로 움직이는 LLM 프로그램이다."},{term:"도구(Tool)",desc:"검색·계산·DB조회처럼 LLM이 직접 못 하는 일을 대신 해주도록 미리 등록해 둔 함수다."},{term:"ReAct 패턴",desc:"에이전트가 '생각(Reason) → 행동(Act) → 관찰(Observe)' 을 반복하며 답에 가까워지는 사고-행동 방식이다."},{term:"그래프(Graph)",desc:"에이전트가 거쳐 가는 일의 순서를 노드(작업)와 엣지(이동선)로 그린 흐름도다."},{term:"노드(Node)",desc:"그래프 안에서 실제로 일을 처리하는 한 칸으로, 보통 함수 하나가 노드 하나가 된다."},{term:"State(상태)",desc:"에이전트가 일하는 동안 들고 다니는 공용 메모장으로, 대화 내용·중간 결과를 여기에 쌓는다. 이 State를 checkpointer로 저장해 두면 실행이 끝난 뒤에도 남아, 같은 thread_id로 다시 부를 때 이전 대화를 이어서 기억하는 장기 메모리가 된다."},{term:"조건부 엣지(Conditional Edge)",desc:"상태를 보고 '다음에 어느 노드로 갈지'를 그때그때 갈림길처럼 정해주는 연결선이다."},{term:"Agentic Workflow(Goal·Plan·Execute·Reflect)",desc:"에이전트가 목표를 세우고(Goal) 단계를 계획하고(Plan) 도구로 실행하고(Execute) 결과를 되돌아보며(Reflect) 개선하는, 일하는 방식의 설계 틀이다."},{term:"Agent Protocol",desc:"에이전트끼리, 또는 클라이언트와 표준 방식으로 요청·응답을 주고받게 정한 규약으로, 서로 다른 에이전트를 갈아 끼울 수 있게 한다."},{term:"Distributed Agent(분산 에이전트)",desc:"에이전트 여러 개를 한 프로세스 안에서만 부르는 대신, 서로 다른 서버·프로세스로 떼어 놓고 표준 규약(Agent Protocol)으로 메시지를 주고받게 만든 구조다. 한 에이전트가 다른 에이전트를 마치 도구처럼 호출할 수 있어, 팀·회사별로 만든 에이전트를 부품처럼 이어 붙여 큰 시스템을 만든다. 실습에서는 ReAct 단일 에이전트를 먼저 만든 뒤, 이를 별도로 띄워 다른 에이전트가 불러 쓰는 형태로 확장해 본다."}],detail:{topics:[{h:"LangChain과 LangGraph의 역할 구분",items:["LangChain: LLM 호출·도구 정의(@tool)·출력 파싱 등 낱개 기능 제공","LangGraph: 상태(State)를 들고 노드 사이를 도는 그래프로 반복·분기·기억을 제어","단순 1회 응답이면 LangChain만으로 충분, 도구를 여러 번 부르고 조건에 따라 갈라지면 LangGraph가 필요","실무 에이전트는 LangChain 부품 + LangGraph 흐름을 함께 사용"]},{h:"에이전트의 4가지 구성요소",items:["두뇌(LLM): 무엇을 할지 판단하고 글을 만드는 핵심","도구(Tools): 검색·계산·API 등 실제 일을 처리하는 손발","기억(State/Memory): 지금까지의 대화와 중간 결과를 담는 메모장","흐름 제어(Graph): 생각과 행동을 언제 반복하고 끝낼지 정하는 설계도"]},{h:"LangGraph 핵심 용어",items:["StateGraph: 상태를 들고 도는 그래프의 뼈대","add_node / add_edge: 노드(작업)와 연결선을 추가하는 함수","add_conditional_edges: 상태를 보고 다음 갈 곳을 정하는 갈림길","START / END: 그래프의 시작점과 종료점 표시","compile(): 그래프를 실제 실행 가능한 앱으로 굳히는 단계"]},{h:"처음 만들 때 자주 하는 실수",items:["bind_tools 를 빼먹어 LLM이 도구를 못 부르는 경우","tools 노드에서 model 로 되돌아가는 엣지를 안 그려 루프가 끊기는 경우","종료 조건(END)을 안 만들어 무한 반복에 빠지는 경우","API 키를 코드에 그대로 적어 노출되는 경우(환경변수로 빼야 함)"]},{h:"Agentic Workflow와 Agent Protocol",items:["Goal: 무엇을 달성할지 목표를 명확히","Plan → Execute: 단계를 계획하고 도구로 실행","Reflect: 결과를 스스로 점검해 다시 계획(자기 교정)","Agentic RAG Workflow: 근거 부족하면 재검색하는 루프","Agent Protocol: 표준 규약으로 에이전트를 갈아 끼우기"]}],labs:[{title:"Lab 1. 도구 없이 한 노드짜리 그래프 돌려보기",steps:["StateGraph(State) 로 빈 그래프를 만든다.","메시지를 그대로 모델에 넘기는 call_model 노드 하나만 add_node 한다.","START → model, model → END 로 두 엣지만 연결한다.","compile() 후 '자기소개 해줘' 를 invoke 해서 답이 한 번에 나오는지 확인한다(도구 없는 기본 흐름 체감)."]},{title:"Lab 2. 도구를 한 개 붙여 분기 만들기",steps:["multiply 함수에 @tool 을 붙여 도구로 등록한다.","llm.bind_tools([multiply]) 로 모델에 도구를 연결한다.","ToolNode([multiply]) 를 tools 노드로 추가하고 should_continue 분기를 연결한다.","'12 곱하기 9는?' 으로 실행해 model→tools→model 순서로 로그가 찍히는지 확인한다(기대 결과: 108)."]}],homework:["오늘 만든 에이전트에 'add(덧셈)' 도구를 하나 더 추가하고, '(3 더하기 4) 곱하기 5는?' 같은 두 단계 질문이 도구를 두 번 부르며 풀리는지 로그로 확인해 제출한다.","내가 자주 쓰는 업무(예: 환율 조회, 사내 위키 검색)를 에이전트로 만든다면 어떤 도구가 필요할지 3가지를 적고, 각 도구의 입력·출력을 한 줄씩 설계해 본다."]},theory:{theory:[{h:"LangGraph 설계의 3요소: Workflow·Loop·Memory",body:`LangGraph로 에이전트를 설계할 때는 세 가지를 정한다.
(1) Workflow — 노드와 엣지로 '일의 순서'를 그린다(그래프).
(2) Loop — 조건부 엣지로 '생각 → 행동 → 관찰'을 필요한 만큼 반복하다 조건이 맞으면 끝낸다(ReAct 루프).
(3) Memory — 한 번의 실행이 끝나도 대화·상태를 저장해 두었다가, 같은 thread_id로 다시 부르면 이전 맥락을 이어서 기억한다.

Memory는 checkpointer(체크포인터)로 구현하며, 이것이 있어야 '어제 하던 대화를 오늘 이어가기'나 '멈췄다 다시 시작하기'가 된다.
세 가지를 함께 놓고 보면 LangGraph가 '순서·반복·기억'을 한 그래프에서 관리하는 도구임이 분명해진다.`},{h:"챗봇과 에이전트는 무엇이 다를까",body:`보통의 챗봇은 질문을 받으면 자기가 외우고 있는 지식만으로 한 번에 답을 내놓는다.
그래서 '오늘 환율'처럼 최신 정보나 정확한 계산이 필요한 일은 틀리기 쉽다.

에이전트는 다르다.
에이전트는 '내가 지금 이걸 바로 답할 수 있나, 아니면 도구를 써야 하나'를 먼저 판단한다.
필요하면 계산기·검색·데이터베이스 같은 도구를 직접 골라 쓰고, 그 결과를 보고 다시 생각한 뒤 답을 만든다.
비유하면 챗봇은 '시험장에서 머리로만 푸는 학생'이고, 에이전트는 '계산기와 인터넷을 쓸 수 있는 학생'이다.`},{h:"ReAct - 생각과 행동을 번갈아 한다",body:`ReAct 는 Reasoning(추론) 과 Acting(행동) 의 앞 글자를 딴 말이다.
사람이 길을 찾을 때 '음, 지도를 봐야겠다(생각) → 지도를 켠다(행동) → 아 여기구나(관찰) → 그럼 왼쪽으로(생각)' 를 반복하는 것과 똑같다.

에이전트도 한 번에 끝내지 않고 이 '생각 → 행동 → 관찰' 고리를 여러 번 돈다.
도구를 한 번 써서 얻은 결과가 부족하면 또 도구를 쓰고, 충분해지면 비로소 최종 답을 낸다.
LangGraph 는 바로 이 반복되는 고리를 그래프(흐름도)로 깔끔하게 그릴 수 있게 도와주는 도구다.`},{h:"왜 LangGraph 인가 - 상태를 들고 도는 흐름도",body:`에이전트는 같은 노드를 여러 번 돌기 때문에, 그동안 무엇을 했는지 '기억'을 들고 다녀야 한다.
LangGraph 는 이 기억을 State(상태) 라는 공용 메모장에 담아 노드마다 자동으로 넘겨준다.

각 노드는 메모장을 받아 자기 일을 하고, 바뀐 메모장을 다음 노드로 넘긴다.
그리고 '도구를 더 써야 하면 도구 노드로, 다 됐으면 끝(END)으로' 가는 갈림길을 조건부 엣지로 그려두면, 복잡한 반복 로직을 if-else 범벅 없이 그림 한 장으로 관리할 수 있다.`},{h:"Agentic Workflow — 목표→계획→실행→반성",body:`에이전트가 잘 일하게 하려면 그냥 '알아서 해'가 아니라 일하는 틀을 준다.
대표적인 것이 Goal·Plan·Execute·Reflect 4단계다. 먼저 무엇을 이룰지 목표(Goal)를 분명히 하고, 어떤 단계로 갈지 계획(Plan)한 뒤, 도구로 실행(Execute)하고, 결과가 목표에 맞는지 스스로 되돌아보며(Reflect) 필요하면 계획을 고친다.

이 '반성' 단계가 핵심이다. 사람도 한 번에 완벽히 하기보다 해보고 고치는데, 에이전트도 중간 결과를 보고 스스로 교정하면 훨씬 견고해진다.
RAG에 이 틀을 적용한 것이 '부족하면 다시 검색하는' Agentic RAG Workflow다. 또 에이전트끼리·클라이언트와 표준 규격으로 주고받게 정한 Agent Protocol을 쓰면, 서로 다른 에이전트를 부품처럼 갈아 끼울 수 있다.`},{h:"Agent Protocol — 에이전트끼리 말이 통하게 하는 '공용 규격'",body:`1교시 라벨의 뒷부분인 'Agent Protocol 개요'를 여기서 채워서 가르친다. 강의 흐름은 이렇게 잡는다.
먼저 문제를 던진다 — "에이전트를 잘 만들었는데, 옆 팀 에이전트나 프런트엔드가 이걸 어떻게 불러 쓸까?" 함수 하나면 그냥 호출하면 되지만, 에이전트는 여러 번 생각하고 도중에 멈춰 사람을 기다리기도 하는 '살아있는 프로그램'이라 단순 함수 호출로는 부족하다. 그래서 부르는 쪽과 만드는 쪽이 미리 약속을 정해 둔다. 이 약속이 Agent Protocol이다.

핵심 포인트 세 가지로 설명한다.
(1) 무엇을 표준화하나 — '작업 하나를 시작(run)하고, 대화 세션(thread)을 이어가고, 중간 상태를 저장(store)하는' 공통 창구를 정한다. 그래서 안이 LangGraph든 다른 프레임워크든, 밖에서 부르는 방식은 똑같다.
(2) 왜 중요한가 — 규격이 같으면 에이전트를 부품처럼 갈아 끼울 수 있다. A팀이 만든 '검색 에이전트'를 B팀이 자기 시스템에 그대로 꽂고, 나중에 더 좋은 걸로 바꿔도 부르는 코드는 안 바뀐다.
(3) 세 가지 결이 있다 — 사람/앱이 에이전트를 부르는 규격(Agent Protocol), 에이전트가 '도구'를 표준 방식으로 연결하는 규격(MCP, 캡스톤에서 상세), 에이전트가 다른 에이전트를 부르는 규격(A2A). 오늘은 '표준이 있으면 갈아 끼우기 쉽다'는 감만 잡으면 충분하고, 실제 구현은 뒤 과목에서 다룬다.

마무리 한 문장: 챗봇과 에이전트의 차이(앞 항목)가 '무엇이 다른가'였다면, Agent Protocol은 '만든 에이전트를 어떻게 세상과 연결하나'에 대한 답이다.`},{h:"LLM은 어떻게 도구를 '부를까' — 도구 호출의 원리와 분산 에이전트",body:`6교시 라벨('도구 정의와 LLM이 도구를 부르게 하기 + Distributed 개념 맛보기')의 이론 토대다. 실습(예제 @tool) 바로 앞에서 원리를 말로 설명해 준다.

먼저 흔한 오해를 깬다 — "LLM이 직접 함수를 실행하나요?" 아니다. LLM은 글자를 만들 뿐, 코드를 실행하지 못한다. 그럼 어떻게 계산기를 쓸까? 순서로 설명한다.
① 준비: bind_tools로 모델에게 '너가 쓸 수 있는 도구 목록'을 알려준다. 이때 넘어가는 건 도구의 이름·설명(docstring)·입력 형식 세 가지다. LLM은 이 설명을 읽고 '언제 어떤 도구를 쓸지' 판단한다. 그래서 docstring을 대충 쓰면 도구를 엉뚱하게 부른다 — 도구 설명은 사람이 아니라 LLM에게 쓰는 사용설명서다.
② 호출 요청: 사용자가 '23 곱하기 17'을 물으면, LLM은 답을 지어내는 대신 '나 multiply라는 도구를 a=23, b=17로 쓰고 싶어'라는 요청(tool_calls)을 내놓는다. 여전히 실행은 안 한 상태다.
③ 실행: 이 요청을 받아 실제로 함수를 돌리는 건 우리 코드(ToolNode)다. 결과(391)를 도구 결과 메시지로 만들어 다시 LLM에게 돌려준다.
④ 마무리: LLM은 그 결과를 보고 '391입니다'라는 자연어 답을 완성한다. 이 ②~④가 바로 어제 배운 ReAct 루프의 한 바퀴다.

핵심 포인트: LLM은 '판단하고 요청'만 하고, '실행'은 우리 코드가 한다. 이 역할 분리를 이해하면 도구 관련 버그(도구를 안 부름 → bind_tools 누락, 결과가 안 돌아옴 → tools→model 엣지 누락)를 스스로 찾을 수 있다.

마지막에 Distributed(분산 에이전트)를 맛보기로 얹는다: 지금까지는 도구가 '내 코드 안의 함수'였다. 그런데 도구 자리에 '다른 서버에 떠 있는 또 다른 에이전트'를 놓으면 어떻게 될까? 내 에이전트가 옆 팀 에이전트를 마치 도구처럼 부르는 것이다. 이렇게 에이전트를 여러 서버에 나눠 띄우고 표준 규약으로 부르는 구조가 분산 에이전트다. 팀별로 만든 에이전트를 레고처럼 이어 붙여 큰 시스템을 만드는 길이며, 내일 배울 멀티 에이전트의 확장판이라고 예고하고 마친다.`},{h:"Agentic RAG Workflow — 검색 결과를 '스스로 채점'하고 갈라지는 루프",body:`7교시('Agentic RAG Workflow 개념과 조건 분기')를 통째로 진행할 이론 블록이다. RAG를 이미 배운 학습자에게 '한 단계 위'를 보여주는 시간이다.

먼저 기존 RAG의 약점을 짚는다. 보통의 RAG는 [질문 → 검색 → 그대로 답] 한 줄이다. 문제는 검색이 엉뚱한 문서를 가져와도 그걸 근거로 삼아 그럴듯하게 지어낸다는 점이다. 검색이 틀리면 답도 틀리는데, 스스로 알아채지 못한다.

Agentic RAG는 여기에 어제 배운 Reflect(자기 점검) 정신을 넣는다. 강의 흐름은 '검색한 뒤 바로 답하지 말고, 가져온 문서가 질문에 정말 맞는지 스스로 채점(grade)하게 하자'로 잡는다. 채점 결과에 따라 길이 갈라진다.
① 문서가 충분히 관련 있음 → 그대로 답 생성(generate)으로 간다.
② 문서가 부실함 → 질문을 더 구체적으로 다듬어(query rewrite) 다시 검색한다. 이게 '검색·판단 루프'다.
③ 더 나아가면, 애초에 검색이 필요 없는 질문(인사·잡담)은 검색을 건너뛰고 바로 답하도록 앞단에서 한 번 더 분기할 수도 있다.

핵심 포인트: 이 '채점 → 갈림길'이 바로 어제 배운 조건부 엣지(add_conditional_edges)로 구현된다. 채점 노드가 상태에 '통과/재검색' 신호를 남기면, 조건부 엣지가 그 신호를 보고 generate 노드로 갈지 retrieve 노드로 되돌아갈지 정한다. 즉 Agentic RAG는 새로운 마법이 아니라, 어제 배운 State·노드·조건부 엣지 위에 '채점 노드' 하나를 얹은 것이다.

왜 중요한가: 실서비스에서 RAG 품질 사고의 대부분은 '검색은 실패했는데 답은 나온' 경우다. 채점·재검색 루프는 이 실패를 시스템이 스스로 걸러내게 해준다. 무한 반복을 막기 위해 재검색 횟수 상한을 두는 것도 함께 강조한다. 이어지는 예제로 '채점 → 조건 분기 → 재검색 루프'를 코드로 확인한다고 예고하고 넘어간다.`}]},realCodes:[{title:"검색·계산 도구를 쓰는 단일 ReAct 에이전트 (엔드투엔드)",lang:"python",code:`# LangGraph에서 그래프를 만들기 위한 핵심 도구들을 불러온다
from langgraph.graph import StateGraph, START, END  # 그래프 뼈대(StateGraph)와 시작/끝 표시(START/END)
from langgraph.prebuilt import ToolNode  # 도구를 실제로 실행해 주는 미리 만들어진 노드
from langchain_anthropic import ChatAnthropic  # Anthropic(클로드) 모델을 부르는 클래스
from langchain_core.tools import tool  # 일반 함수를 '도구'로 등록하는 데코레이터
from typing import Annotated, TypedDict  # 상태의 형태(타입)를 정의할 때 쓰는 도구
from langgraph.graph.message import add_messages  # 메시지를 '덮어쓰지 않고 이어붙이게' 해주는 함수

# 1) 상태(State) 정의: 에이전트가 들고 다니는 공용 메모장
class State(TypedDict):  # 딕셔너리인데 어떤 키가 들어가는지 미리 약속해 둔 형태
    # messages 키에는 대화 메시지들이 쌓인다. add_messages 덕분에 새 메시지가 '추가'된다
    messages: Annotated[list, add_messages]

# 2) 도구 정의: LLM이 직접 못 하는 정확한 계산을 대신해 줄 함수
@tool  # 이 데코레이터가 아래 함수를 '에이전트가 부를 수 있는 도구'로 바꿔 준다
def multiply(a: int, b: int) -> int:
    """두 정수 a와 b를 곱해 결과를 돌려준다."""  # 이 설명을 LLM이 읽고 언제 쓸지 판단한다
    return a * b  # 실제 곱셈 결과를 반환

tools = [multiply]  # 에이전트가 쓸 수 있는 도구 목록(여기선 곱셈 하나)

# 3) 모델 준비: 클로드 모델에 우리가 만든 도구 목록을 '연결'한다
llm = ChatAnthropic(model="claude-opus-4-8")  # 사용할 LLM 지정
llm_with_tools = llm.bind_tools(tools)  # 모델이 필요할 때 multiply를 호출하도록 도구를 묶어 줌

# 4) LLM 노드: 메모장을 받아 모델에게 물어보고, 답(또는 도구 호출 요청)을 메모장에 추가
def call_model(state: State):
    response = llm_with_tools.invoke(state["messages"])  # 지금까지의 대화를 통째로 모델에 넘김
    return {"messages": [response]}  # 모델의 응답을 messages에 이어붙이도록 반환

# 5) 분기 함수: 모델이 도구를 부르려 하면 'tools'로, 아니면 끝('END')으로 가도록 판단
def should_continue(state: State):
    last = state["messages"][-1]  # 가장 최근 메시지(=방금 모델이 한 말)를 꺼낸다
    # tool_calls가 비어 있지 않으면 모델이 도구를 쓰고 싶다는 뜻이다
    if last.tool_calls:
        return "tools"  # 도구 실행 노드로 보낸다
    return END  # 도구가 필요 없으면 여기서 종료

# 6) 그래프 조립: 노드를 추가하고 엣지(이동선)로 연결한다
graph = StateGraph(State)  # State 형태를 쓰는 빈 그래프 생성
graph.add_node("model", call_model)  # 'model'이라는 이름으로 LLM 노드 등록
graph.add_node("tools", ToolNode(tools))  # 'tools' 이름으로 도구 실행 노드 등록
graph.add_edge(START, "model")  # 시작하면 무조건 model 노드부터
graph.add_conditional_edges("model", should_continue)  # model 다음은 조건에 따라 tools 또는 END
graph.add_edge("tools", "model")  # 도구를 쓴 뒤에는 결과를 들고 다시 model로 돌아가 생각
app = graph.compile()  # 그래프를 실행 가능한 형태로 완성

# 7) 실행: 사용자의 질문을 넣고 에이전트를 돌린다
result = app.invoke({"messages": [("user", "23 곱하기 17은 얼마야?")]})
print(result["messages"][-1].content)  # 결과: 23 곱하기 17은 391입니다 (와 같은 자연어 답)`,note:`도구 호출이 필요하면 model→tools→model 로 한 바퀴 더 돌고, 충분하면 END로 끝나는 ReAct 루프의 가장 기본 형태다.
같은 그래프에 도구만 늘리면 검색·DB조회 에이전트로 확장된다.`},{title:"실전: 고수준 에이전트 + 스텝 제한·체크포인트",lang:"python",code:`from langgraph.prebuilt import create_react_agent
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
    print(out["messages"][-1].content)`,note:"recursion_limit로 도구 반복 폭주를 막고, MemorySaver 체크포인터로 thread_id별 멀티턴 맥락을 유지. eval은 빌트인 차단으로 최소 안전화."}],periods:["1교시 AI 에이전트란 - 챗봇과의 차이, Agent Protocol 개요","2교시 ReAct 패턴 - 생각하고(Reason) 행동하기(Act)","3교시 Agentic Workflow 설계: Goal · Plan · Execute · Reflect","4교시 [실습] 환경 셋업 + LangGraph 설계 3요소(Workflow·Loop·Memory)","5교시 [실습] State·노드로 Workflow 그래프 만들기(Loop·Memory 반영)","6교시 도구(Tool) 정의와 LLM이 도구를 부르게 하기 + Distributed(분산 에이전트) 개념 맛보기","7교시 Agentic RAG Workflow(검색·판단 루프) 개념과 조건 분기","8교시 [실습] 단일 에이전트 완성 + 실행 결과 점검"]},"agent-2":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 단일 에이전트의 한계와 멀티 에이전트의 필요성"},{time:"10:00–10:50",topic:"2교시 멀티 에이전트 패턴: Supervisor · Middleware"},{time:"11:00–11:50",topic:"3교시 [실습] Supervisor로 전문가 에이전트 라우팅"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 Harness Engineering과 Parallel Execution(Fan-out)"},{time:"14:00–14:50",topic:"5교시 [실습] Fan-out으로 여러 작업 동시 실행하기"},{time:"15:00–15:50",topic:"6교시 Human-in-the-loop - interrupt로 사람 승인 받기"},{time:"16:00–16:50",topic:"7교시 에러 복구·재시도·관측(로깅/추적) 다루기"},{time:"17:00–17:50",topic:"8교시 [실습] 멀티 에이전트 워크플로 완성 + 회고"}],practice:{title:"조사 담당 + 작성 담당으로 협업하는 멀티 에이전트 워크플로 만들기",steps:["1일차 가상환경을 다시 활성화하고 `pip install langgraph langchain langchain-anthropic` 가 되어 있는지 확인한다.","`multiagent.py` 파일을 만들고, 공용 State에 messages 와 'next'(다음에 일할 에이전트 이름) 두 칸을 둔다.","검색 도구를 쓰는 researcher(조사) 노드와, 글을 다듬는 writer(작성) 노드를 각각 함수로 만든다.","supervisor(감독) 노드를 만들어, 현재 상황을 보고 'researcher / writer / FINISH' 중 누구에게 일을 넘길지 정하게 한다.","add_conditional_edges 로 supervisor 의 결정에 따라 알맞은 작업자 노드로 가도록 연결하고, 작업자는 끝나면 다시 supervisor 로 돌아오게 한다.","writer 노드 앞에 interrupt_before 를 걸어, 글을 쓰기 직전 사람이 한 번 확인(승인)하도록 멈추는 지점을 만든다.",'`app.invoke({"messages": [("user", "전기차 시장 동향을 조사해서 3줄 요약해줘")]}, config)` 로 실행한다.',"승인 대기에서 멈추면, 상태를 확인하고 `app.invoke(None, config)` 로 사람이 '진행'을 눌러 이어가게 한다.","최종 출력에서 조사 결과를 바탕으로 writer 가 3줄 요약을 만들었는지 확인한다(기대 결과: 사람 승인 후 요약문 출력).","질문을 바꿔(예: 도구가 필요 없는 인사) supervisor 가 바로 FINISH 로 보내는지 비교 관찰한다."],deliverable:"supervisor가 작업자를 라우팅하고 writer 전에 사람 승인이 끼어드는 multiagent.py 와, 승인 전/후 실행 로그 캡처"}},examples:[{title:"interrupt 지점에서 멈췄는지 확인하기",lang:"python",code:`config = {"configurable": {"thread_id": "t1"}}  # 대화 한 건을 구분하는 식별자
app.invoke({"messages": [("user", "보고서 작성")], "next": ""}, config)  # 실행하면 writer 전에 멈춤

state = app.get_state(config)  # 멈춘 순간의 현재 상태를 꺼낸다
print(state.next)  # 결과: ('writer',)  -> 다음에 실행될 노드가 writer 임을 보여줌
# next가 비어 있지 않다는 것은 '아직 안 끝나고 사람을 기다리는 중'이라는 신호다
print("승인 대기 중" if state.next else "이미 종료됨")  # 결과: 승인 대기 중`,note:"get_state로 멈춘 위치를 확인할 수 있어, 사람이 무엇을 승인하는지 보고 결정할 수 있다."},{title:"감독의 라우팅 분기 함수만 따로 테스트",lang:"python",code:`from langgraph.graph import END  # 종료 표시

def route(state):
    if state["next"] == "FINISH":  # 감독이 끝내라고 정했으면
        return END                  # 종료로 보냄
    return state["next"]            # 아니면 작업자 이름 그대로 반환

print(route({"next": "researcher"}))  # 결과: researcher
print(route({"next": "writer"}))      # 결과: writer
print(route({"next": "FINISH"}) == END)  # 결과: True (종료로 연결됨)`,note:"분기 로직을 그래프와 떼어 따로 검증하면, 라우팅 버그를 빠르게 잡을 수 있다."},{title:"Fan-out으로 여러 조사를 '동시에' 실행하고 결과 모으기 (Send API)",lang:"python",code:`from langgraph.graph import StateGraph, START, END  # 그래프 뼈대와 시작/끝
from langgraph.types import Send  # 여러 갈래로 '동시에' 일을 뿌리는 도구
from typing import TypedDict, Annotated  # 상태 형태 정의
import operator  # 리스트를 '합치는' 방식을 지정할 때 사용

# 1) 전체 상태: 나눠 조사할 소주제 목록과, 병렬 결과를 모을 리스트
class State(TypedDict):
    subtopics: list                          # 동시에 조사할 소주제들
    results: Annotated[list, operator.add]   # operator.add 덕분에 병렬 결과가 '덮어쓰기'가 아니라 '합쳐진다'

# 2) 개별 작업 노드: 소주제 하나를 조사한다(여러 개가 동시에 실행됨)
def research_one(state: dict):
    topic = state["topic"]                    # Send가 넘겨준 '나 하나의' 소주제
    # 실제로는 검색/LLM 호출. 여기선 예시로 조사 결과 문자열을 만든다
    return {"results": [f"[{topic}] 조사 완료"]}  # 리스트로 반환 → operator.add로 자동 누적

# 3) 팬아웃 분배 함수: 소주제 개수만큼 research_one을 동시에 띄운다
def fan_out(state: State):
    # 소주제마다 Send로 research_one에 '개별 입력'을 하나씩 뿌린다 → 병렬 실행
    return [Send("research_one", {"topic": t}) for t in state["subtopics"]]

# 4) 취합 노드: 흩어진 병렬 결과가 다 모인 뒤 다음 단계로 넘긴다
def gather(state: State):
    print("모인 결과 수:", len(state["results"]))  # 결과: 3 (세 조사가 모두 합류)
    return {}  # 이미 results에 다 모여 있으므로 그대로 통과

# 5) 그래프 조립
graph = StateGraph(State)
graph.add_node("research_one", research_one)  # 병렬로 여러 번 실행될 작업 노드
graph.add_node("gather", gather)              # 결과를 모으는 합류 노드
# 시작에서 fan_out으로 여러 갈래를 동시에 펼친다(세 번째 인자는 갈 수 있는 노드 목록)
graph.add_conditional_edges(START, fan_out, ["research_one"])
graph.add_edge("research_one", "gather")  # 모든 병렬 작업이 끝나면 gather로 합류
graph.add_edge("gather", END)
app = graph.compile()

# 6) 실행: 세 소주제가 순차가 아니라 동시에 조사된다
result = app.invoke({"subtopics": ["배터리", "충전인프라", "정책보조금"], "results": []})
print(result["results"])  # 결과: 세 소주제의 '조사 완료'가 리스트로 모임`,note:"5교시 실습의 핵심 데모다. 소주제 3개를 한 줄로 차례차례 하지 않고 동시에 펼쳐(Fan-out) 실행한 뒤 한곳으로 모은다(gather). research_one 안의 예시 문자열을 실제 검색·LLM 호출로 바꾸면 조사 시간이 크게 줄어드는 실무형이 된다."},{title:"불안정한 도구에 재시도 걸고, 관측(LangSmith) 켜기",lang:"python",code:`import os
from langchain_core.tools import tool  # 함수를 도구로 만드는 데코레이터

# 1) 관측(Observability): 환경변수만 켜면 LangSmith가 모든 실행을 자동 추적한다
os.environ["LANGSMITH_TRACING"] = "true"    # 추적 켜기 (이후 그래프 실행이 전부 기록됨)
os.environ["LANGSMITH_API_KEY"] = "ls-..."  # 발급받은 LangSmith 키(실제 값으로 교체)
# 이제부터 에이전트를 돌리면 각 노드의 입력·출력·소요시간·토큰·비용이 대시보드 타임라인에 남는다

# 2) 재시도·에러 복구: 자주 실패하는 외부 호출을 도구로 감싼다
@tool
def fetch_price(ticker: str) -> str:
    """종목 코드를 받아 현재가를 조회한다."""  # LLM이 언제 쓸지 읽는 설명
    import random
    if random.random() < 0.4:                 # 40% 확률로 '일시적 네트워크 오류'를 흉내
        raise ConnectionError("일시적 네트워크 오류")
    return f"{ticker}: 12,300원"              # 성공 시 현재가 반환

# with_retry: 실패하면 자동으로 다시 시도한다(최대 3번, 간격을 조금씩 늘려가며)
safe_fetch = fetch_price.with_retry(stop_after_attempt=3)

# 3) 그래도 최종 실패할 수 있으니 try-except로 감싸 흐름이 통째로 멈추지 않게 한다
try:
    print(safe_fetch.invoke({"ticker": "005930"}))  # 실패해도 최대 3번까지 자동 재시도
except Exception as e:
    print("3번 시도 후에도 실패:", e)  # 끝내 실패하면 에러를 잡아 안전하게 처리

# 참고: 그래프를 컴파일해 실행할 때 recursion_limit를 두면 무한 반복도 막을 수 있다
# app.invoke(input, config={"recursion_limit": 10})  # 노드를 10번 넘게 돌면 강제 중단`,note:"7교시 이론(재시도·에러복구·관측)을 코드로 확인한다. with_retry는 일시적 실패를 자동으로 넘기고, 환경변수 두 줄이면 코드 수정 없이 모든 노드 실행이 대시보드에 추적된다."},{title:"Supervisor 멀티 에이전트",lang:"python",code:`# 감독(supervisor)이 다음에 일할 전문 에이전트를 고른다
def supervisor(state):
    decision = llm.invoke(
        f"작업: {state['task']}\\n다음 담당자를 고르라: [researcher, coder, FINISH]"
    )
    return {"next": decision.content.strip()}

# researcher/coder는 각자 전문 도구를 가진 서브그래프
# supervisor → (next) → 해당 에이전트 → supervisor ... → FINISH`,note:"감독 패턴은 역할을 분리해 복잡한 작업을 분해한다. 각 에이전트는 자신의 도구·프롬프트에 집중."},{title:"Agentic RAG - 문서 품질을 채점하고 나쁘면 질의 재작성",lang:"python",code:`# 단순 RAG는 첫 검색이 나쁘면 그대로 틀린다. Agentic RAG는 스스로 평가하고 다시 찾는다
from langgraph.graph import StateGraph, START, END
from typing import TypedDict

class RAGState(TypedDict):                            # 그래프 공유 상태
    question: str                                     # (재작성될 수 있는) 질문
    docs: str                                         # 검색 결과
    grade: str                                        # 'GOOD' 또는 'BAD'
    tries: int                                        # 재시도 횟수(무한루프 방지용)

def retrieve(state):                                  # 노드: 검색
    return {'docs': f"[{state['question']}] 검색 결과"}  # 실제로는 벡터DB 검색

def grade(state):                                     # 노드: 검색 품질 자가 채점
    ok = '결과' in state['docs'] and state['tries'] < 2   # 실제로는 LLM이 관련성 판정
    return {'grade': 'GOOD' if ok else 'BAD'}

def rewrite(state):                                   # 노드: 질의 재작성 후 재검색 유도
    return {'question': state['question'] + ' (구체화)', 'tries': state['tries'] + 1}

def route(state):                                     # 조건부 분기: 채점 결과로 경로 결정
    return END if state['grade'] == 'GOOD' else 'rewrite'  # 좋으면 종료, 나쁘면 재작성

g = StateGraph(RAGState)                              # 그래프 생성
for name, fn in [('retrieve', retrieve), ('grade', grade), ('rewrite', rewrite)]:
    g.add_node(name, fn)                              # 노드 3개 등록
g.add_edge(START, 'retrieve')                         # 시작 -> 검색
g.add_edge('retrieve', 'grade')                       # 검색 -> 채점
g.add_conditional_edges('grade', route, {'rewrite': 'rewrite', END: END})  # 채점 -> 분기
g.add_edge('rewrite', 'retrieve')                     # 재작성 -> 다시 검색(루프)
app = g.compile()                                     # 실행 가능한 앱으로 컴파일
print(app.invoke({'question': 'HBM', 'docs': '', 'grade': '', 'tries': 0})['grade'])`,note:'검색->채점->(나쁘면)재작성->재검색 루프가 Agentic RAG의 핵심이다. tries로 최대 재시도를 제한해 무한루프를 막는다. 조건부 엣지가 "검색이 나쁠 때 스스로 회복"하게 만든다.'},{title:"Reflection 패턴 - 초안 생성 후 스스로 비평하고 개선",lang:"python",code:`# 에이전트가 자기 답을 되돌아보고(Reflect) 더 나은 답을 만드는 품질 통제 루프
from openai import OpenAI
client = OpenAI(api_key='sk-본인키')

def generate(task, feedback=''):                      # 생성 단계: 초안 또는 개선안 작성
    prompt = f'과제: {task}'                           # 기본 지시
    if feedback:                                      # 피드백이 있으면 반영하도록 덧붙인다
        prompt += f'\\n아래 지적을 반영해 다시 써라:\\n{feedback}'
    r = client.chat.completions.create(model='gpt-4o-mini',
        messages=[{'role': 'user', 'content': prompt}])
    return r.choices[0].message.content

def reflect(draft):                                   # 비평 단계: 초안의 약점을 지적
    r = client.chat.completions.create(model='gpt-4o-mini',
        messages=[{'role': 'user', 'content': f'다음 글의 부족한 점만 짚어라:\\n{draft}'}])
    return r.choices[0].message.content

task = '벡터DB를 3문장으로 설명'                        # 수행할 과제
draft = generate(task)                                # 1) 초안 생성
for i in range(2):                                    # 2) 비평->개선을 최대 2회 반복
    critique = reflect(draft)                         # 자기 비평
    draft = generate(task, feedback=critique)         # 비평을 반영해 다시 생성
print('최종본:', draft)                                # 루프를 거치며 품질이 올라간다`,note:"Reflection은 Generate와 Reflect 두 LLM 호출을 번갈아 돌려 답을 개선한다. Andrew Ng 실험처럼 반복 워크플로를 감싸면 같은 모델도 성능이 크게 오른다. 반복 상한을 둬 비용·무한루프를 통제한다."},{title:"Agent-as-Tool - 서브에이전트를 도구처럼 감싸 호출",lang:"python",code:`from langchain.tools import tool                 # 함수를 도구로 바꾸는 데코레이터

def python_exec_agent(task, data):               # 내부는 복잡한 서브에이전트라고 가정
    result = sum(data) / len(data)               # (예시) 데이터 분석 코드 실행
    return '평균 = ' + str(round(result, 2))     # 결과만 요약해 반환

@tool
def run_python_agent(task: str) -> str:
    """Run the python analysis agent for numeric tasks."""  # LLM이 읽는 설명(영어 권장)
    data = [12, 45, 33, 60]                      # 필요한 데이터만 골라 전달(State 격리)
    return python_exec_agent(task, data)         # 서브에이전트의 최종 결과만 돌려줌

# 오케스트레이터(메인 에이전트)는 이 도구의 내부가 에이전트인지 알 필요가 없다
# 전체 대화 기록을 넘기지 않고 입출력 인터페이스만 노출하는 것이 핵심
print(run_python_agent.invoke('네 개 수치의 평균을 구해줘'))     # 도구처럼 한 번 호출
print(run_python_agent.name, ':', run_python_agent.description)  # 도구 메타 정보 확인`,note:"코드 실행이 필요할 때만 서브에이전트에 필요한 데이터만 전달하고 결과값을 받아오는, 교재 퀴즈 1번의 정답 패턴이다. 전체 대화 기록을 공유하지 않는 State Isolation 덕분에 컨텍스트 오염과 비용을 줄인다. 다만 도구로 호출될 때마다 서브에이전트 전체 실행 비용이 발생하고 오케스트레이터 의존도가 커진다."},{title:"Judge와 Gate 분리 - 판정은 확률, 분기는 결정론",lang:"python",code:`import random                                   # LLM 판정의 확률성을 흉내

def judge_node(answer):                         # Judge: LLM 호출(확률적 출력)
    score = random.uniform(0.5, 1.0)            # 같은 입력에도 점수가 흔들릴 수 있음
    verdict = 'PASS' if score >= 0.8 else 'FAIL'    # 판정 결과
    return {'verdict': verdict, 'score': round(score, 2)}   # 판정만 반환(라우팅은 안 함)

def gate(judge_result, retry_count, max_retry=2):   # Gate: 순수 함수(결정론적 라우팅)
    if judge_result['verdict'] == 'PASS':       # PASS면 언제나
        return 'END'                            # 같은 경로: 종료
    if retry_count >= max_retry:                # 재시도 한도를 넘으면 언제나
        return 'FALLBACK'                       # 같은 경로: 대체 응답
    return 'REGENERATE'                         # 그 외에는 언제나: 재생성

retry = 0                                       # 재시도 카운터
while True:                                     # 에이전트 루프
    result = judge_node('생성된 답변')            # 1) 확률적 판정
    route = gate(result, retry)                 # 2) 결정론적 분기
    print('판정:', result, '-> 경로:', route)    # 흐름 확인
    if route != 'REGENERATE':                   # 종료 또는 대체 경로면
        break                                   # 루프 탈출(코드로 강제된 종료 조건)
    retry += 1                                  # 재시도 횟수 증가`,note:"Harness Engineering의 결정론적 경계 — LLM Judge의 출력은 여전히 확률 분포라서 결정론이 되는 것은 판정의 정확성이 아니라 판정 결과를 받아 분기·재시도로 잇는 파이프라인의 동작이다. 판정과 라우팅을 한 노드에 섞으면(검증하고 다음 단계도 정해라) 이 경계가 사라진다. 루프 종료 조건은 모델 판단이 아니라 코드 상수(max_retry)에 박아야 한다."},{title:"도구 권한 하네스 - 노출 필터와 실행 게이트의 2단 방어",lang:"python",code:`WRITE_TOOLS = {'refund', 'delete_record'}       # 쓰기(위험) 도구 목록: 상수로 고정
REFUND_CAP = 100000                             # 환불 한도: 프롬프트가 아닌 코드에 박기

def expose_tools(role):                         # 1단계 노출 필터(결정론)
    all_tools = ['search', 'calculator', 'refund', 'delete_record']   # 전체 도구
    if role != 'admin':                         # 관리자가 아니면
        return [t for t in all_tools if t not in WRITE_TOOLS]  # 위험 도구를 모델에게 아예 안 보여줌
    return all_tools                            # 관리자에게만 전부 노출

def execute_gate(tool_name, args, role):        # 2단계 실행 게이트(결정론 + HITL)
    if tool_name in WRITE_TOOLS and role != 'admin':   # 권한 없는 쓰기 요청은
        return '차단: 권한 없음'                  # 무조건 차단
    if tool_name == 'refund' and args.get('amount', 0) > REFUND_CAP:  # 한도 초과 환불은
        return '보류: 사람 승인 필요(HITL)'        # 사람의 승인 흐름으로 전환
    return '실행 허용'                            # 안전한 요청만 실제 실행

print(expose_tools('user'))                     # 일반 사용자: 조회 도구만 보임
print(execute_gate('refund', {'amount': 50000}, 'admin'))    # 한도 이내: 허용
print(execute_gate('refund', {'amount': 999999}, 'admin'))   # 한도 초과: HITL 보류
print(execute_gate('delete_record', {}, 'user'))             # 권한 없음: 차단`,note:"권한을 프롬프트에 위임하는 것이 대표 안티패턴 — 프롬프트는 확률적 준수일 뿐 강제가 아니다. 교재의 가이드처럼 두 미들웨어로 나눠, 노출 필터는 역할에 따라 모델에게 보이는 도구 자체를 제한하고 실행 게이트는 호출 시점에 상수(REFUND_CAP)와 분기 조건으로 재검증한다. 결정론으로 거를 수 없는 고위험 요청만 HITL(사람 승인)로 넘긴다."}],concepts:[{term:"멀티 에이전트(Multi-Agent)",desc:"한 명이 다 하는 대신, 조사·작성·검수처럼 역할을 나눠 맡은 여러 에이전트가 협력해 일을 끝내는 구조다."},{term:"슈퍼바이저(Supervisor)",desc:"전체를 지휘하며 '지금은 누구에게 일을 시킬지'를 정해 주는 감독 역할의 에이전트다."},{term:"작업자(Worker)",desc:"조사 전담·작성 전담처럼 한 가지 일에 특화되어 감독이 시킨 일만 처리하는 에이전트다."},{term:"서브그래프(Subgraph)",desc:"작은 그래프 하나를 통째로 큰 그래프의 노드처럼 끼워 넣어, 복잡한 기능을 부품처럼 재사용하는 방법이다."},{term:"Human-in-the-loop(HITL)",desc:"에이전트가 위험하거나 중요한 행동을 하기 전에 잠깐 멈추고 사람의 확인·승인을 받게 하는 안전장치다."},{term:"interrupt(인터럽트)",desc:"그래프를 특정 지점에서 일부러 멈춰 사람의 입력을 기다리게 했다가, 다시 이어서 실행하게 하는 기능이다."},{term:"checkpointer(체크포인터)",desc:"에이전트가 멈춘 순간의 상태를 저장해 두었다가 나중에 그 자리에서 이어갈 수 있게 해주는 저장소다."},{term:"Middleware(미들웨어)",desc:"에이전트 실행 전후에 로깅·검증·입력 가공 같은 공통 처리를 끼워 넣는 중간 계층으로, 여러 에이전트가 같은 규칙을 공유하게 한다."},{term:"Harness Engineering",desc:"에이전트 두뇌(LLM) 바깥의 '주변 장치(하네스)' — 도구 연결·병렬 실행·오류 처리·관측 — 를 잘 갖추도록 설계하는 것으로, 실서비스 성능을 좌우한다."},{term:"Parallel Execution(Fan-out)",desc:"여러 작업을 한 줄로 순서대로 하지 않고 동시에 펼쳐(Fan-out) 실행한 뒤 결과를 모아, 전체 시간을 크게 줄이는 기법이다."}],detail:{topics:[{h:"멀티 에이전트 설계 패턴",items:["Supervisor(슈퍼바이저): 감독 한 명이 전문 작업자를 지휘(가장 보편적)","Middleware: 실행 전후 공통 처리(로깅·검증·가공)를 끼우는 중간 계층","서브그래프: 작은 그래프를 부품처럼 큰 그래프에 끼워 재사용","공용 메모리: 작업자들이 같은 State 메모장을 공유해 결과 전달"]},{h:"Harness Engineering과 병렬 실행(Fan-out)",items:["Harness: LLM 바깥의 도구·오류처리·관측 등 주변 장치 설계","Parallel Execution(Fan-out): 독립 작업을 동시에 펼쳐 실행","결과 취합(gather): 병렬 결과를 모아 다음 단계로","언제 병렬? 서로 의존하지 않는 조사·검색·요약 작업"]},{h:"Human-in-the-loop 활용 지점",items:["메일 전송·결제·삭제 등 되돌리기 어려운 행동 직전 승인","에이전트가 만든 초안을 사람이 수정 후 이어가기","민감한 데이터 접근 전 권한 확인","여러 후보 중 사람이 하나를 골라 진행시키기"]},{h:"안정적 운영을 위한 장치",items:["재시도(retry): 도구 호출이 일시적으로 실패하면 자동 재시도","에러 처리: try-except로 실패를 잡아 흐름이 멈추지 않게","관측(observability): LangSmith 등으로 각 노드 입출력을 추적","무한 루프 방지: 반복 횟수 상한(recursion_limit) 설정"]}],labs:[{title:"Lab 1. 작업자 한 명 더 추가하기",steps:["기존 그래프에 reviewer(검수) 노드 함수를 하나 더 만든다.","supervisor 프롬프트의 선택지에 reviewer 를 추가한다.","add_node 로 reviewer 를 등록하고 reviewer→supervisor 엣지를 연결한다.","'요약 후 맞춤법까지 검수해줘' 로 실행해 writer 다음에 reviewer 가 호출되는지 확인한다."]},{title:"Lab 2. 승인 후 내용을 수정해서 이어가기",steps:["writer 전에서 멈춘 뒤 app.get_state(config) 로 현재 메시지를 확인한다.",'app.update_state(config, {"messages": [("user", "3줄 말고 5줄로 해줘")]}) 로 지시를 바꾼다.',"app.invoke(None, config) 로 이어서 실행한다.","최종 출력이 5줄 요약으로 바뀌었는지 확인한다(사람이 흐름에 개입해 결과를 바꾼 사례)."]},{title:"Lab 3. Fan-out으로 소주제 3개를 동시에 조사하기",steps:["multiagent.py 옆에 fanout.py 파일을 새로 만들고, langgraph.types에서 Send를, typing에서 Annotated를, 표준 라이브러리 operator를 import 한다.","상태 State에 subtopics(조사할 소주제 리스트)와 results를 두되, results는 Annotated[list, operator.add]로 선언해 병렬 결과가 '합쳐지도록' 만든다(덮어쓰기 방지).","소주제 하나를 받아 조사 결과 문자열을 리스트로 반환하는 research_one 노드와, 결과 개수를 출력하는 gather 노드를 만든다.",'fan_out 함수에서 소주제마다 Send("research_one", {"topic": t})를 리스트로 반환해, START에서 add_conditional_edges(START, fan_out, ["research_one"])로 여러 갈래를 동시에 펼친다.',`research_one→gather, gather→END 엣지를 연결하고 compile 한 뒤, subtopics=["배터리","충전인프라","정책보조금"]으로 실행해 results에 3개가 모두 모이는지 확인한다(기대: '모인 결과 수: 3').`,"research_one 안에 import time; time.sleep(2)를 넣고, 순차 실행이라면 6초가 걸릴 일이 병렬이라 2초 안팎에 끝나는지 체감해 본다(Fan-out의 이득 확인)."]}],homework:["오늘 만든 멀티 에이전트에 '번역' 작업자를 추가해, 최종 요약을 영어로도 만들어 달라고 하면 supervisor 가 researcher→writer→translator 순으로 지휘하는지 로그로 확인해 제출한다.","내 업무 중 '사람 승인이 꼭 필요한 자동화'를 한 가지 정하고, 어느 노드 앞에 interrupt 를 걸지와 승인 화면에 무엇을 보여줄지 3~4문장으로 설계해 본다."]},theory:{theory:[{h:"왜 에이전트를 여러 명으로 나눌까",body:`에이전트 한 명에게 조사도 시키고 글쓰기도 시키고 검수까지 시키면, 지시문이 길어지고 헷갈려 품질이 떨어진다.
사람 회사도 한 명이 모든 일을 다 하지 않고 팀을 나누는 것과 같은 이유다.

멀티 에이전트는 '조사 담당', '작성 담당', '검수 담당'처럼 역할을 쪼갠다.
각 에이전트는 자기 일에만 집중하므로 지시가 짧고 명확해져 결과가 좋아진다.
그리고 이들을 지휘하는 슈퍼바이저(감독)가 '이번엔 조사부터, 그다음 작성' 식으로 순서를 정해 준다.
비유하면 슈퍼바이저는 PD, 작업자들은 각 분야 전문가다.`},{h:"슈퍼바이저-작업자 패턴",body:`가장 많이 쓰는 멀티 에이전트 구조가 슈퍼바이저-작업자(supervisor-worker) 패턴이다.
중앙에 감독 한 명을 두고, 그 주위에 전문 작업자들을 둔다.

흐름은 단순하다.
작업자가 일을 끝낼 때마다 결과를 들고 감독에게 돌아오고, 감독은 '아직 부족하니 다음은 작성 담당', '이제 충분하니 끝(FINISH)' 을 정한다.
이렇게 하면 모든 결정이 감독 한 곳을 거치므로 흐름을 이해하고 디버깅하기가 쉽다.
작업자를 새로 추가하고 싶으면 감독의 선택지에 이름 하나만 늘리면 된다.`},{h:"사람이 끼어드는 Human-in-the-loop",body:`에이전트에게 메일 전송이나 결제처럼 되돌리기 어려운 일을 그냥 맡기면 사고가 날 수 있다.
그래서 중요한 행동 직전에 '잠깐 멈추고 사람에게 물어보기'를 넣는다.
이것이 Human-in-the-loop, 줄여서 HITL 이다.

LangGraph 에서는 특정 노드 앞에 interrupt(인터럽트) 를 걸어 그래프를 그 지점에서 멈춘다.
사람이 상태를 확인하고 괜찮으면 '진행'을, 아니면 내용을 고친 뒤 다시 이어가게 한다.
이때 멈춘 상태를 기억해 두는 역할을 체크포인터가 하므로, 자리를 비웠다가 와서 이어가도 처음부터 다시 하지 않는다.
비유하면 자동운전 중 위험 구간에서 '운전 넘겨받으시겠어요?' 하고 손을 들어주는 것과 같다.`},{h:"확장의 두 축: Harness Engineering과 병렬 실행(Fan-out)",body:`멀티 에이전트를 크게 키우는 데는 두 축이 있다.
첫째는 Harness Engineering이다. 에이전트의 두뇌(LLM) 바깥에 도구 연결·오류 처리·관측 같은 '주변 장치(하네스)'를 잘 갖추는 일로, 실서비스 성능을 좌우한다.
여러 에이전트가 같은 규칙(로깅·검증·입력 가공)을 공유하도록 실행 전후에 끼우는 Middleware도 여기에 속한다.

둘째는 Parallel Execution, 즉 Fan-out이다.
서로 의존하지 않는 조사·검색·요약 작업을 한 줄로 차례차례 하지 않고, 동시에 펼쳐 실행한 뒤 결과를 모으면 전체 시간을 크게 줄일 수 있다.
Supervisor가 이 병렬 작업자들을 지휘하면, 견고하면서도 빠른 멀티 에이전트가 된다.
요리로 치면, 한 명이 재료 손질·조리·플레이팅을 순서대로 하는 대신 여러 요리사가 동시에 나눠 맡고 마지막에 접시에 모으는 것과 같다.`},{h:"Middleware — 모든 에이전트가 공유하는 '공통 처리 라인'",body:`2교시 라벨은 'Supervisor · Middleware'인데 슈퍼바이저는 앞 항목에서 다뤘으니, 여기서 Middleware를 채워 가르친다. 두 개념을 나란히 대비시키는 게 핵심이다.
슈퍼바이저가 '누가 일할지'를 정하는 지휘자라면, Middleware는 '누가 일하든 똑같이 거쳐야 하는 공통 처리 라인'이다.

실생활 비유로 연다: 회사에서 어느 부서가 일하든 '결재 기록 남기기, 개인정보 가리기, 보안 검토'는 공통으로 거친다. 이런 공통 절차를 각 부서가 따로 만들면 제각각이 되고 빠뜨리기 쉽다. 그래서 중앙에 공통 라인을 하나 두고 모두 통과시킨다. 소프트웨어의 미들웨어가 이것이며, 웹 서버에서 모든 요청이 인증·로깅 미들웨어를 지나는 것과 같은 발상이다.

에이전트에서 Middleware가 맡는 공통 처리 예를 든다.
(1) 로깅·추적 — 어느 에이전트가 실행되든 입력과 출력을 똑같은 형식으로 기록한다.
(2) 입력 가공 — 대화가 너무 길어지면 오래된 메시지를 잘라내(context 관리) 매 호출마다 자동 적용한다.
(3) 가드레일·검증 — 욕설·개인정보·금지 요청을 실행 전에 걸러내거나, 결과 형식이 맞는지 실행 후에 검사한다.
(4) 공통 재시도·에러 처리 — 도구 호출 실패 시 재시도 규칙을 모든 에이전트가 공유한다(7교시로 이어짐).

핵심 포인트: 미들웨어는 '실행 전(before)'과 '실행 후(after)'에 끼어드는 계층이다. LangGraph에서는 노드 함수를 감싸거나 그래프 앞뒤에 공통 노드를 두는 식으로 구현한다. 왜 중요한가 — 멀티 에이전트가 3개, 5개로 늘어날 때 로깅·검증을 에이전트마다 복붙하면 유지보수가 무너진다. 공통 라인 하나로 모으면 규칙을 한 곳에서 바꿔 전체에 적용할 수 있다. Harness Engineering(4교시)이 말하는 '두뇌 바깥의 주변 장치'가 바로 이 미들웨어를 포함한다고 연결해 주고 마친다.`},{h:"실서비스로 가려면 — 재시도·에러 복구·관측(Observability)",body:`7교시('에러 복구·재시도·관측') 전체를 진행하는 이론 블록이다. 데모는 되는데 실서비스에서 자꾸 죽는 에이전트를 어떻게 견고하게 만드는지를 다룬다. 강의는 '왜 에이전트가 유독 잘 깨지나 → 세 가지 방어막' 구조로 연다.

먼저 에이전트가 깨지기 쉬운 이유를 짚는다. 에이전트는 외부 도구(검색 API·DB·다른 서버)를 계속 부르는데, 이들은 네트워크 지연·타임아웃·호출 한도(rate limit)로 수시로 일시적 실패를 낸다. 게다가 LLM은 매번 조금씩 다르게 답해서(비결정적) 어제 되던 게 오늘 안 되기도 한다. 그래서 '한 번 실패=전체 중단'이면 서비스가 못 버틴다.

방어막 세 가지를 순서대로 설명한다.
(1) 재시도(retry) — 일시적 실패는 잠깐 뒤 다시 하면 대개 성공한다. 도구 호출에 '최대 3번까지, 간격을 조금씩 늘려가며(backoff) 재시도'를 걸어 둔다. 자잘한 실패를 시스템이 알아서 넘긴다.
(2) 에러 복구(error handling) — 재시도로도 안 되면? try-except로 예외를 잡아 흐름이 통째로 멈추지 않게 한다. 실패 사실을 에러 메시지로 만들어 LLM에게 돌려주면, LLM이 '그 도구는 실패했으니 다른 방법으로' 하고 스스로 경로를 바꾸기도 한다. 또 반복이 끝나지 않는 사고를 막으려면 recursion_limit로 최대 반복 횟수 상한을 반드시 둔다.
(3) 관측(Observability) — 멀티 에이전트는 노드가 여러 개라 '어디서 왜 틀렸는지'가 안 보이면 고칠 수가 없다. LangSmith 같은 추적 도구를 붙이면 각 노드의 입력·출력·소요 시간·토큰·비용이 타임라인으로 남는다. 환경변수 하나만 켜면 코드 수정 없이 모든 실행이 자동 기록된다.

핵심 포인트이자 마무리: 재시도는 '자잘한 실패를 넘기고', 에러 복구는 '큰 실패에도 안 멈추게 하고', 관측은 '무엇이 실패했는지 보이게 한다'. 이 셋이 있어야 프로토타입이 서비스가 된다. 이어지는 예제로 with_retry와 관측 설정을 코드로 확인한다고 예고한다.`}]},realCodes:[{title:"슈퍼바이저가 조사·작성 작업자를 지휘 + 작성 전 사람 승인 (엔드투엔드)",lang:"python",code:`from langgraph.graph import StateGraph, START, END  # 그래프 뼈대와 시작/끝 표시
from langgraph.checkpoint.memory import MemorySaver  # 멈춘 상태를 기억해 두는 체크포인터(메모리용)
from langchain_anthropic import ChatAnthropic  # 클로드 모델
from typing import TypedDict, Literal  # 상태 형태와 '정해진 값만 허용' 타입

llm = ChatAnthropic(model="claude-opus-4-8")  # 공용으로 쓸 LLM 준비

# 1) 공용 상태: 대화 누적(messages)과 다음에 일할 사람(next)을 담는다
class State(TypedDict):
    messages: list   # 지금까지 오간 모든 메시지
    next: str        # supervisor가 정한 다음 작업자 이름

# 2) 감독 노드: 현재 상황을 보고 누구에게 일을 시킬지 한 단어로 답하게 한다
def supervisor(state: State):
    prompt = (
        "너는 팀 감독이다. 대화를 보고 다음에 할 일을 정하라. "  # 감독 역할 부여
        "조사가 필요하면 researcher, 글 작성이면 writer, 다 끝났으면 FINISH 라고만 답하라."  # 선택지 안내
    )
    # 시스템 지시 + 지금까지 대화를 함께 모델에 넘긴다
    decision = llm.invoke([("system", prompt)] + state["messages"]).content.strip()
    return {"next": decision}  # 감독의 결정을 상태의 next에 저장

# 3) 조사 작업자: 자료를 찾는 역할(여기선 예시로 고정 텍스트 반환)
def researcher(state: State):
    info = "조사결과: 전기차 시장은 연 20% 성장, 배터리 가격 하락이 핵심 동력."  # 실제로는 검색 도구 사용
    return {"messages": state["messages"] + [("assistant", info)]}  # 조사 내용을 대화에 추가

# 4) 작성 작업자: 모아진 내용을 바탕으로 3줄 요약을 만든다
def writer(state: State):
    summary = llm.invoke(
        state["messages"] + [("user", "위 내용을 3줄로 요약해줘")]  # 누적 대화 + 요약 지시
    )
    return {"messages": state["messages"] + [summary]}  # 요약 결과를 대화에 추가

# 5) 분기 함수: 감독이 정한 next 값에 따라 어디로 갈지 결정
def route(state: State) -> Literal["researcher", "writer", "__end__"]:
    if state["next"] == "FINISH":  # 감독이 끝내라고 했으면
        return END                  # 그래프 종료
    return state["next"]            # 아니면 해당 작업자 이름으로 이동

# 6) 그래프 조립
graph = StateGraph(State)
graph.add_node("supervisor", supervisor)  # 감독 노드
graph.add_node("researcher", researcher)  # 조사 노드
graph.add_node("writer", writer)          # 작성 노드
graph.add_edge(START, "supervisor")        # 시작은 항상 감독부터
graph.add_conditional_edges("supervisor", route)  # 감독 다음은 결정에 따라 분기
graph.add_edge("researcher", "supervisor")  # 조사 끝나면 감독에게 보고
graph.add_edge("writer", "supervisor")      # 작성 끝나면 감독에게 보고

# 7) 사람 승인: writer 노드 '직전'에 멈추도록 인터럽트를 걸고, 상태를 기억할 체크포인터 연결
memory = MemorySaver()  # 멈춘 지점의 상태를 저장해 둘 곳
app = graph.compile(checkpointer=memory, interrupt_before=["writer"])  # writer 전에 일시정지

# 8) 실행: thread_id로 대화 한 건을 식별(이어가기 위해 필요)
config = {"configurable": {"thread_id": "demo-1"}}
app.invoke({"messages": [("user", "전기차 시장 동향 조사해서 3줄 요약")], "next": ""}, config)
print("writer 실행 직전에서 멈춤 - 사람 승인 대기")  # 결과: 여기서 한 번 멈춘다
# 사람이 내용을 확인한 뒤 '진행'을 의미하는 None을 넣어 이어서 실행한다
final = app.invoke(None, config)
print(final["messages"][-1].content)  # 결과: 전기차 시장의 3줄 요약문`,note:`supervisor가 작업자들을 라우팅하고, writer 직전 interrupt_before로 멈춰 사람이 승인해야 마지막 요약이 진행되는 멀티 에이전트 + HITL 의 기본 골격이다.
researcher의 고정 텍스트를 실제 검색 도구로 바꾸면 바로 실무형이 된다.`}],periods:["1교시 단일 에이전트의 한계와 멀티 에이전트의 필요성","2교시 멀티 에이전트 패턴: Supervisor · Middleware","3교시 [실습] Supervisor로 전문가 에이전트 라우팅","4교시 Harness Engineering과 Parallel Execution(Fan-out)","5교시 [실습] Fan-out으로 여러 작업 동시 실행하기","6교시 Human-in-the-loop - interrupt로 사람 승인 받기","7교시 에러 복구·재시도·관측(로깅/추적) 다루기","8교시 [실습] 멀티 에이전트 워크플로 완성 + 회고"]}};export{e as default};
