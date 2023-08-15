import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { MOVIE_RENDER_CONFIG, MOVIES_BASE_URL } from '../../utils/config';
import { useContext, useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { DeviceContext } from '../../contexts/DeviceContext';

const MoviesCardList = ({
                          movies,
                          savedMovies,
                          isMainMoviesPage,
                          searchStatus,
                          requestStatus,
                          onSave,
                          onDelete
                        }) => {
  const device = useContext(DeviceContext);
  const [ toShow, setToShow ] = useState(0);
  const [ page, setPage ] = useState(0);
  const [ isMoreButton, setIsMoreButton ] = useState({
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
  }, [ page, toShow, movies, device ]);

  const handleChangePage = () => {
    // скроем кнопку, включим загрузку для спиннера
    setIsMoreButton({ show: false, loading: true });
    // имитация обращения к апи
    setTimeout(() => {
      // через 1с выключаем загрузку, показываем кнопку
      setIsMoreButton({ show: true, loading: false });
      // и меняем страницу для запуска useEffect и подсчета фильмов для показа
      setPage((page) => page + 1);
    }, 300);
  };

  const isSaved = (movie) => {
    return savedMovies.reduce((isSaved, savedMovie) => {
      if (movie.id === savedMovie.movieId) {
        movie._id = savedMovie._id;
        return true;
      }
      return isSaved;
    }, false);
  };

  const renderMovies = () => {
    if (movies.length > 0) {
      if (isMainMoviesPage) {
        return movies.slice(0, toShow).map((movie) => {
          return (
            <li className="movies__item"
                key={movie.id}
            >
              <MoviesCard name={movie.nameRU}
                          duration={movie.duration}
                          isSaved={isSaved(movie)}
                          image={MOVIES_BASE_URL + movie.image.url}
                          isMainMoviesPage={isMainMoviesPage}
                          movie={movie}
                          onSave={onSave}
                          onDelete={onDelete}
              />
            </li>
          );
        });
      } else {
        return movies.map((movie) => {
          return (
            <li className="movies__item"
                key={movie.movieId}
            >
              <MoviesCard name={movie.nameRU}
                          duration={movie.duration}
                          isSaved={isSaved(movie)}
                          image={movie.image}
                          isMainMoviesPage={isMainMoviesPage}
                          movie={movie}
                          onSave={onSave}
                          onDelete={onDelete}
              />
            </li>
          );
        });
      }
    }
  };

  const showButton = isMainMoviesPage && isMoreButton.show && !requestStatus.isLoading;

  return (
    <section className={isMainMoviesPage ? 'movies' : 'movies movies_type_saved'}>

      {searchStatus.isFirstSearch || searchStatus.isError
        ? <h1 className={'movies__error'}>{searchStatus.errorMessage}</h1>
        : searchStatus.isLoading || isMoreButton.loading || requestStatus.isLoading
          ? <Preloader/>
          : <>
            <ul className="movies__list">{renderMovies()}</ul>
            {showButton &&
              <button type="button"
                      className="movies__load-more-button button-hover"
                      onClick={handleChangePage}>
                Ещё
              </button>
            }
          </>
      }
    </section>
  );
};

export default MoviesCardList;
