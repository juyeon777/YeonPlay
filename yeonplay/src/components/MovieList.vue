<template>
  <div class="movie-list">
    <!-- 영화 목록 -->
    <div v-if="movies.length > 0" v-for="movie in movies" :key="movie.id" class="movie-item">
      <router-link :to="`/movie/${movie.id}`">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
        <h3>{{ movie.title }}</h3>
      </router-link>
    </div>
    <!-- 로딩 상태 -->
    <div v-else>
      <p>Loading movies...</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movies: {
      type: Array,
      required: true, // `movies` 데이터를 필수로 받음
    },
  },
};
</script>

<style>
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
.movie-item {
  width: 150px;
  text-align: center;
}
</style>
