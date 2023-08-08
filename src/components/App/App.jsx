import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import { DEVICE_CONFIG } from '../../utils/config';
import { DeviceContext } from '../../contexts/DeviceContext';

export default function App() {
  const loc = useLocation().pathname;
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    name: 'Виталий',
    email: 'pochta@yandex.ru',
    isLoggedIn: true,
  });
  // page checker
  const isMainMoviesPage = loc === '/movies';
  // width control
  const [device, setDevice] = useState(DEVICE_CONFIG.desktop);
  const windowResizeCooldown = useRef(null);

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
  }, [device]);

  const handleLogin = () => {
    setCurrentUser((user) => ({ ...user, isLoggedIn: true }));
    navigate('/movies');
  };

  const handleLogout = () => {
    setCurrentUser((user) => ({ ...user, isLoggedIn: false }));
    navigate('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <DeviceContext.Provider value={device}>
        <Routes>
          <Route
            path='/'
            element={<Main />}
          />
          <Route
            path='/movies'
            element={
              <Movies
                isMainMoviesPage={isMainMoviesPage}
                device={device}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={<SavedMovies isMainMoviesPage={isMainMoviesPage} />}
          />
          <Route
            path='/signin'
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path='/signup'
            element={<Register />}
          />
          <Route
            path='/profile'
            element={<Profile onLogout={handleLogout} />}
          />
          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </DeviceContext.Provider>
    </CurrentUserContext.Provider>
  );
}
