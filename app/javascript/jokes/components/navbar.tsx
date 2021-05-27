import React from 'react';
import {Link} from 'react-router-dom';

import NavItems from './nav_items';
import SearchBar from './search_bar';


interface Props {
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function NavBar({search, setSearch}: Props) : JSX.Element {
  return (
    <nav className="flex justify-between items-center fixed inset-0 z-10 w-screen shadow-sm h-16 px-4 py-2 bg-yellow-600">
      <div className="relative">
        <Link to="/">
          <h1 className="text-3xl text-shadow text-white py-0 cursor-pointer">
              <span style={{fontFamily: 'Dancing Script'}}>Uni</span>
              <span style={{fontFamily: 'Dancing Script'}} className="hidden sm:inline">versal</span>
              <span style={{fontFamily: 'Orelega One'}}>JOKES</span>
          </h1>
        </Link>

        <SearchBar search={search} setSearch={setSearch}/>

      </div>

      <NavItems/>
    </nav>
  );
}

