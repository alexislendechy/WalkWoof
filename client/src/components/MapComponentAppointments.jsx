import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { GET_ALL_APPOINTMENTS } from "../../src/utils/queries";
import AuthService from "../../src/utils/auth";
import jwt_decode from "jwt-decode";
import "leaflet/dist/leaflet.css";

const MapComponentAppointments = () => {
  const token = AuthService.getToken();
  const decodedToken = jwt_decode(token);
  const userId = AuthService.getUserId();
  const { loading, error, data } = useQuery(GET_ALL_APPOINTMENTS, {
    variables: { id: userId },
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (data && data.getAllAppointments) {
      data.getAllAppointments.forEach((appointment) => {
        geocodeAddress(appointment.address, (location) => {
          setMarkers((prevMarkers) => [
            ...prevMarkers,
            {
              lat: location.lat(),
              lng: location.lng(),
              popupText: `Appointment: ${appointment.date} ${appointment.time} - Address: ${appointment.address}`,
            },
          ]);
        });
      });
    }
  }, [data]);

  const geocodeAddress = (address, callback) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const location = results[0].geometry.location;
        callback(location);
      } else {
        console.error("Geocoding failed:", status);
      }
    });
  };

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  return (
    <MapContainer
      center={[45, -73]}
      zoom={13}
      style={{ height: "400px", width: "600px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]}>
          <Popup>{marker.popupText}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponentAppointments;
