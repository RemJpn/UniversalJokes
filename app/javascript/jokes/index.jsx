import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Feed from './components/feed';

const JokesApp = () => {
  const [jokesList, setJokesList] = useState();
  useEffect(() => {
    const url = '/api/v1/jokes';
    fetch(url, { credentials: "same-origin" })
      .then(r => r.json())
      .then(data => setJokesList(data));

  }, []);


  if (!jokesList) return <p>Loading...</p>;

  return (<Feed jokesList={jokesList} setJokesList={setJokesList} />) ;
};


ReactDOM.render(
  <JokesApp />,
  document.getElementById('root')
);
