import HomeView from "./components/HomeView.jsx"
import FavouritesView from "./components/FavouritesView.jsx"
import './App.css'
import { CgHome, CgHeart, CgCloud} from 'react-icons/cg'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

function App() {
  const [view, setView] = useState("favourites");

  return (
    <div className='App'>
      <div className="topBar">
        <span className="weatherApp"><CgCloud/> Weather App</span>
        <span className="buttons">
          <Button onClick={() => setView("home")}><CgHome/> Home</Button>
          <Button onClick={() => setView("favourites")}><CgHeart/> Favourites</Button>
        </span>
      </div>
      <div className="screen">
        {view === "home" && <HomeView />}
        {view === "favourites" && <FavouritesView />}
      </div>

    </div>
  )
}

export default App
