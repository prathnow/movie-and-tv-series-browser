import { state } from '../main';

export const getLatestMovies = async function () {
  // get all latest movies
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=8f83e040d081ec959ac8969f7f923394`
    );
    const data = await response.json();
    state.movies = data;
    return state.movies.results;
  } catch (error) {
    throw new Error('Failed to fetch latest movies.');
  }
};

export const getMovieDetails = async function (movieId) {
  // get movie details
};

export const getRecentTrailers = async function (trailers) {};

export const getCarousel = async function (movies) {};
