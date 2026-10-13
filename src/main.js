import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';

let searchString = '';
let page = 1;

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', loadMore);

async function onSubmit(event) {
  event.preventDefault();

  searchString = form.elements['search-text'].value.trim();

  if (searchString.length === 0) {
    iziToast.error({
      title: 'Error',
      message: 'Query can not be empty!',
      position: 'center',
    });

    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(searchString, page);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'center',
      });
      return;
    }

    createGallery(data.hits);
    showLoadMoreButton();
  } catch (error) {
    iziToast.error({
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }

}

async function loadMore () {
  showLoader();

  try {
    const data = await getImagesByQuery(searchString, page + 1);

    page += 1;
    createGallery(data.hits);
    smoothScrolling();
  } catch (error) {
    hideLoadMoreButton();
     iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'center',
    });
  } finally {
    hideLoader();
  }
}

function smoothScrolling() {
    const card = document.querySelector('.gallery-item');

  if (card.length === 0) {
    return;
  }

  const { height } = card.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
