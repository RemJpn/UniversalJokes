import React, { useState, useEffect } from 'react';

import Feed from './feed';
import NavBar from './navbar';
import {IsConnectedContext} from '../contexts/IsConnectedContext';


const App: React.FC = () => {
  const [jokesList, setJokesList] = useState([]);
  const [currentUser, setCurrentUser] = useState(false);
  const [currentPage, setCurrentPage] = useState('jokesIndex');

  const jokesIndex = () => {
    const url = '/api/v1/jokes';
    fetch(url, { credentials: "same-origin" })
      .then(r => r.json())
      .then(data => setJokesList(data));
  };

  const userLoggedIn =() => {
    const url = '/api/v1/logged_in';
    fetch(url, { credentials: "same-origin" })
      .then(r => r.json())
      .then(data => setCurrentUser(data.email != null));
  }

  const savedJokesIndex = () => {
    const url = '/api/v1/saved_jokes';
    fetch(url, { credentials: "same-origin" })
      .then(r => r.json())
      .then(data => setJokesList(data));
  };

  useEffect(() => jokesIndex(), []);
  useEffect(() => userLoggedIn(), []);
  useEffect(() => {
    switch(currentPage) {
      case 'jokesIndex':
        jokesIndex();
        break;
      case 'savedJokesIndex':
        savedJokesIndex();
        break;
    }
  }, [currentPage]);

  if (!jokesList) return <p>Loading...</p>;

  return (
    <IsConnectedContext.Provider value={currentUser} >
      <NavBar setCurrentPage={setCurrentPage} />
      <Feed jokesList={jokesList} setJokesList={setJokesList} />
    </IsConnectedContext.Provider >
  ) ;
};

export default App;
