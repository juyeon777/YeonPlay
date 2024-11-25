<template>
  <div>
    <div v-if="loading">로딩 중...</div>
    <div v-else-if="movie">
      <h1>{{ movie.title }}</h1>
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
      <p>{{ movie.overview }}</p>
      <p><strong>개봉일:</strong> {{ movie.release_date }}</p>
      <p><strong>평점:</strong> {{ movie.vote_average }}/10</p>
    </div>
    <div v-else>
      <p>영화를 찾을 수 없습니다. 나중에 다시 시도해 주세요.</p>
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
      const response = await tmdb.get(`/movie/${movieId}`, {
        params: {
          language: 'ko-KR', // 한글로 언어 설정
        },
      });
      this.movie = response.data;
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
      // 한글로 변경
      alert('영화 정보를 불러오지 못했습니다. 다시 시도해 주세요.');
    } finally {
      this.loading = false;
    }
  },
};
</script>
