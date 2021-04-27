import React from 'react';

import NavItems from './nav_items';


export default function NavBar() : JSX.Element {
  return (
    <div className="flex justify-between items-center h-16 px-4 py-2 bg-yellow-600">
      <a className="navbar-brand text-white py-0" href="#">
          <span style={{fontFamily: 'Dancing Script'}}>Universal</span>
          <span style={{fontFamily: 'Orelega One'}}>JOKES</span>
      </a>


      <NavItems/>
    </div>
  );
}
