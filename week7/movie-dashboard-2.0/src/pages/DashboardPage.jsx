import { useMemo, useState } from 'react'
import ChartsPanel from '../components/ChartsPanel'
import MovieTable from '../components/MovieTable'

function DashboardPage({ movies, genres }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [sortField, setSortField] = useState('vote_average')
  const [sortDirection, setSortDirection] = useState('desc')
  const [showCharts, setShowCharts] = useState(true)

  const genreOptions = useMemo(() => {
    return [...new Set(movies.flatMap((movie) => movie.genre_ids))]
      .map((id) => ({ id, name: genres[id] }))
      .filter((item) => item.name)
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [movies, genres])

  const displayedMovies = useMemo(() => {
    const searched = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )

    const filtered = selectedGenre
      ? searched.filter((movie) => movie.genre_ids.includes(Number(selectedGenre)))
      : searched

    return [...filtered].sort((a, b) => {
      if (sortField === 'release_date') {
        const left = a.release_date || ''
        const right = b.release_date || ''
        return sortDirection === 'asc' ? left.localeCompare(right) : right.localeCompare(left)
      }

      const left = a.vote_average || 0
      const right = b.vote_average || 0
      return sortDirection === 'asc' ? left - right : right - left
    })
  }, [movies, searchTerm, selectedGenre, sortField, sortDirection])

  const newestMovie = displayedMovies.length
    ? displayedMovies.reduce((best, current) =>
        current.release_date > best.release_date ? current : best
      )
    : null

  const highestRatedMovie = displayedMovies.length
    ? displayedMovies.reduce((best, current) =>
        current.vote_average > best.vote_average ? current : best
      )
    : null

  const genreChartData = useMemo(() => {
    const counts = {}

    displayedMovies.forEach((movie) => {
      movie.genre_ids.forEach((id) => {
        const genreName = genres[id]
        if (!genreName) return
        counts[genreName] = (counts[genreName] || 0) + 1
      })
    })

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 7)
  }, [displayedMovies, genres])

  const ratingTrendData = useMemo(() => {
    const grouped = {}

    displayedMovies.forEach((movie) => {
      if (!movie.release_date) return
      const monthKey = movie.release_date.slice(0, 7)
      if (!grouped[monthKey]) {
        grouped[monthKey] = { total: 0, count: 0 }
      }
      grouped[monthKey].total += movie.vote_average || 0
      grouped[monthKey].count += 1
    })

    return Object.entries(grouped)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, values]) => ({
        month,
        avgRating: Number((values.total / values.count).toFixed(2)),
      }))
  }, [displayedMovies])

  return (
    <section>
      <header className="page-header">
        <h2>Dashboard</h2>
        <p>
          Use filters to explore recent movie releases and open any row for a dedicated detail page.
        </p>
      </header>

      <section className="filters-card">
        <div className="filters-row">
          <input
            className="control"
            type="text"
            placeholder="Search title..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select
            className="control"
            value={selectedGenre}
            onChange={(event) => setSelectedGenre(event.target.value)}
          >
            <option value="">All genres</option>
            {genreOptions.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <select
            className="control"
            value={sortField}
            onChange={(event) => setSortField(event.target.value)}
          >
            <option value="vote_average">Sort by rating</option>
            <option value="release_date">Sort by release date</option>
          </select>

          <button
            className="btn"
            onClick={() => setSortDirection((value) => (value === 'asc' ? 'desc' : 'asc'))}
          >
            {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
          </button>

          <button className="btn secondary" onClick={() => setShowCharts((value) => !value)}>
            {showCharts ? 'Hide Charts' : 'Show Charts'}
          </button>
        </div>
      </section>

      <section className="summary-grid">
        <article className="summary-card">
          <p className="label">Visible Movies</p>
          <p className="value">{displayedMovies.length}</p>
        </article>
        <article className="summary-card">
          <p className="label">Newest Release</p>
          <p className="value small">{newestMovie?.title || 'N/A'}</p>
          <p className="meta">{newestMovie?.release_date || ''}</p>
        </article>
        <article className="summary-card">
          <p className="label">Top Rated</p>
          <p className="value small">{highestRatedMovie?.title || 'N/A'}</p>
          <p className="meta">{highestRatedMovie ? `${highestRatedMovie.vote_average.toFixed(1)} / 10` : ''}</p>
        </article>
      </section>

      {showCharts && <ChartsPanel genreChartData={genreChartData} ratingTrendData={ratingTrendData} />}

      <MovieTable movies={displayedMovies} genres={genres} />
    </section>
  )
}

export default DashboardPage
