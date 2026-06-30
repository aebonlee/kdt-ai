// 날짜별 "심화 이론(theory)" + "실전 소스(realCode)" — subjectId-day 키.
//   theory:   [{ h, body }]            상세 이론 정리(서술형)
//   realCode: [{ title, lang, code, note }]  길고 실전적인 소스 예시
// (1차: LLM·Agent 핵심 / 이후 ML·DL·Vue·서빙·프로젝트로 확장)

export const theory = {
  // ── 팀빌딩 · Git 이해/활용 ──
  'git-1': {
    theory: [
      {
        h: '왜 버전관리가 협업의 출발점인가',
        body: '여러 사람이 같은 코드를 동시에 고치면 "누가 무엇을 언제 바꿨는지", "어디서 깨졌는지", "어떻게 되돌릴지"가 곧바로 문제가 된다. Git은 변경을 커밋 단위 스냅샷으로 기록하고 각 커밋에 해시·작성자·메시지를 남겨, 모든 이력을 추적하고 임의의 시점으로 되돌릴 수 있게 한다. 파일을 통째로 복사해 덮어쓰는 방식과 달리, 변경의 맥락(왜 바꿨는가)이 메시지로 남기 때문에 코드가 곧 협업의 기록이 된다. 팀빌딩으로 합의한 그라운드룰(브랜치 규칙·커밋 컨벤션)이 이 기록의 품질을 좌우한다.',
      },
      {
        h: 'working tree · staging · commit 3단계',
        body: 'Git의 핵심은 세 영역의 흐름이다. 작업 폴더(working tree)에서 파일을 고치고, git add로 이번 커밋에 담을 변경만 staging area에 골라 올린 뒤, git commit으로 스냅샷을 저장소에 확정한다. 이 "고르기" 단계 덕분에 한 번에 여러 변경을 했어도 의미 단위로 쪼개 커밋할 수 있다. 좋은 커밋은 하나의 논리적 변경만 담고, 메시지는 "feat: 로그인 추가"처럼 타입과 의도를 드러낸다. 브랜치는 이 커밋들이 이어진 작업 흐름의 포인터이고, merge는 두 흐름을 합치는 일이다.',
      },
    ],
    realCode: [
      {
        title: '실전: 충돌(conflict) 만들고 해결하기',
        lang: 'bash',
        code: `# main에서 한 줄 수정·커밋
echo "title = Hello" > config.txt
git add config.txt && git commit -m "feat: title 설정"

# 브랜치에서 같은 줄을 다르게 수정
git switch -c feature/title
echo "title = Welcome" > config.txt
git commit -am "feat: title 문구 변경"

# main도 같은 줄을 수정했다고 가정하고 merge
git switch main
echo "title = Hi" > config.txt
git commit -am "feat: title 문구 수정"
git merge feature/title       # CONFLICT 발생

# config.txt 안에 충돌 표식이 생김:
# <<<<<<< HEAD
# title = Hi
# =======
# title = Welcome
# >>>>>>> feature/title
# → 원하는 내용만 남기고 표식 삭제 후
git add config.txt
git commit -m "merge: title 충돌 해결"`,
        note: '충돌은 "같은 줄을 서로 다르게 고쳤다"는 신호일 뿐 오류가 아니다. <<<< ==== >>>> 표식 사이에서 남길 내용을 사람이 결정한 뒤 add·commit으로 마무리한다.',
      },
    ],
  },

  // ── LLM과 Transformer 아키텍처 ──
  'transformer-1': {
    theory: [
      {
        h: 'RNN의 한계와 Attention의 등장',
        body: 'RNN/LSTM은 토큰을 앞에서부터 하나씩 순서대로 처리하며 상태(state)에 정보를 누적한다. 그래서 문장이 길어지면 앞쪽 정보가 뒤로 갈수록 희미해지는 장기 의존성 문제가 생기고, 본질적으로 순차적이라 GPU로 병렬화하기 어렵다. Attention은 "출력의 각 위치가 입력의 모든 위치를 직접 바라보고 중요도(가중치)를 매긴다"는 발상으로 이 둘을 동시에 푼다. 거리에 상관없이 관련 토큰을 직접 참조하므로 장기 의존성에 강하고, 모든 위치를 행렬 연산으로 한꺼번에 계산하므로 병렬화가 자연스럽다. Transformer는 순환(recurrence)을 완전히 버리고 Attention만으로 시퀀스를 처리한다.',
      },
      {
        h: 'Query·Key·Value로 보는 Self-Attention',
        body: '각 토큰 임베딩을 세 가지로 투영한다. Query는 "내가 무엇을 찾는가", Key는 "나는 무엇을 제공하는가", Value는 "실제로 전달할 내용"이다. 한 토큰의 Query를 모든 토큰의 Key와 내적해 유사도(점수)를 구하고, 차원이 커지면 점수가 과도하게 커지므로 √d_k로 나눠 안정화한다(Scaled). 이 점수를 softmax로 정규화해 합이 1인 가중치를 만들고, 각 토큰의 Value를 그 가중치로 합산하면 문맥이 반영된 새 표현이 된다. "그 은행에 갔다"에서 "은행"이 "강"이 아니라 "돈"과 연결되는 식의 문맥 해소가 바로 이 가중치로 일어난다.',
      },
    ],
    realCode: [
      {
        title: '실전: NumPy로 Self-Attention 한 스텝',
        lang: 'python',
        code: `import numpy as np

def softmax(x, axis=-1):
    e = np.exp(x - x.max(axis=axis, keepdims=True))
    return e / e.sum(axis=axis, keepdims=True)

# 토큰 4개, 임베딩 차원 8
np.random.seed(42)
X = np.random.randn(4, 8)

# 학습되는 투영 행렬(여기선 랜덤)
Wq, Wk, Wv = (np.random.randn(8, 8) for _ in range(3))
Q, K, V = X @ Wq, X @ Wk, X @ Wv

d_k = Q.shape[-1]
scores = Q @ K.T / np.sqrt(d_k)   # (4,4) 토큰 간 점수
weights = softmax(scores)          # 행마다 합=1
out = weights @ V                  # 문맥 반영 표현 (4,8)

print("가중치 행렬(합=1):\\n", weights.round(2))
print("출력 shape:", out.shape)`,
        note: '실제 모델에선 Wq·Wk·Wv가 학습으로 정해진다. 가중치 행렬의 각 행은 "이 토큰이 다른 토큰들을 얼마나 참조하는지"를 보여준다.',
      },
    ],
  },
  'transformer-2': {
    theory: [
      {
        h: 'Transformer 블록을 이루는 부품들',
        body: 'Transformer 한 층은 Multi-Head Attention과 Feed-Forward Network 두 서브층으로 이루어지고, 각 서브층 뒤에 잔차연결(x + f(x))과 LayerNorm이 붙는다. Multi-Head는 Attention을 여러 개로 나눠 각 head가 문법·의미·공참조 등 서로 다른 관계를 동시에 학습하게 한다. Attention 자체는 순서 정보가 없으므로 Positional Encoding으로 위치 벡터를 더해 "몇 번째 토큰인가"를 알려준다. FFN은 각 위치에 독립적으로 적용되는 비선형 변환으로 표현력을 키우고, 잔차연결은 기울기가 깊은 망을 잘 통과하도록, LayerNorm은 분포를 안정화해 학습을 돕는다. 이 동일한 블록을 수십 층 쌓고 폭을 키운 것이 곧 대형 모델이다.',
      },
      {
        h: '인코더·디코더와 사전학습 패러다임',
        body: '인코더는 입력 전체를 양방향으로 보며 이해에 강해 분류·검색·임베딩에 쓰이고(BERT), 디코더는 앞 토큰만 보며(인과 마스킹) 다음 토큰을 생성해 텍스트 생성에 쓰인다(GPT). T5처럼 둘을 모두 쓰는 seq2seq 구조도 있다. 현대 LLM의 힘은 구조 자체보다 "대규모 텍스트로 다음 토큰/마스크를 맞히는 자기지도 사전학습"에서 나온다. 사전학습으로 언어의 일반 능력을 얻은 뒤 소량 데이터로 과업에 맞춰 파인튜닝하거나, 프롬프트의 예시만으로 적응하는 in-context learning이 가능하다. 모델·데이터·연산을 함께 키우면 성능이 예측 가능하게 좋아진다는 스케일링 법칙이 대형화를 이끌었다.',
      },
    ],
    realCode: [
      {
        title: '실전: 사전학습 모델로 임베딩·생성 비교',
        lang: 'python',
        code: `import torch
from transformers import AutoTokenizer, AutoModel

# 인코더(BERT 계열): 문장 임베딩 추출
name = "sentence-transformers/all-MiniLM-L6-v2"
tok = AutoTokenizer.from_pretrained(name)
enc = AutoModel.from_pretrained(name)

def embed(text):
    batch = tok(text, return_tensors="pt", truncation=True)
    with torch.no_grad():
        out = enc(**batch)
    # 토큰 임베딩 평균 풀링 → 문장 벡터
    return out.last_hidden_state.mean(dim=1)[0]

a, b = embed("머신러닝 강의"), embed("딥러닝 수업")
cos = torch.cosine_similarity(a, b, dim=0)
print("문장 유사도:", round(cos.item(), 3))`,
        note: 'Transformer 인코더의 마지막 은닉상태를 평균 풀링하면 문장 임베딩이 된다. 이 벡터가 RAG·검색·분류의 입력이 된다.',
      },
    ],
  },

  // ── 데이터 분석을 위한 Python 이해 ──
  'python-1': {
    theory: [
      {
        h: '파이썬이 데이터 분석의 표준이 된 이유',
        body: '파이썬은 문법이 간결해 분석 로직을 빠르게 표현할 수 있고, NumPy·Pandas·scikit-learn·matplotlib로 이어지는 데이터 생태계가 촘촘하다. 특히 NumPy 배열은 C로 구현된 연속 메모리 블록 위에서 벡터화 연산을 수행하기 때문에, 같은 계산을 순수 파이썬 반복문으로 하는 것보다 수십~수백 배 빠르다. 분석에서 반복문 대신 배열·시리즈 단위 연산을 쓰는 습관이 성능과 가독성을 동시에 좌우한다.',
      },
      {
        h: '자료구조를 올바르게 고르는 기준',
        body: '리스트는 순서가 있고 가변이라 일반적인 시퀀스에, 튜플은 불변이라 변경되면 안 되는 묶음(좌표·레코드)에 적합하다. 딕셔너리는 키로 O(1) 조회가 가능해 집계·매핑에 강하고, 집합은 중복 제거와 멤버십 테스트(in)가 빠르다. 예를 들어 "이미 본 항목인가?"를 리스트로 확인하면 O(n)이지만 집합이면 O(1)이다. 자료구조 선택만으로도 코드의 시간복잡도가 달라진다.',
      },
    ],
    realCode: [
      {
        title: '실전: CSV 요약 통계 — 반복문 vs NumPy',
        lang: 'python',
        code: `import csv, time
import numpy as np

# 1) 순수 파이썬으로 평균·표준편차
def py_stats(values):
    n = len(values)
    mean = sum(values) / n
    var = sum((v - mean) ** 2 for v in values) / n
    return mean, var ** 0.5

# 2) NumPy 벡터화
def np_stats(values):
    a = np.array(values)
    return a.mean(), a.std()

data = list(range(1, 1_000_001))

t0 = time.time(); py_stats(data);  t_py = time.time() - t0
t0 = time.time(); np_stats(data);  t_np = time.time() - t0
print(f"순수 파이썬: {t_py:.3f}s / NumPy: {t_np:.3f}s")  # NumPy가 훨씬 빠름`,
        note: '동일 통계를 두 방식으로 구현해 속도를 직접 비교한다. 데이터가 커질수록 벡터화의 이점이 극적으로 벌어진다.',
      },
    ],
  },
  'python-2': {
    theory: [
      {
        h: 'DataFrame은 "열 단위"로 생각한다',
        body: 'Pandas DataFrame은 각 열이 하나의 NumPy 배열(Series)인 열-지향 구조다. 그래서 행을 한 줄씩 반복(iterrows)하는 방식은 느리고, 열 단위 벡터 연산이나 groupby·apply 같은 일괄 연산이 훨씬 빠르다. 결측치는 부동소수 NaN으로 표현되어 자료형에 영향을 주며, 분석 전 fillna/dropna로 처리해야 집계가 왜곡되지 않는다. 인덱싱은 라벨 기반 loc와 정수 위치 기반 iloc를 구분해서 쓰는 것이 핵심이다.',
      },
      {
        h: 'groupby: 분할-적용-결합',
        body: 'groupby는 데이터를 키별로 나누고(split), 각 그룹에 집계 함수를 적용(apply)한 뒤, 결과를 다시 합치는(combine) 패턴이다. SQL의 GROUP BY와 같은 발상이지만, agg로 여러 통계를 동시에 구하거나 transform으로 그룹 통계를 원래 행에 되돌려 붙이는 등 더 유연하다. 예를 들어 "고객별 평균 구매액"을 구해 각 거래행에 결합하면 이상치 탐지나 파생 피처 생성에 바로 쓸 수 있다.',
      },
    ],
    realCode: [
      {
        title: '실전: 정제→집계→시각화 EDA 파이프라인',
        lang: 'python',
        code: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("orders.csv", parse_dates=["ordered_at"])

# 1) 정제
df = df.drop_duplicates()
df["amount"] = df["amount"].fillna(df["amount"].median())
df = df[df["amount"] > 0]                      # 이상치 제거

# 2) 파생 + 집계
df["month"] = df["ordered_at"].dt.to_period("M").astype(str)
monthly = df.groupby("month")["amount"].agg(["sum", "mean", "count"])
print(monthly)

# 3) 시각화
monthly["sum"].plot(kind="bar", title="월별 매출")
plt.tight_layout(); plt.savefig("monthly_sales.png")`,
        note: '정제→파생→집계→시각화로 이어지는 전형적 EDA 흐름. parse_dates로 날짜를 바로 datetime으로 읽는 점에 주목.',
      },
    ],
  },

  // ── 웹 서비스 개발 mini-Project ──
  'webproject-1': {
    theory: [
      {
        h: '범위(scope)를 먼저 줄여라 — MVP 사고',
        body: '미니 프로젝트가 실패하는 가장 흔한 이유는 기능 욕심이다. MVP(Minimum Viable Product)는 "핵심 가치를 검증할 수 있는 최소 기능"만 먼저 만드는 전략이다. 사용자 시나리오에서 가장 중요한 한 줄(예: "글을 쓰고 목록에서 본다")을 정하고, 그 흐름을 끝까지 동작시키는 데 집중한다. 부가 기능은 백로그로 미룬다. 설계 단계에서 화면·데이터·API를 시나리오 기준으로 정렬하면, 구현 단계에서 무엇부터 만들지 자연스럽게 정해진다.',
      },
      {
        h: '화면-데이터-API를 한 표로 잇기',
        body: '좋은 설계는 세 가지를 일관되게 연결한다: 화면(무엇을 보여줄지)·데이터 모델(무엇을 저장할지)·API(어떻게 주고받을지). 와이어프레임의 각 화면이 어떤 API를 호출하고, 그 API가 어떤 엔티티를 다루는지 매핑표로 정리하면 누락과 중복이 드러난다. 이 매핑이 곧 작업 분담의 단위가 되어, 프론트와 백엔드가 API 명세(요청/응답 예시)만 합의하면 병행 개발이 가능하다.',
      },
    ],
    realCode: [
      {
        title: '설계 산출물: 화면-API 매핑표',
        lang: 'text',
        code: `[와이어프레임 → API 매핑]

화면            동작            호출 API                  사용 엔티티
─────────────────────────────────────────────────────────
목록 페이지      진입 시 조회     GET  /api/posts           Post[]
상세 페이지      진입 시 조회     GET  /api/posts/:id       Post
글쓰기 폼        제출            POST /api/posts           Post(생성)
수정 폼          제출            PUT  /api/posts/:id       Post(수정)
목록 내 삭제     클릭            DELETE /api/posts/:id     Post(삭제)

[작업 분담]
- 프론트: 목록/상세/폼 화면, API 연동, 상태 관리
- 백엔드: posts CRUD API, 데이터 검증, 저장소
- 공통: API 명세(요청/응답 예시) 합의 후 병행`,
        note: '화면·API·엔티티를 한 표로 묶으면 누락이 보이고, 그대로 작업 분담 단위가 된다. 명세 합의가 병행 개발의 전제.',
      },
    ],
  },
  'webproject-2': {
    theory: [
      {
        h: '비동기 UI의 3상태를 항상 다뤄라',
        body: '네트워크로 데이터를 가져오는 화면은 반드시 세 가지 상태를 가진다: 로딩 중, 성공(데이터 있음/없음), 에러. 초보 구현은 성공만 처리하다가 느린 네트워크나 서버 오류에서 빈 화면·깨진 UI를 보여준다. 로딩 스피너, 에러 메시지와 재시도, "데이터 없음" 빈 상태를 각각 명시적으로 렌더링해야 실제 사용자가 쓸 수 있는 화면이 된다. 이 패턴은 프레임워크와 무관하게 동일하게 적용된다.',
      },
      {
        h: '상태의 단일 출처와 컴포넌트 분리',
        body: '같은 데이터를 여러 곳에서 따로 들고 있으면 화면이 어긋난다. 상태는 "단일 출처(source of truth)"를 두고, 필요한 컴포넌트가 그것을 구독해 파생값을 계산하도록 설계한다. UI는 작은 재사용 컴포넌트로 쪼개되, 데이터를 가져오는 책임(컨테이너)과 보여주는 책임(프레젠테이션)을 분리하면 테스트와 협업이 쉬워진다. 관심사 분리는 코드량이 늘어도 복잡도를 낮춘다.',
      },
    ],
    realCode: [
      {
        title: '실전: 입력 폼 — 유효성 검사 + 제출',
        lang: 'javascript',
        code: `import { useState } from "react"

export function PostForm({ onCreated }) {
  const [form, setForm] = useState({ title: "", body: "" })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function validate(f) {
    const e = {}
    if (!f.title.trim()) e.title = "제목을 입력하세요"
    if (f.body.trim().length < 5) e.body = "본문은 5자 이상"
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length) return        // 검증 실패 시 중단

    setSubmitting(true)
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("저장 실패")
      onCreated(await res.json())
      setForm({ title: "", body: "" })
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })} />
      {errors.title && <small>{errors.title}</small>}
      <textarea value={form.body}
        onChange={(e) => setForm({ ...form, body: e.target.value })} />
      {errors.body && <small>{errors.body}</small>}
      <button disabled={submitting}>{submitting ? "저장 중…" : "등록"}</button>
      {errors.submit && <p>{errors.submit}</p>}
    </form>
  )
}`,
        note: '제출 전 검증→실패 시 중단, 제출 중 버튼 비활성화, 에러 표시까지 폼의 실전 요소를 모두 담았다.',
      },
    ],
  },
  'webproject-3': {
    theory: [
      {
        h: '"동작한다"와 "배포된다" 사이',
        body: '내 PC에서 동작하는 것과 사용자가 접속해 쓰는 것은 다르다. 배포에서는 API 주소·키 같은 설정을 코드에서 분리해 환경변수로 주입하고(개발/운영 분리), 빌드 단계에서 소스를 번들·압축한 정적 산출물을 만든다. SPA는 서버가 모든 경로를 index.html로 폴백해야 새로고침 시 404가 나지 않는다. 배포본은 반드시 한 번 직접 접속해 핵심 흐름을 검증한 뒤 발표에 사용한다.',
      },
      {
        h: 'QA는 체크리스트로, 회고는 구체적으로',
        body: '마감 직전의 버그 수정은 새 버그를 부른다. 핵심 사용자 시나리오를 체크리스트로 만들어 통과 여부를 점검하고, 수정 후에는 기존 기능이 깨지지 않았는지 회귀 확인한다. 발표 후 회고는 "좋았다/아쉬웠다"에 그치지 말고, 잘된 점·아쉬운 점·다음에 바꿀 것(action)을 구체적으로 적어야 다음 프로젝트의 개선으로 이어진다.',
      },
    ],
    realCode: [
      {
        title: '실전: GitHub Actions 정적 배포 워크플로',
        lang: 'yaml',
        code: `name: Deploy
on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
        env:
          VITE_API_BASE: \${{ secrets.VITE_API_BASE }}   # 운영 API 주소
      - uses: actions/deploy-pages@v4
        with: { path: ./dist }`,
        note: 'main 푸시 → 빌드 → 배포 자동화. API 주소는 코드가 아닌 Actions secrets에서 주입해 환경을 분리한다.',
      },
    ],
  },

  // ── 실전 Feature Engineering ──
  'feature-1': {
    theory: [
      {
        h: '모델보다 피처가 성능을 가른다',
        body: '같은 데이터라도 어떤 피처를 주느냐에 따라 단순 모델이 복잡한 모델을 이기기도 한다. 피처 엔지니어링은 도메인 지식을 수치로 번역하는 작업이다. 예컨대 "가입일"이라는 원시 컬럼보다 "가입 후 경과일", "주말 가입 여부" 같은 파생 피처가 모델에 훨씬 유용한 신호를 준다. 스케일링·인코딩 같은 형식 변환부터 비율·구간·상호작용 같은 의미 있는 파생까지, 피처 품질이 모델 상한을 결정한다.',
      },
      {
        h: '데이터 누수: 가장 치명적인 실수',
        body: '데이터 누수(leakage)는 학습 시점에 알 수 없어야 할 정보가 피처에 섞여 들어가 검증 점수를 비현실적으로 높이는 오류다. 대표적으로 전체 데이터로 스케일러·인코더를 fit하면 test 정보가 train에 새어든다. 반드시 train에서만 fit하고 valid/test에는 transform만 적용해야 한다. 타깃 인코딩은 특히 위험해서, 교차검증의 각 fold 내부에서만 타깃 평균을 계산해야 한다. 누수를 막지 못하면 실서비스에서 성능이 급락한다.',
      },
    ],
    realCode: [
      {
        title: '실전: 누수 없는 타깃 인코딩 (CV 내부 fit)',
        lang: 'python',
        code: `import numpy as np
import pandas as pd
from sklearn.model_selection import StratifiedKFold

def target_encode_cv(df, col, target, n_splits=5, smoothing=10):
    """교차검증 fold 안에서만 타깃 평균을 계산해 누수를 방지"""
    oof = pd.Series(np.nan, index=df.index)          # out-of-fold 인코딩
    global_mean = df[target].mean()
    skf = StratifiedKFold(n_splits=n_splits, shuffle=True, random_state=42)

    for tr_idx, val_idx in skf.split(df, df[target]):
        tr = df.iloc[tr_idx]
        stats = tr.groupby(col)[target].agg(["mean", "count"])
        # 스무딩: 표본이 적은 범주는 전체 평균 쪽으로 보정
        enc = (stats["mean"] * stats["count"] + global_mean * smoothing) \\
              / (stats["count"] + smoothing)
        oof.iloc[val_idx] = df.iloc[val_idx][col].map(enc).fillna(global_mean)

    return oof

df["city_te"] = target_encode_cv(df, "city", "y")`,
        note: 'fold마다 train 부분으로만 타깃 평균을 구해 val에 적용한다. 스무딩으로 희귀 범주의 과적합을 완화하는 것이 실전 포인트.',
      },
    ],
  },

  // ── 모델 개발 및 최적화 ──
  'modeldev-1': {
    theory: [
      {
        h: '베이스라인 없이는 개선도 없다',
        body: '모델 개발은 화려한 모델부터가 아니라 단순한 베이스라인에서 출발해야 한다. 더미 분류기나 로지스틱 회귀로 기준 점수를 잡아두면, 이후 어떤 시도가 실제로 효과가 있었는지 정량적으로 판단할 수 있다. 베이스라인이 의외로 높다면 문제 자체가 쉬운 것이고, 복잡한 모델이 베이스라인을 못 넘으면 피처나 검증 설계를 의심해야 한다. 모든 개선은 "베이스라인 대비 얼마나"로 이야기한다.',
      },
      {
        h: '교차검증과 데이터 분할의 원칙',
        body: '단일 train/test 분할은 운에 따라 점수가 출렁인다. K-fold 교차검증은 데이터를 K등분해 번갈아 검증함으로써 일반화 성능을 더 안정적으로 추정한다. 클래스가 불균형하면 StratifiedKFold로 각 fold의 클래스 비율을 유지하고, 시계열이면 미래로 검증하는 시간 분할을 써야 한다. test 세트는 최종 평가 한 번에만 사용하고, 그 전까지의 모든 선택은 valid(또는 CV)로 결정해 과대평가를 막는다.',
      },
    ],
    realCode: [
      {
        title: '실전: 전처리 파이프라인 + 모델 비교',
        lang: 'python',
        code: `from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.model_selection import cross_validate, StratifiedKFold
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
import pandas as pd

pre = ColumnTransformer([
    ("num", Pipeline([("imp", SimpleImputer(strategy="median")),
                      ("sc", StandardScaler())]), num_cols),
    ("cat", Pipeline([("imp", SimpleImputer(strategy="most_frequent")),
                      ("oh", OneHotEncoder(handle_unknown="ignore"))]), cat_cols),
])

cv = StratifiedKFold(5, shuffle=True, random_state=42)
rows = []
for name, clf in [("logreg", LogisticRegression(max_iter=1000)),
                  ("rf", RandomForestClassifier(random_state=42))]:
    pipe = Pipeline([("pre", pre), ("clf", clf)])
    r = cross_validate(pipe, X, y, cv=cv, scoring=["f1_macro", "roc_auc"])
    rows.append({"model": name,
                 "f1": r["test_f1_macro"].mean(),
                 "auc": r["test_roc_auc"].mean()})
print(pd.DataFrame(rows).sort_values("f1", ascending=False))`,
        note: '전처리를 파이프라인에 포함해 CV의 매 fold에서 fit되도록 했다(누수 방지). 여러 지표를 한 번에 받아 모델을 표로 비교한다.',
      },
    ],
  },
  'modeldev-2': {
    theory: [
      {
        h: '하이퍼파라미터 탐색: Grid에서 Bayesian으로',
        body: 'Grid Search는 정의한 격자의 모든 조합을 시도해 확실하지만 차원이 늘면 조합 수가 폭발한다. Random Search는 무작위 샘플링으로 적은 시도로도 중요한 파라미터의 좋은 값을 자주 찾는다. Bayesian 최적화(Optuna 등)는 지금까지의 시도 결과로 "다음에 시도하면 좋을 후보"를 확률모델로 추정해, 같은 예산으로 더 좋은 조합에 빠르게 수렴한다. 핵심은 탐색을 항상 교차검증 점수 위에서 수행해, 검증 세트에 과적합되지 않게 하는 것이다.',
      },
      {
        h: '편향-분산과 앙상블',
        body: '과소적합(높은 편향)은 모델이 단순해 패턴을 못 잡는 상태, 과적합(높은 분산)은 학습 데이터에만 맞춰진 상태다. 규제·조기종료는 분산을 줄이고, 더 풍부한 피처·복잡한 모델은 편향을 줄인다. 앙상블은 이 트레이드오프를 완화한다: 배깅(랜덤포레스트)은 분산을 낮추고, 부스팅(XGBoost·LightGBM)은 약한 학습기를 순차 보정해 편향을 낮춘다. 스태킹은 서로 다른 모델의 예측을 메타모델이 결합해 단일 모델의 한계를 넘는다.',
      },
    ],
    realCode: [
      {
        title: '실전: 튜닝된 모델들로 스태킹 앙상블',
        lang: 'python',
        code: `from sklearn.ensemble import StackingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.model_selection import cross_val_score

# 1) 서로 다른 성격의 베이스 모델 (각자 튜닝된 설정 가정)
base = [
    ("rf", RandomForestClassifier(n_estimators=400, max_depth=12, random_state=42)),
    ("svc", SVC(C=2.0, probability=True, random_state=42)),
]

# 2) 베이스 예측을 결합하는 메타모델
stack = StackingClassifier(
    estimators=base,
    final_estimator=LogisticRegression(max_iter=1000),
    cv=5,                       # 베이스 예측도 OOF로 생성 → 누수 방지
)

score = cross_val_score(stack, X, y, cv=5, scoring="f1_macro")
print(f"스태킹 F1={score.mean():.3f} (+/-{score.std():.3f})")
# 단일 모델 점수와 비교해 앙상블 효과를 확인`,
        note: '성격이 다른 모델(트리+커널)을 섞어야 앙상블 효과가 크다. cv=5로 베이스 예측을 OOF 생성해 메타모델 학습 시 누수를 막는다.',
      },
    ],
  },

  // ── Prompt 설계와 Context Engineering ──
  'prompt-1': {
    theory: [
      {
        h: 'LLM은 어떻게 텍스트를 생성하는가',
        body: 'LLM은 입력 토큰 시퀀스를 받아 "다음 토큰의 확률분포"를 출력하고, 이를 샘플링해 한 토큰씩 이어붙이는 자기회귀(autoregressive) 모델이다. temperature는 이 분포를 평탄(높음)하거나 뾰족(낮음)하게 만들어 무작위성을 조절하고, top_p(누적확률 컷)·top_k(후보 수 제한)로 샘플링 범위를 좁힌다. 따라서 temperature>0이면 같은 프롬프트라도 매번 결과가 달라진다. 비용·컨텍스트 한도는 모두 토큰 수로 계산되며, 한국어는 영어보다 토큰이 많이 쪼개져 비용·길이 관리가 특히 중요하다.',
      },
      {
        h: '프롬프트 설계의 5요소',
        body: '효과적인 프롬프트는 역할(누구로서)·지시(무엇을)·맥락(배경)·예시(few-shot)·제약(형식·금지)을 분리해 명시한다. Few-shot 예시는 원하는 입출력 패턴을 "보여줘" 형식을 안정화하고, Chain-of-Thought("단계적으로 풀어라")는 중간 추론을 유도해 산술·논리 정확도를 높인다. 다만 CoT는 토큰을 더 쓰므로, 최종 답만 필요하면 추론은 내부적으로 하되 정해진 형식의 답만 출력하도록 지시한다. 출력은 JSON 스키마 등으로 강제하면 후속 파싱이 안정적이다.',
      },
      {
        h: 'Context Engineering · 환각 · 보안',
        body: '모델은 컨텍스트 윈도우 안의 정보만 본다. 긴 문서는 요약·청킹·검색(RAG)으로 필요한 부분만 주입하고, 토큰 예산을 고려해 무엇을 넣고 뺄지 설계하는 것이 Context Engineering이다. 환각은 모델이 학습 분포에서 "그럴듯한" 토큰을 생성하기 때문에 생기며, 근거 문서 제공·"모르면 모른다고 답하라" 지시·출처 인용으로 완화한다. 사용자 입력을 system 지시와 절대 합치지 않고 검증해 프롬프트 인젝션·탈옥을 방어한다.',
      },
    ],
    realCode: [
      {
        title: '실전: 재시도 + JSON 스키마 검증 LLM 호출',
        lang: 'python',
        code: `import json, time
from anthropic import Anthropic

client = Anthropic()  # ANTHROPIC_API_KEY

SCHEMA_HINT = '{"category": "배송|결제|환불|기타", "urgent": true|false}'

def classify(text: str, retries: int = 2) -> dict:
    """문의를 분류해 검증된 dict로 반환. 형식 오류 시 재시도."""
    prompt = (
        "너는 고객문의 분류기다. 반드시 아래 JSON만 출력한다.\\n"
        f"형식: {SCHEMA_HINT}\\n\\n"
        f"문의: {text}"
    )
    last_err = None
    for attempt in range(retries + 1):
        msg = client.messages.create(
            model="claude-sonnet-4-5",
            max_tokens=200,
            temperature=0,                 # 분류는 결정적으로
            messages=[{"role": "user", "content": prompt}],
        )
        raw = msg.content[0].text.strip()
        try:
            data = json.loads(raw)         # 파싱 시도
            assert data["category"] in {"배송", "결제", "환불", "기타"}
            assert isinstance(data["urgent"], bool)
            return data                    # 검증 통과
        except Exception as e:             # 형식 깨지면 재시도
            last_err = e
            prompt += f"\\n\\n[이전 출력이 형식 오류였다: {e}. JSON만 다시 출력하라]"
            time.sleep(0.5 * (attempt + 1))
    raise ValueError(f"형식 검증 실패: {last_err}")

print(classify("결제했는데 두 번 빠져나갔어요"))
# → {'category': '결제', 'urgent': True}`,
        note: '운영용 LLM 호출의 기본형: temperature=0으로 결정성 확보, 파싱+스키마 검증, 실패 시 오류를 프롬프트에 피드백하며 재시도.',
      },
    ],
  },

  // ── sLLM ──
  'sllm-1': {
    theory: [
      {
        h: 'sLLM을 쓰는 이유와 트레이드오프',
        body: 'sLLM(수~수십억 파라미터)은 온프레미스 구동으로 데이터가 외부로 나가지 않아 프라이버시·규제에 유리하고, 호출당 비용이 없으며 지연을 통제할 수 있다. 대신 대형 모델 대비 추론 능력·세계 지식이 약하므로, RAG로 지식을 보강하거나 도메인 데이터로 파인튜닝해 특정 작업 성능을 끌어올리는 전략이 핵심이다. 모델 선택은 라이선스(상업적 사용 가능 여부), 벤치마크, 한국어 성능, 컨텍스트 길이를 함께 본다.',
      },
      {
        h: '양자화와 메모리 산정',
        body: '양자화는 FP16 가중치를 INT8/INT4 등 낮은 비트로 표현해 메모리를 크게 줄인다(대략 7B FP16≈14GB, 4bit≈4~5GB). NF4는 정규분포에 최적화된 4bit 포맷으로 QLoRA에서 쓰인다. 추론 시 실제 메모리는 가중치+KV 캐시(컨텍스트 길이·배치에 비례)로 결정되므로, 긴 컨텍스트·큰 배치는 VRAM을 빠르게 소모한다. vLLM의 PagedAttention은 KV 캐시를 페이지 단위로 관리해 처리량을 높인다.',
      },
    ],
    realCode: [
      {
        title: '실전: vLLM OpenAI 호환 서버 + 스트리밍 클라이언트',
        lang: 'python',
        code: `# 1) 서버 기동 (터미널)
#    python -m vllm.entrypoints.openai.api_server \\
#      --model Qwen/Qwen2.5-7B-Instruct --quantization awq --max-model-len 8192

# 2) OpenAI SDK로 그대로 호출 (호환 API)
from openai import OpenAI

client = OpenAI(base_url="http://localhost:8000/v1", api_key="EMPTY")  # 로컬

stream = client.chat.completions.create(
    model="Qwen/Qwen2.5-7B-Instruct",
    messages=[
        {"role": "system", "content": "너는 간결한 한국어 코드 리뷰어다."},
        {"role": "user", "content": "이 함수의 시간복잡도와 개선점은? def f(a): return [x for x in a if a.count(x) > 1]"},
    ],
    temperature=0.2,
    stream=True,          # 토큰 스트리밍
)
for chunk in stream:      # 생성되는 즉시 출력
    delta = chunk.choices[0].delta.content or ""
    print(delta, end="", flush=True)`,
        note: 'vLLM은 OpenAI 호환 엔드포인트를 제공하므로 기존 OpenAI 코드를 base_url만 바꿔 재사용한다. count()를 루프에서 호출해 O(n²)인 점을 모델이 지적하도록 유도하는 예시.',
      },
    ],
  },
  'sllm-2': {
    theory: [
      {
        h: 'LoRA의 수학적 직관',
        body: '파인튜닝은 가중치 W를 W+ΔW로 갱신하는 것인데, LoRA는 ΔW를 두 저랭크 행렬의 곱 B·A(rank r ≪ 차원)로 근사한다. 즉 원본 W는 고정(freeze)하고 작은 A·B만 학습하므로 학습 파라미터가 전체의 1% 미만으로 줄고, 결과물은 수 MB 어댑터로 저장된다. r(rank)과 alpha(스케일)가 핵심 하이퍼파라미터이며, target_modules로 어떤 층(주로 q_proj·v_proj)에 적용할지 정한다. QLoRA는 4bit 양자화된 베이스 위에 LoRA를 얹어 단일 GPU로도 큰 모델을 미세조정한다.',
      },
      {
        h: '데이터셋 품질이 성능을 좌우한다',
        body: 'instruction 튜닝 데이터는 (지시, 입력, 응답) 형태로 구성하며, 모델별 chat template에 정확히 맞춰야 학습/추론 포맷 불일치로 인한 성능 저하를 막는다. 수백 건의 고품질 데이터가 수천 건의 잡음 데이터보다 낫다 — 중복 제거, 형식 통일, 응답 품질 검수가 중요하다. 적은 데이터로 과도하게 학습하면 과적합되므로 검증셋으로 손실을 모니터링하고 조기종료한다.',
      },
    ],
    realCode: [
      {
        title: '실전: QLoRA 파인튜닝 파이프라인 (PEFT + TRL)',
        lang: 'python',
        code: `from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model
from trl import SFTTrainer, SFTConfig
from datasets import load_dataset

MODEL = "Qwen/Qwen2.5-0.5B-Instruct"

# 1) 4bit 양자화 로딩 (QLoRA)
bnb = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4",
                         bnb_4bit_compute_dtype="bfloat16")
model = AutoModelForCausalLM.from_pretrained(MODEL, quantization_config=bnb, device_map="auto")
tok = AutoTokenizer.from_pretrained(MODEL)

# 2) LoRA 설정 — q/v 투영층만, 전체의 ~0.5%만 학습
lora = LoraConfig(r=16, lora_alpha=32, lora_dropout=0.05,
                  target_modules=["q_proj", "v_proj"], task_type="CAUSAL_LM")
model = get_peft_model(model, lora)
model.print_trainable_parameters()

# 3) 데이터셋 — chat template 적용
ds = load_dataset("json", data_files="train.jsonl")["train"]
def fmt(ex):
    return {"text": tok.apply_chat_template(ex["messages"], tokenize=False)}
ds = ds.map(fmt)

# 4) 학습
trainer = SFTTrainer(
    model=model, train_dataset=ds,
    args=SFTConfig(output_dir="out", num_train_epochs=3, per_device_train_batch_size=2,
                   gradient_accumulation_steps=4, learning_rate=2e-4, logging_steps=10,
                   bf16=True, save_strategy="epoch"),
)
trainer.train()
model.save_pretrained("./adapter")   # 어댑터만 저장(수 MB)`,
        note: 'QLoRA 표준 파이프라인: 4bit 로딩 → LoRA 부착 → chat template 포맷 → SFTTrainer 학습 → 어댑터 저장. gradient_accumulation으로 실효 배치를 키워 작은 GPU를 보완.',
      },
    ],
  },

  // ── RAG ──
  'rag-1': {
    theory: [
      {
        h: 'RAG가 해결하는 문제',
        body: 'LLM은 학습 시점 이후 지식(지식 컷오프)을 모르고, 사내 비공개 문서도 알지 못하며, 모르면 환각한다. RAG(Retrieval-Augmented Generation)는 질의 시점에 외부 지식베이스에서 관련 문서를 "검색"해 프롬프트에 "증강"한 뒤 생성한다. 덕분에 최신성·근거·출처를 확보하고, 파인튜닝 없이 지식을 갱신할 수 있다(문서만 교체). 파인튜닝이 "말투·형식·기술"을 가르친다면, RAG는 "사실·지식"을 주입하는 상호보완 관계다.',
      },
      {
        h: '청킹과 임베딩 설계',
        body: '문서는 그대로 임베딩하면 너무 길어 검색 정밀도가 떨어지므로 의미 단위로 분할(청킹)한다. 청크가 너무 작으면 문맥이 끊기고, 너무 크면 노이즈가 섞인다 — 보통 300~800자에 10~20% 오버랩을 두고, 문단·문장 경계를 우선 분할한다. 각 청크는 임베딩 모델로 고차원 벡터가 되며, 의미가 비슷한 텍스트는 벡터 공간에서 가깝게 위치한다. 임베딩 모델의 차원과 Vector DB 설정이 일치해야 한다.',
      },
    ],
    realCode: [
      {
        title: '실전: 적재→검색 RAG 파이프라인 (LangChain + Chroma)',
        lang: 'python',
        code: `from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# 1) 적재 + 청킹 (문단→문장 경계 우선)
docs = PyPDFLoader("manual.pdf").load()
chunks = RecursiveCharacterTextSplitter(
    chunk_size=600, chunk_overlap=80,
    separators=["\\n\\n", "\\n", ". ", " "],
).split_documents(docs)

# 2) 임베딩 + 벡터 인덱스 저장
db = Chroma.from_documents(chunks, OpenAIEmbeddings(model="text-embedding-3-small"),
                           persist_directory="./db")
retriever = db.as_retriever(search_kwargs={"k": 4})

# 3) 검색 컨텍스트 결합 프롬프트 (환각 억제 지시 포함)
prompt = ChatPromptTemplate.from_template(
    "아래 컨텍스트만 근거로 한국어로 답하라. 근거가 없으면 '자료에 없음'이라고 답하라.\\n\\n"
    "[컨텍스트]\\n{context}\\n\\n[질문] {question}")

def fmt(docs):  # 검색 결과를 출처와 함께 직렬화
    return "\\n---\\n".join(f"(p.{d.metadata.get('page','?')}) {d.page_content}" for d in docs)

rag = ({"context": retriever | fmt, "question": RunnablePassthrough()}
       | prompt | ChatOpenAI(model="gpt-4o-mini", temperature=0) | StrOutputParser())

print(rag.invoke("환불은 며칠 걸리나요?"))`,
        note: '적재-청킹-임베딩-검색-생성을 LCEL로 연결한 완결형 RAG. 출처(page)를 컨텍스트에 포함하고 "없으면 없다"를 지시해 환각을 줄인다.',
      },
    ],
  },
  'rag-3': {
    theory: [
      {
        h: 'RAG는 측정해야 개선된다',
        body: 'RAG 품질은 검색 단계와 생성 단계로 나뉘므로 실패 원인을 분리 진단해야 한다. 검색이 정답 문서를 못 가져오면(낮은 context recall) 청킹·임베딩·top-k를 손보고, 정답 문서를 가져왔는데 답이 틀리면(낮은 faithfulness) 프롬프트·모델을 손본다. RAGAS 같은 도구는 충실도(답이 컨텍스트에 근거하는가)·답변 관련성·문맥 정밀도/재현율을 LLM 평가자로 자동 산출해, 튜닝 전후를 정량 비교하게 해준다.',
      },
      {
        h: '검색 고도화: 하이브리드 + 재순위',
        body: '벡터 검색은 의미는 잘 잡지만 고유명사·코드·약어 같은 정확 일치에 약하다. BM25(키워드)와 벡터 검색을 결합한 하이브리드 검색이 이를 보완한다. 또한 1차로 후보를 넓게(top-20) 회수한 뒤 cross-encoder 재순위 모델로 (질의, 문서) 쌍을 정밀 채점해 상위 4개만 쓰면 정확도가 크게 오른다. 멀티쿼리(질문을 여러 표현으로 확장)·HyDE(가상 답변을 만들어 검색)도 재현율을 높이는 기법이다.',
      },
    ],
    realCode: [
      {
        title: '실전: 하이브리드 검색 + Cross-Encoder 재순위',
        lang: 'python',
        code: `from langchain_community.retrievers import BM25Retriever
from langchain.retrievers import EnsembleRetriever
from sentence_transformers import CrossEncoder

# 1) 하이브리드: 키워드(BM25) + 벡터, 가중 앙상블
bm25 = BM25Retriever.from_documents(chunks); bm25.k = 10
vec = db.as_retriever(search_kwargs={"k": 10})
hybrid = EnsembleRetriever(retrievers=[bm25, vec], weights=[0.4, 0.6])

# 2) 재순위: cross-encoder로 (질의,문서) 정밀 채점
reranker = CrossEncoder("BAAI/bge-reranker-v2-m3")

def search(query: str, top_n: int = 4):
    cands = hybrid.invoke(query)                  # 넓게 회수(recall↑)
    pairs = [(query, d.page_content) for d in cands]
    scores = reranker.predict(pairs)              # 정밀 채점
    ranked = sorted(zip(scores, cands), key=lambda x: x[0], reverse=True)
    return [d for _, d in ranked[:top_n]]         # 상위 N만(precision↑)

for d in search("환불 정책 예외 조항"):
    print(round(float(d.metadata.get("page", 0)), 1), d.page_content[:60])`,
        note: '2단계 검색의 정석: 하이브리드로 recall 확보 → cross-encoder로 precision 확보. 고유명사·예외 조항처럼 정확 일치가 중요한 질의에서 효과가 크다.',
      },
    ],
  },

  // ── LangChain ──
  'langchain-1': {
    theory: [
      {
        h: 'LangChain과 LCEL의 철학',
        body: 'LangChain은 LLM 앱을 모델·프롬프트·출력파서·도구·메모리·리트리버 같은 교체 가능한 부품으로 보고 조합한다. LCEL(LangChain Expression Language)은 이 부품들을 | 파이프로 잇는 선언적 표현으로, 모든 컴포넌트가 invoke/stream/batch를 가진 Runnable 인터페이스를 구현하기에 일관되게 연결·스트리밍·병렬화된다. 예: prompt | model | parser. 선언적이라 중간 단계 교체(모델 바꾸기, 파서 추가)가 쉽다.',
      },
      {
        h: '구조화 출력과 신뢰성',
        body: 'LLM의 자유 텍스트는 후속 처리가 불안정하므로 출력 파서로 JSON/객체를 강제한다. Pydantic 모델을 파서에 연결하면 타입·필수값을 검증하고, 실패 시 with_retry로 재요청한다. 운영에서는 with_fallbacks로 주 모델 장애 시 대체 모델로 전환해 가용성을 확보한다. 이런 견고성 패턴(검증·재시도·폴백)이 데모와 서비스의 차이를 만든다.',
      },
    ],
    realCode: [
      {
        title: '실전: Pydantic 구조화 출력 + 폴백 + 재시도',
        lang: 'python',
        code: `from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field

class Ticket(BaseModel):
    category: str = Field(description="배송/결제/환불/기타 중 하나")
    priority: int = Field(ge=1, le=5, description="긴급도 1~5")
    summary: str

parser = PydanticOutputParser(pydantic_object=Ticket)

prompt = ChatPromptTemplate.from_messages([
    ("system", "고객 문의를 분석해 지정 형식으로만 답하라.\\n{format}"),
    ("human", "{text}"),
]).partial(format=parser.get_format_instructions())

# 주 모델 실패 시 보조 모델로 폴백 + 2회 재시도
model = (ChatOpenAI(model="gpt-4o", temperature=0)
         .with_fallbacks([ChatOpenAI(model="gpt-4o-mini")])
         .with_retry(stop_after_attempt=2))

chain = prompt | model | parser
ticket = chain.invoke({"text": "결제가 두 번 됐어요. 빨리 환불해주세요"})
print(ticket.category, ticket.priority, ticket.summary)  # 검증된 Ticket 객체`,
        note: 'Pydantic 파서로 타입·범위(priority 1~5)를 검증하고, 폴백+재시도로 장애에 대응. 구조화 객체라 후속 DB 저장·라우팅이 안전하다.',
      },
    ],
  },
  'langchain-2': {
    theory: [
      {
        h: '메모리: 대화에 맥락을 부여하기',
        body: 'LLM은 상태가 없으므로 멀티턴 대화를 하려면 이전 대화를 매 요청에 다시 넣어야 한다. 단순 누적은 토큰을 빠르게 소진하므로, 최근 N턴만 유지(윈도우)하거나 과거를 요약(summary)하는 메모리 전략을 쓴다. 세션 ID로 사용자별 대화를 분리하고, RunnableWithMessageHistory로 체인에 히스토리를 주입한다.',
      },
      {
        h: '도구(Tool)와 문서 QA',
        body: '도구는 LLM이 호출할 수 있는 외부 함수(검색·계산·DB·API)로, 함수 설명(docstring)이 모델의 "언제 부를지" 판단 근거가 된다. 문서 QA는 리트리버를 체인에 결합해 질문 관련 청크를 가져와 답하게 하며, 메모리와 결합하면 "방금 말한 그거"처럼 맥락을 유지하는 챗봇이 된다. 의도가 다양하면 RunnableBranch로 전문화된 체인에 라우팅한다.',
      },
    ],
    realCode: [
      {
        title: '실전: 메모리 + 리트리버 문서 QA 챗봇',
        lang: 'python',
        code: `from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_openai import ChatOpenAI

store = {}
def history(session_id: str):
    return store.setdefault(session_id, ChatMessageHistory())

prompt = ChatPromptTemplate.from_messages([
    ("system", "너는 사내 문서 도우미다. 컨텍스트만 근거로 답하라.\\n\\n{context}"),
    MessagesPlaceholder("history"),     # 이전 대화 주입
    ("human", "{input}"),
])

def build_context(x):                   # 입력으로 리트리버 검색
    docs = retriever.invoke(x["input"])
    return "\\n---\\n".join(d.page_content for d in docs)

chain = (lambda x: {**x, "context": build_context(x)}) | prompt | ChatOpenAI(model="gpt-4o-mini")

bot = RunnableWithMessageHistory(
    chain, history, input_messages_key="input", history_messages_key="history")

cfg = {"configurable": {"session_id": "user-1"}}
print(bot.invoke({"input": "환불 절차 알려줘"}, config=cfg).content)
print(bot.invoke({"input": "그거 며칠 걸려?"}, config=cfg).content)  # 맥락 유지`,
        note: '리트리버로 컨텍스트를 만들고 MessagesPlaceholder로 히스토리를 끼워 멀티턴 문서 QA를 구현. "그거"처럼 대명사로 이어지는 질문도 처리된다.',
      },
    ],
  },
  'langchain-3': {
    theory: [
      {
        h: '데모에서 서비스로: 스트리밍·관측·안정성',
        body: '체감 지연을 줄이려면 토큰을 생성 즉시 흘려보내는 스트리밍이 필수다(SSE/StreamingResponse). 운영에서는 관측성이 핵심으로, LangSmith 등으로 각 단계의 프롬프트·토큰·지연·오류를 추적해야 블랙박스를 디버깅할 수 있다. 비용은 캐싱(동일 입력 재사용)으로 줄이고, 입출력 가드레일로 유해·이탈 응답을 차단한다. 환경변수로 키·모델을 분리하고, 재시도·타임아웃으로 외부 의존성 장애에 대비한다.',
      },
    ],
    realCode: [
      {
        title: '실전: FastAPI 스트리밍 + 캐시 + 에러 처리',
        lang: 'python',
        code: `import hashlib
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from langchain_openai import ChatOpenAI

app = FastAPI()
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3, timeout=30, max_retries=2)
_cache: dict[str, str] = {}

@app.get("/ask")
def ask(q: str):
    key = hashlib.sha256(q.encode()).hexdigest()
    if key in _cache:                          # 캐시 적중 → 즉시 반환
        return {"answer": _cache[key], "cached": True}

    def gen():
        buf = []
        try:
            for chunk in llm.stream(q):        # 토큰 스트리밍
                tok = chunk.content or ""
                buf.append(tok)
                yield tok
            _cache[key] = "".join(buf)         # 완료 후 캐시 저장
        except Exception as e:
            yield f"\\n[오류] 잠시 후 다시 시도해주세요: {e}"

    return StreamingResponse(gen(), media_type="text/plain")`,
        note: '스트리밍으로 타자 치듯 응답하고, 완료분을 캐시에 저장해 반복 질의 비용을 줄인다. 예외를 잡아 사용자에게 안전한 메시지를 흘려보낸다.',
      },
    ],
  },

  // ── AI Agent (LangGraph) ──
  'agent-1': {
    theory: [
      {
        h: '워크플로 vs 에이전트',
        body: '정해진 순서로 LLM을 호출하면 워크플로, LLM이 "다음에 무엇을 할지"(어떤 도구를 부를지, 끝낼지)를 스스로 결정하면 에이전트다. ReAct 패턴은 추론(Reason: 무엇이 필요한가)과 행동(Act: 도구 호출)을 번갈아 수행하며, 도구 결과를 관찰(Observe)해 다음 추론에 반영하는 루프를 돈다. 자율성이 높을수록 유연하지만 비용·예측불가능성도 커지므로, 최대 스텝 제한과 관측이 필요하다.',
      },
      {
        h: 'LangGraph: 상태 그래프로 제어',
        body: 'LangGraph는 에이전트를 노드(작업)·엣지(흐름)·State(누적 상태)로 명시한다. State는 메시지·중간 결과를 담는 공유 딕셔너리이고, 조건부 엣지가 상태를 보고 다음 노드를 결정해 "도구 호출 → 재추론" 루프를 형성한다. 체크포인터로 상태를 저장하면 중단·재개와 Human-in-the-loop(사람 승인 후 재개)가 가능하다. 흐름이 명시적이라 디버깅·테스트가 쉽다.',
      },
    ],
    realCode: [
      {
        title: '실전: 도구 사용 ReAct 에이전트 (LangGraph 저수준)',
        lang: 'python',
        code: `from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

@tool
def search_db(keyword: str) -> str:
    """사내 제품 DB에서 키워드로 검색한다."""
    return f"[{keyword}] 재고 12개, 가격 1500"

tools = [search_db]
llm = ChatOpenAI(model="gpt-4o-mini").bind_tools(tools)
tool_map = {t.name: t for t in tools}

class State(TypedDict):
    messages: Annotated[list, add_messages]

def agent(s):  # 모델 추론(도구 호출 결정 포함)
    return {"messages": [llm.invoke(s["messages"])]}

def run_tools(s):  # 모델이 요청한 도구 실행
    last = s["messages"][-1]
    out = []
    for call in last.tool_calls:
        res = tool_map[call["name"]].invoke(call["args"])
        out.append({"role": "tool", "content": str(res), "tool_call_id": call["id"]})
    return {"messages": out}

def route(s):  # 도구 호출이 있으면 tools로, 없으면 종료
    return "tools" if s["messages"][-1].tool_calls else END

g = StateGraph(State)
g.add_node("agent", agent); g.add_node("tools", run_tools)
g.add_edge(START, "agent")
g.add_conditional_edges("agent", route, {"tools": "tools", END: END})
g.add_edge("tools", "agent")     # 도구 결과 → 재추론 (ReAct 루프)
app = g.compile()

res = app.invoke({"messages": [("user", "노트북 재고와 가격 알려줘")]})
print(res["messages"][-1].content)`,
        note: 'ReAct 루프를 저수준 그래프로 직접 구성: agent(추론)↔tools(행동)를 조건부 엣지로 순환. tool_calls 유무로 종료를 제어해 무한루프를 막는다.',
      },
    ],
  },
  'agent-2': {
    theory: [
      {
        h: '멀티 에이전트와 Human-in-the-loop',
        body: '단일 에이전트가 너무 많은 책임을 지면 프롬프트가 비대해지고 실패가 잦다. Supervisor 패턴은 감독 에이전트가 작업을 보고 적합한 전문 에이전트(예: researcher, coder)를 선택·호출하고 결과를 종합한다. 각 전문 에이전트는 자신의 도구·프롬프트에 집중하는 서브그래프로 캡슐화된다. 위험하거나 비가역적인 작업(결제·삭제 등)은 Human-in-the-loop로 사람 승인 노드를 두고, 체크포인터로 상태를 저장해 승인 후 재개한다.',
      },
    ],
    realCode: [
      {
        title: '실전: Supervisor 멀티 에이전트 라우팅',
        lang: 'python',
        code: `from typing import TypedDict, Literal
from langgraph.graph import StateGraph, START, END
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

class State(TypedDict):
    task: str
    result: str
    next: str

def supervisor(s) -> dict:
    # 감독이 다음 담당자를 선택 (researcher / coder / FINISH)
    decision = llm.invoke(
        f"작업: {s['task']}\\n현재 결과: {s.get('result','(없음)')}\\n"
        "다음 담당자를 한 단어로: researcher, coder, FINISH"
    ).content.strip()
    return {"next": decision}

def researcher(s):  # 자료 조사 전문
    r = llm.invoke(f"조사: {s['task']}").content
    return {"result": (s.get("result","") + "\\n[조사] " + r)}

def coder(s):       # 코드 작성 전문
    r = llm.invoke(f"다음을 코드로: {s['task']}\\n참고: {s.get('result','')}").content
    return {"result": (s.get("result","") + "\\n[코드] " + r)}

def route(s) -> Literal["researcher", "coder", "__end__"]:
    return END if s["next"] == "FINISH" else s["next"]

g = StateGraph(State)
for name, fn in [("supervisor", supervisor), ("researcher", researcher), ("coder", coder)]:
    g.add_node(name, fn)
g.add_edge(START, "supervisor")
g.add_conditional_edges("supervisor", route,
                        {"researcher": "researcher", "coder": "coder", END: END})
g.add_edge("researcher", "supervisor")   # 작업 후 감독에게 복귀
g.add_edge("coder", "supervisor")
app = g.compile()

print(app.invoke({"task": "정렬 알고리즘을 조사하고 파이썬으로 구현", "result": "", "next": ""})["result"])`,
        note: 'Supervisor가 researcher↔coder를 오가며 작업을 분배하고 FINISH로 종료. 역할을 분리해 각 에이전트 프롬프트를 단순하게 유지한다.',
      },
    ],
  },

  // ── Vector DB ──
  'vectordb-1': {
    theory: [
      {
        h: '벡터 검색의 원리',
        body: '임베딩 모델은 텍스트를 수백~수천 차원의 벡터로 변환하며, 의미가 비슷한 텍스트는 벡터 공간에서 가깝게 위치한다. 검색은 질의 벡터와 문서 벡터의 유사도(코사인·내적·L2 거리)를 계산해 가까운 것을 찾는 것이다. 벡터를 정규화하면 내적이 코사인 유사도와 같아진다. 전수 비교(brute-force)는 정확하지만 느리므로, 대규모에서는 근사 최근접(ANN) 인덱스로 속도를 확보한다.',
      },
      {
        h: 'ANN 인덱스: HNSW vs IVF',
        body: 'HNSW는 다층 그래프를 만들어 가까운 이웃으로 점프하며 탐색하는 방식으로, m(노드당 연결 수)과 ef(탐색 폭)로 정확도-속도를 조절한다 — ef를 키우면 재현율↑·속도↓. IVF는 벡터를 군집(cluster)으로 나눠 질의와 가까운 일부 군집만 탐색해 메모리·속도 효율이 좋다. 모든 ANN은 약간의 정확도를 내주고 속도를 얻는 트레이드오프이며, 서비스의 재현율 요구에 맞춰 파라미터를 튜닝한다. 메타데이터 필터를 결합하면 "최근 3개월 문서 중" 같은 조건부 검색이 된다.',
      },
    ],
    realCode: [
      {
        title: '실전: pgvector 테이블·인덱스·하이브리드 검색 (SQL)',
        lang: 'sql',
        code: `-- 1) 확장 + 테이블 (임베딩 차원은 모델과 일치)
create extension if not exists vector;
create table docs (
  id        bigserial primary key,
  content   text,
  category  text,
  created_at timestamptz default now(),
  embedding vector(1536)
);

-- 2) ANN 인덱스 (HNSW + 코사인)
create index on docs using hnsw (embedding vector_cosine_ops)
  with (m = 16, ef_construction = 64);
-- 메타데이터 필터용 보조 인덱스
create index on docs (category, created_at);

-- 3) 검색 정확도-속도 손잡이
set hnsw.ef_search = 100;

-- 4) 메타데이터 필터 + 벡터 유사도 (하이브리드)
select id, content,
       1 - (embedding <=> :q_vec) as score        -- 코사인 유사도
from docs
where category = '환불'                            -- 메타 필터
  and created_at > now() - interval '90 days'      -- 최근 90일
order by embedding <=> :q_vec                      -- 거리 오름차순(가까운 순)
limit 5;`,
        note: '<=> 는 코사인 거리 연산자, 1-거리=유사도. WHERE로 메타데이터를 거르고 ORDER BY로 벡터 근접 정렬하는 실전 하이브리드 패턴. ef_search로 재현율을 조절한다.',
      },
    ],
  },

  // ── 머신러닝/딥러닝 ──
  'ml-dl-1': {
    theory: [
      {
        h: '일반화와 편향-분산 트레이드오프',
        body: '머신러닝의 목표는 훈련 데이터 암기가 아니라 보지 않은 데이터에서의 성능(일반화)이다. 모델이 너무 단순하면 패턴을 못 잡고(과소적합·높은 편향), 너무 복잡하면 훈련 노이즈까지 외워(과적합·높은 분산) 새 데이터에서 실패한다. 이 균형점을 찾는 것이 핵심이며, 훈련/검증/테스트 분할과 교차검증으로 일반화 성능을 추정한다. 전처리(스케일링·인코딩)는 반드시 훈련 데이터 기준으로 fit해, 테스트 정보가 전처리에 스며드는 데이터 누수를 막아야 한다.',
      },
      {
        h: '평가지표는 문제에 맞춰 고른다',
        body: '정확도는 클래스 불균형에서 오해를 부른다(정상 99% 데이터면 무조건 정상이라 찍어도 99%). 정밀도(예측 양성 중 실제 양성)와 재현율(실제 양성 중 잡아낸 비율)은 트레이드오프이며 F1으로 균형을 본다. 임계값에 무관한 ROC-AUC는 순위 능력을 측정한다. 거짓양성과 거짓음성 중 무엇이 더 치명적인지(비즈니스 비용)에 따라 지표와 결정 임계값을 정한다.',
      },
    ],
    realCode: [
      {
        title: '실전: 전처리 파이프라인 + 교차검증 (scikit-learn)',
        lang: 'python',
        code: `import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

df = pd.read_csv("data.csv")
y = df.pop("target")
num = df.select_dtypes("number").columns
cat = df.select_dtypes("object").columns

# 수치=표준화, 범주=원핫 — 전처리를 파이프라인에 넣어 누수 방지
pre = ColumnTransformer([
    ("num", StandardScaler(), num),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat),
])
pipe = Pipeline([("pre", pre),
                 ("clf", RandomForestClassifier(n_estimators=300, random_state=42))])

Xtr, Xte, ytr, yte = train_test_split(df, y, test_size=0.2, stratify=y, random_state=42)
print("CV F1:", cross_val_score(pipe, df, y, cv=5, scoring="f1_macro").mean())

pipe.fit(Xtr, ytr)
print(classification_report(yte, pipe.predict(Xte)))`,
        note: 'ColumnTransformer로 수치·범주를 따로 전처리하고 Pipeline에 포함해 교차검증 시 누수를 차단. stratify로 클래스 비율을 유지하고 f1_macro로 불균형을 고려.',
      },
    ],
  },
  'ml-dl-2': {
    theory: [
      {
        h: '역전파와 옵티마이저',
        body: '신경망 학습은 손실을 가중치로 미분한 기울기를 따라, 손실이 줄어드는 방향으로 가중치를 조금씩 갱신하는 과정이다. 역전파는 연쇄법칙으로 출력층→입력층 방향으로 기울기를 효율적으로 계산한다. 옵티마이저는 이 기울기를 어떻게 적용할지 정하며, SGD는 단순하지만 학습률에 민감하고, Adam은 1·2차 모멘트로 적응적 학습률을 제공해 대체로 빠르고 안정적으로 수렴한다. 학습률이 너무 크면 발산, 너무 작으면 느리거나 지역최소에 갇힌다.',
      },
      {
        h: '활성화·정규화·조기종료',
        body: '비선형 활성화(ReLU 등)가 없으면 층을 아무리 쌓아도 하나의 선형 변환에 불과하다. ReLU는 음수를 0으로 보내 기울기 소실에 강하고 계산이 싸 기본으로 쓰인다. 과적합 방지로 드롭아웃(학습 시 일부 뉴런 무작위 비활성)·배치정규화(층 입력 분포 안정화)를 쓰고, 검증 손실을 모니터링해 더 개선되지 않으면 조기종료하여 과적합 직전 가중치를 저장한다.',
      },
    ],
    realCode: [
      {
        title: '실전: PyTorch 학습 루프 + 검증 + 조기종료',
        lang: 'python',
        code: `import torch, torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset

def make_loader(X, y, bs=64, shuffle=False):
    ds = TensorDataset(torch.tensor(X, dtype=torch.float32),
                       torch.tensor(y, dtype=torch.long))
    return DataLoader(ds, batch_size=bs, shuffle=shuffle)

device = "cuda" if torch.cuda.is_available() else "cpu"
model = nn.Sequential(nn.Linear(30, 64), nn.ReLU(), nn.Dropout(0.2),
                      nn.Linear(64, 2)).to(device)
opt = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

best, patience, wait = 1e9, 5, 0
for epoch in range(100):
    model.train()
    for xb, yb in train_loader:
        xb, yb = xb.to(device), yb.to(device)
        opt.zero_grad()
        loss = loss_fn(model(xb), yb)
        loss.backward(); opt.step()

    model.eval(); vloss = 0.0
    with torch.no_grad():
        for xb, yb in val_loader:
            xb, yb = xb.to(device), yb.to(device)
            vloss += loss_fn(model(xb), yb).item()
    vloss /= len(val_loader)

    if vloss < best:                      # 개선되면 체크포인트
        best, wait = vloss, 0
        torch.save(model.state_dict(), "best.pt")
    else:
        wait += 1
        if wait >= patience:              # 개선 없으면 조기종료
            print(f"early stop @ epoch {epoch}, best val={best:.4f}"); break`,
        note: 'zero_grad→forward→loss→backward→step의 4단계 학습 루프에 검증·조기종료·체크포인트를 결합한 실전 템플릿. Dropout으로 과적합을 억제한다.',
      },
    ],
  },
  'ml-dl-3': {
    theory: [
      {
        h: 'CNN · RNN · Transformer',
        body: 'CNN은 합성곱 필터로 지역 패턴(엣지→질감→형태)을 계층적으로 추출하고 파라미터를 공유해 이미지에 효율적이다. RNN/LSTM은 순차 데이터를 시점별로 처리하되 장기 의존성에 약했고, LSTM의 게이트(입력·망각·출력)가 이를 완화했다. Transformer는 Self-Attention으로 모든 토큰 쌍의 관계를 병렬로 계산해 장거리 의존성과 학습 속도를 동시에 해결했으며, 현대 LLM과 비전 모델(ViT)의 표준 아키텍처가 되었다.',
      },
      {
        h: '전이학습 전략',
        body: '대규모 데이터로 사전학습된 모델은 일반적 특징(엣지·표현)을 이미 학습한 상태다. 전이학습은 이 가중치를 가져와 작은 도메인 데이터로 미세조정하며, 데이터가 적을수록 효과가 크다. 보통 초기에는 특징 추출부를 동결하고 분류층만 학습하다가, 데이터가 충분하면 상위 층까지 낮은 학습률로 함께 미세조정한다. 데이터 증강은 학습 데이터를 변형해 과적합을 줄이고 일반화를 높인다.',
      },
    ],
    realCode: [
      {
        title: '실전: 전이학습 (ResNet18 미세조정 + 증강)',
        lang: 'python',
        code: `import torch, torch.nn as nn
import torchvision as tv
from torchvision import transforms as T

# 1) 데이터 증강 (학습) vs 정규화만 (검증)
train_tf = T.Compose([
    T.RandomResizedCrop(224), T.RandomHorizontalFlip(),
    T.ColorJitter(0.2, 0.2, 0.2), T.ToTensor(),
    T.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
])

# 2) 사전학습 모델 로드 → 특징 추출부 동결
model = tv.models.resnet18(weights="IMAGENET1K_V1")
for p in model.parameters():
    p.requires_grad = False

# 3) 분류층을 우리 클래스 수로 교체 (이 층만 학습됨)
NUM_CLASSES = 5
model.fc = nn.Linear(model.fc.in_features, NUM_CLASSES)

# 4) fc만 우선 학습 → 이후 layer4까지 낮은 LR로 미세조정(선택)
opt = torch.optim.Adam(model.fc.parameters(), lr=1e-3)

# (미세조정 단계) 상위 블록 해제
for p in model.layer4.parameters():
    p.requires_grad = True
opt = torch.optim.Adam([
    {"params": model.fc.parameters(), "lr": 1e-3},
    {"params": model.layer4.parameters(), "lr": 1e-4},   # 더 낮게
])`,
        note: '특징 추출부 동결 → 분류층 교체·학습 → 상위 블록만 낮은 LR로 미세조정하는 2단계 전이학습. 학습/검증 증강을 다르게 적용해 누수를 막는다.',
      },
    ],
  },

  // ── 모델 서빙 / AIOps ──
  'serving-1': {
    theory: [
      {
        h: '서빙 패턴과 SLA',
        body: '추론 서빙은 요청-응답이 실시간인 온라인, 대량을 모아 처리하는 배치, 연속 입력을 처리하는 스트림으로 나뉜다. 온라인 서빙은 지연(latency)이, 배치는 처리량(throughput)이 핵심 지표다. 모델은 앱 시작 시 1회 로드해 요청마다 재로딩을 피하고(예: FastAPI lifespan), 입력은 Pydantic으로 검증해 잘못된 입력이 추론까지 가지 않게 한다. 요청을 모아 배치로 추론하면 GPU 활용률·처리량이 오르지만 지연은 늘어 균형이 필요하다.',
      },
    ],
    realCode: [
      {
        title: '실전: FastAPI 추론 서비스 (lifespan 로드 + 검증 + 배치)',
        lang: 'python',
        code: `from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, conlist
import joblib, numpy as np

STATE = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    STATE["model"] = joblib.load("model.pkl")   # 시작 시 1회 로드
    yield
    STATE.clear()

app = FastAPI(lifespan=lifespan)

class Req(BaseModel):
    features: conlist(float, min_length=30, max_length=30)   # 길이 검증

class BatchReq(BaseModel):
    items: list[Req]

@app.get("/health")
def health():
    return {"ok": "model" in STATE}

@app.post("/predict")
def predict(req: Req):
    try:
        p = STATE["model"].predict([req.features])[0]
        return {"prediction": int(p)}
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/predict-batch")             # 배치 추론으로 처리량↑
def predict_batch(req: BatchReq):
    X = np.array([r.features for r in req.items])
    return {"predictions": STATE["model"].predict(X).astype(int).tolist()}`,
        note: 'lifespan으로 모델을 1회 로드, Pydantic conlist로 입력 길이 검증, 단건·배치 엔드포인트를 함께 제공하는 실전 서빙 구조. /health는 readiness 프로브용.',
      },
    ],
  },
  'serving-2': {
    theory: [
      {
        h: '컨테이너화와 무중단 배포',
        body: 'Docker는 앱·의존성·런타임을 이미지로 묶어 어디서든 동일하게 실행되게 한다(환경 불일치 해소). 레이어 캐시를 활용하려면 자주 바뀌지 않는 의존성 설치를 먼저 두고 소스 복사를 나중에 둔다. 쿠버네티스는 배포·스케일·복구를 자동화하며, liveness(살아있나)와 readiness(트래픽 받을 준비됐나) 프로브를 구분해 모델 로딩이 끝나야 트래픽을 받게 한다. 롤링 업데이트로 새 파드가 ready가 된 뒤에만 트래픽을 옮겨 무중단 배포한다.',
      },
    ],
    realCode: [
      {
        title: '실전: Dockerfile + Kubernetes 배포(프로브 포함)',
        lang: 'docker',
        code: `# ---- Dockerfile (의존성 레이어 분리로 캐시 활용) ----
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt   # 자주 안 바뀜 → 먼저
COPY . .                                             # 소스는 나중에
EXPOSE 8000
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", \\
     "-w", "2", "app:app", "--bind", "0.0.0.0:8000"]

# ---- k8s deployment 발췌 (yaml) ----
# livenessProbe:  { httpGet: { path: /health, port: 8000 }, initialDelaySeconds: 15 }
# readinessProbe: { httpGet: { path: /health, port: 8000 }, periodSeconds: 5 }
# strategy: { type: RollingUpdate, rollingUpdate: { maxUnavailable: 0, maxSurge: 1 } }`,
        note: '의존성→소스 순서로 빌드 캐시를 극대화하고, liveness/readiness 프로브 + maxUnavailable:0 롤링 업데이트로 무중단 배포를 구성한다.',
      },
    ],
  },
  'serving-3': {
    theory: [
      {
        h: 'MLOps · CI/CD · 드리프트',
        body: 'MLOps는 데이터·학습·배포·모니터링을 자동화하고 재현 가능하게 만드는 실천이다. 모델 레지스트리로 버전·스테이지(staging/production)를 관리하고, CI/CD로 테스트→빌드→배포를 자동화하며, 카나리/블루그린 배포로 위험을 줄이고 문제 시 즉시 롤백한다. 배포 후에도 입력·개념 분포가 변하면(드리프트) 성능이 조용히 저하되므로 통계 검정(KS 등)으로 감시하고, 임계 초과 시 알림·재학습을 트리거한다.',
      },
    ],
    realCode: [
      {
        title: '실전: GitHub Actions ML CI/CD',
        lang: 'yaml',
        code: `name: ml-deploy
on: { push: { branches: [main] } }

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.11" }
      - run: pip install -r requirements.txt
      - run: pytest -q                          # 1) 테스트 게이트
      - run: |                                   # 2) 모델 검증(최소 성능)
          python scripts/eval.py --min-f1 0.85
      - name: Build & push image                # 3) 이미지 빌드/푸시
        run: |
          docker build -t $REG/infer:\${{ github.sha }} .
          echo "\${{ secrets.REG_TOKEN }}" | docker login $REG -u ci --password-stdin
          docker push $REG/infer:\${{ github.sha }}
        env: { REG: registry.example.com }
      - name: Deploy (canary)                    # 4) 카나리 배포
        run: kubectl set image deploy/infer infer=$REG/infer:\${{ github.sha }}`,
        note: '테스트·모델 성능 게이트를 통과해야 빌드·배포가 진행되는 ML CI/CD. 커밋 SHA를 이미지 태그로 써서 롤백을 쉽게 한다.',
      },
    ],
  },

  // ── Vue.js ──
  'vue-1': {
    theory: [
      {
        h: '반응성 시스템은 어떻게 동작하나',
        body: 'Vue 3의 반응성은 JavaScript Proxy로 구현된다. reactive(obj)는 객체 접근(get)을 가로채 "이 값을 누가 사용하는지" 의존성을 수집하고, 변경(set)이 일어나면 그 값을 쓰는 computed·렌더 함수만 다시 실행한다. ref는 원시값을 {value} 객체로 감싸 같은 추적을 가능하게 하며, 템플릿에서는 .value가 자동 언랩된다. 덕분에 개발자는 DOM을 직접 조작하지 않고 상태만 바꾸면 화면이 최소 비용으로 갱신된다. computed는 의존이 바뀔 때만 재계산되어 캐싱되고, watch는 값 변화에 따른 부수효과(API 호출 등)에 쓴다.',
      },
    ],
    realCode: [
      {
        title: '실전: 검색+정렬+디바운스 컴포넌트 (SFC)',
        lang: 'html',
        code: `<script setup>
import { ref, computed, watch } from 'vue'

const items = ref([])           // 원본 데이터
const keyword = ref('')
const sortKey = ref('name')
const loading = ref(false)
let timer

// 파생 목록: 필터 + 정렬 (의존이 바뀔 때만 재계산)
const view = computed(() =>
  items.value
    .filter(i => i.name.includes(keyword.value))
    .sort((a, b) => String(a[sortKey.value]).localeCompare(String(b[sortKey.value])))
)

// 검색어 입력은 300ms 디바운스로 API 호출 절감
watch(keyword, (kw) => {
  clearTimeout(timer)
  timer = setTimeout(async () => {
    loading.value = true
    const res = await fetch('/api/search?q=' + encodeURIComponent(kw))
    items.value = await res.json()
    loading.value = false
  }, 300)
})
</script>

<template>
  <input v-model="keyword" placeholder="검색" />
  <select v-model="sortKey"><option value="name">이름</option><option value="price">가격</option></select>
  <p v-if="loading">불러오는 중…</p>
  <ul v-else><li v-for="i in view" :key="i.id">{{ i.name }} — {{ i.price }}</li></ul>
</template>`,
        note: 'computed로 필터+정렬을 선언적으로 파생하고, watch+setTimeout 디바운스로 입력마다 API를 때리지 않게 한다. 반응성·computed·watch를 한 컴포넌트에서 종합.',
      },
    ],
  },
  'vue-2': {
    theory: [
      {
        h: '컴포넌트 통신과 합성',
        body: 'Vue는 단방향 데이터 흐름을 따른다 — 부모는 props로 데이터를 내려주고(자식은 읽기만), 자식은 emit 이벤트로 변경을 부모에 요청한다. 이 규칙이 데이터 출처를 명확히 해 디버깅을 쉽게 한다. 슬롯은 컴포넌트에 마크업을 주입하는 구멍으로 레이아웃 재사용에 쓰이고, Composition API의 composable(use~ 함수)은 상태+로직을 추출해 여러 컴포넌트에서 재사용하게 한다(React 훅과 유사). 라이프사이클 훅(onMounted 등)으로 데이터 패칭·정리 시점을 제어한다.',
      },
    ],
    realCode: [
      {
        title: '실전: 재사용 composable + props/emit 컴포넌트',
        lang: 'javascript',
        code: `// composables/useToggle.js — 상태+동작을 추출해 재사용
import { ref } from 'vue'
export function useToggle(initial = false) {
  const state = ref(initial)
  const toggle = () => (state.value = !state.value)
  const set = (v) => (state.value = v)
  return { state, toggle, set }
}

// composables/useAsync.js — 비동기 로딩/에러 공통 처리
import { ref } from 'vue'
export function useAsync(fn) {
  const data = ref(null), error = ref(null), loading = ref(false)
  async function run(...args) {
    loading.value = true; error.value = null
    try { data.value = await fn(...args) }
    catch (e) { error.value = e.message }
    finally { loading.value = false }
  }
  return { data, error, loading, run }
}

/* 사용 (컴포넌트 script setup)
import { useAsync } from '@/composables/useAsync'
const { data, error, loading, run } = useAsync((id) => fetch('/api/'+id).then(r=>r.json()))
run(42)
*/`,
        note: '공통 로직(토글·비동기 패칭)을 composable로 추출하면 여러 컴포넌트가 재사용한다. props/emit이 컴포넌트 간 통신이라면 composable은 로직 재사용 수단.',
      },
    ],
  },
  'vue-3': {
    theory: [
      {
        h: '라우팅과 전역 상태',
        body: 'SPA는 서버 왕복 없이 URL과 컴포넌트를 매핑한다(History API). Vue Router는 라우트 정의, 동적 파라미터(/detail/:id), 중첩 라우트, 네비게이션 가드(beforeEach로 인증 체크)를 제공한다. 여러 컴포넌트가 공유하는 상태는 Pinia 스토어(state·getters·actions)로 중앙화해 prop 드릴링을 피한다. 상태는 스토어→컴포넌트로 흐르고 변경은 action을 통하므로 예측 가능성과 디버깅성이 좋아진다.',
      },
    ],
    realCode: [
      {
        title: '실전: Pinia 스토어 + Router 가드',
        lang: 'javascript',
        code: `// stores/auth.js
import { defineStore } from 'pinia'
export const useAuth = defineStore('auth', {
  state: () => ({ user: null, token: localStorage.getItem('token') }),
  getters: { isAuthed: (s) => !!s.token },
  actions: {
    async login(email, pw) {
      const res = await fetch('/api/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pw }),
      })
      if (!res.ok) throw new Error('로그인 실패')
      const { token, user } = await res.json()
      this.token = token; this.user = user
      localStorage.setItem('token', token)
    },
    logout() { this.token = null; this.user = null; localStorage.removeItem('token') },
  },
})

// router.js — 인증 가드
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/pages/Home.vue') },
    { path: '/mypage', component: () => import('@/pages/My.vue'), meta: { requiresAuth: true } },
    { path: '/login', component: () => import('@/pages/Login.vue') },
  ],
})
router.beforeEach((to) => {
  const auth = useAuth()
  if (to.meta.requiresAuth && !auth.isAuthed)
    return { path: '/login', query: { redirect: to.fullPath } }   // 미인증 차단
})
export default router`,
        note: 'Pinia 스토어에 인증 상태·액션을 모으고, router.beforeEach 가드로 보호 라우트 접근을 통제하는 실전 인증 구조. meta.requiresAuth로 보호 페이지를 선언적으로 표시.',
      },
    ],
  },
  'vue-4': {
    theory: [
      {
        h: 'API 연동과 배포',
        body: '실데이터 연동은 로딩·에러·빈 상태(3-상태)를 분리 관리해야 UI가 안정적이다. axios 인스턴스에 baseURL·인터셉터를 두면 토큰 주입·공통 에러 처리를 한곳에서 한다. API 주소·키는 환경변수(Vite는 VITE_ 접두어만 클라이언트 노출)로 분리해 개발/운영을 전환한다. 빌드는 소스를 정적 파일(dist)로 변환하며 트리셰이킹·코드분할로 용량을 줄이고, SPA는 서버가 모든 경로를 index.html로 폴백해야 새로고침 404가 나지 않는다.',
      },
    ],
    realCode: [
      {
        title: '실전: axios 인스턴스(인터셉터) + 환경변수',
        lang: 'javascript',
        code: `// lib/http.js — 공통 axios 인스턴스
import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,   // .env: VITE_API_BASE=https://api...
  timeout: 15000,
})

// 요청 인터셉터: 토큰 자동 주입
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = \`Bearer \${token}\`
  return config
})

// 응답 인터셉터: 공통 에러 처리(401 → 로그인 이동)
http.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      location.href = '/login'
    }
    return Promise.reject(new Error(err.response?.data?.message || err.message))
  },
)

export default http
// 사용: const items = await http.get('/items')   // res.data 가 바로 반환됨`,
        note: '인터셉터로 토큰 주입·401 처리·에러 정규화를 한곳에 모은 실전 HTTP 레이어. 환경변수로 API 베이스를 분리해 개발/운영을 전환한다.',
      },
    ],
  },

  // ── AI Agent Capstone ──
  'capstone-1': {
    theory: [
      {
        h: '캡스톤 설계: 무엇을 먼저 정하나',
        body: '프로젝트 성공은 문제 정의와 설계에서 갈린다. 사용자·문제·가치를 한 문장으로 좁혀 범위를 통제하고, 시스템 아키텍처(컴포넌트·데이터 흐름)와 API 계약을 먼저 합의하면 프론트·백·AI가 병렬로 일할 수 있다. 평가 루브릭을 착수 시점에 정해 "무엇이 좋은 결과인가"를 명확히 하고, WBS로 작업을 잘게 나눠 담당·기한·리스크를 관리한다. 에이전트 기반이라면 어떤 도구가 필요한지, RAG 지식원은 무엇인지, 휴먼 개입(HITL) 지점은 어디인지를 설계에 포함한다.',
      },
    ],
    realCode: [
      {
        title: '실전: 프로젝트 레포 구조 + API 계약',
        lang: 'text',
        code: `capstone/
 ├─ backend/
 │   ├─ app.py           # FastAPI 진입점
 │   ├─ agent/
 │   │   ├─ graph.py     # LangGraph 에이전트(노드/엣지/State)
 │   │   ├─ tools.py     # 도구(검색·외부 API)
 │   │   └─ rag.py       # 인덱싱/검색
 │   ├─ schemas.py       # 요청/응답 Pydantic 모델(=API 계약)
 │   └─ requirements.txt
 ├─ frontend/            # Vue SPA (계약에 맞춰 병렬 개발)
 ├─ docker-compose.yml   # backend + vectordb 동시 기동
 └─ README.md            # 실행 방법·아키텍처 도식

# ── API 계약 (contract-first) ──
# POST /chat
#   req: { "message": str, "session_id": str }
#   res: { "answer": str, "sources": [str], "used_tools": [str] }
# POST /feedback
#   req: { "answer_id": str, "useful": bool }
#   res: { "ok": true }`,
        note: '관심사를 디렉터리로 분리하고 schemas.py(API 계약)를 먼저 확정하면 프론트·백이 목(mock)으로 병렬 개발 가능. README에 아키텍처·실행법을 남겨 재현성을 확보.',
      },
    ],
  },
  'capstone-2': {
    theory: [
      {
        h: '구현 전략: 수직 슬라이스 + 관측',
        body: '기능을 가로(전부의 UI→전부의 API→전부의 DB)로 만들면 끝까지 동작하는 게 늦게 나온다. 한 기능을 세로로(UI~DB까지) 먼저 완성하는 수직 슬라이스가 통합 위험을 조기에 줄인다. 매일 통합해 "통합 지옥"을 피하고, 항상 데모 가능한 상태를 유지한다. 멀티스텝 에이전트는 어디서 실패했는지 보이지 않으므로, 각 노드·도구 호출에 로깅·관측을 심어야 디버깅이 가능하다.',
      },
    ],
    realCode: [
      {
        title: '실전: 에이전트 + RAG 통합 골격 (관측 포함)',
        lang: 'python',
        code: `import logging, time, functools
from langgraph.prebuilt import create_react_agent
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI

log = logging.getLogger("capstone")

def traced(fn):
    """노드·도구 실행을 추적해 디버깅을 쉽게."""
    @functools.wraps(fn)
    def wrap(*a, **k):
        t0 = time.perf_counter()
        try:
            r = fn(*a, **k)
            log.info("%s ok %.2fs", fn.__name__, time.perf_counter() - t0)
            return r
        except Exception as e:
            log.exception("%s FAIL: %s", fn.__name__, e)
            raise
    return wrap

@tool
@traced
def search_docs(query: str) -> str:
    """사내 문서에서 관련 내용을 검색(RAG)."""
    hits = vectordb.similarity_search(query, k=4)
    return "\\n---\\n".join(d.page_content for d in hits)

@tool
@traced
def call_api(endpoint: str) -> str:
    """승인된 외부 API를 호출."""
    return external.get(endpoint)

agent = create_react_agent(ChatOpenAI(model="gpt-4o-mini"), tools=[search_docs, call_api])

def answer(message: str) -> dict:
    out = agent.invoke({"messages": [("user", message)]})
    return {"answer": out["messages"][-1].content}`,
        note: 'RAG 검색을 "도구"로 감싸면 에이전트가 필요할 때만 문서를 찾는다. @traced 데코레이터로 각 단계의 성공/지연/오류를 로깅해 멀티스텝 디버깅을 가능하게 한다.',
      },
    ],
  },
  'capstone-3': {
    theory: [
      {
        h: '완성·검증·발표',
        body: '발표 직전의 수정은 회귀(잘 되던 게 깨짐)를 부른다. 핵심 시나리오를 엔드투엔드 테스트로 고정하면 막판 변경에도 안전하고, 그 테스트가 곧 데모 스크립트가 된다. 시연은 라이브를 우선하되 실패에 대비해 녹화·백업을 준비하고 리허설로 시간을 맞춘다. 마무리로 KPT 회고와 README·재현 환경을 정리하면 결과물이 포트폴리오가 된다.',
      },
    ],
    realCode: [
      {
        title: '실전: E2E 테스트 + 발표용 스모크 스크립트',
        lang: 'python',
        code: `# tests/test_e2e.py — 핵심 시나리오를 고정(회귀 방지 + 데모 대본)
import pytest
from backend.app import answer

@pytest.mark.parametrize("q,expect", [
    ("환불 절차 알려줘", "환불"),
    ("영업시간은?", "시간"),
    ("", None),                      # 엣지: 빈 입력
])
def test_answer(q, expect):
    if expect is None:
        with pytest.raises(Exception):
            answer(q)
    else:
        res = answer(q)
        assert expect in res["answer"] and len(res["answer"]) > 10

# demo.sh — 발표 직전 스모크 테스트
# set -e
# curl -sf localhost:8000/health
# curl -sf -X POST localhost:8000/chat -d '{"message":"핵심 질문","session_id":"demo"}'
# echo "데모 준비 완료"`,
        note: '핵심 시나리오 + 엣지(빈 입력)를 파라미터라이즈드 테스트로 고정. 발표 전 스모크 스크립트로 서버·핵심 경로를 한 번에 점검해 라이브 데모 실패를 예방.',
      },
    ],
  },

  // ── AI 서비스 개발 Mini-project ──
  'miniproject-1': {
    theory: [
      {
        h: '기획·설계: 계약 우선',
        body: '미니 프로젝트는 기간이 짧아 범위 통제가 생명이다. 요구사항을 MoSCoW(Must/Should/Could/Won’t)로 우선순위화하고, MVP(핵심 가설을 검증할 최소 기능)부터 만든다. API 계약을 먼저 합의(contract-first)하면 프론트·백이 목으로 병렬 개발할 수 있고, 데이터 플로우(입력→처리→출력)를 그려 병목·의존을 파악한다. 기술 스택은 화려함보다 팀 역량·배포 용이성으로 고른다.',
      },
    ],
    realCode: [
      {
        title: '실전: 프로젝트 골격 + 환경 분리',
        lang: 'text',
        code: `app/
 ├─ api.py        # FastAPI 엔드포인트(얇게)
 ├─ chain.py      # LLM/RAG/Agent 핵심 로직
 ├─ db.py         # Vector/RDB 접근
 ├─ schemas.py    # 요청/응답 모델(API 계약)
 ├─ settings.py   # 환경변수 로딩(pydantic-settings)
 ├─ requirements.txt
 └─ .env          # OPENAI_API_KEY, DB_URL ... (git 제외!)

# settings.py — 비밀값은 코드가 아닌 환경변수에서
from pydantic_settings import BaseSettings
class Settings(BaseSettings):
    openai_api_key: str
    db_url: str = "sqlite:///app.db"
    class Config: env_file = ".env"
settings = Settings()

# .gitignore 에 반드시: .env`,
        note: '역할별 파일 분리(관심사 분리)로 협업·테스트가 쉬워진다. pydantic-settings로 환경변수를 타입 안전하게 읽고, .env는 .gitignore로 보호한다.',
      },
    ],
  },
  'miniproject-2': {
    theory: [
      {
        h: '구현: 모듈화·안정화',
        body: 'AI 로직(chain)과 API 계층을 분리하면 테스트·교체가 쉽다. 외부 호출(LLM·DB)은 실패할 수 있으므로 예외를 잡아 사용자 친화 메시지를 반환하고, 반복 질의가 많으면 캐싱으로 비용·지연을 줄인다. 로깅으로 요청·오류를 남겨 운영 가시성을 확보하고, 입력은 검증해 비정상 입력이 핵심 로직까지 가지 않게 한다. 매일 통합·중간 시연으로 방향을 조기 교정한다.',
      },
    ],
    realCode: [
      {
        title: '실전: 모듈 분리 + 캐싱 + 예외 처리',
        lang: 'python',
        code: `# chain.py — AI 로직(API와 분리)
import hashlib, functools
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3, timeout=30, max_retries=2)

@functools.lru_cache(maxsize=512)         # 동일 질문 캐싱(비용·지연↓)
def _cached(q_hash: str, q: str) -> str:
    return llm.invoke(q).content

def answer(question: str) -> str:
    key = hashlib.sha256(question.encode()).hexdigest()
    return _cached(key, question)

# api.py — 얇은 API 계층
from fastapi import FastAPI
from pydantic import BaseModel
from chain import answer
app = FastAPI()

class Ask(BaseModel):
    question: str

@app.post("/ask")
def ask(req: Ask):
    if not req.question.strip():
        return {"error": "질문이 비어 있습니다."}
    try:
        return {"answer": answer(req.question)}
    except Exception as e:
        return {"error": f"잠시 후 다시 시도해주세요: {e}"}`,
        note: 'chain(로직)과 api(인터페이스)를 분리하고, lru_cache로 반복 질의를 캐싱, 예외를 잡아 안전한 메시지를 반환하는 실전 구조. 입력 검증으로 빈 질문을 차단.',
      },
    ],
  },
  'miniproject-3': {
    theory: [
      {
        h: '테스트·배포',
        body: '발표 전 핵심 경로와 엣지 케이스(빈 입력·긴 입력·오류)를 점검하고, 동시 요청 부하로 병목·타임아웃을 확인한다. 배포는 환경변수·시크릿을 분리하고 재현 가능한 빌드(컨테이너/고정 의존성)로 한다. 무료 호스팅은 유휴 시 슬립(콜드스타트)이 있으니 첫 응답 지연을 감안하고, 문제 시 즉시 이전 버전으로 롤백할 수 있게 한다.',
      },
    ],
    realCode: [
      {
        title: '실전: Dockerfile + 배포 + 부하 스모크',
        lang: 'bash',
        code: `# Dockerfile
# FROM python:3.11-slim
# WORKDIR /app
# COPY requirements.txt . && RUN pip install -r requirements.txt
# COPY . .
# CMD ["gunicorn","-k","uvicorn.workers.UvicornWorker","app.api:app","--bind","0.0.0.0:8000"]

# 1) 로컬 동작 확인
uvicorn app.api:app --reload &

# 2) 핵심·엣지 스모크 테스트
curl -sf localhost:8000/ask -X POST -H "Content-Type: application/json" \\
     -d '{"question":"테스트 질문"}'
curl -s  localhost:8000/ask -X POST -H "Content-Type: application/json" \\
     -d '{"question":""}'                       # 엣지: 빈 입력

# 3) 동시 50요청 부하 (간이)
seq 50 | xargs -P10 -I{} curl -s -o /dev/null -w "%{http_code} " \\
     localhost:8000/ask -X POST -H "Content-Type: application/json" \\
     -d '{"question":"부하"}'; echo`,
        note: '컨테이너로 재현 가능한 배포본을 만들고, 정상·엣지·부하를 스모크 테스트한다. xargs -P10 으로 동시 요청을 흘려 콜드스타트·타임아웃·에러율을 점검.',
      },
    ],
  },

  // ── 참고용 (Spring AI) ──
  'spring-ai-1': {
    theory: [
      {
        h: 'Spring AI: ChatClient 추상화',
        body: 'Spring AI는 LLM 호출을 ChatClient/ChatModel로 추상화해 OpenAI·Anthropic·Ollama 등 프로바이더를 설정만으로 교체할 수 있다. ChatClient.Builder로 시스템 프롬프트·기본 옵션을 고정하고, prompt().user(..).call().content()의 유창한 API로 호출한다. 모델·키는 application.yml에 두고 환경변수로 주입하며, 스트리밍은 Flux로 받는다. Spring의 의존성 주입·자동설정 덕분에 기존 백엔드에 자연스럽게 통합된다.',
      },
    ],
    realCode: [
      {
        title: '실전: Spring AI 채팅 컨트롤러 + 설정',
        lang: 'java',
        code: `// application.yml
// spring:
//   ai:
//     openai:
//       api-key: \${OPENAI_API_KEY}
//       chat:
//         options: { model: gpt-4o-mini, temperature: 0.3 }

@RestController
@RequestMapping("/api")
class ChatController {
    private final ChatClient chat;

    ChatController(ChatClient.Builder builder) {
        this.chat = builder
            .defaultSystem("너는 친절한 한국어 상담원이다.")
            .build();
    }

    record ChatReq(String message) {}
    record ChatRes(String answer) {}

    @PostMapping("/chat")
    ChatRes chat(@RequestBody ChatReq req) {
        String answer = chat.prompt()
                .user(req.message())
                .call()
                .content();
        return new ChatRes(answer);
    }

    // 스트리밍 (SSE)
    @GetMapping(value = "/chat/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    Flux<String> stream(@RequestParam String q) {
        return chat.prompt().user(q).stream().content();
    }
}`,
        note: 'ChatClient.Builder로 시스템 프롬프트를 고정하고, record로 요청/응답 DTO를 정의. call()은 동기, stream()은 SSE 스트리밍. 키·모델은 application.yml에서 환경변수로 주입.',
      },
    ],
  },
  'spring-ai-2': {
    theory: [
      {
        h: 'Spring AI 기반 RAG',
        body: 'Spring AI는 EmbeddingModel과 VectorStore(pgvector·Redis 등) 추상화를 제공한다. 문서를 TokenTextSplitter로 청킹해 vectorStore.add()로 적재하고, similaritySearch로 질의와 가까운 청크를 가져와 system 컨텍스트로 주입하면 RAG가 된다. 임베딩 차원이 VectorStore 설정과 일치해야 하며, 출처(메타데이터)를 함께 저장해 답변에 근거를 표기한다.',
      },
    ],
    realCode: [
      {
        title: '실전: 문서 적재 + RAG 질의 서비스 (Java)',
        lang: 'java',
        code: `@Service
class RagService {
    private final VectorStore store;
    private final ChatClient chat;

    RagService(VectorStore store, ChatClient.Builder b) {
        this.store = store;
        this.chat = b.build();
    }

    // 1) 문서 적재: 청킹 → 임베딩 → 저장
    void ingest(String text) {
        var docs = new TokenTextSplitter().apply(List.of(new Document(text)));
        store.add(docs);
    }

    // 2) RAG 질의: 검색 → 컨텍스트 결합 → 생성
    String ask(String question) {
        var hits = store.similaritySearch(
            SearchRequest.query(question).withTopK(4));
        String context = hits.stream()
            .map(Document::getText)
            .collect(Collectors.joining("\\n---\\n"));
        return chat.prompt()
            .system("아래 컨텍스트만 근거로 답하라. 없으면 '자료에 없음'.\\n" + context)
            .user(question)
            .call().content();
    }
}`,
        note: 'TokenTextSplitter로 청킹 후 VectorStore에 적재하고, similaritySearch 결과를 system 컨텍스트로 주입하는 Spring AI RAG 패턴. "없으면 없다" 지시로 환각을 억제.',
      },
    ],
  },
  'spring-ai-3': {
    theory: [
      {
        h: 'Function Calling · 구조화 출력 · 보안',
        body: 'Function Calling은 모델이 필요할 때 등록된 함수(외부 API·DB 조회)를 호출하게 한다. @Description 메타데이터가 "언제 부를지" 판단 근거가 되고, 결과는 다시 모델에 전달돼 답변에 반영된다. 응답을 record/POJO로 매핑(entity)하면 후속 처리가 안전하다. 보안상 사용자 입력은 system 지시와 분리·검증해 프롬프트 인젝션을 막고, 도구가 외부에 영향을 주는 경우 권한·검증을 둔다.',
      },
    ],
    realCode: [
      {
        title: '실전: Function Calling + 구조화 출력 (Java)',
        lang: 'java',
        code: `// 1) 도구(함수) 등록 — 설명이 호출 판단 근거
public record WeatherReq(String city) {}
public record WeatherRes(String city, int tempC) {}

@Bean
@Description("도시의 현재 날씨를 조회한다")
Function<WeatherReq, WeatherRes> currentWeather(WeatherApi api) {
    return req -> new WeatherRes(req.city(), api.tempOf(req.city()));
}

// 2) 호출 시 도구 활성화 + 구조화 출력
record TravelTip(String city, String advice, int tempC) {}

@PostMapping("/tip")
TravelTip tip(@RequestBody String city) {
    return chat.prompt()
        .user("%s 날씨를 확인하고 옷차림을 조언해줘".formatted(city))
        .functions("currentWeather")          // 모델이 필요 시 호출
        .call()
        .entity(TravelTip.class);             // JSON → record 자동 매핑
}`,
        note: '@Description으로 도구 호출 판단을 돕고, .functions()로 활성화, .entity()로 응답을 record로 매핑. 모델이 currentWeather를 호출해 실시간 값을 답변에 반영한다.',
      },
    ],
  },
}

export const theoryFor = (subjectId, day) => theory[`${subjectId}-${day}`] || null
