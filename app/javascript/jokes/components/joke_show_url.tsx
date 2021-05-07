import React, {useState, useEffect} from 'react';

import {JokeObject} from './joke';
import JokeShow from './joke_show';


export default function JokeShowUrl(props): JSX.Element {
  const [thisJoke, setThisJoke] = useState<JokeObject>();

  const getJoke = () => {
    const jokeId = props.match.params.id;
    const url = `/api/v1/jokes/${jokeId}`;
    fetch(url, { credentials: "same-origin" })
      .then(r => r.json())
      .then(data => {
        setThisJoke(data)
      })
      .catch(() => {
        window.location.href = "/"
      });
  };

  useEffect(() => getJoke(), []);


  if (!thisJoke) return <p className="mt-20">Loading</p>

  return <JokeShow joke={thisJoke} setJoke={setThisJoke} isFromUrl={true} />
}
