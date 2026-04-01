// Creating the The movie database api call file
// fetching the discover endpoint to grab a list of movies 
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const url = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2024-01-01&primary_release_date.lte=2026-12-31&sort_by=popularity.desc"


export async function fetchMovies(){
    const response = await fetch(url, {
        headers: 
            {'Authorization': `Bearer ${API_TOKEN}`}
    })
    if (response.ok){
        const data = await response.json();
        return data.results
    }
    else throw new Error("Something bad happened fetching movies")
}

const genre_url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

export async function fetchGenres(){
    const response = await fetch(genre_url,{
            headers: 
                {'Authorization': `Bearer ${API_TOKEN}`}}
    )
    if (response.ok){
        const data = await response.json()
        return data.genres
    }
    else throw new Error("Something not good happened fetching the genres")
}