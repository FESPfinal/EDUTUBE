# EDUTUBE

<br />

1.  [프로젝트 소개](#1-프로젝트-소개)
2.  [프로젝트 기간](#2-프로젝트-기간)
3.  [기술 및 개발환경](#3-기술-및-개발환경)
4.  [협업 환경](#4-협업-환경)
5.  [역할 분담](#5-역할-분담)
6.  [폴더 구조](#6-폴더-구조)
7.  [구현 기능](#7-구현-기능)
8.  [주요 코드](#8-주요-코드)
9.  [리팩토링 할 부분](#9-리팩토링-할-부분)
10. [팀원 소개](#10팀원-소개)
11. [회고 및 소감](#11-회고-및-소감)

<br />

## 1. 프로젝트 소개

![iso_1_rectangle 3](https://github.com/FESPfinal/EDUTUBE/assets/119591236/b37d9c85-467e-4e74-b559-3a86077410e0)

인프런과 같이 교육 관련 영상을 카테고리별로 묶어 
쉽게 시청할 수 있도록 서비스를 제공하고 커피챗을 통해 사용자들이 지식 공유를 할 수 있도록 도움을 주는 플랫폼입니다

| 🔗 배포 링크                       |  강사 계정                               | 👩‍👧‍👦 수강생 계정                     |
| ---------------------------------- | ------------------------------------------ | ---------------------------------- |
| https://edutube-kr.vercel.app/ | ID: lecture@edutube.com<br>PW: 11111111 | ID: user@edutube.com<br>PW: 11111111 |


# 2. 프로젝트 기간

🏃2023.11.19 ~ 2023.12.26

![image 7](https://github.com/FESPfinal/EDUTUBE/assets/119591236/622d3186-2381-4c72-a204-d205a904f028)

| 주차                             | 작업 내용                                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **사전 모임**<br>(11/19 ~ 11/20) | - 시장 조사 및 주제 선정 <br>- 프로젝트 설계 및 요구사항 정의                                                                                              |
| **1주차**<br>(11/20 ~ 11/26)     | - API 분석 <br> - 프로젝트 기초 세팅 및 폴더 구조 설정 <br> - 컨벤션 및 Issue, PR 템플릿 작성 <br> - Figma를 사용해 와이어 프레임 및 UI 제작 <br> - Atom 컴포넌트 제작 <br> - 커피챗 목록 조회 기능 구현                   |
| **2주차**<br>(11/27 ~ 12/03)     | - 각 맡은 페이지 마크업 & 스타일링 구현 <br>- 페이지 단위 별로 1차 기능 구현 (회원가입, 로그인/로그아웃, 회원가입, 커피챗 조회/구매 등) |
| **3주차**<br>(12/04 ~ 12/10)      | - 페이지 권한 및 사용자 정보 관리 기능 구현 <br>- 공통 레이아웃 구현 <br>- 각 맡은 페이지 마크업 & 스타일링 구현 <br>- 페이지 단위 별로 2차 기능 구현(커피챗 등록, 내 정보 조회/수정, 내가 등록한 커피챗 목록 조회)                                            |
| **4주차**<br>(12/11 ~ 12/17)       | - 페이지 단위 별로 3차 기능 구현(내가 등록한 커피챗 검색, 장바구니, 커피챗 판매자 채팅 등)                                                                          |
| **5주차**<br>(12/18 ~ 12/24)       | - 페이지 단위 별로 4차 기능 구현(커피챗 수정/삭제, 커피챗 구매자 채팅) <br>- 버그 수정 <br>- 프로젝트 배포(Vercel, Koyeb, MongoDB Atlas) <br>- 발표 자료 제작 <br>- README 작성                                                                                    |
<br>

# 3. 기술 및 개발환경

<table>
<tr>
 <td align="center" width="100px">사용 기술</td>
 <td width="800px">
  <img src="https://img.shields.io/badge/NEXTJS-ffffff?style=for-the-badge&logo=Next.JS&logoColor=000000"/>&nbsp  
  <img src="https://img.shields.io/badge/REACT-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/zustand-528DD7?style=for-the-badge&logo=zustand&logoColor=black"/>&nbsp
  <img src="https://img.shields.io/badge/axios-7F2B7B?style=for-the-badge&logo=axios&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/Tailwind  CSS-06B6D4?style=for-the-badge&logo=tailwind css&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>&nbsp
    </td>
</tr>
<tr>
 <td align="center">패키지</td>
 <td>
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=NPM&logoColor=ffffff"/>&nbsp 
  </td>
</tr>
<tr>
 <td align="center">라이브러리</td>
 <td>
    <img src="https://img.shields.io/badge/yup-000000?style=for-the-badge&logo=yup&logoColor=ffffff"/>&nbsp 
    <img src="https://img.shields.io/badge/React hook form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=ffffff"/>&nbsp 
  </td>
</tr>
<tr>
 <td align="center">포맷터</td>
 <td>
  <img src="https://img.shields.io/badge/Prettier-373338?style=for-the-badge&logo=Prettier&logoColor=ffffff"/>&nbsp 
 <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
 </td>
</tr>
<tr>
 <td align="center">협업</td>
 <td>
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/Notion-5a5d69?style=for-the-badge&logo=Notion&logoColor=white"/>&nbsp
    <img src="https://img.shields.io/badge/Discord-4263f5?style=for-the-badge&logo=Discord&logoColor=white"/>&nbsp
    <img src="https://img.shields.io/badge/google sheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white"/>&nbsp 
 </td>
 <tr>
  <td align="center">디자인</td>
 <td>
    <img src="https://img.shields.io/badge/Figma-d90f42?style=for-the-badge&logo=Figma&logoColor=white"/>&nbsp  
 </td>
</tr>
<tr>
 <td align="center">IDE</td>
 <td>
    <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white"/>&nbsp
</tr>
</table>

#### NextJs 사용: React 기반의 웹 프레임워크
```
· 초기 로딩 성능을 향상시켜 검색엔진 최적화(SEO)를 개선해 사용자에게 빠른 페이지 로딩 속도를 제공하여 사용하였습니다.

· 파일 시스템 기반의 간편한 라우팅을 제공해 페이지 제작시 특정 디렉토리 구조를 따르면 자동으로 라우팅이 설정되어 사용하였습니다.
```

#### Axios 사용: 웹 어플리케이션과 서버와의 통신
```
· 간결하고 직관적인 API를 제공하여 `axios.get()`, `axios.post()`와 같은 메서드를 사용하여 간단하게 API요청을 보낼 수 있어 사용하였습니다.

· 요청과 응답을 인터셉트하고 수정할 수 있는 인터셉터를 제공해, 요청 전에 특정 작업을 수행하거나 응답을 가공할 수 있어 사용하였습니다.
```

#### Zustand 사용: 상태관리가 용이한 상태관리 라이브러리
```
· 불필요한 리렌더링을 방지하고 효율적인 상태 업데이크를 제공하여 구독한 상태가 변경될 때만 리렌더링이 발생하게 되어 사용하였습니다.

· TypeScript와 함께 사용할 수 있도록 지원하여 상태와 액션에 대한 타입 정의를 쉽게 추가할 수 있어 사용하였습니다.
```

#### React-Query 사용: 서버와의 데이터 통신 및 상태관리
```
· 서버에서 데이터를 가져오고 필요에 따라 캐싱된 데이터를 효율적으로 관리하며, 로딩 상태, 에러 상태등을 간편하게 처리하여 사용하였습니다.

· 서버의 데이터를 변경하는데 사용한 Mutations를 통해 데이터 생성, 갱신, 삭제 등을 처리하는데 용이하여 사용하였습니다.
```
<br>

# 4. 협업 환경

- ## Prettier Convention


```
{
  "singleQuote": true, 
  //작은 따옴표 (')를 사용하여 문자열을 감쌀 것인지 여부를 설정합니다.
  "printWidth": 100, 
  //코드 줄의 최대 폭을 지정합니다.
  "useTabs": false,
  // 공백 대신 탭을 사용할지 여부를 설정합니다.
  "tabWidth": 2, 
  //탭이나 공백 문자로 들여쓰기를 할 때 사용할 문자 수를 지정합니다.
  "semi": true, 
  //세미콜론(;)을 사용할지 여부를 설정합니다.
  "quoteProps": "as-needed", 
  //객체 속성에 따옴표를 사용할지 여부를 지정합니다. "as-needed"는 필요한 경우에만 따옴표를 사용하라는 것을 의미합니다.
  "jsxSingleQuote": false, 
  //JSX에서도 작은 따옴표를 사용할지 여부를 설정합니다.
  "trailingComma": "all", 
  //배열과 객체 리터럴의 마지막 항목 뒤에 쉼표를 추가할지 여부를 설정합니다.
  "arrowParens": "avoid", 
  //화살표 함수의 매개변수가 하나인 경우 괄호를 사용하지 않도록 설정합니다.
  "endOfLine": "lf",
  //개행 문자를 LF(Line Feed)로 설정합니다.
  "bracketSpacing": true, 
  //객체 리터럴에서 중괄호 앞뒤에 공백을 추가할지 여부를 설정합니다.
  "jsxBracketSameLine": false,
  //JSX 요소의 여는 괄호를 같은 줄에 둘지 여부를 설정합니다.
  "requirePragma": false,
  //: Prettier를 사용하는 파일에 프라그마(주석)가 필요한지 여부를 설정합니다.
  "insertPragma": false, 
  //Prettier 프라그마를 파일 상단에 삽입할지 여부를 설정합니다.
  "proseWrap": "preserve",
  //텍스트 줄 바꿈을 유지할지 여부를 설정합니다.
  "vueIndentScriptAndStyle": false
  //Vue 파일에서 <script> 및 <style> 섹션의 들여쓰기를 별도로 지정할지 여부를 설정합니다.
  "parser": "typescript", 
  // 사용할 parser를 지정, 자동으로 지정됨
  "eslintIntegration": true, 
  // eslint와 연동을 위한
}
```


<br>

- ## Git Commit Convention

<detail>
  <table>
    <tr>
      <th>커밋 메세지</th>
      <th>의미</th>
    </tr>
    <tr>
      <td>Feat</td>
      <td>새로운 기능 추가</td>
    </tr>
    <tr>
      <td>Fix</td>
      <td>버그 수정</td>
    </tr>
    <tr>
      <td>Design</td>
      <td>CSS 등 사용자 UI 디자인 변경</td>
    </tr>
    <tr>
      <td>!BREAKING CHANGE</td>
      <td>커다란 API 변경의 경우</td>
    </tr>
    <tr>
      <td>!HOTFIX</td>
      <td>급하게 치명적인 버그를 고쳐야하는 경우</td>
    </tr>
    <tr>
      <td>Style</td>
      <td>코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우</td>
    </tr>
    <tr>
      <td>Refactor</td>
      <td>프로덕션 코드 리팩토링</td>
    </tr>
    <tr>
      <td>Comment</td>
      <td>필요한 주석 추가 및 변경</td>
    </tr>
    <tr>
      <td>Docs</td>
      <td>문서 수정</td>
    </tr>
    <tr>
      <td>Test</td>
      <td>
        테스트 코드, 리펙토링 테스트 코드 추가, <br>
        Production Code(실제로 사용하는 코드) 변경 없음
      </td>
    </tr>
    <tr>
      <td>Chore</td>
      <td>
        빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트, <br>
        Production Code 변경 없음
      </td>
    </tr>
    <tr>
      <td>Rename</td>
      <td>
        파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
      </td>
    </tr>
    <tr>
      <td>Remove</td>
      <td>
        파일을 삭제하는 작업만 수행한 경우
      </td>
    </tr>
  </table>
</detail>

<br>

- ## PR Convention

```markdown
## ✨ 구현기능 

- 구현한 내용을 작성해주세요


## 👀 구현한 기능에 대한 gif 

- 구현한 기능의 gif 또는 이미지를 올려주세요


## 🙏 To Reviewers 🙏

- reviewers에게 요청사항을 작성해주세요
```

## Google Sheets
- 진행상황 및 도움이 필요한 부분을 쉽게 파악하기 위해 매일 아침 10시마다 스크럼을 진행하여 Google Sheets에 작성해 공유하였습니다.
<br >
![image 3](https://github.com/FESPfinal/EDUTUBE/assets/119591236/af39a3ed-1e1c-45bf-b7a8-cb35c0144b05)
<br>

## Notion
- 전체적인 프로젝트에 필요한 정보들을 정리하여 언제든지 정보를 빠르게 찾을 수 있도록 노션을 통해 관리하였습니다.
<br >
- URL: https://www.notion.so/FESP_-_EduTube-4873904b5a454a29b51c90a9b7ee3b06
<img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/7737291c-59ea-4839-adb4-76bb66d20e73" />
<br>

## Discord
- Discord에 git 알림 봇을 연결하여 PR, Issue, 브랜치 생성등 알림을 받아 현재 진행사항을 보다 빠르게 파악할 수 있었습니다.
<br >
<img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/346b9029-c663-422f-aa20-878fa126093d" />
<br >

# 5. 역할 분담
<img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/e9e2c7b6-4ec7-4428-91ea-07f8282d49e1" />
<br>


# 6. 폴더 구조


```
📦 EDUTUBE
│ ├─ 📦 app
│ │ ├─ 📂 @modal
│ │ ├─ 📂 coffeechat
│ │ ├─ 📂 login
│ │ ├─ 📂 mypage
│ │ ├─ 📂 sign-up
│ │ ├─ 📂 video
│ │ ├─ 📄 default.tsx
│ │ ├─ 📄 favicon.ico
│ │ ├─ 📄 globals.css
│ │ ├─ 📄 layout.tsx
│ │ ├─ 📄 not-found.tsx
│ │ ├─ 📄 page.module.css
│ │ ├─ 📄 page.tsx
│ │ └─ 📄 provider.tsx
│ ├─ 📦 src
│ │ ├─ 📂 components
│ │ │ ├─ 📂 atom
│ │ │ ├─ 📂 block
│ │ │ └─  📂 view
│ │ │   ├─ 📂 coffeechat
│ │ │   ├─ 📂 login
│ │ │   ├─ 📂 mypage
│ │ │   └─ 📂 sign-up
│ │ ├─  📂 helper
│ │ │ ├─ 📂 constants
│ │ │ ├─ 📂 types
│ │ │ └─ 📂 utils
│ │ ├─  📂 queries
│ │ ├─  📂 stores
```

# 7. 구현 기능 

<table>
  <tr align="center">
      <th colspan="1">회원가입</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/24d76a2a-b648-46e0-9088-acacfc72126a" /></td>
  </tr>
   <tr align="center">
      <th colspan="1">프로필 설정</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/c56abb7f-1674-42a3-b580-c9232009056a" /></td>
  </tr>
   <tr align="center">
      <th colspan="1">로그인</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/219826ab-cb11-4f13-9c1d-714d488e75a7" /></td>
  </tr>
   <tr align="center">
      <th colspan="1">커피챗</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/ef1a3e3d-ee0b-4100-8e60-5430e40e7055" /></td>
  </tr>
   <tr align="center">
      <th colspan="1">커피챗 상세</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/5811c008-141b-4844-a790-913e8c7bfdcd" /></td>
  </tr>
 <tr align="center">
      <th colspan="1">커피챗 등록</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/695912bb-33c6-4983-a106-2e270f1bc8a1" /></td>
  </tr>
 <tr align="center">
      <th colspan="1">커피챗 예약</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/9f6e6766-2d39-478c-ba0a-abeffb8da127" /></td>
  </tr> 
 <tr align="center">
      <th colspan="1">커피챗 수정</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/aa21ab12-29a9-47c9-a099-d463cbf53f90" /></td>
  </tr>
 <tr align="center">
      <th colspan="1">커피챗 삭제</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/07120d69-2e72-40db-a288-0a6be985b394" /></td>
  </tr>
  <tr align="center">
        <th colspan="1">채팅</th>
    </tr>
    <tr align="center">
      <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/9bcdfae7-ebd0-4c7c-be7a-4e248eea1be0" /></td>
    </tr> 
  <tr align="center">
      <th colspan="1">커피챗 후기 등록</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/3d26fe9c-1d22-42ec-99d2-a124eb41bbb0" /></td>
  </tr>
  <tr align="center">
      <th colspan="1">장바구니 담기</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/97568e0d-a20c-4bab-bd21-3606d91bdbf4" /></td>
  </tr> 
  <tr align="center">
      <th colspan="1">장바구니 선택, 삭제, 결제</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/f40cfbd3-d7f5-4dd8-9227-9bea318ac3f6" /></td>
  </tr> 
  <tr align="center">
      <th colspan="1">마이프로필</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/a46582a5-e1af-48e4-b863-a3fb6f094327" /></td>
  </tr> 
  <tr align="center">
      <th colspan="1">마이프로필 수정</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/244fd491-5e19-472f-a7b9-c1eb68bbcf34" /></td>
  </tr> 
  <tr align="center">
      <th colspan="1">마이프로필 예약자 조회(강사)</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/ae94753c-dbc4-4ea9-8761-812dc71f12ca" /></td>
  </tr> 
  <tr align="center">
      <th colspan="1">마이프로필 등록한 커피챗 조회(강사)</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/FESPfinal/EDUTUBE/assets/119591236/c9528241-5787-4a39-b114-b6a864cf5c4c" /></td>
  </tr> 
</table>
<br/>

# 8. 주요 코드

<details>
<summary>커피챗 게시물 등록</summary>
<div>

React-Hook-Form으로 입력 필드 갱신시 리렌더링 최소화하며, yup으로 클라이언트 측에서 데이터 유효성을 처리합니다.

Yup 라이브러리로 폼 필드에 유효성 검사 규칙을 정의한 뒤, React-Hook-Form에서는 register훅으로 입력 등록 및 errors 객체로 유효성 검사 오류를 처리합니다.

```tsx
const schema = yup.object().shape({
  name: yup.string().required('제목을 입력해주세요.').max(30, '최대 30자까지 입력 가능합니다.'),
  content: yup
    .string()
    .required('내용을 입력해주세요.')
    .min(10, '내용은 최소 10자 이상이어야 합니다.')
    .max(500, '최대 500자까지 입력 가능합니다.'),
  intro: yup.string().required('소개글을 입력해주세요.').max(50, '최대 50자까지 입력 가능합니다.'),
  datetimeList: yup.array().of(datetimeSchema).required('하나 이상의 날짜 및 시간을 추가해주세요.'),
  price: yup
    .number()
    .required('가격을 입력해주세요.')
    .min(0, '최소 가격은 0 이어야 합니다.')
    .typeError('숫자를 입력하세요.'),
  online: yup.string(),
  offline: yup.string(),
  onlinePlace: yup.string(),
  offlinePlace: yup.string(),
});

```

</div>
</details>

<details>
<summary>인증 토큰 관리</summary>
<div>

각 axios 요청마다 헤더에 access token을 설정하는 번거로움을 줄입니다.

로컬 스토리지 대신 zustand와 쿠키를 사용하여 access token을 저장함으로써, XSS와 CSRF와 같은 공격에 대한 방어력을 강화합니다.

새로고침이나 다른 상황에서 zustand가 초기화되더라도 자동으로 access token을 재발급받아 설정하므로, 사용자는 세션을 유지하는데 문제가 없습니다.

```tsx
  edutubeAxios.interceptors.response.use(
    response => {
      // 응답 성공 시 처리 로직
      return response;
    },
    async error => {
      // 응답 에러 처리 로직
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (refreshToken) {
          try {
            const { data } = await axios.get(BASE_URL + '/users/refresh', {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            });
            setAccessToken(data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return edutubeAxios(originalRequest);
          } catch (error) {
            // 리프레시 토큰 갱신 실패 시 로그아웃 등의 처리
            logout();
            return Promise.reject(error);
          }
        } else {
          // 리프레시 토큰이 없을 경우 로그아웃 등의 처리
          logout();
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );

```

</div>
</details>


<details>
<summary>채팅 기능(Socket.io-client)</summary>
<div>

서비스 내에서 커피챗의 전체 과정이 이루어지도록 함으로써, 사용자의 서비스 이탈을 방지합니다.

또한 서비스 내에서 바로 소통할 수 있어 다른 플랫폼으로 이동할 필요가 없어 유저들이 서비스에
더욱 적극적으로 참여하도록 유도해 유저의 참여도와 만족도를 높이며 브랜드 충성도를 향상시킵니다.

```tsx
/**
 * 예약된 시간과 현재 시간의 차를 밀리초단위로 계산하는 함수
 * @param datetime string 예약된 일자 및 시간
 * @returns 계산된 밀리초 차
 */
export const calculateTimeDifferenceInMinutes = (datetime: string) => {
  // 현재 시간
  const currentTime = new Date();

  // 비교할 날짜
  const reservedDate = new Date(datetime);

  // 두 시간 사이의 차이를 밀리초로 계산
  const differenceInMilliseconds = reservedDate.getTime() - currentTime.getTime();

  return differenceInMilliseconds;
};

/**
 * 예약된 시간과 현재 시간의 차이가 커피챗 시작 전 10분과 커피챗 시작 후 60분 이내일 때 true 값 반환하는 함수
 * @param datetime string 예약된 일자 및 시간
 * @returns boolean
 */
export const isBetweenTenToHour = (datetime: string) => {
  const tenMinutes = 10;
  const tenMinMilliseconds = tenMinutes * 60 * 1000; // 1분 = 60초, 1초 = 1000밀리초

  const hour = 60;
  const oneHourMilliseconds = hour * 60 * 1000; // 1분 = 60초, 1초 = 1000밀리초

  const isLessThanTen = calculateTimeDifferenceInMinutes(datetime) <= tenMinMilliseconds;
  const isMoreThanHour = calculateTimeDifferenceInMinutes(datetime) <= -oneHourMilliseconds;
  return isLessThanTen && isMoreThanHour;
};

```

</div>
</details>

<br>

# 9. 리팩토링 할 부분

![Group 5399](https://github.com/FESPfinal/EDUTUBE/assets/119591236/17aababa-f1d7-4835-a395-bfa6f1dd70ea)
![Group 5399 (1)](https://github.com/FESPfinal/EDUTUBE/assets/119591236/c6dcab44-6eb4-4dea-b1e4-7a6e0a63adb2)

<br>

# 10. 팀원 소개
![Group 5400 (2)](https://github.com/FESPfinal/EDUTUBE/assets/119591236/07cdca5f-74cd-449b-9e26-98298f0e8f62)

# 11. 회고 및 소감

## 조민경
### [프로젝트를 시작하기 전 계획한 각자의 목표 및 이룬 점/ 아쉬운 점]<br>
이번 프로젝트에서는 사용해보지 못했던 기술을 익혀보고, 적용하는 것과 발생한 이슈에 대해 블로깅을 꾸준히 하는 것이 목표였습니다. refresh token을 사용하여 로그인을 유지하는 것과, middleware를 사용해 본 것, Next.js14를 사용해보는 것 등 새로운 기술을 익히는 데에는 목표를 달성할 수 있어 기뻤습니다.
하지만 성능 최적화, 이슈 블로깅 등 기능구현을 하느라 목표했던 것들을 이루지 못한 부분도 있어 아쉬운 마음이 있습니다. 이런 부분은 추후 리팩토링을 하면서 점차 채워가겠습니다!

### [깨달은 점 후기 및 소감]<br>
이번 프로젝트에서 제일 많이 들었던 생각은 ‘공식 문서에 답이 있다!’입니다. Next.js 14의 경우 최신 스택에다 ChatGPT에도 데이터가 없어 이슈 발생 시 잘 해결할 수 있을까 걱정이 많았는데, 공식문서에 사용법이 자세히 나와있어 생각보다 트러블슈팅하는데에 어려움이 적었습니다. 친절한 공식문서의 소중함을 이번 프로젝트를 통해 더욱이 느끼게 되었습니다! 공식문서 최고!!
<br>
## 전서희
### [프로젝트를 시작하기 전 계획한 각자의 목표 및 이룬 점/ 아쉬운 점]<br>
함께 배우면서 하는 프로젝트의 장점을 살려 새로운 기술을 사용해보면서 다양한 도전을 해보는 것이 목표였습니다. 처음 다루어보는 NextJS, reactQuery를 사용하면서 다양한 도전에 대한 목표를 이룬 것 같습니다. 아쉬웠던 점은 최적화 및 성능 개선에도 노력을 많이 하고 싶었는데, 시간이 촉박해 주어진 기능을 완성하기도 어려웠다는 것입니다. 부트캠프 수료 기간이 끝나도 추후 리팩토링으로 최적화를 해보면서 실력을 향상시켜보고 싶습니다.

### [깨달은 점 후기 및 소감]<br>
기술은 사용해보지 않았을 땐 막연하게 무섭다고만 생각했는데 직접 해보니 많이 어렵지 않았습니다. 백문이 불여일타라고 직접 해보는게 정말 좋은 것 같습니다. 앞으로도 잘 모르는 기술 나와도 겁먹지 말고 도전해보고 싶습니다~
<br>
## 우경석
### [프로젝트를 시작하기 전 계획한 각자의 목표 및 이룬 점/ 아쉬운 점]<br>
코드 읽는 눈이 아직은 부족한걸 잘 알기에 코드 읽는 눈을 기르고 싶었고, github도 잘 다루는 것이 목표였습니다. react-hook-form을 공부하면서 팀원들에게 설명하면서 조금은 코드 읽는 눈이 높아지는 경험을 하게 되었고 github은 어느정도 익숙해졌으나, 아직은 어색해서 조금은 아쉬운 점이 있었다.

### [깨달은 점 후기 및 소감]<br>
처음 프로젝트를 시작할 때만 해도, 잘 해낼 수 있을거라 생각했으나, 프로젝트를 진행하면서 점차 오른손목에 데미지가 누적되면서, 중반부터는 제대로 진행하기 어려웠다, 그러다보니 정신적으로 육체적으로 힘든 시기를 지나 팀원들의 배려로 잘 극복할 수 있었습니다. 팀원분들과 fesp01기 매니저분들과 동료들 덕분에 끝까지 버틸 수 있었습니다 감사합니다.
