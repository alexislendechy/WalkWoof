import React from "react";
import MapComponent from "./components/MapComponent";
import Geocoding from "./components/Geocoding";

const App = () => {
  return (
    <div>
      <h1>Dog Walking App</h1>
      <MapComponent />
      <Geocoding />
    </div>
  );
};

export default App;
