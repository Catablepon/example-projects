import { useState, useEffect } from "react";
import CityWeather from "./CityWeather.jsx";

function FavouritesView() {

    const [favouriteCities, setFavouriteCities] = useState([])
    
    useEffect(() => {
        const cities = JSON.parse(localStorage.getItem("cities")) || []
        setFavouriteCities(cities)
    }, [])
    const savedCities = 
        JSON.parse(localStorage.getItem("cities")) || []


    return (
        <div>
            <h2 className="favouriteHeader">Favourite cities</h2>
            <div className="favourites">
            
            {savedCities.length === 0 ? (
                <p>No favourite cities</p>
            ) : (
                savedCities.map((cityName, index) => (
                    <CityWeather key={index} city={cityName} adding={false} favourites={favouriteCities}/>
                ))
            )}
            </div>
        </div>

    )
}

export default FavouritesView