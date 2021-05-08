import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation }from 'react-router-dom';

import {PrivateRoute} from './private_route';
import Feed from './feed';
import NavBar from './navbar';
import JokeShowUrl from './joke_show_url';
import Profile from './profile';

import {CurrentUserContext, defaultUser} from '../contexts/CurrentUserContext';


const App: React.FC = () => {
  const [jokesList, setJokesList] = useState([]);
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const location = useLocation();

  const getCurrentUser =() => {
    const url = '/api/v1/logged_in';
    fetch(url, { credentials: "same-origin" })
      .then(r => r.json())
      .then(data => setCurrentUser(data));
  }
  useEffect(() => getCurrentUser(), []);

  const jokesIndex = () => {
    const url = '/api/v1/jokes';
    fetch(url, { credentials: "same-origin" })
      .then(r => r.json())
      .then(data => setJokesList(data));
  };

  const savedJokesIndex = () => {
    const url = '/api/v1/saved_jokes';
    fetch(url, { credentials: "same-origin" })
      .then(r => r.json())
      .then(data => setJokesList(data));
  };

  useEffect(()=>{
    switch (location.pathname) {
      case "/":
        jokesIndex()
        break;
      case "/saved":
        savedJokesIndex();
        break;
    }
  }, [location])


  if (!jokesList) return <p>Loading...</p>;

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <NavBar />

      <Switch>
        <Route path="/" exact>
          <Feed jokesList={jokesList} setJokesList={setJokesList} />
        </Route>
        <Route path="/saved">
          <Feed jokesList={jokesList} setJokesList={setJokesList} />
        </Route>
        <PrivateRoute path="/profile">
          <Profile/>
        </PrivateRoute>
        <Route
          path="/jokes/:id"
          render={(props) => (
            <JokeShowUrl {...props} />
          )}
        />
      </Switch>
    </CurrentUserContext.Provider >
  ) ;
};

export default App;
