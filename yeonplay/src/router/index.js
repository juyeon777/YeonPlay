
import { createRouter, createWebHistory } from 'vue-router'; // Vue 3용 라우터 가져오기
import HomeView from '../views/HomeView.vue'; // 메인 페이지
import MovieDetailView from '../views/MovieDetailView.vue'; // 상세 페이지
import AboutView from '../views/AboutView.vue'; // About 페이지
import MovieText from '../components/MovieText.vue';
import MovieList from '../components/MovieList.vue';

// 라우트 정의
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/movie/:id', name: 'MovieDetail', component: MovieDetailView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/movietest', name: 'MovieText', component: MovieText }, // 새로운 라우트 추가
  { path: '/movielist', name: 'MovieList', component: MovieList }

];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // 히스토리 모드 설정
  routes,
});

export default router;