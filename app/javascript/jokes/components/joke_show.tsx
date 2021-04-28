import React from 'react';

import {JokeObject} from './joke';
import JokeReaction from './joke_reaction';
import {Translation} from './translation';

import defaultAvatar from 'images/avatar.png';

interface Props {
  joke: JokeObject;
  setJokeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setJokesList: React.Dispatch<React.SetStateAction<JokeObject[]>>;
}

export default function JokeShow({joke, setJokeOpen, setJokesList}: Props): JSX.Element {
  const closeJoke =() => setJokeOpen(false);

  const renderTranslations = () => {
    return (
      joke.translations.map(translation => {
        return <Translation translation={translation} />
      })
    )
  }

  return (
    <div className="w-screen h-screen fixed inset-0 flex bg-red-900 z-50">
      <div className="w-1/2 flex flex-col items-center p-4">
        <div className="flex items-center self-start" onClick={closeJoke}>
          <i className="fas fa-arrow-left text-white cursor-pointer" ></i>
          <h1 className="text-3xl text-shadow text-white ml-8 cursor-pointer">
              <span style={{fontFamily: 'Dancing Script'}}>Universal</span>
              <span style={{fontFamily: 'Orelega One'}}>JOKES</span>
          </h1>
        </div>
        <div className="bg-white w-3/4 px-4 py-3 rounded-md border border-gray-200 shadow mt-16">
          <div className="flex items-center">
            <img src={defaultAvatar} alt="default" className="w-10"/>
            <p className="ml-2 font-bold">{joke.author}</p>
          </div>
          <div className="text-sm cursor-pointer mt-3">
            <p>{joke.content}</p>
          </div>
          <div className="text-gray-400 mt-4">
            {joke.likes} personnes ont ri à cette blague
          </div>
        </div>

        <div className="bg-gray-100 w-1/2 rounded-full mt-2">
          <JokeReaction joke={joke} setJokesList={setJokesList} isSmall={true}/>
        </div>

      </div>

      <div className="w-1/2 bg-white p-4 flex flex-col">
        <h2 className="text-lg font-bold">Translations</h2>
        <button className="bg-indigo-300 rounded-md shadow-sm px-4 py-2 text-sm text-white self-center mt-6">Proposer une traduction</button>

        {renderTranslations()}


      </div>
    </div>
  );
}
