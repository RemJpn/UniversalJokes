import React, {useState, useEffect} from 'react';

import {JokeObject, getJoke} from '../api/JokeAPI';
import JokeShow from './joke_show';


export default function JokeShowUrl({match}): JSX.Element {
  const [thisJoke, setThisJoke] = useState<JokeObject>();
  const jokeId = match.params.id;

  useEffect(() => getJoke(jokeId, setThisJoke), []);


  if (!thisJoke) return <p className="mt-20">Loading</p>

  return <JokeShow joke={thisJoke} setJoke={setThisJoke} isFromUrl={true} />
}
