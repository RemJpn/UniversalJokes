import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Feed from './components/feed';
import {IsConnectedContext} from './contexts/IsConnectedContext';


const rootElement = document.getElementById('root');

const JokesApp = () => {
  const [jokesList, setJokesList] = useState();
  useEffect(() => {
    const url = '/api/v1/jokes';
    fetch(url, { credentials: "same-origin" })
      .then(r => r.json())
      .then(data => setJokesList(data));

  }, []);


  if (!jokesList) return <p>Loading...</p>;

  return (
    <IsConnectedContext.Provider value={rootElement.dataset.signedin == 'true'} >
      <Feed jokesList={jokesList} setJokesList={setJokesList} />
    </IsConnectedContext.Provider >
  ) ;
};


ReactDOM.render(
  <JokesApp />,
  rootElement
);
