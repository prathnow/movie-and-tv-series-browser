import { state } from '../main';
import { DOMList } from './domList';

export class MovieView {
  renderMovieDetailsPage(movieDetails) {
    // Rendering full information about the movie
    const movie = movieDetails[0];
    const releaseYear = new Date(movie.date).getFullYear();
    const releaseDate = new Date(movie.date).toLocaleDateString();
    const categories = movie.categories
      .map(
        (category) => `<a href="/category/${category.id}">${category.name}</a>`
      )
      .join(', ');
    const productionCountries = movie.prod_countries
      .map((country) => country.name)
      .join(', ');
    const productionCompanies = movie.prod_companies
      .map((company) => company.name)
      .join(', ');
    const revenue = movie.revenue ? `$${movie.revenue.toLocaleString()}` : '$0';

    const allActors = state.movieDetailsCredits.cast;
    console.log(allActors.length);
    const actorsPerPage = 7; // Liczba aktorów do wyświetlenia na stronie
    let currentPage = 1;

    const displayActors = (page = 1) => {
      const startIndex = (page - 1) * actorsPerPage;
      const endIndex = startIndex + actorsPerPage;
      const actorsToDisplay =
        page === 0 ? allActors : allActors.slice(startIndex, endIndex);
      currentPage = page;

      const actorsHTML = actorsToDisplay
        .map((actor) => {
          return `<div class="movie__actorCard">
          <a class="movie__actor--img-link" href="/person/${actor.id}">${
            actor.profile_path
              ? `<img src="https://www.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}">`
              : ``
          }</a>
          <p><a class="movie__actor--link" href="/person/${actor.id}">${
            actor.name
          }</a></p>
          <p class="movie__actor--character">${actor.character
            .split('/')
            .join('<br>')}</p>
          </div>
          `;
        })
        .join('');

      return actorsHTML;
    };

    const displayCrew = () => {
      const allCrew = state.movieDetailsCredits.crew;

      const crewHTML =
        `<div class="movie__credits--cast"><h3>Actors</h3></div>
        <div class="movie__actors">
        ${displayActors(0)} 
        </div>
        <div class="movie__credits--cast"><h3>Others</h3></div>
        <div class="movie__actors">` +
        allCrew
          .map((crew) => {
            return `<div class="movie__crewCard">
          <a class="movie__crew--img-link" href="/person/${crew.id}">${
              crew.profile_path
                ? `<img src="https://www.themoviedb.org/t/p/w138_and_h175_face/${crew.profile_path}">`
                : ``
            }</a>
          <p class="movie__crew--person"><a class="movie__crew--link" href="/person/${
            crew.id
          }">${crew.name}</a></p>
          <p class="movie__crew--character">${crew.job
            .split('/')
            .join('<br>')}</p>
          </div>
          `;
          })
          .join('') +
        `</div>`;

      const app = document.querySelector('.movie__credits');
      app.innerHTML = '';
      app.insertAdjacentHTML('afterbegin', crewHTML);
    };

    const addDisplayActors = (page) => {
      const div = document.querySelector('.movie__actors');
      const markup = displayActors(page);
      console.log(markup);
      div.insertAdjacentHTML('beforeend', markup);

      allActors.length <= page * actorsPerPage
        ? (document.querySelector('.movie__showMoreButton').style.display =
            'none')
        : '';
    };

    const markup = `
      <div class="movie">
        <div class="movie__header" style="background-image: url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${
          movie.background
        }')">
          <div class="movie__header--bg">
            <section class="movie__details">
              <div class="movie__details--poster">
                <img id="poster" alt="Movie Poster" src="https://www.themoviedb.org/t/p/w220_and_h330_face/${
                  movie.poster
                }">
              </div>
              <div class="movie__details--overview">
                <h1 class="movie__header--h1">${
                  movie.title
                } <span class="movie__header--span">(${releaseYear})</span></h1>
                <p class="movie__header--newline">${releaseDate} (${
      movie.org_lang
    }) | ${categories}</p>
                  <button class="btn-action btn-action__watch">Watch trailer</button>
                  <button class="btn-action btn-action__favorite">
                    Add to favorite
                  </button>
                  <button class="btn-action btn-action__share">Share</button>
                <p class="movie__header--tagline">${movie.tagline}</p>
                <h2>Overview</h2>
                <p id="overview">${movie.overview}</p>
              </div>
            </section>
          </div>
        </div>

        <section class="movie__credits" id="credits">
        <div class="movie__credits--cast"><h3>Top Billed Cast <span><a class="cast-crew" href="#credits">(Show all)</a></span></h3></div>
        <div class="movie__actors">${displayActors()}
        </div>
        <button class="movie__showMoreButton btn">Show more...</button>
        </section>

        <section class="movie__footer">
        <div class="movie__footer--info"<h4>Other information</h4></div>
          <p>Release Date: <span class="movie__footer--release-date">${
            movie.date
          }</span></p>
          <p>Original Language: <span class="original-language">${
            movie.org_lang
          }</span></p>
          <p>Categories: <span class="movie__footer--categories">${categories}</span></p>
          <p>Homepage: <a class="movie__footer--homepage" href="${
            movie.homepage
          }" target="_blank">${movie.homepage}</a></p>
          <p>Status: <span class="status">${movie.status}</span></span></p>
          <p>Production Countries: <span class="movie__footer--production-countries">${productionCountries}</span></p>
          <p>Production Companies: <span class="movie__footer--production-companies">${productionCompanies}</span></p>
          <p>Revenue: <span class="movie__footer--revenue">${revenue}</span></p>
          <p>Runtime: <span class="runtime">${movie.runtime}</span> minutes</p>
          <p>Popularity: <span class="popularity">${movie.popularity}</span></p>
          <p>Budget: $<span class="budget">${movie.budget.toLocaleString()}</span></p>
        </section>
      </div>
    `;

    DOMList.app.innerHTML = '';
    DOMList.app.insertAdjacentHTML('afterbegin', markup);
    document
      .querySelector('.movie__showMoreButton')
      .addEventListener('click', () => addDisplayActors(currentPage + 1));
    document
      .querySelector('.cast-crew')
      .addEventListener('click', () => displayCrew());
  }
}
