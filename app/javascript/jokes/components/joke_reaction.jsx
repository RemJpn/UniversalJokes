import React from 'react';

export default function JokeReaction({joke}) {
  const handleLike = () => {
    console.log(`liking...${joke.id}`);
    console.log(joke);
  }

  const handleSave = () => {
    console.log('saving...');
  }

  // const renderLike = () => {
  //   if (joke)
  // }

  return (
    <div>
      <i className="far fa-grin-squint-tears" onClick={handleLike} ></i>
      <i className="far fa-save" onClick={handleSave} ></i>
    </div>
  );
}
