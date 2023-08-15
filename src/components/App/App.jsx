import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { useEffect, useRef, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { DEVICE_CONFIG, MOVIES_BASE_URL } from '../../utils/config';
import { DeviceContext } from '../../contexts/DeviceContext';
import {
  INITIAL_CURRENT_USER,
  INITIAL_REQUEST_STATUS,
  LOCAL_STORAGE_TOKEN_KEY,
  RESETED_CURRENT_USER
} from '../../utils/vars';
import { MAIN_API } from '../../utils/MainApi';
import InfoTooltip from '../InfoToolTip/InfoToolTip';
import { MOVIES_API } from '../../utils/MoviesApi';

export default function App() {
  const navigate = useNavigate();
  const [ currentUser, setCurrentUser ] = useState(INITIAL_CURRENT_USER);
  // width control
  const [ device, setDevice ] = useState(DEVICE_CONFIG.desktop);
  const windowResizeCooldown = useRef(null);
  // статус общения с API
  const [ requestStatus, setRequestStatus ] = useState(INITIAL_REQUEST_STATUS);
  // информационный попап
  const [ isInfoPopupOpen, setInfoPopupOpen ] = useState(false);
  // фильмы
  const [ movies, setMovies ] = useState([]);
  const [ savedMovies, setSavedMovies ] = useState([]);

  useEffect(() => {
    const changeDeviceByResize = () => {
      clearTimeout(windowResizeCooldown.current);

      windowResizeCooldown.current = setTimeout(() => {
        if (window.innerWidth > DEVICE_CONFIG.desktopWidth) {
          setDevice(DEVICE_CONFIG.desktop);
        } else if (window.innerWidth > DEVICE_CONFIG.tabletWidth) {
          setDevice(DEVICE_CONFIG.tablet);
        } else {
          setDevice(DEVICE_CONFIG.mobile);
        }
      }, 500);
    };

    changeDeviceByResize();

    window.addEventListener('resize', changeDeviceByResize);

    return () => {
      clearTimeout(windowResizeCooldown.current);
      window.removeEventListener('resize', changeDeviceByResize);
    };
  }, [ device ]);

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      handleLoader(true);
      Promise.all([
        MOVIES_API.getMovies(),
        MAIN_API.getMovies(),
        MAIN_API.getUserInfo(),
      ])
        .then(([
                 beatMovies,
                 favMovies,
                 userInfo,
               ]) => {
          setMovies(beatMovies);
          setSavedMovies(favMovies.data);
          setCurrentUser({
            name: userInfo.data.name,
            email: userInfo.data.email,
            isLoggedIn: true,
          });
        })
        .catch((err) => {
          console.error(err);
          setCurrentUser(RESETED_CURRENT_USER);
          navigate('/', { replace: true });
        })
        .finally(() => handleLoader(false));
    }
  }, [ currentUser.isLoggedIn ]);

  const closeInfoPopup = () => {
    setInfoPopupOpen(false);
    // задержка сброса ошибки для корретного рендера попапа при закрытии
    setTimeout(() => {
      resetError();
    }, 300);
  };

  const setError = (message) => {
    setInfoPopupOpen(true);
    setRequestStatus({
      isError: true,
      isLoading: false,
      message: message,
    });
  };

  const resetError = () => {
    setRequestStatus(INITIAL_REQUEST_STATUS);
  };

  const handleLoader = (bool) => {
    setRequestStatus((status) => {
      return { ...status, isLoading: bool };
    });
  };

  const handleEditProfile = ({ name, email }) => {
    handleLoader(true);

    MAIN_API.editUserInfo({ name, email })
      .then((userInfo) => {
        setCurrentUser({
          name: userInfo.data.name,
          email: userInfo.data.email,
          isLoggedIn: true,
        });
        setRequestStatus({
          isError: false,
          isLoading: false,
          message: 'Данные обновлены!',
        });
      })
      .catch(setError)
      .finally(() => handleLoader(false));
  };

  const handleLogin = ({ email, password }) => {
    handleLoader(true);
    MAIN_API.signin({ email, password })
      .then(() => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, 'true');
        setCurrentUser((u) => ({ ...u, isLoggedIn: true }));
        navigate('/movies');
      })
      .catch(setError)
      .finally(() => handleLoader(false));

    // setCurrentUser(() => ({ name: 'test', email: 'pochta@test.ru', isLoggedIn: true }));
    // navigate('/movies');
  };

  const handleRegister = ({ name, email, password }) => {
    handleLoader(true);
    MAIN_API.signup({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
        setRequestStatus((status) => {
          return {
            ...status,
            isError: false,
            message: 'Вы успешно зарегистрировались!',
          };
        });
        setInfoPopupOpen(true);
        navigate('/movies');
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => handleLoader(false));
  };

  const handleLogout = () => {
    MAIN_API.signout()
      .then(() => {
        localStorage.clear();
        setCurrentUser(RESETED_CURRENT_USER);
        navigate('/', { replace: true });
      })
      .catch(console.error);
  };

  const handleSaveMovie = (movie) => {
    const movieData = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: MOVIES_BASE_URL + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: MOVIES_BASE_URL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }

    MAIN_API.addMovie(movieData)
      .then(res => setSavedMovies([ ...savedMovies,  res.data]))
      .catch(console.error);
  };

  const handleDeleteMovie = (id) => {
    MAIN_API.deleteMovie(id)
      .then(() => setSavedMovies((m) => m.filter(movie => movie._id !== id)))
      .catch(console.error)
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <DeviceContext.Provider value={device}>
        <Routes>
          <Route path="/"
                 element={<Main/>}
          />
          <Route path="/movies"
                 element={
                   <Movies setError={setError}
                           movies={movies}
                           savedMovies={savedMovies}
                           requestStatus={requestStatus}
                           onSave={handleSaveMovie}
                           onDelete={handleDeleteMovie}
                   />
                 }
          />
          <Route path="/saved-movies"
                 element={
                   <SavedMovies movies={savedMovies}
                                requestStatus={requestStatus}
                                onDelete={handleDeleteMovie}
                   />
                 }
          />
          <Route path="/signin"
                 element={
                   <Login onLogin={handleLogin}
                          requestStatus={requestStatus}
                   />
                 }
          />
          <Route path="/signup"
                 element={
                   <Register onRegister={handleRegister}
                             requestStatus={requestStatus}
                   />
                 }
          />
          <Route path="/profile"
                 element={
                   <Profile onLogout={handleLogout}
                            onEdit={handleEditProfile}
                            requestStatus={requestStatus}
                   />
                 }
          />
          <Route path="*"
                 element={<NotFound/>}
          />
        </Routes>
        <InfoTooltip isOpen={isInfoPopupOpen}
                     onClose={closeInfoPopup}
                     requestStatus={requestStatus}
        />
      </DeviceContext.Provider>
    </CurrentUserContext.Provider>
  );
}
