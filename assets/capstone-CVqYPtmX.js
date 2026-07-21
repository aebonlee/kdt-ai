const e={"capstone-1":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 OT: 캡스톤 목표와 Backend·VectorDB·Agent(MCP)·Frontend 전체 그림"},{time:"10:00–10:50",topic:"2교시 MCP(Model Context Protocol) 개요와 MCP Server 구성요소"},{time:"11:00–11:50",topic:"3교시 MCP 설계: Tool·Resource·Prompt 분리 의사결정"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 [실습] MCP Server 구현하고 MCP Inspector로 점검"},{time:"14:00–14:50",topic:"5교시 통합 아키텍처: 시스템 경계(Backend·VectorDB·Agent·Frontend) 설계"},{time:"15:00–15:50",topic:"6교시 [실습] FastAPI에 RAG + Agent + MCP Client 통합"},{time:"16:00–16:50",topic:"7교시 [실습] Thread(대화 세션) 관리 붙이기"},{time:"17:00–17:50",topic:"8교시 통합 스모크 테스트와 중간 점검"}],practice:{title:"MCP Server를 만들고 FastAPI 백엔드에 통합해 동작하는 /chat 엔드포인트 완성하기",steps:["팀 서비스를 정하고, 필요한 기능을 Tool(실행)·Resource(읽기)·Prompt(템플릿) 3가지로 분류한 표를 만든다.",`가상환경을 만들고(activate) 'pip install "mcp[cli]" fastapi uvicorn langchain-mcp-adapters langgraph langchain-anthropic python-dotenv' 로 설치한다.`,"'.env' 에 'ANTHROPIC_API_KEY=발급받은_키' 를 적고 .gitignore에 .env·venv/ 를 추가한다.","아래 realCode의 'server.py' 를 붙여넣어 @mcp.tool() 로 도구 1개(search_docs 등)를 정의한다.","'mcp dev server.py' 를 실행하면 MCP Inspector 웹이 열린다. Tools 탭에서 도구가 보이고 직접 호출해 결과가 나오는지 확인한다.","아래 realCode의 'main.py' 를 붙여넣어 FastAPI /chat 에 MCP Client + 에이전트를 통합한다.","'uvicorn main:app --reload' 실행 후 'http://localhost:8000/docs' 에서 /chat 에 질문을 넣어 본다.","(기대 결과) 질문을 넣으면 에이전트가 MCP 도구를 거쳐 답을 만들어 돌려주면 성공.","팀 아키텍처 그림(4박스: Backend·VectorDB·Agent·Frontend)과 Tool·Resource·Prompt 분류표를 한 장으로 정리한다.","코드를 깃에 커밋·푸시한다('feat: MCP 서버 + FastAPI 통합')."],deliverable:"MCP Server(server.py, Inspector 확인) + 통합 백엔드(main.py, /chat 동작) + Tool·Resource·Prompt 분류표와 아키텍처 그림"}},examples:[{title:"우리 서비스 기능을 Tool·Resource·Prompt로 분류하기",lang:"python",code:`# MCP 서버에 무엇을 넣을지, 기능을 3종류로 나눠 적어둔다
catalog = {
    'Tool': ['문서 검색(search_docs)', '매출 조회(get_sales)'],      # 실행·부작용 있는 기능
    'Resource': ['팀 설정(config://team)', '규정 원문(doc://policy)'],  # 읽기 전용 자료
    'Prompt': ['요약 요청 템플릿', '분류 요청 템플릿'],                 # 재사용 지시 템플릿
}

for kind, items in catalog.items():  # 종류별로 꺼내
    print(f'[{kind}] ' + ', '.join(items))  # 결과: 3줄로 분류표가 출력됨
`,note:"부작용(쓰기·과금·외부호출)이 있으면 Tool, 단순 조회면 Resource로 나누는 것이 기준입니다."},{title:"MCP 라이브러리가 잘 깔렸는지 점검",lang:"python",code:`import mcp  # MCP 파이썬 SDK
from mcp.server.fastmcp import FastMCP  # 서버 헬퍼가 import 되는지 확인

print('mcp import 성공!')  # 결과: 이 줄이 보이면 설치 정상
print('FastMCP 준비 완료:', FastMCP.__name__)  # 결과: FastMCP 준비 완료: FastMCP
`,note:`import 에러가 나면 'pip install "mcp[cli]"' 를 다시 실행하거나 가상환경이 켜졌는지 확인하세요.`},{title:"평가 기준(Rubric) 정의",lang:"text",code:`# 캡스톤 평가 루브릭 예시 (착수 단계에서 합의)
- 문제정의 명확성   : 사용자/가치/범위가 구체적인가
- 기술 적합성       : RAG/Agent/도구 선택이 문제에 맞는가
- 동작 완성도       : 핵심 시나리오가 끝까지 동작하는가
- 근거/신뢰성       : 출처 표기·환각 통제가 되는가
- 발표/재현성       : 데모가 재현되고 설명이 명확한가`,note:'평가 기준을 착수 시점에 합의하면 구현 방향이 또렷해진다. "무엇이 좋은 결과인가"를 먼저 정의.'},{title:"최소 MCP 서버 — Tool 하나 노출하기",lang:"python",code:`from mcp.server.fastmcp import FastMCP
mcp = FastMCP("weather")

@mcp.tool()
def get_weather(city: str) -> str:
    """도시 이름을 받아 현재 날씨를 돌려준다(에이전트가 호출할 도구)."""
    # 실제로는 외부 API 호출 — 여기선 데모용 고정값
    return f"{city}: 맑음, 26도"

if __name__ == "__main__":
    mcp.run(transport="stdio")   # 표준입출력으로 에이전트와 통신
# MCP Inspector로 이 서버에 붙어 도구가 잘 뜨는지 먼저 점검한다`,note:'MCP는 "도구를 표준 규격으로 노출"하는 프로토콜. @tool 데코레이터로 함수를 등록하면 어떤 에이전트든 그 도구를 호출할 수 있다.'},{title:"통합 아키텍처를 한 장으로 — 경계 정의",lang:"text",code:`# 캡스톤 착수 시 "누가 무엇을 책임지나"를 다이어그램으로 못박는다
[Frontend]  Vue/Next  ──SSE 스트리밍──▶ 사용자 화면
     │ POST /ask
     ▼
[Backend]   FastAPI    ── 오케스트레이션(요청·세션·에러) 담당
     ├──▶ [Agent]     LangGraph  (추론·도구 호출 루프)
     ├──▶ [VectorDB]  pgvector   (문서 검색=RAG)
     └──▶ [MCP Server] 외부 도구 (날씨·검색·사내 API)
# 경계가 흐리면 통합에서 무너진다 — 인터페이스(계약)를 먼저 고정`,note:"캡스톤 실패의 절반은 통합 단계에서 난다. 컴포넌트 경계와 인터페이스를 착수 때 그림으로 합의하면 마지막에 덜 터진다."},{title:"🚀 따라하기 프로젝트 — FastAPI 한 파일에 RAG+Agent+MCP 최소 통합",lang:"python",code:`# STEP 1) 캡스톤의 뼈대 — 한 앱에 RAG·Agent·MCP를 얹는 최소 통합
from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()

# STEP 2) RAG: 문서를 검색한다(지금은 흐름만 보는 더미)
def retrieve(query):
    # 실제로는 임베딩 → 벡터DB 검색. 여기선 개념만 확인
    return ['관련 문서 조각 1', '관련 문서 조각 2']

# STEP 3) MCP 도구: 에이전트가 부를 외부 기능
def mcp_tool_weather(city):
    return city + ': 맑음, 26도'   # 실제로는 MCP 서버를 호출

# STEP 4) Agent: 검색 결과 + 도구를 합쳐 답을 만든다
def agent(query):
    docs = retrieve(query)                       # RAG 검색
    context = ' / '.join(docs)                   # 검색 문맥 합치기
    tool = mcp_tool_weather('서울') if '날씨' in query else ''  # 필요시 도구 호출
    answer = 'Q: ' + query + ' | 근거: ' + context
    return answer + (' | 도구: ' + tool if tool else '')

# STEP 5) 엔드포인트로 노출 → POST /ask 로 물어본다
class Ask(BaseModel):
    query: str

@app.post('/ask')
def ask(req: Ask):
    return {'answer': agent(req.query)}          # RAG+Agent+MCP 통합 응답
# 실행: uvicorn main:app --reload → http://localhost:8000/docs 에서 테스트`,note:'캡스톤 전체 구조를 한 파일로 압축했다. STEP 1→5를 순서대로 실행하면 "질문→검색→도구→응답" 통합 흐름을 눈으로 확인한다. 각 STEP의 더미를 실제 구현(벡터DB·MCP 서버)으로 바꿔 확장하면 완성작이 된다.'}],concepts:[{term:"캡스톤(Capstone)",desc:"그동안 배운 Backend·VectorDB·AI Agent·Frontend를 하나로 모아 완성된 AI 서비스를 만드는 졸업작품 같은 종합 프로젝트다."},{term:"MCP(Model Context Protocol)",desc:"AI 에이전트가 도구·자료·프롬프트를 표준 방식으로 주고받도록 정한 규약으로, 기기마다 다르던 선을 하나로 통일한 USB-C 같은 표준 연결이다."},{term:"MCP Server",desc:"도구(Tool)·자료(Resource)·프롬프트(Prompt)를 담아 에이전트(MCP Client)에게 표준 규격으로 제공하는 서버다."},{term:"Tool · Resource · Prompt",desc:"MCP 서버가 내보내는 3가지다. Tool은 실행 기능, Resource는 읽을 자료, Prompt는 정형화된 지시 템플릿이다."},{term:"MCP Inspector",desc:"MCP 서버가 어떤 Tool·Resource를 제공하는지, 실제로 잘 동작하는지 눈으로 확인·테스트하는 점검 도구다."},{term:"FastAPI",desc:"파이썬으로 빠르게 API 서버를 만드는 웹 프레임워크로, 여기에 RAG·Agent·MCP Client를 통합해 하나의 백엔드로 묶는다."},{term:"Thread(대화 세션)",desc:"한 사용자와 이어지는 대화를 하나로 묶어 맥락을 기억하는 단위로, 세션 ID로 사용자별 대화를 구분한다."}],detail:{topics:[{h:"MCP를 왜 쓰나 — 통합의 뼈대",items:["도구·자료·프롬프트를 표준 규격으로 노출 → 어떤 클라이언트든 동일하게 연결","'USB-C처럼' 한 번 만들면 여러 서비스가 재사용","Backend·VectorDB·Agent·Frontend의 경계를 명확히 분리","팀별로 MCP 서버를 나눠 병렬 개발 가능"]},{h:"MCP 설계: Tool·Resource·Prompt 분리",items:["Tool = 실행 기능(검색·계산·DB 조회 등 부작용 있는 동작)","Resource = 읽기 전용 자료(문서·레코드·설정)","Prompt = 재사용 지시 템플릿(정형화된 요청)","판단 기준: 권한·부작용 있으면 Tool, 단순 조회면 Resource"]},{h:"통합 백엔드(FastAPI) 구성",items:["FastAPI에 RAG 검색 + Agent 실행 + MCP Client 연결","Thread(세션) 관리로 사용자별 대화 분리","/chat 엔드포인트 하나로 요청 받기","MCP Inspector로 서버 점검 후 통합"]}],labs:[{title:"Lab 1. MCP Server 만들고 Inspector로 점검",steps:[`설치: 'pip install "mcp[cli]"' 를 입력한다.`,"server.py 를 만들고 realCode의 MCP Server 예제를 붙여넣는다(@mcp.tool() 로 도구 1개 정의).","'mcp dev server.py' 를 실행하면 MCP Inspector 웹 화면이 열린다.","Inspector에서 Tools 목록에 내 도구가 보이는지 확인하고, 직접 호출해 결과가 나오는지 테스트한다."]},{title:"Lab 2. FastAPI에 MCP Client·RAG 붙이기",steps:["'pip install fastapi uvicorn' 로 설치한다.","main.py 에 realCode의 /chat 엔드포인트를 붙여넣는다(MCP Client로 server.py 도구 목록 로드).","'uvicorn main:app --reload' 를 실행한다.","브라우저에서 'http://localhost:8000/docs' 를 열어 /chat 에 질문을 넣고 응답을 확인한다."]},{title:"Lab 3. Thread(세션) 기억 확인",steps:["main.py의 에이전트에 MemorySaver 체크포인터를 붙인다.","/chat 호출 시 thread_id='alice'로 '내 이름은 앨리스야'를 보낸다.","같은 thread_id='alice'로 '내 이름이 뭐였지?'를 물어 '앨리스'라고 답하는지 확인한다.","thread_id='bob'으로 같은 질문을 던져 이름을 모른다고 답하는지 확인해 세션이 실제로 분리됨을 검증한다."]},{title:"Lab 0. 아키텍처 경계 그리기 워크숍(5교시)",steps:["화이트보드나 종이에 네 박스를 그린다: Frontend · FastAPI(Backend) · VectorDB(RAG) · AI Agent(+MCP 서버).","박스 사이에 화살표를 그리고 '무엇이 오가는지'를 적는다(예: Frontend→FastAPI = 질문 텍스트+thread_id, Agent→MCP = 도구 호출, RAG→Agent = 검색된 근거 조각).","각 박스에 담당 팀원 이름을 적어 병렬 개발이 가능하도록 소유권을 나눈다.","박스 사이 '계약'을 한 줄씩 정한다(예: /chat 은 {question, thread_id}를 받아 {answer}를 돌려준다). 이 계약만 지키면 안쪽 구현은 각자 자유롭게 진행한다.","그림을 사진으로 찍어 팀 README.md 에 붙인다 — 이후 3일간 이 그림이 기준선이 된다."]},{title:"Lab 4. 통합 스모크 테스트 체크리스트로 Day1 마감(8교시)",steps:["server.py(MCP)와 main.py(FastAPI)를 각각 실행해 둘 다 에러 없이 뜨는지 확인한다.",`curl -X POST http://localhost:8000/chat -H 'Content-Type: application/json' -d '{"question":"우리 문서에서 환불 규정 알려줘","thread_id":"smoke"}' 로 200 응답과 answer 필드가 오는지 본다.`,"로그에서 실제로 MCP 도구(search_docs 등)가 호출됐는지 확인한다 — 도구를 안 거치고 모델이 지어냈다면 통합이 덜 된 것이다.","같은 thread_id='smoke'로 후속 질문을 던져 앞 대화 맥락이 이어지는지 확인한다.","일부러 빈 question이나 이상한 값을 보내 서버가 500으로 죽지 않고 방어하는지 본다(안 되면 오늘 표시만 해 두고 Day3에서 보강).","5개 항목의 통과/실패를 표로 남겨 팀 채널에 공유한다. 실패한 경계가 내일 아침 첫 수정 대상이다."]}],homework:["우리 서비스에 필요한 기능을 Tool·Resource·Prompt로 분류한 표를 만들어 README.md 에 올리기.","MCP Server에 도구 2개를 정의하고 MCP Inspector로 동작을 확인한 화면을 캡처해 제출하기."]},theory:{theory:[{h:"MCP는 '도구 연결의 표준(USB-C)'이다",body:`MCP(Model Context Protocol)가 없던 시절에는, 에이전트마다 도구를 붙이는 방식이 제각각이었습니다.
A 서비스의 검색 도구를 B 서비스에 옮기려면 매번 새로 짜야 했죠.
MCP는 '도구·자료·프롬프트를 이런 규격으로 내보내라'고 표준을 정해, 어떤 에이전트(클라이언트)든 똑같은 방식으로 연결하게 만듭니다.
마치 노트북·모니터·충전기가 저마다 다른 단자를 쓰다가 USB-C 하나로 통일된 것과 같다.

캡스톤에서 우리는 우리 서비스의 기능을 MCP 서버로 감싸, 여러 곳에서 재사용 가능한 표준 부품으로 만든다.`},{h:"Tool·Resource·Prompt를 나누는 이유",body:`MCP 서버는 세 종류를 내보냅니다.
Tool은 '실행'이다 — 검색·계산·DB 저장처럼 무언가를 바꾸거나 바깥을 건드리는 동작.
Resource는 '읽기 전용 자료'다 — 문서·설정·레코드처럼 그냥 가져다 보는 것.
Prompt는 '재사용 지시 템플릿'이다 — 자주 쓰는 요청을 정형화해 둔 것.
둘을 가르는 기준은 간단하다: 부작용(쓰기·과금·외부 호출)이 있으면 Tool, 단순 조회면 Resource.

이렇게 나눠두면 권한 관리가 쉽고(위험한 건 Tool만 통제), 모델이 무엇을 해도 되는지 명확해진다.`},{h:"통합 아키텍처 — 하나의 백엔드로 묶기",body:`우리 캡스톤은 네 조각으로 나뉜다: Backend(FastAPI) · VectorDB(RAG 지식) · AI Agent(판단) · Frontend(화면).
FastAPI가 허브가 되어 RAG 검색 결과와 MCP 서버의 도구를 에이전트에게 전달하고, 에이전트의 답을 프론트로 돌려준다.
여기에 Thread(대화 세션) 개념을 더해, 사용자마다 대화 맥락을 따로 기억하게 한다.

코드를 짜기 전 이 네 박스와 화살표를 그려두면, 팀원이 각자 다른 박스를 맡아 병렬로 개발할 수 있다.`},{h:"1교시 OT — 3일 동안 우리가 실제로 만들 것",body:`이 캡스톤의 목표는 딱 한 줄입니다: 그동안 따로따로 배운 조각을 '하나로 작동하는 AI 서비스'로 합친다.
조각은 넷입니다 — Backend(FastAPI), VectorDB(RAG 지식), AI Agent(판단·도구 사용, MCP로 연결), Frontend(사용자 화면).
지금까지는 이 넷을 각각 연습했지만, 실제 서비스는 이들이 한 요청 안에서 매끄럽게 이어져야 합니다.

3일 로드맵을 먼저 그려 둡시다. Day1은 '뼈대 조립' — MCP로 도구를 표준화하고, FastAPI 한 곳에 RAG·Agent·MCP를 통합해 /chat 이 도는 최소 서비스를 만든다. Day2는 '체감 품질' — 답을 스트리밍으로 흘려 사용자가 기다림을 덜 느끼게 하고, 관측(Observability)으로 내부를 들여다본다. Day3은 '운영 견고함' — 실패·비용·확장을 다루고, 라우팅·검증·동적계획으로 에이전트를 키운 뒤 팀별로 발표한다.

오늘 팀이 가장 먼저 할 일은 두 가지입니다. (1) 우리 서비스가 무슨 문제를 푸는지 한 문장으로 정한다. (2) 네 조각을 팀원에게 나눠 병렬로 개발할 수 있게 담당을 정한다. 코드는 그다음입니다. 이 그림이 서면 각자 다른 박스를 맡아도 마지막에 하나로 붙습니다.`},{h:"7교시 Thread — 사용자마다 대화를 '따로' 기억시키기",body:`챗봇을 여러 사람이 동시에 쓰는데 대화 기록을 한 통에 담으면, 앨리스의 질문에 밥의 맥락이 섞여 엉뚱한 답이 나옵니다.
Thread(대화 세션)는 '한 사람과 이어지는 대화'를 하나로 묶는 단위입니다. 각 대화방에 번호(thread_id)를 붙여, 같은 번호면 이전 맥락을 이어가고 다른 번호면 처음부터 시작하게 만듭니다.

구현의 핵심은 '체크포인터(checkpointer)'입니다. LangGraph의 create_react_agent에 checkpointer를 붙이면, 매 호출마다 thread_id별로 대화 상태를 저장·복원해 줍니다. 우리가 직접 대화 목록을 들고 다니며 이어붙일 필요가 없습니다.

지금은 서버 메모리에 저장하는 MemorySaver로 개념을 익히지만, 이건 서버를 재시작하면 대화가 사라지고 서버가 여러 대면 방이 흩어집니다. 그래서 Day3에서 이 저장소를 Redis·DB로 바꿔 'Stateless 구조'로 만듭니다. 오늘은 thread_id 하나로 대화가 분리·기억된다는 것만 눈으로 확인하면 됩니다 — 같은 방에서 이름을 알려 준 뒤 다시 물으면 기억하고, 다른 방에서는 모릅니다.`},{h:"8교시 스모크 테스트 — '연기가 나는지'부터 확인한다",body:`스모크 테스트(smoke test)는 전자제품에 처음 전원을 넣고 '연기가 나지 않는지' 보는 데서 온 말입니다. 자잘한 기능을 따지기 전에, 전체가 최소한 켜지고 한 바퀴 도는지부터 확인하는 것입니다.
오늘 Day1의 마지막은 네 조각(Frontend→FastAPI→RAG·MCP도구→Agent→응답)이 '한 번의 요청으로 끝까지 흐르는지'를 통합 점검하는 자리입니다. 개별로는 됐어도, 붙이면 대개 경계에서 깨집니다 — 환경변수 누락, 포트 충돌, MCP 서버 미기동, 응답 형식 불일치.

점검은 체크리스트로 합니다. ① 서버가 에러 없이 뜨는가 ② /docs 나 curl 로 /chat 이 200으로 답하는가 ③ 질문이 실제 RAG/MCP 도구를 거쳐 답이 나오는가(도구 호출 로그 확인) ④ 같은 thread_id로 두 번 물었을 때 맥락이 이어지는가 ⑤ 잘못된 입력에도 서버가 죽지 않는가.

하나라도 걸리면 그 경계가 오늘 고칠 지점입니다. 여기서 통과한 '작동하는 최소 서비스'가 Day2·Day3에서 살을 붙일 토대가 됩니다. '완벽한 기능'보다 '끝까지 도는 골격'을 먼저 확보하는 것이 통합 프로젝트의 철칙입니다.`}]},realCodes:[{title:"server.py — MCP Server(도구·자료 노출) with MCP Inspector",lang:"python",code:`from mcp.server.fastmcp import FastMCP  # MCP 서버를 쉽게 만드는 헬퍼

mcp = FastMCP('skala-tools')  # 'skala-tools' 라는 이름의 MCP 서버 생성

@mcp.tool()  # 이 함수를 MCP '도구(Tool)'로 노출 — 부작용 있는 실행 기능
def search_docs(query: str) -> str:
    """사내 문서에서 query와 관련된 내용을 찾아 돌려준다."""  # 모델이 언제 쓸지 판단하는 설명
    # 실제로는 Vector DB 검색으로 교체한다
    return f"'{query}' 관련 문서 3건을 찾았습니다."

@mcp.resource('config://team')  # 이건 '자료(Resource)' — 읽기 전용
def team_config() -> str:
    """팀 설정 정보(읽기 전용)."""
    return '팀=skala4, 기본모델=claude-opus-4-8'

if __name__ == '__main__':
    mcp.run()  # 서버 실행. 점검은 터미널에서 'mcp dev server.py' → Inspector 웹이 열림
`,note:`'mcp dev server.py' 를 실행하면 MCP Inspector가 브라우저에 뜹니다.
Tools 탭에 search_docs 가 보이고, 값을 넣어 직접 호출해볼 수 있다.`},{title:"main.py — FastAPI에 MCP 도구 + 에이전트 통합(/chat)",lang:"python",code:`from fastapi import FastAPI  # API 서버 프레임워크
from pydantic import BaseModel  # 요청 본문의 모양을 정의
from langchain_mcp_adapters.client import MultiServerMCPClient  # MCP 서버의 도구를 불러오는 어댑터
from langgraph.prebuilt import create_react_agent  # 도구를 쓰는 ReAct 에이전트를 한 줄로 생성
from langchain_anthropic import ChatAnthropic

app = FastAPI()

class Ask(BaseModel):  # /chat 이 받을 입력: 질문 + 세션 구분용 thread_id
    question: str
    thread_id: str = 'default'

# server.py(MCP 서버)를 자식 프로세스로 띄워 그 도구들을 가져온다
client = MultiServerMCPClient({
    'tools': {'command': 'python', 'args': ['server.py'], 'transport': 'stdio'},
})

@app.post('/chat')  # POST /chat 으로 질문을 받는 엔드포인트
async def chat(req: Ask):
    tools = await client.get_tools()  # MCP 서버가 노출한 도구 목록(search_docs 등)
    agent = create_react_agent(ChatAnthropic(model='claude-opus-4-8'), tools)  # 에이전트 조립
    result = await agent.ainvoke({'messages': [('user', req.question)]})  # 실행
    return {'answer': result['messages'][-1].content}  # 최종 답만 돌려줌
`,note:`'uvicorn main:app --reload' 로 띄운 뒤 http://localhost:8000/docs 에서 /chat 을 테스트합니다.
MCP 서버 하나만 바꿔 끼우면 도구 세트가 통째로 교체되는 게 MCP의 힘이다.`},{title:"chat.py — MemorySaver로 thread_id별 대화 이어가기",lang:"python",code:`# thread_id로 사용자별 대화를 분리·기억하는 최소 예제
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver  # 대화 상태를 저장하는 체크포인터
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model='claude-opus-4-8')
tools = []  # 실제로는 search_docs 등 MCP 도구를 넣는다

# checkpointer를 붙이면 thread_id마다 대화가 따로 저장·복원된다
agent = create_react_agent(llm, tools, checkpointer=MemorySaver())

def ask(question, thread_id):  # thread_id가 '대화 방 번호' 역할
    # 같은 thread_id면 이전 대화가 이어지고, 새 값이면 처음부터 시작한다
    config = {'configurable': {'thread_id': thread_id}}
    result = agent.invoke({'messages': [('user', question)]}, config)
    return result['messages'][-1].content

# 같은 방(user-1)에서 이름을 알려 준 뒤 다시 물으면 기억한다
print(ask('내 이름은 길동이야', 'user-1'))   # 인사
print(ask('내 이름이 뭐였지?', 'user-1'))     # 결과: '길동'이라고 답함(대화 기억)
# 다른 방(user-2)은 앞의 대화를 모른다
print(ask('내 이름이 뭐였지?', 'user-2'))     # 결과: 모른다고 답함(방이 다름)`,note:`같은 thread_id면 이름을 기억하고, 새 thread_id면 처음부터 시작한다 — 이것이 사용자별 대화 분리의 핵심이다.
실무에선 MemorySaver 대신 Redis·DB 체크포인터로 바꾸면 서버를 재시작해도 대화가 유지된다(Day3의 Stateless Session과 연결).`}],periods:["1교시 OT: 캡스톤 목표와 Backend·VectorDB·Agent(MCP)·Frontend 전체 그림","2교시 MCP(Model Context Protocol) 개요와 MCP Server 구성요소","3교시 MCP 설계: Tool·Resource·Prompt 분리 의사결정","4교시 [실습] MCP Server 구현하고 MCP Inspector로 점검","5교시 통합 아키텍처: 시스템 경계(Backend·VectorDB·Agent·Frontend) 설계","6교시 [실습] FastAPI에 RAG + Agent + MCP Client 통합","7교시 [실습] Thread(대화 세션) 관리 붙이기","8교시 통합 스모크 테스트와 중간 점검"]},"capstone-2":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 스트리밍의 3가지 차원(모델·서버·클라이언트) 이해"},{time:"10:00–10:50",topic:"2교시 Backend: SSE(Server-Sent Events) 스트리밍 엔드포인트 설계"},{time:"11:00–11:50",topic:"3교시 [실습] FastAPI SSE 엔드포인트 구현"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 Frontend: Vue.js/Next.js + Vercel AI SDK 연동"},{time:"14:00–14:50",topic:"5교시 [실습] 프론트에서 토큰 스트리밍 렌더링"},{time:"15:00–15:50",topic:"6교시 [실습] Multi-Agent Streaming(에이전트별 진행 스트림)"},{time:"16:00–16:50",topic:"7교시 Observability & Eval: 추적·로그·응답 품질 평가"},{time:"17:00–17:50",topic:"8교시 [실습] LangSmith/로깅으로 실행 추적 붙이기"}],practice:{title:"응답을 SSE 스트리밍으로 바꾸고 LangSmith로 실행을 추적하기",steps:["어제 만든 main.py 에 아래 realCode의 SSE 스트리밍 엔드포인트(/stream)를 추가한다.","LLM 호출을 'llm.astream(...)' 으로 바꾸고, 토큰을 'data: ...\\n\\n' 형식으로 yield 한다.",`'uvicorn main:app --reload' 실행 후 터미널에서 'curl -N "http://localhost:8000/stream?q=안녕"' 을 입력한다.`,"(기대 결과) 답이 한꺼번에가 아니라 글자 단위로 조금씩 흘러나오면 스트리밍 성공.","프론트(Vue/Next)에서 Vercel AI SDK의 useChat 로 /stream 을 연결해 화면에 타이핑되듯 렌더한다(간단히는 EventSource 로도 가능).","여러 에이전트를 쓰면 각 에이전트의 진행 상황에 태그를 붙여 따로 표시(Multi-Agent Streaming)한다.","'.env' 에 'LANGCHAIN_TRACING_V2=true' 와 'LANGCHAIN_API_KEY' 를 추가해 LangSmith 추적을 켠다.","서비스를 한 번 실행한 뒤 smith.langchain.com 에서 trace(단계별 흐름)를 연다.","가장 오래 걸린 단계(Latency)와 토큰을 많이 쓴 단계(Cost)를 찾아 캡처한다.","코드를 깃에 커밋·푸시한다('feat: SSE 스트리밍 + LangSmith 추적')."],deliverable:"스트리밍 응답(/stream, curl 확인) + 프론트 실시간 렌더 화면 + LangSmith trace 캡처(느린/비싼 단계 표시)"}},examples:[{title:"토큰이 하나씩 흘러나오는 걸 눈으로 보기",lang:"python",code:`from langchain_anthropic import ChatAnthropic  # Claude 연결

llm = ChatAnthropic(model='claude-opus-4-8')

# stream 은 답을 한꺼번에가 아니라 조각(청크)으로 나눠 준다
for chunk in llm.stream('가을에 대한 짧은 시를 써줘'):  # 조각을 하나씩 꺼내
    print(chunk.content, end='', flush=True)  # end='' 로 줄바꿈 없이 이어붙여 출력
# 결과: 글자가 타이핑되듯 조금씩 화면에 나타남
`,note:"이 '조각을 흘려보내는' 동작이 스트리밍의 핵심이며, 서버는 이 조각을 SSE로 클라이언트에 전달합니다."},{title:"SSE 전송 형식 만들어 보기",lang:"python",code:`# SSE는 각 조각을 'data: 내용' 뒤에 빈 줄을 붙여 보낸다
def to_sse(text):  # 한 조각을 SSE 한 덩어리로 감싸는 함수
    return f'data: {text}\\n\\n'  # 끝의 빈 줄(\\n\\n)이 '한 이벤트 끝' 표시

for piece in ['안', '녕', '하세요']:  # 조각들을 하나씩
    print(repr(to_sse(piece)))  # 결과: "data: 안\\n\\n" 처럼 SSE 형식 확인
`,note:"FastAPI StreamingResponse가 이 형식을 그대로 흘려보내면 브라우저·클라이언트가 SSE로 받아들입니다."},{title:"여러 에이전트의 진행을 한 스트림에서 event 태그로 구분하기",lang:"python",code:`from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()
# agents: {'검색요원': 체인, '작성요원': 체인} 형태로 미리 준비돼 있다고 가정

async def multi_stream(question):
    for agent_name in ['검색요원', '작성요원']:          # 에이전트를 차례로 실행
        yield f'event: {agent_name}\\ndata: 시작\\n\\n'      # 이 에이전트가 시작했음을 알림
        async for chunk in agents[agent_name].astream(question):  # 조각을 흘려받아
            yield f'event: {agent_name}\\ndata: {chunk.content}\\n\\n'  # event 로 발신자 태깅

@app.get('/multi')
async def multi(question: str):
    # 여러 에이전트의 조각을 한 SSE 스트림에 섞어 보낸다
    return StreamingResponse(multi_stream(question), media_type='text/event-stream')
`,note:"SSE의 event: 라인으로 발신자를 태깅하면 프론트에서 에이전트별 말풍선으로 나눠 렌더할 수 있다."},{title:"route.ts — Next.js 라우트에서 FastAPI SSE를 프론트로 흘려보내기",lang:"typescript",code:`// app/api/chat/route.ts — 프론트와 우리 FastAPI(/stream) 사이의 다리
export const runtime = 'edge'; // 스트리밍에 적합한 가벼운 런타임

export async function POST(req: Request) {
  const { question } = await req.json(); // 화면에서 보낸 질문

  // 우리 파이썬 백엔드의 SSE 엔드포인트를 그대로 호출한다
  const upstream = await fetch(
    \`http://localhost:8000/stream?q=\${encodeURIComponent(question)}\`
  );

  // upstream.body(읽는 스트림)를 그대로 브라우저로 흘려보낸다
  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream', // 브라우저가 SSE로 인식
      'Cache-Control': 'no-cache',          // 조각을 캐시하지 않고 즉시 전달
    },
  });
}
`,note:`프론트는 이 /api/chat 만 바라보고, 실제 LLM·RAG는 FastAPI가 담당합니다.
이렇게 프록시로 한 겹 두면 프론트 코드를 바꾸지 않고 백엔드 주소·인증을 바꿀 수 있습니다.`},{title:"Chat.tsx — useChat 훅으로 토큰이 흐르는 화면 만들기",lang:"tsx",code:`'use client';
import { useChat } from 'ai/react'; // Vercel AI SDK의 채팅 훅

export default function Chat() {
  // api: 위에서 만든 라우트. messages·input·전송 함수를 한 번에 내려준다
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({ api: '/api/chat' });

  return (
    <div>
      {/* 도착한 조각이 messages에 자동 반영 → 글자가 흘러나온다 */}
      {messages.map((m) => (
        <p key={m.id}>
          <b>{m.role === 'user' ? '나' : 'AI'}:</b> {m.content}
        </p>
      ))}

      {/* 아직 토큰이 오는 중이면 표시 */}
      {isLoading && <span>…입력 중</span>}

      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} placeholder='질문을 입력' />
        <button type='submit'>보내기</button>
      </form>
    </div>
  );
}
`,note:`SSE 파싱·이어붙이기를 우리가 짜지 않아도 useChat이 messages를 실시간 갱신합니다.
로딩 스피너 대신 '지금까지 도착한 글자'를 그대로 보여 주는 것이 스트리밍 UI의 핵심 감각입니다.`},{title:"관측·로깅 심기",lang:"python",code:`import logging, time
log = logging.getLogger("agent")

def traced(fn):
    # 각 단계의 입력/소요시간/에러를 남겨 디버깅을 쉽게
    def wrap(*a, **k):
        t0 = time.perf_counter()
        try:
            r = fn(*a, **k)
            log.info(f"{fn.__name__} ok {time.perf_counter()-t0:.2f}s")
            return r
        except Exception as e:
            log.exception(f"{fn.__name__} FAIL: {e}")
            raise
    return wrap`,note:"데코레이터로 각 노드/도구를 감싸 추적한다. 멀티스텝 에이전트는 로깅이 없으면 디버깅이 매우 어렵다."}],concepts:[{term:"스트리밍(Streaming)",desc:"답을 다 만든 뒤 한꺼번에 주지 않고, 글자가 만들어지는 대로 조금씩 흘려보내 사용자가 기다림을 덜 느끼게 하는 방식이다."},{term:"SSE(Server-Sent Events)",desc:"서버가 클라이언트로 데이터를 계속 밀어 보내는 단방향 실시간 전송 기술로, 스트리밍 응답에 가장 많이 쓰인다."},{term:"스트리밍의 3가지 차원",desc:"모델이 토큰을 흘리고(모델) → 서버가 그걸 SSE로 내보내고(서버) → 프론트가 화면에 이어붙이는(클라이언트) 3단 흐름이다."},{term:"Vercel AI SDK",desc:"프론트엔드(Vue·Next.js)에서 스트리밍 응답을 쉽게 받아 화면에 실시간으로 표시해 주는 라이브러리다."},{term:"Multi-Agent Streaming",desc:"여러 에이전트가 동시에 일할 때 각 에이전트의 진행 상황을 따로따로 실시간으로 흘려 보여 주는 것이다."},{term:"Observability(관측 가능성)",desc:"시스템 안에서 무슨 일이 일어나는지 로그·추적으로 들여다볼 수 있는 성질로, 문제가 생겼을 때 원인을 빠르게 찾게 해준다."},{term:"LangSmith · Eval",desc:"LangSmith는 LLM 실행 과정을 단계별로 추적·기록하는 도구, Eval은 응답의 정확도·근거를 정량 지표로 채점하는 평가다."}],detail:{topics:[{h:"스트리밍의 3가지 차원",items:["모델: LLM이 토큰을 하나씩 생성하며 흘려보냄(stream=True)","서버: FastAPI가 그 토큰을 SSE로 클라이언트에 전달","클라이언트: 프론트가 받은 조각을 화면에 이어붙임","효과: 첫 글자까지의 체감 대기(TTFT) 감소 → 이탈 줄어듦"]},{h:"Backend SSE 엔드포인트",items:["FastAPI StreamingResponse로 media_type='text/event-stream' 반환","LLM 스트림을 'async for' 로 받아 청크마다 yield","각 청크를 'data: {...}\\n\\n' 형식으로 전송","연결 종료·중간 에러 처리(끊김 감지)"]},{h:"Frontend·Multi-Agent·Observability",items:["Vercel AI SDK useChat 로 스트리밍 수신·렌더","Multi-Agent면 에이전트별 이벤트 태그로 구분해 표시","LangSmith로 각 단계(검색·생성·도구) 추적","Eval로 응답의 정확도·근거 품질 점검"]}],labs:[{title:"Lab 1. FastAPI SSE 스트리밍 엔드포인트",steps:["realCode의 SSE 스트리밍 예제를 main.py 에 붙여넣는다(StreamingResponse 사용).","LLM 호출을 stream=True 로 바꾸고, 제너레이터로 청크를 yield 한다.","'uvicorn main:app --reload' 실행 후 터미널에서 'curl -N http://localhost:8000/stream?q=안녕' 을 입력한다.","-N 옵션 덕분에 답이 한꺼번에가 아니라 조금씩 흘러나오는지 확인한다."]},{title:"Lab 2. LangSmith로 실행 추적 붙이기",steps:[".env 에 'LANGCHAIN_TRACING_V2=true' 와 'LANGCHAIN_API_KEY=...' 를 추가한다.","기존 체인/에이전트를 그대로 한 번 실행한다.","smith.langchain.com 대시보드에서 방금 실행의 trace(단계별 흐름)를 연다.","가장 오래 걸린 단계와 토큰을 가장 많이 쓴 단계를 찾아 메모한다."]},{title:"Lab 3. 프론트에서 토큰이 흐르게 렌더링하기(5교시)",steps:["Next.js 앱을 준비하고 'npm install ai' 로 Vercel AI SDK를 설치한다.","app/api/chat/route.ts 에 realCode의 프록시 라우트를 붙여넣어 FastAPI의 /stream 을 연결한다.","Chat.tsx 컴포넌트에 useChat 예제를 붙여 messages를 화면에 렌더한다.","'npm run dev' 후 질문을 보내, 답이 한꺼번에 뜨지 않고 글자가 타이핑되듯 흘러나오는지 확인한다.","네트워크 탭에서 응답 Content-Type이 text/event-stream 이고 조각이 나눠 도착하는지 확인한다. 한꺼번에 오면 어딘가에서 버퍼링되는 것이니 no-cache·프록시 설정을 점검한다."]},{title:"Lab 4. Multi-Agent 진행을 에이전트별로 나눠 스트리밍(6교시)",steps:["realCode의 multi_stream 예제를 참고해 '검색요원→작성요원' 두 단계를 event 태그로 구분해 흘려보내는 /multi 엔드포인트를 만든다.","각 조각을 'event: {에이전트이름}\\ndata: {내용}\\n\\n' 형식으로 보내 발신자를 태깅한다.","프론트에서는 브라우저 EventSource로 /multi 를 구독하고, event 이름별로 다른 말풍선(다른 색·다른 열)에 조각을 이어붙인다.","질문을 던져 '검색요원'의 진행과 '작성요원'의 진행이 각각 별도 영역에서 동시에 흐르는지 확인한다.","작성요원이 검색요원의 결과를 기다려야 한다면, 검색요원 스트림이 끝나는 신호(예: event: 검색요원 data: [DONE])를 프론트가 받고 작성요원 영역을 활성화하도록 순서를 표시한다."]}],homework:["우리 서비스의 응답을 스트리밍으로 바꾸고, 프론트에서 실시간으로 표시되는 화면을 영상으로 캡처해 제출하기.","LangSmith trace에서 가장 느린 단계·토큰이 많은 단계를 찾아 개선 아이디어 2가지를 적어 제출하기."]},theory:{theory:[{h:"스트리밍은 '다 만들고 주기'가 아니라 '만들며 흘리기'다",body:`LLM은 답을 한 번에 완성하지 않고 토큰을 하나씩 이어 만듭니다.
기본 방식은 그 토큰이 다 모일 때까지 기다렸다 한꺼번에 보여주는 것인데, 답이 길면 사용자는 몇 초씩 빈 화면을 봐야 한다.
스트리밍은 토큰이 생기는 대로 즉시 흘려보내, ChatGPT처럼 글자가 타이핑되듯 나오게 한다.
체감 대기 시간(첫 글자까지, TTFT)이 확 줄어 이탈이 감소한다.

이 흐름은 세 차원으로 나뉜다: 모델이 흘리고 → 서버가 전달하고 → 프론트가 이어붙인다.`},{h:"SSE — 서버가 클라이언트로 계속 밀어 보내기",body:`보통의 HTTP는 '요청 한 번 → 응답 한 번'으로 끝납니다.
하지만 스트리밍은 서버가 답 조각을 여러 번 나눠 보내야 하므로, 연결을 열어둔 채 계속 밀어 보내는 방식이 필요하다.
그게 SSE(Server-Sent Events)로, 서버→클라이언트 단방향으로 'data: 조각' 을 반복해 전송한다.
FastAPI에서는 StreamingResponse에 제너레이터를 물려 media_type을 'text/event-stream'으로 주면 된다.

프론트는 Vercel AI SDK의 useChat 같은 도구로 이 조각들을 받아 화면에 이어 붙이기만 하면 된다.`},{h:"Observability — 보이지 않으면 고칠 수 없다",body:`에이전트는 검색·판단·도구 호출 여러 단계를 거치므로, 문제가 나도 '어디서' 났는지 알기 어렵습니다.
Observability(관측 가능성)는 각 단계의 입력·출력·시간·토큰을 기록해 안을 들여다보게 하는 것이다.
LangSmith를 붙이면 한 번의 실행이 어떤 단계를 거쳤는지 나무처럼 펼쳐 보여, 느린 단계와 비싼 단계를 바로 찾는다.
여기에 Eval(평가)을 더하면 '답이 정확한가·근거가 있는가'를 정량 점수로 채점할 수 있다.

관측과 평가가 있어야 '느낌'이 아니라 '숫자'로 서비스를 개선할 수 있다.`},{h:"4교시 Frontend — Vercel AI SDK가 스트리밍의 번거로움을 대신한다",body:`서버가 SSE로 토큰 조각을 흘려보내도, 프론트에서 그걸 직접 받으려면 일이 많습니다. 연결을 열고, data: 줄을 잘라 파싱하고, [DONE] 신호를 처리하고, 화면 상태에 이어붙이고, 중간에 끊기면 정리해야 합니다.
Vercel AI SDK는 이 반복 작업을 한 훅(useChat) 뒤로 숨겨 줍니다. 프론트 개발자는 messages 배열을 화면에 그리고, 입력창을 handleSubmit 에 연결하기만 하면 됩니다. 토큰이 도착하는 대로 messages 가 자동으로 갱신되어 ChatGPT처럼 글자가 흘러나옵니다.

연결 구조는 이렇습니다: Next.js면 app/api/chat/route.ts 같은 라우트 핸들러가 우리 FastAPI의 SSE를 프록시하거나 직접 스트림을 반환하고, 화면 컴포넌트는 useChat({ api: '/api/chat' }) 로 그 스트림을 구독합니다. Vue라면 SDK의 Vue용 유틸이나 EventSource로 같은 패턴을 씁니다.

중요한 감각 하나: 프론트는 '완성된 답'을 기다리지 않고 '조각의 연속'을 받는다는 사고 전환입니다. 그래서 로딩 스피너 대신 '지금까지 도착한 글자'를 그대로 보여 주며, isLoading 으로 아직 오는 중인지만 표시합니다. 6교시의 Multi-Agent에서는 여기에 event 태그로 발신 에이전트를 구분해, 에이전트별 말풍선으로 나눠 그립니다.`},{h:"토큰과 비용을 관측한다 — 무엇이 얼마를 썼나",body:`관측(Observability)에서 속도만큼 중요한 게 '돈'입니다. LLM은 호출할 때마다 토큰 수만큼 요금이 나가는데, 우리 눈엔 보이지 않아서 방심하면 청구서가 무서워집니다.
먼저 토큰이 두 종류라는 걸 알아야 합니다. 입력 토큰(input)은 우리가 보낸 프롬프트의 길이고, 출력 토큰(output)은 모델이 만든 답의 길이입니다. 보통 출력 토큰이 입력보다 단가가 몇 배 비쌉니다. 그래서 RAG처럼 문서를 잔뜩 프롬프트에 욱여넣는 에이전트는 입력 토큰이, 긴 답을 뽑는 서비스는 출력 토큰이 비용을 좌우합니다.
에이전트는 특히 위험합니다. 한 번의 사용자 질문에도 내부적으로 '생각→검색→도구 호출→다시 판단'을 여러 번 돌기 때문에, 눈에 보이는 답 하나 뒤에 LLM 호출이 대여섯 번 숨어 있곤 합니다. 그래서 '요청 1건당 총 토큰·총 비용'을 단계별로 쪼개서 봐야 어디가 돈 먹는 하마인지 잡힙니다.
LangSmith 같은 관측 도구는 이걸 자동으로 계산해 줍니다. trace를 열면 각 단계 옆에 '이 단계가 쓴 토큰과 비용'이 붙어 나오고, 실행 전체의 합계도 보여 줍니다. 여기서 '검색 결과를 통째로 프롬프트에 넣었더니 입력 토큰이 폭발했네' 같은 걸 발견하면, 문서를 더 잘게 자르거나 상위 몇 개만 넣어 비용을 줄입니다.
오늘 기억할 것: 비용은 '느낌'이 아니라 '토큰 숫자'로 관리한다. 관측이 없으면 어디를 아껴야 할지조차 모른 채 돈만 샙니다. 이 감각이 Day3의 Cost & Latency 최적화로 이어집니다.`},{h:"구조화 로깅과 상관관계 ID — 로그·트레이스를 하나로 꿰기",body:`trace(트레이스)가 '한 요청이 거친 단계들의 나무 그림'이라면, 로그(log)는 '그때그때 벌어진 사건의 문장 기록'입니다. 이 둘을 따로 두면 장애가 났을 때 서로 연결이 안 돼 헤맵니다. 그래서 실서비스는 둘을 한 실로 꿰는 두 가지 습관을 들입니다.
첫째, 구조화 로깅입니다. print로 '에러 남!' 하고 사람 문장을 남기면 나중에 기계가 모아 분석하기 어렵습니다. 대신 JSON 한 줄로 {"level":"error", "step":"retrieve", "latency_ms":820, "tokens":1450} 처럼 필드를 갖춰 남깁니다. 이러면 '지연 500ms 넘는 검색 단계만 모아 봐' 같은 질의를 기계가 바로 처리합니다. 앞 과목(모델 서빙)에서 배운 '사람이 읽는 문장보다 기계가 집계하기 좋은 형태로'가 여기서도 그대로 통합니다.
둘째, 상관관계 ID(correlation id, 또는 trace id)입니다. 요청이 들어오는 입구에서 고유 번호를 하나 발급해, 그 요청이 거치는 모든 단계의 로그와 트레이스에 같은 번호를 찍습니다. 그러면 사용자가 '아까 그 답이 이상했어요'라고 신고했을 때, 그 요청의 ID 하나로 검색·모델호출·도구실행 로그를 전부 한 줄에 꿰어 되짚을 수 있습니다. 마치 택배 송장 번호 하나로 물건이 거친 모든 지점을 추적하는 것과 같습니다.
왜 중요한가: 에이전트는 여러 단계·여러 도구·여러 LLM 호출이 얽혀 있어서, 문제가 '어느 요청의 어느 단계'에서 났는지 특정하지 못하면 고칠 수가 없습니다. 구조화 로그(무슨 일이)와 trace(어떤 순서로)를 상관관계 ID(누구의 요청인지)로 묶어 두면, 관측이 비로소 '디버깅에 실제로 쓸 수 있는' 도구가 됩니다.`}]},realCodes:[{title:"main.py — FastAPI SSE 토큰 스트리밍 엔드포인트",lang:"python",code:`from fastapi import FastAPI  # API 서버
from fastapi.responses import StreamingResponse  # 조각을 이어 보내는 응답 타입
from langchain_anthropic import ChatAnthropic

app = FastAPI()
llm = ChatAnthropic(model='claude-opus-4-8')  # 모델 준비

async def token_stream(question: str):  # 토큰을 하나씩 흘려보내는 제너레이터
    async for chunk in llm.astream(question):  # astream: 모델이 만드는 대로 조각을 받음
        if chunk.content:  # 빈 조각은 건너뜀
            yield f'data: {chunk.content}\\n\\n'  # SSE 형식으로 한 조각 전송
    yield 'data: [DONE]\\n\\n'  # 끝났음을 알리는 신호

@app.get('/stream')  # GET /stream?q=... 로 질문을 받음
async def stream(q: str):
    # media_type 을 event-stream 으로 주면 브라우저·클라이언트가 SSE로 인식
    return StreamingResponse(token_stream(q), media_type='text/event-stream')
`,note:`'uvicorn main:app --reload' 실행 후 'curl -N "http://localhost:8000/stream?q=안녕"' 로 확인합니다.
-N(버퍼 끔) 덕분에 답이 한꺼번에가 아니라 조금씩 흘러나오는 걸 눈으로 볼 수 있다.`},{title:".env / 실행 — LangSmith로 실행 추적(Observability) 켜기",lang:"bash",code:`# .env 파일에 아래 3줄을 추가하면, 코드를 바꾸지 않아도 모든 실행이 자동 추적된다
LANGCHAIN_TRACING_V2=true          # 추적 기능 켜기
LANGCHAIN_API_KEY=lsv2_여기에_키    # smith.langchain.com 에서 발급
LANGCHAIN_PROJECT=skala-capstone   # 대시보드에서 묶어 볼 프로젝트 이름

# 그런 다음 평소처럼 실행하면 됨
# python main.py   또는   uvicorn main:app --reload
# → smith.langchain.com 대시보드에서 방금 실행의 단계별 trace를 확인
`,note:`trace를 열면 검색·모델호출·도구실행이 나무처럼 펼쳐집니다.
가장 오래 걸린 단계(Latency)와 토큰을 많이 쓴 단계(Cost)를 바로 찾아 개선점을 잡을 수 있다.`}],periods:["1교시 스트리밍의 3가지 차원(모델·서버·클라이언트) 이해","2교시 Backend: SSE(Server-Sent Events) 스트리밍 엔드포인트 설계","3교시 [실습] FastAPI SSE 엔드포인트 구현","4교시 Frontend: Vue.js/Next.js + Vercel AI SDK 연동","5교시 [실습] 프론트에서 토큰 스트리밍 렌더링","6교시 [실습] Multi-Agent Streaming(에이전트별 진행 스트림)","7교시 Observability & Eval: 추적·로그·응답 품질 평가","8교시 [실습] LangSmith/로깅으로 실행 추적 붙이기"]},"capstone-3":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 Error Handling과 재시도 전략 설계"},{time:"10:00–10:50",topic:"2교시 [실습] 예외·타임아웃·재시도 처리 붙이기"},{time:"11:00–11:50",topic:"3교시 Cost & Latency 관리(토큰·모델·캐싱)"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 Stateless Session 전환(수평 확장 대비)"},{time:"14:00–14:50",topic:"5교시 Query Routing과 Conditional Routing"},{time:"15:00–15:50",topic:"6교시 [실습] Validator Agent 출력 검증 + Dynamic Planning"},{time:"16:00–16:50",topic:"7교시 팀별 최종 통합·발표·라이브 데모"},{time:"17:00–17:50",topic:"8교시 상호 피드백·회고(KPT) · Wrap-up QUIZ"}],practice:{title:"오류 처리·재시도·검증을 붙여 안정화하고, 최종 통합·발표하기",steps:["'pip install tenacity' 로 재시도 라이브러리를 설치한다.","아래 realCode의 safe.py(재시도·타임아웃 + Validator Agent)를 붙여넣고, 메인 호출을 safe_answer 로 교체한다.","일부러 잘못된 키나 주소로 실패시켜, 1→2→4초 재시도 후에도 안 되면 친절한 대체 응답이 나오는지 확인한다.","근거 없는 답을 일부러 만들어 넣어, Validator가 걸러내고 재생성하는지 확인한다.","질문을 유형(요약·검색·계산)으로 분류하는 라우터 노드를 만들고, 유형에 따라 서로 다른 도구·프롬프트로 분기(Conditional Edge)한 뒤, 각 경로가 실제로 다르게 처리되는지 로그로 확인한다.","한 번 호출의 토큰·응답시간을 측정해 'Cost·Latency' 표를 만들고, 작은 모델·캐싱으로 줄일 지점을 찾는다.","발표 슬라이드 5장을 만든다: (1)문제정의 (2)아키텍처(MCP 포함) (3)라이브 데모 (4)운영(비용·지연·관측) (5)개선방향.","라이브 데모 실패에 대비해 정상 동작 화면을 미리 녹화한다(백업 영상).","(기대 결과) 발표 중 질문을 넣으면 출처와 함께 답이 나오고, 오류를 내도 서비스가 멈추지 않음을 시연한다.","팀별 발표 + 질의응답 후 KPT 회고(Keep·Problem·Try)를 작성한다."],deliverable:"안정화된 서비스(재시도·타임아웃·Validator) + 발표 슬라이드 5장 + Cost·Latency 표 + KPT 회고"}},examples:[{title:"실패하면 자동으로 다시 시도하기(재시도)",lang:"python",code:`from tenacity import retry, wait_exponential, stop_after_attempt  # 재시도 도구

count = {'n': 0}  # 몇 번 시도했는지 세는 상자

@retry(wait=wait_exponential(multiplier=1, max=8), stop=stop_after_attempt(3))
def flaky():  # 두 번 실패하고 세 번째에 성공하는 함수(흉내)
    count['n'] += 1
    print(f"{count['n']}번째 시도")  # 결과: 1번째..2번째..3번째 시도 출력
    if count['n'] < 3:
        raise ValueError('일시적 오류')  # 실패를 흉내
    return '성공!'

print(flaky())  # 결과: 3번째에서 '성공!' 출력
`,note:"wait_exponential 은 1→2→4초로 점점 더 기다렸다 재시도해 서버 부담을 줄입니다."},{title:"무한 대기 막기(타임아웃)",lang:"python",code:`import asyncio  # 비동기·타임아웃 도구

async def slow():  # 5초나 걸리는 느린 작업 흉내
    await asyncio.sleep(5)
    return '완료'

async def main():
    try:
        result = await asyncio.wait_for(slow(), timeout=2)  # 2초 안에 안 끝나면 끊음
        print(result)
    except asyncio.TimeoutError:  # 시간 초과 시
        print('시간 초과! 대체 응답을 보냅니다.')  # 결과: 이 줄이 출력됨

asyncio.run(main())
`,note:"타임아웃이 없으면 느린 API 하나가 서비스 전체를 멈추게 할 수 있습니다."},{title:"정해진 순서 대신 결과를 보고 계획을 고치는 Dynamic Planning 맛보기",lang:"python",code:`# run: 한 단계를 실행해 결과 문자열을 돌려준다고 가정(실제론 LLM/도구 호출)
def run(step):
    return f'[{step}] 처리 결과'

# needs_more: 결과를 보고 '추가 조사가 더 필요한가'를 판단(연습용은 간단 규칙)
def needs_more(result):
    return '근거 부족' in result

plan = ['정보 검색', '초안 작성', '근거 검증']  # 처음 세운 계획(할 일 목록)
done = []                                      # 끝낸 일들을 모아 둔다

while plan:                     # 할 일이 남아 있는 동안 반복
    step = plan.pop(0)          # 맨 앞 일을 꺼내
    result = run(step)          # 실행하고
    done.append(result)         # 결과를 기록
    if needs_more(result):      # 결과가 부실하면
        plan.insert(0, '추가 검색')  # 다음 할 일로 '추가 검색'을 새로 끼워 넣는다

print(done)  # 결과: 실행 도중 계획이 바뀌며 쌓인 결과 목록
`,note:"정적 계획은 한 번 짠 순서를 고정하지만, Dynamic Planning은 중간 결과를 보고 plan 리스트를 실행 도중 바꾼다는 점이 핵심이다."},{title:"cache_route.py — 캐싱 + 난이도별 모델 라우팅으로 Cost·Latency 줄이기(3교시)",lang:"python",code:`import hashlib  # 질문을 캐시 열쇠로 바꿀 때 사용
from langchain_anthropic import ChatAnthropic

# 작은·빠른 모델과 크고 똑똑한 모델을 나눠 준비
fast = ChatAnthropic(model='claude-haiku-4-5')   # 싸고 빠름 — 쉬운 질문용
smart = ChatAnthropic(model='claude-opus-4-8')   # 비싸고 똑똑함 — 어려운 질문용

cache = {}  # 같은 질문을 또 받으면 저장해 둔 답을 즉시 돌려준다(실무는 Redis)

def pick_model(question: str):
    # 질문이 짧거나 단순 조회성이면 fast, 분석·추론이 필요하면 smart
    if len(question) < 40 and not any(k in question for k in ['왜', '분석', '비교']):
        return fast
    return smart

def answer(question: str) -> str:
    key = hashlib.md5(question.encode()).hexdigest()  # 질문을 짧은 열쇠로
    if key in cache:              # 이미 답한 질문이면
        return cache[key]          # 모델 호출 없이 즉시 반환(Cost 0, Latency 최소)
    model = pick_model(question)  # 난이도에 맞는 모델 선택
    result = model.invoke(question).content
    cache[key] = result           # 다음을 위해 저장
    return result

print(answer('영업시간 알려줘'))   # 짧은 질문 → fast 모델
print(answer('영업시간 알려줘'))   # 두 번째 → 캐시 적중(호출 없음)
print(answer('작년 대비 매출이 왜 줄었는지 분석해줘'))  # 어려운 질문 → smart 모델
`,note:`쉬운 질문에 비싼 모델을 쓰는 낭비를 막고(라우팅), 같은 질문의 반복 호출을 없애(캐싱) 요금과 지연을 함께 줄입니다.
실무에선 cache 딕셔너리를 Redis로 바꿔 여러 서버가 캐시를 공유하게 합니다.`},{title:"stateless.py — 대화 상태를 Redis에 저장해 수평 확장 대비(4교시)",lang:"python",code:`# 서버 메모리(MemorySaver) 대신 외부 저장소에 대화를 두면
# 어느 서버가 요청을 받아도 같은 대화를 이어갈 수 있다(=Stateless).
from langgraph.checkpoint.redis import RedisSaver  # Redis에 체크포인트 저장
from langgraph.prebuilt import create_react_agent
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model='claude-opus-4-8')
tools = []  # 실제로는 MCP 도구를 넣는다

# Redis 주소만 주면 thread_id별 대화가 Redis에 저장·복원된다
with RedisSaver.from_conn_string('redis://localhost:6379') as saver:
    agent = create_react_agent(llm, tools, checkpointer=saver)

    def ask(question, thread_id):
        config = {'configurable': {'thread_id': thread_id}}
        return agent.invoke({'messages': [('user', question)]}, config)['messages'][-1].content

    print(ask('내 이름은 길동이야', 'user-1'))
    # 이 프로세스를 껐다 켜거나, 다른 서버에서 실행해도
    print(ask('내 이름이 뭐였지?', 'user-1'))  # 결과: Redis에서 복원해 '길동' 기억
`,note:`Day1의 MemorySaver는 서버를 끄면 대화가 사라지지만, RedisSaver는 저장소가 서버 밖에 있어 재시작·다중 서버에도 대화가 유지됩니다.
이것이 로드밸런서 뒤에 서버를 여러 대 두는 수평 확장의 전제 조건입니다.`},{title:"router.py — 질문 종류를 분류해 알맞은 경로로 보내기(Query Routing, 5교시)",lang:"python",code:`from langchain_anthropic import ChatAnthropic
llm = ChatAnthropic(model='claude-haiku-4-5')  # 분류는 가볍고 빠른 모델로

def classify(question: str) -> str:
    # 모델에게 카테고리 하나만 고르게 시킨다(라우팅 판단)
    prompt = (f'다음 질문을 [검색, 계산, 잡담] 중 하나로만 분류해 그 단어만 출력:\\n{question}')
    return llm.invoke(prompt).content.strip()

def route(question: str) -> str:
    kind = classify(question)          # 먼저 종류를 판단
    if '검색' in kind:                  # 조건에 따라 흐름을 나눔(Conditional Routing)
        return f'[RAG 파이프라인으로] {question}'   # 문서 검색 경로
    elif '계산' in kind:
        return f'[계산 도구로] {question}'          # 계산기 도구 경로
    else:
        return f'[일반 대화로] {question}'          # 잡담 경로

print(route('환불 규정 문서 찾아줘'))     # → RAG 경로
print(route('3만원의 15%는 얼마야'))      # → 계산 경로
print(route('오늘 기분 어때'))            # → 일반 대화 경로
`,note:`모든 질문을 한 에이전트에 몰지 않고 종류별로 알맞은 경로로 보내면, 정확도는 높이고 불필요한 검색·비용은 줄입니다.
실무에선 이 route가 LangGraph의 Conditional Edge가 되어 노드 사이 분기를 만듭니다.`},{title:"발표용 데모 시나리오 스크립트",lang:"bash",code:`# 발표 중 실패 위험을 줄이는 사전 점검 스크립트
set -e   # 하나라도 실패하면 즉시 중단
echo "[1] 서버 기동"; curl -sf localhost:8000/health
echo "[2] 정상 시나리오"; curl -sf -X POST localhost:8000/ask -d '{"q":"핵심 질문"}'
echo "[3] 엣지 케이스"; curl -sf -X POST localhost:8000/ask -d '{"q":""}'
echo "모든 시나리오 통과 — 데모 준비 완료"`,note:"발표 직전 스모크 테스트로 데모 안정성을 확보한다. 정상·엣지 케이스를 모두 미리 통과시킨다."}],concepts:[{term:"Error Handling(오류 처리)",desc:"호출 실패·타임아웃이 나도 서비스가 멈추지 않도록 재시도하거나 대체 응답을 주는 안전장치다."},{term:"재시도(Retry)와 지수 백오프",desc:"일시적 실패 시 잠깐 기다렸다 다시 호출하되, 기다리는 시간을 점점 늘려(1초→2초→4초) 서버 부담을 줄이는 전략이다."},{term:"Cost & Latency 관리",desc:"토큰·모델 선택으로 드는 요금(Cost)과 응답까지 걸리는 지연(Latency)을 함께 관리해 싸고 빠르게 만드는 것이다."},{term:"Stateless Session",desc:"서버가 대화 상태를 자기 안에 들고 있지 않아 어느 서버든 요청을 처리할 수 있게 하는 것으로, 수평 확장이 쉬워진다."},{term:"Query Routing · Conditional Routing",desc:"질문의 종류·난이도에 따라 알맞은 모델·도구·경로로 보내 주는 것으로, 조건에 따라 흐름을 바꾸면 Conditional Routing이다."},{term:"Validator Agent",desc:"다른 에이전트의 출력이 형식·사실·규칙에 맞는지 검사하는 감시 역할 에이전트로, 잘못되면 다시 시키거나 걸러낸다."},{term:"Dynamic Planning",desc:"정해진 순서대로만 가지 않고, 중간 결과를 보고 다음 계획을 그때그때 새로 짜는 방식이다."}],detail:{topics:[{h:"안정성: 오류·재시도·타임아웃",items:["try/except로 실패를 감싸 서비스가 멈추지 않게","지수 백오프 재시도(1→2→4초)로 일시적 오류 흡수","타임아웃을 걸어 무한 대기 방지","실패 시 사용자에게 친절한 대체 응답 제공"]},{h:"비용·지연·세션",items:["작은 모델·캐싱으로 Cost 절감","불필요한 재검색 줄여 Latency 개선","Stateless로 만들어 세션을 외부(DB·Redis)에 저장","→ 어느 서버든 처리 가능 → 수평 확장 쉬움"]},{h:"에이전트 확장: 라우팅·검증·동적계획",items:["Query Routing으로 질문 종류별 경로 분기","Validator Agent로 출력의 형식·근거 검증","Conditional Routing으로 조건에 따라 흐름 전환","Dynamic Planning: ReAct(그때그때 한 걸음씩 판단) vs Plan-and-Execute(먼저 전체 계획을 세우고 실행하며 필요 시 재계획)","LangGraph에선 계획→실행→재계획 노드를 Conditional Edge로 이어, 남은 계획이 있으면 실행 노드로·없으면 종료로 분기(Conditional Routing과 Dynamic Planning이 한 그래프에서 맞물림)"]}],labs:[{title:"Lab 1. 재시도·타임아웃 붙이기",steps:["'pip install tenacity' 로 설치한다.","LLM/도구 호출 함수 위에 '@retry(wait=wait_exponential(...), stop=stop_after_attempt(3))' 를 붙인다.","호출을 'asyncio.wait_for(coro, timeout=20)' 로 감싸 20초 넘으면 끊기게 한다.","일부러 잘못된 키·주소로 실패시켜, 재시도 로그가 찍히고 최종적으로 대체 응답이 나오는지 확인한다."]},{title:"Lab 2. Validator Agent 추가하기",steps:["출력 검증용 프롬프트를 작성한다(예: '답변에 근거 출처가 있는가? JSON 형식이 맞는가?').","메인 에이전트 뒤에 검증 노드를 두고, 실패면 재생성하도록 분기(Conditional Edge)한다.","일부러 근거 없는 답을 만들어 넣어 검증에서 걸러지는지 테스트한다.","통과/실패 로그를 남겨 검증이 실제로 동작함을 확인한다."]},{title:"Lab 3. 세션을 Redis로 옮겨 Stateless로 만들기(4교시)",steps:["로컬에 Redis를 띄운다: 'docker run -p 6379:6379 redis' (또는 이미 있는 Redis 사용).","'pip install langgraph-checkpoint-redis' 로 Redis 체크포인터를 설치한다.","Day1의 MemorySaver를 realCode의 RedisSaver로 교체한다(연결 문자열 redis://localhost:6379).","thread_id='user-1'로 이름을 알려 준 뒤, 파이썬 프로세스를 완전히 껐다 다시 켠다.","다시 thread_id='user-1'로 '내 이름이 뭐였지?'를 물어, 재시작 후에도 Redis에서 대화가 복원돼 이름을 기억하는지 확인한다 — 이것이 수평 확장의 전제다."]},{title:"Lab 4. Query Routing 붙여 질문 종류별로 경로 나누기(5교시)",steps:["realCode의 router.py 를 만들어 질문을 [검색·계산·잡담]으로 분류하는 classify 함수를 확인한다.","각 종류를 실제 경로에 연결한다: 검색→RAG 파이프라인, 계산→계산 도구, 잡담→일반 LLM 응답.","세 종류의 질문을 각각 던져 서로 다른 경로로 가는지, 로그로 분기를 확인한다.","분류가 틀리기 쉬운 경계 질문(예: '매출 자료 찾아서 증감률 계산해줘')을 넣어 보고, 이런 복합 질문은 어떻게 처리할지(둘 다 태우기·재분류) 팀에서 토론한다.","여유가 되면 LangGraph의 Conditional Edge로 옮겨, classify 결과에 따라 노드가 분기하도록 그래프로 만든다."]},{title:"Lab 5. 발표 준비 · KPT 회고 · Wrap-up 퀴즈(7~8교시)",steps:["발표 5장(문제정의·아키텍처·라이브데모·운영·개선방향)을 팀당 한 벌 만든다.","라이브 데모를 최소 1회 리허설하고, 네트워크가 끊길 때를 대비해 화면 녹화본을 백업해 둔다.","데모 시나리오를 둘 준비한다: ①정상 흐름 1개 ②일부러 오류를 내고 대체 응답이 나오는 견고함 시연 1개.","발표 후 KPT 포스트잇을 각자 세 칸(Keep·Problem·Try) 작성해 붙이고, 팀이 상위 3개를 골라 공유한다.","Wrap-up 퀴즈 6문항(MCP Tool/Resource 구분, SSE 방향, MemorySaver vs RedisSaver, Validator 역할, 지수 백오프 이점, 라우팅이 줄이는 것)을 서로 물어 맞혀 본다.","마지막으로 'Day1 조립 → Day2 품질 → Day3 운영'의 3일 흐름을 한 줄로 정리해 개인 회고 노트에 남긴다."]}],homework:["우리 서비스에 오류 처리·재시도·타임아웃을 적용하고, 일부러 오류를 냈을 때도 멈추지 않음을 시연 영상으로 제출하기.","최종 발표(5장): 문제정의 · 아키텍처(MCP 포함) · 라이브 데모 · 운영(비용/지연/관측) · 개선방향 을 정리해 제출하기."]},theory:{theory:[{h:"실서비스는 '실패를 전제로' 설계한다",body:`API는 가끔 느려지거나 잠깐 죽고, 네트워크는 종종 끊깁니다.
초보 코드는 이런 일이 나면 그대로 멈추지만, 실서비스는 '실패는 당연히 난다'고 보고 미리 대비한다.
핵심은 세 가지다: try/except로 오류를 붙잡고, 재시도(지수 백오프)로 일시적 실패를 흡수하고, 타임아웃으로 무한 대기를 막는다.
그리고 그래도 안 되면 '잠시 후 다시 시도해 주세요' 같은 친절한 대체 응답으로 사용자를 안심시킨다.

멈추지 않고 우아하게 실패하는 것(graceful degradation)이 프로다운 서비스의 조건이다.`},{h:"비용·지연·확장 — Stateless가 열쇠다",body:`사용자가 늘면 서버를 여러 대로 늘려야 하는데, 서버가 대화 상태를 자기 메모리에 들고 있으면 문제가 생깁니다.
같은 사용자의 다음 요청이 다른 서버로 가면 대화 맥락을 잃기 때문이다.
그래서 상태를 서버 밖(DB·Redis)에 저장하는 Stateless 구조로 만들면, 아무 서버나 요청을 처리할 수 있어 수평 확장이 쉬워진다.
비용은 작은 모델·캐싱으로, 지연은 불필요한 재검색 제거로 줄인다.

'싸고 · 빠르고 · 잘 늘어나는' 세 가지를 함께 저울질하는 것이 운영의 핵심이다.`},{h:"에이전트 확장 — 라우팅·검증·동적 계획",body:`서비스가 커지면 하나의 에이전트로 모든 질문을 처리하기 어렵습니다.
Query Routing은 질문의 종류(요약·검색·계산)에 따라 알맞은 경로로 보내고, Conditional Routing은 중간 조건에 따라 흐름을 바꾼다.
Validator Agent는 다른 에이전트의 답이 형식·근거에 맞는지 검사해, 틀리면 다시 시키거나 걸러낸다.
Dynamic Planning은 정해진 순서만 따르지 않고 중간 결과를 보며 계획을 새로 짠다.

이 장치들이 모이면, 단순 챗봇이 아니라 스스로 점검하고 길을 고르는 견고한 에이전트 시스템이 된다.`},{h:"7교시 최종 발표 — 5장으로 3일을 증명한다",body:`발표는 '멋진 슬라이드'가 아니라 '작동하는 것을 보여 주는 자리'입니다. 3일간 붙인 서비스를 5장의 이야기와 한 번의 라이브 데모로 증명합니다.
권장 구성은 이렇습니다. ①문제 정의: 누구의 어떤 불편을 푸는가(한 문장). ②아키텍처: 네 조각과 MCP·RAG가 어떻게 이어지는지 Day1의 그 그림으로. ③라이브 데모: 실제로 질문을 던져 스트리밍으로 답이 흐르고 도구가 호출되는 걸 보여 준다(녹화본 백업 필수). ④운영: 비용·지연을 어떻게 줄였고, 관측(LangSmith)에서 무엇을 봤는지 숫자로. ⑤개선 방향: 남은 약점과 다음 스텝.

데모는 반드시 리허설합니다 — 네트워크·키·포트는 발표장에서 가장 잘 터집니다. 그래서 ①정상 시나리오 1개와 ②실패를 우아하게 넘기는 시나리오 1개(일부러 오류를 내고 대체 응답이 나오는 모습)를 준비하면, Day3에서 배운 견고함까지 한 번에 보여 줄 수 있습니다.

발표 시간은 팀당 짧게 잡고, '무엇을 만들었나'보다 '왜 그렇게 설계했나'의 의사결정(왜 이 도구를 MCP로 뺐나, 왜 이 모델로 라우팅했나)을 말하도록 유도합니다. 평가자와 동료가 가장 배우는 지점이 바로 그 판단의 근거입니다.`},{h:"8교시 회고(KPT)와 마무리 퀴즈 — 배운 것을 내 것으로",body:`마지막 시간은 '무엇을 만들었나'를 넘어 '무엇을 배웠나'를 남기는 자리입니다. 회고는 KPT 틀로 짧고 솔직하게 합니다.
Keep(계속할 것): 이번에 잘 통한 방식 — 예: 아키텍처를 먼저 그리고 병렬로 나눈 것, thread_id로 세션을 일찍 분리한 것. Problem(문제였던 것): 막혔던 지점 — 예: SSE가 버퍼링돼 스트리밍이 안 보였던 것, MCP 서버 기동 순서. Try(다음에 시도할 것): 개선안 — 예: 캐시를 Redis로, Validator를 초반부터, 데모 리허설 2회.
각자 포스트잇 한 장씩 세 칸을 채워 붙이고, 팀이 상위 3개를 골라 공유하면 됩니다.

이어서 Wrap-up 퀴즈로 핵심 개념을 스스로 점검합니다. 예시 문항: (1)MCP에서 부작용 있는 기능은 Tool·Resource 중 무엇인가? (2)SSE는 서버→클라 단방향인가 양방향인가? (3)MemorySaver와 RedisSaver의 차이가 수평 확장에 왜 중요한가? (4)Validator Agent는 무엇을 검사하는가? (5)지수 백오프가 그냥 재시도보다 나은 이유는? (6)쉬운 질문에 작은 모델을 쓰는 라우팅은 무엇을 줄이나?

마지막으로 강사가 3일을 한 줄로 꿰어 줍니다: '조각을 붙이고(Day1) → 체감 품질을 올리고(Day2) → 운영을 견고히(Day3)' 한 이 흐름이 앞으로 어떤 AI 서비스를 만들 때도 그대로 반복되는 뼈대라는 점을 강조하며 마칩니다.`}]},realCodes:[{title:"safe.py — 재시도·타임아웃 + Validator Agent(출력 검증)",lang:"python",code:`import asyncio  # 비동기 실행·타임아웃 도구
from tenacity import retry, wait_exponential, stop_after_attempt  # 재시도 데코레이터
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model='claude-opus-4-8')

# 실패하면 1→2→4초 기다렸다 최대 3번까지 다시 시도
@retry(wait=wait_exponential(multiplier=1, max=8), stop=stop_after_attempt(3))
async def call_llm(prompt: str) -> str:
    # 20초를 넘기면 강제로 끊어 무한 대기를 막는다
    resp = await asyncio.wait_for(llm.ainvoke(prompt), timeout=20)
    return resp.content

async def validate(answer: str) -> bool:  # Validator Agent — 답에 근거가 있는지 검사
    check = await call_llm(f'다음 답변에 근거/출처가 있으면 OK, 없으면 NO만 출력:\\n{answer}')
    return 'OK' in check

async def safe_answer(question: str) -> str:  # 최종 진입점
    try:
        answer = await call_llm(question)  # 1차 답변
        if not await validate(answer):  # 검증 실패 시
            answer = await call_llm(question + '\\n반드시 근거를 포함해 다시 답하라.')  # 재생성
        return answer
    except Exception as e:  # 재시도까지 실패하면 우아하게 대체 응답
        return f'일시적 오류로 답변을 못 드렸어요. 잠시 후 다시 시도해 주세요. ({e})'
`,note:`재시도·타임아웃·검증을 한 파일에 모았습니다.
일부러 잘못된 키로 call_llm 을 부르면 3번 재시도 후 대체 응답이 나오고, 근거 없는 답은 validate 에서 걸러져 다시 생성된다.`}],periods:["1교시 Error Handling과 재시도 전략 설계","2교시 [실습] 예외·타임아웃·재시도 처리 붙이기","3교시 Cost & Latency 관리(토큰·모델·캐싱)","4교시 Stateless Session 전환(수평 확장 대비)","5교시 Query Routing과 Conditional Routing","6교시 [실습] Validator Agent 출력 검증 + Dynamic Planning","7교시 팀별 최종 통합·발표·라이브 데모","8교시 상호 피드백·회고(KPT) · Wrap-up QUIZ"]}};export{e as default};
