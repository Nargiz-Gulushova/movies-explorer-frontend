import { useContext, useEffect } from 'react';
import Header from '../Header/Header';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';
import useFormAndValidation from '../../hooks/useFormAndValidation';

const Profile = ({ onLogout, onEdit, requestStatus }) => {
  const {
    values,
    errors,
    isValid,
    handleChange,
    handleChangeEmail,
    setValues,
    setValid,
  } = useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);
  const { isLoading } = requestStatus;

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [ currentUser ]);

  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setValid(false);
    }
  }, [ values, currentUser ]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onEdit({
      name: values.name,
      email: values.email,
    });
  };

  return (
    <>
      <Header/>
      <main>
        <section className="profile">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form className="profile__form"
                onSubmit={handleSubmit}
          >
            <div className="profile__input-wrapper">
              <label className="profile__label">
                <span className="profile__label-name">Имя</span>
                <input className={`profile__input ${errors.name && 'profile__input_invalid'}`}
                       name="name"
                       type="text"
                       placeholder="Введите имя"
                       value={values.name ?? ''}
                       minLength={2}
                       maxLength={30}
                       onChange={handleChange}
                       required
                />
              </label>
              <span className="profile__input-error">{errors.name}</span>
            </div>
            <div className="profile__input-wrapper">
              <label className="profile__label">
                <span className="profile__label-name">E-mail</span>
                <input className={`profile__input ${errors.email && 'profile__input_invalid'}`}
                       name="email"
                       type="email"
                       placeholder="Введите e-mail"
                       value={values.email ?? ''}
                       onChange={handleChangeEmail}
                       required
                />
              </label>
              <span className="profile__input-error">{errors.email}</span>
            </div>
            {isLoading ? (
              <Preloader/>
            ) : (
              <div className="profile__buttons-wrapper">
                <button type="submit"
                        disabled={!isValid}
                        className="profile__button profile__button_type_edit button-hover"
                >
                  Редактировать
                </button>
                <button type="button"
                        className="profile__button profile__button_type_logout button-hover"
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
