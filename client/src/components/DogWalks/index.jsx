import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { YOUR_DOG_WALKS_QUERY } from "../../utils/queries";

// Styled components
const DogWalksContainer = styled.div`
  max-height: 400px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    :hover {
      background: #555;
    }
  }
`;

const WalkEntry = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const DogWalksComponent = () => {
  const { loading, error, data } = useQuery(YOUR_DOG_WALKS_QUERY);
  const [dogWalks, setDogWalks] = useState([]);

  useEffect(() => {
    if (data) {
      setDogWalks(data.dogWalks);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <DogWalksContainer>
      {dogWalks.map((walk, index) => (
        <WalkEntry key={index}>
          <p>Username: {walk.username}</p>
          <p>Dog Name: {walk.dogName}</p>
          <p>Address: {walk.address}</p>
          <p>Walk Duration: {walk.walkDuration} minutes</p>
        </WalkEntry>
      ))}
    </DogWalksContainer>
  );
};

export default DogWalksComponent;
