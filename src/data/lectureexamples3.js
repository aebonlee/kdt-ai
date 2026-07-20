// 자료 그라운딩 실습예제 — SKALA 4기 교육생 교재·종합실습 가이드·3기 교재에 근거해
// 실제 실습/코드를 우리말로 재서술(왕초보·전 라인 한글 주석). 코드 주석은 사이트에서 녹색으로 표기됨.
// scripts/merge-additions.mjs 가 자동 병합 생성 (subjectId-day 키 → examplesFor 에 합쳐짐).
export const examplesExtra3 = {
  "git-1": [
    {
      "title": "강사 제공 — 맥북 개발환경 일괄 설치 스크립트 사용법과 핵심 구조",
      "lang": "bash",
      "code": "# SKALA 첫날 배포되는 skala-config-setup.sh — 한 번 실행으로 과정 전체 환경을 구성한다\nchmod +x skala-config-setup.sh    # 실행 권한 부여(최초 1회)\n./skala-config-setup.sh           # 실행 — 관리자 비밀번호 1회 입력(입력해도 화면엔 안 보임, 정상)\n\n# ── 스크립트가 설치해 주는 것들 ─────────────────────────\n# Homebrew(맥 패키지 관리자) → 이후 모든 설치의 토대\n# git · wget · curl · tree · jq   ← 오늘(Git 수업)부터 바로 사용\n# Java(temurin 21)               ← Spring AI 과목 대비\n# Python 3.11                    ← 데이터분석·LLM 과목 대비\n# Node + yarn/pnpm/typescript    ← Vue.js 과목 대비\n# PostgreSQL 17 · Docker Desktop ← DB·서빙 과목 대비\n# VS Code + 확장 · iTerm2 · awscli · kubectl\n\n# ── 왕초보를 배려한 설계 3가지(스크립트를 읽어보면 보인다) ──\n# 1) 실패해도 멈추지 않는다: 실패 항목은 모아뒀다가 마지막에 한꺼번에 보고\n# 2) 여러 번 실행해도 안전(idempotent): 이미 설치된 항목은 알아서 건너뜀\n# 3) 마무리 안내까지 출력: 예) \"Docker Desktop은 한 번 실행해야 docker 명령이 동작\"\n\n# 설치가 끝나면 아래로 확인한다(버전이 나오면 성공)\ngit --version && node --version && python3.11 --version",
      "note": "개발환경은 손으로 하나씩 깔면 사람마다 상태가 달라져 수업 내내 발목을 잡는다. 일괄 스크립트는 \"누가 실행해도 같은 환경\"을 보장하며, 실패 항목만 마지막 보고에서 확인해 개별 해결하면 된다. 스크립트 자체도 bash 학습 자료다 — try 함수(실패 기록 후 계속)와 중복 실행 안전 처리 패턴을 눈여겨보자."
    },
    {
      "title": "IT 용어 한 장 — 화면 기획 용어(웹 프로젝트 전 과정에서 쓰임)",
      "lang": "text",
      "code": "# 화면을 만들 때 팀이 공통으로 쓰는 용어 — 순서대로 구체화된다\nWireframe   : 화면의 뼈대만 그린 설계도 (색·폰트·이미지 없이 배치만)\nMockup      : 와이어프레임에 실제 디자인(색·글꼴·아이콘)을 입힌 정적 시안\nPrototype   : 클릭하면 화면이 넘어가는 '동작하는' 시제품 (흐름 검증용)\nPersona     : 우리 서비스를 쓸 가상의 대표 사용자 모델\n\nUI  : 사용자가 보는 인터페이스 그 자체 (버튼·레이아웃·색·글꼴)\nUX  : 사용하며 느끼는 경험의 총합 (UI보다 큰 개념)\n\nGNB : Global Navigation Bar — 전체 서비스 공통 상단 메뉴\nLNB : Local Navigation Bar — 특정 영역 안의 세부 메뉴\nInformation Architecture : 메뉴·페이지·콘텐츠의 전체 구조 설계\nDesign System : 일관된 UI를 위한 설계 체계(색·컴포넌트 규칙)\n\n# 기억법: 뼈대(Wireframe) → 옷(Mockup) → 움직임(Prototype) 순서로 구체화",
      "note": "이 용어들은 웹 서비스 mini-Project(설계·와이어프레임)와 캡스톤 발표에서 그대로 쓰인다. 특히 Wireframe→Mockup→Prototype의 구체화 단계와 GNB/LNB는 기획 회의에서 매일 나오는 말이므로 첫날에 정리해 두면 팀 소통이 빨라진다."
    },
    {
      "title": "맨 처음 한 번만 하는 Git 사용자 설정 (config)",
      "lang": "bash",
      "code": "# 1) 커밋에 남길 내 이름을 전역(--global)으로 등록한다(모든 저장소 공통)\ngit config --global user.name \"홍길동\"\n# 2) 이메일은 GitHub 계정 이메일과 똑같이 맞춘다(잔디·작성자 매칭)\ngit config --global user.email \"me@team.com\"\n# 3) 새 저장소의 기본 브랜치 이름을 master 대신 main 으로 지정\ngit config --global init.defaultBranch main\n# 4) 커밋 메시지 편집기로 VS Code 사용(--wait: 창 닫을 때까지 기다림)\ngit config --global core.editor \"code --wait\"\n# 5) 지금까지 설정한 값 전체를 확인\ngit config --list\n# 6) 값 하나만 콕 집어 확인\ngit config user.name       # 출력: 홍길동",
      "note": "이 설정은 컴퓨터마다 딱 한 번만 하면 이후 모든 저장소에 자동 적용된다. user.email 을 GitHub 이메일과 맞춰야 커밋 작성자가 내 계정으로 인식된다."
    },
    {
      "title": "init → 브랜치 → merge → 충돌 해결까지 한 흐름으로",
      "lang": "bash",
      "code": "# (준비) 새 폴더를 Git 저장소로 초기화(.git 숨김폴더가 생김)\ngit init                              # 현재 폴더를 로컬 저장소로 만듦\necho \"메인 제목\" > index.html          # 첫 파일 작성\ngit add index.html                    # 스테이지에 담고\ngit commit -m \"init: 첫 페이지\"        # main 브랜치에 첫 커밋\n\n# 1) 기능 작업용 브랜치를 만들고 그 자리로 이동(-c = 생성+전환 한 번에)\ngit switch -c feature-login           # feature-login 으로 갈라져 나옴\necho \"로그인 제목\" > index.html         # 같은 줄을 다르게 수정\ngit commit -am \"feat: 로그인 제목\"      # 브랜치에 커밋\n\n# 2) main 으로 돌아와 같은 줄을 또 다르게 수정(충돌 유발)\ngit switch main                       # 기준 브랜치로 복귀\necho \"홈 제목\" > index.html\ngit commit -am \"feat: 홈 제목\"\n\n# 3) feature 를 main 으로 합치기 → 같은 줄이라 충돌 발생\ngit merge feature-login               # CONFLICT (content): index.html\n# 파일을 열면 <<<<<<< HEAD / ======= / >>>>>>> feature-login 표식이 보임\n# 표식 3줄을 지우고 최종 내용을 손으로 정한 뒤 저장한다\n\n# 4) 해결했음을 알리고 병합 커밋을 완성한다\ngit add index.html                    # 해결된 파일을 다시 스테이지에\ngit commit -m \"merge: 제목 충돌 해결\"  # 병합 마무리",
      "note": "두 브랜치가 같은 줄을 다르게 고치면 Git이 자동 병합을 멈추고 충돌 표식을 넣는다. 표식을 지우고 add·commit 을 다시 해야 병합이 끝난다 — 협업에서 반드시 겪는 과정이다."
    },
    {
      "title": "Git이 무시할 파일 목록 .gitignore 만들기",
      "lang": "bash",
      "code": "# 아래 내용을 프로젝트 루트에 '.gitignore' 파일로 저장한다\n\n# node_modules : npm install 로 언제든 다시 받는 외부 라이브러리 → 올리지 않음\nnode_modules\n# dist         : 빌드 결과물(npm run build 산출물) → 소스만 관리하면 됨\ndist\n# .env         : API 키·비밀번호가 든 파일 → 절대 업로드 금지(보안)\n.env\n*.local\n# .DS_Store    : macOS 가 자동으로 만드는 잡파일\n.DS_Store\n# 편집기 개인 설정은 무시하되, 공유용 확장 목록만 예외로 남긴다\n.vscode/*\n!.vscode/extensions.json",
      "note": "비밀키·빌드결과·라이브러리 폴더는 커밋하지 않는 것이 원칙이다. 단, 이미 커밋된 파일은 .gitignore 만으로 빠지지 않으니 git rm --cached <파일> 로 추적을 먼저 끊어야 한다."
    },
    {
      "title": "커밋 전 실수 구조대 — stash 임시보관과 --amend 고쳐쓰기",
      "lang": "bash",
      "code": "# 상황 1: 커밋을 안 했는데 다른 브랜치로 가야 할 때 — stash(임시 서랍)\ngit stash                          # 작업 중 변경을 임시 서랍에 넣고 폴더를 깨끗하게\ngit stash list                     # 서랍 목록 확인 (stash@{0} 이 방금 넣은 것)\ngit switch main                    # 이제 변경 없이 자유롭게 브랜치 이동 가능\ngit switch feature-greeting        # 원래 작업하던 브랜치로 복귀\ngit stash pop                      # 서랍에서 꺼내 이어서 작업 (목록에서도 제거)\n\n# 상황 2: 방금 커밋 메시지에 오타 — amend(마지막 커밋 고쳐쓰기)\ngit commit -m \"로긴 버튼 색상 변경\"              # 앗, '로긴' 오타!\ngit commit --amend -m \"로그인 버튼 색상 변경\"    # 마지막 커밋을 새 메시지로 교체\ngit log --oneline -1               # 메시지가 바뀌었는지 확인\n\n# 상황 3: add 를 빠뜨리고 커밋했을 때 — 파일까지 함께 amend\necho \"빠뜨린 내용\" >> hello.txt     # 커밋에 안 들어간 수정이 남아 있다\ngit add hello.txt                  # 빠뜨린 파일을 스테이징하고\ngit commit --amend --no-edit       # 메시지는 그대로, 파일만 마지막 커밋에 합치기\n\n# 주의: --amend 는 이미 push 한 커밋에는 금지 (기록이 바뀌어 팀원과 어긋난다)",
      "note": "김성영 실습교수의 Git 종합실습 가이드 중 \"자주 하는 실수 & 해결법\" 코너를 손으로 따라 하는 실습으로 옮겼다. 커밋 안 하고 브랜치를 옮기려다 막히거나, 메시지 오타·add 누락을 발견하는 왕초보의 3대 사고를 stash 와 --amend 두 도구로 수습하는 법을 익힌다. push 이후에는 amend 를 쓰면 안 된다는 안전수칙까지가 한 세트다."
    },
    {
      "title": "완성 프로젝트를 새 브랜치로 GitHub에 올리기 + push 오류 처방전",
      "lang": "bash",
      "code": "# 완성한 프로젝트 폴더를 통째로 '새 브랜치'에 담아 원격에 올리는 8단계\ncd ~/Desktop/my-project            # 1) 프로젝트 폴더로 이동\ngit status                         # 2) 상태 확인 (\"not a git repository\" 면 git init 먼저)\ngit switch -c html_js_css          # 3) 새 브랜치 생성과 동시에 이동 (-c = create)\ngit add .                          # 4) 프로젝트 전체를 스테이징\ngit commit -m \"Complete HTML JS CSS project\"   # 5) 커밋 생성\ngit remote -v                      # 6) 원격 연결 확인 (아무것도 안 나오면 아래로)\ngit remote add origin https://github.com/내계정/data.git   # 7) 원격 최초 연결\n\n# \"remote origin already exists\" 오류가 나면 add 대신 주소만 교체\ngit remote set-url origin https://github.com/내계정/data.git\n\ngit push -u origin html_js_css     # 8) 새 브랜치를 원격에 업로드 (-u: 다음부턴 git push 만)\n# 성공 메시지: * [new branch] html_js_css -> html_js_css\n\n# 자주 만나는 push 오류 처방전\n# \"Authentication failed\"        → 비밀번호 대신 Personal Access Token(PAT) 입력\n# \"failed to push some refs\"     → git pull --rebase origin html_js_css 후 다시 push\n# \"src refspec ... not match\"    → 커밋이 아직 없다는 뜻, add · commit 먼저\n# GitHub 웹에서 브랜치 메뉴 → html_js_css 선택 → 파일이 보이면 최종 성공",
      "note": "김성영 실습교수 가이드의 \"종합실습 2 — 완성 프로젝트를 새 브랜치로 GitHub에 올리기\" 8단계 시나리오를 재구성했다. main 이 아닌 작업 브랜치를 push -u 로 올리는 흐름과, 초보가 반드시 한 번은 만나는 push 오류 4종의 원인별 해결 명령을 처방전 형식으로 붙였다. 오류 메시지를 보고 겁먹지 않고 대응하는 것이 이 실습의 진짜 목표다."
    },
    {
      "title": "Git-Flow 전략 — 브랜치 5종으로 개발부터 출시까지 흉내내기",
      "lang": "bash",
      "code": "# Git-Flow: 역할별 브랜치 5종으로 개발-출시를 체계화하는 협업 규칙\n# main=배포된 안정 버전 / develop=다음 출시 준비의 중심 / feature=기능 / release=출시 준비 / hotfix=긴급 수정\ngit switch -c develop              # 1) main에서 develop 분기(모든 개발의 기준점)\ngit switch -c feature/login        # 2) 기능 브랜치는 develop에서 갈라진다\necho \"로그인 폼\" > login.html       # 기능 개발 작업(파일 생성)\ngit add . && git commit -m \"feat: 로그인 폼\"   # 기능 커밋\ngit switch develop                 # 3) 기능 완료 후 develop으로 복귀\ngit merge feature/login            #    develop에 병합(원본 main은 아직 안전)\ngit branch -d feature/login        #    역할이 끝난 기능 브랜치는 삭제\ngit switch -c release/1.0          # 4) 출시 준비: develop에서 release 분기(QA와 버그수정 전용)\ngit switch main                    # 5) 출시 확정 시 main으로 이동해\ngit merge release/1.0              #    release를 main에 병합(=v1.0 출시)\ngit switch develop                 #    같은 내용을 develop에도 병합해 두 브랜치를 맞춘다\ngit merge release/1.0\n# 6) 배포 후 긴급 버그 발견 → hotfix는 develop이 아니라 main에서 바로 분기\ngit switch main\ngit switch -c hotfix/1.0.1         # 급한 불을 끄고, 수정본을 main과 develop 양쪽에 병합하는 것까지가 규칙",
      "note": "브랜치 전략은 여러 명이 한 저장소를 쓸 때 언제 브랜치를 만들고 어디로 합칠지 정한 팀 규칙이다. Git-Flow는 v1.0, v2.0처럼 출시 주기가 명확한 제품에 맞는 대표 전략으로, feature는 develop에서 나와 develop으로, release와 hotfix는 main과 develop 양쪽으로 합쳐진다는 이동 경로만 기억하면 그림이 그려진다."
    },
    {
      "title": "GitHub-Flow — main과 feature 둘로 끝내는 수시 배포 전략과 Pull Request",
      "lang": "bash",
      "code": "# GitHub-Flow: 브랜치는 main과 feature 딱 두 종류 — 하루에도 몇 번씩 배포하는 웹 서비스용\n# 규칙 1: main은 언제나 오류 없이 '즉시 배포 가능한' 상태를 유지한다\ngit switch main                    # 기준 브랜치로 이동\ngit pull origin main               # 항상 최신 main에서 출발한다\ngit switch -c feature/search-box   # 규칙 2: 작업은 main에서 바로 분기한 feature 브랜치에서\necho \"검색창\" > search.html         # 기능 개발\ngit add . && git commit -m \"feat: 검색창 추가\"   # 커밋\ngit push -u origin feature/search-box   # 규칙 3: 작업 브랜치를 원격에 올린다\n# 규칙 4: GitHub 웹에서 Pull Request(PR)를 연다\n#   PR = \"내가 작업한 브랜치를 검토하고 main에 합쳐 달라\"는 공식 요청\n#   동료의 코드 리뷰와 자동 테스트를 통과해야 병합된다\n# 규칙 5: PR이 main에 병합되면 곧바로 서버에 자동 배포(CI/CD)\ngit switch main                    # 병합이 끝나면 로컬 정리 시작\ngit pull origin main               # 내 기능이 합쳐진 최신 main을 받고\ngit branch -d feature/search-box   # 역할이 끝난 브랜치는 삭제\n# 비교: Git-Flow는 정기 출시형, GitHub-Flow는 수시 배포형,\n# GitLab-Flow는 여기에 스테이징/운영 서버용 환경 브랜치를 더한 절충형이다",
      "note": "출시 일정 없이 계속 배포하는 서비스라면 Git-Flow의 5종 브랜치는 과하다. GitHub-Flow는 main을 항상 배포 가능하게 지키는 대신 모든 변경이 Pull Request의 코드 리뷰를 거치게 해 품질을 확보한다. SKALA 팀 프로젝트에서 가장 먼저 써 보게 될 전략이다."
    },
    {
      "title": "fetch → diff → merge: 합치기 전에 눈으로 확인하는 안전 동기화",
      "lang": "bash",
      "code": "# pull은 '받기+합치기'를 한 번에 해서 편하지만, 무엇이 합쳐질지 모른 채 덮어쓴다\n# 심화: 받기만 하고(fetch) → 비교해 보고(diff) → 그때 합치는(merge) 3단계 안전 동기화\ngit fetch origin                   # 1) 원격의 새 커밋을 내려받기만 한다(내 작업 파일은 그대로)\ngit diff HEAD origin/main          # 2) 내 최신 커밋과 원격 main의 차이를 +/- 로 비교\n# 예상 출력:\n#   +팀원이 추가한 줄     <- 병합하면 내 코드에 들어올 내용이 미리 보인다\ngit merge origin/main              # 3) 내용을 확인하고 안전하다고 판단되면 그때 병합\n# 정리: git pull origin main = fetch + merge 를 한 번에 실행하는 축약형이다\n# 발표 직전처럼 민감한 시점에는 fetch로 먼저 살펴보고 합치는 습관이 사고를 막는다",
      "note": "fetch는 원격 이력만 가져오고 내 파일은 건드리지 않으므로 언제 실행해도 안전하다. pull이 fetch+merge의 축약이라는 구조를 이해하면, 큰 변경이 예상될 때 중간에서 diff로 검문하는 프로 습관을 들일 수 있다."
    },
    {
      "title": "push가 거절될 때 — --force 대신 --force-with-lease 안전장치",
      "lang": "bash",
      "code": "# push는 원격에 '내가 모르는 새 커밋'이 있으면 데이터 보호를 위해 거절된다\ngit push origin main\n# ! [rejected]  main -> main (fetch first)   <- 거절 메시지 예시\n\n# 해법 1(정석): 원격 최신을 먼저 받아 합치고 다시 올린다\ngit pull origin main               # 남이 올린 커밋을 내 것과 병합\ngit push origin main               # 이제 정상적으로 올라간다\n\n# 해법 2(예외 상황): 원격을 내 로컬 상태로 강제로 덮어써야 할 때\ngit push --force origin feature-branch\n# --force 는 그 사이 팀원이 올린 커밋까지 통째로 지워버릴 수 있다(매우 주의)\n\ngit push --force-with-lease origin feature-branch\n# --force-with-lease: 내가 마지막으로 확인한 원격 상태 그대로면 강제 push 허용,\n# 그새 누군가 새 커밋을 올렸다면 거부하는 '안전장치 달린' 강제 push\n\n# 팀 안전수칙: 공유 브랜치(main, develop)에는 강제 push 자체를 금지하는 것이 보통이다",
      "note": "강제 push는 원격 역사를 지우는 유일한 명령이라 협업 사고의 단골 원인이다. 꼭 써야 한다면 --force 대신, 남의 새 커밋이 감지되면 스스로 멈추는 --force-with-lease를 기본기로 삼자."
    },
    {
      "title": "commit -am의 함정 — 새 파일(Untracked)은 -a가 못 담는다",
      "lang": "bash",
      "code": "# git commit -am 은 add와 commit을 한 번에 처리하는 단축 명령 — 단, '아는 파일'만 담는다\necho \"수정된 내용\" >> index.html    # index.html 은 이미 커밋한 적 있는 Tracked 파일\necho \"새 메모\" > memo.txt          # memo.txt 는 한 번도 add 한 적 없는 Untracked 새 파일\ngit commit -am \"수정사항 저장\"      # -a 옵션은 Tracked 파일만 자동으로 add 한다\ngit status                         # 결과를 확인해 보면...\n# Untracked files:\n#   memo.txt        <- 새 파일은 커밋에서 빠져 있다!\ngit add memo.txt                   # 새 파일은 반드시 add 로 '추적 시작'을 먼저 알려야 한다\ngit commit -m \"메모 파일 추가\"      # 이 커밋 이후부터는 memo.txt 도 -am 으로 처리된다\n\n# 파일의 신분 정리(Git이 파일을 보는 눈):\n#  Untracked = 한 번도 관리한 적 없는 새 파일 -> 내용이 바뀌어도 기록되지 않음\n#  Tracked   = add 된 적 있는 관리 대상 -> Unmodified / Modified / Staged 3단계를 순환",
      "note": "-am만 믿고 커밋했다가 새 파일이 GitHub에 안 올라가 있는 것은 왕초보가 가장 자주 겪는 사고다. -a는 Tracked 파일의 수정만 자동 스테이징하므로, 새 파일을 만들었다면 git status로 Untracked 목록을 확인하고 add부터 하는 습관이 필요하다."
    },
    {
      "title": "README를 체크해 만든 원격 저장소와 로컬 합치기 — pull --rebase",
      "lang": "bash",
      "code": "# 상황: 로컬에서 git init 으로 프로젝트를 시작했는데,\n# GitHub에서 저장소를 만들 때 'Add a README' 를 체크했다\n# -> 원격에도 별개의 첫 커밋(README)이 생겨 두 역사가 서로 어긋난다\ngit remote add origin https://github.com/내계정/skala-intro.git   # 원격 연결\ngit push -u origin main            # 올려 보면...\n# ! [rejected] ... (fetch first)   <- 양쪽에 서로 모르는 커밋이 있어 거절됨\n\ngit pull origin main --rebase      # 원격 커밋(README)을 먼저 깔고, 그 위에 내 커밋을 다시 쌓는다\n# rebase = 내 커밋을 잠시 들어냈다가 원격 최신 위로 '옮겨 심기'\n# merge 와 달리 병합 커밋 없이 역사가 한 줄로 깔끔하게 정리된다\n\ngit log --oneline                  # README 커밋 -> 내 커밋 순서의 한 줄 역사 확인\ngit push -u origin main            # 이제 거절 없이 올라간다\n\n# 예방책: 로컬에 이미 프로젝트가 있다면\n# GitHub 저장소는 README 체크 없이 '빈 저장소'로 만드는 것이 정석이다",
      "note": "저장소 생성 화면에서 무심코 README를 체크하면 첫 push부터 거절당하는, 교육 첫날 단골 사고다. 이때 필요한 pull --rebase는 원격 이력 위에 내 커밋을 옮겨 심어 한 줄 역사로 만드는 명령으로, merge와의 차이를 체감하는 첫 rebase 실습이기도 하다."
    },
    {
      "title": "AI 코딩 맛보기 — Codex CLI 설치하고 /init부터 코드 리뷰까지",
      "lang": "bash",
      "code": "# 1) 실습용 폴더를 만들고 안으로 이동한다\nmkdir codex-intro && cd codex-intro\n\n# 2) AI 코딩 도구(Codex CLI)를 전역으로 설치한다 (Node.js는 환경 스크립트로 이미 설치됨)\nnpm install -g @openai/codex\n\n# 3) 설치가 됐는지 버전을 출력해 확인한다\ncodex --version\n\n# 4) 실행하면 최초 1회 로그인(인증)을 진행한다\ncodex\n\n# 5) 대화창에서 /init 를 입력하면 지침서 성격의 AGENTS.md 파일이 만들어진다\n#    (/명령어는 업데이트가 잦으니 사용 전에 그때그때 목록을 확인한다)\n\n# 6) 자연어 요청을 순서대로 던지며 AI 코딩의 기본 흐름을 체험한다\n#    \"python3.11 기반에서 Hello World가 출력되는 프로그램을 만들어 줘\"  ← 코드 생성\n#    \"방금 만든 프로그램 코드를 설명해 줘\"                             ← 코드 이해\n#    \"코드 리뷰를 진행해 줘\"                                           ← 개선점 찾기\n#    \"테스트를 진행해 줘\"                                              ← 동작 검증",
      "note": "생성→이해→리뷰→테스트 순서는 사람이 코드를 다루는 순서와 같아서, AI에게도 같은 순서로 시키면 결과를 검증하며 안전하게 쓸 수 있다. /init이 만든 AGENTS.md에 프로젝트 규칙을 적어 두면 이후 요청마다 자동으로 반영된다."
    },
    {
      "title": "바이브 코딩 첫 프로젝트 — 페이지 생성, Live Server 확인, GitHub 게시까지",
      "lang": "text",
      "code": "1. 터미널에서 작업 폴더를 만들고 VS Code를 연다.\n   (cd → mkdir skala-workspace → cd skala-workspace → mkdir skala-intro → cd skala-intro → code .)\n2. AI 채팅에 \"index.html을 생성하고 SKALA 소개 페이지를 만들어 줘\"라고 요청한다.\n3. 이어서 \".gitignore 파일을 만들고 .env는 git이 관리하지 않게 해 줘\"라고 요청한다.\n   (API 키가 담길 .env는 프로젝트 시작 단계부터 추적 제외 - 실수 커밋 예방)\n4. Extensions 메뉴에서 Live Server 확장 플러그인을 설치한다.\n5. 우측 하단 Go Live를 누르면 브라우저에 페이지가 뜬다.\n   (서비스를 중단하려면 우측 하단 Port:5500 부근을 클릭한다)\n6. Source Control에서 Initialize Repository 버튼을 누른다. (= git init)\n7. 커밋 후 게시 단계에서 Private Repository 쪽을 선택해 GitHub에 올린다.\n8. AI에게 \"뉴스레터 페이지를 하나 더 만들어 줘\"라고 요청해 페이지를 추가한다.\n9. 커밋하고 동기화(Sync)를 누른 뒤, GitHub 웹에서 새 페이지가 올라갔는지 확인한다.",
      "note": "AI로 코드를 만들고, Live Server로 눈으로 확인하고, GitHub에 게시하는 왕복이 바이브 코딩 실습의 한 사이클이다. 3번처럼 .env 제외를 첫 커밋 전에 걸어 두는 습관이 비밀키 유출 사고를 원천 차단한다."
    },
    {
      "title": "GitHub 인증 — PAT 토큰 만들기와 더 쉬운 gh auth login",
      "lang": "bash",
      "code": "# GitHub는 push할 때 계정 비밀번호를 받지 않는다 - 토큰(PAT)이 비밀번호 역할을 한다\n\n# 1) 토큰 만들기 (웹에서 진행)\n#    GitHub 로그인 → 우상단 프로필 → Settings → Developer settings\n#    → Personal access tokens → Tokens (classic) → Generate new token\n#    Note(이름)와 Expiration(만료 기간)을 정하고,\n#    private 저장소에 접근하려면 repo 권한을 반드시 체크한다\n#    → 생성된 토큰은 딱 한 번만 보이므로 즉시 안전한 곳에 복사해 둔다\n\n# 2) push할 때 비밀번호 칸에 PAT를 붙여넣는다\ngit push origin main\n# Username: your-github-id\n# Password: (계정 비밀번호가 아니라 방금 만든 PAT를 붙여넣기)\n# macOS 키체인에 저장되어 다음부터는 자동 인증된다\n\n# 3) 더 쉬운 대안 - GitHub CLI의 브라우저 인증(권장)\ngh auth login\n\n# 보안 규칙 두 가지\n#  - API 키·토큰·비밀번호는 절대 커밋하지 않는다 (.env는 .gitignore에 등록)\n#  - 실수로 올렸다면 파일만 지우고 끝내지 말고, 즉시 그 키를 폐기하고 재발급한다",
      "note": "Password 칸에 계정 비밀번호를 넣어 실패하는 것이 왕초보가 가장 자주 겪는 인증 오류다. 토큰 발급이 번거롭다면 gh auth login 한 줄로 브라우저 인증을 끝내는 쪽이 실수도 적고 안전하다."
    }
  ],
  "vue-1": [
    {
      "title": "v-bind 클래스 바인딩 — 상태에 따라 스타일 켜고 끄기",
      "lang": "vue",
      "code": "<script setup>\n// 반응형 값을 만드는 ref 를 가져온다\nimport { ref } from 'vue'\n// 활성화 여부(참이면 active 클래스가 붙음)\nconst isActive = ref(true)\n// 에러 여부(참이면 빨간 경고 스타일)\nconst hasError = ref(false)\n</script>\n\n<template>\n  <!-- 객체 구문: 값이 true 인 클래스만 실제로 적용된다 -->\n  <p :class=\"{ active: isActive, danger: hasError }\">상태에 따라 색이 바뀝니다</p>\n  <!-- 배열 구문: 기본 클래스 + 삼항으로 상황별 클래스를 함께 건다 -->\n  <p :class=\"['box', isActive ? 'on' : 'off']\">항상 box, 그리고 on/off 토글</p>\n  <!-- 버튼으로 상태를 뒤집어 실시간 변화를 확인 -->\n  <button @click=\"isActive = !isActive\">active 토글</button>\n  <button @click=\"hasError = !hasError\">error 토글</button>\n</template>\n\n<style scoped>\n.active { color: blue; font-weight: bold; } /* active 붙으면 파란색 */\n.danger { background: #ffd6d6; }            /* danger 붙으면 빨간 배경 */\n.box { padding: 8px; }\n</style>",
      "note": ":class 객체 구문은 조건이 true 인 클래스만 붙이고, 배열 구문은 기본 클래스와 조건부 클래스를 함께 건다. CSS 를 직접 토글하지 않고 데이터로 스타일을 제어하는 것이 핵심이다."
    },
    {
      "title": "폼 요소마다 다른 v-model — 체크박스·라디오·셀렉트",
      "lang": "vue",
      "code": "<script setup>\nimport { ref } from 'vue'                 // 반응형 변수 도구\nconst agree = ref(false)                  // 단일 체크박스 → true/false\nconst fruits = ref([])                    // 여러 체크박스 → 고른 value 가 배열로 쌓임\nconst gender = ref('')                    // 라디오 → 고른 값 하나\nconst city = ref('seoul')                 // 셀렉트 → 선택한 option 값\n</script>\n\n<template>\n  <!-- 단일 체크박스: 담기는 값은 true/false -->\n  <label><input type=\"checkbox\" v-model=\"agree\" /> 약관 동의</label>\n\n  <!-- 같은 배열에 묶인 체크박스: 체크한 value 들이 배열에 모인다 -->\n  <label><input type=\"checkbox\" value=\"사과\" v-model=\"fruits\" /> 사과</label>\n  <label><input type=\"checkbox\" value=\"바나나\" v-model=\"fruits\" /> 바나나</label>\n\n  <!-- 라디오: 같은 v-model 을 공유하면 하나만 선택된다 -->\n  <label><input type=\"radio\" value=\"남\" v-model=\"gender\" /> 남</label>\n  <label><input type=\"radio\" value=\"여\" v-model=\"gender\" /> 여</label>\n\n  <!-- 셀렉트: 고른 option 의 value 가 city 에 들어간다 -->\n  <select v-model=\"city\">\n    <option value=\"seoul\">서울</option>\n    <option value=\"busan\">부산</option>\n  </select>\n\n  <!-- 선택 결과를 실시간 확인 -->\n  <p>동의:{{ agree }} / 과일:{{ fruits }} / 성별:{{ gender }} / 도시:{{ city }}</p>\n</template>",
      "note": "같은 v-model 이라도 요소에 따라 담기는 값이 다르다 — 단일 체크박스는 불리언, 여러 체크박스는 배열, 라디오·셀렉트는 고른 값 하나다."
    },
    {
      "title": "이벤트 수식어 — .prevent 로 기본동작 막고 .stop 으로 전파 막기",
      "lang": "vue",
      "code": "<script setup>\nimport { ref } from 'vue'\nconst log = ref('아직 클릭 전')                      // 무슨 일이 일어났는지 기록\nfunction goLink() { log.value = '페이지 이동을 막고 함수만 실행됨' }\nfunction outer() { log.value = '바깥 상자 클릭' }\nfunction inner() { log.value = '안쪽 버튼만 클릭(바깥으로 안 번짐)' }\n</script>\n\n<template>\n  <!-- .prevent : a 태그의 기본 페이지 이동을 취소하고 함수만 실행 -->\n  <a href=\"https://naver.com\" @click.prevent=\"goLink\">이동 대신 함수 실행</a>\n\n  <!-- 바깥 div 클릭 시 outer 실행 -->\n  <div @click=\"outer\" style=\"padding:20px; background:#eee\">\n    바깥 영역\n    <!-- .stop : 클릭이 바깥 div 까지 번지는 것(버블링)을 차단 -->\n    <button @click.stop=\"inner\">나만 반응하는 버튼</button>\n  </div>\n\n  <p>{{ log }}</p>\n</template>",
      "note": ".prevent 는 링크·폼 제출 같은 브라우저 기본동작을 막고, .stop 은 안쪽 클릭이 바깥 요소까지 전파되는 것을 막는다. 수식어를 붙이면 함수 안에서 preventDefault·stopPropagation 을 직접 부를 필요가 없다."
    },
    {
      "title": "reactive() 로 객체 상태 묶어 관리하기 — 재할당 금지 주의",
      "lang": "vue",
      "code": "<script setup>\n// 객체·배열을 통째로 반응형으로 만드는 reactive 를 가져온다\nimport { reactive } from 'vue'\n// 이름과 나이를 한 덩어리로 묶은 반응형 객체(스크립트에서 .value 불필요)\nconst user = reactive({ name: '이순신', age: 30 })\n// 버튼 클릭 시 나이만 1 올리는 함수\nfunction birthday() {\n  user.age++   // 알맹이 속성만 바꾸면 화면이 자동으로 갱신된다\n}\n// (주의) user = { name: '홍길동', age: 0 } 처럼 통째로 재할당하면\n// 반응형 연결이 끊어져 화면이 더 이상 갱신되지 않는다!\n</script>\n\n<template>\n  <!-- reactive 객체는 템플릿에서도 점 표기로 바로 읽는다 -->\n  <p>이름: {{ user.name }} / 나이: {{ user.age }}세</p>\n  <!-- 클릭할 때마다 나이가 한 살씩 늘어난다 -->\n  <button @click=\"birthday\">나이 한 살 추가</button>\n</template>",
      "note": "ref 는 어떤 값이든 감싸고 .value 로 접근하지만, reactive 는 객체 전용이고 .value 없이 쓴다. 대신 새 객체로 통째 재할당하면 반응성이 끊기는 약점이 있어, 현업에서는 객체도 그냥 ref 로 통일하는 추세가 강하다."
    },
    {
      "title": "v-if vs v-show — 없애서 숨기기 vs 가려서 숨기기",
      "lang": "vue",
      "code": "<script setup>\nimport { ref } from 'vue'   // 반응형 값 도구\nconst open = ref(true)      // 열림/닫힘 상태(두 상자가 공유)\n</script>\n\n<template>\n  <!-- 클릭할 때마다 참/거짓이 뒤집힌다 -->\n  <button @click=\"open = !open\">토글 (현재: {{ open }})</button>\n\n  <!-- v-if: 거짓이면 태그 자체를 DOM 에서 없애 버린다(개발자도구에서 사라짐) -->\n  <p v-if=\"open\">v-if 상자 — 조건이 거짓이면 아예 존재하지 않음</p>\n\n  <!-- v-show: 태그는 그대로 두고 CSS display:none 으로 눈에만 숨긴다 -->\n  <p v-show=\"open\">v-show 상자 — 숨겨져도 DOM 에는 남아 있음</p>\n</template>",
      "note": "v-if 는 처음에 거짓이면 아예 그리지 않아 초기 비용이 낮지만, 바뀔 때마다 태그를 부수고 다시 지어 전환 비용이 크다. 그래서 모달·탭처럼 전환이 잦은 곳은 v-show, 로그인 후 화면처럼 전환이 드문 곳은 v-if 를 쓴다. v-show 는 v-else 조합이 안 된다는 점도 기억하자."
    },
    {
      "title": "toRefs — reactive 객체를 구조분해해도 반응성 지키기",
      "lang": "vue",
      "code": "<script setup>\n// reactive 객체와, 속성을 반응형 그대로 꺼내는 toRefs 를 가져온다\nimport { reactive, toRefs } from 'vue'\n// 도시와 기온을 묶은 반응형 객체\nconst state = reactive({ city: '수원', temp: 24 })\n// (X) const { city, temp } = state → 일반 값 복사라 반응성이 끊긴다\n// (O) toRefs 로 감싸면 모든 속성이 반응형 ref 로 추출된다\nconst { city, temp } = toRefs(state)\n// 꺼낸 뒤에는 ref 이므로 스크립트에서 .value 로 다룬다\nfunction warmer() { temp.value++ }   // 원본 state.temp 도 함께 바뀐다\n</script>\n\n<template>\n  <!-- 추출한 ref 를 바꿔도 원본 객체와 같은 값이 유지된다 -->\n  <p>{{ city }} 기온: {{ temp }}도 (원본 확인: {{ state.temp }}도)</p>\n  <button @click=\"warmer\">기온 +1</button>\n</template>",
      "note": "reactive 객체를 그냥 구조분해하면 반응형 연결이 끊어지는 것이 대표적인 초보 실수다. toRefs 는 모든 속성을, toRef 는 속성 1개만 반응형 ref 로 추출해 이 문제를 해결한다."
    },
    {
      "title": "watch 로 reactive 객체 감시 — 통째 감시 vs 특정 속성 조준",
      "lang": "vue",
      "code": "<script setup>\nimport { reactive, ref, watch } from 'vue'\n// 상품 정보를 묶은 reactive 객체\nconst state = reactive({ name: '노트북', price: 1000 })\nconst log = ref('아직 변동 없음')   // 감시 결과를 보여줄 문구\n\n// 방법1) 객체를 통째로 감시: 내부 어떤 속성이 바뀌어도 실행되지만\n// 새값과 옛값이 같은 객체를 가리켜 '진짜 이전 값'을 알 수 없다\nwatch(state, () => { console.log('내부 어딘가가 바뀜(이전 값 추적 불가)') })\n\n// 방법2) () => state.price 처럼 화살표 함수로 특정 속성만 조준하면\n// 이전 값이 제대로 보존되어 변화 폭까지 계산할 수 있다\nwatch(() => state.price, (newP, oldP) => {\n  log.value = oldP + '원 → ' + newP + '원 (' + (newP - oldP) + '원 변동)'\n})\n</script>\n\n<template>\n  <p>{{ state.name }}: {{ state.price }}원</p>\n  <!-- 버튼을 누르면 두 감시자가 모두 반응한다 -->\n  <button @click=\"state.price += 500\">가격 +500</button>\n  <p>{{ log }}</p>\n</template>",
      "note": "reactive 객체는 변수명을 그대로 넣으면 자동으로 깊은 감시가 되지만 이전 값을 못 쓴다. 객체 안의 특정 속성 변화를 낚아채고 싶으면 반드시 화살표 함수(getter) 형태로 조준해야 옛값·새값 비교가 가능하다."
    }
  ],
  "vue-2": [
    {
      "title": "defineEmits 로 자식이 부모에게 값 올려주기 (Event Up)",
      "lang": "vue",
      "code": "<!-- ===== 자식: CityButton.vue ===== -->\n<script setup>\n// 부모에게 올려보낼 이벤트 이름을 등록한다\nconst emit = defineEmits(['select-city'])\n// 부모가 내려준 도시 이름을 props 로 받는다(Props Down)\nconst props = defineProps({ name: String })\n// 클릭하면 등록한 이벤트를 발사하며 도시 이름을 실어 보낸다\nfunction pick() {\n  emit('select-city', props.name)   // (이벤트명, 함께 보낼 데이터)\n}\n</script>\n<template>\n  <!-- 클릭 → pick 실행 → 부모로 이벤트가 올라간다 -->\n  <button @click=\"pick\">{{ name }}</button>\n</template>\n\n<!-- ===== 부모: App.vue ===== -->\n<script setup>\nimport { ref } from 'vue'\nimport CityButton from './CityButton.vue'\nconst selected = ref('아직 없음')            // 자식이 올려준 값을 담을 상태\n// 자식이 보낸 도시 이름을 받아 상태에 저장\nfunction onSelect(city) { selected.value = city }\n</script>\n<template>\n  <!-- @select-city 로 자식 이벤트를 수신(실려온 값이 인자로 들어옴) -->\n  <CityButton name=\"서울\" @select-city=\"onSelect\" />\n  <CityButton name=\"부산\" @select-city=\"onSelect\" />\n  <p>선택한 도시: {{ selected }}</p>\n</template>",
      "note": "부모→자식은 props(내려주기), 자식→부모는 emit(올려주기)로 통신한다. 자식은 props 를 직접 못 바꾸므로, 바꾸고 싶으면 이벤트로 부모에게 요청한다 — 이것이 단방향 데이터 흐름의 핵심이다."
    },
    {
      "title": "computed 로 계산값 만들기 — method 와 달리 캐싱된다",
      "lang": "vue",
      "code": "<script setup>\nimport { ref, computed } from 'vue'\nconst price = ref(10000)               // 단가\nconst qty = ref(1)                     // 수량\n// computed: 의존하는 값(price·qty)이 바뀔 때만 다시 계산, 아니면 캐시 결과 재사용\nconst total = computed(() => {\n  console.log('계산 실행!')             // 값이 바뀔 때만 콘솔에 찍힘(캐싱 확인)\n  return price.value * qty.value + '원' // 합계 문자열을 돌려준다\n})\n</script>\n\n<template>\n  <!-- total 을 두 번 써도 계산은 한 번만(캐싱) -->\n  <p>합계: {{ total }}</p>\n  <p>다시 표시: {{ total }}</p>\n  <!-- 수량을 바꾸면 total 이 자동으로 다시 계산된다 -->\n  <button @click=\"qty++\">수량 +1 (현재 {{ qty }})</button>\n</template>",
      "note": "computed 는 결과를 기억(캐싱)했다가 의존값이 바뀔 때만 다시 계산한다. 화면에서 여러 번 써도 연산은 한 번뿐이라, 매번 실행되는 일반 함수보다 효율적이다."
    },
    {
      "title": "watch 로 값 변화를 감시해 후속 동작 실행하기",
      "lang": "vue",
      "code": "<script setup>\nimport { ref, watch } from 'vue'\nconst keyword = ref('')                 // 검색어 입력값\nconst status = ref('입력을 기다리는 중') // 안내 문구\n// watch: keyword 가 바뀔 때마다 (새값, 옛값)을 받아 후속 로직 실행\nwatch(keyword, (newVal, oldVal) => {\n  console.log(oldVal, '->', newVal)     // 어떻게 바뀌었는지 로그\n  // 두 글자 이상일 때만 검색 준비(실무에선 여기서 API 를 호출)\n  status.value = newVal.length >= 2 ? '검색 준비 완료' : '두 글자 이상 입력'\n})\n</script>\n\n<template>\n  <!-- 타이핑할 때마다 watch 가 반응해 status 를 갱신 -->\n  <input v-model=\"keyword\" placeholder=\"검색어 입력\" />\n  <p>{{ status }}</p>\n</template>",
      "note": "computed 가 \"값을 계산\"한다면 watch 는 \"값이 바뀐 순간 부수효과(API 호출·로그·검증)\"를 실행한다. 새값·옛값을 둘 다 받아 변화를 비교할 수 있다."
    },
    {
      "title": "슬롯(slot) — 데이터가 아니라 마크업 조각을 주입하기",
      "lang": "vue",
      "code": "<!-- ===== 자식: PanelCard.vue — 레이아웃 틀만 제공한다 ===== -->\n<template>\n  <div class=\"card\">\n    <header>\n      <!-- 이름 있는 슬롯: 부모가 #header 로 보낸 조각이 여기 꽂힌다 -->\n      <slot name=\"header\"></slot>\n    </header>\n    <main>\n      <!-- 이름 없는 기본 슬롯: 나머지 내용이 이 자리에 들어온다 -->\n      <slot>부모가 아무것도 안 주면 보이는 기본 문구</slot>\n    </main>\n  </div>\n</template>\n\n<!-- ===== 부모: 틀 안에 채울 내용을 자유롭게 주입한다 ===== -->\n<template>\n  <PanelCard>\n    <!-- template v-slot:header(축약형 #header)로 꽂을 위치를 지정 -->\n    <template #header>\n      <h2>오늘의 날씨</h2>\n    </template>\n    <!-- 이름을 안 붙인 나머지는 기본 슬롯으로 들어간다 -->\n    <p>맑음, 기온 24도</p>\n  </PanelCard>\n</template>",
      "note": "props 가 부모의 데이터를 주입한다면, 슬롯은 HTML 마크업·레이아웃 조각 자체를 주입한다. 자식의 slot 태그 안에 미리 적어 둔 내용은 부모가 아무것도 안 넘겼을 때 나오는 대체(기본) 콘텐츠다."
    },
    {
      "title": "스코프드 슬롯 — 자식의 데이터를 부모가 받아서 그리기",
      "lang": "vue",
      "code": "<!-- ===== 자식: ServerStatus.vue — 데이터는 자식이 소유한다 ===== -->\n<script setup>\nimport { ref } from 'vue'\nconst message = ref('서버 상태 정상')   // 자식 내부 데이터 1\nconst userCount = ref(150)              // 자식 내부 데이터 2\n</script>\n<template>\n  <!-- slot 태그의 속성 바인딩(:이름=\"변수\")으로 데이터를 부모로 올려 보낸다 -->\n  <slot :text=\"message\" :count=\"userCount\"></slot>\n</template>\n\n<!-- ===== 부모: 자식이 보낸 값을 받아 원하는 모양으로 배치한다 ===== -->\n<template>\n  <!-- v-slot=\"변수주머니이름\" 으로 자식이 보낸 값들을 한 묶음으로 수신 -->\n  <ServerStatus v-slot=\"slotBag\">\n    <!-- 주머니에서 text 와 count 를 꺼내 부모 마음대로 그린다 -->\n    <p>알림 메시지: {{ slotBag.text }}</p>\n    <p>접속자 수: {{ slotBag.count }}명</p>\n  </ServerStatus>\n</template>",
      "note": "일반 슬롯이 부모→자식으로 마크업을 내려보낸다면, 스코프드 슬롯은 반대로 자식의 로컬 데이터를 부모가 받아 화면을 설계한다. 데이터는 자식이 관리하되 보여 주는 모양은 부모가 결정하는 역할 분담 패턴이다."
    },
    {
      "title": "provide / inject — 중간 계층 건너뛰고 깊은 자식에 값 전달",
      "lang": "vue",
      "code": "<!-- ===== 조상: App.vue — 값을 아래로 공급(provide)한다 ===== -->\n<script setup>\nimport { ref, provide } from 'vue'\n// 테마 색을 반응형으로 만들고\nconst themeColor = ref('dark')\n// 'globalTheme' 이라는 키 이름으로 모든 후손에게 공급한다\nprovide('globalTheme', themeColor)\n</script>\n\n<!-- ===== 깊은 자식: 중간 부모를 몇 단계 건너뛰어도 바로 받는다 ===== -->\n<script setup>\nimport { inject } from 'vue'\n// 조상이 provide 한 키 이름을 지정해 직접 주입받는다\nconst theme = inject('globalTheme')\n</script>\n<template>\n  <!-- 조상의 값이 바뀌면 이 문구도 함께 갱신된다(반응형 유지) -->\n  <p>현재 테마: {{ theme }}</p>\n  <!-- 주입받은 ref 라서 여기서 바꾸면 조상 값도 함께 바뀐다 -->\n  <button @click=\"theme = theme === 'dark' ? 'light' : 'dark'\">테마 전환</button>\n</template>",
      "note": "props 를 층층이 릴레이로 내려보내는 번거로움 없이, 조상이 선언한 반응형 상태를 깊은 자식이 키 이름 하나로 바로 받는다. 다만 전역 상태는 Pinia 가 표준이라 provide/inject 의 실무 사용 빈도는 높지 않다는 점도 알아 두자."
    },
    {
      "title": "라이프사이클 훅 총정리 — onUnmounted 로 타이머 청소하기",
      "lang": "vue",
      "code": "<script setup>\n// 부착·갱신·소멸 시점에 실행되는 훅들을 가져온다\nimport { ref, onMounted, onUpdated, onUnmounted } from 'vue'\nconst count = ref(0)   // 1초마다 자동으로 올라갈 숫자\nlet timerId = null     // 타이머 번호(나중에 끌 때 필요)\n\n// [1. 생성] script setup 본문 자체가 생성 단계 — 아직 화면(DOM)에는 접근 불가\nconsole.log('컴포넌트가 메모리에 생성됨')\n// [2. 부착] 화면에 붙은 직후 — API 호출·타이머 시작의 최적 타이밍\nonMounted(() => {\n  timerId = setInterval(() => { count.value++ }, 1000)   // 1초마다 +1\n})\n// [3. 갱신] 데이터가 바뀌어 화면을 다시 그린 직후마다 실행\nonUpdated(() => { console.log('화면 다시 그림, 현재 ' + count.value) })\n// [4. 소멸] v-if 등으로 컴포넌트가 사라질 때 — 타이머를 꼭 꺼서 메모리 누수 방지\nonUnmounted(() => { clearInterval(timerId) })\n</script>\n\n<template>\n  <p>자동 카운트: {{ count }}</p>\n</template>",
      "note": "컴포넌트는 생성 → 부착 → 갱신 → 소멸의 생명주기를 돈다. onMounted 에서 켠 setInterval 을 onUnmounted 에서 안 꺼 주면 컴포넌트가 화면에서 사라져도 타이머가 백그라운드에서 영원히 돌며 메모리가 새는 대표적인 버그가 된다."
    }
  ],
  "vue-3": [
    {
      "title": "동적 경로 파라미터 받기 — /weather/:cityId + useRoute",
      "lang": "vue",
      "code": "<!-- 라우터 등록(src/router/index.js):\n     { path: '/weather/:cityId', component: WeatherDetail }\n     → 주소의 :cityId 자리에 도시 코드가 들어온다(예: /weather/seoul) -->\n<script setup>\n// 현재 활성 경로 정보를 읽는 useRoute 를 가져온다\nimport { useRoute } from 'vue-router'\nimport { ref, onMounted } from 'vue'\nconst route = useRoute()                       // 현재 route 객체 획득\nconst cityId = route.params.cityId             // 주소의 :cityId 값을 꺼낸다\nconst temp = ref(null)                          // 기온을 담을 상태\n\n// 화면이 뜨면 해당 도시 데이터를 불러온다(여기선 예시로 하드코딩)\nonMounted(() => {\n  const db = { seoul: 25, busan: 27 }          // 도시별 기온(예시)\n  temp.value = db[cityId] ?? '정보 없음'         // 없으면 기본 문구\n})\n</script>\n\n<template>\n  <!-- 주소로 넘어온 도시 코드를 그대로 화면에 표시 -->\n  <h2>도시: {{ cityId }}</h2>\n  <p>현재 기온: {{ temp }}도</p>\n</template>",
      "note": "URL 의 일부가 바뀌는 상세 페이지는 :cityId 처럼 동적 구간으로 등록하고, 컴포넌트에서 useRoute().params 로 그 값을 꺼낸다. 하나의 컴포넌트가 여러 도시를 재사용해 처리할 수 있다."
    },
    {
      "title": "코드로 페이지 이동하기 — useRouter.push 와 query",
      "lang": "vue",
      "code": "<script setup>\n// 코드로 페이지를 이동시키는 useRouter 를 가져온다\nimport { useRouter } from 'vue-router'\nimport { ref } from 'vue'\nconst router = useRouter()             // 라우터 조작 객체\nconst keyword = ref('')                // 검색어\n\n// 검색 버튼 클릭 → 결과 화면으로 이동하며 검색어를 query 로 실어 보낸다\nfunction search() {\n  router.push({ path: '/result', query: { q: keyword.value } })\n  // 이동 주소 예: /result?q=날씨  (도착 화면에서 route.query.q 로 꺼냄)\n}\n// 브라우저 뒤로가기와 동일하게 한 단계 뒤로\nfunction goBack() { router.back() }\n</script>\n\n<template>\n  <input v-model=\"keyword\" placeholder=\"검색어\" />\n  <!-- router-link(선언형)와 달리, 조건 검사 뒤 코드로 이동할 때 쓴다 -->\n  <button @click=\"search\">검색 결과로 이동</button>\n  <button @click=\"goBack\">뒤로</button>\n</template>",
      "note": "router-link 가 \"클릭하면 바로 가는 링크\"라면, router.push 는 \"로그인·유효성 검사를 통과했을 때만 이동\" 같은 조건부 이동에 쓰는 명령형 방식이다. query 로 검색어 같은 부가 정보를 함께 넘긴다."
    },
    {
      "title": "storeToRefs — Pinia 값을 꺼내도 반응성이 안 끊기게",
      "lang": "vue",
      "code": "<script setup>\n// 전역 스토어와, 반응성을 지켜 꺼내는 storeToRefs 를 가져온다\nimport { storeToRefs } from 'pinia'\nimport { useCartStore } from '../stores/cart'\n\nconst cart = useCartStore()\n// (X) const { count } = cart  → 반응성이 끊겨 값이 바뀌어도 화면이 안 변함\n// (O) state·getters 는 storeToRefs 로 감싸야 반응형 연결이 유지된다\nconst { count, total } = storeToRefs(cart)\n// 함수(actions)는 반응형 대상이 아니므로 그냥 구조분해해도 된다\nconst { add } = cart\n</script>\n\n<template>\n  <!-- 스토어 값이 바뀌면 이 숫자들도 자동 갱신된다 -->\n  <p>담긴 개수: {{ count }} / 합계: {{ total }}원</p>\n  <!-- 버튼으로 담으면 위 숫자가 즉시 반응 -->\n  <button @click=\"add({ id: 1, name: '사과', price: 3000 })\">사과 담기</button>\n</template>",
      "note": "스토어에서 state·getters 를 그냥 구조분해하면 반응성이 끊긴다. storeToRefs 로 감싸야 값이 바뀔 때 화면이 따라 갱신된다. 반면 actions(함수)는 반응형 대상이 아니라 그대로 꺼내 써도 된다."
    },
    {
      "title": "라우트 지연 로딩(Lazy Loading)과 redirect 설정",
      "lang": "javascript",
      "code": "// src/router/index.js — 필요한 순간에만 코드를 내려받는 지연 로딩\nimport { createRouter, createWebHistory } from 'vue-router'\n// 정적 import: 앱 시작과 동시에 메모리에 올라간다(첫 화면용에 적합)\nimport HomeView from '../views/HomeView.vue'\n\nconst routes = [\n  { path: '/', name: 'home', component: HomeView },\n  // 동적 import: 이 주소에 실제로 들어갈 때에야 파일을 내려받는다\n  // → 첫 로딩이 가벼워져 페이지가 많은 앱의 필수 최적화 기법\n  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },\n  // redirect: 옛 주소로 들어오면 새 주소로 자동으로 돌려보낸다\n  { path: '/home', redirect: '/' },\n]\n\n// createWebHistory: 슬래시(/) 기반의 일반 주소 형태로 URL 을 관리한다\nconst router = createRouter({ history: createWebHistory(), routes })\nexport default router",
      "note": "component 에 컴포넌트를 바로 적으면 정적 로드, () => import(...) 함수로 적으면 방문 시점에 내려받는 지연 로드가 된다. 빌드하면 지연 로드 컴포넌트는 별도 js 파일로 쪼개져, 사용자가 첫 화면을 훨씬 빨리 만나게 된다."
    },
    {
      "title": "push vs replace vs go — 이동 기록을 남길까 말까",
      "lang": "vue",
      "code": "<script setup>\n// 코드로 페이지를 조종하는 useRouter 를 가져온다\nimport { useRouter } from 'vue-router'\nconst router = useRouter()\n\n// push: 방문 기록(History)을 남기며 이동 → 뒤로가기로 돌아올 수 있다\nfunction goDetail() { router.push('/weather/seoul') }\n\n// replace: 기록을 남기지 않고 현재 페이지를 교체\n// → 인증 만료 후 로그인 화면처럼 '뒤로가기로 못 돌아가야 하는' 이동에 쓴다\nfunction forceLogin() { router.replace('/login') }\n\n// go(-1): 브라우저 뒤로가기 버튼과 똑같이 한 단계 이전으로 이동\nfunction goBack() { router.go(-1) }\n</script>\n\n<template>\n  <button @click=\"goDetail\">상세로 이동 (push)</button>\n  <button @click=\"forceLogin\">강제 교체 (replace)</button>\n  <button @click=\"goBack\">이전 화면으로 (go)</button>\n</template>",
      "note": "push 와 replace 의 차이는 오직 '뒤로가기 기록을 남기느냐'다. 로그인 만료로 튕겨낸 화면에 뒤로가기로 다시 돌아오면 곤란하므로 이런 강제 이동에는 replace 를 쓰고, go(-1)/back() 은 브라우저 뒤로가기를 코드로 대신하는 명령이다."
    },
    {
      "title": "Pinia Setup 스토어 — ref·computed 문법 그대로 스토어 만들기",
      "lang": "javascript",
      "code": "// src/stores/counter.js — 컴포넌트에서 쓰던 문법을 그대로 쓰는 Setup 방식\nimport { defineStore } from 'pinia'\nimport { ref, computed } from 'vue'\n\n// 스토어 변수 이름은 use + 파일명 + Store 규칙으로 짓는다\nexport const useCounterStore = defineStore('counter', () => {\n  // ref 로 선언하면 그대로 state(전역 공유 데이터)가 된다\n  const count = ref(0)\n  // computed 로 선언하면 getters(읽기 전용 계산값)가 된다\n  const doubleCount = computed(() => count.value * 2)\n  // 일반 함수로 선언하면 actions(상태 변경·비동기 통신 담당)가 된다\n  function increment() { count.value++ }\n  // return 으로 내보낸 것만 외부 컴포넌트가 쓸 수 있다(외부 개방 API)\n  return { count, doubleCount, increment }\n})\n\n// 사용하는 쪽: const store = useCounterStore()\n// {{ store.count }} / {{ store.doubleCount }} / @click=\"store.increment\"",
      "note": "state/getters/actions 세 칸을 채우는 Options 방식과 결과는 같지만, Setup 방식은 컴포넌트에서 익힌 ref·computed·함수 문법을 그대로 재사용한다. ref=state, computed=getters, function=actions 로 일대일 매핑된다는 것이 핵심이다."
    },
    {
      "title": "전역 설정 스토어 활용 — 온도 단위(℃/℉) 앱 전체 전환",
      "lang": "vue",
      "code": "<script setup>\n// 단위 설정 스토어: state(unit), getters(unitSymbol), actions(toggleUnit)\nimport { computed } from 'vue'\nimport { useConfigStore } from '../stores/configStore'\nconst configStore = useConfigStore()\n// 부모가 내려준 도시 데이터(원본 기온은 항상 섭씨 숫자)\nconst props = defineProps({ cityItem: Object })\n\n// 화면 표시용 기온: 전역 단위 설정에 따라 실시간으로 변환된다\nconst displayTemp = computed(() => {\n  const raw = props.cityItem.temp             // 원본 섭씨 값\n  if (configStore.unit === 'fahrenheit') {\n    return Math.round((raw * 9) / 5 + 32)     // 화씨 변환 공식\n  }\n  return raw                                   // 섭씨면 그대로 반환\n})\n</script>\n\n<template>\n  <!-- 변환된 기온 + 스토어 getter 가 주는 단위 기호(℃/℉) -->\n  <p>{{ cityItem.name }}: {{ displayTemp }}{{ configStore.unitSymbol }}</p>\n  <!-- 어느 컴포넌트에서 눌러도 앱 전체의 표시 단위가 한꺼번에 바뀐다 -->\n  <button @click=\"configStore.toggleUnit\">단위 전환</button>\n</template>",
      "note": "원본 데이터(섭씨)는 그대로 두고, 전역 스토어의 설정값 + computed 조합으로 '보여 주는 값'만 변환하는 것이 포인트다. 스토어 값이 바뀌면 이 computed 를 쓰는 모든 화면이 동시에 갱신되어, 설정 하나로 앱 전체가 일사불란하게 움직인다."
    }
  ],
  "vue-4": [
    {
      "title": "axios.create 로 공통 통신 인스턴스 + 인터셉터 만들기",
      "lang": "javascript",
      "code": "// src/api/http.js : 프로젝트 공통 통신 인스턴스를 한 번 만들어 재사용한다\nimport axios from 'axios'\n\n// 공통 분모(주소·타임아웃)를 미리 박아 커스텀 인스턴스를 뽑아낸다\nconst http = axios.create({\n  baseURL: 'https://api.example.com', // 매번 긴 주소를 안 써도 됨\n  timeout: 5000,                      // 5초 넘으면 실패 처리\n})\n\n// 요청 인터셉터: 모든 요청이 나가기 직전 가로채 토큰을 헤더에 자동으로 붙인다\nhttp.interceptors.request.use((config) => {\n  const token = localStorage.getItem('token')      // 저장된 로그인 토큰\n  if (token) config.headers.Authorization = 'Bearer ' + token\n  return config                                      // config 를 돌려줘야 요청이 진행됨\n})\n\n// 응답 인터셉터: 성공은 data 만 통과, 실패는 공통으로 로그를 남긴다\nhttp.interceptors.response.use(\n  (res) => res.data,                                 // 응답에서 실제 데이터만 반환\n  (err) => { console.error('API 오류:', err.message); return Promise.reject(err) },\n)\n\nexport default http   // 이제 어디서든 import 해 http.get('/users') 로 쓴다",
      "note": "axios.create 로 baseURL·타임아웃을 한 번만 정하고, 인터셉터로 토큰 첨부와 에러 처리를 모든 요청에 공통 적용한다. 컴포넌트마다 반복하던 설정이 사라진다."
    },
    {
      "title": "HTTP Method 로 CRUD 4종 실습 (GET·POST·PUT·DELETE)",
      "lang": "javascript",
      "code": "// 앞서 만든 공통 인스턴스를 가져와 CRUD 를 실습한다(async 함수 안에서 실행)\nimport http from './api/http'\n\n// (Read)   GET: 목록을 읽어온다(서버 데이터는 바꾸지 않음)\nconst list = await http.get('/cities')\n\n// (Create) POST: 새 자원을 등록한다(두 번째 인자가 보낼 body)\nawait http.post('/cities', { name: '대전', temp: 24 })\n\n// (Update-전체) PUT: 기존 자원을 통째로 갈아 끼운다\nawait http.put('/cities/1', { name: '서울', temp: 26 })\n\n// (Update-부분) PATCH: 특정 필드만 정밀 수정한다\nawait http.patch('/cities/1', { temp: 27 })\n\n// (Delete) DELETE: 특정 자원을 삭제한다\nawait http.delete('/cities/1')",
      "note": "HTTP Method 가 곧 데이터베이스 CRUD 다 — GET=조회, POST=생성, PUT/PATCH=수정, DELETE=삭제. REST 에서 주소(URI)는 /cities 처럼 명사로만 쓰고 행위는 Method 로 표현한다."
    },
    {
      "title": "Vite 빌드와 배포 — dist 생성과 base 경로 맞추기",
      "lang": "javascript",
      "code": "// vite.config.js : 빌드·배포 환경 설정 파일\nimport { defineConfig } from 'vite'\nimport vue from '@vitejs/plugin-vue'\n\nexport default defineConfig({\n  plugins: [vue()],\n  // base: 배포 경로의 기준점.\n  //  - 루트/커스텀 도메인이면 '/'\n  //  - GitHub Pages 하위경로(아이디.github.io/레포명/)면 '/레포명/'\n  // 이 값이 안 맞으면 빌드 후 JS·CSS 자산이 404 나며 흰 화면이 뜬다\n  base: '/skala-vue/',\n})\n\n// --- 터미널 흐름 ---\n// npm run dev     : 개발 서버(localhost:5173), 저장 즉시 반영(HMR)\n// npm run build   : dist 폴더로 압축·최적화된 정적 파일 생성(실제 올릴 결과물)\n// npm run preview : 빌드 결과를 실제처럼 미리보기",
      "note": "npm run build 는 소스를 압축·최적화해 dist 폴더를 만든다. GitHub Pages 하위경로에 올릴 때 base 를 레포명으로 맞추지 않으면 자산 경로가 어긋나 화면이 하얗게 뜨는 대표적 실수가 난다."
    },
    {
      "title": "환경변수(.env)와 import.meta.env — 서버 주소를 코드 밖으로",
      "lang": "vue",
      "code": "<script setup>\n// Vite 는 프로젝트 루트의 .env 파일들을 자동으로 읽어 들인다\n//   .env.staging    → VITE_API_URL=https://api-stage.example.com\n//   .env.production → VITE_API_URL=https://api-prod.example.com\n// 규칙: VITE_ 로 시작하는 변수만 화면 코드로 노출된다(보안 장치)\n\n// import.meta.env 로 현재 빌드 모드에 주입된 값을 읽는다\nconst apiUrl = import.meta.env.VITE_API_URL\nconsole.log('현재 주입된 API 서버 주소:', apiUrl)\n</script>\n\n<template>\n  <!-- staging 으로 빌드하면 stage 주소, production 이면 prod 주소가 보인다 -->\n  <p>연동 API 서버: {{ apiUrl }}</p>\n</template>\n\n<!-- package.json 스크립트에 --mode 를 붙여 환경을 골라 빌드한다\n  \"build:staging\":    \"vite build --mode staging\"\n  \"build:production\": \"vite build --mode production\"\n소스 수정 없이 명령어만 바꿔 검증 서버와 실서버 주소를 스위칭한다 -->",
      "note": "API 키·서버 주소 같은 설정값을 소스에 하드코딩하면 Git 에 노출되고, 서버가 바뀔 때마다 코드를 고쳐야 한다. .env 파일로 격리하면 빌드 명령의 --mode 옵션만으로 검증/상용 환경을 오갈 수 있고, VITE_ 접두사 규칙이 민감 변수의 실수 노출을 막아 준다."
    },
    {
      "title": "ESLint 커스텀 규칙 — == 금지하고 === 강제하기",
      "lang": "javascript",
      "code": "// eslint.config.js — 프로젝트 전체에 적용할 나만의 검사 규칙 추가\n// (배열에서 아래에 둘수록 앞서 로드된 기본 규칙을 덮어쓴다)\nexport default [\n  // ...js 추천 규칙, Vue 필수 규칙 등 기본 세트가 먼저 오고\n  {\n    name: 'app/custom-rules',   // 규칙 묶음의 식별자 이름(선택)\n    rules: {\n      'eqeqeq': ['error', 'always'],   // == 금지, === 강제(암묵적 형변환 버그 차단)\n      'no-unused-vars': 'warn',        // 선언만 하고 안 쓴 변수는 경고 처리\n      'no-console': 'off',             // 학습 편의를 위해 console.log 허용\n      'vue/multi-word-component-names': 'off',  // 한 단어 컴포넌트명 허용\n    },\n  },\n]\n\n// 동작 확인 3단계:\n// 1) 코드에 if (userAge == 20) 처럼 느슨한 비교를 일부러 넣고 저장\n// 2) 에디터에 빨간 물결과 \"Expected '===' and instead saw '=='\" 툴팁 확인\n// 3) 터미널에서 npm run lint 로 프로젝트 전체를 일괄 점검",
      "note": "ESLint 는 코드를 실행하지 않고도 오타·미사용 변수·위험한 패턴을 잡아 주는 정적 분석 도구다. 자바스크립트는 문법 오류가 있어도 배포가 되어 버리는 인터프리터 언어라, CI 에 lint 를 걸어 결함 코드가 상용에 나가는 것을 자동 차단하는 것이 실무 표준이다."
    },
    {
      "title": "ElMessageBox 확인 팝업과 el-progress 게이지 바",
      "lang": "vue",
      "code": "<script setup>\nimport { ref } from 'vue'\n// 확인 팝업과 토스트 알림(Element Plus 가 JS 호출형으로 제공)\nimport { ElMessage, ElMessageBox } from 'element-plus'\nconst progress = ref(0)   // 게이지 진행률(0~100)\n\n// 구식 confirm() 을 대체하는 세련된 최종 확인 팝업\nfunction confirmDelete() {\n  ElMessageBox.confirm('파일을 영구 삭제할까요?', '최종 확인', { type: 'warning' })\n    .then(() => ElMessage.success('삭제되었습니다'))   // 확인을 누르면 실행\n    .catch(() => ElMessage.info('취소되었습니다'))     // 취소를 누르면 실행\n}\n// 다운로드 시뮬레이션: 0.4초마다 게이지를 20씩 채운다\nfunction startDownload() {\n  progress.value = 0\n  const timer = setInterval(() => {\n    progress.value += 20\n    if (progress.value >= 100) { clearInterval(timer); ElMessage.success('완료!') }\n  }, 400)\n}\n</script>\n\n<template>\n  <el-button type=\"danger\" @click=\"confirmDelete\">파일 삭제</el-button>\n  <el-button @click=\"startDownload\">다운로드 시작</el-button>\n  <!-- 진행률 숫자만 넘기면 애니메이션 게이지 바가 자동으로 그려진다 -->\n  <el-progress :percentage=\"progress\" />\n</template>",
      "note": "브라우저 기본 confirm() 은 못생기고 커스텀이 안 되지만, ElMessageBox.confirm 은 Promise 를 돌려줘 확인은 then, 취소는 catch 로 갈라 처리한다. el-progress 는 percentage 값 하나로 진행률 UI 를 완성하는, 삭제 확인·다운로드 표시 같은 실무 단골 패턴이다."
    },
    {
      "title": "Promise .then 체이닝 vs async/await — 콘솔 순서로 보는 차이",
      "lang": "javascript",
      "code": "// 같은 통신을 두 가지 문법으로 — 콘솔에 찍히는 번호 순서에 주목!\nimport axios from 'axios'\nconst URL = 'https://jsonplaceholder.typicode.com/posts/1'\n\n// 방법1) .then 체이닝: 요청만 걸어두고 다음 줄로 먼저 내려간다\nfunction withThen() {\n  console.log('1. 통신 시작')\n  axios.get(URL)\n    .then((res) => console.log('3. 데이터 도착:', res.data.title))  // 성공 시\n    .catch((err) => console.error('에러 발생:', err))              // 실패 시\n  console.log('2. 요청 직후 라인')   // 데이터보다 이 줄이 먼저 찍힌다!\n}\n\n// 방법2) async/await: 응답이 올 때까지 기다렸다가 다음 줄로 — 위에서 아래로 읽힌다\nasync function withAwait() {\n  console.log('1. 통신 시작')\n  try {\n    const res = await axios.get(URL)              // 도착할 때까지 대기\n    console.log('2. 데이터 도착:', res.data.title)\n  } catch (err) {\n    console.error('에러 발생:', err)               // 실패는 정석 try/catch 로\n  }\n  console.log('3. 통신이 다 끝난 후 라인')          // 1→2→3 순서대로 찍힌다\n}",
      "note": ".then 방식은 요청을 걸어 두고 아래 코드가 먼저 실행되어 로그가 1→2→3 순서로 어긋나 보이지만, await 는 응답을 기다렸다가 진행해 위에서 아래로 정직하게 읽힌다. 그래서 가독성과 유지보수 면에서 async/await + try/catch 가 실무 표준이 되었다."
    }
  ],
  "webproject-1": [
    {
      "title": "액터별 기능 정의 — 누가 무엇을 쓰는지 표로",
      "lang": "javascript",
      "code": "// 액터(사용자 유형)별로 '누가 어떤 기능을 쓰는지' 정리한다\nconst actors = [\n  { role: '일반 사용자', features: ['회원가입', '글 목록 보기', '글 작성'] },\n  { role: '관리자',     features: ['신고 글 삭제', '회원 관리'] },\n  { role: '외부 시스템', features: ['날씨 API 조회'] },\n]\n\n// 각 액터가 가진 기능 수로 역할 범위를 가늠한다\nactors.forEach((a) => {\n  console.log(a.role + ': ' + a.features.length + '개 기능')\n})\n// 결과: 일반 사용자: 3개 / 관리자: 2개 / 외부 시스템: 1개\n\n// 특정 기능을 누가 쓰는지 거꾸로 찾는다(요구사항 누락 점검)\nconst who = actors.filter((a) => a.features.includes('글 작성')).map((a) => a.role)\nconsole.log('글 작성 가능 액터:', who)   // 결과: ['일반 사용자']",
      "note": "정의서의 핵심은 액터(일반 사용자·관리자·외부 시스템)를 식별하고 각자의 기능을 나누는 것이다. 뒤에 그릴 UI 화면과 API 는 모두 이 액터별 기능 목록에서 파생된다."
    },
    {
      "title": "UI 흐름도의 밑그림 — 화면 목록·구성요소·이동경로",
      "lang": "javascript",
      "code": "// 화면 목록과 각 화면의 구성요소·이동 경로를 구조화한다\nconst screens = [\n  { name: '로그인', elements: ['이메일 입력', '비밀번호 입력', '로그인 버튼'], next: '목록' },\n  { name: '목록',   elements: ['검색창', '글 카드 목록', '글쓰기 버튼'],        next: '상세' },\n  { name: '상세',   elements: ['제목', '본문', '뒤로가기'],                     next: '목록' },\n]\n\n// 화면 흐름을 한 줄로 이어 전체 사용자 동선을 확인한다\nconsole.log(screens.map((s) => s.name).join(' -> '))\n// 결과: 로그인 -> 목록 -> 상세\n\n// 각 화면에 버튼·입력 같은 구성요소가 비었는지 점검(와이어프레임 누락 방지)\nscreens.forEach((s) => {\n  if (s.elements.length === 0) console.log(s.name, '화면 구성요소 누락!')\n})",
      "note": "화면 목록·구성요소(버튼/입력/데이터)·이동경로를 먼저 구조화하면 와이어프레임과 API 도출이 쉬워진다. 완성한 UI 흐름도는 반드시 정의서 PDF 안에 화면 캡처로 넣어야 감점을 피한다."
    }
  ],
  "webproject-2": [
    {
      "title": "데이터 모델(ERD)을 코드로 — DBML 로 엔터티·관계 정의",
      "lang": "text",
      "code": "// {반_이름_프로젝트명}-DB.dbml : 데이터 모델을 코드로 표현한다\n// dbdiagram.io 에 붙여넣으면 관계도(ERD)가 자동으로 그려진다\n\nTable users {                        // 회원 엔터티\n  id integer [pk, increment]         // PK: 자동 증가 기본키\n  email varchar [unique, not null]   // 로그인 이메일(중복 불가)\n  nickname varchar [not null]        // 표시 이름\n  created_at timestamp               // 가입 시각\n}\n\nTable posts {                        // 글 엔터티\n  id integer [pk, increment]         // PK\n  user_id integer [not null]         // FK: 작성자(users.id 를 가리킴)\n  title varchar [not null]           // 제목\n  content text                       // 본문\n  created_at timestamp\n}\n\n// 관계: 회원 1명이 글 여러 개를 쓴다(1:N)\nRef: posts.user_id > users.id",
      "note": "ERD 평가의 핵심은 PK/FK 명시와 1:N·M:N 관계 정의다. UI 에서 화면에 뿌리는 모든 데이터 필드가 여기 엔터티에 존재해야 하며, 이 DBML 을 dbdiagram.io 에 넣으면 다이어그램이 자동 생성된다."
    },
    {
      "title": "API 명세를 OpenAPI(OAS) YAML 로 — Method·Body·에러코드",
      "lang": "yaml",
      "code": "# {반_이름_프로젝트명}-API.yml : 화면이 호출하는 API를 OpenAPI로 명세\nopenapi: 3.0.0\ninfo:\n  title: 글 서비스 API           # 서비스 이름\npaths:\n  /posts:                        # '글' 자원(주소는 동사 없이 명사만)\n    get:                         # 목록 조회 (GET = Read)\n      parameters:\n        - name: q                # 검색어를 query 로 받음\n          in: query\n          schema: { type: string }\n      responses:\n        '200': { description: 조회 성공 }\n    post:                        # 새 글 등록 (POST = Create)\n      requestBody:               # 클라이언트가 보낼 body 정의\n        content:\n          application/json:\n            schema: { $ref: '#/components/schemas/PostInput' }  # 공통 스키마 재사용\n      responses:\n        '201': { description: 생성됨 }\n        '400': { description: 입력값 오류 }        # 에러 코드 명시\ncomponents:\n  schemas:\n    PostInput:                   # 여러 API가 함께 쓰는 공통 입력 스키마\n      type: object\n      properties:\n        title: { type: string }   # 제목\n        content: { type: string } # 본문",
      "note": "평가 포인트는 적절한 HTTP Method, Path/Query/Body 명확화, 에러코드(400/401/404) 정의, $ref 로 공통 스키마 재사용이다. 요청/응답 필드는 앞서 만든 DBML(ERD)과 반드시 일치해야 한다."
    },
    {
      "title": "실전 스키마 분석 — 평가 기록 테이블과 RLS(행 수준 보안)",
      "lang": "sql",
      "code": "-- 이 학습 사이트가 실제로 쓰는 '교과목 평가 기록' 테이블 설계다\ncreate table if not exists skala_evaluations (      -- if not exists: 여러 번 실행해도 안전(멱등)\n  id           uuid primary key default gen_random_uuid(),  -- 행마다 자동 고유 ID\n  subject_id   text not null,                      -- 어떤 과목의 평가인지\n  student_name text not null,                      -- 학생 성명(필수)\n  student_no   text default '',                    -- 고유번호(없으면 빈 문자열)\n  track        text,                               -- 캠퍼스(gj·us·p4·p5)\n  class_no     int,                                -- 반 번호\n  scores       jsonb not null default '{}'::jsonb, -- 항목별 점수를 JSON으로 유연하게 저장\n  note_basis   text default '',                    -- 점수 판단 근거\n  updated_at   timestamptz not null default now()  -- 수정 시각 자동 기록\n);\n\n-- RLS(Row Level Security): '행 단위'로 접근을 통제하는 스위치를 켠다\nalter table skala_evaluations enable row level security;\n\n-- 정책을 갈아끼울 때는 drop 후 create — 재실행해도 42710(중복) 에러가 안 난다\ndrop policy if exists \"evaluations_admin_all\" on skala_evaluations;\ncreate policy \"evaluations_admin_all\" on skala_evaluations\n  for all                                          -- select/insert/update/delete 전부\n  using (skala_is_admin())                         -- 읽을 때: 관리자만\n  with check (skala_is_admin());                   -- 쓸 때도: 관리자만",
      "note": "성적처럼 민감한 데이터는 서버(RLS)가 지켜야 한다 — 프런트에서 화면만 가리는 것은 보안이 아니다. jsonb 컬럼은 평가 항목이 과목마다 달라도 테이블 구조를 바꾸지 않게 해 주는 실전 요령이다."
    },
    {
      "title": "React에서 Supabase CRUD — 조회 필터와 업서트 패턴",
      "lang": "javascript",
      "code": "// 이 사이트의 평가 화면이 실제로 쓰는 데이터 연동 패턴(요약본)\nimport { supabase } from '../lib/supabase'          // 프로젝트 공용 클라이언트 1개만 만든다\n\n// 1) 조회 — 과목+분반으로 좁혀서 필요한 행만 가져온다\nasync function loadEvaluations(subjectId, track, classNo) {\n  const { data, error } = await supabase\n    .from('skala_evaluations')                      // 테이블 선택\n    .select('*')                                    // 전체 컬럼\n    .eq('subject_id', subjectId)                    // WHERE subject_id = ...\n    .eq('track', track)                             // 분반 스코프까지 걸어야 화면이 섞이지 않는다\n    .eq('class_no', classNo)\n    .order('created_at')                            // 입력 순 정렬\n  if (error) throw error                            // 에러는 삼키지 말고 화면에 알린다\n  return data\n}\n\n// 2) 저장 — upsert: id가 있으면 UPDATE, 없으면 INSERT를 한 번에\nasync function saveEvaluations(rows) {\n  const { data, error } = await supabase\n    .from('skala_evaluations')\n    .upsert(rows)                                   // 여러 행을 한 번에 저장(왕복 1회)\n    .select()                                       // 저장 결과(새 id 포함)를 돌려받는다\n  return { data, error }\n}",
      "note": "화면 상태에는 '저장 전 변경(dirty)' 표시를 두고, 저장 성공 후에만 지우는 것이 실무 패턴이다. RLS가 켜져 있으면 이 코드가 관리자 계정이 아닐 때 자동으로 거부된다 — 프런트 코드는 같아도 서버가 판단한다."
    },
    {
      "title": "브라우저에서 CSV 내보내기 — BOM·Blob·다운로드 링크",
      "lang": "javascript",
      "code": "// 서버 없이 브라우저만으로 엑셀 호환 CSV를 만들어 내려받게 하는 패턴\nfunction exportCsv(rows) {\n  // 1) 셀 이스케이프: 따옴표로 감싸고, 내부 따옴표는 두 번 쓴다(CSV 규칙)\n  const esc = (v) => '\"' + String(v ?? '').replace(/\"/g, '\"\"') + '\"'\n\n  // 2) 헤더 + 데이터 행을 CRLF로 연결한다(엑셀 줄바꿈 규칙)\n  const head = ['고유번호', '성명', '점수', '판단근거'].map(esc).join(',')\n  const lines = rows.map((r) =>\n    [esc(r.no), esc(r.name), esc(r.total), esc(r.basis)].join(','))\n  const body = [head, ...lines].join('\\r\\n')\n\n  // 3) 맨 앞의 BOM(\\uFEFF)이 핵심 — 없으면 엑셀에서 한글이 깨진다\n  const csv = '\\uFEFF' + body\n\n  // 4) Blob으로 가짜 파일을 만들고, 보이지 않는 링크를 눌러 다운로드시킨다\n  const a = document.createElement('a')\n  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))\n  a.download = '평가결과.csv'                        // 저장될 파일명\n  a.click()\n  URL.revokeObjectURL(a.href)                       // 메모리 정리(누수 방지)\n}",
      "note": "한글 CSV가 엑셀에서 깨지는 원인의 9할은 BOM 누락이다. 이 사이트의 평가 CSV 내보내기가 정확히 이 패턴으로 동작한다 — 만든 기능의 소스를 다시 읽는 것이 가장 좋은 실습이다."
    }
  ],
  "webproject-3": [
    {
      "title": "프로젝트 정의서 목차 점검 — 6개 장이 다 채워졌나",
      "lang": "javascript",
      "code": "// 발표 PDF(정의서)의 목차를 구조로 정리해 빠진 장을 점검한다\nconst doc = [\n  { section: '서비스 개요', items: ['이름', '목적/배경', '핵심 가치', '주요 기능'] },\n  { section: '액터 정의', items: ['일반 사용자', '관리자', '외부 시스템'] },\n  { section: 'UI 흐름(와이어프레임)', items: ['로그인', '메인', '상세'] }, // PDF에 화면 캡처 필수\n  { section: '데이터 모델(ERD)', items: ['엔터티', 'PK/FK', '관계(1:N)'] },\n  { section: 'API 명세(OAS)', items: ['요청', '응답', '예외처리'] },\n  { section: '고려사항', items: ['설계 고민', '다음 단계 개발 시 고려점'] },\n]\n\n// 각 장에 내용이 채워졌는지(빈 목차가 없는지) 확인\ndoc.forEach((d) => {\n  const ok = d.items.length > 0 ? 'OK' : '비어 있음!'\n  console.log(d.section + ': ' + ok)\n})\n// UI 흐름도는 반드시 PDF 안에 이미지로 넣는다(가장 자주 빠뜨리는 항목)",
      "note": "정의서는 개요→액터→UI흐름→ERD→API→고려사항 6개 장이 서로 이어지도록 작성한다. 특히 UI 흐름도(와이어프레임) 캡처가 PDF 안에 없으면 감점되니 마지막에 반드시 확인한다."
    },
    {
      "title": "발표 전 자가점검 — 산출물 3종과 UI·ERD·API 일관성",
      "lang": "javascript",
      "code": "// 발표 전 자가점검: 산출물·납기·'일관성'을 코드로 훑는다\nconst submit = {\n  pdf: true,   // {반_이름_프로젝트명}-개요.pdf (UI 흐름도 포함)\n  dbml: true,  // {반_이름_프로젝트명}-DB.dbml\n  yml: true,   // {반_이름_프로젝트명}-API.yml\n}\n\n// 1) 3종 산출물이 모두 준비됐는지(하나라도 없으면 감점)\nconst missing = Object.entries(submit).filter(([, v]) => !v).map(([k]) => k)\nconsole.log(missing.length ? '누락: ' + missing : '산출물 3종 완비')\n\n// 2) 가장 자주 깎이는 '일관성' 3가지를 직접 확인한다\nconst consistency = [\n  'UI에서 쓰는 모든 데이터 필드가 ERD(DB)에 있는가',   // UI <-> ERD\n  '화면마다 필요한 API가 모두 정의됐는가',              // UI <-> API\n  'API의 요청/응답이 ERD 구조와 일치하는가',           // API <-> ERD\n]\nconsistency.forEach((c, i) => console.log((i + 1) + '. ' + c))\n// 세 축(UI·데이터·API)이 어긋나면 기능이 문제해결과 연결되지 않아 감점",
      "note": "세부 평가의 핵심은 UI↔ERD↔API 세 축의 일관성이다. 화면에 쓰는 데이터가 ERD 에 있고, 그 데이터를 나르는 API 가 정의돼 있어야 한다. 납기(3일차 오후 마감) 미준수는 0점이므로 시간 엄수가 최우선이다."
    }
  ],
  "python-1": [
    {
      "title": "Parquet으로 저장하고 필요한 열만 골라 읽기 (예외처리 포함)",
      "lang": "python",
      "code": "import pandas as pd                    # 표(DataFrame) 처리 라이브러리\n\n# 도시별 날씨 수집이 끝났다고 가정한 표\ndf = pd.DataFrame({\n    \"도시\": [\"서울\", \"도쿄\", \"뉴욕\", \"런던\"],            # 도시 이름\n    \"기온\": [25.7, 28.1, 23.0, 24.3],                  # 현재 기온(도)\n    \"현지시각\": [\"16:46\", \"16:46\", \"03:46\", \"08:46\"],   # 각 도시의 현지 시각\n})\n\ndf.to_parquet(\"weather.parquet\")       # parquet(열 단위 압축 형식) 파일로 저장\n\ntry:                                   # 파일이 없을 수도 있으니 예외 대비\n    slim = pd.read_parquet(\"weather.parquet\", columns=[\"도시\", \"기온\"])  # 필요한 열만 읽기\n    print(slim)                        # 현지시각 없이 도시·기온 2개 열만 나온다\nexcept FileNotFoundError:              # 파일이 없으면 이 블록으로\n    print(\"weather.parquet 이 없습니다. 저장 단계를 먼저 실행하세요.\")\n\n# CSV 는 행 단위, parquet 은 열 단위 저장 — 그래서 '필요한 열만' 골라 읽을 수 있다\n# 데이터가 커질수록 읽기 속도와 파일 용량 모두 parquet 이 유리하다",
      "note": "윤선영 실습교수의 데이터분석 Python 종합실습1 3~4번(Weather 객체를 csv·parquet 으로 저장하고 도시·기온만 읽어오기, 파일 없으면 예외처리)을 왕초보용으로 줄였다. CSV 와 달리 parquet 은 columns 인자로 필요한 열만 읽을 수 있다는 점과 FileNotFoundError 대비가 핵심이다."
    },
    {
      "title": "수집→검증→저장을 한 스크립트로 — 미니 데이터 파이프라인",
      "lang": "python",
      "code": "import httpx                              # HTTP 요청 라이브러리\nimport pandas as pd                       # 표 처리\nfrom pydantic import BaseModel, ValidationError   # 데이터 검증 도구\n\nclass Product(BaseModel):                 # 상품 1건이 갖춰야 할 형태 선언\n    id: int                               # 상품 번호는 정수\n    title: str                            # 상품명은 문자열\n    price: float                          # 가격은 실수\n\nrows = []                                 # 검증을 통과한 데이터만 담을 목록\nfor i in range(1, 4):                     # 상품 1~3번을 차례로 수집\n    r = httpx.get(f\"https://fakestoreapi.com/products/{i}\", timeout=10)  # API 호출\n    try:                                  # 받은 데이터가 형태에 맞는지 검사\n        p = Product(**r.json())           # JSON 을 스키마에 통과시켜 검증\n        rows.append({\"번호\": p.id, \"제품명\": p.title, \"가격\": p.price})   # 통과분만 적재\n    except ValidationError:               # 형태가 어긋난 데이터는\n        print(i, \"번 상품 검증 실패 — 건너뜀\")   # 프로그램을 멈추지 말고 기록만 남긴다\n\ndf = pd.DataFrame(rows)                   # 검증 통과분으로 표 생성\ndf.to_csv(\"products.csv\", index=False)    # 사람이 열어 보기 좋은 CSV 로 저장\ndf.to_parquet(\"products.parquet\")         # 분석용으로 빠른 parquet 으로도 저장\nprint(\"수집→검증→저장 완료:\", len(df), \"건\")   # 파이프라인 결과 한 줄 요약",
      "note": "윤선영 실습교수 가이드의 평가 과제(fakestoreapi 데이터 수집 → Pydantic 스키마 검증+예외처리 → CSV·Parquet 저장을 하나의 자동화 스크립트로, 배점 40점)를 축소 재현했다. 지금까지 따로 배운 httpx·Pydantic·파일 저장을 처음으로 한 흐름에 이어 붙이는 것이 포인트다. 불량 데이터 1건 때문에 전체가 죽지 않도록 건너뛰고 기록하는 습관도 함께 익힌다."
    },
    {
      "title": "실습1: 매출 레코드 집계 — Counter·defaultdict·컴프리헨션 (Practice 1)",
      "lang": "python",
      "code": "# 실습1(Practice 1): 매출 레코드를 자료구조로 집계하기\nfrom collections import Counter, defaultdict  # 빈도 집계·그룹핑 전용 자료구조\n\n# Python_Practice1_Data.json 을 흉내 낸 Sales 레코드(행: 날짜·지역·금액·품목)\nsales = [\n    {'date': '2026-01', 'region': '서울', 'amount': 1500, 'category': '가전'},\n    {'date': '2026-01', 'region': '부산', 'amount': 800,  'category': '의류'},\n    {'date': '2026-02', 'region': '서울', 'amount': 1200, 'category': '가전'},\n    {'date': '2026-02', 'region': '서울', 'amount': 300,  'category': '식품'},\n    {'date': '2026-02', 'region': '부산', 'amount': 2000, 'category': '가전'},\n]\n\n# 1) amount >= 1000 인 거래만 남긴다(리스트 컴프리헨션 = 필터+수집 한 줄)\nbig = [r for r in sales if r['amount'] >= 1000]\n\n# 2) Counter 로 '지역별 거래 건수'를 센다(직접 루프 대신 - 감점 회피)\nregion_count = Counter(r['region'] for r in big)\nprint('지역별 건수:', region_count.most_common())  # 많은 순으로 정렬 보장\n\n# 3) defaultdict 로 '카테고리별 금액 리스트'를 모은다(키 없으면 빈 리스트 자동 생성)\nby_cat = defaultdict(list)\nfor r in big:\n    by_cat[r['category']].append(r['amount'])\n\n# 4) 딕셔너리 컴프리헨션으로 '지역별 총매출' dict 를 만든다\nregion_total = {reg: sum(r['amount'] for r in big if r['region'] == reg)\n                for reg in region_count}\nprint('지역별 총매출:', region_total)   # {'서울': 2700, '부산': 2000}\n\n# 5) 금액 상위 3건을 내림차순 정렬(정렬 기준 key=금액, reverse)\ntop3 = sorted(big, key=lambda r: r['amount'], reverse=True)[:3]\nassert region_total['서울'] == 2700  # 체크포인트: 값이 맞는지 assert 로 자가검증",
      "note": "Practice 1의 정석 흐름: for 루프 대신 컴프리헨션, 직접 카운팅 대신 Counter, if-키확인 대신 defaultdict를 쓰는 것이 채점 감점 회피 포인트다. assert로 집계 결과를 스스로 검증한다."
    },
    {
      "title": "실습1: 리스트 vs 제너레이터 메모리 비교 (Practice 1 체크포인트)",
      "lang": "python",
      "code": "# 실습1: 같은 결과, 다른 메모리 — 제너레이터가 왜 대용량에 강한가\nimport sys  # 객체가 차지하는 바이트를 재는 표준 모듈\n\n# 1) 리스트: 1000만 개 제곱값을 '한꺼번에' 메모리에 올린다\nsquares_list = [x * x for x in range(10_000_000)]\n\n# 2) 제너레이터: 같은 계산을 '필요할 때 하나씩' 만든다(괄호가 () 이면 제너레이터)\nsquares_gen = (x * x for x in range(10_000_000))\n\n# 3) 두 객체의 메모리 크기를 비교한다\nprint('리스트   :', sys.getsizeof(squares_list), 'bytes')  # 수천만 bytes\nprint('제너레이터:', sys.getsizeof(squares_gen), 'bytes')   # 100 bytes 대\n\n# 4) 체크포인트: 제너레이터가 리스트보다 훨씬 작아야 한다\nassert sys.getsizeof(squares_gen) < sys.getsizeof(squares_list)\n\n# 5) 단, 제너레이터는 '한 번만' 흐른다 — 합을 구하면 소진된다\ntotal = sum(squares_gen)  # 하나씩 꺼내 더함(전부 메모리에 올리지 않음)\nprint('합계:', total, '/ 다시 세면:', sum(squares_gen))  # 두 번째는 0(이미 소진)",
      "note": "Checkpoint는 sys.getsizeof(generator) < list 확인을 요구한다. 이때 제너레이터를 list()로 바꿔 비교하면 메모리 차이가 사라져 감점되므로, 변환하지 말고 그대로 크기를 재는 것이 핵심이다."
    },
    {
      "title": "실행 구조 눈으로 보기 — dis로 바이트코드 확인 (1장)",
      "lang": "python",
      "code": "# 소스 -> AST -> 바이트코드 -> PVM: 파이썬이 코드를 실행하는 진짜 순서\nimport dis  # 함수가 어떤 바이트코드로 컴파일되는지 보여주는 표준 모듈\n\n# 아주 단순한 덧셈 함수 하나를 정의한다\ndef add(x, y):\n    return x + y  # 이 한 줄이 실제로 어떤 명령들로 쪼개지는지 확인\n\n# dis 로 내부 바이트코드 명령을 출력한다\ndis.dis(add)\n# 출력(요지):\n#   LOAD_FAST   x    <- 지역변수 x 를 스택에 올림\n#   LOAD_FAST   y    <- 지역변수 y 를 스택에 올림\n#   BINARY_OP   +    <- 스택 위 두 값을 더함\n#   RETURN_VALUE     <- 결과를 반환\n\n# CPython 은 소스를 기계어가 아니라 '바이트코드'로 바꿔 PVM 이 한 줄씩 실행한다.\n# 이 구조를 알면 __pycache__(.pyc)가 왜 생기는지, 그리고 컴프리헨션이\n# for 루프보다 빠른 이유(생성되는 바이트코드 수가 더 적음)를 납득할 수 있다.",
      "note": "교재 1장의 dis·LOAD_FAST·BINARY_OP·RETURN_VALUE 설명을 그대로 실습으로. \"왜 컴프리헨션이 빠른가\"를 느낌이 아니라 바이트코드 개수로 이해하게 하는 개념 데모다."
    },
    {
      "title": "list vs set — 자료구조 선택이 속도를 가른다 (timeit 실측)",
      "lang": "python",
      "code": "import timeit                      # 코드 실행 시간을 반복 측정하는 표준 모듈\n\ndata_list = list(range(100_000))   # 10만 개 숫자를 담은 리스트\ndata_set = set(data_list)          # 같은 숫자를 담은 집합(내부는 해시 테이블)\n\n# 리스트의 in 검사: 앞에서부터 하나씩 훑는다 - O(n)\nt_list = timeit.timeit(lambda: 99_999 in data_list, number=1000)\n# 집합의 in 검사: 해시로 위치를 바로 찾는다 - O(1)\nt_set = timeit.timeit(lambda: 99_999 in data_set, number=1000)\n\nprint('리스트 검색:', round(t_list, 4), '초')   # 집합보다 수백 배 느리다\nprint('집합 검색  :', round(t_set, 6), '초')    # 거의 0에 가깝다\n\n# set 은 중복 제거에 더해 집합 연산까지 한 줄로 된다\na = {'서울', '부산', '대구'}       # 이번 달 매출이 있는 지역\nb = {'서울', '인천'}               # 프로모션 대상 지역\nprint('교집합:', a & b)            # 결과: {'서울'} - 둘 다 해당\nprint('차집합:', a - b)            # 결과: {'부산', '대구'} - 매출만 있는 곳",
      "note": "같은 in 검사라도 리스트는 전부 훑고(O(n)) 집합은 해시로 바로 찾는다(O(1)). timeit 으로 반복 측정하면 감이 아니라 숫자로 차이를 확인할 수 있어, 자료구조 선택 기준을 몸으로 익히게 된다."
    },
    {
      "title": "TypedDict + mypy — dict 에 타입 계약을 새겨 실행 전에 오류 잡기",
      "lang": "python",
      "code": "from typing import TypedDict       # dict 모양에 타입 힌트를 입히는 도구\n\n# dict 를 그대로 쓰되, 어떤 키에 어떤 타입이 오는지 '계약'을 선언한다\nclass SalesRow(TypedDict):\n    date: str      # 날짜 문자열\n    region: str    # 지역명\n    amount: float  # 매출액(실수)\n\n# CSV 한 행을 읽었다고 가정 - 겉모습은 평범한 dict 다\nrow: SalesRow = {'date': '2026-01', 'region': '서울', 'amount': 1500.0}\nprint(row['region'])               # 일반 dict 처럼 자유롭게 사용\n\n# 타입 힌트가 있으면 정적 검사기가 실수를 '실행 전에' 잡아 준다\ndef compute_avg(values: list[float]) -> float:\n    return sum(values) / len(values)   # 평균 계산\n\n# compute_avg(['a', 'b'])   # <- 문자열 리스트를 넘기는 실수(주석 해제해 실험)\n# 터미널에서:  mypy analysis.py\n#   error: Argument 1 has incompatible type 'list[str]'; expected 'list[float]'\n# 수백만 행을 처리한 뒤 터지는 것보다, 실행 전에 빨간 줄로 아는 편이 훨씬 싸다",
      "note": "dataclass 가 클래스형 레코드라면 TypedDict 는 dict 를 그대로 쓰면서 타입만 계약하는 방식이라 Pandas 행·JSON 과 궁합이 좋다. mypy 나 VS Code Pylance 가 이 힌트를 읽어 컬럼 타입 실수를 런타임 전에 차단해 준다."
    },
    {
      "title": "ProcessPoolExecutor — CPU 무거운 전처리를 코어 수만큼 병렬로",
      "lang": "python",
      "code": "from concurrent.futures import ProcessPoolExecutor  # 여러 프로세스로 나눠 실행\nimport multiprocessing as mp       # 내 컴퓨터의 CPU 코어 수 확인용\n\n# CPU 를 많이 쓰는 무거운 계산(행 단위 전처리라고 가정)\ndef process_chunk(chunk):\n    return [x * x % 97 for x in chunk]   # 청크 안의 값을 하나씩 변환\n\ndef split_chunks(data, n):         # 데이터를 코어 수만큼 등분하는 함수\n    size = len(data) // n          # 청크 하나의 크기\n    return [data[i*size:(i+1)*size] for i in range(n)]   # n 개 조각으로 분할\n\nif __name__ == '__main__':         # 멀티프로세싱은 이 가드가 반드시 필요하다\n    data = list(range(1_000_000))  # 처리할 큰 데이터(100만 건)\n    n_cores = mp.cpu_count()       # CPU 코어 수(예: 8)\n    chunks = split_chunks(data, n_cores)   # 코어 수만큼 청크 분할\n    with ProcessPoolExecutor(max_workers=n_cores) as exe:\n        results = list(exe.map(process_chunk, chunks))   # 청크들을 동시에 처리\n    total = sum(len(r) for r in results)   # 조각난 결과를 다시 합친다\n    print(n_cores, '코어로', total, '건 병렬 처리 완료')   # 이론상 코어 수배 빨라진다",
      "note": "asyncio 는 네트워크처럼 기다림이 많은 작업용이고, 계산 자체가 무거운 작업은 GIL 을 우회하는 멀티프로세싱이 답이다. 데이터를 코어 수만큼 등분해 ProcessPoolExecutor.map 에 넘기는 것이 대용량 전처리의 기본 병렬 패턴이다."
    },
    {
      "title": "cProfile — 느린 함수를 느낌이 아니라 측정으로 찾기",
      "lang": "python",
      "code": "import cProfile                    # 함수별 호출 횟수·누적 시간을 재는 표준 도구\n\ndef load_data():                   # 1단계: 데이터 읽기(빠르다고 가정)\n    return list(range(200_000))\n\ndef slow_clean(data):              # 2단계: 일부러 느리게 만든 정제 함수(병목 후보)\n    out = []\n    for x in data:                 # 파이썬 루프 + 문자열 변환이라 느리다\n        out.append(str(x).zfill(8))\n    return out\n\ndef summarize(data):               # 3단계: 요약 통계(빠르다)\n    return sum(len(s) for s in data)\n\ndef analysis():                    # 전체 분석 흐름을 하나로 묶은 함수\n    data = load_data()             # 읽고\n    cleaned = slow_clean(data)     # 정제하고\n    return summarize(cleaned)      # 요약한다\n\n# cumtime(누적 시간) 순으로 정렬해 어느 함수가 오래 걸렸는지 표로 출력\ncProfile.run('analysis()', sort='cumtime')\n# 출력에서 slow_clean 이 시간 대부분을 차지함을 확인 -> 최적화는 여기부터",
      "note": "느리다는 느낌만으로 아무 곳이나 고치면 헛수고가 되기 쉽다. cProfile 로 함수별 누적 시간을 먼저 재고, 가장 오래 걸린 함수 하나만 벡터화·병렬화하는 것이 올바른 최적화 순서다."
    },
    {
      "title": "Practice 2 데이터 받기 — json.load로 판매 데이터 읽기",
      "lang": "python",
      "files": [
        {
          "label": "Python_Practice2_Data.json 내려받기",
          "href": "/practice/Python_Practice2_Data.json"
        }
      ],
      "code": "# Practice 2 데이터: 사이트에서 내려받아 코드와 같은 폴더에 둔다\n#   https://skala.dreamitbiz.com/practice/Python_Practice2_Data.json\nimport json                                    # 표준 라이브러리 — 설치 불필요\n\n# 1) 파일을 열고 json.load 로 파이썬 객체로 변환한다\nwith open(\"Python_Practice2_Data.json\", encoding=\"utf-8\") as f:\n    sales = json.load(f)                       # 리스트[딕셔너리] 형태로 읽힌다\n\n# 2) 구조부터 확인하는 습관 — 몇 건인지, 한 건이 어떻게 생겼는지\nprint(len(sales))                              # 100  (판매 기록 100건)\nprint(sales[0])                                # {'region': '서울', 'category': '전자', 'amount': 1500, 'month': '2024-01'}\n\n# 3) 필드 확인: region(지역) · category(품목) · amount(금액) · month(연-월)\n#    ※ 문제지에는 date 로 나오지만, 이 파일은 month 로 제공된다 — 변수명 month 로 진행해도 된다(강사 공지)\nfor row in sales[:3]:                          # 앞 3건만 훑어보기\n    print(row[\"month\"], row[\"region\"], row[\"category\"], row[\"amount\"])",
      "note": "json.load(파일객체)와 json.loads(문자열)를 구분하자. 분석 코드를 짜기 전에 len()과 첫 항목 출력으로 데이터 모양부터 확인하는 것이 실수를 줄이는 가장 빠른 길이다."
    },
    {
      "title": "Practice 2 집계 — 월별·지역별 매출 합계와 품목 Top",
      "lang": "python",
      "files": [
        {
          "label": "Python_Practice2_Data.json 내려받기",
          "href": "/practice/Python_Practice2_Data.json"
        }
      ],
      "code": "# Practice 2 본 과제: 읽어 온 판매 데이터를 기준별로 집계한다\nimport json\nfrom collections import defaultdict, Counter  # 집계 전용 도구 2가지\n\nwith open(\"Python_Practice2_Data.json\", encoding=\"utf-8\") as f:\n    sales = json.load(f)                       # 100건 로드\n\n# 1) 월(month)별 매출 합계 — 키가 없으면 0에서 시작하는 defaultdict\nby_month = defaultdict(int)\nfor row in sales:\n    by_month[row[\"month\"]] += row[\"amount\"]    # 같은 달끼리 금액 누적\nfor month in sorted(by_month):                 # 1월부터 순서대로\n    print(month, by_month[month])\n\n# 2) 지역(region)별 매출 합계 — 같은 패턴 재사용\nby_region = defaultdict(int)\nfor row in sales:\n    by_region[row[\"region\"]] += row[\"amount\"]\nprint(sorted(by_region.items(), key=lambda x: -x[1]))   # 매출 큰 지역부터\n\n# 3) 품목(category) 판매 건수 Top 2 — 건수 세기는 Counter 한 줄\ntop = Counter(row[\"category\"] for row in sales)\nprint(top.most_common(2))                      # [('전자', n1), ('의류', n2)] 형태",
      "note": "합계 집계는 defaultdict(int), 건수 집계는 Counter — 이 두 도구만 알면 Practice 2 유형은 전부 풀린다. 같은 for 패턴을 키만 바꿔 재사용하는 감각을 익히자."
    },
    {
      "title": "Practice 1 완주 가이드 ① — 컴프리헨션 필터·지역별 총매출·Counter·defaultdict",
      "lang": "python",
      "files": [
        {
          "label": "Python_Practice2_Data.json 내려받기",
          "href": "/practice/Python_Practice2_Data.json"
        }
      ],
      "code": "# [Practice 1 - 전반부] 판매 데이터 필터링·집계 프로그램\n# 설명: JSON 판매 데이터에서 amount >= 1000 거래만 골라\n#       지역별 총매출·거래 건수·카테고리별 금액 목록을 집계한다\n# 변경내역: v1.0 최초 작성\nimport json                                    # JSON 파일 읽기\nfrom collections import Counter, defaultdict  # 집계 전용 자료구조 2종\n\ndef load_sales(path):\n    \"\"\"판매 JSON을 읽어 리스트로 반환한다. 실패하면 빈 리스트.\"\"\"\n    try:                                       # 파일이 없어도 멈추지 않게\n        with open(path, encoding='utf-8') as f:\n            return json.load(f)                # 리스트[딕셔너리]로 변환\n    except (FileNotFoundError, json.JSONDecodeError) as e:\n        print('로딩 실패:', e)                  # 원인을 알리고\n        return []                              # 빈 리스트로 안전하게 계속\n\nsales = load_sales('Python_Practice2_Data.json')   # 100건 로드\n\n# 1) amount >= 1000 거래만 필터링 — for문만 쓰면 감점, 컴프리헨션 한 줄\nhigh = [r for r in sales if r['amount'] >= 1000]\n\n# 2) 지역별 총매출 dict — 딕셔너리 컴프리헨션으로 계산\nregion_total = {reg: sum(r['amount'] for r in high if r['region'] == reg)\n                for reg in set(r['region'] for r in high)}\n\n# 3) Counter로 지역별 거래 건수 — 직접 루프 카운팅은 감점 대상\nregion_count = Counter(r['region'] for r in high)\nprint('지역별 건수:', region_count.most_common())   # 많은 순 정렬 보장\n\n# 4) defaultdict로 카테고리별 amount 리스트 — if key not in 패턴은 감점\nby_cat = defaultdict(list)\nfor r in high:\n    by_cat[r['category']].append(r['amount'])      # 키가 없으면 자동 생성\n\n# Checkpoint 자가검증: 총매출 합계 일치 + top3 금액 내림차순\nassert sum(region_total.values()) == sum(r['amount'] for r in high)\ntop3 = sorted(high, key=lambda r: r['amount'], reverse=True)[:3]\nassert top3[0]['amount'] >= top3[1]['amount'] >= top3[2]['amount']\nprint('지역별 총매출:', region_total)\nprint('금액 top3:', [r['amount'] for r in top3])",
      "note": "Practice 1의 1·2번 문제를 제출 형태로 완성한 풀이다. for 루프만으로 필터링(-2), if key not in 패턴(-1), 직접 루프 카운팅(-1)이 감점 대상이므로 컴프리헨션·defaultdict·Counter를 반드시 그대로 쓰고, 머리말 주석·함수 docstring·try/except까지 갖춰야 Comm. 20점과 예외처리 35점을 지킬 수 있다."
    },
    {
      "title": "Practice 1 완주 가이드 ② — 제너레이터 메모리 비교와 월·카테고리 총매출",
      "lang": "python",
      "files": [
        {
          "label": "Python_Practice2_Data.json 내려받기",
          "href": "/practice/Python_Practice2_Data.json"
        }
      ],
      "code": "# [Practice 1 - 후반부] 제너레이터 메모리 비교 + 월·카테고리 그룹 총매출\n# 설명: amount > 1000 행만 yield하는 제너레이터를 만들어\n#       리스트 버전과 메모리 크기를 비교하고,\n#       month·category 기준 총매출 dict를 완성한다\n# 변경내역: v1.0 최초 작성\nimport json                                   # JSON 파일 읽기\nimport sys                                    # getsizeof로 메모리 크기 측정\nfrom collections import defaultdict          # 그룹 합계 누적용\n\ndef load_sales(path):\n    \"\"\"판매 JSON을 읽어 리스트로 반환한다. 실패하면 빈 리스트.\"\"\"\n    try:\n        with open(path, encoding='utf-8') as f:\n            return json.load(f)\n    except (FileNotFoundError, json.JSONDecodeError) as e:\n        print('로딩 실패:', e)\n        return []\n\ndef high_sales(rows):\n    \"\"\"amount가 1000을 초과하는 행만 하나씩 내보내는 제너레이터.\"\"\"\n    for r in rows:                            # 전체를 복사하지 않고\n        if r['amount'] > 1000:                # 조건에 맞는 행만\n            yield r                           # 그때그때 하나씩 내보낸다\n\nsales = load_sales('Python_Practice2_Data.json')\n\n# 3) 리스트 버전 vs 제너레이터 버전 메모리 비교\nas_list = [r for r in sales if r['amount'] > 1000]   # 결과 전부를 메모리에 저장\nas_gen = high_sales(sales)                            # 아직 아무것도 계산 안 함\nprint('리스트:', sys.getsizeof(as_list), 'bytes')\nprint('제너레이터:', sys.getsizeof(as_gen), 'bytes')\n# 주의: list(as_gen)으로 바꿔서 비교하면 감점 — 제너레이터 자체 크기를 재야 한다\nassert sys.getsizeof(as_gen) < sys.getsizeof(as_list)   # Checkpoint 통과\n\n# 4) month·category 그룹 총매출 — defaultdict로 누적 후 컴프리헨션으로 정리\ngroup_total = defaultdict(int)\nfor r in sales:\n    group_total[(r['month'], r['category'])] += r['amount']   # (월, 품목) 키로 합산\nresult = {m + '/' + c: v for (m, c), v in sorted(group_total.items())}\nprint('월·카테고리 총매출:', result)",
      "note": "Practice 1의 3·4번 문제 풀이다. 체크포인트는 sys.getsizeof(제너레이터)가 리스트보다 작음을 확인하는 것인데, list(제너레이터)로 변환해 재면 메모리 차이가 사라져 -2 감점이니 제너레이터 객체 자체를 재야 한다. 월·카테고리 그룹핑은 (month, category) 튜플 키 defaultdict 누적 후 컴프리헨션으로 정리하는 것이 교재가 요구하는 조합이다."
    },
    {
      "title": "Practice 2 완주 가이드 ① — safe_load_csv와 Pydantic SalesRecord 스키마",
      "lang": "python",
      "files": [
        {
          "label": "Python_Practice2_Data.json 내려받기",
          "href": "/practice/Python_Practice2_Data.json"
        }
      ],
      "code": "# [Practice 2 - 전반부] 안전한 파일 로딩 + Pydantic v2 스키마 정의\n# 설명: try/except/finally로 파일을 안전하게 읽고(safe_load_csv),\n#       SalesRecord 모델로 필드 규칙을 선언한다\n# 변경내역: v1.0 최초 작성\nimport json                                    # 이번 실습 데이터는 JSON(강사 공지)\nimport logging                                 # print 대신 단계별 기록\nfrom typing import Optional                    # 있어도 되고 없어도 되는 필드 표기\nfrom pydantic import BaseModel, Field          # 데이터 검증 라이브러리\n\nlogging.basicConfig(level=logging.INFO)        # INFO 이상을 화면에 출력\nlogger = logging.getLogger(__name__)           # 이 모듈 전용 로거\n\ndef safe_load_csv(path):\n    \"\"\"파일을 읽어 dict 리스트 반환, 실패 시 None(문제지 함수명 유지).\"\"\"\n    try:                                       # try 없이 읽으면 감점(-3)\n        with open(path, encoding='utf-8') as f:\n            data = json.load(f)                # JSON을 파이썬 리스트로\n        logger.info('로딩 성공: %d건', len(data))   # 성공 기록\n        return data\n    except FileNotFoundError:                  # 파일이 없을 때만 잡는다\n        logger.error('파일 없음: %s', path)     # 오류 기록 후\n        return None                            # None 반환(Checkpoint)\n    finally:                                   # 성공/실패 모두 실행 — 누락 시 감점(-1)\n        print('로딩 종료')\n\nclass SalesRecord(BaseModel):\n    \"\"\"판매 1건 스키마 — month·region 필수, amount 양수, category 선택.\"\"\"\n    month: str = Field(min_length=1)           # 문제지의 date == 이 파일의 month\n    region: str = Field(min_length=1)          # 빈 문자열이면 검증 실패\n    amount: float = Field(gt=0)                # 0 초과만 허용\n    category: Optional[str] = None             # 없어도 되는 필드\n\n# Checkpoint: 없는 파일은 None, 정상 파일은 건수 확인\nassert safe_load_csv('없는파일.json') is None\nraw = safe_load_csv('Python_Practice2_Data.json')\nprint('로딩 건수:', len(raw))                    # 100\nprint('검증 예시:', SalesRecord(**raw[0]).model_dump())",
      "note": "Practice 2의 1·2번 문제 풀이다. try 없이 파일을 읽으면 -3, finally 블록이 없으면 -1 감점이므로 try/except/finally 3단을 모두 갖추고, 없는 파일에서 None이 나오는지 assert로 자가검증한다. 강사 공지대로 데이터는 Python_Practice2_Data.json이고 문제지의 date는 이 파일의 month 필드로 진행하면 된다."
    },
    {
      "title": "Practice 2 완주 가이드 ② — valid/errors 분리 저장과 재로딩 검증",
      "lang": "python",
      "files": [
        {
          "label": "Python_Practice2_Data.json 내려받기",
          "href": "/practice/Python_Practice2_Data.json"
        }
      ],
      "code": "# [Practice 2 - 후반부] 검증 파이프라인 — valid/errors 분리·저장·재로딩\n# 설명: 레코드를 SalesRecord로 검증해 성공은 valid, 실패는 errors로\n#       나누고, CSV/JSON으로 저장한 뒤 다시 읽어 건수를 검증한다\n# 변경내역: v1.0 최초 작성\nimport csv                                      # valid 저장용\nimport json                                     # 데이터 로딩·errors 저장용\nfrom typing import Optional\nfrom pydantic import BaseModel, Field, ValidationError\n\nclass SalesRecord(BaseModel):\n    \"\"\"판매 1건 스키마 — month·region 필수, amount 양수, category 선택.\"\"\"\n    month: str = Field(min_length=1)\n    region: str = Field(min_length=1)\n    amount: float = Field(gt=0)\n    category: Optional[str] = None\n\nwith open('Python_Practice2_Data.json', encoding='utf-8') as f:\n    raw = json.load(f)                          # 정상 데이터 100건\n\n# 검증 파이프라인 시험용 불량 레코드 3건을 일부러 섞는다\nbad = [{'month': '', 'region': '서울', 'amount': 100, 'category': '전자'},\n       {'month': '2024-05', 'region': '', 'amount': 200, 'category': None},\n       {'month': '2024-05', 'region': '부산', 'amount': -50, 'category': '식품'}]\n\nvalid, errors = [], []                          # 성공/실패를 나눠 담을 그릇\nfor i, row in enumerate(raw + bad):\n    try:\n        rec = SalesRecord(**row)                # 스키마 검증 시도\n        valid.append(rec.model_dump())          # dict 직접 구성은 감점(-1)\n    except ValidationError as e:                # Exception으로 잡으면 감점(-1)\n        errors.append({'row': i, 'error': e.errors()[0]['msg']})\n\n# 저장: valid는 CSV, errors는 JSON — ensure_ascii=False 없으면 한글 깨짐(-1)\nwith open('valid.csv', 'w', newline='', encoding='utf-8') as f:\n    w = csv.DictWriter(f, fieldnames=['month', 'region', 'amount', 'category'])\n    w.writeheader()                             # 첫 줄에 컬럼명\n    w.writerows(valid)                          # 검증 통과분 전체 기록\nwith open('errors.json', 'w', encoding='utf-8') as f:\n    json.dump(errors, f, ensure_ascii=False, indent=2)\n\n# 재로딩 검증: 저장한 CSV를 다시 읽어 건수가 같은지 확인\nwith open('valid.csv', encoding='utf-8') as f:\n    reloaded = list(csv.DictReader(f))\nassert len(reloaded) == len(valid) and len(errors) == 3   # Checkpoint\nprint('valid:', len(valid), '/ errors:', len(errors), '/ 재로딩:', len(reloaded))",
      "note": "Practice 2의 3·4번 문제 풀이다. ValidationError 대신 Exception으로 잡거나(-1) model_dump() 대신 dict를 직접 만들면(-1) 감점이고, errors JSON 저장 시 ensure_ascii=False가 없으면 한글이 깨져 또 -1이다. 배포 데이터 100건은 전부 정상이라 검증 실패를 보려고 불량 3건을 일부러 섞었다 — 교재 샘플 데이터라면 valid 4건/errors 3건이 나온다."
    },
    {
      "title": "실습용 외부 API 카탈로그 — 키 없이 바로 호출 가능",
      "lang": "text",
      "code": "[키 발급 없이 바로 쓰는 무료 API — 실습 추천]\n\n1) JSONPlaceholder — 연습용 가짜 데이터(가장 안전한 첫 연습)\n   https://jsonplaceholder.typicode.com/posts\n\n2) 환율(ER-API) — 실시간 환율, USD 기준 통화별 시세\n   https://open.er-api.com/v6/latest/USD\n\n3) Open-Meteo — 날씨 예보(위도·경도로 조회, 울산 예시)\n   https://api.open-meteo.com/v1/forecast?latitude=35.54&longitude=129.31&current_weather=true\n\n4) 업비트 공개 시세 — 코인 현재가(실시간 데이터 다루기)\n   https://api.upbit.com/v1/ticker?markets=KRW-BTC\n\n5) Nager.Date — 한국 공휴일 목록(날짜 데이터 연습)\n   https://date.nager.at/api/v3/PublicHolidays/2026/KR\n\n6) httpbin — 내가 보낸 요청을 그대로 보여주는 거울(헤더·파라미터 확인)\n   https://httpbin.org/get\n\n[키 발급이 필요한 API — 실무에서 만나는 형태]\n- 공공데이터포털(data.go.kr): 회원가입 후 활용신청 → 승인 → serviceKey 파라미터로 전달\n- OpenAI API 등 유료 API: 키는 반드시 .env 파일에 보관하고 절대 커밋하지 않는다\n\n[호출 전 체크 3가지]\n① timeout을 항상 지정한다(응답이 없으면 무한 대기)\n② raise_for_status()로 실패(4xx/5xx)를 감지한다\n③ 반복문 안에서 과도하게 호출하지 않는다(요청 제한, rate limit)",
      "note": "종합실습 1(데이터 수집 파이프라인)의 API 연동 단계에서 이 중 하나를 골라 쓰면 된다. 어떤 API든 '주소 → 상태코드 확인 → json() 파싱' 3단계는 동일하다."
    },
    {
      "title": "외부 API 호출 기본형 — 환율을 안전하게 받아오기",
      "lang": "python",
      "code": "# 외부 API 호출의 표준 골격 — 어떤 API로 바꿔도 이 3단계는 같다\nimport requests                                    # pip install requests\n\nURL = \"https://open.er-api.com/v6/latest/USD\"      # 무료 환율 API(키 불필요)\n\ndef get_krw_rate():\n    \"\"\"원/달러 환율을 받아온다 — 실패하면 None을 돌려준다\"\"\"\n    try:\n        r = requests.get(URL, timeout=5)           # ① timeout 필수: 5초 안에 응답 없으면 포기\n        r.raise_for_status()                       # ② 4xx/5xx면 여기서 예외 발생\n        data = r.json()                            # ③ JSON 응답 → 파이썬 dict\n        return data[\"rates\"][\"KRW\"]                # 중첩 dict에서 원화 환율만 추출\n    except requests.Timeout:                       # 시간 초과 — 네트워크 문제\n        print(\"응답 시간 초과 — 잠시 후 다시 시도하세요\")\n    except requests.HTTPError as e:                # 서버가 오류 상태코드를 반환\n        print(\"HTTP 오류:\", e.response.status_code)\n    except (KeyError, ValueError):                 # 응답 구조가 예상과 다름\n        print(\"응답 형식이 예상과 다릅니다\")\n    return None\n\nrate = get_krw_rate()\nif rate:                                           # None 체크 후 사용 — 방어적 코딩\n    print(\"1 USD =\", round(rate, 1), \"KRW\")",
      "note": "try/except로 시간초과·HTTP 오류·형식 오류를 각각 잡는 것이 평가 기준의 '오류/예외 처리(35점)'에 그대로 대응한다. 종합실습에선 이 골격을 httpx.AsyncClient로 바꿔 비동기 수집으로 확장한다."
    },
    {
      "title": "API가 뭐예요? — 식당 주문으로 이해하는 개념 (비전공자용)",
      "lang": "text",
      "code": "[API = 식당의 주문 창구]\n\n· 내가 주방에 직접 들어가 요리하지 않는다 → 주문서(요청)를 내면 음식(응답)이 나온다\n· API도 같다: 남의 서버(주방)에 직접 들어갈 수 없으니,\n  정해진 주소(창구)로 요청을 보내면 데이터(음식)를 받는다\n\n[요청 주소(URL) 읽는 법]\n  https://open.er-api.com/v6/latest/USD\n  └─ 가게 주소 ──┘└── 메뉴(경로) ──┘\n\n  https://api.upbit.com/v1/ticker?markets=KRW-BTC\n                                 └ ? 뒤는 주문 옵션(파라미터) : \"비트코인으로 주세요\"\n\n[응답은 JSON — 어제 배운 딕셔너리와 똑같이 생겼다]\n  {\"result\": \"success\", \"rates\": {\"KRW\": 1390.5, \"JPY\": 155.2}}\n  → 파이썬에서 r.json() 하면 그대로 dict가 된다 → data[\"rates\"][\"KRW\"] 로 꺼낸다\n\n[지금 바로 해보기 — 코드 없이!]\n  1) 브라우저 주소창에 https://open.er-api.com/v6/latest/USD 를 붙여넣는다\n  2) 화면에 보이는 글자 덩어리가 바로 JSON 응답이다\n  3) 그 안에서 KRW 를 찾아보자 — 파이썬은 이걸 자동으로 꺼내주는 것뿐이다",
      "note": "API는 '남이 만들어 둔 데이터 자판기'다. 주소를 알고, 버튼(요청)을 누르고, 나온 것(JSON)을 받아 쓰면 된다. 브라우저로 먼저 열어보면 파이썬 코드가 하는 일이 눈에 보인다."
    },
    {
      "title": "따라하기 — 파이썬 3줄로 첫 API 호출 (비전공자용)",
      "lang": "python",
      "code": "# 첫 API 호출 — 딱 3단계만 기억하자: 요청 → 변환 → 꺼내기\nimport requests                                  # 인터넷 요청 도구(설치: pip install requests)\n\n# [1단계] 요청 보내기 — 브라우저 주소창에 치는 것과 같은 일\nr = requests.get(\"https://open.er-api.com/v6/latest/USD\", timeout=5)\nprint(r.status_code)                             # 200이 나오면 성공! (404=주소 틀림, 500=서버 문제)\n\n# [2단계] JSON → 딕셔너리로 변환\ndata = r.json()                                  # 글자 덩어리(JSON)가 파이썬 dict로 변신\nprint(type(data))                                # <class 'dict'> — 우리가 아는 딕셔너리다\nprint(list(data.keys()))                         # 어떤 키가 있는지 먼저 구경\n\n# [3단계] 원하는 값 꺼내기 — 딕셔너리 인덱싱 그대로\nrates = data[\"rates\"]                            # 통화별 환율이 담긴 안쪽 딕셔너리\nprint(\"1달러 =\", rates[\"KRW\"], \"원\")             # 원화 환율\nprint(\"1달러 =\", rates[\"JPY\"], \"엔\")             # 엔화 환율\n\n# 연습: 위 주소의 USD를 EUR로 바꾸면? → 1유로 기준 환율이 나온다",
      "note": "모르는 API를 만나면 항상 print(list(data.keys()))로 구조부터 구경하자 — 지도 없이 길을 걷지 않는 것과 같다. 3단계(요청→변환→꺼내기)만 익히면 어떤 API든 똑같이 쓸 수 있다."
    },
    {
      "title": "종합실습 1 지정 API — countries.dev 국가 정보 조회 (보완 안내)",
      "lang": "python",
      "code": "# [종합실습 1 보완 안내] 기존 API가 유료화되어 countries.dev 로 진행한다 (강사 공지 7/15)\n#  · 국가 단건 조회: https://countries.dev/alpha/{코드}  — alpha-2(KR) / alpha-3(KOR) 모두, 대소문자 무관\n#  · 문서: https://countries.dev/docs  (응답 포맷 · 에러코드 · 요청 제한은 docs 하위 참조)\n#  · Git 커밋은 최종 1회로 제출 (여러 번 나누는 건 실무에서!)\nimport requests\n\ndef get_country(code):\n    \"\"\"국가 코드(KR·KOR 등)로 국가 정보를 조회한다\"\"\"\n    url = \"https://countries.dev/alpha/\" + code        # 엔드포인트에 코드만 바꿔 끼운다\n    try:\n        r = requests.get(url, timeout=5)               # timeout 필수\n        r.raise_for_status()                           # 잘못된 코드면 4xx → 예외\n        return r.json()                                # dict 로 변환\n    except requests.RequestException as e:             # 네트워크·HTTP 오류 통합 처리\n        print(\"조회 실패:\", code, \"-\", e)\n        return None\n\nkr = get_country(\"KR\")                                 # alpha-2 코드 (KOR 도 동일 결과)\nif kr:\n    print(kr[\"name\"], kr[\"flag\"])                      # Korea (Republic of) 🇰🇷\n    print(\"수도:\", kr[\"capital\"])                      # Seoul\n    print(\"인구:\", format(kr[\"population\"], \",\"))      # 51,780,579\n    print(\"통화:\", kr[\"currencies\"][0][\"code\"])        # KRW — 리스트 안의 dict 주의!\n    print(\"시간대:\", kr[\"timezones\"])                  # ['UTC+09:00']\n\n# 응답 주요 필드: name·capital·population·region·currencies(리스트)·languages(리스트)·borders·flag\n# 여러 나라 수집: [\"KR\",\"US\",\"JP\",\"DE\"] 를 반복 조회 → 종합실습의 비동기(httpx) 수집으로 확장",
      "note": "실제 응답을 확인하고 쓴 예제다 — currencies·languages 는 '리스트 안에 dict'라 [0]으로 먼저 꺼내야 한다. 잘못된 코드를 넣으면 4xx가 오므로 raise_for_status 예외 처리가 평가(오류/예외 35점)와 직결된다."
    },
    {
      "title": "실습 데이터 파일 정정 안내 — Practice1 json 대신 Practice2 json (7/20 공지)",
      "lang": "text",
      "code": "[정정] Python_Practice1_Data.json 파일은 JSON 로딩 시 오류가 납니다.\n  → Python_Practice2_Data.json (약 8.2KB)으로 대체해서 실습하세요.\n\n[확인 방법] 파일이 정상인지 먼저 검사한 뒤 본 실습으로 넘어가면 시간을 아낀다\nimport json\n\ntry:\n    # 인코딩을 명시해야 한글 데이터에서 깨짐·오류가 나지 않는다\n    with open(\"Python_Practice2_Data.json\", encoding=\"utf-8\") as f:\n        data = json.load(f)\n    # 최상위 자료형과 개수를 먼저 확인해 구조를 파악한다\n    print(type(data), len(data))\n    # 첫 레코드의 키 목록을 보면 어떤 필드가 있는지 바로 보인다\n    print(data[0].keys() if isinstance(data, list) else list(data)[:5])\nexcept json.JSONDecodeError as e:\n    # 어느 줄·어느 위치에서 깨졌는지 알려 준다 — 파일 손상 여부 판별의 핵심\n    print(\"JSON 형식 오류:\", e.lineno, e.colno, e.msg)\nexcept FileNotFoundError:\n    print(\"파일 경로를 확인하세요. 노트북과 같은 폴더에 두는 것이 가장 간단합니다.\")\n\n[실습 진행 구조 — 광주 1~4반 기준]\n  Practice 1 (오전) → Practice 2 (오후) → 종합 실습 1 (마감 전)\n  · 각 실습은 채널의 해당 안내 메시지에 \"댓글(스레드)로 코드 제출\"\n  · 제출 마감은 익일 오전 9시\n  · 수정본은 기존 댓글을 고치지 말고 새 댓글로 추가 게시할 것\n\n[참고 자료]\n  · 파이썬 입문 교재 소스코드 모음: github.com/comstudy21joon/python\n  · 점프 투 파이썬 (문법이 아직 낯설다면): wikidocs.net/book/1",
      "note": "Practice 1 데이터 파일이 손상돼 있어 실습 자체가 시작되지 않는 사고가 있었고, 대체 파일로 진행하라는 공지가 나왔다. 남의 데이터 파일을 받아 쓸 때는 본 실습 코드를 짜기 전에 json.load를 한 번 감싸서 열어 보는 습관이 시간을 가장 크게 아껴 준다 — JSONDecodeError는 깨진 줄·열 번호까지 알려 주므로 파일 문제인지 내 코드 문제인지 즉시 갈린다."
    },
    {
      "title": "데코레이터 기초 — 함수를 포장지로 감싸기 (이전 기수 교재 보완)",
      "lang": "python",
      "code": "# 데코레이터는 \"함수를 받아서 새 함수를 돌려주는 함수\"다\ndef my_decorator(func):\n    # wrapper 가 원래 함수를 감싸는 포장지 역할을 한다\n    def wrapper(*args, **kwargs):\n        # 원래 함수가 실행되기 직전에 끼어드는 자리\n        print(\"[포장지] 실행 전\")\n        # 받은 인자를 그대로 원래 함수에 넘겨준다\n        result = func(*args, **kwargs)\n        # 원래 함수가 끝난 직후에 끼어드는 자리\n        print(\"[포장지] 실행 후\")\n        # 원래 함수의 결과를 그대로 돌려줘야 값이 사라지지 않는다\n        return result\n    # 감싼 함수 자체를 반환한다 (호출하지 않고 이름만 반환)\n    return wrapper\n\n# @ 기호는 add = my_decorator(add) 와 완전히 같은 뜻이다\n@my_decorator\ndef add(a, b):\n    # 원래 함수는 자기 일만 하면 된다 (출력 코드가 섞이지 않는다)\n    return a + b\n\n# 호출하면 포장지 -> 원래 함수 -> 포장지 순서로 실행된다\nprint(add(3, 5))",
      "note": "이전 기수 교재 10장(데코레이터/클로저 구조)의 기초 설명을 재구성했다. 현행 교안에는 functools 활용 예제는 있지만 데코레이터를 밑바닥부터 만들어 보는 단계가 없어 보완용으로 넣었다. *args, **kwargs 로 받아 그대로 넘기고 result 를 반드시 return 하는 것이 골격이다."
    },
    {
      "title": "functools.wraps — 데코레이터가 훔쳐간 함수 이름 되돌리기 (이전 기수 교재 보완)",
      "lang": "python",
      "code": "import functools\n\n# 1) wraps 없이 감싸면 원래 함수의 정체가 지워진다\ndef bad_decorator(func):\n    def wrapper():\n        \"\"\"이것은 포장지 함수입니다.\"\"\"\n        return func()\n    return wrapper\n\n# 2) wraps 를 붙이면 이름과 설명을 원본에서 복사해 온다\ndef good_decorator(func):\n    @functools.wraps(func)\n    def wrapper():\n        \"\"\"이것은 포장지 함수입니다.\"\"\"\n        return func()\n    return wrapper\n\n# 같은 원본 함수를 두 데코레이터로 각각 감싸 본다\ndef say_hello():\n    \"\"\"인사를 하는 함수입니다.\"\"\"\n    print(\"안녕하세요!\")\n\nbad = bad_decorator(say_hello)\ngood = good_decorator(say_hello)\n\n# wraps 가 없으면 정체가 포장지 것으로 바뀐다\nprint(bad.__name__, \"|\", bad.__doc__)    # wrapper | 이것은 포장지 함수입니다.\n# wraps 가 있으면 원래 이름과 설명이 살아 있다\nprint(good.__name__, \"|\", good.__doc__)  # say_hello | 인사를 하는 함수입니다.",
      "note": "이전 기수 교재 10장의 functools.wraps 단원을 두 경우 비교 형태로 재서술했다. 데코레이터를 쓰면 __name__ 과 __doc__ 이 포장지 것으로 바뀌는데, 이는 로깅이나 자동 문서화에서 엉뚱한 이름이 찍히는 실제 사고로 이어진다. 데코레이터를 만들 때 wraps 는 사실상 필수 습관이다."
    },
    {
      "title": "logging 3단 구조 — 콘솔·전체파일·에러파일 나눠 남기기 (이전 기수 교재 보완)",
      "lang": "python",
      "code": "import logging, os\nfrom logging.handlers import TimedRotatingFileHandler\n\nos.makedirs(\"logs\", exist_ok=True)  # 로그 폴더를 미리 만든다\nlogger = logging.getLogger(\"MyApp\")  # 이름을 가진 로거 (모듈별로 나누면 추적이 쉽다)\nlogger.setLevel(logging.DEBUG)       # 로거는 다 통과시키고, 걸러내기는 핸들러가 맡는다\n\n# 파일에는 시각, 레벨, 파일명, 줄번호까지 남겨야 나중에 원인을 찾는다\ndetail = logging.Formatter(\"%(asctime)s | %(levelname)s | %(filename)s:%(lineno)d | %(message)s\")\nbrief = logging.Formatter(\"[%(levelname)s] %(message)s\")  # 콘솔은 간결하게\n\n# 1) 콘솔은 INFO 이상, 2) 전체 파일은 DEBUG 이상, 3) 에러 파일은 ERROR 이상\nconsole = logging.StreamHandler()\ndaily = TimedRotatingFileHandler(\"logs/app.log\", when=\"midnight\", backupCount=7, encoding=\"utf-8\")\nerrors = logging.FileHandler(\"logs/error.log\", encoding=\"utf-8\")\n\n# 핸들러마다 통과 레벨과 포맷을 다르게 걸어 준다\nfor handler, level, fmt in ((console, logging.INFO, brief),\n                            (daily, logging.DEBUG, detail),\n                            (errors, logging.ERROR, detail)):\n    handler.setLevel(level)\n    handler.setFormatter(fmt)\n    logger.addHandler(handler)  # 한 번의 로그가 세 갈래로 흐른다\n\n# 같은 방식의 호출이지만 레벨에 따라 도착하는 곳이 달라진다\nlogger.debug(\"디버그 정보\")   # 전체 파일에만\nlogger.info(\"정상 흐름\")      # 콘솔 + 전체 파일\nlogger.error(\"에러 발생\")     # 콘솔 + 전체 파일 + 에러 파일",
      "note": "이전 기수 교재 7장(logging 로깅 구조 설계)의 핵심 구조를 재구성했다. print 는 레벨 구분도 보관도 안 되기 때문에 운영 중 문제를 재현할 수 없다는 것이 출발점이다. 로거는 통과만 시키고 걸러내기는 핸들러가 한다는 역할 분담이 이 구조를 이해하는 열쇠다."
    },
    {
      "title": "사용자 정의 예외 — 내 프로그램 전용 오류 이름 만들기 (이전 기수 교재 보완)",
      "lang": "python",
      "code": "# Exception 을 상속하면 그것만으로 새로운 예외 종류가 된다\nclass DataError(Exception):\n    \"\"\"데이터 처리 중 생긴 문제를 묶는 상위 예외\"\"\"\n\n# 상위 예외를 다시 상속해 더 구체적인 상황으로 가지를 친다\nclass MissingFieldError(DataError):\n    def __init__(self, field):\n        self.field = field  # 어떤 항목이 비었는지 예외 안에 담아 둔다\n        super().__init__(\"필수 항목이 비었습니다: \" + field)  # 메시지는 부모에게\n\nclass OutOfRangeError(DataError):\n    def __init__(self, value):\n        self.value = value\n        super().__init__(\"허용 범위를 벗어났습니다: \" + str(value))\n\n# 검증 함수는 문제를 직접 처리하지 않고 예외로 호출한 쪽에 알린다\ndef check_record(record):\n    if not record.get(\"name\"):\n        raise MissingFieldError(\"name\")\n    if record.get(\"age\", -1) < 0:\n        raise OutOfRangeError(record.get(\"age\"))\n    return True\n\nrows = [{\"name\": \"철수\", \"age\": 25}, {\"name\": \"\", \"age\": 30}, {\"name\": \"영희\", \"age\": -5}]\nfor row in rows:\n    try:\n        check_record(row)\n        print(\"정상:\", row)\n    except DataError as e:  # 상위 예외 하나만 잡아도 하위 예외가 모두 걸린다\n        print(\"문제 발견 [\" + type(e).__name__ + \"]\", e)  # 종류까지 구분해 기록",
      "note": "이전 기수 교재 9장(예외처리)의 사용자 정의 예외 단원을 계층 구조로 확장해 재서술했다. ValueError 같은 범용 예외만 쓰면 내 로직이 낸 오류인지 라이브러리가 낸 오류인지 구분되지 않는다. 상위 예외 하나를 두고 상속으로 가지를 치면 except 한 줄로 내 오류만 골라 잡을 수 있다."
    },
    {
      "title": "__slots__ — 객체 수백만 개일 때 메모리 줄이기 (이전 기수 교재 보완)",
      "lang": "python",
      "code": "import tracemalloc\n\n# 일반 클래스는 속성을 __dict__ 라는 사전에 담아 자유롭게 늘릴 수 있다\nclass NoSlots:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\n# __slots__ 를 선언하면 지정한 속성만 고정 자리에 저장한다\nclass WithSlots:\n    __slots__ = (\"x\", \"y\")  # 여기 적힌 이름 외의 속성은 아예 만들 수 없다\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\n# 느낌이 아니라 실제 측정으로 차이를 확인한다\ndef peak_kb(cls, n=10000):\n    tracemalloc.start()\n    objs = [cls(i, i) for i in range(n)]\n    peak = tracemalloc.get_traced_memory()[1]  # 최고 사용량\n    tracemalloc.stop()\n    print(cls.__name__, len(objs), \"개 ->\", round(peak / 1024, 2), \"KB\")\n\npeak_kb(NoSlots)\npeak_kb(WithSlots)\n\n# 대신 유연성은 사라진다 - 없는 속성을 붙이면 즉시 오류가 난다\ntry:\n    WithSlots(1, 2).z = 3\nexcept AttributeError as e:\n    print(\"슬롯에 없는 속성이라 거부됨:\", e)",
      "note": "이전 기수 교재 8장(객체지향)의 __slots__ 와 메모리 측정 단원을 재구성했다. 현행 교안의 dataclass 카드가 \"구조를 깔끔하게\"에 초점을 둔다면 이쪽은 \"같은 구조를 싸게\"에 해당한다. 속성이 고정된 경량 객체를 대량 생성할 때만 쓰고, 동적으로 속성을 붙여야 하면 쓰지 않는 것이 판단 기준이다."
    }
  ],
  "python-2": [
    {
      "title": "업종별 매출 합계 상위 뽑고 막대그래프를 파일로 저장하기",
      "lang": "python",
      "code": "import pandas as pd                       # 표 처리\nimport matplotlib.pyplot as plt          # 그래프 그리기\n\n# 서울시 상권 추정매출을 흉내 낸 작은 표 (실전은 공공데이터 CSV 사용)\ndf = pd.DataFrame({\n    \"서비스_업종\": [\"한식\", \"카페\", \"한식\", \"편의점\", \"카페\", \"미용실\"],\n    \"당월_매출\": [820, 310, 640, 450, 280, 190],       # 단위: 만원\n    \"연령대_10\": [20, 60, 15, 90, 70, 10],             # 10대 매출\n    \"연령대_20\": [180, 140, 150, 160, 120, 60],        # 20대 매출\n    \"연령대_30\": [260, 80, 210, 120, 70, 80],          # 30대 매출\n})\n\n# 업종별로 묶어 합계 → 내림차순 정렬 → 상위 3개만 (실전은 상위 10개)\ntop = df.groupby(\"서비스_업종\")[\"당월_매출\"].sum().sort_values(ascending=False).head(3)\nprint(top)                                # 한식 1460, 카페 590, 편의점 450 순서\n\n# 연령대 3개 열의 열별 합계로 막대그래프를 그려 '파일로' 저장\nages = df[[\"연령대_10\", \"연령대_20\", \"연령대_30\"]].sum()   # 열마다 합계 1개씩\nages.plot(kind=\"bar\", title=\"age sales\")   # 합계 3개를 막대그래프로\nplt.tight_layout()                        # 글자가 잘리지 않게 여백 자동 조정\nplt.savefig(\"age_sales.png\")              # 화면 표시 대신 PNG 파일로 저장\nprint(\"age_sales.png 저장 완료\")           # 보고서에 바로 붙일 이미지 완성",
      "note": "윤선영 실습교수의 종합실습2 3~4번(서비스 업종별 당월 매출 합계를 내림차순 상위 10개로 뽑고, 연령대 3개 칼럼 합계로 bar 그래프를 그려 파일 저장)을 축소한 것이다. groupby 뒤에 sort_values 와 head 를 이어 붙여 상위 N 개를 뽑는 체인과, plt.show 대신 savefig 로 결과를 이미지 파일로 남기는 습관이 핵심이다."
    },
    {
      "title": "ColumnTransformer — 숫자 열과 글자 열을 각각 다르게 전처리해 결합",
      "lang": "python",
      "code": "import pandas as pd                                    # 표 처리\nfrom sklearn.pipeline import Pipeline                  # 처리 단계 묶기\nfrom sklearn.compose import ColumnTransformer          # 열 종류별로 다른 처리 적용\nfrom sklearn.impute import SimpleImputer               # 결측치(빈칸) 채우기\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder  # 표준화·원핫\nfrom sklearn.linear_model import LinearRegression      # 회귀 모델\n\n# 수치형 열 전용: 빈칸은 중앙값으로 채우고 → 크기를 표준화\nnum_pipe = Pipeline([(\"결측\", SimpleImputer(strategy=\"median\")),\n                     (\"스케일\", StandardScaler())])\n# 범주형 열 전용: 빈칸은 \"missing\" 글자로 채우고 → 원핫인코딩(0/1 표로 변환)\ncat_pipe = Pipeline([(\"결측\", SimpleImputer(strategy=\"constant\", fill_value=\"missing\")),\n                     (\"원핫\", OneHotEncoder(handle_unknown=\"ignore\"))])\n\n# 두 파이프라인을 '열 이름 기준'으로 하나로 결합\npre = ColumnTransformer([\n    (\"수치\", num_pipe, [\"연령대_10\", \"연령대_20\", \"연령대_30\"]),   # 숫자 열 3개는 이쪽\n    (\"범주\", cat_pipe, [\"상권_구분\"]),                             # 글자 열 1개는 저쪽\n])\n\nmodel = Pipeline([(\"전처리\", pre), (\"회귀\", LinearRegression())])   # 전처리+모델 완성\nX = pd.DataFrame({\"연령대_10\": [20, None, 15], \"연령대_20\": [180, 140, 150],\n                  \"연령대_30\": [260, 80, None], \"상권_구분\": [\"골목\", None, \"발달\"]})\ny = [820, 310, 640]                                    # 정답: 당월 매출(만원)\nmodel.fit(X, y)                                        # 빈칸이 있어도 그대로 학습된다\nprint(\"예측:\", model.predict(X).round(1))               # 학습 데이터로 예측 확인",
      "note": "윤선영 실습교수의 종합실습2 5~6번(수치형 파이프라인 + 범주형 파이프라인을 하나로 결합해 최종 모델 파이프라인 완성, 연령대 매출로 당월 매출 예측)을 재구성했다. 기존 예제의 Pipeline 이 한 종류 전처리만 다뤘다면, 여기서는 ColumnTransformer 로 숫자 열과 글자 열에 서로 다른 전처리를 동시에 적용하는 실무 표준 패턴을 배운다. 결측치가 섞인 원본을 손대지 않고 fit 한 번으로 끝나는 것이 매력이다."
    },
    {
      "title": "실습3: IQR 이상치 제거 후 named aggregation 집계 (Practice 3)",
      "lang": "python",
      "code": "# 실습3(Practice 3): sales_100k.csv 흐름 — EDA -> IQR 이상치 제거 -> 집계\nimport pandas as pd  # 표 데이터 처리\n\n# 실제 실습은 10만 행 CSV. 여기선 작은 표로 흐름만 재현(999999 는 이상치)\ndf = pd.DataFrame({\n    'region':   ['서울', '서울', '부산', '부산', '서울', '부산'],\n    'category': ['가전', '식품', '가전', '식품', '가전', '식품'],\n    'amount':   [1200, 300, 2000, 500, 999999, 700],\n})\nprint(df.info())          # 컬럼·타입·결측치 한눈에(EDA 첫걸음)\nprint(df.isnull().sum())  # 컬럼별 결측치 개수\n\n# 1) IQR(사분위 범위)로 정상 범위를 계산한다\nQ1 = df['amount'].quantile(0.25)  # 하위 25% 값\nQ3 = df['amount'].quantile(0.75)  # 상위 25% 값\nIQR = Q3 - Q1                      # 사분위 범위\nlow, high = Q1 - 1.5 * IQR, Q3 + 1.5 * IQR  # 정상으로 볼 하한·상한\n\nbefore = len(df)                            # 제거 전 행수\nclean = df[df['amount'].between(low, high)]  # 정상 범위 안만 남김\nprint('제거 전:', before, '-> 제거 후:', len(clean))  # 이상치 빠짐 확인\n\n# 2) named aggregation: 결과 컬럼명을 직접 지정해 지역·품목별 집계\nresult = (clean.groupby(['region', 'category'])\n          .agg(total=('amount', 'sum'),   # 총매출\n               mean=('amount', 'mean'),   # 평균\n               cnt=('amount', 'count'))   # 건수\n          .sort_values('total', ascending=False))  # 총매출 내림차순\nprint(result)",
      "note": "Checkpoint 그대로: between(Q1-1.5*IQR, Q3+1.5*IQR)로 IQR 범위를 잡고 제거 전·후 행수를 출력, groupby는 total=(\"amount\",\"sum\") 형태의 named aggregation으로 컬럼명을 지정해야 감점(-20)을 피한다."
    },
    {
      "title": "실습3: DuckDB로 DataFrame에 바로 SQL 집계 (Practice 3)",
      "lang": "python",
      "code": "# 실습3(Practice 3): 같은 집계를 SQL 로 — Pandas/Polars/DuckDB 3종 비교의 한 축\nimport duckdb   # pip install duckdb, CSV/DataFrame 에 직접 SQL 을 실행\nimport pandas as pd\n\ndf = pd.DataFrame({\n    'region':   ['서울', '서울', '부산', '부산'],\n    'category': ['가전', '식품', '가전', '식품'],\n    'amount':   [1200, 300, 2000, 500],\n})\n\n# 파이썬 변수 df 를 그대로 테이블처럼 쓴다(별도 적재 없이 FROM df)\nsql = '''\n    SELECT region, category,\n           SUM(amount) AS total,   -- 총매출\n           COUNT(*)    AS cnt       -- 건수\n    FROM df\n    GROUP BY region, category\n    ORDER BY total DESC             -- 총매출 내림차순\n'''\nresult = duckdb.query(sql).to_df()  # 결과를 다시 DataFrame 으로 받는다\nprint(result)\n\n# Practice 3 핵심: 같은 집계를 Pandas groupby / Polars Lazy / DuckDB SQL 로 짜고\n# timeit 으로 '동일 반복 횟수'를 맞춰 실행 시간을 공정 비교하는 것.",
      "note": "DuckDB는 커리큘럼(Polars+DuckDB) 필수인데 사이트에 예제가 없었다. timeit 비교 시 세 도구의 number(반복 횟수)를 통일하지 않으면 공정 비교가 아니라 감점 대상이라는 점을 note로 강조한다."
    },
    {
      "title": "실습4: 카이제곱 검정 — 두 범주형 변수의 독립성 (Practice 4)",
      "lang": "python",
      "code": "# 실습4(Practice 4): 지역과 결제수단이 서로 관련 있는가(범주형 vs 범주형)\nimport pandas as pd\nfrom scipy.stats import chi2_contingency  # 카이제곱 독립성 검정 함수\n\ndf = pd.DataFrame({\n    'region': ['서울', '서울', '부산', '부산', '서울', '부산', '서울', '부산'],\n    'pay':    ['카드', '현금', '카드', '카드', '현금', '현금', '카드', '현금'],\n})\n\n# 1) 두 범주형 변수로 분할표(교차표)를 만든다\ntable = pd.crosstab(df['region'], df['pay'])\nprint(table)\n\n# 2) 카이제곱 검정: 지역과 결제수단이 독립인지 검정\nchi2, p, dof, expected = chi2_contingency(table)\nprint('카이제곱:', round(chi2, 3), 'p-value:', round(p, 3))\n\n# 3) 해석은 반드시 코드/주석으로 남긴다(수치만 출력하면 감점)\nif p < 0.05:\n    print('=> p<0.05: 지역과 결제수단은 독립이 아니다(관련 있음)')\nelse:\n    print('=> p>=0.05: 독립이 아니라고 볼 근거가 부족하다')",
      "note": "Practice 4는 t-test 외에 chi2_contingency로 범주형 독립성까지 요구한다. Checkpoint가 \"p<0.05 유의미 여부 판단을 코드/주석으로 남기지 않으면 -20\"이라, 판정 분기를 반드시 넣는 습관을 보여준다."
    },
    {
      "title": "pivot_table 과 merge — 엑셀 피벗과 SQL JOIN 을 Pandas 로",
      "lang": "python",
      "code": "import pandas as pd                # 표 처리 라이브러리\n\n# 매출 표: 고객·지역·분류별 거래 기록\nsales = pd.DataFrame({\n    'customer_id': [1, 2, 1, 3],                    # 고객 번호\n    'region': ['서울', '부산', '서울', '부산'],       # 지역\n    'category': ['가전', '식품', '식품', '가전'],     # 상품 분류\n    'amount': [1200, 300, 500, 2000],               # 매출액\n})\n# 고객 표: 고객 번호와 등급(다른 파일에서 온 표라고 가정)\ncust = pd.DataFrame({'customer_id': [1, 2, 3], 'grade': ['VIP', '일반', '일반']})\n\n# 1) pivot_table: 엑셀 피벗과 동일 - 행=지역, 열=분류, 값=매출 합계\npivot = sales.pivot_table(values='amount', index='region',\n                          columns='category', aggfunc='sum', fill_value=0)\nprint(pivot)                       # 지역 x 분류 매출 교차표 완성\n\n# 2) merge: SQL 의 LEFT JOIN - 고객 등급을 매출 표에 붙인다\njoined = pd.merge(sales, cust, on='customer_id', how='left')\nprint(joined[['customer_id', 'amount', 'grade']])   # 등급이 붙은 매출 표\n\n# 3) 결합했으니 등급별 매출 합계도 한 줄\nprint(joined.groupby('grade')['amount'].sum())      # VIP 1700, 일반 2300",
      "note": "pivot_table 은 행·열 두 축으로 펼쳐 보는 교차 집계, merge 는 두 표를 공통 키로 잇는 SQL JOIN 이다. 다른 출처의 표를 merge 로 붙인 뒤 groupby·pivot 으로 집계하는 것이 실무 분석의 기본 결합 흐름이다."
    },
    {
      "title": "Pandas 2.x Copy-on-Write — 걸러낸 조각을 고칠 때의 함정",
      "lang": "python",
      "code": "import pandas as pd                # Pandas 2.x 부터 Copy-on-Write 가 기본이다\n\ndf = pd.DataFrame({'region': ['서울', '부산', '서울'],\n                   'amount': [1000, 2000, 3000]})   # 원본 매출 표\n\n# [위험] 조건으로 걸러낸 조각은 '뷰'라서 바로 대입하면 경고/오류가 난다\nseoul = df[df['region'] == '서울']          # 이 시점의 seoul 은 원본을 비추는 뷰\n# seoul['amount'] = seoul['amount'] * 1.1  # <- ChainedAssignment 경고! (2.x)\n\n# [안전 1] copy() 로 원본과 연결을 끊은 복사본을 만들어 수정한다\nseoul = df[df['region'] == '서울'].copy()  # 독립된 내 표\nseoul['amount'] = seoul['amount'] * 1.1    # 마음껏 수정 가능\nprint(seoul)                               # 서울 행만 10% 인상된 복사본\n\n# [안전 2] 원본 자체를 고치려면 .loc 으로 조건과 열을 한 번에 지정한다\ndf.loc[df['region'] == '서울', 'amount'] *= 1.1   # 원본 직접 수정(경고 없음)\nprint(df)                                  # 원본에서도 서울 행만 인상됨",
      "note": "Pandas 2.x 는 Copy-on-Write 가 기본이라, 걸러낸 뷰에 연쇄 대입하면 경고가 나고 의도대로 안 바뀔 수 있다. 복사본을 원하면 .copy(), 원본 수정이 목적이면 .loc 한 줄 — 이 두 패턴만 지키면 가장 흔한 Pandas 사고를 예방한다."
    },
    {
      "title": "apply 대신 벡터화 — str·dt 접근자로 열 전체를 한 번에",
      "lang": "python",
      "code": "import pandas as pd                # 표 처리 라이브러리\n\ndf = pd.DataFrame({\n    'name': ['kim', 'lee', 'park'] * 1000,                        # 고객명 3000건\n    'date': ['2026-01-05', '2026-02-14', '2026-03-01'] * 1000,    # 주문일 3000건\n})\n\n# [느린 방법] apply: 행마다 파이썬 함수를 호출한다(사실상 파이썬 루프)\ndf['upper1'] = df['name'].apply(lambda x: x.upper())\n\n# [빠른 방법] str 접근자: C 레벨에서 열 전체를 한 번에 처리(벡터화)\ndf['upper2'] = df['name'].str.upper()      # 100만 행 기준 수십 배 빠르다\n\n# 날짜도 마찬가지 - dt 접근자로 연·월·요일을 한 번에 뽑는다\ndf['date'] = pd.to_datetime(df['date'])    # 문자열을 날짜 타입으로 변환\ndf['month'] = df['date'].dt.month          # 월 추출\ndf['weekday'] = df['date'].dt.day_name()   # 요일 이름 추출\nprint(df[['name', 'upper2', 'month', 'weekday']].head(3))\n\n# 습관: apply 를 쓰기 전에 'str/dt/산술 벡터 연산으로 되는가'를 먼저 묻는다",
      "note": "apply 는 편하지만 행마다 파이썬 함수를 부르는 루프라 느리고, str.upper()·dt.month 같은 벡터화 연산은 C 수준에서 열 전체를 처리해 수십 배 빠르다. 교재 실측 기준 100만 행에서 apply 약 3.2초, str 접근자 약 0.08초로 40배 차이가 난다."
    },
    {
      "title": "schedule 로 매일 아침 리포트 자동 실행 — 반복 분석 자동화",
      "lang": "python",
      "code": "import schedule                    # pip install schedule - 파이썬 안의 간단한 스케줄러\nimport time                        # 대기 루프용\nimport logging                     # 성공/실패를 기록으로 남기기 위해\n\nlogging.basicConfig(level=logging.INFO)    # 실행 기록을 화면에 출력\n\ndef run_daily_report():            # 매일 반복할 분석 작업 한 덩어리\n    try:                           # 자동 실행은 실패해도 프로그램이 죽으면 안 된다\n        # df = load_and_clean('sales.csv')   # 1) 데이터 적재·정제\n        # stats = compute_stats(df)          # 2) 통계 계산\n        # render_report(stats)               # 3) 리포트 파일 생성\n        logging.info('아침 리포트 생성 완료')          # 성공 기록\n    except Exception as e:\n        logging.error('리포트 실패: ' + str(e))       # 실패도 기록으로 남긴다\n\nschedule.every().day.at('08:00').do(run_daily_report)     # 매일 아침 8시\nschedule.every().monday.at('09:00').do(run_daily_report)  # 매주 월요일 9시(주간판)\nschedule.every(1).hours.do(run_daily_report)              # 매시간(새 데이터 확인용)\n\nwhile True:                        # 프로그램을 켜 두면\n    schedule.run_pending()         # 예약 시각이 된 작업을 실행하고\n    time.sleep(60)                 # 1분마다 예약을 확인한다",
      "note": "매주 손으로 만들던 리포트를 schedule 에 등록하면 수십 분 작업이 0분이 되고, 같은 코드가 항상 같은 결과를 내 복붙 오류도 사라진다. 자동 실행 함수는 반드시 try/except 와 logging 으로 감싸, 실패해도 죽지 않고 기록이 남게 하는 것이 핵심이다."
    },
    {
      "title": "Practice 3 완주 가이드 ① — EDA·IQR 이상치 제거·named aggregation",
      "lang": "python",
      "code": "# [Practice 3 - 전반부] Pandas EDA — IQR 이상치 제거 + named aggregation\n# 설명: sales_100k.csv를 로딩해 기본 EDA를 출력하고, IQR 방법으로\n#       이상치를 제거한 뒤 region·category별로 집계·정렬한다\n# 변경내역: v1.0 최초 작성\nimport pandas as pd                        # 표 데이터 처리\nimport numpy as np                         # 합성 데이터 생성용\n\ndef load_sales(path):\n    \"\"\"CSV 로딩. 파일이 없으면 실습용 합성 데이터로 대체(중단 방지).\"\"\"\n    try:\n        return pd.read_csv(path)\n    except FileNotFoundError:              # 파일이 없어도 실습은 계속\n        print('파일 없음 — 합성 데이터 10만 행으로 대체')\n        rng = np.random.default_rng(0)     # 시드 고정: 누가 돌려도 같은 결과\n        tmp = pd.DataFrame({\n            'region': rng.choice(['서울', '부산', '대구', '인천'], 100_000),\n            'category': rng.choice(['전자', '의류', '식품'], 100_000),\n            'month': rng.choice(['2024-01', '2024-02', '2024-03'], 100_000),\n            'amount': rng.integers(100, 5000, 100_000)})\n        tmp.loc[:99, 'amount'] = 999_999   # 이상치 100건을 일부러 심는다\n        return tmp\n\ndf = load_sales('sales_100k.csv')\n\n# 1) 기본 EDA — Checkpoint: info()와 isnull().sum() 출력 필수\nprint(df.info())                           # 행 수·컬럼 타입·메모리 한눈에\nprint(df.isnull().sum())                   # 컬럼별 결측치 개수\n\n# 2) IQR 이상치 제거 — 공식이 틀리면 -20점, 그대로 외우자\nQ1 = df['amount'].quantile(0.25)           # 하위 25% 지점\nQ3 = df['amount'].quantile(0.75)           # 상위 25% 지점\nIQR = Q3 - Q1                              # 사분위 범위\nclean = df[df['amount'].between(Q1 - 1.5 * IQR, Q3 + 1.5 * IQR)]\nprint('제거 전:', len(df), '/ 제거 후:', len(clean))   # 전·후 행 수 출력(Checkpoint)\n\n# 3) named aggregation — agg({'amount':'sum'}) 방식은 -20점\nresult = (clean.groupby(['region', 'category'])\n          .agg(total=('amount', 'sum'),    # 결과 컬럼명을 직접 지정\n               mean=('amount', 'mean'),\n               count=('amount', 'count'))\n          .sort_values('total', ascending=False))   # 총매출 내림차순(Checkpoint)\nprint(result.head(6))",
      "note": "Practice 3의 1·2번 문제 풀이다. 감점 3대장은 IQR 공식 오류(-20), agg({'amount':'sum'}) 식의 named aggregation 미사용(-20)이므로 Q1-1.5*IQR ~ Q3+1.5*IQR 범위와 total=('amount','sum') 형태를 그대로 쓰자. 체크포인트가 요구하는 df.info()·isnull().sum() 출력과 제거 전·후 행 수 출력도 빠뜨리면 안 된다."
    },
    {
      "title": "Practice 3 완주 가이드 ② — Polars Lazy·DuckDB SQL·timeit 공정 비교",
      "lang": "python",
      "code": "# [Practice 3 - 후반부] Polars Lazy · DuckDB SQL · timeit 3종 성능 비교\n# 설명: 같은 집계(지역·카테고리별 총매출)를 Pandas/Polars/DuckDB로\n#       작성하고 timeit으로 '동일 반복 횟수' 실행 시간을 비교한다\n# 변경내역: v1.0 최초 작성\nimport os                                  # 파일 존재 확인\nimport timeit                              # 실행 시간 측정 표준 도구\nimport pandas as pd\nimport polars as pl\nimport duckdb\n\nif not os.path.exists('sales_100k.csv'):   # 실습 파일이 없으면 합성 CSV 생성\n    import numpy as np\n    rng = np.random.default_rng(0)\n    pd.DataFrame({'region': rng.choice(['서울', '부산', '대구'], 100_000),\n                  'category': rng.choice(['전자', '의류', '식품'], 100_000),\n                  'amount': rng.integers(100, 5000, 100_000)}\n                 ).to_csv('sales_100k.csv', index=False)\n\ndef pandas_agg():\n    \"\"\"Pandas: 읽기부터 집계까지(공정 비교를 위해 읽기 포함).\"\"\"\n    df = pd.read_csv('sales_100k.csv')\n    return (df[df['amount'] > 0].groupby(['region', 'category'])\n            .agg(total=('amount', 'sum')).sort_values('total', ascending=False))\n\ndef polars_agg():\n    \"\"\"Polars Lazy: scan→filter→group_by→agg→sort→collect 체인.\"\"\"\n    return (pl.scan_csv('sales_100k.csv')          # read_csv(Eager)면 -20\n            .filter(pl.col('amount') > 0)          # 계획만 쌓인다\n            .group_by(['region', 'category'])\n            .agg(pl.col('amount').sum().alias('total'))\n            .sort('total', descending=True)\n            .collect())                            # collect() 누락도 -20\n\ndef duckdb_agg():\n    \"\"\"DuckDB: CSV 파일에 바로 SQL GROUP BY.\"\"\"\n    sql = (\"SELECT region, category, SUM(amount) AS total \"\n           \"FROM 'sales_100k.csv' WHERE amount > 0 \"\n           \"GROUP BY region, category ORDER BY total DESC\")\n    return duckdb.query(sql).to_df()               # 결과를 DataFrame으로\n\nprint(duckdb_agg().head(3))                        # 집계 결과 확인(세 도구 동일해야 함)\n\nN = 3                                              # 반복 횟수가 다르면 -20: 셋 다 N으로 통일\nfor name, fn in [('Pandas', pandas_agg), ('Polars', polars_agg), ('DuckDB', duckdb_agg)]:\n    sec = timeit.timeit(fn, number=N)              # 같은 조건에서 N회 실행\n    print(name, round(sec, 3), '초 (', N, '회)')",
      "note": "Practice 3의 3·4번 문제 풀이다. Polars는 read_csv(Eager)가 아니라 scan_csv로 시작해 collect()로 끝나는 체인이어야 하며(각 -20), timeit은 세 도구 모두 같은 number 값으로 돌려야 공정 비교로 인정된다(-20). 세 함수 모두 파일 읽기부터 포함시켜 측정 조건을 똑같이 맞춘 것이 핵심이다."
    },
    {
      "title": "Practice 4 완주 가이드 ① — 2x2 서브플롯 4종 차트와 t-test·카이제곱",
      "lang": "python",
      "code": "# [Practice 4 - 전반부] 2x2 서브플롯 4종 차트 + t-test·카이제곱 검정\n# 설명: 한 figure에 4종 차트를 배치해 저장하고, 서울 vs 부산 평균\n#       매출 t-test와 지역x카테고리 카이제곱 검정 결과를 해석한다\n# 변경내역: v1.0 최초 작성\nimport matplotlib\nmatplotlib.use('Agg')                       # 화면 없이 파일로만 저장(서버 환경 대비)\nimport platform\nimport pandas as pd\nimport matplotlib.pyplot as plt\nfrom scipy import stats                     # t-test, 카이제곱 검정\n\n# 한글 축 라벨이 깨지지 않게 OS별 기본 한글 폰트를 지정한다\nplt.rc('font', family='Malgun Gothic' if platform.system() == 'Windows' else 'AppleGothic')\nplt.rcParams['axes.unicode_minus'] = False  # 마이너스 기호 깨짐 방지\n\ntry:\n    df = pd.read_csv('sales_100k.csv')      # 실습 3에서 쓰던 데이터 재사용\nexcept FileNotFoundError:\n    raise SystemExit('sales_100k.csv가 필요합니다 — 실습 3을 먼저 실행하세요')\n\n# 1) 2x2 서브플롯 — 차트 4개를 개별 plt.show()로 따로 내면 -20\nfig, axes = plt.subplots(2, 2, figsize=(10, 8))\naxes[0, 0].hist(df['amount'], bins=30)                       # 1. 금액 히스토그램\naxes[0, 0].set_title('Amount Histogram')\ndf.boxplot(column='amount', by='region', ax=axes[0, 1])      # 2. 지역별 박스플롯\nregion_sum = df.groupby('region')['amount'].sum()\naxes[1, 0].bar(region_sum.index, region_sum.values)          # 3. 지역별 총매출 바차트\naxes[1, 0].set_title('Region Total')\nnum_corr = df.select_dtypes('number').corr()                 # 4. 숫자 열 상관 히트맵\nim = axes[1, 1].imshow(num_corr, cmap='Blues')\nfig.colorbar(im, ax=axes[1, 1])\nfig.tight_layout()\nfig.savefig('eda_4charts.png')              # 한 장의 그림 파일로 제출\nprint('eda_4charts.png 저장 완료')\n\n# 2) t-test: 서울 vs 부산 평균 매출 차이 — p-value 해석 누락은 -20\nseoul = df.loc[df['region'] == '서울', 'amount']\nbusan = df.loc[df['region'] == '부산', 'amount']\nt, p = stats.ttest_ind(seoul, busan)\nprint('t =', round(t, 3), ', p-value =', round(p, 4))\nprint('=> 유의미' if p < 0.05 else '=> 우연 범위(유의하지 않음)')   # 해석 한 줄 필수\n\n# 3) 카이제곱: 지역 x 카테고리 독립성 — 분할표를 만들어 검정\ntable = pd.crosstab(df['region'], df['category'])\nchi2, p2, dof, expected = stats.chi2_contingency(table)\nprint('chi2 =', round(chi2, 3), ', p-value =', round(p2, 4))\nprint('=> 관련 있음' if p2 < 0.05 else '=> 독립(관련 없다고 본다)')",
      "note": "Practice 4의 1·2번 문제 풀이다. 차트 4개를 개별 plt.show()로 따로 내면 -20이므로 반드시 fig, axes = plt.subplots(2,2) 한 장에 모으고, t-test·카이제곱 모두 p-value 수치만 출력하면 -20이니 p < 0.05 판단문을 코드로 남겨야 한다. matplotlib.use('Agg')를 지우고 plt.show()를 넣으면 화면으로도 볼 수 있다."
    },
    {
      "title": "Practice 4 완주 가이드 ② — sklearn Pipeline 저장·재로딩과 Plotly HTML",
      "lang": "python",
      "code": "# [Practice 4 - 후반부] sklearn Pipeline 훈련·저장·재로딩 + Plotly HTML\n# 설명: ColumnTransformer+Pipeline으로 전처리와 모델을 한 덩어리로\n#       학습·평가·저장·재로딩하고, Plotly 막대 차트를 HTML로 저장한다\n# 변경내역: v1.0 최초 작성\nimport pandas as pd\nimport joblib                                   # 모델 파일 저장/불러오기\nimport plotly.express as px                     # 인터랙티브 차트\nfrom sklearn.pipeline import Pipeline           # 전처리+모델 묶음\nfrom sklearn.compose import ColumnTransformer   # 열별로 다른 전처리\nfrom sklearn.preprocessing import OneHotEncoder # 글자 열을 숫자로\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import train_test_split\n\ntry:\n    df = pd.read_csv('sales_100k.csv')\nexcept FileNotFoundError:\n    raise SystemExit('sales_100k.csv가 필요합니다 — 실습 3을 먼저 실행하세요')\n\n# 목표(y): 중앙값보다 큰 고액 거래인지 예측, 입력(X): 지역·카테고리\ny = (df['amount'] > df['amount'].median()).astype(int)\nX = df[['region', 'category']]\n\n# 1) 전처리 + 모델을 Pipeline 하나로 — 따로따로 실행하면 -20\npre = ColumnTransformer([('cat', OneHotEncoder(), ['region', 'category'])])\npipe = Pipeline([('pre', pre),                              # 1단계: 인코딩\n                 ('model', LogisticRegression(max_iter=500))])  # 2단계: 분류\n\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)\npipe.fit(X_tr, y_tr)                            # 전처리+학습이 한 번에\nprint('정확도:', round(pipe.score(X_te, y_te), 3))\n\n# 2) joblib 저장 + 재로딩 — dump 없이 학습만 하면 -20\njoblib.dump(pipe, 'sales_model.joblib')         # 파이프라인 통째로 저장\nloaded = joblib.load('sales_model.joblib')      # 다시 불러와서\nprint('재로딩 예측:', loaded.predict(X_te.head(3)).tolist())   # 그대로 예측 가능\n\n# 3) Plotly 막대 차트를 HTML로 저장 — fig.show()만 하면 -20\ntop = df.groupby(['region', 'category'], as_index=False)['amount'].sum()\nfig = px.bar(top, x='region', y='amount', color='category',\n             title='Region x Category Total Sales')\nfig.write_html('sales_bar.html')                # 브라우저로 열리는 파일 제출\nprint('sales_bar.html 저장 완료')",
      "note": "Practice 4의 3·4번 문제 풀이다. 전처리와 모델을 따로 실행하면 Pipeline 미사용 -20, joblib.dump() 없이 학습만 하면 -20, Plotly를 fig.show()로 화면 출력만 하고 write_html()을 안 부르면 또 -20이다. ColumnTransformer를 Pipeline 1단계로 넣으면 재로딩한 모델이 전처리까지 그대로 재현한다는 점이 이 실습의 핵심이다."
    },
    {
      "title": "종합실습 2 데이터 링크 수정 — Stack Overflow 설문 CSV (보완 안내)",
      "lang": "python",
      "code": "# [종합실습 2 보완 안내] 실습지의 두 번째 Stack Overflow 링크가 아래로 수정되었다 (백정열 교수 공지 7/16)\n# · 2024년 설문 데이터(CSV 직링크, zip 아님):\n#   https://github.com/StackExchange/Survey/raw/refs/heads/main/packages/archive/2024/results.csv\n# · 전체 아카이브 폴더(스키마 설명 포함): https://github.com/StackExchange/Survey/tree/main/packages/archive/2024\n# · 공식 안내 페이지(연도별 링크 정리): https://survey.stackoverflow.co/\nimport pandas as pd\n\nURL = ('https://github.com/StackExchange/Survey/raw/refs/heads/main/'\n       'packages/archive/2024/results.csv')   # 수정된 2024년 CSV 직링크\n\ndf = pd.read_csv(URL)                  # 인터넷에서 바로 읽기(수십 MB — 잠시 걸린다)\nprint(df.shape)                        # (응답자 수, 문항 수) 확인\nprint(df.columns[:10].tolist())        # 앞 문항 10개 이름 구경\n# 문항(컬럼)의 의미는 아카이브 폴더의 스키마 문서를 참고한다",
      "note": "종합실습 2 실습지의 두 번째 Stack Overflow 링크가 잘못되어 위 주소로 수정 공지되었다(7/16 백정열 교수). zip이 아니라 CSV 직링크이므로 pd.read_csv(URL)로 바로 읽으면 되고, 링크가 또 바뀌면 공식 안내 페이지(survey.stackoverflow.co)에서 연도별 최신 링크를 확인하는 습관이 안전하다."
    },
    {
      "title": "Practice 3·4 실습 데이터 실물 확인 — sales_100k.csv 스키마 (보완 안내)",
      "lang": "python",
      "code": "# [Practice 3·4 보완 안내] 배포된 sales_100k.csv 실물 확인 결과 (7/16)\n# · 실제 100만 행 × 11컬럼 (파일명의 100k보다 크다 — 성능 비교가 더 실감난다)\n# · 컬럼: order_id, order_date, region, category, product_name,\n#         quantity, unit_price, payment_method, customer_age, customer_gender, amount\n# · region·category 값은 한글! region 결측 10,000건 · category 결측 8,000건 존재\nimport pandas as pd\n\ndf = pd.read_csv('sales_100k.csv')\nprint(df.isnull().sum())          # region 10000 · category 8000 이 나오는 게 정상(파일 문제 아님)\n\nprint(df['region'].unique())      # ['인천' '부산' '서울' '광주' '울산' '경기' '대전' '대구' nan]\n\n# t-검정 그룹은 영어 'Seoul'이 아니라 한글 값으로! (영문으로 쓰면 빈 Series)\nseoul = df.loc[df['region'] == '서울', 'amount']\nbusan = df.loc[df['region'] == '부산', 'amount']\nprint(len(seoul), len(busan))     # 247558, 119425 — 값이 잡히는지 꼭 확인\n\n# 카이제곱용 payment_method 는 카드·현금·계좌이체·포인트 4종(결측 없음)",
      "note": "실물 파일 점검 결과다. ① 결측치가 일부러 심어져 있으니 isnull().sum() 출력이 0이 아니라고 당황하지 말 것(EDA 채점 포인트), ② region·category가 한글 값이므로 조건 필터와 t-검정 그룹 추출에 '서울'·'부산'처럼 한글로 써야 한다, ③ 실물이 100만 행이라 Pandas vs Polars vs DuckDB 성능 차이가 확실히 보인다."
    },
    {
      "title": "실습교수 공유 링크 — DuckDB 공식 블로그 · 종합실습 가이드 (수업 중 공지)",
      "lang": "text",
      "code": "수업 중(7/16) 실습교수들이 전 분반에 공유한 자료다.\n\n[백정열 교수 — 전 분반 공지]\n· DuckDB 공식 블로그: https://duckdb.org/news/\n  Practice 3에서 쓴 DuckDB의 릴리스 소식·활용 사례가 정리된 공식 채널.\n  \"CSV에 바로 SQL\"이 어디까지 발전했는지 훑어보면 도구 선택 감이 생긴다.\n\n[조홍근 실습교수 — 울산 2반 공유]\n· 종합실습 가이드 다운로드: https://tinyurl.com/sk-python\n· 팀으로 실습하더라도 제출은 각자(개개인) 해야 한다는 점을 재강조.\n\n[수업 마무리 안내]\n· 파이썬 과목 Quiz는 구글폼으로 제출(채널 공지 링크).\n· 백정열 교수: \"10월 Vector DB 과정에서 다시 만난다 — 그때는 자신 있게 파이썬 잘 합니다!라고 해주길.\"",
      "note": "울산 4반 외 다른 반 채널에서 공유된 자료까지 모은 것이다. 종합실습 가이드 단축링크(tinyurl.com/sk-python)는 가이드 PDF를 다시 볼 때 유용하고, DuckDB 블로그는 도구가 살아 움직이는 생태계임을 보여준다. 파이썬은 10월 Vector DB 과목의 기반이 되므로 방학처럼 쉬지 말고 Practice 코드를 한 번 더 돌려보자."
    },
    {
      "title": "종합실습 2 제출 안내·채점기준 실물 — 데이터셋과 배점 (윤선영 교수 배포)",
      "lang": "text",
      "code": "[제출 구성]\n· Practice 1~4: Practice번호_내이름.py 4개 → Practice_내이름.zip\n· 종합실습 2: Test2_내이름.py + git2_내이름.py → Test2_내이름.zip\n  (git 실습 파일까지 함께 — GitHub 업로드가 채점 항목이다)\n\n[채점기준 — 100점]\n① 10점  프로그램 전체 설명(머리말) + 함수·기능 설명 주석\n② 10점  필요한 칼럼만 골라 DataFrame 생성 →\n         서비스_업종_코드_명별 당월_매출_금액 합계, 내림차순 상위 10개\n③ 20점  연령대_10/20/30_매출_금액 세 칼럼의 합계로 bar 그래프 → 파일 저장\n④ 30점  파이프라인: 수치형(결측 중간값+스케일링) + 범주형(결측 'missing'+원핫)\n         → 두 파이프라인 결합 → 최종 모델 파이프라인 완성\n⑤ 20점  모델 만들고 성능 확인\n⑥ 10점  GitHub에 올리고 캡처\n\n[실습 데이터 실물]\n· 서울시 상권분석서비스(추정매출-상권).csv — 47MB, 채널에 공유됨\n· 필요한 칼럼: 서비스_업종_코드_명 · 당월_매출_금액 · 연령대_10/20/30_매출_금액 등\n\n[종합실습 1 평가기준(참고)] 주석 20 · 오류/예외처리 20 · 코드 간결성 30 ·\n코드 완성 10 · GitHub 업로드 10 · 납기 10",
      "note": "울산 3반 채널에 배포된 제출 안내 원문을 정리했다. 배점을 보면 ④파이프라인이 30점으로 가장 크고 ③시각화 파일 저장이 20점 — 이 두 항목이 바로 위의 '업종별 매출 상위 10 + bar 저장'과 'ColumnTransformer 파이프라인' 예제 카드다. 주석(머리말·함수 설명)과 GitHub 업로드까지 배점에 있으니 코드만 잘 짜고 20점을 흘리지 말자."
    }
  ],
  "prompt-1": [
    {
      "title": "자료를 주고 \"없으면 확인 필요\" — 지어내기(할루시네이션) 차단 실험",
      "lang": "python",
      "code": "from openai import OpenAI                     # OpenAI 클라이언트\nclient = OpenAI(api_key=\"sk-본인키\")           # 키는 본인 것으로 교체\n\n# 자료 없이 물으면 모델이 그럴듯하게 '지어낼' 위험이 있다\nbad = \"우리 회사 AI 특강 신청 방법을 안내문으로 써 줘.\"\n\n# 자료를 주고 '자료에 없으면 확인 필요라고 써라' 규칙을 걸면 지어내기가 차단된다\ngood = (\n    \"아래 자료만 사용해서 AI 특강 안내문을 작성해 줘.\\n\"\n    \"자료에 없는 내용은 지어내지 말고 '확인 필요'라고 표시해 줘.\\n\"\n    \"[자료 시작]\\n\"\n    \"행사명: 생성형 AI 특강 / 일시: 7월 15일 14시\\n\"\n    \"장소: 판교 캠퍼스 4층 / 신청: 사내 포털, 7월 10일 마감\\n\"\n    \"[자료 끝]\\n\"\n    \"출력 형식: 1.제목 2.핵심 안내 3.신청 방법 4.확인 필요 사항\"\n)\n\nfor q in [bad, good]:                          # 두 프롬프트를 같은 모델에 보내 비교\n    res = client.chat.completions.create(\n        model=\"gpt-4o-mini\",                   # 사용할 모델\n        messages=[{\"role\": \"user\", \"content\": q}],   # 사용자 질문 1개\n    )\n    print(res.choices[0].message.content[:300])      # 답변 앞부분만 출력\n    print(\"-\" * 40)                            # 두 답변 사이 구분선\n\n# 자료 없는 쪽은 장소·시간을 창작하고, 자료 있는 쪽은 사실과 '확인 필요'를 구분한다",
      "note": "임성열 실습교수의 Prompt 설계와 Context Engineering 실습지 중 \"기법 4. Context 제공 — 자료에 근거해 답하게 하기\"를 코드 실험으로 옮겼다. 같은 요청이라도 [자료 시작]~[자료 끝] 블록과 \"없으면 확인 필요\" 규칙을 넣으면 모델의 창작이 차단되는 것을 눈으로 비교하는 것이 목적이다. RAG 로 가기 전 가장 손쉬운 할루시네이션 제어법이다."
    },
    {
      "title": "ReAct — 확인할 것 정리→검색→관찰→계산 순서로 움직이게 하기",
      "lang": "text",
      "code": "ReAct = Reason(추리) + Act(행동).\n답을 바로 말하게 하지 않고 \"무엇을 확인할지 → 확인 → 관찰 → 계산 → 최종 답\"\n순서로 움직이게 하는 프롬프트 패턴이다. (웹 검색이 되는 AI 도구에서 실행)\n\n[ReAct 프롬프트 — 그대로 붙여 쓰기]\n다음 순서로 답해 줘.\n주제:\n올해 대한민국 최저시급을 기준으로 주 40시간 근무 시 월급을 계산해야 한다.\n답변 순서:\n1. 확인할 정보: 무엇을 알아야 하는지 정리\n2. 검색 또는 확인: 올해 최저시급 정보를 확인\n3. 관찰: 확인한 정보와 출처 정리\n4. 계산: 주 40시간 기준 월급 계산 과정 제시\n5. 최종 답: 한 줄로 정리\n출처가 없거나 확실하지 않은 정보는 '확인 필요'라고 표시해 줘.\n\n[검색 기능이 없는 도구를 쓸 때]\n실제 검색 대신 \"어떤 정보를 어떤 출처(예: 고용노동부 최저임금 고시)에서\n찾아야 하는지\"를 설계하게 해도 같은 훈련 효과가 있다.\n\n[관찰 포인트]\n- 답만 요구할 때와 달리, 어떤 근거로 계산했는지가 단계별로 드러난다\n- 최신 정보가 필요한 질문에서 모델이 기억에 의존해 틀리는 것을 막아 준다",
      "note": "임성열 실습교수 실습지의 \"선택 기법. ReAct — 확인할 정보와 검색 결과를 연결해 답하기\"를 옮긴 것이다. 최저시급처럼 시점에 따라 바뀌는 정보는 모델의 기억이 아니라 확인·관찰 단계를 거쳐 답하게 해야 안전하다는 것이 원 실습의 의도다. 검색 기능이 없는 환경을 위한 대안 설계까지 포함했다."
    },
    {
      "title": "맨몸 질문→3대 한계 진단→5요소 재설계 — 프롬프트 개선 사이클",
      "lang": "text",
      "code": "프롬프트는 한 번에 완성하지 않는다. 일부러 대충 물어 보고(Baseline),\n답의 문제를 진단한 뒤, 요소를 갖춰 다시 쓰는 3단계 사이클을 돈다.\n\n[1단계 Baseline] 가이드 없이 떠오르는 대로 묻고, 답을 그대로 저장해 둔다\nK-뷰티 역직구(해외 직접판매) 시장에 대해 알려줘.\n\n[2단계 진단] 초기 답변을 3가지 관점으로 비판적으로 검증한다\n- 할루시네이션: 출처 불명의 통계·낡은 트렌드가 섞여 있는가?\n- 구조화 부족: 보고서 격식 없이 줄글만 나열되어 읽기 어려운가?\n- 모호성: \"리스크 관리를 잘해야 한다\"류의 뻔한 원론뿐인가?\n\n[3단계 재설계] 5가지 요소를 명확히 분리해 프롬프트를 다시 쓴다\nRole(역할): 10년차 글로벌 커머스 시장 전략 컨설턴트\nObjective(목적): 경영진 보고용 역직구 시장 분석 + 3대 리스크 대응 전략\nContext(맥락): 한국 기업의 동남아·북미 진출 시 물류/결제/규제 상황\nConstraints(제약): 확인 안 된 수치 창작 금지, 비즈니스 톤 유지\nFormat(형식): 대주제-소주제-불릿 구조, 핵심 지표는 표로 출력\n\n[4단계 비교 기록] 초기 답변과 개선 답변을 나란히 놓고\n무엇이 좋아졌는지(구조·근거·구체성) 한 줄씩 기록하면 실습 완성",
      "note": "윤재성 실습교수의 Prompt 설계 종합실습(크로스보더 이커머스 보고서 시나리오)의 1~4단계 진행 방식을 일반화했다. 일부러 Baseline 부터 시작해 할루시네이션·구조화 부족·모호성 3대 한계를 진단하고, Role~Format 5요소로 재설계해 전후를 비교하는 것이 원 실습의 핵심 의도다. 기존 RICE 예제가 요소를 쌓는 법이라면, 이 실습은 나쁜 답을 진단해 고치는 순환 과정을 익힌다."
    },
    {
      "title": "RICE 요소를 하나씩 쌓아 프롬프트 키우기 (v0→v5 실습)",
      "lang": "text",
      "code": "# 실습: 맨몸 프롬프트(v0)에서 시작해 RICE 요소를 한 번에 하나씩 누적한다\n# 시나리오: 오트밀 브랜드의 첫 오프라인 매장을 A/B/C 상권 중 한 곳에 낸다\n\n# [v0] 아무 요소도 없는 기본 프롬프트 — 답이 두루뭉술하고 근거가 없다\n우리 매장 어디에 내는 게 좋을까?\n\n# [v1] + R(Role): 역할을 주면 답의 관점이 전문가로 바뀐다\n너는 리테일 입지 분석 컨설턴트다.\n우리 매장 어디에 내는 게 좋을까?\n\n# [v2] + I(Instruction): 하나의 명확한 지시 + 수치/개수를 못박는다\n너는 리테일 입지 분석 컨설턴트다.\n후보지 A/B/C 중 1곳을 골라 근거 3가지로 정리해.\n\n# [v3] + C(Context): 판단 근거가 될 사실(팩트시트)을 넣는다\n[브랜드] 국산 귀리 100% 무설탕 오트밀 · 객단가 목표 9,000원 · 초기 자금 한정\n[후보지] A 대학가(유동 2.5만·경쟁 12곳) / B 오피스(유동 1.8만·경쟁 7곳) / C 신도시(유동 0.9만·경쟁 3곳)\n\n# [v4] + E(Examples): 원하는 결론 리포트 예시 1개로 톤과 형식을 고정한다\n(예) \"결론: B 추천 / 근거: 아침·점심 수요 강함, 경쟁 보통, 임대료 적정 / 리스크: 주말 한산\"\n\n# [v5] + Format: 출력 구조를 지정한다\n아래 형식으로만 답하라 -> 결론 / 근거 3가지 / 리스크 / 권고\n\n# 관찰 포인트: v0 응답과 v5 응답을 나란히 놓고, 응답을 가장 크게 바꾼 요소 2개를 찾는다",
      "note": "한 번에 완성하지 말고 R→I→C→E→Format 순으로 하나씩 붙이며 매번 다시 생성해 본다. \"어느 곳을 골랐나\"가 아니라 \"요소를 어떻게 누적해 근거 기반 답으로 바뀌었나\"가 핵심이다."
    },
    {
      "title": "Prompt Chaining — 근거 추출→답변 생성 2단계로 나누기",
      "lang": "python",
      "code": "from openai import OpenAI                       # OpenAI 라이브러리 불러오기\nclient = OpenAI(api_key=\"sk-본인키\")             # 클라이언트 생성 (키는 본인 것으로 교체)\n\n# 답을 찾을 원본 문서와 사용자 질문 (실제로는 긴 사내 규정 문서)\ndocument = \"연차 휴가는 입사 1년 후 15일 부여된다. 병가는 연 5일까지 유급이다.\"  # 원본 문서\nquestion = \"연차는 며칠 부여되나요?\"             # 사용자 질문\n\n# 체인 A: 문서에서 질문과 관련된 문장(인용문)만 그대로 뽑아내라고 지시\nprompt_a = f\"\"\"너는 문서 분석가다. 아래 문서에서 질문에 답할 수 있는 문장만 그대로 뽑아라.\n관련 문장이 없으면 '관련 없음'이라고만 답하라.\n문서: {document}\n질문: {question}\"\"\"                            # 역할·지시·문서·질문을 하나로 조립\n\nres_a = client.chat.completions.create(        # A단계 API 호출\n    model=\"gpt-4o-mini\",                       # 사용할 모델\n    messages=[{\"role\": \"user\", \"content\": prompt_a}],  # 사용자 메시지 1개\n)\nquotes = res_a.choices[0].message.content      # A의 출력 = 추출된 인용문(다음 단계 입력이 됨)\n\n# 체인 B: A가 뽑은 인용문에만 근거해 답하라고 지시(엉뚱한 상상=환각 억제)\nprompt_b = f\"\"\"아래 인용문에만 근거해 질문에 한 문장으로 답하라.\n인용문: {quotes}\n질문: {question}\"\"\"                            # A의 결과를 B의 입력으로 연결\n\nres_b = client.chat.completions.create(        # B단계 API 호출\n    model=\"gpt-4o-mini\",                       # 동일 모델\n    messages=[{\"role\": \"user\", \"content\": prompt_b}],  # 사용자 메시지 1개\n)\nprint(\"추출된 근거:\", quotes)                   # 중간 결과(A) 확인\nprint(\"최종 답변:\", res_b.choices[0].message.content)  # 최종 답(B) 출력",
      "note": "복잡한 지시를 한 프롬프트에 몰아넣지 않고 \"찾기(A)→답하기(B)\"로 쪼갠다. A의 출력이 B의 입력이 되며, B가 인용문에만 근거하게 해 환각을 줄인다. 이 구조를 확장하면 조건 분기·도구 호출이 붙는 에이전트가 된다."
    },
    {
      "title": "LLM-as-a-Judge로 결과물 4기준 채점하기",
      "lang": "python",
      "code": "from openai import OpenAI                       # OpenAI 라이브러리 불러오기\nimport json                                     # 채점 결과(JSON)를 파싱하기 위해\nclient = OpenAI(api_key=\"sk-본인키\")             # 클라이언트 생성 (키는 본인 것으로 교체)\n\n# 평가 대상: 어떤 프롬프트가 만들어 낸 광고 문구 결과\nprompt_text = \"Z세대를 겨냥한 에너지 음료 광고 문구 3개를 15자 이내로 만들어줘\"  # 원본 프롬프트\noutput_text = \"힘이 나는 음료 / 너의 하루 충전 / 지치지 마, 파워업\"           # LLM이 낸 결과\n\n# 심사위원 프롬프트: 4개 기준으로 0~5점 채점하고 JSON으로만 답하게 한다\njudge = (                                       # 채점 프롬프트 조립 시작\n    '너는 공정한 프롬프트 결과 평가자다.\\n'      # 심사위원 역할 부여\n    '결과를 목표부합·정확성·창의성·표현력 4개 기준으로 0~5점 채점하라.\\n'  # 평가 루브릭 4항목\n    '반드시 JSON으로만 답하라. 예: {\"창의성\": 2, \"총평\": \"문구가 평범함\"}\\n'  # 출력 형식 고정\n    '원본 프롬프트: ' + prompt_text + '\\n'       # 채점 맥락1: 원본 프롬프트\n    '생성 결과: ' + output_text                   # 채점 맥락2: LLM 결과\n)                                               # 조립 끝\n\nres = client.chat.completions.create(           # 채점 API 호출\n    model=\"gpt-4o-mini\",                        # 사용할 모델\n    messages=[{\"role\": \"user\", \"content\": judge}],  # 심사 프롬프트 전달\n    temperature=0,                              # 채점은 일관성이 중요 → 0으로 고정\n)\nscore = json.loads(res.choices[0].message.content)  # JSON 답변을 파이썬 딕셔너리로 변환\nprint(\"창의성 점수:\", score[\"창의성\"])            # 예: 2 (문구가 평범하면 낮게 나온다)\nprint(\"총평:\", score[\"총평\"])                     # 왜 그 점수인지 한 줄 근거",
      "note": "사람 평가는 정확하지만 느리고 비싸다. 성능 좋은 모델을 심사위원으로 세우면 결과 품질을 빠르게 점수화할 수 있다. temperature=0으로 채점을 일관되게 하고, \"역할 지시·스타일 요구가 없어 창의성이 낮다\"처럼 구조 결함까지 근거로 받아 프롬프트를 고친다."
    },
    {
      "title": "System Prompt 템플릿에 Placeholder 채워 재사용하기",
      "lang": "python",
      "code": "from openai import OpenAI                       # OpenAI 라이브러리 불러오기\nclient = OpenAI(api_key=\"sk-본인키\")             # 클라이언트 생성 (키는 본인 것으로 교체)\n\n# System Prompt 템플릿: {역할}·{분야}·{말투}를 나중에 채울 빈자리(Placeholder)로 둔다\nsystem_tpl = \"너는 {domain} 전문 {role}다. 답변은 항상 {tone} 말투로 한다.\"  # 재사용 가능한 틀\n\n# 상황이 바뀌어도 값만 갈아끼우면 같은 구조를 그대로 재활용할 수 있다\nsystem_msg = system_tpl.format(                # 빈자리에 실제 값을 채운다\n    role=\"상담사\",                              # {role} 자리 → 상담사\n    domain=\"반려동물 건강\",                     # {domain} 자리 → 반려동물 건강\n    tone=\"친근하고 쉬운\",                        # {tone} 자리 → 친근하고 쉬운\n)\nprint(\"완성된 시스템 프롬프트:\", system_msg)      # 채워진 결과를 눈으로 확인\n\n# 완성된 System(역할·규칙)과 User(질문)를 분리해 전달한다\nres = client.chat.completions.create(          # API 호출\n    model=\"gpt-4o-mini\",                       # 사용할 모델\n    messages=[\n        {\"role\": \"system\", \"content\": system_msg},           # 모델의 역할·말투 규칙\n        {\"role\": \"user\", \"content\": \"강아지가 사료를 안 먹어요\"},  # 사용자 질문\n    ],\n)\nprint(\"답변:\", res.choices[0].message.content)  # 템플릿이 정한 역할·말투대로 답한다",
      "note": "System Prompt는 모델의 역할·동작 방식을, User Prompt는 이번 요청을 담당한다. 역할/분야/말투를 Placeholder로 비운 템플릿을 만들어 두면, 값만 바꿔 상담사·마케터·개발자용 봇을 같은 코드로 찍어낼 수 있다."
    },
    {
      "title": "프롬프트 해부학 — 4요소로 나눠 쓰면 답이 또렷해진다",
      "lang": "text",
      "code": "# 좋은 프롬프트 = Instruction + Context + Input + Output 4요소\n# 같은 요청도 4요소로 쪼개 쓰면 답이 산만해지지 않는다\n\n# [나쁜 예] 문법은 맞지만 모호함 — 무엇을·어떤 기준으로·어떤 형식으로가 빠졌다\n구름의 색이 변하는 이유를 설명해줘.\n\n# [좋은 예] 4요소로 분해해 명확하게 지시한다\nInstruction: 구름 색이 달라지는 이유를 설명하라.       # 무엇을 할지(구체적 동사)\nContext: 빛의 산란·파장·태양 위치를 고려해 서술하라.    # 판단에 필요한 배경·조건\nInput: 해 뜰 무렵 붉게 보이는 구름이 왜 생기나요?        # 이번에 처리할 구체적 대상\nOutput: {reason}: {한 문장의 과학적 설명}               # 답을 담을 형식(빈칸 채우기 틀)\n\n# 감정 분류에 그대로 적용한 틀 — Output 형식을 고정하면 채점·자동화가 쉬워진다\nInstruction: 다음 리뷰의 감정을 판단하라(긍정/중립/부정 중 하나).\nContext: 감정 표현이 애매하면 중립으로 분류한다.\nInput: 그 분식집 김밥은 그저 그랬어.\nOutput: {sentiment}: 부정\n\n# 핵심: Output을 {sentiment} 같은 틀로 못박으면 결과가 제각각이지 않다",
      "note": "Instruction만 있으면 모델이 과도하게 추론해 에세이처럼 흩어진다. Context(조건)·Input(대상)·Output(형식)을 함께 주면 답이 목적에 맞게 좁혀진다. 특히 Output 형식을 {sentiment} 같은 빈칸 틀로 고정하는 것이 결과 품질과 자동 처리의 핵심이다."
    },
    {
      "title": "사실 고정 모드 vs 아이디어 탐색 모드 — 제약 문구로 모델의 태도 바꾸기",
      "lang": "text",
      "code": "같은 질문이라도 제약(Constraints) 문구에 따라 모델의 태도가 완전히 달라진다.\n아래 두 모드를 같은 질문에 붙여 각각 보내고, 답변의 결이 어떻게 갈리는지 관찰한다.\n\n[공통 질문]\n크로스보더(역직구) 이커머스 진출 시 리스크 요인을 정리해 줘.\n\n[모드 A - 사실 고정 모드] ← 보고서·데이터 요약처럼 정확성이 생명일 때\n- 창의적인 추측은 하지 말고, 확인된 사실과 데이터에 근거해서만 답해 줘.\n- 가능한 한 수치로 표현하고 \"상당히·매우·높은 수준\" 같은 모호한 말은 쓰지 말아 줘.\n- 같은 질문에는 언제 물어도 같은 답이 나오도록 일관되게 답해 줘.\n\n[모드 B - 아이디어 탐색 모드] ← 브레인스토밍·신사업 발굴처럼 발상이 필요할 때\n- 기존 상식과 관행에 얽매이지 말고, 새로운 연결과 가능성을 넓게 탐색해 줘.\n- 정답보다 통찰을 우선하고, 내가 생각하지 못한 관점과 과감한 시나리오를 제시해 줘.\n- 서로 다른 분야의 개념을 결합한 아이디어도 환영이야.\n\n[관찰 포인트]\n- 모드 A는 수치·조건 중심의 건조한 답, 모드 B는 가설·시나리오 중심의 발산형 답이 나온다.\n- 업무 보고는 A, 기획 초기 발상은 B - 목적에 맞는 모드를 골라 쓰는 것이 제약 설계의 핵심이다.",
      "note": "할루시네이션 제어는 무조건 창의성을 막는 것이 아니라, 과업 성격에 맞춰 제약의 방향을 고르는 일이다. 두 모드의 답을 나란히 저장해 두면 제약 문구 몇 줄이 답변 전체를 바꾸는 것을 체감할 수 있다."
    },
    {
      "title": "Context Engineering 부품 4개 점검 — 히스토리·외부 지식·도구·포맷을 라벨로 나누기",
      "lang": "text",
      "code": "Context Engineering은 \"좋은 문장 쓰기\"가 아니라,\n모델에게 줄 재료(부품)를 빠짐없이 챙겨 조립하는 일이다.\n크로스보더 보고서 프롬프트를 4개 부품으로 나눠 라벨을 붙여 본다.\n\n[부품 1 - 히스토리(지금까지의 맥락)]\n우리 조는 K-푸드 역직구를 주제로 정했고, 타겟 시장은 북미야.\n앞에서 합의한 이 전제를 유지한 채 이어서 작업해 줘.\n\n[부품 2 - 외부 지식(참고 자료)]\n아래 자료 블록의 내용만 근거로 사용해 줘.\n자료에 없는 수치는 지어내지 말고 \"확인 필요\"로 표시해 줘.\n(공신력 있는 기관 리포트의 요약 문단을 이 자리에 붙여 넣는다)\n\n[부품 3 - 도구(모델에게 시킬 계산·검증)]\n비중 합계 같은 계산이 필요하면 계산 과정을 단계별로 보여 줘.\n\n[부품 4 - 포맷(출력 그릇)]\n대주제-소주제-불릿 구조의 Markdown으로 쓰고, 핵심 지표는 표로 정리해 줘.\n\n[점검 습관]\n답이 이상하면 문장을 다듬기 전에 \"4개 부품 중 무엇이 비었나\"부터 확인한다.\n비어 있는 부품을 채우는 쪽이 표현을 고치는 것보다 훨씬 효과가 크다.",
      "note": "프롬프트를 한 덩어리 문장이 아니라 부품 목록으로 보면 무엇이 빠졌는지 즉시 보인다. 특히 부품 2(외부 지식)가 비면 모델은 그 자리를 상상으로 메우므로, 할루시네이션의 상당수는 부품 점검만으로 예방된다."
    },
    {
      "title": "AI 하네스(작업장) 폴더 만들기 — 규칙·템플릿·기록 파일로 컨텍스트 관리하기",
      "lang": "text",
      "code": "말이 힘을 내게 하는 것은 채찍이 아니라 몸에 잘 맞춘 마구(하네스)다.\nAI도 같다 - 규칙·템플릿·기록을 파일로 갖춘 작업장을 만들어 두면\n매번 긴 프롬프트를 다시 쓰지 않아도 일정한 품질이 나온다.\n\nai-harness/                  ← 프로젝트 작업장 폴더\n├── AGENTS.md                ← AI가 항상 지켜야 할 최상위 지침서\n├── docs/\n│   ├── source_rules.md      ← 출처·인용 규칙(할루시네이션 방지)\n│   └── style_guide.md       ← 문체·용어 통일 규칙\n├── templates/\n│   └── template.md          ← 결과물 뼈대(제목·목차·표 형식)\n├── outputs/                 ← AI 산출물을 버전별로 보관(v1, v2 ...)\n└── logs/\n    └── revision_log.md      ← 무엇을 왜 고쳤는지 수정 기록\n\n[실습 순서]\n1. 위 구조대로 폴더와 빈 파일을 만든다.\n2. AGENTS.md에 \"출처 없는 수치 금지 / 결과는 template.md 형식\" 두 줄을 적는다.\n3. AI에게 \"AGENTS.md 규칙과 templates 뼈대를 따라 보고서 초안을 써 줘\"라고 요청한다.\n4. 결과를 outputs에 v1으로 저장하고, 고친 이유를 logs에 한 줄 남긴다.",
      "note": "규칙을 채팅창에 반복 입력하는 대신 파일로 두면, 대화가 바뀌어도 컨텍스트가 사라지지 않고 팀원과도 공유된다. 코딩 에이전트의 AGENTS.md 관례와 같은 원리라, 여기서 익힌 구조를 개발 실습에 그대로 재사용할 수 있다."
    },
    {
      "title": "실제 수치 팩트시트를 주입해 표 보고서 받기 — 개선 프롬프트의 Context 심화",
      "lang": "markdown",
      "code": "개선 프롬프트의 힘은 실제 수치를 직접 붙여 넣는 데서 나온다.\n공신력 있는 기관 리포트에서 요약한 수치를 자료 블록으로 주입해 본다.\n\n너는 10년차 글로벌 커머스 시장 전략 컨설턴트야.\n아래 자료의 수치만 사용해서 북미 K-뷰티 역직구 시장 요약을 작성해 줘.\n자료에 없는 수치는 만들지 말고 \"추가 조사 필요\"로 표시해 줘.\n\n[자료 시작]                       ← 검증된 수치만 이 블록 안에 넣는다\n- 2025년 역직구 거래액: 1조 9,800억 원 (전년 대비 +23%)\n- 상위 품목 비중: 스킨케어 41%, 색조 27%, 헤어케어 12%\n- 주요 리스크: 통관 규제 강화, 현지 결제 수단 부족, 물류비 상승\n[자료 끝]\n\n출력 형식(꼭 지켜 줘):\n## 시장 요약                     ← 대주제는 제목 2단계(##)\n### 핵심 지표                    ← 소주제는 제목 3단계(###)\n| 지표 | 값 | 출처 |             ← 수치는 반드시 3열 표로\n|---|---|---|\n### 리스크와 대응                ← 리스크는 불릿(-) 3개 + 각 대응책 1줄\n\n관찰: 표의 \"출처\" 열이 전부 자료 블록을 가리키면 성공,\n자료 밖 수치가 표에 등장하면 제약 문구를 더 강하게 고쳐 다시 보낸다.",
      "note": "역할·제약만으로는 근거가 빈약할 때, 최신 리포트 수치를 프롬프트에 직접 복사해 넣는 것이 가장 빠른 품질 개선법이다. 출력 형식에 출처 열을 강제하면 모델이 자료 밖 수치를 몰래 섞었는지 스스로 드러나게 된다."
    },
    {
      "title": "전후 비교 채점표 — Baseline과 개선 응답을 정량·정성으로 증명하기",
      "lang": "markdown",
      "code": "실습의 마지막은 \"좋아진 것 같다\"가 아니라 점수로 증명하는 것이다.\n초기(Baseline) 응답과 개선 응답을 같은 기준표로 채점해 비교 보고서에 싣는다.\n\n[정량 채점표 - 두 응답에 똑같은 기준을 적용한다]\n\n| 평가 항목 | 세는 방법 | 초기 응답 | 개선 응답 |\n|---|---|---|---|\n| 출처 불명 수치 개수 | 수치마다 출처를 되물어 검증 | 3건 | 0건 |\n| 보고서 구조 | 제목-소제목-불릿 격식 여부 | 없음(줄글) | 있음 |\n| 모호한 원론 문장 수 | \"잘해야 한다\"류 문장 세기 | 5회 | 1회 |\n| 표 활용 개수 | 핵심 지표가 표로 정리됐는가 | 0개 | 2개 |\n\n[정성 코멘트 - 숫자로 못 담는 차이를 2~3줄로 기록]\n- 초기: 어느 회사에나 통하는 일반론이라 우리 시나리오와 사실상 무관했다.\n- 개선: 주입한 자료의 수치를 인용해 경영진이 판단할 근거가 생겼다.\n\n[최종 제출물 취합 순서 - 문서 1개로 묶는다]\n조 명단과 세부 주제 → 초기 프롬프트·응답 원문 → 한계 분석 →\n적용한 기법 설명 → 개선 프롬프트·최종 응답 원문 → 이 채점표",
      "note": "같은 기준표를 두 응답에 적용해야 개선이 프롬프트 덕분임을 공정하게 보일 수 있다. 채점 항목이 곧 다음 개선 체크리스트가 되므로, 표를 한 번 만들어 두면 어떤 과업에도 재사용할 수 있다."
    },
    {
      "title": "AI 엔지니어링 4단계 지도 — Prompt에서 Loop까지",
      "lang": "text",
      "code": "[1] Prompt Engineering — \"어떻게 말할 것인가\"\n    · 의도를 모델에게 정확히 전달하는 단계\n    · 도구: Persona(역할 부여), Few-shot(예시), CoT(단계적 사고),\n      구조화 출력(Markdown·JSON 형식 지정)\n\n[2] Context Engineering — \"무엇을, 얼마나 줄 것인가\"\n    · 판단에 필요한 자료를 주입하는 단계\n    · 도구: RAG(검색 증강), Memory(대화 기억), 문서 주입,\n      컨텍스트 윈도우 관리(요약·압축)\n\n[3] Harness Engineering — \"어떤 환경에서 일하게 할 것인가\"\n    · 모델이 작업할 환경과 권한을 제어하는 단계\n    · 도구: Tools(도구 호출), MCP(도구 연결 표준), Skills,\n      Agents, 권한 설계(무엇을 할 수 있고 없는지)\n\n[4] Loop Engineering — \"언제 멈추고, 어디서 사람이 개입하는가\"\n    · 실행 → 검증 → 수정이 반복되도록 설계하는 단계\n    · 도구: 테스트·자동 검증, Hooks, Eval(평가), 종료 조건,\n      HITL(Human-in-the-Loop, 사람 개입 지점)",
      "note": "프롬프트 한 줄에서 시작해 에이전트 시스템까지 넓혀 가는 학습 지도다. 이번 과목(1~2단계)을 익힌 뒤 RAG·AI Agent 과목이 3~4단계로 이어진다. 판교 캠퍼스 수업에서 함께 다뤄진 정리를 우리말로 풀어 실었다."
    },
    {
      "title": "AI 엔지니어링 4단계 지도 — Prompt · Context · Harness · Loop (실습교수 정리)",
      "lang": "text",
      "code": "판교 실습교수(한성훈·박영웅)가 수업 중 정리해 공유한 프레임이다.\n\n1. Prompt Engineering — \"어떻게 말해야 하는가\"\n   의도를 모델에게 정확히 전달: Persona · few-shot · CoT · 구조화(Markdown, JSON)\n\n2. Context Engineering — \"무엇을, 얼마나 제공할 것인가\"\n   판단에 필요한 자료를 주입: RAG · Memory · 문서 주입 · 컨텍스트 윈도우 관리\n\n3. Harness Engineering — \"어떤 환경에서 작업하게 할 것인가\"\n   모델이 작업할 환경과 권한을 제어: Tools · MCP · Skills · Agents · 권한 설계\n\n4. Loop Engineering — \"언제 멈추고, 어디서 사람이 개입하는가\"\n   실행→검증→수정이 반복되도록 설계: 테스트/자동 검증 · Hooks · Eval · 종료 조건 · HITL\n\n+ 함께 알아둘 용어\n· 정합성(Consistency): 데이터·시스템 상태가 서로 모순 없이 일관되게 일치하는 것\n· 무결성(Integrity): 정보가 정확하고 완전한 상태로 유지되는 것",
      "note": "이 과목(Prompt 설계와 Context Engineering)이 4단계 중 1·2단계에 해당하고, 3단계(Harness)는 AI Agent 과목, 4단계(Loop)는 실제 서비스 운영에서 만나게 된다. 지금 배우는 내용이 전체 지도의 어디쯤인지 짚어 주는 정리라 과목 간 연결이 한눈에 들어온다."
    },
    {
      "title": "LLM 호출 옵션 실전 — temperature·max_tokens 3사 비교 (윤재성 실습교수)",
      "lang": "python",
      "code": "# 수업 중 공유된 \"LLM 옵션 설정\" 예시 — 3사 모두 같은 개념, 이름만 다르다\n# ⚠️ API 키는 절대 코드에 적지 말고 환경 변수로! (export OPENAI_API_KEY=...)\n\n# ── OpenAI (temperature 0.0~2.0) ──\nfrom openai import OpenAI\nclient = OpenAI()                          # 환경 변수 OPENAI_API_KEY 자동 참조\nres = client.chat.completions.create(\n    model=\"gpt-4o\",\n    messages=[\n        {\"role\": \"system\", \"content\": \"당신은 냉철하고 객관적인 AI 데이터 분석가입니다.\"},\n        {\"role\": \"user\", \"content\": \"StandardScaler와 MinMaxScaler 차이를 간단히 비교해줘.\"},\n    ],\n    temperature=0.2,                       # 낮을수록 일관성↑(코드·수학), 높을수록 창의성↑\n    max_tokens=800,                        # 답변 길이 상한\n    top_p=0.95,                            # temperature와 함께 무작위성 정교 제어\n)\nprint(res.choices[0].message.content)\n\n# ── Anthropic Claude (temperature 0.0~1.0 — 범위가 다르다!) ──\n# from anthropic import Anthropic\n# client = Anthropic()                     # ANTHROPIC_API_KEY 참조\n# res = client.messages.create(model=\"claude-sonnet-4-5\", max_tokens=1024,\n#     temperature=0.2, system=\"당신은 시니어 엔지니어입니다.\",\n#     messages=[{\"role\": \"user\", \"content\": \"...\"}])\n\n# ── Google Gemini (temperature 0.0~2.0) ──\n# from google import genai\n# client = genai.Client()                  # GEMINI_API_KEY 참조\n# res = client.models.generate_content(model=\"gemini-2.5-flash\", contents=\"...\",\n#     config=genai.types.GenerateContentConfig(temperature=0.2, max_output_tokens=800))",
      "note": "판교 8반 수업에서 공유된 3사 옵션 설정 예시를 한 파일로 재구성했다. 핵심은 ① temperature 범위가 회사마다 다르다(Claude는 최대 1.0), ② 정밀한 답(코드·수치)은 0.2 내외, 창의적인 답은 1.0 이상, ③ API 키는 반드시 환경 변수로 관리 — 코드나 채팅에 키를 붙여넣는 순간 유출 사고다."
    },
    {
      "title": "임원 보고서 1페이지 압축 프롬프트 — 강제 구조화의 힘 (판교 종합실습)",
      "lang": "text",
      "code": "[상황] 임원에게 보고서를 요약해 보고해야 한다.\n\n[프롬프트 — 그대로 응용]\n아래 내용을 1페이지 요약으로 재구성해 줘.\n구성: 결론 1문장 + 핵심 포인트 5개 + 리스크 3개 + 다음 액션 3개\n\n[이 구조가 강력한 이유 — 실습교수 해설]\n1. 임원 커뮤니케이션 최적화 — 결론→포인트→리스크→액션이 실제 경영진 보고의\n   사고 흐름과 일치한다 (\"So What?\" 중심 구조)\n2. 강제 압축 효과 — \"1페이지 + 항목 수 제한\"이 정보 밀도를 끌어올리고\n   불필요한 설명을 걷어낸다\n3. 의사결정 지원 — 리스크와 액션이 포함되어 단순 요약이 아니라 의사결정 자료가 된다\n4. 품질 표준화 — 누구나 같은 형식으로 작성하니 보고서 편차가 줄어든다\n5. LLM 활용 적합 — 구조가 명확할수록 모델 성능이 올라간다 (bullet 요약에서 특히 효과)",
      "note": "판교 7반 종합실습(김일한 실습교수)의 임원 보고서 프롬프트를 재구성했다. '몇 개로, 몇 페이지로'라는 강제 제약이 프롬프트 품질을 결정한다는 것이 이 실습의 교훈 — 어떤 요약 요청이든 \"결론 1 + 포인트 N + 리스크 N + 액션 N\" 틀을 씌우면 바로 실무급 산출물이 나온다."
    }
  ],
  "transformer-1": [
    {
      "title": "Multi-Head Attention — 차원을 나눠 여러 관점으로 보고 다시 합치기",
      "lang": "python",
      "code": "import numpy as np                       # 수치 계산 라이브러리\nnp.random.seed(0)                          # 결과 고정용 시드\n\n# 토큰 3개, 모델 차원 8이라고 가정(임베딩은 학습되지만 여기선 흉내)\nX = np.random.randn(3, 8)                  # (토큰 수, 모델 차원)\nnum_heads = 2                              # 헤드 2개로 나눈다\nhead_dim = 8 // num_heads                  # 각 헤드가 맡는 차원 = 4\n\ndef softmax(s):                            # 행 합이 1이 되도록 정규화\n    e = np.exp(s - s.max(axis=-1, keepdims=True))  # 오버플로 방지\n    return e / e.sum(axis=-1, keepdims=True)\n\noutputs = []                               # 각 헤드 결과를 모을 리스트\nfor h in range(num_heads):                 # 헤드마다 서로 다른 관점으로 계산\n    part = X[:, h*head_dim:(h+1)*head_dim] # 차원을 헤드별로 4개씩 자른다\n    scores = part @ part.T / np.sqrt(head_dim)  # 스케일드 닷-프로덕트 점수\n    weights = softmax(scores)              # 어텐션 가중치(합=1)\n    outputs.append(weights @ part)         # 가중합 = 이 헤드의 결과\nmulti_head = np.concatenate(outputs, axis=-1)   # 여러 헤드를 다시 이어 붙임(concat)\nprint(\"헤드별 결과를 합친 모양:\", multi_head.shape)  # 결과: (3, 8)",
      "note": "멀티헤드 어텐션은 차원을 여러 헤드로 나눠 각기 다른 관점의 관계를 병렬로 계산한 뒤 다시 이어 붙인다. 한 번의 어텐션보다 다양한 상호작용을 잡아낸다."
    },
    {
      "title": "RNN(순차) vs Transformer(병렬) — 왜 어텐션이 빠른가",
      "lang": "python",
      "code": "import numpy as np                       # 수치 계산\n\ntokens = [\"나는\", \"밥을\", \"먹었다\"]         # 토큰 3개\nx = np.array([1.0, 2.0, 3.0])              # 각 토큰의 아주 단순한 값(임베딩 대신)\n\n# 1) RNN 방식: 앞에서 뒤로 '순차'로만 진행(이어달리기)\nhidden = 0.0                               # 이전 정보를 담는 은닉 상태\nfor i, t in enumerate(tokens):             # 반드시 앞 토큰부터 하나씩\n    hidden = hidden * 0.5 + x[i]           # 앞 결과가 있어야 다음 계산 가능\n    print(f\"RNN {t}: 이전을 받아 처리 -> {hidden:.1f}\")  # 중간이 끊기면 흐름 깨짐\n\n# 2) Transformer 방식: 모든 토큰을 '동시에' 서로 참조(병렬)\nscores = np.outer(x, x)                    # 모든 토큰 쌍의 관련도를 한 번에\nweights = scores / scores.sum(axis=1, keepdims=True)  # 행별로 참고 비율화\ncontext = weights @ x                       # 각 토큰이 전체를 동시에 반영\nprint(\"Transformer: 한 번에 전체 참조 ->\", context.round(1))  # 순서 대기 없음",
      "note": "RNN은 앞 토큰 결과가 있어야 다음을 계산해 순차적(병렬화 어려움)이지만, 어텐션은 모든 토큰을 동시에 참조해 병렬 학습이 가능하다. 이 차이가 Transformer 속도의 핵심이다."
    }
  ],
  "transformer-2": [
    {
      "title": "Masked(인과) Self-Attention — 미래 토큰을 가리는 이유",
      "lang": "python",
      "code": "import numpy as np                       # 수치 계산\n\n# 디코더(GPT 계열)는 '미래 토큰'을 미리 보면 안 된다 -> 마스크로 가린다\ntokens = [\"나는\", \"밥을\", \"먹었다\"]         # 토큰 3개\nnp.random.seed(0)                          # 재현용 시드\nX = np.random.randn(3, 4)                  # 각 토큰 임베딩(차원 4)\n\nscores = X @ X.T / np.sqrt(4)              # 토큰끼리의 관련도 점수\nmask = np.triu(np.ones((3, 3)), k=1)       # 위쪽 삼각형(미래 위치)만 1\nscores = np.where(mask == 1, -np.inf, scores)  # 미래 자리는 -무한대로 막는다\n\ndef softmax(s):                            # 행 합이 1이 되게(-inf는 0이 됨)\n    e = np.exp(s - s.max(axis=-1, keepdims=True))\n    return e / e.sum(axis=-1, keepdims=True)\n\nweights = softmax(scores)                  # 마스킹된 어텐션 가중치\nfor i, t in enumerate(tokens):             # 각 토큰이 참고한 비율 확인\n    print(t, \"가 참고:\", weights[i].round(2))  # 뒤 토큰 비율은 항상 0",
      "note": "마스크드 셀프 어텐션은 현재 위치보다 뒤에 올 토큰을 가려, 아직 생성되지 않은 미래 단어를 참고하지 못하게 한다. GPT 같은 CLM이 왼->오 순서로 문장을 만드는 이유다."
    },
    {
      "title": "최종 출력 단계 — logits를 확률로 바꿔 다음 토큰 고르기",
      "lang": "python",
      "code": "from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저\nimport torch                               # 텐서 계산\n\nname = \"gpt2\"                              # 작은 CLM 모델\ntok = AutoTokenizer.from_pretrained(name)  # 토크나이저 로드\nmodel = AutoModelForCausalLM.from_pretrained(name)  # 모델 로드\nmodel.eval()                               # 추론 모드\n\nprompt = \"The capital of France is\"        # 다음 단어를 예측할 문장\nids = tok(prompt, return_tensors=\"pt\").input_ids  # 문장을 토큰 ID로\n\nwith torch.no_grad():                      # 기울기 계산 끔(추론)\n    logits = model(ids).logits             # 각 위치의 단어사전 크기 점수(Linear 출력)\nlast = logits[0, -1]                       # 마지막 위치의 다음-토큰 점수만 사용\nprobs = torch.softmax(last, dim=-1)        # 소프트맥스로 확률 분포 변환\ntop = torch.topk(probs, 5)                 # 확률 상위 5개 후보\n\nfor score, idx in zip(top.values, top.indices):  # 후보를 확률과 함께\n    print(tok.decode(idx), round(score.item(), 3))  # 단어와 확률 출력\n# 가장 확률 높은 토큰을 고르면(greedy) 그것이 생성되는 다음 단어",
      "note": "Transformer 마지막 단계는 결과 벡터를 Linear로 단어사전 크기만큼 펼치고(logits), Softmax로 확률을 만든 뒤 가장 높은 단어를 고른다. 생성이 곧 \"다음 토큰 확률 뽑기\"임을 눈으로 확인한다."
    }
  ],
  "sllm-1": [
    {
      "title": "KV 캐시 켜고 끄고 — 추론 속도 차이 직접 재보기",
      "lang": "python",
      "code": "from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저\nimport torch, time                         # 텐서와 시간 측정\n\nname = \"Qwen/Qwen2.5-0.5B\"                 # 가벼운 소형 모델\ntok = AutoTokenizer.from_pretrained(name)  # 토크나이저 로드\nmodel = AutoModelForCausalLM.from_pretrained(name)  # 모델 로드\nmodel.eval()                               # 추론 모드\n\nprompt = \"인공지능의 미래를 설명하면\"        # 생성 시작 문장\nids = tok(prompt, return_tensors=\"pt\").input_ids  # 토큰 ID로 변환\n\ndef run(use_cache):                        # KV 캐시 사용 여부에 따라 시간 측정\n    t = time.time()                        # 시작 시각\n    with torch.no_grad():                  # 추론\n        model.generate(ids, max_new_tokens=40, do_sample=False,\n                       use_cache=use_cache) # 캐시 on/off만 다르게\n    return round(time.time() - t, 2)       # 걸린 시간(초)\n\nprint(\"KV캐시 끔:\", run(False), \"초\")       # 매 토큰마다 과거를 다시 계산 -> 느림\nprint(\"KV캐시 켬:\", run(True), \"초\")        # 과거 Key/Value 재사용 -> 빠름",
      "note": "Transformer는 토큰을 만들 때마다 이전 토큰들의 Key/Value가 필요하다. KV 캐시는 이를 저장해 재사용함으로써 반복 계산을 없애 추론 속도를 끌어올린다."
    },
    {
      "title": "FAISS로 사내 문서 벡터 인덱스 만들고 검색하기 (RAG 검색부)",
      "lang": "python",
      "code": "from sentence_transformers import SentenceTransformer  # 문장을 벡터로 바꾸는 임베딩 모델\nimport faiss                               # 벡터 유사도 검색 라이브러리(메타 제작)\n\n# 검색 대상 사내 문서 조각들(실제로는 파일을 청크로 나눠 넣는다)\nchunks = [\n    \"연차 휴가는 입사 1년 후 15일이 부여된다.\",   # 문서1\n    \"재택근무는 팀장 승인 시 주 2회까지 가능하다.\", # 문서2\n    \"복지포인트는 매년 1월 1일에 지급된다.\",       # 문서3\n]\nembedder = SentenceTransformer(\"paraphrase-multilingual-MiniLM-L12-v2\")  # 다국어 임베딩\nvecs = embedder.encode(chunks, normalize_embeddings=True)  # 문서들을 벡터로(정규화)\n\nindex = faiss.IndexFlatIP(vecs.shape[1])   # 내적(=코사인) 기준 벡터 인덱스 생성\nindex.add(vecs)                            # 문서 벡터들을 인덱스에 저장\n\nquestion = \"재택근무 며칠까지 돼?\"           # 사용자 질문\nq_vec = embedder.encode([question], normalize_embeddings=True)  # 질문도 같은 방식으로 벡터화\nscores, ids = index.search(q_vec, k=1)     # 가장 가까운 문서 1개 검색\nprint(\"가장 관련 있는 문서:\", chunks[ids[0][0]])  # 결과: 재택근무 문서",
      "note": "FAISS는 문서 벡터를 인덱스에 담아 질문 벡터와 가장 가까운 조각을 빠르게 찾아 준다. 이렇게 찾은 근거를 sLLM 프롬프트에 붙이면 사내 문서 기반 RAG가 된다."
    },
    {
      "title": "MLM vs CLM — 빈칸 채우기와 이어 쓰기를 직접 비교",
      "lang": "python",
      "code": "from transformers import pipeline   # 허깅페이스 편의 파이프라인\n\n# 1) MLM(빈칸 채우기) - BERT 계열: 앞뒤 문맥을 '양방향'으로 보고 [MASK]를 맞힌다\nfill = pipeline('fill-mask', model='bert-base-multilingual-cased')\nfor cand in fill('서울은 한국의 [MASK]이다.')[:3]:   # 확률 높은 후보 3개\n    print('MLM 후보:', cand['token_str'], round(cand['score'], 3))\n\n# 2) CLM(다음 토큰 예측) - GPT 계열: '왼쪽 문맥만' 보고 뒤를 이어 쓴다\ngen = pipeline('text-generation', model='Qwen/Qwen2.5-0.5B')\nout = gen('서울은 한국의', max_new_tokens=20, do_sample=False)\nprint('CLM 생성:', out[0]['generated_text'])   # 문장이 자연스럽게 이어진다\n\n# 정리: MLM 은 문장 이해(분류·개체명 인식)에, CLM 은 생성(대화·요약)에 강하다\n# 요즘 sLLM(Llama·Qwen·Gemma·EXAONE)이 전부 CLM(Decoder-only)인 이유:\n#   '프롬프트 -> 응답' 학습이 다음 토큰 예측 구조와 그대로 맞아떨어지기 때문",
      "note": "MLM(BERT)은 양방향 문맥으로 빈칸을 맞추고, CLM(GPT)은 이전 토큰만 보고 다음을 예측한다. 지시-응답 형태의 파인튜닝이 CLM 의 다음 토큰 예측과 직접 일치하기 때문에, sLLM 파인튜닝은 사실상 CLM 중심으로 이루어진다."
    },
    {
      "title": "토크나이저 뜯어보기 — 분해·번호화·복원과 pad 토큰 준비",
      "lang": "python",
      "code": "from transformers import AutoTokenizer   # 모델과 짝을 이루는 토크나이저 로더\n\ntok = AutoTokenizer.from_pretrained('Qwen/Qwen2.5-0.5B')  # Qwen 토크나이저\n\ntext = '연차 신청은 어떻게 하나요?'        # 모델에 넣을 문장\ntokens = tok.tokenize(text)               # 1) 문장을 토큰 조각으로 분해\nprint('토큰 조각:', tokens)               # 한글이 여러 조각으로 쪼개진다\n\nids = tok.encode(text)                    # 2) 각 조각을 번호(ID)로 변환\nprint('토큰 ID :', ids)                   # 모델이 실제로 먹는 것은 이 숫자들\nprint('토큰 수 :', len(ids))              # 과금·컨텍스트 길이의 단위\n\nprint('복원    :', tok.decode(ids))       # 3) 번호를 다시 문장으로 복원\n\n# 학습·배치 처리 때 길이를 맞출 pad 토큰이 없는 모델은 eos 로 대신 지정한다\nif tok.pad_token is None:                 # Qwen 계열은 pad 토큰이 비어 있다\n    tok.pad_token = tok.eos_token         # 문장 끝(eos) 토큰을 패딩으로 재사용\nprint('패딩 토큰:', tok.pad_token)         # 파인튜닝 전에 꼭 거치는 준비 단계",
      "note": "LLM 은 글자가 아니라 토큰 번호를 먹기 때문에, 분해(tokenize)→번호화(encode)→복원(decode)의 왕복을 눈으로 확인하는 것이 첫걸음이다. pad_token 이 없는 모델에 eos 를 패딩으로 지정하는 것은 이후 모든 파인튜닝 실습 코드의 공통 준비 동작이다."
    },
    {
      "title": "LoRA 적용 전/후 — 학습 파라미터가 1% 미만으로 줄어드는 것 확인",
      "lang": "python",
      "code": "from transformers import AutoModelForCausalLM          # 생성형(CLM) 모델 로더\nfrom peft import LoraConfig, get_peft_model, TaskType   # LoRA 도구 3종\n\nmodel = AutoModelForCausalLM.from_pretrained('Qwen/Qwen2.5-0.5B')  # 베이스 sLLM\n\n# [적용 전] 전체 파라미터 수를 직접 세어 본다\ntotal = sum(p.numel() for p in model.parameters())   # 모든 가중치 개수 합산\nprint('전체 파라미터:', format(total, ','))            # 약 5억 개\n\n# LoRA 설정: 원래 가중치는 얼려 두고, 작은 보조 행렬만 학습한다\nlora = LoraConfig(\n    task_type=TaskType.CAUSAL_LM,   # 생성형 과제용\n    r=8,                # rank: 낮을수록 경량, 높일수록 표현력 증가\n    lora_alpha=16,      # 스케일링 계수(관례상 r 의 2배에서 시작)\n    lora_dropout=0.05,  # 과적합 방지용 드롭아웃\n    target_modules=['q_proj', 'v_proj'],   # 어텐션 투영층에만 부착\n)\nmodel = get_peft_model(model, lora)   # 모델에 LoRA 어댑터 결합\n\n# [적용 후] 실제로 학습되는 파라미터 비율을 확인한다\nmodel.print_trainable_parameters()\n# 예: trainable params: 1.1M || all params: 495M || trainable%: 0.22\n# 전체의 1% 미만만 학습해도 도메인 지식 주입이 가능한 것이 LoRA 의 힘",
      "note": "LoRA 는 기존 가중치를 얼리고 어텐션 투영층 옆에 저랭크 행렬만 붙여 학습한다. 적용 전 전체 파라미터와 적용 후 trainable 비율을 나란히 확인하면, rank(r)와 alpha 가 학습량·표현력을 조절하는 손잡이라는 것이 숫자로 보인다."
    },
    {
      "title": "GPU/CPU 환경 분기 로딩 — 어디서든 도는 실습 준비 코드",
      "lang": "python",
      "code": "import torch                                        # 장치(GPU/CPU) 확인용\nfrom transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저\n\nMODEL = 'Qwen/Qwen2.5-1.5B'        # 실습 기준 sLLM\ntok = AutoTokenizer.from_pretrained(MODEL)   # 토크나이저는 환경과 무관하게 동일\n\nif torch.cuda.is_available():      # GPU(CUDA)가 있는 환경 - 예: Colab\n    model = AutoModelForCausalLM.from_pretrained(\n        MODEL,\n        torch_dtype=torch.float16, # 절반 정밀도로 메모리 절약\n        device_map='auto',         # 모델을 GPU 에 자동 배치\n    )\n    print('GPU 로딩:', torch.cuda.get_device_name(0))   # 어떤 GPU 인지 확인\nelse:                              # CPU 만 있는 환경 - Mac/Windows 노트북 공통\n    model = AutoModelForCausalLM.from_pretrained(\n        MODEL,\n        torch_dtype=torch.float32, # CPU 는 float32 가 안전하다\n    )\n    print('CPU 로딩 완료 (느리지만 어디서나 실행된다)')\n\nif tok.pad_token is None:          # 공통 마무리: 패딩 토큰 준비\n    tok.pad_token = tok.eos_token  # eos 를 패딩으로 재사용\nmodel.config.pad_token_id = tok.pad_token_id   # 모델 설정에도 반영",
      "note": "같은 실습 코드라도 GPU 에서는 float16+device_map, CPU 에서는 float32 로 로딩 방식이 달라진다. torch.cuda.is_available() 분기 하나로 Colab 과 내 노트북 어디서든 도는 코드를 만드는 것이 sLLM 실습의 출발 준비다."
    }
  ],
  "sllm-2": [
    {
      "title": "QLoRA — 4bit로 올린 모델에 LoRA 붙여 저비용 파인튜닝",
      "lang": "python",
      "code": "import torch                             # 텐서 계산\nfrom transformers import (AutoTokenizer, AutoModelForCausalLM,\n                          BitsAndBytesConfig)  # 모델·양자화 설정\nfrom peft import (LoraConfig, get_peft_model, TaskType,\n                  prepare_model_for_kbit_training)  # PEFT 도구\n\nname = \"Qwen/Qwen2.5-1.5B-Instruct\"        # 베이스 sLLM\ntok = AutoTokenizer.from_pretrained(name)  # 토크나이저\ntok.pad_token = tok.eos_token              # 패딩 토큰 지정\n\n# 1) 4bit 양자화 설정으로 모델을 가볍게 올린다(메모리 약 1/4)\nbnb = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type=\"nf4\",\n                         bnb_4bit_compute_dtype=torch.float16)\nmodel = AutoModelForCausalLM.from_pretrained(name, quantization_config=bnb,\n                                             device_map=\"auto\")  # 4bit 로딩\nmodel = prepare_model_for_kbit_training(model)  # 양자화 모델을 학습 가능 상태로 준비\n\n# 2) LoRA 어댑터를 어텐션 투영층에만 붙인다(전체가 아닌 일부만 학습)\nlora = LoraConfig(task_type=TaskType.CAUSAL_LM, r=16, lora_alpha=32,\n                  target_modules=[\"q_proj\", \"k_proj\", \"v_proj\", \"o_proj\"])\nmodel = get_peft_model(model, lora)        # 모델에 LoRA 결합\nmodel.print_trainable_parameters()         # 학습 파라미터 비율 출력(보통 1% 미만)\n# 이후 Trainer로 소량 FAQ 데이터를 학습하면 저비용 도메인 튜닝 완성",
      "note": "QLoRA는 4bit 양자화(메모리 절감)와 LoRA(일부만 학습)를 결합해 큰 모델도 적은 자원으로 파인튜닝한다. prepare_model_for_kbit_training이 양자화 모델을 학습 가능하게 만드는 열쇠다."
    },
    {
      "title": "Prompt Tuning — 가중치는 그대로, 입력 앞 \"가상 토큰\"만 학습",
      "lang": "python",
      "code": "from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저\nfrom peft import (PromptTuningConfig, PromptTuningInit,\n                  get_peft_model, TaskType)  # 프롬프트 튜닝 도구\n\nname = \"Qwen/Qwen2.5-0.5B\"                 # 베이스 sLLM\ntok = AutoTokenizer.from_pretrained(name)  # 토크나이저\nbase = AutoModelForCausalLM.from_pretrained(name)  # 베이스 모델\n\n# 학습 대상은 오직 입력 앞에 붙는 가상 토큰의 임베딩뿐이다\ncfg = PromptTuningConfig(\n    task_type=TaskType.CAUSAL_LM,          # 생성형(CLM) 과제\n    prompt_tuning_init=PromptTuningInit.TEXT,  # 문장으로 초기화\n    num_virtual_tokens=20,                 # 학습되는 가상 토큰 수(매우 적음)\n    prompt_tuning_init_text=\"다음 사내 문서를 바탕으로 정확히 답하라:\",  # 초기 지시문\n    tokenizer_name_or_path=name,           # 초기 문구를 토큰화할 토크나이저\n)\nmodel = get_peft_model(base, cfg)          # 베이스 모델 앞에 가상 프롬프트를 붙인다\nmodel.print_trainable_parameters()         # 학습 파라미터가 극소량임을 확인",
      "note": "프롬프트 튜닝은 모델 내부 가중치 전체가 아니라 입력 앞에 붙는 작은 프롬프트 임베딩만 학습한다. 저장·연산 자원이 극도로 제한된 On-Device 환경에 적합하다."
    },
    {
      "title": "맥락 압축 — 긴 문서를 핵심만 줄여 넣고 답하기",
      "lang": "python",
      "code": "from transformers import AutoModelForCausalLM, AutoTokenizer  # 모델·토크나이저\nimport torch                               # 텐서 계산\n\nname = \"Qwen/Qwen2.5-1.5B-Instruct\"        # sLLM\ntok = AutoTokenizer.from_pretrained(name)  # 토크나이저\nmodel = AutoModelForCausalLM.from_pretrained(name)  # 모델\nmodel.eval()                               # 추론 모드\n\ndef generate(prompt, n=200):               # 프롬프트를 넣어 텍스트를 생성\n    ids = tok(prompt, return_tensors=\"pt\").input_ids  # 토큰화\n    with torch.no_grad():                  # 추론\n        out = model.generate(ids, max_new_tokens=n, do_sample=False)  # 생성\n    return tok.decode(out[0], skip_special_tokens=True)  # 문자열로 복원\n\nlong_doc = \"연차는 입사 1년 후 15일 부여. 반차는 오전·오후로 신청 가능. (이하 긴 규정 원문)\"  # 긴 문서\n# 1) 먼저 문서를 질문 답변에 쓸 '핵심 맥락'으로 압축한다\ncompressed = generate(\"다음 문서를 핵심 규칙만 남겨 압축하라:\\n\" + long_doc, n=150)\n# 2) 압축된 맥락만 근거로 질문에 답한다(토큰 절약 + 잡음 감소)\nanswer = generate(\"아래 맥락만 근거로 답하라.\\n[맥락]\\n\" + compressed + \"\\n[질문]\\n연차는 며칠?\")\nprint(answer)                              # 압축 맥락에 근거한 답 출력",
      "note": "검색된 문서를 통째로 넣으면 토큰이 낭비되고 잡음이 섞인다. 먼저 핵심만 압축한 뒤 그 맥락으로 답하면 제한된 컨텍스트를 효율적으로 쓰면서 정확도를 지킬 수 있다."
    },
    {
      "title": "Trainer 로 미니 파인튜닝 실행 — 하이퍼파라미터의 의미까지",
      "lang": "python",
      "code": "# 앞 예제에서 LoRA 를 붙인 model 과 tok 을 그대로 사용한다고 가정\nfrom datasets import load_dataset                  # JSONL 학습셋 로더\nfrom transformers import (Trainer, TrainingArguments,\n                          DataCollatorForLanguageModeling)  # 학습 도구 3종\n\n# faq_train.jsonl: 한 줄에 {'question': ..., 'answer': ...} 형식의 사내 FAQ\ndataset = load_dataset('json', data_files='faq_train.jsonl')['train']\n\ndef build_prompt(ex):              # Q/A 쌍을 하나의 학습 문장으로 조립\n    text = '다음은 사내 FAQ입니다.\\n\\nQ: ' + ex['question'] + '\\nA: ' + ex['answer'] + tok.eos_token\n    return {'text': text}          # 끝에 eos: '여기서 답이 끝난다'를 가르친다\n\ndef tokenize(ex):                  # 문장을 토큰으로 바꾸고 정답(labels)을 만든다\n    out = tok(ex['text'], truncation=True, max_length=512, padding='max_length')\n    out['labels'] = out['input_ids'].copy()   # CLM: 입력 그대로가 다음 토큰의 정답\n    return out\n\ndata = dataset.map(build_prompt).map(tokenize, remove_columns=dataset.column_names)\n\nargs = TrainingArguments(\n    output_dir='./qwen-lora-faq',      # 체크포인트 저장 폴더\n    num_train_epochs=3,                # 전체 데이터를 3바퀴 학습\n    per_device_train_batch_size=1,     # 한 번에 1건(메모리 절약)\n    gradient_accumulation_steps=4,     # 4번 모아 1번 업데이트 = 실질 배치 4\n    learning_rate=2e-4,                # LoRA 는 비교적 큰 학습률을 쓴다\n    logging_steps=10,                  # 10스텝마다 loss 출력(학습 모니터링)\n    report_to='none',                  # 외부 로깅 서비스 끔\n)\ncollator = DataCollatorForLanguageModeling(tokenizer=tok, mlm=False)  # CLM 용 배치 조립\ntrainer = Trainer(model=model, args=args, train_dataset=data, data_collator=collator)\ntrainer.train()                        # loss 가 점점 줄어드는지 지켜본다\nmodel.save_pretrained('./qwen-faq-lora')   # LoRA 어댑터만 저장(용량 수 MB)",
      "note": "학습의 실체는 프롬프트 조립→토큰화(labels=input_ids)→Trainer 실행의 3단계다. 배치 1에 gradient_accumulation 4를 곱해 실질 배치를 키우고, LoRA 특유의 큰 학습률(2e-4)과 logging_steps 로 loss 감소를 관찰하는 것이 하이퍼파라미터 읽기의 시작이다."
    },
    {
      "title": "Long-Context 확장(YaRN) — 긴 계약서를 압축 없이 통째로 넣기",
      "lang": "python",
      "code": "import torch                                        # 텐서 계산\nfrom transformers import AutoConfig, AutoTokenizer, AutoModelForCausalLM\n\nMODEL = 'Qwen/Qwen2.5-1.5B-Instruct'   # 기본 32K 컨텍스트 모델\n\n# 1) 설정을 먼저 불러와 RoPE 스케일링(YaRN)으로 컨텍스트를 약 4배 확장\nconfig = AutoConfig.from_pretrained(MODEL)\nconfig.rope_scaling = {\n    'rope_type': 'yarn',                        # 위치 인코딩을 늘려 잡는 기법\n    'factor': 4.0,                              # 32K -> 약 128K 로 확장\n    'original_max_position_embeddings': 32768,  # 원래 학습된 최대 길이\n}\n\ntok = AutoTokenizer.from_pretrained(MODEL)          # 토크나이저 로드\nmodel = AutoModelForCausalLM.from_pretrained(       # 확장 설정을 적용해 로드\n    MODEL, config=config, torch_dtype=torch.float32)\n\n# 2) 긴 문서 원문을 '압축하지 않고 통째로' 넣어 질문한다\nlong_doc = '제1조 ... (수만 자짜리 계약서 원문이라고 가정) ...'\nprompt = '다음 문서 원문을 그대로 참고해 답하세요.\\n[문서]\\n' + long_doc + '\\n[질문]\\n손해배상 예외 사유는?\\n[답변]\\n'\nids = tok(prompt, return_tensors='pt', truncation=True, max_length=32768 * 4)\nprint('입력 토큰 수:', ids['input_ids'].shape[1])    # 얼마나 긴 입력인지 확인\nout = model.generate(**ids, max_new_tokens=200, do_sample=False)\nprint(tok.decode(out[0], skip_special_tokens=True))  # 원문 근거 그대로 답변",
      "note": "요약 압축은 빠르지만 세부 정보가 유실될 수 있고, YaRN 으로 컨텍스트를 확장하면 원문 손실은 없는 대신 연산·메모리 부담이 커진다. 조항 하나하나가 중요한 계약서 검토처럼 '세부가 생명'인 작업에서 Long-Context 를 선택하는 판단 기준을 익힌다."
    },
    {
      "title": "FastAPI 로 파인튜닝 sLLM 서빙 — /ask 한 개로 시작하는 API 서버",
      "lang": "python",
      "code": "# app.py - 파인튜닝된 sLLM 을 API 로 여는 최소 서빙 코드\nfrom fastapi import FastAPI            # pip install fastapi uvicorn\nfrom pydantic import BaseModel         # 요청 형식을 검증하는 도구\n\napp = FastAPI(title='사내 FAQ sLLM')    # API 서버 객체 생성\n\nclass Ask(BaseModel):                  # /ask 로 들어올 요청의 형태 선언\n    question: str                      # 질문 문자열(필수)\n    max_new_tokens: int = 128          # 답변 길이 상한(기본 128)\n\n@app.get('/health')                    # 서버 상태 확인용(배포 체크리스트 항목)\ndef health():\n    return {'status': 'ok', 'model': 'Qwen2.5-1.5B + LoRA'}\n\n@app.post('/ask')                      # 질문을 받아 답을 돌려주는 핵심 창구\ndef ask(req: Ask):\n    # 학습 때와 '같은 형식'의 프롬프트로 조립해야 성능이 안정적이다\n    prompt = '다음은 사내 FAQ입니다.\\n\\nQ: ' + req.question + '\\nA:'\n    answer = generate_text(prompt, req.max_new_tokens)  # 학습 실습의 생성 함수 재사용\n    return {'question': req.question, 'answer': answer}\n\n# 실행: uvicorn app:app --port 8000\n# 접속: http://localhost:8000/docs (Swagger 화면에서 바로 눌러 테스트)\n# 배포 전 점검: 응답 지연시간(예: 3초 이내), 검색 결과 없음·토큰 초과 예외 처리",
      "note": "튜닝한 모델은 파일로 두면 끝이 아니라 API 로 열어야 서비스가 된다. FastAPI 는 Pydantic 으로 요청을 검증하고 /docs 스와거 화면을 공짜로 만들어 주며, /health 응답·지연시간·예외 처리는 교재 배포 체크리스트의 필수 점검 항목이다."
    },
    {
      "title": "RAG vs Fine-Tuning — 도메인 지식을 넣는 두 갈래 선택 기준",
      "lang": "text",
      "code": "# 도메인 지식 주입의 두 갈래 - 서로 다른 층위의 작업이다\n[RAG / 벡터DB 검색]\n  - 지식 위치: 외부 벡터DB (실행 시점에 검색해 근거로 제시)\n  - 최신성  : 문서만 갈아끼우면 즉시 반영\n  - 잘하는 것: 사실 검색, 근거 제시, 자주 바뀌는 규정 대응\n  - 한계    : 검색 품질에 성능이 좌우, 추론·판단형 질문에 약함\n\n[Fine-Tuning / 파라미터 학습]\n  - 지식 위치: 모델 가중치 내부 (학습으로 내재화)\n  - 최신성  : 바뀔 때마다 재학습 필요(비용·시간 소요)\n  - 잘하는 것: 전문 용어·응답 말투·판단 기준 자체를 모델에 심기\n  - 한계    : 재학습 비용, 과적합 위험\n\n[실무 결론]\n  - 둘은 경쟁이 아니라 결합: 검색(RAG) + 맥락 압축 + LoRA 튜닝 모델\n  - 예: 계약서 검토 보조 = 맥락압축 60% + LoRA(법무 용어 주입) 40%\n  - 실패 패턴 1: RAG 만 쓰다 실패 - 근거 문서가 없는 추론 질문에 취약\n  - 실패 패턴 2: 튜닝만 쓰다 실패 - 자주 바뀌는 규정을 재학습이 못 따라감\n  - 임베딩과 sLLM 의 언어 커버리지가 어긋나면 검색은 돼도 답변 품질이 떨어진다",
      "note": "RAG 는 지식을 밖(벡터DB)에 두고 검색하고, Fine-Tuning 은 지식을 안(가중치)에 심는다는 근본 차이가 있다. 실무에서는 둘 중 하나가 아니라 목적에 따라 비중을 배분해 결합하며, 작은 시나리오로 시작해 비중을 조정하는 것이 검증된 접근이다."
    }
  ],
  "langchain-1": [
    {
      "title": "LCEL batch — 여러 입력을 한 번에 처리",
      "lang": "python",
      "code": "from langchain_core.prompts import ChatPromptTemplate  # 프롬프트 양식 도구\nfrom langchain_core.output_parsers import StrOutputParser  # 답에서 글자만 추출\nfrom langchain_anthropic import ChatAnthropic  # 클로드 모델 연동\n\nprompt = ChatPromptTemplate.from_template(\"다음 문장을 영어로 번역해줘: {text}\")  # 빈칸 text\nchain = prompt | ChatAnthropic(model=\"claude-opus-4-8\") | StrOutputParser()  # 프롬프트->모델->파서\n\n# 여러 입력을 리스트로 준비한다(각 딕셔너리가 한 번의 실행)\ninputs = [\n    {\"text\": \"안녕하세요\"},              # 첫 번째 문장\n    {\"text\": \"오늘 날씨가 좋네요\"},       # 두 번째 문장\n    {\"text\": \"저는 AI를 공부합니다\"},     # 세 번째 문장\n]\n# invoke는 1건씩, batch는 여러 건을 한 번에 처리한다(내부적으로 병렬)\nresults = chain.batch(inputs)              # 세 문장을 한꺼번에 번역\nfor r in results:                          # 결과 리스트를 하나씩 꺼내\n    print(r)                               # 번역문 출력",
      "note": "batch를 쓰면 여러 입력을 한 번에 처리해 반복 invoke보다 빠르다. 대량 문서 번역·요약처럼 입력이 많을 때 효과가 크다."
    },
    {
      "title": "RunnableLambda / RunnablePassthrough — 사용자 함수를 체인 부품으로",
      "lang": "python",
      "code": "from langchain_core.runnables import RunnableLambda, RunnablePassthrough  # 사용자 함수·통과 러너블\nfrom langchain_core.prompts import ChatPromptTemplate  # 프롬프트 양식\nfrom langchain_core.output_parsers import StrOutputParser  # 문자열 파서\nfrom langchain_anthropic import ChatAnthropic  # 클로드 모델\n\n# 1) 평범한 파이썬 함수를 러너블로 감싸면 체인 부품이 된다\nto_upper = RunnableLambda(lambda x: x.upper())  # 입력 문자열을 대문자로\nprint(to_upper.invoke(\"langchain\"))        # 결과: LANGCHAIN\n\n# 2) RunnablePassthrough: 받은 입력을 그대로 다음 단계로 흘려보낸다\nprompt = ChatPromptTemplate.from_template(\"{text}를 한 문장으로 요약해줘\")  # 빈칸 text\nchain = ({\"text\": RunnablePassthrough()}   # 들어온 문자열을 text 자리에 그대로 꽂는다\n         | prompt\n         | ChatAnthropic(model=\"claude-opus-4-8\")\n         | StrOutputParser())\n# 딕셔너리로 감싸지 않아도 문자열 입력이 text로 전달된다\nprint(chain.invoke(\"랭체인은 LLM 앱을 부품처럼 조립하게 돕는 프레임워크다.\"))  # 요약 출력",
      "note": "RunnableLambda로 임의의 함수를(전처리·후처리) 체인에 끼워 넣고, RunnablePassthrough로 입력을 원하는 키에 그대로 전달한다. 체인 사이사이에 내 로직을 자연스럽게 삽입하는 도구다."
    },
    {
      "title": "비동기 ainvoke — 여러 호출을 동시에 띄워 시간 아끼기",
      "lang": "python",
      "code": "import asyncio                            # 비동기 실행 관리 표준 라이브러리\nfrom langchain_core.prompts import ChatPromptTemplate  # 프롬프트 양식\nfrom langchain_core.output_parsers import StrOutputParser  # 문자열 파서\nfrom langchain_anthropic import ChatAnthropic  # 클로드 모델\n\nprompt = ChatPromptTemplate.from_template(\"한 문장으로 답해줘: {q}\")  # 빈칸 q\nchain = prompt | ChatAnthropic(model=\"claude-opus-4-8\") | StrOutputParser()  # 체인 조립\n\nasync def main():                          # 비동기 함수 정의\n    questions = [\"하늘은 왜 파랄까?\", \"무지개는 왜 생길까?\", \"바다는 왜 짤까?\"]  # 질문 3개\n    # ainvoke는 비동기 호출, gather로 3개를 동시에 띄운다(순차 대기 없음)\n    answers = await asyncio.gather(*[chain.ainvoke({\"q\": q}) for q in questions])\n    for q, a in zip(questions, answers):   # 질문과 답을 짝지어\n        print(q, \"->\", a)                  # 함께 출력\n\nasyncio.run(main())                        # 비동기 함수 실행",
      "note": "순차 invoke면 대기 시간이 합산되지만, ainvoke+gather는 여러 호출을 겹쳐 전체 시간을 크게 줄인다. 네트워크 호출처럼 기다림이 많은 작업에 특히 효과적이다."
    }
  ],
  "langchain-2": [
    {
      "title": "@chain 데코레이터 — 여러 체인을 하나의 흐름으로 잇기",
      "lang": "python",
      "code": "from langchain_core.runnables import chain  # 함수를 체인(러너블)으로 바꾸는 데코레이터\nfrom langchain_core.prompts import ChatPromptTemplate  # 프롬프트 양식\nfrom langchain_core.output_parsers import StrOutputParser  # 문자열 파서\nfrom langchain_anthropic import ChatAnthropic  # 클로드 모델\n\nmodel = ChatAnthropic(model=\"claude-opus-4-8\")  # 공용 모델 객체\n# 1단계 체인: 주제를 한 문장으로 설명\nexplain = ChatPromptTemplate.from_template(\"{topic}를 한 문장으로 설명해줘\") | model | StrOutputParser()\n# 2단계 체인: 설명을 인스타 게시글로 변환\nto_post = ChatPromptTemplate.from_template(\"다음 설명을 이모지 넣은 인스타 게시글로: {text}\") | model | StrOutputParser()\n\n# @chain을 붙이면 평범한 함수가 하나의 러너블이 된다\n@chain\ndef explain_then_post(topic):              # 두 단계를 순서대로 잇는 사용자 정의 흐름\n    step1 = explain.invoke({\"topic\": topic})   # 먼저 설명을 만들고\n    return to_post.invoke({\"text\": step1})     # 그 결과를 다음 체인 입력으로 넘긴다\n\nprint(explain_then_post.invoke(\"양자역학\"))  # 설명->게시글 두 단계가 한 번에 실행됨",
      "note": "@chain 데코레이터로 여러 체인 호출을 하나의 흐름으로 묶으면, 앞 체인 결과를 뒤 체인 입력으로 자연스럽게 연결할 수 있다. 파이프(|)로 표현하기 복잡한 다단계 로직에 유용하다."
    },
    {
      "title": "FewShotPromptTemplate — 예시 몇 개로 답변 형식 고정",
      "lang": "python",
      "code": "from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate  # 퓨샷·기본 양식\n\n# 1) 모델에게 보여줄 정답 예시 몇 개를 준비한다\nexamples = [\n    {\"q\": \"행복\", \"a\": \"행복 -> 기쁨, 만족, 웃음\"},   # 예시1: 단어->키워드 3개\n    {\"q\": \"슬픔\", \"a\": \"슬픔 -> 눈물, 우울, 상실\"},   # 예시2: 같은 형식\n]\n# 2) 예시 하나를 어떻게 보여줄지 양식을 정한다\nexample_prompt = PromptTemplate(\n    input_variables=[\"q\", \"a\"],            # 예시가 가진 변수\n    template=\"Q: {q}\\nA: {a}\",            # 한 예시의 표시 형태\n)\n# 3) 예시들 + 사용자 질문 자리를 합쳐 퓨샷 프롬프트를 만든다\nfew_shot = FewShotPromptTemplate(\n    examples=examples,                     # 위에서 만든 예시 목록\n    example_prompt=example_prompt,         # 예시 표시 양식\n    suffix=\"Q: {word}\\nA:\",              # 마지막에 붙는 사용자 입력 자리\n    input_variables=[\"word\"],              # 사용자가 채울 변수\n)\n# 완성된 프롬프트를 눈으로 확인한다(예시 2개 + 새 질문)\nprint(few_shot.format(word=\"분노\"))         # 모델은 같은 형식으로 답하게 유도된다",
      "note": "원하는 답변 형식을 말로 길게 설명하는 대신 예시 몇 개를 보여주면, 모델이 그 형식을 그대로 따라 한다. 프롬프트로 표현하기 어려운 출력 스타일을 잡을 때 강력하다."
    },
    {
      "title": "Partial Prompt — 공통 변수는 미리 채워 재사용",
      "lang": "python",
      "code": "from langchain_core.prompts import PromptTemplate  # 기본 프롬프트 양식\n\n# 빈칸 두 개(task, text)를 가진 원본 양식을 만든다\ntemplate = PromptTemplate(\n    input_variables=[\"task\", \"text\"],      # 채워야 할 변수 두 개\n    template=\"너는 도우미다.\\n작업: {task}\\n입력: {text}\\n답변:\",  # 지시 양식\n)\n# partial: 변수 일부(task)를 미리 고정해 둔다\ntranslate = template.partial(task=\"다음 문장을 영어로 번역\")  # task가 이미 채워진 양식\nsummarize = template.partial(task=\"다음 문장을 한 줄로 요약\")  # 같은 양식에 다른 작업 고정\n\n# 이제 남은 변수(text)만 채우면 바로 완성된 프롬프트가 된다\nprint(translate.format(text=\"오늘 회의는 3시입니다.\"))  # 번역용 프롬프트 완성\nprint(summarize.format(text=\"오늘 회의는 3시입니다.\"))  # 요약용 프롬프트 완성",
      "note": "partial로 공통 부분(역할·작업)을 미리 채워 두면, 매번 바뀌는 값만 넣어 같은 양식을 여러 용도로 재사용할 수 있다."
    }
  ],
  "langchain-3": [
    {
      "title": "LangGraph 첫걸음 — State·Node·Edge로 그래프 만들기",
      "lang": "python",
      "code": "from typing import TypedDict            # 상태의 모양을 정의하는 타입\nfrom langgraph.graph import StateGraph, END  # 그래프 뼈대와 종료 표시\n\n# 1) State: 그래프 전체가 공유하는 데이터 상자(질문과 답을 담는다)\nclass GraphState(TypedDict):\n    query: str                             # 사용자 질문\n    answer: str                            # 만들어질 답\n\n# 2) Node: 한 단계 작업을 하는 함수(상태를 받아 일부를 채워 돌려준다)\ndef process(state: GraphState):\n    q = state[\"query\"]                     # 상태에서 질문을 꺼내\n    return {\"answer\": f\"'{q}'에 대한 답입니다.\"}  # answer 필드를 채워 반환\n\n# 3) 그래프를 조립한다\nbuilder = StateGraph(GraphState)           # 상태 형태로 그래프 생성\nbuilder.add_node(\"process\", process)       # process 노드 등록\nbuilder.set_entry_point(\"process\")         # 시작점 지정\nbuilder.add_edge(\"process\", END)           # process 후 종료로 연결\napp = builder.compile()                    # 실행 가능한 앱으로 컴파일\n\n# 4) 실행: 초기 상태를 넣으면 노드를 거쳐 최종 상태가 나온다\nprint(app.invoke({\"query\": \"LangGraph가 뭐야?\"})[\"answer\"])  # 답 출력",
      "note": "LangChain 체인이 직선 흐름이라면, LangGraph는 State(상태)를 Node들이 이어받아 갱신하는 구조다. 이 상태 공유가 이후 분기·반복의 토대가 된다."
    },
    {
      "title": "조건 분기(Conditional Edge) — 질문 유형별로 노드 라우팅",
      "lang": "python",
      "code": "from typing import TypedDict            # 상태 타입\nfrom langgraph.graph import StateGraph, END  # 그래프 뼈대\n\nclass GraphState(TypedDict):               # 공유 상태\n    query: str                             # 질문\n    intent: str                            # 분류 결과\n    answer: str                            # 최종 답\n\ndef router(state: GraphState):             # 질문을 보고 갈 길을 정하는 노드\n    q = state[\"query\"]                     # 질문을 꺼내\n    return {\"intent\": \"policy\" if \"정책\" in q else \"general\"}  # 키워드로 분류\n\ndef policy_node(state):                    # 정책 담당 노드\n    return {\"answer\": \"정책 관련 답변입니다.\"}\ndef general_node(state):                   # 일반 담당 노드\n    return {\"answer\": \"일반 답변입니다.\"}\n\nbuilder = StateGraph(GraphState)           # 그래프 생성\nbuilder.add_node(\"router\", router)         # 분류 노드\nbuilder.add_node(\"policy\", policy_node)    # 정책 노드\nbuilder.add_node(\"general\", general_node)  # 일반 노드\nbuilder.set_entry_point(\"router\")          # 분류부터 시작\n# intent 값에 따라 다음 노드를 고른다(조건 분기의 핵심)\nbuilder.add_conditional_edges(\"router\", lambda s: s[\"intent\"],\n    {\"policy\": \"policy\", \"general\": \"general\"})\nbuilder.add_edge(\"policy\", END)            # 정책 노드 후 종료\nbuilder.add_edge(\"general\", END)           # 일반 노드 후 종료\napp = builder.compile()                    # 컴파일\n\nprint(app.invoke({\"query\": \"회사 정책 알려줘\"})[\"answer\"])  # 정책 노드로 라우팅됨",
      "note": "add_conditional_edges가 상태 값에 따라 다른 노드로 흐름을 가른다. 질문 유형별(RAG/DB/일반 상담)로 처리를 나누는 라우팅이 LangGraph의 대표 패턴이다."
    },
    {
      "title": "LangChain 체인 vs LangGraph — 언제 무엇을 쓰나",
      "lang": "text",
      "code": "# 같은 일도 흐름의 복잡도에 따라 도구를 다르게 고른다\n[LangChain 체인만으로 충분]\n  - 단계가 단순하고 거의 직선(순차) 흐름이다\n  - 분기·반복·상태 공유가 거의 없다\n  - 예: 프롬프트 -> 모델 -> 파서 로 끝나는 요약기·번역기\n[LangGraph가 필요]\n  - 질문 유형에 따라 경로가 갈린다(라우팅이 많다)\n  - 검색->생성->근거부족시 재검색 같은 반복 루프가 있다\n  - 도구를 여러 번 호출하거나 에이전트끼리 협업한다\n  - 중간 상태를 저장했다가 중단/재개해야 한다\n# 정리: '직선이면 체인, 갈래·되돌이가 있으면 그래프'",
      "note": "LangGraph가 항상 정답은 아니다. 단순 직선 흐름은 체인이 더 간단하고, 분기·재시도·상태관리가 필요할 때 그래프의 이점이 커진다."
    }
  ],
  "ml-dl-2": [
    {
      "title": "합성곱(Conv2d) 한 번 직접 통과시켜 피처맵 뽑기",
      "lang": "python",
      "code": "# 덱의 \"필터가 이미지 위를 stride만큼 미끄러지며 특징을 뽑는다\"를 코드로 체감\nimport torch                                  # 파이토치 본체. 텐서(다차원 배열) 연산을 담당한다.\nimport torch.nn as nn                         # 신경망 층(레이어)들이 모여 있는 모듈. Conv2d도 여기 있다.\n\n# 입력 이미지 한 장을 흉내낸다. 모양은 (배치=1, 채널=1, 높이=5, 너비=5) 이다.\n# CNN은 항상 (N, C, H, W) 4차원을 먹는다. 흑백이라 채널은 1개, 크기는 5x5로 작게 잡았다.\nx = torch.tensor([[1,2,3,0,1],\n                  [0,1,2,3,0],\n                  [3,0,1,2,3],\n                  [2,3,0,1,2],\n                  [1,2,3,0,1]], dtype=torch.float32).reshape(1, 1, 5, 5)\n\n# 합성곱 층 하나를 정의한다. 입력채널1 -> 출력채널1(필터 1장), 커널(돋보기) 크기 3x3.\n# padding=0, stride=1 이면 5x5가 3x3으로 줄어든다. 이 \"크기 줄어듦\"이 덱에서 말한 output size 변형이다.\nconv = nn.Conv2d(in_channels=1, out_channels=1, kernel_size=3, stride=1, padding=0)\n\n# 필터 가중치를 직접 지정해 결과를 눈으로 검산할 수 있게 만든다(보통은 학습으로 정해진다).\n# 이 3x3 필터가 이미지의 각 위치와 곱-합(합성곱)되어 그 자리의 특징값 하나를 만든다.\nconv.weight.data = torch.ones(1, 1, 3, 3)     # 모든 칸이 1인 필터 = 3x3 영역의 '합'을 구하는 필터\nconv.bias.data = torch.zeros(1)               # 편향은 0으로 둬서 순수 합성곱 결과만 관찰한다.\n\nfeature_map = conv(x)                          # 필터를 이미지 위로 미끄러뜨리며 전체를 훑는다.\nprint('입력 크기 :', tuple(x.shape))           # (1, 1, 5, 5)\nprint('출력 크기 :', tuple(feature_map.shape)) # (1, 1, 3, 3) — 5x5가 3x3 피처맵으로 압축됐다.\nprint('피처맵:')                                # 각 값은 그 위치 3x3 영역의 합이다(필터가 전부 1이므로).\nprint(feature_map[0, 0])\n# 핵심: 원본은 그대로 두고, 필터와의 연산 결과인 '특징(feature map)'만 새로 만들어낸다.",
      "note": "덱의 Convolution Layer를 한 줄씩 실행해 본다. (N,C,H,W) 4차원 규칙과, padding 없이 3x3 필터를 통과하면 5x5가 3x3으로 줄어드는 output size 변형을 눈으로 확인시킨다. 필터를 전부 1로 고정해 결과를 손으로 검산할 수 있게 한 점이 왕초보용 포인트다."
    },
    {
      "title": "Padding과 MaxPooling으로 크기 보정하고 대표값 추리기",
      "lang": "python",
      "code": "# 덱 순서 그대로: padding으로 크기를 지키고 -> pooling으로 중요한 값만 남긴다\nimport torch                                  # 텐서 연산 라이브러리.\nimport torch.nn as nn                         # 층 정의 모듈.\n\nx = torch.arange(1, 17, dtype=torch.float32).reshape(1, 1, 4, 4)  # 1~16을 4x4 이미지로 만든다.\nprint('원본 4x4:'); print(x[0, 0])            # 실습 데이터가 어떻게 생겼는지 먼저 확인한다.\n\n# padding=1 이면 바깥 테두리에 0을 한 겹 둘러 6x6이 된다. 그 뒤 3x3 필터를 통과하면 다시 4x4로 나온다.\n# 덱에서 말한 \"합성곱 후 줄어드는 크기를 0으로 채워 보정\"이 바로 이 padding의 역할이다.\nconv = nn.Conv2d(1, 1, kernel_size=3, stride=1, padding=1)\nsame = conv(x)                                 # padding 덕분에 입력과 출력의 H,W가 같게 유지된다.\nprint('padding=1 통과 후 크기:', tuple(same.shape))  # (1, 1, 4, 4) — 크기가 안 줄었다.\n\n# MaxPooling: 2x2 창 안에서 '가장 큰 값' 하나만 남기고 나머지는 버린다. 학습 파라미터가 없다.\n# 사진을 절반 크기로 줄이되 가장 두드러진 특징(최댓값)만 보존해, 계산량을 줄이고 위치 변화에 강해진다.\npool = nn.MaxPool2d(kernel_size=2, stride=2)\npooled = pool(x)                               # 4x4 -> 2x2 로 절반씩 축소된다.\nprint('MaxPool 결과(2x2):'); print(pooled[0, 0])  # 각 2x2 블록의 최댓값(6,8,14,16)만 남는다.\n# 정리: Conv로 특징을 뽑고(Padding으로 크기 관리), Pooling으로 핵심만 추려 다음 층으로 넘긴다.",
      "note": "Padding(크기 보정)과 MaxPooling(대표값 추출, 학습 파라미터 없음)을 한 흐름에 보여준다. padding=1 + 3x3 필터가 입력 크기를 그대로 유지한다는 실무 공식과, MaxPool이 왜 계산량을 줄이고 위치 변화에 강해지는지를 실제 숫자로 확인시킨다."
    },
    {
      "title": "작은 CNN 분류기 통째로 — Conv→Pool→Flatten→FC→Softmax",
      "lang": "python",
      "code": "# 덱 요약 \"특징 뽑고(Conv) 추리고(Pool) 펼쳐서(Flatten) 분류(FC+Softmax)\"를 한 모델로\nimport torch                                  # 텐서/자동미분 라이브러리.\nimport torch.nn as nn                         # 신경망 층 모음.\n\n# MNIST 손글씨 숫자 한 장을 흉내낸 입력: (배치8, 채널1, 28x28). 정답은 0~9 중 하나(10분류)다.\nx = torch.randn(8, 1, 28, 28)                 # 실제로는 이미지지만 여기선 난수로 형태만 맞춘다.\n\nclass SmallCNN(nn.Module):                     # 파이토치 모델은 nn.Module을 상속해 만든다.\n    def __init__(self):\n        super().__init__()                     # 부모 초기화는 반드시 먼저 호출해야 층 등록이 된다.\n        # 특징 추출부: Conv로 특징맵을 만들고 ReLU로 비선형성을 준 뒤 Pool로 절반 크기로 줄인다.\n        self.conv1 = nn.Conv2d(1, 16, 3, padding=1)   # 1채널 -> 16장의 특징맵, 크기는 padding으로 28 유지.\n        self.conv2 = nn.Conv2d(16, 32, 3, padding=1)  # 16 -> 32장. 깊어질수록 필터(특징) 수를 늘리는 관례.\n        self.pool = nn.MaxPool2d(2, 2)                # 2x2 풀링. 통과할 때마다 H,W가 절반이 된다.\n        self.relu = nn.ReLU()                         # 음수는 0으로 잘라 중요한 신호만 통과시킨다.\n        # 분류부: 펼친 특징 벡터를 받아 10개 클래스 점수로 바꾸는 완전연결층(FC).\n        # 28 -> pool 두 번 -> 7 이므로, 32채널 x 7 x 7 = 1568 개의 값이 펼쳐진다.\n        self.fc = nn.Linear(32 * 7 * 7, 10)\n\n    def forward(self, x):\n        x = self.pool(self.relu(self.conv1(x)))  # conv1 -> ReLU -> pool. 28x28 특징맵이 14x14로 준다.\n        x = self.pool(self.relu(self.conv2(x)))  # conv2 -> ReLU -> pool. 14x14가 다시 7x7로 준다.\n        x = x.flatten(1)                          # 배치는 두고 나머지를 1줄로 펼친다 -> 분류기가 먹을 수 있는 벡터.\n        return self.fc(x)                         # 10개 클래스별 '점수(logit)'를 낸다.\n\nmodel = SmallCNN()                             # 모델 생성.\nlogits = model(x)                              # 순전파: 이미지 8장을 한 번에 통과시킨다.\nprobs = torch.softmax(logits, dim=1)           # 점수를 확률(합=1)로 바꾼다. 덱의 Softmax가 이 역할이다.\nprint('출력 점수 크기:', tuple(logits.shape))   # (8, 10) — 이미지 8장 x 클래스 10개.\nprint('첫 장의 예측 숫자:', probs[0].argmax().item())  # 가장 확률이 큰 위치 = 모델이 고른 숫자.\n# 파라미터 없는 Pool과 달리 Conv/FC의 가중치는 학습으로 정해진다 -> 앞 차시의 학습 루프를 그대로 붙이면 된다.",
      "note": "덱의 CNN 전체 파이프라인(Conv+ReLU → Pool 반복 → Flatten → FC → Softmax)을 하나의 nn.Module로 조립한다. 28→14→7로 풀링마다 크기가 절반이 되는 계산을 주석으로 따라가 FC 입력 차원 32*7*7이 어디서 나오는지 스스로 유도하게 만든 것이 학습 포인트다."
    },
    {
      "title": "RNN 기초 — 시퀀스를 한 스텝씩 기억하며 처리하기",
      "lang": "python",
      "code": "# 덱의 \"이전 시점 정보를 Hidden State에 저장해 다음을 예측\"을 nn.RNN으로 확인\nimport torch                                  # 텐서 라이브러리.\nimport torch.nn as nn                         # RNN 층이 들어 있는 모듈.\n\n# 시퀀스 데이터: (배치=2, 시간길이=5, 입력특징=3). 예로 5일간 매일 3개 센서값을 읽었다고 보면 된다.\n# RNN은 이 시간 축(길이 5)을 한 스텝씩 순서대로 훑으며, 순서와 관계 정보를 기억한다.\nx = torch.randn(2, 5, 3)\n\n# input_size=3(매 시점 입력 3차원), hidden_size=8(기억 상태 8차원). batch_first=True로 (N,T,F) 순서를 쓴다.\n# 같은 Cell을 시간 축을 따라 펼쳐 쓰는 구조라, 가중치는 모든 시점이 '공유'한다(덱의 핵심 포인트).\nrnn = nn.RNN(input_size=3, hidden_size=8, batch_first=True)\n\noutput, h_n = rnn(x)                           # 시퀀스를 통과시킨다. 내부적으로 t=0..4를 순서대로 계산한다.\n# output: 매 시점의 Hidden State를 다 모은 것 (N, T, hidden). 시점별 출력이 필요할 때 쓴다.\nprint('전체 시점 출력 크기:', tuple(output.shape))  # (2, 5, 8)\n# h_n: 마지막 시점의 Hidden State만 뽑은 것 (층수, N, hidden). \"요약 하나\"가 필요한 분류 등에 쓴다.\nprint('마지막 은닉상태 크기:', tuple(h_n.shape))     # (1, 2, 8)\n\n# output의 맨 끝 시점과 h_n이 같은 값인지 확인 -> \"마지막 Hidden State = 시퀀스의 요약\"임을 체감한다.\nprint('마지막 시점 == h_n ?', torch.allclose(output[:, -1, :], h_n[0]))  # True\n# 이 요약 벡터에 Linear를 붙이면 감성분류, 다음 값 예측 같은 다양한 과제로 확장된다.",
      "note": "덱의 RNN 구조(같은 Cell을 시간 축으로 펼치고 가중치를 공유하며 Hidden State로 과거를 기억)를 nn.RNN 한 줄로 실행한다. output(모든 시점)과 h_n(마지막 요약)의 차이, 그리고 \"마지막 시점 출력 = 시퀀스 요약\"이라는 점을 allclose로 직접 검증하게 한 것이 왕초보 이해의 핵심이다."
    },
    {
      "title": "역전파의 핵심 — autograd가 기울기를 자동 계산",
      "lang": "python",
      "code": "# 신경망이 스스로 배우는 원리: 미분을 autograd 가 대신 해 준다\nimport torch\n\n# requires_grad=True: 이 값에 대한 미분을 추적하라고 표시\nx = torch.tensor(3.0, requires_grad=True)\n\n# 아주 단순한 함수 y = x^2 + 2x 를 정의\ny = x ** 2 + 2 * x\n\n# backward(): y 를 x 로 미분한 값을 자동 계산해 x.grad 에 담는다\ny.backward()\n\n# 손으로 풀면 dy/dx = 2x + 2, x=3 이면 8 — 같은 값이 나온다\nprint('x.grad =', x.grad)  # 결과: tensor(8.)\n\n# 신경망 학습 = '손실을 가중치로 미분'해 그 기울기 반대 방향으로 조금씩 이동.\n# 그 미분을 사람이 아니라 autograd 가 대신하는 것이 딥러닝 프레임워크의 힘.",
      "note": "커리큘럼의 순전파·역전파를 수식이 아니라 손으로 검산 가능한 예로 체감. dy/dx=2x+2를 직접 계산해 x.grad와 맞춰 보게 하면 \"역전파=자동 미분\"이 왕초보에게도 명확해진다."
    },
    {
      "title": "학습 루프의 표준 4박자 — forward→loss→backward→step",
      "lang": "python",
      "code": "# 모든 신경망 학습이 반복하는 4단계 (PyTorch 표준 골격)\nimport torch\nimport torch.nn as nn\n\n# 단순 회귀: y = 2x 를 배우게 한다\nX = torch.tensor([[1.0], [2.0], [3.0], [4.0]])  # 입력\ny = torch.tensor([[2.0], [4.0], [6.0], [8.0]])  # 정답(2배)\n\nmodel = nn.Linear(1, 1)                     # 입력1 -> 출력1 (기울기·절편을 학습)\nloss_fn = nn.MSELoss()                      # 회귀용 손실: 오차 제곱의 평균\noptimizer = torch.optim.SGD(model.parameters(), lr=0.01)  # 경사하강, 학습률 0.01\n\nfor epoch in range(200):        # 같은 데이터를 200번 반복 학습\n    pred = model(X)             # 1) 순전파: 현재 가중치로 예측\n    loss = loss_fn(pred, y)     # 2) 손실: 정답과 얼마나 다른가\n    optimizer.zero_grad()       # 3) 이전 기울기 초기화(안 하면 누적됨)\n    loss.backward()             #    역전파: 기울기 계산\n    optimizer.step()            # 4) 갱신: 기울기 반대로 가중치 이동\n\nprint('학습된 기울기:', round(model.weight.item(), 3))  # 2.0 에 가까워짐\nprint('마지막 손실:', round(loss.item(), 5))            # 0 에 수렴",
      "note": "커리큘럼의 손실함수·옵티마이저(SGD)·학습률·학습 루프를 한 화면에. zero_grad를 빠뜨리면 기울기가 누적돼 학습이 망가진다는 흔한 실수까지 주석으로 짚는, ml-dl-2의 핵심 골격 예제."
    },
    {
      "title": "학습 안정화 — 배치 정규화(BatchNorm)",
      "lang": "python",
      "code": "# 층에 들어오는 값의 분포를 고르게 맞춰 학습을 안정시키기\nimport torch\nimport torch.nn as nn\n\n# 흔한 패턴: Linear -> BatchNorm -> ReLU 순서로 쌓는다\nnet = nn.Sequential(\n    nn.Linear(4, 8),      # 입력 4 -> 은닉 8\n    nn.BatchNorm1d(8),    # 8개 출력을 배치 단위로 평균0·분산1 정규화\n    nn.ReLU(),            # 비선형\n    nn.Linear(8, 3),      # 은닉 8 -> 출력 3(클래스)\n)\n\nx = torch.randn(16, 4)   # 배치 16개, 각 4차원 입력\nout = net(x)             # 통과\nprint('출력 shape:', out.shape)  # torch.Size([16, 3])\n\n# BatchNorm 은 학습 중 각 층 입력 분포가 흔들리는 것을 잡아 줘,\n# 더 큰 학습률을 써도 안정적으로 수렴하도록 돕는다(속도·안정성 향상).",
      "note": "커리큘럼에 \"배치 정규화와 학습 안정화\"가 명시되나 예제가 없었다. Linear→BatchNorm→ReLU 배치 순서라는 실무 관례를 코드로 보여준다."
    }
  ],
  "ml-dl-3": [
    {
      "title": "LSTM으로 사인파 다음 값 예측 (게이트로 긴 기억 유지)",
      "lang": "python",
      "code": "# 덱의 \"RNN은 짧은 기억, LSTM은 Cell State+Gate로 긴 기억\"을 실제 학습으로 확인\nimport torch                                  # 텐서/자동미분.\nimport torch.nn as nn                         # LSTM 층 포함 모듈.\n\n# 규칙이 뚜렷한 사인파를 만든다. 앞 20개를 보고 '바로 다음 값'을 맞히는 시계열 예측 문제로 만든다.\nseries = torch.sin(torch.linspace(0, 30, 300))  # 300개 점으로 된 매끈한 파형.\nseq_len = 20                                     # 한 번에 들여다볼 과거 구간의 길이(윈도우).\n# 슬라이딩 윈도우: [i:i+20]을 입력으로, [i+20]을 정답으로 하는 (입력,정답) 쌍을 잔뜩 만든다.\nX = torch.stack([series[i:i+seq_len] for i in range(len(series)-seq_len)]).unsqueeze(-1)\ny = series[seq_len:].unsqueeze(-1)               # 각 윈도우 바로 다음의 실제 값(정답).\n\nclass LSTMReg(nn.Module):                        # 시계열 회귀용 LSTM 모델.\n    def __init__(self):\n        super().__init__()\n        # LSTM: 입력 1차원, 은닉 32차원. Cell State(장기기억)와 3개 Gate로 오래된 정보도 선택적으로 보존한다.\n        self.lstm = nn.LSTM(input_size=1, hidden_size=32, batch_first=True)\n        self.fc = nn.Linear(32, 1)                # 마지막 은닉상태 -> 다음 값(숫자 1개)로 변환.\n    def forward(self, x):\n        out, (h_n, c_n) = self.lstm(x)            # LSTM은 Hidden State와 Cell State 두 개를 함께 넘긴다.\n        return self.fc(out[:, -1, :])             # 마지막 시점의 요약만 뽑아 다음 값을 예측한다.\n\nmodel = LSTMReg()                                # 모델 생성.\nopt = torch.optim.Adam(model.parameters(), lr=0.01)  # 적응형 옵티마이저 Adam.\nloss_fn = nn.MSELoss()                           # 숫자 예측이므로 오차 제곱 평균(회귀 손실).\n\nfor epoch in range(150):                         # 같은 데이터를 150번 반복 학습.\n    pred = model(X)                              # 순전파: 모든 윈도우의 다음 값을 예측.\n    loss = loss_fn(pred, y)                      # 정답과의 오차.\n    opt.zero_grad(); loss.backward(); opt.step() # 기울기 초기화 -> 역전파 -> 가중치 갱신.\n\nprint('최종 손실:', round(loss.item(), 5))        # 0에 가까워지면 파형 규칙을 학습한 것.\nprint('예측 예시:', round(model(X[:1]).item(), 3), '/ 실제:', round(y[0].item(), 3))\n# 시계열은 텍스트와 달리 Softmax 없이 예측값을 그대로 출력한다(덱의 \"시계열은 Softmax 불필요\").",
      "note": "종합실습답게 데이터 생성(슬라이딩 윈도우)→모델→학습 루프를 한 흐름에 담았다. LSTM이 Hidden State와 Cell State 두 상태를 함께 반환한다는 구조적 차이와, 덱이 강조한 \"시계열 회귀는 Softmax 없이 예측값을 그대로 내보낸다\"는 점을 회귀 손실(MSELoss)로 연결해 보여준다."
    },
    {
      "title": "AutoEncoder — 압축(Encoder)했다 복원(Decoder)하며 특징 학습",
      "lang": "python",
      "code": "# 덱의 \"입력 -> 압축(Encoder) -> Latent -> 복원(Decoder) -> 출력, 입출력이 같아지게 학습\"\nimport torch                                  # 텐서/자동미분.\nimport torch.nn as nn                         # 층 모음.\n\n# 28x28 흑백 이미지를 784개 숫자로 펼친 것을 흉내낸다. 정답 라벨이 없다 -> 비지도(스스로) 학습이다.\nx = torch.rand(64, 784)                        # 배치 64장, 각 784차원(0~1 픽셀값).\n\nclass AutoEncoder(nn.Module):                  # 인코더-디코더가 대칭을 이루는 구조.\n    def __init__(self):\n        super().__init__()\n        # Encoder: 784 -> 128 -> 32 로 차원을 점점 줄인다. 가장 좁은 32차원이 Latent(병목)=핵심 특징이다.\n        self.encoder = nn.Sequential(\n            nn.Linear(784, 128), nn.ReLU(),     # 1차 압축. ReLU로 비선형 특징을 잡는다.\n            nn.Linear(128, 32),  nn.ReLU(),     # 2차 압축. 여기 32개 숫자에 이미지의 요점이 담기게 된다.\n        )\n        # Decoder: 32 -> 128 -> 784 로 다시 늘려 원본 크기로 복원한다(Encoder를 거울처럼 뒤집은 형태).\n        self.decoder = nn.Sequential(\n            nn.Linear(32, 128),  nn.ReLU(),     # 압축된 특징을 다시 펼치기 시작.\n            nn.Linear(128, 784), nn.Sigmoid(),  # 마지막은 Sigmoid로 0~1 픽셀 범위에 맞춘다.\n        )\n    def forward(self, x):\n        z = self.encoder(x)                     # 입력을 32차원 Latent 벡터로 압축.\n        return self.decoder(z), z               # 복원 이미지와 Latent를 함께 돌려준다.\n\nmodel = AutoEncoder()                           # 모델 생성.\nopt = torch.optim.Adam(model.parameters(), lr=1e-3)  # Adam 옵티마이저.\nloss_fn = nn.MSELoss()                          # 복원 오차: '입력과 출력이 얼마나 다른가'가 곧 손실이다.\n\nfor epoch in range(50):                         # 반복 학습.\n    recon, z = model(x)                         # 순전파: 압축 후 복원.\n    loss = loss_fn(recon, x)                    # 정답이 따로 없다! 정답이 곧 '입력 자기 자신'이다.\n    opt.zero_grad(); loss.backward(); opt.step() # 기울기 초기화 -> 역전파 -> 갱신.\n\nprint('복원 손실:', round(loss.item(), 5))       # 작아질수록 784 -> 32로 줄였다 복원해도 원본과 비슷하다는 뜻.\nprint('Latent(압축) 크기:', tuple(z.shape))      # (64, 32) — 784차원이 32차원으로 압축됐다.\n# 핵심: 좁은 병목을 통과시키면 '중요한 특징만' 남는다. 이 Latent를 분류기에 넣으면 특징 추출기로도 쓴다.",
      "note": "덱의 AutoEncoder 구조(대칭 Encoder-Decoder, 좁은 Latent 병목)를 그대로 구현한다. 라벨 없이 \"정답이 곧 입력 자기 자신\"이라 손실이 복원 오차가 된다는 비지도 학습의 핵심을 코드로 못박고, 784→32 압축을 눈으로 확인시켜 차원 축소·특징 추출 도구로서의 의미까지 짚는다."
    },
    {
      "title": "Denoising AutoEncoder — 노이즈 섞인 입력을 깨끗하게 복원",
      "lang": "python",
      "code": "# 덱 확장표의 \"일부러 입력에 노이즈를 넣고, 깨끗한 원본으로 복원 -> 강인한 특징 학습\"\nimport torch                                  # 텐서/자동미분.\nimport torch.nn as nn                         # 층 모음.\n\nclean = torch.rand(64, 784)                    # 원본(깨끗한) 이미지 64장. 이것이 복원의 '정답'이다.\n# 입력에 가우시안 노이즈를 더해 일부러 지저분하게 만든다. clamp로 0~1 픽셀 범위를 벗어나지 않게 자른다.\n# 손상된 것을 보고 원본을 맞히도록 학습하면, 모델은 잡음이 아닌 '본질적 특징'에 집중하게 된다.\nnoisy = (clean + 0.3 * torch.randn_like(clean)).clamp(0, 1)\n\nmodel = nn.Sequential(                          # 간단히 Sequential로 인코더-디코더를 이어 붙인다.\n    nn.Linear(784, 128), nn.ReLU(),             # Encoder 1: 784 -> 128 압축.\n    nn.Linear(128, 32),  nn.ReLU(),             # Encoder 2: 128 -> 32 (Latent 병목).\n    nn.Linear(32, 128),  nn.ReLU(),             # Decoder 1: 32 -> 128 확장.\n    nn.Linear(128, 784), nn.Sigmoid(),          # Decoder 2: 128 -> 784, Sigmoid로 0~1 픽셀 복원.\n)\nopt = torch.optim.Adam(model.parameters(), lr=1e-3)  # Adam 옵티마이저.\nloss_fn = nn.MSELoss()                          # 복원 오차.\n\nfor epoch in range(60):                         # 반복 학습.\n    recon = model(noisy)                        # 입력은 '노이즈 낀' 이미지.\n    loss = loss_fn(recon, clean)                # 정답은 '깨끗한 원본' — 여기서 잡음 제거를 배운다.\n    opt.zero_grad(); loss.backward(); opt.step() # 기울기 초기화 -> 역전파 -> 갱신.\n\n# 학습 후, 노이즈 입력을 얼마나 원본에 가깝게 되돌리는지 오차로 비교한다.\nbefore = loss_fn(noisy, clean).item()           # 복원 전: 노이즈 이미지와 원본의 차이(크다).\nafter = loss_fn(model(noisy), clean).item()     # 복원 후: 모델이 되돌린 이미지와 원본의 차이(작아짐).\nprint('노이즈 제거 전 오차:', round(before, 4))\nprint('노이즈 제거 후 오차:', round(after, 4))   # after < before 이면 잡음을 걷어내는 데 성공한 것.\n# 입력을 손상시켜도 본질을 뽑아내도록 훈련하므로, 일반 AE보다 견고한(robust) 특징을 배운다.",
      "note": "덱 확장표의 Denoising AE를 구현한다. \"입력=노이즈, 정답=원본\"이라는 학습 설정만 바꾸면 잡음 제거 모델이 된다는 점을 보여주고, 복원 전/후 오차를 직접 비교해 효과를 수치로 증명한다. 손상된 입력에서 본질을 뽑게 하면 더 강인한 특징이 학습된다는 종합실습 수준의 통찰을 전한다."
    },
    {
      "title": "종합실습: 같은 데이터에 ML 베이스라인 vs DL 비교",
      "lang": "python",
      "code": "# 하나의 데이터셋을 ML(sklearn)과 DL(PyTorch) 양쪽으로 풀어 비교\nfrom sklearn.datasets import load_wine\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.ensemble import RandomForestClassifier\nimport torch, torch.nn as nn\n\nX, y = load_wine(return_X_y=True)  # 와인 13개 특징 -> 3개 품종 분류\nXtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=0)\nsc = StandardScaler().fit(Xtr)               # 스케일러는 학습셋에만 fit(누수 방지)\nXtr, Xte = sc.transform(Xtr), sc.transform(Xte)\n\n# 1) ML 베이스라인: 손 안 대고 바로 강력한 랜덤포레스트\nrf = RandomForestClassifier(random_state=0).fit(Xtr, ytr)\nprint('ML(RandomForest) 정확도:', round(rf.score(Xte, yte), 3))\n\n# 2) DL: 작은 MLP 신경망으로 같은 문제 풀기\nnet = nn.Sequential(nn.Linear(13, 16), nn.ReLU(), nn.Linear(16, 3))\nopt = torch.optim.Adam(net.parameters(), lr=0.01)  # Adam 옵티마이저\nxb, yb = torch.tensor(Xtr, dtype=torch.float32), torch.tensor(ytr)\nfor _ in range(300):                            # 학습 루프\n    loss = nn.CrossEntropyLoss()(net(xb), yb)   # 분류용 손실\n    opt.zero_grad(); loss.backward(); opt.step()\n\npred = net(torch.tensor(Xte, dtype=torch.float32)).argmax(1)  # 가장 큰 점수=예측\nacc = (pred == torch.tensor(yte)).float().mean().item()\nprint('DL(MLP) 정확도:', round(acc, 3))\n# 표 형태 소규모 데이터는 ML 이 종종 더 강하다 — DL 이 항상 답은 아님을 확인.",
      "note": "종합실습 목표(동일 데이터에 ML→DL 통합, 베이스라인부터 비교) 그대로. 스케일러 누수 방지·CrossEntropyLoss·Adam까지 앞 차시 내용을 한 흐름에 모으고, \"정형 소규모 데이터에선 ML이 더 나을 수 있다\"는 현실적 교훈을 준다."
    },
    {
      "title": "성능 개선의 출발 — 과적합인지 train vs 검증으로 진단",
      "lang": "python",
      "code": "# 성능이 안 나올 때 먼저 볼 것: 외웠는가(과적합)? 학습/검증 점수 차이로 진단\nfrom sklearn.datasets import load_wine\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\n\nX, y = load_wine(return_X_y=True)\nXtr, Xval, ytr, yval = train_test_split(X, y, test_size=0.3, random_state=0)\n\n# 트리 깊이를 키워가며 학습/검증 정확도를 함께 본다\nfor depth in [1, 3, 5, None]:  # None = 제한 없이 끝까지(가장 복잡)\n    m = DecisionTreeClassifier(max_depth=depth, random_state=0).fit(Xtr, ytr)\n    tr = m.score(Xtr, ytr)     # 학습 데이터 점수\n    val = m.score(Xval, yval)  # 처음 보는 검증 점수\n    print('depth=', depth, '| train=', round(tr, 3), 'val=', round(val, 3))\n\n# train 은 1.0 인데 val 이 뚝 떨어지면 '과적합' — 데이터를 외워버린 것.\n# 이때 max_depth 제한·드롭아웃·정규화·데이터 추가로 격차를 줄이는 것이 개선 단계.",
      "note": "종합실습의 \"성능 개선(정규화·드롭아웃·튜닝)\" 앞단계인 진단을 다룬다. 통계교재의 과적합·일반화 개념을 train/val 격차로 눈에 보이게 만들어, 무엇을 개선해야 하는지 근거를 먼저 잡게 한다."
    }
  ],
  "modeldev-1": [
    {
      "title": "학습·검증·테스트 3분할 (train_test_split 두 번)",
      "lang": "python",
      "code": "from sklearn.datasets import load_iris                # 연습용 데이터\nfrom sklearn.model_selection import train_test_split  # 분할 도구\n\nX, y = load_iris(return_X_y=True)  # 설명변수 X, 정답 y 를 한 번에 받기\n\n# 1차: 전체를 학습용(60%) vs 임시(40%)로 나눈다 (정답 비율 유지)\nX_tr, X_tmp, y_tr, y_tmp = train_test_split(X, y, test_size=0.4, stratify=y, random_state=0)\n\n# 2차: 임시(40%)를 다시 검증(20%) vs 테스트(20%)로 절반씩 나눈다\nX_val, X_te, y_val, y_te = train_test_split(X_tmp, y_tmp, test_size=0.5, stratify=y_tmp, random_state=0)\n\n# 학습=모델 훈련용, 검증=하이퍼파라미터 고르는 용, 테스트=마지막 성능 확인용\nprint(len(X_tr), len(X_val), len(X_te))  # 결과: 90 30 30 (60:20:20 분할)",
      "note": "검증셋은 하이퍼파라미터를 고르는 데만 쓰고, 테스트셋은 맨 마지막 한 번만 열어 봐야 진짜 일반화 성능이다."
    },
    {
      "title": "층화 K겹 교차검증으로 일반화 성능 재기 (StratifiedKFold)",
      "lang": "python",
      "code": "from sklearn.datasets import load_breast_cancer         # 이진 분류 데이터\nfrom sklearn.model_selection import StratifiedKFold, cross_val_score  # 층화 K겹 교차검증\nfrom sklearn.linear_model import LogisticRegression     # 분류 모델\n\nX, y = load_breast_cancer(return_X_y=True)  # 입력 X, 정답 y\n\n# StratifiedKFold: 각 겹(fold)마다 정답 비율을 똑같이 유지하며 5조각으로 나눈다\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)\nmodel = LogisticRegression(max_iter=5000)   # 반복 횟수를 넉넉히 줘서 수렴시킨다\n\n# 5번 학습/검증을 돌려 매번 점수를 받는다 (한 번 분할의 운에 흔들리지 않게)\nscores = cross_val_score(model, X, y, cv=cv)\nprint('겹별 점수:', scores.round(3))          # 결과 예: [0.965 0.947 0.956 0.974 0.956]\nprint('평균/표준편차:', round(scores.mean(), 3), '/', round(scores.std(), 3))  # 일반화 성능 요약",
      "note": "한 번 나눈 점수는 운에 좌우되므로 여러 겹의 평균과 표준편차로 봐야 믿을 수 있다. 겹마다 정답 비율을 지키는 것이 StratifiedKFold의 핵심이다."
    },
    {
      "title": "불균형 데이터: 소수 클래스 오버샘플링 (resample)",
      "lang": "python",
      "code": "import numpy as np                                  # 배열 처리\nfrom sklearn.utils import resample                  # 표본을 다시 뽑는 도구\nfrom collections import Counter                     # 개수 세기\n\n# 정답이 0:90개, 1:10개로 심하게 치우친 상황을 흉내 낸다\nX = np.arange(100).reshape(-1, 1)                   # 특징 1개짜리 예시 데이터\ny = np.array([0] * 90 + [1] * 10)                   # 소수 클래스(1)가 10개뿐\n\n# 소수 클래스(1)만 골라낸다\nX_min, y_min = X[y == 1], y[y == 1]\n# 다수 클래스 개수(90)만큼 복원추출로 뻥튀기한다 (오버샘플링)\nX_up, y_up = resample(X_min, y_min, replace=True, n_samples=90, random_state=0)\n\n# 다수 클래스 + 늘린 소수 클래스를 다시 합친다\nX_bal = np.vstack([X[y == 0], X_up])                # 특징 합치기\ny_bal = np.concatenate([y[y == 0], y_up])           # 정답 합치기\nprint('전:', Counter(y), ' 후:', Counter(y_bal))    # 결과: 전 {0:90,1:10} 후 {0:90,1:90}",
      "note": "소수 클래스를 복원추출로 늘리면 모델이 소수 클래스를 무시하지 않는다. 단, 검증·테스트셋은 오버샘플링하지 말고 학습셋에만 적용해야 성능이 부풀지 않는다."
    }
  ],
  "modeldev-2": [
    {
      "title": "GridSearchCV로 모든 조합을 촘촘히 탐색",
      "lang": "python",
      "code": "from sklearn.datasets import load_iris                 # 연습용 데이터\nfrom sklearn.svm import SVC                             # 서포트 벡터 분류기\nfrom sklearn.model_selection import GridSearchCV        # 격자(모든 조합) 탐색\n\nX, y = load_iris(return_X_y=True)  # 입력 X, 정답 y\n\n# 후보 값들을 격자로 준다 -> C 3개 x gamma 3개 = 9개 조합을 전부 시험한다\ngrid = {'C': [0.1, 1, 10], 'gamma': [0.01, 0.1, 1]}\n\n# 각 조합마다 5겹 교차검증 -> 총 9x5=45번 학습해 가장 좋은 조합을 고른다\nsearch = GridSearchCV(SVC(), grid, cv=5)\nsearch.fit(X, y)\n\nprint('최적 조합:', search.best_params_)          # 결과 예: {'C': 1, 'gamma': 0.1}\nprint('최적 점수:', round(search.best_score_, 3))  # 결과 예: 0.98",
      "note": "Grid는 후보를 빠짐없이 훑어 확실하지만 조합이 늘면 급격히 느려진다. 후보가 많으면 RandomizedSearch(무작위)나 Bayesian(Optuna)으로 넘어간다."
    },
    {
      "title": "Optuna로 베이지안 최적화 — 이전 결과를 기억하며 탐색",
      "lang": "python",
      "code": "# 설치: pip install optuna scikit-learn\nimport optuna                                          # 베이지안 최적화 도구\nfrom sklearn.datasets import load_breast_cancer        # 이진 분류 데이터\nfrom sklearn.ensemble import RandomForestClassifier    # 랜덤포레스트\nfrom sklearn.model_selection import cross_val_score    # 교차검증 점수\n\nX, y = load_breast_cancer(return_X_y=True)  # 입력 X, 정답 y\n\n# Optuna가 매 시도마다 부를 함수 - trial이 다음에 시험할 값을 제안한다\ndef objective(trial):\n    # 정해진 범위 안에서 다음에 시험할 값을 베이지안 방식으로 제안받는다\n    n = trial.suggest_int('n_estimators', 50, 300)         # 트리 개수 후보 범위\n    depth = trial.suggest_int('max_depth', 2, 16)          # 트리 깊이 후보 범위\n    model = RandomForestClassifier(n_estimators=n, max_depth=depth, random_state=0)\n    return cross_val_score(model, X, y, cv=5).mean()       # 5겹 평균 점수 반환(클수록 좋음)\n\n# 점수를 최대화하는 방향으로 30번만 똑똑하게 탐색한다\nstudy = optuna.create_study(direction='maximize')\nstudy.optimize(objective, n_trials=30)\nprint('최적 값:', study.best_params, '점수:', round(study.best_value, 3))",
      "note": "Grid/Random은 이전 결과를 무시하고 뽑지만, Bayesian(Optuna)은 지금까지 점수가 좋았던 구간을 기억해 다음 후보를 더 똑똑하게 고른다. 그래서 적은 시도로도 좋은 값을 찾는다."
    },
    {
      "title": "회귀 오차지표 MAPE의 비대칭 함정과 sMAPE 보정",
      "lang": "python",
      "code": "import numpy as np                                    # 배열 계산\n\n# 실제값(A)과 예측값(F)을 두 쌍으로 준비한다\nA = np.array([1.0, 100.0])    # 실제값: 아주 작은 값 1, 큰 값 100\nF = np.array([2.0, 101.0])    # 예측값: 둘 다 실제보다 1 큼(오차 크기는 똑같이 1)\n\n# MAPE = |A-F|/|A| 의 평균 x100(%) - 분모가 실제값이라 작은 값에서 오차가 폭발한다\nmape = np.mean(np.abs(A - F) / np.abs(A)) * 100\n# sMAPE = |A-F| / ((|A|+|F|)/2) 의 평균 x100(%) - 분모를 실제/예측 평균으로 바꿔 완화\nsmape = np.mean(np.abs(A - F) / ((np.abs(A) + np.abs(F)) / 2)) * 100\n\nprint('한 건씩 MAPE:', (np.abs(A - F) / A * 100).round(2))  # 결과: [100.   1.] 오차는 같은데 100% vs 1%\nprint('MAPE 평균 :', round(mape, 2))                        # 결과: 50.5 (작은 값 하나에 휘둘림)\nprint('sMAPE 평균:', round(smape, 2))                       # 결과: 33.83 (덜 치우침)",
      "note": "오차 크기가 똑같이 1이어도 실제값이 작으면 MAPE가 100%로 튄다(비대칭 함정). 분모를 실제/예측 평균으로 바꾼 sMAPE가 이 쏠림을 완화한다. 값의 크기 차이가 큰 수요예측 문제에서 지표 선택이 중요하다."
    }
  ],
  "serving-1": [
    {
      "title": "APIRouter로 라우터를 분리하고 include_router로 합치기",
      "lang": "python",
      "code": "# api/routers/task.py - 할 일(Task) 관련 엔드포인트만 모아 둔 라우터 파일\nfrom fastapi import APIRouter          # 여러 경로를 묶어 관리하는 미니 라우터\n\nrouter = APIRouter()                   # 이 파일 전용 라우터 객체를 만든다\n\n@router.get('/tasks')                  # GET /tasks - 목록 조회 경로 동작 함수\nasync def list_tasks():                # async: 대기 시간에 다른 요청도 처리\n    return [{'id': 1, 'title': '첫 번째 할 일'}]  # 지금은 더미 데이터를 반환\n\n@router.post('/tasks')                 # POST /tasks - 새 할 일 생성\nasync def create_task():\n    return {'id': 2, 'title': '새 할 일'}\n\n# ---- api/main.py - 앱 본체에서 위 라우터를 불러와 합친다 ----\nfrom fastapi import FastAPI\nfrom api.routers import task           # 방금 만든 task 라우터 모듈 가져오기\n\napp = FastAPI()                        # FastAPI 앱 본체\napp.include_router(task.router)        # task 라우터의 모든 경로를 앱에 등록한다",
      "note": "엔드포인트가 늘면 main.py가 비대해지므로 리소스별로 파일을 나눠 APIRouter로 만들고 include_router로 합친다. Swagger UI(/docs)에 등록된 경로가 그대로 나타난다."
    },
    {
      "title": "Pydantic 스키마로 요청·응답 타입 정의 (BaseModel 상속)",
      "lang": "python",
      "code": "from fastapi import APIRouter\nfrom pydantic import BaseModel, Field  # 데이터 검증용 기본 클래스와 필드 설정\n\nrouter = APIRouter()\n\n# 공통 필드(title)를 담는 부모 스키마 - 중복 없이 물려주기 위함\nclass TaskBase(BaseModel):\n    title: str | None = Field(None, example='세탁물 찾아오기')  # 제목: 문자열 또는 None\n\nclass TaskCreate(TaskBase):            # 생성 요청용 - id 없이 title만 받는다\n    pass\n\nclass TaskCreateResponse(TaskCreate):  # 생성 응답용 - 서버가 매긴 id를 덧붙인다\n    id: int\n\n# response_model을 지정하면 반환값이 이 스키마에 맞는지 자동 검증/직렬화된다\n@router.post('/tasks', response_model=TaskCreateResponse)\nasync def create_task(body: TaskCreate):   # 요청 본문이 TaskCreate 형식이 아니면 자동 422\n    # 받은 title에 id=1을 붙여 응답 스키마로 돌려준다\n    return TaskCreateResponse(id=1, **body.dict())  # **로 title을 그대로 펼쳐 넣는다",
      "note": "BaseModel을 상속해 요청(TaskCreate)/응답(TaskCreateResponse) 타입을 나누면 잘못된 입력은 FastAPI가 자동으로 422로 막고 응답도 스키마대로 검증된다. TaskBase로 공통 필드(title)를 한 번만 정의해 재사용한다."
    }
  ],
  "serving-2": [
    {
      "title": "docker-compose.yaml로 API + DB 한 번에 띄우기",
      "lang": "yaml",
      "code": "# docker-compose.yaml - FastAPI 앱과 MySQL DB를 한 번에 띄운다\nservices:\n  demo-app:                       # (1) 우리 API 서비스\n    build: .                      # 현재 폴더의 Dockerfile로 이미지를 빌드\n    volumes:\n      - .:/src                    # 호스트 코드를 컨테이너에 연결(저장하면 바로 반영)\n    working_dir: /src             # 컨테이너 안 작업 폴더\n    ports:\n      - \"8001:8001\"               # 호스트 8001 -> 컨테이너 8001 포트 연결\n    environment:\n      WATCHFILES_FORCE_POLLING: \"true\"  # OS 상관없이 코드 변경 감지(핫 리로드)용\n  db:                             # (2) 데이터베이스 서비스\n    image: mysql:8.0              # MySQL 8.0 공식 이미지(실습은 오픈소스 MariaDB 권장)\n    platform: linux/x86_64        # 애플 실리콘(M1/M2) 맥에서 필요\n    environment:\n      MYSQL_ALLOW_EMPTY_PASSWORD: \"yes\"  # 실습용: 루트 비번 없이 생성\n      MYSQL_DATABASE: demo        # demo 데이터베이스를 초기 생성\n      TZ: Asia/Seoul              # 시간대를 한국으로\n    ports:\n      - \"33306:3306\"              # 호스트 33306 -> 컨테이너 3306",
      "note": "docker compose up 한 번이면 API와 DB가 동시에 뜬다. volumes로 코드를 연결하고 WATCHFILES_FORCE_POLLING을 켜면 파일 저장 시 컨테이너가 바로 반영한다. 포트는 \"호스트:컨테이너\" 순서다."
    },
    {
      "title": "실행 중인 컨테이너 안에서 명령 실행하기 (docker compose exec)",
      "lang": "bash",
      "code": "# 1) 앱과 DB 컨테이너를 빌드하며 동시에 띄운다 (백그라운드 -d)\ndocker compose up -d --build\n\n# 2) 새 패키지를 추가할 땐 실행 중인 app 컨테이너 안에서 poetry로 설치한다\ndocker compose exec demo-app poetry add sqlalchemy pymysql\n\n# 3) db 컨테이너 안으로 들어가 demo 데이터베이스에 접속해 테이블을 확인한다\ndocker compose exec db mysql demo -e \"SHOW TABLES;\"\n\n# 4) 의존성이 바뀌면 캐시를 무시하고 이미지를 다시 빌드한다\ndocker compose build --no-cache      # pyproject.toml 변경을 확실히 반영",
      "note": "exec는 이미 떠 있는 컨테이너 안에서 명령을 실행한다. 패키지 추가는 컨테이너 안 poetry로 해야 pyproject.toml/poetry.lock에 잠기고, 의존성이 바뀌면 --no-cache로 재빌드해야 반영된다."
    }
  ],
  "serving-3": [
    {
      "title": "Depends(get_db)로 DB 세션 주입하고 404 처리하기",
      "lang": "python",
      "code": "from fastapi import FastAPI, Depends, HTTPException  # DI(Depends)와 예외 응답 도구\nfrom sqlalchemy.orm import Session                   # DB 세션 타입\n\napp = FastAPI()\n\n# 요청마다 DB 세션을 열고, 끝나면 반드시 닫아 주는 의존성 함수\ndef get_db():\n    db = SessionLocal()      # 세션 하나 생성(SessionLocal은 sessionmaker로 미리 정의)\n    try:\n        yield db             # 이 세션을 경로 함수에 주입해서 쓰게 한다\n    finally:\n        db.close()           # 요청 처리가 끝나면 세션을 닫는다(자원 누수 방지)\n\n@app.put('/tasks/{task_id}')\n# Depends(get_db)가 세션을 자동으로 만들어 db 인자에 넣어 준다(의존성 주입)\nasync def update_task(task_id: int, db: Session = Depends(get_db)):\n    task = db.get(Task, task_id)   # id로 할 일 하나를 조회(Task는 ORM 모델)\n    if task is None:               # 없는 id면\n        raise HTTPException(status_code=404, detail='Task not found')  # 404로 없음을 알림\n    task.title = '수정된 제목'      # 존재하면 내용을 수정\n    db.commit()                    # 변경을 DB에 반영\n    return {'id': task_id, 'title': task.title}",
      "note": "Depends(get_db)로 세션을 주입하면 비즈니스 로직과 DB가 느슨하게 묶여 테스트 때 다른 DB로 갈아끼우기 쉽다. 없는 리소스는 HTTPException(404)로 분명히 알려야 클라이언트가 정상/오류를 구분한다."
    },
    {
      "title": "dependency_overrides로 DB를 갈아끼워 단위 테스트하기",
      "lang": "python",
      "code": "# 설치: pip install fastapi httpx pytest\nfrom fastapi.testclient import TestClient  # 서버를 실제로 안 띄우고 호출하는 테스트 도구\nfrom main import app, get_db               # 앞에서 만든 앱과 실제 DB 의존성\n\n# 테스트용 가짜 DB 세션 - 진짜 DB 대신 이걸 쓰게 만든다\ndef fake_get_db():\n    yield {'fake': True}                   # 실제 연결 없이 가짜 세션을 넘겨 준다\n\n# dependency_overrides로 get_db를 통째로 가짜 버전으로 교체(프로덕션 코드는 그대로)\napp.dependency_overrides[get_db] = fake_get_db\nclient = TestClient(app)                   # 앱을 감싼 테스트 클라이언트\n\ndef test_health():                         # test_로 시작하면 pytest가 자동 실행\n    res = client.get('/health')            # 실제 네트워크 없이 앱 함수를 직접 호출\n    assert res.status_code == 200          # 200이 아니면 테스트 실패\n    assert res.json() == {'status': 'ok'}  # 응답 본문까지 정확히 확인",
      "note": "DI(Depends) 덕분에 dependency_overrides 한 줄로 실제 DB를 가짜로 교체할 수 있어, DB 없이도 API 로직을 재현 가능하게 테스트한다. TestClient는 서버를 띄우지 않고 앱을 직접 호출해 CI에서 빠르게 돌아간다."
    }
  ],
  "feature-1": [
    {
      "title": "치우친 분포는 로그변환 — 왜도(skew)로 확인하기",
      "lang": "python",
      "code": "# 오른쪽으로 치우친(right-skewed) 피처를 대칭에 가깝게 만들기\nimport numpy as np\nimport pandas as pd\n\n# 소득처럼 소수의 큰 값이 꼬리를 만드는 데이터(50000 이 꼬리)\nincome = pd.Series([2000, 2200, 2500, 2600, 3000, 3200, 50000])\n\n# 1) 왜도(skewness)로 치우친 정도를 숫자로 본다(0=대칭, 양수=오른쪽 꼬리)\nprint('변환 전 왜도:', round(income.skew(), 2))  # 큰 양수 -> 강하게 치우침\n\n# 2) 로그변환: log1p(=log(1+x))로 큰 값을 압축해 꼬리를 줄인다\nlog_income = np.log1p(income)\n\n# 3) 변환 후 왜도가 0 쪽으로 줄었는지 확인한다\nprint('변환 후 왜도:', round(log_income.skew(), 2))  # 0 에 가까워짐",
      "note": "교재의 로그/제곱근 변환: 회귀·t검정·ANOVA는 정규분포 가정을 두므로, 소득·조회수처럼 한쪽으로 치우친(멱함수형) 피처는 로그변환으로 대칭에 가깝게 만든 뒤 모델에 넣는다. skew()로 전후를 수치로 확인하는 습관이 핵심."
    },
    {
      "title": "규칙 기반 파생변수 만들기 — 고객등급(조작적 정의)",
      "lang": "python",
      "code": "# 원천 데이터에 없던 새 항목을 비즈니스 규칙으로 정의하기\nimport pandas as pd\n\n# 트랜잭션 원천 데이터: 고객별 구매 건수와 합계\ndf = pd.DataFrame({\n    'customer': ['이OO', '홍OO', '김OO'],\n    'buy_cnt':  [1, 2, 3],        # 구매 건수\n    'total':    [200, 600, 400],  # 구매 합계(원)\n})\n\n# 규칙: 구매건수 >= 2 이고 합계 >= 500 이면 'A등급', 아니면 'B등급'\n# (교재의 파생변수 예시 — 조작적 정의를 Rule 로 코드화)\ndf['grade'] = df.apply(\n    lambda r: 'A' if (r['buy_cnt'] >= 2 and r['total'] >= 500) else 'B',\n    axis=1,  # 행 단위로 규칙 적용\n)\nprint(df[['customer', 'buy_cnt', 'total', 'grade']])\n\n# 파생변수는 비즈니스 로직이 들어가므로 '어떤 근거로 만들었는지' 주석이 필수.\n# 이렇게 만든 등급은 이후 원-핫/순서형 인코딩해 모델 피처로 쓴다.",
      "note": "교재의 파생변수 절(1차 데이터가 있는 경우: 매출액 합계, 없는 경우: 고객등급 A/B)을 그대로 실습화. 조작적 정의를 Rule로 옮기고 주석으로 근거를 남기는 것이 실무 파생변수의 핵심이라는 메시지."
    },
    {
      "title": "상관계수로 피처 선택 — 타깃 관계와 다중공선성 함께 보기",
      "lang": "python",
      "code": "# 상관계수(=표준화된 공분산, -1~1)로 어떤 피처를 남길지 판단\nimport pandas as pd\n\ndf = pd.DataFrame({\n    'area':  [10, 20, 30, 40, 50],  # 면적\n    'rooms': [1, 2, 3, 4, 5],       # 방 개수(면적과 거의 같이 커짐)\n    'age':   [20, 15, 10, 5, 1],    # 건물 연식\n    'price': [1, 2, 3, 4, 5],       # 타깃: 가격\n})\n\n# 1) 상관계수 행렬(0이면 선형관계 없음, 공분산을 각 표준편차로 나눈 표준화값)\ncorr = df.corr(numeric_only=True)\nprint(corr.round(2))\n\n# 2) 타깃(price)과 상관이 큰 피처를 확인(예측에 도움될 후보)\nprint('타깃 상관:', corr['price'].drop('price').round(2).to_dict())\n\n# 3) 피처끼리 상관이 너무 높으면(예: area-rooms) 중복 -> 하나만 남긴다\n#    회귀분석 전 독립변수 간 상관성이 높으면 다중공선성 문제가 생긴다\nprint('면적-방수 상관:', round(corr['area']['rooms'], 2), '=> 0.9 이상이면 제거 검토')",
      "note": "교재의 상관계수 절(표준화된 공분산, \"회귀 전 독립변수 간 상관 높으면 중복 제거\")을 피처 선택으로 연결. 상관은 선형관계만 보므로 산점도 병행이 필요하다는 교재 주의사항도 함께 가르칠 수 있는 예제."
    }
  ],
  "ml-dl-1": [
    {
      "title": "분류 평가: 정확도만으로 부족 — 정밀도·재현율·F1",
      "lang": "python",
      "code": "# 정확도 하나로는 못 보는 것을 classification_report 로 한 번에\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report\n\n# 유방암 데이터(양성/악성 2분류)\nX, y = load_breast_cancer(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)\n\nmodel = RandomForestClassifier(random_state=0).fit(X_tr, y_tr)  # 학습\npred = model.predict(X_te)                                      # 예측\n\n# precision·recall·f1 을 클래스별로 한 번에 출력\nprint(classification_report(y_te, pred, target_names=['악성', '양성']))\n# 정밀도: 양성이라 예측한 것 중 진짜 양성 비율\n# 재현율: 진짜 양성 중 양성이라 맞힌 비율(놓치면 안 되는 진단에서 특히 중요)\n# 정확도만 높고 재현율이 낮으면 '실제 환자를 놓치는' 모델이라 쓰기 어렵다.",
      "note": "통계교재 모델평가 FAQ \"정확도는 높은데 재현율이 낮으면 활용 가능한가?\"를 실습으로. 정답이 한쪽으로 치우친 문제에서 정확도가 왜 함정인지, 재현율이 왜 병 진단에서 결정적인지 체감시킨다."
    },
    {
      "title": "회귀 문제 평가 — R²와 RMSE (분류가 아닌 숫자 예측)",
      "lang": "python",
      "code": "# 집값처럼 '숫자'를 예측하는 회귀: 정확도 대신 R2·RMSE 로 평가\nfrom sklearn.datasets import fetch_california_housing\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import r2_score, mean_squared_error\nimport numpy as np\n\n# 캘리포니아 주택 데이터(집값을 숫자로 예측 -> 회귀)\nX, y = fetch_california_housing(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)\n\nreg = LinearRegression().fit(X_tr, y_tr)  # 최소제곱으로 직선(면) 적합\npred = reg.predict(X_te)                  # 테스트 집값 예측\n\n# R2(결정계수): 1에 가까울수록 잘 설명 / RMSE: 예측 오차 크기(작을수록 좋음)\nprint('R2  :', round(r2_score(y_te, pred), 3))\nprint('RMSE:', round(np.sqrt(mean_squared_error(y_te, pred)), 3))\n# 분류의 '정확도' 자리를, 회귀에서는 R2·RMSE 가 대신한다.",
      "note": "커리큘럼의 \"회귀와 분류\"에서 사이트엔 분류 예제만 있었다. 통계교재의 회귀분석·결정계수·RMSE 개념을 sklearn으로 연결해, 문제 유형에 따라 평가지표가 달라진다는 핵심을 보여준다."
    },
    {
      "title": "ROC-AUC — 임계값에 상관없는 분류 성능 보기",
      "lang": "python",
      "code": "# 예측 '확률'의 품질을 ROC 곡선과 AUC 로 평가\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score, roc_curve\nimport matplotlib.pyplot as plt\n\nX, y = load_breast_cancer(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)\n\nmodel = LogisticRegression(max_iter=5000).fit(X_tr, y_tr)\nproba = model.predict_proba(X_te)[:, 1]  # 양성일 '확률'(0/1 아닌 확신 정도)\n\n# AUC: ROC 곡선 아래 면적, 0.5=찍기 / 1.0=완벽\nprint('ROC-AUC:', round(roc_auc_score(y_te, proba), 3))\n\nfpr, tpr, _ = roc_curve(y_te, proba)  # 임계값을 옮겨가며 거짓양성·참양성 비율\nplt.plot(fpr, tpr)                     # 모델의 ROC 곡선\nplt.plot([0, 1], [0, 1], '--')         # 대각선 = 무작위 기준선\nplt.xlabel('FPR'); plt.ylabel('TPR'); plt.title('ROC 곡선'); plt.show()",
      "note": "커리큘럼 평가지표에 ROC가 명시되나 사이트에 없었다. predict_proba로 나온 확률에 임계값을 바꿔가며 그리는 곡선이라, 정확도·재현율과 달리 임계값에 독립적인 성능을 본다는 점을 그림으로 이해시킨다."
    }
  ],
  "vectordb-1": [
    {
      "title": "FAISS 기본 - IndexFlatIP로 코사인 유사도 검색(정규화=내적)",
      "lang": "python",
      "code": "# pip install faiss-cpu numpy 를 먼저 설치한다\nimport numpy as np                                  # 벡터 계산용\nimport faiss                                        # 페이스북 벡터 검색 라이브러리\n\nN, d = 5000, 768                                    # 문서 5000개, 임베딩 차원 768\ndata = np.random.randn(N, d).astype('float32')      # 임베딩이라고 가정한 난수 벡터\ndata /= np.linalg.norm(data, axis=1, keepdims=True) # L2 정규화: 정규화하면 내적=코사인유사도\n\nindex = faiss.IndexFlatIP(d)                         # IP=내적 기준 완전탐색(Flat) 인덱스\nindex.add(data)                                      # 모든 벡터를 인덱스에 그대로 저장\n\nquery = data[0:1]                                    # 0번 문서를 질의 벡터로 사용(자기 자신이 1등이어야 정상)\nscores, ids = index.search(query, 5)                 # 가장 비슷한 상위 5개 검색\nprint('Top-5 문서 번호:', ids[0])                    # 결과: [0 ...] 0번이 맨 앞에 나온다\nprint('Top-5 유사도:', scores[0].round(3))           # 코사인 유사도 값(1에 가까울수록 유사)",
      "note": "Flat 인덱스는 모든 벡터와 전부 비교해 항상 정확하지만 데이터가 커지면 느리다. 정규화 후 내적을 쓰면 코사인 유사도가 되어 계산이 간단해진다."
    },
    {
      "title": "FAISS IVF-Flat - 동네(클러스터)로 나눠 빠르게 검색(nlist·nprobe)",
      "lang": "python",
      "code": "import numpy as np\nimport faiss\n\nN, d = 100000, 128                                   # 10만 개 벡터로 속도 차이를 체감\ndata = np.random.random((N, d)).astype('float32')    # 예시 데이터\ndata /= np.linalg.norm(data, axis=1, keepdims=True)  # 코사인용 정규화\n\nnlist = 100                                          # 전체 공간을 100개 '동네(클러스터)'로 나눈다\nquantizer = faiss.IndexFlatIP(d)                     # 동네 중심을 찾는 기준 인덱스\nindex = faiss.IndexIVFFlat(quantizer, d, nlist, faiss.METRIC_INNER_PRODUCT)\n\nindex.train(data)                                    # K-means로 100개 동네 중심을 학습\nindex.add(data)                                      # 각 벡터를 가까운 동네에 배치\n\nindex.nprobe = 5                                     # 검색 시 가까운 5개 동네만 열어본다(전체의 5%)\nquery = data[0:1]                                    # 질의 벡터\nscores, ids = index.search(query, 5)                 # 선택된 동네 안에서만 Top-5 계산\nprint('Top-5:', ids[0])                              # nprobe를 1->10으로 키우면 정확도 상승 속도 하락\nprint('전체 대비 탐색 비율: 약', index.nprobe / nlist * 100, '%')",
      "note": "IVF는 전체를 nlist개 동네로 나누고 nprobe개만 뒤져서 Flat보다 10~50배 빠르다. nprobe가 곧 정확도-속도 손잡이다."
    },
    {
      "title": "Qdrant 실무 - 컬렉션 생성·Upsert 후 메타데이터 필터 검색",
      "lang": "python",
      "code": "# 터미널에서 먼저 실행: docker run -p 6333:6333 qdrant/qdrant\n# pip install qdrant-client\nfrom qdrant_client import QdrantClient\nfrom qdrant_client.models import Distance, VectorParams, PointStruct, Filter, FieldCondition, Range\n\nclient = QdrantClient(host='localhost', port=6333)   # 로컬 Qdrant 서버에 연결\nclient.recreate_collection(                           # 'rag_docs' 컬렉션(=테이블) 생성\n    collection_name='rag_docs',\n    vectors_config=VectorParams(size=4, distance=Distance.COSINE),  # 4차원·코사인 거리\n)\n\npoints = [                                            # Point = ID + 벡터 + payload(메타데이터)\n    PointStruct(id=1, vector=[0.1, 0.2, 0.1, 0.9], payload={'page': 3, 'category': '재무'}),\n    PointStruct(id=2, vector=[0.9, 0.1, 0.2, 0.1], payload={'page': 8, 'category': '법무'}),\n]\nclient.upsert(collection_name='rag_docs', points=points)  # 벡터+메타데이터를 함께 저장(Upsert)\n\nhits = client.search(                                 # 5페이지 이후 문서에서만 유사도 검색\n    collection_name='rag_docs',\n    query_vector=[0.1, 0.2, 0.1, 0.8],\n    query_filter=Filter(must=[FieldCondition(key='page', range=Range(gte=5))]),  # page>=5 필터\n    limit=3,\n)\nprint('필터 통과 결과:', [(h.id, h.payload) for h in hits])  # page 8짜리(id=2)만 남는다",
      "note": "FAISS와 달리 Qdrant는 벡터에 payload(메타데이터)를 붙여 저장하고 \"재무팀 5페이지 이후\"처럼 조건 필터 검색이 가능하다. 그래서 실무 프로덕션에서 선호된다."
    },
    {
      "title": "NumPy만으로 Flat 검색 - 행렬곱 한 번과 argpartition으로 Top-k",
      "lang": "python",
      "code": "import numpy as np                                   # 수치 계산 라이브러리\n\nN, d = 10000, 768                                    # 문서 1만 개, 768차원 임베딩 가정\ndocs = np.random.randn(N, d).astype('float32')       # 문서 임베딩(연습용 난수)\nquery = np.random.randn(d).astype('float32')         # 질문 임베딩 1개\n\n# 코사인용 정규화: 길이를 1로 만들어 두면 내적 = 코사인 유사도\ndocs = docs / np.linalg.norm(docs, axis=1, keepdims=True)   # 각 행을 길이 1로\nquery = query / np.linalg.norm(query)                       # 질문도 길이 1로\n\nscores = docs @ query                                # 행렬-벡터 곱 1번으로 1만 개 점수 계산\nk = 5                                                # 상위 5개만 필요\nidx = np.argpartition(-scores, k - 1)[:k]            # 전체 정렬 대신 부분 선택(훨씬 빠름)\nidx = idx[np.argsort(-scores[idx])]                  # 뽑힌 5개만 점수순으로 정렬\nprint('Top-5 문서 번호:', idx)                        # 가장 비슷한 문서 5개\nprint('Top-5 점수:', np.round(scores[idx], 4))       # 유사도 점수 확인",
      "note": "Flat(브루트포스) 인덱스는 모든 벡터와 전부 비교하는 전수조사라 항상 정답이다. 파이썬 for 루프 대신 BLAS 기반 행렬곱을 쓰고, 전체 정렬 O(N log N) 대신 argpartition(평균 O(N))으로 Top-k만 뽑는 것이 교재가 강조하는 핵심 최적화다. 데이터가 작을 때는 ANN을 붙이는 것보다 이 방식이 오히려 빠르고 정확하다."
    },
    {
      "title": "IVF-PQ 압축 인덱스 - 벡터를 코드북으로 눌러 담아 메모리 절약",
      "lang": "python",
      "code": "import faiss                                     # 벡터 검색 라이브러리 (pip install faiss-cpu)\nimport numpy as np                               # 수치 계산\n\ndata = np.random.random((10000, 128)).astype('float32')  # 128차원 벡터 1만 개\nd = 128                                          # 벡터 차원\nm = 8                                            # 서브벡터 개수: 128차원을 8조각으로 분할\nnlist = 100                                      # IVF 클러스터(동네) 개수\n\nquantizer = faiss.IndexFlatL2(d)                 # 클러스터 중심을 찾는 기준 인덱스\nindex = faiss.IndexIVFPQ(quantizer, d, nlist, m, 8)  # 조각당 8비트 = 256개 코드북\nindex.train(data)                                # K-means 학습 + 코드북 생성\nindex.add(data)                                  # 압축 저장: 벡터당 512바이트 -> 8바이트\n\nquery = np.random.random((1, 128)).astype('float32')  # 질문 벡터\nindex.nprobe = 10                                # 가까운 동네 10곳만 열어 봄\nD, I = index.search(query, 5)                    # 근사 Top-5 검색\nprint('Top-5 문서 ID:', I)                        # 압축했는데도 비슷한 것을 잘 찾는다",
      "note": "PQ(Product Quantization)는 큰 벡터를 여러 조각으로 나눠 각 조각을 대표 코드 번호 하나로 바꾸는 압축 기술로, 메모리를 수십~수백 배 줄인다. 벡터 1억 개면 200GB가 되는 문제를 풀기 위한 것으로, 보통 클러스터 기반 IVF와 묶어 IVF-PQ로 쓴다. 대신 근사치라 정확도를 약간 희생하는 속도·메모리·정확도의 균형 기술이다."
    },
    {
      "title": "MinHash-LSH로 중복 문서 잡아내기 - 비슷하면 같은 버킷에 모인다",
      "lang": "python",
      "code": "from datasketch import MinHash, MinHashLSH   # 스케치 기반 유사도 라이브러리\nimport re                                    # 단어 추출용 정규식\n\ndef shingles(text, k=3):                     # 문장을 k개 단어 묶음(셰이글)으로 자르기\n    tokens = re.findall(r'\\w+', text.lower())   # 소문자로 바꿔 단어만 추출\n    return set(tuple(tokens[i:i+k]) for i in range(max(0, len(tokens)-k+1)))  # k-gram 집합\n\ndocs = ['deep learning advances nlp and cv',           # 문서 0\n        'nlp and cv see advances with deep learning',  # 문서 1: 0과 거의 같은 내용\n        'i love espresso and latte']                   # 문서 2: 전혀 다른 내용\n\nmh_list = []                                 # 문서별 MinHash 시그니처 보관\nfor doc in docs:                             # 문서마다\n    m = MinHash(num_perm=128)                # 길이 128짜리 시그니처 생성기\n    for sh in shingles(doc):                 # 셰이글 하나하나를\n        m.update(' '.join(sh).encode('utf-8'))   # 해시에 반영\n    mh_list.append(m)                        # 시그니처 완성\n\nlsh = MinHashLSH(threshold=0.8, num_perm=128)   # 자카드 유사도 0.8 이상이면 같은 버킷\nfor i, m in enumerate(mh_list):                 # 시그니처를 인덱스에 등록\n    lsh.insert('doc-' + str(i), m)              # 문서 이름표를 붙여 삽입\nprint(lsh.query(mh_list[0]))                    # 0번과 비슷한 후보: doc-0, doc-1",
      "note": "LSH는 비슷한 것끼리 일부러 같은 해시 버킷에 충돌시키는 발상의 전환으로, 전부 비교하지 않고 소수의 후보만 정밀 비교하게 해 준다. 뉴스 서비스의 실시간 중복 기사 탐지가 대표 사례다. threshold를 0.7~0.9로 바꿔 가며 후보가 어떻게 달라지는지 관찰해 보자."
    }
  ],
  "rag-1": [
    {
      "title": "PDF 로딩 → 청킹 → 메타데이터 태깅(전처리 한 흐름)",
      "lang": "python",
      "code": "# pip install pymupdf langchain-community langchain-text-splitters\nfrom langchain_community.document_loaders import PyMuPDFLoader        # 빠른 PDF 텍스트 추출기\nfrom langchain_text_splitters import RecursiveCharacterTextSplitter   # 계층적 분할기\n\ndocs = PyMuPDFLoader('data/ai_semiconductor.pdf').load()  # PDF를 페이지 단위 문서로 로드\nprint('페이지 수:', len(docs))                            # 각 문서에 page 번호가 메타데이터로 들어있다\n\nsplitter = RecursiveCharacterTextSplitter(                # 문단->줄->문장->단어 순으로 자른다\n    chunk_size=500,                                       # 실무 기본값 300~500 토큰\n    chunk_overlap=50,                                     # 10% 겹침으로 문맥 단절 방지\n    separators=['\\n\\n', '\\n', '. ', ' '],              # 의미 경계 우선순위\n)\nchunks = splitter.split_documents(docs)                   # 페이지들을 작은 청크로 분할\n\nfor c in chunks[:2]:                                      # 앞 청크 2개에 검색용 메타데이터를 덧붙인다\n    c.metadata.update({'category': '반도체', 'language': 'ko'})  # 필터 검색에 쓸 태그\n    print('page', c.metadata.get('page'), '| 글자수', len(c.page_content))\nprint('총 청크 수:', len(chunks))                         # 100페이지 PDF가 수백 개 청크로 쪼개진다",
      "note": "RAG 전처리의 뼈대다. PyMuPDF로 텍스트를 뽑고, Recursive 분할기로 의미 경계를 지키며 자르고, category·page 같은 메타데이터를 심어야 나중에 필터 검색이 된다."
    },
    {
      "title": "Parent-Child 검색 - 작게 찾고 크게 전달(실무 최우선)",
      "lang": "python",
      "code": "# 검색 정밀도(작은 Child)와 문맥 풍부함(큰 Parent)을 동시에 얻는 전략\nfrom langchain.retrievers import ParentDocumentRetriever\nfrom langchain_text_splitters import RecursiveCharacterTextSplitter\nfrom langchain_community.vectorstores import Chroma\nfrom langchain_openai import OpenAIEmbeddings\nfrom langchain.storage import InMemoryStore\n\nparent_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)  # 큰 단위(맥락 보존, LLM에 전달용)\nchild_splitter = RecursiveCharacterTextSplitter(chunk_size=200)    # 작은 단위(정밀 검색·임베딩용)\n\nvectorstore = Chroma(embedding_function=OpenAIEmbeddings())        # Child 벡터를 저장할 곳\ndocstore = InMemoryStore()                                         # 원본 Parent 문서를 보관할 곳\n\nretriever = ParentDocumentRetriever(                               # 두 저장소를 묶는 검색기\n    vectorstore=vectorstore,      # 검색은 작은 Child 벡터로\n    docstore=docstore,            # 반환은 Child가 속한 큰 Parent로\n    child_splitter=child_splitter,\n    parent_splitter=parent_splitter,\n)\nretriever.add_documents(docs)                                     # 문서를 넣으면 Parent/Child가 자동 생성\nfound = retriever.invoke('HBM 메모리 대역폭은?')                    # 작은 청크로 정확히 매칭한 뒤\nprint('반환된 문맥 길이:', len(found[0].page_content))             # 큰 Parent 청크를 통째로 돌려준다",
      "note": "Child(200토큰)로 정밀하게 위치를 찾고, 그 청크가 속한 Parent(1000토큰)를 LLM에 넘긴다. 검색 정밀도와 답변 문맥을 동시에 잡는 실무 표준 전략이다."
    },
    {
      "title": "토큰과 청크의 관계 - 슬라이딩 윈도우로 직접 잘라 보기",
      "lang": "python",
      "code": "sentence = 'This is an example text for demonstration'   # 실습용 문장\ntokens = sentence.split()                  # 아주 단순한 토크나이저: 공백으로 단어 조각내기\nprint('토큰:', tokens)                      # 토큰 = 단어 조각 7개\n\nchunk_size = 4                             # 청크 하나에 담을 토큰 수\nchunk_overlap = 2                          # 앞 청크와 겹칠 토큰 수(문맥 단절 방지)\nstep = chunk_size - chunk_overlap          # 창을 옮기는 보폭 = 4 - 2 = 2\n\nchunks = []                                # 완성된 청크를 담을 리스트\nfor start in range(0, len(tokens), step):  # 보폭만큼 창을 밀며 반복\n    chunk = tokens[start:start + chunk_size]   # 현재 창 안의 토큰들\n    if chunk:                              # 빈 조각은 제외하고\n        chunks.append(chunk)               # 청크로 저장\n    if start + chunk_size >= len(tokens):  # 문장 끝에 닿으면\n        break                              # 반복 종료\n\nfor i, c in enumerate(chunks):             # 결과 확인\n    print('Chunk' + str(i + 1) + ':', c)   # 청크 경계마다 두 토큰이 겹친다",
      "note": "토큰은 문장을 쪼갠 단어 조각이고, 청크는 모델이 감당할 수 있게 토큰을 다시 묶은 덩어리다. 교재 예시 그대로 chunk_size=4, overlap=2로 자르면 청크 사이에 두 토큰이 겹쳐 문맥이 끊기지 않고 이어진다. 오버랩은 보통 청크 크기의 10~20%가 권장값이다."
    },
    {
      "title": "원핫 인코딩 vs 학습된 임베딩 - 왜 밀집 벡터를 쓰는가",
      "lang": "python",
      "code": "import numpy as np                          # 수치 계산\n\nvocab = ['request', 'feature', 'how', 'issue', 'credit']  # 단어 사전 5개\none_hot = np.eye(len(vocab))                # 원핫: 자기 자리만 1, 나머지 전부 0\nprint('request 원핫:', one_hot[0])          # [1,0,0,0,0] - 절대다수가 0(희소 벡터)\n\n# 원핫끼리 내적하면 다른 단어는 무조건 0 -> 의미 유사도를 전혀 표현 못 함\nprint('request-issue 유사도:', one_hot[0] @ one_hot[3])   # 항상 0.0\n\n# 학습된 임베딩(예시 값): 문맥상 비슷한 단어는 벡터도 가깝게 학습된다\nemb = {'request': np.array([0.007, -0.039, -0.002, -0.024, 0.007]),    # request\n       'issue':   np.array([-0.015, -0.035, -0.009, -0.012, -0.015]),  # issue\n       'credit':  np.array([-0.012, -0.027, -0.001, -0.051, 0.064])}   # credit\n\ndef cos(a, b):                              # 코사인 유사도 함수\n    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))  # 내적 / 크기곱\n\nprint('request-issue :', round(cos(emb['request'], emb['issue']), 3))   # 의미 관계가 숫자로\nprint('request-credit:', round(cos(emb['request'], emb['credit']), 3))  # 단어쌍마다 다른 유사도",
      "note": "원핫은 단어 수만큼 차원이 커지고 대부분이 0인 희소 구조라 서로 다른 단어의 유사도가 항상 0이다. 학습된 임베딩은 낮은 차원(보통 384~1536)에 의미를 밀집시켜 비슷한 단어가 가까운 점이 되도록 만든다. RAG의 임베딩 단계는 이 원리를 문장·청크 단위로 확장한 것이다."
    },
    {
      "title": "메타데이터 설계 - 권한 태그와 문서 타입으로 검색 전에 거르기",
      "lang": "python",
      "code": "# 교재 권장 메타데이터: 식별자 + 검색 근거 + 필터링 필드를 함께 저장한다\nchunks = [\n    {'content': '2024년 재무 실적 요약...', 'metadata': {              # 청크 1\n        'doc_id': 'annual_2024', 'page': 23, 'document_type': '보고서',  # 식별자·근거\n        'updated_at': '2024-03-15', 'access_tag': ['finance']}},         # 필터 필드\n    {'content': '설치 절차 1단계...', 'metadata': {                   # 청크 2\n        'doc_id': 'manual_v2', 'page': 7, 'document_type': '매뉴얼',\n        'updated_at': '2024-06-01', 'access_tag': ['all']}},\n]\n\ndef visible_chunks(user_tags, doc_type=None):     # 벡터 검색 전에 후보를 거르는 함수\n    out = []                                      # 통과한 청크 저장\n    for c in chunks:                              # 모든 청크 검사\n        meta = c['metadata']                      # 메타데이터 꺼내기\n        opened = 'all' in meta['access_tag']      # 전체 공개 문서인가\n        allowed = set(meta['access_tag']) & set(user_tags)   # 사용자 권한과 교집합\n        if not opened and not allowed:            # 공개도 아니고 권한도 없으면\n            continue                              # 검색 대상에서 제외(허용 vs 배제)\n        if doc_type and meta['document_type'] != doc_type:   # 문서 타입 조건 불일치도\n            continue                              # 제외\n        out.append(c)                             # 조건 통과한 청크만 남김\n    return out                                    # 남은 후보만 벡터 검색으로 넘긴다\n\nprint(len(visible_chunks(['all'])))               # 일반 사용자: 매뉴얼 1건만 보임\nprint(len(visible_chunks(['finance'], '보고서')))  # 재무 권한 + 보고서 필터: 1건",
      "note": "메타데이터는 doc_id 같은 식별자, page·section 같은 검색 근거, access_tag·document_type·updated_at 같은 필터링 필드의 세 층으로 설계한다. 특히 접근 권한은 답변을 만든 뒤가 아니라 검색 단계에서부터 체크해야 내부 정보 유출을 막을 수 있다는 것이 교재의 강조점이다."
    }
  ],
  "rag-2": [
    {
      "title": "BM25 키워드 검색 - Dense가 놓치는 에러코드를 잡는다(bm25s)",
      "lang": "python",
      "code": "# pip install bm25s\n# 'PostgreSQL 42P01' 같은 정확한 키워드는 의미검색(Dense)이 자주 실패한다\nimport bm25s\n\ncorpus = [                                            # 검색 대상 문서들\n    'PostgreSQL 17.2 릴리즈 노트와 신규 기능',\n    '데이터베이스 기초 개념 가이드',\n    '오류 코드 42P01 테이블 없음 해결 방법',\n]\ntokens = bm25s.tokenize(corpus)                       # 문서를 단어 단위로 쪼갠다(토큰화)\nretriever = bm25s.BM25()                              # BM25 인덱스 객체 생성\nretriever.index(tokens)                               # 통계(단어 빈도·희소성) 기반 색인 구축(학습 불필요)\n\nquery = bm25s.tokenize('42P01 오류')                   # 질의도 같은 방식으로 토큰화\nresults, scores = retriever.retrieve(query, k=2)      # 키워드가 일치하는 상위 2개 문서\nfor i in range(results.shape[1]):                     # 결과를 순서대로 출력\n    idx = results[0, i]                               # 문서 번호\n    print(round(float(scores[0, i]), 2), corpus[idx]) # 42P01 문서가 1위로 나온다",
      "note": "BM25는 40년 검증된 키워드 검색으로 학습이 필요 없다. 희귀한 단어(42P01)가 문서에 많이 나올수록 점수가 높아, Dense가 놓치는 버전번호·에러코드·고유명사를 정확히 잡는다."
    },
    {
      "title": "RRF로 Dense와 BM25 두 순위를 안전하게 합치기(k=60)",
      "lang": "python",
      "code": "# 두 검색기의 점수는 스케일이 달라 그냥 더하면 안 된다 -> 순위(rank)만으로 합친다\ndef rrf_fusion(dense_ids, bm25_ids, k=60, top_n=5):   # k=60은 검증된 표준 상수\n    scores = {}                                       # 문서번호 -> 합산 점수\n    for rank, doc_id in enumerate(dense_ids):         # Dense 결과를 1위부터 순회\n        scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank + 1)  # 순위가 앞설수록 큰 점수\n    for rank, doc_id in enumerate(bm25_ids):          # BM25 결과도 같은 방식으로 더한다\n        scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank + 1)\n    ranked = sorted(scores.items(), key=lambda x: x[1], reverse=True)  # 합산 점수 내림차순\n    return ranked[:top_n]                             # 최종 Top-N 반환\n\ndense = [10, 3, 7, 1, 5]                              # Dense(의미) 검색의 상위 문서 순서(예시)\nbm25 = [7, 10, 2, 3, 9]                               # BM25(키워드) 검색의 상위 문서 순서(예시)\nfinal = rrf_fusion(dense, bm25)                       # 두 순위를 RRF로 융합\nprint('Hybrid 최종 순위:', final)                      # 양쪽에서 모두 상위였던 7·10번이 앞으로 온다",
      "note": "RRF(Reciprocal Rank Fusion)는 점수가 아니라 순위만 사용해 두 검색기를 합친다. 스케일이 달라도 안전하며 k=60은 거의 바꿀 필요가 없는 표준값이다."
    },
    {
      "title": "BGE-Reranker로 최종 재정렬 - 느리지만 정밀한 Cross-Encoder",
      "lang": "python",
      "code": "# pip install FlagEmbedding\n# Hybrid로 Top-50을 빠르게 추린 뒤, 질문+문서를 함께 넣어 정밀 채점한다\nfrom FlagEmbedding import FlagReranker\n\nreranker = FlagReranker('BAAI/bge-reranker-v2-m3', use_fp16=True)  # 다국어(한국어) 리랭커, CPU도 동작\n\nquery = 'HNSW 인덱스와 IVF의 메모리 사용 차이'          # 사용자 질문\ncandidates = [                                        # Hybrid 검색이 넘겨준 후보 문서들\n    'FAISS 라이브러리 소개',\n    'HNSW 구조와 메모리 사용량 설명',\n    'IVF 클러스터 기반 검색 원리',\n]\npairs = [[query, doc] for doc in candidates]          # (질문, 문서) 쌍으로 묶는다\nscores = reranker.compute_score(pairs, normalize=True)  # 0~1 관련도 점수로 정밀 채점\n\nranked = sorted(zip(scores, candidates), reverse=True)  # 점수 높은 순으로 재정렬\nfor score, doc in ranked:                             # 관련 있는 문서가 위로 올라온다\n    print(round(score, 3), doc)                       # HNSW·IVF 문서가 상위, 무관한 소개글이 하위",
      "note": "Bi-Encoder(벡터검색)는 빠르지만 질문-문서 상호작용을 못 본다. Cross-Encoder인 BGE-Reranker는 둘을 함께 입력해 정밀하게 채점한다. 느려서 전체 DB엔 못 쓰고 Top-50에만 적용한다."
    },
    {
      "title": "MMR 직접 구현 - 관련성과 다양성 사이를 λ로 조절",
      "lang": "python",
      "code": "import numpy as np                              # 수치 계산\n\nnp.random.seed(0)                               # 결과 재현용 시드\nquery = np.random.randn(8)                      # 질문 벡터(8차원 연습)\ndocs = np.random.randn(6, 8)                    # 후보 문서 6개\n\ndef cos(a, b):                                  # 코사인 유사도\n    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-12))\n\ndef mmr(query, docs, k=3, lam=0.5):             # lam=1 관련성만, lam=0 다양성만\n    selected = []                               # 뽑힌 문서 번호\n    rest = list(range(len(docs)))               # 아직 남은 후보\n    while len(selected) < k and rest:           # k개 뽑을 때까지 반복\n        best, best_score = None, -1e9           # 이번 라운드 최고 후보\n        for i in rest:                          # 남은 후보마다\n            rel = cos(query, docs[i])           # 쿼리와의 관련성\n            red = max((cos(docs[i], docs[j]) for j in selected), default=0)  # 기존 선택과의 중복도\n            score = lam * rel - (1 - lam) * red # MMR 점수 = 관련성 - 중복 벌점\n            if score > best_score:              # 더 좋은 후보를 찾으면\n                best, best_score = i, score     # 갱신\n        selected.append(best)                   # 최고 후보 확정\n        rest.remove(best)                       # 후보군에서 제거\n    return selected                             # 관련 있으면서 서로 다른 k개\n\nprint('lam=1.0(유사도만):', mmr(query, docs, lam=1.0))   # 단순 Top-k와 같아짐\nprint('lam=0.5(균형)  :', mmr(query, docs, lam=0.5))     # 중복을 피해 고른 결과",
      "note": "코사인 Top-k는 서로 거의 같은 문서만 몰려 나와 새로 더해 주는 가치가 0에 가까울 수 있다. MMR은 쿼리와 가까우면서 이미 뽑힌 문서와는 먼 후보에 높은 점수를 줘, 여러 관점을 모아야 하는 질의에 유리하다. λ가 1이면 유사성만, 0이면 다양성만 보게 되어 중간값으로 균형을 잡는다."
    },
    {
      "title": "RAG 체인 조립 - retriever | prompt | llm 파이프라인",
      "lang": "python",
      "code": "from langchain_core.prompts import PromptTemplate          # 프롬프트 틀\nfrom langchain_openai import ChatOpenAI                    # 답변 생성 LLM\nfrom langchain_core.output_parsers import StrOutputParser  # 답변 텍스트만 뽑는 파서\nfrom langchain_core.runnables import RunnablePassthrough   # 입력을 그대로 통과\n\nprompt = PromptTemplate.from_template(          # RAG 표준 프롬프트: 지시 + 질문 + 문맥\n    '당신은 질문-답변 작업을 수행하는 AI 어시스턴트입니다.\\n'\n    '검색된 문맥(context)을 사용하여 질문(question)에 답하세요.\\n'\n    '문맥에서 답을 찾을 수 없다면 모른다고 말하세요. 한국어로 답하세요.\\n\\n'\n    '# Question:\\n{question}\\n\\n# Context:\\n{context}\\n\\n# Answer:'\n)\nllm = ChatOpenAI(model='gpt-4o-mini', temperature=0)   # 사실 위주 답변이라 온도 0\n# retriever = vectorstore.as_retriever()               # 앞 실습에서 만든 검색기 재사용\n\nchain = (                                      # LCEL 파이프라인 조립\n    {'context': retriever,                     # 질문 -> 리트리버가 문맥을 검색해 채움\n     'question': RunnablePassthrough()}        # 질문은 가공 없이 그대로 전달\n    | prompt                                   # 문맥+질문을 프롬프트에 채우고\n    | llm                                      # LLM이 답변을 생성한 뒤\n    | StrOutputParser()                        # 텍스트만 추출\n)\nprint(chain.invoke('RAG의 전처리 단계는 무엇인가요?'))   # 체인 한 번에 실행",
      "note": "Document Loader부터 Retriever까지 만든 부품을 파이프(|) 연산자 하나로 잇는 Chain 단계다. 프롬프트는 지시사항·질문·문맥의 3부 구성이 표준이며, 문맥에 없으면 모른다고 답하라는 지시가 환각을 줄이는 핵심 문구다. 검색 결과(chunk)가 context 자리에 자동으로 채워진다."
    },
    {
      "title": "요약 기반 검색 - 요약으로 찾고 원문으로 답한다",
      "lang": "python",
      "code": "# 긴 원문 대신 짧은 요약을 임베딩해 검색 속도와 관련도를 높이는 전략\ndocs = [                                        # 원문과 요약을 쌍으로 저장\n    {'id': 0, 'raw': '3분기 매출은 전년 대비 12% 증가했으며 원인은... (긴 본문)',\n     'summary': '3분기 매출 12% 증가와 원인 분석'},                 # 검색용 요약\n    {'id': 1, 'raw': '신규 채용 절차는 서류, 코딩테스트, 면접 순이며... (긴 본문)',\n     'summary': '신규 채용 3단계 절차 안내'},                       # 검색용 요약\n]\n\nfrom langchain_openai import OpenAIEmbeddings   # 임베딩 모델\nimport numpy as np                              # 유사도 계산\nemb = OpenAIEmbeddings()                        # 요약문 임베딩에 사용\n\nvecs = np.array(emb.embed_documents([d['summary'] for d in docs]))  # 요약만 임베딩\nq = np.array(emb.embed_query('채용 절차가 어떻게 되나요?'))           # 질문 임베딩\n\nscores = vecs @ q / (np.linalg.norm(vecs, axis=1) * np.linalg.norm(q))  # 코사인 유사도\nbest = int(np.argmax(scores))                   # 요약 기준으로 1등 문서 선택\nprint('검색은 요약으로 :', docs[best]['summary'])  # 짧고 핵심적인 요약이 검색 대상\nprint('LLM에는 원문 전달:', docs[best]['raw'])     # 답변 생성에는 풍부한 원문 사용",
      "note": "벡터 저장 전에 LLM으로 요약을 만들어 두고, 검색은 요약으로 하되 답변 생성에는 원문(또는 원문+요약)을 쓰는 교재의 요약 기반 검색 전략이다. Parent-Child가 조각 크기로 검색과 전달을 나눈다면, 이 방식은 정보 밀도로 나눈다. 문서가 길면 Map-Reduce·Refine 요약과 결합하고, 요약 품질을 높이려면 Chain of Density를 검토한다."
    }
  ],
  "rag-3": [
    {
      "title": "검색기 평가 - Hit Rate@K와 MRR 직접 계산",
      "lang": "python",
      "code": "# 검색이 정답 문서를 '몇 개 안에' 그리고 '몇 번째로' 찾는지를 수치로 본다\ndef evaluate(results, answers, k=3):                  # results: 질문별 검색된 문서ID 리스트\n    hit, rr_sum = 0, 0.0                              # 적중 횟수, 역순위 합\n    for docs, truth in zip(results, answers):         # 질문마다 (검색결과, 정답ID) 비교\n        topk = docs[:k]                               # 상위 K개만 평가 대상\n        if truth in topk:                             # 정답이 상위 K 안에 있으면\n            hit += 1                                  # Hit Rate 카운트 증가\n            rank = topk.index(truth) + 1              # 정답이 몇 번째인지(1부터)\n            rr_sum += 1 / rank                        # 역순위(1위=1.0, 2위=0.5, 3위=0.33)\n    return hit / len(answers), rr_sum / len(answers)  # (Hit Rate@K, MRR)\n\nresults = [[42, 7, 3], [1, 88, 5], [9, 2, 60], [11, 4, 8]]  # 4개 질문의 검색 결과(예시)\nanswers = [42, 88, 60, 99]                            # 각 질문의 정답 문서ID(마지막은 못 찾음)\nhr, mrr = evaluate(results, answers, k=3)             # 지표 계산\nprint('Hit Rate@3:', round(hr, 3))                    # 0.75 (4개 중 3개 적중)\nprint('MRR:', round(mrr, 3))                          # 0.458 (정답이 앞 순위일수록 높다)",
      "note": "Hit Rate@K는 \"정답이 상위 K개 안에 있나\"만 보고, MRR은 \"몇 번째에 있나\"까지 반영한다. 같은 Hit Rate라도 MRR이 높으면 더 좋은 검색기다."
    },
    {
      "title": "생성 답변 평가 - LLM-as-a-Judge(정확성·충실성 채점)",
      "lang": "python",
      "code": "# 생성된 답변이 문맥에 충실한지 다른 LLM에게 심사를 맡긴다\nfrom openai import OpenAI\nclient = OpenAI(api_key='sk-본인키')\n\nJUDGE = '''당신은 RAG 답변 평가자입니다. 아래 기준으로 1~5점 채점하세요.\n- 정확성(Correctness): 문맥과 사실이 일치하는가\n- 충실성(Faithfulness): 문맥에 없는 내용을 지어내지 않았는가(환각 감점)\n반드시 \"정확성:N 충실성:N 이유:...\" 형식으로만 답하세요.'''\n\nquestion = 'HBM이란 무엇인가?'                          # 사용자 질문\ncontext = 'HBM은 여러 D램을 수직으로 쌓은 고대역폭 메모리다.'  # 검색된 근거 문맥\nanswer = 'HBM은 D램을 쌓아 대역폭을 높인 메모리이며 2010년 삼성이 최초 개발했다.'  # 평가 대상 답변\n\nres = client.chat.completions.create(                 # 심사 LLM 호출\n    model='gpt-4o-mini',\n    messages=[\n        {'role': 'system', 'content': JUDGE},         # 평가자 역할과 기준 부여\n        {'role': 'user', 'content': f'질문:{question}\\n문맥:{context}\\n답변:{answer}'},\n    ],\n    temperature=0,                                    # 일관된 채점을 위해 0 고정\n)\nprint(res.choices[0].message.content)                 # 뒷부분 '삼성 최초 개발'은 문맥에 없어 충실성 감점",
      "note": "정답 라벨을 일일이 만들기 어려운 생성 품질은 LLM-as-a-Judge로 평가한다. 정확성·충실성처럼 판정 가능한 기준을 명시하고 형식을 고정해야 채점이 일관된다."
    },
    {
      "title": "쿼리 분해(Query Transformation) - 비교 질문을 하위 질문으로",
      "lang": "python",
      "code": "from langchain_openai import ChatOpenAI                    # LLM\nfrom langchain_core.prompts import PromptTemplate          # 프롬프트 틀\nfrom langchain_core.output_parsers import StrOutputParser  # 텍스트 파서\n\nllm = ChatOpenAI(model='gpt-4o-mini', temperature=0)   # 분해는 일관성이 중요해 온도 0\n\ndecompose = PromptTemplate.from_template(              # 하위 질문 생성 지시\n    '다음 질문을 검색하기 좋은 단순한 하위 질문 2~3개로 나눠줘.\\n'\n    '한 줄에 하나씩만 출력해줘.\\n질문: {question}'\n) | llm | StrOutputParser()                            # 분해 전용 미니 체인\n\nquestion = '삼성전자와 애플의 최근 3년 실적을 비교해 주세요.'   # 복합 비교 질문\nsub_questions = decompose.invoke({'question': question}).strip().split('\\n')  # 하위 질문 목록\n\nresults = []                                           # 하위 질문별 검색 결과 기록\nfor sq in sub_questions:                               # 하위 질문마다\n    found = retriever.invoke(sq)                       # 각각 독립적으로 검색\n    results.append(sq + ' -> 검색 문서 ' + str(len(found)) + '건')  # 결과 정리\n\nprint('하위 질문:', sub_questions)                      # 분해가 잘 되었는지 확인\nprint(results)                                         # 마지막에 답변을 종합 생성한다",
      "note": "Naive RAG는 1질문=1검색 구조라 비교·인과 같은 복합 질문에 약하다. Advanced RAG의 Pre-Retrieval 단계에서 질문을 하위 질문으로 변환(Query Transformation)해 각각 검색하고 마지막에 종합하면 검색 누락이 크게 줄어든다. 단, 분해가 잘못되면 전체가 오답이 되고 LLM 호출이 늘어나는 트레이드오프가 있다."
    },
    {
      "title": "Modular RAG 라우팅 패턴 - 질문 유형별로 다른 파이프라인",
      "lang": "python",
      "code": "def route(question):                          # Query Routing: 어느 흐름으로 보낼지 결정\n    if any(w in question for w in ['얼마', '평균', '%']):    # 수치·계산형 질문\n        return 'calc'                          # 계산 모듈 경로\n    if any(w in question for w in ['최신', '오늘', '뉴스']):  # 실시간 정보형 질문\n        return 'web'                           # 웹 검색 모듈 경로\n    return 'vector'                            # 기본: 사내 문서 벡터 검색 경로\n\ndef run_pipeline(question):                    # 경로별로 다른 모듈 조합 실행\n    path = route(question)                     # 1) 규칙 기반 라우팅 판단\n    if path == 'calc':                         # 계산형이면\n        return '계산 모듈: 수치 테이블 조회 후 계산'       # RDB + 계산 도구 조합\n    if path == 'web':                          # 실시간형이면\n        return '웹 검색 모듈: 최신 문서 수집 후 요약'      # 웹 검색 + 요약 조합\n    return '벡터 검색 모듈: 문서 검색 + 재순위 + 생성'     # 기본 RAG 조합\n\nquestions = ['작년 영업이익률은 몇 %인가요?',     # 유형이 다른 세 질문\n             '오늘 반도체 뉴스 요약해줘',\n             '휴가 규정 알려줘']\nfor q in questions:                            # 질문마다\n    print(q, '->', run_pipeline(q))            # 서로 다른 경로로 분기되는지 확인",
      "note": "Modular RAG는 RAG를 레고처럼 기능 모듈로 쪼개고 Routing·Branching·Loop 패턴으로 재조립하는 프레임워크다. 라우팅 조건은 LLM 판단이 아니라 규칙(Rule)으로 정의해야 흐름이 안정적이라는 것이 교재의 지적이다. 실무에서는 검색기·프롬프트 템플릿·모델까지 경로별로 바꿔 끼운다."
    },
    {
      "title": "RAGAS 합성 테스트셋 - 평가용 질문·정답 쌍을 자동 생성",
      "lang": "python",
      "code": "from ragas.testset.generator import TestsetGenerator     # 테스트셋 생성기\nfrom ragas.testset.evolutions import simple, reasoning, multi_context, conditional  # 질문 유형 4종\n\ngenerator = TestsetGenerator.from_langchain(   # 생성기 조립\n    generator_llm,                             # 질문을 만들어 내는 LLM\n    critic_llm,                                # 만들어진 질문의 품질을 검사하는 LLM\n    ragas_embeddings,                          # 임베딩 모델\n    doc_store,                                 # 문서 저장소(InMemory)\n)\n\ndistributions = {simple: 0.4,        # 단순 사실 질문 40%\n                 reasoning: 0.2,     # 추론이 필요한 질문 20%\n                 multi_context: 0.2, # 여러 문맥을 종합하는 질문 20%\n                 conditional: 0.2}   # 조건부 질문 20%\n\ntest_set = generator.generate_with_langchain_docs(   # 우리 문서에서 자동 생성\n    documents=docs,                # 지식베이스 문서\n    test_size=10,                  # 질문 10개\n    distributions=distributions,   # 유형 비율 반영\n)\nprint(test_set.to_pandas().head()) # 질문·문맥·정답(Ground Truth) 쌍 확인",
      "note": "평가셋을 손으로 만들기 어려울 때 RAGAS의 Synthetic Test Dataset 기능이 문서에서 질문·문맥·참조답변 쌍을 자동 생성해 준다. 단순 질문만 섞으면 검색기의 약점이 드러나지 않으므로 추론·다중문맥·조건부 유형의 비율을 함께 지정하는 것이 핵심이다. 이렇게 만든 데이터로 Context Precision/Recall, Faithfulness 등을 채점한다."
    }
  ],
  "agent-1": [
    {
      "title": "LangGraph State 정의 - add_messages 리듀서로 대화 누적",
      "lang": "python",
      "code": "# pip install langgraph\n# State는 노드끼리 주고받는 '공용 기억 저장소'다\nfrom typing import Annotated, TypedDict\nfrom langgraph.graph.message import add_messages\n\nclass GraphState(TypedDict):                          # 그래프 전체가 공유하는 상태 스키마\n    question: str                                     # 사용자 질문(덮어쓰기 필드)\n    context: str                                      # 검색된 문서(덮어쓰기 필드)\n    answer: str                                       # 생성된 답변(덮어쓰기 필드)\n    messages: Annotated[list, add_messages]           # 대화 메시지(누적 필드: 리듀서가 append)\n\n# 일반 필드는 새 값으로 '덮어쓰기'되지만\n# add_messages가 붙은 messages는 기존 리스트에 '누적'된다\ns = {'question': 'HBM이란?', 'context': '', 'answer': '', 'messages': []}\ns = {**s, 'messages': add_messages(s['messages'], [{'role': 'user', 'content': '안녕'}])}\ns = {**s, 'messages': add_messages(s['messages'], [{'role': 'assistant', 'content': '반가워요'}])}\nprint('누적된 메시지 수:', len(s['messages']))         # 2 (덮어쓰지 않고 쌓인다)",
      "note": "State의 일반 필드는 노드를 지날 때 덮어쓰기되지만, add_messages 리듀서를 붙인 필드는 자동으로 누적된다. 이 덕분에 대화 맥락이 흐름 전체에 유지된다."
    },
    {
      "title": "Node 함수 - State를 받아 State를 돌려주는 작업 단위",
      "lang": "python",
      "code": "# 노드는 하나의 함수다: 현재 State를 입력받아, 바꿀 부분만 State로 반환한다\nfrom typing import TypedDict\n\nclass GraphState(TypedDict):                          # 앞에서 정의한 상태 재사용\n    question: str\n    context: str\n    answer: str\n\ndef retrieve_node(state: GraphState) -> GraphState:   # 노드1: 문서 검색\n    q = state['question']                             # State에서 질문을 읽고\n    docs = f'[{q}] 관련 검색 문맥...'                   # 실제로는 벡터DB 검색(여기선 개념만)\n    return {'context': docs}                          # context 키만 갱신해 반환\n\ndef generate_node(state: GraphState) -> GraphState:   # 노드2: 답변 생성\n    ctx = state['context']                            # 앞 노드가 채운 context를 읽고\n    ans = f'문맥 기반 답변(근거: {ctx})'               # 실제로는 LLM 호출\n    return {'answer': ans}                            # answer 키만 갱신해 반환\n\n# 두 노드를 순서대로 실행하면 State가 점진적으로 채워진다\nst = {'question': 'HBM이란?', 'context': '', 'answer': ''}\nst = {**st, **retrieve_node(st)}                      # 검색 노드 실행 -> context 채움\nst = {**st, **generate_node(st)}                      # 생성 노드 실행 -> answer 채움\nprint(st['answer'])                                   # 검색->생성이 State로 연결된 것을 확인",
      "note": "노드는 State 전체가 아니라 자신이 읽고 쓸 키만 다뤄야 한다(State Ownership). 반환은 반드시 State여야 다음 노드가 이어받는다. 로직이 복잡하면 노드를 쪼개 디버깅을 쉽게 한다."
    },
    {
      "title": "LangChain 1.0 create_agent - @tool로 ReAct 에이전트 만들기",
      "lang": "python",
      "code": "# pip install langchain langchain-openai\n# LangChain 1.0은 create_agent 하나로 프롬프트+모델+도구를 묶는다(scratchpad 자동 관리)\nfrom langchain.agents import create_agent\nfrom langchain_core.tools import tool\nfrom langchain_openai import ChatOpenAI\n\n@tool\ndef get_stock_price(ticker: str) -> str:              # @tool 데코레이터로 함수를 도구로 변환\n    \"Return today's closing price for a stock ticker.\"  # docstring은 LLM이 읽는 사용설명(영어 권장)\n    prices = {'000660': '18만원', '005930': '7만원'}   # 실제로는 외부 API 호출\n    return prices.get(ticker, '정보 없음')             # 티커에 맞는 종가 반환\n\nagent = create_agent(                                 # 에이전트 정의\n    model=ChatOpenAI(model='gpt-4o-mini'),            # 두뇌 역할 LLM\n    tools=[get_stock_price],                          # 손발 역할 도구 목록\n    system_prompt='너는 도구를 활용해 답하는 금융 비서다.',  # 역할 지시\n)\nresult = agent.invoke({'messages': [                   # 메시지 중심 구조로 실행\n    {'role': 'user', 'content': 'SK하이닉스(000660) 종가 알려줘'},\n]})\nprint(result['messages'][-1].content)                 # LLM이 스스로 도구를 호출(ReAct)해 답한다",
      "note": "ReAct는 생각(Thought)->도구 호출(Action)->관찰(Observation)을 반복한다. create_agent가 이 루프와 scratchpad를 자동 관리해, @tool로 만든 도구만 넘기면 에이전트가 알아서 호출한다."
    },
    {
      "title": "ReAct 루프를 파이썬으로 흉내 - Thought, Action, Observation",
      "lang": "python",
      "code": "def stock_price_tool(ticker):                  # 도구: 주가 조회(연습용 가짜 데이터)\n    prices = {'SK하이닉스': 210000, '삼성전자': 71000}   # 미리 준비한 종가 표\n    return prices.get(ticker, 0)               # 종목명으로 가격 반환\n\ndef react_agent(question):                     # ReAct: 사고와 행동을 번갈아 반복\n    log = []                                   # 지금까지의 사고 기록(scratchpad)\n    for step in range(3):                      # 무한루프 방지: 최대 3회 반복\n        log.append('Thought: 답하려면 어떤 도구가 필요한가?')   # 1) Thought: 다음 행동 사고\n        if 'SK하이닉스' in question:            # 2) Action: 도구 호출 결정\n            obs = stock_price_tool('SK하이닉스')            # 도구 실행\n            log.append('Action: stock_price_tool / Observation: ' + str(obs))  # 3) 결과 관찰\n            if obs > 0:                        # 정보 충족성 판단(루프 종료 조건)\n                return log, 'SK하이닉스 종가는 ' + format(obs, ',') + '원입니다.'  # 답변 확정\n        log.append('Observation: 정보 부족, 다시 사고')   # 부족하면 루프 계속\n    return log, '답을 찾지 못했습니다.'          # 최대 반복 도달 시 안전 종료\n\nlog, answer = react_agent('금일 SK하이닉스 종가는 얼마인가요?')   # 실행\nprint('\\n'.join(log))                          # 사고-행동-관찰 흐름 출력\nprint('Answer:', answer)                       # 최종 답변",
      "note": "ReAct는 Thought(사고), Action(도구 실행), Observation(결과 관찰)을 답이 나올 때까지 반복하는 프레임워크로, Reasoning과 Acting을 최초로 하나의 시스템에 결합한 연구다. 이 수동 구현이 create_agent가 내부에서 대신해 주는 일의 뼈대다. 정보 충족성 판단과 최대 반복 횟수 같은 종료 조건이 없으면 루프는 끝나지 않는다."
    },
    {
      "title": "State 덮어쓰기(Overwrite) - 노드는 바뀐 키만 갱신한다",
      "lang": "python",
      "code": "# LangGraph의 State는 노드를 지날 때 '바뀐 키만' 덮어쓰고 나머지는 유지된다\nstate = {}                                     # 빈 상태에서 시작\n\ndef node1(state):                              # 노드1: 질문 입력 단계\n    return {'time': 1, 'name': '철수', 'llm': 'GPT'}   # 세 키를 기록\n\ndef node2(state):                              # 노드2: 시간만 갱신\n    return {'time': 2}                         # name과 llm은 건드리지 않음\n\ndef node3(state):                              # 노드3: 이름 변경 단계\n    return {'time': 3, 'name': '영희'}          # name을 덮어쓰기\n\nmessages = []                                  # 대화 기록(누적이 필요한 필드)\nfor node in [node1, node2, node3]:             # 노드를 순서대로 실행\n    update = node(state)                       # 노드가 돌려준 '부분 업데이트'\n    state.update(update)                       # 일반 필드: 선택적 덮어쓰기\n    messages = messages + ['통과: ' + str(update)]   # 리스트 필드: 리듀서처럼 누적\n    print('state:', state)                     # 매 단계 상태 확인\n\nprint('messages 개수:', len(messages))         # 3건 모두 남아 있음(누적)\nprint('name 최종값:', state['name'])            # 영희 - 마지막 갱신만 남음(덮어쓰기)",
      "note": "교재의 State Update 표 그대로, 일반 필드는 Overwrite 방식이라 바뀐 키만 갱신되고 변경되지 않은 값은 유지되며 State가 점진적으로 확장된다. 반면 messages 같은 대화 필드는 add_messages 리듀서로 덮지 않고 누적해야 한다. 이 차이를 모르면 대화가 사라지거나 답이 안 바뀌는 버그를 만나게 된다."
    },
    {
      "title": "실무형 GraphState 설계 - 중첩 구조와 실행 제어 필드",
      "lang": "python",
      "code": "from typing import TypedDict, List, Literal      # 타입 명세 도구\n\nclass RetrievalResult(TypedDict):                # 검색 계층: 검색 노드만 쓰는 영역\n    query: str                                   # 실제 실행된 검색어\n    documents: List[str]                         # 찾아온 문서들\n    retrieval_time_ms: float                     # 검색 소요 시간(관측용)\n\nclass EvaluationResult(TypedDict):               # 평가 계층: 판정 노드만 쓰는 영역\n    relevance: float                             # 관련성 점수\n    overall: Literal['GOOD', 'BAD']              # 최종 판정(분기 기준)\n\nclass ErrorInfo(TypedDict, total=False):         # 실패 대비 영역(선택 필드 허용)\n    message: str                                 # 에러 메시지\n    node: str                                    # 실패한 노드 이름\n    retry_count: int                             # 재시도 횟수\n\nclass GraphState(TypedDict, total=False):        # 전체 상태: 계층별로 묶어 관리\n    user_input: str                              # 사용자 입력\n    retrieval: RetrievalResult                   # 검색 결과(중첩 구조)\n    evaluation: EvaluationResult                 # 평가 결과(중첩 구조)\n    status: Literal['RUNNING', 'FAILED', 'SUCCESS']  # 실행 상태(관측·제어)\n    step_count: int                              # 스텝 수(무한루프 방지)\n    error: ErrorInfo                             # 에러 정보\n\nstate = GraphState(user_input='휴가 규정?', status='RUNNING', step_count=0)  # 초기 상태\nprint(state)                                     # 노드는 자기 계층의 키만 읽고 쓴다",
      "note": "교재의 Production-level State 설계로, 평평한 dict 대신 검색·평가·에러를 계층별 중첩 구조로 묶고 status·step_count·retry_count 같은 실행 제어 필드를 반드시 포함한다. State는 데이터 컨테이너가 아니라 노드 간의 Read/Write 계약이며, 노드는 자신이 읽고 쓸 키만 알아야 한다(State Ownership). step_count는 무한루프 방지의 안전장치다."
    }
  ],
  "agent-2": [
    {
      "title": "Agentic RAG - 문서 품질을 채점하고 나쁘면 질의 재작성",
      "lang": "python",
      "code": "# 단순 RAG는 첫 검색이 나쁘면 그대로 틀린다. Agentic RAG는 스스로 평가하고 다시 찾는다\nfrom langgraph.graph import StateGraph, START, END\nfrom typing import TypedDict\n\nclass RAGState(TypedDict):                            # 그래프 공유 상태\n    question: str                                     # (재작성될 수 있는) 질문\n    docs: str                                         # 검색 결과\n    grade: str                                        # 'GOOD' 또는 'BAD'\n    tries: int                                        # 재시도 횟수(무한루프 방지용)\n\ndef retrieve(state):                                  # 노드: 검색\n    return {'docs': f\"[{state['question']}] 검색 결과\"}  # 실제로는 벡터DB 검색\n\ndef grade(state):                                     # 노드: 검색 품질 자가 채점\n    ok = '결과' in state['docs'] and state['tries'] < 2   # 실제로는 LLM이 관련성 판정\n    return {'grade': 'GOOD' if ok else 'BAD'}\n\ndef rewrite(state):                                   # 노드: 질의 재작성 후 재검색 유도\n    return {'question': state['question'] + ' (구체화)', 'tries': state['tries'] + 1}\n\ndef route(state):                                     # 조건부 분기: 채점 결과로 경로 결정\n    return END if state['grade'] == 'GOOD' else 'rewrite'  # 좋으면 종료, 나쁘면 재작성\n\ng = StateGraph(RAGState)                              # 그래프 생성\nfor name, fn in [('retrieve', retrieve), ('grade', grade), ('rewrite', rewrite)]:\n    g.add_node(name, fn)                              # 노드 3개 등록\ng.add_edge(START, 'retrieve')                         # 시작 -> 검색\ng.add_edge('retrieve', 'grade')                       # 검색 -> 채점\ng.add_conditional_edges('grade', route, {'rewrite': 'rewrite', END: END})  # 채점 -> 분기\ng.add_edge('rewrite', 'retrieve')                     # 재작성 -> 다시 검색(루프)\napp = g.compile()                                     # 실행 가능한 앱으로 컴파일\nprint(app.invoke({'question': 'HBM', 'docs': '', 'grade': '', 'tries': 0})['grade'])",
      "note": "검색->채점->(나쁘면)재작성->재검색 루프가 Agentic RAG의 핵심이다. tries로 최대 재시도를 제한해 무한루프를 막는다. 조건부 엣지가 \"검색이 나쁠 때 스스로 회복\"하게 만든다."
    },
    {
      "title": "Reflection 패턴 - 초안 생성 후 스스로 비평하고 개선",
      "lang": "python",
      "code": "# 에이전트가 자기 답을 되돌아보고(Reflect) 더 나은 답을 만드는 품질 통제 루프\nfrom openai import OpenAI\nclient = OpenAI(api_key='sk-본인키')\n\ndef generate(task, feedback=''):                      # 생성 단계: 초안 또는 개선안 작성\n    prompt = f'과제: {task}'                           # 기본 지시\n    if feedback:                                      # 피드백이 있으면 반영하도록 덧붙인다\n        prompt += f'\\n아래 지적을 반영해 다시 써라:\\n{feedback}'\n    r = client.chat.completions.create(model='gpt-4o-mini',\n        messages=[{'role': 'user', 'content': prompt}])\n    return r.choices[0].message.content\n\ndef reflect(draft):                                   # 비평 단계: 초안의 약점을 지적\n    r = client.chat.completions.create(model='gpt-4o-mini',\n        messages=[{'role': 'user', 'content': f'다음 글의 부족한 점만 짚어라:\\n{draft}'}])\n    return r.choices[0].message.content\n\ntask = '벡터DB를 3문장으로 설명'                        # 수행할 과제\ndraft = generate(task)                                # 1) 초안 생성\nfor i in range(2):                                    # 2) 비평->개선을 최대 2회 반복\n    critique = reflect(draft)                         # 자기 비평\n    draft = generate(task, feedback=critique)         # 비평을 반영해 다시 생성\nprint('최종본:', draft)                                # 루프를 거치며 품질이 올라간다",
      "note": "Reflection은 Generate와 Reflect 두 LLM 호출을 번갈아 돌려 답을 개선한다. Andrew Ng 실험처럼 반복 워크플로를 감싸면 같은 모델도 성능이 크게 오른다. 반복 상한을 둬 비용·무한루프를 통제한다."
    },
    {
      "title": "Agent-as-Tool - 서브에이전트를 도구처럼 감싸 호출",
      "lang": "python",
      "code": "from langchain.tools import tool                 # 함수를 도구로 바꾸는 데코레이터\n\ndef python_exec_agent(task, data):               # 내부는 복잡한 서브에이전트라고 가정\n    result = sum(data) / len(data)               # (예시) 데이터 분석 코드 실행\n    return '평균 = ' + str(round(result, 2))     # 결과만 요약해 반환\n\n@tool\ndef run_python_agent(task: str) -> str:\n    \"\"\"Run the python analysis agent for numeric tasks.\"\"\"  # LLM이 읽는 설명(영어 권장)\n    data = [12, 45, 33, 60]                      # 필요한 데이터만 골라 전달(State 격리)\n    return python_exec_agent(task, data)         # 서브에이전트의 최종 결과만 돌려줌\n\n# 오케스트레이터(메인 에이전트)는 이 도구의 내부가 에이전트인지 알 필요가 없다\n# 전체 대화 기록을 넘기지 않고 입출력 인터페이스만 노출하는 것이 핵심\nprint(run_python_agent.invoke('네 개 수치의 평균을 구해줘'))     # 도구처럼 한 번 호출\nprint(run_python_agent.name, ':', run_python_agent.description)  # 도구 메타 정보 확인",
      "note": "코드 실행이 필요할 때만 서브에이전트에 필요한 데이터만 전달하고 결과값을 받아오는, 교재 퀴즈 1번의 정답 패턴이다. 전체 대화 기록을 공유하지 않는 State Isolation 덕분에 컨텍스트 오염과 비용을 줄인다. 다만 도구로 호출될 때마다 서브에이전트 전체 실행 비용이 발생하고 오케스트레이터 의존도가 커진다."
    },
    {
      "title": "Judge와 Gate 분리 - 판정은 확률, 분기는 결정론",
      "lang": "python",
      "code": "import random                                   # LLM 판정의 확률성을 흉내\n\ndef judge_node(answer):                         # Judge: LLM 호출(확률적 출력)\n    score = random.uniform(0.5, 1.0)            # 같은 입력에도 점수가 흔들릴 수 있음\n    verdict = 'PASS' if score >= 0.8 else 'FAIL'    # 판정 결과\n    return {'verdict': verdict, 'score': round(score, 2)}   # 판정만 반환(라우팅은 안 함)\n\ndef gate(judge_result, retry_count, max_retry=2):   # Gate: 순수 함수(결정론적 라우팅)\n    if judge_result['verdict'] == 'PASS':       # PASS면 언제나\n        return 'END'                            # 같은 경로: 종료\n    if retry_count >= max_retry:                # 재시도 한도를 넘으면 언제나\n        return 'FALLBACK'                       # 같은 경로: 대체 응답\n    return 'REGENERATE'                         # 그 외에는 언제나: 재생성\n\nretry = 0                                       # 재시도 카운터\nwhile True:                                     # 에이전트 루프\n    result = judge_node('생성된 답변')            # 1) 확률적 판정\n    route = gate(result, retry)                 # 2) 결정론적 분기\n    print('판정:', result, '-> 경로:', route)    # 흐름 확인\n    if route != 'REGENERATE':                   # 종료 또는 대체 경로면\n        break                                   # 루프 탈출(코드로 강제된 종료 조건)\n    retry += 1                                  # 재시도 횟수 증가",
      "note": "Harness Engineering의 결정론적 경계 — LLM Judge의 출력은 여전히 확률 분포라서 결정론이 되는 것은 판정의 정확성이 아니라 판정 결과를 받아 분기·재시도로 잇는 파이프라인의 동작이다. 판정과 라우팅을 한 노드에 섞으면(검증하고 다음 단계도 정해라) 이 경계가 사라진다. 루프 종료 조건은 모델 판단이 아니라 코드 상수(max_retry)에 박아야 한다."
    },
    {
      "title": "도구 권한 하네스 - 노출 필터와 실행 게이트의 2단 방어",
      "lang": "python",
      "code": "WRITE_TOOLS = {'refund', 'delete_record'}       # 쓰기(위험) 도구 목록: 상수로 고정\nREFUND_CAP = 100000                             # 환불 한도: 프롬프트가 아닌 코드에 박기\n\ndef expose_tools(role):                         # 1단계 노출 필터(결정론)\n    all_tools = ['search', 'calculator', 'refund', 'delete_record']   # 전체 도구\n    if role != 'admin':                         # 관리자가 아니면\n        return [t for t in all_tools if t not in WRITE_TOOLS]  # 위험 도구를 모델에게 아예 안 보여줌\n    return all_tools                            # 관리자에게만 전부 노출\n\ndef execute_gate(tool_name, args, role):        # 2단계 실행 게이트(결정론 + HITL)\n    if tool_name in WRITE_TOOLS and role != 'admin':   # 권한 없는 쓰기 요청은\n        return '차단: 권한 없음'                  # 무조건 차단\n    if tool_name == 'refund' and args.get('amount', 0) > REFUND_CAP:  # 한도 초과 환불은\n        return '보류: 사람 승인 필요(HITL)'        # 사람의 승인 흐름으로 전환\n    return '실행 허용'                            # 안전한 요청만 실제 실행\n\nprint(expose_tools('user'))                     # 일반 사용자: 조회 도구만 보임\nprint(execute_gate('refund', {'amount': 50000}, 'admin'))    # 한도 이내: 허용\nprint(execute_gate('refund', {'amount': 999999}, 'admin'))   # 한도 초과: HITL 보류\nprint(execute_gate('delete_record', {}, 'user'))             # 권한 없음: 차단",
      "note": "권한을 프롬프트에 위임하는 것이 대표 안티패턴 — 프롬프트는 확률적 준수일 뿐 강제가 아니다. 교재의 가이드처럼 두 미들웨어로 나눠, 노출 필터는 역할에 따라 모델에게 보이는 도구 자체를 제한하고 실행 게이트는 호출 시점에 상수(REFUND_CAP)와 분기 조건으로 재검증한다. 결정론으로 거를 수 없는 고위험 요청만 HITL(사람 승인)로 넘긴다."
    }
  ]
}
