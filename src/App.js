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
      </div>
      <Map initialLocation={initialLocation} />
    </div>
  );
}

export default App;
