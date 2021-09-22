import React from 'react';
import {
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

// Импорт констант
import  {
  AUTH_ERROR,
  REGISTER_ERROR,
  FORM_PROFILE_ERROR,
  FROM_PROFILE_SUCCESS,
  LOAD_ERROR,
  PAGE_ERROR
} from '../../utils/constants';


// Импорт компонентов
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';


// Импорт Api
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

// Импорт стилей
import './App.css';

function App() {

  const history = useHistory();

  // Статус авторизации пользователя
  const [loggedIn, setLoggedIn] = React.useState(false || localStorage.getItem('loggedIn'));
  const [currentUser, setCurrentUser] = React.useState({}); // Данные текущего пользователя

  // Прелоадер
  const[isLoading, setIsLoading] = React.useState(false);

  // Ошибки
  const [formAuthError, setFormAuthError] = React.useState('');
  const [formRegisterError, setFormRegisterError] = React.useState('');
  const [formProfileError, setFormProfileError] = React.useState('');
  const [formProfileSuccess, setFormProfileSuccess] = React.useState('');
  const [loadingError, setLoadingError] = React.useState('');

  // Карточки фильмов
  const [movies, setMovies] = React.useState([]); // Фильмы с api yandex
  const [savedMovies, setSavedMovies] = React.useState([]); // Сохраненные фильмы

  /* Проверить токен */
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      mainApi
      .checkToken(jwt)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setCurrentUser({
            name: res.name,
            email: res.email
          })
        }
      })
      .catch((err) => {
        localStorage.removeItem('jwt');
        console.log(`Ошибка: ${err}`)
      })
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn])

  // Получить список фильмов при логине
  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);

      // Получить информацию о пользователе
      mainApi
        .getInitialProfile()
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch(() => {
          setCurrentUser({});
          setLoggedIn(false);
          history.push("/signin");
        })
        .finally(() => {
          setIsLoading(false);
        });

      // Получить список фильмов
      moviesApi
        .getMovies()
        .then((movies) => {
          localStorage.setItem('movies', JSON.stringify(movies))
          setMovies(movies);
        })
        .catch((err) => {
          localStorage.removeItem("movies")
          console.log(`Ошибка: ${err}`)
          setLoadingError(LOAD_ERROR);
        })
        .finally(() => {
          setIsLoading(false);
        });

      // Получить список сохраненных фильмов
      mainApi.getMovies()
        .then((myMovies) => {
          setSavedMovies(myMovies);
          localStorage.setItem('savedMovies', JSON.stringify(myMovies))
        })
        .catch((err) => {
          localStorage.removeItem('savedMovies')
          console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
          setIsLoading(false)
        });

    }
  }, [loggedIn, history]);

  /* Авторизоваться */
  const handleLogin = (email, password) => {
    setIsLoading(true);
    mainApi
    .login(email, password)
    .then(data => {
      if(data.token) {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('jwt', data.token);
        setCurrentUser(data);
        setFormAuthError('');
        history.push("/movies");
      }
    })
    .catch((err) => {
      setLoggedIn(false);
      setFormAuthError(AUTH_ERROR);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  /* Зарегистрироваться */
  const handleRegister = (name, email, password) => {
    setIsLoading(true);
    mainApi
    .register(name, email, password)
    .then(data => {
      if (data) {
        setFormRegisterError('');
        handleLogin(email, password);
      }
    })
    .catch((err) => {
      setFormRegisterError(REGISTER_ERROR);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  /* Обновить профиль пользователя */
  function handleUpdateUser({name, email} ) {
    setIsLoading(true);
    mainApi
      .editProfile({name, email})
      .then(data => {
        if(data) {
          setCurrentUser({
            name: name,
            email: email
          })
          setFormProfileSuccess(FROM_PROFILE_SUCCESS);
          setFormProfileError('');
        }
      })
      .catch(err => {
        setFormProfileSuccess('')
        setFormProfileError(FORM_PROFILE_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /* Выйти из аккаунта */
  const onSignOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('savedMovies')
    localStorage.removeItem('movies')
    setCurrentUser({});
    setLoggedIn(false);
    history.push('/');
  }

  /* Сохранить фильм */
  function handleMovieSave(movie) {
    setIsLoading(true);
    mainApi
      .saveMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        setLoadingError('');
      })
      .catch((err) => {
        console.log(`Что-то пошло не так. ${err}`);
        setLoadingError(PAGE_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /* Удалить фильм */
  function deleteMovie (movie, savedMoviesPage) {
    setIsLoading(true);

    const deletedItem = savedMovies.find((item) => item.movieId === (savedMoviesPage ? movie.movieId : movie.id))

    mainApi
      .deleteMovie(deletedItem)
      .then((res) => {
        if (res) {
          const savedArray = savedMovies.filter((item) => {
            return item.movieId !== res.movie.movieId
          })
          setSavedMovies(savedArray);
          localStorage.setItem("savedMovies", JSON.stringify(savedArray));

          let filteredSavedMovies = JSON.parse(localStorage.getItem('filteredSavedMovies'));

          if (savedMoviesPage && filteredSavedMovies !== null) {
            const savedMoviesFilteredArr = filteredSavedMovies.filter((item) => {
              return item.movieId !== res.movie.movieId
            })
            localStorage.setItem("filteredSavedMovies", JSON.stringify(savedMoviesFilteredArr));
          }

          setLoadingError('');
        }
      })
      .catch((err) => {
        setLoadingError(PAGE_ERROR);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Проверить, сохранен ли фильм
  function handleMovieTest(movie) {

    let check = savedMovies.some((item) => {
      if (item.movieId === movie.id) {
        return true
      } else {
        return false;
      }
    })

    return check;
  }

  /* Редиректы */
  React.useEffect(() => {
    if (currentUser) {
      if(currentUser.email !== undefined && (history.location.pathname==='/signup' || history.location.pathname === '/signin')) {
        history.push('/movies')
      }
    }
  }, [currentUser, history])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>

          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            loadingError={loadingError}
            component={Movies}
            savedMoviesPage={false} // Проверка на тип страницы
            handleMovieSave={handleMovieSave} // Добавить фильм в сохраненные
            handleMovieTest={handleMovieTest} //Проверить, есть ли фильм в сохраненных
            movies={movies}
            deleteMovie={deleteMovie}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            loadingError={loadingError}
            component={SavedMovies}
            savedMoviesPage={true} // Проверка на тип страницы
            movies={savedMovies}
            deleteMovie={deleteMovie}
            handleMovieTest={handleMovieTest}
          />

          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            handleUpdateUser={handleUpdateUser}
            onSignOut={onSignOut}
            formProfileError={formProfileError}
            formProfileSuccess={formProfileSuccess}
            isLoading={isLoading}
          />
          <Route exact path="/signin" >
          <Login
              handleLogin={handleLogin}
              formAuthError={formAuthError}
              isLoading={isLoading}
            />
          </Route>
          <Route exact path="/signup" >
          <Register
              handleRegister={handleRegister}
              formRegisterError={formRegisterError}
              isLoading={isLoading}
            />
          </Route>
          <Route path="*" >
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
