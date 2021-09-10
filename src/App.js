import React from "react";
import Map from "./components/Map";
import "./App.css";

function App() {
  const initialLocation = [-37.81061, 144.954386];

  return (
    <div className="App">
      <div className="App-header">
        <h2>
          5km or <span className="underline">NOPE</span>
        </h2>
        <h3>...and Sandos <span class="emoj">&#x1F44C;</span></h3>
      </div>
      <Map initialLocation={initialLocation} />
    </div>
  );
}

export default App;
