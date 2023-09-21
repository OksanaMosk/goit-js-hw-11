import Notiflix from 'notiflix';
import ApiService from './js/apiService';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const searchForm = document.querySelector('#search-form');

const imageApiService = new ApiService();
let per_page = 40;

searchForm.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onBtnLoadMore);

isHiddenBtnLoadMore();

async function onSearch(e) {
  try {
    e.preventDefault();
    cleanGallery();
    const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    if (!searchQuery) {
      messageWarning();
      isHiddenBtnLoadMore();
      return;
    }

    imageApiService.query = searchQuery;
    imageApiService.page = 1;
    imageApiService.hits = 0;
    e.currentTarget.reset();
    const data = await imageApiService.fetchImage();

    if (data.hits.length == 0) {
      messageError();
      isHiddenBtnLoadMore();
      return;
    }
    messageSuccess();

    renderPhotoCard(data);

    if (data.hits.length < per_page) {
      isHiddenBtnLoadMore();
    } else visibleBtnLoadMore();
  } catch (error) {
    console.log('error', error);
  }
}

function cleanGallery() {
  galleryEl.innerHTML = '';
}

function visibleBtnLoadMore() {
  btnLoadMore.classList.remove('is-hidden');
  btnLoadMore.classList.add('visible');
}

function isHiddenBtnLoadMore() {
  btnLoadMore.classList.add('is-hidden');
  btnLoadMore.classList.remove('visible');
}

async function onBtnLoadMore() {
  try {
    const data = await imageApiService.fetchImage();

    renderPhotoCard(data);
    pageScrolling();
    imageApiService.hits += 40;

    const pageNum = Math.ceil(data.totalHits / per_page);
    if (imageApiService.page === pageNum + 1) {
      isHiddenBtnLoadMore();
      Notiflix.Notify.info('This is the end of search results.');
    }
  } catch (error) {
    console.log('error', error);
  }
}

function pageScrolling() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function renderPhotoCard(data) {
  const results = data.hits;
  const markup = results
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
        return `<div class="photo-card"> <a href="${largeImageURL}" class ="imageGalleryItem-image">
        <img src="${webformatURL}" alt="${tags}" class="image-src" loading="lazy"/></a>
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
        </div>
    </div>`;
      }
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  new SimpleLightbox('.photo-card a', {
    captionDelay: 250,
  });
}

function messageWarning() {
  Notiflix.Notify.warning('Please fill the field', {
    timeout: 2000,
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

function messageSuccess(totalHits) {
  Notiflix.Notify.success(
    `Hooray! We found ${imageApiService.totalHits} images.`,
    {
      timeout: 2000,
    }
  );
}
