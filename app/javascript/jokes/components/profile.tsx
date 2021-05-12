import React, {useState, useContext, useRef, useEffect} from 'react';

import {AvatarModal} from './avatar_modal';
import {LanguageSelect, languageOptions} from './language_select';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {updateUser, User} from '../api/UserAPI';


interface Props {
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>
}

export default function Profile({setCurrentUser}: Props): JSX.Element {

  const currentUser = useContext(CurrentUserContext);
  const [nicknameValue, setNicknameValue] = useState(currentUser.nickname);
  const [language, setLanguage] = useState(languageOptions.find(option => option.value == currentUser.language));
  const [modalOpen, setModalOpen] = useState(false);

  const nickname = useRef(null);
  const nicknameInput = useRef(null);
  const nicknameText = useRef(null);


  const enableEdit = () => {
    nickname.current.classList.add('hidden');
    nicknameInput.current.classList.remove('hidden');
    nicknameText.current.focus();
  }

  const handleSubmitNickname = (e) => {
    e.preventDefault();
    nickname.current.classList.remove('hidden');
    nicknameInput.current.classList.add('hidden');
    updateUser({
      "id": currentUser.id,
      "nickname": nicknameValue
    }, setCurrentUser)
  }

  const handleLanguageChange = () => {
   if(language){
     updateUser({
       "id": currentUser.id,
       "language": language.value
     }, setCurrentUser)
   }
  }
  useEffect(handleLanguageChange, [language]);

  return (
    <main className='feed mt-16 p-4'>

      <div className="flex flex-col items-center bg-white px-4 py-4 rounded-md border border-gray-200 shadow-sm">
        <img className="h-36 w-36 rounded-full border-4 border-yellow-600 cursor-pointer object-cover"
             src={currentUser.avatar}
             onClick={()=>setModalOpen(true)} />
        <AvatarModal setCurrentUser={setCurrentUser} modalOpen={modalOpen} setModalOpen={setModalOpen}/>

        <div className={`group flex h-10 mt-4 items-center relative`} ref={nickname} onClick={enableEdit} >
          <p className="text-2xl font-bold group-hover:text-gray-600">{currentUser.nickname}</p>
          <i className="ml-2 fas fa-pen opacity-0 group-hover:opacity-100 absolute -right-8"></i>

        </div>

        <form action="" className={`mt-4 hidden`} ref={nicknameInput} onSubmit={handleSubmitNickname} onBlur={handleSubmitNickname}>
          <input
            ref={nicknameText}
            type="text"
            value={nicknameValue}
            onChange={(e) => setNicknameValue(e.target.value)}
            className="h-10 px-2 py-2 shadow-sm border border-gray-200 rounded focus:ring focus:ring-yellow-400 focus:ring-opacity-50 focus:border-yellow-500" />
        </form>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center">
          <p className="mb-2 sm:mb-0 sm:mr-2">Langue appli:</p>
          <LanguageSelect language={language} setLanguage={setLanguage} />
        </div>

        <h3 className="mt-10 text-lg font-bold">STATS</h3>
        <div className="flex flex-wrap justify-center">
          <div className="mt-4 text-center w-40">
            <p className="text-4xl">{currentUser.nb_jokes}</p>
            <p className="uppercase">Blagues</p>
          </div>
          <div className="mt-4 text-center w-40">
            <p className="text-4xl">{currentUser.nb_translations}</p>
            <p className="uppercase">Traductions</p>
          </div>
          <div className="mt-4 text-center w-40">
            <p className="text-4xl">{currentUser.nb_liked}</p>
            <p className="uppercase">Rires</p>
          </div>
          <div className="mt-4 text-center w-40">
            <p className="text-4xl">{currentUser.nb_saved}</p>
            <p className="uppercase">Enregistrées</p>
          </div>

        </div>



        <a href="/users/sign_out"
           rel="nofollow"
           data-method="delete"
           className="text-sm mt-16">
          se déconnecter
        </a>

      </div>


    </main>
  );
}
