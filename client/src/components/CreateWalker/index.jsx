import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_WALKER_PROFILE } from '../utils/mutations';

const WalkerProfile = () => {
  // State to store the walker profile data
  const [walkerProfile, setWalkerProfile] = useState({
    name: '',
    experience: '',
    location: '',
    // Add other properties as needed
  });

  // Mutation to add a new walker profile
  const [addWalkerProfile, { error }] = useMutation(ADD_WALKER_PROFILE);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWalkerProfile({
      ...walkerProfile,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a GraphQL mutation to add a new walker profile
      const { data } = await addWalkerProfile({
        variables: {
          input: { ...walkerProfile },
        },
      });

      // Handle success
      console.log('Walker profile added successfully:', data);
      // Optionally, you can reset the form or navigate to another page
      setWalkerProfile({
        name: '',
        experience: '',
        location: '',
      });
    } catch (mutationError) {
      // Handle errors
      console.error('Error adding walker profile:', mutationError.message);
      // Display an error message to the user or take appropriate action
    }
  };

  return (
    <div className="container">
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
    </div>
  );
};

export default WalkerProfile;