
import { createRouter, createWebHistory } from 'vue-router'; // Vue 3용 라우터 가져오기
import HomeView from '../views/HomeView.vue'; // 메인 페이지
import MovieDetailView from '../views/MovieDetailView.vue'; // 상세 페이지
import AboutView from '../views/AboutView.vue'; // About 페이지
import MovieList from '../components/MovieList.vue';
import MovieSearch from '../views/MovieSearch.vue'; // MovieSearch 임포트 추가
import NowPlayingView from '../views/NowPlayingView.vue'; // NowPlayingView 추가

// 라우트 정의
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/movie/:id', name: 'MovieDetail', component: MovieDetailView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/movielist', name: 'MovieList', component: MovieList },
  { path: '/search', name: 'MovieSearch', component: MovieSearch }, // 검색 페이지 추가
  { path: '/now-playing', name: 'NowPlaying', component: NowPlayingView }, 

];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // 히스토리 모드 설정
  routes,
});

export default router;