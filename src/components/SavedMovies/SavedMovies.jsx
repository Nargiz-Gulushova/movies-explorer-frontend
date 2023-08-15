import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesSearchForm from '../MoviesSearchForm/MoviesSearchForm';
import { useSearch } from '../../hooks/useSearch';
import { useState } from 'react';
import { LOCAL_STORAGE_SEARCH_KEY } from '../../utils/config';

const SavedMovies = ({ movies, requestStatus, onDelete }) => {

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
    isMainMoviesPage: false,
    isSavedMoviesPage: true,
    setSearchStatus,
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
                        savedMovies={sortedMovies}
                        searchStatus={searchStatus}
                        requestStatus={requestStatus}
                        isSavedMoviesPage={true}
                        onDelete={onDelete}
        />
      </main>
      <Footer/>
    </>
  );
};

export default SavedMovies;
