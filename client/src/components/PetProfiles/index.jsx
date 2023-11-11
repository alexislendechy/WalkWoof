import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PET_PROFILE } from '../utils/queries';

const PetProfileView = ({ petId }) => {
  // Use a GraphQL query to fetch pet profile information
  const { loading, error, data } = useQuery(GET_PET_PROFILE, {
    variables: { petId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pet = data.getPetProfile; // Adjust based on your actual GraphQL response structure

  return (
    <div>
      <h2>Pet Profile</h2>
      <p>Name: {pet.name}</p>
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age}</p>
      <p>Size: {pet.size}</p>
      {/* Include other details you want to display */}
    </div>
  );
};

export default PetProfileView;