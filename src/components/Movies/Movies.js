import React from 'react';
import Preloader from '../Preloader/Preloader';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

// Импорт стилей
import './Movies.css';

function Movies({
  loggedIn,
  isLoading,
  loadingError,
  savedMovies,
  handleMovieSave,
  handleMovieTest,
  movies,
  setIsLoading
}) {

  // Найденные фильмы
  const[filteredMovies, setFilteredMovies] = React.useState([]);

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
        return item.duration < 40;
      });
      setFilteredMovies(shortMovies);
    } else {
      setFilteredMovies(selectedMovies);
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
          return item.duration < 40;
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

      {isLoading && <Preloader />}

      {filteredMovies && query && (
        <MoviesCardList
          savedMovies={savedMovies}
          movies={filteredMovies}
          handleMovieSave={handleMovieSave}
          handleMovieTest={handleMovieTest}
        />
      )}

      {filteredMovies.length === 0 && query && (
        <div className="movies__notfound">Фильмов по заданным параметрам поиска не найдено</div>
      )}

      {!isLoading && loadingError !== '' && (
        <div className="movies__info">{loadingError}</div>
      )}
      <Footer />
    </>
  )
}

export default Movies;
