import React, { useState } from 'react';

import { AuthProvider } from "./../Contexts/AuthContext";
import CreatePet from '../components/CreatePet';







const CreatePetProfile = () => {
  return (
        <AuthProvider>
        <CreatePet/>
        </AuthProvider>
  );
}

export default CreatePetProfile;


