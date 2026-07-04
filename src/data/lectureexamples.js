// 강의안 날짜별 "실습 예제" — subjectId-day 키. { title, lang, code, note }

export const examples = {
  "git-1": [
    {
      "title": "지금 내 저장소 상태를 한눈에 보기",
      "lang": "bash",
      "code": "git status            # 현재 변경/스테이지 상태를 알려주는 안내판\n# 예상 출력:\n#   On branch main\n#   Changes not staged for commit:\n#     modified:   README.md   ← 고쳤지만 아직 add 안 한 파일\ngit add README.md     # README.md 를 다음 커밋 대상으로 담기\ngit status            # 다시 보면 'Changes to be committed' 로 옮겨가 있음",
      "note": "막힐 때마다 `git status` 를 치는 습관이 왕초보 탈출의 지름길이다."
    },
    {
      "title": "마지막 저장 이후 무엇이 바뀌었는지 보기(diff)",
      "lang": "bash",
      "code": "echo \"한 줄 추가\" >> README.md   # README.md 맨 끝에 새 줄 덧붙이기(>> 는 추가)\ngit diff                        # 직전 저장 대비 바뀐 부분을 +/- 로 보여줌\n# 예상 출력:\n#   +한 줄 추가     ← + 는 새로 추가된 줄을 의미",
      "note": "커밋하기 전에 `git diff` 로 '내가 뭘 바꿨는지' 확인하면 실수를 크게 줄인다."
    },
    {
      "title": "방금 커밋을 취소하고 변경은 그대로 두기(reset --soft)",
      "lang": "bash",
      "code": "git reset --soft HEAD~1   # 가장 최근 커밋 1개를 취소(HEAD~1 = 한 칸 전)\n# --soft 라서 파일 내용과 스테이지는 그대로 남는다(되돌리기 안전)\ngit status                # 방금 커밋했던 변경이 다시 '커밋 대기' 상태로 보임",
      "note": "커밋 메시지를 잘못 썼거나 한 커밋에 너무 많이 담았을 때 가장 자주 쓰는 안전한 되돌리기다."
    },
    {
      "title": "SSH 키 만들고 GitHub에 등록해 비밀번호 없이 연결하기",
      "lang": "bash",
      "code": "# 1) ed25519 방식으로 키 한 쌍을 만든다(엔터 3번이면 기본 경로에 저장)\nssh-keygen -t ed25519 -C \"me@team.com\"\n# 2) 공개키(.pub) 내용을 출력해 이 값을 복사한다\ncat ~/.ssh/id_ed25519.pub\n# 3) GitHub > Settings > SSH and GPG keys > New SSH key 에 붙여넣는다\n# 4) 연결이 되는지 시험한다\nssh -T git@github.com   # 성공하면 'Hi 이름! You've successfully authenticated' 메시지",
      "note": "개인키(id_ed25519)는 절대 공유하지 말고 공개키(id_ed25519.pub)만 GitHub에 등록한다."
    },
    {
      "title": "VS Code Source Control로 터미널 없이 커밋하기",
      "lang": "text",
      "code": "1. 왼쪽 세로 막대의 '가지(branch) 아이콘'(Source Control)을 클릭한다.\n2. Changes 목록에서 커밋할 파일 옆의 + 버튼을 눌러 stage 한다(= git add).\n3. 위쪽 입력창에 커밋 메시지를 적는다(예: 로그인 기능 추가).\n4. 체크(✓, Commit) 버튼을 눌러 커밋한다(= git commit).\n5. 우측 하단/상단의 'Sync Changes' 버튼을 누르면 push·pull 이 한 번에 처리된다.",
      "note": "CLI의 add·commit·push가 VS Code에서 어떤 버튼인지 대응시켜 두면 터미널과 GUI를 자유롭게 오갈 수 있다."
    },
    {
      "title": "변경 확인(diff)과 되돌리기 3형제 직접 비교해 보기",
      "lang": "bash",
      "code": "# (준비) note.txt 를 만들고 첫 커밋을 하나 만들어 둔 상태로 시작\necho \"1번 줄\" > note.txt        # note.txt 에 첫 줄 작성\ngit add note.txt && git commit -m \"init: note 생성\"  # 기준이 될 첫 커밋\n\n# --- (A) restore: 아직 add 안 한 편집 버리기 ---\necho \"실수로 지움\" > note.txt     # 파일을 통째로 잘못 덮어씀\ngit diff                       # 무엇이 바뀌었는지 확인(-1번줄 +실수로지움)\ngit restore note.txt           # 마지막 커밋 상태로 되돌림 → note.txt 는 다시 '1번 줄'\n\n# --- (B) reset --soft: 방금 한 '내 컴퓨터 안의' 커밋만 무르기 ---\necho \"2번 줄\" >> note.txt        # 둘째 줄 추가\ngit commit -am \"feat: 2번 줄 추가\"  # 커밋했는데 메시지를 잘못 썼다고 가정\ngit reset --soft HEAD~1        # 커밋만 취소(파일 내용·스테이지는 그대로 유지)\ngit commit -am \"feat: 본문에 2번 줄 추가\"  # 메시지를 고쳐 다시 커밋\n\n# --- (C) revert: 이미 공유한(push한) 커밋을 안전하게 취소 ---\ngit log --oneline              # 취소할 커밋의 7자리 번호 확인(예: a1b2c3d)\ngit revert a1b2c3d             # 그 변경을 반대로 되돌리는 '새 커밋'을 추가\n# → 역사를 지우지 않으므로 이미 push해 남과 공유한 상황에서도 안전하다",
      "note": "restore=커밋 전 편집 취소, reset=내 커밋 무르기, revert=공유된 커밋을 새 커밋으로 취소.\n실무에서 '이미 올린 걸 되돌릴 때는 reset 말고 revert' 라는 규칙만 지켜도 협업 사고를 막는다."
    },
    {
      "title": "clone → pull → push: 원격 저장소로 협업 왕복하기",
      "lang": "bash",
      "code": "# 1) 팀 저장소를 내 컴퓨터로 처음 복제(이력까지 통째로 내려옴)\ngit clone https://github.com/team/team-project.git\ncd team-project                # 복제된 폴더 안으로 이동\n\n# 2) [작업 시작 전 필수] 원격 최신 변경을 먼저 받아 합친다\ngit pull origin main           # 남이 올린 커밋을 내 것과 합침(안 하면 나중에 충돌↑)\n\n# 3) 내 작업을 하고 평소처럼 커밋\necho \"내 소개\" > about-me.md      # 파일 하나 만들어\ngit add about-me.md            # 스테이지에 담고\ngit commit -m \"docs: 자기소개 추가\"  # 커밋으로 저장\n\n# 4) 내 커밋을 원격으로 올린다\ngit push origin main           # GitHub 로 업로드\n\n# 5) 만약 push가 거절되면(남이 먼저 올린 경우) → pull로 최신 합치고 다시 push\n#   ! [rejected] ... (fetch first)   ← 이런 메시지가 뜨면\ngit pull origin main           # 원격 최신을 먼저 받아 합치고\ngit push origin main           # 다시 올리면 성공\n\n# 참고) 합치지 않고 원격에 뭐가 새로 올라왔는지 '확인만' 하고 싶을 때\ngit fetch                      # 가져오되 내 브랜치에 합치지는 않음\ngit log --oneline origin/main  # 원격 쪽 최신 커밋 목록만 살펴보기",
      "note": "핵심 습관은 '작업 전 pull, 작업 후 push' 순서다.\npush가 거절되는 건 오류가 아니라 '너 지금 최신이 아니야' 라는 신호이니, pull 한 번으로 해결한다."
    },
    {
      "title": "SSH 키 만들어 GitHub에 등록하고 연결 확인하기",
      "lang": "bash",
      "code": "# 1) 개인키·공개키 한 쌍 생성(-t 방식 ed25519, -C 는 식별용 메모)\nssh-keygen -t ed25519 -C \"me@team.com\"\n#   저장 위치를 물으면 그냥 Enter (기본: ~/.ssh/id_ed25519)\n#   암호(passphrase)는 Enter 두 번으로 비워도 되고, 넣으면 더 안전\n#   → id_ed25519(개인키, 비밀) 와 id_ed25519.pub(공개키, 공유용) 두 파일 생성\n\n# 2) '공개키' 내용만 화면에 출력해서 통째로 복사(개인키는 절대 복사·공유 금지!)\ncat ~/.ssh/id_ed25519.pub\n#   출력 예: ssh-ed25519 AAAAC3Nza...(긴 문자열)... me@team.com\n\n# 3) GitHub 웹 → Settings → SSH and GPG keys → New SSH key\n#    Title 아무거나, Key 칸에 위에서 복사한 '공개키' 붙여넣고 저장\n\n# 4) 연결이 되는지 확인(처음엔 yes 입력해 신뢰 등록)\nssh -T git@github.com\n#   성공 메시지: Hi 홍길동! You've successfully authenticated ...\n\n# 5) 이제 원격 주소를 SSH 방식으로 쓰면 매번 토큰 입력 없이 push/pull 가능\ngit remote set-url origin git@github.com:team/team-project.git",
      "note": "공개키(.pub)는 자물쇠라 남에게 줘도 되지만, 개인키는 그 자물쇠를 여는 유일한 열쇠라 내 컴퓨터 밖으로 절대 내보내지 않는다.\n한 번 등록해 두면 이후 GitHub 인증이 자동으로 된다."
    }
  ],
  "transformer-1": [
    {
      "title": "토크나이저로 문장을 토큰으로 쪼개기",
      "lang": "python",
      "code": "from transformers import AutoTokenizer            # 허깅페이스 토크나이저 불러오기\n\ntok = AutoTokenizer.from_pretrained(\"bert-base-uncased\")  # 사전학습 BERT 토크나이저 로드\nsentence = \"Transformers are amazing!\"             # 쪼갤 예문\nids = tok(sentence)[\"input_ids\"]                   # 문장을 토큰 ID 리스트로 변환\nprint(tok.convert_ids_to_tokens(ids))              # 결과: ['[CLS]', 'transformers', 'are', 'amazing', '!', '[SEP]']",
      "note": "한 단어가 여러 부분단어로 쪼개질 수 있고, 문장 앞뒤에 [CLS]·[SEP] 특수 토큰이 붙는 것을 확인한다."
    },
    {
      "title": "softmax로 '집중 비율' 만들어 보기",
      "lang": "python",
      "code": "import numpy as np                                # 수치 계산 라이브러리\n\nscores = np.array([2.0, 1.0, 0.1])                 # 세 토큰에 대한 원점수(아무 값)\nexp = np.exp(scores - scores.max())                # 최댓값 빼고 지수화(오버플로 방지)\nweights = exp / exp.sum()                           # 합이 1이 되도록 정규화\nprint(np.round(weights, 3))                         # 결과: [0.659 0.242 0.099]\nprint(\"합:\", weights.sum())                         # 결과: 합: 1.0",
      "note": "점수가 가장 큰 항목이 가장 큰 비율을 가져가고, 전체 합은 항상 1이 된다."
    },
    {
      "title": "토큰의 임베딩 벡터를 직접 꺼내 보기",
      "lang": "python",
      "code": "import torch                                       # 딥러닝 텐서 계산 라이브러리\nfrom transformers import AutoTokenizer, AutoModel  # 토크나이저와 모델 불러오기\n\ntok = AutoTokenizer.from_pretrained(\"bert-base-uncased\")  # BERT 토크나이저 로드\nmodel = AutoModel.from_pretrained(\"bert-base-uncased\")    # BERT 본체 로드\nmodel.eval()                                     # 추론 모드로 전환(학습 끔)\n\nsentence = \"I love AI\"                            # 임베딩을 꺼내 볼 예문\ninputs = tok(sentence, return_tensors=\"pt\")      # 문장을 토큰 ID 텐서로 변환\nprint(\"토큰:\", tok.convert_ids_to_tokens(inputs[\"input_ids\"][0]))\n# 결과: 토큰: ['[CLS]', 'i', 'love', 'ai', '[SEP]']\n\nwith torch.no_grad():                            # 기울기 계산 끔(추론이라 불필요)\n    out = model(**inputs)                        # 모델에 넣어 각 토큰의 벡터를 얻음\n\nvecs = out.last_hidden_state                     # (문장수, 토큰수, 768) 임베딩 텐서\nprint(\"shape:\", vecs.shape)                      # 결과: shape: torch.Size([1, 5, 768])\n\n# 'love'(세 번째=index 2) 토큰의 벡터에서 앞 5개 숫자만 미리보기\nprint(\"love 벡터 앞 5개:\", vecs[0, 2, :5].round(decimals=3))\n# 결과 예: love 벡터 앞 5개: tensor([-0.312, 0.148, 0.027, -0.559, 0.203])",
      "note": "글자였던 토큰이 768개 숫자로 된 벡터로 바뀌어 나오는 것을 눈으로 확인한다. 이 768차원 벡터 하나하나가 '의미 지도 위의 좌표'이며, 오후에 배울 Attention은 바로 이 벡터들을 서로 비교·가중합하는 계산이다."
    }
  ],
  "transformer-2": [
    {
      "title": "BERT(빈칸 채우기)로 [MASK] 예측하기",
      "lang": "python",
      "code": "from transformers import pipeline                  # 간편 추론 파이프라인 불러오기\n\nfill = pipeline(\"fill-mask\", model=\"bert-base-uncased\")  # 빈칸 채우기 파이프라인 생성\nresult = fill(\"Paris is the [MASK] of France.\")     # [MASK] 자리에 올 단어 예측\nprint(result[0][\"token_str\"], round(result[0][\"score\"], 3))  # 결과: capital 0.9 근처",
      "note": "BERT는 양방향으로 문맥을 읽어 빈칸에 가장 어울리는 단어를 높은 확률로 채운다."
    },
    {
      "title": "GPT-2(이어 쓰기)로 문장 생성하기",
      "lang": "python",
      "code": "from transformers import pipeline                  # 추론 파이프라인 불러오기\n\ngen = pipeline(\"text-generation\", model=\"gpt2\")     # 텍스트 생성 파이프라인 생성\nout = gen(\"The future of AI is\", max_length=20, num_return_sequences=1)  # 문장 이어쓰기\nprint(out[0][\"generated_text\"])                     # 결과: 입력에 이어 자연스러운 영어 문장 출력",
      "note": "GPT-2는 왼쪽부터 다음 토큰을 차례로 예측하며 문장을 만들어내는 Decoder-only 모델이다."
    },
    {
      "title": "밑바닥부터 만드는 초소형 언어모델(bigram 카운트 기반)",
      "lang": "python",
      "code": "import numpy as np\n# 아주 작은 말뭉치\ntext = 'i love ai i love code i love you'\nwords = text.split()\nvocab = sorted(set(words))              # 단어 사전\nw2i = {w: i for i, w in enumerate(vocab)}  # 단어->번호\nn = len(vocab)\n# 1) bigram 카운트 표: '앞 단어' 다음에 '뒷 단어'가 몇 번 왔나\ncounts = np.zeros((n, n))\nfor a, b in zip(words[:-1], words[1:]):\n    counts[w2i[a], w2i[b]] += 1\n# 2) 각 행을 확률로 정규화 = 다음-단어 확률 분포 (이것이 언어모델!)\nprobs = counts / counts.sum(axis=1, keepdims=True)\n# 3) 'i' 다음에 올 단어를 확률로 예측\nrow = probs[w2i['i']]\nfor w in vocab:\n    print(w, round(row[w2i[w]], 2))     # love가 가장 높게 나옴\n",
      "note": "외부 모델 없이 단어쌍 빈도를 세어 확률로 바꾸는 것만으로도 가장 단순한 언어모델이 만들어진다. GPT는 이 bigram 표를 Transformer라는 거대한 함수로 바꾸고 훨씬 긴 앞 문맥을 보게 한 확장판일 뿐임을 체감한다."
    }
  ],
  "python-1": [
    {
      "title": "제너레이터로 대용량 파일을 메모리 아끼며 처리하기",
      "lang": "python",
      "code": "# 파일을 한 줄씩 흘려보내는 제너레이터(전체를 메모리에 올리지 않는다)\ndef read_lines(path):\n    with open(path, encoding='utf-8') as f:\n        for line in f:      # 파일 객체는 한 줄씩 순회할 수 있다\n            yield line       # return 이 아니라 yield: 한 줄을 내주고 멈췄다 재개\n\n# sum 이 제너레이터에서 한 줄씩 받아 길이를 더한다(리스트로 전부 읽지 않음)\ntotal = sum(len(l) for l in read_lines('big.log'))\nprint('전체 글자 수:', total)  # 수 GB 로그도 적은 메모리로 처리 가능",
      "note": "리스트는 모든 줄을 한꺼번에 메모리에 올리지만, yield 제너레이터는 한 줄씩 흘려보내 큰 파일도 견딘다."
    },
    {
      "title": "dataclass로 데이터 레코드 깔끔하게 정의하기",
      "lang": "python",
      "code": "from dataclasses import dataclass  # 반복되는 __init__ 을 자동으로 만들어 준다\n\n@dataclass\nclass Order:\n    name: str    # 상품명\n    qty: int     # 수량\n    price: int   # 단가\n\norder = Order('사과', 3, 1000)   # 생성자를 직접 안 써도 필드 순서로 만들어진다\nprint(order.price)               # 결과: 1000 (점으로 필드 접근)\nprint(order)                     # 결과: Order(name='사과', qty=3, price=1000)",
      "note": "@dataclass 한 줄이면 생성자·출력 형식이 자동 생성되어 데이터 묶음을 짧게 표현할 수 있다."
    },
    {
      "title": "Pydantic으로 입력값 검증하기",
      "lang": "python",
      "code": "from pydantic import BaseModel, Field, ValidationError\n\n# 가격은 0보다 커야 한다는 규칙(gt=0)을 스키마에 새긴다\nclass OrderIn(BaseModel):\n    name: str\n    price: int = Field(gt=0)\n\n# 올바른 입력은 통과하고 model_dump()로 dict 변환할 수 있다\nok = OrderIn(name='사과', price=1000)\nprint(ok.model_dump())  # 결과: {'name': '사과', 'price': 1000}\n\n# 규칙을 어기면(음수 가격) ValidationError 로 걸러진다\ntry:\n    OrderIn(name='사과', price=-1)\nexcept ValidationError as e:\n    print('검증 실패:', e.errors()[0]['msg'])  # 결과: 검증 실패: Input should be greater than 0",
      "note": "dataclass는 형태만 잡지만, Pydantic은 값의 규칙(양수·형식)까지 검사해 잘못된 입력을 자동으로 막아 준다."
    },
    {
      "title": "functools·파일 IO·pathlib·예외를 한 흐름으로 (5교시 시연)",
      "lang": "python",
      "code": "from functools import reduce           # 목록을 하나의 값으로 '접는' 도구\nfrom pathlib import Path              # OS에 상관없이 안전하게 경로를 다룬다\nimport json                          # JSON 파일 읽고 쓰기\n\n# 1) 여러 주문 금액을 map/filter/reduce 로 한 줄씩 처리한다\nprices = [12000, -1, 35000, 0, 8000]\nvalid = list(filter(lambda p: p > 0, prices))   # 0 이하(잘못된 값)를 걸러낸다\nwith_tax = list(map(lambda p: int(p * 1.1), valid))  # 모든 값에 부가세 10% 적용\ntotal = reduce(lambda a, b: a + b, with_tax)    # 누적 합계로 접는다\nprint('부가세 합계:', total)                    # 결과: 부가세 합계: 60500\n\n# 2) pathlib 로 경로를 만들고 JSON 으로 저장한다 (문자열 '+' 대신 / 연산)\nout = Path('data') / 'summary.json'             # data/summary.json 경로 객체\nout.parent.mkdir(exist_ok=True)                 # data 폴더가 없으면 만든다\nout.write_text(json.dumps({'total': total}, ensure_ascii=False), encoding='utf-8')\n\n# 3) 없을 수도 있는 파일을 예외 처리로 안전하게 읽는다\ntry:\n    raw = Path('data/summary.json').read_text(encoding='utf-8')\n    print('저장된 값:', json.loads(raw))         # 결과: 저장된 값: {'total': 60500}\nexcept FileNotFoundError:\n    print('파일이 없어 건너뜀')                   # 터지지 않고 다음으로 진행\n",
      "note": "filter→map→reduce 로 반복문을 압축하고, pathlib 로 경로를, try/except 로 없는 파일을 안전하게 넘기는 실무 파이프라인의 뼈대다."
    },
    {
      "title": "pytest 로 정제 함수 테스트하고 Ruff 로 정리 (7교시 시연)",
      "lang": "python",
      "code": "# clean.py - 테스트 대상이 되는 정제 함수\ndef clean_prices(prices):\n    '''0 이하 값을 걸러내고 정상 금액만 돌려준다.'''\n    return [p for p in prices if p is not None and p > 0]\n\n# test_clean.py - pytest 가 자동으로 찾아 실행하는 테스트 파일\n# (파일명 test_ 로 시작, 함수명도 test_ 로 시작해야 인식된다)\nfrom clean import clean_prices\n\ndef test_음수와_None_이_제거된다():\n    # given: 정상값 2개 + 잘못된 값 3개\n    result = clean_prices([12000, -1, None, 0, 8000])\n    # then: 정상값 2개만 남아야 한다\n    assert result == [12000, 8000]\n\ndef test_빈_목록은_빈_목록을_돌려준다():\n    assert clean_prices([]) == []\n\n# 터미널에서 실행:\n#   pytest            -> .. 처럼 통과 개수가 뜨고, 틀리면 어디가 왜 틀렸는지 보여준다\n#   ruff check .      -> 사용 안 한 import, 스타일 오류를 찾아 준다\n#   ruff format .     -> 들여쓰기·따옴표를 자동으로 통일한다\n",
      "note": "assert 로 '기대값'을 코드에 박아 두면, 나중에 함수를 잘못 고쳤을 때 pytest 가 즉시 빨간불을 켜 준다. Ruff 는 검사와 정리를 한 번에 한다."
    },
    {
      "title": "asyncio·httpx 로 여러 API를 동시에 수집 (8교시 시연)",
      "lang": "python",
      "code": "import asyncio          # 비동기 실행을 관리하는 표준 라이브러리\nimport httpx            # async 를 지원하는 최신 HTTP 클라이언트\n\n# 한 개의 주소를 비동기로 받아오는 코루틴(async 함수)\nasync def fetch(client, url):\n    r = await client.get(url)      # await: 응답을 기다리는 동안 다른 일을 양보\n    return r.status_code           # 상태코드만 돌려준다(200 이면 성공)\n\nasync def main():\n    urls = [f'https://httpbin.org/delay/1' for _ in range(5)]  # 각 1초 지연되는 5개\n    async with httpx.AsyncClient(timeout=10) as client:\n        # gather: 5개 요청을 순서대로가 아니라 '동시에' 띄운다\n        results = await asyncio.gather(*[fetch(client, u) for u in urls])\n    print('응답 코드들:', results)   # 결과: 응답 코드들: [200, 200, 200, 200, 200]\n\n# 순서대로면 5초, 동시 처리면 약 1초 - 기다림을 겹쳐 시간을 아낀다\nasyncio.run(main())\n",
      "note": "각 요청이 1초씩 걸려도 gather 로 동시에 띄우면 전체가 약 1초에 끝난다. 네트워크처럼 '기다림이 많은' 작업에서 asyncio 의 효과가 가장 크다."
    }
  ],
  "python-2": [
    {
      "title": "DataFrame 만들고 열 선택하기",
      "lang": "python",
      "code": "import pandas as pd  # Pandas 불러오기\n# 딕셔너리로 표를 만든다(키=열 이름, 값=열 데이터)\ndf = pd.DataFrame({'이름': ['A', 'B', 'C'], '점수': [90, 70, 85]})\nprint(df['점수'].mean())  # '점수' 열의 평균 → 결과: 81.666...",
      "note": "딕셔너리 하나만 있으면 바로 표(DataFrame)를 만들 수 있다."
    },
    {
      "title": "조건으로 행 필터링하기",
      "lang": "python",
      "code": "import pandas as pd\ndf = pd.DataFrame({'이름': ['A', 'B', 'C'], '점수': [90, 70, 85]})\n# 대괄호 안에 조건을 넣으면 참인 행만 남는다\nhigh = df[df['점수'] >= 80]  # 80점 이상만 선택\nprint(len(high))             # 선택된 행 개수 → 결과: 2",
      "note": "df[조건] 형태가 Pandas 에서 데이터를 골라내는 가장 기본적인 방법이다."
    },
    {
      "title": "groupby로 그룹별 평균 내기",
      "lang": "python",
      "code": "import pandas as pd\ndf = pd.DataFrame({'반': ['1', '1', '2'], '점수': [90, 80, 70]})\n# '반'으로 묶어 각 반의 평균 점수를 구한다\nprint(df.groupby('반')['점수'].mean())  # 결과: 1반 85.0, 2반 70.0",
      "note": "groupby 는 같은 항목끼리 모아 통계 내기의 핵심 도구다."
    },
    {
      "title": "Polars Lazy API - 계획을 쌓고 한 번에 실행 (3교시 시연)",
      "lang": "python",
      "code": "import polars as pl     # Pandas보다 빠른 최신 데이터프레임 라이브러리\n\n# scan_csv: 파일을 '지금 읽지 않고' 읽을 계획만 세운다(Lazy)\nlazy = pl.scan_csv('sales.csv')\n\n# filter·group_by·agg 를 이어 붙여도 아직 실행되지 않는다 - 계획만 쌓인다\nplan = (\n    lazy\n    .filter(pl.col('amount') > 0)                # 정상 금액만\n    .group_by('region')                          # 지역별로 묶어\n    .agg(pl.col('amount').mean().alias('avg'))    # 평균 매출 계산\n)\n\n# collect() 를 부르는 순간, Polars가 쌓인 계획을 '최적화해서' 한 번에 실행한다\n# (예: 필요 없는 열은 아예 읽지 않아 Pandas보다 빠르고 메모리도 적게 쓴다)\nresult = plan.collect()\nprint(result)   # 결과: region별 평균 매출 표\n",
      "note": "Pandas는 한 줄마다 즉시 실행하지만, Polars Lazy는 collect() 전까지 계획만 쌓다가 통째로 최적화해 실행한다. 대용량일수록 이 차이가 속도로 나타난다."
    },
    {
      "title": "Plotly Express 로 인터랙티브 차트 한 줄 (5교시 시연)",
      "lang": "python",
      "code": "import plotly.express as px   # 인터랙티브 차트를 한 줄로 그려 주는 라이브러리\n\ndf = px.data.tips()          # 연습용 식당 팁 데이터(내장)\n\n# 산점도: 결제액(x) 대비 팁(y), 점 색은 흡연 여부로 구분\n# 마우스를 올리면 값이 뜨고, 드래그로 확대·축소가 되는 차트가 만들어진다\nfig = px.scatter(\n    df, x='total_bill', y='tip',\n    color='smoker',           # 범주별로 색을 나눈다\n    size='size',              # 점 크기 = 일행 인원 수\n    title='결제액 대비 팁 (인터랙티브)'\n)\n\nfig.write_html('tip_scatter.html')  # HTML로 저장하면 브라우저에서 만져 볼 수 있다\n# 주피터에서는 fig.show() 로 바로 확인\nprint('차트 저장 완료')\n",
      "note": "Matplotlib이 정적 이미지라면 Plotly는 마우스로 만지는 차트다. write_html로 저장하면 코드를 모르는 동료도 브라우저에서 확대·필터해 볼 수 있다."
    },
    {
      "title": "t-검정으로 두 그룹 차이가 우연인지 확인 (6교시 시연)",
      "lang": "python",
      "code": "from scipy import stats     # 통계 검정 함수가 모인 라이브러리\nimport seaborn as sns\n\ndf = sns.load_dataset('tips')\n\n# 흡연 그룹과 비흡연 그룹의 '팁 금액'을 각각 뽑는다\nsmoker = df[df['smoker'] == 'Yes']['tip']\nnonsmoker = df[df['smoker'] == 'No']['tip']\n\nprint('흡연 평균:', round(smoker.mean(), 2))      # 눈에 보이는 평균 차이\nprint('비흡연 평균:', round(nonsmoker.mean(), 2))\n\n# 독립표본 t-검정: 두 그룹 평균 차이가 '통계적으로 의미 있는가'를 따진다\nt, p = stats.ttest_ind(smoker, nonsmoker)\nprint('p-value:', round(p, 3))\n\n# 판정 규칙: p < 0.05 면 '우연이라 보기 어렵다(의미 있는 차이)', 아니면 '차이가 있다고 보기 어렵다'\nif p < 0.05:\n    print('=> 두 그룹의 팁은 통계적으로 유의하게 다르다')\nelse:\n    print('=> 평균은 달라 보여도 우연일 수 있어 단정할 수 없다')\n",
      "note": "평균 숫자가 달라 보여도 표본이 적으면 우연일 수 있다. p-value가 0.05보다 작을 때만 '의미 있는 차이'라고 말하는 습관이 분석의 신뢰도를 지킨다."
    },
    {
      "title": "sklearn Pipeline 으로 전처리+모델을 한 덩어리로 저장 (7교시 시연)",
      "lang": "python",
      "code": "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler   # 스케일 맞추기(전처리)\nfrom sklearn.linear_model import LogisticRegression # 분류 모델\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nimport joblib   # 학습된 파이프라인을 파일로 저장/불러오기\n\nX, y = load_iris(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)\n\n# 전처리(스케일러)와 모델을 한 줄로 묶는다 - 학습·예측에 '같은 처리'가 보장된다\npipe = Pipeline([\n    ('scaler', StandardScaler()),          # 1단계: 값의 크기를 표준화\n    ('model', LogisticRegression(max_iter=200)),  # 2단계: 모델 학습\n])\n\npipe.fit(X_tr, y_tr)                        # 전처리+학습이 한 번에 진행된다\nprint('정확도:', round(pipe.score(X_te, y_te), 3))\n\n# 파이프라인을 통째로 저장하면, 나중에 불러와 바로 예측할 수 있다(재현성 확보)\njoblib.dump(pipe, 'model.joblib')\nloaded = joblib.load('model.joblib')       # 다른 곳에서 그대로 불러오기\nprint('불러온 모델 예측:', loaded.predict(X_te[:3]))\n",
      "note": "전처리를 예측 때 빠뜨리는 실수를 Pipeline이 원천 차단한다. joblib으로 통째 저장하면 '학습한 그대로'를 다른 환경에서 재현할 수 있다."
    }
  ],
  "prompt-1": [
    {
      "title": "토큰 개수 세어 보기 (비용·길이 감 잡기)",
      "lang": "python",
      "code": "# 토큰을 세 주는 tiktoken 라이브러리를 불러온다\nimport tiktoken\n\n# gpt-4o 계열이 쓰는 토큰 변환기(인코더)를 가져온다\nenc = tiktoken.get_encoding(\"o200k_base\")\n\n# 길이를 재 볼 예시 문장\ntext = \"프롬프트 엔지니어링은 정말 재미있다\"\n\n# 문장을 토큰 숫자 목록으로 바꾼다 (모델이 보는 형태)\ntokens = enc.encode(text)\n\n# 토큰이 몇 개인지 출력한다\nprint(\"토큰 개수:\", len(tokens))   # 결과 예: 토큰 개수: 9\n",
      "note": "글자 수가 아니라 '토큰 수'가 비용·길이의 기준임을 직접 눈으로 확인하는 예제다."
    },
    {
      "title": "Chain-of-Thought 한 줄로 정답률 높이기",
      "lang": "python",
      "code": "# OpenAI 클래스를 불러온다\nfrom openai import OpenAI\n\n# 클라이언트 생성 (키는 본인 것으로 교체)\nclient = OpenAI(api_key=\"sk-본인키\")\n\n# 풀기 어려운 계산 문제 + '차근차근 생각하라'는 CoT 유도 문구\nq = \"사과 3개에 600원이면 사과 7개는 얼마? 단계별로 차근차근 계산해줘.\"\n\n# 모델에 질문을 보낸다\nres = client.chat.completions.create(\n    model=\"gpt-4o-mini\",                 # 사용할 모델\n    messages=[{\"role\": \"user\", \"content\": q}],  # 사용자 질문 한 개\n)\n\n# 모델의 답(풀이 과정 + 정답)을 출력한다\nprint(res.choices[0].message.content)    # 결과 예: 사과 1개=200원 ... 따라서 1400원\n",
      "note": "'단계별로 차근차근'이라는 한 문장만 추가해도 복잡한 문제의 정답률이 눈에 띄게 오른다."
    },
    {
      "title": "Zero-shot vs Few-shot 나란히 비교하기 (4교시 시연)",
      "lang": "python",
      "code": "# OpenAI 클래스를 불러온다\nfrom openai import OpenAI\n\n# 클라이언트 생성 (키는 본인 것으로 교체)\nclient = OpenAI(api_key=\"sk-본인키\")\n\n# 감정을 판단할 리뷰 한 문장\nreview = \"화면은 예쁜데 배터리가 반나절도 안 간다\"\n\n# 1) Zero-shot: 예시 없이 지시만 준다\nzero = client.chat.completions.create(\n    model=\"gpt-4o-mini\",\n    messages=[{\"role\": \"user\", \"content\": f\"다음 리뷰의 감정을 한 단어로: {review}\"}],\n    temperature=0,                       # 일관된 답을 위해 0으로 고정\n)\nprint(\"[Zero-shot]\", zero.choices[0].message.content)  # 형식이 흔들릴 수 있음\n\n# 2) Few-shot: 정답 예시 2개로 '긍정/부정' 형식을 고정한다\nshots = (\n    \"리뷰: 배송이 빠르고 포장도 꼼꼼해요 → 긍정\\n\"   # 예시1\n    \"리뷰: 설명과 다르게 크기가 너무 작아요 → 부정\\n\"  # 예시2\n)\nfew = client.chat.completions.create(\n    model=\"gpt-4o-mini\",\n    messages=[{\"role\": \"user\", \"content\": shots + f\"리뷰: {review} →\"}],\n    temperature=0,\n)\nprint(\"[Few-shot]\", few.choices[0].message.content)     # '긍정/부정' 형식을 따라감\n",
      "note": "Zero-shot은 '아쉬움/부정적' 처럼 표현이 제각각일 수 있지만, Few-shot은 예시가 정한 '긍정/부정' 두 값으로 답이 일정해진다. 형식을 고정하고 싶을 때 예시 몇 개가 지시 열 줄보다 강하다는 것을 눈으로 확인하는 예제다."
    },
    {
      "title": "System·User·Assistant 멀티턴 대화 이어가기 (5교시 시연)",
      "lang": "python",
      "code": "# OpenAI 클래스를 불러온다\nfrom openai import OpenAI\n\n# 클라이언트 생성 (키는 본인 것으로 교체)\nclient = OpenAI(api_key=\"sk-본인키\")\n\n# 대화 맥락을 리스트에 차곡차곡 쌓아 간다\nmessages = [\n    # system: 대화 전체에 깔리는 규칙·역할 (무대 설정)\n    {\"role\": \"system\", \"content\": \"너는 친절한 여행 플래너다. 답은 항상 3줄 이내로 한다.\"},\n    # user: 사용자의 첫 요청\n    {\"role\": \"user\", \"content\": \"제주도 2박3일 일정 짜줘\"},\n]\n\n# 첫 번째 답을 받는다\nres = client.chat.completions.create(model=\"gpt-4o-mini\", messages=messages, temperature=0.7)\nanswer = res.choices[0].message.content\nprint(\"AI:\", answer)\n\n# 방금 받은 답을 assistant 메시지로 대화에 다시 넣어야 맥락이 이어진다\nmessages.append({\"role\": \"assistant\", \"content\": answer})\n# 앞 답을 기억한 채로 후속 요청을 던진다\nmessages.append({\"role\": \"user\", \"content\": \"둘째 날만 실내 위주로 바꿔줘\"})\n\n# 두 번째 답 (이전 일정을 기억하고 수정해 준다)\nres2 = client.chat.completions.create(model=\"gpt-4o-mini\", messages=messages, temperature=0.7)\nprint(\"AI:\", res2.choices[0].message.content)\n",
      "note": "system의 '3줄 이내' 규칙은 한 번만 넣어도 모든 턴에 유지된다. 그리고 이전 답(assistant)을 다시 리스트에 넣어야 모델이 '둘째 날'이 무엇인지 기억한다 — 이것이 역할 분리와 맥락 유지의 핵심이다."
    }
  ],
  "vue-1": [
    {
      "title": "ref 로 만든 반응형 카운터",
      "lang": "vue",
      "code": "<script setup>\n// 반응형 값을 만드는 ref 함수를 가져온다\nimport { ref } from 'vue'\n// 숫자 0 을 반응형으로 감싼 카운터 상태를 만든다\nconst count = ref(0)\n// 버튼을 누르면 카운터를 1 증가시키는 함수(자바스크립트에서는 .value 필요)\nfunction plus() { count.value++ }\n</script>\n\n<template>\n  <!-- 현재 카운트를 화면에 출력한다(템플릿에서는 .value 없이 바로 사용) -->\n  <p>현재 값: {{ count }}</p>\n  <!-- 버튼 클릭 시 plus 실행, 누를 때마다 위 숫자가 1씩 증가 -->\n  <button @click=\"plus\">+1</button>\n</template>",
      "note": "버튼을 누르면 count.value 만 바꿔도 화면 숫자가 자동으로 올라간다."
    },
    {
      "title": "v-if 와 v-for 디렉티브",
      "lang": "vue",
      "code": "<script setup>\n// 반응형 배열을 만들기 위해 ref 를 가져온다\nimport { ref } from 'vue'\n// 과일 이름 3개를 담은 반응형 배열\nconst fruits = ref(['사과', '바나나', '포도'])\n</script>\n\n<template>\n  <!-- 배열이 비어 있지 않을 때만(v-if 조건 참) 목록을 보여준다 -->\n  <ul v-if=\"fruits.length > 0\">\n    <!-- v-for 로 과일을 하나씩 꺼내 li 로 출력, key 로 인덱스 i 사용 -->\n    <li v-for=\"(f, i) in fruits\" :key=\"i\">{{ i + 1 }}. {{ f }}</li>\n  </ul>\n  <!-- 위 조건이 거짓이면(배열이 비면) 이 문구를 대신 보여준다 -->\n  <p v-else>과일이 없습니다.</p>\n</template>",
      "note": "v-for 는 반복 출력을, v-if/v-else 는 조건에 따른 화면 분기를 담당한다."
    },
    {
      "title": "이벤트 v-on과 v-model로 만드는 실시간 입력 거울",
      "lang": "vue",
      "code": "<script setup>\n// 반응형 값을 만드는 ref 함수를 가져온다\nimport { ref } from 'vue'\n// 입력창과 연결할 이름 상태(처음엔 빈 문자열)\nconst name = ref('')\n// 인사 횟수를 세는 상태(버튼 클릭마다 1씩 증가)\nconst count = ref(0)\n// 버튼을 눌렀을 때 실행: 인사 횟수를 1 올린다\nfunction greet() {\n  count.value++ // 자바스크립트에서는 .value 로 값에 접근\n}\n</script>\n\n<template>\n  <!-- v-model 로 입력창과 name 을 양방향 연결(타이핑하면 아래 문구가 즉시 바뀜) -->\n  <input v-model=\"name\" placeholder=\"이름을 입력하세요\" />\n  <!-- name 이 비어 있지 않을 때만 인사 문구를 보여준다 -->\n  <p v-if=\"name\">안녕하세요, {{ name }}님!</p>\n  <!-- 비어 있으면 안내 문구를 대신 보여준다 -->\n  <p v-else>이름을 입력해 주세요.</p>\n  <!-- @click 으로 버튼 클릭에 greet 함수를 연결 -->\n  <button @click=\"greet\">인사하기</button>\n  <!-- 클릭할 때마다 늘어나는 인사 횟수를 표시 -->\n  <p>지금까지 {{ count }}번 인사했어요.</p>\n</template>",
      "note": "v-model 은 입력→데이터를 자동으로 채우는 양방향 연결이고, @click(v-on)은 사용자 사건에 함수를 거는 단방향 연결이다. 타이핑이 곧바로 화면에 비치는 '거울 효과'와 클릭이 상태를 바꾸는 흐름을 한 화면에서 함께 체감하게 하는 데모다."
    }
  ],
  "vue-2": [
    {
      "title": "props 로 값 내려주기",
      "lang": "vue",
      "code": "<script setup>\n// 부모에게서 메시지 문자열을 props 로 받는다\ndefineProps({ message: String })\n</script>\n\n<template>\n  <!-- 받은 message 를 그대로 화면에 출력한다 -->\n  <p>부모가 보낸 말: {{ message }}</p>\n</template>",
      "note": "자식은 props 로 받은 값을 읽어 화면에 보여주기만 한다."
    },
    {
      "title": "onMounted 라이프사이클 훅",
      "lang": "vue",
      "code": "<script setup>\n// 컴포넌트가 화면에 나타날 때 실행되는 훅을 가져온다\nimport { onMounted, ref } from 'vue'\n// 표시할 메시지 상태\nconst msg = ref('로딩 중...')\n// 컴포넌트가 화면에 붙은 직후 한 번 실행된다(보통 데이터 불러오기에 사용)\nonMounted(() => {\n  msg.value = '화면이 준비되었습니다!' // 마운트 후 메시지를 바꾼다\n})\n</script>\n\n<template>\n  <!-- 처음엔 '로딩 중', 마운트 후엔 준비 완료 문구가 보인다 -->\n  <p>{{ msg }}</p>\n</template>",
      "note": "onMounted 안은 화면이 그려진 직후 딱 한 번 실행된다."
    },
    {
      "title": "useCounter 컴포저블로 로직 빼내 재사용하기",
      "lang": "vue",
      "code": "<!-- ===== composables/useCounter.js (별도 파일) =====\nimport { ref } from 'vue'                 // 반응형 값을 만드는 ref 를 가져온다\n// use 로 시작하는 컴포저블 함수: 초깃값을 받아 카운터 로직을 돌려준다\nexport function useCounter(start = 0) {\n  const count = ref(start)                // 이 함수만의 독립된 카운터 상태\n  const inc = () => { count.value++ }     // 1 올리는 함수\n  const dec = () => { count.value-- }     // 1 내리는 함수\n  const reset = () => { count.value = start } // 처음 값으로 되돌리는 함수\n  return { count, inc, dec, reset }       // 상태와 함수들을 묶어 반환\n}\n===== 아래는 이 컴포저블을 쓰는 컴포넌트 ===== -->\n<script setup>\n// 방금 만든 컴포저블을 가져온다\nimport { useCounter } from '../composables/useCounter'\n// 좋아요 카운터와 조회수 카운터를 각각 독립적으로 만든다(서로 값이 섞이지 않음)\nconst { count: likes, inc: like } = useCounter(0)\nconst { count: views, inc: view } = useCounter(100)\n</script>\n\n<template>\n  <!-- 같은 로직을 두 곳에서 재사용하지만 값은 각자 따로 관리된다 -->\n  <button @click=\"like\">좋아요 {{ likes }}</button>\n  <button @click=\"view\">조회 {{ views }}</button>\n</template>",
      "note": "반복되던 '카운터 상태+증감 함수'를 useCounter 한 곳에 모아 두면, 컴포넌트는 그것을 꺼내 쓰기만 한다. useCounter()를 호출할 때마다 독립된 count 가 생기므로 좋아요와 조회수가 서로 간섭하지 않는다 — 로직은 공유하되 값은 분리되는 컴포저블의 핵심을 보여주는 데모다."
    }
  ],
  "vue-3": [
    {
      "title": "router-link 로 페이지 이동",
      "lang": "vue",
      "code": "<template>\n  <!-- 클릭하면 새로고침 없이 '/' 화면으로 이동 -->\n  <router-link to=\"/\">홈</router-link>\n  <!-- 클릭하면 1번 상품 상세로 이동 -->\n  <router-link to=\"/product/1\">1번 상품</router-link>\n  <!-- 현재 주소에 맞는 컴포넌트가 이 자리에 그려진다 -->\n  <router-view />\n</template>",
      "note": "router-link 는 이동 버튼, router-view 는 화면이 그려지는 자리다."
    },
    {
      "title": "Pinia 스토어 값 사용하기",
      "lang": "vue",
      "code": "<script setup>\n// 장바구니 스토어를 가져온다\nimport { useCartStore } from '../stores/cart'\n// 스토어 인스턴스를 얻는다(전역 데이터 접근)\nconst cart = useCartStore()\n</script>\n\n<template>\n  <!-- 스토어의 count 게터로 담긴 개수를 헤더에 표시 -->\n  <header>장바구니: {{ cart.count }}개</header>\n</template>",
      "note": "어느 컴포넌트에서든 useCartStore 로 같은 데이터를 바로 읽을 수 있다."
    },
    {
      "title": "Pinia 스토어 정의하기 (stores/cart.js)",
      "lang": "javascript",
      "code": "// src/stores/cart.js - 장바구니 전역 상태를 한 곳에서 관리한다\nimport { defineStore } from 'pinia'\n\n// useCartStore: 어느 컴포넌트에서든 불러 쓰는 전역 스토어\nexport const useCartStore = defineStore('cart', {\n  // state: 보관할 데이터(함수로 초기값을 돌려준다)\n  state: () => ({\n    items: [],  // 담은 상품 목록 [{ id, name, price }]\n  }),\n  // getters: state 를 가공해 읽는 계산값(원본이 바뀌면 자동 갱신)\n  getters: {\n    count: (state) => state.items.length,                          // 담은 개수\n    total: (state) => state.items.reduce((s, i) => s + i.price, 0), // 합계 금액\n  },\n  // actions: state 를 바꾸는 함수(메서드)\n  actions: {\n    add(product) { this.items.push(product) },                       // 상품 담기\n    remove(id) { this.items = this.items.filter(i => i.id !== id) },  // 상품 빼기\n  },\n})",
      "note": "state(데이터)·getters(계산값)·actions(변경함수) 세 칸만 채우면 앱 어디서든 공유하는 전역 스토어가 완성된다."
    },
    {
      "title": "Router 가드로 로그인 안 한 사용자 막기 (beforeEach)",
      "lang": "javascript",
      "code": "// src/router/index.js - 라우터에 문지기를 달아 접근을 통제한다\nimport { createRouter, createWebHashHistory } from 'vue-router'\nimport Home from '../views/Home.vue'\nimport MyPage from '../views/MyPage.vue'\nimport Login from '../views/Login.vue'\n\nconst routes = [\n  { path: '/', component: Home },\n  // meta.requiresAuth 로 '로그인 필요' 표시를 붙여 둔다\n  { path: '/mypage', component: MyPage, meta: { requiresAuth: true } },\n  { path: '/login', component: Login },\n]\n\nconst router = createRouter({ history: createWebHashHistory(), routes })\n\n// beforeEach: 모든 이동 직전에 실행되는 전역 가드(문지기)\nrouter.beforeEach((to) => {\n  const isLoggedIn = !!localStorage.getItem('token')  // 로그인 여부(예시)\n  // 보호 페이지인데 로그인 안 했으면 로그인 화면으로 돌려보낸다\n  if (to.meta.requiresAuth && !isLoggedIn) {\n    return { path: '/login' }  // 이 객체를 return 하면 그 주소로 리다이렉트된다\n  }\n  // 아무것도 return 하지 않으면(또는 true) 원래 가려던 곳으로 통과한다\n})\n\nexport default router",
      "note": "beforeEach 가드는 화면이 그려지기 전에 로그인·권한을 검사해 보호가 필요한 페이지를 지켜 준다."
    }
  ],
  "vue-4": [
    {
      "title": "async/await 로 데이터 불러오기",
      "lang": "javascript",
      "code": "// HTTP 요청 라이브러리를 가져온다\nimport axios from 'axios'\n\n// 사용자 정보를 비동기로 불러오는 함수\nasync function getUser() {\n  // 1번 사용자 정보를 요청하고 응답을 기다린다\n  const res = await axios.get('https://jsonplaceholder.typicode.com/users/1')\n  // 받은 데이터에서 이름을 출력한다(예: Leanne Graham)\n  console.log(res.data.name)\n}\n\n// 함수를 실행해 결과를 확인한다\ngetUser()",
      "note": "await 는 응답이 올 때까지 기다린 뒤 다음 줄로 넘어간다."
    },
    {
      "title": "폼 유효성 검사",
      "lang": "vue",
      "code": "<script setup>\n// 반응형 상태를 위해 ref 를 가져온다\nimport { ref } from 'vue'\n// 입력값과 경고 메시지 상태\nconst title = ref('')\nconst warn = ref('')\n\n// 제출 시 제목이 비었는지 검사하는 함수\nfunction submit() {\n  // 공백 제거 후 비어 있으면 경고를 띄우고 중단\n  if (title.value.trim() === '') { warn.value = '제목을 입력하세요'; return }\n  // 통과하면 경고를 지운다(실제로는 서버 전송)\n  warn.value = ''\n}\n</script>\n\n<template>\n  <!-- 제목 입력창을 title 과 양방향 연결 -->\n  <input v-model=\"title\" placeholder=\"제목\" />\n  <!-- 제출 버튼: 클릭 시 submit 실행 -->\n  <button @click=\"submit\">등록</button>\n  <!-- 경고가 있을 때만 빨간 문구 표시 -->\n  <p v-if=\"warn\" style=\"color:red\">{{ warn }}</p>\n</template>",
      "note": "입력값을 검사해 비어 있으면 서버 전송 전에 막아 준다."
    },
    {
      "title": "Element Plus로 폼과 테이블을 빠르게 만들기",
      "lang": "vue",
      "code": "<script setup>\n// 반응형 상태를 위해 ref 를 가져온다\nimport { ref } from 'vue'\n// 알림 메시지 컴포넌트를 가져온다(Element Plus 제공)\nimport { ElMessage } from 'element-plus'\n\n// 입력 폼과 양방향 연결할 상태(이름·이메일)\nconst form = ref({ name: '', email: '' })\n// 등록된 사람들을 담을 테이블 데이터\nconst rows = ref([])\n\n// 등록 버튼을 눌렀을 때 실행\nfunction add() {\n  // 이름이 비어 있으면 경고 알림을 띄우고 중단(Element Plus 알림)\n  if (!form.value.name) { ElMessage.warning('이름을 입력하세요'); return }\n  // 입력값을 테이블 배열에 추가(전개로 새 객체를 복사해 넣음)\n  rows.value.push({ ...form.value })\n  // 성공 알림을 띄운다\n  ElMessage.success('등록되었습니다')\n  // 다음 입력을 위해 폼을 비운다\n  form.value = { name: '', email: '' }\n}\n</script>\n\n<template>\n  <!-- el-form: 미리 만들어진 폼 컨테이너 -->\n  <el-form :inline=\"true\">\n    <!-- el-input: 검증된 입력창, v-model 로 상태와 연결 -->\n    <el-input v-model=\"form.name\" placeholder=\"이름\" />\n    <el-input v-model=\"form.email\" placeholder=\"이메일\" />\n    <!-- el-button: type 으로 색을 지정, 클릭 시 add 실행 -->\n    <el-button type=\"primary\" @click=\"add\">등록</el-button>\n  </el-form>\n\n  <!-- el-table: :data 에 배열만 넘기면 표가 자동 완성된다 -->\n  <el-table :data=\"rows\">\n    <!-- 각 열은 el-table-column, prop 으로 어떤 필드를 보여줄지 지정 -->\n    <el-table-column prop=\"name\" label=\"이름\" />\n    <el-table-column prop=\"email\" label=\"이메일\" />\n  </el-table>\n</template>",
      "note": "main.js 에서 app.use(ElementPlus) 를 등록해 두면 el- 컴포넌트를 바로 쓸 수 있다. 직접 CSS 로 폼·표·알림을 만들 필요 없이 검증된 부품을 조합해 몇 분 만에 실무형 화면을 완성하는 것을 보여주는 데모다. el-input 도 결국 v-model 로 연결되어, 우리가 배운 데이터 바인딩 위에서 돈다는 점이 핵심이다."
    },
    {
      "title": "Vue 코드에서 자주 쓰는 ES6+ 문법 한눈에",
      "lang": "javascript",
      "code": "// 서버에서 받아왔다고 가정한 사용자 데이터(일부 필드는 없을 수도 있음)\nconst user = { name: '김철수', email: 'kim@test.com', address: { city: '서울' } }\nconst users = [user, { name: '이영희', email: 'lee@test.com' }]\n\n// (1) 구조분해 할당: 객체에서 필요한 값만 한 번에 꺼낸다\nconst { name, email } = user\nconsole.log(name, email) // 김철수 kim@test.com\n\n// (2) 전개 연산자: 기존 객체를 복사하며 일부만 바꿔 새 객체를 만든다(원본은 그대로)\nconst updated = { ...user, name: '홍길동' }\nconsole.log(updated.name) // 홍길동\n\n// (3) 화살표 함수 + 배열 고차함수 map: 목록을 가공한다(v-for 에 넘길 데이터 만들 때 사용)\nconst names = users.map(u => u.name)\nconsole.log(names) // ['김철수', '이영희']\n\n// (4) filter: 조건에 맞는 것만 골라 새 배열로\nconst kims = users.filter(u => u.name.startsWith('김'))\nconsole.log(kims.length) // 1\n\n// (5) 옵셔널 체이닝 + 널 병합: 중간 값이 없어도 에러 없이 안전하게 접근하고 기본값을 준다\nconst city = user?.address?.city ?? '도시 미상'\nconsole.log(city) // 서울 (address 가 없었다면 '도시 미상')\n\n// (6) 템플릿 리터럴: 백틱으로 변수를 문자열에 끼워 넣는다\nconsole.log(`${name}님, 환영합니다`) // 김철수님, 환영합니다",
      "note": "옛날 문법으로 길게 쓰던 것을 ES6+ 는 짧고 안전하게 표현한다. 특히 옵셔널 체이닝(?.)과 널 병합(??)은 API 응답처럼 값이 있을 수도 없을 수도 있는 데이터를 다룰 때 화면이 깨지는 것을 막아 주는 필수 문법이다. 이 여섯 가지가 Vue 컴포넌트 곳곳에 반복해서 등장한다."
    }
  ],
  "webproject-1": [
    {
      "title": "기능 명세를 코드로 표현하기 — 우선순위 배열",
      "lang": "javascript",
      "code": "// features 는 우리 서비스가 가질 기능의 목록이다\nconst features = [\n  { name: '목록 보기', priority: '필수' },   // 데이터를 화면에 쭉 보여주는 핵심 기능\n  { name: '글 추가',   priority: '필수' },   // 새 항목을 입력하는 기능\n  { name: '검색',     priority: '선택' }    // 시간이 남으면 추가할 기능\n]\n// filter 로 '필수' 기능만 골라낸다(우선 개발할 목록)\nconst must = features.filter(f => f.priority === '필수')\n// map 으로 이름만 뽑아 배열로 만든다\nconsole.log(must.map(f => f.name)) // 결과: ['목록 보기', '글 추가']",
      "note": "기능에 우선순위를 붙이면 '무엇부터 만들지' 코드 수준에서 바로 정렬할 수 있다."
    },
    {
      "title": "사용자 시나리오를 구조화해 정리하기",
      "lang": "javascript",
      "code": "// 시나리오를 '누가/언제/무엇' 형식 객체로 정리하면 빠진 부분이 보인다\nconst scenarios = [\n  { who: '직장인', when: '점심시간', want: '근처 맛집을 빠르게 찾고 싶다' },\n  { who: '학생',   when: '주말',    want: '가본 곳을 기록해 두고 싶다' }\n]\n// forEach 로 한 줄씩 사람이 읽기 좋은 문장으로 출력한다\nscenarios.forEach(s => {\n  // 템플릿 문자열(백틱)로 변수들을 한 문장에 끼워 넣는다\n  console.log(`${s.who}는 ${s.when}에 ${s.want}`)\n})\n// 결과:\n// 직장인는 점심시간에 근처 맛집을 빠르게 찾고 싶다\n// 학생는 주말에 가본 곳을 기록해 두고 싶다",
      "note": "시나리오를 객체로 만들면 화면·기능을 빠뜨리지 않고 도출하기 쉽다."
    }
  ],
  "webproject-2": [
    {
      "title": "입력칸과 변수를 연결하는 v-model",
      "lang": "vue",
      "code": "<script setup>\nimport { ref } from 'vue' // 반응형 변수를 만드는 ref 가져오기\nconst title = ref('') // 입력값을 담을 빈 변수(처음엔 빈 문자열)\n</script>\n\n<template>\n  <!-- v-model 로 input 의 글자와 title 변수가 자동으로 같아진다 -->\n  <input v-model=\"title\" placeholder=\"제목 입력\" />\n  <!-- 입력하는 즉시 아래에 똑같이 표시된다 -->\n  <p>미리보기: {{ title }}</p>\n</template>",
      "note": "v-model 하나면 입력칸과 변수가 양쪽으로 자동 동기화된다."
    },
    {
      "title": "제출 전에 빈칸을 막는 유효성 검사",
      "lang": "javascript",
      "code": "// 사용자가 제출 버튼을 눌렀을 때 실행되는 함수\nfunction submit(title) {\n  // trim 으로 앞뒤 공백을 지운 뒤 빈 문자열인지 검사한다\n  if (title.trim() === '') {\n    // 비어 있으면 경고를 띄우고 false 를 돌려 제출을 막는다\n    alert('제목을 입력하세요')\n    return false\n  }\n  // 통과하면 true 를 돌려 저장을 진행한다\n  return true\n}\nconsole.log(submit('   ')) // 결과: 경고창 후 false\nconsole.log(submit('맛집')) // 결과: true",
      "note": "저장하기 전에 빈 입력을 걸러내면 깨진 데이터가 쌓이는 걸 막는다."
    },
    {
      "title": "라우터 설정과 목록↔상세 이동 (router/index.js + router-link)",
      "lang": "javascript",
      "code": "// src/router/index.js : 주소와 화면을 짝지어 등록하는 표\nimport { createRouter, createWebHashHistory } from 'vue-router'\nimport ListView from '../views/ListView.vue'   // 목록 화면\nimport DetailView from '../views/DetailView.vue' // 상세 화면\n\nconst routes = [\n  { path: '/', component: ListView },              // 주소가 '/' 이면 목록\n  { path: '/item/:id', component: DetailView },    // '/item/3' 이면 3번 글 상세\n]\n\nexport const router = createRouter({\n  // GitHub Pages 정적 배포에서 새로고침 404를 피하려면 hash 방식이 안전하다\n  history: createWebHashHistory(),\n  routes,\n})\n\n// --- main.js 에서 앱에 연결 ---\n// import { router } from './router'\n// createApp(App).use(router).mount('#app')\n\n// --- 목록 카드에서 상세로 이동 (ListView.vue template) ---\n// <router-link :to=\"`/item/${item.id}`\">{{ item.name }}</router-link>\n\n// --- 상세 화면에서 :id 값 꺼내 쓰기 (DetailView.vue) ---\n// import { useRoute } from 'vue-router'\n// const route = useRoute()\n// const id = Number(route.params.id) // 주소의 :id 를 숫자로 변환해 사용",
      "note": "createWebHashHistory는 GitHub Pages 같은 정적 호스팅에서 상세 주소를 직접 열거나 새로고침해도 404가 나지 않게 해주는 안전한 선택이다. :id 같은 동적 파라미터는 useRoute().params 로 꺼낸다."
    },
    {
      "title": "AI 한 줄 요약 연동 — 로딩·에러 상태까지 (Vue 3 + fetch)",
      "lang": "vue",
      "code": "<script setup>\nimport { ref } from 'vue'\n\nconst memo = ref('')       // ① 입력: 사용자가 쓴 메모\nconst summary = ref('')    // ③ 표시: 요약 결과\nconst loading = ref(false) // 요청 중 여부\nconst error = ref('')      // 실패 메시지\n\n// .env 에 VITE_OPENAI_API_KEY=sk-... 를 넣고 .gitignore 로 깃 업로드를 막는다\nconst API_KEY = import.meta.env.VITE_OPENAI_API_KEY\n\nasync function summarize() {\n  loading.value = true   // 요청 시작 → 버튼 잠그고 '요약 중...' 표시\n  error.value = ''\n  try {\n    // ② 요청: LLM 채팅 API 에 '한 줄 요약' 프롬프트를 POST 한다\n    const res = await fetch('https://api.openai.com/v1/chat/completions', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json',\n        Authorization: `Bearer ${API_KEY}`, // 키를 헤더에 실어 인증\n      },\n      body: JSON.stringify({\n        model: 'gpt-4o-mini', // 가볍고 저렴한 모델(클로드라면 Anthropic 엔드포인트로 교체)\n        messages: [\n          { role: 'system', content: '너는 한국어 요약가야. 한 문장으로만 답해.' },\n          { role: 'user', content: `다음 메모를 한 줄로 요약해줘: ${memo.value}` },\n        ],\n      }),\n    })\n    if (!res.ok) throw new Error(`요청 실패 (${res.status})`) // 4xx/5xx 방어\n    const data = await res.json()\n    summary.value = data.choices[0].message.content // 요약 문장만 추출\n  } catch (e) {\n    error.value = '요약을 못 받아왔어요. 잠시 후 다시 시도해 주세요.'\n    console.error(e)\n  } finally {\n    loading.value = false // 성공/실패와 무관하게 로딩 해제\n  }\n}\n</script>\n\n<template>\n  <textarea v-model=\"memo\" placeholder=\"메모를 입력하세요\" />\n  <button @click=\"summarize\" :disabled=\"loading\">\n    {{ loading ? '요약 중...' : 'AI 한 줄 요약' }}\n  </button>\n  <p v-if=\"error\" style=\"color:red\">{{ error }}</p>\n  <p v-if=\"summary\">요약: {{ summary }}</p>\n</template>",
      "note": "입력(memo)→요청(fetch)→표시(summary)의 3단계가 그대로 드러난다. loading·error 두 상태를 함께 다뤄야 시연 중 화면이 멈춘 것처럼 보이지 않는다. 키를 화면에서 직접 쓰는 방식은 학습용이며, 상용에서는 백엔드 프록시로 키를 숨겨야 한다."
    }
  ],
  "webproject-3": [
    {
      "title": "코드에서 환경변수 읽어 API 주소 쓰기",
      "lang": "javascript",
      "code": "// import.meta.env 로 .env 에 적은 값을 읽는다(VITE_ 접두사 필수)\nconst API = import.meta.env.VITE_API_URL\n// 읽어온 주소로 데이터를 요청한다(주소를 코드에 직접 박지 않아 유지보수가 쉽다)\nfetch(`${API}/items`)\n  .then(res => res.json()) // 응답을 JSON 으로 변환\n  .then(data => console.log('받은 개수:', data.length)) // 결과: 받은 개수: 2\n  .catch(err => console.error('요청 실패:', err)) // 에러가 나면 콘솔에 표시",
      "note": "주소를 .env로 빼면 개발용·배포용 주소를 코드 수정 없이 바꿀 수 있다."
    },
    {
      "title": "배포 후 동작 점검 체크리스트(코드로 표현)",
      "lang": "javascript",
      "code": "// 배포된 사이트에서 직접 눌러보며 확인할 항목들\nconst checklist = [\n  '메인 화면이 흰 화면 없이 뜬다',   // base 설정 점검\n  '목록이 정상 표시된다',            // 데이터 로딩 점검\n  '새 글을 추가할 수 있다',          // 쓰기 기능 점검\n  '상세 화면으로 이동된다'           // 라우팅 점검\n]\n// 하나씩 통과 여부를 출력한다(실제로는 손으로 눌러 확인)\nchecklist.forEach((item, i) => console.log(`${i + 1}. ${item}`))\n// 결과: 1. 메인 화면이 흰 화면 없이 뜬다 ... 4. 상세 화면으로 이동된다",
      "note": "배포 후에는 반드시 실제 주소에서 핵심 기능을 하나씩 다시 눌러 확인한다."
    },
    {
      "title": "AI API로 메모 한 줄 요약 받아 화면에 표시하기",
      "lang": "javascript",
      "code": "// .env 의 키를 코드에 직접 쓰지 않고 import.meta.env 로 읽는다(VITE_ 접두사 필수)\nconst API_KEY = import.meta.env.VITE_LLM_API_KEY\nlet ref = ''  // 요약 결과를 담을 변수(Vue라면 ref('')로 반응형 처리)\n\nasync function summarize(memo) {\n  // LLM 채팅 엔드포인트에 '한 줄 요약' 요청을 POST 한다\n  const res = await fetch('https://api.example-llm.com/v1/chat', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'Authorization': `Bearer ${API_KEY}`,  // 키를 헤더에 실어 인증\n    },\n    body: JSON.stringify({\n      model: 'gpt-4o-mini',\n      messages: [{ role: 'user', content: `다음 메모를 한 줄로 요약해줘: ${memo}` }],\n    }),\n  })\n  const data = await res.json()               // 응답을 JSON 으로 변환\n  ref = data.choices[0].message.content       // 요약 문장만 꺼내 변수에 담는다\n  console.log('요약:', ref)                    // 화면에서는 이 값을 그대로 표시한다\n}\n\nsummarize('오늘 회의에서 배포 일정을 다음 주로 미루기로 했다')",
      "note": "API 키는 절대 코드에 직접 쓰지 말고 .env에 두며, 실제 서비스에서는 키 노출을 막기 위해 백엔드(프록시)를 거치는 것이 안전하다."
    }
  ],
  "spring-ai-1": [
    {
      "title": "application.yml — Anthropic(클로드) 프로바이더 설정",
      "lang": "yaml",
      "code": "# Spring 관련 설정의 최상위 키\nspring:\n  ai:\n    # Anthropic(클로드) 공급사 설정 묶음\n    anthropic:\n      # 클로드 API 키를 환경변수에서 읽어 온다(코드에 키를 노출하지 않기 위함)\n      api-key: ${ANTHROPIC_API_KEY}\n      # 채팅 모델의 세부 옵션 묶음\n      chat:\n        options:\n          # 사용할 모델 식별자(클로드 계열 모델 이름)\n          model: claude-opus-4-8\n          # (opus-4-8 계열은 temperature 미지원 — 창의성은 프롬프트로 유도)",
      "note": "키를 코드가 아닌 환경변수(${...})로 읽어 보안을 지키는 것이 핵심 포인트다."
    },
    {
      "title": "System 메시지로 역할 지정하기",
      "lang": "java",
      "code": "// 빌더에서 system 메시지로 AI의 역할을 먼저 정한다\nString answer = chatClient.prompt()        // 프롬프트 작성 시작\n        .system(\"너는 친절한 자바 강사야. 쉬운 말로 답해.\")  // AI의 역할·말투를 지정\n        .user(\"제네릭이 뭐야?\")                 // 사용자의 실제 질문\n        .call()                                // LLM 호출\n        .content();                            // 답변 텍스트만 추출\n// 화면/로그에 답변을 출력한다 (결과: 초보자 눈높이의 제네릭 설명 문장)\nSystem.out.println(answer);",
      "note": "system()으로 역할과 말투를 먼저 정하면 답변 톤이 일관되게 유지된다."
    },
    {
      "title": "PromptTemplate으로 빈칸 채운 프롬프트 만들기",
      "lang": "java",
      "code": "// LLM에 말을 거는 도구\nimport org.springframework.ai.chat.client.ChatClient;\n// 빈칸(플레이스홀더)이 있는 프롬프트 양식을 만드는 도구\nimport org.springframework.ai.chat.prompt.PromptTemplate;\nimport java.util.Map;\n\n// {언어}, {문장} 두 개의 빈칸을 가진 양식을 미리 정의한다\nPromptTemplate template = new PromptTemplate(\n        \"다음 문장을 {언어}로 번역해 줘: {문장}\");\n\n// 호출 시점에 빈칸에 넣을 값을 Map으로 전달해 완성된 문장을 만든다\nString userMessage = template.render(Map.of(\n        \"언어\", \"영어\",\n        \"문장\", \"오늘 날씨가 참 좋네요\"));\n// 이 시점의 userMessage = \"다음 문장을 영어로 번역해 줘: 오늘 날씨가 참 좋네요\"\n\n// 규칙(system)은 고정, 매번 바뀌는 내용(user)만 주입해 LLM에 보낸다\nString answer = chatClient.prompt()\n        .system(\"너는 번역가야. 번역 결과만 답해.\")  // 말투·형식 고정\n        .user(userMessage)                          // 이번에 바뀌는 내용\n        .call()                                     // LLM 호출\n        .content();                                 // 답변 본문 추출\nSystem.out.println(answer);   // 결과 예: It's such a nice day today.",
      "note": "template.render(Map)이 빈칸을 채워 완성 문장을 만든다. system은 고정 규칙, user는 매번 바뀌는 값으로 나누는 것이 재사용의 핵심이다. 언어 값만 '일본어'로 바꾸면 코드 수정 없이 다국어로 확장된다."
    }
  ],
  "spring-ai-2": [
    {
      "title": "build.gradle — pgvector VectorStore 의존성",
      "lang": "bash",
      "code": "# build.gradle 의 dependencies 블록에 아래 줄들을 추가한다\ndependencies {\n  # pgvector 기반 VectorStore 자동설정을 가져온다\n  implementation 'org.springframework.ai:spring-ai-starter-vector-store-pgvector'\n  # 문장을 벡터로 바꿔 줄 임베딩 모델(여기서는 OpenAI 임베딩) 스타터\n  implementation 'org.springframework.ai:spring-ai-starter-model-openai'\n}",
      "note": "VectorStore 스타터와 임베딩 모델 스타터를 함께 넣어야 적재·검색이 동작한다."
    },
    {
      "title": "pgvector 컨테이너 띄우기",
      "lang": "bash",
      "code": "# pgvector가 미리 깔린 PostgreSQL 이미지를 백그라운드로 실행한다\ndocker run -d \\\n  --name pgvector \\\n  -e POSTGRES_PASSWORD=pass \\\n  -p 5432:5432 \\\n  pgvector/pgvector:pg16\n# 위 옵션: --name 컨테이너 이름, -e 비밀번호, -p 포트연결(내PC:컨테이너)\n# 결과: docker ps 로 보면 pgvector 컨테이너가 Up 상태로 보인다",
      "note": "별도 설치 없이 한 줄로 벡터 검색용 DB를 띄울 수 있다."
    },
    {
      "title": "QuestionAnswerAdvisor 로 RAG 답변 구성하기",
      "lang": "java",
      "code": 'package com.example.rag;\n\nimport org.springframework.ai.chat.client.ChatClient;\n// RAG 검색을 자동으로 끼워 주는 어드바이저 (Spring AI 1.0 GA 경로)\nimport org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;\nimport org.springframework.ai.vectorstore.VectorStore;\nimport org.springframework.web.bind.annotation.*;\n\n@RestController\n@RequestMapping("/api/rag")\npublic class RagController {\n\n    private final ChatClient chatClient;\n\n    // 앞서 pgvector 에 문서를 적재해 둔 VectorStore 를 주입받는다\n    public RagController(ChatClient.Builder builder, VectorStore vectorStore) {\n        this.chatClient = builder\n                // QuestionAnswerAdvisor: 질문이 오면 (1) VectorStore 에서 관련 문서를 검색해\n                // (2) 프롬프트에 근거로 붙인 뒤 (3) LLM 을 호출하는 RAG 흐름을 자동 처리한다\n                .defaultAdvisors(QuestionAnswerAdvisor.builder(vectorStore).build())\n                .build();\n    }\n\n    // GET /api/rag?question=... - 우리가 검색 코드를 짜지 않아도 근거 기반 답이 나온다\n    @GetMapping\n    public String ask(@RequestParam String question) {\n        return chatClient.prompt()\n                .user(question)   // 예: "연차 휴가는 며칠인가요?"\n                .call()           // 어드바이저가 검색->근거주입->호출을 대신 수행\n                .content();       // 문서 근거로 만든 답변만 추출\n    }\n}',
      "note": "QuestionAnswerAdvisor 하나를 defaultAdvisors 로 등록하면 검색->근거 주입->LLM 호출의 RAG 3단계를 프레임워크가 대신 처리해, 컨트롤러에는 질문만 넘기면 된다."
    },
    {
      "title": "ChatMemory Advisor 로 대화 기억 유지하기",
      "lang": "java",
      "code": 'package com.example.memory;\n\nimport org.springframework.ai.chat.client.ChatClient;\n// 이전 대화를 프롬프트에 자동으로 끼워 주는 메모리 어드바이저 (1.0 GA)\nimport org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;\nimport org.springframework.ai.chat.memory.ChatMemory;\nimport org.springframework.ai.chat.memory.MessageWindowChatMemory;\nimport org.springframework.web.bind.annotation.*;\n\n@RestController\n@RequestMapping("/api/chat")\npublic class MemoryController {\n\n    private final ChatClient chatClient;\n\n    public MemoryController(ChatClient.Builder builder) {\n        // 최근 메시지 N개만 기억하는 창(window) 방식 메모리 저장소\n        ChatMemory memory = MessageWindowChatMemory.builder().maxMessages(10).build();\n        this.chatClient = builder\n                // 매 호출 전에 그 대화의 이전 메시지를 자동으로 프롬프트에 넣어 준다\n                .defaultAdvisors(MessageChatMemoryAdvisor.builder(memory).build())\n                .build();\n    }\n\n    // conversationId 로 대화를 구분한다(사용자/세션별로 기억이 분리됨)\n    @GetMapping\n    public String chat(@RequestParam String conversationId, @RequestParam String message) {\n        return chatClient.prompt()\n                .user(message)  // 예: 1) "내 이름은 철수야"  2) "내 이름 뭐라고 했지?"\n                // 이 대화의 기억 창을 conversationId 로 지정\n                .advisors(a -> a.param(ChatMemory.CONVERSATION_ID, conversationId))\n                .call()\n                .content();     // 두 번째 질문에 "철수"라고 답하면 기억이 동작하는 것\n    }\n}',
      "note": "MessageWindowChatMemory(기억 저장소) + MessageChatMemoryAdvisor(자동 주입)를 붙이면 CONVERSATION_ID 별로 이전 대화를 기억해 문맥이 이어지는 챗봇이 된다."
    }
  ],
  "spring-ai-3": [
    {
      "title": "구조화 출력 — 답을 record 리스트로 받기",
      "lang": "java",
      "code": "// 영화 추천 한 건을 담을 데이터 그릇(record)\npublic record Movie(String title, int year) {}\n\n// LLM에게 영화 3편을 Movie 리스트 모양으로 답하라고 요청한다\nList<Movie> movies = chatClient.prompt()      // 프롬프트 작성 시작\n        .user(\"가벼운 코미디 영화 3편 추천해줘\")   // 사용자 질문\n        .call()                                // LLM 호출\n        .entity(new ParameterizedTypeReference<List<Movie>>() {}); // List<Movie>로 변환\n// 결과를 반복하며 출력한다 (결과 예: 제목 (연도) 형태로 3줄)\nmovies.forEach(m -> System.out.println(m.title() + \" (\" + m.year() + \")\"));",
      "note": "복잡한 제네릭 타입은 ParameterizedTypeReference로 알려 줘야 List<Movie>로 정확히 매핑된다."
    },
    {
      "title": "스트리밍 응답 콘솔로 확인",
      "lang": "java",
      "code": "// 스트리밍으로 텍스트 조각(Flux)을 받는다\nFlux<String> flux = chatClient.prompt()       // 프롬프트 작성 시작\n        .user(\"스프링 AI를 5문장으로 설명해줘\")    // 사용자 질문\n        .stream()                              // 조각 단위 응답 모드\n        .content();                            // 텍스트 조각 스트림 추출\n// 조각이 도착할 때마다 줄바꿈 없이 이어서 출력한다(타자 치듯 보임)\nflux.doOnNext(System.out::print)               // 각 조각을 즉시 출력\n    .blockLast();                              // 마지막 조각까지 기다림(예제용)",
      "note": "blockLast()는 예제에서 끝까지 기다리려고 쓴 것이고, 실제 웹에서는 Flux를 그대로 반환한다."
    },
    {
      "title": "MCP Client: 외부 MCP 서버의 도구를 내 앱에 붙이기",
      "lang": "java",
      "code": "// build.gradle: implementation 'org.springframework.ai:spring-ai-starter-mcp-client'\npackage com.example.mcpclient;\n\nimport org.springframework.ai.chat.client.ChatClient;\n// MCP 클라이언트 스타터가 외부 서버의 도구들을 이 타입으로 자동 주입해 준다\nimport org.springframework.ai.tool.ToolCallbackProvider;\nimport org.springframework.web.bind.annotation.*;\n\n@RestController\n@RequestMapping(\"/api/agent\")\npublic class McpAgentController {\n\n    private final ChatClient chatClient;\n\n    // 생성자: ChatClient.Builder 와 함께, MCP 서버 도구 묶음을 주입받는다\n    public McpAgentController(ChatClient.Builder builder, ToolCallbackProvider mcpTools) {\n        this.chatClient = builder\n                .defaultToolCallbacks(mcpTools)  // 외부 MCP 서버 도구를 기본 도구로 등록\n                .build();\n    }\n\n    // GET /api/agent?message=... — LLM이 필요하면 MCP 서버 도구를 자동 호출\n    @GetMapping\n    public String ask(@RequestParam String message) {\n        return chatClient.prompt()\n                .user(message)   // 예: \"3번 사원 정보 알려줘\"\n                .call()          // LLM이 findEmployee 도구가 필요하다 판단하면 MCP로 호출\n                .content();\n    }\n}\n\n// ===== application.yml (STDIO 전송: 로컬 서버 jar 실행) =====\n// spring:\n//   ai:\n//     mcp:\n//       client:\n//         stdio:\n//           connections:\n//             skala:                     # 연결 이름(자유)\n//               command: java            # 서버를 띄울 실행 명령\n//               args:\n//                 - -jar\n//                 - ./mcp-server/build/libs/mcp-server.jar\n// # 원격 서버라면 stdio 대신 sse(HTTP) 로 endpoint 를 지정한다",
      "note": "MCP 클라이언트 스타터를 넣으면 application.yml에 등록한 서버의 도구들이 ToolCallbackProvider로 자동 주입된다. 그걸 defaultToolCallbacks로 붙이기만 하면, 앞서 우리가 만든 MCP 서버의 @Tool(findEmployee)을 이 앱의 LLM이 그대로 쓸 수 있다. 로컬은 stdio, 원격은 sse(HTTP)로 전송을 고른다."
    },
    {
      "title": "Single Agent: 목표를 주면 도구를 스스로 골라 연쇄 호출",
      "lang": "java",
      "code": "package com.example.agent;\n\nimport org.springframework.ai.chat.client.ChatClient;\nimport org.springframework.ai.tool.annotation.Tool;\nimport org.springframework.web.bind.annotation.*;\n\n@RestController\n@RequestMapping(\"/api\")\npublic class TravelAgentController {\n\n    private final ChatClient chatClient;\n\n    public TravelAgentController(ChatClient.Builder builder) {\n        // 목표 지향 system 프롬프트로 이 ChatClient에 '에이전트' 성격을 부여한다\n        this.chatClient = builder\n            .defaultSystem(\"\"\"\n                너는 여행 도우미 에이전트다.\n                사용자의 목표를 이루기 위해 필요한 도구를 스스로 골라 호출하라.\n                한 도구의 결과를 확인한 뒤, 부족하면 다른 도구를 더 호출해도 된다.\n                충분한 정보가 모이면 한국어로 정리해 최종 답을 제시하라.\n                \"\"\")\n            .build();\n    }\n\n    // [도구1] 날씨 조회 (실제로는 외부 API — 예제는 고정값)\n    @Tool(description = \"도시의 현재 날씨를 조회한다\")\n    public String getWeather(String city) { return city + \" 맑음, 24도\"; }\n\n    // [도구2] 명소 추천 (실내/실외 정보 포함)\n    @Tool(description = \"도시에서 추천하는 실내·실외 명소를 알려준다\")\n    public String getAttractions(String city) { return city + \": 미술관(실내), 강변공원(실외), 전통시장(실외)\"; }\n\n    // GET /api/plan?message=... — 한 번 호출로 에이전트가 도구를 연쇄 사용\n    @GetMapping(\"/plan\")\n    public String plan(@RequestParam String message) {\n        return chatClient.prompt()\n                .user(message)   // 예: \"맑으면 야외, 비 오면 실내로 서울 하루 코스 짜줘\"\n                .tools(this)     // 두 도구를 에이전트에 쥐여 준다\n                .call()          // LLM이 날씨 조회 → 명소 조회 순으로 스스로 연쇄 호출\n                .content();      // 결과를 종합해 최종 코스를 한국어로 정리\n    }\n}",
      "note": "에이전트의 핵심은 두 가지다 — (1) '목표를 이루려 도구를 스스로 고르라'는 system 프롬프트, (2) 여러 도구 등록. Spring AI는 한 번의 call() 안에서 LLM이 요청하는 도구 호출을 자동으로 반복 실행(관찰→다음 호출)하므로, 우리가 for 루프를 짜지 않아도 '계획→도구→관찰→다음 도구' 흐름이 일어난다. 이것이 Single Agent다."
    }
  ],
  "sllm-1": [
    {
      "title": "Hugging Face로 작은 모델 받아 한 줄 생성하기",
      "lang": "python",
      "code": "from transformers import pipeline   # 복잡한 단계를 한 번에 묶어주는 편의 도구\n\n# 'text-generation' 작업과 쓸 모델 이름만 주면 알아서 내려받아 준비한다\ngen = pipeline(\"text-generation\", model=\"Qwen/Qwen2.5-0.5B\")\n\nresult = gen(\"인공지능을 한 문장으로 설명하면\", max_new_tokens=30)  # 최대 30토큰까지 이어 쓰게 함\nprint(result[0][\"generated_text\"])   # 결과: 입력 문장 + 모델이 이어 쓴 설명이 출력됨",
      "note": "pipeline 한 줄이면 모델 다운로드부터 추론까지 자동으로 처리된다."
    },
    {
      "title": "모델 용량 가늠하기 — 파라미터 수로 메모리 추정",
      "lang": "python",
      "code": "params_billion = 7      # 모델 크기(예: 7B = 70억 파라미터)\nbits = 4                # 양자화 비트 수(4비트로 압축했다고 가정)\n\n# 대략적인 용량(GB) = 파라미터 수(10억) x 비트 / 8(=1바이트)\napprox_gb = params_billion * bits / 8   # 7 * 4 / 8 = 3.5\nprint(f\"필요 메모리 약 {approx_gb} GB\")   # 결과: 필요 메모리 약 3.5 GB",
      "note": "4비트 양자화를 쓰면 7B 모델도 약 3.5GB라 일반 노트북 메모리에 들어간다."
    }
  ],
  "sllm-2": [
    {
      "title": "instruction 학습 데이터 한 줄 만들기 (JSONL)",
      "lang": "python",
      "code": "import json   # 파이썬 딕셔너리를 JSON 문자열로 바꾸기 위해 사용\n\n# 모델에게 줄 '모범답안 카드' 한 장(지시 + 모범 출력)\nsample = {\n    \"text\": \"### 지시:\\nDreamIT의 약자를 풀어줘\\n### 응답:\\nDream + IT, 꿈을 IT로 이룬다는 뜻입니다.\"\n}\n\n# JSONL은 한 줄에 하나의 JSON, 여러 줄을 모아 학습셋이 된다\nwith open(\"data.jsonl\", \"a\", encoding=\"utf-8\") as f:  # 이어쓰기(a) 모드로 열기\n    f.write(json.dumps(sample, ensure_ascii=False) + \"\\n\")  # 카드 한 장을 파일에 추가\nprint(\"한 줄 추가 완료\")   # 결과: 한 줄 추가 완료",
      "note": "이런 카드를 10~20장 모으면 작은 도메인 파인튜닝 학습셋이 된다."
    },
    {
      "title": "학습한 LoRA 어댑터로 추론하기",
      "lang": "python",
      "code": "from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저\nfrom peft import PeftModel   # 저장한 LoRA 어댑터를 본체에 다시 끼우는 도구\n\nbase = \"Qwen/Qwen2.5-0.5B\"           # 학습에 썼던 베이스 모델\ntok = AutoTokenizer.from_pretrained(base)        # 토크나이저 불러오기\nmodel = AutoModelForCausalLM.from_pretrained(base)  # 베이스 모델 불러오기\nmodel = PeftModel.from_pretrained(model, \"my-lora\")  # 저장해 둔 LoRA 어댑터 결합\n\nprompt = \"### 지시:\\nDreamIT의 약자를 풀어줘\\n### 응답:\\n\"  # 학습 때와 같은 형식으로 질문\nids = tok(prompt, return_tensors=\"pt\").input_ids   # 문장을 토큰 숫자로 변환\nout = model.generate(ids, max_new_tokens=40)       # 최대 40토큰 답 생성\nprint(tok.decode(out[0], skip_special_tokens=True))  # 결과: 학습한 말투로 답이 출력됨",
      "note": "본체 + LoRA 어댑터를 합쳐 불러오면 파인튜닝된 모델로 추론할 수 있다."
    },
    {
      "title": "sLLM + Vector DB로 문서 근거 답변하기 (rag.py)",
      "lang": "python",
      "code": "from sentence_transformers import SentenceTransformer  # 문장을 의미 벡터로 바꾸는 임베딩 모델\nimport numpy as np      # 벡터 간 유사도 계산에 사용\nimport requests         # 로컬 Ollama 모델에 답을 요청할 때 사용\n\n# 1) 우리가 검색 대상으로 삼을 사내 문서 조각(청크)들 — 실제로는 파일에서 읽어온다\ndocs = [\n    \"연차 휴가는 입사 1년 후부터 15일이 부여된다.\",\n    \"재택근무는 팀장 승인 시 주 2회까지 가능하다.\",\n    \"경조사비는 결혼 시 30만원, 조사 시 20만원을 지급한다.\",\n]\n\n# 2) 한국어를 잘 다루는 다국어 임베딩 모델을 불러온다\nembedder = SentenceTransformer(\"intfloat/multilingual-e5-small\")\ndoc_vecs = embedder.encode(docs)   # 문서 3개를 각각 벡터로 변환(가장 단순한 형태의 Vector DB)\n\ndef search(question, top_k=1):     # 질문과 의미가 가까운 문서를 찾는 함수\n    q_vec = embedder.encode([question])[0]          # 질문도 같은 방식으로 벡터화\n    sims = doc_vecs @ q_vec / (                      # 코사인 유사도 계산\n        np.linalg.norm(doc_vecs, axis=1) * np.linalg.norm(q_vec))\n    best = sims.argsort()[::-1][:top_k]              # 유사도 높은 순으로 top_k개 인덱스\n    return [docs[i] for i in best]                   # 가장 관련 있는 문서 조각을 돌려준다\n\ndef answer(question):              # 검색한 근거를 붙여 sLLM에게 답하게 하는 함수\n    context = \"\\n\".join(search(question))   # 찾아온 근거 문서를 한 덩어리로 합침\n    prompt = f\"다음 근거만 보고 한국어로 답해줘.\\n[근거]\\n{context}\\n[질문]\\n{question}\"\n    res = requests.post(\"http://localhost:11434/api/chat\", json={\n        \"model\": \"qwen2.5:0.5b\", \"stream\": False,\n        \"messages\": [{\"role\": \"user\", \"content\": prompt}]})\n    return res.json()[\"message\"][\"content\"]  # 모델이 근거를 보고 만든 답만 꺼낸다\n\nif __name__ == \"__main__\":\n    print(answer(\"재택근무 며칠까지 돼?\"))   # 결과: 근거 문서를 인용해 '주 2회'라고 답함",
      "note": "임베딩으로 질문과 가장 가까운 사내 문서를 찾아(Vector DB 역할), 그 근거를 프롬프트에 붙여 sLLM에게 답하게 하는 RAG의 최소 형태다.\n문서 목록만 우리 자료로 바꾸면 '사내 규정 챗봇'이 된다. 규모가 커지면 이 검색 부분을 Chroma·FAISS 같은 전용 Vector DB로 바꾸면 된다."
    },
    {
      "title": "LoRA를 본체에 합쳐 배포용 모델 만들기 (merge_and_serve.py)",
      "lang": "python",
      "code": "from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저\nfrom peft import PeftModel   # 저장한 LoRA 어댑터를 본체에 끼우는 도구\n\nBASE = \"Qwen/Qwen2.5-0.5B\"          # 학습에 썼던 베이스 모델\ntok = AutoTokenizer.from_pretrained(BASE)          # 토크나이저 불러오기\nmodel = AutoModelForCausalLM.from_pretrained(BASE) # 베이스 모델 불러오기\nmodel = PeftModel.from_pretrained(model, \"my-lora\")  # 어제 학습한 LoRA 어댑터를 끼운다\n\n# 핵심: 본체와 어댑터를 '하나로 합친다'(merge)\n# 합치면 추론할 때 어댑터를 따로 안 끼워도 되고 로딩·추론이 단순해진다\nmerged = model.merge_and_unload()    # LoRA 가중치를 본체에 더해 하나의 모델로 만든다\n\nmerged.save_pretrained(\"my-sllm\")    # 배포용 단일 모델로 저장\ntok.save_pretrained(\"my-sllm\")       # 토크나이저도 같은 폴더에 저장(배포 한 세트)\nprint(\"병합 완료! my-sllm 폴더가 배포용 모델이다\")\n\n# 배포된 모델로 바로 추론해 확인해 본다(서빙의 최소 형태)\nprompt = \"### 지시:\\nDreamIT의 약자를 풀어줘\\n### 응답:\\n\"\nids = tok(prompt, return_tensors=\"pt\").input_ids  # 질문을 토큰으로 변환\nout = merged.generate(ids, max_new_tokens=40)     # 병합된 모델로 답 생성\nprint(tok.decode(out[0], skip_special_tokens=True))  # 결과: 학습한 말투로 답이 나옴",
      "note": "어댑터를 따로 끼워 쓰던 것을 merge_and_unload()로 본체에 합치면, 배포·운영 시 모델 하나만 올리면 되어 관리가 단순해진다.\n이렇게 저장한 my-sllm 폴더를 그대로 Ollama용 GGUF로 변환하거나 vLLM 서버에 올리면 실제 서빙 배포로 이어진다."
    }
  ],
  "ml-dl-1": [
    {
      "title": "데이터 모양 확인하기",
      "lang": "python",
      "code": "from sklearn.datasets import load_iris  # 붓꽃 데이터 로더\niris = load_iris()                       # 데이터 불러오기\nprint(iris.data.shape)   # 결과: (150, 4)  150송이, 특징 4개\nprint(iris.target_names) # 결과: ['setosa' 'versicolor' 'virginica']",
      "note": "모델을 만들기 전에 데이터가 몇 행 몇 열인지, 정답 종류가 무엇인지 먼저 확인하는 습관이 중요하다."
    },
    {
      "title": "정확도 한 줄로 구하기",
      "lang": "python",
      "code": "from sklearn.metrics import accuracy_score  # 정확도 계산 함수\ny_true = [0, 1, 1, 0]   # 실제 정답\ny_pred = [0, 1, 0, 0]   # 모델 예측 (3번째만 틀림)\nprint(accuracy_score(y_true, y_pred))  # 결과: 0.75  (4개 중 3개 맞음)",
      "note": "정확도는 '전체 중 맞힌 비율'이라 직관적이지만, 정답이 한쪽으로 치우치면 정밀도·재현율도 함께 봐야 한다."
    },
    {
      "title": "랜덤포레스트로 성능 끌어올리기",
      "lang": "python",
      "code": "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.ensemble import RandomForestClassifier  # 트리 여러 그루의 앙상블\n\nX, y = load_iris(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# 단일 결정트리\ntree = DecisionTreeClassifier(random_state=42).fit(X_tr, y_tr)\n# 트리 100그루를 학습시키는 랜덤포레스트\nrf = RandomForestClassifier(n_estimators=100, random_state=42)\nrf.fit(X_tr, y_tr)\n\nprint('단일 트리:', round(tree.score(X_te, y_te), 3))\nprint('랜덤포레스트:', round(rf.score(X_te, y_te), 3))  # 보통 더 안정적으로 높게 나옴\n",
      "note": "트리 여러 그루의 다수결이 단일 트리보다 흔들림이 적고 과적합에 강하다."
    },
    {
      "title": "혼동행렬 그려서 어디서 틀렸는지 찾기",
      "lang": "python",
      "code": "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay\nimport matplotlib.pyplot as plt\n\n# 붓꽃 데이터를 불러와 학습/평가로 나눈다\nX, y = load_iris(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# 랜덤포레스트로 학습하고 평가용을 예측한다\nmodel = RandomForestClassifier(n_estimators=100, random_state=42).fit(X_tr, y_tr)\npred = model.predict(X_te)\n\n# 혼동행렬을 숫자로 확인한다 (행=실제 품종, 열=예측 품종)\ncm = confusion_matrix(y_te, pred)\nprint(cm)   # 대각선이 정답, 대각선을 벗어난 칸이 헷갈린 개수\n\n# 그림으로 보면 어느 품종끼리 혼동했는지 바로 보인다\nConfusionMatrixDisplay(cm, display_labels=load_iris().target_names).plot()\nplt.title('붓꽃 분류 혼동행렬')\nplt.show()\n# 보통 setosa 는 완벽, versicolor 와 virginica 사이에서 한두 개 헷갈린다",
      "note": "정확도 숫자 하나로는 안 보이던 '어느 품종을 어느 품종으로 헷갈렸는지'가 혼동행렬에서는 한눈에 드러난다. 8교시 모델 비교 실습의 마무리로 쓴다."
    }
  ],
  "ml-dl-2": [
    {
      "title": "텐서 만들고 계산하기",
      "lang": "python",
      "code": "import torch                       # 파이토치 불러오기\na = torch.tensor([1.0, 2.0, 3.0])  # 1차원 텐서(벡터) 생성\nb = a * 2                          # 모든 원소에 2를 곱함\nprint(b)        # 결과: tensor([2., 4., 6.])\nprint(b.sum())  # 결과: tensor(12.)  모든 원소의 합",
      "note": "텐서는 넘파이 배열과 거의 똑같이 쓰지만, GPU 연산과 자동 미분을 지원한다는 점이 다르다."
    },
    {
      "title": "ReLU 활성화 함수 체험",
      "lang": "python",
      "code": "import torch\nimport torch.nn as nn          # 신경망 모듈\nrelu = nn.ReLU()               # 음수는 0, 양수는 그대로\nx = torch.tensor([-2.0, -0.5, 0.0, 1.5])  # 음수와 양수 섞인 입력\nprint(relu(x))  # 결과: tensor([0., 0., 0., 1.5])  음수가 모두 0이 됨",
      "note": "ReLU 는 음수 신호를 잘라내 신경망에 비선형성을 더해, 직선으로 못 푸는 문제도 풀게 해준다."
    },
    {
      "title": "nn.Module 클래스로 나만의 신경망 정의하기",
      "lang": "python",
      "code": "import torch\nimport torch.nn as nn\n\n# nn.Module 을 상속해 나만의 신경망 클래스를 만든다\nclass MyMLP(nn.Module):\n    def __init__(self):\n        super().__init__()                 # 부모 초기화(필수)\n        self.fc1 = nn.Linear(64, 32)       # 입력 64 -> 은닉 32\n        self.act = nn.ReLU()               # 비선형 문지기\n        self.fc2 = nn.Linear(32, 10)       # 은닉 32 -> 출력 10(클래스 수)\n\n    def forward(self, x):                  # 데이터가 흘러가는 순서를 적는다\n        x = self.fc1(x)                    # 1층 통과\n        x = self.act(x)                    # 활성화\n        x = self.fc2(x)                    # 2층(출력)\n        return x                          # 클래스별 점수를 반환\n\nmodel = MyMLP()\nprint(model)                               # 층 구조가 예쁘게 출력된다\n\n# 가짜 입력 한 줄(64차원)을 넣어 출력 모양을 확인한다\ndummy = torch.randn(1, 64)\nprint(model(dummy).shape)   # 결과: torch.Size([1, 10])  10개 클래스 점수",
      "note": "nn.Sequential 로도 되지만, 실무 코드는 대부분 nn.Module 을 상속한 클래스로 짠다. __init__ 에 부품을 선언하고 forward 에 흐름을 적는 이 골격이 PyTorch 의 표준이다. 6교시 '신경망 한 개 쌓아보기'의 정석 버전."
    }
  ],
  "ml-dl-3": [
    {
      "title": "합성곱 한 번 해보기",
      "lang": "python",
      "code": "import torch\nimport torch.nn as nn\nconv = nn.Conv2d(1, 1, 3)              # 입력채널1, 출력1, 3x3 필터\nimg = torch.ones(1, 1, 5, 5)          # 5x5 흰 이미지(모두 1)\nout = conv(img)                       # 합성곱 적용\nprint(out.shape)  # 결과: torch.Size([1, 1, 3, 3])  3x3으로 줄어듦",
      "note": "3x3 필터로 5x5 이미지를 훑으면 가장자리가 잘려 3x3 특징 지도가 나온다(padding 으로 크기 유지 가능)."
    },
    {
      "title": "드롭아웃 켜고 끄기",
      "lang": "python",
      "code": "import torch\nimport torch.nn as nn\ndrop = nn.Dropout(0.5)        # 절반을 0으로 끔\nx = torch.ones(1, 6)         # 모두 1인 입력\ndrop.train()                 # 학습 모드: 드롭아웃 작동\nprint(drop(x))               # 결과: 일부가 0, 나머지는 2.0으로 증폭(매번 다름)",
      "note": "학습 모드에서는 일부 뉴런을 끄지만, 평가 모드(drop.eval())에서는 모두 살려 안정적으로 예측한다."
    },
    {
      "title": "전이학습 골격 — 앞부분은 얼리고 마지막 층만 새로 학습",
      "lang": "python",
      "code": "import torch.nn as nn\n\n# (개념 시연) 사전학습된 모델이 있다고 하자 — 앞부분은 범용 특징 추출기\n# 실제로는: from torchvision.models import resnet18; base = resnet18(weights='DEFAULT')\nclass PretrainedLike(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.features = nn.Sequential(     # 이미 잘 배운 특징 추출부(빌려 옴)\n            nn.Conv2d(3, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),\n            nn.Conv2d(16, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),\n        )\n        self.classifier = nn.Linear(32 * 8 * 8, 1000)  # 원래는 1000개 클래스용\n\nbase = PretrainedLike()\n\n# 1) 특징 추출부의 가중치를 '얼린다' — 학습 중 갱신되지 않게 막는다\nfor p in base.features.parameters():\n    p.requires_grad = False\n\n# 2) 마지막 분류층만 '우리 문제(예: 3개 클래스)'에 맞게 새로 갈아 끼운다\nbase.classifier = nn.Linear(32 * 8 * 8, 3)   # 이 층만 새로 학습된다\n\n# 3) 확인: requires_grad 가 True 인(=학습되는) 파라미터가 마지막 층뿐인지 본다\ntrainable = [n for n, p in base.named_parameters() if p.requires_grad]\nprint('새로 학습되는 층:', trainable)\n# 결과: classifier 관련 가중치/편향만 출력된다 -> 적은 데이터로도 빠르게 적응",
      "note": "실제 사전학습 모델(예: torchvision 의 ResNet)을 다운로드하지 않아도 '무엇을 얼리고 무엇을 바꾸는가'의 골격은 이 코드로 이해된다. 8교시 전이학습 개념 정리용 데모."
    }
  ],
  "feature-1": [
    {
      "title": "결측치를 중앙값으로 채우기",
      "lang": "python",
      "code": "import pandas as pd  # 데이터 표를 다루는 라이브러리\nimport numpy as np   # 빈 값(NaN) 표현에 사용\n\n# 나이 일부가 비어 있는 작은 표 만들기\ndf = pd.DataFrame({'age': [20, np.nan, 35, np.nan, 50]})\n\n# 중앙값(가운데 값)을 구해 빈 칸을 채움 (평균보다 이상치에 강함)\ndf['age'] = df['age'].fillna(df['age'].median())\n\nprint(df['age'].tolist())  # 결과: [20.0, 35.0, 35.0, 35.0, 50.0]",
      "note": "median(중앙값)은 튀는 값에 덜 흔들려 결측치 채우기에 안전하다."
    },
    {
      "title": "범주형을 원-핫 인코딩으로 바꾸기",
      "lang": "python",
      "code": "import pandas as pd  # 데이터 처리 라이브러리\n\n# 색깔이라는 글자 범주가 든 표\ndf = pd.DataFrame({'color': ['red', 'blue', 'red', 'green']})\n\n# get_dummies: 각 색깔마다 0/1 칸을 자동 생성\nonehot = pd.get_dummies(df['color'])\n\nprint(onehot.columns.tolist())  # 결과: ['blue', 'green', 'red']\nprint(onehot.iloc[0].tolist())  # 첫 행(red): [False, False, True]  (pandas 2.0+ 기본 dtype=bool)",
      "note": "순서 없는 범주는 원-핫으로 바꿔야 모델이 크기 오해를 하지 않는다."
    },
    {
      "title": "날짜에서 파생 피처 뽑기",
      "lang": "python",
      "code": "import pandas as pd  # 날짜 처리에도 pandas 사용\n\n# 문자열 날짜를 진짜 날짜형으로 변환\ns = pd.to_datetime(['2026-06-30', '2026-12-25'])\n\n# 날짜에서 '월'과 '요일' 같은 숨은 정보 추출\nmonth = s.month        # 월 숫자\nweekday = s.dayofweek  # 0=월요일 ... 6=일요일\n\nprint(month.tolist())    # 결과: [6, 12]\nprint(weekday.tolist())  # 결과: [1, 4]  (화요일, 금요일)",
      "note": "원본 날짜보다 월·요일 같은 파생 피처가 패턴을 더 잘 드러낸다."
    },
    {
      "title": "누수 없이 스케일러는 학습 데이터에만 fit",
      "lang": "python",
      "code": "from sklearn.model_selection import train_test_split  # 데이터 분할\nfrom sklearn.preprocessing import StandardScaler       # 표준화 스케일러\nfrom sklearn.datasets import load_iris\n\nX = load_iris().data\ny = load_iris().target\n# 먼저 학습/테스트로 나눈다\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)\n\nscaler = StandardScaler()\n# 학습 데이터에만 fit(평균·표준편차 계산)하고 그대로 변환한다\nX_train_scaled = scaler.fit_transform(X_train)\n# 테스트는 fit 하지 않고, 학습에서 구한 기준으로 transform 만 한다\nX_test_scaled = scaler.transform(X_test)\nprint(X_train_scaled.mean(axis=0).round(2))  # 결과: 0 근처(학습 데이터 평균이 0으로 정렬됨)\n",
      "note": "테스트에도 fit 하면 테스트의 평균·표준편차가 학습에 새어 들어가 점수가 부풀려진다. transform 만 쓰는 것이 누수 방지의 핵심이다."
    },
    {
      "title": "스케일러 3종 비교 - 이상치가 있을 때 무엇이 강한가",
      "lang": "python",
      "code": "import numpy as np\nimport pandas as pd\nfrom sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler\n\n# 크기 범위가 제각각이고 '나이 200'이라는 이상치가 하나 섞인 예시 데이터\ndf = pd.DataFrame({\n    '나이': [20, 25, 30, 35, 40, 200],          # 200은 잘못 입력된 이상치\n    '연봉': [3000, 3500, 4200, 5000, 6000, 6200],  # 만원 단위, 나이와 크기 차이가 큼\n})\n\n# 세 가지 스케일러를 딕셔너리에 담아 한 번에 비교한다\nscalers = {\n    '표준화(Standard)': StandardScaler(),   # 평균 0, 표준편차 1 로 맞춤\n    '0~1(MinMax)':     MinMaxScaler(),      # 최솟값 0, 최댓값 1 로 맞춤\n    '강건(Robust)':    RobustScaler(),      # 중앙값·IQR 기준(이상치 영향이 작음)\n}\n\nfor name, scaler in scalers.items():\n    scaled = scaler.fit_transform(df)        # 학습(fit)+변환(transform)을 한 번에\n    나이변환 = np.round(scaled[:, 0], 2)      # '나이' 열 결과만 소수 둘째자리로\n    print(f'[{name}] 나이 -> {나이변환.tolist()}')\n\n# 관찰 포인트:\n# MinMax 는 이상치 200 때문에 나머지 정상 값들이 0 근처로 뭉쳐 버린다.\n# Robust 는 중앙값·IQR 을 쓰므로 이상치에 가장 덜 흔들린다.",
      "note": "이상치가 의심되면 RobustScaler 가 안전하다. 데이터에 이상치가 거의 없고 0~1 범위가 필요하면 MinMax, 일반적인 경우엔 Standard 를 기본으로 쓴다."
    },
    {
      "title": "범주형 인코딩 3종 비교 - 원-핫·순서형·타깃",
      "lang": "python",
      "code": "import pandas as pd\nfrom sklearn.preprocessing import OneHotEncoder, OrdinalEncoder, TargetEncoder\n\ndf = pd.DataFrame({\n    '색상': ['빨강', '파랑', '초록', '빨강', '파랑'],   # 순서 없는 소수 범주\n    '등급': ['초급', '중급', '고급', '중급', '초급'],   # 순서가 의미 있는 범주\n    '지역': ['서울', '부산', '대구', '서울', '광주'],   # 종류가 많아질 수 있는 범주\n    '구매': [1, 0, 1, 1, 0],                          # 타깃(1=구매함)\n})\n\n# 1) 원-핫: 순서 없는 소수 범주 -> 항목마다 0/1 칸을 새로 만든다\noh = OneHotEncoder(sparse_output=False)\nprint('원-핫 컬럼:', oh.fit(df[['색상']]).get_feature_names_out().tolist())\nprint(oh.transform(df[['색상']]))\n\n# 2) 순서형: 순서가 있는 범주 -> 정해 준 순서대로 0,1,2 를 매긴다\noe = OrdinalEncoder(categories=[['초급', '중급', '고급']])\nprint('순서형 등급 ->', oe.fit_transform(df[['등급']]).ravel().tolist())  # [0,1,2,1,0]\n\n# 3) 타깃 인코딩: 범주 종류가 많을 때 -> 그 범주의 타깃 평균으로 치환\n#    TargetEncoder 는 내부 교차적합으로 누수를 스스로 막아 준다\nte = TargetEncoder(target_type='binary')\n지역인코딩 = te.fit_transform(df[['지역']], df['구매'])\nprint('타깃 인코딩 지역 ->', 지역인코딩.ravel().round(2).tolist())",
      "note": "순서 없고 종류가 적으면 원-핫, 순서가 있으면 순서형, 종류가 폭발적으로 많으면 타깃 인코딩을 쓴다. 타깃 인코딩은 누수 위험이 커서 반드시 교차적합(TargetEncoder 기본 동작)을 거쳐야 한다."
    },
    {
      "title": "수치·구간화·텍스트 파생 피처 한 번에 만들기",
      "lang": "python",
      "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    '가입일': pd.to_datetime(['2025-01-05', '2025-06-14', '2025-11-30']),\n    '구매액': [12000, 45000, 8000],\n    '방문횟수': [3, 9, 2],\n    '리뷰': ['배송이 빨라요', '품질이 아주 좋고 만족합니다', '별로'],\n})\n\n# 1) 수치 조합·비율: 원본에 없던 관계를 나눗셈으로 만든다\ndf['방문당구매액'] = df['구매액'] / df['방문횟수']   # 방문 한 번당 얼마 썼나\n\n# 2) 구간화(binning): 연속값을 소액/중간/고액 구간 범주로 묶는다\ndf['구매등급'] = pd.cut(df['구매액'],\n                        bins=[0, 10000, 30000, 1_000_000],\n                        labels=['소액', '중간', '고액'])\n\n# 3) 날짜 파생: 월·요일·주말여부(앞 교시 날짜 파생을 확장)\ndf['가입월'] = df['가입일'].dt.month              # 1~12\ndf['주말가입'] = (df['가입일'].dt.dayofweek >= 5).astype(int)  # 토·일이면 1\n\n# 4) 텍스트 파생: 글자수·단어수·키워드 포함 여부를 숫자 신호로\ndf['리뷰길이'] = df['리뷰'].str.len()                       # 글자 수\ndf['단어수'] = df['리뷰'].str.split().str.len()             # 공백 기준 단어 수\ndf['만족언급'] = df['리뷰'].str.contains('좋|만족|빨라').astype(int)  # 긍정 키워드 유무\n\nprint(df[['방문당구매액', '구매등급', '가입월', '주말가입', '단어수', '만족언급']])",
      "note": "파생 피처는 '왜 도움이 될지' 설명할 수 있어야 한다. 방문당구매액은 소비 밀도를, 만족언급은 리뷰 감정을 숫자로 대신 알려 주는 단서다."
    },
    {
      "title": "피처 엔지니어링 전 vs 후 - 같은 모델로 성능 비교",
      "lang": "python",
      "code": "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.ensemble import RandomForestClassifier\n\n# 타이타닉 데이터(생존 예측). 간단히 진행하려 일부 결측 행만 제거\nurl = 'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv'\ndf = pd.read_csv(url).dropna(subset=['Age', 'Embarked'])\ny = df['Survived']  # 정답: 1=생존, 0=사망\n\n# (A) 가공 전: 원본 숫자 피처만 그대로 사용\nbase_cols = ['Pclass', 'Age', 'SibSp', 'Parch', 'Fare']\nX_before = df[base_cols]\n\n# (B) 가공 후: 파생 피처 + 인코딩을 추가\nX_after = X_before.copy()\nX_after['가족수'] = df['SibSp'] + df['Parch'] + 1           # 파생: 함께 탄 가족 크기\nX_after['혼자탑승'] = (X_after['가족수'] == 1).astype(int)   # 파생: 1인 탑승 여부\nX_after['성별'] = (df['Sex'] == 'female').astype(int)        # 인코딩: 여성=1, 남성=0\nX_after['요금구간'] = pd.qcut(df['Fare'], 4, labels=False)    # 파생: 요금 4분위 구간\n\n# 같은 모델·같은 5겹 교차검증으로 공정하게 비교한다\nmodel = RandomForestClassifier(random_state=42)\nbefore = cross_val_score(model, X_before, y, cv=5).mean()\nafter  = cross_val_score(model, X_after,  y, cv=5).mean()\n\nprint(f'가공 전 정확도: {before:.3f}')   # 예: 0.71x\nprint(f'가공 후 정확도: {after:.3f}')    # 예: 0.80x\nprint(f'향상폭: {after - before:+.3f}')  # 파생·인코딩으로 오른 만큼",
      "note": "모델은 그대로 두고 피처만 바꿔 비교하는 것이 핵심이다. 성별 인코딩과 가족수 파생만으로도 점수가 눈에 띄게 오르는 것을 확인하면, '피처가 성능을 좌우한다'는 오늘의 메시지가 숫자로 증명된다."
    }
  ],
  "modeldev-1": [
    {
      "title": "데이터 한 줄로 나누기 (train_test_split)",
      "lang": "python",
      "note": "stratify 를 넣으면 정답 비율이 한쪽으로 쏠리지 않는다.",
      "code": "from sklearn.model_selection import train_test_split  # 분할 도구 불러오기\nfrom sklearn.datasets import load_iris                # 연습용 데이터\n\nX = load_iris().data   # 설명 데이터(꽃 크기)\ny = load_iris().target # 정답(품종 번호)\n\n# 학습 80% / 테스트 20% 로 나눈다 (정답 비율 유지 + 재현 가능하게 고정)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=0)\nprint(len(X_tr), len(X_te))  # 결과: 120 30  → 학습 120개, 테스트 30개"
    },
    {
      "title": "가장 단순한 기준점: 무조건 다수 클래스를 찍는 DummyClassifier",
      "lang": "python",
      "note": "이 점수보다 못하면 우리 모델은 '찍기'만도 못한 것이다.",
      "code": "from sklearn.dummy import DummyClassifier  # 일부러 단순하게 '찍는' 기준 모델\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\n\nX, y = load_iris(return_X_y=True)  # X, y 를 한 번에 받기\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=0)  # 기본 75:25 분할\n\n# strategy='most_frequent': 가장 많이 나온 정답만 계속 찍는 전략\ndummy = DummyClassifier(strategy='most_frequent')\ndummy.fit(X_tr, y_tr)                 # '찍기' 기준을 학습(사실상 다수 클래스 기억)\nprint('찍기 정확도:', round(dummy.score(X_te, y_te), 3))  # 결과 예: 찍기 정확도: 0.342"
    },
    {
      "title": "분류 평가지표 한눈에 — 혼동행렬·정밀도·재현율·ROC AUC",
      "lang": "python",
      "note": "재현율이 낮으면 실제 양성(환자)을 놓친 경우가 많다는 뜻이라 의료·불량검출에서 특히 중요하다.",
      "code": "from sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import confusion_matrix, classification_report, roc_auc_score\n\nX, y = load_breast_cancer(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)\nclf = LogisticRegression(max_iter=5000).fit(X_tr, y_tr)\n\npred = clf.predict(X_te)               # 0/1 예측\nproba = clf.predict_proba(X_te)[:, 1]  # 양성(1)일 확률\n\n# 혼동행렬 = [[TN, FP], [FN, TP]] — 네 칸은 참/거짓 x 양성/음성 조합\nprint(confusion_matrix(y_te, pred))\n# precision·recall·f1 을 클래스별로 한 번에 보여준다\nprint(classification_report(y_te, pred))\n# ROC AUC 는 확률 기준으로 양성/음성을 얼마나 잘 가르는지(1에 가까울수록 좋음)\nprint('ROC AUC:', round(roc_auc_score(y_te, proba), 3))\n"
    },
    {
      "title": "회귀 평가지표 — MAE·RMSE·R2",
      "lang": "python",
      "note": "MAE는 평균 오차 크기, RMSE는 큰 오차에 더 민감, R2는 1에 가까울수록 잘 맞춘 것이다.",
      "code": "from sklearn.datasets import load_diabetes\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\n\nX, y = load_diabetes(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)\nreg = LinearRegression().fit(X_tr, y_tr)\npred = reg.predict(X_te)\n\nprint('MAE :', round(mean_absolute_error(y_te, pred), 2))        # 평균 절대 오차\nprint('RMSE:', round(mean_squared_error(y_te, pred) ** 0.5, 2))  # 제곱오차 평균의 제곱근\nprint('R2  :', round(r2_score(y_te, pred), 3))                   # 결정계수\n"
    }
  ],
  "modeldev-2": [
    {
      "title": "랜덤 서치로 빠르게 좋은 설정 찾기",
      "lang": "python",
      "note": "n_iter 만큼만 무작위로 시험하므로 넓은 범위를 빠르게 훑는다.",
      "code": "from sklearn.datasets import load_iris\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import RandomizedSearchCV  # 무작위 탐색 도구\n\nX, y = load_iris(return_X_y=True)\nparam = {'n_estimators': [50, 100, 200, 300], 'max_depth': [2, 3, 4, 5, None]}  # 후보 범위\n\n# n_iter=8: 모든 조합이 아니라 무작위 8개 조합만 시험(빠름)\nsearch = RandomizedSearchCV(RandomForestClassifier(random_state=0), param,\n                            n_iter=8, cv=5, random_state=0)\nsearch.fit(X, y)\nprint('최적 점수:', round(search.best_score_, 3))  # 결과 예: 최적 점수: 0.967"
    },
    {
      "title": "여러 모델을 모으는 투표(VotingClassifier)",
      "lang": "python",
      "note": "성격이 다른 모델을 모으면 한쪽의 실수를 다른 쪽이 메워 준다.",
      "code": "from sklearn.datasets import load_iris\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.ensemble import VotingClassifier  # 여러 모델의 다수결 투표\nfrom sklearn.model_selection import cross_val_score\n\nX, y = load_iris(return_X_y=True)\n# 서로 다른 두 모델을 후보로 등록\nvote = VotingClassifier([\n    ('lr', LogisticRegression(max_iter=1000)),  # 모델1: 로지스틱 회귀\n    ('dt', DecisionTreeClassifier(max_depth=3)),# 모델2: 얕은 결정트리\n], voting='hard')  # 'hard': 다수결로 최종 결정\n\nscore = cross_val_score(vote, X, y, cv=5).mean()  # 5겹 교차검증 평균\nprint('앙상블 평균 점수:', round(score, 3))         # 결과 예: 앙상블 평균 점수: 0.96"
    },
    {
      "title": "배깅 vs 부스팅 정면 비교 - RandomForest·GradientBoosting·Stacking",
      "lang": "python",
      "code": "from sklearn.datasets import load_breast_cancer            # 유방암 진단(이진 분류) 데이터\nfrom sklearn.model_selection import cross_val_score          # 교차검증 점수 도구\nfrom sklearn.ensemble import (\n    RandomForestClassifier,      # 배깅: 서로 다른 트리들을 동시에 키워 평균/다수결\n    GradientBoostingClassifier,  # 부스팅: 앞 모델의 실수를 뒤 모델이 순서대로 보완\n    StackingClassifier,          # 스태킹: 여러 모델 예측 위에 '심판 모델'을 한 겹 더\n)\nfrom sklearn.linear_model import LogisticRegression          # 스태킹의 최종 심판(메타모델)용\n\n# 1) 데이터 준비 (X: 종양 특징들, y: 양성/악성 0/1)\nX, y = load_breast_cancer(return_X_y=True)\n\n# 2) 배깅 계열 - 랜덤포레스트: 트리 200개의 다수결\nrf = RandomForestClassifier(n_estimators=200, random_state=42)\nrf_score = cross_val_score(rf, X, y, cv=5).mean()   # 5겹 교차검증 평균\nprint('배깅(RandomForest)   :', round(rf_score, 3))  # 결과 예: 0.958\n\n# 3) 부스팅 계열 - 그래디언트 부스팅: 실수를 순서대로 메워 나감\ngb = GradientBoostingClassifier(random_state=42)\ngb_score = cross_val_score(gb, X, y, cv=5).mean()\nprint('부스팅(GradientBoost):', round(gb_score, 3))  # 결과 예: 0.960\n\n# 4) 스태킹 - 두 앙상블의 예측을 로지스틱회귀가 최종 종합\nstack = StackingClassifier(\n    estimators=[('rf', rf), ('gb', gb)],   # 1층: 서로 성격이 다른 두 앙상블\n    final_estimator=LogisticRegression(max_iter=1000),  # 2층: 둘의 답을 합치는 심판\n    cv=5,                                  # 1층 예측을 교차검증 방식으로 만들어 누수 방지\n)\nstack_score = cross_val_score(stack, X, y, cv=5).mean()\nprint('스태킹(RF+GB 종합)   :', round(stack_score, 3))  # 결과 예: 0.965\n\n# 5) 한눈에 비교 - 어떤 앙상블이 이 데이터에 가장 잘 맞는지 확인\nprint('\\n가장 높은 점수:', round(max(rf_score, gb_score, stack_score), 3))",
      "note": "7교시 실습용. 같은 데이터에서 배깅(RandomForest)과 부스팅(GradientBoosting)의 교차검증 점수를 나란히 재고, 둘을 스태킹으로 합치면 더 오르는지까지 확인한다.\n앙상블 3종(배깅·부스팅·스태킹)의 직관을 코드 한 흐름으로 체감하는 것이 목표다."
    }
  ],
  "rag-1": [
    {
      "title": "임베딩으로 문장의 의미 비슷함을 숫자로 재 보기",
      "lang": "python",
      "code": "from langchain_openai import OpenAIEmbeddings  # 임베딩 모델 불러오기\nfrom numpy import dot  # 두 벡터의 내적을 구하는 함수\nfrom numpy.linalg import norm  # 벡터의 길이(크기)를 구하는 함수\n\nemb = OpenAIEmbeddings(model=\"text-embedding-3-small\")  # 임베딩 모델 준비\nv1 = emb.embed_query(\"강아지가 공원을 뛴다\")  # 첫 문장을 벡터로 변환\nv2 = emb.embed_query(\"개가 공원에서 달린다\")  # 의미가 비슷한 문장을 벡터로 변환\nv3 = emb.embed_query(\"오늘 주식 시장이 폭락했다\")  # 의미가 전혀 다른 문장을 벡터로 변환\n\ndef cos(a, b):  # 코사인 유사도를 계산하는 함수 정의\n    return dot(a, b) / (norm(a) * norm(b))  # 내적을 각 벡터 길이의 곱으로 나눈다\n\nprint(round(cos(v1, v2), 3))  # 결과: 0.8 부근(비슷한 문장이라 높음)\nprint(round(cos(v1, v3), 3))  # 결과: 0.1 부근(다른 주제라 낮음)",
      "note": "의미가 비슷한 문장은 유사도가 높고 다른 주제는 낮게 나오는 것을 눈으로 확인하는 게 핵심이다."
    },
    {
      "title": "긴 글을 조각으로 잘라 개수와 모양 확인하기",
      "lang": "python",
      "code": "from langchain_text_splitters import RecursiveCharacterTextSplitter  # 분할기 불러오기\n\ntext = \"RAG는 검색과 생성을 합친 방법이다. \" * 20  # 같은 문장을 20번 이어 붙여 긴 글을 만든다\nsplitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=20)  # 100자씩, 20자 겹치게\nchunks = splitter.split_text(text)  # 긴 글을 조각 리스트로 자른다\n\nprint(f\"조각 수: {len(chunks)}\")  # 결과: 조각 수: 8 (글 길이에 따라 달라짐)\nprint(chunks[0])  # 결과: 첫 조각 내용이 100자 안쪽으로 출력됨",
      "note": "chunk_size 와 chunk_overlap 숫자를 바꾸면 조각 수가 달라지는 것을 체감하는 예제다."
    },
    {
      "title": "청킹 전략 비교 — 조각 크기를 바꿔 개수·평균 길이 보기",
      "lang": "python",
      "code": 'from langchain_text_splitters import RecursiveCharacterTextSplitter  # 재귀 분할기\n\ntext = ("RAG는 검색과 생성을 결합한다. 먼저 문서를 조각으로 나눈다. "\n        "각 조각을 벡터로 만든다. 질문이 오면 가까운 조각을 찾는다. ") * 8  # 예시 긴 글\n\n# 같은 글을 서로 다른 chunk_size 로 잘라 결과를 비교한다\nfor size in (80, 200, 400):  # 조각 크기를 3가지로 바꿔 본다\n    splitter = RecursiveCharacterTextSplitter(chunk_size=size, chunk_overlap=int(size * 0.1))  # 겹침은 10%\n    chunks = splitter.split_text(text)  # 긴 글을 조각으로 자른다\n    avg = sum(len(c) for c in chunks) / len(chunks)  # 조각 평균 길이 계산\n    print(f"size={size:>3} -> 조각 {len(chunks):>2}개, 평균 {avg:.0f}자")\n# 결과 예:\n# size= 80 -> 조각 16개, 평균 61자   (작게 자르면 조각이 많고 문맥이 짧다)\n# size=200 -> 조각  7개, 평균 148자\n# size=400 -> 조각  4개, 평균 250자   (크게 자르면 조각이 적고 불필요한 내용이 섞인다)',
      "note": "작게 자르면 정확하지만 문맥이 끊기고, 크게 자르면 문맥은 풍부하나 잡음이 섞인다. 우리 문서에 맞는 크기를 실험으로 찾는 게 인덱싱의 첫 단추다."
    },
    {
      "title": "자르기→임베딩→저장, 인덱싱 한 번에 완성하기 (Chroma)",
      "lang": "python",
      "code": 'from langchain_text_splitters import RecursiveCharacterTextSplitter  # 분할기\nfrom langchain_openai import OpenAIEmbeddings  # 임베딩 모델\nfrom langchain_chroma import Chroma  # 벡터 DB\nfrom langchain_core.documents import Document  # 문서 조각 객체\n\n# 1) 색인할 원문(실제로는 파일/DB 에서 읽어온다)\nraw = "연차 휴가는 입사 1년 후부터 15일이 부여된다. 재택근무는 팀장 승인 시 주 2회까지 가능하다. 경조사비는 결혼 시 30만원을 지급한다."\n\n# 2) 긴 글을 조각으로 자른다(검색의 최소 단위 만들기)\nsplitter = RecursiveCharacterTextSplitter(chunk_size=40, chunk_overlap=5)\nchunks = [Document(page_content=c) for c in splitter.split_text(raw)]\n\n# 3) 조각을 임베딩해 Chroma 에 저장한다 - 이 저장 과정이 바로 인덱싱\nembeddings = OpenAIEmbeddings(model="text-embedding-3-small")\nvectordb = Chroma.from_documents(chunks, embeddings, persist_directory="chroma_db")\nprint(f"{len(chunks)}개 조각을 색인해 chroma_db 폴더에 저장했다")\n\n# 4) 저장한 인덱스로 바로 유사도 검색을 해 본다(다음 실습에서 리트리버로 확장)\nhits = vectordb.similarity_search("재택근무 며칠까지 돼?", k=1)\nprint(hits[0].page_content)  # 결과: 재택근무 관련 조각이 검색된다',
      "note": "자르기(split)->임베딩(embed)->저장(Chroma.from_documents)의 3단계가 인덱싱의 전부다. persist_directory 폴더에 저장해 두면 다음 실습(리트리버)에서 그대로 불러 쓴다."
    }
  ],
  "rag-2": [
    {
      "title": "리트리버로 관련 조각만 빠르게 가져오기",
      "lang": "python",
      "code": "from langchain_chroma import Chroma  # 벡터 DB 불러오기\nfrom langchain_openai import OpenAIEmbeddings  # 임베딩 모델\n\nembeddings = OpenAIEmbeddings(model=\"text-embedding-3-small\")  # 색인 때와 같은 모델\nvectordb = Chroma(persist_directory=\"chroma_db\", embedding_function=embeddings)  # 저장 폴더 로드\nretriever = vectordb.as_retriever(search_kwargs={\"k\": 3})  # 상위 3개만 가져오는 리트리버\n\ndocs = retriever.invoke(\"환불은 며칠 안에 가능한가요?\")  # 질문을 넣어 관련 조각을 가져온다\nprint(f\"가져온 조각 수: {len(docs)}\")  # 결과: 가져온 조각 수: 3\nprint(docs[0].page_content[:60])  # 결과: 첫 조각의 앞 60자가 출력됨",
      "note": "k 값을 바꾸면 가져오는 조각 수가 그대로 바뀌는 것을 확인한다."
    },
    {
      "title": "키워드(BM25)와 벡터를 합친 하이브리드 검색",
      "lang": "python",
      "code": "from langchain_community.retrievers import BM25Retriever  # 키워드 기반 검색기\n# (EnsembleRetriever는 langchain 1.0에서 langchain_classic으로 이동 — 실제 사용 시 그 경로로 import)\nfrom langchain_core.documents import Document  # 문서 조각 객체\n\ndocs = [Document(page_content=t) for t in [  # 간단한 예시 문서 3개를 만든다\n    \"환불은 구매 후 7일 이내 가능합니다\",\n    \"배송은 보통 2~3일 걸립니다\",\n    \"회원 등급은 구매액에 따라 정해집니다\",\n]]\nbm25 = BM25Retriever.from_documents(docs)  # 단어가 겹치는지로 찾는 키워드 검색기 생성\nbm25.k = 2  # 상위 2개만 반환하도록 설정\n# 실제로는 벡터 리트리버와 EnsembleRetriever([bm25, vector], weights=[0.5,0.5])로 합친다\nprint(bm25.invoke(\"환불\")[0].page_content)  # 결과: 환불은 구매 후 7일 이내 가능합니다",
      "note": "키워드 검색은 정확한 단어 일치에 강해 벡터 검색의 약점을 보완한다."
    },
    {
      "title": "고급 리트리버 3종을 실제로 엮어 보기 (MultiQuery · Ensemble · LongContextReorder)",
      "lang": "python",
      "code": "# 어제 만든 인덱스에 고급 리트리버를 층층이 얹어 검색 품질을 끌어올린다\nfrom langchain_chroma import Chroma  # 벡터 DB\nfrom langchain_openai import OpenAIEmbeddings, ChatOpenAI  # 임베딩 모델과 LLM\nfrom langchain_community.retrievers import BM25Retriever  # 키워드 검색기\nfrom langchain.retrievers.multi_query import MultiQueryRetriever  # 질문을 여러 표현으로 바꿔 검색\nfrom langchain_community.document_transformers import LongContextReorder  # 중요 문서를 앞뒤로 재배치\n# (EnsembleRetriever는 langchain 1.0에서 langchain_classic 으로 이동 - 실제 사용 시 그 경로로 import)\nfrom langchain_classic.retrievers import EnsembleRetriever\n\n# 1) 어제 저장한 인덱스를 같은 임베딩 모델로 연다\nembeddings = OpenAIEmbeddings(model=\"text-embedding-3-small\")\nvectordb = Chroma(persist_directory=\"chroma_db\", embedding_function=embeddings)\nvector_ret = vectordb.as_retriever(search_kwargs={\"k\": 4})  # 의미 기반 검색기\n\n# 2) 같은 조각들로 키워드 검색기(BM25)도 만든다\nall_docs = vectordb.similarity_search(\"\", k=1000)  # 색인된 조각을 넉넉히 가져와\nbm25 = BM25Retriever.from_documents(all_docs)  # 단어 일치로 찾는 검색기 생성\nbm25.k = 4  # 상위 4개 반환\n\n# 3) 두 검색기를 EnsembleRetriever로 묶는다(가중치 절반씩)\nensemble = EnsembleRetriever(retrievers=[bm25, vector_ret], weights=[0.5, 0.5])\n\n# 4) 그 위에 MultiQuery를 얹어 질문을 여러 표현으로 바꿔 검색한다\nllm = ChatOpenAI(model=\"gpt-4o-mini\", temperature=0)\nmulti = MultiQueryRetriever.from_llm(retriever=ensemble, llm=llm)\n\n# 5) 실제로 검색하고, 마지막에 LongContextReorder로 순서를 다듬는다\ndocs = multi.invoke(\"연차 휴가는 며칠인가요?\")  # 여러 표현으로 검색해 합친 결과\nreordered = LongContextReorder().transform_documents(docs)  # 중요 문서를 앞뒤로 재배치\nprint(f\"최종 문서 수: {len(reordered)}\")  # 결과: 예 6\nfor i, d in enumerate(reordered, 1):  # 순서대로 미리보기\n    print(f\"[{i}] {d.page_content[:50]}\")",
      "note": "기본 벡터 검색 -> 키워드와 합치기(Ensemble) -> 표현 늘리기(MultiQuery) -> 순서 다듬기(Reorder)로 층층이 쌓는 흐름을 한 파일에서 확인한다. 각 층을 하나씩 빼 보며 결과가 어떻게 달라지는지 비교하면 어떤 층이 우리 문서에 효과적인지 감이 잡힌다."
    }
  ],
  "rag-3": [
    {
      "title": "같은 질문 두 번으로 캐싱 효과 체감하기",
      "lang": "python",
      "code": "import time  # 시간을 재는 표준 라이브러리\nfrom langchain_openai import ChatOpenAI  # 대화형 LLM\nfrom langchain_core.caches import InMemoryCache  # 메모리에 결과를 저장하는 캐시\nfrom langchain_core.globals import set_llm_cache  # 전역 캐시를 설정하는 함수\n\nset_llm_cache(InMemoryCache())  # LLM 호출 결과를 메모리에 캐싱하도록 켠다\nllm = ChatOpenAI(model=\"gpt-4o-mini\")  # 사용할 모델 준비\n\nt1 = time.time()  # 첫 호출 시작 시각 기록\nllm.invoke(\"RAG를 한 문장으로 설명해줘\")  # 처음에는 실제로 API를 호출해 느리다\nprint(f\"1차: {time.time()-t1:.2f}초\")  # 결과: 1차: 1.20초 (예시)\n\nt2 = time.time()  # 두 번째 호출 시작 시각 기록\nllm.invoke(\"RAG를 한 문장으로 설명해줘\")  # 같은 질문은 캐시에서 바로 가져와 빠르다\nprint(f\"2차: {time.time()-t2:.2f}초\")  # 결과: 2차: 0.00초 (캐시 적중)",
      "note": "같은 입력은 캐시에서 즉시 반환되어 비용과 시간을 크게 줄여 준다."
    },
    {
      "title": "메타데이터 필터로 특정 문서만 검색하기",
      "lang": "python",
      "code": "from langchain_chroma import Chroma  # 벡터 DB\nfrom langchain_openai import OpenAIEmbeddings  # 임베딩 모델\n\nembeddings = OpenAIEmbeddings(model=\"text-embedding-3-small\")  # 색인 때와 같은 모델\nvectordb = Chroma(persist_directory=\"chroma_db\", embedding_function=embeddings)  # 인덱스 로드\n\n# filter 에 조건을 주면 꼬리표가 맞는 조각만 검색 대상으로 삼는다\nresults = vectordb.similarity_search(\n    \"휴가 규정\",                    # 검색할 질문\n    k=3,                            # 상위 3개\n    filter={\"source\": \"docs/company_policy.pdf\"}  # 이 파일에서 온 조각만 검색\n)\nprint(len(results))  # 결과: 3 (해당 문서 안에서만 찾음)",
      "note": "여러 문서가 섞여 있을 때 원하는 문서로 검색 범위를 좁혀 정확도와 속도를 높인다."
    },
    {
      "title": "RAGAS로 내 RAG를 자동 채점하기 (충실도·답변 관련성·문맥 정밀도)",
      "lang": "python",
      "code": "# 만든 RAG의 답 품질을 사람이 일일이 안 보고 숫자로 채점한다 (설치: pip install ragas datasets)\nfrom datasets import Dataset  # 평가 데이터를 담는 그릇\nfrom ragas import evaluate  # 평가를 실행하는 함수\nfrom ragas.metrics import faithfulness, answer_relevancy, context_precision  # 세 가지 지표\n# qa_chain, retriever 는 2일차에서 만든 것을 재사용한다고 가정\n\n# 1) 내 문서에서 '답이 분명한' 질문과 정답을 준비한다\nquestions = [\"연차 휴가는 며칠인가요?\", \"환불은 며칠 이내 가능한가요?\"]\nground_truths = [\"연차는 15일이다\", \"환불은 구매 후 7일 이내 가능하다\"]  # 사람이 아는 정답\n\n# 2) 각 질문을 RAG에 넣어 '답변'과 '근거(검색된 문맥)'를 모은다\nanswers, contexts = [], []  # 답과 근거를 담을 빈 리스트\nfor q in questions:  # 질문을 하나씩 돌면서\n    answers.append(qa_chain.invoke(q))  # RAG가 만든 답을 저장\n    contexts.append([d.page_content for d in retriever.invoke(q)])  # 그때 검색된 조각들을 저장\n\n# 3) RAGAS가 요구하는 형식(질문·답·근거·정답)으로 데이터셋을 만든다\ndata = Dataset.from_dict({\n    \"question\": questions,\n    \"answer\": answers,\n    \"contexts\": contexts,\n    \"ground_truth\": ground_truths,\n})\n\n# 4) 세 지표로 채점한다\nresult = evaluate(data, metrics=[faithfulness, answer_relevancy, context_precision])\nprint(result)  # 결과: {'faithfulness': 0.92, 'answer_relevancy': 0.88, 'context_precision': 0.80} 같은 점수\n# 충실도=지어내지 않았나, 답변 관련성=질문에 맞나, 문맥 정밀도=검색이 쓸모 있었나",
      "note": "이 점수를 '기준선'으로 적어 두고, k나 청킹을 하나만 바꿔 다시 재면 개선 여부를 숫자로 확인할 수 있다. 한 번에 하나씩만 바꾸는 것이 실험의 철칙이다."
    }
  ],
  "langchain-1": [
    {
      "title": "모델 한 번 호출해 보기 (가장 단순한 형태)",
      "lang": "python",
      "code": "# Anthropic 채팅 모델 연동 클래스를 가져온다\nfrom langchain_anthropic import ChatAnthropic\n# 모델 객체를 만든다(어떤 모델을 쓸지 이름으로 지정)\nmodel = ChatAnthropic(model=\"claude-opus-4-8\")\n# invoke에 질문 문자열을 넣어 모델을 한 번 실행한다\nanswer = model.invoke(\"LangChain을 한 문장으로 설명해줘\")\n# 모델 답 객체의 content에 실제 답 글자가 들어 있으므로 그것을 출력한다\nprint(answer.content)  # 결과 예: 'LangChain은 LLM 앱을 부품처럼 조립하게 돕는 도구다.'",
      "note": "체인을 만들기 전에 모델만 단독으로 불러 보는 가장 기초 예제다."
    },
    {
      "title": "프롬프트 양식에 값 끼워 넣어 확인하기",
      "lang": "python",
      "code": "# 프롬프트 양식을 만드는 도구를 가져온다\nfrom langchain_core.prompts import ChatPromptTemplate\n# {언어} 자리를 가진 번역 지시 프롬프트를 만든다\nprompt = ChatPromptTemplate.from_template(\"'{word}'를 {언어}로 번역해줘\")\n# 빈칸에 실제 값을 채워 완성된 프롬프트가 어떻게 보이는지 만들어 본다\nfilled = prompt.invoke({\"word\": \"사과\", \"언어\": \"영어\"})\n# 완성된 메시지 내용을 출력해 양식이 잘 채워졌는지 눈으로 확인한다\nprint(filled.messages[0].content)  # 결과: \"'사과'를 영어로 번역해줘\"",
      "note": "모델에 보내기 전, 프롬프트가 어떻게 채워지는지 직접 눈으로 보는 점이 핵심이다."
    },
    {
      "title": "JSON으로 구조화 출력 받기",
      "lang": "python",
      "code": "# JSON 형태로 결과를 파싱해 주는 출력 파서를 가져온다\nfrom langchain_core.output_parsers import JsonOutputParser\n# 프롬프트 양식 도구를 가져온다\nfrom langchain_core.prompts import ChatPromptTemplate\n# 모델 연동 클래스를 가져온다\nfrom langchain_anthropic import ChatAnthropic\n# 이름과 나이를 JSON으로 뽑아 달라고 지시하는 프롬프트를 만든다\nprompt = ChatPromptTemplate.from_template(\n    \"문장에서 이름과 나이를 JSON으로 뽑아줘: {sentence}\")  # 빈칸 sentence에 문장이 들어간다\n# 프롬프트 | 모델 | JSON파서 순으로 체인을 조립한다\nchain = prompt | ChatAnthropic(model=\"claude-opus-4-8\") | JsonOutputParser()\n# 체인을 실행하면 문자열이 아니라 파이썬 딕셔너리로 결과가 나온다\nout = chain.invoke({\"sentence\": \"홍길동은 30살이다\"})\n# 딕셔너리이므로 키로 값을 바로 꺼낼 수 있다\nprint(out)  # 결과 예: {'이름': '홍길동', '나이': 30}",
      "note": "StrOutputParser 대신 JsonOutputParser를 쓰면 결과를 바로 코드에서 다룰 수 있다."
    },
    {
      "title": "빈칸만 바꿔 여러 언어로 돌리는 번역기 체인",
      "lang": "python",
      "code": "# 프롬프트·모델·파서 부품을 가져온다\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import StrOutputParser\nfrom langchain_anthropic import ChatAnthropic\n\n# 빈칸 두 개(text, target)를 가진 번역 지시 프롬프트를 만든다\nprompt = ChatPromptTemplate.from_template(\n    \"다음 문장을 {target}로 자연스럽게 번역해줘. 번역문만 출력해:\\n\\n{text}\")\nmodel = ChatAnthropic(model=\"claude-opus-4-8\")  # 글을 생성할 모델(opus-4-8은 temperature 지정 없이 사용)\nparser = StrOutputParser()                      # 답에서 글자만 깔끔히 추출\n\n# 세 부품을 파이프(|)로 이어 번역기 체인을 조립한다\ntranslator = prompt | model | parser\n\n# 코드는 그대로 두고, 입력의 target만 바꿔 여러 언어로 번역해 본다\nfor target in [\"영어\", \"일본어\", \"프랑스어\"]:\n    result = translator.invoke({\"text\": \"오늘 회의는 오후 3시에 시작합니다.\", \"target\": target})\n    print(f\"[{target}] {result}\")\n# 결과 예: [영어] The meeting starts at 3 PM today. / [일본어] 今日の会議は午後3時に始まります。 ...",
      "note": "프롬프트의 빈칸(target)만 바꾸면 코드 수정 없이 번역 언어가 바뀐다. 프롬프트 문구를 '한 문장으로 요약해줘'로만 바꾸면 똑같은 구조가 그대로 요약기가 된다 — '부품은 그대로, 프롬프트만 교체'가 LangChain 재사용의 핵심이다."
    }
  ],
  "langchain-2": [
    {
      "title": "대화 메모리로 앞말 기억하기",
      "lang": "python",
      "code": "# 대화 기록을 자동으로 끼워 주는 래퍼를 가져온다\nfrom langchain_core.runnables.history import RunnableWithMessageHistory\n# 대화를 메모리에 보관하는 저장소를 가져온다\nfrom langchain_core.chat_history import InMemoryChatMessageHistory\n# 모델을 가져온다\nfrom langchain_anthropic import ChatAnthropic\n# 세션별 대화 기록을 담아 둘 딕셔너리를 만든다\nstore = {}\n# 세션 id로 그 사람의 대화 기록을 돌려주는 함수를 정의한다\ndef get_history(session_id):\n    if session_id not in store:           # 처음 보는 세션이면\n        store[session_id] = InMemoryChatMessageHistory()  # 새 기록 객체를 만들어 둔다\n    return store[session_id]              # 해당 세션의 기록을 돌려준다\n# 모델에 '기록을 자동으로 함께 보내기' 기능을 입힌다\nchat = RunnableWithMessageHistory(ChatAnthropic(model=\"claude-opus-4-8\"), get_history)\n# 같은 session_id로 첫 마디를 보낸다(이름을 알려 준다)\ncfg = {\"configurable\": {\"session_id\": \"u1\"}}  # 누구의 대화인지 식별\nchat.invoke(\"내 이름은 길동이야\", config=cfg)   # 모델이 기록에 저장\n# 같은 세션으로 다시 물으면 앞말을 기억해 답한다\nprint(chat.invoke(\"내 이름이 뭐였지?\", config=cfg).content)  # 결과: '길동입니다.'",
      "note": "session_id를 같게 유지하면 모델이 직전 대화를 이어받아 맥락을 기억한다."
    },
    {
      "title": "나만의 도구(Tool) 만들어 모델에 연결",
      "lang": "python",
      "code": "# 함수를 도구로 등록해 주는 데코레이터를 가져온다\nfrom langchain_core.tools import tool\n# 모델을 가져온다\nfrom langchain_anthropic import ChatAnthropic\n# @tool을 붙여 일반 함수를 모델이 쓸 수 있는 도구로 만든다\n@tool\ndef add(a: int, b: int) -> int:\n    \"\"\"두 정수를 더한다\"\"\"  # 설명: 모델이 이 글을 보고 언제 쓸지 판단한다\n    return a + b           # 실제 덧셈 결과를 돌려준다\n# 모델에 도구 목록을 묶어(bind) 도구를 쓸 수 있게 한다\nmodel = ChatAnthropic(model=\"claude-opus-4-8\").bind_tools([add])\n# 계산이 필요한 질문을 던진다\nres = model.invoke(\"12345 더하기 6789는?\")\n# 모델이 직접 계산하지 않고 add 도구를 쓰겠다고 요청한 내역을 출력한다\nprint(res.tool_calls)  # 결과 예: [{'name':'add','args':{'a':12345,'b':6789}}]",
      "note": "모델은 답을 지어내는 대신 add 도구를 호출하겠다고 알려 주어 정확한 계산이 가능해진다."
    },
    {
      "title": "RunnableParallel로 댓글을 한 번에 요약·감정·키워드 뽑고 부정이면 분기",
      "lang": "python",
      "code": "from langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import StrOutputParser\nfrom langchain_core.runnables import RunnableParallel, RunnableBranch\nfrom langchain_anthropic import ChatAnthropic\n\nmodel = ChatAnthropic(model='claude-opus-4-8')\n\n# 1) 작은 체인 3개를 만든다\nsummary_chain = ChatPromptTemplate.from_template('한 문장으로 요약: {comment}') | model | StrOutputParser()\n# 감정은 세 단어 중 하나로만 답하게 제약한다\nsentiment_chain = ChatPromptTemplate.from_template('positive/negative/neutral 중 하나로만 답해: {comment}') | model | StrOutputParser()\nkeyword_chain = ChatPromptTemplate.from_template('핵심 키워드 3개를 쉼표로: {comment}') | model | StrOutputParser()\n\n# 2) 셋을 병렬로 묶어 댓글 하나를 동시에 처리한다\nparallel = RunnableParallel(summary=summary_chain, sentiment=sentiment_chain, keywords=keyword_chain)\n\n# 3) 감정에 따라 뒤 처리를 가른다(부정이면 이관, 아니면 감사 답변)\ndef is_negative(d):\n    return 'negative' in d['sentiment'].lower()\n\nbranch = RunnableBranch(\n    (is_negative, lambda d: {**d, 'action': '담당자 이관 + 사과 답변 초안 생성'}),\n    lambda d: {**d, 'action': '자동 감사 답변'},\n)\n\nresult = (parallel | branch).invoke({'comment': '배송이 너무 늦어서 화가 나요'})\nprint(result['sentiment'], '->', result['action'])  # 결과 예: negative -> 담당자 이관 + 사과 답변 초안 생성\n",
      "note": "한 번의 invoke로 세 분석이 병렬로 끝나고, 감정에 따라 뒤 처리가 갈라지는 것이 실서비스 댓글 처리의 전형이다."
    },
    {
      "title": "정해진 모양(스키마)으로 강제해서 뽑기 — PydanticOutputParser",
      "lang": "python",
      "code": "from pydantic import BaseModel\nfrom langchain_core.output_parsers import PydanticOutputParser\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_anthropic import ChatAnthropic\n\n# 1) 원하는 결과의 '모양'을 클래스로 정의한다(이름은 문자열, 나이는 정수)\nclass Person(BaseModel):\n    name: str\n    age: int\n\n# 2) 이 스키마를 강제하는 파서를 만든다\nparser = PydanticOutputParser(pydantic_object=Person)\n\n# 3) 프롬프트에 형식 안내문을 끼워 모델이 그 모양을 지키게 한다\nprompt = ChatPromptTemplate.from_template(\n    '문장에서 인물 정보를 뽑아줘.\\n{format}\\n문장: {sentence}'\n).partial(format=parser.get_format_instructions())\n\nchain = prompt | ChatAnthropic(model='claude-opus-4-8') | parser\nout = chain.invoke({'sentence': '홍길동은 30살이다'})\n# 결과가 문자열이 아니라 Person 객체라 점(.)으로 필드에 접근할 수 있다\nprint(out.name, out.age)  # 결과: 홍길동 30\n",
      "note": "JsonOutputParser는 아무 JSON이나 받지만, PydanticOutputParser는 타입·필드까지 강제해 잘못된 형식이면 에러로 걸러 준다."
    }
  ],
  "langchain-3": [
    {
      "title": "체인 결과를 스트리밍으로 받아 출력",
      "lang": "python",
      "code": "# 프롬프트·모델·파서를 가져온다\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import StrOutputParser\nfrom langchain_anthropic import ChatAnthropic\n# 짧은 글짓기를 시키는 프롬프트를 만든다\nprompt = ChatPromptTemplate.from_template(\"{topic}에 대한 짧은 시를 써줘\")\n# 프롬프트→모델→파서로 체인을 조립한다\nchain = prompt | ChatAnthropic(model=\"claude-opus-4-8\") | StrOutputParser()\n# invoke 대신 stream을 쓰면 답이 조각으로 나뉘어 들어온다\nfor chunk in chain.stream({\"topic\": \"봄비\"}):  # 조각을 순서대로 하나씩 받는다\n    print(chunk, end=\"\", flush=True)            # 줄바꿈 없이 즉시 화면에 이어 출력\n# 결과: 시가 한 글자씩 또르르 흘러나오며 출력된다",
      "note": "invoke를 stream으로 바꾸기만 하면 같은 체인이 글자를 흘려보내는 스트리밍이 된다."
    },
    {
      "title": "캐싱으로 같은 질문 빠르게 답하기",
      "lang": "python",
      "code": "# 시간 측정을 위해 time 모듈을 가져온다\nimport time\n# 캐시 설정 함수와 메모리 캐시를 가져온다\nfrom langchain_core.globals import set_llm_cache\nfrom langchain_community.cache import InMemoryCache\n# 모델을 가져온다\nfrom langchain_anthropic import ChatAnthropic\n# 메모리 캐시를 켠다(같은 입력은 저장된 답을 재사용)\nset_llm_cache(InMemoryCache())\n# 모델 객체를 만든다\nmodel = ChatAnthropic(model=\"claude-opus-4-8\")\n# 첫 호출 시각을 기록하고 모델을 부른다(실제로 모델이 일한다)\nt1 = time.time(); model.invoke(\"하늘은 왜 파랄까?\")\n# 첫 호출에 걸린 시간을 출력한다(예: 1.8초)\nprint(\"1차:\", round(time.time() - t1, 2), \"초\")\n# 같은 질문을 다시 부른다(이번엔 캐시에서 즉시 가져온다)\nt2 = time.time(); model.invoke(\"하늘은 왜 파랄까?\")\n# 두 번째는 거의 0초임을 출력해 캐시 효과를 확인한다\nprint(\"2차:\", round(time.time() - t2, 2), \"초\")  # 결과 예: 2차: 0.0 초",
      "note": "두 번째 호출이 사실상 0초인 것은 모델을 다시 부르지 않고 캐시에서 답을 꺼냈기 때문이다."
    },
    {
      "title": "스스로 도구를 골라 쓰는 ReAct 에이전트 맛보기",
      "lang": "python",
      "code": "from datetime import datetime\nfrom langchain_core.tools import tool\nfrom langchain.agents import create_tool_calling_agent, AgentExecutor\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_anthropic import ChatAnthropic\n\n# 1) 도구 2개를 정의한다\n@tool\ndef add(a: int, b: int) -> int:\n    \"\"\"두 정수를 더한다.\"\"\"\n    return a + b\n\n@tool\ndef get_time() -> str:\n    \"\"\"지금 시각을 문자열로 알려준다.\"\"\"\n    return datetime.now().strftime('%H:%M')\n\n# 2) 프롬프트와 모델로 에이전트를 구성한다\nprompt = ChatPromptTemplate.from_messages([\n    ('system', '너는 도구를 활용하는 비서다.'),\n    ('human', '{input}'),\n    ('placeholder', '{agent_scratchpad}'),  # 생각·도구호출 기록이 쌓이는 자리\n])\nmodel = ChatAnthropic(model='claude-opus-4-8')\nagent = create_tool_calling_agent(model, [add, get_time], prompt)\nexecutor = AgentExecutor(agent=agent, tools=[add, get_time], verbose=True)  # 과정 관찰\n\n# 3) 실행하면 생각->도구호출->관찰을 반복해 최종 답을 낸다\nprint(executor.invoke({'input': '지금 몇 시야? 그리고 12+30은?'})['output'])\n",
      "note": "체인은 흐름이 고정이지만 에이전트는 상황을 보고 어떤 도구를 몇 번 쓸지 스스로 정한다. 이 자유도가 커지면 LangGraph로 흐름을 통제한다."
    },
    {
      "title": "with_retry + try/except로 '안 죽는' 호출 만들기",
      "lang": "python",
      "code": "# 프롬프트·모델·파서 부품을 가져온다\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import StrOutputParser\nfrom langchain_anthropic import ChatAnthropic\n\nprompt = ChatPromptTemplate.from_template(\"한 문장으로 답해줘: {q}\")\n# with_retry: 네트워크 혼잡 등 '일시적' 실패면 최대 3번까지 알아서 다시 시도한다\nmodel = ChatAnthropic(model=\"claude-opus-4-8\").with_retry(stop_after_attempt=3)\n# 재시도가 붙은 모델로 평소처럼 체인을 조립한다\nchain = prompt | model | StrOutputParser()\n\n# 체인 호출을 보호막(try/except)으로 감싸는 함수를 만든다\ndef ask(q):\n    try:                                    # 정상 경로: 성공하면 답을 돌려준다\n        return chain.invoke({\"q\": q})\n    except Exception as e:                  # 재시도까지 모두 실패하면 여기로 온다\n        return f\"잠시 후 다시 시도해 주세요.\"  # 빨간 에러 대신 사용자에게 친절한 대체 답\n\n# 정상 질문은 그대로 답하고, 장애 상황에서도 서비스가 멈추지 않는다\nprint(ask(\"하늘은 왜 파랄까?\"))",
      "note": "with_retry는 '잠깐 삐끗한 실패'를 자동으로 넘겨 주고, try/except는 '끝내 실패'를 붙잡아 친절한 메시지로 바꾼다. 이 둘을 겹쳐야 실서비스가 한 번의 오류로 통째로 죽는 사고를 막을 수 있다."
    }
  ],
  "serving-1": [
    {
      "title": "joblib 으로 모델 저장하고 다시 불러오기",
      "lang": "python",
      "code": "import joblib                                    # 파일 저장/로드 도구 가져오기\nfrom sklearn.linear_model import LogisticRegression  # 간단한 분류 모델\n\nclf = LogisticRegression()                    # 모델 객체 생성\nclf.fit([[0],[1],[2],[3]], [0,0,1,1])         # 작은 데이터로 학습(0,1 / 2,3 → 클래스 0,1)\n\njoblib.dump(clf, 'clf.joblib')               # 학습된 모델을 파일로 저장\nloaded = joblib.load('clf.joblib')           # 파일에서 모델을 다시 불러오기\nprint(loaded.predict([[2.5]]))               # 결과: [1] (2.5는 클래스 1로 예측)\n",
      "note": "학습과 서빙은 보통 다른 시점·다른 컴퓨터에서 일어나므로 모델을 파일로 주고받는 것이 기본이다."
    },
    {
      "title": "curl 로 추론 API 호출해 보기",
      "lang": "bash",
      "code": "# 실행 중인 FastAPI 서버에 JSON 입력을 POST로 보낸다\ncurl -X POST http://127.0.0.1:8000/predict \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"sepal_length\":5.1,\"sepal_width\":3.5,\"petal_length\":1.4,\"petal_width\":0.2}'\n# 결과 예시: {\"prediction\":\"setosa\",\"model_version\":\"v1.0.0\"}\n",
      "note": "-H 는 보내는 데이터가 JSON 이라는 표시이고, -d 는 실제 입력 본문이다."
    },
    {
      "title": "동기 엔드포인트를 비동기로 바꾸기",
      "lang": "python",
      "code": "from fastapi import FastAPI\nfrom fastapi.concurrency import run_in_threadpool  # 무거운 연산을 스레드로 넘기는 도구\n\napp = FastAPI()\n\n# 외부 호출·대기가 있으면 async def + await 로 그 시간 동안 다른 요청도 함께 처리한다\n@app.post('/predict')\nasync def predict(payload: dict):\n    # 모델 예측처럼 CPU를 오래 쓰는 일은 이벤트 루프를 막으므로 스레드풀로 넘긴다\n    result = await run_in_threadpool(model.predict, [[payload['x']]])\n    return {'prediction': int(result[0])}\n",
      "note": "async라고 무조건 빨라지는 게 아니라 대기(I/O)가 있을 때 이득이며, CPU 연산은 스레드풀이나 배치로 풀어야 다른 요청을 막지 않는다."
    },
    {
      "title": "검증·에러 처리·헬스체크·로깅을 한 번에 갖춘 추론 엔드포인트 (python)",
      "lang": "python",
      "code": "import logging, time                              # 로깅과 시간 측정용 표준 라이브러리\nfrom fastapi import FastAPI, HTTPException         # API 본체와 에러 응답 도구\nfrom pydantic import BaseModel, Field             # 입력 양식과 값 제약(Field)\nimport joblib\n\n# 로그를 '시간 | 레벨 | 내용' 형태로 남기도록 기본 설정\nlogging.basicConfig(level=logging.INFO, format='%(asctime)s | %(levelname)s | %(message)s')\nlog = logging.getLogger('serving')                # 이 서비스 전용 로거\n\napp = FastAPI(title='안전한 추론 API')\nmodel = None                                       # 모델은 시작 이벤트에서 채운다\n\nclass IrisInput(BaseModel):                        # 요청 양식 정의\n    # Field(gt=0)로 '0보다 커야 함'이라는 값 범위까지 스키마에 명시 → 위반 시 자동 422\n    sepal_length: float = Field(gt=0, le=10)       # 0 초과 10 이하만 허용\n    sepal_width: float = Field(gt=0, le=10)\n    petal_length: float = Field(gt=0, le=10)\n    petal_width: float = Field(gt=0, le=10)\n\n@app.on_event('startup')                           # 서버가 켜질 때 딱 한 번 실행(Eager 로딩)\ndef load():\n    global model\n    model = joblib.load('model.joblib')            # 모델을 메모리에 올려 둠\n    log.info('모델 로딩 완료')                      # 로그: 준비 상태 기록\n\n@app.get('/health')                                # 서버가 살아있는지 확인(로드밸런서용)\ndef health():\n    return {'status': 'ok'}\n\n@app.get('/ready')                                 # 모델까지 준비됐는지 확인\ndef ready():\n    return {'ready': model is not None}             # 모델이 없으면 아직 준비 안 됨\n\n@app.post('/predict')\ndef predict(item: IrisInput):                       # 여기 도달했다면 형식·범위 검증은 이미 통과\n    start = time.time()                            # 처리 시작 시각\n    try:\n        features = [[item.sepal_length, item.sepal_width,\n                     item.petal_length, item.petal_width]]\n        pred = int(model.predict(features)[0])     # 예측 시도\n    except Exception as e:                         # 예측 중 어떤 오류가 나도\n        log.error(f'예측 실패: {e}')                # 상세 원인은 로그로만 남기고\n        raise HTTPException(status_code=500, detail='추론 처리 중 오류')  # 사용자엔 안전한 메시지\n    latency = round((time.time() - start) * 1000)  # 걸린 시간(ms)\n    # 집계하기 좋은 한 줄 로그: 어떤 요청이 얼마나 걸려 성공했는지\n    log.info(f'endpoint=/predict status=200 latency_ms={latency} pred={pred}')\n    return {'prediction': pred, 'latency_ms': latency}",
      "note": "Field 로 값 범위까지 스키마에 넣으면 잘못된 값이 자동으로 422 로 막히고, try/except 는 예측 실패를 500 스택트레이스 노출 없이 처리한다. /health·/ready 로 모니터링 도구가 서버 상태를 점검하고, latency 를 담은 한 줄 로그가 Day2·Day3 모니터링의 출발점이 된다."
    }
  ],
  "serving-2": [
    {
      "title": "이미지 빌드하고 컨테이너 실행하기",
      "lang": "bash",
      "code": "# 현재 폴더(.)의 Dockerfile 로 이미지를 만들고 이름표(tag)를 붙인다\ndocker build -t iris-api:v1 .\n# 만든 이미지를 백그라운드(-d)로 실행하고 포트를 연결한다\ndocker run -d -p 8000:8000 --name iris iris-api:v1\n# 지금 실행 중인 컨테이너 목록을 확인한다\ndocker ps                # 결과: iris 컨테이너가 8000포트로 Up 상태\n",
      "note": "-d 는 백그라운드 실행, -p 호스트:컨테이너 는 포트를 바깥과 연결한다는 뜻이다."
    },
    {
      "title": "컨테이너 로그 보고 정리하기",
      "lang": "bash",
      "code": "# iris 컨테이너가 출력한 로그를 실시간으로 따라 본다\ndocker logs -f iris      # 요청이 들어올 때마다 접근 로그가 흐름\n# 다 봤으면 Ctrl+C 로 빠져나온 뒤 컨테이너를 멈추고 삭제한다\ndocker stop iris         # 컨테이너 정지\ndocker rm iris           # 정지된 컨테이너 삭제(정리)\n",
      "note": "문제가 생기면 가장 먼저 `docker logs` 로 컨테이너가 남긴 기록을 확인한다."
    },
    {
      "title": "모델 서빙 Dockerfile 작성하기 (FastAPI)",
      "lang": "dockerfile",
      "code": '# 1) 가벼운 파이썬 공식 이미지에서 시작한다(slim = 용량 최소화)\nFROM python:3.12-slim\n\n# 2) 컨테이너 안 작업 폴더를 정한다(이후 명령의 기준 경로)\nWORKDIR /app\n\n# 3) 의존성 목록만 먼저 복사해 설치한다\n#    코드보다 먼저 복사해야, 코드만 바뀔 때 이 설치 층을 캐시로 재사용해 빌드가 빨라진다\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# 4) 나머지 앱 소스와 모델 파일을 복사한다\nCOPY . .\n\n# 5) 컨테이너가 쓰는 포트를 문서화한다(실제 연결은 docker run -p 로)\nEXPOSE 8000\n\n# 6) 컨테이너 시작 시 실행할 명령 - uvicorn 으로 FastAPI 앱을 띄운다\n#    host 는 반드시 0.0.0.0 이어야 컨테이너 바깥에서도 접속된다(127.0.0.1 이면 안에서만)\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]',
      "note": "requirements 를 코드보다 먼저 COPY 하는 순서가 핵심 - 코드만 바뀔 때 pip 설치 층이 캐시되어 재빌드가 빨라진다. host 는 반드시 0.0.0.0."
    },
    {
      "title": "헬스체크 + Prometheus 메트릭 엔드포인트 노출하기",
      "lang": "python",
      "code": '# pip install fastapi uvicorn prometheus-client\nimport time\nfrom fastapi import FastAPI, Response\nfrom prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST\n\napp = FastAPI()\n\n# 1) 지표 정의 - 누적 개수(Counter)와 응답시간 분포(Histogram)\nREQS = Counter("predict_requests_total", "예측 요청 총 횟수")         # 계속 증가만 한다\nLATENCY = Histogram("predict_latency_seconds", "예측 처리 시간(초)")  # 구간별 분포\n\n@app.get("/health")   # 2) 헬스체크: 로드밸런서·쿠버네티스가 살아있는지 확인하는 용도\ndef health():\n    return {"status": "ok"}   # 200 이면 정상 - 죽으면 트래픽을 안 보낸다\n\n@app.post("/predict")\ndef predict(x: float):\n    REQS.inc()                      # 요청 수 +1\n    with LATENCY.time():            # 이 블록의 실행시간을 자동으로 히스토그램에 기록\n        time.sleep(0.02)            # 실제로는 여기서 모델 추론을 한다\n        result = x * 2\n    return {"prediction": result}\n\n@app.get("/metrics")  # 3) Prometheus 가 주기적으로 긁어가는(scrape) 엔드포인트\ndef metrics():\n    # 수집된 지표를 Prometheus 텍스트 형식으로 내보낸다\n    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)',
      "note": "/health 는 생존 확인, /metrics 는 Prometheus 가 긁어갈 지표 노출구다. Counter(누적)와 Histogram(응답시간 분포)만 있어도 요청량·지연을 대시보드로 모니터링할 수 있다."
    }
  ],
  "serving-3": [
    {
      "title": "MLflow 로 파라미터·지표 한 건 기록하기",
      "lang": "python",
      "code": "import mlflow                          # 실험 추적 도구\n\nwith mlflow.start_run():            # 실행 하나 시작\n    mlflow.log_param('lr', 0.01)    # 학습률 설정값 기록\n    mlflow.log_metric('acc', 0.95)  # 정확도 결과 기록\n    print('기록 완료')              # 결과: MLflow UI 에 run 1개가 쌓임\n",
      "note": "log_param 은 '내가 정한 설정', log_metric 은 '나온 결과'를 적는다고 구분하면 쉽다."
    },
    {
      "title": "pytest 로 모델 정확도 기준 검증하기",
      "lang": "python",
      "code": "import joblib                          # 모델 로드\nfrom sklearn.datasets import load_iris   # 검증 데이터\nfrom sklearn.metrics import accuracy_score  # 정확도 계산\n\ndef test_accuracy_threshold():      # 이름이 test_ 로 시작하면 pytest 가 자동 실행\n    model = joblib.load('model.joblib')  # 학습된 모델 불러오기\n    X, y = load_iris(return_X_y=True)    # 검증용 입력·정답\n    acc = accuracy_score(y, model.predict(X))  # 전체 정확도 계산\n    assert acc > 0.9                 # 0.9 미만이면 테스트 실패(배포 차단)\n",
      "note": "assert 가 거짓이면 테스트가 실패하고 CI 가 빨간불이 되어 나쁜 모델 배포를 막는다."
    },
    {
      "title": "model_version 쿼리 파라미터로 버전 라우팅하기",
      "lang": "python",
      "code": "import json, joblib\nfrom fastapi import FastAPI\n\napp = FastAPI()\n# registry.json 예: {\"v1\": \"models/clf_v1.joblib\", \"v2\": \"models/clf_v2.joblib\"}\nregistry = json.load(open('registry.json', encoding='utf-8'))\n_cache = {}\n\ndef load_model(version):\n    if version not in _cache:                 # 같은 버전은 한 번만 로드해 캐시\n        _cache[version] = joblib.load(registry[version])\n    return _cache[version]\n\n@app.post('/predict')\ndef predict(x: float, model_version: str = 'v1'):  # 쿼리로 버전 선택\n    model = load_model(model_version)\n    pred = int(model.predict([[x]])[0])\n    return {'prediction': pred, 'model_version': model_version}  # 어느 버전이 답했는지 함께 반환\n",
      "note": "버전 파라미터 하나로 A/B 비교와 롤백이 가능해진다."
    },
    {
      "title": "구조화 로깅(structured logging)으로 집계하기 좋게 남기기",
      "lang": "python",
      "code": "import json, time\n\ndef log_event(endpoint, latency_ms, status, model_version):\n    # 사람이 읽는 문장 대신 JSON 한 줄로 남긴다\n    line = json.dumps({\n        'ts': time.time(),\n        'endpoint': endpoint,\n        'latency_ms': latency_ms,\n        'status': status,\n        'model_version': model_version,\n    }, ensure_ascii=False)\n    print(line)  # 실제로는 파일이나 로그 수집기로 보낸다\n\nlog_event('/predict', 42, 200, 'v2')\n# 결과: {\"ts\": 1750000000.0, \"endpoint\": \"/predict\", \"latency_ms\": 42, \"status\": 200, \"model_version\": \"v2\"}\n# 이렇게 쌓인 로그는 나중에 스크립트로 평균 응답시간·에러율을 쉽게 집계할 수 있다\n",
      "note": "사람이 읽는 문장 로그보다 기계가 집계하기 좋은 구조화 로그가 모니터링·AIOps의 출발점이다."
    },
    {
      "title": "AIOps 미니 - 로그 집계 → 임계값 경고 → 재학습 트리거 (python)",
      "lang": "python",
      "code": "import json                                        # 구조화 로그(JSON 한 줄)를 읽기 위함\n\n# Day1에서 남긴 구조화 로그 파일을 한 줄씩 읽어 리스트로 만든다\n# 각 줄 예: {\"endpoint\":\"/predict\",\"status\":200,\"latency_ms\":42,\"drift\":0.03}\ndef read_logs(path='serving.log'):\n    rows = []\n    for line in open(path, encoding='utf-8'):\n        line = line.strip()\n        if line.startswith('{'):                   # JSON 형태의 줄만 골라\n            rows.append(json.loads(line))          # 파이썬 딕셔너리로 변환\n    return rows\n\n# 로그에서 운영 지표 3종(평균 지연/에러율/평균 드리프트)을 집계한다\ndef aggregate(rows):\n    n = len(rows) or 1                             # 0으로 나누기 방지\n    avg_latency = sum(r['latency_ms'] for r in rows) / n           # 평균 응답시간\n    error_rate = sum(1 for r in rows if r['status'] >= 500) / n    # 5xx 비율\n    avg_drift = sum(r.get('drift', 0) for r in rows) / n           # 평균 드리프트 점수\n    return {'avg_latency': avg_latency, 'error_rate': error_rate, 'avg_drift': avg_drift}\n\n# 임계값(threshold)을 넘는 지표가 있으면 경고 목록을 만든다\nTHRESHOLDS = {'avg_latency': 300, 'error_rate': 0.05, 'avg_drift': 0.2}  # 운영 기준선\n\ndef check_and_alert(metrics):\n    alerts = []\n    for key, limit in THRESHOLDS.items():\n        if metrics[key] > limit:                   # 기준선을 넘었으면\n            alerts.append(f'[경고] {key}={metrics[key]:.3f} > 임계값 {limit}')\n    for a in alerts:\n        print(a)                                   # 실제로는 Slack/메일로 발송\n    return alerts\n\n# 드리프트 경고가 있으면 '재학습 트리거'를 당긴다 (Day1~3 자동 대응의 마무리)\ndef trigger_retrain(alerts):\n    if any('avg_drift' in a for a in alerts):       # 드리프트 관련 경고가 있으면\n        print('>> 재학습 파이프라인 트리거: train.py 실행 요청')\n        # 실제로는 GitHub Actions 재실행/워크플로 dispatch API를 호출한다\n        return True\n    return False\n\nif __name__ == '__main__':\n    rows = read_logs()\n    metrics = aggregate(rows)                       # 1) 로그 → 지표 집계\n    print('집계 결과:', metrics)\n    alerts = check_and_alert(metrics)               # 2) 임계값 초과 → 경고\n    trigger_retrain(alerts)                         # 3) 드리프트면 → 재학습 트리거",
      "note": "Day1의 구조화 로그를 원재료로 삼아 '집계 → 임계값 경고 → 재학습 트리거'라는 AIOps 자동 대응의 최소 형태를 한 파일로 보여준다. 서빙(Day1)·컨테이너와 드리프트 감시(Day2)·자동화(Day3)가 하나의 파이프라인으로 이어지는 것을 마지막 8교시에서 이 코드로 회고한다."
    }
  ],
  "agent-1": [
    {
      "title": "@tool 로 함수를 도구로 등록하기",
      "lang": "python",
      "code": "from langchain_core.tools import tool  # 함수를 도구로 바꿔 주는 데코레이터\n\n@tool  # 이 한 줄이 아래 함수를 에이전트용 도구로 만든다\ndef get_weather(city: str) -> str:\n    \"\"\"도시 이름을 받아 그 도시의 날씨를 알려준다.\"\"\"  # LLM은 이 설명을 보고 언제 쓸지 정한다\n    return f\"{city}의 날씨는 맑음, 24도\"  # 실제로는 날씨 API를 부르겠지만 여기선 예시 값\n\nprint(get_weather.name)         # 결과: get_weather (도구 이름)\nprint(get_weather.description)  # 결과: 도시 이름을 받아 그 도시의 날씨를 알려준다.\nprint(get_weather.invoke({\"city\": \"서울\"}))  # 결과: 서울의 날씨는 맑음, 24도",
      "note": "함수 위에 @tool 만 붙이면 이름·설명·입력형식이 자동으로 잡혀 에이전트가 바로 쓸 수 있다."
    },
    {
      "title": "add_messages 로 메시지가 쌓이는지 확인",
      "lang": "python",
      "code": "from langgraph.graph.message import add_messages  # 메시지를 이어붙여 주는 함수\nfrom langchain_core.messages import HumanMessage, AIMessage  # 사람/AI 메시지 형식\n\nold = [HumanMessage(content=\"안녕\")]  # 기존 메모장에 있던 사람 메시지\nnew = [AIMessage(content=\"안녕하세요!\")]  # 새로 추가할 AI 메시지\n\n# add_messages는 old를 지우지 않고 new를 뒤에 붙여 하나의 리스트로 합친다\nmerged = add_messages(old, new)\nprint(len(merged))          # 결과: 2 (덮어쓰지 않고 합쳐졌다)\nprint(merged[0].content)    # 결과: 안녕\nprint(merged[1].content)    # 결과: 안녕하세요!",
      "note": "State의 messages가 매번 초기화되지 않고 대화가 누적되는 비결이 바로 이 add_messages다."
    },
    {
      "title": "검색 결과를 채점해 재검색으로 갈라지는 Agentic RAG (조건 분기 데모)",
      "lang": "python",
      "code": "from langgraph.graph import StateGraph, START, END  # 그래프 뼈대와 시작/끝 표시\nfrom typing import TypedDict  # 상태의 형태를 약속하는 타입\n\n# 1) 상태: 질문, 검색된 문서, 재검색 횟수를 들고 다닌다\nclass State(TypedDict):\n    question: str   # 사용자의 질문(재작성되며 바뀔 수 있다)\n    docs: list      # 검색해서 가져온 문서들\n    tries: int      # 재검색을 몇 번 했는지(무한 루프 방지용)\n\n# 2) 검색 노드: 질문으로 문서를 가져온다(예시로 고정 응답)\ndef retrieve(state: State):\n    # 실제로는 Vector DB를 검색한다. 여기선 첫 시도엔 부실한 결과, 재검색 땐 정확한 결과를 흉내\n    if state[\"tries\"] == 0:\n        found = [\"전기차 보조금은 지역마다 다르다\"]              # 질문에 딱 맞지 않는 문서\n    else:\n        found = [\"서울 전기차 보조금은 2026년 기준 최대 900만원\"]  # 재검색 후 정확한 문서\n    return {\"docs\": found}  # 찾은 문서를 상태에 저장\n\n# 3) 채점 겸 분기 함수: 가져온 문서가 질문에 맞는지 스스로 판단한다\ndef grade(state: State) -> str:\n    joined = \" \".join(state[\"docs\"])          # 문서들을 하나로 합쳐 살펴본다\n    if state[\"tries\"] >= 2:                    # 너무 많이 재검색했으면 그만(무한 루프 방지)\n        return \"generate\"\n    if \"서울\" in joined:                        # 아주 단순한 채점: 핵심어가 들어있으면 통과\n        return \"generate\"                      # 근거 충분 → 답 생성으로\n    return \"rewrite\"                           # 근거 부족 → 질문 다듬어 재검색\n\n# 4) 질문 재작성 노드: 더 구체적으로 바꾸고 재검색 횟수를 하나 올린다\ndef rewrite(state: State):\n    new_q = state[\"question\"] + \" 서울 2026년 기준\"   # 질문을 더 구체화\n    return {\"question\": new_q, \"tries\": state[\"tries\"] + 1}\n\n# 5) 답 생성 노드: 통과한 문서로 최종 답을 만든다(실제로는 LLM이 담당)\ndef generate(state: State):\n    return {\"docs\": state[\"docs\"]}  # 데모에서는 통과한 문서를 그대로 결과로 둔다\n\n# 6) 그래프 조립\ngraph = StateGraph(State)\ngraph.add_node(\"retrieve\", retrieve)  # 검색 노드\ngraph.add_node(\"rewrite\", rewrite)    # 질문 재작성 노드\ngraph.add_node(\"generate\", generate)  # 답 생성 노드\ngraph.add_edge(START, \"retrieve\")      # 시작하면 먼저 검색\n# 검색 뒤 grade가 반환한 신호로 갈림길을 정한다(조건부 엣지)\ngraph.add_conditional_edges(\"retrieve\", grade, {\"generate\": \"generate\", \"rewrite\": \"rewrite\"})\ngraph.add_edge(\"rewrite\", \"retrieve\")  # 다듬은 질문으로 '다시 검색'하는 루프\ngraph.add_edge(\"generate\", END)         # 답을 만들면 종료\napp = graph.compile()\n\n# 7) 실행: 처음엔 부실 검색 → 채점 실패 → 재작성 → 재검색 → 통과 → 답\nresult = app.invoke({\"question\": \"전기차 보조금 얼마야?\", \"docs\": [], \"tries\": 0})\nprint(result[\"docs\"])  # 결과: ['서울 전기차 보조금은 2026년 기준 최대 900만원'] (재검색 후 통과)",
      "note": "7교시 이론(채점→조건분기→재검색 루프)을 눈으로 확인하는 최소 예제다. retrieve의 예시 응답을 실제 Vector DB 검색으로 바꾸고 grade를 LLM 채점으로 바꾸면 바로 실무형이 된다."
    }
  ],
  "agent-2": [
    {
      "title": "interrupt 지점에서 멈췄는지 확인하기",
      "lang": "python",
      "code": "config = {\"configurable\": {\"thread_id\": \"t1\"}}  # 대화 한 건을 구분하는 식별자\napp.invoke({\"messages\": [(\"user\", \"보고서 작성\")], \"next\": \"\"}, config)  # 실행하면 writer 전에 멈춤\n\nstate = app.get_state(config)  # 멈춘 순간의 현재 상태를 꺼낸다\nprint(state.next)  # 결과: ('writer',)  -> 다음에 실행될 노드가 writer 임을 보여줌\n# next가 비어 있지 않다는 것은 '아직 안 끝나고 사람을 기다리는 중'이라는 신호다\nprint(\"승인 대기 중\" if state.next else \"이미 종료됨\")  # 결과: 승인 대기 중",
      "note": "get_state로 멈춘 위치를 확인할 수 있어, 사람이 무엇을 승인하는지 보고 결정할 수 있다."
    },
    {
      "title": "감독의 라우팅 분기 함수만 따로 테스트",
      "lang": "python",
      "code": "from langgraph.graph import END  # 종료 표시\n\ndef route(state):\n    if state[\"next\"] == \"FINISH\":  # 감독이 끝내라고 정했으면\n        return END                  # 종료로 보냄\n    return state[\"next\"]            # 아니면 작업자 이름 그대로 반환\n\nprint(route({\"next\": \"researcher\"}))  # 결과: researcher\nprint(route({\"next\": \"writer\"}))      # 결과: writer\nprint(route({\"next\": \"FINISH\"}) == END)  # 결과: True (종료로 연결됨)",
      "note": "분기 로직을 그래프와 떼어 따로 검증하면, 라우팅 버그를 빠르게 잡을 수 있다."
    },
    {
      "title": "Fan-out으로 여러 조사를 '동시에' 실행하고 결과 모으기 (Send API)",
      "lang": "python",
      "code": "from langgraph.graph import StateGraph, START, END  # 그래프 뼈대와 시작/끝\nfrom langgraph.types import Send  # 여러 갈래로 '동시에' 일을 뿌리는 도구\nfrom typing import TypedDict, Annotated  # 상태 형태 정의\nimport operator  # 리스트를 '합치는' 방식을 지정할 때 사용\n\n# 1) 전체 상태: 나눠 조사할 소주제 목록과, 병렬 결과를 모을 리스트\nclass State(TypedDict):\n    subtopics: list                          # 동시에 조사할 소주제들\n    results: Annotated[list, operator.add]   # operator.add 덕분에 병렬 결과가 '덮어쓰기'가 아니라 '합쳐진다'\n\n# 2) 개별 작업 노드: 소주제 하나를 조사한다(여러 개가 동시에 실행됨)\ndef research_one(state: dict):\n    topic = state[\"topic\"]                    # Send가 넘겨준 '나 하나의' 소주제\n    # 실제로는 검색/LLM 호출. 여기선 예시로 조사 결과 문자열을 만든다\n    return {\"results\": [f\"[{topic}] 조사 완료\"]}  # 리스트로 반환 → operator.add로 자동 누적\n\n# 3) 팬아웃 분배 함수: 소주제 개수만큼 research_one을 동시에 띄운다\ndef fan_out(state: State):\n    # 소주제마다 Send로 research_one에 '개별 입력'을 하나씩 뿌린다 → 병렬 실행\n    return [Send(\"research_one\", {\"topic\": t}) for t in state[\"subtopics\"]]\n\n# 4) 취합 노드: 흩어진 병렬 결과가 다 모인 뒤 다음 단계로 넘긴다\ndef gather(state: State):\n    print(\"모인 결과 수:\", len(state[\"results\"]))  # 결과: 3 (세 조사가 모두 합류)\n    return {}  # 이미 results에 다 모여 있으므로 그대로 통과\n\n# 5) 그래프 조립\ngraph = StateGraph(State)\ngraph.add_node(\"research_one\", research_one)  # 병렬로 여러 번 실행될 작업 노드\ngraph.add_node(\"gather\", gather)              # 결과를 모으는 합류 노드\n# 시작에서 fan_out으로 여러 갈래를 동시에 펼친다(세 번째 인자는 갈 수 있는 노드 목록)\ngraph.add_conditional_edges(START, fan_out, [\"research_one\"])\ngraph.add_edge(\"research_one\", \"gather\")  # 모든 병렬 작업이 끝나면 gather로 합류\ngraph.add_edge(\"gather\", END)\napp = graph.compile()\n\n# 6) 실행: 세 소주제가 순차가 아니라 동시에 조사된다\nresult = app.invoke({\"subtopics\": [\"배터리\", \"충전인프라\", \"정책보조금\"], \"results\": []})\nprint(result[\"results\"])  # 결과: 세 소주제의 '조사 완료'가 리스트로 모임",
      "note": "5교시 실습의 핵심 데모다. 소주제 3개를 한 줄로 차례차례 하지 않고 동시에 펼쳐(Fan-out) 실행한 뒤 한곳으로 모은다(gather). research_one 안의 예시 문자열을 실제 검색·LLM 호출로 바꾸면 조사 시간이 크게 줄어드는 실무형이 된다."
    },
    {
      "title": "불안정한 도구에 재시도 걸고, 관측(LangSmith) 켜기",
      "lang": "python",
      "code": "import os\nfrom langchain_core.tools import tool  # 함수를 도구로 만드는 데코레이터\n\n# 1) 관측(Observability): 환경변수만 켜면 LangSmith가 모든 실행을 자동 추적한다\nos.environ[\"LANGSMITH_TRACING\"] = \"true\"    # 추적 켜기 (이후 그래프 실행이 전부 기록됨)\nos.environ[\"LANGSMITH_API_KEY\"] = \"ls-...\"  # 발급받은 LangSmith 키(실제 값으로 교체)\n# 이제부터 에이전트를 돌리면 각 노드의 입력·출력·소요시간·토큰·비용이 대시보드 타임라인에 남는다\n\n# 2) 재시도·에러 복구: 자주 실패하는 외부 호출을 도구로 감싼다\n@tool\ndef fetch_price(ticker: str) -> str:\n    \"\"\"종목 코드를 받아 현재가를 조회한다.\"\"\"  # LLM이 언제 쓸지 읽는 설명\n    import random\n    if random.random() < 0.4:                 # 40% 확률로 '일시적 네트워크 오류'를 흉내\n        raise ConnectionError(\"일시적 네트워크 오류\")\n    return f\"{ticker}: 12,300원\"              # 성공 시 현재가 반환\n\n# with_retry: 실패하면 자동으로 다시 시도한다(최대 3번, 간격을 조금씩 늘려가며)\nsafe_fetch = fetch_price.with_retry(stop_after_attempt=3)\n\n# 3) 그래도 최종 실패할 수 있으니 try-except로 감싸 흐름이 통째로 멈추지 않게 한다\ntry:\n    print(safe_fetch.invoke({\"ticker\": \"005930\"}))  # 실패해도 최대 3번까지 자동 재시도\nexcept Exception as e:\n    print(\"3번 시도 후에도 실패:\", e)  # 끝내 실패하면 에러를 잡아 안전하게 처리\n\n# 참고: 그래프를 컴파일해 실행할 때 recursion_limit를 두면 무한 반복도 막을 수 있다\n# app.invoke(input, config={\"recursion_limit\": 10})  # 노드를 10번 넘게 돌면 강제 중단",
      "note": "7교시 이론(재시도·에러복구·관측)을 코드로 확인한다. with_retry는 일시적 실패를 자동으로 넘기고, 환경변수 두 줄이면 코드 수정 없이 모든 노드 실행이 대시보드에 추적된다."
    }
  ],
  "vectordb-1": [
    {
      "title": "코사인 유사도를 손으로 계산해 보기",
      "lang": "python",
      "code": "import numpy as np  # 벡터 계산용 라이브러리\n\n# 세 개의 짧은 벡터를 직접 정의한다 (실제 임베딩 대신 이해용 예시)\na = np.array([1.0, 0.0, 1.0])  # 기준 문장 벡터\nb = np.array([0.9, 0.1, 1.0])  # a와 방향이 비슷한 벡터\nc = np.array([0.0, 1.0, 0.0])  # a와 방향이 다른 벡터\n\n# 코사인 유사도 = 내적 / (각 벡터 길이의 곱)\ndef cosine(x, y):\n    return np.dot(x, y) / (np.linalg.norm(x) * np.linalg.norm(y))\n\nprint(round(cosine(a, b), 3))  # 결과: 0.996  (매우 비슷)\nprint(round(cosine(a, c), 3))  # 결과: 0.0    (관련 없음)",
      "note": "값이 1에 가까울수록 비슷하고 0에 가까울수록 무관하다는 직관을 숫자로 확인한다."
    },
    {
      "title": "문장 2개의 의미 유사도 비교",
      "lang": "python",
      "code": "from sentence_transformers import SentenceTransformer, util  # 모델과 유사도 도구\n\nmodel = SentenceTransformer(\"all-MiniLM-L6-v2\")  # 임베딩 모델 로드\n\n# 글자는 다르지만 뜻이 비슷한 문장 / 전혀 다른 문장을 준비\ns1 = \"강아지를 산책시켰다\"\ns2 = \"반려견과 함께 걸었다\"   # s1과 의미가 비슷\ns3 = \"환율이 크게 올랐다\"     # s1과 무관\n\nv = model.encode([s1, s2, s3])  # 세 문장을 한 번에 벡터로 변환\n\n# cos_sim: 두 벡터의 코사인 유사도를 계산해 준다\nprint(round(util.cos_sim(v[0], v[1]).item(), 3))  # 결과: 0.7 안팎 (비슷)\nprint(round(util.cos_sim(v[0], v[2]).item(), 3))  # 결과: 0.1 안팎 (무관)",
      "note": "단어가 달라도 의미가 가까우면 점수가 높게 나오는 것이 시맨틱 검색의 핵심이다."
    },
    {
      "title": "FAISS Flat vs HNSW 검색 속도 비교 (3교시)",
      "lang": "python",
      "code": "import faiss\nimport numpy as np\nimport time\n\n# 가짜 벡터 1만 개(384차원) 준비 — 실제로는 문서 임베딩이 들어간다\nnp.random.seed(0)\ndata = np.random.rand(10000, 384).astype(\"float32\")\nfaiss.normalize_L2(data)  # 코사인 비교를 위해 길이를 1로 맞춤\n\n# 1) Flat: 모든 벡터를 다 비교하는 완전탐색 (정확하지만 느림)\nflat = faiss.IndexFlatIP(384)\nflat.add(data)\n\n# 2) HNSW: 그래프로 지름길을 만들어 빠르게 근사 탐색 (살짝 부정확할 수 있음)\nhnsw = faiss.IndexHNSWFlat(384, 32)  # 32 = 이웃 연결 수(M)\nhnsw.add(data)\n\nq = data[:1]  # 질문 벡터 1개(첫 벡터를 재사용)\n\n# 각 인덱스에서 top-5를 찾고 걸린 시간을 잰다\nt0 = time.perf_counter(); flat.search(q, 5); t1 = time.perf_counter()\nhnsw.search(q, 5); t2 = time.perf_counter()\n\nprint(f\"Flat 검색: {(t1-t0)*1000:.2f} ms\")   # 느림\nprint(f\"HNSW 검색: {(t2-t1)*1000:.2f} ms\")   # 훨씬 빠름\n# 결과: 데이터가 커질수록 HNSW가 수십 배 빨라진다(정확도는 거의 동일)",
      "note": "완전탐색은 정답을 보장하지만 느리고, HNSW는 약간의 정확도를 내주고 속도를 크게 얻는 거래(trade-off)를 눈으로 확인한다."
    },
    {
      "title": "FAISS에서 Qdrant로 — 원문·태그까지 저장하고 검색하기 (5교시)",
      "lang": "python",
      "code": "from sentence_transformers import SentenceTransformer\nfrom qdrant_client import QdrantClient\nfrom qdrant_client.models import VectorParams, Distance, PointStruct\n\nmodel = SentenceTransformer(\"all-MiniLM-L6-v2\")\ndocs = [\n    \"강아지는 산책을 좋아하는 반려동물이다\",\n    \"고양이는 그루밍으로 몸을 청결하게 한다\",\n    \"오늘 서울의 날씨는 맑고 따뜻하다\",\n    \"주식 시장은 금리 변화에 민감하다\",\n]\nvecs = model.encode(docs, normalize_embeddings=True)\n\n# ':memory:' — 서버를 안 띄우고 메모리에서 도는 로컬 Qdrant(실습용)\nclient = QdrantClient(\":memory:\")\n\n# 컬렉션(=테이블) 생성: 벡터 차원 384, 거리 척도는 코사인\nclient.create_collection(\n    collection_name=\"docs\",\n    vectors_config=VectorParams(size=384, distance=Distance.COSINE),\n)\n\n# upsert: 벡터 + 원문(payload)을 함께 저장한다\nclient.upsert(\n    collection_name=\"docs\",\n    points=[\n        PointStruct(id=i, vector=vecs[i].tolist(), payload={\"text\": docs[i]})\n        for i in range(len(docs))\n    ],\n)\n\n# 질문을 같은 모델로 벡터화해 검색\nq = model.encode(\"반려동물 키우기\", normalize_embeddings=True)\nhits = client.query_points(collection_name=\"docs\", query=q.tolist(), limit=2).points\n\nfor h in hits:\n    print(f\"{h.score:.3f}  {h.payload['text']}\")\n# 결과: 강아지·고양이 문장이 위로, 날씨·주식은 밀린다 (FAISS와 같은 결과)",
      "note": "FAISS는 벡터만 다루지만 Qdrant는 원문·태그(payload)를 함께 저장하고 필터·서버 운영까지 된다 — 프로토타입에서 프로덕션으로 넘어가는 지점이다."
    },
    {
      "title": "하이브리드 검색 — BM25(키워드) + 벡터를 RRF로 합치기 (7교시)",
      "lang": "python",
      "code": "from rank_bm25 import BM25Okapi\nfrom sentence_transformers import SentenceTransformer, util\n\ndocs = [\n    \"환불은 결제일로부터 7일 이내에 가능합니다\",\n    \"배송은 보통 2~3일 소요됩니다\",\n    \"GPT-4o 모델의 요금은 토큰 단위로 부과됩니다\",\n    \"반품 시 왕복 배송비가 청구될 수 있습니다\",\n]\nquery = \"GPT-4o 환불\"\n\n# 1) 키워드 검색(BM25): 정확한 단어 겹침에 강함\nbm25 = BM25Okapi([d.split() for d in docs])\nkw_scores = bm25.get_scores(query.split())\nkw_rank = sorted(range(len(docs)), key=lambda i: kw_scores[i], reverse=True)\n\n# 2) 벡터 검색: 의미 유사도에 강함\nmodel = SentenceTransformer(\"all-MiniLM-L6-v2\")\ndv = model.encode(docs, normalize_embeddings=True)\nqv = model.encode(query, normalize_embeddings=True)\nvec_rank = sorted(range(len(docs)), key=lambda i: util.cos_sim(qv, dv[i]).item(), reverse=True)\n\n# 3) RRF로 두 등수를 합친다: 점수 = 1/(k+순위), k는 완충 상수(보통 60)\ndef rrf(rankings, k=60):\n    score = {}\n    for ranking in rankings:\n        for rank, doc_id in enumerate(ranking):\n            score[doc_id] = score.get(doc_id, 0) + 1 / (k + rank)\n    return sorted(score, key=score.get, reverse=True)\n\nfor i in rrf([kw_rank, vec_rank]):\n    print(docs[i])\n# 결과: 'GPT-4o'(키워드)와 '환불'(의미)이 둘 다 반영돼 관련 문서가 위로 올라온다",
      "note": "벡터만·키워드만 쓸 때 각자 놓치는 문서를, 등수를 더하는 RRF로 함께 끌어올린다. 점수 척도가 달라도 순위만 쓰므로 안전하게 섞인다."
    },
    {
      "title": "Cross-Encoder로 재순위(Re-ranking) — 상위를 다시 정밀 채점 (7교시)",
      "lang": "python",
      "code": "from sentence_transformers import CrossEncoder\n\nquery = \"환불 기간이 어떻게 되나요?\"\n# 1차 검색(벡터/하이브리드)으로 가져온 후보들이라고 가정\ncandidates = [\n    \"배송은 보통 2~3일 소요됩니다\",\n    \"환불은 결제일로부터 7일 이내에 가능합니다\",\n    \"회원 가입은 이메일로 진행합니다\",\n    \"환불 요청은 마이페이지에서 접수합니다\",\n]\n\n# Cross-Encoder: (질문, 문서)를 한 쌍으로 함께 읽어 관련도를 직접 채점 — 정확하지만 느림\nreranker = CrossEncoder(\"cross-encoder/ms-marco-MiniLM-L-6-v2\")\nscores = reranker.predict([(query, c) for c in candidates])\n\n# 점수가 높은 순으로 다시 정렬(재순위)\nranked = sorted(zip(scores, candidates), reverse=True)\nfor score, doc in ranked:\n    print(f\"{score:6.2f}  {doc}\")\n# 결과: '환불 기간' 관련 문장이 최상위로, 배송·가입 문장은 아래로 밀린다",
      "note": "1차 검색은 빠르게 넉넉히 후보를 모으고(bi-encoder), 그중 상위만 Cross-Encoder로 정밀 재채점하는 2단 구조가 프로덕션 표준이다."
    }
  ],
  "capstone-1": [
    {
      "title": "우리 서비스 기능을 Tool·Resource·Prompt로 분류하기",
      "lang": "python",
      "code": "# MCP 서버에 무엇을 넣을지, 기능을 3종류로 나눠 적어둔다\ncatalog = {\n    'Tool': ['문서 검색(search_docs)', '매출 조회(get_sales)'],      # 실행·부작용 있는 기능\n    'Resource': ['팀 설정(config://team)', '규정 원문(doc://policy)'],  # 읽기 전용 자료\n    'Prompt': ['요약 요청 템플릿', '분류 요청 템플릿'],                 # 재사용 지시 템플릿\n}\n\nfor kind, items in catalog.items():  # 종류별로 꺼내\n    print(f'[{kind}] ' + ', '.join(items))  # 결과: 3줄로 분류표가 출력됨\n",
      "note": "부작용(쓰기·과금·외부호출)이 있으면 Tool, 단순 조회면 Resource로 나누는 것이 기준입니다."
    },
    {
      "title": "MCP 라이브러리가 잘 깔렸는지 점검",
      "lang": "python",
      "code": "import mcp  # MCP 파이썬 SDK\nfrom mcp.server.fastmcp import FastMCP  # 서버 헬퍼가 import 되는지 확인\n\nprint('mcp import 성공!')  # 결과: 이 줄이 보이면 설치 정상\nprint('FastMCP 준비 완료:', FastMCP.__name__)  # 결과: FastMCP 준비 완료: FastMCP\n",
      "note": "import 에러가 나면 'pip install \"mcp[cli]\"' 를 다시 실행하거나 가상환경이 켜졌는지 확인하세요."
    }
  ],
  "capstone-2": [
    {
      "title": "토큰이 하나씩 흘러나오는 걸 눈으로 보기",
      "lang": "python",
      "code": "from langchain_anthropic import ChatAnthropic  # Claude 연결\n\nllm = ChatAnthropic(model='claude-opus-4-8')\n\n# stream 은 답을 한꺼번에가 아니라 조각(청크)으로 나눠 준다\nfor chunk in llm.stream('가을에 대한 짧은 시를 써줘'):  # 조각을 하나씩 꺼내\n    print(chunk.content, end='', flush=True)  # end='' 로 줄바꿈 없이 이어붙여 출력\n# 결과: 글자가 타이핑되듯 조금씩 화면에 나타남\n",
      "note": "이 '조각을 흘려보내는' 동작이 스트리밍의 핵심이며, 서버는 이 조각을 SSE로 클라이언트에 전달합니다."
    },
    {
      "title": "SSE 전송 형식 만들어 보기",
      "lang": "python",
      "code": "# SSE는 각 조각을 'data: 내용' 뒤에 빈 줄을 붙여 보낸다\ndef to_sse(text):  # 한 조각을 SSE 한 덩어리로 감싸는 함수\n    return f'data: {text}\\n\\n'  # 끝의 빈 줄(\\n\\n)이 '한 이벤트 끝' 표시\n\nfor piece in ['안', '녕', '하세요']:  # 조각들을 하나씩\n    print(repr(to_sse(piece)))  # 결과: \"data: 안\\n\\n\" 처럼 SSE 형식 확인\n",
      "note": "FastAPI StreamingResponse가 이 형식을 그대로 흘려보내면 브라우저·클라이언트가 SSE로 받아들입니다."
    },
    {
      "title": "여러 에이전트의 진행을 한 스트림에서 event 태그로 구분하기",
      "lang": "python",
      "code": "from fastapi import FastAPI\nfrom fastapi.responses import StreamingResponse\n\napp = FastAPI()\n# agents: {'검색요원': 체인, '작성요원': 체인} 형태로 미리 준비돼 있다고 가정\n\nasync def multi_stream(question):\n    for agent_name in ['검색요원', '작성요원']:          # 에이전트를 차례로 실행\n        yield f'event: {agent_name}\\ndata: 시작\\n\\n'      # 이 에이전트가 시작했음을 알림\n        async for chunk in agents[agent_name].astream(question):  # 조각을 흘려받아\n            yield f'event: {agent_name}\\ndata: {chunk.content}\\n\\n'  # event 로 발신자 태깅\n\n@app.get('/multi')\nasync def multi(question: str):\n    # 여러 에이전트의 조각을 한 SSE 스트림에 섞어 보낸다\n    return StreamingResponse(multi_stream(question), media_type='text/event-stream')\n",
      "note": "SSE의 event: 라인으로 발신자를 태깅하면 프론트에서 에이전트별 말풍선으로 나눠 렌더할 수 있다."
    },
    {
      "title": "route.ts — Next.js 라우트에서 FastAPI SSE를 프론트로 흘려보내기",
      "lang": "typescript",
      "code": "// app/api/chat/route.ts — 프론트와 우리 FastAPI(/stream) 사이의 다리\nexport const runtime = 'edge'; // 스트리밍에 적합한 가벼운 런타임\n\nexport async function POST(req: Request) {\n  const { question } = await req.json(); // 화면에서 보낸 질문\n\n  // 우리 파이썬 백엔드의 SSE 엔드포인트를 그대로 호출한다\n  const upstream = await fetch(\n    `http://localhost:8000/stream?q=${encodeURIComponent(question)}`\n  );\n\n  // upstream.body(읽는 스트림)를 그대로 브라우저로 흘려보낸다\n  return new Response(upstream.body, {\n    headers: {\n      'Content-Type': 'text/event-stream', // 브라우저가 SSE로 인식\n      'Cache-Control': 'no-cache',          // 조각을 캐시하지 않고 즉시 전달\n    },\n  });\n}\n",
      "note": "프론트는 이 /api/chat 만 바라보고, 실제 LLM·RAG는 FastAPI가 담당합니다.\n이렇게 프록시로 한 겹 두면 프론트 코드를 바꾸지 않고 백엔드 주소·인증을 바꿀 수 있습니다."
    },
    {
      "title": "Chat.tsx — useChat 훅으로 토큰이 흐르는 화면 만들기",
      "lang": "tsx",
      "code": "'use client';\nimport { useChat } from 'ai/react'; // Vercel AI SDK의 채팅 훅\n\nexport default function Chat() {\n  // api: 위에서 만든 라우트. messages·input·전송 함수를 한 번에 내려준다\n  const { messages, input, handleInputChange, handleSubmit, isLoading } =\n    useChat({ api: '/api/chat' });\n\n  return (\n    <div>\n      {/* 도착한 조각이 messages에 자동 반영 → 글자가 흘러나온다 */}\n      {messages.map((m) => (\n        <p key={m.id}>\n          <b>{m.role === 'user' ? '나' : 'AI'}:</b> {m.content}\n        </p>\n      ))}\n\n      {/* 아직 토큰이 오는 중이면 표시 */}\n      {isLoading && <span>…입력 중</span>}\n\n      <form onSubmit={handleSubmit}>\n        <input value={input} onChange={handleInputChange} placeholder='질문을 입력' />\n        <button type='submit'>보내기</button>\n      </form>\n    </div>\n  );\n}\n",
      "note": "SSE 파싱·이어붙이기를 우리가 짜지 않아도 useChat이 messages를 실시간 갱신합니다.\n로딩 스피너 대신 '지금까지 도착한 글자'를 그대로 보여 주는 것이 스트리밍 UI의 핵심 감각입니다."
    }
  ],
  "capstone-3": [
    {
      "title": "실패하면 자동으로 다시 시도하기(재시도)",
      "lang": "python",
      "code": "from tenacity import retry, wait_exponential, stop_after_attempt  # 재시도 도구\n\ncount = {'n': 0}  # 몇 번 시도했는지 세는 상자\n\n@retry(wait=wait_exponential(multiplier=1, max=8), stop=stop_after_attempt(3))\ndef flaky():  # 두 번 실패하고 세 번째에 성공하는 함수(흉내)\n    count['n'] += 1\n    print(f\"{count['n']}번째 시도\")  # 결과: 1번째..2번째..3번째 시도 출력\n    if count['n'] < 3:\n        raise ValueError('일시적 오류')  # 실패를 흉내\n    return '성공!'\n\nprint(flaky())  # 결과: 3번째에서 '성공!' 출력\n",
      "note": "wait_exponential 은 1→2→4초로 점점 더 기다렸다 재시도해 서버 부담을 줄입니다."
    },
    {
      "title": "무한 대기 막기(타임아웃)",
      "lang": "python",
      "code": "import asyncio  # 비동기·타임아웃 도구\n\nasync def slow():  # 5초나 걸리는 느린 작업 흉내\n    await asyncio.sleep(5)\n    return '완료'\n\nasync def main():\n    try:\n        result = await asyncio.wait_for(slow(), timeout=2)  # 2초 안에 안 끝나면 끊음\n        print(result)\n    except asyncio.TimeoutError:  # 시간 초과 시\n        print('시간 초과! 대체 응답을 보냅니다.')  # 결과: 이 줄이 출력됨\n\nasyncio.run(main())\n",
      "note": "타임아웃이 없으면 느린 API 하나가 서비스 전체를 멈추게 할 수 있습니다."
    },
    {
      "title": "정해진 순서 대신 결과를 보고 계획을 고치는 Dynamic Planning 맛보기",
      "lang": "python",
      "code": "# run: 한 단계를 실행해 결과 문자열을 돌려준다고 가정(실제론 LLM/도구 호출)\ndef run(step):\n    return f'[{step}] 처리 결과'\n\n# needs_more: 결과를 보고 '추가 조사가 더 필요한가'를 판단(연습용은 간단 규칙)\ndef needs_more(result):\n    return '근거 부족' in result\n\nplan = ['정보 검색', '초안 작성', '근거 검증']  # 처음 세운 계획(할 일 목록)\ndone = []                                      # 끝낸 일들을 모아 둔다\n\nwhile plan:                     # 할 일이 남아 있는 동안 반복\n    step = plan.pop(0)          # 맨 앞 일을 꺼내\n    result = run(step)          # 실행하고\n    done.append(result)         # 결과를 기록\n    if needs_more(result):      # 결과가 부실하면\n        plan.insert(0, '추가 검색')  # 다음 할 일로 '추가 검색'을 새로 끼워 넣는다\n\nprint(done)  # 결과: 실행 도중 계획이 바뀌며 쌓인 결과 목록\n",
      "note": "정적 계획은 한 번 짠 순서를 고정하지만, Dynamic Planning은 중간 결과를 보고 plan 리스트를 실행 도중 바꾼다는 점이 핵심이다."
    },
    {
      "title": "cache_route.py — 캐싱 + 난이도별 모델 라우팅으로 Cost·Latency 줄이기(3교시)",
      "lang": "python",
      "code": "import hashlib  # 질문을 캐시 열쇠로 바꿀 때 사용\nfrom langchain_anthropic import ChatAnthropic\n\n# 작은·빠른 모델과 크고 똑똑한 모델을 나눠 준비\nfast = ChatAnthropic(model='claude-haiku-4-5')   # 싸고 빠름 — 쉬운 질문용\nsmart = ChatAnthropic(model='claude-opus-4-8')   # 비싸고 똑똑함 — 어려운 질문용\n\ncache = {}  # 같은 질문을 또 받으면 저장해 둔 답을 즉시 돌려준다(실무는 Redis)\n\ndef pick_model(question: str):\n    # 질문이 짧거나 단순 조회성이면 fast, 분석·추론이 필요하면 smart\n    if len(question) < 40 and not any(k in question for k in ['왜', '분석', '비교']):\n        return fast\n    return smart\n\ndef answer(question: str) -> str:\n    key = hashlib.md5(question.encode()).hexdigest()  # 질문을 짧은 열쇠로\n    if key in cache:              # 이미 답한 질문이면\n        return cache[key]          # 모델 호출 없이 즉시 반환(Cost 0, Latency 최소)\n    model = pick_model(question)  # 난이도에 맞는 모델 선택\n    result = model.invoke(question).content\n    cache[key] = result           # 다음을 위해 저장\n    return result\n\nprint(answer('영업시간 알려줘'))   # 짧은 질문 → fast 모델\nprint(answer('영업시간 알려줘'))   # 두 번째 → 캐시 적중(호출 없음)\nprint(answer('작년 대비 매출이 왜 줄었는지 분석해줘'))  # 어려운 질문 → smart 모델\n",
      "note": "쉬운 질문에 비싼 모델을 쓰는 낭비를 막고(라우팅), 같은 질문의 반복 호출을 없애(캐싱) 요금과 지연을 함께 줄입니다.\n실무에선 cache 딕셔너리를 Redis로 바꿔 여러 서버가 캐시를 공유하게 합니다."
    },
    {
      "title": "stateless.py — 대화 상태를 Redis에 저장해 수평 확장 대비(4교시)",
      "lang": "python",
      "code": "# 서버 메모리(MemorySaver) 대신 외부 저장소에 대화를 두면\n# 어느 서버가 요청을 받아도 같은 대화를 이어갈 수 있다(=Stateless).\nfrom langgraph.checkpoint.redis import RedisSaver  # Redis에 체크포인트 저장\nfrom langgraph.prebuilt import create_react_agent\nfrom langchain_anthropic import ChatAnthropic\n\nllm = ChatAnthropic(model='claude-opus-4-8')\ntools = []  # 실제로는 MCP 도구를 넣는다\n\n# Redis 주소만 주면 thread_id별 대화가 Redis에 저장·복원된다\nwith RedisSaver.from_conn_string('redis://localhost:6379') as saver:\n    agent = create_react_agent(llm, tools, checkpointer=saver)\n\n    def ask(question, thread_id):\n        config = {'configurable': {'thread_id': thread_id}}\n        return agent.invoke({'messages': [('user', question)]}, config)['messages'][-1].content\n\n    print(ask('내 이름은 길동이야', 'user-1'))\n    # 이 프로세스를 껐다 켜거나, 다른 서버에서 실행해도\n    print(ask('내 이름이 뭐였지?', 'user-1'))  # 결과: Redis에서 복원해 '길동' 기억\n",
      "note": "Day1의 MemorySaver는 서버를 끄면 대화가 사라지지만, RedisSaver는 저장소가 서버 밖에 있어 재시작·다중 서버에도 대화가 유지됩니다.\n이것이 로드밸런서 뒤에 서버를 여러 대 두는 수평 확장의 전제 조건입니다."
    },
    {
      "title": "router.py — 질문 종류를 분류해 알맞은 경로로 보내기(Query Routing, 5교시)",
      "lang": "python",
      "code": "from langchain_anthropic import ChatAnthropic\nllm = ChatAnthropic(model='claude-haiku-4-5')  # 분류는 가볍고 빠른 모델로\n\ndef classify(question: str) -> str:\n    # 모델에게 카테고리 하나만 고르게 시킨다(라우팅 판단)\n    prompt = (f'다음 질문을 [검색, 계산, 잡담] 중 하나로만 분류해 그 단어만 출력:\\n{question}')\n    return llm.invoke(prompt).content.strip()\n\ndef route(question: str) -> str:\n    kind = classify(question)          # 먼저 종류를 판단\n    if '검색' in kind:                  # 조건에 따라 흐름을 나눔(Conditional Routing)\n        return f'[RAG 파이프라인으로] {question}'   # 문서 검색 경로\n    elif '계산' in kind:\n        return f'[계산 도구로] {question}'          # 계산기 도구 경로\n    else:\n        return f'[일반 대화로] {question}'          # 잡담 경로\n\nprint(route('환불 규정 문서 찾아줘'))     # → RAG 경로\nprint(route('3만원의 15%는 얼마야'))      # → 계산 경로\nprint(route('오늘 기분 어때'))            # → 일반 대화 경로\n",
      "note": "모든 질문을 한 에이전트에 몰지 않고 종류별로 알맞은 경로로 보내면, 정확도는 높이고 불필요한 검색·비용은 줄입니다.\n실무에선 이 route가 LangGraph의 Conditional Edge가 되어 노드 사이 분기를 만듭니다."
    }
  ],
  "miniproject-1": [
    {
      "title": "리스트로 역할 분담표 만들고 출력하기",
      "lang": "python",
      "code": "# 팀원 이름과 맡은 역할을 짝지어 딕셔너리 리스트로 만든다\nroles = [\n    {\"name\": \"민수\", \"part\": \"RAG 검색\"},   # 한 사람당 한 칸\n    {\"name\": \"지영\", \"part\": \"LLM 응답\"},\n    {\"name\": \"현우\", \"part\": \"화면(UI)\"},\n]\n\n# 리스트를 하나씩 돌면서 보기 좋게 출력한다\nfor r in roles:                     # r 에는 딕셔너리 하나가 차례로 들어온다\n    print(f\"{r['name']} → {r['part']} 담당\")  # f-string 으로 값 끼워 넣기\n# 결과:\n# 민수 → RAG 검색 담당\n# 지영 → LLM 응답 담당\n# 현우 → 화면(UI) 담당",
      "note": "기획 단계의 역할 분담도 코드로 정리해 두면 팀 모두가 같은 그림을 본다."
    },
    {
      "title": "MVP 기능 우선순위 정렬하기",
      "lang": "python",
      "code": "# (기능 이름, 중요도) 튜플 리스트. 중요도는 숫자가 클수록 먼저 만든다\nfeatures = [(\"문서 검색\", 5), (\"예쁜 화면\", 2), (\"질문 답변\", 5), (\"로그인\", 1)]\n\n# sorted 로 중요도(두 번째 값) 기준 내림차순 정렬한다\n# key=lambda x: x[1] 은 '튜플의 1번 칸(중요도)으로 비교하라'는 뜻\nordered = sorted(features, key=lambda x: x[1], reverse=True)\n\n# 우선순위 순서대로 번호를 붙여 출력한다\nfor i, (name, score) in enumerate(ordered, start=1):  # enumerate: 번호 자동 부여\n    print(f\"{i}순위: {name} (중요도 {score})\")\n# 결과:\n# 1순위: 문서 검색 (중요도 5)\n# 2순위: 질문 답변 (중요도 5)\n# 3순위: 예쁜 화면 (중요도 2)\n# 4순위: 로그인 (중요도 1)",
      "note": "무엇부터 만들지 숫자로 정렬해 두면 시간이 부족할 때 무엇을 포기할지 바로 알 수 있다."
    }
  ],
  "miniproject-2": [
    {
      "title": "코사인 유사도 직접 계산해 보기",
      "lang": "python",
      "code": "import numpy as np  # 벡터 계산용\n\n# 의미를 흉내 낸 작은 벡터 3개(실제론 수백 차원이지만 원리는 같다)\nq = np.array([1.0, 0.0])      # 질문 벡터\na = np.array([0.9, 0.1])      # 비슷한 문서\nb = np.array([0.0, 1.0])      # 다른 문서\n\n# 코사인 유사도 함수: 내적을 두 크기의 곱으로 나눈다\ndef cos(x, y):\n    return np.dot(x, y) / (np.linalg.norm(x) * np.linalg.norm(y))\n\nprint(\"질문 vs a:\", round(cos(q, a), 2))  # 결과: 질문 vs a: 0.99 (매우 비슷)\nprint(\"질문 vs b:\", round(cos(q, b), 2))  # 결과: 질문 vs b: 0.0 (전혀 다름)",
      "note": "유사도가 1에 가까울수록 의미가 가깝다는 것을 숫자로 직접 확인할 수 있다."
    },
    {
      "title": "Supervisor가 워커를 지휘하는 최소 멀티에이전트",
      "lang": "python",
      "code": "# 워커 1: RAG 검색 담당(실제론 벡터DB 조회, 여기선 흉내)\ndef search_worker(state):\n    state['messages'].append('검색결과: 환불은 7일 이내 가능')\n    return state\n\n# 워커 2: 계산 담당\ndef math_worker(state):\n    state['messages'].append('계산결과: 12000원')\n    return state\n\nworkers = {'search': search_worker, 'math': math_worker}\n\n# 조정자: 상태를 보고 다음 워커 이름이나 FINISH를 정한다(여기선 간단 규칙, 실무는 LLM)\ndef supervisor(state):\n    done = ' '.join(state['messages'])\n    if '검색결과' not in done:\n        return 'search'\n    if '계산결과' not in done:\n        return 'math'\n    return 'FINISH'\n\nstate = {'messages': []}\nwhile True:\n    nxt = supervisor(state)      # 다음에 누구를 시킬지 결정\n    if nxt == 'FINISH':          # 다 끝났으면 종료\n        break\n    state = workers[nxt](state)  # 지목된 워커를 호출\n\nprint(state['messages'])  # 결과: ['검색결과: ...', '계산결과: ...']\n",
      "note": "조정자가 순서를 정하고 워커는 한 가지 일만 한다. 실무에서는 LangGraph의 StateGraph로 같은 구조를 노드·엣지로 표현한다."
    },
    {
      "title": "검색결과를 채점하고 부실하면 질문을 고쳐 다시 검색하기",
      "lang": "python",
      "code": "# search: top-k 조각을 돌려준다고 가정(실제론 벡터DB 조회)\ndef search(query):\n    return ['환불 규정 문서 일부...', '배송 안내 문서...']\n\n# grade: 조각이 질문에 관련 있는지 LLM에 물어 yes/no를 받는다(여기선 흉내)\ndef grade(question, chunk):\n    return 'yes' if '환불' in chunk else 'no'\n\n# rewrite_query: 질문을 더 구체적으로 고쳐 쓴다\ndef rewrite_query(q):\n    return q + ' 기간 조건 포함'\n\nquestion = '환불 되나요?'\nfor attempt in range(2):                      # 최대 2회까지 재검색\n    chunks = search(question)\n    good = [c for c in chunks if grade(question, c) == 'yes']\n    if len(good) >= 1:                          # 관련 조각이 있으면 성공\n        print('검색 성공:', good[0][:10])\n        break\n    question = rewrite_query(question)          # 부실하면 질문을 고쳐 재시도\n    print('질문 재작성 ->', question)\n",
      "note": "검색이 부실하면 곧장 답하지 않고 질문을 고쳐 다시 찾는 이 되먹임 구조가 Agentic RAG의 핵심이다."
    },
    {
      "title": "RAG를 숫자로 평가하기(faithfulness·answer relevancy)",
      "lang": "python",
      "code": "# 샘플 QA셋: (질문, 정답 근거, 모델 답) — 실제론 여러 개를 넣는다\nsamples = [\n    ('환불 기간은?', '환불은 7일 이내 가능', '환불은 7일 안에 됩니다'),\n    ('배송 기간은?', '배송은 2~3일 소요', '배송은 보통 2~3일 걸립니다'),\n]\n\n# 실제로는 LLM에게 0~1 점수를 매기게 하지만, 여기선 원리만 흉내 낸다\ndef faithfulness(evidence, answer):  # 답이 근거 안에서 나왔나\n    return 1.0 if any(w in answer for w in evidence.split()) else 0.0\n\ndef answer_relevancy(question, answer):  # 질문에 답을 하긴 했나\n    return 1.0 if len(answer) > 0 else 0.0\n\nfa = sum(faithfulness(e, a) for _, e, a in samples) / len(samples)\nrel = sum(answer_relevancy(q, a) for q, _, a in samples) / len(samples)\nprint(f'충실도 평균 {fa:.2f}, 관련성 평균 {rel:.2f}')  # 이 점수표가 요구되는 정량 평가 결과물\n",
      "note": "답이 근거 안에서 나왔는지(faithfulness)와 질문에 답했는지(answer relevancy)를 0~1로 채점해 평균을 낸다. 실무에서는 RAGAS 같은 도구로 자동화한다."
    },
    {
      "title": "llm.py — LLM 호출을 한 곳으로 모으는 재사용 모듈 (2교시 시연)",
      "lang": "python",
      "code": "# llm.py — 앱 어디서나 이 함수 하나만 부르게 만드는 얇은 래퍼\nfrom openai import OpenAI\nfrom config import API_KEY, MODEL_NAME  # 1일차에 만든 설정 재사용\n\n# 모듈이 로드될 때 클라이언트를 한 번만 만든다(매 호출마다 새로 만들면 낭비)\nclient = OpenAI(api_key=API_KEY)\n\ndef ask_llm(prompt, system=\"너는 정확하고 간결한 한국어 도우미다.\", temperature=0.3):\n    \"\"\"프롬프트 한 개를 받아 모델의 답 텍스트만 돌려주는 얇은 래퍼.\"\"\"\n    messages = [\n        {\"role\": \"system\", \"content\": system},  # 말투·성격을 정하는 지시\n        {\"role\": \"user\", \"content\": prompt},     # 실제 질문\n    ]\n    res = client.chat.completions.create(\n        model=MODEL_NAME,        # 모델 이름은 config 한 곳에서만 관리\n        messages=messages,\n        temperature=temperature,  # 낮을수록 일관된 답\n    )\n    return res.choices[0].message.content.strip()  # 답 텍스트만 추출\n\nif __name__ == \"__main__\":\n    print(ask_llm(\"사과를 한 문장으로 소개해줘.\"))  # 결과: 사과는 아삭하고 달콤한 대표 과일입니다.",
      "note": "앱 곳곳에서 openai를 직접 부르지 않고 ask_llm() 하나만 쓰게 만들면, 모델 교체·로깅·재시도를 이 파일 한 곳에서 처리할 수 있다. rag.py와 app.py도 이 함수를 가져다 쓴다."
    },
    {
      "title": "계산기 도구를 에이전트에 붙이기 — '판단은 모델, 실행은 도구' (5교시 시연)",
      "lang": "python",
      "code": "# 에이전트에 '계산기 도구'를 붙여 능력을 확장하는 최소 예제\nimport re\nfrom llm import ask_llm  # 방금 만든 LLM 래퍼 재사용\n\n# 도구 1: 안전한 사칙연산 계산기(모델이 숫자 계산을 틀리는 것을 보완)\ndef calculator(expr):\n    # 숫자와 + - * / ( ) . 공백만 남겨 위험한 코드 실행을 막는다\n    safe = re.sub(r\"[^0-9+\\-*/(). ]\", \"\", expr)\n    return str(eval(safe))  # 정리된 식만 계산\n\n# 도구 목록(이름 → 함수). 에이전트가 골라 쓸 수 있게 사전으로 둔다\nTOOLS = {\"calc\": calculator}\n\ndef agent(question):\n    # 1) 모델에게 '계산이 필요하면 CALC[식] 형태로만 답하라'고 안내\n    plan = ask_llm(f\"계산이 필요하면 CALC[식] 형식으로만, 아니면 바로 답해라.\\n질문: {question}\")\n    # 2) 계산 지시가 오면 도구를 실제로 실행한다\n    m = re.search(r\"CALC\\[(.+?)\\]\", plan)\n    if m:\n        result = TOOLS[\"calc\"](m.group(1))  # 실제 계산은 믿을 수 있는 도구가\n        return f\"계산 결과: {result}\"\n    return plan  # 계산이 필요 없으면 모델 답을 그대로\n\nif __name__ == \"__main__\":\n    print(agent(\"정가 12000원의 15% 할인가는?\"))  # 결과: 계산 결과: 10200.0",
      "note": "LLM은 '무엇을 할지' 정하고, 실제 계산은 도구가 한다. 이 '판단은 모델, 실행은 도구' 분업이 에이전트 확장의 기본 패턴이다. 여기서 calc 자리에 '문서 검색' 도구를 꽂으면 그대로 Day3의 검색 워커가 된다."
    }
  ],
  "miniproject-3": [
    {
      "title": "assert로 직접 만드는 미니 테스트",
      "lang": "python",
      "code": "# 검사할 대상 함수: 숫자 두 개를 더한다\ndef add(a, b):\n    return a + b\n\n# assert: 뒤 조건이 참이면 조용히 통과, 거짓이면 오류를 내며 멈춘다\nassert add(2, 3) == 5     # 2+3 은 5 가 맞는지 확인(통과)\nassert add(-1, 1) == 0    # 음수 경우도 확인(통과)\n\nprint(\"add 함수 테스트 통과\")  # 결과: add 함수 테스트 통과",
      "note": "assert 한 줄이면 '기대값과 같은지' 자동 검사가 되어, 테스트의 기본 원리를 바로 이해할 수 있다."
    },
    {
      "title": "회고 항목을 표로 정리해 출력하기",
      "lang": "python",
      "code": "# KPT 회고: Keep(유지)·Problem(문제)·Try(시도) 세 칸으로 정리한다\nretro = {\n    \"Keep\": \"매일 커밋해 진행상황을 공유한 점\",  # 잘된 것\n    \"Problem\": \"청킹 크기를 너무 크게 잡아 검색이 부정확했던 점\",  # 아쉬운 것\n    \"Try\": \"다음엔 chunk 크기를 200으로 줄여 실험해 보기\",  # 다음 행동\n}\n\n# 딕셔너리를 키-값 쌍으로 돌며 보기 좋게 출력한다\nfor key, value in retro.items():   # items() 는 (키, 값) 쌍을 차례로 준다\n    print(f\"[{key}] {value}\")\n# 결과:\n# [Keep] 매일 커밋해 진행상황을 공유한 점\n# [Problem] 청킹 크기를 너무 크게 잡아 검색이 부정확했던 점\n# [Try] 다음엔 chunk 크기를 200으로 줄여 실험해 보기",
      "note": "KPT(Keep·Problem·Try) 틀로 적으면 막연한 소감이 아니라 다음에 할 구체적 행동이 남는다."
    }
  ]
}

import { examplesExtra } from './lectureexamples2.js'

export const examplesFor = (subjectId, day) => {
  const key = `${subjectId}-${day}`
  return [...(examples[key] || []), ...(examplesExtra[key] || [])]
}
