import React, { useState, useEffect, useContext } from 'react';

import {LanguageSelect} from './language_select';
import {JokeObject} from '../api/JokeAPI';
import {fetchLiberTrans, submitTranslation} from '../api/TranslationAPI';
import tailSpin from 'images/tail-spin.svg';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

interface Props {
  joke: JokeObject;
  setJoke: React.Dispatch<React.SetStateAction<JokeObject>>;
}

interface languageOption {
  value: string;
  icon: string;
  label: string;
}

export default function TranslationForm({joke, setJoke}: Props): JSX.Element {
  const currentUser = useContext(CurrentUserContext);
  const [contentValue, setContentValue] = useState('');
  const [language, setLanguage] = useState<languageOption>();

  const contentInput = document.getElementById(`content-${joke.id}`);

  const handleChange = (e) => {
    setContentValue(e.target.value);
    textAreaAdjust(e.target);
  };

  const toggleAutoBtn = () => {
    if (currentUser.authenticated){
      const autoBtn = document.getElementById(`autoBtn-${joke.id}`) as HTMLInputElement;
      const lightActiveClasses = ['bg-indigo-300', 'shadow-sm', 'hover:bg-yellow-500'];

      if (language) {
        autoBtn.disabled = false;
        autoBtn.classList.add(...lightActiveClasses);
        autoBtn.classList.remove('bg-gray-300');
      } else {
        autoBtn.disabled = true;
        autoBtn.classList.remove(...lightActiveClasses);
        autoBtn.classList.add('bg-gray-300');
      }
    }
  }
  useEffect(() => toggleAutoBtn(), [language]);

  const toggleSendBtn = () => {
    if (currentUser.authenticated){
      const sendBtn = document.getElementById(`send-${joke.id}`) as HTMLInputElement;
      const darkActiveClasses = ['bg-indigo-900', 'shadow-sm', 'hover:bg-yellow-900'];

      if (language && contentValue) {
        sendBtn.classList.add(...darkActiveClasses);
        sendBtn.classList.remove('bg-gray-300');
        sendBtn.disabled=false;
      } else {
        sendBtn.disabled = true;
        sendBtn.classList.remove(...darkActiveClasses);
        sendBtn.classList.add('bg-gray-300');
      }
    }
  }
  useEffect(() => toggleSendBtn(), [language, contentValue]);

  const textAreaAdjust = (element) => {
    element.style.height = "1px";
    element.style.height = (2 + element.scrollHeight)+"px";
  }

  const addNewJokeToState = (joke) => {
    setJoke(joke);
    setContentValue('');
    textAreaAdjust(contentInput);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contentValue) {
      const translation = {
        content: contentValue,
        language: language.value
      };
      submitTranslation(joke.id, translation, addNewJokeToState);
    }
  }

  //get automatic translation
  const autoTrans = (e) => {
    e.preventDefault(); //prevent doing 'submit' after clicking
    const autoBtn = document.getElementById(`autoBtn-${joke.id}`);
    const loader = document.getElementById(`loader-${joke.id}`);
    loader.classList.remove('hidden');
    autoBtn.classList.add('hidden');

    const handleAutoTrans = (data) => {
      console.log(data);
      setContentValue(data.translatedText);
      textAreaAdjust(contentInput);
      autoBtn.classList.remove('hidden');
      loader.classList.add('hidden');
    }

    fetchLiberTrans(joke, language.value, handleAutoTrans);
  }

  if (!currentUser.authenticated) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-300 px-4 py-3 shadow-sm rounded-md mt-2 mb-2" >

      <LanguageSelect language={language} setLanguage={setLanguage} />

      <textarea
        name="content"
        id={`content-${joke.id}`}
        cols= {30}
        rows= {1}
        value={contentValue}
        className="w-full h-10 px-2 py-2 shadow-sm border border-gray-200 rounded focus:ring focus:ring-yellow-400 focus:ring-opacity-50 focus:border-yellow-500 resize-none mt-2"
        onChange={handleChange}/>
      <div className="flex justify-between items-center mt-2">
        <button id={`autoBtn-${joke.id}`} onClick={autoTrans} className="bg-gray-300 text-white rounded-md px-4 py-2 text-sm transition duration-200">Auto</button>
        <img id={`loader-${joke.id}`} src={tailSpin} alt="loading" className="h-6 hidden"/>
        <button id={`send-${joke.id}`} type="submit" className="bg-gray-300 text-white rounded-md px-4 py-2 text-sm transition duration-200">Envoyer</button>
      </div>
    </form>
  );
}
