import React, { useState, useContext } from 'react';

import {IsConnectedContext} from '../contexts/IsConnectedContext';
import {JokeObject} from './joke';
import {LanguageSelect, languageOption} from './language_select';


interface Props {
  setJokesList: React.Dispatch<React.SetStateAction<JokeObject[]>>;
}

export default function JokeForm({setJokesList}: Props): JSX.Element {
  const isConnected = useContext(IsConnectedContext);

  const [contentValue, setContentValue] = useState('');
  const [language, setLanguage] = useState<languageOption>();
  //const [category, setCategory] = useState('');

  const handleChange = (e) => {
    setContentValue(e.target.value);
    textAreaAdjust(e.target);
  };

  const addNewJokeToState = (joke) => {
    console.log(joke);
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

  const submitJoke = (joke, callback) => {
    const url = '/api/v1/jokes';
    const csrfMetaTag: HTMLMetaElement = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfMetaTag.content;
    const body = { joke }; // ES6 destructuring
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin',
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(callback);
  }

  const textAreaAdjust = (element) => {
    element.style.height = "1px";
    element.style.height = (0 + element.scrollHeight)+"px";
  }

  if (!isConnected) return null;

  return (
    <form onSubmit={handleSubmit} className="p-5 mb-4 bg-white border border-gray-300 rounded shadow-sm flex flex-col" >
      <textarea
        name="content"
        id="content"
        cols= {30}
        rows= {1}
        value={contentValue}
        placeholder="Une petite blague à nous raconter?"
        className= "resize-none w-full h-10 px-2 py-2 shadow-sm border border-gray-200 rounded focus:ring focus:ring-yellow-400 focus:ring-opacity-50 focus:border-yellow-500"
        onChange={handleChange}/>
      <div className="flex flex-col sm:flex-row mt-3 items-center sm:justify-between">
        <LanguageSelect language={language} setLanguage={setLanguage}/>
        <button type="submit" className="mt-3 sm:mt-0 px-3 py-2 bg-blue-600 text-white rounded hover:bg-yellow-600 transition duration-200 ease-in-out">Soumettre</button>
      </div>
    </form>
  );
}
