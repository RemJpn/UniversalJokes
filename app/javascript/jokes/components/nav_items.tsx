import React, {useContext} from 'react';

import {Joke, JokeObject} from './joke';
import {IsConnectedContext} from '../contexts/IsConnectedContext';

interface Props {
  jokesList: JokeObject[];
  setJokesList: React.Dispatch<React.SetStateAction<JokeObject[]>>;
}

export default function NavItems({jokesList, setJokesList}: Props) : JSX.Element {
  const isConnected = useContext(IsConnectedContext);

  const handleClickSaved = () => {
    const url = '/api/v1/saved_jokes';
    fetch(url, { credentials: "same-origin" })
      .then(r => r.json())
      .then(data => setJokesList(data));

  }


  if (!isConnected){
    return (
      <ul>
        <li>
          <a className="text-yellow-100 hover:text-yellow-900 hover:no-underline transition duration-300" href="/users/sign_in">Login</a>
        </li>
      </ul>
    );
  }

  return (
    <ul className="flex list-none items-center">
      <li className="mr-4">
        <a className="" href="#">
          <i className="fas fa-home text-xl text-yellow-100 hover:text-yellow-900 transition duration-200"></i>
        </a>
      </li>
      <li className="mr-4" onClick={handleClickSaved}>
        <i className="fas fa-heart text-xl text-yellow-100 hover:text-yellow-900 transition duration-200"></i>
      </li>
      <li className="">
        <a href="#">
          <img className="h-10 rounded-full" src="https://kitt.lewagon.com/placeholder/users/ssaunier" />
        </a>
      </li>
    </ul>
  );
}
