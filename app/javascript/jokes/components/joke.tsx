import React from 'react';

import JokeReaction from './joke_reaction';

export interface JokeObject {
  id: number;
  author: string;
  language: string;
  category: string;
  content: string;
  likes: number;
  liked_id: number | null;
  created_at: string;
}

interface Props {
  joke: JokeObject;
  setJokesList: React.Dispatch<React.SetStateAction<JokeObject[]>>;
}

export function Joke({joke, setJokesList}: Props) {

  return (
    <div className="joke">
      <div className="joke-author">
        {joke.author}
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
