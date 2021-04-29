import { Navbar, Nav } from "react-bootstrap";
import loginLogo from "../../images/login.png";
import logo from "../../images/logo.svg";

import { LinkContainer } from "react-router-bootstrap";

function Navigation() {
  return (
    <div className="container">
      <Navbar expand="lg" className="px-0">
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" height="50px" className="mt-3" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <LinkContainer to="/home">
              <Nav.Link>HOME</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/hotels">
              <Nav.Link>HOTELS</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact-us">
              <Nav.Link>CONTACT US</Nav.Link>
            </LinkContainer>
          </Nav>
          <LinkContainer to="/login">
            <Nav.Link>
              <img src={loginLogo} alt="login logo" className="mr-3" />
              Login
            </Nav.Link>
          </LinkContainer>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
