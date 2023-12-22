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
9.  [리펙토링 할 부분](#9-리펙토링-할-부분)
10. [팀원 소개](#10팀원-소개)
11. [회고 및 소감](#11-회고-및-소감)

<br />

## 1. 프로젝트 소개

이미지 추가
<br>

인프런과 같이 교육 관련 영상을 카테고리별로 묶어 
쉽게 시청할 수 있도록 서비스를 제공하고 커피챗을 통해 사용자들이 지식 공유를 할 수 있도록 도움을 주는 플랫폼입니다

| 🔗 배포 링크                       |  강사 계정                               | 👩‍👧‍👦 수강생 계정                     |
| ---------------------------------- | ------------------------------------------ | ---------------------------------- |
| https://edutube-kr.vercel.app/ | ID: lecture@edutube.com<br>PW: 11111111 | ID: user@edutube.com<br>PW: 11111111 |


# 2. 프로젝트 기간

🏃2023.11.19 ~ 2023.12.26

이미지 추가

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

<br>

# 4. 협업 환경

## Convention

- ### Prettier Convention


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

- ### Git Commit Convention

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

- ### PR Convention

```markdown
## ✨ 구현기능 

- 구현한 내용을 작성해주세요


## 👀 구현한 기능에 대한 gif 

- 구현한 기능의 gif 또는 이미지를 올려주세요


## 🙏 To Reviewers 🙏

- reviewers에게 요청사항을 작성해주세요
```

## Google Sheets
이미지
## Notion
이미지
## Discord
이미지

# 5. 역할 분담
이미지 추가


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

gif

# 8. 주요 코드

코드 

# 9. 리펙토링 할 부분
## 기능
- 북마크 CRUD <br>
- 동영상 컨텐츠 CRUD <br>
- 마이 페이지 <br>
  - Feat: 북마크 페이지 <br>
  - Feat: 내가 작성한 후기 리스트 확인 <br>
  - Refactor: 상품검색을 이용해 Child 상품 가져올 수 있도록 로직 변경 <br>
- Admin 계정<br>
  - Feat: Seller 계정 관리<br>
  - Feat: Product 코드 관리<br>
  - Feat: 배너 관리 기능<br>
- 상품 등록 페이지<br>
  - Feat: 페이지네이션<br>
  - Refactor: 캘린더 다중 일자 선택<br>
- 커피챗 리스트 페이지<br>
  - Feat: 검색, 필터링 기능<br>
  - Feat: 페이지네이션 or 무한 스크롤<br>
- 포인트<br>
  - Feat: 동영상 컨텐츠 시청에 따라 포인트 부여<br>
  - Feat: 포인트를 구매할 수 있는 기능<br>

## 보안<br>
- XSS(Cross-Site Scripting)<br>
  - 권한없는 사용자가 악의적인 용도로 스크립트 삽입하는 공격 막기<br>

## 성능<br>
- 속도 개선(lighthouse)<br>
- 코드 최적화<br>
  - 필요없는 코드 제거<br>
  - 코드 압축(minify)<br>
  - 코드분할하여 초기로딩 단축<br>
  - Lazy loading<br>
  - SSR data mapping<br>

## UI<br>
- Footer 추가<br>
- 스켈레톤 적용<br>
- 모바일 최적화<br>
- 채팅방 <br>
  - 전반적인 UI 수정 필요<br>
- 커피챗 상세 페이지<br>
  - 예약 모달 캘린더화<br>
  - 일정 캘린더화<br>

<br>

# 10. 팀원 소개
이미지

# 11. 회고 및 소감

## 조민경
### [프로젝트를 시작하기 전에 계획한 각자의 목표 및 이룬 점/ 아쉬운 점]<br>
이번 프로젝트에서는 사용해보지 못했던 기술을 익혀보고, 적용하는 것과 발생한 이슈에 대해 블로깅을 꾸준히 하는 것이 목표였습니다. refresh token을 사용하여 로그인을 유지하는 것과, middleware를 사용해 본 것, Next.js14를 사용해보는 것 등 새로운 기술을 익히는 데에는 목표를 달성할 수 있어 기뻤습니다.
하지만 성능 최적화, 이슈 블로깅 등 기능구현을 하느라 목표했던 것들을 이루지 못한 부분도 있어 아쉬운 마음이 있습니다. 이런 부분은 추후 리팩토링을 하면서 점차 채워가겠습니다!

### [깨달은 점 후기 및 소감]<br>
이번 프로젝트에서 제일 많이 들었던 생각은 ‘공식 문서에 답이 있다!’입니다. Next.js 14의 경우 최신 스택에다 ChatGPT에도 데이터가 없어 이슈 발생 시 잘 해결할 수 있을까 걱정이 많았는데, 공식문서에 사용법이 자세히 나와있어 생각보다 트러블슈팅하는데에 어려움이 적었습니다. 친절한 공식문서의 소중함을 이번 프로젝트를 통해 더욱이 느끼게 되었습니다! 공식문서 최고!!
<br>
## 전서희
### [프로젝트를 시작하기 전에 계획한 각자의 목표 및 이룬 점/ 아쉬운 점]<br>
함께 배우면서 하는 프로젝트의 장점을 살려 새로운 기술을 사용해보면서 다양한 도전을 해보는 것이 목표였습니다. 처음 다루어보는 NextJS, reactQuery를 사용하면서 다양한 도전에 대한 목표를 이룬 것 같습니다. 아쉬웠던 점은 최적화 및 성능 개선에도 노력을 많이 하고 싶었는데, 시간이 촉박해 주어진 기능을 완성하기도 어려웠다는 것입니다. 부트캠프 수료 기간이 끝나도 추후 리팩토링으로 최적화를 해보면서 실력을 향상시켜보고 싶습니다.

### [깨달은 점 후기 및 소감]<br>
기술은 사용해보지 않았을 땐 막연하게 무섭다고만 생각했는데 직접 해보니 많이 어렵지 않았습니다. 백문이 불여일타라고 직접 해보는게 정말 좋은 것 같습니다. 앞으로도 잘 모르는 기술 나와도 겁먹지 말고 도전해보고 싶습니다~
<br>
## 우경석
### [프로젝트를 시작하기 전에 계획한 각자의 목표 및 이룬 점/ 아쉬운 점]<br>
코드 읽는 눈이 아직은 부족한걸 잘 알기에 코드 읽는 눈을 기르고 싶었고, github도 잘 다루는 것이 목표였습니다. react-hook-form을 공부하면서 팀원들에게 설명하면서 조금은 코드 읽는 눈이 높아지는 경험을 하게 되었고 github은 어느정도 익숙해졌으나, 아직은 어색해서 조금은 아쉬운 점이 있었다.

### [깨달은 점 후기 및 소감]<br>
처음 프로젝트를 시작할 때만 해도, 잘 해낼 수 있을거라 생각했으나, 프로젝트를 진행하면서 점차 오른손목에 데미지가 누적되면서, 중반부터는 제대로 진행하기 어려웠다, 그러다보니 정신적으로 육체적으로 힘든 시기를 지나 팀원들의 배려로 잘 극복할 수 있었습니다. 팀원분들과 fesp01기 매니저분들과 동료들 덕분에 끝까지 버틸 수 있었습니다 감사합니다.
