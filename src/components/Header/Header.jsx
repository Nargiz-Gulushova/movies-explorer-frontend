import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(CurrentUserContext);

  return (
    <header className={isLoggedIn
      ? 'header header_auth'
      : 'header'}>
      <div className="header__logo button-hover"
           onClick={() => navigate('/')}
      />
      <Navigation/>
    </header>
  );
};

export default Header;
