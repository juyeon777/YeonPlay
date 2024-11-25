<template>
  <div>
    <h1>Search Results</h1>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading">로딩 중...</div>

    <!-- 검색 결과 -->
    <div v-else-if="movies.length" class="movie-grid">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="movie-item"
      >
        <img
          :src="movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750?text=No+Image'"
          :alt="movie.title"
        />
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.release_date || '개봉일 정보 없음' }}</p>
      </div>
    </div>

    <!-- 검색 결과 없음 -->
    <div v-else-if="!movies.length && !loading && query">
      <p>"{{ query }}"에 대한 검색 결과가 없습니다.</p>
    </div>

    <!-- 검색어가 비어 있을 때 -->
    <div v-else>
      <p>검색어를 입력해주세요.</p>
    </div>
  </div>
</template>

<script>
import tmdb from '@/api/tmdb';

export default {
  name: 'MovieSearch',
  data() {
    return {
      query: '', // 검색어
      movies: [], // 검색 결과
      loading: false, // 로딩 상태
    };
  },
  watch: {
    // URL 쿼리 파라미터 변경 시 검색 실행
    '$route.query.q': {
      immediate: true,
      handler(newQuery) {
        console.log('Route query parameter:', newQuery); // 쿼리 파라미터 확인
        if (newQuery) {
          this.query = newQuery; // 검색어 동기화
          this.searchMovies();
        } else {
          this.movies = []; // 검색어가 비었을 때 결과 초기화
        }
      },
    },
  },
  methods: {
    async searchMovies() {
      if (!this.query.trim()) {
        console.log('Empty search query');
        this.movies = [];
        return;
      }

      // 로딩 시작
      this.loading = true;
      console.log(`Searching for: ${this.query}`);
      console.log('API URL:', `https://api.themoviedb.org/3/search/movie?query=${this.query}&language=ko-KR`);

      try {
        const response = await tmdb.get('/search/movie', {
          params: {
            query: this.query,
            language: 'ko-KR',
          },
        });

        this.movies = response.data.results; // 영화 데이터 업데이트
        console.log('Search Results:', this.movies);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
        alert('영화 검색에 실패했습니다. 다시 시도해주세요.');
      } finally {
        this.loading = false; // 로딩 종료
      }
    },
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
}

.movie-item img {
  width: 100%;
  border-radius: 8px;
}

.movie-item h3 {
  margin: 10px 0 5px;
  font-size: 1.1rem;
}

.movie-item p {
  font-size: 0.9rem;
  color: #666;
}
</style>
