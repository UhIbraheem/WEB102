import React, { useEffect, useState } from 'react'
import { fetchGenres, fetchMovies } from '../utils/tmdb'

function App() {
  const [movies, setMovies] = useState([])
  const [genre, setGenre] = useState({})

  // use effect hook to fetch the set of movies from the api
  useEffect( () => {
    // a function to call the fetchmovies function
    const getMovies = async () => {
      try{
        const data = await fetchMovies();
        //setMovies(data.results)
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
        const data = await fetchGenres();
        //setGenre(data.genres)
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
      
    </div>
  )
}

export default App
