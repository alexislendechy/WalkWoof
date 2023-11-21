// MapComponent.js
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { UPDATE_USER_ADDRESS } from "../utils/mutations";

const MapComponent = ({ userId }) => {
  const [searchText, setSearchText] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [mapInitError, setMapInitError] = useState(null);
  const [updateUserAddress] = useMutation(UPDATE_USER_ADDRESS);

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
        setCoordinates(location);

        // Call the mutation to update the user's address
        updateUserAddress({
          variables: {
            userId: userId,
            address: searchText,
          },
        }).catch((err) => {
          console.error("Error updating address:", err);
        });
      } else {
        setCoordinates(null);
        setMapInitError(`Geocoding failed: ${status}`);
        console.error("Geocoding failed:", status);
      }
    });
  };

  return (
    <div>
      <h1>Map</h1>
      <input
        type="text"
        placeholder="Enter an address or location"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleGeocode}>Go to Address</button>

      {mapInitError && <p>Error initializing the map: {mapInitError}</p>}
      {coordinates && (
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
      )}
    </div>
  );
};

export default MapComponent;
