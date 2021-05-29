import React, {useState, useEffect} from 'react';

import {JokeObject, getJoke} from '../api/JokeAPI';
import JokeShow from './joke_show';
import {JokeContext} from '../contexts/JokeContext';


export default function JokeShowUrl({match}): JSX.Element {
  const [thisJoke, setThisJoke] = useState<JokeObject>();
  const jokeId = match.params.id;

  useEffect(() => getJoke(jokeId, setThisJoke), []);


  if (!thisJoke) return <p className="mt-20">Loading</p>

  return (
    <JokeContext.Provider value={{joke: thisJoke, setJoke: setThisJoke}} >
      <JokeShow joke={thisJoke} setJoke={setThisJoke} isFromUrl={true} />
    </JokeContext.Provider>
  )
}
