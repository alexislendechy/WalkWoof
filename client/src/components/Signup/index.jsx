import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import { AuthProvider } from "../../Contexts/AuthContext";
//import {Dashboard} from "../../components/Dashboard.jsx";
import styled from 'styled-components';

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

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  margin: 8px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormLabel = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const SubmitButton = styled.button`
  background-color: #584372;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function SignupComponent(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        owner:fromState.owner,
        walker:fromState.walker,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <SignupContainer>
    <div className="container my-1">
      <AuthProvider></AuthProvider>
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
        <FormLabel htmlFor="firstName">First Name:</FormLabel>
        <FormInput
            placeholder="First"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
        <FormLabel htmlFor="lastName">Last Name:</FormLabel>
          <FormInput
            placeholder="Last"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
        <FormLabel htmlFor="email">Email:</FormLabel>
          <FormInput
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
        <FormLabel htmlFor="pwd">Password:</FormLabel>
          <FormInput
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="owner">Owner:</label>
          <FormInput
            placeholder="Owner"
            name="boton"
            type="radio"
            id="owner"
            onChange={handleChange}
          />
        </div>
        <div className='flex-row space-between my-2'>
          <label htmlFor='walker'>Walker:</label>
          <FormInput
            placeholder='Walker'
            name='boton'
            type='radio'
            id='walker'
            onChange={handleChange}
          />
          </div>
        <div className="flex-row flex-end">
        <SubmitButton type="submit">Submit</SubmitButton>
        </div>
      </form>
    </div>
    
    </SignupContainer>
  );
}


export default SignupComponent;
