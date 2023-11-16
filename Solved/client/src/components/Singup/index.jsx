import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import styled from 'styled-components';

const SignupContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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

const SignupComponent = () => {
  const [formState, setFormState] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
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
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <SignupForm onSubmit={handleFormSubmit}>
        <div>
          <FormLabel htmlFor="firstName">First Name:</FormLabel>
          <FormInput
            placeholder="First"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel htmlFor="lastName">Last Name:</FormLabel>
          <FormInput
            placeholder="Last"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <FormInput
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel htmlFor="pwd">Password:</FormLabel>
          <FormInput
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div>
          <SubmitButton type="submit">Submit</SubmitButton>
        </div>
      </SignupForm>
    </SignupContainer>
  );
}

export default SignupComponent;