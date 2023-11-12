import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [mapInitError, setMapInitError] = useState(null);

  useEffect(() => {
    if (coordinates) {
      setMapInitError(null); // Clear any previous map initialization errors
    }
  }, [coordinates]);

  const handleGeocode = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchText }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const location = results[0].geometry.location;
        setCoordinates(location);
        setMapInitError(null); // Clear any previous map initialization errors
      } else {
        setCoordinates(null);
        setMapInitError(`Geocoding failed: ${status}`);
        console.error("Geocoding failed:", status);
      }
    });
  };

  return (
    <div>
      <h1>MAP</h1>
      <input
        type="text"
        placeholder="Enter an address or location"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleGeocode}>Go to address!</button>

      {mapInitError ? (
        <p>Error initializing the map: {mapInitError}</p>
      ) : coordinates ? (
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
      ) : null}
    </div>
  );
};

export default MapComponent;
