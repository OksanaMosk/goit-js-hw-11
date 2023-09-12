const BASE_URL = 'https://pixabay.com/api';
// https://pixabay.com/api/?key=39386334-bda07a6ce678f47865399bb0d&q=yellow+flowers&image_type=photo
// https://pixabay.com/api/?key=39386334-bda07a6ce678f47865399bb0d&image_type
const API_KEY = '39386334-bda07a6ce678f47865399bb0d';

export function fetchItem(itemSearch) {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&g=${itemSearch}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
fetchItem('itemSearch')
  .then(data => console.log(data))
  .catch(err => console.log(err));

// export function fetchCatByitem(itemEnimals) {
//   //pixabay.com/api/?q=cat&key=your_key&image_type=photo

//   return fetch(
//     `${BASE_URL}/?key=${API_KEY}&g=${itemEnimals}&image_type=photo&orientation=horizontal&safesearch=true`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//     console.log('ok');
//   });
// }
