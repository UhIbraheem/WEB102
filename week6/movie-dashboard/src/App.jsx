import React, { useEffect, useState } from 'react'
import { fetchGenres, fetchMovies } from '../utils/tmdb'
import Header from './components/Header/Header'
import Movies from './components/Movies/Movies'
import './App.css'

function App() {
  // Raw data from API
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  // User controls
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState("desc")
  const [selectedMovie, setSelectedMovie] = useState(null)

  // Fetch movies and genres together on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [moviesData, genresData] = await Promise.all([
          fetchMovies(),
          fetchGenres()
        ])
        setMovies(moviesData)
        const genreMap = genresData.reduce((acc, item) => {
          acc[item.id] = item.name
          return acc
        }, {})
        setGenres(genreMap)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // Derived: filter by search
  const searchedMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Derived: filter by genre
  const filteredMovies = selectedGenre
    ? searchedMovies.filter(movie => movie.genre_ids.includes(Number(selectedGenre)))
    : searchedMovies

  // Derived: sort
  const displayedMovies = [...filteredMovies].sort((a, b) => {
    if (!sortField) return 0
    let valA, valB
    if (sortField === "release_date") {
      valA = a.release_date || ""
      valB = b.release_date || ""
    } else {
      valA = a.vote_average
      valB = b.vote_average
    }
    if (valA < valB) return sortDirection === "asc" ? -1 : 1
    if (valA > valB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Derived: summary stats
  const totalCount = displayedMovies.length

  const newestMovie = displayedMovies.length > 0
    ? displayedMovies.reduce((best, m) => m.release_date > best.release_date ? m : best)
    : null

  const highestRatedMovie = displayedMovies.length > 0
    ? displayedMovies.reduce((best, m) => m.vote_average > best.vote_average ? m : best)
    : null

  // Derived: genre dropdown options from available movies
  const genreOptions = [...new Set(movies.flatMap(m => m.genre_ids))]
    .map(id => ({ id, name: genres[id] }))
    .filter(g => g.name)
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="app">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner" />
          <p className="loading-text">Loading movies...</p>
        </div>
      ) : (
        <>
          <Header
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            genreOptions={genreOptions}
            sortField={sortField}
            onSortFieldChange={setSortField}
            sortDirection={sortDirection}
            onSortDirectionChange={setSortDirection}
          />

          <div className="summary-cards">
            <div className="summary-card">
              <div className="summary-label">Movies Shown</div>
              <div className="summary-value count">{totalCount}</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Newest Release</div>
              <div className="summary-value">
                {newestMovie ? newestMovie.title : "—"}
                {newestMovie && <span className="summary-sub">{newestMovie.release_date}</span>}
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Highest Rated</div>
              <div className="summary-value">
                {highestRatedMovie ? highestRatedMovie.title : "—"}
                {highestRatedMovie && (
                  <span className="summary-sub rating">{highestRatedMovie.vote_average.toFixed(1)} ★</span>
                )}
              </div>
            </div>
          </div>

          <Movies
            movies={displayedMovies}
            genres={genres}
            onSelectMovie={setSelectedMovie}
          />

          {/* Side panel overlay */}
          {selectedMovie && (
            <div className="side-panel-overlay" onClick={() => setSelectedMovie(null)}>
              <div className="side-panel" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={() => setSelectedMovie(null)}>✕</button>
                {selectedMovie.poster_path && (
                  <img
                    className="side-panel-poster"
                    src={`https://image.tmdb.org/t/p/w400${selectedMovie.poster_path}`}
                    alt={selectedMovie.title}
                  />
                )}
                <h2>{selectedMovie.title}</h2>
                <p className="side-panel-overview">{selectedMovie.overview}</p>
                <div className="side-panel-details">
                  <div><span className="detail-label">Release Date</span>{selectedMovie.release_date}</div>
                  <div><span className="detail-label">Rating</span><span className="detail-rating">{selectedMovie.vote_average.toFixed(1)} ★</span></div>
                  <div><span className="detail-label">Genres</span>{selectedMovie.genre_ids.map(id => genres[id]).filter(Boolean).join(", ")}</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default App
