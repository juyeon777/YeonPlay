<template>
  <div>
    <h1>대세 콘텐츠</h1>

    <!-- View 전환 버튼 -->
    <div class="view-toggle">
      <button @click="toggleView('table')" :disabled="currentView === 'table'">Table View</button>
      <button @click="toggleView('infinite')" :disabled="currentView === 'infinite'">Infinite Scroll</button>
    </div>

    <!-- Table View -->
    <div v-if="currentView === 'table'" class="table-view">
      <table>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in paginatedMovies" :key="movie.id">
            <td>
              <img :src="getPoster(movie)" :alt="movie.title" />
            </td>
            <td>{{ movie.title }}</td>
            <td>{{ movie.release_date || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>

    <!-- Infinite Scroll View -->
    <div v-else class="infinite-scroll-view">
      <div class="movie-grid">
        <router-link
          v-for="movie in movies"
          :key="movie.id"
          :to="`/movie/${movie.id}`"
          class="movie-item"
        >
          <img :src="getPoster(movie)" :alt="movie.title" />
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.release_date || 'N/A' }}</p>
        </router-link>
      </div>
      <div ref="observer" class="scroll-observer" v-if="loading">Loading...</div>
    </div>

    <!-- Top 버튼 -->
    <button @click="scrollToTop" class="top-button">Top</button>
  </div>
</template>

<script>
import tmdb from "@/api/tmdb";

export default {
  name: "PopularMovies", // 컴포넌트 이름
  data() {
    return {
      currentView: "table", // 현재 View 상태 ('table' 또는 'infinite')
      movies: [], // 영화 데이터 목록
      paginatedMovies: [], // Table View에서 보여줄 데이터
      currentPage: 1, // 현재 페이지 번호
      totalPages: null, // 총 페이지 수
      loading: false, // 로딩 상태
    };
  },
  methods: {
    // API를 통해 영화 데이터 가져오기
    async fetchMovies(page = 1) {
      if (this.loading) return; // 중복 호출 방지
      this.loading = true;

      try {
        const response = await tmdb.get("/movie/popular", { params: { page } });
        const { results, total_pages } = response.data;

        // 무한 스크롤 상태일 경우 데이터 누적
        if (this.currentView === "infinite") {
          this.movies.push(...results);
        } else {
          this.movies = results;
          this.paginateMovies(); // Table View에서는 페이지 데이터 설정
        }

        this.totalPages = total_pages;
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        alert("영화 데이터를 불러오지 못했습니다. 다시 시도해주세요.");
      } finally {
        this.loading = false;
      }
    },

    // Table View에서 현재 페이지의 데이터를 설정
    paginateMovies() {
      const start = (this.currentPage - 1) * 10;
      const end = start + 10;
      this.paginatedMovies = this.movies.slice(start, end);
    },

    // Table View 이전 페이지
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.paginateMovies();
      }
    },

    // Table View 다음 페이지
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.paginateMovies();
      }
    },

    // View 전환 버튼
    toggleView(view) {
      this.currentView = view;

      if (view === "table") {
        this.currentPage = 1;
        this.fetchMovies(1); // 첫 페이지 데이터 로드
      } else if (view === "infinite") {
        this.movies = [];
        this.fetchMovies(); // 무한 스크롤 초기 데이터 로드
      }
    },

    // 영화 포스터 URL 반환
    getPoster(movie) {
      return movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/150x225?text=No+Image";
    },

    // Top 버튼 클릭 시 스크롤을 맨 위로 이동
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    // 무한 스크롤: 스크롤 하단에 도달 시 다음 페이지 데이터 가져오기
    observeScroll() {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.fetchMovies(this.currentPage + 1);
        }
      });

      observer.observe(this.$refs.observer);
    },
  },

  // 컴포넌트 생성 시 데이터 로드
  async created() {
    await this.fetchMovies(); // 초기 데이터 로드
    if (this.currentView === "infinite") {
      this.observeScroll();
    }
  },
};
</script>

<style scoped>
.view-toggle {
  margin-bottom: 20px;
}

.table-view table {
  width: 100%;
  border-collapse: collapse;
}

.table-view th,
.table-view td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.movie-item {
  text-decoration: none; /* 기본 스타일 제거 */
  color: inherit;
  outline: none;
}

.movie-item:focus,
.movie-item:active {
  outline: none;
}

.scroll-observer {
  text-align: center;
  margin-top: 20px;
}

/* 항상 화면 하단에 고정된 Top 버튼 */
.top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
}

.top-button:hover {
  background-color: #369d6c;
}
</style>
