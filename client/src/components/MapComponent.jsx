import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = () => {
  // States for the first address
  const [searchText1, setSearchText1] = useState("");
  const [coordinates1, setCoordinates1] = useState(null);

  // States for the second address
  const [searchText2, setSearchText2] = useState("");
  const [coordinates2, setCoordinates2] = useState(null);

  const [mapInitError, setMapInitError] = useState(null);

  // clear map initialization error when coordinates are updated
  useEffect(() => {
    if (coordinates1 || coordinates2) {
      setMapInitError(null); // Clear any previous map initialization errors
    }
  }, [coordinates1, coordinates2]);

  // Function to handle geocoding for both addresses
  const handleGeocode = (address, setCoordinates) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
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

  return (
    <div>
      <h1>MAP</h1>
      <div>
        <input
          type="text"
          placeholder="Enter first address or location"
          value={searchText1}
          onChange={(e) => setSearchText1(e.target.value)}
        />
        <button onClick={() => handleGeocode(searchText1, setCoordinates1)}>
          Go to first address!
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter second address or location"
          value={searchText2}
          onChange={(e) => setSearchText2(e.target.value)}
        />
        <button onClick={() => handleGeocode(searchText2, setCoordinates2)}>
          Go to second address!
        </button>
      </div>

      {mapInitError ? (
        <p>Error initializing the map: {mapInitError}</p>
      ) : (
        <MapContainer
          center={
            coordinates1 || coordinates2
              ? {
                  lat: (coordinates1 || coordinates2).lat(),
                  lng: (coordinates1 || coordinates2).lng(),
                }
              : { lat: 0, lng: 0 }
          }
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {coordinates1 && (
            <Marker
              position={{ lat: coordinates1.lat(), lng: coordinates1.lng() }}
            >
              <Popup>
                Location 1: {searchText1} <br />
                Coordinates: {coordinates1.lat()}, {coordinates1.lng()}
              </Popup>
            </Marker>
          )}
          {coordinates2 && (
            <Marker
              position={{ lat: coordinates2.lat(), lng: coordinates2.lng() }}
            >
              <Popup>
                Location 2: {searchText2} <br />
                Coordinates: {coordinates2.lat()}, {coordinates2.lng()}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
