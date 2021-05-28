import React, {useContext} from 'react';

import {JokeObject} from '../api/JokeAPI';
import {TranslationObject} from '../api/TranslationAPI';
import {deleteJoke} from '../api/JokeAPI';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {JokesListContext} from '../contexts/JokesListContext';


interface Props {
  element: JokeObject | TranslationObject;
}

const DeleteIcon = ({element}: Props): JSX.Element => {
  const currentUser = useContext(CurrentUserContext);
  const {jokesList, setJokesList} = useContext(JokesListContext);

  const isJoke = element["joke_id"] == undefined; //Check if element is a Joke or a translation

  const removeJokeFromState = (deletedJokeId) => {
    setJokesList(jokesList.filter(joke => joke.id != deletedJokeId))
  }

  const handleClick = () => {
    if (isJoke){
      deleteJoke(element.id, (data) => {
        console.log(data)
        removeJokeFromState(data.deleted_joke_id)
      });
    }
  }

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
