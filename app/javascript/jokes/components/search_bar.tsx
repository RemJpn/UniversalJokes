import React from 'react';


export default function SearchBar() : JSX.Element {
  return (
    <form className="absolute top-0 -right-16 sm:-right-52 flex items-center h-10 bg-gray-100 rounded-full px-3 group">
      <label className="flex items-center">
        <i className="fas fa-search text-gray-500"></i>
        <input type="text"
               className="w-0 p-0 sm:w-40 sm:px-2
                          transition-width duration-200 ease-in-out
                          group-hover:w-40 group-hover:px-2 focus:w-40 focus:px-2
                          bg-transparent text-gray-800 border-0 focus:ring-0"
               placeholder="Rechercher"/>
      </label>
    </form>
  );
}

