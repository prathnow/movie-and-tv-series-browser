import { MainController } from './controllers/mainController';

export const state = {
  latest: [],
  latestTrailers: [],
  popular: [],
  movieDetails: [],
  movieDetailsCredits: [],
  movieGenresList: [],
};

const mainController = new MainController();
mainController.init();
