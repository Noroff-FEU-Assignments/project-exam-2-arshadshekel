import { React, useState, useContext, useEffect } from "react";
import axios from "axios";
import { CONTACTURL, ENQUIRYURL } from "../../constants/Api";
import AuthContext from "../../context/AuthContext";
import { Accordion, Card, Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";

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
  }

  useEffect(
    function () {
      async function getForms() {
        // get JWT token from localstorage
        const token = auth.jwt;

        try {
          axios.defaults.headers.common = { Authorization: `bearer ${token}` };
          axios.get(CONTACTURL).then((resp) => {
            setContactForms(resp.data);
            console.log(resp.data);
          });
          axios.get(ENQUIRYURL).then((resp) => {
            setEnquiry(resp.data);
            console.log(resp.data);
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
            setUpdateList(true);
          }
        });
      } catch (error) {
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
      <Accordion defaultActiveKey="0" className="my-3">
        <Card>
          <Card.Header className="accordion-title">
            <Accordion.Toggle
              as={Button}
              variant="text"
              className="accordion-link"
              eventKey="0"
            >
              Messages to Holidaze
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {contactForms.length !== 0 ? (
                contactForms.map((form) => {
                  return (
                    <Accordion key={form.id}>
                      <Card>
                        <Card.Header className="accordion-title">
                          <Accordion.Toggle
                            as={Button}
                            variant="text"
                            eventKey="0"
                            className="accordion-link"
                          >
                            {form.Firstname} {form.Lastname}
                          </Accordion.Toggle>
                        </Card.Header>
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
                              Email: <span className="ml-3">{form.email}</span>
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
      </Accordion>
      <Accordion defaultActiveKey="0" className="my-3">
        <Card>
          <Card.Header className="accordion-title">
            <Accordion.Toggle
              as={Button}
              variant="text"
              className="accordion-link"
              eventKey="0"
            >
              Enquiries to hotels
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {enquiries.length !== 0 ? (
                enquiries.map((form) => {
                  return (
                    <Accordion key={form.id}>
                      <Card>
                        <Card.Header className="accordion-title">
                          <Accordion.Toggle
                            as={Button}
                            variant="text"
                            eventKey="0"
                            className="accordion-link"
                          >
                            {form.Hotel} - {form.Firstname} {form.Lastname}
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <div className="my-2">
                              Date:{" "}
                              <span className="ml-3">
                                {moment(form.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                              </span>
                            </div>
                            <div className="my-2">
                              Name:{" "}
                              <span className="ml-3">
                                {form.Firstname} {form.Lastname}
                              </span>
                            </div>
                            <div className="my-2">
                              Email: <span className="ml-3">{form.Email}</span>
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
        <Modal.Header closeButton>
          <Modal.Title>Delete hotel?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you wish to delete hotel?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteItem(entryID, entryType)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AdminDashboard;
