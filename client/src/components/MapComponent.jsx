import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_ADDRESS } from "../utils/mutations";
import Auth from "../utils/auth";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  border-radius: 15px;
  color: white;
  background: rgba(97, 76, 127, 0.6); 
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 10px rgba(97, 76, 127, 0.5); 
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  font-weight: bold;
  &:hover {
    background: rgba(97, 76, 127, 0.8); 
  }
  text-decoration: none;
`;

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
    <Container>
      <Title>MAP</Title>
      <div>
        <Input
          type="text"
          placeholder="Enter an address or location"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button onClick={() => handleGeocode(searchText)}>
          Go to address!
        </Button>
        <Button onClick={handleSaveAddress}>Save Address</Button>
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
    </Container>
  );
};

export default MapComponent;
