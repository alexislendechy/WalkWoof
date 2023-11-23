import React from "react";
import styled from "styled-components";
import MapComponent from "../components/MapComponent";
import Banner from "../components/Banner";

//import DogWalksComponent from "../components/DogWalks";

// Home container with vertical layout
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-image: linear-gradient(to bottom right, #b88aad, #f7ddb7, #c995aa);
  border-radius: 10px;
  backdrop-filter: blur(15px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

// Container for the main content area (Sidebar and Map)
const MainContent = styled.div`
  display: flex;
  justify-content: center; // Center the children horizontally
  align-items: center; // Center the children vertically
  flex-grow: 1; // Allows the main content to fill the remaining space
`;

const MapArea = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Banner />
      <MainContent></MainContent>
    </HomeContainer>
  );
};

export default Home;
