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

        <section class="movie__footer">
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
  }
}
