import{j as e}from"./index-C-F3ZqZc.js";import{f as j,g as _,L as n}from"./react-vendor-DkQmGj46.js";import{a as R,p as o}from"./resources-CyQw0xRC.js";import{R as b}from"./Rating-DJu_XRew.js";import{C as v}from"./CodeBlock-MfYWPPem.js";import{R as l}from"./Rich-B0aME1yR.js";import"./supabase-x7pv8hHy.js";const P={python:{overview:"Python은 동적 타입·인터프리터 언어로 가독성과 풍부한 생태계가 강점이다. AI 실습에서는 표준 라이브러리와 NumPy/Pandas 같은 과학 스택, 가상환경 기반 의존성 관리가 핵심 기본기다.",advanced:[{h:"데이터 모델·이터러블",items:["이터레이터/제너레이터(yield)로 지연 평가","comprehension·generator expression","collections(Counter·defaultdict·deque)","__iter__/__next__·컨텍스트 매니저(with)"]},{h:"실무 품질",items:["타입 힌트(typing)와 mypy","데코레이터로 횡단 관심사(로깅·캐싱)","logging 모듈(print 대신)","pytest 단위 테스트"]}],examples:[{title:"제너레이터로 대용량 파일 메모리 효율 처리",lang:"python",code:`def read_large(path):
    # 한 줄씩 yield → 파일 전체를 메모리에 올리지 않음
    with open(path, encoding="utf-8") as f:
        for line in f:
            yield line.rstrip("\\n")

# 100만 줄도 일정 메모리로 처리 (지연 평가)
error_count = sum(1 for line in read_large("app.log") if "ERROR" in line)
print("에러 라인:", error_count)`,note:"제너레이터는 값을 필요할 때 하나씩 생성해 메모리를 아낀다. 로그·CSV 등 대용량 처리의 기본 패턴."}],pitfalls:["가변 기본 인자(def f(x=[]))는 공유돼 버그 유발 → None 후 내부 생성","얕은 복사 vs 깊은 복사(copy.deepcopy) 혼동","전역 변수 남용 → 함수 인자/반환으로"],checklist:["가상환경(venv) 사용","requirements.txt 고정","타입 힌트·docstring","예외 처리·로깅"]},streamlit:{overview:"Streamlit은 스크립트가 위에서 아래로 매 상호작용마다 재실행되는 모델이다. 이 특성을 이해하고 session_state·캐시를 활용해야 상태 유지와 성능을 동시에 잡을 수 있다.",advanced:[{h:"상태·성능",items:["st.session_state로 위젯 간 상태 공유","@st.cache_data(데이터)·@st.cache_resource(모델/커넥션)","st.form으로 일괄 제출(재실행 최소화)","st.fragment로 부분 갱신"]},{h:"AI 챗 UI",items:["st.chat_message·st.chat_input","st.write_stream으로 토큰 스트리밍","st.secrets로 API 키 관리"]}],examples:[{title:"LLM 챗봇 + 스트리밍 + 세션 상태",lang:"python",code:`import streamlit as st

if "msgs" not in st.session_state:      # 최초 1회만 초기화
    st.session_state.msgs = []

for m in st.session_state.msgs:         # 이전 대화 렌더
    st.chat_message(m["role"]).write(m["content"])

if prompt := st.chat_input("질문하세요"):
    st.session_state.msgs.append({"role": "user", "content": prompt})
    st.chat_message("user").write(prompt)
    with st.chat_message("assistant"):
        answer = st.write_stream(llm.stream(prompt))   # 토큰 스트리밍 표시
    st.session_state.msgs.append({"role": "assistant", "content": answer})`,note:"session_state로 대화를 유지하고 write_stream으로 실시간 출력. 재실행 모델에서도 상태가 보존된다."}],pitfalls:["전역 변수로 상태 유지 시도 → 재실행에 사라짐(session_state 사용)","모델을 매 실행마다 로드 → @st.cache_resource","느린 데이터 로딩 캐시 누락"],checklist:["session_state로 상태","캐시 적용","secrets로 키","배포(Community Cloud)"]},gradio:{overview:"Gradio는 함수 하나로 ML 데모 UI를 만든다. Interface는 빠른 데모에, Blocks는 커스텀 레이아웃·다중 이벤트에 적합하다. ChatInterface는 LLM 챗봇을 한 줄로 만든다.",advanced:[{h:"구성",items:["Interface vs Blocks 선택 기준","이벤트(.click/.change)와 상태(gr.State)","examples로 샘플 입력 제공"]},{h:"운영",items:["queue()로 동시성·스트리밍","concurrency_limit","Hugging Face Spaces 배포"]}],examples:[{title:"ChatInterface로 스트리밍 챗봇",lang:"python",code:`import gradio as gr

def respond(message, history):
    partial = ""
    for chunk in llm.stream(message):   # 토큰 스트리밍
        partial += chunk
        yield partial                   # 누적 텍스트를 계속 반환 → 타자 효과

gr.ChatInterface(respond, title="AI 도우미").queue().launch()`,note:"ChatInterface는 (message, history)를 받는 함수만으로 챗봇 완성. yield로 스트리밍, queue로 동시 요청 처리."}],pitfalls:["무거운 모델을 함수 안에서 로드 → 전역 1회 로드","share=True 링크는 임시(72h)","queue 없이 동시 요청 → 병목"],checklist:["Interface/Blocks 선택","examples 제공","queue 설정","Spaces 배포"]},django:{overview:"Django는 ORM·관리자·인증이 내장된 풀스택 프레임워크로 큰 규모 백엔드에 적합하다. MTV 구조와 마이그레이션 흐름, DRF로 API화를 익히면 견고한 서비스를 빠르게 만든다.",advanced:[{h:"ORM 심화",items:["select_related/prefetch_related로 N+1 해결","annotate/aggregate 집계","Q 객체로 복합 조건","인덱스·db_index"]},{h:"API·구조",items:["DRF Serializer·ViewSet·Router","인증(Token/JWT)·권한","settings 환경분리(.env)"]}],examples:[{title:"DRF로 REST API (ViewSet + Serializer)",lang:"python",code:`# serializers.py
from rest_framework import serializers
from .models import Post
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "title", "body", "created"]

# views.py — CRUD 자동 제공
from rest_framework import viewsets
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by("-created")  # N+1 주의
    serializer_class = PostSerializer

# urls.py
from rest_framework.routers import DefaultRouter
router = DefaultRouter(); router.register("posts", PostViewSet)
urlpatterns = router.urls   # /posts/ GET·POST, /posts/{id}/ ...`,note:"ModelViewSet + Router로 CRUD API가 자동 생성된다. 목록 조회 시 N+1을 select_related로 예방."}],pitfalls:["모델 변경 후 makemigrations/migrate 누락","N+1 쿼리(반복 접근)","SECRET_KEY·DEBUG 하드코딩"],checklist:["마이그레이션 관리","N+1 점검","환경변수 분리","admin 활용"]},flask:{overview:"Flask는 최소 코어에 확장을 더해 쓰는 마이크로 프레임워크다. AI 추론 API를 가볍게 만들기 좋으며, Blueprint로 모듈화하고 gunicorn으로 운영 서빙한다.",advanced:[{h:"구조",items:["application factory 패턴","Blueprint로 모듈 분리","설정 클래스(Config)·환경변수"]},{h:"운영",items:["gunicorn 워커 수","flask-cors","에러 핸들러·로깅"]}],examples:[{title:"모델 추론 API + 에러 핸들러",lang:"python",code:`from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load("model.pkl")        # 시작 시 1회 로드

@app.post("/predict")
def predict():
    data = request.get_json(silent=True) or {}
    if "features" not in data:          # 입력 검증
        return jsonify(error="features 필요"), 400
    pred = model.predict([data["features"]])[0]
    return jsonify(prediction=int(pred))

@app.errorhandler(500)                   # 공통 에러 처리
def on_error(e):
    return jsonify(error="서버 오류"), 500
# 운영: gunicorn -w 4 app:app`,note:"모델을 전역 1회 로드, 입력을 검증하고 공통 에러 핸들러로 안전한 응답을 반환. 운영은 gunicorn 멀티 워커."}],pitfalls:["debug=True를 운영에 사용","get_json()에서 None 미처리","단일 프로세스로 운영(gunicorn 미사용)"],checklist:["Blueprint 모듈화","입력 검증","CORS·에러 처리","gunicorn 서빙"]},render:{overview:"Render는 GitHub 연동으로 웹 서비스·정적 사이트를 간단히 배포하는 PaaS다. Build/Start Command와 환경변수, $PORT 바인딩만 맞추면 자동 배포된다.",advanced:[{h:"배포 설정",items:["Web Service vs Static Site","Build/Start Command","$PORT 바인딩(필수)","Health Check Path"]},{h:"운영",items:["환경변수/시크릿","무료 플랜 콜드스타트","render.yaml(IaC)"]}],examples:[{title:"render.yaml (서비스 정의)",lang:"yaml",code:`services:
  - type: web
    name: infer-api
    env: python
    buildCommand: pip install -r requirements.txt
    # 반드시 $PORT 에 바인딩해야 외부 노출됨
    startCommand: gunicorn app:app --bind 0.0.0.0:$PORT
    healthCheckPath: /health
    envVars:
      - key: OPENAI_API_KEY
        sync: false        # 대시보드에서 수동 입력(비밀)`,note:"render.yaml로 배포를 코드화(IaC). $PORT 바인딩과 healthCheckPath가 핵심. 비밀값은 sync:false로 대시보드 입력."}],pitfalls:["고정 포트 사용($PORT 무시) → 노출 실패","requirements/빌드 명령 누락","무료 플랜 슬립으로 첫 응답 지연"],checklist:["$PORT 바인딩","Build/Start 설정","환경변수","헬스체크"]},supabase:{overview:"Supabase는 Postgres 위에 인증·스토리지·실시간·벡터(pgvector)를 얹은 오픈소스 BaaS다. RLS로 행 단위 보안을 강제하고, 클라이언트 SDK로 빠르게 개발한다.",advanced:[{h:"보안(RLS)",items:["테이블별 RLS 활성화","auth.uid() 기반 정책","anon vs service_role 키","Policy(select/insert/update/delete)"]},{h:"AI·실시간",items:["pgvector로 임베딩 검색","Realtime 구독","Edge Functions"]}],examples:[{title:"RLS 정책 (본인 데이터만)",lang:"sql",code:`alter table posts enable row level security;

-- 누구나 읽기
create policy "read" on posts for select using (true);
-- 작성자 본인만 수정/삭제
create policy "own_write" on posts for update
  using (auth.uid() = author_id);
create policy "own_delete" on posts for delete
  using (auth.uid() = author_id);
-- 로그인 사용자만 작성(작성자 = 본인)
create policy "insert" on posts for insert
  with check (auth.uid() = author_id);`,note:"RLS는 기본 보안 수칙. auth.uid()로 본인 데이터만 쓰게 제한한다. service_role 키는 RLS를 우회하므로 절대 노출 금지."}],pitfalls:["RLS 미설정 → 데이터 전체 노출","service_role 키 클라이언트 노출","임베딩 차원 불일치"],checklist:["RLS 정책","anon 키만 클라이언트","인덱스","pgvector(AI)"]},git:{overview:"Git은 분산 버전관리로 협업의 표준이다. 브랜치 전략과 PR·코드리뷰 흐름, 충돌 해결과 되돌리기(reset/revert)를 익히면 안전하게 협업한다.",advanced:[{h:"브랜치 전략",items:["trunk-based vs Git Flow","feature 브랜치 + PR","rebase vs merge","squash merge"]},{h:"되돌리기·정리",items:["reset(soft/mixed/hard)","revert(공유 이력)","stash","cherry-pick"]}],examples:[{title:"충돌 해결 흐름",lang:"bash",code:`git switch feature/login
git fetch origin
git merge origin/main          # 또는 rebase
# 충돌 발생 시: 파일의 <<<<<<< ======= >>>>>>> 표시 구간을 수정
git add <해결한 파일>           # 해결 표시
git commit                     # merge 마무리 (rebase면 git rebase --continue)
git push`,note:"충돌은 자주 pull/merge로 작게 자주 해결하는 게 안전하다. 표시 구간(<<< === >>>)을 직접 정리 후 add."}],pitfalls:["main 직접 push","force push로 동료 커밋 유실","거대한 한 번 커밋(작게 자주)"],checklist:["브랜치+PR","커밋 컨벤션",".gitignore","리뷰 후 머지"]},cli:{overview:"명령줄은 개발·배포·서버 작업의 공통 언어다. 파일 조작·텍스트 검색·파이프·권한·프로세스 관리를 익히면 자동화와 디버깅이 빨라진다.",advanced:[{h:"텍스트 처리",items:["grep/sed/awk 조합","파이프(|)·xargs","리다이렉션(>, >>, 2>&1)"]},{h:"운영",items:["ps/top/kill·시그널","chmod/chown 권한","환경변수·alias","ssh/scp"]}],examples:[{title:"로그 분석 원라이너",lang:"bash",code:`# 최근 로그에서 상태코드별 횟수 집계 (상위 5)
awk '{print $9}' access.log \\
  | sort | uniq -c | sort -rn | head -5

# 특정 에러를 실시간 추적
tail -f app.log | grep --line-buffered "ERROR"`,note:"awk로 필드 추출 → sort|uniq -c로 집계 → 정렬. 파이프 조합이 CLI의 힘. tail -f|grep으로 실시간 모니터링."}],pitfalls:["rm -rf 경로 오타(복구 불가)","권한 없이 sudo 남용","따옴표 미사용으로 공백 경로 깨짐"],checklist:["파이프 조합","권한 이해","환경변수","ssh 키"]},javascript:{overview:"JavaScript는 비동기·이벤트 기반 언어로 프론트엔드의 핵심이다. ES6+ 문법(구조분해·모듈·async/await)과 이벤트 루프·프로미스를 이해하면 Vue 학습이 수월하다.",advanced:[{h:"비동기",items:["이벤트 루프·마이크로태스크","Promise.all/allSettled","async/await 에러 처리","AbortController"]},{h:"함수형·불변성",items:["map/filter/reduce","스프레드·불변 업데이트","클로저","옵셔널 체이닝/널 병합"]}],examples:[{title:"병렬 요청 + 에러 처리",lang:"javascript",code:`// 여러 API를 동시에 호출(병렬) → 전체 대기 시간 단축
async function loadDashboard(ids) {
  try {
    const results = await Promise.all(
      ids.map((id) => fetch(\`/api/items/\${id}\`).then((r) => {
        if (!r.ok) throw new Error(\`\${id} 실패: \${r.status}\`)
        return r.json()
      })),
    )
    return results               // 모든 결과 배열
  } catch (e) {
    console.error("로드 실패:", e.message)   // 하나라도 실패하면 여기로
    return []
  }
}`,note:"Promise.all로 병렬 처리해 지연을 줄인다(직렬 대비 빠름). 하나라도 실패하면 catch로 — 부분 허용은 allSettled."}],pitfalls:["== 대신 === 사용","forEach에서 await 미작동(for...of 사용)","this 바인딩(화살표 함수)"],checklist:["const 우선","async/await 에러 처리","불변 업데이트","모듈 분리"]},"html-css":{overview:"HTML은 의미 있는 구조를, CSS는 표현을 담당한다. 시맨틱 마크업·접근성과 Flexbox/Grid 레이아웃, 반응형(미디어 쿼리)을 익히면 견고한 UI를 만든다.",advanced:[{h:"레이아웃",items:["Flexbox 축·정렬","Grid 템플릿·영역","position·z-index","rem/em/%/clamp"]},{h:"품질",items:["시맨틱 태그·ARIA","반응형(모바일 퍼스트)","CSS 변수(커스텀 프로퍼티)"]}],examples:[{title:"반응형 카드 그리드 (Grid + 미디어쿼리)",lang:"html",code:`<style>
  .grid {
    display: grid;
    /* 화면 폭에 맞춰 자동 줄바꿈 (최소 220px) */
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
  }
  @media (max-width: 480px) {       /* 모바일: 1열 */
    .grid { grid-template-columns: 1fr; }
  }
</style>
<div class="grid">
  <article class="card">A</article>
  <article class="card">B</article>
</div>`,note:"auto-fill + minmax로 미디어쿼리 없이도 반응형 그리드가 된다. 시맨틱 태그(article)로 의미 부여."}],pitfalls:["div 남발(시맨틱 무시)","px 고정으로 반응형 깨짐","alt/label 누락(접근성)"],checklist:["시맨틱 태그","Flex/Grid","반응형","접근성"]},sql:{overview:"SQL은 관계형 데이터 조회·조작의 표준 언어다. 조인·집계·서브쿼리와 인덱스·트랜잭션을 이해하면 정확하고 빠른 데이터 처리를 할 수 있다.",advanced:[{h:"조회 심화",items:["INNER/LEFT/FULL JOIN","서브쿼리·CTE(WITH)","윈도우 함수(ROW_NUMBER/RANK)","GROUP BY·HAVING"]},{h:"성능·안정",items:["인덱스와 실행계획(EXPLAIN)","트랜잭션·격리수준","NULL 처리"]}],examples:[{title:"윈도우 함수로 그룹별 상위 N",lang:"sql",code:`-- 부서별 급여 상위 3명
WITH ranked AS (
  SELECT name, dept, salary,
         ROW_NUMBER() OVER (
           PARTITION BY dept ORDER BY salary DESC   -- 부서별 순위
         ) AS rn
  FROM employees
)
SELECT name, dept, salary
FROM ranked
WHERE rn <= 3;     -- 각 부서 상위 3명`,note:'PARTITION BY로 그룹을 나누고 ORDER BY로 순위를 매기는 윈도우 함수. GROUP BY로는 어려운 "그룹별 상위 N"을 해결.'}],pitfalls:["대량 UPDATE/DELETE 전 SELECT 미확인","인덱스 없는 컬럼 조건(풀스캔)","NULL = NULL 비교(IS NULL 사용)"],checklist:["조인·집계","인덱스","트랜잭션","EXPLAIN 확인"]},pandas:{overview:"Pandas/NumPy는 데이터 분석·전처리의 핵심이다. 벡터 연산으로 반복문을 대체하고, 결측치·타입·집계를 다루는 능력이 ML 실습의 토대가 된다.",advanced:[{h:"Pandas",items:["loc/iloc·boolean indexing","groupby-agg-transform","merge/join·concat","pivot_table"]},{h:"성능·품질",items:["벡터 연산 vs apply/loop","dtype 최적화(category)","SettingWithCopy 경고"]}],examples:[{title:"groupby + transform으로 결측치 그룹 대치",lang:"python",code:`import pandas as pd
df = pd.read_csv("data.csv")

# 도시별 중앙값으로 결측 age 대치 (그룹별, 벡터 연산)
df["age"] = df["age"].fillna(
    df.groupby("city")["age"].transform("median")
)

# 도시별 평균가·건수 집계
summary = df.groupby("city").agg(
    avg_price=("price", "mean"),
    n=("price", "size"),
).sort_values("avg_price", ascending=False)
print(summary.head())`,note:"transform은 그룹 집계 결과를 원본 행 길이에 맞춰 돌려줘 결측 대치에 적합. 반복문 대신 벡터 연산으로 빠르다."}],pitfalls:["반복문으로 행 순회(느림) → 벡터화","chained indexing(df[a][b]=) → .loc","dtype 미확인(문자 섞임)"],checklist:["벡터 연산","groupby","결측·타입 처리","merge 키 확인"]},docker:{overview:"Docker는 애플리케이션과 의존성을 이미지로 패키징해 어디서나 동일하게 실행한다. 레이어 캐시·멀티스테이지·compose를 익히면 가볍고 재현 가능한 배포를 만든다.",advanced:[{h:"이미지 최적화",items:["레이어 캐시 순서","멀티스테이지 빌드",".dockerignore","slim/distroless"]},{h:"운영",items:["volume·네트워크","compose 다중 서비스","환경변수·시크릿","healthcheck"]}],examples:[{title:"멀티스테이지 빌드 (빌드/런타임 분리)",lang:"docker",code:`# 1단계: 빌드 (의존성 컴파일)
FROM python:3.11 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

# 2단계: 런타임 (slim, 빌드 결과만 복사 → 이미지 경량화)
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000"]`,note:"멀티스테이지로 빌드 도구를 런타임 이미지에서 제외해 용량·공격면을 줄인다. 의존성 레이어를 먼저 둬 캐시를 활용."}],pitfalls:["소스를 먼저 COPY(캐시 무효화)","latest 태그 의존","비밀값을 이미지에 굽기"],checklist:["레이어 순서","멀티스테이지",".dockerignore","compose"]},"http-api":{overview:"HTTP/REST는 클라이언트-서버 통신의 표준이다. 메서드·상태코드·헤더 의미와 리소스 중심 설계, 인증·CORS·버전관리를 이해하면 견고한 API를 만들고 소비한다.",advanced:[{h:"REST 설계",items:["리소스 명사 URL·계층","멱등성(GET/PUT/DELETE)","페이지네이션·필터·정렬","버전(/v1)"]},{h:"운영",items:["인증(Bearer/JWT)·CORS","에러 응답 규약","Rate Limit·캐시 헤더","OpenAPI 문서"]}],examples:[{title:"curl로 인증 + 에러 처리 테스트",lang:"bash",code:`# 토큰 발급
TOKEN=$(curl -s -X POST https://api.example.com/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"a@b.com","pw":"***"}' | jq -r .token)

# 보호 리소스 호출 (상태코드까지 출력)
curl -s -o /tmp/res.json -w "HTTP %{http_code}\\n" \\
  https://api.example.com/me \\
  -H "Authorization: Bearer $TOKEN"
cat /tmp/res.json | jq .`,note:"jq로 토큰 추출 후 Authorization 헤더로 보호 리소스 호출. -w로 상태코드를 확인해 2xx/4xx/5xx를 구분."}],pitfalls:["GET으로 데이터 변경","상태코드 오용(전부 200)","CORS 미설정으로 브라우저 차단"],checklist:["메서드·상태코드","인증·CORS","버전·페이지네이션","문서(OpenAPI)"]},colab:{overview:"Colab은 설치 없이 GPU로 ML/LLM을 실습하는 클라우드 노트북이다. 런타임·드라이브 연동·셸 명령(!)을 익히고 세션 한계를 관리하면 효율적으로 실험한다.",advanced:[{h:"환경",items:["GPU/TPU 런타임","!pip·!apt 셸 명령","드라이브 마운트","세션 시간·메모리 한계"]},{h:"실험",items:["시드 고정(재현성)","체크포인트를 드라이브에 저장","tqdm 진행률","%env로 환경변수"]}],examples:[{title:"GPU 확인 + 드라이브 + 재현성",lang:"python",code:`import torch, random, numpy as np
print("GPU:", torch.cuda.get_device_name(0) if torch.cuda.is_available() else "없음")

from google.colab import drive
drive.mount('/content/drive')          # 체크포인트 저장용

def seed_all(s=42):                     # 재현성: 시드 고정
    random.seed(s); np.random.seed(s)
    torch.manual_seed(s); torch.cuda.manual_seed_all(s)
seed_all()

!pip install -q transformers accelerate  # 셸 명령은 ! 로`,note:"세션이 끊겨도 드라이브에 체크포인트를 저장하면 이어서 실험 가능. 시드 고정으로 결과 재현성을 확보한다."}],pitfalls:["결과를 로컬(세션)에만 저장 → 끊기면 소실","시드 미고정으로 재현 불가","무료 GPU 장시간 점유"],checklist:["GPU 런타임","드라이브 저장","시드 고정","세션 관리"]},"llm-basics":{overview:"LLM은 토큰을 확률적으로 생성하는 모델이다. 프롬프트 설계·컨텍스트 한계·환각을 이해하고 API를 안전하게 다루는 것이 모든 LLM 과목의 출발점이다.",advanced:[{h:"동작·한계",items:["토큰·컨텍스트 윈도우","temperature·top_p","지식 컷오프·환각","비용(토큰) 산정"]},{h:"활용·안전",items:["프롬프트 패턴(역할·예시·형식)","RAG로 지식 보강","API 키 관리·민감정보","구조화 출력"]}],examples:[{title:"재시도 + 토큰 사용량 확인 (OpenAI)",lang:"python",code:`from openai import OpenAI
client = OpenAI()    # OPENAI_API_KEY 환경변수

resp = client.chat.completions.create(
    model="gpt-4o-mini",
    temperature=0,                 # 사실형 → 결정적
    messages=[{"role": "user", "content": "RAG를 한 문장으로 설명해줘"}],
)
print(resp.choices[0].message.content)
# 비용 추적: 사용 토큰 확인
u = resp.usage
print(f"입력 {u.prompt_tokens} / 출력 {u.completion_tokens} 토큰")`,note:"temperature=0으로 결정적 출력, usage로 토큰(비용)을 추적한다. 키는 환경변수로만 관리하고 코드/깃에 넣지 않는다."}],pitfalls:["API 키를 코드/깃에 노출","환각을 사실로 신뢰(근거 미확인)","컨텍스트 초과로 잘림"],checklist:["키 환경변수","프롬프트 형식 지정","토큰·비용 인지","RAG로 근거"]}},k=a=>P[a]||null;function f({items:a}){return e.jsx("ul",{style:{display:"flex",flexDirection:"column",gap:6},children:a.map((d,i)=>e.jsxs("li",{style:{position:"relative",paddingLeft:16,fontSize:14,color:"var(--navy-700)"},children:[e.jsx("span",{style:{position:"absolute",left:2,top:9,width:5,height:5,borderRadius:"50%",background:"var(--gold)"}}),e.jsx(l,{text:d})]},i))})}function L(){var h,g,u,x;const{id:a}=j(),d=_(),i=R(a),s=k(a);if(!i)return e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",style:{textAlign:"center"},children:[e.jsx("p",{children:"주제를 찾을 수 없습니다."}),e.jsx(n,{to:"/prep",className:"back-link",children:"← 선수학습자료"})]})});const c=o.findIndex(t=>t.id===a),p=c>0?o[c-1]:null,m=c<o.length-1?o[c+1]:null,y=o.filter(t=>t.tag===i.tag);return e.jsxs("div",{children:[e.jsx("div",{className:"page-header-ed",children:e.jsxs("div",{className:"container",children:[e.jsxs("span",{className:"eyebrow",children:["Prerequisites · ",i.tag]}),e.jsx("div",{style:{marginBottom:10},children:e.jsx(b,{level:i.level,weight:i.weight})}),e.jsx("h1",{children:i.name}),e.jsx("p",{children:i.desc})]})}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container layout-side",children:[e.jsxs("nav",{className:"side-nav","aria-label":"선수학습 주제",children:[e.jsx("p",{className:"side-nav-title",children:i.tag}),y.map(t=>e.jsx("button",{className:`side-link${t.id===a?" active":""}`,onClick:()=>d(`/prep/${t.id}`),"aria-current":t.id===a?"true":void 0,children:t.name},t.id)),e.jsx(n,{to:"/prep",className:"side-link",style:{marginTop:8,color:"var(--gold)",fontWeight:700},children:"← 전체 분류 보기"})]}),e.jsxs("div",{children:[e.jsx(n,{to:"/prep",className:"back-link",children:"← 선수학습자료"}),(s==null?void 0:s.overview)&&e.jsx("div",{className:"box box-tips",style:{marginBottom:8},children:e.jsx("p",{style:{fontSize:14.5,color:"var(--navy-700)",lineHeight:1.85},children:e.jsx(l,{text:s.overview})})}),e.jsx("h3",{style:{fontSize:18,fontWeight:800,color:"var(--navy-800)",margin:"28px 0 4px"},children:"핵심 개념"}),e.jsx("div",{className:"grid grid-2",style:{marginTop:12},children:i.sections.map(t=>e.jsxs("div",{className:"card",children:[e.jsx("h4",{style:{fontSize:13,fontWeight:800,color:"var(--gold)",marginBottom:8},children:t.h}),e.jsx(f,{items:t.items})]},t.h))}),((h=s==null?void 0:s.advanced)==null?void 0:h.length)>0&&e.jsxs(e.Fragment,{children:[e.jsx("h3",{style:{fontSize:18,fontWeight:800,color:"var(--navy-800)",margin:"28px 0 4px"},children:"심화 세부 항목"}),e.jsx("div",{className:"grid grid-2",style:{marginTop:12},children:s.advanced.map(t=>e.jsxs("div",{className:"card",children:[e.jsx("h4",{style:{fontSize:13,fontWeight:800,color:"var(--azure)",marginBottom:8},children:t.h}),e.jsx(f,{items:t.items})]},t.h))})]}),e.jsxs("div",{className:"grid grid-2",style:{marginTop:16},children:[e.jsxs("div",{className:"box box-practice",children:[e.jsx("div",{className:"box-h",children:"🧪 실습 과제"}),e.jsx("ol",{children:i.practice.map((t,r)=>e.jsx("li",{children:e.jsx(l,{text:t})},r))})]}),e.jsxs("div",{className:"box box-tips",children:[e.jsx("div",{className:"box-h",children:"💡 팁"}),e.jsx("ul",{children:i.tips.map((t,r)=>e.jsx("li",{children:e.jsx(l,{text:t})},r))})]})]}),(i.snippet||((g=s==null?void 0:s.examples)==null?void 0:g.length)>0)&&e.jsx("h3",{style:{fontSize:18,fontWeight:800,color:"var(--navy-800)",margin:"28px 0 4px"},children:"💻 코드 예시"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:18,marginTop:12},children:[i.snippet&&e.jsxs("div",{children:[e.jsxs("div",{className:"box-h",style:{marginBottom:8},children:["기본 ",e.jsxs("span",{style:{fontWeight:600,color:"var(--ink-soft)",fontSize:12},children:["(",i.snippet.lang,")"]})]}),e.jsx(v,{code:i.snippet.code,lang:i.snippet.lang})]}),((s==null?void 0:s.examples)||[]).map((t,r)=>e.jsxs("div",{children:[e.jsxs("div",{className:"box-h",style:{marginBottom:8},children:[t.title," ",e.jsxs("span",{style:{fontWeight:600,color:"var(--ink-soft)",fontSize:12},children:["(",t.lang,")"]})]}),e.jsx(v,{code:t.code,lang:t.lang}),t.note&&e.jsxs("p",{style:{marginTop:8,fontSize:13,color:"var(--ink-soft)",lineHeight:1.7},children:["💡 ",e.jsx(l,{text:t.note})]})]},r))]}),e.jsxs("div",{className:"grid grid-2",style:{marginTop:16},children:[((u=s==null?void 0:s.pitfalls)==null?void 0:u.length)>0&&e.jsxs("div",{className:"box box-tips",children:[e.jsx("div",{className:"box-h",children:"⚠️ 자주 하는 실수"}),e.jsx("ul",{children:s.pitfalls.map((t,r)=>e.jsx("li",{children:e.jsx(l,{text:t})},r))})]}),((x=s==null?void 0:s.checklist)==null?void 0:x.length)>0&&e.jsxs("div",{className:"box box-practice",children:[e.jsx("div",{className:"box-h",children:"✅ 체크리스트"}),e.jsx("ul",{children:s.checklist.map((t,r)=>e.jsx("li",{children:e.jsx(l,{text:t})},r))})]})]}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginTop:20},children:i.links.map(t=>e.jsxs("a",{href:t.url,target:"_blank",rel:"noreferrer",className:"btn btn-ghost",style:{fontSize:13,padding:"9px 16px"},children:[t.label," ↗"]},t.url))}),e.jsxs("div",{className:"detail-nav",style:{marginTop:28},children:[p?e.jsxs(n,{to:`/prep/${p.id}`,children:[e.jsx("div",{className:"lbl",children:"← 이전"}),e.jsx("div",{className:"nm",children:p.name})]}):e.jsx("span",{style:{flex:1}}),m?e.jsxs(n,{to:`/prep/${m.id}`,style:{textAlign:"right"},children:[e.jsx("div",{className:"lbl",children:"다음 →"}),e.jsx("div",{className:"nm",children:m.name})]}):e.jsx("span",{style:{flex:1}})]})]})]})})]})}export{L as default};
