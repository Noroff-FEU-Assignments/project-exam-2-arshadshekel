import { Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useContext } from "react";
import EnquiryForm from "../forms/EnquiryForm";
import AuthContext from "../../context/AuthContext";
import { FaStar, FaRegStar } from "react-icons/fa";

function Hotelcard(props) {
  const [show, setShow] = useState(false);

  //Functions to show/hide modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [auth] = useContext(AuthContext);

  /* Initially I tried to implement other peoples components but ended up 
   writing one myself. I also learned that template literals end up showing
   as text. So I got help and he suggested arrays 
  */
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

  /* shameless copy paste form a function I used for SP2,
     which I in turn shamelessly copied from a guide      */

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  return (
    <div className="hotel-card rounded-corners" key={props.id} style={auth ? {minHeight: "390px"}: {minHeight: "350px"}}>
      <LinkContainer to={`hotels/` + props.id}>
        <img
          src={props.picture}
          alt="hotel thumbnail"
          className="hotel-card-img mx-auto"
        />
      </LinkContainer>
      <div className="pl-md-5 d-flex flex-column justify-content-between ">
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
          </div>
        </LinkContainer>
        <LinkContainer to={`hotels/` + props.id}>
          <div>
            <p>{truncateString(props.description, 100)}</p>
            <p className="font-weight-bold">Price: {props.price}</p>
          </div>
        </LinkContainer>

        <div>
          <Button
            className="mr-2 align-bottom primary-button"
            onClick={handleShow}
          >
            Contact hotel
          </Button>

          <LinkContainer to={`hotels/` + props.id}>
            <Button className="mr-2 mt-3 secondary-button">View more </Button>
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
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        className="modal-background"
      >
        <Modal.Header className="modal-no-border" closeButton>
          <h3 className="ml-auto">Contact {props.name}</h3>
        </Modal.Header>
        <Modal.Body>
          <EnquiryForm handleClose={handleClose} hotelName={props.name} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Hotelcard;
