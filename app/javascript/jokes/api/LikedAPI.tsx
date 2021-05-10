import {JokeObject} from './JokeAPI';

const createLike = (jokeId: number, setJoke: (joke:JokeObject)=> void): void => {
  const url = `/api/v1/jokes/${jokeId}/liked_jokes`;
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

const deleteLike = (likedId: number, setJoke: (joke:JokeObject)=> void): void => {
 const url = `/api/v1/liked_jokes/${likedId}`;
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

export {createLike, deleteLike}
