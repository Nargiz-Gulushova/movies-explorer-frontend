import './MoviesSearchForm.css';

const MoviesSearchForm = () => {
  return (
    <section className='search' aria-label='Форма поиска фильмов'>
      <form className='search__form'>
        <div className='search__form-container'>
          <div className='search__input-wrapper'>
            <div className='search__icon-wrapper'>
              <input
                type='text'
                className='search__input'
                placeholder='Фильм'
                required
              />
              <span className='search__input-icon' />
            </div>
            <button
              type='submit'
              className='search__submit-button button-hover'
            />
          </div>
          <label className='search__label button-hover'>
            <input
              type='checkbox'
              className='search__checkbox'
              defaultChecked={true}
            />
            <span className='search__checkbox-span' />
            <span className='search__caption'>Короткометражки</span>
          </label>
        </div>
      </form>
    </section>
  );
};

export default MoviesSearchForm;
