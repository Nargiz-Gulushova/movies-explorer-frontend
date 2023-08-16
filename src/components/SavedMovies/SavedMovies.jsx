import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesSearchForm from '../MoviesSearchForm/MoviesSearchForm';
import { useSearch } from '../../hooks/useSearch';
import { useState } from 'react';
import { LOCAL_STORAGE_SEARCH_KEY } from '../../utils/config';
import { SEARCH_MESSAGES } from '../../utils/vars';

const SavedMovies = ({ movies, requestStatus, onDelete, setError }) => {

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
    isMainMoviesPage: false,
    isSavedMoviesPage: true,
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
                        savedMovies={sortedMovies}
                        searchStatus={searchStatus}
                        requestStatus={requestStatus}
                        page={page}
                        setPage={setPage}
                        isSavedMoviesPage={true}
                        onDelete={onDelete}
        />
      </main>
      <Footer/>
    </>
  );
};

export default SavedMovies;
