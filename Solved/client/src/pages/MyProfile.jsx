import React from 'react';
import styled, { keyframes } from 'styled-components';
import CreateWalker from '../components/CreateWalker';
import CreateOwner from '../components/CreateOwner';
import SearchBar from '../components/SearchBar';

// Define a keyframe animation for the ProfileContainer
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

// Define a styled container for the MyProfile component with animation
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

// Container for the profile components, displayed side by side
const ProfileComponentsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%; /* Ensure full width */
`;

const MyProfile = () => {
  return (
    <ProfileContainer>

      <ProfileComponentsContainer>
        <CreateOwner/>
        <CreateWalker/>
      </ProfileComponentsContainer>
    </ProfileContainer>
  );
};

export default MyProfile;