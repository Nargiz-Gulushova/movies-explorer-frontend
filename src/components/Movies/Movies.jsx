import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesSearchForm from '../MoviesSearchForm/MoviesSearchForm';
import { useState } from 'react';
import { useSearch } from '../../hooks/useSearch';
import { LOCAL_STORAGE_SEARCH_KEY } from '../../utils/config';
import { SEARCH_MESSAGES } from '../../utils/vars';

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
    errorMessage: SEARCH_MESSAGES.init,
  });
  const [ page, setPage ] = useState(0);

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
    setPage,
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
                        page={page}
                        setPage={setPage}
        />
      </main>
      <Footer/>
    </>
  );
};

export default Movies;
