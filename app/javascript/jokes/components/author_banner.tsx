import React from 'react';

import {languageOptions} from './language_select';
import {JokeObject} from '../api/JokeAPI';
import {TranslationObject} from '../api/TranslationAPI';


interface Props {
  element: JokeObject | TranslationObject;
}

const AuthorBanner = ({element}: Props): JSX.Element => {
  const isJoke = element["joke_id"] == undefined; //Check if element is a Joke or a translation

  return (
    <div className="flex justify-between items-center mr-2">
      <div className="flex items-center font-bold">
        <img
          src={element.avatar}
          alt="avatar"
          className={`object-cover rounded-full ${isJoke ? 'w-10 h-10' : 'w-8 h-8'}`}
        />
        <p className={`ml-2 ${isJoke ? '' : 'text-sm'}`}>{element.author}</p>
      </div>
      <div>
        {
          languageOptions
            .find(option => option.value == element.language)
            .icon
        }
      </div>
    </div>

  );
}

export default AuthorBanner;
