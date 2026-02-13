import { useEffect, useState } from "react"
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import MyModal from "./Modal.jsx"

const API_KEY = import.meta.env.VITE_API_KEY

function MovieItem({ movie }) {
    const [movieDetails, setMovieDetails] = useState({})

    useEffect(() => {
        const loadMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`
                )
                setMovieDetails(response.data)
            } catch (error) {
                console.error("Error loading movie details: ", error)
            }
        }

        loadMovieDetails()
    }, [])

    console.log(movieDetails)

    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }

    let IMAGEPATH = "https://image.tmdb.org/t/p/w500"
    let imageurl = IMAGEPATH + movie.poster_path
    const genres = movieDetails.genres?.map(g => g.name).join(', ') || 'No genres available'
    const videoKey = movieDetails.videos?.results?.[0]?.key || null
    return (
        <div className="movieCard">
            <img src={imageurl} width="400" height="500" className="image"></img>
            <h3>{movie.original_title} ({movieDetails.release_date})</h3>
            <p className="differentFont">Rating: {movieDetails.vote_average}</p>
            <p className="differentFont">Runtime: {movieDetails.runtime} minutes</p>
            <p>{movieDetails.overview}</p>
            <p>Genres: {genres}</p>
            <Button variant="primary" onClick={handleShow}>Watch trailer</Button>

            <MyModal
                show={show}
                onHide={handleClose}
                videoKey={videoKey}
            />

        </div>



    )
}

export default MovieItem