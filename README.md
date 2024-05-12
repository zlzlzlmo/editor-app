# React + Typescript로 만들어진 코드 및 텍스트 편집기 어플리케이션

## 프로젝트 목표

- React, Typescript, Redux를 사용하여 전역 상태 관리를 간소화
- Immer를 사용하여 Redux 상태 변화 불변성 유지
- Lerna CLI를 사용하여 배포 자동화
- Esbuild를 사용하여 build 진행
- 앱 구동을 위한 코드 트랜스파일링 및 빌드 flow 학습
- NPM 에 배포 학습

## 프로젝트 기능

- 브라우저 내 코드 번들링 및 트랜스 파일링
- 코드 에디터에서 코드 실행 후 곧 바로 결과물 확인
- 마크다운 편집기에서 작성 후 결과물 확인
- 각 셀( 코드 편집기, 텍스트 편집기 )들의 CREATE, READ, UPDATE, DELETE 기능 제공

## 프로젝트 사용 법

- 프로젝트 클론 및 의존성 패키지 설치 후 npm run start 실행

## 사용 패키지

- @monaco-editor/react v3.7.5 ( Monaco Editor 코드 편집기 )
- monaco-jsx-highlighter ( Moncaco Editor 내 JSX 문법 하이라이팅 기능을 제공, 코드 편집때 구문 강조 시 사용 )
- @uiw/react-md-editor ( 마크다운 에디터 컴포넌트 라이브러리, 마크다운 형식으로 텍스트를 작성 할 수 있는 편집기 제공 )
- axios v1.5.1 ( HTTP 클라이언트 라이브러리, 서버와의 요청 및 응답 )
- bulmaswatch v0.8.1 ( CSS 테마 )
- esbuild-wasm v0.8.27 ( esbuild WebAssembly, JS 및 TS 코드를 효율적으로 번들링 )
- jscodeshift v0.11.0 ( 코드 변환을 위함 )
- localforage ( 브라우저 내 로컬 스토리지를 사용하기 위함 / indexeddb 사용 )
- react-redux ( 전역 상태 관리를 위함 )
- redux-thunk ( Redux 미들웨어, 비동기 작업 처리를 위해 사용 )
- react-resizable ( 사용자가 크기를 조절 할 수 있게 해주는 Wrapper 컴포넌트 역할 )
- react-app-rewired ( Creact React App 프로젝트의 웹팩 설정을 변경 할 수 있게 하기 위함 )
- @fortawesome/fontawesome-free v5.15.1 ( font awesome 아이콘 )
