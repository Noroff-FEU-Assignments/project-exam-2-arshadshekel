import { Row, Col } from "react-bootstrap";

import { useEffect, useState } from "react";
import { API } from "../../constants/Api";
import Hotelcard from "../hotel/Hotelcard";

function Hotels() {
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
      <h1 className="text-center my-5">Hotels</h1>
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
