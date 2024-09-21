import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';

const API_URL = 'https://api.themoviedb.org/3';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  // Fetch the watchlist from localStorage on initial load
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlistMovies')) || [];
    setWatchlist(storedWatchlist);
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      fetchPopularMovies();
    } else {
      searchMovies(searchQuery);
    }
  }, [searchQuery]);

  const fetchPopularMovies = async () => {
    const res = await axios.get(`${API_URL}/movie/popular?api_key=e88fd68dd4066eb98078d0e29996faf3`);
    setMovies(res.data.results);
  };

  const searchMovies = async (query) => {
    const res = await axios.get(`${API_URL}/search/movie?api_key=e88fd68dd4066eb98078d0e29996faf3&query=${query}`);
    setMovies(res.data.results);
  };

  // Function to add a movie to the watchlist
  const addToWatchlist = (movie) => {
    const updatedWatchlist = [...watchlist, movie];
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlistMovies', JSON.stringify(updatedWatchlist));
  };

  // Function to remove a movie from the watchlist
  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlistMovies', JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white mb-4">{searchQuery ? 'Search Results' : 'Popular Movies'}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              addToWatchlist={addToWatchlist}
              removeFromWatchlist={removeFromWatchlist}
              isInWatchlist={watchlist.some((watchlistMovie) => watchlistMovie.id === movie.id)}
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Watchlist</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlist.length === 0 ? (
            <p className="text-white">Your watchlist is empty.</p>
          ) : (
            watchlist.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                removeFromWatchlist={removeFromWatchlist}
                isInWatchlist={true}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
