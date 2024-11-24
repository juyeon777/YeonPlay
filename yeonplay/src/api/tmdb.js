import axios from 'axios';

// .env 파일에서 환경 변수 가져오기
const apiKey = process.env.VUE_APP_TMDB_API_KEY;
const baseURL = process.env.VUE_APP_TMDB_BASE_URL;

/*// axios 인스턴스 생성
const tmdb = axios.create({
  baseURL, // 기본 URL 설정
  params: {
    api_key: apiKey, // API 키를 기본 파라미터로 설정
  },
});*/

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.VUE_APP_TMDB_API_KEY,
        //language: 'ko-KR'
    },
});

export default tmdb; // axios 인스턴스 내보내기
