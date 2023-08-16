import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_SEARCH_KEY } from '../utils/config';
import { SEARCH_MESSAGES, SHORT_FILMS_DURATION } from '../utils/vars';

export const useSearch = ({
                            movies,
                            isMainMoviesPage,
                            isSavedMoviesPage,
                            setSearchStatus,
                            setError,
                            setPage,
                          }) => {
  // отсортированные фильмы, возвращаемые для рендера
  const [ sortedMovies, setSortedMovies ] = useState([]);
  // поисковый запрос
  const [ searchQuery, setSearchQuery ] = useState({
    search: '',
    isShort: false,
    data: [],
  });

  useEffect(() => {
    // если есть запись в ЛС и страница основных фильмов
    if (LOCAL_STORAGE_SEARCH_KEY in localStorage && isMainMoviesPage) {
      // достаем историю поиска из ЛС
      const searchHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY));
      // записываем поисковой запрос
      setSearchQuery({ ...searchHistory });
      // и ранее найденный массив фильмов
      setSortedMovies(searchHistory.data);
    }
  }, [ isMainMoviesPage ]);

  useEffect(() => {
    if (isSavedMoviesPage) {
      const savedMovies = sortMovies(searchQuery);
      setSortedMovies(savedMovies);
      if (savedMovies.length === 0) {
        handleSearchError(SEARCH_MESSAGES.emptyResult)
      }
      if (movies.length === 0) {
        handleSearchError(SEARCH_MESSAGES.emptySavedMovies)
      }
    }
  }, [ isSavedMoviesPage, movies ]);

  function handleSearchError(msg) {
    setSearchStatus((s) => ({
      ...s,
      isError: true,
      errorMessage: msg,
    }));
  }

  const handleChange = (e) => {
    setSearchQuery((query) => ({
      ...query,
      search: e.target.value,
    }));
  };

  const handleChangeCheckbox = (e) => {
    if (!searchQuery.search && isMainMoviesPage) {
      console.log(searchQuery);
      return setError(SEARCH_MESSAGES.emptyQueryForFilter);
    }

    setSearchQuery((query) => ({
      ...query, isShort: e.target.checked
    }));

    handleSubmit({ ...searchQuery, isShort: e.target.checked });
  };

  const convertString = (string) => {
    const regexSpecSymbols = /[!@#$%^&*()_=+|/<>,.?—«»]/g;

    return string
      .trim() // trim spaces
      .toUpperCase() // convert all symbols to upper case
      .replace(regexSpecSymbols, ''); // replace all spec symbols
  };

  const sortMovies = (query) => {
    if (query.isShort) {
      return movies.filter((movie) => movie.duration <= SHORT_FILMS_DURATION)
        .filter((movie) => {
          return convertString(movie.nameRU)
            .includes(convertString(searchQuery.search)
            );
        });
    } else {
      return movies.filter((movie) => convertString(movie.nameRU)
        .includes(convertString(query.search))
      );
    }
  };

  const updateLocalStorage = (query, array) => {
    if (isMainMoviesPage) {
      localStorage.setItem(LOCAL_STORAGE_SEARCH_KEY, JSON.stringify({
        search: query.search,
        isShort: query.isShort,
        data: array,
      }));

      setSearchStatus((status) => {
        return {
          ...status,
          isFirstSearch: false,
        };
      });
    }
  };

  const handleSubmit = (query) => {
    if (!query.search && isMainMoviesPage) {
      return setError(SEARCH_MESSAGES.emptyQuery);
    }

    setPage(0);
    setSearchStatus({
      isLoading: true,
      isError: false,
      isFirstSearch: false,
      errorMessage: '',
    });

    const sortedArray = sortMovies(query);

    setTimeout(() => {
      if (sortedArray.length === 0) {
        handleSearchError(SEARCH_MESSAGES.emptyResult)
      }

      setSortedMovies(sortedArray);

      setSearchStatus((status) => {
        return {
          ...status,
          isLoading: false,
        };
      });
    }, 500);

    updateLocalStorage(query, sortedArray);
  };

  return {
    sortedMovies,
    searchQuery,
    handleChange,
    handleChangeCheckbox,
    handleSubmit,
  };
};
