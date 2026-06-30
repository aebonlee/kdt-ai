// 날짜별 "심화 이론(theory)" + "실전 소스(realCode)" — subjectId-day 키.
//   theory: [{ h, body }] · realCode: [{ title, lang, code, note }]

export const theory = {
  "git-1": {
    "theory": [
      {
        "h": "버전관리가 왜 필요할까: '최종_진짜최종_v3' 의 비극",
        "body": "보고서를 쓰다 보면 '최종.docx', '최종_진짜.docx', '최종_진짜최종_v3.docx' 처럼 파일이 끝없이 늘어난 경험이 있을 것이다.\n어느 게 진짜 최신인지, 어제 지운 그 문단이 어느 파일에 있었는지 알 수 없어 결국 시간을 낭비하게 된다.\n버전관리는 이런 혼란을 없애 준다.\n파일 이름은 그대로 두고, 대신 '저장 시점(커밋)'마다 변경 내용을 차곡차곡 기록해 둔다.\n\n그래서 언제든 '3일 전 그 상태로 되돌려 줘' 가 가능하고, '이 줄을 누가 왜 바꿨지?' 도 한 줄로 확인할 수 있다.\n혼자 할 때도 든든하지만, 여러 명이 같은 프로젝트를 만질 때 진가가 드러난다."
      },
      {
        "h": "Git 의 3단계 영역: 작업공간 → 스테이지 → 저장소",
        "body": "Git 을 처음 배우면 add 와 commit 이 왜 둘로 나뉘는지 헷갈린다.\n쇼핑에 비유하면 쉽다.\n내 폴더에서 파일을 고치는 것은 '매장에서 물건을 둘러보는' 작업공간 단계다.\n그중 살 것만 장바구니에 담는 것이 `git add`(스테이징)이고, 계산대에서 결제해 영수증을 받는 것이 `git commit` 이다.\n\n이렇게 두 단계로 나눈 덕분에, 고친 여러 파일 중 '이번 커밋에는 이것만' 골라 담는 정교한 저장이 가능하다.\n`git status` 는 지금 무엇이 작업공간에 있고 무엇이 장바구니에 담겼는지 알려 주는 안내판이다."
      },
      {
        "h": "브랜치와 협업: 평행 세계에서 따로 만들고 나중에 합친다",
        "body": "여러 사람이 같은 파일을 동시에 고치면 서로 덮어써서 작업이 사라지기 쉽다.\n브랜치는 이 문제를 '평행 세계'로 푼다.\n각자 자기 브랜치라는 복사된 세계에서 마음껏 작업하고, 본류(main)는 안전하게 보존한다.\n작업이 끝나면 머지로 본류에 합치는데, 서로 다른 줄을 고쳤다면 Git 이 알아서 합쳐 준다.\n\n문제는 같은 줄을 둘이 다르게 고쳤을 때인데, 이때 Git 은 '둘 중 뭐가 맞는지 나는 모르니 사람이 정해라' 하며 충돌을 알린다.\n충돌은 사고가 아니라 정상적인 협업 과정이며, 표시된 구간을 보고 최종본을 직접 정리해 주면 된다."
      }
    ],
    "realCode": [
      {
        "title": "Git 첫 저장소부터 GitHub push 까지 한 번에 따라하기",
        "lang": "bash",
        "code": "# 1) Git 설치 확인: 버전이 출력되면 정상 설치된 것\ngit --version                      # 예상 출력: git version 2.43.0\n\n# 2) 커밋에 기록될 내 이름/이메일 등록(--global 은 이 컴퓨터 전체 기본값)\ngit config --global user.name \"홍길동\"        # 커밋 작성자 이름\ngit config --global user.email \"me@team.com\" # 커밋 작성자 이메일\n\n# 3) 새 프로젝트 폴더를 만들고 그 안으로 이동\nmkdir team-project                 # team-project 라는 폴더 생성\ncd team-project                    # 방금 만든 폴더 안으로 들어감\n\n# 4) 이 폴더를 Git 저장소로 초기화(.git 숨은 폴더가 생김)\ngit init                           # 출력: Initialized empty Git repository ...\n\n# 5) README 파일을 하나 만들어 첫 내용 작성\necho \"# 우리팀 프로젝트\" > README.md  # README.md 에 제목 한 줄 기록\n\n# 6) 변경을 장바구니(스테이지)에 담고 커밋(영수증)으로 저장\ngit add README.md                  # README.md 를 다음 커밋 대상으로 담음\ngit commit -m \"docs: 프로젝트 소개 추가\"  # -m 뒤는 커밋 메시지(무엇을 했는지)\n\n# 7) GitHub 에서 만든 빈 저장소를 'origin' 이라는 별명의 원격으로 연결\ngit remote add origin https://github.com/team/team-project.git\n\n# 8) 기본 브랜치 이름을 main 으로 맞추고 인터넷으로 업로드\ngit branch -M main                 # 현재 브랜치 이름을 main 으로 변경\ngit push -u origin main            # origin 의 main 으로 첫 업로드(-u 는 연결 기억)\n\n# 9) 잘 올라갔는지 역사 확인(한 줄 요약 + 그래프)\ngit log --oneline --graph          # 예: * a1b2c3d (HEAD -> main) docs: 프로젝트 소개 추가",
        "note": "이 한 장이면 '내 컴퓨터에서 저장 → GitHub 로 공유' 까지의 기본 왕복이 끝난다.\n실무에서도 새 프로젝트를 시작할 때 거의 이 순서 그대로 진행한다."
      },
      {
        "title": "브랜치 만들기 → 충돌 일으키기 → 충돌 해결하기 전체 흐름",
        "lang": "bash",
        "code": "# (시작 상태) main 에 menu.txt 가 있고 \"커피\" 한 줄이 들어 있다고 가정\n\n# 1) 내 작업용 브랜치를 만들면서 그쪽으로 이동(-c 는 create)\ngit switch -c feature/add-tea      # feature/add-tea 가지를 만들고 그 위로 이동\n\n# 2) menu.txt 의 첫 줄을 \"녹차\" 로 바꿔 커밋\necho \"녹차\" > menu.txt              # 파일 내용을 녹차로 덮어씀\ngit commit -am \"feat: 메뉴를 녹차로 변경\"  # -a 는 추적중 파일 자동 add, -m 은 메시지\n\n# 3) 다시 main 으로 돌아가서, 같은 첫 줄을 \"홍차\" 로 바꿔 커밋\ngit switch main                    # 본류 main 으로 이동\necho \"홍차\" > menu.txt              # 같은 줄을 다른 값(홍차)으로 변경\ngit commit -am \"feat: 메뉴를 홍차로 변경\"  # main 쪽에도 커밋 생성\n\n# 4) main 에 feature 브랜치를 합치려 하면 같은 줄이라 충돌 발생\ngit merge feature/add-tea          # 출력: CONFLICT (content): Merge conflict in menu.txt\n\n# 5) menu.txt 를 열면 아래처럼 표시되어 있다(직접 편집해서 정리)\n#   <<<<<<< HEAD\n#   홍차        ← 현재 main 의 내용\n#   =======\n#   녹차        ← 합치려는 feature 의 내용\n#   >>>>>>> feature/add-tea\n#   → 표시줄 3개를 지우고 최종 내용(예: \"녹차, 홍차\")만 남긴다\n\n# 6) 정리한 파일을 다시 담고 커밋하면 충돌 해결 완료\ngit add menu.txt                   # 해결한 파일을 스테이지에 담아 '해결됨' 표시\ngit commit -m \"merge: 녹차/홍차 충돌 해결\"  # 머지 커밋으로 마무리\n\n# 7) 합쳐진 역사 확인\ngit log --oneline --graph          # 두 갈래가 한 점으로 합쳐진 그래프가 보임",
        "note": "충돌은 같은 줄을 서로 다르게 고쳤을 때만 난다는 점을 직접 만들어 보며 익히는 코드다.\n표시줄(<<<<<<<, =======, >>>>>>>)을 반드시 지우는 것이 핵심이다."
      }
    ]
  },
  "transformer-1": {
    "theory": [
      {
        "h": "언어모델은 '다음 단어 맞히기' 게임이다",
        "body": "언어모델은 사실 아주 단순한 게임을 반복합니다.\n앞에 나온 단어들을 보고 '그다음에 올 가장 그럴듯한 단어'를 확률로 고르는 일입니다.\n예를 들어 '오늘 점심은 김치'까지 봤다면 다음은 '찌개'일 확률이 높다고 판단합니다.\n\n이 게임을 수억 번 연습한 것이 바로 GPT 같은 거대 언어모델(LLM)입니다.\n사람처럼 '이해'한다기보다, 엄청난 양의 글에서 통계적으로 자연스러운 다음 단어를 잘 고르는 것입니다.\n그래서 좋은 입력(프롬프트)을 주면 좋은 다음 단어들이 줄줄이 나오는 구조입니다."
      },
      {
        "h": "RNN은 왜 한 줄씩 읽어서 느릴까",
        "body": "Transformer 이전의 RNN·LSTM은 글을 사람이 소리 내어 읽듯 '앞에서부터 한 단어씩' 차례로 처리했습니다.\n앞 단어를 다 읽어야 다음 단어를 읽을 수 있어서, 여러 개를 동시에(병렬로) 계산하기 어려웠습니다.\n또한 문장이 길어지면 맨 앞에서 본 정보를 뒤까지 기억하기 힘든 '장기 의존성' 문제가 생겼습니다.\n\n이것은 긴 전화 통화에서 첫마디를 끝까지 기억하기 어려운 것과 비슷합니다.\nTransformer의 Attention은 모든 단어를 한꺼번에 펼쳐놓고 서로의 관계를 동시에 보기 때문에, 빠르고 먼 단어도 잘 연결합니다."
      },
      {
        "h": "Attention은 형광펜으로 핵심을 칠하는 일",
        "body": "Attention의 핵심 아이디어는 '모든 단어를 똑같이 보지 말고, 중요한 단어에 더 집중하자'입니다.\n각 단어가 다른 단어들에게 '너는 나랑 얼마나 관련 있니?'라고 묻고, 관련도가 높을수록 큰 가중치를 줍니다.\n이때 질문지를 Query, 후보의 이름표를 Key, 실제 내용을 Value라고 부릅니다.\n\nQuery와 Key의 닮은 정도를 점수로 매기고, softmax로 합이 1인 확률로 바꾼 뒤, 그 비율대로 Value를 섞어 새 표현을 만듭니다.\n결과적으로 'it'이 가리키는 대상이 'cat'인지 'box'인지 같은 문맥 관계를 모델이 스스로 칠해내는 셈입니다."
      }
    ],
    "realCode": [
      {
        "title": "Scaled Dot-Product Self-Attention 직접 구현 (엔드투엔드)",
        "lang": "python",
        "code": "import torch                      # 파이토치: 행렬 계산과 딥러닝의 기본 도구\nimport torch.nn.functional as F   # softmax 같은 함수 모음을 F 라는 짧은 이름으로 사용\n\n# 1) 문장 'I love cats' 의 단어 3개를 각각 4차원 벡터(임베딩)로 가정\n#    실제로는 학습으로 정해지지만, 여기선 이해를 위해 직접 숫자를 적는다\nX = torch.tensor([[1.0, 0.0, 1.0, 0.0],   # 'I' 의 벡터\n                  [0.0, 2.0, 0.0, 2.0],   # 'love' 의 벡터\n                  [1.0, 1.0, 1.0, 1.0]])  # 'cats' 의 벡터  (모양: 3x4)\n\nd_k = X.shape[1]                   # 벡터 차원 수(4) — 점수 크기 조절에 사용\n\n# 2) Q,K,V 를 만드는 가중치 행렬(학습 대상). 재현을 위해 seed 고정 후 무작위 생성\ntorch.manual_seed(0)               # 매번 같은 난수가 나오게 고정(결과 재현용)\nWq = torch.randn(d_k, d_k)         # Query 변환 행렬 (4x4)\nWk = torch.randn(d_k, d_k)         # Key 변환 행렬 (4x4)\nWv = torch.randn(d_k, d_k)         # Value 변환 행렬 (4x4)\n\nQ = X @ Wq                         # 각 단어의 '질문' 벡터 (3x4)\nK = X @ Wk                         # 각 단어의 '이름표' 벡터 (3x4)\nV = X @ Wv                         # 각 단어의 '내용' 벡터 (3x4)\n\n# 3) 점수 = Q와 K의 닮은 정도(내적), 그리고 sqrt(d_k)로 나눠 값이 너무 커지는 것을 방지\nscores = Q @ K.transpose(0, 1) / (d_k ** 0.5)   # (3x3) 단어쌍 점수표\n\n# 4) softmax 로 각 행의 합이 1인 '집중 비율'(Attention 가중치)로 변환\nattn = F.softmax(scores, dim=-1)   # (3x3), 각 행 합 = 1\n\n# 5) 가중치대로 Value 를 섞어 문맥이 반영된 새 표현을 만든다\nout = attn @ V                     # (3x4) 최종 출력\n\nprint(\"Attention 가중치:\\n\", attn.round(decimals=2))  # 결과: 0~1 사이 값의 3x3 표\nprint(\"각 행의 합:\", attn.sum(dim=-1))                 # 결과: tensor([1., 1., 1.])",
        "note": "Q·K로 점수를 내고 softmax로 집중 비율을 구한 뒤 V를 섞는 Attention의 전 과정을 한 흐름에 담았다.\n각 행의 합이 1로 나오면 정상 동작이다."
      }
    ]
  },
  "transformer-2": {
    "theory": [
      {
        "h": "Multi-Head: 한 글을 여러 시선으로 동시에 읽기",
        "body": "Attention 한 개는 문장을 한 가지 관점에서만 봅니다.\nMulti-Head Attention은 그런 Attention을 여러 개(예: 8개) 나란히 두고 동시에 돌립니다.\n어떤 헤드는 문법 관계를, 다른 헤드는 의미 관계를 보는 식으로 서로 다른 '시선'을 학습합니다.\n\n이는 같은 보고서를 마케팅·법무·개발 담당자가 각자 다른 눈으로 읽고 의견을 모으는 회의와 비슷합니다.\n여러 시선의 결과를 이어 붙여 합치면, 한 가지 시선보다 훨씬 풍부한 문맥 표현을 얻습니다."
      },
      {
        "h": "순서를 모르는 모델에 자리표를 붙이는 Positional Encoding",
        "body": "Transformer는 단어를 한 줄씩 읽지 않고 한꺼번에 펼쳐 봅니다.\n덕분에 빠르지만, 대신 '누가 먼저인지'라는 순서 정보를 자연스럽게 알 수 없습니다.\n'나는 너를 좋아해'와 '너는 나를 좋아해'는 단어가 같아도 순서 때문에 뜻이 완전히 다릅니다.\n\n그래서 각 단어 임베딩에 '몇 번째 자리'를 뜻하는 위치 신호를 더해줍니다.\n극장 좌석에 번호표를 붙여 누가 어디 앉았는지 알게 하는 것과 같습니다.\n이 위치표 덕분에 모델이 순서가 중요한 문장도 올바르게 이해합니다."
      },
      {
        "h": "BERT는 독해, GPT는 작문에 강하다",
        "body": "Transformer는 Encoder와 Decoder 두 부분으로 나뉩니다.\nEncoder만 쓰는 BERT는 문장을 앞뒤 양방향으로 읽어 '이해·분류·검색'에 강합니다.\n빈칸 채우기 시험을 잘 보는 학생이라고 생각하면 됩니다.\n\nDecoder만 쓰는 GPT는 앞 단어들만 보고 다음 단어를 이어 쓰는 데 특화돼 '생성·대화'에 강합니다.\n글을 술술 써 내려가는 작가에 가깝습니다.\nT5는 둘 다 써서 '번역·요약'처럼 입력을 받아 새 글을 출력하는 작업을 잘합니다.\n그래서 분류엔 BERT, 챗봇엔 GPT처럼 목적에 맞게 골라 씁니다."
      }
    ],
    "realCode": [
      {
        "title": "사전학습 모델로 문장 임베딩 추출 후 유사도 비교 (엔드투엔드)",
        "lang": "python",
        "code": "from transformers import AutoTokenizer, AutoModel   # 토크나이저와 모델 본체를 불러옴\nimport torch                                         # 텐서 계산과 평균/유사도 계산용\n\nname = \"sentence-transformers/all-MiniLM-L6-v2\"      # 문장 임베딩에 특화된 가벼운 사전학습 모델\ntokenizer = AutoTokenizer.from_pretrained(name)       # 텍스트를 토큰 ID로 바꿀 도구\nmodel = AutoModel.from_pretrained(name)               # 임베딩을 만들어내는 신경망\n\nsents = [\"강아지가 공을 문다\",                        # 0번 문장\n         \"개가 공놀이를 한다\",                        # 1번 문장(0번과 의미 비슷)\n         \"주식 시장이 폭락했다\"]                       # 2번 문장(전혀 다른 주제)\n\nenc = tokenizer(sents, padding=True, truncation=True, return_tensors=\"pt\")  # 한꺼번에 토큰화\n\nwith torch.no_grad():                                 # 추론만 할 거라 기울기 계산을 꺼서 빠르게\n    out = model(**enc)                                # 모델 통과 → 토큰별 벡터(last_hidden_state)\n\n# mean pooling: 토큰 벡터들을 평균내 문장 1개당 벡터 1개로 압축\nmask = enc[\"attention_mask\"].unsqueeze(-1)            # 실제 단어 위치만 1로 표시(패딩 제외)\nsummed = (out.last_hidden_state * mask).sum(dim=1)    # 실제 토큰 벡터만 더함\ncounts = mask.sum(dim=1)                              # 문장별 실제 토큰 개수\nemb = summed / counts                                 # 평균 = 문장 임베딩 (문장수 x 차원)\n\n# 코사인 유사도: 1에 가까울수록 의미가 비슷\nsim_01 = torch.cosine_similarity(emb[0], emb[1], dim=0)  # 0번 vs 1번(비슷한 쌍)\nsim_02 = torch.cosine_similarity(emb[0], emb[2], dim=0)  # 0번 vs 2번(다른 쌍)\n\nprint(\"비슷한 문장 유사도:\", round(sim_01.item(), 3))   # 결과: 0.7 안팎의 높은 값\nprint(\"다른 문장 유사도:\", round(sim_02.item(), 3))     # 결과: 0.2 안팎의 낮은 값",
        "note": "사전학습 모델로 문장을 벡터로 바꾼 뒤 코사인 유사도를 재면, 의미가 비슷한 문장끼리 점수가 높게 나온다.\n이것이 RAG·검색의 기본 원리다."
      }
    ]
  },
  "python-1": {
    "theory": [
      {
        "h": "왜 데이터 분석에 Python을 쓰나요?",
        "body": "Python 은 사람이 쓰는 말과 비슷하게 읽혀서 처음 배우는 사람도 코드를 술술 따라 읽을 수 있다.\n게다가 데이터를 다루는 도구(Pandas, NumPy 같은 라이브러리)가 무료로 잘 갖춰져 있어 엑셀로는 버거운 수십만 줄 데이터도 거뜬히 처리한다.\n\n비유하자면 엑셀이 손으로 칸을 채우는 모눈종이라면, Python 은 '이 조건이면 이렇게 처리해'라고 규칙만 적어 두면 알아서 수백만 칸을 채워 주는 자동 계산기다.\n그래서 반복 작업이 많은 실무 데이터 정리에서 시간을 크게 아껴 준다."
      },
      {
        "h": "자료구조를 골라 쓰는 기준",
        "body": "데이터를 담을 그릇은 여러 종류가 있고, 무엇을 담느냐에 따라 알맞은 그릇이 다르다.\n순서가 중요하고 나중에 값을 바꿀 거라면 리스트를 쓰고, 이름으로 값을 빠르게 찾고 싶다면 딕셔너리를 쓴다.\n\n예를 들어 학생 점수를 그냥 줄 세우면 리스트지만, 홍길동의 점수처럼 이름으로 찾으려면 딕셔너리가 편하다.\n한 번 정하면 바뀌면 안 되는 값(예: 위도·경도 한 쌍)은 튜플에 담아 실수로 수정되는 일을 막는다."
      },
      {
        "h": "반복문과 함수가 일을 줄여 주는 이유",
        "body": "데이터가 10개일 때는 손으로 처리해도 되지만 10만 개면 불가능하다.\n반복문은 한 줄짜리 규칙을 데이터 수만큼 자동으로 적용해 주므로, 데이터가 아무리 많아도 코드는 그대로다.\n\n함수는 그 규칙에 이름을 붙여 두는 것이라, 같은 처리를 여러 곳에서 다시 쓸 때 복사·붙여넣기 대신 이름만 부르면 된다.\n이렇게 하면 코드가 짧아지고, 한 군데만 고쳐도 전체가 함께 고쳐져 실수가 줄어든다."
      }
    ],
    "realCode": [
      {
        "title": "지저분한 주문 데이터를 정제하는 전처리 스크립트",
        "lang": "python",
        "code": "import numpy as np  # 숫자 배열을 빠르게 계산하기 위한 NumPy 라이브러리를 불러온다\n\n# 실무에서 받는 데이터는 보통 이렇게 빈값·이상치가 섞여 '지저분'하다\norders = [12000, 0, 35000, -1, 8000, None, 21000]  # 주문 금액 목록(0·음수·None 은 잘못된 값)\n\nclean = []  # 정상 금액만 모아 둘 빈 리스트를 준비한다\n\nfor price in orders:          # orders 안의 값을 하나씩 price 에 꺼내 반복한다\n    if price is None:         # 값이 비어 있으면(None)\n        continue              # 건너뛰고 다음 값으로 넘어간다\n    if price <= 0:            # 금액이 0 이하인 잘못된 값이면\n        continue              # 역시 건너뛴다\n    clean.append(price)       # 위 검사를 모두 통과한 정상 금액만 담는다\n\nprices = np.array(clean)      # 정제된 리스트를 NumPy 배열로 바꿔 한꺼번에 계산할 준비\n\nwith_tax = prices * 1.1       # 모든 금액에 부가세 10%를 한 줄로 더한다(반복문 불필요)\n\nsummary = {                                   # 결과 요약을 사전 형태로 정리\n    '건수': len(prices),                      # 정상 주문 개수\n    '합계': int(prices.sum()),                # 금액 총합(정수로 변환)\n    '평균': round(float(prices.mean())),      # 평균 금액(소수 반올림)\n}\n\nprint('정제 전 개수:', len(orders))           # 결과: 정제 전 개수: 7\nprint('정제 후 개수:', len(prices))           # 결과: 정제 후 개수: 5\nprint('부가세 포함:', with_tax)               # 결과: 부가세 포함: [13200. 38500.  8800. 23100.]\nprint('요약:', summary)                        # 결과: 요약: {'건수': 5, '합계': 76000, '평균': 15200}",
        "note": "실무 데이터는 거의 항상 빈값·이상치가 섞여 있어 걸러내기 → 배열 변환 → 요약이 전처리의 기본 골격이다."
      }
    ]
  },
  "python-2": {
    "theory": [
      {
        "h": "Pandas의 DataFrame이 엑셀보다 강력한 이유",
        "body": "DataFrame 은 화면에 표로 보이지만, 그 안에서는 한 열 전체에 같은 규칙을 한 줄로 적용할 수 있다.\n예를 들어 모든 금액에 부가세를 더해라를 엑셀은 셀마다 수식을 끌어 내려야 하지만, Pandas 는 df['price'] * 1.1 한 줄이면 끝난다.\n\n또한 수십만 줄이 넘어가도 속도가 거의 떨어지지 않고, 결측치 처리·그룹 집계·표 합치기 같은 실무 작업이 함수 하나로 준비돼 있다.\n비유하면 엑셀이 한 칸씩 손으로 채우는 도구라면, Pandas 는 열 단위로 명령을 내리는 자동화 도구다."
      },
      {
        "h": "지저분한 데이터를 깨끗이 만드는 과정",
        "body": "현실의 데이터에는 빈칸(결측치)과 말도 안 되는 값(이상치)이 섞여 있어 그대로 평균을 내면 결과가 엉뚱해진다.\n그래서 분석 전에 비어 있으면 어떻게 할지, 너무 크거나 작은 값은 어떻게 할지를 먼저 정한다.\n\n빈칸은 행을 통째로 버리거나(dropna), 평균·0 같은 값으로 채워(fillna) 메운다.\n이상치는 상식적인 범위를 정해 그 밖의 값을 걸러 내거나 따로 떼어 살펴본다.\n이 정제 단계를 건너뛰면 뒤의 모든 분석이 오염되므로 가장 공들여야 하는 부분이다."
      },
      {
        "h": "왜 그래프로 그려 봐야 하나요?",
        "body": "숫자 표만 보면 데이터의 흐름이나 튀는 값을 알아채기 어렵다.\n같은 데이터라도 막대그래프나 산점도로 그리면 월요일에만 매출이 뚝 떨어진다 같은 패턴이 한눈에 보인다.\n\n시각화는 분석가가 데이터와 대화하는 방법이라, 그래프를 그리다 보면 미처 몰랐던 질문이 떠오른다.\n그래서 EDA 단계에서는 결론을 내기 전에 여러 각도로 그려 보며 데이터의 성격을 충분히 파악하는 것이 중요하다."
      }
    ],
    "realCode": [
      {
        "title": "CSV 적재부터 정제·집계·시각화까지 EDA 전 과정",
        "lang": "python",
        "code": "import pandas as pd            # 표 형태 데이터를 다루는 Pandas 라이브러리\nimport seaborn as sns          # 통계 그래프를 쉽게 그려 주는 시각화 라이브러리\nimport matplotlib.pyplot as plt  # 그래프 출력을 제어하는 기본 도구\n\ndf = sns.load_dataset('tips')  # 연습용 식당 팁 데이터를 표(DataFrame)로 불러온다\n\nprint(df.shape)                # 행·열 개수 확인 → 결과: (244, 7)\nprint(df.isna().sum().sum())   # 전체 결측치 총개수 확인 → 결과: 0\n\ndf = df.dropna()               # 혹시 빈칸이 있으면 그 행을 통째로 제거해 데이터를 깨끗이 한다\n\n# total_bill(결제액)이 비정상적으로 큰 이상치를 상위 범위로 제한한다\ndf = df[df['total_bill'] <= 50]  # 50 이하 주문만 남겨 극단값 영향을 줄인다\n\n# 새 파생 열: 팁 비율(팁 / 결제액 * 100)을 계산해 분석에 추가한다\ndf['tip_pct'] = df['tip'] / df['total_bill'] * 100  # 한 줄로 모든 행에 적용\n\n# 요일(day)별로 묶어 평균 팁 비율을 집계한다\nby_day = df.groupby('day')['tip_pct'].mean()  # groupby: 같은 요일끼리 모아 평균\nprint(by_day)                  # 결과: 요일별 평균 팁 비율(%) 출력\n\n# 집계 결과를 막대그래프로 그려 한눈에 비교한다\nsns.barplot(data=df, x='day', y='tip_pct')  # x=요일, y=팁비율 막대그래프\nplt.title('day tip percent')                 # 그래프 제목을 단다\nplt.savefig('tip_by_day.png')                # 그림을 파일로 저장한다\n\ndf.to_csv('tips_clean.csv', index=False)     # 정제된 표를 CSV 파일로 저장(인덱스 제외)\nprint('저장 완료')             # 결과: 저장 완료",
        "note": "적재 → 결측·이상치 정제 → 파생 열 생성 → groupby 집계 → 시각화 → 저장으로 이어지는 EDA 의 표준 흐름을 한 번에 보여 준다."
      }
    ]
  },
  "prompt-1": {
    "theory": [
      {
        "h": "LLM은 '다음에 올 단어'를 맞히는 기계다",
        "body": "LLM(거대 언어모델)은 똑똑한 인공지능처럼 보이지만, 속을 들여다보면 '바로 다음에 올 단어가 무엇일지'를 확률로 맞히는 일을 아주 잘하는 기계다.\n예를 들어 '하늘은 파랗고 잔디는' 다음에 사람들은 보통 '푸르다'를 떠올리는데, 모델도 수많은 글을 학습해 이런 다음 단어의 확률을 계산한다.\n그래서 우리가 어떤 문장으로 운을 떼느냐(=프롬프트)에 따라, 모델이 이어 붙이는 단어들이 완전히 달라진다.\n\n결국 프롬프트는 모델의 머릿속 방향을 잡아 주는 '첫 단추'이고, 첫 단추를 잘 끼우면 원하는 답이 술술 나온다.\n프롬프트 엔지니어링이란 이 첫 단추를 잘 끼우는 기술을 말한다."
      },
      {
        "h": "좋은 프롬프트에는 '역할·지시·예시·제약'이 들어 있다",
        "body": "막연하게 '이거 정리해 줘'라고 하면 모델은 어떻게 정리할지 몰라 제멋대로 답한다.\n좋은 프롬프트는 보통 네 가지 재료를 갖춘다. 첫째는 역할(누구처럼 행동할지), 둘째는 지시(무엇을 할지), 셋째는 예시(어떤 형식으로 답할지), 넷째는 제약(무엇을 하면 안 되는지)이다.\n이는 신입사원에게 일을 시킬 때 '당신은 회계 담당이고, 이 영수증을 표로 정리하되, 금액은 원 단위로, 추측은 적지 말라'고 또박또박 알려 주는 것과 똑같다.\n\n네 재료가 분명할수록 모델은 헤매지 않고, 우리가 기대한 결과에 가깝게 답한다.\n반대로 재료가 빠지면 모델은 빈칸을 자기 마음대로 채우며 엉뚱한 답을 낼 수 있다."
      },
      {
        "h": "컨텍스트는 한정된 책상이다 - 토큰을 아껴 써라",
        "body": "모델은 한 번에 일정 분량의 글까지만 읽고 기억할 수 있는데, 이 한도를 컨텍스트 윈도우라고 한다.\n이것은 책상 넓이에 비유할 수 있다. 책상이 좁으면 필요한 서류만 골라 올려야 하고, 욕심껏 다 올리면 정작 중요한 서류가 밀려 떨어진다.\n글의 분량은 토큰이라는 단위로 세는데, 토큰이 많아질수록 처리 시간이 길어지고 비용도 올라간다.\n\n그래서 실무에서는 긴 문서를 그대로 넣기보다, 핵심만 요약하거나 필요한 부분만 잘라 넣는 '컨텍스트 압축'을 한다.\n적은 토큰으로 같은 답을 얻을수록 빠르고 저렴하며, 모델이 핵심에 집중해 환각도 줄어든다."
      }
    ],
    "realCode": [
      {
        "title": "고객 문의 자동 분류·요약기 (역할·예시·제약을 모두 담은 엔드투엔드 프롬프트)",
        "lang": "python",
        "code": "# openai 라이브러리에서 OpenAI 클래스를 불러온다 (LLM에 연결하는 도구)\nfrom openai import OpenAI\n\n# 발급받은 API 키로 클라이언트를 생성한다 (모델과 통신하는 전화기 역할)\nclient = OpenAI(api_key=\"sk-여기에-본인-키-붙여넣기\")\n\n# system 메시지: 모델의 역할과 지켜야 할 제약(규칙)을 미리 정해 둔다\nsystem_prompt = (\n    \"너는 고객센터(CS) 분류 담당자다. \"          # 역할(role): 누구처럼 행동할지\n    \"카테고리는 '배송','환불','기타' 중 하나만 고른다. \"  # 제약(constraint): 답의 범위 한정\n    \"형식은 정확히 '카테고리 | 한줄요약' 으로만 답한다.\"   # 출력 형식 고정 (파싱하기 쉽게)\n)\n\n# Few-shot 예시: 입력 메일과 정답을 미리 보여 줘 답 형식을 흉내 내게 한다\nfew_shot = (\n    \"메일: 주문한 신발이 일주일째 안 와요 → 배송 | 신발 배송 지연 문의\\n\"  # 예시1\n    \"메일: 사이즈가 안 맞아 돈 돌려주세요 → 환불 | 사이즈 불일치 환불 요청\\n\" # 예시2\n)\n\n# 실제로 분류할 고객 문의 3건을 리스트에 담는다\nemails = [\n    \"택배가 배송중에서 멈췄어요\",        # 정답 기대: 배송\n    \"색상이 마음에 안 들어 반품하고 싶어요\", # 정답 기대: 환불\n    \"매장 영업시간이 어떻게 되나요\",       # 정답 기대: 기타\n]\n\n# 메일을 하나씩 꺼내 모델에 보내고 결과를 출력한다\nfor mail in emails:                       # emails 리스트를 한 건씩 반복\n    # user 메시지: 예시 + 이번에 분류할 실제 메일을 합쳐 보낸다\n    user_prompt = few_shot + f\"메일: {mail} →\"  # '→' 뒤를 모델이 채우게 유도\n    # 모델에 대화 형태로 요청을 보낸다\n    res = client.chat.completions.create(\n        model=\"gpt-4o-mini\",              # 사용할 모델 이름 (가볍고 저렴한 모델)\n        messages=[                        # 대화 메시지 목록\n            {\"role\": \"system\", \"content\": system_prompt}, # 기본 규칙 주입\n            {\"role\": \"user\", \"content\": user_prompt},     # 이번 질문\n        ],\n        temperature=0,                    # 0이면 매번 일관된(덜 무작위) 답을 준다\n    )\n    # 응답에서 모델이 만든 텍스트만 꺼내 양옆 공백을 제거한다\n    answer = res.choices[0].message.content.strip()\n    # 원본 메일과 분류 결과를 함께 출력한다\n    print(f\"[{mail}] => {answer}\")        # 결과 예: [택배가...] => 배송 | 배송 지연 문의\n",
        "note": "system에 역할·제약을, user에 Few-shot 예시를 넣어 형식을 고정한 전형적인 업무 프롬프트다.\ntemperature=0 으로 두면 같은 입력에 항상 비슷한 답이 나와 결과를 비교·검증하기 쉽다."
      }
    ]
  },
  "vue-1": {
    "theory": [
      {
        "h": "왜 프레임워크를 쓸까? (요리 도구 비유)",
        "body": "순수 HTML/JS만으로 화면을 만드는 것은 모든 재료를 맨손으로 손질하는 것과 같다.\n버튼을 누를 때마다 '어떤 글자를 어디에 다시 써라'를 사람이 일일이 코드로 지시해야 한다.\n화면이 복잡해질수록 이 지시문은 폭발적으로 늘어나 실수가 잦아진다.\n\nVue 같은 프레임워크는 잘 갖춰진 주방 도구 세트와 같다.\n우리는 '데이터'만 바꾸면 되고, 화면을 다시 그리는 귀찮은 일은 Vue가 알아서 해 준다.\n이렇게 데이터와 화면이 자동으로 연결되는 것을 '반응형(reactivity)'이라고 부른다."
      },
      {
        "h": "SFC: 화면 한 조각을 한 파일에 담는다",
        "body": "Vue는 화면을 '컴포넌트'라는 레고 블록 단위로 나눠서 만든다.\n블록 하나는 .vue 확장자를 가진 파일 하나에 담기는데, 이를 SFC(Single File Component)라 한다.\n한 파일 안에 화면 모양을 적는 <template>, 동작을 적는 <script>, 꾸밈을 적는 <style> 세 칸이 함께 들어간다.\n\n관련된 코드가 한 곳에 모여 있어 찾고 고치기가 쉽다.\n마치 '버튼'이라는 부품의 설명서·작동법·디자인을 한 봉투에 넣어두는 것과 같다.\n나중에는 이 블록들을 조립해 큰 화면을 완성한다."
      }
    ],
    "realCode": [
      {
        "title": "App.vue — 반응형 카운터 + 실시간 인사말 (엔드투엔드)",
        "lang": "vue",
        "code": "<script setup>\n// Vue가 제공하는 반응형 도구들을 가져온다(없으면 ref/computed를 쓸 수 없다)\nimport { ref, computed } from 'vue'\n\n// 버튼 클릭 횟수를 담는 반응형 변수: 초깃값 0, 값이 바뀌면 화면이 자동 갱신된다\nconst count = ref(0)\n// 입력칸에 적은 이름을 담는 반응형 변수: 초깃값은 빈 문자열\nconst name = ref('')\n\n// count가 바뀔 때만 자동으로 다시 계산되는 '2배 값'(파생 상태)\nconst doubled = computed(() => count.value * 2) // count가 3이면 doubled는 6\n\n// 버튼을 누르면 실행되는 함수: count 값을 1 증가시킨다\nfunction increase() {\n  count.value++ // .value 로 실제 숫자에 접근(ref는 상자라서 .value로 꺼낸다)\n}\n</script>\n\n<template>\n  <!-- 화면 전체를 감싸는 컨테이너 박스 -->\n  <div class=\"card\">\n    <!-- 현재 클릭 횟수를 보여줌: {{ }} 안의 값은 count가 바뀌면 자동 갱신 -->\n    <h2>눌린 횟수: {{ count }}</h2>\n    <!-- computed로 계산된 2배 값을 함께 표시 -->\n    <p>2배 값: {{ doubled }}</p>\n    <!-- @click 은 v-on:click 의 줄임말: 누르면 increase 함수 실행 -->\n    <button @click=\"increase\">+1 누르기</button>\n\n    <!-- v-model: 입력칸과 name 변수를 양방향으로 연결(타이핑하면 name이 즉시 바뀜) -->\n    <input v-model=\"name\" placeholder=\"이름을 입력하세요\" />\n    <!-- 입력한 이름으로 인사말을 실시간 출력 -->\n    <p>안녕하세요, {{ name }}님!</p>\n  </div>\n</template>\n\n<style scoped>\n/* scoped: 이 스타일을 이 컴포넌트 안에서만 적용(다른 화면에 영향 없음) */\n.card { padding: 20px; border: 1px solid #ddd; border-radius: 12px; }\nbutton { margin: 8px 0; padding: 8px 16px; }\n</style>",
        "note": "ref로 만든 값은 script에서는 .value로 접근하지만, 템플릿 {{ }} 안에서는 .value 없이 바로 쓴다."
      }
    ]
  },
  "vue-2": {
    "theory": [
      {
        "h": "props와 emit: 물은 위에서 아래로, 신호는 아래에서 위로",
        "body": "Vue의 컴포넌트는 부모-자식 관계를 이룬다.\n데이터는 부모에서 자식으로 'props'를 타고 내려간다(마치 물이 위에서 아래로 흐르듯이).\n자식은 받은 props를 마음대로 바꾸지 않고 화면에 보여주는 데만 쓴다.\n\n그렇다면 자식이 무언가 바꾸고 싶을 때는 어떻게 할까?\n자식은 직접 바꾸지 않고 'emit'으로 부모에게 신호만 올려보낸다.\n실제 값을 바꾸는 일은 데이터 주인인 부모가 처리한다.\n이렇게 '데이터는 아래로, 변경 요청은 위로'라는 한 방향 규칙 덕분에 흐름이 헷갈리지 않는다."
      },
      {
        "h": "Composition API: 흩어진 로직을 한곳에 모으기",
        "body": "예전 방식(Options API)은 data·methods·computed처럼 종류별 칸에 코드를 나눠 담았다.\n기능 하나를 이해하려면 여러 칸을 왔다 갔다 해야 해서 큰 컴포넌트에서는 불편했다.\n\nComposition API는 '기능 단위'로 코드를 모은다.\n예를 들어 '검색' 관련 상태·함수·감시를 setup 안 한 곳에 나란히 둔다.\n이 묶음을 use검색() 같은 컴포저블 함수로 빼내면 다른 화면에서도 그대로 재사용할 수 있다.\n레시피(로직)를 한 장의 카드로 만들어 어디서든 꺼내 쓰는 것과 같다."
      }
    ],
    "realCode": [
      {
        "title": "TodoItem.vue(자식) + App.vue(부모) 통신 전체 코드",
        "lang": "vue",
        "code": "<!-- ===== 자식: src/components/TodoItem.vue ===== -->\n<script setup>\n// 부모가 내려줄 데이터(props) 통로를 정의: text(할 일 글자), done(완료 여부)\nconst props = defineProps(['text', 'done'])\n// 부모에게 보낼 신호(emit) 종류를 정의: toggle(체크 전환), remove(삭제)\nconst emit = defineEmits(['toggle', 'remove'])\n</script>\n\n<template>\n  <!-- 한 줄짜리 할 일 항목 -->\n  <li>\n    <!-- 체크박스: 현재 done 값을 표시하고, 바뀌면 부모에게 toggle 신호 전송 -->\n    <input type=\"checkbox\" :checked=\"done\" @change=\"emit('toggle')\" />\n    <!-- done이 true면 취소선 스타일 적용(완료 표시), props로 받은 text 출력 -->\n    <span :style=\"{ textDecoration: done ? 'line-through' : 'none' }\">{{ text }}</span>\n    <!-- 삭제 버튼: 누르면 부모에게 remove 신호 전송 -->\n    <button @click=\"emit('remove')\">삭제</button>\n  </li>\n</template>",
        "note": "자식은 데이터를 직접 바꾸지 않고 emit으로 알리기만 한다 — 실제 변경은 부모가 한다."
      },
      {
        "title": "App.vue(부모) — 목록 관리와 추가/체크/삭제 처리",
        "lang": "vue",
        "code": "<script setup>\n// 반응형 도구 ref와 자식 컴포넌트를 가져온다\nimport { ref } from 'vue'\nimport TodoItem from './components/TodoItem.vue'\n\n// 할 일 목록(반응형 배열): 각 항목은 글자와 완료여부를 가진다\nconst todos = ref([{ text: '우유 사기', done: false }])\n// 입력칸과 연결할 새 할 일 글자\nconst newText = ref('')\n\n// '추가' 버튼이 누르면 실행: 빈 값이 아니면 목록에 새 항목을 넣는다\nfunction addTodo() {\n  if (newText.value.trim() === '') return // 공백만 입력하면 무시\n  todos.value.push({ text: newText.value, done: false }) // 목록 끝에 추가\n  newText.value = '' // 입력칸 비우기\n}\n\n// 자식의 toggle 신호 처리: 해당 항목의 완료여부를 반대로 뒤집는다\nfunction toggle(index) {\n  todos.value[index].done = !todos.value[index].done\n}\n\n// 자식의 remove 신호 처리: 해당 위치의 항목을 배열에서 1개 제거\nfunction remove(index) {\n  todos.value.splice(index, 1)\n}\n</script>\n\n<template>\n  <div>\n    <h2>할 일 목록</h2>\n    <!-- 입력칸: newText와 양방향 연결, 엔터 치면 addTodo 실행 -->\n    <input v-model=\"newText\" @keyup.enter=\"addTodo\" placeholder=\"할 일 입력\" />\n    <button @click=\"addTodo\">추가</button>\n\n    <ul>\n      <!-- 목록을 반복 출력: index도 함께 받아 어떤 항목인지 식별 -->\n      <TodoItem\n        v-for=\"(t, index) in todos\"\n        :key=\"index\"\n        :text=\"t.text\"\n        :done=\"t.done\"\n        @toggle=\"toggle(index)\"\n        @remove=\"remove(index)\"\n      />\n    </ul>\n  </div>\n</template>",
        "note": ":text/:done은 데이터를 내려주는 props, @toggle/@remove는 자식이 올린 신호를 받는 부분이다."
      }
    ]
  },
  "vue-3": {
    "theory": [
      {
        "h": "SPA와 라우팅: 책장을 통째로 갈지 않고 페이지만 넘긴다",
        "body": "옛날 웹사이트는 메뉴를 누를 때마다 서버에서 새 HTML을 통째로 받아 화면이 깜빡였다.\nSPA는 처음 한 번만 앱을 받아두고, 이후에는 필요한 부분만 자바스크립트로 갈아 끼운다.\n그래서 화면 전환이 깜빡임 없이 매우 빠르다.\n\n이때 '어떤 주소면 어떤 화면을 보여줄지' 정하는 것이 라우팅이다.\n책 한 권(앱)을 통째로 들고 다니면서 페이지(화면)만 휙휙 넘기는 것과 같다.\nVue Router가 이 페이지 넘김을 담당하며, router-link로 이동하고 router-view에 해당 페이지를 그린다."
      },
      {
        "h": "Pinia: 여러 방이 함께 보는 공용 칠판",
        "body": "장바구니 개수처럼 여러 화면이 함께 봐야 하는 데이터가 있다.\nprops/emit으로 이걸 매번 위아래로 전달하면, 화면이 많아질수록 너무 번거롭다.\n\nPinia는 모든 화면이 함께 보는 '공용 칠판' 하나를 만들어 준다.\n어느 화면에서든 칠판의 숫자를 읽을 수 있고, actions로 안전하게 고칠 수 있다.\n칠판 값이 바뀌면 그 값을 쓰는 모든 화면이 자동으로 함께 갱신된다.\n덕분에 데이터가 흩어지지 않고 한 곳에서 관리되어 흐름을 추적하기 쉽다."
      }
    ],
    "realCode": [
      {
        "title": "router/index.js + stores/cart.js — 라우터와 전역 스토어 설정",
        "lang": "javascript",
        "code": "// ===== src/router/index.js (페이지 경로 설정) =====\n// 라우터를 만드는 함수와 브라우저 주소 모드를 가져온다\nimport { createRouter, createWebHistory } from 'vue-router'\n// 연결할 페이지 컴포넌트들을 가져온다\nimport ProductList from '../views/ProductList.vue'\nimport ProductDetail from '../views/ProductDetail.vue'\n\n// 주소(path)와 보여줄 컴포넌트를 짝지은 표\nconst routes = [\n  { path: '/', component: ProductList }, // 기본 주소 → 상품 목록\n  { path: '/product/:id', component: ProductDetail } // :id는 상품 번호(변수)\n]\n\n// 라우터 객체 생성: history 모드는 주소에 # 없이 깔끔하게 표시\nconst router = createRouter({ history: createWebHistory(), routes })\n\n// 다른 파일에서 쓸 수 있게 내보낸다\nexport default router\n\n// ===== src/stores/cart.js (전역 장바구니 스토어) =====\nimport { defineStore } from 'pinia'\n\n// 'cart'라는 이름의 전역 스토어를 정의한다\nexport const useCartStore = defineStore('cart', {\n  // state: 보관할 데이터(담은 상품 목록)\n  state: () => ({ items: [] }),\n  // getters: 데이터로부터 계산되는 값(담긴 개수)\n  getters: {\n    count: (state) => state.items.length // 결과 예: 2\n  },\n  // actions: 데이터를 바꾸는 함수들\n  actions: {\n    addItem(product) {\n      this.items.push(product) // 장바구니에 상품 추가\n    }\n  }\n})",
        "note": "라우터는 '주소→화면' 표이고, Pinia 스토어는 state·getters·actions 세 칸으로 전역 데이터를 관리한다."
      },
      {
        "title": "ProductDetail.vue — 주소의 id 읽어 상세 표시 + 장바구니 담기",
        "lang": "vue",
        "code": "<script setup>\n// 현재 주소 정보를 읽는 도구와 전역 장바구니 스토어를 가져온다\nimport { useRoute } from 'vue-router'\nimport { useCartStore } from '../stores/cart'\n\n// 현재 페이지의 주소 정보(파라미터 포함)\nconst route = useRoute()\n// 전역 장바구니 스토어 인스턴스\nconst cart = useCartStore()\n\n// 예시용 상품 데이터(실무에서는 보통 서버에서 받아온다)\nconst products = [\n  { id: '1', name: '키보드', price: 30000 },\n  { id: '2', name: '마우스', price: 15000 }\n]\n// 주소의 id(route.params.id)와 일치하는 상품을 찾는다\nconst product = products.find(p => p.id === route.params.id)\n</script>\n\n<template>\n  <div>\n    <!-- 찾은 상품의 이름과 가격을 표시 -->\n    <h2>{{ product.name }}</h2>\n    <p>가격: {{ product.price }}원</p>\n    <!-- 담기 버튼: 누르면 전역 스토어의 addItem 실행 -->\n    <button @click=\"cart.addItem(product)\">장바구니 담기</button>\n    <!-- 현재 담긴 개수를 전역 스토어에서 바로 읽어 표시 -->\n    <p>현재 담긴 개수: {{ cart.count }}</p>\n    <!-- 목록으로 돌아가는 링크 -->\n    <router-link to=\"/\">← 목록으로</router-link>\n  </div>\n</template>",
        "note": "route.params.id로 주소의 변수 부분을 읽고, cart.count는 어느 화면에서든 같은 값을 가리킨다."
      }
    ]
  },
  "vue-4": {
    "theory": [
      {
        "h": "비동기와 API: 식당에서 주문하고 기다리기",
        "body": "웹앱은 보통 자기 데이터를 서버에서 받아온다.\n서버에 데이터를 요청하는 창구가 API이고, 주고받는 데이터 형식이 JSON이다.\n\n서버 응답은 즉시 오지 않고 약간의 시간이 걸린다.\n이때 화면이 멈춰 버리면 안 되므로 '비동기'로 처리한다.\n식당에서 주문(요청)을 넣고 음식이 나올 때까지 다른 일을 하다가, 나오면(응답) 받아 먹는 것과 같다.\nasync/await를 쓰면 이 '기다렸다가 이어서'를 읽기 쉬운 코드로 표현할 수 있다.\n응답을 기다리는 동안에는 '불러오는 중', 실패하면 '오류'를 보여주는 배려가 필요하다."
      },
      {
        "h": "빌드와 배포: 원고를 인쇄해서 서점에 내놓기",
        "body": "개발 중에 쓰는 코드는 사람이 읽기 좋게 여러 파일로 흩어져 있다.\n이대로는 인터넷에 올려도 느리고 비효율적이다.\n그래서 npm run build로 코드를 잘게 압축·정리해 dist라는 폴더에 묶는다.\n이것은 손으로 쓴 원고를 책으로 인쇄하는 것과 같다.\n\n이렇게 만든 dist 폴더의 파일들은 그냥 '정적 파일'이라 어떤 웹 호스팅에도 쉽게 올릴 수 있다.\nNetlify, Vercel, GitHub Pages 같은 곳에 올리면 전 세계 누구나 주소로 접속할 수 있다.\n인쇄한 책을 서점 책장에 꽂아 손님이 사 볼 수 있게 하는 것과 같다."
      }
    ],
    "realCode": [
      {
        "title": "UserList.vue — API 호출 + 로딩/에러 처리 + 폼 추가(엔드투엔드)",
        "lang": "vue",
        "code": "<script setup>\n// 반응형 도구와 화면 등장 시점 훅, HTTP 도구를 가져온다\nimport { ref, onMounted } from 'vue'\nimport axios from 'axios'\n\n// .env에 적어둔 API 기본 주소를 읽는다(코드에 주소를 직접 박지 않기 위함)\nconst API = import.meta.env.VITE_API_URL\n\n// 화면 상태 변수들\nconst users = ref([])      // 받아온 사용자 목록\nconst loading = ref(true)  // 불러오는 중인지 여부\nconst error = ref('')      // 에러 메시지\nconst name = ref('')       // 폼: 이름 입력값\nconst email = ref('')      // 폼: 이메일 입력값\n\n// 서버에서 사용자 목록을 비동기로 불러오는 함수\nasync function loadUsers() {\n  try {\n    loading.value = true                       // 시작: 로딩 표시 켜기\n    const res = await axios.get(API + '/users') // 서버에 GET 요청(응답을 기다림)\n    users.value = res.data                      // 받은 데이터를 목록에 저장\n  } catch (e) {\n    error.value = '데이터를 불러오지 못했어요.'  // 실패 시 에러 메시지 설정\n  } finally {\n    loading.value = false                       // 성공/실패 상관없이 로딩 끄기\n  }\n}\n\n// 화면이 처음 나타날 때 자동으로 목록을 불러온다\nonMounted(loadUsers)\n\n// 폼 제출: 새 사용자를 검증 후 서버에 보내고 목록에 추가\nasync function addUser() {\n  if (name.value.trim() === '' || !email.value.includes('@')) { // 유효성 검사\n    alert('이름과 올바른 이메일을 입력하세요.')                  // 잘못되면 경고\n    return                                                       // 중단\n  }\n  const res = await axios.post(API + '/users', { name: name.value, email: email.value }) // 서버에 POST\n  users.value.unshift(res.data)  // 목록 맨 앞에 새 사용자 추가\n  name.value = ''                // 입력칸 비우기\n  email.value = ''               // 입력칸 비우기\n}\n</script>\n\n<template>\n  <div>\n    <h2>사용자 목록</h2>\n    <!-- 불러오는 중이면 안내 문구 표시 -->\n    <p v-if=\"loading\">불러오는 중...</p>\n    <!-- 에러가 있으면 빨간 에러 메시지 표시 -->\n    <p v-else-if=\"error\" style=\"color:red\">{{ error }}</p>\n    <!-- 정상일 때 목록 출력 -->\n    <ul v-else>\n      <!-- 각 사용자 카드: 고유 id를 key로 지정 -->\n      <li v-for=\"u in users\" :key=\"u.id\">{{ u.name }} — {{ u.email }}</li>\n    </ul>\n\n    <!-- 새 사용자 입력 폼 -->\n    <input v-model=\"name\" placeholder=\"이름\" />\n    <input v-model=\"email\" placeholder=\"이메일\" />\n    <button @click=\"addUser\">추가</button>\n  </div>\n</template>",
        "note": "try/catch/finally로 로딩·에러를 안전하게 다루고, .env의 주소를 import.meta.env로 읽어 환경마다 바꿔 쓴다."
      }
    ]
  },
  "webproject-1": {
    "theory": [
      {
        "h": "왜 코드부터 짜지 않고 기획부터 할까?",
        "body": "집을 지을 때 설계도 없이 벽돌부터 쌓으면 나중에 다 부수고 다시 지어야 한다.\n웹 서비스도 똑같아서 무엇을 만들지 정하지 않고 코드부터 짜면 방향이 자꾸 바뀐다.\n기획은 '무엇을 왜 만드는가'를 먼저 글과 그림으로 정리하는 단계다.\n이 단계에서 종이에 한 번 그려보면 코드로 고치는 것보다 훨씬 싸고 빠르게 실수를 잡는다.\n\n특히 미니 프로젝트는 시간이 짧기 때문에 기획에서 '꼭 필요한 기능'만 골라내는 일이 가장 중요하다.\n욕심내서 기능을 많이 넣으면 시간 안에 하나도 못 끝내기 쉽다."
      },
      {
        "h": "와이어프레임과 데이터 모델은 한 쌍이다",
        "body": "와이어프레임은 화면에 '무엇이 보이는가'를 그린 밑그림이다.\n예를 들어 맛집 목록 화면에는 가게 이름, 별점, 사진이 보여야 한다.\n그러면 자연스럽게 데이터 모델에는 name, rating, image 같은 항목이 필요하다는 걸 알 수 있다.\n즉 화면을 먼저 그리면 어떤 데이터가 필요한지가 거꾸로 보인다.\n\n그래서 화면(와이어프레임)과 데이터(모델)를 나란히 놓고 설계하면 빠진 정보를 빨리 발견할 수 있다.\n이 둘을 따로 만들면 나중에 화면은 있는데 데이터가 없는 일이 생긴다."
      }
    ],
    "realCode": [
      {
        "title": "화면에 채울 목업 데이터(mock.json) — 가짜 데이터로 설계 검증하기",
        "lang": "javascript",
        "code": "// mock.json 은 실제 서버 없이도 화면을 그려보기 위한 '가짜 데이터'다\n// 아직 백엔드가 없으니 이 데이터를 가지고 화면이 잘 나오는지 먼저 확인한다\n[\n  {\n    \"id\": 1,                       // 각 항목을 구분하는 고유 번호(겹치면 안 됨)\n    \"name\": \"행복 김밥\",            // 가게 이름 → 목록 화면 제목으로 사용\n    \"rating\": 4.5,                 // 별점(0~5) → 별 아이콘 개수 계산에 사용\n    \"tags\": [\"분식\", \"가성비\"],    // 분류 태그 → 필터 버튼 만들 때 사용\n    \"memo\": \"점심에 줄 서는 집\"     // 한 줄 메모 → 상세 화면 본문\n  },\n  {\n    \"id\": 2,                       // 두 번째 항목의 고유 번호\n    \"name\": \"미소 카페\",            // 두 번째 가게 이름\n    \"rating\": 4.0,                 // 두 번째 가게 별점\n    \"tags\": [\"카페\", \"디저트\"],    // 두 번째 가게 태그\n    \"memo\": \"조용해서 작업하기 좋음\" // 두 번째 가게 메모\n  }\n]\n// 이 파일을 화면 컴포넌트에서 불러오면(import) 진짜 서버처럼 흉내 낼 수 있다",
        "note": "서버를 만들기 전 단계라 가짜 데이터로 화면을 먼저 검증한다.\n여기서 정한 키 이름(id·name·rating)이 나중에 데이터베이스 컬럼 이름이 된다."
      }
    ]
  },
  "webproject-2": {
    "theory": [
      {
        "h": "화면을 통째로 만들지 말고 부품으로 쪼개라",
        "body": "레고를 생각하면 쉽다.\n작은 블록(부품)을 여러 개 만들어 끼워 맞추면 큰 모형이 된다.\n웹 화면도 카드 하나, 버튼 하나를 컴포넌트라는 부품으로 만들고 그것을 모아 큰 화면을 짠다.\n이렇게 하면 같은 카드를 100번 그려야 할 때 부품 하나만 만들고 100번 반복해서 쓰면 된다.\n\n부품끼리는 props로 데이터를 내려주고 emit으로 소식을 올려보낸다.\n이 '내려주기·올려보내기' 규칙만 지키면 화면이 아무리 커져도 관리가 쉬워진다."
      },
      {
        "h": "데이터는 창고(스토어)에 모아두면 편하다",
        "body": "목록 화면과 상세 화면이 각자 데이터를 따로 들고 있으면, 한 곳에서 글을 추가해도 다른 곳은 모른다.\n그래서 데이터를 Pinia라는 공용 창고에 한 번만 보관한다.\n모든 화면은 이 창고에서 데이터를 꺼내 쓰고, 바뀌면 자동으로 같이 갱신된다.\n냉장고 하나를 온 가족이 함께 쓰는 것과 같다.\n\n이렇게 데이터를 한곳에 모으면 '왜 이 화면만 안 바뀌지?' 하는 흔한 버그가 크게 줄어든다."
      }
    ],
    "realCode": [
      {
        "title": "항목 카드 부품 + 목록에서 반복 출력하기(엔드투엔드)",
        "lang": "vue",
        "code": "<!-- ItemCard.vue : 항목 하나를 보여주는 재사용 부품 -->\n<script setup>\n// defineProps 로 부모가 내려주는 데이터(item)를 받는다\nconst props = defineProps({\n  item: Object // item 객체에는 name, rating, memo 가 들어 있다\n})\n// defineEmits 로 '카드가 클릭됐다'는 신호를 부모에게 보낼 수 있게 준비한다\nconst emit = defineEmits(['select'])\n</script>\n\n<template>\n  <!-- 카드 전체를 클릭하면 select 신호와 함께 이 item 의 id 를 부모로 보낸다 -->\n  <div class=\"card\" @click=\"emit('select', item.id)\">\n    <!-- {{ }} 안의 값은 데이터를 화면에 그대로 출력한다 -->\n    <h3>{{ item.name }}</h3>            <!-- 가게 이름 표시 -->\n    <p>별점: {{ item.rating }}</p>      <!-- 별점 표시 -->\n    <p>{{ item.memo }}</p>              <!-- 한 줄 메모 표시 -->\n  </div>\n</template>",
        "note": "props로 데이터를 받고 emit으로 클릭 소식을 부모에게 올려보내는 가장 기본 패턴이다.\n이 부품 하나를 목록에서 v-for로 반복하면 카드 수십 개를 손쉽게 그릴 수 있다."
      },
      {
        "title": "Pinia 스토어로 데이터 모으고 새 글 추가하기",
        "lang": "javascript",
        "code": "// stores/items.js : 모든 화면이 함께 쓰는 데이터 창고\nimport { defineStore } from 'pinia' // 스토어를 만드는 함수 가져오기\nimport mock from '../data/mock.json' // 1일차에 만든 가짜 데이터 가져오기\n\n// 'items' 라는 이름의 창고를 정의한다\nexport const useItemStore = defineStore('items', {\n  // state: 창고에 보관하는 실제 데이터\n  state: () => ({\n    list: mock // 처음엔 목업 데이터로 채워둔다\n  }),\n  // actions: 데이터를 바꾸는 함수 모음\n  actions: {\n    // 새 글을 목록 맨 앞에 추가하는 함수\n    add(newItem) {\n      // 새 id 는 현재 개수+1 로 간단히 만든다\n      newItem.id = this.list.length + 1\n      // unshift 는 배열 맨 앞에 끼워 넣는다(최신 글이 위로)\n      this.list.unshift(newItem)\n    }\n  }\n})\n// 화면에서 useItemStore() 를 부르면 어디서든 같은 list 를 쓰게 된다",
        "note": "데이터와 '데이터를 바꾸는 방법(add)'을 한곳에 모아두는 구조다.\n어느 화면에서 add를 불러도 모든 화면의 목록이 동시에 갱신된다."
      }
    ]
  },
  "webproject-3": {
    "theory": [
      {
        "h": "따로 만든 코드를 합칠 때가 진짜 시작이다",
        "body": "각자 방에서 가구를 만들면 멋지지만, 한 집에 모아놓으면 문이 안 맞거나 색이 따로 노는 경우가 많다.\n코드도 똑같아서 합치는(통합) 순간 처음 보는 충돌과 버그가 쏟아진다.\n그래서 통합 테스트로 목록부터 글 추가·삭제까지 실제 사용자처럼 끝까지 눌러봐야 한다.\n이때 발견되는 버그는 부끄러운 게 아니라 배포 전에 잡아서 다행인 것이다.\n\n버그를 발견하면 바로 고치지 말고 먼저 목록으로 적은 뒤 우선순위를 정해 고치는 게 효율적이다.\n급한 불(앱이 멈추는 오류)부터 끄고, 사소한 것(글자 색)은 나중에 고친다."
      },
      {
        "h": "배포는 '내 컴퓨터에서만 되는 앱'을 세상에 내보내는 일",
        "body": "개발 중에는 npm run dev 로 내 컴퓨터에서만 앱이 돌아간다.\n이걸 친구나 심사위원이 보려면 인터넷 주소가 필요하고, 그 과정이 배포다.\n먼저 npm run build 로 코드를 작고 빠른 dist 파일로 압축한 뒤, 그 파일을 GitHub Pages 같은 곳에 올린다.\n그런데 GitHub Pages는 주소에 저장소 이름이 붙기 때문에, vite.config.js의 base 값을 맞춰주지 않으면 화면이 하얗게 나오는 흔한 실수가 생긴다.\n\n배포가 끝나면 반드시 그 인터넷 주소로 직접 들어가 모든 기능을 다시 눌러봐야 한다.\n'내 컴퓨터에서는 됐는데'는 배포에서 가장 많이 듣는 변명이기 때문이다."
      }
    ],
    "realCode": [
      {
        "title": "환경변수 분리 + 배포 경로 설정 + 빌드 스크립트(엔드투엔드)",
        "lang": "bash",
        "code": "# 1) .env 파일 만들기 : 바뀌는 값(API 주소)을 코드에서 분리한다\n# VITE_ 로 시작해야 Vue 코드 안에서 읽을 수 있다\necho 'VITE_API_URL=https://api.example.com' > .env\n\n# 2) vite.config.js 의 base 를 저장소 이름으로 맞춘다(아래는 예시 내용)\n#    base 가 틀리면 배포 후 화면이 하얗게(흰 화면) 나온다\n#    export default defineConfig({ base: '/my-web/', plugins: [vue()] })\n\n# 3) 배포용 도구 설치(정적 결과물을 gh-pages 브랜치로 올려준다)\nnpm install -D gh-pages\n\n# 4) 프로덕션 빌드 : 개발 코드를 dist 폴더로 압축·변환한다\nnpm run build\n\n# 5) 빌드 결과를 배포 전에 미리 확인한다(실제 배포와 가장 비슷한 환경)\nnpm run preview\n\n# 6) dist 폴더를 GitHub Pages(gh-pages 브랜치)로 올린다\nnpx gh-pages -d dist\n\n# 결과: 잠시 후 https://<아이디>.github.io/my-web/ 주소로 접속 가능\n# 접속해서 글 추가·삭제까지 모두 동작하면 배포 성공이다",
        "note": "환경변수 분리·base 설정·빌드·배포까지 한 흐름으로 보여준다.\nbase 값을 저장소 이름과 똑같이 맞추는 것이 흰 화면 오류를 막는 핵심이다."
      }
    ]
  },
  "spring-ai-1": {
    "theory": [
      {
        "h": "Spring AI는 왜 필요할까",
        "body": "예전에는 자바에서 LLM을 쓰려면 모델 회사마다 다른 HTTP 요청 형식, 인증, 응답 파싱을 직접 짜야 했다.\n회사마다 규격이 달라서 OpenAI에서 Anthropic으로 바꾸면 코드를 대부분 다시 써야 했다.\n\nSpring AI는 이 복잡함을 한 겹의 표준 인터페이스로 덮어 준다.\n마치 TV 리모컨처럼, 안에 든 회로(모델 회사)가 무엇이든 우리는 같은 버튼(메서드)만 누르면 된다.\n덕분에 비즈니스 로직에 집중하고 모델 교체는 설정 한 줄로 처리할 수 있다."
      },
      {
        "h": "ChatClient로 대화하는 흐름",
        "body": "ChatClient는 'prompt() → user(...) → call() → content()' 라는 체인으로 한 번의 대화를 만든다.\nprompt()로 요청을 시작하고, user()에 사용자의 질문을 담고, call()로 모델에 보낸 뒤, content()로 글자 답을 꺼낸다.\n\n이 흐름은 카페 주문과 닮았다.\nprompt()는 카운터에 서는 것, user()는 메뉴를 말하는 것, call()은 결제와 주문 전달, content()는 완성된 음료를 받는 것이다.\n단계가 명확하게 나뉘어 있어 중간에 옵션(온도·시스템 지시 등)을 끼워 넣기도 쉽다."
      },
      {
        "h": "설정과 비밀키 관리",
        "body": "API 키는 돈이 나가는 비밀번호라서 절대 코드에 직접 적으면 안 된다.\n깃허브에 올라가는 순간 누군가 훔쳐 쓸 수 있기 때문이다.\n\n그래서 키는 운영체제의 환경변수에 넣고, application.yml에서는 ${OPENAI_API_KEY}처럼 이름만 참조한다.\n이렇게 하면 코드에는 비밀이 남지 않고, 서버마다 다른 키를 안전하게 주입할 수 있다.\n비밀번호를 메모지에 적어 모니터에 붙이지 않고 금고에 보관하는 것과 같은 원리다."
      }
    ],
    "realCode": [
      {
        "title": "채팅 응답 REST API 컨트롤러 (엔드투엔드)",
        "lang": "java",
        "code": "package com.example.demo;  // 우리 애플리케이션의 패키지(폴더) 선언\n\nimport org.springframework.ai.chat.client.ChatClient;       // 대화를 보내는 만능 클라이언트\nimport org.springframework.web.bind.annotation.GetMapping;  // GET 요청을 메서드에 연결\nimport org.springframework.web.bind.annotation.RequestParam;// URL의 ?key=값 을 받아오는 어노테이션\nimport org.springframework.web.bind.annotation.RestController;// 이 클래스가 REST API임을 표시\n\n@RestController  // 메서드의 반환값을 그대로 HTTP 응답 본문으로 보냄\npublic class ChatController {\n\n    private final ChatClient chatClient;  // LLM에게 말을 거는 도구를 담을 변수\n\n    // 스프링이 ChatClient.Builder(조립기)를 자동으로 넣어줌(의존성 주입)\n    public ChatController(ChatClient.Builder builder) {\n        this.chatClient = builder.build();  // 조립기로 실제 ChatClient를 완성해 보관\n    }\n\n    @GetMapping(\"/chat\")  // http://localhost:8080/chat 주소로 들어오는 GET 요청을 처리\n    public String chat(@RequestParam String message) {  // ?message=... 의 값을 message에 담음\n        return chatClient.prompt()   // 1) 새 대화 요청 시작\n                .user(message)       // 2) 사용자의 질문을 넣음\n                .call()              // 3) 모델 서버로 전송하고 응답을 기다림\n                .content();          // 4) 응답에서 글자(텍스트)만 꺼내 반환\n    }\n}\n// 실행 후 /chat?message=안녕 호출 시: LLM이 만든 한국어 답변 문자열이 그대로 화면에 출력됨",
        "note": "ChatClient.Builder를 주입받아 build()로 클라이언트를 만들고, prompt→user→call→content 체인으로 한 번의 질의응답을 완성한다.\n키와 모델은 코드가 아니라 application.yml에서 읽어오므로 컨트롤러 코드는 모델 회사와 무관하게 동일하다."
      }
    ]
  },
  "spring-ai-2": {
    "theory": [
      {
        "h": "왜 RAG가 필요한가",
        "body": "LLM은 학습이 끝난 시점까지의 지식만 기억하고, 우리 회사 내부 문서는 본 적이 없다.\n그래서 사내 규정이나 최신 정보를 물으면 모르거나 그럴듯한 거짓말(환각)을 만들어낸다.\n\nRAG는 답하기 전에 먼저 관련 문서를 검색해 LLM에게 '이 자료를 참고해서 답해'라고 함께 건넨다.\n시험을 외워서 보는 대신, 오픈북으로 교재를 펴 놓고 푸는 것과 같다.\n덕분에 최신·사내 정보를 근거로 정확하게 답하고 출처도 제시할 수 있다."
      },
      {
        "h": "임베딩과 벡터 검색의 직관",
        "body": "임베딩은 문장의 '의미'를 좌표로 바꾸는 일이다.\n'강아지'와 '반려견'은 글자는 달라도 좌표가 가깝게 찍히고, '강아지'와 '세금'은 멀리 찍힌다.\n\n검색은 질문도 같은 방식으로 좌표로 바꾼 뒤, 그 점에서 가장 가까운 문서 조각들을 고르는 것이다.\n도서관에서 책을 주제별로 가까운 책장에 꽂아 두면, 원하는 주제 근처만 둘러봐도 관련 책을 빨리 찾는 것과 같다.\n그래서 단어가 정확히 일치하지 않아도 의미가 통하면 찾아낼 수 있다."
      }
    ],
    "realCode": [
      {
        "title": "문서 적재(인덱싱) + RAG 질의응답 서비스",
        "lang": "java",
        "code": "package com.example.demo;\n\nimport org.springframework.ai.chat.client.ChatClient;          // LLM 호출\nimport org.springframework.ai.document.Document;               // 문서 조각 한 개를 표현\nimport org.springframework.ai.transformer.splitter.TokenTextSplitter; // 긴 글을 토막내는 도구\nimport org.springframework.ai.vectorstore.SearchRequest;       // 유사도 검색 요청\nimport org.springframework.ai.vectorstore.VectorStore;         // 벡터 저장·검색소\nimport org.springframework.web.bind.annotation.*;\nimport java.util.List;\nimport java.util.stream.Collectors;\n\n@RestController\npublic class QaService {\n\n    private final ChatClient chatClient;   // 답변 생성용\n    private final VectorStore vectorStore; // 문서 검색용\n\n    public QaService(ChatClient.Builder b, VectorStore vs) {\n        this.chatClient = b.build();       // 클라이언트 완성\n        this.vectorStore = vs;             // 스프링이 주입한 벡터 저장소 보관\n    }\n\n    // 1) 문서를 잘라 벡터로 저장(앱 시작 시 1회 호출)\n    public void ingest(String raw) {\n        Document doc = new Document(raw);                 // 원문을 Document로 감쌈\n        List<Document> chunks = new TokenTextSplitter()   // 기본 길이로 조각냄\n                .split(List.of(doc));\n        vectorStore.add(chunks);                          // 임베딩되어 DB에 색인됨\n    }\n\n    // 2) 질문을 받아 검색 후 근거로 답함\n    @GetMapping(\"/ask\")\n    public String ask(@RequestParam String q) {\n        List<Document> hits = vectorStore.similaritySearch(  // 질문과 가까운 조각 검색\n                SearchRequest.query(q).withTopK(3));         // 상위 3개만\n        String context = hits.stream()                       // 찾은 조각들을\n                .map(Document::getContent)                   // 본문 텍스트만 뽑아\n                .collect(Collectors.joining(\"\\n---\\n\"));     // 하나의 참고자료로 합침\n        return chatClient.prompt()\n                .system(\"아래 자료만 근거로 한국어로 답하고, 없으면 모른다고 해\")\n                .user(\"자료:\\n\" + context + \"\\n\\n질문: \" + q) // 자료+질문을 함께 전달\n                .call().content();                            // LLM 답변 반환\n    }\n}\n// /ask?q=설립연도 호출 시: 문서에 적힌 연도를 근거로 한 답변 출력",
        "note": "ingest로 문서를 청킹·임베딩해 vectorStore에 넣고, ask에서 similaritySearch로 찾은 top-3 조각을 프롬프트의 '자료'로 끼워 LLM이 근거 기반으로 답하게 한다.\n자료에 없으면 모른다고 답하라는 system 지시가 환각을 줄인다."
      }
    ]
  },
  "spring-ai-3": {
    "theory": [
      {
        "h": "도구 호출이 여는 세계",
        "body": "LLM은 똑똑하지만 '지금 서울 날씨'나 'DB의 주문 상태'처럼 실시간·내부 데이터는 알 수 없다.\n그냥 물으면 모르거나 지어낸다.\n\nFunction Calling은 LLM에게 '필요하면 이 함수를 불러도 돼'라고 도구 목록을 쥐여 주는 것이다.\nLLM은 질문을 보고 스스로 어떤 도구를 어떤 인자로 부를지 정하고, 우리 코드가 실제로 실행해 결과를 돌려준다.\n비서에게 '모르면 옆 부서에 전화해서 물어봐'라고 권한을 준 것과 같아서, AI가 현실 데이터와 연결된다."
      },
      {
        "h": "왜 구조화 출력이 중요한가",
        "body": "사람에게는 자연스러운 문장이 좋지만, 프로그램끼리는 정해진 모양의 데이터가 필요하다.\n'서울은 24도쯤 되고 맑아요'라는 문장에서 숫자만 골라 쓰기는 번거롭고 깨지기 쉽다.\n\n구조화 출력은 LLM에게 'city, celsius, summary 필드를 가진 객체로 답해'라고 시키고, Spring AI가 그 답을 자바 객체로 자동 변환해 준다.\n자유 서술을 정해진 서식(엑셀 칸)에 맞춰 받는 것과 같아서, 이후 계산·저장·화면 표시에 바로 쓸 수 있다.\n덕분에 AI 응답을 안정적으로 시스템에 통합할 수 있다."
      }
    ],
    "realCode": [
      {
        "title": "도구 호출 + 구조화 출력 결합 서비스",
        "lang": "java",
        "code": "package com.example.demo;\n\nimport org.springframework.ai.chat.client.ChatClient;\nimport org.springframework.ai.tool.annotation.Tool;   // 도구 표시 어노테이션\nimport org.springframework.web.bind.annotation.*;\n\n@RestController\npublic class WeatherController {\n\n    private final ChatClient chatClient;\n    public WeatherController(ChatClient.Builder b) { this.chatClient = b.build(); }\n\n    // AI가 답으로 채워줄 데이터 모양(불변 객체)\n    public record WeatherReport(String city, int celsius, String summary) {}\n\n    // AI가 필요할 때 호출하는 도구 모음\n    static class WeatherTools {\n        @Tool(description = \"도시 이름을 받아 현재 기온(섭씨)을 돌려준다\")\n        public int getWeather(String city) {           // AI가 인자 city를 채워 호출\n            return switch (city) {                       // 데모용 고정값(실제론 외부 API)\n                case \"서울\" -> 24;\n                case \"부산\" -> 27;\n                default -> 20;                           // 모르는 도시는 기본값\n            };\n        }\n    }\n\n    @GetMapping(\"/weather\")\n    public WeatherReport weather(@RequestParam String city) {\n        return chatClient.prompt()\n                .system(\"날씨를 묻는 질문에는 반드시 제공된 도구를 사용해 답해\")\n                .user(city + \" 날씨를 알려줘\")            // 사용자 질문\n                .tools(new WeatherTools())               // 사용할 수 있는 도구 등록\n                .call()\n                .entity(WeatherReport.class);            // 답을 record 객체로 변환해 받음\n    }\n}\n// /weather?city=서울 호출 시: {\"city\":\"서울\",\"celsius\":24,\"summary\":\"맑음\"} 형태 JSON 반환",
        "note": "tools(new WeatherTools())로 도구를 등록하면 LLM이 스스로 getWeather를 호출해 실데이터를 얻고, entity(WeatherReport.class)가 그 답을 자바 record로 자동 매핑해 바로 JSON 응답으로 쓸 수 있게 한다."
      }
    ]
  },
  "sllm-1": {
    "theory": [
      {
        "h": "왜 작은 모델(sLLM)을 쓰는가",
        "body": "GPT 같은 초대형 모델은 똑똑하지만, 한 번 돌릴 때마다 거대한 그래픽카드(GPU) 여러 장이 필요하고 비용도 크다.\n반면 sLLM은 파라미터 수가 작아서 노트북이나 작은 서버에서도 돌아간다.\n이는 마치 트럭(대형 LLM) 대신 오토바이(sLLM)로 동네 배달을 하는 것과 같다.\n무거운 짐은 트럭이 낫지만, 가까운 거리를 빠르고 싸게 다니기엔 오토바이가 훨씬 효율적이다.\n\n특히 회사 내부 문서처럼 밖으로 새면 안 되는 데이터는 내 컴퓨터 안에서만 도는 sLLM이 안전하다.\n또한 한 가지 업무에 특화시키면, 작은 모델도 그 분야에서는 대형 모델 못지않게 잘한다."
      },
      {
        "h": "양자화로 모델을 가볍게 만들기",
        "body": "모델 속 숫자들은 원래 32비트(아주 정밀한 소수)로 저장되어 용량이 크다.\n양자화는 이 숫자를 4비트나 8비트로 '반올림해 짧게' 저장하는 압축 기술이다.\n사진을 고화질 RAW 대신 JPG로 저장하면 용량이 확 줄지만 보기엔 큰 차이가 없는 것과 비슷하다.\n\n4비트로 양자화하면 모델 용량이 1/4 정도로 줄어, 7B 모델도 일반 노트북 메모리에 올라간다.\n약간의 정확도 손실은 있지만, 실무에서 체감 차이는 작아서 로컬 실행에 널리 쓰인다."
      },
      {
        "h": "오픈소스 모델 생태계 한눈에 보기",
        "body": "Llama는 Meta가 공개한 대표 오픈 모델로, 커뮤니티가 가장 활발하다.\nQwen은 알리바바가 만든 모델로 한국어를 포함한 다국어와 코딩에 강하다.\nGemma는 구글이 공개한 가볍고 효율 좋은 모델이다.\n\n이 모델들은 0.5B처럼 아주 작은 버전부터 70B처럼 큰 버전까지 '같은 이름 다른 크기'로 나온다.\n처음에는 가장 작은 버전으로 빠르게 실험하고, 품질이 부족하면 한 단계 큰 모델로 올리는 순서가 좋다."
      }
    ],
    "realCode": [
      {
        "title": "Ollama로 띄운 sLLM을 감싸는 FastAPI 챗봇 서버",
        "lang": "python",
        "code": "# app.py : 로컬 Ollama 모델을 호출하는 미니 챗봇 API 서버\nimport time                                  # 응답 시간을 재기 위한 표준 시간 모듈\nimport requests                              # Ollama 로컬 서버에 HTTP 요청을 보내기 위한 라이브러리\nfrom fastapi import FastAPI                   # 웹 API를 쉽게 만들어 주는 프레임워크\nfrom pydantic import BaseModel               # 요청 본문의 형식(스키마)을 정의하는 도구\n\napp = FastAPI()                              # FastAPI 앱(서버) 객체를 하나 생성\nOLLAMA_URL = \"http://localhost:11434/api/generate\"  # Ollama가 기본으로 여는 로컬 주소\nMODEL_NAME = \"qwen2.5:0.5b\"                 # 사용할 소형 모델 이름(미리 ollama pull 해 둔 모델)\n\nclass ChatRequest(BaseModel):                # 클라이언트가 보낼 요청의 형태를 정의하는 클래스\n    message: str                             # message 라는 문자열 한 개만 받는다는 뜻\n\n@app.post(\"/chat\")                          # POST 방식의 /chat 주소로 들어오는 요청을 처리\ndef chat(req: ChatRequest):                  # 위에서 정의한 형식으로 자동 검증된 요청을 받음\n    start = time.time()                      # 응답 시간 측정을 위해 시작 시각을 기록\n    payload = {                              # Ollama에 보낼 요청 데이터(JSON)를 구성\n        \"model\": MODEL_NAME,                # 어떤 모델로 답할지 지정\n        \"prompt\": req.message,              # 사용자가 입력한 질문을 프롬프트로 전달\n        \"stream\": False,                    # 한 번에 전체 답을 받기 위해 스트리밍은 끔\n    }\n    res = requests.post(OLLAMA_URL, json=payload)  # Ollama 로컬 서버에 질문을 전송\n    reply = res.json()[\"response\"]          # 응답 JSON에서 모델이 생성한 답변 텍스트만 꺼냄\n    latency_ms = int((time.time() - start) * 1000)  # 걸린 시간을 밀리초 단위 정수로 계산\n    return {\"reply\": reply, \"latency_ms\": latency_ms}  # 답변과 응답 시간을 함께 반환\n",
        "note": "Ollama가 11434 포트에서 떠 있어야 동작한다.\n서버 실행 후 /docs 에서 바로 테스트할 수 있다."
      }
    ]
  },
  "sllm-2": {
    "theory": [
      {
        "h": "파인튜닝은 왜 필요한가",
        "body": "사전학습된 모델은 세상 지식을 두루 알지만, 우리 회사 용어나 원하는 말투까지는 모른다.\n파인튜닝은 그 모델에게 우리만의 예시를 보여 주며 '이 분야에선 이렇게 답해'라고 가르치는 일이다.\n이는 똑똑한 신입사원에게 회사 업무 매뉴얼을 며칠 교육시키는 것과 같다.\n기본기는 이미 갖췄으니, 우리 상황에 맞는 부분만 보충하면 금방 전력이 된다.\n\n그래서 데이터가 많지 않아도, 질 좋은 예시 수백 개만으로도 효과를 볼 수 있다.\n중요한 것은 양보다 '일관되고 정확한 모범 답안'을 모으는 것이다."
      },
      {
        "h": "LoRA가 학습을 가볍게 만드는 원리",
        "body": "모델 전체를 다시 학습하려면 수억~수십억 개 숫자를 전부 고쳐야 해서 메모리가 엄청나게 든다.\nLoRA는 원본 숫자는 그대로 얼려 두고, 옆에 아주 작은 '보정용 행렬' 두 개만 새로 학습한다.\n원본 그림은 손대지 않고, 투명한 트레이싱지 위에만 덧칠하는 것과 비슷하다.\n덧칠한 종이는 가볍고, 마음에 안 들면 떼어내고 다른 종이를 끼울 수도 있다.\n\n그 결과 학습해야 할 숫자가 전체의 1% 미만으로 줄어, 노트북 GPU로도 학습이 가능해진다.\nQLoRA는 여기에 4비트 양자화까지 더해 메모리를 한 번 더 아끼는 발전된 방식이다."
      },
      {
        "h": "학습이 잘 되는지 확인하는 법",
        "body": "학습 중에는 loss(손실) 값을 지켜보는 것이 가장 기본이다.\nloss가 꾸준히 내려가면 모델이 데이터를 잘 배우고 있다는 신호다.\n반대로 loss가 안 줄거나 들쭉날쭉하면 학습률(learning rate)이 너무 크거나 데이터에 문제가 있을 수 있다.\n\n또한 학습 데이터에만 너무 맞춰져 새로운 질문에 약해지는 '과적합'을 조심해야 한다.\n그래서 학습에 쓰지 않은 질문 몇 개를 따로 두고, 학습 후 그 질문으로 답을 검증하는 습관이 중요하다."
      }
    ],
    "realCode": [
      {
        "title": "TRL SFTTrainer로 sLLM을 QLoRA 파인튜닝하는 엔드투엔드 스크립트",
        "lang": "python",
        "code": "# train.py : data.jsonl을 읽어 sLLM을 QLoRA로 파인튜닝하는 전체 스크립트\nimport torch                                       # 딥러닝 연산을 담당하는 핵심 라이브러리\nfrom datasets import load_dataset                 # 로컬/허브 데이터셋을 불러오는 도구\nfrom transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig  # 모델·토크나이저·양자화 설정\nfrom peft import LoraConfig                       # LoRA(보조 메모지) 설정을 정의하는 도구\nfrom trl import SFTTrainer, SFTConfig             # 지도학습 파인튜닝을 쉽게 돌려 주는 트레이너\n\nMODEL = \"Qwen/Qwen2.5-0.5B-Instruct\"           # 베이스로 삼을 소형 모델 이름\n\nqcfg = BitsAndBytesConfig(                        # 4비트 양자화 설정(QLoRA의 Q에 해당)\n    load_in_4bit=True,                            # 가중치를 4비트로 압축해 메모리를 절약\n    bnb_4bit_compute_dtype=torch.float16,         # 계산은 16비트로 수행해 정확도를 보전\n)\ntokenizer = AutoTokenizer.from_pretrained(MODEL)  # 글자를 토큰(숫자)으로 바꾸는 토크나이저 로드\nmodel = AutoModelForCausalLM.from_pretrained(     # 베이스 모델을 4비트로 메모리에 적재\n    MODEL, quantization_config=qcfg, device_map=\"auto\",  # 양자화 적용 + 자동 장치 배치\n)\n\nlora = LoraConfig(                                # 새로 학습할 LoRA 어댑터의 설정\n    r=8,                                          # 보조 행렬의 크기(작을수록 가볍고 클수록 표현력↑)\n    lora_alpha=16,                                # 학습된 변화량을 얼마나 강하게 반영할지 스케일\n    lora_dropout=0.05,                            # 과적합을 막기 위해 일부 연결을 무작위로 끔\n    target_modules=[\"q_proj\", \"v_proj\"],      # 어텐션의 Q·V 부분에만 어댑터를 붙임\n)\n\ndef to_text(ex):                                  # 데이터 한 건을 학습용 한 문장으로 합치는 함수\n    return {\"text\": f\"### 질문:\\n{ex['instruction']}\\n### 답변:\\n{ex['output']}\"}  # 지시+답변을 한 텍스트로\n\nds = load_dataset(\"json\", data_files=\"data.jsonl\", split=\"train\")  # 내가 만든 데이터셋을 읽어옴\nds = ds.map(to_text)                              # 각 행을 위 함수로 학습용 text 컬럼으로 변환\n\ncfg = SFTConfig(                                  # 학습 전반의 설정값 묶음\n    output_dir=\"./lora-out\",                    # 학습 결과(어댑터)를 저장할 폴더\n    num_train_epochs=3,                           # 데이터 전체를 3번 반복 학습\n    per_device_train_batch_size=2,                # 한 번에 2개 샘플씩 묶어 학습(메모리에 맞춰 조절)\n    learning_rate=2e-4,                           # 학습 보폭(너무 크면 불안정, 작으면 느림)\n    logging_steps=10,                             # 10스텝마다 loss를 화면에 출력\n    dataset_text_field=\"text\",                  # 학습에 사용할 컬럼 이름 지정\n)\ntrainer = SFTTrainer(                             # 위 재료들을 모아 트레이너를 구성\n    model=model, args=cfg, train_dataset=ds, peft_config=lora,  # 모델·설정·데이터·LoRA 연결\n)\ntrainer.train()                                   # 실제 학습 시작(loss가 줄어드는 로그가 출력됨)\ntrainer.save_model(\"./lora-out\")               # 학습된 LoRA 어댑터를 폴더에 저장\n",
        "note": "양자화된 베이스 모델은 얼려 두고 작은 LoRA 어댑터만 학습한다.\n학습이 끝나면 lora-out 폴더의 어댑터만 배포하면 된다."
      }
    ]
  },
  "ml-dl-1": {
    "theory": [
      {
        "h": "머신러닝은 '규칙을 찾아내는' 일이다",
        "body": "옛날 프로그램은 사람이 '이러면 이렇게 하라'는 규칙을 전부 손으로 적었다.\n하지만 스팸 메일을 거르는 규칙을 사람이 다 적기란 불가능에 가깝다.\n머신러닝은 반대로, 정상 메일과 스팸 메일을 잔뜩 보여주면 컴퓨터가 스스로 '이런 단어가 많으면 스팸'이라는 규칙을 찾아낸다.\n\n즉 사람은 데이터와 정답만 준비하고, 규칙 찾기는 컴퓨터에게 맡기는 것이다.\n이것이 머신러닝의 핵심 발상이다."
      },
      {
        "h": "왜 학습용과 평가용을 나눌까",
        "body": "공부한 문제로 시험을 보면 누구나 100점을 맞는다.\n그래서 모델의 진짜 실력은 '한 번도 못 본 문제'로 재야 한다.\n이를 위해 데이터를 학습용(공부)과 평가용(시험)으로 나눈다.\n\n학습용으로만 fit(학습)하고 평가용으로 점수를 매기면, 이 모델이 처음 보는 데이터에서도 잘할지 가늠할 수 있다.\n평가용 점수가 학습용보다 크게 낮으면 과적합을 의심해야 한다."
      }
    ],
    "realCode": [
      {
        "title": "붓꽃 분류 엔드투엔드: 적재 → 분할 → 학습 → 평가",
        "lang": "python",
        "code": "# 데이터셋과 도구들을 한 번에 불러온다\nfrom sklearn.datasets import load_iris            # 붓꽃 예제 데이터 로더\nfrom sklearn.model_selection import train_test_split  # 데이터 분할 함수\nfrom sklearn.tree import DecisionTreeClassifier   # 결정트리 분류 모델\nfrom sklearn.metrics import accuracy_score, classification_report  # 평가 지표\n\n# 붓꽃 데이터를 메모리로 불러온다 (꽃잎/꽃받침 길이 등 4개 특징)\niris = load_iris()\nX = iris.data        # 입력값(특징) 150송이 x 4개 숫자\ny = iris.target      # 정답(품종) 0,1,2 세 종류\n\n# 학습용 80% / 평가용 20% 로 나눈다 (random_state=42 로 결과 고정)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)\n\n# 결정트리 모델을 만들고 학습용 데이터로 규칙을 학습시킨다\nmodel = DecisionTreeClassifier(random_state=42)\nmodel.fit(X_train, y_train)   # fit = 공부시키기\n\n# 한 번도 안 본 평가용 데이터로 품종을 예측한다\npred = model.predict(X_test)\n\n# 정확도를 출력한다  # 결과: 약 1.0 (거의 다 맞춤)\nprint(\"정확도:\", accuracy_score(y_test, pred))\n# 품종별 정밀도/재현율/F1 표를 출력한다\nprint(classification_report(y_test, pred))",
        "note": "데이터를 불러와 나누고, 학습하고, 처음 보는 데이터로 평가하는 머신러닝의 가장 기본 4단계를 한 흐름으로 보여준다."
      }
    ]
  },
  "ml-dl-2": {
    "theory": [
      {
        "h": "신경망은 '뉴런 여러 개를 쌓은 계산기'다",
        "body": "신경망의 기본 단위인 뉴런은 입력 숫자들에 각각 가중치를 곱해 더하는 단순한 계산기다.\n이 뉴런 하나로는 직선밖에 못 긋지만, 여러 개를 옆으로 늘어놓고 층층이 쌓으면 구불구불한 복잡한 경계도 표현할 수 있다.\n\n층을 깊게 쌓을수록 더 복잡한 패턴을 배울 수 있어서 '딥(deep) 러닝'이라 부른다.\n중간의 숨은 층(은닉층)들이 입력을 점점 더 쓸모 있는 형태로 바꿔주는 것이 핵심이다."
      },
      {
        "h": "학습은 '틀리고 → 고치고'의 반복이다",
        "body": "신경망 학습은 사람이 문제를 풀고 채점하며 실력을 키우는 과정과 똑같다.\n먼저 순전파로 답을 내고(문제 풀기), 손실 함수로 정답과 얼마나 다른지 점수를 매긴다(채점).\n그다음 역전파로 '어느 가중치를 어느 방향으로 바꿔야 덜 틀릴지'를 계산한다(오답 분석).\n\n마지막으로 옵티마이저가 그 방향으로 가중치를 조금 옮긴다(복습).\n이 네 단계를 수백 번 반복하면 손실이 점점 줄며 모델이 똑똑해진다."
      }
    ],
    "realCode": [
      {
        "title": "PyTorch 손글씨 분류: 모델 정의부터 학습·평가까지",
        "lang": "python",
        "code": "import torch                          # 파이토치 본체\nimport torch.nn as nn                 # 신경망 층(layer) 모음\nfrom sklearn.datasets import load_digits          # 8x8 손글씨 숫자 데이터\nfrom sklearn.model_selection import train_test_split\n\n# 데이터 불러오기: 입력 64픽셀, 정답 0~9\nd = load_digits()\nX_tr, X_te, y_tr, y_te = train_test_split(\n    d.data, d.target, test_size=0.2, random_state=42)\n\n# 넘파이 배열을 파이토치 텐서로 변환 (입력=실수, 정답=정수)\nX_tr = torch.tensor(X_tr, dtype=torch.float32)\ny_tr = torch.tensor(y_tr, dtype=torch.long)\nX_te = torch.tensor(X_te, dtype=torch.float32)\ny_te = torch.tensor(y_te, dtype=torch.long)\n\n# 64 -> 32 -> 10 신경망 (ReLU 는 음수를 0으로 막는 문지기)\nmodel = nn.Sequential(nn.Linear(64, 32), nn.ReLU(), nn.Linear(32, 10))\nloss_fn = nn.CrossEntropyLoss()                  # 분류용 손실 함수\nopt = torch.optim.Adam(model.parameters(), lr=0.01)  # 가중치 조정자\n\n# 학습 루프: 100 에폭 반복\nfor epoch in range(100):\n    opt.zero_grad()              # 이전 기울기 초기화\n    out = model(X_tr)            # 순전파: 답 예측\n    loss = loss_fn(out, y_tr)    # 채점: 정답과의 오차\n    loss.backward()             # 역전파: 고칠 방향 계산\n    opt.step()                  # 가중치 한 걸음 이동\n\n# 평가: 기울기 계산 끄고 정확도 측정\nwith torch.no_grad():\n    pred = model(X_te).argmax(dim=1)            # 가장 높은 점수의 숫자 선택\n    acc = (pred == y_te).float().mean()         # 맞춘 비율\nprint(\"평가 정확도:\", acc.item())   # 결과: 약 0.96",
        "note": "데이터를 텐서로 바꾸고, 모델·손실·옵티마이저를 준비한 뒤, 순전파→채점→역전파→이동의 학습 루프를 반복하는 PyTorch 의 표준 패턴이다."
      }
    ]
  },
  "ml-dl-3": {
    "theory": [
      {
        "h": "데이터 모양에 따라 도구가 다르다",
        "body": "딥러닝 아키텍처는 데이터의 생김새에 맞춰 골라야 한다.\n이미지는 옆 픽셀끼리 관계가 중요하므로, 작은 필터로 주변을 훑는 CNN 이 잘 맞는다.\n문장이나 주가처럼 순서가 중요한 데이터는 앞을 기억하며 읽는 RNN/LSTM, 또는 핵심에 집중하는 Transformer 가 적합하다.\n\n즉 망치 하나로 모든 못을 박는 게 아니라, 못의 종류에 따라 연장을 바꾸는 것과 같다.\n문제에 맞는 구조를 고르는 안목이 딥러닝의 절반이다."
      },
      {
        "h": "과적합은 '외우기'이고, 정규화는 '이해시키기'다",
        "body": "모델이 학습 데이터를 통째로 외우면 학습 점수는 높아도 새 데이터에서 무너진다.\n이를 막는 대표 방법이 드롭아웃, 정규화, 데이터 증강이다.\n드롭아웃은 일부 뉴런을 무작위로 꺼서 모델이 한 곳에만 의존하지 못하게 한다.\n\n데이터 증강은 같은 이미지를 살짝 비틀어 보여줘 '본질'을 배우게 한다.\n전이학습은 남이 잘 배운 지식을 빌려와, 적은 데이터로도 튼튼한 모델을 만든다."
      }
    ],
    "realCode": [
      {
        "title": "PyTorch CNN 으로 손글씨 분류 (드롭아웃 포함)",
        "lang": "python",
        "code": "import torch\nimport torch.nn as nn\nfrom sklearn.datasets import load_digits\nfrom sklearn.model_selection import train_test_split\n\n# 손글씨 데이터를 (개수, 채널1, 8, 8) 이미지 형태로 변환\nd = load_digits()\nX = torch.tensor(d.data, dtype=torch.float32).reshape(-1, 1, 8, 8)\ny = torch.tensor(d.target, dtype=torch.long)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# CNN 정의: 합성곱으로 특징 추출 -> 풀링으로 축소 -> 분류\nclass CNN(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.conv = nn.Conv2d(1, 8, 3, padding=1)  # 3x3 필터 8개로 특징 추출\n        self.pool = nn.MaxPool2d(2)                # 가로세로 절반으로 압축\n        self.drop = nn.Dropout(0.3)                # 뉴런 30%를 무작위로 끔(과적합 방지)\n        self.fc = nn.Linear(8 * 4 * 4, 10)         # 펼친 특징을 0~9로 분류\n    def forward(self, x):\n        x = self.pool(torch.relu(self.conv(x)))    # 합성곱->ReLU->풀링\n        x = x.flatten(1)                           # 한 줄로 펼치기\n        x = self.drop(x)                           # 드롭아웃 적용\n        return self.fc(x)                          # 최종 점수 출력\n\nmodel = CNN()\nloss_fn = nn.CrossEntropyLoss()\nopt = torch.optim.Adam(model.parameters(), lr=0.01)\n\n# 60 에폭 학습\nfor epoch in range(60):\n    opt.zero_grad()\n    loss = loss_fn(model(X_tr), y_tr)  # 순전파 + 채점\n    loss.backward()                    # 역전파\n    opt.step()                         # 가중치 갱신\n\n# 평가 정확도 측정 (기울기 계산 끔)\nwith torch.no_grad():\n    acc = (model(X_te).argmax(1) == y_te).float().mean()\nprint(\"평가 정확도:\", acc.item())   # 결과: 약 0.97",
        "note": "합성곱으로 이미지 특징을 뽑고, 드롭아웃으로 과적합을 막은 뒤 분류하는 CNN 의 전체 흐름을 한 파일로 담았다."
      }
    ]
  },
  "feature-1": {
    "theory": [
      {
        "h": "피처 엔지니어링은 요리의 재료 손질이다",
        "body": "같은 식재료라도 잘 다듬으면 더 맛있는 요리가 되듯, 같은 데이터라도 어떻게 손질하느냐에 따라 모델 성능이 크게 달라진다.\n실무에서는 화려한 알고리즘을 바꾸는 것보다 피처를 잘 만드는 것이 점수를 더 많이 올리는 경우가 흔하다.\n\n예를 들어 \"태어난 날짜\"라는 원본은 모델에게 큰 의미가 없지만, 거기서 \"나이\"나 \"요일\"을 뽑아내면 훨씬 강력한 단서가 된다.\n즉 사람이 도메인 지식을 써서 숨은 정보를 꺼내 주는 과정이 피처 엔지니어링이다."
      },
      {
        "h": "왜 숫자 크기를 맞춰야 할까(스케일링)",
        "body": "나이는 0~100, 연봉은 0~1억처럼 칸마다 숫자 범위가 천차만별이다.\n많은 모델은 숫자가 크면 더 중요하다고 착각하기 때문에, 연봉 같은 큰 숫자에만 끌려가 나이를 무시할 수 있다.\n\n그래서 모든 칸을 비슷한 범위(예: 0~1 또는 평균0·표준편차1)로 맞춰 주면 모델이 모든 피처를 공평하게 본다.\n저울의 눈금을 통일해 주는 것과 같다고 생각하면 된다."
      },
      {
        "h": "글자는 숫자로 바꿔야 모델이 읽는다(인코딩)",
        "body": "모델은 'male', 'female' 같은 글자를 직접 계산하지 못하고 오직 숫자만 다룬다.\n그래서 범주(카테고리)를 숫자로 번역해 주는 작업이 필요한데, 이를 인코딩이라 한다.\n\n순서가 없는 범주(빨강·파랑·초록)에 0·1·2 를 그냥 매기면 모델이 \"초록이 빨강보다 크다\"고 오해하므로, 이럴 땐 각 항목마다 별도의 0/1 칸을 만드는 원-핫 인코딩을 쓴다."
      }
    ],
    "realCode": [
      {
        "title": "엔드투엔드: 전처리 파이프라인으로 결측치·스케일링·인코딩 한 번에",
        "lang": "python",
        "code": "# 데이터 처리를 위한 pandas 가져오기\nimport pandas as pd\n# ColumnTransformer: 열마다 다른 가공을 적용하게 묶어주는 도구\nfrom sklearn.compose import ColumnTransformer\n# Pipeline: 전처리 -> 모델 학습을 하나의 흐름으로 연결\nfrom sklearn.pipeline import Pipeline\n# 결측치 채우기 도구\nfrom sklearn.impute import SimpleImputer\n# 숫자 표준화·범주 원-핫 인코딩 도구\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\n# 분류 모델·데이터 분할·정확도 평가 함수\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\n\n# 타이타닉 데이터 불러오기 (인터넷에서 직접 읽음)\nurl = 'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv'\ndf = pd.read_csv(url)  # df 는 표 형태 데이터\n\n# 입력 피처(X)와 정답(y, 생존여부) 분리\nX = df[['Pclass', 'Sex', 'Age', 'Fare', 'Embarked']]  # 다섯 칸만 사용\ny = df['Survived']  # 1=생존, 0=사망\n\n# 숫자 칸과 글자 칸을 따로 처리할 목록 정의\nnum_cols = ['Age', 'Fare']                # 채우고 스케일링할 숫자 칸\ncat_cols = ['Pclass', 'Sex', 'Embarked']  # 원-핫 인코딩할 범주 칸\n\n# 숫자: 빈 값은 중앙값으로 채운 뒤 표준화\nnum_pipe = Pipeline([('fill', SimpleImputer(strategy='median')),\n                     ('scale', StandardScaler())])\n# 범주: 빈 값은 최빈값으로 채운 뒤 원-핫 인코딩\ncat_pipe = Pipeline([('fill', SimpleImputer(strategy='most_frequent')),\n                     ('onehot', OneHotEncoder(handle_unknown='ignore'))])\n\n# 두 처리를 칸별로 묶기\npre = ColumnTransformer([('num', num_pipe, num_cols),\n                         ('cat', cat_pipe, cat_cols)])\n\n# 전처리 + 모델을 하나의 파이프라인으로 연결\nmodel = Pipeline([('pre', pre), ('clf', LogisticRegression(max_iter=1000))])\n\n# 학습용/검증용 8:2 분할 (random_state 로 매번 같은 분할 보장)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)\nmodel.fit(X_tr, y_tr)  # 파이프라인 전체 학습 실행\n\n# 검증 데이터로 정확도 측정 후 출력\nacc = accuracy_score(y_te, model.predict(X_te))\nprint('정확도:', round(acc, 3))  # 결과 예: 정확도: 0.804",
        "note": "ColumnTransformer 와 Pipeline 을 쓰면 결측치 채우기·스케일링·인코딩이 새 데이터에도 자동으로 똑같이 적용된다.\n실무에서 전처리 누락 실수를 막아 주는 표준 패턴이다."
      }
    ]
  },
  "modeldev-1": {
    "theory": [
      {
        "h": "모델 개발은 '요리'와 같다",
        "body": "모델 개발은 좋은 재료(데이터)를 손질하고, 알맞은 조리법(알고리즘)을 골라, 맛을 보며(평가) 완성해 가는 요리 과정과 비슷하다.\n아무리 비싼 칼(복잡한 모델)이 있어도 재료 손질(전처리)이 엉망이면 좋은 요리가 나오지 않는다.\n그래서 우리는 화려한 모델부터 쓰는 대신, 먼저 단순한 베이스라인을 만들어 '기본 맛'을 확인한다.\n\n이렇게 기준점을 잡아 두면, 나중에 복잡한 모델을 써서 정말 더 나아졌는지 정직하게 비교할 수 있다.\n오늘은 이 '기본 요리 한 그릇'을 끝까지 만들어 보는 것이 목표다."
      },
      {
        "h": "왜 데이터를 나눠야 할까",
        "body": "시험 문제를 미리 보고 외운 학생은 그 시험만 잘 보고, 처음 보는 문제는 못 푼다.\n모델도 똑같아서, 학습에 쓴 데이터로 점수를 매기면 실제 실력보다 부풀려진 점수가 나온다.\n그래서 데이터를 '공부용(train)'과 '최종시험용(test)'으로 미리 나누고, 시험용은 학습이 끝날 때까지 절대 보여주지 않는다.\n\n교차검증은 한 발 더 나아가, 데이터를 여러 조각으로 잘라 번갈아 시험을 보게 한다.\n한 번의 운 좋은(혹은 나쁜) 점수가 아니라 여러 번 시험의 평균을 보기 때문에, 모델의 진짜 실력을 더 믿을 만하게 알 수 있다."
      },
      {
        "h": "문제 유형이 모델을 결정한다",
        "body": "예측하려는 정답이 '종류(고양이/강아지, 합격/불합격)'면 분류 문제이고, '숫자(집값, 내일 기온)'면 회귀 문제다.\n문제 유형을 먼저 정해야 그에 맞는 모델과 평가지표를 고를 수 있다.\n분류에는 정확도 같은 지표를, 회귀에는 오차(RMSE) 같은 지표를 쓴다.\n\n처음에는 로지스틱 회귀나 결정트리처럼 단순하고 결과를 설명하기 쉬운 모델부터 시작하는 것이 좋다.\n단순한 모델이 기준점을 만들어 주고, 데이터에 어떤 문제가 있는지도 빨리 드러내 주기 때문이다."
      }
    ],
    "realCode": [
      {
        "title": "전처리→학습→평가까지 한 번에: 베이스라인 분류 파이프라인",
        "lang": "python",
        "note": "데이터 적재부터 분할·파이프라인 학습·테스트 평가·교차검증까지 한 흐름으로 담은 엔드투엔드 예제다.\n각 줄의 주석을 읽으며 '무엇을' '왜' 하는지 따라가면 된다.",
        "code": "# 사이킷런(scikit-learn)에서 필요한 도구들을 불러온다\nfrom sklearn.datasets import load_iris            # 연습용 붓꽃 데이터셋(꽃 크기로 품종 맞히기)\nfrom sklearn.model_selection import train_test_split, cross_val_score  # 데이터 분할 + 교차검증 도구\nfrom sklearn.preprocessing import StandardScaler  # 숫자 크기를 비슷한 범위로 맞춰주는 전처리기\nfrom sklearn.linear_model import LogisticRegression  # 단순하고 빠른 분류 모델(베이스라인용)\nfrom sklearn.pipeline import make_pipeline        # 전처리와 모델을 하나로 묶어주는 도구\n\n# 1) 데이터를 불러온다\ndata = load_iris()      # 붓꽃 데이터 묶음(설명데이터 X 와 정답 y 가 함께 들어있음)\nX = data.data           # X: 꽃받침/꽃잎의 길이·너비 4개 숫자(모델에게 주는 '문제')\ny = data.target         # y: 품종 번호 0,1,2 (모델이 맞혀야 할 '정답')\nprint('데이터 크기:', X.shape)  # 결과: 데이터 크기: (150, 4)  → 150송이, 특징 4개\n\n# 2) 학습용 80% / 테스트용 20% 로 나눈다 (test_size=0.2)\n#    stratify=y 는 품종 비율을 양쪽에 똑같이 유지하라는 뜻\n#    random_state=42 는 '항상 같은 방식으로 섞어' 결과를 재현 가능하게 함\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\n\n# 3) 전처리(StandardScaler) + 모델(LogisticRegression) 을 한 줄로 묶는다\n#    max_iter=1000 은 학습 반복 횟수 한도(수렴 경고를 막기 위해 넉넉히 줌)\nmodel = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))\n\n# 4) 학습: 공부용 데이터로 규칙을 익히게 한다\nmodel.fit(X_train, y_train)  # X_train(문제)과 y_train(정답)을 보고 패턴 학습\n\n# 5) 평가: 처음 보는 테스트 데이터로 점수를 매긴다\ntest_acc = model.score(X_test, y_test)  # 맞힌 비율(정확도)을 0~1 사이 숫자로 반환\nprint('테스트 정확도:', round(test_acc, 3))  # 결과 예: 테스트 정확도: 0.967\n\n# 6) 교차검증: 학습 데이터를 5조각으로 나눠 번갈아 시험(cv=5)\nscores = cross_val_score(model, X_train, y_train, cv=5)  # 5개의 점수 배열 반환\nprint('교차검증 점수들:', scores.round(3))      # 결과 예: [0.958 0.958 0.917 1.    0.958]\nprint('교차검증 평균:', round(scores.mean(), 3))  # 결과 예: 교차검증 평균: 0.958"
      }
    ]
  },
  "modeldev-2": {
    "theory": [
      {
        "h": "하이퍼파라미터는 '오븐의 다이얼'이다",
        "body": "빵을 구울 때 온도와 시간 다이얼을 어떻게 맞추느냐에 따라 결과가 완전히 달라진다.\n하이퍼파라미터가 바로 이 다이얼이어서, 트리의 깊이나 학습률 같은 값을 사람이 미리 정해 줘야 한다.\n학습으로 저절로 정해지는 값(가중치)과 달리, 이 값들은 우리가 실험해 가며 좋은 자리를 찾아야 한다.\n\n문제는 다이얼이 여러 개라 조합이 너무 많다는 점이다.\n그래서 손으로 하나씩 돌리는 대신, 그리드 서치나 랜덤 서치 같은 '자동 탐색기'에게 맡긴다.\n자동 탐색기는 각 조합을 교차검증으로 공정하게 시험해, 가장 맛있게 구워지는 다이얼 위치를 찾아 준다."
      },
      {
        "h": "탐색 방법, 무엇을 언제 쓰나",
        "body": "그리드 서치는 후보를 격자처럼 빠짐없이 다 시험하므로 확실하지만, 조합이 많아지면 매우 느려진다.\n랜덤 서치는 무작위로 골라 보기 때문에 같은 시간에 더 넓은 범위를 훑을 수 있어, 후보가 많을 때 유리하다.\n베이지안 최적화는 지금까지의 결과를 보고 '다음엔 이쪽이 유망하다'고 똑똑하게 다음 후보를 고르는 방식이다.\n\n처음에는 랜덤 서치로 대략 좋은 영역을 찾고, 그 근처에서 그리드 서치로 촘촘히 다듬는 2단계 전략이 실전에서 효율적이다.\n어떤 방법을 쓰든, 점수는 반드시 교차검증으로 매겨야 운이 아니라 실력으로 고른 것이 된다."
      },
      {
        "h": "여럿이 모이면 똑똑해진다 - 앙상블",
        "body": "한 사람의 판단보다 여러 전문가의 의견을 모은 다수결이 대체로 더 정확하다.\n앙상블은 이 상식을 모델에 적용해, 여러 모델의 예측을 합쳐 더 안정적이고 정확한 결론을 만든다.\n배깅은 서로 조금씩 다른 모델을 동시에 키워 평균을 내고(랜덤포레스트가 대표), 부스팅은 앞 모델의 실수를 뒤 모델이 메우며 순서대로 키운다.\n\n부스팅 계열(GradientBoosting, XGBoost 등)은 표 형태 데이터에서 특히 강력해 실무에서 자주 쓰인다.\n다만 모델이 무거워지고 느려질 수 있으니, 마지막에는 경량화로 속도와 정확도의 균형을 맞춰 준다."
      }
    ],
    "realCode": [
      {
        "title": "GridSearchCV 로 랜덤포레스트 자동 튜닝 + 베이스라인 비교(엔드투엔드)",
        "lang": "python",
        "note": "후보 조합을 격자로 정의하고, 교차검증으로 가장 좋은 설정을 자동으로 찾은 뒤 테스트 점수까지 비교한다.\n각 줄 주석으로 '무엇을 왜' 하는지 따라가면 그대로 재현할 수 있다.",
        "code": "from sklearn.datasets import load_iris                 # 연습용 데이터\nfrom sklearn.model_selection import train_test_split, GridSearchCV  # 분할 + 자동 튜닝 도구\nfrom sklearn.ensemble import RandomForestClassifier     # 트리 여러 개를 모은 앙상블 모델\n\n# 1) 데이터 준비 및 분할\nX, y = load_iris(return_X_y=True)     # 설명데이터 X, 정답 y 를 한 번에 받기\nX_tr, X_te, y_tr, y_te = train_test_split(   # 학습 80% / 테스트 20%\n    X, y, test_size=0.2, stratify=y, random_state=42)  # 비율 유지 + 재현성 고정\n\n# 2) 베이스라인: 기본 설정 그대로의 랜덤포레스트\nbase = RandomForestClassifier(random_state=42)  # 손잡이를 안 건드린 기본 모델\nbase.fit(X_tr, y_tr)                              # 학습\nbase_acc = base.score(X_te, y_te)                # 테스트 정확도(기준점)\nprint('베이스라인 정확도:', round(base_acc, 3))   # 결과 예: 베이스라인 정확도: 0.933\n\n# 3) 튜닝할 손잡이(하이퍼파라미터) 후보를 격자로 정의\nparam_grid = {\n    'n_estimators': [50, 100, 200],   # 트리 개수: 많을수록 안정적이지만 느려짐\n    'max_depth': [2, 3, 4, None],      # 트리 최대 깊이: 깊을수록 복잡(과적합 위험)\n    'min_samples_leaf': [1, 2, 4],     # 잎 노드 최소 샘플 수: 클수록 단순(과적합 억제)\n}\n\n# 4) GridSearchCV: 모든 조합 x 5겹 교차검증으로 자동 시험\ngrid = GridSearchCV(\n    RandomForestClassifier(random_state=42),  # 튜닝 대상 모델\n    param_grid,                               # 위에서 정의한 후보 격자\n    cv=5,                                     # 5겹 교차검증으로 공정 평가\n    n_jobs=-1,                                # 가능한 CPU 코어를 모두 사용(속도 향상)\n)\ngrid.fit(X_tr, y_tr)   # 모든 조합을 시험(시간이 조금 걸림)\n\n# 5) 가장 좋았던 설정과 그때의 교차검증 점수 확인\nprint('최적 파라미터:', grid.best_params_)             # 예: {'max_depth': 3, 'min_samples_leaf': 1, 'n_estimators': 100}\nprint('최적 교차검증 점수:', round(grid.best_score_, 3))  # 예: 최적 교차검증 점수: 0.95\n\n# 6) 최적 모델로 테스트 점수 측정 후 베이스라인과 비교\nbest_acc = grid.best_estimator_.score(X_te, y_te)  # 최적 모델의 테스트 정확도\nprint('튜닝 후 정확도:', round(best_acc, 3))         # 결과 예: 튜닝 후 정확도: 0.967\nprint('향상폭:', round(best_acc - base_acc, 3))      # 결과 예: 향상폭: 0.034"
      },
      {
        "title": "조기종료(Early Stopping)로 과적합 막기",
        "lang": "python",
        "note": "검증 점수가 일정 횟수 동안 좋아지지 않으면 학습을 스스로 멈춘다.\n불필요한 학습을 줄여 과적합과 시간 낭비를 동시에 막는다.",
        "code": "from sklearn.datasets import load_breast_cancer        # 유방암 진단(이진 분류) 데이터\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import HistGradientBoostingClassifier  # 조기종료를 지원하는 부스팅 모델\n\n# 1) 데이터 준비 및 분할\nX, y = load_breast_cancer(return_X_y=True)   # X: 종양 특징들, y: 양성/악성(0/1)\nX_tr, X_te, y_tr, y_te = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\n\n# 2) 조기종료 옵션을 켠 부스팅 모델 정의\nmodel = HistGradientBoostingClassifier(\n    max_iter=1000,            # 최대 1000번까지 학습 시도(상한선)\n    early_stopping=True,      # 더 나아지지 않으면 일찍 멈추기 ON\n    validation_fraction=0.2,  # 학습 데이터 중 20%를 '중간점검용'으로 떼어 둠\n    n_iter_no_change=15,      # 15번 연속 개선 없으면 멈춤(인내심 한도)\n    random_state=42,\n)\nmodel.fit(X_tr, y_tr)         # 학습(조건을 만족하면 1000번을 다 채우지 않고 멈춤)\n\n# 3) 실제로 몇 번 만에 멈췄는지, 점수는 얼마인지 확인\nprint('실제 학습 횟수:', model.n_iter_)            # 예: 실제 학습 횟수: 87 (1000보다 훨씬 적음)\nprint('테스트 정확도:', round(model.score(X_te, y_te), 3))  # 결과 예: 테스트 정확도: 0.965"
      }
    ]
  },
  "rag-1": {
    "theory": [
      {
        "h": "왜 LLM만으로는 부족하고 RAG가 필요한가",
        "body": "LLM은 아주 똑똑한 사람이지만 시험장에 책을 못 들고 들어간 상태와 같다.\n학습한 시점까지의 지식만 머릿속에 있어서, 우리 회사 내부 문서나 어제 바뀐 규정은 알지 못한다.\n그래서 모르는 것을 물으면 솔직히 모른다고 하지 않고 그럴듯하게 지어내는데, 이것을 환각이라고 부른다.\n\nRAG는 이 똑똑한 사람에게 시험 직전에 관련 페이지를 펼친 책을 손에 쥐여 주는 것과 같다.\n질문이 들어오면 먼저 문서 더미에서 관련 내용을 검색해 찾아오고, 그 내용을 함께 보여주며 답하게 한다.\n이렇게 하면 최신 정보와 우리만의 자료를 근거로 답할 수 있고, 출처까지 제시할 수 있어 신뢰도가 크게 올라간다."
      },
      {
        "h": "RAG 파이프라인의 두 단계: 미리 준비하기와 실시간 답하기",
        "body": "RAG는 크게 두 시점으로 나뉜다.\n첫째는 미리 준비하는 단계로, 문서를 불러와(로딩) 작은 조각으로 자르고(청킹) 숫자 벡터로 바꿔(임베딩) 벡터 DB에 저장(색인)하는 과정이다.\n이 단계는 식당이 영업 전에 재료를 손질해 냉장고에 정리해 두는 것과 같다.\n\n둘째는 실시간으로 답하는 단계로, 사용자의 질문이 들어오면 그 질문을 벡터로 바꿔 가장 비슷한 조각들을 찾고(검색), 찾은 조각을 질문과 함께 LLM에게 건네 답을 만든다(생성).\n오늘은 이 중 첫째 단계인 준비하기, 즉 인덱싱에 집중한다.\n준비가 잘 되어 있어야 둘째 날의 검색과 생성이 정확해지기 때문이다."
      }
    ],
    "realCode": [
      {
        "title": "PDF 문서를 벡터 인덱스로 만드는 엔드투엔드 인덱싱 스크립트",
        "lang": "python",
        "code": "# 필요한 라이브러리들을 불러온다(설치: pip install langchain langchain-community langchain-openai chromadb pypdf)\nfrom langchain_community.document_loaders import PyPDFLoader  # PDF 파일을 읽어 문서 객체로 만들어 주는 도구\nfrom langchain.text_splitter import RecursiveCharacterTextSplitter  # 긴 글을 똑똑하게 잘라 주는 도구\nfrom langchain_openai import OpenAIEmbeddings  # 문장을 숫자 벡터로 바꿔 주는 OpenAI 임베딩 모델\nfrom langchain_community.vectorstores import Chroma  # 벡터를 저장하고 검색해 주는 가벼운 벡터 DB\n\n# 1) 문서 로딩: docs 폴더의 PDF 파일 경로를 지정해 로더를 만든다\nloader = PyPDFLoader(\"docs/company_policy.pdf\")  # 괄호 안 인자는 읽어올 PDF의 파일 경로\npages = loader.load()  # 실제로 PDF를 읽어 페이지별 문서 리스트로 반환\nprint(f\"총 {len(pages)}페이지 로드\")  # 결과: 총 12페이지 로드\n\n# 2) 청킹: 한 조각 500자, 조각끼리 50자 겹치게 설정해 분할기를 만든다\nsplitter = RecursiveCharacterTextSplitter(\n    chunk_size=500,    # 한 조각의 최대 글자 수(너무 크면 검색이 뭉뚱그려진다)\n    chunk_overlap=50,  # 앞뒤 조각이 50자 겹치게 해 문맥이 끊기지 않도록 한다\n)\nchunks = splitter.split_documents(pages)  # 페이지들을 받아 작은 조각 리스트로 자른다\nprint(f\"조각 {len(chunks)}개 생성\")  # 결과: 조각 37개 생성\n\n# 3) 임베딩 + 색인: 각 조각을 벡터로 바꿔 Chroma DB에 저장한다\nembeddings = OpenAIEmbeddings(model=\"text-embedding-3-small\")  # 사용할 임베딩 모델 이름 지정\nvectordb = Chroma.from_documents(\n    documents=chunks,                 # 벡터로 만들 문서 조각들\n    embedding=embeddings,             # 변환에 쓸 임베딩 모델\n    persist_directory=\"chroma_db\",    # 벡터를 디스크에 저장할 폴더 이름\n)\nprint(\"인덱싱 완료, chroma_db 폴더에 저장됨\")  # 결과: 인덱싱 완료, chroma_db 폴더에 저장됨\n\n# 4) 확인: 저장된 인덱스에 질문을 던져 비슷한 조각 3개를 찾아본다\nresults = vectordb.similarity_search(\"환불 규정은 어떻게 되나요?\", k=3)  # k=3은 가장 가까운 3개를 의미\nfor i, doc in enumerate(results, start=1):  # 찾은 조각을 1번부터 번호 매겨 반복\n    print(f\"[{i}] {doc.page_content[:80]}\")  # 각 조각의 앞 80자만 미리보기로 출력",
        "note": "PDF 한 개를 로딩→청킹→임베딩→색인까지 한 번에 처리하는 RAG 준비 단계의 완성형 코드다.\nsimilarity_search 결과가 질문과 관련 있으면 인덱싱이 잘 된 것이다."
      }
    ]
  },
  "rag-2": {
    "theory": [
      {
        "h": "검색이 답의 품질을 좌우한다",
        "body": "RAG에서 LLM은 요리사이고 검색은 장보기와 같다.\n아무리 솜씨 좋은 요리사라도 잘못된 재료를 받으면 좋은 요리를 낼 수 없다.\n즉 리트리버가 질문과 동떨어진 조각을 가져오면, LLM은 그 잘못된 내용을 근거로 엉뚱한 답을 만든다.\n\n그래서 가져올 개수 k를 적절히 정하는 일이 중요하다.\nk가 너무 작으면 정답이 든 조각을 놓치고, 너무 크면 관련 없는 내용까지 섞여 답이 흐려진다.\n보통 3에서 5 사이로 시작해 결과를 보며 조정하고, 의미 검색만으로 약할 때는 키워드 검색을 더하는 하이브리드 방식을 쓴다."
      },
      {
        "h": "재순위와 출처 인용으로 신뢰를 더한다",
        "body": "재순위는 면접에 비유할 수 있다.\n서류로 후보를 넉넉히 20명 추린 뒤, 면접으로 다시 점수를 매겨 상위 4명만 뽑는 것과 같다.\n벡터 검색으로 빠르게 후보를 많이 가져온 다음, 더 정교한 재순위 모델로 다시 줄을 세우면 진짜 관련 높은 조각이 위로 온다.\n\n마지막으로 답을 만들 때는 가져온 조각만 근거로 삼게 하고, 근거가 없으면 솔직히 모른다고 답하도록 프롬프트로 못을 박는다.\n그리고 어떤 문서의 몇 페이지를 봤는지 출처를 함께 보여 주면, 사용자가 답을 직접 검증할 수 있어 신뢰가 크게 올라간다.\n이 출처 인용은 실무에서 RAG를 도입하는 가장 큰 이유 중 하나다."
      }
    ],
    "realCode": [
      {
        "title": "검색→프롬프트→생성을 LCEL로 잇고 출처까지 보여 주는 QA 체인",
        "lang": "python",
        "code": "# 어제 만든 벡터 인덱스를 다시 열어 질의응답 체인을 만든다\nfrom langchain_community.vectorstores import Chroma  # 벡터 DB\nfrom langchain_openai import OpenAIEmbeddings, ChatOpenAI  # 임베딩 모델과 대화형 LLM\nfrom langchain_core.prompts import ChatPromptTemplate  # 프롬프트 틀을 만드는 도구\nfrom langchain_core.output_parsers import StrOutputParser  # LLM 출력을 문자열로 깔끔히 뽑는 파서\nfrom langchain_core.runnables import RunnablePassthrough  # 입력을 그대로 흘려보내는 부품\n\n# 1) 어제 저장한 인덱스를 같은 임베딩 모델로 다시 연다\nembeddings = OpenAIEmbeddings(model=\"text-embedding-3-small\")  # 색인할 때와 같은 모델이어야 한다\nvectordb = Chroma(persist_directory=\"chroma_db\", embedding_function=embeddings)  # 저장 폴더를 지정해 로드\nretriever = vectordb.as_retriever(search_kwargs={\"k\": 4})  # 가장 비슷한 4개를 가져오는 리트리버\n\n# 2) 가져온 조각들을 하나의 문자열로 합치는 함수(출처도 함께 표기)\ndef format_docs(docs):  # docs는 검색으로 찾은 문서 조각 리스트\n    lines = []  # 조각 내용을 모을 빈 리스트\n    for d in docs:  # 각 조각을 하나씩 돌면서\n        src = d.metadata.get(\"source\", \"?\")  # 조각이 어느 파일에서 왔는지 출처를 꺼낸다\n        page = d.metadata.get(\"page\", \"?\")  # 몇 페이지에서 왔는지 꺼낸다\n        lines.append(f\"[{src} p.{page}] {d.page_content}\")  # 출처를 앞에 붙여 합친다\n    return \"\\n\\n\".join(lines)  # 조각들을 빈 줄로 구분해 하나의 글로 만든다\n\n# 3) LLM에게 줄 지시문(프롬프트) 틀을 만든다\nprompt = ChatPromptTemplate.from_template(\n    \"아래 컨텍스트만 근거로 한국어로 답하세요. 근거가 없으면 '모른다'고 답하세요.\\n\\n\"\n    \"[컨텍스트]\\n{context}\\n\\n[질문]\\n{question}\"  # {context}와 {question} 자리에 실제 값이 채워진다\n)\nllm = ChatOpenAI(model=\"gpt-4o-mini\", temperature=0)  # temperature=0은 매번 일관된 답을 내게 한다\n\n# 4) 검색→프롬프트→LLM→문자열 순서로 부품을 파이프(|)로 연결한다\nchain = (\n    {\"context\": retriever | format_docs, \"question\": RunnablePassthrough()}  # 질문은 검색에도, 그대로도 전달\n    | prompt        # 위 값들을 프롬프트 틀에 채워 넣고\n    | llm           # 완성된 프롬프트를 LLM에 보내 답을 받고\n    | StrOutputParser()  # 답에서 순수 텍스트만 뽑아낸다\n)\n\n# 5) 실제로 질문을 던져 답을 확인한다\nanswer = chain.invoke(\"연차 휴가는 며칠인가요?\")  # 괄호 안 문자열이 사용자의 질문\nprint(answer)  # 결과: 문서 근거에 기반한 답변 문장이 출력됨\n\n# 6) 답의 근거가 된 출처도 따로 보여 준다\nfor d in retriever.invoke(\"연차 휴가는 며칠인가요?\"):  # 같은 질문으로 근거 조각을 다시 가져와\n    print(\"출처:\", d.metadata.get(\"source\"), \"p.\", d.metadata.get(\"page\"))  # 파일명과 페이지 출력",
        "note": "리트리버·프롬프트·LLM을 LCEL 파이프로 한 줄에 엮어 출처까지 보여 주는 RAG QA의 완성형이다.\ntemperature=0과 '모르면 모른다' 지시가 환각을 줄이는 핵심 장치다."
      }
    ]
  },
  "rag-3": {
    "theory": [
      {
        "h": "RAG는 느낌이 아니라 숫자로 평가한다",
        "body": "RAG를 만들고 나면 '잘 되는 것 같다'는 느낌만으로 끝내기 쉽다.\n하지만 느낌은 사람마다 다르고 어제와 오늘이 다르기 때문에, 개선 여부를 객관적으로 알 수 없다.\n그래서 시험 채점표처럼 점수를 매기는 평가가 필요하다.\n\nRAGAS는 대표적인 평가 도구로, 두 가지를 특히 많이 본다.\n첫째 충실도는 답이 가져온 문서에 충실한지, 즉 없는 말을 지어내지 않았는지를 본다.\n둘째 답변 관련성은 답이 질문에 제대로 맞는지를 본다.\n이 점수를 기준선으로 잡아 두면, 무언가를 바꿨을 때 좋아졌는지 나빠졌는지를 숫자로 확인할 수 있다."
      },
      {
        "h": "튜닝과 운영: 품질·비용·속도의 줄다리기",
        "body": "RAG의 성능을 올리는 손잡이는 여러 개다.\n조각 크기, 겹침 양, 임베딩 모델, 가져올 개수 k, 재순위 사용 여부 등을 바꿔 가며 평가 점수를 비교한다.\n중요한 것은 한 번에 하나씩만 바꾸는 것인데, 그래야 무엇이 점수를 바꿨는지 알 수 있기 때문이다.\n\n실무에서는 품질만큼 비용과 속도도 중요하다.\nk를 키우거나 재순위를 더하면 답은 좋아지지만 LLM 토큰 비용과 응답 시간이 늘어난다.\n그래서 자주 들어오는 질문은 캐싱으로 결과를 재사용하고, 메타데이터 필터로 검색 범위를 좁혀 속도를 높인다.\n결국 RAG 운영은 품질과 비용과 속도 사이에서 균형점을 찾는 줄다리기다."
      }
    ],
    "realCode": [
      {
        "title": "RAGAS로 RAG 답변을 자동 채점하는 평가 스크립트",
        "lang": "python",
        "code": "# RAG 답변의 품질을 RAGAS로 자동 채점한다(설치: pip install ragas datasets)\nfrom datasets import Dataset  # 평가용 데이터를 표 형태로 묶는 도구\nfrom ragas import evaluate  # 실제 채점을 수행하는 함수\nfrom ragas.metrics import faithfulness, answer_relevancy  # 충실도·답변 관련성 지표\n\n# 1) 평가에 쓸 질문·정답을 사람이 미리 준비한다\nquestions = [\"연차 휴가는 며칠인가요?\", \"환불은 며칠 내 가능한가요?\"]  # 평가 질문 목록\nground_truths = [\"연 15일입니다\", \"구매 후 7일 이내 가능합니다\"]  # 각 질문의 모범 답안\n\n# 2) 우리 RAG가 만든 답과 근거 컨텍스트를 모은다(qa_chain은 2일차에서 만든 체인이라고 가정)\nanswers = []      # 체인이 생성한 답을 담을 리스트\ncontexts = []     # 답의 근거가 된 조각들을 담을 리스트\nfor q in questions:  # 질문을 하나씩 돌면서\n    answers.append(qa_chain.invoke(q))  # 체인으로 답을 생성해 저장\n    docs = retriever.invoke(q)          # 같은 질문으로 근거 조각을 가져오고\n    contexts.append([d.page_content for d in docs])  # 조각 본문만 리스트로 저장\n\n# 3) 모은 자료를 RAGAS가 요구하는 형식의 데이터셋으로 묶는다\ndataset = Dataset.from_dict({\n    \"question\": questions,        # 질문 열\n    \"answer\": answers,            # RAG가 만든 답 열\n    \"contexts\": contexts,         # 근거 조각 열(질문마다 리스트)\n    \"ground_truth\": ground_truths # 모범 답안 열\n})\n\n# 4) 충실도와 답변 관련성 두 지표로 채점을 실행한다\nresult = evaluate(dataset, metrics=[faithfulness, answer_relevancy])  # 채점 수행\nprint(result)  # 결과: {'faithfulness': 0.82, 'answer_relevancy': 0.79} 같은 점수표 출력",
        "note": "사람이 만든 정답셋과 RAG의 답을 비교해 충실도·관련성을 숫자로 매겨 준다.\n파라미터를 바꾼 뒤 이 점수를 다시 재면 개선 여부를 객관적으로 알 수 있다."
      }
    ]
  },
  "langchain-1": {
    "theory": [
      {
        "h": "왜 LangChain이 필요할까? — 부엌과 레시피 비유",
        "body": "LLM에게 직접 요청을 보내는 일은 마치 재료를 손에 들고 즉석에서 요리하는 것과 같다.\n한두 번은 괜찮지만, 프롬프트를 만들고 답을 다듬고 외부 자료를 붙이는 일이 반복되면 코드가 금세 지저분해진다.\nLangChain은 자주 쓰는 작업들을 '레시피 카드'처럼 미리 만들어 둔 부엌 같은 라이브러리다.\n프롬프트 만들기, 모델 부르기, 답 정리하기 같은 단계가 표준 부품으로 준비되어 있어 우리는 조립만 하면 된다.\n덕분에 같은 코드를 매번 새로 짜지 않고, 부품을 갈아 끼우며 빠르게 실험할 수 있다."
      },
      {
        "h": "LCEL: 파이프(|)로 잇는 컨베이어 벨트",
        "body": "LCEL의 핵심은 파이프 기호(|) 하나다.\n'프롬프트 | 모델 | 파서' 라고 쓰면, 왼쪽의 결과가 오른쪽으로 자동으로 넘어가는 컨베이어 벨트가 만들어진다.\n공장에서 부품이 벨트를 타고 다음 공정으로 넘어가듯, 입력이 각 단계를 거치며 점점 완성된 답으로 바뀐다.\n이렇게 만든 체인은 invoke로 한 번 실행하거나, stream으로 글자가 흐르듯 받거나, batch로 여러 개를 한꺼번에 처리할 수 있다.\n즉 한 번 조립해 두면 다양한 방식으로 재사용할 수 있어 매우 경제적이다."
      },
      {
        "h": "모델·프롬프트·파서 — 3대 핵심 부품",
        "body": "LangChain 앱은 크게 세 가지 부품으로 시작한다.\n첫째 모델은 실제로 답을 만드는 두뇌이고, 둘째 프롬프트는 두뇌에게 건네는 지시서이며, 셋째 파서는 두뇌의 답을 깔끔히 정리하는 비서다.\n이 셋만 이해하면 LangChain 코드의 절반은 읽을 수 있다.\n오늘은 이 세 부품을 따로따로 만져 본 뒤, 파이프로 이어 하나의 체인으로 완성하는 것이 목표다."
      }
    ],
    "realCode": [
      {
        "title": "엔드투엔드: 글을 받아 '한 줄 요약 + 키워드 3개'를 함께 내는 LCEL 파이프라인",
        "lang": "python",
        "code": "# .env 파일에 저장한 API 키를 코드로 불러오기 위한 라이브러리\nfrom dotenv import load_dotenv\n# OpenAI 채팅 모델을 LangChain에서 쓰기 위한 클래스\nfrom langchain_openai import ChatOpenAI\n# 빈칸이 있는 프롬프트 양식을 만드는 클래스\nfrom langchain_core.prompts import ChatPromptTemplate\n# 모델의 답(메시지)을 순수 문자열로 바꿔 주는 파서\nfrom langchain_core.output_parsers import StrOutputParser\n# 입력을 그대로 다음 단계로 흘려보내거나 여러 갈래로 나눌 때 쓰는 도구\nfrom langchain_core.runnables import RunnableParallel\n\n# .env 파일을 읽어 OPENAI_API_KEY를 환경변수로 등록한다(키 노출 방지)\nload_dotenv()\n\n# 사용할 LLM을 생성한다. temperature=0 은 매번 비슷한(안정적인) 답을 받기 위함\nllm = ChatOpenAI(model=\"gpt-4o-mini\", temperature=0)\n\n# 요약용 프롬프트: {text} 자리에 실제 글이 들어간다\nsummary_prompt = ChatPromptTemplate.from_template(\"다음 글을 한 문장으로 요약해줘:\\n{text}\")\n# 키워드용 프롬프트: 쉼표로 구분된 키워드 3개를 요청한다\nkeyword_prompt = ChatPromptTemplate.from_template(\"다음 글의 핵심 키워드 3개를 쉼표로 구분해 알려줘:\\n{text}\")\n\n# 요약 체인: 프롬프트 → 모델 → 문자열 파서 순으로 파이프 연결\nsummary_chain = summary_prompt | llm | StrOutputParser()\n# 키워드 체인: 같은 구조로 별도 체인 구성\nkeyword_chain = keyword_prompt | llm | StrOutputParser()\n\n# 두 체인을 동시에 실행해 결과를 하나의 딕셔너리로 묶는다\nfull_chain = RunnableParallel(summary=summary_chain, keywords=keyword_chain)\n\n# 분석할 예시 글(실제로는 뉴스 기사 등 어떤 글이든 가능)\nsample = \"LangChain은 LLM 앱 개발을 표준 부품 조립으로 단순화해 개발 속도를 크게 높인다.\"\n\n# 체인을 실제로 실행한다. {text:...} 가 두 프롬프트 모두에 전달된다\nresult = full_chain.invoke({\"text\": sample})\n\n# 결과 확인: 요약 문장 출력 (예상: 한 문장 요약)\nprint(\"요약:\", result[\"summary\"])\n# 결과 확인: 키워드 출력 (예상: LangChain, LLM, 조립 같은 단어 3개)\nprint(\"키워드:\", result[\"keywords\"])",
        "note": "두 개의 체인을 RunnableParallel로 묶으면 한 번의 invoke로 요약과 키워드를 동시에 받을 수 있다.\n각 체인이 같은 입력 {text} 를 공유하므로 입력 글만 바꾸면 전체 결과가 함께 갱신된다."
      }
    ]
  },
  "langchain-2": {
    "theory": [
      {
        "h": "메모리: 금붕어에게 일기장을 쥐여 주기",
        "body": "기본 LLM은 한 번의 질문만 보고 답한다.\n앞에서 무슨 말을 했는지 스스로 기억하지 못하는, 말하자면 금붕어 같은 상태다.\n그래서 멀티턴 대화를 만들려면 지금까지의 대화 내용을 우리가 직접 모아서 매번 같이 넘겨줘야 한다.\nLangChain의 메모리는 이 대화 기록을 일기장처럼 차곡차곡 쌓아 두었다가, 다음 질문을 보낼 때 함께 끼워 넣어 준다.\n덕분에 사용자가 '방금 그거 다시 설명해줘' 라고 해도 챗봇이 맥락을 이어 갈 수 있다."
      },
      {
        "h": "도구(Tool): 모르면 전화 찬스를 쓰는 LLM",
        "body": "LLM은 글을 잘 짓지만 정확한 계산이나 실시간 정보 조회에는 약하다.\n도구는 이럴 때 LLM이 외부 함수에 '전화 찬스'를 쓰게 해 주는 장치다.\n예를 들어 '345 곱하기 678' 이 나오면 직접 어림하지 않고 계산기 도구를 호출해 정확한 값을 받아 온다.\nLLM은 어떤 도구를 언제 부를지 판단만 하고, 실제 계산이나 검색은 우리가 만든 함수가 처리한다.\n이렇게 손발을 달아 주면 단순 챗봇이 실제 일을 해내는 에이전트로 발전한다."
      },
      {
        "h": "RAG: 오픈북 시험으로 바꾸기",
        "body": "LLM은 학습 시점 이후의 일이나 우리 회사 내부 문서는 알지 못한다.\n모르는 것을 물으면 그럴듯하게 지어내는 환각이 생기기도 한다.\nRAG는 이 문제를 '오픈북 시험'으로 바꾼다.\n질문이 들어오면 먼저 관련 문서 조각을 검색해 와서, 그 내용을 프롬프트에 함께 붙여 '이 자료만 보고 답하라'고 지시한다.\n그러면 AI가 자기 기억이 아니라 우리가 준 자료에 근거해 답하므로, 최신 정보와 사내 지식도 정확히 다룰 수 있다."
      }
    ],
    "realCode": [
      {
        "title": "엔드투엔드: 텍스트 문서를 임베딩해 근거와 함께 답하는 RAG 체인",
        "lang": "python",
        "code": "# API 키 로드용\nfrom dotenv import load_dotenv\n# 텍스트 파일을 읽어 오는 로더\nfrom langchain_community.document_loaders import TextLoader\n# 긴 문서를 일정 크기로 잘라 주는 분할기\nfrom langchain_text_splitters import RecursiveCharacterTextSplitter\n# 글을 벡터로 바꾸는 임베딩 모델\nfrom langchain_openai import OpenAIEmbeddings, ChatOpenAI\n# 벡터를 저장·검색하는 가벼운 벡터DB\nfrom langchain_chroma import Chroma\n# 프롬프트·파서·입력전달 부품\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import StrOutputParser\nfrom langchain_core.runnables import RunnablePassthrough\n\n# 환경변수(API 키) 로드\nload_dotenv()\n\n# 1) 문서 불러오기: docs.txt 내용을 통째로 읽는다\ndocs = TextLoader(\"docs.txt\", encoding=\"utf-8\").load()\n# 2) 문서 자르기: 500자씩, 50자는 겹치게 잘라 문맥 끊김을 줄인다\nsplitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)\nchunks = splitter.split_documents(docs)\n\n# 3) 조각들을 임베딩해 Chroma 벡터DB에 저장한다\nvectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())\n# 4) 질문과 비슷한 조각 3개를 찾아오는 retriever 생성\nretriever = vectorstore.as_retriever(search_kwargs={\"k\": 3})\n\n# 5) '문맥만 근거로 답하라'는 RAG 프롬프트 정의\nprompt = ChatPromptTemplate.from_template(\n    \"아래 문맥만 근거로 한국어로 답해. 모르면 모른다고 해.\\n\\n문맥:\\n{context}\\n\\n질문: {question}\")\n# 답을 만들 모델(안정적 답을 위해 temperature=0)\nllm = ChatOpenAI(model=\"gpt-4o-mini\", temperature=0)\n\n# 검색된 여러 조각을 하나의 문자열로 합치는 헬퍼 함수\ndef join_docs(found):\n    # 각 조각의 본문을 줄바꿈으로 이어 붙인다\n    return \"\\n\\n\".join(d.page_content for d in found)\n\n# 6) RAG 체인 조립: 질문은 retriever로 문맥을, 그대로 question으로도 전달\nrag_chain = (\n    {\"context\": retriever | join_docs, \"question\": RunnablePassthrough()}\n    | prompt | llm | StrOutputParser())\n\n# 7) 실제 질문 실행 (예상: 문서 내용에 근거한 답 출력)\nprint(rag_chain.invoke(\"회사의 설립 연도는?\"))",
        "note": "retriever가 찾은 조각을 join_docs로 합쳐 {context}에 넣고, 같은 질문을 {question}에도 그대로 전달한다.\n'모르면 모른다고 해' 라는 지시가 환각(없는 사실 지어내기)을 줄이는 핵심이다."
      }
    ]
  },
  "langchain-3": {
    "theory": [
      {
        "h": "스트리밍: 식당에서 음식이 나오는 방식",
        "body": "답이 길 때 모두 완성될 때까지 빈 화면을 보는 일은 사용자에게 매우 답답하다.\n스트리밍은 코스 요리처럼 만들어진 부분부터 차례로 내보내는 방식이다.\n첫 글자가 빨리 보이기 시작하므로 체감 대기 시간이 크게 줄어든다.\nChatGPT가 글자를 한 자씩 타이핑하듯 보여 주는 것이 바로 이 스트리밍이다.\nLangChain에서는 invoke 대신 stream을 쓰면 같은 체인을 손쉽게 스트리밍으로 바꿀 수 있다."
      },
      {
        "h": "캐싱·재시도·폴백: 서비스를 튼튼하게",
        "body": "실제 서비스가 되려면 빠르고, 비용이 적고, 잘 죽지 않아야 한다.\n캐싱은 같은 질문에 매번 모델을 부르지 않고 저장된 답을 재사용해 속도와 비용을 동시에 아낀다.\n재시도는 네트워크가 잠깐 끊기는 일시적 오류에 자동으로 다시 시도해 사용자가 실패를 느끼지 못하게 한다.\n폴백은 주력 모델이 멈췄을 때 보조 모델로 갈아타 서비스를 계속 굴린다.\n이 세 가지는 데모를 진짜 서비스로 끌어올리는 안전벨트와 같다."
      },
      {
        "h": "관측(LangSmith): 블랙박스에 창문 달기",
        "body": "체인이 길어지면 어디서 이상한 답이 나왔는지 눈으로 보기 어렵다.\n내부가 보이지 않는 블랙박스 상태에서는 디버깅이 막막하다.\nLangSmith는 각 단계의 입력과 출력, 걸린 시간, 쓴 토큰 수를 한눈에 보여 주는 창문을 달아 준다.\n환경변수 하나만 켜면 별도 코드 없이도 모든 실행이 자동 기록된다.\n덕분에 '왜 이런 답이 나왔지?' 를 추적하고 비용을 관리하기가 훨씬 쉬워진다."
      }
    ],
    "realCode": [
      {
        "title": "엔드투엔드: 캐싱·재시도를 적용한 요약 체인을 FastAPI로 서비스하기",
        "lang": "python",
        "code": "# 웹 API 프레임워크와 요청 본문 검증용\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel\n# 스트리밍 응답을 보내기 위한 클래스\nfrom fastapi.responses import StreamingResponse\n# API 키 로드\nfrom dotenv import load_dotenv\n# LangChain 부품들\nfrom langchain_openai import ChatOpenAI\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import StrOutputParser\n# 인메모리 캐시를 켜는 함수와 캐시 구현체\nfrom langchain_core.globals import set_llm_cache\nfrom langchain_community.cache import InMemoryCache\n\nload_dotenv()  # 환경변수 로드\nset_llm_cache(InMemoryCache())  # 같은 입력은 캐시에서 즉시 응답\n\n# 모델 준비\nllm = ChatOpenAI(model=\"gpt-4o-mini\", temperature=0)\n# 요약 프롬프트\nprompt = ChatPromptTemplate.from_template(\"다음 글을 세 문장으로 요약해줘:\\n{text}\")\n# 체인 조립 + 일시 오류 시 자동 재시도(.with_retry)\nchain = (prompt | llm | StrOutputParser()).with_retry()\n\napp = FastAPI()  # 웹 앱 생성\n\n# 요청 본문 형식 정의: text 문자열을 받는다\nclass Req(BaseModel):\n    text: str\n\n# 일반 요약: JSON으로 결과 반환\n@app.post(\"/summarize\")\ndef summarize(req: Req):\n    # 체인 실행 후 결과를 딕셔너리로 응답\n    return {\"summary\": chain.invoke({\"text\": req.text})}\n\n# 스트리밍 요약: 글자 단위로 흘려보냄\n@app.post(\"/stream\")\ndef stream(req: Req):\n    # 체인의 stream 결과를 그대로 HTTP 스트림으로 전달\n    return StreamingResponse(chain.stream({\"text\": req.text}), media_type=\"text/plain\")\n\n# 실행: uvicorn main:app --reload 후 http://127.0.0.1:8000/docs 접속",
        "note": "set_llm_cache로 캐시를, with_retry로 재시도를 한 줄씩 추가하면 서비스 안정성이 크게 오른다.\nFastAPI는 /docs 자동 문서를 제공하므로 별도 도구 없이 브라우저에서 바로 API를 호출해 볼 수 있다."
      }
    ]
  },
  "serving-1": {
    "theory": [
      {
        "h": "왜 모델을 '서빙' 해야 할까?",
        "body": "모델을 아무리 잘 학습시켜도 내 노트북의 주피터 노트북 안에만 있으면 다른 사람은 그 모델을 쓸 수 없다.\n서빙은 이 모델을 '항상 켜져 있는 식당 주방'처럼 만들어서, 누구든 인터넷으로 주문(입력 데이터)을 보내면 요리(예측 결과)를 받아 갈 수 있게 하는 일이다.\n\n예를 들어 쇼핑몰의 추천 모델은 고객이 페이지를 열 때마다 0.1초 안에 추천 결과를 내줘야 한다.\n그래서 모델을 파일로 저장한 뒤, 그 파일을 불러 대기시키고, 요청을 받을 창구(API)를 여는 세 단계가 서빙의 핵심이다.\n이 과목 첫날은 바로 이 '주방을 여는' 가장 기본적인 방법을 손으로 직접 만들어 본다."
      },
      {
        "h": "온라인·배치·스트림, 상황에 맞는 서빙 고르기",
        "body": "서빙 방식은 크게 세 가지가 있고, 상황에 따라 골라 써야 한다.\n온라인 서빙은 요청이 오는 즉시 한 건씩 답하는 방식으로, 챗봇이나 실시간 추천처럼 '지금 당장' 답이 필요할 때 쓴다.\n배치 서빙은 데이터를 모아 두었다가 새벽 2시처럼 한가한 시간에 몰아서 처리하는 방식으로, 매일 전체 고객의 이탈 점수를 한 번에 계산하는 일에 어울린다.\n\n스트림 서빙은 끊임없이 흘러 들어오는 데이터(예: 결제 로그)를 흐르는 대로 바로바로 처리하는 방식이다.\n실무에서는 '응답이 얼마나 빨라야 하는가'와 '한 번에 얼마나 많이 처리하는가'를 기준으로 이 셋 중 하나를 고른다."
      },
      {
        "h": "FastAPI 가 서빙 입문에 좋은 이유",
        "body": "FastAPI 는 파이썬으로 API 를 아주 쉽고 빠르게 만들 수 있는 도구다.\n함수 위에 `@app.post('/predict')` 한 줄만 붙이면 그 함수가 인터넷 주소(엔드포인트)가 되는 식이라 직관적이다.\n게다가 입력 양식(Pydantic)을 정해 두면 잘못된 데이터가 들어올 때 자동으로 막아 주고, `/docs` 주소로 들어가면 시험 삼아 호출해 볼 수 있는 화면까지 공짜로 만들어 준다.\n그래서 처음 서빙을 배우는 사람에게는 복잡한 설정 없이 '모델을 API 로 감싸는' 경험을 하기에 가장 좋은 출발점이다."
      }
    ],
    "realCode": [
      {
        "title": "학습→저장→FastAPI 서빙: 처음부터 끝까지",
        "lang": "python",
        "code": "# ===== train.py : 모델을 학습해서 파일로 저장하는 스크립트 =====\nfrom sklearn.datasets import load_iris            # 연습용 붓꽃 데이터셋을 불러오는 함수\nfrom sklearn.ensemble import RandomForestClassifier  # 분류에 쓸 랜덤포레스트 모델\nimport joblib                                       # 모델을 파일로 저장/로드하는 도구\n\ndata = load_iris()                                  # 데이터 적재: 입력(X)과 정답(y), 라벨 이름이 들어 있음\nX, y = data.data, data.target                       # X=꽃 측정값 4개, y=품종 번호(0,1,2)\n\nmodel = RandomForestClassifier(n_estimators=100)    # 나무 100그루로 구성한 분류 모델 생성\nmodel.fit(X, y)                                     # 데이터로 모델 학습(시험공부 단계)\n\njoblib.dump(model, 'model.joblib')                  # 학습된 모델을 파일로 저장(주방에 보관)\njoblib.dump(list(data.target_names), 'labels.joblib')  # 숫자→품종이름 변환표도 함께 저장\nprint('학습 완료, model.joblib 저장됨')             # 결과: 콘솔에 완료 메시지 출력\n\n\n# ===== app.py : 저장한 모델을 API로 서빙하는 스크립트 =====\nfrom fastapi import FastAPI                         # API 서버를 만드는 핵심 클래스\nfrom pydantic import BaseModel                      # 입력 양식(스키마)을 정의하는 도구\nimport joblib                                       # 저장한 모델 파일을 불러오는 도구\n\napp = FastAPI(title='Iris 분류 API')                # API 앱 본체 생성(식당 개업)\nMODEL_VERSION = 'v1.0.0'                            # 모델 버전 문자열(응답에 함께 돌려줄 정보)\nmodel = joblib.load('model.joblib')                # 서버 켜질 때 모델을 메모리에 한 번만 로드\nlabels = joblib.load('labels.joblib')              # 숫자 예측을 사람이 읽는 이름으로 바꿀 표\n\nclass IrisInput(BaseModel):                         # 클라이언트가 보낼 입력 양식 정의\n    sepal_length: float                            # 꽃받침 길이(실수)\n    sepal_width: float                             # 꽃받침 너비(실수)\n    petal_length: float                            # 꽃잎 길이(실수)\n    petal_width: float                             # 꽃잎 너비(실수)\n\n@app.post('/predict')                              # POST /predict 주소를 이 함수에 연결\ndef predict(item: IrisInput):                      # 검증을 통과한 입력이 item 으로 들어옴\n    features = [[item.sepal_length, item.sepal_width,   # 모델이 받는 2차원 형태로 입력 정리\n                 item.petal_length, item.petal_width]]\n    pred_num = int(model.predict(features)[0])      # 모델 예측(품종 번호 한 개)을 정수로 변환\n    return {                                        # JSON 형태로 결과 응답\n        'prediction': labels[pred_num],            # 번호를 품종 이름으로 바꿔서 반환\n        'model_version': MODEL_VERSION             # 어떤 버전 모델이 답했는지 함께 반환\n    }\n\n@app.get('/health')                                # 서버가 살아있는지 확인하는 점검용 주소\ndef health():                                      # 모니터링 도구가 주기적으로 호출함\n    return {'status': 'ok'}                         # 결과: {\"status\":\"ok\"} 반환\n",
        "note": "train.py 를 먼저 실행해 모델 파일을 만든 뒤 `uvicorn app:app --reload` 로 서버를 켜면 /docs 에서 바로 테스트할 수 있다.\n모델은 서버 시작 시 한 번만 로드해야 매 요청이 빠르다."
      }
    ]
  },
  "serving-2": {
    "theory": [
      {
        "h": "'내 컴퓨터에선 됐는데요' 문제와 컨테이너",
        "body": "개발자가 자기 노트북에서 잘 돌던 코드를 서버에 올리면 파이썬 버전이 다르거나 라이브러리가 없어서 갑자기 멈추는 일이 흔하다.\n이 '환경이 달라서 생기는 사고'를 막아 주는 것이 컨테이너다.\n컨테이너는 코드뿐 아니라 그 코드가 필요로 하는 모든 것(파이썬·라이브러리·설정)을 한 상자에 같이 담는다.\n\n그래서 그 상자를 통째로 옮기면 어느 컴퓨터에서든 똑같이 동작한다.\n이사할 때 짐을 컨테이너 박스에 담아 그대로 옮기면 새 집에서도 똑같이 풀 수 있는 것과 같은 원리다.\nDocker 는 이런 컨테이너를 만들고 실행하는 가장 널리 쓰이는 도구다."
      },
      {
        "h": "확장(Scaling): 손님이 몰릴 때 견디는 법",
        "body": "서비스를 운영하다 보면 평소엔 한가하다가 이벤트 때 갑자기 요청이 수십 배로 몰리는 일이 생긴다.\n이때 컨테이너 한 개로는 버거우므로 똑같은 컨테이너를 여러 개 복제해 일을 나눠 맡기는데, 이를 수평 확장(scale out)이라고 한다.\n오토스케일링은 이 늘리고 줄이는 일을 사람이 아니라 시스템이 요청량을 보고 자동으로 하게 만든 것이다.\n\n식당으로 비유하면 손님이 밀려들 때 주방 인원을 늘리고, 한가해지면 다시 줄여 인건비를 아끼는 것과 같다.\n컨테이너는 똑같은 복제본을 빠르게 찍어낼 수 있어서 이런 자동 확장에 매우 잘 맞는다."
      },
      {
        "h": "관측성: 메트릭·로그·트레이싱 세 친구",
        "body": "서비스를 띄워 놓고 끝이 아니라, 지금 잘 돌고 있는지 늘 들여다봐야 한다.\n이때 쓰는 세 가지 단서가 메트릭·로그·트레이싱이다.\n메트릭은 '초당 요청 수 120건, 평균 응답 0.2초' 같은 숫자 지표로 전체 건강 상태를 보여 준다.\n로그는 '언제 누가 어떤 요청을 했고 에러가 났다' 같은 사건 기록이라 문제의 원인을 찾을 때 본다.\n트레이싱은 요청 하나가 여러 서비스를 거치는 경로와 각 구간 소요 시간을 따라가, 어디서 느려졌는지 짚어 준다.\n\n또한 모델 서빙에서는 입력 데이터가 학습 때와 달라지는 '드리프트'를 함께 감시해야 모델이 조용히 나빠지는 것을 일찍 잡아낼 수 있다."
      }
    ],
    "realCode": [
      {
        "title": "추론 API 를 컨테이너로 만드는 Dockerfile + compose",
        "lang": "bash",
        "code": "# ===== Dockerfile : 추론 API 이미지를 만드는 레시피 =====\nFROM python:3.11-slim          # 가볍고 파이썬 3.11이 깔린 베이스 이미지에서 시작\nWORKDIR /app                   # 컨테이너 안 작업 폴더를 /app 으로 지정\nCOPY requirements.txt .        # 의존성 목록 파일만 먼저 복사(캐시 활용으로 빌드 빨라짐)\nRUN pip install --no-cache-dir -r requirements.txt  # 목록대로 라이브러리 설치(캐시 없이 용량 절약)\nCOPY app.py model.joblib labels.joblib .  # 실제 코드와 모델 파일을 컨테이너로 복사\nEXPOSE 8000                    # 이 컨테이너가 8000번 포트를 쓴다고 표시\n# 0.0.0.0 으로 떠야 컨테이너 밖에서도 접속 가능\nCMD [\"uvicorn\", \"app:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]  # 컨테이너 시작 시 실행할 명령\n\n# ===== docker-compose.yml : 추론API + Prometheus 두 개를 함께 실행 =====\nversion: '3.8'                 # compose 파일 형식 버전\nservices:                      # 띄울 컨테이너 묶음 정의 시작\n  api:                         # 첫 번째 서비스 이름(추론 API)\n    build: .                   # 현재 폴더의 Dockerfile 로 이미지 빌드\n    ports:                     # 포트 연결(호스트:컨테이너)\n      - \"8000:8000\"           # 내 PC 8000 → 컨테이너 8000 으로 연결\n  prometheus:                  # 두 번째 서비스(지표 수집기)\n    image: prom/prometheus     # 공개된 Prometheus 이미지 그대로 사용\n    ports:                     # 포트 연결\n      - \"9090:9090\"           # 내 PC 9090 → Prometheus 9090\n    volumes:                   # 설정 파일을 컨테이너 안으로 연결\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml  # 수집 대상 설정 주입\n\n# ===== 실행 명령 =====\n# docker compose up --build    # 이미지 빌드 후 두 컨테이너를 한 번에 실행\n# docker compose down          # 실행한 컨테이너를 모두 정리\n",
        "note": "requirements.txt 만 먼저 COPY 해서 설치하면 코드만 바뀔 때 라이브러리 재설치를 건너뛰어 빌드가 빨라진다.\ncompose 로 묶으면 API 와 모니터링을 명령 한 줄로 함께 띄울 수 있다."
      },
      {
        "title": "FastAPI 에 Prometheus 모니터링 지표 붙이기",
        "lang": "python",
        "code": "from fastapi import FastAPI, Response          # API 본체와 응답 객체\nfrom prometheus_client import Counter, Histogram, generate_latest  # 지표 도구들\nimport time                                    # 응답 시간 측정용\nimport joblib                                   # 모델 로드용\n\napp = FastAPI()                                # API 앱 생성\nmodel = joblib.load('model.joblib')            # 모델을 메모리에 로드\n\n# 누적 카운터: 들어온 예측 요청 총 횟수를 센다\nREQ_COUNT = Counter('predict_requests_total', '예측 요청 총 횟수')\n# 히스토그램: 응답에 걸린 시간 분포를 기록한다\nREQ_LATENCY = Histogram('predict_latency_seconds', '예측 처리 시간(초)')\n\n@app.post('/predict')                          # 예측 엔드포인트\ndef predict(features: list[float]):            # 입력: 측정값 4개 리스트\n    REQ_COUNT.inc()                            # 요청이 올 때마다 카운터 +1\n    start = time.time()                        # 처리 시작 시각 기록\n    pred = int(model.predict([features])[0])   # 모델 예측 수행\n    REQ_LATENCY.observe(time.time() - start)   # 걸린 시간을 히스토그램에 기록\n    return {'prediction': pred}                # 예측 결과 반환\n\n@app.get('/metrics')                           # Prometheus 가 긁어갈 지표 노출 주소\ndef metrics():                                 # 주기적으로 호출됨\n    # 수집한 모든 지표를 Prometheus 텍스트 형식으로 반환\n    return Response(generate_latest(), media_type='text/plain')\n",
        "note": "Counter 는 계속 쌓이는 숫자(요청 수), Histogram 은 값의 분포(응답 시간)를 재는 데 쓴다.\n/metrics 만 열어 두면 Prometheus 가 알아서 주기적으로 가져간다."
      }
    ]
  },
  "serving-3": {
    "theory": [
      {
        "h": "MLOps 는 무슨 문제를 푸는가",
        "body": "모델 하나를 만드는 것은 시작일 뿐이고, 진짜 어려움은 그 모델을 계속 새 데이터로 다시 학습하고, 더 좋은 버전으로 바꾸고, 문제가 생기면 되돌리는 '운영'에 있다.\n이걸 사람이 손으로 하면 어떤 설정으로 학습했는지 잊어버리고, 어떤 모델이 지금 돌고 있는지 헷갈리며, 배포하다 실수가 난다.\nMLOps 는 이 모든 과정을 기록·자동화·표준화해서 실수를 줄이고 빠르게 반복할 수 있게 만드는 방법이다.\n\n쉽게 말해 '한 번 잘 만든 모델'이 아니라 '계속 잘 굴러가는 모델 공장'을 짓는 일이다.\n오늘은 그 공장의 핵심 부품인 실험 추적·모델 레지스트리·CI/CD 를 직접 다뤄 본다."
      },
      {
        "h": "실험 추적과 재현성: 기억에 의존하지 않기",
        "body": "모델을 개선하다 보면 '학습률을 0.01 로 했을 때가 좋았나, 0.001 이었나?' 하고 헷갈리는 순간이 반드시 온다.\n사람 기억은 못 믿으므로, 학습할 때마다 설정(파라미터)과 결과(정확도 등)를 자동으로 적어 두는 것이 실험 추적이다.\nMLflow 같은 도구를 쓰면 코드 몇 줄로 모든 실행이 표로 쌓여서, 어떤 설정이 가장 좋았는지 클릭 한 번으로 비교할 수 있다.\n\n여기에 더해 같은 코드·데이터·설정이면 항상 같은 결과가 나오도록 보장하는 것이 재현성이다.\n재현성이 있어야 'A 가 만든 좋은 모델'을 'B 도 똑같이 다시 만들' 수 있고, 문제가 생겼을 때 원인을 추적할 수 있다."
      },
      {
        "h": "CI/CD 와 AIOps: 자동화로 사람을 자유롭게",
        "body": "CI/CD 는 코드를 저장소에 올리는 순간 자동으로 테스트하고, 통과하면 자동으로 배포까지 이어 주는 컨베이어 벨트다.\n예를 들어 학습 코드를 고쳐 push 하면, 시스템이 알아서 모델을 다시 학습하고 정확도가 기준 이상인지 검사한 뒤 통과해야만 배포한다.\n이렇게 하면 새벽에 사람이 수동으로 배포하다 실수하는 일을 없앨 수 있다.\n\nAIOps 는 한 걸음 더 나아가, 운영 중에 쏟아지는 지표와 로그를 AI 가 분석해 평소와 다른 이상 징후를 자동으로 찾아내고 알림을 주거나 스스로 대응하게 한다.\n사람은 모든 화면을 24시간 볼 수 없으므로, 이런 자동 감시·대응이 안정적인 서비스 운영의 마지막 퍼즐 조각이 된다."
      }
    ],
    "realCode": [
      {
        "title": "MLflow 로 실험 추적하고 best 모델 등록까지",
        "lang": "python",
        "code": "import mlflow                                    # 실험 추적 도구\nimport mlflow.sklearn                          # sklearn 모델 저장 전용 모듈\nfrom sklearn.datasets import load_iris         # 연습용 데이터\nfrom sklearn.ensemble import RandomForestClassifier  # 분류 모델\nfrom sklearn.model_selection import train_test_split  # 데이터 분할\nfrom sklearn.metrics import accuracy_score     # 정확도 계산\n\nX, y = load_iris(return_X_y=True)              # 입력 X, 정답 y 한 번에 받기\n# 학습용 80% / 검증용 20% 로 나눔(seed 고정으로 재현성 확보)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)\n\nmlflow.set_experiment('iris-classification')   # 실험 묶음 이름 지정(없으면 생성)\n\nfor n in [10, 50, 100]:                         # 나무 개수를 바꿔 가며 여러 실험 실행\n    with mlflow.start_run():                   # 하나의 실행(run) 시작 — 이 블록이 한 실험\n        model = RandomForestClassifier(n_estimators=n, random_state=42)  # 설정대로 모델 생성\n        model.fit(X_tr, y_tr)                   # 학습 데이터로 학습\n        acc = accuracy_score(y_te, model.predict(X_te))  # 검증 정확도 계산\n\n        mlflow.log_param('n_estimators', n)    # 사용한 설정값 기록\n        mlflow.log_metric('accuracy', acc)     # 결과 지표 기록\n        # 모델 자체를 저장하고 레지스트리에 'iris-clf' 라는 이름으로 등록\n        mlflow.sklearn.log_model(model, 'model', registered_model_name='iris-clf')\n        print(f'n={n}, accuracy={acc:.3f}')    # 결과: 예) n=100, accuracy=0.967\n\n# 실행 후 `mlflow ui` 를 켜고 5000포트에서 run 들의 정확도를 표로 비교하면 된다\n",
        "note": "for 루프 안에서 설정만 바꿔 여러 run 을 남기면 MLflow UI 에서 어떤 설정이 가장 좋았는지 한눈에 비교된다.\nrandom_state 를 고정해 같은 결과가 재현되도록 한 점이 중요하다."
      },
      {
        "title": "GitHub Actions 로 학습·테스트 자동화 (CI)",
        "lang": "bash",
        "code": "# 파일 위치: .github/workflows/mlops.yml\nname: MLOps CI                     # 워크플로 이름(Actions 탭에 표시됨)\non:                                # 언제 이 워크플로를 돌릴지 정의\n  push:                            # 코드가 push 될 때마다 자동 실행\n    branches: [ main ]             # main 브랜치 push 만 대상\njobs:                              # 수행할 작업 묶음\n  build-and-test:                  # 작업 이름\n    runs-on: ubuntu-latest         # 깃허브가 빌려주는 우분투 가상머신에서 실행\n    steps:                         # 순서대로 실행할 단계들\n      - uses: actions/checkout@v4  # 1) 내 저장소 코드를 가상머신으로 내려받기\n      - uses: actions/setup-python@v5  # 2) 파이썬 환경 준비\n        with:\n          python-version: '3.11'   # 사용할 파이썬 버전 지정\n      - name: Install deps         # 3) 의존성 설치 단계\n        run: pip install -r requirements.txt  # requirements 대로 라이브러리 설치\n      - name: Train model          # 4) 모델 학습 실행\n        run: python train.py       # 학습 스크립트 실행(모델 파일 생성)\n      - name: Run tests            # 5) 테스트 실행(정확도 기준 검증 등)\n        run: pytest -q             # 테스트 통과해야 다음으로 진행\n# 한 단계라도 실패하면 빨간 X 가 뜨고 배포가 자동으로 막힌다\n",
        "note": "push 한 순간 깃허브가 깨끗한 가상머신에서 위 단계를 순서대로 실행한다.\n테스트가 실패하면 자동으로 배포가 차단되어 잘못된 모델이 서비스로 나가는 것을 막아 준다."
      }
    ]
  },
  "agent-1": {
    "theory": [
      {
        "h": "챗봇과 에이전트는 무엇이 다를까",
        "body": "보통의 챗봇은 질문을 받으면 자기가 외우고 있는 지식만으로 한 번에 답을 내놓는다.\n그래서 '오늘 환율'처럼 최신 정보나 정확한 계산이 필요한 일은 틀리기 쉽다.\n\n에이전트는 다르다.\n에이전트는 '내가 지금 이걸 바로 답할 수 있나, 아니면 도구를 써야 하나'를 먼저 판단한다.\n필요하면 계산기·검색·데이터베이스 같은 도구를 직접 골라 쓰고, 그 결과를 보고 다시 생각한 뒤 답을 만든다.\n비유하면 챗봇은 '시험장에서 머리로만 푸는 학생'이고, 에이전트는 '계산기와 인터넷을 쓸 수 있는 학생'이다."
      },
      {
        "h": "ReAct - 생각과 행동을 번갈아 한다",
        "body": "ReAct 는 Reasoning(추론) 과 Acting(행동) 의 앞 글자를 딴 말이다.\n사람이 길을 찾을 때 '음, 지도를 봐야겠다(생각) → 지도를 켠다(행동) → 아 여기구나(관찰) → 그럼 왼쪽으로(생각)' 를 반복하는 것과 똑같다.\n\n에이전트도 한 번에 끝내지 않고 이 '생각 → 행동 → 관찰' 고리를 여러 번 돈다.\n도구를 한 번 써서 얻은 결과가 부족하면 또 도구를 쓰고, 충분해지면 비로소 최종 답을 낸다.\nLangGraph 는 바로 이 반복되는 고리를 그래프(흐름도)로 깔끔하게 그릴 수 있게 도와주는 도구다."
      },
      {
        "h": "왜 LangGraph 인가 - 상태를 들고 도는 흐름도",
        "body": "에이전트는 같은 노드를 여러 번 돌기 때문에, 그동안 무엇을 했는지 '기억'을 들고 다녀야 한다.\nLangGraph 는 이 기억을 State(상태) 라는 공용 메모장에 담아 노드마다 자동으로 넘겨준다.\n\n각 노드는 메모장을 받아 자기 일을 하고, 바뀐 메모장을 다음 노드로 넘긴다.\n그리고 '도구를 더 써야 하면 도구 노드로, 다 됐으면 끝(END)으로' 가는 갈림길을 조건부 엣지로 그려두면, 복잡한 반복 로직을 if-else 범벅 없이 그림 한 장으로 관리할 수 있다."
      }
    ],
    "realCode": [
      {
        "title": "검색·계산 도구를 쓰는 단일 ReAct 에이전트 (엔드투엔드)",
        "lang": "python",
        "code": "# LangGraph에서 그래프를 만들기 위한 핵심 도구들을 불러온다\nfrom langgraph.graph import StateGraph, START, END  # 그래프 뼈대(StateGraph)와 시작/끝 표시(START/END)\nfrom langgraph.prebuilt import ToolNode  # 도구를 실제로 실행해 주는 미리 만들어진 노드\nfrom langchain_anthropic import ChatAnthropic  # Anthropic(클로드) 모델을 부르는 클래스\nfrom langchain_core.tools import tool  # 일반 함수를 '도구'로 등록하는 데코레이터\nfrom typing import Annotated, TypedDict  # 상태의 형태(타입)를 정의할 때 쓰는 도구\nfrom langgraph.graph.message import add_messages  # 메시지를 '덮어쓰지 않고 이어붙이게' 해주는 함수\n\n# 1) 상태(State) 정의: 에이전트가 들고 다니는 공용 메모장\nclass State(TypedDict):  # 딕셔너리인데 어떤 키가 들어가는지 미리 약속해 둔 형태\n    # messages 키에는 대화 메시지들이 쌓인다. add_messages 덕분에 새 메시지가 '추가'된다\n    messages: Annotated[list, add_messages]\n\n# 2) 도구 정의: LLM이 직접 못 하는 정확한 계산을 대신해 줄 함수\n@tool  # 이 데코레이터가 아래 함수를 '에이전트가 부를 수 있는 도구'로 바꿔 준다\ndef multiply(a: int, b: int) -> int:\n    \"\"\"두 정수 a와 b를 곱해 결과를 돌려준다.\"\"\"  # 이 설명을 LLM이 읽고 언제 쓸지 판단한다\n    return a * b  # 실제 곱셈 결과를 반환\n\ntools = [multiply]  # 에이전트가 쓸 수 있는 도구 목록(여기선 곱셈 하나)\n\n# 3) 모델 준비: 클로드 모델에 우리가 만든 도구 목록을 '연결'한다\nllm = ChatAnthropic(model=\"claude-sonnet-4-5\")  # 사용할 LLM 지정\nllm_with_tools = llm.bind_tools(tools)  # 모델이 필요할 때 multiply를 호출하도록 도구를 묶어 줌\n\n# 4) LLM 노드: 메모장을 받아 모델에게 물어보고, 답(또는 도구 호출 요청)을 메모장에 추가\ndef call_model(state: State):\n    response = llm_with_tools.invoke(state[\"messages\"])  # 지금까지의 대화를 통째로 모델에 넘김\n    return {\"messages\": [response]}  # 모델의 응답을 messages에 이어붙이도록 반환\n\n# 5) 분기 함수: 모델이 도구를 부르려 하면 'tools'로, 아니면 끝('END')으로 가도록 판단\ndef should_continue(state: State):\n    last = state[\"messages\"][-1]  # 가장 최근 메시지(=방금 모델이 한 말)를 꺼낸다\n    # tool_calls가 비어 있지 않으면 모델이 도구를 쓰고 싶다는 뜻이다\n    if last.tool_calls:\n        return \"tools\"  # 도구 실행 노드로 보낸다\n    return END  # 도구가 필요 없으면 여기서 종료\n\n# 6) 그래프 조립: 노드를 추가하고 엣지(이동선)로 연결한다\ngraph = StateGraph(State)  # State 형태를 쓰는 빈 그래프 생성\ngraph.add_node(\"model\", call_model)  # 'model'이라는 이름으로 LLM 노드 등록\ngraph.add_node(\"tools\", ToolNode(tools))  # 'tools' 이름으로 도구 실행 노드 등록\ngraph.add_edge(START, \"model\")  # 시작하면 무조건 model 노드부터\ngraph.add_conditional_edges(\"model\", should_continue)  # model 다음은 조건에 따라 tools 또는 END\ngraph.add_edge(\"tools\", \"model\")  # 도구를 쓴 뒤에는 결과를 들고 다시 model로 돌아가 생각\napp = graph.compile()  # 그래프를 실행 가능한 형태로 완성\n\n# 7) 실행: 사용자의 질문을 넣고 에이전트를 돌린다\nresult = app.invoke({\"messages\": [(\"user\", \"23 곱하기 17은 얼마야?\")]})\nprint(result[\"messages\"][-1].content)  # 결과: 23 곱하기 17은 391입니다 (와 같은 자연어 답)",
        "note": "도구 호출이 필요하면 model→tools→model 로 한 바퀴 더 돌고, 충분하면 END로 끝나는 ReAct 루프의 가장 기본 형태다.\n같은 그래프에 도구만 늘리면 검색·DB조회 에이전트로 확장된다."
      }
    ]
  },
  "agent-2": {
    "theory": [
      {
        "h": "왜 에이전트를 여러 명으로 나눌까",
        "body": "에이전트 한 명에게 조사도 시키고 글쓰기도 시키고 검수까지 시키면, 지시문이 길어지고 헷갈려 품질이 떨어진다.\n사람 회사도 한 명이 모든 일을 다 하지 않고 팀을 나누는 것과 같은 이유다.\n\n멀티 에이전트는 '조사 담당', '작성 담당', '검수 담당'처럼 역할을 쪼갠다.\n각 에이전트는 자기 일에만 집중하므로 지시가 짧고 명확해져 결과가 좋아진다.\n그리고 이들을 지휘하는 슈퍼바이저(감독)가 '이번엔 조사부터, 그다음 작성' 식으로 순서를 정해 준다.\n비유하면 슈퍼바이저는 PD, 작업자들은 각 분야 전문가다."
      },
      {
        "h": "슈퍼바이저-작업자 패턴",
        "body": "가장 많이 쓰는 멀티 에이전트 구조가 슈퍼바이저-작업자(supervisor-worker) 패턴이다.\n중앙에 감독 한 명을 두고, 그 주위에 전문 작업자들을 둔다.\n\n흐름은 단순하다.\n작업자가 일을 끝낼 때마다 결과를 들고 감독에게 돌아오고, 감독은 '아직 부족하니 다음은 작성 담당', '이제 충분하니 끝(FINISH)' 을 정한다.\n이렇게 하면 모든 결정이 감독 한 곳을 거치므로 흐름을 이해하고 디버깅하기가 쉽다.\n작업자를 새로 추가하고 싶으면 감독의 선택지에 이름 하나만 늘리면 된다."
      },
      {
        "h": "사람이 끼어드는 Human-in-the-loop",
        "body": "에이전트에게 메일 전송이나 결제처럼 되돌리기 어려운 일을 그냥 맡기면 사고가 날 수 있다.\n그래서 중요한 행동 직전에 '잠깐 멈추고 사람에게 물어보기'를 넣는다.\n이것이 Human-in-the-loop, 줄여서 HITL 이다.\n\nLangGraph 에서는 특정 노드 앞에 interrupt(인터럽트) 를 걸어 그래프를 그 지점에서 멈춘다.\n사람이 상태를 확인하고 괜찮으면 '진행'을, 아니면 내용을 고친 뒤 다시 이어가게 한다.\n이때 멈춘 상태를 기억해 두는 역할을 체크포인터가 하므로, 자리를 비웠다가 와서 이어가도 처음부터 다시 하지 않는다.\n비유하면 자동운전 중 위험 구간에서 '운전 넘겨받으시겠어요?' 하고 손을 들어주는 것과 같다."
      }
    ],
    "realCode": [
      {
        "title": "슈퍼바이저가 조사·작성 작업자를 지휘 + 작성 전 사람 승인 (엔드투엔드)",
        "lang": "python",
        "code": "from langgraph.graph import StateGraph, START, END  # 그래프 뼈대와 시작/끝 표시\nfrom langgraph.checkpoint.memory import MemorySaver  # 멈춘 상태를 기억해 두는 체크포인터(메모리용)\nfrom langchain_anthropic import ChatAnthropic  # 클로드 모델\nfrom typing import TypedDict, Literal  # 상태 형태와 '정해진 값만 허용' 타입\n\nllm = ChatAnthropic(model=\"claude-sonnet-4-5\")  # 공용으로 쓸 LLM 준비\n\n# 1) 공용 상태: 대화 누적(messages)과 다음에 일할 사람(next)을 담는다\nclass State(TypedDict):\n    messages: list   # 지금까지 오간 모든 메시지\n    next: str        # supervisor가 정한 다음 작업자 이름\n\n# 2) 감독 노드: 현재 상황을 보고 누구에게 일을 시킬지 한 단어로 답하게 한다\ndef supervisor(state: State):\n    prompt = (\n        \"너는 팀 감독이다. 대화를 보고 다음에 할 일을 정하라. \"  # 감독 역할 부여\n        \"조사가 필요하면 researcher, 글 작성이면 writer, 다 끝났으면 FINISH 라고만 답하라.\"  # 선택지 안내\n    )\n    # 시스템 지시 + 지금까지 대화를 함께 모델에 넘긴다\n    decision = llm.invoke([(\"system\", prompt)] + state[\"messages\"]).content.strip()\n    return {\"next\": decision}  # 감독의 결정을 상태의 next에 저장\n\n# 3) 조사 작업자: 자료를 찾는 역할(여기선 예시로 고정 텍스트 반환)\ndef researcher(state: State):\n    info = \"조사결과: 전기차 시장은 연 20% 성장, 배터리 가격 하락이 핵심 동력.\"  # 실제로는 검색 도구 사용\n    return {\"messages\": state[\"messages\"] + [(\"assistant\", info)]}  # 조사 내용을 대화에 추가\n\n# 4) 작성 작업자: 모아진 내용을 바탕으로 3줄 요약을 만든다\ndef writer(state: State):\n    summary = llm.invoke(\n        state[\"messages\"] + [(\"user\", \"위 내용을 3줄로 요약해줘\")]  # 누적 대화 + 요약 지시\n    )\n    return {\"messages\": state[\"messages\"] + [summary]}  # 요약 결과를 대화에 추가\n\n# 5) 분기 함수: 감독이 정한 next 값에 따라 어디로 갈지 결정\ndef route(state: State) -> Literal[\"researcher\", \"writer\", \"__end__\"]:\n    if state[\"next\"] == \"FINISH\":  # 감독이 끝내라고 했으면\n        return END                  # 그래프 종료\n    return state[\"next\"]            # 아니면 해당 작업자 이름으로 이동\n\n# 6) 그래프 조립\ngraph = StateGraph(State)\ngraph.add_node(\"supervisor\", supervisor)  # 감독 노드\ngraph.add_node(\"researcher\", researcher)  # 조사 노드\ngraph.add_node(\"writer\", writer)          # 작성 노드\ngraph.add_edge(START, \"supervisor\")        # 시작은 항상 감독부터\ngraph.add_conditional_edges(\"supervisor\", route)  # 감독 다음은 결정에 따라 분기\ngraph.add_edge(\"researcher\", \"supervisor\")  # 조사 끝나면 감독에게 보고\ngraph.add_edge(\"writer\", \"supervisor\")      # 작성 끝나면 감독에게 보고\n\n# 7) 사람 승인: writer 노드 '직전'에 멈추도록 인터럽트를 걸고, 상태를 기억할 체크포인터 연결\nmemory = MemorySaver()  # 멈춘 지점의 상태를 저장해 둘 곳\napp = graph.compile(checkpointer=memory, interrupt_before=[\"writer\"])  # writer 전에 일시정지\n\n# 8) 실행: thread_id로 대화 한 건을 식별(이어가기 위해 필요)\nconfig = {\"configurable\": {\"thread_id\": \"demo-1\"}}\napp.invoke({\"messages\": [(\"user\", \"전기차 시장 동향 조사해서 3줄 요약\")], \"next\": \"\"}, config)\nprint(\"writer 실행 직전에서 멈춤 - 사람 승인 대기\")  # 결과: 여기서 한 번 멈춘다\n# 사람이 내용을 확인한 뒤 '진행'을 의미하는 None을 넣어 이어서 실행한다\nfinal = app.invoke(None, config)\nprint(final[\"messages\"][-1].content)  # 결과: 전기차 시장의 3줄 요약문",
        "note": "supervisor가 작업자들을 라우팅하고, writer 직전 interrupt_before로 멈춰 사람이 승인해야 마지막 요약이 진행되는 멀티 에이전트 + HITL 의 기본 골격이다.\nresearcher의 고정 텍스트를 실제 검색 도구로 바꾸면 바로 실무형이 된다."
      }
    ]
  },
  "vectordb-1": {
    "theory": [
      {
        "h": "왜 '키워드 검색'만으로는 부족할까",
        "body": "옛날 검색은 글자가 똑같이 들어있는지를 보고 찾았다.\n그래서 '강아지'로 검색하면 '강아지'라는 글자가 든 문서만 나오고, 뜻이 같은 '반려견' 문서는 놓치기 쉬웠다.\n사람은 단어가 달라도 의미가 비슷하면 같은 주제로 느끼는데, 글자만 맞추는 검색은 이 '의미'를 모른다.\n\n임베딩은 바로 이 의미를 숫자로 담아낸다.\n'강아지'와 '반려견'을 비슷한 벡터로 만들어 두면, 글자가 달라도 가까운 위치에 놓이기 때문에 함께 검색된다.\n이렇게 의미로 찾는 검색을 '시맨틱 검색(semantic search)'이라 부르며, Vector DB가 이를 가능하게 해준다."
      },
      {
        "h": "벡터 공간과 유사도 — '가까우면 비슷하다'",
        "body": "임베딩 벡터를 공간 위의 점이라고 상상해 보자.\n비슷한 뜻의 문장들은 서로 가까이 모여 있고, 동떨어진 주제는 멀리 떨어져 있다.\n그래서 '두 문장이 비슷한가?'라는 질문은 '두 점이 얼마나 가까운가?'라는 거리 계산 문제로 바뀐다.\n\n가까움을 재는 방법은 크게 두 가지다.\n하나는 두 화살표의 방향 차이를 보는 코사인 유사도이고, 다른 하나는 두 벡터를 곱해 더하는 내적(dot product)이다.\n문서 길이의 영향을 줄이고 싶을 때는 보통 길이를 1로 맞춘 뒤 코사인 유사도를 쓰는데, 이 경우 코사인과 내적은 사실상 같은 결과를 준다."
      },
      {
        "h": "다 비교하면 느리다 — HNSW와 IVF의 직관",
        "body": "문서가 100개면 질문 하나에 100번만 비교하면 되지만, 1000만 개라면 매번 1000만 번을 비교해야 해서 너무 느리다.\n그래서 미리 '지름길 지도'를 만들어 두는 것이 인덱싱이다.\n\nHNSW는 친구 관계망처럼 점들을 서로 연결해 두고, 가까운 이웃을 따라 징검다리를 건너듯 빠르게 목적지에 다가가는 방식이다.\nIVF는 먼저 비슷한 점들끼리 동네(클러스터)로 묶어 두고, 질문이 들어오면 가까운 몇 개 동네만 뒤져서 시간을 아낀다.\n둘 다 모든 후보를 다 보지는 않으므로 아주 가끔 진짜 1등을 놓칠 수 있지만, 그 대신 수십~수백 배 빨라지는 실용적인 거래(trade-off)를 한다."
      }
    ],
    "realCode": [
      {
        "title": "엔드투엔드: FAISS로 문서 임베딩 → 인덱스 구축 → 질문 검색",
        "lang": "python",
        "code": "# sentence-transformers: 문장을 벡터로 바꿔주는 임베딩 모델 라이브러리\nfrom sentence_transformers import SentenceTransformer\n# faiss: 대량 벡터를 빠르게 검색하기 위한 인덱스 라이브러리 (cpu 버전)\nimport faiss\n# numpy: 벡터(숫자 배열)를 다루는 기본 도구\nimport numpy as np\n\n# 1) 검색 대상이 될 문서들을 준비한다 (실무에선 DB나 파일에서 읽어온다)\ndocs = [\n    \"강아지는 산책을 좋아하는 반려동물이다\",   # 주제: 반려동물\n    \"고양이는 그루밍으로 몸을 청결하게 한다\",   # 주제: 반려동물\n    \"오늘 서울의 날씨는 맑고 따뜻하다\",         # 주제: 날씨\n    \"주식 시장은 금리 변화에 민감하게 반응한다\", # 주제: 경제\n]\n\n# 2) 임베딩 모델을 불러온다 (처음 실행 시 자동 다운로드, 384차원 벡터를 만든다)\nmodel = SentenceTransformer(\"all-MiniLM-L6-v2\")\n\n# 3) 모든 문서를 벡터로 변환한다 (normalize_embeddings=True 로 길이를 1로 맞춰 코사인 비교 준비)\ndoc_vecs = model.encode(docs, normalize_embeddings=True)\n# float32 로 변환: FAISS는 32비트 실수 배열만 받기 때문\ndoc_vecs = np.array(doc_vecs, dtype=\"float32\")\n\n# 4) 인덱스를 만든다. IndexFlatIP = 내적(Inner Product) 기준 완전탐색 인덱스\n#    벡터 길이를 1로 맞췄으므로 내적값이 곧 코사인 유사도가 된다\ndim = doc_vecs.shape[1]            # 벡터 하나의 길이(=384)를 꺼낸다\nindex = faiss.IndexFlatIP(dim)     # 빈 인덱스 생성\nindex.add(doc_vecs)                # 문서 벡터들을 인덱스에 등록한다\nprint(\"저장된 문서 수:\", index.ntotal)  # 결과: 저장된 문서 수: 4\n\n# 5) 질문을 같은 모델·같은 방식으로 벡터화한다 (검색하려면 같은 공간에 있어야 한다)\nquery = \"반려동물을 키우는 방법\"\nq_vec = model.encode([query], normalize_embeddings=True)\nq_vec = np.array(q_vec, dtype=\"float32\")\n\n# 6) 가장 비슷한 문서 2개를 찾는다. scores=유사도, idxs=문서 위치(인덱스)\nscores, idxs = index.search(q_vec, k=2)\n\n# 7) 검색 결과를 사람이 읽기 좋게 출력한다\nfor rank, (doc_id, score) in enumerate(zip(idxs[0], scores[0]), start=1):\n    # doc_id 위치의 원문과 유사도 점수를 함께 보여준다\n    print(f\"{rank}위 (유사도 {score:.3f}): {docs[doc_id]}\")\n# 결과 예시: 1위에 강아지/고양이 문장이, 날씨·주식 문장은 뒤로 밀린다",
        "note": "임베딩 → 인덱스 적재 → 질문 검색으로 이어지는 가장 기본적인 시맨틱 검색의 전체 흐름이다.\n핵심은 '문서와 질문을 같은 모델로 벡터화해야 비교가 된다'는 점이다."
      }
    ]
  },
  "capstone-1": {
    "theory": [
      {
        "h": "에이전트는 '시키면 알아서 하는' 직원이다",
        "body": "일반 챗봇은 질문 하나에 답 하나를 돌려주는 자판기 같은 존재다.\n반면 에이전트는 '항공권 가장 싼 걸로 예약해줘' 같은 목표를 받으면 스스로 검색하고 비교하고 결정까지 합니다.\n즉 사람이 한 단계씩 지시하지 않아도, 목표만 주면 중간 단계를 알아서 채워 일을 끝내는 신입 직원에 가깝다.\n\n이렇게 '스스로 다음 행동을 정하는' 능력이 에이전트의 핵심이며, 캡스톤에서 우리는 이 직원에게 어떤 도구와 자료를 쥐여줄지를 설계하는 것이다."
      },
      {
        "h": "좋은 설계가 절반이다 — 먼저 그림부터 그리자",
        "body": "집을 지을 때 설계도 없이 벽돌부터 쌓으면 나중에 다 부숴야 합니다.\n소프트웨어도 똑같아서, 코드를 짜기 전에 '데이터가 어디서 들어와 어디로 흐르는지'를 그림으로 먼저 그려야 한다.\n우리 캡스톤의 기본 골격은 '사용자 질문 → LLM이 판단 → 필요하면 문서 검색(RAG)이나 도구 호출 → 결과를 모아 최종 답변' 이라는 한 줄 흐름이다.\n이 흐름을 박스와 화살표로 그려두면, 팀원 모두가 같은 그림을 보며 각자 맡은 박스를 만들 수 있어 협업이 쉬워진다."
      },
      {
        "h": "범위를 작게 잡아야 끝낼 수 있다",
        "body": "처음 프로젝트에서 가장 흔한 실패는 '욕심내서 기능을 너무 많이 넣는 것'이다.\n3일 안에 발표까지 해야 하므로, 핵심 기능 하나가 처음부터 끝까지 동작하는 것을 1순위 목표로 삼아야 한다.\n예를 들어 '문서를 검색해 출처와 함께 답해주는 에이전트' 하나만 확실히 완성하면 충분히 좋은 캡스톤이다.\n화려한 기능 10개가 반쯤 되는 것보다, 핵심 기능 1개가 완벽히 도는 것이 발표에서 훨씬 강한 인상을 준다."
      }
    ],
    "realCode": [
      {
        "title": "app.py — 캡스톤 스켈레톤(환경 점검용 최소 실행 코드)",
        "lang": "python",
        "code": "import os  # 운영체제 기능(환경변수 읽기 등)을 쓰기 위한 표준 라이브러리\nfrom dotenv import load_dotenv  # .env 파일에 적어둔 비밀 키를 불러오는 도구\nfrom langchain_anthropic import ChatAnthropic  # Claude 모델을 파이썬에서 부르는 연결 객체\n\nload_dotenv()  # 같은 폴더의 .env 파일을 읽어 환경변수로 등록한다(여기서 API 키가 메모리에 올라옴)\n\n# 환경변수에서 API 키를 꺼낸다. 키가 없으면 None 이 되어 아래에서 안내 메시지를 띄운다\napi_key = os.getenv('ANTHROPIC_API_KEY')  # .env 의 ANTHROPIC_API_KEY 값을 가져옴\n\nif not api_key:  # 키가 비어 있으면(설정을 깜빡한 경우) 사용자에게 친절히 안내\n    print('[안내] .env 파일에 ANTHROPIC_API_KEY 를 먼저 적어주세요.')  # 해결 방법 출력\n    raise SystemExit  # 키 없이는 진행 불가하므로 프로그램을 안전하게 종료\n\n# Claude 모델 객체를 만든다. temperature 가 낮을수록 답이 일정하고 정확해진다\nllm = ChatAnthropic(\n    model='claude-sonnet-4-5',  # 사용할 모델 이름(가성비 좋은 범용 모델)\n    temperature=0.2,  # 답변의 창의성 정도(0에 가까울수록 보수적·일관적)\n)\n\ndef ask(question):  # 질문 문자열을 받아 모델 답변을 돌려주는 함수\n    response = llm.invoke(question)  # invoke 는 모델에 질문을 보내고 답을 받는 함수\n    return response.content  # 응답 객체에서 실제 텍스트만 꺼내 반환\n\nif __name__ == '__main__':  # 이 파일을 직접 실행했을 때만 아래가 동작(다른 파일이 import 하면 실행 안 됨)\n    print('에이전트 준비 완료! 무엇을 도와드릴까요?')  # 결과: 환경이 정상이면 이 인사가 출력됨\n    answer = ask('한 문장으로 자기소개를 해줘.')  # 모델 연결이 되는지 가벼운 질문으로 점검\n    print('에이전트:', answer)  # 결과: 모델이 만든 자기소개 문장이 화면에 표시됨\n",
        "note": "1일차에는 '환경이 제대로 깔렸는지'만 확인하면 됩니다.\n인사 문구와 모델 답변이 에러 없이 출력되면 내일 본격 구현을 시작할 준비가 끝난 것이다."
      }
    ]
  },
  "capstone-2": {
    "theory": [
      {
        "h": "LangGraph는 '순서도'를 코드로 만드는 도구다",
        "body": "어릴 때 그려본 순서도를 떠올려 보세요.\n네모(작업)와 마름모(판단)를 화살표로 잇던 그 그림이 바로 LangGraph의 개념이다.\nLangGraph에서는 '생각하는 칸(노드)'들을 만들고, 일이 끝나면 다음에 어디로 갈지 화살표(엣지)로 연결한다.\n특히 '도구가 필요한가?'를 판단해 길을 나누는 갈림길(조건 분기) 덕분에, 에이전트가 상황에 맞게 스스로 다른 행동을 고를 수 있다.\n\n결국 우리는 순서도를 그리듯 에이전트의 일하는 방식을 코드로 설계하는 것이다."
      },
      {
        "h": "도구(Tool)는 에이전트의 손과 발이다",
        "body": "LLM은 글을 아주 잘 쓰지만, 혼자서는 오늘 날씨나 실시간 환율을 알 수 없습니다.\n이때 '환율을 가져오는 함수'를 도구로 만들어 주면, 모델이 필요할 때 그 함수를 불러 진짜 정보를 가져온다.\n중요한 점은, 모델이 도구를 '직접 실행'하는 게 아니라 '이 도구를 이런 값으로 써줘'라고 요청만 한다는 것이다.\n실제 실행은 우리 코드(tools 노드)가 대신 해주고, 그 결과를 다시 모델에게 돌려주어 최종 문장을 만들게 한다.\n이렇게 역할을 나눠 두면 안전하고 통제 가능한 에이전트가 된다."
      }
    ],
    "realCode": [
      {
        "title": "agent.py — 도구를 쓰는 LangGraph 에이전트(엔드투엔드)",
        "lang": "python",
        "code": "import os  # 환경변수 읽기용 표준 라이브러리\nfrom dotenv import load_dotenv  # .env 의 비밀 키 불러오기\nfrom typing import Annotated  # 상태 항목에 '합치는 규칙'을 붙이기 위한 타입 도구\nfrom typing_extensions import TypedDict  # 상태의 모양(키와 값)을 정의하는 사전형 타입\nfrom langchain_anthropic import ChatAnthropic  # Claude 모델 연결\nfrom langchain_core.tools import tool  # 일반 함수를 에이전트 도구로 만드는 스티커\nfrom langgraph.graph import StateGraph, START, END  # 그래프 본체와 시작/끝 표시\nfrom langgraph.graph.message import add_messages  # 메시지를 차곡차곡 누적해주는 규칙\nfrom langgraph.prebuilt import ToolNode, tools_condition  # 도구 실행 노드와 분기 판단기\n\nload_dotenv()  # API 키를 환경변수로 등록\n\nclass State(TypedDict):  # 에이전트가 들고 다닐 상태(메모장)의 모양을 정의\n    messages: Annotated[list, add_messages]  # 대화 메시지 목록(새 메시지는 덮어쓰지 않고 뒤에 쌓임)\n\n@tool  # 아래 함수를 에이전트가 부를 수 있는 '도구'로 등록\ndef get_exchange_rate(currency: str) -> str:  # 통화 코드를 받아 환율을 돌려주는 도구\n    \"\"\"주어진 통화(USD 등)의 원화 환율을 알려준다.\"\"\"  # 이 설명을 보고 모델이 언제 쓸지 판단함\n    rates = {'USD': 1380, 'EUR': 1490, 'JPY': 9}  # 예시용 고정 환율(실제론 API로 교체)\n    return f\"1 {currency} = {rates.get(currency, '알수없음')}원\"  # 결과 문자열 반환\n\ntools = [get_exchange_rate]  # 에이전트가 쓸 도구들을 목록으로 모음\nllm = ChatAnthropic(model='claude-sonnet-4-5', temperature=0)  # 일관된 답을 위해 창의성 0\nllm_with_tools = llm.bind_tools(tools)  # 모델에게 '이런 도구들이 있다'고 알려줌\n\ndef agent_node(state: State):  # '생각하는 칸' — 모델이 답하거나 도구 사용을 요청\n    answer = llm_with_tools.invoke(state['messages'])  # 지금까지 대화를 모델에 전달\n    return {'messages': [answer]}  # 모델의 응답을 상태에 추가\n\ngraph = StateGraph(State)  # 위에서 정의한 State 모양으로 빈 그래프 생성\ngraph.add_node('agent', agent_node)  # '생각' 노드 등록\ngraph.add_node('tools', ToolNode(tools))  # '도구 실행' 노드 등록(요청된 도구를 실제로 실행)\ngraph.add_edge(START, 'agent')  # 시작하면 먼저 agent 로 들어감\ngraph.add_conditional_edges('agent', tools_condition)  # 도구가 필요하면 tools, 아니면 END 로 분기\ngraph.add_edge('tools', 'agent')  # 도구 결과를 들고 다시 agent 로 돌아가 최종 답 작성\napp = graph.compile()  # 그래프를 실행 가능한 형태로 완성\n\nif __name__ == '__main__':  # 직접 실행할 때만 동작\n    result = app.invoke({'messages': [('user', '오늘 1달러는 몇 원이야?')]})  # 질문을 넣어 실행\n    print('에이전트:', result['messages'][-1].content)  # 결과: 약 1380원이라는 문장이 출력됨\n",
        "note": "이 코드 한 파일이 '생각 → 도구 호출 → 결과 반영 → 최종 답변'의 전체 흐름을 담고 있습니다.\n환율 부분만 실제 API로 바꾸면 바로 실서비스 골격이 된다."
      }
    ]
  },
  "capstone-3": {
    "theory": [
      {
        "h": "데모는 '될 때까지'가 아니라 '안 될 때도' 대비한다",
        "body": "발표장에서 인터넷이 끊기거나 API가 느려지는 일은 생각보다 자주 일어납니다.\n그래서 프로다운 팀은 항상 '정상 동작 녹화 영상'이라는 백업을 준비해 둔다.\n라이브 데모가 성공하면 영상은 안 써도 되고, 실패하면 영상으로 매끄럽게 넘어가면 됩니다.\n또한 데모용 질문은 미리 여러 번 돌려본 '확실히 되는 질문'으로 고르는 것이 안전하다.\n\n준비된 팀은 사고가 나도 당황하지 않으며, 그 침착함 자체가 좋은 평가로 이어진다."
      },
      {
        "h": "한계를 솔직히 말하는 것이 더 높은 점수를 받는다",
        "body": "캡스톤은 완벽한 제품을 만드는 대회가 아니라, 배운 것을 적용하고 문제를 이해했음을 보여주는 자리입니다.\n그래서 '아직 이런 경우는 틀린 답을 낼 수 있다'처럼 한계를 솔직히 인정하는 발표가 오히려 신뢰를 줍니다.\n중요한 것은 한계를 알고, 왜 그런지 설명하며, 어떻게 개선할지 방향을 제시하는 것이다.\n예를 들어 '문서가 없으면 환각이 생길 수 있어 다음엔 검색 신뢰도 점수를 붙이겠다'처럼 말하면 깊이가 드러난다.\n평가자는 완성도뿐 아니라 '이 팀이 무엇을 이해했는가'를 보기 때문이다."
      }
    ],
    "realCode": [
      {
        "title": "app_web.py — Streamlit으로 에이전트를 웹 데모로 배포하기",
        "lang": "python",
        "code": "import streamlit as st  # 파이썬으로 웹 화면을 만드는 라이브러리(별칭 st)\nfrom agent import app  # 어제 만든 컴파일된 에이전트 그래프를 그대로 가져옴\n\nst.title('우리 팀 AI 에이전트 데모')  # 웹 페이지 맨 위에 큰 제목 표시\nst.caption('질문을 입력하면 도구와 문서를 활용해 답합니다.')  # 제목 아래 작은 설명\n\nif 'history' not in st.session_state:  # 대화 기록을 저장할 공간이 아직 없으면\n    st.session_state.history = []  # 빈 목록으로 처음 한 번만 만들어 둔다\n\nfor role, text in st.session_state.history:  # 이전 대화를 하나씩 꺼내\n    st.chat_message(role).write(text)  # 사람/에이전트 말풍선으로 화면에 다시 그림\n\nquestion = st.chat_input('무엇이 궁금하신가요?')  # 화면 아래 채팅 입력창을 만든다\n\nif question:  # 사용자가 무언가 입력하고 엔터를 쳤다면\n    st.session_state.history.append(('user', question))  # 사용자 질문을 기록에 추가\n    st.chat_message('user').write(question)  # 사용자 말풍선으로 즉시 표시\n\n    try:  # 모델 호출 중 오류가 나도 앱이 죽지 않도록 보호\n        result = app.invoke({'messages': [('user', question)]})  # 에이전트 실행\n        answer = result['messages'][-1].content  # 마지막 메시지(최종 답)만 꺼냄\n    except Exception as e:  # 어떤 오류든 붙잡아\n        answer = f'죄송해요, 처리 중 문제가 생겼어요: {e}'  # 친절한 안내 문구로 대체\n\n    st.session_state.history.append(('assistant', answer))  # 답변도 기록에 추가\n    st.chat_message('assistant').write(answer)  # 에이전트 말풍선으로 답 표시\n",
        "note": "터미널에서 'streamlit run app_web.py' 만 치면 브라우저에 채팅형 데모가 뜹니다.\ntry/except 로 감싸 두었기 때문에 발표 중 오류가 나도 앱이 멈추지 않고 안내 문구를 보여준다."
      }
    ]
  },
  "miniproject-1": {
    "theory": [
      {
        "h": "미니 프로젝트는 '완성'보다 '한 바퀴 돌리기'가 목표다",
        "body": "미니 프로젝트의 핵심은 화려한 기능이 아니라 입력부터 결과까지 한 흐름이 끝까지 도는 것이다.\n예를 들어 '질문을 받으면 → 문서를 검색하고 → LLM이 답을 만들어 → 화면에 보여준다'는 한 줄기가 완성되면 절반은 성공이다.\n처음부터 모든 기능을 넣으려 하면 어느 것도 끝내지 못한 채 시간이 끝난다.\n그래서 오늘은 '가장 작지만 끝까지 도는 버전(MVP)'을 먼저 정하는 데 집중한다.\n\nMVP(Minimum Viable Product)란 '최소한으로 의미 있는 제품'이라는 뜻으로, 자랑할 기능은 빼고 핵심 한 줄기만 남긴 형태이다.\n오늘 기획에서 '없으면 서비스가 성립하지 않는 기능' 하나만 골라 그것을 1순위로 적어두자."
      },
      {
        "h": "좋은 설계는 부품을 작게 나누는 것에서 시작한다",
        "body": "AI 서비스는 보통 네 부품으로 나눌 수 있다 — 입력(질문)·검색(RAG)·생성(LLM)·출력(화면)이다.\n각 부품을 따로 떼어 생각하면, 한 곳이 고장 나도 어디를 고칠지 금방 알 수 있다.\n이것을 모듈화라고 부르는데, 레고 블록처럼 부품을 갈아 끼울 수 있게 만드는 설계 방식이다.\n예컨대 검색 부품을 나중에 더 좋은 것으로 바꿔도 나머지 코드는 손대지 않아도 된다.\n\n오늘 아키텍처를 그릴 때는 화살표로 '데이터가 어디서 어디로 흐르는지'를 표시하자.\n이 흐름도가 곧 내일 구현할 파일 목록(input.py·rag.py·llm.py·app.py)이 된다."
      },
      {
        "h": "비밀 키는 절대 코드 안에 적지 않는다",
        "body": "API 키는 돈이 드는 자원에 접근하는 열쇠라서, 코드에 직접 적어 GitHub에 올리면 남이 훔쳐 쓸 수 있다.\n그래서 키는 .env라는 별도 파일에 두고, 코드는 그 파일에서 값을 '읽어오기만' 한다.\n그리고 .gitignore에 .env를 적어 두면 실수로 깃에 올라가는 일을 막을 수 있다.\n이것은 집 열쇠를 현관문에 테이프로 붙여두지 않고 주머니에 따로 넣고 다니는 것과 같은 안전 습관이다.\n실무에서도 키가 유출돼 큰 요금이 청구되는 사고가 자주 일어나므로, 첫날부터 이 습관을 들이는 것이 중요하다."
      }
    ],
    "realCode": [
      {
        "title": "config.py — .env에서 API 키를 안전하게 불러오는 설정 모듈",
        "lang": "python",
        "code": "# os 모듈은 운영체제의 환경변수에 접근할 때 사용한다\nimport os\n# load_dotenv 함수는 .env 파일의 내용을 환경변수처럼 읽어 들인다\nfrom dotenv import load_dotenv\n\n# .env 파일을 찾아 그 안의 KEY=VALUE 들을 메모리로 올려준다(이 한 줄이 핵심)\nload_dotenv()\n\n# 환경변수에서 OPENAI_API_KEY 값을 꺼내 변수에 담는다(없으면 None 이 된다)\nAPI_KEY = os.getenv(\"OPENAI_API_KEY\")\n\n# 키가 없으면 더 진행해도 실패하므로, 미리 친절한 오류 메시지로 멈춘다\nif not API_KEY:\n    # raise 는 프로그램을 즉시 멈추고 오류를 알리는 명령이다\n    raise RuntimeError(\".env 에 OPENAI_API_KEY 가 없습니다. 파일을 확인하세요.\")\n\n# 사용할 모델 이름을 한 곳에 모아두면 나중에 바꾸기 쉽다\nMODEL_NAME = \"gpt-4o-mini\"\n\n# 다른 파일에서 import 했을 때 설정이 잘 들어왔는지 눈으로 확인하는 코드\nif __name__ == \"__main__\":\n    # 키 전체를 찍으면 위험하므로 앞 7글자만 보여준다\n    print(\"키 로딩 성공:\", API_KEY[:7] + \"...\")  # 결과: 키 로딩 성공: sk-proj...\n    print(\"사용 모델:\", MODEL_NAME)             # 결과: 사용 모델: gpt-4o-mini",
        "note": "키를 코드가 아닌 .env에 두고 한 곳(config.py)에서만 읽게 만든 구조이다.\n이렇게 하면 모델 이름이나 키를 바꿀 때 이 파일 한 곳만 고치면 된다."
      },
      {
        "title": "smoke_test.py — 환경이 제대로 연결됐는지 확인하는 첫 LLM 호출",
        "lang": "python",
        "code": "# 방금 만든 config 모듈에서 키와 모델 이름을 그대로 가져온다\nfrom config import API_KEY, MODEL_NAME\n# OpenAI 라이브러리에서 클라이언트(서버와 통신하는 도구) 클래스를 가져온다\nfrom openai import OpenAI\n\n# 클라이언트 객체를 만든다. api_key 인자에 우리 키를 넘겨 인증한다\nclient = OpenAI(api_key=API_KEY)\n\n# 모델에게 보낼 대화를 리스트로 구성한다(역할과 내용 쌍)\nmessages = [\n    # system 역할: 모델의 성격·말투를 정하는 지시문이다\n    {\"role\": \"system\", \"content\": \"너는 친절한 한국어 도우미다.\"},\n    # user 역할: 실제 사용자의 질문이다\n    {\"role\": \"user\", \"content\": \"한 문장으로 자기소개 해줘.\"},\n]\n\n# chat.completions.create 로 모델에 요청을 보낸다(인터넷을 통해 서버와 통신)\nresponse = client.chat.completions.create(\n    model=MODEL_NAME,   # 어떤 모델을 쓸지 지정\n    messages=messages,  # 위에서 만든 대화 내용 전달\n    temperature=0.7,    # 답변의 창의성 정도(0=일관적, 1=다양함)\n)\n\n# 응답 객체에서 실제 답변 텍스트만 꺼낸다(구조가 깊으니 그대로 따라 적자)\nanswer = response.choices[0].message.content\n\n# 모델이 만든 답을 화면에 출력한다\nprint(\"모델 응답:\", answer)  # 결과: 모델 응답: 안녕하세요, 무엇이든 도와드리는 한국어 도우미입니다.",
        "note": "환경 셋업이 끝났는지 검증하는 가장 작은 코드로, 이 한 줄이 출력되면 키·네트워크·라이브러리가 모두 정상이라는 뜻이다."
      }
    ]
  },
  "miniproject-2": {
    "theory": [
      {
        "h": "RAG는 'AI에게 오픈북 시험을 보게 하는 것'이다",
        "body": "LLM은 학습한 시점까지의 일반 지식만 알고, 우리 회사 규정이나 최신 문서는 모른다.\n그래서 질문이 들어오면 먼저 우리 문서에서 관련 부분을 찾아 프롬프트에 함께 넣어 준다.\n그러면 LLM은 그 내용을 '근거 자료'로 읽고 그에 맞춰 답을 만든다.\n이것은 시험 때 책을 펴놓고 해당 페이지를 보며 답을 쓰는 오픈북 시험과 똑같은 원리이다.\n\n이 방식의 큰 장점은 두 가지이다.\n첫째, 모델을 다시 학습시키지 않고도 새 지식을 줄 수 있어 빠르고 저렴하다.\n둘째, 어떤 문서를 근거로 답했는지 출처를 보여줄 수 있어 환각(없는 사실을 지어내는 현상)을 크게 줄인다."
      },
      {
        "h": "임베딩과 유사도 검색의 직관",
        "body": "컴퓨터는 글의 뜻을 바로 알지 못하므로, 먼저 문장을 숫자 묶음(벡터)으로 바꾼다.\n이때 뜻이 비슷한 문장끼리는 숫자 공간에서 가까운 자리에 놓이도록 만들어진다.\n예를 들어 '환불 규정'과 '돈을 돌려받는 절차'는 글자는 달라도 좌표상으로는 이웃이 된다.\n그래서 질문도 벡터로 바꾼 뒤, 가장 가까운 문서 조각을 골라오면 '의미로 검색'이 된다.\n\n가까운 정도는 보통 코사인 유사도로 잰다.\n이는 두 화살표가 이루는 각도를 보는 방법으로, 같은 방향을 가리킬수록 1에 가까워 더 비슷하다는 뜻이다."
      },
      {
        "h": "에이전트는 'LLM에게 도구 쓸 손을 달아준 것'이다",
        "body": "기본 LLM은 글만 만들 수 있어서 실시간 계산이나 데이터베이스 조회 같은 일은 직접 하지 못한다.\n에이전트는 LLM에게 '이런 도구들이 있어, 필요하면 골라 써'라고 알려주는 구조이다.\n그러면 모델이 질문을 보고 '이건 계산기가 필요하군' 하고 스스로 도구를 호출한다.\n사람이 어려운 곱셈을 만나면 계산기를 꺼내 드는 것과 똑같은 흐름이다.\n\n미니 프로젝트에서는 거창한 에이전트 프레임워크 없이도, 간단한 if 분기로 '특정 질문이면 도구 함수를 부른다'는 작은 에이전트를 만들 수 있다.\n핵심은 LLM의 약점을 도구로 보완해 더 정확한 서비스를 만드는 것이다."
      }
    ],
    "realCode": [
      {
        "title": "rag.py — 문서를 청킹·임베딩·검색하는 RAG 핵심 모듈",
        "lang": "python",
        "code": "# 수치 계산을 빠르게 해주는 numpy 를 가져온다\nimport numpy as np\n# config 에서 키를 가져와 임베딩 API 를 쓸 클라이언트를 만든다\nfrom config import API_KEY\nfrom openai import OpenAI\n\n# 서버와 통신할 클라이언트 생성\nclient = OpenAI(api_key=API_KEY)\n\n# (1) 청킹: 긴 글을 size 글자씩 잘라 리스트로 돌려준다\ndef chunk_text(text, size=300):\n    # range(시작, 끝, 간격) 로 0,300,600... 위치를 만든다\n    # text[i:i+size] 는 i 부터 size 글자만큼 잘라낸 조각이다\n    return [text[i:i + size] for i in range(0, len(text), size)]\n\n# (2) 임베딩: 글 한 덩이를 의미 벡터(숫자 리스트)로 바꾼다\ndef embed(text):\n    # embeddings.create 가 글을 벡터로 변환해 준다\n    res = client.embeddings.create(model=\"text-embedding-3-small\", input=text)\n    # 응답에서 벡터 부분만 꺼내 numpy 배열로 만든다(계산을 위해)\n    return np.array(res.data[0].embedding)\n\n# (3) 색인: 모든 조각을 미리 벡터로 바꿔 (조각, 벡터) 쌍 목록을 만든다\ndef build_index(chunks):\n    # 각 조각마다 embed 를 호출해 짝을 지어 리스트로 모은다\n    return [(c, embed(c)) for c in chunks]\n\n# (4) 검색: 질문과 가장 비슷한 조각 top_k 개를 골라 돌려준다\ndef search(query, index, top_k=2):\n    q_vec = embed(query)  # 질문도 같은 방식으로 벡터화\n    scored = []           # (유사도, 조각) 을 담을 빈 리스트\n    for chunk, vec in index:              # 색인을 하나씩 비교\n        # 코사인 유사도 = 내적 / (두 벡터 크기의 곱)\n        sim = np.dot(q_vec, vec) / (np.linalg.norm(q_vec) * np.linalg.norm(vec))\n        scored.append((sim, chunk))       # 점수와 조각을 함께 저장\n    scored.sort(reverse=True)             # 점수 높은 순으로 정렬\n    # 상위 top_k 개의 '조각 글'만 뽑아 리스트로 돌려준다\n    return [chunk for _, chunk in scored[:top_k]]",
        "note": "문서를 잘라(chunk) 벡터로 바꾸고(embed) 질문과 가까운 조각을 찾는(search) RAG의 4단계가 모두 들어 있다.\n검색에 외부 DB 없이 numpy만 써서 왕초보도 원리를 눈으로 따라갈 수 있게 했다."
      },
      {
        "title": "app.py — 검색 결과를 LLM에 붙여 답하는 전체 파이프라인",
        "lang": "python",
        "code": "# 방금 만든 rag 모듈의 함수들을 가져온다\nfrom rag import chunk_text, build_index, search\nfrom config import API_KEY, MODEL_NAME\nfrom openai import OpenAI\n\nclient = OpenAI(api_key=API_KEY)  # LLM 호출용 클라이언트\n\n# data/policy.txt 문서를 읽어 들인다(우리 지식의 원천)\nwith open(\"data/policy.txt\", encoding=\"utf-8\") as f:\n    document = f.read()  # 파일 전체 내용을 문자열로 읽음\n\n# 문서를 조각내고 미리 벡터 색인을 만들어 둔다(한 번만 해두면 재사용)\nindex = build_index(chunk_text(document))\n\n# RAG로 답을 만드는 함수: 질문을 받아 근거를 찾고 LLM에 답을 시킨다\ndef answer(question):\n    if not question.strip():            # 빈 질문이면(공백 제거 후 비었으면)\n        return \"질문을 입력해 주세요.\"   # 죽지 않고 안내만 한다(예외 처리)\n    hits = search(question, index)      # 관련 문서 조각 top-k 검색\n    context = \"\\n\".join(hits)           # 조각들을 줄바꿈으로 이어 근거 묶음 생성\n    # 모델에게 '근거 안에서만 답하라'고 지시해 환각을 줄인다\n    prompt = f\"다음 근거만 참고해 답해줘.\\n근거:\\n{context}\\n\\n질문: {question}\"\n    res = client.chat.completions.create(\n        model=MODEL_NAME,\n        messages=[{\"role\": \"user\", \"content\": prompt}],\n    )\n    reply = res.choices[0].message.content  # 답변 텍스트 추출\n    # 답변과 함께 사용한 근거를 보여줘 출처를 투명하게 한다\n    return f\"{reply}\\n\\n[근거]\\n{context}\"\n\n# 터미널에서 직접 질문을 받아 답을 출력하는 간단한 반복 루프\nif __name__ == \"__main__\":\n    while True:                          # 사용자가 끝낼 때까지 계속\n        q = input(\"\\n질문(종료는 q): \")  # 키보드 입력 받기\n        if q == \"q\":                      # q 를 누르면\n            break                         # 반복을 빠져나가 종료\n        print(answer(q))                  # 답변 출력",
        "note": "입력→검색→근거 결합→LLM 생성→출력의 한 줄기가 끝까지 도는 완성형 미니 RAG 앱이다.\n'근거만 참고하라'는 지시와 출처 출력으로 신뢰도를 높였다."
      }
    ]
  },
  "miniproject-3": {
    "theory": [
      {
        "h": "테스트는 '미래의 나'를 구해주는 안전망이다",
        "body": "코드를 고치다 보면 잘 되던 기능이 모르는 사이 망가지는 일이 자주 생긴다.\n테스트는 '이 입력에는 이 결과가 나와야 한다'를 미리 적어두고 자동으로 확인하는 장치이다.\n그래서 코드를 바꾼 뒤 테스트만 돌리면 어디가 깨졌는지 1초 만에 알 수 있다.\n이것은 시험 전에 모범답안을 옆에 두고 내 답을 맞춰보는 것과 같다.\n\n미니 프로젝트에서는 거창한 테스트가 아니라, 핵심 함수 두세 개만 검사해도 충분하다.\n예를 들어 '빈 질문을 넣으면 안내 메시지가 나온다'만 확인해도 큰 사고를 막는다."
      },
      {
        "h": "Docker는 '제 컴퓨터에선 됐는데요' 문제를 없앤다",
        "body": "개발할 때 흔히 겪는 문제는 내 컴퓨터에선 잘 되던 앱이 남의 컴퓨터에선 안 도는 것이다.\n파이썬 버전이 다르거나 라이브러리가 없어서 생기는 일이다.\nDocker는 앱·라이브러리·실행환경을 통째로 상자(이미지)에 담아 어디서나 똑같이 켜지게 만든다.\n그래서 '제 컴퓨터에선 됐는데요'라는 변명이 사라진다.\n\n이사를 떠올리면 쉽다.\n짐을 하나하나 옮기면 빠뜨리기 쉽지만, 컨테이너에 통째로 담아 옮기면 도착지에서 그대로 풀기만 하면 된다.\nDockerfile은 그 상자를 어떻게 꾸릴지 적은 포장 설명서이다."
      },
      {
        "h": "발표와 회고가 프로젝트를 진짜 '내 것'으로 만든다",
        "body": "코드를 완성하는 것만큼 중요한 것이 '무엇을 왜 그렇게 만들었는지' 설명하는 일이다.\n발표는 내가 한 일을 남이 이해하게 정리하는 과정이라, 머릿속이 한 번 더 정돈된다.\n좋은 발표는 화려한 기능 자랑이 아니라 '어떤 문제를 어떤 방법으로 풀었는가'의 이야기이다.\n그래서 문제→해결→시연→배운 점의 순서로 짧게 말하는 연습을 한다.\n\n회고는 다음 프로젝트를 더 잘하기 위한 복습이다.\n잘된 점은 다음에도 유지하고, 아쉬운 점은 구체적인 개선 행동으로 적어두면 실력이 쌓인다."
      }
    ],
    "realCode": [
      {
        "title": "test_app.py — 핵심 기능을 자동으로 검증하는 단위 테스트",
        "lang": "python",
        "code": "# 우리가 만든 app 모듈에서 answer 함수를 가져온다\nfrom app import answer\n\n# 테스트 1: 빈 질문을 넣으면 안내 메시지가 나와야 한다\ndef test_empty_question():\n    result = answer(\"\")            # 빈 문자열을 입력\n    # assert 는 '뒤 조건이 참이어야 한다'는 검사. 거짓이면 테스트 실패\n    assert \"입력\" in result        # 안내 문구에 '입력'이 들어 있는지 확인\n\n# 테스트 2: 정상 질문에는 답변과 근거가 함께 나와야 한다\ndef test_answer_has_context():\n    result = answer(\"환불 규정 알려줘\")  # 실제 시나리오 질문\n    assert \"[근거]\" in result             # 출처 블록이 포함됐는지 확인\n    assert len(result) > 10               # 답이 너무 짧지 않은지 확인\n\n# 이 파일을 직접 실행하면 두 테스트를 차례로 돌려 결과를 출력한다\nif __name__ == \"__main__\":\n    test_empty_question()   # 첫 테스트 실행\n    test_answer_has_context()  # 둘째 테스트 실행\n    print(\"모든 테스트 통과!\")  # 결과: 모든 테스트 통과! (실패하면 여기까지 못 옴)",
        "note": "핵심 함수 answer가 '빈 입력 처리'와 '근거 포함 응답'을 지키는지 자동으로 확인한다.\n'pytest test_app.py' 또는 'python test_app.py'로 돌리며, 통과 문구가 보이면 안전하게 배포할 수 있다."
      },
      {
        "title": "Dockerfile — 앱을 어디서나 똑같이 실행되게 포장하기",
        "lang": "bash",
        "code": "# FROM: 어떤 기반 환경 위에 만들지 정한다(파이썬 3.11이 깔린 가벼운 리눅스)\nFROM python:3.11-slim\n\n# WORKDIR: 컨테이너 안에서 작업할 기본 폴더를 /app 으로 지정한다\nWORKDIR /app\n\n# COPY: 먼저 requirements.txt만 복사한다(자주 안 바뀌어 캐시 활용에 유리)\nCOPY requirements.txt .\n\n# RUN: 라이브러리를 설치한다. --no-cache-dir 로 이미지 용량을 줄인다\nRUN pip install --no-cache-dir -r requirements.txt\n\n# COPY: 나머지 우리 소스코드 전부를 컨테이너로 복사한다\nCOPY . .\n\n# CMD: 컨테이너가 켜질 때 실행할 명령(우리 앱 시작)\nCMD [\"python\", \"app.py\"]",
        "note": "기반 이미지 선택→작업폴더→의존성 설치→코드 복사→실행의 순서로 앱을 통째로 포장한다.\n'docker build -t ai-mini .' 로 이미지를 만들고 'docker run --env-file .env -it ai-mini' 로 키를 주입해 실행한다."
      }
    ]
  }
}

export const theoryFor = (subjectId, day) => theory[`${subjectId}-${day}`] || null
