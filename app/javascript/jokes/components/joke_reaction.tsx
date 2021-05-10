import React, {useContext} from 'react';
import {emojify} from 'react-emojione';

import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {JokeObject} from '../api/JokeAPI';
import {createLike, deleteLike} from '../api/LikedAPI';
import {createSaved, deleteSaved} from '../api/SavedAPI';


interface Props {
  joke: JokeObject;
  setJoke?: (joke: JokeObject) => void;
  isSmall: boolean;
}

export default function JokeReaction({joke, setJoke, isSmall}: Props): JSX.Element {
  const currentUser = useContext(CurrentUserContext);
  const jokeUrl = `http://universaljokes.herokuapp.com/jokes/${joke.id}`;

  const toggleLike = () => {
    console.log(`liking...${joke.id}`);
    console.log(joke)
    joke.liked_id ? deleteLike(joke.liked_id, setJoke) : createLike(joke.id, setJoke);
  }

  const toggleSave = () => {
    console.log('save id =', joke.saved_id);
    joke.saved_id ? deleteSaved(joke.saved_id, setJoke) : createSaved(joke.id, setJoke);
  }

  //Buttons Conditional formatting
  const likeIconClass = `
    cursor-pointer
    ${joke.liked_id ? '' : 'isInactive'}
    ${isSmall ? '' : 'group transition duration-200 ease-out'}
  `;
  const saveIconClass = `
    cursor-pointer
    ${joke.saved_id ? '' : 'isInactive'}
    ${isSmall ? '' : 'group transition duration-200 ease-out'}
  `;
  const textClass = `
    ${isSmall ? 'hidden' : 'group-hover:text-yellow-700 hidden sm:block' }
  `;
  const shareTextClass = `
    ${isSmall ? 'hidden' : 'ml-2 opacity-50 hidden sm:block' }
  `;


  const renderLike = () => {
    if (!currentUser.authenticated) return null;

    return (
      <div onClick={toggleLike} className={likeIconClass} >
        <span className={joke.liked_id ? '' : 'slanted'}>{emojify('🤣')}</span>
        <p className={textClass}>J'ai ri</p>
      </div>
    );
  }

  const renderSave = () => {
    if (!currentUser.authenticated) return null;

    return (
      <div onClick={toggleSave} className={saveIconClass} >
        {emojify('💾')}
        <p className={textClass}>{joke.saved_id ? 'Enregistrée' : 'Enregistrer'}</p>
      </div>
    );
  }

  const renderShare = () => {
    return (
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${jokeUrl}`}
         target="_blank"
         className="hover:no-underline"
         >
        <div className="group flex h-8 transition duration-200 ease-out hover:text-yellow-700">
          <i className="fas fa-share-alt text-2xl text-gray-600 group-hover:text-yellow-700"></i>
          <p className={shareTextClass}>Partager</p>
        </div>
      </a>
    )
  }

  return (
    <div className="joke-reaction flex justify-evenly my-2">
      {renderLike()}
      {renderSave()}
      {renderShare()}
    </div>
  );
}
