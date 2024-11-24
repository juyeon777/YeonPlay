<template>
  <div>
    <h1>{{ movie.title }}</h1>
    <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
    <p>{{ movie.overview }}</p>
  </div>
</template>

<script>
import tmdb from '@/api/tmdb';

export default {
  data() {
    return {
      movie: {}, // API로 가져올 단일 영화 데이터를 저장
    };
  },
  async created() {
    const movieId = this.$route.params.id; // URL에서 영화 ID 가져오기
    const response = await tmdb.get(`/movie/${movieId}`); // 영화 상세 정보 API 호출
    this.movie = response.data; // Vue의 data 속성에 저장
  },
};
</script>
