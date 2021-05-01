import { Navbar, Nav, Modal } from "react-bootstrap";
import logo from "../../images/logo.svg";
import { FaUserCircle } from "react-icons/fa";
import { useState, useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Login from "../login/Login";
import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

function Navigation() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push("/");
  }

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
            <Nav>
              {auth ? (
                <>
                  <LinkContainer to="/admin" className="pl-lg-3">
                    <Nav.Link>
                      ADMIN
                      <button
                        onClick={logout}
                        className="btn-sm btn-primary ml-3 py-0 mr-auto mt-3 mt-lg-0"
                      >
                        Log out
                      </button>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/admin" className="pl-lg-3">
                    <Nav.Link></Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <LinkContainer to="/login" onClick={handleShow}>
                  <Nav.Link>
                    <FaUserCircle className="mr-2 login-icon" />
                    LOGIN
                  </Nav.Link>
                </LinkContainer>
              )}
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
        <Modal.Body>
          <Login handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Navigation;
