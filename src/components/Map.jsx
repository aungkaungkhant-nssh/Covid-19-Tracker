import React from 'react'
import { MapContainer, TileLayer, Marker, Popup,Circle} from 'react-leaflet'
import './Map.css'
import {showDataOnMap} from '../util'
import { useEffect } from 'react'
import { useState } from 'react'
const casesTypeColors={
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 800,
      },
      recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 1200,
      },
      deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 2000,
      },
}
function Map({countries,casesType,center,zoom}) {
    
    return (
            
            <MapContainer center={center} zoom={zoom} className="map">
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {showDataOnMap(countries,casesType)}
            </MapContainer>
    )
}

export default Map
