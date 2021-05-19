import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../constants/Api";
import { FaStar, FaRegStar } from "react-icons/fa";

function Hoteldetails() {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const url = API + id;

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(url);

          if (response.ok) {
            const json = await response.json();
            console.log(json);
            setHotel(json);
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
    [url]
  );

  if (loading) {
    return <div className="mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="mt-5">An error occured: {error}</div>;
  }

  function populateStars() {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < hotel.standard) {
        stars.push(
          <span className="star-color" key={i}>
            <FaStar size={32} />
          </span>
        );
      }
      if (i >= hotel.standard) {
        stars.push(
          <span className="star-color" key={i}>
            <FaRegStar size={32} />
          </span>
        );
      }
    }
    return stars;
  }

  return (
    <div className="mt-5 container text-center">
      <h1>{hotel.name}</h1>
      {populateStars().map((star) => {
        return star;
      })}
    </div>
  );
}

export default Hoteldetails;
