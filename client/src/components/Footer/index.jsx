import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #584372; 
  color: #fff; 
  padding: 10px;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2023 WalkWoof. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;