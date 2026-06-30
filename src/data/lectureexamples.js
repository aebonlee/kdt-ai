// 강의안 날짜별 "실습 예제" — subjectId-day 키.
// 각 예제: { title, lang, code, note }
// (lectureplans.js 의 schedule/practice 를 보완하는 기술 코드 예제)

export const examples = {
  // ── 팀빌딩 · Git 이해/활용 ──
  'git-1': [
    {
      title: 'Git 기본 흐름 — init → add → commit',
      lang: 'bash',
      code: `# 사용자 정보(최초 1회)
git config --global user.name "Aebon Lee"
git config --global user.email "aebon@example.com"

# 새 저장소 시작
mkdir my-project && cd my-project
git init

# 파일 만들고 상태 확인
echo "# My Project" > README.md
git status            # Untracked files: README.md

# 스테이징 → 커밋
git add README.md
git commit -m "docs: 프로젝트 README 추가"

git log --oneline     # 커밋 이력 한 줄로 확인`,
      note: 'add는 "커밋에 담을 변경 고르기", commit은 "스냅샷 저장"이다. 커밋 메시지는 "타입: 무엇을" 형식으로 일관되게.',
    },
    {
      title: '브랜치 협업 — branch → push → Pull Request',
      lang: 'bash',
      code: `# 기능 브랜치 생성 후 이동
git switch -c feature/login

# 작업 후 커밋
git add .
git commit -m "feat: 로그인 화면 추가"

# 원격에 브랜치 올리기
git remote add origin https://github.com/team/repo.git
git push -u origin feature/login

# 이후 GitHub에서 Pull Request 생성 → 리뷰 → main에 merge
# 머지 후 로컬 동기화
git switch main
git pull origin main`,
      note: 'main에 직접 커밋하지 않고 브랜치 → PR → 리뷰 → merge 흐름이 협업의 기본. 충돌은 PR 단계에서 미리 드러난다.',
    },
  ],

  // ── LLM과 Transformer 아키텍처 ──
  'transformer-1': [
    {
      title: '토큰화와 임베딩 유사도',
      lang: 'python',
      code: `from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")
sents = ["고양이가 잔다", "강아지가 잔다", "주가가 폭락했다"]
emb = model.encode(sents)  # (3, 384) 임베딩

def cos(a, b):
    return a @ b / (np.linalg.norm(a) * np.linalg.norm(b))

print(round(cos(emb[0], emb[1]), 3))  # 고양이~강아지: 높음
print(round(cos(emb[0], emb[2]), 3))  # 고양이~주가:  낮음`,
      note: '의미가 비슷한 문장일수록 임베딩 벡터의 코사인 유사도가 높다. LLM은 이런 벡터 공간 위에서 의미를 다룬다.',
    },
    {
      title: 'Scaled Dot-Product Attention',
      lang: 'python',
      code: `import numpy as np

def softmax(x, axis=-1):
    e = np.exp(x - x.max(axis=axis, keepdims=True))
    return e / e.sum(axis=axis, keepdims=True)

def attention(Q, K, V):
    d_k = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d_k)   # 유사도
    weights = softmax(scores)          # 가중치(합=1)
    return weights @ V, weights

# 토큰 3개, 차원 4 가정
np.random.seed(0)
Q = K = V = np.random.randn(3, 4)
out, w = attention(Q, K, V)
print("attention weights:\\n", w.round(2))`,
      note: 'QKᵀ로 토큰 간 유사도를 구하고 √d로 나눠 안정화한 뒤 softmax로 가중치를 만든다. 그 가중치로 V를 합친 것이 출력.',
    },
  ],
  'transformer-2': [
    {
      title: 'PyTorch Transformer 인코더 블록',
      lang: 'python',
      code: `import torch, torch.nn as nn

class EncoderBlock(nn.Module):
    def __init__(self, d_model=64, n_heads=4, d_ff=256):
        super().__init__()
        self.attn = nn.MultiheadAttention(d_model, n_heads, batch_first=True)
        self.ff = nn.Sequential(
            nn.Linear(d_model, d_ff), nn.ReLU(),
            nn.Linear(d_ff, d_model),
        )
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)

    def forward(self, x):
        a, _ = self.attn(x, x, x)        # Self-Attention
        x = self.norm1(x + a)            # 잔차연결 + LayerNorm
        f = self.ff(x)
        return self.norm2(x + f)         # 잔차연결 + LayerNorm

x = torch.randn(1, 5, 64)  # (배치, 토큰5, d_model)
print(EncoderBlock()(x).shape)  # torch.Size([1, 5, 64])`,
      note: 'Multi-Head Attention → 잔차연결+LayerNorm → FFN → 잔차연결+LayerNorm. 이 블록을 여러 층 쌓은 것이 Transformer.',
    },
    {
      title: '사전학습 모델 추론 — BERT 마스크 채우기',
      lang: 'python',
      code: `from transformers import pipeline

# 인코더(BERT): 양방향 문맥으로 빈칸 채우기
fill = pipeline("fill-mask", model="bert-base-multilingual-cased")
for r in fill("서울은 대한민국의 [MASK]이다.")[:3]:
    print(round(r["score"], 3), r["token_str"])

# 디코더(GPT류): 다음 토큰 생성
gen = pipeline("text-generation", model="gpt2")
print(gen("Transformer is", max_new_tokens=20)[0]["generated_text"])`,
      note: 'BERT는 빈칸(MASK)을 양방향 문맥으로 채우고, GPT는 앞 문맥만 보고 다음 토큰을 이어 생성한다 — 인코더 vs 디코더의 차이.',
    },
  ],

  // ── 데이터 분석을 위한 Python 이해 ──
  'python-1': [
    {
      title: '자료구조 + 컴프리헨션',
      lang: 'python',
      code: `scores = [88, 92, 79, 95, 60]

# 기본 통계
print("평균:", sum(scores) / len(scores))
print("최고:", max(scores), "최저:", min(scores))

# 컴프리헨션: 80점 이상만 추출
passed = [s for s in scores if s >= 80]
print("합격:", passed)

# 딕셔너리로 단어 빈도수
text = "data is data and code is code"
freq = {}
for w in text.split():
    freq[w] = freq.get(w, 0) + 1
print(freq)  # {'data': 2, 'is': 2, ...}`,
      note: 'get(w, 0)으로 키가 없을 때 기본값 0을 써서 안전하게 누적한다. 컴프리헨션은 반복+조건을 한 줄로.',
    },
    {
      title: 'NumPy 벡터 연산 vs 반복문',
      lang: 'python',
      code: `import numpy as np

a = np.array([1, 2, 3, 4, 5])

# 벡터화: 반복문 없이 일괄 연산
print(a * 2)            # [ 2  4  6  8 10]
print(a.mean(), a.std())

# 표준화(평균 0, 표준편차 1)
z = (a - a.mean()) / a.std()
print(z)

# 조건 인덱싱 — 3보다 큰 값만
print(a[a > 3])         # [4 5]`,
      note: '배열 단위 연산(벡터화)은 파이썬 반복문보다 훨씬 빠르고 코드가 간결하다.',
    },
  ],
  'python-2': [
    {
      title: 'Pandas 적재·정제·집계',
      lang: 'python',
      code: `import pandas as pd

df = pd.read_csv("sales.csv")
print(df.info())              # 자료형·결측 확인

# 결측치 처리
df["amount"] = df["amount"].fillna(df["amount"].median())
df = df.drop_duplicates()

# 조건 선택(loc)
vip = df.loc[df["amount"] >= 100000, ["user", "amount"]]

# 그룹 집계
by_region = df.groupby("region")["amount"].agg(["sum", "mean", "count"])
print(by_region.sort_values("sum", ascending=False))`,
      note: 'fillna(median)로 결측을 중앙값 대체. groupby+agg로 범주별 합계·평균·건수를 한 번에 산출.',
    },
    {
      title: '시각화 (matplotlib · seaborn)',
      lang: 'python',
      code: `import seaborn as sns
import matplotlib.pyplot as plt

# 분포
sns.histplot(df["amount"], bins=30)
plt.title("금액 분포")
plt.show()

# 상관 히트맵
corr = df.select_dtypes("number").corr()
sns.heatmap(corr, annot=True, cmap="Blues")
plt.show()`,
      note: 'select_dtypes("number")로 수치형만 골라 상관계수를 구하고 히트맵으로 관계를 한눈에 본다.',
    },
  ],

  // ── 웹 서비스 개발 mini-Project ──
  'webproject-1': [
    {
      title: 'API 설계서 예시 (REST)',
      lang: 'text',
      code: `엔티티: Post(id, title, body, author, createdAt)

GET    /api/posts        목록 조회   → 200 [Post]
GET    /api/posts/:id    상세 조회   → 200 Post / 404
POST   /api/posts        생성        → 201 Post
PUT    /api/posts/:id    수정        → 200 Post
DELETE /api/posts/:id    삭제        → 204

예) POST /api/posts
요청  { "title": "첫 글", "body": "내용", "author": "kim" }
응답  { "id": 1, "title": "첫 글", ... , "createdAt": "2026-09-08T01:00:00Z" }`,
      note: '엔드포인트·메서드·상태코드·요청/응답 예시를 표로 먼저 합의하면 프론트/백 병행 개발이 쉬워진다.',
    },
  ],
  'webproject-2': [
    {
      title: '목록-상세 데이터 연동 (React)',
      lang: 'javascript',
      code: `import { useEffect, useState } from "react"

function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => {
        if (!r.ok) throw new Error("불러오기 실패")
        return r.json()
      })
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>불러오는 중…</p>
  if (error) return <p>에러: {error}</p>
  if (posts.length === 0) return <p>게시글이 없습니다.</p>

  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}><a href={\`/posts/\${p.id}\`}>{p.title}</a></li>
      ))}
    </ul>
  )
}`,
      note: '로딩·에러·빈 상태 3가지를 항상 처리하는 것이 실전 UI의 기본. key에는 고유 id를 쓴다.',
    },
  ],
  'webproject-3': [
    {
      title: '환경변수 분리 + 빌드·배포',
      lang: 'bash',
      code: `# .env (커밋 금지 — .gitignore 에 추가)
VITE_API_BASE=https://api.example.com

# 코드에서 사용
#   const base = import.meta.env.VITE_API_BASE

# 프로덕션 빌드
npm run build        # dist/ 생성

# 정적 호스팅 배포 예 (GitHub Pages)
#   dist 를 gh-pages 브랜치로 배포하거나 Actions 사용
npm run preview      # 빌드 결과 로컬 확인`,
      note: 'API 주소·키는 .env로 분리하고 커밋하지 않는다. preview로 배포 전 빌드본을 검증한다.',
    },
  ],

  // ── 실전 Feature Engineering ──
  'feature-1': [
    {
      title: '전처리 + 인코딩 파이프라인 (sklearn)',
      lang: 'python',
      code: `from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer

num = ["age", "income"]
cat = ["city", "grade"]

num_pipe = Pipeline([
    ("impute", SimpleImputer(strategy="median")),
    ("scale", StandardScaler()),
])
cat_pipe = Pipeline([
    ("impute", SimpleImputer(strategy="most_frequent")),
    ("oh", OneHotEncoder(handle_unknown="ignore")),
])

pre = ColumnTransformer([
    ("num", num_pipe, num),
    ("cat", cat_pipe, cat),
])
X_processed = pre.fit_transform(X_train)   # fit은 train에서만!`,
      note: 'fit은 train에만 적용하고 valid/test는 transform만 해야 데이터 누수를 막는다. ColumnTransformer로 수치·범주를 따로 처리.',
    },
    {
      title: '파생 피처 — 날짜·상호작용',
      lang: 'python',
      code: `import pandas as pd

df["dt"] = pd.to_datetime(df["dt"])
df["dow"] = df["dt"].dt.dayofweek          # 요일(0~6)
df["is_weekend"] = (df["dow"] >= 5).astype(int)
df["month"] = df["dt"].dt.month

# 상호작용·비율 피처
df["price_per_qty"] = df["price"] / (df["qty"] + 1)

# 구간화(binning)
df["age_band"] = pd.cut(df["age"], bins=[0, 20, 40, 60, 100],
                        labels=["10s", "30s", "50s", "60+"])`,
      note: '날짜에서 요일·월·주말 여부를 뽑고, 비율·구간 같은 파생 피처를 더하면 모델이 잡지 못한 패턴을 보강한다.',
    },
  ],

  // ── 모델 개발 및 최적화 ──
  'modeldev-1': [
    {
      title: '파이프라인 + 교차검증 베이스라인',
      lang: 'python',
      code: `from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

models = {
    "logreg": LogisticRegression(max_iter=1000),
    "rf": RandomForestClassifier(random_state=42),
}
for name, model in models.items():
    scores = cross_val_score(model, X, y, cv=cv, scoring="f1_macro")
    print(f"{name}: F1={scores.mean():.3f} (+/-{scores.std():.3f})")`,
      note: 'StratifiedKFold로 클래스 비율을 유지하며 교차검증. 평균과 표준편차를 함께 봐서 안정성까지 비교한다.',
    },
  ],
  'modeldev-2': [
    {
      title: 'Optuna 하이퍼파라미터 튜닝',
      lang: 'python',
      code: `import optuna
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier

def objective(trial):
    params = {
        "n_estimators": trial.suggest_int("n_estimators", 100, 600),
        "max_depth": trial.suggest_int("max_depth", 3, 20),
        "min_samples_split": trial.suggest_int("min_samples_split", 2, 10),
    }
    model = RandomForestClassifier(**params, random_state=42)
    return cross_val_score(model, X, y, cv=5, scoring="f1_macro").mean()

study = optuna.create_study(direction="maximize")
study.optimize(objective, n_trials=30)
print("best:", study.best_params, study.best_value)`,
      note: 'Optuna는 이전 시도 결과를 바탕으로 다음 후보를 똑똑하게 고른다(Grid보다 적은 시도로 더 좋은 값). 목적함수는 CV 점수를 반환.',
    },
  ],

  // ── Prompt 설계와 Context Engineering ──
  'prompt-1': [
    {
      title: '구조화 출력(JSON) 강제 + Few-shot',
      lang: 'text',
      code: `[System]
너는 고객 문의를 분류하는 분류기다.
반드시 아래 JSON 스키마로만 답한다.
{"category": "배송|결제|환불|기타", "urgent": true|false}

[Few-shot]
입력: "결제했는데 두 번 빠져나갔어요" → {"category":"결제","urgent":true}
입력: "배송 언제 오나요?"            → {"category":"배송","urgent":false}

[User]
입력: "환불 신청했는데 일주일째 감감무소식이에요"`,
      note: '역할·스키마·예시·제약을 분리해 제시하면 출력 형식이 안정된다. urgent 같은 파생 라벨도 예시로 학습시킨다.',
    },
    {
      title: 'Anthropic API 호출 (Python)',
      lang: 'python',
      code: `import anthropic

client = anthropic.Anthropic()  # ANTHROPIC_API_KEY 환경변수
msg = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=512,
    system="너는 한국어로 간결하게 답하는 분석가다.",
    messages=[{"role": "user", "content": "이 리뷰의 감성을 한 단어로: '배송도 빠르고 품질도 좋아요'"}],
)
print(msg.content[0].text)`,
      note: 'system 으로 역할을 고정하고, max_tokens 로 비용을 통제한다. 동일 프롬프트를 temperature 로 바꿔 일관성을 비교해 본다.',
    },
  ],

  // ── Vue.js ──
  'vue-1': [
    {
      title: '반응형 상태 + computed (SFC)',
      lang: 'html',
      code: `<script setup>
import { ref, computed } from 'vue'
const items = ref([{ text: 'AI 복습', done: false }])
const newText = ref('')
const remaining = computed(() => items.value.filter(i => !i.done).length)
function add() {
  if (!newText.value) return
  items.value.push({ text: newText.value, done: false })
  newText.value = ''
}
</script>

<template>
  <input v-model="newText" @keyup.enter="add" placeholder="할 일" />
  <ul>
    <li v-for="(i, idx) in items" :key="idx">
      <input type="checkbox" v-model="i.done" /> {{ i.text }}
    </li>
  </ul>
  <p>남은 일: {{ remaining }}</p>
</template>`,
      note: 'ref 로 감싼 값은 .value 로 접근(템플릿에선 자동 언랩). computed 는 의존 상태가 바뀔 때만 재계산된다.',
    },
  ],
  'vue-2': [
    {
      title: 'props / emit 컴포넌트 통신',
      lang: 'html',
      code: `<!-- TodoItem.vue -->
<script setup>
defineProps({ text: String, done: Boolean })
const emit = defineEmits(['toggle'])
</script>
<template>
  <li :class="{ done }">
    <input type="checkbox" :checked="done" @change="emit('toggle')" />
    {{ text }}
  </li>
</template>`,
      note: '데이터는 props 로 내려주고(단방향), 변경은 emit 이벤트로 부모에 위임한다. 자식이 props 를 직접 수정하지 않는다.',
    },
  ],
  'vue-3': [
    {
      title: 'Pinia 스토어 + Router',
      lang: 'javascript',
      code: `// stores/todos.js
import { defineStore } from 'pinia'
export const useTodos = defineStore('todos', {
  state: () => ({ list: [] }),
  getters: { remaining: (s) => s.list.filter(t => !t.done).length },
  actions: { add(text) { this.list.push({ text, done: false }) } },
})

// router.js
import { createRouter, createWebHistory } from 'vue-router'
export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./pages/List.vue') },
    { path: '/detail/:id', component: () => import('./pages/Detail.vue') },  // 동적 파라미터
  ],
})`,
      note: '전역 상태는 Pinia, 화면 전환은 Router 로 분리한다. 컴포넌트에서 const todos = useTodos() 로 사용.',
    },
    {
      title: '네비게이션 가드 (인증)',
      lang: 'javascript',
      code: `// 라우트 진입 전에 인증을 확인해 접근을 제어한다
router.beforeEach((to) => {
  const isAuthed = !!localStorage.getItem('token')
  // meta.requiresAuth 가 true 인데 미인증이면 로그인으로 리다이렉트
  if (to.meta.requiresAuth && !isAuthed) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  // true(또는 반환 없음)면 그대로 진행
})`,
      note: 'beforeEach 글로벌 가드로 보호 라우트 접근을 막는다. 객체를 반환하면 해당 경로로 리다이렉트.',
    },
  ],
  'vue-4': [
    {
      title: 'API 연동 + 비동기 상태 (composable)',
      lang: 'javascript',
      code: `// composables/useFetch.js — 로딩/에러/데이터 3-상태를 재사용
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function run() {
    loading.value = true; error.value = null
    try {
      const res = await fetch(url)            // 네트워크 요청
      if (!res.ok) throw new Error('HTTP ' + res.status)
      data.value = await res.json()           // 성공
    } catch (e) {
      error.value = e.message                 // 실패 메시지
    } finally {
      loading.value = false                   // 항상 로딩 해제
    }
  }
  return { data, error, loading, run }
}`,
      note: '데이터 패칭 로직을 composable 로 추출해 여러 화면에서 재사용한다. finally 로 로딩 해제를 보장.',
    },
    {
      title: 'API 베이스 환경변수 + 빌드',
      lang: 'bash',
      code: `# .env (Vite 는 VITE_ 접두어만 클라이언트에 노출)
VITE_API_BASE=https://api.example.com

# 코드: import.meta.env.VITE_API_BASE 로 접근
# 빌드 & 미리보기
npm run build      # dist/ 생성
npm run preview    # 로컬에서 배포본 확인`,
      note: 'API 주소를 환경변수로 분리하면 개발/운영 전환이 쉽다. VITE_ 접두어가 없으면 번들에 포함되지 않는다.',
    },
  ],

  // ── Spring AI (현재 미배정 — 참고용 보존) ──
  'spring-ai-1': [
    {
      title: 'ChatClient REST 컨트롤러 (Java)',
      lang: 'java',
      code: `@RestController
class ChatController {
    private final ChatClient chat;
    ChatController(ChatClient.Builder builder) {
        this.chat = builder.defaultSystem("너는 친절한 상담원이다.").build();
    }

    @PostMapping("/chat")
    String chat(@RequestBody String message) {
        return chat.prompt()
                   .user(message)
                   .call()
                   .content();
    }
}`,
      note: 'ChatClient.Builder 로 시스템 프롬프트를 고정하고, prompt().user(..).call() 체인으로 호출한다. 모델/키는 application.yml 에 둔다.',
    },
  ],
  'spring-ai-2': [
    {
      title: 'VectorStore 적재 + 유사도 검색',
      lang: 'java',
      code: `// 적재
List<Document> docs = new TokenTextSplitter()
        .apply(List.of(new Document(longText)));
vectorStore.add(docs);

// 검색 후 RAG 프롬프트
List<Document> hits = vectorStore.similaritySearch(
        SearchRequest.query(question).withTopK(4));
String context = hits.stream().map(Document::getText)
        .collect(Collectors.joining("\\n---\\n"));
String answer = chat.prompt()
        .system("아래 컨텍스트만 근거로 답하라.\\n" + context)
        .user(question).call().content();`,
      note: 'TokenTextSplitter 로 청킹 후 VectorStore(pgvector 등)에 적재. 검색 결과를 system 컨텍스트로 주입하면 RAG.',
    },
  ],
  'spring-ai-3': [
    {
      title: 'Function Calling (Tool)',
      lang: 'java',
      code: `// 도구 정의
public record WeatherReq(String city) {}
@Bean
@Description("도시의 현재 날씨를 조회한다")
Function<WeatherReq, String> currentWeather() {
    return req -> weatherApi.fetch(req.city());  // 외부 API
}

// 호출 시 도구 활성화
String result = chat.prompt()
        .user("서울 날씨 알려줘")
        .functions("currentWeather")
        .call().content();`,
      note: '@Description 메타데이터로 모델이 언제 도구를 부를지 판단한다. 모델이 필요 시 currentWeather 를 호출하고 결과를 답변에 반영.',
    },
  ],

  // ── sLLM ──
  'sllm-1': [
    {
      title: 'Ollama 로컬 추론 (Python)',
      lang: 'python',
      code: `import ollama

resp = ollama.chat(model="qwen2.5:7b", messages=[
    {"role": "system", "content": "너는 간결한 코드 리뷰어다."},
    {"role": "user", "content": "이 함수의 시간복잡도는? def f(n): return sum(range(n))"},
])
print(resp["message"]["content"])

# 같은 프롬프트로 모델 교체 비교
for m in ["llama3.1:8b", "gemma2:9b"]:
    print(m, ollama.chat(model=m, messages=[...])["message"]["content"][:80])`,
      note: '로컬에서 모델만 바꿔 품질·속도를 비교한다. 양자화 태그(:7b-q4_0 등)로 메모리 사용을 조절.',
    },
  ],
  'sllm-2': [
    {
      title: 'LoRA 파인튜닝 (PEFT)',
      lang: 'python',
      code: `from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM, TrainingArguments

model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-0.5B")
lora = LoraConfig(r=8, lora_alpha=16, target_modules=["q_proj", "v_proj"],
                  lora_dropout=0.05, task_type="CAUSAL_LM")
model = get_peft_model(model, lora)
model.print_trainable_parameters()   # 전체의 ~1%만 학습

# Trainer(model, args=TrainingArguments(...), train_dataset=ds).train()
model.save_pretrained("./adapter")   # 어댑터만 저장(수 MB)`,
      note: 'LoRA 는 일부 행렬만 학습해 메모리·시간을 크게 줄인다. 결과물은 작은 어댑터 파일로, 원본 모델에 얹어 추론.',
    },
  ],

  // ── ML/DL ──
  'ml-dl-1': [
    {
      title: 'scikit-learn 학습·평가',
      lang: 'python',
      code: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

X, y = load_breast_cancer(return_X_y=True)
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

clf = RandomForestClassifier(n_estimators=200).fit(Xtr, ytr)
print(classification_report(yte, clf.predict(Xte)))
print("CV:", cross_val_score(clf, X, y, cv=5).mean())`,
      note: 'stratify 로 클래스 비율을 유지, cross_val_score 로 일반화 성능을 확인한다. precision/recall/F1 을 함께 본다.',
    },
  ],
  'ml-dl-2': [
    {
      title: 'PyTorch 학습 루프',
      lang: 'python',
      code: `import torch, torch.nn as nn

model = nn.Sequential(nn.Linear(30, 64), nn.ReLU(), nn.Linear(64, 2))
opt = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

for epoch in range(20):
    model.train()
    for xb, yb in train_loader:
        opt.zero_grad()
        loss = loss_fn(model(xb), yb)
        loss.backward()      # 역전파
        opt.step()           # 가중치 갱신
    # 검증 정확도 측정 ...`,
      note: 'zero_grad → forward → loss → backward → step 이 학습의 핵심 4단계. 에폭마다 검증 손실을 추적해 과적합을 감지.',
    },
  ],
  'ml-dl-3': [
    {
      title: '전이학습 (torchvision)',
      lang: 'python',
      code: `import torch, torchvision as tv
from torch import nn

model = tv.models.resnet18(weights="IMAGENET1K_V1")
for p in model.parameters():      # 특징 추출부 동결
    p.requires_grad = False
model.fc = nn.Linear(model.fc.in_features, 5)   # 5-클래스로 교체

# model.fc 만 학습 → 적은 데이터로도 빠르게 수렴
opt = torch.optim.Adam(model.fc.parameters(), lr=1e-3)`,
      note: '사전학습 가중치를 동결하고 마지막 분류층만 새로 학습. 데이터가 적을 때 베이스라인 대비 큰 향상을 얻는다.',
    },
  ],

  // ── RAG ──
  'rag-1': [
    {
      title: '청킹 → 임베딩 → 벡터DB 적재',
      lang: 'python',
      code: `from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=80)
chunks = splitter.split_documents(docs)

db = Chroma.from_documents(chunks, OpenAIEmbeddings(), persist_directory="./db")
print(db.similarity_search("환불 정책", k=3))`,
      note: 'chunk_overlap 으로 경계에서 의미가 끊기지 않게 한다. chunk_size 를 바꿔가며 검색 품질을 비교.',
    },
  ],
  'rag-2': [
    {
      title: 'RAG 체인 (검색→생성)',
      lang: 'python',
      code: `from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI

retriever = db.as_retriever(search_kwargs={"k": 4})
prompt = ChatPromptTemplate.from_template(
    "컨텍스트만 근거로 답하라. 모르면 모른다고 답하라.\\n\\n{context}\\n\\n질문: {question}")

chain = ({"context": retriever, "question": RunnablePassthrough()}
         | prompt | ChatOpenAI(model="gpt-4o-mini"))
print(chain.invoke("환불은 며칠 걸려?").content)`,
      note: 'retriever 결과를 컨텍스트로 주입하는 LCEL 파이프라인. "모르면 모른다" 지시로 환각을 억제.',
    },
  ],
  'rag-3': [
    {
      title: 'RAGAS 자동 평가',
      lang: 'python',
      code: `from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision
from datasets import Dataset

data = Dataset.from_dict({
    "question": questions, "answer": answers,
    "contexts": contexts, "ground_truth": truths,
})
report = evaluate(data, metrics=[faithfulness, answer_relevancy, context_precision])
print(report)   # 충실도/관련성/문맥정밀도 점수`,
      note: '튜닝 전/후 동일 평가셋으로 점수를 비교해 개선을 정량 검증한다. 낮은 지표가 병목(검색 vs 생성)을 알려준다.',
    },
  ],

  // ── LangChain ──
  'langchain-1': [
    {
      title: 'LCEL 기본 체인',
      lang: 'python',
      code: `from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_openai import ChatOpenAI

prompt = ChatPromptTemplate.from_template(
    "다음 문장의 감성을 JSON 으로: {text}\\n형식: {{\\"label\\": \\"긍정|부정\\"}}")
chain = prompt | ChatOpenAI(model="gpt-4o-mini") | JsonOutputParser()
print(chain.invoke({"text": "배송이 너무 느려요"}))  # {'label': '부정'}`,
      note: 'prompt | model | parser 를 파이프로 잇는 LCEL. JsonOutputParser 로 결과를 dict 로 바로 받는다.',
    },
  ],
  'langchain-2': [
    {
      title: '메모리 포함 대화 체인',
      lang: 'python',
      code: `from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

prompt = ChatPromptTemplate.from_messages([
    ("system", "너는 학습 도우미다."),
    MessagesPlaceholder("history"),
    ("human", "{input}"),
])
store = {}
chat = RunnableWithMessageHistory(
    prompt | model, lambda sid: store.setdefault(sid, InMemoryChatMessageHistory()),
    input_messages_key="input", history_messages_key="history")
chat.invoke({"input": "내 이름은 민수야"}, config={"configurable": {"session_id": "u1"}})`,
      note: 'MessagesPlaceholder 에 히스토리를 끼워 멀티턴 맥락을 유지. session_id 별로 대화가 분리된다.',
    },
  ],
  'langchain-3': [
    {
      title: 'FastAPI 스트리밍 엔드포인트',
      lang: 'python',
      code: `from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()

@app.get("/ask")
def ask(q: str):
    def gen():
        for chunk in chain.stream({"question": q}):
            yield chunk.content
    return StreamingResponse(gen(), media_type="text/plain")`,
      note: 'chain.stream 의 토큰을 StreamingResponse 로 흘려보내면 타자 치듯 응답이 표시된다(체감 지연 감소).',
    },
  ],

  // ── 모델 서빙 / AIOps ──
  'serving-1': [
    {
      title: 'FastAPI 추론 API',
      lang: 'python',
      code: `from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load("model.pkl")

class Req(BaseModel):
    features: list[float]

@app.post("/predict")
def predict(req: Req):
    pred = model.predict([req.features])[0]
    return {"prediction": int(pred)}`,
      note: 'Pydantic 으로 입력 스키마를 강제(검증). 모델은 앱 시작 시 1회 로드해 요청마다 재로딩을 피한다.',
    },
  ],
  'serving-2': [
    {
      title: '추론 서비스 Dockerfile',
      lang: 'docker',
      code: `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", \\
     "-w", "2", "app:app", "--bind", "0.0.0.0:8000"]`,
      note: 'slim 베이스로 이미지 경량화, 의존성 레이어를 먼저 복사해 캐시 효율을 높인다. gunicorn+uvicorn 워커로 서빙.',
    },
  ],
  'serving-3': [
    {
      title: 'CI/CD (GitHub Actions)',
      lang: 'yaml',
      code: `name: deploy
on: { push: { branches: [main] } }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt && pytest -q
      - run: docker build -t registry/app:\${{ github.sha }} .
      - run: docker push registry/app:\${{ github.sha }}
      # 이후 배포 단계(예: kubectl set image / render deploy hook)`,
      note: '테스트 통과 → 이미지 빌드 → 푸시 → 배포의 표준 파이프라인. 커밋 SHA 를 태그로 써서 롤백을 쉽게 한다.',
    },
  ],

  // ── AI Agent (LangGraph) ──
  'agent-1': [
    {
      title: '단일 ReAct 에이전트 (LangGraph)',
      lang: 'python',
      code: `from langgraph.prebuilt import create_react_agent
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI

@tool
def add(a: int, b: int) -> int:
    """두 수를 더한다."""
    return a + b

agent = create_react_agent(ChatOpenAI(model="gpt-4o-mini"), tools=[add])
out = agent.invoke({"messages": [("user", "12와 30을 더하면?")]})
print(out["messages"][-1].content)`,
      note: '@tool 로 함수를 도구화하면 에이전트가 추론 중 필요할 때 호출(ReAct). 도구 docstring 이 호출 판단의 근거가 된다.',
    },
  ],
  'agent-2': [
    {
      title: '상태 그래프 + 분기 (StateGraph)',
      lang: 'python',
      code: `from langgraph.graph import StateGraph, START, END
from typing import TypedDict

class S(TypedDict):
    q: str
    answer: str

def research(s): return {"answer": f"검색결과: {s['q']}"}
def review(s):   return {"answer": s["answer"] + " (검수완료)"}

g = StateGraph(S)
g.add_node("research", research)
g.add_node("review", review)
g.add_edge(START, "research")
g.add_edge("research", "review")
g.add_edge("review", END)
app = g.compile()
print(app.invoke({"q": "RAG란?"}))`,
      note: '노드(작업)와 엣지(흐름)로 워크플로를 명시적으로 설계. 조건부 엣지(add_conditional_edges)로 멀티 에이전트 분기를 만든다.',
    },
  ],

  // ── Vector DB ──
  'vectordb-1': [
    {
      title: 'pgvector 유사도 검색 (SQL)',
      lang: 'sql',
      code: `create extension if not exists vector;
create table docs (
  id bigserial primary key,
  content text,
  embedding vector(1536)
);
create index on docs using hnsw (embedding vector_cosine_ops);

-- 질의 임베딩과 코사인 거리 기준 top-5
select content, 1 - (embedding <=> :query_vec) as score
from docs order by embedding <=> :query_vec limit 5;`,
      note: '<=> 는 코사인 거리 연산자. HNSW 인덱스로 대량 데이터에서도 빠른 근사 검색. 1 - 거리 = 유사도 점수.',
    },
    {
      title: 'FAISS 검색 (Python)',
      lang: 'python',
      code: `import faiss, numpy as np

index = faiss.IndexFlatIP(1536)        # 내적(코사인용 정규화 전제)
index.add(np.array(doc_embeddings, dtype="float32"))
D, I = index.search(np.array([query_emb], dtype="float32"), k=5)
print("상위 문서 인덱스:", I[0])`,
      note: 'IndexFlatIP 는 정확하지만 느림 → 대규모에선 IVF/HNSW 인덱스 사용. 임베딩을 정규화하면 내적이 코사인과 같다.',
    },
  ],

  // ── Capstone ──
  'capstone-1': [
    {
      title: '에이전트 시스템 아키텍처(개념)',
      lang: 'text',
      code: `사용자 ──▶ [UI]
                │ 질의
                ▼
        [Agent(LangGraph)] ── tool ─▶ [외부 API]
                │
       retrieve │             ┌─────────────┐
                └──────────▶ │ Vector DB    │ ◀── 임베딩 적재(배치)
                              └─────────────┘
                │ 컨텍스트
                ▼
            [LLM] ──▶ 답변 + 출처`,
      note: '캡스톤은 UI–에이전트–도구–RAG(VectorDB)–LLM 의 데이터 흐름을 먼저 그린다. 각 박스의 입력/출력 계약을 명확히.',
    },
  ],
  'capstone-2': [
    {
      title: '에이전트 + RAG 통합 골격',
      lang: 'python',
      code: `@tool
def search_docs(query: str) -> str:
    """사내 문서에서 관련 내용을 검색한다."""
    hits = db.similarity_search(query, k=4)
    return "\\n---\\n".join(h.page_content for h in hits)

agent = create_react_agent(llm, tools=[search_docs, call_external_api])
# UI(FastAPI/Streamlit)에서 agent.invoke 호출 → 답변 + 근거 반환`,
      note: 'RAG 검색을 "도구"로 감싸면 에이전트가 필요할 때만 문서를 찾는다. 외부 API 도 같은 방식으로 도구화해 결합.',
    },
  ],
  'capstone-3': [
    {
      title: '시연용 통합 테스트',
      lang: 'python',
      code: `import pytest

@pytest.mark.parametrize("q,expect", [
    ("환불 절차 알려줘", "환불"),
    ("영업시간은?", "시간"),
])
def test_agent_answers(q, expect):
    out = agent.invoke({"messages": [("user", q)]})
    text = out["messages"][-1].content
    assert expect in text and len(text) > 10`,
      note: '시연 전 핵심 시나리오를 테스트로 고정하면 막판 수정에도 회귀를 방지한다. 발표 시 그대로 데모 스크립트로 활용.',
    },
  ],

  // ── Mini-project ──
  'miniproject-1': [
    {
      title: '프로젝트 골격 + 환경변수',
      lang: 'text',
      code: `app/
 ├─ api.py        # FastAPI 엔드포인트
 ├─ chain.py      # LLM/RAG/Agent 로직
 ├─ db.py         # Vector DB 접근
 ├─ requirements.txt
 └─ .env          # OPENAI_API_KEY, DB_URL ...

# .env 는 git 에 올리지 않는다(.gitignore)
# 키는 코드가 아닌 환경변수로 주입`,
      note: '역할별로 파일을 분리(관심사 분리)하면 협업·테스트가 쉬워진다. 비밀값은 .env + .gitignore 가 기본.',
    },
  ],
  'miniproject-2': [
    {
      title: '핵심 기능 엔드포인트',
      lang: 'python',
      code: `from fastapi import FastAPI
from pydantic import BaseModel
from chain import answer   # RAG/Agent 통합 함수

app = FastAPI()

class Ask(BaseModel):
    question: str

@app.post("/ask")
def ask(req: Ask):
    try:
        return {"answer": answer(req.question)}
    except Exception as e:
        return {"error": str(e)}`,
      note: 'AI 로직(chain)과 API 를 분리하고, 예외를 잡아 사용자에게 안전한 메시지를 반환한다.',
    },
  ],
  'miniproject-3': [
    {
      title: '배포 점검 체크리스트(스크립트)',
      lang: 'bash',
      code: `# 로컬 동작 확인
uvicorn app.api:app --reload &

# 헬스/핵심 기능 스모크 테스트
curl -s localhost:8000/health
curl -s -X POST localhost:8000/ask \\
     -H "Content-Type: application/json" \\
     -d '{"question":"테스트 질문"}'

# 컨테이너 빌드 후 배포(예: Render/registry)
docker build -t app:demo . && echo "build ok"`,
      note: '배포 전 헬스체크·핵심 API 스모크 테스트를 자동화. 실패 케이스(빈 입력·긴 입력)도 한 번씩 확인한다.',
    },
  ],
}

import { examplesExtra } from './lectureexamples2'

export const examplesFor = (subjectId, day) => {
  const key = `${subjectId}-${day}`
  return [...(examples[key] || []), ...(examplesExtra[key] || [])]
}
