import { BASE_URL, API_KEY } from './constants';
import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.formSearch = '';
    this.page = 1;
  }
  async fetchArticles() {
    console.log('До', this);
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.formSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    const response = await axios.get(url);
    const data = await response.data;
    this.page += 1;
    return data;
    console.log(data.hits);
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
