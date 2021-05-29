import React, {useContext} from 'react';

import {JokeObject, deleteJoke} from '../api/JokeAPI';
import {TranslationObject, deleteTranslation} from '../api/TranslationAPI';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {JokesListContext} from '../contexts/JokesListContext';
import {JokeContext} from '../contexts/JokeContext';


interface Props {
  element: JokeObject | TranslationObject;
}

const DeleteIcon = ({element}: Props): JSX.Element => {
  const currentUser = useContext(CurrentUserContext);
  const {jokesList, setJokesList} = useContext(JokesListContext);
  const {setJoke} = useContext(JokeContext);

  const isJoke = element["joke_id"] == undefined; //Check if element is a Joke or a translation

  const removeJokeFromState = (data) => {
    setJokesList(jokesList.filter(joke => joke.id != data.deleted_joke_id))
  }

  const handleClick = () => {
    if (isJoke){
      deleteJoke(element.id, removeJokeFromState);
    } else {
      //if translation
      deleteTranslation(element.id, setJoke);
    }
  }

  // do not display on joke if user arrived directly on JokeShowUrl
  if (isJoke && jokesList.length == 0) return null;

  // do not display if user does not own
  if (!currentUser.authenticated || currentUser.id!=element.author_id) return null;

  return (
    <i className="fas fa-trash-alt
                  mr-4 cursor-pointer
                  text-gray-300 hover:text-yellow-700
                  transition duration-200 ease-out"
       onClick={handleClick}
    ></i>
  );
}

export default DeleteIcon;
