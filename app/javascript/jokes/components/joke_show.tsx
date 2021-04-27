import React from 'react';


import {JokeObject} from './joke';

interface Props {
  joke: JokeObject;
  setJokeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JokeShow({joke, setJokeOpen}: Props): JSX.Element {

  return (
    <div className="w-screen h-screen fixed inset-0 bg-red-500 z-50" onClick={()=> setJokeOpen(false)}>
      {joke.content}
    </div>
  );
}
