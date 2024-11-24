<template>
  <div id="app">
    <header>
      <h1>My Movie Site</h1>
      <nav>
        <router-link to="/">Popular Movies</router-link>
        <router-link to="/now-playing">Now Playing</router-link>
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
  background-color: #f4f4f9; /* 페이지 배경색 */
  color: #333; /* 기본 텍스트 색상 */
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
  font-size: 2rem;
}

header nav {
  margin-top: 10px;
}

header nav a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-size: 1.2rem;
}

header nav a:hover {
  color: #42b983;
}

header nav a.router-link-exact-active {
  color: #42b983; /* 활성화된 링크 */
  text-decoration: underline;
}

/* 메인 컨텐츠 스타일 */
main {
  padding: 20px;
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
