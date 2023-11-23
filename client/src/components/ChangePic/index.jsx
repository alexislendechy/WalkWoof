import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PET_PROFILE } from '../../utils/mutations';
import styled from 'styled-components';
import AuthService from '../../utils/auth.js';
import ChangePofilePic from '../../pages/ChangePic.jsx';
import Axios from 'axios';
import Auth from '../../utils/auth.js';
const SignupContainer = styled.div`
  max-width: 400px;
  margin: auto;
  margin-top: 80px;
  margin-bottom: 80px;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 40px rgba(80, 58, 92, 2);
`;

const FormInput = styled.input`
font-size: 16px;
  margin: 8px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormSelect = styled.select`
  margin: 8px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const FormLabel = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
`;

const SubmitButton = styled.button`
  background-color: #584372;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const ChangeProfilePic = async (e) => {
   const formData = new FormData();
   formData.append("file", files[0]);
   formData.append("upload_preset", "befjjxh8");

   Axios.post("https://api.cloudinary.com/v1_1/dablecji0/image/upload", formData).then((response) => {
       console.log(response);
});
    return(

   
    <div> 
        <input type="file" onChange={(e)=> {
            ChangeProfilePic(e.target.files)}}/>
    </div>
    
    )
        };

export default ChangeProfilePic;