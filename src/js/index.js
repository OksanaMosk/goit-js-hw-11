import { BASE_URL, API_KEY } from './constants';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const inputEl = document.querySelector('.searchQuery');
const searchEl = document.querySelector('button');

const photoListEl = document.querySelector('.movie-list');
const loadMoreEl = document.querySelector('.load-more');

let page = 1;

const renderList = (arr, container) => {
  const markup = arr.map(
      (item) => `<li>
  <div class = "photo-card">
  <img src = ${item.webformatURL} alt = ${item.tags}
          loading = "lazy"
          width = "400"
        />
        <div clas = "info">
          <p class = "info-item">
            <b>Likes ${item.likes}</b>
          </p>
          <p class = "info-item">
            <b>Views ${item.views}</b>
          </p>
          <p class = "info-item">
            <b>Comments ${item.comments}</b>
          </p>
          <p class = "info-item">
            <b>Downloads ${item.downloads}</b>
          </p>
        </div>
      </div>
    </li>`
    )
    .join();

  container.insertAdjacentHTML('beforeend', markup);
};

const fetchItem = () => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: 40,
  });
  const endpoint = BASE_URL + '/?' + params.toString();

  return fetch(endpoint).then(res => {
    if (res.status === 200) {
      return res.json();
    }
    throw new Error(res.statusText);
  });
};

const loadMoreHandler = () => {
  page += 1;

  fetchItem().then(data => console.log(data));
};

fetchItem().then(res => renderList(res.results, photoListEl));

loadMoreEl.addEventListener('click', loadMoreHandler);

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
