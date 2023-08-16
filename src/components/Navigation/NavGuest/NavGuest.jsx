import { Link } from 'react-router-dom';
import './NavGuest.css';

const NavGuest = () => {
  return (
    <nav className="nav-guest">
      <ul className="nav-guest__list">
        <li className="nav-guest__item">
          <Link to="/signup"
                className="nav-guest__link link-hover"
          >
            Регистрация
          </Link>
        </li>
        <li className="nav-guest__item">
          <Link to="/signin"
                className="nav-guest__link nav-guest__link_type_login link-hover"
          >
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavGuest;
