import { state } from '../main';
import { API_ENDPOINTS, API_RESOURCE, API_URL } from '../config';
import { API_KEY } from '../config';
import { fetchFromApi } from '../helpers';

const getMoviesID = async function (type) {
  // get all latest or popular moviesID
  const endpointKey = `${type}MoviesID`;
  try {
    const response = await fetchFromApi(API_ENDPOINTS[endpointKey]);
    const moviesID = response.results.map(({ id }) => id);
    return moviesID;
  } catch (error) {
    throw new Error(`Failed to fetch ${type} movies ID.`);
  }
};

const createMovieObject = function (movieData, objType) {
  const movie = movieData;
  if (objType === 'body') {
    return {
      id: movie.id,
      title: movie.title,
      background: movie.backdrop_path,
      date: movie.release_date,
      categories: movie.genres,
    };
  }
  if (objType === 'details') {
    return {
      id: movie.id,
      imdb_id: movie.imdb_id,
      title: movie.title,
      title_original: movie.original_title,
      date: movie.release_date,
      overview: movie.overview,
      tagline: movie.tagline,
      categories: movie.genres,
      background: movie.backdrop_path,
      poster: movie.poster_path,
      vote_avg: movie.vote_average,
      vote_count: movie.vote_count,
      org_lang: movie.original_language,
      spoke_lang: movie.spoken_language,
      homepage: movie.homepage,
      prod_countries: movie.production_countries,
      prod_companies: movie.production_companies,
      ...(movie.revenue && { revenue: movie.revenue }),
      ...(movie.video && { video: movie.video }),
    };
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
  const moviesID = await getMoviesID('latest');
  for (const id of moviesID) {
    const movieInfo = await fetchMovies(id);
    if (movieInfo) {
      state.movies.push(createMovieObject(movieInfo, 'body'));
    }
  }
};

export const getMovieDetails = async function (movieId) {
  // get movie details
  const movie = await fetchMovies(movieId);
  if (movie) state.movieDetails.push(createMovieObject(movie, 'details'));
};

export const fetchTrailers = async function (movieID) {
  try {
    const response = await fetchFromApi(
      API_ENDPOINTS.fetchTrailers,
      movieID,
      API_RESOURCE.trailers
    );
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
