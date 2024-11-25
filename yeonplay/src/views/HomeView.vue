<template>
  <div>
    <h1>Popular Movies</h1>
    <MovieList :movies="movies" />
  </div>
</template>

<script>
import tmdb from '@/api/tmdb'; // TMDB API 가져오기
//import MovieList from '@/components/MovieList.vue'; // MovieList 컴포넌트 가져오기

export default {
  data() {
    return {
      movies: [], // 영화 데이터를 저장할 배열
    };
  },
  async created() {
    try {
      const response = await tmdb.get('/movie/popular'); // TMDB API 호출
      this.movies = response.data.results; // 응답 데이터를 movies에 저장
    } catch (error) {
      console.error('Failed to fetch popular movies:', error); // 에러 로그 출력
      alert('Failed to load popular movies. Please try again later.'); // 사용자 알림
    }
  },
};
</script>
