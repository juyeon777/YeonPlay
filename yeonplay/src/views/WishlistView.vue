<template>
  <div class="wishlist-container">
    <h1>내가 찜한 콘텐츠</h1>

    <!-- 찜한 콘텐츠가 없을 경우 -->
    <div v-if="wishlist.length === 0" class="empty-message">
      <p>찜한 콘텐츠가 없습니다.</p>
    </div>

    <!-- 찜한 콘텐츠가 있을 경우 -->
    <div v-else class="wishlist-grid">
      <div v-for="item in wishlist" :key="item.id" class="wishlist-item">
        <img 
          :src="item.poster_path 
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
            : 'https://via.placeholder.com/500x750?text=No+Image'"
          :alt="item.title" 
        />
        <h2>{{ item.title }}</h2>
        <p><strong>개봉일:</strong> {{ item.release_date || '정보 없음' }}</p>
        <p><strong>평점:</strong> {{ item.vote_average }}/10</p>
        <button @click="removeFromWishlist(item.id)" class="remove-btn">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WishlistView',
  data() {
    return {
      wishlist: [], // 찜한 영화 데이터
    };
  },
  methods: {
    // 찜 리스트 불러오기
    loadWishlist() {
      const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      this.wishlist = storedWishlist;
    },
    // 찜 리스트에서 항목 삭제
    removeFromWishlist(id) {
      this.wishlist = this.wishlist.filter((item) => item.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      alert('찜한 콘텐츠가 삭제되었습니다.');
    },
  },
  created() {
    this.loadWishlist(); // 컴포넌트 생성 시 찜 리스트 로드
  },
};
</script>

<style scoped>
.wishlist-container {
  text-align: center;
  padding: 20px;
}

.empty-message {
  color: #888;
  font-size: 1.2rem;
}

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.wishlist-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.wishlist-item img {
  width: 100%;
  border-radius: 8px;
}

.wishlist-item h2 {
  margin: 10px 0;
  font-size: 1.2rem;
}

.wishlist-item p {
  margin: 5px 0;
  font-size: 0.9rem;
  color: #555;
}

.remove-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #c0392b;
}
</style>
