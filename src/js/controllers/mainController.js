import { MainView } from '../views/mainView';
import { MovieModel } from '../models/movieModel';
import { MovieController } from './movieController';
import { state } from '../main';

export class MainController {
  constructor() {
    this.mainView = new MainView();
    this.model = new MovieModel();
    this.movie = new MovieController();
  }

  init() {
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;
    const pathId = path.split('/').pop();
    if (path === '/') {
      this.renderMainPage();
    } else if (path.startsWith('/movie/')) {
      this.movie.showMovieDetailsPage(pathId);
    } else {
      this.mainView.showNotFoundPage();
    }
  }

  async showMoviesComponent(type) {
    try {
      if (!state.movies || state.movies.length === 0)
        await this.model.getAndSaveMovies(type);
      if (type === 'latest') {
        this.mainView.renderLatestMoviesComponent(state.latest.slice(3, 9));
      } else {
        this.mainView.renderPopularMoviesComponent(state.popular.slice(0, 6));
      }
      console.log(`show ${type} movies component`);
    } catch (error) {
      console.error(error);
    }
  }

  async showCarouselComponent() {
    const moviesToCarousel = await this.model.getDataToCarousel();
    await this.mainView.renderCarouselComponent(
      moviesToCarousel,
      state.movieGenresList
    );
    console.log('show carousel component');
  }

  async showRecentTrailersComponent() {
    const trailers = await this.model.getDataToLatestTrailerComponent();
    this.mainView.renderRecentTrailersComponent(trailers);
  }

  async renderMainPage() {
    await this.model.getAndSaveMovies('latest');
    await this.model.getAndSaveMovies('popular');
    await this.model.fetchAndSaveTrailers();
    await this.model.getAndSaveGenresForMovies();
    await this.showCarouselComponent();
    await this.mainView.renderSearchBar();
    await this.showMoviesComponent('latest');
    await this.showRecentTrailersComponent();
    await this.showMoviesComponent('popular');
  }
}
