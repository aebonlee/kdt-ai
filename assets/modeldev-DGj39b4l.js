const e={"modeldev-1":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 오리엔테이션 - 모델 개발이란 무엇인가(전체 흐름 한눈에)"},{time:"10:00–10:50",topic:"2교시 문제 유형별 모델 선택 기준(분류·회귀 고르기)"},{time:"11:00–11:50",topic:"3교시 [실습] 데이터 불러오고 학습·검증·테스트로 나누기"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 교차검증으로 일반화 성능 정직하게 평가하기"},{time:"14:00–14:50",topic:"5교시 [실습] 전처리→학습→평가 파이프라인 만들기"},{time:"15:00–15:50",topic:"6교시 평가지표 설계와 베이스라인(기준점) 세우기"},{time:"16:00–16:50",topic:"7교시 [실습] 베이스라인 모델 학습·평가"},{time:"17:00–17:50",topic:"8교시 [실습] 교차검증 점수 비교 & 오늘 내용 정리"}],practice:{title:"붓꽃(Iris) 데이터로 '베이스라인 분류 모델' 만들고 교차검증으로 평가하기",steps:["Jupyter(또는 Colab) 새 노트북을 열고 첫 셀에 'import sklearn; print(sklearn.__version__)' 를 입력해 라이브러리가 설치돼 있는지 확인한다(버전 숫자가 출력되면 정상).","from sklearn.datasets import load_iris 로 붓꽃 데이터를 불러오고, X(꽃잎·꽃받침 크기), y(품종 번호)로 나눠 X.shape 를 출력해 (150, 4) 가 나오는지 확인한다.","from sklearn.model_selection import train_test_split 로 데이터를 학습용 80%·테스트용 20% 로 나눈다. 이때 stratify=y 옵션을 넣어 품종 비율이 한쪽에 쏠리지 않게 한다.","from sklearn.pipeline import make_pipeline 와 StandardScaler, LogisticRegression 을 묶어 '전처리+모델' 파이프라인을 한 줄로 만든다.","model.fit(X_train, y_train) 으로 학습시키고, model.score(X_test, y_test) 로 테스트 정확도를 출력한다(0.9 이상이면 잘 된 것).","from sklearn.model_selection import cross_val_score 로 5겹 교차검증을 돌려 5개의 점수 배열과 그 평균(.mean())을 출력한다.","테스트 정확도 1개와 교차검증 평균 점수를 비교하며 '왜 교차검증이 더 믿을 만한지' 한 줄 메모를 노트북 마크다운 셀에 적는다.","마지막으로 print 로 '베이스라인 정확도: 0.9xx' 형태의 최종 결과 한 줄을 출력해 산출물로 남긴다."],deliverable:"붓꽃 베이스라인 모델 노트북(.ipynb) — 데이터 분할 코드, 파이프라인, 테스트 점수와 5겹 교차검증 평균 점수가 모두 출력되어 있어야 함"}},examples:[{title:"데이터 한 줄로 나누기 (train_test_split)",lang:"python",note:"stratify 를 넣으면 정답 비율이 한쪽으로 쏠리지 않는다.",code:`from sklearn.model_selection import train_test_split  # 분할 도구 불러오기
from sklearn.datasets import load_iris                # 연습용 데이터

X = load_iris().data   # 설명 데이터(꽃 크기)
y = load_iris().target # 정답(품종 번호)

# 학습 80% / 테스트 20% 로 나눈다 (정답 비율 유지 + 재현 가능하게 고정)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=0)
print(len(X_tr), len(X_te))  # 결과: 120 30  → 학습 120개, 테스트 30개`},{title:"가장 단순한 기준점: 무조건 다수 클래스를 찍는 DummyClassifier",lang:"python",note:"이 점수보다 못하면 우리 모델은 '찍기'만도 못한 것이다.",code:`from sklearn.dummy import DummyClassifier  # 일부러 단순하게 '찍는' 기준 모델
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)  # X, y 를 한 번에 받기
X_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=0)  # 기본 75:25 분할

# strategy='most_frequent': 가장 많이 나온 정답만 계속 찍는 전략
dummy = DummyClassifier(strategy='most_frequent')
dummy.fit(X_tr, y_tr)                 # '찍기' 기준을 학습(사실상 다수 클래스 기억)
print('찍기 정확도:', round(dummy.score(X_te, y_te), 3))  # 결과 예: 찍기 정확도: 0.342`},{title:"분류 평가지표 한눈에 — 혼동행렬·정밀도·재현율·ROC AUC",lang:"python",note:"재현율이 낮으면 실제 양성(환자)을 놓친 경우가 많다는 뜻이라 의료·불량검출에서 특히 중요하다.",code:`from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, classification_report, roc_auc_score

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)
clf = LogisticRegression(max_iter=5000).fit(X_tr, y_tr)

pred = clf.predict(X_te)               # 0/1 예측
proba = clf.predict_proba(X_te)[:, 1]  # 양성(1)일 확률

# 혼동행렬 = [[TN, FP], [FN, TP]] — 네 칸은 참/거짓 x 양성/음성 조합
print(confusion_matrix(y_te, pred))
# precision·recall·f1 을 클래스별로 한 번에 보여준다
print(classification_report(y_te, pred))
# ROC AUC 는 확률 기준으로 양성/음성을 얼마나 잘 가르는지(1에 가까울수록 좋음)
print('ROC AUC:', round(roc_auc_score(y_te, proba), 3))
`},{title:"회귀 평가지표 — MAE·RMSE·R2",lang:"python",note:"MAE는 평균 오차 크기, RMSE는 큰 오차에 더 민감, R2는 1에 가까울수록 잘 맞춘 것이다.",code:`from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

X, y = load_diabetes(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)
reg = LinearRegression().fit(X_tr, y_tr)
pred = reg.predict(X_te)

print('MAE :', round(mean_absolute_error(y_te, pred), 2))        # 평균 절대 오차
print('RMSE:', round(mean_squared_error(y_te, pred) ** 0.5, 2))  # 제곱오차 평균의 제곱근
print('R2  :', round(r2_score(y_te, pred), 3))                   # 결정계수
`},{title:'교차검증으로 "운 좋은 분할" 걸러내기',lang:"python",code:`from sklearn.model_selection import cross_val_score, StratifiedKFold

# 한 번의 train/test 분할은 우연에 좌우된다 → 여러 번 나눠 평균낸다
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(pipe, X, y, cv=cv, scoring="f1_macro")

print("각 fold:", scores.round(3))
print(f"평균 {scores.mean():.3f} ± {scores.std():.3f}")
# 편차(±)가 크면 모델이 불안정하다는 신호 — 데이터·피처를 다시 본다`,note:'단일 분할 점수는 신뢰하기 어렵다. K-fold 평균±표준편차로 "진짜 실력"과 안정성을 함께 본다. Stratified는 클래스 비율을 유지.'},{title:'혼동행렬로 "어떤 오류인지"까지 분석',lang:"python",code:`from sklearn.metrics import confusion_matrix, classification_report

pred = model.predict(X_te)
print(confusion_matrix(y_te, pred))       # 행=실제, 열=예측
print(classification_report(y_te, pred))  # precision/recall/f1 한눈에

# 예: 스팸 필터라면 FN(스팸을 정상으로 통과)이 FP보다 위험할 수 있다
# → 정확도 하나가 아니라, 비즈니스 비용에 맞는 지표를 골라야 한다`,note:"정확도만 보면 오류의 종류를 놓친다. 혼동행렬로 FP/FN을 구분해, 문제에 맞는 지표(재현율 우선 등)를 선택한다."},{title:"학습·검증·테스트 3분할 (train_test_split 두 번)",lang:"python",code:`from sklearn.datasets import load_iris                # 연습용 데이터
from sklearn.model_selection import train_test_split  # 분할 도구

X, y = load_iris(return_X_y=True)  # 설명변수 X, 정답 y 를 한 번에 받기

# 1차: 전체를 학습용(60%) vs 임시(40%)로 나눈다 (정답 비율 유지)
X_tr, X_tmp, y_tr, y_tmp = train_test_split(X, y, test_size=0.4, stratify=y, random_state=0)

# 2차: 임시(40%)를 다시 검증(20%) vs 테스트(20%)로 절반씩 나눈다
X_val, X_te, y_val, y_te = train_test_split(X_tmp, y_tmp, test_size=0.5, stratify=y_tmp, random_state=0)

# 학습=모델 훈련용, 검증=하이퍼파라미터 고르는 용, 테스트=마지막 성능 확인용
print(len(X_tr), len(X_val), len(X_te))  # 결과: 90 30 30 (60:20:20 분할)`,note:"검증셋은 하이퍼파라미터를 고르는 데만 쓰고, 테스트셋은 맨 마지막 한 번만 열어 봐야 진짜 일반화 성능이다."},{title:"층화 K겹 교차검증으로 일반화 성능 재기 (StratifiedKFold)",lang:"python",code:`from sklearn.datasets import load_breast_cancer         # 이진 분류 데이터
from sklearn.model_selection import StratifiedKFold, cross_val_score  # 층화 K겹 교차검증
from sklearn.linear_model import LogisticRegression     # 분류 모델

X, y = load_breast_cancer(return_X_y=True)  # 입력 X, 정답 y

# StratifiedKFold: 각 겹(fold)마다 정답 비율을 똑같이 유지하며 5조각으로 나눈다
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
model = LogisticRegression(max_iter=5000)   # 반복 횟수를 넉넉히 줘서 수렴시킨다

# 5번 학습/검증을 돌려 매번 점수를 받는다 (한 번 분할의 운에 흔들리지 않게)
scores = cross_val_score(model, X, y, cv=cv)
print('겹별 점수:', scores.round(3))          # 결과 예: [0.965 0.947 0.956 0.974 0.956]
print('평균/표준편차:', round(scores.mean(), 3), '/', round(scores.std(), 3))  # 일반화 성능 요약`,note:"한 번 나눈 점수는 운에 좌우되므로 여러 겹의 평균과 표준편차로 봐야 믿을 수 있다. 겹마다 정답 비율을 지키는 것이 StratifiedKFold의 핵심이다."},{title:"불균형 데이터: 소수 클래스 오버샘플링 (resample)",lang:"python",code:`import numpy as np                                  # 배열 처리
from sklearn.utils import resample                  # 표본을 다시 뽑는 도구
from collections import Counter                     # 개수 세기

# 정답이 0:90개, 1:10개로 심하게 치우친 상황을 흉내 낸다
X = np.arange(100).reshape(-1, 1)                   # 특징 1개짜리 예시 데이터
y = np.array([0] * 90 + [1] * 10)                   # 소수 클래스(1)가 10개뿐

# 소수 클래스(1)만 골라낸다
X_min, y_min = X[y == 1], y[y == 1]
# 다수 클래스 개수(90)만큼 복원추출로 뻥튀기한다 (오버샘플링)
X_up, y_up = resample(X_min, y_min, replace=True, n_samples=90, random_state=0)

# 다수 클래스 + 늘린 소수 클래스를 다시 합친다
X_bal = np.vstack([X[y == 0], X_up])                # 특징 합치기
y_bal = np.concatenate([y[y == 0], y_up])           # 정답 합치기
print('전:', Counter(y), ' 후:', Counter(y_bal))    # 결과: 전 {0:90,1:10} 후 {0:90,1:90}`,note:"소수 클래스를 복원추출로 늘리면 모델이 소수 클래스를 무시하지 않는다. 단, 검증·테스트셋은 오버샘플링하지 말고 학습셋에만 적용해야 성능이 부풀지 않는다."}],concepts:[{term:"모델(Model)",desc:"데이터에서 규칙을 학습해 새로운 입력에 대한 답(예측)을 내놓는 '자동 판단 기계'를 말한다."},{term:"학습/검증/테스트 분할",desc:"공부용·중간점검용·최종시험용으로 데이터를 나누어, 모델이 처음 보는 데이터에서도 잘 맞히는지 확인하는 방법이다."},{term:"과적합(Overfitting)",desc:"모델이 학습 데이터만 통째로 외워서, 새 데이터에서는 오히려 못 맞히는 현상이다."},{term:"교차검증(Cross Validation)",desc:"데이터를 여러 조각으로 나눠 번갈아 시험을 보게 해, 운에 좌우되지 않는 평균 실력을 재는 방법이다."},{term:"베이스라인(Baseline)",desc:"'최소한 이 정도는 나와야 한다'는 기준점이 되는 가장 단순한 모델이다."},{term:"평가지표(Metric)",desc:"모델이 잘했는지 숫자로 채점하는 기준(정확도·정밀도·재현율 등)이다."},{term:"파이프라인(Pipeline)",desc:"전처리부터 학습·예측까지 여러 단계를 한 줄로 묶어 실수 없이 자동 실행하게 하는 장치다."},{term:"혼동 행렬(Confusion Matrix)",desc:"분류 모델의 예측을 실제 정답과 대조해 맞음/틀림을 표(진짜양성 TP·거짓양성 FP·거짓음성 FN·진짜음성 TN)로 정리한 것으로, 어디서 어떤 오류가 나는지 한눈에 보여준다."},{term:"정밀도(Precision)",desc:"모델이 맞다고 한 것 중 실제로 맞은 비율로, 헛알람을 줄여야 할 때 중요하다(예: 정상 메일을 스팸으로 오분류)."},{term:"재현율(Recall)",desc:"실제 맞는 것 중 모델이 찾아낸 비율로, 놓치면 큰일 날 때 중요하다(예: 암 진단)."},{term:"F1-Score",desc:"정밀도와 재현율을 함께 챙기는 균형 점수(조화평균)다."},{term:"ROC-AUC",desc:"판단 임계값을 바꿔가며 그린 곡선 아래 넓이로, 1에 가까울수록 좋은 분류기이고 0.5는 찍기 수준이다."},{term:"회귀 지표(MAE·RMSE·R²)",desc:"MAE는 평균 절대 오차, RMSE는 큰 오차에 더 민감한 지표, R²는 모델이 데이터 변동을 설명한 비율로 1에 가까울수록 좋다."}],detail:{topics:[{h:"데이터 나누기 원칙",items:["학습/검증/테스트의 역할 구분","테스트 데이터는 끝까지 비공개","stratify 로 정답 비율 유지","random_state 로 재현성 확보"]},{h:"교차검증의 종류",items:["K-Fold(데이터를 K조각으로)","StratifiedKFold(분류에서 비율 유지)","cv 값이 클수록 정확하지만 오래 걸림","평균과 표준편차로 안정성 보기"]},{h:"베이스라인과 지표",items:["DummyClassifier/회귀 평균으로 기준점","분류: 정확도·정밀도·재현율·F1","회귀: MAE·RMSE·R^2","데이터 불균형 시 정확도 함정 주의"]},{h:"성능 평가 지표 고르기",items:["분류는 혼동 행렬에서 시작한다","헛알람 줄이기=정밀도, 놓침 줄이기=재현율","F1=둘의 균형, ROC-AUC=임계값 무관 종합 성능","회귀=MAE(직관)·RMSE(큰 오차 벌점)·R²(설명력)","불균형 데이터에서 정확도 함정 주의"]}],labs:[{title:"Lab1. 내 손으로 데이터 나눠 보기",steps:["새 노트북에서 load_iris 로 데이터를 불러온다.","train_test_split 으로 test_size=0.3 으로 나눠 본다.","len() 으로 학습/테스트 개수를 출력해 105와 45가 나오는지 확인한다.","stratify=y 를 뺐을 때와 넣었을 때 테스트 정답 비율(numpy.bincount)을 비교한다."]},{title:"Lab2. 베이스라인과 내 모델 비교",steps:["DummyClassifier(찍기)의 점수를 먼저 구한다.","LogisticRegression 으로 같은 데이터를 학습·평가한다.","두 점수를 나란히 print 로 출력한다.","내 모델이 찍기보다 얼마나 더 나은지 한 줄로 적는다."]},{title:"Lab3. 교차검증 점수 읽기",steps:["cross_val_score 로 cv=5 점수 배열을 구한다.","scores.mean() 과 scores.std() 를 출력한다.","표준편차가 크면 무슨 뜻인지(점수가 들쭉날쭉) 메모한다.","cv=10 으로 바꿔 평균이 비슷한지 확인한다."]},{title:"Lab4. 혼동 행렬과 지표 직접 계산하기",steps:["모델 예측을 confusion_matrix로 출력한다.","TP/FP/FN/TN을 손으로 지목해 본다.","classification_report로 precision·recall·f1을 확인한다.","roc_auc_score를 출력하고 0.5(찍기)와 비교한다."]}],homework:["사이킷런의 와인(load_wine) 데이터로 오늘 배운 흐름(분할→파이프라인→테스트 점수→5겹 교차검증)을 그대로 반복해, 베이스라인 정확도와 교차검증 평균을 출력한 노트북을 제출한다.","'테스트 점수 하나만 믿으면 안 되는 이유'를 교차검증과 연결해 3~4문장으로 정리해 마크다운 셀에 적는다."]},theory:{theory:[{h:"정확도만 믿으면 안 되는 이유 - 혼동 행렬 읽기",body:`정답이 한쪽으로 쏠린 데이터(예: 정상 99% vs 불량 1%)에서는 무조건 '정상'만 찍어도 정확도 99%가 나오지만, 정작 잡아야 할 불량은 하나도 못 잡는다.
그래서 혼동 행렬로 예측을 네 칸(TP·FP·FN·TN)으로 쪼개 본다.
여기서 정밀도('맞다고 한 것 중 진짜')와 재현율('진짜 중 찾아낸 것')이 나오는데, 둘은 보통 한쪽을 올리면 다른 쪽이 내려가는 시소 관계다.
헛알람이 싫으면 정밀도, 놓치는 게 싫으면 재현율을 우선하고, 둘 다 중요하면 F1을 본다.

임계값(몇 % 이상이면 양성으로 볼지)을 바꾸면 정밀도·재현율이 함께 움직이는데, 이 전체 성능을 한 숫자로 요약한 것이 ROC-AUC다.
회귀에서는 정답이 숫자이므로 '평균적으로 얼마나 빗나갔나'를 MAE·RMSE로, '얼마나 잘 설명하나'를 R²로 본다.`},{h:"모델 개발은 '요리'와 같다",body:`모델 개발은 좋은 재료(데이터)를 손질하고, 알맞은 조리법(알고리즘)을 골라, 맛을 보며(평가) 완성해 가는 요리 과정과 비슷하다.
아무리 비싼 칼(복잡한 모델)이 있어도 재료 손질(전처리)이 엉망이면 좋은 요리가 나오지 않는다.
그래서 우리는 화려한 모델부터 쓰는 대신, 먼저 단순한 베이스라인을 만들어 '기본 맛'을 확인한다.

이렇게 기준점을 잡아 두면, 나중에 복잡한 모델을 써서 정말 더 나아졌는지 정직하게 비교할 수 있다.
오늘은 이 '기본 요리 한 그릇'을 끝까지 만들어 보는 것이 목표다.`},{h:"왜 데이터를 나눠야 할까",body:`시험 문제를 미리 보고 외운 학생은 그 시험만 잘 보고, 처음 보는 문제는 못 푼다.
모델도 똑같아서, 학습에 쓴 데이터로 점수를 매기면 실제 실력보다 부풀려진 점수가 나온다.
그래서 데이터를 '공부용(train)'과 '최종시험용(test)'으로 미리 나누고, 시험용은 학습이 끝날 때까지 절대 보여주지 않는다.

교차검증은 한 발 더 나아가, 데이터를 여러 조각으로 잘라 번갈아 시험을 보게 한다.
한 번의 운 좋은(혹은 나쁜) 점수가 아니라 여러 번 시험의 평균을 보기 때문에, 모델의 진짜 실력을 더 믿을 만하게 알 수 있다.`},{h:"문제 유형이 모델을 결정한다",body:`예측하려는 정답이 '종류(고양이/강아지, 합격/불합격)'면 분류 문제이고, '숫자(집값, 내일 기온)'면 회귀 문제다.
문제 유형을 먼저 정해야 그에 맞는 모델과 평가지표를 고를 수 있다.
분류에는 정확도 같은 지표를, 회귀에는 오차(RMSE) 같은 지표를 쓴다.

처음에는 로지스틱 회귀나 결정트리처럼 단순하고 결과를 설명하기 쉬운 모델부터 시작하는 것이 좋다.
단순한 모델이 기준점을 만들어 주고, 데이터에 어떤 문제가 있는지도 빨리 드러내 주기 때문이다.`},{h:"교차검증 - 한 번의 시험을 여러 번으로 나눠 본다",body:`앞에서 데이터를 학습용과 테스트용으로 나눴다. 그런데 여기엔 함정이 하나 있다. 어쩌다 학습용에 쉬운 문제만, 테스트용에 어려운 문제만 몰릴 수 있다는 점이다. 그러면 테스트 점수 하나만으로는 모델이 진짜 잘하는지, 운이 좋았을 뿐인지 구분이 안 된다.

교차검증(Cross Validation)은 이 운의 영향을 걷어내는 방법이다. 핵심 아이디어는 '시험을 한 번이 아니라 여러 번 보게 하되, 매번 다른 부분을 시험 범위로 삼는다'는 것이다. 대표적인 K-Fold를 5겹(cv=5)으로 그림을 그려 설명하면 이렇다. 학습 데이터를 5조각으로 자른 뒤, 1라운드에서는 1번 조각을 시험용으로 빼고 나머지 4조각으로 공부시켜 점수를 낸다. 2라운드에서는 2번 조각을 빼고 나머지로 공부시킨다. 이렇게 5라운드를 돌면, 모든 조각이 정확히 한 번씩 시험 범위가 되고 점수도 5개가 나온다.

이때 우리가 봐야 할 것은 두 숫자다. 점수 5개의 평균은 '이 모델의 평균 실력'이고, 표준편차는 '실력이 얼마나 들쭉날쭉한지'다. 평균이 높아도 표준편차가 크면, 어떤 데이터를 만나느냐에 따라 성능이 크게 흔들린다는 뜻이라 실무에 올리기 불안하다. 그래서 결과는 항상 '평균 0.95 ± 0.03' 처럼 두 숫자를 함께 읽는 습관을 들여야 한다.

분류 문제에서는 그냥 K-Fold 대신 StratifiedKFold를 쓴다. 각 조각을 자를 때 정답 비율(예: 정상 90%, 불량 10%)을 모든 조각에 똑같이 유지해 주기 때문이다. 사이킷런의 cross_val_score는 분류기를 넘기면 이걸 자동으로 적용한다. cv 값은 보통 5나 10을 쓰는데, 크게 잡을수록 평가가 촘촘해지지만 그만큼 학습을 여러 번 반복해 오래 걸린다. 데이터가 아주 적을 때만 조각 수를 데이터 개수만큼 극단적으로 늘리는 LOO(Leave-One-Out)를 고려한다.

오늘 기억할 한 문장은 이것이다. '테스트 점수 하나는 스냅사진, 교차검증 평균은 여러 장을 겹쳐 본 진짜 얼굴이다.' 그래서 모델을 고르고 비교할 때는 반드시 교차검증 점수를 기준으로 삼는다.`}]},realCodes:[{title:"전처리→학습→평가까지 한 번에: 베이스라인 분류 파이프라인",lang:"python",note:`데이터 적재부터 분할·파이프라인 학습·테스트 평가·교차검증까지 한 흐름으로 담은 엔드투엔드 예제다.
각 줄의 주석을 읽으며 '무엇을' '왜' 하는지 따라가면 된다.`,code:`# 사이킷런(scikit-learn)에서 필요한 도구들을 불러온다
from sklearn.datasets import load_iris            # 연습용 붓꽃 데이터셋(꽃 크기로 품종 맞히기)
from sklearn.model_selection import train_test_split, cross_val_score  # 데이터 분할 + 교차검증 도구
from sklearn.preprocessing import StandardScaler  # 숫자 크기를 비슷한 범위로 맞춰주는 전처리기
from sklearn.linear_model import LogisticRegression  # 단순하고 빠른 분류 모델(베이스라인용)
from sklearn.pipeline import make_pipeline        # 전처리와 모델을 하나로 묶어주는 도구

# 1) 데이터를 불러온다
data = load_iris()      # 붓꽃 데이터 묶음(설명데이터 X 와 정답 y 가 함께 들어있음)
X = data.data           # X: 꽃받침/꽃잎의 길이·너비 4개 숫자(모델에게 주는 '문제')
y = data.target         # y: 품종 번호 0,1,2 (모델이 맞혀야 할 '정답')
print('데이터 크기:', X.shape)  # 결과: 데이터 크기: (150, 4)  → 150송이, 특징 4개

# 2) 학습용 80% / 테스트용 20% 로 나눈다 (test_size=0.2)
#    stratify=y 는 품종 비율을 양쪽에 똑같이 유지하라는 뜻
#    random_state=42 는 '항상 같은 방식으로 섞어' 결과를 재현 가능하게 함
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)

# 3) 전처리(StandardScaler) + 모델(LogisticRegression) 을 한 줄로 묶는다
#    max_iter=1000 은 학습 반복 횟수 한도(수렴 경고를 막기 위해 넉넉히 줌)
model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))

# 4) 학습: 공부용 데이터로 규칙을 익히게 한다
model.fit(X_train, y_train)  # X_train(문제)과 y_train(정답)을 보고 패턴 학습

# 5) 평가: 처음 보는 테스트 데이터로 점수를 매긴다
test_acc = model.score(X_test, y_test)  # 맞힌 비율(정확도)을 0~1 사이 숫자로 반환
print('테스트 정확도:', round(test_acc, 3))  # 결과 예: 테스트 정확도: 0.967

# 6) 교차검증: 학습 데이터를 5조각으로 나눠 번갈아 시험(cv=5)
scores = cross_val_score(model, X_train, y_train, cv=5)  # 5개의 점수 배열 반환
print('교차검증 점수들:', scores.round(3))      # 결과 예: [0.958 0.958 0.917 1.    0.958]
print('교차검증 평균:', round(scores.mean(), 3))  # 결과 예: 교차검증 평균: 0.958`}],periods:["1교시 오리엔테이션 - 모델 개발이란 무엇인가(전체 흐름 한눈에)","2교시 문제 유형별 모델 선택 기준(분류·회귀 고르기)","3교시 [실습] 데이터 불러오고 학습·검증·테스트로 나누기","4교시 교차검증으로 일반화 성능 정직하게 평가하기","5교시 [실습] 전처리→학습→평가 파이프라인 만들기","6교시 평가지표 설계와 베이스라인(기준점) 세우기","7교시 [실습] 베이스라인 모델 학습·평가","8교시 [실습] 교차검증 점수 비교 & 오늘 내용 정리"]},"modeldev-2":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 복습 - 하이퍼파라미터란 무엇인가(모델의 '설정 손잡이')"},{time:"10:00–10:50",topic:"2교시 탐색 방법 비교: Grid · Random · Bayesian"},{time:"11:00–11:50",topic:"3교시 [실습] GridSearchCV 로 자동 튜닝하기"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 과적합 다시 보기 - 정규화와 조기종료(early stopping)"},{time:"14:00–14:50",topic:"5교시 [실습] 조기종료로 과적합 막기"},{time:"15:00–15:50",topic:"6교시 앙상블 - 배깅 · 부스팅 · 스태킹의 직관"},{time:"16:00–16:50",topic:"7교시 [실습] 앙상블(RandomForest·GradientBoosting)로 성능 끌어올리기"},{time:"17:00–17:50",topic:"8교시 MLOps 모델 운영: 성능 모니터링 · 재학습과 Drift 대응"}],practice:{title:"GridSearchCV 로 하이퍼파라미터를 자동 튜닝하고, 베이스라인 대비 성능을 비교하기",steps:["Day1에서 만든 베이스라인 점수를 노트북 맨 위에 다시 적어 두고(예: 0.958), 오늘의 목표 점수로 삼는다.","from sklearn.ensemble import RandomForestClassifier 로 모델을 준비하고, 손볼 손잡이(파라미터) 후보를 param_grid 딕셔너리로 정의한다(n_estimators, max_depth 등).","from sklearn.model_selection import GridSearchCV 로 모델·param_grid·cv=5 를 묶어 grid 객체를 만든다.","grid.fit(X_train, y_train) 을 실행하면 모든 조합을 교차검증으로 자동 시험한다(완료까지 몇 초~몇십 초 기다린다).","grid.best_params_ 와 grid.best_score_ 를 출력해 '가장 좋았던 설정'과 '그때의 교차검증 점수'를 확인한다.","grid.best_estimator_ 로 최적 모델을 꺼내 테스트 데이터에서 최종 점수를 측정한다.","베이스라인 점수와 튜닝 후 점수를 print 로 나란히 출력해 얼마나 올랐는지 비교한다.","마지막으로 '어떤 파라미터를 키웠더니 왜 좋아졌는지' 한 줄 해석을 마크다운 셀에 남겨 산출물로 제출한다.","(운영 보조 실습) 학습에 쓴 데이터와, 값의 범위를 일부러 바꾼 '신규 데이터'를 각각 만들어 두 경우의 예측 정확도를 재고, 데이터 분포가 바뀌면(드리프트) 성능이 얼마나 떨어지는지 비교한다.","정확도가 어느 선 아래로 떨어지면 재학습이 필요하다는 '재학습 판단 기준'을 한 줄로 적어 둔다."],deliverable:"튜닝 비교 노트북(.ipynb) — param_grid, GridSearchCV 코드, best_params_/best_score_, 베이스라인 대비 테스트 점수 비교표(또는 두 줄 출력)와 드리프트·재학습 판단 기준 메모가 포함되어야 함"}},examples:[{title:"랜덤 서치로 빠르게 좋은 설정 찾기",lang:"python",note:"n_iter 만큼만 무작위로 시험하므로 넓은 범위를 빠르게 훑는다.",code:`from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import RandomizedSearchCV  # 무작위 탐색 도구

X, y = load_iris(return_X_y=True)
param = {'n_estimators': [50, 100, 200, 300], 'max_depth': [2, 3, 4, 5, None]}  # 후보 범위

# n_iter=8: 모든 조합이 아니라 무작위 8개 조합만 시험(빠름)
search = RandomizedSearchCV(RandomForestClassifier(random_state=0), param,
                            n_iter=8, cv=5, random_state=0)
search.fit(X, y)
print('최적 점수:', round(search.best_score_, 3))  # 결과 예: 최적 점수: 0.967`},{title:"여러 모델을 모으는 투표(VotingClassifier)",lang:"python",note:"성격이 다른 모델을 모으면 한쪽의 실수를 다른 쪽이 메워 준다.",code:`from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import VotingClassifier  # 여러 모델의 다수결 투표
from sklearn.model_selection import cross_val_score

X, y = load_iris(return_X_y=True)
# 서로 다른 두 모델을 후보로 등록
vote = VotingClassifier([
    ('lr', LogisticRegression(max_iter=1000)),  # 모델1: 로지스틱 회귀
    ('dt', DecisionTreeClassifier(max_depth=3)),# 모델2: 얕은 결정트리
], voting='hard')  # 'hard': 다수결로 최종 결정

score = cross_val_score(vote, X, y, cv=5).mean()  # 5겹 교차검증 평균
print('앙상블 평균 점수:', round(score, 3))         # 결과 예: 앙상블 평균 점수: 0.96`},{title:"배깅 vs 부스팅 정면 비교 - RandomForest·GradientBoosting·Stacking",lang:"python",code:`from sklearn.datasets import load_breast_cancer            # 유방암 진단(이진 분류) 데이터
from sklearn.model_selection import cross_val_score          # 교차검증 점수 도구
from sklearn.ensemble import (
    RandomForestClassifier,      # 배깅: 서로 다른 트리들을 동시에 키워 평균/다수결
    GradientBoostingClassifier,  # 부스팅: 앞 모델의 실수를 뒤 모델이 순서대로 보완
    StackingClassifier,          # 스태킹: 여러 모델 예측 위에 '심판 모델'을 한 겹 더
)
from sklearn.linear_model import LogisticRegression          # 스태킹의 최종 심판(메타모델)용

# 1) 데이터 준비 (X: 종양 특징들, y: 양성/악성 0/1)
X, y = load_breast_cancer(return_X_y=True)

# 2) 배깅 계열 - 랜덤포레스트: 트리 200개의 다수결
rf = RandomForestClassifier(n_estimators=200, random_state=42)
rf_score = cross_val_score(rf, X, y, cv=5).mean()   # 5겹 교차검증 평균
print('배깅(RandomForest)   :', round(rf_score, 3))  # 결과 예: 0.958

# 3) 부스팅 계열 - 그래디언트 부스팅: 실수를 순서대로 메워 나감
gb = GradientBoostingClassifier(random_state=42)
gb_score = cross_val_score(gb, X, y, cv=5).mean()
print('부스팅(GradientBoost):', round(gb_score, 3))  # 결과 예: 0.960

# 4) 스태킹 - 두 앙상블의 예측을 로지스틱회귀가 최종 종합
stack = StackingClassifier(
    estimators=[('rf', rf), ('gb', gb)],   # 1층: 서로 성격이 다른 두 앙상블
    final_estimator=LogisticRegression(max_iter=1000),  # 2층: 둘의 답을 합치는 심판
    cv=5,                                  # 1층 예측을 교차검증 방식으로 만들어 누수 방지
)
stack_score = cross_val_score(stack, X, y, cv=5).mean()
print('스태킹(RF+GB 종합)   :', round(stack_score, 3))  # 결과 예: 0.965

# 5) 한눈에 비교 - 어떤 앙상블이 이 데이터에 가장 잘 맞는지 확인
print('\\n가장 높은 점수:', round(max(rf_score, gb_score, stack_score), 3))`,note:`7교시 실습용. 같은 데이터에서 배깅(RandomForest)과 부스팅(GradientBoosting)의 교차검증 점수를 나란히 재고, 둘을 스태킹으로 합치면 더 오르는지까지 확인한다.
앙상블 3종(배깅·부스팅·스태킹)의 직관을 코드 한 흐름으로 체감하는 것이 목표다.`},{title:"GridSearchCV로 모든 조합을 촘촘히 탐색",lang:"python",code:`from sklearn.datasets import load_iris                 # 연습용 데이터
from sklearn.svm import SVC                             # 서포트 벡터 분류기
from sklearn.model_selection import GridSearchCV        # 격자(모든 조합) 탐색

X, y = load_iris(return_X_y=True)  # 입력 X, 정답 y

# 후보 값들을 격자로 준다 -> C 3개 x gamma 3개 = 9개 조합을 전부 시험한다
grid = {'C': [0.1, 1, 10], 'gamma': [0.01, 0.1, 1]}

# 각 조합마다 5겹 교차검증 -> 총 9x5=45번 학습해 가장 좋은 조합을 고른다
search = GridSearchCV(SVC(), grid, cv=5)
search.fit(X, y)

print('최적 조합:', search.best_params_)          # 결과 예: {'C': 1, 'gamma': 0.1}
print('최적 점수:', round(search.best_score_, 3))  # 결과 예: 0.98`,note:"Grid는 후보를 빠짐없이 훑어 확실하지만 조합이 늘면 급격히 느려진다. 후보가 많으면 RandomizedSearch(무작위)나 Bayesian(Optuna)으로 넘어간다."},{title:"Optuna로 베이지안 최적화 — 이전 결과를 기억하며 탐색",lang:"python",code:`# 설치: pip install optuna scikit-learn
import optuna                                          # 베이지안 최적화 도구
from sklearn.datasets import load_breast_cancer        # 이진 분류 데이터
from sklearn.ensemble import RandomForestClassifier    # 랜덤포레스트
from sklearn.model_selection import cross_val_score    # 교차검증 점수

X, y = load_breast_cancer(return_X_y=True)  # 입력 X, 정답 y

# Optuna가 매 시도마다 부를 함수 - trial이 다음에 시험할 값을 제안한다
def objective(trial):
    # 정해진 범위 안에서 다음에 시험할 값을 베이지안 방식으로 제안받는다
    n = trial.suggest_int('n_estimators', 50, 300)         # 트리 개수 후보 범위
    depth = trial.suggest_int('max_depth', 2, 16)          # 트리 깊이 후보 범위
    model = RandomForestClassifier(n_estimators=n, max_depth=depth, random_state=0)
    return cross_val_score(model, X, y, cv=5).mean()       # 5겹 평균 점수 반환(클수록 좋음)

# 점수를 최대화하는 방향으로 30번만 똑똑하게 탐색한다
study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=30)
print('최적 값:', study.best_params, '점수:', round(study.best_value, 3))`,note:"Grid/Random은 이전 결과를 무시하고 뽑지만, Bayesian(Optuna)은 지금까지 점수가 좋았던 구간을 기억해 다음 후보를 더 똑똑하게 고른다. 그래서 적은 시도로도 좋은 값을 찾는다."},{title:"회귀 오차지표 MAPE의 비대칭 함정과 sMAPE 보정",lang:"python",code:`import numpy as np                                    # 배열 계산

# 실제값(A)과 예측값(F)을 두 쌍으로 준비한다
A = np.array([1.0, 100.0])    # 실제값: 아주 작은 값 1, 큰 값 100
F = np.array([2.0, 101.0])    # 예측값: 둘 다 실제보다 1 큼(오차 크기는 똑같이 1)

# MAPE = |A-F|/|A| 의 평균 x100(%) - 분모가 실제값이라 작은 값에서 오차가 폭발한다
mape = np.mean(np.abs(A - F) / np.abs(A)) * 100
# sMAPE = |A-F| / ((|A|+|F|)/2) 의 평균 x100(%) - 분모를 실제/예측 평균으로 바꿔 완화
smape = np.mean(np.abs(A - F) / ((np.abs(A) + np.abs(F)) / 2)) * 100

print('한 건씩 MAPE:', (np.abs(A - F) / A * 100).round(2))  # 결과: [100.   1.] 오차는 같은데 100% vs 1%
print('MAPE 평균 :', round(mape, 2))                        # 결과: 50.5 (작은 값 하나에 휘둘림)
print('sMAPE 평균:', round(smape, 2))                       # 결과: 33.83 (덜 치우침)`,note:"오차 크기가 똑같이 1이어도 실제값이 작으면 MAPE가 100%로 튄다(비대칭 함정). 분모를 실제/예측 평균으로 바꾼 sMAPE가 이 쏠림을 완화한다. 값의 크기 차이가 큰 수요예측 문제에서 지표 선택이 중요하다."}],concepts:[{term:"하이퍼파라미터(Hyperparameter)",desc:"학습으로 정해지는 값이 아니라, 사람이 미리 정해줘야 하는 모델의 '설정 손잡이'다(예: 트리 깊이, 학습률)."},{term:"그리드 서치(Grid Search)",desc:"정해 둔 후보 값들의 모든 조합을 빠짐없이 시험해 보는 가장 단순·확실한 튜닝 방법이다."},{term:"랜덤 서치(Random Search)",desc:"조합을 전부 보지 않고 무작위로 골라 시험해, 넓은 범위를 빠르게 훑는 방법이다."},{term:"조기종료(Early Stopping)",desc:"검증 점수가 더 이상 좋아지지 않으면 학습을 도중에 멈춰, 과적합과 시간 낭비를 막는 기법이다."},{term:"앙상블(Ensemble)",desc:"여러 모델의 예측을 모아 다수결·평균으로 더 똑똑한 하나의 결론을 만드는 방법이다."},{term:"부스팅(Boosting)",desc:"앞 모델이 틀린 부분을 다음 모델이 집중적으로 보완하며 순서대로 실력을 키우는 앙상블이다."},{term:"모델 경량화",desc:"정확도는 최대한 지키면서 모델 크기와 예측 속도를 줄여, 실제 서비스에서 빠르게 돌아가게 만드는 작업이다."},{term:"데이터 드리프트(Data Drift)",desc:"시간이 지나며 들어오는 입력 데이터의 분포가 학습 때와 달라지는 현상이다(예: 신규 고객층 유입으로 나이 분포 변화). 모델은 그대로인데 세상이 바뀌어 성능이 서서히 떨어진다."},{term:"컨셉 드리프트(Concept Drift)",desc:"입력과 정답의 관계 자체가 바뀌는 현상이다(예: 코로나 이후 소비 패턴이 달라져 같은 특징이라도 결과가 달라짐)."},{term:"모델 모니터링",desc:"운영 중 예측 성능·입력 분포를 계속 감시해 이상 징후를 조기에 잡는 것이다."},{term:"재학습(Retraining) 파이프라인",desc:"성능이 기준 아래로 떨어지면 최신 데이터로 다시 학습·검증·배포하는 MLOps 순환 고리다."}],detail:{topics:[{h:"탐색 전략 고르기",items:["Grid: 적은 후보·확실함","Random: 많은 후보·빠르게 훑기","Bayesian: 결과 보고 똑똑하게 다음 후보","랜덤→그리드 2단계로 다듬기"]},{h:"과적합 제어 도구",items:["정규화(L1/L2)로 복잡도 벌점","조기종료로 학습 멈추기","트리 깊이·잎 샘플 수 제한","데이터 늘리기·교차검증으로 점검"]},{h:"앙상블 3종과 경량화",items:["배깅(RandomForest): 평균으로 안정","부스팅(GBM): 실수 보완으로 정확","스태킹: 모델 위에 메타모델","경량화: 추론 속도·모델 크기 줄이기"]}],labs:[{title:"Lab1. GridSearch 손잡이 바꿔 보기",steps:["param_grid 에서 max_depth 후보를 [2, 3, 4, None] 으로 둔다.","grid.fit 후 best_params_ 를 출력한다.","n_estimators 후보를 [100, 300, 500] 으로 늘려 다시 돌린다.","걸린 시간과 best_score_ 변화를 메모한다."]},{title:"Lab2. 조기종료 효과 확인",steps:["early_stopping=True 로 학습하고 n_iter_ 를 출력한다.","early_stopping=False 로 바꿔 다시 학습한다.","두 경우의 테스트 점수와 학습 시간을 비교한다.","어느 쪽이 과적합·시간 면에서 유리했는지 한 줄로 정리한다."]},{title:"Lab3. 베이스라인 vs 튜닝 vs 앙상블 한 표로",steps:["Day1 베이스라인 점수를 변수에 적어 둔다.","GridSearch 최적 모델 점수를 구한다.","VotingClassifier 앙상블 점수를 구한다.","세 점수를 print 로 나란히 출력해 가장 좋은 것을 고른다."]},{title:"Lab4. 배깅·부스팅·스태킹 성능 겨루기",steps:["load_breast_cancer 로 데이터를 불러온다.","RandomForestClassifier(배깅)와 GradientBoostingClassifier(부스팅)의 cross_val_score(cv=5) 평균을 각각 구해 출력한다.","StackingClassifier 로 두 모델을 묶고(final_estimator=LogisticRegression) 같은 방식으로 점수를 구한다.","세 점수를 나란히 print 하고, 이 데이터에서는 배깅·부스팅·스태킹 중 무엇이 가장 좋았는지 한 줄로 정리한다.","(여유가 되면) RandomForest 의 n_estimators 를 100→300 으로 바꿔 점수와 학습 시간이 어떻게 달라지는지 메모한다."]}],homework:["load_breast_cancer 데이터로 RandomForest 에 대해 GridSearchCV(또는 RandomizedSearchCV)를 적용하고, 베이스라인 대비 테스트 점수가 얼마나 올랐는지 비교표를 만든 노트북을 제출한다.","'그리드 서치 / 랜덤 서치 / 조기종료'를 각각 한 문장으로 쉬운 비유와 함께 정리해 마크다운으로 제출한다."]},theory:{theory:[{h:"모델은 배포가 끝이 아니다 - MLOps와 Drift 대응",body:`실험실에서 아무리 좋은 점수를 낸 모델도 운영에 올리는 순간부터 성능이 서서히 낡는다.
이유는 두 가지 Drift다. 데이터 드리프트는 입력 분포가 변하는 것(고객·계절·시장 변화)이고, 컨셉 드리프트는 입력과 정답의 관계 자체가 변하는 것이다.

그래서 MLOps에서는 (1) 운영 중 성능과 입력 분포를 대시보드로 모니터링하고, (2) 성능이 기준선 아래로 떨어지거나 분포 차이가 커지면 알림을 띄우며, (3) 최신 데이터로 재학습→검증→무중단 배포하는 자동 순환을 만든다.
재학습 주기는 '정기(예: 매주)'와 '트리거 기반(성능·드리프트 감지 시)'을 섞어 쓴다.
결국 모델 성능 최적화는 튜닝 한 번으로 끝나는 게 아니라, 운영 내내 감시하고 되살리는 지속 과정이다.`},{h:"하이퍼파라미터는 '오븐의 다이얼'이다",body:`빵을 구울 때 온도와 시간 다이얼을 어떻게 맞추느냐에 따라 결과가 완전히 달라진다.
하이퍼파라미터가 바로 이 다이얼이어서, 트리의 깊이나 학습률 같은 값을 사람이 미리 정해 줘야 한다.
학습으로 저절로 정해지는 값(가중치)과 달리, 이 값들은 우리가 실험해 가며 좋은 자리를 찾아야 한다.

문제는 다이얼이 여러 개라 조합이 너무 많다는 점이다.
그래서 손으로 하나씩 돌리는 대신, 그리드 서치나 랜덤 서치 같은 '자동 탐색기'에게 맡긴다.
자동 탐색기는 각 조합을 교차검증으로 공정하게 시험해, 가장 맛있게 구워지는 다이얼 위치를 찾아 준다.`},{h:"탐색 방법, 무엇을 언제 쓰나",body:`그리드 서치는 후보를 격자처럼 빠짐없이 다 시험하므로 확실하지만, 조합이 많아지면 매우 느려진다.
랜덤 서치는 무작위로 골라 보기 때문에 같은 시간에 더 넓은 범위를 훑을 수 있어, 후보가 많을 때 유리하다.
베이지안 최적화는 지금까지의 결과를 보고 '다음엔 이쪽이 유망하다'고 똑똑하게 다음 후보를 고르는 방식이다.

처음에는 랜덤 서치로 대략 좋은 영역을 찾고, 그 근처에서 그리드 서치로 촘촘히 다듬는 2단계 전략이 실전에서 효율적이다.
어떤 방법을 쓰든, 점수는 반드시 교차검증으로 매겨야 운이 아니라 실력으로 고른 것이 된다.`},{h:"여럿이 모이면 똑똑해진다 - 앙상블",body:`한 사람의 판단보다 여러 전문가의 의견을 모은 다수결이 대체로 더 정확하다.
앙상블은 이 상식을 모델에 적용해, 여러 모델의 예측을 합쳐 더 안정적이고 정확한 결론을 만든다.
배깅은 서로 조금씩 다른 모델을 동시에 키워 평균을 내고(랜덤포레스트가 대표), 부스팅은 앞 모델의 실수를 뒤 모델이 메우며 순서대로 키운다.

부스팅 계열(GradientBoosting, XGBoost 등)은 표 형태 데이터에서 특히 강력해 실무에서 자주 쓰인다.
다만 모델이 무거워지고 느려질 수 있으니, 마지막에는 경량화로 속도와 정확도의 균형을 맞춰 준다.`},{h:"과적합을 붙잡는 두 손잡이 - 정규화와 조기종료",body:`과적합은 모델이 학습 데이터를 '이해'한 게 아니라 '통째로 외워' 버린 상태다. 시험 문제를 외운 학생처럼, 본 문제(학습 점수)는 만점인데 처음 보는 문제(테스트 점수)는 형편없다. Day1에서 배운 교차검증이 이 병을 '진단'하는 도구였다면, 오늘 배울 정규화와 조기종료는 병을 '치료'하는 두 손잡이다.

첫 번째 손잡이는 정규화(Regularization)다. 아이디어는 단순하다. 모델이 너무 복잡해지려 하면 벌점을 매겨 억제하는 것이다. 선형 모델을 예로 들면, 각 특징에 붙는 가중치가 클수록 그 특징에 예민하게 휘둘린다는 뜻이라 벌점을 준다. 벌점을 가중치의 제곱합으로 매기는 것이 L2(릿지, Ridge)로, 모든 가중치를 부드럽게 0쪽으로 눌러 준다. 벌점을 가중치의 절댓값합으로 매기는 것이 L1(라쏘, Lasso)으로, 쓸모없는 특징의 가중치를 아예 0으로 만들어 자동으로 변수 선택까지 해 준다. 사이킷런에서는 규제 세기를 나타내는 값(선형모델의 alpha, 로지스틱회귀의 C)이 이 손잡이의 다이얼이다. 트리 계열에서는 '깊이를 제한하고(max_depth), 잎에 최소 몇 개는 있어야(min_samples_leaf)'가 같은 역할의 규제다.

두 번째 손잡이는 조기종료(Early Stopping)다. 부스팅이나 신경망처럼 여러 번 반복하며 조금씩 학습하는 모델에서 특히 쓴다. 학습을 반복할수록 학습 점수는 계속 올라가지만, 검증 점수는 어느 지점부터 도리어 떨어지기 시작한다. 바로 그 순간이 외우기가 시작되는 지점이다. 조기종료는 학습 도중 일부 데이터를 '중간점검용'으로 떼어 두고, 검증 점수가 일정 횟수(인내심, n_iter_no_change) 동안 나아지지 않으면 학습을 스스로 멈춘다. 덕분에 과적합도 막고 불필요한 학습 시간도 아끼는 일석이조다.

두 손잡이를 언제 쓰느냐를 정리하면 이렇다. 학습/검증 점수 차이가 벌어지면 규제를 세게(정규화 강화, 트리 깊이 축소), 반복 학습형 모델이면 조기종료를 켜서 '알아서 멈추게' 한다. 그리고 어느 손잡이를 돌리든, 효과는 반드시 교차검증 점수로 확인한다는 원칙은 그대로다.`}]},realCodes:[{title:"GridSearchCV 로 랜덤포레스트 자동 튜닝 + 베이스라인 비교(엔드투엔드)",lang:"python",note:`후보 조합을 격자로 정의하고, 교차검증으로 가장 좋은 설정을 자동으로 찾은 뒤 테스트 점수까지 비교한다.
각 줄 주석으로 '무엇을 왜' 하는지 따라가면 그대로 재현할 수 있다.`,code:`from sklearn.datasets import load_iris                 # 연습용 데이터
from sklearn.model_selection import train_test_split, GridSearchCV  # 분할 + 자동 튜닝 도구
from sklearn.ensemble import RandomForestClassifier     # 트리 여러 개를 모은 앙상블 모델

# 1) 데이터 준비 및 분할
X, y = load_iris(return_X_y=True)     # 설명데이터 X, 정답 y 를 한 번에 받기
X_tr, X_te, y_tr, y_te = train_test_split(   # 학습 80% / 테스트 20%
    X, y, test_size=0.2, stratify=y, random_state=42)  # 비율 유지 + 재현성 고정

# 2) 베이스라인: 기본 설정 그대로의 랜덤포레스트
base = RandomForestClassifier(random_state=42)  # 손잡이를 안 건드린 기본 모델
base.fit(X_tr, y_tr)                              # 학습
base_acc = base.score(X_te, y_te)                # 테스트 정확도(기준점)
print('베이스라인 정확도:', round(base_acc, 3))   # 결과 예: 베이스라인 정확도: 0.933

# 3) 튜닝할 손잡이(하이퍼파라미터) 후보를 격자로 정의
param_grid = {
    'n_estimators': [50, 100, 200],   # 트리 개수: 많을수록 안정적이지만 느려짐
    'max_depth': [2, 3, 4, None],      # 트리 최대 깊이: 깊을수록 복잡(과적합 위험)
    'min_samples_leaf': [1, 2, 4],     # 잎 노드 최소 샘플 수: 클수록 단순(과적합 억제)
}

# 4) GridSearchCV: 모든 조합 x 5겹 교차검증으로 자동 시험
grid = GridSearchCV(
    RandomForestClassifier(random_state=42),  # 튜닝 대상 모델
    param_grid,                               # 위에서 정의한 후보 격자
    cv=5,                                     # 5겹 교차검증으로 공정 평가
    n_jobs=-1,                                # 가능한 CPU 코어를 모두 사용(속도 향상)
)
grid.fit(X_tr, y_tr)   # 모든 조합을 시험(시간이 조금 걸림)

# 5) 가장 좋았던 설정과 그때의 교차검증 점수 확인
print('최적 파라미터:', grid.best_params_)             # 예: {'max_depth': 3, 'min_samples_leaf': 1, 'n_estimators': 100}
print('최적 교차검증 점수:', round(grid.best_score_, 3))  # 예: 최적 교차검증 점수: 0.95

# 6) 최적 모델로 테스트 점수 측정 후 베이스라인과 비교
best_acc = grid.best_estimator_.score(X_te, y_te)  # 최적 모델의 테스트 정확도
print('튜닝 후 정확도:', round(best_acc, 3))         # 결과 예: 튜닝 후 정확도: 0.967
print('향상폭:', round(best_acc - base_acc, 3))      # 결과 예: 향상폭: 0.034`},{title:"조기종료(Early Stopping)로 과적합 막기",lang:"python",note:`검증 점수가 일정 횟수 동안 좋아지지 않으면 학습을 스스로 멈춘다.
불필요한 학습을 줄여 과적합과 시간 낭비를 동시에 막는다.`,code:`from sklearn.datasets import load_breast_cancer        # 유방암 진단(이진 분류) 데이터
from sklearn.model_selection import train_test_split
from sklearn.ensemble import HistGradientBoostingClassifier  # 조기종료를 지원하는 부스팅 모델

# 1) 데이터 준비 및 분할
X, y = load_breast_cancer(return_X_y=True)   # X: 종양 특징들, y: 양성/악성(0/1)
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)

# 2) 조기종료 옵션을 켠 부스팅 모델 정의
model = HistGradientBoostingClassifier(
    max_iter=1000,            # 최대 1000번까지 학습 시도(상한선)
    early_stopping=True,      # 더 나아지지 않으면 일찍 멈추기 ON
    validation_fraction=0.2,  # 학습 데이터 중 20%를 '중간점검용'으로 떼어 둠
    n_iter_no_change=15,      # 15번 연속 개선 없으면 멈춤(인내심 한도)
    random_state=42,
)
model.fit(X_tr, y_tr)         # 학습(조건을 만족하면 1000번을 다 채우지 않고 멈춤)

# 3) 실제로 몇 번 만에 멈췄는지, 점수는 얼마인지 확인
print('실제 학습 횟수:', model.n_iter_)            # 예: 실제 학습 횟수: 87 (1000보다 훨씬 적음)
print('테스트 정확도:', round(model.score(X_te, y_te), 3))  # 결과 예: 테스트 정확도: 0.965`}],periods:["1교시 복습 - 하이퍼파라미터란 무엇인가(모델의 '설정 손잡이')","2교시 탐색 방법 비교: Grid · Random · Bayesian","3교시 [실습] GridSearchCV 로 자동 튜닝하기","4교시 과적합 다시 보기 - 정규화와 조기종료(early stopping)","5교시 [실습] 조기종료로 과적합 막기","6교시 앙상블 - 배깅 · 부스팅 · 스태킹의 직관","7교시 [실습] 앙상블(RandomForest·GradientBoosting)로 성능 끌어올리기","8교시 [운영] MLOps 관점 모델 성능 관리와 Drift(데이터·컨셉) 대응 전략"]}};export{e as default};
