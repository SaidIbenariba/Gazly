import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ espaces, onEspaceClick }) => {
  const demoFactoryLocations = [
    { position: [34.030795, -6.842883], name: "Factory 1", id: 1 },
    { position: [34.023431, -6.855104], name: "Factory 2", id: 2 },
    { position: [34.022029, -6.817465], name: "Factory 3" },
    { position: [34.0123, -6.8245], name: "OMCo Factory" },
  ];
  return (
    <MapContainer
      center={[34.020882, -6.84165]} // Centered on Rabat, Morocco
      zoom={15}
      style={{ height: "80vh", width: "100%" }}
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
