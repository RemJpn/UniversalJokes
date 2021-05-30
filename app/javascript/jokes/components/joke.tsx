import React, {useState, useEffect} from 'react';
import {FormattedMessage} from 'react-intl';

import AuthorBanner from './author_banner';
import JokeReaction from './joke_reaction';
import JokeShow from './joke_show';
import {JokeObject} from '../api/JokeAPI';
import {JokeContext} from '../contexts/JokeContext';


interface Props{
  joke: JokeObject;
}

export function Joke({joke}: Props): JSX.Element {
  const [thisJoke, setJoke] = useState(joke);
  const [jokeOpen, setJokeOpen] = useState(false);

  const openJoke = () => {
    setJokeOpen(true);
    window.history.pushState({}, "UniversalJokes", `/jokes/${thisJoke.id}`);
  }

  const renderJokeShow = () => {
    if (!jokeOpen) return null;

    return <JokeShow setJokeOpen={setJokeOpen} />;
  }

  useEffect(()=>{
    if (jokeOpen){
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  },[jokeOpen]);

  return (
    <JokeContext.Provider value={{joke: thisJoke, setJoke: setJoke}} >
      <div className="whitespace-pre-wrap bg-white px-4 py-3 rounded-md border border-gray-200 shadow-sm mt-2">
        <AuthorBanner element={thisJoke}/>

        <div className="cursor-pointer mt-3 ml-2" onClick={openJoke}>
          <p>{thisJoke.content}</p>
        </div>

        <div className="text-sm text-gray-400 mt-3">
          <FormattedMessage id="joke.likes" values={{nb_likes: thisJoke.likes}}/>
        </div>

        <JokeReaction isSmall={false}/>

        <div className="text-sm text-blue-900 cursor-pointer hover:underline" onClick={openJoke}>
          <FormattedMessage id="joke.see_translations" values={{nb_translations: thisJoke.translations.length}}/>
        </div>

        {renderJokeShow()}

      </div>
    </JokeContext.Provider>

  );
}
