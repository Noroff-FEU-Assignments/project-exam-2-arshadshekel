import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import loginLogo from "../../images/login.png";
import logo from "../../images/logo-normal2.jpg";

import { LinkContainer } from "react-router-bootstrap";

function Navigation() {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="#home">
        <img src={logo} alt="logo" height="50px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <LinkContainer to="/home">
            <Nav.Link>HOME</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/link">
            <Nav.Link>HOTELS</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/contact-us">
            <Nav.Link>CONTACT US</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav className="ml-auto">
          <LinkContainer to="/home">
            <Nav.Link>
              <img src={loginLogo} alt="login logo" className="mr-3" />
              Login
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
