<template>
  <div>
    <!-- 로딩 중 -->
    <div v-if="loading">로딩 중...</div>
    <!-- 영화 상세 정보 -->
    <div v-else-if="movie">
      <h1>{{ movie.title }}</h1>
      <img 
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
        :alt="movie.title" 
      />
      <p>{{ movie.overview || "영화 설명이 없습니다." }}</p>
      <p><strong>개봉일:</strong> {{ movie.release_date }}</p>
      <p><strong>평점:</strong> {{ movie.vote_average }}/10</p>
      
      <!-- 찜하기 버튼 -->
      <button @click="addToWishlist" class="wishlist-btn">찜하기</button>
    </div>
    <!-- 영화 데이터를 찾을 수 없을 때 -->
    <div v-else>
      <p>영화를 찾을 수 없습니다. 나중에 다시 시도해 주세요.</p>
    </div>
  </div>
</template>

<script>
import tmdb from "@/api/tmdb";

export default {
  name: "MovieDetailView",
  data() {
    return {
      movie: null, // 영화 상세 정보
      loading: true, // 로딩 상태
    };
  },
  methods: {
    // TMDB API로 영화 상세 정보 가져오기
    async fetchMovieDetails() {
      try {
        const movieId = this.$route.params.id; // URL 파라미터에서 영화 ID 가져오기
        const response = await tmdb.get(`/movie/${movieId}`, {
          params: { language: "ko-KR" },
        });
        this.movie = response.data; // 영화 데이터 저장
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        alert("영화 정보를 불러오지 못했습니다. 다시 시도해 주세요.");
      } finally {
        this.loading = false; // 로딩 상태 종료
      }
    },
    // 찜하기 기능
    addToWishlist() {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const alreadyInWishlist = wishlist.some((item) => item.id === this.movie.id);

      if (!alreadyInWishlist) {
        wishlist.push({
          id: this.movie.id,
          title: this.movie.title,
          release_date: this.movie.release_date,
          poster_path: this.movie.poster_path,
          vote_average: this.movie.vote_average,
        });
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("찜한 콘텐츠에 추가되었습니다!");
      } else {
        alert("이미 찜한 콘텐츠입니다.");
      }
    },
  },
  async created() {
    this.fetchMovieDetails(); // 컴포넌트 생성 시 영화 상세 정보 가져오기
  },
};
</script>

<style scoped>
img {
  max-width: 300px;
  border-radius: 8px;
  margin-bottom: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.1rem;
  margin: 5px 0;
}

/* 찜하기 버튼 스타일 */
.wishlist-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.wishlist-btn:hover {
  background-color: #369d6c;
}
</style>
