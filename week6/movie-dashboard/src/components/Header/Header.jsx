import React from 'react'
import './Header.css'

// Controls bar: search, genre filter, sort options
function Header({
  searchTerm, onSearchChange,
  selectedGenre, onGenreChange, genreOptions,
  sortField, onSortFieldChange,
  sortDirection, onSortDirectionChange,
}) {
  return (
    <div className="header">
      <h1 className="header-title">🎬 Movie Dashboard</h1>

      <div className="header-controls">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>

        <select
          className="genre-select"
          value={selectedGenre}
          onChange={e => onGenreChange(e.target.value)}
        >
          <option value="">All Genres</option>
          {genreOptions.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>

        <select
          className="sort-select"
          value={sortField}
          onChange={e => onSortFieldChange(e.target.value)}
        >
          <option value="">Sort by...</option>
          <option value="release_date">Release Date</option>
          <option value="vote_average">Rating</option>
        </select>

        <button
          className="sort-direction-btn"
          onClick={() => onSortDirectionChange(sortDirection === "asc" ? "desc" : "asc")}
          disabled={!sortField}
        >
          {sortDirection === "asc" ? "↑ Ascending" : "↓ Descending"}
        </button>
      </div>
    </div>
  )
}

export default Header
