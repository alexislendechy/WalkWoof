import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_ADDRESS } from "../utils/mutations";
import Auth from "../utils/auth";

// Component to update map center
const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

const MapComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [mapInitError, setMapInitError] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState("");

  useEffect(() => {
    if (coordinates) {
      setMapInitError(null);
    }
  }, [coordinates]);

  const handleGeocode = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const location = results[0].geometry.location;
        setCoordinates({ lat: location.lat(), lng: location.lng() });
        setFormattedAddress(results[0].formatted_address);
      } else {
        setCoordinates(null);
        setMapInitError(`Geocoding failed: ${status}`);
        console.error("Geocoding failed:", status);
      }
    });
  };

  const [saveAddress] = useMutation(UPDATE_USER_ADDRESS);

  const handleSaveAddress = async () => {
    const token = Auth.getToken();
    const profile = Auth.getProfile();
    const userId = profile.authenticatedPerson._id;

    try {
      await saveAddress({
        variables: {
          id: userId,
          address: formattedAddress,
        },
      });
      console.log("Address saved successfully.");
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div>
      <h1>MAP</h1>
      <div>
        <input
          type="text"
          placeholder="Enter an address or location"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={() => handleGeocode(searchText)}>
          Go to address!
        </button>
        <button onClick={handleSaveAddress}>Save Address</button>
      </div>

      {mapInitError ? (
        <p>Error initializing the map: {mapInitError}</p>
      ) : (
        <MapContainer
          center={coordinates || { lat: 0, lng: 0 }}
          zoom={13}
          style={{ height: "400px", width: "600px" }}
        >
          <ChangeView center={coordinates || { lat: 0, lng: 0 }} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {coordinates && (
            <Marker position={coordinates}>
              <Popup>
                Address: {searchText} <br />
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
