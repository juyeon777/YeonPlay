import { createRouter, createWebHistory } from 'vue-router'; // Vue 3용 라우터 가져오기
import HomeView from '../views/HomeView.vue'; // 메인 페이지
import MovieDetailView from '../views/MovieDetailView.vue'; // 상세 페이지
import AboutView from '../views/AboutView.vue'; // About 페이지
import MovieList from '../components/MovieList.vue';
import MovieSearch from '../views/MovieSearch.vue'; // MovieSearch 임포트 추가
import NowPlayingView from '../views/NowPlayingView.vue'; // NowPlayingView 추가
import GenreFilterView from '../views/GenreFilterView.vue'; // 장르별 필터 추가
import SignInView from '../views/SignIn.vue'; // 로그인/회원가입 페이지 추가

// 라우트 정의
const routes = [
  { path: '/signin', name: 'SignIn', component: SignInView }, // 로그인/회원가입 페이지
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }, // 보호된 경로
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetailView,
    meta: { requiresAuth: true }, // 보호된 경로
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }, // 보호된 경로
  },
  {
    path: '/movielist',
    name: 'MovieList',
    component: MovieList,
    meta: { requiresAuth: true }, // 보호된 경로
  },
  {
    path: '/search',
    name: 'SearchMovies',
    component: MovieSearch,
    meta: { requiresAuth: true }, // 보호된 경로
  },
  {
    path: '/now-playing',
    name: 'NowPlaying',
    component: NowPlayingView,
    meta: { requiresAuth: true }, // 보호된 경로
  },
  {
    path: '/genres',
    name: 'GenreFilter',
    component: GenreFilterView,
    meta: { requiresAuth: true }, // 보호된 경로
  },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // 히스토리 모드 설정
  routes,
});

// 전역 가드: 로그인이 필요한 경로 보호
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 로컬 스토리지로 로그인 상태 확인

  // 로그인 상태가 필요한 경우
  if (to.meta.requiresAuth && !isLoggedIn) {
    alert('로그인이 필요합니다.');
    next({ name: 'SignIn' }); // 로그인 페이지로 리다이렉트
  } else if (to.name === 'SignIn' && isLoggedIn) {
    // 이미 로그인된 상태에서 로그인/회원가입 페이지로 접근 시 메인으로 리다이렉트
    next({ name: 'Home' });
  } else {
    next(); // 조건 충족 시 이동
  }
});

export default router;
