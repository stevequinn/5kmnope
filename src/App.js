import React, { useState } from "react";
import Map from "./components/Map";
import './App.css';

function App() {
  const [home, setHome] = useState([-37.81061, 144.954386]);

  const handleHomeClick = (e) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (location) {
        console.log("location", location.coords);
        setHome([location.coords.latitude, location.coords.longitude]);
      });
    }
  };

  return (
    <div className="App">
      <div class="App-header">
        <h2>5km or NOPE</h2>
      </div>
      <Map home={home} />
      <button className="btn" onClick={handleHomeClick}>
        Can I pleeeaaaaasssse?
      </button>
    </div>
  );
}

export default App;
