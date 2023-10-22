export const API_URL = 'https://api.themoviedb.org/3';
export const API_KEY = '8f83e040d081ec959ac8969f7f923394';
export const TIMEOUT_SEC = 10;

export const API_ENDPOINTS = {
  latestMoviesID: '/movie/now_playing',
  popularMoviesID: '/movie/popular',
  fetchMovies: '/movie',
  fetchTrailers: '/movie',
  fetchGenresMovie: '/genre/movie/list',
};

export const API_RESOURCE = {
  trailers: 'videos',
  latestTrailers: 'movie/latest/videos',
  fetchMovieCredits: 'credits'
};
