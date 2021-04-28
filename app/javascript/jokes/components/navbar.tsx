import React from 'react';

import NavItems from './nav_items';

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function NavBar({setCurrentPage}: Props) : JSX.Element {
  return (
    <nav className="flex justify-between items-center fixed inset-0 z-10 w-screen shadow-sm h-16 px-4 py-2 bg-yellow-600">
      <h1 className="text-3xl text-shadow text-white py-0 cursor-pointer" onClick={() => setCurrentPage('jokesIndex')}>
          <span style={{fontFamily: 'Dancing Script'}}>Universal</span>
          <span style={{fontFamily: 'Orelega One'}}>JOKES</span>
      </h1>

      <NavItems  setCurrentPage={setCurrentPage}/>
    </nav>
  );
}
