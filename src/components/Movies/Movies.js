import React from 'react';
import Preloader from '../Preloader/Preloader';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

// Импорт стилей
import './Movies.css';

function Movies(props) {

  // Превью лоадера
  const [isLoadCards, setIsLoadCards] = React.useState(true);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoadCards(false);
    }, 1000);
    return () => clearTimeout(timeout);
  },[]);

  return (
    <>
      <Header loggedIn={props.loggedIn}/>
      <SearchForm />
      {isLoadCards
       ? <Preloader />
       : <MoviesCardList pageType="all"/>
      }
      <Footer />
    </>
  )
}

export default Movies;
