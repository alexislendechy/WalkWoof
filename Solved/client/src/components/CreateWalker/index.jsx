import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_WALKER_PROFILE } from '../../utils/mutations';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 66.67%; /* 2/3 of the page width */
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  form {
    display: flex;
    flex-direction: column;

    div {
      margin-bottom: 20px;

      label {
        margin-bottom: 8px;
        font-weight: bold;
      }

      input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
      }
    }

    button {
      background-color: white;
      color: #8a2be2; /* Purple color */
      padding: 10px;
      border: 1px solid #8a2be2;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background-color: #8a2be2; /* Darker purple */
        color: white;
      }
    }
  }
`;

const WalkerProfile = () => {
  const [walkerProfile, setWalkerProfile] = useState({
    name: '',
    experience: '',
    location: '',
  });

  const [addWalkerProfile, { error }] = useMutation(ADD_WALKER_PROFILE);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWalkerProfile({
      ...walkerProfile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addWalkerProfile({
        variables: {
          input: { ...walkerProfile },
        },
      });

      console.log('Walker profile added successfully:', data);

      setWalkerProfile({
        name: '',
        experience: '',
        location: '',
      });
    } catch (mutationError) {
      console.error('Error adding walker profile:', mutationError.message);
    }
  };

  return (
    <FormContainer>
      <h2>Add Walker Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={walkerProfile.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="experience">Experience:</label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={walkerProfile.experience}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={walkerProfile.location}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <button type="submit">Add Walker Profile</button>
        </div>
      </form>
      {error && <p>Error: {error.message}</p>}
    </FormContainer>
  );
};

export default WalkerProfile;