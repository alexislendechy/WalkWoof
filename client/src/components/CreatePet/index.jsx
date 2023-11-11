import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PET_PROFILE } from '../utils/mutations';

const PetProfile = () => {
  // State to store the pet profile data
  const [petProfile, setPetProfile] = useState({
    name: '',
    breed: '',
    age: '',
    size: '', 
  });

  // Mutation to add a new pet profile
  const [addPetProfile, { error }] = useMutation(ADD_PET_PROFILE);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetProfile({
      ...petProfile,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a GraphQL mutation to add a new pet profile
      const { data } = await addPetProfile({
        variables: {
          input: { ...petProfile },
        },
      });

      // Handle success
      console.log('Pet profile added successfully:', data);
      // Optionally, you can reset the form or navigate to another page
      setPetProfile({
        name: '',
        breed: '',
        age: '',
        size: '', 
      });
    } catch (mutationError) {
      // Handle errors
      console.error('Error adding pet profile:', mutationError.message);
      // Display an error message to the user or take appropriate action
    }
  };

  return (
    <div className="container">
      <h2>Add Pet Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={petProfile.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="breed">Breed:</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={petProfile.breed}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            value={petProfile.age}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="size">Size:</label>
          <input
            type="text"
            id="size"
            name="size"
            value={petProfile.size}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <button type="submit">Add Pet Profile</button>
        </div>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default PetProfile;