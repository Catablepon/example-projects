import { useEffect, useState } from "react";
import CityWeather from "./CityWeather.jsx";

function HomeView() {
    const [city, setCity] = useState("")
    const [submittedCity, setSubmittedCity] = useState(null)
    const [savedCities, setSavedCities] = useState([])

    useEffect(() => {
        const cities = JSON.parse(localStorage.getItem("cities")) || []
        setSavedCities(cities)
    }, [])

    const handleSubmit = () => {
        if (city.trim() !== "") {
            setSubmittedCity(city)
            setCity("")
        }
    }

    return (
        <div className="homeview">
            <h1>Search for a weather forecast</h1>
            <div className="search">
                <input className="input" type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Give a city name"/>
                <button onClick={handleSubmit} className="button">Get forecast</button>
            </div>
            {submittedCity && <CityWeather city={submittedCity} adding={true} favourites={savedCities}/>}
        </div>

    )
}

export default HomeView