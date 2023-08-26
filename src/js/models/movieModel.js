import { state } from '../main';
import { API_URL } from '../config';
import { API_KEY } from '../config';

const getLatestMoviesID = async function () {
  // get all latest moviesID
  try {
    const response = await fetch(
      `${API_URL}/movie/now_playing?api_key=${API_KEY}`
    );
    const data = await response.json();
    const moviesID = data.results.map(({ id }) => id);
    return moviesID;
  } catch (error) {
    throw new Error('Failed to fetch latest movies ID.');
  }
};

export const fetchMovies = async function (movieID) {
  // get Movies
  try {
    const response = await fetch(
      `${API_URL}/movie/${movieID}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch latest movies.');
  }
};

export const getAndSaveLatestMovies = async function () {
  const moviesID = await getLatestMoviesID();
  for (const id of moviesID) {
    const movieInfo = await fetchMovies(id);
    if (movieInfo) {
      state.movies.push(movieInfo);
    }
  }
};

export const getMovieDetails = async function (movieId) {
  // get movie details
};

export const getRecentTrailers = async function (trailers) {};

export const getCarousel = async function () {
  if (state.movies.length == 0) {
    await getAndSaveLatestMovies();
  }
  const moviesToCarousel = state.movies.slice(0, 3);
  return moviesToCarousel;
};
