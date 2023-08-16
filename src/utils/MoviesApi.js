import { MOVIES_API_URL } from './config';

class MoviesApi {
  constructor(url) {
    this._url = url;
  }

  getMovies() {
    return fetch(this._url, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res
          .text()
          .then((text) => {
            throw JSON.parse(text).message || JSON.parse(text).error;
          });
      });
  }
}

export const MOVIES_API = new MoviesApi(MOVIES_API_URL);
