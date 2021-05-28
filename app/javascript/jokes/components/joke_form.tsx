import React, { useState, useContext } from 'react';
import {FormattedMessage} from 'react-intl';

import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {JokesListContext} from '../contexts/JokesListContext';
import {JokeObject, submitJoke} from '../api/JokeAPI';
import {LanguageSelect, languageOption} from './language_select';

// interface Props {
//   setJokesList: React.Dispatch<React.SetStateAction<JokeObject[]>>;
// }

export default function JokeForm(): JSX.Element {
  const currentUser = useContext(CurrentUserContext);
  const {setJokesList} = useContext(JokesListContext);

  const [contentValue, setContentValue] = useState('');
  const [language, setLanguage] = useState<languageOption>();
  //const [category, setCategory] = useState('');

  const handleChange = (e) => {
    setContentValue(e.target.value);
    textAreaAdjust(e.target);
  };

  const addNewJokeToState = (joke) => {
    setJokesList(prev => [joke, ...prev]);
    setContentValue('');
    textAreaAdjust(document.getElementById('content'));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contentValue) {
      const joke = {
        content: contentValue,
        language: language.value
      };
      submitJoke(joke, addNewJokeToState);
    }
  }

  const textAreaAdjust = (element) => {
    element.style.height = "1px";
    element.style.height = (0 + element.scrollHeight)+"px";
  }

  if (!currentUser.authenticated) return null;

  return (
    <form onSubmit={handleSubmit} className="p-5 mb-4 bg-white border border-gray-300 rounded shadow-sm flex flex-col" >
      <FormattedMessage id="joke_form.placeholder">
        {(msg:string) => (
          <textarea
            name="content"
            id="content"
            cols= {30}
            rows= {1}
            value={contentValue}
            placeholder={msg}
            className= "resize-none w-full h-10 px-2 py-2 shadow-sm border border-gray-200 rounded focus:ring focus:ring-yellow-400 focus:ring-opacity-50 focus:border-yellow-500"
            onChange={handleChange}/>
        )}
      </FormattedMessage>
      <div className="flex flex-col sm:flex-row mt-3 items-center sm:justify-between">
        <LanguageSelect language={language} setLanguage={setLanguage}/>
        <button type="submit" className="mt-3 sm:mt-0 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition duration-200 ease-in-out">
          <FormattedMessage id="joke_form.submit" />
        </button>
      </div>
    </form>
  );
}
