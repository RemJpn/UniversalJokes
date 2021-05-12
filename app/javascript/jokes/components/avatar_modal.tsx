import React, {useRef} from 'react';
import {FormattedMessage} from 'react-intl';

import {updateAvatar, User} from '../api/UserAPI';


interface Props {
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AvatarModal({setCurrentUser, modalOpen, setModalOpen}: Props): JSX.Element{
  const uploadText = useRef(null);

  const handleClose = () => setModalOpen(false);

  const handleOutsideClick = (e) => {
    if(e.target === e.currentTarget){
      handleClose();
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const selectedFile = e.target[0].files[0];

    if (selectedFile.size < 1000000){
      const formData = new FormData(e.target);
      updateAvatar(formData, (data) => {
        setCurrentUser(data);
        setModalOpen(false);
      });
    }
  }

  const handleUploaded = e => {
    const selectedFile = e.target.files[0];

    if (selectedFile.size < 1000000) {
      uploadText.current.innerText = `${selectedFile.name}`;
    } else {
      uploadText.current.innerHTML = "<span>Seules les images de moins de <span class='text-red-600 font-bold'>1Mo</span> sont acceptées</span>"
    }
  }

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-10 h-screen flex justify-center items-center bg-gray-900 bg-opacity-60"
         onClick={handleOutsideClick}>
      <div className="w-11/12 sm:w-96 bg-white rounded p-4 shadow border border-gray-200 text-center relative">
        <h3 className="text-lg font-bold">
          <FormattedMessage id="avatar_module.title"/>
        </h3>
        <span className="absolute top-1 right-2 text-gray-400 cursor-pointer
                         hover:text-gray-600 transition duration-200 ease-in-out"
              onClick={handleClose}>
          <i className="fas fa-times-circle"></i>
        </span>
        <form onSubmit={handleSubmit} className="flex flex-col mt-4">
          <label className="cursor-pointer w-full h-24
                            border-2 border-dashed border-gray-200 rounded
                            hover:border-gray-400
                            text-gray-500
                            hover:bg-gray-400 hover:text-white
                            transition duration-200 ease-in-out">
            <div ref={uploadText} className="h-full flex flex-col justify-center items-center">
              <i className="fas fa-cloud-upload-alt text-xl"></i>
              <span>
                <FormattedMessage id="avatar_module.select"/>
              </span>
            </div>
            <input
              type="file"
              name="avatar"
              onChange={handleUploaded}
              accept="image/*"
              className="hidden"/>
          </label>
          <FormattedMessage id="avatar_module.save">
          {(msg:string)=> (
            <input
              type="submit"
              value={msg}
              className="cursor-pointer self-center mt-4 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition duration-200 ease-in-out"/>
          )}
          </FormattedMessage>
        </form>
      </div>

    </div>

  );

}
