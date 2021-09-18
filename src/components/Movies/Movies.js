import React from 'react';
import Preloader from '../Preloader/Preloader';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

// Импорт констант
import  { SHORT_MOVIE_DURATION } from '../../utils/constants';

// Импорт стилей
import './Movies.css';

function Movies({
  loggedIn,
  isLoading,
  loadingError,
  savedMoviesPage,
  handleMovieSave,
  handleMovieTest,
  movies,
  setIsLoading,
  deleteMovie,
}) {

  // Найденные фильмы
  const[filteredMovies, setFilteredMovies] = React.useState(movies);

  React.useEffect(() => {
    setFilteredMovies(movies);
  }, [movies])

  // Был ли поисковый запрос на странице?
  const[query, setQuery] = React.useState(false);

  // Чекбокс короткометражек
  const[isChecked, setIsChecked] = React.useState(false);

  function handleCkecked(evt) {
    setIsChecked(evt.target.checked);
    setCheckbox();
  }

  function setCheckbox() {
    const selectedMovies = JSON.parse(localStorage.getItem('filteredMovies'));
    if (!isChecked) {
      const shortMovies = filteredMovies.filter((item) => {
        return item.duration < SHORT_MOVIE_DURATION;
      });
      setFilteredMovies(shortMovies);
    } else {
      if (selectedMovies === null) {
        setFilteredMovies(movies);
      } else if (query) {
        setFilteredMovies(selectedMovies);
      } else {
        setFilteredMovies(movies);
      }
    }
  }

  // Найти фильмы по заданному слову
  const searchByWord = (movieName, movies) => {
    const resMovieName = movieName.toLowerCase();
    let searchResult = movies.filter((item) => {
        return item.nameRU.toLowerCase().includes(resMovieName);
      });
    return searchResult;
  }

  // Поиск фильмов
  const searchMovies = (movieName, isChecked) => {
    setIsLoading(true);
    try {
      setQuery(true);
      const selectedMovies = searchByWord(movieName, movies);
      localStorage.setItem('filteredMovies', JSON.stringify(selectedMovies));
      if (isChecked) {
        const shortMovies = selectedMovies.filter((item) => {
          return item.duration < SHORT_MOVIE_DURATION;
        });
        setFilteredMovies(shortMovies);
      } else {
        setFilteredMovies(selectedMovies);
      }
    }
    catch (err) { console.log('error')}
    finally { setIsLoading(false)}
  }

  return (
    <>
      <Header loggedIn={loggedIn}/>

      <SearchForm
        isLoading={isLoading}
        movies={movies}
        isChecked={isChecked}
        searchMovies={searchMovies}
        handleCkecked={handleCkecked}
      />

      {isLoading && query && <Preloader />}

      {!isLoading && loadingError !== '' && (
        <div className="movies__info">{loadingError}</div>
      )}

      {filteredMovies.length === 0 && query && (
        <div className="movies__notfound">Фильмов по заданным параметрам поиска не найдено</div>
      )}

      {filteredMovies && query && (
        <MoviesCardList
          savedMoviesPage={savedMoviesPage}
          movies={filteredMovies}
          handleMovieSave={handleMovieSave}
          handleMovieTest={handleMovieTest}
          deleteMovie={deleteMovie}
        />
      )}

      <Footer />
    </>
  )
}

export default Movies;
