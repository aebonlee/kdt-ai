# 📂 reference — 참고자료 업로드 폴더

대표님이 커리큘럼 작성에 참고할 **엑셀 파일**과 **이미지**를 여기에 올려주세요.
이 폴더의 자료를 기준으로 `src/data/curriculum.js` 의 실제 과목·일자·학습내용을 채웁니다.

## 폴더 구조

| 폴더 | 용도 |
|------|------|
| `reference/excel/` | 일정표·커리큘럼 엑셀(.xlsx, .csv) |
| `reference/images/` | 시간표 캡처, 과정 안내 이미지 등 |

## 업로드 방법 (택1)

**① GitHub 웹에서 (가장 간단)**
1. 깃허브 저장소 → `reference/excel` 또는 `reference/images` 폴더 진입
2. `Add file` → `Upload files` 클릭
3. 파일을 끌어다 놓고 `Commit changes`

**② 로컬에서**
```bash
cp ~/내려받은/일정표.xlsx ~/dev/skala/reference/excel/
git -C ~/dev/skala add reference && git -C ~/dev/skala commit -m "참고자료 추가" && git -C ~/dev/skala push
```

> 자료를 올리신 뒤 알려주시면 해당 내용으로 커리큘럼 데이터를 채워 드립니다.
