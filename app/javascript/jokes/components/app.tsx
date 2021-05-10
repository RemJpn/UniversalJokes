import React, { useState, useEffect } from 'react';
import { Route, Switch }from 'react-router-dom';

import {PrivateRoute} from './private_route';
import Feed from './feed';
import NavBar from './navbar';
import JokeShowUrl from './joke_show_url';
import Profile from './profile';

import {CurrentUserContext, defaultUser} from '../contexts/CurrentUserContext';
import {getCurrentUser} from '../api/UserAPI';


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(defaultUser);
  useEffect(() => getCurrentUser(setCurrentUser), []);

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <NavBar />

      <Switch>
        <Route path={["/", "/saved"]} exact>
          <Feed />
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
