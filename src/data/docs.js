// ─────────────────────────────────────────────────────────────
// 관리자 전용 강의자료 카탈로그 (구글드라이브 연동)
//
// ⚠️ 이 목록은 파일 "링크"만 담습니다. 실제 파일 원본은 리포에 없고
//    구글드라이브(비공개)에 있습니다. 드라이브 접근 권한(구글 로그인)이
//    없으면 preview/다운로드가 열리지 않습니다 → 관리자 UI 게이트와
//    구글 권한이 함께 이중으로 보호합니다.
//
// 원본 폴더: SKALA 4기 실습교수 자료 (docs)
//   https://drive.google.com/drive/folders/1bzElDI2zY-2qGQpE6vamqEg7KLRO4qn5
//
// 파일 열람 URL 규칙:
//   미리보기(iframe): https://drive.google.com/file/d/{id}/preview
//   새 탭 보기       : https://drive.google.com/file/d/{id}/view
// ─────────────────────────────────────────────────────────────

export const DOCS_ROOT_FOLDER =
  'https://drive.google.com/drive/folders/1bzElDI2zY-2qGQpE6vamqEg7KLRO4qn5'

// t: 표시 이름, id: 드라이브 파일ID, x: 확장자, b: 바이트
export const docsGroups = [
  {
    id: 'ori',
    title: '오리엔테이션 · 커리큘럼',
    desc: '실습교수 OT 자료와 4기 전체 커리큘럼표',
    folder: DOCS_ROOT_FOLDER,
    files: [
      { t: 'SKALA 4기 실습교수 Orientation', id: '19MR3VcYmY4zDkFWrTd11ddPZeKfTI7ak', x: 'pdf', b: 4996755, d: '2026-06-30' },
      { t: '(0602 수정) 4기 커리큘럼 — AI캠퍼스·K-뉴딜', id: '1TC2rhbrQhbPEVjaHkQfy2IdBZfGBzCQU', x: 'xlsx', b: 36050, d: '2026-06-30' },
    ],
  },
  {
    id: 'syllabus',
    title: '0. Syllabus — 4기 과목별 강의계획서',
    desc: '4기 전 과목 실라버스(강사별 버전 포함)',
    folder: 'https://drive.google.com/drive/folders/1YkucWshAG8i808g6h34L3Q5wsw2TKIyr',
    files: [
      { t: '1)Full-stack_1. Git 이해활용 (강병호)', id: '1qty5D0sddPK-6UutRfAWXQaN812khfUi', x: 'pptx', b: 46037, d: '2026-06-21' },
      { t: '1)Full-stack_2. HTML·CSS·JavaScript (강병호)', id: '1EbGFz3P5yYS_SlPuXGGku-vCoVqmDGDZ', x: 'pptx', b: 42695, d: '2026-06-21' },
      { t: '1)Full-stack_2. HTML·CSS·JavaScript (정윤석)', id: '1plYCGmzTd2xqawne-flrSL8DrkPIdTre', x: 'pptx', b: 38905, d: '2026-06-18' },
      { t: '1)Full-stack_3. Frontend Vue.js (강병호)', id: '1mYKBlzsk5Nl1_V200-yIRho7STwCPyK2', x: 'pptx', b: 60502, d: '2026-06-29' },
      { t: '1)Full-stack_4. 스마트 데이터 이해·활용 (백정열)', id: '1AzyJhYbKUjNydXQtQMjpotCULxJA2xGN', x: 'pptx', b: 174242, d: '2026-06-14' },
      { t: '1)Full-stack_5. Java·SpringBoot·Rest API (이용우)', id: '164anpSmxr_Ru1P3SfKfb1d7Jjsk4hqlu', x: 'pptx', b: 48475, d: '2026-06-19' },
      { t: '1)Full-stack_5. Java·SpringBoot·Rest API (임성열)', id: '16kWLBZGt1sdGIlhfu3_lK6gMa-2_bTsM', x: 'pptx', b: 88315, d: '2026-06-22' },
      { t: '1)Full-stack_5. Java·SpringBoot·Rest API (정윤석)', id: '1JsjPgujFhvvyJNgptemq264FDDRAAtTF', x: 'pptx', b: 49957, d: '2026-06-18' },
      { t: '1)Full-stack_6. Spring AI (이용우)', id: '101or7g_6R0bEYoUPJ3PVW5ORpEP1fggt', x: 'pptx', b: 38161, d: '2026-06-15' },
      { t: '1)Full-stack_6. Spring AI (정윤석)', id: '17O39TDmOcHcGCUOccOUWCyMfDm47ZNMp', x: 'pptx', b: 39449, d: '2026-06-18' },
      { t: '2)데이터·AIOps_1. Python 이해 (백정열) 신규', id: '1AHd_0tGkdQ2ZqDIVPkOwlQoHzNUxwtRZ', x: 'pptx', b: 169740, d: '2026-06-21' },
      { t: '2)데이터·AIOps_2+5. 데이터 분석 (박병선+이은호+배기주)', id: '1NN8kqXgz5m7WF38b8uvJ9mAgp_HI4dRD', x: 'pptx', b: 192869, d: '2026-06-20' },
      { t: '2)데이터·AIOps_6. 모델 서빙·AIOps 구성 (임성열)', id: '1PTJMRpWu-0lv0OgrO2LJ1U9VlUIji140', x: 'pptx', b: 171317, d: '2026-06-14' },
      { t: '2)데이터·AIOps_7. 데이터분석 mini (배기주)', id: '1xDEVHUikWfnyyOMiAGyA7SwstgJvLqRU', x: 'pptx', b: 159600, d: '2026-06-14' },
      { t: '3)Cloud_1. Agile 방법론·MSA 개발 (임성열)', id: '1xzhuz_sAO4K7XGmxg4GC1f75iOOsc51z', x: 'pptx', b: 164997, d: '2026-06-14' },
      { t: '3)Cloud_2. 컨테이너 이해·컨테이너화 (이용우)', id: '1dZrqW3YhyqR9t1mbO0ASeJ7x8e_ccrMN', x: 'pptx', b: 33287, d: '2026-06-15' },
      { t: '3)Cloud_2. 컨테이너 이해·컨테이너화 (정윤석)', id: '1Hz5btFZGiDqNkh1vsm0nwFdiu28Kk7fd', x: 'pptx', b: 34254, d: '2026-06-17' },
      { t: '3)Cloud_3. 쿠버네티스 이해·배포 (이용우)', id: '1NiQdDlArWziag_dXzhUdo5O0fzn97U7p', x: 'pptx', b: 33072, d: '2026-06-15' },
      { t: '3)Cloud_3. 쿠버네티스 이해·배포 (정윤석)', id: '12ZVR3iP0B8XKx3khopKRH6oqzjwqEudK', x: 'pptx', b: 34533, d: '2026-06-17' },
      { t: '3)Cloud_4. 쿠버네티스 실무 심화 (이용우)', id: '1eSHAYhhnK-7jQE7-Iag8KBNIqMSsDzpq', x: 'pptx', b: 38282, d: '2026-06-15' },
      { t: '3)Cloud_4. 쿠버네티스 실무 심화 (정윤석)', id: '1c-MjU3igHWUzJFG2wyLSzlSUv7b5pfWZ', x: 'pptx', b: 39740, d: '2026-06-17' },
      { t: '3)Cloud_5. DevOps 이해·활용 (이용우)', id: '1bm81GnjGFUeMewgZgkUl6SAnhoHwkEB1', x: 'pptx', b: 33163, d: '2026-06-15' },
      { t: '3)Cloud_5. DevOps 이해·활용 (정윤석)', id: '1-MsKXcHUih0uvfW3JMJbspOgmsBYcRga', x: 'pptx', b: 33854, d: '2026-06-18' },
      { t: '4)생성형AI_1. Prompt 설계·Context Engineering (박병선·임성열·최진철)', id: '16veirUP2DksUPiXCrmo1rRI3almwEZEo', x: 'pptx', b: 159283, d: '2026-06-20' },
      { t: '4)생성형AI_2. LLM·Transformer 아키텍처 (임성열·박병선·권기창)', id: '17jiWF_aSzN_svv8jaqoD7JZ1q0MaLhbj', x: 'pptx', b: 66579, d: '2026-06-14' },
      { t: '4)생성형AI_3. sLLM 구현·Fine Tuning (임성열)', id: '1Mbeb37S_kR7eb8t0AVS8V6WbHUPwpC2_', x: 'pptx', b: 164414, d: '2026-06-14' },
      { t: '4)생성형AI_4. VectorDB 수정 (백정열)', id: '1GUzgRrUPkBd5de5cqTBC4TmB3VtnN9n7', x: 'pptx', b: 159431, d: '2026-06-14' },
      { t: '4)생성형AI_5. LangChain 서비스 개발 (임성열)', id: '1Zo0lAJFG6Z1Lug2oOpgJaMedgOxj-ntu', x: 'pptx', b: 171172, d: '2026-06-14' },
      { t: '4)생성형AI_6. RAG Pipeline 설계·구축 (배기주·권기창·박병선)', id: '1Xcmeq3kQqSSzA5OUj97XAgOt9smDQ-_z', x: 'pptx', b: 165252, d: '2026-06-14' },
      { t: '4)생성형AI_7. AI Agent 설계·구축 (배기주·권기창)', id: '13LV1LI10-i4YGzFVpj4v6EgIpFB39kxd', x: 'pptx', b: 159819, d: '2026-06-14' },
      { t: '4)생성형AI_8. AI Agent Capstone (배기주·정윤석)', id: '1QBn_OjTcZ5wI23HeVdOYV5EMhSFFRLx4', x: 'pptx', b: 164627, d: '2026-06-14' },
      { t: '4)생성형AI_9. AI Service mini (배기주)', id: '1IAPxm0DyJ7F7XA2GCezclbyNBZYKjB_-', x: 'pptx', b: 159809, d: '2026-06-14' },
      { t: '5)개발·관리방법론 — AI프로젝트 방법론 (백정열)', id: '18gP2ONJbr0RY2S8XPFWv6W2AiGXGhdOt', x: 'pptx', b: 60814, d: '2026-06-14' },
      { t: 'Mini-project ① AI 웹 서비스 설계', id: '14ZSfgiOKN0R_mC6bQmT1hxN8TAUcJA10', x: 'pptx', b: 58836, d: '2026-06-15' },
      { t: '[Back-up] 4)생성형AI_4. VectorDB 기존 (백정열)', id: '1i6ad2NCcKfJY4fVe4gIHUpccF1ZPcAWd', x: 'pptx', b: 65675 },
    ],
  },
  {
    id: 'practice',
    title: '5. 종합실습교재 (실습교수용)',
    desc: '실습교수용 종합실습 가이드',
    folder: 'https://drive.google.com/drive/folders/1Ixk8v-ssKkqz4468WrLGUJMPgqrzyDTG',
    files: [
      { t: '2)AIOps — Python 이해 종합실습 가이드 v0.1', id: '1C_TrN50squtlHFm0E2YRJzblhRPLQeDy', x: 'pdf', b: 2399782, d: '2026-07-01' },
      { t: 'DB — 스마트 데이터 이해·활용 종합실습 가이드', id: '1EYA1xSvUt-eXmmcnFJH3XVMKW79_Uv9G', x: 'pdf', b: 2565392, d: '2026-07-01' },
      { t: '4)생성형AI — Vector DB 종합실습 가이드', id: '11kpcwIu3zPcddfJP33a5hResHYFu7Hkv', x: 'pdf', b: 2116368, d: '2026-07-01' },
      { t: 'Mini-project ① AI 웹서비스 설계 가이드', id: '1KPn9SgTM1Y8Zo7n-6OB4am-_bkX2HncM', x: 'pdf', b: 717721, d: '2026-07-01' },
    ],
  },
  {
    id: 'gen3',
    title: '[공유] 3기 교재 (실습교수)',
    desc: '직전 기수(3기) 교재 아카이브 — 과목 참고용',
    folder: 'https://drive.google.com/drive/folders/19pqlijMoNw25qJ8Fs6PjgvmXf6iqVPlK',
    files: [
      { t: '0. 교육환경·개발환경설정 (Git·AI코딩 맛보기) (정윤석)', id: '1uXAPdcHJyvQVroiU-bgYZoL5wlLv5eHc', x: 'pdf', b: 2601992, d: '2026-06-23' },
      { t: '0. 교육환경 260106', id: '1Sekek2kuYmfOvfa9LG42RYM0_3QQMKRc', x: 'pdf', b: 2568704, d: '2026-06-23' },
      { t: '1. 기초(DB)_1. Vector DB 2일 과정 (백정열)', id: '177iMlyMb0wyYh-72sVYPMvz1TtyM91PT', x: 'pdf', b: 13073575, d: '2026-06-23' },
      { t: '1. 기초(DB)_1. 데이터 모델링·SQL 기초 (백정열)', id: '1fokkJvBjqasIP7UQ5T2CJkAJpPfP8VCU', x: 'pdf', b: 13052171, d: '2026-06-23' },
      { t: '1. 기초(DB)_1. 데이터 모델링·SQL 기초 수정 (임성열)', id: '1TCwPDvBB7gyZqlgGlicEFG6del2D-0TM', x: 'pdf', b: 40029610, d: '2026-06-23' },
      { t: '1. 기초(DB)_2. DBMS·SQL 활용 (백정열)', id: '1c3hW7aHBYAiYZLCslRhtL_lcwR2R87Br', x: 'pdf', b: 9515749, d: '2026-06-25' },
      { t: '1. 기초(DB)_2. DBMS·SQL 활용 260222', id: '1UA0QtUnsRY4h2SVKt6T2O981SjjnLKG8', x: 'pdf', b: 8074464, d: '2026-06-23' },
      { t: '1. 기초_1. HTML 260112 (정윤석)', id: '1o1EpSyXZ2zjCaS7z5kFg2dE48GAw4hFK', x: 'pdf', b: 3696182, d: '2026-06-23' },
      { t: '1. 기초_2. CSS 260112 (정윤석)', id: '1layHVeaG_bCaJQ-R_TxcltN5X79RPh-n', x: 'pdf', b: 7747174, d: '2026-06-23' },
      { t: '1. 기초_2. HTML', id: '1EZ1X9inlWS3VnwKW91UAI0vGKdSj-o6f', x: 'pdf', b: 2486674, d: '2026-06-23' },
      { t: '1. 기초_3. Javascript 260112 (정윤석)', id: '1ZZ69DSNdKDM6UN_gVkQ7DI_f7UanJPee', x: 'pdf', b: 7923031, d: '2026-06-23' },
      { t: '1. 기초_4. Front-end Vue.js 260202 (정윤석)', id: '1m5YhOQ__b4kJumhWDG50eqqY-hjZbS-1', x: 'pdf', b: 4972805, d: '2026-06-23' },
      { t: '2. 데이터분석&MLOps_1. Python (백정열)', id: '1h0rcvN94JI1uTq7pqB--2k74HAGVOXSq', x: 'pdf', b: 15117609, d: '2026-06-23' },
      { t: '2. 데이터분석&MLOps_2. 데이터 분석 개요·기초통계 (배기주)', id: '1HZqPJrNtmu_oWRismOQbZxJbZtuiJrfG', x: 'pdf', b: 5939634, d: '2026-01-12' },
      { t: '2. 데이터분석&MLOps_3. 머신러닝·딥러닝 이해 (배기주)', id: '1Fch_c3CV5dr5PQdbRVa_XvGTqts3z4XC', x: 'zip', b: 14213458, d: '2026-06-24' },
      { t: '2. 데이터분석&MLOps_4. 모델개발·최적화 day1', id: '1cUtCOdcL7Jr0NYTo4bTJpaeBtdtCrtQ2', x: 'pdf', b: 6140746, d: '2026-06-23' },
      { t: '2. 데이터분석&MLOps_4. 모델개발·최적화 day2', id: '1NwS-h36ImXSQMASbs9frf5BjV7Bf6Hve', x: 'pdf', b: 6220251, d: '2026-06-23' },
      { t: '2. 데이터분석&MLOps_5. 데이터분석 미니프로젝트', id: '1FfK-eyQGyWiIsjXAOIkhx6jkMKrz2JPI', x: 'pdf', b: 4019531, d: '2026-06-23' },
      { t: '2. 데이터분석&MLOps_6. 모델 서빙·MLOps 구성 수정 (임성열)', id: '1wpxrzRY8KKgfigtf1gpR1tuRyJUbGwRS', x: 'pdf', b: 15648048, d: '2026-06-23' },
      { t: '2. 데이터분석&MLOps — Fast API 백엔드 구축 수정 3기 (임성열)', id: '1mQGSrKvhooeh7FO-fEFOIbFOqr1mm-Zn', x: 'pdf', b: 9344776, d: '2026-06-23' },
      { t: '3. Cloud_1. DevOps 이해·활용 260318 (정윤석)', id: '1khT5aekfFtIMqFaa2VbnWzLnSKkoF3Z3', x: 'pdf', b: 9952260, d: '2026-06-23' },
      { t: '3. Cloud_1. DevOps 이해·활용 2603_2 (이용우)', id: '14GuDcUKkGIBw_MkCWXJI0OoswETU6sfg', x: 'pdf', b: 10335642, d: '2026-06-23' },
      { t: '3. Cloud — 컨테이너 이해 #1 260311 (정윤석)', id: '1BOe8AqaVaw0XTOZt5DhPD5XUVbRclN7I', x: 'pdf', b: 6913817, d: '2026-06-23' },
      { t: '3. Cloud — 컨테이너 이해 #2 260311 (정윤석)', id: '1SQUDOcFQuQtU1KMzvsst29_xthK4ejOU', x: 'pdf', b: 15948611, d: '2026-06-23' },
      { t: '3. Cloud — 컨테이너 이해 1권 (개요) v1.1 (이용우)', id: '1GmFX7jp1jGKxdbkkETNxKWs9x5VTIHIs', x: 'pdf', b: 27575640, d: '2026-06-23' },
      { t: '3. Cloud — 컨테이너 이해 2권 v1.1 (이용우)', id: '1j7USn9QoxhPH4dLjwIkMimwTAqOLrgrq', x: 'pdf', b: 24877705, d: '2026-06-23' },
      { t: '3. Cloud — 컨테이너 이해 3권 (실습) v1.0 (이용우)', id: '11dZh5xU2nmQAztmizkxyr72ZmP_9sXs7', x: 'pdf', b: 6648346, d: '2026-06-23' },
      { t: '3. Cloud — 쿠버네티스 이해 #1 260325 (정윤석)', id: '1zeEZ2M5snUnNingXcUikds6ubsKFvmEx', x: 'pdf', b: 14830114, d: '2026-06-23' },
      { t: '3. Cloud — 쿠버네티스 이해 #2 260325 (정윤석)', id: '1kBLWoltcgrUd2JJqt84xMJzmXJjbnGHt', x: 'pdf', b: 21248624, d: '2026-06-23' },
      { t: '3. Cloud — 쿠버네티스 이해 1권 v1.1 (이용우)', id: '1yBnbB-IB4gEGL3S_OgpYFmTLvNyiTsQX', x: 'pdf', b: 22336887, d: '2026-06-23' },
      { t: '3. Cloud — 쿠버네티스 이해 2권 v1.0 (이용우)', id: '13kD21zMB3om5KYMWXP4Q80Pbhs1ritZr', x: 'pdf', b: 29295078, d: '2026-06-23' },
      { t: '4. 생성형AI_1. 생성형AI 기초·Prompt Engineering (배기주)', id: '1fkKMdHBzS38x1KopTx7rSFw91qYSuktI', x: 'pdf', b: 12826290, d: '2026-06-24' },
      { t: '4. 생성형AI_1. 생성형AI 기초·Prompt Engineering', id: '1-ZbaTn1jh6An5z7_s42DmDh0G1nmPpgY', x: 'pdf', b: 16993836, d: '2026-06-23' },
      { t: '4. 생성형AI_1. 생성형AI 기초·Prompt Engineering 260121 (박병선)', id: '1G5RM5eJNyNfI4V249c4IyKFYaa42WuOo', x: 'pdf', b: 12618202, d: '2026-06-23' },
      { t: '4. 생성형AI_2. LLM모델 이해·활용 (임성열)', id: '1OpSpaXk3YcpDj7sAedzddAdsEJyyuF9o', x: 'pdf', b: 21229035, d: '2026-06-23' },
      { t: '4. 생성형AI_2. LLM모델 이해·활용 day1 260128 (박병선)', id: '1LG-2nN6hOgKnwW_UFY6mJAbHMsxT2TyF', x: 'pdf', b: 6384883, d: '2026-06-23' },
      { t: '4. 생성형AI_2. LLM모델 이해·활용 day2 260128 (박병선)', id: '12Mb48rTwGWlL5VC3OZW4ZtItlHPaEU-J', x: 'pdf', b: 6062354, d: '2026-06-23' },
      { t: '4. 생성형AI_3. Vector DB 1일 과정 260211 (백정열)', id: '17HdOcwMnxrKLHkcpa_0pN4rmuH_mQ40b', x: 'pdf', b: 12891570, d: '2026-06-25' },
      { t: '4. 생성형AI_3. 생성형AI 서비스개발의 이해 2603', id: '1Z2x_gQ6gAYA4FDyYDTLOcjQhlcVP4wJ6', x: 'pdf', b: 13624613, d: '2026-06-23' },
      { t: '4. 생성형AI_4. RAG Pipeline 설계·구축 (배기주)', id: '1zfwmqKGYffs-9hzcVGG04RAv99wETQPG', x: 'pdf', b: 9367879, d: '2026-06-24' },
      { t: '4. 생성형AI_4. RAG Pipeline day1 Naive RAG', id: '1gF4yUGeL5xrC9Poc4LbABaxecyVpZk5j', x: 'pdf', b: 10428364, d: '2026-06-23' },
      { t: '4. 생성형AI_4. RAG Pipeline day2 Advance', id: '10birDg0BobIxzzx9Nlkaz6JrZn1MqJph', x: 'pdf', b: 7551732, d: '2026-06-23' },
      { t: '4. 생성형AI_4. RAG Pipeline day3 Orchestration', id: '1FrwooeNcZctNEOp5X-kVGZ3Y9O_6BFVU', x: 'pdf', b: 9362813, d: '2026-06-23' },
      { t: '4. 생성형AI_4. 생성형AI 서비스개발의 이해 260304 (임성열)', id: '1iJrQlGW8-5jU9GMMRF5JIUrnJpyYy4ib', x: 'pdf', b: 28450744, d: '2026-06-23' },
      { t: '4. 생성형AI_5. VectorDB (배기주)', id: '1HLgxxnBsmyi0l68oKElQErIr8ytq-lBs', x: 'pdf', b: 3659320, d: '2026-06-24' },
      { t: '4. 생성형AI_6. AI Agent 설계·구축 (배기주)', id: '1NjB3amTPGgf1OJ39miPNbsJlMq0rVTTb', x: 'pdf', b: 9067801, d: '2026-06-24' },
      { t: '5. 프로젝트 관리 — AI 프로젝트 방법론·최신 Trend (백정열)', id: '10Mqd--jPF5dbsj9yWsP6WSfk5ULvIvJC', x: 'pdf', b: 8669855, d: '2026-06-25' },
    ],
  },
  {
    id: 'eval',
    title: '실습평가 양식 (종합)',
    desc: 'SKALA 4기 종합실습 평가표(과목별)',
    folder: 'https://drive.google.com/drive/folders/1JLa-G0xD9DVg8CPZYMBFNS3PqoEDqxWa',
    files: [
      { t: '종합실습 평가 — 기초통계 (배기주)', id: '1xQJxLZXHQ_GjrheleGudEy_SVHt4DPBp', x: 'xlsx', b: 69579, d: '2026-06-23' },
      { t: '종합실습 평가 — Feature Engineering (배기주)', id: '1cKlEwH739_vLa3wlqj6VZS8HHl43N-jN', x: 'xlsx', b: 69564, d: '2026-06-23' },
      { t: '종합실습 평가 — ML·DL (배기주)', id: '1JF3k6TLDAX-L1sjB4KxpDjdtE4bWd46k', x: 'xlsx', b: 69686, d: '2026-06-23' },
      { t: '종합실습 평가 — 데이터분석 mini (배기주)', id: '1iTSPCmXW2px69iOzSadtAxs-R55ZEkfx', x: 'xlsx', b: 69804, d: '2026-06-23' },
      { t: '종합실습 평가 — RAG (배기주)', id: '1YUAl-TMn9Q9Q8Fs7X5o22yDoTc-5HK4v', x: 'xlsx', b: 70400, d: '2026-06-23' },
      { t: '종합실습 평가 — AI Agent (배기주)', id: '1IelkVrle-YqX4uwHgYS_ZPIR1mZ3crqi', x: 'xlsx', b: 70480, d: '2026-06-23' },
      { t: '종합실습 평가 — AI Agent Capstone (배기주)', id: '1pcSVSm_vjRrMLHAN0sUtd_YPNt0nLylM', x: 'xlsx', b: 69709, d: '2026-06-23' },
      { t: '종합실습 평가 — AI서비스 mini (배기주)', id: '1bizxLW4V1pTp1wLDyMs1qNQTWkBMcaRP', x: 'xlsx', b: 70512, d: '2026-06-23' },
      { t: '종합실습 평가 (표준안) — 과목명·교수진 성명', id: '13xfM2f_ObyxInLm4udd4JcRFqgY_e4P9', x: 'xlsx', b: 66818, d: '2026-06-10' },
    ],
  },
]

// 파일 열람/다운로드 URL 헬퍼
export const drivePreview = (id) => `https://drive.google.com/file/d/${id}/preview`
export const driveView = (id) => `https://drive.google.com/file/d/${id}/view`
export const driveDownload = (id) => `https://drive.google.com/uc?export=download&id=${id}`

export const docsTotalCount = docsGroups.reduce((n, g) => n + g.files.length, 0)
