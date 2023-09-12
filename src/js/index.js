import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { itemSearch } from '../js/constants';

const inputEl = document.querySelector('.searchQuery');
const searchEl = document.querySelector('button');
const listGallery = document.querySelector('.gallery');

searchEl.addEventListener('click', handlerSearh);

// const technologies = ['HTML', 'CSS', 'JavaScript', 'React', 'Node'];
// const list = document.querySelector('.list');

// const markup = technologies
//   .map(technology => `<li class="list-item">${technology}</li>`)
//   .join('');

function handlerSearh(e) {
  e.preventDefault();
  const itemSearch = e.currentTarget.value;
  fetchItem(itemSearch)
    .then(data => {
      const tags = data[0];
      listGallery.innerHTML = `<ul><li>
      <div class = "photo-card">
        <img
          src = "${webformatURL}"
          alt = "${tags[0].name}"
          loading = "lazy"
          width = "400"
        />
        <div clas = "info">
          <p class = "info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class = "info-item">
            <b>Views ${views}</b>
          </p>
          <p class = "info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class = "info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
      </div>
    </li>
      </ul>`;
    })
    .catch(error => {
      messageError();
    });
}
function messageError() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!',
    {
      timeout: 2000,
    }
  );
}
