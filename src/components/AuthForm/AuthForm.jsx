import './AuthForm.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { APP_ROUTER } from '../../utils/config';

const AuthForm = ({ isLoginForm, onLogin, onRegister, requestStatus }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(CurrentUserContext);
  const {
    values,
    errors,
    isValid,
    handleChange,
    handleChangeEmail,
  } = useFormAndValidation();
  const { isLoading } = requestStatus;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isLoginForm) {
      onLogin({
        email: values.email,
        password: values.password,
      });
    } else {
      onRegister({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    }
  };

  return isLoggedIn
      ? <Navigate to={APP_ROUTER.movies} replace={true} />
      : <section className="auth">
      <form className="auth__form"
            onSubmit={handleSubmit}
      >
        <div className="auth__heading">
          <div className="auth__logo button-hover"
               onClick={() => navigate('/')}
          />
          <h1 className="auth__title">
            {isLoginForm
              ? 'Рады видеть!'
              : 'Добро пожаловать!'}
          </h1>
        </div>
        <div className="auth__form-inputs">
          {!isLoginForm && (
            <div className="auth__input-wrapper">
              <p className="auth__input-name">Имя</p>
              <input name="name"
                     type="text"
                     className={`auth__input ${errors.name && 'auth__input_invalid'}`}
                     placeholder={'Введите имя'}
                     value={values.name ?? ''}
                     onChange={handleChange}
                     minLength={2}
                     maxLength={30}
                     required
              />
              <span className="auth__input-error">
                {errors.name}
              </span>
            </div>
          )}
          <div className="auth__input-wrapper">
            <p className="auth__input-name">E-mail</p>
            <input name="email"
                   type="email"
                   className={`auth__input ${errors.email && 'auth__input_invalid'}`}
                   placeholder={'Введите e-mail'}
                   value={values.email ?? ''}
                   onChange={handleChangeEmail}
                   required
            />
            <span className="auth__input-error">
              {errors.email}
            </span>
          </div>
          <div className="auth__input-wrapper">
            <p className="auth__input-name">Пароль</p>
            <input name="password"
                   type="password"
                   className={`auth__input ${errors.password && 'auth__input_invalid'}`}
                   placeholder={'Введите пароль'}
                   value={values.password ?? ''}
                   onChange={handleChange}
                   minLength={6}
                   maxLength={30}
                   required
            />
            <span className="auth__input-error">
              {errors.password}
            </span>
          </div>
        </div>
        {isLoading
          ? <Preloader/>
          : <div className="auth__button-wrapper">
            <button type="submit"
                    className="auth__button button-hover"
                    disabled={!isValid}
            >
              {isLoginForm
                ? 'Войти'
                : 'Зарегистрироваться'}
            </button>
            <p className="auth__caption">
              {isLoginForm
                ? 'Ещё не зарегистрированы? '
                : 'Уже зарегистрированы? '}
              <Link className="auth__link link-hover"
                    to={isLoginForm
                      ? '/signup'
                      : '/signin'
                    }
              >
                {isLoginForm
                  ? 'Регистрация'
                  : 'Войти'}
              </Link>
            </p>
          </div>
        }
      </form>
    </section>
};

export default AuthForm;
