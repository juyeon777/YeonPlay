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
        <div v-for="movie in movies" :key="movie.id" class="movie-item">
          <img :src="getPoster(movie)" :alt="movie.title" />
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.release_date || 'N/A' }}</p>
        </div>
      </div>
      <div ref="observer" class="scroll-observer" v-if="loading">Loading...</div>
      <button @click="scrollToTop" v-show="showTopButton" class="top-button">Top</button>
    </div>
  </div>
</template>

<script>
import tmdb from "@/api/tmdb";

export default {
  name: "PopularMovies", // 컴포넌트 이름
  data() {
    return {
      currentView: "table",
      movies: [],
      paginatedMovies: [],
      currentPage: 1,
      totalPages: null,
      loading: false,
      showTopButton: false, // Top 버튼 표시 여부
    };
  },
  methods: {
    async fetchMovies(page = 1) {
      if (this.loading) return;
      this.loading = true;

      try {
        const response = await tmdb.get("/movie/popular", { params: { page } });
        const { results, total_pages } = response.data;

        if (this.currentView === "infinite") {
          this.movies.push(...results); // 무한 스크롤: 데이터 누적
        } else {
          this.movies = results; // Table View: 현재 페이지 데이터
          this.paginateMovies();
        }

        this.totalPages = total_pages;
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        alert("Failed to load popular movies. Please try again.");
      } finally {
        this.loading = false;
      }
    },
    paginateMovies() {
      const start = (this.currentPage - 1) * 10;
      const end = start + 10;
      this.paginatedMovies = this.movies.slice(start, end);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.paginateMovies();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.paginateMovies();
      }
    },
    toggleView(view) {
      this.currentView = view;

      if (view === "table") {
        this.currentPage = 1;
        this.fetchMovies(1);
      } else if (view === "infinite") {
        this.movies = [];
        this.fetchMovies();
      }
    },
    getPoster(movie) {
      return movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/150x225?text=No+Image";
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" }); // 스크롤 맨 위로 이동
    },
    handleScroll() {
      this.showTopButton = window.scrollY > 300; // 스크롤 위치가 300px 이상일 때 Top 버튼 표시
    },
    observeScroll() {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.fetchMovies(this.currentPage + 1);
        }
      });

      observer.observe(this.$refs.observer);
    },
  },
  async created() {
    await this.fetchMovies();
    if (this.currentView === "infinite") {
      this.observeScroll();
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll); // 스크롤 이벤트 등록
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll); // 스크롤 이벤트 제거
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

.scroll-observer {
  text-align: center;
  margin-top: 20px;
}

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
