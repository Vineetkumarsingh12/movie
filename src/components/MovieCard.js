import React, { useState, useEffect } from 'react';

const MovieCard = ({ movie, addToWatchlist, removeFromWatchlist, isInWatchlist }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likedMovies')) || [];
    setIsLiked(storedLikes.includes(movie.id));
  }, [movie.id]);

  const handleLike = () => {
    const storedLikes = JSON.parse(localStorage.getItem('likedMovies')) || [];
    if (isLiked) {
      const updatedLikes = storedLikes.filter((id) => id !== movie.id);
      localStorage.setItem('likedMovies', JSON.stringify(updatedLikes));
      setIsLiked(false);
    } else {
      localStorage.setItem('likedMovies', JSON.stringify([...storedLikes, movie.id]));
      setIsLiked(true);
    }
  };

  const handleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-center">
      <img src={imageUrl} alt={movie.title} className="w-full h-64 object-cover mb-4 rounded" />
      <h3 className="text-lg font-bold">{movie.title}</h3>
      <p className="text-sm text-gray-400">{movie.release_date?.split('-')[0]}</p>
      <button
        className={`mt-2 px-4 py-2 rounded ${isLiked ? 'bg-green-500' : 'bg-gray-600'}`}
        onClick={handleLike}
      >
        {isLiked ? 'Liked' : 'Like'}
      </button>
      <button
        className={`mt-2 px-4 py-2 rounded ${isInWatchlist ? 'bg-red-500' : 'bg-green-500'} ml-2`}
        onClick={handleWatchlist}
      >
        {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
    </div>
  );
};

export default MovieCard;
