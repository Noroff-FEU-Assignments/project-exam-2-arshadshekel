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
import SearchDropDown from "../forms/SearchDropDown";


function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <Jumbotron className="jumbotron-img">
        <Container className="jumbotron-content">
          <div className="overlay py-5">
            <h1 className="landingpage-title">DISCOVER BERGEN</h1>
            <h2 className="landingpage-subtitle">Book a hotel today!</h2>

            <InputGroup className="my-5 search-max-width">
              <InputGroup.Prepend>
                <InputGroup.Text className="rounded-corners">
                  <FaSearch />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <SearchDropDown/>
            </InputGroup>
          </div>
        </Container>
      </Jumbotron>
      <h2 className="my-5 font-weight-bold">Some featured hotels</h2>
      <div className="px-5">
        <Row>
          {hotels.map((hotel) => {
            if (hotel.featured) {
              return (
                <Col xs={12} xl={6} key={hotel.id}>
                  <Hotelcard
                    id={hotel.id}
                    name={hotel.name}
                    class={hotel.class}
                    price={hotel.price}
                    email={hotel.email}
                    picture={hotel.picture.url}
                  />
                </Col>
              );
            } else {
              return null;
            }
          })}
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
