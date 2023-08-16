import './MoviesSearchForm.css';

const MoviesSearchForm = ({
                            searchQuery,
                            onChange,
                            onCheckboxChange,
                            onSubmit,
                            searchStatus,
                          }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(searchQuery);
  };

  return (
    <section className="search" aria-label="Форма поиска фильмов">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <div className="search__form-container">
          <div className="search__input-wrapper">
            <div className="search__icon-wrapper">
              <input
                type="text"
                name="search"
                value={searchQuery.search ?? ''}
                onChange={onChange}
                className="search__input"
                placeholder="Фильм"
                required
                autoComplete={'off'}
                disabled={searchStatus.isLoading}
              />
              <span className="search__input-icon"/>
            </div>
            <button
              type="submit"
              className="search__submit-button button-hover"
              disabled={searchStatus.isLoading}
            />
          </div>
          <label className="search__label button-hover">
            <input
              type="checkbox"
              name="checkbox"
              className="search__checkbox"
              checked={searchQuery.isShort}
              onChange={onCheckboxChange}
              disabled={searchStatus.isLoading}
            />
            <span className="search__checkbox-span"/>
            <span className="search__caption">Короткометражки</span>
          </label>
        </div>
      </form>
    </section>
  );
};

export default MoviesSearchForm;
