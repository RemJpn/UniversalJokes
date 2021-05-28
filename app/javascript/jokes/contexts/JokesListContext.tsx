import React from 'react';

export const defaultJokesListContext = {
  jokesList: [],
  setJokesList: console.log
}

export const JokesListContext = React.createContext(defaultJokesListContext);
