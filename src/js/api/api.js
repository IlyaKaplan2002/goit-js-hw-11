import axios from 'axios';

const PER_PAGE = 20;

const makeParams = options => {
  const keys = Object.keys(options);

  const params = `?` + keys.map(key => `${key}=${options[key]}`).join('&');

  return params;
};

export const getPhotos = (query, page = 1) => {
  const options = {
    key: '24624766-a407a9b2d63732b27ccf63dc7',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: PER_PAGE,
  };

  const BASE_URL = `https://pixabay.com/api/`;

  return axios.get(BASE_URL + makeParams(options));
};
