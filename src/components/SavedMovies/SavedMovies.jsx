import { SAVED_MOVIES } from '../../utils/data';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesSearchForm from '../MoviesSearchForm/MoviesSearchForm';
import './SavedMovies.css';

const SavedMovies = ({ isSavedMoviesPage }) => {

  return (
    <>
    <Header />
    <main>
      <MoviesSearchForm />
      <MoviesCardList movies={SAVED_MOVIES} isSavedMoviesPage={isSavedMoviesPage} />
    </main>
    <Footer />
    </>
  )
};

export default SavedMovies;