import { Link } from 'react-router-dom'

function MovieTable({ movies, genres }) {
  if (movies.length === 0) {
    return <p className="empty-state">No movies match your current filters.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="movie-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Genres</th>
            <th>Release Date</th>
            <th>Rating</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={movie.id}>
              <td>{index + 1}</td>
              <td>
                <Link className="movie-title-link" to={`/movie/${movie.id}`}>
                  {movie.title}
                </Link>
              </td>
              <td>{movie.genre_ids.map((id) => genres[id]).filter(Boolean).join(', ') || 'N/A'}</td>
              <td>{movie.release_date || 'N/A'}</td>
              <td>{movie.vote_average.toFixed(1)} / 10</td>
              <td>
                <Link className="detail-link" to={`/movie/${movie.id}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MovieTable
