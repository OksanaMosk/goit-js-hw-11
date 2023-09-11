const url = 'https://pixabay.com/api/';
// https://pixabay.com/api/?key=39386334-bda07a6ce678f47865399bb0d&q=yellow+flowers&image_type=photo
// https://pixabay.com/api/?key=39386334-bda07a6ce678f47865399bb0d&image_type
const apiKey = '39386334-bda07a6ce678f47865399bb0d';

export function fetchItem() {
  return fetch(`${url}/?key=${apiKey}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByitem(itemEnimals) {
  return fetch(`${url}?key={apiKey}&g=${itemEnimals}&image_type=photo`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
      console.log('ok');
    }
  );
}
