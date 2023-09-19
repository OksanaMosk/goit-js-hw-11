import NewsApiService from './news-service';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  serchForm: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreEl: document.querySelector('.load-more'),
};

const newApiService = new NewsApiService();

refs.serchForm.addEventListener('submit', onSerch);
// refs.loadMoreEl.addEventListener('click', onLoadMore);

function onSerch(e) {
  e.preventDefault();
  newApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
  newApiService.resetPage();

  newApiService
    .fetchArticles()
    .then(renderPhotoCard)
    .then(results => {
      observer.observe(guardEl);
    });
  const guardEl = document.querySelector('.js-guard');
  const options = {
    root: null,
    rootMargin: '300px',
    threshold: 0,
  };

  const handlerIntersection = (entries, observer) => {
    console.log(entries);
    console.log(observer);
    entries.forEach(Intersection => {
      if (Intersection.isIntersecting) {
        this.page += 1;

        newApiService.fetchArticles().then(renderPhotoCard);

        if ((this.page = this.totalHits)) {
          observer.unobserve(Intersection);
        }
      }
    });
  };

  clearService();
  const observer = new IntersectionObserver(handlerIntersection, options);
}

// function onLoadMore() {
//   newApiService.fetchArticles().then(renderPhotoCard);
// }

async function renderPhotoCard(data) {
  const results = await data.hits;

  if (newApiService.searchQuery === '') {
    messageWarning();
    return;
  }

  if (!data.hits.length) {
    messageError();
    return;
  }

  const stringTag = results
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card"> <a href="${largeImageURL}" class="imageGalleryItem-image">
        <img src="${webformatURL}" alt="${tags}" class="image-src" loading="lazy" />
        <div class="info image-info">
        <p class="info-item">
            <b>Likes</b> ${likes}
        </p>
        <p class="info-item">
            <b>Views</b> ${views}
        </p>
        <p class="info-item">
            <b>Comments</b> ${comments}
        </p>
        <p class="info-item">
            <b>Downloads</b> ${downloads}
        </p>
        </div></a>
    </div>`;
      }
    )
    .join('');

  refs.galleryEl.insertAdjacentHTML('beforeend', stringTag);
  if (data.hits.length) {
    messageSuccess();
  }
  new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  }).refresh();
}

function clearService() {
  refs.galleryEl.innerHTML = ' ';
}

function messageWarning() {
  Notiflix.Notify.warning('Please fill the field', {
    timeout: 2000,
  });
  messageWarning = () => {};
}

function messageError() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      timeout: 2000,
    }
  );
  messageError = () => {};
}

function messageSuccess() {
  Notiflix.Notify.success('Hooray! We found totalHits images.', {
    timeout: 2000,
  });
  messageSuccess = () => {};
}
