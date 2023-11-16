import React from 'react';
import styled from 'styled-components';

const BannerContainer = styled.div`
  background-color: #fd7e14; 
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const Banner = () => {
  return (
    <BannerContainer>
      <h2>Welcome to our Dog Walking App!</h2>
      <p>Your furry friends will love it here.</p>
    </BannerContainer>
  );
};

export default Banner;