import { refs } from './refs/refs';
import SimpleLightbox from 'simplelightbox';

const makeCard = card => {
  const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = card;

  const markup = `<div class="photo-card">
      <a href='${largeImageURL}'><img class='card-image' src="${webformatURL}" alt="${tags}" title="${tags}" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span>${downloads}</span>
        </p>
      </div>
    </div>`;

  return markup;
};

export const makeCardsMarkup = (cards, mustClean = true) => {
  const markup = cards.reduce((acc, card) => {
    acc += makeCard(card);
    return acc;
  }, '');

  if (mustClean) {
    refs.gallery.innerHTML = markup;
  } else {
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  }

  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionPosition: 'bottom',
    captionSelector: 'img',
    captionsData: 'alt',
  });
};
