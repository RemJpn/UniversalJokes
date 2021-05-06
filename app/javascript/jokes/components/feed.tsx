import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';


import {Joke, JokeObject} from './joke';
import JokeForm from './joke_form';


interface Props {
  jokesList: JokeObject[];
  setJokesList: React.Dispatch<React.SetStateAction<JokeObject[]>>;
}

export default function Feed({jokesList, setJokesList}: Props): JSX.Element {
  const location = useLocation();

  // const jokesIndex = () => {
  //   const url = '/api/v1/jokes';
  //   fetch(url, { credentials: "same-origin" })
  //     .then(r => r.json())
  //     .then(data => setJokesList(data));
  // };

  // const savedJokesIndex = () => {
  //   const url = '/api/v1/saved_jokes';
  //   fetch(url, { credentials: "same-origin" })
  //     .then(r => r.json())
  //     .then(data => setJokesList(data));
  // };

  // useEffect( () => {

  // });




  const renderJokesList = () => {
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
