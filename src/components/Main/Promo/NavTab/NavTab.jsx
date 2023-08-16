import { Link } from 'react-scroll';
import './NavTab.css';

const NavTab = () => {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__item link-hover">
          <Link to="about"
                smooth={true}
                className="nav-tab__link"
          >
            О проекте
          </Link>
        </li>
        <li className="nav-tab__item link-hover">
          <Link to="techs"
                smooth={true}
                className="nav-tab__link"
          >
            Технологии
          </Link>
        </li>
        <li className="nav-tab__item link-hover">
          <Link to="me"
                smooth={true}
                className="nav-tab__link"
          >
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
