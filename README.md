# yeonplay

# 🎬 YeonPlay (Movie Explorer Clone)

TMDB(The Movie Database) API를 활용해 인기 영화와 상세 정보를 한눈에 볼 수 있는 웹 애플리케이션입니다.  
사용자는 최신 영화 트렌드를 확인하고, 각 영화의 평점・줄거리・출연진 등을 편리하게 조회할 수 있습니다.

---

## 🌐 배포 사이트

🔗 [YeonPlay 바로가기](https://yeonplay.netlify.app/)

---

## 🚀 프로젝트 개요

- **프로젝트명**: YeonPlay (Movie Explorer Clone)  
- **개발 기간**: 2024.11 ~ 2025.11 (1차 배포 후 1년 뒤 복구)  
- **배포 플랫폼**: Netlify  
- **데이터 출처**: [TMDB API](https://www.themoviedb.org/documentation/api)

---

## 🛠️ 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | Vue.js, JavaScript, CSS |
| API | TMDB API |
| Deployment | Netlify |
| ETC | dotenv (환경 변수 관리) |

---

## 💡 주요 기능

- 🎥 **인기 영화 목록**
- 🔍 **영화 검색 기능**  
- 📄 **영화 상세 정보 페이지** (출연, 줄거리, 평점 등)  
- ⭐ **즐겨찾기 및 정렬 기능**  
- 💾 **API Key 환경 변수로 안전하게 관리**

---

## 🧩 2025.11 – 프로젝트 복구 및 재배포

1년 전 배포된 사이트가 만료되어, 2025년 11월에 **Netlify를 통해 재배포**를 진행했습니다.  
이 과정에서 TMDB API 키 만료로 인해 영화 데이터가 불러와지지 않는 문제가 발생했으며, 아래와 같은 절차로 해결했습니다.

### 🔧 해결 과정

1. **[TMDB](https://www.themoviedb.org/)** 에서 새 API Key 발급  
2. **Netlify** 배포 프로젝트 접속 → `Project configuration` → `Environment variables` 이동  
3. `.env` 파일에 작성한 변수명과 동일한 **Key** 추가  
4. **Value**에는 TMDB에서 발급받은 **API Key 값** 입력  
5. **“Same value for all deploy contexts”** 옵션 선택  
6. 저장 후 **Redeploy** 수행  
→ 영화 데이터 정상 불러오기 확인 ✅  

---

## 📘 학습 포인트

- API Key 관리 및 환경 변수 설정의 중요성 이해  
- 배포 후 API 갱신 시 Netlify 환경 변수 재설정 방법 숙지  
- TMDB API 구조 분석 및 데이터 매핑 로직 개선  

---


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

