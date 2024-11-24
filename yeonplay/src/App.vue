<template>
  <div id="app">
    <header>
      <h1>YeonPlay</h1>
      <nav>
        <router-link to="/">Popular Movies</router-link>
        <router-link to="/now-playing">Now Playing</router-link>
        <router-link to="/genres">장르별 영화</router-link>
        <router-link to="/wishlist">내가 찜한 콘텐츠</router-link> 
        
        <!-- 돋보기 아이콘 -->
        <div class="search-icon" @click="toggleSearch">🔍</div>

        <!-- 로그인 상태에 따른 UI -->
        <div class="user-info">


          <span v-if="isLoggedIn">{{ loggedInUser }}님</span>
          <router-link v-else to="/signin" class="login-link">로그인</router-link>
          <button v-if="isLoggedIn" @click="logout" class="logout-btn">로그아웃</button>
        </div>
      </nav>

      <!-- 검색 필드 -->
      <div v-if="showSearchInput" class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search movies..."
          @keyup.enter="performSearch"
        />
        <button @click="performSearch">Go</button>
      </div>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>© 2024 My Movie Site. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSearchInput: false, // 검색 입력 필드 표시 여부
      searchQuery: '', // 검색어
      isLoggedIn: false, // 로그인 상태
      loggedInUser: '', // 로그인된 사용자 닉네임
    };
  },
  methods: {
    toggleSearch() {
      this.showSearchInput = !this.showSearchInput; // 검색 입력 필드 보이기/숨기기
    },
    performSearch() {
      if (this.searchQuery.trim()) {
        console.log('Performing search with query:', this.searchQuery); // 디버깅
        this.$router.push({ name: 'SearchMovies', query: { q: this.searchQuery } });
        this.showSearchInput = false; // 검색 입력 필드 숨기기
        this.searchQuery = ''; // 검색어 초기화
      } else {
        alert('검색어를 입력해주세요.');
      }
    },
    logout() {
      // 로그아웃 처리
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('loggedInUser');
      this.isLoggedIn = false;
      this.loggedInUser = '';
      this.$router.push('/signin'); // 로그인 페이지로 이동
    },
    checkLoginStatus() {
      // 로컬 스토리지에서 로그인 상태 확인
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (isLoggedIn === 'true' && loggedInUser) {
        this.isLoggedIn = true;
        this.loggedInUser = loggedInUser;
      }
    },
  },
  created() {
    this.checkLoginStatus(); // 컴포넌트 생성 시 로그인 상태 확인
  },
};
</script>

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
  font-size: 2.5rem;
  letter-spacing: 1px;
}

header nav {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

header nav a {
  color: white;
  text-decoration: none;
  margin: 0 20px;
  font-size: 1.2rem;
  font-weight: 500;
}

header nav a:hover {
  color: #42b983;
  transition: color 0.3s;
}

header nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: underline;
}

/* 로그인 상태 표시 스타일 */
.user-info {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.user-info span {
  font-size: 1rem;
  font-weight: bold;
}

/* 로그아웃 버튼 스타일 */
.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
}

.logout-btn:hover {
  background-color: #c0392b;
}

/* 돋보기 아이콘 스타일 */
.search-icon {
  margin-left: 20px;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  transition: color 0.3s;
}

.search-icon:hover {
  color: #42b983;
}

/* 검색 필드 스타일 */
.search-container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.search-container input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-container button {
  padding: 10px 20px;
  border: none;
  background-color: #42b983;
  color: white;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-container button:hover {
  background-color: #369d6c;
}

/* 메인 컨텐츠 스타일 */
main {
  padding: 30px;
  min-height: calc(100vh - 140px);
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
