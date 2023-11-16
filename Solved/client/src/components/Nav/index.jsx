import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const NavbarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background-image: linear-gradient(to bottom right, rgba(80, 58, 92, 0), rgba(252, 171, 101, 0), rgba(151, 83, 109, 0));
  color: #fff;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;

  a {
    text-decoration: none;
    color: inherit;
  }
`;


function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <NavbarContainer>
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/myWalkers!">
              My trusted walkers!
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/profile">
              My Profile
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/appointments">
              Appointments
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
        </NavbarContainer>
      );
    } else {
      return (
        <NavbarContainer>
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
        </NavbarContainer>        
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="Dog emoji">🐶</span>
          Walk Woof
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
