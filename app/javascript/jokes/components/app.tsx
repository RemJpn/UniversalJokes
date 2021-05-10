import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation }from 'react-router-dom';

import {PrivateRoute} from './private_route';
import Feed from './feed';
import NavBar from './navbar';
import JokeShowUrl from './joke_show_url';
import Profile from './profile';

import {CurrentUserContext, defaultUser} from '../contexts/CurrentUserContext';
import {getCurrentUser} from '../api/UserAPI';
import {jokesIndex} from '../api/JokeAPI';
import {savedJokesIndex} from '../api/SavedAPI';


const App: React.FC = () => {
  const [jokesList, setJokesList] = useState([]);
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const location = useLocation();

  useEffect(() => getCurrentUser(setCurrentUser), []);

  useEffect(()=>{
    switch (location.pathname) {
      case "/":
        jokesIndex(setJokesList);
        break;
      case "/saved":
        savedJokesIndex(setJokesList);
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
        <PrivateRoute path="/profile" setCurrentUser={setCurrentUser} component={Profile}/>
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
