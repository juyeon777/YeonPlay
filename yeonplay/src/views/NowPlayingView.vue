<template>
  <div class="now-playing-view">
    <h1 class="main-title">🎬 현재 상영 중인 영화</h1>
    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading">Loading...</div>
    <!-- 영화 목록 -->
    <div v-else-if="movies.length" class="movie-grid">
      <router-link
        v-for="movie in movies"
        :key="movie.id"
        :to="`/movie/${movie.id}`"
        class="movie-item"
      >
        <img
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'"
          :alt="movie.title"
          class="movie-poster"
        />
        <div class="movie-info">
          <h3 class="movie-title">{{ movie.title }}</h3>
          <p class="movie-date">개봉일: {{ movie.release_date || "정보 없음" }}</p>
        </div>
      </router-link>
    </div>
    <!-- 영화가 없을 때 -->
    <div v-else class="no-movies">
      <p>현재 상영 중인 영화를 찾을 수 없습니다.</p>
    </div>
  </div>
</template>

<script>
import tmdb from "@/api/tmdb";

export default {
  name: "NowPlayingView",
  data() {
    return {
      movies: [], // 현재 상영 중인 영화 데이터
      loading: true, // 로딩 상태
    };
  },
  async created() {
    try {
      const response = await tmdb.get("/movie/now_playing", {
        params: { language: "ko-KR" }, // TMDB API의 한글 설정
      });
      this.movies = response.data.results; // 영화 데이터 저장
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
      alert("현재 상영 중인 영화를 불러오는 중 오류가 발생했습니다.");
    } finally {
      this.loading = false; // 로딩 상태 종료
    }
  },
};
</script>

<style scoped>
/* 기본 컨테이너 */
.now-playing-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.main-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 30px;
}

/* 로딩 상태 */
.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}

/* 영화 그리드 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

/* 영화 카드 스타일 */
.movie-item {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none; /* 링크 밑줄 제거 */
}

.movie-item:hover {
  transform: scale(1.05); /* 살짝 볼록 효과 */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
}

/* 링크 스타일 */
.movie-poster {
  width: 100%;
  height: auto;
}

.movie-info {
  padding: 10px;
  text-align: left;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  text-decoration: none; /* 제목 밑줄 제거 */
}

.movie-date {
  font-size: 0.9rem;
  color: #777;
  text-decoration: none; /* 날짜 밑줄 제거 */
}

/* 영화 없음 메시지 */
.no-movies {
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  margin-top: 20px;
}
</style>
