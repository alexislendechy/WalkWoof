import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

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
    <div>
      <h1>MAP</h1>
      <input
        type="text"
        placeholder="Enter an address or location"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)} // Update search text as user types
      />
      <button onClick={handleGeocode}>Go to address!</button>

      {mapInitError ? ( //If map initiation fails
        <p>Error initializing the map: {mapInitError}</p>
      ) : //Else
      coordinates ? ( //Are coordinates available?
        <MapContainer
          center={{ lat: coordinates.lat(), lng: coordinates.lng() }}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
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
        </MapContainer>
      ) : //End Map render
      //Else if Map initiation succeed but coordinates are not available render null
      null}
    </div>
  );
};

// Exporting MapComponent for use in other parts of the application
export default MapComponent;
