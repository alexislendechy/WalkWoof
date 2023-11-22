import React from "react";
import styled, { keyframes } from "styled-components";
import MapComponent from "../components/MapComponent";
import NavigationBar from "../components/DogWalksSchedule";
//import DogWalksComponent from "../components/DogWalks";

// Keyframe animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Home container with vertical layout
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-image: linear-gradient(to bottom right, #b88aad, #f7ddb7, #c995aa);
  border-radius: 10px;
  backdrop-filter: blur(15px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  animation: ${gradientAnimation} 10s linear infinite;
`;

// Container for the main content area (Sidebar and Map)
const MainContent = styled.div`
  display: flex;
  flex-grow: 1; // Allows the main content to fill the remaining space
`;

const Sidebar = styled.div`
  width: 250px;
  overflow-y: auto;
  height: 100%;
  // ... additional sidebar styles ...
`;

const MapArea = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  // ... additional map area styles ...
`;

const Home = () => {
  return (
    <HomeContainer>
      <NavigationBar />
      <MainContent>
        <Sidebar></Sidebar>
        <MapArea>
          <MapComponent />
        </MapArea>
      </MainContent>
    </HomeContainer>
  );
};

export default Home;
