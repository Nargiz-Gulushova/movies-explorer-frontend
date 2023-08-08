import { Link } from 'react-scroll';
import './NavTab.css';

const NavTab = () => {
  return (
    <nav className='nav-tab'>
      <ul className='nav-tab__list'>
        <li className='nav-tab__item'>
          <Link
            to='about'
            smooth={true}
            className='nav-tab__link link-hover'
          >
            О проекте
          </Link>
        </li>
        <li className='nav-tab__item'>
          <Link
            to='techs'
            smooth={true}
            className='nav-tab__link link-hover'
          >
            Технологии
          </Link>
        </li>
        <li className='nav-tab__item'>
          <Link
            to='me'
            smooth={true}
            className='nav-tab__link link-hover'
          >
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
