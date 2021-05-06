import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

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
      <li className="mr-4 cursor-pointer" >
        <Link to="/" >
         <i className="fas fa-home text-xl text-yellow-100 hover:text-yellow-900 transition duration-200 text-shadow"></i>
        </Link>
      </li>
      <li className="mr-4 cursor-pointer" >
        <Link to="/saved">
          <i className="fas fa-heart text-xl text-yellow-100 hover:text-yellow-900 transition duration-200 text-shadow"></i>
        </Link>
      </li>
      <li className="">
        <a href="/users/sign_out" rel="nofollow" data-method="delete">
          <img className="h-10 rounded-full" src="https://kitt.lewagon.com/placeholder/users/ssaunier" />
        </a>
      </li>
    </ul>
  );
}
