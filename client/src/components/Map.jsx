import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const Map = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={15}
      style={{ height: "80vh", width: "100%" }}
      className=" rounded-md"
    >
      <TileLayer url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" />
      <Marker position={[51.505, -0.09]}>
        <Popup>Factory Office</Popup>
      </Marker>
      <Marker position={[51.503, -0.09]}>
        <Popup>Production Area</Popup>
      </Marker>
      <Marker position={[51.507, -0.088]}>
        <Popup>Warehouse</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
