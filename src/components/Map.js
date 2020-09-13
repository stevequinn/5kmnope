//
// File: src/components/Map.js
//
import React from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { destinationPoint } from "../utils/geo";

const nopeUrl = "nope.jpg";

const iconDan = new L.Icon({
  iconUrl: nopeUrl,
  iconRetinaUrl: nopeUrl,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(80, 105),
  className: "leaflet-div-icon",
});

const YepNopeMap = ({ home = null }) => {
  const zoom = 12;

  const radius = 5 * 10 * 10 * 10; // 5km

  // const [yeps, setYeps] = useState([]);
  // const [nopes, setNopes] = useState([]);

  // const topLeftCourner = [-37.793586, 144.996614];
  // const bottomRightCourner = [-37.833996, 145.063115];
  // const destPoint = destinationPoint(home, 90, 5.6);

  const fromHome = 6.5;
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

  return (
    <Map center={home} zoom={zoom} style={{ height: "calc(100vh - 60px)" }}>
      <TileLayer
        attribution='Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        accessToken="pk.eyJ1Ijoic3RldmVxIiwiYSI6ImNrZXl2eTEzODAydmwycXA3aHl6ejA4Zm0ifQ.SisK7lNbUyNKkpS3opH_GA"
        id="mapbox/streets-v11"
        maxZoom={18}
      />

      {home && (
        <div>
          <Circle center={home} radius={radius} />
          <Marker position={home}>
            <Popup>No getting on the beers with ya mates</Popup>
          </Marker>
        </div>
      )}

      {nopePoints.map((p) => (
        <Marker position={p} icon={iconDan} />
      ))}

      {/* <ImageOverlay
        bounds={[topLeftCourner, bottomRightCourner]}
        url={nopeUrl}
        opacity={0.8}
      ></ImageOverlay> */}
    </Map>
  );
};

export default YepNopeMap;
