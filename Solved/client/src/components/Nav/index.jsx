import React from 'react';
import styled from 'styled-components';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  color: #584372;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 150px;
  margin-right: 10px;
  border-radius: 50%;
`;

const LogoText = styled.h1`
  font-size: 40px;
  margin: 0;
  color: #584372;
`;

const NavLinks = styled.ul`
  list-style: none;
  font-size: 20px;
  margin: 0;
  display: flex;
  flex-direction: row;

  li {
    margin-right: 2rem;

    a {
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease-in-out;
      &:hover {
        color: #fd7e14; 
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    li {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
`;

function Nav() {
  return (
    <NavbarContainer>
      <Logo>
        <Link to="/">
          <LogoImage src={`${import.meta.env.BASE_URL}src/assets/WalkWoof.png`} alt="Logo" />
          <LogoText>Walk Woof</LogoText>
        </Link>
      </Logo>
      <NavLinks>
        {Auth.loggedIn() ? (
          <>
            <li className="mx-1">
              <Link to="/myWalkers!">My trusted walkers!</Link>
            </li>
            <li className="mx-1">
              <Link to="/profile">My Profile</Link>
            </li>
            <li className="mx-1">
              <Link to="/appointments">Appointments</Link>
            </li>
            <li className="mx-1">
              <a href="/" onClick={() => Auth.logout()}>Logout</a>
            </li>
          </>
        ) : (
          <>
            <li className="mx-1">
              <Link to="/signup">Signup</Link>
            </li>
            <li className="mx-1">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
}

export default Nav;