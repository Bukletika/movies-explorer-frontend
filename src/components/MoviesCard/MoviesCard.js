import React from "react";
import './MoviesCard.css';

function MoviesCard({
  savedMovies,
  movie,
  handleMovieSave,
  handleMovieTest,
  image,
  link,
  deleteMovie
}) {

const isAdded = handleMovieTest(movie)

// Duration
function movieDuration() {
  if(movie.duration <= 60) {
    return `${movie.duration} мин`;
  } else {
    return `${Math.floor(movie.duration / 60).toString()} ч ${Math.round((movie.duration % 60) * 0.6666).toString()} мин`
  }
};

function handleFilmSave() {
  handleMovieSave(movie);
}

function handleFilmDelete() {
  deleteMovie(movie);
}

  return (
    <article>
      <a className="movies__link" href={link} target="_blank" rel="noreferrer">
        <img className="movies__poster" src={image} alt={movie.nameRU} />
      </a>
      <div className="movies__about">
        <h3 className="movies__title">{movie.nameRU}</h3>
        <p className="movies__duration">
          {movieDuration()}
        </p>
      </div>

      {savedMovies ? (
        <button className="movies__delete" onClick={handleFilmDelete}></button>
        ) : (
         (!isAdded ? <button className="movies__save" onClick={handleFilmSave}>Сохранить</button> : <div className="movies__saved"></div> )
      )}

    </article>
  )
}

export default MoviesCard;
