import { useState, useEffect } from "react";
import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY

function CityWeather({ city, adding, favourites }) {
    const [weatherData, setWeatherData] = useState(null)
    const [removeStatus, setRemoveStatus] = useState(false)
    const [favouriteStatus, setFavouriteStatus] = useState(false)

    useEffect(() => {
        if (!city) return

        if (favourites && favourites.includes(city)) {
            setFavouriteStatus(true)
        } else {
            setFavouriteStatus(false)
        }

        const loadWeatherData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
                )
                setWeatherData(response.data)
            } catch (error) {
                console.error("Error loading weather data: ", error)
            }
        }

        loadWeatherData()
        setRemoveStatus(false)
    }, [city, favourites])

    if (!weatherData) {
        if (removeStatus) return null;
        return <div className="status">loading...</div>
    }

    console.log(weatherData)
    const iconCode = weatherData.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    const rain1h = weatherData.rain?.["1h"] ?? 0
    const snow1h = weatherData.snow?.["1h"] ?? 0

    const removeCity = (city) => {
        const cities = 
            JSON.parse(localStorage.getItem("cities")) || []

        const updated = cities.filter(c => c !== city)
        localStorage.setItem("cities", JSON.stringify(updated))
    }

    const handleRemove = () => {
        removeCity(weatherData.name)
        setWeatherData(null)
        setFavouriteStatus(false)
        setRemoveStatus(true)
    }

    const saveCityToLocalStorage = (city) => {
        const savedCities = 
            JSON.parse(localStorage.getItem("cities")) || []

        if (!savedCities.includes(city)) {
            savedCities.push(city)
            localStorage.setItem("cities", JSON.stringify(savedCities))
        }
    }

    const handleAdd = () => {
        saveCityToLocalStorage(weatherData.name)
        setFavouriteStatus(true)
    }

    return (
        <div className="weatherCard">
            <div className="main">
                <h3>{weatherData.name}</h3>
                <h2>Weather: {weatherData.weather[0].main}</h2>
                <div className="iconAndDesc">
                    <img src = {iconUrl}/>
                    <p className="iconDesc">Description: {weatherData.weather[0].description}</p>
                </div>
            </div>
            <div className="info">
                <div className="weatherInfo">
                    <div className="column">
                        <p className="bold">Temperature</p>
                        <p>{weatherData.main.temp} °C</p>
                        <p className="bold">Wind</p>
                        <p>{weatherData.wind.speed} kph</p>
                        <p className="bold">Visibility</p>
                        <p>{weatherData.visibility / 1000} km</p>
                        <p className="bold">Snow in last 1h</p>
                        <p>{snow1h} mm/h</p>
                    </div>
                    <div className="column">
                        <p className="bold">Feels like</p>
                        <p>{weatherData.main.feels_like} °C</p>
                        <p className="bold">Clouds</p>
                        <p>{weatherData.clouds.all} %</p>
                        <p className="bold">Humidity</p>
                        <p>{weatherData.main.humidity} %</p>
                        <p className="bold">Rain in last 1h</p>
                        <p>{rain1h} mm/h</p>
                    </div>
                </div>
                <button onClick={adding ? handleAdd : handleRemove} className="button">{adding ? "Add" : "Remove"}</button>
                <p>{favouriteStatus ? "Added to favourites" : "Not in favourites"}</p>
            </div>


            
            

        </div>
    )
}

export default CityWeather