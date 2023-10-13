import { state } from '../main';
import { API_ENDPOINTS, API_RESOURCE } from '../config';
import { fetchFromApi } from '../helpers';

export class MovieModel {
  createMovieObject(movieData, objType) {
    const movie = movieData;
    if (objType === 'body') {
      return {
        id: movie.id,
        title: movie.title,
        background: movie.backdrop_path,
        poster: movie.poster_path,
        date: movie.release_date,
        vote_avg: movie.vote_average,
        ...(movie.genres && { categories: movie.genres }),
        ...(movie.genre_ids && { categories_ids: movie.genre_ids }),
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
        spoken_lang: movie.spoken_languages,
        homepage: movie.homepage,
        status: movie.status,
        prod_countries: movie.production_countries,
        prod_companies: movie.production_companies,
        ...(movie.revenue && { revenue: movie.revenue }),
        runtime: movie.runtime,
        popularity: movie.popularity,
        budget: movie.budget,
        ...(movie.belongs_to_collection && {
          btc: movie.belongs_to_collection,
        }),
        ...(movie.video && { video: movie.video }),
      };
    }
  }

  async getMovies(type) {
    // get all latest or popular moviesID
    const endpointKey = `${type}MoviesID`;
    try {
      const response = await fetchFromApi(API_ENDPOINTS[endpointKey]);
      const movies = response.results;
      return movies;
    } catch (error) {
      throw new Error(`Failed to fetch ${type} movies ID.`);
    }
  }

  async fetchMovies(movieId) {
    // get data of movie details
    try {
      const response = await fetchFromApi(API_ENDPOINTS.fetchMovies, movieId);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch latest movies.');
    }
  }

  async getAndSaveMovies(type) {
    // get latest movies id
    const movie = await this.getMovies(type);
    const db = type === 'latest' ? state.latest : state.popular;
    db.length = 0;
    for (const mov of movie) {
      // save latest moves data in state
      db.push(this.createMovieObject(mov, 'body'));
    }
  }

  async getMovieDetails(movieId) {
    // get movie details and save in state
    const movie = await this.fetchMovies(movieId);
    if (movie) {
      state.movieDetails.length = 0;
      state.movieDetails.push(this.createMovieObject(movie, 'details'));
    }
  }

  async fetchTrailers(movieId) {
    try {
      const response = await fetchFromApi(
        API_ENDPOINTS.fetchTrailers,
        movieId,
        API_RESOURCE.trailers
      );
      return response;
    } catch (error) {
      throw new Error('Failed to fetch recent trailers.');
    }
  }

  async fetchAndSaveTrailers() {
    console.log('fetch traillers');
    const trailerId = state.latest.map((mov) => mov.id);

    for (const id of trailerId) {
      const trailer = await this.fetchTrailers(id);
      state.latestTrailers.push(trailer.results[0]);
    }
  }

  async getDataToLatestTrailerComponent() {
    return state.latestTrailers.slice(0, 4);
  }

  async getDataToCarousel() {
    return state.latest.slice(0, 3);
  }

  async getAndSaveGenresForMovies() {
    try {
      const genres = await fetchFromApi(API_ENDPOINTS.fetchGenresMovie);
      for (const genre of genres.genres) {
        state.movieGenresList.push(genre);
      }
      console.log(state.movieGenresList);
    } catch (error) {
      throw new Error('Failed to fetch genres list');
    }
  }
}
