import React from 'react';

import App from '../App.css';





const Navbar = ({ searchQuery, setSearchQuery, searchMovies }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(searchQuery);
  };

  return (
    <nav className="bg-green-500 p-4 flex flex-col sm:flex-row justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Movie App</h1>
      <form onSubmit={handleSubmit} className="flex mt-4 sm:mt-0">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="p-2 rounded-l-lg bg-gray-800 text-white"
        />
        <button type="submit" className="bg-black p-2 rounded-r-lg text-white">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;
