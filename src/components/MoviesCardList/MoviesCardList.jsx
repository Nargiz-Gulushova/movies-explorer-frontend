import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { MOVIE_RENDER_CONFIG } from '../../utils/config';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ movies, isMainMoviesPage, device }) => {
  const [toShow, setToShow] = useState(0);
  const [page, setPage] = useState(0);
  const [isMoreButton, setIsMoreButton] = useState({
    show: true,
    loading: false,
  });

  useEffect(() => {
    // Задаем количество элементов, которое изначально отрендерится:
    // Число для рендера на девайсе + число для рендера при нажатии на кнопку пагинации * на номер страницы (изначально 0)
    setToShow(MOVIE_RENDER_CONFIG[device].init + MOVIE_RENDER_CONFIG[device].more * page);
    // Проверяем длину массива с фильмами
    // Если больше нечего показать, то скрываем кнопку пагинации
    if (movies.length > toShow) {
      setIsMoreButton((btn) => ({ ...btn, show: true }));
    } else {
      setIsMoreButton((btn) => ({ ...btn, show: false }));
    }
  }, [page, toShow, movies, device]);

  const handleChangePage = () => {
    // скроем кнопку, включим загрузку для спиннера
    setIsMoreButton({ show: false, loading: true });
    // имитация обращения к апи
    setTimeout(() => {
      // через 1с выключаем загрузку, показываем кнопку
      setIsMoreButton({ show: true, loading: false });
      // и меняем страницу для запуска useEffect и подсчета фильмов для показа
      setPage((page) => page + 1);
    }, 1000);
  };

  const renderMovies = (movies) => {
    if (movies.length > 0) {
      return movies.slice(0, toShow).map((movie) => {
        return (
          <li
            className='movies__item'
            key={movie.movieId}
          >
            <MoviesCard
              name={movie.nameRU}
              duration={movie.duration}
              isSaved={movie.isSaved}
              image={movie.image}
              isMainMoviesPage={isMainMoviesPage}
            />
          </li>
        );
      });
    }
  };

  return (
    <section className={isMainMoviesPage ? 'movies' : 'movies movies_type_saved'}>
      <ul className='movies__list'>{renderMovies(movies)}</ul>
      {isMoreButton.loading && <Preloader />}
      {isMainMoviesPage && isMoreButton.show && <button type='button' className='movies__load-more-button button-hover' onClick={handleChangePage}>Ещё</button>}
    </section>
  );
};

export default MoviesCardList;
