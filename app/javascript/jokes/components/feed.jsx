import React from 'react';

import Joke from './joke';
import JokeForm from './joke_form';


export default function Feed({jokesList, setJokesList}) {
  const renderJokesList = () => {
    return jokesList.map ( joke => {
      return (
        <Joke joke={joke} key={joke.id} />
      );
    });
  }

  return (
    <div>
      <JokeForm setJokesList={setJokesList} />
      {renderJokesList()}
    </div>
  );
};
