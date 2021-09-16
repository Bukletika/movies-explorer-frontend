import './MoviesCardList.css';
import React from "react";
import { moviesList } from '../../utils/utils';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  const { pageType } = props;

  return (
    <section className="movies">
      <ul className="movies__items">
      { pageType === "all"
        ? moviesList.map((movie) => (
          <li key={movie.id} className="movies__item">
            <MoviesCard movie={movie} pageType={pageType}/>
          </li>
        ))
        : moviesList.filter((movie) => movie.saved).map((movie) => (
          <li key={movie.id} className="movies__item">
            <MoviesCard movie={movie} pageType={pageType}/>
          </li>
        ))
      }
      </ul>
      <button className="movies__more">Ещё</button>
    </section>
  )
}

export default MoviesCardList;
