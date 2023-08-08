import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesSearchForm from '../MoviesSearchForm/MoviesSearchForm';
import { MAIN_MOVIES, SAVED_MOVIES } from '../../utils/data';

const Movies = ({ isMainMoviesPage, device }) => {
  return (
    <>
      <Header />
      <main>
        <MoviesSearchForm />
        <MoviesCardList
          movies={isMainMoviesPage ? MAIN_MOVIES : SAVED_MOVIES}
          isMainMoviesPage={isMainMoviesPage}
          device={device}
        />
      </main>
      <Footer />
    </>
  );
};

export default Movies;
