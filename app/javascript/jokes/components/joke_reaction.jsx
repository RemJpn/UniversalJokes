import React, {useState} from 'react';

export default function JokeReaction({joke, setJokesList}) {
  const updateJokeList = (updatedJoke) => {
    setJokesList(prev => {
      const jokeIndex = prev.findIndex(prevjoke => prevjoke.id == updatedJoke.id);
      const newList = [...prev];
      newList[jokeIndex] = updatedJoke;
      return newList;
    });
  }

  const createLike = () => {
    const url = `/api/v1/jokes/${joke.id}/liked_jokes`;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
    const promise = fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(updateJokeList);
  }

  const deleteLike = () => {
   const url = `/api/v1/liked_jokes/${joke.liked_id}`;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
    const promise = fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(updateJokeList);
  }

  const toggleLike = () => {
    console.log(`liking...${joke.id}`);
    console.log(joke)
    joke.liked_id ? deleteLike() : createLike();
  }

  const handleSave = () => {
    console.log('saving...');
  }

  const renderLike = () => {
    if (joke.liked_id){
      // solid
      return <i className="fas fa-grin-squint-tears" onClick={toggleLike} ></i>
    } else {
      // regular
      return <i className="far fa-grin-squint-tears" onClick={toggleLike} ></i>
    }
  }

  return (
    <div>
      {renderLike()}
      <i className="far fa-save" onClick={handleSave} ></i>
    </div>
  );
}
