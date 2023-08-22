import { controlLatestMovies } from './controllers/movieController';

export const state = {
  movies: {},
  movieDetails: {},
};

const init = () => {
    controlLatestMovies();
};
init();
