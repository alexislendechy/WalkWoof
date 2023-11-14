import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_OWNER_PROFILE } from '../utils/mutations';

const OwnerProfile = () => {
  // State to store the owner profile data
  const [ownerProfile, setOwnerProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '', // Added address property
  });

  // Mutation to add a new owner profile
  const [addOwnerProfile, { error }] = useMutation(ADD_OWNER_PROFILE);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOwnerProfile({
      ...ownerProfile,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a GraphQL mutation to add a new owner profile
      const { data } = await addOwnerProfile({
        variables: {
          input: { ...ownerProfile },
        },
      });

      // Handle success
      console.log('Owner profile added successfully:', data);
      // Optionally, you can reset the form or navigate to another page
      setOwnerProfile({
        name: '',
        email: '',
        phone: '',
        address: '', // Reset address along with other fields
      });
    } catch (mutationError) {
      // Handle errors
      console.error('Error adding owner profile:', mutationError.message);
      // Display an error message to the user or take appropriate action
    }
  };

  return (
    <div className="container">
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
    </div>
  );
};

export default OwnerProfile;