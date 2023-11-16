import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Create a functional component to update map
function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

const MapComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [mapInitError, setMapInitError] = useState(null);

  useEffect(() => {
    if (coordinates) {
      setMapInitError(null);
    }
  }, [coordinates]);

  const handleGeocode = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchText }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const location = results[0].geometry.location;
        const newCoords = { lat: location.lat(), lng: location.lng() };
        setCoordinates(newCoords);
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
      ) : (
        <MapContainer
          center={coordinates || { lat: 0, lng: 0 }}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          {coordinates && <ChangeMapView coords={coordinates} />}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {coordinates && (
            <Marker position={coordinates}>
              <Popup>
                Location: {searchText} <br />
                Coordinates: {coordinates.lat}, {coordinates.lng}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
