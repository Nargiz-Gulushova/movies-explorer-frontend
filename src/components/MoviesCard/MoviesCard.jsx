import './MoviesCard.css';

const MoviesCard = (props) => {
  const renderButton = () => {
    if (props.isMainMoviesPage && !props.isSaved) {
      return (
        <button type="button"
                className="card__button card__button_type_to-save button-hover"
                onClick={() => props.onSave(props.movie)}
        />
      );
    }
    if (props.isMainMoviesPage && props.isSaved) {
      return (
        <button type="button"
                className="card__button card__button_type_saved button-hover"
                onClick={() => props.onDelete(props.movie._id)}
        />
      );
    }
    if (!props.isMainMoviesPage) {
      return (
        <button type="button"
                className="card__button card__button_type_delete button-hover"
                onClick={() => props.onDelete(props.movie._id)}
        />
      );
    }
  };

  const covertDuration = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = Math.floor(time % 60);
    return `${hours > 0 ? hours + 'ч ' : ''}${minutes > 0 ? minutes + 'м' : ''}`;
  };

  const openTrailer = (link) => {
    window.open(link, '_blank');
  }

  return (
    <div className="card">
      <div className="card__heading-wrapper">
        <div className="card__heading">
          <h2 className="card__name">{props.name}</h2>
          <span className="card__duration">{covertDuration(props.duration)}</span>
        </div>
        {renderButton()}
      </div>
      <img src={props.image}
           alt={`Постер фильма ${props.name}`}
           className="card__image"
           onClick={() => openTrailer(props.movie.trailerLink)}
      />
    </div>
  );
};

export default MoviesCard;
