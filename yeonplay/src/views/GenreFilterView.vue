<template>
  <div>
    <h1>장르별 영화</h1>
    <div class="filter-container">
      <label for="genre">장르 선택:</label>
      <select id="genre" v-model="selectedGenre" @change="filterMovies">
        <option value="">모든 장르</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>
    </div>
    <div v-if="loading" class="loading">로딩 중...</div>
    <div v-else-if="movies.length" class="movie-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-item">
        <img
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'"
          :alt="movie.title"
        />
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.release_date || '개봉일 정보 없음' }}</p>
      </div>
    </div>
    <div v-else>
      <p>선택한 장르에 해당하는 영화를 찾을 수 없습니다.</p>
    </div>
  </div>
</template>

<script>
import tmdb from '@/api/tmdb';

export default {
  name: 'GenreFilterView',
  data() {
    return {
      genres: [], // 장르 목록
      movies: [], // 필터링된 영화 데이터
      selectedGenre: '', // 선택된 장르 ID
      loading: true, // 로딩 상태
    };
  },
  async created() {
    await this.fetchGenres(); // 장르 목록 가져오기
    await this.fetchMovies(); // 모든 영화 가져오기
  },
  methods: {
    // 장르 목록 가져오기
    async fetchGenres() {
      try {
        const response = await tmdb.get('/genre/movie/list', {
          params: { language: 'ko-KR' },
        });
        this.genres = response.data.genres;
      } catch (error) {
        console.error('Failed to fetch genres:', error);
        alert('장르 목록을 불러오는 데 실패했습니다.');
      }
    },
    // 영화 가져오기 (필터링 포함)
    async fetchMovies() {
      this.loading = true;
      try {
        const response = await tmdb.get('/discover/movie', {
          params: {
            language: 'ko-KR',
            with_genres: this.selectedGenre || undefined, // 장르 필터 적용
          },
        });
        this.movies = response.data.results;
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        alert('영화 목록을 불러오는 데 실패했습니다.');
      } finally {
        this.loading = false;
      }
    },
    // 장르 변경 시 영화 필터링
    async filterMovies() {
      await this.fetchMovies();
    },
  },
};
</script>

<style scoped>
.filter-container {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.filter-container select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #666;
}

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
</style>
