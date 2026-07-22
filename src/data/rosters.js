// 담당 분반 명단 프리셋 — 자리배치표 사진 판독(2026-07-15 수령: 울산204.jpeg · 판교502_7분반.jpeg)
// 고유번호(U/P)는 자리배치표 기재 기준. 일부 성명은 가입 명단과 대조해 교정(가입 명단 대조 교정본).
// ⚠ 사진 판독본 — 평가 입력 시 성명 오탈자는 화면에서 바로 수정 가능.
// ⚠ 개인정보 보호: 이름은 가운데 글자 마스킹(예: 홍길동→홍*동)으로 보관한다.
//    이 파일은 관리자 화면 전용이지만 공개 JS 번들에 컴파일되어 외부 추출이
//    가능하므로, 실명 전체를 넣지 않는다. 전체 성명이 필요한 평가는 Supabase
//    kdt_profiles(가입 실명, RLS 관리자 전용) 또는 대표 수령 평가표로 한다.
//    → 되돌려 실명으로 채우지 말 것.

export const ROSTERS = {
  us4: {
    label: '울산 4반 (204호)',
    track: 'us',
    class_no: 4,
    manager: '신*화 매니저',
    // team = 조 편성(1~6조) — 수업 결과 평가표(2026-07-16 대표 수령분) 기준, 명단 31명 완전 일치 확인
    students: [
      { no: 'U109', name: '강*수', team: 1 }, { no: 'U110', name: '김*홍', team: 4 }, { no: 'U111', name: '김*은', team: 1 },
      { no: 'U112', name: '김*령', team: 5 }, { no: 'U113', name: '김*수', team: 2 }, { no: 'U114', name: '김*수', team: 3 },
      { no: 'U115', name: '박*웅', team: 2 }, { no: 'U116', name: '박*제', team: 4 }, { no: 'U117', name: '박*우', team: 1 },
      { no: 'U118', name: '박*윤', team: 5 }, { no: 'U119', name: '박*준', team: 6 }, { no: 'U120', name: '배*환', team: 2 },
      { no: 'U121', name: '배*빈', team: 2 }, { no: 'U122', name: '성*원', team: 1 }, { no: 'U123', name: '손*락', team: 1 },
      { no: 'U124', name: '손*경', team: 4 }, { no: 'U125', name: '신*영', team: 6 }, { no: 'U126', name: '신*수', team: 5 },
      { no: 'U127', name: '심*', team: 3 }, { no: 'U128', name: '윤*균', team: 5 }, { no: 'U129', name: '이*민', team: 6 },
      { no: 'U130', name: '이*현', team: 4 }, { no: 'U131', name: '이*인', team: 4 }, { no: 'U132', name: '이*우', team: 3 },
      { no: 'U133', name: '이*목', team: 6 }, { no: 'U134', name: '장*훈', team: 3 }, { no: 'U135', name: '정*욱', team: 2 },
      { no: 'U136', name: '정*지', team: 2 }, { no: 'U137', name: '정*윤', team: 3 }, { no: 'U138', name: '한*진', team: 5 },
      { no: 'U139', name: '허*원', team: 6 },
      // 추가 등록 2명(2026-07-16 대표 지시) — 가나다순 뒤에 붙임(고유번호 순서 유지)
      { no: 'U140', name: '백*혁', team: 3 }, { no: 'U141', name: '안*준', team: 6 },
    ],
  },
  p5_7: {
    label: '판교 5층 7반 (502호)',
    track: 'p5',
    class_no: 7,
    manager: '유*욱 매니저',
    // team = 조 편성(1~6조) — 판교502_7분반.jpeg 자리배치표 판독(2026-07-16), 1~5조 각 6명 · 6조 4명(+유*욱 매니저)
    students: [
      { no: 'P209', name: '곽*규', team: 4 }, { no: 'P210', name: '김*현', team: 6 }, { no: 'P211', name: '김*현', team: 2 },
      { no: 'P212', name: '김*현', team: 1 }, { no: 'P213', name: '김*정', team: 3 }, { no: 'P214', name: '문*록', team: 1 },
      { no: 'P215', name: '박*연', team: 2 }, { no: 'P216', name: '박*준', team: 2 }, { no: 'P217', name: '박*연', team: 6 },
      { no: 'P218', name: '박*빈', team: 5 }, { no: 'P219', name: '박*준', team: 5 }, { no: 'P220', name: '백*현', team: 1 },
      { no: 'P221', name: '백*철', team: 2 }, { no: 'P222', name: '신*영', team: 5 }, { no: 'P223', name: '윤*은', team: 3 },
      { no: 'P224', name: '윤*수', team: 1 }, { no: 'P225', name: '이*형', team: 2 }, { no: 'P226', name: '이*혁', team: 4 },
      { no: 'P227', name: '이*영', team: 4 }, { no: 'P228', name: '이*석', team: 3 }, { no: 'P229', name: '이*원', team: 5 },
      { no: 'P230', name: '이*정', team: 4 }, { no: 'P231', name: '임*리', team: 6 }, { no: 'P232', name: '임*현', team: 6 },
      { no: 'P233', name: '전*진', team: 5 }, { no: 'P234', name: '전*찬', team: 2 }, { no: 'P235', name: '정*우', team: 3 },
      { no: 'P236', name: '정*주', team: 4 }, { no: 'P237', name: '정*륜', team: 1 }, { no: 'P238', name: '주*수', team: 5 },
      { no: 'P239', name: '최*원', team: 3 }, { no: 'P240', name: '현*찬', team: 4 }, { no: 'P241', name: '현*혁', team: 1 },
      { no: 'P242', name: '홍*정', team: 3 },
    ],
  },
}
