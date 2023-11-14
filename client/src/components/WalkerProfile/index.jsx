import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_WALKER_PROFILE } from '../utils/queries';

const WalkerProfileView = ({ walkerId }) => {
  // Use a GraphQL query to fetch walker profile information
  const { loading, error, data } = useQuery(GET_WALKER_PROFILE, {
    variables: { walkerId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const walker = data.getWalkerProfile; // Adjust based on your actual GraphQL response structure

  return (
    <div>
      <h2>Walker Profile</h2>
      <p>Name: {walker.name}</p>
      <p>Email: {walker.email}</p>
      {/* Include other details you want to display */}
    </div>
  );
};

export default WalkerProfileView;