import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '17538652-b999fbbbfe57ad3fb90b083ce';

export default class NewsAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async getImages() {
    try {
      const searchParams = new URLSearchParams({
        key: API_KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.perPage,
      });

      const response = await axios.get(`${BASE_URL}?${searchParams}`);
      // this.incrementPage();
      console.log(this.page)
      return response.data;
    }
    
    catch (error) {
      throw new Error(error);
    }
  }
  resetPage() {
    this.page = 1
  }
  incrementPage() {
  this.page +=1
}

}



