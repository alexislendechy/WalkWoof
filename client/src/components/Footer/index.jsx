import React from "react";
import styled from "styled-components";
import { Contact } from "../Contact/index";

const FooterContainer = styled.footer`
  background-color: #584372;
  color: #fff;
  padding: 10px;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <h3>
        <Contact/>
      </h3>
      <p>&copy; 2023 WalkWoof. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
