import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PET_PROFILES_BY_OWNER } from '../graphql/queries'; // Replace with your actual GraphQL query

import PetProfile from '../../components/PetProfiles/PetProfile';

const PetOwnerDashboard = () => {
  const authContext = useContext(AuthContext);

  // Use the authenticated user's ID from the context
  const petOwnerId = authContext.user.id;
  
  // Use Apollo Client's useQuery hook to fetch pet profiles
  const { loading, error, data } = useQuery(GET_PET_PROFILES_BY_OWNER, {
    variables: { ownerId: petOwnerId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const petOwnerPetProfiles = data.petProfilesByOwner;

  return (
    <div>
      <h2>Pet Owner Dashboard</h2>
      <div style={styles.petProfilesContainer}>
        {petOwnerPetProfiles.map((profile) => (
          <PetProfile key={profile.id} {...profile} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  petProfilesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
};

export default PetOwnerDashboard;