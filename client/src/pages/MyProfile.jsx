import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import PetProfiles from "../components/PetProfiles";
import ProfilePic from "../components/ProfilePic";
import MapComponent from "../components/MapComponent";
import ScheduleWalk from "../components/DogWalksSchedule";

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


const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column; // Change this back to column
  align-items: center; // Align items to the center
  justify-content: space-around; // Add some space around the items
  padding: 10px; 
  background-image: linear-gradient(to bottom right, #b88aad, #f7ddb7, #c995aa);
  border-radius: 10px;
  backdrop-filter: blur(15px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  animation: ${gradientAnimation} 10s linear infinite;
`;

const TopContainer = styled.div`
  display: flex;
  
  flex-direction: row; 
  align-items: start; 
  justify-content: space-around; 
  width: 100%; 
  border: 5px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px); 
      @media (max-width: 900px) {
        flex-direction: column; 
        align-items: center; 
      }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around; 
  width: 100%; 
`;

const StyledButton = styled(Link)`
  display: flex;
  flex: 1; // This will make the buttons the same size
  justify-content: center; // Center the text within the buttons
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

const MapArea = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%; 
`;

const ProfilePicContainer = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center; 
  padding-left: 10px; 
`;

const MyProfile = () => {
  return (
    <ProfileContainer>
      
      <TopContainer>
        <ProfilePicContainer>
          <ProfilePic />
          <ButtonContainer>
          <StyledButton to="./changePic`">Upload a profile picture!</StyledButton>
          <StyledButton to="./createpet">Add a new lovable pet!</StyledButton>
          <ScheduleWalk />
          </ButtonContainer>
        </ProfilePicContainer>
        <MapArea>
            <MapComponent />
        </MapArea>
      </TopContainer>
      <PetProfiles/>
    </ProfileContainer>
  );
};

export default MyProfile;