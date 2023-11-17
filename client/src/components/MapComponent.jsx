import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styled from "styled-components";

const StyledMapContainer = styled(MapContainer)`

  height: 500px; 
  padding: 30px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  min-width: 66.67%;
  max-width: 66.67%;
`;


const StyledButton = styled.button`
button {
  background-color: white;
  color: #8a2be2; 
  padding: 8px 12px;
  border: 1px solid #8a2be2;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #8a2be2; 
  color: white;
}
`;

const MapComponent = () => {
  /////////////////////////////////
  // States
  /////////////////////////////////
  const [searchText, setSearchText] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [mapInitError, setMapInitError] = useState(null);
  /////////////////////////////////
  // clear map initialization error when coordinates are updated
  /////////////////////////////////
  useEffect(() => {
    if (coordinates) {
      setMapInitError(null); // Clear any previous map initialization errors
    }
  }, [coordinates]);
  /////////////////////////////////
  // Function to handle geocoding based on search text
  /////////////////////////////////
  const handleGeocode = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchText }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const location = results[0].geometry.location;
        setCoordinates(location); // Update state with new coordinates
      } else {
        setCoordinates(null);
        setMapInitError(`Geocoding failed: ${status}`); // Set error state if geocoding fails
        console.error("Geocoding failed:", status);
      }
    });
  };
  /////////////////////////////////
  // Render
  /////////////////////////////////
  return (
    <StyledMapContainer
      center={{ lat: coordinates?.lat() || 0, lng: coordinates?.lng() || 0 }}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <div>
        <h1>MAP</h1>
        <input
          type="text"
          placeholder="Enter an address or location"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <StyledButton onClick={handleGeocode}>Go to address!</StyledButton>

        {mapInitError ? (
          <p>Error initializing the map: {mapInitError}</p>
        ) : coordinates ? (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={{ lat: coordinates.lat(), lng: coordinates.lng() }}>
              <Popup>
                Location: {searchText} <br />
                Coordinates: {coordinates.lat()}, {coordinates.lng()}
              </Popup>
            </Marker>
          </>
        ) : null}
      </div>
    </StyledMapContainer>
  );
};

// Exporting MapComponent for use in other parts of the application
export default MapComponent;