import {JokeObject} from './JokeAPI';


const savedJokesIndex = (setJokesList: (jokesList: JokeObject[]) => void): void => {
  const url = '/api/v1/saved_jokes';
  fetch(url, { credentials: "same-origin" })
    .then(r => r.json())
    .then(setJokesList);
};

const createSaved = (jokeId: number, setJoke: (joke: JokeObject) =>void ): void => {
  console.log('saving...');
  const url = `/api/v1/jokes/${jokeId}/saved_jokes`;
  const csrfMetaTag: HTMLMetaElement = document.querySelector('meta[name="csrf-token"]');
  const csrfToken = csrfMetaTag.content;
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .then(setJoke);
}

const deleteSaved = (savedId: number, setJoke: (joke: JokeObject) =>void ): void => {
  console.log('unsaving...');
  const url = `/api/v1/saved_jokes/${savedId}`;
  const csrfMetaTag: HTMLMetaElement = document.querySelector('meta[name="csrf-token"]');
  const csrfToken = csrfMetaTag.content;
  fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .then(setJoke);
}

export {savedJokesIndex, createSaved, deleteSaved}
