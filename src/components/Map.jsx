import React from 'react'
import { MapContainer, TileLayer, Marker, Popup,Circle} from 'react-leaflet'
import './Map.css'
import {showDataOnMap} from '../util'

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
