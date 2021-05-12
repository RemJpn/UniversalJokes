import {JokeObject} from './JokeAPI';

interface DraftTranslation {
  content: string;
  language: string;
}

interface TranslationObject {
  id: number;
  content: string;
  author: string;
  avatar: string;
  language: string;
  created_at: string;
  joke_id: number;
}

interface LiberTransAnswer {
  translatedText: string
}

//GET an automatic translation from libretranslate
const fetchLiberTrans = (joke: JokeObject, language: string, callback: (data: LiberTransAnswer) => void): void => {
  const url = `https://libretranslate.com/translate`;
  const body = {
    q: joke.content,
    source: joke.language,
    target: language
  };
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(callback);
}

const submitTranslation = (
  jokeId: number,
  translation: DraftTranslation,
  callback: (translation: TranslationObject) => void
  ): void =>
{
  const url = `/api/v1/jokes/${jokeId}/translations`;
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

export {TranslationObject, fetchLiberTrans, submitTranslation}
