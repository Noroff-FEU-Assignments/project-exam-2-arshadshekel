import { Navbar, Nav, Modal, Button } from "react-bootstrap";
import logo from "../../images/logo.svg";
import { FaUserCircle } from "react-icons/fa";
import { useState, useContext} from "react";
import { LinkContainer } from "react-router-bootstrap";
import LoginForm from "../forms/LoginForm";
import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

function Navigation() {
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseConfirm = () => setConfirmShow(false);
  const handleOpenConfirm = () => setConfirmShow(true);

  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();
 

  function logout() {
    setAuth();
    history.push("/");
    handleCloseConfirm();
  }


  return (
    <div className="container">
      <Navbar expand="lg" className="px-0">
        <LinkContainer to="/home">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="40px" className="py-2" />
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100">
            <LinkContainer to="/home" className="ml-lg-auto">
              <Nav.Link>HOME</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/hotels">
              <Nav.Link>HOTELS</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact-us">
              <Nav.Link>CONTACT US</Nav.Link>
            </LinkContainer>

            {auth ? (
              <LinkContainer to="/admin" className="ml-lg-auto">
                <Nav.Link>
                  {auth.user.username}
                  <Button
                    onClick={handleOpenConfirm}
                    className="btn-sm primary-button ml-3 py-0 mr-auto mt-3 mt-lg-0 mb-3 mb-lg-1"
                  >
                    Log out
                  </Button>
                </Nav.Link>
              </LinkContainer>
            ) : (
              <LinkContainer
                to="/admin"
                onClick={handleShow}
                className="ml-lg-auto"
              >
                <Nav.Link>
                  <FaUserCircle className="mr-2 login-icon" />
                  LOGIN
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
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
          <LoginForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>

      <Modal
        show={confirmShow}
        onHide={handleCloseConfirm}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Logout?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you wish to log out?</Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            className="px-3"
            onClick={handleCloseConfirm}
          >
            No
          </Button>
          <Button className="primary-button px-3" onClick={logout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Navigation;
