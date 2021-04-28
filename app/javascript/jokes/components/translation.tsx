import React from 'react';

import defaultAvatar from 'images/avatar.png';


export interface TranslationObject {
  id: number;
  content: string;
  author: string;
  language: string;
  created_at: string;
  joke_id: number;
}

interface Props {
  translation: TranslationObject
}

export function Translation({translation}: Props): JSX.Element {

  return (
    <div className="bg-white px-4 py-3 rounded-md border border-gray-200 shadow mt-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={defaultAvatar} alt="default" className="w-8"/>
          <p className="ml-2 text-sm font-bold">{translation.author}</p>
        </div>
        <p className="text-gray-400">
          {translation.language}
        </p>
      </div>
      <div className="text-sm cursor-pointer mt-2">
        <p>{translation.content}</p>
      </div>
    </div>

  );
}
