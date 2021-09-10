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
const sandwichIconUrl = "sandwich.png";
const bagelIconUrl = "Bagel.png";

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

const iconSandwich = new L.Icon({
    iconUrl: sandwichIconUrl,
    iconRetinaUrl: sandwichIconUrl,
    iconAnchor: null,
    popupAnchor: [0, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(35, 35),
    className: "leaflet-div-icon",
});

const iconBagel = new L.Icon({
    iconUrl: bagelIconUrl,
    iconRetinaUrl: bagelIconUrl,
    iconAnchor: null,
    popupAnchor: [0, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(35, 35),
    className: "leaflet-div-icon",
});

const points = [
    {
        position: [-37.82491, 144.949317],
        icon: iconNorthface,
        description: 'It\'s called "smart casual"',
    },
    {
        position: [-37.814895, 144.963516],
        icon: iconNorthface,
        description: 'It\'s called "smart casual"',
    },
    {
        position: [-37.885037, 145.083173],
        icon: iconNorthface,
        description: 'It\'s called "smart casual"',
    },
    {
        position: [-37.799995298800965, 144.99559581361126],
        icon: iconSandwich,
        title: "Kelso's Sandwich Shoppe",
        description: "Pickle Rick Vic Park munchies",
        href: "http://www.kelsossandwiches.com/"
    },
    {
        position: [-37.81351762529069, 145.00468061534366],
        icon: iconSandwich,
        title: "Hector's Deli",
        description: "For that post lunch snooze feelz",
        href: "https://www.hectorsdeli.com.au/"
    },
    {
        position: [-37.797579081635845, 144.9847067271033],
        icon: iconSandwich,
        title: "Slamwich",
        description: "One day, you will be open. One day.",
    },
    {
        position: [-37.79666617330969, 144.97903595541453],
        icon: iconSandwich,
        title: "Nico's Sandwich Deli",
        description: "The orig",
        href: "https://www.nicos.melbourne/"
    },
    {
        position: [-37.817603758389346, 144.99349462473182],
        icon: iconBagel,
        title: "Bissel B.",
        description: "Bissel's the Best, Bub",
        href: "https://www.bisselbbagels.com.au/"
    },
];

const locateOptions = {
    position: "topleft",
    keepCurrentZoomLevel: true,
    flyTo: true,
    // drawCircle: false,
    strings: {
        title: "C'mon Danny Boi, where can I go?",
        popup: "Only five reasons to leave home. Just don't ask what they are.",
    },
};

const YepNopeMap = ({ initialLocation = null }) => {
    const [home, setHome] = useState(null);
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
        if (!home) {
            setHome([e.latitude, e.longitude]);
        }
    };

    return (
        <Map
            onLocationFound={handleLocationFound}
            center={home || initialLocation}
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

            {points.map(({ position, icon, title, description, href }, i) => (
                <Marker key={i} position={position} icon={icon}>
                    <Popup>
                        {title && <h3>{title}</h3>}

                        {description && <p>{description}</p>}

                        {href && <p><a href={href} title={title} target="_blank">{href}</a></p>}
                    </Popup>
                </Marker>
            ))}

            {nopePoints.map((p, i) => (
                <Marker key={i} position={p} icon={iconDan}>
                    <Popup>No getting on the beers with ya mates</Popup>
                </Marker>
            ))}
        </Map>
    );
};

export default YepNopeMap;
