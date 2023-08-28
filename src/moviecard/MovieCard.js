import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      <p>Genres: {movie.genres.join(', ')}</p>
    </div>
  );
};

export default MovieCard;
