import NavAuth from '../NavAuth/NavAuth';
import './NavBurger.css';

const NavBurger = ({ isMenuActive, onToggle }) => {
  return (
    <div className='burger'>
      <div
        onClick={onToggle}
        className={
          isMenuActive
            ? 'burger__overlay burger__overlay_active'
            : 'burger__overlay'
        }
      >
        <div
          className={
            isMenuActive
              ? 'burger__wrapper burger__wrapper_active'
              : 'burger__wrapper'
          }
        >
          <div
            className='burger__content'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type='button'
              className='burger__close-button button-hover'
              onClick={onToggle}
            />
            <NavAuth isMenuActive={isMenuActive} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBurger;
