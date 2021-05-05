import React from 'react';

import {Joke, JokeObject} from './joke';
import JokeForm from './joke_form';


interface Props {
  jokesList: JokeObject[];
  setJokesList: React.Dispatch<React.SetStateAction<JokeObject[]>>;
}

export default function Feed({jokesList, setJokesList}: Props): JSX.Element {
  const renderJokesList = () => {
    return jokesList.map ( joke => {
      return (
        <Joke joke={joke} key={joke.id} setJokesList={setJokesList} />
      );
    });
  }

  return (
    <main className='feed mt-16 p-4'>
      <JokeForm setJokesList={setJokesList} />
      {renderJokesList()}
    </main>
  );
}
