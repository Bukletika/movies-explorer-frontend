import React from "react";
import './MoviesCard.css';

function MoviesCard(props) {

  const [isSaved, setIsSaved] = React.useState(false);

  function handleSaveButtonCLick() {
    setIsSaved(!isSaved);
  }

  return (
    <article>
      <img className="movies__poster" src={props.movie.image} alt={props.movie.title} />
      <div className="movies__about">
        <h3 className="movies__title">{props.movie.title}</h3>
        <p className="movies__duration">{props.movie.duration}</p>
      </div>
      {props.pageType === 'saved' ?
        <button className="movies__delete"></button>
        : ''
      }
      {(props.movie.saved || isSaved) && (props.pageType !== 'saved') ?
        <div className="movies__saved"></div>:
        (!isSaved && props.pageType !== 'saved') ? <button className="movies__save" onClick={handleSaveButtonCLick}>Сохранить</button> : ''
      }
    </article>
  )
}

export default MoviesCard;
