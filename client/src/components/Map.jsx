import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ espaces, onEspaceClick }) => {
  return (
    <MapContainer
      center={[34.020882, -6.84165]} // Centered on Rabat, Morocco
      zoom={15}
      style={{ height: "80vh", width: "100%", zIndex: 0 }}
      className="rounded-md"
    >
      {/* Default OpenStreetMap TileLayer */}
      {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

      {/* Custom TileLayer */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.jawg.io/">Jawg</a> contributors'
      />
      {espaces.map((espace, index) => {
        return (
          <Marker
            eventHandlers={{ click: () => onEspaceClick(espace) }}
            key={index}
            position={espace.position}
          >
            <Popup>{espace.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
