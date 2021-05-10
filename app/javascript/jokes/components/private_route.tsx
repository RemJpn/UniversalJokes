import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';

import NotConnected from './not_connected';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export function PrivateRoute({ component: Component, setCurrentUser,...rest }): JSX.Element {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser.authenticated ? (
          <Component setCurrentUser={setCurrentUser}/>
        ) : (
          <NotConnected />
          // <Redirect
          //   to={{
          //     pathname: "/",
          //     state: { from: props.location }
          //   }}
          // />
        )
      }
    />
  );
}
