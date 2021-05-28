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

  const getLang = () => {
    if (navigator.languages != undefined)
      return navigator.languages[0].split(/[-_]/)[0]; //remove region
    return navigator.language.split(/[-_]/)[0];
  }


  const browserLanguage = getLang();
  const [language, setLanguage] = useState(browserLanguage);
  useEffect(() => {
    if(currentUser.authenticated){
      setLanguage(currentUser.language)
    }
  }, [currentUser])

  const [search, setSearch] = useState('');

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <I18nProvider locale={language}>
        <NavBar search={search} setSearch={setSearch}/>

        <Switch>
          <Route path={["/", "/saved"]} exact>
            <Feed search={search}/>
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
