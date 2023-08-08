import { useContext, useState } from 'react';
import Header from '../Header/Header';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

const Profile = ({ onLogout }) => {
  const currentUser = useContext(CurrentUserContext);
  const [isLoading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <Header />
      <main>
        <section className='profile'>
          <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
          <form
            className='profile__form'
            onSubmit={handleSubmit}
          >
            <div className='profile__input-wrapper'>
              <label className='profile__label'>
                <p className='profile__label-name'>Имя</p>
                <input
                  className='profile__input'
                  name='name'
                  type='text'
                  placeholder='Введите имя'
                  value={formValues.name ?? ''}
                  minLength={2}
                  maxLength={30}
                  onChange={handleChange}
                  required
                />
              </label>
              <span className='profile__input-error'></span>
            </div>
            <div className='profile__input-wrapper'>
              <label className='profile__label'>
                <p className='profile__label-name'>E-mail</p>
                <input
                  className='profile__input'
                  name='email'
                  type='email'
                  placeholder='Введите e-mail'
                  value={formValues.email ?? ''}
                  onChange={handleChange}
                  required
                />
              </label>
              <span className='profile__input-error'></span>
            </div>
            {isLoading ? (
              <Preloader />
            ) : (
              <div className='profile__buttons-wrapper'>
                <button
                  type='submit'
                  className='profile__button profile__button_type_edit button-hover'
                >
                  Редактировать
                </button>
                <button
                  type='button'
                  className='profile__button profile__button_type_logout button-hover'
                  onClick={onLogout}
                >
                  Выйти из аккаунта
                </button>
              </div>
            )}
          </form>
        </section>
      </main>
    </>
  );
};

export default Profile;
