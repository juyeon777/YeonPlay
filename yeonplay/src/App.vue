<template>
  <div id="app">
    <header>
      <h1>YeonPlay</h1>
      <nav>
        <router-link to="/">Popular Movies</router-link>
        <router-link to="/now-playing">Now Playing</router-link>
        <router-link to="/search">Search Movies</router-link> <!-- 검색 링크 추가 -->
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>© 2024 My Movie Site. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
/* 기본 스타일 */
#app {
  font-family: 'Helvetica', 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  text-align: center;
  background-color: #f4f4f9;
  color: #333;
}

/* 헤더 스타일 */
header {
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
  margin-bottom: 20px;
}

header h1 {
  margin: 0;
  font-size: 2.5rem; /* 헤더 제목 크기 조금 키움 */
  letter-spacing: 1px; /* 글자 간격 추가 */
}

header nav {
  margin-top: 15px;
}

header nav a {
  color: white;
  text-decoration: none;
  margin: 0 20px; /* 링크 간 간격 조금 더 넓힘 */
  font-size: 1.2rem;
  font-weight: 500; /* 글씨 굵기 추가 */
}

header nav a:hover {
  color: #42b983; /* 호버 시 색상 */
  transition: color 0.3s; /* 부드러운 전환 효과 */
}

header nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: underline;
}

/* 메인 컨텐츠 스타일 */
main {
  padding: 30px;
  min-height: calc(100vh - 140px); /* 푸터 제외한 최소 높이 설정 */
  background-color: #ffffff; /* 메인 배경 흰색으로 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 약간의 그림자 효과 */
}

/* 푸터 스타일 */
footer {
  background-color: #2c3e50;
  color: white;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 0.9rem;
}
</style>
