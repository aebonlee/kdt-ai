// 선수학습자료 & 참고자료 데이터
// (학습자용 자료 + 강사 강의에 따른 보조 자료)
//
// prepTopic 구조
//   { id, name, tag, desc,
//     sections: [{ h, items[] }],   // 핵심 개념
//     practice: [string],           // 실습 과제(직접 해보기)
//     tips: [string],               // 실무 팁
//     snippet: { lang, code },      // 대표 코드 예시
//     links: [{ label, url }] }

export const prepTopics = [
  {
    id: 'python',
    name: '파이썬 A to Z',
    tag: '필수',
    desc: '모든 AI 과목의 기반이 되는 Python을 처음부터 끝까지. 본 과정 수강 전 익혀두면 좋습니다.',
    sections: [
      { h: '기초 문법', items: ['변수·자료형·연산자', '조건문·반복문', '문자열·포맷팅(f-string)'] },
      { h: '자료구조', items: ['list / tuple / dict / set', '컴프리헨션', '슬라이싱'] },
      { h: '함수·모듈', items: ['함수·인자·반환값', '람다·고차함수', 'import / 모듈 / 패키지'] },
      { h: '객체지향', items: ['class / 인스턴스', '상속·메서드', 'magic method 기초'] },
      { h: '실무 기본기', items: ['예외 처리(try/except)', '파일 입출력', '가상환경(venv)·pip', 'requests / json 다루기'] },
    ],
    practice: [
      'BMI 계산기: 키·몸무게 입력 → BMI 값과 등급 출력',
      '단어 빈도 세기: 텍스트에서 단어별 등장 횟수를 dict/Counter로 집계',
      'CSV 읽어 통계 내기: csv 모듈로 평균·최댓값 구하기',
      '도서 관리 콘솔 앱: 클래스로 추가·검색·삭제 구현',
    ],
    tips: [
      'f-string에 =를 쓰면 디버깅이 편함 → f"{x=}"',
      'enumerate / zip 으로 인덱스·병렬 순회를 깔끔하게',
      'list 컴프리헨션이 for+append 보다 빠르고 읽기 좋음',
      '프로젝트마다 가상환경 분리 → python -m venv .venv',
      'black·ruff 포매터로 PEP8 자동 정리',
    ],
    snippet: {
      lang: 'python',
      code: `# 단어 빈도 세기
from collections import Counter

text = "ai ml ai dl ai ml"
counts = Counter(text.split())
print(counts.most_common(2))   # [('ai', 3), ('ml', 2)]`,
    },
    links: [
      { label: '점프 투 파이썬 (위키독스)', url: 'https://wikidocs.net/book/1' },
      { label: 'Python 공식 튜토리얼(한글)', url: 'https://docs.python.org/ko/3/tutorial/' },
      { label: '파이썬 코딩도장', url: 'https://dojang.io/course/view.php?id=7' },
    ],
  },
  {
    id: 'streamlit',
    name: '스트림릿 Tip',
    tag: 'AI 데모',
    desc: '파이썬만으로 데이터·AI 웹앱을 빠르게 만드는 Streamlit. 미니 프로젝트 데모에 유용합니다.',
    sections: [
      { h: '핵심', items: ['st.write / st.title / st.markdown', 'st.dataframe / st.line_chart', '위젯: st.button·st.text_input·st.selectbox'] },
      { h: '레이아웃', items: ['st.columns / st.tabs / st.sidebar', 'st.expander'] },
      { h: '상태·성능', items: ['st.session_state로 상태 유지', '@st.cache_data 캐싱'] },
      { h: '실행·배포', items: ['streamlit run app.py', 'Streamlit Community Cloud 무료 배포'] },
    ],
    practice: [
      '설문 폼: 입력값을 받아 결과를 표·차트로 시각화',
      'CSV 업로더 + st.dataframe 미리보기 + 기초 통계',
      'LLM 챗봇 UI: st.chat_input / st.chat_message 로 대화창',
      'session_state로 카운터·장바구니 상태 유지',
    ],
    tips: [
      '@st.cache_data 로 데이터 로딩 캐시 → 재실행이 빨라짐',
      'st.secrets 로 API 키를 코드에 노출 없이 관리',
      'st.rerun() 으로 상태 변경 후 강제 새로고침',
      '위젯은 매 상호작용마다 스크립트 전체가 재실행됨을 기억',
    ],
    snippet: {
      lang: 'python',
      code: `import streamlit as st

st.title("간단 인사 앱")
name = st.text_input("이름을 입력하세요")
if st.button("인사하기"):
    st.success(f"안녕하세요, {name}님!")`,
    },
    links: [
      { label: 'Streamlit 공식 문서', url: 'https://docs.streamlit.io/' },
      { label: 'API cheat sheet', url: 'https://docs.streamlit.io/develop/quick-reference/cheat-sheet' },
    ],
  },
  {
    id: 'gradio',
    name: '그라디오 Tip',
    tag: 'AI 데모',
    desc: 'ML 모델 데모 UI를 빠르게 만드는 Gradio. LLM·이미지 모델 데모에 적합합니다.',
    sections: [
      { h: '기본', items: ['gr.Interface(fn, inputs, outputs)', '컴포넌트: Textbox·Image·Audio·Chatbot'] },
      { h: '유연한 구성', items: ['gr.Blocks()로 커스텀 레이아웃', '이벤트: .click() / .change()'] },
      { h: '공유', items: ['demo.launch(share=True) 임시 공유', 'Hugging Face Spaces 배포'] },
    ],
    practice: [
      'Echo 챗봇: 입력을 그대로 반환하는 gr.Interface',
      '이미지 흑백 변환 데모 (입력 Image → 출력 Image)',
      'gr.ChatInterface 로 LLM 대화 UI 한 줄 완성',
      'gr.Blocks 로 탭 2개(텍스트/이미지) 구성',
    ],
    tips: [
      'gr.ChatInterface(fn) 만으로 챗봇 UI가 즉시 완성',
      'examples=[...] 로 샘플 입력 버튼 제공',
      '.queue() 로 동시 요청·스트리밍 처리',
      'share=True 링크는 임시(약 72시간)임에 주의',
    ],
    snippet: {
      lang: 'python',
      code: `import gradio as gr

def greet(name):
    return f"Hello {name}!"

gr.Interface(fn=greet, inputs="text", outputs="text").launch()`,
    },
    links: [
      { label: 'Gradio 공식 문서', url: 'https://www.gradio.app/docs' },
      { label: 'Quickstart', url: 'https://www.gradio.app/guides/quickstart' },
    ],
  },
  {
    id: 'django',
    name: '장고 Tip',
    tag: '백엔드',
    desc: '풀스택 웹 프레임워크 Django. 관리자·ORM·인증이 내장된 큰 규모 백엔드에 적합합니다.',
    sections: [
      { h: '구조', items: ['project vs app', 'settings.py / urls.py', 'MTV 패턴'] },
      { h: '데이터', items: ['models.py로 모델 정의', 'makemigrations / migrate', 'ORM 쿼리셋'] },
      { h: '기능', items: ['admin 사이트', 'views·templates', 'Django REST Framework(API)'] },
    ],
    practice: [
      'startproject·startapp 으로 블로그 뼈대 만들기',
      'Post 모델 정의 + admin 등록 → 글 작성/수정',
      '목록·상세 뷰 + 템플릿 렌더링',
      'DRF 로 Post REST API(GET/POST) 만들기',
    ],
    tips: [
      '모델을 바꾸면 makemigrations → migrate 를 잊지 말 것',
      'admin 사이트만으로 강력한 CRUD UI를 무료로 확보',
      'SECRET_KEY·DEBUG 는 환경변수로 분리(운영 보안)',
      'ORM 의 filter / exclude / annotate / select_related 숙지',
    ],
    snippet: {
      lang: 'python',
      code: `# models.py
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title`,
    },
    links: [
      { label: 'Django 공식 문서', url: 'https://docs.djangoproject.com/' },
      { label: 'DRF (REST API)', url: 'https://www.django-rest-framework.org/' },
    ],
  },
  {
    id: 'flask',
    name: '플라스크 Tip',
    tag: '백엔드',
    desc: '가볍고 단순한 마이크로 웹 프레임워크 Flask. AI 모델 추론 API를 빠르게 만들 때 좋습니다.',
    sections: [
      { h: '기본', items: ['@app.route 라우팅', 'request로 요청 처리', 'jsonify로 JSON 응답'] },
      { h: '확장', items: ['Blueprint로 모듈화', 'render_template (Jinja2)', 'CORS·환경변수'] },
      { h: '추론 API', items: ['모델 로드 → /predict 엔드포인트', 'gunicorn으로 서빙'] },
    ],
    practice: [
      'Hello API: / 와 /hello/<name> 라우트',
      'JSON 입력을 받아 처리하는 /echo (POST)',
      '머신러닝 모델을 불러와 /predict 추론 API 만들기',
      'Blueprint 로 라우트를 모듈별로 분리',
    ],
    tips: [
      'debug=True 는 개발 환경에서만 (운영 절대 금지)',
      'request.get_json() 으로 JSON 본문 파싱',
      'flask-cors 로 프론트엔드 도메인 허용',
      '운영 서빙은 gunicorn -w 4 app:app',
    ],
    snippet: {
      lang: 'python',
      code: `from flask import Flask, request, jsonify

app = Flask(__name__)

@app.get("/hello/<name>")
def hello(name):
    return jsonify(message=f"hi {name}")

@app.post("/predict")
def predict():
    data = request.get_json()
    return jsonify(result=sum(data["x"]))`,
    },
    links: [
      { label: 'Flask 공식 문서', url: 'https://flask.palletsprojects.com/' },
      { label: 'Quickstart', url: 'https://flask.palletsprojects.com/en/stable/quickstart/' },
    ],
  },
  {
    id: 'render',
    name: 'Render',
    tag: '배포',
    desc: '간단하게 웹 서비스·API를 배포하는 클라우드 플랫폼. 백엔드/데모 배포 실습에 활용합니다.',
    sections: [
      { h: '서비스 유형', items: ['Web Service (상시 실행)', 'Static Site', 'Cron Job'] },
      { h: '설정', items: ['Build Command', 'Start Command', '환경변수(Environment)'] },
      { h: '연동', items: ['GitHub 저장소 연결', 'push 시 자동 재배포'] },
    ],
    practice: [
      'Flask 앱을 Render Web Service 로 배포',
      'Build / Start Command 설정해보기',
      '환경변수로 API 키 주입 → 코드에서 os.environ 사용',
      'Vite 빌드 결과를 Static Site 로 배포',
    ],
    tips: [
      'requirements.txt(파이썬) 또는 빌드 스크립트 준비 필수',
      'Start: gunicorn app:app, 포트는 반드시 $PORT 사용',
      '무료 플랜은 유휴 시 슬립(콜드스타트) → 첫 응답 지연 주의',
      '비밀값은 코드가 아닌 Environment 탭에 저장',
    ],
    snippet: {
      lang: 'bash',
      code: `# Build Command
pip install -r requirements.txt

# Start Command  (반드시 $PORT 바인딩)
gunicorn app:app --bind 0.0.0.0:$PORT`,
    },
    links: [{ label: 'Render 공식 문서', url: 'https://render.com/docs' }],
  },
  {
    id: 'supabase',
    name: 'Supabase',
    tag: 'BaaS',
    desc: 'PostgreSQL 기반 오픈소스 백엔드(BaaS). DB·인증·스토리지·벡터(pgvector)를 한 번에 제공합니다.',
    sections: [
      { h: '핵심', items: ['Postgres DB + 자동 REST/GraphQL', 'Auth (이메일·소셜 로그인)', 'Storage (파일)', 'Realtime 구독'] },
      { h: 'AI 연동', items: ['pgvector 확장으로 벡터 검색', 'RAG 백엔드로 활용'] },
      { h: '보안', items: ['RLS(Row Level Security) 정책', 'anon / service role 키 구분'] },
      { h: '클라이언트', items: ['@supabase/supabase-js', 'createClient(url, anonKey)'] },
    ],
    practice: [
      '테이블 생성 + RLS 정책 설정해보기',
      'JS 클라이언트로 insert / select 실습',
      '이메일 인증 로그인 붙이기',
      'pgvector 로 임베딩 저장·유사도 검색(RAG 기초)',
    ],
    tips: [
      'anon 키는 공개 가능, service_role 키는 절대 노출 금지',
      '테이블마다 RLS 를 켜는 것이 기본 보안 수칙',
      'Realtime 구독으로 실시간 반영 UI 구현',
      'SQL Editor 로 직접 쿼리·데이터 수정 가능',
    ],
    snippet: {
      lang: 'javascript',
      code: `import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// 조회
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .order('created_at', { ascending: false })`,
    },
    links: [
      { label: 'Supabase 공식 문서', url: 'https://supabase.com/docs' },
      { label: 'JS 클라이언트', url: 'https://supabase.com/docs/reference/javascript' },
      { label: 'pgvector (AI)', url: 'https://supabase.com/docs/guides/ai' },
    ],
  },
  {
    id: 'git',
    name: 'Git · GitHub',
    tag: '필수',
    desc: '코드 버전관리와 협업의 기본. 모든 실습·프로젝트의 토대입니다.',
    sections: [
      { h: '기본 흐름', items: ['clone / add / commit / push', '작업 단위로 커밋', 'git status / log'] },
      { h: '브랜치·협업', items: ['branch / switch / merge', 'Pull Request 흐름', '충돌(conflict) 해결'] },
      { h: '되돌리기', items: ['restore / reset / revert', 'stash 임시 저장', '.gitignore'] },
    ],
    practice: [
      '새 저장소 만들고 첫 커밋·푸시',
      '브랜치 생성 → 수정 → PR 올리기',
      '일부러 충돌 만들고 해결해보기',
      '.gitignore 로 node_modules·.env 제외',
    ],
    tips: [
      '커밋 메시지는 "타입: 요약"(feat/fix/docs) 컨벤션',
      'git status 를 자주 확인하는 습관',
      'main 직접 push 대신 브랜치+PR',
      'force push(-f)는 협업 시 매우 주의',
    ],
    snippet: {
      lang: 'bash',
      code: `# 새 작업은 브랜치에서 시작
git switch -c feature/login    # 브랜치 생성 + 이동
git add .                      # 변경 스테이징
git commit -m "feat: 로그인 추가"
git push -u origin feature/login   # 원격에 올리고 PR 생성`,
    },
    links: [
      { label: 'Git 공식 문서(한)', url: 'https://git-scm.com/book/ko/v2' },
      { label: 'GitHub Docs', url: 'https://docs.github.com/ko' },
      { label: 'Learn Git Branching(시각 학습)', url: 'https://learngitbranching.js.org/?locale=ko' },
    ],
  },
  {
    id: 'cli',
    name: '터미널 · CLI',
    tag: '필수',
    desc: '명령줄 기본기. 개발·배포·서버 작업의 공통 언어입니다.',
    sections: [
      { h: '파일·디렉터리', items: ['ls / cd / pwd', 'mkdir / cp / mv / rm', '경로(절대/상대)·와일드카드'] },
      { h: '텍스트·검색', items: ['cat / less / head / tail', 'grep 로 내용 검색', '파이프(|)·리다이렉션(>, >>)'] },
      { h: '환경·프로세스', items: ['환경변수 export', 'ps / kill', 'chmod 권한'] },
    ],
    practice: [
      '폴더 구조 만들고 파일 이동·복사',
      'grep 로 로그에서 ERROR 찾기',
      '파이프로 명령 조합(ls | grep)',
      '환경변수 설정 후 echo 로 확인',
    ],
    tips: [
      'Tab 자동완성, ↑로 이전 명령',
      'history / !! 로 명령 재실행',
      '잘 모르면 man 또는 --help',
      'rm -rf 는 복구 불가 — 경로 재확인',
    ],
    snippet: {
      lang: 'bash',
      code: `# .py 파일에서 'TODO' 포함 줄을 재귀 검색
grep -rn "TODO" --include="*.py" .   # -r 재귀, -n 줄번호

# 디렉터리만 출력
ls -la | grep "^d"`,
    },
    links: [
      { label: '생활코딩 리눅스', url: 'https://opentutorials.org/course/2598' },
      { label: 'Bash 가이드(MDN 인접)', url: 'https://www.gnu.org/software/bash/manual/' },
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript ES6+',
    tag: '프론트',
    desc: 'Vue 학습의 선수 지식. 모던 JS 핵심 문법을 익힙니다.',
    sections: [
      { h: '기본', items: ['let / const, 템플릿 리터럴', '화살표 함수', '구조 분해 / 스프레드'] },
      { h: '배열·객체', items: ['map / filter / reduce', '옵셔널 체이닝 ?.', 'JSON 다루기'] },
      { h: '비동기·모듈', items: ['Promise / async·await', 'fetch API', 'import / export'] },
    ],
    practice: [
      'map/filter/reduce 로 배열 가공',
      'async/await 로 API 호출',
      '구조 분해로 객체 값 추출',
      '모듈로 함수 분리·재사용',
    ],
    tips: [
      'var 대신 const 우선, 재할당만 let',
      '비교는 == 대신 ===',
      '?. 와 ?? 로 안전하게 접근',
      '비동기는 try/catch 로 에러 처리',
    ],
    snippet: {
      lang: 'javascript',
      code: `// 배열 가공: 짝수만 골라 제곱
const nums = [1, 2, 3, 4]
const result = nums
  .filter(n => n % 2 === 0)   // [2, 4]
  .map(n => n * n)            // [4, 16]

// 비동기: await 로 순차 처리
const res = await fetch('/api/items')  // 응답 대기
const data = await res.json()          // JSON 파싱`,
    },
    links: [
      { label: 'MDN JavaScript(한)', url: 'https://developer.mozilla.org/ko/docs/Web/JavaScript' },
      { label: '모던 JavaScript 튜토리얼', url: 'https://ko.javascript.info/' },
    ],
  },
  {
    id: 'html-css',
    name: 'HTML · CSS',
    tag: '프론트',
    desc: '웹 화면의 구조와 스타일. Vue 컴포넌트 작성의 바탕입니다.',
    sections: [
      { h: 'HTML', items: ['시맨틱 태그(header/main/section)', '폼·입력 요소', '접근성 기초(alt/label)'] },
      { h: 'CSS', items: ['선택자·박스 모델', 'Flexbox / Grid 레이아웃', '반응형(미디어 쿼리)'] },
    ],
    practice: [
      '시맨틱 태그로 페이지 마크업',
      'Flexbox 로 카드 레이아웃',
      '미디어 쿼리로 반응형 네비',
      '폼 스타일링 + 포커스 상태',
    ],
    tips: [
      'div 남발 대신 시맨틱 태그',
      '폰트·간격은 rem 단위',
      '레이아웃은 Flex/Grid 우선',
      '모바일 퍼스트로 작성',
    ],
    snippet: {
      lang: 'html',
      code: `<!-- Flexbox 가로 정렬 + 균등 분할 -->
<div class="row">
  <div class="card">A</div>
  <div class="card">B</div>
</div>
<style>
  .row { display: flex; gap: 16px; }   /* 가로 배치 */
  .card { flex: 1; padding: 16px; }     /* 남는 공간 균등 분할 */
</style>`,
    },
    links: [
      { label: 'MDN HTML(한)', url: 'https://developer.mozilla.org/ko/docs/Web/HTML' },
      { label: 'Flexbox Froggy(게임)', url: 'https://flexboxfroggy.com/#ko' },
    ],
  },
  {
    id: 'sql',
    name: 'SQL 기초',
    tag: '데이터',
    desc: '데이터베이스 조회·집계의 기본. Vector DB·pgvector 이해에도 도움됩니다.',
    sections: [
      { h: '조회', items: ['SELECT / WHERE', 'ORDER BY / LIMIT', '연산자·LIKE'] },
      { h: '집계·조인', items: ['GROUP BY / COUNT / AVG', 'JOIN(INNER/LEFT)', '서브쿼리'] },
      { h: '변경', items: ['INSERT / UPDATE / DELETE', '트랜잭션', '인덱스 개념'] },
    ],
    practice: [
      '조건으로 행 필터링',
      'GROUP BY 로 그룹 집계',
      '두 테이블 JOIN',
      '서브쿼리로 상위 N 추출',
    ],
    tips: [
      '대량 변경 전 SELECT 로 먼저 확인',
      'LIMIT 로 결과 일부만 점검',
      'NULL 비교는 IS NULL',
      '자주 조회하는 컬럼엔 인덱스',
    ],
    snippet: {
      lang: 'sql',
      code: `-- 부서별 평균 급여 상위 5
SELECT dept, AVG(salary) AS avg_pay   -- 집계 함수
FROM employees
WHERE active = true                   -- 조건 필터
GROUP BY dept                         -- 부서별 묶기
ORDER BY avg_pay DESC
LIMIT 5;`,
    },
    links: [
      { label: 'SQLBolt(인터랙티브)', url: 'https://sqlbolt.com/' },
      { label: 'PostgreSQL 튜토리얼', url: 'https://www.postgresqltutorial.com/' },
    ],
  },
  {
    id: 'pandas',
    name: 'Pandas · NumPy',
    tag: '데이터',
    desc: '데이터 분석·전처리의 핵심 라이브러리. ML 실습의 선수 지식입니다.',
    sections: [
      { h: 'NumPy', items: ['ndarray, 벡터 연산', '브로드캐스팅', '난수·통계 함수'] },
      { h: 'Pandas', items: ['Series / DataFrame', 'read_csv / to_csv', 'loc·iloc 선택'] },
      { h: '전처리', items: ['결측치·이상치 처리', 'groupby 집계', '파생 컬럼·apply'] },
    ],
    practice: [
      'CSV 로드 후 describe()로 요약',
      '결측치 대치(fillna)',
      'groupby 로 그룹 평균',
      '조건으로 파생 컬럼 생성',
    ],
    tips: [
      '반복문 대신 벡터 연산',
      '.loc 로 명시적 선택',
      'chained indexing 경고 주의(copy)',
      'info()/describe() 로 먼저 파악',
    ],
    snippet: {
      lang: 'python',
      code: `import pandas as pd
df = pd.read_csv("data.csv")

# 결측치를 중앙값으로 채우고, 도시별 평균가 집계
df["age"] = df["age"].fillna(df["age"].median())   # 중앙값 대치
summary = df.groupby("city")["price"].mean()       # 도시별 평균
print(summary.sort_values(ascending=False).head())`,
    },
    links: [
      { label: 'Pandas 공식(10분 입문)', url: 'https://pandas.pydata.org/docs/user_guide/10min.html' },
      { label: 'NumPy 공식', url: 'https://numpy.org/doc/stable/' },
    ],
  },
  {
    id: 'docker',
    name: 'Docker 기초',
    tag: '배포',
    desc: '애플리케이션 컨테이너화. 모델 서빙·배포 실습의 기반입니다.',
    sections: [
      { h: '개념', items: ['이미지 vs 컨테이너', '레이어·캐시', '레지스트리'] },
      { h: '명령', items: ['build / run / ps / logs', 'exec 로 진입', '포트·볼륨 매핑'] },
      { h: '구성', items: ['Dockerfile', '.dockerignore', 'docker compose'] },
    ],
    practice: [
      '파이썬 앱 Dockerfile 작성',
      '이미지 빌드·컨테이너 실행',
      '포트 매핑으로 접속',
      'compose 로 앱+DB 동시 실행',
    ],
    tips: [
      '.dockerignore 로 불필요 파일 제외',
      '의존성 설치 레이어를 먼저(캐시)',
      'slim/alpine 이미지로 경량화',
      'exec -it <id> sh 로 내부 확인',
    ],
    snippet: {
      lang: 'docker',
      code: `# 이미지 빌드 후 컨테이너 실행
docker build -t myapp .           # Dockerfile로 이미지 생성
docker run -p 8000:8000 myapp     # 호스트:컨테이너 포트 매핑
docker ps                         # 실행 중 컨테이너 확인
docker logs -f <id>               # 로그 실시간 추적`,
    },
    links: [
      { label: 'Docker 공식 문서', url: 'https://docs.docker.com/get-started/' },
      { label: 'Play with Docker', url: 'https://labs.play-with-docker.com/' },
    ],
  },
  {
    id: 'http-api',
    name: 'REST API · HTTP',
    tag: '백엔드',
    desc: '프론트-백엔드 통신의 기본. AI 서비스 API 설계·호출의 토대입니다.',
    sections: [
      { h: 'HTTP', items: ['메서드 GET/POST/PUT/DELETE', '상태코드 2xx/4xx/5xx', '헤더·바디·JSON'] },
      { h: 'REST 설계', items: ['리소스 중심 URL', '멱등성·버전(/v1)', '에러 응답 규약'] },
      { h: '인증·도구', items: ['토큰(Bearer)·CORS', 'curl / Postman', 'OpenAPI(Swagger)'] },
    ],
    practice: [
      'curl 로 GET/POST 요청',
      '상태코드별 의미 해석',
      'JSON 바디 전송·응답 확인',
      'Authorization 헤더로 토큰 전달',
    ],
    tips: [
      'GET은 조회, 변경은 POST/PUT/DELETE',
      '4xx=클라이언트, 5xx=서버 오류',
      'CORS는 브라우저 보안 정책',
      '버전(/v1)으로 호환성 관리',
    ],
    snippet: {
      lang: 'bash',
      code: `# JSON 본문으로 POST 요청
curl -X POST https://api.example.com/items \\
     -H "Content-Type: application/json" \\
     -H "Authorization: Bearer $TOKEN" \\   # 인증 토큰
     -d '{"name": "노트북", "price": 1500}'`,
    },
    links: [
      { label: 'MDN HTTP(한)', url: 'https://developer.mozilla.org/ko/docs/Web/HTTP' },
      { label: 'REST API Tutorial', url: 'https://restfulapi.net/' },
    ],
  },
  {
    id: 'colab',
    name: 'Colab · Jupyter',
    tag: '실습환경',
    desc: '설치 없이 GPU로 ML/LLM을 실습하는 노트북 환경입니다.',
    sections: [
      { h: '노트북 기초', items: ['셀(코드/마크다운) 실행', '실행 순서·상태', '단축키(Shift+Enter)'] },
      { h: '런타임', items: ['GPU/TPU 런타임 설정', '세션·메모리 한계', '!pip 패키지 설치'] },
      { h: '연동', items: ['구글 드라이브 마운트', '파일 업로드/다운로드', '노트북 공유'] },
    ],
    practice: [
      'GPU 런타임으로 변경',
      '드라이브 마운트 후 파일 읽기',
      '!pip install 로 패키지 설치',
      '노트북 공유 링크 만들기',
    ],
    tips: [
      '! 로 셀에서 셸 명령 실행',
      '무료 GPU는 사용 한도·세션 끊김 주의',
      '셀 실행 순서가 결과에 영향',
      '중요 데이터는 드라이브에 저장',
    ],
    snippet: {
      lang: 'python',
      code: `# Colab에서 GPU 확인 + 드라이브 연결
import torch
print(torch.cuda.is_available())    # GPU 사용 가능 여부

from google.colab import drive
drive.mount('/content/drive')       # 구글 드라이브 마운트
!pip install -q transformers        # ! 로 셸 명령 실행`,
    },
    links: [
      { label: 'Google Colab', url: 'https://colab.research.google.com/' },
      { label: 'Jupyter 공식', url: 'https://docs.jupyter.org/' },
    ],
  },
  {
    id: 'llm-basics',
    name: 'LLM · 프롬프트 리터러시',
    tag: 'AI 기초',
    desc: '생성형 AI를 다루는 기본 소양. 모든 LLM 과목의 출발점입니다.',
    sections: [
      { h: '개념', items: ['토큰과 확률적 생성', '컨텍스트 윈도우', '지식 컷오프·환각'] },
      { h: '프롬프트', items: ['명확한 지시·역할 부여', '예시(Few-shot)', '출력 형식 지정'] },
      { h: '활용·주의', items: ['요약/생성/분류', 'API 키 발급·관리', '민감정보·저작권'] },
    ],
    practice: [
      '같은 작업을 프롬프트로 요약·분류',
      '역할 부여(System) 효과 비교',
      '환각이 나오는 사례 찾아보기',
      'API 키 발급 후 첫 호출',
    ],
    tips: [
      '모호한 지시 대신 구체적·단계적으로',
      '예시를 주면 형식이 안정',
      '출력 형식(JSON 등)을 명시',
      '프롬프트에 민감정보 입력 금지',
    ],
    snippet: {
      lang: 'python',
      code: `# OpenAI 호환 API 호출 기본형
from openai import OpenAI
client = OpenAI()   # OPENAI_API_KEY 환경변수 사용

resp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "AI를 한 문장으로 설명해줘"}],
)
print(resp.choices[0].message.content)`,
    },
    links: [
      { label: 'OpenAI 문서', url: 'https://platform.openai.com/docs' },
      { label: 'Anthropic 문서', url: 'https://docs.anthropic.com/' },
      { label: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/kr' },
    ],
  },
]

export const prepById = (id) => prepTopics.find((t) => t.id === id)

// ── 참고자료 (이미지 + 외부 링크) ──
export const refImages = [
  { src: '/curriculum_graph.png', caption: 'SKALA 4기 전체 커리큘럼 흐름도' },
]

// 과목별 공식 문서 (강의 보조 자료)
export const refGroups = [
  {
    title: '과정 공식',
    links: [
      { label: 'SKALA 공식 사이트', url: 'https://www.2026skala.co.kr/' },
      { label: 'SK Careers 채용', url: 'https://www.skcareers.com/Recruit/Detail/R260638' },
    ],
  },
  {
    title: '프론트엔드',
    links: [
      { label: 'Vue.js 공식 문서', url: 'https://ko.vuejs.org/' },
      { label: 'Vue Router', url: 'https://router.vuejs.org/' },
      { label: 'Pinia (상태관리)', url: 'https://pinia.vuejs.org/' },
    ],
  },
  {
    title: '백엔드 · Spring AI',
    links: [
      { label: 'Spring AI Reference', url: 'https://docs.spring.io/spring-ai/reference/' },
      { label: 'Spring Boot', url: 'https://spring.io/projects/spring-boot' },
    ],
  },
  {
    title: 'LLM · Agent',
    links: [
      { label: 'LangChain', url: 'https://python.langchain.com/' },
      { label: 'LangGraph', url: 'https://langchain-ai.github.io/langgraph/' },
      { label: 'Hugging Face', url: 'https://huggingface.co/docs' },
      { label: 'OpenAI API', url: 'https://platform.openai.com/docs' },
      { label: 'Anthropic API', url: 'https://docs.anthropic.com/' },
    ],
  },
  {
    title: 'ML · MLOps · 서빙',
    links: [
      { label: 'PyTorch', url: 'https://pytorch.org/docs/stable/index.html' },
      { label: 'scikit-learn', url: 'https://scikit-learn.org/stable/' },
      { label: 'FastAPI', url: 'https://fastapi.tiangolo.com/' },
      { label: 'Docker', url: 'https://docs.docker.com/' },
    ],
  },
  {
    title: 'Vector DB',
    links: [
      { label: 'pgvector', url: 'https://github.com/pgvector/pgvector' },
      { label: 'Chroma', url: 'https://docs.trychroma.com/' },
      { label: 'FAISS', url: 'https://faiss.ai/' },
    ],
  },
  {
    title: '웹 기초 · 선수',
    tag: '선수과정',
    note: '이 사이트는 이애본 강사 담당 과목 중심입니다. HTML·CSS·JavaScript는 Vue.js(프론트) 학습의 선수 기반으로, SKALA 4기에서는 별도 강사(강병호·정윤석 등)가 진행합니다. 아래 공식 문서로 기초를 다지세요.',
    links: [
      { label: 'MDN — HTML', url: 'https://developer.mozilla.org/ko/docs/Web/HTML' },
      { label: 'MDN — CSS', url: 'https://developer.mozilla.org/ko/docs/Web/CSS' },
      { label: 'MDN — JavaScript', url: 'https://developer.mozilla.org/ko/docs/Web/JavaScript' },
      { label: '모던 JavaScript 튜토리얼', url: 'https://ko.javascript.info/' },
    ],
  },
  {
    title: '백엔드 · DB · 선수',
    tag: '선수과정',
    note: 'Java·SpringBoot·REST API와 DB·SQL(데이터 모델링)은 SKALA 4기의 백엔드/데이터 기반 과목으로 별도 강사가 진행합니다. 담당 과목(Spring AI·Vector DB·서빙) 이해에 도움이 되는 선수 참고자료입니다.',
    links: [
      { label: 'Spring Boot', url: 'https://spring.io/projects/spring-boot' },
      { label: '점프 투 스프링부트', url: 'https://wikidocs.net/book/7601' },
      { label: 'PostgreSQL 튜토리얼', url: 'https://www.postgresqltutorial.com/' },
      { label: 'SQL 기초 (모드)', url: 'https://mode.com/sql-tutorial/' },
    ],
  },
  {
    title: 'Cloud · DevOps · 후속',
    tag: '후속·심화',
    note: '컨테이너(Docker)·쿠버네티스·DevOps·Agile/MSA는 배포·운영을 다루는 후속·병행 과목으로 별도 강사가 진행합니다. 담당 과목의 모델 서빙·MLOps를 실제 운영으로 확장할 때 참고하세요.',
    links: [
      { label: 'Docker 공식 문서', url: 'https://docs.docker.com/' },
      { label: 'Kubernetes 문서(한글)', url: 'https://kubernetes.io/ko/docs/home/' },
      { label: 'GitHub Actions (CI/CD)', url: 'https://docs.github.com/actions' },
    ],
  },
]
