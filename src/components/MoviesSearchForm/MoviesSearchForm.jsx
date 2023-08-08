import './MoviesSearchForm.css';

const MoviesSearchForm = (props) => {
  return (
    <section className='search'>
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
            <p className='search__caption'>Короткометражки</p>
          </label>
        </div>
      </form>
    </section>
  );
};

export default MoviesSearchForm;
