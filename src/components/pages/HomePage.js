import {
  Jumbotron,
  Container,
  InputGroup,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";

import { useEffect, useState } from "react";
import { API } from "../../constants/Api";

import { FaSearch } from "react-icons/fa";
import Hotelcard from "../hotel/Hotelcard";

function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(API);

          if (response.ok) {
            const json = await response.json();
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
    },
    []
  );

      if (loading) {
        return <div className="mt-5">Loading...</div>;
      }

      if (error) {
        return <div className="mt-5">An error occured: {error}</div>;
      }

  return (
    <div>
      <Jumbotron className="jumbotron-img">
        <Container className="jumbotron-content">
          <h1 className="landingpage-title">DISCOVER BERGEN</h1>
          <h2 className="landingpage-subtitle">Book a hotel today!</h2>

          <InputGroup className="my-5">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label="Amount (to the nearest dollar)" />
          </InputGroup>
        </Container>
      </Jumbotron>
      <h2 className="my-5 font-weight-bold">Some featured hotels</h2>
      <div className="px-5">
        <Row>
          {hotels.map((hotel) => {
            return (
              <Col xs={12} xl={6}>
                <Hotelcard
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
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

export default HomePage;
