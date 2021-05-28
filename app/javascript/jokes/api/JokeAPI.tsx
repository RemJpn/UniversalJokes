import {TranslationObject} from '../api/TranslationAPI';


interface DraftJoke {
  language: string;
  content: string;
}

interface JokeObject {
  id: number;
  author: string;
  author_id: number;
  avatar: string;
  language: string;
  category: string;
  content: string;
  likes: number;
  liked_id: number | null;
  saved_id: number | null;
  created_at: string;
  translations: TranslationObject[];
}

const jokesIndex = (
                    search: string,
                    setJokesList: (jokeList: JokeObject[]) => void,
                    controllerRef: React.MutableRefObject<AbortController>
                    ): void => {
  let url = '/api/v1/jokes'
  if (search) {
    url = `/api/v1/jokes/search/${search}`;
  }

  fetch(url, { signal: controllerRef.current?.signal, credentials: "same-origin" })
    .then(r => r.json())
    .then(data=>{
      setJokesList(data);
      controllerRef.current = null;
    })
    .catch(err => {});
};

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

const deleteJoke = (jokeId: number, callback: (data: any) => void):void => {
  const url = `/api/v1/jokes/${jokeId}`;
  const csrfMetaTag: HTMLMetaElement = document.querySelector('meta[name="csrf-token"]');
  const csrfToken = csrfMetaTag.content;
  fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    credentials: "same-origin"
    })
    .then(r => r.json())
    .then(callback)
    .catch((e) => {
      console.log(e);
    });
};


export {JokeObject, jokesIndex, getJoke, submitJoke, deleteJoke}
