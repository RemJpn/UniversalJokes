import React from 'react';

import NavItems from './nav_items';
import {Joke, JokeObject} from './joke';


interface Props {
  jokesList: JokeObject[];
  setJokesList: React.Dispatch<React.SetStateAction<JokeObject[]>>;
}

export default function NavBar({jokesList, setJokesList}: Props) : JSX.Element {
  return (
    <div className="flex justify-between items-center h-16 px-4 py-2 bg-yellow-600">
      <a className="navbar-brand text-white py-0" href="#">
          <span style={{fontFamily: 'Dancing Script'}}>Universal</span>
          <span style={{fontFamily: 'Orelega One'}}>JOKES</span>
      </a>


      <NavItems  jokesList={jokesList} setJokesList={setJokesList}/>
    </div>
  );
}
