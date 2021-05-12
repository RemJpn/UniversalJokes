import React from 'react';

import {TranslationObject} from '../api/TranslationAPI';

import {languageOptions} from './language_select';
import defaultAvatar from 'images/avatar.png';


interface Props {
  translation: TranslationObject
}

export function Translation({translation}: Props): JSX.Element {

  return (
    <div className="bg-white px-4 py-3 rounded-md border border-gray-200 shadow-sm mt-2">
      <div className="flex justify-between items-center mr-2">
        <div className="flex items-center">
          <img src={defaultAvatar} alt="default" className="w-8"/>
          <p className="ml-2 text-sm font-bold">{translation.author}</p>
        </div>
        <div>
          {
            languageOptions
              .find(option => option.value == translation.language)
              .icon
          }
        </div>
      </div>
      <div className="text-sm mt-2">
        <p>{translation.content}</p>
      </div>
    </div>

  );
}
