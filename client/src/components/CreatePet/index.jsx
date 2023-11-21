import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PET_PROFILE } from '../../utils/mutations';
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

const FormInput = styled.input`
font-size: 16px;
  margin: 8px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormSelect = styled.select`
  margin: 8px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const FormLabel = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
`;

const SubmitButton = styled.button`
  background-color: #584372;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PetProfile = () => {
  // State to store the pet profile data
  const [petProfile, setPetProfile] = useState({
    name: '',
    breed: '',
    age: '',
    size: 'Small',
    gender: '', 
    description: '', 
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
          petName: petProfile.name,
          petBreed: petProfile.breed,
          petAge: parseInt(petProfile.age, 10),
          petSize: petProfile.size,
          petGender: petProfile.gender,
          petDescription: petProfile.description,
          petImage: petProfile.image,
        },
      });

      // Handle success
      console.log("Pet profile added successfully:", petProfile);

      setPetProfile({
        name: '',
        breed: '',
        age: '',
        size: 'Small',
        gender: '',
        description: '',
        image: '',
      });
    } catch (mutationError) {
      // Handle errors
      console.error('Error adding pet profile:', mutationError.message);
      // Display an error message to the user or take appropriate action
    }
  };

  return (
    <SignupContainer>
      <div className="container">
        <h2>Add Pet Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <FormInput
              type="text"
              id="name"
              name="name"
              value={petProfile.name}
              onChange={handleInputChange}
              placeholder="Name of your friend"
            />
          </div>
          <div>
            <FormLabel htmlFor="breed">Breed:</FormLabel>
            <FormInput
              type="text"
              id="breed"
              name="breed"
              value={petProfile.breed}
              onChange={handleInputChange}
              placeholder="Ex= Chihuahua"
            />
          </div>
          <div>
            <FormLabel htmlFor="age">Age:</FormLabel>
            <FormInput
              type="text"
              id="age"
              name="age"
              value={petProfile.age}
              onChange={handleInputChange}
              placeholder="Only use numbers"
            />
          </div>
          <div>
          <div>
  <FormLabel htmlFor="size">Size:</FormLabel>
  <FormSelect
        id="size"
        name="size"
        value={petProfile.size}
        onChange={handleInputChange}
        
      >
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Big">Big</option>
        <option value="Giant">Giant</option>
        
      </FormSelect>
</div>
            <FormLabel htmlFor="gender">Gender:</FormLabel>
            <FormInput
              type="text"
              id="gender"
              name="gender"
              value={petProfile.gender}
              onChange={handleInputChange}
              placeholder="Gender of your pet"
            />
          </div>
          <div>
            <FormLabel htmlFor="description">Description:</FormLabel>
            <FormInput
              type="text"
              id="description"
              name="description"
              value={petProfile.description}
              onChange={handleInputChange}
              placeholder="Tell us more about your pet"
            />
          </div>
          <div>
            <FormLabel htmlFor="image">Image:</FormLabel>
            <FormInput
              type="text"
              id="image"
              name="image"
              value={petProfile.image}
              onChange={handleInputChange}
              placeholder="Upload a picture"
            />
          </div>

          <div>
            <SubmitButton type="submit">Add pet profile!</SubmitButton>
          </div>
        </form>
        {error && <p>Error: {error.message}</p>}
      </div>
    </SignupContainer>
  );
};

export default PetProfile;