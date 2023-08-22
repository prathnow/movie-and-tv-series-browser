import { state } from '../main';
import { API_URL } from '../config';
import { API_KEY } from '../config';

export const getLatestMovies = async function () {
  // get all latest movies
  try {
    const response = await fetch(
      `${API_URL}/movie/now_playing?api_key=${API_KEY}`
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
