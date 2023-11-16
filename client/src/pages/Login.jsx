import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: auto;
  margin-top: 80px;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 40px rgba(80, 58, 92, 2);
`;

const LoginForm = styled.form`
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
  &:hover {
    color: #fd7e14; 
  }
`;

const ErrorText = styled.p`
  color: #ff0000;
`;

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <LoginContainer>
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <LoginForm onSubmit={handleFormSubmit}>
        <div>
          <FormLabel htmlFor="email">Email address:</FormLabel>
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
        {error ? (
          <div>
            <ErrorText>The provided credentials are incorrect</ErrorText>
          </div>
        ) : null}
        <div>
          <SubmitButton type="submit">Submit</SubmitButton>
        </div>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
