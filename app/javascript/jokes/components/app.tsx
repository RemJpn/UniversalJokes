import React, { useState, useEffect } from 'react';
import { Route, Switch }from 'react-router-dom';

import I18nProvider from '../i18n/provider';
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

  const [language, setLanguage] = useState('en');
  useEffect(() => {
    if(currentUser.authenticated){
      setLanguage(currentUser.language)
    }
  }, [currentUser])


  return (
    <CurrentUserContext.Provider value={currentUser} >
      <I18nProvider locale={language}>
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
      </I18nProvider>
    </CurrentUserContext.Provider >
  ) ;
};

export default App;
