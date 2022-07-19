import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map() {
  return (
    <div>
    <MapContainer center={[40.7189, -73.9990]} zoom={16} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[40.7189, -73.9990]}><Popup>MyMarpet Veterinary Center</Popup></Marker>
    </MapContainer>

  </div>  )
}
