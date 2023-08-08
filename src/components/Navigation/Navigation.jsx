import './Navigation.css';
import NavGuest from './NavGuest/NavGuest';
import NavAuth from './NavAuth/NavAuth';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NavBurger from './NavBurger/NavBurger';
import { DeviceContext } from '../../contexts/DeviceContext';
import { DEVICE_CONFIG } from '../../utils/config';

const Navigation = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { isLoggedIn } = useContext(CurrentUserContext);
  const device = useContext(DeviceContext);
  const isShowBurgerMenu = device !== DEVICE_CONFIG.desktop ? true : false;

  const toggleBurgerMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <>
      {!isLoggedIn && <NavGuest />}
      {isLoggedIn && !isShowBurgerMenu && <NavAuth />}
      {isLoggedIn && isShowBurgerMenu && (
        <button
          type='button'
          className='header__burger button-hover'
          onClick={toggleBurgerMenu}
        />
      )}
      {isShowBurgerMenu && isLoggedIn && (
        <NavBurger
          isMenuActive={isMenuActive}
          onToggle={toggleBurgerMenu}
        />
      )}
    </>
  );
};

export default Navigation;
