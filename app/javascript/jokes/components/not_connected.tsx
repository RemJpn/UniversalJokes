import React from 'react';

export default function NotConnected (): JSX.Element {
  return(
    <main className="feed p-4 mt-16">

      <div className="flex flex-col items-center bg-white rounded p-8 rounded-md border border-gray-200 shadow-sm">
        <p className="text-xl font-bold text-center"> Vous n'êtes pas encore connecté</p>

        <div className="flex flex-col items-center sm:flex-row w-full mt-4">
          <div className="flex flex-col justify-center items-center sm:w-1/2 items">
            <a href="/" className="text-center w-40 px-3 py-2 bg-red-700 text-white rounded hover:bg-yellow-600 transition duration-200 ease-in-out">Continuer sans être connecté</a>
          </div>

          <div className="flex flex-col items-center w-full sm:w-1/2 border-t mt-4 sm:border-t-0 sm:border-l border-gray-200">
            <a href="/users/sign_in" className="text-center mt-4 w-40 px-3 py-2 bg-blue-600 text-white rounded hover:bg-yellow-600 transition duration-200 ease-in-out">Se connecter</a>
            <a href="/users/sign_up" className="text-center my-4 w-40 px-3 py-2 bg-green-600 text-white rounded hover:bg-yellow-600 transition duration-200 ease-in-out">Créer un compte</a>
          </div>

        </div>

      </div>

    </main>
  );
}
