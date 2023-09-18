import { BASE_URL, API_KEY } from './constants';
import NewsApiService from './news-service';
import axios from 'axios';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const inputEl = document.querySelector('.searchQuery');
const searchEl = document.querySelector('button');

const refs = {
  serchForm: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreEl: document.querySelector('.load-more'),
};

const newApiService = new NewsApiService();

refs.serchForm.addEventListener('submit', onSerch);
refs.loadMoreEl.addEventListener('click', onLoadMore);

function onSerch(e) {
  e.preventDefault();
  newApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
  newApiService.resetPage();

  newApiService.fetchArticles().then(renderPhotoCard);
  clearService();
}

function onLoadMore() {
  newApiService.fetchArticles().then(renderPhotoCard);
}

async function renderPhotoCard(data) {
  const results = await data.hits;

  if (newApiService.searchQuery === '') {
    Notiflix.Notify.warning('Please fill the field', {
      timeout: 2000,
    });
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
  });
}

function messageError() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      timeout: 2000,
    }
  );
}

function clearService() {
  refs.galleryEl.innerHTML = ' ';
}
function messageSuccess() {
  Notiflix.Notify.success('Hooray! We found totalHits images.', {
    timeout: 2000,
  });
}
