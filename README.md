# AI 교육자료 웹앱

AI를 처음 배우는 사람도 업무와 학습에 바로 적용할 수 있도록 구성한 공개 교육자료 웹앱입니다. React와 Vite로 만든 정적 사이트이며, Firebase Hosting에 배포하도록 구성되어 있습니다.

## 목적

이 프로젝트는 교사, 강사, 학생, 일반 학습자가 AI 기본 개념, ChatGPT 사용법, 프롬프트 작성, 업무 생산성 활용, 조직 도입, 실습 프로젝트를 학습할 수 있도록 돕는 것을 목표로 합니다.

운영 원칙은 다음과 같습니다.

- 공개 교육자료로 재사용하기 쉬운 구조 유지
- 비용이 발생하지 않는 정적 웹앱 중심 운영
- Firebase Spark 요금제에서 가능한 Hosting 기능만 사용
- Cloud Functions, Firestore 대량 사용, Cloud Storage 대용량 업로드, 외부 AI API 호출 미사용

## 주요 대상

- AI 수업을 준비하는 교사
- 기업 및 기관 교육을 운영하는 강사
- AI 활용을 배우는 학생
- 업무에 AI를 적용하고 싶은 일반 학습자

## 주요 콘텐츠와 기능

- 과정별 AI 교육 커리큘럼
- 교시별 상세 강의자료
- 실습 예제와 프롬프트 템플릿
- FAQ와 안전한 AI 사용 안내
- 모바일과 데스크톱에서 볼 수 있는 정적 웹앱 UI

현재 콘텐츠는 주로 `src/data`의 JavaScript 데이터 파일로 관리됩니다.

```text
src/data/
  mobileCourseData.js
  introCourseLessons.js
  expandedCourseLessons.js
  courseData.js
  lectureDetailData.js
```

## 로컬 실행

필요 조건:

- Node.js
- npm

설치:

```bash
npm install
```

개발 서버 실행:

```bash
npm run dev
```

빌드:

```bash
npm run build
```

린트:

```bash
npm run lint
```

통합 검증:

```bash
npm test
```

한글 텍스트 깨짐 검사:

```bash
npm run check:text
```

## Firebase Hosting 배포

현재 Firebase 프로젝트는 `.firebaserc`의 기본 프로젝트를 사용합니다.

```bash
npm run deploy
```

이 명령은 내부적으로 다음을 실행합니다.

```bash
npm run build && firebase deploy
```

Firebase Hosting 설정은 `firebase.json`에 있습니다.

- 배포 대상 디렉터리: `dist`
- SPA rewrite: 모든 경로를 `/index.html`로 전달
- 보안 헤더: CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy

자세한 운영 안내는 [docs/firebase-hosting.md](docs/firebase-hosting.md)를 참고하세요.

## Spark 요금제 사용 시 주의사항

이 프로젝트는 Spark 요금제에서 정적 Hosting 중심으로 운영하는 것을 전제로 합니다.

추가하지 않는 기능:

- Cloud Functions
- Firestore 대량 사용
- Cloud Storage 대용량 업로드
- 외부 AI API 호출
- 서버 기반 검색 API
- BigQuery 연동
- Blaze 요금제가 필요한 기능

Firebase Analytics는 현재 코드에 연결되어 있지 않습니다. 필요 시 무료 범위와 개인정보 보호 기준을 확인한 뒤 별도 검토해야 하며, 이 저장소에는 기본으로 추가하지 않습니다.

## 콘텐츠 관리

현재 화면은 `src/data`의 JS 데이터 파일을 직접 참조합니다. 따라서 이번 단계에서는 콘텐츠를 Markdown 또는 MDX로 대규모 이전하지 않습니다.

향후 구조 제안은 [docs/content-management.md](docs/content-management.md)를 참고하세요. 준비용 디렉터리로 `/content` 구조를 추가해두었습니다.

```text
content/
  lessons/
  activities/
  resources/
  worksheets/
```

## URL 구조와 공유 링크

현재 앱은 React Router를 사용하지 않고 탭 상태 기반으로 화면을 전환합니다. 따라서 각 강의나 실습 자료별 고유 URL은 아직 없습니다.

향후에는 다음과 같은 URL 구조를 권장합니다.

```text
/lessons/...
/activities/...
/resources/...
/worksheets/...
```

자세한 계획은 [docs/routing-url-plan.md](docs/routing-url-plan.md)를 참고하세요. 현재 `firebase.json`의 SPA rewrite는 향후 URL 기반 라우팅에 적합합니다.

## 자료 재사용 조건

이 저장소는 교육 콘텐츠와 웹앱 코드가 함께 있습니다. 라이선스 적용 범위가 다릅니다.

- 교육 콘텐츠, 강의자료, 실습자료, 템플릿, 문서: Creative Commons Attribution 4.0 International (CC BY 4.0)
- 웹앱 코드, 스크립트, 설정 파일: MIT License

자료를 재사용할 때는 출처를 표시해 주세요. 자세한 내용은 [LICENSE.md](LICENSE.md)를 참고하세요.

## 기여 방법

기여 시 다음 원칙을 지켜 주세요.

- 기존 디자인과 기능을 크게 바꾸지 않습니다.
- 공개 교육자료로 재사용하기 쉬운 표현을 사용합니다.
- 개인정보, 회사 기밀, 유료 서비스 의존 예시는 넣지 않습니다.
- Firebase Spark 요금제에서 비용이 발생할 수 있는 기능을 추가하지 않습니다.
- 변경 후 `npm run lint`, `npm test`, `npm run build`를 실행합니다.

권장 기여 유형:

- 강의자료 오탈자 수정
- 실습 예제 보강
- 프롬프트 템플릿 개선
- 문서화 보완
- 접근성이나 모바일 사용성 개선

## 라이선스

이 프로젝트는 이중 라이선스를 사용합니다.

- 콘텐츠/교육자료: CC BY 4.0
- 웹앱 코드: MIT

자세한 적용 범위는 [LICENSE.md](LICENSE.md)에 명시되어 있습니다.
