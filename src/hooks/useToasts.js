import { Toast, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Toasts({ type, action, showToast }) {
    const [show, setShow] = useState(false);
    const [toastColor, setToastColor] = useState("");
    const [toastMessage, setToastMessage] = useState("");


    useEffect(()=>{
    setShow(showToast)
},[showToast]);

  useEffect(
    function () {
      function updateToast() {
        console.log("toats");
        if (type === "success") {
          setToastColor("bg-success text-center");
          if (action === "login") {
            setToastMessage("You have successfully logged in");
          } else if (action === "addHotel") {
            setToastMessage("You have added a new hotel");
          } else if (action === "editHotel") {
              console.log("hotel");
            setToastMessage("You have edited a hotel");
          } else if (action === "logout") {
            setToastMessage("You have logged out");
          } else if (action === "deleteHotel") {
            setToastMessage("You have deleted a hotel");
          } else if (action === "postMessage") {
            setToastMessage("Your message has been sent");
          }
        } else if (type === "fail") {
          setToastColor("bg-danger text-center");
          if (action === "login") {
           setToastMessage("Failed to logged in");
          } else if (action === "addHotel") {
            setToastMessage("Failed to add a new hotel");
          } else if (action === "editHotel") {
            setToastMessage("Failed to edit a hotel");
          } else if (action === "deleteHotel") {
           setToastMessage("Failed to delete a hotel");
          } else if (action === "deleteMessage") {
            setToastMessage("Failed to deleted a message");
          }
        }
      }
      updateToast();
    },
    [action, type, show]
  );

  return (
    <>
      <Row>
        <Col
          xs={12}
          aria-live="polite"
          aria-atomic="true"
          style={{
            minHeight: "100px",
          }}
          className="fixed-bottom"
        >
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              color: "white",
            }}
          >
            <Toast.Body className={toastColor}>{toastMessage}</Toast.Body>
          </Toast>
        </Col>
      </Row>
    </>
  );
}
