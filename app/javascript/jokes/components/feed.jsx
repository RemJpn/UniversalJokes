import React from 'react';

import Joke from './joke';


export default function Feed({jokesList}) {
  const renderJokesList = (jokesList) => {
    return jokesList.map ( joke => {
      return (
        <Joke joke={joke} key={joke.id} />
      );
    });
  }

  return renderJokesList(jokesList);
};
