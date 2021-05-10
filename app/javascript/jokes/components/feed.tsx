import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';


import {Joke} from './joke';
import JokeForm from './joke_form';
import {JokeObject, jokesIndex} from '../api/JokeAPI';
import {savedJokesIndex} from '../api/SavedAPI';


export default function Feed(): JSX.Element {
  const [jokesList, setJokesList] = useState<JokeObject[]>([]);
  const location = useLocation();

  useEffect(()=>{
    switch (location.pathname) {
      case "/":
        jokesIndex(setJokesList);
        break;
      case "/saved":
        savedJokesIndex(setJokesList);
        break;
    }
  }, [location])


  const renderJokesList = () => {
    if (!jokesList) return <p className="mt-16">Loading...</p>;

    return jokesList.map ( joke => {
      return (
        <Joke joke={joke} key={joke.id} />
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
