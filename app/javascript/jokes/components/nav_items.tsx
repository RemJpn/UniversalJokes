import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import {CurrentUserContext} from '../contexts/CurrentUserContext';


export default function NavItems() : JSX.Element {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser.authenticated){
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

        <Link to="profile">
          <img className="h-10 rounded-full" src="https://kitt.lewagon.com/placeholder/users/ssaunier" />
        </Link>

      </li>
    </ul>
  );
}
