import { API_ENDPOINTS, API_RESOURCE } from './config';
import { fetchFromApi } from './helpers';
import { controlLatestMovies } from './controllers/movieController';

export const state = {
  movies: [],
  movieDetails: {},
};

const init = () => {
    controlLatestMovies();
};
init();
