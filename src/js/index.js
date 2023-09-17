import { BASE_URL, API_KEY } from './constants';
import NewsApiService from './news-service';

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
}

function onLoadMore() {
  newApiService.fetchArticles().then(renderPhotoCard);
}

function renderPhotoCard(data) {
  const results = data;
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
        return `<div class="photo-card"> <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
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

  new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

//   <div class = "photo-card">
//   <img src = ${item.webformatURL} alt = ${item.tags}
//           loading = "lazy"
//           width = "400"
//         />
//         <div clas = "info">
//           <p class = "info-item">
//             <b>Likes ${item.likes}</b>
//           </p>
//           <p class = "info-item">
//             <b>Views ${item.views}</b>
//           </p>
//           <p class = "info-item">
//             <b>Comments ${item.comments}</b>
//           </p>
//           <p class = "info-item">
//             <b>Downloads ${item.downloads}</b>
//           </p>
//         </div>
//       </div>
//     </li>`
//     )
//     .join();

//   container.insertAdjacentHTML('beforeend', markup);
// };

// const fetchItem = () => {
//   const params = new URLSearchParams({
//     key: API_KEY,
//     q: '',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
//     page,
//     per_page: 40,
//   });
//   const endpoint = BASE_URL + '/?' + params.toString();

//   return fetch(endpoint).then(res => {
//     if (res.status === 200) {
//       return res.json();
//     }
//     throw new Error(res.statusText);
//   });
// };

// const loadMoreHandler = () => {
//   page += 1;

//   fetchItem().then(data => console.log(data));
// };

// fetchItem().then(res => renderList(res.results, photoListEl));

// loadMoreEl.addEventListener('click', loadMoreHandler);

// searchEl.addEventListener('click', handlerSearh);

// const technologies = ['HTML', 'CSS', 'JavaScript', 'React', 'Node'];
// const list = document.querySelector('.list');

// const markup = technologies
//   .map(technology => `<li class="list-item">${technology}</li>`)
//   .join('');

// const arrayList = [];
// const everyItem = arrayList.tags;

// function handlerSearh(e) {
//   e.preventDefault();
//   function functionSearh() {
//     if (arrayList.tags.includes(itemSearch.tags)) {
//       arrayList.filter(itemSearch);
//       divGallery.innerHTML = `<ul>
//       </ul>`;
//     }
//     const itemSearch = e.currentTarget.value;
//     fetchItem(itemSearch).then(functionSearh);
//     console.log(everyItem(tags)).catch(error => {
//       messageError();
//     });
//   }

//   function messageError() {
//     Notiflix.Notify.failure(
//       'Oops! Something went wrong! Try reloading the page!',
//       {
//         timeout: 2000,
//       }
//     );
//   }
// }
