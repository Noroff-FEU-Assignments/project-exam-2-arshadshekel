import { Navbar, Nav, Modal, Button } from "react-bootstrap";
import logo from "../../images/logo.svg";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useState, useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import LoginForm from "../forms/LoginForm";
import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import Toasts from "../../hooks/useToasts";

function Navigation() {
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseConfirm = () => setConfirmShow(false);
  const handleOpenConfirm = () => setConfirmShow(true);

  const [auth, setAuth] = useContext(AuthContext);

  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastAction, setToastAction] = useState("");

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  function logout() {
    setAuth("");
    setShowToast(true);
    setToastType("success");
    setToastAction("logout");
    setTimeout(() => setShowToast(false), 3000);
    setTimeout(() => history.push("/"), 2000);
    setTimeout(() => handleCloseConfirm(), 1000);
  }

  return (
    <div className="container">
      <Navbar expand="lg" className="px-0">
        <LinkContainer to="/home">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="40px" className="py-2" />
          </Navbar.Brand>
        </LinkContainer>

        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="navbar-toggler collapsed"
        >
          {open ? (
            <FiX style={{ height: "35px", color: "black" }} size={30} />
          ) : (
            <FiMenu style={{ height: "35px", color: "black" }} size={30} />
          )}
        </button>
        <Navbar.Collapse in={open}>
          <Nav className="w-100">
            <LinkContainer to="/home" className="ml-lg-auto">
              <Nav.Link active={false} onClick={() => setOpen(false)}>
                HOME
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/hotels">
              <Nav.Link active={false} onClick={() => setOpen(false)}>
                HOTELS
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact-us">
              <Nav.Link active={false} onClick={() => setOpen(false)}>
                CONTACT US
              </Nav.Link>
            </LinkContainer>

            {auth ? (
              <LinkContainer to="/admin" className="ml-lg-auto px-0">
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
      <Toasts type={toastType} action={toastAction} showToast={showToast} />
    </div>
  );
}

export default Navigation;
