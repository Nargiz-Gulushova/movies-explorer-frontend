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

export {
  INITIAL_REQUEST_STATUS,
  LOCAL_STORAGE_TOKEN_KEY,
  INITIAL_CURRENT_USER,
  RESETED_CURRENT_USER,
};
