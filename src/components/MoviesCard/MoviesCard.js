import React from "react";

// Импорт констант
import  { SHORT_MOVIE_DURATION } from '../../utils/constants';

// Импорт стилей
import './MoviesCard.css';

function MoviesCard({
  savedMoviesPage,
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
  if(movie.duration <= SHORT_MOVIE_DURATION) {
    return `${movie.duration} мин`;
  } else {
    return `${Math.floor(movie.duration / SHORT_MOVIE_DURATION).toString()} ч ${Math.round((movie.duration % SHORT_MOVIE_DURATION) * 0.6666).toString()} мин`
  }
};

function handleFilmSave() {
  handleMovieSave(movie);
}

function handleFilmDelete() {
  deleteMovie(movie, savedMoviesPage);
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
      {savedMoviesPage ? (
        <button className="movies__delete" onClick={handleFilmDelete}></button>
        ) : (
         (!isAdded ? <button className="movies__save" onClick={handleFilmSave}>Сохранить</button> : <button className="movies__saved" onClick={handleFilmDelete}></button> )
      )}

    </article>
  )
}

export default MoviesCard;
