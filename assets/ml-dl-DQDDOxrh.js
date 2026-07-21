const n={"ml-dl-1":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 · 머신러닝이 뭐길래? 학습 유형(지도·비지도·강화) 한눈에"},{time:"10:00–10:50",topic:"2교시 · 회귀 vs 분류 · 대표 알고리즘 지도 그리기"},{time:"11:00–11:50",topic:"3교시 [실습] Colab 켜고 붓꽃 데이터 불러와 살펴보기"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 · 데이터 분할·과적합·일반화: 왜 시험은 따로 봐야 할까"},{time:"14:00–14:50",topic:"5교시 [실습] train_test_split 으로 학습/평가 데이터 나누기"},{time:"15:00–15:50",topic:"6교시 · 평가지표(정확도·정밀도·재현율·F1·ROC) 쉽게 이해하기"},{time:"16:00–16:50",topic:"7교시 [실습] scikit-learn 분류 모델 학습하고 점수 매기기"},{time:"17:00–17:50",topic:"8교시 [실습] 모델 바꿔가며 성능 비교 · 혼동행렬 해석"}],practice:{title:"scikit-learn 으로 붓꽃(Iris) 품종 분류 모델 만들기",steps:["Google Colab(colab.research.google.com)에 접속해 '새 노트'를 만들고, 첫 셀에 `import sklearn` 을 입력한 뒤 Shift+Enter 로 실행해 오류가 없으면 환경이 준비된 것이다.","`from sklearn.datasets import load_iris` 로 붓꽃 데이터를 불러오는 함수를 가져오고, `iris = load_iris()` 로 데이터를 변수에 담는다.","`import pandas as pd` 후 `df = pd.DataFrame(iris.data, columns=iris.feature_names)` 로 표 형태로 바꾸고, `df['target'] = iris.target` 으로 정답(품종) 열을 붙인 뒤 `df.head()` 를 실행하면 위 5줄 표가 보인다.","`from sklearn.model_selection import train_test_split` 을 가져와 `X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.2, random_state=42)` 로 학습용 80%·평가용 20% 로 나눈다.","`from sklearn.tree import DecisionTreeClassifier` 를 가져와 `model = DecisionTreeClassifier(random_state=42)` 로 모델 객체를 만들고, `model.fit(X_train, y_train)` 으로 학습시킨다(공부시키기).","`pred = model.predict(X_test)` 로 평가용 데이터의 품종을 예측하게 하고, `from sklearn.metrics import accuracy_score` 후 `print(accuracy_score(y_test, pred))` 를 실행하면 0.9~1.0 사이 정확도 숫자가 출력된다(기대 결과: 약 1.0).","`from sklearn.metrics import classification_report` 후 `print(classification_report(y_test, pred))` 로 품종별 정밀도·재현율·F1 점수표를 확인한다.","모델을 `from sklearn.neighbors import KNeighborsClassifier` 의 `KNeighborsClassifier()` 로 바꿔 같은 과정을 반복해 두 모델의 정확도를 비교한다.","`from sklearn.metrics import confusion_matrix` 후 `print(confusion_matrix(y_test, pred))` 로 어떤 품종을 어떤 품종으로 헷갈렸는지(혼동행렬) 확인하고 한 줄로 해석을 적는다."],deliverable:"두 모델(결정트리·KNN)의 정확도·classification_report·혼동행렬을 모두 실행한 Colab 노트(.ipynb) 1개와, 어느 모델이 더 좋았는지 한 줄 결론"}},examples:[{title:"데이터 모양 확인하기",lang:"python",code:`from sklearn.datasets import load_iris  # 붓꽃 데이터 로더
iris = load_iris()                       # 데이터 불러오기
print(iris.data.shape)   # 결과: (150, 4)  150송이, 특징 4개
print(iris.target_names) # 결과: ['setosa' 'versicolor' 'virginica']`,note:"모델을 만들기 전에 데이터가 몇 행 몇 열인지, 정답 종류가 무엇인지 먼저 확인하는 습관이 중요하다."},{title:"정확도 한 줄로 구하기",lang:"python",code:`from sklearn.metrics import accuracy_score  # 정확도 계산 함수
y_true = [0, 1, 1, 0]   # 실제 정답
y_pred = [0, 1, 0, 0]   # 모델 예측 (3번째만 틀림)
print(accuracy_score(y_true, y_pred))  # 결과: 0.75  (4개 중 3개 맞음)`,note:"정확도는 '전체 중 맞힌 비율'이라 직관적이지만, 정답이 한쪽으로 치우치면 정밀도·재현율도 함께 봐야 한다."},{title:"랜덤포레스트로 성능 끌어올리기",lang:"python",code:`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier  # 트리 여러 그루의 앙상블

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# 단일 결정트리
tree = DecisionTreeClassifier(random_state=42).fit(X_tr, y_tr)
# 트리 100그루를 학습시키는 랜덤포레스트
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_tr, y_tr)

print('단일 트리:', round(tree.score(X_te, y_te), 3))
print('랜덤포레스트:', round(rf.score(X_te, y_te), 3))  # 보통 더 안정적으로 높게 나옴
`,note:"트리 여러 그루의 다수결이 단일 트리보다 흔들림이 적고 과적합에 강하다."},{title:"혼동행렬 그려서 어디서 틀렸는지 찾기",lang:"python",code:`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

# 붓꽃 데이터를 불러와 학습/평가로 나눈다
X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# 랜덤포레스트로 학습하고 평가용을 예측한다
model = RandomForestClassifier(n_estimators=100, random_state=42).fit(X_tr, y_tr)
pred = model.predict(X_te)

# 혼동행렬을 숫자로 확인한다 (행=실제 품종, 열=예측 품종)
cm = confusion_matrix(y_te, pred)
print(cm)   # 대각선이 정답, 대각선을 벗어난 칸이 헷갈린 개수

# 그림으로 보면 어느 품종끼리 혼동했는지 바로 보인다
ConfusionMatrixDisplay(cm, display_labels=load_iris().target_names).plot()
plt.title('붓꽃 분류 혼동행렬')
plt.show()
# 보통 setosa 는 완벽, versicolor 와 virginica 사이에서 한두 개 헷갈린다`,note:"정확도 숫자 하나로는 안 보이던 '어느 품종을 어느 품종으로 헷갈렸는지'가 혼동행렬에서는 한눈에 드러난다. 8교시 모델 비교 실습의 마무리로 쓴다."},{title:"파이프라인 + 누수(leakage) 방지",lang:"python",code:`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# 스케일러를 파이프라인에 넣으면 CV의 각 fold에서 train으로만 fit된다
# → 테스트 정보가 전처리에 새는 '데이터 누수'를 방지
pipe = Pipeline([
    ("scaler", StandardScaler()),     # 평균0/분산1 정규화
    ("clf", LogisticRegression(max_iter=1000)),
])
# cross_val_score(pipe, X, y, cv=5) 로 누수 없이 평가`,note:"전처리를 파이프라인에 포함해야 교차검증에서 데이터 누수가 없다. 흔한 실수 1순위."},{title:"분류 평가: 정확도만으로 부족 — 정밀도·재현율·F1",lang:"python",code:`# 정확도 하나로는 못 보는 것을 classification_report 로 한 번에
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# 유방암 데이터(양성/악성 2분류)
X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)

model = RandomForestClassifier(random_state=0).fit(X_tr, y_tr)  # 학습
pred = model.predict(X_te)                                      # 예측

# precision·recall·f1 을 클래스별로 한 번에 출력
print(classification_report(y_te, pred, target_names=['악성', '양성']))
# 정밀도: 양성이라 예측한 것 중 진짜 양성 비율
# 재현율: 진짜 양성 중 양성이라 맞힌 비율(놓치면 안 되는 진단에서 특히 중요)
# 정확도만 높고 재현율이 낮으면 '실제 환자를 놓치는' 모델이라 쓰기 어렵다.`,note:'통계교재 모델평가 FAQ "정확도는 높은데 재현율이 낮으면 활용 가능한가?"를 실습으로. 정답이 한쪽으로 치우친 문제에서 정확도가 왜 함정인지, 재현율이 왜 병 진단에서 결정적인지 체감시킨다.'},{title:"회귀 문제 평가 — R²와 RMSE (분류가 아닌 숫자 예측)",lang:"python",code:`# 집값처럼 '숫자'를 예측하는 회귀: 정확도 대신 R2·RMSE 로 평가
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
import numpy as np

# 캘리포니아 주택 데이터(집값을 숫자로 예측 -> 회귀)
X, y = fetch_california_housing(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)

reg = LinearRegression().fit(X_tr, y_tr)  # 최소제곱으로 직선(면) 적합
pred = reg.predict(X_te)                  # 테스트 집값 예측

# R2(결정계수): 1에 가까울수록 잘 설명 / RMSE: 예측 오차 크기(작을수록 좋음)
print('R2  :', round(r2_score(y_te, pred), 3))
print('RMSE:', round(np.sqrt(mean_squared_error(y_te, pred)), 3))
# 분류의 '정확도' 자리를, 회귀에서는 R2·RMSE 가 대신한다.`,note:'커리큘럼의 "회귀와 분류"에서 사이트엔 분류 예제만 있었다. 통계교재의 회귀분석·결정계수·RMSE 개념을 sklearn으로 연결해, 문제 유형에 따라 평가지표가 달라진다는 핵심을 보여준다.'},{title:"ROC-AUC — 임계값에 상관없는 분류 성능 보기",lang:"python",code:`# 예측 '확률'의 품질을 ROC 곡선과 AUC 로 평가
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score, roc_curve
import matplotlib.pyplot as plt

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)

model = LogisticRegression(max_iter=5000).fit(X_tr, y_tr)
proba = model.predict_proba(X_te)[:, 1]  # 양성일 '확률'(0/1 아닌 확신 정도)

# AUC: ROC 곡선 아래 면적, 0.5=찍기 / 1.0=완벽
print('ROC-AUC:', round(roc_auc_score(y_te, proba), 3))

fpr, tpr, _ = roc_curve(y_te, proba)  # 임계값을 옮겨가며 거짓양성·참양성 비율
plt.plot(fpr, tpr)                     # 모델의 ROC 곡선
plt.plot([0, 1], [0, 1], '--')         # 대각선 = 무작위 기준선
plt.xlabel('FPR'); plt.ylabel('TPR'); plt.title('ROC 곡선'); plt.show()`,note:"커리큘럼 평가지표에 ROC가 명시되나 사이트에 없었다. predict_proba로 나온 확률에 임계값을 바꿔가며 그리는 곡선이라, 정확도·재현율과 달리 임계값에 독립적인 성능을 본다는 점을 그림으로 이해시킨다."}],concepts:[{term:"머신러닝(Machine Learning)",desc:"사람이 규칙을 일일이 적는 대신, 컴퓨터가 데이터를 보고 스스로 규칙(패턴)을 찾아내게 하는 기술이다."},{term:"지도학습(Supervised Learning)",desc:"문제와 정답을 함께 주고 학습시키는 방식으로, 시험 족보(정답지)를 보며 공부하는 것과 같다."},{term:"비지도학습(Unsupervised Learning)",desc:"정답 없이 데이터만 주고 비슷한 것끼리 묶게 하는 방식으로, 정답을 모른 채 끼리끼리 분류하는 것이다."},{term:"과적합(Overfitting)",desc:"학습 데이터만 통째로 외워버려서 새로운 데이터에는 오히려 못 맞히는 현상으로, 기출문제만 외운 학생과 같다."},{term:"정밀도와 재현율(Precision·Recall)",desc:"정밀도는 '맞다고 한 것 중 진짜 맞은 비율', 재현율은 '실제 맞는 것 중 찾아낸 비율'을 뜻한다."},{term:"F1 점수",desc:"정밀도와 재현율을 한 숫자로 합친 균형 점수로, 둘 다 높아야 F1도 높아진다."},{term:"혼동행렬(Confusion Matrix)",desc:"실제 정답과 모델 예측을 표로 비교해, 무엇을 무엇으로 헷갈렸는지 보여주는 성적표다."},{term:"앙상블(Ensemble)",desc:"한 명의 전문가보다 여러 명의 다수결이 낫다는 발상으로, 여러 모델의 예측을 합쳐 더 안정적인 답을 내는 방식이다."},{term:"랜덤포레스트(Random Forest)",desc:"서로 조금씩 다른 결정트리 수십~수백 그루를 만들어 투표시키는 앙상블로, 단일 트리의 과적합을 크게 줄인다."},{term:"부스팅(Boosting)",desc:"앞 모델이 틀린 부분에 집중해 다음 모델을 이어 붙이며 점점 오답을 줄여가는 방식이다(대표: Gradient Boosting·XGBoost)."},{term:"규제/정규화(Lasso·Ridge)",desc:"가중치가 너무 커지지 않도록 벌점을 주어 과적합을 막는 기법으로, Ridge(L2)는 모든 가중치를 고르게 줄이고 Lasso(L1)는 덜 중요한 피처의 가중치를 0으로 만들어 자동 변수 선택 효과를 낸다."},{term:"AI ⊃ ML ⊃ DL",desc:"인공지능이 가장 큰 개념이고 그 안에 데이터로 규칙을 배우는 머신러닝, 다시 그 안에 신경망을 깊게 쌓은 딥러닝이 포함된다는 포함 관계다."},{term:"모델 성능 영향 요인",desc:"같은 알고리즘이라도 데이터의 양과 질, 피처의 좋고 나쁨, 그리고 편향-분산 트레이드오프(너무 단순하면 과소적합, 너무 복잡하면 과적합)에 따라 성능이 크게 달라진다."}],detail:{topics:[{h:"학습 유형",items:["지도학습(정답 있음)","비지도학습(정답 없음·군집화)","강화학습(보상으로 학습)","각 유형의 대표 활용 사례"]},{h:"대표 알고리즘",items:["트리 기반: 결정트리(Decision Tree)","앙상블: 랜덤포레스트·Gradient Boosting/XGBoost","정규화·커널 기반: Lasso/Ridge, SVM 커널","선형/로지스틱 회귀·KNN(최근접 이웃)"]},{h:"성능 평가",items:["정확도(Accuracy)","정밀도·재현율·F1","ROC 곡선과 AUC","혼동행렬 읽는 법"]}],labs:[{title:"Lab 1 · 내 손으로 데이터 나눠보기",steps:["Colab 새 노트를 열고 `from sklearn.datasets import load_iris` 와 `from sklearn.model_selection import train_test_split` 를 실행한다.","`iris = load_iris()` 로 데이터를 불러온다.","`X_tr, X_te, y_tr, y_te = train_test_split(iris.data, iris.target, test_size=0.3, random_state=0)` 으로 7:3 으로 나눈다.","`print(len(X_tr), len(X_te))` 를 실행해 105 와 45 가 나오는지 확인한다(기대 결과: 105 45)."]},{title:"Lab 2 · 정밀도와 재현율 직접 비교",steps:["위에서 만든 결정트리 모델로 `pred = model.predict(X_te)` 를 실행한다.","`from sklearn.metrics import precision_score, recall_score` 를 가져온다.","`print(precision_score(y_te, pred, average='macro'))` 와 `print(recall_score(y_te, pred, average='macro'))` 를 실행한다.","두 숫자가 비슷한지 보고, 차이가 크면 어떤 품종에서 차이가 났는지 혼동행렬로 확인한다."]},{title:"Lab 3 · 모델 세 개 대결 + 혼동행렬로 오답 분석",steps:["`from sklearn.tree import DecisionTreeClassifier`, `from sklearn.ensemble import RandomForestClassifier`, `from sklearn.neighbors import KNeighborsClassifier` 를 모두 불러온다.","앞에서 나눠 둔 X_tr, y_tr 로 세 모델을 각각 `.fit()` 한 뒤, `for name, m in [('트리',tree),('랜덤포레스트',rf),('KNN',knn)]:` 반복문으로 `m.score(X_te, y_te)` 를 출력해 정확도를 나란히 비교한다.","가장 점수가 낮게 나온 모델을 골라 `confusion_matrix(y_te, m.predict(X_te))` 를 찍어, 어느 품종을 어느 품종으로 헷갈렸는지 대각선 밖의 칸을 찾는다.","`classification_report` 로 그 모델의 품종별 정밀도·재현율을 확인하고, '어느 품종의 재현율이 가장 낮은가, 그 이유가 무엇일지'를 한 줄로 메모한다.","(마무리 토의) 세 모델 중 무엇을 실제 서비스에 쓸지, 정확도 말고 어떤 근거로 골랐는지 팀별로 한 문장씩 발표한다."]}],homework:["scikit-learn 의 `load_wine()` 와인 데이터로 결정트리와 KNN 분류 모델을 각각 학습시키고, 정확도와 classification_report 를 비교해 어느 모델이 더 나은지 한 단락으로 정리해 제출한다.","과적합을 일부러 만들어보자: DecisionTreeClassifier 의 max_depth 를 1, 3, None 으로 바꿔가며 학습용 정확도와 평가용 정확도를 표로 정리하고, 차이가 가장 큰 경우를 찾아 그 이유를 한 줄로 적는다.","load_breast_cancer 데이터로 결정트리·랜덤포레스트·GradientBoosting 세 모델의 평가 정확도를 비교하고, 앙상블이 단일 트리보다 나은지 한 단락으로 정리한다."]},theory:{theory:[{h:"단일 모델을 넘어 여럿이 힘을 합치면: 앙상블",body:`결정트리 한 그루는 데이터를 조금만 바꿔도 결과가 출렁이고 과적합에 약하다.
이를 극복하는 두 갈래가 앙상블이다.
첫째, 배깅 계열(랜덤포레스트)은 데이터와 피처를 조금씩 다르게 뽑아 만든 여러 트리에게 각자 판단하게 한 뒤 다수결로 합쳐, 개별 트리의 실수를 서로 상쇄한다.
둘째, 부스팅 계열은 모델을 순차적으로 이어 붙이되 '앞 모델이 특히 많이 틀린 데이터'에 다음 모델이 더 집중하게 해서 약점을 차례로 메운다.

표 형식(정형) 데이터에서는 XGBoost·LightGBM 같은 부스팅이 딥러닝보다 더 좋은 성능을 내는 경우가 많다는 점도 기억해 두자.`},{h:"과적합을 수식으로 억누르기: 규제(Lasso·Ridge)",body:`선형 모델이 학습 데이터에 지나치게 맞추려 하면 특정 가중치가 폭주하듯 커진다.
규제는 손실 함수에 '가중치가 클수록 벌점'이라는 항을 더해 이를 막는다.
Ridge(L2)는 가중치 제곱합에 벌점을 줘 전체를 부드럽게 줄이고, Lasso(L1)는 절댓값합에 벌점을 줘 쓸모없는 피처의 가중치를 아예 0으로 만들어 '자동 변수 선택' 효과를 낸다.

벌점의 세기(alpha/lambda)가 하이퍼파라미터인데, 너무 크면 과소적합, 너무 작으면 과적합이 되므로 균형을 잡는 감각이 필요하다.`},{h:"머신러닝은 '규칙을 찾아내는' 일이다",body:`옛날 프로그램은 사람이 '이러면 이렇게 하라'는 규칙을 전부 손으로 적었다.
하지만 스팸 메일을 거르는 규칙을 사람이 다 적기란 불가능에 가깝다.
머신러닝은 반대로, 정상 메일과 스팸 메일을 잔뜩 보여주면 컴퓨터가 스스로 '이런 단어가 많으면 스팸'이라는 규칙을 찾아낸다.

즉 사람은 데이터와 정답만 준비하고, 규칙 찾기는 컴퓨터에게 맡기는 것이다.
이것이 머신러닝의 핵심 발상이다.`},{h:"왜 학습용과 평가용을 나눌까",body:`공부한 문제로 시험을 보면 누구나 100점을 맞는다.
그래서 모델의 진짜 실력은 '한 번도 못 본 문제'로 재야 한다.
이를 위해 데이터를 학습용(공부)과 평가용(시험)으로 나눈다.

학습용으로만 fit(학습)하고 평가용으로 점수를 매기면, 이 모델이 처음 보는 데이터에서도 잘할지 가늠할 수 있다.
평가용 점수가 학습용보다 크게 낮으면 과적합을 의심해야 한다.`},{h:"머신러닝의 세 가지 학습 유형 — 지도·비지도·강화",body:`(1교시 도입 강의. 알고리즘을 배우기 전에 '문제의 종류'부터 나누는 지도를 그려 준다.)

머신러닝을 처음 배울 때 가장 먼저 잡아야 할 감각은 '내가 풀려는 문제가 어떤 종류인가'다. 문제의 종류가 정해지면 쓸 수 있는 알고리즘의 후보가 자동으로 좁혀지기 때문이다. 크게 세 갈래로 나뉜다.

첫째, 지도학습(Supervised)은 '입력과 정답이 짝지어진 데이터'로 배운다. 붓꽃의 꽃잎 크기(입력)와 품종(정답)을 함께 보여주면, 컴퓨터가 '이 크기면 이 품종'이라는 규칙을 스스로 찾는다. 정답이 붙어 있어 채점이 가능하고, 우리가 실무에서 만나는 대부분의 예측 문제(스팸 분류, 매출 예측, 이탈 예측)가 여기에 속한다.

둘째, 비지도학습(Unsupervised)은 '정답 없이 데이터만' 주고 스스로 구조를 찾게 한다. 고객 1만 명을 비슷한 소비 성향끼리 몇 개의 그룹으로 묶는 군집화(clustering)가 대표 예다. 정답이 없으니 '맞다/틀리다'로 채점할 수는 없고, '얼마나 자연스럽게 묶였나'로 평가한다.

셋째, 강화학습(Reinforcement)은 '행동하고 보상을 받으며' 배운다. 바둑 AI가 수를 두고 이기면 +1, 지면 -1을 받아 점점 좋은 수를 학습하는 방식이다. 정답을 직접 알려주지 않고 '결과가 좋았는지'만 알려준다는 점이 핵심이다.

핵심 포인트 — 왜 중요한가: 세 유형은 '데이터에 정답이 있는가, 있다면 어떤 형태인가'로 갈린다. 오늘 우리가 다룰 붓꽃 분류는 정답(품종)이 있는 지도학습이며, 그중에서도 정답이 '카테고리'인 분류(classification) 문제다. 이 지도를 머리에 그려두면 새 프로젝트를 만났을 때 '이건 지도학습 분류구나, 그럼 결정트리·랜덤포레스트를 후보로 두자'처럼 바로 방향을 잡을 수 있다.`},{h:"회귀 vs 분류, 그리고 대표 알고리즘 지도 그리기",body:`(2교시 강의. 지도학습을 회귀와 분류로 쪼개고, 오늘 이후 만날 알고리즘들을 한 장의 지도로 정리한다.)

지도학습은 '정답의 생김새'에 따라 다시 둘로 나뉜다. 정답이 숫자(연속값)면 회귀(Regression), 정답이 카테고리(라벨)면 분류(Classification)다. 내일 팔릴 아이스크림 개수를 맞히는 건 회귀, 이 메일이 스팸인지 아닌지를 맞히는 건 분류다. 같은 데이터라도 '무엇을 맞히려 하는가'에 따라 회귀가 되기도 분류가 되기도 한다 — 시험 점수(숫자)를 예측하면 회귀, 합격/불합격(라벨)을 예측하면 분류다.

이제 대표 알고리즘을 지도로 묶어 보자. 첫째, 트리 기반 — 결정트리(Decision Tree)는 '스무고개'처럼 질문을 던져 데이터를 갈라 나간다. '꽃잎 길이가 2.5cm보다 큰가?'로 나누고, 또 나누고… 규칙이 사람 눈에 보여 해석이 쉽다는 게 최대 장점이다. 다만 한 그루는 데이터가 조금만 바뀌어도 결과가 출렁이고 과적합에 약하다.

둘째, 앙상블 — 이 약점을 여럿의 힘으로 메운다. 랜덤포레스트는 조금씩 다른 트리 수백 그루의 다수결로 흔들림을 줄이고(배깅), 부스팅(XGBoost·LightGBM)은 앞 모델이 틀린 데이터에 다음 모델이 집중하도록 순차로 이어 붙인다. 정형(표) 데이터에서는 이 부스팅 계열이 딥러닝을 이기는 경우가 많다.

셋째, 선형·규제 계열 — 선형/로지스틱 회귀는 입력에 가중치를 곱해 더하는 단순한 모델이고, 여기에 Lasso·Ridge 같은 규제를 더하면 과적합을 억누른다. 넷째, 거리 기반 — KNN은 '가장 가까운 이웃 k개가 뭐였나'로 판단한다.

핵심 포인트 — 왜 중요한가: 알고리즘을 하나하나 외우기보다, '트리→앙상블, 선형→규제, 거리→KNN'처럼 계보로 묶어 두면 오늘 실습에서 모델을 갈아 끼울 때 '왜 이걸 고르는지'를 설명할 수 있다. 오늘은 결정트리와 랜덤포레스트를 직접 돌려 이 지도를 손으로 확인한다.`},{h:"정확도만 믿으면 안 되는 이유 — 정밀도·재현율·F1·ROC 읽기",body:`(6교시 강의. 실습에서 나오는 classification_report의 각 숫자를 '말로 설명'할 수 있게 만든다.)

모델이 90점(정확도 90%)이라고 하면 좋아 보이지만, 함정이 있다. 암 환자가 100명 중 5명뿐인 데이터에서 '전원 정상'이라고만 답해도 정확도는 95%다. 정작 중요한 암 환자는 한 명도 못 잡았는데 말이다. 그래서 정확도(Accuracy) 하나로는 부족하고, 혼동행렬에서 나오는 네 칸(TP·FP·FN·TN)을 바탕으로 두 지표를 더 본다.

정밀도(Precision)는 '스팸이라고 예측한 것 중 진짜 스팸의 비율'이다 — 헛알람(정상 메일을 스팸함에 넣는 실수)을 얼마나 안 냈는지를 본다. 재현율(Recall)은 '실제 스팸 중 몇 개나 잡아냈는가'다 — 놓친 것(진짜 스팸을 통과시킴)을 얼마나 줄였는지를 본다. 이 둘은 보통 한쪽을 올리면 다른 쪽이 내려가는 시소 관계다. 스팸을 하나도 놓치지 않으려 기준을 빡세게 잡으면 멀쩡한 메일까지 스팸으로 몰려 정밀도가 떨어진다.

F1 점수는 이 둘의 조화평균으로, 정밀도와 재현율이 둘 다 어느 정도 높아야 F1이 높아진다 — 한쪽만 좋으면 F1은 낮게 나오므로 '균형 잡힌 성적표'라 부른다. ROC 곡선은 판단 기준(임계값)을 바꿔가며 '잘 잡는 정도 vs 헛알람 정도'가 어떻게 변하는지를 그린 그래프이고, 그 아래 면적이 AUC다. AUC가 1에 가까울수록, 즉 곡선이 왼쪽 위로 붙을수록 좋은 모델이다.

핵심 포인트 — 왜 중요한가: 어떤 지표를 볼지는 '무엇을 틀리면 더 아픈가'로 정한다. 암 진단·불량 검출처럼 놓치면 치명적인 문제는 재현율을, 스팸함·추천처럼 헛알람이 성가신 문제는 정밀도를 우선한다. 실습의 classification_report를 볼 때 숫자만 읽지 말고 '이 문제에선 어느 칸이 더 중요한가'를 함께 말하는 습관을 들이자.`}]},realCodes:[{title:"붓꽃 분류 엔드투엔드: 적재 → 분할 → 학습 → 평가",lang:"python",code:`# 데이터셋과 도구들을 한 번에 불러온다
from sklearn.datasets import load_iris            # 붓꽃 예제 데이터 로더
from sklearn.model_selection import train_test_split  # 데이터 분할 함수
from sklearn.tree import DecisionTreeClassifier   # 결정트리 분류 모델
from sklearn.metrics import accuracy_score, classification_report  # 평가 지표

# 붓꽃 데이터를 메모리로 불러온다 (꽃잎/꽃받침 길이 등 4개 특징)
iris = load_iris()
X = iris.data        # 입력값(특징) 150송이 x 4개 숫자
y = iris.target      # 정답(품종) 0,1,2 세 종류

# 학습용 80% / 평가용 20% 로 나눈다 (random_state=42 로 결과 고정)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# 결정트리 모델을 만들고 학습용 데이터로 규칙을 학습시킨다
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)   # fit = 공부시키기

# 한 번도 안 본 평가용 데이터로 품종을 예측한다
pred = model.predict(X_test)

# 정확도를 출력한다  # 결과: 약 1.0 (거의 다 맞춤)
print("정확도:", accuracy_score(y_test, pred))
# 품종별 정밀도/재현율/F1 표를 출력한다
print(classification_report(y_test, pred))`,note:"데이터를 불러와 나누고, 학습하고, 처음 보는 데이터로 평가하는 머신러닝의 가장 기본 4단계를 한 흐름으로 보여준다."}],periods:["1교시 · 머신러닝이 뭐길래? 학습 유형(지도·비지도·강화) 한눈에","2교시 · 회귀 vs 분류 · 대표 알고리즘 지도 그리기","3교시 [실습] Colab 켜고 붓꽃 데이터 불러와 살펴보기","4교시 · 데이터 분할·과적합·일반화: 왜 시험은 따로 봐야 할까","5교시 [실습] train_test_split 으로 학습/평가 데이터 나누기","6교시 · 평가지표(정확도·정밀도·재현율·F1·ROC) 쉽게 이해하기","7교시 [실습] scikit-learn 분류 모델 학습하고 점수 매기기","8교시 [실습] 모델 바꿔가며 성능 비교 · 혼동행렬 해석"]},"ml-dl-2":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 · 신경망이란? 뇌의 뉴런에서 빌려온 아이디어"},{time:"10:00–10:50",topic:"2교시 · 퍼셉트론과 다층 신경망(MLP) 구조 그려보기"},{time:"11:00–11:50",topic:"3교시 [실습] PyTorch 설치 확인 · 텐서(Tensor) 다뤄보기"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 · 순전파·역전파: 모델이 틀리고 고치는 과정"},{time:"14:00–14:50",topic:"5교시 · 활성화 함수와 손실 함수 · 옵티마이저(SGD/Adam)"},{time:"15:00–15:50",topic:"6교시 [실습] nn.Module 로 신경망 한 개 쌓아보기"},{time:"16:00–16:50",topic:"7교시 [실습] 학습 루프(forward→loss→backward→step) 돌리기"},{time:"17:00–17:50",topic:"8교시 [실습] 학습 곡선 그려 손실이 줄어드는지 확인"}],practice:{title:"PyTorch 로 손글씨 숫자(Digits) 분류 신경망 학습하기",steps:["Colab 새 노트에서 `import torch` 와 `import torch.nn as nn` 을 실행하고, `print(torch.__version__)` 로 버전이 출력되면 PyTorch 가 준비된 것이다.","`from sklearn.datasets import load_digits` 로 8x8 손글씨 숫자 데이터를 불러오고, `d = load_digits()` 로 담은 뒤 `print(d.data.shape)` 로 (1797, 64) 가 나오는지 확인한다.","`from sklearn.model_selection import train_test_split` 후 학습/평가로 나누고, `X_train = torch.tensor(X_train, dtype=torch.float32)` 처럼 입력은 float, 정답은 `torch.long` 텐서로 변환한다.","`model = nn.Sequential(nn.Linear(64, 32), nn.ReLU(), nn.Linear(32, 10))` 로 입력 64 → 은닉 32 → 출력 10(숫자 0~9) 신경망을 만든다.","`loss_fn = nn.CrossEntropyLoss()` 로 분류용 손실 함수를, `optimizer = torch.optim.Adam(model.parameters(), lr=0.01)` 로 옵티마이저를 준비한다.","`for epoch in range(100):` 반복 안에서 `optimizer.zero_grad()` → `out = model(X_train)` → `loss = loss_fn(out, y_train)` → `loss.backward()` → `optimizer.step()` 순서로 학습 루프를 작성한다.","10 에폭마다 `print(epoch, loss.item())` 를 출력해 손실(loss) 숫자가 점점 줄어드는지 확인한다(기대 결과: 처음 2.x 에서 0.1 이하로 감소).","학습이 끝나면 `with torch.no_grad():` 안에서 `pred = model(X_test).argmax(dim=1)` 로 예측하고, `(pred == y_test).float().mean()` 으로 평가 정확도를 계산해 출력한다.","에폭별 loss 를 리스트에 모아 `import matplotlib.pyplot as plt; plt.plot(losses)` 로 학습 곡선을 그려 우하향하는지 눈으로 확인한다."],deliverable:"손실이 우하향하는 학습 곡선 그래프와 평가 정확도(대략 0.95 이상)가 출력된 Colab 노트 1개"}},examples:[{title:"텐서 만들고 계산하기",lang:"python",code:`import torch                       # 파이토치 불러오기
a = torch.tensor([1.0, 2.0, 3.0])  # 1차원 텐서(벡터) 생성
b = a * 2                          # 모든 원소에 2를 곱함
print(b)        # 결과: tensor([2., 4., 6.])
print(b.sum())  # 결과: tensor(12.)  모든 원소의 합`,note:"텐서는 넘파이 배열과 거의 똑같이 쓰지만, GPU 연산과 자동 미분을 지원한다는 점이 다르다."},{title:"ReLU 활성화 함수 체험",lang:"python",code:`import torch
import torch.nn as nn          # 신경망 모듈
relu = nn.ReLU()               # 음수는 0, 양수는 그대로
x = torch.tensor([-2.0, -0.5, 0.0, 1.5])  # 음수와 양수 섞인 입력
print(relu(x))  # 결과: tensor([0., 0., 0., 1.5])  음수가 모두 0이 됨`,note:"ReLU 는 음수 신호를 잘라내 신경망에 비선형성을 더해, 직선으로 못 푸는 문제도 풀게 해준다."},{title:"nn.Module 클래스로 나만의 신경망 정의하기",lang:"python",code:`import torch
import torch.nn as nn

# nn.Module 을 상속해 나만의 신경망 클래스를 만든다
class MyMLP(nn.Module):
    def __init__(self):
        super().__init__()                 # 부모 초기화(필수)
        self.fc1 = nn.Linear(64, 32)       # 입력 64 -> 은닉 32
        self.act = nn.ReLU()               # 비선형 문지기
        self.fc2 = nn.Linear(32, 10)       # 은닉 32 -> 출력 10(클래스 수)

    def forward(self, x):                  # 데이터가 흘러가는 순서를 적는다
        x = self.fc1(x)                    # 1층 통과
        x = self.act(x)                    # 활성화
        x = self.fc2(x)                    # 2층(출력)
        return x                          # 클래스별 점수를 반환

model = MyMLP()
print(model)                               # 층 구조가 예쁘게 출력된다

# 가짜 입력 한 줄(64차원)을 넣어 출력 모양을 확인한다
dummy = torch.randn(1, 64)
print(model(dummy).shape)   # 결과: torch.Size([1, 10])  10개 클래스 점수`,note:"nn.Sequential 로도 되지만, 실무 코드는 대부분 nn.Module 을 상속한 클래스로 짠다. __init__ 에 부품을 선언하고 forward 에 흐름을 적는 이 골격이 PyTorch 의 표준이다. 6교시 '신경망 한 개 쌓아보기'의 정석 버전."},{title:"검증 + 조기종료(Early Stopping)",lang:"python",code:`best, patience, wait = 1e9, 3, 0   # 최저 검증손실, 인내 횟수
for epoch in range(100):
    train_one_epoch(model, train_loader, opt, loss_fn)
    val_loss = evaluate(model, val_loader, loss_fn)  # 검증 손실
    if val_loss < best:
        best, wait = val_loss, 0
        torch.save(model.state_dict(), "best.pt")  # 개선 시 체크포인트
    else:
        wait += 1
        if wait >= patience:      # 개선이 없으면 중단(과적합 방지)
            print(f"early stop @ {epoch}"); break`,note:"검증 손실이 patience 에폭 동안 개선되지 않으면 멈춘다. 과적합 직전의 가중치를 저장해 일반화 성능을 확보."},{title:"PyTorch 최소 학습 루프 5줄 골격",lang:"python",code:`import torch
# 딥러닝 학습은 결국 이 4단계의 반복이다(그림처럼 외워두자)
for xb, yb in train_loader:
    opt.zero_grad()             # ① 이전 배치의 기울기 초기화
    pred = model(xb)            # ② 순전파: 예측 계산
    loss = loss_fn(pred, yb)    # ③ 손실: 정답과의 오차
    loss.backward()            # ④-a 역전파: 각 가중치의 기울기 계산
    opt.step()                  # ④-b 옵티마이저가 가중치 갱신
# zero_grad를 빠뜨리면 기울기가 누적돼 학습이 망가진다(가장 흔한 버그)`,note:"모든 PyTorch 학습은 zero_grad→forward→loss→backward→step의 반복이다. 이 골격만 익히면 어떤 모델도 학습 루프를 짤 수 있다."},{title:"드롭아웃·배치정규화로 과적합 줄이기",lang:"python",code:`import torch.nn as nn
# 층 사이에 규제(regularization)를 끼워 일반화 성능을 높인다
model = nn.Sequential(
    nn.Linear(20, 64), nn.BatchNorm1d(64), nn.ReLU(),  # 배치정규화=학습 안정화
    nn.Dropout(0.3),                                    # 30% 뉴런 임시 차단→과적합↓
    nn.Linear(64, 32), nn.ReLU(),
    nn.Linear(32, 2),
)
# 주의: 평가 시엔 model.eval()로 드롭아웃/BN을 '추론 모드'로 전환해야 한다`,note:"Dropout은 학습 때만 뉴런을 끄고, 평가 땐 model.eval()로 꺼야 한다. BatchNorm과 함께 딥러닝 과적합 제어의 기본 도구."},{title:"합성곱(Conv2d) 한 번 직접 통과시켜 피처맵 뽑기",lang:"python",code:`# 덱의 "필터가 이미지 위를 stride만큼 미끄러지며 특징을 뽑는다"를 코드로 체감
import torch                                  # 파이토치 본체. 텐서(다차원 배열) 연산을 담당한다.
import torch.nn as nn                         # 신경망 층(레이어)들이 모여 있는 모듈. Conv2d도 여기 있다.

# 입력 이미지 한 장을 흉내낸다. 모양은 (배치=1, 채널=1, 높이=5, 너비=5) 이다.
# CNN은 항상 (N, C, H, W) 4차원을 먹는다. 흑백이라 채널은 1개, 크기는 5x5로 작게 잡았다.
x = torch.tensor([[1,2,3,0,1],
                  [0,1,2,3,0],
                  [3,0,1,2,3],
                  [2,3,0,1,2],
                  [1,2,3,0,1]], dtype=torch.float32).reshape(1, 1, 5, 5)

# 합성곱 층 하나를 정의한다. 입력채널1 -> 출력채널1(필터 1장), 커널(돋보기) 크기 3x3.
# padding=0, stride=1 이면 5x5가 3x3으로 줄어든다. 이 "크기 줄어듦"이 덱에서 말한 output size 변형이다.
conv = nn.Conv2d(in_channels=1, out_channels=1, kernel_size=3, stride=1, padding=0)

# 필터 가중치를 직접 지정해 결과를 눈으로 검산할 수 있게 만든다(보통은 학습으로 정해진다).
# 이 3x3 필터가 이미지의 각 위치와 곱-합(합성곱)되어 그 자리의 특징값 하나를 만든다.
conv.weight.data = torch.ones(1, 1, 3, 3)     # 모든 칸이 1인 필터 = 3x3 영역의 '합'을 구하는 필터
conv.bias.data = torch.zeros(1)               # 편향은 0으로 둬서 순수 합성곱 결과만 관찰한다.

feature_map = conv(x)                          # 필터를 이미지 위로 미끄러뜨리며 전체를 훑는다.
print('입력 크기 :', tuple(x.shape))           # (1, 1, 5, 5)
print('출력 크기 :', tuple(feature_map.shape)) # (1, 1, 3, 3) — 5x5가 3x3 피처맵으로 압축됐다.
print('피처맵:')                                # 각 값은 그 위치 3x3 영역의 합이다(필터가 전부 1이므로).
print(feature_map[0, 0])
# 핵심: 원본은 그대로 두고, 필터와의 연산 결과인 '특징(feature map)'만 새로 만들어낸다.`,note:"덱의 Convolution Layer를 한 줄씩 실행해 본다. (N,C,H,W) 4차원 규칙과, padding 없이 3x3 필터를 통과하면 5x5가 3x3으로 줄어드는 output size 변형을 눈으로 확인시킨다. 필터를 전부 1로 고정해 결과를 손으로 검산할 수 있게 한 점이 왕초보용 포인트다."},{title:"Padding과 MaxPooling으로 크기 보정하고 대표값 추리기",lang:"python",code:`# 덱 순서 그대로: padding으로 크기를 지키고 -> pooling으로 중요한 값만 남긴다
import torch                                  # 텐서 연산 라이브러리.
import torch.nn as nn                         # 층 정의 모듈.

x = torch.arange(1, 17, dtype=torch.float32).reshape(1, 1, 4, 4)  # 1~16을 4x4 이미지로 만든다.
print('원본 4x4:'); print(x[0, 0])            # 실습 데이터가 어떻게 생겼는지 먼저 확인한다.

# padding=1 이면 바깥 테두리에 0을 한 겹 둘러 6x6이 된다. 그 뒤 3x3 필터를 통과하면 다시 4x4로 나온다.
# 덱에서 말한 "합성곱 후 줄어드는 크기를 0으로 채워 보정"이 바로 이 padding의 역할이다.
conv = nn.Conv2d(1, 1, kernel_size=3, stride=1, padding=1)
same = conv(x)                                 # padding 덕분에 입력과 출력의 H,W가 같게 유지된다.
print('padding=1 통과 후 크기:', tuple(same.shape))  # (1, 1, 4, 4) — 크기가 안 줄었다.

# MaxPooling: 2x2 창 안에서 '가장 큰 값' 하나만 남기고 나머지는 버린다. 학습 파라미터가 없다.
# 사진을 절반 크기로 줄이되 가장 두드러진 특징(최댓값)만 보존해, 계산량을 줄이고 위치 변화에 강해진다.
pool = nn.MaxPool2d(kernel_size=2, stride=2)
pooled = pool(x)                               # 4x4 -> 2x2 로 절반씩 축소된다.
print('MaxPool 결과(2x2):'); print(pooled[0, 0])  # 각 2x2 블록의 최댓값(6,8,14,16)만 남는다.
# 정리: Conv로 특징을 뽑고(Padding으로 크기 관리), Pooling으로 핵심만 추려 다음 층으로 넘긴다.`,note:"Padding(크기 보정)과 MaxPooling(대표값 추출, 학습 파라미터 없음)을 한 흐름에 보여준다. padding=1 + 3x3 필터가 입력 크기를 그대로 유지한다는 실무 공식과, MaxPool이 왜 계산량을 줄이고 위치 변화에 강해지는지를 실제 숫자로 확인시킨다."},{title:"작은 CNN 분류기 통째로 — Conv→Pool→Flatten→FC→Softmax",lang:"python",code:`# 덱 요약 "특징 뽑고(Conv) 추리고(Pool) 펼쳐서(Flatten) 분류(FC+Softmax)"를 한 모델로
import torch                                  # 텐서/자동미분 라이브러리.
import torch.nn as nn                         # 신경망 층 모음.

# MNIST 손글씨 숫자 한 장을 흉내낸 입력: (배치8, 채널1, 28x28). 정답은 0~9 중 하나(10분류)다.
x = torch.randn(8, 1, 28, 28)                 # 실제로는 이미지지만 여기선 난수로 형태만 맞춘다.

class SmallCNN(nn.Module):                     # 파이토치 모델은 nn.Module을 상속해 만든다.
    def __init__(self):
        super().__init__()                     # 부모 초기화는 반드시 먼저 호출해야 층 등록이 된다.
        # 특징 추출부: Conv로 특징맵을 만들고 ReLU로 비선형성을 준 뒤 Pool로 절반 크기로 줄인다.
        self.conv1 = nn.Conv2d(1, 16, 3, padding=1)   # 1채널 -> 16장의 특징맵, 크기는 padding으로 28 유지.
        self.conv2 = nn.Conv2d(16, 32, 3, padding=1)  # 16 -> 32장. 깊어질수록 필터(특징) 수를 늘리는 관례.
        self.pool = nn.MaxPool2d(2, 2)                # 2x2 풀링. 통과할 때마다 H,W가 절반이 된다.
        self.relu = nn.ReLU()                         # 음수는 0으로 잘라 중요한 신호만 통과시킨다.
        # 분류부: 펼친 특징 벡터를 받아 10개 클래스 점수로 바꾸는 완전연결층(FC).
        # 28 -> pool 두 번 -> 7 이므로, 32채널 x 7 x 7 = 1568 개의 값이 펼쳐진다.
        self.fc = nn.Linear(32 * 7 * 7, 10)

    def forward(self, x):
        x = self.pool(self.relu(self.conv1(x)))  # conv1 -> ReLU -> pool. 28x28 특징맵이 14x14로 준다.
        x = self.pool(self.relu(self.conv2(x)))  # conv2 -> ReLU -> pool. 14x14가 다시 7x7로 준다.
        x = x.flatten(1)                          # 배치는 두고 나머지를 1줄로 펼친다 -> 분류기가 먹을 수 있는 벡터.
        return self.fc(x)                         # 10개 클래스별 '점수(logit)'를 낸다.

model = SmallCNN()                             # 모델 생성.
logits = model(x)                              # 순전파: 이미지 8장을 한 번에 통과시킨다.
probs = torch.softmax(logits, dim=1)           # 점수를 확률(합=1)로 바꾼다. 덱의 Softmax가 이 역할이다.
print('출력 점수 크기:', tuple(logits.shape))   # (8, 10) — 이미지 8장 x 클래스 10개.
print('첫 장의 예측 숫자:', probs[0].argmax().item())  # 가장 확률이 큰 위치 = 모델이 고른 숫자.
# 파라미터 없는 Pool과 달리 Conv/FC의 가중치는 학습으로 정해진다 -> 앞 차시의 학습 루프를 그대로 붙이면 된다.`,note:"덱의 CNN 전체 파이프라인(Conv+ReLU → Pool 반복 → Flatten → FC → Softmax)을 하나의 nn.Module로 조립한다. 28→14→7로 풀링마다 크기가 절반이 되는 계산을 주석으로 따라가 FC 입력 차원 32*7*7이 어디서 나오는지 스스로 유도하게 만든 것이 학습 포인트다."},{title:"RNN 기초 — 시퀀스를 한 스텝씩 기억하며 처리하기",lang:"python",code:`# 덱의 "이전 시점 정보를 Hidden State에 저장해 다음을 예측"을 nn.RNN으로 확인
import torch                                  # 텐서 라이브러리.
import torch.nn as nn                         # RNN 층이 들어 있는 모듈.

# 시퀀스 데이터: (배치=2, 시간길이=5, 입력특징=3). 예로 5일간 매일 3개 센서값을 읽었다고 보면 된다.
# RNN은 이 시간 축(길이 5)을 한 스텝씩 순서대로 훑으며, 순서와 관계 정보를 기억한다.
x = torch.randn(2, 5, 3)

# input_size=3(매 시점 입력 3차원), hidden_size=8(기억 상태 8차원). batch_first=True로 (N,T,F) 순서를 쓴다.
# 같은 Cell을 시간 축을 따라 펼쳐 쓰는 구조라, 가중치는 모든 시점이 '공유'한다(덱의 핵심 포인트).
rnn = nn.RNN(input_size=3, hidden_size=8, batch_first=True)

output, h_n = rnn(x)                           # 시퀀스를 통과시킨다. 내부적으로 t=0..4를 순서대로 계산한다.
# output: 매 시점의 Hidden State를 다 모은 것 (N, T, hidden). 시점별 출력이 필요할 때 쓴다.
print('전체 시점 출력 크기:', tuple(output.shape))  # (2, 5, 8)
# h_n: 마지막 시점의 Hidden State만 뽑은 것 (층수, N, hidden). "요약 하나"가 필요한 분류 등에 쓴다.
print('마지막 은닉상태 크기:', tuple(h_n.shape))     # (1, 2, 8)

# output의 맨 끝 시점과 h_n이 같은 값인지 확인 -> "마지막 Hidden State = 시퀀스의 요약"임을 체감한다.
print('마지막 시점 == h_n ?', torch.allclose(output[:, -1, :], h_n[0]))  # True
# 이 요약 벡터에 Linear를 붙이면 감성분류, 다음 값 예측 같은 다양한 과제로 확장된다.`,note:'덱의 RNN 구조(같은 Cell을 시간 축으로 펼치고 가중치를 공유하며 Hidden State로 과거를 기억)를 nn.RNN 한 줄로 실행한다. output(모든 시점)과 h_n(마지막 요약)의 차이, 그리고 "마지막 시점 출력 = 시퀀스 요약"이라는 점을 allclose로 직접 검증하게 한 것이 왕초보 이해의 핵심이다.'},{title:"역전파의 핵심 — autograd가 기울기를 자동 계산",lang:"python",code:`# 신경망이 스스로 배우는 원리: 미분을 autograd 가 대신 해 준다
import torch

# requires_grad=True: 이 값에 대한 미분을 추적하라고 표시
x = torch.tensor(3.0, requires_grad=True)

# 아주 단순한 함수 y = x^2 + 2x 를 정의
y = x ** 2 + 2 * x

# backward(): y 를 x 로 미분한 값을 자동 계산해 x.grad 에 담는다
y.backward()

# 손으로 풀면 dy/dx = 2x + 2, x=3 이면 8 — 같은 값이 나온다
print('x.grad =', x.grad)  # 결과: tensor(8.)

# 신경망 학습 = '손실을 가중치로 미분'해 그 기울기 반대 방향으로 조금씩 이동.
# 그 미분을 사람이 아니라 autograd 가 대신하는 것이 딥러닝 프레임워크의 힘.`,note:'커리큘럼의 순전파·역전파를 수식이 아니라 손으로 검산 가능한 예로 체감. dy/dx=2x+2를 직접 계산해 x.grad와 맞춰 보게 하면 "역전파=자동 미분"이 왕초보에게도 명확해진다.'},{title:"학습 루프의 표준 4박자 — forward→loss→backward→step",lang:"python",code:`# 모든 신경망 학습이 반복하는 4단계 (PyTorch 표준 골격)
import torch
import torch.nn as nn

# 단순 회귀: y = 2x 를 배우게 한다
X = torch.tensor([[1.0], [2.0], [3.0], [4.0]])  # 입력
y = torch.tensor([[2.0], [4.0], [6.0], [8.0]])  # 정답(2배)

model = nn.Linear(1, 1)                     # 입력1 -> 출력1 (기울기·절편을 학습)
loss_fn = nn.MSELoss()                      # 회귀용 손실: 오차 제곱의 평균
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)  # 경사하강, 학습률 0.01

for epoch in range(200):        # 같은 데이터를 200번 반복 학습
    pred = model(X)             # 1) 순전파: 현재 가중치로 예측
    loss = loss_fn(pred, y)     # 2) 손실: 정답과 얼마나 다른가
    optimizer.zero_grad()       # 3) 이전 기울기 초기화(안 하면 누적됨)
    loss.backward()             #    역전파: 기울기 계산
    optimizer.step()            # 4) 갱신: 기울기 반대로 가중치 이동

print('학습된 기울기:', round(model.weight.item(), 3))  # 2.0 에 가까워짐
print('마지막 손실:', round(loss.item(), 5))            # 0 에 수렴`,note:"커리큘럼의 손실함수·옵티마이저(SGD)·학습률·학습 루프를 한 화면에. zero_grad를 빠뜨리면 기울기가 누적돼 학습이 망가진다는 흔한 실수까지 주석으로 짚는, ml-dl-2의 핵심 골격 예제."},{title:"학습 안정화 — 배치 정규화(BatchNorm)",lang:"python",code:`# 층에 들어오는 값의 분포를 고르게 맞춰 학습을 안정시키기
import torch
import torch.nn as nn

# 흔한 패턴: Linear -> BatchNorm -> ReLU 순서로 쌓는다
net = nn.Sequential(
    nn.Linear(4, 8),      # 입력 4 -> 은닉 8
    nn.BatchNorm1d(8),    # 8개 출력을 배치 단위로 평균0·분산1 정규화
    nn.ReLU(),            # 비선형
    nn.Linear(8, 3),      # 은닉 8 -> 출력 3(클래스)
)

x = torch.randn(16, 4)   # 배치 16개, 각 4차원 입력
out = net(x)             # 통과
print('출력 shape:', out.shape)  # torch.Size([16, 3])

# BatchNorm 은 학습 중 각 층 입력 분포가 흔들리는 것을 잡아 줘,
# 더 큰 학습률을 써도 안정적으로 수렴하도록 돕는다(속도·안정성 향상).`,note:'커리큘럼에 "배치 정규화와 학습 안정화"가 명시되나 예제가 없었다. Linear→BatchNorm→ReLU 배치 순서라는 실무 관례를 코드로 보여준다.'}],concepts:[{term:"신경망(Neural Network)",desc:"여러 개의 작은 계산 단위(뉴런)를 층층이 연결해, 복잡한 패턴도 학습할 수 있게 만든 모델이다."},{term:"퍼셉트론(Perceptron)",desc:"입력에 가중치를 곱해 더한 뒤 통과 여부를 정하는, 신경망의 가장 작은 한 칸짜리 단위다."},{term:"활성화 함수(Activation Function)",desc:"신호를 다음 층으로 얼마나 보낼지 결정하는 문지기로, ReLU 는 음수는 막고 양수만 통과시킨다."},{term:"순전파·역전파(Forward·Backward)",desc:"순전파는 입력을 앞으로 보내 답을 내는 과정, 역전파는 틀린 정도를 거꾸로 전해 가중치를 고치는 과정이다."},{term:"손실 함수(Loss Function)",desc:"모델의 답이 정답에서 얼마나 멀리 떨어졌는지를 숫자 하나로 알려주는 '오답 점수'다."},{term:"옵티마이저(Optimizer)",desc:"손실을 줄이는 방향으로 가중치를 조금씩 옮겨주는 조정자이며, Adam 은 똑똑하게 보폭을 조절한다."},{term:"에폭(Epoch)",desc:"전체 학습 데이터를 한 바퀴 다 보고 학습하는 것을 1 에폭이라 하며, 보통 여러 에폭 반복한다."},{term:"학습률(Learning Rate)",desc:"가중치를 한 번에 얼마나 크게 옮길지 정하는 보폭이다. 너무 크면 최저점을 건너뛰어 발산하고, 너무 작으면 학습이 지나치게 느려져 딥러닝에서 가장 먼저 조정하는 하이퍼파라미터다."},{term:"배치 정규화(Batch Normalization)",desc:"각 층으로 들어가는 값의 분포가 학습 중 계속 흔들리는 문제를 완화하기 위해, 미니배치 단위로 값을 평균0·분산1에 가깝게 다시 맞춰 학습을 빠르고 안정적으로 만드는 기법이다."}],detail:{topics:[{h:"신경망 구조",items:["퍼셉트론(단일 뉴런)","다층 신경망(MLP)","은닉층과 출력층","가중치와 편향(bias)"]},{h:"학습 메커니즘",items:["순전파(forward)","역전파(backward)","경사하강법(Gradient Descent)","에폭과 배치(batch)"]},{h:"핵심 부품",items:["활성화 함수(ReLU·Sigmoid·Softmax)","손실 함수(CrossEntropy·MSE)","옵티마이저(SGD·Adam)","학습률(learning rate)과 학습률 스케줄","배치 정규화(Batch Normalization)"]}],labs:[{title:"Lab 1 · 가장 작은 신경망 만들기",steps:["Colab 에서 `import torch; import torch.nn as nn` 을 실행한다.","`layer = nn.Linear(3, 1)` 로 입력 3개를 받아 1개를 내는 층을 만든다.","`x = torch.tensor([[1.0, 2.0, 3.0]])` 로 입력 한 줄을 만든다.","`print(layer(x))` 를 실행해 숫자 하나가 출력되면, 신경망 한 층이 동작한 것이다(값은 무작위 초기화라 매번 다름)."]},{title:"Lab 2 · 손실이 줄어드는지 눈으로 보기",steps:["본문 실습 코드의 학습 루프 앞에 `losses = []` 를 만들고, 루프 안에서 `losses.append(loss.item())` 를 추가한다.","`import matplotlib.pyplot as plt` 를 실행한다.","학습이 끝난 뒤 `plt.plot(losses); plt.xlabel('epoch'); plt.ylabel('loss'); plt.show()` 를 실행한다.","그래프가 왼쪽 위에서 오른쪽 아래로 내려가면 학습이 잘 된 것이다."]},{title:"Lab 0 · 텐서와 자동미분 손으로 만져보기",steps:["`import torch` 후 `t = torch.tensor([[1.,2.,3.],[4.,5.,6.]])` 로 2x3 텐서를 만들고 `t.shape`, `t.dtype` 을 출력해 모양과 자료형을 확인한다.","`t * 2`, `t + 10`, `t.sum()`, `t.mean(dim=0)` 을 차례로 실행하며 넘파이처럼 원소별 연산과 축(dim) 기준 집계가 되는 것을 눈으로 본다.","`x = torch.tensor(2.0, requires_grad=True)` 로 '미분을 추적하는' 텐서를 만들고, `y = x**2 + 3*x` 를 계산한 뒤 `y.backward()` 를 부른다.","`print(x.grad)` 를 실행해 7.0 이 나오는지 확인한다(2x+3 에 x=2 를 넣은 값). 이 자동미분이 뒤에 나올 역전파의 정체임을 메모한다."]},{title:"Lab 3 · 학습 루프를 한 줄씩 뜯어 돌리기",steps:["본문 손글씨 실습의 학습 루프에서 `opt.zero_grad()`, `out = model(X_tr)`, `loss = loss_fn(out, y_tr)`, `loss.backward()`, `opt.step()` 다섯 줄이 각각 '초기화→순전파→채점→역전파→이동'의 어느 단계인지 주석으로 적는다.","루프 안에 `if epoch % 10 == 0: print(epoch, round(loss.item(),4))` 를 넣어 10 에폭마다 손실이 줄어드는 흐름을 출력한다.","일부러 `opt.zero_grad()` 줄을 주석 처리하고 다시 돌려, 손실이 이상하게 요동치거나 학습이 망가지는 것을 확인한 뒤 다시 살린다(기울기 초기화의 중요성 체감).","학습률을 0.01 → 0.5 로 키워 손실이 발산(NaN/폭증)하는지, 0.0001 로 줄여 거의 안 줄어드는지 각각 관찰하고 '적당한 보폭'의 감을 한 줄로 정리한다."]}],homework:["본문 신경망의 은닉층 크기를 32 에서 64, 128 로 늘려가며 평가 정확도가 어떻게 바뀌는지 표로 정리하고, 무조건 크다고 좋아지는지 한 줄로 결론을 적는다.","옵티마이저를 Adam 대신 `torch.optim.SGD(model.parameters(), lr=0.01)` 로 바꿔 같은 100 에폭을 학습시키고, 손실이 줄어드는 속도를 Adam 과 비교해 짧게 정리한다.","nn.Linear 층 사이에 nn.BatchNorm1d 를 넣은 모델과 넣지 않은 모델을 같은 학습률로 학습시켜, 손실이 줄어드는 속도와 최종 정확도를 표로 비교한다."]},theory:{theory:[{h:"보폭과 정규화로 학습을 안정시키기",body:`경사하강법은 손실이 줄어드는 방향으로 가중치를 옮기는데, 그 한 걸음의 크기가 학습률이다.
학습률이 크면 골짜기 바닥을 계속 지나쳐 손실이 출렁이거나 폭발하고, 작으면 수백 에폭을 돌려도 바닥에 못 닿는다. 그래서 적당한 값을 찾거나, 학습이 진행될수록 보폭을 줄이는 스케줄을 쓴다.

한편 깊은 신경망은 층을 지날수록 값의 분포가 제멋대로 커지거나 작아져 학습이 불안정해진다.
배치 정규화는 각 층의 입력을 미니배치마다 표준화해 이 흔들림을 잡아 준다. 덕분에 더 큰 학습률을 써도 안정적으로 수렴하고 과적합도 약간 줄어든다.`},{h:"신경망은 '뉴런 여러 개를 쌓은 계산기'다",body:`신경망의 기본 단위인 뉴런은 입력 숫자들에 각각 가중치를 곱해 더하는 단순한 계산기다.
이 뉴런 하나로는 직선밖에 못 긋지만, 여러 개를 옆으로 늘어놓고 층층이 쌓으면 구불구불한 복잡한 경계도 표현할 수 있다.

층을 깊게 쌓을수록 더 복잡한 패턴을 배울 수 있어서 '딥(deep) 러닝'이라 부른다.
중간의 숨은 층(은닉층)들이 입력을 점점 더 쓸모 있는 형태로 바꿔주는 것이 핵심이다.`},{h:"학습은 '틀리고 → 고치고'의 반복이다",body:`신경망 학습은 사람이 문제를 풀고 채점하며 실력을 키우는 과정과 똑같다.
먼저 순전파로 답을 내고(문제 풀기), 손실 함수로 정답과 얼마나 다른지 점수를 매긴다(채점).
그다음 역전파로 '어느 가중치를 어느 방향으로 바꿔야 덜 틀릴지'를 계산한다(오답 분석).

마지막으로 옵티마이저가 그 방향으로 가중치를 조금 옮긴다(복습).
이 네 단계를 수백 번 반복하면 손실이 점점 줄며 모델이 똑똑해진다.`},{h:"퍼셉트론 한 개의 한계, 그리고 층을 쌓는 이유(MLP)",body:`(2교시 강의. 1교시의 '뉴런=계산기' 직관을 이어받아, 왜 굳이 여러 층을 쌓아야 하는지를 그림으로 설득한다.)

가장 단순한 신경망은 뉴런 하나, 즉 퍼셉트론이다. 입력값들에 가중치를 곱해 더하고, 편향(bias)을 보태 문턱을 넘으면 1, 못 넘으면 0을 내보낸다. 이 하나짜리 뉴런은 사실상 '직선 하나로 두 그룹을 가르는' 일만 할 수 있다. 데이터가 직선 하나로 깔끔히 나뉘면 퍼셉트론으로 충분하다.

문제는 세상 데이터가 그렇게 친절하지 않다는 것이다. 대표 예가 XOR — (0,0)과 (1,1)은 A그룹, (0,1)과 (1,0)은 B그룹으로 나눠야 하는데, 이 넷은 아무리 직선을 그어도 한 번에 못 가른다. 퍼셉트론 하나로는 원리적으로 불가능하다. 이 한계가 알려지며 신경망 연구가 한동안 겨울을 맞기도 했다.

돌파구는 '층을 쌓는' 것이었다. 뉴런을 옆으로 여러 개 늘어놓아 한 층(layer)을 만들고, 그 층의 출력을 다음 층의 입력으로 넘긴다. 이렇게 은닉층(hidden layer)을 하나만 끼워 넣어도 직선 여러 개를 조합한 '꺾인 경계'를 만들 수 있어 XOR이 풀린다. 층을 더 깊게 쌓을수록 더 구불구불하고 복잡한 경계를 표현할 수 있고, 그래서 '깊은(deep) 신경망'이라 부른다. 이런 완전연결 다층 구조를 MLP(다층 퍼셉트론)라 한다.

핵심 포인트 — 왜 중요한가: 여기서 반드시 짚어야 할 게 있다. 층 사이에 '활성화 함수'라는 비선형 장치가 없으면, 아무리 층을 많이 쌓아도 결국 직선 하나로 뭉개진다(선형의 합성은 다시 선형이기 때문). 즉 '층을 쌓는 것'과 '활성화 함수를 끼우는 것'은 한 세트다. 이 대목이 다음 5교시에서 활성화 함수를 배우는 이유로 자연스럽게 이어진다. 오늘 실습에서 nn.Linear 사이에 nn.ReLU를 끼우는 이유가 바로 이것이다.`},{h:"신경망의 세 부품 — 활성화 함수·손실 함수·옵티마이저",body:`(5교시 강의. 실습 코드에 등장하는 ReLU / CrossEntropyLoss / Adam 세 줄이 각각 무슨 일을 하는지 이름표를 붙여 준다.)

신경망 학습 코드를 뜯어보면 결국 세 가지 부품이 반복해서 등장한다. 이 셋의 역할을 구분하면 남의 코드도 읽히기 시작한다.

첫째, 활성화 함수(Activation) — 뉴런의 계산 결과에 '비선형성'을 넣어 주는 문지기다. 가장 널리 쓰는 ReLU는 음수는 0으로 자르고 양수는 그대로 통과시킨다. 계산이 싸고 학습이 잘 돼 은닉층의 기본값처럼 쓰인다. Sigmoid는 결과를 0~1 사이로 눌러 '확률'처럼 만들어 주고, Softmax는 여러 클래스의 점수를 '다 합치면 1이 되는 확률 분포'로 바꿔 준다. 그래서 다중 분류 출력층엔 Softmax, 이진 확률엔 Sigmoid를 얹는다. 4교시에서 봤듯, 이 비선형 함수가 있어야 층을 쌓은 보람이 생긴다.

둘째, 손실 함수(Loss) — 모델의 답이 정답과 얼마나 다른지를 하나의 숫자로 채점한다. 숫자를 맞히는 회귀에는 오차를 제곱해 평균 내는 MSE를, 카테고리를 맞히는 분류에는 '정답 클래스에 얼마나 확신을 줬는가'를 재는 CrossEntropy를 쓴다. 학습이란 결국 이 손실 숫자를 줄여 가는 여정이다.

셋째, 옵티마이저(Optimizer) — 역전파가 알려 준 '어느 방향으로 가중치를 고쳐야 덜 틀리나'를 받아, 실제로 가중치를 그 방향으로 한 걸음 옮긴다. 가장 기본은 SGD(확률적 경사하강법)로, 정직하게 기울기 방향으로 학습률만큼 이동한다. Adam은 여기에 '이전에 어느 방향으로 움직여 왔는지(관성)'와 '파라미터마다 보폭을 다르게'라는 요령을 더해, 대체로 더 빠르고 안정적으로 수렴한다. 그래서 실무 기본값으로 Adam을 많이 고른다.

핵심 포인트 — 왜 중요한가: 이 세 부품과 학습률은 서로 맞물려 돈다. 활성화가 비선형성을 주고, 손실이 틀린 정도를 재고, 옵티마이저가 학습률만큼 고친다. 다음 실습에서 lr(학습률)을 0.01에서 0.5로 키우면 손실이 발산하고, 0.0001로 줄이면 굼떠지는 것을 직접 보게 되는데, 그 '보폭 감각'이 오늘의 핵심 실습 목표다.`}]},realCodes:[{title:"PyTorch 손글씨 분류: 모델 정의부터 학습·평가까지",lang:"python",code:`import torch                          # 파이토치 본체
import torch.nn as nn                 # 신경망 층(layer) 모음
from sklearn.datasets import load_digits          # 8x8 손글씨 숫자 데이터
from sklearn.model_selection import train_test_split

# 데이터 불러오기: 입력 64픽셀, 정답 0~9
d = load_digits()
X_tr, X_te, y_tr, y_te = train_test_split(
    d.data, d.target, test_size=0.2, random_state=42)

# 넘파이 배열을 파이토치 텐서로 변환 (입력=실수, 정답=정수)
X_tr = torch.tensor(X_tr, dtype=torch.float32)
y_tr = torch.tensor(y_tr, dtype=torch.long)
X_te = torch.tensor(X_te, dtype=torch.float32)
y_te = torch.tensor(y_te, dtype=torch.long)

# 64 -> 32 -> 10 신경망 (ReLU 는 음수를 0으로 막는 문지기)
model = nn.Sequential(nn.Linear(64, 32), nn.ReLU(), nn.Linear(32, 10))
loss_fn = nn.CrossEntropyLoss()                  # 분류용 손실 함수
opt = torch.optim.Adam(model.parameters(), lr=0.01)  # 가중치 조정자

# 학습 루프: 100 에폭 반복
for epoch in range(100):
    opt.zero_grad()              # 이전 기울기 초기화
    out = model(X_tr)            # 순전파: 답 예측
    loss = loss_fn(out, y_tr)    # 채점: 정답과의 오차
    loss.backward()             # 역전파: 고칠 방향 계산
    opt.step()                  # 가중치 한 걸음 이동

# 평가: 기울기 계산 끄고 정확도 측정
with torch.no_grad():
    pred = model(X_te).argmax(dim=1)            # 가장 높은 점수의 숫자 선택
    acc = (pred == y_te).float().mean()         # 맞춘 비율
print("평가 정확도:", acc.item())   # 결과: 약 0.96`,note:"데이터를 텐서로 바꾸고, 모델·손실·옵티마이저를 준비한 뒤, 순전파→채점→역전파→이동의 학습 루프를 반복하는 PyTorch 의 표준 패턴이다."},{title:"실전: 모델 저장·로드 + 추론 서비스화",lang:"python",code:`import torch

# 1) 학습 후 가중치 저장 (state_dict 권장)
torch.save(model.state_dict(), "model.pt")

# 2) 추론 시: 동일 구조 생성 → 가중치 로드 → eval 모드
infer = build_model()                      # 학습 때와 같은 아키텍처
infer.load_state_dict(torch.load("model.pt", map_location="cpu"))
infer.eval()                               # 드롭아웃/BN을 추론 모드로

@torch.no_grad()                           # 기울기 계산 끔(메모리·속도↑)
def predict(x):
    logits = infer(torch.tensor(x, dtype=torch.float32))
    prob = torch.softmax(logits, dim=-1)   # 확률로 변환
    return int(prob.argmax()), float(prob.max())

label, conf = predict(sample_features)
print(f"예측={label}, 신뢰도={conf:.2f}")`,note:"eval() + no_grad()는 추론의 필수 2종. state_dict로 저장/로드하면 구조와 분리돼 이식이 쉽다. softmax로 신뢰도까지 함께 반환."}],periods:["1교시 · 신경망이란? 뇌의 뉴런에서 빌려온 아이디어","2교시 · 퍼셉트론과 다층 신경망(MLP) 구조 그려보기","3교시 [실습] PyTorch 설치 확인 · 텐서(Tensor) 다뤄보기","4교시 · 순전파·역전파: 모델이 틀리고 고치는 과정","5교시 · 활성화 함수와 손실 함수 · 옵티마이저(SGD/Adam)","6교시 [실습] nn.Module 로 신경망 한 개 쌓아보기","7교시 [실습] 학습 루프(forward→loss→backward→step) 돌리기","8교시 [실습] 학습 곡선 그려 손실이 줄어드는지 확인"]},"ml-dl-3":{plan:{schedule:[{time:"09:00–09:50",topic:"1교시 · 데이터 종류에 맞는 아키텍처: CNN·RNN·Transformer 지도"},{time:"10:00–10:50",topic:"2교시 · CNN 직관: 이미지에서 '특징'을 훑어 찾기"},{time:"11:00–11:50",topic:"3교시 [실습] CNN 으로 손글씨 이미지 분류 맛보기"},{time:"12:00–13:00",topic:"점심 휴식",lunch:!0},{time:"13:00–13:50",topic:"4교시 · RNN/LSTM 과 Transformer·Attention 직관"},{time:"14:00–14:50",topic:"5교시 · 과적합과의 싸움: 드롭아웃·정규화·데이터 증강"},{time:"15:00–15:50",topic:"6교시 [실습] 드롭아웃 넣고 빼며 과적합 비교"},{time:"16:00–16:50",topic:"7교시 · 하이퍼파라미터 튜닝과 전이학습(Transfer Learning)"},{time:"17:00–17:50",topic:"8교시 [실습] 사전학습 개념 정리 + 미니 개선 과제"}],practice:{title:"한 데이터셋으로 ML 베이스라인 → 딥러닝 → 성능 비교 → 규제로 개선까지 (종합 실습)",steps:["Colab 새 노트에서 하나의 데이터셋을 정한다: `from sklearn.datasets import load_digits` 의 8x8 손글씨(또는 원하면 이미지 데이터셋)를 불러오고 train_test_split 으로 학습/평가를 나눈다.","① 머신러닝 베이스라인: `from sklearn.ensemble import RandomForestClassifier`(또는 GradientBoosting)로 모델을 학습시키고 평가 정확도를 출력해 '기준점'으로 삼는다.","② 딥러닝 모델: 같은 데이터를 텐서로 바꿔 PyTorch MLP(`nn.Sequential(nn.Linear(...), nn.ReLU(), nn.Linear(...))`) 또는 CNN(`nn.Conv2d → ReLU → MaxPool2d → Linear`)을 만들고 학습 루프(forward→loss→backward→step)를 돌린다.","③ 두 접근 비교: 머신러닝 베이스라인 정확도와 딥러닝 정확도를 나란히 출력해 어느 쪽이 이 데이터에서 더 나은지 확인한다.","④ 성능 개선 ①: 딥러닝 모델에 `nn.Dropout(0.3)` 과 가중치 감쇠(weight_decay) 같은 규제를 넣고, 학습-평가 정확도 차이(과적합)가 줄어드는지 확인한다.","④ 성능 개선 ②: 하이퍼파라미터(학습률·은닉 차원·에폭 수) 중 하나씩만 바꿔 재학습하며 평가 정확도가 어떻게 달라지는지 기록한다.","⑤ 결과 정리: 'ML 베이스라인 / DL 기본 / DL 개선' 세 값을 한 표로 만들고, 개선 전후 정확도 변화를 숫자로 보여준다.","무엇이 성능을 가장 많이 끌어올렸는지(규제인지, 하이퍼파라미터인지, 모델 종류인지)를 한 단락 회고로 적어 마무리한다."],deliverable:"ML과 DL 두 모델의 성능 비교표 + 개선 전후 정확도 변화 + 무엇이 성능을 끌어올렸는지 한 단락 회고가 담긴 Colab 노트 1개"}},examples:[{title:"합성곱 한 번 해보기",lang:"python",code:`import torch
import torch.nn as nn
conv = nn.Conv2d(1, 1, 3)              # 입력채널1, 출력1, 3x3 필터
img = torch.ones(1, 1, 5, 5)          # 5x5 흰 이미지(모두 1)
out = conv(img)                       # 합성곱 적용
print(out.shape)  # 결과: torch.Size([1, 1, 3, 3])  3x3으로 줄어듦`,note:"3x3 필터로 5x5 이미지를 훑으면 가장자리가 잘려 3x3 특징 지도가 나온다(padding 으로 크기 유지 가능)."},{title:"드롭아웃 켜고 끄기",lang:"python",code:`import torch
import torch.nn as nn
drop = nn.Dropout(0.5)        # 절반을 0으로 끔
x = torch.ones(1, 6)         # 모두 1인 입력
drop.train()                 # 학습 모드: 드롭아웃 작동
print(drop(x))               # 결과: 일부가 0, 나머지는 2.0으로 증폭(매번 다름)`,note:"학습 모드에서는 일부 뉴런을 끄지만, 평가 모드(drop.eval())에서는 모두 살려 안정적으로 예측한다."},{title:"전이학습 골격 — 앞부분은 얼리고 마지막 층만 새로 학습",lang:"python",code:`import torch.nn as nn

# (개념 시연) 사전학습된 모델이 있다고 하자 — 앞부분은 범용 특징 추출기
# 실제로는: from torchvision.models import resnet18; base = resnet18(weights='DEFAULT')
class PretrainedLike(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(     # 이미 잘 배운 특징 추출부(빌려 옴)
            nn.Conv2d(3, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(16, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
        )
        self.classifier = nn.Linear(32 * 8 * 8, 1000)  # 원래는 1000개 클래스용

base = PretrainedLike()

# 1) 특징 추출부의 가중치를 '얼린다' — 학습 중 갱신되지 않게 막는다
for p in base.features.parameters():
    p.requires_grad = False

# 2) 마지막 분류층만 '우리 문제(예: 3개 클래스)'에 맞게 새로 갈아 끼운다
base.classifier = nn.Linear(32 * 8 * 8, 3)   # 이 층만 새로 학습된다

# 3) 확인: requires_grad 가 True 인(=학습되는) 파라미터가 마지막 층뿐인지 본다
trainable = [n for n, p in base.named_parameters() if p.requires_grad]
print('새로 학습되는 층:', trainable)
# 결과: classifier 관련 가중치/편향만 출력된다 -> 적은 데이터로도 빠르게 적응`,note:"실제 사전학습 모델(예: torchvision 의 ResNet)을 다운로드하지 않아도 '무엇을 얼리고 무엇을 바꾸는가'의 골격은 이 코드로 이해된다. 8교시 전이학습 개념 정리용 데모."},{title:"Self-Attention 핵심 수식 (NumPy)",lang:"python",code:`import numpy as np

def attention(Q, K, V):
    d_k = Q.shape[-1]
    # 스케일드 닷-프로덕트: QK^T 를 sqrt(d_k)로 나눠 기울기 안정화
    scores = Q @ K.T / np.sqrt(d_k)
    # softmax로 가중치(합=1) 산출
    w = np.exp(scores - scores.max(-1, keepdims=True))
    w = w / w.sum(-1, keepdims=True)
    return w @ V       # 가중합 = 문맥 반영된 표현

# Transformer의 핵심: 토큰들이 서로를 '얼마나 참고할지'를 학습한다`,note:"Attention(Q,K,V)=softmax(QKᵀ/√dₖ)V. √dₖ 스케일링이 없으면 softmax가 포화되어 학습이 불안정해진다."},{title:"ML 베이스라인 → DL 확장, 같은 데이터로 성능 비교",lang:"python",code:`from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import f1_score

# ① 먼저 ML 베이스라인을 세운다(빠르고 튼튼한 기준선)
rf = RandomForestClassifier(n_estimators=200).fit(X_tr, y_tr)
f1_ml = f1_score(y_te, rf.predict(X_te), average="macro")

# ② 그다음 DL(MLP)로 확장해 '개선 폭'을 측정한다
f1_dl = f1_score(y_te, mlp_predict(X_te), average="macro")

print(f"ML(RF): {f1_ml:.3f}  vs  DL(MLP): {f1_dl:.3f}")
# 표 형태 데이터는 DL이 항상 이기지 않는다 — 베이스라인이 판단 기준`,note:"종합 실습의 뼈대: 항상 ML 베이스라인부터 세우고 DL로 확장해 개선 폭을 수치로 비교한다. 정형 데이터는 트리 모델이 강할 때가 많다."},{title:"전이학습(Transfer Learning)으로 적은 데이터 극복",lang:"python",code:`import torchvision.models as models
import torch.nn as nn

# 사전학습된 ResNet을 가져와 마지막 분류층만 내 문제에 맞게 교체
net = models.resnet18(weights="IMAGENET1K_V1")
for p in net.parameters():
    p.requires_grad = False        # 특징 추출부는 얼려서 그대로 사용
net.fc = nn.Linear(net.fc.in_features, 3)  # 우리 클래스 수(3개)로 교체
# 마지막 층만 학습 → 데이터가 적어도 빠르게 좋은 성능`,note:"데이터가 적을 때 밑바닥 학습보다 전이학습이 유리하다. 사전학습 특징을 얼리고 마지막 층만 바꿔 학습한다."},{title:"LSTM으로 사인파 다음 값 예측 (게이트로 긴 기억 유지)",lang:"python",code:`# 덱의 "RNN은 짧은 기억, LSTM은 Cell State+Gate로 긴 기억"을 실제 학습으로 확인
import torch                                  # 텐서/자동미분.
import torch.nn as nn                         # LSTM 층 포함 모듈.

# 규칙이 뚜렷한 사인파를 만든다. 앞 20개를 보고 '바로 다음 값'을 맞히는 시계열 예측 문제로 만든다.
series = torch.sin(torch.linspace(0, 30, 300))  # 300개 점으로 된 매끈한 파형.
seq_len = 20                                     # 한 번에 들여다볼 과거 구간의 길이(윈도우).
# 슬라이딩 윈도우: [i:i+20]을 입력으로, [i+20]을 정답으로 하는 (입력,정답) 쌍을 잔뜩 만든다.
X = torch.stack([series[i:i+seq_len] for i in range(len(series)-seq_len)]).unsqueeze(-1)
y = series[seq_len:].unsqueeze(-1)               # 각 윈도우 바로 다음의 실제 값(정답).

class LSTMReg(nn.Module):                        # 시계열 회귀용 LSTM 모델.
    def __init__(self):
        super().__init__()
        # LSTM: 입력 1차원, 은닉 32차원. Cell State(장기기억)와 3개 Gate로 오래된 정보도 선택적으로 보존한다.
        self.lstm = nn.LSTM(input_size=1, hidden_size=32, batch_first=True)
        self.fc = nn.Linear(32, 1)                # 마지막 은닉상태 -> 다음 값(숫자 1개)로 변환.
    def forward(self, x):
        out, (h_n, c_n) = self.lstm(x)            # LSTM은 Hidden State와 Cell State 두 개를 함께 넘긴다.
        return self.fc(out[:, -1, :])             # 마지막 시점의 요약만 뽑아 다음 값을 예측한다.

model = LSTMReg()                                # 모델 생성.
opt = torch.optim.Adam(model.parameters(), lr=0.01)  # 적응형 옵티마이저 Adam.
loss_fn = nn.MSELoss()                           # 숫자 예측이므로 오차 제곱 평균(회귀 손실).

for epoch in range(150):                         # 같은 데이터를 150번 반복 학습.
    pred = model(X)                              # 순전파: 모든 윈도우의 다음 값을 예측.
    loss = loss_fn(pred, y)                      # 정답과의 오차.
    opt.zero_grad(); loss.backward(); opt.step() # 기울기 초기화 -> 역전파 -> 가중치 갱신.

print('최종 손실:', round(loss.item(), 5))        # 0에 가까워지면 파형 규칙을 학습한 것.
print('예측 예시:', round(model(X[:1]).item(), 3), '/ 실제:', round(y[0].item(), 3))
# 시계열은 텍스트와 달리 Softmax 없이 예측값을 그대로 출력한다(덱의 "시계열은 Softmax 불필요").`,note:'종합실습답게 데이터 생성(슬라이딩 윈도우)→모델→학습 루프를 한 흐름에 담았다. LSTM이 Hidden State와 Cell State 두 상태를 함께 반환한다는 구조적 차이와, 덱이 강조한 "시계열 회귀는 Softmax 없이 예측값을 그대로 내보낸다"는 점을 회귀 손실(MSELoss)로 연결해 보여준다.'},{title:"AutoEncoder — 압축(Encoder)했다 복원(Decoder)하며 특징 학습",lang:"python",code:`# 덱의 "입력 -> 압축(Encoder) -> Latent -> 복원(Decoder) -> 출력, 입출력이 같아지게 학습"
import torch                                  # 텐서/자동미분.
import torch.nn as nn                         # 층 모음.

# 28x28 흑백 이미지를 784개 숫자로 펼친 것을 흉내낸다. 정답 라벨이 없다 -> 비지도(스스로) 학습이다.
x = torch.rand(64, 784)                        # 배치 64장, 각 784차원(0~1 픽셀값).

class AutoEncoder(nn.Module):                  # 인코더-디코더가 대칭을 이루는 구조.
    def __init__(self):
        super().__init__()
        # Encoder: 784 -> 128 -> 32 로 차원을 점점 줄인다. 가장 좁은 32차원이 Latent(병목)=핵심 특징이다.
        self.encoder = nn.Sequential(
            nn.Linear(784, 128), nn.ReLU(),     # 1차 압축. ReLU로 비선형 특징을 잡는다.
            nn.Linear(128, 32),  nn.ReLU(),     # 2차 압축. 여기 32개 숫자에 이미지의 요점이 담기게 된다.
        )
        # Decoder: 32 -> 128 -> 784 로 다시 늘려 원본 크기로 복원한다(Encoder를 거울처럼 뒤집은 형태).
        self.decoder = nn.Sequential(
            nn.Linear(32, 128),  nn.ReLU(),     # 압축된 특징을 다시 펼치기 시작.
            nn.Linear(128, 784), nn.Sigmoid(),  # 마지막은 Sigmoid로 0~1 픽셀 범위에 맞춘다.
        )
    def forward(self, x):
        z = self.encoder(x)                     # 입력을 32차원 Latent 벡터로 압축.
        return self.decoder(z), z               # 복원 이미지와 Latent를 함께 돌려준다.

model = AutoEncoder()                           # 모델 생성.
opt = torch.optim.Adam(model.parameters(), lr=1e-3)  # Adam 옵티마이저.
loss_fn = nn.MSELoss()                          # 복원 오차: '입력과 출력이 얼마나 다른가'가 곧 손실이다.

for epoch in range(50):                         # 반복 학습.
    recon, z = model(x)                         # 순전파: 압축 후 복원.
    loss = loss_fn(recon, x)                    # 정답이 따로 없다! 정답이 곧 '입력 자기 자신'이다.
    opt.zero_grad(); loss.backward(); opt.step() # 기울기 초기화 -> 역전파 -> 갱신.

print('복원 손실:', round(loss.item(), 5))       # 작아질수록 784 -> 32로 줄였다 복원해도 원본과 비슷하다는 뜻.
print('Latent(압축) 크기:', tuple(z.shape))      # (64, 32) — 784차원이 32차원으로 압축됐다.
# 핵심: 좁은 병목을 통과시키면 '중요한 특징만' 남는다. 이 Latent를 분류기에 넣으면 특징 추출기로도 쓴다.`,note:'덱의 AutoEncoder 구조(대칭 Encoder-Decoder, 좁은 Latent 병목)를 그대로 구현한다. 라벨 없이 "정답이 곧 입력 자기 자신"이라 손실이 복원 오차가 된다는 비지도 학습의 핵심을 코드로 못박고, 784→32 압축을 눈으로 확인시켜 차원 축소·특징 추출 도구로서의 의미까지 짚는다.'},{title:"Denoising AutoEncoder — 노이즈 섞인 입력을 깨끗하게 복원",lang:"python",code:`# 덱 확장표의 "일부러 입력에 노이즈를 넣고, 깨끗한 원본으로 복원 -> 강인한 특징 학습"
import torch                                  # 텐서/자동미분.
import torch.nn as nn                         # 층 모음.

clean = torch.rand(64, 784)                    # 원본(깨끗한) 이미지 64장. 이것이 복원의 '정답'이다.
# 입력에 가우시안 노이즈를 더해 일부러 지저분하게 만든다. clamp로 0~1 픽셀 범위를 벗어나지 않게 자른다.
# 손상된 것을 보고 원본을 맞히도록 학습하면, 모델은 잡음이 아닌 '본질적 특징'에 집중하게 된다.
noisy = (clean + 0.3 * torch.randn_like(clean)).clamp(0, 1)

model = nn.Sequential(                          # 간단히 Sequential로 인코더-디코더를 이어 붙인다.
    nn.Linear(784, 128), nn.ReLU(),             # Encoder 1: 784 -> 128 압축.
    nn.Linear(128, 32),  nn.ReLU(),             # Encoder 2: 128 -> 32 (Latent 병목).
    nn.Linear(32, 128),  nn.ReLU(),             # Decoder 1: 32 -> 128 확장.
    nn.Linear(128, 784), nn.Sigmoid(),          # Decoder 2: 128 -> 784, Sigmoid로 0~1 픽셀 복원.
)
opt = torch.optim.Adam(model.parameters(), lr=1e-3)  # Adam 옵티마이저.
loss_fn = nn.MSELoss()                          # 복원 오차.

for epoch in range(60):                         # 반복 학습.
    recon = model(noisy)                        # 입력은 '노이즈 낀' 이미지.
    loss = loss_fn(recon, clean)                # 정답은 '깨끗한 원본' — 여기서 잡음 제거를 배운다.
    opt.zero_grad(); loss.backward(); opt.step() # 기울기 초기화 -> 역전파 -> 갱신.

# 학습 후, 노이즈 입력을 얼마나 원본에 가깝게 되돌리는지 오차로 비교한다.
before = loss_fn(noisy, clean).item()           # 복원 전: 노이즈 이미지와 원본의 차이(크다).
after = loss_fn(model(noisy), clean).item()     # 복원 후: 모델이 되돌린 이미지와 원본의 차이(작아짐).
print('노이즈 제거 전 오차:', round(before, 4))
print('노이즈 제거 후 오차:', round(after, 4))   # after < before 이면 잡음을 걷어내는 데 성공한 것.
# 입력을 손상시켜도 본질을 뽑아내도록 훈련하므로, 일반 AE보다 견고한(robust) 특징을 배운다.`,note:'덱 확장표의 Denoising AE를 구현한다. "입력=노이즈, 정답=원본"이라는 학습 설정만 바꾸면 잡음 제거 모델이 된다는 점을 보여주고, 복원 전/후 오차를 직접 비교해 효과를 수치로 증명한다. 손상된 입력에서 본질을 뽑게 하면 더 강인한 특징이 학습된다는 종합실습 수준의 통찰을 전한다.'},{title:"종합실습: 같은 데이터에 ML 베이스라인 vs DL 비교",lang:"python",code:`# 하나의 데이터셋을 ML(sklearn)과 DL(PyTorch) 양쪽으로 풀어 비교
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import torch, torch.nn as nn

X, y = load_wine(return_X_y=True)  # 와인 13개 특징 -> 3개 품종 분류
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=0)
sc = StandardScaler().fit(Xtr)               # 스케일러는 학습셋에만 fit(누수 방지)
Xtr, Xte = sc.transform(Xtr), sc.transform(Xte)

# 1) ML 베이스라인: 손 안 대고 바로 강력한 랜덤포레스트
rf = RandomForestClassifier(random_state=0).fit(Xtr, ytr)
print('ML(RandomForest) 정확도:', round(rf.score(Xte, yte), 3))

# 2) DL: 작은 MLP 신경망으로 같은 문제 풀기
net = nn.Sequential(nn.Linear(13, 16), nn.ReLU(), nn.Linear(16, 3))
opt = torch.optim.Adam(net.parameters(), lr=0.01)  # Adam 옵티마이저
xb, yb = torch.tensor(Xtr, dtype=torch.float32), torch.tensor(ytr)
for _ in range(300):                            # 학습 루프
    loss = nn.CrossEntropyLoss()(net(xb), yb)   # 분류용 손실
    opt.zero_grad(); loss.backward(); opt.step()

pred = net(torch.tensor(Xte, dtype=torch.float32)).argmax(1)  # 가장 큰 점수=예측
acc = (pred == torch.tensor(yte)).float().mean().item()
print('DL(MLP) 정확도:', round(acc, 3))
# 표 형태 소규모 데이터는 ML 이 종종 더 강하다 — DL 이 항상 답은 아님을 확인.`,note:'종합실습 목표(동일 데이터에 ML→DL 통합, 베이스라인부터 비교) 그대로. 스케일러 누수 방지·CrossEntropyLoss·Adam까지 앞 차시 내용을 한 흐름에 모으고, "정형 소규모 데이터에선 ML이 더 나을 수 있다"는 현실적 교훈을 준다.'},{title:"성능 개선의 출발 — 과적합인지 train vs 검증으로 진단",lang:"python",code:`# 성능이 안 나올 때 먼저 볼 것: 외웠는가(과적합)? 학습/검증 점수 차이로 진단
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

X, y = load_wine(return_X_y=True)
Xtr, Xval, ytr, yval = train_test_split(X, y, test_size=0.3, random_state=0)

# 트리 깊이를 키워가며 학습/검증 정확도를 함께 본다
for depth in [1, 3, 5, None]:  # None = 제한 없이 끝까지(가장 복잡)
    m = DecisionTreeClassifier(max_depth=depth, random_state=0).fit(Xtr, ytr)
    tr = m.score(Xtr, ytr)     # 학습 데이터 점수
    val = m.score(Xval, yval)  # 처음 보는 검증 점수
    print('depth=', depth, '| train=', round(tr, 3), 'val=', round(val, 3))

# train 은 1.0 인데 val 이 뚝 떨어지면 '과적합' — 데이터를 외워버린 것.
# 이때 max_depth 제한·드롭아웃·정규화·데이터 추가로 격차를 줄이는 것이 개선 단계.`,note:'종합실습의 "성능 개선(정규화·드롭아웃·튜닝)" 앞단계인 진단을 다룬다. 통계교재의 과적합·일반화 개념을 train/val 격차로 눈에 보이게 만들어, 무엇을 개선해야 하는지 근거를 먼저 잡게 한다.'}],concepts:[{term:"CNN(합성곱 신경망)",desc:"작은 필터로 이미지를 훑으며 모서리·무늬 같은 특징을 찾아내는, 이미지에 특화된 신경망이다."},{term:"합성곱(Convolution)",desc:"작은 격자(필터)를 이미지 위에서 한 칸씩 미끄러뜨리며 곱하고 더해 특징 지도를 만드는 연산이다."},{term:"RNN/LSTM",desc:"앞 단어를 기억하며 순서대로 읽는, 문장·시계열 같은 순서 데이터에 쓰는 신경망이다."},{term:"Attention(어텐션)",desc:"전체 입력 중 지금 중요한 부분에 더 집중하게 해주는 기법으로, 형광펜으로 핵심을 칠하는 것과 같다."},{term:"드롭아웃(Dropout)",desc:"학습 중 뉴런 일부를 일부러 잠시 꺼서, 특정 뉴런에만 의존하지 않게 만들어 과적합을 줄인다."},{term:"데이터 증강(Data Augmentation)",desc:"이미지를 살짝 회전·이동시켜 데이터를 부풀려, 모델이 더 다양한 경우를 보게 하는 기법이다."},{term:"전이학습(Transfer Learning)",desc:"이미 많은 데이터로 학습된 모델을 가져와 내 문제에 맞게 조금만 다시 학습시키는 똑똑한 지름길이다."},{term:"생성형 AI의 뿌리, Transformer",desc:"요즘 ChatGPT 같은 생성형 AI의 바탕이 바로 Transformer 아키텍처다. RNN처럼 앞에서 뒤로 한 단어씩 읽는 대신, Attention으로 문장 안 모든 단어가 서로를 동시에 참고해 문맥을 파악한다. 이 구조가 병렬 처리와 긴 문맥 이해를 가능하게 해 대형 언어모델(LLM)의 토대가 되었으며, 다음 과목 'LLM과 Transformer 아키텍처'로 이어지는 다리가 된다."}],detail:{topics:[{h:"대표 아키텍처",items:["CNN(이미지·합성곱·풀링)","RNN/LSTM(순서·기억)","Transformer·Attention","데이터 종류별 선택 기준"]},{h:"과적합 방지",items:["드롭아웃(Dropout)","정규화(L2·BatchNorm)","데이터 증강(Augmentation)","조기종료(Early Stopping)"]},{h:"성능 끌어올리기",items:["하이퍼파라미터 튜닝","학습률 조정","전이학습(Transfer Learning)","사전학습 모델 활용"]}],labs:[{title:"Lab 1 · 과적합 직접 목격하기",steps:["본문 CNN 코드에서 드롭아웃 줄(`self.drop` 적용)을 주석 처리해 끈다.","학습 루프 안에서 매 에폭 학습 정확도와 평가 정확도를 함께 출력하도록 두 줄을 추가한다.","에폭이 늘수록 학습 정확도는 1.0 에 가까워지는데 평가 정확도는 더 안 오르거나 떨어지는 구간을 찾는다.","그 차이가 벌어지는 지점이 바로 과적합이 시작되는 순간임을 메모한다."]},{title:"Lab 2 · 드롭아웃으로 과적합 줄이기",steps:["Lab 1 에서 끈 드롭아웃 적용 줄을 다시 살리고 비율을 `nn.Dropout(0.3)` 으로 둔다.","같은 에폭 수로 다시 학습시킨다.","학습 정확도와 평가 정확도의 차이가 Lab 1 보다 줄었는지 비교한다.","드롭아웃 비율을 0.5 로 올려 한 번 더 돌려보고, 너무 높이면 학습 정확도까지 낮아지는지 확인한다."]},{title:"Lab 0 · CNN 한 층이 이미지를 어떻게 바꾸는지 들여다보기",steps:["본문 손글씨(load_digits) 데이터에서 이미지 한 장을 골라 `plt.imshow(X[0].reshape(8,8), cmap='gray')` 로 원본을 눈으로 본다.","`conv = nn.Conv2d(1, 4, 3, padding=1)` 로 필터 4개짜리 합성곱 층을 만들고, 이미지 한 장을 `(1,1,8,8)` 모양으로 넣어 `out = conv(img)` 를 실행한다.","`out.shape` 을 출력해 채널이 4개(필터 4개)로 늘고 가로세로는 padding 덕에 8x8 로 유지됨을 확인한다.","`for i in range(4): plt.subplot(1,4,i+1); plt.imshow(out[0,i].detach(), cmap='gray')` 로 필터 4개가 만든 서로 다른 특징 지도를 나란히 띄워, 필터마다 강조하는 부분이 다름을 관찰한다.","이어서 `nn.MaxPool2d(2)` 를 통과시키면 크기가 4x4 로 절반이 되는 것을 확인하고 '특징은 남기고 크기는 줄인다'를 메모한다."]},{title:"Lab 3 · 미니 개선 챌린지 — 내 손으로 정확도 올리기",steps:["본문 CNN 의 현재 평가 정확도를 기준선(baseline)으로 기록한다.","아래 카드 중 두 가지 이상을 골라 하나씩만 바꿔가며(한 번에 하나!) 평가 정확도가 오르는지 표로 기록한다: (a) 합성곱 필터 수 8→16 늘리기, (b) 드롭아웃 비율 0.3↔0.5 조절, (c) 학습률 0.01↔0.005, (d) 에폭 늘리되 학습/평가 정확도 격차를 함께 관찰(조기종료 감각), (e) 합성곱 층 하나 더 쌓기.","각 변경이 '왜' 효과가 있었는지/없었는지를 7교시에서 배운 하이퍼파라미터·과적합 관점으로 한 줄씩 설명한다.","가장 좋았던 조합을 최종 모델로 정하고, 기준선 대비 몇 %p 올랐는지와 '다음에 데이터가 100장뿐이라면 전이학습을 어떻게 쓸지'를 3문장으로 정리해 발표한다."]}],homework:["본문 CNN 에 합성곱 층을 하나 더 추가(예: Conv2d(8, 16, 3, padding=1) + ReLU + MaxPool)해 깊게 만든 뒤, 평가 정확도가 올라가는지 표로 비교하고 깊게 쌓는 것의 장단점을 한 단락으로 정리한다.","전이학습 개념을 글로 정리한다: 사전학습 모델을 가져와 마지막 층만 새로 학습시키는 방식이 적은 데이터에서 왜 유리한지, 일상 비유를 들어 5문장 이내로 설명해 제출한다."]},theory:{theory:[{h:"데이터 모양에 따라 도구가 다르다",body:`딥러닝 아키텍처는 데이터의 생김새에 맞춰 골라야 한다.
이미지는 옆 픽셀끼리 관계가 중요하므로, 작은 필터로 주변을 훑는 CNN 이 잘 맞는다.
문장이나 주가처럼 순서가 중요한 데이터는 앞을 기억하며 읽는 RNN/LSTM, 또는 핵심에 집중하는 Transformer 가 적합하다.

즉 망치 하나로 모든 못을 박는 게 아니라, 못의 종류에 따라 연장을 바꾸는 것과 같다.
문제에 맞는 구조를 고르는 안목이 딥러닝의 절반이다.

실라버스가 정리하듯 아키텍처는 데이터 종류로 나눠 이해하면 쉽다 — 이미지는 CNN(옆 픽셀 관계를 필터로 포착), 시계열·순서 데이터는 RNN/LSTM(앞을 기억), 자연어는 Transformer(모든 토큰이 서로 참고)다.
특히 Transformer는 자연어를 넘어 이미지·음성 생성까지 확장되며 '생성형 AI의 공통 기반'이 되었고, 이 점이 뒤에 이어지는 LLM·Transformer 과목으로 연결된다.`},{h:"과적합은 '외우기'이고, 정규화는 '이해시키기'다",body:`모델이 학습 데이터를 통째로 외우면 학습 점수는 높아도 새 데이터에서 무너진다.
이를 막는 대표 방법이 드롭아웃, 정규화, 데이터 증강이다.
드롭아웃은 일부 뉴런을 무작위로 꺼서 모델이 한 곳에만 의존하지 못하게 한다.

데이터 증강은 같은 이미지를 살짝 비틀어 보여줘 '본질'을 배우게 한다.
전이학습은 남이 잘 배운 지식을 빌려와, 적은 데이터로도 튼튼한 모델을 만든다.`},{h:"CNN 직관 — 작은 필터로 이미지의 '특징'을 훑어 찾기",body:`(2교시 강의. 1교시의 '데이터 모양별 도구' 지도에서 이미지 칸을 확대해, 3교시 CNN 실습으로 넘어가기 전 원리를 심는다.)

이미지를 그냥 픽셀을 한 줄로 쭉 펴서 일반 신경망(MLP)에 넣으면 무슨 일이 생길까? 첫째, 28x28 흑백 이미지만 해도 784개 입력이라 층이 조금만 커져도 가중치가 폭발한다. 둘째, 더 결정적으로 '옆 픽셀끼리 붙어 있다'는 공간 정보가 통째로 사라진다. 고양이 귀가 이미지의 어디에 있든 귀는 귀인데, 픽셀을 펴 버리면 위치가 바뀔 때마다 완전히 다른 입력으로 취급한다.

CNN(합성곱 신경망)은 이 두 문제를 '작은 필터로 이미지를 훑는' 아이디어로 푼다. 예컨대 3x3짜리 작은 창(필터)을 이미지 왼쪽 위부터 오른쪽 아래까지 미끄러뜨리며, 창이 덮은 9개 픽셀과 필터의 값을 곱해 더한다. 이 필터 하나가 '세로 경계선', 다른 필터가 '가로 경계선', 또 다른 필터가 '곡선'에 반응하도록 학습된다. 결과로 나오는 것이 특징 지도(feature map) — '이 위치에 그 특징이 얼마나 강하게 있나'를 그린 새 이미지다.

여기엔 두 가지 큰 이점이 있다. 하나는 '가중치 공유' — 같은 필터를 이미지 전체에 재사용하므로, 고양이 귀가 왼쪽에 있든 오른쪽에 있든 같은 필터가 잡아낸다(위치가 바뀌어도 잘 견딤). 다른 하나는 파라미터가 확 줄어 학습이 가볍다는 것이다. 여기에 풀링(pooling)을 더해, 예컨대 2x2 영역에서 가장 큰 값만 남기면(MaxPooling) 이미지를 절반으로 압축하면서 '어디쯤에 강한 특징이 있었다'는 요지만 남긴다.

핵심 포인트 — 왜 중요한가: CNN은 '얕은 층은 선·모서리 같은 단순 특징을, 깊은 층은 눈·바퀴 같은 복잡한 특징을' 점점 조합해 배운다. 사람이 '이런 특징을 봐라'라고 지정하지 않아도 필터가 스스로 유용한 특징을 찾아낸다는 점이 핵심이다. 3교시 실습에서 nn.Conv2d 와 nn.MaxPool2d 를 쌓을 때, 각 줄이 '특징 훑기'와 '요약 압축'을 하는 것임을 떠올리면 코드가 이야기로 읽힌다.`},{h:"순서가 있는 데이터 — RNN·LSTM의 기억, 그리고 Transformer의 집중(Attention)",body:`(4교시 강의. 이미지(CNN) 다음으로, 문장·시계열처럼 '순서'가 핵심인 데이터를 다루는 도구 계보를 잡는다.)

'나는 밥을 __' 다음에 올 말은 '먹었다'다. 이걸 맞히려면 앞 단어들을 기억해야 한다. 이미지와 달리 문장·주가·센서 로그는 '순서'가 의미를 만든다. 순서를 다루는 첫 도구가 RNN(순환 신경망)이다. RNN은 단어를 하나씩 읽으면서 '지금까지 읽은 요약(은닉 상태)'을 계속 다음 단계로 넘긴다. 즉 이전 내용을 짧게 기억하며 앞으로 나아가는 구조다.

하지만 순수 RNN은 문장이 길어지면 앞쪽 내용을 잊어버린다(기울기가 사라져 먼 과거의 신호가 흐려짐). 이를 보완한 것이 LSTM으로, '기억 셀'과 여러 개의 문(게이트)을 둬서 '무엇을 계속 기억하고, 무엇을 잊고, 무엇을 새로 담을지'를 학습으로 조절한다. 덕분에 훨씬 긴 맥락을 붙잡는다. 다만 RNN 계열은 단어를 순서대로 하나씩 처리해야 해서 느리고, 아주 먼 거리의 관계는 여전히 약하다.

판을 바꾼 것이 Transformer의 어텐션(Attention)이다. 핵심 아이디어는 '순서대로 기억을 넘기지 말고, 문장 안 모든 단어가 서로를 직접 쳐다보게 하자'다. 어텐션은 각 단어가 '나에게 중요한 다른 단어가 누구인가'에 가중치를 매겨 집중한다. 예컨대 '그 동물은 길을 건너지 않았다, 너무 지쳤기 때문에'에서 '지쳤다'가 '동물'을 콕 집어 참조한다. 모든 단어를 한꺼번에(병렬로) 처리하니 빠르고, 아무리 멀리 떨어진 단어끼리도 한 번에 연결한다.

핵심 포인트 — 왜 중요한가: 이 어텐션 기반 Transformer가 자연어를 넘어 이미지·음성·코드 생성까지 삼키며 '생성형 AI의 공통 뼈대'가 되었다. 오늘 우리가 세 아키텍처를 계보로 이해해 두면(이미지=CNN, 순서=RNN/LSTM, 관계=Transformer), 다음 과목인 'LLM과 Transformer 아키텍처'가 왜 Transformer 하나에 집중하는지 자연스럽게 연결된다. 여기서는 수식보다 '기억을 넘기느냐 vs 서로를 직접 쳐다보느냐'의 직관만 확실히 챙긴다.`},{h:"마지막 한 끗 — 하이퍼파라미터 튜닝과 전이학습",body:`(7교시 강의. 모델 구조는 그대로 두고 성능을 더 짜내는 두 가지 실무 무기를 정리한다.)

지금까지 배운 걸로 모델은 돌아간다. 하지만 실무에서 성능을 마지막까지 끌어올리는 건 대개 두 가지, 하이퍼파라미터 튜닝과 전이학습이다.

먼저 용어부터 구분하자. 모델이 학습으로 스스로 알아내는 값(가중치)은 '파라미터'다. 반면 우리가 학습 전에 사람이 정해 줘야 하는 값 — 학습률, 은닉층 크기, 층 수, 드롭아웃 비율, 배치 크기, 에폭 수 — 은 '하이퍼파라미터'다. 이 값들의 조합에 따라 같은 모델도 성능이 크게 갈린다. 좋은 조합을 찾는 게 튜닝이다. 방법은 세 가지가 있다. 그리드 서치는 후보 값들을 격자로 모두 조합해 전부 돌려 본다(정확하지만 느림). 랜덤 서치는 조합을 무작위로 뽑아 본다(같은 시간에 더 넓게 탐색돼 실무에서 자주 이김). 베이지안 최적화(Optuna 등)는 '지금까지 결과'를 보고 유망한 구역을 골라 똑똑하게 탐색한다. 중요한 원칙 하나 — 튜닝은 반드시 검증(validation) 데이터로 하고, 최종 점수는 손대지 않은 테스트 데이터로만 잰다. 안 그러면 테스트에 몰래 맞춰 버리는 셈이 된다.

전이학습(Transfer Learning)은 '남이 이미 잘 배운 지식을 빌려 오는' 전략이다. ImageNet 사진 수백만 장으로 미리 학습된 모델은 이미 선·모서리·질감·눈·바퀴 같은 범용 특징을 훌륭히 뽑는다. 우리 문제 데이터가 몇백 장뿐이어도, 이 사전학습 모델의 앞부분(특징 추출기)은 그대로 얼려(freeze) 쓰고, 마지막 분류층만 우리 클래스에 맞게 새로 학습시키면 된다. 밑바닥부터 배우는 것보다 훨씬 적은 데이터·시간으로 높은 성능을 낸다.

핵심 포인트 — 왜 중요한가: 두 무기의 공통 정신은 '아끼기'다. 튜닝은 '이미 가진 모델에서 남은 성능을 짜내기', 전이학습은 '남이 쓴 학습 비용을 물려받기'다. 데이터·GPU·시간이 늘 부족한 실무에서 이 둘은 새 모델을 처음부터 만드는 것보다 거의 항상 먼저 시도할 카드다. 8교시 미니 개선 과제에서 바로 이 관점으로 성능을 올려 본다.`}]},realCodes:[{title:"PyTorch CNN 으로 손글씨 분류 (드롭아웃 포함)",lang:"python",code:`import torch
import torch.nn as nn
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split

# 손글씨 데이터를 (개수, 채널1, 8, 8) 이미지 형태로 변환
d = load_digits()
X = torch.tensor(d.data, dtype=torch.float32).reshape(-1, 1, 8, 8)
y = torch.tensor(d.target, dtype=torch.long)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# CNN 정의: 합성곱으로 특징 추출 -> 풀링으로 축소 -> 분류
class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Conv2d(1, 8, 3, padding=1)  # 3x3 필터 8개로 특징 추출
        self.pool = nn.MaxPool2d(2)                # 가로세로 절반으로 압축
        self.drop = nn.Dropout(0.3)                # 뉴런 30%를 무작위로 끔(과적합 방지)
        self.fc = nn.Linear(8 * 4 * 4, 10)         # 펼친 특징을 0~9로 분류
    def forward(self, x):
        x = self.pool(torch.relu(self.conv(x)))    # 합성곱->ReLU->풀링
        x = x.flatten(1)                           # 한 줄로 펼치기
        x = self.drop(x)                           # 드롭아웃 적용
        return self.fc(x)                          # 최종 점수 출력

model = CNN()
loss_fn = nn.CrossEntropyLoss()
opt = torch.optim.Adam(model.parameters(), lr=0.01)

# 60 에폭 학습
for epoch in range(60):
    opt.zero_grad()
    loss = loss_fn(model(X_tr), y_tr)  # 순전파 + 채점
    loss.backward()                    # 역전파
    opt.step()                         # 가중치 갱신

# 평가 정확도 측정 (기울기 계산 끔)
with torch.no_grad():
    acc = (model(X_te).argmax(1) == y_te).float().mean()
print("평가 정확도:", acc.item())   # 결과: 약 0.97`,note:"합성곱으로 이미지 특징을 뽑고, 드롭아웃으로 과적합을 막은 뒤 분류하는 CNN 의 전체 흐름을 한 파일로 담았다."}],periods:["1교시 · 데이터 종류에 맞는 아키텍처: CNN·RNN·Transformer 지도","2교시 · CNN 직관: 이미지에서 '특징'을 훑어 찾기","3교시 [실습] CNN 으로 손글씨 이미지 분류 맛보기","4교시 · RNN/LSTM 과 Transformer·Attention 직관","5교시 · 과적합과의 싸움: 드롭아웃·정규화·데이터 증강","6교시 [실습] 드롭아웃 넣고 빼며 과적합 비교","7교시 · 하이퍼파라미터 튜닝과 전이학습(Transfer Learning)","8교시 [실습] 사전학습 개념 정리 + 미니 개선 과제"]}};export{n as default};
