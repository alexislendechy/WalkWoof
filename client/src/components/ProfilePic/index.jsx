import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../utils/queries';
import styled from 'styled-components';
import defaultimg from "../../assets/blank-profile-picture-973460_960_720.webp";
import Auth from '../../utils/auth';


const ProfileCardContainer = styled.div`
  height: 30vh;
  max-width: 400px;
  margin: auto;
  margin-top: 80px;
  margin-bottom: 80px;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 40px rgba(80, 58, 92, 2);
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover; 
  margin-bottom: 8px;
`;

const ProfileName = styled.h2`
  margin: 10px 0 5px;
`;

const ProfileRole = styled.p`
  margin: 0;
  color: #666;
`;



const ProfileCard = () => {
  const token = Auth.getToken();
  const { data } = useQuery(GET_USER, {
    variables: {
      token,
    },
  });

  let user;

  if (data) {
    user = data.user;
  }

  return (
    <ProfileCardContainer>
      <ProfileImage
        src={user?.imageUrl || defaultimg}
        alt={`${user?.name}'s profile`}
      />
      <ProfileName>Name: {user?.name}</ProfileName>
      <ProfileRole>Role: {user?.role}</ProfileRole>
    </ProfileCardContainer>
  );
};

export default ProfileCard;