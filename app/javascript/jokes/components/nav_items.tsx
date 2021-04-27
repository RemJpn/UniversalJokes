import React, {useContext} from 'react';

import {IsConnectedContext} from '../contexts/IsConnectedContext';


export default function NavItems() : JSX.Element {
  const isConnected = useContext(IsConnectedContext);

  if (!isConnected){
    return (
      <ul>
        <li>
          <a className="text-yellow-100 hover:text-yellow-900 hover:no-underline transition duration-300" href="/users/sign_in">Login</a>
        </li>
      </ul>
    );
  }

  return (
    <ul className="flex list-none items-center">
      <li className="mr-4">
        <a className="" href="#">
          <i className="fas fa-home text-xl text-yellow-100 hover:text-yellow-900 transition duration-200"></i>
        </a>
      </li>
      <li className="mr-4">
        <a className="" href="#">
          <i className="fas fa-heart text-xl text-yellow-100 hover:text-yellow-900 transition duration-200"></i>
        </a>
      </li>
      <li className="">
        <a href="#">
          <img className="h-10 rounded-full" src="https://kitt.lewagon.com/placeholder/users/ssaunier" />
        </a>
      </li>
    </ul>
  );
}
