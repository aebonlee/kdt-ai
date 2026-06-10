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
]
