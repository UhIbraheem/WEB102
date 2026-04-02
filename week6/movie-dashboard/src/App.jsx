import React, { useEffect, useState } from 'react'
import { fetchGenres, fetchMovies } from '../utils/tmdb'
import Movies from './components/Movies/Movies'
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  // use effect hook to fetch the set of movies from the api
  useEffect( () => {
    // a function to call the fetchmovies function
    const getMovies = async () => {
      try{
        const data = await fetchMovies();
        //testing line + visualizing data
        setMovies(data)
        setIsLoading(false)
        console.log(data)
      }
      catch(error){
        console.log(error)
      }
    } 
    getMovies();
  }, [])

  useEffect( () => {
    // to fetch the genres and eventually map them to id
    // we eventually want to reduce so we can set the use state to 
    // key value pairs with the genre id being the key and the genre name being the val
    const getGenres = async () => {
      try{
        const info = await fetchGenres();
        //transforming data into mapped genre num to genre name
        const data = info.reduce((acc, item)=>{
          //acc is the new map were creating and appending to
          // each dict item has a .id is the id num and .name is the name
          acc[item.id] = item.name;
          return acc
        }, {})
        setGenres(data)
        setIsLoading(false)
        console.log(data)
      }
      catch (error){
        console.log(error)
      }
    }
    getGenres();

  }, [])

  return (
    <div>
      { isLoading ? (
        <p>Loading movie info...</p>
      ) : (
      <Movies 
        movies={movies}
        genres={genres}
      />
      )
}
    </div>
  )
}

export default App
