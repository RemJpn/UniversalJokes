import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

export function PrivateRoute({ children, ...rest }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser.authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
