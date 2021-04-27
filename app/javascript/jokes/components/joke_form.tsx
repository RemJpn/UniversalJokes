import React, { useState, useContext } from 'react';

import {IsConnectedContext} from '../contexts/IsConnectedContext';
import {JokeObject} from './joke';

interface Props {
  setJokesList: React.Dispatch<React.SetStateAction<JokeObject[]>>;
}

export default function JokeForm({setJokesList}: Props): JSX.Element {
  const isConnected = useContext(IsConnectedContext);

  const [contentValue, setContentValue] = useState('');
  //const [language, setLanguage] = useState('');
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
        content: contentValue
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
    element.style.height = (2 + element.scrollHeight)+"px";
  }

  if (!isConnected) return null;

  return (
    <form onSubmit={handleSubmit} className="channel-editor joke_form shadow-sm" >
      <textarea
        name="content"
        id="content"
        cols= {30}
        rows= {1}
        value={contentValue}
        className="form-control"
        onChange={handleChange}/>
      <button type="submit" className="bg-blue-600 text-white">Send</button>
    </form>
  );
}
