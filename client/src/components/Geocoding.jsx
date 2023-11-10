import React, { useState } from "react";

const Geocoding = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const handleGeocode = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const location = results[0].geometry.location;
        setCoordinates(location);
      } else {
        console.error("Geocoding failed:", status);
      }
    });
  };

  return (
    <div>
      <h1>Geocoding Example</h1>
      <input
        type="text"
        placeholder="Enter an address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleGeocode}>Geocode</button>
      {coordinates && (
        <div>
          <p>Latitude: {coordinates.lat()}</p>
          <p>Longitude: {coordinates.lng()}</p>
        </div>
      )}
    </div>
  );
};

export default Geocoding;
