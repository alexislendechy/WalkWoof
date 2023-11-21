import React from 'react';
import { useQuery } from '@apollo/client';
import {GET_USER_WITH_DOGS}  from '../../utils/queries';
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

const PetProfileView = () => {
  const { loading, error, data } = useQuery(GET_USER_WITH_DOGS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Check if user data exists
  const user = data.user;

  return (
    <SignupContainer>
      <div>
        {user.dogs.length > 0 ? (
          // User has associated pets, display pet information
          <>
            <h2>Pet Profiles</h2>
            {user.dogs.map((dog) => (
              <div key={dog.id}>
                <p>Name: {dog.name}</p>
                <p>Breed: {dog.breed}</p>
                <p>Age: {dog.age}</p>
                <p>Size: {dog.size}</p>
                {/* Include other details you want to display for each pet */}
              </div>
            ))}
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