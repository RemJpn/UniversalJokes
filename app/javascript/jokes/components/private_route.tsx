import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

export function PrivateRoute({ component: Component, setCurrentUser,...rest }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser.authenticated ? (
          <Component setCurrentUser={setCurrentUser}/>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
