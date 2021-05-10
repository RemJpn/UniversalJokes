import React, {useState, useContext, useRef} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';



export default function Profile({setCurrentUser}): JSX.Element {
  const currentUser = useContext(CurrentUserContext);
  const [nicknameValue, setNicknameValue] = useState(currentUser.nickname);

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
    updateUser({"nickname": nicknameValue}, setCurrentUser)
  }

  const updateUser = (user, callback) => {
    const url = `/api/v1/users/${currentUser.id}`;
    const csrfMetaTag: HTMLMetaElement = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfMetaTag.content;
    const body = { user };
    fetch(url, {
      method: 'PATCH',
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
    <main className='feed mt-16 p-4'>

      <div className="flex flex-col items-center bg-white px-4 py-4 rounded-md border border-gray-200 shadow-sm">
        <img className="h-40 rounded-full border-4 border-yellow-600" src="https://kitt.lewagon.com/placeholder/users/ssaunier" />

        <div className={`group flex h-10 mt-4 items-center relative`} ref={nickname} onClick={enableEdit} >
          <p className="text-2xl group-hover:text-gray-600">{currentUser.nickname}</p>
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
      </div>

    </main>
  );
}