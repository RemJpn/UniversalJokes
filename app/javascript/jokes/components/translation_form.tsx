import React, { useState, useContext, useEffect } from 'react';
import Select from 'react-select';

import LanguageSelect from './language_select';
import {IsConnectedContext} from '../contexts/IsConnectedContext';
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

const languageOptions: languageOption[] = [
  { value: 'fr', icon: '🇫🇷', label: 'Français' },
  { value: 'en', icon: '🇬🇧', label: 'English' },
  { value: 'es', icon: '🇪🇸', label: 'Español' },
  { value: 'ja', icon: '🇯🇵', label: '日本語' },
];

const getLabel = ({ icon, label }: languageOption): JSX.Element => {
  return (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      <span style={{ fontSize: 18, marginRight: '0.5em' }}>{icon}</span>
      <span style={{ fontSize: 14 }}>{label}</span>
    </div>
  );

}

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 200
  }),
  menu: (provided) => ({
    ...provided,
    width: 200
  })
};

export default function TranslationForm({joke, updateJokeList}: Props): JSX.Element {
  const isConnected = useContext(IsConnectedContext);

  const [contentValue, setContentValue] = useState('');
  const [language, setLanguage] = useState<languageOption>();

  const contentInput = document.getElementById(`content-${joke.id}`);

  const handleChange = (e) => {
    setContentValue(e.target.value);
    textAreaAdjust(e.target);
  };

  const toggleAutoBtn = () => {
    const autoBtn = document.getElementById(`autoBtn-${joke.id}`) as HTMLInputElement;

    if (language) {
      autoBtn.disabled = false;
      autoBtn.classList.add('bg-indigo-300');
      autoBtn.classList.remove('bg-gray-300');
    } else {
      autoBtn.disabled = true;
      autoBtn.classList.remove('bg-indigo-300');
      autoBtn.classList.add('bg-gray-300');
    }
  }
  const toggleSendBtn = () => {
    const sendBtn = document.getElementById(`send-${joke.id}`) as HTMLInputElement;

    if (language && contentValue) {
      sendBtn.classList.add('bg-indigo-600');
      sendBtn.classList.remove('bg-gray-600');
      sendBtn.disabled=false;
    } else {
      sendBtn.disabled = true;
      sendBtn.classList.remove('bg-indigo-600');
      sendBtn.classList.add('bg-gray-600');
    }
  }

  useEffect(() => console.log(language), [language]);
  useEffect(() => toggleAutoBtn(), [language]);
  useEffect(() => toggleSendBtn(), [language, contentValue]);

  const textAreaAdjust = (element) => {
    element.style.height = "1px";
    element.style.height = (2 + element.scrollHeight)+"px";
  }

  const addNewJokeToState = (joke) => {
    console.log(joke);
    updateJokeList(joke);
    // setJokesList(prev => [joke, ...prev]);
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
      source: "fr",
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


  if (!isConnected) return null;

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
        <button id={`autoBtn-${joke.id}`} onClick={fetchTrans} className="bg-gray-300 text-white rounded-md px-4 py-2 text-sm">Auto</button>
        <img id={`loader-${joke.id}`} src={tailSpin} alt="loading" className="h-6 hidden"/>
        <button id={`send-${joke.id}`} type="submit" className="bg-gray-600 text-white rounded-md px-4 py-2 text-sm">Proposer la traduction</button>
      </div>
    </form>
  );
}
