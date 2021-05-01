import { Navbar, Nav, Modal, Button } from "react-bootstrap";
import logo from "../../images/logo.svg";
import { FaUserCircle } from "react-icons/fa";
import { useState, useContext, useRef } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Login from "../login/Login";
import AuthContext from "../../context/AuthContext";
import { useHistory, useLocation } from "react-router-dom";

function Navigation() {
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  /*   const admin = useRef(null);
  const adminNode = admin.current; */

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseConfirm = () => setConfirmShow(false);
  const handleOpenConfirm = () => setConfirmShow(true);

  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();
  const location = useLocation();

  function logout() {
    setAuth(null);
    history.push("/");
    handleCloseConfirm();
  }
  /* 
  if (location.pathname === "/admin") {
    adminNode.classList.add("active");
  } else {
    adminNode.classList.remove("active");
  }
    /*  (location.pathname === "/admin") ? 
    : adminNode.classList.remove("active"); */

  return (
    <div className="container">
      <Navbar expand="lg" className="px-0">
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" height="50px" className="mt-3" />
        </Navbar.Brand>
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
              <>
                {console.log(auth)}
                <LinkContainer to="/admin" className="ml-lg-auto">
                  <Nav.Link /* ref={admin} */>
                    {auth.user.username}
                    <button
                      onClick={handleOpenConfirm}
                      className="btn-sm btn-primary ml-3 py-0 mr-auto mt-3 mt-lg-0"
                    >
                      Log out
                    </button>
                  </Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <LinkContainer
                to={location.pathname}
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
          <Login handleClose={handleClose} />
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
          <Button variant="secondary" onClick={handleCloseConfirm}>
            No
          </Button>
          <Button variant="primary" onClick={logout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Navigation;
