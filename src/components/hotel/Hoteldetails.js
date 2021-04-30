import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "../../constants/Api";

function Hoteldetails() {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useHistory();

  const { id } = useParams();

  if (!id) {
    history.push("/");
  }

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

  return (
    <div className="mt-5">
      <h1>{hotel.name}</h1>
    </div>
  );
}

export default Hoteldetails;
