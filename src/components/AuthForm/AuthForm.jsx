import { useState } from 'react';
import './AuthForm.css';
import { Link, useNavigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

const AuthForm = ({ isLoginForm, onLogin }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [isLoading, setLoading] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (isLoginForm) {
        onLogin();
      }
      setLoading(false);
    }, 500);
  };

  return (
    <section className='auth'>
      <form
        className='auth__form'
        onSubmit={handleSubmit}
      >
        <div className='auth__heading'>
          <div
            className='auth__logo button-hover'
            onClick={() => navigate('/')}
          />
          <h1 className='auth__title'>{isLoginForm ? 'Рады видеть!' : 'Добро пожаловать!'}</h1>
        </div>
        <div className='auth__form-inputs'>
          {!isLoginForm && (
            <div className='auth__input-wrapper'>
              <p className='auth__input-name'>Имя</p>
              <input
                name='name'
                type='text'
                className='auth__input'
                placeholder={'Введите имя'}
                value={formValues.name}
                onChange={handleChange}
                minLength={2}
                maxLength={30}
                required
              />
              <span className='auth__input-error'></span>
            </div>
          )}
          <div className='auth__input-wrapper'>
            <p className='auth__input-name'>E-mail</p>
            <input
              name='email'
              type='email'
              className='auth__input'
              placeholder={'Введите e-mail'}
              value={formValues.email ?? ''}
              onChange={handleChange}
              required
            />
            <span className='auth__input-error'></span>
          </div>
          <div className='auth__input-wrapper'>
            <p className='auth__input-name'>Пароль</p>
            <input
              name='password'
              type='password'
              className='auth__input'
              placeholder={'Введите пароль'}
              value={formValues.password ?? ''}
              onChange={handleChange}
              minLength={6}
              maxLength={30}
              required
            />
            <span className='auth__input-error'></span>
          </div>
        </div>
        {isLoading
        ? <Preloader />
        :  <div className='auth__button-wrapper'>
            <button
              type='submit'
              className='auth__button button-hover'
            >
              {isLoginForm ? 'Войти' : 'Зарегистрироваться'}
            </button>
            <p className='auth__caption'>
              {isLoginForm ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}{' '}
              <Link
                className='auth__link link-hover'
                to={isLoginForm ? '/signup' : '/signin'}
              >
                {isLoginForm ? 'Регистрация' : 'Войти'}
              </Link>
            </p>
          </div> 
        }
      </form>
    </section>
  );
};

export default AuthForm;
