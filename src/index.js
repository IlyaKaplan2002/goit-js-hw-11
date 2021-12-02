import { onLoadMore, onSubmit } from './js/actions';
import { refs } from './js/refs/refs';
import './sass/main.scss';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// getPhotos('cat').then(res => makeCardsMarkup(res.data.hits));
