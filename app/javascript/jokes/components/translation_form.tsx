import React, { useState, useContext } from 'react';

import {IsConnectedContext} from '../contexts/IsConnectedContext';
import {JokeObject} from './joke';

interface Props {
  joke: JokeObject;
  updateJokeList: (updatedJoke: JokeObject) => void;
}

export default function TranslationForm({joke, updateJokeList}: Props): JSX.Element {
  const isConnected = useContext(IsConnectedContext);

  const [contentValue, setContentValue] = useState('');
  const [language, setLanguage] = useState('');

  const handleChange = (e) => {
    switch(e.target.id) {
      case "language":
        setLanguage(e.target.value);
        break;
      case "content":
        setContentValue(e.target.value);
        textAreaAdjust(e.target);
        break;
    }
  };

  const textAreaAdjust = (element) => {
    element.style.height = "1px";
    element.style.height = (2 + element.scrollHeight)+"px";
  }

  const addNewJokeToState = (joke) => {
    console.log(joke);
    updateJokeList(joke);
    // setJokesList(prev => [joke, ...prev]);
    setContentValue('');
    textAreaAdjust(document.getElementById('content'));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contentValue) {
      const translation = {
        content: contentValue,
        language: language
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


  if (!isConnected) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 px-4 py-2 shadow-sm rounded-md mt-8 mb-4" >
      <select name="language" id="language" onChange={handleChange}>
        <option value="">Choisir la langue</option>
        <option value="Français">Français</option>
        <option value="English">English</option>
        <option value="Español">Español</option>
        <option value="日本語">日本語</option>
      </select>
      <textarea
        name="content"
        id="content"
        cols= {30}
        rows= {1}
        value={contentValue}
        className="form-control"
        onChange={handleChange}/>
      <button type="submit" className="bg-indigo-600 text-white rounded-md mt-2 px-4 py-2 text-sm">Proposer la traduction</button>
    </form>
  );
}
