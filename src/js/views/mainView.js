import { DOMList } from './domList';


export class MainView {
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  renderLatestMoviesComponent(movies) {
    // Popular movies component rendering
    let markup = `
    <h2 class="latest-movies__header">What's new</h2>
      <div class="latest-movies__content">`;
    for (const mov of movies) {
      const year = new Date(mov.date).getFullYear();
      markup += `
        <div class="latest-movies__card">
          <a href="/movie/${mov.id}"
            ><img
              src="https://www.themoviedb.org/t/p/w220_and_h330_face/${mov.poster}"
              alt=""
              class="latest-movies__img"
          /></a>
          <a
            href=""
            class="latest-movies__title--link"
            ><p class="latest-movies__title">${mov.title}</p></a
          >
          <span class="latest-movies__date">${year}</span>
        </div>`;
    }
    markup += `
      </div>
    `;
    DOMList.latestMovies.insertAdjacentHTML('afterbegin', markup);
  }

  renderPopularMoviesComponent(movies) {
    // Popular movies component rendering
    let markup = `
    <h2 class="popular-movies__header">What's Popular</h2>
      <div class="popular-movies__content">`;
    for (const mov of movies) {
      const year = new Date(mov.date).getFullYear();
      markup += `
        <div class="popular-movies__card">
          <a href="/movie/${mov.id}"
            ><img
              src="https://www.themoviedb.org/t/p/w220_and_h330_face/${mov.poster}"
              alt=""
              class="popular-movies__img"
          /></a>
          <a
            href=""
            class="popular-movies__title--link"
            ><p class="popular-movies__title">${mov.title}</p></a
          >
          <span class="popular-movies__date">${year}</span>
        </div>`;
    }
    markup += `
      </div>
    `;
    DOMList.popularMovies.insertAdjacentHTML('afterbegin', markup);
  }

  renderRecentTrailersComponent(trailers) {
    // Rendering of Recent Trailers component
    let markup = `
    <div class="latest-trailers__content-background">
    <video
      autoplay
      muted
      loop
      class="latest-trailers__video">
      <source
        src="src/img/video-bg.mp4"
        type="video/mp4" />
    </video>

    <div class="latest-trailers__content">
      <h2 class="latest-trailers__header">Latest trailers</h2>
      <div class="latest-trailers__player-container">`;
    for (const vid of trailers) {
      if (vid.site === 'YouTube') {
        markup += `
            <iframe
            src="https://www.youtube.com/embed/${vid.key}"
            frameborder="0"
            class="latest-trailers__player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            ></iframe>`;
      }
    }
    markup += `
      </div>
    </div>
    `;
    DOMList.latestTrailers.insertAdjacentHTML('afterbegin', markup);
  }

  renderCarouselComponent(movies, state) {
    // Rendering a carousel with recent videos
    let images = [];
    const slideWidth = 100; // Szerokość pojedynczego slajdu w procentach
    let currentSlideIndex = 0;
    let markup = `

      <button
        type="button" data-action="prev"
        class="slider__btn slider__btn--left"
      ></button>
      <div class="slider__content">`;
    for (let mov of movies) {
      console.log(mov);
      images.push(
        `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${mov.background}`
      );
      DOMList.carouselDiv.style.backgroundImage = `url(${images[currentSlideIndex]})`;

      markup += `
        <div class="slide" id="${mov.id}">
          <div class="slide__category">`;

      for (let gen of mov.categories_ids) {
        const genre = state.find((genre) => genre.id === gen);
        if (genre) {
          markup += `<a
            href="movie/category/${genre.id}"
            class="slide__category-link" style="background-color:${this.getRandomColor()}"
            >${genre.name}</a>`;
        }
      }

      markup += `
            
          </div>

          <h1 class="slide__title">
            ${mov.title}<span class="slide__title--year">${new Date(
        mov.date
      ).getFullYear()}</span>
          </h1>

          <div class="slide__action">
            <button class="btn-action btn-action__watch">Watch trailer</button>
            <button class="btn-action btn-action__favorite">
              Add to favorite
            </button>
            <button class="btn-action btn-action__share">Share</button>
          </div>

          <div class="slide__descriptions">
            <p class="slide__rate"><span>${mov.vote_avg}</span>/10</p>
            <ul class="slide__detail">
              <li class="slide__detail--item">Relase: ${mov.date}</li>
            </ul>
          </div>

          <button class="btn btn__slide" onclick="window.location.href='/movie/${mov.id}';" value="${mov.title}">More datail</button>
        </div>`;
    }
    markup += `
    </div>
      <button
        type="button" data-action="next"
        class="slider__btn slider__btn--right"
      ></button>
    `;
    DOMList.carouselDiv.insertAdjacentHTML('afterbegin', markup);

    DOMList.carouselDiv.addEventListener('click', (event) => {
      const target = event.target;
      if (target.tagName === 'BUTTON') {
        const action = target.getAttribute('data-action');
        if (action === 'prev') {
          showPreviousSlide();
        } else if (action === 'next') {
          showNextSlide();
        }
      }
    });

    const showPreviousSlide = () => {
      currentSlideIndex =
        (currentSlideIndex - 1 + images.length) % images.length;
      updateSlide();
    };

    const showNextSlide = () => {
      currentSlideIndex = (currentSlideIndex + 1) % images.length;
      updateSlide();
    };

    const updateSlide = () => {
      DOMList.carouselDiv.style.backgroundImage = `url(${images[currentSlideIndex]})`;
      const carouselContent = document.querySelector('.slider__content');
      carouselContent.style.transform = `translateX(-${
        currentSlideIndex * slideWidth
      }%)`;
    };

    setInterval(() => showNextSlide(), 10000);
  }

  renderSearchBar() {
    const markup = `
    <form class="search">
        <div class="search__container">
        <input
            type="text"
            class="search__input"
            placeholder="Search for a movie, tv show, person......"
        />
        <button class="btn search__button">Search</button>
        </div>
    </form>
  `;
    DOMList.carouselDiv.insertAdjacentHTML('afterend', markup);
  }

  showNotFoundPage() {
    const markup = `Page Not Found`;
    DOMList.app.insertAdjacentHTML('afterend', markup);
  }
}
