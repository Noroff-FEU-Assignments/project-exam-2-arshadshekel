import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { API } from "../../constants/Api";
import Hotelcard from "../hotel/Hotelcard";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minprice, setMinprice] = useState(null);
  const [maxprice, setMaxprice] = useState(0);

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
          setDefaultValues(json);
            
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

  function setDefaultValues(hotels) {
    const minValueOfHotel = Math.min(...hotels.map((hotel) => hotel.price));
    const maxValueOfHotel = Math.max(...hotels.map((hotel) => hotel.price));
    setMaxprice(maxValueOfHotel);
    setMinprice(minValueOfHotel);
  }

  function updateMinPrice(event) {
    if (event.target.value !== "") {
      setMinprice(event.target.value);
    } else {
      
    }
    
    console.log(event.target.value);
    console.log(minprice);
  }
  return (
    <div>
      <h1 className="text-center my-5">Hotels</h1>
      <div className="my-5 px-5 d-flex justify-content-center">
        <div>
          <h4>Sort by:</h4>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} sm="4" controlId="validationCustom01">
                <Form.Label>Min price</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Minimum price"
                  defaultValue={minprice}
                  onKeyUp={updateMinPrice}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="4" controlId="validationCustom02">
                <Form.Label>Max price</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  defaultValue={maxprice}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm="4" controlId="validationCustom05">
                <Form.Label>Stars</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Standard"
                  required
                  placeholder="How many stars"
                  defaultValue={5}
                /> 
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
