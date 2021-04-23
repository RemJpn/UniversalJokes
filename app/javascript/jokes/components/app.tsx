import React, { useState, useEffect } from 'react';

import Feed from './feed';
import {IsConnectedContext} from '../contexts/IsConnectedContext';


const rootElement = document.getElementById('root');

const App: React.FC = () => {
  const [jokesList, setJokesList] = useState([]);
  useEffect(() => {
    const url = '/api/v1/jokes';
    fetch(url, { credentials: "same-origin" })
      .then(r => r.json())
      .then(data => setJokesList(data));

  }, []);

  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    const url = '/api/v1/logged_in';
    fetch(url, { credentials: "same-origin" })
      .then(r => r.json())
      .then(data => setCurrentUser(data.email != null));

  }, []);

  if (!jokesList) return <p>Loading...</p>;

  return (
    <IsConnectedContext.Provider value={currentUser} >
      <Feed jokesList={jokesList} setJokesList={setJokesList} />
    </IsConnectedContext.Provider >
  ) ;
};

export default App;
