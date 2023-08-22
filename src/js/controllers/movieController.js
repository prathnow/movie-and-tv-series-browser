import movieView from '../views/movieView';
import * as movieModel from '../models/movieModel'
import { state } from '../main';

export const controlMovieDetails = async function (movieId) {
  try {
    if (movieId) return;

    await movieModel.getMovieDetails(movieId);
    movieView.renderMovieDetails(state.movieDetails);
  } catch (err) {
    console.error(err);
  }
};

export const controlLatestMovies = async function () {
  try {
    await movieModel.getLatestMovies();
    movieView.renderLatestMovies(state.movies);
  } catch (err) {
    console.error(err);
  }
};
