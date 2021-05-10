import {TranslationObject} from '../components/translation';


interface DraftJoke {
  language: string;
  content: string;
}

interface JokeObject {
  id: number;
  author: string;
  language: string;
  category: string;
  content: string;
  likes: number;
  liked_id: number | null;
  saved_id: number | null;
  created_at: string;
  translations: TranslationObject[];
}

const getJoke = (jokeId: number, callback: (joke: JokeObject) => void):void => {
  const url = `/api/v1/jokes/${jokeId}`;
  fetch(url, { credentials: "same-origin" })
    .then(r => r.json())
    .then(callback)
    .catch(() => {
      window.location.href = "/"
    });
};

const submitJoke = (joke: DraftJoke, callback: (joke: JokeObject) => void): void => {
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

export {JokeObject, getJoke,submitJoke}
