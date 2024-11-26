<template>
  <div>
    <h1>현재 상영 중인 영화</h1>
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
        />
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.release_date || 'No release date available' }}</p>
      </router-link>
    </div>
    <!-- 영화가 없을 때 -->
    <div v-else>
      <p>No movies currently playing.</p>
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
      alert("Failed to load now playing movies. Please try again later.");
    } finally {
      this.loading = false; // 로딩 상태 종료
    }
  },
};
</script>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.movie-item {
  text-align: center;
  text-decoration: none;
  color: inherit;
}

.movie-item img {
  width: 100%;
  border-radius: 8px;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}
</style>
