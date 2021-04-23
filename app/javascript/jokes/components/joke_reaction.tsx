import React, {useState, useContext} from 'react';
import {emojify} from 'react-emojione';

import {IsConnectedContext} from '../contexts/IsConnectedContext';
import {JokeObject} from './joke';

interface Props {
  joke: JokeObject;
  setJokesList: React.Dispatch<React.SetStateAction<JokeObject[]>>;
}

export default function JokeReaction({joke, setJokesList}: Props): JSX.Element {
  const isConnected = useContext(IsConnectedContext);

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
   const csrfMetaTag: HTMLMetaElement = document.querySelector('meta[name="csrf-token"]');
   const csrfToken = csrfMetaTag.content;
    fetch(url, {
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
   const csrfMetaTag: HTMLMetaElement = document.querySelector('meta[name="csrf-token"]');
   const csrfToken = csrfMetaTag.content;
    fetch(url, {
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


  const createSaved = () => {
    console.log('saving...');
    const url = `/api/v1/jokes/${joke.id}/saved_jokes`;
    const csrfMetaTag: HTMLMetaElement = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfMetaTag.content;
    fetch(url, {
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

  const deleteSaved = () => {
    console.log('unsaving...');
    const url = `/api/v1/saved_jokes/${joke.saved_id}`;
    const csrfMetaTag: HTMLMetaElement = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfMetaTag.content;
    fetch(url, {
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



  const toggleSave = () => {
    console.log('save id =', joke.saved_id);
    joke.saved_id ? deleteSaved() : createSaved();
  }

  if (!isConnected) return null;

  return (
    <div className="joke-reaction">
      <div onClick={toggleLike} className={joke.liked_id ? '' : 'isInactive'} >
        <span className={joke.liked_id ? '' : 'slanted'}>{emojify('🤣')}</span>
        <p>J'ai ri</p>
      </div>
      <div onClick={toggleSave} className={joke.saved_id ? '' : 'isInactive'} >
        {emojify('💾')}
        <p>{joke.saved_id ? 'Enregistrée' : 'Enregistrer'}</p>
      </div>
    </div>
  );
}
