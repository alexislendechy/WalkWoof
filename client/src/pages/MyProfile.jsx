import React from "react";
import styled, { keyframes } from "styled-components";
import WalkerProfile from "../components/WalkerProfile/index.jsx";
import PetProfiles from "../components/PetProfiles";
import MapComponent from "../components/MapComponent";

// Define a keyframe animation for the HomeContainer
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Define a styled container for the Home component with animation
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Adjust the height based on your needs */
  padding: 30px;
  background-image: linear-gradient(to bottom right, #b88aad, #f7ddb7, #c995aa);
  border-radius: 10px;
  backdrop-filter: blur(15px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  animation: ${gradientAnimation} 10s linear infinite;
`;

const MyProfile = () => {
  return (
    <ProfileContainer>
      <MapComponent />
      <WalkerProfile />
    </ProfileContainer>
  );
};

export default MyProfile;
