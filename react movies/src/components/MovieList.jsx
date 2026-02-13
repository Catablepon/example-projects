import { useState, useEffect } from "react";
import MovieItem from "./MovieItem.jsx";
import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY

function MovieList({ movies }) {
    const [movieList, setMovieList ] = useState([])

    const loadMovies = async () => {
        try {
            // My own api key here
            const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&append_to_response=videos`);
            setMovieList(response.data.results)
        } catch (error) {
            console.error("Error loading movies:", error)
        }
    }

    useEffect(() => {
        loadMovies()
    }, [])

    if (movieList.length === 0) {
        return (
            <div>
                <p>Loading, please wait...</p>
            </div>
        )
    }
    console.log(movieList)

    return (
        <div className="movies">
            {movieList.map(movie => (
                <MovieItem key={movie.id} movie={movie} />
            ))}
        </div>
    )
}

export default MovieList