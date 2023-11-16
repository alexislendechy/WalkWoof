import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

const StyledMapContainer = styled(MapContainer)`
  height: 500px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  min-width: 66.67%;
  max-width: 66.67%;
`;

const MapComponent = () => {
  const position = [51.505, -0.09]; // Example latitude and longitude

  return (
    <StyledMapContainer center={position} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </StyledMapContainer>
  );
};

export default MapComponent;