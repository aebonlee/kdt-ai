const e={"miniproject-1":{plan:{schedule:[{time:"09:00–09:50",topic:"[self-study] 전 과정 Wrap-up ① Prompt–Context–Harness Engineering 복습"},{time:"10:00–10:50",topic:"[self-study] 전 과정 Wrap-up ② RAG Pipeline & Evaluation 복습"},{time:"11:00–11:50",topic:"[self-study] 전 과정 Wrap-up ③ Supervisor Agent · 멀티에이전트 복습"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"[실습] 개발환경 짧게 확인(venv·API 키·smoke test는 선행 완료 가정)"},{time:"14:00–14:50",topic:"[실습] Agentic RAG로 검색 오류 원인 찾기"},{time:"15:00–15:50",topic:"[실습] 검색 성능 확보: 청킹·리트리버·재검색 루프 개선"},{time:"16:00–16:50",topic:"[실습] RAG 정량 평가(정확도·충실도·관련성) 측정"},{time:"17:00–17:50",topic:"[실습] 개선 전/후 평가표 작성·제출"}],practice:{title:"Agentic RAG로 검색 성능 올리고 점수로 증명하기",steps:["선행 과정에서 만든 개발환경(venv·API 키·smoke test)이 그대로 도는지 짧게 확인한다 — 새로 셋업하지 말고 기존 프로젝트를 재사용한다.","선행에서 구축한 RAG 파이프라인에 검색 품질이 나쁜 질문 5개를 던져, 엉뚱한 문단을 가져오는 '검색 오류' 사례를 먼저 수집한다.","오류 원인을 진단한다 — 청킹이 너무 크거나 작지 않은지, top-k가 부족한지, 질문 표현과 문서 표현이 어긋나는지 항목별로 적는다.","Agentic RAG 구조로 바꾼다: 검색 결과가 부실하면 질문을 다시 쓰고(rewrite) 재검색하는 루프를 넣되 최대 반복 횟수를 정해 무한루프를 막는다.","개선안(청킹 크기·top-k·하이브리드 검색 중 하나)을 실제로 적용해 같은 질문 5개를 다시 검색한다.","RAGAS 같은 지표로 정확도·충실도(faithfulness)·관련성(answer relevancy)을 개선 전/후 각각 측정한다.","두 결과를 한 표에 나란히 정리해 어떤 조치가 점수를 얼마나 올렸는지 숫자로 보여준다.","가장 효과가 컸던 조치와 그 이유를 한 단락으로 회고해 산출물에 덧붙인다."],deliverable:"개선 전/후 검색 성능 정량 평가표(정확도·충실도·관련성)와, 무엇이 점수를 끌어올렸는지 한 단락 회고"}},examples:[{title:"리스트로 역할 분담표 만들고 출력하기",lang:"python",code:`# 팀원 이름과 맡은 역할을 짝지어 딕셔너리 리스트로 만든다
roles = [
    {"name": "민수", "part": "RAG 검색"},   # 한 사람당 한 칸
    {"name": "지영", "part": "LLM 응답"},
    {"name": "현우", "part": "화면(UI)"},
]

# 리스트를 하나씩 돌면서 보기 좋게 출력한다
for r in roles:                     # r 에는 딕셔너리 하나가 차례로 들어온다
    print(f"{r['name']} → {r['part']} 담당")  # f-string 으로 값 끼워 넣기
# 결과:
# 민수 → RAG 검색 담당
# 지영 → LLM 응답 담당
# 현우 → 화면(UI) 담당`,note:"기획 단계의 역할 분담도 코드로 정리해 두면 팀 모두가 같은 그림을 본다."},{title:"MVP 기능 우선순위 정렬하기",lang:"python",code:`# (기능 이름, 중요도) 튜플 리스트. 중요도는 숫자가 클수록 먼저 만든다
features = [("문서 검색", 5), ("예쁜 화면", 2), ("질문 답변", 5), ("로그인", 1)]

# sorted 로 중요도(두 번째 값) 기준 내림차순 정렬한다
# key=lambda x: x[1] 은 '튜플의 1번 칸(중요도)으로 비교하라'는 뜻
ordered = sorted(features, key=lambda x: x[1], reverse=True)

# 우선순위 순서대로 번호를 붙여 출력한다
for i, (name, score) in enumerate(ordered, start=1):  # enumerate: 번호 자동 부여
    print(f"{i}순위: {name} (중요도 {score})")
# 결과:
# 1순위: 문서 검색 (중요도 5)
# 2순위: 질문 답변 (중요도 5)
# 3순위: 예쁜 화면 (중요도 2)
# 4순위: 로그인 (중요도 1)`,note:"무엇부터 만들지 숫자로 정렬해 두면 시간이 부족할 때 무엇을 포기할지 바로 알 수 있다."},{title:"요구사항 → API 설계 (계약 우선)",lang:"text",code:`# API 계약(Contract)을 먼저 정의하면 프론트/백 병렬 작업 가능
POST /ask
  req : { "question": string }
  res : { "answer": string, "sources": string[] }

POST /feedback
  req : { "answer_id": string, "useful": boolean }
  res : { "ok": true }
# 계약이 정해지면 양쪽이 목(mock)으로 먼저 개발 가능`,note:"API 계약을 먼저 합의(contract-first)하면 협업 충돌이 줄고 테스트가 쉬워진다."},{title:"Agentic RAG — 검색 결과를 스스로 평가·재검색",lang:"python",code:`# 단순 RAG는 첫 검색이 나쁘면 그대로 틀린다.
# Agentic RAG는 '검색 품질'을 스스로 판정하고 필요시 다시 찾는다
def grade_and_retry(state):
    docs = retrieve(state["query"])
    verdict = llm.invoke(
        f"질문:{state['query']}\\n문서:{docs}\\n이 문서로 답할 수 있나? yes/no"
    ).content.lower()
    if "no" in verdict:
        # 질의를 다시 써서(rewrite) 재검색 → 성능 회복
        state["query"] = rewrite_query(state["query"])
        docs = retrieve(state["query"])
    return {"docs": docs}`,note:'검색→평가→재검색 루프가 Agentic RAG의 핵심. 미니프로젝트에서 "검색이 나쁠 때 어떻게 회복하나"를 보여주는 대표 장치.'},{title:"RAG 정량 평가 — 지표로 개선을 증명",lang:"python",code:`from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_recall
from datasets import Dataset

# 질문·생성답·검색문맥·정답을 모아 데이터셋으로
data = Dataset.from_dict({
    "question": questions, "answer": answers,
    "contexts": contexts, "ground_truth": truths,
})
result = evaluate(data, metrics=[faithfulness, answer_relevancy, context_recall])
print(result)   # 충실도/관련성/검색재현율을 수치로 → 개선 전후 비교`,note:'"좋아진 것 같다"가 아니라 숫자로 증명한다. faithfulness(환각 억제)·context_recall(검색 성능)을 나눠 보면 어디를 고칠지 보인다.'}],concepts:[{term:"미니 프로젝트(Mini-project)",desc:"배운 기술을 모아 작지만 끝까지 동작하는 서비스를 직접 만들어 보는 압축 실전 과제이다."},{term:"요구사항 명세(Requirements)",desc:"'무엇을 만들지'를 글로 분명히 적어두는 약속 문서로, 나중에 길을 잃지 않게 도와주는 지도이다."},{term:"아키텍처(Architecture)",desc:"서비스의 부품들(입력·LLM·검색·도구·화면)이 어떻게 연결되는지 그린 큰 그림으로, 집을 짓기 전 설계도와 같다."},{term:"환경변수(.env)",desc:"API 키처럼 코드에 직접 박으면 위험한 비밀값을 따로 보관하는 파일로, 지갑을 코드 밖 금고에 두는 것과 같다."},{term:"가상환경(venv)",desc:"이 프로젝트만의 라이브러리를 따로 담는 독립 상자로, 다른 프로젝트와 버전이 충돌하지 않게 막아준다."},{term:"LLM(거대 언어모델)",desc:"사람이 쓴 방대한 글을 학습해 다음에 올 말을 확률로 예측하며 문장을 만들어내는 AI이다."},{term:"RAG(검색 증강 생성)",desc:"LLM이 모르는 우리 문서를 먼저 검색해 찾아 붙여주고 그걸 근거로 답하게 만드는 방법으로, 오픈북 시험과 같다."}],detail:{topics:[{h:"기획 단계에서 반드시 정할 것",items:["해결할 문제 한 문장","핵심 사용자와 사용 시나리오","MVP 기능 1~2개 선정","성공 기준(무엇이 되면 완성인가)"]},{h:"설계 산출물",items:["아키텍처 흐름도(입력→검색→생성→출력)","데이터 플로우(어떤 데이터가 어디로)","API/함수 인터페이스 초안","파일·모듈 구조"]},{h:"환경 셋업 체크리스트",items:["가상환경(venv) 생성·활성화","필수 라이브러리 설치",".env 키 등록과 .gitignore 처리","smoke_test 통과 확인"]}],labs:[{title:"Lab 1. 가상환경부터 첫 LLM 응답까지",steps:["터미널에서 'python -m venv .venv' 입력 후 엔터","'source .venv/bin/activate' (윈도우: .venv\\Scripts\\activate) 로 가상환경 활성화. 프롬프트 앞에 (.venv)가 보이면 성공","'pip install openai python-dotenv' 로 라이브러리 설치",".env 파일을 만들고 'OPENAI_API_KEY=강사가준키' 한 줄 저장","config.py와 smoke_test.py를 위 realCode대로 작성","'python smoke_test.py' 실행 후 '모델 응답:' 줄이 한국어로 출력되는지 확인"]},{title:"Lab 2. 기획서 한 장 완성하기",steps:["README.md 파일을 새로 만든다","맨 위에 '# 프로젝트 이름'과 '## 해결할 문제(한 문장)'를 적는다","'## 사용자 시나리오'에 누가-입력-기대결과를 3줄로 적는다","'## 아키텍처'에 입력→검색→생성→출력 흐름을 글이나 화살표로 적는다","'## 역할 분담' 표를 만들어 팀원과 담당을 적는다",`'git add . && git commit -m "기획 및 환경 셋업"' 으로 첫 커밋을 남긴다`]},{title:"Lab 3. 프로젝트 뼈대 만들기 — 폴더 구조와 .env·.gitignore 연결 (7교시 실습)",steps:["프로젝트 루트에서 'mkdir -p src data' 로 폴더를 만든다(코드는 src, 문서는 data에 둔다)","config.py를 src에 두고, 프로젝트 루트에 .env 파일을 만들어 'OPENAI_API_KEY=강사가준키' 한 줄을 저장한다",".gitignore 파일을 만들어 첫 줄에 '.env', 둘째 줄에 '.venv/' 를 적는다(키와 가상환경을 깃 추적에서 제외)","'git status' 를 실행해 .env가 목록에 보이지 않는지 확인한다(보이면 .gitignore의 위치·철자를 점검)","data/ 안에 어제 모은 문서를 policy.txt로 저장해 둔다(내일 RAG의 재료)","최종 구조를 'ls -R' 또는 'tree -L 2' 로 확인하고, 그 결과를 README의 '## 폴더 구조'에 붙여 넣고 커밋한다"]}],homework:["내일 구현할 RAG에 쓸 문서(사내 규정·FAQ·매뉴얼 등) 3~5개를 텍스트 파일로 모아 data/ 폴더에 담아 오기","기획서(README.md)를 팀원과 검토해 MVP 기능 1개를 최종 확정하고 한 줄로 요약해 오기"]},theory:{theory:[{h:"Prompt에서 Harness로 - 전 과정을 한 줄로 꿰기",body:`이번 과정에서 배운 것을 한 줄로 꿰면 Prompt(무엇을 시킬지) → Context(무엇을 참고하게 할지, RAG) → Harness(검색·도구·평가까지 모델 주변 장치 전체 설계)로 점점 커진다.
미니 프로젝트는 이 셋을 한 서비스로 합치는 자리다.
오늘은 새 기능을 더 얹기보다, 지금까지 만든 조각들을 되돌아보고 '가장 약한 고리'를 찾아 개선하는 데 집중한다.`},{h:"naive RAG의 한계와 Agentic RAG",body:`한 번 검색해 그대로 붙이는 naive RAG는, 검색이 빗나가면 엉뚱한 조각을 근거로 답하는 사고가 난다.
Agentic RAG는 검색 → 결과가 질문과 관련 있는지 채점(grading) → 부족하면 질문을 고쳐 재검색하는 루프를 돌려, 검색 실패를 스스로 복구한다.
단, 무한 루프를 막기 위해 재검색 횟수에 상한을 둔다.
오늘의 개선 목표 하나는 바로 이 '스스로 다시 찾는' 능력을 우리 서비스에 넣는 것이다.`},{h:"RAG를 숫자로 평가하기",body:`'좋아 보이는 답'은 사람마다 기준이 달라 믿기 어렵다.
그래서 검색 정확도(관련 문서를 잘 데려왔나)·근거 충실도(답이 근거 안에서 나왔나, 지어내지 않았나)·답변 관련성(질문에 실제로 답했나)을 몇 개의 샘플 질문으로 측정해 표로 남긴다.
이 표가 오늘의 제출물이며, 무언가를 바꿨을 때 좋아졌는지 나빠졌는지를 숫자로 확인하는 기준선이 된다.`},{h:"미니프로젝트 3일 — 무엇을 만들고, 어떻게 평가받나 (1교시 OT)",body:`이 미니프로젝트는 지금까지 배운 Prompt·RAG·Agent를 하나의 '동작하는 AI 서비스'로 합치는 자리다. 3일의 큰 흐름은 분명하다 — Day1은 설계(무엇을 만들지 종이 위에서 확정), Day2는 구현(설계를 코드로), Day3은 테스트·배포·발표(돌아가는 것을 보여 주기)다.
제출 산출물은 세 가지다: ① 기획·설계 문서(README 한 장), ② 동작하는 코드 저장소, ③ 5분 시연 발표. 평가는 '얼마나 화려한가'가 아니라 '문제-해결이 분명한가, 실제로 돌아가는가, 팀이 스스로 설명할 수 있는가'로 본다.
오늘 1교시의 핵심 메시지 한 줄: 크게 벌이지 말고 하나를 끝까지 돌리자. 화면만 예쁜 미완성 다섯 개보다, 질문을 넣으면 근거와 함께 답이 나오는 MVP(가장 작은 완성본) 하나가 낫다. 이 기준을 팀 전원이 공유하는 것으로 하루를 연다.`},{h:"주제 선정과 사용자 시나리오 — '누가·언제·무엇을'부터 (2교시)",body:`좋은 주제는 '멋진 기술'이 아니라 '누군가의 불편'에서 시작한다. 먼저 해결할 문제를 한 문장으로 못 박는다 — 예: '신입사원이 사내 규정을 매번 사람에게 묻는다'.
그다음 사용자 시나리오를 세 줄로 그린다: 누가(신입사원) → 무엇을 입력(자연어 질문) → 무엇을 기대(근거가 붙은 정확한 답). 이 세 줄이 나오면 만들 것이 저절로 좁혀진다.
핵심 포인트: 주제는 '우리가 가진 문서로 답할 수 있는가'로 검증한다. RAG 서비스는 근거 문서가 있어야 성립하므로, 사내 규정·FAQ·매뉴얼처럼 손에 넣을 수 있는 자료가 있는 주제를 고른다. 자료를 못 구하는 멋진 주제보다, 자료가 있는 소박한 주제가 3일 안에 완성된다. 이 관점으로 각 팀이 후보 2~3개를 놓고 '자료 확보 가능성'으로 하나를 고른다.`},{h:"AI 서비스 아키텍처 — LLM·RAG·Agent 세 층으로 그리기 (4교시)",body:`우리 서비스를 세 층으로 나눠 그리면 누가 무엇을 하는지 한눈에 보인다. ① LLM층 = 말을 만드는 엔진(질문을 답으로), ② RAG층 = 엔진에 근거를 대 주는 검색(문서를 찾아 프롬프트에 붙임), ③ Agent층 = 여러 도구·단계를 지휘하는 조정자(검색→채점→재검색→작성).
가장 단순한 서비스는 LLM만, 조금 똑똑하면 LLM+RAG, 더 나아가면 Agent가 RAG를 도구처럼 부린다. 우리 MVP가 어느 수준인지 오늘 정한다 — 대개는 'LLM+RAG'로 시작해 여유가 되면 Agent를 얹는 전략이 3일 안에 안전하다.
활동으로 이어짐: 화이트보드나 종이에 입력 → (RAG 검색) → (LLM 생성) → 출력, 상자 네 개를 그리고 화살표로 잇는다. 이 그림이 곧 Day2 구현의 지도가 된다. 그림 한 장이 없으면 내일 각자 다른 것을 만들게 된다.`},{h:"데이터 플로우와 API 인터페이스 — 조각들이 주고받는 약속 정하기 (5교시)",body:`아키텍처가 '무엇이 있나'라면, 데이터 플로우는 '무엇이 어디로 흐르나'다. 질문 텍스트 → 검색 함수 → 근거 조각들 → 프롬프트 → LLM → 답변+출처. 이 흐름에서 각 단계가 '무엇을 받아 무엇을 내보내는지'를 못 박으면 팀원이 각자 다른 조각을 동시에 만들 수 있다.
그 약속이 바로 인터페이스(계약)다. 예를 들어 답변 API를 '입력: {question: 문자열}, 출력: {answer: 문자열, sources: 문자열 목록}'으로 먼저 합의하면, 화면 담당과 검색 담당이 서로를 기다리지 않고 각자 가짜(mock) 데이터로 개발할 수 있다.
핵심 포인트: 계약을 먼저 정하는 것(contract-first)이 협업 충돌과 재작업을 줄이는 가장 싼 방법이다. 거창한 문서가 아니라 함수 이름·입력·출력을 적은 작은 표 하나면 충분하다. 이 표를 README의 '## 인터페이스'에 남긴다.`},{h:"작업 분담·일정과 Day1 회고 — 3일을 시간으로 쪼개기 (8교시)",body:`좋은 계획은 'RAG 담당, LLM 담당, 화면 담당'처럼 사람에 일을 붙이고, 각 일에 '언제까지'를 붙인다. 24시간(3일)을 거꾸로 계산한다 — 마지막 반나절은 발표·리허설로 비워 두고, 그 앞을 구현·통합·테스트로 채운다. 시간이 부족할 때 무엇을 포기할지(우선순위 낮은 기능)를 미리 정해 두면 막판에 흔들리지 않는다.
Day1 회고는 짧고 구체적으로 한다: 오늘 '주제·설계·환경'이 실제로 준비됐는지 세 가지만 확인한다 — ① 문제 한 문장이 팀 모두 같은가, ② 아키텍처 그림이 있는가, ③ smoke_test가 통과했는가. 하나라도 '아니오'면 그것을 내일 아침 1순위 할 일로 남기고 마친다. 회고는 소감 나누기가 아니라 '내일 무엇부터 할지'를 정하는 시간이다.`}]},realCodes:[{title:"config.py — .env에서 API 키를 안전하게 불러오는 설정 모듈",lang:"python",code:`# os 모듈은 운영체제의 환경변수에 접근할 때 사용한다
import os
# load_dotenv 함수는 .env 파일의 내용을 환경변수처럼 읽어 들인다
from dotenv import load_dotenv

# .env 파일을 찾아 그 안의 KEY=VALUE 들을 메모리로 올려준다(이 한 줄이 핵심)
load_dotenv()

# 환경변수에서 OPENAI_API_KEY 값을 꺼내 변수에 담는다(없으면 None 이 된다)
API_KEY = os.getenv("OPENAI_API_KEY")

# 키가 없으면 더 진행해도 실패하므로, 미리 친절한 오류 메시지로 멈춘다
if not API_KEY:
    # raise 는 프로그램을 즉시 멈추고 오류를 알리는 명령이다
    raise RuntimeError(".env 에 OPENAI_API_KEY 가 없습니다. 파일을 확인하세요.")

# 사용할 모델 이름을 한 곳에 모아두면 나중에 바꾸기 쉽다
MODEL_NAME = "gpt-4o-mini"

# 다른 파일에서 import 했을 때 설정이 잘 들어왔는지 눈으로 확인하는 코드
if __name__ == "__main__":
    # 키 전체를 찍으면 위험하므로 앞 7글자만 보여준다
    print("키 로딩 성공:", API_KEY[:7] + "...")  # 결과: 키 로딩 성공: sk-proj...
    print("사용 모델:", MODEL_NAME)             # 결과: 사용 모델: gpt-4o-mini`,note:`키를 코드가 아닌 .env에 두고 한 곳(config.py)에서만 읽게 만든 구조이다.
이렇게 하면 모델 이름이나 키를 바꿀 때 이 파일 한 곳만 고치면 된다.`},{title:"smoke_test.py — 환경이 제대로 연결됐는지 확인하는 첫 LLM 호출",lang:"python",code:`# 방금 만든 config 모듈에서 키와 모델 이름을 그대로 가져온다
from config import API_KEY, MODEL_NAME
# OpenAI 라이브러리에서 클라이언트(서버와 통신하는 도구) 클래스를 가져온다
from openai import OpenAI

# 클라이언트 객체를 만든다. api_key 인자에 우리 키를 넘겨 인증한다
client = OpenAI(api_key=API_KEY)

# 모델에게 보낼 대화를 리스트로 구성한다(역할과 내용 쌍)
messages = [
    # system 역할: 모델의 성격·말투를 정하는 지시문이다
    {"role": "system", "content": "너는 친절한 한국어 도우미다."},
    # user 역할: 실제 사용자의 질문이다
    {"role": "user", "content": "한 문장으로 자기소개 해줘."},
]

# chat.completions.create 로 모델에 요청을 보낸다(인터넷을 통해 서버와 통신)
response = client.chat.completions.create(
    model=MODEL_NAME,   # 어떤 모델을 쓸지 지정
    messages=messages,  # 위에서 만든 대화 내용 전달
    temperature=0.7,    # 답변의 창의성 정도(0=일관적, 1=다양함)
)

# 응답 객체에서 실제 답변 텍스트만 꺼낸다(구조가 깊으니 그대로 따라 적자)
answer = response.choices[0].message.content

# 모델이 만든 답을 화면에 출력한다
print("모델 응답:", answer)  # 결과: 모델 응답: 안녕하세요, 무엇이든 도와드리는 한국어 도우미입니다.`,note:"환경 셋업이 끝났는지 검증하는 가장 작은 코드로, 이 한 줄이 출력되면 키·네트워크·라이브러리가 모두 정상이라는 뜻이다."},{title:"검색결과 grading + 질의 재작성 재검색 (Agentic RAG 핵심 루프)",lang:"python",code:`# 검색이 부족하면 질문을 고쳐 다시 찾는 최소 Agentic 루프
from openai import OpenAI
from config import API_KEY, MODEL_NAME
from rag import search, build_index, chunk_text  # 2일차 모듈 재사용

client = OpenAI(api_key=API_KEY)

def grade(question, context):  # 근거가 질문에 충분한지 YES/NO로 채점
    prompt = f'질문에 답하기에 근거가 충분하면 YES, 아니면 NO만 출력.\\n질문:{question}\\n근거:{context}'
    res = client.chat.completions.create(model=MODEL_NAME, messages=[{'role': 'user', 'content': prompt}])
    return 'YES' in res.choices[0].message.content.upper()

def rewrite(question):  # 검색이 잘 되도록 질문을 더 구체적으로 고쳐 준다
    prompt = f'검색이 잘 되도록 다음 질문을 더 구체적으로 바꿔줘(한 문장):\\n{question}'
    res = client.chat.completions.create(model=MODEL_NAME, messages=[{'role': 'user', 'content': prompt}])
    return res.choices[0].message.content.strip()

def agentic_search(question, index, max_tries=3):  # 최대 3번까지 재검색
    q = question
    context = ''
    for attempt in range(max_tries):
        hits = search(q, index)          # 현재 질문으로 검색
        context = '\\n'.join(hits)        # 근거 묶기
        if grade(question, context):     # 원래 질문 기준으로 채점
            return context, attempt + 1  # 충분하면 근거와 시도횟수 반환
        q = rewrite(q)                   # 부족하면 질문을 고쳐 다시
    return context, max_tries            # 끝까지 부족하면 마지막 근거라도 반환

if __name__ == '__main__':
    doc = open('data/policy.txt', encoding='utf-8').read()
    index = build_index(chunk_text(doc))
    ctx, tries = agentic_search('환불', index)          # 애매한 질문
    print(f'{tries}번 만에 근거 확보:\\n{ctx[:120]}')     # 결과: 재검색을 거쳐 근거를 확보`,note:`grade가 NO를 내면 rewrite로 질문을 고쳐 다시 검색한다 — naive RAG를 Agentic RAG로 끌어올리는 핵심 루프다.
max_tries로 상한을 둬 무한 루프를 막는 것이 안전장치다.`},{title:"eval.py — 샘플 QA셋으로 faithfulness·relevancy 점수 집계",lang:"python",code:`# 몇 개의 샘플 질문으로 RAG 답변을 채점해 표로 남긴다
from openai import OpenAI
from config import API_KEY, MODEL_NAME
from app import answer  # 2일차에 만든 RAG 답변 함수 재사용

client = OpenAI(api_key=API_KEY)

# 평가용 샘플: 질문과 사람이 정한 모범답안
qa_set = [
    {'q': '환불은 며칠 안에 가능한가요?', 'ref': '구매 후 7일 이내'},
    {'q': '연차 휴가는 며칠인가요?', 'ref': '연 15일'},
]

def judge(question, answer_text, reference):  # LLM 심판이 두 항목을 0~1로 채점
    prompt = (
        f'질문:{question}\\n모범답안:{reference}\\n제출답:{answer_text}\\n'
        '두 점수를 콤마로 숫자만 출력해라. '
        '충실도(제출답이 지어내지 않았는가), 관련성(질문에 답했는가). 예: 0.8,0.9'
    )
    res = client.chat.completions.create(model=MODEL_NAME, messages=[{'role': 'user', 'content': prompt}])
    faith, rel = res.choices[0].message.content.strip().split(',')
    return float(faith), float(rel)

rows = []
for item in qa_set:
    ans = answer(item['q'])                      # 우리 RAG의 답
    f, r = judge(item['q'], ans, item['ref'])    # 채점
    rows.append((item['q'], f, r))

print('질문 | 충실도 | 관련성')
for q, f, r in rows:
    print(f'{q} | {f:.2f} | {r:.2f}')
# 평균을 기준선으로 남겨 개선 전후를 비교한다
print('평균 충실도:', round(sum(f for _, f, _ in rows) / len(rows), 2))
print('평균 관련성:', round(sum(r for _, _, r in rows) / len(rows), 2))`,note:`샘플 QA셋에 대해 충실도·관련성을 점수로 매겨 표와 평균으로 남긴다.
이 평균을 기준선으로 잡아 두면, 청킹·k·프롬프트를 바꿨을 때 개선 여부를 숫자로 확인할 수 있다.`}],periods:["OT · 미니프로젝트 개요와 평가 기준 안내","주제 선정과 사용자 시나리오 정의","[실습] 요구사항 명세서 한 장으로 정리하기","AI 서비스 아키텍처 설계 (LLM · RAG · Agent)","데이터 플로우와 API 인터페이스 설계","[실습] 기술 스택 선정과 개발 환경 셋업","[실습] 프로젝트 폴더 구조 만들고 .env로 키 연결하기","작업 분담 · 일정 수립과 Day1 회고"]},"miniproject-2":{plan:{schedule:[{time:"09:00–09:50",topic:"미니프로젝트 안내: 목표 · 산출물 · 평가 기준 공유"},{time:"10:00–10:50",topic:"[설계] 주제 정하고 사용자 시나리오 한 문장으로 좁히기"},{time:"11:00–11:50",topic:"[설계] 워커 에이전트 역할 나누기(3개 이내)"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"[설계] Supervisor 라우팅 규칙 · 종료 조건 정하기"},{time:"14:00–14:50",topic:"[설계] 공유 상태(State) 스키마 정의"},{time:"15:00–15:50",topic:"[설계] 협업 흐름도(Multi-Agent Workflow) 그리기"},{time:"16:00–16:50",topic:"[실습] 개발 착수: 뼈대 코드에 노드·엣지 배치"},{time:"17:00–17:50",topic:"[실습] 설계 리뷰와 팀 상호 피드백"}],practice:{title:"주제 정하고 Supervisor 멀티에이전트 설계하기",steps:["우리 팀이 만들 서비스 주제를 한 문장으로 적는다. 예: '사용자가 준 자료를 조사·요약·검수해 보고서 초안을 만들어 주는 서비스'","그 주제를 처리하는 데 꼭 필요한 워커(worker) 에이전트 역할을 3개 이내로 나눈다(예: 조사자·작성자·검수자) — 역할이 겹치지 않게 한 줄씩 정의한다.","Supervisor(감독) 에이전트의 라우팅 규칙을 적는다: 지금 상태가 어떠할 때 어느 워커에게 일을 넘길지 조건을 표로 정리한다.","언제 작업을 끝낼지 종료 조건(FINISH)을 명확히 정한다 — 예: 검수자가 '통과'를 반환하면 종료.","에이전트들이 함께 쓰는 공유 상태(State) 스키마를 정의한다: messages, next(다음 에이전트), 중간 산출물 필드 등을 이름·타입과 함께 적는다.","전체 협업 흐름을 흐름도로 그린다: Supervisor를 가운데 두고 워커들과의 왕복, 조건 분기, 종료 지점을 화살표로 표현한다.","흐름도대로 LangGraph 뼈대 코드에 노드(각 에이전트)와 조건 엣지를 배치해 설계가 코드로 옮겨지는지 확인한다(구현 완성은 다음 날).","설계 산출물을 팀끼리 리뷰하며 라우팅이 막히는 지점(무한루프·미종료)이 없는지 점검하고 보완한다."],deliverable:"Multi-Agent 설계 산출물 문서 — 에이전트 역할, Supervisor 라우팅 규칙·종료 조건, 공유 상태 스키마, 협업 흐름도"}},examples:[{title:"코사인 유사도 직접 계산해 보기",lang:"python",code:`import numpy as np  # 벡터 계산용

# 의미를 흉내 낸 작은 벡터 3개(실제론 수백 차원이지만 원리는 같다)
q = np.array([1.0, 0.0])      # 질문 벡터
a = np.array([0.9, 0.1])      # 비슷한 문서
b = np.array([0.0, 1.0])      # 다른 문서

# 코사인 유사도 함수: 내적을 두 크기의 곱으로 나눈다
def cos(x, y):
    return np.dot(x, y) / (np.linalg.norm(x) * np.linalg.norm(y))

print("질문 vs a:", round(cos(q, a), 2))  # 결과: 질문 vs a: 0.99 (매우 비슷)
print("질문 vs b:", round(cos(q, b), 2))  # 결과: 질문 vs b: 0.0 (전혀 다름)`,note:"유사도가 1에 가까울수록 의미가 가깝다는 것을 숫자로 직접 확인할 수 있다."},{title:"Supervisor가 워커를 지휘하는 최소 멀티에이전트",lang:"python",code:`# 워커 1: RAG 검색 담당(실제론 벡터DB 조회, 여기선 흉내)
def search_worker(state):
    state['messages'].append('검색결과: 환불은 7일 이내 가능')
    return state

# 워커 2: 계산 담당
def math_worker(state):
    state['messages'].append('계산결과: 12000원')
    return state

workers = {'search': search_worker, 'math': math_worker}

# 조정자: 상태를 보고 다음 워커 이름이나 FINISH를 정한다(여기선 간단 규칙, 실무는 LLM)
def supervisor(state):
    done = ' '.join(state['messages'])
    if '검색결과' not in done:
        return 'search'
    if '계산결과' not in done:
        return 'math'
    return 'FINISH'

state = {'messages': []}
while True:
    nxt = supervisor(state)      # 다음에 누구를 시킬지 결정
    if nxt == 'FINISH':          # 다 끝났으면 종료
        break
    state = workers[nxt](state)  # 지목된 워커를 호출

print(state['messages'])  # 결과: ['검색결과: ...', '계산결과: ...']
`,note:"조정자가 순서를 정하고 워커는 한 가지 일만 한다. 실무에서는 LangGraph의 StateGraph로 같은 구조를 노드·엣지로 표현한다."},{title:"검색결과를 채점하고 부실하면 질문을 고쳐 다시 검색하기",lang:"python",code:`# search: top-k 조각을 돌려준다고 가정(실제론 벡터DB 조회)
def search(query):
    return ['환불 규정 문서 일부...', '배송 안내 문서...']

# grade: 조각이 질문에 관련 있는지 LLM에 물어 yes/no를 받는다(여기선 흉내)
def grade(question, chunk):
    return 'yes' if '환불' in chunk else 'no'

# rewrite_query: 질문을 더 구체적으로 고쳐 쓴다
def rewrite_query(q):
    return q + ' 기간 조건 포함'

question = '환불 되나요?'
for attempt in range(2):                      # 최대 2회까지 재검색
    chunks = search(question)
    good = [c for c in chunks if grade(question, c) == 'yes']
    if len(good) >= 1:                          # 관련 조각이 있으면 성공
        print('검색 성공:', good[0][:10])
        break
    question = rewrite_query(question)          # 부실하면 질문을 고쳐 재시도
    print('질문 재작성 ->', question)
`,note:"검색이 부실하면 곧장 답하지 않고 질문을 고쳐 다시 찾는 이 되먹임 구조가 Agentic RAG의 핵심이다."},{title:"RAG를 숫자로 평가하기(faithfulness·answer relevancy)",lang:"python",code:`# 샘플 QA셋: (질문, 정답 근거, 모델 답) — 실제론 여러 개를 넣는다
samples = [
    ('환불 기간은?', '환불은 7일 이내 가능', '환불은 7일 안에 됩니다'),
    ('배송 기간은?', '배송은 2~3일 소요', '배송은 보통 2~3일 걸립니다'),
]

# 실제로는 LLM에게 0~1 점수를 매기게 하지만, 여기선 원리만 흉내 낸다
def faithfulness(evidence, answer):  # 답이 근거 안에서 나왔나
    return 1.0 if any(w in answer for w in evidence.split()) else 0.0

def answer_relevancy(question, answer):  # 질문에 답을 하긴 했나
    return 1.0 if len(answer) > 0 else 0.0

fa = sum(faithfulness(e, a) for _, e, a in samples) / len(samples)
rel = sum(answer_relevancy(q, a) for q, _, a in samples) / len(samples)
print(f'충실도 평균 {fa:.2f}, 관련성 평균 {rel:.2f}')  # 이 점수표가 요구되는 정량 평가 결과물
`,note:"답이 근거 안에서 나왔는지(faithfulness)와 질문에 답했는지(answer relevancy)를 0~1로 채점해 평균을 낸다. 실무에서는 RAGAS 같은 도구로 자동화한다."},{title:"llm.py — LLM 호출을 한 곳으로 모으는 재사용 모듈 (2교시 시연)",lang:"python",code:`# llm.py — 앱 어디서나 이 함수 하나만 부르게 만드는 얇은 래퍼
from openai import OpenAI
from config import API_KEY, MODEL_NAME  # 1일차에 만든 설정 재사용

# 모듈이 로드될 때 클라이언트를 한 번만 만든다(매 호출마다 새로 만들면 낭비)
client = OpenAI(api_key=API_KEY)

def ask_llm(prompt, system="너는 정확하고 간결한 한국어 도우미다.", temperature=0.3):
    """프롬프트 한 개를 받아 모델의 답 텍스트만 돌려주는 얇은 래퍼."""
    messages = [
        {"role": "system", "content": system},  # 말투·성격을 정하는 지시
        {"role": "user", "content": prompt},     # 실제 질문
    ]
    res = client.chat.completions.create(
        model=MODEL_NAME,        # 모델 이름은 config 한 곳에서만 관리
        messages=messages,
        temperature=temperature,  # 낮을수록 일관된 답
    )
    return res.choices[0].message.content.strip()  # 답 텍스트만 추출

if __name__ == "__main__":
    print(ask_llm("사과를 한 문장으로 소개해줘."))  # 결과: 사과는 아삭하고 달콤한 대표 과일입니다.`,note:"앱 곳곳에서 openai를 직접 부르지 않고 ask_llm() 하나만 쓰게 만들면, 모델 교체·로깅·재시도를 이 파일 한 곳에서 처리할 수 있다. rag.py와 app.py도 이 함수를 가져다 쓴다."},{title:"계산기 도구를 에이전트에 붙이기 — '판단은 모델, 실행은 도구' (5교시 시연)",lang:"python",code:`# 에이전트에 '계산기 도구'를 붙여 능력을 확장하는 최소 예제
import re
from llm import ask_llm  # 방금 만든 LLM 래퍼 재사용

# 도구 1: 안전한 사칙연산 계산기(모델이 숫자 계산을 틀리는 것을 보완)
def calculator(expr):
    # 숫자와 + - * / ( ) . 공백만 남겨 위험한 코드 실행을 막는다
    safe = re.sub(r"[^0-9+\\-*/(). ]", "", expr)
    return str(eval(safe))  # 정리된 식만 계산

# 도구 목록(이름 → 함수). 에이전트가 골라 쓸 수 있게 사전으로 둔다
TOOLS = {"calc": calculator}

def agent(question):
    # 1) 모델에게 '계산이 필요하면 CALC[식] 형태로만 답하라'고 안내
    plan = ask_llm(f"계산이 필요하면 CALC[식] 형식으로만, 아니면 바로 답해라.\\n질문: {question}")
    # 2) 계산 지시가 오면 도구를 실제로 실행한다
    m = re.search(r"CALC\\[(.+?)\\]", plan)
    if m:
        result = TOOLS["calc"](m.group(1))  # 실제 계산은 믿을 수 있는 도구가
        return f"계산 결과: {result}"
    return plan  # 계산이 필요 없으면 모델 답을 그대로

if __name__ == "__main__":
    print(agent("정가 12000원의 15% 할인가는?"))  # 결과: 계산 결과: 10200.0`,note:"LLM은 '무엇을 할지' 정하고, 실제 계산은 도구가 한다. 이 '판단은 모델, 실행은 도구' 분업이 에이전트 확장의 기본 패턴이다. 여기서 calc 자리에 '문서 검색' 도구를 꽂으면 그대로 Day3의 검색 워커가 된다."},{title:"캐싱으로 비용·지연 절감",lang:"python",code:`import hashlib, json
cache = {}   # 실서비스는 Redis 권장

def cached_answer(question):
    # 동일 질문의 LLM 호출을 캐시해 비용/지연을 줄인다
    key = hashlib.sha256(question.encode()).hexdigest()
    if key in cache:
        return cache[key]            # 캐시 적중 → LLM 호출 없음
    ans = answer(question)           # 캐시 미스 → 실제 호출
    cache[key] = ans
    return ans`,note:"반복 질의가 많은 서비스는 캐싱 효과가 크다. 키는 정규화된 질문 해시를 사용한다."}],concepts:[{term:"청킹(Chunking)",desc:"긴 문서를 검색하기 좋게 작은 조각으로 자르는 일로, 두꺼운 책을 페이지 단위로 나누는 것과 같다."},{term:"임베딩(Embedding)",desc:"글의 의미를 숫자 벡터(좌표)로 바꾼 것으로, 뜻이 비슷한 문장은 좌표상에서 서로 가까이 모인다."},{term:"벡터 유사도(Similarity)",desc:"두 벡터가 얼마나 같은 방향을 보는지 재는 값으로, 클수록 의미가 비슷하다는 뜻이다."},{term:"Retriever(검색기)",desc:"질문과 가장 비슷한 문서 조각을 골라오는 부품으로, 도서관 사서가 관련 책을 찾아주는 역할과 같다."},{term:"top-k 검색",desc:"가장 비슷한 상위 k개만 골라오는 것으로, 너무 많이 가져오지 않고 핵심만 추려 LLM에 넘긴다."},{term:"Agent(에이전트)",desc:"LLM이 스스로 '어떤 도구를 쓸지' 판단해 계산기·검색 같은 외부 기능을 호출하게 만든 똑똑한 비서이다."},{term:"도구(Tool)",desc:"LLM이 직접 못 하는 일(실시간 계산·DB 조회 등)을 대신 해주는 함수로, 에이전트의 손과 발에 해당한다."},{term:"Agentic RAG",desc:"한 번 검색하고 끝내는 대신, 에이전트가 검색 결과가 쓸 만한지 스스로 판단하고 부족하면 질문을 고쳐 다시 검색하는 똑똑한 RAG다."},{term:"질의 재작성(Query Rewriting)",desc:"사용자의 모호한 질문을 검색이 잘 되도록 다시 다듬는 것으로, 예를 들어 '그거 환불돼?'를 '제품 환불 규정과 기간'으로 바꾼다."},{term:"검색결과 평가(Retrieval Grading)",desc:"찾아온 문서 조각이 질문과 정말 관련 있는지 LLM이 한 번 더 채점해 걸러내는 단계다."},{term:"RAG 정량 평가",desc:"답이 좋아 보이는 느낌이 아니라 숫자로 재는 것으로, 검색 정확도·근거 충실도·답변 관련성 등을 측정한다."},{term:"Harness Engineering",desc:"프롬프트 한 줄을 넘어, 모델을 둘러싼 검색·도구·메모리·평가 장치 전체를 설계하는 것이다."},{term:"Multi-Agent(다중 에이전트)",desc:"한 개의 만능 에이전트 대신 역할이 다른 여러 에이전트가 협업하는 구조다."},{term:"Supervisor 패턴",desc:"한 명의 조정자(Supervisor) 에이전트가 사용자의 요청을 보고 어떤 워커에게 일을 맡길지 정하고, 결과를 모아 최종 답을 만드는 방식이다. 팀장이 팀원에게 업무를 배분하고 취합하는 것과 같다."},{term:"워커(Worker) 에이전트",desc:"검색 담당·계산 담당·요약 담당처럼 한 가지 일을 전문으로 하는 에이전트다."},{term:"공유 상태(State)",desc:"여러 에이전트가 주고받는 공용 메모(대화 이력·중간 결과)로, 오케스트레이션의 핵심이다."},{term:"라우팅(Routing)",desc:"Supervisor가 다음은 누구 차례인지 결정하는 흐름 제어다."}],detail:{topics:[{h:"RAG 파이프라인 구현 순서",items:["문서 로딩(파일 읽기)","청킹(조각내기)","임베딩·색인(벡터화)","질문 검색(top-k)","근거 결합 프롬프트로 생성"]},{h:"통합 시 자주 막히는 지점",items:["응답 객체에서 텍스트 꺼내는 경로","한글 파일 인코딩(utf-8)","빈 입력·검색 결과 0건 처리","API 요금·호출 횟수 관리"]},{h:"안정화(예외 처리) 포인트",items:["빈 질문 막기","키 오류시 친절한 메시지","검색 결과 없을 때 안내","try-except로 네트워크 오류 잡기"]},{h:"Multi-Agent 설계 산출물 항목",items:["에이전트 목록과 각 역할","Supervisor 라우팅 규칙","공유 상태(State) 스키마","종료 조건","전체 협업 흐름도","미니프로젝트 주제와의 연결"]}],labs:[{title:"Lab 1. 내 문서로 RAG 검색 돌려보기",steps:["data/ 폴더에 policy.txt를 만들고 어제 모은 문서 내용을 붙여 넣는다","rag.py를 위 realCode대로 작성한다",`파이썬 인터프리터에서 'from rag import *' 후 'idx = build_index(chunk_text(open("data/policy.txt",encoding="utf-8").read()))' 실행`,`'search("환불 어떻게 해?", idx)' 를 실행해 관련 조각이 나오는지 확인`,"엉뚱한 질문도 넣어보고 검색 결과가 달라지는지 비교한다"]},{title:"Lab 2. 전체 앱 연결하고 시연하기",steps:["app.py를 위 realCode대로 작성한다","'python app.py' 를 실행한다","어제 정한 시나리오 질문을 입력한다","답변과 [근거] 블록이 함께 출력되는지 확인한다","빈 줄을 입력해 안내 메시지가 나오는지(죽지 않는지) 확인한다","'q'를 입력해 정상 종료되는지 확인하고 커밋한다"]},{title:"Lab 3. Multi-Agent 설계 문서 만들기",steps:["미니프로젝트 주제를 확정한다","필요한 워커(작업자)와 각자의 역할을 나눈다","Supervisor 프롬프트 초안을 작성한다(워커 카탈로그+종료 조건 포함)","위 내용을 설계 문서로 정리해 제출한다"]}],homework:["오늘 만든 RAG 앱에서 잘 못 답하는 질문 3개를 찾아, 원인(청킹 크기·검색 개수 등)을 한 줄씩 메모해 오기","내일 발표용 데모 질문 3개를 정하고, 각 질문의 기대 답변을 미리 적어 오기","Day3에 구현할 워커별 입력/출력 인터페이스를 표로 정의해 오기"]},theory:{theory:[{h:"왜 에이전트를 나누나",body:`하나의 프롬프트에 검색·계산·요약·판단을 다 넣으면 지시가 길어지고 실수가 늘어난다.
역할별로 쪼개면 각 에이전트의 프롬프트가 짧고 명확해지고, 어디서 틀렸는지 찾는 디버깅도 쉬워진다.
사람 조직이 한 명에게 모든 일을 시키지 않고 팀을 나누는 것과 같은 이유다.`},{h:"Supervisor의 일",body:`Supervisor는 사용자의 요청을 읽고 '이번엔 검색 에이전트, 다음엔 요약 에이전트' 식으로 순서를 정하고, 워커들의 결과를 모아 최종 답을 조립한다.
Supervisor 프롬프트에는 '어떤 워커가 무엇을 잘하는지' 목록과 '언제 끝낼지'를 정하는 종료 조건을 반드시 적는다.
이 두 가지가 빠지면 감독이 헤매거나 끝내지 못하고 맴돈다.`},{h:"설계 산출물에 담을 것",body:`Day2의 제출물은 코드가 아니라 설계 문서다.
에이전트 목록과 각 역할, Supervisor의 라우팅 규칙, 에이전트 사이에 오가는 공유 상태(무엇을 주고받나), 종료 조건, 그리고 이 구조가 미니 프로젝트 주제를 어떻게 푸는지 보여주는 한 장의 흐름도를 담는다.
이 문서를 Day2 끝에 제출하면, Day3에서 그대로 코드로 옮기기만 하면 된다.`},{h:"설계에서 구현으로 — 오늘 코드로 옮길 순서 (1교시)",body:`어제 그린 지도(입력→검색→생성→출력)를 오늘 코드로 옮긴다. 순서가 중요하다 — 밑에서부터 쌓는다. ① LLM 호출이 되는지(llm.py), ② 문서를 찾을 수 있는지(rag.py), ③ 둘을 이어 답이 나오는지(app.py). 아래 칸이 확실해야 위 칸을 얹었을 때 어디서 틀렸는지 안다.
오늘의 규칙 하나: 한 조각을 만들 때마다 바로 돌려 본다. 세 파일을 다 쓴 뒤 한꺼번에 실행하면 오류가 어디서 났는지 찾기 어렵다. '작게 만들고 바로 확인'이 오늘의 리듬이다.
1교시 점검 포인트: 어제의 설계 문서를 열어 오늘 만들 함수 이름·입출력이 그대로 적혀 있는지 확인하고, 안 적혔으면 지금 채운다. 팀은 이 순서표를 기준으로 어제 정한 담당대로 각 파일을 나눠 맡는다.`},{h:"LLM 호출을 모듈로 감싸기 — 왜 llm.py 한 파일인가 (2교시)",body:`앱 곳곳에서 openai를 직접 부르면, 모델 이름을 바꾸거나 오류를 다시 시도하는 로직을 넣을 때 수십 군데를 고쳐야 한다. 그래서 호출을 ask_llm() 같은 함수 하나로 감싼 llm.py를 둔다. 나머지 코드는 openai가 있는지도 모르고 ask_llm()만 부른다.
이런 '얇은 껍데기(wrapper)'의 이점: ① 모델 교체가 한 줄, ② 로깅·재시도·비용 집계를 이 파일에서 일괄 처리, ③ 테스트할 때 이 함수만 가짜로 바꿔치기하면 API 없이도 앱을 검증할 수 있다.
핵심 포인트: 자주 부르는 외부 서비스는 항상 내 함수로 한 번 감싼다. 지금 5분 투자가 내일 디버깅 한 시간을 아낀다. 이 원칙은 RAG 검색·도구 호출에도 똑같이 적용된다.`},{h:"RAG 네 단계를 코드로 — 적재·청킹·임베딩·검색 (3~4교시)",body:`RAG는 마법이 아니라 네 단계의 조립이다. ① 적재: 문서를 파일에서 읽어 온다. ② 청킹: 긴 글을 300자쯤으로 잘라 조각으로 만든다(너무 크면 검색이 뭉뚝해지고, 너무 작으면 문맥이 끊긴다). ③ 임베딩: 각 조각을 의미 벡터(숫자 리스트)로 바꾼다. ④ 검색: 질문도 같은 방식으로 벡터로 바꿔, 코사인 유사도가 높은 조각 top-k를 고른다.
왜 벡터인가: 단어가 안 겹쳐도 '의미'가 가까우면 찾아내기 위해서다. '환불'로 물어도 '반품 규정' 조각을 데려올 수 있는 이유가 이것이다.
핵심 포인트: 검색 품질을 좌우하는 손잡이는 두 개다 — 청크 크기와 top-k(몇 개를 가져올지). 3교시에서는 적재·청킹·임베딩·색인까지, 4교시에서는 질문으로 top-k를 뽑는 검색까지 나눠 만들면 각 단계를 눈으로 확인하며 진행할 수 있다. 이 두 손잡이는 Day3에서 점수를 보며 다시 돌리게 된다.`},{h:"도구(Tool)를 붙여 에이전트 능력 확장 — 판단은 모델, 실행은 도구 (5교시)",body:`LLM은 말은 잘하지만 정확한 계산·실시간 조회·파일 저장 같은 '실제 행동'은 못 한다. 그래서 이런 일은 믿을 수 있는 도구(함수)에 맡기고, 모델은 '언제 어떤 도구를 쓸지'만 정하게 한다. 이 분업이 에이전트의 본질이다.
최소 형태는 이렇다: 도구 목록을 사전으로 두고(예: {'calc': 계산기}), 모델에게 '계산이 필요하면 CALC[식] 형식으로 답하라'고 안내한 뒤, 그 신호가 오면 우리가 실제 계산기 함수를 실행해 결과를 돌려준다.
핵심 포인트: 우리 RAG 서비스에서 '문서 검색'도 하나의 도구다. Day3에서 검색 워커를 에이전트의 도구로 꽂으면 Prompt·RAG·Agent가 한 서비스로 합쳐진다. 오늘은 도구를 붙이는 '틀'을 계산기 같은 쉬운 예로 먼저 익힌다.`},{h:"예외 처리로 안 죽는 서비스 만들기 (7교시)",body:`데모 도중 앱이 빨간 오류를 뿜으며 멈추는 것만큼 뼈아픈 일이 없다. 실서비스와 장난감의 차이는 '이상한 입력에도 죽지 않느냐'다. 세 곳만 막아도 대부분 안전해진다: ① 빈 질문 → 안내 문구 반환, ② 키·네트워크 오류 → try/except로 잡아 '잠시 후 다시'로 안내, ③ 검색 결과 0건 → '관련 문서를 못 찾았다'고 정직하게 답(지어내지 않기).
핵심 포인트: '모른다'고 말할 수 있는 서비스가 아무 말이나 지어내는 서비스보다 신뢰받는다. 근거를 못 찾으면 답을 만들지 말고 그 사실을 알린다.
활동으로: app.py에 빈 입력과 검색 0건 두 경우를 일부러 넣어 보고, 앱이 안내만 하고 계속 도는지 확인한다. 여기까지 되면 8교시 중간 시연에서 남에게 마음 놓고 자판을 내줄 수 있다.`}]},realCodes:[{title:"rag.py — 문서를 청킹·임베딩·검색하는 RAG 핵심 모듈",lang:"python",code:`# 수치 계산을 빠르게 해주는 numpy 를 가져온다
import numpy as np
# config 에서 키를 가져와 임베딩 API 를 쓸 클라이언트를 만든다
from config import API_KEY
from openai import OpenAI

# 서버와 통신할 클라이언트 생성
client = OpenAI(api_key=API_KEY)

# (1) 청킹: 긴 글을 size 글자씩 잘라 리스트로 돌려준다
def chunk_text(text, size=300):
    # range(시작, 끝, 간격) 로 0,300,600... 위치를 만든다
    # text[i:i+size] 는 i 부터 size 글자만큼 잘라낸 조각이다
    return [text[i:i + size] for i in range(0, len(text), size)]

# (2) 임베딩: 글 한 덩이를 의미 벡터(숫자 리스트)로 바꾼다
def embed(text):
    # embeddings.create 가 글을 벡터로 변환해 준다
    res = client.embeddings.create(model="text-embedding-3-small", input=text)
    # 응답에서 벡터 부분만 꺼내 numpy 배열로 만든다(계산을 위해)
    return np.array(res.data[0].embedding)

# (3) 색인: 모든 조각을 미리 벡터로 바꿔 (조각, 벡터) 쌍 목록을 만든다
def build_index(chunks):
    # 각 조각마다 embed 를 호출해 짝을 지어 리스트로 모은다
    return [(c, embed(c)) for c in chunks]

# (4) 검색: 질문과 가장 비슷한 조각 top_k 개를 골라 돌려준다
def search(query, index, top_k=2):
    q_vec = embed(query)  # 질문도 같은 방식으로 벡터화
    scored = []           # (유사도, 조각) 을 담을 빈 리스트
    for chunk, vec in index:              # 색인을 하나씩 비교
        # 코사인 유사도 = 내적 / (두 벡터 크기의 곱)
        sim = np.dot(q_vec, vec) / (np.linalg.norm(q_vec) * np.linalg.norm(vec))
        scored.append((sim, chunk))       # 점수와 조각을 함께 저장
    scored.sort(reverse=True)             # 점수 높은 순으로 정렬
    # 상위 top_k 개의 '조각 글'만 뽑아 리스트로 돌려준다
    return [chunk for _, chunk in scored[:top_k]]`,note:`문서를 잘라(chunk) 벡터로 바꾸고(embed) 질문과 가까운 조각을 찾는(search) RAG의 4단계가 모두 들어 있다.
검색에 외부 DB 없이 numpy만 써서 왕초보도 원리를 눈으로 따라갈 수 있게 했다.`},{title:"app.py — 검색 결과를 LLM에 붙여 답하는 전체 파이프라인",lang:"python",code:`# 방금 만든 rag 모듈의 함수들을 가져온다
from rag import chunk_text, build_index, search
from config import API_KEY, MODEL_NAME
from openai import OpenAI

client = OpenAI(api_key=API_KEY)  # LLM 호출용 클라이언트

# data/policy.txt 문서를 읽어 들인다(우리 지식의 원천)
with open("data/policy.txt", encoding="utf-8") as f:
    document = f.read()  # 파일 전체 내용을 문자열로 읽음

# 문서를 조각내고 미리 벡터 색인을 만들어 둔다(한 번만 해두면 재사용)
index = build_index(chunk_text(document))

# RAG로 답을 만드는 함수: 질문을 받아 근거를 찾고 LLM에 답을 시킨다
def answer(question):
    if not question.strip():            # 빈 질문이면(공백 제거 후 비었으면)
        return "질문을 입력해 주세요."   # 죽지 않고 안내만 한다(예외 처리)
    hits = search(question, index)      # 관련 문서 조각 top-k 검색
    context = "\\n".join(hits)           # 조각들을 줄바꿈으로 이어 근거 묶음 생성
    # 모델에게 '근거 안에서만 답하라'고 지시해 환각을 줄인다
    prompt = f"다음 근거만 참고해 답해줘.\\n근거:\\n{context}\\n\\n질문: {question}"
    res = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[{"role": "user", "content": prompt}],
    )
    reply = res.choices[0].message.content  # 답변 텍스트 추출
    # 답변과 함께 사용한 근거를 보여줘 출처를 투명하게 한다
    return f"{reply}\\n\\n[근거]\\n{context}"

# 터미널에서 직접 질문을 받아 답을 출력하는 간단한 반복 루프
if __name__ == "__main__":
    while True:                          # 사용자가 끝낼 때까지 계속
        q = input("\\n질문(종료는 q): ")  # 키보드 입력 받기
        if q == "q":                      # q 를 누르면
            break                         # 반복을 빠져나가 종료
        print(answer(q))                  # 답변 출력`,note:`입력→검색→근거 결합→LLM 생성→출력의 한 줄기가 끝까지 도는 완성형 미니 RAG 앱이다.
'근거만 참고하라'는 지시와 출처 출력으로 신뢰도를 높였다.`}],periods:["어제 설계 점검과 오늘 구현 목표 확정","[실습] LLM 호출 모듈(llm.py) 구현","[실습] RAG ① 문서 적재 · 청킹 · 임베딩 · 색인","[실습] RAG ② Retriever로 관련 문서 검색하기","[실습] Agent와 도구(Tool) 연동으로 기능 확장","[실습] 전체 파이프라인 통합(입력→검색→생성→출력)","[실습] 예외 처리와 안정화(빈 입력·키 오류 대응)","중간 시연과 팀 상호 피드백"]},"miniproject-3":{plan:{schedule:[{time:"09:00–09:50",topic:"오늘 목표 공유: 설계대로 구현해 AI 서비스로 완성하기"},{time:"10:00–10:50",topic:"[실습] 워커 에이전트 구현 ① 조사·검색 담당"},{time:"11:00–11:50",topic:"[실습] 워커 에이전트 구현 ② 작성·검수 담당"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"[실습] Supervisor 라우팅·종료 조건 연결"},{time:"14:00–14:50",topic:"[실습] 전체 멀티에이전트 파이프라인 통합·안정화"},{time:"15:00–15:50",topic:"[실습] 통합 시연 준비와 데모 시나리오 작성 (Docker 배포는 선택 심화)"},{time:"16:00–16:50",topic:"팀별 통합 시연 발표"},{time:"17:00–17:50",topic:"Course Wrap-up & QUIZ · 회고"}],practice:{title:"설계한 Supervisor 멀티에이전트를 구현해 AI 서비스로 완성",steps:["전날 만든 설계 문서(역할·라우팅·상태·흐름도)를 펼쳐 두고, 오늘 구현할 노드 순서를 체크리스트로 정리한다.","워커 에이전트를 하나씩 함수로 구현한다: 조사·검색 담당 노드가 도구를 호출해 자료를 모으는지 단독으로 먼저 확인한다.","작성·검수 담당 노드를 구현해, 조사 결과를 받아 초안을 쓰고 스스로 검수하는지 확인한다.","Supervisor 노드에 설계한 라우팅 규칙과 종료 조건(FINISH)을 연결하고, 조건 엣지로 워커 사이를 오가게 한다.","전체 그래프를 invoke 해 '입력 → Supervisor 분기 → 워커 협업 → 종료' 흐름이 한 번에 도는지 통합 실행한다.","빈 입력·도구 실패·무한루프 같은 예외 상황을 넣어, 서비스가 멈추지 않고 안내하거나 최대 반복에서 멈추는지 안정화한다.","데모 시나리오(질문 3개 → 기대 동작)를 적고 통합 시연을 리허설한다. (원하는 팀은 Docker로 포장해 배포까지 선택 심화로 진행)","팀별로 '문제 → 멀티에이전트 설계 → 시연 → 배운 점' 순서로 발표하고, 과정 전체를 돌아보는 회고를 남긴다."],deliverable:"멀티에이전트가 협업해 답하는 동작 서비스 + 데모(시연) + 과정 회고"}},examples:[{title:"assert로 직접 만드는 미니 테스트",lang:"python",code:`# 검사할 대상 함수: 숫자 두 개를 더한다
def add(a, b):
    return a + b

# assert: 뒤 조건이 참이면 조용히 통과, 거짓이면 오류를 내며 멈춘다
assert add(2, 3) == 5     # 2+3 은 5 가 맞는지 확인(통과)
assert add(-1, 1) == 0    # 음수 경우도 확인(통과)

print("add 함수 테스트 통과")  # 결과: add 함수 테스트 통과`,note:"assert 한 줄이면 '기대값과 같은지' 자동 검사가 되어, 테스트의 기본 원리를 바로 이해할 수 있다."},{title:"회고 항목을 표로 정리해 출력하기",lang:"python",code:`# KPT 회고: Keep(유지)·Problem(문제)·Try(시도) 세 칸으로 정리한다
retro = {
    "Keep": "매일 커밋해 진행상황을 공유한 점",  # 잘된 것
    "Problem": "청킹 크기를 너무 크게 잡아 검색이 부정확했던 점",  # 아쉬운 것
    "Try": "다음엔 chunk 크기를 200으로 줄여 실험해 보기",  # 다음 행동
}

# 딕셔너리를 키-값 쌍으로 돌며 보기 좋게 출력한다
for key, value in retro.items():   # items() 는 (키, 값) 쌍을 차례로 준다
    print(f"[{key}] {value}")
# 결과:
# [Keep] 매일 커밋해 진행상황을 공유한 점
# [Problem] 청킹 크기를 너무 크게 잡아 검색이 부정확했던 점
# [Try] 다음엔 chunk 크기를 200으로 줄여 실험해 보기`,note:"KPT(Keep·Problem·Try) 틀로 적으면 막연한 소감이 아니라 다음에 할 구체적 행동이 남는다."},{title:"부하 테스트(간이)",lang:"python",code:`import asyncio, httpx, time

async def hit(client):
    r = await client.post("http://localhost:8000/ask", json={"question": "q"})
    return r.status_code

async def main(n=50):
    # 동시 50요청을 보내 평균 응답시간/에러율을 측정
    async with httpx.AsyncClient(timeout=30) as c:
        t0 = time.perf_counter()
        codes = await asyncio.gather(*[hit(c) for _ in range(n)])
        dt = time.perf_counter() - t0
    ok = sum(c == 200 for c in codes)
    print(f"{ok}/{n} 성공, 총 {dt:.1f}s, 평균 {dt/n*1000:.0f}ms")

asyncio.run(main())`,note:"배포 전 동시 요청을 흘려 병목·에러율을 확인한다. 무료 호스팅의 콜드스타트·타임아웃도 함께 점검."},{title:"Supervisor 멀티에이전트를 실제로 엮기",lang:"python",code:`from langgraph.graph import StateGraph, START, END

# 감독이 워커(researcher/writer)를 번갈아 호출해 작업을 완성한다
def supervisor(state):
    nxt = llm.invoke(
        f"진행상황:{state['log']}\\n다음: [researcher, writer, FINISH]"
    ).content.strip()
    return {"next": nxt}

g = StateGraph(State)
g.add_node("supervisor", supervisor)
g.add_node("researcher", research_node)   # 자료 수집 전문
g.add_node("writer", write_node)          # 글 작성 전문
g.add_edge(START, "supervisor")
# 감독의 결정(next)에 따라 워커로 분기 → 다시 감독으로 복귀
g.add_conditional_edges("supervisor", lambda s: s["next"],
    {"researcher": "researcher", "writer": "writer", "FINISH": END})
g.add_edge("researcher", "supervisor")
g.add_edge("writer", "supervisor")
app = g.compile()`,note:"미니프로젝트 최종 산출물의 뼈대. 감독-워커 구조로 역할을 나누면 각 에이전트가 단순해지고 디버깅이 쉬워진다."},{title:"최종 발표 데모 안전장치 — 실패해도 안 멈추게",lang:"python",code:`# 발표 중 외부 API·모델이 죽어도 데모가 이어지도록 안전망을 둔다
def safe_run(agent, query, fallback="죄송합니다, 잠시 후 다시 시도해주세요."):
    try:
        return agent.invoke({"query": query})
    except Exception as e:
        log.exception(e)          # 원인은 로그로 남기고
        return {"answer": fallback}  # 화면엔 친절한 대체 메시지

# 시연 시나리오는 미리 캐시해 두면 네트워크 사고에도 안전
DEMO_CACHE = {"핵심 질문": "미리 준비한 모범 답변"}`,note:"발표는 리허설이 전부다. try/except 폴백과 시연 캐시로, 네트워크·API 사고가 나도 데모가 끊기지 않게 만든다."}],concepts:[{term:"테스트(Test)",desc:"코드가 기대대로 동작하는지 미리 정한 입력·정답으로 자동 확인하는 일로, 출고 전 품질검사와 같다."},{term:"단위 테스트(Unit test)",desc:"함수 하나하나가 제대로 도는지 작게 검사하는 것으로, 부품별 검사를 통과해야 전체가 안전하다."},{term:"requirements.txt",desc:"이 프로젝트가 필요로 하는 라이브러리와 버전을 적어둔 목록으로, 남이 똑같은 환경을 재현하게 돕는 재료표이다."},{term:"Docker(도커)",desc:"앱과 그 실행환경을 통째로 상자에 담아 어디서나 똑같이 돌게 하는 기술로, 이사할 때 짐을 컨테이너째 옮기는 것과 같다."},{term:"이미지(Image)와 컨테이너(Container)",desc:"이미지는 포장된 설계도이고 컨테이너는 그것을 실제로 켠 실행 상태로, 붕어빵 틀과 붕어빵의 관계와 같다."},{term:"배포(Deploy)",desc:"내 컴퓨터에서만 되던 앱을 남도 쓸 수 있는 환경에 올려 서비스하는 일이다."},{term:"회고(Retrospective)",desc:"프로젝트가 끝난 뒤 잘된 점·아쉬운 점·다음에 할 일을 함께 돌아보며 정리하는 시간이다."}],detail:{topics:[{h:"배포 전 점검 리스트",items:["핵심 기능 테스트 통과","requirements.txt 최신화",".env가 깃에 올라가지 않았는지 확인","README에 실행 방법 명시"]},{h:"Docker 기본 명령",items:["docker build -t 이름 . (이미지 만들기)","docker run --env-file .env -it 이름 (실행)","docker ps (켜진 컨테이너 보기)","docker logs 컨테이너ID (로그 확인)"]},{h:"발표 구성(5분)",items:["해결한 문제 한 문장","아키텍처와 핵심 기술 설명","실시간 시연(질문→답변)","어려웠던 점과 배운 점·회고"]},{h:"전 과정 Wrap-up 체크리스트",items:["Prompt 설계: 역할·지시·예시·제약으로 원하는 출력을 유도했는가","Context/RAG: 근거 문서를 검색해 넣고 출처를 제시했는가","Harness: 도구·오류처리·관측 등 주변 장치를 갖췄는가","Supervisor Agent: 작업자들을 지휘하고 종료 조건을 두었는가"]},{h:"Agentic RAG 개선 포인트",items:["질의 재작성으로 검색이 잘 되게 다듬기","검색 결과 grading으로 쓸만한 근거만 남기기","근거가 부족하면 재검색 루프 돌리기","끝내 근거가 없으면 '모른다'로 안전하게 처리"]},{h:"RAG 정량 평가 항목",items:["검색 정확도: 관련 문서를 제대로 찾아왔는가","근거 충실도: 답이 근거에 실제로 기반했는가","답변 관련성: 질문에 맞는 답을 했는가","샘플 QA셋 5~10개를 만들어 점수를 표로 집계"]}],labs:[{title:"Lab 1. 테스트로 버그 잡기",steps:["test_app.py를 위 realCode대로 작성한다","'pip install pytest' 후 'pytest -q' 를 실행한다","실패하는 테스트가 있으면 빨간 메시지를 읽고 app.py를 고친다","어제 메모한 '잘 못 답하는 질문'으로 top_k나 chunk size를 조정한다","다시 'pytest -q' 를 돌려 전부 통과(초록)되는지 확인한다"]},{title:"Lab 2. Docker로 포장해 실행하기",steps:["'pip freeze > requirements.txt' 로 의존성 목록을 만든다","Dockerfile을 위 realCode대로 작성한다","'docker build -t ai-mini .' 로 이미지를 빌드한다(처음엔 다운로드로 시간이 걸린다)","'docker run --env-file .env -it ai-mini' 로 컨테이너를 실행한다","컨테이너 안에서 질문을 입력해 같은 답이 나오는지 확인한다",`확인되면 'git add . && git commit -m "테스트·도커 배포"' 로 커밋한다`]},{title:"Lab 3. 발표 리허설과 회고",steps:["데모 질문 3개와 기대 답변을 README에 적는다","문제→해결→시연→배운 점 순서로 5분 발표를 한 번 연습한다","KPT(Keep·Problem·Try)로 회고를 작성해 README 맨 아래 추가한다","최종 커밋과 함께 원격 저장소에 push 한다"]},{title:"Lab 4. naive RAG 개선하고 점수로 비교하기",steps:["naive RAG로 답하게 한 뒤 틀리거나 근거가 약한 실패 사례를 찾는다","검색 결과 grading과 재검색 루프를 붙여 Agentic하게 개선한다","샘플 QA셋 5~10개로 개선 전/후 점수를 각각 측정한다","개선 전/후 점수 비교표를 만들어 무엇이 좋아졌는지 정리한다"]},{title:"Lab. 팀 상호 코드 리뷰 30분 (7교시 실습)",steps:["옆 팀과 저장소를 맞바꿔, 각자 5분간 README의 실행법 그대로 직접 돌려 본다(안 돌아가면 그 자체가 첫 피드백)","리뷰 관점 네 가지로 살핀다: ① 키가 코드에 노출되지 않았나(.env 분리) ② 빈 입력·오류에 안 죽나 ③ 함수 이름만 봐도 역할이 읽히나 ④ 답에 근거(출처)를 함께 보여 주나","좋은 점 1개와 고칠 점 1개를 상대 저장소의 이슈나 메모로 남긴다(말투는 제안형으로)","받은 피드백 중 5분 안에 고칠 수 있는 것 1개를 즉시 반영하고 커밋한다","무엇을 고쳤는지 한 줄로 README의 회고(KPT) 아래에 추가한다"]}],homework:["프로젝트 README를 최종본으로 다듬어(주제·실행법·아키텍처·회고 포함) 팀 저장소에 push 하기","이번 미니 프로젝트에서 더 발전시키고 싶은 기능 1개를 골라, 어떤 기술(재순위·메모리·웹UI 등)로 확장할지 3줄로 적어 제출하기","RAG 정량 평가 결과물(검색 정확도·근거 충실도·답변 관련성 점수표)을 제출하기"]},theory:{theory:[{h:"설계를 코드로 - Supervisor와 워커 구현",body:`Day2의 설계대로 Supervisor 함수와 워커 함수들을 만든다.
공유 상태(dict나 객체)를 돌려가며 Supervisor가 워커를 호출 → 결과 취합 → 종료 판단하는 루프를 구현한다.
각 워커의 프롬프트는 짧고 분명하게, Supervisor의 프롬프트에는 라우팅 규칙과 종료 조건을 그대로 옮긴다.`},{h:"서비스로 엮기",body:`여기에 Day1에서 개선한 Agentic RAG를 '검색 워커'로 꽂아 넣으면 전 과정이 한 서비스로 합쳐진다.
사용자의 질문이 Supervisor로 들어오면, 검색 워커가 근거를 찾고 작성 워커가 답을 다듬는 식으로 협업한다.
Prompt·Context·Harness·RAG·Agent가 하나의 흐름으로 모이는 순간이다.`},{h:"시연과 Wrap-up, 그리고 QUIZ",body:`데모 질문으로 멀티 에이전트가 협업해 답을 만드는 과정을 직접 보여준다.
그런 뒤 전체 과정(Prompt·Context·Harness·RAG·Agent)을 한 장으로 정리하고, 배운 것을 확인하는 QUIZ로 마무리한다.
도커 배포 같은 운영 주제는 선택 심화로 짧게만 짚고, 오늘의 중심은 '멀티 에이전트로 서비스를 완성해 보이는 것'에 둔다.`},{h:"오늘의 목표와 테스트 전략 — 무엇을, 어떻게 확인할까 (1교시)",body:`오늘은 '만들기'가 아니라 '믿을 수 있게 만들기'다. 발표 전에 우리 앱이 정말 도는지 손이 아니라 코드로 확인한다. 무엇을 테스트할까 — 전부가 아니라 '깨지면 데모가 망하는' 핵심만 고른다: ① 정상 질문에 답과 근거가 나오는가, ② 빈 입력에 안 죽는가, ③ 검색이 관련 조각을 가져오는가.
어떻게 — assert 한 줄이 곧 테스트다. '기대값과 같은가'를 assert로 적어 두면, 코드를 고칠 때마다 pytest 한 번으로 전부 다시 확인된다. 초록(통과)이면 안심하고 배포·발표로 넘어간다.
핵심 포인트: 테스트는 '완벽 검증'이 아니라 '내가 방금 고친 게 다른 걸 망가뜨리지 않았다'는 안전망이다. 적게라도 있는 게 없는 것보다 훨씬 낫다. 오늘 하루를 '테스트 → 배포 → 발표'의 세 관문으로 잡고 시작한다.`},{h:"컨테이너로 배포한다는 것 — '내 컴퓨터에선 되는데'를 없애기 (3교시)",body:`우리 앱은 특정 파이썬 버전·라이브러리·환경변수 위에서 돈다. 그대로 다른 컴퓨터에 옮기면 버전이 달라 안 도는 일이 흔하다 — 이른바 '제 컴퓨터에선 됐는데요' 문제다. 컨테이너(Docker)는 앱과 그 실행 환경을 통째로 상자에 담아, 어디서 열어도 똑같이 돌게 만든다.
Dockerfile은 그 상자를 만드는 설명서다: 어떤 파이썬 위에(FROM), 어떤 폴더에서(WORKDIR), 무엇을 설치하고(requirements 설치), 무엇을 실행할지(CMD)를 순서대로 적는다. requirements.txt는 'pip freeze'로 지금 쓰는 라이브러리 목록을 뽑아 둔 것이라, 상자 안에서 같은 버전이 설치되도록 보장한다.
핵심 포인트: 키(.env)는 상자 안에 굽지 않고, 실행할 때 --env-file로 바깥에서 주입한다. '비밀은 이미지에 넣지 않는다'는 원칙을 지키는 것이 안전 배포의 기본이다.`},{h:"코드 리뷰 — 서로의 코드를 읽는 네 가지 관점 (7교시)",body:`코드 리뷰는 흠을 잡는 자리가 아니라 '남이 읽어도 이해되는가'를 확인하는 자리다. 짧은 시간에 볼 곳은 네 군데다: ① 안전 — 키가 코드에 노출되진 않았나(.env로 뺐나), ② 견고함 — 빈 입력·오류에 죽지 않나, ③ 가독성 — 함수 이름만 봐도 역할이 읽히나, ④ 정직함 — 답에 근거(출처)를 함께 보여 주나.
리뷰의 예의: '이건 틀렸다'가 아니라 '여기서 이렇게 하면 이런 경우에 더 안전할 것 같다'로 말한다. 받는 쪽도 방어하지 말고, 5분 안에 고칠 수 있는 한 가지를 바로 반영해 본다.
핵심 포인트: 남의 코드를 읽는 30분이 내 코드를 보는 눈을 가장 빨리 키운다. 오늘 배운 네 관점을 옆 팀 프로젝트에서 직접 확인하는 시간으로 삼는다.`}]},realCodes:[{title:"test_app.py — 핵심 기능을 자동으로 검증하는 단위 테스트",lang:"python",code:`# 우리가 만든 app 모듈에서 answer 함수를 가져온다
from app import answer

# 테스트 1: 빈 질문을 넣으면 안내 메시지가 나와야 한다
def test_empty_question():
    result = answer("")            # 빈 문자열을 입력
    # assert 는 '뒤 조건이 참이어야 한다'는 검사. 거짓이면 테스트 실패
    assert "입력" in result        # 안내 문구에 '입력'이 들어 있는지 확인

# 테스트 2: 정상 질문에는 답변과 근거가 함께 나와야 한다
def test_answer_has_context():
    result = answer("환불 규정 알려줘")  # 실제 시나리오 질문
    assert "[근거]" in result             # 출처 블록이 포함됐는지 확인
    assert len(result) > 10               # 답이 너무 짧지 않은지 확인

# 이 파일을 직접 실행하면 두 테스트를 차례로 돌려 결과를 출력한다
if __name__ == "__main__":
    test_empty_question()   # 첫 테스트 실행
    test_answer_has_context()  # 둘째 테스트 실행
    print("모든 테스트 통과!")  # 결과: 모든 테스트 통과! (실패하면 여기까지 못 옴)`,note:`핵심 함수 answer가 '빈 입력 처리'와 '근거 포함 응답'을 지키는지 자동으로 확인한다.
'pytest test_app.py' 또는 'python test_app.py'로 돌리며, 통과 문구가 보이면 안전하게 배포할 수 있다.`},{title:"Dockerfile — 앱을 어디서나 똑같이 실행되게 포장하기",lang:"bash",code:`# FROM: 어떤 기반 환경 위에 만들지 정한다(파이썬 3.11이 깔린 가벼운 리눅스)
FROM python:3.11-slim

# WORKDIR: 컨테이너 안에서 작업할 기본 폴더를 /app 으로 지정한다
WORKDIR /app

# COPY: 먼저 requirements.txt만 복사한다(자주 안 바뀌어 캐시 활용에 유리)
COPY requirements.txt .

# RUN: 라이브러리를 설치한다. --no-cache-dir 로 이미지 용량을 줄인다
RUN pip install --no-cache-dir -r requirements.txt

# COPY: 나머지 우리 소스코드 전부를 컨테이너로 복사한다
COPY . .

# CMD: 컨테이너가 켜질 때 실행할 명령(우리 앱 시작)
CMD ["python", "app.py"]`,note:`기반 이미지 선택→작업폴더→의존성 설치→코드 복사→실행의 순서로 앱을 통째로 포장한다.
'docker build -t ai-mini .' 로 이미지를 만들고 'docker run --env-file .env -it ai-mini' 로 키를 주입해 실행한다.`}],periods:["오늘 목표 공유와 테스트 전략 안내","[실습] 기능 테스트와 버그 수정","[실습] requirements.txt 정리와 Dockerfile 작성","[실습] 컨테이너 빌드·실행으로 배포 환경 만들기","[실습] 데모 시나리오 작성과 발표 리허설","팀별 결과 발표 (시연 + 설명)","상호 피드백과 코드 리뷰","회고와 개선점 정리 · 수료"]}};export{e as default};
