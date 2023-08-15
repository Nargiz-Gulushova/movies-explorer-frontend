import { MAIN_API_URL } from './config';

class MainApi {
  constructor(config) {
    this._url = config.url;
    this._options = {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
    };
  }

  _fetch(endpoint) {
    if (this._options.method === 'GET' || this._options.method === 'HEAD') {
      if ('body' in this._options) {
        delete this._options.body;
      }
    }

    return fetch(this._url + endpoint, this._options)
      .then((res) => {
        if (res.ok) return res.json();
        return res
          .text()
          .then((text) => {
            throw JSON.parse(text).message || JSON.parse(text).error;
          });
      });
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    this._options.method = 'GET';

    return this._fetch('/users/me');
  }

  // Редактирование профиля
  editUserInfo({ name, email }) {
    this._options.method = 'PATCH';
    this._options.body = JSON.stringify({ name, email });

    return this._fetch('/users/me');
  }

  // Получение фильмов
  getMovies() {
    return this._fetch('/movies');
  }

  // Удаление фильма
  deleteMovie(movieId) {
    this._options.method = 'DELETE';

    return this._fetch(`/movies/${movieId}`);
  }

  // Добавление новой карточки
  addMovie({ ...movie }) {
    this._options.method = 'POST';
    this._options.body = JSON.stringify({ ...movie });

    return this._fetch('/movies');
  }

  // Логин
  signin({ email, password }) {
    this._options.method = 'POST';
    this._options.body = JSON.stringify({ email, password });

    return this._fetch('/signin');
  }

  // Регистрация
  signup({ name, email, password }) {
    this._options.method = 'POST';
    this._options.body = JSON.stringify({ name, email, password });

    return this._fetch('/signup');
  }

  // Выход
  signout() {
    return this._fetch('/signout');
  }
}

const MAIN_API = new MainApi({
  url: MAIN_API_URL,
});

export { MAIN_API };
