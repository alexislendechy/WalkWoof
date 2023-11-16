import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_OWNER_PROFILE } from '../../utils/mutations';
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

const OwnerProfile = () => {
  const [ownerProfile, setOwnerProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [addOwnerProfile, { error }] = useMutation(ADD_OWNER_PROFILE);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOwnerProfile({
      ...ownerProfile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addOwnerProfile({
        variables: {
          input: { ...ownerProfile },
        },
      });

      console.log('Owner profile added successfully:', data);

      setOwnerProfile({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
    } catch (mutationError) {
      console.error('Error adding owner profile:', mutationError.message);
    }
  };

  return (
    <FormContainer>
      <h2>Add Owner Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={ownerProfile.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={ownerProfile.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={ownerProfile.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={ownerProfile.address}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <button type="submit">Add Owner Profile</button>
        </div>
      </form>
      {error && <p>Error: {error.message}</p>}
    </FormContainer>
  );
};

export default OwnerProfile;