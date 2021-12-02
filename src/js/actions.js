import { Notify } from 'notiflix';
import { getPhotos } from './api/api';
import { makeCardsMarkup } from './makeCards';
import { refs } from './refs/refs';
import { store } from './store/store';

export const onSubmit = e => {
  e.preventDefault();
  const query = refs.searchForm.elements.searchQuery.value;
  store.query = query;
  store.page = 1;

  refs.loadMoreBtn.classList.add('visually-hidden');

  if (!query) {
    Notify.failure('Empty query!');
    return;
  }

  getPhotos(query)
    .then(res => res.data)
    .then(data => {
      if (data.totalHits) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        makeCardsMarkup(data.hits);
        refs.loadMoreBtn.classList.remove('visually-hidden');

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        refs.gallery.innerHTML = '';
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      }
    });
};

export const onLoadMore = () => {
  const query = store.query;
  store.page += 1;
  refs.loadMoreBtn.classList.add('visually-hidden');

  getPhotos(query, store.page)
    .then(res => res.data)
    .then(data => {
      makeCardsMarkup(data.hits, false);
      refs.loadMoreBtn.classList.remove('visually-hidden');

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    })
    .catch(() => Notify.failure("We're sorry, but you've reached the end of search results."));
};
