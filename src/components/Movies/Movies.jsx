import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesSearchForm from '../MoviesSearchForm/MoviesSearchForm';
import { useState } from 'react';
import { useSearch } from '../../hooks/useSearch';
import { LOCAL_STORAGE_SEARCH_KEY } from '../../utils/config';

const Movies = ({
                  movies,
                  savedMovies,
                  setError,
                  requestStatus,
                  onSave,
                  onDelete,
}) => {

  const [ searchStatus, setSearchStatus ] = useState({
    isError: false,
    isFirstSearch: !localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY),
    isLoading: false,
    errorMessage: 'Воспользуйтесь поиском, чтобы найти фильмы.',
  });

  const {
    sortedMovies,
    searchQuery,
    handleChange,
    handleChangeCheckbox,
    handleSubmit,
  } = useSearch({
    movies,
    isMainMoviesPage: true,
    isSavedMoviesPage: false,
    setSearchStatus,
    setError,
  });


  return (
    <>
      <Header/>
      <main>
        <MoviesSearchForm searchQuery={searchQuery}
                          onChange={handleChange}
                          onCheckboxChange={handleChangeCheckbox}
                          onSubmit={handleSubmit}
                          searchStatus={searchStatus}
        />
        <MoviesCardList movies={sortedMovies}
                        savedMovies={savedMovies}
                        isMainMoviesPage={true}
                        requestStatus={requestStatus}
                        searchStatus={searchStatus}
                        onSave={onSave}
                        onDelete={onDelete}
        />
      </main>
      <Footer/>
    </>
  );
};

export default Movies;
