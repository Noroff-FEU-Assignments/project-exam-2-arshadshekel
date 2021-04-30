import { Navbar, Nav, Modal, Button } from "react-bootstrap";
import logo from "../../images/logo.svg";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import Login  from "../login/Login";

import { LinkContainer } from "react-router-bootstrap";

function Navigation() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <LinkContainer to="/login" onClick={handleShow}>
            <Nav>
              <Nav.Link className="px-0">
                <FaUserCircle className="mr-2 login-icon" />
                LOGIN
              </Nav.Link>
            </Nav>
          </LinkContainer>
        </Navbar.Collapse>
      </Navbar>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Navigation;
