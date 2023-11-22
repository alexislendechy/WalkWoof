import React from 'react';
import { useQuery } from '@apollo/client';
import {GET_USER}  from '../../utils/queries';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthService from '../../utils/auth.js';
import defaultImage from '../../assets/DogPlaceholder.svg';
import { DELETE_PET } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const SignupContainer = styled.div`
  max-width: 90%;
  margin: auto;
  margin-top: 80px;
  margin-bottom: 80px;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 40px rgba(255, 165, 0, 0.7);

`;

const PetContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

const PetCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
`;

const PetImage = styled.img`
  width: 200px;
  height: auto;
  object-fit: cover;
`;

const PetProfileView = () => {
  //console.log("PetProfileView rendered");

  const [deletePet] = useMutation(DELETE_PET);

  const handleDeletePet = async (petId) => {
    try {
      await deletePet({ variables: { petId } });
      refetch(); // Re-fetch the data after deleting a pet
    } catch (err) {
      console.error(err);
    }
  };


  const userId = AuthService.getUserId();
  //console.log("UserId:", userId);
  const { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: { id: userId },
  });
 console.log("Query executed, data:", data);
  if (!data) {
    //console.log("No data returned from query"); 
  }
  if (loading) return <p>Loading...</p>;
  if (error) {
    //console.log("Error loading data:", error); 
    return <p>Error: {error.message}</p>;
  }
  

  // Check if user data exists
  const user = data.user;
  //console.log("User data:", user); 

  return (
    <SignupContainer>
      <div>
        {user && user.dogs && user.dogs.length > 0 ? (
          <>
            <h2>Pet Profiles</h2>
            <PetContainer>
              {user.dogs.map((dog) => (
                <PetCard key={dog.id}>
                  <PetImage src={dog.petImage || defaultImage} alt={dog.petName} />
                    <p>Name: {dog.petName}</p>
                    <p>Breed: {dog.petBreed}</p>
                    <p>Age: {dog.petAge}</p>
                    <p>Size: {dog.petSize}</p>
                    <button onClick={() => handleDeletePet(dog.id)}>Delete</button>
                </PetCard>
              ))}
            </PetContainer>
          </>
        ) : (
          // User has no associated pets, display message to create a new profile
          <div>
            <p>No pet profiles found.</p>
            <Link to="/profile/createpet">
              <p>Create a new pet profile to get started!</p>
            </Link>
            {/* You can include a link or button to navigate to the create pet profile page */}
          </div>
        )}
      </div>
    </SignupContainer>
  );
};

export default PetProfileView;