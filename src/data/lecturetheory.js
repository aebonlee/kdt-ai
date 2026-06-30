// 날짜별 "심화 이론(theory)" + "실전 소스(realCode)" — subjectId-day 키.
//   theory: [{ h, body }] · realCode: [{ title, lang, code, note }]

export const theory = {
  "git-1": {
    "theory": [
      {
        "h": "왜 버전관리가 필요할까",
        "body": "보고서를 쓰다 보면 '최종.docx', '최종_진짜최종.docx', '최종_이게진짜.docx' 처럼 파일이 늘어난 경험이 있을 것이다. 어느 게 진짜 최신인지, 어제 지운 문장이 뭐였는지 알기 어렵다. Git은 이런 혼란을 없애준다. 변경할 때마다 '커밋'이라는 스냅샷을 찍어 두면, 언제든 원하는 시점으로 되감을 수 있다. 마치 게임에서 세이브 포인트를 만들어 두고 실패하면 그 지점으로 돌아가는 것과 같다. 여러 사람이 같은 프로젝트를 동시에 만져도 누가 무엇을 바꿨는지 또렷이 남는다."
      },
      {
        "h": "Git의 3단계 영역",
        "body": "Git을 처음 배울 때 가장 헷갈리는 것이 '내 폴더', '스테이징', '저장소' 세 공간의 구분이다. 작업 폴더(Working Directory)는 실제로 파일을 고치는 책상이다. 스테이징(Staging Area)은 '이번에 저장할 것'만 골라 담는 장바구니다. 저장소(Repository)는 장바구니에 담은 것을 영수증처럼 확정해 보관하는 창고다. 그래서 흐름이 항상 'add(장바구니 담기) → commit(창고에 확정)' 순서다. 이 3단계를 이해하면 Git 명령어가 갑자기 쉬워진다."
      },
      {
        "h": "브랜치로 안전하게 나눠 일하기",
        "body": "여러 사람이 하나의 문서를 동시에 덮어쓰면 서로의 작업이 사라진다. 브랜치는 이를 막아준다. 본문(main)을 그대로 둔 채 나만의 복사본 라인을 따서 거기서 자유롭게 실험하고, 완성되면 본문에 합친다(merge). 회사에서도 'main에는 항상 동작하는 코드만 둔다'는 규칙 아래, 새 기능은 별도 브랜치에서 만들고 PR로 리뷰받은 뒤 합친다. 가끔 같은 줄을 두 사람이 다르게 고치면 '충돌(conflict)'이 나는데, 이건 오류가 아니라 'Git이 어느 쪽을 살릴지 사람에게 물어보는 것'이니 당황하지 말고 골라주면 된다."
      }
    ],
    "realCode": [
      {
        "title": "프로젝트 시작부터 첫 커밋까지 전체 흐름",
        "lang": "bash",
        "code": "# 1) 내 이름과 이메일 등록 (커밋에 작성자로 기록됨, 최초 1회만)\ngit config --global user.name \"Hong Gildong\"\ngit config --global user.email \"gildong@example.com\"\n\n# 2) 새 프로젝트 폴더를 만들고 Git 저장소로 초기화\nmkdir my-first-repo\ncd my-first-repo\ngit init                      # .git 폴더가 생기며 버전관리 시작\n\n# 3) 첫 파일 생성\necho \"# 나의 첫 Git 프로젝트\" > README.md\n\n# 4) 현재 상태 확인 (빨간색 = 아직 추적 안 된 파일)\ngit status\n\n# 5) 스테이징에 올리고 커밋\ngit add README.md             # 장바구니에 담기\ngit commit -m \"docs: README 추가\"   # 창고에 확정 저장\n\n# 6) 지금까지의 커밋 이력 보기\ngit log --oneline             # 한 줄 요약으로 보기 좋게",
        "note": "config는 최초 1회만 하면 되고, 이후 모든 프로젝트는 init → add → commit 흐름이 똑같이 반복된다."
      },
      {
        "title": "브랜치를 만들어 작업하고 충돌을 해결한 뒤 합치기",
        "lang": "bash",
        "code": "# main에서 새 기능 브랜치를 만들어 이동\ngit switch -c feature/login\n\n# 파일을 수정한 뒤 커밋\necho \"login page\" > login.txt\ngit add login.txt\ngit commit -m \"feat: 로그인 페이지 추가\"\n\n# 작업이 끝났으니 main으로 돌아가 합치기\ngit switch main\ngit merge feature/login       # 충돌 없으면 바로 합쳐짐\n\n# 만약 같은 파일 같은 줄을 고쳐 충돌이 났다면:\n# 파일을 열면 <<<<<<< ======= >>>>>>> 표시가 보인다\n# 남길 내용만 직접 고른 뒤 표시 줄을 모두 지우고 저장한다\ngit add login.txt             # 해결했다고 Git에 알려주기\ngit commit -m \"merge: 충돌 해결\"   # 머지 마무리\n\n# 다 쓴 브랜치는 정리\ngit branch -d feature/login",
        "note": "충돌은 에러가 아니라 '둘 중 무엇을 살릴지 정하라'는 요청이므로, 표시 기호를 지우고 add → commit 하면 끝난다."
      }
    ]
  },
  "transformer-1": {
    "theory": [
      {
        "h": "언어모델은 다음 단어 맞히기 게임",
        "body": "스마트폰 자판에서 '오늘 날씨가'라고 치면 '좋다', '춥다' 같은 다음 단어를 추천해 주죠. 언어모델도 똑같이 앞 단어들을 보고 다음 단어를 확률로 예측합니다. '나는 밥을'까지 보면 '먹는다'가 나올 확률이 높다고 판단하는 식입니다. LLM은 이 게임을 어마어마하게 많은 글로 연습한 결과물입니다. 즉 거창해 보여도 본질은 '다음에 올 토큰의 확률 분포를 잘 맞히는 것'입니다."
      },
      {
        "h": "RNN의 한계와 Attention의 등장",
        "body": "예전 모델인 RNN은 문장을 사람이 글 읽듯 앞에서 뒤로 한 단어씩 순서대로 처리했습니다. 그래서 문장이 길어지면 앞부분 내용을 잊어버리는 '건망증'이 생기고, 한 단어씩 줄 서서 처리하니 느렸습니다. Attention은 이 문제를 해결합니다. 회의록을 읽을 때 모든 줄을 똑같이 보지 않고 핵심 문장에 형광펜을 치듯, Attention은 지금 중요한 단어에 더 큰 가중치를 줍니다. 게다가 모든 단어를 한꺼번에 비교하므로 줄 서서 기다릴 필요가 없어 훨씬 빠릅니다."
      },
      {
        "h": "Q·K·V로 보는 Self-Attention",
        "body": "Self-Attention은 도서관 검색에 비유할 수 있습니다. 각 단어는 '내가 궁금한 것'(Query), '나는 이런 주제예요'라는 이름표(Key), '내 실제 내용'(Value) 세 가지를 들고 있습니다. 한 단어의 Query를 다른 모든 단어의 Key와 맞춰보면 누가 나와 관련 깊은지 점수가 나옵니다. 이 점수를 softmax로 확률로 바꾼 뒤, 그 비율대로 각 단어의 Value를 섞어 새 표현을 만듭니다. 이렇게 하면 '그것'이라는 단어가 문장 속 어떤 명사를 가리키는지 같은 관계를 모델이 스스로 잡아냅니다."
      }
    ],
    "realCode": [
      {
        "title": "처음부터 만드는 Self-Attention 함수 (넘파이)",
        "lang": "python",
        "code": "import numpy as np\n\nnp.random.seed(0)\ntokens = [\"나는\", \"학교에\", \"간다\"]\nX = np.random.rand(3, 4)  # 토큰 3개를 4차원 벡터로 표현(임베딩)\n\n# 학습으로 정해지는 가중치 행렬(여기서는 난수로 흉내)\nWq = np.random.rand(4, 4)\nWk = np.random.rand(4, 4)\nWv = np.random.rand(4, 4)\n\nQ = X @ Wq  # 각 토큰의 '질문'\nK = X @ Wk  # 각 토큰의 '이름표'\nV = X @ Wv  # 각 토큰의 '내용'\n\ndef softmax(z):\n    e = np.exp(z - z.max(axis=1, keepdims=True))  # 큰 수 빼서 계산 안정화\n    return e / e.sum(axis=1, keepdims=True)\n\nd = K.shape[1]\nscores = (Q @ K.T) / np.sqrt(d)  # 점수를 차원 크기로 나눠 스케일링\nweights = softmax(scores)         # 각 행을 합 1인 확률로\noutput = weights @ V              # 확률대로 Value를 섞은 새 표현\n\nprint(\"가중치 행렬(각 행 합=1):\")\nprint(np.round(weights, 3))\nprint(\"행 합 확인:\", weights.sum(axis=1))",
        "note": "임베딩 X에서 Q·K·V를 만들고 점수→softmax→가중합으로 이어지는 Self-Attention 전 과정을 한 파일로 담았다."
      }
    ]
  },
  "transformer-2": {
    "theory": [
      {
        "h": "Multi-Head로 여러 관점 보기",
        "body": "한 사람만 글을 읽으면 한 가지 관점에 치우치기 쉽습니다. 그래서 여러 명이 같은 문장을 읽고 각자 다른 포인트를 잡아낸 뒤 의견을 모으면 더 풍부하게 이해되죠. Multi-Head Attention이 바로 이것입니다. Attention을 여러 개(head) 병렬로 돌려 어떤 head는 문법 관계를, 어떤 head는 의미 관계를 잡습니다. 각 head의 결과를 이어 붙여 하나로 합치면, 한 번의 Attention보다 훨씬 다양한 관계를 포착한 표현이 만들어집니다."
      },
      {
        "h": "순서를 알려주는 Positional Encoding",
        "body": "Attention은 모든 단어를 한꺼번에 보기 때문에 빠르지만, 대신 '누가 먼저 나왔는지' 순서를 모릅니다. '개가 사람을 물었다'와 '사람이 개를 물었다'는 단어는 같아도 뜻이 정반대인데, 순서를 모르면 구분할 수 없죠. 그래서 각 자리마다 고유한 번호표 같은 벡터(Positional Encoding)를 임베딩에 더해줍니다. 좌석마다 번호가 붙은 영화관처럼, 모델은 이 번호표 덕분에 단어의 위치와 어순을 인식하게 됩니다."
      },
      {
        "h": "BERT와 GPT는 무엇이 다른가",
        "body": "Transformer는 입력을 이해하는 Encoder와 출력을 만들어내는 Decoder로 나뉩니다. BERT는 Encoder만 써서 문장을 양쪽 방향으로 깊이 이해하는 데 강해 분류나 검색에 잘 맞습니다. 빈칸 채우기 시험을 잘 보는 학생에 비유할 수 있죠. 반대로 GPT는 Decoder만 써서 앞 단어만 보고 다음 단어를 줄줄 이어 쓰는 데 특화돼 글짓기, 대화에 강합니다. T5는 모든 문제를 '텍스트 입력 → 텍스트 출력'으로 바꿔 Encoder-Decoder를 함께 씁니다. 용도에 따라 구조를 고르는 셈입니다."
      }
    ],
    "realCode": [
      {
        "title": "Positional Encoding 만들어 그림으로 보기",
        "lang": "python",
        "code": "import numpy as np\nimport matplotlib.pyplot as plt\n\ndef positional_encoding(seq_len, d_model):\n    pos = np.arange(seq_len)[:, None]        # 자리 번호(행)\n    i = np.arange(d_model)[None, :]          # 차원 번호(열)\n    angle = pos / np.power(10000, (2 * (i // 2)) / d_model)\n    pe = np.zeros((seq_len, d_model))\n    pe[:, 0::2] = np.sin(angle[:, 0::2])     # 짝수 차원은 사인\n    pe[:, 1::2] = np.cos(angle[:, 1::2])     # 홀수 차원은 코사인\n    return pe\n\npe = positional_encoding(seq_len=20, d_model=32)\nprint(\"PE 모양:\", pe.shape)\nplt.imshow(pe, aspect=\"auto\", cmap=\"viridis\")\nplt.xlabel(\"임베딩 차원\")\nplt.ylabel(\"단어 위치\")\nplt.colorbar()\nplt.title(\"Positional Encoding\")\nplt.show()",
        "note": "위치마다 사인·코사인으로 고유한 무늬가 생겨, 모델이 단어의 순서를 구분할 수 있게 된다."
      },
      {
        "title": "사전학습 GPT-2로 다음 문장 이어쓰기",
        "lang": "python",
        "code": "# pip install transformers torch\nfrom transformers import pipeline\n\ngenerator = pipeline(\"text-generation\", model=\"gpt2\")\nprompt = \"In the future, artificial intelligence will\"\nresult = generator(\n    prompt,\n    max_new_tokens=30,   # 새로 만들 토큰 수\n    do_sample=True,      # 매번 조금씩 다르게 생성\n    temperature=0.8      # 창의성 정도(작을수록 안정적)\n)\nprint(result[0][\"generated_text\"])",
        "note": "Decoder-only 모델 GPT-2가 앞 문장을 받아 다음 단어를 차례로 이어 쓰며 문장을 완성한다."
      }
    ]
  },
  "python-1": {
    "theory": [
      {
        "h": "왜 데이터 분석에 Python인가",
        "body": "Python은 영어 문장처럼 읽히는 쉬운 문법 덕분에 처음 배우는 사람도 빠르게 익힐 수 있는 언어입니다. 데이터 분석에서 인기가 많은 이유는 Pandas·NumPy 같은 잘 만들어진 도구(라이브러리)가 풍부하기 때문입니다. 마치 요리를 할 때 직접 칼을 만들지 않고 좋은 주방도구를 사서 쓰는 것과 같습니다. 또 Colab 같은 무료 클라우드 환경에서 설치 없이 바로 코드를 돌려볼 수 있어 입문 장벽이 낮습니다. 그래서 데이터를 불러오고, 정리하고, 그래프로 그리는 모든 과정을 하나의 언어로 끝낼 수 있습니다."
      },
      {
        "h": "자료구조는 데이터를 담는 그릇이다",
        "body": "데이터를 다루려면 먼저 어디에 담을지를 정해야 합니다. 리스트는 순서가 있는 줄 세우기여서 '3월, 4월, 5월 매출'처럼 차례가 중요한 데이터에 좋습니다. 딕셔너리는 이름표가 붙은 서랍장이라서 '사과=4800원'처럼 이름으로 값을 바로 찾고 싶을 때 편합니다. 튜플은 한 번 정하면 못 바꾸는 리스트로, 좌표(x, y)처럼 변하면 안 되는 묶음에 씁니다. 집합(set)은 중복을 자동으로 없애 주어 '서로 다른 고객 수'를 셀 때 유용합니다. 그릇을 잘 고르면 코드가 훨씬 단순해집니다."
      }
    ],
    "realCode": [
      {
        "title": "매출 리스트 전처리 엔드투엔드 스크립트",
        "lang": "python",
        "code": "def clean_sales(rows):\n    totals = {}  # 상품별 매출 합계를 담을 딕셔너리\n    for name, price_str, qty in rows:\n        # 가격에서 쉼표 제거, 빈 값은 0으로 처리(결측치 처리)\n        price_str = price_str.replace(',', '').strip()\n        price = int(price_str) if price_str else 0\n        amount = price * qty  # 단가 x 수량 = 매출액\n        # 같은 상품이면 기존 금액에 더하고, 처음이면 새로 만든다\n        totals[name] = totals.get(name, 0) + amount\n    return totals\n\nsales = [\n    ('사과', '1,200', 3),\n    ('배', '', 2),\n    ('사과', '1200', 1),\n    ('포도', '3,000', 2),\n]\n\nresult = clean_sales(sales)\nprint('상품별 매출:', result)\n\n# 가장 많이 팔린 상품 찾기\nbest = max(result, key=result.get)\nprint(f'베스트셀러: {best} ({result[best]}원)')",
        "note": "원시 판매기록을 받아 쉼표·결측치를 정리하고 상품별 합계와 베스트셀러까지 한 번에 뽑아내는 완결 스크립트입니다."
      }
    ]
  },
  "python-2": {
    "theory": [
      {
        "h": "Pandas DataFrame은 코드로 다루는 엑셀이다",
        "body": "Pandas의 DataFrame은 엑셀 시트를 그대로 코드로 옮겨 놓은 것이라고 생각하면 됩니다. 행은 한 건의 기록(예: 승객 한 명), 열은 항목(나이·성별·생존 여부)을 뜻합니다. 엑셀에서 마우스로 하던 정렬·필터·합계를 Pandas에서는 한 줄의 명령으로 처리합니다. 차이점은 데이터가 수백만 줄이어도 빠르고, 같은 작업을 코드로 저장해 두면 다음에 똑같이 반복할 수 있다는 점입니다. 그래서 한 번 분석 코드를 잘 짜 두면 매달 바뀌는 데이터에도 그대로 재사용할 수 있습니다."
      },
      {
        "h": "데이터 정제가 분석의 8할이다",
        "body": "현실의 데이터는 거의 항상 지저분합니다. 빈 칸(결측치), 말도 안 되는 값(이상치), 제각각인 단위가 섞여 있습니다. 이를 그대로 분석하면 잘못된 결론이 나옵니다. 마치 채소를 씻지 않고 요리하는 것과 같습니다. 그래서 빈 칸은 평균이나 중앙값으로 채우고, 터무니없는 값은 걸러내고, 형식을 통일하는 정제 과정이 먼저입니다. 실무에서 데이터 분석가가 쓰는 시간의 대부분이 바로 이 청소 작업이며, 깨끗한 데이터에서만 믿을 수 있는 인사이트가 나옵니다."
      },
      {
        "h": "시각화는 숫자를 한눈에 보여 준다",
        "body": "표 안의 숫자만 봐서는 패턴을 알아채기 어렵습니다. 같은 데이터라도 막대그래프나 선그래프로 그리면 '어느 등급이 더 많이 생존했는가' 같은 차이가 한눈에 보입니다. matplotlib은 그래프를 그리는 기본 도구이고, seaborn은 그 위에서 더 예쁘고 통계적인 그래프를 쉽게 그려 주는 도구입니다. 좋은 시각화 한 장은 긴 설명보다 강력해서, 분석 결과를 동료나 상사에게 전달할 때 설득력을 크게 높여 줍니다."
      }
    ],
    "realCode": [
      {
        "title": "타이타닉 EDA 엔드투엔드 분석",
        "lang": "python",
        "code": "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\n# 1) 예제 데이터 불러오기\ndf = sns.load_dataset('titanic')\n\n# 2) 결측치 처리: 나이의 빈 칸을 중앙값으로 채움\ndf['age'] = df['age'].fillna(df['age'].median())\n\n# 3) 조건 필터링: 성인 승객만 선택\nadults = df[df['age'] >= 18]\n\n# 4) 그룹별 집계: 성별·등급별 생존율\nrate = df.groupby(['sex', 'pclass'])['survived'].mean()\nprint(rate)\n\n# 5) 시각화: 등급별 생존율 막대그래프\nsns.barplot(data=df, x='pclass', y='survived', hue='sex')\nplt.title('객실 등급·성별 생존율')\nplt.show()",
        "note": "데이터 적재부터 결측치 처리, 필터링, 그룹 집계, 시각화까지 EDA의 전 과정을 하나의 흐름으로 보여 줍니다."
      }
    ]
  },
  "prompt-1": {
    "theory": [
      {
        "h": "LLM은 '눈치 빠른 자동완성'이다",
        "body": "휴대폰 키보드가 '안녕'을 치면 '하세요'를 추천하는 것을 떠올려 보자. LLM도 똑같이 '지금까지의 글 다음에 가장 그럴듯한 단어'를 하나씩 골라 이어 붙인다. 다만 학습한 글의 양이 어마어마해서, 단순 추천을 넘어 번역·요약·코딩까지 해낸다. 그래서 우리가 줄 글(프롬프트)이 좋을수록 AI가 고르는 '다음 단어'들의 품질도 좋아진다. 즉 프롬프트는 AI의 능력을 끌어내는 '질문의 기술'이다. 좋은 주문서를 주면 좋은 요리가 나오는 식당과 같다."
      },
      {
        "h": "좋은 프롬프트에는 네 가지 재료가 들어간다",
        "body": "막연히 '이거 정리해 줘'라고 하면 AI는 무엇을 어떻게 할지 몰라 제멋대로 답한다. 좋은 프롬프트는 네 가지를 갖춘다. 첫째 역할(role): '너는 10년차 마케터다'처럼 입장을 정해 준다. 둘째 지시(instruction): '아래 글을 3줄로 요약하라'처럼 할 일을 명확히 한다. 셋째 예시(example): 원하는 형식의 견본을 보여 준다. 넷째 제약(constraint): '존댓말로, 200자 이내, 추측 금지'처럼 지켜야 할 규칙을 건다. 이 네 가지를 채우면 답의 품질이 눈에 띄게 안정된다."
      },
      {
        "h": "컨텍스트 엔지니어링: AI 책상 위를 정리하는 일",
        "body": "AI는 한 번에 읽을 수 있는 분량(컨텍스트 윈도우)이 정해져 있다. 책상이 작은 사람에게 책 100권을 한꺼번에 쌓아 주면 정작 필요한 페이지를 못 찾는 것과 같다. 그래서 '지금 이 일에 꼭 필요한 자료만 골라, 보기 좋게 배치'하는 작업이 필요한데 이를 컨텍스트 엔지니어링이라 한다. 긴 문서는 핵심만 요약해 넣고, 예시는 1~2개로 줄이며, 중요한 지시는 맨 앞이나 맨 뒤에 둔다. 토큰은 곧 비용이자 시간이므로, 적은 토큰으로 또렷한 답을 받는 것이 실력이다."
      }
    ],
    "realCode": [
      {
        "title": "프롬프트 4대 요소를 모두 갖춘 회의록 요약 봇 (엔드투엔드)",
        "lang": "python",
        "code": "import os\nfrom openai import OpenAI\n\n# 발급받은 키를 환경변수로 등록 (실제 키로 교체)\nos.environ[\"OPENAI_API_KEY\"] = \"sk-여기에-본인키\"\nclient = OpenAI()\n\n# 역할 + 지시 + 예시 + 제약을 한 번에 담은 시스템 프롬프트\nsystem_prompt = \"\"\"역할: 너는 꼼꼼한 회의록 요약 전문가다.\n지시: 아래 회의록을 읽고 결정사항/할일/담당자를 표로 정리하라.\n예시 형식:\n| 구분 | 내용 | 담당자 |\n|------|------|--------|\n| 결정 | 출시일 확정 | 김PM |\n제약: 반드시 Markdown 표로만 답하라. 회의록에 없는 내용은 추측하지 말고 비워 둬라.\"\"\"\n\nmeeting_note = \"\"\"오늘 회의: 신제품 출시일을 7월 15일로 확정함.\n디자인 시안은 박디자이너가 다음주 수요일까지 완성하기로 함.\n예산은 아직 미정.\"\"\"\n\nresponse = client.chat.completions.create(\n    model=\"gpt-4o-mini\",                 # 빠르고 저렴한 모델\n    messages=[\n        {\"role\": \"system\", \"content\": system_prompt},  # 규칙을 주는 칸\n        {\"role\": \"user\", \"content\": meeting_note},       # 실제 자료를 주는 칸\n    ],\n    temperature=0.2,  # 0에 가까울수록 일관되고 사실적인 답\n)\n\nprint(response.choices[0].message.content)  # 표 형태 요약 출력",
        "note": "system 칸에는 변하지 않는 규칙을, user 칸에는 그때그때의 자료를 넣는 것이 핵심이며, temperature를 낮추면 답이 흔들리지 않는다."
      },
      {
        "title": "같은 입력으로 v1 vs v2 프롬프트 성능 비교하기",
        "lang": "python",
        "code": "import os\nfrom openai import OpenAI\nclient = OpenAI()\n\nquestion = \"사과 3개에 4500원이면 한 개 가격은?\"\n\n# v1: 그냥 물어보기 (Zero-shot)\nv1 = \"다음 문제의 답만 말해줘: \" + question\n# v2: 단계별로 생각하게 시키기 (Chain-of-Thought)\nv2 = \"다음 문제를 단계별로 풀이한 뒤 마지막에 '정답:'을 붙여줘: \" + question\n\ndef ask(prompt):\n    r = client.chat.completions.create(\n        model=\"gpt-4o-mini\",\n        messages=[{\"role\": \"user\", \"content\": prompt}],\n    )\n    return r.choices[0].message.content\n\nprint(\"[v1 Zero-shot]\\n\", ask(v1))   # 바로 답 (가끔 틀림)\nprint(\"\\n[v2 CoT]\\n\", ask(v2))        # 풀이 과정 + 답 (더 정확)",
        "note": "같은 질문이라도 '단계별로 풀라'는 한 문장(CoT)을 더하면 계산·추론 문제의 정답률이 올라가는 것을 직접 비교해 볼 수 있다."
      }
    ]
  },
  "vue-1": {
    "theory": [
      {
        "h": "왜 Vue를 쓰나: 화면을 자동으로 그려주는 똑똑한 도우미",
        "body": "옛날 방식에서는 데이터가 바뀔 때마다 개발자가 직접 'document.getElementById로 요소를 찾아 글자를 바꿔라'라고 일일이 명령해야 했습니다. 이는 마치 칠판의 숫자가 바뀔 때마다 사람이 지우개로 지우고 다시 쓰는 것과 같습니다. Vue는 데이터와 화면을 끈으로 묶어두는 도우미입니다. 데이터(숫자)만 바꾸면 Vue가 알아서 칠판을 고쳐 씁니다. 그래서 우리는 '무엇을 보여줄지'만 선언하면 되고, '어떻게 바꿀지'는 Vue가 처리합니다. 이 방식을 선언형 UI라고 부릅니다."
      },
      {
        "h": "SFC: 한 파일에 들어있는 작은 부품",
        "body": "Vue로 만드는 모든 화면은 .vue 라는 파일 하나에 담깁니다. 이 파일은 세 칸으로 나뉩니다. <template>은 눈에 보이는 HTML 모양, <script setup>은 데이터와 동작을 담은 두뇌, <style>은 색깔과 크기 같은 꾸밈입니다. 레고 블록 하나에 모양·기능·색이 함께 들어있다고 생각하면 쉽습니다. 이렇게 부품으로 나누면 버튼은 버튼대로, 목록은 목록대로 따로 만들어 두었다가 필요할 때 가져다 조립할 수 있습니다."
      },
      {
        "h": "ref와 reactive: 반응형 상자의 두 종류",
        "body": "ref는 값 하나를 담는 작은 상자입니다. 숫자 0을 넣으려면 ref(0)으로 만들고, 안의 값을 꺼내거나 바꿀 때는 count.value 처럼 .value를 붙입니다. reactive는 여러 칸이 있는 서랍장으로, 객체 전체를 통째로 반응형으로 만듭니다. 둘 다 '안의 내용이 바뀌면 화면에 알려준다'는 점은 같습니다. 처음에는 값 하나는 ref, 묶음 데이터는 reactive 라고 외워두고, 헷갈리면 ref만 써도 대부분 해결됩니다."
      }
    ],
    "realCode": [
      {
        "title": "온도 변환기: 입력하면 즉시 화씨로 바뀌는 컴포넌트",
        "lang": "vue",
        "code": "<script setup>\nimport { ref, computed } from 'vue'\n\n// 섭씨 입력값을 담는 반응형 상자\nconst celsius = ref(0)\n\n// 섭씨가 바뀔 때마다 화씨를 자동 계산 (C * 9/5 + 32)\nconst fahrenheit = computed(() => celsius.value * 9 / 5 + 32)\n\n// 더운지 추운지 한 줄 평가\nconst comment = computed(() =>\n  celsius.value >= 28 ? '덥습니다 🥵' :\n  celsius.value <= 5 ? '춥습니다 🥶' : '쾌적합니다 🙂'\n)\n</script>\n\n<template>\n  <h2>온도 변환기</h2>\n  <!-- v-model로 입력칸과 celsius를 양방향 연결, number로 숫자 처리 -->\n  <input type=\"number\" v-model.number=\"celsius\" /> °C\n  <p>화씨: {{ fahrenheit }} °F</p>\n  <p>{{ comment }}</p>\n</template>",
        "note": "celsius 하나만 바꾸면 computed로 묶인 fahrenheit와 comment가 새로고침 없이 동시에 갱신됩니다."
      }
    ]
  },
  "vue-2": {
    "theory": [
      {
        "h": "컴포넌트: 화면을 레고 블록으로 나누기",
        "body": "큰 화면 하나를 통째로 만들면 코드가 길어지고 수정이 어렵습니다. 대신 헤더·상품카드·푸터처럼 의미 있는 단위로 잘게 쪼개면, 같은 카드를 100번이고 재사용할 수 있고 한 군데만 고치면 전체가 바뀝니다. 이것이 컴포넌트입니다. 자동차를 만들 때 바퀴·문·핸들을 따로 찍어내 조립하는 것과 같습니다. 부품 하나가 잘 동작하면, 그것을 가져다 쓰는 모든 곳이 함께 좋아집니다."
      },
      {
        "h": "props는 내려가고 emit은 올라간다: 데이터의 일방통행",
        "body": "Vue에서 부모와 자식의 대화에는 규칙이 있습니다. 데이터는 props를 통해 부모에서 자식으로만 내려갑니다. 마치 윗물이 아랫물로 흐르듯 한 방향입니다. 그렇다면 자식이 부모에게 '버튼을 눌렀어요'라고 알리고 싶을 때는요? 자식은 직접 부모 데이터를 고치지 못하고, emit이라는 종을 울려 신호만 보냅니다. 부모는 그 종소리를 듣고 자기 데이터를 직접 바꿉니다. 이렇게 흐름을 한 방향으로 정해두면 '누가 데이터를 바꿨는지' 추적하기 쉬워 버그가 줄어듭니다."
      },
      {
        "h": "컴포저블: 똑같은 로직을 함수로 빼서 돌려쓰기",
        "body": "여러 화면에서 '마우스 위치를 추적한다'거나 '서버에서 데이터를 불러온다' 같은 똑같은 일을 반복하게 됩니다. 이때마다 코드를 복사·붙여넣기 하면 나중에 고칠 곳이 늘어납니다. 컴포저블은 이런 공통 로직을 useMouse() 같은 함수 하나로 빼두고, 필요한 컴포넌트마다 불러다 쓰는 방법입니다. 요리에서 자주 쓰는 양념장을 미리 한 통 만들어 두고 여러 요리에 덜어 쓰는 것과 같습니다. 한 통만 잘 만들면 모든 요리 맛이 좋아집니다."
      }
    ],
    "realCode": [
      {
        "title": "컴포저블 useCounter로 카운터 로직 재사용하기",
        "lang": "javascript",
        "code": "// src/composables/useCounter.js\nimport { ref } from 'vue'\n\n// 카운터 로직을 함수 하나로 묶어 어디서든 재사용\nexport function useCounter(start = 0, step = 1) {\n  const count = ref(start)\n  const increase = () => { count.value += step }   // step만큼 증가\n  const decrease = () => { count.value -= step }   // step만큼 감소\n  const reset = () => { count.value = start }      // 처음 값으로 되돌림\n  return { count, increase, decrease, reset }       // 컴포넌트에 넘겨줌\n}",
        "note": "이렇게 빼두면 어떤 컴포넌트에서든 const { count, increase } = useCounter(10, 5) 처럼 가져다 쓸 수 있습니다."
      },
      {
        "title": "위 컴포저블을 컴포넌트에서 사용하기",
        "lang": "vue",
        "code": "<script setup>\nimport { onMounted } from 'vue'\nimport { useCounter } from '../composables/useCounter'\n\n// 10에서 시작해 2씩 변하는 카운터를 불러옴\nconst { count, increase, decrease, reset } = useCounter(10, 2)\n\n// 컴포넌트가 화면에 처음 나타날 때 한 번 실행\nonMounted(() => console.log('카운터 준비 완료'))\n</script>\n\n<template>\n  <p>현재 값: {{ count }}</p>\n  <button @click=\"increase\">+2</button>\n  <button @click=\"decrease\">-2</button>\n  <button @click=\"reset\">리셋</button>\n</template>",
        "note": "onMounted는 컴포넌트가 화면에 뜨는 순간 자동 실행되는 라이프사이클 훅입니다."
      }
    ]
  },
  "vue-3": {
    "theory": [
      {
        "h": "SPA: 종이를 갈지 않고 내용만 바꾸는 책",
        "body": "전통적인 웹사이트는 링크를 누를 때마다 서버에서 새 페이지를 통째로 받아와 화면이 깜빡이며 바뀝니다. 이는 책장을 넘길 때마다 책 전체를 새로 사오는 것과 비슷합니다. SPA는 책 한 권을 손에 들고 필요한 페이지만 펼쳐 보는 방식입니다. 처음 한 번만 앱을 받아오고, 이후 화면 전환은 자바스크립트가 필요한 부분만 갈아끼웁니다. 그래서 페이지 이동이 깜빡임 없이 빠릅니다. Vue Router가 바로 이 '어떤 페이지를 펼칠지' 정하는 책갈피 역할을 합니다."
      },
      {
        "h": "Router: 주소와 화면을 연결하는 길 안내",
        "body": "라우터는 '/products 주소로 오면 상품목록 컴포넌트를 보여줘', '/products/5로 오면 5번 상품 상세를 보여줘' 같은 약속표를 들고 있습니다. 사용자가 router-link를 누르면 라우터가 약속표를 보고 알맞은 컴포넌트를 router-view 자리에 끼워 넣습니다. 주소창의 :id 같은 부분은 그때그때 바뀌는 값이라, 상세 페이지에서 useRoute()로 꺼내 '몇 번 상품인지' 알아냅니다. 식당에서 테이블 번호표를 보고 음식을 가져다주는 것과 같은 원리입니다."
      },
      {
        "h": "Pinia: 모두가 함께 보는 공용 게시판",
        "body": "장바구니 개수처럼 여러 페이지가 함께 알아야 하는 데이터를 각 컴포넌트가 따로 들고 있으면, 한 곳에서 바꿔도 다른 곳은 모릅니다. Pinia는 이런 공용 데이터를 건물 로비의 게시판 한 곳에 붙여두는 방식입니다. 누구든 게시판(store)을 보면 최신 정보를 알 수 있고, 액션(actions)을 통해 내용을 고치면 모든 페이지가 즉시 같은 값을 봅니다. state는 게시판에 붙은 내용, getter는 그 내용을 계산해 보여주는 요약, action은 내용을 고치는 손입니다."
      }
    ],
    "realCode": [
      {
        "title": "Pinia 장바구니 스토어 전체 구현",
        "lang": "javascript",
        "code": "// src/stores/cart.js\nimport { defineStore } from 'pinia'\n\nexport const useCartStore = defineStore('cart', {\n  // 공유할 데이터\n  state: () => ({ items: [] }),\n\n  // 계산된 값 (읽기 전용)\n  getters: {\n    totalCount: (state) => state.items.length,\n    totalPrice: (state) => state.items.reduce((sum, p) => sum + p.price, 0)\n  },\n\n  // 데이터를 바꾸는 함수\n  actions: {\n    addItem(product) {\n      this.items.push(product)        // 장바구니에 상품 추가\n    },\n    removeItem(id) {\n      this.items = this.items.filter(p => p.id !== id)  // id로 제거\n    }\n  }\n})",
        "note": "어느 컴포넌트에서든 const cart = useCartStore() 로 불러 cart.addItem(p)·cart.totalCount 를 공유해 씁니다."
      },
      {
        "title": "라우터 설정과 동적 파라미터 상세 페이지",
        "lang": "javascript",
        "code": "// src/router/index.js\nimport { createRouter, createWebHistory } from 'vue-router'\nimport Home from '../views/Home.vue'\nimport ProductList from '../views/ProductList.vue'\nimport ProductDetail from '../views/ProductDetail.vue'\n\nconst routes = [\n  { path: '/', component: Home },\n  { path: '/products', component: ProductList },\n  // :id 자리에 상품 번호가 들어옴\n  { path: '/products/:id', component: ProductDetail }\n]\n\nconst router = createRouter({\n  history: createWebHistory(),   // 깔끔한 주소(/products) 사용\n  routes\n})\n\n// 로그인 안 했으면 막는 문지기 예시\nrouter.beforeEach((to) => {\n  const needAuth = to.path.startsWith('/admin')\n  const isLoggedIn = false\n  if (needAuth && !isLoggedIn) return '/'   // 홈으로 돌려보냄\n})\n\nexport default router",
        "note": "beforeEach는 모든 페이지 이동 전에 실행되어 접근 권한을 검사하는 네비게이션 가드입니다."
      }
    ]
  },
  "vue-4": {
    "theory": [
      {
        "h": "비동기: 주문하고 기다리는 동안 다른 일 하기",
        "body": "서버에서 데이터를 받아오는 일은 카페에서 음료를 주문하는 것과 같습니다. 주문 후 음료가 나올 때까지 가만히 멈춰 서 있으면 다른 손님도 못 받고 가게가 마비됩니다. 비동기 방식은 주문번호(약속)를 받아두고 자리에 앉아 다른 일을 하다가, 음료가 나오면(응답이 오면) 그때 가져오는 방식입니다. Vue에서는 데이터를 기다리는 동안 '불러오는 중...' 화면을 보여주고, 도착하면 목록으로 바꿔 그립니다. 그래서 사용자는 화면이 멈췄다고 느끼지 않습니다."
      },
      {
        "h": "로딩·에러·성공: 세 가지 상태를 항상 챙기기",
        "body": "서버 요청은 항상 성공하지 않습니다. 인터넷이 끊기거나 서버가 느릴 수 있습니다. 그래서 프로처럼 만들려면 화면을 세 가지 상태로 나눠 생각해야 합니다. 첫째 '불러오는 중'에는 빙글빙글 도는 표시를, 둘째 '실패'에는 친절한 오류 안내와 다시 시도 버튼을, 셋째 '성공'에는 실제 데이터를 보여줍니다. 식당에서 음식이 준비 중인지, 재료가 떨어졌는지, 나왔는지 손님에게 알려주는 것과 같습니다. 이 세 상태를 챙기는 습관이 초보와 실무자를 가릅니다."
      },
      {
        "h": "빌드와 배포: 작업실 코드를 손님에게 내보내기",
        "body": "개발 중에 쓰는 코드는 사람이 읽기 좋게 풀어 쓴 상태라 용량이 크고 느립니다. npm run build를 하면 Vite가 이 코드를 압축하고 불필요한 부분을 떼어내 dist 폴더에 작고 빠른 배포용 파일을 만듭니다. 이건 마치 작업실에서 만든 가구를 포장해 매장으로 보내는 것과 같습니다. 이 dist 폴더를 GitHub Pages나 Netlify 같은 정적 호스팅에 올리면 누구나 인터넷 주소로 접속할 수 있습니다. SPA는 주소가 여러 개라도 실제 파일은 index.html 하나이므로, 새로고침 시 페이지를 못 찾지 않게 호스팅 설정을 맞춰주는 것이 마지막 관문입니다."
      }
    ],
    "realCode": [
      {
        "title": "API 목록 불러오기: 로딩·에러·성공 3상태 처리",
        "lang": "vue",
        "code": "<script setup>\nimport { ref, onMounted } from 'vue'\nimport axios from 'axios'\n\nconst posts = ref([])\nconst loading = ref(false)\nconst error = ref('')\n\nasync function loadPosts() {\n  loading.value = true        // 1) 불러오기 시작\n  error.value = ''\n  try {\n    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')\n    posts.value = res.data.slice(0, 5)   // 앞 5개만 사용\n  } catch (e) {\n    error.value = '데이터를 불러오지 못했습니다'  // 2) 실패 처리\n  } finally {\n    loading.value = false      // 3) 성공이든 실패든 로딩 종료\n  }\n}\n\nonMounted(loadPosts)   // 화면에 뜨면 자동 호출\n</script>\n\n<template>\n  <p v-if=\"loading\">불러오는 중...</p>\n  <p v-else-if=\"error\">{{ error }}</p>\n  <ul v-else>\n    <li v-for=\"p in posts\" :key=\"p.id\">{{ p.title }}</li>\n  </ul>\n</template>",
        "note": "try/catch/finally로 성공·실패·종료를 모두 다뤄, 어떤 상황에서도 화면이 멈추지 않습니다."
      },
      {
        "title": "유효성 검사가 있는 입력 폼",
        "lang": "vue",
        "code": "<script setup>\nimport { ref } from 'vue'\n\nconst title = ref('')\nconst message = ref('')\n\nfunction submit() {\n  // 제목이 비었는지 검사\n  if (!title.value.trim()) {\n    message.value = '제목을 입력하세요'\n    return                       // 통과 못 하면 여기서 멈춤\n  }\n  if (title.value.length < 3) {\n    message.value = '제목은 3글자 이상이어야 합니다'\n    return\n  }\n  message.value = `등록 완료: ${title.value}`\n  title.value = ''               // 입력칸 비우기\n}\n</script>\n\n<template>\n  <input v-model=\"title\" placeholder=\"제목 입력\" />\n  <button @click=\"submit\">등록</button>\n  <p>{{ message }}</p>\n</template>",
        "note": "보내기 전에 빈칸·길이를 검사해 잘못된 입력을 걸러내는 것이 폼 유효성 검사의 기본입니다."
      }
    ]
  },
  "webproject-1": {
    "theory": [
      {
        "h": "왜 기획부터 시작할까",
        "body": "바로 코딩을 시작하면 길을 잃기 쉽다. 여행을 떠나기 전 목적지와 경로를 정하듯, 웹 서비스도 '무엇을, 누구를 위해' 만들지 먼저 정해야 한다. 기획 단계에서는 거창한 문서가 아니라 한 줄 소개와 사용자 시나리오 몇 개면 충분하다. 사용자 시나리오는 '사용자가 ~한다'는 짧은 문장으로, 우리가 만들 기능을 자연스럽게 끌어낸다. 이렇게 적어두면 팀원 모두가 같은 그림을 보게 되어 헛수고가 줄어든다. 3일 안에 끝내야 하므로 기능은 작게, 핵심만 고른다."
      },
      {
        "h": "화면과 데이터를 함께 설계하기",
        "body": "웹 서비스는 결국 '화면(보이는 것)'과 '데이터(저장되는 것)' 두 가지로 이루어진다. 와이어프레임으로 화면의 위치를 잡고, 동시에 그 화면이 보여줄 데이터의 모양을 표로 정리한다. 예를 들어 할 일 목록 화면이라면 '할 일 한 개 = 제목 + 완료여부 + 마감일' 처럼 데이터 한 덩어리의 구조를 정한다. 화면과 데이터를 같이 보면, 나중에 코드를 짤 때 '이 버튼을 누르면 어떤 데이터가 바뀌는가'가 명확해진다. 설계가 탄탄하면 구현은 의외로 빨라진다."
      }
    ],
    "realCode": [
      {
        "title": "할 일 데이터 모델과 초기 목록을 자바스크립트로 정의하기",
        "lang": "javascript",
        "code": "// 할 일 한 개의 데이터 구조(모델)를 객체로 표현한다\n// id: 고유 번호, title: 제목, done: 완료여부, due: 마감일\nconst todos = [\n  { id: 1, title: 'Vue 프로젝트 생성하기', done: true,  due: '2026-07-01' },\n  { id: 2, title: '와이어프레임 그리기',   done: false, due: '2026-07-01' },\n  { id: 3, title: 'GitHub에 코드 올리기',  done: false, due: '2026-07-02' }\n]\n\n// 아직 완료되지 않은 할 일만 골라낸다 (filter: 조건에 맞는 것만 추림)\nconst remaining = todos.filter(t => t.done === false)\n\n// 화면 상단에 보여줄 안내 문구를 만든다\nconsole.log(`전체 ${todos.length}개 중 남은 일 ${remaining.length}개`)\nremaining.forEach(t => console.log('- ' + t.title))\n// 기대 출력: 전체 3개 중 남은 일 2개 / - 와이어프레임 그리기 / - GitHub에 코드 올리기",
        "note": "화면을 만들기 전, 데이터의 모양과 가공 방법을 먼저 코드로 확인해두면 이후 Vue 컴포넌트 작성이 쉬워진다."
      }
    ]
  },
  "webproject-2": {
    "theory": [
      {
        "h": "왜 화면을 컴포넌트로 쪼갤까",
        "body": "한 파일에 모든 코드를 몰아넣으면 금세 길어지고 고치기 어려워진다. 그래서 화면을 '폼', '목록', '항목'처럼 역할별로 잘라 각각 작은 파일로 만든다. 이것이 컴포넌트다. 레고 블록처럼 작은 부품을 만들어두면, 같은 항목 부품을 목록에서 여러 번 재사용할 수 있고, 문제가 생겨도 그 부품만 열어 고치면 된다. 부모 컴포넌트는 데이터를 props로 자식에게 내려주고, 자식은 사용자가 한 행동을 emit으로 부모에게 올려보낸다. 이 위아래 소통 규칙만 익히면 화면 구성이 훨씬 쉬워진다."
      },
      {
        "h": "반응형이 일을 대신 해준다",
        "body": "예전 방식이라면 데이터가 바뀔 때마다 '화면의 이 글자를 다시 써라'고 일일이 명령해야 했다. Vue의 반응형 상태(ref)를 쓰면 데이터만 바꾸면 화면이 알아서 따라 바뀐다. 비유하면, 칠판에 직접 분필로 다시 쓰는 대신 전광판에 숫자만 입력하면 화면이 자동 갱신되는 것과 같다. 할 일을 배열에 push 하면 v-for가 즉시 새 항목을 그려주고, done 값을 true로 바꾸면 취소선이 바로 적용된다. 개발자는 '데이터를 어떻게 바꿀지'에만 집중하면 되니 생산성이 크게 올라간다."
      }
    ],
    "realCode": [
      {
        "title": "App.vue 전체: 할 일 추가·완료·삭제가 동작하는 메인 화면",
        "lang": "vue",
        "code": "<script setup>\nimport { ref } from 'vue'\n\n// 할 일 목록을 반응형 배열로 만든다 (바뀌면 화면 자동 갱신)\nconst todos = ref([])\nconst text = ref('')   // 입력창과 연결할 글자\n\n// 추가 버튼: 빈 값이면 막고, 아니면 목록에 새 객체를 넣는다\nfunction addTodo() {\n  if (text.value.trim() === '') {\n    alert('제목을 입력하세요')\n    return\n  }\n  todos.value.push({ id: Date.now(), title: text.value, done: false })\n  text.value = ''  // 입력창 비우기\n}\n\n// 삭제: 클릭한 id만 빼고 새 배열로 교체한다\nfunction removeTodo(id) {\n  todos.value = todos.value.filter(t => t.id !== id)\n}\n</script>\n\n<template>\n  <h1>나의 할 일</h1>\n  <input v-model=\"text\" @keyup.enter=\"addTodo\" placeholder=\"할 일을 입력\" />\n  <button @click=\"addTodo\">추가</button>\n\n  <ul>\n    <li v-for=\"t in todos\" :key=\"t.id\">\n      <input type=\"checkbox\" v-model=\"t.done\" />\n      <span :style=\"{ textDecoration: t.done ? 'line-through' : 'none' }\">\n        {{ t.title }}\n      </span>\n      <button @click=\"removeTodo(t.id)\">삭제</button>\n    </li>\n  </ul>\n  <p>남은 일: {{ todos.filter(t => !t.done).length }}개</p>\n</template>",
        "note": "추가·완료(체크)·삭제·남은 개수까지 한 화면에서 동작하는 완결형 예제로, 그대로 App.vue에 붙여넣으면 실행된다."
      }
    ]
  },
  "webproject-3": {
    "theory": [
      {
        "h": "개발 코드와 배포 코드는 다르다",
        "body": "개발할 때 보던 npm run dev 화면은 사람이 고치기 쉽도록 풀어쓴 코드로 돌아간다. 하지만 실제 사용자에게 보여줄 때는 속도가 중요하므로, 코드를 압축하고 불필요한 것을 빼서 가볍게 만들어야 한다. 이 작업이 '빌드'이고, 결과는 dist 폴더에 담긴다. 비유하자면, 손으로 쓴 원고(개발 코드)를 인쇄소에서 책으로 묶어내는(빌드) 것과 같다. 빌드된 dist 폴더 안의 파일만 웹에 올리면 누구나 인터넷에서 우리 서비스를 쓸 수 있다. 그래서 배포 전에는 반드시 npm run build와 npm run preview로 결과를 미리 확인한다."
      },
      {
        "h": "배포에서 자주 만나는 함정: base 경로",
        "body": "GitHub Pages처럼 주소에 /my-todo/ 같은 하위 폴더가 붙는 곳에 올리면, 화면은 뜨는데 자바스크립트와 이미지가 안 보이는 일이 흔하다. 원인은 Vite가 파일을 최상위(/) 기준으로 찾기 때문이다. vite.config.js에 base: '/my-todo/' 를 적어주면, 빌드된 파일이 올바른 폴더에서 자산을 찾아 화면이 정상 동작한다. 반대로 netlify처럼 최상위 도메인이면 base는 '/' 로 둔다. 이 한 줄을 모르면 '왜 빈 화면만 나오지?' 하고 한참 헤매게 되므로, 배포 환경에 맞춰 base를 꼭 확인하는 습관을 들이자."
      }
    ],
    "realCode": [
      {
        "title": "GitHub Actions로 Vue 앱을 자동 빌드·배포하기",
        "lang": "yaml",
        "code": "# .github/workflows/deploy.yml\nname: Deploy to GitHub Pages\non:\n  push:\n    branches: [main]   # main에 푸시될 때마다 실행\npermissions:\n  contents: write\njobs:\n  build-deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4        # 코드 내려받기\n      - uses: actions/setup-node@v4       # Node 설치\n        with:\n          node-version: 20\n      - run: npm ci                       # 의존성 설치\n      - run: npm run build                # dist 폴더 생성\n      - uses: peaceiris/actions-gh-pages@v3  # gh-pages로 배포\n        with:\n          github_token: ${{ secrets.GITHUB_TOKEN }}\n          publish_dir: ./dist             # 배포할 폴더 지정",
        "note": "이 파일을 저장소에 넣고 main에 푸시하면, 코드를 올릴 때마다 자동으로 빌드해 GitHub Pages에 배포된다."
      }
    ]
  },
  "spring-ai-1": {
    "theory": [
      {
        "h": "왜 Spring AI를 쓰나요?",
        "body": "예전에는 OpenAI를 쓰려면 OpenAI용 코드를, Anthropic을 쓰려면 또 다른 코드를 따로 짜야 했습니다. 마치 콘센트 모양이 나라마다 달라서 여행할 때 어댑터를 다 챙기는 것과 같았죠. Spring AI는 '만능 멀티탭' 역할을 합니다. 우리는 ChatClient라는 똑같은 사용법만 익히면 되고, 뒤에 꽂힌 모델이 OpenAI든 Anthropic이든 코드를 거의 바꾸지 않아도 됩니다. 그래서 나중에 더 싸거나 좋은 모델로 갈아탈 때 부담이 적습니다. Spring Boot를 이미 쓰는 회사라면 기존 방식 그대로 AI 기능을 자연스럽게 끼워 넣을 수 있다는 것도 큰 장점입니다."
      },
      {
        "h": "ChatClient는 어떻게 동작하나요?",
        "body": "ChatClient는 카페에서 주문하는 과정과 비슷합니다. prompt() 로 '주문 시작', user(\"...\") 로 '아메리카노 주세요(질문 내용)', call() 로 '주문 확정', content() 로 '완성된 음료 받기(답변 문자열)' 입니다. 이렇게 점으로 이어 쓰는 방식을 메서드 체이닝이라고 부르는데, 코드를 위에서 아래로 읽으면 흐름이 자연스럽게 보입니다. 내부적으로는 우리 질문을 인터넷 너머 LLM 서버로 보내고, 답을 받아와 문자열로 돌려줍니다. 복잡한 통신 과정을 ChatClient가 다 숨겨주기 때문에 우리는 '무엇을 묻고 무엇을 받을지'에만 집중하면 됩니다."
      }
    ],
    "realCode": [
      {
        "title": "채팅 응답 REST API 컨트롤러 (엔드투엔드)",
        "lang": "java",
        "code": "package com.example.demo;\n\nimport org.springframework.ai.chat.client.ChatClient;\nimport org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.RequestParam;\nimport org.springframework.web.bind.annotation.RestController;\n\n@RestController\npublic class ChatController {\n\n    private final ChatClient chatClient;\n\n    // ChatClient.Builder를 주입받아 ChatClient를 만든다\n    public ChatController(ChatClient.Builder builder) {\n        this.chatClient = builder\n                .defaultSystem(\"너는 친절한 한국어 도우미야.\") // 기본 말투 지정\n                .build();\n    }\n\n    @GetMapping(\"/chat\")\n    public String chat(@RequestParam String message) {\n        // 사용자의 질문(message)을 LLM에 보내고 답변 문자열을 받는다\n        return chatClient.prompt()\n                .user(message)\n                .call()\n                .content();\n    }\n}",
        "note": "주소창에 /chat?message=질문 을 넣으면 LLM 답변이 그대로 화면에 나온다. system 메시지로 말투를 미리 고정한 점이 핵심이다."
      }
    ]
  },
  "spring-ai-2": {
    "theory": [
      {
        "h": "RAG는 왜 필요한가요?",
        "body": "LLM은 똑똑하지만 우리 회사 내부 규정이나 최신 자료는 학습한 적이 없습니다. 그냥 물어보면 모르는데도 아는 척 지어내는 '환각'이 생기죠. RAG는 시험 보기 전에 '오픈북'을 허용하는 것과 같습니다. 답하기 전에 관련 문서를 먼저 찾아 LLM 앞에 펼쳐주고 '이 자료를 보고 답해'라고 시키는 겁니다. 그래서 답이 우리 자료에 근거하게 되고, 틀린 말을 지어낼 가능성이 크게 줄어듭니다. 모델을 다시 학습시키지 않고도 최신·내부 지식을 즉시 반영할 수 있다는 점이 RAG의 가장 큰 매력입니다."
      },
      {
        "h": "임베딩과 벡터 검색의 직관",
        "body": "컴퓨터는 글자의 '의미'를 모릅니다. 그래서 문장을 숫자 목록(벡터)으로 바꾸는데, 이걸 임베딩이라 합니다. 신기하게도 '강아지'와 '반려견'처럼 뜻이 비슷한 말은 숫자도 서로 가깝게 나옵니다. 마치 지도 위에서 비슷한 동네가 가까이 모여 있는 것과 같죠. 질문이 들어오면 질문도 벡터로 바꾼 뒤, 지도에서 가장 가까운 문서 조각들을 집어옵니다. 이렇게 '의미가 가까운 것'을 찾는 게 유사도 검색이고, Spring AI에서는 vectorStore.similaritySearch() 한 줄로 처리됩니다."
      }
    ],
    "realCode": [
      {
        "title": "문서 적재 + RAG 질의응답 (엔드투엔드)",
        "lang": "java",
        "code": "package com.example.demo;\n\nimport org.springframework.ai.chat.client.ChatClient;\nimport org.springframework.ai.document.Document;\nimport org.springframework.ai.vectorstore.VectorStore;\nimport org.springframework.web.bind.annotation.*;\nimport java.util.List;\nimport java.util.stream.Collectors;\n\n@RestController\npublic class RagController {\n\n    private final ChatClient chatClient;\n    private final VectorStore vectorStore;\n\n    public RagController(ChatClient.Builder builder, VectorStore vectorStore) {\n        this.chatClient = builder.build();\n        this.vectorStore = vectorStore;\n    }\n\n    @GetMapping(\"/ask\")\n    public String ask(@RequestParam String question) {\n        // 1) 질문과 의미가 가까운 문서 조각 3개를 찾는다\n        List<Document> docs = vectorStore.similaritySearch(question);\n        String context = docs.stream()\n                .map(Document::getText)\n                .collect(Collectors.joining(\"\\n---\\n\"));\n\n        // 2) 찾은 문서를 근거로 답하라고 지시한다\n        return chatClient.prompt()\n                .system(\"아래 컨텍스트에 있는 내용만 근거로 답해. 없으면 모른다고 해.\")\n                .user(\"컨텍스트:\\n\" + context + \"\\n\\n질문: \" + question)\n                .call()\n                .content();\n    }\n}",
        "note": "유사 문서를 먼저 찾아(context) 프롬프트에 끼워 넣는 것이 RAG의 전부다. '없으면 모른다고 해' 지시가 환각을 막는 안전장치다."
      }
    ]
  },
  "spring-ai-3": {
    "theory": [
      {
        "h": "Function Calling은 왜 강력한가요?",
        "body": "LLM은 글은 잘 쓰지만 실시간 날씨나 우리 DB의 재고 같은 건 모릅니다. Function Calling은 LLM에게 '도구 상자'를 쥐여주는 것과 같습니다. 우리가 '날씨조회'라는 도구를 만들어 설명을 달아두면, 사용자가 '서울 날씨 어때?'라고 물었을 때 LLM이 스스로 '아, 이건 날씨조회 도구를 써야겠다'고 판단해 그 함수를 호출합니다. 그러면 우리 코드가 실제 값을 구해 LLM에게 돌려주고, LLM은 그 값을 자연스러운 문장으로 풀어 답합니다. 즉 LLM은 '판단과 말솜씨'를, 우리 코드는 '실제 행동'을 맡는 역할 분담이 일어나는 것입니다. 이것이 AI 비서나 에이전트의 핵심 원리입니다."
      },
      {
        "h": "구조화 출력이 실무에서 중요한 이유",
        "body": "AI 답변을 화면에 그냥 보여줄 때는 글자면 충분하지만, 그 값을 DB에 저장하거나 다른 시스템에 넘기려면 정해진 모양이 필요합니다. 예를 들어 이력서를 분석해 {이름, 경력연수, 기술목록} 형태로 받고 싶다고 합시다. 구조화 출력은 LLM에게 '이 양식 칸에 맞춰 채워줘'라고 시키고, Spring AI가 그 답을 자바 객체로 자동 변환해 줍니다. .entity(이력서.class) 한 줄이면 끝이죠. 덕분에 우리는 answer.이름() 처럼 코드에서 바로 꺼내 쓸 수 있어, AI를 단순 채팅이 아니라 '데이터를 만들어내는 부품'으로 서비스에 끼워 넣을 수 있습니다."
      }
    ],
    "realCode": [
      {
        "title": "날씨 Tool 정의 + 등록 + LLM 연동 (엔드투엔드)",
        "lang": "java",
        "code": "package com.example.demo;\n\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.context.annotation.Description;\nimport java.util.Map;\nimport java.util.function.Function;\n\n@Configuration\npublic class ToolConfig {\n\n    // LLM에게 넘길 입력/출력 모양 정의\n    public record WeatherReq(String city) {}\n    public record WeatherRes(String city, String desc, int temp) {}\n\n    // @Description: LLM이 '언제 이 도구를 쓸지' 판단하는 근거\n    @Bean\n    @Description(\"도시 이름을 받아 현재 날씨를 알려준다\")\n    public Function<WeatherReq, WeatherRes> currentWeather() {\n        Map<String, WeatherRes> db = Map.of(\n            \"서울\", new WeatherRes(\"서울\", \"맑음\", 24),\n            \"부산\", new WeatherRes(\"부산\", \"흐림\", 21)\n        );\n        // 없는 도시는 기본값 반환\n        return req -> db.getOrDefault(req.city(),\n                new WeatherRes(req.city(), \"정보없음\", 0));\n    }\n}",
        "note": "함수에 @Description만 달아 @Bean으로 등록하면 LLM이 알아서 호출 시점을 판단한다. 학습용으로 실제 API 대신 Map을 썼다."
      },
      {
        "title": "Tool을 사용하는 컨트롤러",
        "lang": "java",
        "code": "@RestController\npublic class AssistantController {\n\n    private final ChatClient chatClient;\n\n    public AssistantController(ChatClient.Builder builder) {\n        this.chatClient = builder.build();\n    }\n\n    @GetMapping(\"/assistant\")\n    public String assistant(@RequestParam String message) {\n        return chatClient.prompt()\n                .user(message)\n                .tools(\"currentWeather\") // 사용 가능한 도구 등록\n                .call()\n                .content();\n    }\n}",
        "note": ".tools(\"currentWeather\")로 도구를 알려주면, '서울 날씨 어때?' 질문에 LLM이 도구를 호출해 답한다."
      }
    ]
  },
  "sllm-1": {
    "theory": [
      {
        "h": "큰 모델 vs 작은 모델, 무엇을 고를까",
        "body": "GPT-4 같은 대형 LLM은 똑똑하지만 마치 대형 트럭처럼 연료(비용)도 많이 들고 외부 서버를 거쳐야 합니다. 반면 sLLM은 경차에 가깝습니다. 멀리 못 가도 동네 마실에는 충분하고 주차(설치)도 쉽습니다. 회사 내부 문서처럼 외부로 내보내면 안 되는 데이터는 작은 모델을 내 컴퓨터에서 돌리는 편이 안전하고 빠릅니다. 모든 일에 대형 모델이 필요한 건 아니며, 분류·요약·간단 응답 같은 정해진 업무는 sLLM으로 충분한 경우가 많습니다. 그래서 실무에서는 '일의 난이도에 맞춰 모델 크기를 고르는' 감각이 중요합니다."
      },
      {
        "h": "양자화가 메모리를 줄이는 원리",
        "body": "모델의 파라미터는 원래 소수점을 아주 정밀하게(32비트) 저장합니다. 그런데 사진을 고화질에서 적당한 화질로 줄여도 알아보는 데 큰 지장이 없듯, 숫자의 정밀도를 4비트로 낮춰도 모델 성능은 크게 떨어지지 않습니다. 정밀도를 1/8로 줄이면 용량과 메모리도 비슷한 비율로 줄어듭니다. 덕분에 원래 16GB 메모리가 필요하던 모델을 4~5GB 수준으로 줄여 일반 노트북에서도 실행할 수 있게 됩니다. Ollama가 내려받는 모델 대부분은 이미 이렇게 양자화되어 있습니다."
      }
    ],
    "realCode": [
      {
        "title": "Ollama 로컬 서버에 파이썬으로 대화 챗봇 붙이기",
        "lang": "python",
        "code": "import requests  # HTTP 요청 라이브러리\n\nOLLAMA_URL = \"http://localhost:11434/api/generate\"  # 로컬 Ollama 주소\nMODEL = \"qwen2.5:0.5b\"  # 미리 ollama pull 해둔 소형 모델\nSYSTEM = \"너는 친절한 한국어 비서야. 답변은 2~3문장으로 짧게 해줘.\"\n\ndef ask(question: str) -> str:\n    prompt = f\"{SYSTEM}\\n\\n질문: {question}\\n답변:\"  # 역할 지시 + 질문 합치기\n    payload = {\"model\": MODEL, \"prompt\": prompt, \"stream\": False}  # stream=False면 한 번에 받음\n    res = requests.post(OLLAMA_URL, json=payload, timeout=120)\n    res.raise_for_status()  # 오류 응답이면 예외 발생\n    return res.json()[\"response\"].strip()  # JSON에서 답변 텍스트만 추출\n\nprint(\"챗봇 시작! (종료하려면 '종료' 입력)\")\nwhile True:\n    user = input(\"나: \")\n    if user.strip() == \"종료\":\n        print(\"챗봇: 안녕히 가세요!\")\n        break\n    print(\"챗봇:\", ask(user))  # 모델 답변 출력",
        "note": "Ollama가 켜져 있으면 별도 API 키 없이 내 PC 안에서 무료로 도는 대화 챗봇이 됩니다."
      }
    ]
  },
  "sllm-2": {
    "theory": [
      {
        "h": "왜 전체가 아니라 일부만 학습할까 (LoRA의 직관)",
        "body": "70억 개 파라미터를 전부 다시 학습하려면 엄청난 GPU와 시간이 필요합니다. 그런데 잘 만들어진 책에 형광펜으로 핵심만 칠하고 여백에 메모를 다는 것만으로도 내 용도에 맞게 활용할 수 있듯, LoRA는 원본 모델은 그대로 얼려두고 아주 작은 보조 메모지(저랭크 행렬)만 새로 학습합니다. 학습할 숫자가 전체의 1% 미만으로 줄어들기 때문에 일반 GPU 한 장으로도 가능하고, 결과물인 어댑터는 수 MB로 작아 여러 개를 갈아 끼우며 쓸 수 있습니다. 같은 원본 모델에 '고객상담용 메모', '코딩도우미용 메모'를 따로 만들어 상황에 맞게 교체하는 식입니다."
      },
      {
        "h": "데이터가 모델 품질을 좌우한다",
        "body": "파인튜닝의 성패는 코드보다 데이터에서 갈립니다. 모델은 우리가 준 '지시-답변' 예시를 그대로 흉내 내도록 배우기 때문에, 답변 예시가 엉성하면 엉성하게, 일관되면 일관되게 배웁니다. 그래서 개수를 무작정 늘리기보다, 형식(말투·길이·구조)이 통일되고 오타·모순이 없는 깔끔한 예시를 만드는 것이 중요합니다. 처음에는 20~50개의 양질의 예시로 시작해 결과를 보고 부족한 유형을 보충해 나가는 방식이 효율적입니다. 좋은 교재로 가르치면 학생이 잘 배우는 것과 똑같은 이치입니다."
      }
    ],
    "realCode": [
      {
        "title": "QLoRA로 소형 LLM을 instruction 데이터로 파인튜닝하기 (Colab)",
        "lang": "python",
        "code": "from datasets import load_dataset\nfrom transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig\nfrom peft import LoraConfig\nfrom trl import SFTTrainer, SFTConfig\nimport torch\n\nMODEL = \"Qwen/Qwen2.5-0.5B\"  # 작고 한국어가 되는 베이스 모델\n\n# 1) 4비트 양자화 설정 (작은 GPU에서도 학습 가능)\nbnb = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_compute_dtype=torch.float16)\ntok = AutoTokenizer.from_pretrained(MODEL)\nmodel = AutoModelForCausalLM.from_pretrained(MODEL, quantization_config=bnb, device_map=\"auto\")\n\n# 2) 내 instruction 데이터 불러오기 (JSONL: instruction, output 열)\nds = load_dataset(\"json\", data_files=\"train.jsonl\", split=\"train\")\n\ndef to_text(ex):  # 지시-답변을 한 덩어리 학습 문장으로 합치기\n    return {\"text\": f\"### 지시:\\n{ex['instruction']}\\n\\n### 답변:\\n{ex['output']}\"}\nds = ds.map(to_text)\n\n# 3) LoRA 설정: 일부 작은 행렬만 학습\nlora = LoraConfig(r=8, lora_alpha=16, lora_dropout=0.05,\n                  target_modules=[\"q_proj\", \"v_proj\"], task_type=\"CAUSAL_LM\")\n\n# 4) 학습 실행\ncfg = SFTConfig(output_dir=\"out\", num_train_epochs=3, per_device_train_batch_size=2,\n                learning_rate=2e-4, logging_steps=5, dataset_text_field=\"text\")\ntrainer = SFTTrainer(model=model, train_dataset=ds, peft_config=lora, args=cfg)\ntrainer.train()  # loss가 내려가면 학습이 되는 중\ntrainer.model.save_pretrained(\"my-lora\")  # LoRA 어댑터 저장",
        "note": "베이스 모델을 4비트로 올리고 q_proj·v_proj만 LoRA로 학습해, Colab 무료 T4 GPU에서도 끝까지 돌아갑니다."
      },
      {
        "title": "학습한 LoRA 어댑터 불러와 추론하기",
        "lang": "python",
        "code": "from transformers import AutoModelForCausalLM, AutoTokenizer\nfrom peft import PeftModel\n\nBASE = \"Qwen/Qwen2.5-0.5B\"\ntok = AutoTokenizer.from_pretrained(BASE)\nbase = AutoModelForCausalLM.from_pretrained(BASE, device_map=\"auto\")\n\n# 원본 모델 위에 내가 학습한 어댑터를 얹는다\nmodel = PeftModel.from_pretrained(base, \"my-lora\")\n\nprompt = \"### 지시:\\n우리 회사 환불 정책을 안내해줘\\n\\n### 답변:\\n\"\nins = tok(prompt, return_tensors=\"pt\").to(model.device)\nout = model.generate(**ins, max_new_tokens=120)  # 답변 생성\nprint(tok.decode(out[0], skip_special_tokens=True))  # 학습된 말투로 답변",
        "note": "PeftModel.from_pretrained로 베이스 모델에 어댑터만 얹어, 파인튜닝 효과를 바로 확인합니다."
      }
    ]
  },
  "ml-dl-1": {
    "theory": [
      {
        "h": "머신러닝은 '예시로 배우는 학생'이다",
        "body": "전통 프로그래밍은 사람이 '이럴 땐 이렇게 하라'는 규칙을 전부 코드로 적는다. 하지만 고양이 사진을 알아보는 규칙을 글로 다 적는 건 불가능에 가깝다. 머신러닝은 대신 고양이 사진을 잔뜩 보여주고 '이게 고양이야'라고 알려주면, 모델이 공통된 특징을 스스로 익힌다. 마치 단어 카드를 반복해 보며 외우는 학생과 같다. 학생이 잘 배웠는지는 새로운 문제(시험)로 확인해야 한다. 그래서 우리는 데이터를 공부용과 시험용으로 나눈다."
      },
      {
        "h": "과적합은 '시험 문제만 통째로 외운 학생'이다",
        "body": "어떤 학생이 기출문제 답을 통째로 외우면 그 시험은 100점을 받는다. 하지만 조금만 바뀐 새 문제가 나오면 전혀 못 푼다. 모델도 똑같다. 학습 데이터에 너무 딱 맞추면(과적합) 새 데이터에서 성능이 뚝 떨어진다. 반대로 너무 대충 배우면(과소적합) 공부한 것조차 못 푼다. 좋은 모델은 그 사이 균형을 잡아, 본 적 없는 데이터에도 잘 일반화된다. 분할된 시험용 데이터의 점수가 바로 이 일반화 능력을 보여준다."
      }
    ],
    "realCode": [
      {
        "title": "End-to-End: 데이터 적재부터 분류·평가까지 한 번에",
        "lang": "python",
        "code": "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score, classification_report, confusion_matrix\n\n# 1) 데이터 불러오기 (꽃잎/꽃받침 길이로 품종 3종 분류)\niris = load_iris()\nX, y = iris.data, iris.target\n\n# 2) 공부용 70% / 시험용 30% 로 분할 (random_state로 결과 고정)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.3, random_state=42, stratify=y)\n\n# 3) 랜덤포레스트: 결정트리 여러 개의 다수결 모델\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)  # 학습\n\n# 4) 예측과 평가\npred = model.predict(X_test)\nprint('정확도:', round(accuracy_score(y_test, pred), 3))\nprint('혼동행렬:\\n', confusion_matrix(y_test, pred))\nprint(classification_report(y_test, pred, target_names=iris.target_names))\n\n# 5) 어떤 특징이 중요했는지 확인\nfor name, imp in zip(iris.feature_names, model.feature_importances_):\n    print(f'{name}: {imp:.3f}')",
        "note": "데이터 분할 → 학습 → 예측 → 평가 → 특징 중요도까지, 실제 분류 프로젝트의 한 사이클을 그대로 담았다."
      }
    ]
  },
  "ml-dl-2": {
    "theory": [
      {
        "h": "신경망은 '다이얼을 돌려 답을 맞추는 기계'다",
        "body": "신경망 안에는 가중치라는 수많은 다이얼(조절 손잡이)이 있다. 처음엔 다이얼이 아무렇게나 맞춰져 있어 엉뚱한 답을 낸다. 정답과 비교해 얼마나 틀렸는지(손실)를 재고, 그 오차를 줄이는 방향으로 다이얼을 아주 조금씩 돌린다. 이 과정을 수천 번 반복하면 다이얼들이 점점 좋은 위치로 맞춰져 정답을 잘 맞히게 된다. 옵티마이저는 다이얼을 어느 방향으로 얼마나 돌릴지 정해주는 역할을 한다."
      },
      {
        "h": "역전파는 '책임을 거꾸로 나누는 회의'다",
        "body": "축구팀이 한 골을 먹었다고 하자. 감독은 실점의 책임을 수비, 미드필더, 골키퍼에게 기여한 만큼 나눠 알려준다. 신경망의 역전파도 똑같다. 최종 오차가 났을 때, 그 오차에 각 가중치가 얼마나 기여했는지를 미분(기울기)으로 계산해 거꾸로 전달한다. 책임을 많이 진 가중치는 많이, 적게 진 가중치는 조금 조정된다. PyTorch 에서는 loss.backward() 한 줄이 이 복잡한 계산을 자동으로 해준다."
      }
    ],
    "realCode": [
      {
        "title": "End-to-End: MNIST 분류 신경망 학습과 평가",
        "lang": "python",
        "code": "import torch\nfrom torch import nn, optim\nfrom torchvision import datasets, transforms\nfrom torch.utils.data import DataLoader\n\n# 1) 데이터: 28x28 손글씨 숫자 이미지\ntf = transforms.ToTensor()\ntrain_ds = datasets.MNIST('.', train=True, download=True, transform=tf)\ntest_ds  = datasets.MNIST('.', train=False, download=True, transform=tf)\ntrain_dl = DataLoader(train_ds, batch_size=64, shuffle=True)\ntest_dl  = DataLoader(test_ds, batch_size=1000)\n\n# 2) 모델: 입력 784 → 은닉 128 → 출력 10(숫자 0~9)\nmodel = nn.Sequential(nn.Flatten(), nn.Linear(784,128), nn.ReLU(), nn.Linear(128,10))\nloss_fn = nn.CrossEntropyLoss()       # 분류용 오답 점수\nopt = optim.Adam(model.parameters(), lr=0.001)\n\n# 3) 학습 루프 (3 에폭)\nfor epoch in range(3):\n    total = 0\n    for x, y in train_dl:\n        opt.zero_grad()               # 이전 기울기 초기화\n        loss = loss_fn(model(x), y)   # 순전파 + 오차 계산\n        loss.backward()               # 역전파(기울기 계산)\n        opt.step()                    # 가중치 갱신\n        total += loss.item()\n    print(f'epoch {epoch+1} 평균손실 {total/len(train_dl):.4f}')\n\n# 4) 테스트 정확도\ncorrect = 0\nwith torch.no_grad():\n    for x, y in test_dl:\n        correct += (model(x).argmax(1) == y).sum().item()\nprint('테스트 정확도:', correct/len(test_ds))",
        "note": "데이터 로딩 → 모델 정의 → 학습 루프(forward/backward/step) → 정확도 측정까지, PyTorch 학습의 표준 골격이다."
      }
    ]
  },
  "ml-dl-3": {
    "theory": [
      {
        "h": "CNN 은 '돋보기로 그림을 훑는 사람'이다",
        "body": "사람이 큰 그림을 볼 때 한 번에 전체를 외우기보다, 돋보기로 부분부분을 보며 '여기 모서리가 있네, 여기 동그라미가 있네' 하고 특징을 모은다. CNN 도 작은 필터를 이미지 위에서 움직이며 모서리·색·무늬 같은 작은 특징을 먼저 잡고, 그것들을 모아 점점 더 큰 의미(눈, 얼굴, 고양이)를 만든다. 그래서 픽셀을 통째로 펴서 보는 일반 신경망보다 이미지에서 훨씬 효율적이다. 위치가 조금 바뀌어도 같은 특징을 잘 찾는 장점도 있다."
      },
      {
        "h": "전이학습은 '졸업생을 신입 교육시키는 것'이다",
        "body": "백지 상태의 신입을 처음부터 가르치려면 시간과 데이터가 엄청 많이 든다. 대신 이미 많은 경험을 쌓은 졸업생을 데려와 우리 회사 업무만 며칠 교육하면 금방 잘한다. 전이학습이 바로 이것이다. 수백만 장의 이미지로 이미 '보는 법'을 배운 모델(예: ResNet)을 가져와, 마지막 판단층만 우리 데이터에 맞게 다시 학습한다. 덕분에 데이터가 적고 시간이 짧아도 높은 성능을 얻을 수 있어, 실무에서 가장 자주 쓰는 기법이다."
      }
    ],
    "realCode": [
      {
        "title": "End-to-End: 전이학습 + 드롭아웃으로 이미지 분류",
        "lang": "python",
        "code": "import torch\nfrom torch import nn, optim\nfrom torchvision import models, datasets, transforms\nfrom torch.utils.data import DataLoader\n\n# 1) 데이터 증강 + 정규화\ntf = transforms.Compose([\n    transforms.Resize(224),\n    transforms.RandomHorizontalFlip(),     # 좌우 뒤집기로 데이터 부풀리기\n    transforms.ToTensor(),\n    transforms.Normalize([0.5]*3, [0.5]*3)])\ntrain = datasets.CIFAR10('.', train=True, download=True, transform=tf)\ndl = DataLoader(train, batch_size=32, shuffle=True)\n\n# 2) 사전학습 ResNet18 불러와 마지막 층 교체\nmodel = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)\nfor p in model.parameters():\n    p.requires_grad = False            # 특징 추출부는 얼린다(freeze)\nmodel.fc = nn.Sequential(\n    nn.Dropout(0.3),                   # 과적합 방지\n    nn.Linear(model.fc.in_features, 10))\n\n# 3) 마지막 층만 학습\nloss_fn = nn.CrossEntropyLoss()\nopt = optim.Adam(model.fc.parameters(), lr=0.001)\nfor epoch in range(2):\n    total = 0\n    for x, y in dl:\n        opt.zero_grad()\n        loss = loss_fn(model(x), y)\n        loss.backward()\n        opt.step()\n        total += loss.item()\n    print(f'epoch {epoch+1} loss {total/len(dl):.4f}')\nprint('전이학습 학습 완료')",
        "note": "사전학습 모델을 가져와 backbone을 얼리고 마지막 층만 교체·학습하는, 실무 전이학습의 전형적인 패턴이다."
      }
    ]
  },
  "feature-1": {
    "theory": [
      {
        "h": "데이터는 재료, 피처 엔지니어링은 손질",
        "body": "아무리 좋은 칼(모델)이 있어도 재료가 흙투성이면 좋은 요리가 안 나온다. 머신러닝도 똑같아서, 같은 알고리즘이라도 입력 데이터를 어떻게 다듬느냐에 따라 성능이 크게 갈린다. 실제 현업에서 모델 정확도를 끌어올리는 가장 빠른 길은 더 복잡한 모델을 쓰는 것이 아니라 데이터를 잘 손질하는 것인 경우가 많다. 결측치를 채우고, 글자를 숫자로 바꾸고, 숨은 정보를 새 컬럼으로 꺼내는 이 모든 과정이 피처 엔지니어링이다. 그래서 '데이터 과학자는 시간의 80%를 데이터 손질에 쓴다'는 말이 있다."
      },
      {
        "h": "왜 숫자의 크기를 맞춰야 할까 (스케일링)",
        "body": "키를 cm로 재면 170쯤 되고, 몸무게를 kg로 재면 65쯤 된다. 그런데 어떤 모델은 숫자가 큰 쪽을 더 중요하다고 착각한다. 마치 목소리 큰 사람 말만 듣는 것과 같다. 그래서 모든 피처를 비슷한 크기 범위(예: 0~1)로 맞춰주면 모델이 공평하게 정보를 듣게 된다. 거리 기반 모델(KNN)이나 경사하강법을 쓰는 모델에서 특히 효과가 크다. 반대로 트리 기반 모델(랜덤포레스트)은 크기에 둔감해서 스케일링이 덜 중요하다는 점도 알아두면 좋다."
      },
      {
        "h": "글자를 숫자로: 인코딩의 함정",
        "body": "컴퓨터는 '서울', '부산' 같은 글자를 직접 계산하지 못한다. 그래서 숫자로 바꿔야 하는데, 단순히 서울=1, 부산=2 로 매기면 모델이 '부산이 서울보다 2배 크다'고 오해할 수 있다. 순서가 없는 항목은 이런 오해를 막기 위해 각 항목마다 0/1 칸을 따로 만드는 원-핫 인코딩을 쓴다. 항목 종류가 너무 많을 때는 타깃 인코딩처럼 평균값으로 바꾸는 방법을 쓰기도 한다. 어떤 인코딩을 쓰느냐가 성능을 좌우하는 작은 결정이 된다."
      }
    ],
    "realCode": [
      {
        "title": "엔드투엔드: 결측치→인코딩→파생피처→성능 비교 파이프라인",
        "lang": "python",
        "code": "import pandas as pd, seaborn as sns\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\ndf = sns.load_dataset('titanic')          # 타이타닉 데이터 적재\ny = df['survived']\n\n# 1) 가공 전: 숫자 컬럼만 대충 사용\nX_before = df[['pclass','age','fare','sibsp','parch']].fillna(0)\nXtr, Xte, ytr, yte = train_test_split(X_before, y, test_size=0.2, random_state=42)\nm1 = RandomForestClassifier(random_state=42).fit(Xtr, ytr)\nacc_before = accuracy_score(yte, m1.predict(Xte))\n\n# 2) 가공 후: 손질 + 파생 피처\nd = df.copy()\nd['age'] = d['age'].fillna(d['age'].median())          # 결측치를 중앙값으로\nd['embarked'] = d['embarked'].fillna(d['embarked'].mode()[0])\nd['family_size'] = d['sibsp'] + d['parch'] + 1           # 파생: 가족 수\nd['is_alone'] = (d['family_size'] == 1).astype(int)      # 파생: 혼자 탑승\nd = pd.get_dummies(d[['pclass','age','fare','family_size',\n                      'is_alone','sex','embarked']])      # 글자→숫자\nXtr, Xte, ytr, yte = train_test_split(d, y, test_size=0.2, random_state=42)\nm2 = RandomForestClassifier(random_state=42).fit(Xtr, ytr)\nacc_after = accuracy_score(yte, m2.predict(Xte))\n\nprint(f'가공 전 정확도: {acc_before:.3f}')\nprint(f'가공 후 정확도: {acc_after:.3f}')",
        "note": "같은 모델·같은 분할이지만 결측치 처리와 파생 피처만 추가했을 뿐인데 정확도가 오르는 것을 직접 확인하는 코드다."
      }
    ]
  },
  "modeldev-1": {
    "theory": [
      {
        "h": "왜 데이터를 나눠야 하나요?",
        "body": "시험 문제를 미리 보고 시험을 치면 100점이 나오지만 그게 진짜 실력은 아닙니다. 모델도 똑같습니다. 학습에 쓴 데이터로 점수를 매기면 무조건 높게 나옵니다. 그래서 데이터를 학습용과 테스트용으로 갈라, 모델이 한 번도 보지 못한 테스트용으로 점수를 재야 합니다. 보통 8:2 정도로 나눕니다. 여기에 모델을 고치는 동안 참고할 검증용까지 두면 더 안전합니다."
      },
      {
        "h": "교차검증은 왜 더 믿을 만한가요?",
        "body": "데이터를 한 번만 나누면 어쩌다 쉬운 문제만 테스트에 들어가 운 좋게 점수가 높을 수 있습니다. 교차검증은 데이터를 5조각으로 나눈 뒤, 한 조각씩 돌아가며 시험을 보고 나머지로 공부하는 방식입니다. 5번 시험 본 점수를 평균 내면 운의 영향이 줄어 더 믿을 만한 실력이 됩니다. 마치 한 번의 모의고사가 아니라 다섯 번 평균을 보는 것과 같습니다."
      },
      {
        "h": "베이스라인부터 만드는 이유",
        "body": "처음부터 화려한 모델에 매달리면, 정작 그 노력이 효과가 있었는지 알 수가 없습니다. 그래서 가장 단순한 모델을 먼저 만들어 '기준 점수'를 정합니다. 이후 어떤 개선을 하든 이 기준과 비교해 '진짜 좋아졌는지'를 판단합니다. 베이스라인은 등산의 베이스캠프 같은 출발 지점입니다."
      }
    ],
    "realCode": [
      {
        "title": "데이터 적재부터 베이스라인 평가까지 한 흐름",
        "lang": "python",
        "code": "import pandas as pd\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split, cross_val_score\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\n\n# 1) 데이터 불러오기 (X=입력 특징, y=정답 0/1)\ndata = load_breast_cancer()\nX, y = data.data, data.target\n\n# 2) 학습용 8 : 테스트용 2 로 분할 (stratify로 정답비율 유지)\nX_tr, X_te, y_tr, y_te = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\n\n# 3) 스케일링 + 로지스틱회귀를 파이프라인으로 묶기\npipe = Pipeline([\n    ('scaler', StandardScaler()),          # 값의 크기를 비슷하게 맞춤\n    ('clf', LogisticRegression(max_iter=1000))\n])\n\n# 4) 교차검증으로 안정적인 평균 점수 측정\ncv = cross_val_score(pipe, X_tr, y_tr, cv=5, scoring='accuracy')\nprint('교차검증 평균:', round(cv.mean(), 4))\n\n# 5) 전체 학습 후 테스트 점수 확인\npipe.fit(X_tr, y_tr)\nprint('테스트 정확도:', round(accuracy_score(y_te, pipe.predict(X_te)), 4))",
        "note": "분할-파이프라인-교차검증-테스트로 이어지는 표준 흐름이며, 교차검증 점수와 테스트 점수가 비슷하면 과적합이 적다는 뜻입니다."
      }
    ]
  },
  "modeldev-2": {
    "theory": [
      {
        "h": "하이퍼파라미터 튜닝이란?",
        "body": "모델에는 학습으로 저절로 정해지는 값도 있지만, 사람이 미리 정해줘야 하는 '설정 다이얼'도 있습니다. 예를 들어 결정트리의 깊이를 얼마나 깊게 할지 같은 것입니다. 이 다이얼을 어떻게 맞추느냐에 따라 점수가 크게 달라집니다. 손으로 하나씩 돌려보긴 힘드니, GridSearch는 정해둔 후보를 전부 자동으로 시험해 가장 좋은 조합을 찾아줍니다. 라디오 주파수를 가장 잘 들리는 곳에 맞추는 것과 비슷합니다."
      },
      {
        "h": "과적합을 막는 두 가지 브레이크",
        "body": "모델이 학습데이터를 통째로 외워버리면 새 데이터에서 점수가 뚝 떨어집니다. 이를 막는 첫 번째 브레이크가 정규화로, 모델이 지나치게 복잡해지면 벌점을 줘 단순하게 유지합니다. 두 번째는 조기종료로, 검증 점수가 더 이상 오르지 않으면 학습을 그만 멈춥니다. 둘 다 '적당히 공부하고 멈추자'는 안전장치입니다."
      },
      {
        "h": "앙상블, 여럿이 모이면 똑똑해진다",
        "body": "한 사람의 판단보다 여러 사람의 의견을 모으면 더 정확할 때가 많습니다. 앙상블도 마찬가지로 여러 모델의 예측을 합칩니다. 배깅은 여러 모델을 동시에 만들어 다수결하고(랜덤포레스트), 부스팅은 앞 모델이 틀린 부분을 뒤 모델이 집중해서 고쳐 나갑니다. 그래서 보통 단일 모델보다 점수가 높습니다."
      }
    ],
    "realCode": [
      {
        "title": "GridSearch 튜닝 후 베이스라인과 성능 비교",
        "lang": "python",
        "code": "import pandas as pd\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split, GridSearchCV\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\n\nX, y = load_breast_cancer(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\n\n# 1) 베이스라인(어제 모델) 점수\nbase = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)\nbase_acc = accuracy_score(y_te, base.predict(X_te))\n\n# 2) 랜덤포레스트 하이퍼파라미터 탐색\nparam_grid = {'n_estimators': [100, 300], 'max_depth': [None, 5, 10]}\ngrid = GridSearchCV(RandomForestClassifier(random_state=42),\n                    param_grid, cv=5, scoring='accuracy', n_jobs=-1)\ngrid.fit(X_tr, y_tr)\nbest = grid.best_estimator_\ntuned_acc = accuracy_score(y_te, best.predict(X_te))\n\n# 3) 두 점수를 표로 비교\nprint('최적 파라미터:', grid.best_params_)\nprint(pd.DataFrame({'model': ['baseline', 'tuned_rf'],\n                    'test_acc': [round(base_acc, 4), round(tuned_acc, 4)]}))",
        "note": "베이스라인과 튜닝 모델을 같은 분할로 비교해, 튜닝이 실제로 점수를 올렸는지 한눈에 확인하는 실전 패턴입니다."
      }
    ]
  },
  "rag-1": {
    "theory": [
      {
        "h": "LLM은 똑똑한데 왜 자꾸 틀릴까?",
        "body": "LLM은 학습한 시점까지의 지식만 머릿속에 가지고 있어서, 우리 회사 내부 문서나 최신 정보는 알지 못합니다. 마치 아주 책을 많이 읽은 사람이지만 오늘 아침 사내 공지는 보지 못한 것과 같습니다. 그래서 모르는 것도 아는 척 지어내는 환각이 생깁니다. RAG는 이 사람에게 질문과 함께 '참고 자료'를 손에 쥐여 주는 방식입니다. 자료를 보고 답하니 훨씬 정확해지고, 출처도 댈 수 있습니다."
      },
      {
        "h": "RAG 파이프라인은 요리 과정과 같다",
        "body": "RAG는 크게 두 단계로 나뉩니다. 첫째는 미리 재료를 손질해 냉장고에 정리해 두는 '인덱싱' 단계입니다. 문서를 불러와 조각으로 자르고, 숫자(임베딩)로 바꿔 벡터DB에 저장합니다. 둘째는 주문이 들어오면 냉장고에서 필요한 재료를 꺼내 요리하는 '검색·생성' 단계입니다. 오늘은 첫 번째, 재료를 손질해 정리하는 인덱싱에 집중합니다. 정리를 잘해 둬야 나중에 빠르고 정확하게 꺼낼 수 있습니다."
      },
      {
        "h": "조각을 너무 크게도 작게도 자르지 마라",
        "body": "문서를 조각낼 때 조각이 너무 크면 한 조각에 여러 주제가 섞여 검색이 부정확해지고, 너무 작으면 문맥이 끊겨 의미를 잃습니다. 보통 300~800자 정도로 자르고, 조각끼리 약간 겹치게(overlap) 해서 경계에서 문장이 잘려도 의미가 이어지게 합니다. 책을 단락 단위로 정리하되 앞 문장 한 줄을 같이 복사해 두는 것과 비슷합니다."
      }
    ],
    "realCode": [
      {
        "title": "PDF → 청킹 → 임베딩 → 벡터DB 저장 엔드투엔드",
        "lang": "python",
        "code": "from langchain_community.document_loaders import PyPDFLoader\nfrom langchain.text_splitter import RecursiveCharacterTextSplitter\nfrom langchain_community.embeddings import HuggingFaceEmbeddings\nfrom langchain_community.vectorstores import Chroma\n\n# 1) 문서 로딩: PDF를 페이지 단위로 읽는다\nloader = PyPDFLoader(\"docs/manual.pdf\")\npages = loader.load()\nprint(\"페이지 수:\", len(pages))\n\n# 2) 청킹: 500자 조각, 50자 겹침으로 나눈다\nsplitter = RecursiveCharacterTextSplitter(\n    chunk_size=500, chunk_overlap=50)\nchunks = splitter.split_documents(pages)\nprint(\"조각 수:\", len(chunks))\n\n# 3) 임베딩 함수 준비 (한국어/영어 모두 무난한 소형 모델)\nembed = HuggingFaceEmbeddings(\n    model_name=\"sentence-transformers/all-MiniLM-L6-v2\")\n\n# 4) 벡터DB에 저장하고 디스크에 보관\ndb = Chroma.from_documents(\n    chunks, embed, persist_directory=\"./db\")\ndb.persist()\n\n# 5) 잘 들어갔는지 검색으로 확인\nfor doc in db.similarity_search(\"환불 정책\", k=2):\n    page = doc.metadata.get(\"page\")\n    print(f\"[p.{page}]\", doc.page_content[:80])",
        "note": "문서를 읽어 조각내고 숫자로 바꿔 저장하는 인덱싱 전 과정을 한 파일에 담았으며, 마지막에 검색까지 해서 색인이 제대로 됐는지 확인합니다."
      }
    ]
  },
  "rag-2": {
    "theory": [
      {
        "h": "검색기는 비서, LLM은 작가다",
        "body": "RAG에서 일은 둘이 나눠 합니다. 검색기(Retriever)는 질문을 듣고 서고에서 관련 서류를 찾아오는 비서이고, LLM은 그 서류를 읽고 매끄러운 문장으로 답을 써 주는 작가입니다. 비서가 엉뚱한 서류를 가져오면 아무리 뛰어난 작가도 좋은 답을 쓸 수 없습니다. 그래서 검색 품질이 RAG 전체 품질을 좌우합니다. 오늘은 이 비서를 똑똑하게 만드는 데 집중합니다."
      },
      {
        "h": "키워드와 의미, 둘 다 잡는 하이브리드",
        "body": "벡터 검색은 의미가 비슷한 걸 잘 찾지만, '모델명 X-200' 같은 정확한 고유명사나 숫자는 놓치기 쉽습니다. 반대로 키워드 검색(BM25)은 단어가 똑같이 겹치는 걸 잘 찾지만 표현이 다르면 못 찾습니다. 두 방식을 함께 쓰면 서로의 약점을 메웁니다. 정확한 단어도 잡고, 비슷한 의미도 잡는 것입니다. 면접관 두 명이 각자 다른 기준으로 평가한 뒤 점수를 합치는 것과 같습니다."
      },
      {
        "h": "넉넉히 뽑고 정밀하게 거른다",
        "body": "처음부터 딱 3개만 정확히 찾기는 어렵습니다. 그래서 보통 1차로 20개쯤 넉넉히 가져온 뒤, 재순위 모델(Cross-Encoder)로 질문과 각 조각을 한 쌍씩 꼼꼼히 비교해 점수를 다시 매기고, 상위 3개만 LLM에 넘깁니다. 1차 검색은 빠르지만 거칠고, 재순위는 느리지만 정밀합니다. 예선에서 많이 뽑고 본선에서 정밀 심사하는 것과 같은 2단계 전략입니다."
      }
    ],
    "realCode": [
      {
        "title": "검색 + 컨텍스트 결합 + 출처 인용 QA 함수",
        "lang": "python",
        "code": "from langchain_community.vectorstores import Chroma\nfrom langchain_community.embeddings import HuggingFaceEmbeddings\nfrom langchain_openai import ChatOpenAI\nfrom langchain.prompts import ChatPromptTemplate\n\nembed = HuggingFaceEmbeddings(\n    model_name=\"sentence-transformers/all-MiniLM-L6-v2\")\ndb = Chroma(persist_directory=\"./db\", embedding_function=embed)\nretriever = db.as_retriever(search_kwargs={\"k\": 4})\nllm = ChatOpenAI(model=\"gpt-4o-mini\", temperature=0)\n\nprompt = ChatPromptTemplate.from_template(\n    \"아래 context만 근거로 한국어로 답하라. \"\n    \"근거가 없으면 '문서에 없음'이라고 답하라.\\n\"\n    \"[context]\\n{context}\\n\\n[질문]\\n{question}\")\n\ndef ask(question):\n    docs = retriever.invoke(question)          # 1) 관련 조각 검색\n    context = \"\\n---\\n\".join(d.page_content for d in docs)\n    msg = prompt.format(context=context, question=question)\n    answer = llm.invoke(msg).content           # 2) LLM이 답 생성\n    pages = sorted({d.metadata.get(\"page\") for d in docs})\n    return f\"{answer}\\n\\n근거 페이지: {pages}\"  # 3) 출처 함께 반환\n\nprint(ask(\"환불은 며칠 안에 신청해야 하나요?\"))",
        "note": "검색→컨텍스트 결합→생성→출처 표기까지 RAG의 답변 단계를 한 함수로 묶었으며, temperature=0 으로 일관된 답을 유도합니다."
      }
    ]
  },
  "rag-3": {
    "theory": [
      {
        "h": "느낌이 아니라 숫자로 평가하라",
        "body": "RAG를 만들고 나면 '답이 잘 나오는 것 같다'는 느낌만으로는 부족합니다. 파라미터를 바꿨을 때 정말 좋아졌는지 객관적으로 알아야 하기 때문입니다. RAGAS는 답변이 문서에 충실한지, 질문에 맞는지를 0~1 숫자로 매겨 줍니다. 시험에 채점 기준표가 있어야 점수를 매길 수 있는 것처럼, 평가 지표가 있어야 개선이 진짜인지 알 수 있습니다."
      },
      {
        "h": "문제가 검색인지 생성인지부터 가려라",
        "body": "답이 틀렸을 때 무작정 고치면 안 됩니다. 원인이 두 가지이기 때문입니다. 첫째, 검색이 관련 문서를 못 찾아왔다면(context에 답이 아예 없음) 청킹이나 top-k, 임베딩을 손봐야 합니다. 둘째, 문서는 잘 찾아왔는데 LLM이 엉뚱하게 답했다면 프롬프트를 고쳐야 합니다. 충실도와 관련성 점수를 같이 보면 어느 쪽 문제인지 구분할 수 있습니다. 병의 원인을 알아야 약을 제대로 쓰는 것과 같습니다."
      },
      {
        "h": "실서비스는 정확도만의 싸움이 아니다",
        "body": "데모에서는 정확도만 보지만, 실제 서비스로 나가면 속도와 비용도 똑같이 중요합니다. 매번 큰 LLM을 부르면 응답이 느리고 돈이 많이 듭니다. 자주 나오는 질문은 캐싱으로 즉시 답하고, 검색은 top-k를 적당히 줄여 빠르게 하고, 메타데이터 필터로 불필요한 범위를 빼면 속도·비용·정확도를 모두 챙길 수 있습니다. 맛도 좋으면서 빨리 나오고 남는 장사가 되어야 진짜 식당인 것과 같습니다."
      }
    ],
    "realCode": [
      {
        "title": "RAGAS로 RAG 품질 자동 평가하기",
        "lang": "python",
        "code": "from datasets import Dataset\nfrom ragas import evaluate\nfrom ragas.metrics import faithfulness, answer_relevancy\n\n# 1) 평가용 질문과 정답지 준비\nquestions = [\"환불 신청 기한은?\", \"배송은 며칠 걸리나요?\"]\nground_truth = [\"구매 후 7일 이내\", \"평균 2~3일\"]\n\n# 2) 내 RAG(ask 함수)로 답변과 근거 수집\nanswers, contexts = [], []\nfor q in questions:\n    docs = retriever.invoke(q)\n    contexts.append([d.page_content for d in docs])\n    answers.append(ask_answer_only(q))  # 답변 문자열만 반환\n\n# 3) 평가용 데이터셋 구성\ndata = Dataset.from_dict({\n    \"question\": questions,\n    \"answer\": answers,\n    \"contexts\": contexts,\n    \"ground_truth\": ground_truth,\n})\n\n# 4) 충실도와 관련성 지표로 채점\nresult = evaluate(data,\n    metrics=[faithfulness, answer_relevancy])\nprint(result)  # {'faithfulness': 0.x, 'answer_relevancy': 0.y}",
        "note": "내 RAG의 답변·근거를 모아 RAGAS로 충실도와 관련성을 자동 채점하며, 점수를 보고 개선 방향을 정합니다."
      }
    ]
  },
  "langchain-1": {
    "theory": [
      {
        "h": "왜 LangChain을 쓰나요?",
        "body": "LLM에게 직접 요청을 보내려면 API 주소, 메시지 형식, 응답 파싱을 매번 직접 코딩해야 합니다. LangChain은 이런 반복 작업을 표준 부품으로 만들어 둔 도구상자입니다. 주방에 비유하면, 매번 칼을 직접 깎는 대신 잘 만들어진 칼·도마·믹서를 가져다 쓰는 셈입니다. 덕분에 우리는 '무엇을 만들지'에만 집중할 수 있습니다. 또한 모델을 OpenAI에서 다른 회사 모델로 바꿔도 코드를 거의 그대로 둘 수 있어 갈아끼우기가 쉽습니다."
      },
      {
        "h": "LCEL: 파이프로 잇는 조립 라인",
        "body": "LCEL은 부품을 파이프(|) 기호로 연결하는 방식입니다. 공장의 컨베이어 벨트를 떠올려 보세요. 재료(입력)가 들어오면 첫 번째 기계(프롬프트)가 모양을 잡고, 두 번째 기계(모델)가 가공하고, 세 번째 기계(파서)가 포장해서 내보냅니다. `prompt | model | parser` 라고만 쓰면 이 벨트가 완성됩니다. 각 부품은 독립적이라 중간 부품만 떼었다 붙였다 실험하기도 쉽습니다."
      },
      {
        "h": "글자 응답을 데이터로 바꾸기",
        "body": "AI는 기본적으로 사람이 읽는 '글'을 돌려줍니다. 하지만 프로그램은 글보다 정리된 데이터(예: JSON)를 좋아합니다. 출력 파서는 AI에게 '이 형식으로 답해줘'라고 부탁하고, 돌아온 답을 파이썬 딕셔너리로 바꿔줍니다. 마치 음성 주문을 받아 주문표 양식에 또박또박 옮겨 적어주는 직원과 같습니다. 이렇게 해야 결과를 다른 코드에서 바로 활용할 수 있습니다."
      }
    ],
    "realCode": [
      {
        "title": "리뷰 분석 체인 (프롬프트 → 모델 → JSON 파서) 엔드투엔드",
        "lang": "python",
        "code": "from dotenv import load_dotenv\nfrom langchain_openai import ChatOpenAI\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import JsonOutputParser\n\nload_dotenv()  # .env 파일의 OPENAI_API_KEY를 환경변수로 불러온다\n\n# 1) 모델 준비: temperature 0이면 매번 비슷하게(덜 창의적으로) 답한다\nmodel = ChatOpenAI(model=\"gpt-4o-mini\", temperature=0)\n\n# 2) 프롬프트: {review} 자리에 실제 리뷰가 들어간다\nprompt = ChatPromptTemplate.from_template(\n    \"다음 제품 리뷰를 분석해 JSON으로만 답해줘.\\n\"\n    \"키는 summary(한 줄 요약), sentiment(긍정/부정/중립), keywords(키워드 배열).\\n\"\n    \"리뷰: {review}\"\n)\n\n# 3) 파서: AI의 답(JSON 글자)을 파이썬 딕셔너리로 변환\nparser = JsonOutputParser()\n\n# 4) LCEL: 세 부품을 파이프로 이어 하나의 체인으로\nchain = prompt | model | parser\n\nresult = chain.invoke({\"review\": \"배송이 빨라서 좋았고 포장도 꼼꼼했어요\"})\nprint(result)              # {'summary': ..., 'sentiment': '긍정', ...}\nprint(result[\"sentiment\"])  # 딕셔너리라 키로 바로 꺼낼 수 있다",
        "note": "프롬프트·모델·파서를 파이프로 이으면 입력 한 번으로 정리된 JSON 결과까지 한 번에 얻습니다."
      }
    ]
  },
  "langchain-2": {
    "theory": [
      {
        "h": "AI에게 기억을 달아주기",
        "body": "기본 LLM은 매번 처음 만난 사람처럼 이전 대화를 기억하지 못합니다. 메모리는 지난 대화 내용을 노트에 적어 두었다가 새 질문과 함께 다시 보여주는 장치입니다. 카페에서 '아까 그거 한 잔 더요'라고 말해도 알아듣는 단골 점원을 떠올리면 됩니다. 덕분에 '그럼 그건 얼마야?' 같은 이어지는 질문도 자연스럽게 처리할 수 있습니다."
      },
      {
        "h": "모르는 건 찾아보게 하기 (RAG)",
        "body": "LLM은 학습한 시점까지의 지식만 알고, 우리 회사 내부 문서는 모릅니다. 그래서 없는 내용을 그럴듯하게 지어내는 '환각'이 생깁니다. RAG는 답하기 전에 먼저 관련 문서를 검색해 그 내용을 프롬프트에 붙여 줍니다. 오픈북 시험에 비유할 수 있습니다. 외워서 답하는 대신, 교과서에서 해당 페이지를 펴 놓고 보면서 답하니 훨씬 정확합니다."
      },
      {
        "h": "왜 문서를 잘라서 넣을까",
        "body": "긴 문서를 통째로 AI에 넣으면 비용이 크고, 정작 필요한 한두 문장이 묻혀 버립니다. 그래서 문서를 작은 조각으로 자르고(청킹), 각 조각을 숫자 좌표로 바꿔(임베딩) 저장합니다. 질문이 오면 의미가 가까운 조각만 몇 개 골라 보여줍니다. 두꺼운 책에서 필요한 페이지에만 포스트잇을 붙여 두는 것과 같습니다. 적게, 정확하게 보여주는 것이 핵심입니다."
      }
    ],
    "realCode": [
      {
        "title": "문서 QA(RAG) 챗봇 엔드투엔드",
        "lang": "python",
        "code": "from dotenv import load_dotenv\nfrom langchain_community.document_loaders import TextLoader\nfrom langchain_text_splitters import RecursiveCharacterTextSplitter\nfrom langchain_openai import OpenAIEmbeddings, ChatOpenAI\nfrom langchain_community.vectorstores import FAISS\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import StrOutputParser\nfrom langchain_core.runnables import RunnablePassthrough\n\nload_dotenv()\n\n# 1) 문서 로드 후 작은 조각으로 자르기\ndocs = TextLoader(\"data.txt\", encoding=\"utf-8\").load()\nchunks = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=30).split_documents(docs)\n\n# 2) 조각을 벡터로 바꿔 FAISS 벡터DB에 저장하고 검색기 생성\ndb = FAISS.from_documents(chunks, OpenAIEmbeddings())\nretriever = db.as_retriever(search_kwargs={\"k\": 3})  # 가장 비슷한 3조각\n\n# 3) 검색한 context와 question을 함께 넣는 프롬프트\nprompt = ChatPromptTemplate.from_template(\n    \"아래 문서 내용만 근거로 답해줘. 없으면 '문서에 정보가 없습니다'라고 해.\\n\"\n    \"문서: {context}\\n질문: {question}\"\n)\nmodel = ChatOpenAI(model=\"gpt-4o-mini\", temperature=0)\n\n# 4) RAG 체인: 질문이 retriever로 가서 context를 채우고 나머지는 그대로\nchain = ({\"context\": retriever, \"question\": RunnablePassthrough()}\n         | prompt | model | StrOutputParser())\n\nprint(chain.invoke(\"환불 정책이 어떻게 되나요?\"))",
        "note": "문서를 잘라 벡터DB에 넣고, 질문마다 관련 조각만 찾아 붙여 근거 있는 답을 만드는 전형적인 RAG 흐름입니다."
      }
    ]
  },
  "langchain-3": {
    "theory": [
      {
        "h": "왜 스트리밍이 필요한가",
        "body": "긴 답을 다 만들 때까지 화면이 멈춰 있으면 사용자는 고장 났다고 느낍니다. 스트리밍은 글자가 만들어지는 즉시 한 조각씩 보내 줍니다. 식당에서 코스 요리가 다 나올 때까지 굶기지 않고 나오는 대로 접시를 내주는 것과 같습니다. 전체 시간이 같아도 체감 대기 시간이 훨씬 짧아 사용자 경험이 좋아집니다. ChatGPT가 글자를 타이핑하듯 보여주는 것이 바로 이 방식입니다."
      },
      {
        "h": "비용을 아끼는 캐싱과 토큰 관리",
        "body": "LLM은 보낸 글과 받은 글의 토큰 수만큼 돈이 듭니다. 똑같은 질문이 반복되는데 매번 AI를 부르면 돈이 새 나갑니다. 캐싱은 한 번 구한 답을 보관해 두고 같은 질문엔 즉시 꺼내 줍니다. 자주 찾는 전화번호를 단축번호로 저장해 두는 것과 같습니다. 또 프롬프트를 짧고 명확하게 쓰면 토큰이 줄어 비용과 속도가 함께 좋아집니다."
      },
      {
        "h": "만든 것을 세상에 내보내기",
        "body": "코드가 내 노트북에서만 돌면 나만 쓸 수 있습니다. FastAPI로 체인을 감싸면 '인터넷 주소'가 생겨 다른 프로그램이나 웹사이트가 호출할 수 있습니다. 우리 주방의 요리를 배달 앱에 올려 누구나 주문하게 만드는 것과 같습니다. 여기에 에러 처리를 더하면, 손님이 이상한 주문을 해도 가게가 문 닫지 않고 '죄송합니다'라고 답할 수 있어 서비스가 안정적으로 유지됩니다."
      }
    ],
    "realCode": [
      {
        "title": "FastAPI + 캐싱 + 스트리밍 + 에러처리 미니 서비스",
        "lang": "python",
        "code": "from dotenv import load_dotenv\nfrom fastapi import FastAPI\nfrom fastapi.responses import StreamingResponse\nfrom langchain_openai import ChatOpenAI\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import StrOutputParser\nfrom langchain_core.globals import set_llm_cache\nfrom langchain_community.cache import InMemoryCache\n\nload_dotenv()\nset_llm_cache(InMemoryCache())  # 같은 질문은 캐시로 즉시 응답\n\nprompt = ChatPromptTemplate.from_template(\"질문에 친절히 한국어로 답해줘: {q}\")\nmodel = ChatOpenAI(model=\"gpt-4o-mini\", temperature=0)\nchain = prompt | model | StrOutputParser()\n\napp = FastAPI()\n\n@app.get(\"/chat\")\ndef chat(q: str):\n    try:\n        return {\"answer\": chain.invoke({\"q\": q})}\n    except Exception as e:           # 오류가 나도 서버는 살아 있게\n        return {\"error\": str(e)}\n\n@app.get(\"/stream\")\ndef stream(q: str):\n    # 답 조각을 생기는 대로 흘려보낸다\n    def gen():\n        for piece in chain.stream({\"q\": q}):\n            yield piece\n    return StreamingResponse(gen(), media_type=\"text/plain\")\n\n# 실행: uvicorn service:app --reload  →  http://127.0.0.1:8000/docs",
        "note": "체인을 FastAPI로 감싸고 캐싱·스트리밍·예외처리를 더하면 바로 쓸 수 있는 작은 AI 서비스가 됩니다."
      }
    ]
  },
  "serving-1": {
    "theory": [
      {
        "h": "학습과 서빙은 전혀 다른 일이다",
        "body": "모델을 만드는 '학습'은 요리 레시피를 완성하는 과정이고, '서빙'은 그 레시피로 손님 주문이 올 때마다 음식을 내어주는 식당 운영에 가깝다. 학습은 한 번 잘 끝내면 되지만, 서빙은 24시간 안정적으로 빠르게 답을 줘야 한다. 그래서 학습 코드와 서빙 코드는 보통 분리해서 관리한다. 학습 때는 정확도가 중요하지만, 서빙 때는 속도·안정성·동시 처리량이 더 중요해진다. 이 차이를 이해하는 것이 MLOps의 출발점이다."
      },
      {
        "h": "왜 API로 감싸는가",
        "body": "모델을 파이썬 함수로만 두면 그 모델을 쓰려는 모든 사람이 파이썬과 라이브러리를 똑같이 설치해야 한다. 대신 API로 감싸두면 웹·앱·다른 서버 누구든 인터넷 주소로 요청만 보내면 결과를 받는다. 마치 번역가를 직접 옆에 두는 대신, 전화로 물어보면 답해주는 번역 콜센터를 만드는 셈이다. FastAPI는 이런 콜센터를 파이썬 몇 줄로 빠르게 만들어주는 도구이며, 자동 문서(/docs)까지 만들어줘서 초보자가 테스트하기에 좋다."
      },
      {
        "h": "입력 검증이 서빙 안정성의 절반이다",
        "body": "실제 서비스에서는 엉뚱한 값(숫자 자리에 글자, 빈 값 등)이 끊임없이 들어온다. 검증 없이 모델에 바로 넣으면 서버가 에러로 죽어버린다. Pydantic으로 '여기는 숫자 4개여야 해'라고 미리 약속해두면 잘못된 요청은 모델에 닿기도 전에 친절한 오류 메시지로 되돌려보낸다. 이는 식당 입구에서 주문서를 먼저 확인해 주방의 혼란을 막는 것과 같다."
      }
    ],
    "realCode": [
      {
        "title": "FastAPI 추론 서버 전체 (app.py)",
        "lang": "python",
        "code": "from fastapi import FastAPI\nfrom pydantic import BaseModel\nimport joblib\n\napp = FastAPI(title=\"Iris 분류 서빙\")\n# 서버가 켜질 때 모델을 딱 한 번만 메모리에 올린다(요청마다 로드하면 느림)\nmodel = joblib.load(\"model.joblib\")\nLABELS = [\"setosa\", \"versicolor\", \"virginica\"]\n\nclass IrisInput(BaseModel):  # 입력 형식을 미리 약속 → 잘못된 값 자동 차단\n    sepal_length: float\n    sepal_width: float\n    petal_length: float\n    petal_width: float\n\n@app.get(\"/health\")  # 모니터링이 서버 생사 확인용으로 부르는 주소\ndef health():\n    return {\"status\": \"ok\"}\n\n@app.post(\"/predict\")\ndef predict(x: IrisInput):\n    features = [[x.sepal_length, x.sepal_width, x.petal_length, x.petal_width]]\n    pred = model.predict(features)[0]  # 모델에 넣어 예측 클래스 번호를 받음\n    return {\"prediction\": LABELS[int(pred)]}  # 번호를 사람이 읽는 이름으로 변환",
        "note": "모델을 시작 시 한 번만 로드하고, 입력은 Pydantic으로 검증한 뒤 /predict로 예측을 돌려주는 가장 기본적인 서빙 골격이다."
      },
      {
        "title": "BentoML로 모델 패키징·서빙 (service.py)",
        "lang": "python",
        "code": "import bentoml\nfrom bentoml.io import JSON\n\n# 먼저 학습 모델을 BentoML 저장소에 등록: bentoml.sklearn.save_model('iris_clf', model)\nmodel_ref = bentoml.sklearn.get(\"iris_clf:latest\")  # 최신 버전 자동 선택\nrunner = model_ref.to_runner()  # 추론 실행 단위(자동 확장에 유리)\n\nsvc = bentoml.Service(\"iris_service\", runners=[runner])\nLABELS = [\"setosa\", \"versicolor\", \"virginica\"]\n\n@svc.api(input=JSON(), output=JSON())  # JSON 받아 JSON 반환\nasync def predict(data: dict):\n    feats = [[data[\"sepal_length\"], data[\"sepal_width\"],\n              data[\"petal_length\"], data[\"petal_width\"]]]\n    pred = await runner.predict.async_run(feats)  # 비동기 추론으로 동시 요청 처리\n    return {\"prediction\": LABELS[int(pred[0])]}\n# 실행: bentoml serve service.py:svc --reload",
        "note": "BentoML은 모델을 버전과 함께 저장소에 등록하고 runner로 감싸 자동 확장·패키징(빌드)까지 쉽게 해주는 서빙 전용 프레임워크다."
      }
    ]
  },
  "serving-2": {
    "theory": [
      {
        "h": "컨테이너는 '내 PC에선 됐는데요'를 없앤다",
        "body": "개발자들이 가장 자주 겪는 문제는 내 컴퓨터에선 잘 되던 코드가 다른 서버에선 라이브러리 버전이 달라 안 도는 것이다. 컨테이너는 파이썬 버전, 라이브러리, 설정까지 통째로 한 상자에 넣어 옮기기 때문에 어디서 열어도 똑같이 동작한다. 마치 이사할 때 짐을 그대로 담은 컨테이너 박스를 통째로 옮기는 것과 같다. Docker는 이 상자를 만들고 실행하는 가장 표준적인 도구이며, 클라우드 배포의 기본 단위가 컨테이너다."
      },
      {
        "h": "모니터링 없는 서빙은 눈 감고 운전하기",
        "body": "모델을 띄워만 두고 지표를 안 보면, 응답이 느려지거나 에러가 쏟아져도 사용자 항의가 올 때까지 모른다. 메트릭은 '지금 초당 몇 건이 들어오고 평균 응답이 몇 ms인가'를, 로그는 '무슨 일이 있었나'를, 트레이스는 '한 요청이 어디서 시간을 썼나'를 보여준다. 이 셋을 갖추면 문제를 사용자보다 먼저 발견할 수 있다. Prometheus는 메트릭을 주기적으로 긁어와 쌓아두는 대표 도구다."
      },
      {
        "h": "모델은 시간이 지나면 낡는다(드리프트)",
        "body": "학습할 때의 세상과 서비스 중인 지금의 세상은 다르다. 예를 들어 작년 데이터로 학습한 추천 모델은 올해 유행이 바뀌면 정확도가 슬금슬금 떨어진다. 이를 드리프트라 하며, 입력 데이터 분포가 변하는 데이터 드리프트와 예측 정확도가 떨어지는 모델(컨셉) 드리프트로 나뉜다. 운영에서는 입력 통계와 정답 대비 성능을 꾸준히 감시하다가, 기준을 벗어나면 재학습 알림을 보내는 것이 핵심이다."
      }
    ],
    "realCode": [
      {
        "title": "추론 API용 Dockerfile + compose",
        "lang": "bash",
        "code": "# --- Dockerfile ---\nFROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt  # 의존성 먼저 설치(캐시 활용)\nCOPY app.py model.joblib ./                          # 앱과 모델 복사\nEXPOSE 8000\nCMD [\"uvicorn\", \"app:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\n\n# --- docker-compose.yml ---\n# version: \"3\"\n# services:\n#   api:\n#     build: .\n#     ports: [\"8000:8000\"]\n#   prometheus:\n#     image: prom/prometheus\n#     ports: [\"9090:9090\"]\n#     volumes: [\"./prometheus.yml:/etc/prometheus/prometheus.yml\"]",
        "note": "Dockerfile은 의존성을 먼저 설치해 캐시를 살리고, compose로 API와 Prometheus를 한 번에 띄워 수집까지 자동화한다."
      }
    ]
  },
  "serving-3": {
    "theory": [
      {
        "h": "왜 자동화(MLOps)가 필요한가",
        "body": "모델 하나를 손으로 학습하고 손으로 배포하는 것은 한 번은 할 만하다. 그런데 모델은 데이터가 쌓이면 계속 다시 학습해야 하고, 그때마다 사람이 수동으로 옮기면 실수와 시간 낭비가 쌓인다. MLOps는 이 반복 작업을 컨베이어 벨트처럼 자동화한다. 공장에서 제품을 손으로 하나씩 만들다가 자동 생산라인을 깔면 품질이 일정해지고 속도가 빨라지는 것과 같다. 핵심은 '같은 결과를 언제든 다시 만들 수 있게'(재현성) 모든 단계를 기록·자동화하는 것이다."
      },
      {
        "h": "실험 추적은 연구 노트, 레지스트리는 합격품 창고",
        "body": "모델을 여러 번 학습하다 보면 '지난주에 정확도 92% 나온 그 설정이 뭐였지?'를 금세 잊는다. MLflow 같은 실험 추적 도구는 매 학습의 파라미터와 점수를 자동으로 적는 연구 노트 역할을 한다. 그중 가장 좋은 모델만 골라 모델 레지스트리라는 합격품 창고에 버전을 붙여 보관하고, '이건 운영용', '이건 시험용'처럼 단계를 표시한다. 그러면 누가 봐도 지금 서비스에 어떤 모델이 올라가 있는지 명확해진다."
      },
      {
        "h": "CI/CD와 AIOps로 운영을 자동 조종한다",
        "body": "CI/CD는 개발자가 코드를 올리기만 하면 자동으로 테스트하고 문제없으면 배포까지 해주는 자동 비행 장치다. 실수로 깨진 코드를 올려도 테스트가 빨간불을 켜 배포를 막아준다. 여기에 AIOps를 더하면, 운영 중 쏟아지는 로그와 지표를 AI가 지켜보다가 평소와 다른 이상(급격한 에러 증가 등)을 자동으로 감지하고 알림이나 자동 복구를 트리거한다. 사람이 24시간 모니터를 노려보지 않아도 시스템이 스스로를 감시하게 만드는 것이 목표다."
      }
    ],
    "realCode": [
      {
        "title": "MLflow로 실험 기록하는 학습 코드 (train.py)",
        "lang": "python",
        "code": "import mlflow, mlflow.sklearn\nfrom sklearn.datasets import load_iris\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\n\nX, y = load_iris(return_X_y=True)\nXtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42)\n\nn_estimators = 200  # 바꿔가며 실험할 하이퍼파라미터\nwith mlflow.start_run():                       # 한 번의 실험을 기록 시작\n    model = RandomForestClassifier(n_estimators=n_estimators).fit(Xtr, ytr)\n    acc = accuracy_score(yte, model.predict(Xte))\n    mlflow.log_param(\"n_estimators\", n_estimators)  # 설정 기록\n    mlflow.log_metric(\"accuracy\", acc)              # 점수 기록\n    mlflow.sklearn.log_model(model, \"model\")        # 모델 자체 저장\n    print(\"accuracy:\", acc)\n# 이후 'mlflow ui' 로 실험들을 표로 비교, 최고 모델을 Register 가능",
        "note": "start_run 블록 안에서 파라미터·점수·모델을 기록하면 MLflow UI에서 실험들을 자동으로 비교·등록할 수 있다."
      },
      {
        "title": "GitHub Actions CI/CD 워크플로 (.github/workflows/ci.yml)",
        "lang": "bash",
        "code": "name: ci-cd\non:\n  push:\n    branches: [ main ]      # main에 push되면 자동 실행\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4         # 코드 내려받기\n      - uses: actions/setup-python@v5\n        with: { python-version: \"3.11\" }\n      - run: pip install -r requirements.txt\n      - run: pytest -q                      # 테스트 통과해야 다음 단계로\n      - run: docker build -t iris-serving:${{ github.sha }} .  # 이미지 빌드\n      # 실제 배포라면 여기서 레지스트리 push / 서버 배포 단계를 잇는다",
        "note": "push가 일어나면 체크아웃→설치→테스트→이미지 빌드가 자동으로 돌고, 테스트가 실패하면 뒤 단계가 멈춰 잘못된 배포를 막는다."
      }
    ]
  },
  "agent-1": {
    "theory": [
      {
        "h": "챗봇과 에이전트는 뭐가 다를까",
        "body": "일반 챗봇은 질문 하나에 답 하나를 내놓고 끝납니다. 마치 한 번 묻고 답하는 ARS 같습니다. 반면 에이전트는 '이 질문에 답하려면 검색이 필요하겠네'라고 스스로 판단하고, 도구를 써서 정보를 모은 뒤 다시 생각해 최종 답을 만듭니다. 똑똑한 비서가 필요하면 인터넷도 찾아보고 계산기도 두드린 다음 보고하는 것과 같습니다. 그래서 에이전트는 여러 단계를 알아서 도는 '반복 루프'를 가집니다."
      },
      {
        "h": "ReAct: 생각과 행동의 캐치볼",
        "body": "ReAct는 Reason(생각)과 Act(행동)를 번갈아 하는 방법입니다. 사람도 요리할 때 '간이 싱겁네(생각) → 소금 넣자(행동) → 다시 맛본다(생각)'를 반복하죠. 에이전트도 똑같이 '날씨를 알아야겠다(생각) → 날씨 도구 호출(행동) → 결과를 보니 비가 오네(생각) → 우산 챙기라고 답(행동)' 식으로 돕니다. 이 반복 덕분에 한 번에 못 푸는 복잡한 일도 단계별로 해냅니다."
      },
      {
        "h": "왜 그래프로 그릴까",
        "body": "에이전트의 작업은 '먼저 생각하고, 도구가 필요하면 호출하고, 아니면 끝낸다'처럼 갈림길이 많습니다. 이걸 글로만 짜면 복잡해지는데, LangGraph는 지하철 노선도처럼 역(노드)과 선로(엣지)로 그림을 그려 줍니다. 각 역에서 무슨 일을 하고, 어떤 조건이면 어느 역으로 가는지가 한눈에 보여서, 흐름을 만들고 고치기가 쉬워집니다."
      }
    ],
    "realCode": [
      {
        "title": "도구를 사용하는 단일 ReAct 에이전트 (엔드투엔드)",
        "lang": "python",
        "code": "from typing import Annotated, TypedDict\nfrom langgraph.graph import StateGraph, START, END\nfrom langgraph.graph.message import add_messages\nfrom langgraph.prebuilt import ToolNode, tools_condition\nfrom langchain_openai import ChatOpenAI\nfrom langchain_core.tools import tool\n\n# 1) 공용 메모장(State): 메시지를 계속 쌓아 둔다\nclass State(TypedDict):\n    messages: Annotated[list, add_messages]\n\n# 2) 도구 정의: LLM이 호출할 가짜 날씨 함수\n@tool\ndef get_weather(city: str) -> str:\n    \"\"\"도시 이름을 받아 현재 날씨를 알려준다.\"\"\"\n    db = {\"서울\": \"맑음 24도\", \"부산\": \"흐림 20도\"}\n    return db.get(city, \"정보 없음\")\n\ntools = [get_weather]\n# 모델에 도구를 묶어 줘야 모델이 도구를 부를 수 있다\nllm = ChatOpenAI(model=\"gpt-4o-mini\").bind_tools(tools)\n\n# 3) LLM 노드: 상태의 메시지를 보고 다음 행동을 결정\ndef agent(state: State):\n    return {\"messages\": [llm.invoke(state[\"messages\"])]}\n\n# 4) 그래프 조립: agent <-> tools 를 오가는 루프\ng = StateGraph(State)\ng.add_node(\"agent\", agent)\ng.add_node(\"tools\", ToolNode(tools))\ng.add_edge(START, \"agent\")\n# tools_condition: 도구 호출이 있으면 tools로, 없으면 END로 분기\ng.add_conditional_edges(\"agent\", tools_condition)\ng.add_edge(\"tools\", \"agent\")  # 도구 결과를 다시 LLM에게 전달\napp = g.compile()\n\n# 5) 실행: 질문을 넣고 흐름을 출력\nresult = app.invoke({\"messages\": [(\"user\", \"서울 날씨 알려줘\")]})\nfor m in result[\"messages\"]:\n    m.pretty_print()  # 생각->도구호출->결과->답변 순서가 보인다",
        "note": "tools_condition 한 줄이 'LLM이 도구를 부르면 tools로, 아니면 끝'을 자동 분기해 ReAct 루프를 완성한다."
      }
    ]
  },
  "agent-2": {
    "theory": [
      {
        "h": "왜 에이전트를 여러 개로 나눌까",
        "body": "한 사람이 기획·자료조사·글쓰기·검토를 모두 하면 헷갈리고 품질이 떨어집니다. 회사도 그래서 부서를 나눕니다. 멀티 에이전트도 마찬가지로 '자료를 찾는 연구원', '글로 정리하는 작가'처럼 역할을 쪼갭니다. 각 에이전트는 자기 일만 잘하면 되니 프롬프트가 단순해지고 결과가 좋아집니다. 이때 일을 나눠 주는 '팀장(Supervisor)'이 있으면 누가 무엇을 할지 깔끔하게 정리됩니다."
      },
      {
        "h": "메모리: 에이전트의 다이어리",
        "body": "기본 에이전트는 요청이 끝나면 방금 대화를 모두 잊어버립니다. 매번 처음 만난 사람처럼 행동하는 셈이죠. 체크포인터(MemorySaver)를 붙이면 대화 상태를 다이어리에 적어 두었다가, 같은 thread_id로 다시 오면 그 다이어리를 펼쳐 이어서 대화합니다. 덕분에 '방금 그거 더 짧게'처럼 앞 내용을 가리키는 말도 알아듣게 됩니다."
      },
      {
        "h": "사람이 끼어드는 안전장치",
        "body": "에이전트가 돈을 송금하거나 메일을 발송하는 등 되돌릴 수 없는 일을 한다면, 그냥 맡기긴 불안합니다. Human-in-the-loop는 그런 위험한 단계 직전에 그래프를 멈추고(interrupt) '이대로 진행할까요?'라고 사람에게 물어봅니다. 사람이 승인하면 그때 이어서 실행합니다. 자동운전 중에도 위급하면 운전자에게 핸들을 넘기는 것과 같은 안전장치입니다."
      }
    ],
    "realCode": [
      {
        "title": "Supervisor 멀티 에이전트 + 메모리 (엔드투엔드)",
        "lang": "python",
        "code": "from typing import Annotated, TypedDict, Literal\nfrom langgraph.graph import StateGraph, START, END\nfrom langgraph.graph.message import add_messages\nfrom langgraph.checkpoint.memory import MemorySaver\nfrom langchain_openai import ChatOpenAI\n\nllm = ChatOpenAI(model=\"gpt-4o-mini\")\n\nclass State(TypedDict):\n    messages: Annotated[list, add_messages]\n    next: str  # 다음에 일할 담당자 이름\n\n# 팀장: 다음 담당자를 한 단어로 고른다\ndef supervisor(state: State):\n    sys = \"researcher, writer 중 다음 담당자를 고르거나, 끝났으면 FINISH 만 답하라.\"\n    msg = llm.invoke([(\"system\", sys)] + state[\"messages\"])\n    return {\"next\": msg.content.strip()}\n\ndef researcher(state: State):  # 자료 조사 역할\n    r = llm.invoke([(\"system\", \"핵심 사실만 3줄로 조사하라.\")] + state[\"messages\"])\n    return {\"messages\": [r]}\n\ndef writer(state: State):  # 글 정리 역할\n    w = llm.invoke([(\"system\", \"앞 내용을 매끄러운 문단으로 정리하라.\")] + state[\"messages\"])\n    return {\"messages\": [w]}\n\n# 팀장의 결정에 따라 길을 고르는 분기 함수\ndef route(state: State) -> Literal[\"researcher\", \"writer\", \"__end__\"]:\n    return END if \"FINISH\" in state[\"next\"] else state[\"next\"]\n\ng = StateGraph(State)\ng.add_node(\"supervisor\", supervisor)\ng.add_node(\"researcher\", researcher)\ng.add_node(\"writer\", writer)\ng.add_edge(START, \"supervisor\")\ng.add_conditional_edges(\"supervisor\", route)\ng.add_edge(\"researcher\", \"supervisor\")  # 일 끝나면 팀장에게 복귀\ng.add_edge(\"writer\", \"supervisor\")\n\napp = g.compile(checkpointer=MemorySaver())  # 메모리 장착\ncfg = {\"configurable\": {\"thread_id\": \"1\"}}\nout = app.invoke({\"messages\": [(\"user\", \"인공지능 역사 짧게 정리해줘\")]}, cfg)\nprint(out[\"messages\"][-1].content)",
        "note": "supervisor가 next를 정하고 route가 그 값으로 분기하며, 모든 일이 끝나면 FINISH로 END에 도달한다."
      }
    ]
  },
  "vectordb-1": {
    "theory": [
      {
        "h": "왜 키워드 검색만으로는 부족할까",
        "body": "옛날 검색은 글자가 똑같이 들어 있는 문서를 찾았다. 그래서 '강아지'라고 검색하면 '반려견'이 들어간 글은 못 찾았다. 단어는 다르지만 뜻은 같은데도 말이다. Vector DB는 단어 자체가 아니라 '의미'를 비교한다. 마치 사람이 '강아지'와 '반려견'을 같은 것으로 이해하듯, 의미가 가까운 문장을 숫자 거리로 찾아낸다. 그래서 표현이 달라도 뜻이 통하면 검색이 된다. 이것이 요즘 AI 검색과 RAG의 핵심이다."
      },
      {
        "h": "의미를 어떻게 숫자로 바꾸나 (임베딩의 직관)",
        "body": "임베딩 모델은 수많은 문장을 학습해서 '비슷한 뜻이면 비슷한 좌표'에 놓는 지도를 만든다. 예를 들어 '왕'에서 '남자'를 빼고 '여자'를 더하면 '여왕' 근처가 나온다는 유명한 이야기가 바로 이 지도 위에서 일어나는 일이다. 우리가 문장을 모델에 넣으면 384개나 768개의 숫자가 나오는데, 이 숫자 묶음이 그 문장의 위치(좌표)다. 좌표가 가까운 두 문장은 뜻이 가깝다고 보면 된다. 즉 검색은 '내 질문 좌표에서 가장 가까운 문서 좌표 찾기' 문제로 바뀐다."
      },
      {
        "h": "느린 완전탐색 대신 인덱싱이 필요한 이유",
        "body": "문서가 100개면 질문 벡터와 100개를 하나씩 비교해도 빠르다. 하지만 1억 개라면 매번 1억 번 비교는 너무 느리다. 그래서 HNSW나 IVF 같은 인덱싱을 쓴다. 도서관에서 모든 책을 한 권씩 펴보지 않고, 분류표(색인)를 따라 해당 코너로 바로 가는 것과 같다. 약간의 정확도를 양보하는 대신 수백 배 빨라진다(근사 최근접 이웃 검색). 데이터가 많아질수록 이 인덱싱이 Vector DB의 실력을 가른다."
      }
    ],
    "realCode": [
      {
        "title": "Chroma로 만드는 영구 저장형 문서 검색 시스템 (엔드투엔드)",
        "lang": "python",
        "code": "import chromadb\nfrom chromadb.utils import embedding_functions\n\n# 1) 디스크에 저장되는 영구 클라이언트 생성 (프로그램을 꺼도 데이터 유지)\nclient = chromadb.PersistentClient(path=\"./my_vdb\")\n\n# 2) 임베딩 함수 지정 (문장을 자동으로 벡터로 변환해 줌)\nembed_fn = embedding_functions.SentenceTransformerEmbeddingFunction(\n    model_name=\"all-MiniLM-L6-v2\"\n)\n\n# 3) 컬렉션(테이블 같은 개념) 생성 또는 불러오기\ncollection = client.get_or_create_collection(\n    name=\"faq\", embedding_function=embed_fn\n)\n\n# 4) 문서와 메타데이터(꼬리표)를 함께 저장\ndocs = [\"환불은 7일 이내 가능합니다\",\n        \"배송은 보통 2~3일 걸립니다\",\n        \"회원가입은 무료입니다\"]\ncollection.add(\n    documents=docs,\n    metadatas=[{\"topic\": \"환불\"}, {\"topic\": \"배송\"}, {\"topic\": \"가입\"}],\n    ids=[\"d1\", \"d2\", \"d3\"]\n)\n\n# 5) 자연어 질문으로 검색 (의미가 가까운 문서 2개)\nresult = collection.query(query_texts=[\"돈 돌려받고 싶어요\"], n_results=2)\nprint(result[\"documents\"][0])  # 환불 안내가 1순위로 나옴",
        "note": "PersistentClient를 쓰면 프로그램을 껐다 켜도 색인이 남아 실제 서비스처럼 재사용할 수 있고, add/query 두 함수만으로 임베딩부터 검색까지 끝난다."
      }
    ]
  },
  "capstone-1": {
    "theory": [
      {
        "h": "왜 '문제 정의'가 코딩보다 먼저인가",
        "body": "요리를 시작하기 전에 '누구에게 무슨 음식을 줄지'를 정하지 않으면 재료만 잔뜩 사고 끝납니다. 소프트웨어도 똑같아서, 무엇을 왜 만드는지 한 문장으로 못 적으면 만드는 내내 방향이 흔들립니다. 그래서 캡스톤 첫날은 코드보다 '누구의 어떤 불편을 줄여줄 것인가'를 또렷하게 적는 데 시간을 씁니다. 좋은 문제 정의는 페르소나(가상의 대표 사용자)와 성공 기준을 포함합니다. 성공 기준은 나중에 '잘 됐는지'를 숫자로 확인하는 자(尺)가 됩니다."
      },
      {
        "h": "에이전트 + RAG + 도구가 한 팀으로 일하는 방식",
        "body": "에이전트를 똑똑한 신입사원이라고 생각해 봅시다. 신입은 모든 걸 외우고 있지 않습니다. 모르면 사내 문서함(RAG)을 뒤져 근거를 찾고, 계산이 필요하면 계산기(도구)를 꺼내 씁니다. 즉 에이전트는 '판단하는 두뇌', RAG는 '근거를 주는 자료실', 도구는 '직접 일을 해주는 손'입니다. 이 셋을 어떻게 연결하느냐가 아키텍처입니다. 첫날 이 그림을 명확히 그려두면, 이후 구현은 그림의 박스를 하나씩 코드로 채우는 일이 됩니다."
      },
      {
        "h": "작게 시작해서 늘려가기(점진적 개발)",
        "body": "처음부터 완벽한 시스템을 만들려 하면 어디서 막혔는지 알기 어렵습니다. 그래서 '가장 작은 동작 하나'를 먼저 성공시키는 것이 중요합니다. 오늘은 'LLM이 인사에 한 줄 답하기'만 되면 충분합니다. 이렇게 뼈대(골격)가 먼저 살아 움직이면, 거기에 RAG와 도구라는 살을 안전하게 붙일 수 있습니다. 매일 '어제보다 한 기능 더'를 목표로 삼으면 마지막 날 자연스럽게 완성에 도달합니다."
      }
    ],
    "realCode": [
      {
        "title": "동작하는 캡스톤 골격: LLM 한 줄 응답 확인",
        "lang": "python",
        "code": "import os\nfrom dotenv import load_dotenv\nfrom langchain_openai import ChatOpenAI\nfrom langchain_core.messages import SystemMessage, HumanMessage\n\nload_dotenv()  # .env 파일에서 OPENAI_API_KEY를 읽어온다\n\n# temperature=0 은 매번 비슷하고 안정적인 답을 내게 한다\nllm = ChatOpenAI(model=\"gpt-4o-mini\", temperature=0)\n\ndef ask(question: str) -> str:\n    messages = [\n        SystemMessage(content=\"너는 친절한 캡스톤 도우미야. 한국어로 짧게 답해.\"),\n        HumanMessage(content=question),\n    ]\n    answer = llm.invoke(messages)  # LLM에게 질문을 보내고 응답을 받는다\n    return answer.content\n\nif __name__ == \"__main__\":\n    if not os.getenv(\"OPENAI_API_KEY\"):\n        print(\"[에러] .env에 OPENAI_API_KEY가 없습니다\")\n    else:\n        print(\"질문: 안녕하세요\")\n        print(\"답변:\", ask(\"안녕하세요, 너는 무슨 일을 도와줄 수 있어?\"))",
        "note": "이 코드가 응답 한 줄을 출력하면 환경 설정과 LLM 연결이 끝난 것으로, 캡스톤의 출발점이 됩니다."
      }
    ]
  },
  "capstone-2": {
    "theory": [
      {
        "h": "RAG가 환각을 줄이는 원리",
        "body": "LLM은 가끔 모르는 것도 아는 척 그럴듯하게 지어냅니다. 이것을 환각이라고 합니다. RAG는 답하기 전에 먼저 '관련 문서를 찾아 읽고' 그 내용만 근거로 답하게 만듭니다. 마치 시험 볼 때 오픈북으로 교재를 펴놓고 답을 쓰는 것과 같습니다. 그래서 답이 더 정확해지고, '어디 문서를 보고 답했는지' 출처도 댈 수 있습니다. 핵심은 문서를 잘게 쪼개(청킹) 숫자로 바꿔(임베딩) 저장해 두고, 질문이 오면 비슷한 조각을 빠르게 찾아오는 것입니다."
      },
      {
        "h": "에이전트가 도구를 '스스로' 고르는 방식",
        "body": "사람에게 '필요하면 계산기 써도 돼'라고 말해두면, 어려운 곱셈이 나올 때 알아서 계산기를 꺼냅니다. 에이전트도 마찬가지로, 우리가 도구 목록과 각 도구의 설명을 주면 질문을 보고 '이건 문서 검색이 필요하네' 하고 검색 도구를 호출합니다. 이 '생각→도구 호출→결과 보고 다시 생각'의 반복이 ReAct 패턴입니다. LangGraph는 이 반복을 그래프(노드와 화살표)로 깔끔하게 관리해 줘서, 에이전트가 길을 잃지 않게 도와줍니다."
      }
    ],
    "realCode": [
      {
        "title": "RAG 인덱싱 + 검색 도구를 가진 에이전트",
        "lang": "python",
        "code": "from dotenv import load_dotenv\nfrom langchain_openai import ChatOpenAI, OpenAIEmbeddings\nfrom langchain_chroma import Chroma\nfrom langchain_text_splitters import RecursiveCharacterTextSplitter\nfrom langchain_core.tools import tool\nfrom langgraph.prebuilt import create_react_agent\n\nload_dotenv()\n\n# 1) 문서를 읽어 작은 조각으로 나눈다(청킹)\nwith open(\"docs.txt\", encoding=\"utf-8\") as f:\n    text = f.read()\nsplitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=50)\nchunks = splitter.split_text(text)\n\n# 2) 조각을 임베딩해 벡터 DB(Chroma)에 저장한다\nvectordb = Chroma.from_texts(chunks, OpenAIEmbeddings())\n\n# 3) 검색을 에이전트가 쓸 '도구'로 정의한다\n@tool\ndef search_docs(query: str) -> str:\n    \"\"\"사내 문서에서 질문과 관련된 내용을 찾아 돌려준다.\"\"\"\n    hits = vectordb.similarity_search(query, k=3)  # 가장 비슷한 3개\n    return \"\\n---\\n\".join(d.page_content for d in hits)\n\n# 4) 도구를 쓸 줄 아는 ReAct 에이전트를 만든다\nllm = ChatOpenAI(model=\"gpt-4o-mini\", temperature=0)\nagent = create_react_agent(llm, tools=[search_docs])\n\nif __name__ == \"__main__\":\n    q = \"환불 규정이 어떻게 돼?\"\n    result = agent.invoke({\"messages\": [(\"user\", q)]})\n    print(result[\"messages\"][-1].content)  # 문서를 근거로 한 최종 답변",
        "note": "문서를 쪼개 저장하고(1~2), 검색을 도구로 만들어(3) 에이전트에 쥐여주면(4) 근거 기반 답변이 나옵니다."
      }
    ]
  },
  "capstone-3": {
    "theory": [
      {
        "h": "데모가 깨지지 않게 하는 안정화의 기술",
        "body": "발표 때 가장 무서운 건 사람들 앞에서 코드가 빨갛게 에러를 뱉는 순간입니다. 그래서 마지막 날에는 '예상치 못한 입력에도 우아하게 대처하기'를 연습합니다. 검색 결과가 비었을 때, API가 잠깐 멈췄을 때, 이상한 질문이 들어왔을 때를 미리 try/except로 감싸 안내 메시지를 보여주게 합니다. 이것은 자동차의 안전벨트와 같아서, 평소엔 안 보이지만 사고 순간에 큰 차이를 만듭니다. 안정화가 된 데모는 보는 사람에게 '완성도 높다'는 인상을 줍니다."
      },
      {
        "h": "좋은 발표는 숫자와 한 장면으로 말한다",
        "body": "심사위원은 코드를 한 줄씩 읽지 않습니다. 대신 '무슨 문제를, 어떻게 풀었고, 얼마나 잘 됐는지'를 빠르게 알고 싶어 합니다. 그래서 발표는 문제→해결 구조→실제 데모→성과 숫자(정답률) 순으로 단순하게 짭니다. 특히 라이브로 질문을 넣어 답이 나오는 '한 장면'은 백 마디 설명보다 강력합니다. 또한 한계와 다음 단계를 솔직히 말하면 오히려 신뢰를 얻습니다. 완벽함이 아니라 '문제를 제대로 이해하고 끝까지 만들어냈다'는 점을 보여주는 것이 핵심입니다."
      }
    ],
    "realCode": [
      {
        "title": "안정화: 예외 처리와 출처 표시를 더한 응답 함수",
        "lang": "python",
        "code": "from langchain_openai import ChatOpenAI\n\nllm = ChatOpenAI(model=\"gpt-4o-mini\", temperature=0)\n\ndef answer_with_sources(query, vectordb):\n    try:\n        # 1) 관련 문서 조각을 찾는다\n        hits = vectordb.similarity_search(query, k=3)\n        if not hits:  # 검색 결과가 없으면 솔직히 모른다고 답한다\n            return \"관련 문서를 찾지 못했습니다. 질문을 더 구체적으로 해주세요.\"\n\n        # 2) 찾은 조각을 근거로 LLM에게 답을 부탁한다\n        context = \"\\n\".join(d.page_content for d in hits)\n        prompt = f\"아래 문서만 근거로 한국어로 답해.\\n문서:\\n{context}\\n\\n질문: {query}\"\n        reply = llm.invoke(prompt).content\n\n        # 3) 답변 끝에 출처(조각 앞부분)를 붙여 신뢰를 준다\n        sources = \"\\n\".join(f\"- {d.page_content[:40]}...\" for d in hits)\n        return f\"{reply}\\n\\n[출처]\\n{sources}\"\n    except Exception as e:  # 무슨 오류든 데모가 멈추지 않게 막는다\n        return f\"일시적인 오류가 발생했습니다. 다시 시도해 주세요. ({e})\"\n\nif __name__ == \"__main__\":\n    # vectordb 는 2일차에서 만든 것을 import 해 사용한다고 가정\n    print(\"데모용 함수 준비 완료\")",
        "note": "검색 실패·시스템 오류를 모두 감싸고 출처를 함께 보여줘, 발표 중 멈추지 않는 믿음직한 데모가 됩니다."
      }
    ]
  },
  "miniproject-1": {
    "theory": [
      {
        "h": "왜 기획부터 하나요?",
        "body": "집을 지을 때 설계도 없이 벽돌부터 쌓으면 나중에 다 부수게 됩니다. AI 서비스도 마찬가지로 '누가, 어떤 문제를, 어떻게' 해결하는지 먼저 글로 정리해야 합니다. 미니 프로젝트는 시간이 짧기 때문에 욕심을 줄이고 핵심 기능 2~3개만 정하는 것이 성공의 비결입니다. 기능을 줄이면 완성도가 올라가고, 발표 때 보여줄 게 분명해집니다. 오늘의 목표는 '작지만 끝까지 돌아가는 서비스'의 설계도를 만드는 것입니다."
      },
      {
        "h": "AI 서비스의 3층 구조",
        "body": "대부분의 AI 서비스는 세 층으로 나뉩니다. 첫째는 사용자가 보는 화면(UI), 둘째는 요청을 처리하는 두뇌(LLM·RAG·Agent), 셋째는 자료를 저장하는 창고(Vector DB)입니다. 식당에 비유하면 손님이 앉는 홀이 UI, 요리하는 주방이 두뇌, 재료 냉장고가 DB입니다. 이 셋을 어떻게 연결할지 화살표로 그려두면 누가 무엇을 만들지 분담이 쉬워집니다."
      }
    ],
    "realCode": [
      {
        "title": "프로젝트 설정을 한 곳에서 관리하는 config.py",
        "lang": "python",
        "code": "import os\nfrom dotenv import load_dotenv\n\n# .env 파일에 적어둔 비밀 값들을 메모리로 불러온다\nload_dotenv()\n\nclass Settings:\n    # API 키는 코드에 직접 쓰지 않고 환경변수에서 읽는다\n    OPENAI_API_KEY = os.getenv(\"OPENAI_API_KEY\", \"\")\n    # 사용할 LLM 모델 이름 (바꾸기 쉽게 한 곳에 모은다)\n    CHAT_MODEL = \"gpt-4o-mini\"\n    EMBED_MODEL = \"text-embedding-3-small\"\n    # 벡터 DB가 파일을 저장할 폴더 경로\n    DB_DIR = \"./chroma_db\"\n\n    def validate(self):\n        # 키가 비어 있으면 바로 알려준다\n        if not self.OPENAI_API_KEY:\n            raise ValueError(\".env 에 OPENAI_API_KEY 를 넣어주세요\")\n        return True\n\nsettings = Settings()\n\nif __name__ == \"__main__\":\n    settings.validate()\n    print(\"설정 OK:\", settings.CHAT_MODEL)",
        "note": "설정 값을 한 파일에 모아두면 나중에 모델이나 경로를 바꿀 때 이 파일만 고치면 됩니다."
      }
    ]
  },
  "miniproject-2": {
    "theory": [
      {
        "h": "RAG는 오픈북 시험이다",
        "body": "LLM은 똑똑하지만 우리 회사 내부 문서는 모릅니다. 그냥 물어보면 그럴듯하게 지어내는 '환각'이 생깁니다. RAG는 질문이 들어오면 먼저 관련 문서를 검색해 찾아낸 다음, 그 문서를 LLM에게 '이걸 보고 답해'라고 같이 건넵니다. 오픈북 시험처럼 근거를 손에 쥐고 답하니 정확해지고 출처도 댈 수 있습니다. 미니 프로젝트에서 가장 효과가 큰 핵심 기능이라 오늘 먼저 만듭니다."
      },
      {
        "h": "검색이 잘 되려면 청킹이 중요하다",
        "body": "문서를 통째로 넣으면 LLM이 한 번에 읽을 수 있는 양(컨텍스트)을 넘어버립니다. 그래서 문서를 적당한 크기 조각으로 자릅니다. 너무 크게 자르면 관련 없는 내용까지 섞이고, 너무 잘게 자르면 문맥이 끊깁니다. 보통 300~800자 정도에 조각끼리 약간 겹치게(overlap) 자르는 것이 안전합니다. 책에 형광펜으로 핵심 문단만 칠해두는 것과 비슷합니다."
      },
      {
        "h": "Agent는 스스로 도구를 고른다",
        "body": "RAG가 '항상 문서를 검색'하는 정해진 길이라면, 에이전트는 '이 질문엔 검색이 필요해, 저 질문엔 계산기가 필요해'라고 스스로 판단합니다. LLM에게 사용 가능한 도구 목록을 알려주면, 답하기 전에 어떤 도구를 쓸지 정하고 결과를 받아 최종 답을 만듭니다. 똑똑한 비서가 상황에 맞는 연장을 골라 쓰는 것과 같습니다."
      }
    ],
    "realCode": [
      {
        "title": "문서를 잘라 Vector DB에 저장하는 ingest.py",
        "lang": "python",
        "code": "from langchain_community.document_loaders import TextLoader\nfrom langchain.text_splitter import RecursiveCharacterTextSplitter\nfrom langchain_openai import OpenAIEmbeddings\nfrom langchain_community.vectorstores import Chroma\nfrom config import settings\n\n# 1) 문서 읽기\nloader = TextLoader(\"data/faq.txt\", encoding=\"utf-8\")\ndocs = loader.load()\n\n# 2) 작은 조각으로 자르기 (300자, 50자 겹침)\nsplitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=50)\nchunks = splitter.split_documents(docs)\n\n# 3) 글을 숫자 좌표(임베딩)로 바꿀 모델 준비\nembeddings = OpenAIEmbeddings(model=settings.EMBED_MODEL)\n\n# 4) 조각들을 임베딩해 Chroma 창고에 저장\ndb = Chroma.from_documents(chunks, embeddings, persist_directory=settings.DB_DIR)\nprint(f\"{len(chunks)}개 청크 저장 완료\")",
        "note": "문서를 자르고 임베딩해 저장하는 한 번만 실행하는 준비 작업입니다."
      },
      {
        "title": "질문에 문서 근거로 답하는 rag.py",
        "lang": "python",
        "code": "from langchain_openai import ChatOpenAI, OpenAIEmbeddings\nfrom langchain_community.vectorstores import Chroma\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom config import settings\n\nembeddings = OpenAIEmbeddings(model=settings.EMBED_MODEL)\n# 저장해둔 창고를 다시 연다\ndb = Chroma(persist_directory=settings.DB_DIR, embedding_function=embeddings)\nllm = ChatOpenAI(model=settings.CHAT_MODEL, temperature=0)\n\nprompt = ChatPromptTemplate.from_template(\n    \"아래 자료만 근거로 한국어로 답해줘. 자료에 없으면 '자료에서 찾지 못했습니다' 라고 답해.\\n\\n[자료]\\n{context}\\n\\n[질문] {question}\"\n)\n\ndef ask(question: str) -> str:\n    # 1) 질문과 비슷한 조각 3개 검색\n    found = db.similarity_search(question, k=3)\n    context = \"\\n\".join(d.page_content for d in found)\n    # 2) 자료를 끼워 프롬프트 완성 후 LLM 호출\n    msg = prompt.format_messages(context=context, question=question)\n    return llm.invoke(msg).content\n\nif __name__ == \"__main__\":\n    print(ask(\"환불은 어떻게 하나요?\"))",
        "note": "검색→프롬프트 조립→LLM 호출의 RAG 흐름 전체가 ask 함수 하나에 담겨 있습니다."
      }
    ]
  },
  "miniproject-3": {
    "theory": [
      {
        "h": "테스트는 '미리 깨보는' 일이다",
        "body": "발표 도중 서비스가 멈추면 가장 곤란합니다. 그래서 발표 전에 우리가 먼저 일부러 다양한 입력을 넣어봅니다. 정상 질문, 자료에 없는 질문, 빈칸 제출, 아주 긴 질문 등을 시도해 어디서 깨지는지 찾습니다. 미리 깨보고 고쳐두면 발표 때 안심할 수 있습니다. 테스트는 '실패를 미리 사두는 보험'이라고 생각하면 됩니다."
      },
      {
        "h": "배포는 도시락을 남에게 건네는 것",
        "body": "내 컴퓨터에서 잘 돌던 코드도 다른 환경에서는 라이브러리가 없어 안 켜질 수 있습니다. 그래서 requirements.txt 로 '이 재료들이 필요해'를 같이 전달하고, API 키는 코드에 넣지 않고 배포 서버의 Secrets 에 따로 넣습니다. Streamlit Cloud 같은 무료 서비스에 GitHub 저장소를 연결하면 자동으로 설치하고 실행해 공개 주소를 만들어줍니다. 잘 싼 도시락을 그대로 건네면 상대도 똑같이 먹을 수 있는 것과 같습니다."
      }
    ],
    "realCode": [
      {
        "title": "여러 질문을 한 번에 점검하는 test_rag.py",
        "lang": "python",
        "code": "from rag import ask\n\n# (질문, 기대 키워드) 목록 - 답에 이 단어가 들어가면 통과로 본다\ncases = [\n    (\"환불은 어떻게 하나요?\", \"환불\"),\n    (\"배송 기간은?\", \"배송\"),\n    (\"우주여행 예약 되나요?\", \"찾지 못\"),  # 자료에 없는 질문\n]\n\npassed = 0\nfor q, keyword in cases:\n    answer = ask(q)\n    ok = keyword in answer\n    print(f\"[{'OK' if ok else '실패'}] {q} -> {answer[:40]}\")\n    if ok:\n        passed += 1\n\nprint(f\"\\n결과: {passed}/{len(cases)} 통과\")",
        "note": "질문 목록을 한 번에 돌려 어디서 막히는지 빠르게 찾는 간단한 테스트입니다."
      }
    ]
  }
}

export const theoryFor = (subjectId, day) => theory[`${subjectId}-${day}`] || null
