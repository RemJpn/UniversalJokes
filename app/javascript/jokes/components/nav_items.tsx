import React, {useContext} from 'react';

import {Joke, JokeObject} from './joke';
import {IsConnectedContext} from '../contexts/IsConnectedContext';

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function NavItems({setCurrentPage}: Props) : JSX.Element {
  const isConnected = useContext(IsConnectedContext);

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
      <li className="mr-4 cursor-pointer" onClick={() => setCurrentPage('jokesIndex')}>
         <i className="fas fa-home text-xl text-yellow-100 hover:text-yellow-900 transition duration-200 text-shadow"></i>
      </li>
      <li className="mr-4 cursor-pointer" onClick={() => setCurrentPage('savedJokesIndex')}>
        <i className="fas fa-heart text-xl text-yellow-100 hover:text-yellow-900 transition duration-200 text-shadow"></i>
      </li>
      <li className="">
        <a href="#">
          <img className="h-10 rounded-full" src="https://kitt.lewagon.com/placeholder/users/ssaunier" />
        </a>
      </li>
    </ul>
  );
}
