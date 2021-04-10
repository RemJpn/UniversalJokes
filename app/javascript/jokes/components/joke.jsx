import React from 'react';

import JokeReaction from './joke_reaction';

export default function Joke({joke, setJokesList}) {

  return (
    <div className="joke">
      <div className="joke-author">
        {joke.author}
      </div>
      <div className="joke-content">
        <p>{joke.content}</p>
      </div>

      <div className="">
        {joke.likes} personnes ont ri à cette blague
        <a href="https://www.facebook.com/sharer/sharer.php?u=example.org" target="_blank">
          Share on Facebook
        </a>
      </div>
      <JokeReaction joke={joke} setJokesList={setJokesList} />
      <div className="">
        <a href="#">Voir les traductions</a>
      </div>

    </div>
  );
}
