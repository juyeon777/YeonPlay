<template>
  <div>
    <h1>홈</h1>

    <!-- 현재 상영 중 -->
    <section>
      <h2>현재 상영 중</h2>
      <div class="movie-grid">
        <router-link
          v-for="movie in nowPlayingMovies"
          :key="movie.id"
          :to="`/movie/${movie.id}`"
          class="movie-item"
        >
          <img :src="getPoster(movie)" :alt="movie.title" />
          <h3>{{ movie.title }}</h3>
          <p>평점: {{ movie.vote_average }}</p>
        </router-link>
      </div>
    </section>

    <!-- 대세 콘텐츠 -->
    <section>
      <h2>대세 콘텐츠</h2>
      <div class="movie-grid">
        <router-link
          v-for="movie in popularMovies"
          :key="movie.id"
          :to="`/movie/${movie.id}`"
          class="movie-item"
        >
          <img :src="getPoster(movie)" :alt="movie.title" />
          <h3>{{ movie.title }}</h3>
          <p>평점: {{ movie.vote_average }}</p>
        </router-link>
      </div>
    </section>

    <!-- 높은 평점 영화 -->
    <section>
      <h2>높은 평점 영화</h2>
      <div class="movie-grid">
        <router-link
          v-for="movie in topRatedMovies"
          :key="movie.id"
          :to="`/movie/${movie.id}`"
          class="movie-item"
        >
          <img :src="getPoster(movie)" :alt="movie.title" />
          <h3>{{ movie.title }}</h3>
          <p>평점: {{ movie.vote_average }}</p>
        </router-link>
      </div>
    </section>

    <!-- 개봉 예정 -->
    <section>
      <h2>개봉 예정</h2>
      <div class="movie-grid">
        <router-link
          v-for="movie in upcomingMovies"
          :key="movie.id"
          :to="`/movie/${movie.id}`"
          class="movie-item"
        >
          <img :src="getPoster(movie)" :alt="movie.title" />
          <h3>{{ movie.title }}</h3>
          <p>개봉일: {{ movie.release_date }}</p>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import tmdb from "@/api/tmdb";

export default {
  name: "HomePage",
  data() {
    return {
      nowPlayingMovies: [], // 현재 상영 중인 영화
      popularMovies: [], // 대세 콘텐츠
      topRatedMovies: [], // 높은 평점 영화
      upcomingMovies: [], // 개봉 예정 영화
    };
  },
  methods: {
    async fetchMovies() {
      try {
        // 현재 상영 중
        const nowPlayingResponse = await tmdb.get("/movie/now_playing", {
          params: { language: "ko-KR", page: 1 },
        });
        this.nowPlayingMovies = nowPlayingResponse.data.results;

        // 대세 콘텐츠
        const popularResponse = await tmdb.get("/movie/popular", {
          params: { language: "ko-KR", page: 1 },
        });
        this.popularMovies = popularResponse.data.results;

        // 높은 평점 영화
        const topRatedResponse = await tmdb.get("/movie/top_rated", {
          params: { language: "ko-KR", page: 1 },
        });
        this.topRatedMovies = topRatedResponse.data.results;

        // 개봉 예정
        const upcomingResponse = await tmdb.get("/movie/upcoming", {
          params: { language: "ko-KR", page: 1 },
        });
        this.upcomingMovies = upcomingResponse.data.results;
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        alert("영화 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    },
    getPoster(movie) {
      return movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/150x225?text=No+Image";
    },
  },
  async created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

section {
  margin-bottom: 40px;
}

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

.movie-item h3 {
  font-size: 1rem;
  margin: 10px 0;
}

.movie-item p {
  font-size: 0.9rem;
  color: #555;
}
</style>
