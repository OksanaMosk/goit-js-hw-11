import { API_KEY, BASE_URL } from './constants';
import axios from 'axios';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.hits = 0;
    this.totalHits = 0;
  }
  async fetchImage() {
    try {
      const options = {
        params: {
          key: API_KEY,
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page,
          per_page: 40,
        },
      };
      const url = `${BASE_URL}`;
      const response = await axios.get(url, options);
      const data = await response.data;

      this.page += 1;
      this.totalHits = response.data.totalHits;

      return data;
    } catch (error) {
      console.log('error', error);
    }
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
