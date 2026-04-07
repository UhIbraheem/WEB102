import React from 'react'
import './Movies.css'

// Renders the movie list as a grid table
function Movies({ movies, genres, onSelectMovie }) {
  return (
    <div className="movie-container">
      <div className="header-row">
        <div>#</div>
        <div>Title</div>
        <div>Genre</div>
        <div>Released</div>
        <div>Rating</div>
      </div>

      {movies.length === 0 ? (
        <p className="no-results">No movies match your filters.</p>
      ) : (
        movies.map((movie, i) => (
          <div
            className="movie-row"
            key={movie.id}
            onClick={() => onSelectMovie(movie)}
          >
            <div className="movie-number">{i + 1}</div>
            <div className="movie-title">{movie.title}</div>
            <div className="movie-genres">
              {movie.genre_ids.map(id => (
                <span className="genre-tag" key={id}>{genres[id]}</span>
              ))}
            </div>
            <div className="movie-release-date">{movie.release_date}</div>
            <div className="movie-rating">{movie.vote_average.toFixed(1)} ★</div>
          </div>
        ))
      )}
    </div>
  )
}

export default Movies
