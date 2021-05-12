import React from 'react';

export const defaultUser = {
  authenticated: false,
  id: 0,
  nickname: 'not connected',
  email: 'not connected',
  nb_jokes: 0,
  nb_translations: 0,
  nb_liked: 0,
  nb_saved: 0,
  avatar: '',
  language: 'en'
}

export const CurrentUserContext = React.createContext(defaultUser);
