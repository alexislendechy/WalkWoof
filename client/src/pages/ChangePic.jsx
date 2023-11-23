import React, { useState } from 'react';
import { AuthProvider } from "./../Contexts/AuthContext";
import ChangePic from '../components/ChangePic';








const ChangeProfilePic = () => {
  return (
        <AuthProvider>
        <ChangePic/>
        </AuthProvider>
  );
}

export default ChangeProfilePic;
