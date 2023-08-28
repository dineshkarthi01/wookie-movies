import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://wookie.codesubmit.io/movies';
const API_HEADERS = {
  Authorization: 'Bearer Wookie2019',
};

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(10); // Number of initially visible movies

  useEffect(() => {
    fetch(API_URL, { headers: API_HEADERS })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.movies);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [movies, searchTerm]);

  const loadMore = () => {
    setVisibleMovies((prevVisible) => prevVisible + 10); // Increase visible movies count
  };

  // Group movies by genres
  const groupedMovies = {};
  filteredMovies.forEach((movie) => {
    movie.genres.forEach((genre) => {
      if (!groupedMovies[genre]) {
        groupedMovies[genre] = [];
      }
      groupedMovies[genre].push(movie);
    });
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Wookie Movies</h1>
        <div className="header-controls">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </header>
      <div className="genre-filters">
        {/* Your genre filters can go here */}
      </div>
      <div className="movie-list">
        {Object.entries(groupedMovies).map(([genre, genreMovies]) => (
          <div key={genre} className="genre-section">
            <h2>{genre}</h2>
            <div className="genre-movie-list">
              {genreMovies.slice(0, visibleMovies).map((movie) => (
                <div key={movie.id} className="movie-card">
                  <h3>{movie.title}</h3>
                  <p>{movie.year}</p>
                </div>
              ))}
            </div>
            {genreMovies.length > visibleMovies && (
              <button onClick={loadMore} className="load-more-button">
                Load More
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
