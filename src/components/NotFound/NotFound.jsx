import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section className='not-found'>
        <div className='not-found__wrapper'>
          <h1 className='not-found__title'>404</h1>
          <p className='not-found__caption'>Страница не найдена</p>
        </div>
        <button
          type='button'
          className='not-found__button button-hover'
          onClick={() => navigate(-1, { replace: true })}
        >
          Назад
        </button>
      </section>
    </main>
  );
};

export default NotFound;
