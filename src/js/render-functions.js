import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const createGalleryItemMarkup = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `<li class="gallery-item">
      <div class="gallery-img">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image"
               src="${webformatURL}"
               alt="${tags}" />
        </a>
      </div>
      <div class="gallery-img-info">
        <div>
          <b>Likes</b>
          <span>${likes}</span>
        </div>
        <div>
          <b>Views</b>
          <span>${views}</span>
        </div>
        <div>
          <b>Comments</b>
          <span>${comments}</span>
        </div>
        <div>
          <b>Downloads</b>
          <span>${downloads}</span>
        </div>
      </div>
    </li>`;
};

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

export function createGallery(images) {
  const galleryItemsMarkup = images.map(createGalleryItemMarkup).join('');
  gallery.insertAdjacentHTML('beforeend', galleryItemsMarkup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
