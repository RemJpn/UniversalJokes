import React, {useState, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';


import {Joke} from './joke';
import JokeForm from './joke_form';
import {JokeObject, jokesIndex} from '../api/JokeAPI';
import {savedJokesIndex} from '../api/SavedAPI';

interface Props {
  search: string,
}

export default function Feed({search}: Props): JSX.Element {
  const [jokesList, setJokesList] = useState<JokeObject[]>([]);
  const location = useLocation();
  const controllerRef = useRef<AbortController | null>();

  useEffect(()=>{
    if (controllerRef.current){
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      switch (location.pathname) {
        case "/":
          jokesIndex(search, setJokesList, controllerRef);
          break;
        case "/saved":
          savedJokesIndex(setJokesList);
          break;
      }

    } catch (e) {
      console.log(e);
    }
  }, [location, search])


  const renderJokesList = () => {
    if (!jokesList) return <p className="mt-16">Loading...</p>;

    if (jokesList.length == 0) return <p className="mt-16">Aucune blague ou utilisateur ne correspond (pour l'instant) à cette recherche</p>;

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
