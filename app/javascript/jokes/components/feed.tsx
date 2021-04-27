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
    <div className='feed mt-20'>
      <JokeForm setJokesList={setJokesList} />
      {renderJokesList()}
    </div>
  );
}
