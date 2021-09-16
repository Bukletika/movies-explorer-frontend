import './App.css';
import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

import { userData } from '../../utils/utils';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>
          <Route exact path="/movies">
            <Movies loggedIn={true}/>
          </Route>
          <Route exact path="/saved-movies">
            <SavedMovies loggedIn={true}/>
          </Route>
          <Route exact path="/signin" >
            <Login setLoggedIn={setLoggedIn}/>
          </Route>
          <Route exact path="/signup" >
            <Register />
          </Route>
          <Route exact path="/profile">
            <Profile userData={userData} loggedIn={true} setLoggedIn={setLoggedIn}/>
          </Route>
          <Route path="*" >
            <NotFound />
          </Route>
        </Switch>
      </div>

  );
}

export default App;
