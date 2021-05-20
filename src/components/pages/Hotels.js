import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { API } from "../../constants/Api";
import Hotelcard from "../hotel/Hotelcard";


function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(API);

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setHotels(json);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="mt-5 container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <div className="mt-5">An error occured: {error}</div>;
  }




  return (
    <div>
      <h1 className="text-center my-5">Hotels</h1>
      <div className="my-5 px-5 d-flex justify-content-center">
        <div className="">
          <h4>Sort by:</h4>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} sm="4" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue="Mark"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="4" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  defaultValue="Otto"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
     
          
              <Form.Group as={Col} sm="4" controlId="validationCustom05">
                <Form.Label>Zip</Form.Label>
                <Form.Control type="text" placeholder="Zip" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
          </Form>
        </div>
      </div>
      <div className="px-5">
        <Row>
          {hotels.map((hotel) => {
            return (
              <Col xs={12} xl={6} key={hotel.id}>
                <Hotelcard
                  id={hotel.id}
                  name={hotel.name}
                  standard={hotel.standard}
                  price={hotel.price}
                  email={hotel.email}
                  picture={hotel.picture.url}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default Hotels;
