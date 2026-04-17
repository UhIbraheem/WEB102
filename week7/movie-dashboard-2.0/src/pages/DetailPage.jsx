import { Link, useParams } from 'react-router-dom'

function DetailPage({ movies, genres }) {
  const { movieId } = useParams()
  const movie = movies.find((item) => item.id === Number(movieId))

  if (!movie) {
    return (
      <section className="detail-card">
        <h2>Movie not found</h2>
        <p>The movie may not be in this fetched dataset.</p>
        <Link className="detail-link" to="/">
          Return to dashboard
        </Link>
      </section>
    )
  }

  const genreList = movie.genre_ids.map((id) => genres[id]).filter(Boolean).join(', ') || 'N/A'

  return (
    <section className="detail-card">
      <Link className="back-link" to="/">
        ← Back to dashboard
      </Link>

      <div className="detail-header">
        <div>
          <h2>{movie.title}</h2>
          <p className="detail-subtitle">{movie.original_title}</p>
        </div>
        <span className="rating-pill">{movie.vote_average.toFixed(1)} / 10</span>
      </div>

      {movie.poster_path && (
        <img
          className="detail-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      )}

      <p className="overview">{movie.overview || 'No overview is available for this movie.'}</p>

      <div className="detail-grid">
        <div>
          <p className="label">Release Date</p>
          <p>{movie.release_date || 'N/A'}</p>
        </div>
        <div>
          <p className="label">Genres</p>
          <p>{genreList}</p>
        </div>
        <div>
          <p className="label">Popularity</p>
          <p>{movie.popularity?.toFixed(2) || 'N/A'}</p>
        </div>
        <div>
          <p className="label">Vote Count</p>
          <p>{movie.vote_count || 'N/A'}</p>
        </div>
        <div>
          <p className="label">Language</p>
          <p>{movie.original_language?.toUpperCase() || 'N/A'}</p>
        </div>
        <div>
          <p className="label">Adult Content</p>
          <p>{movie.adult ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </section>
  )
}

export default DetailPage
