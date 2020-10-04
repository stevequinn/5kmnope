//
// File: src/components/Map.js
//
import React, { useState } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { destinationPoint } from "../utils/geo";
import LocateControl from "./LocateControl";

const nopeUrl = "nope.jpg";
const northfaceUrl = "northface.png";

const iconDan = new L.Icon({
  iconUrl: nopeUrl,
  iconRetinaUrl: nopeUrl,
  iconAnchor: null,
  popupAnchor: [0, -40],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(65, 85),
  className: "leaflet-div-icon",
});

const iconNorthface = new L.Icon({
  iconUrl: northfaceUrl,
  iconRetinaUrl: northfaceUrl,
  iconAnchor: null,
  popupAnchor: [0, -20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(40, 40),
  className: "leaflet-div-icon",
});

const northfacePoints = [
  [-37.82491, 144.949317],
  [-37.814895, 144.963516],
  [-37.885037, 145.083173],
];

const locateOptions = {
  position: "topleft",
  keepCurrentZoomLevel: true,
  flyTo: true,
  // drawCircle: false,
  strings: {
    title: "C'mon Danny Boi, where can I go?",
    popup: "Only four reasons to leave home. Just don't ask what they are.",
  },
};

const YepNopeMap = ({ initialLocation = null }) => {
  const [home, setHome] = useState(initialLocation);
  const radius = 5 * 10 * 10 * 10; // 5km
  const fromHome = 6.5;
  const zoom = 12;
  let nopePoints = [];

  if (home) {
    nopePoints = [
      destinationPoint(home, 20, fromHome),
      destinationPoint(home, 50, fromHome),
      destinationPoint(home, 90, fromHome),
      destinationPoint(home, 120, fromHome),
      destinationPoint(home, 150, fromHome),
      destinationPoint(home, 180, fromHome),
      destinationPoint(home, 220, fromHome),
      destinationPoint(home, 250, fromHome),
      destinationPoint(home, 290, fromHome),
      destinationPoint(home, 320, fromHome),
      destinationPoint(home, 350, fromHome),
    ];
  }

  const handleLocationFound = (e) => {
    // console.log("locationGFound", e);
    if (!home || home[0] !== e.latitude || home[1] !== e.longitude) {
      setHome([e.latitude, e.longitude]);
    }
  };

  return (
    <Map
      onLocationFound={handleLocationFound}
      center={home}
      zoom={zoom}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        accessToken="pk.eyJ1Ijoic3RldmVxIiwiYSI6ImNrZXl2eTEzODAydmwycXA3aHl6ejA4Zm0ifQ.SisK7lNbUyNKkpS3opH_GA"
        id="mapbox/streets-v11"
        maxZoom={18}
      />

      <LocateControl options={locateOptions} />

      {home && <Circle center={home} radius={radius} color="grey" />}

      {nopePoints.map((p, i) => (
        <Marker key={i} position={p} icon={iconDan}>
          <Popup>No getting on the beers with ya mates</Popup>
        </Marker>
      ))}

      {northfacePoints.map((p, i) => (
        <Marker key={i} position={p} icon={iconNorthface}>
          <Popup>It's called "smart casual"</Popup>
        </Marker>
      ))}
    </Map>
  );
};

export default YepNopeMap;
