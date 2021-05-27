import React, { useEffect} from 'react';
import {useLocation} from 'react-router-dom';


interface Props {
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBar({search, setSearch}: Props) : JSX.Element {
  const handleChange = (e) => setSearch(e.target.value);
  const location = useLocation();

  const getSearchResults = () => {
    if (!search) return;
    const url = `/api/v1/jokes/search/${search}`;
    fetch(url, { credentials: "same-origin" })
      .then(r => r.json())
      .then(console.log);
  }
  useEffect(getSearchResults, [search]);

  if (location.pathname === "/profile") return null;

  return (
    <form className="absolute top-0 -right-16 sm:-right-52 flex items-center h-10 bg-gray-100 rounded-full px-3 group">
      <label className="flex items-center">
        <i className="fas fa-search text-gray-500"></i>
        <input type="text"
               value={search}
               onChange={handleChange}
               className="w-0 p-0 sm:w-40 sm:px-2
                          transition-width duration-200 ease-in-out
                          group-hover:w-40 group-hover:px-2 focus:w-40 focus:px-2
                          bg-transparent text-gray-800 border-0 focus:ring-0"
               placeholder="Rechercher"/>
      </label>
    </form>
  );
}

