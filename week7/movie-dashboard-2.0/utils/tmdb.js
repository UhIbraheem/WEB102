// TMDB API utility functions
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN
const BASE = "https://api.themoviedb.org/3"
const HEADERS = { Authorization: `Bearer ${API_TOKEN}` }

const DISCOVER_URL = `${BASE}/discover/movie?primary_release_date.gte=2024-01-01&primary_release_date.lte=2026-12-31&sort_by=popularity.desc`
const GENRE_URL = `${BASE}/genre/movie/list?language=en`

// Fetch popular recent movies
export async function fetchMovies() {
  const response = await fetch(DISCOVER_URL, { headers: HEADERS })
  if (!response.ok) throw new Error("Failed to fetch movies")
  const data = await response.json()
  return data.results
}

// Fetch genre ID-to-name mapping
export async function fetchGenres() {
  const response = await fetch(GENRE_URL, { headers: HEADERS })
  if (!response.ok) throw new Error("Failed to fetch genres")
  const data = await response.json()
  return data.genres
}