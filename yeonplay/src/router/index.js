import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
//import VueRouter from 'vue-router';
import MovieList from '@/components/MovieList.vue'
import HomeView from '../views/HomeView.vue'; // 메인 페이지
import MovieDetailView from '../views/MovieDetailView.vue'; // 상세 페이지
import AboutView from '../views/AboutView.vue'; // About 페이지


Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: HomeView }, // 메인 페이지
  { path: '/movie/:id', name: 'MovieDetail', component: MovieDetailView }, // 상세 페이지
  { path: '/about', name: 'About', component: AboutView }, // About 페이지 추가
];

/*const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
*/
export default router;
