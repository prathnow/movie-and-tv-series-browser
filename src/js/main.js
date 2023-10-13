import { MainController } from './controllers/mainController';

export const state = {
  latest: [],
  latestTrailers: [],
  popular: [],
  movieDetails: [],
  movieGenresList: [],
};

const mainController = new MainController();
mainController.init();
