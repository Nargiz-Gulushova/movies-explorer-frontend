import { NavLink } from 'react-router-dom';
import './NavAuth.css';

const NavAuth = ({ isMenuActive }) => {
  return (
    <nav className="nav-auth">
      <ul className="nav-auth__menu">
        {isMenuActive && <li className="nav-auth__menu-item">
          <NavLink className={({ isActive }) =>
            isActive
              ? 'nav-auth__link nav-auth__link_active link-hover'
              : 'nav-auth__link link-hover'
          }
                   to="/"
          >
            Главная
          </NavLink>
        </li>}
        <li className="nav-auth__menu-item">
          <NavLink className={({ isActive }) =>
            isActive
              ? 'nav-auth__link nav-auth__link_active link-hover'
              : 'nav-auth__link link-hover'
          }
                   to="/movies"
          >
            Фильмы
          </NavLink>
        </li>
        <li className="nav-auth__menu-item">
          <NavLink className={({ isActive }) =>
            isActive
              ? 'nav-auth__link nav-auth__link_active link-hover'
              : 'nav-auth__link link-hover'
          }
                   to="/saved-movies"
          >
            Сохранённые фильмы
          </NavLink>
        </li>
        {!isMenuActive &&
          <li className="nav-auth__menu-item">
            <NavLink className={'nav-auth__link nav-auth__link_type_profile link-hover'}
                     to="/profile"
            >
              Аккаунт
            </NavLink>
          </li>}
      </ul>
      {isMenuActive &&
        <NavLink className={'nav-auth__link nav-auth__link_type_profile link-hover'}
                 to="/profile"
        >
          Аккаунт
        </NavLink>}
    </nav>
  );
};

export default NavAuth;
