const t={"git-1":{plan:{schedule:[{time:"09:00–09:50",topic:"OT · 프로그래밍 개요: 프로그래밍 이해 · Frontend vs Backend · IT 용어"},{time:"10:00–10:50",topic:"개발환경 구축: VS Code 설치 · Workspace 만들기 · Git 설치/설정"},{time:"11:00–11:50",topic:"Git 기초 개념 + VS Code Source Control로 첫 커밋"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"Git 기초 명령어: init·add·commit·status·log·diff"},{time:"14:00–14:50",topic:".gitignore · 되돌리기(restore/reset/revert)"},{time:"15:00–15:50",topic:"Remote Repository 이해 + GitHub 설정 · SSH 키 생성/등록"},{time:"16:00–16:50",topic:"원격 사용법: clone·push·pull · Sync Changes"},{time:"17:00–17:50",topic:"(심화) 브랜치 · 머지 · 충돌 · PR 협업 실습"}],practice:{title:"팀 저장소 만들고 브랜치로 협업해서 충돌까지 해결하기",steps:["터미널을 열고 `git --version` 을 입력해 Git 이 설치돼 있는지 확인한다. (예: git version 2.43.0 처럼 버전이 보이면 성공)",'`git config --global user.name "홍길동"` 와 `git config --global user.email "me@example.com"` 으로 커밋에 찍힐 내 이름과 이메일을 등록한다.',"작업할 폴더를 만들고 그 안에서 `git init` 을 실행해 빈 저장소를 만든다. (.git 폴더가 생기고 `git status` 가 동작하면 성공)",'`README.md` 파일을 만들어 팀 이름을 한 줄 적고, `git add README.md` → `git commit -m "docs: 팀 소개 추가"` 로 첫 커밋을 만든다.',"GitHub 에서 팀 저장소(Repository)를 하나 새로 만들고, `git remote add origin <저장소주소>` → `git branch -M main` → `git push -u origin main` 으로 내 컴퓨터의 커밋을 인터넷(GitHub)으로 올린다.","(대안) SSH 방식: `ssh-keygen -t ed25519` 로 키를 만들고 공개키(.pub)를 GitHub 의 Settings → SSH Keys 에 등록한 뒤, `git remote set-url origin git@github.com:계정/저장소.git` 처럼 원격 주소를 SSH 형식으로 바꿔 비밀번호 입력 없이 push 되는지 확인한다.","팀원 각자 `git switch -c feature/내이름` 으로 본인 작업용 브랜치(가지)를 만들고, 같은 파일의 같은 줄을 일부러 서로 다르게 고친 뒤 각자 커밋한다.","한 사람의 브랜치를 main 에 먼저 머지(합치기)하고, 다른 사람이 main 을 자기 브랜치로 `git merge main` 하면 충돌(conflict) 메시지가 나오는 것을 확인한다.","충돌난 파일을 열어 `<<<<<<<`, `=======`, `>>>>>>>` 표시 구간을 보고 최종 내용을 직접 정리한 뒤 표시줄을 지우고, `git add` → `git commit` 으로 충돌을 마무리한다.","GitHub 에서 Pull Request(PR)를 열고 팀원에게 코드리뷰(승인)를 받은 뒤 Merge 버튼으로 합친다.","마지막으로 `git pull` 을 실행해 합쳐진 최신 main 을 모두의 컴퓨터로 내려받고, `git log --oneline --graph` 로 합쳐진 역사가 한눈에 보이는지 확인한다."],deliverable:"팀원 모두의 커밋과 최소 1건의 머지된 Pull Request 가 남아 있는 GitHub 팀 저장소 링크, 그리고 `git log --oneline --graph` 결과 캡처"}},examples:[{title:"지금 내 저장소 상태를 한눈에 보기",lang:"bash",code:`git status            # 현재 변경/스테이지 상태를 알려주는 안내판
# 예상 출력:
#   On branch main
#   Changes not staged for commit:
#     modified:   README.md   ← 고쳤지만 아직 add 안 한 파일
git add README.md     # README.md 를 다음 커밋 대상으로 담기
git status            # 다시 보면 'Changes to be committed' 로 옮겨가 있음`,note:"막힐 때마다 `git status` 를 치는 습관이 왕초보 탈출의 지름길이다."},{title:"마지막 저장 이후 무엇이 바뀌었는지 보기(diff)",lang:"bash",code:`echo "한 줄 추가" >> README.md   # README.md 맨 끝에 새 줄 덧붙이기(>> 는 추가)
git diff                        # 직전 저장 대비 바뀐 부분을 +/- 로 보여줌
# 예상 출력:
#   +한 줄 추가     ← + 는 새로 추가된 줄을 의미`,note:"커밋하기 전에 `git diff` 로 '내가 뭘 바꿨는지' 확인하면 실수를 크게 줄인다."},{title:"방금 커밋을 취소하고 변경은 그대로 두기(reset --soft)",lang:"bash",code:`git reset --soft HEAD~1   # 가장 최근 커밋 1개를 취소(HEAD~1 = 한 칸 전)
# --soft 라서 파일 내용과 스테이지는 그대로 남는다(되돌리기 안전)
git status                # 방금 커밋했던 변경이 다시 '커밋 대기' 상태로 보임`,note:"커밋 메시지를 잘못 썼거나 한 커밋에 너무 많이 담았을 때 가장 자주 쓰는 안전한 되돌리기다."},{title:"SSH 키 만들고 GitHub에 등록해 비밀번호 없이 연결하기",lang:"bash",code:`# 1) ed25519 방식으로 키 한 쌍을 만든다(엔터 3번이면 기본 경로에 저장)
ssh-keygen -t ed25519 -C "me@team.com"
# 2) 공개키(.pub) 내용을 출력해 이 값을 복사한다
cat ~/.ssh/id_ed25519.pub
# 3) GitHub > Settings > SSH and GPG keys > New SSH key 에 붙여넣는다
# 4) 연결이 되는지 시험한다
ssh -T git@github.com   # 성공하면 'Hi 이름! You've successfully authenticated' 메시지`,note:"개인키(id_ed25519)는 절대 공유하지 말고 공개키(id_ed25519.pub)만 GitHub에 등록한다."},{title:"VS Code Source Control로 터미널 없이 커밋하기",lang:"text",code:`1. 왼쪽 세로 막대의 '가지(branch) 아이콘'(Source Control)을 클릭한다.
2. Changes 목록에서 커밋할 파일 옆의 + 버튼을 눌러 stage 한다(= git add).
3. 위쪽 입력창에 커밋 메시지를 적는다(예: 로그인 기능 추가).
4. 체크(✓, Commit) 버튼을 눌러 커밋한다(= git commit).
5. 우측 하단/상단의 'Sync Changes' 버튼을 누르면 push·pull 이 한 번에 처리된다.`,note:"CLI의 add·commit·push가 VS Code에서 어떤 버튼인지 대응시켜 두면 터미널과 GUI를 자유롭게 오갈 수 있다."},{title:"변경 확인(diff)과 되돌리기 3형제 직접 비교해 보기",lang:"bash",code:`# (준비) note.txt 를 만들고 첫 커밋을 하나 만들어 둔 상태로 시작
echo "1번 줄" > note.txt        # note.txt 에 첫 줄 작성
git add note.txt && git commit -m "init: note 생성"  # 기준이 될 첫 커밋

# --- (A) restore: 아직 add 안 한 편집 버리기 ---
echo "실수로 지움" > note.txt     # 파일을 통째로 잘못 덮어씀
git diff                       # 무엇이 바뀌었는지 확인(-1번줄 +실수로지움)
git restore note.txt           # 마지막 커밋 상태로 되돌림 → note.txt 는 다시 '1번 줄'

# --- (B) reset --soft: 방금 한 '내 컴퓨터 안의' 커밋만 무르기 ---
echo "2번 줄" >> note.txt        # 둘째 줄 추가
git commit -am "feat: 2번 줄 추가"  # 커밋했는데 메시지를 잘못 썼다고 가정
git reset --soft HEAD~1        # 커밋만 취소(파일 내용·스테이지는 그대로 유지)
git commit -am "feat: 본문에 2번 줄 추가"  # 메시지를 고쳐 다시 커밋

# --- (C) revert: 이미 공유한(push한) 커밋을 안전하게 취소 ---
git log --oneline              # 취소할 커밋의 7자리 번호 확인(예: a1b2c3d)
git revert a1b2c3d             # 그 변경을 반대로 되돌리는 '새 커밋'을 추가
# → 역사를 지우지 않으므로 이미 push해 남과 공유한 상황에서도 안전하다`,note:`restore=커밋 전 편집 취소, reset=내 커밋 무르기, revert=공유된 커밋을 새 커밋으로 취소.
실무에서 '이미 올린 걸 되돌릴 때는 reset 말고 revert' 라는 규칙만 지켜도 협업 사고를 막는다.`},{title:"clone → pull → push: 원격 저장소로 협업 왕복하기",lang:"bash",code:`# 1) 팀 저장소를 내 컴퓨터로 처음 복제(이력까지 통째로 내려옴)
git clone https://github.com/team/team-project.git
cd team-project                # 복제된 폴더 안으로 이동

# 2) [작업 시작 전 필수] 원격 최신 변경을 먼저 받아 합친다
git pull origin main           # 남이 올린 커밋을 내 것과 합침(안 하면 나중에 충돌↑)

# 3) 내 작업을 하고 평소처럼 커밋
echo "내 소개" > about-me.md      # 파일 하나 만들어
git add about-me.md            # 스테이지에 담고
git commit -m "docs: 자기소개 추가"  # 커밋으로 저장

# 4) 내 커밋을 원격으로 올린다
git push origin main           # GitHub 로 업로드

# 5) 만약 push가 거절되면(남이 먼저 올린 경우) → pull로 최신 합치고 다시 push
#   ! [rejected] ... (fetch first)   ← 이런 메시지가 뜨면
git pull origin main           # 원격 최신을 먼저 받아 합치고
git push origin main           # 다시 올리면 성공

# 참고) 합치지 않고 원격에 뭐가 새로 올라왔는지 '확인만' 하고 싶을 때
git fetch                      # 가져오되 내 브랜치에 합치지는 않음
git log --oneline origin/main  # 원격 쪽 최신 커밋 목록만 살펴보기`,note:`핵심 습관은 '작업 전 pull, 작업 후 push' 순서다.
push가 거절되는 건 오류가 아니라 '너 지금 최신이 아니야' 라는 신호이니, pull 한 번으로 해결한다.`},{title:"SSH 키 만들어 GitHub에 등록하고 연결 확인하기",lang:"bash",code:`# 1) 개인키·공개키 한 쌍 생성(-t 방식 ed25519, -C 는 식별용 메모)
ssh-keygen -t ed25519 -C "me@team.com"
#   저장 위치를 물으면 그냥 Enter (기본: ~/.ssh/id_ed25519)
#   암호(passphrase)는 Enter 두 번으로 비워도 되고, 넣으면 더 안전
#   → id_ed25519(개인키, 비밀) 와 id_ed25519.pub(공개키, 공유용) 두 파일 생성

# 2) '공개키' 내용만 화면에 출력해서 통째로 복사(개인키는 절대 복사·공유 금지!)
cat ~/.ssh/id_ed25519.pub
#   출력 예: ssh-ed25519 AAAAC3Nza...(긴 문자열)... me@team.com

# 3) GitHub 웹 → Settings → SSH and GPG keys → New SSH key
#    Title 아무거나, Key 칸에 위에서 복사한 '공개키' 붙여넣고 저장

# 4) 연결이 되는지 확인(처음엔 yes 입력해 신뢰 등록)
ssh -T git@github.com
#   성공 메시지: Hi 홍길동! You've successfully authenticated ...

# 5) 이제 원격 주소를 SSH 방식으로 쓰면 매번 토큰 입력 없이 push/pull 가능
git remote set-url origin git@github.com:team/team-project.git`,note:`공개키(.pub)는 자물쇠라 남에게 줘도 되지만, 개인키는 그 자물쇠를 여는 유일한 열쇠라 내 컴퓨터 밖으로 절대 내보내지 않는다.
한 번 등록해 두면 이후 GitHub 인증이 자동으로 된다.`},{title:"강사 제공 — 맥북 개발환경 일괄 설치 스크립트 사용법과 핵심 구조",lang:"bash",code:`# SKALA 첫날 배포되는 skala-config-setup.sh — 한 번 실행으로 과정 전체 환경을 구성한다
chmod +x skala-config-setup.sh    # 실행 권한 부여(최초 1회)
./skala-config-setup.sh           # 실행 — 관리자 비밀번호 1회 입력(입력해도 화면엔 안 보임, 정상)

# ── 스크립트가 설치해 주는 것들 ─────────────────────────
# Homebrew(맥 패키지 관리자) → 이후 모든 설치의 토대
# git · wget · curl · tree · jq   ← 오늘(Git 수업)부터 바로 사용
# Java(temurin 21)               ← Spring AI 과목 대비
# Python 3.11                    ← 데이터분석·LLM 과목 대비
# Node + yarn/pnpm/typescript    ← Vue.js 과목 대비
# PostgreSQL 17 · Docker Desktop ← DB·서빙 과목 대비
# VS Code + 확장 · iTerm2 · awscli · kubectl

# ── 왕초보를 배려한 설계 3가지(스크립트를 읽어보면 보인다) ──
# 1) 실패해도 멈추지 않는다: 실패 항목은 모아뒀다가 마지막에 한꺼번에 보고
# 2) 여러 번 실행해도 안전(idempotent): 이미 설치된 항목은 알아서 건너뜀
# 3) 마무리 안내까지 출력: 예) "Docker Desktop은 한 번 실행해야 docker 명령이 동작"

# 설치가 끝나면 아래로 확인한다(버전이 나오면 성공)
git --version && node --version && python3.11 --version`,note:'개발환경은 손으로 하나씩 깔면 사람마다 상태가 달라져 수업 내내 발목을 잡는다. 일괄 스크립트는 "누가 실행해도 같은 환경"을 보장하며, 실패 항목만 마지막 보고에서 확인해 개별 해결하면 된다. 스크립트 자체도 bash 학습 자료다 — try 함수(실패 기록 후 계속)와 중복 실행 안전 처리 패턴을 눈여겨보자.'},{title:"IT 용어 한 장 — 화면 기획 용어(웹 프로젝트 전 과정에서 쓰임)",lang:"text",code:`# 화면을 만들 때 팀이 공통으로 쓰는 용어 — 순서대로 구체화된다
Wireframe   : 화면의 뼈대만 그린 설계도 (색·폰트·이미지 없이 배치만)
Mockup      : 와이어프레임에 실제 디자인(색·글꼴·아이콘)을 입힌 정적 시안
Prototype   : 클릭하면 화면이 넘어가는 '동작하는' 시제품 (흐름 검증용)
Persona     : 우리 서비스를 쓸 가상의 대표 사용자 모델

UI  : 사용자가 보는 인터페이스 그 자체 (버튼·레이아웃·색·글꼴)
UX  : 사용하며 느끼는 경험의 총합 (UI보다 큰 개념)

GNB : Global Navigation Bar — 전체 서비스 공통 상단 메뉴
LNB : Local Navigation Bar — 특정 영역 안의 세부 메뉴
Information Architecture : 메뉴·페이지·콘텐츠의 전체 구조 설계
Design System : 일관된 UI를 위한 설계 체계(색·컴포넌트 규칙)

# 기억법: 뼈대(Wireframe) → 옷(Mockup) → 움직임(Prototype) 순서로 구체화`,note:"이 용어들은 웹 서비스 mini-Project(설계·와이어프레임)와 캡스톤 발표에서 그대로 쓰인다. 특히 Wireframe→Mockup→Prototype의 구체화 단계와 GNB/LNB는 기획 회의에서 매일 나오는 말이므로 첫날에 정리해 두면 팀 소통이 빨라진다."},{title:"맨 처음 한 번만 하는 Git 사용자 설정 (config)",lang:"bash",code:`# 1) 커밋에 남길 내 이름을 전역(--global)으로 등록한다(모든 저장소 공통)
git config --global user.name "홍길동"
# 2) 이메일은 GitHub 계정 이메일과 똑같이 맞춘다(잔디·작성자 매칭)
git config --global user.email "me@team.com"
# 3) 새 저장소의 기본 브랜치 이름을 master 대신 main 으로 지정
git config --global init.defaultBranch main
# 4) 커밋 메시지 편집기로 VS Code 사용(--wait: 창 닫을 때까지 기다림)
git config --global core.editor "code --wait"
# 5) 지금까지 설정한 값 전체를 확인
git config --list
# 6) 값 하나만 콕 집어 확인
git config user.name       # 출력: 홍길동`,note:"이 설정은 컴퓨터마다 딱 한 번만 하면 이후 모든 저장소에 자동 적용된다. user.email 을 GitHub 이메일과 맞춰야 커밋 작성자가 내 계정으로 인식된다."},{title:"init → 브랜치 → merge → 충돌 해결까지 한 흐름으로",lang:"bash",code:`# (준비) 새 폴더를 Git 저장소로 초기화(.git 숨김폴더가 생김)
git init                              # 현재 폴더를 로컬 저장소로 만듦
echo "메인 제목" > index.html          # 첫 파일 작성
git add index.html                    # 스테이지에 담고
git commit -m "init: 첫 페이지"        # main 브랜치에 첫 커밋

# 1) 기능 작업용 브랜치를 만들고 그 자리로 이동(-c = 생성+전환 한 번에)
git switch -c feature-login           # feature-login 으로 갈라져 나옴
echo "로그인 제목" > index.html         # 같은 줄을 다르게 수정
git commit -am "feat: 로그인 제목"      # 브랜치에 커밋

# 2) main 으로 돌아와 같은 줄을 또 다르게 수정(충돌 유발)
git switch main                       # 기준 브랜치로 복귀
echo "홈 제목" > index.html
git commit -am "feat: 홈 제목"

# 3) feature 를 main 으로 합치기 → 같은 줄이라 충돌 발생
git merge feature-login               # CONFLICT (content): index.html
# 파일을 열면 <<<<<<< HEAD / ======= / >>>>>>> feature-login 표식이 보임
# 표식 3줄을 지우고 최종 내용을 손으로 정한 뒤 저장한다

# 4) 해결했음을 알리고 병합 커밋을 완성한다
git add index.html                    # 해결된 파일을 다시 스테이지에
git commit -m "merge: 제목 충돌 해결"  # 병합 마무리`,note:"두 브랜치가 같은 줄을 다르게 고치면 Git이 자동 병합을 멈추고 충돌 표식을 넣는다. 표식을 지우고 add·commit 을 다시 해야 병합이 끝난다 — 협업에서 반드시 겪는 과정이다."},{title:"Git이 무시할 파일 목록 .gitignore 만들기",lang:"bash",code:`# 아래 내용을 프로젝트 루트에 '.gitignore' 파일로 저장한다

# node_modules : npm install 로 언제든 다시 받는 외부 라이브러리 → 올리지 않음
node_modules
# dist         : 빌드 결과물(npm run build 산출물) → 소스만 관리하면 됨
dist
# .env         : API 키·비밀번호가 든 파일 → 절대 업로드 금지(보안)
.env
*.local
# .DS_Store    : macOS 가 자동으로 만드는 잡파일
.DS_Store
# 편집기 개인 설정은 무시하되, 공유용 확장 목록만 예외로 남긴다
.vscode/*
!.vscode/extensions.json`,note:"비밀키·빌드결과·라이브러리 폴더는 커밋하지 않는 것이 원칙이다. 단, 이미 커밋된 파일은 .gitignore 만으로 빠지지 않으니 git rm --cached <파일> 로 추적을 먼저 끊어야 한다."},{title:"커밋 전 실수 구조대 — stash 임시보관과 --amend 고쳐쓰기",lang:"bash",code:`# 상황 1: 커밋을 안 했는데 다른 브랜치로 가야 할 때 — stash(임시 서랍)
git stash                          # 작업 중 변경을 임시 서랍에 넣고 폴더를 깨끗하게
git stash list                     # 서랍 목록 확인 (stash@{0} 이 방금 넣은 것)
git switch main                    # 이제 변경 없이 자유롭게 브랜치 이동 가능
git switch feature-greeting        # 원래 작업하던 브랜치로 복귀
git stash pop                      # 서랍에서 꺼내 이어서 작업 (목록에서도 제거)

# 상황 2: 방금 커밋 메시지에 오타 — amend(마지막 커밋 고쳐쓰기)
git commit -m "로긴 버튼 색상 변경"              # 앗, '로긴' 오타!
git commit --amend -m "로그인 버튼 색상 변경"    # 마지막 커밋을 새 메시지로 교체
git log --oneline -1               # 메시지가 바뀌었는지 확인

# 상황 3: add 를 빠뜨리고 커밋했을 때 — 파일까지 함께 amend
echo "빠뜨린 내용" >> hello.txt     # 커밋에 안 들어간 수정이 남아 있다
git add hello.txt                  # 빠뜨린 파일을 스테이징하고
git commit --amend --no-edit       # 메시지는 그대로, 파일만 마지막 커밋에 합치기

# 주의: --amend 는 이미 push 한 커밋에는 금지 (기록이 바뀌어 팀원과 어긋난다)`,note:'김성영 실습교수의 Git 종합실습 가이드 중 "자주 하는 실수 & 해결법" 코너를 손으로 따라 하는 실습으로 옮겼다. 커밋 안 하고 브랜치를 옮기려다 막히거나, 메시지 오타·add 누락을 발견하는 왕초보의 3대 사고를 stash 와 --amend 두 도구로 수습하는 법을 익힌다. push 이후에는 amend 를 쓰면 안 된다는 안전수칙까지가 한 세트다.',origin:"practice",source:"김성영 실습교수 — Git 수업 공유 자료"},{title:"완성 프로젝트를 새 브랜치로 GitHub에 올리기 + push 오류 처방전",lang:"bash",code:`# 완성한 프로젝트 폴더를 통째로 '새 브랜치'에 담아 원격에 올리는 8단계
cd ~/Desktop/my-project            # 1) 프로젝트 폴더로 이동
git status                         # 2) 상태 확인 ("not a git repository" 면 git init 먼저)
git switch -c html_js_css          # 3) 새 브랜치 생성과 동시에 이동 (-c = create)
git add .                          # 4) 프로젝트 전체를 스테이징
git commit -m "Complete HTML JS CSS project"   # 5) 커밋 생성
git remote -v                      # 6) 원격 연결 확인 (아무것도 안 나오면 아래로)
git remote add origin https://github.com/내계정/data.git   # 7) 원격 최초 연결

# "remote origin already exists" 오류가 나면 add 대신 주소만 교체
git remote set-url origin https://github.com/내계정/data.git

git push -u origin html_js_css     # 8) 새 브랜치를 원격에 업로드 (-u: 다음부턴 git push 만)
# 성공 메시지: * [new branch] html_js_css -> html_js_css

# 자주 만나는 push 오류 처방전
# "Authentication failed"        → 비밀번호 대신 Personal Access Token(PAT) 입력
# "failed to push some refs"     → git pull --rebase origin html_js_css 후 다시 push
# "src refspec ... not match"    → 커밋이 아직 없다는 뜻, add · commit 먼저
# GitHub 웹에서 브랜치 메뉴 → html_js_css 선택 → 파일이 보이면 최종 성공`,note:'김성영 실습교수 가이드의 "종합실습 2 — 완성 프로젝트를 새 브랜치로 GitHub에 올리기" 8단계 시나리오를 재구성했다. main 이 아닌 작업 브랜치를 push -u 로 올리는 흐름과, 초보가 반드시 한 번은 만나는 push 오류 4종의 원인별 해결 명령을 처방전 형식으로 붙였다. 오류 메시지를 보고 겁먹지 않고 대응하는 것이 이 실습의 진짜 목표다.',origin:"practice",source:"김성영 실습교수 — Git 수업 공유 자료"},{title:"Git-Flow 전략 — 브랜치 5종으로 개발부터 출시까지 흉내내기",lang:"bash",code:`# Git-Flow: 역할별 브랜치 5종으로 개발-출시를 체계화하는 협업 규칙
# main=배포된 안정 버전 / develop=다음 출시 준비의 중심 / feature=기능 / release=출시 준비 / hotfix=긴급 수정
git switch -c develop              # 1) main에서 develop 분기(모든 개발의 기준점)
git switch -c feature/login        # 2) 기능 브랜치는 develop에서 갈라진다
echo "로그인 폼" > login.html       # 기능 개발 작업(파일 생성)
git add . && git commit -m "feat: 로그인 폼"   # 기능 커밋
git switch develop                 # 3) 기능 완료 후 develop으로 복귀
git merge feature/login            #    develop에 병합(원본 main은 아직 안전)
git branch -d feature/login        #    역할이 끝난 기능 브랜치는 삭제
git switch -c release/1.0          # 4) 출시 준비: develop에서 release 분기(QA와 버그수정 전용)
git switch main                    # 5) 출시 확정 시 main으로 이동해
git merge release/1.0              #    release를 main에 병합(=v1.0 출시)
git switch develop                 #    같은 내용을 develop에도 병합해 두 브랜치를 맞춘다
git merge release/1.0
# 6) 배포 후 긴급 버그 발견 → hotfix는 develop이 아니라 main에서 바로 분기
git switch main
git switch -c hotfix/1.0.1         # 급한 불을 끄고, 수정본을 main과 develop 양쪽에 병합하는 것까지가 규칙`,note:"브랜치 전략은 여러 명이 한 저장소를 쓸 때 언제 브랜치를 만들고 어디로 합칠지 정한 팀 규칙이다. Git-Flow는 v1.0, v2.0처럼 출시 주기가 명확한 제품에 맞는 대표 전략으로, feature는 develop에서 나와 develop으로, release와 hotfix는 main과 develop 양쪽으로 합쳐진다는 이동 경로만 기억하면 그림이 그려진다."},{title:"GitHub-Flow — main과 feature 둘로 끝내는 수시 배포 전략과 Pull Request",lang:"bash",code:`# GitHub-Flow: 브랜치는 main과 feature 딱 두 종류 — 하루에도 몇 번씩 배포하는 웹 서비스용
# 규칙 1: main은 언제나 오류 없이 '즉시 배포 가능한' 상태를 유지한다
git switch main                    # 기준 브랜치로 이동
git pull origin main               # 항상 최신 main에서 출발한다
git switch -c feature/search-box   # 규칙 2: 작업은 main에서 바로 분기한 feature 브랜치에서
echo "검색창" > search.html         # 기능 개발
git add . && git commit -m "feat: 검색창 추가"   # 커밋
git push -u origin feature/search-box   # 규칙 3: 작업 브랜치를 원격에 올린다
# 규칙 4: GitHub 웹에서 Pull Request(PR)를 연다
#   PR = "내가 작업한 브랜치를 검토하고 main에 합쳐 달라"는 공식 요청
#   동료의 코드 리뷰와 자동 테스트를 통과해야 병합된다
# 규칙 5: PR이 main에 병합되면 곧바로 서버에 자동 배포(CI/CD)
git switch main                    # 병합이 끝나면 로컬 정리 시작
git pull origin main               # 내 기능이 합쳐진 최신 main을 받고
git branch -d feature/search-box   # 역할이 끝난 브랜치는 삭제
# 비교: Git-Flow는 정기 출시형, GitHub-Flow는 수시 배포형,
# GitLab-Flow는 여기에 스테이징/운영 서버용 환경 브랜치를 더한 절충형이다`,note:"출시 일정 없이 계속 배포하는 서비스라면 Git-Flow의 5종 브랜치는 과하다. GitHub-Flow는 main을 항상 배포 가능하게 지키는 대신 모든 변경이 Pull Request의 코드 리뷰를 거치게 해 품질을 확보한다. SKALA 팀 프로젝트에서 가장 먼저 써 보게 될 전략이다."},{title:"fetch → diff → merge: 합치기 전에 눈으로 확인하는 안전 동기화",lang:"bash",code:`# pull은 '받기+합치기'를 한 번에 해서 편하지만, 무엇이 합쳐질지 모른 채 덮어쓴다
# 심화: 받기만 하고(fetch) → 비교해 보고(diff) → 그때 합치는(merge) 3단계 안전 동기화
git fetch origin                   # 1) 원격의 새 커밋을 내려받기만 한다(내 작업 파일은 그대로)
git diff HEAD origin/main          # 2) 내 최신 커밋과 원격 main의 차이를 +/- 로 비교
# 예상 출력:
#   +팀원이 추가한 줄     <- 병합하면 내 코드에 들어올 내용이 미리 보인다
git merge origin/main              # 3) 내용을 확인하고 안전하다고 판단되면 그때 병합
# 정리: git pull origin main = fetch + merge 를 한 번에 실행하는 축약형이다
# 발표 직전처럼 민감한 시점에는 fetch로 먼저 살펴보고 합치는 습관이 사고를 막는다`,note:"fetch는 원격 이력만 가져오고 내 파일은 건드리지 않으므로 언제 실행해도 안전하다. pull이 fetch+merge의 축약이라는 구조를 이해하면, 큰 변경이 예상될 때 중간에서 diff로 검문하는 프로 습관을 들일 수 있다."},{title:"push가 거절될 때 — --force 대신 --force-with-lease 안전장치",lang:"bash",code:`# push는 원격에 '내가 모르는 새 커밋'이 있으면 데이터 보호를 위해 거절된다
git push origin main
# ! [rejected]  main -> main (fetch first)   <- 거절 메시지 예시

# 해법 1(정석): 원격 최신을 먼저 받아 합치고 다시 올린다
git pull origin main               # 남이 올린 커밋을 내 것과 병합
git push origin main               # 이제 정상적으로 올라간다

# 해법 2(예외 상황): 원격을 내 로컬 상태로 강제로 덮어써야 할 때
git push --force origin feature-branch
# --force 는 그 사이 팀원이 올린 커밋까지 통째로 지워버릴 수 있다(매우 주의)

git push --force-with-lease origin feature-branch
# --force-with-lease: 내가 마지막으로 확인한 원격 상태 그대로면 강제 push 허용,
# 그새 누군가 새 커밋을 올렸다면 거부하는 '안전장치 달린' 강제 push

# 팀 안전수칙: 공유 브랜치(main, develop)에는 강제 push 자체를 금지하는 것이 보통이다`,note:"강제 push는 원격 역사를 지우는 유일한 명령이라 협업 사고의 단골 원인이다. 꼭 써야 한다면 --force 대신, 남의 새 커밋이 감지되면 스스로 멈추는 --force-with-lease를 기본기로 삼자."},{title:"commit -am의 함정 — 새 파일(Untracked)은 -a가 못 담는다",lang:"bash",code:`# git commit -am 은 add와 commit을 한 번에 처리하는 단축 명령 — 단, '아는 파일'만 담는다
echo "수정된 내용" >> index.html    # index.html 은 이미 커밋한 적 있는 Tracked 파일
echo "새 메모" > memo.txt          # memo.txt 는 한 번도 add 한 적 없는 Untracked 새 파일
git commit -am "수정사항 저장"      # -a 옵션은 Tracked 파일만 자동으로 add 한다
git status                         # 결과를 확인해 보면...
# Untracked files:
#   memo.txt        <- 새 파일은 커밋에서 빠져 있다!
git add memo.txt                   # 새 파일은 반드시 add 로 '추적 시작'을 먼저 알려야 한다
git commit -m "메모 파일 추가"      # 이 커밋 이후부터는 memo.txt 도 -am 으로 처리된다

# 파일의 신분 정리(Git이 파일을 보는 눈):
#  Untracked = 한 번도 관리한 적 없는 새 파일 -> 내용이 바뀌어도 기록되지 않음
#  Tracked   = add 된 적 있는 관리 대상 -> Unmodified / Modified / Staged 3단계를 순환`,note:"-am만 믿고 커밋했다가 새 파일이 GitHub에 안 올라가 있는 것은 왕초보가 가장 자주 겪는 사고다. -a는 Tracked 파일의 수정만 자동 스테이징하므로, 새 파일을 만들었다면 git status로 Untracked 목록을 확인하고 add부터 하는 습관이 필요하다."},{title:"README를 체크해 만든 원격 저장소와 로컬 합치기 — pull --rebase",lang:"bash",code:`# 상황: 로컬에서 git init 으로 프로젝트를 시작했는데,
# GitHub에서 저장소를 만들 때 'Add a README' 를 체크했다
# -> 원격에도 별개의 첫 커밋(README)이 생겨 두 역사가 서로 어긋난다
git remote add origin https://github.com/내계정/skala-intro.git   # 원격 연결
git push -u origin main            # 올려 보면...
# ! [rejected] ... (fetch first)   <- 양쪽에 서로 모르는 커밋이 있어 거절됨

git pull origin main --rebase      # 원격 커밋(README)을 먼저 깔고, 그 위에 내 커밋을 다시 쌓는다
# rebase = 내 커밋을 잠시 들어냈다가 원격 최신 위로 '옮겨 심기'
# merge 와 달리 병합 커밋 없이 역사가 한 줄로 깔끔하게 정리된다

git log --oneline                  # README 커밋 -> 내 커밋 순서의 한 줄 역사 확인
git push -u origin main            # 이제 거절 없이 올라간다

# 예방책: 로컬에 이미 프로젝트가 있다면
# GitHub 저장소는 README 체크 없이 '빈 저장소'로 만드는 것이 정석이다`,note:"저장소 생성 화면에서 무심코 README를 체크하면 첫 push부터 거절당하는, 교육 첫날 단골 사고다. 이때 필요한 pull --rebase는 원격 이력 위에 내 커밋을 옮겨 심어 한 줄 역사로 만드는 명령으로, merge와의 차이를 체감하는 첫 rebase 실습이기도 하다."},{title:"AI 코딩 맛보기 — Codex CLI 설치하고 /init부터 코드 리뷰까지",lang:"bash",code:`# 1) 실습용 폴더를 만들고 안으로 이동한다
mkdir codex-intro && cd codex-intro

# 2) AI 코딩 도구(Codex CLI)를 전역으로 설치한다 (Node.js는 환경 스크립트로 이미 설치됨)
npm install -g @openai/codex

# 3) 설치가 됐는지 버전을 출력해 확인한다
codex --version

# 4) 실행하면 최초 1회 로그인(인증)을 진행한다
codex

# 5) 대화창에서 /init 를 입력하면 지침서 성격의 AGENTS.md 파일이 만들어진다
#    (/명령어는 업데이트가 잦으니 사용 전에 그때그때 목록을 확인한다)

# 6) 자연어 요청을 순서대로 던지며 AI 코딩의 기본 흐름을 체험한다
#    "python3.11 기반에서 Hello World가 출력되는 프로그램을 만들어 줘"  ← 코드 생성
#    "방금 만든 프로그램 코드를 설명해 줘"                             ← 코드 이해
#    "코드 리뷰를 진행해 줘"                                           ← 개선점 찾기
#    "테스트를 진행해 줘"                                              ← 동작 검증`,note:"생성→이해→리뷰→테스트 순서는 사람이 코드를 다루는 순서와 같아서, AI에게도 같은 순서로 시키면 결과를 검증하며 안전하게 쓸 수 있다. /init이 만든 AGENTS.md에 프로젝트 규칙을 적어 두면 이후 요청마다 자동으로 반영된다."},{title:"바이브 코딩 첫 프로젝트 — 페이지 생성, Live Server 확인, GitHub 게시까지",lang:"text",code:`1. 터미널에서 작업 폴더를 만들고 VS Code를 연다.
   (cd → mkdir skala-workspace → cd skala-workspace → mkdir skala-intro → cd skala-intro → code .)
2. AI 채팅에 "index.html을 생성하고 SKALA 소개 페이지를 만들어 줘"라고 요청한다.
3. 이어서 ".gitignore 파일을 만들고 .env는 git이 관리하지 않게 해 줘"라고 요청한다.
   (API 키가 담길 .env는 프로젝트 시작 단계부터 추적 제외 - 실수 커밋 예방)
4. Extensions 메뉴에서 Live Server 확장 플러그인을 설치한다.
5. 우측 하단 Go Live를 누르면 브라우저에 페이지가 뜬다.
   (서비스를 중단하려면 우측 하단 Port:5500 부근을 클릭한다)
6. Source Control에서 Initialize Repository 버튼을 누른다. (= git init)
7. 커밋 후 게시 단계에서 Private Repository 쪽을 선택해 GitHub에 올린다.
8. AI에게 "뉴스레터 페이지를 하나 더 만들어 줘"라고 요청해 페이지를 추가한다.
9. 커밋하고 동기화(Sync)를 누른 뒤, GitHub 웹에서 새 페이지가 올라갔는지 확인한다.`,note:"AI로 코드를 만들고, Live Server로 눈으로 확인하고, GitHub에 게시하는 왕복이 바이브 코딩 실습의 한 사이클이다. 3번처럼 .env 제외를 첫 커밋 전에 걸어 두는 습관이 비밀키 유출 사고를 원천 차단한다."},{title:"GitHub 인증 — PAT 토큰 만들기와 더 쉬운 gh auth login",lang:"bash",code:`# GitHub는 push할 때 계정 비밀번호를 받지 않는다 - 토큰(PAT)이 비밀번호 역할을 한다

# 1) 토큰 만들기 (웹에서 진행)
#    GitHub 로그인 → 우상단 프로필 → Settings → Developer settings
#    → Personal access tokens → Tokens (classic) → Generate new token
#    Note(이름)와 Expiration(만료 기간)을 정하고,
#    private 저장소에 접근하려면 repo 권한을 반드시 체크한다
#    → 생성된 토큰은 딱 한 번만 보이므로 즉시 안전한 곳에 복사해 둔다

# 2) push할 때 비밀번호 칸에 PAT를 붙여넣는다
git push origin main
# Username: your-github-id
# Password: (계정 비밀번호가 아니라 방금 만든 PAT를 붙여넣기)
# macOS 키체인에 저장되어 다음부터는 자동 인증된다

# 3) 더 쉬운 대안 - GitHub CLI의 브라우저 인증(권장)
gh auth login

# 보안 규칙 두 가지
#  - API 키·토큰·비밀번호는 절대 커밋하지 않는다 (.env는 .gitignore에 등록)
#  - 실수로 올렸다면 파일만 지우고 끝내지 말고, 즉시 그 키를 폐기하고 재발급한다`,note:"Password 칸에 계정 비밀번호를 넣어 실패하는 것이 왕초보가 가장 자주 겪는 인증 오류다. 토큰 발급이 번거롭다면 gh auth login 한 줄로 브라우저 인증을 끝내는 쪽이 실수도 적고 안전하다."}],concepts:[{term:"버전관리(Version Control)",desc:"파일을 고칠 때마다 '저장 시점'을 사진처럼 찍어 두어, 언제든 과거로 되돌리고 누가 무엇을 바꿨는지 알 수 있게 해 주는 기술이다."},{term:"저장소(Repository)",desc:"프로젝트 파일들과 그 변경 역사 전체를 함께 보관하는 상자 같은 폴더로, .git 이라는 숨은 폴더에 모든 기록이 담긴다."},{term:"커밋(Commit)",desc:"지금까지의 변경을 '여기서 한 묶음으로 저장' 하는 행동이자 그렇게 만들어진 저장 시점으로, 게임의 세이브 포인트에 해당한다."},{term:"스테이징(Staging) / add",desc:"커밋에 포함할 변경만 골라 장바구니에 담는 단계로, `git add` 로 담은 것만 다음 커밋에 들어간다."},{term:"브랜치(Branch)",desc:"메인 작업을 건드리지 않고 따로 실험할 수 있는 평행 세계 같은 작업 가지로, 완성되면 다시 본류에 합칠 수 있다."},{term:"머지(Merge)와 충돌(Conflict)",desc:"서로 다른 브랜치의 변경을 하나로 합치는 것이 머지이고, 같은 줄을 둘이 다르게 고쳐 Git 이 자동으로 못 합칠 때 생기는 것이 충돌이다."},{term:"원격 저장소(Remote)와 GitHub",desc:"내 컴퓨터(로컬) 밖 인터넷에 있는 저장소가 원격이고, 가장 널리 쓰는 원격 호스팅 서비스가 GitHub 으로 팀이 같은 코드를 공유하는 중앙 창고 역할을 한다."},{term:"프론트엔드 vs 백엔드",desc:"사용자가 직접 보고 누르는 화면 쪽이 프론트엔드, 그 뒤에서 데이터를 저장·계산해 돌려주는 서버 쪽이 백엔드다. 식당에 비유하면 홀(프론트)과 주방(백엔드)에 해당한다."},{term:"VS Code Source Control(소스 제어)",desc:"터미널 명령을 외우지 않아도 VS Code 왼쪽 가지 모양 아이콘에서 변경 파일 목록을 보고 +로 stage, 메시지를 입력한 뒤 체크로 commit 할 수 있는 그래픽 방식의 Git 사용 창이다."},{term:"SSH 키(공개키/개인키)",desc:"내 컴퓨터에 개인키, GitHub에 공개키를 한 쌍으로 두어 매번 비밀번호를 치지 않고도 '나'임을 안전하게 증명하는 자물쇠-열쇠 방식이다."},{term:"Sync Changes(동기화)",desc:"내 커밋을 원격으로 올리고(push) 남의 변경을 받아오는(pull) 두 작업을 VS Code에서 버튼 하나로 처리하는 것이다."}],detail:{topics:[{h:"오전 · 프로그래밍 개요와 개발환경 구축",items:["프로그래밍이란: 코드→실행 과정 한눈에 이해","Frontend vs Backend와 API로 주고받는 관계","기초 IT 용어: 서버·클라이언트·API·라이브러리·프레임워크","VS Code 설치·한국어/필수 확장·Workspace(작업폴더) 열기","Git 설치 확인(git --version)과 이름·이메일 설정"]},{h:"오전 · 팀빌딩으로 협업 기반 다지기",items:["OT: 과정 목표·일정·평가 방식 공유와 강사/동료 자기소개","아이스브레이킹: 공통점 찾기·MBTI 라운드 등 가벼운 활동으로 긴장 풀기","팀 구성: 4~5인 팀 편성과 팀명·슬로건으로 팀 정체성 만들기","역할 정하기: 팀장·기록·발표·Git 관리자 등 역할 분담","그라운드룰: 연락 응답 시간·회의 규칙·갈등 해결 방식 합의","협업 목표와 커밋 컨벤션(예: feat/fix/docs) 약속 정하기"]},{h:"오후 · Git 핵심 명령 한 바퀴",items:["설치/설정: git --version, git config(이름·이메일)","시작: git init(새로 만들기) / git clone(가져오기)","기본 흐름: git add → git commit, git status, git log","변경 확인: git diff, .gitignore 로 추적 제외","되돌리기: git restore, git reset --soft, git revert 차이","역사 보기: git log --oneline --graph 로 흐름 읽기"]},{h:"협업 · 브랜치와 GitHub 원격 워크플로",items:["브랜치: git switch -c 로 작업 가지 만들기","합치기: git merge 와 충돌(conflict) 표시 읽는 법","원격 연결: git remote add origin, git push/pull","Pull Request: 변경 제안과 코드리뷰·승인 흐름","동기화: 작업 전 git pull 로 최신화하는 습관","협업 규칙: main 보호·작은 단위 커밋·명확한 메시지","SSH 키 관리: ssh-keygen으로 키 생성 → 공개키를 GitHub에 등록 → ssh -T로 연결 확인","VS Code Source Control 패널로 stage·commit·Sync Changes 하기(터미널 없이)"]}],labs:[{title:"Lab 0. VS Code로 Workspace 만들고 소스 제어 패널로 첫 커밋하기",steps:["폴더를 VS Code로 열어 Workspace로 삼는다.","파일을 하나 새로 만들어 내용을 적고 저장한다.","왼쪽 소스 제어(가지 아이콘) 패널에서 + 로 변경을 stage 한다.","커밋 메시지를 입력하고 체크(commit) 버튼을 눌러 터미널 없이 첫 커밋을 만든다.","커밋 이력이 소스 제어 패널에 남는지 확인한다."]},{title:"Lab 1. 내 첫 저장소 만들고 3번 커밋해 역사 만들기",steps:["빈 폴더를 만들고 그 안에서 `git init` 을 실행한다.","`hello.txt` 파일을 만들어 '첫 줄' 이라고 적고 `git add hello.txt` → `git commit -m \"first\"` 로 1번째 커밋을 만든다.","hello.txt 에 '둘째 줄' 을 추가하고 다시 add → commit 으로 2번째 커밋을 만든다.","한 번 더 내용을 고치고 3번째 커밋을 만든 뒤 `git log --oneline` 을 실행한다.","커밋 3개가 위에서부터 최신순으로 나열되는지 눈으로 확인한다. (각 줄 앞 7자리 영문/숫자가 커밋 번호다)"]},{title:"Lab 2. .gitignore 로 추적 안 할 파일 걸러내기",steps:["저장소 안에 `secret.txt` 와 `log.tmp` 두 파일을 만든다.","`.gitignore` 파일을 만들고 그 안에 `*.tmp` 와 `secret.txt` 두 줄을 적는다.","`git status` 를 실행해 secret.txt 와 log.tmp 가 더 이상 'Untracked' 목록에 안 보이는지 확인한다.","`.gitignore` 자체는 `git add .gitignore` → commit 으로 저장한다.","왜 비밀번호·임시파일을 추적에서 빼야 하는지 팀원과 한 문장으로 정리해 본다."]},{title:"Lab 3. 브랜치에서 작업하고 main 으로 머지하기",steps:["`git switch -c feature/title` 로 새 브랜치를 만들며 이동한다.","README.md 의 제목을 바꾸고 add → commit 한다.","`git switch main` 으로 본류로 돌아온 뒤 `git merge feature/title` 을 실행한다.","충돌 메시지 없이 'Fast-forward' 또는 머지 완료가 뜨는지 확인한다.","`git log --oneline --graph` 로 브랜치가 main 에 합쳐진 모습을 확인한다."]},{title:"Lab 4. 잘못한 작업 되돌리기 — restore·reset·revert 직접 비교",steps:["note.txt 를 만들고 '1번 줄' 을 적어 add → commit 으로 기준 커밋을 만든다.","note.txt 를 엉뚱한 내용으로 덮어쓴 뒤 `git diff` 로 무엇이 바뀌었는지(+/-) 확인하고, `git restore note.txt` 로 편집을 취소해 원래대로 돌아오는지 본다.","note.txt 에 '2번 줄' 을 추가해 커밋한 뒤, 메시지가 마음에 안 든다고 가정하고 `git reset --soft HEAD~1` 로 커밋만 무른다. 파일 내용은 그대로 남고 스테이지에 다시 올라와 있는지 `git status` 로 확인한 뒤, 메시지를 고쳐 다시 커밋한다.","`git log --oneline` 으로 취소하고 싶은 과거 커밋의 7자리 번호를 확인하고, `git revert 그번호` 를 실행해 '되돌리는 새 커밋' 이 하나 더 쌓이는지 본다.","reset 은 역사를 지우고 revert 는 역사를 남긴다는 차이를, '이미 GitHub에 올린 커밋이라면 왜 revert 를 써야 하는지' 한 문장으로 팀원과 정리한다."]}],homework:["오늘 만든 팀 저장소에 본인 이름의 브랜치로 자기소개 파일(introduce_이름.md)을 추가하고 Pull Request 를 열어 팀원 1명의 리뷰 승인을 받아 머지하기.","오늘 쓴 Git 명령 8개 이상을 '명령 — 한 줄 뜻 — 내가 직접 친 예시' 형태의 나만의 치트시트(cheatsheet.md)로 정리해 저장소에 커밋하기."]},theory:{theory:[{h:"코드가 도는 두 무대: Frontend와 Backend, 그리고 개발환경",body:`프로그램은 결국 '사람이 보는 화면(프론트엔드)'과 '뒤에서 데이터를 다루는 서버(백엔드)'가 짝을 이뤄 돌아간다.
웹페이지의 버튼·색·배치는 프론트엔드가 맡고, 로그인 확인·글 저장 같은 처리는 백엔드가 맡으며, 둘은 API라는 약속된 창구로 서로 대화한다.

이런 코드를 짜려면 먼저 '개발환경'이 필요하다.
코드를 쓰는 편집기(VS Code), 버전을 관리하는 Git, 그리고 이 둘을 담아 둘 작업폴더(Workspace)가 그것이다.
오늘 오전에는 VS Code를 설치·실행하고 폴더 하나를 Workspace로 열어, 앞으로 모든 실습이 이 한 폴더 안에서 이뤄지도록 기지를 세운다.`},{h:"버전관리가 왜 필요할까: '최종_진짜최종_v3' 의 비극",body:`보고서를 쓰다 보면 '최종.docx', '최종_진짜.docx', '최종_진짜최종_v3.docx' 처럼 파일이 끝없이 늘어난 경험이 있을 것이다.
어느 게 진짜 최신인지, 어제 지운 그 문단이 어느 파일에 있었는지 알 수 없어 결국 시간을 낭비하게 된다.
버전관리는 이런 혼란을 없애 준다.
파일 이름은 그대로 두고, 대신 '저장 시점(커밋)'마다 변경 내용을 차곡차곡 기록해 둔다.

그래서 언제든 '3일 전 그 상태로 되돌려 줘' 가 가능하고, '이 줄을 누가 왜 바꿨지?' 도 한 줄로 확인할 수 있다.
혼자 할 때도 든든하지만, 여러 명이 같은 프로젝트를 만질 때 진가가 드러난다.`},{h:"Git 의 3단계 영역: 작업공간 → 스테이지 → 저장소",body:"Git 을 처음 배우면 add 와 commit 이 왜 둘로 나뉘는지 헷갈린다.\n쇼핑에 비유하면 쉽다.\n내 폴더에서 파일을 고치는 것은 '매장에서 물건을 둘러보는' 작업공간 단계다.\n그중 살 것만 장바구니에 담는 것이 `git add`(스테이징)이고, 계산대에서 결제해 영수증을 받는 것이 `git commit` 이다.\n\n이렇게 두 단계로 나눈 덕분에, 고친 여러 파일 중 '이번 커밋에는 이것만' 골라 담는 정교한 저장이 가능하다.\n`git status` 는 지금 무엇이 작업공간에 있고 무엇이 장바구니에 담겼는지 알려 주는 안내판이다."},{h:"브랜치와 협업: 평행 세계에서 따로 만들고 나중에 합친다",body:`여러 사람이 같은 파일을 동시에 고치면 서로 덮어써서 작업이 사라지기 쉽다.
브랜치는 이 문제를 '평행 세계'로 푼다.
각자 자기 브랜치라는 복사된 세계에서 마음껏 작업하고, 본류(main)는 안전하게 보존한다.
작업이 끝나면 머지로 본류에 합치는데, 서로 다른 줄을 고쳤다면 Git 이 알아서 합쳐 준다.

문제는 같은 줄을 둘이 다르게 고쳤을 때인데, 이때 Git 은 '둘 중 뭐가 맞는지 나는 모르니 사람이 정해라' 하며 충돌을 알린다.
충돌은 사고가 아니라 정상적인 협업 과정이며, 표시된 구간을 보고 최종본을 직접 정리해 주면 된다.`},{h:"HTTPS와 SSH: 원격에 나를 증명하는 두 방법",body:`GitHub에 코드를 올릴 때 매번 아이디와 토큰을 입력하는 방식이 HTTPS라면, SSH는 한 번 열쇠(키)를 만들어 GitHub에 등록해 두면 이후로는 비밀번호 없이 자동으로 인증되는 방식이다.
\`ssh-keygen\` 명령으로 내 컴퓨터에 개인키(비밀)와 공개키(공유용) 한 쌍을 만들고, 이 중 공개키만 GitHub 설정의 SSH Keys에 붙여 넣는다.

핵심은 개인키는 절대 남에게 주거나 저장소에 올리지 않는다는 점이다.
공개키는 자물쇠, 개인키는 그 자물쇠를 여는 유일한 열쇠라고 생각하면, 왜 개인키를 내 컴퓨터 밖으로 내보내면 안 되는지 이해된다.`},{h:"꼭 알아야 할 IT 용어 5개: 서버·클라이언트·API·라이브러리·프레임워크",body:`1교시 OT에서는 앞으로 계속 나올 다섯 단어를 먼저 몸에 익힌다.

첫째, '클라이언트'는 요청하는 쪽(내 브라우저·앱)이고 '서버'는 그 요청을 받아 처리해 답을 돌려주는 쪽이다. 카페로 치면 주문하는 손님이 클라이언트, 주문을 받아 커피를 만드는 주방이 서버다.
둘째, 'API'는 그 둘이 주고받는 '주문서 양식'이다. '아메리카노 한 잔' 처럼 정해진 형식으로 요청하면 서버가 알아듣고 정해진 형식으로 답을 준다. 형식이 약속돼 있어 서로 다른 회사가 만든 프로그램끼리도 대화가 된다.
셋째, '라이브러리'는 남이 미리 만들어 둔 '부품 상자'다. 날짜 계산·표 그리기 같은 흔한 기능을 직접 짜지 않고 가져다 쓴다. 내가 필요할 때 골라 부르는, 즉 '내가 주인'인 도구다.
넷째, '프레임워크'는 아예 집의 골조가 세워진 '조립식 뼈대'다. 정해진 자리에 내 코드를 끼워 넣는 방식이라 규칙은 프레임워크가 정하고 나는 그 안을 채운다. 라이브러리는 내가 부르고, 프레임워크는 나를 부른다는 차이로 기억하면 된다.

이 다섯 단어는 오늘 배울 Git 자체보다 앞으로의 모든 실습에서 계속 등장한다. 지금 정확한 그림을 잡아 두면 뒤 과목이 훨씬 수월해진다.`},{h:"무엇이 바뀌었나(diff)와 되돌리기 3형제(restore·reset·revert)",body:"5교시의 핵심은 '내가 방금 무엇을 바꿨는지 확인하고, 잘못했으면 안전하게 되돌리는' 능력이다.\n\n먼저 확인이다. `git diff`는 '고쳤지만 아직 add 하지 않은' 변경을, `git diff --staged`는 '장바구니에 담긴' 변경을 보여 준다. 커밋하기 전 이 두 명령으로 '내가 넣으려는 게 정말 이게 맞나'를 눈으로 검토하는 습관이 사고를 막는다. 줄 앞의 `+`는 추가된 줄, `-`는 지워진 줄이다.\n\n되돌리기는 상황에 따라 도구가 다르다. 헷갈리는 이유는 '어느 단계로 되돌릴지'가 다르기 때문이다.\n첫째 `git restore 파일`은 아직 add 안 한 편집을 통째로 버리고 마지막 커밋 상태로 되돌린다. '방금 고친 거 없던 일로'다. (되살릴 수 없으니 주의)\n둘째 `git reset --soft HEAD~1`은 방금 한 커밋만 취소해 다시 스테이지 상태로 되돌린다. 파일 내용은 그대로 두고 '커밋만 무르기'라, 커밋 메시지를 잘못 썼거나 파일을 덜 담았을 때 쓴다.\n셋째 `git revert 커밋번호`는 과거 커밋을 '없애지 않고', 그 변경을 정확히 반대로 되돌리는 새 커밋을 하나 더 쌓는다. 이미 GitHub에 올려 남들과 공유한 역사는 지우면 안 되므로, 공유된 커밋을 취소할 때는 reset이 아니라 반드시 revert를 쓴다.\n\n한 줄 요약: 아직 커밋 전이면 restore, 내 컴퓨터에만 있는 커밋이면 reset, 이미 공유한 커밋이면 revert."},{h:"clone·fetch·pull·push: 원격과 내 컴퓨터를 맞추는 네 동작",body:"7교시는 GitHub(원격)와 내 컴퓨터(로컬)를 오가며 여럿이 같은 저장소를 안전하게 쓰는 방법이다. 네 동작의 방향만 잡으면 전부 정리된다.\n\n`git clone 주소`는 원격 저장소를 통째로 내 컴퓨터에 처음 복제해 오는 것이다. 팀 프로젝트에 새로 합류하면 가장 먼저 하는 동작으로, 이력까지 전부 함께 내려온다. (init은 빈 방을 새로 짓는 것, clone은 이미 있는 방을 통째로 복사해 오는 것)\n`git push`는 내 커밋을 원격으로 '올리는' 위쪽 방향이다.\n`git pull`은 원격의 새 커밋을 내 것으로 '내려받아 합치는' 아래쪽 방향이다. 사실 pull은 두 동작의 합인데, 원격 변경을 가져오는 `git fetch`와, 그것을 내 브랜치에 합치는 `git merge`를 한 번에 해 준다.\n`git fetch`는 '가져오되 아직 합치지는 않는' 신중한 버전이라, 남의 변경을 먼저 확인만 하고 싶을 때 쓴다.\n\n협업에서 가장 중요한 습관은 순서다: 작업을 시작하기 전 항상 `git pull`로 최신 상태를 먼저 받고, 작업이 끝나면 커밋한 뒤 `git push`로 올린다. 이 '내려받고 → 작업 → 올리기' 순서를 지키지 않고 남보다 오래된 상태에서 push를 시도하면 거절당하는데, 이때는 당황하지 말고 pull로 최신을 먼저 합친 뒤 다시 push하면 된다. VS Code의 Sync Changes 버튼은 바로 이 pull과 push를 한 번에 눌러 주는 편의 기능이다."},{h:"Pull Request: 바로 합치지 않고 '리뷰받고 합치는' 협업 관문",body:"8교시 마지막 주제인 Pull Request(PR)는 실무 협업의 심장이다. 앞에서 배운 merge는 '내가 직접' 브랜치를 합치는 것이지만, 팀에서는 본류(main)를 아무나 바로 고치지 못하게 막아 두고, 대신 '이 변경을 합쳐 주세요' 하고 정식으로 요청하는 절차를 둔다. 그 요청서가 바로 Pull Request다.\n\n흐름은 이렇다. ①먼저 `git switch -c feature/기능`으로 내 작업 브랜치를 만들어 거기서 커밋하고 `git push origin feature/기능`으로 올린다. ②GitHub에 가면 'Compare & pull request' 버튼이 뜨는데, 이를 눌러 '무엇을·왜 바꿨는지' 설명을 적어 PR을 연다. ③팀원은 PR 화면에서 바뀐 코드를 줄 단위로 살펴보며 댓글로 질문하거나 수정을 제안한다(코드리뷰). ④리뷰어가 Approve(승인)하면 'Merge' 버튼으로 본류에 합쳐지고, 다 쓴 작업 브랜치는 삭제한다. ⑤합쳐진 뒤에는 각자 `git pull`로 최신 main을 받아 다음 작업을 시작한다.\n\n이 관문을 두는 이유는 셋이다. 첫째, 합치기 전에 최소 한 명이 코드를 확인하니 실수와 버그를 걸러 낸다. 둘째, '왜 이렇게 바꿨는지'가 PR에 기록으로 남아 나중에 근거를 추적할 수 있다. 셋째, main을 보호해 누구도 실수로 전체 프로젝트를 망가뜨리지 못하게 한다. 오늘 과제인 '자기소개 파일 PR 열고 리뷰 승인받아 머지'가 바로 이 전 과정을 한 바퀴 도는 연습이다."}]},realCodes:[{title:"Git 첫 저장소부터 GitHub push 까지 한 번에 따라하기",lang:"bash",code:`# 1) Git 설치 확인: 버전이 출력되면 정상 설치된 것
git --version                      # 예상 출력: git version 2.43.0

# 2) 커밋에 기록될 내 이름/이메일 등록(--global 은 이 컴퓨터 전체 기본값)
git config --global user.name "홍길동"        # 커밋 작성자 이름
git config --global user.email "me@team.com" # 커밋 작성자 이메일

# 3) 새 프로젝트 폴더를 만들고 그 안으로 이동
mkdir team-project                 # team-project 라는 폴더 생성
cd team-project                    # 방금 만든 폴더 안으로 들어감

# 4) 이 폴더를 Git 저장소로 초기화(.git 숨은 폴더가 생김)
git init                           # 출력: Initialized empty Git repository ...

# 5) README 파일을 하나 만들어 첫 내용 작성
echo "# 우리팀 프로젝트" > README.md  # README.md 에 제목 한 줄 기록

# 6) 변경을 장바구니(스테이지)에 담고 커밋(영수증)으로 저장
git add README.md                  # README.md 를 다음 커밋 대상으로 담음
git commit -m "docs: 프로젝트 소개 추가"  # -m 뒤는 커밋 메시지(무엇을 했는지)

# 7) GitHub 에서 만든 빈 저장소를 'origin' 이라는 별명의 원격으로 연결
git remote add origin https://github.com/team/team-project.git

# 8) 기본 브랜치 이름을 main 으로 맞추고 인터넷으로 업로드
git branch -M main                 # 현재 브랜치 이름을 main 으로 변경
git push -u origin main            # origin 의 main 으로 첫 업로드(-u 는 연결 기억)

# 9) 잘 올라갔는지 역사 확인(한 줄 요약 + 그래프)
git log --oneline --graph          # 예: * a1b2c3d (HEAD -> main) docs: 프로젝트 소개 추가`,note:`이 한 장이면 '내 컴퓨터에서 저장 → GitHub 로 공유' 까지의 기본 왕복이 끝난다.
실무에서도 새 프로젝트를 시작할 때 거의 이 순서 그대로 진행한다.`},{title:"브랜치 만들기 → 충돌 일으키기 → 충돌 해결하기 전체 흐름",lang:"bash",code:`# (시작 상태) main 에 menu.txt 가 있고 "커피" 한 줄이 들어 있다고 가정

# 1) 내 작업용 브랜치를 만들면서 그쪽으로 이동(-c 는 create)
git switch -c feature/add-tea      # feature/add-tea 가지를 만들고 그 위로 이동

# 2) menu.txt 의 첫 줄을 "녹차" 로 바꿔 커밋
echo "녹차" > menu.txt              # 파일 내용을 녹차로 덮어씀
git commit -am "feat: 메뉴를 녹차로 변경"  # -a 는 추적중 파일 자동 add, -m 은 메시지

# 3) 다시 main 으로 돌아가서, 같은 첫 줄을 "홍차" 로 바꿔 커밋
git switch main                    # 본류 main 으로 이동
echo "홍차" > menu.txt              # 같은 줄을 다른 값(홍차)으로 변경
git commit -am "feat: 메뉴를 홍차로 변경"  # main 쪽에도 커밋 생성

# 4) main 에 feature 브랜치를 합치려 하면 같은 줄이라 충돌 발생
git merge feature/add-tea          # 출력: CONFLICT (content): Merge conflict in menu.txt

# 5) menu.txt 를 열면 아래처럼 표시되어 있다(직접 편집해서 정리)
#   <<<<<<< HEAD
#   홍차        ← 현재 main 의 내용
#   =======
#   녹차        ← 합치려는 feature 의 내용
#   >>>>>>> feature/add-tea
#   → 표시줄 3개를 지우고 최종 내용(예: "녹차, 홍차")만 남긴다

# 6) 정리한 파일을 다시 담고 커밋하면 충돌 해결 완료
git add menu.txt                   # 해결한 파일을 스테이지에 담아 '해결됨' 표시
git commit -m "merge: 녹차/홍차 충돌 해결"  # 머지 커밋으로 마무리

# 7) 합쳐진 역사 확인
git log --oneline --graph          # 두 갈래가 한 점으로 합쳐진 그래프가 보임`,note:`충돌은 같은 줄을 서로 다르게 고쳤을 때만 난다는 점을 직접 만들어 보며 익히는 코드다.
표시줄(<<<<<<<, =======, >>>>>>>)을 반드시 지우는 것이 핵심이다.`}],periods:["OT · 프로그래밍 개요(Frontend vs Backend · IT 용어)","개발환경 구축: VS Code 설치 · Workspace · Git 설정","Git 기초 개념 + VS Code Source Control","Git 기초 명령어: init·add·commit·status·log",".gitignore · diff · 커밋 되돌리기","Remote Repository 이해 + GitHub 설정 · SSH 키 관리","원격 사용법: clone·push·pull · Sync Changes","(심화) 브랜치 · 머지 · 충돌 · PR 협업"]}};export{t as default};
