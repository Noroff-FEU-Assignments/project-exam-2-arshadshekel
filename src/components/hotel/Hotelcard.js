import { Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import EnquiryForm from "../forms/EnquiryForm"

function Hotelcard(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <div className="hotel-card">
      <LinkContainer to={`hotels/` + props.id}>
        <img
          src={props.picture}
          alt="hotel thumbnail"
          className="hotel-card-img mx-auto"
        />
      </LinkContainer>
      <div className="pl-md-5">
        <LinkContainer to={`hotels/` + props.id}>
          <div>
            <h3>{props.name}</h3>
            <p>4 star hotel</p>
            <p>
              Polished hotel along Bryggen wharf, offering 2 restaurants, a
              fitness center & free breakfast.
            </p>
          </div>
        </LinkContainer>

        <Button className="mr-3 mt-3 btn-warning" onClick={handleShow}>
          Contact hotel
        </Button>

        <LinkContainer to={`hotels/` + props.id}>
          <Button className="mt-3 text-white">View more </Button>
        </LinkContainer>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className="modal-border-bottom" closeButton>
          <h3 className="ml-auto">Contact { props.name}</h3>
        </Modal.Header>
        <Modal.Body>
          <EnquiryForm handleClose={handleClose} hotelName={props.name} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Hotelcard;
