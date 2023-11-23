import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../utils/queries.js";
import styled from "styled-components";
import defaultImg from "../../assets/default.webp";
import Auth from "../../utils/auth.js";
import { Link } from "react-router-dom";

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
const StyledButton = styled(Link)`
display: inline-block;
margin: 10px;
padding: 10px 20px;
border-radius: 15px;
color: white;
background: rgba(97, 76, 127, 0.6); 
border: 2px solid rgba(255, 255, 255, 0.5);
box-shadow: 0 0 10px rgba(97, 76, 127, 0.5); 
backdrop-filter: blur(4px);
-webkit-backdrop-filter: blur(4px);
transition: all 0.3s ease;
font-weight: bold;
&:hover {
  background: rgba(97, 76, 127, 0.8); 
}
text-decoration: none;
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
  const profile = Auth.getProfile();
  const userId = profile.authenticatedPerson._id;

  //console.log("Token:", token); // Debug log - render
  //console.log("Profile:", profile); // Debug log - get an object
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId,
  });

  //console.log("GraphQL Query Loading:", loading); // Debug log - check loading status
  //console.log("GraphQL Query Error:", error); // Debug log - check for errors
 // console.log("GraphQL Query Data:", data); // Debug log - check received data

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("GraphQL Error:", error); // Detailed error log
    return <p>Error: {error.message}</p>;
  }

  const user = data?.user;

  return (
    <ProfileCardContainer>
      <ProfileImage
        src={user?.imageUrl || defaultImg}
        alt={`${user?.username}'s profile`}
      />
      <ProfileName>Name: {user?.username}</ProfileName>
      <ProfileRole>Role: {user?.role}</ProfileRole>
    </ProfileCardContainer>
  );
};

export default ProfileCard;
