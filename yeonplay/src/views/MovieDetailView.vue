<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="movie">
      <h1>{{ movie.title }}</h1>
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
      <p>{{ movie.overview }}</p>
      <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
      <p><strong>Rating:</strong> {{ movie.vote_average }}/10</p>
    </div>
    <div v-else>
      <p>Movie not found. Try again later.</p>
    </div>
  </div>
</template>

<script>
import tmdb from '@/api/tmdb';

export default {
  data() {
    return {
      movie: null,
      loading: true,
    };
  },
  async created() {
    try {
      const movieId = this.$route.params.id;
      const response = await tmdb.get(`/movie/${movieId}`);
      this.movie = response.data;
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
      alert('Failed to load movie details. Please try again later.');
    } finally {
      this.loading = false;
    }
  },
};
</script>
