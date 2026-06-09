// 선수학습자료 & 참고자료 데이터
// (학습자용 자료 + 강사 강의에 따른 보조 자료)

// ── 선수학습자료 ──
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
      { h: '설정', items: ['Build Command (예: pip install -r requirements.txt)', 'Start Command (예: gunicorn app:app)', '환경변수(Environment)'] },
      { h: '팁', items: ['GitHub 연동 자동 배포', '무료 플랜은 유휴 시 슬립(콜드스타트) 주의'] },
    ],
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
