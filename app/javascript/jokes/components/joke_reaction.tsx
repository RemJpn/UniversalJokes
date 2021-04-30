import React, {useContext} from 'react';
import {emojify} from 'react-emojione';

import {IsConnectedContext} from '../contexts/IsConnectedContext';
import {JokeObject} from './joke';

interface Props {
  joke: JokeObject;
  isSmall: boolean;
  updateJokeList: (updatedJoke: JokeObject) => void;
}

export default function JokeReaction({joke, updateJokeList, isSmall}: Props): JSX.Element {
  const isConnected = useContext(IsConnectedContext);

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

  const renderLike = () => {
    if (!isConnected) return null;

    if (isSmall) {
      return (
        <div onClick={toggleLike} className={joke.liked_id ? '' : 'isInactive'} >
          <span className={joke.liked_id ? '' : 'slanted'}>{emojify('🤣')}</span>
        </div>
      );
    } else {
      return (
        <div onClick={toggleLike} className={`group transition duration-200 ease-out ${joke.liked_id ? '' : 'isInactive'}`} >
          <span className={joke.liked_id ? '' : 'slanted'}>{emojify('🤣')}</span>
          <p className=" group-hover:text-yellow-700 hidden sm:block">J'ai ri</p>
        </div>
      );
    }
  }

  const renderSave = () => {
    if (!isConnected) return null;

    if (isSmall) {
      return (
        <div onClick={toggleSave} className={joke.saved_id ? '' : 'isInactive'} >
          {emojify('💾')}
        </div>
      );
    } else {
      return (
        <div onClick={toggleSave} className={`group transition duration-200 ease-out ${joke.saved_id ? '' : 'isInactive'}`} >
          {emojify('💾')}
          <p className=" group-hover:text-yellow-700 hidden sm:block">{joke.saved_id ? 'Enregistrée' : 'Enregistrer'}</p>
        </div>
      );
    }
  }

  const renderShare = () => {
    if (isSmall) {
      return (
        <a href="https://www.facebook.com/sharer/sharer.php?u=example.org"
           target="_blank"
           className="h-8 w-8 text-center text-gray-600 hover:text-yellow-700 transition duration-200 ease-out">
          <i className="fas fa-share-alt text-2xl"></i>
        </a>
      );
    } else {
      return (
        <a href="https://www.facebook.com/sharer/sharer.php?u=example.org"
           target="_blank"
           className="hover:no-underline"
           >
          <div className="group flex h-8 transition duration-200 ease-out hover:text-yellow-700">
            <i className="fas fa-share-alt text-2xl text-gray-600 group-hover:text-yellow-700"></i>
            <p className="ml-2 opacity-50 hidden sm:block">Partager</p>
          </div>
        </a>
      );
    }
  }

  return (
    <div className="joke-reaction">
      {renderLike()}
      {renderSave()}
      {renderShare()}
    </div>
  );
}
