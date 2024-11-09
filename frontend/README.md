# 🗣️ Plankton

![링고커넥트1](./images/img1.png)

## 🔥 프로젝트 소개

- 언어학습을 통해 지적장애인이 더 넓은 세상과 소통할 수 있도록 도와주는 서비스입니다.
- 생성형 AI를 통해 현실감 있는 음성 대화가 가능하며, 대화 흐름과 발음에 대한 분석과 피드백을 제공합니다.
- 학습자에게 맞춤형으로 반복 학습을 지원하여 사회적인 소통 능력을 키우는 것을 목표로 합니다.
  <br></br>

![링고커넥트2](./images/img2.png)
<br></br>

## 🚀 개발 기간

- 2024.11
  <br></br>

## 👨‍👩‍👧‍👦 팀원 구성

- 이예나 | Front-End | [@YenaLey](https://github.com/YenaLey)
- 김예영 | Front-End | [@yezzero](https://github.com/yezzero)
- 정하연 | Front-End | [@ha11yeon](https://github.com/ha11yeon)
- 주재원 | Back-End | [@jaewon-Ju](https://github.com/jaewon-ju)
- 박혜민 | Design
  <br></br>

## 💻 기술 스택

- Design
  - <a href="https://www.figma.com/design/gqZCozFYBEP1Yu1ThoLvMm/%EC%83%88%EC%8B%B9%ED%95%B4%EC%BB%A4%ED%86%A4?node-id=0-1&t=rPEXG1J575Ev7A3j-1">figma</a>
- Front-End
  - Language: JavaScript
  - Package Manager: npm 10.2.4
  - Library: React.js
- Back-End
  - Language: Java
  - Framework: Spring
    <br></br>

## ⚙️ 브랜치 전략

**기능 개발 및 버그 수정**: `feature/` 브랜치에서 새로운 기능을 개발하고 발생할 수 있는 버그를 검토합니다. `main` 브랜치에서 분기하여 작업 후, `main` 브랜치로 병합합니다.

## 🎥 Frontend local

### 프로젝트 가져오기

```
git clone https://github.com/YenaLey/plankton.git
cd plankton
cd frontend
```

### frontend 디렉토리 최상단에 `.env.local` 파일 생성

```
REACT_APP_BASE_URL : API 서버의 기본 URL을 설정합니다
```

### 프로젝트 실행

```
npm install
npm start
```

## 🎥 Backend local

### 프로젝트 가져오기

```
git clone https://github.com/YenaLey/plankton.git
cd plankton
cd backend
```

## ⏳ CI/CD Pipeline

이 프로젝트는 GitHub Actions를 사용하여 CI/CD 파이프라인을 자동화합니다. 파이프라인은 백엔드와 프론트엔드로 나누어져 있습니다.

### Frontend

1. **Build**: Node.js와 npm을 사용하여 프론트엔드를 빌드합니다.
2. **Deploy**: 빌드된 프론트엔드를 GitHub Pages에 배포합니다.

### Backend

1. **Build**: Gradle을 사용하여 백엔드를 빌드합니다.
2. **Test**: 빌드 후 Gradle을 사용하여 백엔드 테스트를 실행합니다.
3. **Deploy**: Docker Compose를 사용하여 백엔드 애플리케이션을 빌드하고 실행합니다.
