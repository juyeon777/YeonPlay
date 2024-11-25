<template>
  <div>
    <h1>Search Movies</h1>
    <div class="search-container">
      <input
        type="text"
        v-model="query"
        placeholder="Enter movie name..."
        @keyup.enter="searchMovies"
      />
      <button @click="searchMovies">Search</button>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="movies.length" class="movie-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-item">
        <img
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'"
          :alt="movie.title"
        />
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.release_date || 'No release date available' }}</p>
      </div>
    </div>
    <div v-else-if="!movies.length && !loading && query">
      <p>No results found for "{{ query }}".</p>
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
  methods: {
    async searchMovies() {
      if (!this.query.trim()) return; // 빈 검색어는 무시
      this.loading = true; // 로딩 시작
      try {
        const response = await tmdb.get('/search/movie', {
          params: { query: this.query },
        });
        this.movies = response.data.results;
      } catch (error) {
        console.error('Failed to search movies:', error);
        alert('Failed to search movies. Please try again.');
      } finally {
        this.loading = false; // 로딩 종료
      }
    },
  },
};
</script>

<style scoped>
.search-container {
  margin: 20px 0;
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

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
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

.movie-item h3 {
  margin: 10px 0 5px;
  font-size: 1.1rem;
}

.movie-item p {
  font-size: 0.9rem;
  color: #666;
}
</style>
