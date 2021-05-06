import React, {useState, useEffect} from 'react';

import JokeReaction from './joke_reaction';
import JokeShow from './joke_show';
import defaultAvatar from 'images/avatar.png';

export interface JokeObject {
  id: number;
  author: string;
  language: string;
  category: string;
  content: string;
  likes: number;
  liked_id: number | null;
  saved_id: number | null;
  created_at: string;
  translations: TranslationObject[];
}

interface TranslationObject {
  id: number;
  content: string;
  author: string;
  language: string;
  created_at: string;
  joke_id: number;
}

interface Props {
  joke: JokeObject;
  setJokesList: React.Dispatch<React.SetStateAction<JokeObject[]>>;
}

export function Joke({joke, setJokesList}: Props): JSX.Element {
  const [thisJoke, setJoke] = useState(joke);
  const [jokeOpen, setJokeOpen] = useState(false);
  const openJoke = () => {
    setJokeOpen(true);
    window.history.pushState({}, "UniversalJokes", `/jokes/${thisJoke.id}`);
  }

  const updateJokeList = (updatedJoke: JokeObject) => {
    console.log('updating jokeList')
    setJokesList(prev => {
      const jokeIndex = prev.findIndex(prevjoke => prevjoke.id == updatedJoke.id);
      const newList = [...prev];
      newList[jokeIndex] = updatedJoke;
      return newList;
    });
  }

  const renderJokeShow = () => {
    if (!jokeOpen) return null;

    return <JokeShow joke={thisJoke} setJoke={setJoke} setJokeOpen={setJokeOpen} />;
  }

  useEffect(()=>{
    if (jokeOpen){
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  },[jokeOpen]);

  return (
    <div className="whitespace-pre-wrap bg-white px-4 py-3 rounded-md border border-gray-200 shadow-sm mt-2">
      <div className="flex items-center font-bold">
        <img src={defaultAvatar} alt="default" className="w-10"/>
        <p className="ml-2">{thisJoke.author}</p>
      </div>
      <div className="text-sm cursor-pointer mt-3 ml-2" onClick={openJoke}>
        <p>{thisJoke.content}</p>
      </div>

      <div className="text-gray-400 mt-3">
        {thisJoke.likes} personnes ont ri à cette blague
      </div>
      <JokeReaction joke={thisJoke} setJoke={setJoke} isSmall={false}/>
      <div className="cursor-pointer" onClick={openJoke}>
        Voir les traductions ({thisJoke.translations.length})
      </div>

      {renderJokeShow()}

    </div>
  );
}
