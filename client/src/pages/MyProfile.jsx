import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import PetProfiles from "../components/PetProfiles";
import ProfilePic from "../components/ProfilePic";

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 10px; // Reduce this value
  background-image: linear-gradient(to bottom right, #b88aad, #f7ddb7, #c995aa);
  border-radius: 10px;
  backdrop-filter: blur(15px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  animation: ${gradientAnimation} 10s linear infinite;
`;

const StyledButton = styled(Link)`
  display: inline-block;
  margin-left: 20px;
  padding: 10px 20px;
  color: white;
  background-color: #b88aad;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c995aa;
  }
`;

const ProfilePicContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px; 
`;

const MyProfile = () => {
  return (
    <ProfileContainer>
      <ProfilePicContainer>
        <ProfilePic />
        <StyledButton to="./createpet">Add a new lovable pet!</StyledButton>
      </ProfilePicContainer>
      <PetProfiles/>
    </ProfileContainer>
  );
};

export default MyProfile;