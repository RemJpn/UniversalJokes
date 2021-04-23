import React from 'react';

import JokeReaction from './joke_reaction';
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
}

interface Props {
  joke: JokeObject;
  setJokesList: React.Dispatch<React.SetStateAction<JokeObject[]>>;
}

export function Joke({joke, setJokesList}: Props): JSX.Element {

  return (
    <div className="joke shadow-sm">
      <div className="joke-author flex items-center">
        <img src={defaultAvatar} alt="default" className="w-10"/>
        <p className="ml-2">{joke.author}</p>
      </div>
      <div className="joke-content">
        <p>{joke.content}</p>
      </div>

      <div className="joke-likes">
        {joke.likes} personnes ont ri à cette blague
        <a href="https://www.facebook.com/sharer/sharer.php?u=example.org" target="_blank">
          Share on Facebook
        </a>
      </div>
      <JokeReaction joke={joke} setJokesList={setJokesList} />
      <div className="joke-translations-link">
        <a href="#">Voir les traductions</a>
      </div>

    </div>
  );
}
