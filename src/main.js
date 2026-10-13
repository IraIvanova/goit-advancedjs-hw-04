import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

let searchString = '';
let page = 1;
const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', loadMore);

async function onSubmit(event) {
  event.preventDefault();

  const query = form.elements['search-text'].value.trim();

  if (query.length === 0) {
    iziToast.error({
      title: 'Error',
      message: 'Query can not be empty!',
      position: 'center',
    });

    return;
  }

  searchString = query;
  page = 1;
  clearGallery();
  showLoader();
  hideLoadMoreButton();

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
    updateLoadMoreBtn(data.totalHits);
  } catch (error) {
    showGeneralError(error);
  } finally {
    hideLoader();
  }
}

async function loadMore() {
  showLoader();

  try {
    const data = await getImagesByQuery(searchString, page + 1);
    page += 1;
    createGallery(data.hits);
    smoothScrolling();
    updateLoadMoreBtn(data.totalHits);
  } catch (error) {
    showGeneralError(error);
  } finally {
    hideLoader();
  }
}

function updateLoadMoreBtn(total) {
  const loadedImages = PER_PAGE * page;

  if (loadedImages >= total) {
    hideLoadMoreButton();

    iziToast.info({
      message:
        'We\'re sorry, but you\'ve reached the end of search results.',
      position: 'center',
    });
  } else {
    showLoadMoreButton();
  }
}

function smoothScrolling() {
  const card = document.querySelector('.gallery-item');

  if (!card) {
    return;
  }

  const { height } = card.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

function showGeneralError(error) {
  iziToast.error({
    message: `Something went wrong: ${error.message}`,
    position: 'center',
  });
}
