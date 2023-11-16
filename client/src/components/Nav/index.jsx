import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const NavbarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background-image: linear-gradient(to bottom right, #503a5c, #fcab65, #97536d);
  border-bottom: 2px solid #fff; /* Adjust the border color as needed */
  color: #fff; /* Adjust the text color as needed */
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Navigation = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;

    li {
      margin-right: 1rem;

      a {
        text-decoration: none;
        color: inherit;
        font-weight: bold;
        transition: color 0.3s ease-in-out;

        &:hover {
          color: #fd7e14; /* Adjust the hover color as needed */
        }
      }
    }
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
