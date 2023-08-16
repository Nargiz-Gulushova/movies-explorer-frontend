const INITIAL_REQUEST_STATUS = {
  isLoading: false,
  isError: false,
  message: '',
};

const LOCAL_STORAGE_TOKEN_KEY = 'token';

const INITIAL_CURRENT_USER = {
  name: '',
  email: '',
  isLoggedIn: !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
};

const RESETED_CURRENT_USER = {
  name: '',
  email: '',
  isLoggedIn: false,
}

const SHORT_FILMS_DURATION = 40;

const SEARCH_MESSAGES = {
  emptyResult: 'Ничего не найдено.',
  emptyQuery: 'Для поиска нужно ввести ключевой запрос.',
  emptyQueryForFilter: 'Для фильтрации нужно заполнить поисковый запрос.',
  emptySavedMovies: 'Ваш список сохраненных фильмов пуст :(',
  init: 'Воспользуйтесь поиском, чтобы найти фильмы.',
}

export {
  INITIAL_REQUEST_STATUS,
  LOCAL_STORAGE_TOKEN_KEY,
  INITIAL_CURRENT_USER,
  RESETED_CURRENT_USER,
  SHORT_FILMS_DURATION,
  SEARCH_MESSAGES,
};
