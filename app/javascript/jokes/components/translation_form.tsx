import React, { useState, useContext } from 'react';

import {IsConnectedContext} from '../contexts/IsConnectedContext';
import {JokeObject} from './joke';

interface Props {
  joke: JokeObject;
}

export default function JokeForm({joke}: Props): JSX.Element {
  const isConnected = useContext(IsConnectedContext);

  const [contentValue, setContentValue] = useState('');
  //const [language, setLanguage] = useState('');

  const handleChange = (e) => {
    setContentValue(e.target.value);
    textAreaAdjust(e.target);
  };

  const textAreaAdjust = (element) => {
    element.style.height = "1px";
    element.style.height = (2 + element.scrollHeight)+"px";
  }

  const addNewJokeToState = (joke) => {
    console.log(joke);
    // setJokesList(prev => [joke, ...prev]);
    setContentValue('');
    textAreaAdjust(document.getElementById('content'));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contentValue) {
      const translation = {
        content: contentValue
      };
      submitTranslation(translation, addNewJokeToState);
    }
  }

  const submitTranslation = (joke, callback) => {
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


  if (!isConnected) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 px-4 py-2 shadow-sm rounded-md" >
      <select name="language" id="language">
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
