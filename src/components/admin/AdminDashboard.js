import { React, useState, useContext, useEffect } from "react";
import axios from "axios";
import { CONTACTURL, ENQUIRYURL } from "../../constants/Api";
import AuthContext from "../../context/AuthContext";
import { Accordion, Card, Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";

import Toasts from "../../hooks/useToasts";

function AdminDashboard() {
  const [auth] = useContext(AuthContext);
  const [contactForms, setContactForms] = useState([]);
  const [enquiries, setEnquiry] = useState([]);
  const [show, setShow] = useState(false);
  const [entryID, setEntryID] = useState(false);
  const [entryType, setEntryType] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id, type) => {
    setShow(true);
    setEntryID(id);
    setEntryType(type);
  };
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastAction, setToastAction] = useState("");

  useEffect(() => {
    document.title = "Holidaze - Admin dashboard";
  }, []);

  useEffect(
    function () {
      async function getForms() {
        // get JWT token from localstorage
        const token = auth.jwt;
        // API call to get both contactmessages and enquiries
        try {
          axios
            .get(CONTACTURL, { headers: { Authorization: `Bearer ${token}` } })
            .then((resp) => {
              setContactForms(resp.data);
            });
          axios
            .get(ENQUIRYURL, { headers: { Authorization: `Bearer ${token}` } })
            .then((resp) => {
              setEnquiry(resp.data);
            });
        } catch (error) {
          console.log("error", error);
        }
      }
      getForms();
      setUpdateList(false);
    },
    [auth, updateList]
  );

  // Function to delete a specific messsage
  async function deleteItem(id, type) {
    const token = auth.jwt;
    let url = "";

    if (type === "contact") {
      url = CONTACTURL + id;
    }
    if (type === "enquiry") {
      url = ENQUIRYURL + id;
    }

    try {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      await axios.delete(url, {}).then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          handleClose();
          setShowToast(true);
          setToastType("success");
          setToastAction("deleteMessage");
          setTimeout(() => setShowToast(false), 1000);
          setUpdateList(true);
        }
      });
    } catch (error) {
      handleClose();
      setShowToast(true);
      setToastType("fail");
      setToastAction("deleteMessage");
      setTimeout(() => setShowToast(false), 1000);
      console.log("error", error);
    }
  }

  return (
    <>
      <h1 className="text-center text-bold mt-5 color-primary">
        Admin Dashboard
      </h1>

      <LinkContainer to="/admin/add">
        <div className="my-3 d-flex justify-content-center">
          <Button variant="success" className="my-3 rounded-corners">
            Add hotel
          </Button>
        </div>
      </LinkContainer>

      <h2 className="text-center text-bold mb-5">Messages received</h2>

      <Accordion className="my-5">
        <Card className="my-3">
          <Accordion.Toggle
            as={Card.Header}
            className="accordion-title"
            eventKey="0"
          >
            Messages to Holidaze
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {contactForms.length !== 0 ? (
                contactForms.map((form) => {
                  return (
                    <Accordion key={form.id}>
                      <Card className="my-3">
                        <Accordion.Toggle
                          as={Card.Header}
                          className="accordion-subtitle"
                          eventKey="0"
                        >
                          {form.Firstname} {form.Lastname}
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <div className="my-2">
                              Date:{" "}
                              <span className="ml-3">
                                {moment(form.created_at).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}
                              </span>
                            </div>
                            <div className="my-2">
                              Name:{" "}
                              <span className="ml-3">
                                {form.Firstname} {form.Lastname}
                              </span>
                            </div>
                            <div className="my-2">
                              Email:{" "}
                              <a className="ml-3" href={"mailto:" + form.email}>
                                {form.email}
                              </a>
                            </div>
                            <div className="my-2">
                              Message:{" "}
                              <span className="ml-3">{form.Message}</span>
                            </div>
                            <Button
                              variant="danger"
                              className="my-3 rounded-corners"
                              onClick={() => handleShow(form.id, "contact")}
                            >
                              Delete message
                            </Button>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  );
                })
              ) : (
                <p>No messages to be found</p>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="1"
            className="accordion-title"
          >
            Enquires to Hotels
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {enquiries.length !== 0 ? (
                enquiries.map((form) => {
                  return (
                    <Accordion key={form.id}>
                      <Card className="my-3">
                        <Accordion.Toggle
                          as={Card.Header}
                          className="accordion-subtitle"
                          eventKey="0"
                        >
                          {form.Hotel} - {form.Firstname} {form.Lastname}
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <div className="my-2">
                              Date:{" "}
                              <span className="ml-3">
                                {moment(form.created_at).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}
                              </span>
                            </div>
                            <div className="my-2">
                              Name:{" "}
                              <span className="ml-3">
                                {form.Firstname} {form.Lastname}
                              </span>
                            </div>
                            <div className="my-2">
                              Email:{" "}
                              <a className="ml-3" href={"mailto:" + form.Email}>
                                {form.Email}
                              </a>
                            </div>
                            <div className="my-2">
                              Message:{" "}
                              <span className="ml-3">{form.Message}</span>
                            </div>
                            <Button
                              variant="danger"
                              className="my-3 rounded-corners"
                              onClick={() => handleShow(form.id, "enquiry")}
                            >
                              Delete message
                            </Button>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  );
                })
              ) : (
                <p>No messages to be found</p>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className="modal-no-border" closeButton>
          <h3 className="ml-auto">Delete message?</h3>
        </Modal.Header>
        <Modal.Body>Do you wish to delete message?</Modal.Body>

        <Modal.Footer className="modal-no-border mr-auto">
          <Button
            variant="danger"
            onClick={() => deleteItem(entryID, entryType)}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Toasts type={toastType} action={toastAction} showToast={showToast} />
    </>
  );
}
export default AdminDashboard;
