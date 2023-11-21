import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PET_PROFILES } from '../../utils/queries';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SignupContainer = styled.div`
  max-width: 400px;
  margin: auto;
  margin-top: 80px;
  margin-bottom: 80px;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 40px rgba(80, 58, 92, 2);
`;


const PetProfileView = ({ petId }) => {
  const { loading, error, data } = useQuery(GET_PET_PROFILES, {
    variables: { petId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Check if pet data exists
  const pet = data.getPetProfiles.find((profile) => profile._id === petId);;

  return (
    <SignupContainer>
    <div>
      {pet ? (
        // Pet profile exists, display information
        <>
          <h2>Pet Profile</h2>
          <p>Name: {pet.name}</p>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
          <p>Size: {pet.size}</p>
          <p>Picture: {pet.image}</p>
          {/* Include other details you want to display */}
        </>
      ) : (
        // Pet profile doesn't exist, display message to create a new profile
        <div>
          <p>No pet profile found for the provided ID.</p>
          <Link to="/profile/createpet">  <p>Create a new pet profile to get started!</p> </Link>
          {/* You can include a link or button to navigate to the create pet profile page */}
        </div>
      )}
    </div>
    </SignupContainer>
  );
};

export default PetProfileView;
