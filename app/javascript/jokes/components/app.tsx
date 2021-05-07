import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation }from 'react-router-dom';

import Feed from './feed';
import NavBar from './navbar';
import JokeShowUrl from './joke_show_url';
import Profile from './profile';

import {IsConnectedContext} from '../contexts/IsConnectedContext';


const App: React.FC = () => {
  const [jokesList, setJokesList] = useState([]);
  const [currentUser, setCurrentUser] = useState(false);
  const location = useLocation();

  const userLoggedIn =() => {
    const url = '/api/v1/logged_in';
    fetch(url, { credentials: "same-origin" })
      .then(r => r.json())
      .then(data => setCurrentUser(data.email != null));
  }
  useEffect(() => userLoggedIn(), []);

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
        console.log('index')
        jokesIndex()
        break;
      case "/saved":
        console.log('saved')
        savedJokesIndex();
        break;
    }
  }, [location])


  if (!jokesList) return <p>Loading...</p>;

  return (
    <IsConnectedContext.Provider value={currentUser} >
      <NavBar />

      <Switch>
        <Route
          path="/" exact
          render={() => (
            <Feed jokesList={jokesList} setJokesList={setJokesList} />
          )}
        />
        <Route
          path="/saved"
          render={() => (
            <Feed jokesList={jokesList} setJokesList={setJokesList} />
          )}
        />
        <Route path="/profile" component={Profile} />
        <Route
          path="/jokes/:id"
          render={(props) => (
            <JokeShowUrl {...props} />
          )}
        />
      </Switch>
    </IsConnectedContext.Provider >
  ) ;
};

export default App;
