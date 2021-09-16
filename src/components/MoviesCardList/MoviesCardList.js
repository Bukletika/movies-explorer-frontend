import './MoviesCardList.css';
import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import { MOVIES_IMAGES, MOVIES_QUANTITY } from '../../utils/constants';

function MoviesCardList({
  savedMovies,
  movies,
  handleMovieSave,
  handleMovieTest,
  deleteMovie
}) {

  const {
    size2,
    size3,
    size5,
    size8,
    size12
  } = MOVIES_QUANTITY;

  // Размер экрана
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  // Кол-во выводимых карточек
  const [visibledMoviesQuantity, setVisibledMoviesQuantity] = React.useState(0);
  const [cardsQuantity, setCardsQuantity] = React.useState(0);


  const changeScreenWidth = () => {
    setScreenWidth(window.innerWidth)
  };

  const handleButtonMore = () => {
    setVisibledMoviesQuantity(visibledMoviesQuantity + cardsQuantity);
  };



  React.useEffect(() => {
    window.addEventListener('resize', changeScreenWidth);
    if (screenWidth >= 1280) {
      setVisibledMoviesQuantity(size12);
      setCardsQuantity(size3);
    } else if (screenWidth >= 768) {
      setVisibledMoviesQuantity(size8);
      setCardsQuantity(size2);
    }
     else {
      setVisibledMoviesQuantity(size5);
      setCardsQuantity(size2);
    }
    return () => window.removeEventListener('resize', changeScreenWidth);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth]);

  return (
    <section className="movies">
      <ul className="movies__items">

      {!savedMovies ? (

        <>
          {movies.reduce((cardsShowQuantity, movie) => {
              cardsShowQuantity.length < visibledMoviesQuantity &&
              cardsShowQuantity.push(
                  <li key={movie.id} className="movies__item">
                    <MoviesCard
                      movie={movie}
                      nameRU={movie.nameRU}
                      image={`${MOVIES_IMAGES}${movie.image.url}`}
                      link={movie.trailerLink}
                      savedMovies={savedMovies}
                      handleMovieSave={handleMovieSave}
                      handleMovieTest={handleMovieTest}
                    />
                  </li>
                );
            return cardsShowQuantity;
          }, [])}
        </>

      ) : (
        <>
         {movies.reduce((cardsShowQuantity, movie) => {
            cardsShowQuantity.length < visibledMoviesQuantity &&
            cardsShowQuantity.push(
              <li key={movie.movieId} className="movies__item">
                <MoviesCard
                  movie={movie}
                  nameRU={movie.nameRU}
                  image={`${movie.image}`}
                  link={movie.trailer}
                  savedMovies={savedMovies}
                  handleMovieSave={handleMovieSave}
                  handleMovieTest={handleMovieTest}
                  deleteMovie={deleteMovie}
                />
              </li>
                );
                return cardsShowQuantity;
              }, [])}
          </>
          )}

      </ul>

      {movies.length > visibledMoviesQuantity && <button className="movies__more" type="button" onClick={handleButtonMore}>Ещё</button>}

    </section>
  )
}

export default MoviesCardList;
