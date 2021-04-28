import React, {useState} from 'react';

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
  const [jokeOpen, setJokeOpen] = useState(true);
  const openJoke = () => setJokeOpen(true);


  const renderJokeShow = () => {
    if (!jokeOpen) return null;

    return <JokeShow joke={joke} setJokeOpen={setJokeOpen} setJokesList={setJokesList}/>;
  }

  return (
    <div className="joke shadow-sm">
      <div className="joke-author flex items-center">
        <img src={defaultAvatar} alt="default" className="w-10"/>
        <p className="ml-2">{joke.author}</p>
      </div>
      <div className="joke-content cursor-pointer" onClick={openJoke}>
        <p>{joke.content}</p>
      </div>

      <div className="joke-likes">
        {joke.likes} personnes ont ri à cette blague
        <a href="https://www.facebook.com/sharer/sharer.php?u=example.org" target="_blank">
          Share on Facebook
        </a>
      </div>
      <JokeReaction joke={joke} setJokesList={setJokesList} isSmall={false}/>
      <div className="joke-translations-link cursor-pointer" onClick={openJoke}>
        Voir les traductions
      </div>

      {renderJokeShow()}

    </div>
  );
}
