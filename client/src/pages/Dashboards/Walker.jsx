// WalkerDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PetProfile from '../../components/PetProfiles';
//import { useUser } from '../../context/UserContext';

const WalkerDashboard = () => {
  const [walkerPetProfiles, setWalkerPetProfiles] = useState([]);
  const {walkerId} = useUser();

  // Use useEffect to fetch walker-specific pet profiles when the component mounts
  useEffect(() => {
    axios.get(`/api/petProfiles/walker/${walkerId}`)
      .then(response => setWalkerPetProfiles(response.data))
      .catch(error => console.error(error));
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <h2>Walker Dashboard</h2>
      <div style={styles.petProfilesContainer}>
        {walkerPetProfiles.map((profile) => (
          <PetProfile key={profile._id} {...profile} />
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

export default WalkerDashboard;