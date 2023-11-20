import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import CreatePet from '../components/CreatePet';
import styled from 'styled-components';






const CreatePetProfile = () => {
  return (

        <CreatePet/>

  );
}

export default CreatePetProfile;


