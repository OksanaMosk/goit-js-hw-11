import { BASE_URL, API_KEY } from './constants';

export default class NewsApiService {
  constructor() {
    this.formSearch = '';
    this.page = 1;
  }
  fetchArticles() {
    console.log('До', this);
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.formSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.page += 1;
        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get searchQuery() {
    return this.formSearch;
  }
  set searchQuery(newsearchQuery) {
    return (this.formSearch = newsearchQuery);
  }
}
