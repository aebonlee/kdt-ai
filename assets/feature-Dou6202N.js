const n={"feature-1":{plan:{schedule:[{time:"09:00–09:50",topic:'1교시 피처 엔지니어링이란? 모델 성능을 좌우하는 "재료 손질"'},{time:"10:00–10:50",topic:"2교시 데이터 둘러보기: 결측치·이상치 진단 실습"},{time:"11:00–11:50",topic:"3교시 [실습] 스케일링·정규화로 숫자 크기 맞추기"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 범주형 인코딩: 원-핫·라벨·타깃 인코딩"},{time:"14:00–14:50",topic:"5교시 [실습] 수치·날짜·텍스트 파생 피처 만들기"},{time:"15:00–15:50",topic:"6교시 피처 선택과 차원 축소(중요도·상관·PCA)"},{time:"16:00–16:50",topic:"7교시 [실습] 피처 엔지니어링 전후 성능 비교"},{time:"17:00–17:50",topic:"8교시 정리·코드 리뷰·미니 회고"}],practice:{title:"타이타닉 데이터로 피처 엔지니어링 전/후 모델 성능 비교하기",steps:["Colab(또는 Jupyter)을 새 노트북으로 열고 첫 셀에 `import pandas as pd, numpy as np` 를 입력해 실행한다.","`df = pd.read_csv('https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv')` 로 데이터를 불러오고 `df.head()` 로 표가 보이는지 확인한다(맨 위 5줄이 출력되면 성공).","`df.isnull().sum()` 을 실행해 어떤 열에 빈 값이 몇 개인지 센다(Age·Cabin 등에 결측치 숫자가 나온다).","`df['Age'] = df['Age'].fillna(df['Age'].median())` 로 나이 빈 값을 중앙값으로 채운다.","성별을 숫자로 바꾸기 위해 `df['Sex'] = df['Sex'].map({'male':0,'female':1})` 를 실행한다.","승선항 Embarked 를 원-핫 인코딩한다: `df = pd.get_dummies(df, columns=['Embarked'], drop_first=True)`.","새 파생 피처를 만든다: `df['FamilySize'] = df['SibSp'] + df['Parch'] + 1` (동승 가족 수).","기본 피처(Pclass·Sex·Age)만 쓴 모델과, 가공 피처를 추가한 모델을 각각 LogisticRegression 으로 학습해 `accuracy_score` 를 출력한다.",'두 정확도를 화면에 나란히 출력해 "가공 후 점수가 더 높음"을 눈으로 확인한다(예: 0.78 → 0.82).',"마지막으로 `df.to_csv('titanic_features.csv', index=False)` 로 가공된 데이터를 저장한다."],deliverable:"피처 가공 전/후 정확도를 비교 출력한 노트북(.ipynb)과 가공 데이터 titanic_features.csv"}},examples:[{title:"결측치를 중앙값으로 채우기",lang:"python",code:`import pandas as pd  # 데이터 표를 다루는 라이브러리
import numpy as np   # 빈 값(NaN) 표현에 사용

# 나이 일부가 비어 있는 작은 표 만들기
df = pd.DataFrame({'age': [20, np.nan, 35, np.nan, 50]})

# 중앙값(가운데 값)을 구해 빈 칸을 채움 (평균보다 이상치에 강함)
df['age'] = df['age'].fillna(df['age'].median())

print(df['age'].tolist())  # 결과: [20.0, 35.0, 35.0, 35.0, 50.0]`,note:"median(중앙값)은 튀는 값에 덜 흔들려 결측치 채우기에 안전하다."},{title:"범주형을 원-핫 인코딩으로 바꾸기",lang:"python",code:`import pandas as pd  # 데이터 처리 라이브러리

# 색깔이라는 글자 범주가 든 표
df = pd.DataFrame({'color': ['red', 'blue', 'red', 'green']})

# get_dummies: 각 색깔마다 0/1 칸을 자동 생성
onehot = pd.get_dummies(df['color'])

print(onehot.columns.tolist())  # 결과: ['blue', 'green', 'red']
print(onehot.iloc[0].tolist())  # 첫 행(red): [False, False, True]  (pandas 2.0+ 기본 dtype=bool)`,note:"순서 없는 범주는 원-핫으로 바꿔야 모델이 크기 오해를 하지 않는다."},{title:"날짜에서 파생 피처 뽑기",lang:"python",code:`import pandas as pd  # 날짜 처리에도 pandas 사용

# 문자열 날짜를 진짜 날짜형으로 변환
s = pd.to_datetime(['2026-06-30', '2026-12-25'])

# 날짜에서 '월'과 '요일' 같은 숨은 정보 추출
month = s.month        # 월 숫자
weekday = s.dayofweek  # 0=월요일 ... 6=일요일

print(month.tolist())    # 결과: [6, 12]
print(weekday.tolist())  # 결과: [1, 4]  (화요일, 금요일)`,note:"원본 날짜보다 월·요일 같은 파생 피처가 패턴을 더 잘 드러낸다."},{title:"누수 없이 스케일러는 학습 데이터에만 fit",lang:"python",code:`from sklearn.model_selection import train_test_split  # 데이터 분할
from sklearn.preprocessing import StandardScaler       # 표준화 스케일러
from sklearn.datasets import load_iris

X = load_iris().data
y = load_iris().target
# 먼저 학습/테스트로 나눈다
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

scaler = StandardScaler()
# 학습 데이터에만 fit(평균·표준편차 계산)하고 그대로 변환한다
X_train_scaled = scaler.fit_transform(X_train)
# 테스트는 fit 하지 않고, 학습에서 구한 기준으로 transform 만 한다
X_test_scaled = scaler.transform(X_test)
print(X_train_scaled.mean(axis=0).round(2))  # 결과: 0 근처(학습 데이터 평균이 0으로 정렬됨)
`,note:"테스트에도 fit 하면 테스트의 평균·표준편차가 학습에 새어 들어가 점수가 부풀려진다. transform 만 쓰는 것이 누수 방지의 핵심이다."},{title:"스케일러 3종 비교 - 이상치가 있을 때 무엇이 강한가",lang:"python",code:`import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

# 크기 범위가 제각각이고 '나이 200'이라는 이상치가 하나 섞인 예시 데이터
df = pd.DataFrame({
    '나이': [20, 25, 30, 35, 40, 200],          # 200은 잘못 입력된 이상치
    '연봉': [3000, 3500, 4200, 5000, 6000, 6200],  # 만원 단위, 나이와 크기 차이가 큼
})

# 세 가지 스케일러를 딕셔너리에 담아 한 번에 비교한다
scalers = {
    '표준화(Standard)': StandardScaler(),   # 평균 0, 표준편차 1 로 맞춤
    '0~1(MinMax)':     MinMaxScaler(),      # 최솟값 0, 최댓값 1 로 맞춤
    '강건(Robust)':    RobustScaler(),      # 중앙값·IQR 기준(이상치 영향이 작음)
}

for name, scaler in scalers.items():
    scaled = scaler.fit_transform(df)        # 학습(fit)+변환(transform)을 한 번에
    나이변환 = np.round(scaled[:, 0], 2)      # '나이' 열 결과만 소수 둘째자리로
    print(f'[{name}] 나이 -> {나이변환.tolist()}')

# 관찰 포인트:
# MinMax 는 이상치 200 때문에 나머지 정상 값들이 0 근처로 뭉쳐 버린다.
# Robust 는 중앙값·IQR 을 쓰므로 이상치에 가장 덜 흔들린다.`,note:"이상치가 의심되면 RobustScaler 가 안전하다. 데이터에 이상치가 거의 없고 0~1 범위가 필요하면 MinMax, 일반적인 경우엔 Standard 를 기본으로 쓴다."},{title:"범주형 인코딩 3종 비교 - 원-핫·순서형·타깃",lang:"python",code:`import pandas as pd
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder, TargetEncoder

df = pd.DataFrame({
    '색상': ['빨강', '파랑', '초록', '빨강', '파랑'],   # 순서 없는 소수 범주
    '등급': ['초급', '중급', '고급', '중급', '초급'],   # 순서가 의미 있는 범주
    '지역': ['서울', '부산', '대구', '서울', '광주'],   # 종류가 많아질 수 있는 범주
    '구매': [1, 0, 1, 1, 0],                          # 타깃(1=구매함)
})

# 1) 원-핫: 순서 없는 소수 범주 -> 항목마다 0/1 칸을 새로 만든다
oh = OneHotEncoder(sparse_output=False)
print('원-핫 컬럼:', oh.fit(df[['색상']]).get_feature_names_out().tolist())
print(oh.transform(df[['색상']]))

# 2) 순서형: 순서가 있는 범주 -> 정해 준 순서대로 0,1,2 를 매긴다
oe = OrdinalEncoder(categories=[['초급', '중급', '고급']])
print('순서형 등급 ->', oe.fit_transform(df[['등급']]).ravel().tolist())  # [0,1,2,1,0]

# 3) 타깃 인코딩: 범주 종류가 많을 때 -> 그 범주의 타깃 평균으로 치환
#    TargetEncoder 는 내부 교차적합으로 누수를 스스로 막아 준다
te = TargetEncoder(target_type='binary')
지역인코딩 = te.fit_transform(df[['지역']], df['구매'])
print('타깃 인코딩 지역 ->', 지역인코딩.ravel().round(2).tolist())`,note:"순서 없고 종류가 적으면 원-핫, 순서가 있으면 순서형, 종류가 폭발적으로 많으면 타깃 인코딩을 쓴다. 타깃 인코딩은 누수 위험이 커서 반드시 교차적합(TargetEncoder 기본 동작)을 거쳐야 한다."},{title:"수치·구간화·텍스트 파생 피처 한 번에 만들기",lang:"python",code:`import pandas as pd

df = pd.DataFrame({
    '가입일': pd.to_datetime(['2025-01-05', '2025-06-14', '2025-11-30']),
    '구매액': [12000, 45000, 8000],
    '방문횟수': [3, 9, 2],
    '리뷰': ['배송이 빨라요', '품질이 아주 좋고 만족합니다', '별로'],
})

# 1) 수치 조합·비율: 원본에 없던 관계를 나눗셈으로 만든다
df['방문당구매액'] = df['구매액'] / df['방문횟수']   # 방문 한 번당 얼마 썼나

# 2) 구간화(binning): 연속값을 소액/중간/고액 구간 범주로 묶는다
df['구매등급'] = pd.cut(df['구매액'],
                        bins=[0, 10000, 30000, 1_000_000],
                        labels=['소액', '중간', '고액'])

# 3) 날짜 파생: 월·요일·주말여부(앞 교시 날짜 파생을 확장)
df['가입월'] = df['가입일'].dt.month              # 1~12
df['주말가입'] = (df['가입일'].dt.dayofweek >= 5).astype(int)  # 토·일이면 1

# 4) 텍스트 파생: 글자수·단어수·키워드 포함 여부를 숫자 신호로
df['리뷰길이'] = df['리뷰'].str.len()                       # 글자 수
df['단어수'] = df['리뷰'].str.split().str.len()             # 공백 기준 단어 수
df['만족언급'] = df['리뷰'].str.contains('좋|만족|빨라').astype(int)  # 긍정 키워드 유무

print(df[['방문당구매액', '구매등급', '가입월', '주말가입', '단어수', '만족언급']])`,note:"파생 피처는 '왜 도움이 될지' 설명할 수 있어야 한다. 방문당구매액은 소비 밀도를, 만족언급은 리뷰 감정을 숫자로 대신 알려 주는 단서다."},{title:"피처 엔지니어링 전 vs 후 - 같은 모델로 성능 비교",lang:"python",code:`import pandas as pd
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier

# 타이타닉 데이터(생존 예측). 간단히 진행하려 일부 결측 행만 제거
url = 'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv'
df = pd.read_csv(url).dropna(subset=['Age', 'Embarked'])
y = df['Survived']  # 정답: 1=생존, 0=사망

# (A) 가공 전: 원본 숫자 피처만 그대로 사용
base_cols = ['Pclass', 'Age', 'SibSp', 'Parch', 'Fare']
X_before = df[base_cols]

# (B) 가공 후: 파생 피처 + 인코딩을 추가
X_after = X_before.copy()
X_after['가족수'] = df['SibSp'] + df['Parch'] + 1           # 파생: 함께 탄 가족 크기
X_after['혼자탑승'] = (X_after['가족수'] == 1).astype(int)   # 파생: 1인 탑승 여부
X_after['성별'] = (df['Sex'] == 'female').astype(int)        # 인코딩: 여성=1, 남성=0
X_after['요금구간'] = pd.qcut(df['Fare'], 4, labels=False)    # 파생: 요금 4분위 구간

# 같은 모델·같은 5겹 교차검증으로 공정하게 비교한다
model = RandomForestClassifier(random_state=42)
before = cross_val_score(model, X_before, y, cv=5).mean()
after  = cross_val_score(model, X_after,  y, cv=5).mean()

print(f'가공 전 정확도: {before:.3f}')   # 예: 0.71x
print(f'가공 후 정확도: {after:.3f}')    # 예: 0.80x
print(f'향상폭: {after - before:+.3f}')  # 파생·인코딩으로 오른 만큼`,note:"모델은 그대로 두고 피처만 바꿔 비교하는 것이 핵심이다. 성별 인코딩과 가족수 파생만으로도 점수가 눈에 띄게 오르는 것을 확인하면, '피처가 성능을 좌우한다'는 오늘의 메시지가 숫자로 증명된다."},{title:"치우친 분포는 로그변환 — 왜도(skew)로 확인하기",lang:"python",code:`# 오른쪽으로 치우친(right-skewed) 피처를 대칭에 가깝게 만들기
import numpy as np
import pandas as pd

# 소득처럼 소수의 큰 값이 꼬리를 만드는 데이터(50000 이 꼬리)
income = pd.Series([2000, 2200, 2500, 2600, 3000, 3200, 50000])

# 1) 왜도(skewness)로 치우친 정도를 숫자로 본다(0=대칭, 양수=오른쪽 꼬리)
print('변환 전 왜도:', round(income.skew(), 2))  # 큰 양수 -> 강하게 치우침

# 2) 로그변환: log1p(=log(1+x))로 큰 값을 압축해 꼬리를 줄인다
log_income = np.log1p(income)

# 3) 변환 후 왜도가 0 쪽으로 줄었는지 확인한다
print('변환 후 왜도:', round(log_income.skew(), 2))  # 0 에 가까워짐`,note:"교재의 로그/제곱근 변환: 회귀·t검정·ANOVA는 정규분포 가정을 두므로, 소득·조회수처럼 한쪽으로 치우친(멱함수형) 피처는 로그변환으로 대칭에 가깝게 만든 뒤 모델에 넣는다. skew()로 전후를 수치로 확인하는 습관이 핵심."},{title:"규칙 기반 파생변수 만들기 — 고객등급(조작적 정의)",lang:"python",code:`# 원천 데이터에 없던 새 항목을 비즈니스 규칙으로 정의하기
import pandas as pd

# 트랜잭션 원천 데이터: 고객별 구매 건수와 합계
df = pd.DataFrame({
    'customer': ['이OO', '홍OO', '김OO'],
    'buy_cnt':  [1, 2, 3],        # 구매 건수
    'total':    [200, 600, 400],  # 구매 합계(원)
})

# 규칙: 구매건수 >= 2 이고 합계 >= 500 이면 'A등급', 아니면 'B등급'
# (교재의 파생변수 예시 — 조작적 정의를 Rule 로 코드화)
df['grade'] = df.apply(
    lambda r: 'A' if (r['buy_cnt'] >= 2 and r['total'] >= 500) else 'B',
    axis=1,  # 행 단위로 규칙 적용
)
print(df[['customer', 'buy_cnt', 'total', 'grade']])

# 파생변수는 비즈니스 로직이 들어가므로 '어떤 근거로 만들었는지' 주석이 필수.
# 이렇게 만든 등급은 이후 원-핫/순서형 인코딩해 모델 피처로 쓴다.`,note:"교재의 파생변수 절(1차 데이터가 있는 경우: 매출액 합계, 없는 경우: 고객등급 A/B)을 그대로 실습화. 조작적 정의를 Rule로 옮기고 주석으로 근거를 남기는 것이 실무 파생변수의 핵심이라는 메시지."},{title:"상관계수로 피처 선택 — 타깃 관계와 다중공선성 함께 보기",lang:"python",code:`# 상관계수(=표준화된 공분산, -1~1)로 어떤 피처를 남길지 판단
import pandas as pd

df = pd.DataFrame({
    'area':  [10, 20, 30, 40, 50],  # 면적
    'rooms': [1, 2, 3, 4, 5],       # 방 개수(면적과 거의 같이 커짐)
    'age':   [20, 15, 10, 5, 1],    # 건물 연식
    'price': [1, 2, 3, 4, 5],       # 타깃: 가격
})

# 1) 상관계수 행렬(0이면 선형관계 없음, 공분산을 각 표준편차로 나눈 표준화값)
corr = df.corr(numeric_only=True)
print(corr.round(2))

# 2) 타깃(price)과 상관이 큰 피처를 확인(예측에 도움될 후보)
print('타깃 상관:', corr['price'].drop('price').round(2).to_dict())

# 3) 피처끼리 상관이 너무 높으면(예: area-rooms) 중복 -> 하나만 남긴다
#    회귀분석 전 독립변수 간 상관성이 높으면 다중공선성 문제가 생긴다
print('면적-방수 상관:', round(corr['area']['rooms'], 2), '=> 0.9 이상이면 제거 검토')`,note:'교재의 상관계수 절(표준화된 공분산, "회귀 전 독립변수 간 상관 높으면 중복 제거")을 피처 선택으로 연결. 상관은 선형관계만 보므로 산점도 병행이 필요하다는 교재 주의사항도 함께 가르칠 수 있는 예제.'}],concepts:[{term:"피처(Feature)",desc:"모델에게 답을 맞히라고 주는 입력 정보 한 칸씩을 말한다(예: 나이, 성별)."},{term:"피처 엔지니어링",desc:"있는 데이터를 다듬고 새로 조합해 모델이 더 잘 학습하도록 만드는 작업이다."},{term:"결측치(Missing Value)",desc:"값이 비어 있는 칸으로, 그대로 두면 모델이 학습을 못 하므로 채우거나 지워야 한다."},{term:"이상치(Outlier)",desc:"다른 값들과 동떨어진 튀는 값으로, 평균을 왜곡해 모델을 헷갈리게 만든다."},{term:"스케일링(Scaling)",desc:"단위가 다른 숫자들(키 cm vs 몸무게 kg)의 크기 범위를 비슷하게 맞추는 작업이다."},{term:"원-핫 인코딩",desc:"글자로 된 범주(빨강·파랑)를 0과 1로 된 여러 칸으로 바꿔 모델이 읽게 하는 방법이다."},{term:"피처 선택",desc:"쓸모없거나 중복된 피처를 골라 빼서 모델을 더 빠르고 정확하게 만드는 일이다."},{term:"탐색적 데이터 분석(EDA)",desc:"본격 가공 전에 데이터를 그림과 요약통계로 훑어, 각 열의 분포·결측·이상치와 변수들 사이의 관계를 먼저 파악하는 단계다. 어떻게 손질할지 방향을 여기서 정한다."},{term:"데이터 누수(Data Leakage)",desc:"테스트·미래 정보가 학습 과정에 몰래 새어 들어가 점수가 실제보다 부풀려지는 현상이다. 스케일러·인코더·대치값은 반드시 학습 데이터에만 fit 해야 막을 수 있다."},{term:"필터·래퍼·임베디드",desc:"변수 선택의 세 갈래다. 필터는 통계로 미리 거르고(상관·분산), 래퍼는 모델을 반복해 좋은 조합을 찾고(RFE), 임베디드는 학습하며 자동으로 고른다(Lasso·트리 중요도)."}],detail:{topics:[{h:"데이터 정제(Cleaning)",items:["결측치 처리: 삭제 vs 평균·중앙값·최빈값 채우기","이상치 탐지: IQR 규칙·박스플롯·z-score","중복 행 제거와 자료형(타입) 교정"]},{h:"피처 변환(Transform)",items:["스케일링: StandardScaler(표준화)·MinMaxScaler(0~1)","로그 변환으로 한쪽으로 쏠린 분포 펴기","범주 인코딩: 원-핫·라벨·타깃 인코딩 선택 기준"]},{h:"피처 생성·선택",items:["수치 조합·구간화(binning), 날짜·텍스트 파생 피처","상관관계·피처 중요도로 불필요한 피처 제거","PCA 등 차원 축소로 피처 수 줄이기"]},{h:"전처리 고급 기법",items:["고급 결측 대치: 중앙값·최빈값 대신 KNNImputer(비슷한 행 참고)·IterativeImputer(다른 열로 예측해 채우기)","분포 정규화: 로그·Box-Cox·Yeo-Johnson(PowerTransformer)로 치우친 분포를 종 모양에 가깝게 펴기","이상치 처리: 삭제 대신 윈저라이징(경계값으로 눌러 담기)·RobustScaler(중앙값·IQR 기준 스케일링)","고카디널리티 범주: 원-핫 대신 빈도·타깃 인코딩 + 누수 방지용 스무딩"]}],labs:[{title:"Lab 0. EDA로 데이터와 친해지기",steps:["df.info()·df.describe()로 변수 유형과 요약통계를 확인한다.","df.hist(bins=30)로 숫자 열 분포를 그려 쏠림·이상치를 눈으로 본다.","df.corr(numeric_only=True)를 seaborn.heatmap으로 그려 서로 강하게 상관된 중복 후보 열을 찾는다.","df.groupby('타깃')[피처].mean()으로 타깃 그룹별 피처 평균을 비교해 어떤 피처가 답과 관련 있어 보이는지 가설을 세운다.","이 가설을 다음 Lab의 파생 피처·선택 근거로 메모한다."]},{title:"Lab 1. 결측치·이상치 진단하고 채우기",steps:["샘플 데이터를 `pd.read_csv` 로 불러온다.","`df.info()` 와 `df.isnull().sum()` 으로 빈 값 위치를 파악한다.","숫자 칸은 `df['col'].fillna(df['col'].median())` 로 채운다.","`df['col'].quantile([0.25,0.75])` 로 IQR 을 구해 이상치 경계를 계산한다.","경계 밖 값을 `clip` 으로 잘라내고 `describe()` 로 결과를 확인한다."]},{title:"Lab 2. 스케일링과 인코딩 적용",steps:["`from sklearn.preprocessing import StandardScaler` 를 가져온다.","숫자 칸에 `StandardScaler().fit_transform(...)` 을 적용해 표준화한다.","글자 칸은 `pd.get_dummies(...)` 로 원-핫 인코딩한다.","가공 전후 `df.head()` 를 출력해 값이 바뀐 것을 비교한다.","가공된 표를 새 변수에 저장해 다음 모델 학습에 쓴다."]},{title:"Lab 3. 피처 중요도로 선택하기",steps:["`from sklearn.ensemble import RandomForestClassifier` 를 가져온다.","모델을 `fit(X, y)` 로 학습한다.","`model.feature_importances_` 로 각 피처의 중요도를 확인한다.","중요도를 내림차순 정렬해 상위 피처만 골라낸다.","선택한 피처로만 다시 학습해 점수가 유지·향상되는지 비교한다."]},{title:"Lab 4. 날짜·수치·텍스트에서 파생 피처 만들기",steps:["날짜 열을 pd.to_datetime 으로 변환한 뒤 .dt.month·.dt.dayofweek 로 월·요일을 뽑는다.","요일이 5 이상이면 1이 되는 '주말가입' 파생 피처를 (조건 >= 5).astype(int) 로 만든다.","두 수치 열을 나눠 '방문당 구매액' 같은 비율 피처를 만들어 소비 밀도를 표현한다.","pd.cut(연속값, bins=..., labels=['소액','중간','고액']) 으로 금액을 구간 범주로 묶는다.","텍스트 열에서 .str.len()·.str.split().str.len() 으로 글자수·단어수를, .str.contains('키워드').astype(int) 로 키워드 포함 여부를 만든다.","만든 파생 피처마다 '왜 도움이 될지'를 한 줄씩 메모하고 df.head() 로 결과를 확인한다."]},{title:"Lab 5. 피처 엔지니어링 전·후 성능 비교하기",steps:["원본 숫자 피처만으로 X_before 를 구성하고, RandomForestClassifier 를 cross_val_score(cv=5) 로 평가해 평균 점수를 기록한다.","Lab 4 에서 만든 파생 피처와 성별 인코딩을 더해 X_after 를 만든다.","모델과 교차검증 설정을 똑같이 두고 X_after 의 평균 점수를 구한다(모델이 아니라 피처만 바뀌었음을 확실히 한다).","두 평균 점수를 함께 출력하고 향상폭(after - before)을 계산해 얼마나 올랐는지 확인한다.","모델을 한 번 fit 한 뒤 feature_importances_ 로 어떤 피처가 기여했는지 상위 순으로 확인한다.","'가장 크게 기여한 파생 피처 1개가 왜 도움이 되었는지'를 한 줄로 해석해 노트북에 적는다."]}],homework:["타이타닉 외 다른 데이터셋(예: 집값 데이터)을 골라 결측치 처리·인코딩·파생 피처 1개 이상을 적용하고, 피처 가공 전후 정확도(또는 오차)를 비교한 노트북을 제출한다.",'내가 만든 파생 피처 2개에 대해 "왜 이 피처가 도움이 될 것이라 생각했는지"를 3줄로 설명해 마크다운 셀에 적는다.']},theory:{theory:[{h:"가공 전에 먼저 데이터와 친해진다 - 탐색적 분석(EDA)",body:`피처를 손질하기 전에 데이터가 어떻게 생겼는지부터 봐야 한다.
각 열이 숫자인지 범주인지(변수 유형)를 구분하고, 히스토그램으로 분포가 한쪽으로 쏠렸는지, 결측·이상치가 어디에 얼마나 있는지 확인한다.
이어서 상관관계 히트맵으로 서로 비슷하게 움직이는 열(중복 후보)을 찾고, 예측 대상(타깃)과 각 피처의 관계를 그려 어떤 피처가 답과 관련 있어 보이는지 감을 잡는다.

이렇게 얻은 감이 '어떤 결측을 어떻게 채울지, 어떤 파생 피처를 만들지'를 결정한다.
EDA를 건너뛰고 바로 가공하면 엉뚱한 처리로 오히려 성능을 깎을 수 있다.`},{h:"쓸 피처만 남기는 세 가지 방법 - 필터·래퍼·임베디드",body:`피처가 많다고 항상 좋은 게 아니다. 중복되거나 잡음인 피처는 모델을 느리게 하고 과적합을 키운다.
변수 선택에는 크게 세 갈래가 있다.
필터(Filter)는 모델과 무관하게 통계로 미리 거른다 — 타깃과의 상관·분산이 거의 없는 열, 카이제곱 점수가 낮은 열을 쳐낸다. 빠르지만 피처 간 조합 효과는 못 본다.
래퍼(Wrapper)는 실제 모델을 여러 번 돌려 성능이 오르는 조합을 찾는다 — RFE처럼 하나씩 빼 보며 고른다. 정확하지만 느리다.
임베디드(Embedded)는 모델이 학습하며 스스로 고른다 — Lasso는 쓸모없는 피처의 계수를 0으로 만들고, 트리 모델은 feature_importances_로 중요도를 매긴다.

실무에서는 필터로 크게 줄이고 임베디드로 다듬는 식으로 섞어 쓴다.`},{h:"전처리는 반드시 학습 데이터에만 맞춘다 - 데이터 누수 막기",body:`스케일링의 평균·표준편차, 인코딩의 범주 목록, 결측 대치의 중앙값 같은 '기준값'을 전체 데이터에서 구하면, 테스트 데이터 정보가 학습에 몰래 새어 든다(데이터 누수).
그러면 실제보다 점수가 부풀려지고 진짜 새 데이터에서 성능이 뚝 떨어진다.
그래서 기준값은 train에서만 fit으로 구하고, test에는 그 기준을 transform으로 적용만 한다.

특히 타깃 인코딩(범주를 타깃 평균으로 치환)은 타깃을 직접 쓰므로 누수에 가장 취약하다 — 교차검증 폴드 안에서만 평균을 내거나 스무딩을 걸어야 한다.
sklearn의 Pipeline + ColumnTransformer를 쓰면 이 fit/transform 분리가 자동으로 지켜진다.`},{h:"피처 엔지니어링은 요리의 재료 손질이다",body:`같은 식재료라도 잘 다듬으면 더 맛있는 요리가 되듯, 같은 데이터라도 어떻게 손질하느냐에 따라 모델 성능이 크게 달라진다.
실무에서는 화려한 알고리즘을 바꾸는 것보다 피처를 잘 만드는 것이 점수를 더 많이 올리는 경우가 흔하다.

예를 들어 "태어난 날짜"라는 원본은 모델에게 큰 의미가 없지만, 거기서 "나이"나 "요일"을 뽑아내면 훨씬 강력한 단서가 된다.
즉 사람이 도메인 지식을 써서 숨은 정보를 꺼내 주는 과정이 피처 엔지니어링이다.`},{h:"왜 숫자 크기를 맞춰야 할까(스케일링)",body:`나이는 0~100, 연봉은 0~1억처럼 칸마다 숫자 범위가 천차만별이다.
많은 모델은 숫자가 크면 더 중요하다고 착각하기 때문에, 연봉 같은 큰 숫자에만 끌려가 나이를 무시할 수 있다.

그래서 모든 칸을 비슷한 범위(예: 0~1 또는 평균0·표준편차1)로 맞춰 주면 모델이 모든 피처를 공평하게 본다.
저울의 눈금을 통일해 주는 것과 같다고 생각하면 된다.`},{h:"글자는 숫자로 바꿔야 모델이 읽는다(인코딩)",body:`모델은 'male', 'female' 같은 글자를 직접 계산하지 못하고 오직 숫자만 다룬다.
그래서 범주(카테고리)를 숫자로 번역해 주는 작업이 필요한데, 이를 인코딩이라 한다.

순서가 없는 범주(빨강·파랑·초록)에 0·1·2 를 그냥 매기면 모델이 "초록이 빨강보다 크다"고 오해하므로, 이럴 땐 각 항목마다 별도의 0/1 칸을 만드는 원-핫 인코딩을 쓴다.`},{h:"원본에 없던 단서를 만들어 낸다 - 파생 피처(Feature Creation)",body:`5교시의 핵심은 '이미 있는 열'을 손질하는 것을 넘어 '새로운 열'을 만들어 내는 일이다.
모델은 우리가 넣어 준 열들 사이의 사칙연산이나 날짜 분해를 스스로 해 주지 않는다. 그래서 사람이 도메인 지식을 써서 숨은 관계를 미리 꺼내 열로 만들어 줘야 한다.

네 갈래로 나눠 생각하면 쉽다.
첫째, 날짜 파생 - '2025-06-14'라는 원본 날짜 자체는 모델에게 큰 의미가 없지만, 여기서 월·요일·주말여부·기준일까지의 경과일을 뽑으면 계절성이나 최근성 같은 강력한 단서가 된다.
둘째, 수치 조합·비율 - 구매액과 방문횟수를 그냥 두는 대신 '방문당 구매액'으로 나누면 고객의 밀도 있는 소비 성향이 드러난다. 키와 몸무게로 BMI를 만드는 것과 같은 이치다.
셋째, 구간화(binning) - 나이나 금액 같은 연속값을 '소액·중간·고액'처럼 구간 범주로 묶으면, 값의 미세한 차이보다 큰 경향을 모델이 잡기 쉬워지고 이상치에도 강해진다.
넷째, 텍스트 파생 - 리뷰 문장을 그대로 못 쓰더라도 글자수·단어수·특정 키워드('환불','만족') 포함 여부 같은 숫자 신호는 바로 피처가 된다.

핵심 포인트: 좋은 파생 피처 하나가 복잡한 모델 교체보다 점수를 더 올리는 경우가 많다. 다만 '왜 이 피처가 도움이 될지'를 한 줄로 설명할 수 있어야 한다 - 근거 없이 열만 늘리면 잡음이 되어 과적합을 키운다.`},{h:"인코딩 세 갈래 - 원-핫·순서형(라벨)·타깃, 언제 무엇을 쓰나",body:`글자를 숫자로 바꾸는 인코딩에도 상황에 맞는 도구가 따로 있다. 4교시에서는 세 가지를 구분해서 고르는 기준을 잡는다.

원-핫 인코딩은 순서가 없는 소수의 범주에 쓴다 - 빨강·파랑·초록처럼 서로 우열이 없을 때, 항목마다 별도의 0/1 칸을 만들어 '초록이 빨강보다 크다'는 오해를 막는다. 단점은 범주 종류가 많으면 열이 폭발적으로 늘어난다는 것이다.

순서형(라벨/Ordinal) 인코딩은 순서가 의미 있는 범주에 쓴다 - 초급<중급<고급, 저학년<고학년처럼 크기 관계가 진짜로 존재할 때 0,1,2로 매긴다. 순서가 없는 데이터에 이걸 쓰면 모델이 가짜 크기 관계를 학습하니 주의한다.

타깃 인코딩은 범주 종류가 아주 많을 때(고카디널리티, 예: 수백 개의 지역·상품코드) 쓴다 - 각 범주를 '그 범주에 속한 행들의 타깃 평균'으로 치환해 열 하나로 압축한다. 대신 타깃을 직접 쓰기 때문에 누수에 가장 취약하다 - 반드시 교차적합(폴드 안에서만 평균 계산)이나 스무딩을 걸어야 하고, sklearn의 TargetEncoder는 이 교차적합을 자동으로 해 준다.

핵심 포인트: '범주에 순서가 있나? 종류가 몇 개나 되나?' 이 두 질문으로 도구가 정해진다. 순서 없고 적으면 원-핫, 순서 있으면 순서형, 종류가 폭발하면 타깃 인코딩이다.`},{h:"피처가 너무 많을 때 - 차원 축소와 PCA",body:`6교시 후반부는 변수 선택(필터·래퍼·임베디드)에 이어 나오는 또 다른 접근, 차원 축소다.
둘의 차이를 먼저 잡자. 변수 선택은 있는 열 중에서 '고르는' 것이고(원래 열이 그대로 남는다), 차원 축소는 여러 열을 '합쳐' 새로운 소수의 축으로 재조합하는 것이다.

왜 필요한가 - 피처가 수십·수백 개로 많아지면 '차원의 저주'가 생긴다. 데이터가 넓은 공간에 흩뿌려져 비슷한 샘플을 찾기 어려워지고, 학습이 느려지며 과적합 위험도 커진다. 특히 서로 강하게 상관된(중복된) 열이 많으면 정보는 겹치는데 개수만 늘어난다.

PCA(주성분분석)의 직관 - 데이터가 가장 넓게 퍼진 방향(분산이 큰 축)을 찾아, 그 축들로 좌표를 새로 잡는다. 원래 10개 열이 있어도 상위 2~3개 주성분이 전체 분산의 대부분을 설명하면, 그 몇 개만 남겨 정보 손실을 최소화하며 차원을 줄인다.

실무 주의점 두 가지. 첫째, PCA는 값의 크기에 민감하므로 반드시 표준화(StandardScaler)를 먼저 한다 - 안 그러면 단위가 큰 열이 주성분을 독차지한다. 둘째, 주성분은 원래 열들의 혼합이라 '이 축이 무엇을 뜻하는지' 해석이 어려워진다 - 성능과 해석력 사이의 트레이드오프다.

핵심 포인트: n_components로 남길 축 개수를 정하거나, explained_variance_ratio_(각 축이 설명하는 분산 비율)의 누적합이 예컨대 0.95를 넘는 지점까지 남기는 식으로 정한다. 해석이 중요한 문제면 변수 선택을, 순수 성능·시각화·전처리 압축이 목적이면 PCA를 택한다.`}]},realCodes:[{title:"엔드투엔드: 전처리 파이프라인으로 결측치·스케일링·인코딩 한 번에",lang:"python",code:`# 데이터 처리를 위한 pandas 가져오기
import pandas as pd
# ColumnTransformer: 열마다 다른 가공을 적용하게 묶어주는 도구
from sklearn.compose import ColumnTransformer
# Pipeline: 전처리 -> 모델 학습을 하나의 흐름으로 연결
from sklearn.pipeline import Pipeline
# 결측치 채우기 도구
from sklearn.impute import SimpleImputer
# 숫자 표준화·범주 원-핫 인코딩 도구
from sklearn.preprocessing import StandardScaler, OneHotEncoder
# 분류 모델·데이터 분할·정확도 평가 함수
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 타이타닉 데이터 불러오기 (인터넷에서 직접 읽음)
url = 'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv'
df = pd.read_csv(url)  # df 는 표 형태 데이터

# 입력 피처(X)와 정답(y, 생존여부) 분리
X = df[['Pclass', 'Sex', 'Age', 'Fare', 'Embarked']]  # 다섯 칸만 사용
y = df['Survived']  # 1=생존, 0=사망

# 숫자 칸과 글자 칸을 따로 처리할 목록 정의
num_cols = ['Age', 'Fare']                # 채우고 스케일링할 숫자 칸
cat_cols = ['Pclass', 'Sex', 'Embarked']  # 원-핫 인코딩할 범주 칸

# 숫자: 빈 값은 중앙값으로 채운 뒤 표준화
num_pipe = Pipeline([('fill', SimpleImputer(strategy='median')),
                     ('scale', StandardScaler())])
# 범주: 빈 값은 최빈값으로 채운 뒤 원-핫 인코딩
cat_pipe = Pipeline([('fill', SimpleImputer(strategy='most_frequent')),
                     ('onehot', OneHotEncoder(handle_unknown='ignore'))])

# 두 처리를 칸별로 묶기
pre = ColumnTransformer([('num', num_pipe, num_cols),
                         ('cat', cat_pipe, cat_cols)])

# 전처리 + 모델을 하나의 파이프라인으로 연결
model = Pipeline([('pre', pre), ('clf', LogisticRegression(max_iter=1000))])

# 학습용/검증용 8:2 분할 (random_state 로 매번 같은 분할 보장)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
model.fit(X_tr, y_tr)  # 파이프라인 전체 학습 실행

# 검증 데이터로 정확도 측정 후 출력
acc = accuracy_score(y_te, model.predict(X_te))
print('정확도:', round(acc, 3))  # 결과 예: 정확도: 0.804`,note:`ColumnTransformer 와 Pipeline 을 쓰면 결측치 채우기·스케일링·인코딩이 새 데이터에도 자동으로 똑같이 적용된다.
실무에서 전처리 누락 실수를 막아 주는 표준 패턴이다.`}],periods:['1교시 피처 엔지니어링이란? 모델 성능을 좌우하는 "재료 손질"',"2교시 데이터 둘러보기(EDA): 변수 유형·분포·상관 히트맵으로 데이터 파악","3교시 [실습] 스케일링·정규화로 숫자 크기 맞추기","4교시 범주형 인코딩: 원-핫·라벨·타깃 인코딩","5교시 [실습] 수치·날짜·텍스트 파생 피처 만들기","6교시 변수 선택(필터·래퍼·임베디드)과 차원 축소(PCA)","7교시 [실습] 피처 엔지니어링 전후 성능 비교","8교시 정리·코드 리뷰·미니 회고"]}};export{n as default};
