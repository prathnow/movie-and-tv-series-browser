import { MovieModel } from '../models/movieModel';
import { MovieView } from '../views/movieView';
import { state } from '../main';

export class MovieController {
  constructor() {
    this.view = new MovieView();
    this.model = new MovieModel();
  }

  async showMovieDetailsPage(movieId) {
    if (!movieId) throw new Error('Invalid movieId');

    try {
      await this.model.getMovieDetails(movieId);
      await this.model.fetchMovieCredits(movieId)
      this.view.renderMovieDetailsPage(state.movieDetails);
    } catch (error) {
      console.log(error);
    }
  }
}
