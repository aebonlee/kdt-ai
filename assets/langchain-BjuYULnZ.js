const n={"langchain-1":{plan:{schedule:[{time:"09:00–09:50",topic:"오리엔테이션: LangChain이 왜 필요한가 (LLM 앱의 고민거리)"},{time:"10:00–10:50",topic:"[실습] 개발환경 셋업 - 파이썬 가상환경·LangChain·API 키 연결"},{time:"11:00–11:50",topic:"[실습] 첫 LLM 호출 - 모델·프롬프트·출력 파서 따로 써보기"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"LCEL과 Runnable 인터페이스: 파이프(|) 조립과 invoke/stream/batch"},{time:"14:00–14:50",topic:"[실습] LCEL로 첫 체인 만들기 (프롬프트 | 모델 | 파서)"},{time:"15:00–15:50",topic:"출력 파서 깊이보기: 문자열·JSON·구조화 출력"},{time:"16:00–16:50",topic:"[실습] 번역기·요약기 체인 만들고 입력 바꿔보기"},{time:"17:00–17:50",topic:"마무리: 오늘 배운 부품으로 미니 체인 정리 + Q&A"}],practice:{title:"나만의 '한 줄 요약 봇' 체인 만들기 (프롬프트 | 모델 | 파서)",steps:["터미널을 열고 'python -m venv venv' 명령으로 가상환경을 만든 뒤 'source venv/bin/activate'(윈도우는 venv\\Scripts\\activate)로 활성화한다.","'pip install langchain langchain-anthropic' 명령으로 LangChain 본체와 모델 연동 패키지를 설치한다.","발급받은 API 키를 터미널에서 'export ANTHROPIC_API_KEY=sk-...' 로 환경변수에 등록한다(윈도우는 set 사용).","summarizer.py 파일을 만들고 ChatPromptTemplate.from_template 로 '{text}를 한 문장으로 요약해줘' 형태의 프롬프트를 작성한다.","ChatAnthropic(model=...) 로 모델 객체를 만들고, StrOutputParser() 로 출력 파서를 만든다.","프롬프트 | 모델 | 파서 를 파이프(|)로 이어 chain 변수에 담는다.","chain.invoke({'text': '오늘 회의에서 우리는 신제품 출시 일정을 9월로 확정했다'}) 를 호출한다.","터미널에 'python summarizer.py'를 실행해 한 문장 요약이 출력되는지 확인한다(기대 결과: '신제품 출시를 9월로 확정했다' 같은 한 줄).","입력 text를 다른 문장으로 바꿔 다시 실행하며, 코드를 고치지 않아도 결과가 달라지는지 확인한다.","마지막으로 프롬프트 문구를 '세 줄로 요약'으로 바꿔 같은 체인이 다르게 동작함을 관찰한다."],deliverable:"입력 문장을 받아 한 문장으로 요약해 출력하는 summarizer.py 파일과 실행 결과 스크린샷"}},examples:[{title:"모델 한 번 호출해 보기 (가장 단순한 형태)",lang:"python",code:`# Anthropic 채팅 모델 연동 클래스를 가져온다
from langchain_anthropic import ChatAnthropic
# 모델 객체를 만든다(어떤 모델을 쓸지 이름으로 지정)
model = ChatAnthropic(model="claude-opus-4-8")
# invoke에 질문 문자열을 넣어 모델을 한 번 실행한다
answer = model.invoke("LangChain을 한 문장으로 설명해줘")
# 모델 답 객체의 content에 실제 답 글자가 들어 있으므로 그것을 출력한다
print(answer.content)  # 결과 예: 'LangChain은 LLM 앱을 부품처럼 조립하게 돕는 도구다.'`,note:"체인을 만들기 전에 모델만 단독으로 불러 보는 가장 기초 예제다."},{title:"프롬프트 양식에 값 끼워 넣어 확인하기",lang:"python",code:`# 프롬프트 양식을 만드는 도구를 가져온다
from langchain_core.prompts import ChatPromptTemplate
# {언어} 자리를 가진 번역 지시 프롬프트를 만든다
prompt = ChatPromptTemplate.from_template("'{word}'를 {언어}로 번역해줘")
# 빈칸에 실제 값을 채워 완성된 프롬프트가 어떻게 보이는지 만들어 본다
filled = prompt.invoke({"word": "사과", "언어": "영어"})
# 완성된 메시지 내용을 출력해 양식이 잘 채워졌는지 눈으로 확인한다
print(filled.messages[0].content)  # 결과: "'사과'를 영어로 번역해줘"`,note:"모델에 보내기 전, 프롬프트가 어떻게 채워지는지 직접 눈으로 보는 점이 핵심이다."},{title:"JSON으로 구조화 출력 받기",lang:"python",code:`# JSON 형태로 결과를 파싱해 주는 출력 파서를 가져온다
from langchain_core.output_parsers import JsonOutputParser
# 프롬프트 양식 도구를 가져온다
from langchain_core.prompts import ChatPromptTemplate
# 모델 연동 클래스를 가져온다
from langchain_anthropic import ChatAnthropic
# 이름과 나이를 JSON으로 뽑아 달라고 지시하는 프롬프트를 만든다
prompt = ChatPromptTemplate.from_template(
    "문장에서 이름과 나이를 JSON으로 뽑아줘: {sentence}")  # 빈칸 sentence에 문장이 들어간다
# 프롬프트 | 모델 | JSON파서 순으로 체인을 조립한다
chain = prompt | ChatAnthropic(model="claude-opus-4-8") | JsonOutputParser()
# 체인을 실행하면 문자열이 아니라 파이썬 딕셔너리로 결과가 나온다
out = chain.invoke({"sentence": "홍길동은 30살이다"})
# 딕셔너리이므로 키로 값을 바로 꺼낼 수 있다
print(out)  # 결과 예: {'이름': '홍길동', '나이': 30}`,note:"StrOutputParser 대신 JsonOutputParser를 쓰면 결과를 바로 코드에서 다룰 수 있다."},{title:"빈칸만 바꿔 여러 언어로 돌리는 번역기 체인",lang:"python",code:`# 프롬프트·모델·파서 부품을 가져온다
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_anthropic import ChatAnthropic

# 빈칸 두 개(text, target)를 가진 번역 지시 프롬프트를 만든다
prompt = ChatPromptTemplate.from_template(
    "다음 문장을 {target}로 자연스럽게 번역해줘. 번역문만 출력해:\\n\\n{text}")
model = ChatAnthropic(model="claude-opus-4-8")  # 글을 생성할 모델(opus-4-8은 temperature 지정 없이 사용)
parser = StrOutputParser()                      # 답에서 글자만 깔끔히 추출

# 세 부품을 파이프(|)로 이어 번역기 체인을 조립한다
translator = prompt | model | parser

# 코드는 그대로 두고, 입력의 target만 바꿔 여러 언어로 번역해 본다
for target in ["영어", "일본어", "프랑스어"]:
    result = translator.invoke({"text": "오늘 회의는 오후 3시에 시작합니다.", "target": target})
    print(f"[{target}] {result}")
# 결과 예: [영어] The meeting starts at 3 PM today. / [일본어] 今日の会議は午後3時に始まります。 ...`,note:"프롬프트의 빈칸(target)만 바꾸면 코드 수정 없이 번역 언어가 바뀐다. 프롬프트 문구를 '한 문장으로 요약해줘'로만 바꾸면 똑같은 구조가 그대로 요약기가 된다 — '부품은 그대로, 프롬프트만 교체'가 LangChain 재사용의 핵심이다."},{title:"폴백 + 재시도 (안정성)",lang:"python",code:`from langchain_openai import ChatOpenAI

primary = ChatOpenAI(model="gpt-4o", timeout=20)
backup = ChatOpenAI(model="gpt-4o-mini")    # 더 싸고 빠른 대체 모델

# primary 실패(타임아웃/오류) 시 backup 으로 자동 전환
robust = primary.with_fallbacks([backup]).with_retry(stop_after_attempt=2)
chain = prompt | robust | parser`,note:"with_fallbacks/with_retry 로 일시적 장애에 대응한다. 운영 LLM 앱의 가용성 핵심 패턴."},{title:"LCEL batch — 여러 입력을 한 번에 처리",lang:"python",code:`from langchain_core.prompts import ChatPromptTemplate  # 프롬프트 양식 도구
from langchain_core.output_parsers import StrOutputParser  # 답에서 글자만 추출
from langchain_anthropic import ChatAnthropic  # 클로드 모델 연동

prompt = ChatPromptTemplate.from_template("다음 문장을 영어로 번역해줘: {text}")  # 빈칸 text
chain = prompt | ChatAnthropic(model="claude-opus-4-8") | StrOutputParser()  # 프롬프트->모델->파서

# 여러 입력을 리스트로 준비한다(각 딕셔너리가 한 번의 실행)
inputs = [
    {"text": "안녕하세요"},              # 첫 번째 문장
    {"text": "오늘 날씨가 좋네요"},       # 두 번째 문장
    {"text": "저는 AI를 공부합니다"},     # 세 번째 문장
]
# invoke는 1건씩, batch는 여러 건을 한 번에 처리한다(내부적으로 병렬)
results = chain.batch(inputs)              # 세 문장을 한꺼번에 번역
for r in results:                          # 결과 리스트를 하나씩 꺼내
    print(r)                               # 번역문 출력`,note:"batch를 쓰면 여러 입력을 한 번에 처리해 반복 invoke보다 빠르다. 대량 문서 번역·요약처럼 입력이 많을 때 효과가 크다."},{title:"RunnableLambda / RunnablePassthrough — 사용자 함수를 체인 부품으로",lang:"python",code:`from langchain_core.runnables import RunnableLambda, RunnablePassthrough  # 사용자 함수·통과 러너블
from langchain_core.prompts import ChatPromptTemplate  # 프롬프트 양식
from langchain_core.output_parsers import StrOutputParser  # 문자열 파서
from langchain_anthropic import ChatAnthropic  # 클로드 모델

# 1) 평범한 파이썬 함수를 러너블로 감싸면 체인 부품이 된다
to_upper = RunnableLambda(lambda x: x.upper())  # 입력 문자열을 대문자로
print(to_upper.invoke("langchain"))        # 결과: LANGCHAIN

# 2) RunnablePassthrough: 받은 입력을 그대로 다음 단계로 흘려보낸다
prompt = ChatPromptTemplate.from_template("{text}를 한 문장으로 요약해줘")  # 빈칸 text
chain = ({"text": RunnablePassthrough()}   # 들어온 문자열을 text 자리에 그대로 꽂는다
         | prompt
         | ChatAnthropic(model="claude-opus-4-8")
         | StrOutputParser())
# 딕셔너리로 감싸지 않아도 문자열 입력이 text로 전달된다
print(chain.invoke("랭체인은 LLM 앱을 부품처럼 조립하게 돕는 프레임워크다."))  # 요약 출력`,note:"RunnableLambda로 임의의 함수를(전처리·후처리) 체인에 끼워 넣고, RunnablePassthrough로 입력을 원하는 키에 그대로 전달한다. 체인 사이사이에 내 로직을 자연스럽게 삽입하는 도구다."},{title:"비동기 ainvoke — 여러 호출을 동시에 띄워 시간 아끼기",lang:"python",code:`import asyncio                            # 비동기 실행 관리 표준 라이브러리
from langchain_core.prompts import ChatPromptTemplate  # 프롬프트 양식
from langchain_core.output_parsers import StrOutputParser  # 문자열 파서
from langchain_anthropic import ChatAnthropic  # 클로드 모델

prompt = ChatPromptTemplate.from_template("한 문장으로 답해줘: {q}")  # 빈칸 q
chain = prompt | ChatAnthropic(model="claude-opus-4-8") | StrOutputParser()  # 체인 조립

async def main():                          # 비동기 함수 정의
    questions = ["하늘은 왜 파랄까?", "무지개는 왜 생길까?", "바다는 왜 짤까?"]  # 질문 3개
    # ainvoke는 비동기 호출, gather로 3개를 동시에 띄운다(순차 대기 없음)
    answers = await asyncio.gather(*[chain.ainvoke({"q": q}) for q in questions])
    for q, a in zip(questions, answers):   # 질문과 답을 짝지어
        print(q, "->", a)                  # 함께 출력

asyncio.run(main())                        # 비동기 함수 실행`,note:"순차 invoke면 대기 시간이 합산되지만, ainvoke+gather는 여러 호출을 겹쳐 전체 시간을 크게 줄인다. 네트워크 호출처럼 기다림이 많은 작업에 특히 효과적이다."}],concepts:[{term:"LangChain",desc:"LLM을 부르고 결과를 다루는 일을 레고 블록처럼 조립하게 도와주는 파이썬 도구 모음이다."},{term:"LLM (대규모 언어모델)",desc:"엄청난 양의 글을 학습해 다음에 올 말을 잘 맞히는, 글을 읽고 쓰는 똑똑한 자동완성 엔진이다."},{term:"프롬프트(Prompt)",desc:"LLM에게 시키는 지시문으로, 빈칸이 들어간 양식지처럼 만들어 두고 값만 바꿔 끼울 수 있다."},{term:"출력 파서(Output Parser)",desc:"모델이 뱉은 글 덩어리를 우리가 쓰기 좋은 형태(깨끗한 문자열·딕셔너리 등)로 정리해 주는 도구다."},{term:"LCEL",desc:"프롬프트·모델·파서 같은 부품을 파이프 기호(|)로 줄줄이 이어 하나의 체인으로 조립하는 LangChain의 표현 문법이다."},{term:"체인(Chain)",desc:"여러 부품을 순서대로 이어 붙여, 입력을 넣으면 정해진 흐름을 따라 결과가 나오게 만든 처리 라인이다."},{term:"invoke",desc:"완성된 체인에 실제 입력을 한 번 넣어 결과를 받아 오는 '실행 버튼'에 해당하는 메서드다."},{term:"RunnableParallel",desc:"하나의 입력을 여러 체인에 동시에 흘려보내 결과를 딕셔너리로 한꺼번에 모아 주는 병렬 실행 부품이다(예: 요약·감정·키워드를 한 번에)."},{term:"RunnableBranch",desc:"조건을 검사해 상황에 따라 서로 다른 체인으로 흐름을 갈라 주는 if-else 같은 분기 부품이다(예: 감정이 부정이면 사과 답변 체인으로)."}],detail:{topics:[{h:"LangChain 생태계 한눈에 보기",items:["langchain-core(부품 인터페이스)와 langchain(체인 모음)의 역할 구분","langchain-anthropic·langchain-openai 같은 모델별 연동 패키지","프롬프트·모델·파서·리트리버·메모리 등 핵심 부품 카테고리","LangSmith(관측), LangServe(배포) 등 주변 도구의 존재 알기"]},{h:"LCEL이 주는 이점",items:["파이프(|)로 가독성 좋게 흐름을 표현","invoke/batch/stream을 같은 체인으로 그대로 지원","부품 교체(모델·파서 바꾸기)가 쉬움","비동기·병렬 실행을 자동으로 지원"]},{h:"출력 파서의 종류",items:["StrOutputParser: 글자만 깔끔히 추출","JsonOutputParser: JSON을 딕셔너리로 변환","PydanticOutputParser: 정해진 데이터 모양으로 강제","파서가 형식 지시문을 프롬프트에 자동으로 끼워 주는 원리"]},{h:"Runnable 인터페이스가 핵심이다",items:["모든 부품(프롬프트·모델·파서·리트리버)이 Runnable","공통 메서드: invoke(한 번)·stream(조각)·batch(여러 개)","그래서 | 로 아무 부품이나 끼워 넣을 수 있음","LangGraph의 Node도 Runnable을 감싼 것 → 시그니처 동일"]}],labs:[{title:"Lab 1. 개발환경부터 첫 호출까지",steps:["VS Code나 터미널을 연다.","'python -m venv venv'로 가상환경을 만들고 활성화한다.","'pip install langchain langchain-anthropic'를 실행한다.","API 키를 환경변수 ANTHROPIC_API_KEY에 등록한다.","hello.py를 만들어 model.invoke('안녕')의 결과를 출력한다.","'python hello.py'로 실행해 답이 나오면 환경 준비 완료다."]},{title:"Lab 2. 파이프(|)로 첫 체인 조립",steps:["ChatPromptTemplate.from_template로 '{text}를 한 줄 요약' 프롬프트를 만든다.","ChatAnthropic 모델과 StrOutputParser를 각각 변수로 만든다.","'prompt | model | parser'로 chain을 만든다.","chain.invoke({'text': '아무 문장'})을 실행한다.","결과가 한 줄 요약으로 나오는지 확인한다.","parser만 JsonOutputParser로 바꿔 결과 형태가 어떻게 달라지는지 비교한다."]}],homework:["오늘 만든 요약 체인을 복사해, 프롬프트만 바꿔 '이메일 정중하게 다듬기' 체인으로 변형하고 입력 3개로 결과를 캡처해 제출한다.","StrOutputParser와 JsonOutputParser를 각각 쓴 체인 두 개를 만들어, 같은 입력에서 결과 타입(문자열 vs 딕셔너리)이 어떻게 다른지 한 단락으로 정리해 제출한다."]},theory:{theory:[{h:"LangChain은 왜 생겼나 - LLM만으로는 부족한 이유",body:`LLM에게 질문을 한 번 던지는 일은 사실 어렵지 않다.
진짜 어려운 건 그 다음이다.
프롬프트를 매번 손으로 새로 쓰고, 모델이 준 답을 코드가 쓰기 좋게 다듬고, 여기에 검색이나 메모리 같은 기능을 덧붙이려 하면 코드가 금세 엉킨다.

LangChain은 이런 반복 작업을 '부품'으로 미리 만들어 둔 도구 상자다.
주방에 비유하면, 매번 칼을 새로 만들지 않고 정해진 칼·도마·믹서를 꺼내 쓰는 것과 같다.
우리는 요리(서비스)에만 집중하고, 도구는 LangChain이 표준화해 제공한다.
그래서 LLM 앱을 빠르고 깔끔하게 만들 수 있다.`},{h:"부품 세 가지 - 프롬프트, 모델, 출력 파서",body:`LangChain으로 만드는 거의 모든 체인은 세 부품에서 출발한다.
첫째는 프롬프트로, 모델에게 무엇을 시킬지 적은 양식지다.
둘째는 모델로, 실제로 글을 생성하는 두뇌다.
셋째는 출력 파서로, 모델이 준 답을 우리가 쓰기 좋게 정리하는 정리함이다.

이 세 부품은 컨베이어 벨트처럼 한 줄로 이어진다.
입력이 프롬프트에서 양식을 채우고, 모델을 거쳐 글이 되고, 파서에서 깔끔하게 다듬어져 나온다.
이 흐름만 이해하면 LangChain의 절반은 끝난 셈이다.`},{h:"LCEL - 파이프(|)로 부품을 잇는다",body:`LCEL은 'LangChain Expression Language'의 줄임말로, 부품을 잇는 조립 문법이다.
핵심 기호는 딱 하나, 파이프(|)다.
'프롬프트 | 모델 | 파서'처럼 쓰면 '왼쪽 결과를 오른쪽에 넘겨라'라는 뜻이 된다.

수도관을 떠올리면 쉽다.
물(데이터)이 관을 따라 흐르며 각 칸을 거쳐 가는 모습이 바로 파이프 연결이다.
이렇게 만든 체인은 invoke로 한 번에 실행할 수 있고, 나중에 부품을 갈아 끼우기도 쉽다.`},{h:"Runnable — 모든 부품이 같은 규격이라 이어진다",body:`LCEL이 파이프(|)로 부품을 잇는다고 했는데, 어떻게 아무 부품이나 이어질까? 비밀은 Runnable이라는 공통 규격에 있다.
프롬프트·모델·출력 파서·리트리버 등 LangChain의 모든 부품이 Runnable이라, 하나같이 invoke(한 번 실행)·stream(조각씩)·batch(여러 개 한꺼번에)라는 똑같은 사용법을 가진다.

사용법이 같으니 레고 블록처럼 자유롭게 끼울 수 있고, 부품을 갈아 끼우기도 쉽다.
나중에 배울 LangGraph의 Node도 사실은 이 Runnable을 감싼 것이라, 같은 invoke/stream이 그대로 통한다.
'모든 것이 Runnable'이라는 한 문장이 LangChain 조립의 비밀인 셈이다.`},{h:"모델에 무엇을 보내나 - 메시지 타입(System/Human/AI)과 호출 파라미터",body:`우리가 model.invoke("안녕")처럼 문자열 하나만 넣으면 편하지만, 실제로 LangChain은 그 문자열을 '메시지 한 개'로 감싸 모델에 보낸다.
대화형 모델은 원래 글 한 덩어리가 아니라 '메시지 목록'을 받아 동작하기 때문이다.

메시지에는 세 가지 역할이 있다.
System 메시지는 '너는 친절한 번역가야'처럼 모델의 성격·규칙을 정하는 무대 지시문이고, 대화 내내 힘을 발휘한다.
Human 메시지는 사용자가 실제로 던진 말이다.
AI 메시지는 모델이 이전에 했던 답이다 — 내일 배울 메모리는 바로 이 AI 메시지와 과거 Human 메시지를 목록에 계속 쌓아 두는 일이다.
ChatPromptTemplate.from_messages([('system','...'),('human','{q}')]) 처럼 쓰면 이 역할들을 직접 지정할 수 있다.

또 하나 챙길 것은 호출 파라미터다.
temperature는 답의 '자유분방함'을 정하는 값으로, 0에 가까우면 매번 비슷하고 안정적인 답을, 높이면 창의적이지만 들쭉날쭉한 답을 준다.
max_tokens는 답의 최대 길이를 제한해 비용과 지연을 통제한다.
이런 값들을 ChatAnthropic(...)을 만들 때 넣어 준다.
한 가지 주의: 우리가 쓰는 claude-opus-4-8은 temperature를 지정하지 않고 기본값 그대로 쓰는 모델이므로, 예제에서 temperature를 빼는 이유가 바로 이것이다.
핵심은 '모델에 보내는 것은 결국 역할이 붙은 메시지 목록이고, 그 호출 방식을 파라미터로 조절한다'는 그림을 잡는 것이다.`},{h:"출력 파서 깊이보기 - 문자열·JSON·구조화, 세 단계로 조인다",body:`모델은 늘 '글'로 답한다. 문제는 우리 코드가 원하는 건 글이 아니라 곧바로 쓸 수 있는 값일 때가 많다는 점이다.
예를 들어 감정 분석 결과가 "이 문장은 대체로 긍정적인 것 같습니다"라는 문장으로 오면, 코드에서 if 문으로 분기하기가 곤란하다.
출력 파서는 이 '글 → 쓰기 좋은 값' 변환을 맡는 부품이고, 세 단계로 점점 조여 간다.

1단계 StrOutputParser는 모델 답 객체에서 군더더기를 걷어내고 순수 문자열만 뽑는다. 요약·번역처럼 결과가 그냥 글일 때 쓴다.
2단계 JsonOutputParser는 모델에게 JSON으로 답하게 유도한 뒤, 그 JSON을 파이썬 딕셔너리로 바꿔 준다. 그래서 out['감정']처럼 키로 값을 바로 꺼낼 수 있다.
3단계 PydanticOutputParser는 여기서 한 발 더 나아가, '이름은 문자열, 나이는 정수'처럼 원하는 데이터의 모양(스키마)을 클래스로 미리 정의하고 그 모양을 강제한다. 형식이 어긋나면 에러로 걸러 주므로 가장 안전하다.

비결은 이것이다: 파서는 스스로 format_instructions(형식 안내문)를 만들어 프롬프트에 슬쩍 끼워 넣는다.
즉 '이런 모양으로 답하라'는 지시를 파서가 모델에게 자동으로 전달하고, 돌아온 답을 다시 파서가 검사·변환하는 왕복 구조다.
정리하면 결과를 그냥 보여줄 거면 Str, 코드에서 값으로 다룰 거면 Json, 형식까지 보장해야 하면 Pydantic — 이렇게 필요에 따라 파서만 갈아 끼우면 된다.`}]},realCodes:[{title:"프롬프트·모델·파서를 LCEL로 이어 만든 요약 체인 (엔드투엔드)",lang:"python",code:`# 프롬프트 양식을 만들어 주는 도구를 가져온다(빈칸 있는 지시문을 만든다)
from langchain_core.prompts import ChatPromptTemplate
# 모델이 준 답에서 글자만 깔끔히 뽑아 주는 출력 파서를 가져온다
from langchain_core.output_parsers import StrOutputParser
# 실제로 글을 생성하는 Anthropic 채팅 모델 연동 클래스를 가져온다
from langchain_anthropic import ChatAnthropic

# {text} 자리에 입력을 끼워 넣는 프롬프트(양식지)를 만든다
prompt = ChatPromptTemplate.from_template(
    "다음 글을 초등학생도 이해하게 한 문장으로 요약해줘:\\n\\n{text}"  # 빈칸 text에 본문이 들어간다
)
# 글을 생성할 두뇌(모델)를 준비한다(opus-4-8은 temperature 설정 없이 사용)
model = ChatAnthropic(model="claude-opus-4-8")
# 모델 답에서 군더더기 없이 문자열만 뽑아 줄 파서를 준비한다
parser = StrOutputParser()

# 세 부품을 파이프(|)로 이어 하나의 체인으로 조립한다(프롬프트→모델→파서 순서)
chain = prompt | model | parser

# 요약하고 싶은 긴 글을 변수에 담는다(실제로는 기사·메일 등이 들어간다)
long_text = "이번 분기 매출은 작년보다 20% 늘었고, 신규 고객도 크게 증가했다. 다만 물류 비용 상승이 이익률을 일부 깎았다."

# 체인에 입력을 넣어 실행하고, 결과(요약 문장)를 받는다. {} 안의 키는 프롬프트의 빈칸 이름과 같아야 한다
result = chain.invoke({"text": long_text})
# 받은 요약 문장을 화면에 출력한다. 결과 예: '매출과 고객은 늘었지만 물류비로 이익은 조금 줄었다.'
print(result)`,note:`프롬프트·모델·파서를 파이프로 잇기만 하면 동작하는 완결형 요약 체인이다.
입력 글만 바꾸면 코드 수정 없이 어떤 글이든 요약된다.`}],periods:["오리엔테이션: LangChain이 왜 필요한가 (LLM 앱의 고민거리)","[실습] 개발환경 셋업 - 파이썬 가상환경·LangChain·API 키 연결","[실습] 첫 LLM 호출 - 모델·프롬프트·출력 파서 따로 써보기","LCEL과 Runnable 인터페이스: 파이프(|) 조립과 invoke/stream/batch","[실습] LCEL로 첫 체인 만들기 (프롬프트 | 모델 | 파서)","출력 파서 깊이보기: 문자열·JSON·구조화 출력","[실습] 번역기·요약기 체인 만들고 입력 바꿔보기","마무리: 오늘 배운 부품으로 미니 체인 정리 + Q&A"]},"langchain-2":{plan:{schedule:[{time:"09:00–09:50",topic:"복습: 어제의 체인에 '기억'과 '도구'를 더하면? (오늘의 그림)"},{time:"10:00–10:50",topic:"[실습] 대화 메모리 - 앞말을 기억하는 챗봇 만들기"},{time:"11:00–11:50",topic:"도구(Tool) 개념: LLM이 계산기·검색을 직접 쓰게 하기"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"[실습] bind_tools로 Tool 연결 + RunnableParallel/Lambda 복합 체인"},{time:"14:00–14:50",topic:"문서 QA 큰그림: 임베딩·벡터스토어·리트리버"},{time:"15:00–15:50",topic:"[실습] PDF/텍스트 읽어 벡터스토어에 넣기"},{time:"16:00–16:50",topic:"[실습] 리트리버 결합 문서 QA 체인 완성"},{time:"17:00–17:50",topic:"마무리: 메모리+도구+문서QA를 합친 챗봇 정리 + Q&A"}],practice:{title:"내 문서로 답하는 'QA 챗봇' 만들기 (적재 → 검색 → 답변)",steps:["'pip install langchain-community langchain-chroma langchain-anthropic chromadb' 로 필요한 패키지를 설치한다.","회사 소개나 매뉴얼 같은 텍스트를 docs.txt 파일로 준비해 같은 폴더에 둔다.","TextLoader('docs.txt').load() 로 문서를 읽어 메모리로 불러온다.","RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50) 로 문서를 작은 조각으로 자른다.","Chroma.from_documents(조각들, 임베딩) 로 조각들을 벡터스토어에 저장(색인)한다.","vectorstore.as_retriever() 로 질문과 비슷한 조각을 찾아 주는 리트리버를 만든다.","프롬프트에 '{context}만 근거로 {question}에 답해' 식으로 검색 결과 자리를 넣고 체인을 조립한다.","chain.invoke('환불 규정이 어떻게 되나요?') 를 실행한다.","터미널에서 문서 안 내용에 근거한 답이 나오는지, 문서에 없는 질문엔 '모른다'고 하는지 확인한다(기대 결과: 문서 기반 답변).","질문을 2~3개 더 바꿔 던지며, 답이 문서 내용과 일치하는지 검증한다."],deliverable:"docs.txt를 근거로 질문에 답하는 qa_bot.py와, 서로 다른 질문 3개에 대한 실행 결과 캡처"}},examples:[{title:"대화 메모리로 앞말 기억하기",lang:"python",code:`# 대화 기록을 자동으로 끼워 주는 래퍼를 가져온다
from langchain_core.runnables.history import RunnableWithMessageHistory
# 대화를 메모리에 보관하는 저장소를 가져온다
from langchain_core.chat_history import InMemoryChatMessageHistory
# 모델을 가져온다
from langchain_anthropic import ChatAnthropic
# 세션별 대화 기록을 담아 둘 딕셔너리를 만든다
store = {}
# 세션 id로 그 사람의 대화 기록을 돌려주는 함수를 정의한다
def get_history(session_id):
    if session_id not in store:           # 처음 보는 세션이면
        store[session_id] = InMemoryChatMessageHistory()  # 새 기록 객체를 만들어 둔다
    return store[session_id]              # 해당 세션의 기록을 돌려준다
# 모델에 '기록을 자동으로 함께 보내기' 기능을 입힌다
chat = RunnableWithMessageHistory(ChatAnthropic(model="claude-opus-4-8"), get_history)
# 같은 session_id로 첫 마디를 보낸다(이름을 알려 준다)
cfg = {"configurable": {"session_id": "u1"}}  # 누구의 대화인지 식별
chat.invoke("내 이름은 길동이야", config=cfg)   # 모델이 기록에 저장
# 같은 세션으로 다시 물으면 앞말을 기억해 답한다
print(chat.invoke("내 이름이 뭐였지?", config=cfg).content)  # 결과: '길동입니다.'`,note:"session_id를 같게 유지하면 모델이 직전 대화를 이어받아 맥락을 기억한다."},{title:"나만의 도구(Tool) 만들어 모델에 연결",lang:"python",code:`# 함수를 도구로 등록해 주는 데코레이터를 가져온다
from langchain_core.tools import tool
# 모델을 가져온다
from langchain_anthropic import ChatAnthropic
# @tool을 붙여 일반 함수를 모델이 쓸 수 있는 도구로 만든다
@tool
def add(a: int, b: int) -> int:
    """두 정수를 더한다"""  # 설명: 모델이 이 글을 보고 언제 쓸지 판단한다
    return a + b           # 실제 덧셈 결과를 돌려준다
# 모델에 도구 목록을 묶어(bind) 도구를 쓸 수 있게 한다
model = ChatAnthropic(model="claude-opus-4-8").bind_tools([add])
# 계산이 필요한 질문을 던진다
res = model.invoke("12345 더하기 6789는?")
# 모델이 직접 계산하지 않고 add 도구를 쓰겠다고 요청한 내역을 출력한다
print(res.tool_calls)  # 결과 예: [{'name':'add','args':{'a':12345,'b':6789}}]`,note:"모델은 답을 지어내는 대신 add 도구를 호출하겠다고 알려 주어 정확한 계산이 가능해진다."},{title:"RunnableParallel로 댓글을 한 번에 요약·감정·키워드 뽑고 부정이면 분기",lang:"python",code:`from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableParallel, RunnableBranch
from langchain_anthropic import ChatAnthropic

model = ChatAnthropic(model='claude-opus-4-8')

# 1) 작은 체인 3개를 만든다
summary_chain = ChatPromptTemplate.from_template('한 문장으로 요약: {comment}') | model | StrOutputParser()
# 감정은 세 단어 중 하나로만 답하게 제약한다
sentiment_chain = ChatPromptTemplate.from_template('positive/negative/neutral 중 하나로만 답해: {comment}') | model | StrOutputParser()
keyword_chain = ChatPromptTemplate.from_template('핵심 키워드 3개를 쉼표로: {comment}') | model | StrOutputParser()

# 2) 셋을 병렬로 묶어 댓글 하나를 동시에 처리한다
parallel = RunnableParallel(summary=summary_chain, sentiment=sentiment_chain, keywords=keyword_chain)

# 3) 감정에 따라 뒤 처리를 가른다(부정이면 이관, 아니면 감사 답변)
def is_negative(d):
    return 'negative' in d['sentiment'].lower()

branch = RunnableBranch(
    (is_negative, lambda d: {**d, 'action': '담당자 이관 + 사과 답변 초안 생성'}),
    lambda d: {**d, 'action': '자동 감사 답변'},
)

result = (parallel | branch).invoke({'comment': '배송이 너무 늦어서 화가 나요'})
print(result['sentiment'], '->', result['action'])  # 결과 예: negative -> 담당자 이관 + 사과 답변 초안 생성
`,note:"한 번의 invoke로 세 분석이 병렬로 끝나고, 감정에 따라 뒤 처리가 갈라지는 것이 실서비스 댓글 처리의 전형이다."},{title:"정해진 모양(스키마)으로 강제해서 뽑기 — PydanticOutputParser",lang:"python",code:`from pydantic import BaseModel
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_anthropic import ChatAnthropic

# 1) 원하는 결과의 '모양'을 클래스로 정의한다(이름은 문자열, 나이는 정수)
class Person(BaseModel):
    name: str
    age: int

# 2) 이 스키마를 강제하는 파서를 만든다
parser = PydanticOutputParser(pydantic_object=Person)

# 3) 프롬프트에 형식 안내문을 끼워 모델이 그 모양을 지키게 한다
prompt = ChatPromptTemplate.from_template(
    '문장에서 인물 정보를 뽑아줘.\\n{format}\\n문장: {sentence}'
).partial(format=parser.get_format_instructions())

chain = prompt | ChatAnthropic(model='claude-opus-4-8') | parser
out = chain.invoke({'sentence': '홍길동은 30살이다'})
# 결과가 문자열이 아니라 Person 객체라 점(.)으로 필드에 접근할 수 있다
print(out.name, out.age)  # 결과: 홍길동 30
`,note:"JsonOutputParser는 아무 JSON이나 받지만, PydanticOutputParser는 타입·필드까지 강제해 잘못된 형식이면 에러로 걸러 준다."},{title:"도구 라우팅 (분기)",lang:"python",code:`from langchain_core.runnables import RunnableBranch

# 질문 유형에 따라 다른 체인으로 라우팅한다
chain = RunnableBranch(
    # (조건, 실행할 체인) 쌍
    (lambda x: "환불" in x["q"], refund_chain),
    (lambda x: "배송" in x["q"], shipping_chain),
    default_chain,           # 어디에도 안 맞으면 기본 체인
)`,note:"단일 거대 프롬프트보다, 의도별로 전문화된 체인으로 분기하면 정확도·유지보수성이 좋아진다."},{title:"@chain 데코레이터 — 여러 체인을 하나의 흐름으로 잇기",lang:"python",code:`from langchain_core.runnables import chain  # 함수를 체인(러너블)으로 바꾸는 데코레이터
from langchain_core.prompts import ChatPromptTemplate  # 프롬프트 양식
from langchain_core.output_parsers import StrOutputParser  # 문자열 파서
from langchain_anthropic import ChatAnthropic  # 클로드 모델

model = ChatAnthropic(model="claude-opus-4-8")  # 공용 모델 객체
# 1단계 체인: 주제를 한 문장으로 설명
explain = ChatPromptTemplate.from_template("{topic}를 한 문장으로 설명해줘") | model | StrOutputParser()
# 2단계 체인: 설명을 인스타 게시글로 변환
to_post = ChatPromptTemplate.from_template("다음 설명을 이모지 넣은 인스타 게시글로: {text}") | model | StrOutputParser()

# @chain을 붙이면 평범한 함수가 하나의 러너블이 된다
@chain
def explain_then_post(topic):              # 두 단계를 순서대로 잇는 사용자 정의 흐름
    step1 = explain.invoke({"topic": topic})   # 먼저 설명을 만들고
    return to_post.invoke({"text": step1})     # 그 결과를 다음 체인 입력으로 넘긴다

print(explain_then_post.invoke("양자역학"))  # 설명->게시글 두 단계가 한 번에 실행됨`,note:"@chain 데코레이터로 여러 체인 호출을 하나의 흐름으로 묶으면, 앞 체인 결과를 뒤 체인 입력으로 자연스럽게 연결할 수 있다. 파이프(|)로 표현하기 복잡한 다단계 로직에 유용하다."},{title:"FewShotPromptTemplate — 예시 몇 개로 답변 형식 고정",lang:"python",code:`from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate  # 퓨샷·기본 양식

# 1) 모델에게 보여줄 정답 예시 몇 개를 준비한다
examples = [
    {"q": "행복", "a": "행복 -> 기쁨, 만족, 웃음"},   # 예시1: 단어->키워드 3개
    {"q": "슬픔", "a": "슬픔 -> 눈물, 우울, 상실"},   # 예시2: 같은 형식
]
# 2) 예시 하나를 어떻게 보여줄지 양식을 정한다
example_prompt = PromptTemplate(
    input_variables=["q", "a"],            # 예시가 가진 변수
    template="Q: {q}\\nA: {a}",            # 한 예시의 표시 형태
)
# 3) 예시들 + 사용자 질문 자리를 합쳐 퓨샷 프롬프트를 만든다
few_shot = FewShotPromptTemplate(
    examples=examples,                     # 위에서 만든 예시 목록
    example_prompt=example_prompt,         # 예시 표시 양식
    suffix="Q: {word}\\nA:",              # 마지막에 붙는 사용자 입력 자리
    input_variables=["word"],              # 사용자가 채울 변수
)
# 완성된 프롬프트를 눈으로 확인한다(예시 2개 + 새 질문)
print(few_shot.format(word="분노"))         # 모델은 같은 형식으로 답하게 유도된다`,note:"원하는 답변 형식을 말로 길게 설명하는 대신 예시 몇 개를 보여주면, 모델이 그 형식을 그대로 따라 한다. 프롬프트로 표현하기 어려운 출력 스타일을 잡을 때 강력하다."},{title:"Partial Prompt — 공통 변수는 미리 채워 재사용",lang:"python",code:`from langchain_core.prompts import PromptTemplate  # 기본 프롬프트 양식

# 빈칸 두 개(task, text)를 가진 원본 양식을 만든다
template = PromptTemplate(
    input_variables=["task", "text"],      # 채워야 할 변수 두 개
    template="너는 도우미다.\\n작업: {task}\\n입력: {text}\\n답변:",  # 지시 양식
)
# partial: 변수 일부(task)를 미리 고정해 둔다
translate = template.partial(task="다음 문장을 영어로 번역")  # task가 이미 채워진 양식
summarize = template.partial(task="다음 문장을 한 줄로 요약")  # 같은 양식에 다른 작업 고정

# 이제 남은 변수(text)만 채우면 바로 완성된 프롬프트가 된다
print(translate.format(text="오늘 회의는 3시입니다."))  # 번역용 프롬프트 완성
print(summarize.format(text="오늘 회의는 3시입니다."))  # 요약용 프롬프트 완성`,note:"partial로 공통 부분(역할·작업)을 미리 채워 두면, 매번 바뀌는 값만 넣어 같은 양식을 여러 용도로 재사용할 수 있다."}],concepts:[{term:"메모리(Memory)",desc:"챗봇이 바로 앞에서 나눈 대화를 잊지 않고 기억해, 맥락을 이어 대화하게 해 주는 장치다."},{term:"도구(Tool)",desc:"LLM이 스스로 글로만 답하지 않고 계산기·검색·DB 조회 같은 실제 기능을 골라 쓰게 해 주는 외부 함수다."},{term:"임베딩(Embedding)",desc:"글의 의미를 숫자 목록(벡터)으로 바꿔, 뜻이 비슷한 글끼리 가까운 거리에 놓이게 하는 변환이다."},{term:"벡터스토어(Vector Store)",desc:"임베딩된 숫자 목록들을 저장하고, 비슷한 것끼리 빠르게 찾아 주는 의미 기반 검색 창고다."},{term:"리트리버(Retriever)",desc:"사용자 질문과 의미가 가장 가까운 문서 조각 몇 개를 벡터스토어에서 꺼내 오는 검색 담당 부품이다."},{term:"청킹(Chunking)",desc:"긴 문서를 통째로 넣으면 너무 크므로, 검색하기 좋은 적당한 크기의 조각으로 잘게 나누는 작업이다."},{term:"RAG",desc:"질문과 관련된 문서를 먼저 찾아(Retrieval) 그 내용을 근거로 답을 생성(Generation)하게 하는 방식이다."},{term:"bind_tools (Tool Binding)",desc:"모델에게 쓸 수 있는 도구 목록(이름·설명·인자 모양)을 알려 주어, 모델이 필요할 때 '이 도구를 이런 인자로 불러 달라'고 요청(tool_calls)하게 만드는 연결 작업이다. 실제 실행은 우리가 한다."},{term:"RunnableLambda",desc:"LLM이 아닌 평범한 파이썬 함수를 체인 중간에 부품처럼 끼워 넣게 해 주는 도구다(예: 검색된 문서 조각들을 한 문자열로 합치기)."},{term:"tool_calls",desc:"모델이 직접 계산·검색하지 않고 '어떤 도구를 어떤 인자로 부르고 싶다'고 적어 돌려주는 주문서로, 우리가 이를 보고 실제 함수를 실행한다."}],detail:{topics:[{h:"메모리의 종류와 선택",items:["전체 대화를 그대로 쌓는 버퍼 메모리","오래된 대화는 요약해 압축하는 요약 메모리","토큰 한도를 넘지 않게 최근 N개만 유지하는 윈도우 방식","세션 id로 사용자별 대화를 분리해 보관하는 패턴"]},{h:"도구(Tool) 활용 패턴",items:["@tool 데코레이터로 함수→도구 만들기","독스트링(설명)이 모델의 도구 선택 근거가 됨","bind_tools로 모델에 도구 묶기","계산·검색·DB조회·API호출 등 도구의 대표 용도"]},{h:"RAG 문서 QA 파이프라인",items:["로더로 문서 읽기 → 스플리터로 청킹","임베딩 모델로 벡터화 → 벡터스토어에 색인","리트리버로 top-k 검색 → 프롬프트에 근거 주입","'근거에 없으면 모른다'로 환각 줄이기"]},{h:"복합 체인과 대화 메모리",items:["RunnableParallel: 여러 작업을 병렬로 동시에","RunnableLambda: 체인 중간에 커스텀 함수 삽입","RunnableBranch: 조건에 따라 다른 체인으로 분기(if-else), 분기·조건 처리의 핵심","RunnableWithMessageHistory: 세션별 대화 히스토리 유지","bind_tools 결과를 이 부품들과 조합해 복합 체인 구성","이 분기를 LCEL(RunnableBranch)로만 표현하면 조건이 많아질수록 읽기 어려워지고, 이 한계가 Day3에서 LangGraph가 필요한 이유로 이어진다"]}],labs:[{title:"Lab 1. 기억하는 챗봇 만들기",steps:["RunnableWithMessageHistory와 ChatMessageHistory를 임포트한다.","session_id로 기록을 돌려주는 get_history 함수를 만든다.","모델에 이 기능을 입혀 chat 객체를 만든다.","같은 session_id로 '내 취미는 등산이야'를 보낸다.","이어서 '내 취미가 뭐였지?'를 물어 기억하는지 확인한다.","session_id를 다른 값으로 바꾸면 기억이 사라지는지 비교한다."]},{title:"Lab 2. 내 문서로 QA 체인 만들기",steps:["docs.txt에 회사 규정 같은 글 10줄 이상을 적는다.","TextLoader로 읽고 RecursiveCharacterTextSplitter로 자른다.","임베딩 모델로 Chroma 벡터스토어에 색인한다.","as_retriever로 리트리버를 만든다.","근거만 보고 답하라는 프롬프트로 체인을 조립한다.","문서 안 질문과 문서 밖 질문을 각각 던져 답을 비교한다."]},{title:"Lab 3. 댓글 한 방에 분석하고 부정 댓글만 따로 처리하기",steps:["댓글 문장 하나를 입력으로 두고 요약·감정·키워드 3개 체인을 RunnableParallel로 동시에 실행한다.","세 결과를 {요약, 감정, 키워드} JSON으로 합친다.","RunnableBranch로 감정이 negative일 때만 '사과+담당자 이관' 답변을, 그 외엔 '감사 답변'을 생성한다.","긍정 댓글 1개·부정 댓글 1개를 넣어 분기가 실제로 갈리는지 확인한다."]},{title:"Lab. bind_tools로 모델에 계산기 손발 달기",steps:["langchain_core.tools의 @tool 데코레이터로 multiply(a: int, b: int) 함수를 만들고, 독스트링에 '두 정수를 곱한다'라고 또렷이 적는다(이 설명이 모델의 선택 근거가 된다).","ChatAnthropic(model='claude-opus-4-8').bind_tools([multiply]) 로 모델에 도구를 묶는다.","model.invoke('1234 곱하기 5678은 얼마야?') 를 실행하고 결과의 .tool_calls 를 출력한다.","모델이 직접 답을 지어내지 않고 {'name':'multiply','args':{'a':1234,'b':5678}} 형태의 '주문서'만 돌려주는지 확인한다.","그 주문서의 args를 꺼내 실제 multiply(**args)를 파이썬으로 호출해 정답 7006652를 구한다(판단은 모델, 실행은 나).","마지막으로 '안녕, 반가워' 같은 인사말을 보내면 tool_calls가 비어 있는지 비교해, 모델이 '필요할 때만' 도구를 부른다는 것을 눈으로 확인한다."]}],homework:["Lab 2의 QA 챗봇에 메모리(Lab 1)를 결합해, '아까 물어본 거 다시 설명해줘' 같은 후속 질문에도 답하는 버전을 만들고 대화 로그를 제출한다.","@tool로 '오늘 날짜를 돌려주는 도구'를 직접 만들어 모델에 연결하고, 모델이 그 도구를 호출하는 tool_calls 출력을 캡처해 제출한다.","실제 리뷰 5개를 넣어 감정별로 다른 답변이 나오는 로그를 캡처해 제출한다."]},theory:{theory:[{h:"메모리 - 챗봇에게 단기 기억을 달아 주기",body:`기본 LLM 호출은 매번 처음 만난 사람처럼 군다.
방금 내가 한 말을 전혀 기억하지 못한다.
그래서 '내 이름은 길동이야'라고 말한 뒤 '내 이름이 뭐였지?'라고 물으면 모른다고 답한다.

메모리는 지난 대화를 차곡차곡 적어 두는 수첩이다.
새 질문을 보낼 때 이 수첩을 함께 들려보내면, 모델이 맥락을 이어 자연스럽게 대화한다.
즉 모델 자체가 기억하는 게 아니라, 우리가 과거 대화를 매번 같이 넣어 주는 것이다.`},{h:"도구(Tool) - LLM에게 손발을 달아 주기",body:`LLM은 글은 잘 쓰지만 정확한 계산이나 최신 정보 검색은 약하다.
예를 들어 '1234 곱하기 5678'을 머릿속으로 풀라고 하면 틀리기 쉽다.

도구는 모델이 직접 쓸 수 있는 작은 기능 버튼이다.
계산기 도구를 쥐여 주면, 모델은 '이건 내가 계산기를 써야겠다'고 판단해 그 버튼을 누른다.
사람이 암산 대신 계산기를 꺼내 쓰는 것과 똑같다.
이렇게 하면 모델의 약점을 도구가 채워 준다.`},{h:"문서 QA(RAG) - 내 자료를 근거로 답하게 하기",body:`LLM은 학습한 적 없는 우리 회사 내부 문서는 알지 못한다.
그냥 물어보면 그럴듯하게 지어내는 환각이 생긴다.

RAG는 이 문제를 도서관 사서처럼 푼다.
먼저 질문과 관련된 문서 조각을 서가에서 찾아오고(검색), 그 조각만 책상에 펼쳐 놓은 뒤 그것을 근거로 답을 쓴다(생성).
그래서 모델은 자기 기억이 아니라 '찾아온 근거'로 답하게 되고, 출처가 분명해지며 환각이 크게 줄어든다.`},{h:"Tool Binding 원리 - 모델은 어떻게 '도구를 쓸지' 스스로 정하나",body:`어제까지 모델은 오직 글만 뱉었다. 그런데 도구를 쓰려면 모델이 '지금은 계산기를 써야겠다'고 판단하고, '어떤 인자로 부를지'까지 정해야 한다. 이 다리를 놓아 주는 것이 bind_tools다.

동작을 네 박자로 보면 이렇다.
첫째, 우리가 model.bind_tools([add])라고 묶으면 LangChain은 도구의 이름·설명(독스트링)·인자 모양(스키마)을 정리해 모델에게 '너는 이런 도구들을 쓸 수 있어'라고 함께 알려 준다.
둘째, 사용자가 "12345 더하기 6789는?"이라고 물으면 모델은 답을 지어내는 대신 '이건 add 도구감이다'라고 판단한다. 이 판단의 근거가 바로 도구에 적어 둔 설명(독스트링)이라, 설명을 성의 있게 쓰는 것이 곧 정확도다.
셋째, 모델은 실제로 계산하지 않는다. 대신 응답에 tool_calls라는 형태로 '나는 add를 a=12345, b=6789로 부르고 싶다'는 주문서만 담아 돌려준다.
넷째, 그 주문서를 받아 실제로 파이썬 함수를 실행하고 결과를 다시 모델에게 돌려주는 것은 우리(또는 에이전트)다.

여기서 꼭 기억할 오해 방지 포인트: bind_tools를 했다고 도구가 자동으로 실행되는 게 아니다. 모델은 '무엇을 어떤 인자로 부를지'만 정하고, 실행과 결과 반영은 바깥에서 이뤄진다. 이 '판단은 모델, 실행은 우리'라는 분업이 내일 배울 에이전트(스스로 도구를 고르고 반복 호출)의 씨앗이 된다.`},{h:"복합 체인 - 병렬(Parallel)·삽입(Lambda)·분기(Branch)로 흐름을 짠다",body:`어제 만든 '프롬프트 | 모델 | 파서'는 한 줄로 곧게 흐르는 직선 체인이었다. 하지만 실제 서비스는 '동시에 여러 가지를 하고', '중간에 우리 코드를 끼우고', '상황에 따라 길을 가르는' 일이 흔하다. 이를 위해 세 가지 Runnable 부품을 익힌다.

RunnableParallel은 하나의 입력을 여러 체인에 동시에 흘려보내고 결과를 딕셔너리로 한 번에 모은다. 예컨대 댓글 하나를 넣으면 요약·감정·키워드 세 체인이 동시에 돌아 {summary, sentiment, keywords}로 돌아온다 — 순차로 세 번 부르는 것보다 빠르고 코드도 깔끔하다.
RunnableLambda는 체인 중간에 '평범한 파이썬 함수'를 부품처럼 끼워 넣는다. 검색된 문서 조각들을 한 문자열로 합치거나, 모델 답을 후처리하는 등 LLM이 아닌 우리 로직을 흐름에 자연스럽게 삽입할 때 쓴다.
RunnableBranch는 조건을 검사해 서로 다른 체인으로 길을 가르는 if-else다. 감정이 'negative'면 사과+담당자 이관 체인으로, 아니면 감사 답변 체인으로 보내는 식이다.

마지막으로 복선을 하나 깔아 두자. 분기가 두세 개면 RunnableBranch로 충분하지만, 조건이 많아지고 '이 길로 갔다가 다시 앞 단계로 되돌아오는' 루프까지 필요해지면 Branch만으로는 코드가 금세 읽기 어려워진다.
바로 이 한계 지점이 내일 배울 LangGraph(흐름을 그래프로 그려 상태와 반복을 다루는 도구)가 필요해지는 이유다. 오늘은 'LCEL로 어디까지 되고, 어디서 버거워지는지'의 감을 잡아 두면 된다.`}]},realCodes:[{title:"문서 적재 → 청킹 → 임베딩 → 검색 → 답변까지 RAG 문서 QA 체인",lang:"python",code:`# 텍스트 파일을 읽어 들이는 로더를 가져온다
from langchain_community.document_loaders import TextLoader
# 긴 문서를 작은 조각으로 자르는 분할기를 가져온다
from langchain_text_splitters import RecursiveCharacterTextSplitter
# 문서 조각을 저장·검색하는 벡터스토어(Chroma)를 가져온다
from langchain_chroma import Chroma
# 글을 숫자 벡터로 바꾸는 임베딩 모델을 가져온다
from langchain_huggingface import HuggingFaceEmbeddings
# 답을 생성할 채팅 모델을 가져온다
from langchain_anthropic import ChatAnthropic
# 프롬프트 양식 도구를 가져온다
from langchain_core.prompts import ChatPromptTemplate
# 모델 답에서 글자만 뽑는 파서를 가져온다
from langchain_core.output_parsers import StrOutputParser
# 검색 결과를 프롬프트의 빈칸으로 그대로 흘려보내는 도우미를 가져온다
from langchain_core.runnables import RunnablePassthrough

# docs.txt 파일을 읽어 문서 객체 리스트로 불러온다
docs = TextLoader("docs.txt", encoding="utf-8").load()
# 문서를 500자 단위로, 50자씩 겹치게 잘라 검색하기 좋은 조각으로 만든다
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
# 실제로 자르기를 실행해 조각 리스트를 얻는다
chunks = splitter.split_documents(docs)
# 한국어도 잘 처리하는 무료 임베딩 모델을 준비한다
embedding = HuggingFaceEmbeddings(model_name="jhgan/ko-sbert-nli")
# 조각들을 임베딩해 Chroma 벡터스토어에 저장(색인)한다
vectorstore = Chroma.from_documents(chunks, embedding)
# 질문과 비슷한 조각 3개를 찾아 주는 리트리버로 변환한다
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# 찾아온 근거(context)만 보고 답하라고 지시하는 프롬프트를 만든다
prompt = ChatPromptTemplate.from_template(
    "아래 근거만 사용해 질문에 답해. 근거에 없으면 '모릅니다'라고 해.\\n\\n근거:\\n{context}\\n\\n질문: {question}")
# 답을 생성할 모델을 준비한다(opus-4-8은 temperature 설정이 필요 없다)
model = ChatAnthropic(model="claude-opus-4-8")

# 리트리버가 찾은 문서 조각들을 하나의 긴 문자열로 합치는 함수를 정의한다
def join_docs(found):  # found: 검색된 문서 객체 리스트
    return "\\n\\n".join(d.page_content for d in found)  # 각 조각의 본문을 줄바꿈으로 이어 붙인다

# context는 리트리버→합치기로, question은 입력을 그대로 흘려 체인을 조립한다
chain = (
    {"context": retriever | join_docs, "question": RunnablePassthrough()}  # 두 빈칸을 동시에 채운다
    | prompt  # 채워진 값으로 프롬프트 완성
    | model   # 모델이 답 생성
    | StrOutputParser()  # 답에서 글자만 추출
)

# 실제 질문을 넣어 체인을 실행한다(질문이 question 빈칸으로 들어간다)
answer = chain.invoke("환불은 며칠 안에 가능한가요?")
# 문서 근거에 기반한 답을 출력한다. 결과 예: '구매 후 7일 이내에 환불 가능합니다.'
print(answer)`,note:`문서를 읽고-자르고-임베딩-검색-생성까지 한 파일로 도는 완결형 RAG 챗봇이다.
docs.txt만 바꾸면 어떤 문서로든 질의응답이 된다.`},{title:"실전: Retriever 도구 + 에이전트",lang:"python",code:`from langchain.tools.retriever import create_retriever_tool
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
# 일상 인사엔 검색을 건너뛰고, 정책 질문엔 search_manual을 호출`,note:'RAG를 항상 돌리는 대신 검색을 "도구"로 만들면 에이전트가 필요할 때만 호출한다. 도구 description이 호출 판단의 근거.'}],periods:["복습: 어제의 체인에 '기억'과 '도구'를 더하면? (오늘의 그림)","[실습] 대화 메모리 - 앞말을 기억하는 챗봇 만들기","Tool Binding: bind_tools() 동작 원리와 도구 호출 결정","[실습] bind_tools로 Tool 연결 + RunnableParallel/Lambda 복합 체인","문서 QA 큰그림: 임베딩·벡터스토어·리트리버","[실습] PDF/텍스트 읽어 벡터스토어에 넣기","[실습] 리트리버 결합 문서 QA 체인 완성","마무리: 메모리+도구+문서QA를 합친 챗봇 정리 + Q&A"]},"langchain-3":{plan:{schedule:[{time:"09:00–09:50",topic:"복습: 동작하는 챗봇을 '서비스'로 만들려면 무엇이 더 필요한가"},{time:"10:00–10:50",topic:"[실습] 스트리밍 응답 - 글자가 흐르듯 나오게 하기"},{time:"11:00–11:50",topic:"LangChain vs LangGraph 경계와 Runnable 통일성"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"[실습] LangSmith로 체인 추적·디버깅하기"},{time:"14:00–14:50",topic:"비용·캐싱·에러 처리: 실서비스에서 꼭 챙길 것들"},{time:"15:00–15:50",topic:"[실습] 캐싱·재시도·예외 처리 붙이기"},{time:"16:00–16:50",topic:"[실습] FastAPI로 챗봇을 웹 API로 배포하기"},{time:"17:00–17:50",topic:"마무리: 3일간 부품을 합친 미니 생성형 AI 서비스 + 발표"}],practice:{title:"스트리밍 + 캐싱 + 예외처리를 갖춘 챗봇을 FastAPI 웹 서비스로 배포",steps:["'pip install fastapi uvicorn langchain-anthropic' 로 웹 서버와 모델 패키지를 설치한다.","app.py를 만들고 FastAPI() 인스턴스와 ChatAnthropic 모델, 프롬프트|모델 체인을 준비한다.","set_llm_cache(InMemoryCache())로 같은 질문은 다시 모델을 부르지 않게 캐싱을 켠다.","@app.post('/chat') 경로를 만들고, 요청 본문에서 질문(message)을 꺼낸다.","try/except로 모델 호출을 감싸 오류가 나면 친절한 에러 메시지를 돌려주게 한다.","StreamingResponse와 chain.stream을 이용해 답을 글자 단위로 흘려보내는 /stream 경로를 추가한다.","'uvicorn app:app --reload' 명령으로 서버를 실행한다.","브라우저에서 http://localhost:8000/docs 를 열어 /chat에 질문을 넣고 Execute로 답을 받는다(기대 결과: JSON 답변).","같은 질문을 두 번 보내, 두 번째가 캐시 덕분에 즉시 응답하는지 응답 시간을 비교한다.","/stream 경로를 호출해 답이 한꺼번에가 아니라 조금씩 흘러나오는지 확인한다."],deliverable:"스트리밍·캐싱·예외처리가 들어간 app.py와, /docs에서 호출한 결과 및 두 번째 호출이 빨라진 응답 시간 캡처"}},examples:[{title:"체인 결과를 스트리밍으로 받아 출력",lang:"python",code:`# 프롬프트·모델·파서를 가져온다
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_anthropic import ChatAnthropic
# 짧은 글짓기를 시키는 프롬프트를 만든다
prompt = ChatPromptTemplate.from_template("{topic}에 대한 짧은 시를 써줘")
# 프롬프트→모델→파서로 체인을 조립한다
chain = prompt | ChatAnthropic(model="claude-opus-4-8") | StrOutputParser()
# invoke 대신 stream을 쓰면 답이 조각으로 나뉘어 들어온다
for chunk in chain.stream({"topic": "봄비"}):  # 조각을 순서대로 하나씩 받는다
    print(chunk, end="", flush=True)            # 줄바꿈 없이 즉시 화면에 이어 출력
# 결과: 시가 한 글자씩 또르르 흘러나오며 출력된다`,note:"invoke를 stream으로 바꾸기만 하면 같은 체인이 글자를 흘려보내는 스트리밍이 된다."},{title:"캐싱으로 같은 질문 빠르게 답하기",lang:"python",code:`# 시간 측정을 위해 time 모듈을 가져온다
import time
# 캐시 설정 함수와 메모리 캐시를 가져온다
from langchain_core.globals import set_llm_cache
from langchain_community.cache import InMemoryCache
# 모델을 가져온다
from langchain_anthropic import ChatAnthropic
# 메모리 캐시를 켠다(같은 입력은 저장된 답을 재사용)
set_llm_cache(InMemoryCache())
# 모델 객체를 만든다
model = ChatAnthropic(model="claude-opus-4-8")
# 첫 호출 시각을 기록하고 모델을 부른다(실제로 모델이 일한다)
t1 = time.time(); model.invoke("하늘은 왜 파랄까?")
# 첫 호출에 걸린 시간을 출력한다(예: 1.8초)
print("1차:", round(time.time() - t1, 2), "초")
# 같은 질문을 다시 부른다(이번엔 캐시에서 즉시 가져온다)
t2 = time.time(); model.invoke("하늘은 왜 파랄까?")
# 두 번째는 거의 0초임을 출력해 캐시 효과를 확인한다
print("2차:", round(time.time() - t2, 2), "초")  # 결과 예: 2차: 0.0 초`,note:"두 번째 호출이 사실상 0초인 것은 모델을 다시 부르지 않고 캐시에서 답을 꺼냈기 때문이다."},{title:"스스로 도구를 골라 쓰는 ReAct 에이전트 맛보기",lang:"python",code:`from datetime import datetime
from langchain_core.tools import tool
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate
from langchain_anthropic import ChatAnthropic

# 1) 도구 2개를 정의한다
@tool
def add(a: int, b: int) -> int:
    """두 정수를 더한다."""
    return a + b

@tool
def get_time() -> str:
    """지금 시각을 문자열로 알려준다."""
    return datetime.now().strftime('%H:%M')

# 2) 프롬프트와 모델로 에이전트를 구성한다
prompt = ChatPromptTemplate.from_messages([
    ('system', '너는 도구를 활용하는 비서다.'),
    ('human', '{input}'),
    ('placeholder', '{agent_scratchpad}'),  # 생각·도구호출 기록이 쌓이는 자리
])
model = ChatAnthropic(model='claude-opus-4-8')
agent = create_tool_calling_agent(model, [add, get_time], prompt)
executor = AgentExecutor(agent=agent, tools=[add, get_time], verbose=True)  # 과정 관찰

# 3) 실행하면 생각->도구호출->관찰을 반복해 최종 답을 낸다
print(executor.invoke({'input': '지금 몇 시야? 그리고 12+30은?'})['output'])
`,note:"체인은 흐름이 고정이지만 에이전트는 상황을 보고 어떤 도구를 몇 번 쓸지 스스로 정한다. 이 자유도가 커지면 LangGraph로 흐름을 통제한다."},{title:"with_retry + try/except로 '안 죽는' 호출 만들기",lang:"python",code:`# 프롬프트·모델·파서 부품을 가져온다
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_anthropic import ChatAnthropic

prompt = ChatPromptTemplate.from_template("한 문장으로 답해줘: {q}")
# with_retry: 네트워크 혼잡 등 '일시적' 실패면 최대 3번까지 알아서 다시 시도한다
model = ChatAnthropic(model="claude-opus-4-8").with_retry(stop_after_attempt=3)
# 재시도가 붙은 모델로 평소처럼 체인을 조립한다
chain = prompt | model | StrOutputParser()

# 체인 호출을 보호막(try/except)으로 감싸는 함수를 만든다
def ask(q):
    try:                                    # 정상 경로: 성공하면 답을 돌려준다
        return chain.invoke({"q": q})
    except Exception as e:                  # 재시도까지 모두 실패하면 여기로 온다
        return f"잠시 후 다시 시도해 주세요."  # 빨간 에러 대신 사용자에게 친절한 대체 답

# 정상 질문은 그대로 답하고, 장애 상황에서도 서비스가 멈추지 않는다
print(ask("하늘은 왜 파랄까?"))`,note:"with_retry는 '잠깐 삐끗한 실패'를 자동으로 넘겨 주고, try/except는 '끝내 실패'를 붙잡아 친절한 메시지로 바꾼다. 이 둘을 겹쳐야 실서비스가 한 번의 오류로 통째로 죽는 사고를 막을 수 있다."},{title:"LangSmith 추적(관측성)",lang:"bash",code:`# 환경변수만 설정하면 모든 체인 호출이 자동 추적된다
export LANGCHAIN_TRACING_V2=true
export LANGCHAIN_API_KEY=ls__xxxxx
export LANGCHAIN_PROJECT=skala-demo
# 이후 대시보드에서 토큰/지연/프롬프트/오류를 단계별로 확인`,note:"관측성이 없으면 LLM 앱은 블랙박스다. 프롬프트·지연·비용을 추적해야 개선이 가능하다."},{title:"LangGraph 첫걸음 — State·Node·Edge로 그래프 만들기",lang:"python",code:`from typing import TypedDict            # 상태의 모양을 정의하는 타입
from langgraph.graph import StateGraph, END  # 그래프 뼈대와 종료 표시

# 1) State: 그래프 전체가 공유하는 데이터 상자(질문과 답을 담는다)
class GraphState(TypedDict):
    query: str                             # 사용자 질문
    answer: str                            # 만들어질 답

# 2) Node: 한 단계 작업을 하는 함수(상태를 받아 일부를 채워 돌려준다)
def process(state: GraphState):
    q = state["query"]                     # 상태에서 질문을 꺼내
    return {"answer": f"'{q}'에 대한 답입니다."}  # answer 필드를 채워 반환

# 3) 그래프를 조립한다
builder = StateGraph(GraphState)           # 상태 형태로 그래프 생성
builder.add_node("process", process)       # process 노드 등록
builder.set_entry_point("process")         # 시작점 지정
builder.add_edge("process", END)           # process 후 종료로 연결
app = builder.compile()                    # 실행 가능한 앱으로 컴파일

# 4) 실행: 초기 상태를 넣으면 노드를 거쳐 최종 상태가 나온다
print(app.invoke({"query": "LangGraph가 뭐야?"})["answer"])  # 답 출력`,note:"LangChain 체인이 직선 흐름이라면, LangGraph는 State(상태)를 Node들이 이어받아 갱신하는 구조다. 이 상태 공유가 이후 분기·반복의 토대가 된다."},{title:"조건 분기(Conditional Edge) — 질문 유형별로 노드 라우팅",lang:"python",code:`from typing import TypedDict            # 상태 타입
from langgraph.graph import StateGraph, END  # 그래프 뼈대

class GraphState(TypedDict):               # 공유 상태
    query: str                             # 질문
    intent: str                            # 분류 결과
    answer: str                            # 최종 답

def router(state: GraphState):             # 질문을 보고 갈 길을 정하는 노드
    q = state["query"]                     # 질문을 꺼내
    return {"intent": "policy" if "정책" in q else "general"}  # 키워드로 분류

def policy_node(state):                    # 정책 담당 노드
    return {"answer": "정책 관련 답변입니다."}
def general_node(state):                   # 일반 담당 노드
    return {"answer": "일반 답변입니다."}

builder = StateGraph(GraphState)           # 그래프 생성
builder.add_node("router", router)         # 분류 노드
builder.add_node("policy", policy_node)    # 정책 노드
builder.add_node("general", general_node)  # 일반 노드
builder.set_entry_point("router")          # 분류부터 시작
# intent 값에 따라 다음 노드를 고른다(조건 분기의 핵심)
builder.add_conditional_edges("router", lambda s: s["intent"],
    {"policy": "policy", "general": "general"})
builder.add_edge("policy", END)            # 정책 노드 후 종료
builder.add_edge("general", END)           # 일반 노드 후 종료
app = builder.compile()                    # 컴파일

print(app.invoke({"query": "회사 정책 알려줘"})["answer"])  # 정책 노드로 라우팅됨`,note:"add_conditional_edges가 상태 값에 따라 다른 노드로 흐름을 가른다. 질문 유형별(RAG/DB/일반 상담)로 처리를 나누는 라우팅이 LangGraph의 대표 패턴이다."},{title:"LangChain 체인 vs LangGraph — 언제 무엇을 쓰나",lang:"text",code:`# 같은 일도 흐름의 복잡도에 따라 도구를 다르게 고른다
[LangChain 체인만으로 충분]
  - 단계가 단순하고 거의 직선(순차) 흐름이다
  - 분기·반복·상태 공유가 거의 없다
  - 예: 프롬프트 -> 모델 -> 파서 로 끝나는 요약기·번역기
[LangGraph가 필요]
  - 질문 유형에 따라 경로가 갈린다(라우팅이 많다)
  - 검색->생성->근거부족시 재검색 같은 반복 루프가 있다
  - 도구를 여러 번 호출하거나 에이전트끼리 협업한다
  - 중간 상태를 저장했다가 중단/재개해야 한다
# 정리: '직선이면 체인, 갈래·되돌이가 있으면 그래프'`,note:"LangGraph가 항상 정답은 아니다. 단순 직선 흐름은 체인이 더 간단하고, 분기·재시도·상태관리가 필요할 때 그래프의 이점이 커진다."}],concepts:[{term:"스트리밍(Streaming)",desc:"완성된 답을 한 번에 주는 대신, 모델이 만드는 대로 글자를 조금씩 흘려보내 사용자가 기다리는 느낌을 줄이는 방식이다."},{term:"콜백(Callback)",desc:"체인이 실행되는 도중 특정 시점마다 자동으로 불려, 진행 상황을 엿보거나 기록하게 해 주는 끼어들기 함수다."},{term:"LangSmith",desc:"체인이 안에서 무엇을 했는지(어떤 프롬프트·답·시간·비용) 낱낱이 기록해 보여 주는 LangChain의 관측·디버깅 도구다."},{term:"캐싱(Caching)",desc:"똑같은 질문이 또 오면 모델을 다시 부르지 않고 저장해 둔 답을 바로 돌려줘, 비용과 시간을 아끼는 기법이다."},{term:"재시도(Retry)",desc:"네트워크 오류 등으로 호출이 실패했을 때, 곧바로 포기하지 않고 몇 번 더 자동으로 다시 시도하는 안전장치다."},{term:"FastAPI",desc:"파이썬으로 웹 API 서버를 아주 빠르고 간단하게 만들게 해 주는 인기 프레임워크다."},{term:"토큰(Token)",desc:"모델이 글을 처리하는 최소 단위로, 대략 단어 조각에 해당하며 이 개수에 비례해 비용이 매겨진다."},{term:"LangGraph",desc:"처리 단계를 점(Node), 이동 규칙을 선(Edge)으로 그려 분기·반복·상태 관리가 얽힌 복잡한 흐름을 다루는 도구다. LangChain이 '연결'이라면 LangGraph는 '그 연결의 흐름 제어'다."},{term:"ReAct 패턴",desc:"에이전트가 '생각(Reason)→도구 호출(Act)→결과 관찰(Observe)'을 답이 나올 때까지 반복하는 방식으로, 본질이 루프라 LangGraph로 자연스럽게 표현된다."},{term:"Runnable 통일성",desc:"프롬프트·모델·파서·리트리버는 물론 LangGraph의 Node까지 모두 Runnable이라, invoke/stream 같은 사용법이 어디서나 똑같아 서로 끼워 넣을 수 있다는 성질이다."}],detail:{topics:[{h:"스트리밍과 콜백",items:["invoke vs stream의 차이(완성형 vs 조각형)","콜백으로 토큰 단위·단계별 이벤트 받기","웹에서 StreamingResponse로 사용자에게 흘려보내기","스트리밍이 어울리는 화면(채팅 UI) 설계"]},{h:"관측·디버깅(LangSmith)",items:["환경변수로 LangSmith 추적 켜기","체인 실행 트레이스(입력·출력·시간) 보기","어느 단계가 느리고 비싼지 병목 찾기","프롬프트 버전 비교·평가"]},{h:"실서비스 안정화",items:["캐싱으로 비용·지연 절감","with_retry로 일시 오류 자동 재시도","try/except와 폴백 메시지로 장애 격리","FastAPI로 API화하고 환경변수로 키 관리"]},{h:"LangChain vs LangGraph, 언제 무엇을?",items:["LangChain = 연결(Chain): 직선 흐름·간단한 조합에 적합","LangGraph = 상태·흐름 제어(Graph): 반복·분기·루프에 적합","Runnable 통일성: Node가 Runnable을 감싸 invoke/stream 동일","판단: 분기·재시도·루프가 필요하면 그래프가 더 적합"]}],labs:[{title:"Lab 1. 스트리밍 체험하기",steps:["프롬프트|모델|파서로 시 쓰기 체인을 만든다.","먼저 chain.invoke로 한 번에 결과를 받아 본다.","이번엔 chain.stream으로 바꿔 for문으로 조각을 받는다.","print(chunk, end='')로 이어서 출력한다.","글자가 흘러나오는 느낌의 차이를 invoke와 비교한다.","topic을 바꿔 다시 스트리밍해 본다."]},{title:"Lab 2. FastAPI로 챗봇 배포하기",steps:["app.py에 FastAPI 앱과 체인을 만든다.","@app.post('/chat')로 질문을 받아 답을 돌려주는 함수를 만든다.","try/except로 오류를 감싸 친절한 메시지를 준비한다.","set_llm_cache(InMemoryCache())로 캐시를 켠다.","'uvicorn app:app --reload'로 서버를 띄운다.","/docs에서 질문을 넣어 답을 받고, 같은 질문 두 번으로 캐시 효과를 확인한다."]},{title:"Lab. LangSmith로 체인 속 들여다보기",steps:["smith.langchain.com에 가입해 API 키를 발급받는다.","터미널에 환경변수 세 줄을 등록한다: export LANGCHAIN_TRACING_V2=true / export LANGCHAIN_API_KEY=... / export LANGCHAIN_PROJECT=skala-langchain.","코드는 한 줄도 고치지 않고, 1일차에 만든 요약·번역 체인을 서로 다른 입력으로 3번 invoke한다(환경변수만으로 추적이 자동으로 켜진다).","LangSmith 대시보드의 skala-langchain 프로젝트에 실행 기록(트레이스)이 쌓이는지 확인한다.","트레이스 하나를 열어 '프롬프트에 실제로 들어간 입력 → 모델이 준 답 → 각 단계 소요 시간 → 사용한 토큰 수'가 단계별로 보이는지 확인한다.","세 번 실행 중 가장 오래 걸린 단계와 토큰을 가장 많이 쓴 단계를 찾아 한 줄로 적는다(어디를 최적화해야 할지 근거가 된다)."]},{title:"Lab. 캐싱·재시도·예외처리 붙여 서비스처럼 만들기",steps:["set_llm_cache(InMemoryCache())로 캐시를 켠다.","똑같은 질문을 두 번 invoke하고 time으로 1차·2차 응답 시간을 재, 2차가 사실상 0초(캐시에서 꺼냄)인지 확인한다.","모델에 .with_retry(stop_after_attempt=3)를 붙여 일시적 오류에 자동 재시도가 되게 만든다.","체인 호출을 try/except로 감싸, 실패하면 '잠시 후 다시 시도해 주세요'를 돌려주게 한다.","일부러 잘못된 API 키(예: 끝 글자 하나 바꾸기)로 실행해, 프로그램이 빨간 에러로 죽는 대신 친절한 대체 메시지가 나오는지 확인한다.","다시 올바른 키로 되돌려 정상 동작을 확인하고, '캐싱=비용/속도, 재시도+예외=안정성'이라는 역할 구분을 한 줄로 정리한다."]}],homework:["3일간 배운 메모리·문서QA·스트리밍·캐싱·예외처리를 합쳐, /chat과 /stream을 모두 가진 '내 문서 기반 챗봇 API' 한 개를 완성해 코드와 /docs 실행 화면을 제출한다.","LangSmith 추적을 켠 뒤 체인을 3회 실행하고, 각 실행의 소요 시간·토큰 사용량을 표로 정리해 어디가 가장 비싼 단계였는지 한 단락으로 분석해 제출한다."]},theory:{theory:[{h:"스트리밍 - 기다림의 체감을 줄이는 마법",body:`긴 답을 만드는 데는 몇 초가 걸린다.
그 시간 동안 화면이 멈춰 있으면 사용자는 답답해한다.

스트리밍은 답이 완성되기를 기다리지 않고, 모델이 만드는 즉시 글자를 조금씩 화면에 흘려보낸다.
식당에서 코스 요리를 한 접시씩 내오는 것과 같다.
전체가 끝나길 기다리지 않고 먼저 나온 것부터 즐길 수 있어, 같은 시간이라도 훨씬 빠르게 느껴진다.
ChatGPT에서 글자가 또르르 나오는 그 효과가 바로 스트리밍이다.`},{h:"관측과 디버깅 - 체인 속을 들여다보기",body:`체인이 길어지면 어디서 문제가 생겼는지 알기 어렵다.
프롬프트가 이상했는지, 검색이 엉뚱한 걸 찾았는지, 모델이 헛소리를 했는지 눈에 보이지 않는다.

콜백과 LangSmith는 체인에 CCTV를 다는 일이다.
각 부품이 무엇을 받고 무엇을 내보냈는지, 시간과 비용은 얼마였는지 단계별로 기록한다.
문제가 나면 녹화된 화면을 되돌려 보듯 원인 지점을 정확히 짚을 수 있다.`},{h:"실서비스의 현실 - 비용·캐싱·에러",body:`장난감 챗봇과 진짜 서비스의 차이는 바로 이 세 가지에서 갈린다.
첫째 비용은, 호출할 때마다 토큰만큼 돈이 나가므로 같은 질문은 캐싱으로 아껴야 한다.
둘째 안정성은, 네트워크는 언제든 끊기므로 재시도와 예외 처리로 서비스가 죽지 않게 막아야 한다.
셋째 사용자 경험은, 오류가 나도 빨간 에러 대신 '잠시 후 다시 시도해 주세요' 같은 친절한 메시지로 받아 줘야 한다.

이 세 가지를 챙기면 비로소 남에게 보여 줄 수 있는 서비스가 된다.`},{h:"LangChain vs LangGraph - 연결이냐, 흐름 제어냐",body:`지금까지 우리가 만든 것은 전부 Chain, 즉 부품을 파이프로 이어 '입력이 한 방향으로 흘러 결과가 나오는' 직선 파이프라인이었다. LangChain은 이 연결에 강하다.
그런데 실제 AI 서비스는 종종 '답이 부실하면 다시 검색해서 재시도', '도구를 쓴 뒤 그 결과를 보고 또 판단', '조건에 따라 여러 갈래를 왔다 갔다' 하는 흐름이 필요하다. 이렇게 상태를 기억하며 분기·반복·되돌아오기가 얽히면 직선 체인은 버거워진다. 여기서 등장하는 것이 LangGraph다.
LangGraph는 처리 단계를 Node(점)로, 이동 규칙을 Edge(선)로 그려 흐름을 '그래프'로 표현한다. 한마디로 LangChain은 연결(Chain), LangGraph는 그 연결의 상태와 흐름을 제어(Graph)한다.

둘이 매끄럽게 이어지는 비결은 Runnable이라는 공통 규격이다. LangGraph의 Node도 사실은 Runnable을 감싼 것이라, invoke/stream 같은 사용법이 양쪽에서 똑같다. 그래서 어제 만든 체인을 그대로 한 Node로 넣을 수 있고, 배운 것이 버려지지 않는다.
어제 살짝 언급한 RunnableBranch의 한계를 떠올려 보자. 분기가 두어 개면 괜찮지만 조건이 많아지고 루프가 생기면 코드가 읽기 어려워진다 — 바로 그 지점이 '그래프가 더 적합한' 신호다.
에이전트의 대표 동작인 ReAct 패턴(생각→도구 호출→관찰을 답이 나올 때까지 반복)도 본질이 '루프'라, LangGraph로 자연스럽게 표현된다.
판단 기준은 간단하다: 흐름이 곧고 조합이 단순하면 Chain으로 충분하고, 분기·재시도·루프·상태 관리가 필요하면 Graph로 올라간다. 오늘은 '언제 선을 넘어야 하는지'를 아는 것이 목표다.`},{h:"StateGraph의 세 조각 — State·Node·Edge를 손으로 짜기",body:`LangGraph로 흐름을 그리는 일은 딱 세 부품을 조립하는 것이다. 이 셋만 잡으면 나머지는 응용이다.
첫째 State(상태)는 '모든 단계가 함께 보고 함께 고치는 공유 메모장'이다. 파이썬에서는 보통 TypedDict로 어떤 칸이 있는지 정의한다 — 예: {"question": 질문, "docs": 검색결과, "answer": 최종답}. Chain은 값이 한 방향으로 흘러 지나가면 끝이었지만, Graph는 이 메모장을 여러 단계가 돌아가며 채운다. 그래서 '지금까지 뭘 했는지'를 기억할 수 있고, 이것이 분기·반복이 가능한 근본 이유다.
둘째 Node(노드)는 '메모장을 받아 일부 칸을 채워 돌려주는 함수 하나'다. 예를 들어 retrieve 노드는 state의 question을 읽어 문서를 찾아 docs 칸을 채우고, generate 노드는 question과 docs를 읽어 answer 칸을 채운다. 노드는 그냥 '상태를 입력받아 갱신된 상태를 반환하는 파이썬 함수'라고 생각하면 편하다. 어제 만든 체인을 통째로 한 노드 안에 넣어도 된다.
셋째 Edge(엣지)는 '이 노드 다음엔 저 노드로 가라'는 연결선이다. graph.add_edge("retrieve", "generate")처럼 순서를 잇는다. 특별한 두 지점이 있는데, START는 그래프가 시작하는 입구, END는 흐름이 끝나는 출구다. START→retrieve→generate→END처럼 이으면 하나의 완결된 흐름이 된다.
마지막으로 graph.compile()을 부르면 이 설계도가 실행 가능한 객체가 되고, 놀랍게도 invoke·stream을 그대로 쓸 수 있다 — 앞에서 배운 Runnable 규격 덕분이다. 정리하면: 무엇을 기억할지(State), 무슨 일을 할지(Node), 어디로 갈지(Edge). 이 셋이 LangGraph의 문법 전부다.`},{h:"조건부 엣지로 갈림길과 루프 만들기",body:`앞의 add_edge는 '무조건 다음은 여기'라는 고정된 화살표였다. 하지만 진짜 필요한 건 '상황을 보고 길을 고르는' 갈림길이다. 그게 조건부 엣지(add_conditional_edges)다.
원리는 이렇다. 갈림길에 '판단 함수' 하나를 세운다. 이 함수는 현재 State를 들여다보고 다음에 갈 곳의 이름을 문자열로 돌려준다. 예를 들어 grade 노드가 검색 결과의 품질을 평가해 state에 적어 두면, 판단 함수가 그 값을 보고 '충분함'이면 "generate"를, '부실함'이면 "retrieve"(다시 검색)를 반환한다. LangGraph는 그 이름에 맞는 노드로 흐름을 보낸다. 어제 배운 RunnableBranch가 몇 갈래에서 가독성이 무너졌던 바로 그 지점을, 이 방식이 깔끔하게 대신한다.
여기서 '루프'가 자연스럽게 나온다. 판단 결과가 다시 앞 노드를 가리키면, 흐름이 되돌아가 같은 단계를 반복한다. '답이 부실하면 다시 검색해서 재시도'가 바로 이 형태다. 다만 무한 반복을 막으려고 보통 state에 시도 횟수를 세는 칸을 두고, 몇 번을 넘으면 END로 빠지게 한다.
이 조건분기+루프가 왜 결정적인가. 에이전트의 대표 동작인 ReAct 패턴 — '생각하고 → 도구를 쓰고 → 결과를 관찰하고, 답이 될 때까지 이 과정을 반복' — 이 본질적으로 루프이기 때문이다. 직선 체인으로는 '몇 번 반복할지 미리 알 수 없는' 이 흐름을 표현할 수 없지만, StateGraph는 조건부 엣지 하나로 '답이 나올 때까지 도구 노드와 판단 노드 사이를 오가는' 구조를 그대로 그린다.
오늘의 결론: 고정된 순서는 add_edge, 상황에 따라 갈리거나 되돌아오는 흐름은 add_conditional_edges. 이 둘의 조합이 곧 '스스로 판단하는 에이전트'의 뼈대다.`}]},realCodes:[{title:"스트리밍·캐싱·예외처리를 갖춘 챗봇 FastAPI 웹 서비스",lang:"python",code:`# 웹 API 서버를 만드는 FastAPI를 가져온다
from fastapi import FastAPI
# 답을 글자 단위로 흘려보낼 스트리밍 응답 클래스를 가져온다
from fastapi.responses import StreamingResponse
# 요청 본문의 형태를 정의할 데이터 모델 도구를 가져온다
from pydantic import BaseModel
# 캐시를 켜는 설정 함수와 메모리 캐시 구현을 가져온다
from langchain_core.globals import set_llm_cache
from langchain_community.cache import InMemoryCache
# 프롬프트·모델·파서 부품을 가져온다
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_anthropic import ChatAnthropic

# 같은 질문은 모델을 다시 부르지 않도록 메모리 캐시를 켠다
set_llm_cache(InMemoryCache())
# 웹 서버 애플리케이션 객체를 만든다
app = FastAPI()
# 질문을 친절하게 답하라는 프롬프트를 만든다
prompt = ChatPromptTemplate.from_template("친절한 도우미로서 답해줘: {message}")
# 답을 생성할 모델을 준비한다
model = ChatAnthropic(model="claude-opus-4-8")
# 프롬프트→모델→문자열파서로 체인을 조립한다
chain = prompt | model | StrOutputParser()

# 요청 본문이 message 한 칸을 갖는다고 정의한다(자동 검증된다)
class Ask(BaseModel):
    message: str  # 사용자가 보낸 질문 문자열

# POST /chat 경로: 한 번에 완성된 답을 JSON으로 돌려준다
@app.post("/chat")
def chat(req: Ask):
    try:                                  # 모델 호출을 보호막으로 감싼다
        answer = chain.invoke({"message": req.message})  # 체인을 실행해 답을 받는다
        return {"answer": answer}         # 성공하면 답을 JSON으로 돌려준다
    except Exception as e:                # 어떤 오류든 잡아서
        return {"answer": "잠시 후 다시 시도해 주세요.", "error": str(e)}  # 친절한 메시지로 대체

# POST /stream 경로: 답을 글자 단위로 흘려보낸다
@app.post("/stream")
def stream(req: Ask):
    def gen():                            # 조각을 하나씩 내보내는 생성기 함수
        for piece in chain.stream({"message": req.message}):  # 체인이 만드는 조각을 순서대로 받아
            yield piece                   # 받은 즉시 클라이언트로 흘려보낸다
    return StreamingResponse(gen(), media_type="text/plain")  # 스트리밍 응답으로 감싸 반환`,note:`캐싱(set_llm_cache)·예외처리(try/except)·스트리밍(chain.stream)을 모두 갖춘 배포용 챗봇 서버다.
'uvicorn 파일명:app --reload'로 실행하면 /docs에서 바로 테스트할 수 있다.`}],periods:["복습: 동작하는 챗봇을 '서비스'로 만들려면 무엇이 더 필요한가","[실습] 스트리밍 응답 - 글자가 흐르듯 나오게 하기","LangChain vs LangGraph 경계와 Runnable 통일성","[실습] LangSmith로 체인 추적·디버깅하기","비용·캐싱·에러 처리: 실서비스에서 꼭 챙길 것들","[실습] 캐싱·재시도·예외 처리 붙이기","[실습] FastAPI로 챗봇을 웹 API로 배포하기","마무리: 3일간 부품을 합친 미니 생성형 AI 서비스 + 발표"]}};export{n as default};
