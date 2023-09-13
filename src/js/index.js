import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { itemSearch } from '../js/constants';

const inputEl = document.querySelector('.searchQuery');
const searchEl = document.querySelector('button');
const divGallery = document.querySelector('.gallery');

searchEl.addEventListener('click', handlerSearh);

// const technologies = ['HTML', 'CSS', 'JavaScript', 'React', 'Node'];
// const list = document.querySelector('.list');

// const markup = technologies
//   .map(technology => `<li class="list-item">${technology}</li>`)
//   .join('');

const arrayList = []
const everyItem = arrayList.tags

function handlerSearh(e) {
  e.preventDefault();
function functionSearh() {
  if (arrayList.tags.includes(itemSearch.tags)) {
    arrayList.filter(itemSearch);
        divGallery.innerHTML = `<ul><li>
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
      </ul>`
  }
const itemSearch = e.currentTarget.value;
  fetchItem(itemSearch)
    .then(functionSearh)
    console.log (everyItem(tags))
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
}