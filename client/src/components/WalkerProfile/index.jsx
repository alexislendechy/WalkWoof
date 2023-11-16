import React from 'react';
import { useQuery } from '@apollo/client';
//import { GET_WALKER_PROFILE } from '../utils/queries';
import styled, { keyframes } from 'styled-components';

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

const WalkerProfileView = ({ walkerId }) => {
  // Use a GraphQL query to fetch walker profile information
  const { loading, error, data } = useQuery(GET_WALKER_PROFILE, {
    variables: { walkerId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const walker = data.getWalkerProfile;

  return (
    <ProfileContainer>
      <h2>Walker Profile</h2>
      <p>Name: {walker.name}</p>
      <p>Email: {walker.email}</p>
    </ProfileContainer>
  );
};

export default WalkerProfileView;