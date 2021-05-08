import React from 'react';

export const defaultUser = {
  authenticated: false,
  id: 0,
  nickname: 'not connected',
  email: 'not connected',
  nb_liked: 0
}

export const CurrentUserContext = React.createContext({
  authenticated: false,
  id: 0,
  nickname: 'not connected',
  email: 'not connected',
  nb_liked: 0
});
