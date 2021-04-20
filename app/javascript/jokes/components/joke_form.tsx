import React, { useState, useContext } from 'react';

import {IsConnectedContext} from '../contexts/IsConnectedContext';

export default function JokeForm({setJokesList}) {
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
    setJokesList(prev => [...prev, joke ]);
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
    const promise = fetch(url, {
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
    <form onSubmit={handleSubmit} className="channel-editor joke_form" >
      <textarea
        name="content"
        id="content"
        cols= {30}
        rows= {1}
        value={contentValue}
        className="form-control"
        onChange={handleChange}/>
      <button type="submit">Send</button>
    </form>
  );
}
