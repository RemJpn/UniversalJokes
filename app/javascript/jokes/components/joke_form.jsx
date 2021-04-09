import React, { useState } from 'react';

export default function JokeForm({setJokesList}) {
  const [contentValue, setContentValue] = useState('');
  //const [language, setLanguage] = useState('');
  //const [category, setCategory] = useState('');

  const handleChange = (e) => {
    setContentValue(e.target.value)
  };

  const addNewJokeToState = (joke) => {
    console.log(joke);
    setJokesList(prev => [...prev, joke ]);
    setContentValue('');
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
    const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
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

  return (
    <form onSubmit={handleSubmit} className="channel-editor">
      <input
        type="text"
        name="content"
        className="form-control"
        autoComplete="off"
        value={contentValue}
        onChange={handleChange}
      />

      <button type="submit">Send</button>
    </form>
  );
}
