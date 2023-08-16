const DEVICE_CONFIG = {
  desktopWidth: 1024,
  tabletWidth: 767,
  mobileWidth: 320,
  desktop: 'desktop',
  tablet: 'tablet',
  mobile: 'mobile',
};

const MOVIE_RENDER_CONFIG = {
  desktop: {
    init: 12,
    more: 3,
  },
  tablet: {
    init: 8,
    more: 2,
  },
  mobile: {
    init: 5,
    more: 2,
  },
};

const MAIN_API_URL = 'https://api.nargiz.nomoreparties.sbs';
const MOVIES_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const MOVIES_BASE_URL = 'https://api.nomoreparties.co';

const LOCAL_STORAGE_SEARCH_KEY = 'search';

const REQ_MESSAGES = {
  successProfileUpdate: 'Данные обновлены!',
  successRegistration: 'Вы успешно зарегистрировались!',
};

const APP_ROUTER = {
  main: '/',
  signin: '/signin',
  signup: '/signup',
  movies: '/movies',
  savedMovies: '/saved-movies',
  profile: '/profile',
  any: '*',
};

export {
  DEVICE_CONFIG,
  MOVIE_RENDER_CONFIG,
  MAIN_API_URL,
  MOVIES_API_URL,
  MOVIES_BASE_URL,
  LOCAL_STORAGE_SEARCH_KEY,
  REQ_MESSAGES,
  APP_ROUTER,
};
