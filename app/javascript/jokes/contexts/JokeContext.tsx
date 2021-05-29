import React from 'react';

export const defaultJokeContext = {
  joke: null,
  setJoke: null
}

export const JokeContext = React.createContext(defaultJokeContext);
