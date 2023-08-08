import './MoviesCard.css';

const MoviesCard = (props) => {
  const renderButton = () => {
    if (props.isMainMoviesPage && !props.isSaved) {
      return (
        <button
          type='button'
          className='card__button card__button_type_to-save button-hover'
        />
      );
    }
    if (props.isMainMoviesPage && props.isSaved) {
      return (
        <button
          type='button'
          className='card__button card__button_type_saved button-hover'
        />
      );
    }
    if (!props.isMainMoviesPage && props.isSaved) {
      return (
        <button
          type='button'
          className='card__button card__button_type_delete button-hover'
        />
      )
    }
  };

  const covertDuration = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = Math.floor(time % 60);
    const resultString = `${hours > 0 ? hours + 'ч ' : ''}${ minutes > 0 ? minutes + 'м' : ''}`;

    return resultString;
  }

  return (
    <div className='card'>
      <div className='card__heading-wrapper'>
        <div className='card__heading'>
          <h2 className='card__name'>{props.name}</h2>
          <span className='card__duration'>{covertDuration(props.duration)}</span>
        </div>
        {renderButton()}
      </div>
      <img
        src={props.image}
        alt={props.name}
        className='card__image'
      />
    </div>
  );
};

export default MoviesCard;
