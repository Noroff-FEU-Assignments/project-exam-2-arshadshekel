import { Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useContext } from "react";
import EnquiryForm from "../forms/EnquiryForm";
import AuthContext from "../../context/AuthContext";
import { FaStar, FaRegStar } from "react-icons/fa";

function Hotelcard(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [auth] = useContext(AuthContext);

  function populateStars() {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < props.standard) {
        stars.push(
          <span className="star-color" key={i}>
            <FaStar size={22} />
          </span>
        );
      }
      if (i >= props.standard) {
        stars.push(
          <span className="star-color" key={i}>
            <FaRegStar size={22} />
          </span>
        );
      }
    }
    return stars;
  }

  return (
    <div className="hotel-card rounded-corners" key={props.id}>
      <LinkContainer to={`hotels/` + props.id}>
        <img
          src={props.picture}
          alt="hotel thumbnail"
          className="hotel-card-img mx-auto"
        />
      </LinkContainer>
      <div className="pl-md-5 ">
        <LinkContainer to={`hotels/` + props.id}>
          <div>
            <h3 className="color-primary" key={props.id}>
              {props.name}
            </h3>
            <p>
              {populateStars().map((star) => {
                return star;
              })}
            </p>
            <p>
              Polished hotel along Bryggen wharf, offering 2 restaurants, a
              fitness center & free breakfast.
            </p>
            <p>Price: {props.price}</p>
          </div>
        </LinkContainer>

        <Button className="mr-3 mt-3 primary-button" onClick={handleShow}>
          Contact hotel
        </Button>

        <LinkContainer to={`hotels/` + props.id}>
          <Button className="mr-3 mt-3 secondary-button">View more </Button>
        </LinkContainer>

        {auth ? (
          <LinkContainer to={`admin/edit/` + props.id}>
            <Button
              variant="success"
              className="mt-3 text-white rounded-corners"
            >
              Edit hotel{" "}
            </Button>
          </LinkContainer>
        ) : null}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        className="modal-background"
      >
        <Modal.Header className="modal-border-bottom" closeButton>
          <h3 className="ml-auto text-white">Contact {props.name}</h3>
        </Modal.Header>
        <Modal.Body>
          <EnquiryForm handleClose={handleClose} hotelName={props.name} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Hotelcard;
