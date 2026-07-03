// 날짜별 "심화 이론(theory)" + "실전 소스(realCode)" — subjectId-day 키.
//   theory: [{ h, body }] · realCode: [{ title, lang, code, note }]

export const theory = {
  "git-1": {
    "theory": [
      {"h": "코드가 도는 두 무대: Frontend와 Backend, 그리고 개발환경", "body": "프로그램은 결국 '사람이 보는 화면(프론트엔드)'과 '뒤에서 데이터를 다루는 서버(백엔드)'가 짝을 이뤄 돌아간다.\n웹페이지의 버튼·색·배치는 프론트엔드가 맡고, 로그인 확인·글 저장 같은 처리는 백엔드가 맡으며, 둘은 API라는 약속된 창구로 서로 대화한다.\n\n이런 코드를 짜려면 먼저 '개발환경'이 필요하다.\n코드를 쓰는 편집기(VS Code), 버전을 관리하는 Git, 그리고 이 둘을 담아 둘 작업폴더(Workspace)가 그것이다.\n오늘 오전에는 VS Code를 설치·실행하고 폴더 하나를 Workspace로 열어, 앞으로 모든 실습이 이 한 폴더 안에서 이뤄지도록 기지를 세운다."},
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
      },
      {"h": "HTTPS와 SSH: 원격에 나를 증명하는 두 방법", "body": "GitHub에 코드를 올릴 때 매번 아이디와 토큰을 입력하는 방식이 HTTPS라면, SSH는 한 번 열쇠(키)를 만들어 GitHub에 등록해 두면 이후로는 비밀번호 없이 자동으로 인증되는 방식이다.\n`ssh-keygen` 명령으로 내 컴퓨터에 개인키(비밀)와 공개키(공유용) 한 쌍을 만들고, 이 중 공개키만 GitHub 설정의 SSH Keys에 붙여 넣는다.\n\n핵심은 개인키는 절대 남에게 주거나 저장소에 올리지 않는다는 점이다.\n공개키는 자물쇠, 개인키는 그 자물쇠를 여는 유일한 열쇠라고 생각하면, 왜 개인키를 내 컴퓨터 밖으로 내보내면 안 되는지 이해된다."}
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
      {"h": "컴퓨터가 뜻을 알게 된 과정: 숫자 표현의 진화사", "body": "컴퓨터가 단어의 '의미'를 다루기까지는 여러 단계를 거쳤다.\n① 원-핫 인코딩 — 단어마다 자리 하나만 1인 긴 0/1 벡터다. 단어를 구분은 하지만 '왕'과 '여왕'이 '사과'만큼이나 서로 멀어서, 의미가 전혀 담기지 않는다.\n② 빈도 기반(TF-IDF 등) — 어떤 단어가 문서에 얼마나 자주, 또 얼마나 희귀하게 나오는지로 표현한다. 문서 분류에는 쓸 만하지만 단어 사이의 뜻 관계는 여전히 모른다.\n③ Word2Vec 분산표현 — '비슷한 자리에 나오는 단어는 뜻도 비슷하다'는 생각으로 단어를 짧고 촘촘한 벡터로 학습한다. 이때 처음으로 '왕-남자+여자≈여왕' 같은 의미 연산이 가능해졌다.\n④ 문맥 기반 임베딩 — Word2Vec은 '배(먹는 배/타는 배)'를 늘 같은 벡터로 봤지만, Transformer는 문장마다 주변 단어를 보고 그때그때 다른 벡터를 만든다.\n\n결국 우리가 배울 임베딩은 이 진화의 최신 단계이며, '어떻게 하면 의미의 거리를 숫자로 더 잘 담을까'라는 한 질문의 답이 계속 발전해 온 것이다."},
      {
        "h": "LLM은 결국 '다음 단어 맞히기' 선수다",
        "body": "거대언어모델(LLM)이라고 하면 어렵게 들리지만, 핵심은 끝말잇기처럼 '다음에 올 말'을 맞히는 게임 선수다.\n스마트폰에서 '오늘 점심' 까지 치면 '뭐 먹지'를 추천해주는 그 기능을 어마어마하게 키운 것이라고 보면 된다.\n\n조금 더 정확히 말하면, 언어모델은 앞에 주어진 토큰들을 보고 '다음 토큰이 무엇일 확률이 가장 높은가'를 계산한다.\n예를 들어 '하늘이 ___' 다음에는 '파랗다'가 0.7, '빨갛다'가 0.05 같은 식으로 확률을 매긴다.\n이 다음-토큰-확률을 아주 잘 맞히도록 인터넷의 방대한 글로 훈련한 모델이 바로 GPT 같은 LLM이다.\n그래서 우리가 배울 모든 구조는 결국 '이 확률을 더 잘 맞히기 위한 장치'라는 한 문장으로 꿸 수 있다."
      },
      {
        "h": "왜 컴퓨터는 글자를 숫자로 바꿔야 할까",
        "body": "컴퓨터는 글자를 모른다.\n오직 숫자만 계산할 수 있기 때문에, 우리가 쓰는 '학교'라는 단어도 숫자 묶음으로 번역해줘야 한다.\n\n첫 단계가 토큰화로, 문장을 '학교/에/갔다' 처럼 작은 조각으로 자른다.\nBPE라는 방식은 자주 붙어 다니는 글자쌍을 묶어서, 처음 보는 단어도 익숙한 조각의 조합으로 표현하게 해준다.\n그 다음 단계가 임베딩으로, 각 토큰을 좌표(벡터)로 바꿔 '의미 지도' 위의 점으로 만든다.\n이 지도에서는 '왕'과 '여왕'이 가깝게, '왕'과 '사과'가 멀게 놓이도록 학습되어, 컴퓨터가 의미의 거리까지 숫자로 다룰 수 있게 된다."
      },
      {
        "h": "Attention은 문장에 형광펜을 치는 일",
        "body": "긴 문장을 이해할 때 우리는 모든 단어를 똑같이 보지 않고, 핵심 단어에 형광펜을 친다.\n'그 영화는 정말 지루했지만 음악은 좋았다'에서 '좋았다'를 이해하려면 '음악'에 더 집중해야 하는 것과 같다.\n\nAttention은 바로 이 '어디에 얼마나 집중할지'를 숫자로 계산하는 장치다.\n과거의 RNN처럼 단어를 한 줄로 세워 차례차례 읽는 대신, Attention은 모든 단어를 한눈에 펼쳐놓고 서로를 직접 비교한다.\n그래서 문장이 길어도 멀리 떨어진 단어끼리 관계를 바로 연결할 수 있고, 동시에 처리하니 속도도 빠르다.\n이 '형광펜 치기'를 자기 문장 안에서 스스로 하기 때문에 Self-Attention(셀프 어텐션)이라고 부른다."
      }
    ],
    "realCode": [
      {
        "title": "NumPy로 처음부터 만드는 Self-Attention (엔드투엔드)",
        "lang": "python",
        "code": "import numpy as np                      # 행렬 계산을 위한 핵심 라이브러리 불러오기\n\nnp.random.seed(0)                        # 난수를 고정해 매번 같은 결과가 나오게 함(재현성)\n\n# 1) 입력 임베딩 만들기: 토큰 3개, 각 토큰은 4차원 벡터\ntokens = [\"나는\", \"학교에\", \"갔다\"]      # 예문을 3개 토큰으로 가정\nX = np.random.rand(3, 4)                  # (3토큰 x 4차원) 임베딩 행렬을 난수로 생성\n\n# 2) Q, K, V를 만드는 가중치 행렬(학습으로 정해지는 값, 여기선 난수)\nWq = np.random.rand(4, 4)                 # Query 변환용 가중치 (4 -> 4)\nWk = np.random.rand(4, 4)                 # Key 변환용 가중치 (4 -> 4)\nWv = np.random.rand(4, 4)                 # Value 변환용 가중치 (4 -> 4)\n\n# 3) 입력 X를 Q, K, V 세 가지 역할로 변환\nQ = X @ Wq                                # '내가 찾는 질문' 벡터들 (3 x 4)\nK = X @ Wk                                # '각 토큰의 이름표' 벡터들 (3 x 4)\nV = X @ Wv                                # '각 토큰의 알맹이 정보' 벡터들 (3 x 4)\n\n# 4) 점수 계산: Query와 Key를 내적해 '얼마나 잘 맞나' 측정\nscores = Q @ K.T                          # (3 x 3) 각 토큰이 각 토큰을 보는 원점수\nd_k = Q.shape[1]                          # Key의 차원 수(=4), 스케일링에 사용\nscores = scores / np.sqrt(d_k)            # sqrt(차원)로 나눠 값이 너무 커지는 것 방지\n\n# 5) softmax로 점수를 합이 1인 '집중 비율'로 변환\ndef softmax(x):                           # 행 단위 softmax 함수 직접 정의\n    e = np.exp(x - x.max(axis=1, keepdims=True))  # 최댓값을 빼서 수치 오버플로 방지\n    return e / e.sum(axis=1, keepdims=True)       # 각 행을 합이 1인 확률로 정규화\n\nattention = softmax(scores)               # (3 x 3) attention 가중치 행렬 완성\nprint(\"가중치 합:\", attention.sum(axis=1))  # 결과: 가중치 합: [1. 1. 1.]\n\n# 6) 가중치로 Value를 가중합해 최종 출력 만들기\noutput = attention @ V                     # (3 x 4) 각 토큰의 문맥 반영 결과\nprint(\"출력 shape:\", output.shape)          # 결과: 출력 shape: (3, 4)",
        "note": "임베딩→Q/K/V 변환→점수→softmax→가중합 이라는 Self-Attention의 전 과정을 외부 라이브러리 없이 NumPy만으로 재현한다.\n출력 shape이 입력과 같은 (3,4)로 유지되는 점이 핵심이다."
      }
    ]
  },
  "transformer-2": {
    "theory": [
      {"h": "Encoder는 다 보고, Decoder는 왼쪽만 본다", "body": "BERT(Encoder)와 GPT(Decoder)는 같은 블록을 쓰지만 '무엇까지 볼 수 있게 하느냐'가 다르다.\nEncoder는 문장 전체를 한꺼번에 양방향으로 봐서 이해·분류·유사도에 강하다. 빈칸 채우기처럼 앞뒤 문맥을 모두 활용하기 때문이다.\nDecoder는 인과적 마스킹으로 '지금 단어까지'만 보게 막아, 다음 단어를 예측하며 왼쪽에서 오른쪽으로 글을 지어낸다. 이것이 자기회귀(autoregressive) 생성이다.\n\n그래서 챗봇·글쓰기 같은 생성 작업은 대부분 Decoder-only(GPT·Llama·Claude 계열) 구조를 쓴다.\n정리하면, 마스킹을 켜면 생성기(Decoder), 끄면 이해기(Encoder)가 된다는 한 스위치로 두 계열을 꿸 수 있다."},
      {
        "h": "Multi-Head Attention은 여러 전문가의 회의다",
        "body": "어려운 문서를 혼자 읽는 것보다 여러 사람이 각자 관점으로 읽고 의견을 합치면 더 정확하다.\n문법을 보는 사람, 주제를 보는 사람, 어순을 보는 사람이 따로 읽고 회의로 종합하는 장면을 떠올리면 된다.\n\nMulti-Head Attention이 바로 이 회의다.\n하나의 Attention만 쓰지 않고, 여러 개(head)를 두어 같은 문장을 서로 다른 표현 부공간에서 동시에 바라본다.\n각 head가 만든 결과를 옆으로 이어 붙인 뒤 한 번 더 섞어서 최종 표현을 만든다.\n덕분에 모델은 '이 단어가 주어인가'와 '이 단어가 감정 표현인가' 같은 여러 관계를 한꺼번에 포착할 수 있다."
      },
      {
        "h": "순서를 모르는 Attention에 번호표 주기",
        "body": "Self-Attention은 모든 단어를 한눈에 펼쳐 보는 대신, 단어가 몇 번째에 있었는지를 잊어버린다.\n'개가 사람을 물었다'와 '사람이 개를 물었다'는 순서만 다른데, 순서를 모르면 뜻이 뒤섞인다.\n\n그래서 각 단어 임베딩에 '몇 번째 자리'라는 정보를 숫자로 더해주는데, 이것이 Positional Encoding이다.\n원래 Transformer는 사인·코사인 곡선을 이용해 자리마다 고유한 무늬의 숫자를 만들어 더한다.\n이렇게 하면 모델은 단어의 뜻뿐 아니라 '어디쯤에 있었는지'까지 함께 알게 된다.\n줄 선 사람들에게 1번·2번 번호표를 나눠줘 순서를 기억시키는 것과 똑같은 아이디어다."
      },
      {
        "h": "Transformer 블록은 레고처럼 쌓는다",
        "body": "Transformer는 마법 상자가 아니라, 똑같이 생긴 블록을 여러 층 쌓아 만든 탑이다.\n블록 하나에는 Multi-Head Attention과 작은 신경망(FFN)이 들어 있고, 그 사이사이에 잔차연결과 LayerNorm이라는 안전장치가 끼워진다.\n\n잔차연결은 층을 통과한 결과에 원래 입력을 더해, 깊이 쌓아도 정보가 사라지지 않게 비상 통로를 만들어준다.\nLayerNorm은 숫자 크기를 고르게 다듬어 학습이 흔들리지 않게 잡아준다.\n이 블록을 BERT는 양방향으로 읽도록, GPT는 왼쪽부터만 읽도록 배치해 각각 이해와 생성에 특화시킨다.\n결국 거대한 LLM도 이 단순한 블록을 아주 많이 쌓고, 아주 많은 글로 훈련한 결과일 뿐이다."
      },
      {
        "h": "Transformer 이후: 더 크게, 그리고 더 사람에 맞게",
        "body": "Transformer 구조가 나온 뒤 LLM은 두 방향으로 발전했다.\n첫째는 '크기'다. 모델·데이터·연산을 늘리면 성능이 예측 가능하게 좋아진다는 Scaling Law가 확인되면서, 모두가 모델을 키우기 시작했다.\n그 과정에서 예상 못 한 능력도 생겼는데, 예시 몇 개만 보여주면 다시 학습하지 않고도 그 자리에서 따라 하는 In-Context Learning이 대표적이다.\n\n둘째는 '사람에 맞추기'다. 크기만 키운 모델은 똑똑해도 엉뚱하거나 불친절할 수 있어, 사람이 더 좋은 답을 골라 주면 그 선호를 학습하는 RLHF로 도움되고 안전하게 다듬는다.\n또 전체를 다 키우면 계산이 너무 무거워서, 입력마다 여러 '전문가' 중 일부만 골라 쓰는 MoE(Mixture of Experts)로 크기와 효율을 함께 잡는다.\n이렇게 나온 모델들은 가중치를 공개한 Open-Weight(Llama·Qwen 등)와 API로만 쓰는 Closed(GPT·Claude 등)로 나뉘고, 벤치마크·Leaderboard로 성능을 겨룬다."
      }
    ],
    "realCode": [
      {
        "title": "Positional Encoding 만들고 시각화하기 (엔드투엔드)",
        "lang": "python",
        "code": "import numpy as np                       # 수치 계산 라이브러리\nimport matplotlib.pyplot as plt           # 그래프 시각화 라이브러리\n\ndef positional_encoding(seq_len, d_model):    # 길이와 차원을 받아 위치 인코딩 생성\n    pe = np.zeros((seq_len, d_model))         # (위치 x 차원) 0으로 채운 빈 표 준비\n    position = np.arange(seq_len)[:, None]    # 0,1,2,... 위치 번호를 세로 벡터로\n    # 차원 인덱스마다 주기를 다르게 하는 분모 계산\n    div = np.exp(np.arange(0, d_model, 2) * (-np.log(10000.0) / d_model))\n    pe[:, 0::2] = np.sin(position * div)      # 짝수 차원은 사인 곡선 값으로 채움\n    pe[:, 1::2] = np.cos(position * div)      # 홀수 차원은 코사인 곡선 값으로 채움\n    return pe                                 # 완성된 위치 인코딩 표 반환\n\nseq_len, d_model = 50, 64                     # 토큰 50개, 차원 64로 설정\npe = positional_encoding(seq_len, d_model)    # 위치 인코딩 표 생성\nprint(\"PE shape:\", pe.shape)                  # 결과: PE shape: (50, 64)\n\nplt.imshow(pe, aspect=\"auto\", cmap=\"viridis\") # 표를 색상 무늬 이미지로 그림\nplt.xlabel(\"차원(dimension)\")                  # 가로축: 임베딩 차원\nplt.ylabel(\"위치(position)\")                   # 세로축: 토큰 위치\nplt.colorbar()                                # 값-색 대응 막대 추가\nplt.title(\"Positional Encoding\")              # 그래프 제목\nplt.show()                                    # 화면에 출력(줄무늬 패턴이 보임)",
        "note": "자리마다 사인·코사인이 만들어내는 고유한 줄무늬 패턴을 눈으로 확인할 수 있다.\n이 표를 단어 임베딩에 더하면 모델이 순서를 알게 된다."
      },
      {
        "title": "사전학습 BERT로 문장 임베딩 뽑아 유사도 비교 (엔드투엔드)",
        "lang": "python",
        "code": "import torch                                   # 딥러닝 텐서 연산 라이브러리\nfrom transformers import AutoTokenizer, AutoModel  # 토크나이저와 모델 불러오기\n\ntok = AutoTokenizer.from_pretrained(\"bert-base-uncased\")  # BERT 토크나이저 로드\nmodel = AutoModel.from_pretrained(\"bert-base-uncased\")    # BERT 본체 모델 로드\nmodel.eval()                                    # 추론 모드(학습 끔)로 전환\n\ndef embed(text):                                # 문장을 하나의 벡터로 바꾸는 함수\n    inputs = tok(text, return_tensors=\"pt\")     # 문장을 텐서 형태로 토큰화\n    with torch.no_grad():                       # 기울기 계산 끔(추론이라 불필요)\n        out = model(**inputs)                   # 모델에 넣어 출력 얻기\n    return out.last_hidden_state.mean(dim=1)    # 토큰 벡터 평균으로 문장 벡터화\n\na = embed(\"I love cats\")                         # 1번 문장 임베딩\nb = embed(\"I adore kittens\")                     # 2번 문장(비슷한 뜻) 임베딩\nc = embed(\"The stock market crashed\")            # 3번 문장(다른 뜻) 임베딩\n\ncos = torch.nn.functional.cosine_similarity     # 코사인 유사도 함수 별칭\nprint(\"비슷한 문장:\", round(cos(a, b).item(), 3))   # 결과 예: 비슷한 문장: 0.9 근처(높음)\nprint(\"다른 문장:\", round(cos(a, c).item(), 3))     # 결과 예: 다른 문장: 0.6 근처(낮음)",
        "note": "뜻이 비슷한 문장끼리는 코사인 유사도가 높고, 다른 주제 문장과는 낮게 나오는 것을 통해 임베딩이 의미를 담고 있음을 확인한다."
      }
    ]
  },
  "python-1": {
    "theory": [
      {"h": "내 코드는 어떻게 실행될까 - AST와 PVM", "body": "Python은 우리가 쓴 소스를 곧바로 실행하지 않는다.\n먼저 문법 구조(AST)로 해석한 뒤 바이트코드로 번역하고, 그 바이트코드를 PVM(파이썬 가상머신)이 한 줄씩 실행한다.\n이 흐름을 알면 오류 메시지를 읽는 눈이 생기고, 3.11이 왜 더 빠르고 오류 위치를 더 정확히 짚어 주는지도 이해된다."},
      {"h": "venv를 반드시 쓰는 이유", "body": "프로젝트마다 필요한 라이브러리 버전이 다른데, 컴퓨터 전체에 하나로만 깔면 A 프로젝트를 고치다 B가 깨진다.\nvenv는 프로젝트별로 독립된 상자를 만들어 이런 충돌을 원천 차단한다.\nrequirements.txt와 함께 쓰면 남의 컴퓨터에서도 똑같은 환경을 그대로 재현할 수 있다."},
      {"h": "타입 힌트와 Pydantic이 버그를 미리 막는 원리", "body": "데이터가 파이프라인을 흐르다 엉뚱한 형식이 섞이면 한참 뒤에 가서야 터진다.\n타입 힌트로 형식을 적어 두면 mypy가 실행 전에 문제를 잡아 주고, Pydantic은 데이터가 들어오는 입구에서 형식을 검문해 잘못된 값을 초반에 걸러낸다.\n둘 다 '문제를 늦게 말고 일찍' 발견하게 해 주는 안전장치다."},
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
        "code": "import numpy as np  # 숫자 배열을 빠르게 계산하기 위한 NumPy 라이브러리를 불러온다\n\n# 실무에서 받는 데이터는 보통 이렇게 빈값·이상치가 섞여 '지저분'하다\norders = [12000, 0, 35000, -1, 8000, None, 21000]  # 주문 금액 목록(0·음수·None 은 잘못된 값)\n\nclean = []  # 정상 금액만 모아 둘 빈 리스트를 준비한다\n\nfor price in orders:          # orders 안의 값을 하나씩 price 에 꺼내 반복한다\n    if price is None:         # 값이 비어 있으면(None)\n        continue              # 건너뛰고 다음 값으로 넘어간다\n    if price <= 0:            # 금액이 0 이하인 잘못된 값이면\n        continue              # 역시 건너뛴다\n    clean.append(price)       # 위 검사를 모두 통과한 정상 금액만 담는다\n\nprices = np.array(clean)      # 정제된 리스트를 NumPy 배열로 바꿔 한꺼번에 계산할 준비\n\nwith_tax = prices * 1.1       # 모든 금액에 부가세 10%를 한 줄로 더한다(반복문 불필요)\n\nsummary = {                                   # 결과 요약을 사전 형태로 정리\n    '건수': len(prices),                      # 정상 주문 개수\n    '합계': int(prices.sum()),                # 금액 총합(정수로 변환)\n    '평균': round(float(prices.mean())),      # 평균 금액(소수 반올림)\n}\n\nprint('정제 전 개수:', len(orders))           # 결과: 정제 전 개수: 7\nprint('정제 후 개수:', len(prices))           # 결과: 정제 후 개수: 4\nprint('부가세 포함:', with_tax)               # 결과: 부가세 포함: [13200. 38500.  8800. 23100.]\nprint('요약:', summary)                        # 결과: 요약: {'건수': 4, '합계': 76000, '평균': 19000}",
        "note": "실무 데이터는 거의 항상 빈값·이상치가 섞여 있어 걸러내기 → 배열 변환 → 요약이 전처리의 기본 골격이다."
      }
    ]
  },
  "python-2": {
    "theory": [
      {"h": "Pandas vs Polars vs DuckDB - 언제 무엇을 쓰나", "body": "수만~수십만 줄 정도면 익숙한 Pandas로 충분하다.\n수백만 줄이 넘거나 속도가 중요하면 필요한 계산만 몰아서 실행하는 Polars(Lazy)가 유리하고, 이미 파일로 저장된 데이터를 SQL로 빠르게 훑고 싶으면 DuckDB가 편하다.\n데이터 크기와 작업 성격에 맞춰 도구를 고르는 판단 자체가 실무 역량이다."},
      {"h": "숫자로 끝내지 말고 검정하라", "body": "요일별 평균 팁이 달라 보여도 그 차이가 우연일 수 있다.\nt-검정이나 카이제곱 같은 가설 검정은 '이 차이가 통계적으로 의미 있는가'를 따져 잘못된 결론을 막아 준다.\n눈에 보이는 숫자 차이를 곧바로 결론으로 삼지 않는 습관이 분석의 신뢰도를 높인다."},
      {"h": "전처리와 모델을 Pipeline으로 묶는 이유", "body": "결측치 채우기나 스케일링을 학습 데이터에만 적용하고 예측할 때 빠뜨리면 결과가 어긋난다.\nsklearn의 Pipeline은 전처리부터 모델까지 한 덩어리로 묶어 학습·예측에 똑같은 처리가 적용되도록 보장한다.\n완성된 파이프라인은 joblib으로 통째로 저장·배포할 수 있어 실무 재현성도 확보된다."},
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
      {"h": "AI는 어떻게 여기까지 왔나 - 진화의 흐름", "body": "과거의 AI는 사람이 규칙을 하나하나 짜 넣는 '규칙 기반'이었고, 이후 데이터에서 스스로 패턴을 배우는 머신러닝, 신경망을 깊게 쌓은 딥러닝으로 발전했다.\n2020년대에 방대한 텍스트를 학습한 거대 언어모델이 등장하며 '생성형 AI' 시대가 열렸다.\n\n핵심 전환점은 관심이 '사람이 규칙을 주입 → 모델이 스스로 배움 → 이제는 프롬프트로 지시만 하면 됨'으로 옮겨간 것이다.\n그래서 오늘날 실력은 '코딩'보다 '어떻게 시킬지(프롬프트)'에서 갈린다. 이 흐름을 알면 왜 이 과목이 프롬프트에서 출발하는지가 자연스럽게 이해된다."},
      {"h": "생성형 AI는 실무에서 무엇을 바꾸나 - 비즈니스 활용", "body": "생성형 AI는 이미 여러 업무에 들어와 있다.\n마케팅에선 카피·상세페이지 초안 작성, 고객지원에선 문의 자동 응답과 요약, 개발에선 코드 생성·리뷰, 기획에선 시장조사·경쟁사 분석·보고서 초안에 쓰인다.\n공통점은 '0에서 1을 만드는 초안 작업'과 '많은 자료를 빠르게 정리·요약'하는 일을 크게 앞당긴다는 것이다.\n\n다만 사실 확인이 필요한 최종 판단은 여전히 사람 몫이며, AI는 '초안을 빠르게 뽑아 주는 유능한 신입'으로 보는 관점이 안전하다.\n이 과목의 종합실습(시장조사·전략수립 프롬프트)도 바로 이 비즈니스 활용을 직접 체험하는 자리다."},
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
      },
      {"h": "Prompt를 넘어서 — Context와 Harness Engineering", "body": "프롬프트를 아무리 잘 써도, 문장만으로는 최신 정보나 사내 자료를 넣을 수 없다는 한계가 있다. 그래서 다음 단계로 넘어간다.\n\nContext Engineering은 '문장을 다듬는 것'을 넘어, 모델에게 무엇을·얼마나·어떤 순서로 맥락(문서·대화·도구 결과)을 넣을지를 설계하는 일이다.\n여기서 한 걸음 더 나아가면, 모델이 스스로 도구를 골라 실행하는 AI Agent가 되고, 그 도구 연결·검색·오류 처리 같은 '주변 장치'까지 설계하는 것이 Harness Engineering이다.\n즉 '좋은 문장(Prompt) → 좋은 맥락(Context) → 좋은 장치(Harness)'로 관심이 넓어지는 흐름이며, 이 과목은 그 출발점을 다진다."}
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
      {"h": "computed vs watch, 언제 무엇을 쓰나", "body": "computed는 '다른 값들로부터 자동으로 만들어지는 새 값'에 씁니다.\n예를 들어 장바구니 합계처럼, 원본이 바뀌면 알아서 다시 계산되어 화면에 그대로 보여줄 값에 적합합니다.\nwatch는 '값이 바뀌었을 때 무언가를 실행'해야 할 때 씁니다. 검색어가 바뀌면 서버에 재검색을 요청하거나, 입력을 로컬스토리지에 저장하는 일이 그렇습니다.\n\n판단 기준은 한 줄로 정리됩니다 — 새 값이 필요하면 computed, 바뀔 때 할 일이 필요하면 watch."},
      {
        "h": "왜 Vue 같은 프레임워크를 쓰나요?",
        "body": "옛날 방식에서는 화면의 글자 하나를 바꾸려면 document.getElementById 로 요소를 찾아 직접 글자를 갈아끼워야 했습니다.\n데이터가 많아지면 '어디를 바꿔야 하는지' 챙기는 일이 금세 복잡해집니다.\n\nVue는 이 일을 대신 해 줍니다.\n우리는 그냥 '데이터'만 바꾸면, Vue가 그 데이터를 쓰는 화면 부분을 알아서 다시 그려 줍니다.\n마치 엑셀에서 셀 값을 바꾸면 그 셀을 참조하는 합계가 자동으로 바뀌는 것과 같습니다.\n그래서 개발자는 '화면 조작'이 아니라 '데이터와 규칙'에만 집중할 수 있습니다."
      },
      {
        "h": "반응형 상태: ref 와 reactive",
        "body": "Vue에서 화면과 연결되는 데이터를 '상태(state)'라고 부릅니다.\n상태를 반응형으로 만들려면 값을 ref 나 reactive 로 감싸야 합니다.\n\nref 는 숫자·문자열·불리언 같은 '하나짜리 값'을 감쌀 때 씁니다.\n감싸고 나면 자바스크립트 코드에서는 .value 로 접근하지만, 템플릿(화면) 안에서는 .value 없이 바로 씁니다.\nreactive 는 여러 값을 담은 '객체'를 통째로 감쌀 때 쓰며 .value 가 필요 없습니다.\n초보자는 우선 'ref 만 쓴다'고 외워도 충분합니다."
      }
    ],
    "realCode": [
      {
        "title": "App.vue — 반응형 할 일 목록 전체",
        "lang": "vue",
        "code": "<script setup>\n// vue 라이브러리에서 반응형 함수 ref 와 계산 속성 computed 를 가져온다(화면과 데이터를 연결하기 위함)\nimport { ref, computed } from 'vue'\n\n// 할 일 객체들을 담을 배열을 반응형으로 만든다(배열이 바뀌면 화면도 자동 갱신)\nconst todos = ref([])\n// 입력창에 적은 글자를 담을 반응형 문자열(처음엔 빈 문자열)\nconst text = ref('')\n// 새 할 일의 고유 번호를 만들기 위한 카운터(1부터 시작)\nlet nextId = 1\n\n// 버튼을 눌렀을 때 실행될 함수: 새 할 일을 목록에 추가한다\nfunction addTodo() {\n  // 입력값 앞뒤 공백을 제거했을 때 비어 있으면 아무것도 하지 않고 함수를 끝낸다\n  if (text.value.trim() === '') return\n  // todos 배열 끝에 새 할 일 객체를 추가한다(id·제목·완료여부)\n  todos.value.push({ id: nextId++, title: text.value, done: false })\n  // 다음 입력을 위해 입력창 값을 다시 비운다\n  text.value = ''\n}\n\n// 아직 완료되지 않은 할 일의 개수를 자동 계산한다(todos 가 바뀔 때만 다시 계산)\nconst remaining = computed(() => todos.value.filter(t => !t.done).length)\n</script>\n\n<template>\n  <!-- 화면 제목과 남은 할 일 개수를 보여준다(remaining 값이 바뀌면 숫자도 자동 변경) -->\n  <h2>할 일 목록 (남은 일: {{ remaining }}개)</h2>\n  <!-- 입력창: v-model 로 text 상태와 양방향 연결, 엔터를 누르면 addTodo 실행 -->\n  <input v-model=\"text\" @keyup.enter=\"addTodo\" placeholder=\"할 일을 입력하세요\" />\n  <!-- 추가 버튼: 클릭하면 addTodo 함수를 호출한다 -->\n  <button @click=\"addTodo\">추가</button>\n  <!-- 할 일들을 세로 목록으로 표시한다 -->\n  <ul>\n    <!-- v-for 로 todos 배열을 하나씩 꺼내 li 를 만든다, key 에는 고유 id 를 준다 -->\n    <li v-for=\"todo in todos\" :key=\"todo.id\">\n      <!-- 체크박스: v-model 로 해당 할 일의 done(완료여부)과 양방향 연결 -->\n      <input type=\"checkbox\" v-model=\"todo.done\" />\n      <!-- 완료되면 done 클래스가 붙어 취소선이 그려진다, 제목을 출력 -->\n      <span :class=\"{ done: todo.done }\">{{ todo.title }}</span>\n    </li>\n  </ul>\n</template>\n\n<style>\n/* done 클래스가 붙은 글자에 취소선과 회색을 적용한다(완료 표시) */\n.done { text-decoration: line-through; color: gray; }\n</style>",
        "note": "ref 로 만든 상태를 v-model·v-for·computed 로 연결한 완결형 예제다.\n입력→추가→체크가 모두 데이터만 바꾸면 화면이 자동으로 따라 바뀐다."
      },
      {
        "title": "검색어를 감시해 재검색하는 watch 예제",
        "lang": "vue",
        "code": "<script setup>\n// ref로 검색어 상태를, watch로 그 변화를 감시한다\nimport { ref, watch } from 'vue'\n\n// 입력창과 연결될 검색어 상태(처음엔 빈 문자열)\nconst keyword = ref('')\n// 검색 결과를 담을 반응형 배열\nconst results = ref([])\n\n// keyword가 바뀔 때마다 실행: 새 값(newVal)을 받아 서버에 재검색을 요청한다\nwatch(keyword, async (newVal) => {\n  if (!newVal.trim()) { results.value = []; return } // 빈 검색어면 결과를 비우고 종료\n  const res = await fetch('/api/search?q=' + newVal)  // 실제로는 검색 API를 호출\n  results.value = await res.json()                    // 받은 결과로 화면을 갱신\n})\n</script>\n\n<template>\n  <!-- v-model로 입력창과 keyword를 양방향 연결 -->\n  <input v-model='keyword' placeholder='검색어를 입력하세요' />\n  <!-- 검색 결과를 목록으로 표시 -->\n  <ul><li v-for='r in results' :key='r.id'>{{ r.title }}</li></ul>\n</template>",
        "note": "computed는 값 계산에, watch는 값이 바뀔 때의 '부수 효과'에 쓴다.\n검색어가 바뀔 때 서버를 다시 부르는 것처럼 무언가를 실행해야 하는 일은 watch로 처리한다."
      }
    ]
  },
  "vue-2": {
    "theory": [
      {"h": "props 릴레이가 힘들 때: Provide & Inject", "body": "props는 부모에서 자식으로 한 칸씩만 내려갑니다.\n할아버지 컴포넌트가 손자에게 값을 주려면 중간의 아버지 컴포넌트가 필요도 없는 props를 받아 그대로 다시 내려보내야 하는데, 이런 릴레이가 길어지면 코드가 지저분해집니다.\nProvide/Inject는 부모가 provide('theme', 'dark')처럼 값을 한 번 넣어 두면, 그 아래 어떤 깊이의 자손이든 inject('theme')로 바로 받는 지름길입니다.\n\n테마나 로그인 사용자 정보처럼 '트리 전체가 공유하는 설정값'에 적합합니다.\n다만 멀리 떨어진 형제끼리 앱 전역으로 공유해야 한다면 Provide/Inject보다 Pinia가 더 맞습니다."},
      {
        "h": "컴포넌트 통신: props 는 내려주고 emit 은 올려보낸다",
        "body": "큰 화면을 작은 컴포넌트로 쪼개면, 이 조각들끼리 데이터를 주고받아야 합니다.\nVue의 규칙은 단순합니다.\n\n부모는 자식에게 props 로 값을 '내려'줍니다(예: 회원 정보).\n자식은 그 값을 마음대로 바꾸지 않고 화면에 보여주기만 합니다.\n반대로 자식에게 무슨 일이 생기면(예: 삭제 버튼 클릭) emit 으로 부모에게 신호를 '올려'보냅니다.\n그러면 실제 데이터 변경은 데이터의 주인인 부모가 합니다.\n이렇게 '데이터는 위에서 아래로, 사건은 아래에서 위로' 흐르게 하면 누가 데이터를 바꾸는지 명확해져 버그가 줄어듭니다."
      },
      {
        "h": "Composition API가 왜 편한가요?",
        "body": "예전 방식(Options API)에서는 data·methods·computed 칸이 따로 나뉘어 있었습니다.\n기능 하나를 이해하려면 여러 칸을 왔다 갔다 봐야 했습니다.\n\nComposition API는 '하나의 기능에 관한 상태와 함수'를 한곳(setup)에 모아 적습니다.\n예를 들어 '검색' 기능에 필요한 상태·함수를 한 덩어리로 둘 수 있습니다.\n더 나아가 이 덩어리를 useSearch 같은 함수로 빼내면 여러 컴포넌트에서 똑같이 가져다 쓸 수 있습니다.\n마치 요리 레시피를 한 장에 정리해 두고 필요할 때마다 꺼내 쓰는 것과 같습니다."
      }
    ],
    "realCode": [
      {
        "title": "UserItem.vue — props·emit·slot 을 쓰는 자식 컴포넌트",
        "lang": "vue",
        "code": "<script setup>\n// 부모에게서 받을 데이터(props)의 이름과 타입을 선언한다\nconst props = defineProps({\n  user: { type: Object, required: true } // user 객체는 반드시 받아야 한다\n})\n// 부모에게 올려보낼 수 있는 이벤트 이름들을 선언한다\nconst emit = defineEmits(['remove'])\n\n// 삭제 버튼을 눌렀을 때 실행, 부모에게 remove 이벤트와 함께 회원 id 를 전달한다\nfunction onRemove() {\n  emit('remove', props.user.id) // 'remove' 신호 + 삭제할 회원의 id 를 올려보냄\n}\n</script>\n\n<template>\n  <!-- 회원 카드 한 장을 감싸는 영역 -->\n  <div class=\"card\">\n    <!-- 부모가 내려준 이름을 출력 -->\n    <strong>{{ user.name }}</strong>\n    <!-- 부모가 내려준 이메일을 출력 -->\n    <span>{{ user.email }}</span>\n    <!-- 클릭하면 onRemove 실행 → 부모에게 삭제 신호 전달 -->\n    <button @click=\"onRemove\">삭제</button>\n    <!-- 부모가 카드 안에 끼워넣고 싶은 추가 내용이 들어올 자리 -->\n    <slot></slot>\n  </div>\n</template>\n\n<style>\n/* 카드에 테두리·여백을 줘 한 장처럼 보이게 한다 */\n.card { border: 1px solid #ddd; padding: 8px; margin: 4px; }\n</style>",
        "note": "defineProps 로 값을 받고 defineEmits 로 사건을 올려보내며 slot 으로 확장 지점을 연 자식 컴포넌트다."
      },
      {
        "title": "App.vue — 부모가 목록을 관리하고 삭제를 처리",
        "lang": "vue",
        "code": "<script setup>\n// 반응형 배열을 위해 ref 를 가져온다\nimport { ref } from 'vue'\n// 방금 만든 자식 컴포넌트를 가져온다\nimport UserItem from './components/UserItem.vue'\n\n// 회원 목록을 반응형 배열로 만든다(데이터의 주인은 이 부모다)\nconst users = ref([\n  { id: 1, name: '김철수', email: 'kim@test.com' },\n  { id: 2, name: '이영희', email: 'lee@test.com' }\n])\n\n// 자식이 올려보낸 remove 이벤트를 처리: 해당 id 만 빼고 새 배열로 교체\nfunction removeUser(id) {\n  users.value = users.value.filter(u => u.id !== id) // id 가 다른 회원만 남긴다\n}\n</script>\n\n<template>\n  <h2>회원 목록</h2>\n  <!-- v-for 로 회원마다 UserItem 을 만든다, key 는 고유 id -->\n  <UserItem\n    v-for=\"u in users\"\n    :key=\"u.id\"\n    :user=\"u\"\n    @remove=\"removeUser\"\n  >\n    <!-- slot 자리에 끼워넣는 내용: 회원 등급 안내 -->\n    <em>일반 회원</em>\n  </UserItem>\n</template>",
        "note": "부모는 users 배열을 props 로 내려주고, 자식의 remove 이벤트를 받아 실제 삭제를 수행한다."
      },
      {
        "title": "App.vue → Profile.vue: provide/inject로 사용자 정보 전달",
        "lang": "vue",
        "code": "<!-- ===== App.vue : 최상위에서 사용자 정보를 provide 한다 ===== -->\n<script setup>\nimport { provide, ref } from 'vue'\nimport Profile from './components/Profile.vue'\n\n// 로그인한 사용자 정보(실무에선 서버에서 받아옴)\nconst currentUser = ref({ name: '홍길동', role: '관리자' })\n// 'user'라는 이름으로 트리 전체에 값을 내려놓는다(한 번만)\nprovide('user', currentUser)\n</script>\n\n<template>\n  <!-- 중간에 아무리 많은 컴포넌트가 끼어 있어도 props를 넘길 필요가 없다 -->\n  <Profile />\n</template>\n\n<!-- ===== components/Profile.vue : 깊숙한 자식이 inject로 바로 받는다 ===== -->\n<script setup>\nimport { inject } from 'vue'\n// App.vue가 provide한 'user'를 중간 단계를 건너뛰고 바로 주입받는다\nconst user = inject('user')\n</script>\n\n<template>\n  <!-- 주입받은 사용자 이름을 표시 -->\n  <p>안녕하세요, {{ user.name }}님 ({{ user.role }})</p>\n</template>",
        "note": "provide는 부모가 한 번 값을 넣고, inject는 자손이 깊이에 상관없이 바로 꺼내 쓴다.\n중간 컴포넌트를 거치는 props 릴레이가 사라지는 것이 핵심이다."
      }
    ]
  },
  "vue-3": {
    "theory": [
      {
        "h": "SPA와 라우팅: 새로고침 없이 페이지를 바꾼다",
        "body": "보통 웹사이트는 링크를 누르면 서버에서 새 HTML을 통째로 받아와 화면이 깜빡입니다.\nSPA는 첫 화면만 한 번 받아오고, 그 뒤로는 자바스크립트가 필요한 부분만 바꿉니다.\n그래서 페이지 전환이 매끄럽고 빠릅니다.\n\nVue Router는 '주소가 바뀌면 어떤 컴포넌트를 보여줄지' 정해 주는 안내원입니다.\n'/' 주소에는 목록 화면을, '/product/3' 에는 3번 상품 상세 화면을 연결하는 식입니다.\n사용자는 주소가 바뀌는 것처럼 보이지만 실제로는 서버를 다시 부르지 않고 화면만 갈아끼웁니다."
      },
      {
        "h": "전역 상태 관리: 왜 Pinia가 필요한가",
        "body": "장바구니 개수처럼 여러 화면이 '같은 데이터'를 봐야 할 때가 있습니다.\n이걸 props·emit 으로 컴포넌트마다 일일이 전달하면 금세 복잡해집니다.\n특히 멀리 떨어진 컴포넌트끼리는 전달이 무척 번거롭습니다.\n\nPinia는 이런 공용 데이터를 '한 창고'에 모아 둡니다.\n어느 컴포넌트든 그 창고에 직접 접근해 값을 읽거나 바꿀 수 있습니다.\n마치 집안 어디서나 꺼내 쓰는 공용 냉장고와 같습니다.\n그래서 데이터가 흩어지지 않고 한곳에서 관리되어 추적이 쉬워집니다."
      }
    ],
    "realCode": [
      {
        "title": "router/index.js + stores/cart.js — 라우터와 전역 스토어",
        "lang": "javascript",
        "code": "// ----- router/index.js : 주소와 화면을 연결하는 라우터 -----\n// 라우터를 만드는 함수와 history 모드 함수를 가져온다\nimport { createRouter, createWebHistory } from 'vue-router'\n// 라우트에 연결할 두 페이지 컴포넌트를 가져온다\nimport ProductList from '../views/ProductList.vue'\nimport ProductDetail from '../views/ProductDetail.vue'\n\n// 주소(path)와 보여줄 컴포넌트를 짝지은 라우트 표를 만든다\nconst routes = [\n  { path: '/', component: ProductList },              // 기본 주소는 상품 목록\n  { path: '/product/:id', component: ProductDetail }  // :id 는 상품 번호 자리(동적 파라미터)\n]\n\n// 라우터 객체를 생성한다(history 모드 + 위에서 만든 라우트 표 사용)\nconst router = createRouter({\n  history: createWebHistory(), // 주소창을 깔끔하게(# 없이) 쓰는 모드\n  routes                       // 위에서 정의한 라우트 표 연결\n})\n\n// 만든 라우터를 다른 파일(main.js)에서 쓰도록 내보낸다\nexport default router\n\n// ----- stores/cart.js : 장바구니 전역 스토어 -----\n// 스토어를 정의하는 함수를 가져온다\nimport { defineStore } from 'pinia'\n\n// 'cart' 라는 이름의 스토어를 정의한다(전역 어디서나 useCartStore 로 사용)\nexport const useCartStore = defineStore('cart', {\n  // 보관할 상태: 담긴 상품 배열\n  state: () => ({ items: [] }),\n  // 자동 계산값: 담긴 상품 개수\n  getters: {\n    count: (state) => state.items.length // items 길이가 곧 담긴 개수\n  },\n  // 상태를 바꾸는 함수들\n  actions: {\n    add(product) {            // 상품을 장바구니에 담는다\n      this.items.push(product) // items 배열 끝에 상품 추가\n    }\n  }\n})",
        "note": "라우터는 주소→화면 연결을, Pinia 스토어는 어디서나 쓰는 장바구니 데이터를 담당한다."
      },
      {
        "title": "ProductDetail.vue — 파라미터 읽기와 스토어 사용",
        "lang": "vue",
        "code": "<script setup>\n// 현재 라우트 정보를 읽는 함수를 가져온다(주소의 :id 를 알기 위함)\nimport { useRoute } from 'vue-router'\n// 방금 만든 장바구니 스토어를 가져온다\nimport { useCartStore } from '../stores/cart'\n\n// 현재 라우트 객체를 얻는다\nconst route = useRoute()\n// 장바구니 스토어 인스턴스를 얻는다\nconst cart = useCartStore()\n\n// 주소의 :id 값을 읽어 상품 번호로 사용한다\nconst id = route.params.id\n// 예시 상품 객체를 만든다(실무에선 서버에서 불러옴)\nconst product = { id, name: id + '번 상품', price: 1000 }\n\n// 담기 버튼을 눌렀을 때 스토어의 add 액션을 호출한다\nfunction addToCart() {\n  cart.add(product) // 전역 장바구니에 이 상품을 담는다\n}\n</script>\n\n<template>\n  <!-- 어떤 상품인지 제목으로 보여준다 -->\n  <h2>{{ product.name }}</h2>\n  <!-- 가격을 표시한다 -->\n  <p>가격: {{ product.price }}원</p>\n  <!-- 클릭하면 addToCart 실행 → 전역 장바구니에 담김 -->\n  <button @click=\"addToCart\">장바구니 담기</button>\n  <!-- 스토어의 count 게터로 현재 담긴 개수를 실시간 표시 -->\n  <p>현재 담긴 개수: {{ cart.count }}</p>\n  <!-- 목록으로 돌아가는 라우터 링크(새로고침 없이 이동) -->\n  <router-link to=\"/\">목록으로</router-link>\n</template>",
        "note": "useRoute 로 주소의 id 를 읽고, 전역 cart 스토어에 담아 어느 화면에서나 개수를 공유한다."
      }
    ]
  },
  "vue-4": {
    "theory": [
      {
        "h": "비동기 통신: 기다리되 멈추지 않는다",
        "body": "API로 데이터를 받아오는 데는 약간의 시간이 걸립니다.\n이때 화면이 멈춰 있으면 사용자는 답답함을 느낍니다.\n그래서 자바스크립트는 '비동기'로 처리합니다.\n요청을 보내 두고 화면은 계속 움직이다가, 데이터가 도착하면 그때 화면을 채웁니다.\n\n코드에서는 async/await 문법으로 이를 표현합니다.\nawait 를 붙이면 '결과가 올 때까지 이 줄에서 기다렸다가 다음으로 넘어가라'는 뜻입니다.\n마치 식당에서 주문 번호표를 받고 자리에 앉아 다른 일을 하다가, 번호가 불리면 음식을 받으러 가는 것과 같습니다."
      },
      {
        "h": "로딩·에러 처리와 배포까지",
        "body": "실무 화면은 세 가지 상태를 모두 챙겨야 합니다.\n불러오는 중(로딩), 실패(에러), 성공(데이터 표시)입니다.\n로딩 중에는 '잠시만요'를, 실패하면 '문제가 생겼어요'를 보여줘야 사용자가 당황하지 않습니다.\n이를 try/catch 와 v-if 로 구분해 처리합니다.\n\n완성된 앱은 마지막에 'npm run build' 로 압축해 dist 폴더를 만듭니다.\n이 폴더를 GitHub Pages 같은 정적 호스팅에 올리면 누구나 접속할 수 있는 진짜 웹사이트가 됩니다.\n이렇게 기획-구현-배포의 한 사이클을 완주하는 것이 이 과정의 목표입니다."
      }
    ],
    "realCode": [
      {
        "title": "api.js + PostList.vue — API 연동 미니 SPA",
        "lang": "vue",
        "code": "<!-- ===== src/api.js (별도 파일) =====\nimport axios from 'axios'                              // HTTP 통신 라이브러리 가져오기\nexport const api = axios.create({                      // 공통 설정을 가진 요청 인스턴스 생성\n  baseURL: import.meta.env.VITE_API_BASE,              // .env 의 API 기본 주소를 읽어 적용\n  timeout: 5000                                        // 5초 안에 응답 없으면 실패 처리\n})\n===== 아래는 PostList.vue ===== -->\n<script setup>\n// 화면에 나타날 때 실행되는 훅과 반응형 함수들을 가져온다\nimport { onMounted, ref } from 'vue'\n// 위에서 만든 api 인스턴스를 가져온다\nimport { api } from '../api'\n\n// 게시글 목록을 담을 반응형 배열\nconst posts = ref([])\n// 불러오는 중인지 표시(처음엔 true)\nconst loading = ref(true)\n// 에러 메시지를 담을 상태(없으면 빈 문자열)\nconst error = ref('')\n\n// 게시글을 서버에서 비동기로 불러오는 함수\nasync function load() {\n  try {\n    loading.value = true                 // 불러오기 시작 → 로딩 켜기\n    const res = await api.get('/posts')  // /posts 에 GET 요청, 응답이 올 때까지 기다림\n    posts.value = res.data.slice(0, 5)   // 받은 데이터 중 앞 5개만 저장\n  } catch (e) {\n    error.value = '데이터를 불러오지 못했습니다.' // 실패하면 에러 메시지 설정\n  } finally {\n    loading.value = false                // 성공이든 실패든 로딩 끄기\n  }\n}\n\n// 컴포넌트가 화면에 붙은 직후 한 번 데이터를 불러온다\nonMounted(load)\n</script>\n\n<template>\n  <!-- 로딩 중이면 안내 문구를 보여준다 -->\n  <p v-if=\"loading\">불러오는 중...</p>\n  <!-- 에러가 있으면 에러 문구를 빨갛게 보여준다 -->\n  <p v-else-if=\"error\" style=\"color:red\">{{ error }}</p>\n  <!-- 정상일 때 게시글 목록을 출력한다 -->\n  <ul v-else>\n    <!-- v-for 로 게시글을 하나씩 꺼내 제목을 표시, key 는 고유 id -->\n    <li v-for=\"p in posts\" :key=\"p.id\">{{ p.title }}</li>\n  </ul>\n</template>",
        "note": "axios 로 API를 부르고 loading·error·정상 세 상태를 v-if 로 나눠 처리하는 실전 패턴이다.\ntry/catch/finally 로 실패해도 화면이 멈추지 않는다."
      }
    ]
  },
  "webproject-1": {
    "theory": [
      {"h": "우리 서비스에 AI를 어떻게 한 스푼 넣을까", "body": "이 미니 프로젝트의 핵심은 '평범한 화면'에 AI 기능을 딱 하나 얹어 보는 것이다.\n거창할 필요 없이 서비스 성격에 맞는 AI 기능 하나를 고른다. 메모 앱이면 '메모를 한 줄로 요약', 맛집 앱이면 '취향 태그로 추천 문구 생성', 게시판이면 '글을 카테고리로 자동 분류' 같은 식이다.\n이때 AI는 직접 만드는 게 아니라 이미 있는 LLM API(예: OpenAI·Anthropic)에 '이런 걸 해줘'라고 요청하고 그 결과를 화면에 보여주는 방식이다.\n\n기획 단계에서 'AI에게 무엇을 입력하고(입력) 어떤 결과를 받아(출력) 어디에 보여줄지'를 한 문장으로 미리 정해 두면 구현이 한결 쉬워진다.\n욕심내 여러 기능을 넣지 말고, 서비스를 가장 돋보이게 하는 한 개만 확실히 완성하는 것이 미니 프로젝트의 정석이다."},
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
        "h": "Spring AI가 왜 필요한가",
        "body": "예전에는 자바에서 LLM을 쓰려면 HTTP 요청을 직접 만들고 JSON을 손으로 파싱해야 했다.\n이 과정은 길고 실수하기 쉬워서 초보자에게는 큰 벽이었다.\nSpring AI는 이런 번거로운 일을 대신 처리해 주는 '중간 통역사' 같은 라이브러리다.\n우리는 '무엇을 물어볼지'만 신경 쓰면 되고, 통신·인증·파싱은 Spring AI가 알아서 해 준다.\n덕분에 자바 개발자도 단 몇 줄로 AI 기능을 백엔드에 붙일 수 있다."
      },
      {
        "h": "ChatClient 한 줄이 하는 일",
        "body": "ChatClient는 식당의 '주문 키오스크'에 비유할 수 있다.\n우리는 메뉴(질문)를 고르고 버튼을 누르기만 하면 된다.\n주방(LLM 서버)에 주문을 전달하고 요리(답변)를 받아 오는 일은 키오스크가 다 한다.\nprompt()로 주문서를 펼치고, user()로 질문을 적고, call()로 주문을 보내고, content()로 음식을 받는 흐름이다.\n이 네 단계만 외우면 첫 AI API를 만들 수 있다."
      },
      {
        "h": "프로바이더는 설정으로 갈아 끼운다",
        "body": "Spring AI의 큰 장점은 모델 공급사를 코드 수정 없이 바꿀 수 있다는 점이다.\n비유하자면 콘센트 규격이 같으면 어떤 회사의 전구든 꽂아 쓸 수 있는 것과 같다.\nOpenAI를 쓰다가 Anthropic(클로드)으로 바꾸고 싶으면 application.yml 설정과 의존성만 바꾸면 된다.\n컨트롤러나 서비스의 자바 코드는 거의 그대로 둘 수 있어 유지보수가 쉽다.\n이런 '추상화' 덕분에 한 번 배운 사용법을 여러 모델에 재활용할 수 있다."
      }
    ],
    "realCode": [
      {
        "title": "채팅 응답 REST API (Controller 전체)",
        "lang": "java",
        "code": "// 이 클래스가 속한 패키지(폴더) 경로를 선언한다\npackage com.example.springai.chat;\n\n// LLM에게 말을 거는 핵심 도구 ChatClient 를 가져온다\nimport org.springframework.ai.chat.client.ChatClient;\n// 웹 요청을 처리하는 애너테이션들을 한 번에 가져온다(@RestController 등)\nimport org.springframework.web.bind.annotation.*;\n\n// 이 클래스가 HTTP 요청을 받아 문자열로 응답하는 컨트롤러임을 선언\n@RestController\n// 이 컨트롤러의 모든 주소 앞에 /api/chat 을 공통으로 붙인다\n@RequestMapping(\"/api/chat\")\npublic class ChatController {\n\n    // LLM 호출 도구를 담아 둘 변수(한 번 만들고 계속 재사용)\n    private final ChatClient chatClient;\n\n    // 생성자: 스프링이 ChatClient.Builder 를 자동으로 넣어 준다(의존성 주입)\n    public ChatController(ChatClient.Builder builder) {\n        // 빌더를 build() 해서 완성된 ChatClient 를 변수에 저장한다\n        this.chatClient = builder.build();\n    }\n\n    // GET /api/chat?message=... 형태의 요청을 이 메서드가 담당한다\n    @GetMapping\n    public String chat(@RequestParam String message) {\n        // 사용자의 질문을 LLM에 보내고 답변 문자열을 받아 그대로 반환한다\n        return chatClient.prompt()   // 새 프롬프트(주문서) 작성을 시작\n                .user(message)        // 사용자 역할 메시지로 질문 내용을 채운다\n                .call()               // LLM 서버로 요청을 실제 전송한다\n                .content();           // 응답에서 텍스트 본문만 꺼내 온다\n    }\n}",
        "note": "ChatClient.Builder를 주입받아 build()로 클라이언트를 만들고, prompt-user-call-content 4단계로 답변을 얻는 가장 기본적인 채팅 API다.\n@RequestParam은 주소의 ?message= 값을 자바 변수로 받아 준다."
      }
    ]
  },
  "spring-ai-2": {
    "theory": [
      {"h": "Advisor는 요청이 지나가는 검문소", "body": "ChatClient 호출을 그냥 보내지 않고, 앞뒤로 검문소(Advisor)를 세워 공통 작업을 자동으로 처리한다고 보면 쉽다.\n예를 들어 '지난 대화 붙이기(ChatMemory)', '관련 문서 찾아 넣기(RAG)', '요청·응답 로그 남기기' 같은 일을 매번 손으로 하지 않고 Advisor에 맡긴다.\n여러 검문소는 등록한 순서대로 실행되어 하나의 파이프라인을 이룬다."},
      {"h": "ChatMemory가 없으면 금붕어 챗봇", "body": "ChatMemory를 붙이지 않으면 LLM은 바로 전 질문도 기억하지 못해 '아까 그거'라는 말을 알아듣지 못한다.\nMessageChatMemoryAdvisor를 conversationId(대화 방 번호)와 함께 붙이면, 같은 방의 이전 메시지를 자동으로 프롬프트에 실어 준다.\n이렇게 대화를 이어 주는 것이 멀티턴 대화형 서비스의 기본기다."},
      {
        "h": "왜 RAG가 필요한가",
        "body": "LLM은 학습한 시점까지의 일반 지식만 알고, 우리 회사의 내부 규정이나 최신 문서는 모른다.\n그래서 사내 정보를 물으면 그럴듯하지만 틀린 답(환각)을 만들어 내기 쉽다.\nRAG는 '시험 볼 때 정답 자료를 옆에 펼쳐 두는 오픈북 시험'에 비유할 수 있다.\n질문이 오면 먼저 관련 문서 조각을 찾아 프롬프트에 붙여 주고, LLM은 그 자료를 보고 답한다.\n덕분에 최신·내부 정보에도 정확하게 답하고, 근거 문장을 함께 제시할 수 있다."
      },
      {
        "h": "임베딩과 벡터 거리의 직관",
        "body": "임베딩은 문장을 '의미 좌표'로 바꾸는 일이라고 생각하면 쉽다.\n예를 들어 '강아지'와 '개'는 좌표가 매우 가깝고, '강아지'와 '자동차'는 멀리 떨어진다.\n그래서 질문도 벡터로 바꾸면, 질문과 가까운 문단이 곧 '관련 있는 문단'이 된다.\n이 거리를 재는 흔한 방법이 코사인 유사도인데, 방향이 비슷할수록 1에 가깝다.\nVectorStore는 이 계산을 대신해 가장 가까운 조각들을 순식간에 찾아 준다."
      },
      {
        "h": "RAG 파이프라인 두 단계",
        "body": "RAG는 크게 '미리 준비하는 단계'와 '질문에 답하는 단계'로 나뉜다.\n준비 단계에서는 문서를 읽고, 조각으로 자르고, 임베딩해서 VectorStore에 저장한다.\n이 작업은 보통 서비스 시작 시 한 번 또는 문서가 바뀔 때만 수행한다.\n질문 단계에서는 질문을 임베딩해 비슷한 조각을 찾고, 그 조각을 프롬프트에 넣어 LLM에 보낸다.\n이 두 단계를 분리해서 생각하면 RAG 코드 구조가 한결 명확해진다."
      }
    ],
    "realCode": [
      {
        "title": "문서 적재(Ingestion) + 질의응답(QnA) 서비스",
        "lang": "java",
        "code": "// 이 서비스 클래스가 속한 패키지 경로를 선언한다\npackage com.example.springai.rag;\n\n// 텍스트 파일을 읽어 Document로 만들어 주는 리더를 가져온다\nimport org.springframework.ai.reader.TextReader;\n// 긴 문서를 토큰 기준으로 잘라 주는 분할기를 가져온다\nimport org.springframework.ai.transformer.splitter.TokenTextSplitter;\n// 문서 한 조각을 표현하는 타입을 가져온다\nimport org.springframework.ai.document.Document;\n// 벡터 저장·검색을 담당하는 인터페이스를 가져온다\nimport org.springframework.ai.vectorstore.VectorStore;\n// 검색 조건(질문·top-k)을 담는 요청 객체를 가져온다\nimport org.springframework.ai.vectorstore.SearchRequest;\n// LLM에 말을 거는 ChatClient 를 가져온다\nimport org.springframework.ai.chat.client.ChatClient;\n// 클래스패스의 파일을 자원으로 읽기 위한 타입을 가져온다\nimport org.springframework.core.io.ClassPathResource;\nimport org.springframework.stereotype.Service;\nimport java.util.List;\nimport java.util.stream.Collectors;\n\n// 이 클래스가 스프링이 관리하는 서비스 빈임을 선언\n@Service\npublic class QnaService {\n\n    // 벡터 저장소(문서 벡터 보관·검색)를 담을 변수\n    private final VectorStore vectorStore;\n    // LLM 호출 도구를 담을 변수\n    private final ChatClient chatClient;\n\n    // 생성자: 두 의존성을 스프링이 자동으로 주입해 준다\n    public QnaService(VectorStore vectorStore, ChatClient.Builder builder) {\n        this.vectorStore = vectorStore;        // 주입받은 벡터 저장소 보관\n        this.chatClient = builder.build();     // 빌더로 ChatClient 완성\n    }\n\n    // [준비 단계] 문서를 읽어 조각내고 벡터로 저장한다\n    public void ingest() {\n        // resources/docs/employee_guide.txt 파일을 텍스트 리더로 연다\n        TextReader reader = new TextReader(new ClassPathResource(\"docs/employee_guide.txt\"));\n        // 파일을 읽어 Document 목록으로 만든다(아직 통째로 큰 상태)\n        List<Document> docs = reader.get();\n        // 긴 문서를 토큰 기준으로 작은 조각들로 나눈다\n        List<Document> chunks = new TokenTextSplitter().apply(docs);\n        // 나눈 조각들을 임베딩해서 벡터 저장소에 저장한다\n        vectorStore.add(chunks);\n        // 적재 결과를 콘솔에 출력한다 (결과: 적재된 조각 개수 = N)\n        System.out.println(\"적재된 조각 개수 = \" + chunks.size());\n    }\n\n    // [질문 단계] 질문을 받아 근거 기반 답변을 만든다\n    public String ask(String question) {\n        // 질문과 가장 비슷한 상위 4개 조각을 벡터 저장소에서 찾는다\n        List<Document> hits = vectorStore.similaritySearch(\n                SearchRequest.builder().query(question).topK(4).build());\n        // 찾은 조각들의 본문만 모아 하나의 '근거 텍스트'로 합친다\n        String context = hits.stream()\n                .map(Document::getText)            // 각 조각에서 본문 텍스트만 추출\n                .collect(Collectors.joining(\"\\n---\\n\")); // 구분선으로 이어 붙임\n        // 근거를 system, 질문을 user로 넣어 LLM에 답을 요청한다\n        return chatClient.prompt()\n                .system(\"아래 문서 근거만 사용해 한국어로 답하라. 없으면 모른다고 답하라.\\n\" + context)\n                .user(question)                   // 사용자의 실제 질문\n                .call()                            // LLM 호출\n                .content();                        // 답변 본문 추출\n    }\n}",
        "note": "ingest()는 '읽기→자르기→벡터 저장'의 준비 단계, ask()는 '유사검색→근거결합→LLM호출'의 질문 단계다.\nsimilaritySearch가 질문과 가까운 문단을 골라 주고, 그 근거만 쓰도록 system 메시지로 못 박아 환각을 줄인다."
      }
    ]
  },
  "spring-ai-3": {
    "theory": [
      {"h": "MCP가 필요한 이유", "body": "도구를 LLM에 붙이는 @Tool 방식은 그 앱 안에서만 쓸 수 있어 재사용이 어렵다.\nMCP는 도구를 '독립된 서버'로 빼내 표준 규격으로 노출하므로, 한 번 만든 도구 서버를 여러 AI 앱이 공유하고 팀 간에 나눠 쓸 수 있다.\n규격이 통일돼 있어 'USB처럼 꽂으면 인식'되는 것이 큰 장점이다."},
      {"h": "MCP Client + Server 그림", "body": "AI 앱은 MCP Client가 되어, 실행 중에 MCP Server에 '어떤 도구가 있니?'를 물어 목록을 받아온다.\nLLM이 그중 도구를 고르면 Client가 Server에 실행을 요청하고, Server는 실제 자바 메서드를 실행해 결과를 돌려준다.\n즉 도구의 목록 조회와 실행이 모두 표준 규격 위에서 이뤄진다."},
      {"h": "전송 방식 고르기: STDIO vs HTTP", "body": "MCP 서버가 내 PC 안에 함께 있으면 STDIO(프로세스 표준입출력)로 연결하고, 원격에 떨어져 있으면 Streamable HTTP로 연결한다.\n로컬 개발·CLI 도구는 STDIO가 간편하고, 여러 사용자가 붙는 서비스형 도구는 HTTP가 맞다."},
      {"h": "Agent는 스스로 도는 LLM", "body": "Agent는 목표를 받으면 '생각 → 도구 호출 → 결과 관찰'을 목표를 이룰 때까지 반복한다.\n단순한 작업은 Single Agent로 충분하지만, 조사·작성·검토처럼 역할 분담이 필요하면 여러 에이전트가 협업하는 Multi Agent로 설계한다.\nMCP로 표준화한 도구를 여기에 물리면, 에이전트가 팀 공용 도구를 자유롭게 갈아 끼우며 일할 수 있다."}
    ],
    "realCode": [
      {
        "title": "도구(@Tool) + 구조화 출력 + 스트리밍 컨트롤러",
        "lang": "java",
        "code": "// 이 클래스가 속한 패키지 경로를 선언한다\npackage com.example.springai.tool;\n\n// LLM 호출 도구 ChatClient 를 가져온다\nimport org.springframework.ai.chat.client.ChatClient;\n// 메서드를 LLM 도구로 등록하는 @Tool 애너테이션을 가져온다\nimport org.springframework.ai.tool.annotation.Tool;\n// 실시간 스트리밍 응답을 표현하는 리액터 타입을 가져온다\nimport reactor.core.publisher.Flux;\nimport org.springframework.web.bind.annotation.*;\n\n// 이 클래스가 HTTP 요청을 처리하는 컨트롤러임을 선언\n@RestController\n@RequestMapping(\"/api\")\npublic class ToolController {\n\n    // LLM 호출 도구를 담을 변수\n    private final ChatClient chatClient;\n\n    // 생성자: ChatClient.Builder 를 주입받아 클라이언트를 만든다\n    public ToolController(ChatClient.Builder builder) {\n        this.chatClient = builder.build();     // 빌더로 ChatClient 완성\n    }\n\n    // LLM이 호출할 수 있는 도구(함수). description 이 사용 설명서 역할\n    @Tool(description = \"특정 도시의 현재 날씨를 조회한다\")\n    public String getWeather(String city) {\n        // 실제로는 외부 날씨 API를 부르지만, 예제는 고정값을 돌려준다\n        return city + \"은(는) 맑음, 기온 26도\";\n    }\n\n    // 구조화 출력을 담을 데이터 그릇(자바 record)\n    public record WeatherReport(String city, int temperature, String sky) {}\n\n    // [도구 호출] GET /api/tool?message=... — LLM이 필요시 getWeather 호출\n    @GetMapping(\"/tool\")\n    public String tool(@RequestParam String message) {\n        try {                                   // 일시적 오류에 대비해 감싼다\n            return chatClient.prompt()          // 프롬프트 작성 시작\n                    .user(message)              // 사용자 질문 넣기\n                    .tools(this)                // this 안의 @Tool 메서드를 도구로 등록\n                    .call()                     // LLM 호출(필요시 도구 자동 실행)\n                    .content();                 // 최종 답변 텍스트 추출\n        } catch (Exception e) {                 // 호출 실패 시\n            return \"일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.\"; // 친화 메시지\n        }\n    }\n\n    // [구조화 출력] GET /api/report?message=... — 답을 객체로 받는다\n    @GetMapping(\"/report\")\n    public WeatherReport report(@RequestParam String message) {\n        return chatClient.prompt()              // 프롬프트 작성 시작\n                .user(message)                  // 사용자 질문\n                .tools(this)                    // 날씨 도구 등록\n                .call()                         // LLM 호출\n                .entity(WeatherReport.class);   // 답을 WeatherReport 객체로 변환\n    }\n\n    // [스트리밍] GET /api/stream?message=... — 글자를 실시간으로 흘려보낸다\n    @GetMapping(\"/stream\")\n    public Flux<String> stream(@RequestParam String message) {\n        return chatClient.prompt()              // 프롬프트 작성 시작\n                .user(message)                  // 사용자 질문\n                .stream()                       // 한꺼번에 말고 조각으로 받기\n                .content();                     // 생성되는 텍스트 조각을 순차 전달\n    }\n}",
        "note": "@Tool 메서드를 .tools(this)로 넘기면 LLM이 필요할 때 스스로 호출한다.\n.entity(클래스)는 답을 자바 객체로, .stream().content()는 토큰을 실시간으로 받아 준다.\ntry-catch로 일시적 실패를 사용자 친화 메시지로 바꾸는 것이 서비스 통합의 기본기다."
      },
      {
        "title": "MCP Server 만들기: @Tool 메서드를 표준 규격으로 외부에 노출",
        "lang": "java",
        "code": "// build.gradle 의존성: 'org.springframework.ai:spring-ai-starter-mcp-server'\npackage com.example.mcp;\n\nimport org.springframework.ai.tool.annotation.Tool;\nimport org.springframework.ai.tool.ToolCallbackProvider;\nimport org.springframework.ai.tool.method.MethodToolCallbackProvider;\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.stereotype.Service;\n\n// [도구 정의] 이 서비스의 메서드들이 MCP 도구로 노출된다\n@Service\nclass EmployeeService {\n    // @Tool 이 붙은 메서드가 곧 외부에 공개되는 도구다(description 이 사용 설명서)\n    @Tool(description = \"사번으로 사원 정보를 조회한다\")\n    public String findEmployee(String empNo) {\n        // 실제로는 DB를 조회한다(예제는 고정값 반환)\n        return empNo + \"번 사원: 홍길동, 개발팀\";\n    }\n}\n\n// [도구 등록] @Tool 메서드들을 ToolCallbackProvider 빈으로 등록해야 MCP가 인식한다\n@Configuration\nclass McpToolConfig {\n    @Bean\n    ToolCallbackProvider employeeTools(EmployeeService service) {\n        // service 안의 @Tool 메서드 전부를 도구 목록으로 묶어 노출한다\n        return MethodToolCallbackProvider.builder().toolObjects(service).build();\n    }\n}\n\n// ===== application.yml (전송 방식 설정) =====\n// spring:\n//   ai:\n//     mcp:\n//       server:\n//         name: skala-mcp-server   # 서버 이름(전송 설정)\n//         # 로컬이면 STDIO, 원격이면 HTTP 전송을 지정한다\n\n// ===== 반대편 클라이언트 앱 =====\n// 의존성 'spring-ai-starter-mcp-client' 를 추가하고, 아래처럼 원격 도구를 붙인다:\n// ChatClient.prompt().toolCallbacks(mcpTools).user(question).call().content();\n// 그러면 LLM이 이 서버의 도구(findEmployee)를 필요할 때 호출한다",
        "note": "@Tool 메서드를 ToolCallbackProvider 빈으로 등록하면 그 메서드가 MCP 도구로 외부에 노출된다.\n전송 방식은 application.yml에서 STDIO(로컬)/HTTP(원격) 중 고르고, 클라이언트는 spring-ai-starter-mcp-client로 이 서버를 붙인다."
      }
    ]
  },
  "sllm-1": {
    "theory": [
      {"h": "sLLM·PEFT 요즘 흐름 - 작은 모델이 뜨는 이유", "body": "예전엔 '무조건 큰 모델이 이긴다'는 분위기였지만, 요즘은 방향이 갈렸다.\n큰 모델은 API로 어려운 일을 맡기고, 반복적이고 보안이 중요한 일은 잘 다듬은 작은 모델에 맡기는 '역할 분담'이 대세가 되고 있다.\n\n그 배경에는 세 흐름이 있다.\n첫째, 휴대폰·노트북·사내 서버에서 돌리려는 수요가 커지며 2B~8B급 소형 모델(Llama·Qwen·Gemma·Phi 계열)이 매년 빠르게 똑똑해지고 있다.\n둘째, 큰 모델의 답과 추론 과정을 작은 모델에 베껴 넣는 '증류(distillation)'로 작은 모델의 실력이 크게 올랐다.\n셋째, 파인튜닝에서는 메모리를 극단적으로 아끼는 QLoRA가 표준이 됐고, 이후에도 LoRA를 개선한 변형과 학습을 몇 배 빠르게 해 주는 도구들이 계속 나온다.\n\n현장의 결론은 분명하다 — '가장 큰 모델'이 아니라 '내 문제에 딱 맞게 튜닝한 가장 작은 모델'을 찾는 것이 비용·속도·보안 모두에서 이득이다."},
      {
        "h": "sLLM은 '경차'다 — 작아도 충분히 일한다",
        "body": "거대한 LLM을 슈퍼컴퓨터급 대형 트럭이라고 하면, sLLM은 좁은 골목까지 다니는 경차다.\n트럭은 짐을 많이 싣지만 주차장도 기름값도 부담이고, 경차는 짐은 적게 싣지만 어디든 쉽게 다닌다.\nsLLM도 마찬가지여서, 아주 어려운 추론은 큰 모델보다 약하지만 요약·분류·간단한 챗봇 같은 일상 업무는 충분히 해낸다.\n\n작다는 것의 진짜 장점은 '내 컴퓨터에서 돈다'는 점이다.\n회사 기밀 문서를 외부 서버에 안 보내고 처리할 수 있고, 인터넷이 없어도 동작하며, 호출할 때마다 돈이 나가지 않는다.\n그래서 실무에서는 '모든 일을 큰 모델에 맡기지 말고, 가벼운 일은 sLLM에 맡기자'는 흐름이 점점 커지고 있다."
      },
      {
        "h": "오픈소스 모델 생태계 — 누구나 받아서 고칠 수 있다",
        "body": "예전에는 똑똑한 LLM은 회사 서버 안에만 있고 우리는 API로 빌려 쓰기만 했다.\n지금은 Meta의 Llama, 알리바바의 Qwen, 구글의 Gemma처럼 모델의 '속'을 통째로 공개한 오픈소스 모델이 많아졌다.\n공개된 모델은 Hugging Face라는 '모델 앱스토어' 같은 사이트에서 내려받아 바로 쓸 수 있다.\n\n오픈소스라서 좋은 점은 자유롭게 고칠 수 있다는 것이다.\n내 회사 말투, 내 업무 데이터에 맞게 뒤에서 배울 LoRA로 살짝 다듬으면 '우리 회사 전용 비서'를 만들 수 있다.\n이번 과정의 목표가 바로 이 '내 것으로 만들기'의 첫걸음이다."
      },
      {
        "h": "양자화 — 큰 모델을 작은 가방에 욱여넣기",
        "body": "모델은 수십억 개의 숫자(가중치)로 되어 있고, 원래는 각 숫자를 아주 정밀한 소수(32비트)로 저장한다.\n양자화는 이 정밀한 소수를 더 거친 정수(예: 4비트)로 바꿔 저장하는 기술이다.\n고화질 사진을 용량 작은 압축본으로 바꾸면 약간 흐려지지만 알아보는 데는 문제없는 것과 똑같다.\n\n4비트로 양자화하면 모델 용량이 대략 4분의 1로 줄어 노트북 메모리에도 들어간다.\n품질은 조금 떨어지지만 대부분의 업무에서는 차이를 느끼기 어려울 정도다.\n그래서 '로컬에서 LLM 돌리기'는 거의 항상 양자화와 함께 간다."
      },
      {"h": "MLM vs CLM, 그리고 보안이라는 이유", "body": "언어모델은 크게 두 방식으로 학습한다. MLM(BERT식)은 문장 가운데를 가리고 '빈칸 맞히기'를 시켜 문맥 이해에 강해지고, CLM(GPT식)은 왼쪽부터 '다음 단어 맞히기'를 시켜 글 생성에 강해진다.\n우리가 쓰는 sLLM은 대부분 CLM 계열이다.\n\nsLLM을 굳이 내 컴퓨터에서 돌리는 데는 '보안'이라는 분명한 이유가 있다.\nDBMS 기록·영업비밀·개인정보처럼 밖으로 내보내면 안 되는 데이터를 다룰 때, 클라우드 LLM에 보내는 대신 로컬 sLLM으로 처리하면 데이터가 회사 안에 머문다.\n작아서 성능이 조금 낮더라도, '데이터가 새지 않는다'는 가치가 더 큰 업무가 많다."}
    ],
    "realCode": [
      {
        "title": "로컬 Ollama 모델과 대화하는 미니 챗봇 (chat.py)",
        "lang": "python",
        "code": "import requests          # HTTP 요청을 보내는 라이브러리(로컬 모델 서버에 말을 건다)\nimport json              # 모델이 한 줄씩 보내주는 JSON 응답을 해석하기 위해 사용\n\nURL = \"http://localhost:11434/api/chat\"   # Ollama가 켜지면 이 주소로 채팅 요청을 받는다\nMODEL = \"qwen2.5:0.5b\"                       # 미리 pull 해 둔 아주 작은 모델 이름\n\n# system 메시지로 모델의 '역할·말투'를 고정한다(대화 내내 유지됨)\nmessages = [\n    {\"role\": \"system\", \"content\": \"너는 친절한 한국어 비서야. 짧고 쉽게 답해줘.\"}\n]\n\ndef ask(question):                          # 질문 한 번을 보내고 답을 받아오는 함수\n    messages.append({\"role\": \"user\", \"content\": question})  # 사용자 질문을 대화에 추가\n    payload = {                             # 모델 서버에 보낼 요청 내용을 만든다\n        \"model\": MODEL,                     # 어떤 모델을 쓸지 지정\n        \"messages\": messages,               # 지금까지의 전체 대화(기억 역할)\n        \"stream\": False,                    # True면 한 글자씩, False면 완성된 답을 한 번에 받음\n        \"options\": {\"temperature\": 0.2}     # 0에 가까울수록 일관되고 차분한 답을 함\n    }\n    res = requests.post(URL, json=payload)  # 로컬 모델 서버에 POST 요청을 보낸다\n    answer = res.json()[\"message\"][\"content\"]  # 응답 JSON에서 모델이 쓴 글만 꺼낸다\n    messages.append({\"role\": \"assistant\", \"content\": answer})  # 답도 대화에 저장(다음 질문이 맥락 기억)\n    return answer                           # 답변 문자열을 돌려준다\n\nif __name__ == \"__main__\":                  # 이 파일을 직접 실행했을 때만 아래가 돈다\n    reply = ask(\"파이썬으로 1부터 10까지 더하는 법 알려줘\")  # 첫 질문을 던진다\n    print(\"모델 답변:\", reply)              # 결과: 한국어 설명 + 짧은 파이썬 코드가 출력됨\n    with open(\"result.txt\", \"w\", encoding=\"utf-8\") as f:  # 대화 결과를 파일로 저장 준비\n        f.write(reply)                      # 모델 답변을 result.txt에 기록(증빙용)",
        "note": "Ollama가 켜진 상태에서 'python chat.py'만 실행하면 인터넷 없이 내 컴퓨터의 모델과 대화하고, 그 결과를 result.txt로 남긴다.\nsystem 메시지로 말투를 고정하고 messages 리스트로 대화를 기억시키는 것이 핵심이다."
      }
    ]
  },
  "sllm-2": {
    "theory": [
      {
        "h": "파인튜닝은 '신입 재교육'이다",
        "body": "이미 한국어와 상식을 두루 아는 똑똑한 신입사원이 들어왔다고 생각해 보자.\n이 신입은 일반 지식은 풍부하지만 우리 회사의 용어·규정·말투는 아직 모른다.\n파인튜닝은 바로 이 신입을 우리 회사 사례로 며칠 더 교육해 '우리식으로' 답하게 만드는 과정이다.\n\n그래서 파인튜닝은 모델에게 새 지식을 통째로 주입하는 것이 아니라, 이미 아는 것을 '우리 방식'으로 정렬하는 데 강하다.\n말투를 통일하거나, 정해진 형식(JSON 등)으로 답하게 하거나, 특정 도메인 질문에 일관되게 답하게 할 때 효과가 크다.\n반대로 최신 사실을 알려주는 일은 파인튜닝보다 RAG(검색 붙이기)가 더 잘 맞는다는 점도 함께 기억하자."
      },
      {
        "h": "LoRA — 책에 포스트잇만 붙이기",
        "body": "두꺼운 전공책 전체를 내 마음대로 다시 쓰려면 시간도 종이도 엄청나게 든다.\nLoRA는 책 본문은 그대로 두고, 필요한 곳에 작은 포스트잇(보조 행렬)만 붙여 내용을 보완하는 방식이다.\n모델의 거대한 가중치는 그대로 얼려 두고, 그 옆에 끼우는 작은 행렬 두 개만 새로 학습하기 때문이다.\n\n이렇게 하면 학습해야 할 숫자가 전체의 1% 미만으로 줄어 메모리와 시간이 크게 절약된다.\n게다가 배운 결과가 수십 MB짜리 '어댑터' 파일로만 나와서, 본체에 끼웠다 뺐다 하며 여러 버전을 쉽게 관리할 수 있다.\nQLoRA는 여기에 더해 본체를 4비트로 압축해 불러오므로, 무료 Colab GPU에서도 작은 모델 파인튜닝이 가능해진다."
      },
      {
        "h": "잘 배웠는지 확인하기 — loss와 눈으로 보는 검증",
        "body": "학습 중에는 loss라는 점수를 본다.\nloss는 모델의 답이 정답에서 얼마나 벗어났는지를 나타내며, 학습이 잘 되면 이 숫자가 계단을 내려가듯 점점 작아진다.\n다만 loss가 줄었다고 무조건 좋은 것은 아니어서, 학습 데이터만 통째로 외워버리는 '과적합'도 조심해야 한다.\n\n그래서 숫자만 믿지 말고 사람이 직접 물어보는 검증을 함께 한다.\n학습 전 모델과 학습 후 모델에 같은 질문을 던져 답변이 의도대로 바뀌었는지 눈으로 비교하는 것이다.\n이 '전·후 비교'가 파인튜닝이 성공했는지 가장 직관적으로 확인하는 방법이다."
      },
      {"h": "PEFT 삼형제 — 상황에 맞게 고른다", "body": "전체를 다시 가르치지 않고 작은 부품만 학습하는 PEFT에도 여러 방식이 있다.\nLoRA(와 4비트로 더 가볍게 하는 QLoRA)는 도메인 지식을 넉넉히 주입할 때 두루 강해 가장 많이 쓴다.\nAdapter는 작업마다 부품을 갈아 끼우고 싶을 때 좋고, Prefix/Prompt Tuning은 모델은 그대로 두고 입력 앞에 학습된 '가상 토큰'만 붙이는 초경량 방식이라 자원이 아주 적을 때 유리하다.\n\n정하는 기준은 간단하다: 지식을 많이 넣어야 하면 LoRA, 여러 작업을 전환해야 하면 Adapter, 극소 자원이면 Prefix.\n그리고 파인튜닝한 sLLM에 임베딩·Vector DB(RAG)를 연결하면, 사내 문서를 근거로 답하는 실제 서비스가 된다."}
    ],
    "realCode": [
      {
        "title": "QLoRA로 작은 모델 파인튜닝하기 (train_lora.py)",
        "lang": "python",
        "code": "import torch                                   # 딥러닝 연산을 담당하는 핵심 라이브러리\nfrom datasets import load_dataset              # 학습 데이터를 불러오는 도구\nfrom transformers import (AutoModelForCausalLM,  # 사전학습 언어모델을 불러오는 클래스\n                          AutoTokenizer,         # 문장을 토큰(숫자)으로 바꾸는 도구\n                          BitsAndBytesConfig,    # 4비트 양자화 설정용\n                          TrainingArguments)     # 학습 옵션(에폭·배치 등) 설정용\nfrom peft import LoraConfig, get_peft_model     # LoRA 어댑터를 모델에 붙이는 도구\nfrom trl import SFTConfig, SFTTrainer                       # 지시학습(SFT)을 쉽게 해주는 학습기\n\nMODEL = \"Qwen/Qwen2.5-0.5B\"                      # 파인튜닝할 작은 베이스 모델\n\n# 베이스 모델을 4비트로 양자화해 메모리를 아끼는 설정(QLoRA의 핵심)\nbnb = BitsAndBytesConfig(load_in_4bit=True,            # 4비트로 불러오기 켜기\n                         bnb_4bit_compute_dtype=torch.float16)  # 계산은 16비트로\n\ntok = AutoTokenizer.from_pretrained(MODEL)      # 모델에 맞는 토크나이저 불러오기\ntok.pad_token = tok.eos_token                   # 빈자리 채움 토큰을 문장끝 토큰으로 지정\n\nmodel = AutoModelForCausalLM.from_pretrained(   # 양자화 설정을 적용해 모델 불러오기\n    MODEL, quantization_config=bnb, device_map=\"auto\")  # GPU에 자동 배치\n\n# LoRA 설정: r은 보조 행렬 크기, 어떤 층에 붙일지 지정\nlora = LoraConfig(r=8, lora_alpha=16,           # r=8 작은 보조 행렬, alpha는 학습 강도\n                  target_modules=[\"q_proj\", \"v_proj\"],  # 어텐션의 Q·V 부분에만 부착\n                  lora_dropout=0.05, task_type=\"CAUSAL_LM\")  # 과적합 방지 드롭아웃\nmodel = get_peft_model(model, lora)             # 베이스 모델에 LoRA 어댑터를 끼운다\n\nds = load_dataset(\"json\", data_files=\"data.jsonl\")[\"train\"]  # 내 학습 데이터 불러오기\n\nargs = SFTConfig(output_dir=\"out\",       # 결과 저장 폴더\n                         num_train_epochs=3,      # 데이터를 3번 반복 학습\n                         per_device_train_batch_size=2,  # 한 번에 2개씩 학습\n                         learning_rate=2e-4,      # 학습 속도(LoRA는 보통 큰 편)\n                         logging_steps=5, dataset_text_field=\"text\")  # text 열 지정·5스텝마다 loss\n\ntrainer = SFTTrainer(model=model, train_dataset=ds,  # 모델·데이터 연결\n                     args=args)  # dataset_text_field는 SFTConfig로 이동(TRL 1.x)\ntrainer.train()                                  # 학습 시작(loss가 줄어드는 로그가 나옴)\n\nmodel.save_pretrained(\"my-lora\")                 # 학습된 LoRA 어댑터만 저장(수십 MB)\nprint(\"학습 완료! my-lora 폴더에 어댑터 저장됨\")  # 결과: 완료 메시지 출력",
        "note": "베이스 모델은 4비트로 얼려 두고 q_proj·v_proj에 붙인 작은 LoRA만 학습하므로 무료 GPU에서도 돌아간다.\n학습이 끝나면 본체가 아니라 가벼운 어댑터(my-lora)만 저장되는 것이 LoRA의 가장 큰 장점이다."
      }
    ]
  },
  "ml-dl-1": {
    "theory": [
      {"h": "단일 모델을 넘어 여럿이 힘을 합치면: 앙상블", "body": "결정트리 한 그루는 데이터를 조금만 바꿔도 결과가 출렁이고 과적합에 약하다.\n이를 극복하는 두 갈래가 앙상블이다.\n첫째, 배깅 계열(랜덤포레스트)은 데이터와 피처를 조금씩 다르게 뽑아 만든 여러 트리에게 각자 판단하게 한 뒤 다수결로 합쳐, 개별 트리의 실수를 서로 상쇄한다.\n둘째, 부스팅 계열은 모델을 순차적으로 이어 붙이되 '앞 모델이 특히 많이 틀린 데이터'에 다음 모델이 더 집중하게 해서 약점을 차례로 메운다.\n\n표 형식(정형) 데이터에서는 XGBoost·LightGBM 같은 부스팅이 딥러닝보다 더 좋은 성능을 내는 경우가 많다는 점도 기억해 두자."},
      {"h": "과적합을 수식으로 억누르기: 규제(Lasso·Ridge)", "body": "선형 모델이 학습 데이터에 지나치게 맞추려 하면 특정 가중치가 폭주하듯 커진다.\n규제는 손실 함수에 '가중치가 클수록 벌점'이라는 항을 더해 이를 막는다.\nRidge(L2)는 가중치 제곱합에 벌점을 줘 전체를 부드럽게 줄이고, Lasso(L1)는 절댓값합에 벌점을 줘 쓸모없는 피처의 가중치를 아예 0으로 만들어 '자동 변수 선택' 효과를 낸다.\n\n벌점의 세기(alpha/lambda)가 하이퍼파라미터인데, 너무 크면 과소적합, 너무 작으면 과적합이 되므로 균형을 잡는 감각이 필요하다."},
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
      {"h": "보폭과 정규화로 학습을 안정시키기", "body": "경사하강법은 손실이 줄어드는 방향으로 가중치를 옮기는데, 그 한 걸음의 크기가 학습률이다.\n학습률이 크면 골짜기 바닥을 계속 지나쳐 손실이 출렁이거나 폭발하고, 작으면 수백 에폭을 돌려도 바닥에 못 닿는다. 그래서 적당한 값을 찾거나, 학습이 진행될수록 보폭을 줄이는 스케줄을 쓴다.\n\n한편 깊은 신경망은 층을 지날수록 값의 분포가 제멋대로 커지거나 작아져 학습이 불안정해진다.\n배치 정규화는 각 층의 입력을 미니배치마다 표준화해 이 흔들림을 잡아 준다. 덕분에 더 큰 학습률을 써도 안정적으로 수렴하고 과적합도 약간 줄어든다."},
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
        "body": "딥러닝 아키텍처는 데이터의 생김새에 맞춰 골라야 한다.\n이미지는 옆 픽셀끼리 관계가 중요하므로, 작은 필터로 주변을 훑는 CNN 이 잘 맞는다.\n문장이나 주가처럼 순서가 중요한 데이터는 앞을 기억하며 읽는 RNN/LSTM, 또는 핵심에 집중하는 Transformer 가 적합하다.\n\n즉 망치 하나로 모든 못을 박는 게 아니라, 못의 종류에 따라 연장을 바꾸는 것과 같다.\n문제에 맞는 구조를 고르는 안목이 딥러닝의 절반이다.\n\n실라버스가 정리하듯 아키텍처는 데이터 종류로 나눠 이해하면 쉽다 — 이미지는 CNN(옆 픽셀 관계를 필터로 포착), 시계열·순서 데이터는 RNN/LSTM(앞을 기억), 자연어는 Transformer(모든 토큰이 서로 참고)다.\n특히 Transformer는 자연어를 넘어 이미지·음성 생성까지 확장되며 '생성형 AI의 공통 기반'이 되었고, 이 점이 뒤에 이어지는 LLM·Transformer 과목으로 연결된다."
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
      {"h": "가공 전에 먼저 데이터와 친해진다 - 탐색적 분석(EDA)", "body": "피처를 손질하기 전에 데이터가 어떻게 생겼는지부터 봐야 한다.\n각 열이 숫자인지 범주인지(변수 유형)를 구분하고, 히스토그램으로 분포가 한쪽으로 쏠렸는지, 결측·이상치가 어디에 얼마나 있는지 확인한다.\n이어서 상관관계 히트맵으로 서로 비슷하게 움직이는 열(중복 후보)을 찾고, 예측 대상(타깃)과 각 피처의 관계를 그려 어떤 피처가 답과 관련 있어 보이는지 감을 잡는다.\n\n이렇게 얻은 감이 '어떤 결측을 어떻게 채울지, 어떤 파생 피처를 만들지'를 결정한다.\nEDA를 건너뛰고 바로 가공하면 엉뚱한 처리로 오히려 성능을 깎을 수 있다."},
      {"h": "쓸 피처만 남기는 세 가지 방법 - 필터·래퍼·임베디드", "body": "피처가 많다고 항상 좋은 게 아니다. 중복되거나 잡음인 피처는 모델을 느리게 하고 과적합을 키운다.\n변수 선택에는 크게 세 갈래가 있다.\n필터(Filter)는 모델과 무관하게 통계로 미리 거른다 — 타깃과의 상관·분산이 거의 없는 열, 카이제곱 점수가 낮은 열을 쳐낸다. 빠르지만 피처 간 조합 효과는 못 본다.\n래퍼(Wrapper)는 실제 모델을 여러 번 돌려 성능이 오르는 조합을 찾는다 — RFE처럼 하나씩 빼 보며 고른다. 정확하지만 느리다.\n임베디드(Embedded)는 모델이 학습하며 스스로 고른다 — Lasso는 쓸모없는 피처의 계수를 0으로 만들고, 트리 모델은 feature_importances_로 중요도를 매긴다.\n\n실무에서는 필터로 크게 줄이고 임베디드로 다듬는 식으로 섞어 쓴다."},
      {"h": "전처리는 반드시 학습 데이터에만 맞춘다 - 데이터 누수 막기", "body": "스케일링의 평균·표준편차, 인코딩의 범주 목록, 결측 대치의 중앙값 같은 '기준값'을 전체 데이터에서 구하면, 테스트 데이터 정보가 학습에 몰래 새어 든다(데이터 누수).\n그러면 실제보다 점수가 부풀려지고 진짜 새 데이터에서 성능이 뚝 떨어진다.\n그래서 기준값은 train에서만 fit으로 구하고, test에는 그 기준을 transform으로 적용만 한다.\n\n특히 타깃 인코딩(범주를 타깃 평균으로 치환)은 타깃을 직접 쓰므로 누수에 가장 취약하다 — 교차검증 폴드 안에서만 평균을 내거나 스무딩을 걸어야 한다.\nsklearn의 Pipeline + ColumnTransformer를 쓰면 이 fit/transform 분리가 자동으로 지켜진다."},
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
      {"h": "정확도만 믿으면 안 되는 이유 - 혼동 행렬 읽기", "body": "정답이 한쪽으로 쏠린 데이터(예: 정상 99% vs 불량 1%)에서는 무조건 '정상'만 찍어도 정확도 99%가 나오지만, 정작 잡아야 할 불량은 하나도 못 잡는다.\n그래서 혼동 행렬로 예측을 네 칸(TP·FP·FN·TN)으로 쪼개 본다.\n여기서 정밀도('맞다고 한 것 중 진짜')와 재현율('진짜 중 찾아낸 것')이 나오는데, 둘은 보통 한쪽을 올리면 다른 쪽이 내려가는 시소 관계다.\n헛알람이 싫으면 정밀도, 놓치는 게 싫으면 재현율을 우선하고, 둘 다 중요하면 F1을 본다.\n\n임계값(몇 % 이상이면 양성으로 볼지)을 바꾸면 정밀도·재현율이 함께 움직이는데, 이 전체 성능을 한 숫자로 요약한 것이 ROC-AUC다.\n회귀에서는 정답이 숫자이므로 '평균적으로 얼마나 빗나갔나'를 MAE·RMSE로, '얼마나 잘 설명하나'를 R²로 본다."},
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
      {"h": "모델은 배포가 끝이 아니다 - MLOps와 Drift 대응", "body": "실험실에서 아무리 좋은 점수를 낸 모델도 운영에 올리는 순간부터 성능이 서서히 낡는다.\n이유는 두 가지 Drift다. 데이터 드리프트는 입력 분포가 변하는 것(고객·계절·시장 변화)이고, 컨셉 드리프트는 입력과 정답의 관계 자체가 변하는 것이다.\n\n그래서 MLOps에서는 (1) 운영 중 성능과 입력 분포를 대시보드로 모니터링하고, (2) 성능이 기준선 아래로 떨어지거나 분포 차이가 커지면 알림을 띄우며, (3) 최신 데이터로 재학습→검증→무중단 배포하는 자동 순환을 만든다.\n재학습 주기는 '정기(예: 매주)'와 '트리거 기반(성능·드리프트 감지 시)'을 섞어 쓴다.\n결국 모델 성능 최적화는 튜닝 한 번으로 끝나는 게 아니라, 운영 내내 감시하고 되살리는 지속 과정이다."},
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
      {"h": "RAG를 꼭 써야 할까? - 도입 판단 기준", "body": "예전엔 모델 입력 길이가 짧아 외부 문서를 넣으려면 RAG가 거의 유일한 답이었다.\n지금은 입력창(컨텍스트)이 크게 늘고 파인튜닝도 쉬워져, '이 문제에 정말 RAG가 맞나'를 먼저 따져야 한다.\n\n세 갈래로 생각하면 쉽다.\n(1) 자료가 자주 바뀌고 양이 많고 출처를 제시해야 한다 → RAG.\n(2) 지식보다 말투·출력 형식·도메인 일관성을 바꾸고 싶다 → 파인튜닝.\n(3) 참고 문서가 몇 장뿐이고 거의 안 바뀐다 → 그냥 프롬프트에 통째로 넣기(Long-context).\n\n실무에선 파인튜닝으로 말투를 잡고 RAG로 최신 근거를 붙이는 식으로 함께 쓰는 경우가 많다.\n이 판단을 건너뛰면 필요 없는 곳에 무거운 파이프라인을 까는 낭비가 생긴다."},
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
        "code": "# 필요한 라이브러리들을 불러온다(설치: pip install langchain langchain-chroma langchain-community langchain-openai chromadb pypdf)\nfrom langchain_community.document_loaders import PyPDFLoader  # PDF 파일을 읽어 문서 객체로 만들어 주는 도구\nfrom langchain_text_splitters import RecursiveCharacterTextSplitter  # 긴 글을 똑똑하게 잘라 주는 도구\nfrom langchain_openai import OpenAIEmbeddings  # 문장을 숫자 벡터로 바꿔 주는 OpenAI 임베딩 모델\nfrom langchain_chroma import Chroma  # 벡터를 저장하고 검색해 주는 가벼운 벡터 DB\n\n# 1) 문서 로딩: docs 폴더의 PDF 파일 경로를 지정해 로더를 만든다\nloader = PyPDFLoader(\"docs/company_policy.pdf\")  # 괄호 안 인자는 읽어올 PDF의 파일 경로\npages = loader.load()  # 실제로 PDF를 읽어 페이지별 문서 리스트로 반환\nprint(f\"총 {len(pages)}페이지 로드\")  # 결과: 총 12페이지 로드\n\n# 2) 청킹: 한 조각 500자, 조각끼리 50자 겹치게 설정해 분할기를 만든다\nsplitter = RecursiveCharacterTextSplitter(\n    chunk_size=500,    # 한 조각의 최대 글자 수(너무 크면 검색이 뭉뚱그려진다)\n    chunk_overlap=50,  # 앞뒤 조각이 50자 겹치게 해 문맥이 끊기지 않도록 한다\n)\nchunks = splitter.split_documents(pages)  # 페이지들을 받아 작은 조각 리스트로 자른다\nprint(f\"조각 {len(chunks)}개 생성\")  # 결과: 조각 37개 생성\n\n# 3) 임베딩 + 색인: 각 조각을 벡터로 바꿔 Chroma DB에 저장한다\nembeddings = OpenAIEmbeddings(model=\"text-embedding-3-small\")  # 사용할 임베딩 모델 이름 지정\nvectordb = Chroma.from_documents(\n    documents=chunks,                 # 벡터로 만들 문서 조각들\n    embedding=embeddings,             # 변환에 쓸 임베딩 모델\n    persist_directory=\"chroma_db\",    # 벡터를 디스크에 저장할 폴더 이름\n)\nprint(\"인덱싱 완료, chroma_db 폴더에 저장됨\")  # 결과: 인덱싱 완료, chroma_db 폴더에 저장됨\n\n# 4) 확인: 저장된 인덱스에 질문을 던져 비슷한 조각 3개를 찾아본다\nresults = vectordb.similarity_search(\"환불 규정은 어떻게 되나요?\", k=3)  # k=3은 가장 가까운 3개를 의미\nfor i, doc in enumerate(results, start=1):  # 찾은 조각을 1번부터 번호 매겨 반복\n    print(f\"[{i}] {doc.page_content[:80]}\")  # 각 조각의 앞 80자만 미리보기로 출력",
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
        "code": "# 어제 만든 벡터 인덱스를 다시 열어 질의응답 체인을 만든다\nfrom langchain_chroma import Chroma  # 벡터 DB\nfrom langchain_openai import OpenAIEmbeddings, ChatOpenAI  # 임베딩 모델과 대화형 LLM\nfrom langchain_core.prompts import ChatPromptTemplate  # 프롬프트 틀을 만드는 도구\nfrom langchain_core.output_parsers import StrOutputParser  # LLM 출력을 문자열로 깔끔히 뽑는 파서\nfrom langchain_core.runnables import RunnablePassthrough  # 입력을 그대로 흘려보내는 부품\n\n# 1) 어제 저장한 인덱스를 같은 임베딩 모델로 다시 연다\nembeddings = OpenAIEmbeddings(model=\"text-embedding-3-small\")  # 색인할 때와 같은 모델이어야 한다\nvectordb = Chroma(persist_directory=\"chroma_db\", embedding_function=embeddings)  # 저장 폴더를 지정해 로드\nretriever = vectordb.as_retriever(search_kwargs={\"k\": 4})  # 가장 비슷한 4개를 가져오는 리트리버\n\n# 2) 가져온 조각들을 하나의 문자열로 합치는 함수(출처도 함께 표기)\ndef format_docs(docs):  # docs는 검색으로 찾은 문서 조각 리스트\n    lines = []  # 조각 내용을 모을 빈 리스트\n    for d in docs:  # 각 조각을 하나씩 돌면서\n        src = d.metadata.get(\"source\", \"?\")  # 조각이 어느 파일에서 왔는지 출처를 꺼낸다\n        page = d.metadata.get(\"page\", \"?\")  # 몇 페이지에서 왔는지 꺼낸다\n        lines.append(f\"[{src} p.{page}] {d.page_content}\")  # 출처를 앞에 붙여 합친다\n    return \"\\n\\n\".join(lines)  # 조각들을 빈 줄로 구분해 하나의 글로 만든다\n\n# 3) LLM에게 줄 지시문(프롬프트) 틀을 만든다\nprompt = ChatPromptTemplate.from_template(\n    \"아래 컨텍스트만 근거로 한국어로 답하세요. 근거가 없으면 '모른다'고 답하세요.\\n\\n\"\n    \"[컨텍스트]\\n{context}\\n\\n[질문]\\n{question}\"  # {context}와 {question} 자리에 실제 값이 채워진다\n)\nllm = ChatOpenAI(model=\"gpt-4o-mini\", temperature=0)  # temperature=0은 매번 일관된 답을 내게 한다\n\n# 4) 검색→프롬프트→LLM→문자열 순서로 부품을 파이프(|)로 연결한다\nchain = (\n    {\"context\": retriever | format_docs, \"question\": RunnablePassthrough()}  # 질문은 검색에도, 그대로도 전달\n    | prompt        # 위 값들을 프롬프트 틀에 채워 넣고\n    | llm           # 완성된 프롬프트를 LLM에 보내 답을 받고\n    | StrOutputParser()  # 답에서 순수 텍스트만 뽑아낸다\n)\n\n# 5) 실제로 질문을 던져 답을 확인한다\nanswer = chain.invoke(\"연차 휴가는 며칠인가요?\")  # 괄호 안 문자열이 사용자의 질문\nprint(answer)  # 결과: 문서 근거에 기반한 답변 문장이 출력됨\n\n# 6) 답의 근거가 된 출처도 따로 보여 준다\nfor d in retriever.invoke(\"연차 휴가는 며칠인가요?\"):  # 같은 질문으로 근거 조각을 다시 가져와\n    print(\"출처:\", d.metadata.get(\"source\"), \"p.\", d.metadata.get(\"page\"))  # 파일명과 페이지 출력",
        "note": "리트리버·프롬프트·LLM을 LCEL 파이프로 한 줄에 엮어 출처까지 보여 주는 RAG QA의 완성형이다.\ntemperature=0과 '모르면 모른다' 지시가 환각을 줄이는 핵심 장치다."
      }
    ]
  },
  "rag-3": {
    "theory": [
      {
        "h": "Agentic RAG — 한 번 검색으로 끝내지 않는다",
        "body": "기본(Naive) RAG는 '검색 한 번 → 생성 한 번'이다.\n그런데 질문이 애매하거나 검색이 빗나가면, 나쁜 근거를 붙잡고 나쁜 답을 만들어 버린다.\nAgentic RAG는 사람처럼 행동한다 — 가져온 근거가 부족하면 '다시 찾아볼까?'를 스스로 판단해, 질문을 더 구체적으로 고쳐 재검색한다.\n\nLangGraph로는 검색(retrieve)·판단(grade)·재작성(rewrite)·생성(generate)을 노드로 만들고, '근거가 충분한가?'라는 조건 분기로 루프를 돈다.\n충분하면 생성으로 빠지고, 부족하면 질문을 고쳐 다시 검색한다. 단, 무한 루프를 막으려면 최대 반복 횟수를 반드시 정해 둔다.\n확장 단계로 보면 Naive → Advanced → Modular → Agentic의 마지막 단계로, 검색 자체가 똑똑해지는 방식이다."
      },
      {
        "h": "RAG는 느낌이 아니라 숫자로 평가한다",
        "body": "RAG를 만들고 나면 '잘 되는 것 같다'는 느낌만으로 끝내기 쉽다.\n하지만 느낌은 사람마다 다르고 어제와 오늘이 다르기 때문에, 개선 여부를 객관적으로 알 수 없다.\n그래서 시험 채점표처럼 점수를 매기는 평가가 필요하다.\n\nRAGAS는 대표적인 평가 도구로, 세 가지를 많이 본다.\n충실도는 답이 가져온 문서에 충실한지(지어내지 않았는지), 답변 관련성은 답이 질문에 맞는지, 문맥 정밀도는 검색해 온 문서 중 실제로 쓸모 있던 비율을 본다.\n이 점수를 기준선으로 잡아 두면, 무언가를 바꿨을 때 좋아졌는지 나빠졌는지를 숫자로 확인할 수 있다."
      },
      {
        "h": "튜닝과 운영: 품질·비용·속도의 줄다리기",
        "body": "RAG의 성능을 올리는 손잡이는 여러 개다.\n조각 크기, 겹침 양, 임베딩 모델, 가져올 개수 k, 재순위 사용 여부 등을 바꿔 가며 평가 점수를 비교한다.\n중요한 것은 한 번에 하나씩만 바꾸는 것인데, 그래야 무엇이 점수를 바꿨는지 알 수 있기 때문이다.\n\n실무에서는 품질만큼 비용과 속도도 중요하다.\nk를 키우거나 재순위를 더하면 답은 좋아지지만 LLM 토큰 비용과 응답 시간이 늘어난다.\n그래서 자주 들어오는 질문은 캐싱으로 결과를 재사용하고, 메타데이터 필터로 검색 범위를 좁혀 속도를 높인다.\n결국 RAG 운영은 품질과 비용과 속도 사이에서 균형점을 찾는 줄다리기다."
      }
    ],
    "realCode": [
      {
        "title": "LangGraph로 만드는 최소 Agentic RAG(근거 부족하면 재검색)",
        "lang": "python",
        "code": "# 근거가 부족하면 질문을 고쳐 다시 검색하는 Agentic RAG (설치: pip install langgraph)\nfrom typing_extensions import TypedDict  # 상태의 모양을 정의\nfrom langgraph.graph import StateGraph, START, END  # 그래프 본체와 시작/끝\nfrom langchain_openai import ChatOpenAI\n# retriever, format_docs 는 2일차 rag-2에서 만든 것을 재사용한다고 가정\n\nllm = ChatOpenAI(model='gpt-4o-mini', temperature=0)\n\nclass State(TypedDict):  # 그래프가 들고 다닐 상태\n    question: str   # 현재 질문(재작성되며 바뀔 수 있음)\n    context: str    # 검색해 온 근거\n    tries: int      # 재검색 횟수(무한 루프 방지)\n    answer: str     # 최종 답 또는 판단 결과\n\ndef retrieve(state):  # 검색 노드\n    docs = retriever.invoke(state['question'])  # 현재 질문으로 검색\n    return {'context': format_docs(docs), 'tries': state.get('tries', 0) + 1}\n\ndef grade(state):  # 판단 노드 — 근거가 충분한가?\n    v = llm.invoke(f\"질문에 답하기에 근거가 충분하면 YES, 아니면 NO만 출력.\\n질문:{state['question']}\\n근거:{state['context']}\").content\n    return {'answer': '충분' if 'YES' in v else '부족'}\n\ndef rewrite(state):  # 질문 재작성 노드\n    better = llm.invoke(f\"검색이 잘 되도록 질문을 더 구체적으로 바꿔줘:\\n{state['question']}\").content\n    return {'question': better}\n\ndef generate(state):  # 생성 노드\n    ans = llm.invoke(f\"아래 근거만 사용해 답하라.\\n근거:{state['context']}\\n질문:{state['question']}\").content\n    return {'answer': ans}\n\ndef route(state):  # 조건 분기 — 충분하면 생성, 부족하고 3회 미만이면 재작성\n    if state['answer'] == '충분':\n        return 'generate'\n    return 'rewrite' if state['tries'] < 3 else 'generate'\n\ng = StateGraph(State)\ng.add_node('retrieve', retrieve); g.add_node('grade', grade)\ng.add_node('rewrite', rewrite); g.add_node('generate', generate)\ng.add_edge(START, 'retrieve'); g.add_edge('retrieve', 'grade')\ng.add_conditional_edges('grade', route, {'generate': 'generate', 'rewrite': 'rewrite'})\ng.add_edge('rewrite', 'retrieve'); g.add_edge('generate', END)  # 재작성하면 다시 검색\napp = g.compile()\n\nresult = app.invoke({'question': '연차 며칠?', 'tries': 0})  # 애매한 질문\nprint(result['answer'])  # 결과: (필요하면 재검색을 거쳐) 근거에 기반한 답이 나옴",
        "note": "grade에서 '부족'이 나오면 rewrite→retrieve로 되돌아가 다시 검색합니다.\ntries로 최대 3회 제한을 두어 무한 루프를 막는 것이 Agentic RAG의 안전장치다."
      },
      {
        "title": "RAGAS로 RAG 답변을 자동 채점하는 평가 스크립트",
        "lang": "python",
        "code": "# RAG 답변의 품질을 RAGAS로 자동 채점한다(설치: pip install ragas)\nfrom ragas import EvaluationDataset, evaluate  # 평가셋 객체와 채점 함수(ragas 0.2+ 기준)\nfrom ragas.metrics import faithfulness, answer_relevancy, context_precision  # 충실도·답변관련성·문맥정밀도\n\n# 1) 평가에 쓸 질문·정답(reference)을 사람이 미리 준비한다\nquestions = [\"연차 휴가는 며칠인가요?\", \"환불은 며칠 내 가능한가요?\"]  # 평가 질문 목록\nreferences = [\"연 15일입니다\", \"구매 후 7일 이내 가능합니다\"]  # 각 질문의 모범 답안\n\n# 2) 우리 RAG의 답과 근거를 모아 '샘플' 리스트로 만든다(qa_chain은 2일차에서 만든 체인)\nsamples = []\nfor q, ref in zip(questions, references):  # 질문·정답을 짝지어 반복\n    answer = qa_chain.invoke(q)  # 체인으로 답 생성\n    ctxs = [d.page_content for d in retriever.invoke(q)]  # 같은 질문의 근거 조각 본문\n    samples.append({\n        \"user_input\": q,           # (구버전 'question')\n        \"response\": answer,        # (구버전 'answer')\n        \"retrieved_contexts\": ctxs, # (구버전 'contexts')\n        \"reference\": ref,          # (구버전 'ground_truth')\n    })\n\n# 3) 샘플을 EvaluationDataset으로 묶는다(0.2부터 이 형식이 표준)\ndataset = EvaluationDataset.from_list(samples)\n\n# 4) 세 지표로 채점을 실행한다\nresult = evaluate(dataset, metrics=[faithfulness, answer_relevancy, context_precision])\nprint(result)  # 결과: {'faithfulness': 0.82, 'answer_relevancy': 0.79, 'context_precision': 0.88} 형태",
        "note": "⚠️ ragas 0.2부터 입력 형식이 바뀌었다: 필드명이 user_input/response/retrieved_contexts/reference 이고,\nDataset 대신 EvaluationDataset.from_list 를 쓴다. 파라미터를 바꾼 뒤 점수를 다시 재면 개선을 객관적으로 확인할 수 있다."
      }
    ]
  },
  "langchain-1": {
    "theory": [
      {
        "h": "LangChain은 왜 생겼나 - LLM만으로는 부족한 이유",
        "body": "LLM에게 질문을 한 번 던지는 일은 사실 어렵지 않다.\n진짜 어려운 건 그 다음이다.\n프롬프트를 매번 손으로 새로 쓰고, 모델이 준 답을 코드가 쓰기 좋게 다듬고, 여기에 검색이나 메모리 같은 기능을 덧붙이려 하면 코드가 금세 엉킨다.\n\nLangChain은 이런 반복 작업을 '부품'으로 미리 만들어 둔 도구 상자다.\n주방에 비유하면, 매번 칼을 새로 만들지 않고 정해진 칼·도마·믹서를 꺼내 쓰는 것과 같다.\n우리는 요리(서비스)에만 집중하고, 도구는 LangChain이 표준화해 제공한다.\n그래서 LLM 앱을 빠르고 깔끔하게 만들 수 있다."
      },
      {
        "h": "부품 세 가지 - 프롬프트, 모델, 출력 파서",
        "body": "LangChain으로 만드는 거의 모든 체인은 세 부품에서 출발한다.\n첫째는 프롬프트로, 모델에게 무엇을 시킬지 적은 양식지다.\n둘째는 모델로, 실제로 글을 생성하는 두뇌다.\n셋째는 출력 파서로, 모델이 준 답을 우리가 쓰기 좋게 정리하는 정리함이다.\n\n이 세 부품은 컨베이어 벨트처럼 한 줄로 이어진다.\n입력이 프롬프트에서 양식을 채우고, 모델을 거쳐 글이 되고, 파서에서 깔끔하게 다듬어져 나온다.\n이 흐름만 이해하면 LangChain의 절반은 끝난 셈이다."
      },
      {
        "h": "LCEL - 파이프(|)로 부품을 잇는다",
        "body": "LCEL은 'LangChain Expression Language'의 줄임말로, 부품을 잇는 조립 문법이다.\n핵심 기호는 딱 하나, 파이프(|)다.\n'프롬프트 | 모델 | 파서'처럼 쓰면 '왼쪽 결과를 오른쪽에 넘겨라'라는 뜻이 된다.\n\n수도관을 떠올리면 쉽다.\n물(데이터)이 관을 따라 흐르며 각 칸을 거쳐 가는 모습이 바로 파이프 연결이다.\n이렇게 만든 체인은 invoke로 한 번에 실행할 수 있고, 나중에 부품을 갈아 끼우기도 쉽다."
      },
      {"h": "Runnable — 모든 부품이 같은 규격이라 이어진다", "body": "LCEL이 파이프(|)로 부품을 잇는다고 했는데, 어떻게 아무 부품이나 이어질까? 비밀은 Runnable이라는 공통 규격에 있다.\n프롬프트·모델·출력 파서·리트리버 등 LangChain의 모든 부품이 Runnable이라, 하나같이 invoke(한 번 실행)·stream(조각씩)·batch(여러 개 한꺼번에)라는 똑같은 사용법을 가진다.\n\n사용법이 같으니 레고 블록처럼 자유롭게 끼울 수 있고, 부품을 갈아 끼우기도 쉽다.\n나중에 배울 LangGraph의 Node도 사실은 이 Runnable을 감싼 것이라, 같은 invoke/stream이 그대로 통한다.\n'모든 것이 Runnable'이라는 한 문장이 LangChain 조립의 비밀인 셈이다."}
    ],
    "realCode": [
      {
        "title": "프롬프트·모델·파서를 LCEL로 이어 만든 요약 체인 (엔드투엔드)",
        "lang": "python",
        "code": "# 프롬프트 양식을 만들어 주는 도구를 가져온다(빈칸 있는 지시문을 만든다)\nfrom langchain_core.prompts import ChatPromptTemplate\n# 모델이 준 답에서 글자만 깔끔히 뽑아 주는 출력 파서를 가져온다\nfrom langchain_core.output_parsers import StrOutputParser\n# 실제로 글을 생성하는 Anthropic 채팅 모델 연동 클래스를 가져온다\nfrom langchain_anthropic import ChatAnthropic\n\n# {text} 자리에 입력을 끼워 넣는 프롬프트(양식지)를 만든다\nprompt = ChatPromptTemplate.from_template(\n    \"다음 글을 초등학생도 이해하게 한 문장으로 요약해줘:\\n\\n{text}\"  # 빈칸 text에 본문이 들어간다\n)\n# 글을 생성할 두뇌(모델)를 준비한다(opus-4-8은 temperature 설정 없이 사용)\nmodel = ChatAnthropic(model=\"claude-opus-4-8\")\n# 모델 답에서 군더더기 없이 문자열만 뽑아 줄 파서를 준비한다\nparser = StrOutputParser()\n\n# 세 부품을 파이프(|)로 이어 하나의 체인으로 조립한다(프롬프트→모델→파서 순서)\nchain = prompt | model | parser\n\n# 요약하고 싶은 긴 글을 변수에 담는다(실제로는 기사·메일 등이 들어간다)\nlong_text = \"이번 분기 매출은 작년보다 20% 늘었고, 신규 고객도 크게 증가했다. 다만 물류 비용 상승이 이익률을 일부 깎았다.\"\n\n# 체인에 입력을 넣어 실행하고, 결과(요약 문장)를 받는다. {} 안의 키는 프롬프트의 빈칸 이름과 같아야 한다\nresult = chain.invoke({\"text\": long_text})\n# 받은 요약 문장을 화면에 출력한다. 결과 예: '매출과 고객은 늘었지만 물류비로 이익은 조금 줄었다.'\nprint(result)",
        "note": "프롬프트·모델·파서를 파이프로 잇기만 하면 동작하는 완결형 요약 체인이다.\n입력 글만 바꾸면 코드 수정 없이 어떤 글이든 요약된다."
      }
    ]
  },
  "langchain-2": {
    "theory": [
      {
        "h": "메모리 - 챗봇에게 단기 기억을 달아 주기",
        "body": "기본 LLM 호출은 매번 처음 만난 사람처럼 군다.\n방금 내가 한 말을 전혀 기억하지 못한다.\n그래서 '내 이름은 길동이야'라고 말한 뒤 '내 이름이 뭐였지?'라고 물으면 모른다고 답한다.\n\n메모리는 지난 대화를 차곡차곡 적어 두는 수첩이다.\n새 질문을 보낼 때 이 수첩을 함께 들려보내면, 모델이 맥락을 이어 자연스럽게 대화한다.\n즉 모델 자체가 기억하는 게 아니라, 우리가 과거 대화를 매번 같이 넣어 주는 것이다."
      },
      {
        "h": "도구(Tool) - LLM에게 손발을 달아 주기",
        "body": "LLM은 글은 잘 쓰지만 정확한 계산이나 최신 정보 검색은 약하다.\n예를 들어 '1234 곱하기 5678'을 머릿속으로 풀라고 하면 틀리기 쉽다.\n\n도구는 모델이 직접 쓸 수 있는 작은 기능 버튼이다.\n계산기 도구를 쥐여 주면, 모델은 '이건 내가 계산기를 써야겠다'고 판단해 그 버튼을 누른다.\n사람이 암산 대신 계산기를 꺼내 쓰는 것과 똑같다.\n이렇게 하면 모델의 약점을 도구가 채워 준다."
      },
      {
        "h": "문서 QA(RAG) - 내 자료를 근거로 답하게 하기",
        "body": "LLM은 학습한 적 없는 우리 회사 내부 문서는 알지 못한다.\n그냥 물어보면 그럴듯하게 지어내는 환각이 생긴다.\n\nRAG는 이 문제를 도서관 사서처럼 푼다.\n먼저 질문과 관련된 문서 조각을 서가에서 찾아오고(검색), 그 조각만 책상에 펼쳐 놓은 뒤 그것을 근거로 답을 쓴다(생성).\n그래서 모델은 자기 기억이 아니라 '찾아온 근거'로 답하게 되고, 출처가 분명해지며 환각이 크게 줄어든다."
      }
    ],
    "realCode": [
      {
        "title": "문서 적재 → 청킹 → 임베딩 → 검색 → 답변까지 RAG 문서 QA 체인",
        "lang": "python",
        "code": "# 텍스트 파일을 읽어 들이는 로더를 가져온다\nfrom langchain_community.document_loaders import TextLoader\n# 긴 문서를 작은 조각으로 자르는 분할기를 가져온다\nfrom langchain_text_splitters import RecursiveCharacterTextSplitter\n# 문서 조각을 저장·검색하는 벡터스토어(Chroma)를 가져온다\nfrom langchain_chroma import Chroma\n# 글을 숫자 벡터로 바꾸는 임베딩 모델을 가져온다\nfrom langchain_huggingface import HuggingFaceEmbeddings\n# 답을 생성할 채팅 모델을 가져온다\nfrom langchain_anthropic import ChatAnthropic\n# 프롬프트 양식 도구를 가져온다\nfrom langchain_core.prompts import ChatPromptTemplate\n# 모델 답에서 글자만 뽑는 파서를 가져온다\nfrom langchain_core.output_parsers import StrOutputParser\n# 검색 결과를 프롬프트의 빈칸으로 그대로 흘려보내는 도우미를 가져온다\nfrom langchain_core.runnables import RunnablePassthrough\n\n# docs.txt 파일을 읽어 문서 객체 리스트로 불러온다\ndocs = TextLoader(\"docs.txt\", encoding=\"utf-8\").load()\n# 문서를 500자 단위로, 50자씩 겹치게 잘라 검색하기 좋은 조각으로 만든다\nsplitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)\n# 실제로 자르기를 실행해 조각 리스트를 얻는다\nchunks = splitter.split_documents(docs)\n# 한국어도 잘 처리하는 무료 임베딩 모델을 준비한다\nembedding = HuggingFaceEmbeddings(model_name=\"jhgan/ko-sbert-nli\")\n# 조각들을 임베딩해 Chroma 벡터스토어에 저장(색인)한다\nvectorstore = Chroma.from_documents(chunks, embedding)\n# 질문과 비슷한 조각 3개를 찾아 주는 리트리버로 변환한다\nretriever = vectorstore.as_retriever(search_kwargs={\"k\": 3})\n\n# 찾아온 근거(context)만 보고 답하라고 지시하는 프롬프트를 만든다\nprompt = ChatPromptTemplate.from_template(\n    \"아래 근거만 사용해 질문에 답해. 근거에 없으면 '모릅니다'라고 해.\\n\\n근거:\\n{context}\\n\\n질문: {question}\")\n# 답을 생성할 모델을 준비한다(opus-4-8은 temperature 설정이 필요 없다)\nmodel = ChatAnthropic(model=\"claude-opus-4-8\")\n\n# 리트리버가 찾은 문서 조각들을 하나의 긴 문자열로 합치는 함수를 정의한다\ndef join_docs(found):  # found: 검색된 문서 객체 리스트\n    return \"\\n\\n\".join(d.page_content for d in found)  # 각 조각의 본문을 줄바꿈으로 이어 붙인다\n\n# context는 리트리버→합치기로, question은 입력을 그대로 흘려 체인을 조립한다\nchain = (\n    {\"context\": retriever | join_docs, \"question\": RunnablePassthrough()}  # 두 빈칸을 동시에 채운다\n    | prompt  # 채워진 값으로 프롬프트 완성\n    | model   # 모델이 답 생성\n    | StrOutputParser()  # 답에서 글자만 추출\n)\n\n# 실제 질문을 넣어 체인을 실행한다(질문이 question 빈칸으로 들어간다)\nanswer = chain.invoke(\"환불은 며칠 안에 가능한가요?\")\n# 문서 근거에 기반한 답을 출력한다. 결과 예: '구매 후 7일 이내에 환불 가능합니다.'\nprint(answer)",
        "note": "문서를 읽고-자르고-임베딩-검색-생성까지 한 파일로 도는 완결형 RAG 챗봇이다.\ndocs.txt만 바꾸면 어떤 문서로든 질의응답이 된다."
      }
    ]
  },
  "langchain-3": {
    "theory": [
      {
        "h": "스트리밍 - 기다림의 체감을 줄이는 마법",
        "body": "긴 답을 만드는 데는 몇 초가 걸린다.\n그 시간 동안 화면이 멈춰 있으면 사용자는 답답해한다.\n\n스트리밍은 답이 완성되기를 기다리지 않고, 모델이 만드는 즉시 글자를 조금씩 화면에 흘려보낸다.\n식당에서 코스 요리를 한 접시씩 내오는 것과 같다.\n전체가 끝나길 기다리지 않고 먼저 나온 것부터 즐길 수 있어, 같은 시간이라도 훨씬 빠르게 느껴진다.\nChatGPT에서 글자가 또르르 나오는 그 효과가 바로 스트리밍이다."
      },
      {
        "h": "관측과 디버깅 - 체인 속을 들여다보기",
        "body": "체인이 길어지면 어디서 문제가 생겼는지 알기 어렵다.\n프롬프트가 이상했는지, 검색이 엉뚱한 걸 찾았는지, 모델이 헛소리를 했는지 눈에 보이지 않는다.\n\n콜백과 LangSmith는 체인에 CCTV를 다는 일이다.\n각 부품이 무엇을 받고 무엇을 내보냈는지, 시간과 비용은 얼마였는지 단계별로 기록한다.\n문제가 나면 녹화된 화면을 되돌려 보듯 원인 지점을 정확히 짚을 수 있다."
      },
      {
        "h": "실서비스의 현실 - 비용·캐싱·에러",
        "body": "장난감 챗봇과 진짜 서비스의 차이는 바로 이 세 가지에서 갈린다.\n첫째 비용은, 호출할 때마다 토큰만큼 돈이 나가므로 같은 질문은 캐싱으로 아껴야 한다.\n둘째 안정성은, 네트워크는 언제든 끊기므로 재시도와 예외 처리로 서비스가 죽지 않게 막아야 한다.\n셋째 사용자 경험은, 오류가 나도 빨간 에러 대신 '잠시 후 다시 시도해 주세요' 같은 친절한 메시지로 받아 줘야 한다.\n\n이 세 가지를 챙기면 비로소 남에게 보여 줄 수 있는 서비스가 된다."
      }
    ],
    "realCode": [
      {
        "title": "스트리밍·캐싱·예외처리를 갖춘 챗봇 FastAPI 웹 서비스",
        "lang": "python",
        "code": "# 웹 API 서버를 만드는 FastAPI를 가져온다\nfrom fastapi import FastAPI\n# 답을 글자 단위로 흘려보낼 스트리밍 응답 클래스를 가져온다\nfrom fastapi.responses import StreamingResponse\n# 요청 본문의 형태를 정의할 데이터 모델 도구를 가져온다\nfrom pydantic import BaseModel\n# 캐시를 켜는 설정 함수와 메모리 캐시 구현을 가져온다\nfrom langchain_core.globals import set_llm_cache\nfrom langchain_community.cache import InMemoryCache\n# 프롬프트·모델·파서 부품을 가져온다\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import StrOutputParser\nfrom langchain_anthropic import ChatAnthropic\n\n# 같은 질문은 모델을 다시 부르지 않도록 메모리 캐시를 켠다\nset_llm_cache(InMemoryCache())\n# 웹 서버 애플리케이션 객체를 만든다\napp = FastAPI()\n# 질문을 친절하게 답하라는 프롬프트를 만든다\nprompt = ChatPromptTemplate.from_template(\"친절한 도우미로서 답해줘: {message}\")\n# 답을 생성할 모델을 준비한다\nmodel = ChatAnthropic(model=\"claude-opus-4-8\")\n# 프롬프트→모델→문자열파서로 체인을 조립한다\nchain = prompt | model | StrOutputParser()\n\n# 요청 본문이 message 한 칸을 갖는다고 정의한다(자동 검증된다)\nclass Ask(BaseModel):\n    message: str  # 사용자가 보낸 질문 문자열\n\n# POST /chat 경로: 한 번에 완성된 답을 JSON으로 돌려준다\n@app.post(\"/chat\")\ndef chat(req: Ask):\n    try:                                  # 모델 호출을 보호막으로 감싼다\n        answer = chain.invoke({\"message\": req.message})  # 체인을 실행해 답을 받는다\n        return {\"answer\": answer}         # 성공하면 답을 JSON으로 돌려준다\n    except Exception as e:                # 어떤 오류든 잡아서\n        return {\"answer\": \"잠시 후 다시 시도해 주세요.\", \"error\": str(e)}  # 친절한 메시지로 대체\n\n# POST /stream 경로: 답을 글자 단위로 흘려보낸다\n@app.post(\"/stream\")\ndef stream(req: Ask):\n    def gen():                            # 조각을 하나씩 내보내는 생성기 함수\n        for piece in chain.stream({\"message\": req.message}):  # 체인이 만드는 조각을 순서대로 받아\n            yield piece                   # 받은 즉시 클라이언트로 흘려보낸다\n    return StreamingResponse(gen(), media_type=\"text/plain\")  # 스트리밍 응답으로 감싸 반환",
        "note": "캐싱(set_llm_cache)·예외처리(try/except)·스트리밍(chain.stream)을 모두 갖춘 배포용 챗봇 서버다.\n'uvicorn 파일명:app --reload'로 실행하면 /docs에서 바로 테스트할 수 있다."
      }
    ]
  },
  "serving-1": {
    "theory": [
      {"h": "동기 vs 비동기, 그리고 배치로 처리량 높이기", "body": "추론 서버에 요청이 몰릴 때, 동기 방식은 한 요청이 모델 예측(수십~수백 ms)을 끝낼 때까지 서버가 다른 요청을 붙잡아 두어 줄이 길어진다.\nFastAPI에서 `async def`로 엔드포인트를 만들고 `await`로 대기 지점을 표시하면, 모델이 계산하는 동안 서버가 다른 요청도 함께 진행해 같은 하드웨어로 더 많은 동시 요청을 소화한다.\n\n한 걸음 더 나아가, 짧은 시간(예: 20ms) 안에 들어온 요청 여러 건을 모아 모델에 한 번에 넣는 '배치 처리'를 하면 GPU를 한 번 돌릴 때 여러 건을 동시에 예측해 처리량(throughput)이 크게 오른다.\n다만 배치는 모으는 시간만큼 개별 응답이 살짝 늦어지므로, '지연을 조금 감수하고 처리량을 얻는' 트레이드오프임을 이해하고 서비스 성격에 맞춰 선택한다.\n실습에서는 같은 모델을 동기·비동기 버전으로 각각 만들어 부하를 줬을 때 초당 처리 건수가 어떻게 달라지는지 눈으로 비교한다."},
      {"h": "Lazy vs Eager - 모델을 언제 메모리에 올릴까", "body": "큰 모델일수록 파일을 메모리로 불러오는 데 수 초가 걸린다. 이 로딩을 '언제' 하느냐가 서비스 체감을 좌우한다.\nEager 로딩은 서버가 켜지는 순간 모델을 미리 올려 둔다 — 서버 기동은 느려지지만 첫 사용자부터 빠른 응답을 받는다. 실시간 서비스라면 대개 Eager가 정답이다.\nLazy 로딩은 첫 요청이 들어올 때 그제서야 모델을 올린다 — 서버는 즉시 뜨지만 운 나쁜 첫 사용자가 로딩 시간을 다 뒤집어쓴다.\n\n잘 안 쓰는 모델을 여러 개 얹어 두고 요청이 온 것만 올리고 싶을 때(메모리 절약)는 Lazy가 유리하다.\n두 방식의 '서버 시작 시간'과 '첫 응답 시간'을 재보면, 실시간 서빙에서 왜 Eager를 기본으로 삼는지 체감할 수 있다."},
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
        "code": "# ===== Dockerfile : 추론 API 이미지를 만드는 레시피 =====\nFROM python:3.11-slim          # 가볍고 파이썬 3.11이 깔린 베이스 이미지에서 시작\nWORKDIR /app                   # 컨테이너 안 작업 폴더를 /app 으로 지정\nCOPY requirements.txt .        # 의존성 목록 파일만 먼저 복사(캐시 활용으로 빌드 빨라짐)\nRUN pip install --no-cache-dir -r requirements.txt  # 목록대로 라이브러리 설치(캐시 없이 용량 절약)\nCOPY app.py model.joblib labels.joblib .  # 실제 코드와 모델 파일을 컨테이너로 복사\nEXPOSE 8000                    # 이 컨테이너가 8000번 포트를 쓴다고 표시\n# 0.0.0.0 으로 떠야 컨테이너 밖에서도 접속 가능\nCMD [\"uvicorn\", \"app:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]  # 컨테이너 시작 시 실행할 명령\n\n# ===== docker-compose.yml : 추론API + Prometheus 두 개를 함께 실행 =====\nservices:                      # 띄울 컨테이너 묶음 정의 시작\n  api:                         # 첫 번째 서비스 이름(추론 API)\n    build: .                   # 현재 폴더의 Dockerfile 로 이미지 빌드\n    ports:                     # 포트 연결(호스트:컨테이너)\n      - \"8000:8000\"           # 내 PC 8000 → 컨테이너 8000 으로 연결\n  prometheus:                  # 두 번째 서비스(지표 수집기)\n    image: prom/prometheus     # 공개된 Prometheus 이미지 그대로 사용\n    ports:                     # 포트 연결\n      - \"9090:9090\"           # 내 PC 9090 → Prometheus 9090\n    volumes:                   # 설정 파일을 컨테이너 안으로 연결\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml  # 수집 대상 설정 주입\n\n# ===== 실행 명령 =====\n# docker compose up --build    # 이미지 빌드 후 두 컨테이너를 한 번에 실행\n# docker compose down          # 실행한 컨테이너를 모두 정리\n",
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
      {"h": "MLOps는 DevOps와 무엇이 다르고, 성숙도는 어떻게 오르나", "body": "일반 소프트웨어의 DevOps는 '코드'만 버전 관리하고 배포하면 되지만, ML은 코드에 더해 '데이터'와 '모델'이라는 두 변수가 계속 변한다.\n그래서 MLOps는 코드뿐 아니라 데이터 버전·모델 버전·학습 실험까지 함께 추적하고, 배포 후에도 데이터가 바뀌면 성능이 떨어지므로 '지속적 학습(CT, Continuous Training)'이라는 개념이 더해진다.\n즉 DevOps의 CI/CD에 '데이터·모델 검증'과 '재학습'이 더 붙은 것이 MLOps다.\n\n성숙도 관점에서 처음엔 모든 것을 손으로 하지만(수동), 다음엔 학습 파이프라인을 자동화해 새 데이터에 자동 재학습하고, 마지막엔 CI/CD로 코드·데이터 변경이 자동 테스트·배포까지 흐르게 만든다.\n오늘 실습은 이 사다리에서 '실험 추적 → 모델 레지스트리 → CI/CD 자동화'로 한 칸씩 올라가는 과정에 해당한다."},
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
        "code": "import mlflow                                    # 실험 추적 도구\nimport mlflow.sklearn                          # sklearn 모델 저장 전용 모듈\nfrom sklearn.datasets import load_iris         # 연습용 데이터\nfrom sklearn.ensemble import RandomForestClassifier  # 분류 모델\nfrom sklearn.model_selection import train_test_split  # 데이터 분할\nfrom sklearn.metrics import accuracy_score     # 정확도 계산\n\nX, y = load_iris(return_X_y=True)              # 입력 X, 정답 y 한 번에 받기\n# 학습용 80% / 검증용 20% 로 나눔(seed 고정으로 재현성 확보)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)\n\nmlflow.set_experiment('iris-classification')   # 실험 묶음 이름 지정(없으면 생성)\n\nfor n in [10, 50, 100]:                         # 나무 개수를 바꿔 가며 여러 실험 실행\n    with mlflow.start_run():                   # 하나의 실행(run) 시작 — 이 블록이 한 실험\n        model = RandomForestClassifier(n_estimators=n, random_state=42)  # 설정대로 모델 생성\n        model.fit(X_tr, y_tr)                   # 학습 데이터로 학습\n        acc = accuracy_score(y_te, model.predict(X_te))  # 검증 정확도 계산\n\n        mlflow.log_param('n_estimators', n)    # 사용한 설정값 기록\n        mlflow.log_metric('accuracy', acc)     # 결과 지표 기록\n        # 모델 자체를 저장하고 레지스트리에 'iris-clf' 라는 이름으로 등록\n        mlflow.sklearn.log_model(model, name='model', registered_model_name='iris-clf')\n        print(f'n={n}, accuracy={acc:.3f}')    # 결과: 예) n=100, accuracy=0.967\n\n# 실행 후 `mlflow ui` 를 켜고 5000포트에서 run 들의 정확도를 표로 비교하면 된다\n",
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
      {"h": "LangGraph 설계의 3요소: Workflow·Loop·Memory", "body": "LangGraph로 에이전트를 설계할 때는 세 가지를 정한다.\n(1) Workflow — 노드와 엣지로 '일의 순서'를 그린다(그래프).\n(2) Loop — 조건부 엣지로 '생각 → 행동 → 관찰'을 필요한 만큼 반복하다 조건이 맞으면 끝낸다(ReAct 루프).\n(3) Memory — 한 번의 실행이 끝나도 대화·상태를 저장해 두었다가, 같은 thread_id로 다시 부르면 이전 맥락을 이어서 기억한다.\n\nMemory는 checkpointer(체크포인터)로 구현하며, 이것이 있어야 '어제 하던 대화를 오늘 이어가기'나 '멈췄다 다시 시작하기'가 된다.\n세 가지를 함께 놓고 보면 LangGraph가 '순서·반복·기억'을 한 그래프에서 관리하는 도구임이 분명해진다."},
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
      },
      {"h": "Agentic Workflow — 목표→계획→실행→반성", "body": "에이전트가 잘 일하게 하려면 그냥 '알아서 해'가 아니라 일하는 틀을 준다.\n대표적인 것이 Goal·Plan·Execute·Reflect 4단계다. 먼저 무엇을 이룰지 목표(Goal)를 분명히 하고, 어떤 단계로 갈지 계획(Plan)한 뒤, 도구로 실행(Execute)하고, 결과가 목표에 맞는지 스스로 되돌아보며(Reflect) 필요하면 계획을 고친다.\n\n이 '반성' 단계가 핵심이다. 사람도 한 번에 완벽히 하기보다 해보고 고치는데, 에이전트도 중간 결과를 보고 스스로 교정하면 훨씬 견고해진다.\nRAG에 이 틀을 적용한 것이 '부족하면 다시 검색하는' Agentic RAG Workflow다. 또 에이전트끼리·클라이언트와 표준 규격으로 주고받게 정한 Agent Protocol을 쓰면, 서로 다른 에이전트를 부품처럼 갈아 끼울 수 있다."}
    ],
    "realCode": [
      {
        "title": "검색·계산 도구를 쓰는 단일 ReAct 에이전트 (엔드투엔드)",
        "lang": "python",
        "code": "# LangGraph에서 그래프를 만들기 위한 핵심 도구들을 불러온다\nfrom langgraph.graph import StateGraph, START, END  # 그래프 뼈대(StateGraph)와 시작/끝 표시(START/END)\nfrom langgraph.prebuilt import ToolNode  # 도구를 실제로 실행해 주는 미리 만들어진 노드\nfrom langchain_anthropic import ChatAnthropic  # Anthropic(클로드) 모델을 부르는 클래스\nfrom langchain_core.tools import tool  # 일반 함수를 '도구'로 등록하는 데코레이터\nfrom typing import Annotated, TypedDict  # 상태의 형태(타입)를 정의할 때 쓰는 도구\nfrom langgraph.graph.message import add_messages  # 메시지를 '덮어쓰지 않고 이어붙이게' 해주는 함수\n\n# 1) 상태(State) 정의: 에이전트가 들고 다니는 공용 메모장\nclass State(TypedDict):  # 딕셔너리인데 어떤 키가 들어가는지 미리 약속해 둔 형태\n    # messages 키에는 대화 메시지들이 쌓인다. add_messages 덕분에 새 메시지가 '추가'된다\n    messages: Annotated[list, add_messages]\n\n# 2) 도구 정의: LLM이 직접 못 하는 정확한 계산을 대신해 줄 함수\n@tool  # 이 데코레이터가 아래 함수를 '에이전트가 부를 수 있는 도구'로 바꿔 준다\ndef multiply(a: int, b: int) -> int:\n    \"\"\"두 정수 a와 b를 곱해 결과를 돌려준다.\"\"\"  # 이 설명을 LLM이 읽고 언제 쓸지 판단한다\n    return a * b  # 실제 곱셈 결과를 반환\n\ntools = [multiply]  # 에이전트가 쓸 수 있는 도구 목록(여기선 곱셈 하나)\n\n# 3) 모델 준비: 클로드 모델에 우리가 만든 도구 목록을 '연결'한다\nllm = ChatAnthropic(model=\"claude-opus-4-8\")  # 사용할 LLM 지정\nllm_with_tools = llm.bind_tools(tools)  # 모델이 필요할 때 multiply를 호출하도록 도구를 묶어 줌\n\n# 4) LLM 노드: 메모장을 받아 모델에게 물어보고, 답(또는 도구 호출 요청)을 메모장에 추가\ndef call_model(state: State):\n    response = llm_with_tools.invoke(state[\"messages\"])  # 지금까지의 대화를 통째로 모델에 넘김\n    return {\"messages\": [response]}  # 모델의 응답을 messages에 이어붙이도록 반환\n\n# 5) 분기 함수: 모델이 도구를 부르려 하면 'tools'로, 아니면 끝('END')으로 가도록 판단\ndef should_continue(state: State):\n    last = state[\"messages\"][-1]  # 가장 최근 메시지(=방금 모델이 한 말)를 꺼낸다\n    # tool_calls가 비어 있지 않으면 모델이 도구를 쓰고 싶다는 뜻이다\n    if last.tool_calls:\n        return \"tools\"  # 도구 실행 노드로 보낸다\n    return END  # 도구가 필요 없으면 여기서 종료\n\n# 6) 그래프 조립: 노드를 추가하고 엣지(이동선)로 연결한다\ngraph = StateGraph(State)  # State 형태를 쓰는 빈 그래프 생성\ngraph.add_node(\"model\", call_model)  # 'model'이라는 이름으로 LLM 노드 등록\ngraph.add_node(\"tools\", ToolNode(tools))  # 'tools' 이름으로 도구 실행 노드 등록\ngraph.add_edge(START, \"model\")  # 시작하면 무조건 model 노드부터\ngraph.add_conditional_edges(\"model\", should_continue)  # model 다음은 조건에 따라 tools 또는 END\ngraph.add_edge(\"tools\", \"model\")  # 도구를 쓴 뒤에는 결과를 들고 다시 model로 돌아가 생각\napp = graph.compile()  # 그래프를 실행 가능한 형태로 완성\n\n# 7) 실행: 사용자의 질문을 넣고 에이전트를 돌린다\nresult = app.invoke({\"messages\": [(\"user\", \"23 곱하기 17은 얼마야?\")]})\nprint(result[\"messages\"][-1].content)  # 결과: 23 곱하기 17은 391입니다 (와 같은 자연어 답)",
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
      },
      {
        "h": "확장의 두 축: Harness Engineering과 병렬 실행(Fan-out)",
        "body": "멀티 에이전트를 크게 키우는 데는 두 축이 있다.\n첫째는 Harness Engineering이다. 에이전트의 두뇌(LLM) 바깥에 도구 연결·오류 처리·관측 같은 '주변 장치(하네스)'를 잘 갖추는 일로, 실서비스 성능을 좌우한다.\n여러 에이전트가 같은 규칙(로깅·검증·입력 가공)을 공유하도록 실행 전후에 끼우는 Middleware도 여기에 속한다.\n\n둘째는 Parallel Execution, 즉 Fan-out이다.\n서로 의존하지 않는 조사·검색·요약 작업을 한 줄로 차례차례 하지 않고, 동시에 펼쳐 실행한 뒤 결과를 모으면 전체 시간을 크게 줄일 수 있다.\nSupervisor가 이 병렬 작업자들을 지휘하면, 견고하면서도 빠른 멀티 에이전트가 된다.\n요리로 치면, 한 명이 재료 손질·조리·플레이팅을 순서대로 하는 대신 여러 요리사가 동시에 나눠 맡고 마지막에 접시에 모으는 것과 같다."
      }
    ],
    "realCode": [
      {
        "title": "슈퍼바이저가 조사·작성 작업자를 지휘 + 작성 전 사람 승인 (엔드투엔드)",
        "lang": "python",
        "code": "from langgraph.graph import StateGraph, START, END  # 그래프 뼈대와 시작/끝 표시\nfrom langgraph.checkpoint.memory import MemorySaver  # 멈춘 상태를 기억해 두는 체크포인터(메모리용)\nfrom langchain_anthropic import ChatAnthropic  # 클로드 모델\nfrom typing import TypedDict, Literal  # 상태 형태와 '정해진 값만 허용' 타입\n\nllm = ChatAnthropic(model=\"claude-opus-4-8\")  # 공용으로 쓸 LLM 준비\n\n# 1) 공용 상태: 대화 누적(messages)과 다음에 일할 사람(next)을 담는다\nclass State(TypedDict):\n    messages: list   # 지금까지 오간 모든 메시지\n    next: str        # supervisor가 정한 다음 작업자 이름\n\n# 2) 감독 노드: 현재 상황을 보고 누구에게 일을 시킬지 한 단어로 답하게 한다\ndef supervisor(state: State):\n    prompt = (\n        \"너는 팀 감독이다. 대화를 보고 다음에 할 일을 정하라. \"  # 감독 역할 부여\n        \"조사가 필요하면 researcher, 글 작성이면 writer, 다 끝났으면 FINISH 라고만 답하라.\"  # 선택지 안내\n    )\n    # 시스템 지시 + 지금까지 대화를 함께 모델에 넘긴다\n    decision = llm.invoke([(\"system\", prompt)] + state[\"messages\"]).content.strip()\n    return {\"next\": decision}  # 감독의 결정을 상태의 next에 저장\n\n# 3) 조사 작업자: 자료를 찾는 역할(여기선 예시로 고정 텍스트 반환)\ndef researcher(state: State):\n    info = \"조사결과: 전기차 시장은 연 20% 성장, 배터리 가격 하락이 핵심 동력.\"  # 실제로는 검색 도구 사용\n    return {\"messages\": state[\"messages\"] + [(\"assistant\", info)]}  # 조사 내용을 대화에 추가\n\n# 4) 작성 작업자: 모아진 내용을 바탕으로 3줄 요약을 만든다\ndef writer(state: State):\n    summary = llm.invoke(\n        state[\"messages\"] + [(\"user\", \"위 내용을 3줄로 요약해줘\")]  # 누적 대화 + 요약 지시\n    )\n    return {\"messages\": state[\"messages\"] + [summary]}  # 요약 결과를 대화에 추가\n\n# 5) 분기 함수: 감독이 정한 next 값에 따라 어디로 갈지 결정\ndef route(state: State) -> Literal[\"researcher\", \"writer\", \"__end__\"]:\n    if state[\"next\"] == \"FINISH\":  # 감독이 끝내라고 했으면\n        return END                  # 그래프 종료\n    return state[\"next\"]            # 아니면 해당 작업자 이름으로 이동\n\n# 6) 그래프 조립\ngraph = StateGraph(State)\ngraph.add_node(\"supervisor\", supervisor)  # 감독 노드\ngraph.add_node(\"researcher\", researcher)  # 조사 노드\ngraph.add_node(\"writer\", writer)          # 작성 노드\ngraph.add_edge(START, \"supervisor\")        # 시작은 항상 감독부터\ngraph.add_conditional_edges(\"supervisor\", route)  # 감독 다음은 결정에 따라 분기\ngraph.add_edge(\"researcher\", \"supervisor\")  # 조사 끝나면 감독에게 보고\ngraph.add_edge(\"writer\", \"supervisor\")      # 작성 끝나면 감독에게 보고\n\n# 7) 사람 승인: writer 노드 '직전'에 멈추도록 인터럽트를 걸고, 상태를 기억할 체크포인터 연결\nmemory = MemorySaver()  # 멈춘 지점의 상태를 저장해 둘 곳\napp = graph.compile(checkpointer=memory, interrupt_before=[\"writer\"])  # writer 전에 일시정지\n\n# 8) 실행: thread_id로 대화 한 건을 식별(이어가기 위해 필요)\nconfig = {\"configurable\": {\"thread_id\": \"demo-1\"}}\napp.invoke({\"messages\": [(\"user\", \"전기차 시장 동향 조사해서 3줄 요약\")], \"next\": \"\"}, config)\nprint(\"writer 실행 직전에서 멈춤 - 사람 승인 대기\")  # 결과: 여기서 한 번 멈춘다\n# 사람이 내용을 확인한 뒤 '진행'을 의미하는 None을 넣어 이어서 실행한다\nfinal = app.invoke(None, config)\nprint(final[\"messages\"][-1].content)  # 결과: 전기차 시장의 3줄 요약문",
        "note": "supervisor가 작업자들을 라우팅하고, writer 직전 interrupt_before로 멈춰 사람이 승인해야 마지막 요약이 진행되는 멀티 에이전트 + HITL 의 기본 골격이다.\nresearcher의 고정 텍스트를 실제 검색 도구로 바꾸면 바로 실무형이 된다."
      }
    ]
  },
  "vectordb-1": {
    "theory": [
      {"h": "RAG 설계 패턴 - Naive에서 Advanced, Modular로", "body": "가장 단순한 RAG(Naive RAG)는 [질문 → 벡터검색 → 그대로 LLM] 한 줄이다.\n데모는 되지만 실서비스에선 엉뚱한 문서를 물어오거나 근거 없이 지어내는 문제가 잦다.\n그래서 Advanced RAG는 검색 앞뒤에 손질을 더한다 — 검색 전(pre-retrieval)에는 질문을 다듬거나(query rewriting) 청킹을 개선하고, 검색 후(post-retrieval)에는 재순위(re-ranking)와 불필요한 문맥 압축으로 LLM에 넣을 근거의 질을 높인다.\n한 단계 더 나아간 Modular RAG는 검색·재작성·재순위·라우팅을 갈아 끼울 수 있는 부품으로 나눠, 상황에 따라 조합을 바꾼다.\n\n오늘 실습의 FAISS → Qdrant + Hybrid + Reranking이 바로 Naive에서 Advanced로 올라가는 과정이다."},
      {
        "h": "왜 '키워드 검색'만으로는 부족할까",
        "body": "옛날 검색은 글자가 똑같이 들어있는지를 보고 찾았다.\n그래서 '강아지'로 검색하면 '강아지'라는 글자가 든 문서만 나오고, 뜻이 같은 '반려견' 문서는 놓치기 쉬웠다.\n사람은 단어가 달라도 의미가 비슷하면 같은 주제로 느끼는데, 글자만 맞추는 검색은 이 '의미'를 모른다.\n\n임베딩은 바로 이 의미를 숫자로 담아낸다.\n'강아지'와 '반려견'을 비슷한 벡터로 만들어 두면, 글자가 달라도 가까운 위치에 놓이기 때문에 함께 검색된다.\n이렇게 의미로 찾는 검색을 '시맨틱 검색(semantic search)'이라 부르며, Vector DB가 이를 가능하게 해준다."
      },
      {"h": "단순 RAG의 한계부터 진단하기", "body": "오늘의 출발점은 '지금 쓰는 RAG가 왜 부족한가'를 짚는 것이다.\n단순 RAG는 네 곳에서 자주 무너진다.\n① 검색 실패: 질문 표현이 문서와 달라 관련 문서를 못 찾는다.\n② 환각: 근거가 약해도 그럴듯하게 지어낸다.\n③ 최신성·범위: 청킹이 나쁘거나 필터가 없어 엉뚱한 시점·범주의 문서를 섞는다.\n④ 평가 부재: 좋아졌는지 나빠졌는지 숫자로 확인할 방법이 없다.\n\n이 네 가지를 하나씩 메우는 도구가 오늘 배우는 좋은 임베딩·청킹·하이브리드·재순위·Agentic RAG다."},
      {
        "h": "벡터 공간과 유사도 — '가까우면 비슷하다'",
        "body": "임베딩 벡터를 공간 위의 점이라고 상상해 보자.\n비슷한 뜻의 문장들은 서로 가까이 모여 있고, 동떨어진 주제는 멀리 떨어져 있다.\n그래서 '두 문장이 비슷한가?'라는 질문은 '두 점이 얼마나 가까운가?'라는 거리 계산 문제로 바뀐다.\n\n가까움을 재는 방법은 크게 두 가지다.\n하나는 두 화살표의 방향 차이를 보는 코사인 유사도이고, 다른 하나는 두 벡터를 곱해 더하는 내적(dot product)이다.\n문서 길이의 영향을 줄이고 싶을 때는 보통 길이를 1로 맞춘 뒤 코사인 유사도를 쓰는데, 이 경우 코사인과 내적은 사실상 같은 결과를 준다."
      },
      {
        "h": "다 비교하면 느리다 — HNSW와 IVF의 직관",
        "body": "문서가 100개면 질문 하나에 100번만 비교하면 되지만, 1000만 개라면 매번 1000만 번을 비교해야 해서 너무 느리다.\n그래서 미리 '지름길 지도'를 만들어 두는 것이 인덱싱이다.\n\nHNSW는 친구 관계망처럼 점들을 서로 연결해 두고, 가까운 이웃을 따라 징검다리를 건너듯 빠르게 목적지에 다가가는 방식이다.\nIVF는 먼저 비슷한 점들끼리 동네(클러스터)로 묶어 두고, 질문이 들어오면 가까운 몇 개 동네만 뒤져서 시간을 아낀다.\n둘 다 모든 후보를 다 보지는 않으므로 아주 가끔 진짜 1등을 놓칠 수 있지만, 그 대신 수십~수백 배 빨라지는 실용적인 거래(trade-off)를 한다."
      },
      {
        "h": "검색을 더 똑똑하게: 재순위와 Agentic RAG",
        "body": "벡터 검색으로 후보를 빠르게 가져와도, 정말 좋은 문서가 항상 맨 위에 오지는 않는다.\n그래서 후보를 넉넉히 가져온 뒤 더 정교한 모델(Cross-Encoder)로 다시 점수를 매겨 순서를 바로잡는 재순위(Re-ranking)를 얹는다.\n여기에 단어가 정확히 겹치는지 보는 키워드 검색까지 섞은 하이브리드로 서로의 약점을 보완한다.\n\n한 걸음 더 나아가면, 결과가 부족할 때 스스로 질문을 고쳐 다시 검색하는 Agentic RAG가 검색 자체를 똑똑하게 만든다.\n실서비스에서는 보통 FAISS(로컬 라이브러리)로 시작해 Qdrant 같은 서버형 Vector DB로 옮기고, 임베딩·청킹·재순위·캐싱을 갖춘 Production Architecture로 완성한다.\n즉 '빠른 검색'에서 '정확하고 스스로 판단하는 검색'으로 올라가는 것이 이 과목의 목표다."
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
        "h": "MCP는 '도구 연결의 표준(USB-C)'이다",
        "body": "MCP(Model Context Protocol)가 없던 시절에는, 에이전트마다 도구를 붙이는 방식이 제각각이었습니다.\nA 서비스의 검색 도구를 B 서비스에 옮기려면 매번 새로 짜야 했죠.\nMCP는 '도구·자료·프롬프트를 이런 규격으로 내보내라'고 표준을 정해, 어떤 에이전트(클라이언트)든 똑같은 방식으로 연결하게 만듭니다.\n마치 노트북·모니터·충전기가 저마다 다른 단자를 쓰다가 USB-C 하나로 통일된 것과 같다.\n\n캡스톤에서 우리는 우리 서비스의 기능을 MCP 서버로 감싸, 여러 곳에서 재사용 가능한 표준 부품으로 만든다."
      },
      {
        "h": "Tool·Resource·Prompt를 나누는 이유",
        "body": "MCP 서버는 세 종류를 내보냅니다.\nTool은 '실행'이다 — 검색·계산·DB 저장처럼 무언가를 바꾸거나 바깥을 건드리는 동작.\nResource는 '읽기 전용 자료'다 — 문서·설정·레코드처럼 그냥 가져다 보는 것.\nPrompt는 '재사용 지시 템플릿'이다 — 자주 쓰는 요청을 정형화해 둔 것.\n둘을 가르는 기준은 간단하다: 부작용(쓰기·과금·외부 호출)이 있으면 Tool, 단순 조회면 Resource.\n\n이렇게 나눠두면 권한 관리가 쉽고(위험한 건 Tool만 통제), 모델이 무엇을 해도 되는지 명확해진다."
      },
      {
        "h": "통합 아키텍처 — 하나의 백엔드로 묶기",
        "body": "우리 캡스톤은 네 조각으로 나뉜다: Backend(FastAPI) · VectorDB(RAG 지식) · AI Agent(판단) · Frontend(화면).\nFastAPI가 허브가 되어 RAG 검색 결과와 MCP 서버의 도구를 에이전트에게 전달하고, 에이전트의 답을 프론트로 돌려준다.\n여기에 Thread(대화 세션) 개념을 더해, 사용자마다 대화 맥락을 따로 기억하게 한다.\n\n코드를 짜기 전 이 네 박스와 화살표를 그려두면, 팀원이 각자 다른 박스를 맡아 병렬로 개발할 수 있다."
      }
    ],
    "realCode": [
      {
        "title": "server.py — MCP Server(도구·자료 노출) with MCP Inspector",
        "lang": "python",
        "code": "from mcp.server.fastmcp import FastMCP  # MCP 서버를 쉽게 만드는 헬퍼\n\nmcp = FastMCP('skala-tools')  # 'skala-tools' 라는 이름의 MCP 서버 생성\n\n@mcp.tool()  # 이 함수를 MCP '도구(Tool)'로 노출 — 부작용 있는 실행 기능\ndef search_docs(query: str) -> str:\n    \"\"\"사내 문서에서 query와 관련된 내용을 찾아 돌려준다.\"\"\"  # 모델이 언제 쓸지 판단하는 설명\n    # 실제로는 Vector DB 검색으로 교체한다\n    return f\"'{query}' 관련 문서 3건을 찾았습니다.\"\n\n@mcp.resource('config://team')  # 이건 '자료(Resource)' — 읽기 전용\ndef team_config() -> str:\n    \"\"\"팀 설정 정보(읽기 전용).\"\"\"\n    return '팀=skala4, 기본모델=claude-opus-4-8'\n\nif __name__ == '__main__':\n    mcp.run()  # 서버 실행. 점검은 터미널에서 'mcp dev server.py' → Inspector 웹이 열림\n",
        "note": "'mcp dev server.py' 를 실행하면 MCP Inspector가 브라우저에 뜹니다.\nTools 탭에 search_docs 가 보이고, 값을 넣어 직접 호출해볼 수 있다."
      },
      {
        "title": "main.py — FastAPI에 MCP 도구 + 에이전트 통합(/chat)",
        "lang": "python",
        "code": "from fastapi import FastAPI  # API 서버 프레임워크\nfrom pydantic import BaseModel  # 요청 본문의 모양을 정의\nfrom langchain_mcp_adapters.client import MultiServerMCPClient  # MCP 서버의 도구를 불러오는 어댑터\nfrom langgraph.prebuilt import create_react_agent  # 도구를 쓰는 ReAct 에이전트를 한 줄로 생성\nfrom langchain_anthropic import ChatAnthropic\n\napp = FastAPI()\n\nclass Ask(BaseModel):  # /chat 이 받을 입력: 질문 + 세션 구분용 thread_id\n    question: str\n    thread_id: str = 'default'\n\n# server.py(MCP 서버)를 자식 프로세스로 띄워 그 도구들을 가져온다\nclient = MultiServerMCPClient({\n    'tools': {'command': 'python', 'args': ['server.py'], 'transport': 'stdio'},\n})\n\n@app.post('/chat')  # POST /chat 으로 질문을 받는 엔드포인트\nasync def chat(req: Ask):\n    tools = await client.get_tools()  # MCP 서버가 노출한 도구 목록(search_docs 등)\n    agent = create_react_agent(ChatAnthropic(model='claude-opus-4-8'), tools)  # 에이전트 조립\n    result = await agent.ainvoke({'messages': [('user', req.question)]})  # 실행\n    return {'answer': result['messages'][-1].content}  # 최종 답만 돌려줌\n",
        "note": "'uvicorn main:app --reload' 로 띄운 뒤 http://localhost:8000/docs 에서 /chat 을 테스트합니다.\nMCP 서버 하나만 바꿔 끼우면 도구 세트가 통째로 교체되는 게 MCP의 힘이다."
      },
      {
        "title": "chat.py — MemorySaver로 thread_id별 대화 이어가기",
        "lang": "python",
        "code": "# thread_id로 사용자별 대화를 분리·기억하는 최소 예제\nfrom langgraph.prebuilt import create_react_agent\nfrom langgraph.checkpoint.memory import MemorySaver  # 대화 상태를 저장하는 체크포인터\nfrom langchain_anthropic import ChatAnthropic\n\nllm = ChatAnthropic(model='claude-opus-4-8')\ntools = []  # 실제로는 search_docs 등 MCP 도구를 넣는다\n\n# checkpointer를 붙이면 thread_id마다 대화가 따로 저장·복원된다\nagent = create_react_agent(llm, tools, checkpointer=MemorySaver())\n\ndef ask(question, thread_id):  # thread_id가 '대화 방 번호' 역할\n    # 같은 thread_id면 이전 대화가 이어지고, 새 값이면 처음부터 시작한다\n    config = {'configurable': {'thread_id': thread_id}}\n    result = agent.invoke({'messages': [('user', question)]}, config)\n    return result['messages'][-1].content\n\n# 같은 방(user-1)에서 이름을 알려 준 뒤 다시 물으면 기억한다\nprint(ask('내 이름은 길동이야', 'user-1'))   # 인사\nprint(ask('내 이름이 뭐였지?', 'user-1'))     # 결과: '길동'이라고 답함(대화 기억)\n# 다른 방(user-2)은 앞의 대화를 모른다\nprint(ask('내 이름이 뭐였지?', 'user-2'))     # 결과: 모른다고 답함(방이 다름)",
        "note": "같은 thread_id면 이름을 기억하고, 새 thread_id면 처음부터 시작한다 — 이것이 사용자별 대화 분리의 핵심이다.\n실무에선 MemorySaver 대신 Redis·DB 체크포인터로 바꾸면 서버를 재시작해도 대화가 유지된다(Day3의 Stateless Session과 연결)."
      }
    ]
  },
  "capstone-2": {
    "theory": [
      {
        "h": "스트리밍은 '다 만들고 주기'가 아니라 '만들며 흘리기'다",
        "body": "LLM은 답을 한 번에 완성하지 않고 토큰을 하나씩 이어 만듭니다.\n기본 방식은 그 토큰이 다 모일 때까지 기다렸다 한꺼번에 보여주는 것인데, 답이 길면 사용자는 몇 초씩 빈 화면을 봐야 한다.\n스트리밍은 토큰이 생기는 대로 즉시 흘려보내, ChatGPT처럼 글자가 타이핑되듯 나오게 한다.\n체감 대기 시간(첫 글자까지, TTFT)이 확 줄어 이탈이 감소한다.\n\n이 흐름은 세 차원으로 나뉜다: 모델이 흘리고 → 서버가 전달하고 → 프론트가 이어붙인다."
      },
      {
        "h": "SSE — 서버가 클라이언트로 계속 밀어 보내기",
        "body": "보통의 HTTP는 '요청 한 번 → 응답 한 번'으로 끝납니다.\n하지만 스트리밍은 서버가 답 조각을 여러 번 나눠 보내야 하므로, 연결을 열어둔 채 계속 밀어 보내는 방식이 필요하다.\n그게 SSE(Server-Sent Events)로, 서버→클라이언트 단방향으로 'data: 조각' 을 반복해 전송한다.\nFastAPI에서는 StreamingResponse에 제너레이터를 물려 media_type을 'text/event-stream'으로 주면 된다.\n\n프론트는 Vercel AI SDK의 useChat 같은 도구로 이 조각들을 받아 화면에 이어 붙이기만 하면 된다."
      },
      {
        "h": "Observability — 보이지 않으면 고칠 수 없다",
        "body": "에이전트는 검색·판단·도구 호출 여러 단계를 거치므로, 문제가 나도 '어디서' 났는지 알기 어렵습니다.\nObservability(관측 가능성)는 각 단계의 입력·출력·시간·토큰을 기록해 안을 들여다보게 하는 것이다.\nLangSmith를 붙이면 한 번의 실행이 어떤 단계를 거쳤는지 나무처럼 펼쳐 보여, 느린 단계와 비싼 단계를 바로 찾는다.\n여기에 Eval(평가)을 더하면 '답이 정확한가·근거가 있는가'를 정량 점수로 채점할 수 있다.\n\n관측과 평가가 있어야 '느낌'이 아니라 '숫자'로 서비스를 개선할 수 있다."
      }
    ],
    "realCode": [
      {
        "title": "main.py — FastAPI SSE 토큰 스트리밍 엔드포인트",
        "lang": "python",
        "code": "from fastapi import FastAPI  # API 서버\nfrom fastapi.responses import StreamingResponse  # 조각을 이어 보내는 응답 타입\nfrom langchain_anthropic import ChatAnthropic\n\napp = FastAPI()\nllm = ChatAnthropic(model='claude-opus-4-8')  # 모델 준비\n\nasync def token_stream(question: str):  # 토큰을 하나씩 흘려보내는 제너레이터\n    async for chunk in llm.astream(question):  # astream: 모델이 만드는 대로 조각을 받음\n        if chunk.content:  # 빈 조각은 건너뜀\n            yield f'data: {chunk.content}\\n\\n'  # SSE 형식으로 한 조각 전송\n    yield 'data: [DONE]\\n\\n'  # 끝났음을 알리는 신호\n\n@app.get('/stream')  # GET /stream?q=... 로 질문을 받음\nasync def stream(q: str):\n    # media_type 을 event-stream 으로 주면 브라우저·클라이언트가 SSE로 인식\n    return StreamingResponse(token_stream(q), media_type='text/event-stream')\n",
        "note": "'uvicorn main:app --reload' 실행 후 'curl -N \"http://localhost:8000/stream?q=안녕\"' 로 확인합니다.\n-N(버퍼 끔) 덕분에 답이 한꺼번에가 아니라 조금씩 흘러나오는 걸 눈으로 볼 수 있다."
      },
      {
        "title": ".env / 실행 — LangSmith로 실행 추적(Observability) 켜기",
        "lang": "bash",
        "code": "# .env 파일에 아래 3줄을 추가하면, 코드를 바꾸지 않아도 모든 실행이 자동 추적된다\nLANGCHAIN_TRACING_V2=true          # 추적 기능 켜기\nLANGCHAIN_API_KEY=lsv2_여기에_키    # smith.langchain.com 에서 발급\nLANGCHAIN_PROJECT=skala-capstone   # 대시보드에서 묶어 볼 프로젝트 이름\n\n# 그런 다음 평소처럼 실행하면 됨\n# python main.py   또는   uvicorn main:app --reload\n# → smith.langchain.com 대시보드에서 방금 실행의 단계별 trace를 확인\n",
        "note": "trace를 열면 검색·모델호출·도구실행이 나무처럼 펼쳐집니다.\n가장 오래 걸린 단계(Latency)와 토큰을 많이 쓴 단계(Cost)를 바로 찾아 개선점을 잡을 수 있다."
      }
    ]
  },
  "capstone-3": {
    "theory": [
      {
        "h": "실서비스는 '실패를 전제로' 설계한다",
        "body": "API는 가끔 느려지거나 잠깐 죽고, 네트워크는 종종 끊깁니다.\n초보 코드는 이런 일이 나면 그대로 멈추지만, 실서비스는 '실패는 당연히 난다'고 보고 미리 대비한다.\n핵심은 세 가지다: try/except로 오류를 붙잡고, 재시도(지수 백오프)로 일시적 실패를 흡수하고, 타임아웃으로 무한 대기를 막는다.\n그리고 그래도 안 되면 '잠시 후 다시 시도해 주세요' 같은 친절한 대체 응답으로 사용자를 안심시킨다.\n\n멈추지 않고 우아하게 실패하는 것(graceful degradation)이 프로다운 서비스의 조건이다."
      },
      {
        "h": "비용·지연·확장 — Stateless가 열쇠다",
        "body": "사용자가 늘면 서버를 여러 대로 늘려야 하는데, 서버가 대화 상태를 자기 메모리에 들고 있으면 문제가 생깁니다.\n같은 사용자의 다음 요청이 다른 서버로 가면 대화 맥락을 잃기 때문이다.\n그래서 상태를 서버 밖(DB·Redis)에 저장하는 Stateless 구조로 만들면, 아무 서버나 요청을 처리할 수 있어 수평 확장이 쉬워진다.\n비용은 작은 모델·캐싱으로, 지연은 불필요한 재검색 제거로 줄인다.\n\n'싸고 · 빠르고 · 잘 늘어나는' 세 가지를 함께 저울질하는 것이 운영의 핵심이다."
      },
      {
        "h": "에이전트 확장 — 라우팅·검증·동적 계획",
        "body": "서비스가 커지면 하나의 에이전트로 모든 질문을 처리하기 어렵습니다.\nQuery Routing은 질문의 종류(요약·검색·계산)에 따라 알맞은 경로로 보내고, Conditional Routing은 중간 조건에 따라 흐름을 바꾼다.\nValidator Agent는 다른 에이전트의 답이 형식·근거에 맞는지 검사해, 틀리면 다시 시키거나 걸러낸다.\nDynamic Planning은 정해진 순서만 따르지 않고 중간 결과를 보며 계획을 새로 짠다.\n\n이 장치들이 모이면, 단순 챗봇이 아니라 스스로 점검하고 길을 고르는 견고한 에이전트 시스템이 된다."
      }
    ],
    "realCode": [
      {
        "title": "safe.py — 재시도·타임아웃 + Validator Agent(출력 검증)",
        "lang": "python",
        "code": "import asyncio  # 비동기 실행·타임아웃 도구\nfrom tenacity import retry, wait_exponential, stop_after_attempt  # 재시도 데코레이터\nfrom langchain_anthropic import ChatAnthropic\n\nllm = ChatAnthropic(model='claude-opus-4-8')\n\n# 실패하면 1→2→4초 기다렸다 최대 3번까지 다시 시도\n@retry(wait=wait_exponential(multiplier=1, max=8), stop=stop_after_attempt(3))\nasync def call_llm(prompt: str) -> str:\n    # 20초를 넘기면 강제로 끊어 무한 대기를 막는다\n    resp = await asyncio.wait_for(llm.ainvoke(prompt), timeout=20)\n    return resp.content\n\nasync def validate(answer: str) -> bool:  # Validator Agent — 답에 근거가 있는지 검사\n    check = await call_llm(f'다음 답변에 근거/출처가 있으면 OK, 없으면 NO만 출력:\\n{answer}')\n    return 'OK' in check\n\nasync def safe_answer(question: str) -> str:  # 최종 진입점\n    try:\n        answer = await call_llm(question)  # 1차 답변\n        if not await validate(answer):  # 검증 실패 시\n            answer = await call_llm(question + '\\n반드시 근거를 포함해 다시 답하라.')  # 재생성\n        return answer\n    except Exception as e:  # 재시도까지 실패하면 우아하게 대체 응답\n        return f'일시적 오류로 답변을 못 드렸어요. 잠시 후 다시 시도해 주세요. ({e})'\n",
        "note": "재시도·타임아웃·검증을 한 파일에 모았습니다.\n일부러 잘못된 키로 call_llm 을 부르면 3번 재시도 후 대체 응답이 나오고, 근거 없는 답은 validate 에서 걸러져 다시 생성된다."
      }
    ]
  },
  "miniproject-1": {
    "theory": [
      {"h": "Prompt에서 Harness로 - 전 과정을 한 줄로 꿰기", "body": "이번 과정에서 배운 것을 한 줄로 꿰면 Prompt(무엇을 시킬지) → Context(무엇을 참고하게 할지, RAG) → Harness(검색·도구·평가까지 모델 주변 장치 전체 설계)로 점점 커진다.\n미니 프로젝트는 이 셋을 한 서비스로 합치는 자리다.\n오늘은 새 기능을 더 얹기보다, 지금까지 만든 조각들을 되돌아보고 '가장 약한 고리'를 찾아 개선하는 데 집중한다."},
      {"h": "naive RAG의 한계와 Agentic RAG", "body": "한 번 검색해 그대로 붙이는 naive RAG는, 검색이 빗나가면 엉뚱한 조각을 근거로 답하는 사고가 난다.\nAgentic RAG는 검색 → 결과가 질문과 관련 있는지 채점(grading) → 부족하면 질문을 고쳐 재검색하는 루프를 돌려, 검색 실패를 스스로 복구한다.\n단, 무한 루프를 막기 위해 재검색 횟수에 상한을 둔다.\n오늘의 개선 목표 하나는 바로 이 '스스로 다시 찾는' 능력을 우리 서비스에 넣는 것이다."},
      {"h": "RAG를 숫자로 평가하기", "body": "'좋아 보이는 답'은 사람마다 기준이 달라 믿기 어렵다.\n그래서 검색 정확도(관련 문서를 잘 데려왔나)·근거 충실도(답이 근거 안에서 나왔나, 지어내지 않았나)·답변 관련성(질문에 실제로 답했나)을 몇 개의 샘플 질문으로 측정해 표로 남긴다.\n이 표가 오늘의 제출물이며, 무언가를 바꿨을 때 좋아졌는지 나빠졌는지를 숫자로 확인하는 기준선이 된다."}
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
      },
      {
        "title": "검색결과 grading + 질의 재작성 재검색 (Agentic RAG 핵심 루프)",
        "lang": "python",
        "code": "# 검색이 부족하면 질문을 고쳐 다시 찾는 최소 Agentic 루프\nfrom openai import OpenAI\nfrom config import API_KEY, MODEL_NAME\nfrom rag import search, build_index, chunk_text  # 2일차 모듈 재사용\n\nclient = OpenAI(api_key=API_KEY)\n\ndef grade(question, context):  # 근거가 질문에 충분한지 YES/NO로 채점\n    prompt = f'질문에 답하기에 근거가 충분하면 YES, 아니면 NO만 출력.\\n질문:{question}\\n근거:{context}'\n    res = client.chat.completions.create(model=MODEL_NAME, messages=[{'role': 'user', 'content': prompt}])\n    return 'YES' in res.choices[0].message.content.upper()\n\ndef rewrite(question):  # 검색이 잘 되도록 질문을 더 구체적으로 고쳐 준다\n    prompt = f'검색이 잘 되도록 다음 질문을 더 구체적으로 바꿔줘(한 문장):\\n{question}'\n    res = client.chat.completions.create(model=MODEL_NAME, messages=[{'role': 'user', 'content': prompt}])\n    return res.choices[0].message.content.strip()\n\ndef agentic_search(question, index, max_tries=3):  # 최대 3번까지 재검색\n    q = question\n    context = ''\n    for attempt in range(max_tries):\n        hits = search(q, index)          # 현재 질문으로 검색\n        context = '\\n'.join(hits)        # 근거 묶기\n        if grade(question, context):     # 원래 질문 기준으로 채점\n            return context, attempt + 1  # 충분하면 근거와 시도횟수 반환\n        q = rewrite(q)                   # 부족하면 질문을 고쳐 다시\n    return context, max_tries            # 끝까지 부족하면 마지막 근거라도 반환\n\nif __name__ == '__main__':\n    doc = open('data/policy.txt', encoding='utf-8').read()\n    index = build_index(chunk_text(doc))\n    ctx, tries = agentic_search('환불', index)          # 애매한 질문\n    print(f'{tries}번 만에 근거 확보:\\n{ctx[:120]}')     # 결과: 재검색을 거쳐 근거를 확보",
        "note": "grade가 NO를 내면 rewrite로 질문을 고쳐 다시 검색한다 — naive RAG를 Agentic RAG로 끌어올리는 핵심 루프다.\nmax_tries로 상한을 둬 무한 루프를 막는 것이 안전장치다."
      },
      {
        "title": "eval.py — 샘플 QA셋으로 faithfulness·relevancy 점수 집계",
        "lang": "python",
        "code": "# 몇 개의 샘플 질문으로 RAG 답변을 채점해 표로 남긴다\nfrom openai import OpenAI\nfrom config import API_KEY, MODEL_NAME\nfrom app import answer  # 2일차에 만든 RAG 답변 함수 재사용\n\nclient = OpenAI(api_key=API_KEY)\n\n# 평가용 샘플: 질문과 사람이 정한 모범답안\nqa_set = [\n    {'q': '환불은 며칠 안에 가능한가요?', 'ref': '구매 후 7일 이내'},\n    {'q': '연차 휴가는 며칠인가요?', 'ref': '연 15일'},\n]\n\ndef judge(question, answer_text, reference):  # LLM 심판이 두 항목을 0~1로 채점\n    prompt = (\n        f'질문:{question}\\n모범답안:{reference}\\n제출답:{answer_text}\\n'\n        '두 점수를 콤마로 숫자만 출력해라. '\n        '충실도(제출답이 지어내지 않았는가), 관련성(질문에 답했는가). 예: 0.8,0.9'\n    )\n    res = client.chat.completions.create(model=MODEL_NAME, messages=[{'role': 'user', 'content': prompt}])\n    faith, rel = res.choices[0].message.content.strip().split(',')\n    return float(faith), float(rel)\n\nrows = []\nfor item in qa_set:\n    ans = answer(item['q'])                      # 우리 RAG의 답\n    f, r = judge(item['q'], ans, item['ref'])    # 채점\n    rows.append((item['q'], f, r))\n\nprint('질문 | 충실도 | 관련성')\nfor q, f, r in rows:\n    print(f'{q} | {f:.2f} | {r:.2f}')\n# 평균을 기준선으로 남겨 개선 전후를 비교한다\nprint('평균 충실도:', round(sum(f for _, f, _ in rows) / len(rows), 2))\nprint('평균 관련성:', round(sum(r for _, _, r in rows) / len(rows), 2))",
        "note": "샘플 QA셋에 대해 충실도·관련성을 점수로 매겨 표와 평균으로 남긴다.\n이 평균을 기준선으로 잡아 두면, 청킹·k·프롬프트를 바꿨을 때 개선 여부를 숫자로 확인할 수 있다."
      }
    ]
  },
  "miniproject-2": {
    "theory": [
      {"h": "왜 에이전트를 나누나", "body": "하나의 프롬프트에 검색·계산·요약·판단을 다 넣으면 지시가 길어지고 실수가 늘어난다.\n역할별로 쪼개면 각 에이전트의 프롬프트가 짧고 명확해지고, 어디서 틀렸는지 찾는 디버깅도 쉬워진다.\n사람 조직이 한 명에게 모든 일을 시키지 않고 팀을 나누는 것과 같은 이유다."},
      {"h": "Supervisor의 일", "body": "Supervisor는 사용자의 요청을 읽고 '이번엔 검색 에이전트, 다음엔 요약 에이전트' 식으로 순서를 정하고, 워커들의 결과를 모아 최종 답을 조립한다.\nSupervisor 프롬프트에는 '어떤 워커가 무엇을 잘하는지' 목록과 '언제 끝낼지'를 정하는 종료 조건을 반드시 적는다.\n이 두 가지가 빠지면 감독이 헤매거나 끝내지 못하고 맴돈다."},
      {"h": "설계 산출물에 담을 것", "body": "Day2의 제출물은 코드가 아니라 설계 문서다.\n에이전트 목록과 각 역할, Supervisor의 라우팅 규칙, 에이전트 사이에 오가는 공유 상태(무엇을 주고받나), 종료 조건, 그리고 이 구조가 미니 프로젝트 주제를 어떻게 푸는지 보여주는 한 장의 흐름도를 담는다.\n이 문서를 Day2 끝에 제출하면, Day3에서 그대로 코드로 옮기기만 하면 된다."}
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
      {"h": "설계를 코드로 - Supervisor와 워커 구현", "body": "Day2의 설계대로 Supervisor 함수와 워커 함수들을 만든다.\n공유 상태(dict나 객체)를 돌려가며 Supervisor가 워커를 호출 → 결과 취합 → 종료 판단하는 루프를 구현한다.\n각 워커의 프롬프트는 짧고 분명하게, Supervisor의 프롬프트에는 라우팅 규칙과 종료 조건을 그대로 옮긴다."},
      {"h": "서비스로 엮기", "body": "여기에 Day1에서 개선한 Agentic RAG를 '검색 워커'로 꽂아 넣으면 전 과정이 한 서비스로 합쳐진다.\n사용자의 질문이 Supervisor로 들어오면, 검색 워커가 근거를 찾고 작성 워커가 답을 다듬는 식으로 협업한다.\nPrompt·Context·Harness·RAG·Agent가 하나의 흐름으로 모이는 순간이다."},
      {"h": "시연과 Wrap-up, 그리고 QUIZ", "body": "데모 질문으로 멀티 에이전트가 협업해 답을 만드는 과정을 직접 보여준다.\n그런 뒤 전체 과정(Prompt·Context·Harness·RAG·Agent)을 한 장으로 정리하고, 배운 것을 확인하는 QUIZ로 마무리한다.\n도커 배포 같은 운영 주제는 선택 심화로 짧게만 짚고, 오늘의 중심은 '멀티 에이전트로 서비스를 완성해 보이는 것'에 둔다."}
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
