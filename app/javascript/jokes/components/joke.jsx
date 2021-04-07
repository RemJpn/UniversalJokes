import React from 'react';

export default function Joke({joke}) {
  return (
    <div className="joke">
      <div className="joke-author">
        {joke.author}
      </div>
      <div className="joke-content">
        <p>{joke.content}</p>
      </div>
      <div className="joke-reactions">
        {joke.likes} personnes ont ri à cette blague
      </div>
    </div>
  );
}
