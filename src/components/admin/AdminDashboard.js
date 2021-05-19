import { React, useState, useContext, useEffect } from "react";
import axios from "axios";
import { CONTACTURL, ENQUIRYURL } from "../../constants/Api";
import AuthContext from "../../context/AuthContext";
import { Accordion, Card, Button } from "react-bootstrap";

function AdminDashboard() {
  const [auth] = useContext(AuthContext);
  const [contactForms, setContactForms] = useState([]);
  const [enquiries, setEnquiry] = useState([]);

  useEffect(function () {
    async function getContactForm() {
      // get JWT token from localstorage
      const token = auth.jwt;

      try {
        axios.defaults.headers.common = { Authorization: `bearer ${token}` };
        axios.get(CONTACTURL).then((resp) => {
          setContactForms(resp.data);
          console.log(resp.data)
        });
        axios.get(ENQUIRYURL).then((resp) => {
          setEnquiry(resp.data);
          console.log(resp.data)
        });
      } catch (error) {
        console.log("error", error);
      }
    }
    getContactForm();
  }, [auth]);

  

  return (
    <>
      <h1 className="text-center text-bold mt-5 color-primary">Admin Dashboard</h1>
      <div className="my-3 d-flex justify-content-center">
        <Button variant="success" className="my-3">
          Add hotel
        </Button>
      </div>
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
              {contactForms.map((form) => {
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
                          <Button variant="danger" className="my-3">
                            Delete message
                          </Button>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                );
              })}
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
              {enquiries.map((form) => {
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
                          <Button variant="danger" className="my-3">
                            Delete message
                          </Button>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                );
              })}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}
export default AdminDashboard;
