<template>
  <div>
    <h1>Popular Movies</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="movies.length">
      <MovieList :movies="movies" />
    </div>
    <div v-else>
      <p>No movies found. Try again later.</p>
    </div>
  </div>
</template>

<script>
import tmdb from '@/api/tmdb';
import MovieList from '@/components/MovieList.vue';

export default {
  components: { MovieList },
  data() {
    return {
      movies: [],
      loading: true,
    };
  },
  async created() {
    try {
      const response = await tmdb.get('/movie/popular');
      this.movies = response.data.results;
    } catch (error) {
      console.error('Failed to fetch popular movies:', error);
      alert('Failed to load popular movies. Please try again later.');
    } finally {
      this.loading = false;
    }
  },
};
</script>
