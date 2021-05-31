import React from 'react';

import AuthorBanner from './author_banner';
import {TranslationObject} from '../api/TranslationAPI';


interface Props {
  translation: TranslationObject
}

export function Translation({translation}: Props): JSX.Element {

  return (
    <div className="bg-white px-4 py-3 rounded-md border border-gray-200 shadow-sm mt-2">
      <AuthorBanner element={translation}/>

      <div className="whitespace-pre-wrap text-sm mt-2 ml-2">
        <p>{translation.content}</p>
      </div>
    </div>

  );
}
