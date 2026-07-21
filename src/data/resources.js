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
    level: 1,   // 난이도 1하 2중 3상
    weight: 3,  // 중요도 1~3
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
    level: 1,   // 난이도 1하 2중 3상
    weight: 2,  // 중요도 1~3
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
    level: 1,   // 난이도 1하 2중 3상
    weight: 2,  // 중요도 1~3
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
    level: 3,   // 난이도 1하 2중 3상
    weight: 1,  // 중요도 1~3
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
    level: 2,   // 난이도 1하 2중 3상
    weight: 2,  // 중요도 1~3
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
    level: 1,   // 난이도 1하 2중 3상
    weight: 2,  // 중요도 1~3
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
    level: 2,   // 난이도 1하 2중 3상
    weight: 2,  // 중요도 1~3
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
    level: 1,   // 난이도 1하 2중 3상
    weight: 3,  // 중요도 1~3
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
    level: 1,   // 난이도 1하 2중 3상
    weight: 3,  // 중요도 1~3
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
    level: 2,   // 난이도 1하 2중 3상
    weight: 2,  // 중요도 1~3
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
    level: 1,   // 난이도 1하 2중 3상
    weight: 2,  // 중요도 1~3
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
    level: 2,   // 난이도 1하 2중 3상
    weight: 3,  // 중요도 1~3
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
    level: 2,   // 난이도 1하 2중 3상
    weight: 3,  // 중요도 1~3
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
    level: 2,   // 난이도 1하 2중 3상
    weight: 3,  // 중요도 1~3
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
    level: 1,   // 난이도 1하 2중 3상
    weight: 3,  // 중요도 1~3
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
    level: 1,   // 난이도 1하 2중 3상
    weight: 3,  // 중요도 1~3
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
    level: 1,   // 난이도 1하 2중 3상
    weight: 3,  // 중요도 1~3
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
  {
    id: 'java-spring',
    name: 'Java · SpringBoot',
    tag: '과정 연계',
    level: 3,   // 난이도 1하 2중 3상
    weight: 2,  // 중요도 1~3
    desc: 'SKALA 4기의 Java·SpringBoot·REST API 과목은 별도 강사가 진행합니다. 담당 과목인 Spring AI·모델 서빙의 선수 기반이 되므로, 여기서는 핵심 흐름만 미리 익혀둡니다.',
    sections: [
      { h: 'Java 기본', items: ['클래스·객체·인터페이스', 'record 로 데이터 담기', '컬렉션(List/Map)·스트림', '예외 처리(try/catch)'] },
      { h: 'SpringBoot 구조', items: ['@SpringBootApplication 진입점', '@RestController / @Service 계층', '의존성 주입(DI)·@Autowired 대신 생성자 주입', 'application.yml 설정'] },
      { h: 'REST API', items: ['@GetMapping / @PostMapping', '@RequestBody 로 JSON 받기', 'ResponseEntity 로 상태코드 제어', 'Bean Validation(@Valid)'] },
    ],
    practice: [
      'Spring Initializr 로 프로젝트 생성 → 실행 확인',
      'GET /hello 컨트롤러 만들어 브라우저로 확인',
      'POST /todos: JSON 을 record 로 받아 목록에 추가',
      '@Valid 로 빈 제목 요청을 400 으로 거절',
    ],
    tips: [
      'Spring Initializr(start.spring.io)에서 의존성 체크만으로 시작',
      '필드 주입 대신 생성자 주입 → 테스트가 쉬워짐',
      'record 는 DTO 정의를 한 줄로 끝내는 최신 문법',
      'FastAPI의 @app.get ↔ Spring의 @GetMapping 은 같은 개념',
    ],
    snippet: {
      lang: 'java',
      code: `// 최소 REST 컨트롤러 — JSON 을 받아 JSON 으로 답한다
@RestController
public class TodoController {
    record Todo(String title) {}                 // 요청 본문을 담는 DTO

    @PostMapping("/todos")
    public Map<String, Object> add(@RequestBody Todo todo) {
        // 실제로는 DB 저장 — 여기선 받은 값을 그대로 확인
        return Map.of("saved", todo.title(), "ok", true);
    }
}`,
    },
    links: [
      { label: 'Spring Initializr', url: 'https://start.spring.io/' },
      { label: 'Spring Boot 공식 가이드', url: 'https://spring.io/guides/gs/spring-boot' },
      { label: '점프 투 스프링부트', url: 'https://wikidocs.net/book/7601' },
    ],
  },
  {
    id: 'kubernetes',
    name: '쿠버네티스 · DevOps',
    tag: '과정 연계',
    level: 3,   // 난이도 1하 2중 3상
    weight: 2,  // 중요도 1~3
    desc: 'SKALA 4기의 Cloud 과목(컨테이너·쿠버네티스·DevOps·Agile/MSA)은 별도 강사가 진행합니다. 담당 과목인 모델 서빙·AIOps 를 실제 운영으로 확장하는 후속 단계로, 큰 그림만 잡아둡니다.',
    sections: [
      { h: '왜 필요한가', items: ['컨테이너 여러 개를 사람이 직접 관리하기 어려움', '쿠버네티스 = 컨테이너 오케스트레이터(배치·복구·확장 자동화)', 'Docker 기초(선수) → 쿠버네티스(확장)'] },
      { h: '핵심 오브젝트', items: ['Pod: 컨테이너 실행 최소 단위', 'Deployment: 원하는 개수(replicas) 유지·롤링업데이트', 'Service: 파드들 앞의 고정 주소(로드밸런싱)', 'ConfigMap/Secret: 설정·비밀값 분리'] },
      { h: 'DevOps 연결', items: ['CI: 푸시 → 자동 빌드·테스트(GitHub Actions)', 'CD: 이미지 → 클러스터 자동 배포', '모니터링·롤백이 운영의 절반'] },
    ],
    practice: [
      'kubectl 로 nginx Deployment 만들기 (replicas=2)',
      'kubectl get pods 로 파드 상태 확인, 하나 지워보고 자동 복구 관찰',
      'Service 로 노출해 브라우저 접속',
      'replicas 를 3으로 늘려 확장 체감',
    ],
    tips: [
      '로컬 실습은 Docker Desktop 의 Kubernetes 체크 또는 minikube 로 충분',
      'kubectl get / describe / logs 세 가지면 상태 파악의 대부분이 됨',
      '선언형: "이렇게 되어 있어야 한다"(YAML)를 주면 쿠버네티스가 맞춰줌',
      '서빙 과목의 헬스체크(liveness/readiness)가 여기서 그대로 쓰임',
    ],
    snippet: {
      lang: 'bash',
      code: `# nginx 2개를 띄우고 자동 복구를 눈으로 확인
kubectl create deployment web --image=nginx --replicas=2
kubectl get pods                  # 파드 2개 Running 확인
kubectl delete pod <파드이름>      # 하나를 일부러 삭제
kubectl get pods                  # 곧바로 새 파드가 자동 생성됨(자기치유)
kubectl expose deployment web --port=80 --type=NodePort   # 서비스로 노출`,
    },
    links: [
      { label: 'Kubernetes 공식 문서(한글)', url: 'https://kubernetes.io/ko/docs/home/' },
      { label: 'minikube 시작하기', url: 'https://minikube.sigs.k8s.io/docs/start/' },
      { label: 'GitHub Actions (CI/CD)', url: 'https://docs.github.com/actions' },
    ],
  },
  // ── 2026-07-15 확장: 파이썬 자료구조·알고리즘 + 라이브러리 개별 주제(에이전트 작성·검증) ──
  {
    "id": "python-dsa",
    "name": "파이썬 자료구조·알고리즘",
    "tag": "필수",
    "level": 2,
    "weight": 3,
    "desc": "코드가 \"왜 느린지/빠른지\"를 설명하는 힘. AI 모델링·데이터 처리 전 과목에서 좋은 코드를 쓰기 위한 기초 체력입니다.",
    "sections": [
      {
        "h": "시간복잡도 직관",
        "items": [
          "Big-O: 입력이 2배면 시간은 몇 배?",
          "O(1) < O(log n) < O(n) < O(n log n) < O(n^2)",
          "반복문 중첩 = 곱하기, 순차 실행 = 더하기",
          "데이터 100만 건이면 O(n^2)은 사실상 불가"
        ]
      },
      {
        "h": "내장 자료구조의 속사정",
        "items": [
          "list: 끝 추가 O(1), 앞 삽입/삭제는 O(n)",
          "deque: 양쪽 끝 삽입·삭제 모두 O(1)",
          "dict/set: 해시 기반이라 조회가 평균 O(1)",
          "\"in 리스트\"는 O(n), \"in 집합\"은 O(1) — 검색은 set으로"
        ]
      },
      {
        "h": "collections · heapq",
        "items": [
          "Counter: 빈도 집계 한 줄",
          "defaultdict: 키 없을 때 기본값 자동 생성",
          "deque: 큐(BFS)·스택 겸용",
          "heapq: 최솟값을 O(log n)에 꺼내는 우선순위 큐"
        ]
      },
      {
        "h": "정렬과 탐색",
        "items": [
          "sort(key=lambda x: ...)로 기준 정렬",
          "reverse=True 내림차순, 튜플 key로 다중 기준",
          "정렬된 리스트에서 bisect로 이진 탐색 O(log n)",
          "파이썬 정렬은 안정 정렬(같은 값의 순서 유지)"
        ]
      },
      {
        "h": "대표 알고리즘 패턴",
        "items": [
          "재귀: 자기 호출 + 종료 조건(내부적으로 스택 사용)",
          "투 포인터: 양끝/두 지점 포인터로 O(n) 순회",
          "슬라이딩 윈도우: 구간 합·최대를 창을 밀며 갱신",
          "BFS(큐, 최단거리) vs DFS(스택/재귀, 모든 경로)"
        ]
      }
    ],
    "practice": [
      "두 수의 합: 정수 리스트와 목표값이 주어질 때 합이 목표값이 되는 두 원소가 있는지 판정 — 이중 for문 O(n^2) 풀이와 set 이용 O(n) 풀이를 모두 작성하고 시간을 비교",
      "괄호 짝 검사: \"(()[])\" 같은 문자열이 올바른 괄호열인지 리스트를 스택처럼(append/pop) 써서 판정",
      "최빈 단어 Top3: 문장 리스트에서 단어 빈도를 defaultdict로 직접 집계한 뒤 sort(key=...)로 상위 3개 출력(파이썬 A to Z의 Counter 한 줄 풀이와 결과 비교)",
      "미로 최단거리: 0(길)/1(벽) 격자에서 시작→도착 최단 칸 수를 deque 기반 BFS로 계산(도달 불가면 -1)"
    ],
    "tips": [
      "코딩테스트 시간초과의 8할은 \"in 리스트\"와 앞쪽 insert/pop(0) — set과 deque로 바꾸면 해결되는 경우가 많음",
      "dict.get(key, 0) 또는 defaultdict를 쓰면 \"키 있나 확인 후 추가\" 패턴이 사라짐",
      "파이썬 재귀 깊이 기본 한도는 약 1000 — 깊은 재귀는 반복문+스택으로 바꾸는 습관",
      "정렬 key에 튜플을 주면 다중 기준: sort(key=lambda x: (-x[1], x[0])) 처럼 부호로 방향 제어",
      "먼저 무식하게(브루트포스) 맞히고, 그 다음 복잡도를 줄이기 — 처음부터 최적화하려다 못 푸는 게 최악"
    ],
    "snippet": {
      "lang": "python",
      "code": "# BFS로 미로 최단거리 구하기 (0=길, 1=벽)\nfrom collections import deque              # 양끝 O(1) 큐\n\nmaze = [[0, 0, 1], [1, 0, 1], [1, 0, 0]]   # 3x3 미로\nn, m = len(maze), len(maze[0])             # 행/열 크기\ndist = [[-1] * m for _ in range(n)]        # 거리표(-1=미방문)\n\nq = deque([(0, 0)])                        # 시작 칸을 큐에 넣기\ndist[0][0] = 0                             # 시작 거리는 0\nwhile q:                                   # 큐가 빌 때까지 반복\n    x, y = q.popleft()                     # 가장 먼저 넣은 칸부터\n    for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:  # 상하좌우\n        nx, ny = x + dx, y + dy            # 이웃 칸 좌표\n        if 0 <= nx < n and 0 <= ny < m:    # 격자 범위 안이고\n            if maze[nx][ny] == 0 and dist[nx][ny] == -1:  # 길+미방문\n                dist[nx][ny] = dist[x][y] + 1  # 거리 = 현재+1\n                q.append((nx, ny))         # 다음 탐색 대상으로\n\nprint(dist[2][2])                          # 도착 칸 최단거리 → 4"
    },
    "links": [
      {
        "label": "정렬 HOW TO (파이썬 공식·한글)",
        "url": "https://docs.python.org/ko/3/howto/sorting.html"
      },
      {
        "label": "collections 공식 문서(한글)",
        "url": "https://docs.python.org/ko/3/library/collections.html"
      },
      {
        "label": "heapq 공식 문서(한글)",
        "url": "https://docs.python.org/ko/3/library/heapq.html"
      }
    ]
  },
  {
    "id": "numpy",
    "name": "NumPy",
    "tag": "라이브러리",
    "level": 2,
    "weight": 3,
    "desc": "pandas·scikit-learn·PyTorch가 모두 그 위에 서 있는 수치 계산의 뿌리. 머신러닝 모델링·딥러닝 과목 전에 배열 감각을 잡아두면 수업이 쉬워집니다.",
    "sections": [
      {
        "h": "ndarray 기본기",
        "items": [
          "np.array / zeros / arange 로 배열 만들기",
          "dtype: 배열 전체가 같은 자료형(int64, float32...)",
          "shape: (행, 열) — 모든 에러의 8할은 shape 불일치",
          "reshape(-1, 1)로 형태 바꾸기(-1은 자동 계산)"
        ]
      },
      {
        "h": "브로드캐스팅",
        "items": [
          "배열 + 숫자: 숫자가 전체에 자동으로 퍼짐",
          "(3,4) + (4,) 처럼 모양이 맞으면 자동 확장",
          "정규화 한 줄: (x - x.mean()) / x.std()",
          "모양이 안 맞으면 에러 — shape부터 print"
        ]
      },
      {
        "h": "인덱싱·불리언 마스크",
        "items": [
          "a[행, 열] 2차원 인덱싱과 슬라이싱 a[:, 0]",
          "조건식 a > 5 는 True/False 배열(마스크)을 만듦",
          "a[a > 5] 로 조건에 맞는 값만 골라내기",
          "np.where(조건, 참값, 거짓값) 조건 치환"
        ]
      },
      {
        "h": "벡터화 vs 반복문",
        "items": [
          "for문으로 원소 하나씩 = 느림(파이썬 레벨)",
          "배열 연산 한 줄 = 빠름(C 레벨에서 일괄 처리)",
          "합·평균도 sum() 대신 np.sum() / arr.mean()",
          "axis=0은 열 방향, axis=1은 행 방향 집계"
        ]
      },
      {
        "h": "난수·통계와 ML에서의 역할",
        "items": [
          "rng = np.random.default_rng(42) 시드 고정 난수",
          "mean / std / min / argmax 기본 통계",
          "pandas의 열, sklearn의 X, torch.Tensor 모두 ndarray가 원형",
          "이미지=3차원 배열, 임베딩=2차원 배열 — 데이터는 결국 배열"
        ]
      }
    ],
    "practice": [
      "점수 정규화: 학생 20명의 점수 배열을 만들어 평균 0, 표준편차 1로 표준화하고 원본 평균·표준편차와 비교",
      "마스크 필터링: 난수 100개 중 70 이상인 값의 개수와 평균을 불리언 마스크로 구하기(np.where로 합격/불합격 라벨도 생성)",
      "속도 비교: 100만 개 원소 제곱합을 for문과 벡터화(arr ** 2).sum() 두 방식으로 구해 time으로 시간 측정",
      "성적표 집계: (학생 5, 과목 3) 2차원 배열에서 axis를 바꿔가며 학생별 평균과 과목별 평균을 각각 계산"
    ],
    "tips": [
      "막히면 무조건 print(arr.shape, arr.dtype) — 에러 메시지보다 정보가 많음",
      "정수 배열에 3.5를 넣으면 3이 됨(dtype 고정) — 소수가 필요하면 처음부터 float로",
      "슬라이싱은 원본을 공유(뷰) — 복사본이 필요하면 .copy()를 명시",
      "난수는 np.random.default_rng(시드) 방식이 최신 권장 — 시드를 고정해야 실험 재현 가능",
      "반복문을 쓰고 있다면 \"NumPy 함수 한 줄로 되지 않을까?\"를 먼저 검색"
    ],
    "snippet": {
      "lang": "python",
      "code": "# 브로드캐스팅 + 불리언 마스크 한 번에 맛보기\nimport numpy as np                          # 수치 계산 라이브러리\n\nrng = np.random.default_rng(42)             # 시드 고정 난수 생성기\nscores = rng.integers(50, 100, size=(4, 3)) # 학생4 x 과목3 점수\nprint(scores.shape, scores.dtype)           # (4, 3) int64 확인\n\nz = (scores - scores.mean()) / scores.std() # 표준화(브로드캐스팅)\nprint(z.round(2))                           # 평균0 기준 상대 위치\n\nhigh = scores >= 80                         # 80점 이상 True 마스크\nprint(scores[high])                         # 조건에 맞는 값만 추출\nprint(high.sum(), \"과목이 80점 이상\")        # True 개수 = 합계\n\navg_by_subject = scores.mean(axis=0)        # 열 방향 = 과목별 평균\nprint(avg_by_subject.round(1))              # 과목 3개의 평균 점수"
    },
    "links": [
      {
        "label": "NumPy 공식 절대 초보자 가이드",
        "url": "https://numpy.org/doc/stable/user/absolute_beginners.html"
      },
      {
        "label": "NumPy 브로드캐스팅 공식 설명",
        "url": "https://numpy.org/doc/stable/user/basics.broadcasting.html"
      },
      {
        "label": "파이썬 코딩도장 NumPy 사용하기",
        "url": "https://dojang.io/mod/page/view.php?id=2461"
      }
    ]
  },
  {
    "id": "matplotlib",
    "name": "Matplotlib · 시각화",
    "tag": "라이브러리",
    "level": 1,
    "weight": 2,
    "desc": "숫자를 그림으로 바꿔 인사이트를 전달하는 표준 도구. 데이터 분석·EDA와 모델 학습곡선 확인 등 실습 전반의 선수 지식입니다.",
    "sections": [
      {
        "h": "Figure와 Axes 구조",
        "items": [
          "Figure = 도화지, Axes = 그 위의 그래프 한 칸",
          "fig, ax = plt.subplots() 가 표준 시작 코드",
          "ax.plot(...) 그리고 → plt.show() 로 표시",
          "plt.plot 단축형보다 ax 방식이 확장에 유리"
        ]
      },
      {
        "h": "기본 차트 4종",
        "items": [
          "line(plot): 시간에 따른 변화·추세",
          "bar: 범주별 크기 비교",
          "scatter: 두 변수의 관계·상관",
          "hist: 값의 분포(구간별 빈도)"
        ]
      },
      {
        "h": "한글 폰트 설정",
        "items": [
          "기본 설정에선 한글이 네모(□)로 깨짐",
          "Windows: plt.rc(\"font\", family=\"Malgun Gothic\")",
          "macOS: AppleGothic, Colab은 나눔폰트 설치 후 재시작",
          "음수 부호 깨짐 방지: plt.rc(\"axes\", unicode_minus=False)"
        ]
      },
      {
        "h": "여러 그래프와 꾸미기",
        "items": [
          "plt.subplots(2, 2) 로 2x2 격자 배치",
          "set_title / set_xlabel / legend 로 제목·축·범례",
          "figsize=(가로, 세로) 로 크기 조절",
          "plt.style.use(\"ggplot\") 등 스타일 한 줄 변경"
        ]
      },
      {
        "h": "pandas 연동 · seaborn 소개",
        "items": [
          "df.plot(kind=\"bar\") — DataFrame에서 바로 그리기",
          "df[\"col\"].hist() 로 분포 즉시 확인",
          "groupby 집계 결과를 .plot()으로 이어 그리기",
          "seaborn: matplotlib 위에서 통계 차트를 더 예쁘게(sns.heatmap 등)"
        ]
      }
    ],
    "practice": [
      "월별 매출 추이: 12개월 매출 리스트를 선 그래프로 그리고 제목·축 라벨·범례를 한글로 달기(폰트 설정 포함)",
      "분포 관찰: 난수 1000개(정규분포)를 hist로 그리고 bins를 10/30/100으로 바꿔 모양 변화 관찰",
      "2x2 대시보드: 같은 데이터로 line·bar·scatter·hist 네 가지를 subplots(2,2)에 한 화면 배치",
      "pandas 연동: CSV를 DataFrame으로 읽어 groupby 집계 후 .plot(kind=\"bar\")까지 한 흐름으로 그리기"
    ],
    "tips": [
      "그래프에 한글을 쓸 계획이면 폰트 설정 두 줄을 노트북 맨 위에 습관처럼 붙여두기",
      "차트 선택 공식: 추세=line, 비교=bar, 관계=scatter, 분포=hist",
      "plt.savefig(\"out.png\", dpi=150) 은 plt.show() 보다 먼저 호출해야 빈 그림이 안 나옴",
      "Colab에서 나눔폰트 설치 후에는 런타임 다시 시작을 해야 적용됨",
      "색·꾸밈보다 제목과 축 라벨이 먼저 — 라벨 없는 그래프는 남이 못 읽음"
    ],
    "snippet": {
      "lang": "python",
      "code": "# 한글 제목이 있는 2단 차트 (line + bar)\nimport matplotlib.pyplot as plt             # 시각화 라이브러리\n\nplt.rc(\"font\", family=\"AppleGothic\")        # 한글 폰트(맥) / 윈도우는 Malgun Gothic\nplt.rc(\"axes\", unicode_minus=False)         # 음수 부호 깨짐 방지\n\nmonths = [\"1월\", \"2월\", \"3월\", \"4월\"]       # x축 범주(한글)\nsales = [120, 150, 90, 200]                 # 월별 매출 데이터\n\nfig, axes = plt.subplots(1, 2, figsize=(10, 4))  # 도화지에 그래프 2칸\naxes[0].plot(months, sales, marker=\"o\")     # 왼쪽: 추세용 선 그래프\naxes[0].set_title(\"월별 매출 추이\")          # 왼쪽 그래프 제목\naxes[1].bar(months, sales, color=\"tan\")     # 오른쪽: 비교용 막대\naxes[1].set_title(\"월별 매출 비교\")          # 오른쪽 그래프 제목\n\nfig.tight_layout()                          # 겹침 없이 여백 정리\nplt.show()                                  # 화면에 표시"
    },
    "links": [
      {
        "label": "Matplotlib 공식 Quick Start",
        "url": "https://matplotlib.org/stable/users/explain/quick_start.html"
      },
      {
        "label": "Matplotlib Tutorial (위키독스·한글)",
        "url": "https://wikidocs.net/book/5011"
      },
      {
        "label": "seaborn 공식 문서",
        "url": "https://seaborn.pydata.org/"
      }
    ]
  },
  {
    "id": "fastapi",
    "name": "FastAPI",
    "tag": "라이브러리",
    "level": 2,
    "weight": 2,
    "desc": "타입 힌트 기반의 현대적 파이썬 API 프레임워크. \"모델 서빙 및 AIOps\" 과목에서 모델을 API로 배포하기 전에 익혀둘 선수 기초입니다.",
    "sections": [
      {
        "h": "첫 API 만들기",
        "items": [
          "app = FastAPI() 인스턴스 생성",
          "@app.get(\"/\") 데코레이터로 라우팅",
          "함수가 dict를 반환하면 자동으로 JSON 응답",
          "설치: pip install fastapi uvicorn"
        ]
      },
      {
        "h": "경로·쿼리 파라미터",
        "items": [
          "@app.get(\"/items/{item_id}\") 경로 파라미터",
          "함수 인자 타입 힌트(item_id: int)로 자동 형변환·검증",
          "경로에 없는 인자는 쿼리 파라미터(?q=abc)가 됨",
          "기본값을 주면 선택 파라미터(q: str = \"\")"
        ]
      },
      {
        "h": "Pydantic 모델과 POST",
        "items": [
          "BaseModel 상속 클래스로 요청 본문 스키마 정의",
          "타입이 안 맞으면 FastAPI가 알아서 422 에러 응답",
          "@app.post + 함수 인자로 모델을 받으면 JSON 자동 파싱",
          "응답도 모델로 정의하면 문서·검증이 함께 됨"
        ]
      },
      {
        "h": "실행과 자동 문서",
        "items": [
          "uvicorn main:app --reload 로 개발 서버 실행",
          "--reload: 코드 저장 시 자동 재시작(개발용)",
          "/docs: Swagger UI에서 브라우저로 바로 테스트",
          "/redoc: 읽기 좋은 문서 뷰 자동 생성"
        ]
      },
      {
        "h": "ML 추론 API 패턴",
        "items": [
          "서버 시작 시 모델을 한 번만 로드(전역 or lifespan)",
          "입력 Pydantic 모델 → predict → 결과 JSON 반환",
          "요청마다 모델을 다시 읽으면 치명적으로 느려짐",
          "이후 확장: Docker로 감싸 배포(→ Docker 기초 주제)"
        ]
      }
    ],
    "practice": [
      "헬로 API: GET / 와 GET /hello/{name} 두 라우트를 만들고 /docs에서 직접 호출해보기",
      "계산 API: GET /add?a=3&b=5 쿼리 파라미터 버전과, Pydantic 모델로 받는 POST /add 버전을 모두 구현해 차이 비교",
      "검증 체험: 숫자 필드에 문자열을 보내 422 에러 응답을 관찰하고, 에러 메시지에서 어떤 필드가 왜 실패했는지 읽어보기",
      "미니 추론 API: 붓꽃(iris) 모델을 학습·저장한 뒤 서버 시작 시 로드하고, 꽃 측정값 4개를 받아 품종을 반환하는 POST /predict 완성"
    ],
    "tips": [
      "주소를 붙일 땐 uvicorn main:app --host 0.0.0.0 --port 8000 형태 — Docker·클라우드에서 필수",
      "타입 힌트가 곧 검증이자 문서 — int/float/str을 정확히 적을수록 API가 좋아짐",
      "Flask보다 좋은 점을 하나만 꼽으면 /docs 자동 문서 — 프론트엔드 협업이 훨씬 쉬워짐",
      "무거운 모델 로드는 요청 함수 밖에서 한 번만 — 함수 안에 넣는 실수가 가장 흔함",
      "async def는 외부 API 호출 등 대기가 많을 때 유리 — 처음엔 일반 def로 시작해도 충분"
    ],
    "snippet": {
      "lang": "python",
      "code": "# 간단 ML 추론 API 뼈대 (uvicorn main:app --reload 로 실행)\nfrom fastapi import FastAPI                 # 웹 프레임워크\nfrom pydantic import BaseModel              # 입력 검증용 모델\n\napp = FastAPI(title=\"붓꽃 예측 API\")         # 앱 생성(+문서 제목)\nmodel = load_model(\"iris.pkl\")              # 시작 시 모델 1회 로드\nclass IrisInput(BaseModel):                 # 요청 본문 스키마 정의\n    sepal_len: float                        # 꽃받침 길이\n    sepal_wid: float                        # 꽃받침 너비\n    petal_len: float                        # 꽃잎 길이\n    petal_wid: float                        # 꽃잎 너비\n\n@app.get(\"/hello/{name}\")                   # 경로 파라미터 라우트\ndef hello(name: str, lang: str = \"ko\"):     # lang은 쿼리 파라미터\n    return {\"message\": \"안녕하세요 \" + name} # dict → JSON 자동 변환\n\n@app.post(\"/predict\")                       # POST 추론 엔드포인트\ndef predict(item: IrisInput):               # JSON 본문 자동 파싱·검증\n    x = [[item.sepal_len, item.sepal_wid, item.petal_len, item.petal_wid]]  # 2차원 입력\n    return {\"species\": model.predict(x)[0]} # 예측 결과 JSON 반환"
    },
    "links": [
      {
        "label": "FastAPI 공식 문서(한글)",
        "url": "https://fastapi.tiangolo.com/ko/"
      },
      {
        "label": "FastAPI 자습서(한글)",
        "url": "https://fastapi.tiangolo.com/ko/tutorial/"
      },
      {
        "label": "점프 투 FastAPI (위키독스)",
        "url": "https://wikidocs.net/book/8531"
      }
    ]
  },
  {
    "id": "scikit-learn",
    "name": "Scikit-learn",
    "tag": "라이브러리",
    "level": 2,
    "weight": 3,
    "desc": "파이썬 머신러닝의 표준 라이브러리. 머신러닝·딥러닝 이해와 실전 Feature Engineering 과목을 듣기 전에 fit/predict 흐름만 익혀두면 실습이 훨씬 편해집니다.",
    "sections": [
      {
        "h": "핵심 패턴: fit / predict",
        "items": [
          "모든 모델이 같은 사용법 — 학습은 fit(), 예측은 predict()",
          "분류 확률이 필요하면 predict_proba()",
          "전처리기는 fit_transform()으로 배우고 변환까지 한 번에",
          "사용법이 통일되어 있어 모델 교체가 한 줄로 끝남"
        ]
      },
      {
        "h": "데이터 분할",
        "items": [
          "train_test_split으로 학습용/평가용 분리(보통 8:2)",
          "random_state를 고정하면 매번 같은 결과로 재현 가능",
          "stratify=y로 분류 문제의 클래스 비율을 유지",
          "평가는 반드시 모델이 못 본 test 데이터로"
        ]
      },
      {
        "h": "전처리",
        "items": [
          "StandardScaler — 평균 0, 표준편차 1로 표준화",
          "OneHotEncoder / pd.get_dummies — 범주형을 숫자로",
          "SimpleImputer — 결측치를 평균·중앙값 등으로 대치",
          "전처리기의 fit은 학습 데이터에만(테스트는 transform만)"
        ]
      },
      {
        "h": "대표 모델 3종",
        "items": [
          "LogisticRegression — 이름과 달리 분류 모델, 해석이 쉬움",
          "RandomForestClassifier — 나무 여러 그루의 다수결, 강력한 기본기",
          "KMeans — 정답 없이 비슷한 것끼리 묶는 군집(비지도학습)",
          "작고 단순한 모델부터 시작해 성능 기준선(baseline)을 잡기"
        ]
      },
      {
        "h": "평가지표 · Pipeline",
        "items": [
          "accuracy_score — 전체 중 맞힌 비율(불균형 데이터엔 부족)",
          "f1_score — 정밀도·재현율의 조화평균, 불균형 데이터에 유용",
          "confusion_matrix — 무엇을 무엇으로 헷갈렸는지 표로 확인",
          "Pipeline으로 전처리+모델을 묶으면 실수(데이터 누수)가 줄어듦"
        ]
      }
    ],
    "practice": [
      "load_iris 데이터로 train_test_split → LogisticRegression 학습 → accuracy 출력",
      "같은 데이터에 StandardScaler 유무로 성능 비교해 보기",
      "RandomForestClassifier로 바꿔 학습하고 feature_importances_ 확인",
      "confusion_matrix를 출력해 어떤 클래스를 헷갈리는지 해석해 보기"
    ],
    "tips": [
      "외울 것은 fit → predict → 평가지표, 이 세 단계뿐",
      "random_state=42처럼 시드를 고정해야 결과를 재현·비교할 수 있음",
      "스케일링은 거리 기반 모델(KNN·SVM·KMeans)에 특히 중요",
      "테스트 데이터에 fit을 다시 하면 데이터 누수 — transform만 할 것",
      "정확도가 높아 보여도 클래스가 불균형하면 f1_score를 같이 볼 것"
    ],
    "snippet": {
      "lang": "python",
      "code": "# 붓꽃 데이터로 sklearn의 기본 흐름(분할 -> 전처리 -> 학습 -> 평가) 익히기\nfrom sklearn.datasets import load_iris                    # 연습용 데이터셋\nfrom sklearn.model_selection import train_test_split      # 학습/평가 분할 도구\nfrom sklearn.preprocessing import StandardScaler          # 표준화 전처리기\nfrom sklearn.linear_model import LogisticRegression       # 로지스틱 회귀(분류)\nfrom sklearn.pipeline import Pipeline                     # 전처리+모델 묶기\nfrom sklearn.metrics import accuracy_score, f1_score      # 평가 지표\n\nX, y = load_iris(return_X_y=True)                         # 특성 X와 정답 y 불러오기\nX_train, X_test, y_train, y_test = train_test_split(      # 학습용/평가용으로 분리\n    X, y, test_size=0.2, random_state=42, stratify=y)     # 20%는 평가용, 비율 유지\n\nmodel = Pipeline([(\"scaler\", StandardScaler()),           # 1단계: 표준화\n                  (\"clf\", LogisticRegression())])         # 2단계: 분류 모델\nmodel.fit(X_train, y_train)                               # 학습은 언제나 fit\npred = model.predict(X_test)                              # 예측은 언제나 predict\nprint(\"정확도:\", accuracy_score(y_test, pred))            # 전체 중 맞힌 비율\nprint(\"F1점수:\", f1_score(y_test, pred, average=\"macro\")) # 클래스별 균형 지표\n"
    },
    "links": [
      {
        "label": "scikit-learn 공식 시작 가이드",
        "url": "https://scikit-learn.org/stable/getting_started.html"
      },
      {
        "label": "scikit-learn 사용자 가이드",
        "url": "https://scikit-learn.org/stable/user_guide.html"
      }
    ]
  },
  {
    "id": "pytorch",
    "name": "PyTorch 기초",
    "tag": "라이브러리",
    "level": 3,
    "weight": 3,
    "desc": "딥러닝 프레임워크의 사실상 표준. 모델 개발·최적화와 sLLM 과목의 선수 지식으로, 텐서와 학습 루프 5단계만 이해하면 수업을 따라갈 수 있습니다.",
    "sections": [
      {
        "h": "텐서(Tensor)",
        "items": [
          "넘파이 배열과 비슷한 다차원 숫자 상자 — 딥러닝의 기본 단위",
          "torch.tensor / torch.randn / torch.zeros 로 생성",
          "shape(모양)와 dtype(자료형)을 항상 먼저 확인하는 습관",
          "numpy() / from_numpy 로 NumPy와 자유롭게 오가기"
        ]
      },
      {
        "h": "GPU 사용",
        "items": [
          "torch.cuda.is_available() 로 GPU 사용 가능 여부 확인",
          ".to(\"cuda\") 로 텐서·모델을 GPU 메모리로 이동",
          "모델과 데이터는 반드시 같은 장치(device)에 있어야 함",
          "Colab에서 무료 GPU로 바로 실습 가능"
        ]
      },
      {
        "h": "autograd(자동 미분)",
        "items": [
          "requires_grad=True 인 텐서는 연산 과정을 기억함",
          "loss.backward() 한 줄이면 모든 기울기(gradient)가 자동 계산",
          "기울기 = 손실을 줄이려면 가중치를 어느 방향으로 움직일지에 대한 힌트",
          "직접 미분식을 쓸 일이 없다는 것이 PyTorch의 핵심 편의"
        ]
      },
      {
        "h": "nn.Module로 모델 만들기",
        "items": [
          "nn.Linear(입력수, 출력수) — 가장 기본 레이어",
          "nn.ReLU 같은 활성화 함수로 비선형성 부여",
          "간단한 구조는 nn.Sequential 로 층을 순서대로 쌓기",
          "커스텀 모델은 nn.Module 상속 + __init__(레이어) + forward(계산)"
        ]
      },
      {
        "h": "학습 루프 · DataLoader",
        "items": [
          "5단계 반복: 순전파 → 손실 계산 → zero_grad → backward → step",
          "DataLoader(dataset, batch_size, shuffle)로 미니배치 공급",
          "학습 때는 model.train(), 평가 때는 model.eval()",
          "평가·추론은 torch.no_grad() 안에서(기울기 계산 끔 → 빠르고 가벼움)"
        ]
      }
    ],
    "practice": [
      "torch.randn(3, 4) 텐서를 만들어 shape·dtype·평균을 출력해 보기",
      "requires_grad=True 텐서로 y = x**2 를 만들고 backward 후 x.grad 확인",
      "nn.Sequential 3층 모델로 임의 데이터를 100 에포크 학습시키고 손실 감소 관찰",
      "Colab에서 GPU 런타임으로 바꿔 .to(\"cuda\") 전후 연산 속도 비교"
    ],
    "tips": [
      "에러의 90%는 shape 불일치 — print(x.shape)를 습관처럼",
      "optimizer.zero_grad()를 빼먹으면 기울기가 누적되어 학습이 이상해짐",
      "\"같은 device\" 에러가 나면 모델·데이터 모두 .to(device) 했는지 확인",
      "loss가 줄어드는지 매 에포크 출력하며 학습을 눈으로 확인할 것",
      "Dropout·BatchNorm 때문에 train()/eval() 모드 전환을 잊지 말 것"
    ],
    "snippet": {
      "lang": "python",
      "code": "# 가장 작은 학습 루프 — 이 5단계가 모든 딥러닝 학습의 뼈대\nimport torch                                         # 파이토치 불러오기\nimport torch.nn as nn                                # 신경망 레이어 모듈\n\ndevice = \"cuda\" if torch.cuda.is_available() else \"cpu\"   # GPU 있으면 GPU 사용\nX = torch.randn(100, 3).to(device)                   # 입력 100건(특성 3개)\ny = torch.randn(100, 1).to(device)                   # 정답값 100건\n\nmodel = nn.Sequential(nn.Linear(3, 16),              # 입력 3 -> 은닉 16\n                      nn.ReLU(),                     # 비선형 활성화 함수\n                      nn.Linear(16, 1)).to(device)   # 은닉 16 -> 출력 1\nloss_fn = nn.MSELoss()                               # 손실 함수(평균제곱오차)\nopt = torch.optim.Adam(model.parameters(), lr=0.01)  # 옵티마이저(가중치 갱신 담당)\nfor epoch in range(100):                             # 100번 반복 학습\n    pred = model(X)                                  # 1) 순전파: 예측값 계산\n    loss = loss_fn(pred, y)                          # 2) 손실: 예측과 정답의 차이\n    opt.zero_grad()                                  # 3) 이전 기울기 초기화(필수)\n    loss.backward()                                  # 4) 역전파: 기울기 자동 계산\n    opt.step()                                       # 5) 가중치 한 걸음 업데이트\nprint(\"최종 손실:\", loss.item())                     # 손실이 줄었는지 확인\n"
    },
    "links": [
      {
        "label": "PyTorch 한국어 튜토리얼",
        "url": "https://tutorials.pytorch.kr/"
      },
      {
        "label": "PyTorch 공식 60분 입문",
        "url": "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html"
      },
      {
        "label": "PyTorch 공식 문서",
        "url": "https://pytorch.org/docs/stable/index.html"
      }
    ]
  },
  {
    "id": "transformers",
    "name": "Hugging Face Transformers",
    "tag": "라이브러리",
    "level": 3,
    "weight": 3,
    "desc": "공개 AI 모델을 몇 줄로 내려받아 쓰게 해주는 라이브러리. sLLM 개발과 LangChain 기반 서비스 개발 과목의 선수 지식입니다.",
    "sections": [
      {
        "h": "pipeline() 한 줄 추론",
        "items": [
          "pipeline(\"sentiment-analysis\") 처럼 작업 이름만 주면 끝",
          "요약·번역·질의응답·텍스트생성 등 수십 개 태스크 지원",
          "model= 인자로 허브의 원하는 모델을 지정 가능",
          "내부에서 토큰화 → 모델 추론 → 후처리를 전부 대신 해줌"
        ]
      },
      {
        "h": "모델 허브에서 받기",
        "items": [
          "huggingface.co/models 에서 수십만 개 공개 모델 검색",
          "from_pretrained(\"조직명/모델명\") 한 줄로 자동 다운로드",
          "처음 한 번만 받고 이후엔 로컬 캐시(~/.cache/huggingface) 재사용",
          "모델 카드(README)에서 용도·언어·라이선스를 꼭 확인"
        ]
      },
      {
        "h": "토큰화 개념",
        "items": [
          "모델은 문장을 그대로 못 읽음 — 토큰(조각) ID 숫자로 변환 필요",
          "AutoTokenizer가 모델에 맞는 토큰화 방식을 자동 선택",
          "한 단어가 여러 토큰으로 쪼개지기도 함(한국어는 특히 잘게)",
          "[CLS], [SEP] 같은 특수 토큰이 자동으로 붙음"
        ]
      },
      {
        "h": "AutoTokenizer / AutoModel",
        "items": [
          "토크나이저와 모델은 반드시 같은 이름으로 짝 맞춰 로드",
          "분류는 AutoModelForSequenceClassification 등 용도별 클래스",
          "직접 쓰면 pipeline보다 세밀한 제어 가능(입력·출력 커스텀)",
          "흐름: 문장 → 토크나이저 → 텐서 → 모델 → 결과 해석"
        ]
      },
      {
        "h": "GPU · dtype 선택",
        "items": [
          "pipeline(..., device=0) 또는 device_map=\"auto\"로 GPU 사용",
          "torch_dtype=torch.float16 이면 메모리 절반으로 큰 모델 로드",
          "GPU 메모리가 부족하면 더 작은 모델·양자화 모델을 선택",
          "한국어 모델 예시: klue/bert-base, skt/kogpt2-base-v2"
        ]
      }
    ],
    "practice": [
      "pipeline(\"sentiment-analysis\")로 한국어 문장 3개의 감성 분석해 보기",
      "AutoTokenizer(\"klue/bert-base\")로 같은 문장의 토큰 분해 결과 관찰",
      "허브에서 한국어 요약 모델을 검색해 pipeline(\"summarization\")으로 실행",
      "Colab GPU에서 device=0 지정 전후의 추론 속도 비교해 보기"
    ],
    "tips": [
      "처음엔 무조건 pipeline부터 — 개념 잡힌 뒤 Auto 클래스로 내려가기",
      "모델 이름 오타가 가장 흔한 에러 — 허브 페이지에서 복사해 붙여넣기",
      "큰 모델을 받기 전 파일 크기(GB)를 확인 — Colab 디스크·메모리 한계 주의",
      "토큰 수 제한(max_length)을 넘는 긴 입력은 잘리므로 분할 처리",
      "같은 태스크라도 모델마다 성능 차이가 큼 — 다운로드 수·좋아요를 참고"
    ],
    "snippet": {
      "lang": "python",
      "code": "# 파이프라인 한 줄 추론 + 토큰화가 무엇인지 눈으로 확인하기\nfrom transformers import pipeline                     # 한 줄 추론 도구\n\nclf = pipeline(                                       # 감성 분석 파이프라인 생성\n    \"sentiment-analysis\",                             # 태스크 이름 지정\n    model=\"nlptown/bert-base-multilingual-uncased-sentiment\")  # 다국어 별점 모델\nprint(clf(\"이 강의는 정말 유익해요\"))                 # 별점(1~5) 예측 결과 출력\n\nfrom transformers import AutoTokenizer                # 모델 짝꿍 토크나이저\ntok = AutoTokenizer.from_pretrained(\"klue/bert-base\") # 한국어 BERT 토크나이저 로드\nids = tok(\"안녕하세요 스칼라\")[\"input_ids\"]           # 문장 -> 토큰 ID 숫자 목록\nprint(ids)                                            # 모델이 실제로 읽는 숫자들\nprint(tok.convert_ids_to_tokens(ids))                 # ID -> 토큰 조각으로 역변환\n"
    },
    "links": [
      {
        "label": "Transformers 공식 문서(한국어)",
        "url": "https://huggingface.co/docs/transformers/ko/index"
      },
      {
        "label": "Hugging Face 모델 허브",
        "url": "https://huggingface.co/models"
      },
      {
        "label": "Hugging Face NLP 코스",
        "url": "https://huggingface.co/learn/nlp-course/ko/chapter1/1"
      }
    ]
  },
  {
    "id": "openai-api",
    "name": "OpenAI API 기초",
    "tag": "라이브러리",
    "level": 2,
    "weight": 3,
    "desc": "LLM을 코드에서 호출하는 가장 표준적인 방법. 생성형 AI 서비스 개발(LangChain)과 AI Agent 과목의 선수 지식으로, 키 관리와 호출 구조·비용 감각을 먼저 잡습니다.",
    "sections": [
      {
        "h": "API 키 발급 · 보관",
        "items": [
          "platform.openai.com → API keys 에서 발급(발급 순간만 전체 표시)",
          "키는 코드가 아니라 .env 파일에 저장하고 python-dotenv로 로드",
          ".env는 반드시 .gitignore에 추가 — 키가 GitHub에 올라가면 즉시 악용됨",
          "유출이 의심되면 그 키를 지우고(revoke) 새로 발급"
        ]
      },
      {
        "h": "기본 호출 구조",
        "items": [
          "client.chat.completions.create(model=..., messages=[...])",
          "messages는 대화 기록 리스트 — 딕셔너리 하나가 발화 하나",
          "응답 본문은 resp.choices[0].message.content 에 들어 있음",
          "모델명은 gpt-4o-mini 처럼 문자열로 지정(소형 모델이 저렴)"
        ]
      },
      {
        "h": "역할(role) 이해",
        "items": [
          "system — AI의 정체성·말투·규칙을 정하는 지침(맨 앞 1개)",
          "user — 사용자의 질문·요청",
          "assistant — AI의 이전 답변(대화를 이어갈 때 함께 전달)",
          "API는 기억이 없음 — 이전 대화를 매번 messages에 다시 담아 보냄"
        ]
      },
      {
        "h": "주요 파라미터",
        "items": [
          "temperature(0~2) — 낮으면 일관·사실형, 높으면 창의·다양",
          "max_tokens — 출력 길이 상한(비용 폭주 방지 안전장치)",
          "stream=True — 답변을 조각(chunk) 단위로 받아 타자 치듯 출력",
          "같은 질문도 temperature에 따라 답이 달라짐을 직접 실험"
        ]
      },
      {
        "h": "비용(토큰) 감각",
        "items": [
          "과금 기준은 토큰 — 입력(프롬프트)과 출력(답변) 모두 계산",
          "한국어는 영어보다 같은 내용에 토큰을 더 많이 소모하는 편",
          "resp.usage 로 이번 호출의 토큰 수를 즉시 확인 가능",
          "대시보드에서 월 사용 한도(limit)를 먼저 걸어두고 실습할 것"
        ]
      }
    ],
    "practice": [
      ".env 파일에 키를 넣고 os.environ으로 읽어 첫 호출 성공시키기",
      "system 지침을 \"해적처럼 말하기\"로 바꿔 답변 변화 관찰",
      "temperature 0과 1.5로 같은 질문을 3번씩 보내 답변 비교",
      "매 호출 후 resp.usage.total_tokens를 출력해 비용 감각 익히기"
    ],
    "tips": [
      "키를 코드에 직접 쓰면 커밋 한 번에 유출 — 항상 환경변수로",
      "SDK는 OPENAI_API_KEY 환경변수가 있으면 자동 인식(OpenAI() 만으로 동작)",
      "실습은 소형 모델(gpt-4o-mini 등)로 — 품질 대비 수십 배 저렴",
      "429 에러는 요청 과다 또는 잔액 부족 — 결제·한도 설정을 확인",
      "챗봇을 만들 땐 대화 이력이 길어질수록 입력 토큰이 늘어남을 기억"
    ],
    "snippet": {
      "lang": "python",
      "code": "# 키는 .env에서 읽고, 역할·파라미터·토큰 사용량까지 한 번에 익히기\nimport os                                            # 환경변수 읽기용\nfrom dotenv import load_dotenv                       # .env 파일 로더\nfrom openai import OpenAI                            # OpenAI 공식 SDK\n\nload_dotenv()                                        # .env 내용을 환경변수로 로드\nclient = OpenAI(api_key=os.environ[\"OPENAI_API_KEY\"])  # 키는 코드에 쓰지 않기\n\nresp = client.chat.completions.create(               # 대화형 API 호출\n    model=\"gpt-4o-mini\",                             # 저렴한 소형 모델로 실습\n    messages=[                                       # 대화 기록 리스트\n        {\"role\": \"system\", \"content\": \"당신은 친절한 파이썬 튜터입니다.\"},  # AI 지침\n        {\"role\": \"user\", \"content\": \"리스트와 튜플 차이를 한 줄로 알려줘\"},  # 질문\n    ],                                               # 이전 대화도 여기에 이어 담음\n    temperature=0.3,                                 # 낮을수록 일관된 답변\n    max_tokens=200,                                  # 출력 상한 = 비용 안전장치\n)                                                    # 호출 실행\nprint(resp.choices[0].message.content)               # 답변 본문 출력\nprint(\"사용 토큰:\", resp.usage.total_tokens)         # 과금 기준 토큰 수 확인\n"
    },
    "links": [
      {
        "label": "OpenAI 퀵스타트",
        "url": "https://platform.openai.com/docs/quickstart"
      },
      {
        "label": "Chat Completions API 레퍼런스",
        "url": "https://platform.openai.com/docs/api-reference/chat"
      },
      {
        "label": "OpenAI API 요금표",
        "url": "https://openai.com/api/pricing/"
      }
    ]
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
      // 2026-07-15 강병호 강사 공유 — 수업 공식 소스 저장소
      { label: '수업 공식 소스 — skala-vue (강병호 강사)', url: 'https://github.com/bottletiger/skala-vue' },
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
      // 2026-07-15 수령 HTML/CSS/JS 수업 실습 링크 모음(link.txt) 반영 — 수업에서 쓰는 셀프 챌린지
      { label: '수업 공식 소스 — skala-front (강병호 강사)', url: 'https://github.com/bottletiger/skala-front' },
      { label: 'W3Schools HTML 튜토리얼', url: 'https://www.w3schools.com/html/default.asp' },
      { label: 'W3Schools CSS 챌린지(셀프 실습)', url: 'https://www.w3schools.com/css/css_challenges_howto.asp' },
      { label: 'W3Schools JS 튜토리얼', url: 'https://www.w3schools.com/js/default.asp' },
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
