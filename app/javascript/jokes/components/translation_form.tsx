import React, { useState, useEffect } from 'react';

import {LanguageSelect} from './language_select';
import {JokeObject} from './joke';
import tailSpin from 'images/tail-spin.svg';

interface Props {
  joke: JokeObject;
  updateJokeList: (updatedJoke: JokeObject) => void;
}

interface languageOption {
  value: string;
  icon: string;
  label: string;
}

export default function TranslationForm({joke, updateJokeList}: Props): JSX.Element {
  const [contentValue, setContentValue] = useState('');
  const [language, setLanguage] = useState<languageOption>();

  const contentInput = document.getElementById(`content-${joke.id}`);

  const handleChange = (e) => {
    setContentValue(e.target.value);
    textAreaAdjust(e.target);
  };

  const toggleAutoBtn = () => {
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

  const toggleSendBtn = () => {
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

  useEffect(() => toggleAutoBtn(), [language]);
  useEffect(() => toggleSendBtn(), [language, contentValue]);

  const textAreaAdjust = (element) => {
    element.style.height = "1px";
    element.style.height = (2 + element.scrollHeight)+"px";
  }

  const addNewJokeToState = (joke) => {
    updateJokeList(joke);
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
      submitTranslation(translation, addNewJokeToState);
    }
  }

  const submitTranslation = (translation, callback) => {
    const url = `/api/v1/jokes/${joke.id}/translations`;
    const csrfMetaTag: HTMLMetaElement = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfMetaTag.content;
    const body = { translation }; // ES6 destructuring
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

  const fetchTrans = () => {
    const autoBtn = document.getElementById(`autoBtn-${joke.id}`);
    const loader = document.getElementById(`loader-${joke.id}`);
    autoBtn.classList.add('hidden');
    loader.classList.remove('hidden');

    const url = `https://libretranslate.com/translate`;
    const body = {
      q: joke.content,
      source: joke.language,
      target: language.value
    };
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      setContentValue(data.translatedText);
      textAreaAdjust(contentInput);
      autoBtn.classList.remove('hidden');
      loader.classList.add('hidden');
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 px-4 py-3 shadow-sm rounded-md mt-2 mb-2" >

      <LanguageSelect language={language} setLanguage={setLanguage} />

      <textarea
        name="content"
        id={`content-${joke.id}`}
        cols= {30}
        rows= {1}
        value={contentValue}
        className="form-control resize-none mt-2"
        onChange={handleChange}/>
      <div className="flex justify-between items-center mt-2">
        <button id={`autoBtn-${joke.id}`} onClick={fetchTrans} className="bg-gray-300 text-white rounded-md px-4 py-2 text-sm transition duration-200">Auto</button>
        <img id={`loader-${joke.id}`} src={tailSpin} alt="loading" className="h-6 hidden"/>
        <button id={`send-${joke.id}`} type="submit" className="bg-gray-300 text-white rounded-md px-4 py-2 text-sm transition duration-200">Proposer la traduction</button>
      </div>
    </form>
  );
}
