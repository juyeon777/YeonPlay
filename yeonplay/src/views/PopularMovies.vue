<template>
  <div class="popular-movies">
    <!-- 페이지 타이틀 -->
    <h1 class="main-title">🔥 대세 콘텐츠</h1>

    <!-- Top 3 영화 섹션 -->
    <section class="top-movies">
      <div class="top-movie-card" v-for="(movie, index) in topMovies" :key="movie.id">
        <router-link :to="`/movie/${movie.id}`" class="top-movie-link">
          <div class="top-rank">Top {{ index + 1 }}</div>
          <img :src="getPoster(movie)" :alt="movie.title" class="top-movie-poster" />
          <div class="top-movie-info">
            <h3 class="top-movie-title">{{ movie.title }}</h3>
            <p class="top-movie-rating">평점: ⭐{{ movie.vote_average }}</p>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 나머지 영화 리스트 -->
    <section class="movie-grid">
      <router-link
        v-for="movie in otherMovies"
        :key="movie.id"
        :to="`/movie/${movie.id}`"
        class="movie-card"
      >
        <img :src="getPoster(movie)" :alt="movie.title" class="movie-poster" />
        <div class="movie-info">
          <h3 class="movie-title">{{ movie.title }}</h3>
          <p class="movie-rating">평점: ⭐{{ movie.vote_average }}</p>
          <p class="movie-release">개봉일: {{ movie.release_date || "N/A" }}</p>
        </div>
      </router-link>
    </section>

    <!-- 로딩 인디케이터 -->
    <div v-if="loading" class="loading-indicator">Loading...</div>

    <!-- "Top" 버튼 -->
    <button @click="scrollToTop" class="top-button">Top</button>
  </div>
</template>

<script>
import tmdb from "@/api/tmdb";

export default {
  name: "PopularMovies",
  data() {
    return {
      movies: [], // 모든 영화 데이터
      topMovies: [], // Top 3 영화
      otherMovies: [], // 나머지 영화
      loading: false, // 로딩 상태
    };
  },
  methods: {
    // TMDB API를 통해 인기 영화 데이터 가져오기
    async fetchMovies() {
      this.loading = true;
      try {
        const response = await tmdb.get("/movie/popular", { params: { page: 1 } });
        this.movies = response.data.results;

        // Top 3 영화와 나머지 영화 분리
        this.topMovies = this.movies.slice(0, 3); // 상위 3개 영화
        this.otherMovies = this.movies.slice(3); // 나머지 영화
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
        alert("영화 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        this.loading = false;
      }
    },
    // 포스터 URL 생성
    getPoster(movie) {
      return movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/150x225?text=No+Image";
    },
    // "Top" 버튼 클릭 시 스크롤 맨 위로 이동
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  async created() {
    await this.fetchMovies(); // 컴포넌트 생성 시 데이터 로드
  },
};
</script>

<style scoped>
/* 전체 컨테이너 */
.popular-movies {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* 타이틀 스타일 */
.main-title {
  font-size: 2.5rem;
  color: #ff5722; /* 대세 콘텐츠에 맞는 강렬한 색상 */
  margin-bottom: 30px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

/* Top 3 영화 섹션 */
.top-movies {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.top-movie-card {
  position: relative;
  width: 250px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.top-movie-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.top-rank {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #ff5722;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;
}

.top-movie-poster {
  width: 100%;
  border-bottom: 2px solid #ff5722;
  border-radius: 10px 10px 0 0;
}

.top-movie-info {
  padding: 15px;
}

.top-movie-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50;
}

.top-movie-rating {
  font-size: 1rem;
  color: #555;
}

/* 영화 그리드 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

/* 영화 카드 */
.movie-card {
  display: block;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: #333;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.movie-poster {
  width: 100%;
  height: auto;
  border-bottom: 2px solid #ff5722;
}

.movie-info {
  padding: 15px;
  text-align: left;
}

.movie-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50;
}

.movie-rating,
.movie-release {
  font-size: 0.9rem;
  color: #555;
}

/* 로딩 인디케이터 */
.loading-indicator {
  font-size: 1.5rem;
  color: #555;
  margin-top: 20px;
}

/* "Top" 버튼 */
.top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
  z-index: 1000;
}

.top-button:hover {
  background-color: #e64a19;
  transform: scale(1.1);
}
</style>
