import React from 'react';
import styled from 'styled-components';
import bannerImage from '../../assets/banner.png';


const BannerContainer = styled.div`
  position: absolute; 
  z-index: -1; 
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column; 
  justify-content: flex-start; 
  align-items: center;
  background-image: url(${bannerImage}); 
  background-size: cover;
  background-position: center; 
  color: #fff;
  font-size: 2em;
  text-align: center;
  opacity: 0.7; 
  padding-top: 20px; 
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