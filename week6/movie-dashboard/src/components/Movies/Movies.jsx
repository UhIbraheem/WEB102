import React from 'react'
import './Movies.css'

function Movies({movies, genres}) {


  return (
    <div className='movie-container'>
      {
        movies.map((movie, i)=>(
            <div className="movie-row" key={movie.id}>
                <div className='movie-number'>{i+1}</div>
                <div className='movie-title'>{movie.title}</div>
                <div className='movie-genres'>{
                    movie.genre_ids.map( (genre_id)=> (
                        <div key={genre_id}>{genres[genre_id]}</div>
                    ))}
                </div>
                <div className='movie-release-date'>{movie.release_date}</div>
                <div className='movie-rating'>{movie.vote_average}</div>
            </div>

        ))
      }
    </div>
  )
}

export default Movies
