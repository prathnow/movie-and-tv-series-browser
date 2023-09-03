import { state } from '../main';
import { API_ENDPOINTS, API_RESOURCE, API_URL } from '../config';
import { API_KEY } from '../config';
import { fetchFromApi } from '../helpers';

const getLatestMoviesID = async function () {
  // get all latest moviesID
  try {
    const response = await fetchFromApi(API_ENDPOINTS.latestMoviesID);
    const moviesID = response.results.map(({ id }) => id);
    return moviesID;
  } catch (error) {
    throw new Error('Failed to fetch latest movies ID.');
  }
};

export const getPopularMoviesID = async function () {
  // get all popular moviesID
  try {
    const response = await fetchFromApi(API_ENDPOINTS.popularMoviesID);
    const moviesID = response.results.map(({ id }) => id);
    return moviesID;
  } catch (error) {
    throw new Error('Failed to fetch popular movies ID.');
  }
};

export const fetchMovies = async function (movieID) {
  // get Movies
  try {
    const response = await fetchFromApi(API_ENDPOINTS.fetchMovies, movieID);
    return response;
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

export const fetchTrailers = async function (movieID) {
  try {
    const response = await fetchFromApi(API_ENDPOINTS.fetchTrailers, movieID, API_RESOURCE.trailers)
    return data;
  } catch (error) {
    throw new Error('Failed to fetch recent trailers.');
  }
};

export const getCarousel = async function () {
  if (state.movies.length == 0) {
    await getAndSaveLatestMovies();
  }
  const moviesToCarousel = state.movies.slice(0, 3);
  return moviesToCarousel;
};
