import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { fetchGenres, fetchMovies } from '../utils/tmdb'
import Sidebar from './components/Sidebar'
import DashboardPage from './pages/DashboardPage'
import DetailPage from './pages/DetailPage'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

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
      } catch {
        setErrorMessage('Could not load movie data. Check your TMDB token and try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="app-layout">
      <Sidebar totalMovies={movies.length} />

      <main className="main-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner" />
            <p className="loading-text">Loading movie data...</p>
          </div>
        ) : errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          <Routes>
            <Route path="/" element={<DashboardPage movies={movies} genres={genres} />} />
            <Route path="/movie/:movieId" element={<DetailPage movies={movies} genres={genres} />} />
            <Route path="*" element={<DashboardPage movies={movies} genres={genres} />} />
          </Routes>
        )}
      </main>
    </div>
  )
}

export default App
