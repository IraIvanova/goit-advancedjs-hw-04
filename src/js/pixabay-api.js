import axios from 'axios';

const API_KEY = '57978423-e1008c624701cdcff1b93f2bb';
const API_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  const searchParams = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page
  };

  const response = await axios.get(API_URL, {
    params: searchParams,
  })

  return response.data;
}
