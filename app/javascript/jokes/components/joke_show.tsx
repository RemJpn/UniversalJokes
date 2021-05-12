import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import AuthorBanner from './author_banner';
import JokeReaction from './joke_reaction';
import TranslationForm from './translation_form';
import {Translation} from './translation';
import {JokeObject} from '../api/JokeAPI';
import {languageOption, LanguageSelect} from './language_select';


interface Props {
  joke: JokeObject;
  setJoke: React.Dispatch<React.SetStateAction<JokeObject>>;
  setJokeOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isFromUrl?: boolean;
}

export default function JokeShow({joke, setJoke, setJokeOpen = null, isFromUrl=false, ...props}: Props): JSX.Element {
  const [languageFilter, setLanguageFilter] = useState<languageOption>();
  const closeJoke =() => {
    setJokeOpen(false);
    window.history.pushState({}, "UniversalJokes", `/`);
  }

  const renderTranslations = (): JSX.Element => {
    const filteredTrans = languageFilter ?
        joke.translations.filter(trans => trans.language == languageFilter.value)
        : joke.translations;

    if (filteredTrans.length === 0){
      return (
        <p className="text-center mt-8">
          Aucune traduction n'as encore été proposée dans cette langue. A vous de jouer!
        </p>
       );
    }

    return (
      <div>
        {
          filteredTrans.map(translation => {
          return <Translation translation={translation} key={translation.id} />
          })
        }
      </div>
    )
  }

  const renderHomeLink = (): JSX.Element => {
    if (isFromUrl) {
      return (
        <Link to="/" className="self-start">
          <div className="flex items-center self-start">
            <i className="fas fa-arrow-left text-white cursor-pointer" ></i>
            <h1 className="text-3xl text-shadow text-white ml-8 cursor-pointer">
                <span style={{fontFamily: 'Dancing Script'}}>Universal</span>
                <span style={{fontFamily: 'Orelega One'}}>JOKES</span>
            </h1>
          </div>
        </Link>
      )
    }

    return (
      <div className="flex items-center self-start" onClick={closeJoke}>
        <i className="fas fa-arrow-left text-white cursor-pointer" ></i>
        <h1 className="text-3xl text-shadow text-white ml-8 cursor-pointer">
            <span style={{fontFamily: 'Dancing Script'}}>Universal</span>
            <span style={{fontFamily: 'Orelega One'}}>JOKES</span>
        </h1>
      </div>
    )
  }

  return (
    <div className="w-screen bg-gray-100 overflow-y-auto md:h-screen fixed inset-0 md:flex z-50">
      <div className="md:w-1/2 bg-red-900 flex flex-col items-center px-4 py-4 sm:px-12 md:px-4 w-full">
        {renderHomeLink()}

        <div className="whitespace-pre-wrap w-full bg-white px-4 py-3 rounded-md border border-gray-200 shadow mt-6 md:mt-16">
          <AuthorBanner element={joke} />

          <div className="text-sm mt-3 ml-2">
            <p>{joke.content}</p>
          </div>

          <div className="text-gray-400 mt-3">
            {joke.likes} personnes ont ri à cette blague
          </div>
        </div>

        <div className="bg-white w-60 rounded-full mt-2">
          <JokeReaction joke={joke} setJoke={setJoke} isSmall={true}/>
        </div>

      </div>

      <div className="md:w-1/2 p-4 flex flex-col md:overflow-y-auto">
        <h2 className="text-lg font-bold">
          <FormattedMessage id="joke_show.translations" />
        </h2>
        <TranslationForm joke={joke} setJoke={setJoke} />

        <div className="flex justify-between items-center">
          <p>Filtrer:</p>
          <LanguageSelect language={languageFilter} setLanguage={setLanguageFilter} />
        </div>
        <div className="">
          {renderTranslations()}
        </div>

      </div>
    </div>

  );
}
