import React from 'react';

import NavItems from './nav_items';

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function NavBar({setCurrentPage}: Props) : JSX.Element {
  return (
    <div className="flex justify-between items-center h-16 px-4 py-2 bg-yellow-600">
      <div className="text-3xl text-shadow text-white py-0 cursor-pointer" onClick={() => setCurrentPage('jokesIndex')}>
          <span style={{fontFamily: 'Dancing Script'}}>Universal</span>
          <span style={{fontFamily: 'Orelega One'}}>JOKES</span>
      </div>

      <NavItems  setCurrentPage={setCurrentPage}/>
    </div>
  );
}
